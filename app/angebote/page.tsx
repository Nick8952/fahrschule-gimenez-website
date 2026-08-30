import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, courses } from "@/lib/data";
import PageHero from "@/components/PageHero";
import RouteStrip from "@/components/RouteStrip";
import Reveal from "@/components/Reveal";
import Icon, { type IconKey } from "@/components/Icon";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("angebote");

export const metadata: Metadata = pageMeta("/angebote", {
  title: fm.seoTitle,
  description: fm.seoDescription,
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Angebote" />

      <section className="block-light pt-12 sm:pt-16">
        <div className="wrap">
          <RouteStrip stops={courses.items} />
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.items.map((c, i) => (
            <Reveal key={c.key} delay={(i % 3) * 60} id={c.key} className="card card-hover">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-signal-wash text-signal">
                <Icon name={c.icon as IconKey} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-step-1 font-bold">{c.title}</h3>
              <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-soft">{c.description}</p>
              <span className="mt-3 inline-block rounded-pill bg-paper-2 px-3 py-1 font-mono text-[0.72rem] font-medium uppercase tracking-[0.04em] text-ink-soft">
                {c.tag}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section block-light border-t border-ink/10">
        <div className="wrap">
          <Reveal className="mb-8">
            <p className="eyebrow">Unsere Fahrzeuge</p>
            <h2 className="mt-3 text-step-2 font-extrabold">Üben auf zuverlässigen Schulwagen</h2>
            <p className="mt-2 text-ink-soft">{site.vehicles.gearNote}.</p>
          </Reveal>
          <Reveal className="flex flex-wrap gap-3">
            {site.vehicles.models.map((m) => (
              <span key={m} className="flex items-center gap-2 rounded-lg border border-ink/15 bg-white px-4 py-2.5 font-display font-bold shadow-s">
                <Icon name="car" className="h-5 w-5 text-signal" /> {m}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <Reveal className="card !bg-signal !border-none !p-10 text-center text-white sm:!p-14">
            <h2 className="mx-auto max-w-[22ch] text-step-3 font-extrabold">
              Nicht sicher, was du brauchst?
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-white/85">
              Wir stellen dir gerne ein persönliches Paket zusammen – ruf einfach an oder schreib
              uns.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phone.tel}`} className="btn bg-white !text-signal">
                {site.phone.display}
              </a>
              <Link href="/kontakt" className="btn btn-ghost !text-white">
                Beratung anfragen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
