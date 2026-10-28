# Umstrukturierung „Reitakademie im Mittelpunkt“ (28.10.2026)

Ziel: In wenigen Sekunden verstehen – *Ich kann hier Reiten lernen, mein Wissen spielerisch testen
und Teil einer besonderen Pferdewelt werden.* Keine Neuentwicklung: bestehende Seiten, Inhalte,
Lektions-IDs, Freischaltungen und URLs bleiben erhalten und werden neu angeordnet.

## Entscheidungen der Inhaberin (28.10.)
- **Gratis-Teil:** Die erste Lektion jedes Moduls ist kostenlos (6 Probelektionen). Alles andere gehört zur
  Reitakademie (14,90 € einmalig).
- **Mitgliedschaft und Akademie sind getrennt – für alle.** Die Mitgliedschaft schaltet die Akademie nicht mehr frei
  (auch nicht für bestehende Mitglieder). Schalter: `academy.includedInMembership` in `src/content/products.ts`.
- **Lernwege:** Kids / Teen / Adult werden jetzt gewählt. Kids nutzt die Texte der Stufe „Leicht“, Teen und Adult die
  Texte der Stufe „Mittel“. Eigene Teen-/Adult-Fassungen folgen in Phase 2.

## Neue Leiste (5 Punkte)
| Punkt | Adresse | enthält / markiert auch |
|---|---|---|
| Start | `/` | – |
| Reitakademie | `/akademie` | `/akademie/*` |
| Spielen | `/spielen` | `/spielen/*` |
| Hofwelt | `/hofwelt` | `/pferde`, `/abenteuer`, `/hofjahr`, `/hoeren`, `/mitgliedschaft` |
| Profil | `/profil` | `/pass`, `/eltern` |

## Was wohin wandert (wiederverwendet)
- **Start** (`HomeScreen`): Begrüßung, Headline, große Akademie-Kachel, Kacheln „Spielen & Wissen“ und „Hofwelt“,
  kleiner Founder-Bereich, „Dort weitermachen, wo du aufgehört hast“ (aus dem lokalen Fortschritt).
  Detektivfall-Werbung und Stufenwahl entfallen auf der Startseite.
- **Reitakademie:** neue Modul-Ebene `src/content/akademie/module.ts` über den bestehenden 40 Lektionen
  (IDs `ra-w<n>-l<m>` unverändert → Fortschritt bleibt). Lernweg-Wahl beim ersten Öffnen, wechselbar.
  Neue Adresse `/akademie/modul/<slug>`. Lektionen bleiben unter `/akademie/<welt>/<lektion>`.
  Themen ohne Lektion (z. B. Putzen, Hufe, Herdenleben) erscheinen als „In Vorbereitung“.
  Lernvideos jetzt direkt auf der Akademie-Seite. `/akademie/klein` und `/akademie/gross` leiten auf `/akademie` weiter.
  Alle Lektionsinhalte liegen jetzt serverseitig (`welten/*.server.ts`); der Katalog ohne Inhalte steht in
  `katalog.generated.ts`.
- **Spielen:** kuratierte Liste (Pferdewissen-Quiz, Gangarten erkennen, Pferdepflege-Spiel, Reiterhilfen zuordnen,
  Wissens-Challenges) aus bestehenden Hof- und Akademiespielen. Große Hofspiele für Mitglieder wandern in die Hofwelt.
- **Hofwelt** (neu `/hofwelt`): Pferde Tivoli, Tonga, Scrabble · Hofkinder und Hof-Leute · Detektivfälle/Abenteuer
  · Wochenpakete für Mitglieder · Hörgeschichten (sobald `features.audio`) · Saisonales · Founder-Mitgliedschaft und Hofpost
  als zwei getrennte Angebote. Bestehende Seiten `/pferde`, `/abenteuer`, `/hofjahr`, `/mitgliedschaft` bleiben.
- **Profil** (neu `/profil`): Lernweg, Lernfortschritt, Abzeichen-Pass, Freischaltungen dieses Geräts,
  die drei Produkte, Einstellungen, Link in den Elternbereich (Code-Eingabe bleibt dort).

## Produkte (klar getrennt)
1. Reitakademie – 14,90 € einmalig, dauerhafter Zugriff (Shop-Produkt + Freischaltcode `grosse-akademie`, unverändert)
2. Founder-Mitgliedschaft – 39,90 € im ersten Jahr (Konditionen laut AGB § 4.1 unverändert angezeigt)
3. Hofpost Premium – 119 € im ersten Jahr inkl. 12 Briefe

## Offen / Phase 2
- Eigene Teen- und Adult-Texte, Erklärvideos für alle Lektionen, fehlende Themen (Putzen, Hufe, Führen, Herdenleben,
  Körpersprache, Kommunikation, Anfängerfehler, Sicherer im Sattel).
- AGB/Verkaufstexte: Zielgruppe bisher 4–12 – mit Teen/Adult-Lernweg anpassen; Mitgliedschaft enthielt bisher die
  Große Akademie → Bestandsmitglieder informieren (juristisch prüfen).
- App-Store-Veröffentlichung: Apple/Google verlangen für digitale Inhalte in Apps grundsätzlich In-App-Käufe;
  der Shop-Code-Weg muss vor Dezember geprüft werden.
