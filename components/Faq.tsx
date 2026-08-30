"use client";

import { useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto grid max-w-[52rem] gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 40} className="card overflow-hidden !p-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-[1.02rem] font-bold"
            >
              {item.q}
              <Icon
                name="arrow"
                className={`h-5 w-5 shrink-0 text-signal transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-ink-soft">{item.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
