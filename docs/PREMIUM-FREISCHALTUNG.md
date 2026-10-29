# Premium-Freischaltung mit Shopify

## Launch-Weg (einfach): Freischaltkarte mit Code

Für den Launch am 31.10. reicht der einfache Weg (gilt für jedes Abenteuer, je ein eigener Code und eine eigene Freischaltkarte) – ohne Shopify-App im Dev Dashboard:

1. Bei Vercel nur `ENTITLEMENT_SECRET` und `LICENSE_SECRET` eintragen → Redeploy.
2. Shop-Produkt „Die Hofgeschichten – Das Geheimnis der Geisterweide“ (Digital Products, 4,90 €,
   Handle `das-geheimnis-der-geisterweide`) bekommt als Download eine **Freischaltkarte (PDF)** mit
   App-Link und Shop-Code.
3. Eltern: kaufen → PDF laden → App → Elternbereich → Code eingeben. Ohne Shopify-Einstellungen zeigt der
   Elternbereich automatisch nur das Code-Feld.

Sicherheit: Der Code wird ausschließlich auf dem Server geprüft (keine Schein-Sicherung). Grenze: Alle Käufer
erhalten denselben Shop-Code. Taucht er öffentlich auf, wird er über `REVOKED_CODES` gesperrt und die PDF im
Shop durch eine neue Karte mit neuem Code ersetzt; bereits freigeschaltete Geräte bleiben freigeschaltet.
Später auf den automatischen Weg (Bestellnummer, unten) umstellen – dann bekommt jede Bestellung ihre eigene Prüfung.

---

## Automatischer Weg: Bestellnummer + E-Mail

## Wie es funktioniert

```
Eltern kaufen im Shop ──► Bestellbestätigung (Bestellnummer, E-Mail)
                               │
Elternbereich der App ─────────┘  Bestellnummer + E-Mail eingeben
        │
        ▼
POST /api/freischalten  (Server, Vercel)
  1. Drosselung (8 Versuche / 15 min je IP)
  2. Shopify Admin API: Bestellung suchen, E-Mail exakt vergleichen,
     bezahlt? nicht storniert? enthält Produkt-Handle des Abenteuers?
  3. Signiertes Cookie „hg_ent“ (HttpOnly, Secure, SameSite=Lax, ~13 Monate)
        │
        ▼
/abenteuer/[slug]/[mission]  (Server-Komponente)
  Cookie prüfen ──► nur dann werden die Missionsdaten ausgeliefert
```

- **Keine Schein-Sicherung:** Die Missionsinhalte liegen in `src/content/adventures/*.server.ts`
  (Next.js „server-only“). Ohne gültiges Cookie verlassen sie den Server nicht.
  Das Cookie ist mit `ENTITLEMENT_SECRET` signiert; der Browser kann es weder lesen noch fälschen.
- **Datensparsam:** Die E-Mail wird nur für den Abgleich an Shopify geschickt und nicht gespeichert.
  Im Cookie stehen nur die Abenteuer-Kürzel und ein Ablaufdatum.
- **Kinder kaufen nicht:** Preis, Kauf-Link und Freischaltung gibt es nur im Elternbereich.
- **Fail closed:** Fehlt eine Umgebungsvariable, bleibt Premium gesperrt – es wird nie „aus Versehen“ freigeschaltet.

## Einrichtung (ca. 30 Minuten)

### 1. Produkt im Shop anlegen

- Titel: *Das Geheimnis der Geisterweide – Interaktives Halloween-Detektivabenteuer*
- Preis: 4,90 €, Produkttyp digital, **kein Versand** („Physisches Produkt“ abwählen)
- **Handle** (URL-Teil) exakt: `das-geheimnis-der-geisterweide`
  (oder anderen Handle wählen und in `src/content/adventures/index.ts` → `shopifyProductHandle` eintragen)
- In der Produktbeschreibung erklären: „Nach dem Kauf im Elternbereich der App mit Bestellnummer und E-Mail freischalten: <App-URL>/eltern“
- Tipp: Diesen Satz auch in die Vorlage der Bestellbestätigung (Einstellungen → Benachrichtigungen) aufnehmen.

### 2. App im Shopify Dev Dashboard anlegen

Seit 1. Januar 2026 lassen sich keine neuen „Legacy Custom Apps“ mehr im Shop-Admin erstellen.
Neue Apps entstehen im **Dev Dashboard** und holen sich ihr Zugriffstoken per *Client Credentials Grant*
(gilt 24 Stunden; die App erneuert es automatisch).

1. Das **Shopify Dev Dashboard** öffnen (erreichbar über den Shopify-Admin unter Einstellungen → Apps oder direkt über dev.shopify.com) und mit dem Shop-Inhaber-Konto anmelden.
2. Neue App erstellen, z. B. „Hofgeschichten Freischaltung“.
3. Unter **Konfiguration / Zugriffsbereiche (Scopes)**: `read_orders`
   (wenn auch Bestellungen älter als 60 Tage freigeschaltet werden sollen: zusätzlich `read_all_orders`).
