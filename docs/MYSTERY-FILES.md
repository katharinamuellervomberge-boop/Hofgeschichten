# Mystery Files in der App

Die Print-Detektivfälle „Horse & Harmonie Mystery Files“ als interaktive App-Fälle.

## Case 02 · Die Nacht im Geisterstall (`geisterstall`)

**Stand:** Inhalte, Szenen und Spielkern fertig. **Unveröffentlicht** (`published: false`).

- Inhalte: `src/content/adventures/geisterstall.server.ts` (Premium, nur Server)
- Szenen: `src/components/illustrations/scenes/Lindenhof.tsx`
- Figuren: `src/content/people.ts` + `src/components/illustrations/PersonPortrait.tsx`
- Öffentliche Angaben: Eintrag `geisterstall` in `src/content/adventures/index.ts`

### Entscheidungen (20.10.2026)

- **Welt:** Lindenhof-Geschichte aus dem Heft (Hanna, Wilhelm, Tilda, Mats, Herr Voss, Oma Greta, Flocke).
  Lea, Mila und Ben sind zur Halloween-Übernachtung angemeldet und ermitteln.
- **Stufe:** nur Mittel (7–9 Jahre), Altershinweis „ab 7 Jahren“. Die Stufenwahl ist im Fall ausgeblendet.
- **Zeitpunkt:** jetzt gebaut, später freigeben. Launch der Geisterweide am 30.10. bleibt unberührt.
- **Hofhund heißt Bruno** (im Heft Krümel), weil Krümel in der App der Hund vom Hofgeschichten-Hof ist.
- **Sieben statt fünf Missionen**, damit keine Mission für 7- bis 9-Jährige zu lang wird (8–12 Schritte).

### Vom Heft zur App

| Mission | Heft-Seiten | Rätsel in der App |
|---|---|---|
| 1 Der geheimnisvolle Morgen | 3–5 | Fallakte, Tatort-Suchbild (5 Spuren), Laterne, Tür, Schwarzes Brett |
| 2 Wer war in der Nacht da? | 6–8 | Blickfeld auf dem Hofplan, heimliche Tür, Kennzeichen zuordnen, Aussagen vs. Protokoll, Profi-Frage |
| 3 Spuren und Geheimschrift | 9–10 | Abdruck messen, Eisen/barhuf, Hufkartei, Kerbe, Laufrichtung, Geheimschrift, Box C, Flocke |
| 4 Die alte Sattelkammer | 11–12 | Inventur (Lücken), Wozu?, Suchbild, Schlüsselbrett-Logik, fehlender Schlüssel |
| 5 Die Halloween-Zeitleiste | 13–14 | Zeitleiste (MONDLICHT), Tildas Alibi, Kostüm, Mats’ Alibi, falsche Fährte |
| 6 Der Zettel und das alte Foto | 15–16 | Notizblock, zwei Personen, Zeitung 1926, Spiegelschrift, Alter rechnen, Kennzeichen, Frist |
| 7 Mitternacht | 17–20 | Drei Prüfungen, letzter Beweis, Ermittlungsbericht (festlegen), Auflösung |

Bonus wie im Heft: Kater Moritz versteckt sich in mehreren Bildern (antippen = freundlicher Hinweis).

### Vor der Freigabe

- [ ] Fall auf einer Vorschau-Adresse durchspielen (siehe `INHALTE-ERWEITERN.md` → Vorschau), auch auf iPad/iPhone
- [ ] Texte abnehmen (vor allem Bruno statt Krümel, Lea/Mila/Ben als Gäste)
- [x] Preis: 4,90 € (Entscheidung 20.10.)
- [ ] Shopify-Produkt mit Handle `mystery-files-die-nacht-im-geisterstall-app` anlegen (oder Handle im Eintrag anpassen)
- [ ] Freischaltkarte (PDF) für das Produkt, Codes mit `npm run codes -- geisterstall <anzahl>`
- [ ] `published: true` setzen

### Nächste Fälle

Case 01 und Case 03 („Das Geheimnis der Weihnachtsnacht“) nach demselben Muster: neue Datei
`<slug>.server.ts`, Szenen, Eintrag in `index.ts` und `registry.server.ts`. Für Case 03 lag noch kein Heft vor.
