const els = {
  app: document.querySelector(".app-shell"),
  menuBtn: document.querySelector("#menuBtn"),
  sideDrawer: document.querySelector("#sideDrawer"),
  drawerCloseBtn: document.querySelector("#drawerCloseBtn"),
  codeFileBtn: document.querySelector("#codeFileBtn"),
  savedContestSection: document.querySelector("#savedContestSection"),
  savedContestList: document.querySelector("#savedContestList"),
  language: document.querySelector("#language"),
  code: document.querySelector("#code"),
  emptyEditorState: document.querySelector("#emptyEditorState"),
  createFirstFileBtn: document.querySelector("#createFirstFileBtn"),
  input: document.querySelector("#input"),
  output: document.querySelector("#output"),
  sidePane: document.querySelector("#sidePane"),
  debug: document.querySelector("#debug"),
  debugToggle: document.querySelector("#debugToggle"),
  outputTabBtn: document.querySelector("#outputTabBtn"),
  hideInputBtn: document.querySelector("#hideInputBtn"),
  hideOutputBtn: document.querySelector("#hideOutputBtn"),
  fileTabs: document.querySelector("#fileTabs"),
  contestListLink: document.querySelector("#contestListLink"),
  contestUrl: document.querySelector("#contestUrl"),
  importContestBtn: document.querySelector("#importContestBtn"),
  cfSubmitBtn: document.querySelector("#cfSubmitBtn"),
  cfStatusBtn: document.querySelector("#cfStatusBtn"),
  settingsBtn: document.querySelector("#settingsBtn"),
  settingsOverlay: document.querySelector("#settingsOverlay"),
  settingsCloseBtn: document.querySelector("#settingsCloseBtn"),
  settingsTabs: Array.from(document.querySelectorAll(".settings-tab")),
  editorSettings: document.querySelector("#editorSettings"),
  profileSettings: document.querySelector("#profileSettings"),
  templateSettings: document.querySelector("#templateSettings"),
  openTemplateFileBtn: document.querySelector("#openTemplateFileBtn"),
  openHeadersFileBtn: document.querySelector("#openHeadersFileBtn"),
  openPythonTemplateFileBtn: document.querySelector("#openPythonTemplateFileBtn"),
  codeforcesHandleInput: document.querySelector("#codeforcesHandleInput"),
  editorFontSizeInput: document.querySelector("#editorFontSizeInput"),
  editorFontSelect: document.querySelector("#editorFontSelect"),
  fontSizeLabel: document.querySelector("#fontSizeLabel"),
  saveTemplateBtn: document.querySelector("#saveTemplateBtn"),
  resetCodeBtn: document.querySelector("#resetCodeBtn"),
  editorQuickSettingsBtn: document.querySelector("#editorQuickSettingsBtn"),
  editorQuickSettings: document.querySelector("#editorQuickSettings"),
  quickFontDownBtn: document.querySelector("#quickFontDownBtn"),
  quickFontUpBtn: document.querySelector("#quickFontUpBtn"),
  quickFontSizeLabel: document.querySelector("#quickFontSizeLabel"),
  quickEditorFontSelect: document.querySelector("#quickEditorFontSelect"),
  quickCodeLeftBtn: document.querySelector("#quickCodeLeftBtn"),
  quickCodeRightBtn: document.querySelector("#quickCodeRightBtn"),
  quickLanguage: document.querySelector("#quickLanguage"),
  status: document.querySelector("#statusPill"),
  meta: document.querySelector("#meta"),
  runBtn: document.querySelector("#runBtn"),
  debugBtn: document.querySelector("#debugBtn"),
  codeLeftBtn: document.querySelector("#codeLeftBtn"),
  codeRightBtn: document.querySelector("#codeRightBtn"),
  drawerResizeHandle: document.querySelector("#drawerResizeHandle"),
  mainResizeHandle: document.querySelector("#mainResizeHandle"),
  ioResizeHandle: document.querySelector("#ioResizeHandle"),
  revealIoBtn: document.querySelector("#revealIoBtn"),
  inputSection: document.querySelector(".input-section"),
  outputSection: document.querySelector(".output-section"),
  ioPane: document.querySelector(".io-pane"),
  workspace: document.querySelector(".workspace")
};

let busy = false;
let cppFileNames = [];
let cppFiles = {};
let cppInputs = {};
let cppTabLabels = {};
let cppProblems = {};
let activeCppFile = "A.cpp";
let pyFileNames = [];
let pyFiles = {};
let pyInputs = {};
let pyTabLabels = {};
let pyProblems = {};
let activePyFile = "A.py";
let codeFileScope = "workspace";
let activeContestDir = "";
let pythonCode = "";
let editorView = "code";
let cppTemplate = "";
let cppHeaders = "";
let templateDirty = false;
let recentContest = JSON.parse(localStorage.getItem("rathee.recentContest") || "null");
let savedContests = [];
let expandedContestKeys = new Set();
let codeforcesHandle = localStorage.getItem("rathee.codeforcesHandle") || "mr_awesomeravi";
let editorFontSize = Number(localStorage.getItem("forge.editorFontSize") || 15);
let editorFontFamily = localStorage.getItem("rathee.editorFontFamily")
  || "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace";
let codeEditor = null;
let settingEditorValue = false;
let codeSaveTimer = null;
let currentLanguage = document.querySelector("#language").value;
let editorQuickSettingsOpen = false;
let settingsSaveTimer = null;
let layoutState = {
  showDrawer: true,
  drawerWidth: Number(localStorage.getItem("rathee.drawerWidth") || 280),
  codeSide: localStorage.getItem("rathee.codeSide") || "left",
  showInput: localStorage.getItem("rathee.showInput") !== "false",
  showOutput: localStorage.getItem("rathee.showOutput") !== "false",
  sideWidth: Number(localStorage.getItem("rathee.sideWidth") || 38),
  inputHeight: Number(localStorage.getItem("rathee.inputHeight") || 45)
};

