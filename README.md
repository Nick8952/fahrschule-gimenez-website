# Fahrschule Roberto Gimenez – Website

Verkaufs-Demo für die **Fahrschule Autoescola Roberto Gimenez** in Zürich – Neubau der
bestehenden Seite (gimenez.ch), inhaltlich 1:1 übernommen, mit eigenem Design und einer
Inhaltsverwaltung, damit der Kunde die Seite später **selbst** pflegen kann, ganz ohne
Programmierkenntnisse.

## 🎯 Ziel

Nicht nur eine Demo zum Verkauf – sondern eine Seite, die der Kunde in 1–2 Jahren, wenn Nick
nicht mehr involviert ist, selbst bearbeiten kann: Preise anpassen, Texte ändern, Kurse
ergänzen. Anmeldung mit der eigenen E-Mail-Adresse, kein Code, keine Software.

## 🧱 Tech-Stack

- **Next.js 15** (App Router, TypeScript) auf **Vercel**
- **Sanity** als Inhaltsverwaltung, Studio eingebettet unter `/studio`
- **Tailwind CSS** – Design-System «Zürcher Signaletik» (siehe unten)
- **Web3Forms** fürs Kontaktformular (kein eigenes Backend nötig)

Kein statischer Export mehr: die Seiten werden vorgerendert und im Hintergrund erneuert
(ISR, 60 Sekunden). Ein Sanity-Webhook auf `/api/revalidate` macht Änderungen sofort
sichtbar — sonst wäre eine Änderung im Studio erst nach dem nächsten Build zu sehen.

## 🎨 Design: «Zürcher Signaletik»

Gebaut wie ein Schweizer Verkehrssicherheits-Informationssystem: reines Weiss als
Grundfläche, strenges **linksbündiges** Raster, Haarlinien statt Karten-Schatten, Mono für
Zahlen und Mikro-Labels. Farbe kommt aus dem echten Logo (Signalrot + Warngold) und aus dem
einen Hero-Foto — sonst nichts.

Signatur ist die **Milchglas-Tafel** (`.tafel`) über dem Hero-Foto: der Text steht auf der
Tafel, nicht auf dem Foto, dadurch ist der Kontrast unabhängig vom Bildinhalt. Das Foto
bleibt der Startseite vorbehalten; Unterseiten bekommen ein dunkles Graphitfeld.

Typografie: **Archivo** (Überschriften) + **IBM Plex Sans** (Fliesstext) + **IBM Plex Mono**
(Preise, Labels).

## 📁 Struktur

```
app/               Next.js App Router – eine Route pro Seite
app/studio/        Sanity Studio (die Bearbeitungsoberfläche)
app/api/revalidate Webhook-Ziel, macht Änderungen sofort sichtbar
components/        UI-Bausteine (Header, Footer, RouteStrip/Steps, Formular, …)
sanity/            Schemas, Abfragen, Studio-Struktur, Lesezugriff
lib/               Datenzugriff, Markdown→Portable-Text, SEO-Helfer
scripts/seed.ts    Schiebt data/ und content/ einmalig nach Sanity
data/, content/    Ausgangsbestand + Rückfall, wenn Sanity nicht erreichbar ist
```

**Zur Doppelspurigkeit von `data/`+`content/` und Sanity:** die Dateien sind die Quelle für
`npm run seed` und dienen gleichzeitig als Rückfall. Solange kein Sanity-Projekt verbunden
ist (oder die API klemmt), rendert die Seite aus ihnen — dieselbe Datenform, deshalb merken
die Komponenten den Unterschied nicht. Siehe `sanity/fetch.ts`.

## ✏️ Inhalte bearbeiten

Siehe [`HANDOVER.md`](HANDOVER.md) – enthält die einmalige Einrichtung (Sanity-Projekt,
Vercel, Webhook) und die Anleitung für den Kunden.

## 🚀 Lokal entwickeln

```bash
npm install
cp .env.example .env.local   # und ausfüllen
npm run dev                  # http://localhost:3000
npm run seed -- --dry-run    # zeigt, was nach Sanity geschrieben würde
npm run build
```

Ohne ausgefüllte `.env.local` läuft die Seite trotzdem – dann aus `data/` und `content/`,
und `/studio` zeigt eine Anleitung statt der Bearbeitungsoberfläche.

## 📜 Historie

Vorher: Sveltia CMS (Git-basiert, Login über GitHub) auf statischem Export. Umgestellt auf
Sanity, weil der Kunde dafür kein GitHub-Konto und keinen Repo-Zugriff braucht.

Die ursprüngliche handgebaute statische Version (HTML/CSS/JS) sowie eine erste
Next.js-Fassung mit GitLab-Hosting sind unter `gitlab.com/Nick-tbz/fahrschule-gimenez-website`
als eingefrorene Sicherungskopie erhalten (Branch `archive/v1-static`).

---
*Neue Website – erstellt als Verkaufs-Demo. Kontakt der Fahrschule: +41 79 675 92 75 ·
info@gimenez.ch · Seebahnstrasse 127, 8003 Zürich*
