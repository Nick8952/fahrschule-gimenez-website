/* Liest Markdown-Inhalte aus dem content-Ordner: Frontmatter + gerendertes HTML. */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = process.cwd();

/* breaks: true — im CMS getippte Zeilenumbrueche sollen auch welche bleiben.
   Ohne das klebte z. B. die Adresse im Impressum zu einer Zeile zusammen, und
   wer die Texte spaeter im CMS pflegt, kann sich das nicht erklaeren. Kein
   Absatz in content/ ist ueber mehrere Zeilen umbrochen, es entstehen also
   keine ungewollten <br>. */
marked.setOptions({ gfm: true, breaks: true });

type Parsed<T> = { frontmatter: T; html: string; raw: string };

function read<T>(file: string): Parsed<T> {
  const src = fs.readFileSync(file, "utf8");
  const { data, content } = matter(src);
  const html = content.trim() ? (marked.parse(content) as string) : "";
  return { frontmatter: data as T, html, raw: content };
}

export function getPage<T = Record<string, unknown>>(slug: string): Parsed<T> {
  return read<T>(path.join(ROOT, "content", "pages", `${slug}.md`));
}

export function getLegal<T = { title: string; subtitle?: string; seoTitle?: string; seoDescription?: string }>(
  slug: string,
): Parsed<T> {
  return read<T>(path.join(ROOT, "content", "legal", `${slug}.md`));
}
