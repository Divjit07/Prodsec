import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";

const values = [
  { title: "People", text: "Respect for staff and the communities we protect—always." },
  { title: "Quality Service", text: "Standards you can audit: punctuality, presence, and polish." },
  { title: "Security", text: "Risk-aware programs designed for real-world conditions." },
  { title: "Communication", text: "Fast, factual reporting when incidents happen." },
  { title: "Honesty", text: "Clear expectations—no inflated promises." },
];

export default function Values() {
  return (
    <>
      <SeoHead
        title="Values"
        description="Core values at Productive Security: people, quality, security, communication, and honesty."
        path="/about/values"
      />
      <Container className="py-10">
        <Reveal>
          <h2 className="font-display text-3xl text-white">What we optimize for</h2>
          <p className="mt-3 max-w-2xl text-sm text-brand-muted">
            Values are not posters—they are decision criteria used on hard nights and busy weekends.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, idx) => (
            <Reveal key={v.title} delay={idx * 0.05}>
              <div className="h-full rounded-2xl border border-brand-border dot-bg bg-brand-surface p-6 shadow-card transition hover:-translate-y-1 hover:border-brand-yellow/25 hover:shadow-lift">
                <div className="font-display text-2xl text-white">{v.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
