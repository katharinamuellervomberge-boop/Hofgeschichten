# Reitakademie 2.0 – Module 10–14 (Plan und Stand, 13.11.2026)

Branch: `feature/akademie-modul-10` (Vercel-Vorschau). Nichts davon ist auf `main`.

## 1. Kurzanalyse der bestehenden Reitakademie

| Bereich | Ist-Zustand im Code |
|---|---|
| Technik | Next.js 16, React 19, TypeScript, CSS-Module, keine UI-Bibliothek. Hosting Vercel. |
| Datenbank | **Kein Supabase.** Es gibt keine Nutzerkonten. Fortschritt liegt nur im Browser (localStorage, `src/lib/progress`). |
| Freischaltung | Signiertes Cookie `hg_ent` nach Prüfung der Shopify-Bestellung (`/eltern`). Inhalte der „großen“ Akademie werden nur serverseitig nach Freischaltung ausgeliefert (`*.server.ts`). |
| Struktur | 9 Module (`module.ts`) als Ordnung über 14 Lernwelten (`welten/w1…w14`). 81 Lektionen, IDs `ra-w<n>-l<m>` (dürfen sich nie ändern). Je Modul eine Probelektion. |
| Lektionsformat (alt) | Einstieg, Erklärungs-Bildschirme, Fachbegriffe, Übung, ≥ 3 Quizfragen, Merksatz. Texte in zwei Stufen (`leicht` = Kids, `mittel` = Teen/Adult). |
| Spielkern | `src/engine`: Schritte story, choice, multi, match, hotspots, code, cipher – alle datengetrieben. |
| Illustrationen | SVG-Komponenten: Reiter-Szenen, animiertes Pferd (`AnimHorse`), Reitbahn/Bahnfiguren, Seitengänge von oben, Sprungphasen, Item-Icons, Lernkarten mit Tabellen. |
| Lernvideos | 10 Videos, aus React/SVG-Szenen (`src/video`) mit Playwright + FFmpeg gerendert, Stimme über ElevenLabs. Auslieferung nur nach Freischaltung. |
| Prüfung | `npm run check:akademie` (Vollständigkeit, Quizlogik, IDs, Modulzuordnung, Katalog). |

**Nummerierung 10–14:** kompatibel. Module `m10`–`m14` und Lernwelten `w15`–`w19` kollidieren mit nichts. Hinweis: Modul 9 ist der „Akademie-Abschluss“ und steht damit vor den neuen Modulen (siehe offene Entscheidungen).

## 2. Lektionsformat der neuen Module (umgesetzt)

Neues optionales Feld `deep` an `AcademyLesson` (`types.ts`), Baufunktion `deepLessonsOf()`. Ablauf in der App:

A Einstieg → B Fachwissen (Abschnitte mit Zwischenüberschrift) → Fachbegriffe → C Praxisbeispiel → Entscheidungsübung → D Häufige Fehler (≥ 3) → E So machst du es richtig → G Wissenstest (3–5 Fragen mit Rückmeldung) → F Merke dir das (3–5) → H Weiterlernen (Links am Ende).

- Eine Textfassung für beide Stufen (Zielgruppe ab ca. 12 Jahren). In der Kids-Akademie erscheint der Hinweis „gemeinsam mit einem Erwachsenen lesen“.
- Jede neue Lektion trägt `review: entwurf` und ein internes Feld `pruefen` mit den Punkten, die eine Fachperson gezielt prüfen soll.
- `check:akademie` prüft das neue Format (Abschnitte, ≥ 3 Fehler, 3–5 Kernaussagen, 3–5 Fragen, gültige Weiterlernen-Links).

## 3. Die 76 Lektionen

Stufen: **G** = Grundlagen, **A** = Aufbau, **F** = Fortgeschritten. Video: **Anim** = als Animation umsetzbar, **Real** = braucht echtes Bildmaterial, **Mix** = Animation + Realaufnahmen.

### Modul 10 – Pferdehaltung, Pferdealltag & Fütterung (Lernwelt w15) – FERTIG

