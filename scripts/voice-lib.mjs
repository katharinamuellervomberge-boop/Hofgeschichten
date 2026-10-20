/**
 * Gemeinsame Helfer für voice:generate und voice:manifest.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();
export const SCRIPT = path.join(ROOT, "voice", "script.json");
export const INBOX = path.join(ROOT, "voice", "inbox");
export const PUBLIC_DIR = path.join(ROOT, "public", "voice");
export const PRIVATE_DIR = path.join(ROOT, "private", "voice");
export const MANIFEST = path.join(ROOT, "src", "content", "voice-manifest.json");

export function loadScript() {
  if (!existsSync(SCRIPT)) {
    console.error("voice/script.json fehlt. Bitte zuerst `npm run voice:export` ausführen.");
    process.exit(1);
  }
  return JSON.parse(readFileSync(SCRIPT, "utf8")).entries;
}

export function targetFile(entry) {
  return entry.access === "free"
    ? path.join(PUBLIC_DIR, `${entry.id}.mp3`)
    : path.join(PRIVATE_DIR, entry.access, `${entry.id}.mp3`);
}

/** Dateien aus voice/inbox/<kennung>.mp3 an die richtige Stelle verschieben. */
export function sortInbox(entries) {
  if (!existsSync(INBOX)) return 0;
  const byId = new Map(entries.map((e) => [e.id, e]));
  let moved = 0;
  for (const f of readdirSync(INBOX)) {
    if (!f.endsWith(".mp3")) continue;
    const e = byId.get(f.replace(/\.mp3$/, ""));
    if (!e) {
      console.warn(`  übersprungen (Kennung unbekannt): ${f}`);
      continue;
    }
    const dest = targetFile(e);
    mkdirSync(path.dirname(dest), { recursive: true });
    renameSync(path.join(INBOX, f), dest);
    moved++;
  }
  return moved;
}

/** Manifest neu schreiben: nur Sätze, die im Skript stehen UND eine Datei haben. */
export function writeManifest(entries, voiceName = null) {
  const clips = {};
  let missing = 0;
  for (const e of entries) {
    if (existsSync(targetFile(e))) clips[e.id] = e.access;
    else missing++;
  }
  const prev = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
  const sorted = Object.fromEntries(Object.entries(clips).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(
    MANIFEST,
    JSON.stringify({ version: 1, voice: voiceName ?? prev.voice ?? null, clips: sorted }, null, 2) + "\n",
  );
  return { present: Object.keys(clips).length, missing };
}
