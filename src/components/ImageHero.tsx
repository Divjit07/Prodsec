import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Container } from "./Container";
import { AnimatedText, Rise } from "./AnimatedText";
import { EASE } from "../lib/motion";

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
 * Full-bleed image hero; copy lives in a solid band below the photo.
 *
 * The photo settles out of a slow scale-down on load and drifts under parallax as
 * you scroll — the same language as the home hero, so inner pages do not feel
 * like a different site.
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
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], ["0%", "16%"]);

  return (
    <>
      <section
        ref={ref}
        className={`relative isolate overflow-hidden border-b border-white/10 ${minHeightClass}`}
      >
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full object-cover ${objectClass}`}
          loading="eager"
          style={reduce ? undefined : { y }}
          initial={reduce ? false : { scale: 1.12, opacity: 0 }}
          animate={reduce ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </section>

      <section className="border-b border-white/10 dot-bg bg-brand-surface">
        <Container className="px-4 py-12 sm:px-6 sm:py-16">
          <header>
            <Rise immediate>
              <p className="flex items-center gap-4 font-display text-eyebrow font-bold uppercase text-brand-accent">
                <span aria-hidden className="h-px w-8 bg-brand-accent/60" />
                {eyebrow}
              </p>
            </Rise>
            <AnimatedText
              as="h1"
              immediate
              delay={0.12}
              className="mt-5 max-w-4xl font-display text-d2 font-extrabold text-white"
            >
              {title}
            </AnimatedText>
          </header>
          <Rise immediate delay={0.3}>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">{description}</p>
          </Rise>
          <Rise immediate delay={0.42}>
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          </Rise>
        </Container>
      </section>
    </>
  );
}
