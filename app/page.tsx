import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, courses, reasons } from "@/lib/data";
import { asset } from "@/lib/site";
import RouteStamp from "@/components/RouteStamp";
import RouteStrip from "@/components/RouteStrip";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={asset("/img/hero-car.jpg")}
            alt=""
            fill
            priority
            unoptimized
            className="hero-photo object-cover object-[38%_42%]"
          />
          <div className="hero-scrim absolute inset-0" />
        </div>
        <div className="wrap grid items-center gap-12 pb-20 pt-14 sm:pb-32 sm:pt-20 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark mb-5">{fm.hero.eyebrow}</p>
            <h1 className="max-w-[18ch] text-step-5 font-extrabold text-white">{fm.hero.title}</h1>
            <p className="mt-6 max-w-[52ch] text-step-1 text-white/80">{fm.hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${site.phone.tel}`} className="btn btn-signal">
                <Icon name="phone" className="h-4 w-4" /> {site.phone.display}
              </a>
              <Link href="/angebote" className="btn btn-ghost">
                Angebote entdecken
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <RouteStamp />
          </Reveal>
        </div>
      </section>

      {/* Route-Strip: Angebote als Stationen */}
      <section className="block-light border-t border-ink/10 pb-4">
        <div className="wrap pt-12 sm:pt-16">
          <Reveal className="mb-8 text-center">
            <p className="eyebrow justify-center">Dein Weg zum Führerschein</p>
            <h2 className="mt-3 text-step-2 font-extrabold">Alle Stationen auf einen Blick</h2>
          </Reveal>
          <RouteStrip stops={courses.items} linkTo={() => "/angebote"} />
        </div>
      </section>

      {/* Das spricht für uns */}
      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Warum Gimenez" title="Das spricht für uns" />
          <ChecklistGrid items={reasons.items} />
        </div>
      </section>

      {/* Sprachen */}
      <section className="section block-light border-t border-ink/10">
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

      {/* CTA */}
      <section className="section block-light">
        <div className="wrap">
          <Reveal className="card !bg-signal !border-none !p-10 text-center text-white sm:!p-14">
            <h2 className="mx-auto max-w-[20ch] text-step-3 font-extrabold">
              Bereit für die erste Fahrstunde?
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-white/85">
              Ruf einfach an oder schreib uns – wir beraten dich gerne und finden gemeinsam den
              passenden Kurs.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phone.tel}`} className="btn bg-white !text-signal">
                {site.phone.display}
              </a>
              <Link href="/kontakt" className="btn !border-white !bg-transparent !text-white">
                Kontakt aufnehmen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
