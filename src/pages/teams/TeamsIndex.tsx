import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { ImageHero } from "../../components/ImageHero";
import { Reveal } from "../../components/Reveal";
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
        imageSrc={brandImages.collage}
        imageAlt="Productive Security officers on patrol and in the field"
        objectClass="object-[50%_42%]"
        actions={
          <Link
            to="/quote"
            className="inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink shadow-sm transition hover:bg-white/95"
          >
            Book a leadership review
          </Link>
        }
      />

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
