import crypto from "crypto";
import { jobPageUrl } from "./jobs.js";

let cachedToken = null;

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function indexingConfigured() {
  return (
    process.env.GOOGLE_INDEXING_ENABLED === "true" &&
    process.env.GOOGLE_INDEXING_CLIENT_EMAIL &&
    process.env.GOOGLE_INDEXING_PRIVATE_KEY
  );
}

async function accessToken() {
  if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.value;
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: process.env.GOOGLE_INDEXING_CLIENT_EMAIL,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const unsigned = `${header}.${claim}`;
  const key = process.env.GOOGLE_INDEXING_PRIVATE_KEY.replace(/\\n/g, "\n");
  const signature = crypto.createSign("RSA-SHA256").update(unsigned).sign(key).toString("base64url");
  const assertion = `${unsigned}.${signature}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!response.ok) {
    throw new Error(`Indexing token request failed (${response.status})`);
  }
  const payload = await response.json();
  cachedToken = {
    value: payload.access_token,
    exp: Date.now() + (payload.expires_in || 3600) * 1000,
  };
  return cachedToken.value;
}

// Optional. No-ops unless GOOGLE_INDEXING_ENABLED=true and a service account is set.
export async function notifyGoogleIndexing(url, type = "URL_UPDATED") {
  if (!indexingConfigured()) return { skipped: true };
  try {
    const token = await accessToken();
    const response = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type }),
    });
    if (!response.ok) {
      console.error("Google Indexing API error", response.status);
      return { ok: false, status: response.status };
    }
    return { ok: true };
  } catch (error) {
    console.error("Google Indexing API failed", error.message);
    return { ok: false };
  }
}

export function pingJobChange(jobId, type = "URL_UPDATED") {
  if (!jobId) return;
  void notifyGoogleIndexing(jobPageUrl(jobId), type);
}
