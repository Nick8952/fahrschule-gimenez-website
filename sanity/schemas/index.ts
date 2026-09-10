import type { SchemaTypeDefinition } from "sanity";

import { course } from "./documents/course";
import { faq, pricing, reasons, steps } from "./documents/collections";
import { legalPage, page } from "./documents/pages";
import { navigation } from "./documents/navigation";
import { siteSettings } from "./documents/siteSettings";
import {
  faqItem,
  footerColumn,
  navLink,
  pageHero,
  priceRow,
  richText,
  stepItem,
} from "./objects/shared";

/** Dokumenttypen, die es genau einmal gibt. Sie bekommen im Studio keinen
    «Neues Dokument»-Knopf, damit niemand aus Versehen ein zweites anlegt. */
export const singletonTypes = [
  "siteSettings",
  "navigation",
  "pricing",
  "steps",
  "faq",
  "reasons",
] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  // Bausteine
  navLink,
  footerColumn,
  pageHero,
  stepItem,
  faqItem,
  priceRow,
  richText,

  // Einmalige Dokumente
  siteSettings,
  navigation,
  pricing,
  steps,
  faq,
  reasons,

  // Sammlungen
  course,
  page,
  legalPage,
];
