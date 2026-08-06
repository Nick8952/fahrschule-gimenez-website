# 🏠 Weiterarbeiten auf dem privaten Laptop

Diese Datei fasst zusammen, **wo das Projekt steht** und **wie du zuhause nahtlos weitermachst** –
inklusive fertigem Prompt für Claude Code.

---

## 1) Repository holen

```bash
git clone https://gitlab.com/Nick-tbz/fahrschule-gimenez-website.git
cd fahrschule-gimenez-website
```

> Beim `git clone` nach GitLab-Benutzername + Passwort fragt Git nach einem
> **Personal Access Token** (nicht dein Login-Passwort). Token unter
> gitlab.com → Settings → Access Tokens erstellen (Scope `write_repository` oder `api`).

Website lokal ansehen:
```bash
python -m http.server 8080      # dann http://localhost:8080
# oder: npx serve .
```

---

## 2) Was ist bereits fertig ✅

- **Mehrseitige Website** mit durchgängiger Navigation:
  `index.html` (Start), `angebote.html`, `ueber-uns.html`, `ablauf.html` (inkl. FAQ-Akkordeon), `kontakt.html`
- Alle Inhalte von gimenez.ch **1:1** übernommen, plus Zusatzinfos aus dem fahrlehrer.ch-Profil
  (6 Sprachen inkl. Français, Schulwagen FIAT/SEAT, Theorie in allen Theoriesprachen)
- Modernes, responsives Design + dynamische Effekte (Reveal-on-Scroll, animierte Zähler,
  Scroll-Fortschritt, mobile Navigation, Hover-Effekte, Klick-zu-Anruf)
- SEO: Meta-Tags, Open Graph, `schema.org DrivingSchool`
- Kontaktformular (öffnet vorbefüllte E-Mail), OpenStreetMap-Karte
- `INHALT-ORIGINAL.md` = vollständiges Archiv der alten Seite (nichts verloren)
- `.gitlab-ci.yml` für automatisches GitLab-Pages-Deployment

## 3) Was noch offen ist 🔧 (Ideen für nächste Schritte)

- **Echte Inhalte vom Kunden einbauen:** Preise, Öffnungszeiten, echte Fotos, Kursdaten, Bewertungen
- Eigene professionelle **Fotos** (Fahrlehrer, Auto, Motorrad) statt Platzhalter-Grafiken
- **Logo** in guter Qualität
- Optional: mehrsprachige Versionen (ES/PT/IT/EN) als Unterseiten
- Optional: Kontaktformular an echtes Backend/Formspree anbinden
- **Live schalten:** GitLab Pages aktivieren oder auf bestehendes Hosting (Hoststar) per FTP hochladen
- Feinschliff: Lighthouse-Check (Performance/SEO/Accessibility)

---

## 4) 📋 Fertiger Prompt für Claude Code (zuhause einfügen)

> Kopiere den folgenden Block und füge ihn in Claude Code ein, nachdem du das Repo
> geklont und Claude Code im Projektordner gestartet hast:

```
Ich arbeite an einer neuen Website für die "Fahrschule Autoescola Roberto Gimenez"
(Zürich) als Verkaufs-Demo. Das ist eine statische Website (HTML/CSS/JS) im aktuellen
Ordner. Der komplette Stand und die offenen Punkte stehen in WEITER-ZUHAUSE.md, der
gesicherte Originalinhalt der alten Seite in INHALT-ORIGINAL.md.

Bitte lies zuerst WEITER-ZUHAUSE.md, INHALT-ORIGINAL.md, index.html, css/style.css und
js/main.js, um den Stand zu verstehen. Danach möchte ich weitermachen mit:
[HIER DEIN NÄCHSTER WUNSCH, z.B. "echte Preise und Öffnungszeiten einbauen" oder
"das Design in Grün/Weiss umfärben" oder "eine spanische Unterseite erstellen"].

Wichtig: Der bestehende Inhalt darf nicht verloren gehen, die Seite soll Kunden
ansprechen und moderne, dynamische Effekte behalten. Committe sinnvoll und pushe
regelmässig auf GitLab (origin/main).
```

---

## 5) GitLab-Projekt
- **Repo:** https://gitlab.com/Nick-tbz/fahrschule-gimenez-website
- **Branch:** `main`
- **Original-Seite als Referenz:** https://www.gimenez.ch
