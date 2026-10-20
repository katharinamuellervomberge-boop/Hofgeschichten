# Die Hofgeschichten – Interactive Detective Edition

**Echte Pferde. Große Abenteuer.** · Eine Produktion von Horse & Harmonie Kids Originals

Mobiloptimierte Pferde-Lernwelt und Detektivspiel-Plattform für Kinder
(Stufen: **Leicht 4–6 Jahre**, **Mittel 7–9 Jahre**; Stufe 10–12 folgt).

| Bereich | Inhalt | Zugang |
|---|---|---|
| Pferde kennenlernen | Steckbriefe Tivoli, Scrabble, Tonga + Körperteile entdecken | kostenlos |
| Pferde-Pflegeprofi | Putzzeug zuordnen (Drag & Drop oder Tippen) | kostenlos |
| Was braucht ein Pferd? | Lernquiz | kostenlos |
| Pferdesprache | Körpersignale erkennen und richtig reagieren | kostenlos |
| Mein Abenteuerpass | Stempel & Detektiv-Abzeichen | kostenlos |
| Das Geheimnis der Geisterweide | Halloween-Detektivfall, 5 Missionen | Premium 4,90 € |
| Mystery Files: Die Nacht im Geisterstall | Halloween-Detektivfall, 7 Missionen, ab 7 Jahren | Premium 4,90 € |
| Elternbereich | Freischaltung, Shop, Datenschutz, Einstellungen | – |

Weitere Dokumente:
- [`docs/LAUNCH-PLAN.md`](docs/LAUNCH-PLAN.md) – priorisierter Plan bis 31.10.
- [`docs/PREMIUM-FREISCHALTUNG.md`](docs/PREMIUM-FREISCHALTUNG.md) – Shopify-Einrichtung, Testkauf, Codes
- [`docs/INHALTE-ERWEITERN.md`](docs/INHALTE-ERWEITERN.md) – neue Spiele & Abenteuer ohne neuen Code
- [`docs/GITHUB-VERCEL.md`](docs/GITHUB-VERCEL.md) – Schritt für Schritt: GitHub und Vercel
- [`docs/STIMME.md`](docs/STIMME.md) – Vorlesestimme (für den Launch ausgeschaltet, kommt mit den Hörspielen)

---

## Schnellstart (lokal)