loadAppSettings().finally(boot);

async function loadAppSettings() {
  try {
    const res = await fetch(`/api/settings?ts=${Date.now()}`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load settings.");
    applyAppSettings(data.settings || {});
  } catch {
    // localStorage defaults above keep older installs working if the settings file is unavailable.
  }
}

function applyAppSettings(settings) {
  if (settings.recentContest !== undefined) recentContest = settings.recentContest || null;
  if (typeof settings.codeforcesHandle === "string") codeforcesHandle = settings.codeforcesHandle;
  if (Number.isFinite(Number(settings.editorFontSize))) editorFontSize = Number(settings.editorFontSize);
  if (typeof settings.editorFontFamily === "string") editorFontFamily = settings.editorFontFamily;
  if (typeof settings.language === "string" && ["cpp", "python"].includes(settings.language)) {
    els.language.value = settings.language;
    currentLanguage = settings.language;
  }

  const layout = settings.layout || {};
  if (Number.isFinite(Number(layout.drawerWidth))) layoutState.drawerWidth = Number(layout.drawerWidth);
  if (["left", "right"].includes(layout.codeSide)) layoutState.codeSide = layout.codeSide;
  if (typeof layout.showInput === "boolean") layoutState.showInput = layout.showInput;
  if (typeof layout.showOutput === "boolean") layoutState.showOutput = layout.showOutput;
  if (Number.isFinite(Number(layout.sideWidth))) layoutState.sideWidth = Number(layout.sideWidth);
  if (Number.isFinite(Number(layout.inputHeight))) layoutState.inputHeight = Number(layout.inputHeight);
}

function currentAppSettings() {
  return {
    recentContest,
    codeforcesHandle,
    editorFontSize,
    editorFontFamily,
    language: els.language.value,
    layout: {
      drawerWidth: layoutState.drawerWidth,
      codeSide: layoutState.codeSide,
      showInput: layoutState.showInput,
      showOutput: layoutState.showOutput,
      sideWidth: layoutState.sideWidth,
      inputHeight: layoutState.inputHeight
    }
  };
}

function scheduleAppSettingsSave() {
  clearTimeout(settingsSaveTimer);
  settingsSaveTimer = setTimeout(() => {
    fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: currentAppSettings() })
    }).catch(() => {
      // Settings still remain active in memory if the file write fails.
    });
  }, 250);
}

function boot() {
  renderFileTabs();
  initCodeEditor();
  activeCppFile = "";
  cppFileNames = [];
  cppFiles = {};
  activePyFile = "";
  pyFileNames = [];
  pyFiles = {};
  setEditorCode("");
  els.input.value = "";
  els.language.addEventListener("change", switchLanguage);
  els.runBtn.addEventListener("click", () => submit("run"));
  els.debugBtn?.addEventListener("click", () => submit("debug"));
  els.menuBtn.addEventListener("click", toggleDrawer);
  els.drawerCloseBtn.addEventListener("click", () => showDrawer(false));
  els.codeFileBtn.addEventListener("click", openProblemCode);
  els.openTemplateFileBtn.addEventListener("click", () => openTemplateSettingsFile("template"));
  els.openHeadersFileBtn.addEventListener("click", () => openTemplateSettingsFile("headers"));
  els.openPythonTemplateFileBtn.addEventListener("click", () => openTemplateSettingsFile("python-template"));
  els.createFirstFileBtn.addEventListener("click", createFirstCppFile);
  els.importContestBtn.addEventListener("click", importContest);
  els.cfSubmitBtn.addEventListener("click", submitToCodeforces);
  els.cfStatusBtn.addEventListener("click", () => refreshCodeforcesStatus(true));
  els.settingsBtn.addEventListener("click", () => showSettings(true));
  els.settingsCloseBtn.addEventListener("click", () => showSettings(false));
  els.settingsOverlay.addEventListener("click", (event) => {
    if (event.target === els.settingsOverlay) showSettings(false);
  });
  els.settingsTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchSettingsTab(tab.dataset.settingsTab));
  });
  els.editorFontSizeInput.addEventListener("input", () => setEditorFontSize(Number(els.editorFontSizeInput.value)));
  els.editorFontSelect.addEventListener("change", () => setEditorFontFamily(els.editorFontSelect.value));
  els.codeforcesHandleInput.addEventListener("input", () => setCodeforcesHandle(els.codeforcesHandleInput.value));
  els.saveTemplateBtn.addEventListener("click", saveTemplateFilesFromEditor);
  els.resetCodeBtn.addEventListener("click", handleEditorAction);
  els.editorQuickSettingsBtn.addEventListener("click", toggleEditorQuickSettings);
  els.quickFontDownBtn.addEventListener("click", () => setEditorFontSize(editorFontSize - 1));
  els.quickFontUpBtn.addEventListener("click", () => setEditorFontSize(editorFontSize + 1));
  els.quickEditorFontSelect.addEventListener("change", () => setEditorFontFamily(els.quickEditorFontSelect.value));
  els.quickCodeLeftBtn.addEventListener("click", () => setCodeEditorPlacement("left"));
  els.quickCodeRightBtn.addEventListener("click", () => setCodeEditorPlacement("right"));
  els.quickLanguage.addEventListener("change", () => {
    els.language.value = els.quickLanguage.value;
    switchLanguage();
  });
  els.contestListLink.addEventListener("click", (event) => event.stopPropagation());
  els.contestUrl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") importContest();
  });
  els.codeLeftBtn.addEventListener("click", () => setCodeEditorPlacement("left"));
  els.codeRightBtn.addEventListener("click", () => setCodeEditorPlacement("right"));
  els.hideInputBtn.addEventListener("click", () => togglePanel("input"));
  els.hideOutputBtn.addEventListener("click", () => togglePanel("output"));
  els.revealIoBtn.addEventListener("click", revealInputOutput);
  els.outputTabBtn.addEventListener("click", () => setOutputView("output"));
  els.debugToggle.addEventListener("click", () => setOutputView("debug"));
  initResizablePanes();
  applyWorkspaceLayout();
  setEditorFontSize(editorFontSize);
  setEditorFontFamily(editorFontFamily);
  els.quickLanguage.value = els.language.value;
  setCodeforcesHandle(codeforcesHandle);
  codeEditor?.on("change", handleEditorChange);
  updateEditorActionButton();
  updateEditorEmptyState();
  loadSavedContestList();
  loadWorkspaceFiles();
  loadTemplateFiles().then(() => Promise.all([loadWorkspaceCppFiles(), loadWorkspacePythonFiles()]));
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

