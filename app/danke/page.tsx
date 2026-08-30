import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("danke");

export const metadata: Metadata = pageMeta("/danke", {
  title: fm.seoTitle,
  description: fm.seoDescription,
  noindex: true,
});

export default function Page() {
  return (
    <section className="block-light section">
      <div className="wrap-eng text-center">
        <Reveal>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-signal text-white">
            <Icon name="check" className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-step-4 font-extrabold">{fm.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-step-1 text-ink-soft">{fm.hero.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-signal">
              Zurück zur Startseite
            </Link>
            <a href={`tel:${site.phone.tel}`} className="btn btn-ghost">
              {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
