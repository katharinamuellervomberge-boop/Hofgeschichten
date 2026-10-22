#!/usr/bin/env node
/**
 * Support: Gerätebindung eines Mitgliedscodes anzeigen oder zurücksetzen.
 *
 *   UPSTASH_REDIS_REST_URL=… UPSTASH_REDIS_REST_TOKEN=… npm run support -- status HG-17XX-XXXX-XXXX
 *   UPSTASH_REDIS_REST_URL=… UPSTASH_REDIS_REST_TOKEN=… npm run support -- reset  HG-17XX-XXXX-XXXX
 *
 * Ablauf im Supportfall (altes Gerät verloren/kaputt): Kaufnachweis prüfen
 * (Bestellnummer + E-Mail im Shop), dann „reset“. Danach kann die Familie den Code
 * auf dem neuen Gerät eingeben. Missbrauch (Code öffentlich geteilt): Code in
 * REVOKED_CODES bei Vercel eintragen und neu bereitstellen.
 * Die Zugangsdaten stehen bei Vercel unter Storage → Upstash → .env.local.
 */
const [action, raw] = process.argv.slice(2);
const url = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "").replace(/\/$/, "");
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

if (!["status", "reset"].includes(action) || !raw || !url || !token) {
  console.error("Aufruf: UPSTASH_REDIS_REST_URL=… UPSTASH_REDIS_REST_TOKEN=… npm run support -- <status|reset> <code>");
  process.exit(1);
}

const c = raw.toUpperCase().replace(/[^0-9A-Z]/g, "");
const code = (c.length === 14 && c.startsWith("HG") ? c.slice(2) : c).replace(/O/g, "0").replace(/[IL]/g, "1");
if (code.length !== 12) {
  console.error("Das sieht nicht nach einem Code aus (HG-XXXX-XXXX-XXXX).");
  process.exit(1);
}

async function cmd(args) {
  const res = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(args) });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
  return json.result;
}

const key = `hg:dev:${code}`;
const n = await cmd(["SCARD", key]);
console.log(`Code HG-${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8)}: ${n} aktive(s) Gerät(e)`);
if (action === "reset") {
  await cmd(["DEL", key]);
  console.log("Gerätebindung zurückgesetzt. Der Code kann jetzt auf einem neuen Gerät eingegeben werden.");
}
