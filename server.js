import http from "node:http";
import https from "node:https";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile, stat, rm, readdir, rename, chmod } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import {
  initStore, dbReady, upsertUser, getUserById,
  listFiles, saveFile, deleteFile, saveFileTests,
  listContests, addContest, removeContest,
  listFolders, addFolder, removeFolder, setFolderOrder,
  getSettings, saveSettings,
  getTemplates, saveTemplate
} from "./store.js";
import {
  GOOGLE_CLIENT_ID,
  verifyGoogleIdToken,
  createSessionToken,
  readSessionToken,
  parseCookies,
  sessionCookieHeader,
  clearSessionCookieHeader
} from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const workspaceDir = path.join(__dirname, "workspace");
const templatesDir = path.join(workspaceDir, "Templates");
const ioFilesDir = path.join(workspaceDir, "IOFiles");
const inputFilePath = path.join(ioFilesDir, "input.txt");
const outputFilePath = path.join(ioFilesDir, "output.txt");
const legacyInputFilePath = path.join(workspaceDir, "input.txt");
const legacyOutputFilePath = path.join(workspaceDir, "output.txt");
const templateCppPath = path.join(templatesDir, "Template.cpp");
const headersPath = path.join(templatesDir, "Headers.hpp");
const templatePythonPath = path.join(templatesDir, "Template.py");
const templateJavaPath = path.join(templatesDir, "Template.java");
const legacyTemplateCppPath = path.join(workspaceDir, "Template.cpp");
const legacyHeadersPath = path.join(workspaceDir, "Headers.hpp");
const legacyTemplatePythonPath = path.join(workspaceDir, "Template.py");
const legacyTemplateJavaPath = path.join(workspaceDir, "Template.java");
const appSettingsPath = path.join(workspaceDir, "AppSettings.json");
const port = Number(process.env.PORT || 4173);
const maxBodyBytes = 1024 * 1024;
const runTimeoutMs = 8000;

// ---------------------------------------------------------------------------
// Execution sandbox. When USE_DOCKER=1, every g++/python3/javac/java/lldb invocation runs
// inside a disposable, locked-down container instead of on the host, so it is
// safe to expose publicly. Locally (flag off) everything runs natively for
// fast iteration. The per-run temp dir is bind-mounted at /work; host paths
// under it are remapped to container paths.
// ---------------------------------------------------------------------------
const useDocker = process.env.USE_DOCKER === "1";
const runnerImage = process.env.RUNNER_IMAGE || "forge-runner";
const containerWork = "/work";
let dockerNameSeq = 0;

function dockerName(prefix) {
  return `forge-${prefix}-${process.pid}-${++dockerNameSeq}`;
}

// Map a host path inside `runDir` to its path inside the runner container.
function execPath(runDir, hostPath) {
  if (!useDocker || typeof hostPath !== "string" || !hostPath.startsWith(runDir)) {
    return hostPath;
  }
  const rel = path.relative(runDir, hostPath);
  return rel ? path.posix.join(containerWork, rel.split(path.sep).join("/")) : containerWork;
}

// Wrap a command so it runs inside the sandbox. The command itself and any args
// that are host paths under `runDir` are remapped to /work. Returns the command
// unchanged when USE_DOCKER is off so local dev runs natively.
function sandbox(command, args, runDir, { name } = {}) {
  if (!useDocker) return { command, args };
  const flags = [
    "run", "--rm", "-i",
    "--network=none",
    "--memory=256m", "--memory-swap=256m", "--cpus=1", "--pids-limit=128",
    "--read-only", "--tmpfs", "/tmp:exec,size=64m",
    "--cap-drop=ALL",
    "--security-opt", "no-new-privileges",
    "--user", "1000:1000",
    "-v", `${runDir}:${containerWork}`,
    "-w", containerWork
  ];
  if (command === "lldb") {
    // lldb needs ptrace to control the inferior; the default seccomp profile can
    // block it. Relax seccomp for this one container only — it still has no
    // network, a read-only/ephemeral FS, runs non-root with no-new-privileges,
    // and is destroyed on exit. (A tighter default-seccomp+SYS_PTRACE profile is
    // possible but must be validated on the x86_64 prod host before switching.)
    flags.push("--cap-add=SYS_PTRACE", "--security-opt", "seccomp=unconfined");
  }
  if (name) flags.push("--name", name);
  flags.push(runnerImage, execPath(runDir, command), ...args.map((a) => execPath(runDir, a)));
  return { command: "docker", args: flags };
}

function killContainer(name) {
  if (!useDocker || !name) return;
  try { spawn("docker", ["kill", name], { stdio: "ignore" }); } catch { /* ignore */ }
}

// Base directory for per-run temp dirs. Defaults to the OS temp dir, but can be
// overridden — needed under Colima/Lima, whose VM only bind-mounts certain host
// paths (e.g. $HOME), not macOS's /var/folders temp dir. Set RUN_DIR_BASE to a
// shared path there so the runner container can see the source files.
const runDirBase = process.env.RUN_DIR_BASE || os.tmpdir();

// Create a per-run temp dir, made group/other-writable when sandboxing so the
// container's non-root user can write to the bind mount.
async function createRunDir(prefix) {
  await mkdir(runDirBase, { recursive: true }).catch(() => {});
  const dir = await mkdtemp(path.join(runDirBase, prefix));
  if (useDocker) await chmod(dir, 0o777).catch(() => {});
  return dir;
}

// ---------------------------------------------------------------------------
// Multi-user safety: cap total live debug sessions and concurrent runs, and
// rate-limit the code-executing endpoints per client IP so one visitor can't
// starve the box or fork-bomb containers.
// ---------------------------------------------------------------------------
const maxDebugSessions = Number(process.env.MAX_DEBUG_SESSIONS || 25);
const maxConcurrentRuns = Number(process.env.MAX_CONCURRENT_RUNS || 20);
const rateLimitWindowMs = 60 * 1000;
const rateLimitMax = Number(process.env.RATE_LIMIT_PER_MIN || 30);
const rateBuckets = new Map();
let activeRuns = 0;

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return (req.socket && req.socket.remoteAddress) || "unknown";
}

function rateLimited(ip) {
  const now = Date.now();
  let bucket = rateBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + rateLimitWindowMs };
    rateBuckets.set(ip, bucket);
  }
  bucket.count += 1;
  return bucket.count > rateLimitMax;
}

// Drop stale rate-limit buckets so the map can't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of rateBuckets) {
    if (now >= bucket.resetAt) rateBuckets.delete(ip);
  }
}, rateLimitWindowMs).unref();

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

await Promise.all([
  mkdir(templatesDir, { recursive: true }),
  mkdir(ioFilesDir, { recursive: true })
]);

// Connect to MySQL for accounts/persistence. Non-fatal: if it's unavailable the
// IDE still runs for anonymous users (no login, no saved data).
await initStore();

