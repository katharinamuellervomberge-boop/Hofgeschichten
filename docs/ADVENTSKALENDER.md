# Adventskalender „HOFgeschichten – Das Geheimnis des Winterhofs“

24 Tage. 24 Abenteuer. Ein Weihnachtsgeheimnis. Für Kinder von 5–12 Jahren, Dezember 2026.
Gebaut am 03.11.2026 auf Branch `adventskalender-winterhof` (nicht in `main`).

## Seiten
| Adresse | Inhalt |
|---|---|
| `/adventskalender` | Winterhof, heutiges Türchen bzw. Countdown, 24 Hufeisen, 24 Türchen, Stall, Urkunde, Fundbuch, Angebot für Eltern |
| `/adventskalender/1` … `/24` | Kapitel → Aufgabe(n) → goldenes Hufeisen + Fundstück (+ Dekoration) |
| `/adventskalender/stall` | „Mein Weihnachtsstall“ – jederzeit schmücken |
| `/adventskalender/urkunde` | Urkunde (nach Türchen 24), Name freiwillig, wird nicht gespeichert, druckbar |

Startseite: neue Kachel über der Reitakademie. Leiste unten unverändert (der Kalender markiert „Hofwelt“).
Elternbereich: eigener Produkteintrag unter „Premium-Inhalte & Freischaltung“.

## Dateien
- Inhalte (zentral, nur Server): `src/content/advent/doors.server.ts` (+ `doors-1`, `doors-2`) – 24 Türchen mit Kapitel, Teilen, Fundstück, Teaser
- Datum: `src/content/advent/schedule.ts` · Zugriff/Angebot: `src/content/advent/access.server.ts`
- Dekorationen + Karte: `src/content/advent/decor.ts` · Spielarten: `src/content/advent/games.ts`
- Bilder: `src/components/illustrations/advent/` (Winterstall mit Deko-Plätzen, Suchbilder, goldenes Hufeisen)
- Oberfläche: `src/features/advent/` · Seiten: `src/app/adventskalender/`
- Prüfung: `npm run check:advent` (24 Türchen, Wortzahlen, Lösbarkeit, Szenen, Deko-Ziele, Datumsfälle)

## Spielarten (5 Komponenten)
QuizGame (`choice`/`multi`), MatchGame (`match`), FindGame (`hotspots`), DecisionGame (`choice` mit Rückmeldung je Wahl) –
alle über den vorhandenen Spielkern `src/engine` – und DecorateGame (`features/advent/DecorateGame.tsx`, Stall und Karte).
Geheimschrift (Tür 8, 23) und Zahlencode (Tür 17, Lösung 4-3-2) nutzen die vorhandenen Schritte `cipher`/`code`.
Falsche Antworten geben immer einen Tipp und dürfen wiederholt werden.

## Datum und Freischaltung
- Türchen n öffnet am n. Dezember 2026, 00:00 Uhr Europe/Berlin – **geprüft auf dem Server**, bevor Inhalte ausgeliefert werden.
- Verpasste Türchen bleiben offen; nach dem 24.12. bleibt alles offen (mindestens bis 31.01.2027, technisch unbegrenzt).
- Vor dem 1.12. Countdown. Türchen 1 ist kostenlos (`adventskalender.freeDoors`).
- **Testen vor Dezember:** in Vercel-Vorschau oder lokal `?testdatum=2026-12-06` anhängen (wird an alle Links weitergereicht).
  In der Produktion (`VERCEL_ENV=production`) wird der Parameter immer ignoriert. Lokal mit `next start`: `ADVENT_TEST_DATES=1`.

## Zugang und Verkauf (Shop-Produkte aktiv seit 03.11.2026, Bilder in public/shop)
| Angebot | Preis | Freischaltung |
|---|---|---|
| Adventskalender | 12,90 € | Shopify-Handle `die-hofgeschichten-adventskalender-das-geheimnis-des-winterhofs` oder Code (Kennung `adventskalender`) |
| Reitakademie-Kunden | 8,90 € | gleiches Produkt + Shopify-Rabattcode (siehe unten) |
| Paket Reitakademie + Adventskalender | 25,00 € | Handle `die-hofgeschichten-reitakademie-adventskalender` → schaltet beides frei |
| Hof-Jahresmitglieder (auch Hofpost) | inklusive | gültige Mitgliedschaft auf dem Gerät |

