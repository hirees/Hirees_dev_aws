import { companyName, isJobOpen, jobDescriptionText, jobPageUrl } from "./jobs.js";
import { sanitizeJobText } from "./compliance.js";
import { siteUrl } from "./jobs.js";

function cdata(value) {
  return `<![CDATA[${String(value ?? "").replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function tag(name, value) {
  return `<${name}>${cdata(value)}</${name}>`;
}

function splitLocation(location) {
  const parts = String(location || "")
    .split(",")
    .map((part) => part.trim());
  return {
    city: parts[0] || "",
    state: parts[1] || "",
    country: parts[2] || "US",
  };
}

// Indeed-style XML used by Talent.com, Jooble, Adzuna, and Careerjet.
export function renderJobFeed(jobs) {
  const open = jobs.filter((job) => isJobOpen(job));
  const entries = open.map((job) => {
    const place = splitLocation(job.location);
    const remote = /remote|telecommut|work from home/i.test(String(job.location || ""));
    return `  <job>
    ${tag("title", sanitizeJobText(job.title))}
    ${tag("date", (job.createdAt || new Date().toISOString()).slice(0, 10))}
    ${tag("referencenumber", job.jobId)}
    ${tag("url", jobPageUrl(job.jobId))}
    ${tag("company", companyName(job))}
    ${tag("city", remote ? "" : place.city)}
    ${tag("state", remote ? "" : place.state)}
    ${tag("country", place.country || "US")}
    ${tag("postalcode", "")}
    ${tag("description", jobDescriptionText({
      ...job,
      description: sanitizeJobText(job.description),
      requirements: job.requirements,
    }))}
    ${tag("jobtype", Array.isArray(job.jobType) ? job.jobType.join(", ") : job.jobType || "")}
    ${tag("salary", job.salary || "")}
    ${tag("category", job.experience || "")}
    ${tag("remotetype", remote ? "Fully remote" : "")}
  </job>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>Hirees</publisher>
  <publisherurl>${siteUrl()}</publisherurl>
  <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
${entries.join("\n")}
</source>`;
}
