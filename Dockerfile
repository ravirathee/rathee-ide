# Sandbox runner image: the throwaway container that USE_DOCKER=1 spawns for
# every g++ / python3 / lldb invocation. It is NOT the web server — the Node
# server stays on the host and launches one of these per run/debug session,
# locked down (no network, read-only FS, dropped caps; see sandbox() in
# server.js). Build:  docker build -t forge-runner .
FROM ubuntu:24.04

# g++ (real GCC — supports <bits/stdc++.h>), python3, and lldb with its Python
# scripting module (needed for the interactive debugger's `script` commands).
RUN apt-get update && apt-get install -y --no-install-recommends \
        g++ \
        python3 \
        lldb \
        python3-lldb \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Run as a non-root user. ubuntu:24.04 already ships a uid 1000 user
# ("ubuntu"), which matches the --user 1000:1000 the sandbox launches with;
# reuse it. /work is the bind-mounted, world-writable per-run temp dir.
USER ubuntu
WORKDIR /work
