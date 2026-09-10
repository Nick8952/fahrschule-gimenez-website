import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Unterseiten-Kopf: dunkles Signaletik-Feld, linksbündig, ohne Foto.
 *
 * Das Hero-Foto bleibt bewusst der Startseite vorbehalten — auf jeder
 * Unterseite wiederholt wäre es Tapete statt Aussage, und weisser Text auf
 * einem wechselnd hellen Foto war genau die Stelle, an der der Kontrast
 * gekippt ist. Auf dem Graphitfeld ist er fix bei 8:1 und darüber.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumb?: string;
}) {
  return (
    <section className="block-dark">
      <div className="wrap pb-14 pt-10 sm:pb-20 sm:pt-14">
        <Reveal>
          <nav
            className="flex flex-wrap items-center gap-2 border-b border-white/15 pb-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/65"
            aria-label="Brotkrumen"
          >
            <Link href="/" className="-my-2 inline-block py-2 transition-colors hover:text-amber">
              Start
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">{crumb ?? title}</span>
          </nav>

          <div className="grid gap-x-10 gap-y-5 pt-10 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              {eyebrow && <p className="eyebrow eyebrow-on-dark mb-5">{eyebrow}</p>}
              <h1 className="max-w-[15ch] text-step-4 font-bold text-white">{title}</h1>
            </div>
            {lead && <p className="max-w-[48ch] text-white/80 md:pb-1">{lead}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
