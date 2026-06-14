const examples = {
  python: `# Reads from input.txt and writes to output.txt through stdin/stdout.
n = int(input().strip())
values = list(map(int, input().split()))
print(sum(values[:n]))
`,
  headers: `//#include <bits/stdc++.h>
#include <vector>
#include <string>
#include <iostream>//cin, cout
#include <set>
#include <unordered_map>
#include <map>
#include <algorithm>
#include <cmath>
#include <numeric>

using namespace std;
`,
  cpp: `void func(){
    int n; cin>>n;
    vector<int> vec;
    for(int i = 0 ; i < n ; i++){
        int temp; cin>>temp;
        vec.push_back(temp);
    }
}


int main() {
    int t; cin>>t;
    while(t--){
        func();
    }
    return 0;
}
`
};

const legacyCppTemplate = `//#include <bits/stdc++.h>
#include <vector>
#include <string>
#include <iostream>//cin, cout
#include <set>
#include <unordered_map>
#include <map>
#include <algorithm>
#include <cmath>
#include <numeric>

using namespace std;
void func(){
    int n; cin>>n;
    vector<int> vec;
    for(int i = 0 ; i < n ; i++){
        int temp; cin>>temp;
        vec.push_back(temp);
    }
}


int main() {
    int t; cin>>t;
    while(t--){
        func();
    }
    return 0;
}
`;

const els = {
  app: document.querySelector(".app-shell"),
  menuBtn: document.querySelector("#menuBtn"),
  sideDrawer: document.querySelector("#sideDrawer"),
  drawerCloseBtn: document.querySelector("#drawerCloseBtn"),
  codeFileBtn: document.querySelector("#codeFileBtn"),
  templateBundleBtn: document.querySelector("#templateBundleBtn"),
  savedContestSection: document.querySelector("#savedContestSection"),
  savedContestList: document.querySelector("#savedContestList"),
  language: document.querySelector("#language"),
  code: document.querySelector("#code"),
  emptyEditorState: document.querySelector("#emptyEditorState"),
  createFirstFileBtn: document.querySelector("#createFirstFileBtn"),
  input: document.querySelector("#input"),
  output: document.querySelector("#output"),
  debug: document.querySelector("#debug"),
  debugDrawer: document.querySelector("#debugDrawer"),
  debugToggle: document.querySelector("#debugToggle"),
  debugClose: document.querySelector("#debugClose"),
  fileTabs: document.querySelector("#fileTabs"),
  contestUrl: document.querySelector("#contestUrl"),
  importContestBtn: document.querySelector("#importContestBtn"),
  cfSubmitBtn: document.querySelector("#cfSubmitBtn"),
  cfStatusBtn: document.querySelector("#cfStatusBtn"),
  fontDownBtn: document.querySelector("#fontDownBtn"),
  fontUpBtn: document.querySelector("#fontUpBtn"),
  fontSizeLabel: document.querySelector("#fontSizeLabel"),
  saveTemplateBtn: document.querySelector("#saveTemplateBtn"),
  resetCodeBtn: document.querySelector("#resetCodeBtn"),
  status: document.querySelector("#statusPill"),
  meta: document.querySelector("#meta"),
  runBtn: document.querySelector("#runBtn"),
  debugBtn: document.querySelector("#debugBtn"),
  layoutToggleBtn: document.querySelector("#layoutToggleBtn")
};

let busy = false;
let cppFileNames = [];
let cppFiles = {};
let cppInputs = {};
let cppTabLabels = {};
let cppProblems = {};
let activeCppFile = "A.cpp";
let codeFileScope = "workspace";
let activeContestDir = "";
let pythonCode = examples.python;
let pythonInput = "";
let editorView = "code";
let cppTemplate = examples.cpp;
let cppHeaders = examples.headers;
let templateDirty = false;
let recentContest = JSON.parse(localStorage.getItem("rathee.recentContest") || "null");
let savedContests = [];
const codeforcesHandle = "mr_awesomeravi";
let editorFontSize = Number(localStorage.getItem("forge.editorFontSize") || 15);
let codeEditor = null;
let settingEditorValue = false;
let codeSaveTimer = null;

boot();

