import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { getCourses, getPrices } from "@/lib/data";
import PageHero from "@/components/PageHero";
import PriceGrid from "@/components/PriceGrid";
import { Callout, SectionHead } from "@/components/ui";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("preise");
  return pageMeta("/preise", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm }, prices, courses] = await Promise.all([
    getPage("preise"),
    getPrices(),
    getCourses(),
  ]);

  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Preise" />

      <section className="section block-light">
        <div className="wrap">
          <SectionHead
            eyebrow="Tarife"
            title="Was es kostet"
            intro="Alle Beträge in Schweizer Franken, inklusive MwSt. Eine Anfrage ist unverbindlich."
          />

          <Reveal className="mb-8">
            <Callout>
              <p className="flex items-start gap-3 text-[0.95rem] text-ink">
                <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                <span>{prices.notice}</span>
              </p>
            </Callout>
          </Reveal>

          <PriceGrid items={prices.items} courses={courses.items} />
        </div>
      </section>

      <CtaBand
        title="Nicht sicher, was du brauchst?"
        body="Wir stellen dir gerne ein persönliches Paket zusammen – ruf einfach an oder schreib uns."
        actionLabel="Beratung anfragen"
      />
    </>
  );
}
