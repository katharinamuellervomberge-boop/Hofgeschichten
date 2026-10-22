# Founder-Mitgliedschaft (Hof-Mitgliedschaft)

Stand: 22.10.2026. Entscheidungen der Inhaberin: **39,90 €** für die ersten 12 Monate, danach
**läuft die Mitgliedschaft mit 9,90 €/Monat weiter** (AGB § 4.1), Checkout über **Shopify**,
Gerätebindung über **Upstash Redis**.

## Was die App macht

| Bereich | Wo | Hinweis |
|---|---|---|
| Verkaufsseite | `/mitgliedschaft` | Kauf-Knopf erscheint erst, wenn `membership.checkoutUrl` gesetzt ist (`src/content/membership.ts`) |
| Mein Hofjahr (Kinder) | `/hofjahr` | Fortschritt, 5 Abzeichen, Freitagsfolgen – nur lokal |
| Freitagsfolgen | `/hofjahr/<slug>` | Server prüft Mitgliedschaft **und** Termin, vorher keine Inhalte |
| Hofspiel | `/hofjahr/ein-tag-auf-dem-hof` | ab 20.11.2026, 6 Teile |
| Premium-Lektion | `/hofjahr/sprache-der-pferde` | ab 13.11.2026, Lernpfad in `/spielen/akademie` |
| Freischaltung | Elternbereich | Bestellnummer + E-Mail (Shopify) **oder** Mitgliedscode |
| Kündigungsbutton | `/kuendigen` | § 312k BGB, Bestätigung per E-Mail (Resend) |
| Widerrufsbelehrung | `/widerruf` | gesetzliches Muster – juristisch prüfen |

Mitglieder haben zusätzlich sofort Zugriff auf alle Premium-Detektivfälle (Geisterweide, Geisterstall).

## Neue Freitagsfolge veröffentlichen

1. In `src/content/membership.ts` → `releases` einen Eintrag ergänzen (oder vorhandenen auf `ready: true` setzen).
2. Inhalte in `src/content/premium/<slug>.server.ts` anlegen, in `registry.server.ts` eintragen.
3. `npm run check:premium` ausführen. Push auf `main`. Die Folge öffnet sich am Termin automatisch.

Vorab testen: in Vercel nur für **Preview** `RELEASE_PREVIEW=1` setzen, Branch pushen, mit Mitgliedscode freischalten.

## Kaufablauf

1. Eltern kaufen im Shop das Produkt mit Handle `founder-mitgliedschaft`.
2. Elternbereich → Bestellnummer + E-Mail. Der Server fragt Shopify: bezahlt, nicht storniert, Produkt enthalten?
3. Erst dann wird der persönliche Mitgliedscode (aus der Bestellung abgeleitet, jederzeit wieder abrufbar) erzeugt,
   angezeigt und das Gerät freigeschaltet. Gültig bis Ende des Monats 12 Monate nach Kaufmonat.
4. Ersatzweg ohne Shopify-Anbindung: Inhaberin erzeugt nach bestätigter Zahlung einen Code
   `LICENSE_SECRET=… npm run codes -- mitgliedschaft 1 2026-10` und schickt ihn der Familie.

## Gerätewechsel und Support

- Ein Mitgliedscode gilt für **ein Gerät** (`MEMBERSHIP_DEVICE_LIMIT`, Standard 1).
- Selbst: altes Gerät → Elternbereich → „Freischaltung von diesem Gerät entfernen“ → neues Gerät freischalten.
- Support (altes Gerät weg): Kauf prüfen, dann
  `UPSTASH_REDIS_REST_URL=… UPSTASH_REDIS_REST_TOKEN=… npm run support -- reset HG-17XX-XXXX-XXXX`
- Missbrauch / Erstattung: Code in `REVOKED_CODES` (Vercel) eintragen, neu bereitstellen. Wirkt sofort auf allen Geräten.

## Umgebungsvariablen (Vercel → Production)

| Variable | Zweck | Status 22.10. |
|---|---|---|
| `LICENSE_SECRET`, `ENTITLEMENT_SECRET` | Codes und Cookie | gesetzt |
| `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_CLIENT_ID`, `SHOPIFY_CLIENT_SECRET` | Bestellprüfung | **fehlt** |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (oder `KV_REST_API_*`) | Gerätebindung | **fehlt** (ohne: kein Gerätelimit) |
| `MEMBERSHIP_DEVICE_LIMIT` | optional, Standard 1 | – |
| `RESEND_API_KEY`, `CANCEL_FROM_EMAIL`, `CANCEL_NOTIFY_EMAIL` | Kündigungsbestätigung | **fehlt** (ohne: Formular verweist auf E-Mail-Kündigung) |
| `RELEASE_PREVIEW` | nur Preview | – |

## Offen vor dem rechtssicheren Verkaufsstart

1. **Datenschutzerklärung** fehlt (muss u. a. Shopify, Vercel, Upstash, Resend, Cookie nennen).
2. **Abo im Shop:** Basic-Plan ohne Abo-App. Für „39,90 € vorab, danach 9,90 €/Monat“ braucht es eine
   Abo-App (z. B. Shopify Subscriptions) mit Verkaufsplan; die Umstellung auf monatlich nach 12 Monaten
   muss mit der App geprüft werden. Bis das steht, keine automatische Folgeabrechnung möglich.
3. **Widerrufsbelehrung** prüfen lassen, im Shop-Checkout bereitstellen; ggf. Zustimmung zum vorzeitigen
   Leistungsbeginn (§ 356 Abs. 5 BGB) im Checkout einholen.
4. **Kündigungsbutton** auch im Shop verlinken (Fußzeile „Verträge hier kündigen“ → `/kuendigen`), Resend einrichten.
5. Bestellbestätigung: Hinweis auf Freischaltung im Elternbereich ergänzen.
6. Testkauf (100-%-Rabatt, `SHOPIFY_ALLOW_TEST_ORDERS=1` nur kurz) + Freischaltung + Gerätewechsel durchspielen.
7. Fachliche Abnahme „Ein Tag auf dem Hof“ und „Die Sprache der Pferde“ durch eine Reitlehrkraft.