Bestehende Codes und Produkte bleiben unverändert. Die neue Code-Kennung `adventskalender` (ID „R6“) kollidiert mit keiner bestehenden.
Codes erzeugen: `/admin` → „Adventskalender: Das Geheimnis des Winterhofs“ oder `npm run codes -- adventskalender 50`.

**Zum Öffnen des Verkaufs (manuell):**
1. In Shopify zwei digitale Produkte mit genau diesen Handles anlegen. Titel müssen mit „Die Hofgeschichten –“ beginnen und
   „Adventskalender“ enthalten; das Paket zusätzlich „Reitakademie + Adventskalender“ (Rückfall-Erkennung am Titel).
2. Shop-Links in `src/content/products.ts` → `adventskalender.checkoutUrl` und `bundleCheckoutUrl` eintragen (vorher keine Kauf-Knöpfe).
3. Akademie-Preis: In Shopify einen Rabattcode (4,00 € auf das Kalender-Produkt) anlegen, **berechtigt nur für ein Kundensegment
   „hat Reitakademie gekauft“** und einmal pro Kunde. Den Code bei Vercel als `ADVENT_ACADEMY_DISCOUNT_CODE` hinterlegen.
   Die App zeigt den Rabatt-Link nur Geräten, auf denen die Reitakademie serverseitig freigeschaltet ist – die eigentliche
   Absicherung ist die Segment-Beschränkung in Shopify (ohne sie könnte ein weitergegebener Code missbraucht werden).
4. Bestellbestätigung um den Freischalt-Satz ergänzen (wie bei der Akademie).

## Fortschritt
Nur lokal auf dem Gerät (`hofgeschichten.progress.v1` → `advent`): abgeschlossene Türchen (= Hufeisen, je Tür nur einmal),
freigeschaltete Dekorationen, Stallgestaltung, Karte für Tivoli, letzter Spielstand (Türchen + Abschnitt). Kein Konto,
keine Synchronisierung zwischen Geräten (wird so auch angezeigt). Der Name auf der Urkunde wird nie gespeichert.

## Geschichte in Kürze
Die Kinder finden ein goldenes Hufeisen und einen Brief von „M.“. Hinweise: Brett mit 24 Nägeln, altes Foto, Wunschzettel von „W.“,
Schnitzerei „M + F“, Regeln der „Hufeisenweihnacht“, Messingschild „Fanny“, Wilhelms Karte (Geheimschrift → Heulager), Spuren zur
verschlossenen Kiste, Marthas Brief mit dem Code, Bündel „Erst am Heiligen Abend öffnen“. M. = Martha Lindner (Hannas Oma, 88),
W. = Wilhelm, der jede Nacht ein Hufeisen vergoldet. Die Kinder laden Martha heimlich ein. Heiligabend: Lichterritt, Martha kommt,
das Hufeisenbuch (Wünsche, Erinnerungen, gute Taten) wird gemeinsam geöffnet, die Kinder führen die Tradition weiter.
Tonga wird geschlechtsneutral erzählt (Geschlecht noch offen). Keine Gefahr, kein Schnee vorausgesetzt, Stallregeln realistisch
(LED statt Kerzen, Deko außer Reichweite, keine Eibe).

## Geprüft (03.11.2026)
`check:advent`, `check:akademie`, `check:premium` grün; Typprüfung ohne Fehler; alle 24 Türchen automatisch im Browser
durchgespielt (24 Hufeisen, 18 Dekorationen, Wiederholung gibt kein zusätzliches Hufeisen); Datumsfälle 30.11., 1.12., 6.12.,
7.12. 00:00, 24.12., 25.12., 1.1., 31.1., Sommer 2027; Mobil 390 px und Desktop 1100 px.
Offen: echter `next build` (nur bei Vercel möglich), Klicktest in der Vorschau, fachliche Abnahme der Texte.
