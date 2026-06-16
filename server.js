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
    res.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream" });
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

async function executeCode({ language, code, input = "", mode = "run" }) {
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

    if (language === "python") {
      run = await runProcess("python3", [source], { input, cwd: runDir, timeoutMs: runTimeoutMs });
    } else {
      const binary = path.join(runDir, "main.out");
      compile = await runProcess("g++", [
        "-std=c++17",
        "-Wall",
        "-Wextra",
        "-O2",
        ...(mode === "debug" ? ["-g", "-fsanitize=address,undefined"] : []),
        source,
        "-o",
        binary
      ], { cwd: runDir, timeoutMs: runTimeoutMs });

      if (compile.code !== 0 || compile.timedOut) {
        await writeFile(outputFile, "", "utf8");
        return formatResult({ language, mode, startedAt, compile, run: null, output: "" });
      }

      run = await runProcess(binary, [], { input, cwd: runDir, timeoutMs: runTimeoutMs });
    }

    await writeFile(outputFile, run.stdout, "utf8");
    return formatResult({ language, mode, startedAt, compile, run, output: run.stdout });
  } finally {
    await rm(runDir, { recursive: true, force: true });
  }
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
    const heading = language === "python"
      ? "Python traceback"
      : "C++ runtime diagnostics";
    return `${heading}\n${run.stderr || "The process exited with a non-zero status without diagnostics."}`;
  }

  return "Debug run completed successfully. No runtime errors were reported.";
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
