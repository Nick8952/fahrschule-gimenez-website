import Reveal from "./Reveal";
import Icon from "./Icon";

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
    <Reveal className="mx-auto mb-10 max-w-[56ch] text-center">
      {eyebrow && <p className="eyebrow mx-auto justify-center">{eyebrow}</p>}
      <h2 className="mt-4 text-step-3 font-extrabold">{title}</h2>
      {intro && <p className="mt-3 text-ink-soft">{intro}</p>}
    </Reveal>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <h3 className="font-display text-step-1 font-bold">{title}</h3>
      <div className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <div className="border-l-2 border-signal bg-signal-wash px-5 py-4">{children}</div>;
}

export function ChecklistGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item} delay={(i % 4) * 60}>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal text-white">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            <span>{item}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export function LangList({ languages }: { languages: string[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {languages.map((lang) => (
        <li
          key={lang}
          className="rounded-pill border border-ink/15 bg-white px-4 py-1.5 font-mono text-[0.8rem] font-medium shadow-s"
        >
          {lang}
        </li>
      ))}
    </ul>
  );
}
