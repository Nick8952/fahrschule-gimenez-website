# Übergabe – Website Fahrschule Roberto Gimenez

Diese Anleitung richtet sich an zwei Personen:

- **Abschnitt 1–3** an denjenigen, der die Website technisch einrichtet (einmalig).
- **Abschnitt 4–6** an Roberto Gimenez, der die Inhalte danach selbst pflegt.

---

## Worauf die Website läuft

| Teil | Dienst | Wofür |
|---|---|---|
| Website | **Vercel** | Liefert die Seiten aus, weltweit und verschlüsselt |
| Programmcode | **GitHub** | Speichert den Bauplan der Website |
| Inhalte | **Sanity** | Texte, Preise, Kurse – das, was bearbeitet wird |
| Kontaktformular | **Web3Forms** | Leitet Anfragen an die E-Mail-Adresse weiter |

Es gibt **keinen eigenen Server und keine Datenbank**, die gewartet werden
müssten. Die Seiten sind fertig gebaut, wenn ein Besucher sie öffnet — deshalb
laden sie schnell und es gibt nichts, was gehackt oder überlastet werden kann.

---

## 1. Sanity-Projekt anlegen (einmalig)

1. Auf <https://sanity.io> mit der E-Mail-Adresse anmelden.
2. **Create new project** → Name zum Beispiel `Fahrschule Gimenez`,
   Dataset `production`, Sichtbarkeit **Public** (dann braucht die Website
   kein Lese-Token).
3. Unter **API → Tokens** einen Token mit der Rolle **Editor** erstellen.
   Dieser Token wird nur einmal angezeigt — jetzt kopieren.
4. Unter **API → CORS origins** eintragen (jeweils mit *Allow credentials*):
   - `http://localhost:3000`
   - die spätere Vercel-Adresse, zum Beispiel `https://gimenez.vercel.app`
   - die eigene Domain, sobald sie verbunden ist

## 2. Inhalte einspielen

Die bestehenden Texte liegen im Projekt unter `data/` und `content/`. Das
Skript schiebt sie einmalig nach Sanity:

```bash
# .env.local anlegen (Vorlage: .env.example) und ausfüllen:
#   NEXT_PUBLIC_SANITY_PROJECT_ID=...
#   NEXT_PUBLIC_SANITY_DATASET=production
#   SANITY_API_WRITE_TOKEN=...

npm run seed -- --dry-run   # zeigt nur an, was passieren würde
npm run seed                # schreibt die 23 Dokumente
```

Das Skript kann gefahrlos mehrfach laufen: die Dokumente haben feste Namen und
werden überschrieben, nicht dupliziert.

## 3. Vercel verbinden

1. Auf <https://vercel.com> mit dem GitHub-Konto anmelden.
2. **Add New → Project** → das Repository importieren.
3. Unter **Settings → Environment Variables** eintragen:

   | Name | Wert |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | die Projekt-ID aus Sanity |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` |
   | `NEXT_PUBLIC_SITE_URL` | die endgültige Adresse, z. B. `https://gimenez.ch` |
   | `SANITY_REVALIDATE_SECRET` | ein selbst ausgedachtes Passwort |
   | `SANITY_API_READ_TOKEN` | nur nötig, wenn das Dataset **Private** ist |

   Den **Schreib**-Token (`SANITY_API_WRITE_TOKEN`) hier **nicht** eintragen —
   der gehört nur auf den eigenen Rechner.

4. **Deploy** drücken. Ab jetzt baut Vercel bei jeder Code-Änderung automatisch neu.

5. In Sanity unter **API → Webhooks** einen Webhook anlegen:

   | Feld | Wert |
   |---|---|
   | URL | `https://<deine-adresse>/api/revalidate` |
   | Dataset | `production` |
   | Trigger on | Create, Update, Delete |
   | Secret | derselbe Wert wie `SANITY_REVALIDATE_SECRET` |

   Ohne diesen Webhook dauert es bis zu einer Minute, bis eine Änderung
   sichtbar wird. Mit ihm sind es wenige Sekunden.

---

## 4. Inhalte bearbeiten (für Roberto)

**Adresse:** `https://<deine-website>/studio`
**Anmeldung:** mit der E-Mail-Adresse, an die die Einladung ging. Kein
zusätzliches Passwort, keine Software zum Installieren. Geht auch am Handy.

Links in der Leiste stehen die Bereiche, oben nach Häufigkeit sortiert:

