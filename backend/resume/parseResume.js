const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const PROMPT = `Extract the candidate profile from this resume. Return only JSON with keys fullName, email, phone, location, summary, skills (array of short strings), experienceYears (string). Use empty strings or an empty array when unknown. Do not invent an employer exclusion such as H1B only.`;

function parseJson(text) {
  const match = String(text || "").match(/\{[\s\S]*\}/);
  if (!match) return null;
  const data = JSON.parse(match[0]);
  return {
    fullName: String(data.fullName || "").slice(0, 120),
    email: String(data.email || "").slice(0, 160),
    phone: String(data.phone || "").slice(0, 40),
    location: String(data.location || "").slice(0, 120),
    summary: String(data.summary || "").slice(0, 2000),
    skills: Array.isArray(data.skills) ? data.skills.map((skill) => String(skill).slice(0, 60)).slice(0, 30) : [],
    experienceYears: String(data.experienceYears || "").slice(0, 20),
  };
}

async function gemini(parts) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: { temperature: 0.1, responseMimeType: "application/json" },
      }),
    }
  );
  if (!response.ok) {
    console.error("Resume parse failed", response.status);
    return null;
  }
  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n");
  return parseJson(text);
}

export async function parseResumeFile(file) {
  try {
    if (!process.env.GEMINI_API_KEY) return null;
    if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
      return await gemini([
        { text: PROMPT },
        { inline_data: { mime_type: "application/pdf", data: file.buffer.toString("base64") } },
      ]);
    }
    const mammoth = await import("mammoth");
    const extracted = await mammoth.extractRawText({ buffer: file.buffer });
    const text = String(extracted.value || "").slice(0, 20000);
    if (!text.trim()) return null;
    return await gemini([{ text: `${PROMPT}\n\n${text}` }]);
  } catch (error) {
    console.error("Resume parse error", error.message);
    return null;
  }
}
