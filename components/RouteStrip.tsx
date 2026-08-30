import Link from "next/link";
import Icon, { type IconKey } from "./Icon";
import type { Course } from "@/lib/data";

/**
 * Die Angebote als Stationen entlang einer gestrichelten Route — echoend die
 * Fahrbahnmarkierung. Eine Datenquelle (data/courses.json) speist sowohl den
 * Teaser auf der Startseite als auch die Angebote-Seite.
 */
export default function RouteStrip({
  stops,
  linkTo,
}: {
  stops: Course[];
  linkTo?: (key: string) => string;
}) {
  return (
    <div className="relative">
      <div className="route-line absolute inset-x-0 top-7 hidden h-[3px] sm:block" aria-hidden="true" />
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
        {stops.map((s) => {
          const inner = (
            <>
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-signal bg-paper text-signal shadow-s transition-transform group-hover:-translate-y-1">
                <Icon name={s.icon as IconKey} className="h-6 w-6" />
              </span>
              <span className="text-center font-display text-[0.95rem] font-bold leading-tight">
                {s.title}
              </span>
              <span className="text-center font-mono text-[0.66rem] uppercase tracking-[0.06em] text-muted">
                {s.tag}
              </span>
            </>
          );
          const cls =
            "group flex w-[128px] shrink-0 snap-start flex-col items-center gap-2 sm:w-[140px]";
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
      </div>
    </div>
  );
}
