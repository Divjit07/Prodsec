import { Link } from "react-router-dom";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";

const people = [
  {
    name: "Richard Sagundo",
    role: "Field leadership",
    quote: "Clear standards make hard nights manageable—our team proves that every week.",
  },
  {
    name: "Derek Finnegan",
    role: "Training & quality",
    quote: "We coach for judgment, not just procedure. That’s what clients feel on site.",
  },
  {
    name: "Avery Chen",
    role: "Mobile patrol",
    quote: "Patrol work is about attention to detail—small fixes prevent big incidents.",
  },
  {
    name: "Marcus Lee",
    role: "Commercial programs",
    quote: "Professional presence is a skill. We treat it like one.",
  },
];

export default function Culture() {
  return (
    <>
      <SeoHead
        title="Culture"
        description="Life at Productive Security—people, benefits, and what we look for in teammates."
        path="/careers/culture"
      />
      <section className="border-b border-brand-border dot-bg bg-brand-surface">
        <Container className="py-14 sm:py-16">
          <p className="font-mono text-xs text-brand-yellow">Careers</p>
          <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Culture built on respect</h1>
          <p className="mt-4 max-w-2xl text-base text-brand-muted">
            We are protective without being performative—firm when needed, human always.
          </p>
          <Link
            to="/careers/jobs"
            className="mt-8 inline-flex rounded-xl bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-dark hover:brightness-105"
          >
            Join our team
          </Link>
        </Container>
      </section>

      <Container className="py-12">
        <Reveal>
          <h2 className="font-display text-3xl text-white">Spotlights</h2>
          <p className="mt-3 max-w-2xl text-sm text-brand-muted">
            Real voices from the field—names represent composite stories aligned to our values.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {people.map((p, idx) => (
            <Reveal key={p.name} delay={idx * 0.05}>
              <figure className="h-full rounded-2xl border border-brand-border dot-bg bg-brand-surface-2 p-6 shadow-card">
                <blockquote className="text-sm leading-relaxed text-brand-text/90">“{p.quote}”</blockquote>
                <figcaption className="mt-5">
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="text-xs text-brand-muted">{p.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-brand-border dot-bg bg-brand-surface p-6">
              <h3 className="font-display text-2xl text-white">Benefits & growth</h3>
              <ul className="mt-4 space-y-3 text-sm text-brand-muted">
                <li>Flexible shifts across day, evening, night, and weekend assignments.</li>
                <li>Competitive wages with transparent expectations.</li>
                <li>In-depth onboarding and ongoing coaching.</li>
                <li>Promote-from-within paths for officers who want to lead.</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="overflow-hidden rounded-2xl border border-brand-border shadow-card">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
                alt="Team collaboration in a professional environment"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
              />
              <div className="border-t border-brand-border dot-bg bg-brand-surface-2 p-6 text-sm text-brand-muted">
                Imagery is illustrative—your real experience will be shaped by your site, your team lead, and the
                standards we set together.
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
