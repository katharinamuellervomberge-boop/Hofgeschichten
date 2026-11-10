import path from "node:path";
const { chromium } = await import(path.join("/opt/npm-tools/node_modules","playwright/index.mjs"));
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1920,height:1080}});
for (let s=0;s<5;s++){ await p.goto(`http://localhost:8766/yt.html?s=${s}`); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
 await p.screenshot({path:`/home/claude/ad10/yt${s}.png`,omitBackground:true}); }
await b.close(); console.log("ok");