function boot() {
  renderFileTabs();
  initCodeEditor();
  activeCppFile = "";
  cppFileNames = [];
  cppFiles = {};
  setEditorCode("");
  els.input.value = "";
  els.language.addEventListener("change", switchLanguage);
  els.runBtn.addEventListener("click", () => submit("run"));
  els.debugBtn.addEventListener("click", () => submit("debug"));
  els.menuBtn.addEventListener("click", toggleDrawer);
  els.drawerCloseBtn.addEventListener("click", () => showDrawer(false));
  els.codeFileBtn.addEventListener("click", openProblemCode);
  els.templateBundleBtn.addEventListener("click", () => switchEditorView("template"));
  els.createFirstFileBtn.addEventListener("click", createFirstCppFile);
  els.importContestBtn.addEventListener("click", importContest);
  els.cfSubmitBtn.addEventListener("click", submitToCodeforces);
  els.cfStatusBtn.addEventListener("click", () => refreshCodeforcesStatus(true));
  els.fontDownBtn.addEventListener("click", () => adjustEditorFontSize(-1));
  els.fontUpBtn.addEventListener("click", () => adjustEditorFontSize(1));
  els.saveTemplateBtn.addEventListener("click", saveTemplateFilesFromEditor);
  els.resetCodeBtn.addEventListener("click", handleEditorAction);
  els.contestUrl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") importContest();
  });
  els.layoutToggleBtn.addEventListener("click", toggleLayout);
  els.debugToggle.addEventListener("click", () => showDebug(true));
  els.debugClose.addEventListener("click", () => showDebug(false));
  setEditorFontSize(editorFontSize);
  codeEditor?.on("change", handleEditorChange);
  updateEditorActionButton();
  updateEditorEmptyState();
  loadSavedContestList();
  loadWorkspaceFiles();
  loadTemplateFiles().then(loadWorkspaceCppFiles);
}

async function loadWorkspaceFiles() {
  try {
    const res = await fetch("/api/files");
    const files = await res.json();
    if (files.output) els.output.value = files.output;
  } catch {
    // The editor still works if previous run files are unavailable.
  }
}

async function loadWorkspaceCppFiles() {
  try {
    const res = await fetch(`/api/workspace-cpp-files?ts=${Date.now()}`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load workspace C++ files.");

    if (data.files?.length) {
      codeFileScope = "workspace";
      activeContestDir = "";
      cppFileNames = data.files.map((file) => file.filename);
      cppFiles = Object.fromEntries(data.files.map((file) => [file.filename, file.code]));
    } else {
      codeFileScope = "workspace";
      activeContestDir = "";
      cppFileNames = [];
      cppFiles = {};
    }

    cppInputs = Object.fromEntries(cppFileNames.map((name) => [name, ""]));
    cppTabLabels = Object.fromEntries(cppFileNames.map((name) => [name, name]));
    cppProblems = Object.fromEntries(cppFileNames.map((name) => [name, null]));
    activeCppFile = cppFileNames.includes(activeCppFile) ? activeCppFile : cppFileNames[0] || "";

    if (editorView === "code" && els.language.value === "cpp") {
      renderFileTabs();
      setEditorCode(activeCppFile ? cppFiles[activeCppFile] : "");
      updateEditorEmptyState();
    }
  } catch (error) {
    els.meta.textContent = error.message || "Could not load workspace C++ files";
  }
}

async function saveWorkspaceCppFile(filename, code) {
  await fetch("/api/workspace-cpp-files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, code })
  });
}

async function saveContestCppFile(filename, code) {
  if (!activeContestDir) return;
  await fetch("/api/codeforces/contest-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contestDir: activeContestDir, filename, code })
  });
}

function scheduleWorkspaceCodeSave() {
  if (editorView !== "code" || els.language.value !== "cpp" || !activeCppFile) return;
  clearTimeout(codeSaveTimer);
  const filename = activeCppFile;
  const code = cppFiles[filename];
  codeSaveTimer = setTimeout(() => {
    const save = codeFileScope === "contest" ? saveContestCppFile : saveWorkspaceCppFile;
    save(filename, code).catch(() => {
      els.meta.textContent = `Could not save ${filename}`;
    });
  }, 350);
}

async function deleteWorkspaceCppFile(filename) {
  await fetch(`/api/workspace-cpp-files?filename=${encodeURIComponent(filename)}`, {
    method: "DELETE"
  });
}

