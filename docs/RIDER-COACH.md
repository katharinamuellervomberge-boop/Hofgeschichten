# Rider Coach 1.0 (seit 14.11.2026)

Regelbasierter Reitcoach im Reitertagebuch (Reiter **Coach** im Riding Space, `/tagebuch/coach`). Keine KI, keine API-Aufrufe.

## Aufbau
| Datei | Inhalt |
|---|---|
| `src/content/coach/problems.ts` | 6 Kategorien, 50 Probleme (`cp-01…cp-50`) mit Suchbegriffen/Synonymen |
| `src/content/coach/safety.ts` | Sicherheitsprüfung vor jedem Fall (Schmerz/Lahmheit → stopp, plötzliche Veränderung/Abwehr/unsicher → abklären) |
| `src/content/coach/cases/cp-22.ts` | vollständiger Fall „Mein Pferd rennt beim Angaloppieren los“: Fragen mit Verzweigung, Regeln (Antwort → Ursache), Ursachen, Übungen, Lektionen, Planvorlage |
| `src/content/coach/engine.ts` | Auswertung: Ursache nur bei ≥ 2 Regelpunkten, Begründung je Ursache, „keine zuverlässige Eingrenzung“, Stand → Übungsstufe, Sicherheitsfilter |
| `src/content/coach/provider.ts` | `CoachProvider`-Schnittstelle, `RuleBasedCoachProvider` (später austauschbar) |
| `src/content/coach/search.ts` | fehlertolerante lokale Suche (Umlaute, Tippfehler, Wortstämme) |
| `src/content/training/uebungen.ts` | gemeinsame Übungsbibliothek von Trainingsplaner und Coach (mit „Wann abbrechen?“) |
| `src/features/tagebuch/riding/engine.ts` | Oberfläche (Coach-Start, Fragen, Ergebnis, Fälle, Plan übernehmen) |

Nutzerdaten: `DiaryData.coach` (Problem, Antworten, Pferd, Ziel, Plan, Selbsteinschätzungen) – nur auf dem Gerät. Das Ergebnis wird aus den Antworten neu berechnet.

## Neuen Fall anlegen
1. `cases/cp-XX.ts` nach Vorlage `cp-22.ts` schreiben (Übungen nur aus der Bibliothek, neue dort ergänzen).
2. In `cases/index.ts` eintragen – das Problem wird damit in der App klickbar.
3. `npm run check:coach` (prüft alle Antwortwege, Sicherheitsregeln, Verweise, Suche).

**Alle Inhalte sind fachlicher Entwurf** – vor dem Livegang von einer Reitlehrkraft prüfen lassen.
