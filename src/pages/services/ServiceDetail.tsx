import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { getService } from "../../data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = getService(slug);
  if (!s) return <Navigate to="/services" replace />;

  return (
    <>
      <SeoHead title={s.title} description={s.short} path={`/services/${s.slug}`} />
      <section className="relative overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0">
          <img
            src={s.image}
            alt={`Photography representing ${s.title}`}
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/35" />
        </div>
        <Container className="relative py-14 sm:py-16">
          <p className="font-mono text-xs text-brand-yellow">Services</p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-3xl font-display text-4xl text-white sm:text-5xl"
          >
            {s.title}
          </motion.h1>
          <p className="mt-4 max-w-2xl text-base text-brand-text/85">{s.short}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center rounded-xl bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-dark hover:brightness-105"
            >
              Get a quote
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-brand-border bg-black/20 px-5 py-3 text-sm font-semibold text-white hover:border-brand-yellow/35"
            >
              All services
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-2xl text-white">The challenge</h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">{s.challenge}</p>
            </Reveal>
            <Reveal delay={0.06} className="mt-10">
              <h2 className="font-display text-2xl text-white">Our approach</h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">{s.solution}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-2xl text-white">What you can expect</h2>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.features.map((f, idx) => (
                <Reveal key={f} delay={idx * 0.04}>
                  <div className="rounded-2xl border border-brand-border dot-bg bg-brand-surface p-4 shadow-card">
                    <div className="font-mono text-[11px] text-brand-yellow">0{idx + 1}</div>
                    <div className="mt-2 text-sm font-semibold text-white">{f}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
