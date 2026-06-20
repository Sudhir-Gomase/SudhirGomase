import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "var(--color-canvas)",
          muted: "var(--color-canvas-muted)",
          soft: "var(--color-canvas-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          overlay: "var(--color-surface-overlay)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          heading: "var(--color-ink-heading)",
          muted: "var(--color-ink-muted)",
          faint: "var(--color-ink-faint)",
        },
        brand: {
          DEFAULT: "var(--color-brand)",
          dark: "var(--color-brand-dark)",
          light: "var(--color-brand-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        navy: {
          DEFAULT: "#12121a",
          dark: "#050508",
        },
        line: "var(--color-line)",
      },
      fontFamily: {
        display: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-hero": ["clamp(2.5rem,11vw,6.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.25rem,6vw,4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(1.75rem,4.5vw,2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        marquee: "marquee 28s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "hero-mesh": "var(--hero-mesh)",
        "brand-accent": "linear-gradient(90deg, var(--color-brand-dark), var(--color-brand-light))",
        "premium-gradient": "linear-gradient(135deg, var(--color-brand) 0%, var(--color-accent) 100%)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        elevated: "var(--shadow-elevated)",
        glow: "0 0 0 1px rgba(184,146,63,0.22), 0 8px 40px rgba(184,146,63,0.12)",
        "glow-sm": "var(--shadow-glow-sm)",
      },
    },
  },
  plugins: [],
};

export default config;
