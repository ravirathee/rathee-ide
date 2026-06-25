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
  foldersSection: document.querySelector("#foldersSection"),
  folderList: document.querySelector("#folderList"),
  addFolderBtn: document.querySelector("#addFolderBtn"),
  addContestBtn: document.querySelector("#addContestBtn"),
  contestSectionLabel: document.querySelector("#contestSectionLabel"),
  folderSectionLabel: document.querySelector("#folderSectionLabel"),
  drawerSectionResize: document.querySelector("#drawerSectionResize"),
  contestSortDropdown: document.querySelector(".contest-sort-dropdown"),
  contestSortBtn: document.querySelector("#contestSortBtn"),
  contestSortMenu: document.querySelector("#contestSortMenu"),
  contestSortItems: Array.from(document.querySelectorAll(".contest-sort-item")),
  folderSortDropdown: document.querySelector(".folder-sort-dropdown"),
  folderSortBtn: document.querySelector("#folderSortBtn"),
  folderSortMenu: document.querySelector("#folderSortMenu"),
  folderSortItems: Array.from(document.querySelectorAll(".folder-sort-item")),
  contestArchiveToggle: document.querySelector("#contestArchiveToggle"),
  contestBinToggle: document.querySelector("#contestBinToggle"),
  folderArchiveToggle: document.querySelector("#folderArchiveToggle"),
  folderBinToggle: document.querySelector("#folderBinToggle"),
  language: document.querySelector("#language"),
  code: document.querySelector("#code"),
  editorDebugPanel: document.querySelector("#editorDebugPanel"),
  debugResizeHandle: document.querySelector("#debugResizeHandle"),
  debugSplitResizeHandle: document.querySelector("#debugSplitResizeHandle"),
  emptyEditorState: document.querySelector("#emptyEditorState"),
  createFirstFileBtn: document.querySelector("#createFirstFileBtn"),
  input: document.querySelector("#input"),
  output: document.querySelector("#output"),
  inputTabs: document.querySelector("#inputTabs"),
  outputTabs: document.querySelector("#outputTabs"),
  expectedOutput: document.querySelector("#expectedOutput"),
  expectedWrap: document.querySelector("#expectedWrap"),
  expectedResizeHandle: document.querySelector("#expectedResizeHandle"),
  expectedPlacementBtn: document.querySelector("#expectedPlacementBtn"),
  outputBody: document.querySelector(".output-body"),
  yourOutputLabel: document.querySelector("#yourOutputLabel"),
  verdictBadge: document.querySelector("#verdictBadge"),
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
  uiZoomRange: document.querySelector("#uiZoomRange"),
  uiZoomValue: document.querySelector("#uiZoomValue"),
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
  openJavaTemplateFileBtn: document.querySelector("#openJavaTemplateFileBtn"),
  codeforcesHandleInput: document.querySelector("#codeforcesHandleInput"),
  editorFontSizeInput: document.querySelector("#editorFontSizeInput"),
  editorFontSelect: document.querySelector("#editorFontSelect"),
  autoCompletionEnabled: document.querySelector("#autoCompletionEnabled"),
  autoCompletionPairs: document.querySelector("#autoCompletionPairs"),
  autoCompletionPlaceholder: document.querySelector("#autoCompletionPlaceholder"),
  autoCompletionRuleList: document.querySelector("#autoCompletionRuleList"),
  autoCompletionCategoryTabs: document.querySelector("#autoCompletionCategoryTabs"),
  autoCompletionSaveBtn: document.querySelector("#autoCompletionSaveBtn"),
  autoCompletionSaveStatus: document.querySelector("#autoCompletionSaveStatus"),
  fontSizeLabel: document.querySelector("#fontSizeLabel"),
  saveTemplateBtn: document.querySelector("#saveTemplateBtn"),
  saveFilesBtn: document.querySelector("#saveFilesBtn"),
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
  pollCountdown: document.querySelector("#pollCountdown"),
  confirmOverlay: document.querySelector("#confirmOverlay"),
  confirmTitle: document.querySelector("#confirmTitle"),
  confirmMessage: document.querySelector("#confirmMessage"),
  confirmOkBtn: document.querySelector("#confirmOkBtn"),
  confirmCancelBtn: document.querySelector("#confirmCancelBtn"),
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
let javaFileNames = [];
let javaFiles = {};
let javaInputs = {};
let javaTabLabels = {};
let javaProblems = {};
let activeJavaFile = "A.java";
let codeFileScope = "workspace";
let activeContestDir = "";
let activeContestId = ""; // Codeforces id of the open contest; DB key for scope='contest' files
let activeFolderId = ""; // id of the open user folder; DB key for scope='folder' files
let savedFolders = []; // [{ folderId, name, files: { cpp: [], python: [], java: [] } }]
let expandedFolderKeys = new Set((() => {
  try { return JSON.parse(localStorage.getItem("rathee.expandedFolders") || "[]"); } catch { return []; }
})());

function saveExpandedFolders() {
  localStorage.setItem("rathee.expandedFolders", JSON.stringify([...expandedFolderKeys]));
}

// Folders whose action icons (sort/import/rename/delete) are revealed via the
// "<" toggle. Transient (resets on reload).
let folderActionsOpen = new Set();
let draggedFolderId = ""; // folder being drag-reordered in the drawer

// Per-file Codeforces sample tests: { [filename]: [{ input, expected }] }, one
// map per language. The custom input stays in the existing *Inputs maps.
let cppSamples = {};
let pySamples = {};
let javaSamples = {};
// Which test tab is selected (0..N-1 = samples, N = Custom). Linked across the
// Input and Output tab strips. Reset to 0 on every file/context switch.
let activeTestIndex = 0;
// Transient results of the last Run for the active file (not persisted):
// { file, results: { [i]: { actual, verdict } }, customActual }.
let testRun = { file: "", results: {}, customActual: null };
// Files currently open as tabs in the editor (a subset of the file lists). The
// tab "×" closes a tab (removes it from here); the file itself only goes away
// when deleted from the left drawer. Kept per-language.
let openCppTabs = [];
let openPyTabs = [];
let openJavaTabs = [];
// In-memory snapshots of each context (the temp workspace and each contest),
// keyed "workspace" or "contest:<id>". Lets anonymous sessions hold the temp
// files AND a contest open at once (no backend), switching without losing edits.
const contextSnapshots = new Map();
// Inline SVG icons for the drawer file-row actions (inherit color via currentColor).
const ICON_RENAME = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';
const ICON_DELETE = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
const ICON_IMPORT = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';
const ICON_ARCHIVE = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12h4"/></svg>';
const ICON_RESTORE = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';
// Names of the temporary workspace files, cached separately so the "Temporary
// Code Files" list stays populated even while a contest is the active scope.
let tempCppNames = [];
let tempPyNames = [];
let tempJavaNames = [];
let pythonCode = "";
let javaCode = "";
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

// Section views: Active / Archived / Bin, per section, persisted.
const SECTION_VIEWS = ["active", "archived", "bin"];
const VIEW_STATE = { active: "active", archived: "archived", bin: "deleted" };
let contestView = SECTION_VIEWS.includes(localStorage.getItem("rathee.contestView")) ? localStorage.getItem("rathee.contestView") : "active";
let folderView = SECTION_VIEWS.includes(localStorage.getItem("rathee.folderView")) ? localStorage.getItem("rathee.folderView") : "active";

// Folder sort (alphabetical default) + per-folder file sort + file timestamps.
const folderSortModes = ["alpha", "created", "edited"];
let folderFileSort = (() => {
  try { return JSON.parse(localStorage.getItem("rathee.folderFileSort") || "{}") || {}; } catch { return {}; }
})();
// { `${folderId}|${language}|${filename}`: { created: ms, updated: ms } }
let folderFileMeta = {};
// Codeforces verdicts: `${contestId}|${index}` -> { verdict }. Persisted to the
// account settings (DB) and mirrored to localStorage so they show from storage
// on load instead of being re-fetched every time.
let problemVerdicts = (() => {
  try { return JSON.parse(localStorage.getItem("rathee.problemVerdicts") || "{}") || {}; } catch { return {}; }
})();

function saveProblemVerdicts() {
  try { localStorage.setItem("rathee.problemVerdicts", JSON.stringify(problemVerdicts)); } catch { /* quota */ }
  scheduleAppSettingsSave();
}
const SORT_LABEL = { alpha: "Alphabetical", created: "Recently created", edited: "Recently edited" };

let tempFilesExpanded = true; // Temporary Code Files start expanded on load
let codeforcesHandle = localStorage.getItem("rathee.codeforcesHandle") || "mr_awesomeravi";
let editorFontSize = Number(localStorage.getItem("forge.editorFontSize") || 15);
let editorFontFamily = localStorage.getItem("rathee.editorFontFamily")
  || "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace";
const APPEARANCE_MODES = ["light", "dark"];
const APPEARANCE_THEMES = ["aurora", "indigo", "sunset", "mono"];
const DEFAULT_AUTO_COMPLETION_RULES = {
  for: "for(int i = 0 ; i < ntabtab ; i++){\n\t    tabtab\n\t}tabtab",
  forr: "for(int i = ntabtab - 1 ; i >= 0 ; i--){\n\t    tabtab\n\t}tabtab",
  rep: "for(int i = 0 ; i < tabtab ; i++){\n\t    tabtab\n\t}tabtab",
  while: "while(tabtab){\n\t    tabtab\n\t}tabtab",
  dowhile: "do{\n\t    tabtab\n\t}while(tabtab);tabtab",
  foreach: "for(auto &tabtab : tabtab){\n\t    tabtab\n\t}tabtab",
  cout: "cout << tabtab << \"\\n\";tabtab",
  cin: "cin >> tabtab >> \"\\n\";tabtab",
  vecint: "vector<int> tabtab;tabtab",
  vecll: "vector<long long> tabtab;tabtab",
  vecchar: "vector<char> tabtab;tabtab",
  vecstr: "vector<string> tabtab;tabtab",
  vecbool: "vector<bool> tabtab;tabtab",
  vecvecint: "vector<vector<int>> tabtab;tabtab",
  vecvecll: "vector<vector<long long>> tabtab;tabtab",
  setint: "set<int> tabtab;tabtab",
  setll: "set<long long> tabtab;tabtab",
  msetint: "multiset<int> tabtab;tabtab",
  pairint: "pair<int, int> tabtab;tabtab",
  pairll: "pair<long long, long long> tabtab;tabtab",
  vecpair: "vector<pair<int, int>> tabtab;tabtab",
  vecpairll: "vector<pair<long long, long long>> tabtab;tabtab",
  mapintint: "map<int, int> tabtab;tabtab",
  mapstrint: "map<string, int> tabtab;tabtab",
  umapintint: "unordered_map<int, int> tabtab;tabtab",
  "umap<int,char>": "unordered_map<int, char> tabtab;tabtab",
  usetint: "unordered_set<int> tabtab;tabtab",
  pqint: "priority_queue<int> tabtab;tabtab",
  minpqint: "priority_queue<int, vector<int>, greater<int>> tabtab;tabtab",
  queueint: "queue<int> tabtab;tabtab",
  stackint: "stack<int> tabtab;tabtab",
  dequeint: "deque<int> tabtab;tabtab",
  sortv: "sort(tabtab.begin(), tabtab.end());tabtab",
  rsortv: "sort(tabtab.rbegin(), tabtab.rend());tabtab",
  revv: "reverse(tabtab.begin(), tabtab.end());tabtab",
  lb: "lower_bound(tabtab.begin(), tabtab.end(), tabtab)tabtab",
  ub: "upper_bound(tabtab.begin(), tabtab.end(), tabtab)tabtab",
  all: "begin(tabtab), end(tabtab)",
  acc: "accumulate(tabtab.begin(), tabtab.end(), 0LL)tabtab",
  minel: "*min_element(tabtab.begin(), tabtab.end())tabtab",
  maxel: "*max_element(tabtab.begin(), tabtab.end())tabtab",
  adj: "vector<vector<int>> adj(tabtab);tabtab",
  edgeu: "adj[u].push_back(v);\nadj[v].push_back(u);tabtab",
  vis: "vector<int> vis(tabtab, 0);tabtab",
  bfs: "queue<int> q;\nq.push(tabtab);\nvis[tabtab] = 1;\nwhile(!q.empty()){\n\t    int node = q.front();\n\t    q.pop();\n\t    tabtab\n\t}tabtab",
  dfs: "auto dfs = [&](auto &&self, int node, int parent) -> void {\n\t    tabtab\n\t};\ndfs(dfs, tabtab, -1);tabtab",
  dsu: "vector<int> parent(tabtab), sz(tabtab, 1);\niota(parent.begin(), parent.end(), 0);\nauto find = [&](auto &&self, int x) -> int {\n\t    return parent[x] == x ? x : parent[x] = self(self, parent[x]);\n};\nauto unite = [&](int a, int b) -> bool {\n\t    a = find(find, a), b = find(find, b);\n\t    if(a == b) return false;\n\t    if(sz[a] < sz[b]) swap(a, b);\n\t    parent[b] = a;\n\t    sz[a] += sz[b];\n\t    return true;\n};tabtab",
  dp: "vector<int> dp(tabtab, tabtab);tabtab",
  dpll: "vector<long long> dp(tabtab, tabtab);tabtab",
  dp2: "vector<vector<int>> dp(tabtab, vector<int>(tabtab, tabtab));tabtab",
  dp2ll: "vector<vector<long long>> dp(tabtab, vector<long long>(tabtab, tabtab));tabtab",
  memo: "map<tabtab, tabtab> memo;tabtab",
  gcd: "gcd(tabtab, tabtab)tabtab",
  lcm: "(tabtab / gcd(tabtab, tabtab) * tabtab)tabtab",
  mod: "const long long MOD = 1000000007LL;tabtab",
  modpow: "auto modpow = [&](long long a, long long e, long long mod) {\n\t    long long res = 1;\n\t    while(e){\n\t        if(e & 1) res = res * a % mod;\n\t        a = a * a % mod;\n\t        e >>= 1;\n\t    }\n\t    return res;\n};tabtab",
  sieve: "vector<int> prime(tabtab + 1, 1);\nprime[0] = prime[1] = 0;\nfor(int i = 2 ; i * i <= tabtab ; i++){\n\t    if(prime[i]){\n\t        for(int j = i * i ; j <= tabtab ; j += i) prime[j] = 0;\n\t    }\n\t}tabtab",
  str: "string tabtab;tabtab",
  freq26: "vector<int> freq(26, 0);\nfor(char c : tabtab) freq[c - 'a']++;tabtab",
  sortstr: "sort(tabtab.begin(), tabtab.end());tabtab",
  revstr: "reverse(tabtab.begin(), tabtab.end());tabtab",
  substr: "tabtab.substr(tabtab, tabtab)tabtab",
  cerr: "cerr << \"tabtab = \" << tabtab << \"\\n\";tabtab",
  dbgvec: "for(auto x : tabtab) cerr << x << ' ';\ncerr << \"\\n\";tabtab",
  dbgpair: "cerr << tabtab.first << ' ' << tabtab.second << \"\\n\";tabtab",
  fastio: "ios::sync_with_stdio(false);\ncin.tie(nullptr);tabtab",
  testcase: "int T;\ncin >> T;\nwhile(T--){\n\t    tabtab\n\t}tabtab",
  solvefn: "void solve(){\n\t    tabtab\n\t}tabtab"
};
const DEFAULT_PYTHON_AUTO_COMPLETION_RULES = {
  listint: "arr = list(map(int, input().split()))tabtab",
  liststr: "arr = input().split()tabtab",
  listn: "arr = [tabtab for _ in range(tabtab)]tabtab",
  matint: "grid = [list(map(int, input().split())) for _ in range(tabtab)]tabtab",
  setv: "seen = set()tabtab",
  dictv: "mp = {}tabtab",
  defdict: "from collections import defaultdict\nmp = defaultdict(int)tabtab",
  dequev: "from collections import deque\nq = deque()tabtab",
  heapv: "import heapq\nheap = []tabtab",
  tuplev: "pair = (tabtab, tabtab)tabtab",
  inp: "input()tabtab",
  inint: "n = int(input())tabtab",
  insplit: "a, b = map(int, input().split())tabtab",
  printv: "print(tabtab)tabtab",
  printarr: "print(*tabtab)tabtab",
  fastin: "import sys\ninput = sys.stdin.readlinetabtab",
  for: "for i in range(tabtab):\n\t    tabtab\ntabtab",
  forn: "for i in range(n):\n\t    tabtab\ntabtab",
  forr: "for i in range(tabtab - 1, -1, -1):\n\t    tabtab\ntabtab",
  while: "while tabtab:\n\t    tabtab\ntabtab",
  foreach: "for x in tabtab:\n\t    tabtab\ntabtab",
  sortv: "tabtab.sort()tabtab",
  rsortv: "tabtab.sort(reverse=True)tabtab",
  revv: "tabtab.reverse()tabtab",
  bisl: "bisect_left(tabtab, tabtab)tabtab",
  bisr: "bisect_right(tabtab, tabtab)tabtab",
  sumv: "sum(tabtab)tabtab",
  minv: "min(tabtab)tabtab",
  maxv: "max(tabtab)tabtab",
  adj: "adj = [[] for _ in range(tabtab)]tabtab",
  edgeu: "adj[u].append(v)\nadj[v].append(u)tabtab",
  vis: "vis = [False] * tabtab",
  bfs: "from collections import deque\nq = deque([tabtab])\nvis[tabtab] = True\nwhile q:\n\t    node = q.popleft()\n\t    tabtab\ntabtab",
  dfs: "def dfs(node, parent):\n\t    tabtab\ndfs(tabtab, -1)tabtab",
  dsu: "parent = list(range(tabtab))\nsize = [1] * tabtab\n\ndef find(x):\n\t    while parent[x] != x:\n\t        parent[x] = parent[parent[x]]\n\t        x = parent[x]\n\t    return x\n\ndef unite(a, b):\n\t    a, b = find(a), find(b)\n\t    if a == b:\n\t        return False\n\t    if size[a] < size[b]:\n\t        a, b = b, a\n\t    parent[b] = a\n\t    size[a] += size[b]\n\t    return True\ntabtab",
  dp: "dp = [tabtab] * tabtab",
  dp2: "dp = [[tabtab] * tabtab for _ in range(tabtab)]tabtab",
  memo: "from functools import lru_cache\n\n@lru_cache(None)\ndef solve(tabtab):\n\t    tabtab\ntabtab",
  gcd: "math.gcd(tabtab, tabtab)tabtab",
  mod: "MOD = 10**9 + 7tabtab",
  powmod: "pow(tabtab, tabtab, MOD)tabtab",
  sieve: "prime = [True] * (tabtab + 1)\nprime[0] = prime[1] = False\nfor i in range(2, int(tabtab ** 0.5) + 1):\n\t    if prime[i]:\n\t        for j in range(i * i, tabtab + 1, i):\n\t            prime[j] = False\ntabtab",
  strv: "s = input().strip()tabtab",
  freq: "from collections import Counter\nfreq = Counter(tabtab)tabtab",
  sortstr: "s = ''.join(sorted(s))tabtab",
  revstr: "s = s[::-1]tabtab",
  debug: "print(tabtab, file=sys.stderr)tabtab",
  main: "def solve():\n\t    tabtab\n\nif __name__ == \"__main__\":\n\t    solve()tabtab",
  testcase: "t = int(input())\nfor _ in range(t):\n\t    tabtab\ntabtab"
};
const AUTO_COMPLETION_CATEGORIES = {
  initialisation: [
    "vecint", "vecll", "vecchar", "vecstr", "vecbool", "vecvecint", "vecvecll",
    "setint", "setll", "msetint", "pairint", "pairll", "vecpair", "vecpairll",
    "mapintint", "mapstrint", "umapintint", "umap<int,char>", "usetint",
    "pqint", "minpqint", "queueint", "stackint", "dequeint"
  ],
  io: ["cout", "cin", "fastio"],
  loops: ["for", "forr", "rep", "while", "dowhile", "foreach"],
  algorithms: ["sortv", "rsortv", "revv", "lb", "ub", "all", "acc", "minel", "maxel"],
  graph: ["adj", "edgeu", "vis", "bfs", "dfs", "dsu"],
  dp: ["dp", "dpll", "dp2", "dp2ll", "memo"],
  math: ["gcd", "lcm", "mod", "modpow", "sieve"],
  strings: ["str", "freq26", "sortstr", "revstr", "substr"],
  debug: ["cerr", "dbgvec", "dbgpair"],
  templates: ["testcase", "solvefn"],
  custom: []
};
const PYTHON_AUTO_COMPLETION_CATEGORIES = {
  initialisation: ["listint", "liststr", "listn", "matint", "setv", "dictv", "defdict", "dequev", "heapv", "tuplev"],
  io: ["inp", "inint", "insplit", "printv", "printarr", "fastin"],
  loops: ["for", "forn", "forr", "while", "foreach"],
  algorithms: ["sortv", "rsortv", "revv", "bisl", "bisr", "sumv", "minv", "maxv"],
  graph: ["adj", "edgeu", "vis", "bfs", "dfs", "dsu"],
  dp: ["dp", "dp2", "memo"],
  math: ["gcd", "mod", "powmod", "sieve"],
  strings: ["strv", "freq", "sortstr", "revstr"],
  debug: ["debug"],
  templates: ["main", "testcase"],
  custom: []
};
const DEFAULT_JAVA_AUTO_COMPLETION_RULES = {};
const JAVA_AUTO_COMPLETION_CATEGORIES = {
  initialisation: [],
  io: [],
  loops: [],
  algorithms: [],
  graph: [],
  dp: [],
  math: [],
  strings: [],
  debug: [],
  templates: [],
  custom: []
};
const AUTO_COMPLETION_DEFAULT_TABS = [
  { id: "initialisation", label: "Initialisation", builtin: true },
  { id: "io", label: "I/O", builtin: true },
  { id: "loops", label: "Loops", builtin: true },
  { id: "algorithms", label: "Algorithms", builtin: true },
  { id: "graph", label: "Graph", builtin: true },
  { id: "dp", label: "DP", builtin: true },
  { id: "math", label: "Math", builtin: true },
  { id: "strings", label: "Strings", builtin: true },
  { id: "debug", label: "Debug", builtin: true },
  { id: "templates", label: "Templates", builtin: true },
  { id: "custom", label: "Custom", builtin: true }
];
const AUTO_COMPLETION_DEFAULT_RULES_VERSION = 4;
const DEFAULT_AUTO_COMPLETION = {
  enabled: true,
  pairs: true,
  placeholder: "tabtab",
  defaultRulesVersion: AUTO_COMPLETION_DEFAULT_RULES_VERSION,
  tabs: AUTO_COMPLETION_DEFAULT_TABS,
  categories: AUTO_COMPLETION_CATEGORIES,
  rules: DEFAULT_AUTO_COMPLETION_RULES,
  languageCategories: {
    cpp: AUTO_COMPLETION_CATEGORIES,
    python: PYTHON_AUTO_COMPLETION_CATEGORIES,
    java: JAVA_AUTO_COMPLETION_CATEGORIES
  },
  disabledTabs: {
    cpp: {},
    python: {},
    java: {}
  },
  languageRules: {
    cpp: DEFAULT_AUTO_COMPLETION_RULES,
    python: DEFAULT_PYTHON_AUTO_COMPLETION_RULES,
    java: DEFAULT_JAVA_AUTO_COMPLETION_RULES
  }
};
let appearanceMode = APPEARANCE_MODES.includes(localStorage.getItem("rathee.appearanceMode"))
  ? localStorage.getItem("rathee.appearanceMode")
  : "dark";
let appearanceTheme = APPEARANCE_THEMES.includes(localStorage.getItem("rathee.appearanceTheme"))
  ? localStorage.getItem("rathee.appearanceTheme")
  : "aurora";
