import Reveal from "./Reveal";

type Step = { n: number; title: string; body: string };

/**
 * Die Schritte zum Führerschein als Ablaufplan.
 *
 * Hier ist die Nummerierung inhaltlich gedeckt: die Schritte MÜSSEN in dieser
 * Reihenfolge passieren (ohne Nothelferkurs kein Lernfahrausweis). Deshalb
 * steht die Nummer gross in der linken Spalte — sie ist Information, keine
 * Dekoration.
 */
export default function RouteSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid">
      {steps.map((s, i) => (
        <Reveal key={s.n} delay={i * 65}>
          <li className="grid gap-x-6 gap-y-2 border-t border-ink/15 py-7 sm:grid-cols-[4.5rem_1fr] md:grid-cols-[7rem_1fr]">
            <span className="font-mono text-[0.85rem] font-medium tracking-[0.12em] text-signal">
              {String(s.n).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-step-1 font-bold">{s.title}</h3>
              <p className="mt-2 max-w-[56ch] text-ink-soft">{s.body}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
