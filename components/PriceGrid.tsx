import Link from "next/link";
import Reveal from "./Reveal";
import Icon, { type IconKey } from "./Icon";
import { courseFor, type PriceRow } from "@/lib/data";

/**
 * Preise im gleichen Signaletik-Raster wie das Kursangebot: Haarlinien statt
 * Karten-Schatten, Beträge in der Mono-Schrift mit gleichbreiten Ziffern —
 * dadurch stehen die Preise über alle Zellen hinweg exakt untereinander und
 * lassen sich zeilenweise vergleichen.
 */
export default function PriceGrid({ items }: { items: PriceRow[] }) {
  return (
    <div className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((row, i) => {
        const course = courseFor(row.courseKey);
        return (
          <Reveal
            key={row.name}
            delay={(i % 4) * 55}
            className="flex flex-col bg-paper p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[1.05rem] font-bold leading-tight">{row.name}</h3>
              <Icon
                name={(course?.icon as IconKey) ?? "car"}
                className="h-5 w-5 shrink-0 text-signal"
              />
            </div>

            <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
              {row.description}
            </p>

            <div className="mt-6 border-t border-ink/15 pt-4">
              {row.inquiryOnly ? (
                <Link
                  href="/kontakt"
                  className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[0.95rem] font-medium text-signal underline decoration-1 underline-offset-4"
                >
                  Auf Anfrage <Icon name="arrow" className="h-4 w-4" />
                </Link>
              ) : (
                <p className="flex flex-wrap items-baseline gap-x-1.5">
                  {row.note && (
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">
                      {row.note}
                    </span>
                  )}
                  <span className="font-mono text-[1.65rem] font-medium tabular-nums tracking-[-0.02em]">
                    {row.price}
                  </span>
                  <span className="font-mono text-[0.8rem] text-ink-soft">
                    CHF{row.unit ? ` ${row.unit}` : ""}
                  </span>
                </p>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
