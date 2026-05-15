import { SeoHead } from "../components/SeoHead";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { Link } from "react-router-dom";

export default function ClientPortal() {
  return (
    <>
      <SeoHead
        title="Client Portal"
        description="Client portal for Productive Security Inc. — coming in Phase 3."
        path="/client-portal"
      />
      <Container className="pt-4 pb-16">
        <p className="font-mono text-xs text-brand-yellow">Phase 3</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Client portal</h1>
        <p className="mt-4 max-w-2xl text-sm text-brand-muted">
          A secure hub for schedules, incident history, monthly reports, and service requests is on the roadmap. If you
          need something today, call{" "}
          <a className="text-white hover:underline" href="tel:+14165359341">
            416.535.9341
          </a>{" "}
          or email{" "}
          <a className="text-white hover:underline" href="mailto:info@prodsec.ca">
            info@prodsec.ca
          </a>
          .
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            { t: "Schedules & rosters", d: "View assigned coverage windows (where contracted)." },
            { t: "Incident history", d: "Searchable log exports for audits and insurance." },
            { t: "Service requests", d: "Raise tickets with clear SLAs and status tracking." },
          ].map((x, idx) => (
            <Reveal key={x.t} delay={idx * 0.05}>
              <div className="h-full rounded-2xl border border-brand-border dot-bg bg-brand-surface p-6 opacity-90">
                <div className="font-display text-2xl text-white">{x.t}</div>
                <p className="mt-3 text-sm text-brand-muted">{x.d}</p>
                <div className="mt-4 inline-flex rounded-full border border-brand-border px-3 py-1 text-[11px] font-semibold text-brand-muted">
                  Planned
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link to="/quote" className="text-sm font-semibold text-brand-yellow hover:underline">
            Request a program quote →
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
