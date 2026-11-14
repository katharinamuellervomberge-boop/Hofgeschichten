# Rider Coach 1.0 (seit 14.11.2026)

Regelbasierter Reitcoach im Reitertagebuch (Reiter **Coach** im Riding Space, `/tagebuch/coach`). Keine KI, keine API-Aufrufe.

## Aufbau
| Datei | Inhalt |
|---|---|
| `src/content/coach/problems.ts` | 6 Kategorien, 50 Probleme (`cp-01…cp-50`) mit Suchbegriffen/Synonymen |
| `src/content/coach/safety.ts` | Sicherheitsprüfung vor jedem Fall (Schmerz/Lahmheit → stopp, plötzliche Veränderung/Abwehr/unsicher → abklären) |
| `src/content/coach/cases/*.ts` | alle 50 Fälle (a-sitz, b-hilfen, c-trab-galopp + cp-22, d-biegung, e-dressur, f-gelaende): Fragen mit Verzweigung, Regeln (Antwort → Ursache), Ursachen, Übungen, Lektionen, Planvorlage. Gemeinsame Bausteine in `common.ts` |
| `src/content/coach/engine.ts` | Auswertung: Ursache nur bei ≥ 2 Regelpunkten, Begründung je Ursache, „keine zuverlässige Eingrenzung“, Stand → Übungsstufe, Sicherheitsfilter |
| `src/content/coach/provider.ts` | `CoachProvider`-Schnittstelle, `RuleBasedCoachProvider` (später austauschbar) |
| `src/content/coach/search.ts` | fehlertolerante lokale Suche (Umlaute, Tippfehler, Wortstämme) |
| `src/content/training/uebungen.ts` | gemeinsame Übungsbibliothek von Trainingsplaner und Coach (mit „Wann abbrechen?“) |
| `src/features/tagebuch/riding/engine.ts` | Oberfläche (Coach-Start, Fragen, Ergebnis, Fälle, Plan übernehmen) |

Nutzerdaten: `DiaryData.coach` (Problem, Antworten, Pferd, Ziel, Plan, Selbsteinschätzungen) – nur auf dem Gerät. Das Ergebnis wird aus den Antworten neu berechnet.

## Neuen Fall anlegen
1. Fall nach Vorlage der Dateien in `cases/` schreiben (Bausteine aus `common.ts`) (Übungen nur aus der Bibliothek, neue dort ergänzen).
2. In `cases/index.ts` eintragen – das Problem wird damit in der App klickbar.
3. `npm run check:coach` (prüft alle Antwortwege, Sicherheitsregeln, Verweise, Suche).

Alle 50 Fälle und die Übungsbibliothek sind fachlich geprüft (14.11.2026). Neue Fälle als `review: "entwurf"` anlegen und vor dem Livegang prüfen lassen.
