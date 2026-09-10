import { defineField, defineType } from "sanity";

/** Die festen Seiten der Website. Neue Seiten anzulegen ergibt keinen Sinn,
    solange es dafür keine Route im Code gibt — deshalb ist die Auswahl eine
    feste Liste statt eines freien Textfelds. */
const PAGE_SLUGS = [
  { title: "Startseite", value: "home" },
  { title: "Angebote", value: "angebote" },
  { title: "Preise", value: "preise" },
  { title: "Ablauf", value: "ablauf" },
  { title: "Über uns", value: "ueber-uns" },
  { title: "Kontakt", value: "kontakt" },
  { title: "Danke (nach dem Absenden)", value: "danke" },
];

const LEGAL_SLUGS = [
  { title: "Impressum", value: "impressum" },
  { title: "Datenschutz", value: "datenschutz" },
  { title: "AGB", value: "agb" },
];

export const page = defineType({
  name: "page",
  title: "Seite",
  type: "document",
  groups: [
    { name: "inhalt", title: "Inhalt", default: true },
    { name: "seo", title: "Google & Suche" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Welche Seite",
      type: "string",
      options: { list: PAGE_SLUGS, layout: "dropdown" },
      group: "inhalt",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hero",
      title: "Seitenkopf",
      type: "pageHero",
      group: "inhalt",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Fliesstext",
      type: "richText",
      group: "inhalt",
      description: "Nur auf «Über uns» in Verwendung. Auf den anderen Seiten darf das leer bleiben.",
    }),
    defineField({
      name: "seoTitle",
      title: "Titel im Browser-Tab und bei Google",
      type: "string",
      group: "seo",
      description: "Rund 60 Zeichen. Wird bei Google als blaue Überschrift angezeigt.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "Beschreibung bei Google",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Rund 155 Zeichen. Der graue Text unter dem Google-Eintrag.",
    }),
  ],
  preview: {
    select: { slug: "slug", title: "hero.title" },
    prepare: ({ slug, title }) => ({
      title: PAGE_SLUGS.find((p) => p.value === slug)?.title ?? slug,
      subtitle: title,
    }),
  },
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Rechtstext",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Welcher Text",
      type: "string",
      options: { list: LEGAL_SLUGS, layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Überschrift",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Zeile unter der Überschrift",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "richText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "Titel im Browser-Tab",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Beschreibung bei Google",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { slug: "slug", title: "title" },
    prepare: ({ slug, title }) => ({
      title: LEGAL_SLUGS.find((p) => p.value === slug)?.title ?? slug,
      subtitle: title,
    }),
  },
});