| ID | Lektion | Lernziel | Stufe | Video |
|---|---|---|---|---|
| ra-w15-l1 | Die natürlichen Grundbedürfnisse | Fünf Grundbedürfnisse kennen, Stereotypien als Warnsignal deuten | G | – |
| ra-w15-l2 | Haltungsformen | Box, Paddockbox, Offenstall, Aktivstall, Weide nach Kriterien vergleichen; Boxenmaß berechnen | G | Stallhaltung vergleichen (Anim) |
| ra-w15-l3 | Der optimale Pferdestall | Maße, Stallklima, Ammoniak, Licht, Hygiene, Brandschutz beurteilen | A | – |
| ra-w15-l4 | Tagesrhythmus und Pferdealltag | Fresspausen erkennen und verkürzen, Fütterung und Training abstimmen | G | – |
| ra-w15-l5 | Das Verdauungssystem | Aufbau und Schwachstellen der Verdauung, Fütterungsregeln ableiten | A | So funktioniert die Pferdeverdauung (Anim) |
| ra-w15-l6 | Heu, Heulage, Gras, Raufutterqualität | Raufutterarten, TS-Gehalt, Schnittzeitpunkt, Sinnenprüfung | A | Gute und schlechte Heuqualität (Real) |
| ra-w15-l7 | Wie viel Futter braucht mein Pferd? **(Probelektion)** | Gewicht schätzen, FM/TS umrechnen, Mindestmenge berechnen, Einflussfaktoren | A | Raufutterbedarf berechnen (Anim) |
| ra-w15-l8 | Kraft-, Mineral- und Ergänzungsfutter | Bedarf prüfen, Etikett lesen, Überversorgung vermeiden | A | – |
| ra-w15-l9 | Wasserbedarf und Salzversorgung | Wasser- und Salzbedarf, Tränken, Wassermangel erkennen | G | – |
| ra-w15-l10 | Weide, Anweiden, Giftpflanzen | Anweiden planen, Fruktan verstehen, Giftpflanzen und Notfälle erkennen | A | Pferde richtig anweiden (Anim) |
| ra-w15-l11 | Winter, Winterfell, Scheren, Eindecken | Thermoregulation, individuelle Deckenentscheidung ohne Temperaturtabelle | A | Pferdedecken richtig auswählen (Mix) |
| ra-w15-l12 | Sommer, Hitze, Insektenschutz | Hitzestress erkennen, richtig kühlen, Insekten zuordnen | G | – |
| ra-w15-l13 | Stallmanagement und Versorgung | Tagesablauf, Kontrollpunkte, Dokumentation, Notfallplan | G | – |
| ra-w15-l14 | Gute Pferdehaltung beurteilen | Haltung und Pferd mit Kriterien beurteilen, angemessen reagieren | A | – |

### Modul 11 – Pferdegesundheit, Hufe, Zähne, Pflege & Erste Hilfe (w16) – FERTIG

| ID | Lektion | Lernziel | Stufe | Video |
|---|---|---|---|---|
| ra-w16-l1 | Wie erkenne ich ein gesundes Pferd? | Normalbefund kennen: Verhalten, Haltung, Fell, Augen, Kot | G | – |
| ra-w16-l2 | Puls, Atmung und Temperatur messen | PAT-Normalwerte und Messmethoden sicher anwenden | G | PAT-Werte messen (Real) |
| ra-w16-l3 | Der tägliche Gesundheitscheck | Fester Ablauf, Auffälligkeiten dokumentieren | G | Gesundheitscheck am Pferd (Real) |
| ra-w16-l4 | Aufbau und Funktion des Hufs | Hufkapsel, Strahl, Lederhaut, Hufmechanismus | A | Hufaufbau animiert (Anim) |
| ra-w16-l5 | Hufpflege, Barhuf und Beschlag | Pflege, Intervalle, Vor- und Nachteile | A | Hufe richtig auskratzen (Real) |
| ra-w16-l6 | Hufkrankheiten | Hufrehe, Strahlfäule, Abszess, Hornspalt: Zeichen und wann Tierarzt/Schmied | A | Hufrehe-Warnsignale (Mix) |
| ra-w16-l7 | Pferdezähne | Anatomie, Zahnwechsel, Zahnprobleme erkennen | A | Pferdezähne verstehen (Anim) |
| ra-w16-l8 | Fell-, Mähnen- und Schweifpflege | Pflege passend zu Jahreszeit und Haut | G | – |
| ra-w16-l9 | Hautprobleme | Mauke, Pilz, Sommerekzem: erkennen, vorbeugen, Tierarzt | A | – |
| ra-w16-l10 | Kolik | Ursachen, Warnzeichen, sichere Sofortmaßnahmen, Notfall | A | Koliksymptome erkennen (Real) |
| ra-w16-l11 | Schlundverstopfung | Erkennen und richtig reagieren | A | – |
| ra-w16-l12 | Lahmheit erkennen | Taktfehler, Kopfnicken, Vorstellen auf hartem Boden | F | Lahmheiten erkennen (Real) |
| ra-w16-l13 | Atemwege und equines Asthma | Symptome, Haltung, Staubreduktion | A | – |
| ra-w16-l14 | Verletzungen und Wundversorgung | Blutungen, Wunden einschätzen, wann Notfall | A | – |
| ra-w16-l15 | Infektionen, Impfungen, Parasiten | Impfempfehlungen (StIKo Vet), selektive Entwurmung, Quarantäne | A | – |
| ra-w16-l16 | Erste Hilfe und Notfall | Eigenschutz, Ruhe, Tierarzt informieren, was nicht tun | G | – |
| ra-w16-l17 | Die Stallapotheke | Sinnvoller Inhalt ohne Medikamentenempfehlungen | G | Stallapotheke zusammenstellen (Anim) |
| ra-w16-l18 | Gesundheitsvorsorge | Jahresplan: Zähne, Hufe, Impfung, Parasiten, Gewicht | G | – |

