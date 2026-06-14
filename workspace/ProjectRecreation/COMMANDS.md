# Commands And Requests Used To Build This Project

This project was built through iterative natural-language commands to Codex, plus local verification commands. The important commands and requests are captured here so the project can be reconstructed or audited later.

## User Build Requests

1. Build an IDE from an empty codebase.
2. Support running C++ and Python code.
3. Add Run and Debug buttons.
4. For competitive programming, read input from an input file/pane and write output to an output file/pane.
5. Support vertical and horizontal split views.
6. Show input and output together, with input above output.
7. Use C++ as the default language.
8. Start with an empty input pane.
9. Show `A.cpp` for C++ and `main.py` for Python.
10. Use a custom C++ competitive-programming template.
11. Add file tabs for C++ files.
12. Add Codeforces contest URL import.
13. Import Codeforces problem names into tabs.
14. Try to import sample input into the input pane.
15. Track Codeforces submissions for handle `mr_awesomeravi`.
16. Add a Submit button that opens Codeforces and copies the combined source.
17. Add syntax highlighting without breaking cursor behavior.
18. Add adjustable editor font size.
19. Rename the app to `Rathee IDE`.
20. Compact the header UI.
21. Add a hamburger side drawer.
22. Add editable `Template.cpp` and `Headers.hpp`.
23. Combine `Headers.hpp` above problem code when running/submitting.
24. Persist `Template.cpp` and `Headers.hpp` in `workspace`.
25. Add `Load from Template`.
26. Add a latest-contest shortcut in the drawer.
27. Store imported contest files under `workspace/contests`.
28. Store temporary C++ files under `workspace/TemporaryCPPFiles`.
29. Load actual `.cpp` files from `TemporaryCPPFiles`, including names like `B1.cpp`.
30. Allow closing all open C++ files.
31. Show a large `Create A.cpp` button when no files exist.

## Local Verification Commands

```bash
npm run dev
node --check server.js
node --check public/app.js
curl -s http://127.0.0.1:4173/api/template-files
curl -s http://127.0.0.1:4173/api/workspace-cpp-files
curl -s -X POST http://127.0.0.1:4173/api/run -H 'Content-Type: application/json' -d '{"language":"cpp","code":"#include <iostream>\nint main(){std::cout<<42<<std::endl;}\n","input":"","mode":"run"}'
curl -s -X POST http://127.0.0.1:4173/api/codeforces/problems -H 'Content-Type: application/json' -d '{"url":"https://codeforces.com/contest/1999","language":"cpp","cppTemplate":"int main(){return 0;}\n","pythonTemplate":"print(0)\n"}'
curl -s 'http://127.0.0.1:4173/api/codeforces/status?handle=mr_awesomeravi&contestId=1999&index=A'
git init
git add .
git commit -m "Build Rathee competitive IDE"
git log --oneline --decorate --stat
```

## Project Start Command

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:4173
```
