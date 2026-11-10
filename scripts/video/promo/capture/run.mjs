import path from "node:path";
const TOOLS="/opt/npm-tools/node_modules";
const { build } = await import(path.join(TOOLS,"esbuild/lib/main.js"));
const { chromium } = await import(path.join(TOOLS,"playwright/index.mjs"));
const APP="/home/claude/app";
await build({ entryPoints:["/home/claude/rlh/stills.tsx"], bundle:true, platform:"node", format:"cjs", outfile:"/home/claude/rlh/out.cjs", jsx:"automatic", alias:{"@":APP+"/src"}, nodePaths:[TOOLS], loader:{".css":"empty"}, logLevel:"error"});
const { createRequire } = await import("node:module"); const { render } = createRequire(import.meta.url)("/home/claude/rlh/out.cjs");
const groups = JSON.parse(process.argv[2]); const bad = process.argv[3]==="bad";
const browser = await chromium.launch(); const page = await browser.newPage({viewport:{width:1480,height:800}});
let n=0;
for (const g of groups){ await page.setContent(render(g,bad)); await page.screenshot({path:`/home/claude/rlh/s${bad?"b":""}${n++}.png`, fullPage:true}); }
await browser.close(); console.log("ok");
