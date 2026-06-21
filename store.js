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
     scope ENUM('scratch','contest') NOT NULL DEFAULT 'scratch',
     contest_id VARCHAR(32) NOT NULL DEFAULT '',
     filename VARCHAR(255) NOT NULL,
     content LONGTEXT,
     input_text LONGTEXT,
     updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     UNIQUE KEY uniq_file (user_id, language, scope, contest_id, filename),
     KEY idx_user (user_id),
     CONSTRAINT fk_files_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS user_contests (
     user_id BIGINT NOT NULL,
     contest_id VARCHAR(32) NOT NULL,
     name VARCHAR(255),
     language ENUM('cpp','python') NOT NULL DEFAULT 'cpp',
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
    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await bootstrap.end();

    pool = mysql.createPool({ ...dbConfig, waitForConnections: true, connectionLimit: 10 });
    for (const ddl of SCHEMA) await pool.query(ddl);
    ready = true;
    console.log(`Store: connected to MySQL ${dbConfig.user}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    return true;
  } catch (error) {
    ready = false;
    console.warn(`Store: MySQL unavailable (${error.code || error.message}). Running without accounts/persistence.`);
    return false;
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