### Modul 12 – Pferdeverhalten & Körpersprache (w17) – FERTIG

| ID | Lektion | Lernziel | Stufe | Video |
|---|---|---|---|---|
| ra-w17-l1 | Wie Pferde wahrnehmen | Sehen, Hören, Riechen, Tasten und Folgen für den Umgang | G | Warum Pferde erschrecken (Anim) |
| ra-w17-l2 | Körpersprache verstehen | Ohren, Augen, Maul, Nüstern, Schweif im Zusammenhang lesen | G | Pferdeohren (Anim), Körpersprache lesen (Mix) |
| ra-w17-l3 | Entspannung und Ruheverhalten | Zeichen von Wohlbefinden erkennen | G | Entspannung vs. Stress (Real) |
| ra-w17-l4 | Stress, Angst, Überforderung | Frühe Stresssignale, Schmerz als Ursache bedenken | A | (s. l3) |
| ra-w17-l5 | Herdenverhalten | Beziehungen, Rangbeziehungen ohne Dominanzmythos | A | Pferdekommunikation in der Herde (Anim) |
| ra-w17-l6 | Konfliktverhalten | Drohen, Beißen, Treten: Eskalationsstufen | A | – |
| ra-w17-l7 | Lerntheorie | Gewöhnung, Konditionierung, positive/negative Verstärkung, Timing | F | – |
| ra-w17-l8 | Vertrauen und Kommunikation | Vorhersehbarkeit, klare Signale, Pausen | A | – |
| ra-w17-l9 | Körpersprache beim Führen | Position, Druck und Nachgeben am Boden | G | Körpersprache beim Führen (Anim) |
| ra-w17-l10 | Konfliktsignale beim Reiten | Signale unter dem Sattel, Ursachen (Sattel, Schmerz, Überforderung) | A | – |
| ra-w17-l11 | Häufige Verhaltensprobleme | Kleben, Steigen, Schreckhaftigkeit: mögliche Ursachen | F | – |
| ra-w17-l12 | Situationen analysieren | Fallbeispiele systematisch auswerten | F | – |

### Modul 13 – Reitlehre Advanced (w18) – FERTIG

