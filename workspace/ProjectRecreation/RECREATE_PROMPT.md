# One-Shot Prompt To Recreate Rathee IDE

Build a local browser-based competitive-programming IDE from an empty codebase.

Use a dependency-light Node.js server plus a browser frontend. The app should run locally at `http://127.0.0.1:4173` with `npm run dev`.

## Core App

Create an IDE named `Rathee IDE` with subtitle `Best Competitive Coding IDE`.

The IDE must support:

- C++17 execution.
- Python 3 execution.
- A `Run` button.
- A `Debug` button.
- A CodeMirror-based code editor with C++ and Python syntax highlighting.
- Adjustable editor font size with `A-` and `A+` controls.
- Vertical/horizontal split toggle.
- Input pane above output pane.
- Input should be passed to the program as stdin and saved to `workspace/input.txt`.
- Program stdout should be displayed and saved to `workspace/output.txt`.
- Debug output should show compiler errors, Python tracebacks, runtime stderr, sanitizer diagnostics where possible, and timeout messages.

## Default Language And Files

- C++ should be selected by default.
- Python should still be available.
- C++ code tabs should load from real files in `workspace/TemporaryCPPFiles`.
- Do not keep a separate cached list of created files in local storage.
- On startup, always scan `workspace/TemporaryCPPFiles` and load every `.cpp` file present there.
- Accept filenames like `A.cpp`, `B.cpp`, `B1.cpp`, `AA.cpp`, `my_file.cpp`, and other names matching letters, numbers, underscore, or dash plus `.cpp`.
- If no `.cpp` files exist in `workspace/TemporaryCPPFiles`, the editor should be read-only and show a large `Create A.cpp` button.
- Clicking `Create A.cpp` or the `+` tab should create the next available alphabetic filename in `workspace/TemporaryCPPFiles`, starting from `A.cpp`, then `B.cpp`, continuing through `Z.cpp`, `AA.cpp`, `AB.cpp`, etc.
- Each code tab should have a visible `x` close control.
- Closing a code tab should delete that file from `workspace/TemporaryCPPFiles`.
- It must be possible to close all files.

## Template And Headers

Create:

- `workspace/Template.cpp`
- `workspace/Headers.hpp`

`Headers.hpp` default content:

```cpp
//#include <bits/stdc++.h>
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
```

`Template.cpp` default content:

```cpp
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
```

Add a hamburger side drawer.

The drawer should contain:

- `Problem Code`
- `Template + Headers`
- a `Latest Contest` section when a contest has been imported.

Clicking `Template + Headers` should show two separate editor tabs:

- `Template.cpp`
- `Headers.hpp`

Both should be editable.

When either file is edited, show a `Save` button. Clicking `Save` writes both files to `workspace/Template.cpp` and `workspace/Headers.hpp`. Do not autosave template/header edits.

When `Template.cpp` or `Headers.hpp` is open, the usual code action button should say `Reload File` and reload that file from `workspace`.

When a problem code file is open, the action button should say `Load from Template`. Clicking it should always reload fresh `Template.cpp` and `Headers.hpp` from `workspace`, then replace the active code file with `Template.cpp` content and save the active file to `workspace/TemporaryCPPFiles`.

When running, debugging, or submitting C++ code, combine:

1. `Headers.hpp`
2. active problem code

Strip duplicate include/namespace lines from the active code if needed.

## Codeforces Integration

Add a Codeforces URL input field.

When a Codeforces contest URL is imported:

- Use the public Codeforces API `contest.standings`.
- Extract the contest id from URLs like `https://codeforces.com/contest/1999`.
- Create tabs matching the problems in that contest.
- Tab labels should include problem index and problem name.
- Try to import sample input from problem pages when accessible.
- If samples are unavailable due to Cloudflare or page protection, handle it gracefully.

When importing contests:

- Create files under `workspace/contests/<contest-id-contest-name>/`.
- If C++ is selected, create only `.cpp` files directly in that contest folder.
- If Python is selected, create a `PythodCode` subfolder and create `.py` files inside it.

In the hamburger drawer, show the latest imported contest under `Latest Contest`.

Shorten displayed contest names:

- `Codeforces` -> `CF`
- `Educational` -> `Edu`
- `Rated for Div. 2` -> `Div2`
- Append contest id at the end, for example `Edu CF Round 191 Div2 - 2233`.

Clicking the latest contest drawer item should re-import that contest.

## Codeforces Submission And Status

Use Codeforces handle:

```text
mr_awesomeravi
```

Add:

- `Submit` button.
- `Status` button.

Do not store Codeforces password or automate login.

Submit behavior:

- Combine `Headers.hpp` plus active code.
- Copy combined source to clipboard.
- Open the correct Codeforces submit page for the active problem.
- User submits through their browser session.

Status behavior:

- Use Codeforces public `user.status` API.
- Fetch recent submissions for `mr_awesomeravi`.
- Filter by active contest/problem.
- Show verdict, language, passed test count, time, memory, and submission URL.

## UI Requirements

- Header should be compact.
- Codeforces URL input text should be slightly small and the URL field wide enough.
- Use one split toggle button instead of separate vertical/horizontal buttons.
- Language selector should be at the end of the top toolbar.
- Hamburger drawer should be wide enough to show recent contest names.
- File tabs should keep close buttons visible even for long Codeforces problem names.
- If no code files exist, show a centered large `Create A.cpp` button instead of an editable code editor.

## Files And Runtime

Use this structure:

```text
package.json
server.js
public/index.html
public/styles.css
public/app.js
workspace/Template.cpp
workspace/Headers.hpp
workspace/TemporaryCPPFiles/.gitkeep
workspace/contests/.gitkeep
```

Ignore generated files:

```text
.DS_Store
workspace/main.py
workspace/main.cpp
workspace/main.out
workspace/main.out.dSYM/
workspace/input.txt
workspace/output.txt
workspace/TemporaryCPPFiles/*
!workspace/TemporaryCPPFiles/.gitkeep
workspace/contests/*
!workspace/contests/.gitkeep
```

The implementation should be robust enough that restarting the site reloads actual files from disk rather than stale browser state.
