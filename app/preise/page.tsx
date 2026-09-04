import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, prices } from "@/lib/data";
import PageHero from "@/components/PageHero";
import PriceGrid from "@/components/PriceGrid";
import { Callout } from "@/components/ui";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("preise");

export const metadata: Metadata = pageMeta("/preise", {
  title: fm.seoTitle,
  description: fm.seoDescription,
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Preise" />

      <section className="section block-light">
        <div className="wrap">
          <Reveal className="mb-8">
            <Callout>
              <p className="flex items-start gap-3 text-[0.95rem] text-ink">
                <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                <span>{prices.notice}</span>
              </p>
            </Callout>
          </Reveal>

          <PriceGrid items={prices.items} />

          <Reveal className="mt-10 text-center">
            <p className="text-ink-soft">Alles Wichtige geklärt? Sende uns direkt deine unverbindliche Anfrage.</p>
            <Link href="/kontakt" className="btn btn-signal mt-4">
              Jetzt anfragen
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section block-light border-t border-ink/10">
        <div className="wrap">
          <Reveal className="card !bg-signal !border-none !p-10 text-center text-white sm:!p-14">
            <h2 className="mx-auto max-w-[22ch] text-step-3 font-extrabold">
              Nicht sicher, was du brauchst?
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-white/85">
              Wir stellen dir gerne ein persönliches Paket zusammen – ruf einfach an oder schreib
              uns.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phone.tel}`} className="btn bg-white !text-signal">
                {site.phone.display}
              </a>
              <Link href="/kontakt" className="btn !border-white !bg-transparent !text-white">
                Beratung anfragen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
