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
 * Split hero: copy left, photography right on desktop.
 * Mobile stacks photo first, then copy — so the right side never reads empty.
 */
export function ImageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  objectClass = "object-[50%_35%]",
  actions,
  minHeightClass = "min-h-[min(42svh,320px)] sm:min-h-[min(48svh,380px)] lg:min-h-[min(72svh,640px)]",
}: ImageHeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="border-b border-white/10 dot-bg bg-brand-surface">
      {/* Vertical padding on every breakpoint. Without it the photo column ran to
          the top of the page and slid under the translucent sticky header, which
          smeared the header's blur across the image. */}
      <Container className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
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
              className="mt-6 max-w-xl text-balance font-display text-[clamp(1.875rem,1.15rem+2.3vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white"
            >
              {title}
            </AnimatedText>
            <Rise immediate delay={0.28}>
              <p className="mt-6 max-w-prose text-sm leading-relaxed text-brand-muted sm:text-base">
                {description}
              </p>
            </Rise>
            <Rise immediate delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            </Rise>
          </div>

          {/* A framed panel, not a full bleed — it reads as a deliberate plate
              rather than a photo escaping the layout. */}
          <div
            className={`relative overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/[0.08] lg:col-span-6 ${minHeightClass}`}
          >
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className={`absolute inset-0 h-full w-full object-cover ${objectClass}`}
              loading="eager"
              style={reduce ? undefined : { y }}
              initial={reduce ? false : { scale: 1.1, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy-950/55 via-transparent to-brand-navy-950/10"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
