// NODE_TOOLS=/opt/npm-tools/node_modules node scripts/video/render-reel.mjs <out.mp4> --comp <name> [--music mix.wav] [--stills t1,t2,...]
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
const ROOT = process.cwd();
const TOOLS = process.env.NODE_TOOLS ?? path.join(ROOT, "node_modules");
const { build } = await import(path.join(TOOLS, "esbuild/lib/main.js"));
const { chromium } = await import(path.join(TOOLS, "playwright/index.mjs"));
const FPS = 30;
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const out = path.resolve(process.argv[2]);
const comp = arg("--comp") ?? "zirkel";
const music = arg("--music") ? path.resolve(arg("--music")) : null;
const stills = arg("--stills") ? arg("--stills").split(",").map(Number) : null;
const TMP = path.join(ROOT, ".reel-tmp-" + comp);
mkdirSync(TMP, { recursive: true });
await build({
  entryPoints: [path.join(ROOT, "scripts/video/reel-harness.tsx")], bundle: true, outfile: path.join(TMP, "harness.js"), format: "esm", jsx: "automatic",
  loader: { ".module.css": "local-css", ".css": "css", ".json": "json" }, nodePaths: [TOOLS], define: { "process.env.NODE_ENV": '"production"' },
  banner: { js: "globalThis.process = globalThis.process || { env: {} };" },
  plugins: [{ name: "alias", setup(b) {
    b.onResolve({ filter: /^@\// }, (a) => b.resolve("./" + a.path.slice(2), { resolveDir: path.join(ROOT, "src"), kind: a.kind }));
    b.onResolve({ filter: /^server-only$/ }, () => ({ path: path.join(ROOT, "scripts/video/empty.js") }));
  } }], logLevel: "error",
});
// Fraunces aus public/fonts (falls vorhanden); Andika fällt sonst auf die Systemschrift zurück
const fonts = existsSync(path.join(ROOT, "public/fonts/fraunces-latin-600-normal.woff2"))
  ? "@font-face{font-family:Fraunces;src:url(/fonts/fraunces-latin-600-normal.woff2) format('woff2');font-weight:100 900}"
  : "";
writeFileSync(path.join(TMP, "index.html"), `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0}${fonts}</style></head><body><div id="root"></div><span style="font-family:Fraunces;position:absolute;opacity:0">Aa</span><script type="module" src="harness.js"></script></body></html>`);
const server = createServer(async (req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  const file = url === "/" ? path.join(TMP, "index.html") : existsSync(path.join(TMP, url)) ? path.join(TMP, url) : path.join(ROOT, "public", url);
  try { const body = await readFile(file); res.writeHead(200, { "Content-Type": file.endsWith(".js") ? "text/javascript" : file.endsWith(".css") ? "text/css" : file.endsWith(".webp") ? "image/webp" : file.endsWith(".png") ? "image/png" : file.endsWith(".woff2") ? "font/woff2" : "text/html" }); res.end(body); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on("pageerror", (e) => console.error("PAGE", e.message));
await page.goto(`http://localhost:${port}/?c=${comp}`);
await page.waitForFunction(() => window.__setT);
await page.evaluate(() => window.__ready);
await page.waitForTimeout(800);
const total = await page.evaluate(() => window.__total);
if (stills) {
  mkdirSync(out, { recursive: true });
  for (const t of stills) { await page.evaluate((x) => window.__setT(x), t); await page.screenshot({ path: path.join(out, `t${t}.png`) }); }
} else {
  const dir = path.join(TMP, "frames"); rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  const n = Math.ceil(total * FPS);
  for (let i = 0; i < n; i++) { await page.evaluate((t) => window.__setT(t), i / FPS); await page.screenshot({ path: path.join(dir, `${String(i).padStart(5, "0")}.jpg`), type: "jpeg", quality: 93 }); }
  const audio = music ? ["-i", music, "-map", "0:v", "-map", "1:a", "-c:a", "aac", "-b:a", "160k"] : [];
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "%05d.jpg"), ...audio,
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-pix_fmt", "yuv420p", "-t", String(total), "-movflags", "+faststart", out]);
  rmSync(dir, { recursive: true, force: true });
}
console.log("fertig", out, total);
await browser.close(); server.close();
