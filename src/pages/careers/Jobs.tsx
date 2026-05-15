import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { jobs, type JobType, type Shift } from "../../data/jobs";

const locations = Array.from(new Set(jobs.map((j) => j.location))).sort();

export default function CareersJobs() {
  const [type, setType] = useState<"All" | JobType>("All");
  const [loc, setLoc] = useState<string>("All");
  const [shift, setShift] = useState<"All" | Shift>("All");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (type !== "All" && j.type !== type) return false;
      if (loc !== "All" && j.location !== loc) return false;
      if (shift !== "All" && !j.shifts.includes(shift)) return false;
      return true;
    });
  }, [type, loc, shift]);

  return (
    <>
      <SeoHead
        title="Open Jobs"
        description="Browse Productive Security job listings across Ontario—officers, patrol, supervision, and admin."
        path="/careers/jobs"
      />
      <Container className="pt-4 pb-16">
        <p className="font-mono text-xs text-brand-yellow">Careers</p>
        <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Open positions</h1>
        <p className="mt-4 max-w-2xl text-sm text-brand-muted">
          Filters update instantly. When you are ready, apply online—your submission routes to our HR team.
        </p>

        <div className="mt-8 grid gap-3 rounded-2xl border border-brand-border dot-bg bg-brand-surface p-4 sm:grid-cols-3">
          <label className="text-xs font-semibold text-brand-muted">
            Job type
            <select
              className="mt-2 w-full rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white"
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
            >
              <option>All</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-brand-muted">
            Location
            <select
              className="mt-2 w-full rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            >
              <option>All</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold text-brand-muted">
            Shift
            <select
              className="mt-2 w-full rounded-xl border border-brand-border bg-brand-dark px-3 py-2 text-sm text-white"
              value={shift}
              onChange={(e) => setShift(e.target.value as typeof shift)}
            >
              <option>All</option>
              <option>Day</option>
              <option>Evening</option>
              <option>Night</option>
              <option>Weekend</option>
            </select>
          </label>
        </div>

        <div className="mt-8 grid gap-4">
          {filtered.map((j, idx) => (
            <Reveal key={j.id} delay={idx * 0.04}>
              <article className="rounded-2xl border border-brand-border dot-bg bg-brand-surface-2 p-6 shadow-card">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="font-display text-2xl text-white">{j.title}</h2>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-brand-muted">
                      <span className="rounded-full border border-brand-border bg-black/20 px-2 py-1 text-brand-text">
                        {j.location}
                      </span>
                      <span className="rounded-full border border-brand-border bg-black/20 px-2 py-1 text-brand-text">
                        {j.type}
                      </span>
                      <span className="rounded-full border border-brand-border bg-black/20 px-2 py-1 text-brand-text">
                        Shifts: {j.shifts.join(", ")}
                      </span>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-text/85">{j.blurb}</p>
                  </div>
                  <Link
                    to={`/careers/jobs/apply?role=${encodeURIComponent(j.title)}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-dark hover:brightness-105"
                  >
                    Apply now
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 text-sm text-brand-muted">No roles match those filters—try widening your selection.</p>
        ) : null}
      </Container>
    </>
  );
}
