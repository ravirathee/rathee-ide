import http from "node:http";
import https from "node:https";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile, stat, rm, readdir, rename } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const workspaceDir = path.join(__dirname, "workspace");
const temporaryCppFilesDir = path.join(workspaceDir, "TemporaryCPPFiles");
const temporaryPythonFilesDir = path.join(workspaceDir, "TemporaryPythonFiles");
const templatesDir = path.join(workspaceDir, "Templates");
const ioFilesDir = path.join(workspaceDir, "IOFiles");
const inputFilePath = path.join(ioFilesDir, "input.txt");
const outputFilePath = path.join(ioFilesDir, "output.txt");
const legacyInputFilePath = path.join(workspaceDir, "input.txt");
const legacyOutputFilePath = path.join(workspaceDir, "output.txt");
const templateCppPath = path.join(templatesDir, "Template.cpp");
const headersPath = path.join(templatesDir, "Headers.hpp");
const templatePythonPath = path.join(templatesDir, "Template.py");
const legacyTemplateCppPath = path.join(workspaceDir, "Template.cpp");
const legacyHeadersPath = path.join(workspaceDir, "Headers.hpp");
const legacyTemplatePythonPath = path.join(workspaceDir, "Template.py");
const appSettingsPath = path.join(workspaceDir, "AppSettings.json");
const contestPythonDirName = "zPY";
const contestDataDirName = "zContestData";
const legacyContestPythonDirNames = ["py", "PythonFiles", "PythodCode"];
const legacyContestDataDirNames = ["contestData"];
const port = Number(process.env.PORT || 4173);
const maxBodyBytes = 1024 * 1024;
const runTimeoutMs = 8000;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

