import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, reasons } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import { ChecklistGrid, LangList, SectionHead } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm, html } = getPage<FM>("ueber-uns");

export const metadata: Metadata = pageMeta("/ueber-uns", {
  title: fm.seoTitle,
  description: fm.seoDescription,
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Über uns" />

      <section className="section block-light">
        {/* Lesespalte an der linken Rasterkante, nicht zentriert — sonst
            springt der Text gegenueber allen anderen Abschnitten ein. */}
        <div className="wrap">
          <Reveal className="max-w-eng">
            <Prose html={html} />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <Link href="/kontakt" className="btn btn-signal">
              Lerne uns kennen
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section block-mist">
        <div className="wrap">
          <SectionHead eyebrow="Warum Fahrschule Gimenez" title="Das spricht für uns" />
          <ChecklistGrid items={reasons.items} />
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Ausstattung" title="Wagen und Sprachen" />
          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal>
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft">
                Schulwagen
              </h3>
              <p className="mt-3 max-w-[40ch] text-ink-soft">
                Du übst auf zuverlässigen, gut gewarteten Fahrzeugen – {site.vehicles.gearNote}.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {site.vehicles.models.map((m) => (
                  <span
                    key={m}
                    className="flex items-center gap-2 rounded-sm border border-ink/20 px-4 py-2.5 font-display text-[0.95rem] font-semibold"
                  >
                    <Icon name="car" className="h-5 w-5 text-signal" /> {m}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft">
                Unterrichtssprachen
              </h3>
              <p className="mt-3 max-w-[40ch] text-ink-soft">
                Wähl die Sprache, in der du dich am wohlsten fühlst.
              </p>
              <div className="mt-5">
                <LangList languages={site.languages} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Lust auf die erste Fahrstunde?"
        body="Melde dich – wir freuen uns darauf, dich auf dem Weg zum Führerschein zu begleiten."
        actionLabel="Kontakt aufnehmen"
      />
    </>
  );
}
