const rawSiteUrl = import.meta.env.VITE_SITE_URL || "https://prodsec.ca";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");
export const siteName = "Productive Security Inc.";
export const defaultOgImage = `${siteUrl}/images/guard.jpg`;
