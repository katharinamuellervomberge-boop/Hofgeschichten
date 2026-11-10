import path from "node:path";
const { chromium } = await import(path.join("/opt/npm-tools/node_modules","playwright/index.mjs"));
const b = await chromium.launch();
const ctx = await b.newContext({viewport:{width:390,height:844}, deviceScaleFactor:2});
const p = await ctx.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(String(e)));
const U="http://localhost:8765/index.html";
await p.goto(U+"?u=1&seed=1#/tagebuch"); await p.waitForTimeout(1500);
const routes=["/akademie/rider-lab","/akademie/rider-lab/das-lange-bein/hueftoeffner","/tagebuch","/tagebuch/eintrag/entry-1","/tagebuch/stunde","/tagebuch/entwicklung","/akademie"];
let i=0; for (const r of routes){ await p.goto(U+"?u=1#"+r); await p.waitForTimeout(1200); await p.screenshot({path:`sc${i++}.png`}); }
console.log(errs.join("\n")); await b.close();
