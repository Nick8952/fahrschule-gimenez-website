"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { Nav, Site } from "@/lib/data";
import { asset } from "@/lib/site";
import Icon from "./Icon";

export default function SiteHeader({ site, nav }: { site: Site; nav: Nav }) {
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
      {/* Die Kopfzeile ist die kleinste Ausbaustufe der Milchglas-Tafel: sie
          liegt als Glasleiste ueber dem Hero-Foto und wird auf weissen Seiten
          einfach zu einer weissen Leiste mit Haarlinie. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/12 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} – Start`}>
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white">
              <Image
                src={asset("/img/logo.png")}
                alt=""
                width={80}
                height={80}
                priority
                unoptimized
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <strong className="font-display text-[1rem] font-bold tracking-[-0.01em]">
                {site.owner}
              </strong>
              <small className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft">
                Fahrschule · Autoescola
              </small>
            </span>
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Hauptnavigation">
            {nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative px-3.5 py-2 font-display text-[0.92rem] font-semibold transition-colors after:absolute after:inset-x-3.5 after:bottom-0 after:h-[2px] after:transition-colors ${
                  isActive(item.href)
                    ? "text-signal after:bg-signal"
                    : "text-ink after:bg-transparent hover:text-signal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phone.tel}`}
              className="hidden btn btn-signal !min-h-[42px] !px-4 !text-[0.85rem] sm:inline-flex"
            >
              <Icon name="phone" className="h-4 w-4" /> Anrufen
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded border border-ink/20 lg:hidden"
            >
              <span className="relative block h-[2px] w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:h-[2px] before:w-5 before:bg-current after:absolute after:top-1.5 after:left-0 after:h-[2px] after:w-5 after:bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobiles Voll-Sheet */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 lg:hidden ${
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
              className="flex items-center justify-between border-b border-ink/15 py-4 font-display text-[1.9rem] font-bold tracking-[-0.02em] text-ink"
            >
              {item.label}
              <span className="text-signal">→</span>
            </Link>
          ))}
          <div className="mt-8 grid gap-1 font-mono text-[0.85rem] text-ink-soft">
            <a href={`tel:${site.phone.tel}`} className="inline-block py-2 text-signal">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="inline-block py-2">
              {site.email}
            </a>
            <span className="pt-1">
              {site.address.street}, {site.address.zip} {site.address.city}
            </span>
          </div>
        </nav>
      </div>

      {/* Fixe Aktionsleiste (Mobile) */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/15 bg-white/90 backdrop-blur-xl sm:hidden"
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