// Resolve the logged-in user (or null) from the signed session cookie.
async function currentUser(req) {
  if (!dbReady()) return null;
  const token = parseCookies(req).session;
  const uid = readSessionToken(token);
  if (!uid) return null;
  try {
    return await getUserById(uid);
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);

    // ---- Auth ----
    if (req.method === "GET" && url.pathname === "/api/auth/me") {
      const user = await currentUser(req);
      return sendJson(res, 200, {
        loginEnabled: dbReady(),
        clientId: GOOGLE_CLIENT_ID,
        user: user ? { name: user.name, email: user.email, picture: user.picture } : null
      });
    }

    if (req.method === "POST" && url.pathname === "/api/auth/google") {
      if (!dbReady()) return sendJson(res, 503, { error: "Accounts are unavailable right now." });
      const body = await readJsonBody(req);
      try {
        const claims = await verifyGoogleIdToken(body && body.credential);
        const user = await upsertUser(claims);
        const token = createSessionToken(user.id);
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "Set-Cookie": sessionCookieHeader(token, req)
        });
        return res.end(JSON.stringify({ user: { name: user.name, email: user.email, picture: user.picture } }));
      } catch (error) {
        return sendJson(res, 401, { error: `Sign-in failed: ${error.message}` });
      }
    }

    if (req.method === "POST" && url.pathname === "/api/auth/logout") {
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Set-Cookie": clearSessionCookieHeader()
      });
      return res.end(JSON.stringify({ ok: true }));
    }

    // ---- Per-user workspace (logged-in only; anonymous uses the browser) ----
    if (url.pathname.startsWith("/api/me/")) {
      const user = await currentUser(req);
      if (!user) return sendJson(res, 401, { error: "Not signed in." });
      const uid = user.id;

      if (req.method === "GET" && url.pathname === "/api/me/workspace") {
        const [files, contests, folders, settings, templates] = await Promise.all([
          listFiles(uid), listContests(uid), listFolders(uid), getSettings(uid), getTemplates(uid)
        ]);
        return sendJson(res, 200, {
          files: files.map((f) => ({
            language: f.language, scope: f.scope, contestId: f.contest_id,
            filename: f.filename, content: f.content || "", input: f.input_text || "",
            tests: Array.isArray(f.tests) ? f.tests : null,
            createdAt: f.created_at, updatedAt: f.updated_at
          })),
          contests: contests.map((c) => ({
            contestId: c.contest_id, name: c.name, language: c.language,
            problems: c.problems || [], savedAt: c.added_at
          })),
          folders: folders.map((f) => ({ folderId: f.folder_id, name: f.name, problems: f.problems || [], createdAt: f.created_at })),
          settings,
          templates
        });
      }

      if (req.method === "PUT" && url.pathname === "/api/me/file") {
        const b = await readJsonBody(req);
        if (!b || !b.language || !b.filename) return sendJson(res, 400, { error: "language and filename required" });
        await saveFile(uid, b);
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "PUT" && url.pathname === "/api/me/file-tests") {
        const b = await readJsonBody(req);
        if (!b || !b.language || !b.filename) return sendJson(res, 400, { error: "language and filename required" });
        await saveFileTests(uid, { ...b, tests: Array.isArray(b.tests) ? b.tests : [] });
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "DELETE" && url.pathname === "/api/me/file") {
        const b = await readJsonBody(req);
        await deleteFile(uid, b || {});
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "PUT" && url.pathname === "/api/me/settings") {
        const b = await readJsonBody(req);
        await saveSettings(uid, (b && b.settings) || {});
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "PUT" && url.pathname === "/api/me/template") {
        const b = await readJsonBody(req);
        const valid = ["cpp_template", "headers", "python_template", "java_template"];
        if (!b || !valid.includes(b.kind)) return sendJson(res, 400, { error: "invalid template kind" });
        await saveTemplate(uid, b.kind, b.content || "");
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "PUT" && url.pathname === "/api/me/contest") {
        const b = await readJsonBody(req);
        if (!b || !b.contestId) return sendJson(res, 400, { error: "contestId required" });
        await addContest(uid, b);
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "PUT" && url.pathname === "/api/me/folder") {
        const b = await readJsonBody(req);
        if (!b || !b.folderId) return sendJson(res, 400, { error: "folderId required" });
        await addFolder(uid, b);
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "PUT" && url.pathname === "/api/me/folders/order") {
        const b = await readJsonBody(req);
        if (!b || !Array.isArray(b.order)) return sendJson(res, 400, { error: "order array required" });
        await setFolderOrder(uid, b.order.map(String));
        return sendJson(res, 200, { ok: true });
      }
      if (req.method === "DELETE" && url.pathname === "/api/me/folder") {
        const b = await readJsonBody(req);
        if (!b || !b.folderId) return sendJson(res, 400, { error: "folderId required" });
        await removeFolder(uid, String(b.folderId));
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "DELETE" && url.pathname === "/api/me/contest") {
        const b = await readJsonBody(req);
        if (!b || !b.contestId) return sendJson(res, 400, { error: "contestId required" });
        await removeContest(uid, String(b.contestId));
        return sendJson(res, 200, { ok: true });
      }

      return sendJson(res, 404, { error: "Unknown workspace route." });
    }

    if (req.method === "POST" && url.pathname === "/api/run") {
      if (rateLimited(clientIp(req))) {
        return sendJson(res, 429, { error: "Too many requests. Please wait a moment and try again." });
      }
      if (activeRuns >= maxConcurrentRuns) {
        return sendJson(res, 503, { error: "The server is busy running other programs. Please retry shortly." });
      }
      const body = await readJsonBody(req);
      activeRuns += 1;
      try {
        const result = await executeCode(body);
        return sendJson(res, 200, result);
      } finally {
        activeRuns -= 1;
      }
    }

    if (req.method === "POST" && url.pathname === "/api/debug/start") {
      if (rateLimited(clientIp(req))) {
        return sendJson(res, 429, { error: "Too many requests. Please wait a moment and try again." });
      }
      const body = await readJsonBody(req);
      const result = await startDebugSession(body);
      return sendJson(res, 200, result);
    }

    if (req.method === "POST" && url.pathname === "/api/debug/step") {
      const body = await readJsonBody(req);
      const result = await stepDebugSession(body);
      return sendJson(res, 200, result);
    }

    if (req.method === "POST" && url.pathname === "/api/debug/stop") {
      const body = await readJsonBody(req);
      stopDebugSession(body && body.sessionId);
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "GET" && url.pathname === "/api/files") {
      const [input, output] = await Promise.all([
        readTextWithFallback(inputFilePath, legacyInputFilePath),
        readTextWithFallback(outputFilePath, legacyOutputFilePath)
      ]);
      return sendJson(res, 200, { input, output });
    }

    if (req.method === "GET" && url.pathname === "/api/settings") {
      const settings = await readJsonIfExists(appSettingsPath);
      return sendJson(res, 200, { settings: settings || {} });
    }

    if (req.method === "POST" && url.pathname === "/api/settings") {
      const body = await readJsonBody(req);
      await writeFile(appSettingsPath, JSON.stringify(body.settings || {}, null, 2), "utf8");
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "GET" && url.pathname === "/api/template-files") {
      const { template, headers, python, java } = await readTemplateBundle();
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      return sendJson(res, 200, { template, headers, python, java });
    }

    if (req.method === "POST" && url.pathname === "/api/template-files") {
      const body = await readJsonBody(req);
      await mkdir(templatesDir, { recursive: true });
      await Promise.all([
        writeFile(templateCppPath, String(body.template ?? ""), "utf8"),
        writeFile(headersPath, String(body.headers ?? ""), "utf8"),
        writeFile(templatePythonPath, String(body.python ?? ""), "utf8"),
        writeFile(templateJavaPath, String(body.java ?? ""), "utf8")
      ]);
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/codeforces/problems") {
      const body = await readJsonBody(req);
      const result = await fetchCodeforcesProblems(body.url);
      const templates = await readTemplateBundle();
      // Per-user model: don't write shared workspace/contests folders. Hand the
      // fetched problems + starter templates back; the client persists them
      // per-account (MySQL when signed in) or keeps them in memory (anonymous).
      const selectedLanguage = normalizeLanguage(body.language);
      const starter = templateForLanguage(templates, selectedLanguage);
      for (const problem of result.problems || []) {
        if (problem.code == null || problem.code === "") problem.code = starter;
      }
      result.files = { language: selectedLanguage, contestDir: "" };
      return sendJson(res, 200, result);
    }

    if (req.method === "POST" && url.pathname === "/api/codeforces/problem") {
      const body = await readJsonBody(req);
      const result = await fetchCodeforcesImport(body.url);
      const templates = await readTemplateBundle();
      const selectedLanguage = normalizeLanguage(body.language);
      const starter = templateForLanguage(templates, selectedLanguage);
      for (const problem of result.problems || []) {
        if (problem.code == null || problem.code === "") problem.code = starter;
      }
      return sendJson(res, 200, result);
    }

    if (req.method === "GET" && url.pathname === "/api/codeforces/status") {
      const handle = url.searchParams.get("handle") || "";
      const contestId = url.searchParams.get("contestId") || "";
      const index = url.searchParams.get("index") || "";
      const result = await fetchCodeforcesStatus({ handle, contestId, index });
      return sendJson(res, 200, result);
    }

    if (req.method === "GET" && url.pathname === "/api/codeforces/verdicts") {
      const handle = url.searchParams.get("handle") || "";
      const result = await fetchCodeforcesVerdicts({ handle });
      return sendJson(res, 200, result);
    }

    if (req.method === "GET" && url.pathname === "/api/codeforces/profile") {
      const handle = url.searchParams.get("handle") || "";
      const result = await fetchCodeforcesProfile({ handle });
      return sendJson(res, 200, result);
    }

    if (req.method !== "GET") {
      return sendJson(res, 405, { error: "Method not allowed" });
    }

    const filePath = safePublicPath(url.pathname);
    const exists = await stat(filePath).then((s) => s.isFile()).catch(() => false);
    const target = exists ? filePath : path.join(publicDir, "index.html");
    res.writeHead(200, {
      "Content-Type": mime[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    });
    createReadStream(target).pipe(res);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unexpected server error" });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`IDE running at http://127.0.0.1:${port}`);
});

function safePublicPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "") || "index.html";
  const target = path.normalize(path.join(publicDir, cleanPath));
  if (!target.startsWith(publicDir)) {
    return path.join(publicDir, "index.html");
  }
  return target;
}

async function readJsonBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw) > maxBodyBytes) {
      throw new Error("Request body is too large.");
    }
  }
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

async function readTextIfExists(filePath) {
  return readFile(filePath, "utf8").catch(() => "");
}

async function readJsonIfExists(filePath) {
  return readFile(filePath, "utf8")
    .then((value) => JSON.parse(value))
    .catch(() => null);
}

async function readTemplateBundle() {
  const [template, headers, python, java] = await Promise.all([
    readTextWithFallback(templateCppPath, legacyTemplateCppPath),
    readTextWithFallback(headersPath, legacyHeadersPath),
    readTextWithFallback(templatePythonPath, legacyTemplatePythonPath),
    readTextWithFallback(templateJavaPath, legacyTemplateJavaPath)
  ]);
  return { template, headers, python, java };
}

async function readTextWithFallback(primaryPath, fallbackPath) {
  const primary = await readTextIfExists(primaryPath);
  return primary || readTextIfExists(fallbackPath);
}

function normalizeLanguage(value) {
  return ["cpp", "python", "java"].includes(value) ? value : "cpp";
}

function templateForLanguage(templates, language) {
  if (language === "python") return templates.python || "";
  if (language === "java") return templates.java || "";
  return templates.template || "";
}

// Pull the problem index (A, B, F1, ...) out of a Codeforces problem URL.
function extractProblemIndex(raw) {
  const ref = parseBareProblemRef(raw);
  if (ref) return ref.index;
  try {
    const u = new URL(String(raw || ""));
    if (!/(^|\.)codeforces\.com$/i.test(u.hostname)) return "";
    const parts = u.pathname.split("/").filter(Boolean);
    const pi = parts.lastIndexOf("problem");
    if (pi !== -1) {
      const a = parts[pi + 1] || ""; // /contest/<id>/problem/<index>
      const b = parts[pi + 2] || ""; // /problemset/problem/<id>/<index>
      if (/^\d+$/.test(a) && /^[A-Za-z]\d*$/.test(b)) return b.toUpperCase();
      if (/^[A-Za-z]\d*$/.test(a)) return a.toUpperCase();
    }
    return "";
  } catch {
    const m = String(raw || "").match(/problem\/(?:\d+\/)?([A-Za-z]\d*)/i);
    return m ? m[1].toUpperCase() : "";
  }
}

function parseBareProblemRef(raw) {
  const text = String(raw || "").trim();
  if (!text) return null;
  const match = text.match(/^(\d{3,7})\s*[-_/ ]?\s*([A-Za-z]\d*)$/);
  if (!match) return null;
  return { contestId: match[1], index: match[2].toUpperCase() };
}

function splitProblemRefs(raw) {
  return String(raw || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

// Import either a single problem (URL has a problem index) or a whole contest
// (URL is a contest). Always returns { problems: [...] } with samples.
async function fetchCodeforcesImport(rawUrl) {
  const refs = splitProblemRefs(rawUrl);
  if (refs.length > 1) {
    const imported = await Promise.all(refs.map((ref) => fetchCodeforcesImport(ref)));
    return { problems: imported.flatMap((item) => item.problems || []) };
  }
  const raw = String(rawUrl || "");
  const bareRef = parseBareProblemRef(raw);
  const contestId = bareRef?.contestId || extractContestId(raw);
  const index = bareRef?.index || extractProblemIndex(raw);
  if (!contestId) {
    throw new Error("Paste a Codeforces problem URL or code, e.g. 1700A or https://codeforces.com/contest/1700/problem/A");
  }
  if (!index) {
    const contest = await fetchCodeforcesProblems(rawUrl);
    return {
      problems: (contest.problems || []).map((p) => ({
        contestId: p.contestId || contestId, index: p.index, name: p.name, samples: p.samples || []
      }))
    };
  }
  // Single problem: best-effort name from standings, samples from the page.
  let name = `Problem ${index}`;
  try {
    const apiUrl = new URL("https://codeforces.com/api/contest.standings");
    apiUrl.searchParams.set("contestId", contestId);
    const { ok, data } = await httpsGetJson(apiUrl, { headers: { "User-Agent": "Forge-IDE/1.0" } });
    if (ok && data?.status === "OK") {
      const p = (data.result.problems || []).find((pr) => String(pr.index).toUpperCase() === index);
      if (p?.name) name = p.name;
    }
  } catch { /* keep fallback name */ }
  const samples = await fetchProblemSamples(contestId, index).catch(() => []);
  return { problems: [{ contestId: Number(contestId), index, name, samples }] };
}

async function fetchCodeforcesProblems(contestUrl) {
  const contestId = extractContestId(String(contestUrl || ""));
  if (!contestId) {
    throw new Error("Paste a valid Codeforces contest URL, for example https://codeforces.com/contest/1999.");
  }

  const apiUrl = new URL("https://codeforces.com/api/contest.standings");
  apiUrl.searchParams.set("contestId", contestId);

  const { ok, status, data } = await httpsGetJson(apiUrl, {
    headers: {
      "User-Agent": "Forge-IDE/1.0"
    }
  });

  if (!ok || data?.status !== "OK") {
    const message = data?.comment || `Codeforces request failed with ${status}.`;
    const contest = await fetchCodeforcesContestInfo(contestId).catch(() => null);
    if (contest) {
      return buildPlaceholderContest(contestId, contest, message);
    }
    throw new Error(message);
  }

  const problems = await Promise.all(data.result.problems.map(async (problem) => ({
    contestId: problem.contestId,
    index: problem.index,
    name: problem.name,
    type: problem.type,
    points: problem.points ?? null,
    rating: problem.rating ?? null,
    samples: await fetchProblemSamples(problem.contestId || contestId, problem.index)
  })));

  if (!problems.length) {
    return buildPlaceholderContest(contestId, data.result.contest, "Problem data is not available yet.");
  }

  return {
    contestId,
    name: data.result.contest?.name || `Codeforces ${contestId}`,
    phase: data.result.contest?.phase || "",
    problems
  };
}

async function fetchCodeforcesContestInfo(contestId) {
  const apiUrl = new URL("https://codeforces.com/api/contest.list");
  const { ok, status, data } = await httpsGetJson(apiUrl, {
    headers: {
      "User-Agent": "Forge-IDE/1.0"
    }
  });
  if (!ok || data?.status !== "OK") {
    const message = data?.comment || `Codeforces contest list request failed with ${status}.`;
    throw new Error(message);
  }
  return data.result.find((contest) => String(contest.id) === String(contestId)) || null;
}

function buildPlaceholderContest(contestId, contest, reason) {
  const indexes = ["A", "B", "C", "D", "E", "F", "G"];
  return {
    contestId,
    name: contest?.name || `Codeforces ${contestId}`,
    phase: contest?.phase || "BEFORE",
    placeholder: true,
    message: reason,
    problems: indexes.map((index) => ({
      contestId: Number(contestId),
      index,
      name: `Problem ${index}`,
      type: "PROGRAMMING",
      points: null,
      rating: null,
      samples: [],
      placeholder: true
    }))
  };
}

// Best verdict per problem across the user's whole (recent) submission history:
// "OK" if the problem was ever accepted, otherwise the most recent verdict.
// Returns { handle, verdicts: { "<contestId>|<INDEX>": verdict } }.
async function fetchCodeforcesVerdicts({ handle }) {
  if (!/^[A-Za-z0-9_.-]{3,24}$/.test(handle)) {
    throw new Error("Invalid Codeforces handle.");
  }
  const apiUrl = new URL("https://codeforces.com/api/user.status");
  apiUrl.searchParams.set("handle", handle);
  apiUrl.searchParams.set("from", "1");
  apiUrl.searchParams.set("count", "10000");
  const { ok, status, data } = await httpsGetJson(apiUrl, {
    headers: { "User-Agent": "Forge-IDE/1.0" }
  });
  if (!ok || data?.status !== "OK") {
    throw new Error(data?.comment || `Codeforces status request failed with ${status}.`);
  }
  const verdicts = {};
  // data.result is newest-first; first seen per problem = latest verdict, and an
  // OK anywhere in the history overrides it.
  for (const submission of data.result) {
    const cid = submission.problem?.contestId;
    const idx = submission.problem?.index;
    if (cid == null || !idx) continue;
    const key = `${cid}|${String(idx).toUpperCase()}`;
    if (!(key in verdicts)) verdicts[key] = submission.verdict || "TESTING";
    if (submission.verdict === "OK") verdicts[key] = "OK";
  }
  return { handle, verdicts };
}

async function fetchCodeforcesStatus({ handle, contestId, index }) {
  if (!/^[A-Za-z0-9_.-]{3,24}$/.test(handle)) {
    throw new Error("Invalid Codeforces handle.");
  }

  const apiUrl = new URL("https://codeforces.com/api/user.status");
  apiUrl.searchParams.set("handle", handle);
  apiUrl.searchParams.set("from", "1");
  apiUrl.searchParams.set("count", "20");

  const { ok, status, data } = await httpsGetJson(apiUrl, {
    headers: {
      "User-Agent": "Forge-IDE/1.0"
    }
  });

  if (!ok || data?.status !== "OK") {
    const message = data?.comment || `Codeforces status request failed with ${status}.`;
    throw new Error(message);
  }

  const submissions = data.result
    .filter((submission) => {
      if (!contestId || !index) return true;
      return String(submission.problem?.contestId) === String(contestId)
        && String(submission.problem?.index) === String(index);
    })
    .map((submission) => ({
      id: submission.id,
      contestId: submission.problem?.contestId,
      index: submission.problem?.index,
      name: submission.problem?.name,
      programmingLanguage: submission.programmingLanguage,
      verdict: submission.verdict || "TESTING",
      passedTestCount: submission.passedTestCount ?? 0,
      timeConsumedMillis: submission.timeConsumedMillis ?? 0,
      memoryConsumedBytes: submission.memoryConsumedBytes ?? 0,
      creationTimeSeconds: submission.creationTimeSeconds
    }));

  return { handle, contestId, index, submissions, latest: submissions[0] || null };
}

function httpsGetText(url, { headers = {} } = {}) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => {
        resolve({ ok: response.statusCode >= 200 && response.statusCode < 300, status: response.statusCode, body });
      });
    });
    request.on("error", reject);
    request.setTimeout(10000, () => request.destroy(new Error("Codeforces request timed out.")));
  });
}

