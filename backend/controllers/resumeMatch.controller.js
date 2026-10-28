import { v4 as uuidv4 } from "uuid";
import { parseResumeFile } from "../resume/parseResume.js";
import { sendMagicLink } from "../resume/mail.js";
import {
  applyResumeToUser,
  cloudinaryReady,
  getMagicLink,
  getUpload,
  hashToken,
  newToken,
  saveMagicLink,
  saveUpload,
  sessionCookie,
  signSession,
  unsubscribeByToken,
  uploadResume,
  validateResumeFile,
} from "../resume/storage.js";

function emailOk(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const uploadForMatch = async (req, res) => {
  try {
    const problem = validateResumeFile(req.file);
    if (problem) return res.status(400).json({ success: false, message: problem });
    if (!cloudinaryReady()) {
      return res.status(503).json({
        success: false,
        message: "Resume storage is not configured. Set CLOUD, API_KEY, and API_SECRET.",
      });
    }

    const stored = await uploadResume(req.file);
    const parsed = await parseResumeFile(req.file);
    const uploadId = uuidv4();
    await saveUpload({
      uploadId,
      fileUrl: stored.secure_url || stored.url,
      publicId: stored.public_id,
      originalName: req.file.originalname,
      parsed,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({
      success: true,
      uploadId,
      parsed: parsed
        ? {
            fullName: parsed.fullName,
            location: parsed.location,
            skills: parsed.skills,
          }
        : null,
    });
  } catch (error) {
    console.error("Resume upload error", error.message);
    return res.status(500).json({ success: false, message: "Could not store that resume." });
  }
};

export const requestMagicLink = async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const uploadId = String(req.body?.uploadId || "");
    const jobAlerts = req.body?.jobAlerts !== false;
    if (!emailOk(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address." });
    }
    const upload = await getUpload(uploadId);
    if (!upload) return res.status(404).json({ success: false, message: "Upload that resume again." });

    const token = newToken();
    const unsubscribeToken = newToken();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    await saveMagicLink({
      tokenHash: hashToken(token),
      email,
      uploadId,
      jobAlerts,
      unsubscribeToken,
      expiresAt,
      createdAt: new Date().toISOString(),
    });
    await sendMagicLink({ email, token, unsubscribeToken });
    return res.json({
      success: true,
      message: "Check your email for a sign-in link. Job alerts are on unless you turned them off.",
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      success: false,
      message: status === 503 ? "Email is not configured yet." : "Could not send the sign-in link.",
    });
  }
};

export async function consumeMagicToken(token) {
  if (!token || !process.env.SECRET_KEY) return null;
  const link = await getMagicLink(hashToken(token));
  if (!link || link.usedAt) return null;
  if (new Date(link.expiresAt).getTime() < Date.now()) return null;
  const upload = await getUpload(link.uploadId);
  if (!upload) return null;
  const user = await applyResumeToUser({
    email: link.email,
    upload,
    jobAlerts: link.jobAlerts !== false,
  });
  await saveMagicLink({ ...link, usedAt: new Date().toISOString() });
  return { user, token: signSession(link.email), unsubscribeToken: link.unsubscribeToken };
}

export const magicLinkHtml = async (req, res) => {
  try {
    const session = await consumeMagicToken(String(req.query.token || ""));
    if (!session) {
      return res.status(400).type("html").send(
        "<!doctype html><html><body><h1>This sign-in link is not valid</h1><p>Request a new link from the resume upload box.</p></body></html>"
      );
    }
    sessionCookie(res, session.token);
    const alerts = session.user.jobAlerts
      ? `Job alerts are on. <a href="/alerts/unsubscribe?token=${encodeURIComponent(session.unsubscribeToken)}">Unsubscribe</a>.`
      : "Job alerts are off.";
    return res.type("html").send(
      `<!doctype html><html><head><title>Signed in | Hirees</title><meta name="robots" content="noindex"></head><body><h1>You're signed in</h1><p>Get matched with Fstone recruiters. Your resume is on your profile.</p><p>${alerts}</p><p><a href="/">Continue to Hirees</a></p></body></html>`
    );
  } catch (error) {
    console.error("Magic link error", error.message);
    return res.status(500).type("html").send("<h1>Sign-in failed</h1>");
  }
};

export const magicLinkJson = async (req, res) => {
  try {
    const session = await consumeMagicToken(String(req.query.token || ""));
    if (!session) return res.status(400).json({ success: false, message: "This sign-in link is not valid." });
    sessionCookie(res, session.token);
    return res.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Magic link error", error.message);
    return res.status(500).json({ success: false, message: "Sign-in failed." });
  }
};

export const googleSignIn = async (req, res) => {
  try {
    const credential = String(req.body?.credential || "");
    const uploadId = String(req.body?.uploadId || "");
    const jobAlerts = req.body?.jobAlerts !== false;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!credential || !clientId) {
      return res.status(400).json({ success: false, message: "Google sign-in is not configured." });
    }
    const infoResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );
    if (!infoResponse.ok) {
      return res.status(401).json({ success: false, message: "Google did not accept that sign-in." });
    }
    const info = await infoResponse.json();
    if (info.aud !== clientId || info.email_verified !== "true") {
      return res.status(401).json({ success: false, message: "Google did not accept that sign-in." });
    }
    const upload = await getUpload(uploadId);
    if (!upload) return res.status(404).json({ success: false, message: "Upload that resume again." });
    const user = await applyResumeToUser({
      email: String(info.email).toLowerCase(),
      upload,
      jobAlerts,
    });
    if (!process.env.SECRET_KEY) {
      return res.status(503).json({ success: false, message: "Sign-in is not configured." });
    }
    sessionCookie(res, signSession(user.email));
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Google sign-in error", error.message);
    return res.status(500).json({ success: false, message: "Google sign-in failed." });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const ok = await unsubscribeByToken(String(req.query.token || ""));
    const title = ok ? "Job alerts are off" : "Unsubscribe link not found";
    const message = ok
      ? "You will not get job alert emails. You can turn them on again from your profile later."
      : "This unsubscribe link is not valid.";
    return res.status(ok ? 200 : 404).type("html").send(
      `<!doctype html><html><head><title>${title} | Hirees</title><meta name="robots" content="noindex"></head><body><h1>${title}</h1><p>${message}</p><p><a href="/">Hirees home</a></p></body></html>`
    );
  } catch (error) {
    console.error("Unsubscribe error", error.message);
    return res.status(500).type("html").send("<h1>Could not update job alerts</h1>");
  }
};
