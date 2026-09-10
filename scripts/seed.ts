/*
 * Schiebt die bestehenden Inhalte aus data/ und content/ einmalig nach Sanity.
 *
 * Aufruf:
 *   node scripts/seed.ts              (schreibt)
 *   node scripts/seed.ts --dry-run    (zeigt nur, was passieren wuerde)
 *
 * Braucht in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (Editor-Token aus sanity.io/manage)
 *
 * Das Skript ist wiederholbar: alle Dokument-IDs und alle Schluessel im
 * Portable Text sind aus dem Inhalt abgeleitet, nicht zufaellig. Ein zweiter
 * Lauf erzeugt also dasselbe Ergebnis und keine Dubletten.
 */

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import matter from "gray-matter";

import { markdownToBlocks } from "../lib/markdownToBlocks.ts";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry-run");

/* .env.local einlesen — ohne zusaetzliche Abhaengigkeit. */
const envFile = path.join(ROOT, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID fehlt (.env.local).");
  process.exit(1);
}
if (!token && !DRY) {
  console.error("SANITY_API_WRITE_TOKEN fehlt (.env.local). Mit --dry-run geht es ohne.");
  process.exit(1);
}

const json = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(ROOT, "data", `${name}.json`), "utf8"));

const md = (dir: string, name: string) =>
  matter(fs.readFileSync(path.join(ROOT, "content", dir, `${name}.md`), "utf8"));

const site = json("site");
const nav = json("nav");
const courses = json("courses");
const prices = json("prices");
const steps = json("steps");
const faq = json("faq");
const reasons = json("reasons");

/** Stabile ID aus dem Kurskuerzel, damit Referenzen aufloesbar bleiben. */
const courseId = (key: string) => `course-${key}`;

type SanityDoc = { _id: string; _type: string; [field: string]: unknown };
const docs: SanityDoc[] = [];

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  demo: site.demo,
  name: site.name,
  legalName: site.legalName,
  owner: site.owner,
  tagline: site.tagline,
  blurb: site.blurb,
  address: site.address,
  phone: site.phone,
  email: site.email,
  languages: site.languages,
  vehicles: site.vehicles,
  mapQuery: site.mapQuery,
  themeColor: site.themeColor,
  web3formsKey: site.web3formsKey,
});

docs.push({
  _id: "navigation",
  _type: "navigation",
  primary: nav.primary.map((l: any, i: number) => ({ _key: `p${i}`, _type: "navLink", ...l })),
  footerColumns: nav.footerColumns.map((c: any, i: number) => ({
    _key: `c${i}`,
    _type: "footerColumn",
    title: c.title,
    links: c.links.map((l: any, j: number) => ({ _key: `c${i}l${j}`, _type: "navLink", ...l })),
  })),
});

for (const [i, c] of courses.items.entries()) {
  docs.push({
    _id: courseId(c.key),
    _type: "course",
    title: c.title,
    key: { _type: "slug", current: c.key },
    tag: c.tag,
    icon: c.icon,
    description: c.description,
    order: (i + 1) * 10,
  });
}

docs.push({
  _id: "pricing",
  _type: "pricing",
  notice: prices.notice,
  disclaimer: prices.disclaimer,
  items: prices.items.map((r: any, i: number) => ({
    _key: `r${i}`,
    _type: "priceRow",
    name: r.name,
    description: r.description,
    ...(r.note ? { note: r.note } : {}),
    ...(r.price !== undefined ? { price: r.price } : {}),
    ...(r.unit ? { unit: r.unit } : {}),
    inquiryOnly: Boolean(r.inquiryOnly),
    ...(r.courseKey
      ? { course: { _type: "reference", _ref: courseId(r.courseKey) } }
      : {}),
  })),
});

docs.push({
  _id: "steps",
  _type: "steps",
  items: steps.items.map((s: any, i: number) => ({ _key: `s${i}`, _type: "stepItem", ...s })),
});

docs.push({
  _id: "faq",
  _type: "faq",
  items: faq.items.map((f: any, i: number) => ({ _key: `f${i}`, _type: "faqItem", ...f })),
});

docs.push({ _id: "reasons", _type: "reasons", items: reasons.items });

for (const slug of ["home", "angebote", "preise", "ablauf", "ueber-uns", "kontakt", "danke"]) {
  const { data, content } = md("pages", slug);
  docs.push({
    _id: `page-${slug}`,
    _type: "page",
    slug,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    hero: { _type: "pageHero", ...data.hero },
    body: content.trim() ? markdownToBlocks(content) : [],
  });
}

for (const slug of ["impressum", "datenschutz", "agb"]) {
  const { data, content } = md("legal", slug);
  docs.push({
    _id: `legal-${slug}`,
    _type: "legalPage",
    slug,
    title: data.title,
    subtitle: data.subtitle,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    body: markdownToBlocks(content),
  });
}

console.log(`${docs.length} Dokumente vorbereitet:`);
for (const d of docs) console.log(`  ${d._type.padEnd(14)} ${d._id}`);

if (DRY) {
  console.log("\n--dry-run: nichts geschrieben.");
  process.exit(0);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

// Alles in einer Transaktion: entweder sind alle Dokumente da oder keines.
// createOrReplace statt create, damit ein zweiter Lauf nicht scheitert.
const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());

try {
  await tx.commit();
  console.log(`\nFertig — ${docs.length} Dokumente in ${projectId}/${dataset} geschrieben.`);
} catch (error) {
  console.error("\nFehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
}
