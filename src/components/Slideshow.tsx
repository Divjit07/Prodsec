import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE } from "../lib/motion";

/**
 * Every image in `src/assets/gallery/` becomes a slide, sorted by filename.
 *
 * Drop a file in that folder and it appears — no code change. Vite hashes and
 * fingerprints them at build time, which `public/` would not do. Prefix names
 * with a number (01-, 02-, …) to control the running order.
 */
const GALLERY = Object.entries(
  import.meta.glob<string>("../assets/gallery/*.{jpg,jpeg,png,webp,avif}", {
    eager: true,
    import: "default",
    query: "?url",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const SLIDE_MS = 5000;

type SlideshowProps = {
  className?: string;
  /** Describes the set as a whole — the slides are decorative individually. */
  alt: string;
  /** Overlay gradient sits above the image, below the indicators. */
  overlayClassName?: string;
};

export function Slideshow({ className = "", alt, overlayClassName }: SlideshowProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = GALLERY.length;
  const advance = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Hold the rotation while the tab is hidden or the panel is off-screen — a
  // slideshow nobody is looking at is just wasted decode work and battery.
  useEffect(() => {
    if (reduce || count < 2 || paused) return;

    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const id = window.setInterval(advance, SLIDE_MS);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [advance, count, paused, reduce]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Warm the next frame so the crossfade never lands on an undecoded image.
  useEffect(() => {
    if (count < 2) return;
    const next = new Image();
    next.src = GALLERY[(index + 1) % count];
  }, [index, count]);

  if (count === 0) return null;

  // Reduced motion (or a single image): show it, hold it, no cycling.
  if (reduce || count === 1) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        <img src={GALLERY[0]} alt={alt} className="absolute inset-0 h-full w-full object-cover object-[50%_26%]" />
        {overlayClassName ? <div aria-hidden className={`pointer-events-none absolute inset-0 ${overlayClassName}`} /> : null}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="img"
      aria-label={alt}
    >
      <AnimatePresence initial={false}>
        <motion.img
          // Keying on the index is what makes AnimatePresence crossfade: the
          // outgoing image stays mounted and fades while the new one fades up.
          key={index}
          src={GALLERY[index]}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[50%_26%] will-change-transform"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{
            // Long fade, and a slow push in across the whole hold — the drift is
            // what stops a still photo from feeling like a dead rectangle.
            opacity: { duration: 1.2, ease: EASE },
            scale: { duration: SLIDE_MS / 1000 + 1.4, ease: "linear" },
          }}
        />
      </AnimatePresence>

      {overlayClassName ? <div aria-hidden className={`pointer-events-none absolute inset-0 ${overlayClassName}`} /> : null}

      {/* Indicators double as a progress read-out for the current slide. */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-1.5 sm:bottom-5 sm:left-5 sm:right-5">
        {GALLERY.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="group/bar relative h-0.5 flex-1 overflow-hidden bg-white/25 transition-colors hover:bg-white/40"
            aria-label={`Show image ${i + 1} of ${count}`}
            aria-current={i === index}
          >
            {i === index ? (
              <motion.span
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
