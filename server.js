import http from "node:http";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const workspaceDir = path.join(__dirname, "workspace");
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

await mkdir(workspaceDir, { recursive: true });

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
        readTextIfExists(path.join(workspaceDir, "input.txt")),
        readTextIfExists(path.join(workspaceDir, "output.txt"))
      ]);
      return sendJson(res, 200, { input, output });
    }

    if (req.method === "GET" && url.pathname === "/api/template-files") {
      const [template, headers] = await Promise.all([
        readTextIfExists(path.join(workspaceDir, "Template.cpp")),
        readTextIfExists(path.join(workspaceDir, "Headers.hpp"))
      ]);
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      return sendJson(res, 200, { template, headers });
    }

    if (req.method === "POST" && url.pathname === "/api/template-files") {
      const body = await readJsonBody(req);
      await Promise.all([
        writeFile(path.join(workspaceDir, "Template.cpp"), String(body.template ?? ""), "utf8"),
        writeFile(path.join(workspaceDir, "Headers.hpp"), String(body.headers ?? ""), "utf8")
      ]);
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/codeforces/problems") {
      const body = await readJsonBody(req);
      const result = await fetchCodeforcesProblems(body.url);
      return sendJson(res, 200, result);
    }

    if (req.method === "GET" && url.pathname === "/api/codeforces/status") {
      const handle = url.searchParams.get("handle") || "";
      const contestId = url.searchParams.get("contestId") || "";
      const index = url.searchParams.get("index") || "";
      const result = await fetchCodeforcesStatus({ handle, contestId, index });
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

async function fetchCodeforcesProblems(contestUrl) {
  const contestId = extractContestId(String(contestUrl || ""));
  if (!contestId) {
    throw new Error("Paste a valid Codeforces contest URL, for example https://codeforces.com/contest/1999.");
  }

  const apiUrl = new URL("https://codeforces.com/api/contest.standings");
  apiUrl.searchParams.set("contestId", contestId);

  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": "Forge-IDE/1.0"
    }
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || data?.status !== "OK") {
    const message = data?.comment || `Codeforces request failed with ${response.status}.`;
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
    throw new Error("No problems were found for this contest.");
  }

  return {
    contestId,
    name: data.result.contest?.name || `Codeforces ${contestId}`,
    phase: data.result.contest?.phase || "",
    problems
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

  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": "Forge-IDE/1.0"
    }
  });
  const data = await response.json().catch(() => null);

  if (!response.ok || data?.status !== "OK") {
    const message = data?.comment || `Codeforces status request failed with ${response.status}.`;
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

async function fetchProblemSamples(contestId, index) {
  const problemUrl = `https://codeforces.com/contest/${contestId}/problem/${encodeURIComponent(index)}`;
  try {
    const response = await fetch(problemUrl, {
      headers: {
        "User-Agent": "Forge-IDE/1.0"
      }
    });
    if (!response.ok) return [];

    const html = await response.text();
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
  try {
    const url = new URL(contestUrl.trim());
    if (!/(^|\.)codeforces\.com$/i.test(url.hostname)) return "";
    const parts = url.pathname.split("/").filter(Boolean);
    const contestIndex = parts.lastIndexOf("contest");
    if (contestIndex !== -1 && /^\d+$/.test(parts[contestIndex + 1] || "")) {
      return parts[contestIndex + 1];
    }
    const gymIndex = parts.lastIndexOf("gym");
    if (gymIndex !== -1 && /^\d+$/.test(parts[gymIndex + 1] || "")) {
      return parts[gymIndex + 1];
    }
    if (/^\d+$/.test(parts[0] || "")) return parts[0];
  } catch {
    const match = contestUrl.match(/(?:contest|gym)\/(\d+)/i);
    return match?.[1] || "";
  }
  return "";
}

async function executeCode({ language, code, input = "", mode = "run" }) {
  if (!["python", "cpp"].includes(language)) {
    throw new Error("Unsupported language.");
  }

  const extension = language === "python" ? "py" : "cpp";
  const source = path.join(workspaceDir, `main.${extension}`);
  const inputFile = path.join(workspaceDir, "input.txt");
  const outputFile = path.join(workspaceDir, "output.txt");
  await Promise.all([
    writeFile(source, String(code ?? ""), "utf8"),
    writeFile(inputFile, String(input ?? ""), "utf8"),
    writeFile(outputFile, "", "utf8")
  ]);

  const startedAt = performance.now();
  let compile = null;
  let run;

  if (language === "python") {
    run = await runProcess("python3", [source], { input, cwd: workspaceDir, timeoutMs: runTimeoutMs });
  } else {
    const binary = path.join(workspaceDir, "main.out");
    compile = await runProcess("g++", [
      "-std=c++17",
      "-Wall",
      "-Wextra",
      "-O2",
      ...(mode === "debug" ? ["-g", "-fsanitize=address,undefined"] : []),
      source,
      "-o",
      binary
    ], { cwd: workspaceDir, timeoutMs: runTimeoutMs });

    if (compile.code !== 0 || compile.timedOut) {
      await writeFile(outputFile, "", "utf8");
      return formatResult({ language, mode, startedAt, compile, run: null, output: "" });
    }

    run = await runProcess(binary, [], { input, cwd: workspaceDir, timeoutMs: runTimeoutMs });
  }

  await writeFile(outputFile, run.stdout, "utf8");
  return formatResult({ language, mode, startedAt, compile, run, output: run.stdout });
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
