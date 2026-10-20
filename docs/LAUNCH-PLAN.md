# Launch-Plan „Die Hofgeschichten – Interactive Detective Edition“

Ziel: verkaufsfähige Web-App am **Samstag, 31.10.2026 (Halloween)**.
Empfehlung: Go-live **Freitag, 30.10.**, damit Familien das Halloween-Wochenende nutzen können und ein Tag Puffer bleibt.

## Stand 19.10.2026 – erledigt (Entwicklung)

- [x] Hörspiele aus Navigation entfernt (`features.audio = false`), Code bleibt erhalten
- [x] Datengetriebener Spielkern mit 5 Schritt-Typen und 2 Stufen (Leicht 4–6, Mittel 7–9)
- [x] Kostenlose Hofwelt: Pferde kennenlernen (Körperteile), Pflegeprofi (Drag & Drop + Tippen),
      Quiz „Was braucht ein Pferd?“, Pferdesprache, Abenteuerpass
- [x] Echte Steckbriefe Tivoli, Scrabble, Tonga
- [x] Premium-Fall „Das Geheimnis der Geisterweide“ – 5 Missionen, Detektivbuch, Abzeichen, wiederholbar
- [x] Serverseitige Freischaltung (Shopify-Bestellung + Ersatzweg Codes), signiertes Cookie
- [x] Elternbereich mit Preis, Shop-Link, Freischaltung, Datenschutz, Altersstufen
- [x] Pferdeporträts (Aquarelle) und echte Fellfarben
- [x] KI-Vorlesestimme vorbereitet, **für den Launch ausgeschaltet** (Entscheidung 20.10.) – kommt mit den Hörspielen

## Priorisierte Aufgaben bis zum Launch

| Tag | Aufgabe | Wer | Priorität |
|---|---|---|---|
| Mo 19.–Di 20.10. | Story & Rätsel abnehmen (Leicht/Mittel), Reitlehrerin als Figur bestätigen | H&H | Muss |
| ~~Di 20.10.~~ | ~~Porträts aller Pferde~~ – erledigt 19.10. (Aquarelle eingebaut) | H&H | erledigt |
| Di 20.10. | Geschlecht von Tonga bestätigen | H&H | Soll |
| Di 20.10. | Krümel: echter Hund? Dann Foto/Merkmale für die Illustration | H&H | Soll |
| Mi 21.10. | Projekt auf GitHub + Vercel, erste Vorschau-URL | H&H / Entwicklung | Muss |
| ~~Mi 21.10.~~ | ~~Illustrationen an echte Fellfarben anpassen~~ – erledigt 19.10. | Entwicklung | erledigt |
| Do 22.10. | Shopify-Produkt (7,90 €, Handle `das-geheimnis-der-geisterweide`) anlegen | H&H | Muss |
| Do 22.10. | Dev-Dashboard-App + Umgebungsvariablen (siehe PREMIUM-FREISCHALTUNG.md) | H&H | Muss |
| Fr 23.10. | Impressum, Datenschutzerklärung, AGB/Widerruf digitale Inhalte (juristisch prüfen) | H&H | Muss |
| Fr 23.10. | Bestellbestätigung um Freischalt-Hinweis ergänzen | H&H | Muss |
| Mo 26.10. | Testkauf (100-%-Code) + Freischalttest + Gegenproben | beide | Muss |
| Di 27.10. | Gerätetest: iPhone (Safari), Android (Chrome), iPad | beide | Muss |
| Di 27.10. | Test mit 2–3 Kindern (4–6 und 7–9 Jahre) | H&H | Soll |
| Mi 28.–Do 29.10. | Korrekturen aus Tests; Do abends Code-Freeze | Entwicklung | Muss |
| Fr 30.10. | Go-live: Domain, Shop-Produkt sichtbar, Ankündigung | H&H | Muss |
| Sa 31.10. | Halloween – Monitoring, Support-Postfach für Freischaltfragen | H&H | Muss |

**Notfallplan Freischaltung:** Ist die Shopify-Anbindung am 26.10. nicht stabil, werden
Freischaltcodes erzeugt (`npm run codes`) und manuell/per Lizenz-App nach dem Kauf verschickt.
Die App unterstützt beide Wege parallel.

## Bewusst nach dem Launch

- Stufe 10–12 Jahre (eigene Rätsel-Varianten)
- November-Abenteuer, Weihnachts-Detektivwelt, winterliche Lernmissionen (Datenstruktur vorbereitet)
- Hörspielbibliothek (Schalter `features.audio`)
- Familienmitgliedschaft mit Elternkonto, Datenbank und geräteübergreifendem Fortschritt
