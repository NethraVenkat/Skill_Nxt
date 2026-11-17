import type { Config } from "tailwindcss";

// Every colour is an RGB triplet in app/globals.css so opacity helpers like bg-coral/15 work.
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        tint: token("tint"),
        border: token("border"),
        text: {
          DEFAULT: token("text"),
          secondary: token("text-secondary"),
          muted: token("text-muted"),
        },
        primary: token("primary"),
        gold: token("gold"),
        coral: token("coral"),
        sunshine: token("sunshine"),
        mint: token("mint"),
        sky: token("sky"),
        pink: token("pink"),
        orange: token("orange"),
        teal: token("teal"),
        indigo: token("indigo"),
        violet: token("violet"),
        success: token("success"),
        warning: token("warning"),
        error: token("error"),
        insight: token("insight"),
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        12: "var(--space-12)",
        16: "var(--space-16)",
      },
      borderRadius: {
        control: "var(--radius-control)",
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
      },
      boxShadow: { card: "var(--shadow-card)" },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        cinema: ["var(--font-cinema)"],
      },
    },
  },
  plugins: [],
};

export default config;
