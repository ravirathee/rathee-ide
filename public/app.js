const els = {
  app: document.querySelector(".app-shell"),
  menuBtn: document.querySelector("#menuBtn"),
  sideDrawer: document.querySelector("#sideDrawer"),
  drawerCloseBtn: document.querySelector("#drawerCloseBtn"),
  drawerTemplatesBtn: document.querySelector("#drawerTemplatesBtn"),
  codeFileBtn: document.querySelector("#codeFileBtn"),
  tempFileList: document.querySelector("#tempFileList"),
  savedContestSection: document.querySelector("#savedContestSection"),
  savedContestList: document.querySelector("#savedContestList"),
  contestSortDropdown: document.querySelector(".contest-sort-dropdown"),
  contestSortBtn: document.querySelector("#contestSortBtn"),
  contestSortMenu: document.querySelector("#contestSortMenu"),
  contestSortItems: Array.from(document.querySelectorAll(".contest-sort-item")),
  language: document.querySelector("#language"),
  code: document.querySelector("#code"),
  editorDebugPanel: document.querySelector("#editorDebugPanel"),
  debugResizeHandle: document.querySelector("#debugResizeHandle"),
  debugSplitResizeHandle: document.querySelector("#debugSplitResizeHandle"),
  emptyEditorState: document.querySelector("#emptyEditorState"),
  createFirstFileBtn: document.querySelector("#createFirstFileBtn"),
  input: document.querySelector("#input"),
  output: document.querySelector("#output"),
  sidePane: document.querySelector("#sidePane"),
  debug: document.querySelector("#debug"),
  callStack: document.querySelector("#callStack"),
  hideInputBtn: document.querySelector("#hideInputBtn"),
  hideOutputBtn: document.querySelector("#hideOutputBtn"),
  copyInputBtn: document.querySelector("#copyInputBtn"),
  copyOutputBtn: document.querySelector("#copyOutputBtn"),
  copyCodeBtn: document.querySelector("#copyCodeBtn"),
  copyDebugBtn: document.querySelector("#copyDebugBtn"),
  hideDebugBtn: document.querySelector("#hideDebugBtn"),
  debugControls: document.querySelector("#debugControls"),
  dbgStepOver: document.querySelector("#dbgStepOver"),
  dbgStepIn: document.querySelector("#dbgStepIn"),
  dbgStepOut: document.querySelector("#dbgStepOut"),
  dbgContinue: document.querySelector("#dbgContinue"),
  dbgRestart: document.querySelector("#dbgRestart"),
  dbgStop: document.querySelector("#dbgStop"),
  dbgStatus: document.querySelector("#dbgStatus"),
  fileTabs: document.querySelector("#fileTabs"),
  contestListLink: document.querySelector("#contestListLink"),
  contestUrl: document.querySelector("#contestUrl"),
  contestNumberChip: document.querySelector("#contestNumberChip"),
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
  autoCompletionSettings: document.querySelector("#autoCompletionSettings"),
  appearanceSettings: document.querySelector("#appearanceSettings"),
  modeLightBtn: document.querySelector("#modeLightBtn"),
  modeDarkBtn: document.querySelector("#modeDarkBtn"),
  themeSwatches: Array.from(document.querySelectorAll(".theme-swatch")),
  modeToggleBtn: document.querySelector("#modeToggleBtn"),
  modeIcon: document.querySelector("#modeToggleBtn .mode-icon"),
  themeDropdown: document.querySelector(".theme-dropdown"),
  themeDropdownBtn: document.querySelector("#themeDropdownBtn"),
  themeMenu: document.querySelector("#themeMenu"),
  themeMenuItems: Array.from(document.querySelectorAll(".theme-menu-item")),
  profileDropdown: document.querySelector(".profile-dropdown"),
  profileBtn: document.querySelector("#profileBtn"),
  profileMenu: document.querySelector("#profileMenu"),
  topProfileHandleInput: document.querySelector("#topProfileHandleInput"),
  profileOpenLink: document.querySelector("#profileOpenLink"),
  profileRating: document.querySelector("#profileRating"),
  profileStats: document.querySelector("#profileStats"),
  profileSolved: document.querySelector("#profileSolved"),
  profileContests: document.querySelector("#profileContests"),
  profileHeatmap: document.querySelector("#profileHeatmap"),
  profileReloadBtn: document.querySelector("#profileReloadBtn"),
  profileBadge: document.querySelector("#profileBadge"),
  profileBadgeEmoji: document.querySelector("#profileBadgeEmoji"),
  profileBadgeRank: document.querySelector("#profileBadgeRank"),
  profileBadgeRating: document.querySelector("#profileBadgeRating"),
  openTemplateFileBtn: document.querySelector("#openTemplateFileBtn"),
  openHeadersFileBtn: document.querySelector("#openHeadersFileBtn"),
  openPythonTemplateFileBtn: document.querySelector("#openPythonTemplateFileBtn"),
  codeforcesHandleInput: document.querySelector("#codeforcesHandleInput"),
  editorFontSizeInput: document.querySelector("#editorFontSizeInput"),
  editorFontSelect: document.querySelector("#editorFontSelect"),
  autoCompletionEnabled: document.querySelector("#autoCompletionEnabled"),
  autoCompletionPairs: document.querySelector("#autoCompletionPairs"),
  autoCompletionPlaceholder: document.querySelector("#autoCompletionPlaceholder"),
  autoCompletionRuleList: document.querySelector("#autoCompletionRuleList"),
  autoCompletionCreateRuleBtn: document.querySelector("#autoCompletionCreateRuleBtn"),
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
// Names of the temporary workspace files, cached separately so the "Temporary
// Code Files" list stays populated even while a contest is the active scope.
let tempCppNames = [];
let tempPyNames = [];
let pythonCode = "";
let editorView = "code";
let cppTemplate = "";
let cppHeaders = "";
let templateDirty = false;
let recentContest = JSON.parse(localStorage.getItem("rathee.recentContest") || "null");
let savedContests = [];
const contestSortModes = ["hosted", "fetched", "edited"];
let contestSortMode = contestSortModes.includes(localStorage.getItem("rathee.contestSortMode"))
  ? localStorage.getItem("rathee.contestSortMode")
  : "hosted";
let expandedContestKeys = new Set();
let tempFilesExpanded = false;
let codeforcesHandle = localStorage.getItem("rathee.codeforcesHandle") || "mr_awesomeravi";
let editorFontSize = Number(localStorage.getItem("forge.editorFontSize") || 15);
let editorFontFamily = localStorage.getItem("rathee.editorFontFamily")
  || "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace";
const APPEARANCE_MODES = ["light", "dark"];
const APPEARANCE_THEMES = ["aurora", "indigo", "sunset", "mono"];
const DEFAULT_AUTO_COMPLETION = {
  enabled: true,
  pairs: true,
  placeholder: "tabtab",
  rules: {
    for: "for(int i = 0 ; i < ntabtab ; i++){\n    tabtab\n}"
  }
};
let appearanceMode = APPEARANCE_MODES.includes(localStorage.getItem("rathee.appearanceMode"))
  ? localStorage.getItem("rathee.appearanceMode")
  : "dark";
let appearanceTheme = APPEARANCE_THEMES.includes(localStorage.getItem("rathee.appearanceTheme"))
  ? localStorage.getItem("rathee.appearanceTheme")
  : "aurora";
let codeEditor = null;
let settingEditorValue = false;
let codeSaveTimer = null;
let currentLanguage = document.querySelector("#language").value;
let editorQuickSettingsOpen = false;
let settingsSaveTimer = null;
let autoCompletion = normalizeAutoCompletionSettings(DEFAULT_AUTO_COMPLETION);
let snippetSession = null;
let autoCompletionDraftOpen = false;
const breakpointsByFile = {};
let debugSession = {
  id: null,
  active: false,
  busy: false,
  line: null,
  lineOffset: 0,
  params: null
};
let layoutState = {
  showDrawer: true,
  drawerWidth: Number(localStorage.getItem("rathee.drawerWidth") || 280),
  codeSide: localStorage.getItem("rathee.codeSide") || "left",
  showInput: localStorage.getItem("rathee.showInput") !== "false",
  showOutput: localStorage.getItem("rathee.showOutput") !== "false",
  sideWidth: Number(localStorage.getItem("rathee.sideWidth") || 38),
  inputHeight: Number(localStorage.getItem("rathee.inputHeight") || 45),
  showDebug: localStorage.getItem("rathee.showDebug") !== "false",
  debugHeight: Number(localStorage.getItem("rathee.debugHeight") || 28),
  debugStackWidth: Number(localStorage.getItem("rathee.debugStackWidth") || 36)
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

  const appearance = settings.appearance || {};
  if (APPEARANCE_MODES.includes(appearance.mode)) appearanceMode = appearance.mode;
  if (APPEARANCE_THEMES.includes(appearance.theme)) appearanceTheme = appearance.theme;
  autoCompletion = normalizeAutoCompletionSettings(settings.autoCompletion);

  const layout = settings.layout || {};
  if (Number.isFinite(Number(layout.drawerWidth))) layoutState.drawerWidth = Number(layout.drawerWidth);
  if (["left", "right"].includes(layout.codeSide)) layoutState.codeSide = layout.codeSide;
  if (typeof layout.showInput === "boolean") layoutState.showInput = layout.showInput;
  if (typeof layout.showOutput === "boolean") layoutState.showOutput = layout.showOutput;
  if (Number.isFinite(Number(layout.sideWidth))) layoutState.sideWidth = Number(layout.sideWidth);
  if (Number.isFinite(Number(layout.inputHeight))) layoutState.inputHeight = Number(layout.inputHeight);
  if (typeof layout.showDebug === "boolean") layoutState.showDebug = layout.showDebug;
  if (Number.isFinite(Number(layout.debugHeight))) layoutState.debugHeight = Number(layout.debugHeight);
  if (Number.isFinite(Number(layout.debugStackWidth))) layoutState.debugStackWidth = Number(layout.debugStackWidth);
}

function currentAppSettings() {
  return {
    recentContest,
    codeforcesHandle,
    editorFontSize,
    editorFontFamily,
    language: els.language.value,
    appearance: {
      mode: appearanceMode,
      theme: appearanceTheme
    },
    autoCompletion,
    layout: {
      drawerWidth: layoutState.drawerWidth,
      codeSide: layoutState.codeSide,
      showInput: layoutState.showInput,
      showOutput: layoutState.showOutput,
      sideWidth: layoutState.sideWidth,
      inputHeight: layoutState.inputHeight,
      showDebug: layoutState.showDebug,
      debugHeight: layoutState.debugHeight,
      debugStackWidth: layoutState.debugStackWidth
    }
  };
}

function normalizeAutoCompletionSettings(value) {
  const source = value && typeof value === "object" ? value : {};
  const rulesSource = source.rules && typeof source.rules === "object" && !Array.isArray(source.rules)
    ? source.rules
    : DEFAULT_AUTO_COMPLETION.rules;
  const rules = {};
  Object.entries(rulesSource).forEach(([trigger, template]) => {
    const cleanTrigger = String(trigger || "").trim();
    if (!cleanTrigger || /\s/.test(cleanTrigger)) return;
    rules[cleanTrigger] = String(template ?? "");
  });

  return {
    enabled: typeof source.enabled === "boolean" ? source.enabled : DEFAULT_AUTO_COMPLETION.enabled,
    pairs: typeof source.pairs === "boolean" ? source.pairs : DEFAULT_AUTO_COMPLETION.pairs,
    placeholder: cleanSnippetPlaceholder(source.placeholder),
    rules
  };
}

function cleanSnippetPlaceholder(value) {
  const marker = String(value || "").trim();
  return marker || DEFAULT_AUTO_COMPLETION.placeholder;
}

function renderAutoCompletionSettings() {
  if (!els.autoCompletionEnabled || !els.autoCompletionRuleList) return;
  els.autoCompletionEnabled.checked = Boolean(autoCompletion.enabled);
  if (els.autoCompletionPairs) els.autoCompletionPairs.checked = Boolean(autoCompletion.pairs);
  if (els.autoCompletionPlaceholder) els.autoCompletionPlaceholder.value = autoCompletion.placeholder;
  els.autoCompletionRuleList.innerHTML = "";

  const entries = Object.entries(autoCompletion.rules);
  if (!entries.length && !autoCompletionDraftOpen) {
    const empty = document.createElement("p");
    empty.className = "autocomplete-empty";
    empty.textContent = "No rules yet.";
    els.autoCompletionRuleList.append(empty);
  }

  entries.forEach(([trigger, template]) => {
    els.autoCompletionRuleList.append(createAutoCompletionRuleCard({ trigger, template }));
  });

  if (autoCompletionDraftOpen) {
    els.autoCompletionRuleList.append(createAutoCompletionRuleCard({ isDraft: true }));
  }
}

function createAutoCompletionRuleCard({ trigger = "", template = "", isDraft = false }) {
  const card = document.createElement("div");
  card.className = "autocomplete-rule-card";
  if (!isDraft) card.dataset.trigger = trigger;

  const actions = document.createElement("div");
  actions.className = "autocomplete-card-actions";

  const triggerLabel = document.createElement("label");
  const triggerText = document.createElement("span");
  triggerText.textContent = "Trigger";
  const triggerInput = document.createElement("input");
  triggerInput.type = "text";
  triggerInput.value = trigger;
  triggerInput.placeholder = "for";
  triggerInput.spellcheck = false;
  triggerInput.autocomplete = "off";
  triggerLabel.append(triggerText, triggerInput);

  const templateLabel = document.createElement("label");
  const templateText = document.createElement("span");
  templateText.textContent = "Expansion";
  const templateInput = document.createElement("textarea");
  templateInput.className = "settings-codearea";
  templateInput.value = template;
  templateInput.placeholder = sampleAutoCompletionTemplate();
  templateInput.spellcheck = false;
  templateLabel.append(templateText, templateInput);

  if (isDraft) {
    const maybeSaveDraft = () => addAutoCompletionRuleFromInputs(triggerInput, templateInput);
    triggerInput.addEventListener("input", maybeSaveDraft);
    templateInput.addEventListener("input", maybeSaveDraft);
  } else {
    const actionButton = createAutoCompletionIconButton({
      type: "delete",
      label: "Delete rule"
    });
    actions.append(actionButton);
    triggerInput.addEventListener("change", () => renameAutoCompletionRule(trigger, triggerInput.value));
    templateInput.addEventListener("input", () => updateAutoCompletionRule(trigger, templateInput.value));
    actionButton.addEventListener("click", () => deleteAutoCompletionRule(trigger));
  }

  const side = document.createElement("div");
  side.className = "autocomplete-card-side";
  side.append(triggerLabel, actions);

  card.append(side, templateLabel);
  return card;
}

function createAutoCompletionIconButton({ type, label }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon-button autocomplete-icon-button autocomplete-${type}`;
  button.title = label;
  button.setAttribute("aria-label", label);
  button.innerHTML = type === "delete"
    ? `<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </svg>`
    : `<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>`;
  return button;
}

function sampleAutoCompletionTemplate() {
  const marker = autoCompletion.placeholder;
  return `for(int i = 0 ; i < n${marker} ; i++){\n    ${marker}\n}`;
}

function setAutoCompletionEnabled(enabled) {
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    enabled
  });
  scheduleAppSettingsSave();
}

function setAutoCompletionPairs(enabled) {
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    pairs: enabled
  });
  scheduleAppSettingsSave();
}

function setAutoCompletionPlaceholder(value) {
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    placeholder: value
  });
  if (els.autoCompletionPlaceholder && els.autoCompletionPlaceholder.value !== autoCompletion.placeholder) {
    els.autoCompletionPlaceholder.value = autoCompletion.placeholder;
  }
  renderAutoCompletionSettings();
  scheduleAppSettingsSave();
}

function updateAutoCompletionRule(trigger, template) {
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    rules: {
      ...autoCompletion.rules,
      [trigger]: template
    }
  });
  scheduleAppSettingsSave();
}

function renameAutoCompletionRule(previousTrigger, nextTrigger) {
  const cleanTrigger = String(nextTrigger || "").trim();
  if (!cleanTrigger || /\s/.test(cleanTrigger)) {
    renderAutoCompletionSettings();
    return;
  }

  const rules = { ...autoCompletion.rules };
  const template = rules[previousTrigger] ?? "";
  delete rules[previousTrigger];
  rules[cleanTrigger] = template;
  autoCompletion = normalizeAutoCompletionSettings({ ...autoCompletion, rules });
  renderAutoCompletionSettings();
  scheduleAppSettingsSave();
}

function deleteAutoCompletionRule(trigger) {
  const rules = { ...autoCompletion.rules };
  delete rules[trigger];
  autoCompletion = normalizeAutoCompletionSettings({ ...autoCompletion, rules });
  renderAutoCompletionSettings();
  scheduleAppSettingsSave();
}

function showAutoCompletionDraftRule() {
  autoCompletionDraftOpen = true;
  renderAutoCompletionSettings();
}

function addAutoCompletionRuleFromInputs(triggerInput, templateInput) {
  const trigger = String(triggerInput?.value || "").trim();
  const template = String(templateInput?.value || "");
  if (trigger && /\s/.test(trigger)) {
    triggerInput?.classList.add("is-invalid");
    return;
  }
  if (!trigger && !template.trim()) return;
  if (!trigger || !template.trim()) {
    triggerInput?.classList.remove("is-invalid");
    return;
  }

  triggerInput?.classList.remove("is-invalid");
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    rules: {
      ...autoCompletion.rules,
      [trigger]: template
    }
  });
  autoCompletionDraftOpen = false;
  renderAutoCompletionSettings();
  scheduleAppSettingsSave();
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
  applyAppearance();
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
  els.dbgStepOver.addEventListener("click", () => debugStep("over"));
  els.dbgStepIn.addEventListener("click", () => debugStep("in"));
  els.dbgStepOut.addEventListener("click", () => debugStep("out"));
  els.dbgContinue.addEventListener("click", () => debugStep("continue"));
  els.dbgRestart.addEventListener("click", restartDebugSession);
  els.dbgStop.addEventListener("click", () => stopDebugSession(true));
  els.menuBtn.addEventListener("click", toggleDrawer);
  els.drawerCloseBtn.addEventListener("click", () => showDrawer(false));
  els.drawerTemplatesBtn.addEventListener("click", () => {
    switchEditorView(els.language.value === "python" ? "python-template" : "template");
  });
  els.codeFileBtn.addEventListener("click", () => {
    // Just toggle the file-name list (like a saved contest); opening files into
    // the editor happens only when a specific file name is clicked.
    tempFilesExpanded = !tempFilesExpanded;
    renderTempFiles();
  });
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
  els.modeLightBtn.addEventListener("click", () => setAppearanceMode("light"));
  els.modeDarkBtn.addEventListener("click", () => setAppearanceMode("dark"));
  els.themeSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => setAppearanceTheme(swatch.dataset.themeValue));
  });
  els.modeToggleBtn.addEventListener("click", () => {
    setAppearanceMode(appearanceMode === "dark" ? "light" : "dark");
  });
  els.themeDropdownBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleThemeMenu();
  });
  els.themeMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
      setAppearanceTheme(item.dataset.themeValue);
      toggleThemeMenu(false);
    });
  });
  els.contestSortBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleContestSortMenu();
  });
  els.contestSortItems.forEach((item) => {
    item.addEventListener("click", () => setContestSortMode(item.dataset.sortValue));
  });
  els.profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleProfileMenu();
  });
  els.topProfileHandleInput.addEventListener("input", () => {
    setCodeforcesHandle(els.topProfileHandleInput.value);
    refreshProfileDisplay();
  });
  els.profileReloadBtn.addEventListener("click", () => loadCodeforcesProfile({ force: true }));
  document.addEventListener("click", (event) => {
    if (!els.themeMenu.hidden && !els.themeDropdown.contains(event.target)) toggleThemeMenu(false);
    if (!els.profileMenu.hidden && !els.profileDropdown.contains(event.target)) toggleProfileMenu(false);
    if (!els.contestSortMenu.hidden && !els.contestSortDropdown.contains(event.target)) toggleContestSortMenu(false);
  });
  els.editorFontSizeInput.addEventListener("input", () => setEditorFontSize(Number(els.editorFontSizeInput.value)));
  els.editorFontSelect.addEventListener("change", () => setEditorFontFamily(els.editorFontSelect.value));
  els.autoCompletionEnabled?.addEventListener("change", () => setAutoCompletionEnabled(els.autoCompletionEnabled.checked));
  els.autoCompletionPairs?.addEventListener("change", () => setAutoCompletionPairs(els.autoCompletionPairs.checked));
  els.autoCompletionPlaceholder?.addEventListener("change", () => setAutoCompletionPlaceholder(els.autoCompletionPlaceholder.value));
  els.autoCompletionCreateRuleBtn?.addEventListener("click", showAutoCompletionDraftRule);
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
  els.contestUrl.addEventListener("input", updateContestChip);
  if (recentContest?.url) els.contestUrl.value = recentContest.url;
  updateContestChip();
  els.codeLeftBtn.addEventListener("click", () => setCodeEditorPlacement("left"));
  els.codeRightBtn.addEventListener("click", () => setCodeEditorPlacement("right"));
  els.hideInputBtn.addEventListener("click", () => togglePanel("input"));
  els.hideOutputBtn.addEventListener("click", () => togglePanel("output"));
  els.copyInputBtn.addEventListener("click", () => copyPaneText(els.input.value, els.copyInputBtn));
  els.copyOutputBtn.addEventListener("click", () => copyPaneText(els.output.value, els.copyOutputBtn));
  els.copyCodeBtn.addEventListener("click", () => copyPaneText(getEditorCode(), els.copyCodeBtn));
  els.copyDebugBtn.addEventListener("click", () => copyPaneText(combinedDebugText(), els.copyDebugBtn));
  els.hideDebugBtn.addEventListener("click", toggleDebugPanel);
  els.revealIoBtn.addEventListener("click", revealInputOutput);
  initResizablePanes();
  applyWorkspaceLayout();
  setEditorFontSize(editorFontSize);
  setEditorFontFamily(editorFontFamily);
  renderAutoCompletionSettings();
  els.quickLanguage.value = els.language.value;
  setCodeforcesHandle(codeforcesHandle);
  loadCodeforcesProfile();
  codeEditor?.on("change", handleEditorChange);
  codeEditor?.on("inputRead", handleEditorInputRead);
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
    tempCppNames = cppFileNames.slice();

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
    tempPyNames = pyFileNames.slice();

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
  codeEditor.on("keydown", handleEditorKeyDown);
  codeEditor.on("gutterClick", handleEditorGutterClick);
}

function codeMirrorOptions() {
  return {
    mode: "text/x-c++src",
    theme: "material-darker",
    lineNumbers: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"],
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    viewportMargin: Infinity,
    extraKeys: {
      Tab(cm) {
        if (moveToNextSnippetStop(cm)) return;
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.replaceSelection("    ", "end");
        }
      }
    }
  };
}

function handleEditorKeyDown(cm, event) {
  if (!autoCompletion.enabled || cm.getOption("readOnly")) return;
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;

  const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "\"": "\"",
    "'": "'"
  };
  const closing = new Set(Object.values(pairs));

  if (autoCompletion.pairs && closing.has(event.key) && !cm.somethingSelected()) {
    const cursor = cm.getCursor();
    if (cm.getRange(cursor, { line: cursor.line, ch: cursor.ch + 1 }) === event.key) {
      event.preventDefault();
      cm.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
    }
    return;
  }

  if (autoCompletion.pairs && pairs[event.key]) {
    event.preventDefault();
    insertPair(cm, event.key, pairs[event.key]);
    return;
  }

  if (event.key === "Backspace" && autoCompletion.pairs && !cm.somethingSelected()) {
    const cursor = cm.getCursor();
    if (cursor.ch === 0) return;
    const previous = cm.getRange({ line: cursor.line, ch: cursor.ch - 1 }, cursor);
    const next = cm.getRange(cursor, { line: cursor.line, ch: cursor.ch + 1 });
    if (pairs[previous] === next) {
      event.preventDefault();
      cm.replaceRange("", { line: cursor.line, ch: cursor.ch - 1 }, { line: cursor.line, ch: cursor.ch + 1 });
    }
  }
}

function insertPair(cm, open, close) {
  const selections = cm.listSelections();
  if (cm.somethingSelected()) {
    cm.operation(() => {
      selections.forEach((selection) => {
        const from = selection.from();
        const to = selection.to();
        const selected = cm.getRange(from, to);
        cm.replaceRange(`${open}${selected}${close}`, from, to, "+pair");
      });
    });
    return;
  }

  const cursor = cm.getCursor();
  cm.replaceRange(`${open}${close}`, cursor, cursor, "+pair");
  cm.setCursor({ line: cursor.line, ch: cursor.ch + open.length });
}

function handleEditorInputRead(cm, change) {
  if (!autoCompletion.enabled || cm.getOption("readOnly")) return;
  if (!change.origin || !change.origin.startsWith("+input")) return;
  if (change.text.join("\n").length !== 1) return;
  expandSnippetAtCursor(cm);
}

function expandSnippetAtCursor(cm) {
  const cursor = cm.getCursor();
  const lineBeforeCursor = cm.getLine(cursor.line).slice(0, cursor.ch);
  const trigger = Object.keys(autoCompletion.rules)
    .filter((candidate) => lineBeforeCursor.endsWith(candidate))
    .sort((a, b) => b.length - a.length)[0];

  if (!trigger) return;
  const triggerStart = cursor.ch - trigger.length;
  const beforeTrigger = triggerStart > 0 ? lineBeforeCursor[triggerStart - 1] : "";
  if (beforeTrigger && /[A-Za-z0-9_]/.test(beforeTrigger)) return;

  const snippet = parseSnippetTemplate(autoCompletion.rules[trigger]);
  const from = { line: cursor.line, ch: triggerStart };
  cm.operation(() => {
    clearSnippetSession();
    cm.replaceRange(snippet.text, from, cursor, "+completion");
    const positions = snippet.stops.map((offset) => positionFromTextOffset(snippet.text, offset, from));
    snippetSession = positions.length ? {
      bookmarks: positions.map((position) => cm.setBookmark(position)),
      index: 0
    } : null;
    if (positions.length) {
      cm.setCursor(positions[0]);
    } else {
      cm.setCursor(positionFromTextOffset(snippet.text, snippet.text.length, from));
    }
  });
}

function parseSnippetTemplate(template) {
  const raw = String(template ?? "");
  const placeholder = cleanSnippetPlaceholder(autoCompletion.placeholder);
  const stops = [];
  let text = "";
  let index = 0;

  while (index < raw.length) {
    const markerIndex = raw.indexOf(placeholder, index);
    if (markerIndex === -1) {
      text += raw.slice(index);
      break;
    }
    text += raw.slice(index, markerIndex);
    stops.push(text.length);
    index = markerIndex + placeholder.length;
  }

  return { text, stops };
}

function positionFromTextOffset(text, offset, from) {
  const before = text.slice(0, offset).split("\n");
  if (before.length === 1) return { line: from.line, ch: from.ch + before[0].length };
  return {
    line: from.line + before.length - 1,
    ch: before[before.length - 1].length
  };
}

function moveToNextSnippetStop(cm) {
  if (!snippetSession?.bookmarks?.length) return false;
  if (snippetSession.index >= snippetSession.bookmarks.length - 1) {
    clearSnippetSession();
    return false;
  }
  snippetSession.index += 1;
  const position = snippetSession.bookmarks[snippetSession.index].find();
  if (!position) {
    clearSnippetSession();
    return false;
  }
  cm.setCursor(position);
  return true;
}

function clearSnippetSession() {
  snippetSession?.bookmarks?.forEach((bookmark) => bookmark.clear());
  snippetSession = null;
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
    requestAnimationFrame(renderEditorBreakpoints);
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

function breakpointKey() {
  const activeFile = currentActiveFile();
  if (!activeFile || editorView !== "code") return "";
  return `${els.language.value}:${codeFileScope}:${activeContestDir || "workspace"}:${activeFile}`;
}

function currentBreakpoints() {
  const key = breakpointKey();
  if (!key) return new Set();
  breakpointsByFile[key] ||= new Set();
  return breakpointsByFile[key];
}

function handleEditorGutterClick(cm, line, gutter) {
  if (!["breakpoints", "CodeMirror-linenumbers"].includes(gutter) || editorView !== "code" || !currentActiveFile()) return;
  const breakpoints = currentBreakpoints();
  const lineNumber = line + 1;
  if (breakpoints.has(lineNumber)) {
    breakpoints.delete(lineNumber);
  } else {
    breakpoints.add(lineNumber);
  }
  renderEditorBreakpoints();
}

function renderEditorBreakpoints() {
  if (!codeEditor) return;
  codeEditor.clearGutter("breakpoints");
  if (editorView !== "code") return;
  currentBreakpoints().forEach((lineNumber) => {
    const marker = document.createElement("span");
    marker.className = "breakpoint-marker";
    marker.title = `Breakpoint on line ${lineNumber}`;
    codeEditor.setGutterMarker(lineNumber - 1, "breakpoints", marker);
  });
}

function activeBreakpointLines() {
  if (els.language.value !== "cpp" || editorView !== "code") return [];
  return Array.from(currentBreakpoints())
    .filter((lineNumber) => Number.isInteger(lineNumber) && lineNumber > 0)
    .sort((a, b) => a - b);
}

function activeRunBreakpointLines() {
  const offset = cppRunLineOffset();
  return activeBreakpointLines()
    .map((lineNumber) => lineNumber + offset)
    .filter((lineNumber) => lineNumber > 0);
}

function applyWorkspaceLayout() {
  layoutState.drawerWidth = clamp(layoutState.drawerWidth, 220, 420);
  layoutState.sideWidth = clamp(layoutState.sideWidth, 12, 72);
  layoutState.inputHeight = clamp(layoutState.inputHeight, 18, 78);
  layoutState.debugHeight = clamp(layoutState.debugHeight, 14, 55);
  layoutState.debugStackWidth = clamp(layoutState.debugStackWidth, 22, 65);

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
  els.editorDebugPanel.classList.toggle("collapsed", !layoutState.showDebug);
  els.debugResizeHandle.hidden = !layoutState.showDebug;
  document.querySelector(".editor-pane")?.classList.toggle("debug-hidden", !layoutState.showDebug);
  document.querySelector(".editor-pane")?.style.setProperty("--debug-height", `${layoutState.debugHeight}%`);
  els.editorDebugPanel.style.setProperty("--debug-stack-width", `${layoutState.debugStackWidth}%`);

  els.codeLeftBtn.classList.toggle("active", layoutState.codeSide === "left");
  els.codeRightBtn.classList.toggle("active", layoutState.codeSide === "right");
  els.quickCodeLeftBtn.classList.toggle("active", layoutState.codeSide === "left");
  els.quickCodeRightBtn.classList.toggle("active", layoutState.codeSide === "right");
  updatePaneToggleButton(els.hideInputBtn, layoutState.showInput, "input");
  updatePaneToggleButton(els.hideOutputBtn, layoutState.showOutput, "output");
  updatePaneToggleButton(els.hideDebugBtn, layoutState.showDebug, "debugger");
  localStorage.setItem("rathee.codeSide", layoutState.codeSide);
  localStorage.setItem("rathee.drawerWidth", String(layoutState.drawerWidth));
  localStorage.setItem("rathee.showInput", String(layoutState.showInput));
  localStorage.setItem("rathee.showOutput", String(layoutState.showOutput));
  localStorage.setItem("rathee.sideWidth", String(layoutState.sideWidth));
  localStorage.setItem("rathee.inputHeight", String(layoutState.inputHeight));
  localStorage.setItem("rathee.showDebug", String(layoutState.showDebug));
  localStorage.setItem("rathee.debugHeight", String(layoutState.debugHeight));
  localStorage.setItem("rathee.debugStackWidth", String(layoutState.debugStackWidth));
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

function toggleDebugPanel() {
  layoutState.showDebug = !layoutState.showDebug;
  applyWorkspaceLayout();
}

function revealInputOutput() {
  layoutState.showInput = true;
  layoutState.showOutput = true;
  applyWorkspaceLayout();
}

function setDebugPanelVisible(visible) {
  if (visible) {
    layoutState.showDebug = true;
    applyWorkspaceLayout();
  }
  requestAnimationFrame(() => {
    codeEditor?.setSize("100%", "100%");
    codeEditor?.refresh();
  });
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
  const target = ["profile", "appearance", "editor", "templates", "autocomplete"].includes(tabName) ? tabName : "profile";
  els.settingsTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.settingsTab === target);
  });
  els.appearanceSettings.hidden = target !== "appearance";
  els.editorSettings.hidden = target !== "editor";
  els.profileSettings.hidden = target !== "profile";
  els.templateSettings.hidden = target !== "templates";
  els.autoCompletionSettings.hidden = target !== "autocomplete";
}

function applyAppearance() {
  if (!APPEARANCE_MODES.includes(appearanceMode)) appearanceMode = "dark";
  if (!APPEARANCE_THEMES.includes(appearanceTheme)) appearanceTheme = "aurora";
  document.documentElement.dataset.mode = appearanceMode;
  document.documentElement.dataset.theme = appearanceTheme;
  localStorage.setItem("rathee.appearanceMode", appearanceMode);
  localStorage.setItem("rathee.appearanceTheme", appearanceTheme);
  codeEditor?.setOption("theme", appearanceMode === "light" ? "neo" : "material-darker");
  els.modeLightBtn?.classList.toggle("active", appearanceMode === "light");
  els.modeDarkBtn?.classList.toggle("active", appearanceMode === "dark");
  els.themeSwatches.forEach((swatch) => {
    swatch.classList.toggle("active", swatch.dataset.themeValue === appearanceTheme);
  });
  if (els.modeIcon) els.modeIcon.textContent = appearanceMode === "dark" ? "☾" : "☀";
  if (els.modeToggleBtn) {
    els.modeToggleBtn.title = appearanceMode === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }
  els.themeMenuItems?.forEach((item) => {
    item.classList.toggle("active", item.dataset.themeValue === appearanceTheme);
  });
  requestAnimationFrame(() => codeEditor?.refresh());
}

function toggleThemeMenu(force) {
  const open = typeof force === "boolean" ? force : els.themeMenu.hidden;
  els.themeMenu.hidden = !open;
  els.themeDropdownBtn.setAttribute("aria-expanded", String(open));
}

function toggleContestSortMenu(force) {
  const open = typeof force === "boolean" ? force : els.contestSortMenu.hidden;
  els.contestSortMenu.hidden = !open;
  els.contestSortBtn.setAttribute("aria-expanded", String(open));
}

function setContestSortMode(mode) {
  if (!contestSortModes.includes(mode)) return;
  contestSortMode = mode;
  localStorage.setItem("rathee.contestSortMode", mode);
  toggleContestSortMenu(false);
  renderSavedContests();
}

function toggleProfileMenu(force) {
  const open = typeof force === "boolean" ? force : els.profileMenu.hidden;
  els.profileMenu.hidden = !open;
  els.profileBtn.setAttribute("aria-expanded", String(open));
  if (open) {
    els.topProfileHandleInput.value = codeforcesHandle;
    updateProfileOpenLink();
    refreshProfileDisplay();
    requestAnimationFrame(() => els.topProfileHandleInput.focus());
  }
}

function updateProfileOpenLink() {
  if (!els.profileOpenLink) return;
  const handle = encodeURIComponent(codeforcesHandle || "");
  els.profileOpenLink.href = handle ? `https://codeforces.com/profile/${handle}` : "https://codeforces.com/";
}

let cachedProfile = readCachedProfile();

function readCachedProfile() {
  try {
    return JSON.parse(localStorage.getItem("rathee.cfProfile") || "null");
  } catch {
    return null;
  }
}

function cachedProfileMatchesHandle() {
  return cachedProfile
    && String(cachedProfile.handle || "").toLowerCase() === String(codeforcesHandle || "").toLowerCase();
}

// Render from the locally cached profile (no network). Used on boot, on open,
// and while the handle is being edited — the API is only hit on first load or reload.
function refreshProfileDisplay() {
  renderProfile(cachedProfileMatchesHandle() ? cachedProfile : null);
}

async function loadCodeforcesProfile({ force = false } = {}) {
  const handle = codeforcesHandle;
  if (!handle) {
    renderProfile(null);
    return;
  }
  if (!force && cachedProfileMatchesHandle()) {
    renderProfile(cachedProfile);
    return;
  }
  setReloadSpinning(true);
  setProfileMessage("Loading…");
  try {
    const res = await fetch(`/api/codeforces/profile?handle=${encodeURIComponent(handle)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load profile.");
    if (codeforcesHandle !== handle) return; // handle changed mid-flight
    cachedProfile = data;
    localStorage.setItem("rathee.cfProfile", JSON.stringify(data));
    renderProfile(data);
  } catch {
    if (codeforcesHandle !== handle) return;
    if (cachedProfileMatchesHandle()) renderProfile(cachedProfile);
    else setProfileMessage("Rating unavailable");
  } finally {
    setReloadSpinning(false);
  }
}

function setReloadSpinning(on) {
  els.profileReloadBtn?.classList.toggle("spinning", on);
}

function setProfileMessage(message) {
  if (els.profileRating) {
    els.profileRating.innerHTML = "";
    els.profileRating.textContent = message;
  }
}

// Codeforces rank ladder (low → high) with a fun emoji and the real CF color.
const CF_RANKS = [
  { name: "Newbie", emoji: "🐣", min: 0, color: "#9aa6b6" },
  { name: "Pupil", emoji: "🌱", min: 1200, color: "#3bab5a" },
  { name: "Specialist", emoji: "🛠️", min: 1400, color: "#16baa9" },
  { name: "Expert", emoji: "🎖️", min: 1600, color: "#5d8bf0" },
  { name: "Candidate Master", emoji: "🥋", min: 1900, color: "#c156d4" },
  { name: "Master", emoji: "🥷", min: 2100, color: "#f1a02e" },
  { name: "International Master", emoji: "🌐", min: 2300, color: "#f1a02e" },
  { name: "Grandmaster", emoji: "⚔️", min: 2400, color: "#fa4d4d" },
  { name: "International Grandmaster", emoji: "🔥", min: 2600, color: "#fa4d4d" },
  { name: "Legendary Grandmaster", emoji: "👑", min: 2900, color: "#fa4d4d" }
];

function rankIndexForRating(rating) {
  if (!Number.isFinite(rating)) return -1;
  let index = 0;
  for (let i = 0; i < CF_RANKS.length; i++) {
    if (rating >= CF_RANKS[i].min) index = i;
  }
  return index;
}

// Render the full rank ladder, highlighting the user's current rank.
function renderRankLadder(profile) {
  const container = els.profileRating;
  if (!container) return;
  container.innerHTML = "";
  if (!profile) {
    container.textContent = "—";
    return;
  }
  const rating = Number.isFinite(profile.rating) ? profile.rating : null;
  const maxRating = Number.isFinite(profile.maxRating) ? profile.maxRating : null;
  const currentIdx = rankIndexForRating(rating);
  const maxIdx = rankIndexForRating(maxRating);

  if (rating === null) {
    const note = document.createElement("div");
    note.className = "rank-ladder-note";
    note.textContent = "Unrated yet — climb the ladder! 🧗";
    container.append(note);
  }

  const ladder = document.createElement("div");
  ladder.className = "rank-ladder";
  let currentRow = null;
  for (let i = 0; i < CF_RANKS.length; i++) {
    const rank = CF_RANKS[i];
    const row = document.createElement("div");
    row.className = "rank-row";
    row.style.setProperty("--rank-color", rank.color);
    const isCurrent = i === currentIdx;
    if (isCurrent) { row.classList.add("current"); currentRow = row; }
    if (currentIdx !== -1 && i > currentIdx) row.classList.add("locked");

    const emoji = document.createElement("span");
    emoji.className = "rank-emoji";
    emoji.textContent = rank.emoji;

    const name = document.createElement("span");
    name.className = "rank-name";
    name.textContent = rank.name;

    const tag = document.createElement("span");
    tag.className = "rank-tag";
    if (isCurrent) {
      tag.textContent = rating !== null ? `${rating} · you are here! 👈` : "you are here! 👈";
      if (maxIdx === currentIdx && maxRating !== null) tag.textContent += ` · 🏆 ${maxRating}`;
    } else if (i === maxIdx && maxRating !== null) {
      tag.textContent = `🏆 max ${maxRating}`;
    }

    row.append(emoji, name, tag);
    ladder.append(row);
  }
  container.append(ladder);
  if (currentRow) {
    requestAnimationFrame(() => currentRow.scrollIntoView({ block: "nearest" }));
  }
}

function renderProfile(profile) {
  const rated = !!profile && Number.isFinite(profile.rating);
  const color = rated ? codeforcesRankColor(profile.rating) : null;

  renderRankLadder(profile);

  // Topbar badge (rank over rating, no max).
  if (els.profileBadge) {
    const showBadge = rated || (profile && profile.rank);
    els.profileBadge.hidden = !showBadge;
    if (showBadge) {
      if (els.profileBadgeEmoji) {
        const rankIdx = rankIndexForRating(profile.rating);
        els.profileBadgeEmoji.textContent = rankIdx !== -1 ? CF_RANKS[rankIdx].emoji : "";
      }
      els.profileBadgeRank.textContent = rated ? titleCaseRank(profile.rank) : "Unrated";
      els.profileBadgeRating.hidden = !rated;
      els.profileBadgeRating.textContent = rated ? String(profile.rating) : "";
      els.profileBadge.style.color = color || "var(--muted)";
    }
  }

  if (els.profileStats) {
    const hasStats = !!profile && (Number.isFinite(profile.solved) || Number.isFinite(profile.contests));
    els.profileStats.hidden = !hasStats;
    if (hasStats) {
      els.profileSolved.textContent = String(profile.solved ?? 0);
      els.profileContests.textContent = String(profile.contests ?? 0);
    }
  }

  renderHeatmap(profile && profile.heatmap);
  setProfileIconColor(color);
}

function heatLevel(count) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// GitHub-style submission heatmap: 53 week columns × 7 day rows.
function renderHeatmap(heatmap) {
  const container = els.profileHeatmap;
  if (!container) return;
  if (!heatmap || typeof heatmap !== "object" || !Object.keys(heatmap).length) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }
  container.hidden = false;
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "heatmap-grid";

  const weeks = 26; // last ~6 months
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Anchor the last column to the current week (Sunday-aligned) so today sits
  // at the right edge, then step back `weeks - 1` columns for the start.
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday of the current week
  start.setDate(start.getDate() - (weeks - 1) * 7);

  let total = 0;
  for (let w = 0; w < weeks; w++) {
    const column = document.createElement("div");
    column.className = "heatmap-week";
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const cell = document.createElement("span");
      cell.className = "heatmap-cell";
      if (date > today) {
        cell.classList.add("future");
      } else {
        const key = dateKey(date);
        const count = heatmap[key] || 0;
        total += count;
        cell.dataset.level = String(heatLevel(count));
        cell.title = `${count} submission${count === 1 ? "" : "s"} · ${key}`;
      }
      column.append(cell);
    }
    grid.append(column);
  }

  const title = document.createElement("div");
  title.className = "profile-heatmap-title";
  title.textContent = `${total} submission${total === 1 ? "" : "s"} in the last 6 months`;
  container.append(title, grid);
}

function setProfileIconColor(color) {
  if (els.profileBtn) els.profileBtn.style.color = color || "";
}

function titleCaseRank(rank) {
  return String(rank || "").replace(/\b\w/g, (char) => char.toUpperCase());
}

function codeforcesRankColor(rating) {
  if (!Number.isFinite(rating)) return null;
  if (rating < 1200) return "#9aa6b6"; // newbie (gray, lifted for dark bg)
  if (rating < 1400) return "#3bab5a"; // pupil (green)
  if (rating < 1600) return "#16baa9"; // specialist (cyan)
  if (rating < 1900) return "#5d8bf0"; // expert (blue, lifted for contrast)
  if (rating < 2100) return "#c156d4"; // candidate master (violet)
  if (rating < 2400) return "#f1a02e"; // master / international master (orange)
  return "#fa4d4d"; // grandmaster and above (red)
}

function setAppearanceMode(mode) {
  if (!APPEARANCE_MODES.includes(mode) || mode === appearanceMode) return;
  appearanceMode = mode;
  applyAppearance();
  scheduleAppSettingsSave();
}

function setAppearanceTheme(theme) {
  if (!APPEARANCE_THEMES.includes(theme) || theme === appearanceTheme) return;
  appearanceTheme = theme;
  applyAppearance();
  scheduleAppSettingsSave();
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
  els.debugResizeHandle.addEventListener("pointerdown", (event) => startResize(event, "debug"));
  els.debugSplitResizeHandle.addEventListener("pointerdown", (event) => startResize(event, "debug-split"));
}

function startResize(event, target) {
  event.preventDefault();
  const startX = event.clientX;
  const startY = event.clientY;
  const startDrawerWidth = layoutState.drawerWidth;
  const startSideWidth = layoutState.sideWidth;
  const startInputHeight = layoutState.inputHeight;
  const startDebugHeight = layoutState.debugHeight;
  const startDebugStackWidth = layoutState.debugStackWidth;
  const workspaceRect = els.workspace.getBoundingClientRect();
  const ioRect = els.ioPane.getBoundingClientRect();
  const editorRect = document.querySelector(".editor-pane")?.getBoundingClientRect();
  const debugRect = els.editorDebugPanel.getBoundingClientRect();
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
    if (target === "debug" && editorRect?.height) {
      layoutState.debugHeight = clamp(startDebugHeight - ((moveEvent.clientY - startY) / editorRect.height) * 100, 14, 55);
    }
    if (target === "debug-split" && debugRect?.width) {
      layoutState.debugStackWidth = clamp(startDebugStackWidth - ((moveEvent.clientX - startX) / debugRect.width) * 100, 22, 65);
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
  endDebugSessionOnContextChange();
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

function sortedSavedContests() {
  const list = savedContests.slice();
  const time = (value) => {
    const ms = value ? Date.parse(value) : NaN;
    return Number.isNaN(ms) ? 0 : ms;
  };
  const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
  if (contestSortMode === "fetched") {
    return list.sort((a, b) => time(b.savedAt) - time(a.savedAt) || byName(a, b));
  }
  if (contestSortMode === "edited") {
    return list.sort((a, b) =>
      (time(b.lastModifiedAt) || time(b.savedAt)) - (time(a.lastModifiedAt) || time(a.savedAt)) || byName(a, b));
  }
  // "hosted": higher Codeforces contest id == more recently hosted
  return list.sort((a, b) => (Number(b.contestId || 0) - Number(a.contestId || 0)) || byName(a, b));
}

function renderSavedContests() {
  els.savedContestList.innerHTML = "";
  els.contestSortItems.forEach((item) =>
    item.classList.toggle("active", item.dataset.sortValue === contestSortMode));
  if (!savedContests.length) {
    els.savedContestSection.hidden = true;
    return;
  }
  els.savedContestSection.hidden = false;
  for (const contest of sortedSavedContests()) {
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
    updateContestChip();
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
    setDebuggerOutput(error.message);
    setStatus("Load failed", "error");
    els.meta.textContent = "Saved contest could not be loaded from workspace";
    showDebug(true);
  } finally {
    setImportBusy(false);
  }
}

function switchEditorView(view) {
  if (view !== "code") endDebugSessionOnContextChange();
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
  els.codeFileBtn.classList.toggle("active", editorView === "code" && codeFileScope === "workspace");
  renderTempFiles();
}

function renderTempFiles() {
  if (!els.tempFileList) return;
  els.codeFileBtn.setAttribute("aria-expanded", String(tempFilesExpanded));
  els.tempFileList.hidden = !tempFilesExpanded;
  els.tempFileList.innerHTML = "";
  if (!tempFilesExpanded) return;

  // Always list the temporary workspace files from the cache, even when a
  // contest is the active scope, so they stay accessible on the left. While in
  // workspace scope the live arrays are the source of truth, so refresh the
  // cache from them — this keeps the list in sync as files are added/removed.
  const inWorkspace = codeFileScope === "workspace";
  if (inWorkspace) {
    if (els.language.value === "python") tempPyNames = pyFileNames.slice();
    else tempCppNames = cppFileNames.slice();
  }
  const names = els.language.value === "python" ? tempPyNames : tempCppNames;
  if (!names.length) {
    const empty = document.createElement("div");
    empty.className = "temp-file-empty";
    empty.textContent = "No files yet";
    els.tempFileList.append(empty);
    return;
  }

  const labels = inWorkspace ? currentTabLabels() : {};
  const activeFile = currentActiveFile();
  for (const filename of names) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "contest-problem-btn temp-file-btn";
    btn.textContent = labels[filename] || filename;
    btn.title = btn.textContent;
    btn.classList.toggle("active", inWorkspace && editorView === "code" && filename === activeFile);
    btn.addEventListener("click", () => openTempFile(filename));
    els.tempFileList.append(btn);
  }
}

function openTempFile(filename) {
  // Already in the workspace scope — just switch to the file.
  if (codeFileScope === "workspace" && editorView === "code") {
    switchCodeFile(filename);
    return;
  }
  // Leaving a contest (or a template view): restore the workspace files, then
  // activate the requested file once they have loaded.
  saveCurrentState();
  if (els.language.value === "python") activePyFile = filename;
  else activeCppFile = filename;
  openProblemCode();
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

function truncateTabLabel(text, max = 14) {
  const value = String(text || "").replace(/\s+-\s+/g, "-");
  return value.length > max ? `${value.slice(0, max).replace(/\s+$/, "")}..` : value;
}

function renderFileTabs() {
  els.fileTabs.innerHTML = "";
  renderTempFiles();
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
    const fullLabel = tabLabels[filename] || filename;
    tab.title = fullLabel;
    tab.dataset.file = filename;
    const label = document.createElement("span");
    label.textContent = truncateTabLabel(fullLabel);
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
  if (filename === activeFile && editorView === "code") return;
  endDebugSessionOnContextChange();
  const leavingTemplateView = editorView !== "code";
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
  // Coming back from a template view, the tab strip still shows the template
  // tabs — rebuild it into the code-file tabs; otherwise just move the highlight.
  if (leavingTemplateView) renderFileTabs();
  else updateActiveFileTab();
  updateEditorActionButton();
  setStatus("Idle", "idle");
  refreshCodeforcesStatus(false);
}

function updateActiveFileTab() {
  const activeFile = els.language.value === "python" ? activePyFile : activeCppFile;
  let activeTab = null;
  els.fileTabs.querySelectorAll(".file-tab").forEach((tab) => {
    const isActive = tab.dataset.file === activeFile;
    tab.classList.toggle("active", isActive);
    if (isActive) activeTab = tab;
  });
  if (activeTab) {
    requestAnimationFrame(() => activeTab.scrollIntoView({ inline: "nearest", block: "nearest" }));
  }
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

function parseContestNumber(value) {
  const raw = String(value || "").trim();
  const fromUrl = raw.match(/contests?\/(\d+)/i);
  if (fromUrl) return fromUrl[1];
  const bare = raw.match(/^(\d+)$/);
  return bare ? bare[1] : "";
}

function updateContestChip() {
  if (!els.contestNumberChip) return;
  const number = parseContestNumber(els.contestUrl.value);
  els.contestNumberChip.textContent = number || "—";
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
    setDebuggerOutput(error.message);
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
  setDebuggerOutput([
    contest.name,
    `${problems.length} problems ${source === "saved" ? "loaded from workspace" : "imported"}.`,
    `${sampleCount} sample inputs loaded.`,
    placeholderMessage,
    !contest.placeholder && source !== "saved" && sampleCount < problems.length
      ? "Some sample inputs could not be fetched because Codeforces problem pages are protected from server-side scraping."
      : ""
  ].filter(Boolean).join("\n"));
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
    els.resetCodeBtn.textContent = "Load from Template";
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
  if (els.codeforcesHandleInput && els.codeforcesHandleInput.value !== codeforcesHandle) {
    els.codeforcesHandleInput.value = codeforcesHandle;
  }
  if (els.topProfileHandleInput && els.topProfileHandleInput.value !== codeforcesHandle) {
    els.topProfileHandleInput.value = codeforcesHandle;
  }
  updateProfileOpenLink();
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
  setDebuggerOutput([
    `Opened ${submitUrl}`,
    isPython ? "Active Python file was copied to clipboard." : "Combined Headers.hpp + active code file was copied to clipboard.",
    "Paste it into Codeforces and submit using your logged-in browser session.",
    "Click Status here after submitting, or reload/import again to fetch the latest verdict."
  ].join("\n"));
  showDebug(true);
  setStatus("Submit opened", "idle");
  els.meta.textContent = `Code copied · submit ${problem.index} on Codeforces`;
}

async function copyActiveCode() {
  try {
    await navigator.clipboard.writeText(getSubmitCode());
  } catch {
    appendDebuggerOutput("Clipboard permission was blocked. Select and copy the editor code manually.");
  }
}

async function copyPaneText(text, button) {
  try {
    await navigator.clipboard.writeText(text || "");
    if (button) {
      button.classList.add("copied");
      setTimeout(() => button.classList.remove("copied"), 900);
    }
  } catch {
    els.meta.textContent = "Clipboard permission was blocked.";
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

function cppRunLineOffset() {
  if (els.language.value !== "cpp" || !activeCppFile) return 0;
  const header = cppHeaders.trimEnd();
  const headerLines = header ? header.split("\n").length : 0;
  const activeSource = cppFiles[activeCppFile] || "";
  const strippedPrefixLines = duplicateHeaderPrefixLineCount(activeSource);
  return headerLines + 2 - strippedPrefixLines;
}

function stripDuplicateHeaders(source) {
  const lines = source.split("\n");
  let index = duplicateHeaderPrefixLineCount(source);
  return lines.slice(index).join("\n");
}

function duplicateHeaderPrefixLineCount(source) {
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
  return index;
}

async function refreshCodeforcesStatus(showWhenEmpty) {
  if (!validCodeforcesHandle()) {
    if (showWhenEmpty) {
      setStatus("No handle", "error");
      els.meta.textContent = "Set a valid Codeforces handle in Settings > Profile";
      setDebuggerOutput("Codeforces handle must be 3-24 characters and may use letters, numbers, underscore, dot, or dash.");
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
        setDebuggerOutput(`No submissions found for ${codeforcesHandle} on ${problem.index}.`);
        showDebug(true);
      }
      els.meta.textContent = `No Codeforces submissions yet for ${problem.index}`;
      return;
    }

    const latest = result.latest;
    const verdict = latest.verdict || "TESTING";
    setDebuggerOutput([
      `${codeforcesHandle} · ${problem.index}. ${problem.name}`,
      `Verdict: ${verdict}`,
      `Language: ${latest.programmingLanguage}`,
      `Passed tests: ${latest.passedTestCount}`,
      `Time: ${latest.timeConsumedMillis} ms`,
      `Memory: ${Math.round(latest.memoryConsumedBytes / 1024)} KB`,
      `Submission: https://codeforces.com/contest/${latest.contestId}/submission/${latest.id}`
    ].join("\n"));
    showDebug(true);
    setStatus(verdict, verdict === "OK" ? "success" : "error");
    els.meta.textContent = `${problem.index} latest verdict: ${verdict}`;
  } catch (error) {
    if (showWhenEmpty) {
      setDebuggerOutput(error.message);
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
  const breakpointLines = activeRunBreakpointLines();
  const effectiveMode = mode === "run" && breakpointLines.length ? "debug" : mode;

  if (effectiveMode === "debug") {
    await startDebugSession({
      code: getRunCode(),
      input: els.input.value,
      breakpoints: breakpointLines,
      lineOffset: cppRunLineOffset()
    });
    return;
  }

  busy = true;
  setButtons(false);
  setStatus(effectiveMode === "debug" ? "Debugging" : "Running", "idle");
  els.meta.textContent = "Executing...";

  try {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: els.language.value,
        code: getRunCode(),
        input: els.input.value,
        mode: effectiveMode,
        breakpoints: effectiveMode === "debug" ? breakpointLines : []
      })
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Execution failed.");

    els.output.value = result.output || "";
    setDebuggerOutput(result.debug || result.stderr || "No debug output.");
    const ok = result.status === "success";
    setStatus(labelForStatus(result.status), ok ? "success" : "error");
    els.meta.textContent = `${labelForStatus(result.status)} · ${result.elapsedMs}ms`;
    showDebug(effectiveMode === "debug" || !ok);
  } catch (error) {
    setDebuggerOutput(error.message);
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
  els.cfSubmitBtn.disabled = !enabled;
  els.cfStatusBtn.disabled = !enabled;
}

async function startDebugSession(params) {
  if (debugSession.busy) return;
  debugSession.params = params;
  debugSession.lineOffset = params.lineOffset || 0;
  debugSession.busy = true;
  busy = true;
  setButtons(false);
  setDebugControlsVisible(true);
  setDebugControlsEnabled(false);
  setStatus("Debugging", "idle");
  els.meta.textContent = "Starting debugger...";
  els.dbgStatus.textContent = "Compiling...";
  showDebug(true);
  clearDebugLine();

  try {
    const res = await fetch("/api/debug/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: params.code,
        input: params.input,
        breakpoints: params.breakpoints || []
      })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Could not start the debugger.");
    debugSession.id = result.sessionId || null;
    debugSession.active = result.state === "stopped";
    applyDebugState(result);
  } catch (error) {
    endDebugSession();
    setDebuggerOutput(error.message);
    setStatus("Error", "error");
    els.meta.textContent = "Debugger failed";
    els.dbgStatus.textContent = "";
  } finally {
    debugSession.busy = false;
    busy = false;
    setButtons(true);
    if (debugSession.active) setDebugControlsEnabled(true);
  }
}