await Promise.all([
  mkdir(temporaryCppFilesDir, { recursive: true }),
  mkdir(temporaryPythonFilesDir, { recursive: true }),
  mkdir(templatesDir, { recursive: true }),
  mkdir(ioFilesDir, { recursive: true })
]);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    if (req.method === "POST" && url.pathname === "/api/run") {
      const body = await readJsonBody(req);
      const result = await executeCode(body);
      return sendJson(res, 200, result);
    }

    if (req.method === "POST" && url.pathname === "/api/debug/start") {
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
      const { template, headers, python } = await readTemplateBundle();
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      return sendJson(res, 200, { template, headers, python });
    }

    if (req.method === "POST" && url.pathname === "/api/template-files") {
      const body = await readJsonBody(req);
      await mkdir(templatesDir, { recursive: true });
      await Promise.all([
        writeFile(templateCppPath, String(body.template ?? ""), "utf8"),
        writeFile(headersPath, String(body.headers ?? ""), "utf8"),
        writeFile(templatePythonPath, String(body.python ?? ""), "utf8")
      ]);
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "GET" && url.pathname === "/api/workspace-cpp-files") {
      const files = await listWorkspaceCodeFiles({ directory: temporaryCppFilesDir, extension: ".cpp" });
      return sendJson(res, 200, { files });
    }

    if (req.method === "POST" && url.pathname === "/api/workspace-cpp-files") {
      const body = await readJsonBody(req);
      const filename = safeWorkspaceCppFilename(body.filename);
      await mkdir(temporaryCppFilesDir, { recursive: true });
      await writeFile(path.join(temporaryCppFilesDir, filename), String(body.code ?? ""), "utf8");
      return sendJson(res, 200, { ok: true, filename });
    }

    if (req.method === "DELETE" && url.pathname === "/api/workspace-cpp-files") {
      const filename = safeWorkspaceCppFilename(url.searchParams.get("filename") || "");
      await rm(path.join(temporaryCppFilesDir, filename), { force: true });
      return sendJson(res, 200, { ok: true, filename });
    }

    if (req.method === "GET" && url.pathname === "/api/workspace-python-files") {
      const files = await listWorkspaceCodeFiles({ directory: temporaryPythonFilesDir, extension: ".py" });
      return sendJson(res, 200, { files });
    }

    if (req.method === "POST" && url.pathname === "/api/workspace-python-files") {
      const body = await readJsonBody(req);
      const filename = safeWorkspacePythonFilename(body.filename);
      await mkdir(temporaryPythonFilesDir, { recursive: true });
      await writeFile(path.join(temporaryPythonFilesDir, filename), String(body.code ?? ""), "utf8");
      return sendJson(res, 200, { ok: true, filename });
    }

    if (req.method === "DELETE" && url.pathname === "/api/workspace-python-files") {
      const filename = safeWorkspacePythonFilename(url.searchParams.get("filename") || "");
      await rm(path.join(temporaryPythonFilesDir, filename), { force: true });
      return sendJson(res, 200, { ok: true, filename });
    }

    if (req.method === "POST" && url.pathname === "/api/codeforces/problems") {
      const body = await readJsonBody(req);
      const result = await fetchCodeforcesProblems(body.url);
      const templates = await readTemplateBundle();
      const materialized = await materializeContestFiles(result, { language: body.language, templates });
      result.files = materialized;
      return sendJson(res, 200, result);
    }

    if (req.method === "GET" && url.pathname === "/api/codeforces/contest") {
      const result = await loadSavedContest({
        contestDir: url.searchParams.get("contestDir") || "",
        contestId: url.searchParams.get("contestId") || "",
        language: url.searchParams.get("language") || "cpp"
      });
      return sendJson(res, 200, result);
    }

    if (req.method === "GET" && url.pathname === "/api/codeforces/contests") {
      const contests = await listSavedContests();
      return sendJson(res, 200, { contests });
    }

    if (req.method === "POST" && url.pathname === "/api/codeforces/contest-file") {
      const body = await readJsonBody(req);
      const contestPath = await resolveSavedContestDir({
        contestDir: body.contestDir || "",
        contestId: body.contestId || ""
      });
      const filename = safeContestCodeFilename(body.filename);
      const fileRoot = filename.endsWith(".py")
        ? path.join(contestPath, contestPythonDirName)
        : contestPath;
      await mkdir(fileRoot, { recursive: true });
      await writeFile(path.join(fileRoot, filename), String(body.code ?? ""), "utf8");
      return sendJson(res, 200, { ok: true, filename });
    }

    if (req.method === "GET" && url.pathname === "/api/codeforces/status") {
      const handle = url.searchParams.get("handle") || "";
      const contestId = url.searchParams.get("contestId") || "";
      const index = url.searchParams.get("index") || "";
      const result = await fetchCodeforcesStatus({ handle, contestId, index });
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
  const [template, headers, python] = await Promise.all([
    readTextWithFallback(templateCppPath, legacyTemplateCppPath),
    readTextWithFallback(headersPath, legacyHeadersPath),
    readTextWithFallback(templatePythonPath, legacyTemplatePythonPath)
  ]);
  return { template, headers, python };
}

async function readTextWithFallback(primaryPath, fallbackPath) {
  const primary = await readTextIfExists(primaryPath);
  return primary || readTextIfExists(fallbackPath);
}

async function listWorkspaceCodeFiles({ directory, extension }) {
  await mkdir(directory, { recursive: true });
  const entries = await readdir(directory, { withFileTypes: true });
  const names = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => isSafeWorkspaceCodeFilename(name, extension));

  const files = await Promise.all(names.sort(compareCppFilenames).map(async (filename) => ({
    filename,
    code: await readTextIfExists(path.join(directory, filename))
  })));
  return files;
}

function safeWorkspaceCppFilename(filename) {
  if (!isSafeWorkspaceCodeFilename(filename, ".cpp")) {
    throw new Error("Invalid workspace C++ filename.");
  }
  return filename;
}

function safeWorkspacePythonFilename(filename) {
  if (!isSafeWorkspaceCodeFilename(filename, ".py")) {
    throw new Error("Invalid workspace Python filename.");
  }
  return filename;
}

function safeContestCodeFilename(filename) {
  const value = String(filename || "");
  if (
    !/^[A-Za-z0-9_-]+\.(cpp|py)$/.test(value) ||
    value.startsWith(".") ||
    value.includes("/") ||
    value.includes("\\") ||
    value.includes("\0")
  ) {
    throw new Error("Invalid contest code filename.");
  }
  return value;
}

function isSafeWorkspaceCodeFilename(filename, extension) {
  return typeof filename === "string"
    && filename.endsWith(extension)
    && !filename.startsWith(".")
    && !filename.includes("/")
    && !filename.includes("\\")
    && !filename.includes("\0");
}

