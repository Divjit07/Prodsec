export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "construction-security-risks-2026",
    title: "Top 5 Security Risks at Ontario Construction Sites in 2026",
    excerpt:
      "From perimeter gaps to overnight material exposure—what site teams are seeing this year and how to get ahead.",
    date: "2026-04-12",
    readMinutes: 7,
  },
  {
    slug: "condo-board-security-program",
    title: "Why Condominium Boards Need a Tailored Security Program",
    excerpt:
      "Generic post orders rarely match mixed-use traffic. Here is a framework boards can use with management partners.",
    date: "2026-03-28",
    readMinutes: 6,
  },
  {
    slug: "hiring-private-security-toronto",
    title: "What to Look for When Hiring a Private Security Company in Toronto",
    excerpt:
      "Licensing, supervision, training depth, and reporting quality—practical checkpoints before you sign.",
    date: "2026-03-09",
    readMinutes: 8,
  },
  {
    slug: "mobile-patrol-vs-static-guard",
    title: "Mobile Patrol vs Static Guard: Which Does Your Business Need?",
    excerpt:
      "A clear comparison to help operators choose coverage that matches risk, hours, and customer experience.",
    date: "2026-02-19",
    readMinutes: 5,
  },
  {
    slug: "healthcare-staff-safety",
    title: "How Healthcare Facilities Can Improve Staff Safety",
    excerpt:
      "Layered responses, communication drills, and professional security partnership without compromising care culture.",
    date: "2026-01-30",
    readMinutes: 6,
  },
];

export function getBlogPost(slug: string | undefined) {
  return blogPosts.find((p) => p.slug === slug);
}

export function blogBody(slug: string): string[] {
  const paragraphs: Record<string, string[]> = {
    "construction-security-risks-2026": [
      "Construction schedules compress risk into tight windows: deliveries, open fencing, and overnight equipment storage can all become vulnerabilities if the site rhythm changes without updating security posture.",
      "The most common issues we see are predictable: weak perimeter discipline after hours, inconsistent visitor logging, and unclear escalation when a trespasser is confronted. Fixing these does not always require more hours—it requires clearer ownership and better communication between GC teams and security.",
      "If you are responsible for a site this season, start with a simple audit: lighting coverage, fence integrity, camera blind spots, and whether your officers have a direct line to decision-makers after hours. Small upgrades compound quickly.",
    ],
    "condo-board-security-program": [
      "Condominiums are not single-use buildings. Residents, guests, deliveries, cleaners, and vendors share the same arteries—lobbies, elevators, and parkades. Security has to feel hospitable while still enforcing policy.",
      "Tailored programs begin with accurate traffic mapping: peak hours, recurring incidents, and where staff actually spend time versus where risk concentrates. From there, post orders can be tightened without turning the lobby into an unwelcoming checkpoint.",
      "Boards should expect reporting that translates into action: trends, near-misses, and recommendations—not generic daily notes.",
    ],
    "hiring-private-security-toronto": [
      "Toronto operators have choices—but not every provider invests equally in training, supervision, and quality assurance. Ask direct questions about onboarding, field supervision frequency, and how incidents are documented.",
      "Verify licensing and insurance, then go one level deeper: who trains new hires, how are substitutions handled on short notice, and what does escalation look like on a difficult night?",
      "A strong partner will welcome your standards and document how they meet them—without vague promises.",
    ],
    "mobile-patrol-vs-static-guard": [
      "Static coverage is best when deterrence needs to be continuous at a single address—think lobbies, gatehouses, and controlled access points.",
      "Mobile patrols add unpredictability across multiple assets: randomized routes, exterior checks, and rapid response when alarms or calls require eyes on scene.",
      "Many programs blend both: lean static hours with strategic mobile coverage to balance budget and risk.",
    ],
    "healthcare-staff-safety": [
      "Healthcare environments require calm judgment and privacy awareness. Security should reduce cognitive load for clinical teams—not add friction.",
      "Effective programs align with unit leadership on triggers, communication protocols, and what success looks like after an incident.",
      "Training themes like trauma-informed communication and de-escalation are not buzzwords—they are operational tools that protect patients and staff alike.",
    ],
  };
  return (
    paragraphs[slug] ?? [
      "Thanks for reading. For a conversation about your property or event program, reach our team through the contact page.",
    ]
  );
}
