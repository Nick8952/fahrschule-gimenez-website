import Link from "next/link";
import Image from "next/image";
import { site, nav } from "@/lib/data";
import { asset } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      {/* Jedes Seiten-Ende hat schon ein eigenes, inhaltlich passendes
          CTA-Band (siehe page.tsx-Dateien) - die Fusszeile wiederholt das
          nicht, sondern bleibt reine Info. */}
      <div className="bg-route-2 text-[#CDB0A8]">
        <div className="wrap py-14">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
            <div>
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image
                  src={asset("/img/logo.png")}
                  alt={site.name}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-contain p-1"
                />
              </span>
              <p className="text-[0.92rem] leading-relaxed">
                {site.tagline}. {site.blurb}
              </p>
            </div>

            {nav.footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#CDB0A8]/70">
                  {col.title}
                </h3>
                <ul className="grid gap-2 text-[0.92rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#CDB0A8]/70">
                Kontakt
              </h3>
              <address className="grid gap-1.5 not-italic text-[0.92rem]">
                <span>
                  {site.name} – {site.owner}
                </span>
                <span>
                  {site.address.street}, {site.address.zip} {site.address.city}
                </span>
                <a href={`tel:${site.phone.tel}`} className="hover:text-white">
                  {site.phone.display}
                </a>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </address>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-6 font-mono text-[0.78rem]">
            <span>
              © {year} {site.name} – {site.owner}
            </span>
            <span>
              <Link href="/impressum" className="hover:text-white">
                Impressum
              </Link>{" "}
              ·{" "}
              <Link href="/datenschutz" className="hover:text-white">
                Datenschutz
              </Link>{" "}
              ·{" "}
              <Link href="/agb" className="hover:text-white">
                AGB
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
