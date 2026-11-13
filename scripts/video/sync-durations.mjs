#!/usr/bin/env node
/**
 * Trägt die tatsächliche Länge jedes gerenderten Lernvideos (private/akademie-video/<slug>.mp4)
 * und den Ton-Status (voice/video/<slug>/01.mp3 vorhanden?) in src/content/akademie/videos.ts ein.
 *   node scripts/video/sync-durations.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const file = path.join(ROOT, "src/content/akademie/videos.ts");
let src = readFileSync(file, "utf8");
let n = 0;
src = src.replace(/\{ slug: "([a-z0-9-]+)",([^\n]*?)seconds: \d+, voiced: (true|false) \}/g, (all, slug, mid, voiced) => {
  const mp4 = path.join(ROOT, "private/akademie-video", `${slug}.mp4`);
  if (!existsSync(mp4)) return all;
  const sec = Math.round(Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4]).toString().trim()));
  const hasVoice = existsSync(path.join(ROOT, "voice/video", slug, "01.mp3")) || voiced === "true";
  n++;
  return `{ slug: "${slug}",${mid}seconds: ${sec}, voiced: ${hasVoice} }`;
});
writeFileSync(file, src);
console.log(`${n} Videos aktualisiert`);
