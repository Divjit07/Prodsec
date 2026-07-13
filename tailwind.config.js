/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* `<alpha-value>` is what makes `bg-ink-950/45` and `via-ink-950/90` resolve.
           Without it Tailwind cannot compose an alpha and drops the utility entirely. */
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          850: "rgb(var(--ink-850) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        brand: {
          accent: "rgb(var(--accent) / <alpha-value>)",
          text2: "rgb(var(--text-2) / <alpha-value>)",

          /* Legacy token names, remapped onto the new palette. Pages that have not
             been rebuilt yet keep rendering, and inherit the new colours for free. */
          text: "rgb(var(--text) / <alpha-value>)",
          muted: "rgb(var(--muted) / <alpha-value>)",
          border: "var(--line)",
          yellow: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--ink-950) / <alpha-value>)",
          dark: "rgb(var(--ink-950) / <alpha-value>)",
          surface: "rgb(var(--ink-850) / <alpha-value>)",
          "surface-2": "rgb(var(--ink-800) / <alpha-value>)",
          navy: {
            950: "rgb(var(--ink-950) / <alpha-value>)",
            900: "rgb(var(--ink-900) / <alpha-value>)",
            800: "rgb(var(--ink-800) / <alpha-value>)",
            700: "rgb(var(--ink-700) / <alpha-value>)",
          },
          success: "rgb(var(--success) / <alpha-value>)",
          danger: "rgb(var(--danger) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Titles land through weight + scale + tight tracking. A heavy grotesk
           tightens up as it grows; that is what makes it read as expensive. */
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.2em" }],
        d1: ["clamp(2.75rem, 1.45rem + 5.6vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        d2: ["clamp(2rem, 1.35rem + 3vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        d3: ["clamp(1.25rem, 1.1rem + 1vw, 1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        /* All-caps, as used on the nav and captions. */
        caps: ["0.75rem", { lineHeight: "1", letterSpacing: "0.12em" }],
        lede: ["clamp(1rem, 0.95rem + 0.35vw, 1.1875rem)", { lineHeight: "1.65" }],
      },
      maxWidth: {
        prose: "62ch",
      },
      boxShadow: {
        lift: "0 24px 60px -20px rgba(0, 0, 0, 0.7)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 18px 40px -24px rgba(0,0,0,0.8)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
