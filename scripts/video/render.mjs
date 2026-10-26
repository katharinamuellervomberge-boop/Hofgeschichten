#!/usr/bin/env node
/**
 * Rendert Lernvideos der Reitakademie Bild für Bild (Playwright + ffmpeg).
 *
 *   node scripts/video/render.mjs                 # alle Videos
 *   node scripts/video/render.mjs leichttraben    # ein Video
 *   node scripts/video/render.mjs leichttraben --stills   # nur Standbilder je Satz (Vorschau)
 *
 * Braucht: esbuild und playwright (NODE_TOOLS=Pfad zu deren node_modules, Standard: ./node_modules),
 * ffmpeg im PATH. Ergebnis: private/akademie-video/<slug>.mp4 und .jpg (Vorschaubild).
 * Liegen Sprecheraufnahmen in voice/video/<slug>/NN.mp3, werden sie automatisch daruntergelegt.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TOOLS = process.env.NODE_TOOLS ?? path.join(ROOT, "node_modules");
const { build } = await import(path.join(TOOLS, "esbuild/lib/main.js"));
const { chromium } = await import(path.join(TOOLS, "playwright/index.mjs"));
const FPS = 25;
const args = process.argv.slice(2);
const stills = args.includes("--stills");
const only = args.filter((a) => !a.startsWith("--"));
const OUT = path.join(ROOT, "private/akademie-video");
const TMP = path.join(ROOT, ".video-tmp");
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

await build({
  entryPoints: [path.join(ROOT, "scripts/video/harness.tsx")],
  bundle: true,
  outfile: path.join(TMP, "harness.js"),
  format: "esm",
  jsx: "automatic",
  loader: { ".module.css": "local-css", ".css": "css", ".json": "json" },
  nodePaths: [TOOLS],
  define: { "process.env.NODE_ENV": '"production"' },
  banner: { js: "globalThis.process = globalThis.process || { env: {} };" },
  plugins: [{ name: "alias", setup(b) {
    b.onResolve({ filter: /^@\// }, (a) => b.resolve("./" + a.path.slice(2), { resolveDir: path.join(ROOT, "src"), kind: a.kind }));
    b.onResolve({ filter: /^server-only$/ }, () => ({ path: path.join(ROOT, "scripts/video/empty.js") }));
  } }],
  logLevel: "error",
});
writeFileSync(path.join(TMP, "index.html"), '<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0}</style></head><body><div id="root"></div><script type="module" src="harness.js"></script></body></html>');

// kleiner Server: .video-tmp für die Seite, public/ für Bilder (z. B. /kids/…)
const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  const file = url === "/" ? path.join(TMP, "index.html") : existsSync(path.join(TMP, url)) ? path.join(TMP, url) : path.join(ROOT, "public", url);
  try {
    const body = await readFile(file);
    const type = file.endsWith(".js") ? "text/javascript" : file.endsWith(".css") ? "text/css" : file.endsWith(".html") ? "text/html" : file.endsWith(".webp") ? "image/webp" : "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const list = await (async () => {
  await page.goto(`http://localhost:${port}/?v=leichttraben`);
  await page.waitForFunction(() => window.__setT);
  return only.length ? only : (await import(path.join(ROOT, "scripts/video/list.mjs"))).VIDEO_SLUGS;
})();

for (const slug of list) {
  await page.goto(`http://localhost:${port}/?v=${slug}`);
  await page.waitForFunction(() => window.__setT);
  await page.waitForTimeout(600);
  const total = await page.evaluate(() => window.__total);
  const lines = await page.evaluate(() => window.__lines);
  if (stills) {
    mkdirSync(path.join(TMP, "stills"), { recursive: true });
    for (const l of lines) {
      await page.evaluate((t) => window.__setT(t), (l.start + l.end) / 2);
      await page.screenshot({ path: path.join(TMP, "stills", `${slug}-${l.id}.png`) });
    }
    console.log(`${slug}: Standbilder in .video-tmp/stills`);
    continue;
  }
  const dir = path.join(TMP, slug);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const n = Math.ceil(total * FPS);
  for (let i = 0; i < n; i++) {
    await page.evaluate((t) => window.__setT(t), i / FPS);
    await page.screenshot({ path: path.join(dir, `${String(i).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
  }
  const mp4 = path.join(OUT, `${slug}.mp4`);
  const voiceDir = path.join(ROOT, "voice", "video", slug);
  const clips = existsSync(voiceDir) ? lines.map((l, i) => ({ l, f: path.join(voiceDir, `${String(i + 1).padStart(2, "0")}.mp3`) })).filter((c) => existsSync(c.f)) : [];
  const vArgs = ["-framerate", String(FPS), "-i", path.join(dir, "%05d.jpg")];
  if (clips.length) {
    // jede Aufnahme an den Anfang ihres Satzes legen
    const inputs = clips.flatMap((c) => ["-i", c.f]);
    const filter = clips.map((c, i) => `[${i + 1}:a]adelay=${Math.round(c.l.start * 1000)}|${Math.round(c.l.start * 1000)}[a${i}]`).join(";") + ";" + clips.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${clips.length}:normalize=0,apad[aout]`;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...vArgs, ...inputs, "-filter_complex", filter, "-map", "0:v", "-map", "[aout]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-t", String(total), "-movflags", "+faststart", mp4]);
  } else {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...vArgs, "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
  }
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "1.8", "-i", mp4, "-frames:v", "1", "-q:v", "3", path.join(OUT, `${slug}.jpg`)]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`${slug}: ${total.toFixed(1)} s${clips.length ? `, ${clips.length} Aufnahmen` : ", ohne Ton"}`);
}
await browser.close();
server.close();
