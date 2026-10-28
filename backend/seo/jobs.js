const CLOSED = new Set(["closed", "expired", "filled", "inactive", "archived", "draft"]);

const EMPLOYMENT = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  internship: "INTERN",
  freelance: "CONTRACTOR",
  contract: "CONTRACTOR",
  "contract to hire": "CONTRACTOR",
};

export function siteUrl() {
  return (process.env.SITE_URL || "https://www.hirees.com").replace(/\/$/, "");
}

export function jobPageUrl(jobId) {
  return `${siteUrl()}/description/${encodeURIComponent(jobId)}`;
}

export function companyName(job) {
  return (
    job?.company?.CompanyName ||
    job?.company?.companyName ||
    job?.companyName ||
    "Fstone Technologies"
  );
}

export function isRemoteJob(job) {
  return /remote|telecommut|work from home|anywhere/i.test(String(job?.location || ""));
}

export function validThroughDate(job) {
  if (job?.validThrough) return new Date(job.validThrough);
  if (job?.expiresAt) return new Date(job.expiresAt);
  const posted = job?.createdAt ? new Date(job.createdAt) : new Date();
  const end = new Date(posted.getTime());
  end.setUTCDate(end.getUTCDate() + 30);
  return end;
}

export function isJobOpen(job, now = new Date()) {
  if (!job || !job.jobId || !job.title) return false;
  const status = String(job.status || job.jobStatus || "open").toLowerCase();
  if (CLOSED.has(status)) return false;
  const until = validThroughDate(job);
  if (Number.isNaN(until.getTime()) || until.getTime() < now.getTime()) return false;
  return true;
}

export function employmentTypes(job) {
  const raw = Array.isArray(job?.jobType) ? job.jobType : [job?.jobType].filter(Boolean);
  const mapped = raw
    .map((type) => EMPLOYMENT[String(type).toLowerCase()] || null)
    .filter(Boolean);
  return mapped.length ? mapped : ["OTHER"];
}

export function parseBaseSalary(salary) {
  if (salary == null || String(salary).trim() === "") return null;
  const text = String(salary);
  const nums = text.replace(/,/g, "").match(/\d+(?:\.\d+)?/g);
  if (!nums) return null;
  const values = nums
    .map((n) => {
      const value = Number(n);
      if (!Number.isFinite(value) || value <= 0) return null;
      if (/k\b/i.test(text) && value < 1000) return Math.round(value * 1000);
      return value;
    })
    .filter((n) => n != null);
  if (!values.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const quantitative = {
    "@type": "QuantitativeValue",
    unitText: "YEAR",
  };
  if (min === max) quantitative.value = min;
  else {
    quantitative.minValue = min;
    quantitative.maxValue = max;
  }
  return {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: quantitative,
  };
}

function addressParts(location) {
  const parts = String(location || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return {
    addressLocality: parts[0] || undefined,
    addressRegion: parts[1] || undefined,
    addressCountry: "US",
  };
}

export function plainText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function jobDescriptionText(job) {
  const requirements = Array.isArray(job.requirements)
    ? job.requirements.join(". ")
    : job.requirements || "";
  return plainText([job.description, requirements].filter(Boolean).join(" "));
}

export function buildJobPosting(job) {
  const posted = job.createdAt ? new Date(job.createdAt) : new Date();
  const until = validThroughDate(job);
  const remote = isRemoteJob(job);
  const description = jobDescriptionText(job) || `${job.title} at ${companyName(job)}`;
  const posting = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: posted.toISOString().slice(0, 10),
    validThrough: until.toISOString(),
    employmentType: employmentTypes(job),
    hiringOrganization: {
      "@type": "Organization",
      name: companyName(job),
      sameAs: siteUrl(),
      logo: `${siteUrl()}/logo-color.png`,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Hirees",
      value: String(job.jobId),
    },
    directApply: true,
    url: jobPageUrl(job.jobId),
  };

  const salary = parseBaseSalary(job.salary);
  if (salary) posting.baseSalary = salary;

  const address = addressParts(remote ? "" : job.location);
  posting.jobLocation = {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      ...address,
    },
  };
  if (remote) posting.jobLocationType = "TELECOMMUTE";
  return posting;
}
