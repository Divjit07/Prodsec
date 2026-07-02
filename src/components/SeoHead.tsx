import { useEffect } from "react";
import { defaultOgImage, siteName, siteUrl } from "../data/site";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

function upsertMeta(selector: string, attr: "name" | "property", name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoHead({ title, description, path = "", image, noIndex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${siteName}`;
    const desc = description.slice(0, 320);
    const url = `${siteUrl}${path || "/"}`;
    const ogImage = image || defaultOgImage;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', "name", "description", desc);
    upsertMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", desc);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", siteName);
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", "en_CA");

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", desc);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    upsertLink("canonical", url);
  }, [title, description, path, image, noIndex]);

  return null;
}

export function injectJsonLd(id: string, data: object) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  const script = existing ?? document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}
