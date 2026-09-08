import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { steps, faq } from "@/lib/data";
import PageHero from "@/components/PageHero";
import RouteSteps from "@/components/RouteSteps";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

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

      <CtaBand
        title="Starte deinen Weg zum Führerschein"
        body="Wir erklären dir gerne alle Schritte persönlich und stellen dein Paket zusammen."
        actionLabel="Jetzt anfragen"
      />
    </>
  );
}
