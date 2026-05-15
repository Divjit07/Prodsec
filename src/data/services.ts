import { brandImages } from "./brandAssets";

export type ServiceSlug =
  | "commercial"
  | "construction"
  | "apartment"
  | "retail"
  | "healthcare"
  | "special-events";

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  challenge: string;
  solution: string;
  features: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "commercial",
    title: "Commercial Security",
    short: "Reception coverage, after-hours protection, and tailored programs for offices and campuses.",
    challenge:
      "Commercial properties balance public access with asset protection. Tailgating, unauthorized visitors, and inconsistent coverage create avoidable risk.",
    solution:
      "We design layered programs that match your building rhythm: clear post orders, professional presence, and proactive reporting that keeps property teams aligned.",
    features: [
      "Concierge-style front desk coverage",
      "Access control and visitor management",
      "After-hours patrols and lock-up procedures",
      "Incident documentation with actionable follow-ups",
      "Escalation paths aligned with your building management",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "construction",
    title: "Construction Security",
    short: "Site hardening, access control, and loss prevention for active builds across Ontario.",
    challenge:
      "Construction sites attract theft, trespassing, and safety incidents—especially overnight when visibility drops and materials are exposed.",
    solution:
      "Our officers focus on deterrence, controlled access, and rapid communication with site supers. We adapt as phases change and hazards shift.",
    features: [
      "Gatehouse and perimeter monitoring",
      "Equipment and materials protection",
      "Contractor access verification",
      "Hazard awareness and safety-minded presence",
      "Daily logs tailored for GC reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "apartment",
    title: "Apartment & Condo",
    short: "Resident-first security for lobbies, parkades, amenities, and night coverage.",
    challenge:
      "Residents expect hospitality-level service with firm security standards. Mixed-use traffic and amenity spaces require calm judgment and consistency.",
    solution:
      "We train teams for high-touch environments: clear communication, respectful enforcement, and partnership with concierge and property management.",
    features: [
      "Lobby presence and visitor protocols",
      "Parkade patrols and suspicious activity response",
      "Amenity hours coverage",
      "Noise and disturbance mitigation support",
      "Emergency escalation aligned with corporation policies",
    ],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "retail",
    title: "Retail & Shopping",
    short: "Customer-safe environments with shrink awareness and professional de-escalation.",
    challenge:
      "Retail environments need visible deterrence without intimidating guests. Incidents must be handled quickly with brand reputation in mind.",
    solution:
      "Officers are coached in de-escalation, discreet observation, and coordinated handoffs with management and law enforcement when required.",
    features: [
      "High-traffic visibility and deterrence",
      "Loss prevention support (policy-driven)",
      "Parking lot awareness (where assigned)",
      "Event weekends and seasonal peaks",
      "Clear reporting for operations review",
    ],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "healthcare",
    title: "Healthcare Security",
    short: "Calm, compliant support for hospitals, clinics, and sensitive care settings.",
    challenge:
      "Healthcare facilities face agitated visitors, secure unit requirements, and strict privacy expectations—often simultaneously.",
    solution:
      "We emphasize patient-centred professionalism: trauma-informed communication, privacy-aware presence, and tight coordination with clinical leadership.",
    features: [
      "ER and triage area support (as directed)",
      "Visitor management and unit access assistance",
      "Aggression mitigation with safety-first protocols",
      "Sensitive information handling awareness",
      "After-hours perimeter and interior patrols",
    ],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "special-events",
    title: "Special Events",
    short: "Crowd-safe operations for launches, galas, conferences, and public gatherings.",
    challenge:
      "Events compress risk into short windows: access bottlenecks, alcohol effects, VIP movement, and unpredictable weather and logistics.",
    solution:
      "We build a run-of-show security plan with your producers—measured staffing, clear communications, and controlled escalation paths from arrival to load-out.",
    features: [
      "Perimeter and entry screening support",
      "VIP escorts and greenroom awareness",
      "Crowd monitoring and ingress/egress flow",
      "Emergency action coordination",
      "Post-event debrief and incident package (as needed)",
    ],
    image: brandImages.specialEventsCard,
  },
];

export function getService(slug: string | undefined) {
  return services.find((s) => s.slug === slug);
}
