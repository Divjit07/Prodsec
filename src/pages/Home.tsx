import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { SeoHead, injectJsonLd } from "../components/SeoHead";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";
import { services } from "../data/services";
import { brandImages } from "../data/brandAssets";

const heroWords = ["Licensed professionals", "Supervised field teams", "Executive-ready reporting"];

/** Local file: `public/media/landing-hero.mp4` (replace by copying from `Landing page/Landing page.mp4` or drop a new MP4 here). */
const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}media/landing-hero.mp4`;

const HERO_POSTER =
  "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1920&q=70";

export default function Home() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    injectJsonLd("prodsec-org", {
      "@context": "https://schema.org",
      "@type": "SecurityService",
      name: "Productive Security Inc.",
      url: "https://prodsec.ca/",
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

      <section className="relative isolate min-h-[100svh] overflow-hidden border-b border-white/10" aria-label="Brand film">
        <div className="absolute inset-0 bg-brand-dark">
          {reduceMotion ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${HERO_POSTER})`,
              }}
              aria-hidden
            />
          ) : (
            <video
              className="hero-video hero-video--drift absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-[65%_center] lg:object-[60%_center]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HERO_POSTER}
              aria-hidden
              disablePictureInPicture
              controls={false}
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          )}
        </div>
      </section>

      <section className="border-b border-white/10 dot-bg bg-brand-surface">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            <div className="max-w-3xl lg:max-w-none">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="border-l border-brand-yellow/45 pl-4 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-brand-muted sm:text-xs sm:tracking-[0.22em]"
              >
                Toronto headquarters · Ontario-wide programs · Since 1997
              </motion.p>

              <div className="mt-6">
                <h1 className="text-balance font-display text-[2.15rem] leading-[1.08] tracking-[0.02em] text-white sm:text-5xl sm:leading-[1.05] lg:text-[3.05rem] lg:leading-[1.04]">
                  Private security built for
                  <span className="mt-1 block text-white/95">credible presence and accountable outcomes.</span>
                </h1>
                <div className="mt-5 flex flex-wrap gap-2">
                  {heroWords.map((w, i) => (
                    <motion.span
                      key={w}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium tracking-wide text-brand-text/95 sm:text-sm"
                    >
                      {w}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
                className="mt-6 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base"
              >
                Productive Security partners with property managers, construction teams, retailers, condominiums, and
                healthcare operators to deliver uniformed coverage, mobile response, and documentation that stands up to
                board scrutiny. Programs are staffed to your traffic patterns, risk profile, and brand standards—not a
                generic template.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold tracking-wide text-brand-ink shadow-sm transition hover:bg-white/95 sm:px-6 sm:py-3"
                >
                  Request a security proposal
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-md border border-white/25 bg-transparent px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:border-white/40 hover:bg-white/5 sm:px-6 sm:py-3"
                >
                  Review service sectors
                </Link>
              </motion.div>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-brand-dark shadow-card"
            >
              <img
                src={brandImages.services}
                alt="Productive Security uniformed officer on duty"
                className="aspect-[4/3] w-full object-cover object-[50%_28%] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[min(480px,50vh)]"
                width={1200}
                height={900}
                loading="eager"
              />
              <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-brand-muted">
                On-site programs across Ontario—licensed teams, clear standards, supervision you can audit.
              </figcaption>
            </motion.figure>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 dot-bg bg-brand-surface">
        <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="font-mono text-3xl font-semibold tabular-nums text-white sm:text-4xl">1997</div>
            <div className="mx-auto mt-2 h-px w-10 bg-brand-yellow/35" aria-hidden />
            <p className="mt-3 text-sm text-brand-muted">Year established</p>
          </div>
          <StatCounter value={120} suffix="+" label="Service professionals" />
          <StatCounter value={6} label="Service sectors" />
          <div className="text-center">
            <div className="font-mono text-3xl font-semibold tabular-nums text-white sm:text-4xl">24/7</div>
            <div className="mx-auto mt-2 h-px w-10 bg-brand-yellow/35" aria-hidden />
            <p className="mt-3 text-sm text-brand-muted">Operations desk</p>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Service portfolio</p>
              <h2 className="mt-2 font-display text-4xl text-white">Sectors we support end-to-end</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
                From high-rise residential lobbies to active construction perimeters, each sector receives post orders,
                training emphasis, and supervision cadence matched to the environment—not a recycled checklist.
              </p>
            </div>
            <Link
              to="/services"
              className="shrink-0 text-sm font-semibold text-white underline decoration-brand-yellow/50 underline-offset-4 hover:decoration-white"
            >
              Full services overview
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.slug} delay={idx * 0.04}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 360, damping: 26 }}>
                <Link
                  to={`/services/${s.slug}`}
                  className="block overflow-hidden rounded-2xl border border-white/10 dot-bg bg-brand-surface shadow-card"
                >
                  <div className="relative h-40">
                    <img
                      src={s.image}
                      alt={`${s.title} — Productive Security`}
                      className="h-full w-full object-cover opacity-85 transition duration-500 hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="font-display text-2xl text-white">{s.title}</div>
                    </div>
                  </div>
                  <p className="p-5 text-sm text-brand-muted">{s.short}</p>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-y border-white/10 dot-bg bg-brand-surface-2/80">
        <Container className="py-16">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Operating principles</p>
            <h2 className="mt-2 font-display text-4xl text-white">What “quality on paper” actually means</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-muted sm:text-base">
              Boards and operations leaders should expect more than a uniform at the desk. We recruit for communication,
              coach for judgment under pressure, and measure performance through field audits, client touchpoints, and
              incident documentation you can defend in a review.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                t: "People",
                d: "Respect-first presence: firm when policies require it, professional when the public is watching.",
                image: brandImages.principlePeople,
              },
              {
                t: "Quality",
                d: "Published standards for arrival, appearance, handoffs, and reporting—audited by supervision.",
                image: brandImages.principleQuality,
              },
              {
                t: "Security",
                d: "Programs aligned to access patterns, asset exposure, and escalation paths unique to your site.",
                image: brandImages.principleSecurity,
              },
              {
                t: "Communication",
                d: "Structured incident narratives and same-shift follow-up so property teams are never guessing.",
                image: brandImages.principleCommunication,
              },
              {
                t: "Honesty",
                d: "Clear staffing realities, transparent substitutions, and no inflated promises to win the file.",
                image: brandImages.principleHonesty,
              },
            ].map((x, idx) => (
              <Reveal key={x.t} delay={idx * 0.05}>
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="group relative isolate h-full min-h-[min(380px,52vh)] overflow-hidden rounded-2xl border border-white/10 shadow-card focus-within:ring-2 focus-within:ring-brand-yellow/40 focus-within:ring-offset-2 focus-within:ring-offset-brand-surface-2"
                  tabIndex={0}
                >
                  <img
                    src={x.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/88 to-brand-dark/35 transition duration-500 group-hover:via-brand-dark/70 group-hover:to-brand-dark/25"
                    aria-hidden
                  />
                  <div className="relative flex h-full min-h-[min(380px,52vh)] flex-col justify-end p-5 pt-20">
                    <div className="font-mono text-[11px] font-medium text-brand-yellow/90">0{idx + 1}</div>
                    <div className="mt-2 font-display text-2xl text-white">{x.t}</div>
                    <p className="sr-only">{x.d}</p>
                    <p
                      aria-hidden
                      className="mt-3 text-sm leading-relaxed text-white/90 transition duration-300 ease-out max-lg:translate-y-0 max-lg:opacity-100 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
                    >
                      {x.d}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Engagement model</p>
          <h2 className="mt-2 font-display text-4xl text-white">From first conversation to contracted coverage</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-muted sm:text-base">
            We treat procurement as collaboration: your risk tolerance, hours of exposure, and internal stakeholders
            shape the program design—not the other way around.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            {
              t: "Discovery & scope",
              d: "We document hours of risk, visitor flows, parking exposure, and escalation preferences—then translate that into staffing and supervision levels you can approve with confidence.",
            },
            {
              t: "Site alignment",
              d: "Walk-throughs with your team establish post orders, equipment needs, key contacts, and reporting format so day-one coverage matches what your property actually experiences.",
            },
            {
              t: "Program launch",
              d: "Orientation, uniform standards, and field supervision cadence are set before go-live. After launch, we review incidents and metrics with you on a rhythm that fits your governance cycle.",
            },
          ].map((s, idx) => (
            <Reveal key={s.t} delay={idx * 0.06}>
              <div className="rounded-2xl border border-white/10 dot-bg bg-brand-surface p-6 shadow-card">
                <div className="font-mono text-sm font-medium text-brand-yellow/90">Step {idx + 1}</div>
                <div className="mt-3 font-display text-2xl text-white">{s.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-y border-white/10 dot-bg bg-brand-surface">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Field leadership</p>
              <h2 className="mt-2 font-display text-4xl text-white">Voices from the programs we run</h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
                Culture is not a poster—it is how supervisors coach after a difficult shift, how officers represent your
                brand at the front desk, and how quickly accurate information reaches your team when it matters.
              </p>
              <div className="mt-8 space-y-5">
                <figure className="rounded-2xl border border-white/10 dot-bg bg-brand-surface-2 p-5">
                  <blockquote className="text-sm leading-relaxed text-brand-text/90">
                    “Clear standards make hard nights manageable—our team proves that every week.”
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-white">Richard Sagundo</figcaption>
                </figure>
                <figure className="rounded-2xl border border-white/10 dot-bg bg-brand-surface-2 p-5">
                  <blockquote className="text-sm leading-relaxed text-brand-text/90">
                    “We coach for judgment, not just procedure. That’s what clients feel on site.”
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-white">Derek Finnegan</figcaption>
                </figure>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-brand-surface-2 to-brand-navy-950 p-6 shadow-lift">
                <div className="text-xs font-semibold text-brand-muted">Trusted by teams across</div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["Commercial", "Construction", "Residential", "Retail", "Healthcare", "Events"].map((b) => (
                    <div
                      key={b}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center text-xs font-semibold text-brand-text/90"
                    >
                      {b}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-brand-muted">
                  Logos are illustrative placeholders—swap in your real client marks when permitted.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.07] via-brand-surface to-brand-surface p-8 shadow-lift sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-3xl text-white sm:text-4xl">Prefer a guided answer first?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
                  Use the assistant for routing questions on services, careers, and proposals. For time-sensitive
                  security issues, call the operations line—do not wait on chat.
                </p>
              </div>
              <Link
                to="/quote"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold tracking-wide text-brand-ink shadow-sm hover:bg-white/95"
              >
                Start a proposal
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>

      <section className="dot-bg border-t border-white/10 bg-brand-navy-950/50">
        <Container className="grid gap-8 py-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl text-white">Visit us</h2>
            <p className="mt-3 text-sm text-brand-muted">
              18 Wynford Drive, Suite 711B
              <br />
              Toronto, ON
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <div>
                <span className="text-brand-muted">Phone: </span>
                <a className="font-semibold text-white hover:underline" href="tel:+14165359341">
                  416.535.9341
                </a>
              </div>
              <div>
                <span className="text-brand-muted">Email: </span>
                <a className="font-semibold text-white hover:underline" href="mailto:info@prodsec.ca">
                  info@prodsec.ca
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-white/10 shadow-card">
            <iframe
              title="Map — Productive Security Toronto"
              className="h-[280px] w-full sm:h-[320px]"
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