| ID | Lektion | Lernziel | Stufe | Video |
|---|---|---|---|---|
| ra-w18-l1 | Die Ausbildungsskala im Detail | Wechselwirkungen, Phasen, Bezug zur Reitstunde | A | Ausbildungsskala animiert (Anim) |
| ra-w18-l2 | Biomechanik | Rumpfträger, Rückentätigkeit, Hinterhand, Dehnung | F | Pferdebiomechanik verstehen (Anim) |
| ra-w18-l3 | Unabhängiger Sitz | Balance, Losgelassenheit, Mitschwingen | A | Die korrekte Reiterposition (Anim) |
| ra-w18-l4 | Gewichtshilfen und Becken | Wirkung, Gefühl, typische Fehler | A | – |
| ra-w18-l5 | Schenkelhilfen | vorwärts-, vorwärts-seitwärts-, verwahrend | A | – |
| ra-w18-l6 | Zügelhilfen und Handhaltung | annehmen, nachgeben, durchhalten, verwahren | A | – |
| ra-w18-l7 | Zusammenspiel und halbe Paraden | Wirkung, Timing, Erfolgskontrolle | F | Halbe Paraden erklärt (Anim) |
| ra-w18-l8 | Anlehnung, Selbsthaltung, Verbindung | Woher Anlehnung kommt, typische Fehlbilder | F | Anlehnung verstehen (Anim) |
| ra-w18-l9 | Stellung und Biegung | Unterschied, Hilfen, Gefühl | A | Stellung vs. Biegung (Anim) |
| ra-w18-l10 | Geraderichtung und Schiefe | Natürliche Schiefe erkennen und bearbeiten | F | Über die Schulter fallen (Anim) |
| ra-w18-l11 | Übergänge und Tempo | Übergänge vorbereiten, Tempounterschiede | A | – |
| ra-w18-l12 | Galopp: Fußfolge und Biomechanik | Dreitakt, Schwebephase, Bewegung des Rückens | A | Galopp-Fußfolge (Anim) |
| ra-w18-l13 | Richtig angaloppieren | Vorbereitung, Hilfen, Fehleranalyse | A | Richtig angaloppieren (Anim) |
| ra-w18-l14 | Galoppsitz und Mitschwingen | Becken, Oberkörper, Hand im Galopp | A | – |
| ra-w18-l15 | Falscher Galopp, Kreuzgalopp | Erkennen, Ursachen, Korrektur | A | Galoppfehler erkennen (Anim) |
| ra-w18-l16 | Galopparbeit verbessern | Übungsreihen, Trainingsplanung | F | – |
| ra-w18-l17 | Seitengänge | Schenkelweichen, Schulterherein, Travers, Renvers: Zweck und Gefühl | F | Schenkelweichen vs. Schulterherein (Anim) |
| ra-w18-l18 | Einfache und fliegende Wechsel | Voraussetzungen, Hilfen, Fehler | F | Galoppwechsel verstehen (Anim) |
| ra-w18-l19 | Versammlung und Tragkraft | Lastaufnahme, weiterführende Lektionen | F | – |
| ra-w18-l20 | Trainingsprobleme lösen | Systematische Fehlersuche über die Skala | F | – |

### Modul 14 – Gelände & Ausreiten (w19) – FERTIG

| ID | Lektion | Lernziel | Stufe | Video |
|---|---|---|---|---|
| ra-w19-l1 | Voraussetzungen für sicheres Ausreiten | Reiter- und Pferdevoraussetzungen, Ausrüstung | G | – |
| ra-w19-l2 | Ausritt vorbereiten | Route, Wetter, Abmeldung, Notfallausrüstung | G | – |
| ra-w19-l3 | Sicher in der Gruppe | Abstände, Kommandos, Tempo nach dem Schwächsten | G | Gruppenregeln beim Ausreiten (Anim) |
| ra-w19-l4 | Verkehrsregeln, Waldwege, Reitrecht | StVO bundesweit, Landesrecht (Wald-/Naturschutzgesetze) je Bundesland | A | – |
| ra-w19-l5 | Bergauf und bergab | Sitz, Tempo, Linienwahl | A | Sicher bergauf und bergab (Anim) |
| ra-w19-l6 | Wasser, Brücken, Hindernisse | Heranführen, Gewöhnung, Grenzen | A | – |
| ra-w19-l7 | Schreckhafte Pferde | Vorbeugen und reagieren ohne Risiko-Pauschalrezepte | A | An neue Reize gewöhnen (Real) |
| ra-w19-l8 | Traben und Galoppieren im Gelände | Wo, wann, wie; Gruppenabsprache | A | Der erste Galopp im Gelände (Anim) |
| ra-w19-l9 | Durchgehen | Vorbeugung, Verhalten, Grenzen der Kontrolle | F | – |
| ra-w19-l10 | Hunde, Radfahrer, Wildtiere | Begegnungen sicher gestalten | G | Gefahren im Gelände erkennen (Anim) |
| ra-w19-l11 | Unfälle, Stürze, Notfälle | Eigenschutz, Notruf, Standort, Pferd sichern | G | Verhalten nach einem Reitunfall (Anim) |
| ra-w19-l12 | Geländetraining aufbauen | Kondition, Untergrund, Steigerung | A | – |

