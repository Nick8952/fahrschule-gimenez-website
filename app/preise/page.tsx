import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { prices } from "@/lib/data";
import PageHero from "@/components/PageHero";
import PriceGrid from "@/components/PriceGrid";
import { Callout } from "@/components/ui";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
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
        </div>
      </section>

      <CtaBand
        className="border-t border-ink/10"
        title="Nicht sicher, was du brauchst?"
        body="Wir stellen dir gerne ein persönliches Paket zusammen – ruf einfach an oder schreib uns."
        actionLabel="Beratung anfragen"
      />
    </>
  );
}
