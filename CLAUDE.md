# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` (alias `npm start`) — boots the IDE at `http://127.0.0.1:4173`. There is no build step, no bundler, and **no npm dependencies** (the server uses only `node:*` builtins; CodeMirror is loaded from a CDN in `public/index.html`).
- `node --check server.js` / `node --check public/app.js` — syntax check; used as the project's "lint".
- `PORT=<n> npm run dev` — override port (default 4173, bound to 127.0.0.1 only).
- No test suite exists.

Runtime prerequisites on the host: `python3` and `g++` must be on `PATH`. `g++` is invoked with `-std=c++17 -Wall -Wextra -O2`; debug mode adds `-g -fsanitize=address,undefined`. Each run has an 8-second wall-clock cap (`runTimeoutMs` in `server.js`).

## Architecture

Three files do almost everything: `server.js`, `public/app.js`, `public/index.html` + `public/styles.css`. There is no framework — the frontend is plain DOM + CodeMirror, the backend is a hand-rolled `http.createServer`.

### Execution model (`server.js` → `executeCode`)

The server never runs user code in-place. Each `POST /api/run` creates an ephemeral `mkdtemp` directory, writes the submitted source as `main.py` / `main.cpp`, spawns the interpreter/compiler there, then deletes the dir in a `finally`. Stdin comes from the request body; stdout is captured into the response **and** mirrored to `workspace/IOFiles/output.txt`. The matching `input.txt` is written before the run. This is the "competitive programming I/O" contract the UI advertises — both files are always overwritten on each run.

### Path conventions and legacy fallbacks

`server.js` declares both a *current* and a *legacy* path for several files (templates, input/output, contest metadata directories). Reads use `readTextWithFallback` / `resolveContestPythonDir` to try the current location first and fall back to the legacy one. **When adding new files or renaming, mirror this pattern** — older user workspaces still have files at the legacy paths and must keep working.

Important canonical locations:

- `workspace/IOFiles/{input,output}.txt` — runtime I/O (legacy: `workspace/input.txt`, `workspace/output.txt`).
- `workspace/Templates/{Template.cpp, Headers.hpp, Template.py}` — user-editable defaults (legacy: same names at `workspace/` root).
- `workspace/TemporaryCPPFiles/*.cpp`, `workspace/TemporaryPythonFiles/*.py` — scratch tabs surfaced as the "Temporary Code Files" view. Filenames are validated by `isSafeWorkspaceCodeFilename` (letters/digits/`_-`, must end in the right extension, no dotfiles, no path separators).
- `workspace/contests/<contestId>-<safeName>/` — imported Codeforces contests. C++ files live directly inside; Python files go in the `zPY/` subdirectory (legacy names: `py`, `PythonFiles`, `PythodCode`). Contest metadata is `zContestData/contest.json` (legacy: `contestData/contest.json` or `contest.json` at the contest root).
- `workspace/AppSettings.json` — server-persisted UI/layout/handle settings, written via `POST /api/settings`. The frontend also keeps a `localStorage` mirror so older installs still work if the file is missing.

### Codeforces integration

Two public endpoints are used (no auth, no scraping of logged-in pages):

- `https://codeforces.com/api/contest.standings?contestId=...` — problem list. If it fails (e.g. contest is in `BEFORE`/pending state), the server falls back to `contest.list` and builds a **placeholder contest** with indexes A–G. When the real data later arrives, `migratePlaceholderFiles` renames the placeholder files (`A.cpp` → real index) so user code isn't lost.
- `https://codeforces.com/api/user.status` — recent submissions for the configured handle (used by the `Status` button).

Sample inputs come from scraping the public problem HTML (`fetchProblemSamples` in `server.js`) — Cloudflare can block this; the code handles empty results gracefully. The user agent is `Forge-IDE/1.0`.

Submission is **never automated**. The `Submit` button copies the combined source (`Headers.hpp` + active code, with duplicate `#include`/`using namespace` lines stripped — see `stripDuplicateHeaders` in `app.js`) to the clipboard and opens the Codeforces submit page in the user's browser session.

### Frontend state shape (`public/app.js`)

The frontend maintains **parallel state per language**: `cppFileNames`/`cppFiles`/`cppInputs`/`cppTabLabels`/`cppProblems`/`activeCppFile` and the matching `py*` set. `codeFileScope` is either `"workspace"` (temporary files) or `"contest"` (an imported contest), and `activeContestDir` holds the relative contest path when scoped to a contest. Saves are routed to one of `saveWorkspaceCppFile` / `saveWorkspacePythonFile` / `saveContestCppFile` / `saveContestPythonFile` based on this scope — when adding new file actions, route through `scheduleWorkspaceCodeSave` rather than calling `fetch` directly.

Editor views (`editorView`): `"code"` for problem files, `"template"`/`"headers"`/`"python-template"` for the three template editors. The "Load from Template" / "Reload File" / `Save` action button reconfigures itself based on the active view (see `updateEditorActionButton`); template edits are **not** autosaved (the dirty `Save` button is explicit), but problem-code edits are debounced-saved via `scheduleWorkspaceCodeSave`.

### Combined source for C++ runs

Both `getRunCode` and `getSubmitCode` (in `app.js`) prepend `Headers.hpp` to the active C++ file via `combineCppSource`, then run `stripDuplicateHeaders` so a user who pastes `#include <bits/stdc++.h>` into their problem code doesn't get a duplicate-symbol error. Don't bypass this when adding new run paths.

## Conventions worth knowing

- The server enforces a 1 MB request body cap (`maxBodyBytes`) and rejects unknown methods with 405; new endpoints should follow the existing `if (req.method === ... && url.pathname === ...)` ladder in the top-level handler.
- All filename inputs from the client are passed through one of `safeWorkspaceCppFilename` / `safeWorkspacePythonFilename` / `safeContestCodeFilename` / `safeFolderName` / `safeProblemIndex`. Never join client-supplied strings into a path without one of these.
- Contest folder lookup (`resolveSavedContestDir`) refuses any path that doesn't normalize to inside `workspace/contests/` — preserve that check.
- The Codeforces handle default is `mr_awesomeravi` and is baked into `app.js` as the fallback; it's overridden by `AppSettings.json` or the Profile settings tab.
