import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { DUR, EASE, viewport } from "../lib/motion";

/**
 * Scroll-triggered entrance, used across every page.
 *
 * Driven by useInView + `animate` rather than `whileInView` — see AnimatedText
 * for the why. It now draws its curve from the shared motion language, so pages
 * that were never rewritten still inherit the same feel.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  ...rest
}: React.ComponentProps<typeof motion.div> & { delay?: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: viewport.margin });

  // `{}` as the hidden target makes framer skip the element and never write
  // `initial`, so it renders fully visible and never animates. Give it a real one.
  const hidden = { opacity: 0, y: 24, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : hidden}
      animate={reduce || inView ? shown : hidden}
      transition={{ duration: DUR.base, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
