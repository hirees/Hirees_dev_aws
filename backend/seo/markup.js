export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function jsonLdScript(data) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

export function metaTags({ title, description, canonical, robots = "index,follow", ogType = "website" }) {
  const site = (process.env.SITE_URL || "https://www.hirees.com").replace(/\/$/, "");
  const picture = `${site}/logo-color.png`;
  return `
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="${escapeHtml(ogType)}" />
    <meta property="og:site_name" content="Hirees" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(picture)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(picture)}" />
  `.trim();
}

export function documentHtml({ title, description, canonical, body, jsonLd, robots, statusNote }) {
  const ld = jsonLd ? jsonLdScript(jsonLd) : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    ${metaTags({ title, description, canonical, robots })}
    ${ld}
  </head>
  <body>
    <main id="content">
      ${body}
    </main>
    ${statusNote ? `<!-- ${escapeHtml(statusNote)} -->` : ""}
  </body>
</html>`;
}