## 4. Lernvideos (39) – Animation oder Realbild?

**Als Animation mit dem vorhandenen Video-Baukasten umsetzbar (28):**
Modul 10: Verdauung, Raufutterbedarf berechnen, Anweiden, Stallhaltung vergleichen ·
Modul 11: Hufaufbau, Pferdezähne, Stallapotheke ·
Modul 12: Pferdeohren, Herdenkommunikation, Warum Pferde erschrecken, Körpersprache beim Führen ·
Modul 13: alle 12 (Ausbildungsskala, Biomechanik, Reiterposition, halbe Paraden, Anlehnung, Stellung vs. Biegung, Über die Schulter fallen, Galopp-Fußfolge, Angaloppieren, Galoppfehler, Schenkelweichen vs. Schulterherein, Galoppwechsel) – Pferd, Reiter, Bahn und Seitengänge von oben existieren bereits ·
Modul 14: bergauf/bergab, erster Galopp im Gelände, Gruppenregeln, Gefahren erkennen, Verhalten nach Reitunfall.

**Brauchen echtes Bildmaterial (8):** Heuqualität, PAT-Werte messen, Gesundheitscheck, Hufe auskratzen, Koliksymptome, Lahmheiten, Entspannung vs. Stress, Pferde an neue Reize gewöhnen. Bei Lahmheit und Kolik ist Animation fachlich nicht ausreichend. → Storyboard mit Sprechertext, Szenen, Kameraperspektive und Einblendungen je Video.

**Mischform (3):** Pferdedecken auswählen (Entscheidungsgrafik animiert + Passform real), Hufrehe-Warnsignale (Haltung animiert + Realaufnahmen), Körpersprache richtig lesen.

**Stand:** Alle 28 Animationen sind gerendert (`private/akademie-video/<slug>.mp4` + Vorschaubild) und in die passenden Lektionen eingebunden – vorerst ohne Sprecher, mit eingeblendetem Text. Vertonung: GitHub Action „Lernvideos vertonen“ (ElevenLabs, Stimme wie bei den bisherigen Lernvideos) erzeugt die Sprachdateien, rendert neu und trägt Laufzeiten ein. Die 8 Realvideos und 3 Mischformen haben vollständige Drehbücher in `docs/LERNVIDEOS-DREHBUECHER.md`.

## 5. Interaktive Funktionen – technischer Weg

| Funktion | Modul | Umsetzung |
|---|---|---|
| Fütterungsrechner | 10 (L7) | Neue Client-Komponente in der Lektion: Gewicht/Maßband, Raufutterart, TS-Gehalt → Mindestmenge FM/TS mit Erklärung. Kein Rationsberater. |
| Gesundheitsdetektiv | 11 | Fallserien mit vorhandenen Schritten `choice`/`multi` (Beobachten → Sofortmaßnahme → Tierarzt ja/nein/Notfall). |
| Pferdesprache-Quiz | 12 | Vorhandene Pferdekopf-Stimmungen + neue Ganzkörper-Illustrationen, Schritte `hotspots`/`choice`. |
| Reitlehre-Visualizer | 13 | Vorhandene `AnimHorse`, Reitbahn- und Seitengangsgrafiken als steuerbare Animation (Play/Pause/Zeitlupe, Fußfolge). |
| Gelände-Simulator | 14 | Situationsketten mit `choice`-Schritten und fachlicher Auswertung je Antwort. |

## 6. Technische Integration

- Neue Module hängen als `m10`–`m14` in `module.ts`, Inhalte als Lernwelten `w15`–`w19`. Bestehende IDs, Adressen, Abzeichen und gespeicherter Fortschritt bleiben unverändert.
- Freischaltung: Die neuen Lernwelten liegen in der „großen“ Akademie → **alle bisherigen Käufer der Reitakademie bekommen sie automatisch**; je Modul eine Probelektion.
- Auszeichnung „Reitwissen-Profi“ bleibt an den Grundkurs (Welten 1–8) gebunden; jede neue Lernwelt hat ein eigenes Abzeichen.
- Keine neuen Abhängigkeiten.
- Englisch: Neue Inhalte haben noch keine Übersetzung; im englischen Modus erscheinen sie deutsch. `npm run check:en` meldet sie als fehlend.

