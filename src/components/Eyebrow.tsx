import type { ReactNode } from "react";

/** Section kicker: an accent tick, then letterspaced caps. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center gap-4 font-display text-eyebrow font-bold uppercase text-brand-accent ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-brand-accent/60" />
      {children}
    </p>
  );
}
