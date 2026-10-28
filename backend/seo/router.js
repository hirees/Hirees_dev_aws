import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isJobOpen, siteUrl } from "./jobs.js";
import { documentHtml, escapeHtml, metaTags, jsonLdScript } from "./markup.js";
import {
  STATIC_PAGES,
  aboutBody,
  goneBody,
  homeBody,
  jobDetailBody,
  jobMeta,
  jobsListBody,
  notFoundBody,
} from "./pages.js";
import { renderJobFeed } from "./jobFeed.js";
import { renderRobots, renderSitemap } from "./sitemap.js";

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../frontend/dist");

function shell({ title, description, canonical, body, jsonLd, robots }) {
  const indexPath = path.join(distDir, "index.html");
  const meta = metaTags({ title, description, canonical, robots });
  const ld = jsonLd ? jsonLdScript(jsonLd) : "";
  if (fs.existsSync(indexPath) && robots !== "noindex") {
    const html = fs.readFileSync(indexPath, "utf8");
    return html
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
      .replace("</head>", `${meta}\n${ld}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  }
  return documentHtml({ title, description, canonical, body, jsonLd, robots });
}

const KNOWN_SPA = [
  /^\/$/,
  /^\/about$/,
  /^\/jobs$/,
  /^\/browse$/,
  /^\/login$/,
  /^\/signup(?:\/.*)?$/,
  /^\/contactUs$/,
  /^\/company$/,
  /^\/privacy-policy$/,
  /^\/terms-conditions$/,
  /^\/cookie-policy$/,
  /^\/resume-templates$/,
  /^\/resume-editor$/,
  /^\/upload-resume$/,
  /^\/profile$/,
  /^\/my-jobs$/,
  /^\/description\/[^/]+$/,
  /^\/jobs\/[^/]+$/,
  /^\/admin(?:\/.*)?$/,
];

export function isKnownSpaPath(pathname) {
  return KNOWN_SPA.some((pattern) => pattern.test(pathname));
}

export function createSeoRouter({ listJobs, getJob }) {
  const router = express.Router();

  router.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(renderRobots());
  });

  router.get("/sitemap.xml", async (req, res) => {
    try {
      const jobs = await listJobs();
      res.type("application/xml").send(renderSitemap(jobs));
    } catch (error) {
      console.error("Sitemap error", error.message);
      res.status(503).type("text/plain").send("Sitemap is temporarily unavailable");
    }
  });

  router.get("/jobs.xml", async (req, res) => {
    try {
      const jobs = await listJobs();
      res.type("application/xml").send(renderJobFeed(jobs));
    } catch (error) {
      console.error("Job feed error", error.message);
      res.status(503).type("text/plain").send("Job feed is temporarily unavailable");
    }
  });

  router.get("/", async (req, res) => {
    const page = STATIC_PAGES.home;
    res.type("html").send(
      shell({
        title: page.title,
        description: page.description,
        canonical: `${siteUrl()}/`,
        body: homeBody(),
      })
    );
  });

  router.get("/about", (req, res) => {
    const page = STATIC_PAGES.about;
    res.type("html").send(
      shell({
        title: page.title,
        description: page.description,
        canonical: `${siteUrl()}/about`,
        body: aboutBody(),
      })
    );
  });

  router.get("/jobs", async (req, res) => {
    try {
      const jobs = await listJobs();
      const page = STATIC_PAGES.jobs;
      res.type("html").send(
        shell({
          title: page.title,
          description: page.description,
          canonical: `${siteUrl()}/jobs`,
          body: jobsListBody(jobs),
        })
      );
    } catch (error) {
      console.error("Jobs page error", error.message);
      res.status(503).type("html").send(
        shell({
          title: "Jobs unavailable | Hirees",
          description: "The job list could not be loaded.",
          canonical: `${siteUrl()}/jobs`,
          body: jobsListBody([]),
          robots: "noindex",
        })
      );
    }
  });

  router.get("/description/:id", async (req, res) => {
    try {
      const job = await getJob(req.params.id);
      if (!job) {
        return res.status(404).type("html").send(
          shell({
            title: "Job not found | Hirees",
            description: "This job listing does not exist.",
            canonical: `${siteUrl()}/jobs`,
            body: notFoundBody(),
            robots: "noindex",
          })
        );
      }
      if (!isJobOpen(job)) {
        return res.status(410).type("html").send(
          shell({
            title: "Job closed | Hirees",
            description: "This job is no longer open.",
            canonical: `${siteUrl()}/jobs`,
            body: goneBody(),
            robots: "noindex",
          })
        );
      }
      const meta = jobMeta(job);
      return res.type("html").send(
        shell({
          ...meta,
          body: jobDetailBody(job),
          robots: "index,follow",
        })
      );
    } catch (error) {
      console.error("Job page error", error.message);
      return res.status(503).type("html").send("Job page is temporarily unavailable");
    }
  });

  return router;
}

export function htmlNotFound() {
  return shell({
    title: "Page not found | Hirees",
    description: "This address is not a Hirees page.",
    canonical: `${siteUrl()}/`,
    body: notFoundBody(),
    robots: "noindex",
  });
}