let uiZoom = clampZoom(Number(localStorage.getItem("rathee.uiZoom")) || 0.9);
let codeEditor = null;
let settingEditorValue = false;
let codeSaveTimer = null;
let testsSaveTimer = null;
let currentLanguage = document.querySelector("#language").value;
let editorQuickSettingsOpen = false;
let settingsSaveTimer = null;
let settingsSavePending = false;
let autoCompletion = normalizeAutoCompletionSettings(DEFAULT_AUTO_COMPLETION);
let autoCompletionDirty = false;
const autoCompletionDeletedTriggers = new Set();
let currentSettingsTab = "profile";
let autoCompletionTriggerWidth = Number(localStorage.getItem("rathee.autoCompletionTriggerWidth") || 132);
let activeAutoCompletionCategory = localStorage.getItem("rathee.autoCompletionCategory") || "initialisation";
let snippetSession = null;
let lastSnippetExpansion = null;
const breakpointsByFile = {};
const LANGUAGE_CONFIG = {
  cpp: {
    label: "C++",
    optionLabel: "C++20",
    extension: ".cpp",
    defaultFile: "A.cpp",
    templateView: "template",
    templateFile: "Template.cpp"
  },
  python: {
    label: "Python",
    optionLabel: "Python 3",
    extension: ".py",
    defaultFile: "A.py",
    templateView: "python-template",
    templateFile: "Template.py"
  },
  java: {
    label: "Java",
    optionLabel: "Java 21",
    extension: ".java",
    defaultFile: "A.java",
    templateView: "java-template",
    templateFile: "Template.java"
  }
};
const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CONFIG);
const DEFAULT_SIDE_WIDTH = 22;
const LAYOUT_SETTINGS_VERSION = 2;
// Stable per-browser id so the server scopes "stop my previous debug session"
// to this client and doesn't disturb other users.
const debugClientId = (() => {
  let id = localStorage.getItem("rathee.clientId");
  if (!id) {
    id = (crypto.randomUUID && crypto.randomUUID()) || `c-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    localStorage.setItem("rathee.clientId", id);
  }
  return id;
})();
function initialSideWidth() {
  const layoutVersion = Number(localStorage.getItem("rathee.layoutVersion") || 0);
  if (layoutVersion >= LAYOUT_SETTINGS_VERSION) {
    const saved = Number(localStorage.getItem("rathee.sideWidth"));
    if (Number.isFinite(saved)) return saved;
  }
  return DEFAULT_SIDE_WIDTH;
}
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
  sideWidth: initialSideWidth(),
  inputHeight: Number(localStorage.getItem("rathee.inputHeight") || 45),
  showDebug: localStorage.getItem("rathee.showDebug") === "true",
  debugHeight: Number(localStorage.getItem("rathee.debugHeight") || 28),
  debugStackWidth: Number(localStorage.getItem("rathee.debugStackWidth") || 36),
  expectedHeight: Number(localStorage.getItem("rathee.expectedHeight") || 40),
  expectedSide: localStorage.getItem("rathee.expectedSide") === "right" ? "right" : "bottom"
};

loadAppSettings().finally(boot);

async function loadAppSettings() {
  // No global settings fetch: signed-in users load their settings from their
  // account (see initAuth); anonymous sessions use local defaults and persist
  // nothing. Local device prefs (theme/zoom/font) still come from localStorage.
  return;
}

function applyAppSettings(settings) {
  if (settings.recentContest !== undefined) recentContest = settings.recentContest || null;
  if (typeof settings.codeforcesHandle === "string") codeforcesHandle = settings.codeforcesHandle;
  if (Number.isFinite(Number(settings.editorFontSize))) editorFontSize = Number(settings.editorFontSize);
  if (typeof settings.editorFontFamily === "string") editorFontFamily = settings.editorFontFamily;
  if (typeof settings.language === "string" && SUPPORTED_LANGUAGES.includes(settings.language)) {
    els.language.value = settings.language;
    currentLanguage = settings.language;
  }

  const appearance = settings.appearance || {};
  if (APPEARANCE_MODES.includes(appearance.mode)) appearanceMode = appearance.mode;
  if (APPEARANCE_THEMES.includes(appearance.theme)) appearanceTheme = appearance.theme;
  if (Number.isFinite(Number(appearance.zoom))) uiZoom = clampZoom(Number(appearance.zoom));
  if (settings.autoCompletion !== undefined) {
    autoCompletion = normalizeAutoCompletionSettings(settings.autoCompletion);
  }
  if (settings.problemVerdicts && typeof settings.problemVerdicts === "object") {
    problemVerdicts = { ...problemVerdicts, ...settings.problemVerdicts };
  }

  const layout = settings.layout || {};
  if (Number.isFinite(Number(layout.drawerWidth))) layoutState.drawerWidth = Number(layout.drawerWidth);
  if (["left", "right"].includes(layout.codeSide)) layoutState.codeSide = layout.codeSide;
  if (typeof layout.showInput === "boolean") layoutState.showInput = layout.showInput;
  if (typeof layout.showOutput === "boolean") layoutState.showOutput = layout.showOutput;
  if (Number.isFinite(Number(layout.sideWidth))) {
    layoutState.sideWidth = Number(layout.layoutVersion || 0) >= LAYOUT_SETTINGS_VERSION
      ? Number(layout.sideWidth)
      : DEFAULT_SIDE_WIDTH;
  }
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
      theme: appearanceTheme,
      zoom: uiZoom
    },
    autoCompletion,
    problemVerdicts,
    layout: {
      layoutVersion: LAYOUT_SETTINGS_VERSION,
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
  const sourceDefaultRulesVersion = Number(source.defaultRulesVersion) || 0;
  const sourceTabs = Array.isArray(source.tabs) ? source.tabs : [];
  const tabsById = new Map();
  AUTO_COMPLETION_DEFAULT_TABS.forEach((tab) => tabsById.set(tab.id, { ...tab, builtin: true }));
  sourceTabs.forEach((tab) => {
    const id = String(tab?.id || "").trim();
    const label = String(tab?.label || "").trim();
    if (!id || !label || /\s/.test(id)) return;
    const builtin = Boolean(AUTO_COMPLETION_CATEGORIES[id]);
    tabsById.set(id, { id, label, builtin });
  });
  const tabs = Array.from(tabsById.values()).sort((a, b) => {
    const ai = AUTO_COMPLETION_DEFAULT_TABS.findIndex((tab) => tab.id === a.id);
    const bi = AUTO_COMPLETION_DEFAULT_TABS.findIndex((tab) => tab.id === b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });
  const sourceLanguageRules = source.languageRules && typeof source.languageRules === "object" && !Array.isArray(source.languageRules)
    ? source.languageRules
    : {};
  const sourceLanguageCategories = source.languageCategories && typeof source.languageCategories === "object" && !Array.isArray(source.languageCategories)
    ? source.languageCategories
    : {};
  const sourceDisabledTabs = source.disabledTabs && typeof source.disabledTabs === "object" && !Array.isArray(source.disabledTabs)
    ? source.disabledTabs
    : {};
  const seedDefaults = sourceDefaultRulesVersion < AUTO_COMPLETION_DEFAULT_RULES_VERSION;

  const normalizeRuleMap = (defaultRules, sourceRules) => {
    const out = seedDefaults ? { ...defaultRules } : {};
    const rulesSource = sourceRules && typeof sourceRules === "object" && !Array.isArray(sourceRules)
      ? sourceRules
      : {};
    Object.entries(rulesSource).forEach(([trigger, template]) => {
      const cleanTrigger = String(trigger || "").trim();
      const cleanTemplate = String(template ?? "");
      if (!cleanTrigger || /\s/.test(cleanTrigger) || !cleanTemplate.trim()) return;
      out[cleanTrigger] = cleanTemplate;
    });
    return out;
  };

  const languageRules = {
    cpp: normalizeRuleMap(DEFAULT_AUTO_COMPLETION_RULES, sourceLanguageRules.cpp || source.rules),
    python: normalizeRuleMap(DEFAULT_PYTHON_AUTO_COMPLETION_RULES, sourceLanguageRules.python),
    java: normalizeRuleMap(DEFAULT_JAVA_AUTO_COMPLETION_RULES, sourceLanguageRules.java)
  };

  const normalizeCategoryMap = (language, defaultCategories, rules) => {
    const sourceCategories = sourceLanguageCategories[language]
      && typeof sourceLanguageCategories[language] === "object"
      && !Array.isArray(sourceLanguageCategories[language])
      ? sourceLanguageCategories[language]
      : language === "cpp" && source.categories && typeof source.categories === "object" && !Array.isArray(source.categories)
        ? source.categories
        : {};
    const categories = {};
    tabs.forEach((tab) => {
      const category = tab.id;
      const baseTriggers = seedDefaults ? (defaultCategories[category] || []) : [];
      const sourceTriggers = seedDefaults
        ? []
        : Array.isArray(sourceCategories[category]) ? sourceCategories[category] : [];
      categories[category] = Array.from(new Set([...baseTriggers, ...sourceTriggers]
        .map((trigger) => String(trigger || "").trim())
        .filter((trigger) => trigger && Object.prototype.hasOwnProperty.call(rules, trigger))));
    });
    const categorizedTriggers = new Set(Object.values(categories).flat());
    Object.keys(rules).forEach((trigger) => {
      if (!categorizedTriggers.has(trigger)) categories.custom.push(trigger);
    });
    return categories;
  };

  const languageCategories = {
    cpp: normalizeCategoryMap("cpp", AUTO_COMPLETION_CATEGORIES, languageRules.cpp),
    python: normalizeCategoryMap("python", PYTHON_AUTO_COMPLETION_CATEGORIES, languageRules.python),
    java: normalizeCategoryMap("java", JAVA_AUTO_COMPLETION_CATEGORIES, languageRules.java)
  };
  const normalizeDisabledTabs = (language) => {
    const sourceForLanguage = sourceDisabledTabs[language] && typeof sourceDisabledTabs[language] === "object" && !Array.isArray(sourceDisabledTabs[language])
      ? sourceDisabledTabs[language]
      : {};
    const allowed = new Set(tabs.map((tab) => tab.id));
    return Object.fromEntries(Object.entries(sourceForLanguage)
      .filter(([tabId, disabled]) => allowed.has(tabId) && disabled === true));
  };
  const disabledTabs = {
    cpp: normalizeDisabledTabs("cpp"),
    python: normalizeDisabledTabs("python"),
    java: normalizeDisabledTabs("java")
  };

  return {
    enabled: typeof source.enabled === "boolean" ? source.enabled : DEFAULT_AUTO_COMPLETION.enabled,
    pairs: typeof source.pairs === "boolean" ? source.pairs : DEFAULT_AUTO_COMPLETION.pairs,
    placeholder: cleanSnippetPlaceholder(source.placeholder),
    defaultRulesVersion: AUTO_COMPLETION_DEFAULT_RULES_VERSION,
    tabs,
    categories: languageCategories.cpp,
    rules: languageRules.cpp,
    languageCategories,
    disabledTabs,
    languageRules
  };
}

function shouldSeedDefaultAutoCompletion(value) {
  if (!value || typeof value !== "object") return true;
  return (Number(value.defaultRulesVersion) || 0) < AUTO_COMPLETION_DEFAULT_RULES_VERSION;
}

function cleanSnippetPlaceholder(value) {
  const marker = String(value || "").trim();
  return marker || DEFAULT_AUTO_COMPLETION.placeholder;
}

function currentAutoCompletionLanguage() {
  return SUPPORTED_LANGUAGES.includes(els.language?.value) ? els.language.value : "cpp";
}

function currentAutoCompletionRules() {
  const language = currentAutoCompletionLanguage();
  return autoCompletion.languageRules?.[language] || autoCompletion.rules || {};
}

function currentAutoCompletionCategories() {
  const language = currentAutoCompletionLanguage();
  return autoCompletion.languageCategories?.[language] || autoCompletion.categories || {};
}

function currentAutoCompletionDisabledTabs() {
  const language = currentAutoCompletionLanguage();
  return autoCompletion.disabledTabs?.[language] || {};
}

function isAutoCompletionTabDisabled(category = activeAutoCompletionCategory) {
  return Boolean(currentAutoCompletionDisabledTabs()[category]);
}

function currentAutoCompletionTabLabel(category = activeAutoCompletionCategory) {
  return autoCompletion.tabs?.find((tab) => tab.id === category)?.label || category;
}

function currentEnabledAutoCompletionRules() {
  const rules = currentAutoCompletionRules();
  const categories = currentAutoCompletionCategories();
  const disabledTabs = currentAutoCompletionDisabledTabs();
  const allowed = new Set();
  Object.entries(categories).forEach(([category, triggers]) => {
    if (disabledTabs[category]) return;
    (triggers || []).forEach((trigger) => allowed.add(trigger));
  });
  return Object.fromEntries(Object.entries(rules).filter(([trigger]) => allowed.has(trigger)));
}

function withCurrentAutoCompletionRules(rules) {
  const language = currentAutoCompletionLanguage();
  return normalizeAutoCompletionSettings({
    ...autoCompletion,
    languageRules: {
      ...(autoCompletion.languageRules || {}),
      [language]: rules
    },
    ...(language === "cpp" ? { rules } : {})
  });
}

function withCurrentAutoCompletionCategories(categories) {
  const language = currentAutoCompletionLanguage();
  return normalizeAutoCompletionSettings({
    ...autoCompletion,
    languageCategories: {
      ...(autoCompletion.languageCategories || {}),
      [language]: categories
    },
    ...(language === "cpp" ? { categories } : {})
  });
}

function setCurrentAutoCompletionDisabledTabs(disabledTabsForLanguage) {
  const language = currentAutoCompletionLanguage();
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    disabledTabs: {
      ...(autoCompletion.disabledTabs || {}),
      [language]: disabledTabsForLanguage
    }
  });
}

function replaceSnippetMarkerInText(text, previousMarker, nextMarker) {
  const source = String(text ?? "");
  if (!previousMarker || previousMarker === nextMarker) return source;
  return source.split(previousMarker).join(nextMarker);
}

function renderAutoCompletionSettings() {
  if (!els.autoCompletionEnabled || !els.autoCompletionRuleList) return;
  const categories = currentAutoCompletionCategories();
  const rules = currentAutoCompletionRules();
  activeAutoCompletionCategory = categories?.[activeAutoCompletionCategory]
    ? activeAutoCompletionCategory
    : "initialisation";
  applyAutoCompletionRuleLayout();
  els.autoCompletionEnabled.checked = Boolean(autoCompletion.enabled);
  if (els.autoCompletionPairs) els.autoCompletionPairs.checked = Boolean(autoCompletion.pairs);
  if (els.autoCompletionPlaceholder) els.autoCompletionPlaceholder.value = autoCompletion.placeholder;
  renderAutoCompletionCategoryTabs();
  updateAutoCompletionSaveUi();
  els.autoCompletionRuleList.innerHTML = "";

  const visibleTriggers = categories?.[activeAutoCompletionCategory] || [];
  const entries = visibleTriggers
    .filter((trigger) => Object.prototype.hasOwnProperty.call(rules, trigger))
    .map((trigger) => [trigger, rules[trigger]]);
  entries.forEach(([trigger, template]) => {
    els.autoCompletionRuleList.append(createAutoCompletionRuleRow({ trigger, template }));
  });
  els.autoCompletionRuleList.append(createAutoCompletionRuleRow({ isDraft: true }));
  els.autoCompletionRuleList.append(createAutoCompletionTabFooter());
}

function createAutoCompletionTabFooter() {
  const row = document.createElement("div");
  row.className = "autocomplete-tab-footer";

  const label = document.createElement("span");
  label.className = "autocomplete-tab-footer-label";
  label.textContent = `${currentAutoCompletionTabLabel()} autocomplete`;

  const toggle = document.createElement("label");
  toggle.className = "setting-toggle autocomplete-tab-toggle";
  toggle.title = `Pause or resume autocomplete for ${currentAutoCompletionTabLabel()}`;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = !isAutoCompletionTabDisabled();
  input.setAttribute("aria-label", `Enable ${currentAutoCompletionTabLabel()} autocomplete`);
  input.addEventListener("change", () => setAutoCompletionTabEnabled(activeAutoCompletionCategory, input.checked));

  const slider = document.createElement("span");
  slider.className = "toggle-slider";
  slider.setAttribute("aria-hidden", "true");

  toggle.append(input, slider);
  row.append(label, toggle);
  return row;
}

function renderAutoCompletionCategoryTabs() {
  if (!els.autoCompletionCategoryTabs) return;
  els.autoCompletionCategoryTabs.innerHTML = "";
  (autoCompletion.tabs || []).forEach((category) => {
    const tab = document.createElement("button");
    tab.className = "autocomplete-category-tab";
    tab.type = "button";
    tab.role = "tab";
    tab.dataset.autocompleteCategory = category.id;
    tab.textContent = category.label;
    const isActive = tab.dataset.autocompleteCategory === activeAutoCompletionCategory;
    tab.classList.toggle("active", isActive);
    tab.classList.toggle("is-paused", Boolean(currentAutoCompletionDisabledTabs()[category.id]));
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    if (!category.builtin) {
      tab.classList.add("has-delete");
      const del = document.createElement("span");
      del.className = "autocomplete-category-tab-delete";
      del.dataset.deleteCategory = category.id;
      del.title = `Delete ${category.label} tab`;
      del.setAttribute("aria-label", `Delete ${category.label} tab`);
      del.textContent = "×";
      tab.append(del);
    }
    els.autoCompletionCategoryTabs.append(tab);
  });
  const add = document.createElement("button");
  add.className = "autocomplete-category-tab autocomplete-category-add";
  add.type = "button";
  add.title = "Add custom tab";
  add.setAttribute("aria-label", "Add custom tab");
  add.textContent = "+";
  els.autoCompletionCategoryTabs.append(add);
}

function setAutoCompletionCategory(category) {
  if (!currentAutoCompletionCategories()?.[category]) return;
  activeAutoCompletionCategory = category;
  localStorage.setItem("rathee.autoCompletionCategory", category);
  renderAutoCompletionSettings();
}

function setAutoCompletionTabEnabled(category, enabled) {
  if (!currentAutoCompletionCategories()?.[category]) return;
  const disabledTabs = { ...currentAutoCompletionDisabledTabs() };
  if (enabled) delete disabledTabs[category];
  else disabledTabs[category] = true;
  setCurrentAutoCompletionDisabledTabs(disabledTabs);
  renderAutoCompletionSettings();
  markAutoCompletionDirty();
}

function createAutoCompletionCustomTab() {
  const label = String(window.prompt("Tab name") || "").trim();
  if (!label) return;
  const base = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "custom";
  const existing = new Set((autoCompletion.tabs || []).map((tab) => tab.id));
  let id = `custom-${base}`;
  let suffix = 2;
  while (existing.has(id)) {
    id = `custom-${base}-${suffix}`;
    suffix += 1;
  }
  const tabs = [...(autoCompletion.tabs || []), { id, label, builtin: false }];
  const languageCategories = {
    cpp: { ...(autoCompletion.languageCategories?.cpp || autoCompletion.categories || {}), [id]: [] },
    python: { ...(autoCompletion.languageCategories?.python || {}), [id]: [] },
    java: { ...(autoCompletion.languageCategories?.java || {}), [id]: [] }
  };
  const disabledTabs = {
    cpp: { ...(autoCompletion.disabledTabs?.cpp || {}) },
    python: { ...(autoCompletion.disabledTabs?.python || {}) },
    java: { ...(autoCompletion.disabledTabs?.java || {}) }
  };
  autoCompletion = normalizeAutoCompletionSettings({ ...autoCompletion, tabs, languageCategories, disabledTabs });
  activeAutoCompletionCategory = id;
  localStorage.setItem("rathee.autoCompletionCategory", id);
  renderAutoCompletionSettings();
  markAutoCompletionDirty();
}

function deleteAutoCompletionCustomTab(category) {
  const tab = (autoCompletion.tabs || []).find((entry) => entry.id === category);
  if (!tab || tab.builtin) return;
  const languages = ["cpp", "python", "java"];
  const triggersByLanguage = {};
  let totalRules = 0;
  languages.forEach((language) => {
    const triggers = (autoCompletion.languageCategories?.[language] || {})[category] || [];
    triggersByLanguage[language] = triggers;
    totalRules += triggers.length;
  });
  const message = totalRules > 0
    ? `Delete tab "${tab.label}" and its ${totalRules} rule${totalRules === 1 ? "" : "s"}?`
    : `Delete tab "${tab.label}"?`;
  if (!window.confirm(message)) return;

  const currentLanguage = currentAutoCompletionLanguage();
  const languageRules = {};
  const languageCategories = {};
  const disabledTabs = {};
  languages.forEach((language) => {
    const rules = { ...(autoCompletion.languageRules?.[language] || {}) };
    const categories = { ...(autoCompletion.languageCategories?.[language] || {}) };
    triggersByLanguage[language].forEach((trigger) => {
      delete rules[trigger];
      if (language === currentLanguage) autoCompletionDeletedTriggers.add(trigger);
    });
    delete categories[category];
    languageRules[language] = rules;
    languageCategories[language] = categories;
    const disabled = { ...(autoCompletion.disabledTabs?.[language] || {}) };
    delete disabled[category];
    disabledTabs[language] = disabled;
  });
  const tabs = (autoCompletion.tabs || []).filter((entry) => entry.id !== category);
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    tabs,
    languageRules,
    languageCategories,
    categories: languageCategories.cpp,
    rules: languageRules.cpp,
    disabledTabs
  });
  if (activeAutoCompletionCategory === category) {
    activeAutoCompletionCategory = autoCompletion.tabs[0]?.id || "initialisation";
    localStorage.setItem("rathee.autoCompletionCategory", activeAutoCompletionCategory);
  }
  renderAutoCompletionSettings();
  markAutoCompletionDirty();
}

function addAutoCompletionRuleToCategory(trigger, category = activeAutoCompletionCategory) {
  if (!currentAutoCompletionCategories()?.[category]) return;
  const categories = { ...currentAutoCompletionCategories() };
  const triggers = new Set(categories[category] || []);
  triggers.add(trigger);
  categories[category] = Array.from(triggers);
  autoCompletion = withCurrentAutoCompletionCategories(categories);
}

function replaceAutoCompletionRuleInCategories(previousTrigger, nextTrigger) {
  const categories = {};
  Object.entries(currentAutoCompletionCategories() || {}).forEach(([category, triggers]) => {
    categories[category] = Array.from(new Set((triggers || []).map((trigger) => (
      trigger === previousTrigger ? nextTrigger : trigger
    ))));
  });
  autoCompletion = withCurrentAutoCompletionCategories(categories);
}

function removeAutoCompletionRuleFromCategories(triggerToRemove) {
  const categories = {};
  Object.entries(currentAutoCompletionCategories() || {}).forEach(([category, triggers]) => {
    categories[category] = (triggers || []).filter((trigger) => trigger !== triggerToRemove);
  });
  autoCompletion = withCurrentAutoCompletionCategories(categories);
}

function autoSizeCompletionTextarea(textarea) {
  if (!textarea) return;
  if (!textarea.value) {
    textarea.style.height = "36px";
    return;
  }
  const lineCount = textarea.value.split("\n").length;
  if (lineCount <= 1) {
    textarea.style.height = "36px";
    return;
  }
  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(36, textarea.scrollHeight)}px`;
}

function autoSizeAllCompletionTextareas() {
  requestAnimationFrame(() => {
    els.autoCompletionRuleList
      ?.querySelectorAll(".autocomplete-expansion-input")
      .forEach((textarea) => autoSizeCompletionTextarea(textarea));
  });
}

function createAutoCompletionRuleRow({ trigger = "", template = "", isDraft = false }) {
  const row = document.createElement("div");
  row.className = "autocomplete-rule-row";
  if (isDraft) row.classList.add("is-draft");
  else row.dataset.trigger = trigger;

  const triggerInput = document.createElement("textarea");
  triggerInput.className = "autocomplete-trigger-input";
  triggerInput.rows = 1;
  triggerInput.value = trigger;
  triggerInput.placeholder = "Trigger";
  triggerInput.setAttribute("aria-label", "Trigger");
  triggerInput.spellcheck = false;
  triggerInput.autocomplete = "off";
  triggerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") event.preventDefault();
  });

  const templateInput = document.createElement("textarea");
  templateInput.className = "autocomplete-expansion-input";
  templateInput.value = template;
  templateInput.setAttribute("aria-label", "Expansion");
  templateInput.spellcheck = false;
  requestAnimationFrame(() => autoSizeCompletionTextarea(templateInput));

  if (isDraft) {
    const actionButton = createAutoCompletionIconButton({
      type: "delete",
      label: "Clear draft rule"
    });
    const commitDraftIfLeavingRow = (event) => {
      if (event.relatedTarget && row.contains(event.relatedTarget)) return;
      addAutoCompletionRuleFromInputs(triggerInput, templateInput);
    };
    triggerInput.addEventListener("input", () => {
      if (!/\s/.test(triggerInput.value)) triggerInput.classList.remove("is-invalid");
    });
    templateInput.addEventListener("input", () => {
      autoSizeCompletionTextarea(templateInput);
    });
    row.addEventListener("focusout", commitDraftIfLeavingRow);
    actionButton.addEventListener("click", () => {
      triggerInput.value = "";
      templateInput.value = "";
      triggerInput.classList.remove("is-invalid");
      autoSizeCompletionTextarea(templateInput);
      triggerInput.focus();
    });
    row.append(triggerInput, templateInput, actionButton);
  } else {
    const actionButton = createAutoCompletionIconButton({
      type: "delete",
      label: "Delete rule"
    });
    triggerInput.addEventListener("change", () => renameAutoCompletionRule(trigger, triggerInput.value));
    templateInput.addEventListener("input", () => {
      autoSizeCompletionTextarea(templateInput);
      updateAutoCompletionRule(trigger, templateInput.value);
    });
    actionButton.addEventListener("click", () => deleteAutoCompletionRule(trigger));
    row.append(triggerInput, templateInput, actionButton);
  }

  return row;
}

function applyAutoCompletionRuleLayout() {
  autoCompletionTriggerWidth = clamp(autoCompletionTriggerWidth, 86, 260);
  document.documentElement.style.setProperty("--autocomplete-trigger-width", `${autoCompletionTriggerWidth}px`);
  localStorage.setItem("rathee.autoCompletionTriggerWidth", String(autoCompletionTriggerWidth));
}

function startAutoCompletionColumnResize(event) {
  event.preventDefault();
  const divider = event.currentTarget;
  divider?.classList.add("is-dragging");
  const startX = event.clientX;
  const startWidth = autoCompletionTriggerWidth;
  const onMove = (moveEvent) => {
    autoCompletionTriggerWidth = clamp(startWidth + moveEvent.clientX - startX, 86, 260);
    applyAutoCompletionRuleLayout();
  };
  const onUp = () => {
    divider?.classList.remove("is-dragging");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp, { once: true });
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

function closeHelpPopover() {
  document.querySelector(".settings-help-popover")?.remove();
  document.querySelectorAll(".info-button.is-open").forEach((button) => button.classList.remove("is-open"));
}

function toggleHelpPopover(button) {
  const wasOpen = button.classList.contains("is-open");
  closeHelpPopover();
  if (wasOpen) return;
  const text = button.dataset.helpText || button.title || "";
  if (!text) return;
  const popover = document.createElement("div");
  popover.className = "settings-help-popover";
  popover.textContent = text;
  document.body.append(popover);
  button.classList.add("is-open");
  const rect = button.getBoundingClientRect();
  const width = Math.min(320, window.innerWidth - 24);
  const left = Math.min(window.innerWidth - width - 12, Math.max(12, rect.left));
  popover.style.width = `${width}px`;
  popover.style.left = `${left}px`;
  popover.style.top = `${rect.bottom + 8}px`;
}

function sampleAutoCompletionTemplate() {
  const marker = autoCompletion.placeholder;
  return `for(int i = 0 ; i < n${marker} ; i++){\n\t    ${marker}\n\t}${marker}`;
}

function markAutoCompletionDirty() {
  autoCompletionDirty = true;
  updateAutoCompletionSaveUi();
}

function updateAutoCompletionSaveUi(message = "") {
  if (els.autoCompletionSaveBtn) {
    els.autoCompletionSaveBtn.disabled = !autoCompletionDirty || !isAuthed();
    els.autoCompletionSaveBtn.textContent = autoCompletionDirty ? "Save" : "Saved";
    els.autoCompletionSaveBtn.title = isAuthed()
      ? "Save autocomplete settings to your account"
      : "Sign in to save autocomplete settings to your account";
  }
  if (els.autoCompletionSaveStatus) {
    els.autoCompletionSaveStatus.textContent = message || (autoCompletionDirty
      ? "Unsaved"
      : isAuthed() ? "Synced" : "Local only");
  }
}

function setAutoCompletionEnabled(enabled) {
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    enabled
  });
  markAutoCompletionDirty();
}

function setAutoCompletionPairs(enabled) {
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    pairs: enabled
  });
  markAutoCompletionDirty();
}

function setAutoCompletionPlaceholder(value) {
  const previousPlaceholder = autoCompletion.placeholder;
  const nextPlaceholder = cleanSnippetPlaceholder(value);
  const languageRules = {};
  Object.entries(autoCompletion.languageRules || { cpp: autoCompletion.rules || {} }).forEach(([language, rules]) => {
    languageRules[language] = Object.fromEntries(Object.entries(rules || {}).map(([trigger, template]) => [
      trigger,
      replaceSnippetMarkerInText(template, previousPlaceholder, nextPlaceholder)
    ]));
  });
  autoCompletion = normalizeAutoCompletionSettings({
    ...autoCompletion,
    placeholder: nextPlaceholder,
    languageRules,
    rules: languageRules.cpp || autoCompletion.rules
  });
  if (els.autoCompletionPlaceholder && els.autoCompletionPlaceholder.value !== autoCompletion.placeholder) {
    els.autoCompletionPlaceholder.value = autoCompletion.placeholder;
  }
  renderAutoCompletionSettings();
  markAutoCompletionDirty();
}

function updateAutoCompletionRule(trigger, template) {
  autoCompletion = withCurrentAutoCompletionRules({
    ...currentAutoCompletionRules(),
    [trigger]: template
  });
  markAutoCompletionDirty();
}

function renameAutoCompletionRule(previousTrigger, nextTrigger) {
  const cleanTrigger = String(nextTrigger || "").trim();
  if (!cleanTrigger || /\s/.test(cleanTrigger)) {
    renderAutoCompletionSettings();
    return;
  }

  const rules = { ...currentAutoCompletionRules() };
  const template = rules[previousTrigger] ?? "";
  delete rules[previousTrigger];
  rules[cleanTrigger] = template;
  if (cleanTrigger !== previousTrigger) autoCompletionDeletedTriggers.add(previousTrigger);
  autoCompletion = withCurrentAutoCompletionRules(rules);
  replaceAutoCompletionRuleInCategories(previousTrigger, cleanTrigger);
  renderAutoCompletionSettings();
  markAutoCompletionDirty();
}