async function debugStep(action) {
  if (!debugSession.active || debugSession.busy || !debugSession.id) return;
  debugSession.busy = true;
  setDebugControlsEnabled(false);
  els.dbgStatus.textContent = action === "continue" ? "Running..." : "Stepping...";

  try {
    const res = await fetch("/api/debug/step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: debugSession.id, action })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Debugger step failed.");
    debugSession.active = result.state === "stopped";
    applyDebugState(result);
  } catch (error) {
    endDebugSession();
    setDebuggerOutput(error.message);
    setStatus("Error", "error");
    els.dbgStatus.textContent = "";
  } finally {
    debugSession.busy = false;
    if (debugSession.active) setDebugControlsEnabled(true);
  }
}

async function restartDebugSession() {
  if (debugSession.busy || !debugSession.params) return;
  const params = debugSession.params;
  await stopDebugSession(false);
  await startDebugSession(params);
}

async function stopDebugSession(notifyServer) {
  const sessionId = debugSession.id;
  endDebugSession();
  setStatus("Stopped", "idle");
  els.meta.textContent = "Debug session ended";
  if (notifyServer && sessionId) {
    try {
      await fetch("/api/debug/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
      });
    } catch {
      /* best effort */
    }
  }
}

function endDebugSession() {
  debugSession.id = null;
  debugSession.active = false;
  debugSession.line = null;
  clearDebugLine();
  setDebugControlsEnabled(false);
  setDebugControlsVisible(false);
}