async function httpsGetJson(url, { headers = {} } = {}) {
  const { ok, status, body } = await httpsGetText(url, { headers });
  let data = null;
  try { data = JSON.parse(body); } catch { /* leave data null on non-JSON */ }
  return { ok, status, data };
}

const profileCache = new Map();
const profileCacheTtlMs = 5 * 60 * 1000;

async function fetchCodeforcesProfile({ handle }) {
  if (!/^[A-Za-z0-9_.-]{3,24}$/.test(handle)) {
    throw new Error("Invalid Codeforces handle.");
  }

  const key = handle.toLowerCase();
  const cached = profileCache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  const apiUrl = new URL("https://codeforces.com/api/user.info");
  apiUrl.searchParams.set("handles", handle);

  const { ok, status, data } = await httpsGetJson(apiUrl, {
    headers: {
      "User-Agent": "Forge-IDE/1.0"
    }
  });

  if (!ok || data?.status !== "OK" || !Array.isArray(data.result) || !data.result.length) {
    const message = data?.comment || `Codeforces profile request failed with ${status}.`;
    throw new Error(message);
  }

  const user = data.result[0];
  const activity = await fetchCodeforcesActivity(handle).catch(() => ({ heatmap: {}, solved: 0 }));
  const contests = await fetchCodeforcesContestCount(handle).catch(() => 0);
  const profile = {
    handle: user.handle || handle,
    rating: Number.isFinite(user.rating) ? user.rating : null,
    maxRating: Number.isFinite(user.maxRating) ? user.maxRating : null,
    rank: user.rank || null,
    maxRank: user.maxRank || null,
    titlePhoto: user.titlePhoto || null,
    heatmap: activity.heatmap,
    solved: activity.solved,
    contests
  };

  profileCache.set(key, { data: profile, expires: Date.now() + profileCacheTtlMs });
  return profile;
}

const sixMonthsMs = 183 * 24 * 60 * 60 * 1000;

// Codeforces has no heatmap API — derive from recent user.status submissions:
// a per-day submission count for the last year (heatmap, keyed "YYYY-MM-DD")
// and the number of distinct problems solved (verdict OK) in the last 6 months.
async function fetchCodeforcesActivity(handle) {
  const apiUrl = new URL("https://codeforces.com/api/user.status");
  apiUrl.searchParams.set("handle", handle);
  apiUrl.searchParams.set("from", "1");
  apiUrl.searchParams.set("count", "10000");

  const { ok, data } = await httpsGetJson(apiUrl, {
    headers: { "User-Agent": "Forge-IDE/1.0" }
  });
  if (!ok || data?.status !== "OK" || !Array.isArray(data.result)) return { heatmap: {}, solved: 0 };

  const dayMs = 24 * 60 * 60 * 1000;
  const heatmapCutoff = Date.now() - 372 * dayMs;
  const solvedCutoff = Date.now() - sixMonthsMs;
  const heatmap = {};
  const solved = new Set();
  for (const submission of data.result) {
    const time = (submission.creationTimeSeconds || 0) * 1000;
    if (time >= heatmapCutoff) {
      const date = new Date(time);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      heatmap[key] = (heatmap[key] || 0) + 1;
    }
    if (time >= solvedCutoff && submission.verdict === "OK" && submission.problem) {
      solved.add(`${submission.problem.contestId || "x"}-${submission.problem.index || ""}-${submission.problem.name || ""}`);
    }
  }
  return { heatmap, solved: solved.size };
}

// Rated contest participations in the last 6 months (from user.rating history).
async function fetchCodeforcesContestCount(handle) {
  const apiUrl = new URL("https://codeforces.com/api/user.rating");
  apiUrl.searchParams.set("handle", handle);

  const { ok, data } = await httpsGetJson(apiUrl, {
    headers: { "User-Agent": "Forge-IDE/1.0" }
  });
  if (!ok || data?.status !== "OK" || !Array.isArray(data.result)) return 0;

  const cutoff = Math.floor((Date.now() - sixMonthsMs) / 1000);
  return data.result.filter((entry) => (entry.ratingUpdateTimeSeconds || 0) >= cutoff).length;
}