function compareCppFilenames(a, b) {
  const aBase = a.replace(/\.cpp$/, "");
  const bBase = b.replace(/\.cpp$/, "");
  return aBase.localeCompare(bBase, undefined, { numeric: true, sensitivity: "base" });
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

async function materializeContestFiles(contest, { language, templates }) {
  const contestRoot = path.join(workspaceDir, "contests");
  const contestFolderName = safeFolderName(`${contest.contestId}-${contest.name}`);
  const contestDir = path.join(contestRoot, contestFolderName);
  await mkdir(contestDir, { recursive: true });
  const previousMetadata = await readContestMetadata(contestDir);
  await writeContestMetadata(contestDir, contest);

  const selectedLanguage = language === "python" ? "python" : "cpp";
  if (selectedLanguage === "python") {
    const pythonDir = path.join(contestDir, contestPythonDirName);
    await mkdir(pythonDir, { recursive: true });
    if (previousMetadata.placeholder && !contest.placeholder) {
      await migratePlaceholderFiles({ problems: contest.problems, fileRoot: pythonDir, extension: ".py" });
    }
    const files = await Promise.all(contest.problems.map((problem) => {
      const filename = `${safeProblemIndex(problem.index)}.py`;
      const filePath = path.join(pythonDir, filename);
      return writeFileIfMissing(filePath, String(templates.python || "")).then(() => ({
        problem: problem.index,
        path: path.relative(workspaceDir, filePath)
      }));
    }));
    return { language: selectedLanguage, contestDir: path.relative(workspaceDir, contestDir), files };
  }

  if (previousMetadata.placeholder && !contest.placeholder) {
    await migratePlaceholderFiles({ problems: contest.problems, fileRoot: contestDir, extension: ".cpp" });
  }
  const files = await Promise.all(contest.problems.map((problem) => {
    const filename = `${safeProblemIndex(problem.index)}.cpp`;
    const filePath = path.join(contestDir, filename);
    return writeFileIfMissing(filePath, String(templates.template || "")).then(() => ({
      problem: problem.index,
      path: path.relative(workspaceDir, filePath)
    }));
  }));
  return { language: selectedLanguage, contestDir: path.relative(workspaceDir, contestDir), files };
}

async function writeFileIfMissing(filePath, contents) {
  const exists = await stat(filePath).then((value) => value.isFile()).catch(() => false);
  if (!exists) {
    await writeFile(filePath, contents, "utf8");
  }
}

async function migratePlaceholderFiles({ problems, fileRoot, extension }) {
  const placeholderIndexes = ["A", "B", "C", "D", "E", "F", "G"];
  await Promise.all((problems || []).map(async (problem, position) => {
    const placeholderIndex = placeholderIndexes[position];
    if (!placeholderIndex || placeholderIndex === problem.index) return;
    const from = path.join(fileRoot, `${placeholderIndex}${extension}`);
    const to = path.join(fileRoot, `${safeProblemIndex(problem.index)}${extension}`);
    const [fromExists, toExists] = await Promise.all([
      stat(from).then((value) => value.isFile()).catch(() => false),
      stat(to).then((value) => value.isFile()).catch(() => false)
    ]);
    if (fromExists && !toExists) {
      await rename(from, to);
    }
  }));
}

async function writeContestMetadata(contestDir, contest) {
  const contestDataDir = path.join(contestDir, contestDataDirName);
  await mkdir(contestDataDir, { recursive: true });
  const metadata = {
    contestId: contest.contestId,
    name: contest.name,
    phase: contest.phase || "",
    placeholder: Boolean(contest.placeholder),
    message: contest.message || "",
    problems: contest.problems || [],
    savedAt: new Date().toISOString()
  };
  await writeFile(path.join(contestDataDir, "contest.json"), JSON.stringify(metadata, null, 2), "utf8");
}

async function loadSavedContest({ contestDir, contestId, language }) {
  const contestPath = await resolveSavedContestDir({ contestDir, contestId });
  const metadata = await readContestMetadata(contestPath);
  const selectedLanguage = language === "python" ? "python" : "cpp";
  const fileRoot = selectedLanguage === "python" ? await resolveContestPythonDir(contestPath) : contestPath;
  const extension = selectedLanguage === "python" ? ".py" : ".cpp";

  const problems = await Promise.all((metadata.problems || []).map(async (problem) => {
    const filename = `${safeProblemIndex(problem.index)}${extension}`;
    return {
      ...problem,
      filename,
      code: await readTextIfExists(path.join(fileRoot, filename))
    };
  }));

  return {
    contestId: metadata.contestId,
    name: metadata.name,
    phase: metadata.phase || "",
    placeholder: Boolean(metadata.placeholder),
    message: metadata.message || "",
    problems,
    files: {
      language: selectedLanguage,
      contestDir: path.relative(workspaceDir, contestPath),
      files: problems.map((problem) => ({
        problem: problem.index,
        path: path.relative(workspaceDir, path.join(fileRoot, problem.filename))
      }))
    }
  };
}

async function resolveContestPythonDir(contestPath) {
  const current = path.join(contestPath, contestPythonDirName);
  const hasCurrent = await stat(current).then((value) => value.isDirectory()).catch(() => false);
  if (hasCurrent) return current;
  for (const legacyName of legacyContestPythonDirNames) {
    const legacy = path.join(contestPath, legacyName);
    const hasLegacy = await stat(legacy).then((value) => value.isDirectory()).catch(() => false);
    if (hasLegacy) return legacy;
  }
  return current;
}

async function listSavedContests() {
  const contestRoot = path.join(workspaceDir, "contests");
  await mkdir(contestRoot, { recursive: true });
  const entries = await readdir(contestRoot, { withFileTypes: true }).catch(() => []);
  const contests = await Promise.all(entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map(async (entry) => {
      const contestPath = path.join(contestRoot, entry.name);
      const metadata = await readContestMetadata(contestPath);
      return {
        contestId: metadata.contestId || entry.name.match(/^(\d+)/)?.[1] || "",
        name: metadata.name || entry.name.replace(/^\d+-?/, ""),
        phase: metadata.phase || "",
        contestDir: path.relative(workspaceDir, contestPath),
        problemCount: metadata.problems?.length || 0,
        placeholder: Boolean(metadata.placeholder),
        message: metadata.message || "",
        problems: (metadata.problems || []).map((problem) => ({
          contestId: problem.contestId,
          index: problem.index,
          name: problem.name
        })),
        savedAt: metadata.savedAt || "",
        lastModifiedAt: await latestCodeFileMtime(contestPath)
      };
    }));

  return contests.sort((a, b) => {
    const byId = Number(b.contestId || 0) - Number(a.contestId || 0);
    return byId || a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
  });
}

// Latest edit time of any code file (.cpp/.py) in a contest dir and its python subdirs,
// ignoring contest.json so a re-fetch doesn't count as "edited a file".
async function latestCodeFileMtime(contestPath) {
  const dirs = [contestPath, path.join(contestPath, contestPythonDirName),
    ...legacyContestPythonDirNames.map((name) => path.join(contestPath, name))];
  let latest = 0;
  for (const dir of dirs) {
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith(".cpp") && !entry.name.endsWith(".py")) continue;
      const info = await stat(path.join(dir, entry.name)).catch(() => null);
      if (info && info.mtimeMs > latest) latest = info.mtimeMs;
    }
  }
  return latest ? new Date(latest).toISOString() : "";
}

