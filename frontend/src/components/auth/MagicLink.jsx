import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "@/utils/constant";

export default function MagicLink() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setMessage("This sign-in link is missing a token.");
      return;
    }
    axios
      .get(`${API_BASE}/resume-match/magic`, { params: { token }, withCredentials: true })
      .then(() => setMessage("You're signed in. Your resume is on your profile."))
      .catch(() => setMessage("This sign-in link is not valid. Upload your resume again to get a new one."));
  }, [params]);

  return (
    <main className="mx-auto max-w-lg px-6 py-24">
      <h1 className="text-2xl font-bold text-[#012760]">Hirees sign-in</h1>
      <p className="mt-3 text-gray-700">{message}</p>
      <Link to="/" className="mt-6 inline-block text-[#0350C6]">Continue to Hirees</Link>
    </main>
  );
}
