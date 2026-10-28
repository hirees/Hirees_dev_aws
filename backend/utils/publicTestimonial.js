const PLACEHOLDER_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "example.test",
  "mailinator.com",
  "localhost",
]);

const TEST_NAME = /^(test|testing|demo|sample|user|admin|asdf|xxx|foo|bar)$/i;
const TEST_TEXT = /\b(lorem ipsum|porem ipsum|asdf+|qwerty)\b/i;

function emailDomain(email) {
  const value = String(email || "").trim().toLowerCase();
  const at = value.lastIndexOf("@");
  return at === -1 ? "" : value.slice(at + 1);
}

export function isPlaceholderTestimonial(item) {
  const name = String(item?.name || "").trim();
  const message = String(item?.message || item?.text || "").trim();
  if (!message) return true;
  if (PLACEHOLDER_DOMAINS.has(emailDomain(item?.email))) return true;
  if (TEST_NAME.test(name)) return true;
  if (TEST_TEXT.test(message) || TEST_TEXT.test(name)) return true;
  return false;
}

// Rows with no published/approved flag are legacy records. They can be shown
// once they pass the placeholder filter. New submissions set published: false
// and stay hidden until someone sets published: true. A placeholder is never
// shown, even if it was marked published.
export function isApprovedForPublic(item) {
  if (!item || typeof item !== "object") return false;
  const status = String(item.status || "").toLowerCase();
  if (item.published === false || item.approved === false) return false;
  if (["draft", "hidden", "unpublished", "rejected", "pending"].includes(status)) {
    return false;
  }
  if (item.published === true || item.approved === true) return true;
  if (status === "published" || status === "approved") return true;
  const hasFlag =
    Object.prototype.hasOwnProperty.call(item, "published") ||
    Object.prototype.hasOwnProperty.call(item, "approved") ||
    (item.status != null && item.status !== "");
  return !hasFlag;
}

export function toPublicTestimonial(item) {
  const rating = Number(item.rating);
  const avatar =
    typeof item.avatar === "string" &&
    item.avatar.startsWith("http") &&
    !item.avatar.includes("@")
      ? item.avatar
      : null;

  return {
    id: item.id || item.feedbackId || null,
    name: item.name || "Hirees user",
    role: item.role || item.position || "",
    company: item.company || "",
    text: String(item.message || item.text || "").trim(),
    rating: Number.isFinite(rating) ? rating : null,
    avatar,
    createdAt: item.createdAt || null,
  };
}

export function selectPublicTestimonials(items, type) {
  return (Array.isArray(items) ? items : [])
    .filter((item) => !type || item?.type === type)
    .filter(
      (item) => isApprovedForPublic(item) && !isPlaceholderTestimonial(item)
    )
    .map(toPublicTestimonial);
}
