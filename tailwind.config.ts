import type { Config } from "tailwindcss";

/* ============================================================================
   Fahrschule Roberto Gimenez — Design-System "Zürcher Signaletik"

   Gebaut wie ein Schweizer Verkehrssicherheits-Informationssystem: reines
   Weiss als Grundfläche, strenges linksbündiges Raster, Haarlinien statt
   Rahmen, Mono für Mikro-Labels und Zahlen, EIN grosses Foto als Bildebene.
   Die Farbe kommt aus dem echten Logo (Signalrot + Warngold), nicht aus
   einer Mode-Palette.

   Die einzige "moderne" Geste: Informationstafeln aus Milchglas, die über
   der Bildebene liegen (siehe .tafel in globals.css) — bewusst dosiert,
   nicht als Deko auf jeder Karte.
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
        /* Grundflächen */
        paper: { DEFAULT: "#FFFFFF", 2: "#F4F3F1" },
        /* Dunkle Flächen (Hero-Schleier, Fusszeile, CTA) */
        graphite: { DEFAULT: "#1E1B19", 2: "#141210" },
        /* Text */
        ink: { DEFAULT: "#141210", soft: "#57514C" },
        muted: { DEFAULT: "#57514C" },
        /* Akzente aus dem Logo */
        signal: { DEFAULT: "#D6001C", 600: "#A80016", wash: "#FDEBED" },
        amber: { DEFAULT: "#F5A623" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Archivo", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      fontSize: {
        "step--1": ["clamp(0.84rem,0.82rem + 0.10vw,0.9rem)", { lineHeight: "1.5" }],
        "step-0": ["clamp(1.02rem,0.99rem + 0.16vw,1.1rem)", { lineHeight: "1.62" }],
        "step-1": ["clamp(1.22rem,1.14rem + 0.4vw,1.5rem)", { lineHeight: "1.32" }],
        "step-2": ["clamp(1.6rem,1.4rem + 1.0vw,2.3rem)", { lineHeight: "1.1" }],
        "step-3": ["clamp(2.15rem,1.7rem + 2.1vw,3.3rem)", { lineHeight: "1.02" }],
        "step-4": ["clamp(2.7rem,1.95rem + 3.6vw,4.7rem)", { lineHeight: "0.98" }],
        "step-5": ["clamp(3.2rem,2.0rem + 5.6vw,6.2rem)", { lineHeight: "0.94" }],
      },
      maxWidth: {
        wrap: "78rem",
        eng: "44rem",
      },
      borderRadius: {
        /* Signaletik ist rechteckig — Rundung nur, wo eine Fläche sonst
           hart auf das Foto knallt. */
        DEFAULT: "4px",
        sm: "2px",
        lg: "8px",
        pill: "999px",
      },
      boxShadow: {
        s: "0 1px 2px rgba(20,18,16,.05)",
        m: "0 4px 12px rgba(20,18,16,.07), 0 12px 32px rgba(20,18,16,.06)",
        l: "0 24px 60px rgba(20,18,16,.28)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
