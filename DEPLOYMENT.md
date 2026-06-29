# DEPLOYMENT.md

How **Rathee IDE** (this repo) is deployed and kept running in production. Written
so any agent (Codex, Claude, etc.) or human can understand and operate the prod
setup without re-discovering it.

> ⚠️ **Secrets are redacted in this file** (it lives in a public-ish GitHub repo).
> The real values of `DB_PASSWORD` and `SESSION_SECRET` live only in the launchd
> plist on the prod Mac: `~/Library/LaunchAgents/com.rathee.ide.plist`. Never
> commit them here.

---

## TL;DR

- **Public URL:** https://ravirathee.com (and https://www.ravirathee.com)
- **Where it runs:** a physical Mac at home ("prod Mac"), behind a **Cloudflare
  Tunnel** (no port-forwarding, no public IP needed).
- **The app:** plain Node (`node server.js`) listening on `127.0.0.1:4173`,
  managed by **launchd** (auto-start at boot, auto-restart on crash).
- **Code sandbox:** g++/python3/javac/java/lldb run inside Docker via **Colima**
  (image `forge-runner`).
- **DB:** MySQL via Homebrew, database `rathee_ide`.
- **Deploy:** SSH into the prod Mac and run `bash ~/deploy.sh` (git pull → maybe
  rebuild image → restart server → health check).

---

## 1. The prod Mac (host)

| Item | Value |
|------|-------|
| Hostname (mDNS) | `ravis-macbook-pro.local` |
| Computer name | `Ravis-MacBook-Pro.local` |
| LAN IP | `192.168.0.2` (stable — see DHCP reservation below) |
| Login user | `ravimacprobar` |
| Home | `/Users/ravimacprobar` |
| OS | macOS 15.5 (build 24F74) |
| Wi-Fi MAC | `14:7d:da:8d:f5:95` |
| Router / gateway | `192.168.0.1` |
| Active interface | `en0` (Wi-Fi) |

The **dev Mac** (where the code is edited) is a *different* machine:
`Ravis-MacBook-Pro-2.local` at `192.168.0.4`. Don't confuse the two.

### SSH access (from the dev Mac)

```bash
ssh ravimacprobar@192.168.0.2          # or: ssh ravimacprobar@ravis-macbook-pro.local
```