## 7. Entscheidungen (13.11.2026)

1. **Zugang:** Alle bisherigen Käufer der Reitakademie bekommen die neuen Module kostenlos (umgesetzt über die „große“ Akademie).
2. **Reihenfolge:** strategisch neu sortiert – Grundlagen zuerst, dann Wissen rund ums Pferd, dann Gelände, dann Reitlehre Advanced, Abschluss am Ende:
   1 Pferd kennenlernen · 2 Sicher am Pferd · 3 Putzen & Pflege · 4 Satteln & Trensen · 5 Erste Reitstunden · 6 Reiten verstehen · 7 Haltung & Fütterung (m10) · 8 Gesundheit & Erste Hilfe (m11) · 9 Verhalten & Körpersprache (m12) · 10 Gelände & Ausreiten (m14) · 11 Reitlehre Advanced (m13) · 12–14 bisherige Module 7–9 (Abschluss zuletzt). Interne IDs und Fortschritt bleiben unverändert, nur die Anzeigenummer folgt der neuen Reihenfolge.
3. **Kids-Lernweg:** entfällt – derselbe Lernweg für alle.
4. **Fachprüfung:** laut Inhaberin erfolgt. Modul 10 ist als „geprüft“ markiert. Die Module 11–14 wurden am 13.11. nach dieser Aussage fertig geschrieben und sind intern noch als „Entwurf“ markiert, bis die Abnahme auch für diese Texte bestätigt ist (eine Zeile in den Dateien `w16`–`w19`: `deepLessonsOf(..., reviewed2026_11_13)`). Für Nutzer ist der Status unsichtbar.

## 8. Stand

| Inhalt | Stand |
|---|---|
| Lektionsformat A–H, Prüfskript (`npm run check:akademie`) | fertig |
| Module 10–14: 76 Lektionen mit Fachwissen, Praxis, Übung, Fehlern, Schritten, Merksätzen, Quiz, Weiterlernen | fertig |
| Fütterungsrechner (M10 L7), Reitlehre-Visualizer (M13 L9, L12, L17) | fertig, in den Lektionen eingebettet |
| Gesundheitsdetektiv, Pferdesprache-Quiz, Gelände-Simulator | fertig, als Spiele in den Modulen 11, 12, 14 |
| 28 animierte Lernvideos | gerendert und eingebunden, Vertonung per Action |
| 8 Realvideos + 3 Mischformen | Drehbücher fertig, Dreh offen |
| Englische Fassung der neuen Module | offen (im englischen Modus erscheinen sie deutsch) |
| Veröffentlichung | Branch `feature/akademie-modul-10` mit Vercel-Vorschau; Merge nach `main` erst nach Freigabe |

## 9. Quellen der fachlichen Angaben in Modul 10

- BMEL: Leitlinien zur Beurteilung von Pferdehaltungen unter Tierschutzgesichtspunkten (2009) – Boxenmaße, Deckenhöhe, Fresspausen, Wasser; in Überarbeitung.
- Merkblätter von Veterinärämtern (z. B. Landkreise Regen, Uelzen, Stade) – Fensterfläche, Stallgasse, Maße.
- Universität Leipzig, Institut für Tierernährung: Positionspapier Raufutter – 1,5 kg TS / 1,7 kg Heu / ca. 2 kg Heulage je 100 kg KM; Strohanteil.
- Liebegg (2024): Salz in der Pferdefütterung – Na/Cl-Bedarf, Verluste über Schweiß.
- Zeyner et al. (2017), Universität Halle-Wittenberg – hohe Salzgaben und Kalziumausscheidung.
- Ammoniak-Richtwert 10 ppm (BMVEL 2009, zitiert in ALB Baden-Württemberg).
- Alle übrigen Angaben: etabliertes Lehrbuchwissen; je Lektion im Feld `pruefen` zur Fachprüfung markiert.
