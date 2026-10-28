// Public job text must not say a role is H1B-only or shut out
// US citizens and green card holders.
const REPLACEMENTS = [
  [/\bh-?1b\s+candidates?\s+only\b/gi, "open to H1B transfer"],
  [/\bh-?1b\s+only\b/gi, "open to H1B transfer"],
  [/\bonly\s+h-?1b\b/gi, "open to H1B transfer"],
  [/\bno\s+us\s+citizens?\b/gi, "open to US citizens, green card holders, and H1B transfer"],
  [/\bus\s+citizens?\s+only\b/gi, "open to US citizens, green card holders, and H1B transfer"],
  [/\bgreen\s*card\s+holders?\s+only\b/gi, "open to US citizens, green card holders, and H1B transfer"],
  [/\bno\s+green\s*cards?\b/gi, "open to H1B transfer"],
  [/\bmust\s+not\s+be\s+(?:a\s+)?us\s+citizen\b/gi, "open to H1B transfer"],
  [/\bcitizens?\s+need\s+not\s+apply\b/gi, "open to H1B transfer"],
  [/\bexclud(?:e|ing)\s+us\s+citizens?\b/gi, "open to US citizens, green card holders, and H1B transfer"],
];

export function sanitizeJobText(value) {
  if (value == null) return value;
  let text = String(value);
  for (const [pattern, replacement] of REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  return text;
}

export function sanitizeJobFields(fields) {
  const next = { ...fields };
  for (const key of ["title", "description", "requirements", "location"]) {
    if (typeof next[key] === "string") next[key] = sanitizeJobText(next[key]);
    if (Array.isArray(next[key])) next[key] = next[key].map((item) => sanitizeJobText(item));
  }
  return next;
}
