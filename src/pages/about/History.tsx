import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";

const items = [
  { year: "1997", title: "Founded", text: "Productive Security is established in Toronto with a focus on service quality." },
  { year: "Growth", title: "Ontario footprint", text: "Programs expand across sectors as clients trust our consistency." },
  { year: "2010", title: "Leadership transition", text: "Sanjay Rupani’s legacy continues through family leadership." },
  { year: "Today", title: "Rose Rupani leads", text: "120+ professionals delivering programs province-wide." },
];

export default function History() {
  return (
    <>
      <SeoHead
        title="History"
        description="Timeline of Productive Security Inc. from 1997 founding to today’s Ontario-wide operations."
        path="/about/history"
      />
      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-3xl text-white">Three decades of presence</h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                Security is a relationship business. Our history is measured in long client tenures, steady training
                investment, and the trust communities place in our teams.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <ol className="relative space-y-6 border-l border-brand-border pl-8">
              {items.map((it, idx) => (
                <Reveal key={it.title} delay={idx * 0.06}>
                  <li className="relative">
                    <span className="absolute -left-[39px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-brand-yellow bg-brand-dark">
                      <span className="h-2 w-2 rounded-full bg-brand-yellow" />
                    </span>
                    <div className="font-mono text-xs text-brand-yellow">{it.year}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{it.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">{it.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </>
  );
}
