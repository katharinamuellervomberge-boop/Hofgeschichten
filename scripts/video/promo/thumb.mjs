import path from "node:path";
const { chromium } = await import(path.join("/opt/npm-tools/node_modules","playwright/index.mjs"));
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto("http://localhost:8766/thumb.html"); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
await p.screenshot({path:"/home/claude/ad10/thumbnail-youtube.png"}); await b.close(); console.log("ok");
