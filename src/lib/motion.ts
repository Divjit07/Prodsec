import type { Transition, Variants } from "framer-motion";

/**
 * One motion language for the whole site.
 *
 * The feel comes from a long expo-out curve: fast to start, then a long settle.
 * Nothing bounces, nothing springs — springs read as playful, and this is a
 * security company. Distances stay small (16–28px); the easing does the work.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 0.9,
  /** Line-mask reveals want the longest settle. */
  text: 1.0,
} as const;

export const transition = (duration: number = DUR.base, delay: number = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Standard entrance: rise + fade, with a touch of blur so it resolves into focus. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: transition(DUR.base) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition(DUR.base) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: transition(DUR.slow) },
};

/** Parent that walks its children in. Pair with `fadeUp` on each child. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** A single line rising out of its mask. The parent must clip overflow. */
export const lineRise: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: transition(DUR.text) },
};

/**
 * Shared viewport config — fire once, just after the element's top edge crosses
 * into view.
 *
 * `margin` must be in px. Percentage values are accepted by IntersectionObserver
 * but framer-motion does not resolve them, and the observer ends up treating the
 * element as always-visible — so every reveal fires at page load and has already
 * finished by the time you scroll to it. Which looks exactly like no animation.
 */
export const viewport = { once: true, margin: "0px 0px -120px 0px" } as const;
