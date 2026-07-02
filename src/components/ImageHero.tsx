import type { ReactNode } from "react";
import { Container } from "./Container";

type ImageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  /** Tailwind object-* classes for focal point */
  objectClass?: string;
  actions: ReactNode;
  minHeightClass?: string;
};

/**
 * Full-bleed image hero with no overlays; copy lives in a solid section below the photo.
 */
export function ImageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  objectClass = "object-[50%_35%]",
  actions,
  minHeightClass = "min-h-[min(80svh,680px)] sm:min-h-[min(85svh,720px)]",
}: ImageHeroProps) {
  return (
    <>
      <section className={`relative isolate overflow-hidden border-b border-white/10 ${minHeightClass}`}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full object-cover ${objectClass}`}
          loading="eager"
        />
      </section>

      <section className="border-b border-white/10 dot-bg bg-brand-surface">
        <Container className="px-4 py-12 sm:px-6 sm:py-16">
          <header>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-muted">{eyebrow}</p>
            <h1 className="mt-4 font-display text-[1.75rem] leading-tight tracking-[0.02em] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight xl:text-5xl xl:whitespace-nowrap">
              {title}
            </h1>
          </header>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        </Container>
      </section>
    </>
  );
}
