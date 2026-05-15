export type TeamSlug = "management" | "security-officers" | "mobile";

export type TeamPage = {
  slug: TeamSlug;
  title: string;
  subtitle: string;
  body: string[];
  bullets: string[];
  image: string;
};

export const teams: TeamPage[] = [
  {
    slug: "management",
    title: "Management Support",
    subtitle: "Executive support and account leadership that keeps programs aligned with your outcomes.",
    body: [
      "Our management layer exists to translate client expectations into field reality: clear standards, accountable supervision, and reporting you can use—not paperwork for its own sake.",
      "Account managers partner with property and operations teams to tune staffing, adjust post orders as risk shifts, and ensure continuity when schedules change.",
    ],
    bullets: [
      "Executive support for escalations and program reviews",
      "Account managers aligned to your communication preferences",
      "Quality checks grounded in observable standards",
      "Documentation packages suitable for boards and insurers",
    ],
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "security-officers",
    title: "Security Officer Teams",
    subtitle: "Professional presence, disciplined communication, and training that matches your environment.",
    body: [
      "Officers are the face of your program. We emphasize calm judgment, hospitality where appropriate, and firm enforcement when required—always within policy and law.",
      "Deployment philosophy starts with fit: the right officer profile for the post, supported by supervision and ongoing coaching.",
    ],
    bullets: [
      "Consistent uniforms and post orders",
      "Customer-service mindset for public-facing sites",
      "Incident response aligned to your escalation matrix",
      "24/7 coverage options across Ontario",
    ],
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "mobile",
    title: "Mobile Patrol Teams",
    subtitle: "Unpredictable routes, rapid response, and reporting that proves presence when it matters.",
    body: [
      "Mobile services extend your security footprint across assets: exterior checks, perimeter verification, and alarm response support—without needing a static post at every address.",
      "Tagging services and checkpoint reporting can be configured to match insurance and operational requirements.",
    ],
    bullets: [
      "Randomized patrol patterns where appropriate",
      "Mobile tagging / checkpoint reporting (program-dependent)",
      "Alarm response support (as contracted)",
      "Detailed route notes for client visibility",
    ],
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
  },
];

export function getTeam(slug: string | undefined) {
  return teams.find((t) => t.slug === slug);
}