async function loadTemplateFiles() {
  await reloadTemplateFilesFromWorkspace({ updateVisible: true, resetDirty: true });
}

async function reloadTemplateFilesFromWorkspace({ updateVisible, resetDirty }) {
  try {
    const res = await fetch(`/api/template-files?ts=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache"
      }
    });
    if (!res.ok) throw new Error("Template file load failed.");
    const files = await res.json();
    if (typeof files.template === "string") cppTemplate = files.template;
    if (typeof files.headers === "string") cppHeaders = files.headers;
    if (typeof files.template !== "string" || typeof files.headers !== "string") {
      await saveTemplateFilesNow();
    }
    if (updateVisible && editorView === "template") setEditorCode(cppTemplate);
    if (updateVisible && editorView === "headers") setEditorCode(cppHeaders);
    if (resetDirty) setTemplateDirty(false);
    return true;
  } catch (error) {
    setStatus("Load failed", "error");
    els.meta.textContent = error.message || "Could not load template files from workspace";
    return false;
  }
}

async function saveTemplateFilesNow() {
  await fetch("/api/template-files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ template: cppTemplate, headers: cppHeaders })
  });
}

async function saveTemplateFilesFromEditor() {
  saveCurrentState({ markDirty: false });
  try {
    await saveTemplateFilesNow();
    setTemplateDirty(false);
    setStatus("Saved", "success");
    els.meta.textContent = "Template.cpp and Headers.hpp saved to workspace";
  } catch {
    setStatus("Save failed", "error");
    els.meta.textContent = "Could not save template files";
  }
}

function setTemplateDirty(dirty) {
  templateDirty = dirty;
  els.saveTemplateBtn.hidden = !dirty;
}

function handleEditorChange() {
  if (settingEditorValue) return;
  if (editorView === "template" || editorView === "headers") {
    saveCurrentState({ markDirty: true });
  } else if (editorView === "code" && els.language.value === "cpp" && activeCppFile) {
    cppFiles[activeCppFile] = getEditorCode();
    scheduleWorkspaceCodeSave();
  }
}

function initCodeEditor() {
  if (!window.CodeMirror) return;
  codeEditor = window.CodeMirror.fromTextArea(els.code, {
    ...codeMirrorOptions(),
    mode: "text/x-c++src"
  });
}

function codeMirrorOptions() {
  return {
    mode: "text/x-c++src",
    theme: "material-darker",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    viewportMargin: Infinity,
    extraKeys: {
      Tab(cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.replaceSelection("    ", "end");
        }
      }
    }
  };
}

function getEditorCode() {
  return codeEditor ? codeEditor.getValue() : els.code.value;
}

function setEditorCode(value) {
  if (codeEditor) {
    settingEditorValue = true;
    codeEditor.setValue(value);
    settingEditorValue = false;
    codeEditor.refresh();
  } else {
    els.code.value = value;
  }
}

function updateEditorEmptyState() {
  const empty = editorView === "code" && els.language.value === "cpp" && !activeCppFile;
  els.emptyEditorState.hidden = !empty;
  codeEditor?.setOption("readOnly", empty ? "nocursor" : false);
}

function setEditorLanguage(language) {
  if (!codeEditor) return;
  codeEditor.setOption("mode", language === "python" ? "python" : "text/x-c++src");
  requestAnimationFrame(() => codeEditor.refresh());
}

function switchLanguage() {
  saveCurrentState();
  const language = els.language.value;
  els.fileTabs.classList.toggle("python-mode", language === "python");
  editorView = "code";
  updateDrawerActiveItem();
  setEditorLanguage(language);
  setEditorCode(language === "python" ? pythonCode : activeCppFile ? cppFiles[activeCppFile] : "");
  els.input.value = language === "python" ? pythonInput : cppInputs[activeCppFile];
  updateEditorEmptyState();
  updateEditorActionButton();
  setStatus("Idle", "idle");
}

function openProblemCode() {
  switchEditorView("code");
  loadWorkspaceCppFiles();
}

function toggleDrawer() {
  const nextVisible = els.sideDrawer.hidden;
  showDrawer(nextVisible);
  if (nextVisible) loadSavedContestList();
}

function showDrawer(visible) {
  els.sideDrawer.hidden = !visible;
}

async function loadSavedContestList() {
  try {
    const res = await fetch(`/api/codeforces/contests?ts=${Date.now()}`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load saved contests.");
    savedContests = data.contests || [];
    renderSavedContests();
  } catch (error) {
    els.meta.textContent = error.message || "Could not refresh saved contests";
  }
}

function renderSavedContests() {
  els.savedContestList.innerHTML = "";
  if (!savedContests.length) {
    els.savedContestSection.hidden = true;
    return;
  }
  els.savedContestSection.hidden = false;
  for (const contest of savedContests) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "drawer-item saved-contest-btn";
    button.textContent = formatRecentContestName(contest);
    button.title = `${contest.name}${contest.problemCount ? ` · ${contest.problemCount} problems` : ""}`;
    button.addEventListener("click", () => loadSavedContest(contest));
    els.savedContestList.append(button);
  }
}

function formatRecentContestName(contest) {
  const name = shortenContestName(contest.name || contest.url);
  return contest.contestId ? `${name} - ${contest.contestId}` : name;
}

function shortenContestName(name) {
  return String(name)
    .replace(/\bEducational\b/g, "Edu")
    .replace(/\bCodeforces\b/g, "CF")
    .replace(/\(Rated for Div\.?\s*2\)/gi, "Div2")
    .replace(/Rated for Div\.?\s*2/gi, "Div2")
    .replace(/\bDiv\.?\s*2\b/gi, "Div2")
    .replace(/\s+/g, " ")
    .trim();
}

async function loadSavedContest(contest) {
  if (!contest?.contestDir && !contest?.contestId) return;
  if (contest.contestId) {
    els.contestUrl.value = `https://codeforces.com/contest/${contest.contestId}`;
  }
  showDrawer(false);
  saveCurrentState();
  setImportBusy(true);
  setStatus("Loading", "idle");
  els.meta.textContent = "Loading saved contest from workspace...";

  try {
    const params = new URLSearchParams({
      language: els.language.value,
      contestDir: contest.contestDir || "",
      contestId: contest.contestId || ""
    });
    const res = await fetch(`/api/codeforces/contest?${params}`, { cache: "no-store" });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Could not load saved contest.");
    recentContest = {
      url: contest.contestId ? `https://codeforces.com/contest/${contest.contestId}` : "",
      name: result.name || contest.name,
      contestId: result.contestId || contest.contestId,
      contestDir: result.files?.contestDir || contest.contestDir || ""
    };
    localStorage.setItem("rathee.recentContest", JSON.stringify(recentContest));
    applyContestProblems(result, { source: "saved" });
  } catch (error) {
    els.debug.textContent = error.message;
    setStatus("Load failed", "error");
    els.meta.textContent = "Saved contest could not be loaded from workspace";
    showDebug(true);
  } finally {
    setImportBusy(false);
  }
}

function switchEditorView(view) {
  if (view !== "code" && els.language.value !== "cpp") {
    els.language.value = "cpp";
  }
  saveCurrentState();
  editorView = view;
  setEditorLanguage("cpp");
  setEditorCode(getCurrentEditorBuffer());
  updateDrawerActiveItem();
  renderFileTabs();
  updateEditorEmptyState();
  updateEditorActionButton();
  showDrawer(false);
  setStatus(view === "headers" ? "Headers.hpp" : view === "template" ? "Template.cpp" : "Code", "idle");
}

function getCurrentEditorBuffer() {
  if (editorView === "headers") return cppHeaders;
  if (editorView === "template") return cppTemplate;
  return els.language.value === "python" ? pythonCode : cppFiles[activeCppFile];
}

function updateDrawerActiveItem() {
  els.codeFileBtn.classList.toggle("active", editorView === "code");
  els.templateBundleBtn.classList.toggle("active", editorView === "template" || editorView === "headers");
}

function renderFileTabs() {
  els.fileTabs.innerHTML = "";
  if (editorView === "template" || editorView === "headers") {
    for (const view of ["template", "headers"]) {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "file-tab";
      tab.textContent = view === "template" ? "Template.cpp" : "Headers.hpp";
      tab.title = tab.textContent;
      tab.addEventListener("click", () => switchEditorView(view));
      tab.classList.toggle("active", editorView === view);
      els.fileTabs.append(tab);
    }
    return;
  }
  for (const filename of cppFileNames) {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "file-tab";
    tab.title = cppTabLabels[filename] || filename;
    tab.dataset.file = filename;
    const label = document.createElement("span");
    label.textContent = cppTabLabels[filename] || filename;
    const close = document.createElement("span");
    close.className = "tab-close";
    close.textContent = "×";
    close.title = `Close ${filename}`;
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closeCppFile(filename);
    });
    tab.append(label, close);
    tab.addEventListener("click", () => switchCppFile(filename));
    els.fileTabs.append(tab);
  }
  const addTab = document.createElement("button");
  addTab.type = "button";
  addTab.className = "file-tab add-file-tab";
  addTab.textContent = "+";
  addTab.title = "Add next C++ file";
  addTab.addEventListener("click", addNextCppFile);
  els.fileTabs.append(addTab);
  updateActiveFileTab();
}