| Bereich | Was drin steht |
|---|---|
| **Preise** | Alle Beträge, der Hinweistext darüber und das Kleingedruckte |
| **Kurse** | Die sieben Kurse mit Beschreibung und Symbol |
| **Ablauf** | Die vier Schritte zum Führerschein |
| **Häufige Fragen** | Fragen und Antworten |
| **Argumente** | Die Liste unter «Das spricht für uns» |
| **Seitentexte** | Überschriften und Einleitungen jeder Seite, plus Google-Texte |
| **Grundeinstellungen** | Adresse, Telefon, E-Mail, Sprachen, Fahrzeuge |
| **Navigation** | Die Menüpunkte oben und in der Fusszeile |
| **Rechtstexte** | Impressum, Datenschutz, AGB |

**So läuft eine Änderung ab:**

1. Bereich anklicken, Feld ändern.
2. Unten rechts auf **Publish** tippen.
3. Nach ein paar Sekunden neu laden — fertig.

Solange nicht auf *Publish* getippt wurde, ändert sich auf der Website nichts.
Man kann also gefahrlos etwas ausprobieren.

**Reihenfolge ändern:** In Listen (Preise, Kurse, Sprachen) den Punkt am
Anfasser links greifen und verschieben.

**Etwas kaputt gemacht?** Oben rechts im Studio gibt es eine Versionsgeschichte.
Jeder frühere Stand lässt sich zurückholen.

## 5. Kontaktformular scharfschalten

Das muss Roberto selbst machen, weil dafür Zugriff auf das Postfach
`info@gimenez.ch` nötig ist:

1. Auf <https://web3forms.com> die E-Mail-Adresse eintragen.
2. Den zugeschickten Access Key kopieren.
3. Im Studio unter **Grundeinstellungen → Technisches → Schlüssel für das
   Kontaktformular** einfügen, **Publish** drücken.
4. Auf der Website eine Testanfrage senden und prüfen, ob sie ankommt.

Ohne diesen Schlüssel werden abgeschickte Anfragen **nicht zugestellt**.

## 6. Vor dem echten Start

- [ ] **Preise prüfen.** Die aktuellen Zahlen sind Richtwerte, keine echten Tarife.
- [ ] **Rechtstexte ergänzen.** Überall, wo *[vom Inhaber zu ergänzen]* steht.
- [ ] **Datenschutzerklärung:** Sanity und Vercel als Dienstleister aufnehmen.
- [ ] **Demo-Modus ausschalten** (Grundeinstellungen → Technisches). Solange er
      an ist, wird die Seite bei Google nicht gefunden.
- [ ] **Kontaktformular** testen (Abschnitt 5).
- [ ] **Eigene Domain** in Vercel verbinden und `NEXT_PUBLIC_SITE_URL` anpassen.
- [ ] Auf dem Handy durchklicken: Anrufen, Route öffnen, Formular abschicken.

---

## Wem gehört was

| | |
|---|---|
| Domain | Roberto Gimenez |
| GitHub-Repository | wird auf Robertos Konto übertragen |
| Vercel-Projekt | wird auf Robertos Konto übertragen |
| Sanity-Projekt | wird auf Robertos Konto übertragen |
| Inhalte, Logo, Fotos | Roberto Gimenez |

Nach der Übergabe läuft nichts mehr über fremde Konten.

---

## Wenn etwas nicht funktioniert

**Das Studio zeigt «Noch kein Sanity-Projekt verbunden»**
Die Umgebungsvariablen in Vercel fehlen oder sind falsch geschrieben. Nach dem
Eintragen muss einmal neu deployt werden.

**Anmeldung im Studio schlägt fehl / weisse Seite**
Die Adresse der Website fehlt in Sanity unter *API → CORS origins*. Dort mit
*Allow credentials* eintragen.

**Änderung ist nach dem Publish nicht sichtbar**
Bis zu einer Minute warten und neu laden. Bleibt es dabei, stimmt der Webhook
nicht (Abschnitt 3, Schritt 5) oder das Secret weicht ab.

**Die Karte auf der Kontaktseite zeigt die falsche Stelle**
Das Kartenbild `public/img/standort.jpg` ist fest hinterlegt und muss bei einem
Umzug neu erzeugt werden. Die Adresse darunter kommt aus den Grundeinstellungen
und lässt sich im Studio ändern.

**Anfragen kommen nicht an**
Web3Forms-Schlüssel prüfen (Abschnitt 5). Auch in den Spam-Ordner schauen.
