#!/usr/bin/env node
/**
 * Misst die Sprecheraufnahmen (voice/<slug>/01.mp3, 02.mp3 …) und trägt die
 * Längen in src/video/durations.json ein. Danach neu rendern:
 *
 *   node scripts/video/voice.mjs leichttraben
 *   node scripts/video/render.mjs leichttraben
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const slug = process.argv[2];
if (!slug) throw new Error("Aufruf: node scripts/video/voice.mjs <slug>");
const ids = JSON.parse(execFileSync("node", ["-e", `
  const s = require("fs").readFileSync(${JSON.stringify(path.join(ROOT, "scripts/video/lines.json"))}, "utf8");
  process.stdout.write(JSON.stringify(JSON.parse(s)[${JSON.stringify(slug)}]));`]).toString());
const file = path.join(ROOT, "src/video/durations.json");
const all = JSON.parse(readFileSync(file, "utf8"));
all[slug] = {};
ids.forEach((id, i) => {
  const f = path.join(ROOT, "voice", slug, `${String(i + 1).padStart(2, "0")}.mp3`);
  if (!existsSync(f)) return console.log(`fehlt: ${path.relative(ROOT, f)} (Satz ${id})`);
  const sec = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString().trim());
  all[slug][id] = Math.round(sec * 100) / 100;
});
writeFileSync(file, JSON.stringify(all, null, 2) + "\n");
console.log(`${slug}: ${Object.keys(all[slug]).length} Aufnahmen gemessen`);