4. **Geschützte Kundendaten:** Zugriff auf Bestelldaten und das Feld **E-Mail** aktivieren und den Zweck angeben
   („Abgleich der Bestell-E-Mail zur Freischaltung digitaler Inhalte“).
5. App-Version veröffentlichen und im eigenen Shop installieren.
   Wichtig: App und Shop müssen zur selben Organisation im Dev Dashboard gehören.
6. Unter **App-Einstellungen**: *Client ID* und *Client Secret* kopieren.

### 3. Umgebungsvariablen bei Vercel

Vercel → Projekt → Settings → Environment Variables (für *Production* und *Preview*):

| Name | Wert |
|---|---|
| `ENTITLEMENT_SECRET` | 32+ zufällige Zeichen (Befehl siehe `.env.example`) |
| `SHOPIFY_STORE_DOMAIN` | `<ihr-shop>.myshopify.com` |
| `SHOPIFY_CLIENT_ID` | aus Schritt 2 |
| `SHOPIFY_CLIENT_SECRET` | aus Schritt 2 |
| `LICENSE_SECRET` | weitere 32+ zufällige Zeichen (für Codes) |

Danach **Redeploy** auslösen.

### 4. Testkauf

1. Rabattcode „100 %“ für das Produkt anlegen (oder Shopify Bogus Gateway im Testmodus).
   Bei echten Testbestellungen (Testmodus) vorübergehend `SHOPIFY_ALLOW_TEST_ORDERS=1` setzen.
2. Produkt kaufen, Bestellbestätigung abwarten.
3. App → Elternbereich → Bestellnummer + E-Mail → **Freischalten** → Abenteuer muss spielbar sein.
4. Gegenprobe: falsche E-Mail, stornierte Bestellung, Bestellung ohne das Produkt → muss abgelehnt werden.
5. `SHOPIFY_ALLOW_TEST_ORDERS` wieder entfernen, Rabattcode löschen.

### 5. Zusätzlicher Schutz (empfohlen)

Vercel → Firewall → Rule: Pfad `/api/freischalten`, Rate Limit z. B. 10 Anfragen / 10 Minuten je IP.

## Ersatzweg: Freischaltcodes

Für Geschenke, Gewinnspiele, Support – oder als **sichere Übergangslösung**, falls die
Shopify-Anbindung bis zum Launch nicht fertig eingerichtet ist:

```bash
LICENSE_SECRET=<gleicher Wert wie bei Vercel> npm run codes -- geisterweide 200 > codes.csv
```

- Jeder Code ist einzigartig und wird serverseitig mit `LICENSE_SECRET` geprüft.
- Die Codes können über eine Shopify-App für Lizenzschlüssel automatisch nach dem Kauf verschickt
  oder manuell per E-Mail versendet werden.
- Missbrauchte Codes in `REVOKED_CODES` eintragen.
- Grenze: Ein Code kann ohne Datenbank nicht auf eine Anzahl Geräte begrenzt werden. Für 4,90 € ist das
  vertretbar; mit der späteren Datenbank (Familienmitgliedschaft) lässt sich das nachrüsten.

## Rechtliches (bitte prüfen lassen – keine Rechtsberatung)

- Digitale Inhalte: Hinweis auf das Erlöschen des Widerrufsrechts bei sofortiger Bereitstellung
  (ausdrückliche Zustimmung + Bestätigung im Checkout).
- Datenschutzerklärung: Abgleich von Bestellnummer/E-Mail mit Shopify; technisch notwendiges Cookie „hg_ent“;
  lokale Speicherung des Spielfortschritts (localStorage).
- Impressum in `src/content/site.ts` verlinken.

## Später: Familienmitgliedschaft

- Anmeldung der Eltern über die Shopify Customer Account API (OAuth) statt Bestellnummer.
- Kaufberechtigungen und Fortschritt in einer Datenbank (z. B. Postgres über Vercel Marketplace).
- Mitgliedschaft als Shopify-Abo-Produkt; `verifyShopifyOrder` wird um Abo-Status ergänzt.
- Der Fortschritt wechselt über einen zweiten `ProgressAdapter` (`src/lib/progress/types.ts`) auf den Server.

## Codes per Admin-Seite (ab 26.10.2026)

`/admin` (nicht verlinkt, `noindex`): Anmeldung mit `ADMIN_PASSWORD` (Vercel-Umgebungsvariable, mind. 12 Zeichen,
Typ „Secret“, Production). Erzeugt Codes für Mitgliedschaft (auch Hofpost, mit Startmonat), Große Reitakademie und
Premium-Abenteuer – direkt auf dem Server mit dem vorhandenen `LICENSE_SECRET`, ohne Terminal und ohne GitHub-Secret.
Bei einem einzelnen Code wird ein fertiger E-Mail-Text angezeigt. Codes werden nicht gespeichert.

## Stand 29.10.2026
- Dev-Dashboard-App „Hofgeschichten Freischaltung“ (Scopes `read_orders`, `read_products`) im Shop 3eacdc-b7 installiert.
- Vercel (Production): `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_CLIENT_ID`, `SHOPIFY_CLIENT_SECRET` gesetzt →
  Elternbereich zeigt „Bestellnummer + E-Mail“. Codes per Admin-Seite bleiben als Ersatzweg.
