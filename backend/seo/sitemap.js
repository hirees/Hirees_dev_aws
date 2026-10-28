import { escapeHtml } from "./markup.js";
import { isJobOpen, jobPageUrl, siteUrl } from "./jobs.js";

function loc(url, lastmod) {
  const when = lastmod ? `<lastmod>${escapeHtml(String(lastmod).slice(0, 10))}</lastmod>` : "";
  return `<url><loc>${escapeHtml(url)}</loc>${when}</url>`;
}

export function renderSitemap(jobs) {
  const origin = siteUrl();
  const staticUrls = ["/", "/about", "/jobs"].map((path) => loc(`${origin}${path}`));
  const jobUrls = jobs
    .filter((job) => isJobOpen(job))
    .map((job) => loc(jobPageUrl(job.jobId), job.updatedAt || job.createdAt));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...jobUrls].join("\n")}
</urlset>`;
}

export function renderRobots() {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /auth/
Sitemap: ${siteUrl()}/sitemap.xml
`;
}
