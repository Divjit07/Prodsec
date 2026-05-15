import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, value, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-white sm:text-4xl">
        {display}
        {suffix}
      </div>
      <div className="mx-auto mt-2 h-px w-10 bg-brand-yellow/35" aria-hidden />
      <p className="mt-3 text-sm text-brand-muted">{label}</p>
    </div>
  );
}
