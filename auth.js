// ---------------------------------------------------------------------------
// Authentication: verifies Google Sign-In ID tokens and issues signed session
// cookies. Uses only Node built-ins (node:crypto + node:https) — no extra deps.
// ---------------------------------------------------------------------------
import crypto from "node:crypto";
import https from "node:https";

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "1024860334857-u24234o19medag8vkecffvfmdv35l87h.apps.googleusercontent.com";

const SESSION_SECRET = process.env.SESSION_SECRET || "dev-insecure-session-secret-change-in-prod";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";

if (!process.env.SESSION_SECRET) {
  console.warn("auth: SESSION_SECRET not set — using an insecure default (fine for local dev only).");
}

// ---- Google ID token verification (RS256 against Google's JWKS) ----
let jwksCache = { keys: [], fetchedAt: 0 };

function httpsGetJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => { data += c; });
        res.on("end", () => {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        });
      })
      .on("error", reject);
  });
}

async function googleKeys() {
  const now = Date.now();
  if (jwksCache.keys.length && now - jwksCache.fetchedAt < 60 * 60 * 1000) return jwksCache.keys;
  const data = await httpsGetJson(JWKS_URL);
  jwksCache = { keys: data.keys || [], fetchedAt: now };
  return jwksCache.keys;
}

const b64urlBuf = (s) => Buffer.from(String(s).replace(/-/g, "+").replace(/_/g, "/"), "base64");
const b64urlJson = (s) => JSON.parse(b64urlBuf(s).toString("utf8"));

// Verify a Google ID token and return { sub, email, name, picture } or throw.
export async function verifyGoogleIdToken(idToken) {
  if (!idToken || String(idToken).split(".").length !== 3) throw new Error("Malformed token");
  const [h, p, s] = idToken.split(".");
  const header = b64urlJson(h);
  const payload = b64urlJson(p);

  const keys = await googleKeys();
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) throw new Error("Signing key not found");

  const pub = crypto.createPublicKey({ key: jwk, format: "jwk" });
  const ok = crypto.verify("RSA-SHA256", Buffer.from(`${h}.${p}`), pub, b64urlBuf(s));
  if (!ok) throw new Error("Bad signature");

  if (payload.iss !== "accounts.google.com" && payload.iss !== "https://accounts.google.com") {
    throw new Error("Bad issuer");
  }
  if (payload.aud !== GOOGLE_CLIENT_ID) throw new Error("Token not for this app");
  if (!payload.exp || payload.exp * 1000 < Date.now()) throw new Error("Token expired");

  return { sub: payload.sub, email: payload.email, name: payload.name, picture: payload.picture };
}

// ---- Signed session cookie (HMAC) ----
export function createSessionToken(userId) {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp: Date.now() + SESSION_TTL_MS })).toString("base64url");
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readSessionToken(token) {
  if (!token || token.indexOf(".") === -1) return null;
  const [payload, sig] = token.split(".");
  const expect = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expect);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || data.exp < Date.now()) return null;
    return data.uid;
  } catch {
    return null;
  }
}

export function parseCookies(req) {
  const out = {};
  const raw = req.headers.cookie;
  if (!raw) return out;
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i > -1) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export function sessionCookieHeader(token, req) {
  const isHttps = req.headers["x-forwarded-proto"] === "https";
  const secure = isHttps ? " Secure;" : "";
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  return `session=${token}; Path=/; HttpOnly; SameSite=Lax;${secure} Max-Age=${maxAge}`;
}

export function clearSessionCookieHeader() {
  return "session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
}
