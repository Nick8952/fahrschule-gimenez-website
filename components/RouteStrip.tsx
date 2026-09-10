import Link from "next/link";
import Icon, { type IconKey } from "./Icon";
import type { Course } from "@/lib/data";

/**
 * Das Kursangebot als Signaletik-Raster: gleich grosse Zellen, durch
 * Haarlinien getrennt (gap-px auf getönter Fläche). Kein Karussell — auf dem
 * Handy stehen zwei Zellen nebeneinander, auf dem Desktop vier, damit nie eine
 * Kachel angeschnitten ist.
 *
 * Bewusst ohne 01/02/03-Nummerierung: das Kursangebot ist keine Reihenfolge
 * (WAB und Moto stehen neben dem Weg zum Führerschein, nicht darin). Die
 * echte Reihenfolge zeigt stattdessen RouteSteps auf /ablauf.
 *
 * Eine Datenquelle (data/courses.json) speist Startseite und Angebote-Seite.
 */
export default function RouteStrip({
  stops,
  linkTo,
  allHref,
}: {
  stops: Course[];
  linkTo?: (key: string) => string;
  allHref?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 sm:grid-cols-4">
      {stops.map((s) => {
        const inner = (
          <>
            <Icon name={s.icon as IconKey} className="h-6 w-6 text-signal" />
            <span className="mt-4 font-display text-[1rem] font-bold leading-tight">
              {s.title}
            </span>
            <span className="mt-auto pt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-soft">
              {s.tag}
            </span>
          </>
        );
        const cls =
          "flex min-h-[9rem] flex-col bg-paper p-5 transition-colors hover:bg-paper-2";
        return linkTo ? (
          <Link key={s.key} href={linkTo(s.key)} className={cls}>
            {inner}
          </Link>
        ) : (
          <div key={s.key} className={cls}>
            {inner}
          </div>
        );
      })}

      {/* Füllt das Raster auf ein volles Vielfaches auf und ist gleichzeitig
          der Weiterführungs-Link — statt einer leeren Zelle. */}
      {allHref && (
        <Link
          href={allHref}
          className="flex min-h-[9rem] flex-col justify-between bg-signal p-5 text-white transition-colors hover:bg-signal-600"
        >
          <Icon name="arrow" className="h-6 w-6" />
          <span className="font-display text-[1rem] font-bold leading-tight">
            Alle Angebote im Detail
          </span>
        </Link>
      )}
    </div>
  );
}
