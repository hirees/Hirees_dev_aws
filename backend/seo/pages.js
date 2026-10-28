import { escapeHtml } from "./markup.js";
import {
  buildJobPosting,
  companyName,
  isJobOpen,
  jobDescriptionText,
  jobPageUrl,
  siteUrl,
} from "./jobs.js";
import { sanitizeJobText } from "./compliance.js";

export const STATIC_PAGES = {
  home: {
    path: "/",
    title: "Hirees.com | Jobs from Fstone Technologies",
    description:
      "Search open roles on Hirees and upload a resume to get matched with Fstone recruiters. Free for candidates. Employers can post a job at no charge.",
  },
  about: {
    path: "/about",
    title: "About Hirees | Fstone Technologies",
    description:
      "Hirees is the job portal from Fstone Technologies in Pennsylvania. Candidates can upload a resume and employers can post roles that are open to H1B transfer.",
  },
  jobs: {
    path: "/jobs",
    title: "Open jobs | Hirees.com",
    description:
      "Browse jobs posted on Hirees. Each listing links to a detail page where you can apply or upload your resume for a match with Fstone recruiters.",
  },
};

function layout(inner) {
  return `<header><p><a href="${escapeHtml(siteUrl())}">Hirees</a></p></header>${inner}<footer><p>Hirees is operated by Fstone Technologies. <a href="${escapeHtml(siteUrl())}/jobs">Open jobs</a> · <a href="${escapeHtml(siteUrl())}/about">About</a></p></footer>`;
}

export function homeBody() {
  const page = STATIC_PAGES.home;
  return layout(`
    <h1>Find a job on Hirees</h1>
    <p>${escapeHtml(page.description)}</p>
    <ul>
      <li>Verified employers</li>
      <li>Open to H1B transfer</li>
      <li>Free to post</li>
    </ul>
    <p><a href="${escapeHtml(siteUrl())}/jobs">See open jobs</a></p>
    <section>
      <h2>Get matched with Fstone recruiters</h2>
      <p>Upload a PDF or DOCX resume, then confirm your email. Job alerts are on unless you turn them off.</p>
      <p><a href="${escapeHtml(siteUrl())}/upload-resume">Upload your resume</a></p>
    </section>
  `);
}

export function aboutBody() {
  return layout(`
    <h1>About Hirees</h1>
    <p>Hirees is a job portal operated by Fstone Technologies, a US staffing firm. Candidates create a profile, upload a resume, and apply to roles. Employers post jobs at no charge.</p>
    <p>Roles on Hirees are open to H1B transfer. Listings do not exclude US citizens or green card holders.</p>
    <p><a href="${escapeHtml(siteUrl())}/jobs">Browse open jobs</a></p>
  `);
}

export function jobsListBody(jobs) {
  const open = jobs.filter((job) => isJobOpen(job));
  const items = open.length
    ? open
        .map((job) => {
          const url = jobPageUrl(job.jobId);
          return `<article>
            <h2><a href="${escapeHtml(url)}">${escapeHtml(sanitizeJobText(job.title))}</a></h2>
            <p>${escapeHtml(companyName(job))} · ${escapeHtml(job.location || "Location not listed")}</p>
            <p>${escapeHtml(jobDescriptionText(job).slice(0, 280))}</p>
          </article>`;
        })
        .join("\n")
    : `<p>No open jobs are posted right now. You can still <a href="${escapeHtml(siteUrl())}/upload-resume">upload your resume</a> to get matched with Fstone recruiters.</p>`;
  return layout(`
    <h1>Open jobs</h1>
    <p>${escapeHtml(STATIC_PAGES.jobs.description)}</p>
    ${items}
  `);
}

export function jobDetailBody(job) {
  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : String(job.requirements || "")
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
  const requirementList = requirements.length
    ? `<ul>${requirements.map((item) => `<li>${escapeHtml(sanitizeJobText(item))}</li>`).join("")}</ul>`
    : "";
  return layout(`
    <article>
      <h1>${escapeHtml(sanitizeJobText(job.title))}</h1>
      <p>${escapeHtml(companyName(job))} · ${escapeHtml(job.location || "Location not listed")}</p>
      <p>Posted ${escapeHtml((job.createdAt || "").slice(0, 10) || "recently")}.</p>
      <div>${escapeHtml(sanitizeJobText(job.description || "")).replace(/\n/g, "<br />")}</div>
      ${requirementList}
      <p><a href="${escapeHtml(siteUrl())}/upload-resume">Upload your resume</a> to get matched with Fstone recruiters, or apply from your Hirees account.</p>
    </article>
  `);
}

export function notFoundBody() {
  return layout(`
    <h1>This page does not exist</h1>
    <p>The address is not a Hirees page. <a href="${escapeHtml(siteUrl())}/">Go to the homepage</a> or <a href="${escapeHtml(siteUrl())}/jobs">browse jobs</a>.</p>
  `);
}

export function goneBody() {
  return layout(`
    <h1>This job is no longer open</h1>
    <p>The listing has closed or expired and is not being indexed. <a href="${escapeHtml(siteUrl())}/jobs">See open jobs</a>.</p>
  `);
}

export function jobMeta(job) {
  const company = companyName(job);
  const where = job.location ? ` in ${job.location}` : "";
  const title = `${sanitizeJobText(job.title)} at ${company}${where} | Hirees`;
  const description = jobDescriptionText({
    ...job,
    description: sanitizeJobText(job.description),
    requirements: Array.isArray(job.requirements)
      ? job.requirements.map((item) => sanitizeJobText(item))
      : sanitizeJobText(job.requirements),
  }).slice(0, 180);
  return {
    title,
    description: description || `${job.title} at ${company} on Hirees.`,
    canonical: jobPageUrl(job.jobId),
    jsonLd: buildJobPosting({
      ...job,
      title: sanitizeJobText(job.title),
      description: sanitizeJobText(job.description),
    }),
  };
}
