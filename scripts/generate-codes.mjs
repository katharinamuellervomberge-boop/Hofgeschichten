#!/usr/bin/env node
/**
 * Erzeugt Freischaltcodes für ein Abenteuer.
 *
 *   LICENSE_SECRET=... npm run codes -- geisterweide 100 > codes.csv
 *
 * Gleiches LICENSE_SECRET wie bei Vercel verwenden! Die Codes gehören in
 * keine öffentliche Ablage. Einzelne Codes können über REVOKED_CODES gesperrt werden.
 */
import { createHmac, randomBytes } from "node:crypto";

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const [slug, countArg] = process.argv.slice(2);
const secret = process.env.LICENSE_SECRET;

if (!slug || !secret || secret.length < 32) {
  console.error("Aufruf: LICENSE_SECRET=<mind. 32 Zeichen> npm run codes -- <abenteuer-slug> [anzahl]");
  process.exit(1);
}
const count = Math.min(10000, Math.max(1, Number(countArg) || 50));

const idHash = createHmac("sha256", "hg-id").update(slug).digest();
const id = ALPHABET[idHash[0] % 32] + ALPHABET[idHash[1] % 32];

const seen = new Set();
console.log("code");
while (seen.size < count) {
  const r = randomBytes(6);
  const serial = Array.from(r, (b) => ALPHABET[b % 32]).join("");
  const body = id + serial;
  const h = createHmac("sha256", secret).update(body).digest();
  const sum = Array.from({ length: 4 }, (_, i) => ALPHABET[h[i] % 32]).join("");
  const code = `HG-${body.slice(0, 4)}-${body.slice(4, 8)}-${sum}`;
  if (!seen.has(code)) {
    seen.add(code);
    console.log(code);
  }
}