async function closeCppFile(filename) {
  if (filename === activeCppFile) {
    clearTimeout(codeSaveTimer);
    codeSaveTimer = null;
  } else {
    saveCurrentState();
  }
  const index = cppFileNames.indexOf(filename);
  cppFileNames = cppFileNames.filter((name) => name !== filename);
  delete cppFiles[filename];
  delete cppInputs[filename];
  delete cppTabLabels[filename];
  delete cppProblems[filename];
  if (codeFileScope === "workspace") {
    await deleteWorkspaceCppFile(filename).catch(() => {
      els.meta.textContent = `Could not delete ${filename} from TemporaryCPPFiles`;
    });
  }
  if (activeCppFile === filename) {
    activeCppFile = cppFileNames[Math.max(0, index - 1)] || cppFileNames[0] || "";
    setEditorCode(activeCppFile ? cppFiles[activeCppFile] : "");
    els.input.value = activeCppFile ? cppInputs[activeCppFile] || "" : "";
  }
  renderFileTabs();
  updateEditorEmptyState();
  setStatus("Closed", "idle");
  els.meta.textContent = `${filename} closed`;
}

function addNextCppFile() {
  if (els.language.value !== "cpp") {
    els.language.value = "cpp";
    switchLanguage();
  }
  saveCurrentState();
  const filename = nextCppFilename();
  cppFileNames.push(filename);
  cppFiles[filename] = cppTemplate;
  cppInputs[filename] = "";
  cppTabLabels[filename] = filename;
  cppProblems[filename] = null;
  activeCppFile = filename;
  editorView = "code";
  renderFileTabs();
  updateDrawerActiveItem();
  updateEditorActionButton();
  setEditorLanguage("cpp");
  setEditorCode(cppFiles[activeCppFile]);
  els.input.value = "";
  updateEditorEmptyState();
  if (codeFileScope === "workspace") {
    saveWorkspaceCppFile(filename, cppFiles[filename]).catch(() => {
      els.meta.textContent = `Could not create ${filename} in TemporaryCPPFiles`;
    });
  }
  setStatus("Created", "success");
  els.meta.textContent = `${filename} added`;
}

