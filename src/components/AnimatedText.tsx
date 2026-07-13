import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useRef, type ReactNode } from "react";
import { DUR, EASE, viewport } from "../lib/motion";

/**
 * Real motion components, keyed by tag. `motion(Tag)` with a *string* is the
 * custom-component factory: it renders the element but drops every animation
 * prop, and mints a new component type each render. Look the tag up instead.
 */
const MOTION = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type Tag = keyof typeof MOTION;

type AnimatedTextProps = {
  children: string;
  /** Rendered element — h1/h2/h3/p/span/div. */
  as?: Tag;
  className?: string;
  /** Seconds to wait before the first word moves. */
  delay?: number;
  /** Per-word offset. Lower = tighter, more mechanical. */
  stagger?: number;
  /** Animate on mount rather than when scrolled into view. */
  immediate?: boolean;
};

/**
 * Headline reveal: each word sits in its own clipping box and rises out of it.
 *
 * Words — not characters. Character-by-character reads as a gimmick and wrecks
 * kerning on a heavy grotesk; word-level keeps the type intact while still
 * giving the line that "assembled" feel.
 *
 * Trigger is `useInView` + an explicit `animate` target, not `whileInView`:
 * whileInView would not apply its `initial` to these nested spans, so the words
 * sat un-transformed and nothing ever moved. Driving `animate` from a ref we own
 * is unambiguous.
 *
 * The full string stays in the DOM via aria-label, so screen readers and
 * crawlers get one sentence rather than a bag of words.
 */
export function AnimatedText({
  children,
  as = "div",
  className = "",
  delay = 0,
  stagger = 0.055,
  immediate = false,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  // Typed as a div to satisfy the motion-component union; the element is whatever
  // `as` resolves to, and useInView only needs an Element.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: viewport.margin });
  const words = children.split(" ");
  const MotionTag = MOTION[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const show = immediate || inView;

  return (
    <MotionTag ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        // The space must be its own text node BETWEEN the masks. Put it inside
        // the mask and CSS collapses it — trailing whitespace is dropped at the
        // end of an inline-block — and every word butts against the next.
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden
            // The mask. Bottom padding stops descenders (y, g, p) being clipped.
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%" }}
              animate={show ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: DUR.text, delay: delay + i * stagger, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? <span aria-hidden> </span> : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}

/**
 * Generic entrance wrapper. Children rise and resolve out of a slight blur.
 * `delay` is in seconds.
 */
export function Rise({
  children,
  className = "",
  delay = 0,
  y = 24,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: viewport.margin });

  if (reduce) return <div className={className}>{children}</div>;

  const show = immediate || inView;
  const hidden = { opacity: 0, y, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={show ? shown : hidden}
      transition={{ duration: DUR.base, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
