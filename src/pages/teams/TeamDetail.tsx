import { Link, Navigate, useParams } from "react-router-dom";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { getTeam } from "../../data/teams";

export default function TeamDetail() {
  const { slug } = useParams();
  const t = getTeam(slug);
  if (!t) return <Navigate to="/teams" replace />;

  return (
    <>
      <SeoHead title={t.title} description={t.subtitle} path={`/teams/${t.slug}`} />
      <section className="border-b border-brand-border dot-bg bg-brand-surface">
        <Container className="grid gap-10 py-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-brand-border shadow-card">
              <img
                src={t.image}
                alt={`Photography representing ${t.title}`}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-brand-yellow">Teams</p>
            <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">{t.title}</h1>
            <p className="mt-4 text-base text-brand-muted">{t.subtitle}</p>
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-brand-text/90">
              {t.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/quote"
                className="inline-flex rounded-xl bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-dark hover:brightness-105"
              >
                Discuss a program
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <Reveal>
          <h2 className="font-display text-2xl text-white">Operational focus</h2>
        </Reveal>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {t.bullets.map((b, idx) => (
            <Reveal key={b} delay={idx * 0.04}>
              <li className="rounded-2xl border border-brand-border dot-bg bg-brand-surface-2 p-4 text-sm text-brand-text/90">
                {b}
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  );
}