function createFirstCppFile() {
  if (cppFileNames.length === 0) {
    addNextCppFile();
  }
}

function nextCppFilename() {
  const used = new Set(cppFileNames);
  let index = 1;
  while (true) {
    const filename = `${numberToLetters(index)}.cpp`;
    if (!used.has(filename)) return filename;
    index += 1;
  }
}

function numberToLetters(index) {
  let value = index;
  let label = "";
  while (value > 0) {
    value -= 1;
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26);
  }
  return label;
}

function switchCppFile(filename) {
  if (els.language.value !== "cpp" || filename === activeCppFile) return;
  saveCurrentState();
  editorView = "code";
  activeCppFile = filename;
  setEditorCode(cppFiles[activeCppFile]);
  els.input.value = cppInputs[activeCppFile] || "";
  updateEditorEmptyState();
  updateDrawerActiveItem();
  updateActiveFileTab();
  updateEditorActionButton();
  setStatus("Idle", "idle");
  refreshCodeforcesStatus(false);
}

function updateActiveFileTab() {
  els.fileTabs.querySelectorAll(".file-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.file === activeCppFile);
  });
}

function saveCurrentState(options = {}) {
  const { markDirty = false } = options;
  const value = getEditorCode();
  if (editorView === "headers") {
    cppHeaders = value;
    if (markDirty) setTemplateDirty(true);
    return;
  }
  if (editorView === "template") {
    cppTemplate = value;
    if (markDirty) setTemplateDirty(true);
    return;
  }
  if (els.language.value === "python") {
    pythonCode = value;
    pythonInput = els.input.value;
  } else {
    if (!activeCppFile) return;
    cppFiles[activeCppFile] = value;
    cppInputs[activeCppFile] = els.input.value;
    scheduleWorkspaceCodeSave();
  }
}

