import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, courses, reasons } from "@/lib/data";
import { asset } from "@/lib/site";
import RouteStrip from "@/components/RouteStrip";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";
import { SectionHead, ChecklistGrid, LangList } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("home");

export const metadata: Metadata = pageMeta("/", {
  title: fm.seoTitle,
  description: fm.seoDescription,
});

/* Die Eckdaten, die jemand vor dem Anruf wissen will — direkt aus site.json,
   damit sie im CMS mitgepflegt werden und nicht doppelt gepflegt sind. */
const facts = [
  { k: "Unterrichtssprachen", v: `${site.languages.length} Sprachen` },
  { k: "Schulwagen", v: site.vehicles.models.join(" · ") },
  { k: "Standort", v: `${site.address.street}, ${site.address.city}` },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — Bildebene (Foto) mit einer Informationstafel aus Milchglas
          darüber. Der Text steht auf der Tafel, nicht auf dem Foto: dadurch
          ist der Kontrast unabhängig davon, was gerade hinter ihm liegt. */}
      <section className="relative -mt-[var(--header-h)] overflow-hidden pt-[var(--header-h)]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={asset("/img/hero-car.jpg")}
            alt=""
            fill
            priority
            unoptimized
            className="hero-photo object-cover object-[68%_45%]"
          />
          <div className="hero-scrim absolute inset-0" />
        </div>

        <div className="wrap pb-16 pt-10 sm:pb-24 sm:pt-16">
          <Reveal>
            <div className="tafel max-w-[44rem] rounded-lg p-6 sm:p-10">
              <p className="eyebrow mb-6">{fm.hero.eyebrow}</p>
              <h1 className="max-w-[15ch] text-step-4 font-bold">{fm.hero.title}</h1>
              <p className="mt-5 max-w-[48ch] text-step-1 text-ink-soft">{fm.hero.lead}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${site.phone.tel}`} className="btn btn-signal">
                  <Icon name="phone" className="h-4 w-4" /> {site.phone.display}
                </a>
                <Link href="/angebote" className="btn btn-outline">
                  Angebote entdecken
                </Link>
              </div>

              {/* Datenzeile im Tafel-Fuss — die Signatur des Rasters */}
              <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-ink/15 pt-6 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft">
                      {f.k}
                    </dt>
                    <dd className="mt-1.5 font-display text-[0.95rem] font-semibold">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kursangebot als Raster */}
      <section className="section block-light">
        <div className="wrap">
          <SectionHead
            eyebrow="Kursangebot"
            title="Alles aus einer Hand"
            intro="Vom Nothelferkurs bis zur Weiterausbildung – du musst für keinen Schritt die Schule wechseln."
          />
          <RouteStrip stops={courses.items} linkTo={() => "/angebote"} allHref="/angebote" />
        </div>
      </section>

      {/* Das spricht für uns */}
      <section className="section block-mist">
        <div className="wrap">
          <SectionHead eyebrow="Warum Gimenez" title="Das spricht für uns" />
          <ChecklistGrid items={reasons.items} />
        </div>
      </section>

      {/* Sprachen */}
      <section className="section block-light">
        <div className="wrap">
          <SectionHead
            eyebrow="Sprachen"
            title="Lerne in deiner Sprache"
            intro="Fahren lernen ist Kopfsache – deshalb unterrichten wir in der Sprache, in der du dich wohlfühlst."
          />
          <Reveal>
            <LangList languages={site.languages} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Bereit für die erste Fahrstunde?"
        body="Ruf einfach an oder schreib uns – wir beraten dich gerne und finden gemeinsam den passenden Kurs."
        actionLabel="Kontakt aufnehmen"
      />
    </>
  );
}
