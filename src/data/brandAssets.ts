const base = import.meta.env.BASE_URL;

export const brandImages = {
  /** Full V-shaped crest PNG (transparent outside the shield). */
  logo: `${base}images/logo-mark.png`,
  /** Large retina crest for header / footer. */
  logoCrest: `${base}images/logo-crest.png`,
  /** Vector crest with built-in depth for large placements. */
  logoCrestSvg: `${base}images/logo-crest.svg`,
  guard: `${base}images/guard.jpg`,
  collage: `${base}images/collage.jpg`,
  careersHero: `${base}images/careers-hero.jpg`,
  services: `${base}images/services.jpg`,
  /** Home / services sector card photography. */
  serviceCommercial: `${base}images/service-commercial.jpg`,
  serviceConstruction: `${base}images/service-construction.jpg`,
  serviceApartment: `${base}images/service-apartment.jpg`,
  serviceRetail: `${base}images/service-retail.jpg`,
  serviceHealthcare: `${base}images/service-healthcare.jpg`,
  specialEventsCard: `${base}images/service-special-events.jpg`,
  principlePeople: `${base}images/principle-people.jpg`,
  principleQuality: `${base}images/principle-quality.jpg`,
  principleSecurity: `${base}images/principle-security.jpg`,
  principleCommunication: `${base}images/principle-communication.jpg`,
  principleHonesty: `${base}images/principle-honesty.jpg`,
  /** Operating principles section feature photo. */
  principlesFeature: `${base}images/principles-feature.jpg`,
} as const;
