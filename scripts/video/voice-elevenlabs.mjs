#!/usr/bin/env node
/**
 * Vertont Lernvideos mit ElevenLabs: erzeugt voice/video/<slug>/NN.mp3 aus
 * scripts/video/lines-text.json (vorher: node scripts/video/render.mjs <slugs> --lines).
 *
 *   ELEVENLABS_API_KEY=… node scripts/video/voice-elevenlabs.mjs              # alle Videos, nur fehlende Sätze
 *   ELEVENLABS_API_KEY=… node scripts/video/voice-elevenlabs.mjs anweiden     # ein Video
 *   … --force                                                                  # vorhandene neu erzeugen
 *
 * Stimme und Modell wie in der App: voice/config.json.
 * Danach je Video: node scripts/video/voice.mjs <slug> && node scripts/video/render.mjs <slug>
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const config = JSON.parse(readFileSync(path.join(ROOT, "voice/config.json"), "utf8"));
const KEY = process.env.ELEVENLABS_API_KEY;
const VOICE = process.env.ELEVENLABS_VOICE_ID || config.voiceId;
const MODEL = process.env.ELEVENLABS_MODEL || config.model || "eleven_v4";
if (!KEY) throw new Error("ELEVENLABS_API_KEY fehlt.");

const all = JSON.parse(readFileSync(path.join(ROOT, "scripts/video/lines-text.json"), "utf8"));
const slugs = only.length ? only : Object.keys(all);

async function synth(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE)}?output_format=mp3_44100_128`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ text, model_id: MODEL, language_code: "de" }),
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 1500 * attempt));
      continue;
    }
    throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  throw new Error("Zu viele Wiederholungen");
}

let made = 0;
for (const slug of slugs) {
  const lines = all[slug];
  if (!lines) {
    console.warn(`${slug}: keine Sprechertexte – erst „render.mjs ${slug} --lines“ ausführen`);
    continue;
  }
  const dir = path.join(ROOT, "voice", "video", slug);
  mkdirSync(dir, { recursive: true });
  for (let i = 0; i < lines.length; i++) {
    const file = path.join(dir, `${String(i + 1).padStart(2, "0")}.mp3`);
    if (existsSync(file) && !force) continue;
    writeFileSync(file, await synth(lines[i].text));
    made++;
  }
  console.log(`${slug}: ${lines.length} Sätze vorhanden`);
}
console.log(`Fertig: ${made} Aufnahmen erzeugt (Stimme ${config.voiceName ?? VOICE}, Modell ${MODEL}).`);
