/**
 * Site photography, imported rather than referenced by URL.
 *
 * These used to live in `public/` and be addressed as `/images/foo.jpg`. That
 * path never changes, and `vercel.json` caches `/images/*` for seven days — so
 * replacing an image with the same filename left every visitor (and the CDN
 * edge) serving the old bytes for a week, with nothing to signal a re-fetch.
 *
 * Importing them puts each file through the bundler, which fingerprints it by
 * content: `principles-feature-a3f9c1.jpg`. Change the image, the hash changes,
 * the URL changes, and browsers fetch it immediately.
 *
 * `public/` now holds only what needs a stable, externally-addressable URL:
 * favicons, robots/sitemap, the OG cover, and the hero film.
 */
import careersHero from "../assets/img/careers-hero.jpg";
import collage from "../assets/img/collage.jpg";
import guard from "../assets/img/guard.jpg";
import guardIdCheck from "../assets/img/guard-id-check.jpg";
import guardLobby from "../assets/img/guard-lobby.jpg";
import guardMuseum from "../assets/img/guard-museum.jpg";
import heroFrame from "../assets/img/hero-frame.jpg";
import supervisorNight from "../assets/img/supervisor-night.jpg";
import teamPortrait from "../assets/img/team-portrait.jpg";
import teamSupervisorSuv from "../assets/img/team-supervisor-suv.jpg";
import logoCrest from "../assets/img/logo-crest.png";
import logoCrestSvg from "../assets/img/logo-crest.svg";
import logoMark from "../assets/img/logo-mark.png";
import mapleLeaf from "../assets/img/maple-leaf.png";
import principleCommunication from "../assets/img/principle-communication.jpg";
import principleHonesty from "../assets/img/principle-honesty.jpg";
import principlePeople from "../assets/img/principle-people.jpg";
import principleQuality from "../assets/img/principle-quality.jpg";
import principleSecurity from "../assets/img/principle-security.jpg";
import principlesFeature from "../assets/img/principles-feature.jpg";
import serviceApartment from "../assets/img/service-apartment.jpg";
import serviceCommercial from "../assets/img/service-commercial.jpg";
import serviceConstruction from "../assets/img/service-construction.jpg";
import serviceHealthcare from "../assets/img/service-healthcare.jpg";
import serviceRetail from "../assets/img/service-retail.jpg";
import serviceSpecialEvents from "../assets/img/service-special-events.jpg";
import servicesPhoto from "../assets/img/services.jpg";

export const brandImages = {
  /** Full V-shaped crest PNG (transparent outside the shield). */
  logo: logoMark,
  /** Large retina crest for header / footer. */
  logoCrest,
  /** Vector crest with built-in depth for large placements. */
  logoCrestSvg,
  mapleLeaf,
  guard,
  /** Still from the landing hero film — used as the LCP poster. */
  heroFrame,
  collage,
  careersHero,
  services: servicesPhoto,
  /** Teams hero — supervisor and officers at the patrol vehicle. */
  teamSupervisorSuv,
  /** Cards for the team spread. The group portrait is the featured centre. */
  guardLobby,
  guardIdCheck,
  teamPortrait,
  guardMuseum,
  supervisorNight,
  /** Home / services sector card photography. */
  serviceCommercial,
  serviceConstruction,
  serviceApartment,
  serviceRetail,
  serviceHealthcare,
  specialEventsCard: serviceSpecialEvents,
  principlePeople,
  principleQuality,
  principleSecurity,
  principleCommunication,
  principleHonesty,
  /** Operating principles section feature photo. */
  principlesFeature,
} as const;