async function loadWorkspacePythonFiles() {
  try {
    const res = await fetch(`/api/workspace-python-files?ts=${Date.now()}`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load workspace Python files.");

    if (data.files?.length) {
      if (els.language.value === "python") {
        codeFileScope = "workspace";
        activeContestDir = "";
      }
      pyFileNames = data.files.map((file) => file.filename);
      pyFiles = Object.fromEntries(data.files.map((file) => [file.filename, file.code]));
    } else {
      pyFileNames = [];
      pyFiles = {};
    }

    pyInputs = Object.fromEntries(pyFileNames.map((name) => [name, ""]));
    pyTabLabels = Object.fromEntries(pyFileNames.map((name) => [name, name]));
    pyProblems = Object.fromEntries(pyFileNames.map((name) => [name, null]));
    activePyFile = pyFileNames.includes(activePyFile) ? activePyFile : pyFileNames[0] || "";

    if (editorView === "code" && els.language.value === "python") {
      renderFileTabs();
      setEditorCode(activePyFile ? pyFiles[activePyFile] : "");
      updateEditorEmptyState();
    }
  } catch (error) {
    els.meta.textContent = error.message || "Could not load workspace Python files";
  }
}

async function saveWorkspaceCppFile(filename, code) {
  await fetch("/api/workspace-cpp-files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, code })
  });
}

