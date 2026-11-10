import path from "node:path";
const TOOLS="/opt/npm-tools/node_modules";
const { chromium } = await import(path.join(TOOLS,"playwright/index.mjs"));
const URL="file:///home/claude/rlh/web/out/index.html";
const browser = await chromium.launch();
const log=[]; const errs=[];
const mk = async (w,h, clock=false) => { const ctx = await browser.newContext({viewport:{width:w,height:h}, deviceScaleFactor:1}); const p = await ctx.newPage(); p.on("pageerror", e=>errs.push(String(e))); p.on("console", m=>{ if(m.type()==="error") errs.push("console: "+m.text()); }); if (clock) await p.clock.install(); return p; };
const shot = (p, n, full=true) => p.screenshot({ path:`/home/claude/rlh/web/${n}.png`, fullPage: full });

// 1 gesperrt, mobil
let p = await mk(390, 844);
await p.goto(URL+"#/akademie/rider-lab"); await p.waitForTimeout(800); await shot(p,"m-home");
log.push("home cards: "+await p.locator("ul li a[aria-label^='Bereich']").count());
await p.goto(URL+"#/akademie/rider-lab/leichttraben"); await p.waitForTimeout(500); await shot(p,"m-area-locked");
log.push("locked rows: "+await p.locator("a[aria-label*='in der Reitakademie']").count());
await p.goto(URL+"#/akademie/rider-lab/leichttraben/rhythmus-trainer"); await p.waitForTimeout(400);
log.push("locked screen: "+(await p.locator("text=Diese Übung gehört zur Reitakademie").count()));
await p.goto(URL+"#/akademie/rider-lab/leichttraben/mini-leichttrab"); await p.waitForTimeout(600); await shot(p,"m-ex-trial");
log.push("trial has trainer: "+await p.locator("#rl-trainer").count());

// 2 freigeschaltet, Wiederholungen zählen (Uhr vorspulen)
p = await mk(390, 844, true);
await p.goto(URL+"?u=1#/akademie/rider-lab/leichttraben/mini-leichttrab"); await p.clock.runFor(500);
const dial = () => p.locator("[role=timer]").getAttribute("aria-label");
log.push("start: "+await dial());
await p.getByRole("button",{name:"Start"}).click(); await p.clock.runFor(8000);
log.push("after 8s: "+await dial());
await p.getByRole("button",{name:"Eine Wiederholung dazuzählen"}).click(); await p.clock.runFor(100);
log.push("after +1: "+await dial());
await p.getByRole("button",{name:"Pause"}).click(); await p.clock.runFor(3000);
log.push("paused 3s: "+await dial());
await p.getByRole("button",{name:"Weiter"}).click(); await p.clock.runFor(40000);
log.push("set1 done: "+await dial()+" | "+(await p.locator("text=Kurz durchatmen").count()));
await p.getByRole("button",{name:"Nächste Runde"}).click(); await p.clock.runFor(40000);
log.push("all done: "+(await p.locator("text=Geschafft!").count())+" | "+await p.locator("[class*=trainerRound]").innerText());
await p.getByRole("button",{name:"Übung wiederholen"}).click(); await p.clock.runFor(100);
log.push("reset: "+await dial());
await p.getByRole("button",{name:"Übung abschließen"}).click(); await p.clock.runFor(200);
log.push("doneBox: "+await p.locator("text=Eingetragen").count());
log.push("storage: "+JSON.stringify(await p.evaluate(()=>{ for (const k of Object.keys(localStorage)) { const v=localStorage.getItem(k); if (v && v.includes("rl-05")) return k+" -> "+v.slice(v.indexOf('"rl-05"'), v.indexOf('"rl-05"')+30);} return "none"; })));
// Fehler-Ansicht
await p.getByRole("button",{name:"Häufiger Fehler"}).click(); await p.clock.runFor(1500);
log.push("mistake label: "+await p.locator("[class*=animPhase]").innerText());
await shot(p,"m-ex-mistake", false);
// Timer (Halten)
await p.goto(URL+"?u=1#/akademie/rider-lab/leichttraben/rhythmus-trainer"); await p.clock.runFor(300);
await p.getByRole("button",{name:"Start"}).click(); await p.clock.runFor(5000);
log.push("timer after 5s: "+await dial());
await p.clock.runFor(26000);
log.push("timer end: "+await dial()+" done="+(await p.locator("text=Geschafft!").count()));
// Fortschritt in Übersicht
await p.goto(URL+"?u=1#/akademie/rider-lab/leichttraben"); await p.clock.runFor(300);
log.push("area row: "+await p.locator("text=1× trainiert").count());
await p.goto(URL+"?u=1#/akademie/rider-lab"); await p.clock.runFor(300);
log.push("home progress: "+await p.locator("text=1 von 20 Übungen").count());
// Seiten-Wechsel bei Satz/Seiten
await p.goto(URL+"?u=1#/akademie/rider-lab/das-lange-bein/hueftoeffner"); await p.clock.runFor(300);
log.push("rounds hueftoeffner: "+await p.locator("[class*=trainerRound]").innerText());

// 3 alle 20 Übungen laden (Desktop) + Screenshots
p = await mk(1280, 900);
const exs = await (async()=>{ await p.goto(URL+"?u=1#/akademie/rider-lab"); await p.waitForTimeout(300); return null; })();
const list = ["das-lange-bein/hueftoeffner","das-lange-bein/90-90-hueftrotation","das-lange-bein/knie-zur-wand","das-lange-bein/knie-weich-bein-lang","leichttraben/mini-leichttrab","leichttraben/rhythmus-trainer","leichttraben/aufstehen-ohne-schwung","leichttraben/ruhige-haende-beim-aufstehen","galopp/beckenuhr","galopp/beckenkippen-rueckenlage","galopp/glute-bridge-march","galopp/dead-bug","die-ruhige-hand/wasserglas-challenge","die-ruhige-hand/elastischer-ellbogen","die-ruhige-hand/wall-slides","die-ruhige-hand/arme-frei-rumpf-stabil","leichter-sitz/reiter-hocke","leichter-sitz/hip-hinge","leichter-sitz/einbeinstand","leichter-sitz/wall-sit"];
let ok=0;
for (const s of list) { await p.goto(URL+"?u=1#/akademie/rider-lab/"+s); await p.waitForTimeout(250); if (await p.locator("#rl-trainer").count() && await p.locator("figure svg").count()) ok++; }
log.push("exercise pages ok: "+ok+"/20");
await p.goto(URL+"?u=1#/akademie/rider-lab/galopp/beckenuhr"); await p.waitForTimeout(1200); await shot(p,"d-ex");
await p.goto(URL+"?u=1#/akademie/rider-lab"); await p.waitForTimeout(1200); await shot(p,"d-home");
await p.goto(URL+"#/akademie"); await p.waitForTimeout(800);
log.push("academy teaser: "+await p.locator("#ak-riderlab").count());
const t = p.locator("#ak-riderlab"); if (await t.count()) { await t.scrollIntoViewIfNeeded(); await p.screenshot({path:"/home/claude/rlh/web/d-teaser.png"}); }
await browser.close();
console.log(log.join("\n")); console.log("ERRORS:", errs.length, errs.slice(0,8).join("\n"));