async function readContestMetadata(contestPath) {
  const saved = await readContestMetadataFile(contestPath);
  if (saved?.problems?.length) return saved;

  const folderName = path.basename(contestPath);
  const contestId = folderName.match(/^(\d+)/)?.[1] || "";
  const name = folderName.replace(/^\d+-?/, "") || `Codeforces ${contestId}`;
  const entries = await readdir(contestPath, { withFileTypes: true }).catch(() => []);
  const problems = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".cpp"))
    .map((entry) => entry.name.replace(/\.cpp$/, ""))
    .sort(compareCppFilenames)
    .map((index) => ({
      contestId,
      index,
      name: index,
      samples: []
    }));

  return { contestId, name, phase: "", problems };
}

async function readContestMetadataFile(contestPath) {
  const currentPath = path.join(contestPath, contestDataDirName, "contest.json");
  const legacyPath = path.join(contestPath, "contest.json");
  return readFile(currentPath, "utf8")
    .then((value) => JSON.parse(value))
    .catch(async () => {
      for (const legacyName of legacyContestDataDirNames) {
        const legacyDataPath = path.join(contestPath, legacyName, "contest.json");
        const legacyData = await readFile(legacyDataPath, "utf8")
          .then((value) => JSON.parse(value))
          .catch(() => null);
        if (legacyData) return legacyData;
      }
      return readFile(legacyPath, "utf8")
        .then((value) => JSON.parse(value))
        .catch(() => null);
    });
}

