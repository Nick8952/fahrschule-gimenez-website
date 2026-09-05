import Reveal from "./Reveal";

type Step = { n: number; title: string; body: string };

/** Vertikale Variante des Routen-Motivs für die 4 Schritte zum Führerschein. */
export default function RouteSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-10 pl-[4.5rem] sm:pl-24">
      <div
        className="route-line-v absolute left-7 top-2 bottom-2 w-[3px] sm:left-9"
        aria-hidden="true"
      />
      {steps.map((s, i) => (
        <Reveal key={s.n} delay={i * 70} className="relative">
          <span className="absolute -left-[4.5rem] top-0 grid h-14 w-14 place-items-center rounded-full border-2 border-signal bg-paper font-display text-xl font-bold text-signal shadow-s sm:-left-24">
            {s.n}
          </span>
          <h3 className="text-step-1 font-extrabold">{s.title}</h3>
          <p className="mt-1.5 max-w-[52ch] text-ink-soft">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