async function importContest() {
  const contestUrl = els.contestUrl.value.trim();
  if (!contestUrl) {
    setStatus("Paste URL", "error");
    els.meta.textContent = "Paste a Codeforces contest URL first";
    return;
  }

  saveCurrentState();
  setImportBusy(true);
  setStatus("Importing", "idle");
  els.meta.textContent = "Fetching Codeforces problems...";

  try {
    const res = await fetch("/api/codeforces/problems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: contestUrl,
        language: els.language.value,
        cppTemplate,
        pythonTemplate: pythonCode
      })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Could not import contest.");
    applyContestProblems(result);
    recentContest = {
      url: contestUrl,
      name: result.name || contestUrl,
      contestId: result.contestId,
      contestDir: result.files?.contestDir || ""
    };
    localStorage.setItem("rathee.recentContest", JSON.stringify(recentContest));
    await loadSavedContestList();
  } catch (error) {
    els.debug.textContent = error.message;
    setStatus("Import failed", "error");
    els.meta.textContent = "Codeforces import failed";
    showDebug(true);
  } finally {
    setImportBusy(false);
  }
}

function applyContestProblems(contest, options = {}) {
  const { source = "import" } = options;
  const problems = contest.problems || [];
  codeFileScope = "contest";
  activeContestDir = contest.files?.contestDir || recentContest?.contestDir || "";
  cppFileNames = problems.map((problem) => `${problem.index}.cpp`);
  cppFiles = Object.fromEntries(problems.map((problem) => [
    `${problem.index}.cpp`,
    problem.code ?? cppTemplate
  ]));
  cppInputs = Object.fromEntries(problems.map((problem) => [
    `${problem.index}.cpp`,
    problem.samples?.[0]?.input || ""
  ]));
  cppTabLabels = Object.fromEntries(problems.map((problem) => [
    `${problem.index}.cpp`,
    `${problem.index}.cpp - ${problem.name}`
  ]));
  cppProblems = Object.fromEntries(problems.map((problem) => [
    `${problem.index}.cpp`,
    problem
  ]));
  activeCppFile = cppFileNames[0] || "A.cpp";
  editorView = "code";

  if (els.language.value !== "cpp") {
    els.language.value = "cpp";
  }
  renderFileTabs();
  updateDrawerActiveItem();
  els.fileTabs.classList.remove("python-mode");
  setEditorLanguage("cpp");
  setEditorCode(cppFiles[activeCppFile] || examples.cpp);
  els.input.value = cppInputs[activeCppFile] || "";
  updateEditorEmptyState();
  els.output.value = "";
  const sampleCount = problems.filter((problem) => problem.samples?.length).length;
  els.debug.textContent = [
    contest.name,
    `${problems.length} problems ${source === "saved" ? "loaded from workspace" : "imported"}.`,
    `${sampleCount} sample inputs loaded.`,
    source !== "saved" && sampleCount < problems.length
      ? "Some sample inputs could not be fetched because Codeforces problem pages are protected from server-side scraping."
      : ""
  ].filter(Boolean).join("\n");
  showDebug(source !== "saved" && sampleCount < problems.length);
  setStatus(source === "saved" ? "Loaded" : "Imported", "success");
  els.meta.textContent = `${problems.length} problems ${source === "saved" ? "loaded" : "imported"} · ${sampleCount} sample inputs loaded`;
  refreshCodeforcesStatus(false);
}

function setLayout(layout) {
  els.app.dataset.layout = layout;
  els.layoutToggleBtn.textContent = layout === "vertical" ? "Split ↔" : "Split ↕";
  els.layoutToggleBtn.title = layout === "vertical" ? "Switch to horizontal split" : "Switch to vertical split";
  requestAnimationFrame(() => codeEditor?.refresh());
}

