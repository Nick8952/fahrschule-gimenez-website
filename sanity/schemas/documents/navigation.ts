import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "primary",
      title: "Hauptmenü",
      type: "array",
      of: [{ type: "navLink" }],
      description: "Die Links in der Kopfzeile. Reihenfolge per Ziehen ändern.",
    }),
    defineField({
      name: "footerColumns",
      title: "Fusszeilen-Spalten",
      type: "array",
      of: [{ type: "footerColumn" }],
      description: "Die Linkspalten in der Fusszeile.",
    }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});
