"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { site, nav } from "@/lib/data";
import { asset } from "@/lib/site";
import Icon from "./Icon";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/92 backdrop-blur">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} – Start`}>
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white shadow-s">
              <Image
                src={asset("/img/logo.png")}
                alt=""
                width={88}
                height={88}
                priority
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <strong className="font-display text-[1.02rem] font-extrabold">{site.owner}</strong>
              <small className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-ink-soft">
                Fahrschule · Autoescola
              </small>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Hauptnavigation">
            {nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 font-display text-[0.95rem] font-semibold transition-colors ${
                  isActive(item.href) ? "text-signal" : "text-ink hover:text-signal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phone.tel}`}
              className="hidden btn btn-signal !min-h-[42px] !px-4 !text-[0.88rem] sm:inline-flex"
            >
              <Icon name="phone" className="h-4 w-4" /> Anrufen
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded border border-ink/15 lg:hidden"
            >
              <span className="relative block h-[2px] w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:h-[2px] before:w-5 before:bg-current after:absolute after:top-1.5 after:left-0 after:h-[2px] after:w-5 after:bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobiles Voll-Sheet */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "calc(var(--header-h) + 1rem)" }}
        aria-hidden={!open}
      >
        <nav className="wrap flex h-full flex-col overflow-y-auto pb-24">
          {nav.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-ink/10 py-4 font-display text-3xl font-extrabold text-ink"
            >
              {item.label}
              <span className="text-signal">→</span>
            </Link>
          ))}
          <div className="mt-6 grid gap-2 font-mono text-[0.9rem] text-ink-soft">
            <a href={`tel:${site.phone.tel}`} className="text-signal">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>
              {site.address.street}, {site.address.zip} {site.address.city}
            </span>
          </div>
        </nav>
      </div>

      {/* Fixe Aktionsleiste (Mobile) */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex gap-px border-t border-ink/10 bg-paper sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <a
          href={`tel:${site.phone.tel}`}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 font-display text-[0.85rem] font-bold text-ink"
        >
          <Icon name="phone" className="h-4 w-4" /> Anrufen
        </a>
        <Link
          href="/kontakt"
          className="flex flex-1 items-center justify-center bg-signal py-3.5 font-display text-[0.85rem] font-bold text-white"
        >
          Anfrage senden
        </Link>
      </div>

      <div className="h-[var(--header-h)]" />
    </>
  );
}
