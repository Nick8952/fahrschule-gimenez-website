/* Seitentexte und Rechtstexte.
 *
 * Quelle ist Sanity (Portable Text). Rueckfall sind die Markdown-Dateien unter
 * content/, die beim Umstieg als Ausgangsbestand dienten — sie werden dann mit
 * demselben Konverter wie im Seed-Skript nach Portable Text uebersetzt, damit
 * es in Prose.tsx nur EINEN Render-Pfad gibt.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { sanityFetch } from "@/sanity/fetch";
import { legalQuery, pageQuery } from "@/sanity/queries";
import { markdownToBlocks, type PortableTextBlock } from "./markdownToBlocks";

const ROOT = process.cwd();

export type PageContent<T> = { frontmatter: T; body: PortableTextBlock[] };

export type PageFM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};

export type LegalFM = {
  title: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
};

function readMarkdown<T>(file: string): PageContent<T> {
  const src = fs.readFileSync(file, "utf8");
  const { data, content } = matter(src);
  return {
    frontmatter: data as T,
    body: content.trim() ? markdownToBlocks(content) : [],
  };
}

export async function getPage(slug: string): Promise<PageContent<PageFM>> {
  const result = await sanityFetch<{
    seoTitle: string;
    seoDescription: string;
    hero: PageFM["hero"];
    body: PortableTextBlock[] | null;
  } | null>(pageQuery, () => null, { slug });

  if (result) {
    return {
      frontmatter: {
        seoTitle: result.seoTitle,
        seoDescription: result.seoDescription,
        hero: result.hero,
      },
      body: result.body ?? [],
    };
  }

  return readMarkdown<PageFM>(path.join(ROOT, "content", "pages", `${slug}.md`));
}

export async function getLegal(slug: string): Promise<PageContent<LegalFM>> {
  const result = await sanityFetch<{
    title: string;
    subtitle?: string;
    seoTitle?: string;
    seoDescription?: string;
    body: PortableTextBlock[] | null;
  } | null>(legalQuery, () => null, { slug });

  if (result) {
    const { body, ...frontmatter } = result;
    return { frontmatter, body: body ?? [] };
  }

  return readMarkdown<LegalFM>(path.join(ROOT, "content", "legal", `${slug}.md`));
}
