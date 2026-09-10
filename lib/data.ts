/* Zentraler, typisierter Zugriff auf die Inhalte.
 *
 * Quelle ist Sanity. Solange kein Sanity-Projekt verbunden ist (oder die API
 * gerade nicht antwortet), kommen die Dateien in data/*.json zum Zug — dieselbe
 * Datenform, damit die Komponenten den Unterschied nicht merken.
 *
 * Alle Zugriffe sind asynchron. Server-Komponenten holen sich die Daten mit
 * await; Client-Komponenten (SiteHeader) bekommen sie als Props durchgereicht.
 */

import { sanityFetch } from "@/sanity/fetch";
import {
  coursesQuery,
  faqQuery,
  navQuery,
  pricesQuery,
  reasonsQuery,
  siteQuery,
  stepsQuery,
} from "@/sanity/queries";

import siteFallback from "@/data/site.json";
import navFallback from "@/data/nav.json";
import coursesFallback from "@/data/courses.json";
import pricesFallback from "@/data/prices.json";
import stepsFallback from "@/data/steps.json";
import faqFallback from "@/data/faq.json";
import reasonsFallback from "@/data/reasons.json";

export type Site = {
  demo: boolean;
  name: string;
  legalName: string;
  owner: string;
  tagline: string;
  blurb: string;
  address: { street: string; zip: string; city: string };
  phone: { display: string; tel: string };
  email: string;
  languages: string[];
  vehicles: { models: string[]; gearNote: string };
  mapQuery: string;
  themeColor: string;
  web3formsKey: string;
};

export type NavLink = { label: string; href: string };
export type Nav = {
  primary: NavLink[];
  footerColumns: { title: string; links: NavLink[] }[];
};

export type Course = {
  key: string;
  title: string;
  tag: string;
  icon: string;
  description: string;
};

export type PriceRow = {
  courseKey?: string;
  name: string;
  description: string;
  note?: string;
  price?: number;
  unit?: string;
  inquiryOnly?: boolean;
};

export type Prices = { notice: string; disclaimer: string; items: PriceRow[] };
export type Step = { n: number; title: string; body: string };

export const getSite = () => sanityFetch<Site>(siteQuery, () => siteFallback as Site);

export const getNav = () => sanityFetch<Nav>(navQuery, () => navFallback as Nav);

export const getCourses = () =>
  sanityFetch<{ items: Course[] }>(coursesQuery, () => coursesFallback as { items: Course[] });

export const getPrices = () => sanityFetch<Prices>(pricesQuery, () => pricesFallback as Prices);

export const getSteps = () =>
  sanityFetch<{ items: Step[] }>(stepsQuery, () => stepsFallback as { items: Step[] });

export const getFaq = () =>
  sanityFetch<{ items: { q: string; a: string }[] }>(faqQuery, () => faqFallback);

export const getReasons = () =>
  sanityFetch<{ items: string[] }>(reasonsQuery, () => reasonsFallback);

/** Findet den Kurs zu einem Preis-Zeilen-Kuerzel (fuer das Symbol). */
export function courseFor(courses: Course[], courseKey: string | undefined): Course | undefined {
  if (!courseKey) return undefined;
  return courses.find((c) => c.key === courseKey);
}
