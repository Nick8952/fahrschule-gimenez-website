import type { Config } from "tailwindcss";

/* ============================================================================
   Fahrschule Roberto Gimenez — Design-System "Verkehrsschild"
   Warmes Signaletik-Design nach Schweizer Strassenschildern: Verbotsrot vom
   echten Logo-Ring, Warnschild-Gold, Vorschriftszeichen-Blau als knappe
   dunkle Ausnahme. Schilder-Plaketten mit hartem Versatz-Schatten statt
   weicher Blur-Schatten. Fredoka (rundlich, einladend) + Karla (Fliesstext)
   + IBM Plex Mono (Preise/Kürzel, Instrumenten-Charakter).
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
        display: ["var(--font-display)", "Arial Rounded MT Bold", "sans-serif"],
        body: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
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
        DEFAULT: "16px",
        sm: "10px",
        lg: "26px",
        pill: "999px",
      },
      boxShadow: {
        s: "3px 3px 0 rgba(32,26,18,.14)",
        m: "6px 6px 0 rgba(32,26,18,.16)",
        l: "10px 10px 0 rgba(18,60,122,.22)",
        press: "1px 1px 0 rgba(32,26,18,.14)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
