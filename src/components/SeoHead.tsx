import { useEffect } from "react";

const SITE_NAME = "Productive Security Inc.";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
};

export function SeoHead({ title, description, path = "" }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;
    const desc = description.slice(0, 320);
    const setMeta = (name: string, attr: "name" | "property", content: string) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", "name", desc);
    setMeta("og:title", "property", `${title} | ${SITE_NAME}`);
    setMeta("og:description", "property", desc);
    setMeta("og:type", "property", "website");
    const base = (import.meta.env.VITE_SITE_URL || "https://prodsec.ca").replace(/\/$/, "");
    setMeta("og:url", "property", `${base}${path || "/"}`);
  }, [title, description, path]);

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