async function fetchProblemSamples(contestId, index) {
  const problemUrl = `https://codeforces.com/contest/${contestId}/problem/${encodeURIComponent(index)}`;
  try {
    const { ok, body: html } = await httpsGetText(problemUrl, {
      headers: {
        "User-Agent": "Forge-IDE/1.0"
      }
    });
    if (!ok) return [];

    if (!/class="sample-test"/i.test(html)) return [];

    const sampleBlock = html.match(/<div class="sample-test">([\s\S]*?)<div class="note">/i)?.[1]
      || html.match(/<div class="sample-test">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i)?.[1]
      || "";

    // Normalize a <pre> block to plain text: turn line/break tags into newlines
    // (CF's newer format wraps each line in <div class="test-example-line">),
    // strip remaining tags, then decode entities.
    const preText = (raw) => decodeHtml(
      String(raw).replace(/<br\s*\/?>(?:\s*)/gi, "\n").replace(/<\/div>/gi, "\n").replace(/<[^>]+>/g, "")
    )
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/^\n+|\n+$/g, "")
      .concat("\n");

    const grab = (cls) => {
      const re = new RegExp(`<div class="${cls}">[\\s\\S]*?<pre>([\\s\\S]*?)<\\/pre>`, "gi");
      const out = [];
      let m;
      while ((m = re.exec(sampleBlock)) !== null) out.push(preText(m[1]));
      return out;
    };
    const inputs = grab("input");
    const outputs = grab("output");

    const samples = [];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].trim()) samples.push({ input: inputs[i], output: outputs[i] || "" });
    }
    return samples;
  } catch {
    return [];
  }
}

function decodeHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<div[^>]*class=["'][^"']*test-example-line[^"']*["'][^>]*>/gi, "")
    .replace(/<\/div>/gi, "\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function extractContestId(contestUrl) {
  const raw = String(contestUrl || "").trim();
  if (!raw) return "";
  const ref = parseBareProblemRef(raw);
  if (ref) return ref.contestId;
  // bare contest number, e.g. "2231"
  if (/^\d+$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    if (!/(^|\.)codeforces\.com$/i.test(url.hostname)) return "";
    const parts = url.pathname.split("/").filter(Boolean);
    // .../contest/<id>/... or .../gym/<id>/...
    for (const key of ["contest", "gym"]) {
      const idx = parts.lastIndexOf(key);
      if (idx !== -1 && /^\d+$/.test(parts[idx + 1] || "")) return parts[idx + 1];
    }
    // .../problemset/problem/<id>/<index>
    const problemIdx = parts.indexOf("problem");
    if (problemIdx !== -1 && /^\d+$/.test(parts[problemIdx + 1] || "")) return parts[problemIdx + 1];
    if (/^\d+$/.test(parts[0] || "")) return parts[0];
  } catch {
    const match = raw.match(/(?:contest|gym|problem)\/(\d+)/i);
    return match?.[1] || "";
  }
  return "";
}

async function executeCode({ language, code, input = "", mode = "run", breakpoints = [] }) {
  if (!["python", "cpp", "java"].includes(language)) {
    throw new Error("Unsupported language.");
  }

  const extension = language === "python" ? "py" : language === "java" ? "java" : "cpp";
  const runDir = await createRunDir("rathee-ide-run-");
  const source = path.join(runDir, language === "java" ? "Main.java" : `main.${extension}`);
  const inputFile = inputFilePath;
  const outputFile = outputFilePath;
  try {
    await mkdir(ioFilesDir, { recursive: true });
    await Promise.all([
      writeFile(source, String(code ?? ""), "utf8"),
      writeFile(inputFile, String(input ?? ""), "utf8"),
      writeFile(outputFile, "", "utf8")
    ]);

    const startedAt = performance.now();
    let compile = null;
    let run;

    const breakpointLines = normalizeBreakpoints(breakpoints);

    if (language === "python") {
      run = await runProcess("python3", [source], { input, cwd: runDir, timeoutMs: runTimeoutMs });
    } else if (language === "java") {
      compile = await runProcess("javac", [source], { cwd: runDir, timeoutMs: runTimeoutMs });

      if (compile.code !== 0 || compile.timedOut) {
        await writeFile(outputFile, "", "utf8");
        return formatResult({ language, mode, startedAt, compile, run: null, output: "" });
      }

      run = await runProcess("java", ["-cp", runDir, "Main"], { input, cwd: runDir, timeoutMs: runTimeoutMs });
    } else {
      const binary = path.join(runDir, "main.out");
      compile = await runProcess("g++", [
        "-std=c++20",
        "-Wall",
        "-Wextra",
        ...(mode === "debug" ? ["-O0", "-g", "-fsanitize=address,undefined"] : ["-O2"]),
        source,
        "-o",
        binary
      ], { cwd: runDir, timeoutMs: runTimeoutMs });

      if (compile.code !== 0 || compile.timedOut) {
        await writeFile(outputFile, "", "utf8");
        return formatResult({ language, mode, startedAt, compile, run: null, output: "" });
      }

      run = mode === "debug" && breakpointLines.length
        ? await runLldbDebugger({ binary, source, inputFile, cwd: runDir, breakpoints: breakpointLines })
        : await runProcess(binary, [], { input, cwd: runDir, timeoutMs: runTimeoutMs });
    }

    const output = run.debugger ? "" : run.stdout;
    await writeFile(outputFile, output, "utf8");
    return formatResult({ language, mode, startedAt, compile, run, output });
  } finally {
    await rm(runDir, { recursive: true, force: true });
  }
}

function normalizeBreakpoints(value) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value
    .map((line) => Number(line))
    .filter((line) => Number.isInteger(line) && line > 0 && line < 100000)))
    .sort((a, b) => a - b);
}

async function runLldbDebugger({ binary, source, inputFile, cwd, breakpoints }) {
  const commands = [
    ...breakpoints.flatMap((line) => ["-o", `breakpoint set --file ${path.basename(source)} --line ${line}`]),
    "-o", `process launch -i ${inputFile}`,
    "-o", "frame variable",
    "-o", "bt",
    "-o", "process kill",
    "-o", "quit"
  ];
  const result = await runProcess("lldb", ["--batch", ...commands, binary], {
    cwd,
    timeoutMs: runTimeoutMs
  });
  result.debugger = "lldb";
  result.breakpoints = breakpoints;
  return result;
}

// ---------------------------------------------------------------------------
// Interactive lldb debug sessions (C++ only).
// A session keeps a single lldb process alive across HTTP requests so the UI
// can step line-by-line. Commands are synchronised with a unique print marker
// and the debuggee's stdio is redirected to files so it never mixes with the
// debugger's own output.
// ---------------------------------------------------------------------------

const debugSessions = new Map();
let debugSessionSeq = 0;
const debugIdleMs = 5 * 60 * 1000;

async function startDebugSession({ language = "cpp", code, input = "", breakpoints = [], clientId = "" }) {
  if (language === "java") {
    return { state: "error", message: "Java debugging is not supported yet. Use Run for Java files." };
  }
  // End only this client's own previous session (so concurrent users don't
  // kill each other). With no clientId we fall back to the old single-session
  // behaviour. A global cap bounds total live sessions.
  if (clientId) stopClientDebugSessions(clientId);
  else stopAllDebugSessions();

  if (debugSessions.size >= maxDebugSessions) {
    return { state: "error", message: "The debugger is at capacity right now. Please try again in a moment." };
  }

  const opts = { code, input, breakpoints, clientId };
  if (language === "python") {
    return startPythonDebugSession(opts);
  }
  return startCppDebugSession(opts);
}

function stopClientDebugSessions(clientId) {
  for (const session of [...debugSessions.values()]) {
    if (session.clientId === clientId) cleanupDebugSession(session);
  }
}

