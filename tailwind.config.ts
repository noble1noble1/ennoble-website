import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          secondary: "#111111",
          tertiary: "#1A1A1A",
        },
        text: {
          primary: "#FAFAFA",
          secondary: "#A3A3A3",
          tertiary: "#666666",
        },
        accent: {
          amber: "#F59E0B",
          "amber-light": "#FCD34D",
          "amber-dim": "rgba(245, 158, 11, 0.15)",
          red: "#EF4444",
        },
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        jetbrains: ["var(--font-jetbrains)", "monospace"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        meshFloat: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(-10px, -15px, 0) scale(1.02)" },
          "66%": { transform: "translate3d(8px, 10px, 0) scale(0.98)" },
        },
        statGlow: {
          "0%": { textShadow: "none" },
          "50%": { textShadow: "0 0 25px rgba(245, 158, 11, 0.5)" },
          "100%": { textShadow: "none" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "mesh-float": "meshFloat 12s ease-in-out infinite",
        "stat-glow": "statGlow 1.5s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
