#!/usr/bin/env node
/**
 * Aufnahmen mit einer KI-Stimme erzeugen (ElevenLabs).
 *
 *   ELEVENLABS_API_KEY=… npm run voice:generate
 *
 * Stimme und Modell stehen in voice/config.json (Voice-ID ist kein Geheimnis
 * und darf dort stehen). Der API-Schlüssel kommt NUR aus der Umgebung.
 *
 * Optionen:
 *   --limit 10     nur die ersten 10 fehlenden Sätze (zum Probehören)
 *   --only free    nur kostenlose Sätze  (oder: --only geisterweide)
 *   --force        auch vorhandene Aufnahmen neu erzeugen (z. B. nach Stimmwechsel)
 *   --dry-run      nur anzeigen, was erzeugt würde
 *
 * Feinabstimmung (optional, in voice/config.json oder als Umgebungsvariable):
 *   speed      / ELEVENLABS_SPEED       z. B. 0.92 = etwas langsamer für Kinder
 *   stability  / ELEVENLABS_STABILITY   höher = ruhiger, gleichmäßiger
 *   style      / ELEVENLABS_STYLE       höher = ausdrucksstärker
 * Nicht gesetzte Werte schickt das Skript gar nicht mit – dann gelten die
 * Einstellungen der Stimme aus dem ElevenLabs-Konto.
 *
 * Datenschutz: Erzeugt wird einmalig hier, nicht auf den Geräten der Kinder.
 * Der Dienst erhält nur die Texte aus dem Sprecherskript.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { loadScript, targetFile, writeManifest } from "./voice-lib.mjs";

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true) : undefined;
};

const CONFIG_FILE = path.join(process.cwd(), "voice", "config.json");
const config = existsSync(CONFIG_FILE) ? JSON.parse(readFileSync(CONFIG_FILE, "utf8")) : {};
const num = (env, fallback) => {
  const v = process.env[env] ?? fallback;
  return v === null || v === undefined || v === "" ? undefined : Number(v);
};

const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID || config.voiceId;
const MODEL = process.env.ELEVENLABS_MODEL || config.model || "eleven_v4";
const SETTINGS = Object.fromEntries(
  Object.entries({
    speed: num("ELEVENLABS_SPEED", config.speed),
    stability: num("ELEVENLABS_STABILITY", config.stability),
    style: num("ELEVENLABS_STYLE", config.style),
  }).filter(([, v]) => v !== undefined),
);
const dryRun = Boolean(opt("dry-run"));

if (!dryRun && (!KEY || !VOICE)) {
  console.error(
    !KEY
      ? "Bitte ELEVENLABS_API_KEY setzen (siehe docs/STIMME.md)."
      : "Bitte die Voice-ID in voice/config.json eintragen (in ElevenLabs: Stimme → „Copy voice ID“).",
  );
  process.exit(1);
}

const entries = loadScript();
const only = opt("only");
const limit = Number(opt("limit")) || Infinity;
const force = Boolean(opt("force"));

const todo = entries
  .filter((e) => (typeof only === "string" ? e.access === only : true))
  .filter((e) => force || !existsSync(targetFile(e)))
  .slice(0, limit);

const chars = todo.reduce((n, e) => n + e.text.length, 0);
console.log(`${todo.length} Sätze zu erzeugen (${chars} Zeichen) – Stimme ${config.voiceName ?? VOICE}, Modell ${MODEL}.`);
if (dryRun) {
  todo.slice(0, 20).forEach((e) => console.log(`  ${e.id}  ${e.text}`));
  process.exit(0);
}

let sendLanguage = true;

async function synth(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE)}?output_format=mp3_44100_64`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        // Sprache fest auf Deutsch, damit englische Stimmen deutsch aussprechen
        ...(sendLanguage ? { language_code: "de" } : {}),
        ...(Object.keys(SETTINGS).length ? { voice_settings: SETTINGS } : {}),
      }),
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if ((res.status === 400 || res.status === 422) && sendLanguage) {
      const body = await res.text();
      if (/language/i.test(body)) {
        // Modell kennt die Sprachangabe nicht – ohne sie erneut versuchen
        console.warn("\n  Hinweis: Modell akzeptiert language_code nicht, sende ohne.");
        sendLanguage = false;
        continue;
      }
      throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
    }
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 1500 * attempt));
      continue;
    }
    throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  throw new Error("Zu viele Wiederholungen");
}

let done = 0;
let failed = 0;
const queue = [...todo];
async function worker() {
  while (queue.length) {
    const e = queue.shift();
    try {
      const mp3 = await synth(e.text);
      const dest = targetFile(e);
      mkdirSync(path.dirname(dest), { recursive: true });
      writeFileSync(dest, mp3);
      done++;
      process.stdout.write(`\r  ${done}/${todo.length} erzeugt`);
    } catch (err) {
      failed++;
      console.error(`\n  Fehler bei ${e.id} („${e.text.slice(0, 40)}…“): ${err.message}`);
    }
  }
}
await Promise.all([worker(), worker(), worker()]);

const { present, missing } = writeManifest(entries, `elevenlabs:${config.voiceName ?? VOICE}:${MODEL}`);
console.log(`\nFertig: ${done} erzeugt, ${failed} Fehler. Aufnahmen vorhanden: ${present}, fehlen: ${missing}.`);
