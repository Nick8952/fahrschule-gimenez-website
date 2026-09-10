import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/data";
import { absUrl } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { DrivingSchoolJsonLd } from "@/components/JsonLd";
import "./globals.css";

// Archivo für Überschriften: eine leicht quadratische Grotesk mit
// Beschilderungs-Charakter — passt zur Signaletik-Idee und ist deutlich
// eigenständiger als die üblichen Verdächtigen. IBM Plex Sans bleibt für
// den Fliesstext (humanistisch, ruhig, gut lesbar in langen Absätzen).
const display = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absUrl("/")),
  title: {
    default: `${site.name} – Autoescola in Zürich`,
    template: `%s`,
  },
  description: site.blurb,
  applicationName: site.name,
  authors: [{ name: `${site.name} – ${site.owner}` }],
  robots: site.demo
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: site.name,
  },
  other: { "theme-color": site.themeColor },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-body text-step-0">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <DrivingSchoolJsonLd />
        <SiteHeader />
        <main id="inhalt">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
