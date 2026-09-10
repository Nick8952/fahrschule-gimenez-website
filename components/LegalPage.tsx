import type { Metadata } from "next";
import { getLegal } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import PageHero from "./PageHero";
import Prose from "./Prose";
import Reveal from "./Reveal";

type LegalFM = {
  title: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export function legalMetadata(slug: string): Metadata {
  const { frontmatter } = getLegal<LegalFM>(slug);
  return pageMeta(`/${slug}`, {
    title: frontmatter.seoTitle ?? frontmatter.title,
    description: frontmatter.seoDescription,
  });
}

export default function LegalPage({ slug }: { slug: string }) {
  const { frontmatter, html } = getLegal<LegalFM>(slug);
  return (
    <>
      <PageHero title={frontmatter.title} lead={frontmatter.subtitle} crumb={frontmatter.title} />
      <section className="section block-light">
        {/* Lesespalte linksbuendig im Raster (siehe globals.css, .wrap-eng
            wird bewusst nicht mehr verwendet). */}
        <div className="wrap">
          <Reveal className="max-w-eng">
            <Prose html={html} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
