/* Zentraler, typisierter Zugriff auf die CMS-Inhalte in data/*.json.
   Alles wird zur Build-Zeit eingelesen (statischer Export). */

import site from "@/data/site.json";
import nav from "@/data/nav.json";
import courses from "@/data/courses.json";
import prices from "@/data/prices.json";
import steps from "@/data/steps.json";
import faq from "@/data/faq.json";
import reasons from "@/data/reasons.json";

export { site, nav, courses, prices, steps, faq, reasons };

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

/** Findet das Angebot zu einem Preis-Zeilen-Schlüssel (für Icon/Verlinkung). */
export function courseFor(courseKey: string | undefined): Course | undefined {
  return (courses.items as Course[]).find((c) => c.key === courseKey);
}
