import path from "node:path"; import fs from "node:fs";
const { chromium } = await import(path.join("/opt/npm-tools/node_modules","playwright/index.mjs"));
const OUT="/home/claude/promo/takes"; fs.mkdirSync(OUT,{recursive:true});
const U="http://localhost:8765/index.html";
const b = await chromium.launch();
const only = process.argv[2];
const errs=[];
async function take(name, url, script, {seed=true}={}) {
  if (only && only!==name) return;
  const ctx = await b.newContext({viewport:{width:390,height:844}, deviceScaleFactor:2});
  const p = await ctx.newPage(); p.on("pageerror",e=>errs.push(name+": "+e));
  if (seed) { await p.goto(U+"?u=1&seed=1#/tagebuch"); await p.waitForTimeout(1200); }
  await p.clock.install();
  await p.goto(U+"?u=1#"+url); await p.clock.runFor(1500); await p.waitForTimeout(400);
  await p.evaluate(()=>{ const st=document.createElement("style"); st.textContent="*{scroll-behavior:auto!important} ::-webkit-scrollbar{display:none}"; document.head.appendChild(st);
    window.__tap=(x,y)=>{ const d=document.createElement("div"); d.style.cssText=`position:fixed;left:${x-30}px;top:${y-30}px;width:60px;height:60px;border-radius:50%;background:rgba(201,154,78,.45);border:3px solid rgba(201,154,78,.9);pointer-events:none;z-index:99999`; document.body.appendChild(d); const t0=performance.now(); const f=()=>{ const u=(performance.now()-t0)/450; d.style.transform=`scale(${0.5+u*0.9})`; d.style.opacity=String(Math.max(0,1-u)); if(u<1) requestAnimationFrame(f); else d.remove(); }; requestAnimationFrame(f); }; });
  const dir=path.join(OUT,name); fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir);
  let n=0; let speed=1;
  const frame = async (k=1)=>{ for(let i=0;i<k;i++){ await p.clock.runFor(Math.round(1000/30*speed)); await p.screenshot({path:path.join(dir,String(n++).padStart(4,"0")+".jpg"), type:"jpeg", quality:90}); } };
  const hold = (s)=>frame(Math.round(s*30));
  const sy = ()=>p.evaluate(()=>scrollY);
  const scrollTo = async (y, s)=>{ const y0=await sy(); const N=Math.round(s*30); for(let i=1;i<=N;i++){ const u=i/N; const e=u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2; await p.evaluate(v=>scrollTo(0,v), y0+(y-y0)*e); await frame(); } };
  const elY = async (loc, off=120)=>{ const bb = await loc.first().evaluate(el=>{ const r=el.getBoundingClientRect(); return r.top+scrollY; }); return Math.max(0, bb-off); };
  const tap = async (loc)=>{ const l=loc.first(); const bb=await l.boundingBox(); await p.evaluate(([x,y])=>window.__tap(x,y), [bb.x+bb.width/2, bb.y+bb.height/2]); await frame(3); await l.click(); };
  const type = async (loc, text, cps=16)=>{ await loc.first().focus(); for (const ch of text){ await p.keyboard.type(ch); await frame(Math.max(1,Math.round(30/cps))); } };
  await script({p, frame, hold, scrollTo, elY, tap, type, setSpeed:(s)=>speed=s});
  console.log(name, n, "frames"); await ctx.close();
}
await take("rlhome", "/akademie/rider-lab", async ({p,hold,scrollTo,elY})=>{ await hold(0.5); await scrollTo(await elY(p.locator("#rl-areas"), 70), 1.4); await hold(0.4); await scrollTo((await p.evaluate(()=>scrollY))+520, 1.2); await hold(0.4); });
await take("uebung", "/akademie/rider-lab/galopp/beckenuhr", async ({p,hold,scrollTo,elY,tap})=>{ await scrollTo(await elY(p.locator("figure"), 80), 0.01); await hold(1.6); await tap(p.getByRole("button",{name:"Häufiger Fehler"})); await hold(2.0); });
await take("trainer", "/akademie/rider-lab/die-ruhige-hand/wasserglas-challenge", async ({p,hold,scrollTo,elY,tap,setSpeed})=>{ await scrollTo(await elY(p.locator("#rl-trainer"), 140), 0.01); await hold(0.4); await tap(p.getByRole("button",{name:"Start"})); setSpeed(14); await hold(3.2); setSpeed(1); await hold(0.4); await tap(p.getByRole("button",{name:"Übung abschließen"})); await hold(0.3); await scrollTo((await p.evaluate(()=>scrollY))+260, 0.6); await hold(0.8); });
await take("tbhome", "/tagebuch", async ({p,hold,scrollTo})=>{ await hold(0.8); await scrollTo(260, 1.0); await hold(0.4); });
await take("stunde", "/tagebuch/stunde", async ({p,hold,scrollTo,elY,tap,type})=>{ await hold(0.4); await scrollTo(await elY(p.getByText("Mit welchem Pferd?"), 160), 0.6); await tap(p.getByRole("button",{name:"Tivoli"})); await hold(0.2); await tap(p.getByRole("button",{name:"Reitunterricht"})); await hold(0.2);
  await scrollTo(await elY(p.getByText("Wie war deine Stunde?"), 140), 0.7); await tap(p.getByRole("button",{name:/Richtig gut/})); await hold(0.3);
  await scrollTo(await elY(p.getByText("Was hat heute gut geklappt?"), 200), 0.7); await type(p.getByLabel("Was hat heute gut geklappt?"), "Knie bleiben unten beim Leichttraben!"); await hold(0.6); });
await take("eintrag", "/tagebuch/eintrag/entry-1", async ({p,hold,scrollTo,elY,tap})=>{ await hold(0.5); await scrollTo(await elY(p.getByText("Passt dazu in der Reitakademie"), 260), 1.6); await hold(0.6); const l=p.locator("a",{hasText:"Der Hüftöffner"}); await p.evaluate(()=>{}); const bb=await l.first().boundingBox(); await p.evaluate(([x,y])=>window.__tap(x,y),[bb.x+bb.width/2,bb.y+bb.height/2]); await hold(1.4); });
await take("entwicklung", "/tagebuch/entwicklung", async ({p,hold,scrollTo})=>{ await hold(0.6); await scrollTo(300, 1.0); await hold(0.5); });
await take("akademie", "/akademie", async ({p,hold,scrollTo,elY})=>{ await hold(0.4); await scrollTo(await elY(p.locator("#ak-riderlab"), 120), 2.2); await hold(0.8); });
await b.close(); console.log("ERR", errs.join("\n"));
