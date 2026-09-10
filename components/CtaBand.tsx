import Link from "next/link";
import { site } from "@/lib/data";
import Reveal from "./Reveal";
import Icon from "./Icon";

/**
 * Das Abschluss-Band vor der Fusszeile, auf jeder Seite genau einmal.
 * Eine Stelle statt fuenf Kopien, damit Farbe/Spacing/Struktur nur einmal
 * gepflegt werden - Titel/Text/Button-Label bleiben pro Seite individuell.
 *
 * Dunkles Graphitfeld statt roter Flaeche: Rot bleibt so die Farbe der
 * Handlung (Knopf), nicht die des Hintergrunds - und weisser Text auf
 * Graphit haelt 8:1 Kontrast statt der 4.4:1 auf Signalrot.
 */
export default function CtaBand({
  title,
  body,
  actionLabel,
  className = "",
}: {
  title: string;
  body: string;
  actionLabel: string;
  className?: string;
}) {
  return (
    <section className={`section block-dark ${className}`}>
      <div className="wrap">
        <Reveal>
          <div className="h-px bg-white/20" />
          <div className="grid gap-x-12 gap-y-8 pt-9 md:grid-cols-[1fr_0.9fr] md:items-end">
            <h2 className="max-w-[16ch] text-step-3 font-bold text-white">{title}</h2>
            <div>
              <p className="max-w-[44ch] text-white/80">{body}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`tel:${site.phone.tel}`} className="btn btn-signal">
                  <Icon name="phone" className="h-4 w-4" /> {site.phone.display}
                </a>
                <Link href="/kontakt" className="btn btn-on-dark">
                  {actionLabel}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
