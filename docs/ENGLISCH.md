# Englische Version (seit 30.10.2026)

- Adresse: `/en/...` – `src/proxy.ts` schreibt intern auf die deutschen Seiten um und setzt den Header `x-hg-locale: en`.
  Server: `getLocale()` (`src/i18n/server.ts`), Browser: `useLocale()` / `Link` aus `@/i18n/Link` (setzt `/en` automatisch davor).
- Sprachwechsel DE/EN oben in der Leiste (volles Neuladen).
- Englisch sichtbar: Startseite, Reitakademie (alle 9 Module, 81 Lektionen, 4 Übungsspiele), Seite „Unlock“ (`/en/eltern`).
  Noch nicht: Hofwelt, Spielen, Profil, Detektivfälle, Lernvideos (deutsch vertont), Zertifikat, Rechtstexte.
- Inhalte: Deutsch bleibt die Quelle. Englisch steht in `src/content/akademie/en/*.json`
  (Schlüssel = Prüfsumme des deutschen Textes, `textKey()` in `src/i18n/translate.ts`).
  Ändert sich ein deutscher Text, fehlt die Übersetzung → `npm run check:en` meldet sie, `npm run en:extract -- w3` listet sie.
- Bildbeschriftungen: `src/i18n/svg-labels.ts`. Feste Oberflächentexte: direkt in den Komponenten (`en ? … : …`) bzw. `src/engine/texts.ts`.
- Reitenglisch: britisch, US-Begriffe wo nötig erklärt (z. B. rising trot / posting trot).
- Kauf: gleiches Shopify-Produkt; englische Shopseite über die Märkte UK (`/en-gb`) und USA (`/en-us`), Auswahl im Browser (`regionalCheckoutUrl`).
  Freischaltung unverändert über Bestellnummer + E-Mail.