async function resetActiveCode() {
  if (els.language.value !== "cpp" || editorView !== "code" || !activeCppFile) {
    setStatus("Code only", "error");
    els.meta.textContent = activeCppFile ? "Reset Code works on C++ problem tabs" : "Create a C++ file first";
    return;
  }
  const loaded = await reloadTemplateFilesFromWorkspace({ updateVisible: false, resetDirty: true });
  if (!loaded) return;
  cppFiles[activeCppFile] = cppTemplate;
  setEditorCode(cppTemplate);
  const save = codeFileScope === "contest" ? saveContestCppFile : saveWorkspaceCppFile;
  await save(activeCppFile, cppTemplate).catch(() => {
    els.meta.textContent = `Could not save ${activeCppFile} after reset`;
  });
  setStatus("Reset", "success");
  els.meta.textContent = `${activeCppFile} reset to Template.cpp`;
}

async function reloadOpenWorkspaceFile() {
  const loaded = await reloadTemplateFilesFromWorkspace({ updateVisible: true, resetDirty: true });
  if (!loaded) return;
  setStatus("Reloaded", "success");
  els.meta.textContent = `${editorView === "template" ? "Template.cpp" : "Headers.hpp"} reloaded from workspace`;
}

function handleEditorAction() {
  if (editorView === "template" || editorView === "headers") {
    reloadOpenWorkspaceFile();
  } else {
    resetActiveCode();
  }
}

function updateEditorActionButton() {
  if (editorView === "template" || editorView === "headers") {
    const filename = editorView === "template" ? "Template.cpp" : "Headers.hpp";
    els.resetCodeBtn.textContent = "Reload File";
    els.resetCodeBtn.title = `Reload ${filename} from workspace`;
  } else {
    els.resetCodeBtn.textContent = "Load from Template";
    els.resetCodeBtn.title = "Load active problem code from Template.cpp";
  }
}

function toggleLayout() {
  setLayout(els.app.dataset.layout === "vertical" ? "horizontal" : "vertical");
}

function adjustEditorFontSize(delta) {
  setEditorFontSize(editorFontSize + delta);
}

function setEditorFontSize(size) {
  editorFontSize = Math.min(24, Math.max(11, size));
  document.documentElement.style.setProperty("--editor-font-size", `${editorFontSize}px`);
  els.fontSizeLabel.textContent = `${editorFontSize}px`;
  localStorage.setItem("forge.editorFontSize", String(editorFontSize));
  requestAnimationFrame(() => codeEditor?.refresh());
}

async function submitToCodeforces() {
  saveCurrentState();
  if (!activeCppFile) {
    setStatus("No file", "error");
    els.meta.textContent = "Create a C++ file before submitting";
    return;
  }
  const problem = cppProblems[activeCppFile];
  if (els.language.value !== "cpp" || !problem?.contestId || !problem?.index) {
    setStatus("No CF tab", "error");
    els.meta.textContent = "Import a Codeforces contest and select a problem tab first";
    return;
  }

  await copyActiveCode();
  const submitUrl = `https://codeforces.com/contest/${problem.contestId}/submit/${encodeURIComponent(problem.index)}`;
  window.open(submitUrl, "_blank", "noopener,noreferrer");
  els.debug.textContent = [
    `Opened ${submitUrl}`,
    "Combined Headers.hpp + active code file was copied to clipboard.",
    "Paste it into Codeforces and submit using your logged-in browser session.",
    "Click Status here after submitting, or reload/import again to fetch the latest verdict."
  ].join("\n");
  showDebug(true);
  setStatus("Submit opened", "idle");
  els.meta.textContent = `Code copied · submit ${problem.index} on Codeforces`;
}

async function copyActiveCode() {
  try {
    await navigator.clipboard.writeText(getSubmitCode());
  } catch {
    els.debug.textContent = `${els.debug.textContent}\nClipboard permission was blocked. Select and copy the editor code manually.`;
  }
}

function getSubmitCode() {
  if (els.language.value !== "cpp") return getEditorCode();
  if (!activeCppFile) return "";
  return combineCppSource(cppFiles[activeCppFile] || "");
}

function getRunCode() {
  if (els.language.value !== "cpp") return getEditorCode();
  saveCurrentState();
  if (editorView === "template" || editorView === "headers") return combineCppSource(cppTemplate);
  if (!activeCppFile) return "";
  return combineCppSource(cppFiles[activeCppFile] || "");
}