function endDebugSessionOnContextChange() {
  if (!debugSession.id && !debugSession.active) return;
  debugSession.params = null;
  stopDebugSession(true);
}

function applyDebugState(state) {
  if (state.programOutput !== undefined && state.programOutput !== null) {
    els.output.value = state.programOutput;
  }

  if (state.state === "compile_error") {
    endDebugSession();
    setDebuggerOutput(`Compiler diagnostics\n${state.message || "Compilation failed."}`);
    setStatus("Compile error", "error");
    els.meta.textContent = "Compile error";
    els.dbgStatus.textContent = "";
    return;
  }

  if (state.state === "error") {
    endDebugSession();
    setDebuggerOutput(state.message || "Debugger error.");
    setStatus("Error", "error");
    els.dbgStatus.textContent = "";
    return;
  }

  if (state.state === "exited") {
    clearDebugLine();
    debugSession.active = false;
    setDebugControlsEnabled(false);
    const ok = !state.exitStatus;
    setStatus(ok ? "Success" : "Runtime error", ok ? "success" : "error");
    els.meta.textContent = state.message || "Program finished";
    els.dbgStatus.textContent = "Finished";
    setDebuggerOutput(state.message || "Program finished.");
    return;
  }

  // state === "stopped"
  const editorLine = Number.isInteger(state.line)
    ? state.line - (debugSession.lineOffset || 0)
    : null;
  debugSession.line = editorLine;
  highlightDebugLine(editorLine);

  const reason = state.stopReason ? `Stopped: ${state.stopReason}` : "Paused";
  const locationText = editorLine && editorLine > 0
    ? `${reason}\nLine ${editorLine}`
    : reason;
  const debuggerText = [
    locationText,
    "",
    "Variables",
    state.locals || "No local variables in this frame."
  ].join("\n");
  els.debug.textContent = debuggerText;
  els.callStack.textContent = remapStackLines(state.callStack || "");

  setStatus("Paused", "idle");
  els.meta.textContent = editorLine && editorLine > 0 ? `Paused at line ${editorLine}` : "Paused";
  els.dbgStatus.textContent = editorLine && editorLine > 0 ? `Line ${editorLine}` : "Paused";
}