async function startCppDebugSession({ code, input = "", breakpoints = [], clientId = "" }) {
  const runDir = await createRunDir("rathee-ide-debug-");
  const source = path.join(runDir, "main.cpp");
  const binary = path.join(runDir, "main.out");
  const progInput = path.join(runDir, "prog_in.txt");
  const progOutput = path.join(runDir, "prog_out.txt");
  const progError = path.join(runDir, "prog_err.txt");

  try {
    await Promise.all([
      writeFile(source, String(code ?? ""), "utf8"),
      writeFile(progInput, String(input ?? ""), "utf8"),
      writeFile(progOutput, "", "utf8"),
      writeFile(progError, "", "utf8")
    ]);
    await mkdir(ioFilesDir, { recursive: true });
    await writeFile(inputFilePath, String(input ?? ""), "utf8");
    await writeFile(outputFilePath, "", "utf8");

    const compile = await runProcess("g++", [
      "-std=c++20", "-Wall", "-Wextra", "-O0", "-g", source, "-o", binary
    ], { cwd: runDir, timeoutMs: runTimeoutMs });

    if (compile.code !== 0 || compile.timedOut) {
      await rm(runDir, { recursive: true, force: true });
      return {
        state: "compile_error",
        message: compile.timedOut
          ? "Compilation timed out."
          : (compile.stderr || compile.stdout || "Compilation failed.")
      };
    }

    const containerName = useDocker ? dockerName("lldb") : null;
    const launched = sandbox("lldb", ["--no-use-colors", binary], runDir, { name: containerName });
    const child = spawn(launched.command, launched.args, {
      cwd: runDir,
      stdio: ["pipe", "pipe", "pipe"]
    });
    const id = `dbg-${++debugSessionSeq}`;
    const session = {
      id,
      kind: "lldb",
      clientId,
      child,
      containerName,
      runDir,
      source,
      binary,
      progInput,
      progOutput,
      progError,
      breakpoints: normalizeBreakpoints(breakpoints),
      pending: null,
      markerSeq: 0,
      stderr: "",
      finished: false,
      idleTimer: null
    };
    debugSessions.set(id, session);

    child.stdout.on("data", (chunk) => handleDebugData(session, chunk.toString()));
    child.stderr.on("data", (chunk) => { session.stderr += chunk.toString(); });
    child.on("error", () => { session.finished = true; });

    // Force synchronous execution so launch/step/continue block until the
    // process actually stops; otherwise lldb returns to the prompt while the
    // program is still running and we cannot report the stop location.
    await sendLldbCommand(session, "script lldb.debugger.SetAsync(False)");
    await sendLldbCommand(session, "settings set use-color false");
    await sendLldbCommand(session, "settings set stop-line-count-before 0");
    await sendLldbCommand(session, "settings set stop-line-count-after 0");

    for (const line of session.breakpoints) {
      await sendLldbCommand(session, `breakpoint set --file main.cpp --line ${line}`);
    }
    if (!session.breakpoints.length) {
      await sendLldbCommand(session, "breakpoint set --name main");
    }

    await sendLldbCommand(
      session,
      `process launch -i "${execPath(runDir, progInput)}" -o "${execPath(runDir, progOutput)}" -e "${execPath(runDir, progError)}"`
    );

    const state = await probeDebugState(session);
    rememberDebugPosition(session, state);
    finalizeDebugState(session, state);
    return { sessionId: id, ...state };
  } catch (error) {
    await rm(runDir, { recursive: true, force: true });
    return { state: "error", message: error.message };
  }
}

async function stepDebugSession({ sessionId, action }) {
  const session = debugSessions.get(sessionId);
  if (!session) {
    return { state: "error", message: "No active debug session. Start debugging again." };
  }
  if (session.finished) {
    const programOutput = await readProgramOutput(session);
    return { sessionId, state: "exited", exitStatus: session.exitCode || 0, programOutput, message: "Program already finished." };
  }

  const command = stepCommandFor(session.kind, action);
  if (!command) {
    return { sessionId, state: "error", message: "Unknown debug action." };
  }

  try {
    let state;
    if (action === "continue") {
      await sendDebugCommand(session, command);
      state = await probeDebugState(session);
    } else {
      // A single source line can map to several line-table rows (e.g. a line
      // with two statements). Keep stepping while we land back on the exact
      // same line in the same frame so one "Step" click always advances the
      // visible line, instead of appearing stuck. Capped to avoid runaway.
      const prevLine = session.lastLine;
      const prevDepth = session.lastDepth;
      let guard = 0;
      do {
        await sendDebugCommand(session, command);
        state = await probeDebugState(session);
        guard += 1;
      } while (
        state.state === "stopped" &&
        state.line != null &&
        prevLine != null &&
        state.line === prevLine &&
        state.frameDepth === prevDepth &&
        guard < 64
      );
    }

    // Python stepping can land outside the user's file: "Step In" descends into
    // builtins/library code (e.g. input()), and an uncaught exception parks pdb
    // in its own machinery. Either way, step back out until we're in main.py
    // (or the program ends), mirroring how the C++ debugger skips non-user code.
    if (session.kind === "pdb" && action !== "continue") {
      let guard = 0;
      while (state.state === "stopped" && state.inUserCode === false && guard < 64) {
        await sendDebugCommand(session, "return");
        state = await probeDebugState(session);
        guard += 1;
      }
    }

    rememberDebugPosition(session, state);
    finalizeDebugState(session, state);
    return { sessionId, ...state };
  } catch (error) {
    stopDebugSession(sessionId);
    return { sessionId, state: "error", message: error.message };
  }
}

function rememberDebugPosition(session, state) {
  session.lastLine = state.state === "stopped" ? state.line : null;
  session.lastDepth = state.state === "stopped" ? state.frameDepth : null;
}

function finalizeDebugState(session, state) {
  if (state.state === "exited" || state.state === "error") {
    cleanupDebugSession(session);
  } else {
    touchDebugSession(session);
  }
}

function stepCommandFor(kind, action) {
  if (kind === "pdb") {
    return { over: "next", in: "step", out: "return", continue: "continue" }[action];
  }
  return {
    over: "thread step-over",
    in: "thread step-in",
    out: "thread step-out",
    continue: "process continue"
  }[action];
}

function sendDebugCommand(session, command) {
  return session.kind === "pdb"
    ? sendPdbCommand(session, command)
    : sendLldbCommand(session, command);
}

function probeDebugState(session) {
  return session.kind === "pdb" ? probePythonState(session) : probeLldbState(session);
}

async function probeLldbState(session) {
  const status = await sendLldbCommand(session, "process status");
  const exitMatch = status.match(/exited with status\s*=\s*(-?\d+)/i);
  if (exitMatch || /is not (?:being run|currently being run)/i.test(status)) {
    session.finished = true;
    const programOutput = await readProgramOutput(session);
    const exitStatus = exitMatch ? Number(exitMatch[1]) : 0;
    return {
      state: "exited",
      exitStatus,
      programOutput,
      message: exitMatch
        ? `Program exited with status ${exitStatus}.`
        : "Program finished."
    };
  }

  const reasonMatch = status.match(/stop reason\s*=\s*(.+)/i);
  const frame = await sendLldbCommand(session, "frame info");
  const locMatch = frame.match(/at\s+([^\s:]+):(\d+)/);
  const locals = await sendLldbCommand(session, "frame variable");
  const stack = await sendLldbCommand(session, "bt");
  const programOutput = await readProgramOutput(session);

  return {
    state: "stopped",
    file: locMatch ? locMatch[1] : "main.cpp",
    line: locMatch ? Number(locMatch[2]) : null,
    frameDepth: (stack.match(/frame #/g) || []).length,
    stopReason: reasonMatch ? reasonMatch[1].trim() : "",
    locals: filterLldbLocals(locals),
    callStack: filterLldbStack(stack),
    programOutput
  };
}

function filterLldbLocals(text) {
  const lines = String(text || "")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim() && !/^error:/i.test(line.trim()));
  return lines.join("\n").trim() || "No local variables in this frame.";
}

function filterLldbStack(text) {
  const lines = String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /frame #|thread #/.test(line));
  return lines.join("\n").trim() || String(text || "").trim() || "No call stack available.";
}

async function readProgramOutput(session) {
  let text = "";
  try {
    text = await readFile(session.progOutput, "utf8");
  } catch {
    text = "";
  }
  await writeFile(outputFilePath, text, "utf8").catch(() => {});
  return text;
}

function handleDebugData(session, text) {
  const pending = session.pending;
  if (!pending) return;
  pending.chunks += text;
  if (session.kind === "pdb") {
    // pdb prints the "(Pdb) " prompt and then blocks waiting for the next
    // command, so a trailing prompt marks the end of this command's output.
    const match = /\(Pdb\)\s*$/.exec(pending.chunks);
    if (!match) return;
    finishPending(session, pending.chunks.slice(0, match.index));
  } else {
    const idx = pending.chunks.indexOf(pending.marker);
    if (idx === -1) return;
    finishPending(session, pending.chunks.slice(0, idx));
  }
}

function finishPending(session, raw) {
  const pending = session.pending;
  if (!pending) return;
  session.pending = null;
  clearTimeout(pending.timer);
  const output = session.kind === "pdb"
    ? cleanPdbOutput(raw)
    : cleanLldbOutput(raw, pending.command);
  pending.resolve(output);
}

function sendLldbCommand(session, command, timeoutMs = runTimeoutMs) {
  return new Promise((resolve, reject) => {
    if (!session.child || session.child.killed) {
      reject(new Error("Debug session is not running."));
      return;
    }
    const seq = ++session.markerSeq;
    const marker = `RATHEEMARK${seq}END`;
    const pending = { marker, command, chunks: "", resolve, reject, timer: null };
    pending.timer = setTimeout(() => {
      if (session.pending === pending) session.pending = null;
      reject(new Error("Debugger command timed out (possible infinite loop)."));
    }, timeoutMs);
    session.pending = pending;
    try {
      session.child.stdin.write(`${command}\nscript print("RATHEEMARK" + "${seq}END")\n`);
    } catch (error) {
      clearTimeout(pending.timer);
      session.pending = null;
      reject(error);
    }
  });
}

function cleanLldbOutput(text, command) {
  return String(text)
    .split("\n")
    .map((line) => line.replace(/^\(lldb\)\s?/, "").trimEnd())
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed === "(lldb)") return false;
      // Piped stdin makes lldb echo the command and the trailing marker print.
      if (command && trimmed === command.trim()) return false;
      if (/^script print\("RATHEEMARK"/.test(trimmed)) return false;
      return true;
    })
    .join("\n")
    .trim();
}

