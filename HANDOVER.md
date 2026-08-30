# Übergabe & Bedienung

## 1. Einmalige Einrichtung (durch Nick, vor der Übergabe)

### a) GitLab-OAuth-App für das CMS-Login

Es gibt dafür keine API – einmal von Hand in GitLab:

1. `https://gitlab.com/-/user_settings/applications` öffnen → **Add new application**
2. **Name:** `Fahrschule Gimenez – Website CMS`
3. **Redirect URI:** `https://fahrschule-gimenez-website-1a2f88.gitlab.io/admin/`
   (exakt so, mit Schrägstrich am Ende)
4. **Confidential:** Häkchen **entfernen**
5. **Scopes:** nur **`api`**
6. **Save application** → die **Application ID** kopieren
7. In `public/admin/config.yml` bei `backend.app_id` einsetzen, committen/pushen.

### b) Web3Forms-Schlüssel für das Kontaktformular

1. `https://web3forms.com` öffnen → E-Mail `info@gimenez.ch` eingeben → **Create Access Key**

   ⚠️ **Wichtig:** Nick hat **keinen Zugriff** auf `info@gimenez.ch`. Dieser Schritt muss von
   **Roberto Gimenez selbst** ausgeführt werden – er muss die Bestätigungsmail empfangen und
   bestätigen. Ohne diesen Schritt kommen keine Formular-Anfragen an, auch wenn alles andere
   fertig ist.
2. Den Schlüssel aus der Bestätigungsmail kopieren
3. In `data/site.json` bei `web3formsKey` einsetzen (oder später im CMS unter
   „Firmendaten & Einstellungen") → committen/pushen.

Ohne (a) kann sich niemand ins CMS einloggen; ohne (b) kommen keine Formular-Anfragen an. Die
Website funktioniert als Demo trotzdem – beide Schritte blockieren nur das CMS-Login bzw. den
echten Formularversand, nicht das Anschauen der Seite.

---

## 2. Inhalte bearbeiten (für Roberto)

1. **`https://fahrschule-gimenez-website-1a2f88.gitlab.io/admin/`** aufrufen
2. **„Sign in with GitLab"** → mit dem GitLab-Konto anmelden, das Zugriff auf das Projekt hat
3. Links eine Sammlung wählen, Felder ausfüllen, oben rechts **„Publish"**
4. Nach ~1–2 Minuten ist die Änderung live (GitLab baut die Seite automatisch neu)

**Was wo bearbeitbar ist:**

| Im CMS unter … | ändert … |
|---|---|
| Firmendaten & Einstellungen | Adresse, Telefon, E-Mail, Sprachen, Fahrzeuge, **Demo-Modus**, **Web3Forms-Key** |
| Angebote & Preise | Kursliste (auch der Route-Strip!), Preistabelle, Richtpreis-Hinweis |
| Ablauf & FAQ | 4-Schritte-Weg, häufige Fragen |
| Weitere Inhalte | Checkliste „Das spricht für uns", Navigation & Footer |
| Seiten-Texte | SEO-Titel/-Beschreibung, Hero-Texte je Seite |
| Rechtstexte | Impressum, Datenschutz, AGB – inkl. der `[Platzhalter]`, die Roberto noch ausfüllen muss |

---

## 3. Go-Live (wenn der Kunde zusagt)

1. **Demo-Modus aus:** CMS → „Firmendaten & Einstellungen" → `demo` auf **AUS** → Publish.
   (Entfernt `noindex` und die `robots.txt`-Sperre.)
2. **Eigene Domain** (`gimenez.ch`): GitLab → Projekt → **Deploy → Pages → New domain**,
   DNS setzen (CNAME/ALIAS + Verifizierungs-TXT). Danach:
   - `next.config.mjs`: `SITE_ORIGIN` auf `https://www.gimenez.ch` anpassen
   - `public/admin/config.yml`: `site_url` / `display_url` / `logo_url` anpassen
   - GitLab-OAuth-App: Redirect URI auf `https://www.gimenez.ch/admin/` ändern

---

## 4. Projekt an den Kunden übergeben (Nick raus)

1. GitLab → Projekt → **Settings → General → Advanced → Transfer project** in den
   Namespace/die Gruppe des Kunden.
2. Neue **GitLab-OAuth-App** im Kundenkonto anlegen (Schritt 1a), `config.yml` `repo` + `app_id`
   anpassen.
3. Kunde bekommt **Maintainer**-Rechte im Projekt (für CMS-Schreibzugriff).
4. **Web3Forms-Key** ist bereits an `info@gimenez.ch` gebunden – bleibt gültig, kann im
   Web3Forms-Dashboard rotiert werden.
5. CMS-Bundle bei Bedarf aktualisieren: neue Datei von
   `https://unpkg.com/@sveltia/cms@<version>/dist/sveltia-cms.js` nach
   `public/admin/sveltia-cms.js` legen + committen.

---

## 5. Fallback, falls das CMS-Login nicht klappt

Sveltia CMS nutzt den GitLab-PKCE-Flow (kein Server). Wenn GitLab das irgendwann nicht mehr
unterstützt: auf **Decap CMS** wechseln (`config.yml` ist kompatibel) und einen
`sveltia-cms-auth`- bzw. `netlify-cms-oauth-provider`-Worker (kostenlos, Cloudflare Workers)
als OAuth-Proxy davorschalten.