function deleteAutoCompletionRule(trigger) {
  const rules = { ...currentAutoCompletionRules() };
  delete rules[trigger];
  autoCompletionDeletedTriggers.add(trigger);
  autoCompletion = withCurrentAutoCompletionRules(rules);
  removeAutoCompletionRuleFromCategories(trigger);
  renderAutoCompletionSettings();
  markAutoCompletionDirty();
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
  autoCompletion = withCurrentAutoCompletionRules({
    ...currentAutoCompletionRules(),
    [trigger]: template
  });
  addAutoCompletionRuleToCategory(trigger);
  renderAutoCompletionSettings();
  markAutoCompletionDirty();
}

function scheduleAppSettingsSave() {
  clearTimeout(settingsSaveTimer);
  settingsSavePending = true;
  settingsSaveTimer = setTimeout(() => {
    saveAppSettingsNow().catch(() => {
      // Settings still remain active in memory if the save fails.
    });
  }, 250);
}

async function saveAppSettingsNow({ keepalive = false } = {}) {
  clearTimeout(settingsSaveTimer);
  if (!isAuthed()) return; // anonymous: settings are not persisted server-side
  const settings = currentAppSettings();
  if (autoCompletionDirty) {
    if (keepalive) return;
    const accountSettings = await fetchAccountSettings().catch(() => null);
    if (accountSettings?.autoCompletion !== undefined) {
      settings.autoCompletion = accountSettings.autoCompletion;
    } else {
      delete settings.autoCompletion;
    }
  }
  const response = await fetch("/api/me/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
    keepalive
  });
  if (!response.ok) throw new Error("Settings save failed.");
  settingsSavePending = false;
  return response;
}

async function fetchAccountSettings() {
  if (!isAuthed()) return null;
  const response = await fetch("/api/me/workspace", { cache: "no-store" });
  if (!response.ok) throw new Error("Settings load failed.");
  const data = await response.json();
  return data.settings || {};
}

async function saveAutoCompletionSettings() {
  if (!isAuthed()) {
    updateAutoCompletionSaveUi("Sign in to sync");
    return;
  }
  updateAutoCompletionSaveUi("Saving...");
  const accountSettings = await fetchAccountSettings();
  const accountAutoCompletion = normalizeAutoCompletionSettings(accountSettings?.autoCompletion);
  const language = currentAutoCompletionLanguage();
  const rules = { ...(accountAutoCompletion.languageRules?.[language] || {}) };
  autoCompletionDeletedTriggers.forEach((trigger) => delete rules[trigger]);
  Object.assign(rules, currentAutoCompletionRules());
  const languageRules = {
    ...(accountAutoCompletion.languageRules || {}),
    ...(autoCompletion.languageRules || {}),
    [language]: rules
  };
  const languageCategories = {
    ...(accountAutoCompletion.languageCategories || {}),
    ...(autoCompletion.languageCategories || {}),
    [language]: currentAutoCompletionCategories()
  };
  const mergedAutoCompletion = normalizeAutoCompletionSettings({
    ...accountAutoCompletion,
    enabled: autoCompletion.enabled,
    pairs: autoCompletion.pairs,
    placeholder: autoCompletion.placeholder,
    tabs: autoCompletion.tabs,
    disabledTabs: autoCompletion.disabledTabs,
    categories: languageCategories.cpp,
    rules: languageRules.cpp,
    languageCategories,
    languageRules
  });
  const mergedSettings = {
    ...currentAppSettings(),
    ...(accountSettings || {}),
    autoCompletion: mergedAutoCompletion
  };
  const response = await fetch("/api/me/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: mergedSettings })
  });
  if (!response.ok) throw new Error("Autocomplete save failed.");
  autoCompletion = mergedAutoCompletion;
  autoCompletionDirty = false;
  autoCompletionDeletedTriggers.clear();
  renderAutoCompletionSettings();
  updateAutoCompletionSaveUi("Saved");
}

async function refreshAutoCompletionFromAccount({ force = false } = {}) {
  if (!isAuthed() || (!force && autoCompletionDirty)) return;
  const accountSettings = await fetchAccountSettings();
  if (!accountSettings || accountSettings.autoCompletion === undefined) return;
  autoCompletion = normalizeAutoCompletionSettings(accountSettings.autoCompletion);
  autoCompletionDirty = false;
  autoCompletionDeletedTriggers.clear();
  renderAutoCompletionSettings();
  updateAutoCompletionSaveUi("Synced");
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
    switchEditorView(LANGUAGE_CONFIG[els.language.value]?.templateView || "template");
  });
  els.codeFileBtn.addEventListener("click", () => {
    // Just toggle the file-name list (like a saved contest); opening files into
    // the editor happens only when a specific file name is clicked.
    tempFilesExpanded = !tempFilesExpanded;
    // While a contest is the open scope the temp list comes from a cache; on
    // expand, refresh it from the account so it shows the latest scratch files.
    if (tempFilesExpanded && isAuthed() && codeFileScope !== "workspace") {
      loadSavedContestList();
    } else {
      renderTempFiles();
    }
  });
  if (els.addFolderBtn) els.addFolderBtn.addEventListener("click", createFolder);
  if (els.addContestBtn) els.addContestBtn.addEventListener("click", startContestImport);
  initSectionResize();
  els.openTemplateFileBtn.addEventListener("click", () => openTemplateSettingsFile("template"));
  els.openHeadersFileBtn.addEventListener("click", () => openTemplateSettingsFile("headers"));
  els.openPythonTemplateFileBtn.addEventListener("click", () => openTemplateSettingsFile("python-template"));
  els.openJavaTemplateFileBtn?.addEventListener("click", () => openTemplateSettingsFile("java-template"));
  els.createFirstFileBtn.addEventListener("click", createFirstCodeFile);
  els.importContestBtn.addEventListener("click", importContest);
  els.cfSubmitBtn.addEventListener("click", submitToCodeforces);
  els.cfStatusBtn.addEventListener("click", () => {
    refreshCodeforcesStatus(true);
    refreshRecentVerdicts(); // refresh the open folder/contest badges from recent submissions
  });
  els.settingsBtn.addEventListener("click", () => showSettings(true));
  els.settingsCloseBtn.addEventListener("click", () => showSettings(false));
  els.settingsOverlay.addEventListener("click", (event) => {
    if (event.target === els.settingsOverlay) showSettings(false);
  });
  els.settingsTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchSettingsTab(tab.dataset.settingsTab));
  });
  document.querySelectorAll(".info-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleHelpPopover(button);
    });
  });
  document.querySelector(".autocomplete-col-divider")?.addEventListener("pointerdown", startAutoCompletionColumnResize);
  document.addEventListener("click", (event) => {
    if (!event.target.closest?.(".settings-help-popover") && !event.target.closest?.(".info-button")) {
      closeHelpPopover();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeHelpPopover();
  });
  els.modeLightBtn.addEventListener("click", () => setAppearanceMode("light"));
  els.modeDarkBtn.addEventListener("click", () => setAppearanceMode("dark"));
  els.uiZoomRange?.addEventListener("input", (event) => setUiZoom(event.target.value));
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
  els.folderSortBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFolderSortMenu();
  });
  els.folderSortItems.forEach((item) => {
    item.addEventListener("click", () => setFolderSortMode(item.dataset.sortValue));
  });
  els.contestArchiveToggle?.addEventListener("click", () => setContestView(contestView === "archived" ? "active" : "archived"));
  els.contestBinToggle?.addEventListener("click", () => setContestView(contestView === "bin" ? "active" : "bin"));
  els.folderArchiveToggle?.addEventListener("click", () => setFolderView(folderView === "archived" ? "active" : "archived"));
  els.folderBinToggle?.addEventListener("click", () => setFolderView(folderView === "bin" ? "active" : "bin"));
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
    if (els.folderSortMenu && !els.folderSortMenu.hidden && !els.folderSortDropdown.contains(event.target)) toggleFolderSortMenu(false);
    if (!event.target.closest(".folder-file-sort-dropdown")) {
      document.querySelectorAll(".folder-file-sort-dropdown .contest-sort-menu").forEach((mn) => { mn.hidden = true; });
    }
  });
  els.editorFontSizeInput.addEventListener("input", () => setEditorFontSize(Number(els.editorFontSizeInput.value)));
  els.editorFontSelect.addEventListener("change", () => setEditorFontFamily(els.editorFontSelect.value));
  els.autoCompletionEnabled?.addEventListener("change", () => setAutoCompletionEnabled(els.autoCompletionEnabled.checked));
  els.autoCompletionPairs?.addEventListener("change", () => setAutoCompletionPairs(els.autoCompletionPairs.checked));
  els.autoCompletionPlaceholder?.addEventListener("change", () => setAutoCompletionPlaceholder(els.autoCompletionPlaceholder.value));
  els.autoCompletionCategoryTabs?.addEventListener("click", (event) => {
    const del = event.target.closest?.(".autocomplete-category-tab-delete");
    if (del) {
      deleteAutoCompletionCustomTab(del.dataset.deleteCategory);
      return;
    }
    const tab = event.target.closest?.(".autocomplete-category-tab");
    if (!tab) return;
    if (tab.classList.contains("autocomplete-category-add")) {
      createAutoCompletionCustomTab();
      return;
    }
    setAutoCompletionCategory(tab.dataset.autocompleteCategory);
  });
  els.autoCompletionSaveBtn?.addEventListener("click", () => {
    saveAutoCompletionSettings().catch(() => updateAutoCompletionSaveUi("Save failed"));
  });
  els.codeforcesHandleInput.addEventListener("input", () => setCodeforcesHandle(els.codeforcesHandleInput.value));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && settingsSavePending) {
      saveAppSettingsNow({ keepalive: true }).catch(() => {});
    }
  });
  window.addEventListener("pagehide", () => {
    if (settingsSavePending) saveAppSettingsNow({ keepalive: true }).catch(() => {});
  });
  window.addEventListener("focus", () => {
    if (currentSettingsTab === "autocomplete") {
      refreshAutoCompletionFromAccount().catch(() => {});
    }
  });
  setInterval(() => {
    if (!els.settingsOverlay.hidden && currentSettingsTab === "autocomplete") {
      refreshAutoCompletionFromAccount().catch(() => {});
    }
  }, 5000);
  els.saveTemplateBtn.addEventListener("click", saveTemplateFilesFromEditor);
  els.saveFilesBtn.addEventListener("click", promptLoginToSave);
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
  // Pre-fill with the last opened contest, else a sample URL so users see the
  // expected format. It's only filled in — never auto-imported.
  els.contestUrl.value = recentContest?.url || "https://codeforces.com/contest/2236";
  updateContestChip();
  els.codeLeftBtn.addEventListener("click", () => setCodeEditorPlacement("left"));
  els.codeRightBtn.addEventListener("click", () => setCodeEditorPlacement("right"));
  els.hideInputBtn.addEventListener("click", () => togglePanel("input"));
  els.hideOutputBtn.addEventListener("click", () => togglePanel("output"));
  els.input.addEventListener("input", () => {
    if (editorView !== "code" || !currentActiveFile()) return;
    const tests = activeFileTests();
    if (tests[activeTestIndex]) {
      tests[activeTestIndex].input = els.input.value;
      persistActiveTests();
    }
  });
  els.expectedOutput.addEventListener("input", () => {
    if (editorView !== "code" || !currentActiveFile()) return;
    const tests = activeFileTests();
    if (tests[activeTestIndex]) {
      tests[activeTestIndex].expected = els.expectedOutput.value;
      persistActiveTests();
    }
  });
  els.copyInputBtn.addEventListener("click", () => copyPaneText(els.input.value, els.copyInputBtn));
  els.copyOutputBtn.addEventListener("click", () => copyPaneText(els.output.value, els.copyOutputBtn));
  els.expectedPlacementBtn?.addEventListener("click", () => {
    layoutState.expectedSide = layoutState.expectedSide === "right" ? "bottom" : "right";
    applyWorkspaceLayout();
  });
  els.copyCodeBtn.addEventListener("click", () => copyPaneText(getCopyCode(), els.copyCodeBtn));
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
  loadTemplateFiles();
  // initAuth determines who's signed in, THEN loads the workspace once from the
  // correct backend (account DB vs anonymous). Doing the workspace load only
  // here avoids a race where the anonymous and account loads competed on reload.
  initAuth();
}

// ---------------------------------------------------------------------------
// Google Sign-In. Anonymous use is allowed; signing in (later) persists your
// workspace per-account. Phase 1 just establishes identity + shows who's in.
// ---------------------------------------------------------------------------
let authState = { user: null, clientId: null, loginEnabled: false };

function isAuthed() {
  return !!(authState && authState.user);
}

async function initAuth(justLoggedIn = false) {
  try {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    const data = await res.json();
    authState = { user: data.user, clientId: data.clientId, loginEnabled: data.loginEnabled };
  } catch {
    authState = { user: null, clientId: null, loginEnabled: false };
  }
  renderAuth();
  if (isAuthed()) {
    // On sign-in the account's own files load as-is. Anything you were working
    // on anonymously is MERGED in without clobbering account files: a temp file
    // whose name clashes with an account file is imported under a
    // "<name>ImportedAfterLogin.<ext>" name, and only files you actually changed
    // (i.e. not still the untouched template) are carried over.
    const local = justLoggedIn ? captureAnonymousWorkspace() : null;
    await applyAccountSettingsAndTemplates(justLoggedIn).catch(() => {});
    if (local) await mergeLocalIntoAccount(local).catch(() => {});
  }
  // Reload the scratch workspace from the right backend now auth is known.
  await Promise.all([loadWorkspaceCppFiles(), loadWorkspacePythonFiles(), loadWorkspaceJavaFiles()]).catch(() => {});
  loadSavedContestList(); // empty when anonymous; the saved list when signed in
  backgroundVerdictSync(); // progressively pull full verdict history in the background
  // On the very first load, if there are no files yet, reveal the editor settings
  // so the language picker is usable before creating the first file (the "Create
  // A.cpp/A.py" overlay otherwise sits over it).
  if (!bootSettingsHandled) {
    bootSettingsHandled = true;
    if (editorView === "code" && !currentActiveFile()) setEditorQuickSettings(true);
  }
}
let bootSettingsHandled = false;

// Load the signed-in user's settings + templates from their account and apply
// them; if their account has none yet (first login), seed it from the current
// (anonymous) values so nothing is lost.
async function applyAccountSettingsAndTemplates(justLoggedIn) {
  const res = await fetch("/api/me/workspace", { cache: "no-store" });
  if (!res.ok) return;
  const data = await res.json();

  if (data.settings && Object.keys(data.settings).length) {
    const needsAutoCompletionSeed = shouldSeedDefaultAutoCompletion(data.settings.autoCompletion);
    applyAppSettings(data.settings);
    reapplyAllSettings();
    if (needsAutoCompletionSeed) scheduleAppSettingsSave();
  } else if (justLoggedIn) {
    scheduleAppSettingsSave(); // seed account settings from current values
  }

  const t = data.templates || {};
  if (t.cpp_template || t.headers || t.python_template || t.java_template) {
    if (typeof t.cpp_template === "string") cppTemplate = t.cpp_template;
    if (typeof t.headers === "string") cppHeaders = t.headers;
    if (typeof t.python_template === "string") pythonCode = t.python_template;
    if (typeof t.java_template === "string") javaCode = t.java_template;
    if (editorView === "template") setEditorCode(cppTemplate);
    else if (editorView === "headers") setEditorCode(cppHeaders);
    else if (editorView === "python-template") setEditorCode(pythonCode);
    else if (editorView === "java-template") setEditorCode(javaCode);
  } else if (justLoggedIn) {
    saveTemplateFilesNow().catch(() => {}); // seed account templates from current
  }
}

// Re-apply settings to the UI after loading a different user's settings.
function reapplyAllSettings() {
  applyAppearance();
  applyWorkspaceLayout();
  setEditorFontSize(editorFontSize);
  setEditorFontFamily(editorFontFamily);
  renderAutoCompletionSettings();
  setCodeforcesHandle(codeforcesHandle);
  els.quickLanguage.value = els.language.value;
  loadCodeforcesProfile();
}

// Snapshot the current anonymous in-memory workspace right before account data
// loads, so it can be merged in. Because only one workspace is active at a time,
// this captures either the scratch files (workspace scope) or the just-imported
// in-memory contest (contest scope). Whether a file counts as "changed" is
// decided later against the shipped default template, not anything captured here.
function captureAnonymousWorkspace() {
  const snap = {
    scratch: { cpp: [], python: [], java: [] },
    contests: []
  };
  if (codeFileScope === "workspace") {
    for (const name of cppFileNames) snap.scratch.cpp.push({ filename: name, content: cppFiles[name] || "", input: cppInputs[name] || "" });
    for (const name of pyFileNames) snap.scratch.python.push({ filename: name, content: pyFiles[name] || "", input: pyInputs[name] || "" });
    for (const name of javaFileNames) snap.scratch.java.push({ filename: name, content: javaFiles[name] || "", input: javaInputs[name] || "" });
  }
  for (const c of savedContests) {
    if (!c.inMemory) continue;
    const entry = {
      contestId: String(c.contestId || ""),
      name: c.name || "",
      language: c.language || els.language.value,
      problems: (c.problems || []).map((p) => ({ index: p.index, name: p.name || "" })),
      files: { cpp: [], python: [], java: [] }
    };
    // The active in-memory contest's files live in the current arrays.
    if (codeFileScope === "contest" && String(activeContestId) === entry.contestId) {
      for (const name of cppFileNames) entry.files.cpp.push({ filename: name, content: cppFiles[name] || "", input: cppInputs[name] || "" });
      for (const name of pyFileNames) entry.files.python.push({ filename: name, content: pyFiles[name] || "", input: pyInputs[name] || "" });
      for (const name of javaFileNames) entry.files.java.push({ filename: name, content: javaFiles[name] || "", input: javaInputs[name] || "" });
    }
    snap.contests.push(entry);
  }
  return snap;
}

function importedAfterLoginName(filename) {
  const dot = filename.lastIndexOf(".");
  const base = dot >= 0 ? filename.slice(0, dot) : filename;
  const ext = dot >= 0 ? filename.slice(dot) : "";
  return `${base}ImportedAfterLogin${ext}`;
}

// True if `content` is non-empty and differs from the starter template, i.e. the
// user actually wrote something. Whitespace-insensitive so trivial reformatting
// of a pristine template still counts as "untouched".
function isChangedFromTemplate(language, content, templates) {
  const baseline = language === "python"
    ? (templates?.python ?? pythonCode)
    : language === "java" ? (templates?.java ?? javaCode) : (templates?.cpp ?? cppTemplate);
  const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();
  const value = norm(content);
  return value !== "" && value !== norm(baseline);
}

function uniqueName(existing, filename) {
  if (!existing.has(filename)) return filename;
  const dot = filename.lastIndexOf(".");
  const base = dot >= 0 ? filename.slice(0, dot) : filename;
  const ext = dot >= 0 ? filename.slice(dot) : "";
  let i = 2;
  while (existing.has(`${base}${i}${ext}`)) i += 1;
  return `${base}${i}${ext}`;
}

function registerContestToAccount(contestId, contest) {
  return fetch("/api/me/contest", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contestId, name: contest.name || "",
      language: contest.language || "cpp", problems: contest.problems || []
    })
  });
}

// Merge the captured anonymous workspace into the signed-in account:
//  - scratch: changed files only; name clash → "<name>ImportedAfterLogin.<ext>".
//  - contest the account doesn't have yet → register it + import changed files.
//  - contest already in the account → only changed files, each renamed
//    "<name>ImportedAfterLogin.<ext>" so account work is never overwritten.
async function mergeLocalIntoAccount(local) {
  const res = await fetch("/api/me/workspace", { cache: "no-store" });
  if (!res.ok) return;
  const data = await res.json();

  // Baseline for "changed" is the DEFAULT template (the server's Template.cpp /
  // Template.py / Template.java), which is the same for everyone and unaffected by any in-session
  // template edits — so a file is only carried over if it differs from the
  // shipped default, and the template itself is never imported.
  const tplRes = await fetch(`/api/template-files?ts=${Date.now()}`, { cache: "no-store" }).catch(() => null);
  const tpl = tplRes && tplRes.ok ? await tplRes.json().catch(() => ({})) : {};
  const defaults = { cpp: tpl.template || "", python: tpl.python || "", java: tpl.java || "" };

  const scratch = { cpp: new Set(), python: new Set(), java: new Set() };
  const contestFiles = {}; // `${contestId}|${language}` -> Set(filename)
  for (const f of data.files || []) {
    if (f.scope === "scratch") scratch[f.language]?.add(f.filename);
    else if (f.scope === "contest") {
      const key = `${f.contestId}|${f.language}`;
      (contestFiles[key] || (contestFiles[key] = new Set())).add(f.filename);
    }
  }
  const accountContestIds = new Set((data.contests || []).map((c) => String(c.contestId)));
  const uploads = [];

  const addScratch = (lang, file) => {
    if (!isChangedFromTemplate(lang, file.content, defaults)) return;
    const set = scratch[lang];
    const candidate = set.has(file.filename) ? importedAfterLoginName(file.filename) : file.filename;
    const name = uniqueName(set, candidate);
    set.add(name);
    uploads.push(putMyFile(lang, "scratch", name, file.content, file.input, ""));
  };
  local.scratch.cpp.forEach((f) => addScratch("cpp", f));
  local.scratch.python.forEach((f) => addScratch("python", f));
  local.scratch.java.forEach((f) => addScratch("java", f));

  for (const contest of local.contests) {
    const cid = String(contest.contestId || "");
    if (!cid) continue;
    if (!accountContestIds.has(cid)) {
      // New contest: register it (so it shows in the drawer) but store only the
      // files you actually changed — untouched problems re-render from template.
      uploads.push(registerContestToAccount(cid, contest));
      for (const f of contest.files.cpp) {
        if (isChangedFromTemplate("cpp", f.content, defaults)) uploads.push(putMyFile("cpp", "contest", f.filename, f.content, f.input, cid));
      }
      for (const f of contest.files.python) {
        if (isChangedFromTemplate("python", f.content, defaults)) uploads.push(putMyFile("python", "contest", f.filename, f.content, f.input, cid));
      }
      for (const f of contest.files.java || []) {
        if (isChangedFromTemplate("java", f.content, defaults)) uploads.push(putMyFile("java", "contest", f.filename, f.content, f.input, cid));
      }
    } else {
      const mergeLang = (lang, files) => {
        const key = `${cid}|${lang}`;
        const set = contestFiles[key] || (contestFiles[key] = new Set());
        for (const f of files) {
          if (!isChangedFromTemplate(lang, f.content, defaults)) continue;
          const name = uniqueName(set, importedAfterLoginName(f.filename));
          set.add(name);
          uploads.push(putMyFile(lang, "contest", name, f.content, f.input, cid));
        }
      };
      mergeLang("cpp", contest.files.cpp);
      mergeLang("python", contest.files.python);
      mergeLang("java", contest.files.java || []);
    }
  }
  await Promise.all(uploads).catch(() => {});
}

function putMyFile(language, scope, filename, content, input, contestId = "") {
  return fetch("/api/me/file", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, scope, contestId, filename, content, input })
  });
}

function renderAuth() {
  updateSaveFilesButton();
  // Profile button: show the Google photo when signed in, else the person icon.
  const avatar = document.querySelector("#profileAvatar");
  const iconCircle = document.querySelector(".profile-icon-circle");
  if (authState.user && authState.user.picture) {
    if (avatar) { avatar.src = authState.user.picture; avatar.hidden = false; }
    if (iconCircle) iconCircle.style.display = "none";
  } else {
    if (avatar) avatar.hidden = true;
    if (iconCircle) iconCircle.style.display = "";
  }

  // Auth block inside the profile dropdown (above the Codeforces handle).
  const area = document.querySelector("#authArea");
  if (!area) return;
  area.innerHTML = "";

  if (authState.user) {
    const wrap = document.createElement("div");
    wrap.className = "auth-user";
    if (authState.user.picture) {
      const img = document.createElement("img");
      img.src = authState.user.picture;
      img.alt = "";
      img.className = "auth-avatar";
      img.referrerPolicy = "no-referrer";
      wrap.append(img);
    }
    const info = document.createElement("div");
    info.className = "auth-info";
    const name = document.createElement("div");
    name.className = "auth-name";
    name.textContent = authState.user.name || "Account";
    const email = document.createElement("div");
    email.className = "auth-email";
    email.textContent = authState.user.email || "";
    info.append(name, email);
    const out = document.createElement("button");
    out.className = "auth-logout";
    out.type = "button";
    out.textContent = "Log out";
    out.addEventListener("click", logout);
    wrap.append(info, out);
    area.append(wrap);
    return;
  }

  if (!authState.loginEnabled || !authState.clientId) return; // accounts unavailable

  const hint = document.createElement("div");
  hint.className = "auth-signin-hint";
  hint.textContent = "Sign in to save your files & contests";
  const btn = document.createElement("div");
  btn.id = "gsiButton";
  area.append(hint, btn);
  renderGoogleButton(btn);
}

function renderGoogleButton(target, attempt = 0) {
  if (!(window.google && window.google.accounts && window.google.accounts.id)) {
    if (attempt < 40) return void setTimeout(() => renderGoogleButton(target, attempt + 1), 150);
    return;
  }
  window.google.accounts.id.initialize({
    client_id: authState.clientId,
    callback: onGoogleCredential
  });
  window.google.accounts.id.renderButton(target, {
    type: "standard",
    theme: appearanceMode === "dark" ? "filled_black" : "outline",
    size: "large",
    shape: "pill",
    text: "continue_with",
    logo_alignment: "left",
    width: 240
  });
}

async function onGoogleCredential(response) {
  try {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: response.credential })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Sign-in failed");
    }
    await initAuth(true); // justLoggedIn → seed empty account from current work, then load
  } catch (error) {
    setStatus("Sign-in failed", "error");
    els.meta.textContent = error.message;
  }
}

async function logout() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    window.google?.accounts?.id?.disableAutoSelect?.();
  } catch {
    /* ignore */
  }
  authState.user = null;
  renderAuth();
  // Logging out returns to a clean anonymous slate — same as a fresh page load:
  // empty temporary files and no contest (without an actual page reload).
  resetToAnonymousWorkspace();
}

// Reset the in-memory workspace to the anonymous starting point: no temporary
// files, no contest, empty editor. Used on logout so the screen looks like a
// fresh visit without a hard refresh.
function resetToAnonymousWorkspace() {
  codeFileScope = "workspace";
  activeContestDir = "";
  activeContestId = "";
  cppFileNames = []; cppFiles = {}; cppInputs = {}; cppTabLabels = {}; cppProblems = {}; activeCppFile = ""; tempCppNames = [];
  pyFileNames = []; pyFiles = {}; pyInputs = {}; pyTabLabels = {}; pyProblems = {}; activePyFile = ""; tempPyNames = [];
  javaFileNames = []; javaFiles = {}; javaInputs = {}; javaTabLabels = {}; javaProblems = {}; activeJavaFile = ""; tempJavaNames = [];
  openCppTabs = []; openPyTabs = []; openJavaTabs = [];
  savedContests = [];
  expandedContestKeys.clear();
  savedFolders = [];
  activeFolderId = "";
  expandedFolderKeys.clear();
  contextSnapshots.clear();
  recentContest = null;
  localStorage.removeItem("rathee.recentContest");
  editorView = "code";
  els.language.value = currentLanguage || "cpp";
  els.quickLanguage.value = els.language.value;
  renderFileTabs();
  renderTempFiles();
  renderSavedContests();
  renderFolders();
  setEditorCode("");
  if (els.input) els.input.value = "";
  if (els.output) els.output.value = "";
  updateEditorEmptyState();
  updateSaveFilesButton();
}

