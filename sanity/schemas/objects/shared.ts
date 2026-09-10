import { defineField, defineType } from "sanity";

/* Wiederverwendbare Bausteine. Alle Beschriftungen und Hilfetexte auf Deutsch,
   damit im Studio nichts steht, was der Kunde nachschlagen muesste. */

/** Auswahlliste statt Freitext: nur Symbole, die es im Code wirklich gibt. */
export const ICON_OPTIONS = [
  { title: "Auto", value: "car" },
  { title: "Taxi", value: "taxi" },
  { title: "Motorrad", value: "moto" },
  { title: "Nothelfer / Erste Hilfe", value: "medical" },
  { title: "Buch", value: "book" },
  { title: "Theorie", value: "theory" },
  { title: "Abzeichen / Weiterbildung", value: "badge" },
];

export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Beschriftung",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Ziel",
      type: "string",
      description: 'Seitenpfad, z. B. "/preise" oder "/kontakt".',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const footerColumn = defineType({
  name: "footerColumn",
  title: "Fusszeilen-Spalte",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Spaltentitel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "links", title: "Links", type: "array", of: [{ type: "navLink" }] }),
  ],
  preview: { select: { title: "title", links: "links" } },
});

export const pageHero = defineType({
  name: "pageHero",
  title: "Seitenkopf",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kleine Zeile darueber",
      type: "string",
      description: "Kurzes Label ueber der Ueberschrift, z. B. „Kursangebot“.",
    }),
    defineField({
      name: "title",
      title: "Ueberschrift",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lead",
      title: "Einleitungstext",
      type: "text",
      rows: 3,
      description: "Zwei bis drei Saetze direkt unter der Ueberschrift.",
    }),
  ],
});

export const stepItem = defineType({
  name: "stepItem",
  title: "Schritt",
  type: "object",
  fields: [
    defineField({
      name: "n",
      title: "Nummer",
      type: "number",
      description: "Reihenfolge des Schritts (1, 2, 3 …).",
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", title: "Beschreibung", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "body", n: "n" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Frage & Antwort",
  type: "object",
  fields: [
    defineField({ name: "q", title: "Frage", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Antwort", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "q", subtitle: "a" } },
});

export const priceRow = defineType({
  name: "priceRow",
  title: "Preiszeile",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Bezeichnung",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Beschreibung", type: "text", rows: 2 }),
    defineField({
      name: "course",
      title: "Gehoert zu Kurs",
      type: "reference",
      to: [{ type: "course" }],
      description: "Bestimmt nur, welches Symbol angezeigt wird. Darf leer bleiben.",
    }),
    defineField({
      name: "inquiryOnly",
      title: "Nur auf Anfrage",
      type: "boolean",
      description: "Angehakt: Statt eines Preises erscheint „Auf Anfrage“.",
      initialValue: false,
    }),
    defineField({
      name: "note",
      title: "Zusatz vor dem Preis",
      type: "string",
      description: 'Zum Beispiel „ab“. Darf leer bleiben.',
      hidden: ({ parent }) => Boolean(parent?.inquiryOnly),
    }),
    defineField({
      name: "price",
      title: "Preis in CHF",
      type: "number",
      description: "Nur die Zahl, ohne „CHF“.",
      hidden: ({ parent }) => Boolean(parent?.inquiryOnly),
    }),
    defineField({
      name: "unit",
      title: "Einheit",
      type: "string",
      description: 'Zum Beispiel „/ Lektion“ oder „/ Kurs“.',
      hidden: ({ parent }) => Boolean(parent?.inquiryOnly),
    }),
  ],
  preview: {
    select: { title: "name", price: "price", unit: "unit", inquiryOnly: "inquiryOnly" },
    prepare: ({ title, price, unit, inquiryOnly }) => ({
      title,
      subtitle: inquiryOnly ? "Auf Anfrage" : `CHF ${price ?? "?"} ${unit ?? ""}`.trim(),
    }),
  },
});

/** Fliesstext mit Ueberschriften, Fett/Kursiv und Links - bewusst ohne Bilder
    und ohne Zwischenformate, damit im Editor nichts kaputtgehen kann. */
export const richText = defineType({
  name: "richText",
  title: "Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Zwischentitel", value: "h2" },
      ],
      lists: [{ title: "Aufzaehlung", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "Adresse",
                type: "string",
                description: 'Volle Adresse (https://…), "/seite" oder "mailto:…".',
                validation: (r: any) => r.required(),
              },
            ],
          },
        ],
      },
    },
  ],
});
