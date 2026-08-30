import Link from "next/link";
import Reveal from "./Reveal";
import Icon, { type IconKey } from "./Icon";
import { courseFor, type PriceRow } from "@/lib/data";

export default function PriceGrid({ items }: { items: PriceRow[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((row, i) => {
        const course = courseFor(row.courseKey);
        return (
          <Reveal key={row.name} delay={(i % 3) * 60} className="card card-hover flex flex-col">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-signal-wash text-signal">
                <Icon name={(course?.icon as IconKey) ?? "car"} className="h-5 w-5" />
              </span>
              <h3 className="font-display text-step-1 font-bold">{row.name}</h3>
            </div>
            <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-ink-soft">
              {row.description}
            </p>
            {row.inquiryOnly ? (
              <>
                <p className="mt-4 font-display text-step-1 font-extrabold text-signal">
                  Auf Anfrage
                </p>
                <Link href="/kontakt" className="btn btn-ghost mt-4">
                  Angebot anfragen
                </Link>
              </>
            ) : (
              <p className="mt-4 font-mono text-[0.92rem] text-ink-soft">
                {row.note && <span>{row.note} </span>}
                <span className="text-step-2 font-display font-extrabold text-ink">
                  CHF {row.price}
                </span>
                {row.unit && <span className="ml-1">{row.unit}</span>}
              </p>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