async function resolveSavedContestDir({ contestDir, contestId }) {
  const contestRoot = path.join(workspaceDir, "contests");
  const fromDir = String(contestDir || "").trim();
  if (fromDir) {
    const normalized = path.normalize(fromDir).replace(/^(\.\.[/\\])+/, "");
    const absolute = path.resolve(workspaceDir, normalized);
    if (!absolute.startsWith(contestRoot + path.sep)) {
      throw new Error("Invalid contest folder.");
    }
    const exists = await stat(absolute).then((s) => s.isDirectory()).catch(() => false);
    if (exists) return absolute;
  }

  const id = String(contestId || "").trim();
  if (!/^\d+$/.test(id)) {
    throw new Error("Saved contest folder was not found.");
  }
  const entries = await readdir(contestRoot, { withFileTypes: true }).catch(() => []);
  const match = entries.find((entry) => entry.isDirectory() && entry.name.startsWith(`${id}-`));
  if (!match) {
    throw new Error("Saved contest folder was not found.");
  }
  return path.join(contestRoot, match.name);
}

function safeFolderName(value) {
  return String(value)
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "contest";
}

function safeProblemIndex(index) {
  return String(index).replace(/[^A-Za-z0-9_-]/g, "_");
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

    const samples = [];
    const inputRegex = /<div class="input">[\s\S]*?<pre>([\s\S]*?)<\/pre>/gi;
    let match;
    while ((match = inputRegex.exec(sampleBlock)) !== null) {
      const input = decodeHtml(match[1])
        .replace(/\r\n/g, "\n")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/^\n+|\n+$/g, "")
        .concat("\n");
      if (input.trim()) samples.push({ input });
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
  if (!["python", "cpp"].includes(language)) {
    throw new Error("Unsupported language.");
  }

  const extension = language === "python" ? "py" : "cpp";
  const runDir = await mkdtemp(path.join(os.tmpdir(), "rathee-ide-run-"));
  const source = path.join(runDir, `main.${extension}`);
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
    } else {
      const binary = path.join(runDir, "main.out");
      compile = await runProcess("g++", [
        "-std=c++17",
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

async function startDebugSession({ language = "cpp", code, input = "", breakpoints = [] }) {
  stopAllDebugSessions();
  if (language === "python") {
    return startPythonDebugSession({ code, input, breakpoints });
  }
  return startCppDebugSession({ code, input, breakpoints });
}

async function startCppDebugSession({ code, input = "", breakpoints = [] }) {
  const runDir = await mkdtemp(path.join(os.tmpdir(), "rathee-ide-debug-"));
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
      "-std=c++17", "-Wall", "-Wextra", "-O0", "-g", source, "-o", binary
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

    const child = spawn("lldb", ["--no-use-colors", binary], {
      cwd: runDir,
      stdio: ["pipe", "pipe", "pipe"]
    });
    const id = `dbg-${++debugSessionSeq}`;
    const session = {
      id,
      kind: "lldb",
      child,
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
      `process launch -i "${progInput}" -o "${progOutput}" -e "${progError}"`
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

async function startPythonDebugSession({ code, input = "", breakpoints = [] }) {
  const runDir = await mkdtemp(path.join(os.tmpdir(), "rathee-ide-debug-py-"));
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

    const child = spawn("python3", ["-u", bootstrap, source, progInput, progOutput, progError], {
      cwd: runDir,
      stdio: ["pipe", "pipe", "pipe"]
    });
    const id = `dbg-${++debugSessionSeq}`;
    const session = {
      id,
      kind: "pdb",
      child,
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
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
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
