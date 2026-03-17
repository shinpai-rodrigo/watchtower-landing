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
        background: "#0B0B12",
        surface: "#161622",
        primary: "#6B2BFF",
        secondary: "#2E8BFF",
        accent: "#8F5CFF",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B7B7C9",
        alert: "#FF6A3D",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #6B2BFF, #2E8BFF)",
        "brand-gradient-diagonal": "linear-gradient(135deg, #6B2BFF, #2E8BFF)",
        "hero-glow": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,43,255,0.25) 0%, transparent 70%)",
        "card-glow": "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(107,43,255,0.08) 0%, transparent 60%)",
        "cta-bg": "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(107,43,255,0.3) 0%, rgba(46,139,255,0.15) 50%, transparent 80%)",
      },
      boxShadow: {
        "glow-primary": "0 0 40px rgba(107,43,255,0.4)",
        "glow-secondary": "0 0 40px rgba(46,139,255,0.3)",
        "glow-sm": "0 0 20px rgba(107,43,255,0.25)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 12s linear infinite",
        "radar-scan": "radarScan 3s linear infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        radarScan: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
