import Link from "next/link";
import Image from "next/image";
import { site, nav } from "@/lib/data";
import { asset } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      {/* Jedes Seiten-Ende hat schon ein eigenes, inhaltlich passendes
          CTA-Band (siehe CtaBand.tsx) - die Fusszeile wiederholt das nicht,
          sondern bleibt reine Info.

          Farbwerte bewusst als /75 bzw. /60 auf Graphit statt eines
          abgetoenten Braun: die alte Kombination lag bei 4.4:1 und war in
          11px-Versalien praktisch nicht mehr lesbar. */}
      <div className="bg-graphite-2 text-white/75">
        <div className="wrap py-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
            <div>
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image
                  src={asset("/img/logo.png")}
                  alt={site.name}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-contain p-1"
                />
              </span>
              <p className="max-w-[34ch] text-[0.93rem] leading-relaxed">
                {site.tagline}. {site.blurb}
              </p>
            </div>

            {nav.footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/60">
                  {col.title}
                </h3>
                {/* py auf den Links statt gap auf der Liste: gleiche Optik,
                    aber die Tippflaeche waechst von 19 auf ~35 px. */}
                <ul className="grid text-[0.93rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block py-2 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/60">
                Kontakt
              </h3>
              <address className="grid gap-2 not-italic text-[0.93rem]">
                <span>
                  {site.name} – {site.owner}
                </span>
                <span>
                  {site.address.street}, {site.address.zip} {site.address.city}
                </span>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="inline-block py-1.5 transition-colors hover:text-white"
                >
                  {site.phone.display}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block py-1.5 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </address>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 border-t border-white/15 pt-4 font-mono text-[0.76rem] text-white/60 [&_a]:inline-block [&_a]:py-2">
            <span>
              © {year} {site.name} – {site.owner}
            </span>
            <span>
              <Link href="/impressum" className="transition-colors hover:text-white">
                Impressum
              </Link>{" "}
              ·{" "}
              <Link href="/datenschutz" className="transition-colors hover:text-white">
                Datenschutz
              </Link>{" "}
              ·{" "}
              <Link href="/agb" className="transition-colors hover:text-white">
                AGB
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
