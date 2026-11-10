import path from "node:path";
const { chromium } = await import(path.join("/opt/npm-tools/node_modules","playwright/index.mjs"));
const b = await chromium.launch(); const p = await (await b.newContext({viewport:{width:1280,height:900}})).newPage();
const errs=[]; p.on("pageerror",e=>errs.push(String(e)));
await p.goto("file:///home/claude/rlh/web/out/index.html#/akademie"); await p.waitForTimeout(500);
await p.locator("button[aria-pressed]").last().click(); await p.waitForTimeout(500);
const t=p.locator("#ak-riderlab"); console.log("teaser", await t.count()); await t.scrollIntoViewIfNeeded(); await p.screenshot({path:"d-teaser.png"});
console.log("errs", errs.length); await b.close();