function remapStackLines(stack) {
  const offset = debugSession.lineOffset || 0;
  if (!offset) return stack;
  return String(stack).replace(/main\.cpp:(\d+)/g, (match, line) => {
    const mapped = Number(line) - offset;
    return mapped > 0 ? `main.cpp:${mapped}` : match;
  });
}

function highlightDebugLine(editorLine) {
  clearDebugLine();
  if (!codeEditor || !Number.isInteger(editorLine) || editorLine <= 0) return;
  const lineIndex = editorLine - 1;
  if (lineIndex >= codeEditor.lineCount()) return;
  codeEditor.addLineClass(lineIndex, "background", "debug-current-line");
  codeEditor.addLineClass(lineIndex, "gutter", "debug-current-line-number");
  codeEditor.scrollIntoView({ line: lineIndex, ch: 0 }, 80);
}

function clearDebugLine() {
  if (!codeEditor) return;
  for (let i = 0; i < codeEditor.lineCount(); i += 1) {
    codeEditor.removeLineClass(i, "background", "debug-current-line");
    codeEditor.removeLineClass(i, "gutter", "debug-current-line-number");
  }
}

function setDebugControlsVisible(visible) {
  els.debugControls.hidden = !visible;
}

function setDebugControlsEnabled(enabled) {
  els.dbgStepOver.disabled = !enabled;
  els.dbgStepIn.disabled = !enabled;
  els.dbgStepOut.disabled = !enabled;
  els.dbgContinue.disabled = !enabled;
  // Restart and Stop stay usable whenever a session exists.
  const sessionExists = Boolean(debugSession.id);
  els.dbgRestart.disabled = !sessionExists && !debugSession.params;
  els.dbgStop.disabled = !sessionExists;
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
  setDebugPanelVisible(visible);
}

function setDebuggerOutput(text) {
  const { debuggerText, callStackText } = splitDebuggerText(text);
  els.debug.textContent = debuggerText;
  els.callStack.textContent = callStackText;
}

function appendDebuggerOutput(text) {
  const prefix = combinedDebugText();
  setDebuggerOutput([prefix, text].filter(Boolean).join("\n"));
}

function combinedDebugText() {
  return [
    els.debug.textContent,
    els.callStack.textContent ? `Call stack\n${els.callStack.textContent}` : ""
  ].filter(Boolean).join("\n\n");
}

function splitDebuggerText(text) {
  const raw = String(text || "");
  const marker = "\nCall stack\n";
  const markerIndex = raw.indexOf(marker);
  if (markerIndex === -1) {
    return { debuggerText: raw, callStackText: "" };
  }
  return {
    debuggerText: raw.slice(0, markerIndex).trimEnd(),
    callStackText: raw.slice(markerIndex + marker.length).trim()
  };
}

function labelForStatus(status) {
  return {
    success: "Success",
    compile_error: "Compile error",
    runtime_error: "Runtime error",
    timeout: "Timeout"
  }[status] || "Finished";
}
