import {
  CogIcon,
  DocumentTextIcon,
  DocumentsIcon,
  HelpCircleIcon,
  MenuIcon,
  OlistIcon,
  TagIcon,
  ThListIcon,
  CheckmarkCircleIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

/**
 * Die Seitenleiste des Studios.
 *
 * Zwei Gründe für die eigene Struktur statt der automatischen Liste:
 *
 * 1. Die einmaligen Dokumente (Grundeinstellungen, Preise, Ablauf …) bekommen
 *    keinen «Neu»-Knopf. Zwei Preislisten hätte nie jemand gebraucht, aber
 *    jeder hätte sie anlegen können.
 * 2. Die Reihenfolge folgt dem, was der Kunde am häufigsten ändert — nicht dem
 *    Alphabet. Preise stehen deshalb weit oben, Rechtstexte ganz unten.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalte")
    .items([
      S.listItem()
        .title("Preise")
        .icon(TagIcon)
        .child(S.document().schemaType("pricing").documentId("pricing")),

      S.listItem().title("Kurse").icon(ThListIcon).child(
        S.documentTypeList("course")
          .title("Kurse")
          .defaultOrdering([{ field: "order", direction: "asc" }]),
      ),

      S.listItem()
        .title("Ablauf")
        .icon(OlistIcon)
        .child(S.document().schemaType("steps").documentId("steps")),

      S.listItem()
        .title("Häufige Fragen")
        .icon(HelpCircleIcon)
        .child(S.document().schemaType("faq").documentId("faq")),

      S.listItem()
        .title("Argumente")
        .icon(CheckmarkCircleIcon)
        .child(S.document().schemaType("reasons").documentId("reasons")),

      S.divider(),

      S.listItem()
        .title("Seitentexte")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("page").title("Seitentexte")),

      S.divider(),

      S.listItem()
        .title("Grundeinstellungen")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.listItem()
        .title("Navigation")
        .icon(MenuIcon)
        .child(S.document().schemaType("navigation").documentId("navigation")),

      S.listItem()
        .title("Rechtstexte")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("legalPage").title("Rechtstexte")),
    ]);
