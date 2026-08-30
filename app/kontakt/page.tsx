import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import Icon from "@/components/Icon";
import { InfoCard } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("kontakt");

export const metadata: Metadata = pageMeta("/kontakt", {
  title: fm.seoTitle,
  description: fm.seoDescription,
});

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Kontakt" />
      <section className="section block-light">
        <div className="wrap grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={100} className="grid gap-4">
            <InfoCard title="So erreichst du uns">
              <div className="grid gap-2.5">
                <span className="flex items-start gap-2.5">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  <span>
                    {site.name} – {site.owner}
                    <br />
                    {site.address.street}, {site.address.zip} {site.address.city}
                  </span>
                </span>
                <span className="flex items-center gap-2.5">
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-signal" />
                  <a href={`tel:${site.phone.tel}`} className="text-signal">
                    {site.phone.display}
                  </a>
                </span>
                <span className="flex items-center gap-2.5">
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-signal" />
                  <a href={`mailto:${site.email}`} className="text-signal">
                    {site.email}
                  </a>
                </span>
                <span className="flex items-start gap-2.5">
                  <Icon name="globe" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  <span>{site.languages.join(" · ")}</span>
                </span>
              </div>
            </InfoCard>
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </>
  );
}
