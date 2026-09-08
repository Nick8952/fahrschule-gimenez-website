import Link from "next/link";
import { site } from "@/lib/data";
import Reveal from "./Reveal";

/**
 * Das rote Abschluss-CTA-Band, das jede Seite vor der Fusszeile zeigt.
 * Eine Stelle statt fuenf Kopien, damit Farbe/Spacing/Struktur nur einmal
 * gepflegt werden - Titel/Text/Button-Label bleiben pro Seite individuell.
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
    <section className={`section block-light ${className}`}>
      <div className="wrap">
        <Reveal className="card !bg-signal !border-none !p-10 text-center text-white sm:!p-14">
          <h2 className="mx-auto max-w-[22ch] text-step-3 font-extrabold">{title}</h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-white/85">{body}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`tel:${site.phone.tel}`} className="btn bg-white !text-signal">
              {site.phone.display}
            </a>
            <Link href="/kontakt" className="btn !border-white !bg-transparent !text-white">
              {actionLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
