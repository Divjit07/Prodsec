import { Children, cloneElement, isValidElement, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { DUR, EASE, viewport } from "../lib/motion";

const MOTION = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  section: motion.section,
} as const;

type Tag = keyof typeof MOTION;

/**
 * Grid/list container that walks its children in one after another.
 *
 * The delay is injected into each <StaggerItem> by index rather than inherited
 * as a parent variant — same reason as AnimatedText: explicit props always
 * resolve, inherited variants were not.
 */
export function Stagger({
  children,
  className = "",
  as = "div",
  gap = 0.07,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Seconds between each child. */
  gap?: number;
  delay?: number;
}) {
  const Plain = as;
  const items = Children.toArray(children).map((child, i) =>
    isValidElement<{ delay?: number }>(child) ? cloneElement(child, { delay: delay + i * gap }) : child,
  );

  return <Plain className={className}>{items}</Plain>;
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Set by <Stagger>. */
  delay?: number;
}) {
  const reduce = useReducedMotion();
  // Same reason as AnimatedText: drive `animate` from a ref we own rather than
  // relying on whileInView, which was not applying its initial state here.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: viewport.margin });
  // The map's union makes `ref` an impossible intersection of element types.
  // The runtime component is correct; only the type needs collapsing.
  const MotionTag = MOTION[as] as typeof motion.div;

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  // The hidden branch must be a real target, not `{}` — an empty animate target
  // makes framer skip the element entirely, so `initial` is never written and
  // the item just sits there fully visible.
  const hidden = { opacity: 0, y: 24, filter: "blur(6px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration: DUR.base, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