function combineCppSource(source) {
  return `${cppHeaders.trimEnd()}\n\n${stripDuplicateHeaders(source).trimStart()}`;
}

function stripDuplicateHeaders(source) {
  const lines = source.split("\n");
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (
      line === "" ||
      line.startsWith("#include") ||
      line.startsWith("//#include") ||
      line === "using namespace std;"
    ) {
      index += 1;
      continue;
    }
    break;
  }
  return lines.slice(index).join("\n");
}

async function refreshCodeforcesStatus(showWhenEmpty) {
  const problem = cppProblems[activeCppFile];
  if (!problem?.contestId || !problem?.index) {
    if (showWhenEmpty) {
      setStatus("No CF tab", "error");
      els.meta.textContent = "Import a Codeforces contest first";
    }
    return;
  }

  try {
    const params = new URLSearchParams({
      handle: codeforcesHandle,
      contestId: problem.contestId,
      index: problem.index
    });
    const res = await fetch(`/api/codeforces/status?${params}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Could not fetch Codeforces status.");

    if (!result.latest) {
      if (showWhenEmpty) {
        els.debug.textContent = `No submissions found for ${codeforcesHandle} on ${problem.index}.`;
        showDebug(true);
      }
      els.meta.textContent = `No Codeforces submissions yet for ${problem.index}`;
      return;
    }

    const latest = result.latest;
    const verdict = latest.verdict || "TESTING";
    els.debug.textContent = [
      `${codeforcesHandle} · ${problem.index}. ${problem.name}`,
      `Verdict: ${verdict}`,
      `Language: ${latest.programmingLanguage}`,
      `Passed tests: ${latest.passedTestCount}`,
      `Time: ${latest.timeConsumedMillis} ms`,
      `Memory: ${Math.round(latest.memoryConsumedBytes / 1024)} KB`,
      `Submission: https://codeforces.com/contest/${latest.contestId}/submission/${latest.id}`
    ].join("\n");
    showDebug(true);
    setStatus(verdict, verdict === "OK" ? "success" : "error");
    els.meta.textContent = `${problem.index} latest verdict: ${verdict}`;
  } catch (error) {
    if (showWhenEmpty) {
      els.debug.textContent = error.message;
      showDebug(true);
    }
    els.meta.textContent = "Could not fetch Codeforces status";
  }
}

async function submit(mode) {
  if (busy) return;
  saveCurrentState();
  if (els.language.value === "cpp" && editorView === "code" && !activeCppFile) {
    setStatus("No file", "error");
    els.meta.textContent = "Create a C++ file with + before running";
    return;
  }
  busy = true;
  setButtons(false);
  setStatus(mode === "debug" ? "Debugging" : "Running", "idle");
  els.meta.textContent = "Executing...";

  try {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: els.language.value,
        code: getRunCode(),
        input: els.input.value,
        mode
      })
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Execution failed.");

    els.output.value = result.output || "";
    els.debug.textContent = result.debug || result.stderr || "No debug output.";
    const ok = result.status === "success";
    setStatus(labelForStatus(result.status), ok ? "success" : "error");
    els.meta.textContent = `${labelForStatus(result.status)} · ${result.elapsedMs}ms`;
    showDebug(mode === "debug" || !ok);
  } catch (error) {
    els.debug.textContent = error.message;
    setStatus("Error", "error");
    els.meta.textContent = "Execution failed";
    showDebug(true);
  } finally {
    busy = false;
    setButtons(true);
  }
}

function setButtons(enabled) {
  els.runBtn.disabled = !enabled;
  els.debugBtn.disabled = !enabled;
  els.cfSubmitBtn.disabled = !enabled;
  els.cfStatusBtn.disabled = !enabled;
}

function setImportBusy(importing) {
  els.importContestBtn.disabled = importing;
  els.contestUrl.disabled = importing;
}

function setStatus(text, tone) {
  els.status.textContent = text;
  els.status.className = `status ${tone}`;
}

function showDebug(visible) {
  els.debugDrawer.hidden = !visible;
}

function labelForStatus(status) {
  return {
    success: "Success",
    compile_error: "Compile error",
    runtime_error: "Runtime error",
    timeout: "Timeout"
  }[status] || "Finished";
}
