import { defineField, defineType } from "sanity";

/* Die vier Listen, die es je genau einmal gibt.
   Bewusst als ein Dokument mit einer Liste darin statt als viele Einzel-
   dokumente: der Kunde sieht alles an einer Stelle und ändert die Reihenfolge
   direkt per Ziehen, ohne ein Sortierfeld verstehen zu müssen. */

export const pricing = defineType({
  name: "pricing",
  title: "Preise",
  type: "document",
  fields: [
    defineField({
      name: "notice",
      title: "Hinweis über der Preisliste",
      type: "text",
      rows: 4,
      description: "Erscheint im roten Kasten oberhalb der Preise.",
    }),
    defineField({
      name: "items",
      title: "Preiszeilen",
      type: "array",
      of: [{ type: "priceRow" }],
    }),
    defineField({
      name: "disclaimer",
      title: "Kleingedrucktes",
      type: "text",
      rows: 2,
      description: "Zusatz zu Zahlungsarten und Unverbindlichkeit.",
    }),
  ],
  preview: { prepare: () => ({ title: "Preise" }) },
});

export const steps = defineType({
  name: "steps",
  title: "Ablauf",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Schritte",
      type: "array",
      of: [{ type: "stepItem" }],
      description: "Die Schritte zum Führerschein, in der Reihenfolge des Ablaufs.",
    }),
  ],
  preview: { prepare: () => ({ title: "Ablauf" }) },
});

export const faq = defineType({
  name: "faq",
  title: "Häufige Fragen",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Fragen",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Häufige Fragen" }) },
});

export const reasons = defineType({
  name: "reasons",
  title: "Argumente",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Punkte",
      type: "array",
      of: [{ type: "string" }],
      description: "Die Liste unter «Das spricht für uns». Je ein kurzer Satz.",
    }),
  ],
  preview: { prepare: () => ({ title: "Argumente" }) },
});
