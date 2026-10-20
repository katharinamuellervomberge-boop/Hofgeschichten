# KI-Vorlesestimme

> **Stand Launch (31.10.2026): ausgeschaltet.** `features.voice = false` in `src/content/site.ts` –
> keine Lautsprecher-Knöpfe, kein automatisches Vorlesen, keine Aufnahmen im Projekt.
> Wird zusammen mit den Hörspielen wieder eingeschaltet (`true`) und dann komplett mit einem
> Tarif mit kommerzieller Lizenz erzeugt. Alles unten beschreibt diesen späteren Schritt.

Die App liest Texte mit **vorab erzeugten Aufnahmen** vor. Die Gerätestimme springt nur ein,
wenn für einen Satz (noch) keine Aufnahme existiert.

```
Inhalte (Spiele, Fall, Oberfläche)
        │  npm run voice:export
        ▼
voice/sprecherskript.csv  +  voice/script.json      ← alle 478 Sätze, je mit Kennung und Regiehinweis
        │  npm run voice:generate   (ElevenLabs)
        │  – oder –  Dateien von einem anderen Dienst nach voice/inbox/ legen + npm run voice:manifest
        ▼
public/voice/<kennung>.mp3                 kostenlose Inhalte (öffentlich)
private/voice/geisterweide/<kennung>.mp3   Premium – nur über /api/voice/<kennung> nach Kaufprüfung
src/content/voice-manifest.json            Liste der vorhandenen Aufnahmen (wird automatisch geschrieben)
```

- **Kennung = Fingerabdruck des Textes.** Wird ein Satz geändert, passt die alte Aufnahme nicht
  mehr und die App nutzt automatisch die Gerätestimme, bis neu erzeugt wurde. Es kann also nie
  eine falsche Aufnahme zu einem geänderten Text laufen.
- **Datenschutz:** Die Texte gehen nur einmalig beim Erzeugen an den Stimmdienst – nie vom Gerät
  eines Kindes.
- **iPhone/iPad:** Ton darf erst nach der ersten Berührung spielen. Die App schaltet ihn beim ersten
  Tippen frei; danach liest sie auch automatisch vor (Stufe „Leicht“).

## Umfang

| | Sätze | Zeichen (ca.) |
|---|---|---|
| Kostenlos (Hofwelt, Oberfläche) | 305 | 14.118 |
| Premium (Geisterweide) | 173 | 10.968 |
| **Gesamt** | **478** | **25.086** |

`npm run voice:export` zeigt die aktuellen Zahlen nach jeder Textänderung.

## Ablauf mit ElevenLabs (empfohlen)

1. **Konto mit kommerzieller Lizenz** anlegen. Kostenlose Tarife erlauben in der Regel keine
   kommerzielle Nutzung – Tarif und Nutzungsbedingungen vorher prüfen. Für rund 25.000 Zeichen
   reicht ein kleiner Bezahltarif; zur Sicherheit Puffer für Neuversuche einplanen.
2. **Stimme auswählen:** In der *Voice Library* nach Sprache **Deutsch** und Kategorie
   *Narrative/Storytelling* filtern. Gut geeignet: warm, ruhig, deutlich, eher mittlere Tonlage,
   nicht übertrieben „kindlich“. Bei Stimmen, die ursprünglich englisch sind (z. B. „Brian“),
   besonders auf deutsche Aussprache und Betonung achten.
3. **Stimme eintragen:** In `voice/config.json` stehen Name, Modell (`eleven_v4`) und die
   **Voice-ID** (in ElevenLabs bei der Stimme: „Copy voice ID“). Die Voice-ID ist kein Geheimnis.
   Aktuell ausgewählt: *Brian – Deep, Resonant and Comforting*.
4. **Probe mit 10 Sätzen:**
   ```bash
   npm run voice:export
   ELEVENLABS_API_KEY=… npm run voice:generate -- --limit 10
   ```
   Die Dateien in `public/voice/` anhören. Bei Bedarf in `voice/config.json` anpassen:
   `speed` (z. B. 0.92 = etwas langsamer), `stability` (höher = ruhiger), `style`
   (höher = ausdrucksstärker). Leere Werte (`null`) = Einstellungen aus dem ElevenLabs-Konto.
   Dann mit `--force` neu erzeugen.
5. **Alles erzeugen:** `npm run voice:generate` (ohne `--limit`). Dauert wenige Minuten.
6. **Stichprobe anhören** – besonders Pferdewörter (Kardätsche, Widerrist, Kruppe, Trakehner,
   Hannoveraner). Falsch betonte Sätze in `voice/script.json` nachschlagen, die Datei löschen
   und einzeln neu erzeugen.
7. **Einchecken & veröffentlichen:** Ordner `public/voice`, `private/voice` und
   `src/content/voice-manifest.json` mit ins Repository → Vercel veröffentlicht automatisch.

## Anderer Stimmdienst

Jeder Dienst geht, der MP3 liefert: Sätze aus `voice/sprecherskript.csv` erzeugen, jede Datei als
`<Kennung>.mp3` (Spalte „Kennung“) speichern, alle Dateien nach `voice/inbox/` legen und
`npm run voice:manifest` ausführen. Das Skript sortiert kostenlose und Premium-Aufnahmen
automatisch an die richtige Stelle.

## Wichtig

- **Texte zuerst festlegen** (Story-Abnahme), dann erzeugen. Jede Textänderung später heißt: diesen
  Satz neu erzeugen (`voice:export` → `voice:generate` erzeugt nur, was fehlt).
- **Transparenz:** Im Elternbereich steht, dass die Vorlesestimme eine KI-Stimme ist. Das ist
  ehrlich gegenüber Eltern; ob darüber hinaus Kennzeichnungspflichten (z. B. nach der
  EU-KI-Verordnung) greifen, bitte zusammen mit Impressum/Datenschutz juristisch prüfen lassen.
- **Keine Stimme einer realen Person nachbilden** ohne deren schriftliche Einwilligung – und keine
  Kinderstimmen klonen.
- Die Premium-Aufnahmen gehören **nicht** nach `public/`. Das Skript legt sie automatisch in `private/`.

## Später: Figurenstimmen

Für eigene Stimmen von Lea, Mila und Ben müssten Dialogsätze im Inhalt als eigene Schritte mit
`speaker` stehen. Das Sprecherskript kann dann je Figur eine andere Stimme zuweisen. Für den
Launch liest bewusst **eine** Erzählstimme alles – das klingt einheitlich und ist am schnellsten.
