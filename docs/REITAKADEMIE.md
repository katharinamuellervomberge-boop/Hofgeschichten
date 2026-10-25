# Die kleine Reitakademie

Kostenlose Lernwelt im Bereich **Spielen** (`/spielen/akademie`): 8 Lernwelten × 5 Lektionen,
4 Mini-Spiele, 8 Abzeichen und die Auszeichnung „Hofgeschichten – Reitwissen-Profi“ mit druckbarer
Urkunde im Elternbereich. Keine Bezahlfunktion, keine externen Dienste, keine Vorlesefunktion.

## Wo liegt was?

| Was | Datei |
|---|---|
| Lerninhalte (Texte, Fragen, Antworten, Rückmeldungen) | `src/content/akademie/welten/w1-…ts` bis `w8-…ts` |
| Mini-Spiele | `src/content/akademie/spiele.ts` |
| Datenmodell (Lektion, Frage, Audio-Felder, Prüfstatus) | `src/content/akademie/types.ts` |
| Lektion → Ablauf im Spielkern | `src/content/akademie/activity.ts` |
| Abzeichen | `src/content/akademie/stamps.ts` |
| Illustrationen (Reiterin, Reitbahn, Fußfolgen, Helm, Hände) | `src/components/illustrations/akademie/` |
| Seiten | `src/app/spielen/akademie/…`, Oberflächen in `src/features/akademie/` |
| Inhaltsprüfung | `scripts/check-akademie.ts` (`npm run check:akademie`) |

## Aufbau einer Lektion

Jede Lektion hat eine feste ID `ra-w<Welt>-l<Nummer>` (z. B. `ra-w3-l2`). Der Fortschritt hängt an dieser ID –
**IDs nie ändern**, sonst gehen gespeicherte Fortschritte verloren. Titel, Slug und Texte dürfen geändert werden.

Ablauf in der App: Einstieg (ein Hofkind) → Erklärung mit Bild (Leicht: kurz, Mittel: ausführlicher) →
Fachbegriffe (nur Mittel) → Übung → Quiz (je Stufe mindestens 3 Fragen) → Merksatz.

- Texte, die sich je Stufe unterscheiden, stehen als `{ leicht: "…", mittel: "…" }`.
- Fragen oder Antworten nur für eine Stufe bekommen `levels: ["mittel"]` bzw. `levels: ["leicht"]`.
- Jede falsche Antwort braucht eine `feedback`-Rückmeldung, jede Frage eine `explain`-Rückmeldung für die richtige Antwort.
- `readTogether: true` zeigt in Stufe Leicht den Hinweis „gemeinsam mit einem Erwachsenen lesen“.
- `practiceNote` erscheint als Hinweis für Erwachsene unter der Lektion.

## Redaktionelle Prüfung

Alle Lektionen stehen auf `review: { status: "entwurf" }`. Nach der fachlichen Abnahme durch eine Reitlehrkraft
den Status je Lektion auf `"geprueft"` setzen (mit `by` und `date`). Im Code reicht dafür:

```ts
review: { status: "geprueft", by: "Name", date: "2026-10-27" },
```

Nach jeder Änderung `npm run check:akademie` ausführen. Das Skript prüft: 8 Welten, 40 Lektionen, je Stufe
mindestens 3 Fragen mit 3–4 Antworten und genau einer richtigen, Rückmeldungen vorhanden, Zuordnungen und
Suchbilder lösbar, IDs eindeutig, keine Platzhalter-Wörter.

## Hörfassung (später)

Jede Lektion hat `audio: { intro, explanation, merksatz }` mit `src: null`, Fragen ein optionales `audio`-Feld.
Es gibt bewusst noch keine Wiedergabe. Wenn Hörfassungen kommen, Dateien z. B. unter
`public/audio/akademie/ra-w1-l1-intro.mp3` ablegen und den Pfad in `src` eintragen.

## Fortschritt und Abzeichen

- Abgeschlossene Lektionen werden wie die Lernspiele lokal gespeichert (`progress.games[<Lektions-ID>]`).
  Es gibt kein Konto; beim Gerätewechsel oder Löschen der Browserdaten geht der Fortschritt verloren.
  Darauf weisen die Akademie-Startseite und der Elternbereich hin.
- Abzeichen werden aus dem Fortschritt abgeleitet (neue Regel `activities`): eins je Lernwelt, wenn alle fünf
  Lektionen geschafft sind, und „Reitwissen-Profi“ nach allen 40 Lektionen. Sie erscheinen im Pass im
  Abschnitt „Reitakademie“.
- Die Urkunde druckt man im Elternbereich. Der eingegebene Name wird nicht gespeichert.
  Hinweis auf der Urkunde: spielerischer Wissensnachweis, kein offizieller Reitpass.

## Erweiterungen am Spielkern (abwärtskompatibel)

- Neuer Schritt-Typ `multi` (Mehrfachauswahl mit „Prüfen“) – `src/engine/steps/MultiStep.tsx`.
- Antworten mit ganzen Szenen werden als große Bildkarten (2 Spalten) gezeigt.
- Neuer Dokument-Stil `lesson` für Merksatz und Fachbegriffe.
- Bild-Symbole mit Präfix `ak-` (`AkIcons.tsx`) und Szenen mit Präfix `ak-` (`scenes.tsx`, Liste in `scene-names.ts`).
  Suchbilder brauchen die volle Szene, nicht die Nahansichten (`…-nah`); das Prüfskript achtet darauf.

## Kleine und Große Akademie (ab 25.10.2026)

- Eigener Bereich `/akademie` (Knopf „Akademie“ in der Leiste), alte Adressen `/spielen/akademie/...` leiten weiter.
- **Kleine Akademie** (`/akademie/klein`, kostenlos): Lernwelten 1–3, Spiele „Der perfekte Reitersitz“, „Hilfen-Detektiv“.
- **Große Akademie** (`/akademie/gross`): Lernwelten 4–8, „Gangarten-Quiz“, „Bahnfiguren-Meister“, Monatslektionen.
  Freigeschaltet mit der Mitgliedschaft ODER per Einzelkauf (Paket `grosse-akademie`, `src/content/products.ts`:
  Preis, Shop-Handle, `checkoutUrl` – solange null, kein Kauf-Knopf). Codes: `npm run codes -- grosse-akademie <anzahl>`.
- Inhalte der Großen Akademie sind server-only (`welten/w4…w8.server.ts`, `spiele-gross.server.ts`), geladen über
  `inhalte.server.ts`. Der Browser bekommt nur die Übersicht `katalog-gross.generated.ts`.
  **Nach jeder Änderung an Welten 4–8 oder deren Spielen:** `npm run akademie:katalog`, dann `npm run check:akademie`.
- Der frühere „Lernpfad“ (gemischt gratis/premium) ist entfernt.
