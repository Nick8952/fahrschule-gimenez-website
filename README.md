# Fahrschule Roberto Gimenez – neue Website

Moderne, responsive und dynamische Website für die **Fahrschule Autoescola Roberto Gimenez**
in Zürich. Neubau der bestehenden Seite (gimenez.ch) – **inhaltlich 1:1 übernommen**,
aber mit zeitgemässem Design, Animationen, Mobil-Optimierung und lokalem SEO.

## 🎯 Ziel
„Vorher/Nachher"-Demo zum Verkauf an den Fahrschul-Inhaber: Die alte Seite ist inhaltlich
dünn und optisch veraltet – diese Version zeigt, wie modern und kundenorientiert es aussehen kann.

## ✨ Features
- **Statische Website** – kein Build nötig, überall hostbar (GitLab Pages, Netlify, Hoststar …)
- **Responsive** – optimiert für Mobil, Tablet und Desktop
- **Dynamische Effekte** – Reveal-on-Scroll, animierte Zähler, Scroll-Fortschritt, Hover-Animationen, sanftes Scrollen, drehendes Lenkrad, mobile Navigation
- **SEO** – Meta-Tags, Open Graph, `schema.org` `DrivingSchool` (Local Business), sprechende Titel
- **Barrierearm** – Fokuszustände, `prefers-reduced-motion`, semantisches HTML
- **Kontaktformular** – öffnet vorbefüllte E-Mail (kein Backend nötig)

## 📁 Struktur (mehrseitige Website + Buchung)
```
fahrschule-gimenez-website/
├── index.html              # Startseite
├── angebote.html           # Angebote & Kurse
├── preise.html             # Preise & Pakete (mit "In den Warenkorb")
├── ueber-uns.html          # Über Roberto Gimenez
├── ablauf.html             # In 4 Schritten zum Führerschein + FAQ
├── kontakt.html            # Kontakt, Formular & Karte
├── warenkorb.html          # Warenkorb
├── kasse.html              # Kasse / Buchungsanfrage
├── bestaetigung.html       # Bestätigung + E-Mail-Übermittlung
├── impressum.html          # Impressum (Vorlage)
├── datenschutz.html        # Datenschutz (revDSG-Vorlage)
├── agb.html                # AGB (Vorlage)
├── robots.txt · sitemap.xml # SEO
├── css/style.css           # Design & Effekte (gemeinsam für alle Seiten)
├── js/main.js              # Interaktivität + Warenkorb-Logik
├── assets/img/             # favicon.svg + archivierte Original-Grafiken
├── INHALT-ORIGINAL.md      # Komplettes Inhalts-Archiv der alten Seite
├── WEITER-ZUHAUSE.md       # Übergabe & Weiterarbeits-Prompt
└── README.md
```

## 🛒 Buchungs-/Checkout-Ablauf
`preise.html` (In den Warenkorb) → `warenkorb.html` (Menge/Entfernen) → `kasse.html`
(Kontaktdaten, Zahlungsart, AGB) → `bestaetigung.html` (Referenznummer + Button, der die
Anfrage per vorbereiteter **E-Mail** an `info@gimenez.ch` sendet). Der Warenkorb lebt im
Browser (localStorage); es findet **keine Online-Zahlung** statt – bewusst als unverbindliche
Buchungsanfrage konzipiert (kann später an ein echtes Zahlungssystem angebunden werden).

## 🚀 Lokal ansehen
Einfach `index.html` im Browser öffnen – oder ein kleiner lokaler Server:

```bash
# Python
python -m http.server 8080
# danach: http://localhost:8080

# oder Node
npx serve .
```

## ☁️ Deployment
- **GitLab Pages:** `.gitlab-ci.yml` mit einem `pages`-Job (public/) hinzufügen
- **Netlify / Vercel:** Repo verbinden, Root als Publish-Verzeichnis
- **Klassisches Hosting (Hoststar):** Dateien per FTP hochladen

## 📝 Inhalt & Datenquelle
Alle Inhalte stammen 1:1 von der bestehenden Seite (gimenez.ch). Der vollständige
Original-Inhalt ist in [`INHALT-ORIGINAL.md`](INHALT-ORIGINAL.md) dokumentiert, damit
nichts verloren geht.

### Noch offen (vom Kunden zu ergänzen)
- Preise / Tarife
- Öffnungszeiten
- Echte Fotos (Fahrlehrer, Fahrzeug)
- Kundenbewertungen
- Konkrete Kursdaten

---
*Neue Website – erstellt als Verkaufs-Demo. Kontakt der Fahrschule: +41 79 675 92 75 · info@gimenez.ch · Seebahnstrasse 127, 8003 Zürich*
