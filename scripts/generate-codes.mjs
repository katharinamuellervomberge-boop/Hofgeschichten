#!/usr/bin/env node
/**
 * Erzeugt Freischaltcodes für ein Abenteuer.
 *
 *   LICENSE_SECRET=... npm run codes -- geisterweide 100 > codes.csv
 *
 * Mitgliedschaft (12 Monate ab Startmonat, Gerätebindung greift bei der Aktivierung):
 *   LICENSE_SECRET=... npm run codes -- mitgliedschaft 1 2026-10
 *   Startmonat = Monat der bestätigten Zahlung. Codes NUR nach bestätigter Zahlung erzeugen.
 *
 * Gleiches LICENSE_SECRET wie bei Vercel verwenden! Die Codes gehören in
 * keine öffentliche Ablage. Einzelne Codes können über REVOKED_CODES gesperrt werden.
 */
import { createHmac, randomBytes } from "node:crypto";

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const [slug, countArg, startArg] = process.argv.slice(2);
const secret = process.env.LICENSE_SECRET;

if (!slug || !secret || secret.length < 32) {
  console.error("Aufruf: LICENSE_SECRET=<mind. 32 Zeichen> npm run codes -- <abenteuer-slug> [anzahl]");
  process.exit(1);
}
const count = Math.min(10000, Math.max(1, Number(countArg) || 50));

const idHash = createHmac("sha256", "hg-id").update(slug).digest();
const id = ALPHABET[idHash[0] % 32] + ALPHABET[idHash[1] % 32];

const isMembership = slug === "mitgliedschaft";
let monthPart = "";
if (isMembership) {
  const m = /^(\d{4})-(\d{2})$/.exec(startArg ?? "");
  if (!m) {
    console.error("Mitgliedschaft: Startmonat angeben, z. B. npm run codes -- mitgliedschaft 1 2026-10");
    process.exit(1);
  }
  const idx = (Number(m[1]) - 2026) * 12 + (Number(m[2]) - 1);
  if (idx < 0 || idx > 1023) {
    console.error("Startmonat außerhalb des gültigen Bereichs.");
    process.exit(1);
  }
  monthPart = ALPHABET[Math.floor(idx / 32)] + ALPHABET[idx % 32];
  const until = new Date(Date.UTC(2026, idx + 13, 1) - 1000);
  console.error(`Gültig bis einschließlich ${until.toISOString().slice(0, 10)}`);
}

const seen = new Set();
console.log("code");
while (seen.size < count) {
  const r = randomBytes(6);
  const serial = Array.from(r, (b) => ALPHABET[b % 32]).join("").slice(0, isMembership ? 4 : 6);
  const body = id + monthPart + serial;
  const h = createHmac("sha256", secret).update(body).digest();
  const sum = Array.from({ length: 4 }, (_, i) => ALPHABET[h[i] % 32]).join("");
  const code = `HG-${body.slice(0, 4)}-${body.slice(4, 8)}-${sum}`;
  if (!seen.has(code)) {
    seen.add(code);
    console.log(code);
  }
}