// ---------------------------------------------------------------------------
// Python (pdb) interactive debug sessions.
// A bootstrap launches the target under pdb, but redirects the *program's*
// stdin/stdout/stderr to files while pdb itself keeps talking over the real
// pipes. That keeps the command channel clean: the child's stdout only ever
// carries pdb output, terminated by the "(Pdb) " prompt.
// ---------------------------------------------------------------------------

// NOTE: pdb._runscript calls __main__.__dict__.clear(), which wipes any
// module-level names this bootstrap defined. Everything therefore lives inside
// _main() with local imports so the references survive into the finally block.
const pythonDebugBootstrap = `def _main():
    import sys, pdb, traceback
    target, in_path, out_path, err_path = sys.argv[1:5]
    dbg = pdb.Pdb(stdin=sys.__stdin__, stdout=sys.__stdout__)
    dbg.use_rawinput = 0
    dbg.prompt = "(Pdb) "
    prog_in = open(in_path, "r")
    prog_out = open(out_path, "w", buffering=1)
    prog_err = open(err_path, "w", buffering=1)
    sys.stdin = prog_in
    sys.stdout = prog_out
    sys.stderr = prog_err
    sys.argv = [target]
    code = 0
    try:
        dbg._runscript(target)
    except SystemExit as exc:
        code = exc.code if isinstance(exc.code, int) else (0 if exc.code in (None, "") else 1)
    except BaseException:
        traceback.print_exc(file=prog_err)
        code = 1
    finally:
        try:
            prog_out.flush()
            prog_err.flush()
        except Exception:
            pass
    sys.exit(code)

_main()
`;

async function startPythonDebugSession({ code, input = "", breakpoints = [], clientId = "" }) {
  const runDir = await createRunDir("rathee-ide-debug-py-");
  const source = path.join(runDir, "main.py");
  const bootstrap = path.join(runDir, "__debug_runner.py");
  const progInput = path.join(runDir, "prog_in.txt");
  const progOutput = path.join(runDir, "prog_out.txt");
  const progError = path.join(runDir, "prog_err.txt");

  try {
    await Promise.all([
      writeFile(source, String(code ?? ""), "utf8"),
      writeFile(bootstrap, pythonDebugBootstrap, "utf8"),
      writeFile(progInput, String(input ?? ""), "utf8"),
      writeFile(progOutput, "", "utf8"),
      writeFile(progError, "", "utf8")
    ]);
    await mkdir(ioFilesDir, { recursive: true });
    await writeFile(inputFilePath, String(input ?? ""), "utf8");
    await writeFile(outputFilePath, "", "utf8");

    // Syntax-check up front, mirroring the C++ compile step.
    const check = await runProcess(
      "python3",
      ["-c", "import py_compile, sys; py_compile.compile(sys.argv[1], doraise=True)", source],
      { cwd: runDir, timeoutMs: runTimeoutMs }
    );
    if (check.code !== 0 || check.timedOut) {
      await rm(runDir, { recursive: true, force: true });
      return {
        state: "compile_error",
        message: check.timedOut ? "Compilation timed out." : (check.stderr || check.stdout || "Syntax error.")
      };
    }

    const containerName = useDocker ? dockerName("pdb") : null;
    const launched = sandbox(
      "python3",
      ["-u", bootstrap, source, progInput, progOutput, progError],
      runDir,
      { name: containerName }
    );
    const child = spawn(launched.command, launched.args, {
      cwd: runDir,
      stdio: ["pipe", "pipe", "pipe"]
    });
    const id = `dbg-${++debugSessionSeq}`;
    const session = {
      id,
      kind: "pdb",
      clientId,
      child,
      containerName,
      runDir,
      source,
      progInput,
      progOutput,
      progError,
      breakpoints: normalizeBreakpoints(breakpoints),
      pending: null,
      stderr: "",
      finished: false,
      exitCode: null,
      idleTimer: null,
      lastLine: null,
      lastDepth: null
    };
    debugSessions.set(id, session);

    child.stdout.on("data", (chunk) => handleDebugData(session, chunk.toString()));
    child.stderr.on("data", (chunk) => { session.stderr += chunk.toString(); });
    child.on("error", () => { session.finished = true; });
    child.on("close", (codeNum) => {
      session.finished = true;
      session.exitCode = typeof codeNum === "number" ? codeNum : (session.exitCode || 0);
      if (session.pending) finishPending(session, session.pending.chunks);
    });

    // pdb stops just before the first line runs; wait for that initial prompt.
    await sendPdbCommand(session, null);
    for (const line of session.breakpoints) {
      await sendPdbCommand(session, `break ${line}`);
    }
    if (session.breakpoints.length && !session.finished) {
      await sendPdbCommand(session, "continue");
    }

    const state = await probeDebugState(session);
    rememberDebugPosition(session, state);
    finalizeDebugState(session, state);
    return { sessionId: id, ...state };
  } catch (error) {
    await rm(runDir, { recursive: true, force: true });
    return { state: "error", message: error.message };
  }
}

async function probePythonState(session) {
  if (session.finished) {
    const programOutput = await readProgramOutput(session);
    const exitStatus = session.exitCode || 0;
    let message = exitStatus ? `Program exited with status ${exitStatus}.` : "Program finished.";
    if (exitStatus) {
      const traceback = cleanPythonTraceback(await readFileSafe(session.progError));
      if (traceback) message = `Python traceback\n${traceback}`;
    }
    return { state: "exited", exitStatus, programOutput, message };
  }

  const where = await sendPdbCommand(session, "where");
  if (session.finished) return probePythonState(session);
  const { line, frameDepth, callStack, inUserCode } = parsePdbWhere(where);
  const locals = await collectPdbLocals(session);
  const programOutput = await readProgramOutput(session);

  return {
    state: "stopped",
    file: "main.py",
    line,
    frameDepth,
    inUserCode,
    stopReason: "",
    locals: locals || "No local variables in this frame.",
    callStack: callStack || "No call stack available.",
    programOutput
  };
}

