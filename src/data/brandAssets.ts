const base = import.meta.env.BASE_URL;

export const brandImages = {
  logo: `${base}images/logo.jpeg`,
  guard: `${base}images/guard.jpeg`,
  collage: `${base}images/collage.jpeg`,
  careersHero: `${base}images/careers-hero.jpeg`,
  services: `${base}images/services.jpeg`,
  /** Home sector card + principles imagery (bundled under `public/images/`). */
  specialEventsCard: `${base}images/home-special-events.png`,
  principlePeople: `${base}images/principle-people.png`,
  principleQuality: `${base}images/principle-quality.png`,
  principleSecurity: `${base}images/principle-security.png`,
  principleCommunication: `${base}images/principle-communication.png`,
  principleHonesty: `${base}images/principle-honesty.png`,
} as const;
