# Neue Inhalte hinzufügen

Alle Spiele und Fälle sind **Daten**. Der Spielkern (`src/engine`) spielt sie ab.

## Bausteine (Schritt-Typen)

| Typ | Wofür | Wichtige Felder |
|---|---|---|
| `story` | Erzähltext mit Bild und Sprecher | `text`, `visual`, `speaker` |
| `hotspots` | Interaktives Bild / Suchbild | `scene`, `mode` (`collect` / `sequence`), `targets`, `decoys` |
| `choice` | Multiple Choice mit Bildern oder Text | `options` (`correct`, `feedback`), `explain`, `layout` |
| `match` | Drag & Drop mit Tipp-Alternative | `targets`, `items` (`target`, `say`, `wrong`) |
| `code` | Zahlenschloss mit Rätsel je Ziffer | `digits` (`riddle`, `answer`, `hint`), `success` |

Jeder Text kann je Stufe unterschiedlich sein:

```ts
text: { leicht: "Kurzer Satz.", mittel: "Längerer, ausführlicherer Text." }
```

Ganze Schritte oder Antworten nur für eine Stufe: `levels: ["mittel"]`.

Hinweise fürs Detektivbuch: `clue: "id"` an einem Hotspot-Ziel oder einer Auswahl-Frage;
die Liste aller Hinweise steht im Abenteuer unter `clues`.

## Neues kostenloses Lernspiel

1. Datei `src/content/games/<name>.ts` mit einer `Activity` anlegen (Vorlage: `quiz.ts`).
2. In `src/content/games/index.ts` eintragen (Titel, Lernziel, Farbe, Vorschaubild).
3. Stempel in `src/content/stamps.ts` ergänzen: `rule: { type: "activity", id: "<activity-id>" }`.

Die Seite `/spielen/<id>` entsteht automatisch.

## Neues Detektiv-Abenteuer (z. B. November, Weihnachten)

1. **Öffentliche Angaben** in `src/content/adventures/index.ts`: Titel, Teaser, Elterninfo, Preis,
   Shopify-Handle, Missionstitel. Zuerst `published: false`.
2. **Inhalte** in `src/content/adventures/<slug>.server.ts` (Vorlage: `geisterweide.server.ts`) –
   erste Zeile muss `import "server-only";` bleiben.
3. In `src/content/adventures/registry.server.ts` eintragen.
4. Neue Szenen-Illustration in `src/components/illustrations/scenes/` anlegen und in
   `src/engine/VisualView.tsx` → `SCENES` registrieren (mit viewBox, damit Hotspots passen).
5. Titelbild in `src/features/adventure/AdventureCover.tsx` ergänzen.
6. Produkt in Shopify mit identischem Handle anlegen → `published: true`.

Abzeichen (eins je Mission + Abschluss) und Pass-Einträge entstehen automatisch.

## Bundles

Ein Bundle ist ein Shopify-Produkt, das mehrere Abenteuer freischaltet. Dafür in
`src/lib/entitlements/shopify.ts` eine Zuordnung `bundleHandle → [slugs]` ergänzen
(an der Stelle, an der die Produkt-Handles ausgewertet werden).

## Hörspiele wieder einblenden

`src/content/site.ts` → `features.audio = true`. Bibliothek, Player und Fortschritt sind erhalten.
Kostenpflichtige Folgen später wie Abenteuer behandeln: Audio nicht in `public/`, sondern
über einen geprüften Route Handler mit signierter URL ausliefern (siehe `src/lib/access.ts`).

## Nach jeder Textänderung: Stimme

`npm run voice:export` und danach `npm run voice:generate` – erzeugt werden nur neue oder geänderte
Sätze. Bis dahin liest die Gerätestimme diese Sätze vor. Details: `docs/STIMME.md`.
Zusammengesetzte Ansagen immer über `src/lib/voice/phrases.ts` bauen, damit sie im Sprecherskript landen.
