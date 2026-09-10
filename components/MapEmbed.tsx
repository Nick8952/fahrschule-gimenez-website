import Image from "next/image";
import { getSite } from "@/lib/data";
import { asset } from "@/lib/site";

/**
 * Standortkarte als statisches Bild statt als OpenStreetMap-Iframe.
 *
 * Der offizielle OSM-Einbettungs-Iframe (`export/embed.html`) rendert an
 * dieser Stelle im Seitenlayout zuverlaessig kaputt: die Karte darin misst
 * sich auf eine falsche Breite ein und fuellt nur rund ein Drittel des
 * Rahmens, der Rest bleibt dauerhaft weiss. Reproduziert im echten,
 * sichtbaren Chrome (nicht nur headless) und unabhaengig davon, wann der
 * Iframe eingehaengt wird.
 *
 * Das Bild ist einmalig aus OSM-Kacheln zusammengesetzt (z15, Marker in der
 * Markenfarbe) und liegt als `public/img/standort.jpg` im Repo. Vorteile
 * ausser Verlaesslichkeit: kein Drittanbieter-Aufruf beim Seitenbesuch —
 * also auch nichts, was in der Datenschutzerklaerung nachgezogen werden
 * muesste — und keine Ladezeit fuer fremdes JavaScript.
 *
 * Wenn sich die Adresse aendert, muss das Bild neu erzeugt werden; die
 * Adresse selbst kommt weiterhin aus site.json und steht als Text darunter.
 */
export default async function MapEmbed() {
  const site = await getSite();
  const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    site.mapQuery,
  )}`;

  return (
    <div className="overflow-hidden rounded-lg border border-ink/15">
      <a
        href={routeUrl}
        target="_blank"
        rel="noopener"
        className="group relative block h-[280px] w-full bg-paper-2"
        aria-label={`Route nach ${site.address.street}, ${site.address.zip} ${site.address.city} öffnen`}
      >
        <Image
          src={asset("/img/standort.jpg")}
          alt={`Kartenausschnitt: ${site.address.street} in ${site.address.city}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-0 right-0 bg-white/85 px-2 py-1 font-mono text-[0.6rem] text-ink-soft">
          © OpenStreetMap-Mitwirkende
        </span>
      </a>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 bg-white px-4 py-3.5 text-[0.9rem]">
        <strong className="font-display font-semibold text-ink">
          {site.address.street}, {site.address.zip} {site.address.city}
        </strong>
        <a
          href={routeUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[40px] items-center font-mono text-[0.76rem] uppercase tracking-[0.12em] text-signal hover:text-signal-600"
        >
          Route öffnen →
        </a>
      </div>
    </div>
  );
}
