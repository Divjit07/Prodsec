import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DUR, EASE, viewport } from "../lib/motion";

/**
 * The fan has to narrow on small screens.
 *
 * Offsets are a percentage of each card's own width, and the cards only shrink a
 * little on mobile — so the full desktop spread threw the outer cards clean off
 * a 390px viewport. Scale the whole fan instead of the individual cards.
 */
function useSpreadScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const sync = () => setScale(lg.matches ? 1 : sm.matches ? 0.68 : 0.38);
    sync();
    sm.addEventListener("change", sync);
    lg.addEventListener("change", sync);
    return () => {
      sm.removeEventListener("change", sync);
      lg.removeEventListener("change", sync);
    };
  }, []);

  return scale;
}

export type SpreadCard = {
  src: string;
  alt: string;
  /** Horizontal offset from centre, in percent of the card's own width. */
  x: number;
  rotate: number;
  /** Higher sits in front. The featured card should be highest. */
  z: number;
  /** Featured card is drawn larger. */
  scale?: number;
};

/**
 * A deck that starts squared-up and fans out as it scrolls into view.
 *
 * The whole point is the transition from stack to spread: every card begins at
 * the centre, rotation zero, and travels to its own offset. Fanning them out
 * statically would just be a diagonal row of photos.
 *
 * Cards animate back-to-front (the featured one lands last), so the eye follows
 * the spread outward and settles on the card that matters.
 */
export function CardSpread({ cards, className = "" }: { cards: SpreadCard[]; className?: string }) {
  const reduce = useReducedMotion();
  const spread = useSpreadScale();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: viewport.margin });

  // Reduced motion: a plain row, no stack, no travel.
  if (reduce) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {cards.map((c) => (
          <img
            key={c.src}
            src={c.src}
            alt={c.alt}
            className="h-64 w-48 rounded-xl object-cover shadow-lift ring-1 ring-white/10"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative flex items-center justify-center ${className}`}>
      {cards.map((c, i) => {
        const featured = (c.scale ?? 1) > 1;
        return (
          <motion.div
            key={c.src}
            className="group absolute will-change-transform"
            style={{ zIndex: c.z }}
            initial={{ x: 0, rotate: 0, y: 28, opacity: 0, scale: 0.92 }}
            animate={
              inView
                ? {
                    x: `${c.x * spread}%`,
                    rotate: c.rotate * spread,
                    y: 0,
                    opacity: 1,
                    scale: c.scale ?? 1,
                  }
                : { x: 0, rotate: 0, y: 28, opacity: 0, scale: 0.92 }
            }
            transition={{
              duration: DUR.slow,
              // Outermost cards leave the stack first; the featured card lands last.
              delay: 0.1 + Math.abs(cards.length - 1 - i) * 0.08,
              ease: EASE,
            }}
            whileHover={{ y: -14, scale: (c.scale ?? 1) * 1.04, zIndex: 50, transition: { duration: 0.4, ease: EASE } }}
          >
            <img
              src={c.src}
              alt={c.alt}
              loading="lazy"
              className={`w-40 rounded-xl object-cover shadow-lift ring-1 transition-shadow duration-500 sm:w-48 lg:w-56 ${
                featured
                  ? "aspect-[3/4] ring-brand-accent/40 lg:w-64"
                  : "aspect-[3/4] ring-white/10 group-hover:ring-white/25"
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
