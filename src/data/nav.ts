import { services } from "./services";

export type NavLeaf = { label: string; to: string; hint?: string };
export type NavGroup = { label: string; to: string; children?: NavLeaf[] };

/**
 * Six top-level destinations. Everything that used to sit in the flat twelve-link
 * bar now hangs off the section it belongs to.
 */
export const primaryNav: NavGroup[] = [
  {
    label: "About",
    to: "/about/mission",
    children: [
      { label: "Mission", to: "/about/mission", hint: "What we hold ourselves to" },
      { label: "History", to: "/about/history", hint: "Operating since 1997" },
      { label: "Values", to: "/about/values", hint: "The standard on every post" },
    ],
  },
  {
    label: "Services",
    to: "/services",
    children: services.map((s) => ({ label: s.title, to: `/services/${s.slug}`, hint: s.short })),
  },
  { label: "Teams", to: "/teams" },
  {
    label: "Careers",
    to: "/careers",
    children: [
      { label: "Working here", to: "/careers", hint: "Why officers stay" },
      { label: "Open roles", to: "/careers/jobs", hint: "Current postings" },
      { label: "Culture", to: "/careers/culture", hint: "How we train and coach" },
    ],
  },
  { label: "Insights", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const ctaNav = { label: "Request a proposal", to: "/quote" };

export const phone = { display: "416.535.9341", href: "tel:+14165359341" };
