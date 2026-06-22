// ---------------------------------------------------------------------------
// Per-user data store (MySQL). All database access goes through this module so
// the rest of the app never touches SQL directly — which keeps a future move
// to a managed/online MySQL a config change, not a rewrite. Connection details
// come from env vars (DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME).
// ---------------------------------------------------------------------------
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "rathee_ide"
};

let pool = null;
let ready = false;

// Idempotent schema — created on startup. Code files live as rows (content as
// text), tagged cpp/python, isolated per user. Codeforces problem data is NOT
// stored (fetched live); we keep only the user's contest numbers + their code.
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     google_sub VARCHAR(64) NOT NULL UNIQUE,
     email VARCHAR(320),
     name VARCHAR(255),
     picture VARCHAR(1024),
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     last_login DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
   ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS files (
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     user_id BIGINT NOT NULL,
     language ENUM('cpp','python') NOT NULL,
     scope ENUM('scratch','contest','folder') NOT NULL DEFAULT 'scratch',
     contest_id VARCHAR(64) NOT NULL DEFAULT '',
     filename VARCHAR(255) NOT NULL,
     content LONGTEXT,
     input_text LONGTEXT,
     updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     UNIQUE KEY uniq_file (user_id, language, scope, contest_id, filename),
     KEY idx_user (user_id),
     CONSTRAINT fk_files_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS user_folders (
     user_id BIGINT NOT NULL,
     folder_id VARCHAR(64) NOT NULL,
     name VARCHAR(255),
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (user_id, folder_id),
     CONSTRAINT fk_uf_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS user_contests (
     user_id BIGINT NOT NULL,
     contest_id VARCHAR(32) NOT NULL,
     name VARCHAR(255),
     language ENUM('cpp','python') NOT NULL DEFAULT 'cpp',
     problems JSON,
     added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     PRIMARY KEY (user_id, contest_id),
     CONSTRAINT fk_uc_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS settings (
     user_id BIGINT NOT NULL PRIMARY KEY,
     data JSON,
     updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT fk_settings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS templates (
     user_id BIGINT NOT NULL,
     kind ENUM('cpp_template','headers','python_template') NOT NULL,
     content LONGTEXT,
     updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (user_id, kind),
     CONSTRAINT fk_templates_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB`
];

export function dbReady() {
  return ready;
}

// Connect, create the database if missing, and apply the schema. Returns true
// on success; on failure logs and returns false (the app still runs for
// anonymous users without persistence).
export async function initStore() {
  try {
    const bootstrap = await mysql.createConnection({
      host: dbConfig.host, port: dbConfig.port, user: dbConfig.user, password: dbConfig.password
    });
    // Best-effort auto-create. A least-privilege app user (granted only on the
    // app database) can't CREATE DATABASE; that's fine when the DB already
    // exists — we connect to it below regardless.
    try {
      await bootstrap.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      );
    } catch (createError) {
      console.warn(`Store: could not auto-create database (${createError.code || createError.message}); assuming it exists.`);
    }
    await bootstrap.end();

    pool = mysql.createPool({ ...dbConfig, waitForConnections: true, connectionLimit: 10 });
    for (const ddl of SCHEMA) await pool.query(ddl);
    await applyMigrations();
    ready = true;
    console.log(`Store: connected to MySQL ${dbConfig.user}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    return true;
  } catch (error) {
    ready = false;
    console.warn(`Store: MySQL unavailable (${error.code || error.message}). Running without accounts/persistence.`);
    return false;
  }
}

// Add columns introduced after the initial schema. CREATE TABLE IF NOT EXISTS
// won't alter an existing table, so guard each ADD COLUMN on information_schema.
async function applyMigrations() {
  await ensureColumn("user_contests", "problems", "JSON");
  // Widen the files.scope enum to allow user-created folders, and the container
  // id column to fit folder ids. Both are safe to run repeatedly.
  await pool.query(`ALTER TABLE files MODIFY COLUMN scope ENUM('scratch','contest','folder') NOT NULL DEFAULT 'scratch'`).catch(() => {});
  await pool.query(`ALTER TABLE files MODIFY COLUMN contest_id VARCHAR(64) NOT NULL DEFAULT ''`).catch(() => {});
}

async function ensureColumn(table, column, definition) {
  const [rows] = await pool.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [dbConfig.database, table, column]
  );
  if (!rows.length) {
    await pool.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
  }
}

export async function upsertUser({ sub, email, name, picture }) {
  await pool.query(
    `INSERT INTO users (google_sub, email, name, picture, last_login)
     VALUES (?, ?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE email=VALUES(email), name=VALUES(name), picture=VALUES(picture), last_login=NOW()`,
    [sub, email || null, name || null, picture || null]
  );
  const [rows] = await pool.query(
    `SELECT id, google_sub, email, name, picture FROM users WHERE google_sub = ?`,
    [sub]
  );
  return rows[0] || null;
}

export async function getUserById(id) {
  const [rows] = await pool.query(
    `SELECT id, google_sub, email, name, picture FROM users WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

// ---- Files (per user) ----
export async function listFiles(userId) {
  const [rows] = await pool.query(
    `SELECT language, scope, contest_id, filename, content, input_text, updated_at
     FROM files WHERE user_id = ? ORDER BY scope, contest_id, filename`,
    [userId]
  );
  return rows;
}

export async function saveFile(userId, { language, scope = "scratch", contestId = "", filename, content = "", input = "" }) {
  await pool.query(
    `INSERT INTO files (user_id, language, scope, contest_id, filename, content, input_text)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE content = VALUES(content), input_text = VALUES(input_text)`,
    [userId, language, scope, contestId || "", filename, content ?? "", input ?? ""]
  );
}

export async function deleteFile(userId, { language, scope = "scratch", contestId = "", filename }) {
  await pool.query(
    `DELETE FROM files WHERE user_id = ? AND language = ? AND scope = ? AND contest_id = ? AND filename = ?`,
    [userId, language, scope, contestId || "", filename]
  );
}

// ---- Contests (per user) ----
export async function listContests(userId) {
  const [rows] = await pool.query(
    `SELECT contest_id, name, language, problems, added_at FROM user_contests WHERE user_id = ? ORDER BY added_at DESC`,
    [userId]
  );
  return rows.map((r) => ({
    ...r,
    problems: typeof r.problems === "string" ? JSON.parse(r.problems || "[]") : (r.problems || [])
  }));
}

export async function addContest(userId, { contestId, name = null, language = "cpp", problems = [] }) {
  await pool.query(
    `INSERT INTO user_contests (user_id, contest_id, name, language, problems)
     VALUES (?, ?, ?, ?, CAST(? AS JSON))
     ON DUPLICATE KEY UPDATE name = VALUES(name), language = VALUES(language), problems = VALUES(problems)`,
    [userId, String(contestId), name, language, JSON.stringify(problems || [])]
  );
}

export async function removeContest(userId, contestId) {
  await pool.query(`DELETE FROM files WHERE user_id = ? AND scope = 'contest' AND contest_id = ?`, [userId, String(contestId)]);
  await pool.query(`DELETE FROM user_contests WHERE user_id = ? AND contest_id = ?`, [userId, String(contestId)]);
}

// ---- Folders (per user; user-created containers of code files) ----
export async function listFolders(userId) {
  const [rows] = await pool.query(
    `SELECT folder_id, name, created_at FROM user_folders WHERE user_id = ? ORDER BY created_at ASC`,
    [userId]
  );
  return rows;
}

export async function addFolder(userId, { folderId, name = null }) {
  await pool.query(
    `INSERT INTO user_folders (user_id, folder_id, name)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    [userId, String(folderId), name]
  );
}

export async function removeFolder(userId, folderId) {
  await pool.query(`DELETE FROM files WHERE user_id = ? AND scope = 'folder' AND contest_id = ?`, [userId, String(folderId)]);
  await pool.query(`DELETE FROM user_folders WHERE user_id = ? AND folder_id = ?`, [userId, String(folderId)]);
}

// ---- Settings (per user, JSON blob) ----
export async function getSettings(userId) {
  const [rows] = await pool.query(`SELECT data FROM settings WHERE user_id = ?`, [userId]);
  if (!rows[0]) return {};
  const data = rows[0].data;
  return typeof data === "string" ? JSON.parse(data || "{}") : (data || {});
}

export async function saveSettings(userId, data) {
  await pool.query(
    `INSERT INTO settings (user_id, data) VALUES (?, CAST(? AS JSON))
     ON DUPLICATE KEY UPDATE data = VALUES(data)`,
    [userId, JSON.stringify(data || {})]
  );
}

// ---- Templates (per user) ----
export async function getTemplates(userId) {
  const [rows] = await pool.query(`SELECT kind, content FROM templates WHERE user_id = ?`, [userId]);
  const out = {};
  for (const r of rows) out[r.kind] = r.content;
  return out; // { cpp_template?, headers?, python_template? }
}

export async function saveTemplate(userId, kind, content) {
  await pool.query(
    `INSERT INTO templates (user_id, kind, content) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE content = VALUES(content)`,
    [userId, kind, content ?? ""]
  );
}