async function saveWorkspacePythonFile(filename, code) {
  await fetch("/api/workspace-python-files", {
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

async function saveContestPythonFile(filename, code) {
  if (!activeContestDir) return;
  await fetch("/api/codeforces/contest-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contestDir: activeContestDir, filename, code })
  });
}

function scheduleWorkspaceCodeSave() {
  if (editorView !== "code") return;
  const isPython = els.language.value === "python";
  const filename = isPython ? activePyFile : activeCppFile;
  if (!filename) return;
  clearTimeout(codeSaveTimer);
  const code = isPython ? pyFiles[filename] : cppFiles[filename];
  codeSaveTimer = setTimeout(() => {
    const save = isPython
      ? codeFileScope === "contest" ? saveContestPythonFile : saveWorkspacePythonFile
      : codeFileScope === "contest" ? saveContestCppFile : saveWorkspaceCppFile;
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

async function deleteWorkspacePythonFile(filename) {
  await fetch(`/api/workspace-python-files?filename=${encodeURIComponent(filename)}`, {
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
    if (typeof files.python === "string") pythonCode = files.python;
    if (updateVisible && editorView === "template") setEditorCode(cppTemplate);
    if (updateVisible && editorView === "headers") setEditorCode(cppHeaders);
    if (updateVisible && editorView === "python-template") setEditorCode(pythonCode);
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
    body: JSON.stringify({ template: cppTemplate, headers: cppHeaders, python: pythonCode })
  });
}

async function saveTemplateFilesFromEditor() {
  saveCurrentState({ markDirty: false });
  try {
    await saveTemplateFilesNow();
    setTemplateDirty(false);
    setStatus("Saved", "success");
    els.meta.textContent = "Template files saved to workspace";
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
  if (isTemplateEditorView()) {
    saveCurrentState({ markDirty: true });
  } else if (editorView === "code") {
    if (els.language.value === "python" && activePyFile) {
      pyFiles[activePyFile] = getEditorCode();
      scheduleWorkspaceCodeSave();
    } else if (els.language.value === "cpp" && activeCppFile) {
      cppFiles[activeCppFile] = getEditorCode();
      scheduleWorkspaceCodeSave();
    }
  }
}

function initCodeEditor() {
  if (!window.CodeMirror) return;
  codeEditor = window.CodeMirror.fromTextArea(els.code, {
    ...codeMirrorOptions(),
    mode: "text/x-c++src"
  });
  codeEditor.setSize("100%", "100%");
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
  const language = els.language.value;
  const empty = editorView === "code" && !currentActiveFile();
  els.emptyEditorState.hidden = !empty;
  els.createFirstFileBtn.textContent = `Create ${language === "python" ? "A.py" : "A.cpp"}`;
  codeEditor?.setOption("readOnly", empty ? "nocursor" : false);
}

function setEditorLanguage(language) {
  if (!codeEditor) return;
  codeEditor.setOption("mode", language === "python" ? "python" : "text/x-c++src");
  requestAnimationFrame(() => codeEditor.refresh());
}

function applyWorkspaceLayout() {
  layoutState.drawerWidth = clamp(layoutState.drawerWidth, 220, 420);
  layoutState.sideWidth = clamp(layoutState.sideWidth, 12, 72);
  layoutState.inputHeight = clamp(layoutState.inputHeight, 18, 78);

  els.app.dataset.codeSide = layoutState.codeSide;
  els.app.style.setProperty("--drawer-width", `${layoutState.drawerWidth}px`);
  els.app.style.setProperty("--side-width", `${layoutState.sideWidth}%`);
  els.app.style.setProperty("--input-height", `${layoutState.inputHeight}%`);
  els.workspace.classList.toggle("drawer-open", layoutState.showDrawer);
  els.sideDrawer.hidden = false;
  els.drawerResizeHandle.hidden = !layoutState.showDrawer;
  els.menuBtn.title = layoutState.showDrawer ? "Close files" : "Open files";
  els.menuBtn.setAttribute("aria-label", layoutState.showDrawer ? "Close files" : "Open files");
  const bothHidden = !layoutState.showInput && !layoutState.showOutput;
  els.workspace.classList.toggle("side-hidden", bothHidden);
  els.sidePane.hidden = bothHidden;
  els.mainResizeHandle.hidden = bothHidden;
  els.revealIoBtn.hidden = !bothHidden;
  els.revealIoBtn.textContent = layoutState.codeSide === "right" ? "I/O ▶" : "◀ I/O";
  els.inputSection.classList.toggle("collapsed", !layoutState.showInput);
  els.outputSection.classList.toggle("collapsed", !layoutState.showOutput);
  els.ioResizeHandle.hidden = !(layoutState.showInput && layoutState.showOutput);
  els.ioPane.style.gridTemplateRows = buildIoRows();

  els.codeLeftBtn.classList.toggle("active", layoutState.codeSide === "left");
  els.codeRightBtn.classList.toggle("active", layoutState.codeSide === "right");
  els.quickCodeLeftBtn.classList.toggle("active", layoutState.codeSide === "left");
  els.quickCodeRightBtn.classList.toggle("active", layoutState.codeSide === "right");
  updatePaneToggleButton(els.hideInputBtn, layoutState.showInput, "input");
  updatePaneToggleButton(els.hideOutputBtn, layoutState.showOutput, "output");
  localStorage.setItem("rathee.codeSide", layoutState.codeSide);
  localStorage.setItem("rathee.drawerWidth", String(layoutState.drawerWidth));
  localStorage.setItem("rathee.showInput", String(layoutState.showInput));
  localStorage.setItem("rathee.showOutput", String(layoutState.showOutput));
  localStorage.setItem("rathee.sideWidth", String(layoutState.sideWidth));
  localStorage.setItem("rathee.inputHeight", String(layoutState.inputHeight));
  scheduleAppSettingsSave();

  requestAnimationFrame(() => codeEditor?.refresh());
}

function updatePaneToggleButton(button, visible, panelName) {
  const label = `${visible ? "Hide" : "Show"} ${panelName} panel`;
  button.textContent = ">";
  button.classList.toggle("is-collapsed", !visible);
  button.title = label;
  button.setAttribute("aria-label", label);
}

function buildIoRows() {
  if (layoutState.showInput && layoutState.showOutput) {
    return `minmax(120px, ${layoutState.inputHeight}%) 8px minmax(120px, 1fr)`;
  }
  if (layoutState.showInput) return "minmax(0, 1fr) 0 42px";
  if (layoutState.showOutput) return "42px 0 minmax(0, 1fr)";
  return "42px 0 42px";
}

function togglePanel(panel) {
  if (panel === "input") layoutState.showInput = !layoutState.showInput;
  if (panel === "output") layoutState.showOutput = !layoutState.showOutput;
  applyWorkspaceLayout();
}

function revealInputOutput() {
  layoutState.showInput = true;
  layoutState.showOutput = true;
  applyWorkspaceLayout();
}

function setOutputView(view) {
  const showDebugPanel = view === "debug";
  els.output.hidden = showDebugPanel;
  els.debug.hidden = !showDebugPanel;
  els.outputTabBtn.classList.toggle("active", !showDebugPanel);
  els.debugToggle.classList.toggle("active", showDebugPanel);
  if (!layoutState.showOutput) {
    layoutState.showOutput = true;
    applyWorkspaceLayout();
  }
}

function showSettings(visible) {
  els.settingsOverlay.hidden = !visible;
  els.app.classList.toggle("settings-open", visible);
}

function openTemplateSettingsFile(view) {
  showSettings(false);
  switchEditorView(view);
}

function switchSettingsTab(tabName) {
  const target = ["profile", "editor", "templates"].includes(tabName) ? tabName : "profile";
  els.settingsTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.settingsTab === target);
  });
  els.editorSettings.hidden = target !== "editor";
  els.profileSettings.hidden = target !== "profile";
  els.templateSettings.hidden = target !== "templates";
}

function setCodeEditorPlacement(side) {
  layoutState.codeSide = side === "right" ? "right" : "left";
  applyWorkspaceLayout();
}

function toggleEditorQuickSettings() {
  editorQuickSettingsOpen = !editorQuickSettingsOpen;
  els.editorQuickSettings.hidden = !editorQuickSettingsOpen;
  els.editorQuickSettingsBtn.setAttribute("aria-expanded", String(editorQuickSettingsOpen));
  requestAnimationFrame(() => {
    codeEditor?.setSize("100%", "100%");
    codeEditor?.refresh();
  });
}

function initResizablePanes() {
  els.mainResizeHandle.addEventListener("pointerdown", (event) => startResize(event, "main"));
  els.drawerResizeHandle.addEventListener("pointerdown", (event) => startResize(event, "drawer"));
  els.ioResizeHandle.addEventListener("pointerdown", (event) => startResize(event, "io"));
}

function startResize(event, target) {
  event.preventDefault();
  const startX = event.clientX;
  const startY = event.clientY;
  const startDrawerWidth = layoutState.drawerWidth;
  const startSideWidth = layoutState.sideWidth;
  const startInputHeight = layoutState.inputHeight;
  const workspaceRect = els.workspace.getBoundingClientRect();
  const ioRect = els.ioPane.getBoundingClientRect();
  document.body.classList.add("resizing");

  const onMove = (moveEvent) => {
    if (target === "main") {
      const delta = layoutState.codeSide === "left"
        ? startX - moveEvent.clientX
        : moveEvent.clientX - startX;
      layoutState.sideWidth = clamp(startSideWidth + (delta / workspaceRect.width) * 100, 12, 72);
    }
    if (target === "drawer") {
      layoutState.drawerWidth = clamp(startDrawerWidth + (moveEvent.clientX - startX), 220, 420);
    }
    if (target === "io") {
      layoutState.inputHeight = clamp(startInputHeight + ((moveEvent.clientY - startY) / ioRect.height) * 100, 18, 78);
    }
    applyWorkspaceLayout();
  };

  const onUp = () => {
    document.body.classList.remove("resizing");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp, { once: true });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function switchLanguage() {
  const nextLanguage = els.language.value;
  const previousLanguage = currentLanguage;
  if (nextLanguage !== previousLanguage) {
    els.language.value = previousLanguage;
    saveCurrentState();
    els.language.value = nextLanguage;
  } else {
    saveCurrentState();
  }
  currentLanguage = nextLanguage;
  const language = nextLanguage;
  els.quickLanguage.value = language;
  scheduleAppSettingsSave();
  els.fileTabs.classList.toggle("python-mode", language === "python");
  editorView = "code";
  updateDrawerActiveItem();
  setEditorLanguage(language);
  const activeFile = language === "python" ? activePyFile : activeCppFile;
  const files = language === "python" ? pyFiles : cppFiles;
  const inputs = language === "python" ? pyInputs : cppInputs;
  setEditorCode(activeFile ? files[activeFile] : "");
  els.input.value = activeFile ? inputs[activeFile] || "" : "";
  renderFileTabs();
  updateEditorEmptyState();
  updateEditorActionButton();
  setStatus("Idle", "idle");
}

function openProblemCode() {
  switchEditorView("code");
  if (els.language.value === "python") {
    loadWorkspacePythonFiles();
  } else {
    loadWorkspaceCppFiles();
  }
}

function toggleDrawer() {
  showDrawer(!layoutState.showDrawer);
  if (layoutState.showDrawer) loadSavedContestList();
}

function showDrawer(visible) {
  layoutState.showDrawer = visible;
  applyWorkspaceLayout();
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
    const contestKey = contestKeyFor(contest);
    const expanded = expandedContestKeys.has(contestKey);
    const group = document.createElement("div");
    group.className = "saved-contest-group";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "drawer-item saved-contest-btn contest-toggle-btn";
    button.title = `${contest.name}${contest.problemCount ? ` · ${contest.problemCount} problems` : ""}`;
    button.setAttribute("aria-expanded", String(expanded));

    const chevron = document.createElement("span");
    chevron.className = "contest-chevron";
    chevron.textContent = ">";

    const label = document.createElement("span");
    label.className = "contest-title";
    label.textContent = formatRecentContestName(contest);

    button.append(chevron, label);
    button.addEventListener("click", () => toggleContestProblems(contest));
    group.append(button);

    if (expanded) {
      const list = document.createElement("div");
      list.className = "contest-problem-list";
      for (const problem of contest.problems || []) {
        const problemButton = document.createElement("button");
        problemButton.type = "button";
        problemButton.className = "contest-problem-btn";
        problemButton.textContent = `${problem.index}. ${problem.name || "Problem"}`;
        problemButton.title = problemButton.textContent;
        problemButton.addEventListener("click", () => loadSavedContest(contest, problem.index));
        list.append(problemButton);
      }
      group.append(list);
    }

    els.savedContestList.append(group);
  }
}

function contestKeyFor(contest) {
  return contest.contestDir || contest.contestId || contest.name || "";
}

function toggleContestProblems(contest) {
  const contestKey = contestKeyFor(contest);
  if (expandedContestKeys.has(contestKey)) {
    expandedContestKeys.delete(contestKey);
  } else {
    expandedContestKeys.add(contestKey);
  }
  renderSavedContests();
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

async function loadSavedContest(contest, targetProblemIndex = "") {
  if (!contest?.contestDir && !contest?.contestId) return;
  if (contest.contestId) {
    els.contestUrl.value = `https://codeforces.com/contest/${contest.contestId}`;
  }
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
    scheduleAppSettingsSave();
    applyContestProblems(result, { source: "saved" });
    if (targetProblemIndex) {
      const extension = els.language.value === "python" ? ".py" : ".cpp";
      const targetFilename = `${targetProblemIndex}${extension}`;
      if (currentFileNames().includes(targetFilename) && currentActiveFile() !== targetFilename) {
        switchCodeFile(targetFilename);
      }
    }
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
  saveCurrentState();
  if (view === "template" || view === "headers") {
    els.language.value = "cpp";
  }
  if (view === "python-template") {
    els.language.value = "python";
  }
  currentLanguage = els.language.value;
  els.quickLanguage.value = els.language.value;
  editorView = view;
  setEditorLanguage(view === "python-template" ? "python" : "cpp");
  setEditorCode(getCurrentEditorBuffer());
  updateDrawerActiveItem();
  renderFileTabs();
  updateEditorEmptyState();
  updateEditorActionButton();
  setStatus(templateViewFilename(view) || "Code", "idle");
}

function getCurrentEditorBuffer() {
  if (editorView === "headers") return cppHeaders;
  if (editorView === "template") return cppTemplate;
  if (editorView === "python-template") return pythonCode;
  return els.language.value === "python" ? pyFiles[activePyFile] || "" : cppFiles[activeCppFile] || "";
}

function updateDrawerActiveItem() {
  els.codeFileBtn.classList.toggle("active", editorView === "code");
}

function currentFileNames() {
  return els.language.value === "python" ? pyFileNames : cppFileNames;
}

function currentFiles() {
  return els.language.value === "python" ? pyFiles : cppFiles;
}

function currentInputs() {
  return els.language.value === "python" ? pyInputs : cppInputs;
}

function currentTabLabels() {
  return els.language.value === "python" ? pyTabLabels : cppTabLabels;
}

function currentActiveFile() {
  return els.language.value === "python" ? activePyFile : activeCppFile;
}

function isTemplateEditorView() {
  return ["template", "headers", "python-template"].includes(editorView);
}

function templateViewFilename(view = editorView) {
  if (view === "template") return "Template.cpp";
  if (view === "headers") return "Headers.hpp";
  if (view === "python-template") return "Template.py";
  return "";
}

function renderFileTabs() {
  els.fileTabs.innerHTML = "";
  if (isTemplateEditorView()) {
    for (const view of ["template", "headers", "python-template"]) {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "file-tab";
      tab.textContent = templateViewFilename(view);
      tab.title = tab.textContent;
      tab.addEventListener("click", () => switchEditorView(view));
      tab.classList.toggle("active", editorView === view);
      els.fileTabs.append(tab);
    }
    return;
  }
  const fileNames = currentFileNames();
  const tabLabels = currentTabLabels();
  const extensionLabel = els.language.value === "python" ? "Python" : "C++";
  for (const filename of fileNames) {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "file-tab";
    tab.title = tabLabels[filename] || filename;
    tab.dataset.file = filename;
    const label = document.createElement("span");
    label.textContent = tabLabels[filename] || filename;
    const close = document.createElement("span");
    close.className = "tab-close";
    close.textContent = "×";
    close.title = `Close ${filename}`;
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closeCodeFile(filename);
    });
    tab.append(label, close);
    tab.addEventListener("click", () => switchCodeFile(filename));
    els.fileTabs.append(tab);
  }
  const addTab = document.createElement("button");
  addTab.type = "button";
  addTab.className = "file-tab add-file-tab";
  addTab.textContent = "+";
  addTab.title = `Add next ${extensionLabel} file`;
  addTab.addEventListener("click", addNextCodeFile);
  els.fileTabs.append(addTab);
  updateActiveFileTab();
}

async function closeCodeFile(filename) {
  const isPython = els.language.value === "python";
  const fileNames = isPython ? pyFileNames : cppFileNames;
  const files = isPython ? pyFiles : cppFiles;
  const inputs = isPython ? pyInputs : cppInputs;
  const tabLabels = isPython ? pyTabLabels : cppTabLabels;
  const problems = isPython ? pyProblems : cppProblems;
  const activeFile = isPython ? activePyFile : activeCppFile;
  if (filename === activeFile) {
    clearTimeout(codeSaveTimer);
    codeSaveTimer = null;
  } else {
    saveCurrentState();
  }
  const index = fileNames.indexOf(filename);
  const nextFileNames = fileNames.filter((name) => name !== filename);
  if (isPython) pyFileNames = nextFileNames;
  else cppFileNames = nextFileNames;
  delete files[filename];
  delete inputs[filename];
  delete tabLabels[filename];
  delete problems[filename];
  if (codeFileScope === "workspace") {
    const remove = isPython ? deleteWorkspacePythonFile : deleteWorkspaceCppFile;
    const folderName = isPython ? "TemporaryPythonFiles" : "TemporaryCPPFiles";
    await remove(filename).catch(() => {
      els.meta.textContent = `Could not delete ${filename} from ${folderName}`;
    });
  }
  if (activeFile === filename) {
    const nextActiveFile = nextFileNames[Math.max(0, index - 1)] || nextFileNames[0] || "";
    if (isPython) activePyFile = nextActiveFile;
    else activeCppFile = nextActiveFile;
    setEditorCode(nextActiveFile ? files[nextActiveFile] : "");
    els.input.value = nextActiveFile ? inputs[nextActiveFile] || "" : "";
  }
  renderFileTabs();
  updateEditorEmptyState();
  setStatus("Closed", "idle");
  els.meta.textContent = `${filename} closed`;
}

function addNextCodeFile() {
  saveCurrentState();
  const isPython = els.language.value === "python";
  const filename = nextCodeFilename(isPython ? pyFileNames : cppFileNames, isPython ? ".py" : ".cpp");
  const files = isPython ? pyFiles : cppFiles;
  const inputs = isPython ? pyInputs : cppInputs;
  const tabLabels = isPython ? pyTabLabels : cppTabLabels;
  const problems = isPython ? pyProblems : cppProblems;
  if (isPython) pyFileNames.push(filename);
  else cppFileNames.push(filename);
  files[filename] = isPython ? pythonCode : cppTemplate;
  inputs[filename] = "";
  tabLabels[filename] = filename;
  problems[filename] = null;
  if (isPython) activePyFile = filename;
  else activeCppFile = filename;
  editorView = "code";
  renderFileTabs();
  updateDrawerActiveItem();
  updateEditorActionButton();
  setEditorLanguage(els.language.value);
  setEditorCode(files[filename]);
  els.input.value = "";
  updateEditorEmptyState();
  if (codeFileScope === "workspace") {
    const save = isPython ? saveWorkspacePythonFile : saveWorkspaceCppFile;
    const folderName = isPython ? "TemporaryPythonFiles" : "TemporaryCPPFiles";
    save(filename, files[filename]).catch(() => {
      els.meta.textContent = `Could not create ${filename} in ${folderName}`;
    });
  }
  setStatus("Created", "success");
  els.meta.textContent = `${filename} added`;
}

function createFirstCppFile() {
  if (currentFileNames().length === 0) {
    addNextCodeFile();
  }
}

function nextCodeFilename(fileNames, extension) {
  const used = new Set(fileNames);
  let index = 1;
  while (true) {
    const filename = `${numberToLetters(index)}${extension}`;
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

function switchCodeFile(filename) {
  const isPython = els.language.value === "python";
  const activeFile = isPython ? activePyFile : activeCppFile;
  if (filename === activeFile) return;
  saveCurrentState();
  editorView = "code";
  if (isPython) activePyFile = filename;
  else activeCppFile = filename;
  const files = isPython ? pyFiles : cppFiles;
  const inputs = isPython ? pyInputs : cppInputs;
  setEditorCode(files[filename]);
  els.input.value = inputs[filename] || "";
  updateEditorEmptyState();
  updateDrawerActiveItem();
  updateActiveFileTab();
  updateEditorActionButton();
  setStatus("Idle", "idle");
  refreshCodeforcesStatus(false);
}

function updateActiveFileTab() {
  const activeFile = els.language.value === "python" ? activePyFile : activeCppFile;
  els.fileTabs.querySelectorAll(".file-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.file === activeFile);
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
  if (editorView === "python-template") {
    pythonCode = value;
    if (markDirty) setTemplateDirty(true);
    return;
  }
  if (els.language.value === "python") {
    if (!activePyFile) return;
    pyFiles[activePyFile] = value;
    pyInputs[activePyFile] = els.input.value;
    scheduleWorkspaceCodeSave();
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
        language: els.language.value
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
    scheduleAppSettingsSave();
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
  const isPython = contest.files?.language === "python" || els.language.value === "python";
  const extension = isPython ? ".py" : ".cpp";
  const template = isPython ? pythonCode : cppTemplate;
  codeFileScope = "contest";
  activeContestDir = contest.files?.contestDir || recentContest?.contestDir || "";
  const fileNames = problems.map((problem) => `${problem.index}${extension}`);
  const files = Object.fromEntries(problems.map((problem) => [
    `${problem.index}${extension}`,
    problem.code ?? template
  ]));
  const inputs = Object.fromEntries(problems.map((problem) => [
    `${problem.index}${extension}`,
    problem.samples?.[0]?.input || ""
  ]));
  const tabLabels = Object.fromEntries(problems.map((problem) => [
    `${problem.index}${extension}`,
    `${problem.index}${extension} - ${problem.name}`
  ]));
  const problemMap = Object.fromEntries(problems.map((problem) => [
    `${problem.index}${extension}`,
    problem
  ]));
  if (isPython) {
    pyFileNames = fileNames;
    pyFiles = files;
    pyInputs = inputs;
    pyTabLabels = tabLabels;
    pyProblems = problemMap;
    activePyFile = pyFileNames[0] || "A.py";
  } else {
    cppFileNames = fileNames;
    cppFiles = files;
    cppInputs = inputs;
    cppTabLabels = tabLabels;
    cppProblems = problemMap;
    activeCppFile = cppFileNames[0] || "A.cpp";
  }
  editorView = "code";

  els.language.value = isPython ? "python" : "cpp";
  currentLanguage = els.language.value;
  els.quickLanguage.value = els.language.value;
  renderFileTabs();
  updateDrawerActiveItem();
  els.fileTabs.classList.toggle("python-mode", isPython);
  setEditorLanguage(els.language.value);
  const activeFile = isPython ? activePyFile : activeCppFile;
  setEditorCode(files[activeFile] || template);
  els.input.value = inputs[activeFile] || "";
  updateEditorEmptyState();
  els.output.value = "";
  const sampleCount = problems.filter((problem) => problem.samples?.length).length;
  const placeholderMessage = contest.placeholder
    ? `Problem data is not available yet. Placeholder A${extension} through G${extension} files were created from ${isPython ? "Template.py" : "Template.cpp"}.`
    : "";
  els.debug.textContent = [
    contest.name,
    `${problems.length} problems ${source === "saved" ? "loaded from workspace" : "imported"}.`,
    `${sampleCount} sample inputs loaded.`,
    placeholderMessage,
    !contest.placeholder && source !== "saved" && sampleCount < problems.length
      ? "Some sample inputs could not be fetched because Codeforces problem pages are protected from server-side scraping."
      : ""
  ].filter(Boolean).join("\n");
  showDebug(Boolean(placeholderMessage) || (!contest.placeholder && source !== "saved" && sampleCount < problems.length));
  setStatus(contest.placeholder ? "Placeholder" : source === "saved" ? "Loaded" : "Imported", "success");
  els.meta.textContent = contest.placeholder
    ? `${problems.length} placeholder files created · re-import when contest is live`
    : `${problems.length} problems ${source === "saved" ? "loaded" : "imported"} · ${sampleCount} sample inputs loaded`;
  refreshCodeforcesStatus(false);
}

async function resetActiveCode() {
  const isPython = els.language.value === "python";
  const activeFile = isPython ? activePyFile : activeCppFile;
  if (editorView !== "code" || !activeFile) {
    setStatus("Code only", "error");
    els.meta.textContent = `Create a ${isPython ? "Python" : "C++"} file first`;
    return;
  }
  const loaded = await reloadTemplateFilesFromWorkspace({ updateVisible: false, resetDirty: true });
  if (!loaded) return;
  const template = isPython ? pythonCode : cppTemplate;
  const files = isPython ? pyFiles : cppFiles;
  files[activeFile] = template;
  setEditorCode(template);
  const save = isPython
    ? codeFileScope === "contest" ? saveContestPythonFile : saveWorkspacePythonFile
    : codeFileScope === "contest" ? saveContestCppFile : saveWorkspaceCppFile;
  await save(activeFile, template).catch(() => {
    els.meta.textContent = `Could not save ${activeFile} after reset`;
  });
  setStatus("Reset", "success");
  els.meta.textContent = `${activeFile} reset to ${isPython ? "Template.py" : "Template.cpp"}`;
}

async function reloadOpenWorkspaceFile() {
  const loaded = await reloadTemplateFilesFromWorkspace({ updateVisible: true, resetDirty: true });
  if (!loaded) return;
  setStatus("Reloaded", "success");
  els.meta.textContent = `${templateViewFilename()} reloaded from workspace`;
}

function handleEditorAction() {
  if (isTemplateEditorView()) {
    reloadOpenWorkspaceFile();
  } else {
    resetActiveCode();
  }
}

function updateEditorActionButton() {
  if (isTemplateEditorView()) {
    const filename = templateViewFilename();
    els.resetCodeBtn.textContent = "Reload File";
    els.resetCodeBtn.title = `Reload ${filename} from workspace`;
  } else {
    els.resetCodeBtn.textContent = "Load from Template";
    els.resetCodeBtn.title = `Load active problem code from ${els.language.value === "python" ? "Template.py" : "Template.cpp"}`;
  }
}

function setEditorFontSize(size) {
  editorFontSize = Math.min(24, Math.max(11, size));
  document.documentElement.style.setProperty("--editor-font-size", `${editorFontSize}px`);
  els.fontSizeLabel.textContent = `${editorFontSize}px`;
  els.quickFontSizeLabel.textContent = `${editorFontSize}px`;
  els.editorFontSizeInput.value = String(editorFontSize);
  localStorage.setItem("forge.editorFontSize", String(editorFontSize));
  scheduleAppSettingsSave();
  requestAnimationFrame(() => codeEditor?.refresh());
}

function setEditorFontFamily(fontFamily) {
  editorFontFamily = fontFamily || "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace";
  document.documentElement.style.setProperty("--editor-font-family", editorFontFamily);
  els.editorFontSelect.value = editorFontFamily;
  els.quickEditorFontSelect.value = editorFontFamily;
  localStorage.setItem("rathee.editorFontFamily", editorFontFamily);
  scheduleAppSettingsSave();
  requestAnimationFrame(() => codeEditor?.refresh());
}

function setCodeforcesHandle(handle) {
  codeforcesHandle = normalizeCodeforcesHandle(handle);
  els.codeforcesHandleInput.value = codeforcesHandle;
  localStorage.setItem("rathee.codeforcesHandle", codeforcesHandle);
  scheduleAppSettingsSave();
}

function normalizeCodeforcesHandle(value) {
  const raw = String(value || "").trim();
  try {
    const url = new URL(raw);
    if (/(^|\.)codeforces\.com$/i.test(url.hostname)) {
      const parts = url.pathname.split("/").filter(Boolean);
      const profileIndex = parts.findIndex((part) => part.toLowerCase() === "profile");
      if (profileIndex !== -1 && parts[profileIndex + 1]) {
        return decodeURIComponent(parts[profileIndex + 1]).trim();
      }
    }
  } catch {
    // Treat plain text as a handle.
  }
  return raw;
}

function validCodeforcesHandle() {
  return /^[A-Za-z0-9_.-]{3,24}$/.test(codeforcesHandle);
}

async function submitToCodeforces() {
  saveCurrentState();
  const isPython = els.language.value === "python";
  const activeFile = isPython ? activePyFile : activeCppFile;
  const problems = isPython ? pyProblems : cppProblems;
  if (!activeFile) {
    setStatus("No file", "error");
    els.meta.textContent = `Create a ${isPython ? "Python" : "C++"} file before submitting`;
    return;
  }
  const problem = problems[activeFile];
  if (!problem?.contestId || !problem?.index) {
    setStatus("No CF tab", "error");
    els.meta.textContent = "Import a Codeforces contest and select a problem tab first";
    return;
  }

  await copyActiveCode();
  const submitUrl = `https://codeforces.com/contest/${problem.contestId}/submit/${encodeURIComponent(problem.index)}`;
  window.open(submitUrl, "_blank", "noopener,noreferrer");
  els.debug.textContent = [
    `Opened ${submitUrl}`,
    isPython ? "Active Python file was copied to clipboard." : "Combined Headers.hpp + active code file was copied to clipboard.",
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
  if (els.language.value === "python") return activePyFile ? pyFiles[activePyFile] || "" : getEditorCode();
  if (!activeCppFile) return "";
  return combineCppSource(cppFiles[activeCppFile] || "");
}

function getRunCode() {
  saveCurrentState();
  if (els.language.value === "python") {
    if (editorView === "python-template") return pythonCode;
    return activePyFile ? pyFiles[activePyFile] || "" : "";
  }
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
  if (!validCodeforcesHandle()) {
    if (showWhenEmpty) {
      setStatus("No handle", "error");
      els.meta.textContent = "Set a valid Codeforces handle in Settings > Profile";
      els.debug.textContent = "Codeforces handle must be 3-24 characters and may use letters, numbers, underscore, dot, or dash.";
      showDebug(true);
    }
    return;
  }

  const activeFile = currentActiveFile();
  const problem = els.language.value === "python" ? pyProblems[activeFile] : cppProblems[activeFile];
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
  const activeFile = currentActiveFile();
  if (editorView === "code" && !activeFile) {
    setStatus("No file", "error");
    els.meta.textContent = `Create a ${els.language.value === "python" ? "Python" : "C++"} file with + before running`;
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
  if (els.debugBtn) els.debugBtn.disabled = !enabled;
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
  if (visible) {
    setOutputView("debug");
  } else {
    setOutputView("output");
  }
}

function labelForStatus(status) {
  return {
    success: "Success",
    compile_error: "Compile error",
    runtime_error: "Runtime error",
    timeout: "Timeout"
  }[status] || "Finished";
}
