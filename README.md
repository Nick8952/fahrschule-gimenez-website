# Fahrschule Roberto Gimenez – Website (v2, Next.js + CMS)

Verkaufs-Demo für die **Fahrschule Autoescola Roberto Gimenez** in Zürich – Neubau der
bestehenden Seite (gimenez.ch), inhaltlich 1:1 übernommen, mit modernem Design und einem
Content-Management-System, damit der Kunde die Seite später **selbst** pflegen kann, ganz
ohne Programmierkenntnisse.

## 🎯 Ziel

Nicht nur eine Demo zum Verkauf – sondern eine Seite, die der Kunde in 1–2 Jahren, wenn Nick
nicht mehr involviert ist, selbst wie eine gewohnte Website-Baukasten-Lösung bearbeiten kann:
Preise anpassen, Texte ändern, Kurse ergänzen – alles über ein Formular im Browser, kein Code.

## 🧱 Tech-Stack

- **Next.js 15** (App Router, TypeScript, statischer Export für GitLab Pages)
- **Tailwind CSS** – Design-System "Route Stamp" (siehe unten)
- **Framer Motion** – gezielte Animation (Hero-Stempel)
- **Sveltia CMS** unter `/admin/` – Git-basiertes CMS, editierbar wie eine gewohnte Website,
  speichert aber direkt als Commits im Repo (kein eigenes Backend nötig)

## 🎨 Design: "Route Stamp"

Signalrot aus dem echten Logo-Ring als Hauptakzent, warmes Papier-Hell als Grundfläche,
tiefes Routenblau nur als knappe dunkle Fläche (Footer). Das echte Gimenez-Logo wird im Hero
als schräg gestempeltes Reise-Stempel-Motiv inszeniert; gestrichelte "Routen"-Linien
verbinden die Angebote wie Stationen auf einer Strecke (`RouteStamp`, `RouteStrip`,
`RouteSteps`). Typografie: Bricolage Grotesque (Display) + Figtree (Text) + DM Mono
(Preise/Kürzel).

## 📁 Struktur

```
app/            Next.js App Router – eine Route pro Seite
components/     UI-Bausteine (Header, Footer, RouteStamp/Strip/Steps, Formular, …)
content/pages/  SEO-Texte & Hero-Texte je Seite (Markdown-Frontmatter)
content/legal/  Impressum, Datenschutz, AGB (Markdown)
data/           Strukturierte Inhalte als JSON (Firmendaten, Kurse, Preise, FAQ, Navigation)
lib/            Typisierter Zugriff auf data/*.json und content/**/*.md
public/admin/   Sveltia CMS (vendored, kein CDN nötig)
```

## ✏️ Inhalte bearbeiten

Siehe [`HANDOVER.md`](HANDOVER.md) für die vollständige Anleitung (inkl. der zwei einmaligen
Einrichtungsschritte: GitLab-OAuth-App fürs CMS-Login, Web3Forms-Schlüssel fürs
Kontaktformular).

## 🚀 Lokal entwickeln

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # erzeugt den statischen Export in out/
```

## ☁️ Deployment

GitLab Pages via `.gitlab-ci.yml` (`node:22-alpine`, `npm ci && npm run build`, `out/` →
`public/`). Live-URL: `https://fahrschule-gimenez-website-1a2f88.gitlab.io/`.

## 📜 Historie

Die ursprüngliche handgebaute statische Version (HTML/CSS/JS, mit Warenkorb-Checkout-Flow)
ist unter dem Branch `archive/v1-static` bzw. Tag `v1-static-demo` archiviert.

---
*Neue Website – erstellt als Verkaufs-Demo. Kontakt der Fahrschule: +41 79 675 92 75 ·
info@gimenez.ch · Seebahnstrasse 127, 8003 Zürich*
