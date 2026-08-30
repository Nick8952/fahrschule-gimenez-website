import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, reasons } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { ChecklistGrid, LangList } from "@/components/ui";

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
        <div className="wrap-eng">
          <Reveal>
            <Prose html={html} />
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <Link href="/kontakt" className="btn btn-signal">
              Lerne uns kennen
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section block-light border-t border-ink/10">
        <div className="wrap">
          <Reveal className="mb-8 text-center">
            <p className="eyebrow justify-center">Warum Fahrschule Gimenez</p>
            <h2 className="mt-3 text-step-2 font-extrabold">Das spricht für uns</h2>
          </Reveal>
          <div className="mx-auto max-w-[52rem]">
            <ChecklistGrid items={reasons.items} />
          </div>
        </div>
      </section>

      <section className="section block-light border-t border-ink/10">
        <div className="wrap grid gap-10 sm:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-step-1 font-bold">Unsere Schulwagen</h3>
            <p className="mt-2 text-ink-soft">
              Du übst auf zuverlässigen, gut gewarteten Fahrzeugen – {site.vehicles.gearNote}.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {site.vehicles.models.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-2 rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-display font-bold shadow-s"
                >
                  <Icon name="car" className="h-5 w-5 text-signal" /> {m}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="font-display text-step-1 font-bold">Sprachen im Unterricht</h3>
            <p className="mt-2 text-ink-soft">Wähl die Sprache, in der du dich am wohlsten fühlst.</p>
            <div className="mt-4">
              <LangList languages={site.languages} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <Reveal className="card !bg-signal !border-none !p-10 text-center text-white sm:!p-14">
            <h2 className="mx-auto max-w-[20ch] text-step-3 font-extrabold">
              Lust auf die erste Fahrstunde?
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-white/85">
              Melde dich – wir freuen uns darauf, dich auf dem Weg zum Führerschein zu begleiten.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phone.tel}`} className="btn bg-white !text-signal">
                {site.phone.display}
              </a>
              <Link href="/kontakt" className="btn btn-ghost !text-white">
                Kontakt aufnehmen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