// Show a "Save" nudge for anonymous users editing code; signing in is what
// actually persists their files to an account.
function updateSaveFilesButton() {
  if (!els.saveFilesBtn) return;
  const show = !isAuthed() && authState.loginEnabled && editorView === "code";
  els.saveFilesBtn.hidden = !show;
}

function promptLoginToSave() {
  setStatus("Log in to save your files", "idle");
  toggleProfileMenu(true); // reveal the dropdown with the Google sign-in button
}


// Scratch files: signed-in users read from their account (DB). Anonymous users
// persist nothing, so they always start with an empty workspace (reset on every
// refresh) — work is kept only if/when they sign in.
async function fetchScratchFiles(language) {
  if (!isAuthed()) return [];
  const res = await fetch("/api/me/workspace", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load your files.");
  return (data.files || [])
    .filter((f) => f.language === language && f.scope === "scratch")
    .map((f) => ({ filename: f.filename, code: f.content || "", input: f.input || "", tests: f.tests || null }));
}

async function loadWorkspaceCppFiles() {
  try {
    const files = await fetchScratchFiles("cpp");
    codeFileScope = "workspace";
    activeContestDir = "";
    activeContestId = "";
    cppFileNames = files.map((f) => f.filename);
    cppFiles = Object.fromEntries(files.map((f) => [f.filename, f.code]));
    tempCppNames = cppFileNames.slice();
    openCppTabs = cppFileNames.slice();

    cppInputs = Object.fromEntries(files.map((f) => [f.filename, f.input || ""]));
    cppSamples = buildTestsMap(files);
    cppTabLabels = Object.fromEntries(cppFileNames.map((name) => [name, name]));
    cppProblems = Object.fromEntries(cppFileNames.map((name) => [name, null]));
    activeCppFile = cppFileNames.includes(activeCppFile) ? activeCppFile : cppFileNames[0] || "";

    if (editorView === "code" && els.language.value === "cpp") {
      renderFileTabs();
      setEditorCode(activeCppFile ? cppFiles[activeCppFile] : "");
      activeTestIndex = 0; clearTestRun(); refreshIoPanels();
      updateEditorEmptyState();
    }
    // Scope is now "workspace" — re-render the contest + folder drawers so their
    // rows reflect the closed (non-open) state with correct open handlers.
    renderSavedContests();
    renderFolders();
  } catch (error) {
    els.meta.textContent = error.message || "Could not load workspace C++ files";
  }
}

async function loadWorkspacePythonFiles() {
  try {
    const files = await fetchScratchFiles("python");
    if (els.language.value === "python") {
      codeFileScope = "workspace";
      activeContestDir = "";
      activeContestId = "";
    }
    pyFileNames = files.map((f) => f.filename);
    pyFiles = Object.fromEntries(files.map((f) => [f.filename, f.code]));
    tempPyNames = pyFileNames.slice();
    openPyTabs = pyFileNames.slice();

    pyInputs = Object.fromEntries(files.map((f) => [f.filename, f.input || ""]));
    pySamples = buildTestsMap(files);
    pyTabLabels = Object.fromEntries(pyFileNames.map((name) => [name, name]));
    pyProblems = Object.fromEntries(pyFileNames.map((name) => [name, null]));
    activePyFile = pyFileNames.includes(activePyFile) ? activePyFile : pyFileNames[0] || "";

    if (editorView === "code" && els.language.value === "python") {
      renderFileTabs();
      setEditorCode(activePyFile ? pyFiles[activePyFile] : "");
      activeTestIndex = 0; clearTestRun(); refreshIoPanels();
      updateEditorEmptyState();
    }
    renderSavedContests(); // reflect the now-workspace scope in the contest drawer
    renderFolders();
  } catch (error) {
    els.meta.textContent = error.message || "Could not load workspace Python files";
  }
}

async function loadWorkspaceJavaFiles() {
  try {
    const files = await fetchScratchFiles("java");
    if (els.language.value === "java") {
      codeFileScope = "workspace";
      activeContestDir = "";
      activeContestId = "";
    }
    javaFileNames = files.map((f) => f.filename);
    javaFiles = Object.fromEntries(files.map((f) => [f.filename, f.code]));
    tempJavaNames = javaFileNames.slice();
    openJavaTabs = javaFileNames.slice();

    javaInputs = Object.fromEntries(files.map((f) => [f.filename, f.input || ""]));
    javaSamples = buildTestsMap(files);
    javaTabLabels = Object.fromEntries(javaFileNames.map((name) => [name, name]));
    javaProblems = Object.fromEntries(javaFileNames.map((name) => [name, null]));
    activeJavaFile = javaFileNames.includes(activeJavaFile) ? activeJavaFile : javaFileNames[0] || "";

    if (editorView === "code" && els.language.value === "java") {
      renderFileTabs();
      setEditorCode(activeJavaFile ? javaFiles[activeJavaFile] : "");
      activeTestIndex = 0; clearTestRun(); refreshIoPanels();
      updateEditorEmptyState();
    }
    renderSavedContests();
    renderFolders();
  } catch (error) {
    els.meta.textContent = error.message || "Could not load workspace Java files";
  }
}

async function saveWorkspaceCppFile(filename, code) {
  if (!isAuthed()) return; // anonymous: nothing is persisted
  await putMyFile("cpp", "scratch", filename, code, cppInputs[filename] || "");
}

async function saveWorkspacePythonFile(filename, code) {
  if (!isAuthed()) return; // anonymous: nothing is persisted
  await putMyFile("python", "scratch", filename, code, pyInputs[filename] || "");
}

async function saveWorkspaceJavaFile(filename, code) {
  if (!isAuthed()) return; // anonymous: nothing is persisted
  await putMyFile("java", "scratch", filename, code, javaInputs[filename] || "");
}

async function saveContestCppFile(filename, code) {
  if (!isAuthed() || !activeContestId) return; // anonymous: nothing is persisted
  await putMyFile("cpp", "contest", filename, code, cppInputs[filename] || "", activeContestId);
}

async function saveContestPythonFile(filename, code) {
  if (!isAuthed() || !activeContestId) return; // anonymous: nothing is persisted
  await putMyFile("python", "contest", filename, code, pyInputs[filename] || "", activeContestId);
}

async function saveContestJavaFile(filename, code) {
  if (!isAuthed() || !activeContestId) return; // anonymous: nothing is persisted
  await putMyFile("java", "contest", filename, code, javaInputs[filename] || "", activeContestId);
}

async function saveFolderCppFile(filename, code) {
  if (!isAuthed() || !activeFolderId) return; // anonymous: nothing is persisted
  await putMyFile("cpp", "folder", filename, code, cppInputs[filename] || "", activeFolderId);
}

async function saveFolderPythonFile(filename, code) {
  if (!isAuthed() || !activeFolderId) return; // anonymous: nothing is persisted
  await putMyFile("python", "folder", filename, code, pyInputs[filename] || "", activeFolderId);
}

async function saveFolderJavaFile(filename, code) {
  if (!isAuthed() || !activeFolderId) return; // anonymous: nothing is persisted
  await putMyFile("java", "folder", filename, code, javaInputs[filename] || "", activeFolderId);
}

function currentLanguageValue() {
  return SUPPORTED_LANGUAGES.includes(els.language.value) ? els.language.value : "cpp";
}

function languageState(language = currentLanguageValue()) {
  if (language === "python") {
    return {
      names: pyFileNames, files: pyFiles, inputs: pyInputs, labels: pyTabLabels, problems: pyProblems,
      openTabs: openPyTabs, active: activePyFile, tempNames: tempPyNames, template: pythonCode,
      setNames: (v) => { pyFileNames = v; }, setOpenTabs: (v) => { openPyTabs = v; },
      setActive: (v) => { activePyFile = v; }, setTempNames: (v) => { tempPyNames = v; }
    };
  }
  if (language === "java") {
    return {
      names: javaFileNames, files: javaFiles, inputs: javaInputs, labels: javaTabLabels, problems: javaProblems,
      openTabs: openJavaTabs, active: activeJavaFile, tempNames: tempJavaNames, template: javaCode,
      setNames: (v) => { javaFileNames = v; }, setOpenTabs: (v) => { openJavaTabs = v; },
      setActive: (v) => { activeJavaFile = v; }, setTempNames: (v) => { tempJavaNames = v; }
    };
  }
  return {
    names: cppFileNames, files: cppFiles, inputs: cppInputs, labels: cppTabLabels, problems: cppProblems,
    openTabs: openCppTabs, active: activeCppFile, tempNames: tempCppNames, template: cppTemplate,
    setNames: (v) => { cppFileNames = v; }, setOpenTabs: (v) => { openCppTabs = v; },
    setActive: (v) => { activeCppFile = v; }, setTempNames: (v) => { tempCppNames = v; }
  };
}

function saveFunctionFor(language = currentLanguageValue(), scope = codeFileScope) {
  if (language === "python") {
    return scope === "contest" ? saveContestPythonFile : scope === "folder" ? saveFolderPythonFile : saveWorkspacePythonFile;
  }
  if (language === "java") {
    return scope === "contest" ? saveContestJavaFile : scope === "folder" ? saveFolderJavaFile : saveWorkspaceJavaFile;
  }
  return scope === "contest" ? saveContestCppFile : scope === "folder" ? saveFolderCppFile : saveWorkspaceCppFile;
}

function scheduleWorkspaceCodeSave() {
  if (editorView !== "code") return;
  const language = currentLanguageValue();
  const state = languageState(language);
  const filename = state.active;
  if (!filename) return;
  // Capture the full save target NOW. Resolving it inside the debounce instead
  // let a scope switch within 350ms misroute the write (e.g. a folder file
  // saved under a contest), polluting the contest with "1875A.cpp"-style files.
  const code = state.files[filename];
  const input = state.inputs[filename] || "";
  const scope = codeFileScope;
  const dbScope = scope === "workspace" ? "scratch" : scope;
  const containerId = scope === "contest" ? activeContestId : scope === "folder" ? activeFolderId : "";
  if (scope === "folder" && containerId) touchFolderFile(containerId, language, filename); // mark edited for sort
  clearTimeout(codeSaveTimer);
  codeSaveTimer = setTimeout(() => {
    if (!isAuthed()) return; // anonymous: nothing persisted
    if (dbScope !== "scratch" && !containerId) return; // need a container id
    if (dbScope === "contest" && /^\d/.test(filename)) return; // contest files are index-only, never <id><index>
    putMyFile(language, dbScope, filename, code, input, containerId).catch(() => {
      els.meta.textContent = `Could not save ${filename}`;
    });
  }, 350);
}

async function deleteWorkspaceCppFile(filename) {
  if (!isAuthed()) return; // anonymous: nothing is persisted
  await deleteMyFile("cpp", "scratch", filename);
}

async function deleteWorkspacePythonFile(filename) {
  if (!isAuthed()) return; // anonymous: nothing is persisted
  await deleteMyFile("python", "scratch", filename);
}

async function deleteWorkspaceJavaFile(filename) {
  if (!isAuthed()) return; // anonymous: nothing is persisted
  await deleteMyFile("java", "scratch", filename);
}

function deleteMyFile(language, scope, filename, contestId = "") {
  return fetch("/api/me/file", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, scope, contestId, filename })
  });
}

async function loadTemplateFiles() {
  await reloadTemplateFilesFromWorkspace({ updateVisible: true, resetDirty: true });
}

