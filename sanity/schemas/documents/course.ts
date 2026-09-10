import { defineField, defineType } from "sanity";

import { ICON_OPTIONS } from "../objects/shared";

export const course = defineType({
  name: "course",
  title: "Kurs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kursname",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "key",
      title: "Kürzel",
      type: "slug",
      options: { source: "title", maxLength: 40 },
      description: "Technisches Kürzel für die Verlinkung. Auf «Generate» tippen genügt.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tag",
      title: "Kurzlabel",
      type: "string",
      description: "Steht klein unter dem Kursnamen, zum Beispiel: Obligatorisch",
    }),
    defineField({
      name: "icon",
      title: "Symbol",
      type: "string",
      options: { list: ICON_OPTIONS, layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      description: "Kleinere Zahl steht weiter vorne.",
      validation: (r) => r.required().integer(),
    }),
  ],
  orderings: [
    { title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "tag" },
  },
});
