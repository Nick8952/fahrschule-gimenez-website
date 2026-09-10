import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Grundeinstellungen",
  type: "document",
  groups: [
    { name: "firma", title: "Firma", default: true },
    { name: "kontakt", title: "Kontakt & Adresse" },
    { name: "unterricht", title: "Unterricht" },
    { name: "technik", title: "Technisches" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name der Fahrschule",
      type: "string",
      group: "firma",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "legalName",
      title: "Vollständiger Firmenname",
      type: "string",
      group: "firma",
      description: "Für Impressum und Rechtstexte.",
    }),
    defineField({
      name: "owner",
      title: "Inhaber",
      type: "string",
      group: "firma",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Kurzbeschreibung",
      type: "string",
      group: "firma",
      description: "Ein Satz. Erscheint in der Fusszeile.",
    }),
    defineField({
      name: "blurb",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      group: "firma",
      description: "Zwei bis drei Sätze. Wird auch von Google in den Suchergebnissen angezeigt.",
    }),

    defineField({
      name: "address",
      title: "Adresse",
      type: "object",
      group: "kontakt",
      fields: [
        defineField({
          name: "street",
          title: "Strasse und Nummer",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({ name: "zip", title: "PLZ", type: "string", validation: (r) => r.required() }),
        defineField({ name: "city", title: "Ort", type: "string", validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "object",
      group: "kontakt",
      fields: [
        defineField({
          name: "display",
          title: "Angezeigte Nummer",
          type: "string",
          description: "So, wie sie auf der Seite stehen soll: +41 79 675 92 75",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "tel",
          title: "Wählbare Nummer",
          type: "string",
          description: "Ohne Leerzeichen, für den Anruf-Knopf: +41796759275",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      group: "kontakt",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "mapQuery",
      title: "Adresse für die Routenplanung",
      type: "string",
      group: "kontakt",
      description: "Wird an Google Maps übergeben, wenn jemand auf «Route öffnen» tippt.",
    }),

    defineField({
      name: "languages",
      title: "Unterrichtssprachen",
      type: "array",
      of: [{ type: "string" }],
      group: "unterricht",
      description: "Erscheinen als Schilder auf der Startseite. Reihenfolge per Ziehen ändern.",
    }),
    defineField({
      name: "vehicles",
      title: "Schulwagen",
      type: "object",
      group: "unterricht",
      fields: [
        defineField({
          name: "models",
          title: "Fahrzeugmarken",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "gearNote",
          title: "Hinweis zum Getriebe",
          type: "string",
          description: "Zum Beispiel: Handschaltung – Automat auf Wunsch möglich",
        }),
      ],
    }),

    defineField({
      name: "demo",
      title: "Demo-Modus",
      type: "boolean",
      group: "technik",
      description:
        "Angehakt: Die Seite wird von Google ausgeschlossen. Vor dem echten Start ausschalten.",
      initialValue: true,
    }),
    defineField({
      name: "web3formsKey",
      title: "Schlüssel für das Kontaktformular",
      type: "string",
      group: "technik",
      description:
        "Zugangsschlüssel von web3forms.com. Ohne diesen Schlüssel werden Anfragen nicht zugestellt.",
    }),
    defineField({
      name: "themeColor",
      title: "Farbe der Browserleiste",
      type: "string",
      group: "technik",
      description: "Farbwert wie #FFFFFF. Betrifft nur die Leiste am oberen Rand auf Mobilgeräten.",
    }),
  ],
  preview: { prepare: () => ({ title: "Grundeinstellungen" }) },
});
