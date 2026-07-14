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
      <Container className="px-4 py-10 sm:px-6 lg:py-0">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-center lg:col-span-5 lg:py-20 lg:pr-10 xl:pr-14">
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
              className="mt-5 font-display text-d2 font-extrabold text-white"
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

          <div className={`relative overflow-hidden rounded-2xl lg:col-span-7 lg:rounded-none ${minHeightClass}`}>
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
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-surface/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-surface lg:from-[0%] lg:via-brand-surface/20 lg:via-8% lg:to-transparent"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
