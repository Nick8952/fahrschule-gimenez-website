import type { Metadata } from "next";
import { getLegal } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import PageHero from "./PageHero";
import Prose from "./Prose";
import Reveal from "./Reveal";

export async function legalMetadata(slug: string): Promise<Metadata> {
  const { frontmatter } = await getLegal(slug);
  return pageMeta(`/${slug}`, {
    title: frontmatter.seoTitle ?? frontmatter.title,
    description: frontmatter.seoDescription,
  });
}

export default async function LegalPage({ slug }: { slug: string }) {
  const { frontmatter, body } = await getLegal(slug);
  return (
    <>
      <PageHero title={frontmatter.title} lead={frontmatter.subtitle} crumb={frontmatter.title} />
      <section className="section block-light">
        {/* Lesespalte linksbuendig im Raster (siehe globals.css, .wrap-eng
            wird bewusst nicht mehr verwendet). */}
        <div className="wrap">
          <Reveal className="max-w-eng">
            <Prose body={body} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
