import crypto from "crypto";
import { Readable } from "stream";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import { dynamoDB } from "../config/aws.config.js";

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const ALLOWED = new Map([
  ["application/pdf", ".pdf"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx"],
]);

export function resumeTables() {
  return {
    uploads: process.env.RESUME_UPLOAD_TABLE || "ResumeUploads_dev",
    links: process.env.MAGIC_LINK_TABLE || "MagicLinks_dev",
    users: process.env.USERS_TABLE || "Users_dev",
  };
}

export function validateResumeFile(file) {
  if (!file) return "Choose a PDF or DOCX resume.";
  if (file.size > MAX_RESUME_BYTES) return "Resume must be 5 MB or smaller.";
  const name = String(file.originalname || "").toLowerCase();
  const typeOk = ALLOWED.has(file.mimetype) || name.endsWith(".pdf") || name.endsWith(".docx");
  if (!typeOk) return "Upload a PDF or DOCX file.";
  if (name.endsWith(".doc") && !name.endsWith(".docx")) return "Upload a PDF or DOCX file.";
  return null;
}

export function cloudinaryReady() {
  return Boolean(process.env.CLOUD && process.env.API_KEY && process.env.API_SECRET);
}

export function uploadResume(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "hirees-resumes",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    Readable.from(file.buffer).pipe(stream);
  });
}

export function newToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function saveUpload(record) {
  await dynamoDB.put({ TableName: resumeTables().uploads, Item: record });
}

export async function getUpload(uploadId) {
  const result = await dynamoDB.get({
    TableName: resumeTables().uploads,
    Key: { uploadId },
  });
  return result.Item || null;
}

export async function saveMagicLink(record) {
  await dynamoDB.put({ TableName: resumeTables().links, Item: record });
}

export async function getMagicLink(tokenHash) {
  const result = await dynamoDB.get({
    TableName: resumeTables().links,
    Key: { tokenHash },
  });
  return result.Item || null;
}

export async function getUser(email) {
  const result = await dynamoDB.get({
    TableName: resumeTables().users,
    Key: { email },
  });
  return result.Item || null;
}

export async function saveUser(user) {
  await dynamoDB.put({ TableName: resumeTables().users, Item: user });
}

export function signSession(email) {
  return jwt.sign({ userId: email }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

export function sessionCookie(res, token) {
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function applyResumeToUser({ email, upload, jobAlerts }) {
  const existing = await getUser(email);
  const parsed = upload.parsed || {};
  const unsubscribeToken = existing?.alertUnsubscribeToken || newToken();
  const password = existing?.password || (await bcrypt.hash(newToken(), 10));
  const user = {
    ...(existing || {}),
    email,
    fullname: existing?.fullname || parsed.fullName || email.split("@")[0],
    phoneNumber: existing?.phoneNumber || parsed.phone || "",
    password,
    role: existing?.role || "student",
    jobAlerts: jobAlerts !== false,
    alertUnsubscribeToken: unsubscribeToken,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profile: {
      ...(existing?.profile || {}),
      bio: existing?.profile?.bio || parsed.summary || "",
      skills: existing?.profile?.skills?.length ? existing.profile.skills : parsed.skills || [],
      resume: upload.fileUrl,
      resumeOriginalName: upload.originalName,
      location: existing?.profile?.location || parsed.location || "",
    },
  };
  await saveUser(user);
  await saveUpload({ ...upload, claimedBy: email, claimedAt: new Date().toISOString() });
  const { password: hidden, ...safe } = user;
  return safe;
}

export async function unsubscribeByToken(token) {
  const users = [];
  let ExclusiveStartKey;
  do {
    const page = await dynamoDB.scan({
      TableName: resumeTables().users,
      ExclusiveStartKey,
      FilterExpression: "alertUnsubscribeToken = :token",
      ExpressionAttributeValues: { ":token": token },
    });
    users.push(...(page.Items || []));
    ExclusiveStartKey = page.LastEvaluatedKey;
  } while (ExclusiveStartKey && users.length === 0);
  const user = users[0];
  if (!user) return false;
  user.jobAlerts = false;
  user.updatedAt = new Date().toISOString();
  await saveUser(user);
  return true;
}
