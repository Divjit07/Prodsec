import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DUR, EASE, viewport } from "../lib/motion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  /** Render the value as-is (a year, a ratio) instead of counting up to it. */
  plain?: boolean;
  /** Entrance offset, so a row of counters walks in. */
  delay?: number;
};

/** One cell of the stats band. Renders <dd>/<dt>, so it must sit inside a <dl>. */
export function StatCounter({ value, suffix = "", label, plain = false, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const animated = !plain && !reduce;
  const [display, setDisplay] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated || !inView) return;
    // Hold for the entrance, then run the count so the two do not fight.
    const ctrl = animate(0, value, {
      duration: 1.4,
      delay: delay + 0.15,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [animated, inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="dot-bg bg-ink-950 px-5 py-12 text-center lg:py-16"
      initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewport}
      transition={{ duration: DUR.base, ease: EASE, delay }}
    >
      <dd className="font-display text-5xl font-extrabold tabular-nums tracking-[-0.03em] text-white lg:text-6xl">
        {display}
        {suffix}
      </dd>
      <dt className="mt-4 font-display text-[0.625rem] font-bold uppercase tracking-[0.2em] text-brand-muted">
        {label}
      </dt>
    </motion.div>
  );
}