// pdb `where` lists frames oldest-first with the current one marked "> ".
// Keep only the user's main.py frames and number them current-first (#0).
function parsePdbWhere(text) {
  const frames = [];
  let currentLine = null;
  let inUserCode = false;
  for (const line of String(text || "").split("\n")) {
    // The current frame at a "--Return--" stop ends with "func()->value", so
    // allow an optional return-value suffix after the parentheses.
    const tail = /\((\d+)\)([^()]*)\(\)(?:->.*)?\s*$/.exec(line);
    if (!tail) continue;
    const head = /^(\s*>)?\s*(.+?)\(\d+\)/.exec(line);
    const filePath = head ? head[2].trim() : "";
    if (!/main\.py$/.test(filePath)) continue;
    const frame = { line: Number(tail[1]), func: (tail[2] || "").trim() || "<module>" };
    if (/^\s*>/.test(line)) {
      currentLine = frame.line;
      inUserCode = true; // the active frame is in the user's file
    }
    frames.push(frame);
  }
  frames.reverse();
  if (currentLine == null && frames.length) currentLine = frames[0].line;
  const callStack = frames
    .map((f, i) => `frame #${i}: 0x0 main.py\`${f.func} at main.py:${f.line}`)
    .join("\n");
  return { line: currentLine, frameDepth: frames.length, callStack, inUserCode };
}

async function collectPdbLocals(session) {
  const namesRaw = await sendPdbCommand(
    session,
    "p sorted(k for k in list(locals().keys()) if not k.startswith('__'))"
  );
  const names = [];
  const re = /'([^']*)'|"([^"]*)"/g;
  let match;
  while ((match = re.exec(namesRaw)) && names.length < 50) {
    names.push(match[1] != null ? match[1] : match[2]);
  }

  const lines = [];
  for (const name of names) {
    if (!/^[A-Za-z_]\w*$/.test(name)) continue;
    const type = (await sendPdbCommand(session, `p type(${name}).__name__`)).replace(/^['"]|['"]$/g, "").trim();
    const value = (await sendPdbCommand(session, `p ${name}`)).trim();
    lines.push(`(${type}) ${name} = ${value}`);
  }
  return lines.join("\n");
}

function sendPdbCommand(session, command) {
  return new Promise((resolve, reject) => {
    if (session.finished || !session.child || session.child.killed) {
      resolve("");
      return;
    }
    const pending = { kind: "pdb", chunks: "", resolve, reject, timer: null };
    pending.timer = setTimeout(() => {
      if (session.pending === pending) session.pending = null;
      reject(new Error("Debugger command timed out (possible infinite loop)."));
    }, runTimeoutMs);
    session.pending = pending;
    if (command != null) {
      try {
        session.child.stdin.write(`${command}\n`);
      } catch (error) {
        clearTimeout(pending.timer);
        session.pending = null;
        reject(error);
      }
    }
  });
}

function cleanPdbOutput(text) {
  return String(text).replace(/\(Pdb\)\s?/g, "").replace(/\r/g, "").trim();
}

async function readFileSafe(filePath) {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

// Drop the bootstrap/pdb/bdb frames from a Python traceback and rewrite the
// temp path so only the user's main.py frames remain.
function cleanPythonTraceback(text) {
  const lines = String(text || "").split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i += 1) {
    const fileMatch = /^\s*File "(.+?)", line \d+/.exec(lines[i]);
    if (fileMatch) {
      const file = fileMatch[1];
      if (/__debug_runner\.py$|[\\/](?:pdb|bdb)\.py$|^<string>$/.test(file)) {
        // Skip the indented source line that follows a frame, but only if it
        // is one (e.g. "<string>" frames have none — don't eat the next frame).
        const next = lines[i + 1];
        if (next != null && /^\s/.test(next) && !/^\s*File "/.test(next)) i += 1;
        continue;
      }
      out.push(lines[i].replace(/File ".*main\.py"/, 'File "main.py"'));
      continue;
    }
    if (/^During handling of the above exception/.test(lines[i].trim())) continue;
    out.push(lines[i]);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function touchDebugSession(session) {
  if (session.idleTimer) clearTimeout(session.idleTimer);
  session.idleTimer = setTimeout(() => cleanupDebugSession(session), debugIdleMs);
}

function stopDebugSession(sessionId) {
  const session = debugSessions.get(sessionId);
  if (session) cleanupDebugSession(session);
}

function stopAllDebugSessions() {
  for (const session of [...debugSessions.values()]) cleanupDebugSession(session);
}

function cleanupDebugSession(session) {
  debugSessions.delete(session.id);
  if (session.idleTimer) clearTimeout(session.idleTimer);
  if (session.pending) {
    clearTimeout(session.pending.timer);
    session.pending = null;
  }
  try { session.child.stdin.write("quit\n"); } catch { /* ignore */ }
  try { session.child.kill("SIGKILL"); } catch { /* ignore */ }
  killContainer(session.containerName);
  rm(session.runDir, { recursive: true, force: true }).catch(() => {});
}

function formatResult({ language, mode, startedAt, compile, run, output }) {
  const elapsedMs = Math.round(performance.now() - startedAt);
  const status = compile && compile.code !== 0
    ? "compile_error"
    : run?.timedOut
      ? "timeout"
      : run?.code === 0
        ? "success"
        : "runtime_error";

  const debug = mode === "debug"
    ? buildDebugReport({ language, compile, run, status })
    : "";

  return {
    status,
    elapsedMs,
    output,
    stderr: [compile?.stderr, run?.stderr].filter(Boolean).join("\n").trim(),
    compile,
    run,
    debug
  };
}

function buildDebugReport({ language, compile, run, status }) {
  if (status === "compile_error") {
    return `Compiler diagnostics\n${compile.stderr || compile.stdout || "No compiler output."}`;
  }

  if (status === "timeout") {
    return "Debugger report\nProgram exceeded the 8 second limit. Check for infinite loops or blocking input reads.";
  }

  if (run?.code !== 0) {
    if (run?.debugger === "lldb") {
      return buildLldbReport(run);
    }
    const heading = language === "python"
      ? "Python traceback"
      : "C++ runtime diagnostics";
    return `${heading}\n${run.stderr || "The process exited with a non-zero status without diagnostics."}`;
  }

  if (run?.debugger === "lldb") {
    return buildLldbReport(run);
  }

  return "Debug run completed successfully. No runtime errors were reported.";
}

function buildLldbReport(run) {
  const text = [run.stdout, run.stderr].filter(Boolean).join("\n").trim();
  if (run.timedOut) {
    return "Debugger report\nLLDB timed out while running the program.";
  }

  const stopped = /stop reason = breakpoint/i.test(text);
  if (!stopped) {
    return [
      "Debugger report",
      "Program finished without hitting a breakpoint.",
      "",
      text || "LLDB produced no output."
    ].join("\n");
  }

  const stopLine = text.split("\n").find((line) => /stop reason = breakpoint/i.test(line)) || "Paused at breakpoint.";
  const variables = extractLldbCommandOutput(text, "frame variable", "bt")
    .split("\n")
    .filter((line) => /^\([^)]+\)\s+/.test(line.trim()))
    .join("\n")
    .trim();
  const stack = extractLldbCommandOutput(text, "bt", "process kill")
    .split("\n")
    .filter((line) => /^(?:\*\s*)?(?:thread|frame #)|^\s*(?:\*\s*)?frame #/.test(line.trim()))
    .join("\n")
    .trim();

  return [
    "Paused at breakpoint",
    stopLine.trim(),
    "",
    "Variables",
    variables || "No local variables were reported for this frame.",
    "",
    "Call stack",
    stack || "No call stack was reported."
  ].join("\n");
}

function extractLldbCommandOutput(text, command, nextCommand) {
  const lines = text.split("\n");
  const collected = [];
  let collecting = false;
  for (const line of lines) {
    if (!collecting && line.trim() === `(lldb) ${command}`) {
      collecting = true;
      continue;
    }
    if (collecting && line.trim() === `(lldb) ${nextCommand}`) {
      break;
    }
    if (collecting) collected.push(line);
  }
  return collected
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .join("\n")
    .trim();
}

function runProcess(command, args, { input = "", cwd, timeoutMs }) {
  const name = useDocker && cwd ? dockerName("run") : null;
  const launched = name ? sandbox(command, args, cwd, { name }) : { command, args };
  return new Promise((resolve) => {
    const child = spawn(launched.command, launched.args, { cwd, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      killContainer(name);
      child.kill("SIGKILL");
    }, timeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ code: 127, stdout, stderr: `${stderr}${error.message}`, timedOut });
    });

    child.on("close", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal, stdout, stderr, timedOut });
    });

    child.stdin.end(input);
  });
}
