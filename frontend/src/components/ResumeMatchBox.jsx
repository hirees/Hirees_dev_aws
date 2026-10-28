import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/utils/constant";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export default function ResumeMatchBox({ compact = false }) {
  const [file, setFile] = useState(null);
  const [uploadId, setUploadId] = useState("");
  const [email, setEmail] = useState("");
  const [jobAlerts, setJobAlerts] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || document.getElementById("google-gsi")) return;
    const script = document.createElement("script");
    script.id = "google-gsi";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const upload = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");
    if (!file) {
      setError("Choose a PDF or DOCX resume.");
      return;
    }
    const form = new FormData();
    form.append("resume", file);
    setBusy(true);
    try {
      const res = await axios.post(`${API_BASE}/resume-match/upload`, form);
      setUploadId(res.data.uploadId);
      setPreview(res.data.parsed);
      setStatus("Resume received. Confirm your email to finish.");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Try a PDF or DOCX under 5 MB.");
    } finally {
      setBusy(false);
    }
  };

  const sendLink = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await axios.post(`${API_BASE}/resume-match/magic-link`, {
        email,
        uploadId,
        jobAlerts,
      });
      setStatus(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Could not send the sign-in link.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError("");
    if (!window.google?.accounts?.id) {
      setError("Google sign-in is not available in this browser.");
      return;
    }
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          await axios.post(
            `${API_BASE}/resume-match/google`,
            { credential: response.credential, uploadId, jobAlerts },
            { withCredentials: true }
          );
          setStatus("You're signed in. Get matched with Fstone recruiters.");
        } catch (err) {
          setError(err.response?.data?.message || "Google sign-in failed.");
        }
      },
    });
    window.google.accounts.id.prompt();
  };

  return (
    <section className={`w-full ${compact ? "px-4 py-4" : "px-4 py-8"}`} id="upload-resume">
      <div className="mx-auto max-w-3xl rounded-2xl border border-blue-100 bg-[#eef4ff] p-6 shadow-sm">
        <p className="text-sm font-semibold text-[#0350C6]">Upload your resume</p>
        <h2 className="mt-1 text-2xl font-bold text-[#012760]">Get matched with Fstone recruiters</h2>
        <p className="mt-2 text-sm text-gray-600">
          Add a PDF or DOCX (5 MB max). Then sign in with an email link{GOOGLE_CLIENT_ID ? " or Google" : ""}.
          We use the resume to prefill your profile when parsing is available.
        </p>
        {!uploadId ? (
          <form onSubmit={upload} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="text-sm"
              aria-label="Upload your resume"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-[#012760] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {busy ? "Uploading..." : "Upload resume"}
            </button>
          </form>
        ) : (
          <form onSubmit={sendLink} className="mt-4 space-y-3">
            {preview?.fullName ? <p className="text-sm text-gray-700">We found the name {preview.fullName} on the resume.</p> : null}
            <label className="block text-sm text-gray-700">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2"
                placeholder="you@email.com"
              />
            </label>
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={jobAlerts}
                onChange={(event) => setJobAlerts(event.target.checked)}
                className="mt-1"
              />
              <span>Email me when a role matches. You can unsubscribe from any alert.</span>
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="submit" disabled={busy} className="rounded-lg bg-[#012760] px-4 py-2 text-sm font-semibold text-white">
                Email me a sign-in link
              </button>
              {GOOGLE_CLIENT_ID ? (
                <button type="button" onClick={google} className="rounded-lg border border-[#012760] px-4 py-2 text-sm font-semibold text-[#012760]">
                  Continue with Google
                </button>
              ) : null}
            </div>
          </form>
        )}
        {status ? <p className="mt-3 text-sm text-green-700">{status}</p> : null}
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </div>
    </section>
  );
}
