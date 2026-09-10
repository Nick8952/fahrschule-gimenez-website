import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { steps, faq } from "@/lib/data";
import PageHero from "@/components/PageHero";
import RouteSteps from "@/components/RouteSteps";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { SectionHead } from "@/components/ui";

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
          {/* Titel bewusst anders als im Seitenkopf — dort steht bereits
              "In vier Schritten zum Führerschein". */}
          <SectionHead
            eyebrow="Reihenfolge"
            title="Was wann dran ist"
            intro="Die Reihenfolge ist vorgegeben: ohne Nothelferkurs kein Lernfahrausweis, ohne Theorieprüfung keine Fahrstunden."
          />
          <RouteSteps steps={steps.items} />
        </div>
      </section>

      <section className="section block-mist">
        <div className="wrap">
          <SectionHead
            eyebrow="Häufige Fragen"
            title="Gut zu wissen"
            intro="Die wichtigsten Fragen rund um Ausbildung und Ablauf – kurz beantwortet."
          />
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
