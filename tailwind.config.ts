import type { Config } from "tailwindcss";

/* ============================================================================
   Fahrschule Roberto Gimenez — Design-System "Route Stamp"
   Warmes, einladendes Hell-Design (Papierton), Signalrot aus dem echten
   Logo-Ring als Hauptakzent, Gold als Sekundärakzent, tiefes Routenblau nur
   als knappe, dunkle Ausnahme-Fläche (Footer, Stempel-Hintergrund).
   Grosstypo Bricolage Grotesque + Figtree, DM Mono für Preise/Kürzel/Badges.
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
        signal: { DEFAULT: "#C70400", 600: "#A30300", wash: "#FBEAE8" },
        gold: { DEFAULT: "#F4C300", ink: "#8A6A00", bright: "#FEE600" },
        route: { DEFAULT: "#17204D", 2: "#1F2A5E", bright: "#385BF9" },
        paper: { DEFAULT: "#FAF4E8", 2: "#F3EBDC" },
        ink: { DEFAULT: "#22190F", soft: "#6B5F52" },
        muted: { DEFAULT: "#6B5F52" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      fontSize: {
        "step--1": ["clamp(0.80rem,0.78rem + 0.10vw,0.86rem)", { lineHeight: "1.5" }],
        "step-0": ["clamp(1rem,0.97rem + 0.18vw,1.09rem)", { lineHeight: "1.6" }],
        "step-1": ["clamp(1.18rem,1.10rem + 0.38vw,1.42rem)", { lineHeight: "1.4" }],
        "step-2": ["clamp(1.5rem,1.30rem + 0.9vw,2.15rem)", { lineHeight: "1.12" }],
        "step-3": ["clamp(2.1rem,1.65rem + 2.0vw,3.4rem)", { lineHeight: "1.02" }],
        "step-4": ["clamp(2.8rem,2.0rem + 3.6vw,5.0rem)", { lineHeight: "0.98" }],
        "step-5": ["clamp(3.4rem,2.1rem + 6.0vw,7.0rem)", { lineHeight: "0.92" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        wrap: "78rem",
        eng: "44rem",
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "6px",
        lg: "18px",
        pill: "999px",
      },
      boxShadow: {
        s: "0 1px 2px rgba(34,25,15,.08), 0 2px 10px rgba(34,25,15,.06)",
        m: "0 10px 24px rgba(34,25,15,.12), 0 24px 60px rgba(34,25,15,.10)",
        l: "0 24px 60px rgba(23,32,77,.28), 0 48px 100px rgba(23,32,77,.22)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