async function reloadTemplateFilesFromWorkspace({ updateVisible, resetDirty }) {
  try {
    let files;
    if (isAuthed()) {
      const res = await fetch("/api/me/workspace", { cache: "no-store" });
      if (!res.ok) throw new Error("Template load failed.");
      const data = await res.json();
      const t = data.templates || {};
      files = { template: t.cpp_template, headers: t.headers, python: t.python_template, java: t.java_template };
    } else {
      const res = await fetch(`/api/template-files?ts=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });
      if (!res.ok) throw new Error("Template file load failed.");
      files = await res.json();
    }
    if (typeof files.template === "string") cppTemplate = files.template;
    if (typeof files.headers === "string") cppHeaders = files.headers;
    if (typeof files.python === "string") pythonCode = files.python;
    if (typeof files.java === "string") javaCode = files.java;
    if (updateVisible && editorView === "template") setEditorCode(cppTemplate);
    if (updateVisible && editorView === "headers") setEditorCode(cppHeaders);
    if (updateVisible && editorView === "python-template") setEditorCode(pythonCode);
    if (updateVisible && editorView === "java-template") setEditorCode(javaCode);
    if (resetDirty) setTemplateDirty(false);
    return true;
  } catch (error) {
    setStatus("Load failed", "error");
    els.meta.textContent = error.message || "Could not load template files from workspace";
    return false;
  }
}

async function saveTemplateFilesNow() {
  if (!isAuthed()) return; // anonymous: templates are read-only defaults, not saved
  await Promise.all([
    putMyTemplate("cpp_template", cppTemplate),
    putMyTemplate("headers", cppHeaders),
    putMyTemplate("python_template", pythonCode),
    putMyTemplate("java_template", javaCode)
  ]);
}

function putMyTemplate(kind, content) {
  return fetch("/api/me/template", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, content: content || "" })
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
    const state = languageState();
    if (state.active) {
      state.files[state.active] = getEditorCode();
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
  codeEditor.toggleOverwrite(false); // ensure a normal insert caret, never overwrite
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
      // Disable overwrite-mode toggling (the block "type-over" cursor); keep a
      // normal insert caret always.
      Insert: false,
      Tab(cm) {
        clearLastSnippetExpansion();
        if (moveToNextSnippetStop(cm)) return;
        clearSnippetSession();
      }
    }
  };
}

function handleEditorKeyDown(cm, event) {
  if (!autoCompletion.enabled || cm.getOption("readOnly")) return;
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;

  if (event.key === "Backspace" && undoLastSnippetExpansion(cm)) {
    event.preventDefault();
    return;
  }
  if (event.key !== "Backspace") clearLastSnippetExpansion();

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
  const rules = currentEnabledAutoCompletionRules();
  const trigger = Object.keys(rules)
    .filter((candidate) => lineBeforeCursor.endsWith(candidate))
    .sort((a, b) => b.length - a.length)[0];

  if (!trigger) return;
  const triggerStart = cursor.ch - trigger.length;
  const beforeTrigger = triggerStart > 0 ? lineBeforeCursor[triggerStart - 1] : "";
  if (beforeTrigger && /[A-Za-z0-9_]/.test(beforeTrigger)) return;

  const snippet = parseSnippetTemplate(rules[trigger]);
  const from = { line: cursor.line, ch: triggerStart };
  const to = positionFromTextOffset(snippet.text, snippet.text.length, from);
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
    lastSnippetExpansion = {
      from,
      to,
      trigger,
      cursor: cm.getCursor(),
      generation: typeof cm.changeGeneration === "function" ? cm.changeGeneration() : null
    };
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

function sameEditorPosition(a, b) {
  return Boolean(a && b && a.line === b.line && a.ch === b.ch);
}

function undoLastSnippetExpansion(cm) {
  if (!lastSnippetExpansion || cm.somethingSelected()) return false;
  const { from, to, trigger, cursor, generation } = lastSnippetExpansion;
  if (!sameEditorPosition(cm.getCursor(), cursor)) return false;
  if (generation !== null && typeof cm.isClean === "function" && !cm.isClean(generation)) {
    clearLastSnippetExpansion();
    return false;
  }
  cm.operation(() => {
    clearSnippetSession();
    cm.replaceRange(trigger, from, to, "+completionUndo");
    cm.setCursor({ line: from.line, ch: from.ch + trigger.length });
  });
  clearLastSnippetExpansion();
  return true;
}

function clearLastSnippetExpansion() {
  lastSnippetExpansion = null;
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
  els.createFirstFileBtn.textContent = `Create a ${LANGUAGE_CONFIG[language]?.label || "C++"} File`;
  codeEditor?.setOption("readOnly", empty ? "nocursor" : false);
}

function setEditorLanguage(language) {
  if (!codeEditor) return;
  const mode = language === "python" ? "python" : language === "java" ? "text/x-java" : "text/x-c++src";
  codeEditor.setOption("mode", mode);
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
  if (editorView !== "code") return [];
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
  layoutState.expectedHeight = clamp(layoutState.expectedHeight, 15, 82);

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
  els.outputSection.style.setProperty("--expected-height", `${layoutState.expectedHeight}%`);
  const expectedRight = layoutState.expectedSide === "right";
  if (els.outputBody) els.outputBody.classList.toggle("expected-right", expectedRight);
  if (els.expectedResizeHandle) {
    els.expectedResizeHandle.classList.toggle("vertical-handle", expectedRight);
    els.expectedResizeHandle.classList.toggle("horizontal-handle", !expectedRight);
  }
  if (els.expectedPlacementBtn) {
    els.expectedPlacementBtn.textContent = expectedRight ? "⤓" : "⇥";
    const title = expectedRight ? "Move Expected below" : "Move Expected to the right";
    els.expectedPlacementBtn.title = title;
    els.expectedPlacementBtn.setAttribute("aria-label", title);
  }

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
  localStorage.setItem("rathee.layoutVersion", String(LAYOUT_SETTINGS_VERSION));
  localStorage.setItem("rathee.sideWidth", String(layoutState.sideWidth));
  localStorage.setItem("rathee.inputHeight", String(layoutState.inputHeight));
  localStorage.setItem("rathee.showDebug", String(layoutState.showDebug));
  localStorage.setItem("rathee.debugHeight", String(layoutState.debugHeight));
  localStorage.setItem("rathee.debugStackWidth", String(layoutState.debugStackWidth));
  localStorage.setItem("rathee.expectedHeight", String(layoutState.expectedHeight));
  localStorage.setItem("rathee.expectedSide", layoutState.expectedSide);
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
  currentSettingsTab = target;
  els.settingsTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.settingsTab === target);
  });
  els.appearanceSettings.hidden = target !== "appearance";
  els.editorSettings.hidden = target !== "editor";
  els.profileSettings.hidden = target !== "profile";
  els.templateSettings.hidden = target !== "templates";
  els.autoCompletionSettings.hidden = target !== "autocomplete";
  if (target === "autocomplete") {
    autoSizeAllCompletionTextareas();
    refreshAutoCompletionFromAccount().catch(() => {});
  }
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
  // Re-render the Google button so its theme follows light/dark (only matters
  // when signed out and the GIS script is ready).
  if (!isAuthed() && window.google?.accounts?.id) renderAuth();
  applyUiZoom();
  requestAnimationFrame(() => codeEditor?.refresh());
}

function clampZoom(value) {
  if (!Number.isFinite(value)) return 0.9;
  return Math.min(1.1, Math.max(0.7, value));
}

function applyUiZoom() {
  uiZoom = clampZoom(uiZoom);
  document.documentElement.style.setProperty("--ui-zoom", String(uiZoom));
  document.documentElement.style.setProperty("--editor-counter-zoom", String(1 / uiZoom));
  localStorage.setItem("rathee.uiZoom", String(uiZoom));
  const percent = Math.round(uiZoom * 100);
  if (els.uiZoomRange) els.uiZoomRange.value = String(percent);
  if (els.uiZoomValue) els.uiZoomValue.textContent = `${percent}%`;
  // Re-measure so the caret height matches the line box after a zoom change.
  requestAnimationFrame(() => codeEditor?.refresh());
}

function setUiZoom(percent) {
  uiZoom = clampZoom(Number(percent) / 100);
  applyUiZoom();
  scheduleAppSettingsSave();
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
    renderAuth(); // (re)render the Google button now the dropdown is visible
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
  setEditorQuickSettings(!editorQuickSettingsOpen);
}

function setEditorQuickSettings(open) {
  editorQuickSettingsOpen = open;
  els.editorQuickSettings.hidden = !open;
  els.editorQuickSettingsBtn.setAttribute("aria-expanded", String(open));
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
  els.expectedResizeHandle?.addEventListener("pointerdown", (event) => startResize(event, "expected-split"));
  els.drawerSectionResize?.addEventListener("pointerdown", (event) => startResize(event, "folders"));
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
  const outputBodyRect = els.outputBody?.getBoundingClientRect();
  const startExpectedHeight = layoutState.expectedHeight;
  const startFoldersHeight = els.foldersSection?.offsetHeight || 0; // CSS px (unaffected by shell zoom)
  const startContestsHeight = (els.savedContestSection && !els.savedContestSection.hidden)
    ? els.savedContestSection.offsetHeight : 0;
  // Visible space above the divider (CSS px) — folders can't grow past it,
  // so the content above (temp files / contests header) stays on screen.
  const sectionContainer = els.foldersSection?.parentElement || null;
  const spaceAboveCss = (sectionContainer && els.drawerSectionResize)
    ? Math.max(0, (els.drawerSectionResize.getBoundingClientRect().top - sectionContainer.getBoundingClientRect().top) / (uiZoom || 1))
    : Infinity;
  // Lock the resize cursor across the whole page while dragging (otherwise it
  // reverts to the arrow once the pointer leaves the thin handle).
  const rowResize = target === "io" || target === "debug" || target === "folders"
    || (target === "expected-split" && layoutState.expectedSide !== "right");
  document.body.classList.add("resizing", rowResize ? "resizing-row" : "resizing-col");

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
    if (target === "expected-split" && outputBodyRect?.height) {
      // Expected sits below (bottom) or to the right; dragging the handle toward
      // the editor (up / left) grows it. Same formula on the relevant axis.
      const delta = layoutState.expectedSide === "right"
        ? (moveEvent.clientX - startX) / outputBodyRect.width
        : (moveEvent.clientY - startY) / outputBodyRect.height;
      layoutState.expectedHeight = clamp(startExpectedHeight - delta * 100, 15, 82);
    }
    if (target === "folders" && els.foldersSection) {
      // Drag up → taller Folders section. The cursor delta is in visual pixels;
      // divide by the shell zoom to get CSS pixels so the line tracks the cursor
      // exactly (no jump). startFoldersHeight is offsetHeight (already CSS px).
      const dyCss = (startY - moveEvent.clientY) / (uiZoom || 1);
      // Cap growth so the Contests section keeps room for its "Saved Contests"
      // header (folders grows 1:1 as contests shrinks).
      const CONTESTS_MIN = 76; // keep the "Saved Contests" header visible
      const MIN_ABOVE = 96;    // keep room above the divider when no contests
      let maxFolders = (window.innerHeight / (uiZoom || 1)) - 160;
      if (Number.isFinite(spaceAboveCss)) maxFolders = Math.min(maxFolders, startFoldersHeight + spaceAboveCss - MIN_ABOVE);
      if (startContestsHeight > 0) maxFolders = Math.min(maxFolders, startFoldersHeight + startContestsHeight - CONTESTS_MIN);
      const h = clamp(startFoldersHeight + dyCss, 64, Math.max(64, maxFolders));
      els.foldersSection.style.height = `${h}px`;
      return; // folders height is a direct style, not part of applyWorkspaceLayout
    }
    applyWorkspaceLayout();
  };

  const onUp = () => {
    document.body.classList.remove("resizing", "resizing-row", "resizing-col");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    if (target === "folders" && els.foldersSection) {
      localStorage.setItem("rathee.foldersHeight", String(parseInt(els.foldersSection.style.height, 10) || 220));
    }
  };

  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp, { once: true });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function switchLanguage() {
  endDebugSessionOnContextChange();
  const nextLanguage = currentLanguageValue();
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
  const state = languageState(language);
  const activeFile = state.active;
  const files = state.files;
  const inputs = state.inputs;
  setEditorCode(activeFile ? files[activeFile] : "");
  activeTestIndex = 0; clearTestRun(); refreshIoPanels();
  renderFileTabs();
  renderSavedContests(); // open-contest file rows are language-specific
  renderFolders();
  if (!els.settingsOverlay.hidden && currentSettingsTab === "autocomplete") renderAutoCompletionSettings();
  updateEditorEmptyState();
  updateEditorActionButton();
  setStatus("Idle", "idle");
}

function openProblemCode() {
  switchEditorView("code");
  // Signed-in users re-sync their files from the account. Anonymous users keep
  // their in-memory files as-is — reloading would fetch nothing and wipe them,
  // which is what made temporary files vanish after editing a template. A
  // template change only affects files created afterwards (addNextCodeFile).
  if (!isAuthed()) return;
  if (els.language.value === "python") loadWorkspacePythonFiles();
  else if (els.language.value === "java") loadWorkspaceJavaFiles();
  else loadWorkspaceCppFiles();
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
  // Anonymous: keep only this session's in-memory (just-imported) contest;
  // nothing is loaded from the server, and it's gone on refresh.
  if (!isAuthed()) {
    savedContests = savedContests.filter((c) => c.inMemory);
    renderSavedContests();
    renderFolders(); // anonymous folders are kept in memory for the session
    return;
  }
  try {
    const res = await fetch("/api/me/workspace", { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load saved contests.");
    // Group the actual stored files per contest/language so the drawer can list
    // what really exists (after deletes/renames), not just the canonical problems.
    const filesByContest = {};
    for (const f of data.files || []) {
      if (f.scope !== "contest") continue;
      const cid = String(f.contestId);
      const bucket = filesByContest[cid] || (filesByContest[cid] = { cpp: [], python: [], java: [] });
      if (SUPPORTED_LANGUAGES.includes(f.language)) bucket[f.language].push(f.filename);
    }
    savedContests = (data.contests || []).map((c) => ({
      name: c.name || `Contest ${c.contestId}`,
      contestId: String(c.contestId),
      contestDir: "",
      language: c.language || "cpp",
      problems: c.problems || [],
      problemCount: (c.problems || []).length,
      files: filesByContest[String(c.contestId)] || { cpp: [], python: [], java: [] },
      savedAt: c.savedAt || "",
      state: c.state || "active",
      account: true
    }));
    // Keep the Temporary Code Files cache fresh from the account too, so its list
    // is the latest (e.g. after deletes) even while a contest is the open scope.
    // In workspace scope the live arrays are the source of truth, so leave them.
    if (codeFileScope !== "workspace") {
      tempCppNames = (data.files || []).filter((f) => f.scope === "scratch" && f.language === "cpp").map((f) => f.filename);
      tempPyNames = (data.files || []).filter((f) => f.scope === "scratch" && f.language === "python").map((f) => f.filename);
      tempJavaNames = (data.files || []).filter((f) => f.scope === "scratch" && f.language === "java").map((f) => f.filename);
    }
    // Folders come from the same account fetch: group their files per language,
    // and record per-file timestamps (for the create/edit sorts).
    const filesByFolder = {};
    const lastEditedByFolder = {};
    folderFileMeta = {};
    for (const f of data.files || []) {
      if (f.scope !== "folder") continue;
      const fid = String(f.contestId);
      const bucket = filesByFolder[fid] || (filesByFolder[fid] = { cpp: [], python: [], java: [] });
      if (SUPPORTED_LANGUAGES.includes(f.language)) {
        bucket[f.language].push(f.filename);
        const created = f.createdAt ? Date.parse(f.createdAt) : 0;
        const updated = f.updatedAt ? Date.parse(f.updatedAt) : 0;
        folderFileMeta[folderMetaKey(fid, f.language, f.filename)] = { created, updated };
        lastEditedByFolder[fid] = Math.max(lastEditedByFolder[fid] || 0, updated);
      }
    }
    savedFolders = (data.folders || []).map((f) => ({
      folderId: String(f.folderId),
      name: f.name || "Folder",
      problems: Array.isArray(f.problems) ? f.problems : [],
      createdAt: f.createdAt,
      lastEdited: lastEditedByFolder[String(f.folderId)] || (f.createdAt ? Date.parse(f.createdAt) : 0),
      state: f.state || "active",
      files: filesByFolder[String(f.folderId)] || { cpp: [], python: [], java: [] }
    }));
    renderSavedContests();
    renderTempFiles();
    renderFolders();
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

function setContestView(view) {
  contestView = SECTION_VIEWS.includes(view) ? view : "active";
  localStorage.setItem("rathee.contestView", contestView);
  renderSavedContests();
}
function setFolderView(view) {
  folderView = SECTION_VIEWS.includes(view) ? view : "active";
  localStorage.setItem("rathee.folderView", folderView);
  renderFolders();
}

// Persist a contest/folder lifecycle state (active/archived/deleted) to the
// account; if it's the open scope and we're moving it out of "active", leave it.
function setContestStateRemote(contestId, state) {
  if (isAuthed()) fetch("/api/me/contest/state", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contestId, state }) }).catch(() => {});
}
function setFolderStateRemote(folderId, state) {
  if (isAuthed()) fetch("/api/me/folder/state", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ folderId, state }) }).catch(() => {});
}

function changeContestState(contest, state) {
  if (state !== "active" && codeFileScope === "contest" && String(activeContestId) === String(contest.contestId)) leaveScopeToWorkspace();
  contest.state = state;
  setContestStateRemote(contest.contestId, state);
  renderSavedContests();
}
function changeFolderState(folder, state) {
  if (state !== "active" && codeFileScope === "folder" && String(activeFolderId) === String(folder.folderId)) leaveScopeToWorkspace();
  folder.state = state;
  setFolderStateRemote(folder.folderId, state);
  renderFolders();
}

// Leave the current contest/folder scope back to the workspace (used when the
// open item is archived/binned so it disappears from the active view).
function leaveScopeToWorkspace() {
  codeFileScope = "workspace";
  activeContestId = "";
  activeContestDir = "";
  activeFolderId = "";
  if (isAuthed()) {
    Promise.all([loadWorkspaceCppFiles(), loadWorkspacePythonFiles(), loadWorkspaceJavaFiles()]).catch(() => {});
  } else if (!restoreContext("workspace")) {
    cppFileNames = []; cppFiles = {}; cppInputs = {}; cppTabLabels = {}; cppProblems = {}; activeCppFile = ""; openCppTabs = [];
    pyFileNames = []; pyFiles = {}; pyInputs = {}; pyTabLabels = {}; pyProblems = {}; activePyFile = ""; openPyTabs = [];
    javaFileNames = []; javaFiles = {}; javaInputs = {}; javaTabLabels = {}; javaProblems = {}; activeJavaFile = ""; openJavaTabs = [];
    renderCurrentContext();
  } else {
    renderCurrentContext();
  }
}

const CONTEST_LABELS = { active: "Saved Contests", archived: "Archived Contests", bin: "Deleted Contests" };
const FOLDER_LABELS = { active: "Folders", archived: "Archived Folders", bin: "Deleted Folders" };

function renderSavedContests() {
  els.savedContestList.innerHTML = "";
  if (els.contestSectionLabel) els.contestSectionLabel.textContent = CONTEST_LABELS[contestView] || CONTEST_LABELS.active;
  if (els.contestArchiveToggle) els.contestArchiveToggle.classList.toggle("active", contestView === "archived");
  if (els.contestBinToggle) els.contestBinToggle.classList.toggle("active", contestView === "bin");
  els.contestSortItems.forEach((item) =>
    item.classList.toggle("active", item.dataset.sortValue === contestSortMode));
  if (!savedContests.length) {
    els.savedContestSection.hidden = true;
    return;
  }
  els.savedContestSection.hidden = false;
  const viewContests = sortedSavedContests().filter((c) => (c.state || "active") === VIEW_STATE[contestView]);
  if (!viewContests.length) {
    const row = document.createElement("div");
    row.className = "temp-file-empty-row";
    const span = document.createElement("span");
    span.className = "temp-file-empty";
    span.textContent = contestView === "bin" ? "Bin is empty" : contestView === "archived" ? "No archived contests" : "No saved contests";
    row.append(span);
    els.savedContestList.append(row);
    return;
  }
  for (const contest of viewContests) {
    const contestKey = contestKeyFor(contest);
    const expanded = expandedContestKeys.has(contestKey);
    const group = document.createElement("div");
    group.className = "saved-contest-group";

    const header = document.createElement("div");
    header.className = "saved-contest-header";

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

    // Reload = Status for this contest's problems (with the same info tooltip).
    const reloadWrap = document.createElement("div");
    reloadWrap.className = "folder-reload-wrap";
    const reloadBtn = document.createElement("button");
    reloadBtn.type = "button";
    reloadBtn.className = "temp-file-action folder-reload-btn contest-reload-btn";
    reloadBtn.setAttribute("aria-label", `Refresh statuses in ${contest.name}`);
    reloadBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></svg>';
    reloadBtn.addEventListener("click", (event) => { event.stopPropagation(); refreshRecentVerdicts(); });
    const reloadTip = document.createElement("span");
    reloadTip.className = "status-info-tip";
    reloadTip.innerHTML = "Click to refresh the Codeforces <strong>status</strong> of <em>every problem</em> in this contest.";
    reloadWrap.append(reloadBtn, reloadTip);

    // Actions vary by view: active → reload+archive+delete(→bin); archived →
    // reload+restore+delete(→bin); bin → restore + delete-forever.
    const mkBtn = (cls, html, title, onClick) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `temp-file-action ${cls}`;
      b.title = title;
      b.innerHTML = html;
      b.addEventListener("click", (event) => { event.stopPropagation(); onClick(); });
      return b;
    };
    const acts = [];
    if (contestView !== "bin") acts.push(reloadWrap);
    if (contestView === "active") acts.push(mkBtn("", ICON_ARCHIVE, `Archive ${contest.name}`, () => changeContestState(contest, "archived")));
    if (contestView !== "active") acts.push(mkBtn("", ICON_RESTORE, `Restore ${contest.name}`, () => changeContestState(contest, "active")));
    acts.push(contestView === "bin"
      ? mkBtn("temp-file-delete", ICON_DELETE, `Delete ${contest.name} permanently`, () => permanentlyDeleteContest(contest))
      : mkBtn("temp-file-delete contest-delete-btn", ICON_DELETE, `Delete contest ${contest.name}`, () => deleteContest(contest)));

    const actionBox = document.createElement("div");
    actionBox.className = "saved-contest-actions";
    actionBox.append(...acts);
    header.append(button, actionBox);
    group.append(header);

    if (expanded) {
      const list = document.createElement("div");
      list.className = "contest-problem-list";
      const language = currentLanguageValue();
      const ext = LANGUAGE_CONFIG[language]?.extension || ".cpp";
      const isOpen = codeFileScope === "contest" && String(activeContestId) === String(contest.contestId);
      // Map canonical filenames to their problem labels (e.g. "A.cpp" -> "A. Hello").
      const labelByName = {};
      for (const p of contest.problems || []) labelByName[`${p.index}${ext}`] = `${p.index}. ${p.name || "Problem"}`;
      if (isOpen) {
        // Contest is loaded: show its actual files for the current language
        // (canonical problems + any renamed/extra files) with rename/delete,
        // just like temporary files. Keep the entry's file list in sync so a
        // collapse (or future reopen) reflects the current state.
        const state = languageState(language);
        const names = state.names;
        const tabLabels = state.labels;
        contest.files = { cpp: cppFileNames.slice(), python: pyFileNames.slice(), java: javaFileNames.slice() };
        const activeFile = currentActiveFile();
        for (const filename of names) {
          const isActive = editorView === "code" && filename === activeFile;
          const ctx = { language: els.language.value, scope: "contest", contestId: String(contest.contestId), filename };
          const row = createManagedFileRow(ctx, tabLabels[filename] || filename, isActive, () => switchCodeFile(filename), true);
          list.append(row);
        }
      } else {
        // Contest not loaded: list the files that actually exist for this
        // language. "Known" means we've loaded this contest's file list (the
        // array exists, even if empty) — then we show exactly those, so deleted
        // files don't reappear. Only when the list is UNKNOWN (never loaded) do
        // we fall back to the canonical problem names so the contest is openable.
        const known = contest.files && Array.isArray(contest.files[language]);
        const stored = known
          ? contest.files[language].slice().sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
          : [];
        const names = known ? stored : (contest.problems || []).map((p) => `${p.index}${ext}`);
        for (const filename of names) {
          const ctx = { language: els.language.value, scope: "contest", contestId: String(contest.contestId), filename };
          // Only real (known) stored files are manageable; canonical fallbacks aren't files yet.
          const manageable = isAuthed() && known;
          const row = createManagedFileRow(ctx, labelByName[filename] || filename, false, () => loadSavedContest(contest, filename.slice(0, -ext.length)), manageable);
          list.append(row);
        }
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

// Delete an entire contest: its account rows (files + registration) when signed
// in, plus its in-memory snapshot and drawer entry. If it's the open contest,
// fall back to the temp workspace afterwards.
// Promise-based confirmation modal with a blurred backdrop (like Settings).
// Resolves true on confirm, false on cancel / backdrop / Escape.
function openConfirm({ title = "Are you sure?", message = "", confirmLabel = "Delete" } = {}) {
  return new Promise((resolve) => {
    els.confirmTitle.textContent = title;
    els.confirmMessage.innerHTML = message;
    els.confirmOkBtn.textContent = confirmLabel;
    els.confirmOverlay.hidden = false;
    const cleanup = (result) => {
      els.confirmOverlay.hidden = true;
      els.confirmOkBtn.removeEventListener("click", onOk);
      els.confirmCancelBtn.removeEventListener("click", onCancel);
      els.confirmOverlay.removeEventListener("mousedown", onBackdrop);
      document.removeEventListener("keydown", onKey);
      resolve(result);
    };
    const onOk = () => cleanup(true);
    const onCancel = () => cleanup(false);
    const onBackdrop = (event) => { if (event.target === els.confirmOverlay) cleanup(false); };
    const onKey = (event) => { if (event.key === "Escape") cleanup(false); };
    els.confirmOkBtn.addEventListener("click", onOk);
    els.confirmCancelBtn.addEventListener("click", onCancel);
    els.confirmOverlay.addEventListener("mousedown", onBackdrop);
    document.addEventListener("keydown", onKey);
    els.confirmOkBtn.focus();
  });
}

// Delete = move the contest to the Bin (recoverable). Files are kept.
async function deleteContest(contest) {
  const ok = await openConfirm({
    title: "Delete contest",
    message: `Move contest <strong>${escapeHtml(contest.name || contest.contestId)}</strong> to the Bin?`,
    confirmLabel: "Delete"
  });
  if (!ok) return;
  changeContestState(contest, "deleted");
  setStatus("Moved to Bin", "idle");
  els.meta.textContent = `${contest.name} moved to Bin`;
}

// Permanently remove a contest from the Bin: its account rows (files +
// registration) and in-memory entry. If it's the open contest, fall back to
// the temp workspace afterwards.
async function permanentlyDeleteContest(contest) {
  const ok = await openConfirm({
    title: "Delete permanently",
    message: `Permanently delete contest <strong>${escapeHtml(contest.name || contest.contestId)}</strong> and all its files? This cannot be undone.`,
    confirmLabel: "Delete forever"
  });
  if (!ok) return;
  const cid = String(contest.contestId || "");
  const wasOpen = codeFileScope === "contest" && String(activeContestId) === cid;
  if (isAuthed() && cid) {
    await fetch("/api/me/contest", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contestId: cid })
    }).catch(() => {});
  }
  contextSnapshots.delete(`contest:${cid}`);
  savedContests = savedContests.filter((c) => String(c.contestId) !== cid);
  expandedContestKeys.delete(contestKeyFor(contest));
  if (wasOpen) {
    codeFileScope = "workspace";
    activeContestId = "";
    activeContestDir = "";
    if (isAuthed()) {
      await Promise.all([loadWorkspaceCppFiles(), loadWorkspacePythonFiles(), loadWorkspaceJavaFiles()]).catch(() => {});
    } else {
      if (!restoreContext("workspace")) {
        cppFileNames = []; cppFiles = {}; cppInputs = {}; cppTabLabels = {}; cppProblems = {}; activeCppFile = ""; openCppTabs = [];
        pyFileNames = []; pyFiles = {}; pyInputs = {}; pyTabLabels = {}; pyProblems = {}; activePyFile = ""; openPyTabs = [];
        javaFileNames = []; javaFiles = {}; javaInputs = {}; javaTabLabels = {}; javaProblems = {}; activeJavaFile = ""; openJavaTabs = [];
      }
      renderCurrentContext();
    }
  }
  renderSavedContests();
  setStatus("Deleted", "idle");
  els.meta.textContent = `Contest ${contest.name} deleted`;
}

async function loadSavedContest(contest, targetProblemIndex = "") {
  if (contest?.inMemory) {
    // Anonymous session contest held in memory. If it's already the open scope,
    // just switch the problem; otherwise restore its snapshot (preserving the
    // context we leave), so temp files and the contest can coexist.
    const cid = String(contest.contestId || "");
    const ext = LANGUAGE_CONFIG[currentLanguageValue()]?.extension || ".cpp";
    if (codeFileScope === "contest" && String(activeContestId) === cid) {
      const fn = targetProblemIndex ? `${targetProblemIndex}${ext}` : "";
      if (fn && currentFileNames().includes(fn) && (currentActiveFile() !== fn || editorView !== "code")) switchCodeFile(fn);
      return;
    }
    stashCurrentContext();
    codeFileScope = "contest";
    activeContestId = cid;
    activeContestDir = contest.contestDir || "";
    restoreContext(`contest:${cid}`);
    const want = targetProblemIndex ? `${targetProblemIndex}${ext}` : "";
    const names = currentFileNames();
    const target = want && names.includes(want) ? want : (currentActiveFile() && names.includes(currentActiveFile()) ? currentActiveFile() : names[0] || "");
    if (target) languageState().setActive(target);
    renderCurrentContext();
    return;
  }
  if (contest?.account || (isAuthed() && contest?.contestId)) {
    await openAccountContest(contest, targetProblemIndex);
  }
}

// Reopen a contest stored in the signed-in user's account. Problem files for
// both languages come from the DB (scope='contest'); we feed them to
// applyContestProblems via its `stored` override so edits are preserved.
async function openAccountContest(contest, targetProblemIndex = "") {
  const contestId = String(contest.contestId || "");
  if (!contestId) return;
  els.contestUrl.value = `https://codeforces.com/contest/${contestId}`;
  updateContestChip();
  saveCurrentState();
  setImportBusy(true);
  setStatus("Loading", "idle");
  els.meta.textContent = "Loading saved contest...";
  try {
    const res = await fetch("/api/me/workspace", { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not load contest.");
    const stored = { cpp: {}, python: {}, java: {} };
    for (const f of data.files || []) {
      if (f.scope !== "contest" || String(f.contestId) !== contestId) continue;
      if (SUPPORTED_LANGUAGES.includes(f.language)) {
        stored[f.language][f.filename] = { content: f.content || "", input: f.input || "", tests: f.tests || null };
      }
    }
    recentContest = {
      url: `https://codeforces.com/contest/${contestId}`,
      name: contest.name,
      contestId,
      contestDir: ""
    };
    localStorage.setItem("rathee.recentContest", JSON.stringify(recentContest));
    scheduleAppSettingsSave();
    // Use the freshly-fetched problem metadata (samples included) rather than the
    // possibly-stale savedContests entry loaded earlier.
    const freshContest = (data.contests || []).find((c) => String(c.contestId) === contestId);
    const synthetic = {
      contestId,
      name: contest.name,
      problems: (freshContest && freshContest.problems) || contest.problems || [],
      files: { language: els.language.value, contestDir: "" }
    };
    // Reopen shows exactly what's saved (onlyStored) so deleted files stay gone.
    applyContestProblems(synthetic, { source: "saved", stored, onlyStored: true });
    if (targetProblemIndex) {
      const ext = LANGUAGE_CONFIG[els.language.value]?.extension || ".cpp";
      const fn = `${targetProblemIndex}${ext}`;
      if (currentFileNames().includes(fn) && (currentActiveFile() !== fn || editorView !== "code")) switchCodeFile(fn);
    }
  } catch (error) {
    setDebuggerOutput(error.message);
    setStatus("Load failed", "error");
    els.meta.textContent = "Saved contest could not be loaded";
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
  if (view === "java-template") {
    els.language.value = "java";
  }
  currentLanguage = els.language.value;
  els.quickLanguage.value = els.language.value;
  editorView = view;
  setEditorLanguage(els.language.value);
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
  if (editorView === "java-template") return javaCode;
  const state = languageState();
  return state.active ? state.files[state.active] || "" : "";
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
    languageState().setTempNames(currentFileNames().slice());
  }
  const names = languageState().tempNames;
  if (!names.length) {
    const row = document.createElement("div");
    row.className = "temp-file-empty-row";
    const empty = document.createElement("span");
    empty.className = "temp-file-empty";
    empty.textContent = "No files yet";
    const create = document.createElement("button");
    create.type = "button";
    create.className = "temp-create-file";
    const name = LANGUAGE_CONFIG[els.language.value]?.defaultFile || "A.cpp";
    create.textContent = `+ ${name}`;
    create.title = `Create ${name}`;
    create.addEventListener("click", createFirstTempFile);
    row.append(empty, create);
    els.tempFileList.append(row);
    return;
  }

  const labels = inWorkspace ? currentTabLabels() : {};
  const activeFile = currentActiveFile();
  const language = els.language.value;
  // Workspace files are manageable when they're the live list (any session) or
  // for signed-in users even while a contest is open (their files persist).
  const manageable = inWorkspace || isAuthed();
  for (const filename of names) {
    const isActive = inWorkspace && editorView === "code" && filename === activeFile;
    const ctx = { language, scope: "workspace", contestId: "", filename };
    const row = createManagedFileRow(ctx, labels[filename] || filename, isActive, () => openTempFile(filename), manageable);
    els.tempFileList.append(row);
  }
}

// Build a drawer file row: an open button plus hover rename/delete icons. `ctx`
// is the file's full target {language, scope, contestId, filename} so the
// rename/delete handlers work even when the file isn't in the active editor
// (e.g. managing contest files while in the workspace, or vice versa). When
// `manageable` is false the icons are omitted (read-only row).
function createManagedFileRow(ctx, label, isActive, onOpen, manageable) {
  const filename = ctx.filename;
  const row = document.createElement("div");
  row.className = "temp-file-row";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "contest-problem-btn temp-file-btn";
  btn.textContent = label || filename;
  btn.title = btn.textContent;
  btn.classList.toggle("active", Boolean(isActive));
  btn.addEventListener("click", onOpen);
  row.append(btn);

  // Codeforces verdict badge (shown when not hovering; hover reveals the actions).
  // Once fetched, a problem with no submission shows "No submission".
  const pkey = problemKeyForCtx(ctx);
  const entry = pkey ? problemVerdicts[pkey] : null;
  if (entry) {
    const disp = entry.verdict ? verdictDisplay(entry.verdict) : { text: "No submission", cls: "none" };
    const status = document.createElement("span");
    status.className = `temp-file-status ${disp.cls}`;
    status.textContent = disp.text;
    row.append(status);
  }

  if (manageable) {
    const actions = document.createElement("div");
    actions.className = "temp-file-actions";

    const renameBtn = document.createElement("button");
    renameBtn.type = "button";
    renameBtn.className = "temp-file-action";
    renameBtn.title = `Rename ${filename}`;
    renameBtn.innerHTML = ICON_RENAME;
    renameBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      beginRenameInline(row, ctx);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "temp-file-action temp-file-delete";
    deleteBtn.title = `Delete ${filename}`;
    deleteBtn.innerHTML = ICON_DELETE;
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteDrawerFile(ctx);
    });

    actions.append(renameBtn, deleteBtn);
    row.append(actions);
  }
  return row;
}

// Is this file the one in the active editor context? (Live arrays are the
// current language only, so language must match too.)
function isActiveFileContext(ctx) {
  if (ctx.language !== els.language.value) return false;
  if (ctx.scope === "workspace") return codeFileScope === "workspace";
  if (ctx.scope === "contest") return codeFileScope === "contest" && String(activeContestId) === String(ctx.contestId);
  if (ctx.scope === "folder") return codeFileScope === "folder" && String(activeFolderId) === String(ctx.contestId);
  return false;
}

// Re-render the tab strip and both drawer file lists (temp + saved contests)
// after a file add/rename/delete, so every view stays in sync regardless of scope.
function refreshDrawerAndTabs() {
  renderFileTabs(); // also re-renders the Temporary Code Files list
  renderSavedContests();
  renderFolders();
}

// ===================== User folders =====================

// Draggable divider between Saved Contests and Folders: drag adjusts the Folders
// section height; persisted in localStorage.
// Restore the saved Folders-section height on load. The drag itself is handled
// by the unified startResize("folders") wired in initResizablePanes, so it
// highlights and behaves like every other resize handle.
function initSectionResize() {
  const section = els.foldersSection;
  if (!section) return;
  const saved = Number(localStorage.getItem("rathee.foldersHeight"));
  if (saved && saved > 64) section.style.height = `${saved}px`;
}

function generateFolderId() {
  return `fld-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

function nextFolderName() {
  const used = new Set(savedFolders.map((f) => f.name));
  let n = savedFolders.length + 1;
  while (used.has(`Folder ${n}`)) n += 1;
  return `Folder ${n}`;
}

// Build the live file arrays for all languages from a stored map and make it the active set.
// Imported problem files are named `<contestId><index>` (e.g. 1700A.cpp), with a
// possible `_2` uniqueness suffix. The server stores only code/input, not the CF
// identity, so recover {contestId, index} from the filename when reloading a
// folder — otherwise Submit/Status can't tell which problem the tab belongs to.
function deriveProblemFromFilename(filename) {
  const base = String(filename || "").replace(/\.[^.]+$/, "").replace(/_\d+$/, "");
  const match = base.match(/^(\d+)([A-Za-z]\d*)$/);
  if (!match) return null;
  return { contestId: match[1], index: match[2].toUpperCase() };
}

// CF problem identity for a drawer row, used to look up its verdict badge.
// Folder files embed the id in the name (1904A.cpp); contest files are just the
// index (A.cpp) with the id coming from the open contest.
function problemKeyForCtx(ctx) {
  if (!ctx) return null;
  if (ctx.scope === "contest") {
    const index = String(ctx.filename).replace(/\.[^.]+$/, "").toUpperCase();
    return ctx.contestId && index ? `${ctx.contestId}|${index}` : null;
  }
  if (ctx.scope === "folder") {
    const d = deriveProblemFromFilename(ctx.filename);
    return d ? `${d.contestId}|${d.index}` : null;
  }
  return null;
}

// Look up a folder file's Codeforces problem name from the folder's persisted
// problem list (matched by contestId+index derived from the filename), so the
// "<file> - <name>" tab label survives a reload.
// Build a { filename: [{input, expected}] } sample map by matching each file's
// derived contestId+index against the folder's persisted problem list.
function samplesForFiles(names, problemList) {
  const map = {};
  for (const name of names) {
    const d = deriveProblemFromFilename(name);
    if (!d) continue;
    const p = (problemList || []).find((pr) =>
      String(pr.contestId) === String(d.contestId) && String(pr.index).toUpperCase() === d.index);
    if (p && Array.isArray(p.samples) && p.samples.length) {
      map[name] = p.samples.map((s) => ({ input: s.input || "", expected: s.output ?? s.expected ?? "" }));
    }
  }
  return map;
}

function folderProblemNameFor(filename, problemList) {
  const derived = deriveProblemFromFilename(filename);
  if (!derived || !Array.isArray(problemList)) return "";
  const match = problemList.find((p) =>
    String(p.contestId) === String(derived.contestId) &&
    String(p.index).toUpperCase() === derived.index);
  return match?.name || "";
}

function setArraysFromStored(stored, problemList = []) {
  const build = (lang) => {
    const saved = (stored && stored[lang]) || {};
    const names = Object.keys(saved).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    const labelFor = (n) => {
      const name = folderProblemNameFor(n, problemList);
      return name ? `${n} - ${name}` : n;
    };
    return {
      names,
      files: Object.fromEntries(names.map((n) => [n, saved[n].content || ""])),
      inputs: Object.fromEntries(names.map((n) => [n, saved[n].input || ""])),
      labels: Object.fromEntries(names.map((n) => [n, labelFor(n)])),
      problems: Object.fromEntries(names.map((n) => [n, deriveProblemFromFilename(n)]))
    };
  };
  const c = build("cpp");
  const p = build("python");
  const j = build("java");
  cppFileNames = c.names; cppFiles = c.files; cppInputs = c.inputs; cppTabLabels = c.labels; cppProblems = c.problems; openCppTabs = c.names.slice();
  pyFileNames = p.names; pyFiles = p.files; pyInputs = p.inputs; pyTabLabels = p.labels; pyProblems = p.problems; openPyTabs = p.names.slice();
  javaFileNames = j.names; javaFiles = j.files; javaInputs = j.inputs; javaTabLabels = j.labels; javaProblems = j.problems; openJavaTabs = j.names.slice();
  cppSamples = buildTestsMap(c.names.map((n) => ({ filename: n, input: c.inputs[n], tests: stored.cpp?.[n]?.tests })));
  pySamples = buildTestsMap(p.names.map((n) => ({ filename: n, input: p.inputs[n], tests: stored.python?.[n]?.tests })));
  javaSamples = buildTestsMap(j.names.map((n) => ({ filename: n, input: j.inputs[n], tests: stored.java?.[n]?.tests })));
  activeCppFile = cppFileNames[0] || "";
  activePyFile = pyFileNames[0] || "";
  activeJavaFile = javaFileNames[0] || "";
}

async function fetchFolderFiles(folderId) {
  const stored = { cpp: {}, python: {}, java: {} };
  if (!isAuthed()) return stored;
  try {
    const res = await fetch("/api/me/workspace", { cache: "no-store" });
    const data = await res.json();
    for (const f of data.files || []) {
      if (f.scope === "folder" && String(f.contestId) === String(folderId)) {
        if (SUPPORTED_LANGUAGES.includes(f.language)) {
          stored[f.language][f.filename] = { content: f.content || "", input: f.input || "", tests: f.tests || null };
        }
      }
    }
  } catch { /* empty */ }
  return stored;
}

// Keep the open folder's drawer file lists in sync with the live arrays.
function syncActiveFolderCache() {
  const entry = savedFolders.find((f) => String(f.folderId) === String(activeFolderId));
  if (entry) entry.files = { cpp: cppFileNames.slice(), python: pyFileNames.slice(), java: javaFileNames.slice() };
}

async function createFolder() {
  const folderId = generateFolderId();
  const name = nextFolderName();
  savedFolders.push({
    folderId, name, problems: [],
    createdAt: new Date().toISOString(), lastEdited: Date.now(),
    files: { cpp: [], python: [], java: [] }
  });
  expandedFolderKeys.add(folderId);
  saveExpandedFolders();
  if (isAuthed()) {
    await fetch("/api/me/folder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderId, name })
    }).catch(() => {});
    persistFolderOrder(); // give the new (appended) folder a sort_order
  }
  renderFolders();
  setStatus("Folder created", "success");
  els.meta.textContent = `${name} added`;
}

// Open a folder into the editor (switching scope), preserving the context we
// leave. Restores its in-memory snapshot if present, else loads from the account.
async function openFolder(folder, targetFile = "") {
  const fid = String(folder.folderId || "");
  if (!fid) return;
  if (codeFileScope === "folder" && String(activeFolderId) === fid) {
    // Switch back even when targetFile is already the active file but a template
    // view is showing — otherwise clicking the (only) problem does nothing.
    if (targetFile && currentFileNames().includes(targetFile) && (currentActiveFile() !== targetFile || editorView !== "code")) switchCodeFile(targetFile);
    return;
  }
  stashCurrentContext();
  codeFileScope = "folder";
  activeFolderId = fid;
  activeContestId = "";
  activeContestDir = "";
  if (!restoreContext(`folder:${fid}`)) {
    const folderProblems = savedFolders.find((f) => String(f.folderId) === fid)?.problems || [];
    setArraysFromStored(await fetchFolderFiles(fid), folderProblems);
  }
  const names = currentFileNames();
  const target = targetFile && names.includes(targetFile) ? targetFile : (currentActiveFile() && names.includes(currentActiveFile()) ? currentActiveFile() : names[0] || "");
  languageState().setActive(target || "");
  renderCurrentContext();
}

function createFileInFolder(folder) {
  openFolder(folder).then(() => {
    addNextCodeFile();
    renderFolders();
  });
}

// Delete = move the folder to the Bin (recoverable). Files are kept.
async function deleteFolder(folder) {
  const ok = await openConfirm({
    title: "Delete folder",
    message: `Move folder <strong>${escapeHtml(folder.name)}</strong> to the Bin?`,
    confirmLabel: "Delete"
  });
  if (!ok) return;
  changeFolderState(folder, "deleted");
  setStatus("Moved to Bin", "idle");
  els.meta.textContent = `${folder.name} moved to Bin`;
}

// Permanently remove a folder (from the Bin): its account rows + files. If it's
// the open folder, fall back to the temp workspace afterwards.
async function permanentlyDeleteFolder(folder) {
  const ok = await openConfirm({
    title: "Delete permanently",
    message: `Permanently delete folder <strong>${escapeHtml(folder.name)}</strong> and all its files? This cannot be undone.`,
    confirmLabel: "Delete forever"
  });
  if (!ok) return;
  const fid = String(folder.folderId || "");
  const wasOpen = codeFileScope === "folder" && String(activeFolderId) === fid;
  if (isAuthed() && fid) {
    await fetch("/api/me/folder", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderId: fid })
    }).catch(() => {});
  }
  contextSnapshots.delete(`folder:${fid}`);
  savedFolders = savedFolders.filter((f) => String(f.folderId) !== fid);
  expandedFolderKeys.delete(fid);
  saveExpandedFolders();
  if (wasOpen) {
    codeFileScope = "workspace";
    activeFolderId = "";
    if (isAuthed()) {
      await Promise.all([loadWorkspaceCppFiles(), loadWorkspacePythonFiles(), loadWorkspaceJavaFiles()]).catch(() => {});
    } else if (!restoreContext("workspace")) {
      cppFileNames = []; cppFiles = {}; cppInputs = {}; cppTabLabels = {}; cppProblems = {}; activeCppFile = ""; openCppTabs = [];
      pyFileNames = []; pyFiles = {}; pyInputs = {}; pyTabLabels = {}; pyProblems = {}; activePyFile = ""; openPyTabs = [];
      javaFileNames = []; javaFiles = {}; javaInputs = {}; javaTabLabels = {}; javaProblems = {}; activeJavaFile = ""; openJavaTabs = [];
      renderCurrentContext();
    } else {
      renderCurrentContext();
    }
  }
  renderFolders();
  setStatus("Folder deleted", "idle");
  els.meta.textContent = `${folder.name} deleted`;
}

// Inline-rename a folder name in the header (Enter / blur commits, Esc cancels).
function beginRenameFolderInline(row, folder) {
  row.innerHTML = "";
  const input = document.createElement("input");
  input.type = "text";
  input.className = "temp-file-rename-input";
  input.value = folder.name || "";
  input.spellcheck = false;
  input.autocomplete = "off";
  let settled = false;
  const finish = (commit) => {
    if (settled) return;
    settled = true;
    const next = input.value.trim();
    if (commit && next && next !== folder.name) commitFolderRename(folder, next);
    else renderFolders();
  };
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { event.preventDefault(); finish(true); }
    else if (event.key === "Escape") { event.preventDefault(); finish(false); }
  });
  input.addEventListener("blur", () => finish(true));
  row.append(input);
  input.focus();
  input.select();
}

async function commitFolderRename(folder, next) {
  folder.name = next;
  if (isAuthed()) {
    await fetch("/api/me/folder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderId: folder.folderId, name: next })
    }).catch(() => {});
  }
  renderFolders();
}

function toggleFolderExpanded(folder) {
  const key = String(folder.folderId);
  if (expandedFolderKeys.has(key)) expandedFolderKeys.delete(key);
  else expandedFolderKeys.add(key);
  saveExpandedFolders();
  renderFolders();
}

// Click the folder import icon: the header turns into a URL field (left) with the
// import icon (right). Enter or the icon imports; Esc / clicking away cancels.
function beginFolderImportInline(header, folder) {
  header.innerHTML = "";
  const input = document.createElement("input");
  input.type = "url";
  input.className = "temp-file-rename-input folder-import-input";
  input.placeholder = "Paste a problem (or contest) URL…";
  input.spellcheck = false;
  input.autocomplete = "off";
  const go = document.createElement("button");
  go.type = "button";
  go.className = "temp-file-action";
  go.title = "Import";
  go.innerHTML = ICON_IMPORT;
  let settled = false;
  const submit = () => { if (settled) return; settled = true; importIntoFolder(folder, input.value); };
  const cancel = () => { if (settled) return; settled = true; renderFolders(); };
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { event.preventDefault(); submit(); }
    else if (event.key === "Escape") { event.preventDefault(); cancel(); }
  });
  go.addEventListener("mousedown", (event) => { event.preventDefault(); submit(); });
  input.addEventListener("blur", () => setTimeout(cancel, 150)); // let the import icon's click land first
  header.append(input, go);
  input.focus();
}

// Add a fully-specified file to the active folder context for one language.
// Folder imports call this once per supported language so the drawer can switch
// languages without losing the imported problem set.
function addFileToActiveFolderContext(language, filename, code, input, label, problem = null) {
  const state = languageState(language);
  const fileNames = state.names;
  const files = state.files;
  const inputs = state.inputs;
  const labels = state.labels;
  const problems = state.problems;
  if (!fileNames.includes(filename)) fileNames.push(filename);
  files[filename] = code;
  inputs[filename] = input || "";
  labels[filename] = label || filename;
  problems[filename] = problem;
  if (language === els.language.value) {
    ensureTabOpen(filename);
  } else {
    state.setActive(filename);
    if (!state.openTabs.includes(filename)) state.setOpenTabs([...state.openTabs, filename]);
  }
  editorView = "code";
  if (codeFileScope === "folder" && isAuthed() && activeFolderId) {
    putMyFile(language, "folder", filename, code, input || "", activeFolderId).catch(() => {});
  }
  syncActiveFolderCache();
}

function uniqueFilenameFor(list, base, extension) {
  let filename = `${base}${extension}`;
  let i = 2;
  while (list.includes(filename)) {
    filename = `${base}_${i}${extension}`;
    i += 1;
  }
  return filename;
}

// Import a single problem (or a whole contest) into a folder as code file(s),
// each seeded with the language template and the first sample as its input.
async function importIntoFolder(folder, rawUrl) {
  const u = String(rawUrl || "").trim();
  if (!u) { renderFolders(); return; }
  setStatus("Importing", "idle");
  els.meta.textContent = "Fetching Codeforces problem...";
  try {
    const res = await fetch("/api/codeforces/problem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: u, language: els.language.value })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not import problem.");
    const list = data.problems || [];
    if (!list.length) throw new Error("No problem found at that URL.");
    await openFolder(folder); // make the folder the active scope
    let firstName = "";
    for (const p of list) {
      const base = `${p.contestId}${p.index}`; // e.g. 1700A
      const input = p.samples?.[0]?.input || "";
      const created = {};
      for (const language of SUPPORTED_LANGUAGES) {
        const state = languageState(language);
        const config = LANGUAGE_CONFIG[language];
        const name = uniqueFilenameFor(state.names, base, config.extension);
        created[language] = name;
        addFileToActiveFolderContext(language, name, state.template, input, `${name} - ${p.name}`, p);
        currentTestsMap(language)[name] = (p.samples && p.samples.length)
          ? p.samples.map((s) => ({ input: s.input || "", expected: s.output ?? "" }))
          : [{ input: input || "", expected: "" }];
        touchFolderFile(folder.folderId, language, name, { created: true });
      }
      if (!firstName) firstName = created[currentLanguageValue()] || created.cpp;
    }
    if (firstName) {
      languageState().setActive("");
      switchCodeFile(firstName);
    }
    persistFolderProblems(folder, list);
    refreshDrawerAndTabs();
    setStatus("Imported", "success");
    els.meta.textContent = list.length === 1
      ? `${list[0].index}. ${list[0].name} added to ${folder.name}`
      : `${list.length} problems added to ${folder.name}`;
    fetchFolderStatuses({ onlyMissing: true }); // check only newly-imported problems
  } catch (error) {
    setStatus("Import failed", "error");
    els.meta.textContent = error.message || "Codeforces import failed";
    renderFolders();
  }
}

// Merge the just-imported problems into the folder's stored problem list (keyed
// by contestId+index) and persist it, so the "<file> - <name>" labels can be
// rebuilt after a reload. In-memory folder.problems is updated too.
function persistFolderProblems(folder, imported) {
  const merged = (folder.problems || []).slice();
  const seen = new Set(merged.map((p) => `${p.contestId}|${String(p.index).toUpperCase()}`));
  for (const p of imported) {
    const entry = {
      contestId: String(p.contestId), index: String(p.index).toUpperCase(), name: p.name || "",
      samples: Array.isArray(p.samples) ? p.samples.map((s) => ({ input: s.input || "", output: s.output ?? "" })) : []
    };
    const key = `${entry.contestId}|${entry.index}`;
    if (!seen.has(key)) { merged.push(entry); seen.add(key); }
  }
  folder.problems = merged;
  if (!isAuthed()) return;
  fetch("/api/me/folder", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folderId: folder.folderId, problems: merged })
  }).catch(() => {});
}

function folderMetaKey(folderId, language, filename) {
  return `${folderId}|${language}|${filename}`;
}

function getFileMeta(folderId, language, filename) {
  return folderFileMeta[folderMetaKey(folderId, language, filename)] || null;
}

// Stamp a folder file as just created/edited so the sorts reflect it immediately,
// without waiting for the next account fetch.
function touchFolderFile(folderId, language, filename, { created = false } = {}) {
  const key = folderMetaKey(folderId, language, filename);
  const now = Date.now();
  const meta = folderFileMeta[key] || (folderFileMeta[key] = { created: now, updated: now });
  if (created) meta.created = now;
  meta.updated = now;
  const folder = savedFolders.find((f) => String(f.folderId) === String(folderId));
  if (folder) folder.lastEdited = now;
}

function folderFileSortMode(folderId) {
  return folderSortModes.includes(folderFileSort[folderId]) ? folderFileSort[folderId] : "alpha";
}

function setFolderFileSort(folderId, mode) {
  if (!folderSortModes.includes(mode)) return;
  folderFileSort[folderId] = mode;
  localStorage.setItem("rathee.folderFileSort", JSON.stringify(folderFileSort));
  renderFolders();
}

function sortFolderFiles(folderId, language, names) {
  const mode = folderFileSortMode(folderId);
  const arr = names.slice();
  const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  if (mode === "alpha") return arr.sort(byName);
  const field = mode === "created" ? "created" : "updated";
  const stamp = (fn) => getFileMeta(folderId, language, fn)?.[field] || 0;
  return arr.sort((a, b) => stamp(b) - stamp(a) || byName(a, b));
}

// One-time reorder of the manual folder order by the chosen criterion. The new
// order is persisted (sort_order) and then preserved until the next sort/drag.
function setFolderSortMode(mode) {
  if (!folderSortModes.includes(mode)) return;
  const time = (v) => { const ms = v ? Date.parse(v) : NaN; return Number.isNaN(ms) ? 0 : ms; };
  const byName = (a, b) => (a.name || "").localeCompare(b.name || "", undefined, { numeric: true, sensitivity: "base" });
  if (mode === "created") savedFolders.sort((a, b) => time(b.createdAt) - time(a.createdAt) || byName(a, b));
  else if (mode === "edited") savedFolders.sort((a, b) => (b.lastEdited || 0) - (a.lastEdited || 0) || byName(a, b));
  else savedFolders.sort(byName);
  persistFolderOrder();
  toggleFolderSortMenu(false);
  renderFolders();
}

function toggleFolderSortMenu(force) {
  const open = typeof force === "boolean" ? force : els.folderSortMenu.hidden;
  els.folderSortMenu.hidden = !open;
  els.folderSortBtn.setAttribute("aria-expanded", String(open));
}

function clearFolderDropIndicators() {
  els.folderList?.querySelectorAll(".drag-over-before, .drag-over-after")
    .forEach((el) => el.classList.remove("drag-over-before", "drag-over-after"));
}

// Move `draggedId` to just before/after `targetId` in savedFolders, re-render,
// and persist the new order to the account.
function reorderFolders(draggedId, targetId, placeAfter) {
  const from = savedFolders.findIndex((f) => String(f.folderId) === String(draggedId));
  if (from === -1) return;
  const [moved] = savedFolders.splice(from, 1);
  let to = savedFolders.findIndex((f) => String(f.folderId) === String(targetId));
  if (to === -1) { savedFolders.splice(from, 0, moved); return; } // target gone; undo
  if (placeAfter) to += 1;
  savedFolders.splice(to, 0, moved);
  renderFolders();
  persistFolderOrder();
}

function persistFolderOrder() {
  if (!isAuthed()) return; // anonymous: order is in-memory only for the session
  fetch("/api/me/folders/order", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order: savedFolders.map((f) => String(f.folderId)) })
  }).catch(() => {});
}

function renderFolders() {
  if (!els.folderList) return;
  els.folderList.innerHTML = "";
  if (els.folderSectionLabel) els.folderSectionLabel.textContent = FOLDER_LABELS[folderView] || FOLDER_LABELS.active;
  if (els.folderArchiveToggle) els.folderArchiveToggle.classList.toggle("active", folderView === "archived");
  if (els.folderBinToggle) els.folderBinToggle.classList.toggle("active", folderView === "bin");
  const viewFolders = savedFolders.filter((f) => (f.state || "active") === VIEW_STATE[folderView]);
  if (savedFolders.length && !viewFolders.length) {
    const row = document.createElement("div");
    row.className = "temp-file-empty-row";
    const span = document.createElement("span");
    span.className = "temp-file-empty";
    span.textContent = folderView === "bin" ? "Bin is empty" : folderView === "archived" ? "No archived folders" : "No folders";
    row.append(span);
    els.folderList.append(row);
    return;
  }
  for (const folder of viewFolders) {
    const fid = String(folder.folderId);
    const expanded = expandedFolderKeys.has(fid);
    const isOpen = codeFileScope === "folder" && String(activeFolderId) === fid;
    const group = document.createElement("div");
    group.className = "saved-contest-group";
    // Folders keep a manual order: a sort option reorders once, then drag keeps
    // that order until the next sort. So dragging stays enabled.
    group.draggable = true;
    group.dataset.folderId = fid;
    group.addEventListener("dragstart", (event) => {
      // Don't hijack text selection in an inline rename/import field.
      if (event.target.closest("input, textarea")) { event.preventDefault(); return; }
      draggedFolderId = fid;
      group.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      try { event.dataTransfer.setData("text/plain", fid); } catch { /* some browsers require this */ }
    });
    group.addEventListener("dragend", () => {
      group.classList.remove("dragging");
      clearFolderDropIndicators();
      draggedFolderId = "";
    });
    group.addEventListener("dragover", (event) => {
      if (!draggedFolderId || draggedFolderId === fid) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const rect = group.getBoundingClientRect();
      const after = event.clientY > rect.top + rect.height / 2;
      clearFolderDropIndicators();
      group.classList.add(after ? "drag-over-after" : "drag-over-before");
    });
    group.addEventListener("dragleave", () => {
      group.classList.remove("drag-over-before", "drag-over-after");
    });
    group.addEventListener("drop", (event) => {
      if (!draggedFolderId || draggedFolderId === fid) return;
      event.preventDefault();
      const rect = group.getBoundingClientRect();
      const after = event.clientY > rect.top + rect.height / 2;
      reorderFolders(draggedFolderId, fid, after);
    });

    const header = document.createElement("div");
    header.className = "saved-contest-header folder-header";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "drawer-item saved-contest-btn contest-toggle-btn";
    button.title = folder.name;
    button.setAttribute("aria-expanded", String(expanded));
    const chevron = document.createElement("span");
    chevron.className = "contest-chevron";
    chevron.textContent = ">";
    const label = document.createElement("span");
    label.className = "contest-title";
    label.textContent = folder.name;
    button.append(chevron, label);
    button.addEventListener("click", () => toggleFolderExpanded(folder));

    const actions = document.createElement("div");
    actions.className = "temp-file-actions folder-header-actions";
    // Per-folder reload = "Status" for this folder's problems (with info tooltip).
    const reloadWrap = document.createElement("div");
    reloadWrap.className = "folder-reload-wrap";
    const reloadBtn = document.createElement("button");
    reloadBtn.type = "button";
    reloadBtn.className = "temp-file-action folder-reload-btn";
    reloadBtn.setAttribute("aria-label", `Refresh statuses in ${folder.name}`);
    reloadBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></svg>';
    reloadBtn.addEventListener("click", (event) => { event.stopPropagation(); fetchFolderStatusesFor(folder); });
    const reloadTip = document.createElement("span");
    reloadTip.className = "status-info-tip";
    reloadTip.innerHTML = "Click to refresh the Codeforces <strong>status</strong> of <em>every problem</em> in this folder.";
    reloadWrap.append(reloadBtn, reloadTip);
    const fileMode = folderFileSortMode(fid);
    const sortDropdown = document.createElement("div");
    sortDropdown.className = "contest-sort-dropdown folder-file-sort-dropdown";
    const sortBtn = document.createElement("button");
    sortBtn.type = "button";
    sortBtn.className = "temp-file-action folder-file-sort-btn";
    sortBtn.title = `Sort files in ${folder.name}: ${SORT_LABEL[fileMode]}`;
    sortBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg>';
    const sortMenu = document.createElement("div");
    sortMenu.className = "contest-sort-menu";
    sortMenu.hidden = true;
    sortMenu.setAttribute("role", "menu");
    folderSortModes.forEach((m) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "contest-sort-item folder-file-sort-item";
      item.setAttribute("role", "menuitemradio");
      item.textContent = SORT_LABEL[m];
      item.classList.toggle("active", m === fileMode);
      item.addEventListener("click", (event) => { event.stopPropagation(); setFolderFileSort(fid, m); });
      sortMenu.append(item);
    });
    sortBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = sortMenu.hidden;
      document.querySelectorAll(".folder-file-sort-dropdown .contest-sort-menu").forEach((mn) => { mn.hidden = true; });
      sortMenu.hidden = !willOpen;
    });
    sortDropdown.append(sortBtn, sortMenu);
    const importBtn = document.createElement("button");
    importBtn.type = "button";
    importBtn.className = "temp-file-action";
    importBtn.title = `Import a problem into ${folder.name}`;
    importBtn.innerHTML = ICON_IMPORT;
    importBtn.addEventListener("click", (event) => { event.stopPropagation(); beginFolderImportInline(header, folder); });
    const renameBtn = document.createElement("button");
    renameBtn.type = "button";
    renameBtn.className = "temp-file-action";
    renameBtn.title = `Rename ${folder.name}`;
    renameBtn.innerHTML = ICON_RENAME;
    renameBtn.addEventListener("click", (event) => { event.stopPropagation(); beginRenameFolderInline(header, folder); });
    const mkFolderBtn = (cls, html, title, onClick) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `temp-file-action ${cls}`;
      b.title = title;
      b.innerHTML = html;
      b.addEventListener("click", (event) => { event.stopPropagation(); onClick(); });
      return b;
    };
    const archiveBtn = mkFolderBtn("", ICON_ARCHIVE, `Archive ${folder.name}`, () => changeFolderState(folder, "archived"));
    const restoreBtn = mkFolderBtn("", ICON_RESTORE, `Restore ${folder.name}`, () => changeFolderState(folder, "active"));
    const delBtn = mkFolderBtn("temp-file-delete", ICON_DELETE, `Delete ${folder.name}`, () => deleteFolder(folder));
    const destroyBtn = mkFolderBtn("temp-file-delete", ICON_DELETE, `Delete ${folder.name} permanently`, () => permanentlyDeleteFolder(folder));

    // Actions per view: active → import/reload/sort/rename/archive/delete(→bin);
    // archived → reload/restore/delete(→bin); bin → restore/delete-forever.
    const revealed = folderActionsOpen.has(fid);
    if (revealed) {
      if (folderView === "active") actions.append(importBtn, reloadWrap, sortDropdown, renameBtn, archiveBtn, delBtn);
      else if (folderView === "archived") actions.append(reloadWrap, restoreBtn, delBtn);
      else actions.append(restoreBtn, destroyBtn);
    }
    const actionsToggle = document.createElement("button");
    actionsToggle.type = "button";
    actionsToggle.className = "temp-file-action folder-actions-toggle";
    actionsToggle.title = revealed ? "Hide folder actions" : "Show folder actions";
    actionsToggle.textContent = revealed ? "›" : "‹";
    actionsToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (folderActionsOpen.has(fid)) folderActionsOpen.delete(fid);
      else folderActionsOpen.add(fid);
      renderFolders();
    });
    actions.append(actionsToggle);

    header.append(button, actions);
    group.append(header);

    if (expanded) {
      const list = document.createElement("div");
      list.className = "contest-problem-list";
      const language = currentLanguageValue();
      const config = LANGUAGE_CONFIG[language];
      if (isOpen) folder.files = { cpp: cppFileNames.slice(), python: pyFileNames.slice(), java: javaFileNames.slice() };
      const rawNames = isOpen ? languageState(language).names : ((folder.files && folder.files[language]) || []);
      const names = sortFolderFiles(fid, language, rawNames);
      if (!names.length) {
        const row = document.createElement("div");
        row.className = "temp-file-empty-row";
        const empty = document.createElement("span");
        empty.className = "temp-file-empty";
        empty.textContent = "No files yet";
        const create = document.createElement("button");
        create.type = "button";
        create.className = "temp-create-file";
        const fn = config.defaultFile;
        create.textContent = `+ ${fn}`;
        create.title = `Create ${fn}`;
        create.addEventListener("click", () => createFileInFolder(folder));
        row.append(empty, create);
        list.append(row);
      } else {
        const liveLabels = isOpen ? languageState(language).labels : {};
        const activeFile = currentActiveFile();
        const manageable = isOpen || isAuthed();
        for (const filename of names) {
          // Show the problem name even when the folder isn't the open scope, by
          // deriving it from the folder's persisted problem list.
          const problemName = folderProblemNameFor(filename, folder.problems);
          const label = liveLabels[filename] || (problemName ? `${filename} - ${problemName}` : filename);
          const isActive = isOpen && editorView === "code" && filename === activeFile;
          const ctx = { language: els.language.value, scope: "folder", contestId: fid, filename };
          const row = createManagedFileRow(ctx, label, isActive, () => openFolder(folder, filename), manageable);
          list.append(row);
        }
      }
      group.append(list);
    }
    els.folderList.append(group);
  }
}

function currentContextKey() {
  if (codeFileScope === "contest" && activeContestId) return `contest:${activeContestId}`;
  if (codeFileScope === "folder" && activeFolderId) return `folder:${activeFolderId}`;
  return "workspace";
}

// Save the current editor context (all files for both languages) into the
// in-memory store, so it can be restored when switching back without a backend.
function stashCurrentContext() {
  if (editorView === "code") saveCurrentState();
  contextSnapshots.set(currentContextKey(), {
    cpp: { names: cppFileNames.slice(), files: { ...cppFiles }, inputs: { ...cppInputs }, labels: { ...cppTabLabels }, problems: { ...cppProblems }, samples: { ...cppSamples }, active: activeCppFile, open: openCppTabs.slice() },
    python: { names: pyFileNames.slice(), files: { ...pyFiles }, inputs: { ...pyInputs }, labels: { ...pyTabLabels }, problems: { ...pyProblems }, samples: { ...pySamples }, active: activePyFile, open: openPyTabs.slice() },
    java: { names: javaFileNames.slice(), files: { ...javaFiles }, inputs: { ...javaInputs }, labels: { ...javaTabLabels }, problems: { ...javaProblems }, samples: { ...javaSamples }, active: activeJavaFile, open: openJavaTabs.slice() }
  });
}

function restoreContext(key) {
  const s = contextSnapshots.get(key);
  if (!s) return false;
  cppFileNames = s.cpp.names.slice(); cppFiles = { ...s.cpp.files }; cppInputs = { ...s.cpp.inputs };
  cppTabLabels = { ...s.cpp.labels }; cppProblems = { ...s.cpp.problems }; cppSamples = { ...(s.cpp.samples || {}) }; activeCppFile = s.cpp.active; openCppTabs = s.cpp.open.slice();
  pyFileNames = s.python.names.slice(); pyFiles = { ...s.python.files }; pyInputs = { ...s.python.inputs };
  pyTabLabels = { ...s.python.labels }; pyProblems = { ...s.python.problems }; pySamples = { ...(s.python.samples || {}) }; activePyFile = s.python.active; openPyTabs = s.python.open.slice();
  const j = s.java || { names: [], files: {}, inputs: {}, labels: {}, problems: {}, samples: {}, active: "", open: [] };
  javaFileNames = j.names.slice(); javaFiles = { ...j.files }; javaInputs = { ...j.inputs };
  javaTabLabels = { ...j.labels }; javaProblems = { ...j.problems }; javaSamples = { ...(j.samples || {}) }; activeJavaFile = j.active; openJavaTabs = j.open.slice();
  return true;
}

// Paint the editor + drawer for whatever the live arrays currently hold.
function renderCurrentContext() {
  const state = languageState();
  const files = state.files;
  const inputs = state.inputs;
  const active = state.active;
  editorView = "code";
  setEditorLanguage(els.language.value);
  setEditorCode(active ? (files[active] || "") : "");
  activeTestIndex = 0; clearTestRun(); refreshIoPanels();
  updateEditorEmptyState();
  renderFileTabs();
  renderSavedContests();
  renderFolders();
  updateDrawerActiveItem();
}

function openTempFile(filename) {
  // Already in the workspace scope — just switch to the file.
  if (codeFileScope === "workspace" && editorView === "code") {
    switchCodeFile(filename);
    return;
  }
  // Anonymous: restore the in-memory temp workspace (preserving the contest we
  // leave), since there's no backend to reload from.
  if (!isAuthed()) {
    stashCurrentContext();
    codeFileScope = "workspace";
    activeContestDir = "";
    activeContestId = "";
    restoreContext("workspace");
    languageState().setActive(filename);
    ensureTabOpen(filename);
    renderCurrentContext();
    return;
  }
  // Signed in: restore the workspace files from the account, then activate.
  saveCurrentState();
  languageState().setActive(filename);
  openProblemCode();
}

function currentFileNames() {
  return languageState().names;
}

function currentOpenTabs() {
  return languageState().openTabs;
}

function setCurrentOpenTabs(names) {
  languageState().setOpenTabs(names);
}

// Make sure a file is open as a tab (e.g. when picked from the drawer after it
// was closed). Preserves existing tab order, appending if newly opened.
function ensureTabOpen(filename) {
  const tabs = currentOpenTabs();
  if (!tabs.includes(filename)) setCurrentOpenTabs([...tabs, filename]);
}

function currentFiles() {
  return languageState().files;
}

function currentInputs() {
  return languageState().inputs;
}

function currentTabLabels() {
  return languageState().labels;
}

function currentActiveFile() {
  return languageState().active;
}

function isTemplateEditorView() {
  return ["template", "headers", "python-template", "java-template"].includes(editorView);
}

function templateViewFilename(view = editorView) {
  if (view === "template") return "Template.cpp";
  if (view === "headers") return "Headers.hpp";
  if (view === "python-template") return "Template.py";
  if (view === "java-template") return "Template.java";
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
    for (const view of ["template", "headers", "python-template", "java-template"]) {
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
  const extensionLabel = LANGUAGE_CONFIG[currentLanguageValue()]?.label || "C++";
  // Keep the active file open, then show open tabs in file-list order.
  const activeFile = currentActiveFile();
  if (activeFile && fileNames.includes(activeFile)) ensureTabOpen(activeFile);
  const openSet = new Set(currentOpenTabs());
  const tabsToShow = fileNames.filter((name) => openSet.has(name));
  for (const filename of tabsToShow) {
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
    close.title = `Close ${filename} (the file stays in the drawer)`;
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closeTab(filename);
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

// Close a tab: remove it from the open-tabs strip only. The file is NOT deleted
// — it stays in the left drawer and can be reopened by clicking it there.
function closeTab(filename) {
  const state = languageState();
  const files = state.files;
  const inputs = state.inputs;
  const activeFile = state.active;
  if (filename === activeFile) {
    clearTimeout(codeSaveTimer);
    codeSaveTimer = null;
  } else {
    saveCurrentState();
  }
  const openTabs = currentOpenTabs();
  const index = openTabs.indexOf(filename);
  const remaining = openTabs.filter((name) => name !== filename);
  setCurrentOpenTabs(remaining);
  if (activeFile === filename) {
    const nextActiveFile = remaining[Math.max(0, index - 1)] || remaining[0] || "";
    state.setActive(nextActiveFile);
    setEditorCode(nextActiveFile ? files[nextActiveFile] : "");
    activeTestIndex = 0; clearTestRun(); refreshIoPanels();
  }
  renderFileTabs();
  updateEditorEmptyState();
  setStatus("Closed", "idle");
  els.meta.textContent = `${filename} closed`;
}

// Remove a file's name from the relevant drawer cache (used after a non-active
// delete/rename so the list reflects it without touching the live editor).
function removeFromDrawerCache(ctx, replacement = null) {
  if (ctx.scope === "contest" || ctx.scope === "folder") {
    const collection = ctx.scope === "folder" ? savedFolders : savedContests;
    const idKey = ctx.scope === "folder" ? "folderId" : "contestId";
    const entry = collection.find((c) => String(c[idKey]) === String(ctx.contestId));
    const list = entry && entry.files && entry.files[ctx.language];
    if (list) {
      const i = list.indexOf(ctx.filename);
      if (i >= 0) { if (replacement) list[i] = replacement; else list.splice(i, 1); }
    }
  } else {
    const apply = (arr) => {
      const i = arr.indexOf(ctx.filename);
      if (i >= 0) { if (replacement) arr[i] = replacement; else arr.splice(i, 1); }
      return arr;
    };
    if (ctx.language === "python") tempPyNames = apply(tempPyNames.slice());
    else if (ctx.language === "java") tempJavaNames = apply(tempJavaNames.slice());
    else tempCppNames = apply(tempCppNames.slice());
  }
}

// Trash icon. Routes to the live-editor delete when the file is the active
// context, otherwise deletes it straight from the backend + drawer cache (so you
// can delete a contest file from the workspace, or a temp file from a contest).
async function deleteDrawerFile(ctx) {
  if (isActiveFileContext(ctx)) return deleteActiveFile(ctx.filename);
  if (isAuthed()) {
    await deleteMyFile(ctx.language, ctx.scope, ctx.filename, ctx.contestId || "").catch(() => {
      els.meta.textContent = `Could not delete ${ctx.filename}`;
    });
  }
  removeFromDrawerCache(ctx);
  refreshDrawerAndTabs();
  setStatus("Deleted", "idle");
  els.meta.textContent = `${ctx.filename} deleted`;
}

// Permanently delete the file in the active editor context. Removes it from the
// file list, the open tabs, and the backend (when signed in).
async function deleteActiveFile(filename) {
  const language = currentLanguageValue();
  const state = languageState(language);
  const config = LANGUAGE_CONFIG[language];
  const fileNames = state.names;
  const files = state.files;
  const inputs = state.inputs;
  const tabLabels = state.labels;
  const problems = state.problems;
  const activeFile = state.active;
  if (filename === activeFile) {
    clearTimeout(codeSaveTimer);
    codeSaveTimer = null;
  } else {
    saveCurrentState();
  }
  const index = fileNames.indexOf(filename);
  const nextFileNames = fileNames.filter((name) => name !== filename);
  state.setNames(nextFileNames);
  setCurrentOpenTabs(currentOpenTabs().filter((name) => name !== filename));
  delete files[filename];
  delete inputs[filename];
  delete tabLabels[filename];
  delete problems[filename];
  if (codeFileScope === "workspace") {
    const remove = language === "python" ? deleteWorkspacePythonFile : language === "java" ? deleteWorkspaceJavaFile : deleteWorkspaceCppFile;
    const folderName = `Temporary${config.label}Files`;
    await remove(filename).catch(() => {
      els.meta.textContent = `Could not delete ${filename} from ${folderName}`;
    });
  } else if (codeFileScope === "contest" && isAuthed() && activeContestId) {
    await deleteMyFile(language, "contest", filename, activeContestId).catch(() => {
      els.meta.textContent = `Could not delete ${filename}`;
    });
  } else if (codeFileScope === "folder" && isAuthed() && activeFolderId) {
    await deleteMyFile(language, "folder", filename, activeFolderId).catch(() => {
      els.meta.textContent = `Could not delete ${filename}`;
    });
  }
  if (codeFileScope === "folder") syncActiveFolderCache();
  if (activeFile === filename) {
    const nextActiveFile = nextFileNames[Math.max(0, index - 1)] || nextFileNames[0] || "";
    state.setActive(nextActiveFile);
    setEditorCode(nextActiveFile ? files[nextActiveFile] : "");
    activeTestIndex = 0; clearTestRun(); refreshIoPanels();
  }
  refreshDrawerAndTabs();
  updateEditorEmptyState();
  setStatus("Deleted", "idle");
  els.meta.textContent = `${filename} deleted`;
}

// Turn a drawer file row into an inline rename field: the row becomes a focused
// text input (empty, with the current name as a hint). Enter or clicking away
// commits the typed name; Escape cancels. No browser prompt/confirm dialogs.
function beginRenameInline(row, ctx) {
  row.innerHTML = "";
  row.classList.add("renaming");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "temp-file-rename-input";
  input.value = "";
  input.placeholder = ctx.filename;
  input.spellcheck = false;
  input.autocomplete = "off";
  let settled = false;
  const finish = (commit) => {
    if (settled) return;
    settled = true;
    const raw = input.value.trim();
    if (commit && raw) commitRename(ctx, raw);
    else refreshDrawerAndTabs(); // cancel or empty → restore the row unchanged
  };
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { event.preventDefault(); finish(true); }
    else if (event.key === "Escape") { event.preventDefault(); finish(false); }
  });
  input.addEventListener("blur", () => finish(true));
  row.append(input);
  input.focus();
}

// Validate a typed rename (keeping the language extension), then route to the
// live-editor rename when the file is active, or a backend rename otherwise.
async function commitRename(ctx, raw) {
  const extension = LANGUAGE_CONFIG[ctx.language]?.extension || ".cpp";
  let next = String(raw).trim();
  if (!next) { refreshDrawerAndTabs(); return; }
  if (!next.toLowerCase().endsWith(extension)) next += extension;
  if (next === ctx.filename) { refreshDrawerAndTabs(); return; }
  if (!/^[A-Za-z0-9_-]+$/.test(next.slice(0, -extension.length))) {
    setStatus("Bad name", "error");
    els.meta.textContent = "Use letters, digits, _ or - only";
    refreshDrawerAndTabs();
    return;
  }
  if (isActiveFileContext(ctx)) await commitActiveRename(ctx.filename, next);
  else await renameNonActiveFile(ctx, next);
}

// Rename the file in the active editor context: move content/input/label across
// the live arrays and re-point the backend (save new + delete old) when signed in.
async function commitActiveRename(filename, next) {
  const language = currentLanguageValue();
  const state = languageState(language);
  const fileNames = state.names;
  const files = state.files;
  const inputs = state.inputs;
  const tabLabels = state.labels;
  const problems = state.problems;
  if (fileNames.includes(next)) {
    setStatus("Name taken", "error");
    els.meta.textContent = `${next} already exists`;
    refreshDrawerAndTabs();
    return;
  }
  saveCurrentState();
  const content = files[filename] || "";
  const input = inputs[filename] || "";
  const at = fileNames.indexOf(filename);
  if (at >= 0) fileNames[at] = next;
  files[next] = content;
  inputs[next] = input;
  tabLabels[next] = next;
  problems[next] = problems[filename] || null;
  delete files[filename];
  delete inputs[filename];
  delete tabLabels[filename];
  delete problems[filename];
  setCurrentOpenTabs(currentOpenTabs().map((name) => (name === filename ? next : name)));
  if (state.active === filename) state.setActive(next);
  if (codeFileScope === "workspace") {
    const save = saveFunctionFor(language, "workspace");
    const remove = language === "python" ? deleteWorkspacePythonFile : language === "java" ? deleteWorkspaceJavaFile : deleteWorkspaceCppFile;
    await save(next, content).catch(() => {});
    await remove(filename).catch(() => {});
  } else if (codeFileScope === "contest" && isAuthed() && activeContestId) {
    await putMyFile(language, "contest", next, content, input, activeContestId).catch(() => {});
    await deleteMyFile(language, "contest", filename, activeContestId).catch(() => {});
  } else if (codeFileScope === "folder" && isAuthed() && activeFolderId) {
    await putMyFile(language, "folder", next, content, input, activeFolderId).catch(() => {});
    await deleteMyFile(language, "folder", filename, activeFolderId).catch(() => {});
  }
  if (codeFileScope === "folder") syncActiveFolderCache();
  refreshDrawerAndTabs();
  setStatus("Renamed", "success");
  els.meta.textContent = `${filename} → ${next}`;
}

// Rename a file that isn't in the active editor (e.g. a contest file while in the
// workspace). Fetches its content from the account, writes it under the new name,
// deletes the old, and updates the drawer cache. Signed-in only (anonymous files
// that aren't active have no persisted content to move).
async function renameNonActiveFile(ctx, next) {
  if (!isAuthed()) { refreshDrawerAndTabs(); return; }
  let content = "";
  let input = "";
  try {
    const res = await fetch("/api/me/workspace", { cache: "no-store" });
    const data = await res.json();
    const match = (f) => f.scope === ctx.scope && String(f.contestId || "") === String(ctx.contestId || "") && f.language === ctx.language;
    if ((data.files || []).some((f) => match(f) && f.filename === next)) {
      setStatus("Name taken", "error");
      els.meta.textContent = `${next} already exists`;
      refreshDrawerAndTabs();
      return;
    }
    const row = (data.files || []).find((f) => match(f) && f.filename === ctx.filename);
    content = row ? (row.content || "") : "";
    input = row ? (row.input || "") : "";
  } catch {
    refreshDrawerAndTabs();
    return;
  }
  await putMyFile(ctx.language, ctx.scope, next, content, input, ctx.contestId || "").catch(() => {});
  await deleteMyFile(ctx.language, ctx.scope, ctx.filename, ctx.contestId || "").catch(() => {});
  removeFromDrawerCache(ctx, next);
  refreshDrawerAndTabs();
  setStatus("Renamed", "success");
  els.meta.textContent = `${ctx.filename} → ${next}`;
}

function addNextCodeFile() {
  saveCurrentState();
  const language = currentLanguageValue();
  const config = LANGUAGE_CONFIG[language];
  const state = languageState(language);
  const filename = nextCodeFilename(state.names, config.extension);
  state.names.push(filename);
  ensureTabOpen(filename);
  state.files[filename] = state.template;
  state.inputs[filename] = "";
  state.labels[filename] = filename;
  state.problems[filename] = null;
  currentTestsMap(language)[filename] = [{ input: "", expected: "" }];
  state.setActive(filename);
  editorView = "code";
  renderFileTabs();
  updateDrawerActiveItem();
  updateEditorActionButton();
  setEditorLanguage(els.language.value);
  setEditorCode(state.files[filename]);
  activeTestIndex = 0; clearTestRun(); refreshIoPanels();
  updateEditorEmptyState();
  if (codeFileScope === "workspace") {
    const save = saveFunctionFor(language, "workspace");
    save(filename, state.files[filename]).catch(() => {
      const folderName = `Temporary${config.label}Files`;
      els.meta.textContent = `Could not create ${filename} in ${folderName}`;
    });
  } else if (codeFileScope === "contest") {
    const save = saveFunctionFor(language, "contest");
    save(filename, state.files[filename]).catch(() => {});
    renderSavedContests(); // reflect the new file in the open contest's drawer list
  } else if (codeFileScope === "folder") {
    const save = saveFunctionFor(language, "folder");
    save(filename, state.files[filename]).catch(() => {});
    touchFolderFile(activeFolderId, language, filename, { created: true });
    syncActiveFolderCache();
    renderFolders(); // reflect the new file in the open folder's drawer list immediately
  }
  setStatus("Created", "success");
  els.meta.textContent = `${filename} added`;
}

// Empty-editor-state "Create a <Lang> File" button. Behaves exactly like the
// "+" tab: adds the next file in the CURRENT scope (workspace/contest/folder).
// (Previously this no-opped when the folder still had closed-but-existing files,
// because it bailed unless the file list was completely empty.)
function createFirstCodeFile() {
  if (currentFileNames().length === 0) tempFilesExpanded = true; // reveal the Temporary Code Files list with the new file
  addNextCodeFile();
  setEditorQuickSettings(false); // collapse settings once the editor has a file
}

// Create the first temporary (scratch) file from the drawer's empty state,
// switching out of any active contest into a fresh temporary workspace.
function createFirstTempFile() {
  saveCurrentState();
  // Preserve a contest we're leaving so it can be reopened from the drawer.
  if (codeFileScope !== "workspace") stashCurrentContext();
  const language = currentLanguageValue();
  const state = languageState(language);
  codeFileScope = "workspace";
  activeContestDir = "";
  activeContestId = "";
  state.setNames([]);
  state.setActive("");
  state.setTempNames([]);
  state.setOpenTabs([]);
  Object.keys(state.files).forEach((key) => delete state.files[key]);
  Object.keys(state.inputs).forEach((key) => delete state.inputs[key]);
  Object.keys(state.labels).forEach((key) => delete state.labels[key]);
  Object.keys(state.problems).forEach((key) => delete state.problems[key]);
  addNextCodeFile();
  renderTempFiles();
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
  const state = languageState();
  const activeFile = state.active;
  if (filename === activeFile && editorView === "code") return;
  endDebugSessionOnContextChange();
  const leavingTemplateView = editorView !== "code";
  const wasOpen = currentOpenTabs().includes(filename);
  ensureTabOpen(filename); // reopens a tab that was closed from the strip
  saveCurrentState();
  editorView = "code";
  state.setActive(filename);
  setEditorCode(state.files[filename]);
  activeTestIndex = 0; clearTestRun(); refreshIoPanels();
  updateEditorEmptyState();
  updateDrawerActiveItem();
  renderSavedContests(); // keep the open contest's active-file highlight in sync
  renderFolders();
  // Coming back from a template view, or reopening a closed tab, rebuild the tab
  // strip; otherwise just move the highlight.
  if (leavingTemplateView || !wasOpen) renderFileTabs();
  else updateActiveFileTab();
  updateEditorActionButton();
  setStatus("Idle", "idle");
  refreshCodeforcesStatus(false);
}

function updateActiveFileTab() {
  const activeFile = currentActiveFile();
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
  if (editorView === "java-template") {
    javaCode = value;
    if (markDirty) setTemplateDirty(true);
    return;
  }
  const state = languageState();
  if (!state.active) return;
  state.files[state.active] = value;
  // Test inputs/expected are owned by the tests maps and persisted separately
  // (persistActiveTests); here we only persist the code.
  scheduleWorkspaceCodeSave();
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

// Collect the files already saved for a contest, grouped by language
// map of filename -> {content, input}, used to merge on re-import so existing
// work is preserved. Prefers the live in-memory contest (most current), then
// the signed-in account; returns null when there's nothing to merge.
async function loadExistingContestFiles(contestId) {
  const cid = String(contestId || "");
  if (!cid) return null;
  if (codeFileScope === "contest" && String(activeContestId) === cid) {
    const stored = { cpp: {}, python: {}, java: {} };
    for (const n of cppFileNames) stored.cpp[n] = { content: cppFiles[n] || "", input: cppInputs[n] || "" };
    for (const n of pyFileNames) stored.python[n] = { content: pyFiles[n] || "", input: pyInputs[n] || "" };
    for (const n of javaFileNames) stored.java[n] = { content: javaFiles[n] || "", input: javaInputs[n] || "" };
    return stored;
  }
  // In-memory snapshot (anonymous, contest not currently the open scope).
  const snap = contextSnapshots.get(`contest:${cid}`);
  if (snap) {
    const stored = { cpp: {}, python: {}, java: {} };
    for (const n of snap.cpp.names) stored.cpp[n] = { content: snap.cpp.files[n] || "", input: snap.cpp.inputs[n] || "" };
    for (const n of snap.python.names) stored.python[n] = { content: snap.python.files[n] || "", input: snap.python.inputs[n] || "" };
    for (const n of snap.java?.names || []) stored.java[n] = { content: snap.java.files[n] || "", input: snap.java.inputs[n] || "" };
    return stored;
  }
  if (!isAuthed()) return null;
  const res = await fetch("/api/me/workspace", { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  const has = (data.contests || []).some((c) => String(c.contestId) === cid);
  if (!has) return null;
  const stored = { cpp: {}, python: {}, java: {} };
  for (const f of data.files || []) {
    if (f.scope === "contest" && String(f.contestId) === cid) {
      if (SUPPORTED_LANGUAGES.includes(f.language)) {
        stored[f.language][f.filename] = { content: f.content || "", input: f.input || "" };
      }
    }
  }
  return stored;
}

// The import button in the Saved Contests header reveals a URL field to its
// LEFT (the label/toggles/sort hide). The SAME button then imports the typed
// contest (reusing the top-bar import). Clicking anywhere else restores it.
let contestImportSession = null;
function startContestImport() {
  if (contestImportSession) { contestImportSession.submit(); return; }
  const header = els.savedContestSection?.querySelector(".saved-contests-header");
  const btn = els.addContestBtn;
  if (!header || !btn) return;

  // Hide everything except the import button itself. Use inline display:none so
  // it beats class rules like `.contest-sort-dropdown { display: inline-flex }`.
  const hidden = [];
  const hide = (el) => {
    if (el && el !== btn && el.style.display !== "none") {
      hidden.push([el, el.style.display]);
      el.style.display = "none";
    }
  };
  for (const child of Array.from(header.children)) {
    if (child.contains(btn)) {
      for (const c of Array.from(child.children)) hide(c);
    } else {
      hide(child);
    }
  }

  const input = document.createElement("input");
  input.type = "url";
  input.className = "temp-file-rename-input folder-import-input contest-import-input";
  input.placeholder = "Paste a Codeforces contest URL…";
  input.spellcheck = false;
  input.autocomplete = "off";

  let settled = false;
  const teardown = () => {
    contestImportSession = null;
    input.remove();
    for (const [el, display] of hidden) el.style.display = display;
  };
  const submit = () => {
    if (settled) return;
    const url = input.value.trim();
    if (!url) { cancel(); return; }
    settled = true;
    teardown();
    els.contestUrl.value = url;
    importContest();
  };
  const cancel = () => { if (settled) return; settled = true; teardown(); };
  contestImportSession = { submit, cancel };

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { event.preventDefault(); submit(); }
    else if (event.key === "Escape") { event.preventDefault(); cancel(); }
  });
  input.addEventListener("blur", () => setTimeout(cancel, 150)); // let the button's click land first

  // Place the field to the left of the button, where the label/toggles were.
  header.insertBefore(input, header.firstChild);
  input.focus();
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
    // Re-importing is non-destructive: keep every file already saved for this
    // contest (edits, renames, extras) and only (re)create the canonical problem
    // files that are missing — e.g. ones you deleted or renamed away.
    const existing = await loadExistingContestFiles(result.contestId).catch(() => null);
    // Preserve the context we're leaving (e.g. temp files) in the in-memory store
    // so an anonymous session can switch back to it after importing the contest.
    if (!isAuthed()) stashCurrentContext();
    applyContestProblems(result, existing ? { stored: existing } : {});
    recentContest = {
      url: contestUrl,
      name: result.name || contestUrl,
      contestId: result.contestId,
      contestDir: result.files?.contestDir || ""
    };
    localStorage.setItem("rathee.recentContest", JSON.stringify(recentContest));
    scheduleAppSettingsSave();
    if (isAuthed()) {
      await persistContestToAccount(result).catch(() => {});
      await loadSavedContestList();
    } else {
      addSessionContest(result); // show it in the drawer for this session only
    }
    fetchContestStatuses({ onlyMissing: true }); // check only newly-imported problems
  } catch (error) {
    setDebuggerOutput(error.message);
    setStatus("Import failed", "error");
    els.meta.textContent = "Codeforces import failed";
    showDebug(true);
  } finally {
    setImportBusy(false);
  }
}

// Signed-in: persist a just-imported contest to the account — register it (with
// its problem list) and store every problem file for every language, with the
// fetched sample as the input. applyContestProblems has already populated the
// in-memory file maps, so we save straight from those.
async function persistContestToAccount(result) {
  const contestId = String(result.contestId || "");
  if (!contestId) return;
  const problems = (result.problems || []).map((p) => ({
    index: p.index, name: p.name || "",
    samples: Array.isArray(p.samples) ? p.samples.map((s) => ({ input: s.input || "", output: s.output ?? "" })) : []
  }));
  await fetch("/api/me/contest", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contestId, name: result.name || "", language: els.language.value, problems })
  });
  const uploads = [];
  for (const name of cppFileNames) {
    uploads.push(putMyFile("cpp", "contest", name, cppFiles[name] || "", cppInputs[name] || "", contestId));
  }
  for (const name of pyFileNames) {
    uploads.push(putMyFile("python", "contest", name, pyFiles[name] || "", pyInputs[name] || "", contestId));
  }
  for (const name of javaFileNames) {
    uploads.push(putMyFile("java", "contest", name, javaFiles[name] || "", javaInputs[name] || "", contestId));
  }
  await Promise.all(uploads);
}

// Anonymous: surface the just-imported contest in the drawer for the current
// session (in-memory only — its files are already loaded; not persisted).
function addSessionContest(result) {
  const entry = {
    name: result.name || els.contestUrl.value.trim(),
    contestId: result.contestId || "",
    contestDir: result.files?.contestDir || "",
    problems: (result.problems || []).map((p) => ({ index: p.index, name: p.name, samples: p.samples || [] })),
    problemCount: (result.problems || []).length,
    files: {
      cpp: (result.problems || []).map((p) => `${p.index}.cpp`),
      python: (result.problems || []).map((p) => `${p.index}.py`),
      java: (result.problems || []).map((p) => `${p.index}.java`)
    },
    inMemory: true,
    savedAt: new Date().toISOString()
  };
  savedContests = [entry]; // one active contest's files live in memory at a time
  expandedContestKeys.add(contestKeyFor(entry));
  renderSavedContests();
}

function applyContestProblems(contest, options = {}) {
  const { source = "import", stored = null, onlyStored = false } = options;
  const problems = contest.problems || [];
  const selectedLanguage = SUPPORTED_LANGUAGES.includes(contest.files?.language)
    ? contest.files.language
    : currentLanguageValue();
  const extension = LANGUAGE_CONFIG[selectedLanguage]?.extension || ".cpp";

  // Build files for every supported language. Two modes:
  //  - onlyStored (reopening a saved contest): show EXACTLY the stored files, so
  //    files you deleted stay gone — no canonical problem is recreated.
  //  - otherwise (import / re-import): canonical problem files are (re)created
  //    from fetched/template when missing, kept from `stored` when present, and
  //    any extra stored files (renames, etc.) are appended.
  const buildLang = (language, useFetchedCode) => {
    const config = LANGUAGE_CONFIG[language];
    const ext = config.extension;
    const template = languageState(language).template;
    const saved = stored?.[language] || null;
    const names = [];
    const files = {};
    const inputs = {};
    const labels = {};
    const map = {};
    const labelByName = {};
    const problemByName = {};
    for (const p of problems) {
      labelByName[`${p.index}${ext}`] = `${p.index}${ext} - ${p.name}`;
      problemByName[`${p.index}${ext}`] = p;
    }

    if (onlyStored) {
      for (const fn of Object.keys(saved || {})) {
        names.push(fn);
        files[fn] = saved[fn].content;
        inputs[fn] = saved[fn].input || "";
        labels[fn] = labelByName[fn] || fn;
        map[fn] = problemByName[fn] || null;
      }
      return { names, files, inputs, labels, map };
    }

    for (const p of problems) {
      const fn = `${p.index}${ext}`;
      names.push(fn);
      files[fn] = (saved && fn in saved) ? saved[fn].content : (useFetchedCode ? (p.code ?? template) : template);
      inputs[fn] = (saved && fn in saved) ? (saved[fn].input || "") : (p.samples?.[0]?.input || "");
      labels[fn] = `${p.index}${ext} - ${p.name}`;
      map[fn] = p;
    }
    // Surface any extra stored files for this language that aren't canonical
    // problems (e.g. "AImportedAfterLogin.cpp" merged in at login) as their own tabs.
    if (saved) {
      for (const fn of Object.keys(saved)) {
        if (names.includes(fn) || !fn.endsWith(ext)) continue;
        names.push(fn);
        files[fn] = saved[fn].content;
        inputs[fn] = saved[fn].input || "";
        labels[fn] = fn;
        map[fn] = null;
      }
    }
    return { names, files, inputs, labels, map };
  };
  const built = Object.fromEntries(SUPPORTED_LANGUAGES.map((language) => [language, buildLang(language, language === selectedLanguage)]));
  const cpp = built.cpp;
  const py = built.python;
  const java = built.java;

  codeFileScope = "contest";
  activeContestDir = contest.files?.contestDir || recentContest?.contestDir || "";
  activeContestId = String(contest.contestId || recentContest?.contestId || "");

  cppFileNames = cpp.names; cppFiles = cpp.files; cppInputs = cpp.inputs; cppTabLabels = cpp.labels; cppProblems = cpp.map;
  pyFileNames = py.names; pyFiles = py.files; pyInputs = py.inputs; pyTabLabels = py.labels; pyProblems = py.map;
  javaFileNames = java.names; javaFiles = java.files; javaInputs = java.inputs; javaTabLabels = java.labels; javaProblems = java.map;
  const testsFromBuilt = (built, language) => buildTestsMap(built.names.map((n) => ({
    filename: n, input: built.inputs[n] || "", tests: stored?.[language]?.[n]?.tests
  })));
  cppSamples = testsFromBuilt(cpp, "cpp"); pySamples = testsFromBuilt(py, "python"); javaSamples = testsFromBuilt(java, "java");
  openCppTabs = cpp.names.slice(); openPyTabs = py.names.slice(); openJavaTabs = java.names.slice();
  activeCppFile = cppFileNames[0] || "A.cpp";
  activePyFile = pyFileNames[0] || "A.py";
  activeJavaFile = javaFileNames[0] || "A.java";
  editorView = "code";

  els.language.value = selectedLanguage;
  currentLanguage = els.language.value;
  els.quickLanguage.value = els.language.value;
  renderFileTabs();
  updateDrawerActiveItem();
  els.fileTabs.classList.toggle("python-mode", selectedLanguage === "python");
  setEditorLanguage(els.language.value);
  const activeState = languageState(selectedLanguage);
  const activeFile = activeState.active;
  setEditorCode(activeState.files[activeFile] || activeState.template);
  activeTestIndex = 0; clearTestRun(); refreshIoPanels();
  updateEditorEmptyState();
  const sampleCount = problems.filter((problem) => problem.samples?.length).length;
  const placeholderMessage = contest.placeholder
    ? `Problem data is not available yet. Placeholder A${extension} through G${extension} files were created from ${LANGUAGE_CONFIG[selectedLanguage].templateFile}.`
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
  // Expand + re-render the drawer so the now-open contest shows its live files
  // with rename/delete icons (instead of the plain problem buttons).
  if (activeContestId) expandedContestKeys.add(activeContestId);
  renderSavedContests();
  refreshCodeforcesStatus(false);
}

async function resetActiveCode() {
  const language = currentLanguageValue();
  const state = languageState(language);
  const activeFile = state.active;
  if (editorView !== "code" || !activeFile) {
    setStatus("Code only", "error");
    els.meta.textContent = `Create a ${LANGUAGE_CONFIG[language].label} file first`;
    return;
  }
  const loaded = await reloadTemplateFilesFromWorkspace({ updateVisible: false, resetDirty: true });
  if (!loaded) return;
  const template = languageState(language).template;
  state.files[activeFile] = template;
  setEditorCode(template);
  const save = saveFunctionFor(language, codeFileScope);
  await save(activeFile, template).catch(() => {
    els.meta.textContent = `Could not save ${activeFile} after reset`;
  });
  setStatus("Reset", "success");
  els.meta.textContent = `${activeFile} reset to ${LANGUAGE_CONFIG[language].templateFile}`;
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
    els.resetCodeBtn.title = `Load active problem code from ${LANGUAGE_CONFIG[els.language.value]?.templateFile || "Template.cpp"}`;
  }
  updateSaveFilesButton();
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
  const language = currentLanguageValue();
  const state = languageState(language);
  const activeFile = state.active;
  const problems = state.problems;
  if (!activeFile) {
    setStatus("No file", "error");
    els.meta.textContent = `Create a ${LANGUAGE_CONFIG[language].label} file before submitting`;
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
    language === "cpp" ? "Combined Headers.hpp + active code file was copied to clipboard." : `Active ${LANGUAGE_CONFIG[language].label} file was copied to clipboard.`,
    "Paste it into Codeforces and submit using your logged-in browser session.",
    "Click Status here after submitting, or reload/import again to fetch the latest verdict."
  ].join("\n"));
  showDebug(true);
  setStatus("Submit opened", "idle");
  els.meta.textContent = `Code copied · submit ${problem.index} on Codeforces`;
  // Poll this problem's verdict for up to a minute so the badge updates once
  // the submission is judged, without a manual Status click.
  pollStatusAfterSubmit(`${problem.contestId}|${String(problem.index).toUpperCase()}`);
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

// Copy-button source: for a C++ problem file, prepend Headers.hpp (deduped) so
// the clipboard matches what actually runs/submits. Python/Java and the
// template/headers editor views are copied verbatim.
function getCopyCode() {
  if (els.language.value === "cpp" && editorView === "code") {
    return combineCppSource(getEditorCode());
  }
  return getEditorCode();
}

function getSubmitCode() {
  if (els.language.value === "python") return activePyFile ? pyFiles[activePyFile] || "" : getEditorCode();
  if (els.language.value === "java") return activeJavaFile ? javaFiles[activeJavaFile] || "" : getEditorCode();
  if (!activeCppFile) return "";
  return combineCppSource(cppFiles[activeCppFile] || "");
}

function getRunCode() {
  saveCurrentState();
  if (els.language.value === "python") {
    if (editorView === "python-template") return pythonCode;
    return activePyFile ? pyFiles[activePyFile] || "" : "";
  }
  if (els.language.value === "java") {
    if (editorView === "java-template") return javaCode;
    return activeJavaFile ? javaFiles[activeJavaFile] || "" : "";
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
  // Count the lines the header prefix occupies before the user source in
  // combineCppSource (`<headers>\n\n<stripped source>`). Counting newlines in
  // the exact prefix keeps this correct whether or not the header is empty,
  // unlike a fixed +N constant. Off-by-one here shifts breakpoints (and the
  // current-line highlight) one line away from the line that actually runs.
  const header = cppHeaders.trimEnd();
  const prefixNewlines = `${header}\n\n`.split("\n").length - 1;
  const activeSource = cppFiles[activeCppFile] || "";
  const strippedPrefixLines = duplicateHeaderPrefixLineCount(activeSource);
  return prefixNewlines - strippedPrefixLines;
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

// Map a Codeforces verdict to a short label + style class for the drawer badge.
function verdictDisplay(v) {
  if (!v) return null;
  if (v === "OK") return { text: "Accepted", cls: "ac" };
  if (v === "TESTING") return { text: "Testing", cls: "pending" };
  const map = {
    WRONG_ANSWER: "Wrong answer", TIME_LIMIT_EXCEEDED: "TLE", MEMORY_LIMIT_EXCEEDED: "MLE",
    RUNTIME_ERROR: "Runtime error", COMPILATION_ERROR: "Compile error", PARTIAL: "Partial",
    IDLENESS_LIMIT_EXCEEDED: "ILE", SKIPPED: "Skipped", CHALLENGED: "Hacked"
  };
  const orange = new Set(["PARTIAL", "CHALLENGED"]); // Partial / Hacked → orange
  return { text: map[v] || v.replace(/_/g, " ").toLowerCase(), cls: orange.has(v) ? "partial" : "wa" };
}

// One bulk call gets the best verdict per problem (OK = ever accepted), then we
// badge the given problem keys. relevantKeys also get a "No submission" marker
// when absent from the history so the row shows a status.
async function fetchVerdictPage(from, count) {
  const res = await fetch(`/api/codeforces/verdicts?handle=${encodeURIComponent(codeforcesHandle)}&from=${from}&count=${count}`);
  const data = await res.json();
  if (!res.ok || !data.verdicts) throw new Error(data.error || "Failed to fetch verdicts.");
  return data; // { verdicts, returned, from, count }
}

// Merge a page's per-problem verdicts into problemVerdicts. "newer" pages (recent
// pulls) may update a problem's latest verdict; "older" pages (full-sync
// continuation) only fill gaps. OK is always sticky. Returns true if anything
// changed (so we only persist/re-render on real changes).
function mergeVerdictPage(pageVerdicts, { newer }) {
  let changed = false;
  for (const [k, v] of Object.entries(pageVerdicts || {})) {
    const cur = problemVerdicts[k]?.verdict ?? null;
    if (v === "OK") { if (cur !== "OK") { problemVerdicts[k] = { verdict: "OK" }; changed = true; } continue; }
    if (cur === "OK") continue; // ever-accepted stays accepted
    if (newer) { if (cur !== v) { problemVerdicts[k] = { verdict: v }; changed = true; } }
    else if (cur == null) { problemVerdicts[k] = { verdict: v }; changed = true; }
  }
  return changed;
}

function getVerdictSyncState() {
  try { return JSON.parse(localStorage.getItem("rathee.verdictSync") || "{}") || {}; } catch { return {}; }
}
function setVerdictSyncState(state) {
  try { localStorage.setItem("rathee.verdictSync", JSON.stringify(state)); } catch { /* quota */ }
}

// Problem keys for the open folder/contest (for the "No submission" marker).
function openScopeProblemKeys() {
  const keys = new Set();
  const addNames = (names) => { for (const fn of (names || [])) { const d = deriveProblemFromFilename(fn); if (d) keys.add(`${d.contestId}|${d.index}`); } };
  if (codeFileScope === "folder" && activeFolderId) {
    const folder = savedFolders.find((f) => String(f.folderId) === String(activeFolderId));
    for (const lang of SUPPORTED_LANGUAGES) { addNames(folder?.files?.[lang]); addNames(languageState(lang).names); }
  } else if (codeFileScope === "contest" && activeContestId) {
    for (const lang of SUPPORTED_LANGUAGES) for (const fn of languageState(lang).names) { const idx = String(fn).replace(/\.[^.]+$/, "").toUpperCase(); if (idx) keys.add(`${activeContestId}|${idx}`); }
  }
  return [...keys];
}

// Once the full history is synced, a problem with no record truly has no
// submission — mark the open scope's such problems so the badge shows it.
function markNoSubmissionForOpenScope() {
  if (!getVerdictSyncState().fullySynced) return;
  let changed = false;
  for (const k of openScopeProblemKeys()) if (!problemVerdicts[k]) { problemVerdicts[k] = { verdict: null }; changed = true; }
  if (changed) saveProblemVerdicts();
}

// Background full sync: page through the entire submission history 10k at a time,
// ~10s apart, resuming across reloads via the persisted nextFrom. Runs only until
// fully synced for the current handle; "recent" pulls keep it current after that.
let verdictSyncTimer = null;
async function backgroundVerdictSync() {
  if (!isAuthed() || !validCodeforcesHandle()) return;
  let st = getVerdictSyncState();
  if (st.handle !== codeforcesHandle) { st = { handle: codeforcesHandle, fullySynced: false, nextFrom: 1 }; setVerdictSyncState(st); }
  if (st.fullySynced) return;
  const COUNT = 10000;
  try {
    const page = await fetchVerdictPage(st.nextFrom || 1, COUNT);
    if (getVerdictSyncState().handle !== codeforcesHandle) return; // handle changed mid-flight
    if (mergeVerdictPage(page.verdicts, { newer: false })) { saveProblemVerdicts(); renderFolders(); renderSavedContests(); }
    if (page.returned >= COUNT) {
      st.nextFrom = (st.nextFrom || 1) + COUNT;
      setVerdictSyncState(st);
      clearTimeout(verdictSyncTimer);
      verdictSyncTimer = setTimeout(backgroundVerdictSync, 10000); // next 10k in 10s
    } else {
      st.fullySynced = true;
      setVerdictSyncState(st);
      markNoSubmissionForOpenScope();
      renderFolders();
      renderSavedContests();
    }
  } catch {
    clearTimeout(verdictSyncTimer);
    verdictSyncTimer = setTimeout(backgroundVerdictSync, 15000); // retry later
  }
}

// Pull only the latest ~100 submissions and merge — used on import, the Status
// button, per-folder reload, and the post-submit poll. Cheap and CF-friendly.
async function refreshRecentVerdicts() {
  if (!isAuthed() || !validCodeforcesHandle()) return;
  try {
    const page = await fetchVerdictPage(1, 100);
    const changed = mergeVerdictPage(page.verdicts, { newer: true });
    markNoSubmissionForOpenScope();
    if (changed) saveProblemVerdicts();
    renderFolders();
    renderSavedContests();
  } catch { /* leave existing verdicts */ }
}

// Names kept for existing call sites; both now use the light recent pull.
async function fetchFolderStatuses() { await refreshRecentVerdicts(); }
async function fetchContestStatuses() { await refreshRecentVerdicts(); }
async function fetchFolderStatusesFor() { await refreshRecentVerdicts(); }

let submitPollGen = 0;

function setPollCountdownUI(seconds, left) {
  if (!els.pollCountdown) return;
  if (seconds == null) { els.pollCountdown.hidden = true; els.pollCountdown.textContent = ""; return; }
  els.pollCountdown.hidden = false;
  els.pollCountdown.innerHTML =
    `refreshing status in <span class="poll-countdown-num">${seconds}</span>s` +
    ` · <span class="poll-countdown-num">${left}</span> refresh${left === 1 ? "" : "es"} left`;
}

// After a submit, refresh the open folder/contest verdicts every 5s until the
// submitted problem's verdict settles on a new (non-TESTING) result, or 1 minute
// passes. A red per-second countdown shows when the next refresh fires. A newer
// submit supersedes any running poll.
function pollStatusAfterSubmit(key) {
  const scope = codeFileScope;
  if (!key || (scope !== "folder" && scope !== "contest")) return;
  const container = scope === "folder" ? activeFolderId : activeContestId;
  const baseline = problemVerdicts[key]?.verdict ?? null;
  const deadline = Date.now() + 60000;
  const gen = ++submitPollGen;
  const maxRefreshes = 5;
  let countdown = 5;
  let refreshes = 0;

  const valid = () => gen === submitPollGen && Date.now() < deadline && refreshes < maxRefreshes
    && codeFileScope === scope && (scope === "folder" ? activeFolderId : activeContestId) === container;
  const stop = () => { if (gen === submitPollGen) setPollCountdownUI(null); };

  const step = async () => {
    if (!valid()) { stop(); return; }
    if (countdown > 0) {
      setPollCountdownUI(countdown, maxRefreshes - refreshes);
      countdown -= 1;
      setTimeout(step, 1000);
      return;
    }
    // countdown hit 0 → refresh now
    if (scope === "folder") await fetchFolderStatuses();
    else await fetchContestStatuses();
    if (gen !== submitPollGen) { stop(); return; }
    refreshes += 1;
    const current = problemVerdicts[key]?.verdict ?? null;
    if (current !== baseline && current !== "TESTING") { stop(); return; } // settled
    if (!valid()) { stop(); return; }
    countdown = 5;
    setTimeout(step, 0);
  };
  step();
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
  const problem = languageState().problems[activeFile];
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

// ---- Test cases (Input/Output tabs) --------------------------------------
// Each file carries an editable list of test cases [{input, expected}], stored
// per file in the DB (files.tests). The Input and Output tab strips are linked:
// selecting Input N selects Output N. A ＋ tab adds a case; × deletes one. Run
// executes every case; a case with a non-empty expected output gets a green/red
// verdict on its Output tab. Build from each file's tests, seeding a single case
// from the file's legacy input when none are stored.

function currentTestsMap(language = currentLanguageValue()) {
  return language === "python" ? pySamples : language === "java" ? javaSamples : cppSamples;
}

function buildTestsMap(entries) {
  const map = {};
  for (const e of entries) {
    if (Array.isArray(e.tests) && e.tests.length) {
      map[e.filename] = e.tests.map((t) => ({ input: t.input || "", expected: t.expected ?? t.output ?? "" }));
    } else {
      map[e.filename] = [{ input: e.input || "", expected: "" }];
    }
  }
  return map;
}

// The active file's test list (always at least one case; lazily seeded).
function activeFileTests() {
  const file = currentActiveFile();
  if (!file) return [];
  const map = currentTestsMap();
  if (!Array.isArray(map[file]) || map[file].length === 0) {
    map[file] = [{ input: languageState().inputs[file] || "", expected: "" }];
  }
  return map[file];
}

function clearTestRun() {
  testRun = { file: "", results: {}, customActual: null };
}

// Trailing-whitespace / trailing-newline-insensitive comparison (CP checker rules).
function normalizeForCompare(text) {
  return String(text ?? "").replace(/\r\n/g, "\n").split("\n")
    .map((line) => line.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
}

function outputsMatch(actual, expected) {
  return normalizeForCompare(actual) === normalizeForCompare(expected);
}

function selectTest(index) {
  activeTestIndex = index;
  refreshIoPanels();
}

function resultForActiveTest() {
  if (testRun.file !== currentActiveFile()) return null;
  return testRun.results[activeTestIndex] || null;
}

function addTest() {
  const tests = activeFileTests();
  if (!currentActiveFile()) return;
  tests.push({ input: "", expected: "" });
  activeTestIndex = tests.length - 1;
  persistActiveTests();
  refreshIoPanels();
}

function deleteTest(index) {
  const tests = activeFileTests();
  if (tests.length <= 1) return; // keep at least one
  tests.splice(index, 1);
  if (activeTestIndex >= tests.length) activeTestIndex = tests.length - 1;
  clearTestRun();
  persistActiveTests();
  refreshIoPanels();
}

function persistActiveTests() {
  const file = currentActiveFile();
  if (!isAuthed() || !file) return;
  const language = currentLanguageValue();
  const scope = codeFileScope === "workspace" ? "scratch" : codeFileScope;
  const contestId = codeFileScope === "contest" ? activeContestId : codeFileScope === "folder" ? activeFolderId : "";
  const tests = (currentTestsMap()[file] || []).map((t) => ({ input: t.input || "", expected: t.expected || "" }));
  clearTimeout(testsSaveTimer);
  testsSaveTimer = setTimeout(() => {
    fetch("/api/me/file-tests", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, scope, contestId, filename: file, tests })
    }).catch(() => {});
  }, 400);
}

function refreshIoPanels() {
  if (!els.inputTabs || !els.outputTabs) return;
  const file = currentActiveFile();
  if (editorView !== "code" || !file) {
    els.inputTabs.innerHTML = ""; els.outputTabs.innerHTML = "";
    els.inputTabs.hidden = true; els.outputTabs.hidden = true;
    els.input.value = file ? els.input.value : ""; els.input.readOnly = false;
    els.expectedWrap.hidden = true; els.yourOutputLabel.hidden = true;
    if (els.expectedResizeHandle) els.expectedResizeHandle.hidden = true;
    if (!file) els.output.value = "";
    updateVerdictBadge(null);
    return;
  }
  const tests = activeFileTests();
  activeTestIndex = Math.min(Math.max(activeTestIndex, 0), tests.length - 1);
  renderTestTabs(tests);
  const test = tests[activeTestIndex];
  els.input.value = test.input || "";
  els.input.readOnly = false;
  const result = resultForActiveTest();
  els.output.value = result?.actual ?? "";
  els.expectedWrap.hidden = false;
  els.yourOutputLabel.hidden = false;
  if (els.expectedResizeHandle) els.expectedResizeHandle.hidden = false;
  els.expectedOutput.readOnly = false;
  els.expectedOutput.value = test.expected || "";
  const hasExpected = (test.expected || "").trim().length > 0;
  updateVerdictBadge(hasExpected ? result : null);
}

function updateVerdictBadge(result) {
  const badge = els.verdictBadge;
  els.outputSection.classList.remove("verdict-ac", "verdict-wa");
  badge.classList.remove("ac", "wa");
  if (!result || !result.verdict || result.verdict === "SKIP") { badge.hidden = true; return; }
  const ac = result.verdict === "AC";
  badge.hidden = false;
  badge.textContent = ac ? "✓ Matches expected" : (result.verdict === "ERR" ? "✗ Error" : "✗ Differs");
  badge.classList.add(ac ? "ac" : "wa");
  els.outputSection.classList.add(ac ? "verdict-ac" : "verdict-wa");
}

function renderTestTabs(tests) {
  const build = (container, prefix, isOutput) => {
    container.innerHTML = "";
    tests.forEach((test, i) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "file-tab io-tab";
      tab.classList.toggle("active", i === activeTestIndex);
      const label = document.createElement("span");
      label.textContent = `${prefix} ${i + 1}`;
      tab.append(label);
      if (isOutput && testRun.file === currentActiveFile()) {
        const r = testRun.results[i];
        if (r && (r.verdict === "AC" || r.verdict === "WA" || r.verdict === "ERR")) {
          tab.classList.add(r.verdict === "AC" ? "io-tab--ac" : "io-tab--wa");
        }
      }
      if (tests.length > 1) {
        const del = document.createElement("span");
        del.className = "tab-close";
        del.textContent = "×";
        del.title = "Delete this test case";
        del.addEventListener("click", (event) => { event.stopPropagation(); deleteTest(i); });
        tab.append(del);
      }
      tab.addEventListener("click", () => selectTest(i));
      container.append(tab);
    });
    const add = document.createElement("button");
    add.type = "button";
    add.className = "file-tab add-file-tab io-tab-add";
    add.textContent = "+";
    add.title = "Add a test case";
    add.addEventListener("click", addTest);
    container.append(add);
  };
  build(els.inputTabs, "Input", false);
  build(els.outputTabs, "Output", true);
  els.inputTabs.hidden = false;
  els.outputTabs.hidden = false;
}

async function runOneTest(language, code, input) {
  const res = await fetch("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, code, input, mode: "run", breakpoints: [] })
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Execution failed.");
  return result;
}

async function submit(mode) {
  if (busy) return;
  saveCurrentState();
  const activeFile = currentActiveFile();
  if (editorView === "code" && !activeFile) {
    setStatus("No file", "error");
    els.meta.textContent = `Create a ${LANGUAGE_CONFIG[els.language.value]?.label || "C++"} file with + before running`;
    return;
  }
  const breakpointLines = activeRunBreakpointLines();
  const canDebug = els.language.value !== "java";
  const effectiveMode = canDebug && mode === "run" && breakpointLines.length ? "debug" : mode;

  if (effectiveMode === "debug") {
    await startDebugSession({
      language: els.language.value,
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
    const code = getRunCode();
    const language = els.language.value;
    const tests = activeFileTests();
    testRun = { file: currentActiveFile(), results: {}, customActual: null };

    // Run every test case. A case with a non-empty expected output is checked
    // (AC/WA); one without is just executed (no verdict).
    const results = await Promise.all(tests.map((t) => runOneTest(language, code, t.input)));
    let checked = 0, passed = 0, hasErr = false;
    results.forEach((result, i) => {
      const actual = result.output || "";
      const expected = tests[i].expected || "";
      let verdict;
      if (result.status !== "success") { verdict = "ERR"; hasErr = true; }
      else if (expected.trim()) { verdict = outputsMatch(actual, expected) ? "AC" : "WA"; checked++; if (verdict === "AC") passed++; }
      else verdict = "SKIP";
      testRun.results[i] = { actual, verdict };
    });
    const lastResult = results[activeTestIndex] || results[0];

    refreshIoPanels();

    const debugText = lastResult ? (lastResult.debug || lastResult.stderr || "") : "";
    if (hasErr) {
      setStatus("Error", "error");
      els.meta.textContent = "Run failed — see debugger";
      setDebuggerOutput(debugText || "Compilation/runtime error.");
      showDebug(true);
    } else if (checked > 0) {
      const ok = passed === checked;
      setStatus(ok ? "Accepted" : "Wrong answer", ok ? "success" : "error");
      els.meta.textContent = `Tests: ${passed}/${checked} passed`;
      setDebuggerOutput(debugText || `Ran ${tests.length} test(s) — ${passed}/${checked} matched expected output.`);
      showDebug(!ok && !!debugText);
    } else {
      const ok = lastResult ? lastResult.status === "success" : false;
      setStatus(labelForStatus(lastResult?.status), ok ? "success" : "error");
      els.meta.textContent = `${labelForStatus(lastResult?.status)}${lastResult ? ` · ${lastResult.elapsedMs}ms` : ""}`;
      setDebuggerOutput(debugText || "No debug output.");
      showDebug(!ok);
    }
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
        clientId: debugClientId,
        language: params.language || "cpp",
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

  renderDebugVariables(state, editorLine);
  renderCallStack(state);

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

// Render the locals as one highlighted row per variable instead of raw text.
function renderDebugVariables(state, editorLine) {
  const reason = state.stopReason ? `Stopped: ${state.stopReason}` : "Paused";
  const headText = editorLine && editorLine > 0 ? `${reason} · Line ${editorLine}` : reason;
  const head = `<div class="debug-frame-head">${escapeHtml(headText)}</div>`;

  const vars = parseLldbLocals(state.locals);
  let rows;
  if (!vars.length) {
    rows = `<div class="debug-var-row debug-var-empty">${escapeHtml(state.locals || "No local variables in this frame.")}</div>`;
  } else {
    rows = vars.map((v) => (
      `<div class="debug-var-row">` +
        `<span class="debug-var-name">${escapeHtml(v.name)}</span>` +
        `<span class="debug-var-type">${escapeHtml(v.type)}</span>` +
        `<span class="debug-var-value">${escapeHtml(v.value)}</span>` +
      `</div>`
    )).join("");
  }

  els.debug.classList.add("debug-structured");
  els.debug.innerHTML = head + `<div class="debug-var-list">${rows}</div>`;
}

// lldb `frame variable` prints "(type) name = value"; nested members are
// indented under their parent. Group those continuation lines into the value.
function parseLldbLocals(text) {
  const lines = String(text || "").split("\n");
  const vars = [];
  let current = null;
  for (const line of lines) {
    const match = /^\((.+?)\)\s+(\S+)\s*=\s*([\s\S]*)$/.exec(line);
    if (match && !/^\s/.test(line)) {
      current = { type: match[1], name: match[2], value: match[3] };
      vars.push(current);
    } else if (current) {
      current.value += `\n${line.trim()}`;
    }
  }
  return vars.map((v) => ({ ...v, value: v.value.trim() }));
}

// Render the call stack as one highlighted row per frame, matching the
// variable rows. Frame line numbers are mapped back to editor coordinates.
function renderCallStack(state) {
  const frames = parseCallStack(state.callStack);
  if (!frames.length) {
    els.callStack.classList.remove("debug-structured");
    els.callStack.textContent = remapStackLines(state.callStack || "") || "No call stack available.";
    return;
  }
  const rows = frames.map((f) => (
    `<div class="debug-var-row debug-frame-row">` +
      `<span class="debug-frame-index">#${escapeHtml(f.index)}</span>` +
      `<span class="debug-frame-func">${escapeHtml(f.func)}</span>` +
      `<span class="debug-frame-loc">${escapeHtml(f.location)}</span>` +
    `</div>`
  )).join("");
  els.callStack.classList.add("debug-structured");
  els.callStack.innerHTML = `<div class="debug-var-list">${rows}</div>`;
}

function parseCallStack(text) {
  const offset = debugSession.lineOffset || 0;
  const frames = [];
  for (const line of String(text || "").split("\n")) {
    const match = /frame #(\d+):\s+0x[0-9a-fA-F]+\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    let func = match[2];
    let location = "";
    const atIdx = func.indexOf(" at ");
    if (atIdx !== -1) {
      location = func.slice(atIdx + 4);
      func = func.slice(0, atIdx);
    }
    const tick = func.lastIndexOf("`"); // strip the "module`" prefix
    if (tick !== -1) func = func.slice(tick + 1);
    location = location.replace(/^([^\s:]+):(\d+)(?::\d+)?/, (full, file, ln) => {
      let n = Number(ln);
      if (file === "main.cpp" && offset) {
        const mapped = n - offset;
        if (mapped > 0) n = mapped;
      }
      return `${file}:${n}`;
    });
    frames.push({ index: match[1], func, location });
  }
  return frames;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
  els.debug.classList.remove("debug-structured");
  els.callStack.classList.remove("debug-structured");
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
