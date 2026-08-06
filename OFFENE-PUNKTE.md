# 📌 Offene Punkte – was noch erledigt werden muss

Die Website ist **verkaufsbereit** (12 Seiten, kompletter Buchungs-/Checkout-Ablauf,
Rechtsseiten, SEO). Die folgenden Punkte konnte ich **nicht selbst** erledigen – sie
brauchen entweder Daten/Entscheidungen vom Kunden oder ein Backend/externe Dienste.

Stand: August 2026

---

## 1) Echte Online-Zahlung (Kreditkarte / TWINT abbuchen) ❌
**Warum nicht möglich:** Eine echte Zahlung braucht einen Zahlungsanbieter wie
**Stripe** oder **Datatrans** plus ein Konto/Backend des Kunden. Auf einer rein
statischen Website (nur HTML/CSS/JS) ist das technisch nicht umsetzbar.
**Aktueller Stand:** Bewusst als **unverbindliche Buchungsanfrage** gebaut – kein Geldfluss.
**Nächster Schritt:** Bei Bedarf Stripe/Datatrans-Konto einrichten und ein kleines
Backend (oder Zahlungs-Link) anbinden.

## 2) Automatischer Formularversand ohne E-Mail-Programm ❌
**Warum nicht möglich:** Ohne Server/Backend kann eine statische Seite keine E-Mails
selbst versenden.
**Aktueller Stand:** Kontakt- und Buchungsformular öffnen das **E-Mail-Programm** des
Besuchers mit vorbereiteter Nachricht an `info@gimenez.ch` (`mailto:`).
**Nächster Schritt:** Für automatischen Versand einen Dienst wie **Formspree**,
**Basin** oder ein eigenes Backend anbinden.

## 3) Echte Preise ⚠️
**Warum offen:** Ich kenne die tatsächlichen Tarife der Fahrschule nicht.
**Aktueller Stand:** Auf `preise.html` stehen **Richtpreise**, klar als solche markiert.
**Nächster Schritt:** Roberto Gimenez bestätigt die echten Preise → in `preise.html` ersetzen.

## 4) Impressum / Datenschutz / AGB ⚠️
**Warum offen:** Rechtstexte müssen zur echten Firma passen und geprüft werden.
**Aktueller Stand:** Als **Vorlagen mit `[Platzhaltern]`** angelegt (z. B. Rechtsform,
UID/MwSt.-Nummer, Absagefristen).
**Nächster Schritt:** Platzhalter ausfüllen und **rechtlich prüfen** lassen.

## 5) Echte Fotos & Logo ⚠️
**Warum offen:** Es liegen keine hochauflösenden Bilder vor.
**Aktueller Stand:** Modernes Design mit CSS/SVG-Grafiken als Platzhalter.
**Nächster Schritt:** Professionelle Fotos (Fahrlehrer, Auto, Motorrad) + Logo einbauen.

## 6) Live schalten (Hosting) ❌ (von mir nicht ausführbar)
**Warum nicht möglich:** Ich kann das Hosting nicht selbst aktivieren.
**Nächster Schritt (eine Option wählen):**
- **GitLab Pages:** in GitLab → *Deploy → Pages* aktivieren (die `.gitlab-ci.yml` ist fertig), **oder**
- **Hoststar (bestehend):** Dateien per **FTP** hochladen.

---

## Optionale Verbesserungen (nice to have)
- Mehrsprachige Unterseiten (ES / PT / IT / EN / FR)
- Lighthouse-Check (Performance / SEO / Accessibility)
- Öffnungszeiten, konkrete Kursdaten, Kundenbewertungen ergänzen (sobald vom Kunden vorhanden)
