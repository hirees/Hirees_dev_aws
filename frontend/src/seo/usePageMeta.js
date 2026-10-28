import { useEffect } from "react";

const SITE = "https://www.hirees.com";

function upsert(selector, create) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = create();
    document.head.appendChild(node);
  }
  return node;
}

export function usePageMeta({ title, description, path = "/", jsonLd }) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const canonicalUrl = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
    document.title = title;

    const descriptionTag = upsert('meta[name="description"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "description");
      return el;
    });
    descriptionTag.setAttribute("content", description);

    const canonical = upsert('link[rel="canonical"]', () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    });
    canonical.setAttribute("href", canonicalUrl);

    const og = [
      ["og:title", title],
      ["og:description", description],
      ["og:url", canonicalUrl],
      ["og:type", "website"],
    ];
    og.forEach(([property, content]) => {
      const tag = upsert(`meta[property="${property}"]`, () => {
        const el = document.createElement("meta");
        el.setAttribute("property", property);
        return el;
      });
      tag.setAttribute("content", content);
    });

    ["twitter:title", "twitter:description"].forEach((name, index) => {
      const tag = upsert(`meta[name="${name}"]`, () => {
        const el = document.createElement("meta");
        el.setAttribute("name", name);
        return el;
      });
      tag.setAttribute("content", index === 0 ? title : description);
    });
    const card = upsert('meta[name="twitter:card"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "twitter:card");
      return el;
    });
    card.setAttribute("content", "summary_large_image");

    let script = document.head.querySelector('script[data-hirees-jsonld="true"]');
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-hirees-jsonld", "true");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, jsonLdKey]);
}

export function jobPostingJsonLd(job) {
  if (!job?.title || !job?.jobId) return null;
  const company = job.company?.CompanyName || job.company?.companyName || "Fstone Technologies";
  const remote = /remote|telecommut|work from home/i.test(job.location || "");
  const posted = job.createdAt ? String(job.createdAt).slice(0, 10) : new Date().toISOString().slice(0, 10);
  const until = job.validThrough || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const data = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: String(job.description || job.title),
    datePosted: posted,
    validThrough: until,
    employmentType: "OTHER",
    hiringOrganization: { "@type": "Organization", name: company, sameAs: SITE },
    directApply: true,
    url: `${SITE}/description/${job.jobId}`,
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "US", addressLocality: job.location || "United States" },
    },
  };
  if (remote) data.jobLocationType = "TELECOMMUTE";
  return data;
}

export const PAGE_META = {
  home: {
    title: "Hirees.com | Jobs from Fstone Technologies",
    description:
      "Search open roles on Hirees and upload a resume to get matched with Fstone recruiters. Free for candidates. Employers can post a job at no charge.",
    path: "/",
  },
  about: {
    title: "About Hirees | Fstone Technologies",
    description:
      "Hirees is the job portal from Fstone Technologies in Pennsylvania. Candidates can upload a resume and employers can post roles that are open to H1B transfer.",
    path: "/about",
  },
  jobs: {
    title: "Open jobs | Hirees.com",
    description:
      "Browse jobs posted on Hirees. Each listing links to a detail page where you can apply or upload your resume for a match with Fstone recruiters.",
    path: "/jobs",
  },
};
