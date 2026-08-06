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

## 📁 Struktur
```
fahrschule-gimenez-website/
├── index.html              # Komplette Seite (One-Pager)
├── css/style.css           # Design & Effekte
├── js/main.js              # Interaktivität
├── assets/img/
│   ├── favicon.svg         # Neues Favicon
│   ├── hero-original.jpg   # Original-Grafik der alten Seite (archiviert)
│   └── logo-original.png   # Original-Icon der alten Seite (archiviert)
├── INHALT-ORIGINAL.md      # Komplettes Inhalts-Archiv der alten Seite
└── README.md
```

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
