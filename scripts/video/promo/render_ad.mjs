import path from "node:path"; import fs from "node:fs"; import { execFileSync } from "node:child_process";
const TOOLS="/opt/npm-tools/node_modules";
const { build } = await import(path.join(TOOLS,"esbuild/lib/main.js"));
const { chromium } = await import(path.join(TOOLS,"playwright/index.mjs"));
const P="/home/claude/promo";
await build({ entryPoints:[P+"/src/ad.tsx"], bundle:true, format:"iife", outfile:P+"/out/ad.js", jsx:"automatic", alias:{"@":"/home/claude/app/src","server-only":"/home/claude/rlh/empty.js"}, nodePaths:[TOOLS], loader:{".css":"empty"}, define:{"process.env.NODE_ENV":'"production"'}, logLevel:"error"});
const stills = process.argv[2]==="--stills" ? process.argv[3].split(",").map(Number) : null;
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1920}});
p.on("pageerror",e=>console.error("PAGE",e.message));
await p.goto("http://localhost:8766/ad.html"); await p.waitForFunction(()=>window.__setT); await p.evaluate(()=>window.__ready); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(500);
const total = await p.evaluate(()=>window.__total);
if (stills) { fs.mkdirSync(P+"/stills-ad",{recursive:true}); for (const t of stills){ await p.evaluate(x=>window.__setT(x),t); await p.screenshot({path:`${P}/stills-ad/t${t}.jpg`,type:"jpeg",quality:80}); } }
else { const dir=P+"/frames-ad"; fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir); const n=Math.ceil(total*30);
  for(let i=0;i<n;i++){ await p.evaluate(x=>window.__setT(x), i/30); await p.screenshot({path:`${dir}/${String(i).padStart(5,"0")}.jpg`,type:"jpeg",quality:92}); }
  const music = process.argv[2]; const out = process.argv[3];
  execFileSync("ffmpeg",["-y","-loglevel","error","-framerate","30","-i",dir+"/%05d.jpg","-i",music,"-map","0:v","-map","1:a","-c:v","libx264","-preset","veryfast","-crf","19","-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-t",String(total),"-movflags","+faststart",out]); }
await b.close(); console.log("ok", total);
