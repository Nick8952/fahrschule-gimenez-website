# Übergabe – Website Fahrschule Roberto Gimenez

Dieses Dokument beschreibt alles, was nach der Übergabe noch zu tun ist und wie
die Seite langfristig gepflegt wird – auch von jemandem, der sie nicht gebaut hat.

**Inhalt**

1. [CMS-Login einrichten](#1-cms-login-einrichten-einmalig)
2. [Inhalte bearbeiten – Anleitung für die Fahrschule](#2-inhalte-bearbeiten)
3. [Kontaktformular scharf schalten](#3-kontaktformular-scharf-schalten)
4. [Vor dem Go-Live](#4-vor-dem-go-live)
5. [Eigene Domain aufschalten](#5-eigene-domain-aufschalten)
6. [Wenn etwas nicht funktioniert](#6-wenn-etwas-nicht-funktioniert)
7. [Was in der Demo noch geprüft / ersetzt werden muss](#7-was-in-der-demo-noch-geprueft--ersetzt-werden-muss)
8. [Wer was besitzt](#8-wer-was-besitzt)

---

## 1. CMS-Login einrichten (einmalig)

Das CMS liegt unter `…/admin/`. Es speichert direkt ins GitHub-Repository, hat
also keine eigene Datenbank und kein eigenes Passwort – man meldet sich mit dem
GitHub-Konto an. Damit das im Browser funktioniert, braucht es einmalig zwei
Dinge: eine OAuth-App bei GitHub und einen kleinen Vermittler (Cloudflare Worker).
Beides ist gratis und danach nie wieder anzufassen.

### 1a. GitHub-OAuth-App anlegen

1. <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**
2. Ausfüllen:
   - **Application name:** `Fahrschule Gimenez CMS`
   - **Homepage URL:** die Vercel-URL des Projekts (z. B.
     `https://fahrschule-gimenez-website.vercel.app`)
   - **Authorization callback URL:** die Worker-URL aus Schritt 1b plus `/callback`
     (z. B. `https://gimenez-cms-auth.<name>.workers.dev/callback`) – erst
     nach 1b eintragbar, die App lässt sich nachträglich bearbeiten.
3. **Client ID** notieren, **Generate a new client secret** → **Client Secret**
   notieren. Das Secret wird nur einmal angezeigt.

### 1b. Cloudflare Worker deployen

Der Worker ist fertig, es muss nichts programmiert werden.

1. Konto auf <https://dash.cloudflare.com> (gratis).
2. Repository <https://github.com/sveltia/sveltia-cms-auth> öffnen und der
   dortigen Anleitung folgen (**Deploy to Cloudflare Workers**).
3. Im Worker unter **Settings → Variables** drei Werte setzen:
   - `GITHUB_CLIENT_ID` – aus 1a
   - `GITHUB_CLIENT_SECRET` – aus 1a
   - `ALLOWED_DOMAINS` – die Vercel-Domain (später zusätzlich `gimenez.ch`)
4. Die Worker-URL kopieren und in 1a als **Authorization callback URL** + `/callback`
   eintragen.

### 1c. Worker-URL in die Website eintragen

In [`public/admin/config.yml`](public/admin/config.yml), Zeile `base_url`:

```yaml
backend:
  name: github
  repo: Nick8952/fahrschule-gimenez-website
  branch: main
  base_url: https://REPLACE-WITH-SVELTIA-AUTH-WORKER-URL   # ← hier die Worker-URL
```

Ändern, committen, pushen. Nach dem nächsten Vercel-Deploy funktioniert der
Login unter `/admin/`.

### 1d. Betrieb freischalten

Roberto Gimenez braucht ein GitHub-Konto und **Schreibrechte** auf das Repository:
Repo → **Settings → Collaborators → Add people** → Rolle `Write`.

---

## 2. Inhalte bearbeiten

*Diesen Abschnitt kann man Roberto direkt weitergeben.*

### Anmelden

1. `<Vercel-URL>/admin/` öffnen
2. **Login with GitHub** – GitHub-Konto verwenden
3. Links in der Spalte den Bereich wählen, ändern, oben rechts **Publish**

Nach dem Speichern dauert es **rund eine Minute**, bis die Änderung auf der
Website sichtbar ist (Vercel baut automatisch neu). Danach im Browser einmal
neu laden (Strg+F5 / Cmd+Shift+R).

### Welcher Bereich enthält was

| Bereich im CMS | Was man dort ändert |
|---|---|
| **Firmendaten & Einstellungen** | Adresse, Telefon, E-Mail, Sprachen, Fahrzeuge, Demo-Schalter, Formular-Schlüssel |
| **Angebote & Preise** | Die Kursliste (erscheint auch als Routen-Leiste auf der Startseite), die komplette Preistabelle, der Richtpreis-Hinweistext |
| **Ablauf & FAQ** | Die 4 Schritte zum Führerschein, die häufigen Fragen |
| **Weitere Inhalte** | Die Checkliste „Das spricht für uns", Navigation & Fusszeile |
| **Seiten-Texte** | SEO-Titel/-Beschreibung und die Hero-Texte jeder Seite |
| **Rechtstexte** | Impressum, Datenschutz, AGB – inkl. der `[Platzhalter]`, die Roberto noch ausfüllen muss |

### Häufige Aufgaben

**Einen Preis ändern:** Angebote & Preise → Preise → die passende Zeile öffnen,
nur die Zahl eintragen (Feld „Preis (CHF)"), ohne „CHF" und ohne Franken-Zeichen.

**Ein neues Angebot hinzufügen:** Angebote & Preise → Angebote / Kurse →
**Add Angebote**. Der „Schlüssel" muss kleingeschrieben und ohne Leerzeichen
sein (z. B. `intensivkurs`) und wird auch für die Preiszeile gebraucht, falls
dafür ein Preis gelten soll.

**Eine FAQ-Frage ändern oder ergänzen:** Ablauf & FAQ → Häufige Fragen.

**Telefonnummer ändern:** Firmendaten → **beide** Felder anpassen – „Anzeige"
ist das, was man liest, „Wählbar" ist die Nummer, die beim Antippen gewählt
wird (Format `+41796759275`, ohne Leerzeichen).

**Etwas kaputt gemacht?** Jede Änderung ist als Commit gespeichert. Im
GitHub-Repo unter **Commits** die letzte gute Version suchen und zurücksetzen
lassen – nichts geht verloren.

---

## 3. Kontaktformular scharf schalten

Solange kein Schlüssel hinterlegt ist, versendet das Kontaktformular keine
E-Mails. Zum Aktivieren:

1. <https://web3forms.com> öffnen → **Create Access Key** mit `info@gimenez.ch`

   ⚠️ **Wichtig:** Das muss **Roberto Gimenez selbst** machen – er muss die
   Bestätigungsmail an `info@gimenez.ch` empfangen und bestätigen. Ohne
   Zugriff auf dieses Postfach kann niemand sonst diesen Schritt ausführen.
2. Der Schlüssel kommt per Mail an diese Adresse.
3. CMS → **Firmendaten & Einstellungen** → „Web3Forms Zugriffs-Schlüssel" →
   einsetzen → Publish.

Web3Forms ist im Gratis-Tarif auf 250 Nachrichten pro Monat begrenzt – für eine
Einzelfahrschule reichlich.

**Testen:** Formular unter „Kontakt" ausfüllen, absenden, Weiterleitung auf
`/danke/` prüfen, und im Postfach `info@gimenez.ch` nachsehen (auch im
Spam-Ordner).

---

## 4. Vor dem Go-Live

- [ ] **Demo-Modus ausschalten:** CMS → Firmendaten → „Demo-Modus" auf AUS.
      Solange er an ist, steht auf jeder Seite `noindex` und `robots.txt` sperrt
      alles – die Seite taucht bei Google nicht auf. Das ist für eine Demo gewollt.
- [ ] **Echte Preise bestätigen lassen** – die aktuelle Preistabelle sind
      plausible Richtpreise, keine von Roberto bestätigten Zahlen (Abschnitt 7).
- [ ] **Kontaktformular scharf** (Abschnitt 3).
- [ ] **Rechtsform, UID/MWST-Nummer** im Impressum eintragen (aktuell
      `[vom Inhaber zu ergänzen]`).
- [ ] **Kündigungsfrist** in den AGB eintragen (aktuell `[Frist, z. B. 24 Stunden]`).
- [ ] **Echte Fotos** von Fahrlehrer/Fahrzeugen ergänzen, falls gewünscht
      (aktuell keine Fotos, nur Icons/Text – bewusst so gebaut, da im
      Original auch keine vorhanden waren).

---

## 5. Eigene Domain aufschalten

Die Seite läuft heute unter der Vercel-Adresse. Auf `gimenez.ch` umzuziehen
geht so:

1. Vercel-Projekt öffnen → **Settings → Domains** → `gimenez.ch` eingetragen
2. Vercel zeigt die nötigen DNS-Einträge an (meist ein **A-Record** auf die
   Vercel-IP oder ein **CNAME** auf `cname.vercel-dns.com`) – diese beim
   Domain-Anbieter von Roberto eintragen.
3. In [`next.config.mjs`](next.config.mjs) `SITE_ORIGIN` auf
   `https://www.gimenez.ch` (oder ohne `www`, je nach Wahl) anpassen.
4. In [`public/admin/config.yml`](public/admin/config.yml) `site_url`,
   `display_url` und `logo_url` auf die neue Domain ändern.
5. Beim Cloudflare Worker `ALLOWED_DOMAINS` um `gimenez.ch` ergänzen, und in
   der GitHub-OAuth-App die Homepage-URL nachziehen.
6. Demo-Modus aus (Abschnitt 4).

> Ohne Zugriff auf die DNS-Einstellungen der Domain bleibt die Seite unter der
> Vercel-Adresse – das funktioniert vollständig, sieht in der Adresszeile nur
> weniger schön aus.

---

## 6. Wenn etwas nicht funktioniert

**Änderung im CMS ist nach ein paar Minuten nicht sichtbar**
Vercel-Projekt → Reiter **Deployments**. Läuft der oberste Eintrag noch, einfach
warten. Ist er rot/„Failed", den Eintrag öffnen – die Fehlermeldung steht im
Build-Log. Meist ist ein Pflichtfeld leer geblieben. Im CMS ausfüllen und neu
speichern.

**Login unter /admin/ schlägt fehl**
Fast immer stimmt eine der drei URLs nicht überein: `base_url` in `config.yml`,
die **Authorization callback URL** in der GitHub-OAuth-App, oder `ALLOWED_DOMAINS`
im Worker. Alle drei müssen zusammenpassen (Abschnitt 1).

**Formular verschickt nichts**
Schlüssel in den Firmendaten prüfen. Wenn er stimmt: bei Web3Forms einloggen und
schauen, ob das Monatskontingent aufgebraucht ist.

**Die Karte (Anfahrt) ist leer oder falsch**
Der Kartenausschnitt in [`components/MapEmbed.tsx`](components/MapEmbed.tsx) ist
fest auf Seebahnstrasse 127 eingestellt. Bei Adressänderung: auf
<https://www.openstreetmap.org> die neue Adresse suchen, **Teilen → HTML
einbetten**, die `src`-URL übernehmen.

**Die ganze Seite ist weg**
Der Quellcode liegt vollständig im Repository. `npm install && npm run build`
erzeugt sie neu; jeder Webhoster kann den Inhalt von `out/` ausliefern. Es gibt
keine Datenbank, die verloren gehen könnte.

---

## 7. Was in der Demo noch geprüft / ersetzt werden muss

**Preise** – Die komplette Preistabelle (z. B. CHF 95 pro Fahrstunde) sind
plausible **Richtpreise**, keine von Roberto bestätigten Zahlen – die
ursprüngliche Website hatte gar keine Preise veröffentlicht. Auf der Seite
selbst klar als „Richtpreise" gekennzeichnet. Vor dem Go-Live von Roberto
bestätigen und im CMS anpassen.

**Fotos** – Es gibt bewusst keine Fotos (nur Icons/Illustrationen), da im
Original ebenfalls keine brauchbaren Fotos vorhanden waren (nur eine kleine
183×213-Grafik). Bei Bedarf lassen sich Fotos über die üblichen Bild-Felder im
CMS ergänzen.

**Logo** – Das echte Original-Logo (rot-gelber Ring, blauer Globus, weisses
„L") wurde direkt von der alten Website (gimenez.ch) übernommen
(`public/img/logo.png`) – keine Nachbildung, das Original selbst.

**Telefon/E-Mail/Adresse** – `+41 79 675 92 75`, `info@gimenez.ch`,
Seebahnstrasse 127, 8003 Zürich – 1:1 von der bestehenden Website übernommen,
keine Annahme.

**Rechtstexte** – Impressum/Datenschutz/AGB sind Vorlagen mit den üblichen
Platzhaltern (Rechtsform, UID/MWST-Nummer, Kündigungsfrist), die Roberto noch
ausfüllen muss – im Code selbst als „Hinweis für die Fahrschule" markiert.

---

## 8. Wer was besitzt

| | |
|---|---|
| Repository | `github.com/Nick8952/fahrschule-gimenez-website` |
| Hosting | Vercel, Gratis-Tarif (Hobby), keine Laufzeit |
| Domain | `gimenez.ch` – Registrar bei Roberto Gimenez prüfen (falls vorhanden) |
| Schriften | IBM Plex Sans, IBM Plex Mono – SIL Open Font License, frei nutzbar |
| Cloudflare Worker | nur für den CMS-Login, gratis |
| Web3Forms | Gratis-Tarif, 250 Nachrichten pro Monat, an `info@gimenez.ch` gebunden |

**Laufende Kosten: keine, ausser der Domain.**

Damit Roberto die Seite unabhängig weiterbetreiben kann, sollte das Repository
irgendwann auf sein eigenes GitHub-Konto übertragen werden (Repo → **Settings
→ Transfer ownership**) und das Vercel-Projekt in seinem eigenen Vercel-Konto
neu verbunden werden. Danach in `config.yml` und in der OAuth-App den
Kontonamen nachziehen.

Die alte GitLab-Version (`gitlab.com/Nick-tbz/fahrschule-gimenez-website`,
Design "Verkehrsschild" vor der GitHub/Vercel-Migration) bleibt als
eingefrorene Sicherungskopie bestehen, wird aber nicht mehr aktiv gepflegt.
