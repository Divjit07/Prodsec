/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "var(--color-primary)",
          accent: "var(--color-primary)",
          ink: "var(--color-on-light)",
          navy: {
            950: "var(--color-navy-950)",
            900: "var(--color-navy-900)",
            800: "var(--color-navy-800)",
            700: "var(--color-navy-700)",
          },
          dark: "var(--color-dark)",
          surface: "var(--color-surface)",
          "surface-2": "var(--color-surface-2)",
          text: "var(--color-text)",
          muted: "var(--color-text-muted)",
          border: "var(--color-border)",
          success: "var(--color-success)",
          danger: "var(--color-danger)",
        },
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "system-ui", "sans-serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        lift: "0 18px 50px rgba(5, 13, 28, 0.55)",
        card: "0 0 0 1px rgba(255,255,255,0.08), 0 14px 40px rgba(5, 13, 28, 0.45)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(10,26,50,0.15), rgba(10,26,50,0.92)), radial-gradient(circle at 18% 18%, rgba(201,174,106,0.08), transparent 42%), radial-gradient(circle at 82% 8%, rgba(255,255,255,0.06), transparent 38%)",
      },
    },
  },
  plugins: [],
};
