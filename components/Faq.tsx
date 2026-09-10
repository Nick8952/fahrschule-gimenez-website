"use client";

import { useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

/**
 * Fragen als aufklappbare Zeilen auf Haarlinien — keine einzeln schwebenden
 * Karten. Dadurch bleibt die linke Kante durchgehend und die Liste liest sich
 * als eine Liste, nicht als acht Objekte.
 */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid max-w-[56rem]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 40} className="border-t border-ink/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.05rem] font-bold transition-colors hover:text-signal"
            >
              {item.q}
              <Icon
                name="arrow"
                className={`h-5 w-5 shrink-0 text-signal transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-6 pr-10 text-ink-soft">{item.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
