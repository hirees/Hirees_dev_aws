import assert from "node:assert/strict";
import express from "express";
import { sanitizeJobText } from "./compliance.js";
import { buildJobPosting, isJobOpen } from "./jobs.js";
import { renderJobFeed } from "./jobFeed.js";
import { renderSitemap } from "./sitemap.js";
import { createSeoRouter } from "./router.js";
import { validateResumeFile } from "../resume/storage.js";

const now = new Date("2026-10-28T00:00:00.000Z");
const openJob = {
  jobId: "job-open",
  title: "Platform Engineer",
  description: "Build hiring tools. This role is H1B only for visa holders.",
  requirements: ["Node", "React"],
  location: "Remote",
  jobType: ["Full-Time"],
  salary: "120000",
  createdAt: "2026-10-01T00:00:00.000Z",
  validThrough: "2026-12-01T00:00:00.000Z",
  status: "open",
  company: { CompanyName: "Fstone Technologies" },
};
const closedJob = {
  jobId: "job-closed",
  title: "Closed role",
  description: "Filled.",
  location: "Austin, TX",
  createdAt: "2026-01-01T00:00:00.000Z",
  status: "closed",
  company: { CompanyName: "Fstone Technologies" },
};
const expiredJob = {
  jobId: "job-old",
  title: "Expired role",
  description: "Too old.",
  location: "Austin, TX",
  createdAt: "2020-01-01T00:00:00.000Z",
  company: { CompanyName: "Fstone Technologies" },
};

assert.equal(sanitizeJobText("H1B only engineers"), "open to H1B transfer engineers");
assert.equal(sanitizeJobText("US citizens only"), "open to US citizens, green card holders, and H1B transfer");
assert.match(sanitizeJobText("Open to H1B transfer"), /H1B transfer/);
assert.equal(isJobOpen(openJob, now), true);
assert.equal(isJobOpen(closedJob, now), false);
assert.equal(isJobOpen(expiredJob, now), false);

const posting = buildJobPosting({
  ...openJob,
  description: sanitizeJobText(openJob.description),
});
assert.equal(posting["@type"], "JobPosting");
assert.equal(posting.directApply, true);
assert.equal(posting.jobLocationType, "TELECOMMUTE");
assert.equal(posting.hiringOrganization.name, "Fstone Technologies");
assert.equal(posting.baseSalary.currency, "USD");
assert.equal(posting.baseSalary.value.value, 120000);
assert.equal(posting.employmentType[0], "FULL_TIME");
assert.doesNotMatch(posting.description, /H1B only/i);

const jobs = [openJob, closedJob, expiredJob];
const sitemap = renderSitemap(jobs);
assert.match(sitemap, /job-open/);
assert.doesNotMatch(sitemap, /job-closed/);
assert.doesNotMatch(sitemap, /job-old/);
const feed = renderJobFeed(jobs);
assert.match(feed, /<referencenumber><!\[CDATA\[job-open\]\]><\/referencenumber>/);
assert.doesNotMatch(feed, /job-closed/);
assert.doesNotMatch(feed, /H1B only/);

assert.equal(validateResumeFile(null), "Choose a PDF or DOCX resume.");
assert.equal(
  validateResumeFile({ size: 6 * 1024 * 1024, mimetype: "application/pdf", originalname: "a.pdf" }),
  "Resume must be 5 MB or smaller."
);
assert.equal(
  validateResumeFile({ size: 100, mimetype: "text/plain", originalname: "a.txt" }),
  "Upload a PDF or DOCX file."
);
assert.equal(
  validateResumeFile({ size: 100, mimetype: "application/pdf", originalname: "a.pdf" }),
  null
);

const app = express();
app.use(
  createSeoRouter({
    listJobs: async () => jobs,
    getJob: async (id) => jobs.find((job) => job.jobId === id) || null,
  })
);

const server = await new Promise((resolve) => {
  const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
});
const base = `http://127.0.0.1:${server.address().port}`;

async function get(path) {
  const response = await fetch(base + path);
  return { status: response.status, text: await response.text(), type: response.headers.get("content-type") };
}

const home = await get("/");
assert.equal(home.status, 200);
assert.match(home.text, /Get matched with Fstone recruiters/);
assert.match(home.text, /Open to H1B transfer/);
assert.match(home.text, /rel="canonical"/);

const about = await get("/about");
assert.equal(about.status, 200);
assert.match(about.text, /About Hirees/);

const list = await get("/jobs");
assert.equal(list.status, 200);
assert.match(list.text, /Platform Engineer/);
assert.doesNotMatch(list.text, /Closed role/);

const detail = await get("/description/job-open");
assert.equal(detail.status, 200);
assert.match(detail.text, /application\/ld\+json/);
assert.match(detail.text, /"@type":"JobPosting"/);
assert.match(detail.text, /directApply":true/);
assert.match(detail.text, /open to H1B transfer/);
assert.doesNotMatch(detail.text, /H1B only/);

const closed = await get("/description/job-closed");
assert.equal(closed.status, 410);
const missing = await get("/description/missing");
assert.equal(missing.status, 404);
const unknown = await get("/not-a-real-page");
assert.equal(unknown.status, 404);

const robots = await get("/robots.txt");
assert.match(robots.text, /Sitemap: https:\/\/www\.hirees\.com\/sitemap\.xml/);
const site = await get("/sitemap.xml");
assert.match(site.text, /job-open/);
assert.doesNotMatch(site.text, /job-closed/);
const xml = await get("/jobs.xml");
assert.match(xml.text, /<publisher>Hirees<\/publisher>/);
assert.match(xml.text, /job-open/);

server.close();
console.log("seo and resume checks passed");
