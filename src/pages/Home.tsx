import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SeoHead, injectJsonLd } from "../components/SeoHead";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { Eyebrow } from "../components/Eyebrow";
import { AnimatedText, Rise } from "../components/AnimatedText";
import { Stagger, StaggerItem } from "../components/Stagger";
import { EASE } from "../lib/motion";
import { services } from "../data/services";
import { brandImages } from "../data/brandAssets";
import { siteUrl } from "../data/site";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}media/landing-hero.mp4`;
const HERO_POSTER = brandImages.guard;

const principles = [
  { t: "People", d: "Respect-first presence: firm when policy requires it, professional when the public is watching." },
  { t: "Quality", d: "Published standards for arrival, appearance, handoffs, and reporting — audited by supervision." },
  { t: "Security", d: "Programs aligned to access patterns, asset exposure, and the escalation paths unique to your site." },
  { t: "Communication", d: "Structured incident narratives and same-shift follow-up, so property teams are never guessing." },
  { t: "Honesty", d: "Clear staffing realities, transparent substitutions, and no inflated promises to win the file." },
];

const engagement = [
  {
    t: "Discovery & scope",
    d: "We document hours of risk, visitor flows, parking exposure, and escalation preferences — then translate that into staffing and supervision levels you can approve with confidence.",
  },
  {
    t: "Site alignment",
    d: "Walk-throughs with your team establish post orders, equipment needs, key contacts, and reporting format, so day-one coverage matches what your property actually experiences.",
  },
  {
    t: "Program launch",
    d: "Orientation, uniform standards, and field supervision cadence are set before go-live. After launch we review incidents and metrics on a rhythm that fits your governance cycle.",
  },
];

/** The film is the hero. It only sits out for reduced-motion visitors. */
function useHeroVideo() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Mount the video after first paint so the poster is the LCP, not the download.
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && !reduceMotion;
}

/**
 * Desktop overlays the copy on a full-bleed film. Mobile stacks them, because the
 * film is 2.08:1 and object-cover would crop ~70% of its width away in a portrait
 * frame — which is what made the patch read as a meaningless zoomed-in blur.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

export default function Home() {
  const showVideo = useHeroVideo();
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax: the film drifts slower than the page and dims as it leaves. Spring-
  // smoothed so a trackpad's jittery deltas don't telegraph into the transform.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const mediaY = useTransform(smooth, [0, 1], ["0%", "18%"]);
  const mediaScale = useTransform(smooth, [0, 1], [1, 1.12]);
  const copyY = useTransform(smooth, [0, 1], [0, -60]);
  const copyOpacity = useTransform(smooth, [0, 0.6], [1, 0]);

  // On mobile the film sits in the document flow, so translating it would tear a
  // gap under it. Parallax is a desktop-only affordance.
  const animateMedia = isDesktop && !reduce;
  const mediaStyle = animateMedia ? { y: mediaY, scale: mediaScale } : undefined;
  const copyStyle = animateMedia ? { y: copyY, opacity: copyOpacity } : undefined;

  useEffect(() => {
    injectJsonLd("prodsec-org", {
      "@context": "https://schema.org",
      "@type": "SecurityService",
      name: "Productive Security Inc.",
      url: `${siteUrl}/`,
      telephone: "+1-416-535-9341",
      areaServed: "Ontario, CA",
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 Wynford Drive, Suite 711B",
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    });
  }, []);

  return (
    <>
      <SeoHead
        title="Toronto Private Security"
        description="Productive Security Inc. — professional security programs since 1997. Commercial, construction, condo, retail, healthcare, and events across Ontario."
        path="/"
      />

      {/* ---------------------------------------------------------------- Hero
          Mobile stacks: the film runs at its native 2.08:1 so the whole patch is
          legible, then the lockup sits beneath it on the dot ground.
          Desktop (lg+) goes full-bleed with the lockup overlaid. */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden lg:flex lg:min-h-[92svh] lg:flex-col lg:justify-end"
      >
        <motion.div
          className="relative aspect-[1920/925] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          style={mediaStyle}
        >
          <img
            src={HERO_POSTER}
            alt=""
            // Native aspect on mobile means object-cover has nothing to crop.
            className="absolute inset-0 h-full w-full object-cover object-center lg:object-[70%_center]"
            width={1920}
            height={925}
            // React 18 does not map the camelCase prop; the DOM attribute is lowercase.
            {...{ fetchpriority: "high" }}
          />
          {showVideo ? (
            <motion.video
              className="absolute inset-0 h-full w-full object-cover object-center lg:object-[70%_center]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={HERO_POSTER}
              aria-hidden
              disablePictureInPicture
              // The film fades up once it can actually paint, so there is no
              // hard swap from poster to first frame.
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </motion.video>
          ) : null}

          <div aria-hidden className="absolute inset-0 bg-ink-950/20" />
          {/* Feather the base of the film into the page so the stacked mobile
              layout does not read as a photo pasted above some text. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-gradient-to-t from-ink-950 from-[2%] via-ink-950/45 via-30% to-transparent to-70% lg:block"
          />
        </motion.div>

        <motion.div className="relative" style={copyStyle}>
          <Container className="pb-14 pt-10 sm:pb-16 lg:pt-32">
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <AnimatedText
                  as="p"
                  immediate
                  delay={0.35}
                  stagger={0.08}
                  className="font-display text-caps font-bold uppercase text-white/90"
                >
                  Safe. Secure. Productive.
                </AnimatedText>
                <Rise immediate delay={0.7} y={12}>
                  <span className="mt-3 block font-sans text-xs tracking-[0.2em] text-white/55">
                    Private security since 1997
                  </span>
                </Rise>
              </div>

              <Rise immediate delay={0.85} y={12}>
                <Link
                  to="/quote"
                  className="group inline-flex items-center gap-3 border-b border-white/30 pb-1.5 font-display text-caps font-bold uppercase text-white transition-colors duration-500 hover:border-white"
                >
                  Request a proposal
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden
                    className="h-3 w-3 transition-transform duration-500 ease-out group-hover:translate-x-1"
                  >
                    <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </Link>
              </Rise>
            </div>
          </Container>
        </motion.div>

        {/* Scroll cue — the one looping animation on the page. */}
        {reduce ? null : (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-1/2 hidden h-9 w-5 -translate-x-1/2 rounded-full border border-white/25 lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ opacity: copyOpacity }}
          >
            <motion.span
              className="absolute left-1/2 top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-white/70"
              animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </section>

      {/* ------------------------------------------------------------ Statement */}
      <section className="dot-bg border-b border-white/[0.07] bg-ink-950">
        <Container className="py-16 sm:py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Rise>
                <Eyebrow>Toronto · Ontario-wide</Eyebrow>
              </Rise>
              {/* Each line rises out of its own mask, one after the other. */}
              <h1 className="mt-8 font-display text-d1 font-extrabold text-white">
                <AnimatedText as="span" className="block" delay={0.1}>
                  Every shift supervised.
                </AnimatedText>
                <AnimatedText as="span" className="mt-1 block sm:mt-2" delay={0.3}>
                  Every incident documented.
                </AnimatedText>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-4">
              <Rise delay={0.25}>
                <p className="max-w-prose text-lede text-brand-text2">
                  Licensed officers on commercial, residential, retail, healthcare, construction, and event programs
                  across Ontario—staffed, field-checked, and reported to a standard you can stand behind.
                </p>
              </Rise>
              <Rise delay={0.4} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-3 border-b border-white/25 pb-1.5 font-display text-caps font-bold uppercase text-white transition-colors hover:border-white"
                >
                  Service sectors
                  <svg viewBox="0 0 16 16" aria-hidden className="h-3 w-3 transition-transform duration-500 ease-out group-hover:translate-x-1">
                    <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </Link>
                <a
                  href="tel:+14165359341"
                  className="inline-flex items-center border-b border-transparent pb-1.5 font-display text-caps font-bold uppercase tabular-nums text-brand-muted transition-colors hover:border-white/40 hover:text-white"
                >
                  416.535.9341
                </a>
              </Rise>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- Stats */}
      <section className="border-y border-white/[0.07] bg-ink-950">
        <Container>
          {/* No stagger wrapper here: an extra div inside <dl> would break the
              dt/dd grouping. Each counter animates itself on scroll instead. */}
          <dl className="grid grid-cols-2 gap-px overflow-hidden bg-white/[0.07] lg:grid-cols-4">
            <StatCounter value={1997} label="Established" plain />
            <StatCounter value={120} suffix="+" label="Service professionals" delay={0.1} />
            <StatCounter value={6} label="Service sectors" delay={0.2} />
            <StatCounter value={24} suffix="/7" label="Operations desk" plain delay={0.3} />
          </dl>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Services */}
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Rise>
              <Eyebrow>Service portfolio</Eyebrow>
            </Rise>
            <AnimatedText
              as="h2"
              delay={0.1}
              className="mt-4 max-w-2xl font-display text-d2 font-extrabold text-white"
            >
              Sectors we support end to end
            </AnimatedText>
          </div>
          <Rise delay={0.25}>
            <p className="max-w-prose text-sm leading-relaxed text-brand-muted sm:max-w-xs sm:text-right">
              Each sector receives post orders, training emphasis, and supervision cadence matched to the environment —
              not a recycled checklist.
            </p>
          </Rise>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {services.map((s, idx) => (
            <StaggerItem key={s.slug} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="h-full"
              >
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-card"
                >
                  <div className="relative h-44 overflow-hidden sm:h-48">
                    <img
                      src={s.image}
                      alt=""
                      className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                      width={1536}
                      height={1024}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="font-display text-[0.625rem] font-bold tabular-nums tracking-[0.18em] text-brand-accent">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 font-display text-2xl font-bold text-white">{s.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <p className="flex-1 text-sm leading-relaxed text-brand-muted">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                      Explore
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      {/* ---------------------------------------------------------- Principles */}
      <section className="dot-bg-soft border-y border-white/[0.07] bg-ink-900">
        <Container className="py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Rise>
                <Eyebrow>Operating principles</Eyebrow>
              </Rise>
              <h2 className="mt-4 max-w-xl font-display text-d2 font-extrabold text-white">
                <AnimatedText as="span" className="block" delay={0.1}>
                  Quality on Paper,
                </AnimatedText>
                <AnimatedText as="span" className="mt-1 block sm:mt-2" delay={0.28}>
                  proven on site
                </AnimatedText>
              </h2>
              <Rise delay={0.35}>
                <p className="mt-6 max-w-prose text-lede text-brand-muted">
                  Boards and operations leaders should expect more than a uniform at the desk. We recruit for
                  communication, coach for judgment under pressure, and measure performance through field audits, client
                  touchpoints, and incident documentation you can defend.
                </p>
              </Rise>
            </div>

            {/* The photo scales down into place rather than sliding — it reads as
                the image settling, not as a card flying in. */}
            <Rise className="lg:col-span-6" delay={0.15}>
              <motion.figure
                className="overflow-hidden rounded-2xl border border-white/10 shadow-lift"
                initial={reduce ? false : { scale: 1.08 }}
                whileInView={reduce ? undefined : { scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                <img
                  src={brandImages.principlesFeature}
                  alt="Security supervisor reviewing documented incident logs on site"
                  className="aspect-[4/3] w-full object-cover object-center"
                  width={1400}
                  height={1050}
                  loading="lazy"
                />
              </motion.figure>
            </Rise>
          </div>

          <Stagger className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6" gap={0.09}>
            {principles.map((p, idx) => (
              <StaggerItem key={p.t}>
                <div className="group border-t border-white/15 pt-5 transition-colors duration-500 hover:border-brand-accent/70">
                  <div className="font-display text-xs font-bold tabular-nums tracking-[0.18em] text-brand-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">{p.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{p.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ---------------------------------------------------------- Engagement */}
      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Rise>
              <Eyebrow>Engagement model</Eyebrow>
            </Rise>
            <AnimatedText as="h2" delay={0.1} className="mt-4 font-display text-d2 font-extrabold text-white">
              From first conversation to contracted coverage
            </AnimatedText>
            <Rise delay={0.3}>
              <p className="mt-6 max-w-prose text-sm leading-relaxed text-brand-muted">
                We treat procurement as collaboration: your risk tolerance, hours of exposure, and internal stakeholders
                shape the program design — not the other way around.
              </p>
              <figure className="mt-10 border-l border-brand-accent/50 pl-5">
                <blockquote className="text-sm leading-relaxed text-brand-text2">
                  “We coach for judgment, not just procedure. That’s what clients feel on site.”
                </blockquote>
                <figcaption className="mt-3 text-sm font-medium text-white">
                  Derek Finnegan
                  <span className="ml-2 font-normal text-brand-muted">Field leadership</span>
                </figcaption>
              </figure>
            </Rise>
          </div>

          <div className="lg:col-span-8">
            <Stagger as="ol" className="grid gap-px overflow-hidden rounded-xl bg-white/[0.07]" gap={0.1}>
              {engagement.map((s, idx) => (
                <StaggerItem as="li" key={s.t} className="dot-bg group flex flex-col gap-4 bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900 sm:flex-row sm:gap-8 lg:p-9">
                  <span className="font-display text-xs font-bold tabular-nums tracking-[0.18em] text-brand-accent sm:w-24 sm:shrink-0 sm:pt-1">
                    STEP {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-d3 font-bold text-white">{s.t}</h3>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-brand-muted">{s.d}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>

      {/* ----------------------------------------------------------------- CTA */}
      <section className="dot-bg-soft border-t border-white/[0.07] bg-ink-900">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <AnimatedText as="h2" className="max-w-2xl font-display text-d2 font-extrabold text-white">
                  Tell us what your site actually needs.
                </AnimatedText>
                <p className="mt-5 max-w-prose text-sm leading-relaxed text-brand-muted">
                  Send the hours, the exposure, and the standard you are held to. We will come back with a staffing and
                  supervision model — not a brochure. For time-sensitive security issues, call the operations line.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link
                  to="/quote"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-white px-7 text-sm font-semibold text-ink-950 transition hover:bg-white/90"
                >
                  Request a proposal
                </Link>
                <a
                  href="tel:+14165359341"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-7 text-sm font-semibold tabular-nums text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  416.535.9341
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* --------------------------------------------------------------- Visit */}
      <section className="border-t border-white/[0.07] bg-ink-950">
        <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-4">
            <Eyebrow>Head office</Eyebrow>
            <h2 className="mt-4 font-display text-d3 font-bold text-white">Visit us</h2>
            <address className="mt-5 not-italic text-sm leading-relaxed text-brand-muted">
              18 Wynford Drive, Suite 711B
              <br />
              Toronto, ON
            </address>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a className="font-medium tabular-nums text-white hover:underline" href="tel:+14165359341">
                    416.535.9341
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a className="text-brand-muted transition-colors hover:text-white" href="mailto:info@prodsec.ca">
                    info@prodsec.ca
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/[0.07] lg:col-span-8">
            <iframe
              title="Map — Productive Security, 18 Wynford Drive, Toronto"
              className="map-dark h-[300px] w-full sm:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=18%20Wynford%20Drive%20Toronto&output=embed"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
