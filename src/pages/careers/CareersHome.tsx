import { Link } from "react-router-dom";
import { SeoHead } from "../../components/SeoHead";
import { Container } from "../../components/Container";
import { ImageHero } from "../../components/ImageHero";
import { Reveal } from "../../components/Reveal";
import { brandImages } from "../../data/brandAssets";

export default function CareersHome() {
  return (
    <>
      <SeoHead
        title="Careers"
        description="Join Productive Security Inc.—training, growth, and flexible schedules across Ontario."
        path="/careers"
      />

      <ImageHero
        eyebrow="Careers"
        title="Build a career with purpose—and support behind you."
        description="We invest in training, promote from within where possible, and keep communication honest when schedules get demanding. If you value professionalism on shift and leadership that shows up when it counts, we would like to meet you."
        imageSrc={brandImages.careersHero}
        imageAlt="Productive Security careers and team environment"
        objectClass="object-[50%_32%]"
        minHeightClass="min-h-[min(88vh,720px)]"
        actions={
          <>
            <Link
              to="/careers/jobs"
              className="inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink shadow-sm transition hover:bg-white/95"
            >
              View open jobs
            </Link>
            <Link
              to="/careers/culture"
              className="inline-flex rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Culture & stories
            </Link>
          </>
        }
      />

      <Container className="py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: "Training that sticks", d: "Clear standards, coaching in the field, and supervision you can count on." },
            { t: "Flexible shifts", d: "Day, evening, night, and weekend roles across multiple client environments." },
            { t: "Growth paths", d: "Leadership opportunities for officers who want to mentor and manage." },
          ].map((c, idx) => (
            <Reveal key={c.t} delay={idx * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 dot-bg bg-brand-surface p-6 shadow-card">
                <div className="font-display text-2xl text-white">{c.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
