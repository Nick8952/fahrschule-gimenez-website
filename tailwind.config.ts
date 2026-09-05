import type { Config } from "tailwindcss";

/* ============================================================================
   Fahrschule Roberto Gimenez — Design-System "Verkehrsschild" (seriös)
   Verbotsrot vom echten Logo-Ring, Warnschild-Gold, Vorschriftszeichen-Blau
   als knappe dunkle Ausnahme. Zurückhaltende, institutionelle Umsetzung:
   weiche, dezente Schatten statt Comic-Versatz-Schatten, moderate Rundung
   statt verspielter Bubble-Formen. EINE durchgängige Schriftfamilie
   (IBM Plex Sans) für Überschriften und Fliesstext, IBM Plex Mono für
   Preise/Kürzel — liest seriös, institutionell, vertrauenswürdig.
   ========================================================================== */

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        signal: { DEFAULT: "#D6001C", 600: "#A50016", wash: "#FCE4E6" },
        gold: { DEFAULT: "#FFC629", ink: "#7A5900", bright: "#FFE066", wash: "#FFF2C4" },
        route: { DEFAULT: "#123C7A", 2: "#17529E", bright: "#3B82F6", wash: "#E6EDF7" },
        paper: { DEFAULT: "#FFF7E8", 2: "#FCEFD2" },
        ink: { DEFAULT: "#201A12", soft: "#6E6152" },
        muted: { DEFAULT: "#6E6152" },
      },
      fontFamily: {
        display: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      fontSize: {
        "step--1": ["clamp(0.82rem,0.80rem + 0.10vw,0.88rem)", { lineHeight: "1.5" }],
        "step-0": ["clamp(1.02rem,0.99rem + 0.16vw,1.1rem)", { lineHeight: "1.62" }],
        "step-1": ["clamp(1.22rem,1.14rem + 0.4vw,1.5rem)", { lineHeight: "1.32" }],
        "step-2": ["clamp(1.6rem,1.4rem + 1.0vw,2.3rem)", { lineHeight: "1.1" }],
        "step-3": ["clamp(2.15rem,1.7rem + 2.1vw,3.3rem)", { lineHeight: "1.02" }],
        "step-4": ["clamp(2.7rem,1.95rem + 3.6vw,4.7rem)", { lineHeight: "0.98" }],
        "step-5": ["clamp(3.2rem,2.0rem + 5.6vw,6.2rem)", { lineHeight: "0.96" }],
      },
      maxWidth: {
        wrap: "76rem",
        eng: "44rem",
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "6px",
        lg: "16px",
        pill: "999px",
      },
      boxShadow: {
        s: "0 1px 2px rgba(32,26,18,.06), 0 2px 10px rgba(32,26,18,.06)",
        m: "0 8px 20px rgba(32,26,18,.09), 0 20px 45px rgba(32,26,18,.07)",
        l: "0 20px 50px rgba(18,60,122,.16), 0 40px 90px rgba(18,60,122,.12)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
