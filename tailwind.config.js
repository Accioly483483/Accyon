/**
 * Tokens do Accyon Brand Book (LPs). O painel admin recebe seu próprio preset
 * na Fase 8 (design system v4, dual-mode OKLCH).
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
        },
        sinal: {
          DEFAULT: "var(--sinal)",
          hover: "var(--sinal-hover)",
        },
        paper: "var(--paper)",
        line: "var(--line)",
        "line-2": "var(--line-2)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      fontSize: {
        // escala modular Perfect Fourth 1.333 · base 18px · valores do Brand Book
        display: ["clamp(3.25rem, 8vw, 6.25rem)", { lineHeight: "0.96", letterSpacing: "-0.04em" }],
        titulo: ["clamp(1.625rem, 3.2vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        subtitulo: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        corpo: ["1.125rem", { lineHeight: "1.62" }],
        legenda: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.22em" }],
      },
      maxWidth: {
        content: "var(--maxw)",
        measure: "68ch",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        drawer: "var(--ease-drawer)",
        "in-out": "var(--ease-in-out)",
      },
      transitionDuration: {
        press: "130ms",
        reveal: "700ms",
      },
      spacing: {
        section: "clamp(2.75rem, 5vw, 4.5rem)", // respiro macro entre seções
      },
      keyframes: {
        "step-in": {
          from: { opacity: "0", transform: "translateY(20px)", filter: "blur(8px)" },
          to: { opacity: "1", transform: "none", filter: "blur(0)" },
        },
      },
      animation: {
        "step-in": "step-in 500ms var(--ease-out) both",
      },
    },
  },
  plugins: [],
};
