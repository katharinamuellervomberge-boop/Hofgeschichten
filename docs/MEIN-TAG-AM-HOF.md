# Hofgeschichten – Mein Tag am Hof

*Dein Pferd. Dein Stall. Dein Tag.* – Pferdepflege-Spiel für 6–12 Jahre (seit 05.11.2026).

Route: **`/hoftag`** · Kacheln auf Start, Spielen und Hofwelt.

## Ablauf
1. Willkommen (Hanna) → **Pferd wählen** (Tivoli, Tonga, Scrabble)
2. Startbildschirm: „Guten Morgen, Tivoli!“, Porträt, sechs Statuswerte, *Deine nächste Aufgabe*, Tagesfortschritt, Hof · Hofbuch · Erfolge
3. Fünf Tagesabschnitte mit 25–27 Aufgaben (Morgen, Vormittag, Mittag, Nachmittag, Abend)
4. „Der Hof wird ruhig.“ (Sonnenuntergang → Dämmerung → Stalllicht) → Tagesauswertung

## Dateien
| Bereich | Datei |
|---|---|
| Datenmodell | `src/content/hoftag/types.ts` |
| Tagesablauf & Aufgaben | `src/content/hoftag/day.ts` |
| Pferdeprofile, Beobachtungen | `src/content/hoftag/horses.ts` |
| 15 Zufallsereignisse, Fundstücke | `src/content/hoftag/events.ts` |
| Nachmittagsaktivitäten | `src/content/hoftag/activities.ts` |
| Putzen (Werkzeuge, Reihenfolge) | `src/content/hoftag/groom.ts` |
| Level, Vertrauen, Abzeichen | `src/content/hoftag/progression.ts` |
| Hofbuch (Wissenskarten, Bereiche) | `src/content/hoftag/hofbuch.ts` |
| Hofkarte (Bereiche) | `src/content/hoftag/places.ts` |
| Bild-Platzhalter | `src/content/hoftag/assets.ts` |
| Spiellogik (reine Funktionen) | `src/features/hoftag/engine.ts` |
| Oberfläche | `src/features/hoftag/*.tsx`, `hoftag.module.css` |
| Spielstand | `progress.hoftag` in `src/lib/progress` (localStorage, `migrate.ts`) |
| Freischaltung | `meinTagAmHof` in `content/products.ts`, `hoftagAccess()` in `lib/entitlements/server.ts` |

## Aufgabenarten
`goto` (Hofkarte) · `choice` (Frage, z. B. JA/NEIN) · `check` (Stellen anschauen) · `collect` (Mist → Schubkarre, Einstreu, Heu, Aufräumen) · `fill` (Wasser) · `feed` (Futter wählen) · `groom` (Putzzeug an die richtige Stelle) · `activity` (Spaziergang, Bodenarbeit, Stangen).

Neue Aufgabe = neuer Eintrag in `day.ts`. IDs nie ändern (stehen im Spielstand). Texte ohne Pronomen für das Pferd, stattdessen `{name}` (Tongas Geschlecht ist offen).

## Regeln (Game Design)
- Kein Verfall über echte Zeit, kein krankes/trauriges Pferd nach Pausen, keine Countdowns, keine Käufe für Futter oder Pflege.
- Fehler: „Fast! …“ / „Tilda hat einen Tipp …“ und neuer Versuch. Kein Game Over.
- Vertrauen sinkt nie. Nach mehr als zwei Tagen Pause: „Schön, dass du wieder auf dem Hof bist!“

## Freischaltung
- Mitglieder: inklusive (`includedInMembership: true`).
- Einzelkauf: Kennung `mein-tag-am-hof`, geplanter Shopify-Handle `die-hofgeschichten-mein-tag-am-hof`, Titel muss „Die Hofgeschichten – Mein Tag am Hof …“ lauten. Preis und `checkoutUrl` sind noch `null` → kein Kauf-Knopf.
- Ohne Freischaltung: erster Hoftag zum Kennenlernen (Zähler auf dem Gerät – bewusst weich, da das Spiel keine geschützten Medien enthält).
- Codes über `/admin` („Spiel: Mein Tag am Hof“).

## Vorbereitet, noch nicht gebaut
Wetter/Jahreszeiten (`RandomEvent.when`, `weight`), weitere Pferde (`HorseId`, `horseProfiles`), weitere Bereiche (`PlaceId`, `places.ts`), Abzeichen/Streaks (`BADGES`), Pferdekarten und besondere Momente im Hofbuch, gemalte Szenen (`assets.ts`).
