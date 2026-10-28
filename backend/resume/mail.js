import nodemailer from "nodemailer";
import { siteUrl } from "../seo/jobs.js";

function transport() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
}

export async function sendMagicLink({ email, token, unsubscribeToken }) {
  const mailer = transport();
  const link = `${siteUrl()}/auth/magic?token=${encodeURIComponent(token)}`;
  const unsubscribe = `${siteUrl()}/alerts/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
  const text = [
    "Get matched with Fstone recruiters.",
    "",
    `Sign in to Hirees: ${link}`,
    "This link expires in 30 minutes.",
    "",
    "Job alerts are on. You will hear about roles that match your resume.",
    `Unsubscribe: ${unsubscribe}`,
  ].join("\n");

  if (!mailer) {
    if (process.env.MAGIC_LINK_DEBUG === "true") {
      console.log("Magic link debug", email);
      return { debug: true };
    }
    const error = new Error("Email is not configured");
    error.status = 503;
    throw error;
  }

  await mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Hirees sign-in link",
    text,
  });
  return { sent: true };
}