Auth is by SSH key (`~/.ssh/id_ed25519` on the dev Mac, public key added to the
prod Mac's `~/.ssh/authorized_keys`). Password auth is also enabled as a fallback.

### Static LAN IP via DHCP reservation

The prod Mac's Wi-Fi is set to **DHCP** (not a manually-typed static IP). The
stable `192.168.0.2` comes from a **DHCP reservation on the router**
(`192.168.0.1`) that pins IP `192.168.0.2` to MAC `14:7d:da:8d:f5:95`.

To reproduce on a new router / new machine:
1. Find the Mac's Wi-Fi MAC: `networksetup -getmacaddress "Wi-Fi"`.
2. In the router admin UI (http://192.168.0.1) → DHCP / LAN settings → "Address
   Reservation" (name varies by vendor) → bind that MAC to the desired LAN IP.
3. Renew the lease on the Mac (toggle Wi-Fi off/on) and confirm with
   `ipconfig getifaddr en0`.

> The static LAN IP is mainly for **SSH/admin convenience**. Public traffic does
> **not** depend on it — Cloudflare Tunnel makes an outbound connection, so no
> inbound port-forwarding or public static IP is required.

---

## 2. Public exposure — Cloudflare Tunnel

The site is served through `cloudflared` (a Cloudflare Tunnel), managed by launchd.

- Binary: `/usr/local/bin/cloudflared` (v2026.6.1 at time of writing)
- Tunnel name: `rathee-ide`
- Tunnel UUID: `89112c68-4c37-4cdf-9eb9-f93b082614fd`
- Config: `~/.cloudflared/config.yml`
- Tunnel credentials: `~/.cloudflared/89112c68-4c37-4cdf-9eb9-f93b082614fd.json` (**secret**)
- Account cert: `~/.cloudflared/cert.pem` (**secret**)
- Log: `~/Library/Logs/cloudflared.log`

`~/.cloudflared/config.yml`:

```yaml
tunnel: 89112c68-4c37-4cdf-9eb9-f93b082614fd
credentials-file: /Users/ravimacprobar/.cloudflared/89112c68-4c37-4cdf-9eb9-f93b082614fd.json
ingress:
  - hostname: ravirathee.com
    service: http://localhost:4173
  - hostname: www.ravirathee.com
    service: http://localhost:4173
  - service: http_status:404
```

- **TLS** is terminated by Cloudflare at the edge; origin traffic is plain HTTP to
  `localhost:4173`. The app reads `x-forwarded-proto` (set by Cloudflare) to mark
  the session cookie `Secure` — see `auth.js` `sessionCookieHeader`.
- DNS for `ravirathee.com` / `www` are **CNAME → tunnel** records in the
  Cloudflare dashboard (created once via `cloudflared tunnel route dns rathee-ide ravirathee.com`).

---

## 3. The app process — launchd `com.rathee.ide`

Managed by `~/Library/LaunchAgents/com.rathee.ide.plist` (a per-user GUI agent).

- Command: `/usr/local/bin/node /Users/ravimacprobar/rathee-ide/server.js`
- WorkingDirectory: `/Users/ravimacprobar/rathee-ide`
- `RunAtLoad` + `KeepAlive` = starts at login, restarts on crash.
- Listens on `127.0.0.1:4173` (localhost only — public access is via the tunnel).
- Logs (stdout+stderr): `~/Library/Logs/rathee-ide.log`
- Node: `/usr/local/bin/node` (Node is **not** on the default non-login `PATH`;
  scripts must export `PATH=/usr/local/bin:...` first).

### Environment variables (set in the plist's `EnvironmentVariables`)

| Var | Value | Notes |
|-----|-------|-------|
| `PORT` | `4173` | |
| `USE_DOCKER` | `1` | run code in the Colima/Docker sandbox |
| `RUNNER_IMAGE` | `forge-runner` | sandbox image name |
| `DOCKER_HOST` | `unix:///Users/ravimacprobar/.colima/default/docker.sock` | point Docker CLI at Colima |
| `RUN_DIR_BASE` | `/Users/ravimacprobar/.forge-runs` | per-run temp dir the Colima VM can bind-mount (NOT `/var/folders`) |
| `MAX_CONCURRENT_RUNS` | `10` | |
| `MAX_DEBUG_SESSIONS` | `12` | |
| `RATE_LIMIT_PER_MIN` | `30` | |
| `DB_HOST` | `127.0.0.1` | |
| `DB_PORT` | `3306` | |
| `DB_USER` | `rathee` | |
| `DB_PASSWORD` | **(redacted — in the plist)** | |
| `DB_NAME` | `rathee_ide` | |
| `GOOGLE_CLIENT_ID` | `1024860334857-u24234o19medag8vkecffvfmdv35l87h.apps.googleusercontent.com` | public (client-side) OAuth client id |
| `SESSION_SECRET` | **(redacted — in the plist)** | HMAC key for session cookies |

### Managing the service

```bash
UID0=$(id -u)
launchctl kickstart -k "gui/$UID0/com.rathee.ide"   # restart (used by deploy.sh)
launchctl print "gui/$UID0/com.rathee.ide"          # status / last exit code
launchctl bootout  "gui/$UID0/com.rathee.ide"       # stop + unload
launchctl bootstrap "gui/$UID0" ~/Library/LaunchAgents/com.rathee.ide.plist  # load
tail -f ~/Library/Logs/rathee-ide.log               # logs
```

> `com.rathee.ide.plist.bak` is a previous version of the plist kept as a backup.

---

## 4. Code-execution sandbox — Colima + Docker

User-submitted C++/Python is **never** run on the host; each run/debug spawns a
locked-down container (see `sandbox()` in `server.js`). Docker is provided by
**Colima** (Lima VM), not Docker Desktop.

- Colima autostart: `~/Library/LaunchAgents/com.rathee.colima.plist`
  (`colima start` at boot; log `~/Library/Logs/colima-autostart.log`).
- VM: macOS Virtualization.Framework, arch `x86_64`, runtime docker, mount `virtiofs`.
- Docker socket: `~/.colima/default/docker.sock` (matches `DOCKER_HOST` above).
- Sandbox image: **`forge-runner:latest`** built from this repo's `Dockerfile`
  (Ubuntu 24.04 + g++ + python3 + OpenJDK + lldb).

Build / rebuild the runner image:

```bash
cd ~/rathee-ide && docker build -t forge-runner .
```

> Why `RUN_DIR_BASE=~/.forge-runs`: the Colima VM only bind-mounts certain host
> paths (e.g. `$HOME`), **not** macOS's `/var/folders` temp dir. Per-run dirs must
> live under `$HOME` so the container can see them. Don't move this off `$HOME`.

---

## 5. Database — MySQL (Homebrew)

- Managed by `brew services` → `~/Library/LaunchAgents/homebrew.mxcl.mysql.plist`.
- `mysqld_safe --datadir=/usr/local/var/mysql`, listening on `127.0.0.1:3306`.
- Database `rathee_ide`, app user `rathee` (password in the IDE plist).
- Schema/tables are created by the app at startup (`store.js`); it tolerates a
  missing `CREATE DATABASE` privilege.

```bash
brew services list                       # check mysql is "started"
brew services restart mysql              # restart
mysql -u rathee -p rathee_ide            # connect (password from plist)
```

---

## 6. Keep-awake — caffeinate

`~/Library/LaunchAgents/com.rathee.caffeinate.plist` runs `caffeinate -dimsu`
(KeepAlive) so the Mac never sleeps and the site stays reachable with the lid
behavior configured for clamshell/headless operation.

---

## 7. Deploying a new version

All deploys are **pull-based from GitHub** (`origin` =
`https://github.com/ravirathee/rathee-ide.git`, branch `main`). Workflow:

1. On the **dev Mac**: commit + push to `main`.
   - Per project policy, verify locally first at `http://127.0.0.1:4173` before pushing.
2. SSH into the **prod Mac** and run the deploy script:

```bash
ssh ravimacprobar@192.168.0.2 'bash ~/deploy.sh'
```

`~/deploy.sh` does:
1. `cd ~/rathee-ide`
2. `git pull --ff-only` (fast-forward `main`)
3. If `Dockerfile` changed between old/new HEAD → `docker build -t forge-runner .`
4. `launchctl kickstart -k gui/$(id -u)/com.rathee.ide`  (restart the server)
5. Health-check: `curl` `http://127.0.0.1:4173/` (local) and
   `https://ravirathee.com/` (public).

Build/deploy output is appended to `~/forge-deploy.log`.

> Note: deploys are **manual** (no CI/CD, no GitHub Actions runner). The prod repo
> only advances when someone runs `deploy.sh`. If `git pull` can't fast-forward
> (e.g. history rewritten), the deploy aborts — fix the repo state manually.

---

## 8. Health checks & troubleshooting

```bash
# Is the app up locally?
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4173/        # expect 200

# Is it up publicly (through the tunnel)?
curl -s -o /dev/null -w "%{http_code}\n" https://ravirathee.com/        # expect 200

# What's listening?
lsof -iTCP -sTCP:LISTEN -n -P | grep node                              # node on 127.0.0.1:4173

# Logs
tail -f ~/Library/Logs/rathee-ide.log        # app
tail -f ~/Library/Logs/cloudflared.log       # tunnel
tail -f ~/Library/Logs/colima-autostart.log  # docker VM
```

Common failure modes:

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Site down, local `curl` 200 | tunnel down | `launchctl kickstart -k gui/$(id -u)/com.rathee.tunnel`; check `cloudflared.log` |
| Local `curl` fails | app crashed / not loaded | check `rathee-ide.log`; `launchctl kickstart -k .../com.rathee.ide` |
| Runs fail with "docker" errors | Colima not started | `colima status`; `colima start`; verify `DOCKER_HOST` |
| Runs fail: cannot mount temp dir | `RUN_DIR_BASE` off `$HOME` | keep it under `/Users/ravimacprobar/.forge-runs` |
| Login broken | DB down or `SESSION_SECRET`/`GOOGLE_CLIENT_ID` wrong | `brew services list`; check plist env |
| Site sleeps after a while | caffeinate not loaded | reload `com.rathee.caffeinate` |

---

## 9. File / path map (prod Mac)

```
/Users/ravimacprobar/
├── rathee-ide/                         # the app repo (origin: github.com/ravirathee/rathee-ide, branch main)
│   ├── server.js                       # the web server (launchd runs this)
│   ├── Dockerfile                      # builds the forge-runner sandbox image
│   └── workspace/                      # runtime I/O, templates, contests, per-user data
├── deploy.sh                           # the deploy script (git pull → build → restart → health check)
├── forge-deploy.log                    # deploy/build output log
├── .forge-runs/                        # RUN_DIR_BASE — per-run sandbox temp dirs
├── .colima/default/docker.sock         # Colima's Docker socket (DOCKER_HOST)
├── .cloudflared/
│   ├── config.yml                      # tunnel ingress config
│   ├── <uuid>.json                     # tunnel credentials (SECRET)
│   └── cert.pem                        # cloudflare account cert (SECRET)
└── Library/
    ├── LaunchAgents/
    │   ├── com.rathee.ide.plist        # the Node app  (+ .bak backup)
    │   ├── com.rathee.tunnel.plist     # cloudflared
    │   ├── com.rathee.colima.plist     # colima start at boot
    │   ├── com.rathee.caffeinate.plist # keep awake
    │   └── homebrew.mxcl.mysql.plist   # MySQL
    └── Logs/
        ├── rathee-ide.log
        ├── cloudflared.log
        └── colima-autostart.log
```

---

## 10. Disaster-recovery checklist (rebuild prod from scratch)

1. macOS Mac, create user `ravimacprobar`, enable Remote Login (SSH), add the dev
   Mac's SSH public key to `~/.ssh/authorized_keys`.
2. Router: add DHCP reservation pinning the Mac's Wi-Fi MAC to `192.168.0.2`.
3. Install Homebrew; `brew install node colima docker mysql cloudflared`.
4. `git clone https://github.com/ravirathee/rathee-ide.git ~/rathee-ide`.
5. Start Colima (`colima start`) and build the image
   (`cd ~/rathee-ide && docker build -t forge-runner .`).
6. `brew services start mysql`; create DB `rathee_ide` + user `rathee` with the
   stored password.
7. `cloudflared tunnel login`; recreate/restore tunnel `rathee-ide`; restore
   `~/.cloudflared/config.yml` + credentials json; `cloudflared tunnel route dns
   rathee-ide ravirathee.com` (and `www`).
8. Restore the five LaunchAgents into `~/Library/LaunchAgents/` (with the real
   secrets in `com.rathee.ide.plist`), then `launchctl bootstrap gui/$(id -u) <plist>`
   for each (or just log out/in — all are `RunAtLoad`).
9. Verify: `curl http://127.0.0.1:4173/` and `https://ravirathee.com/` → 200.

---

*Last verified live on the prod Mac: 2026-06-23. Prod was at commit `06d7766`;
run `deploy.sh` to advance it to the latest `main`.*
