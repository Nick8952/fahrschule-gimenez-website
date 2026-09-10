import Reveal from "./Reveal";
import Icon from "./Icon";

/**
 * Abschnittskopf im Signaletik-Raster: Haarlinie über der Sektion, Titel
 * links, Erklärtext in einer zweiten Spalte rechts. Bewusst NICHT zentriert —
 * die durchgehende linke Kante ist das, was die Seite zusammenhält.
 */
export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-9 sm:mb-10">
      <div className="rule mb-6" />
      <div className="grid gap-x-10 gap-y-4 md:grid-cols-[1fr_0.85fr] md:items-end">
        <div>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="max-w-[16ch] text-step-3 font-bold">{title}</h2>
        </div>
        {intro && <p className="max-w-[46ch] text-ink-soft md:pb-1">{intro}</p>}
      </div>
    </Reveal>
  );
}

/**
 * Info-Panel mit eigener Ueberschrift. Ueberschriftenebene ist h2, weil das
 * Panel direkt unter der Seiten-h1 steht — mit h3 entstand ein Sprung
 * h1 -> h3, den Screenreader als fehlende Ebene vorlesen.
 */
export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <h2 className="font-display text-step-1 font-bold">{title}</h2>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <div className="border-l-2 border-signal bg-signal-wash px-5 py-4">{children}</div>;
}

/**
 * Faktenliste als Datenblatt: jede Zeile sitzt auf einer Haarlinie, statt in
 * einer eigenen Karte zu schweben. Liest sich wie eine Ausstattungsliste —
 * passend für eine Fahrschule, die konkrete Leistungen aufzählt.
 */
export function ChecklistGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 sm:gap-x-12">
      {items.map((item, i) => (
        <Reveal key={item} delay={(i % 4) * 55}>
          <li className="flex items-start gap-3.5 border-t border-ink/15 py-4">
            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-signal" />
            <span>{item}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

/** Sprachen als kleine Schilder — Mono, rechteckig, Haarlinie. */
export function LangList({ languages }: { languages: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {languages.map((lang) => (
        <li
          key={lang}
          className="rounded-sm border border-ink/20 px-5 py-3 font-mono text-[0.88rem] uppercase tracking-[0.1em]"
        >
          {lang}
        </li>
      ))}
    </ul>
  );
}