Voraussetzung: [Node.js](https://nodejs.org) ab 20.9.

```bash
npm install
cp .env.example .env.local   # optional: Werte für Premium eintragen
npm run dev
```

Dann `http://localhost:3000` öffnen. Ohne Umgebungsvariablen läuft alles Kostenlose; das
Premium-Abenteuer bleibt gesperrt (so soll es sein).

Premium lokal testen: `ENTITLEMENT_SECRET` und `LICENSE_SECRET` in `.env.local` setzen, einen Code erzeugen
und im Elternbereich unter „Freischaltcode“ eingeben:

```bash
LICENSE_SECRET=<gleicher Wert> npm run codes -- geisterweide 1
```

Produktions-Build prüfen: `npm run build && npm start`

---

## Veröffentlichung auf Vercel

1. Kostenloses Konto auf [github.com](https://github.com) → neues **privates** Repository `hofgeschichten`.
2. Projektordner hochladen (ohne `node_modules`, `.next`, `.env.local`):
   ```bash
   git init && git add . && git commit -m "Hofgeschichten Launch"
   git branch -M main
   git remote add origin https://github.com/<IHR-NAME>/hofgeschichten.git
   git push -u origin main
   ```
3. Auf [vercel.com](https://vercel.com) mit GitHub anmelden → **Add New → Project** → Repository importieren.
4. Vor dem ersten Deploy unter **Environment Variables** die Werte aus `.env.example` eintragen
   (Anleitung: `docs/PREMIUM-FREISCHALTUNG.md`). Können auch später ergänzt werden → dann **Redeploy**.
5. **Deploy** klicken. Nach 1–2 Minuten ist die App unter `https://hofgeschichten-xxxx.vercel.app` erreichbar.
6. Eigene Domain (z. B. `app.horseandharmonie-shop.de`): Vercel → Settings → Domains.

Jede Änderung, die nach GitHub gepusht wird, veröffentlicht Vercel automatisch.

---

## Projektstruktur

```
src/
  app/                       Routen (Next.js App Router)
    page.tsx                 Startseite
    pferde/[slug]/           Steckbrief  ·  /entdecken: Körperteile-Spiel
    spielen/[id]/            Lernspiele (aus Daten erzeugt)
    abenteuer/[slug]/        Abenteuer-Übersicht (Server prüft Kauf)
    abenteuer/[slug]/[m]/    Mission (Daten nur bei gültigem Kauf)
    pass/  eltern/           Abenteuerpass, Elternbereich
    api/freischalten/        Serverseitige Freischaltung (POST/DELETE)
    hoeren/                  Hörspiele (ausgeblendet, Code erhalten)
  engine/                    Spielkern: Typen, ActivityPlayer, Schritt-Komponenten
  content/
    games/                   Kostenlose Lernspiele als Daten
    adventures/index.ts      Öffentliche Angaben aller Abenteuer
    adventures/*.server.ts   Premium-Inhalte (server-only)
    horses.ts stamps.ts …
  lib/
    entitlements/            Token, Shopify-Prüfung, Codes, Drosselung (server-only)
    progress/                Lokaler Fortschritt (localStorage, austauschbarer Adapter)
    speech.ts                Vorlesen mit lokalen Gerätestimmen
  components/illustrations/  SVG-Illustrationen: Pferde, Szenen, Spuren, Gegenstände
  styles/globals.css         Designsystem
scripts/generate-codes.mjs   Freischaltcodes erzeugen
scripts/voice-*.{ts,mjs}     Sprecherskript, KI-Stimme erzeugen, Aufnahmen einsortieren
voice/                       Sprecherskript (CSV/JSON) und Eingangsordner für Aufnahmen
public/voice/  private/voice/  Aufnahmen (kostenlos / Premium, geschützt)
```

## Designsystem

Ivory `#F5F0E5` · Waldgrün `#344638` · Sand `#D9C6A5` · Braun `#80634D` – plus abgeleitete Töne in
`src/styles/globals.css`. Schriften Fraunces (Überschriften) und Andika (für Leseanfänger), selbst gehostet
über `next/font`. Touch-Flächen ≥ 56 px, Hauptaktionen 76–112 px.

**Für Leseanfänger:** Symbole statt Text in Navigation und Stufenwahl (Sterne), Bild-Antworten,
große Touch-Flächen, freundliche Hinweise statt Fehler. Die Vorlesefunktion (Lautsprecher-Knöpfe,
automatisches Vorlesen, KI-Stimme) ist fertig eingebaut, für den Launch aber ausgeschaltet
(`features.voice` in `src/content/site.ts`) und kommt mit den Hörspielen zurück.

**Barrierearm:** Alle interaktiven Bildbereiche sind fokussierbare Knöpfe; Drag & Drop hat eine
gleichwertige Tipp-Alternative; Live-Regionen für Rückmeldungen; `prefers-reduced-motion` wird beachtet.

## Datenschutz & Sicherheit

- Kein Kinderkonto, keine Chats, keine öffentlichen Profile, keine Werbung, keine Tracker.
- Spielfortschritt nur lokal (`localStorage`, Schlüssel `hofgeschichten.progress.v1`).
- Premium-Prüfung ausschließlich serverseitig; signiertes HttpOnly-Cookie ohne personenbezogene Daten.
- Kinder sehen keine Preise; Kauf und Freischaltung nur im Elternbereich.
- Sicherheits-Header in `next.config.ts`.

## Pferdeporträts

Die Aquarelle liegen in `public/horses/<slug>-480.webp` und `-960.webp` (Format 4:5). Neues Porträt:
Bild in beiden Größen ablegen und in `src/content/horses.ts` unter `portrait` eintragen.
Die gezeichneten Pferde in Spielen und Szenen nutzen die Fellfarben aus `look`.

## Offene Platzhalter (sichtbar gekennzeichnet)

- Aussehen der Hofkinder Lea, Mila, Ben (und Krümel, falls er ein echter Hund ist)
- Impressum & Datenschutzerklärung (`src/content/site.ts`)
