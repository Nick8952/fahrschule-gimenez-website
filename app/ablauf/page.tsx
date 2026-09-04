import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, steps, faq } from "@/lib/data";
import PageHero from "@/components/PageHero";
import RouteSteps from "@/components/RouteSteps";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("ablauf");

export const metadata: Metadata = pageMeta("/ablauf", {
  title: fm.seoTitle,
  description: fm.seoDescription,
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Ablauf" />

      <section className="section block-light">
        <div className="wrap">
          <RouteSteps steps={steps.items} />
        </div>
      </section>

      <section className="section block-light border-t border-ink/10">
        <div className="wrap">
          <Reveal className="mb-8 text-center">
            <p className="eyebrow justify-center">Häufige Fragen</p>
            <h2 className="mt-3 text-step-2 font-extrabold">Gut zu wissen</h2>
            <p className="mx-auto mt-2 max-w-[52ch] text-ink-soft">
              Die wichtigsten Fragen rund um Ausbildung und Ablauf – kurz beantwortet.
            </p>
          </Reveal>
          <Faq items={faq.items} />
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <Reveal className="card !bg-signal !border-none !p-10 text-center text-white sm:!p-14">
            <h2 className="mx-auto max-w-[20ch] text-step-3 font-extrabold">
              Starte deinen Weg zum Führerschein
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-white/85">
              Wir erklären dir gerne alle Schritte persönlich und stellen dein Paket zusammen.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phone.tel}`} className="btn bg-white !text-signal">
                {site.phone.display}
              </a>
              <Link href="/kontakt" className="btn !border-white !bg-transparent !text-white">
                Jetzt anfragen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
