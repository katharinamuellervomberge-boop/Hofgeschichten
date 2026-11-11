# Rider Coach und Hofgeschichten 2.0 (seit 11.11.2026)

## Struktur
Leiste: **Start · Reitakademie · Tagebuch · Rider Lab · Rider Coach · Profil**. „Spielen“ ist über die Reitakademie und die Startseite erreichbar.
Startseite: vier Bereiche (Lerne · Verstehe · Trainiere · Wachse) und „Dein nächster Schritt“ (`features/home/NextStep.tsx`), berechnet nur aus gespeicherten Daten auf dem Gerät.

## Daten und Speicherung
- **Kein Supabase, keine Konten** (Entscheidung 11.11.2026). Alle Nutzerdaten bleiben wie bisher auf dem Gerät im Reitertagebuch (IndexedDB) und sind über die Tagebuch-Sicherung exportierbar.
- Neu im Tagebuch (`features/tagebuch/types.ts`, `DIARY_VERSION` bleibt 1, alte Daten laden weiter):
  - `coach: CoachCase[]`: Analyse (Problem, Antworten, empfohlene Übungen, Sicherheits-Kennzeichen), Status, gemerkt, Ziel, Rückmeldungen
  - `Goal.program`: Wochenprogramm (Wochen mit Übungen, Trainingstage, Start), `Goal.coachCaseId`
  - `PlanItem.kind = "coach"` mit `exercises`
  - `DiaryEntry.goalId` (nur nach Bestätigung), `DiaryEntry.difficult` („Was war schwierig?“)
- Das Datenmodell ist relational aufgebaut (IDs `cp-…`, `rc-…`, Fälle, Ziele, Einheiten) und lässt sich später 1:1 in Supabase-Tabellen mit RLS übertragen.
- Hinweis: Ein noch offener Tab mit der alten App-Version kann beim Speichern die neuen Felder verwerfen. Nach dem Deploy einmal neu laden.

## Wissensdatenbank (`src/content/coach/`)
| Datei | Inhalt | Im Browser? |
|---|---|---|
| `index.ts` | Kategorien, Probleme mit Suchbegriffen/Synonymen, Demo-Kennzeichen | ja |
| `search.ts` | Suche: Umlaute egal, Tippfehler (Damerau-Levenshtein), Wortstämme, Füllwörter | ja |
| `engine.ts` | Verzweigungen (`showIf`), max. 5 Fragen + Sicherheitsfragen, Ursachen-Gewichtung, Lösung, Planvorlage | ja |
| `probleme.server.ts` | 10 Probleme: Fragen, Antworten, Ursachen, Fehler, Tipps, Sicherheit, Lektionen, Planvorlage | nur nach Freischaltung (Demo: `steigbuegel`) |
| `uebungen.server.ts` | 34 Übungen mit Lernziel, Schwierigkeit, Ort, Voraussetzungen, Ausrüstung, Schritten, Fehlern, Sicherheit, Animation/Lektion, leichterer Variante | nur nach Freischaltung |
| `katalog.generated.ts` | Übungstitel ohne Inhalte + Lektion→Problem | ja (`npm run coach:katalog`) |

Neues Problem: in `index.ts` und `probleme.server.ts` eintragen, `npm run coach:katalog`, `npm run check:coach` (prüft alle Antwortwege, Verweise, Sicherheitsregeln, Suchtests).

**Alle Inhalte sind fachlicher Entwurf (`review: "entwurf"`) und in der App so gekennzeichnet.** Vor der Veröffentlichung von einer Reitlehrkraft prüfen lassen, dann `review: "geprueft"` setzen.

Sicherheitsregeln: Antworten mit `flag: "abklaeren"` zeigen eine Abklärungsempfehlung (Tierarzt, Sattler, Reitlehrkraft). `flag: "stopp"` zeigt keine Übungen mit Pferd und keinen Trainingsplan.

## Freischaltung
- Kennung `rider-coach` (`content/products.ts → riderCoach`), Prüfung nur auf dem Server: `hasRiderCoach()`.
- Codes: Admin-Seite → „Rider Coach (Premium-Add-on)“. Shopify: Handle `die-hofgeschichten-rider-coach` oder Positionstitel mit „Rider Coach“.
- **Preis und Shop-Produkt fehlen noch.** Solange `price`/`checkoutUrl` null sind, gibt es keinen Kauf-Knopf, nur „Code oder Bestellnummer eingeben“.
- Ohne Kauf: Suche, Themenliste, kompletter Demo-Lösungsweg „Ich verliere ständig meine Steigbügel“ (Plan und Merken als Premium gekennzeichnet).
- Tagebuch-Zugang (`hasDiary()`): Reitakademie, aktive Mitgliedschaft oder Rider Coach.

## Ablauf
Problem suchen → Fragen → Lösungsweg (Zusammenfassung, Ursachen, Erklärung, Übungen, Animationen/Lektionen, Fehler, Tipps, Akademie, Plan) → „Trainingsplan erstellen“ (Dauer 2–8 Wochen, Tage, Übungen je Woche) → Einheiten im Wochenplan → abhaken oder „Training eintragen“ → „Hat dir die Übung geholfen?“ → bei „Noch nicht“: Alternative, Voraussetzungen, leichtere Variante (jeweils „Im Plan ersetzen“), neu eingrenzen.
Seiten: `/coach`, `/coach/<problem>`, `/coach/uebung/<id>`, `/coach/mein-coach`. Rider Lab zeigt „Meine Trainingsziele“ (`/akademie/rider-lab#ziele`).
