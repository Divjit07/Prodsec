import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { ImageHero } from "../../components/ImageHero";
import { Reveal } from "../../components/Reveal";
import { CardSpread } from "../../components/CardSpread";
import { AnimatedText, Rise } from "../../components/AnimatedText";
import { teams } from "../../data/teams";
import { brandImages } from "../../data/brandAssets";

export default function TeamsIndex() {
  return (
    <>
      <SeoHead
        title="Teams"
        description="Management support, uniformed officer programs, and mobile patrol—structured supervision for Ontario-wide deployments."
        path="/teams"
      />

      <ImageHero
        eyebrow="Deployment model"
        // Was a fragment with a dangling em dash that broke across six ragged
        // lines. This is a complete sentence and wraps cleanly.
        title="We align leadership, officers, and patrol rhythm to your account."
        description="Effective security is not headcount alone. Account direction, field supervision, and patrol design work together, so the standard holds at 2 a.m. on a Tuesday exactly as it does in a Monday board review. Choose the mix that matches your risk, your hours, and how your property actually runs."
        imageSrc={brandImages.teamSupervisorSuv}
        imageAlt="Productive Security supervisor and officers at the patrol vehicle"
        objectClass="object-[58%_center]"
        minHeightClass="min-h-[min(52svh,380px)] sm:min-h-[min(58svh,460px)] lg:min-h-[min(84svh,760px)]"
        actions={
          <Link
            to="/quote"
            className="inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink shadow-sm transition hover:bg-white/95"
          >
            Book a leadership review
          </Link>
        }
      />

      {/* -------------------------------------------------------- The people */}
      <section className="dot-bg-soft border-b border-white/[0.07] bg-ink-900">
        <Container className="py-20 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Rise>
              <p className="flex items-center justify-center gap-4 font-display text-eyebrow font-bold uppercase text-brand-accent">
                <span aria-hidden className="h-px w-8 bg-brand-accent/60" />
                The people on post
                <span aria-hidden className="h-px w-8 bg-brand-accent/60" />
              </p>
            </Rise>
            <AnimatedText as="h2" delay={0.1} className="mt-6 text-balance font-display text-d2 font-extrabold text-white">
              The team behind the standard
            </AnimatedText>
            <Rise delay={0.3}>
              <p className="mt-6 text-lede text-brand-muted">
                Licensed officers, field supervisors, and account leads — the people who actually hold the line on your
                site, every shift.
              </p>
            </Rise>
          </div>

          <CardSpread
            className="mt-16 h-[22rem] sm:h-[26rem] lg:mt-20 lg:h-[30rem]"
            cards={[
              { src: brandImages.guardMuseum, alt: "Officer on gallery post", x: -170, rotate: -14, z: 10 },
              { src: brandImages.guardLobby, alt: "Officer on lobby post", x: -88, rotate: -7, z: 20 },
              // The group portrait is the point of the section: front, centre, largest.
              { src: brandImages.teamPortrait, alt: "The Productive Security team", x: 0, rotate: 0, z: 30, scale: 1.1 },
              { src: brandImages.guardIdCheck, alt: "Officer checking ID at an access gate", x: 88, rotate: 7, z: 20 },
              { src: brandImages.supervisorNight, alt: "Supervisor on night patrol", x: 170, rotate: 14, z: 10 },
            ]}
          />
        </Container>
      </section>

      <Container className="pb-16 pt-12">
        <div className="grid gap-4 lg:grid-cols-3">
          {teams.map((t, idx) => (
            <Reveal key={t.slug} delay={idx * 0.05}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 380, damping: 28 }}>
                <Link
                  to={`/teams/${t.slug}`}
                  className="block h-full overflow-hidden rounded-2xl border border-white/10 dot-bg bg-brand-surface shadow-card"
                >
                  <div className="relative h-40">
                    <img src={t.image} alt="" className="h-full w-full object-cover opacity-90" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="font-display text-2xl text-white">{t.title}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-brand-muted">{t.subtitle}</p>
                    <div className="mt-4 text-sm font-semibold text-white underline decoration-brand-yellow/45 underline-offset-4">
                      Read capability brief →
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
