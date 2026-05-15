import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { services, type ServiceSlug } from "../../data/services";
import { brandImages } from "../../data/brandAssets";

/** Short uppercase labels for the sector stack (reference-style rail). */
const sectorRailLabel: Record<ServiceSlug, string> = {
  commercial: "Commercial",
  construction: "Construction",
  apartment: "Apartment & condo",
  retail: "Retail & shopping",
  healthcare: "Healthcare",
  "special-events": "Special events",
};

export default function ServicesIndex() {
  return (
    <>
      <SeoHead
        title="Services"
        description="Commercial, construction, condominium, retail, healthcare, and special event security—staffed and supervised for Ontario operators."
        path="/services"
      />

      {/* Split hero: sector rail + photography — site navy / dots, no glass over image */}
      <section className="border-b border-white/10 dot-bg bg-brand-navy-950">
        <Container className="px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-0 lg:items-stretch">
            <div className="flex flex-col justify-between lg:col-span-5 lg:border-r lg:border-white/10 lg:pr-8 xl:pr-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-muted">
                  Service lines
                </p>
                <h1 className="mt-3 max-w-md text-balance font-display text-[2rem] leading-[0.98] tracking-[0.02em] text-white sm:text-5xl sm:leading-[0.98]">
                  Programs built for your sector—not recycled post orders.
                </h1>

                <nav className="mt-10" aria-label="Security programs by sector">
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {services.map((s, idx) => (
                      <motion.li
                        key={s.slug}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * idx, duration: 0.35 }}
                      >
                        <Link
                          to={`/services/${s.slug}`}
                          className="group flex items-center justify-between gap-4 py-3.5 transition sm:py-4"
                        >
                          <span className="font-display text-[1.35rem] uppercase leading-none tracking-[0.08em] text-white drop-shadow-[0_1px_14px_rgba(0,0,0,0.5)] sm:text-2xl sm:tracking-[0.1em]">
                            {sectorRailLabel[s.slug]}
                          </span>
                          <span
                            className="shrink-0 font-display text-lg text-brand-yellow/0 transition group-hover:text-brand-yellow/90"
                            aria-hidden
                          >
                            →
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              <p className="mt-10 max-w-sm font-display text-[11px] font-medium uppercase leading-relaxed tracking-[0.32em] text-brand-muted sm:text-xs lg:mt-14">
                Unwavering protection — Productive Security Inc.
              </p>
            </div>

            <div className="flex flex-col lg:col-span-7 lg:pl-6 xl:pl-10">
              <div className="relative min-h-[min(48vh,380px)] flex-1 overflow-hidden rounded-2xl bg-brand-dark shadow-lift ring-1 ring-white/[0.07] lg:min-h-[min(560px,calc(100dvh-10rem))]">
                <img
                  src={brandImages.guard}
                  alt="Uniformed Productive Security officer on site"
                  className="absolute inset-0 h-full w-full object-cover object-[52%_28%] sm:object-[50%_30%]"
                  width={1600}
                  height={1200}
                  loading="eager"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy-950/50 via-transparent to-brand-navy-950/15"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 dot-bg bg-brand-surface">
        <Container className="px-4 py-12 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <p className="text-sm leading-relaxed text-brand-muted sm:text-base">
              Each environment carries different liabilities: retail shrink and de-escalation, condominium hospitality
              standards, construction perimeter control, healthcare privacy expectations, and event crowd dynamics. Our
              teams are staffed, trained, and supervised with those realities in mind.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/quote"
                className="inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink shadow-sm transition hover:bg-white/95"
              >
                Discuss your property
              </Link>
              <Link
                to="/contact"
                className="inline-flex rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Speak with operations
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="px-4 pb-16 pt-12 sm:px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Sector spotlights</p>
            <h2 className="mt-2 font-display text-3xl tracking-wide text-white sm:text-4xl">
              See how we deploy in each environment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
              Representative sites and program notes—open a sector for deliverables, training emphasis, and supervision
              cadence.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((s, idx) => (
            <Reveal key={s.slug} delay={idx * 0.04}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="group overflow-hidden rounded-2xl border border-white/10 dot-bg bg-brand-surface shadow-card"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.image}
                    alt={`Photography representing ${s.title}`}
                    className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/25 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display text-2xl text-white">{s.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-brand-muted">{s.short}</p>
                  <Link
                    to={`/services/${s.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-brand-yellow/45 underline-offset-4 hover:decoration-white"
                  >
                    Sector brief & approach
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
