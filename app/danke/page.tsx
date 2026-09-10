import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { getSite } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("danke");
  return pageMeta("/danke", {
    title: fm.seoTitle,
    description: fm.seoDescription,
    noindex: true,
  });
}

export default async function Page() {
  const [{ frontmatter: fm }, site] = await Promise.all([getPage("danke"), getSite()]);

  return (
    <section className="block-light section">
      <div className="wrap-eng text-center">
        <Reveal>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-signal text-white">
            <Icon name="check" className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-step-4 font-bold">{fm.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-step-1 text-ink-soft">{fm.hero.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-signal">
              Zurück zur Startseite
            </Link>
            <a href={`tel:${site.phone.tel}`} className="btn btn-outline">
              {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
