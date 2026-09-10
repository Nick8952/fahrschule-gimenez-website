import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { getCourses, getSite } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Icon, { type IconKey } from "@/components/Icon";
import { SectionHead } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("angebote");
  return pageMeta("/angebote", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm }, site, courses] = await Promise.all([
    getPage("angebote"),
    getSite(),
    getCourses(),
  ]);

  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Angebote" />

      {/* Kurskatalog: eine Zeile pro Kurs, Bezeichnung links, Beschreibung
          rechts. Die Kachel-Übersicht steht auf der Startseite — hier ist der
          Volltext das Eigentliche, eine zweite Kachelreihe darüber wäre
          dieselbe Liste zweimal. */}
      <section className="section block-light">
        <div className="wrap">
          <SectionHead
            eyebrow="Kurskatalog"
            title="Unsere Kurse im Detail"
            intro="Alle Kurse finden bei uns statt – du musst für keinen Schritt die Schule wechseln."
          />
          <div className="grid">
            {courses.items.map((c, i) => (
              <Reveal
                key={c.key}
                delay={(i % 3) * 55}
                id={c.key}
                className="grid scroll-mt-32 gap-x-10 gap-y-3 border-t border-ink/15 py-8 md:grid-cols-[1fr_1.35fr]"
              >
                <div className="flex items-start gap-4">
                  <Icon
                    name={c.icon as IconKey}
                    className="mt-1 h-6 w-6 shrink-0 text-signal"
                  />
                  <div>
                    <h3 className="font-display text-step-1 font-bold">{c.title}</h3>
                    <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">
                      {c.tag}
                    </p>
                  </div>
                </div>
                <p className="max-w-[58ch] text-ink-soft">{c.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section block-mist">
        <div className="wrap">
          <SectionHead
            eyebrow="Unsere Fahrzeuge"
            title="Zuverlässige Schulwagen"
            intro={`${site.vehicles.gearNote}.`}
          />
          <Reveal className="flex flex-wrap gap-2">
            {site.vehicles.models.map((m) => (
              <span
                key={m}
                className="flex items-center gap-2 rounded-sm border border-ink/20 bg-white px-4 py-2.5 font-display text-[0.95rem] font-semibold"
              >
                <Icon name="car" className="h-5 w-5 text-signal" /> {m}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Welcher Kurs passt zu dir?"
        body="Erzähl uns kurz, wo du stehst – wir sagen dir, welche Angebote für dich Sinn ergeben."
        actionLabel="Beratung anfragen"
      />
    </>
  );
}
