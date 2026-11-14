// @ts-nocheck
/* eslint-disable */
import { EXERCISES } from "@/content/training/uebungen";
import { coach } from "@/content/coach/provider";
/**
 * Riding Space – Übersicht, Reitertagebuch, Trainingsplaner und Fortschritt (seit 14.11.2026).
 *
 * Bewusst als eigenständige, imperative Oberfläche gebaut (Vorlagen-Strings + Event-Delegation):
 * eine Datei, keine zusätzlichen Abhängigkeiten. React bindet sie in RidingSpace.tsx ein und
 * reicht Daten, Speichern und Navigation durch. Alle Texte werden mit esc() maskiert.
 *
 * Daten: dasselbe Tagebuch wie bisher (IndexedDB, nur auf dem Gerät). Jede Änderung geht als
 * komplettes Tagebuch an saveWholeDiary() und wird dort mit cleanDiary() geprüft.
 * Plan-Builder: regelbasiert (buildPlan), ohne KI, gleiche Eingaben → gleicher Plan.
 * Übungsbibliothek (EX): fachlich geprüft (14.11.2026).
 */
const RS_CSS = ".hgrs{--bg:#efe9dc;--paper:#fbf8f1;--card:#fffdf9;--line:#e7dfcf;--line2:#d9cfbb;\n  --ink:#2a2a26;--ink2:#5c574d;--ink3:#8b8578;\n  --forest:#33473a;--forest2:#4d6552;--forest-tint:#e4eadf;--meadow:#7f9a6e;\n  --sand:#eadfc8;--sand2:#b9a27c;--honey:#c2964f;--rust:#a85a3d;\n  --r-sm:12px;--r:18px;--r-lg:26px;\n  --sh:0 1px 1px rgba(40,40,30,.04),0 10px 26px -16px rgba(51,71,58,.35);\n  --sh-up:0 -10px 30px -18px rgba(40,40,30,.35);\n  --display:\"Fraunces\",Georgia,serif;\n  --ease:cubic-bezier(.2,.7,.2,1);}\n.hgrs *{box-sizing:border-box}\n.hgrs button,.hgrs input,.hgrs textarea,.hgrs select{font:inherit;color:inherit}\n.hgrs button{cursor:pointer;background:none;border:0;padding:0}\n.hgrs :focus-visible{outline:2.5px solid var(--honey);outline-offset:2px;border-radius:10px}\n.hgrs .ic{flex:none;display:block}\n.hgrs .rs-page{padding:18px 18px 0;animation:rsfade .35s var(--ease)}\n@keyframes rsfade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}\n@media (prefers-reduced-motion:reduce){.hgrs *{animation:none!important;transition:none!important}}\n.hgrs h1,.hgrs h2,.hgrs h3{margin:0;font-weight:600}\n.hgrs h1{font-family:var(--display);font-size:29px;line-height:1.1;letter-spacing:-.01em}\n.hgrs h2{font-family:var(--display);font-size:20px;letter-spacing:-.005em}\n.hgrs h3{font-size:15px}\n.hgrs .eyebrow{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin:0 0 4px}\n.hgrs .muted{color:var(--ink3)}\n.hgrs .small{font-size:13px}\n.hgrs .tiny{font-size:12px}\n.hgrs .row{display:flex;align-items:center;gap:10px}\n.hgrs .between{justify-content:space-between}\n.hgrs .wrap{flex-wrap:wrap}\n.hgrs .stack>*+*{margin-top:14px}\n.hgrs .stack-lg>*+*{margin-top:26px}\n.hgrs .sec-head{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 10px;margin-bottom:12px}\n.hgrs #shT:focus{outline:none}\n.hgrs .link{color:var(--forest);font-weight:600;font-size:13.5px;display:inline-flex;align-items:center;gap:2px}\n.hgrs .card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:16px;box-shadow:var(--sh)}\n.hgrs .card.flat{box-shadow:none}\n.hgrs .tap{transition:transform .15s var(--ease),box-shadow .2s}\n.hgrs .tap:active{transform:scale(.985)}\n.hgrs .chip{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border-radius:999px;border:1px solid var(--line2);background:var(--card);font-size:13.5px;font-weight:500;white-space:nowrap;transition:background .2s,color .2s,border-color .2s}\n.hgrs .chip.on{background:var(--forest);border-color:var(--forest);color:#fff}\n.hgrs .chip.sm{height:30px;padding:0 11px;font-size:12.5px}\n.hgrs .chips{display:flex;gap:8px;flex-wrap:wrap}\n.hgrs .hscroll{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:0 -18px;padding:2px 18px}\n.hgrs .hscroll::-webkit-scrollbar{display:none}\n.hgrs .dot{width:9px;height:9px;border-radius:50%;flex:none;display:inline-block}\n.hgrs .pill{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:3px 9px;border-radius:999px;background:var(--forest-tint);color:var(--forest)}\n.hgrs .pill.sand{background:var(--sand);color:#6c573a}\n.hgrs .pill.ghost{background:transparent;border:1px solid var(--line2);color:var(--ink2)}\n.hgrs .pill.rust{background:#f3e1d8;color:var(--rust)}\n.hgrs .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:50px;padding:0 20px;border-radius:14px;font-weight:600;background:var(--forest);color:#fff;transition:transform .15s,background .2s}\n.hgrs .btn:active{transform:scale(.98)}\n.hgrs .btn:hover{background:#2b3d31}\n.hgrs .btn.ghost{background:transparent;color:var(--forest);border:1px solid var(--line2)}\n.hgrs .btn.ghost:hover{background:var(--forest-tint)}\n.hgrs .btn.soft{background:var(--forest-tint);color:var(--forest)}\n.hgrs .btn.danger{background:var(--rust)}\n.hgrs .btn.block{width:100%}\n.hgrs .btn.sm{height:40px;padding:0 14px;border-radius:12px;font-size:14px}\n.hgrs .iconbtn{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;color:var(--ink2)}\n.hgrs .iconbtn:hover{background:var(--forest-tint);color:var(--forest)}\n.hgrs .seg{display:flex;background:#efe8da;border-radius:14px;padding:4px;gap:2px}\n.hgrs .seg button{flex:1;height:38px;border-radius:11px;font-size:13.5px;font-weight:600;color:var(--ink2);transition:background .2s,color .2s}\n.hgrs .seg button.on{background:var(--card);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.08)}\n.hgrs .badge-obj,.hgrs .badge-subj{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 7px;border-radius:6px}\n.hgrs .badge-obj{background:#e8eef0;color:#4a6670}\n.hgrs .badge-subj{background:#f4ead8;color:#8a6a3a}\n.hgrs .hero{position:relative;border-radius:var(--r-lg);overflow:hidden;color:#fff;min-height:230px;box-shadow:var(--sh)}\n.hgrs .hero .hphoto{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\n.hgrs .hero::after{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,28,22,0) 25%,rgba(20,28,22,.75))}\n.hgrs .hero .in{position:relative;z-index:1;padding:18px;display:flex;flex-direction:column;justify-content:flex-end;min-height:230px}\n.hgrs .hero h2{font-size:30px;color:#fff}\n.hgrs .hero .meta{font-size:13px;opacity:.85}\n.hgrs .hero .next{margin-top:12px;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.14);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.18);border-radius:14px;padding:10px 12px;color:#fff;text-align:left;width:100%}\n.hgrs .hero .top{position:absolute;top:14px;left:14px;right:14px;z-index:2;display:flex;justify-content:space-between}\n.hgrs .glass{background:rgba(255,255,255,.18);backdrop-filter:blur(8px);color:#fff;border:1px solid rgba(255,255,255,.22);border-radius:999px;height:32px;padding:0 12px;font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;gap:6px}\n.hgrs .hswitch{display:flex;gap:8px}\n.hgrs .avatar{width:40px;height:40px;border-radius:13px;overflow:hidden;position:relative;border:2px solid transparent;flex:none}\n.hgrs .avatar.on{border-color:var(--forest)}\n.hgrs .avatar .hphoto{width:100%;height:100%;object-fit:cover;display:block}\n.hgrs .kpis{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.hgrs .kpi{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:13px 14px}\n.hgrs .kpi .v{font-family:var(--display);font-size:26px;line-height:1.1}\n.hgrs .kpi .l{font-size:12.5px;color:var(--ink3)}\n.hgrs .stackbar{display:flex;height:10px;border-radius:99px;overflow:hidden;background:#eee6d6;gap:2px}\n.hgrs .stackbar span{height:100%;transition:width .6s var(--ease)}\n.hgrs .legend{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-size:12.5px;color:var(--ink2)}\n.hgrs .legend span{display:inline-flex;align-items:center;gap:6px}\n.hgrs .ring circle.v{transition:stroke-dashoffset 1s var(--ease)}\n.hgrs .weekstrip{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center}\n.hgrs .weekstrip .d{font-size:11.5px;color:var(--ink3);font-weight:600}\n.hgrs .weekstrip .c{margin:5px auto 0;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;border:1.5px dashed var(--line2);color:var(--ink3)}\n.hgrs .weekstrip .c.done{background:var(--forest);border:0;color:#fff}\n.hgrs .weekstrip .c.plan{border:1.5px solid var(--forest);color:var(--forest)}\n.hgrs .weekstrip .c.rest{border:0;background:#f1ead9;color:#9b8358}\n.hgrs .weekstrip .c.today{box-shadow:0 0 0 3px #f1e3c4}\n.hgrs .goalrow{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:12px 0;border-top:1px solid var(--line)}\n.hgrs .goalrow:first-of-type{border-top:0;padding-top:2px}\n.hgrs .conf{display:flex;gap:3px}\n.hgrs .conf i{width:14px;height:6px;border-radius:3px;background:#ebe3d3}\n.hgrs .conf i.on{background:var(--honey)}\n.hgrs .month-h{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin:22px 0 10px}\n.hgrs .tl{position:relative}\n.hgrs .tcard{display:flex;gap:14px;width:100%;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:14px;box-shadow:var(--sh);margin-bottom:10px;animation:rsfade .35s var(--ease) both}\n.hgrs .tdate{width:44px;flex:none;text-align:center;border-right:1px solid var(--line);padding-right:12px}\n.hgrs .tdate b{display:block;font-family:var(--display);font-size:24px;line-height:1}\n.hgrs .tdate span{font-size:11.5px;color:var(--ink3);font-weight:600;text-transform:uppercase}\n.hgrs .tbody{flex:1;min-width:0}\n.hgrs .tbody .t{font-weight:600;margin:3px 0 2px}\n.hgrs .tbody .s{color:var(--ink2);font-size:13.5px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.hgrs .tmeta{font-size:12.5px;color:var(--ink3);display:flex;align-items:center;gap:6px;flex-wrap:wrap}\n.hgrs .tfoot{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}\n.hgrs .cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}\n.hgrs .cal .h{font-size:11px;font-weight:700;color:var(--ink3);text-align:center;padding-bottom:4px}\n.hgrs .cal button{aspect-ratio:1/1.05;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:7px;gap:4px;font-size:13px;font-weight:500;border:1px solid transparent}\n.hgrs .cal button:hover{background:#f3eee2}\n.hgrs .cal button.today{border-color:var(--honey)}\n.hgrs .cal button.sel{background:var(--forest);color:#fff}\n.hgrs .cal button.out{opacity:.35}\n.hgrs .cal .dots{display:flex;gap:2px;flex-wrap:wrap;justify-content:center;max-width:30px}\n.hgrs .cal .dots i{width:6px;height:6px;border-radius:50%}\n.hgrs .cal .dots i.open{background:transparent!important;border:1.5px solid var(--forest)}\n.hgrs .wk-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}\n.hgrs .progress{height:8px;background:#ebe3d3;border-radius:99px;overflow:hidden}\n.hgrs .progress span{display:block;height:100%;background:var(--forest);border-radius:99px;transition:width .6s var(--ease)}\n.hgrs .day{border-radius:var(--r);padding:12px;margin-bottom:8px;border:1px solid var(--line);background:var(--card);transition:background .2s,border-color .2s}\n.hgrs .day.today{border-color:var(--honey);box-shadow:0 0 0 3px #f6ebd3}\n.hgrs .day.over{background:var(--forest-tint);border-color:var(--forest)}\n.hgrs .day header{display:flex;align-items:center;justify-content:space-between;gap:8px}\n.hgrs .day header .dn{font-weight:700}\n.hgrs .day header .dd{color:var(--ink3);font-size:13px;margin-left:6px}\n.hgrs .day .empty{font-size:13px;color:var(--ink3);margin-top:6px}\n.hgrs .sitem{display:flex;align-items:center;gap:10px;margin-top:8px;background:#f8f4ea;border-radius:14px;padding:8px 10px 8px 8px;border-left:4px solid var(--c,var(--forest));cursor:grab;transition:opacity .2s}\n.hgrs .sitem.done{opacity:.6}\n.hgrs .sitem.done .st{text-decoration:line-through}\n.hgrs .tick{width:32px;height:32px;border-radius:10px;border:2px solid var(--line2);display:grid;place-items:center;color:transparent;flex:none;background:#fff;transition:all .2s var(--ease)}\n.hgrs .tick.on{background:var(--forest);border-color:var(--forest);color:#fff;transform:scale(1.05)}\n.hgrs .sbody{flex:1;text-align:left;min-width:0}\n.hgrs .st{font-weight:600;font-size:14px}\n.hgrs .sm{font-size:12.5px;color:var(--ink3)}\n.hgrs .restpill{display:inline-flex;align-items:center;gap:6px;margin-top:8px;font-size:13px;color:#8a7350;background:#f4ecda;border-radius:10px;padding:6px 10px}\n.hgrs .minibtn{height:30px;padding:0 10px;border-radius:9px;font-size:12.5px;font-weight:600;color:var(--ink2);display:inline-flex;align-items:center;gap:4px}\n.hgrs .minibtn:hover{background:#f1ebde}\n.hgrs .scrim{position:fixed;inset:0;background:rgba(30,32,26,.38);z-index:40;animation:rsfadein .25s}\n@keyframes rsfadein{from{opacity:0}}\n.hgrs .sheet{position:fixed;left:50%;bottom:0;transform:translateX(-50%);width:100%;max-width:460px;max-height:92vh;background:var(--paper);border-radius:26px 26px 0 0;z-index:41;display:flex;flex-direction:column;box-shadow:var(--sh-up);animation:rsup .35s var(--ease)}\n@keyframes rsup{from{transform:translate(-50%,40px);opacity:.4}}\n.hgrs .sheet .grab{width:40px;height:5px;border-radius:9px;background:var(--line2);margin:9px auto 0}\n.hgrs .sheet .sh{display:flex;align-items:center;justify-content:space-between;padding:10px 18px 8px;gap:10px}\n.hgrs .sheet .sb{overflow-y:auto;padding:4px 18px 18px;flex:1;overscroll-behavior:contain}\n.hgrs .sheet .sf{padding:12px 18px calc(14px + env(safe-area-inset-bottom));border-top:1px solid var(--line);display:flex;gap:10px;background:var(--paper)}\n.hgrs .sheet .sf .btn{flex:1}\n.hgrs .steps{display:flex;gap:6px;padding:0 18px 4px}\n.hgrs .steps button{flex:1;height:5px;border-radius:9px;background:var(--line);transition:background .3s}\n.hgrs .steps button.on{background:var(--forest)}\n.hgrs .field{display:block;margin-top:16px}\n.hgrs .field>span{display:block;font-size:13px;font-weight:600;color:var(--ink2);margin-bottom:7px}\n.hgrs .input,.hgrs textarea.input,.hgrs select.input{width:100%;min-height:46px;border:1px solid var(--line2);background:var(--card);border-radius:13px;padding:11px 13px;outline:none;transition:border-color .2s,box-shadow .2s}\n.hgrs textarea.input{resize:vertical;min-height:70px}\n.hgrs .input:focus{border-color:var(--forest);box-shadow:0 0 0 3px var(--forest-tint)}\n.hgrs .err{color:var(--rust);font-size:13px;font-weight:600;margin-top:8px}\n.hgrs .tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.hgrs .tile{display:flex;align-items:center;gap:12px;padding:14px;border-radius:16px;border:1.5px solid var(--line);background:var(--card);text-align:left;font-weight:600;transition:all .2s var(--ease)}\n.hgrs .tile:hover{border-color:var(--line2)}\n.hgrs .tile.on{border-color:var(--forest);background:var(--forest-tint)}\n.hgrs .tile .sw{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;color:#fff;flex:none}\n.hgrs .moods{display:grid;gap:8px}\n.hgrs .mood{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:15px;border:1.5px solid var(--line);background:var(--card);font-weight:600;text-align:left;transition:all .2s}\n.hgrs .mood.on{border-color:var(--forest);background:var(--forest-tint)}\n.hgrs .mscale{display:flex;gap:3px;margin-left:auto}\n.hgrs .mscale i{width:6px;height:16px;border-radius:3px;background:#e9e1cf}\n.hgrs .range{width:100%;accent-color:var(--forest)}\n.hgrs .thumbs{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}\n.hgrs .thumbs .th{width:72px;height:72px;border-radius:12px;overflow:hidden;position:relative;background:#eee5d3;display:grid;place-items:center;font-size:11px;color:var(--ink2);text-align:center;padding:4px}\n.hgrs .thumbs img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}\n.hgrs .thumbs .rm{position:absolute;top:3px;right:3px;width:22px;height:22px;border-radius:7px;background:rgba(0,0,0,.55);color:#fff;display:grid;place-items:center;z-index:1}\n.hgrs .upload{display:flex;align-items:center;justify-content:center;gap:8px;height:48px;border:1.5px dashed var(--line2);border-radius:14px;color:var(--ink2);font-weight:600;font-size:14px;cursor:pointer}\n.hgrs .upload input{display:none}\n.hgrs .blk{margin-top:18px}\n.hgrs .blk h3{display:flex;align-items:center;gap:8px;margin-bottom:8px}\n.hgrs .blk ul,.hgrs .blk ol{margin:0;padding-left:20px;color:var(--ink2)}\n.hgrs .blk li+li{margin-top:5px}\n.hgrs .num{counter-reset:n;list-style:none;padding:0!important}\n.hgrs .num li{counter-increment:n;position:relative;padding-left:34px;min-height:24px}\n.hgrs .num li::before{content:counter(n);position:absolute;left:0;top:-1px;width:24px;height:24px;border-radius:8px;background:var(--forest-tint);color:var(--forest);font-weight:700;font-size:12.5px;display:grid;place-items:center}\n.hgrs .exitem{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:12px;border-radius:14px;background:var(--card);border:1px solid var(--line);margin-bottom:8px}\n.hgrs .exitem .n{width:28px;height:28px;border-radius:9px;background:var(--forest);color:#fff;font-weight:700;display:grid;place-items:center;font-size:13px;flex:none}\n.hgrs .lv{display:inline-flex;gap:2px;vertical-align:middle}\n.hgrs .lv i{width:5px;height:12px;border-radius:2px;background:#e3dac7}\n.hgrs .lv i.on{background:var(--forest2)}\n.hgrs .linkcard{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:11px 12px;border-radius:14px;border:1px solid var(--line);background:var(--card);margin-bottom:8px}\n.hgrs .linkcard .k{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;flex:none}\n.hgrs .k.aka{background:#e9eef0;color:#4a6670}\n.hgrs .k.rl{background:#f4ead8;color:#8a6a3a}\n.hgrs .k.ex{background:var(--forest-tint);color:var(--forest)}\n.hgrs .note{display:flex;gap:10px;padding:12px 14px;border-radius:14px;background:#f4eedf;color:var(--ink2);font-size:13px}\n.hgrs .note.warn{background:#f6e6dd;color:#7d3f27}\n.hgrs .ms-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.hgrs .ms{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:14px;text-align:left;position:relative;overflow:hidden;box-shadow:var(--sh)}\n.hgrs .ms .star{width:34px;height:34px;border-radius:11px;background:#f4ead8;color:var(--honey);display:grid;place-items:center;margin-bottom:10px}\n.hgrs .ms b{display:block;font-size:14.5px;line-height:1.3}\n.hgrs .ms .d{font-size:12px;color:var(--ink3);margin-top:6px}\n.hgrs .facts{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n.hgrs .facts div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px 12px}\n.hgrs .facts dt{font-size:12px;color:var(--ink3)}\n.hgrs .facts dd{margin:2px 0 0;font-weight:600}\n.hgrs .bigphoto{position:relative;border-radius:var(--r-lg);overflow:hidden;height:300px;margin:0 -2px}\n.hgrs .bigphoto .hphoto{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}\n.hgrs .bigphoto::after{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(20,28,22,.75))}\n.hgrs .bigphoto .in{position:absolute;left:18px;bottom:16px;right:18px;color:#fff;z-index:1}\n.hgrs .bigphoto h1{color:#fff;font-size:36px}\n.hgrs .photo-edit{position:absolute;top:12px;right:12px;z-index:2}\n.hgrs .toast{position:fixed;left:50%;bottom:104px;transform:translateX(-50%);background:var(--ink);color:#fff;padding:11px 16px;border-radius:14px;font-size:14px;font-weight:500;z-index:60;display:flex;align-items:center;gap:8px;box-shadow:0 12px 30px -12px rgba(0,0,0,.5);animation:rstoast 2.6s var(--ease) forwards;max-width:88%}\n@keyframes rstoast{0%{opacity:0;transform:translate(-50%,10px)}10%,85%{opacity:1;transform:translate(-50%,0)}100%{opacity:0;transform:translate(-50%,6px)}}\n.hgrs .ruleli{display:flex;gap:10px;padding:9px 0;border-top:1px solid var(--line);font-size:13.5px;color:var(--ink2)}\n.hgrs .ruleli:first-child{border-top:0}\n.hgrs .ruleli .ic{color:var(--forest);margin-top:1px}\n.hgrs .wkblk{margin-top:14px}\n.hgrs .wkblk h4{margin:0 0 8px;font-size:13px;display:flex;justify-content:space-between;color:var(--ink2)}\n.hgrs .prev-s{display:flex;gap:10px;align-items:center;padding:9px 11px;border-radius:12px;background:var(--card);border:1px solid var(--line);margin-bottom:6px;font-size:13.5px}\n.hgrs .prev-s .wd{width:26px;font-weight:700;color:var(--ink3);font-size:12.5px}\n.hgrs .stepper{display:flex;align-items:center;gap:14px}\n.hgrs .stepper button{width:44px;height:44px;border-radius:13px;border:1px solid var(--line2);font-size:22px;background:var(--card)}\n.hgrs .stepper b{font-family:var(--display);font-size:30px;min-width:40px;text-align:center}\n.hgrs .search{display:flex;align-items:center;gap:8px;height:46px;border:1px solid var(--line2);border-radius:14px;padding:0 12px;background:var(--card)}\n.hgrs .search input{border:0;outline:0;background:transparent;flex:1;height:100%}\n.hgrs .chart-lbl{font-size:11px;fill:var(--ink3);font-family:Inter,sans-serif}\n.hgrs .hbar{display:grid;grid-template-columns:104px 1fr 76px;align-items:center;gap:10px;font-size:13px;margin-top:9px}\n.hgrs .hbar .tr{height:10px;background:#eee6d6;border-radius:99px;overflow:hidden}\n.hgrs .hbar .tr span{display:block;height:100%;border-radius:99px;transition:width .7s var(--ease)}\n.hgrs .hbar .v{white-space:nowrap;text-align:right;color:var(--ink2);font-variant-numeric:tabular-nums}\n.hgrs .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n.hgrs .fig{background:#f3eddf;border-radius:16px;padding:10px;margin-top:6px}\n.hgrs .empty-state{text-align:center;padding:30px 18px;color:var(--ink3)}\n.hgrs .empty-state .ic{margin:0 auto 10px;color:var(--line2)}\n.hgrs .confirm{background:#f6e6dd;border-radius:14px;padding:12px;margin-top:12px}\n.hgrs .mtile{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:16px;border-radius:18px;background:var(--card);border:1px solid var(--line);margin-bottom:10px}\n.hgrs .mtile .sw{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;color:#fff;background:var(--forest)}\n.hgrs{max-width:640px;margin:0 auto;font:15px/1.45 ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;--display:var(--font-fraunces),Georgia,serif;padding-bottom:40px}\n.hgrs .stack{display:block;gap:0}\n.hgrs .eyebrow{font-family:inherit;line-height:1.3}\n.hgrs .rs-page{padding:4px 0 0}\n.hgrs .rs-tabs{position:relative;z-index:1;display:grid;grid-template-columns:repeat(5,1fr);gap:2px;background:rgba(245,240,229,.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:8px 0 10px;margin-bottom:6px}\n.hgrs .rs-tabs button{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:12px;font-weight:600;color:var(--ink3);padding:7px 0;border-radius:12px;transition:background .2s,color .2s}\n.hgrs .rs-tabs button.on{color:var(--forest);background:var(--forest-tint)}\n.hgrs .rs-fab{position:fixed;right:max(18px,calc(50% - 300px));bottom:calc(var(--nav-height,84px) + 16px + env(safe-area-inset-bottom));z-index:29;width:58px;height:58px;border-radius:19px;background:var(--forest);color:#fff;display:grid;place-items:center;box-shadow:0 14px 28px -10px rgba(38,52,42,.75);transition:transform .2s var(--ease)}\n.hgrs .rs-fab:active{transform:scale(.94)}\n.hgrs .scrim{z-index:60}.hgrs .sheet{z-index:61}\n.hgrs .toast{bottom:calc(var(--nav-height,84px) + 90px + env(safe-area-inset-bottom));z-index:70}\n.hgrs .morecard{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:12px 2px;border-top:1px solid var(--line);color:var(--ink)}\n.hgrs .morecard:first-of-type{border-top:0}\n.hgrs a{color:inherit}\n\n.hgrs .rs-tabs{background:rgba(255,253,249,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(214,203,180,.7);border-radius:20px;padding:5px;margin:4px 0 16px;box-shadow:0 10px 30px -22px rgba(31,43,35,.6)}\n.hgrs .rs-tabs button{border-radius:15px;padding:8px 0 7px;transition:background .25s var(--ease),color .25s,transform .15s}\n.hgrs .rs-tabs button.on{background:linear-gradient(160deg,#3b5243,#26342a);color:#fff;box-shadow:0 8px 18px -10px rgba(38,52,42,.9)}\n.hgrs .rs-tabs button:active{transform:scale(.96)}\n.hgrs.cx-focus .rs-fab{display:none}\n.hgrs .cx-hero{position:relative;overflow:hidden;border-radius:30px;padding:24px 20px 22px;color:#fff;background:radial-gradient(120% 90% at 100% 0%,rgba(127,154,110,.55) 0%,transparent 55%),radial-gradient(90% 70% at 0% 110%,rgba(194,150,79,.45) 0%,transparent 60%),linear-gradient(160deg,#2e4235 0%,#1c2820 100%);box-shadow:0 24px 50px -30px rgba(20,30,24,.9)}\n.hgrs .cx-hero::before{content:\"\";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:18px 18px;mask-image:linear-gradient(180deg,#000,transparent 70%);-webkit-mask-image:linear-gradient(180deg,#000,transparent 70%);pointer-events:none}\n.hgrs .cx-rings{position:absolute;right:-60px;top:-60px;width:230px;height:230px;opacity:.5;animation:rsspin 40s linear infinite;pointer-events:none}\n@keyframes rsspin{to{transform:rotate(360deg)}}\n.hgrs .cx-hero>*:not(.cx-rings){position:relative}\n.hgrs .cx-chip{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:6px 11px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(8px)}\n.hgrs .cx-hero h1{color:#fff;font-size:34px;line-height:1.05;margin-top:14px;letter-spacing:-.02em}\n.hgrs .cx-hero p{color:rgba(255,255,255,.78)}\n.hgrs .cx-search{display:flex;align-items:center;gap:10px;height:56px;margin-top:18px;padding:0 16px;border-radius:18px;background:rgba(255,255,255,.97);color:var(--ink);box-shadow:0 14px 30px -14px rgba(0,0,0,.5);transition:box-shadow .2s}\n.hgrs .cx-search:focus-within{box-shadow:0 0 0 4px rgba(194,150,79,.45),0 14px 30px -14px rgba(0,0,0,.5)}\n.hgrs .cx-search input{flex:1;border:0;outline:0;background:transparent;height:100%;font-size:15.5px}\n.hgrs .cx-glass{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 13px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:13px;font-weight:600;transition:background .2s}\n.hgrs .cx-glass:hover{background:rgba(255,255,255,.22)}\n.hgrs .cx-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:20px}\n.hgrs .cx-steps div{font-size:10.5px;font-weight:600;color:rgba(255,255,255,.72);text-align:center}\n.hgrs .cx-steps i{display:grid;place-items:center;width:30px;height:30px;margin:0 auto 5px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);color:#fff;font-style:normal}\n.hgrs .cx-hits{margin-top:12px;background:#fff;border-radius:18px;padding:6px;color:var(--ink);box-shadow:0 14px 30px -18px rgba(0,0,0,.55)}\n.hgrs .cx-hits .linkcard{border:0;margin:0;border-radius:13px;background:transparent}\n.hgrs .cx-hits .linkcard:hover{background:#f4efe3}\n.hgrs .cx-cats{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.hgrs .cx-cat{position:relative;overflow:hidden;text-align:left;padding:16px 14px 14px;border-radius:22px;background:var(--card);border:1px solid var(--line);box-shadow:var(--sh);transition:transform .2s var(--ease),box-shadow .2s,border-color .2s}\n.hgrs .cx-cat:hover{transform:translateY(-2px);box-shadow:0 18px 34px -22px rgba(51,71,58,.6)}\n.hgrs .cx-cat.on{border-color:var(--forest);box-shadow:0 0 0 2px var(--forest)}\n.hgrs .cx-cat .ico{width:42px;height:42px;border-radius:14px;display:grid;place-items:center;color:#fff;margin-bottom:12px;box-shadow:0 8px 16px -10px currentColor}\n.hgrs .cx-cat b{display:block;font-size:14.5px;line-height:1.25}\n.hgrs .cx-cat .cnt{display:flex;gap:6px;align-items:center;margin-top:8px;font-size:12px;color:var(--ink3)}\n.hgrs .cx-cat .ready{color:var(--forest);font-weight:700}\n.hgrs .cx-cat .blob{position:absolute;right:-30px;bottom:-30px;width:90px;height:90px;border-radius:50%;opacity:.12}\n.hgrs .cx-panel{margin-top:10px;padding:6px;border-radius:20px;background:var(--card);border:1px solid var(--line);animation:rsfade .3s var(--ease)}\n.hgrs .cx-panel .linkcard{border:0;margin:0;background:transparent}\n.hgrs .cx-case{display:flex;gap:14px;align-items:center;width:100%;text-align:left;padding:14px;border-radius:20px;background:var(--card);border:1px solid var(--line);box-shadow:var(--sh);margin-bottom:10px;transition:transform .2s var(--ease)}\n.hgrs .cx-case:hover{transform:translateY(-2px)}\n.hgrs .cx-case .st{width:46px;height:46px;border-radius:15px;display:grid;place-items:center;color:#fff;flex:none}\n/* Fragen */\n.hgrs .cx-top{display:flex;align-items:center;justify-content:space-between;gap:10px}\n.hgrs .cx-seg{display:flex;gap:4px;margin:14px 0 22px}\n.hgrs .cx-seg span{flex:1;height:5px;border-radius:9px;background:#e6decd;overflow:hidden;position:relative}\n.hgrs .cx-seg span.done{background:var(--forest)}\n.hgrs .cx-seg span.now{background:linear-gradient(90deg,var(--forest) 50%,#e6decd 50%);background-size:200% 100%;animation:rsfill 1.2s var(--ease) infinite alternate}\n@keyframes rsfill{from{background-position:100% 0}to{background-position:40% 0}}\n.hgrs .cx-q{animation:rsslide .38s var(--ease)}\n@keyframes rsslide{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}\n.hgrs .cx-q h2{font-size:30px;line-height:1.12;letter-spacing:-.015em}\n.hgrs .cx-safety{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:999px;background:#f7ead2;color:#8a5f22;font-size:12.5px;font-weight:700;margin-bottom:14px}\n.hgrs .cx-opts{display:grid;gap:10px;margin-top:22px}\n.hgrs .cx-opt{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:15px 16px;border-radius:18px;background:var(--card);border:1.5px solid var(--line);font-weight:600;font-size:15.5px;box-shadow:0 1px 0 rgba(0,0,0,.02);transition:transform .18s var(--ease),border-color .18s,background .18s,box-shadow .18s}\n.hgrs .cx-opt:hover{border-color:var(--forest);transform:translateX(3px);box-shadow:0 12px 24px -18px rgba(51,71,58,.7)}\n.hgrs .cx-opt .lt{width:32px;height:32px;border-radius:11px;display:grid;place-items:center;background:#f1ebde;color:var(--ink2);font-size:13px;font-weight:800;flex:none;transition:background .18s,color .18s}\n.hgrs .cx-opt:hover .lt{background:var(--forest);color:#fff}\n.hgrs .cx-opt.picked{background:var(--forest);border-color:var(--forest);color:#fff;transform:scale(.985)}\n.hgrs .cx-opt.picked .lt{background:#fff;color:var(--forest)}\n/* Ergebnis */\n.hgrs .cx-res{padding-bottom:22px}\n.hgrs .cx-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:18px}\n.hgrs .cx-stats div{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);border-radius:16px;padding:10px 12px}\n.hgrs .cx-stats b{display:block;font-family:var(--display);font-size:24px;line-height:1.1;color:#fff}\n.hgrs .cx-stats span{font-size:11.5px;color:rgba(255,255,255,.75)}\n.hgrs .cx-h{display:flex;align-items:center;gap:10px;margin-bottom:12px}\n.hgrs .cx-h .L{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:var(--forest);color:#fff;font-weight:800;font-size:13px;flex:none}\n.hgrs .cx-h h2{flex:1}\n.hgrs .cx-cause{position:relative;overflow:hidden;padding:16px 16px 14px 20px;border-radius:20px;background:var(--card);border:1px solid var(--line);box-shadow:var(--sh);margin-bottom:10px}\n.hgrs .cx-cause::before{content:\"\";position:absolute;left:0;top:0;bottom:0;width:5px;background:linear-gradient(180deg,var(--forest),var(--meadow))}\n.hgrs .cx-cause .n{font-family:var(--display);font-size:30px;line-height:1;color:#d9cfbb;float:right;margin-left:10px}\n.hgrs .cx-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}\n.hgrs .cx-tags span{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:600;padding:4px 9px;border-radius:999px;background:var(--forest-tint);color:var(--forest)}\n.hgrs .cx-learn{border-radius:22px;padding:18px;background:linear-gradient(160deg,#fbf6ea,#f4ecda);border:1px solid #e9dcc0}\n.hgrs .cx-learn p:first-child{font-family:var(--display);font-size:19px;line-height:1.35;color:var(--ink)}\n.hgrs .cx-ex{display:flex;gap:14px;align-items:flex-start;width:100%;text-align:left;padding:16px;border-radius:20px;background:var(--card);border:1px solid var(--line);box-shadow:var(--sh);margin-bottom:10px;transition:transform .2s var(--ease)}\n.hgrs .cx-ex:hover{transform:translateY(-2px)}\n.hgrs .cx-ex .num{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;flex:none;background:linear-gradient(160deg,#3b5243,#26342a);color:#fff;font-family:var(--display);font-size:19px}\n.hgrs .cx-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}\n.hgrs .cx-meta span{font-size:11.5px;font-weight:600;padding:4px 9px;border-radius:999px;background:#f1ebde;color:var(--ink2)}\n.hgrs .cx-bar{position:sticky;bottom:calc(var(--nav-height,84px) + 10px + env(safe-area-inset-bottom));z-index:20;display:flex;gap:8px;padding:8px;border-radius:22px;background:rgba(255,253,249,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(214,203,180,.8);box-shadow:0 18px 40px -20px rgba(31,43,35,.6);margin-top:18px}\n.hgrs .cx-bar .btn{flex:1;height:48px;border-radius:15px}\n.hgrs .cx-warn{border-radius:22px;padding:18px;color:#5b2c19;background:linear-gradient(160deg,#fbe9df,#f5dacb);border:1px solid #ecc3ad}\n.hgrs .cx-warn.amber{color:#6a4813;background:linear-gradient(160deg,#fcf3e1,#f6e6c4);border-color:#ead39d}\n.hgrs .cx-fb{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}\n.hgrs .cx-fb button{text-align:left;padding:13px 12px;border-radius:16px;border:1.5px solid var(--line);background:var(--card);font-weight:600;font-size:13.5px;display:flex;flex-direction:column;gap:8px;transition:all .18s var(--ease)}\n.hgrs .cx-fb button:hover{border-color:var(--forest)}\n.hgrs .cx-fb button.on{border-color:var(--forest);background:var(--forest-tint)}\n.hgrs .cx-fb .scale{display:flex;gap:3px}.hgrs .cx-fb .scale i{width:14px;height:5px;border-radius:3px;background:#e6decd}\n@media (prefers-reduced-motion:reduce){.hgrs .cx-rings,.hgrs .cx-seg span.now{animation:none}}\n";

/* =========================================================================
   Hofgeschichten – My Riding Space · klickbare Vorschau
   Datenmodell orientiert sich an src/features/tagebuch/types.ts (DIARY_VERSION 1)
   und erweitert es abwärtskompatibel (alle neuen Felder optional).
   ========================================================================= */

/* ---------- Helfer ---------- */
const p2 = n => String(n).padStart(2,"0");
const isoOf = d => `${d.getFullYear()}-${p2(d.getMonth()+1)}-${p2(d.getDate())}`;
const fromDay = s => { const [y,m,d] = s.split("-").map(Number); return new Date(y,m-1,d,12); };
let TODAY = isoOf(new Date());
const addDays = (s,n) => { const d = fromDay(s); d.setDate(d.getDate()+n); return isoOf(d); };
const weekStart = s => { const d = fromDay(s); d.setDate(d.getDate()-((d.getDay()+6)%7)); return isoOf(d); };
const WD = ["Mo","Di","Mi","Do","Fr","Sa","So"];
const wdOf = s => WD[(fromDay(s).getDay()+6)%7];
const fmt = (s,o) => fromDay(s).toLocaleDateString("de-DE", o || {day:"numeric",month:"short"});
const fmtLong = s => fromDay(s).toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long"});
const monthKey = s => s.slice(0,7);
const monthLabel = k => { const [y,m]=k.split("-").map(Number); return new Date(y,m-1,1).toLocaleDateString("de-DE",{month:"long",year:"numeric"}); };
const shiftMonth = (k,n) => { const [y,m]=k.split("-").map(Number); const d=new Date(y,m-1+n,1); return `${d.getFullYear()}-${p2(d.getMonth()+1)}`; };
const kw = s => { const d=fromDay(s); const t=new Date(d.getFullYear(),d.getMonth(),d.getDate()); t.setDate(t.getDate()+3-((t.getDay()+6)%7)); const w1=new Date(t.getFullYear(),0,4); return 1+Math.round(((t-w1)/864e5-3+((w1.getDay()+6)%7))/7); };
const uid = p => `${p}-${Math.random().toString(36).slice(2,9)}`;
const nowIso = () => new Date().toISOString();
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const hm = m => m >= 60 ? `${Math.floor(m/60)} h${m%60 ? " "+(m%60)+" min" : ""}` : `${m} min`;
const uniq = a => [...new Set(a.filter(Boolean))];

/* ---------- Icons (eigene Linien-Icons) ---------- */
const IC = {
home:'<path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
book:'<path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2z"/><path d="M6 18a2 2 0 0 1 2-2h10"/><path d="M10 8h5"/>',
cal:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
chart:'<path d="M5 20V11M12 20V5M19 20v-6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
left:'<path d="M15 5l-7 7 7 7"/>', right:'<path d="M9 5l7 7-7 7"/>',
clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
flag:'<path d="M6 21V4M6 4h11l-2.5 4L17 12H6"/>',
star:'<path d="M12 4l2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"/>',
list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
trash:'<path d="M5 7h14M10 11v6M14 11v6M7 7l1 13h8l1-13M9 7V4h6v3"/>',
cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
bolt:'<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
leaf:'<path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19l7-7"/>',
move:'<path d="M5 12h14M15 8l4 4-4 4M9 8l-4 4 4 4"/>',
horse:'<path d="M8 20l.6-5.5L5.5 12l1.2-3.8L11 5l1.5-2 1.3 2.6L18 9l.5 3-2 1.2-2-1.7-1.6 2.6.8 5.9"/>',
search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
info:'<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8h.01"/>',
shield:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/>',
alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
academy:'<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c3 2 7 2 10 0v-5"/>',
body:'<circle cx="12" cy="5" r="2"/><path d="M12 7v7M8 21l4-7 4 7M6 10h12"/>',
target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6"/>',
spark:'<path d="M4 17l5-5 4 3 7-8"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',
flame:'<path d="M12 21c-4 0-6-2.7-6-6 0-4 4-6 3-11 3 2 6 5 6 9 1-1 1.5-2 1.5-3 1.5 1.6 1.5 3.3 1.5 5 0 3.3-2 6-6 6z"/>',
};
const ic = (n,s=20,sw=1.8) => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||""}</svg>`;

/* ---------- Konstanten ---------- */
const DISC = [
  {id:"Dressur",c:"#33473a"},{id:"Springen",c:"#c2964f"},{id:"Gelände",c:"#7f9a6e"},{id:"Bodenarbeit",c:"#8a6a52"},
  {id:"Longieren",c:"#b9a27c"},{id:"Stangenarbeit",c:"#a85a3d"},{id:"Freiarbeit",c:"#5d7f86"},{id:"Sonstiges",c:"#9b958a"}];
const LEGACY_COLOR = {"Reitunterricht":"#33473a","Freies Reiten":"#7f9a6e","Rider Lab":"#c2964f","Reiten":"#33473a","Lektion":"#5d7f86","Eigenes":"#9b958a"};
const discColor = d => (DISC.find(x=>x.id===d)||{}).c || LEGACY_COLOR[d] || "#9b958a";
const MOODS = [
  {id:"super",l:"Richtig gut",v:4},{id:"gut",l:"Gut",v:3},{id:"gemischt",l:"Durchwachsen",v:2},
  {id:"schwierig",l:"Schwierig",v:1},{id:"lehrreich",l:"Herausfordernd, aber lehrreich",v:2}];
const moodOf = id => MOODS.find(m=>m.id===id);
const INT = {leicht:{l:"Leicht",n:1},mittel:{l:"Mittel",n:2},anspruchsvoll:{l:"Anspruchsvoll",n:3}};
const LEVELS = ["Einsteiger","Fortgeschritten","Erfahren"];
const CONF = ["","Noch sehr unsicher","Eher unsicher","Klappt manchmal","Klappt meistens","Fühlt sich sicher an"];
const GOAL_STATUS = [{id:"neu",l:"Neu"},{id:"uebe",l:"Ich übe"},{id:"geschafft",l:"Geschafft"}];
const SEXES = ["Stute","Wallach","Hengst"];
const RELATIONS = [{id:"eigen",l:"Eigenes Pferd"},{id:"rb",l:"Reitbeteiligung"},{id:"schule",l:"Schulpferd"},{id:"anderes",l:"Anderes"}];
const GOAL_SUGGEST = ["Ruhigere Hand entwickeln","Besser angaloppieren","Sitz verbessern","Pferd geraderichten","Übergänge verbessern","Sicherer im Gelände werden","Mehr Balance im leichten Sitz"];
const MS_SUGGEST = ["Mein erster Galopp","Zum ersten Mal alleine ausgeritten","Mein erstes Schulterherein","Endlich ein ruhiger Übergang","Erstes Turnier"];

/* Bestehende Inhalte der App (IDs unverändert aus dem Katalog) */
const LESSONS = {
 "ra-w2-l1":"Der ausbalancierte Sitz","ra-w2-l2":"Beine und Absätze","ra-w2-l3":"Hände und Zügelhaltung","ra-w3-l1":"Was sind Reiterhilfen?",
 "ra-w4-l4":"Anreiten, Lenken und Anhalten","ra-w5-l2":"Leichttraben verstehen","ra-w5-l3":"Aussitzen und Balance","ra-w6-l1":"Der Dreitakt",
 "ra-w6-l3":"Die Galopphilfen","ra-w6-l4":"Balance und Übergänge","ra-w9-l1":"Körpersprache: Was sagt mein Pferd?","ra-w10-l3":"Führen und sicher anbinden",
 "ra-w11-l3":"Zirkelfiguren","ra-w12-l1":"Takt und Rhythmus","ra-w12-l2":"Losgelassenheit und Dehnung","ra-w12-l4":"Sicherer im Sattel werden",
 "ra-w13-l3":"Stellung und Biegung","ra-w13-l6":"Schenkelweichen","ra-w13-l7":"Schulterherein","ra-w14-l1":"Der Springsitz","ra-w14-l2":"Die fünf Phasen eines Sprungs"};
const RL = {"rl-02":"Die 90/90-Hüftrotation","rl-04":"Knie weich, Bein lang","rl-06":"Der Rhythmus-Trainer","rl-09":"Die Beckenuhr","rl-11":"Glute Bridge March",
 "rl-12":"Dead Bug","rl-13":"Die Wasserglas-Challenge","rl-14":"Der elastische Ellbogen","rl-17":"Die Reiter-Hocke","rl-19":"Einbeinstand","rl-20":"Wall Sit"};

/* ---------- Übungsbibliothek (fachlich geprüft) ---------- */
const CATS = [
 {id:"sitz",l:"Sitz & Balance"},{id:"hilfen",l:"Hilfengebung"},{id:"uebergaenge",l:"Übergänge"},{id:"dressur",l:"Dressur"},
 {id:"galopp",l:"Galopp"},{id:"stangen",l:"Stangenarbeit"},{id:"boden",l:"Bodenarbeit"},{id:"gelaende",l:"Geländetraining"},{id:"gymn",l:"Gymnastizierung"}];
const catLabel = id => (CATS.find(c=>c.id===id)||{}).l || id;
const EX = EXERCISES;
const exById = id => EX.find(e=>e.id===id);

/* ---------- Regelwerk: Ziel → Übungsgruppe (feste, nachvollziehbare Zuordnung) ---------- */
const GT = [
 {id:"uebergaenge",re:/übergang|übergäng|parier|anhalt/i,label:"Übergänge",disc:"Dressur",ex:["ex-hilfe-1","ex-ueb-1","ex-ueb-2","ex-ueb-3"],lessons:["ra-w6-l4","ra-w4-l4"],rl:["rl-09","rl-12"]},
 {id:"galopp",re:/galopp/i,label:"Galopp",disc:"Dressur",ex:["ex-ueb-2","ex-dr-1","ex-gal-1","ex-gal-2"],lessons:["ra-w6-l1","ra-w6-l3"],rl:["rl-11","rl-12"]},
 {id:"leicht",re:/leicht\w*\s+sitz|springsitz/i,label:"Leichter Sitz",disc:"Stangenarbeit",ex:["ex-sitz-1","ex-st-1","ex-sitz-2","ex-st-2"],lessons:["ra-w14-l1","ra-w2-l2"],rl:["rl-17","rl-20"]},
 {id:"hand",re:/\bhand\b|hände|zügel/i,label:"Ruhige Hand",disc:"Dressur",ex:["ex-hilfe-2","ex-gy-2","ex-hilfe-1","ex-ueb-2"],lessons:["ra-w2-l3"],rl:["rl-13","rl-14"]},
 {id:"gerade",re:/gerade|schief/i,label:"Geraderichten",disc:"Dressur",ex:["ex-dr-1","ex-ger-1","ex-gy-1","ex-dr-2","ex-dr-3"],lessons:["ra-w13-l3"],rl:["rl-02","rl-19"]},
 {id:"gelaende",re:/gelände|ausreit|ausritt/i,label:"Sicherheit im Gelände",disc:"Gelände",ex:["ex-bo-1","ex-sitz-1","ex-ge-1","ex-ge-2"],lessons:["ra-w12-l4","ra-w9-l1"],rl:["rl-19"]},
 {id:"sitz",re:/sitz|balance/i,label:"Sitz & Balance",disc:"Dressur",ex:["ex-sitz-1","ex-gy-2","ex-sitz-2","ex-ger-1"],lessons:["ra-w2-l1","ra-w5-l3"],rl:["rl-09","rl-19"]},
 {id:"allgemein",re:/[\s\S]*/,label:"Grundlagen",disc:"Dressur",ex:["ex-hilfe-1","ex-dr-1","ex-gy-2","ex-ueb-1","ex-gy-1"],lessons:["ra-w3-l1","ra-w12-l1"],rl:["rl-09"]},
];
const goalType = t => GT.find(g=>g.re.test(t||""));

/* ---------- Zustand ---------- */
let D;         // Daten (wie DiaryData, erweitert)
const UI = {view:"home",scope:"all",jtab:"timeline",jmode:"list",jf:{horse:"all",disc:"all",range:"all"},jmonth:monthKey(TODAY),jday:null,
  ptab:"week",week:weekStart(TODAY),pmonth:monthKey(TODAY),pday:TODAY,lib:{cat:"all",q:""},horseId:null};
let SHEETS = [];

let HOST = null, ROOT = null, SNAP = "", LASTPATH = "";
function save(){
  if(!HOST) return;
  const s = JSON.stringify(D); if(s===SNAP) return; SNAP = s;
  Promise.resolve(HOST.save(JSON.parse(s))).catch(()=>toast("Speichern hat nicht geklappt – bitte noch einmal versuchen"));
}

const horse = id => D.horses.find(h=>h.id===id);
const goal = id => D.goals.find(g=>g.id===id);
const ageOf = h => { if(!h) return null; if(h.birthYear) return new Date().getFullYear() - Number(h.birthYear); const n = parseInt(h.age,10); return Number.isFinite(n) ? n : null; };
const activeHorse = () => horse(D.profile.activeHorseId) || D.horses[0];

/* ---------- Plan-Builder (regelbasiert, ohne KI) ---------- */
const PATTERNS = {1:[2],2:[1,4],3:[0,2,4],4:[0,1,3,5],5:[0,1,3,4,5]};
function buildPlan(p){
  const g = goalType(p.goalTitle), lv = LEVELS.indexOf(p.level)+1, h = horse(p.horseId), age = ageOf(h);
  const young = age!=null && age<6, senior = age!=null && age>=20;
  const rules = [];
  let pool = g.ex.map(exById).filter(e=>e.level<=lv);
  rules.push(`Ziel „${p.goalTitle}“ gehört zur Übungsgruppe ${g.label}. Verwendet werden nur Übungen bis zur Stufe ${p.level} (${pool.length} passend).`);
  if(pool.length<2){ const add = GT[GT.length-1].ex.map(exById).filter(e=>e.level<=lv && !pool.includes(e)); pool = pool.concat(add).slice(0, Math.max(3,pool.length)); rules.push("Zu wenige passende Übungen – ergänzt um Grundlagenübungen."); }
  pool = pool.map((e,i)=>({e,i})).sort((a,b)=>a.e.level-b.e.level||a.i-b.i).map(x=>x.e);
  let base = [0,35,45,50][lv];
  if(young||senior){ base -= 10; rules.push(`${h.name} ist ${age} Jahre alt: Reiteinheiten ca. ${base} Min, höchstens mittlere Belastung, längere Schrittphasen.`); }
  else rules.push(`Stufe ${p.level}: Reiteinheiten von ca. ${base} Min.`);
  const pat = PATTERNS[p.perWeek];
  rules.push(`${p.perWeek}× pro Woche: feste Tage ${pat.map(i=>WD[i]).join(", ")} – nie mehr als zwei Trainingstage am Stück, anspruchsvolle Einheiten nie hintereinander.`);
  const ground = p.types.find(t=>t==="Bodenarbeit"||t==="Longieren");
  const useGround = ground && p.perWeek>=3;
  if(useGround) rules.push(`${ground} gewählt: Die letzte Einheit jeder Woche ist ${ground} – Abwechslung und weniger Belastung.`);
  const gel = p.types.includes("Gelände") && p.perWeek>=3;
  if(gel) rules.push("Gelände gewählt: In jeder zweiten Woche ersetzt ein Ausritt mit Zielübung eine Bahneinheit.");
  const st = p.types.includes("Stangenarbeit");
  if(st) rules.push("Stangenarbeit gewählt: Ab der Aufbauphase einmal pro Woche eine Stangenübung.");
  const nb = Math.ceil(p.weeks/3), na = Math.ceil(2*p.weeks/3);
  rules.push(`Phasen: Basis (Woche 1${nb>1?"–"+nb:""}) → Aufbau → Festigen. Die Übungen werden schrittweise anspruchsvoller.`);
  const rlOn = p.riderlab && p.perWeek<=4;
  if(rlOn) rules.push("Pro Woche ein Rider-Lab-Training (15 Min, ohne Pferd) an einem reitfreien Tag.");
  rules.push("Die letzte Reiteinheit ist eine Standortbestimmung mit einer Übung aus Woche 1 – so kannst du selbst vergleichen.");
  const minLv = pool[0].level, series = uid("pl"), sessions = [];
  for(let w=0; w<p.weeks; w++){
    const phase = w<nb ? "Basis" : w<na ? "Aufbau" : "Festigen";
    let php = phase==="Basis" ? pool.filter(e=>e.level===minLv) : pool;
    if(php.length<2) php = pool;
    const n = Math.max(1, Math.min(php.length, 4, lv===1 ? 2 : (phase==="Festigen" && lv===3 ? 4 : 3)));
    pat.forEach((d,i)=>{
      const date = addDays(p.start, w*7+d), isLast = i===pat.length-1;
      let s = {id:uid("s"),series,date,kind:"reiten",discipline:g.disc,horseId:p.horseId,goalId:p.goalId,phase,ex:[],minutes:base,createdAt:nowIso()};
      if(useGround && isLast){
        Object.assign(s,{kind:"boden",discipline:ground,ex: ground==="Longieren" ? ["ex-bo-3"] : ["ex-bo-1","ex-bo-2"],minutes: young?20:30,intensity:"leicht",title:`${ground} · locker & aufmerksam`});
      } else if(gel && w%2===1 && i===1){
        Object.assign(s,{discipline:"Gelände",ex: lv>=2 ? ["ex-ge-1","ex-ge-2"] : ["ex-ge-1"],minutes:Math.min(base+15,60),intensity:"leicht",title:"Ausritt mit Zielübung"});
      } else {
        const off = w*pat.length+i; let ex = [];
        for(let k=0;k<n;k++) ex.push(php[(off+k)%php.length].id);
        ex = uniq(ex);
        if(st && phase!=="Basis" && i===0){ ex[ex.length-1] = lv>=2 ? "ex-st-2" : "ex-st-1"; ex = uniq(ex); }
        const hard = phase==="Festigen" && lv===3 && i===0 && !young && !senior;
        Object.assign(s,{ex,intensity: phase==="Basis" ? "leicht" : hard ? "anspruchsvoll" : "mittel",
          minutes: base + (phase==="Festigen" && lv>=2 && !young && !senior ? 5 : 0),title:`${g.label} · ${phase}`});
        if(st && phase!=="Basis" && i===0) s.discipline = "Stangenarbeit";
      }
      sessions.push(s);
    });
    if(rlOn){
      const free = [2,3,5,6,1].find(d=>!pat.includes(d));
      const r = g.rl[w % g.rl.length];
      sessions.push({id:uid("s"),series,date:addDays(p.start,w*7+free),kind:"riderlab",discipline:"Rider Lab",title:`Rider Lab: ${RL[r]}`,minutes:15,goalId:p.goalId,intensity:"leicht",phase,ex:[],rl:[r],createdAt:nowIso()});
    }
  }
  const lastRide = [...sessions].reverse().find(s=>s.kind==="reiten");
  if(lastRide){ lastRide.title = `Standortbestimmung · ${g.label}`; lastRide.ex = uniq([pool[0].id, ...lastRide.ex]).slice(0, Math.max(2,lastRide.ex.length)); lastRide.check = true; }
  sessions.sort((a,b)=>a.date.localeCompare(b.date));
  return {series, sessions, rules, meta:{...p, category:g.label}};
}
function sessWarm(s){
  const a = ageOf(horse(s.horseId));
  if(s.kind==="riderlab") return ["2 Min locker gehen, Schultern und Hüften kreisen"];
  if(s.kind==="boden") return ["5 Min ruhig im Schritt führen, von beiden Seiten","Ausrüstung prüfen: Halfter oder Kappzaum, Handschuhe"];
  if(s.discipline==="Gelände") return ["Die ersten 10 Min im Schritt – das Pferd darf sich umschauen","Route und Rückkehrzeit vorher jemandem mitteilen"];
  const w = ["10 Min Schritt am langen Zügel auf großen, gebogenen Linien – auf beiden Händen","Lösende Trabarbeit im Leichttraben mit Handwechseln (ca. 8 Min)"];
  if(a!=null && (a<6||a>=20)) w[0] = `15 Min Schritt am langen Zügel – bei ${a<6?"jungen":"älteren"} Pferden bewusst länger`;
  return w;
}
function sessCool(s){
  if(s.kind==="riderlab") return ["1 Min ruhig atmen, kurz dehnen"];
  if(s.kind==="boden") return ["Ein paar Runden ruhig führen","Loben und das Pferd entspannt zurückbringen"];
  if(s.discipline==="Gelände") return ["Die letzten 10 Min im Schritt nach Hause"];
  return ["Zügel aus der Hand kauen lassen (Dehnungshaltung im Trab)","Mindestens 10 Min Schritt am langen Zügel, bis das Pferd ruhig atmet"];
}
function sessInfo(s){
  const exs = (s.ex||[]).map(exById).filter(Boolean), g = goal(s.goalId), gt = g ? goalType(g.title) : null;
  return {exs, g,
    attention: uniq(exs.map(e=>e.tip).concat(s.intensity==="anspruchsvoll" ? ["Anspruchsvolle Einheit: zwischen den Übungen Schrittpausen am langen Zügel"] : [])),
    errors: uniq(exs.map(e=>e.err[0])),
    safety: uniq(exs.flatMap(e=>e.safe.slice(0,1))),
    lessons: uniq(exs.flatMap(e=>e.lessons).concat(gt ? gt.lessons : [])).slice(0,3),
    rl: uniq((s.rl||[]).concat(exs.flatMap(e=>e.rl)).concat(gt && s.kind!=="riderlab" ? gt.rl.slice(0,1) : [])).slice(0,2)};
}

/* ---------- Abgeleitete Zahlen (nur aus gespeicherten Daten) ---------- */
const scoped = (arr, sc=UI.scope) => sc==="all" ? arr : arr.filter(x=>x.horseId===sc);
const sortE = a => [...a].sort((x,y)=> x.date===y.date ? y.createdAt.localeCompare(x.createdAt) : y.date.localeCompare(x.date));
function weeksBack(n, list){
  const ws = weekStart(TODAY), out = [];
  for(let i=n-1;i>=0;i--){ const s = addDays(ws,-7*i), e = addDays(s,6); const xs = list.filter(x=>x.date>=s && x.date<=e);
    out.push({start:s,count:xs.length,min:xs.reduce((a,x)=>a+(x.minutes||0),0)}); }
  return out;
}
function streakWeeks(list){
  let ws = weekStart(TODAY), n = 0;
  const has = s => list.some(x=>x.date>=s && x.date<=addDays(s,6));
  if(!has(ws)) ws = addDays(ws,-7);
  while(has(ws)){ n++; ws = addDays(ws,-7); }
  return n;
}
function byDisc(list){
  const m = {}; list.forEach(e=>{ const k = e.discipline||"Sonstiges"; m[k]=(m[k]||0)+(e.minutes||0); });
  return Object.entries(m).sort((a,b)=>b[1]-a[1]);
}
function nextSession(hid){
  return [...D.plan].filter(s=>!s.done && s.date>=TODAY && (!hid || s.horseId===hid)).sort((a,b)=>a.date.localeCompare(b.date))[0];
}
function suggestLinks(text){
  const g = GT.slice(0,-1).filter(g=>g.re.test(text));
  return {lessons: uniq(g.flatMap(x=>x.lessons)).slice(0,3), rl: uniq(g.flatMap(x=>x.rl)).slice(0,2), ex: uniq(g.flatMap(x=>x.ex)).slice(0,3)};
}

/* ---------- Bausteine ---------- */
function horseArt(h){
  if(!h) return "";
  if(h.photo) return `<img class="hphoto" src="${h.photo}" alt="Foto von ${esc(h.name)}">`;
  const [a,b] = h.tone || toneOf(h.id);
  return `<svg class="hphoto" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Fotoplatzhalter ${esc(h.name)}"><defs><linearGradient id="g-${h.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#g-${h.id})"/><circle cx="330" cy="60" r="110" fill="#fff" opacity=".06"/><path d="M128 300C128 236 146 196 176 168L172 116C170 100 176 88 188 80L192 50L206 72C234 74 258 90 270 114L292 158C298 172 290 186 274 184L250 178C242 178 236 184 234 192C228 230 234 268 248 300Z" fill="#fff" opacity=".17"/><path d="M196 74L206 40L214 76" fill="#fff" opacity=".17"/></svg>`;
}
const discDot = d => `<span class="dot" style="background:${discColor(d)}"></span>`;
const lvBars = n => `<span class="lv" aria-label="Stufe ${n} von 3">${[1,2,3].map(i=>`<i class="${i<=n?"on":""}"></i>`).join("")}</span>`;
const confBars = v => `<span class="conf" aria-label="Selbsteinschätzung ${v} von 5">${[1,2,3,4,5].map(i=>`<i class="${i<=v?"on":""}"></i>`).join("")}</span>`;
const moodScale = id => { const v = (moodOf(id)||{}).v||0; return `<span class="mscale" aria-hidden="true">${[1,2,3,4].map(i=>`<i style="${i<=v?`background:${["","#a85a3d","#c2964f","#7f9a6e","#33473a"][v]}`:""}"></i>`).join("")}</span>`; };
const intPill = i => i ? `<span class="pill ghost">${ic("bolt",12)} ${INT[i].l}</span>` : "";
function ring(pct, size=86, label="", sub=""){
  const r = size/2-7, c = 2*Math.PI*r, off = c*(1-Math.min(1,pct));
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(label)} ${esc(sub)}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#ebe3d3" stroke-width="8"/><circle class="v" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--forest)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" data-off="${off}" transform="rotate(-90 ${size/2} ${size/2})"/><text x="50%" y="48%" text-anchor="middle" font-family="Fraunces,serif" font-size="${size/3.6}" fill="var(--ink)">${esc(label)}</text><text x="50%" y="66%" text-anchor="middle" class="chart-lbl">${esc(sub)}</text></svg>`;
}
function bars(data, key, fmtv, h=130){
  const W = 330, max = Math.max(1,...data.map(d=>d[key])), bw = W/data.length;
  return `<svg viewBox="0 0 ${W} ${h+22}" width="100%" role="img" aria-label="Diagramm">${data.map((d,i)=>{
    const bh = Math.max(d[key]?4:0, (d[key]/max)*(h-18)), x = i*bw+bw*.2, y = h-bh, last = i===data.length-1;
    return `<rect x="${x}" y="${y}" width="${bw*.6}" height="${bh}" rx="5" fill="${last?"var(--forest)":"#b8c4b0"}"><title>KW ${kw(d.start)}: ${fmtv(d[key])}</title></rect>${d[key]?`<text x="${x+bw*.3}" y="${y-5}" text-anchor="middle" class="chart-lbl" style="fill:var(--ink2)">${fmtv(d[key])}</text>`:""}<text x="${x+bw*.3}" y="${h+15}" text-anchor="middle" class="chart-lbl">${last?"jetzt":"KW"+kw(d.start)}</text>`;
  }).join("")}<line x1="0" x2="${W}" y1="${h}" y2="${h}" stroke="#e3dac8"/></svg>`;
}
function spark(checkins, w=90, h=30){
  if(!checkins || checkins.length<2) return "";
  const pts = checkins.map((c,i)=>[6+i*(w-12)/(checkins.length-1), h-4-(c.v-1)/4*(h-8)]);
  return `<svg width="${w}" height="${h}" aria-hidden="true"><polyline points="${pts.map(p=>p.join(",")).join(" ")}" fill="none" stroke="var(--honey)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${i===pts.length-1?3.5:2}" fill="var(--honey)"/>`).join("")}</svg>`;
}
function figSVG(type){
  if(!type) return "";
  const arena = `<rect x="10" y="10" width="300" height="140" rx="6" fill="#fbf8f1" stroke="#cdbf9f" stroke-width="2"/><g class="chart-lbl" style="fill:#a39577">${[["A",4,84],["C",312,84],["B",160,7],["E",160,163]].map(([t,x,y])=>`<text x="${x}" y="${y}" text-anchor="middle">${t}</text>`).join("")}</g>`;
  const paths = {
    zirkel:"M90 80a70 70 0 1 0 140 0a70 70 0 1 0 -140 0",
    gerade:"M30 30H290",
    halt:"M30 30H290",
    viertel:"M40 45H140L280 30",
    schlange:"M30 80C30 20 110 20 110 80S190 140 190 80S270 20 290 80",
    stangen:"M30 80H290",
    faecher:"M90 80a70 70 0 1 0 140 0a70 70 0 1 0 -140 0"};
  const p = paths[type]; if(!p) return "";
  let extra = "";
  if(type==="stangen") extra = [130,152,174,196].map(x=>`<rect x="${x}" y="62" width="5" height="36" rx="2" fill="#a85a3d"/>`).join("");
  if(type==="faecher") extra = [-30,0,30].map(a=>`<rect x="157" y="-2" width="5" height="34" rx="2" fill="#a85a3d" transform="rotate(${a} 160 80)"/>`).join("");
  if(type==="halt") extra = `<circle cx="160" cy="30" r="7" fill="none" stroke="#c2964f" stroke-width="2.5"/>`;
  return `<div class="fig"><svg viewBox="0 0 320 170" width="100%" role="img" aria-label="Skizze der Linienführung"><title>Linienführung</title>${arena}<path id="fp-${type}" d="${p}" fill="none" stroke="#33473a" stroke-width="2.5" stroke-dasharray="6 6" opacity=".6"/>${extra}<circle r="7" fill="#33473a"><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#fp-${type}"/></animateMotion></circle></svg><p class="tiny muted" style="margin:4px 4px 0">Animierte Linienführung (Draufsicht)</p></div>`;
}

/* ---------- Ansichten ---------- */
function vHome(){
  const h = activeHorse(), list = scoped(D.entries);
  const mk = monthKey(TODAY), month = list.filter(e=>monthKey(e.date)===mk);
  const mMin = month.reduce((a,e)=>a+(e.minutes||0),0), target = D.profile.monthlyTarget||12;
  const dist = byDisc(month), total = dist.reduce((a,x)=>a+x[1],0)||1;
  const ns = h ? nextSession(h.id) : null;
  const hGoals = D.goals.filter(g=>g.status!=="geschafft" && (UI.scope==="all" || g.horseId===UI.scope));
  const focus = D.goals.find(g=>g.horseId===h?.id && g.status==="uebe") || D.goals.find(g=>g.horseId===h?.id && g.status!=="geschafft");
  const last = sortE(list)[0];
  const ws = weekStart(TODAY);
  const w8 = weeksBack(8, list);
  const doneEx = D.plan.filter(s=>s.done && (UI.scope==="all"||s.horseId===UI.scope||!s.horseId)).reduce((a,s)=>a+(s.ex||[]).length+(s.rl||[]).length,0);
  const hr = new Date().getHours();
  return `<div class="rs-page stack-lg">
  <header class="row between">
    <div><p class="eyebrow">${fmtLong(TODAY)}</p><h1>${hr<11?"Guten Morgen":hr<18?"Hallo":"Guten Abend"}${D.profile.name?", "+esc(D.profile.name):""}</h1><button class="link" style="margin-top:4px" data-a="nav" data-v="/profil">Mein Reiterprofil ${ic("right",14)}</button></div>
    <div class="hswitch" role="group" aria-label="Pferd wechseln">${D.horses.map(x=>`<button class="avatar ${x.id===h?.id?"on":""}" data-a="pickHorse" data-id="${x.id}" aria-label="${esc(x.name)} wählen" aria-pressed="${x.id===h?.id}">${horseArt(x)}</button>`).join("")}</div>
  </header>

  ${h ? `<section class="hero tap" aria-label="Mein Pferd">
    ${horseArt(h)}
    <div class="top"><span class="glass">${ic("horse",15)} Mein Pferd</span><button class="glass" data-a="openHorse" data-id="${h.id}">Profil ${ic("right",14)}</button></div>
    <div class="in">
      <h2>${esc(h.name)}</h2>
      <div class="meta">${[esc(h.breed), ageOf(h)!=null?ageOf(h)+" Jahre":"", esc(h.sex)].filter(Boolean).join(" · ")}</div>
      ${focus ? `<div class="meta" style="margin-top:6px">Schwerpunkt: <b>${esc(focus.title)}</b></div>`:""}
      ${ns ? `<button class="next" data-a="openSession" data-id="${ns.id}">${ic("cal",20)}<span style="flex:1"><span class="tiny" style="opacity:.8">Nächste Einheit · ${ns.date===TODAY?"heute":wdOf(ns.date)+", "+fmt(ns.date)}</span><br><b>${esc(ns.title)}</b>${ns.minutes?` · ${ns.minutes} min`:""}</span>${ic("right",18)}</button>`
           : `<button class="next" data-a="openWizard">${ic("plus",20)}<span style="flex:1"><b>Nächste Einheit planen</b></span>${ic("right",18)}</button>`}
    </div></section>` : `<div class="card empty-state">${ic("horse",34)}<h2>Wer ist dein Pferd?</h2><p>Leg zuerst ein Pferd an.</p><button class="btn" data-a="horseForm">Pferd anlegen</button></div>`}

  <section>
    <div class="sec-head"><h2>Meine Trainingsaktivität</h2>
      <div class="chips">${[["all","Alle"],...D.horses.map(x=>[x.id,x.name])].map(([id,l])=>`<button class="chip sm ${UI.scope===id?"on":""}" data-a="scope" data-id="${id}">${esc(l)}</button>`).join("")}</div></div>
    <div class="card">
      <div class="row" style="gap:16px">
        <button data-a="target" aria-label="Monatsziel ändern">${ring(month.length/target, 92, `${month.length}/${target}`, "Einheiten")}</button>
        <div style="flex:1">
          <p class="eyebrow" style="margin:0">${monthLabel(mk)}</p>
          <div style="font-family:var(--display);font-size:26px;line-height:1.15">${hm(mMin)}</div>
          <p class="small muted" style="margin:2px 0 0">Trainingszeit · <button class="link" data-a="target">Mein Monatsziel: ${target} Einheiten</button></p>
        </div>
      </div>
      <div style="margin-top:16px"><div class="stackbar" aria-label="Verteilung nach Trainingsart">${dist.map(([d,m])=>`<span style="width:${m/total*100}%;background:${discColor(d)}" title="${esc(d)}: ${hm(m)}"></span>`).join("")||'<span style="width:100%;background:#eee6d6"></span>'}</div>
      <div class="legend">${dist.map(([d,m])=>`<span>${discDot(d)}${esc(d)} <b style="font-weight:600">${Math.round(m/total*100)}%</b></span>`).join("")||'<span class="muted">Noch keine Einträge in diesem Monat</span>'}</div></div>
      <div style="margin-top:18px">
        <div class="row between small"><b>Diese Woche · KW ${kw(TODAY)}</b><button class="link" data-a="go" data-v="planner">Planer ${ic("right",14)}</button></div>
        <div class="weekstrip" style="margin-top:8px">${[0,1,2,3,4,5,6].map(i=>{ const d = addDays(ws,i);
          const ent = list.some(e=>e.date===d), pl = scoped(D.plan).concat(UI.scope!=="all"?D.plan.filter(s=>!s.horseId):[]).filter(s=>s.date===d), rest = D.rest.includes(d);
          const cls = ent || (pl.length && pl.every(s=>s.done)) ? "done" : pl.length ? "plan" : rest ? "rest" : "";
          return `<div><div class="d">${WD[i]}</div><div class="c ${cls} ${d===TODAY?"today":""}" title="${fmt(d)}">${cls==="done"?ic("check",15,2.4):cls==="rest"?ic("leaf",14):cls==="plan"?`<span class="tiny" style="font-weight:700">${pl.length}</span>`:""}</div></div>`; }).join("")}</div>
      </div>
    </div>
  </section>

  <section>
    <div class="sec-head"><h2>Mein Fortschritt</h2><button class="link" data-a="go" data-v="progress">Alles ${ic("right",14)}</button></div>
    <div class="kpis">
      <div class="kpi"><div class="v">${streakWeeks(list)}</div><div class="l">Wochen in Folge trainiert</div></div>
      <div class="kpi"><div class="v">${doneEx}</div><div class="l">Übungen aus dem Plan erledigt</div></div>
    </div>
    <div class="card" style="margin-top:10px">
      <div class="row between"><h3>Aktuelle Ziele</h3><span class="badge-subj">Selbsteinschätzung</span></div>
      <div style="margin-top:6px">${hGoals.map(g=>{ const c = (g.checkins||[]).slice(-1)[0]; const n = D.entries.filter(e=>e.goalId===g.id).length;
        return `<button class="goalrow" data-a="openGoal" data-id="${g.id}"><div style="flex:1;min-width:0"><b>${esc(g.title)}</b><div class="small muted">${[horse(g.horseId)?esc(horse(g.horseId).name):"",n+" Einheiten dazu"].filter(Boolean).join(" · ")}</div></div><div style="text-align:right">${c?confBars(c.v):""}<div class="tiny muted" style="margin-top:3px">${c?CONF[c.v]:"Noch nicht eingeschätzt"}</div></div></button>`; }).join("") || `<p class="muted small">Noch keine Ziele. <button class="link" data-a="goalForm">Ziel anlegen</button></p>`}</div>
    </div>
    <div class="card" style="margin-top:10px">
      <div class="row between"><h3>Einheiten pro Woche</h3><span class="badge-obj">Erfasst</span></div>
      ${bars(w8,"count",v=>v,110)}
    </div>
  </section>

  ${last ? `<section><div class="sec-head"><h2>Letzter Eintrag</h2><button class="link" data-a="go" data-v="journal">Tagebuch ${ic("right",14)}</button></div>${entryCard(last,true)}</section>` : ""}

  <section><div class="sec-head"><h2>Persönliche Erfolge</h2><button class="link" data-a="jtab" data-v="milestones">Alle ${ic("right",14)}</button></div>
    <div class="ms-grid">${[...scoped(D.milestones)].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,2).map(msCard).join("")}</div>
    <button class="btn ghost block" style="margin-top:10px" data-a="msForm">${ic("star",18)} Meilenstein festhalten</button>
  </section>
  </div>`;
}
function entryCard(e, compact){
  const h = horse(e.horseId), g = goal(e.goalId), m = moodOf(e.mood), ms = D.milestones.find(x=>x.entryId===e.id);
  const d = fromDay(e.date);
  return `<button class="tcard tap" data-a="openEntry" data-id="${e.id}">
    <div class="tdate"><b>${d.getDate()}</b><span>${wdOf(e.date)}</span></div>
    <div class="tbody">
      <div class="tmeta">${discDot(e.discipline)}<b style="color:var(--ink2)">${esc(e.discipline||"Training")}</b>${e.minutes?` · ${e.minutes} min`:""}${h?` · ${esc(h.name)}`:""}</div>
      <div class="t">${esc(e.focus || e.discipline || "Training")}</div>
      ${(e.wentWell||e.difficult||e.practice||e.moment)?`<div class="s">${esc(e.wentWell||e.difficult||e.practice||e.moment)}</div>`:""}
      <div class="tfoot">${m?`<span class="pill sand">${esc(m.l)}</span>`:""}${g&&!compact?`<span class="pill">${ic("flag",12)} ${esc(g.title)}</span>`:""}${ms?`<span class="pill sand">${ic("star",12)} Meilenstein</span>`:""}${(e.photos||[]).length+(e.photo?1:0)?`<span class="pill ghost">${ic("cam",12)} ${(e.photos||[]).length+(e.photo?1:0)}</span>`:""}</div>
    </div></button>`;
}
function msCard(m){
  const h = horse(m.horseId);
  return `<button class="ms tap" data-a="openMs" data-id="${m.id}"><div class="star">${ic("star",18)}</div><b>${esc(m.title)}</b><div class="d">${fmt(m.date,{day:"numeric",month:"long",year:"numeric"})}${h?` · ${esc(h.name)}`:""}</div></button>`;
}

function vJournal(){
  const tabs = `<div class="seg" role="tablist">${[["timeline","Timeline"],["milestones","Meilensteine"],["horses","Pferde"]].map(([id,l])=>`<button role="tab" aria-selected="${UI.jtab===id}" class="${UI.jtab===id?"on":""}" data-a="jtab" data-v="${id}">${l}</button>`).join("")}</div>`;
  let body = "";
  if(UI.jtab==="timeline"){
    const f = UI.jf;
    let list = D.entries.filter(e=>(f.horse==="all"||e.horseId===f.horse)&&(f.disc==="all"||e.discipline===f.disc));
    if(f.range!=="all") list = list.filter(e=>e.date>=addDays(TODAY, f.range==="4w"?-28:-91));
    list = sortE(list);
    const used = uniq(D.entries.map(e=>e.discipline));
    const filters = `<div class="hscroll" style="margin-top:12px">${[["all","Alle Pferde"],...D.horses.map(h=>[h.id,h.name])].map(([id,l])=>`<button class="chip sm ${f.horse===id?"on":""}" data-a="jf" data-k="horse" data-v="${id}">${esc(l)}</button>`).join("")}<span style="width:8px;flex:none"></span>${[["all","Gesamter Zeitraum"],["4w","4 Wochen"],["3m","3 Monate"]].map(([id,l])=>`<button class="chip sm ${f.range===id?"on":""}" data-a="jf" data-k="range" data-v="${id}">${l}</button>`).join("")}</div>
      <div class="hscroll" style="margin-top:8px"><button class="chip sm ${f.disc==="all"?"on":""}" data-a="jf" data-k="disc" data-v="all">Alle Arten</button>${used.map(d=>`<button class="chip sm ${f.disc===d?"on":""}" data-a="jf" data-k="disc" data-v="${esc(d)}">${discDot(d)}${esc(d)}</button>`).join("")}</div>`;
    const sum = `<p class="small muted" style="margin:12px 0 0">${list.length} Einträge · ${hm(list.reduce((a,e)=>a+(e.minutes||0),0))} Training</p>`;
    let content = "";
    if(UI.jmode==="list"){
      let cur = ""; content = list.map(e=>{ const mk = monthKey(e.date); const head = mk!==cur ? `<div class="month-h">${monthLabel(mk)}</div>` : ""; cur = mk; return head+entryCard(e); }).join("") || emptyState("book","Keine Einträge für diese Auswahl.");
    } else content = calendarBlock(UI.jmonth, d=>list.filter(e=>e.date===d).map(e=>({c:discColor(e.discipline)})), UI.jday, "jcal") +
      (UI.jday ? `<div class="month-h">${fmtLong(UI.jday)}</div>` + (list.filter(e=>e.date===UI.jday).map(e=>entryCard(e)).join("") || `<p class="muted small">Kein Eintrag an diesem Tag. <button class="link" data-a="newEntry" data-date="${UI.jday}">Eintrag erstellen</button></p>`) : `<p class="small muted" style="margin-top:12px">Tippe auf einen Tag, um die Einträge zu sehen.</p>`);
    body = `<div class="row between" style="margin-top:16px"><h2>Training Timeline</h2><div class="seg" style="width:auto"><button class="${UI.jmode==="list"?"on":""}" style="width:44px" data-a="jmode" data-v="list" aria-label="Listenansicht">${ic("list",18)}</button><button class="${UI.jmode==="cal"?"on":""}" style="width:44px" data-a="jmode" data-v="cal" aria-label="Kalenderansicht">${ic("grid",18)}</button></div></div>${filters}${sum}<div class="tl" style="margin-top:6px">${content}</div>`;
  } else if(UI.jtab==="milestones"){
    const ms = [...D.milestones].sort((a,b)=>b.date.localeCompare(a.date));
    body = `<div style="margin-top:16px" class="stack"><div class="row between"><h2>Meine Erfolgssammlung</h2><button class="btn sm" data-a="msForm">${ic("plus",16)} Neu</button></div>
      <p class="small muted">Deine Erfolge – von dir selbst festgehalten. Die App vergibt keine Abzeichen.</p>
      <div class="ms-grid">${ms.map(msCard).join("")}</div>${ms.length?"":emptyState("star","Noch keine Meilensteine.")}</div>`;
  } else {
    body = `<div style="margin-top:16px" class="stack"><div class="row between"><h2>Meine Pferde</h2><button class="btn sm" data-a="horseForm">${ic("plus",16)} Pferd</button></div>
      ${D.horses.map(h=>{ const n = D.entries.filter(e=>e.horseId===h.id); return `<button class="card tap" style="display:flex;gap:14px;align-items:center;width:100%;text-align:left;padding:12px" data-a="openHorse" data-id="${h.id}"><span class="avatar" style="width:68px;height:68px;border-radius:16px">${horseArt(h)}</span><span style="flex:1"><b style="font-size:17px;font-family:var(--display)">${esc(h.name)}</b><br><span class="small muted">${[esc(h.breed),ageOf(h)!=null?ageOf(h)+" J.":"",esc(h.sex)].filter(Boolean).join(" · ")}</span><br><span class="small">${n.length} Einträge · ${hm(n.reduce((a,e)=>a+(e.minutes||0),0))}</span></span>${ic("right",18)}</button>`; }).join("")}</div>`;
  }
  const more = `<section class="card flat" style="margin-top:28px"><p class="eyebrow">Mehr im Tagebuch</p>${[["/profil","person","Mein Reiterprofil"],["/momente","star","Meine Lieblingsmomente"],["/entwicklung","spark","Mein Rückblick"],["/sicherung","shield","Sicherung & Gerätewechsel"]].map(([p,i,l])=>`<button class="morecard" data-a="nav" data-v="${p}">${ic(i,20)}<span style="flex:1;font-weight:600">${l}</span>${ic("right",16)}</button>`).join("")}</section>`;
  return `<div class="rs-page"><p class="eyebrow">Riding Journal</p><h1 style="margin-bottom:14px">Reitertagebuch</h1>${tabs}${body}${more}</div>`;
}
function emptyState(icn, text){ return `<div class="empty-state">${ic(icn,34)}<p>${text}</p></div>`; }
function calendarBlock(mk, dotsFn, sel, act){
  const [y,m] = mk.split("-").map(Number), first = isoOf(new Date(y,m-1,1,12)), start = weekStart(first);
  let cells = "";
  for(let i=0;i<42;i++){ const d = addDays(start,i); if(i>=35 && monthKey(d)!==mk) break;
    const dots = dotsFn(d);
    cells += `<button class="${d===TODAY?"today":""} ${d===sel?"sel":""} ${monthKey(d)!==mk?"out":""}" data-a="${act}" data-v="${d}" aria-label="${fmtLong(d)}${dots.length?", "+dots.length+" Einträge":""}">${fromDay(d).getDate()}<span class="dots">${dots.slice(0,4).map(x=>`<i class="${x.open?"open":""}" style="background:${x.c}"></i>`).join("")}</span></button>`; }
  return `<div class="card" style="margin-top:12px;padding:12px"><div class="row between" style="margin-bottom:8px"><button class="iconbtn" data-a="${act}M" data-v="-1" aria-label="Vorheriger Monat">${ic("left")}</button><b>${monthLabel(mk)}</b><button class="iconbtn" data-a="${act}M" data-v="1" aria-label="Nächster Monat">${ic("right")}</button></div><div class="cal">${WD.map(w=>`<div class="h">${w}</div>`).join("")}${cells}</div></div>`;
}

function vPlanner(){
  const tabs = `<div class="seg" role="tablist">${[["week","Woche"],["month","Monat"],["goals","Ziele"],["library","Übungen"]].map(([id,l])=>`<button role="tab" aria-selected="${UI.ptab===id}" class="${UI.ptab===id?"on":""}" data-a="ptab" data-v="${id}">${l}</button>`).join("")}</div>`;
  let body = "";
  if(UI.ptab==="week"){
    const ws = UI.week, days = [0,1,2,3,4,5,6].map(i=>addDays(ws,i));
    const items = D.plan.filter(s=>s.date>=ws && s.date<=days[6]);
    const done = items.filter(s=>s.done).length, mins = items.reduce((a,s)=>a+(s.minutes||0),0);
    body = `<div class="card" style="margin-top:14px">
      <div class="wk-head"><button class="iconbtn" data-a="week" data-v="-7" aria-label="Vorherige Woche">${ic("left")}</button>
        <div style="text-align:center"><b>KW ${kw(ws)}${ws===weekStart(TODAY)?" · diese Woche":""}</b><div class="small muted">${fmt(ws)} – ${fmt(days[6])}</div></div>
        <button class="iconbtn" data-a="week" data-v="7" aria-label="Nächste Woche">${ic("right")}</button></div>
      <div class="progress" aria-label="${done} von ${items.length} erledigt"><span style="width:${items.length?done/items.length*100:0}%"></span></div>
      <div class="row between small" style="margin-top:7px"><span><b>${done}/${items.length}</b> erledigt</span><span class="muted">${hm(mins)} geplant · ${days.filter(d=>D.rest.includes(d)).length} Ruhetag(e)</span></div>
    </div>
    <p class="tiny muted" style="margin:10px 2px">Tipp: Einheiten antippen für Details. Am Computer kannst du sie auch auf einen anderen Tag ziehen.</p>
    ${days.map(d=>{ const its = items.filter(s=>s.date===d), rest = D.rest.includes(d);
      return `<section class="day ${d===TODAY?"today":""}" data-drop="${d}" aria-label="${fmtLong(d)}">
        <header><div><span class="dn">${wdOf(d)}</span><span class="dd">${fmt(d)}${d===TODAY?" · heute":""}</span></div>
          <div class="row" style="gap:2px"><button class="minibtn" data-a="toggleRest" data-v="${d}" aria-pressed="${rest}">${ic("leaf",14)} ${rest?"Ruhetag":"Ruhe"}</button><button class="minibtn" data-a="addSession" data-v="${d}" aria-label="Einheit am ${fmtLong(d)} hinzufügen">${ic("plus",15)}</button></div></header>
        ${its.map(sessItem).join("")}
        ${rest ? `<div class="restpill">${ic("leaf",14)} Ruhetag – bewusst Pause für euch beide</div>` : (!its.length ? `<div class="empty">Frei</div>` : "")}
      </section>`; }).join("")}
    <button class="btn block" style="margin-top:6px" data-a="openWizard">${ic("spark",18)} Neuen Trainingsplan erstellen</button>
    ${D.plans.length?`<div class="card flat" style="margin-top:12px"><h3>Aktive Pläne</h3>${D.plans.map(p=>`<div class="ruleli">${ic("target",18)}<span style="flex:1"><b>${esc(p.goalTitle)}</b> · ${esc(horse(p.horseId)?.name||"")}<br><span class="tiny">${p.perWeek}× pro Woche · ${p.weeks} Wochen ab ${fmt(p.start)}</span></span><button class="minibtn" data-a="planRules" data-id="${p.id}">Aufbau</button></div>`).join("")}</div>`:""}`;
  } else if(UI.ptab==="month"){
    body = calendarBlock(UI.pmonth, d=>D.plan.filter(s=>s.date===d).map(s=>({c:discColor(s.discipline),open:!s.done})).concat(D.rest.includes(d)?[{c:"#d8c79f"}]:[]), UI.pday, "pcal") +
      `<p class="tiny muted" style="margin:8px 2px">Gefüllt = erledigt · Ring = geplant · Sand = Ruhetag</p>
      <div class="row between" style="margin-top:14px"><h2 style="font-size:18px">${fmtLong(UI.pday)}</h2><button class="btn sm ghost" data-a="addSession" data-v="${UI.pday}">${ic("plus",16)} Einheit</button></div>
      <div style="margin-top:6px">${D.plan.filter(s=>s.date===UI.pday).map(sessItem).join("") || `<p class="muted small">Nichts geplant.${D.rest.includes(UI.pday)?" Ruhetag.":""}</p>`}</div>`;
  } else if(UI.ptab==="goals"){
    body = `<div class="stack" style="margin-top:16px"><div class="row between"><h2>Trainingsziele</h2><button class="btn sm" data-a="goalForm">${ic("plus",16)} Ziel</button></div>
      ${D.goals.map(g=>{ const c=(g.checkins||[]).slice(-1)[0], n=D.entries.filter(e=>e.goalId===g.id).length, st=GOAL_STATUS.find(s=>s.id===g.status);
        return `<button class="card tap" style="width:100%;text-align:left" data-a="openGoal" data-id="${g.id}">
          <div class="row between"><span class="pill ${g.status==="geschafft"?"":"sand"}">${st.l}</span><span class="small muted">${esc(horse(g.horseId)?.name||"Alle Pferde")}</span></div>
          <h3 style="font-family:var(--display);font-size:19px;margin-top:10px">${esc(g.title)}</h3>
          ${g.description?`<p class="small muted" style="margin:4px 0 0">${esc(g.description)}</p>`:""}
          <div class="row between" style="margin-top:12px;align-items:flex-end"><div><div class="tiny muted">Seit ${fmt(g.startDate)}${g.targetDate?` · Ziel bis ${fmt(g.targetDate)}`:""}</div><div class="small"><b>${n}</b> Einheiten verknüpft</div></div>
          <div style="text-align:right">${spark(g.checkins)}<div class="tiny muted">${c?CONF[c.v]:""}</div></div></div></button>`; }).join("")}</div>`;
  } else {
    const q = UI.lib.q.trim().toLowerCase();
    const list = EX.filter(e=>(UI.lib.cat==="all"||e.cat===UI.lib.cat) && (!q || (e.name+" "+e.goal+" "+catLabel(e.cat)).toLowerCase().includes(q)));
    body = `<div class="stack" style="margin-top:16px"><h2>Übungsbibliothek</h2>
      <label class="search">${ic("search",18)}<span class="sr">Übungen durchsuchen</span><input id="libq" type="search" placeholder="Übung oder Ziel suchen …" value="${esc(UI.lib.q)}" data-live="libq"></label>
      <div class="hscroll"><button class="chip sm ${UI.lib.cat==="all"?"on":""}" data-a="libcat" data-v="all">Alle</button>${CATS.map(c=>`<button class="chip sm ${UI.lib.cat===c.id?"on":""}" data-a="libcat" data-v="${c.id}">${c.l}</button>`).join("")}</div>
      <div id="liblist">${libList(list)}</div></div>`;
  }
  return `<div class="rs-page"><p class="eyebrow">Training Management</p><h1 style="margin-bottom:14px">Trainingsplaner</h1>${tabs}${body}</div>`;
}
function libList(list){
  return list.map(e=>`<button class="exitem tap" data-a="openEx" data-id="${e.id}"><span style="flex:1;min-width:0"><span class="tiny muted">${catLabel(e.cat)}</span><br><b>${esc(e.name)}</b><br><span class="small muted">${esc(e.goal)}</span></span><span style="text-align:right">${lvBars(e.level)}<div class="tiny muted" style="margin-top:4px">${e.min} min</div></span></button>`).join("") || emptyState("search","Keine Übung gefunden.");
}
function sessItem(s){
  const h = horse(s.horseId);
  return `<div class="sitem ${s.done?"done":""}" style="--c:${discColor(s.discipline)}" draggable="true" data-drag="${s.id}">
    <button class="tick ${s.done?"on":""}" data-a="toggleDone" data-id="${s.id}" aria-label="${s.done?"Als offen markieren":"Als erledigt markieren"}: ${esc(s.title)}" aria-pressed="${!!s.done}">${ic("check",16,2.6)}</button>
    <button class="sbody" data-a="openSession" data-id="${s.id}"><div class="st">${esc(s.title)}</div><div class="sm">${esc(s.discipline)}${s.minutes?` · ${s.minutes} min`:""}${h?" · "+esc(h.name):""}${s.intensity?" · "+INT[s.intensity].l:""}${s.entryId?" · Tagebuch ✓":""}</div></button>
  </div>`;
}

function vProgress(){
  const list = scoped(D.entries), w8 = weeksBack(8, list), d90 = list.filter(e=>e.date>=addDays(TODAY,-90));
  const disc = byDisc(d90), max = Math.max(1,...disc.map(x=>x[1]));
  const planPast = scoped(D.plan).filter(s=>s.date<=TODAY), planDone = planPast.filter(s=>s.done).length;
  const weeksActive = w8.filter(w=>w.count>0).length;
  const moods = MOODS.map(m=>({m, n:list.filter(e=>e.mood===m.id).length})).filter(x=>x.n);
  const mt = Math.max(1, moods.reduce((a,x)=>a+x.n,0));
  const ms = scoped(D.milestones).sort((a,b)=>b.date.localeCompare(a.date));
  const goals = D.goals.filter(g=>UI.scope==="all"||g.horseId===UI.scope);
  return `<div class="rs-page stack-lg"><div><p class="eyebrow">Fortschritt</p><h1>Deine Entwicklung</h1>
    <div class="chips" style="margin-top:12px">${[["all","Alle Pferde"],...D.horses.map(x=>[x.id,x.name])].map(([id,l])=>`<button class="chip sm ${UI.scope===id?"on":""}" data-a="scope" data-id="${id}">${esc(l)}</button>`).join("")}</div></div>
  <div class="note">${ic("info",18)}<span><b>Erfasst</b> sind Zahlen aus deinen Einträgen und deinem Plan. <b>Selbsteinschätzung</b> ist dein eigenes Gefühl. Keine dieser Zahlen misst, wie gut du reitest.</span></div>
  <section><div class="sec-head"><h2>Trainingskontinuität</h2><span class="badge-obj">Erfasst</span></div>
    <div class="kpis">
      <div class="kpi"><div class="v">${streakWeeks(list)}</div><div class="l">Wochen in Folge</div></div>
      <div class="kpi"><div class="v">${weeksActive}/8</div><div class="l">aktive Wochen (8 Wochen)</div></div>
      <div class="kpi"><div class="v">${planPast.length?Math.round(planDone/planPast.length*100):0}%</div><div class="l">geplante Einheiten erledigt (${planDone}/${planPast.length})</div></div>
      <div class="kpi"><div class="v">${hm(d90.reduce((a,e)=>a+(e.minutes||0),0))}</div><div class="l">Trainingszeit (90 Tage)</div></div>
    </div></section>
  <section class="card"><div class="row between"><h3>Einheiten pro Woche</h3><span class="badge-obj">Erfasst</span></div>${bars(w8,"count",v=>v)}</section>
  <section class="card"><div class="row between"><h3>Trainingszeit pro Woche</h3><span class="badge-obj">Erfasst</span></div>${bars(w8,"min",v=>v+"′")}</section>
  <section class="card"><div class="row between"><h3>Zeit nach Trainingsart · 90 Tage</h3><span class="badge-obj">Erfasst</span></div>
    ${disc.map(([d,m])=>`<div class="hbar"><span class="row" style="gap:6px">${discDot(d)}${esc(d)}</span><span class="tr"><span style="width:${m/max*100}%;background:${discColor(d)}"></span></span><span class="v">${hm(m)}</span></div>`).join("") || '<p class="muted small">Noch keine Daten.</p>'}</section>
  <section><div class="sec-head"><h2>Entwicklung deiner Ziele</h2><span class="badge-subj">Selbsteinschätzung</span></div>
    ${goals.map(g=>{ const ck = g.checkins||[]; const first = ck[0], last = ck[ck.length-1];
      return `<button class="card tap" style="width:100%;text-align:left;margin-bottom:10px" data-a="openGoal" data-id="${g.id}"><div class="row between"><b>${esc(g.title)}</b><span class="small muted">${esc(horse(g.horseId)?.name||"")}</span></div>
      <div class="row between" style="margin-top:10px;align-items:flex-end"><div class="small">${first&&last&&ck.length>1?`Von „${CONF[first.v]}“ zu „${CONF[last.v]}“`:last?CONF[last.v]:"Noch keine Einschätzung"}<div class="tiny muted">${ck.length} Einschätzungen · ${D.entries.filter(e=>e.goalId===g.id).length} Einheiten verknüpft</div></div>${spark(ck,110,36)}</div></button>`; }).join("")}</section>
  <section class="card"><div class="row between"><h3>Wie sich dein Training angefühlt hat</h3><span class="badge-subj">Selbsteinschätzung</span></div>
    <div class="stackbar" style="height:14px;margin-top:12px">${moods.map(x=>`<span style="width:${x.n/mt*100}%;background:${["","#a85a3d","#c2964f","#7f9a6e","#33473a"][x.m.v]}" title="${x.m.l}: ${x.n}"></span>`).join("")}</div>
    <div class="legend">${moods.map(x=>`<span><span class="dot" style="background:${["","#a85a3d","#c2964f","#7f9a6e","#33473a"][x.m.v]}"></span>${x.m.l} · ${x.n}</span>`).join("")}</div></section>
  <section><div class="sec-head"><h2>Meilensteine</h2><button class="link" data-a="msForm">${ic("plus",14)} Neu</button></div>
    <div class="card flat">${ms.map(m=>`<button class="ruleli" style="width:100%;text-align:left" data-a="openMs" data-id="${m.id}">${ic("star",18)}<span style="flex:1"><b style="color:var(--ink)">${esc(m.title)}</b><br><span class="tiny">${fmt(m.date,{day:"numeric",month:"long",year:"numeric"})}${horse(m.horseId)?" · "+esc(horse(m.horseId).name):""}</span></span></button>`).join("") || '<p class="muted small">Noch keine Meilensteine.</p>'}</div></section>
  </div>`;
}

function vHorse(){
  const h = horse(UI.horseId) || D.horses[0]; if(!h) return vJournal();
  const ents = sortE(D.entries.filter(e=>e.horseId===h.id)), goals = D.goals.filter(g=>g.horseId===h.id), ns = nextSession(h.id);
  const rel = RELATIONS.find(r=>r.id===h.relation);
  const facts = [["Alter",ageOf(h)!=null?`${ageOf(h)} Jahre (${h.birthYear})`:""],["Rasse",h.breed],["Geschlecht",h.sex],["Stockmaß",h.height],["Farbe",h.color],["Beziehung",rel?.l],["Mag",h.likes],["Kann gut",h.goodAt],["Arbeitet an",h.workingOn],["Seit",h.since]].filter(x=>x[1]);
  return `<div class="rs-page stack-lg">
    <div class="row between"><button class="iconbtn" data-a="back" aria-label="Zurück">${ic("left")}</button><div class="hswitch">${D.horses.map(x=>`<button class="avatar ${x.id===h.id?"on":""}" data-a="openHorse" data-id="${x.id}" aria-label="${esc(x.name)}">${horseArt(x)}</button>`).join("")}</div></div>
    <div class="bigphoto">${horseArt(h)}<label class="glass photo-edit" style="cursor:pointer">${ic("cam",15)} Foto<input type="file" accept="image/*" class="sr" data-file="horsePhoto" data-id="${h.id}"></label><div class="in"><p class="eyebrow" style="color:rgba(255,255,255,.75)">Pferdeprofil</p><h1>${esc(h.name)}</h1><div class="small" style="opacity:.85">${[esc(h.breed),esc(h.sex)].filter(Boolean).join(" · ")}</div></div></div>
    <div class="row" style="gap:8px"><button class="btn sm" data-a="horseForm" data-id="${h.id}">${ic("edit",16)} Bearbeiten</button>${D.profile.activeHorseId===h.id?`<span class="pill">${ic("check",12)} Aktives Pferd</span>`:`<button class="btn sm ghost" data-a="pickHorse" data-id="${h.id}" data-stay="1">Als aktives Pferd</button>`}</div>
    <dl class="facts">${facts.map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    ${h.training?`<div class="card flat"><p class="eyebrow">Ausbildungsstand</p><p style="margin:0">${esc(h.training)}</p></div>`:""}
    ${h.specials?`<div class="card flat"><p class="eyebrow">Besonderheiten</p><p style="margin:0">${esc(h.specials)}</p></div>`:""}
    ${h.notes?`<div class="card flat"><p class="eyebrow">Persönliche Notizen</p><p style="margin:0">${esc(h.notes)}</p></div>`:""}
    <section><div class="sec-head"><h2>Mit ${esc(h.name)}</h2><span class="badge-obj">Erfasst</span></div>
      <div class="kpis"><div class="kpi"><div class="v">${ents.length}</div><div class="l">Einträge</div></div><div class="kpi"><div class="v">${hm(ents.reduce((a,e)=>a+(e.minutes||0),0))}</div><div class="l">Trainingszeit</div></div></div>
      ${ns?`<button class="card tap" style="margin-top:10px;width:100%;text-align:left;display:flex;gap:12px;align-items:center" data-a="openSession" data-id="${ns.id}">${ic("cal",22)}<span style="flex:1"><span class="small muted">Nächste Einheit · ${wdOf(ns.date)}, ${fmt(ns.date)}</span><br><b>${esc(ns.title)}</b></span>${ic("right",18)}</button>`:""}
    </section>
    ${goals.length?`<section><div class="sec-head"><h2>Ziele</h2></div>${goals.map(g=>`<button class="goalrow" data-a="openGoal" data-id="${g.id}"><span style="flex:1"><b>${esc(g.title)}</b><br><span class="small muted">${GOAL_STATUS.find(s=>s.id===g.status).l}</span></span>${ic("right",18)}</button>`).join("")}</section>`:""}
    <section><div class="sec-head"><h2>Trainingsverlauf</h2></div>${ents.slice(0,5).map(e=>entryCard(e,true)).join("") || emptyState("book","Noch keine Einträge mit "+esc(h.name)+".")}</section>
  </div>`;
}

/* ---------- Sheets ---------- */
function sheetShell(title, body, foot, opts={}){
  return `<div class="scrim" data-a="closeSheet"></div><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="shT"><div class="grab"></div>
    <div class="sh"><div>${opts.eyebrow?`<p class="eyebrow" style="margin:0">${opts.eyebrow}</p>`:""}<h2 id="shT" tabindex="-1">${title}</h2></div><button class="iconbtn" data-a="closeSheet" aria-label="Schließen">${ic("x")}</button></div>
    ${opts.steps||""}<div class="sb" id="sb">${body}</div>${foot?`<div class="sf">${foot}</div>`:""}</div>`;
}
function renderSheet(){
  const s = SHEETS[SHEETS.length-1]; if(!s) return "";
  const F = SHEET[s.type]; return F ? F(s) : "";
}
const SHEET = {
quick(){ return sheetShell("Was möchtest du tun?", `
  <button class="mtile tap" data-a="newEntry"><span class="sw">${ic("book",22)}</span><span><b>Training eintragen</b><br><span class="small muted">In 1–2 Minuten festhalten, wie es war</span></span></button>
  <button class="mtile tap" data-a="addSession" data-v="${TODAY}"><span class="sw" style="background:var(--honey)">${ic("cal",22)}</span><span><b>Einheit planen</b><br><span class="small muted">Für heute oder einen anderen Tag</span></span></button>
  <button class="mtile tap" data-a="openWizard"><span class="sw" style="background:var(--meadow)">${ic("spark",22)}</span><span><b>Trainingsplan erstellen</b><br><span class="small muted">Mehrere Wochen, passend zu deinem Ziel</span></span></button>
  <button class="mtile tap" data-a="go" data-v="coach"><span class="sw" style="background:#5d7f86">${ic("target",22)}</span><span><b>Rider Coach fragen</b><br><span class="small muted">Ein Reitproblem verstehen und gezielt üben</span></span></button>
  <button class="mtile tap" data-a="msForm"><span class="sw" style="background:#8a6a52">${ic("star",22)}</span><span><b>Meilenstein festhalten</b><br><span class="small muted">Ein Erfolg, auf den du stolz bist</span></span></button>`); },

entry(s){
  const d = s.d, st = s.step;
  const steps = `<div class="steps">${[1,2,3,4].map(i=>`<button class="${i<=st?"on":""}" data-a="estep" data-v="${i}" aria-label="Schritt ${i}"></button>`).join("")}</div>`;
  const titles = ["","Was hast du trainiert?","Die Eckdaten","Wie war's?","Gefühl & Fortschritt"];
  let b = "";
  if(st===1){
    b = `<div class="tiles" style="margin-top:6px">${DISC.map(x=>`<button class="tile ${d.discipline===x.id?"on":""}" data-a="eset" data-k="discipline" data-v="${x.id}" data-next="1"><span class="sw" style="background:${x.c}">${d.discipline===x.id?ic("check",16,2.4):""}</span>${x.id}</button>`).join("")}</div>
      ${d.discipline && !DISC.find(x=>x.id===d.discipline)?`<p class="small muted">Bisher: ${esc(d.discipline)}</p>`:""}
      ${s.err?`<p class="err">${s.err}</p>`:""}`;
  } else if(st===2){
    const hG = D.goals.filter(g=>!d.horseId||g.horseId===d.horseId).map(g=>goalType(g.title).label);
    b = `<div class="field"><span>Datum</span><div class="chips">${[[TODAY,"Heute"],[addDays(TODAY,-1),"Gestern"]].map(([v,l])=>`<button class="chip ${d.date===v?"on":""}" data-a="eset" data-k="date" data-v="${v}">${l}</button>`).join("")}<input class="input" style="width:auto;flex:1;min-width:140px;min-height:36px;padding:6px 10px" type="date" value="${d.date}" max="${addDays(TODAY,0)}" data-f="date" aria-label="Datum wählen"></div></div>
      <div class="field"><span>Dauer</span><div class="chips">${[20,30,45,60,90].map(v=>`<button class="chip ${d.minutes===v?"on":""}" data-a="eset" data-k="minutes" data-v="${v}" data-num="1">${v} min</button>`).join("")}<input class="input" style="width:90px;min-height:36px;padding:6px 10px" type="number" min="1" max="600" inputmode="numeric" placeholder="eigene" value="${[20,30,45,60,90].includes(d.minutes)?"":(d.minutes||"")}" data-f="minutes" aria-label="Dauer in Minuten"></div></div>
      <div class="field"><span>Pferd</span><div class="chips">${D.horses.map(h=>`<button class="chip ${d.horseId===h.id?"on":""}" data-a="eset" data-k="horseId" data-v="${h.id}">${esc(h.name)}</button>`).join("")}<button class="chip ${!d.horseId?"on":""}" data-a="eset" data-k="horseId" data-v="">Ohne Pferd</button></div></div>
      <label class="field"><span>Trainingsschwerpunkt</span><input class="input" data-f="focus" value="${esc(d.focus||"")}" placeholder="z. B. Übergänge, Galopp, Sitz …" list="focusList"><datalist id="focusList">${uniq(hG.concat(["Übergänge","Galopp","Sitz & Balance","Stellung & Biegung","Takt","Leichter Sitz"])).map(x=>`<option value="${esc(x)}">`).join("")}</datalist></label>
      <div class="chips" style="margin-top:8px">${uniq(hG).slice(0,3).map(x=>`<button class="chip sm" data-a="eset" data-k="focus" data-v="${esc(x)}">${esc(x)}</button>`).join("")}</div>
      <div class="field"><span>Intensität</span><div class="seg">${Object.entries(INT).map(([k,v])=>`<button class="${d.intensity===k?"on":""}" data-a="eset" data-k="intensity" data-v="${k}">${v.l}</button>`).join("")}</div></div>`;
  } else if(st===3){
    const Q = [["wentWell","Was hat heute gut funktioniert?","z. B. Die Übergänge waren weicher"],["difficult","Was war schwierig?",""],["learned","Was habe ich gelernt?",""],["nextTime","Was möchte ich nächstes Mal verbessern?",""],["coachTip","Welche Tipps hat mein Reitlehrer gegeben?",""]];
    b = `<p class="small muted" style="margin:4px 0 0">Alles freiwillig – schon ein Satz hilft dir später.</p>` + Q.map(([k,l,ph])=>`<label class="field"><span>${l}</span><textarea class="input" rows="2" data-f="${k}" placeholder="${ph}">${esc(d[k]||"")}</textarea></label>`).join("");
  } else {
    const txt = [d.focus,d.wentWell,d.difficult,d.learned,d.nextTime,d.discipline].join(" ");
    const sug = suggestLinks(txt), goals = D.goals.filter(g=>g.status!=="geschafft" && (!d.horseId || g.horseId===d.horseId));
    b = `<div class="field"><span>Wie hat sich dein Training heute angefühlt?</span><div class="moods">${MOODS.map(m=>`<button class="mood ${d.mood===m.id?"on":""}" data-a="eset" data-k="mood" data-v="${m.id}" aria-pressed="${d.mood===m.id}">${m.l}${moodScale(m.id)}</button>`).join("")}</div></div>
      <div class="field"><span>Mit einem Ziel verknüpfen</span><div class="chips">${goals.map(g=>`<button class="chip ${d.goalId===g.id?"on":""}" data-a="eset" data-k="goalId" data-v="${g.id}">${ic("flag",14)} ${esc(g.title)}</button>`).join("")}<button class="chip ${!d.goalId?"on":""}" data-a="eset" data-k="goalId" data-v="">Kein Ziel</button></div></div>
      ${d.goalId?`<div class="field card flat"><span class="row between">Wie sicher fühlst du dich beim Ziel? <span class="badge-subj">Selbsteinschätzung</span></span><input class="range" type="range" min="1" max="5" step="1" value="${d.conf||3}" data-f="conf" aria-label="Selbsteinschätzung 1 bis 5"><div class="small" id="confL"><b>${CONF[d.conf||3]}</b></div></div>`:""}
      ${sug.lessons.length||sug.rl.length?`<div class="field"><span>Passt dazu – zum Wiederholen verknüpfen</span>${sug.lessons.map(l=>`<button class="chip sm ${(d.lessons||[]).includes(l)?"on":""}" style="margin:0 6px 6px 0" data-a="etoggle" data-k="lessons" data-v="${l}">${ic("academy",14)} ${esc(LESSONS[l])}</button>`).join("")}${sug.rl.map(r=>`<button class="chip sm ${(d.lessons||[]).includes(r)?"on":""}" style="margin:0 6px 6px 0" data-a="etoggle" data-k="lessons" data-v="${r}">${ic("body",14)} ${esc(RL[r])}</button>`).join("")}</div>`:""}
      <div class="field"><span>Fotos (bis zu 4)</span>${(d.photos||[]).length<4?`<label class="upload">${ic("cam",18)} Foto hinzufügen<input type="file" accept="image/*" multiple data-file="entryMedia"></label>`:""}
        <div class="thumbs">${(d.photos||[]).map((src,i)=>`<div class="th"><img src="${src}" alt="Foto ${i+1}"><button class="rm" data-a="rmMedia" data-v="${i}" aria-label="Foto entfernen">${ic("x",14)}</button></div>`).join("")}</div>
        <p class="tiny muted" style="margin:6px 0 0">Fotos werden verkleinert und nur auf diesem Gerät gespeichert. Videos sind dafür zu groß.</p></div>
      <label class="field"><span>Persönliche Notizen</span><textarea class="input" rows="2" data-f="note">${esc(d.note||"")}</textarea></label>
      <div class="field card flat"><label class="row" style="gap:10px;cursor:pointer"><input type="checkbox" data-f="msOn" ${d.msOn?"checked":""} style="width:20px;height:20px;accent-color:var(--forest)"><b>Als persönlichen Meilenstein festhalten</b></label>
        ${d.msOn?`<input class="input" style="margin-top:10px" data-f="msTitle" value="${esc(d.msTitle||"")}" placeholder="z. B. Endlich ein ruhiger Übergang">`:""}</div>`;
  }
  const foot = st===1 ? `<button class="btn ghost" data-a="closeSheet">Abbrechen</button>`
    : `<button class="btn ghost" data-a="estep" data-v="${st-1}">Zurück</button>${st<4?`<button class="btn" data-a="estep" data-v="${st+1}">Weiter</button>`:""}<button class="btn ${st<4?"soft":""}" data-a="saveEntry">${ic("check",18)} Speichern</button>`;
  return sheetShell(titles[st], b, foot, {eyebrow: `${s.editId?"Eintrag bearbeiten":"Neuer Eintrag"} · Schritt ${st} von 4`, steps});
},

entryView(s){
  const e = D.entries.find(x=>x.id===s.id); if(!e) return "";
  const h = horse(e.horseId), g = goal(e.goalId), m = moodOf(e.mood), ps = D.plan.find(p=>p.id===e.planId), ms = D.milestones.find(x=>x.entryId===e.id);
  const Q = [["wentWell","Was gut funktioniert hat"],["difficult","Was schwierig war"],["learned","Was ich gelernt habe"],["practice","Was ich geübt habe"],["nextTime","Nächstes Mal verbessern"],["coachTip","Tipp vom Reitlehrer"],["moment","Mein Moment"],["note","Notizen"]];
  return sheetShell(esc(e.focus||e.discipline||"Training"), `
    <div class="row wrap" style="gap:6px"><span class="pill" style="background:${discColor(e.discipline)};color:#fff">${esc(e.discipline||"Training")}</span>${e.minutes?`<span class="pill ghost">${ic("clock",12)} ${e.minutes} min</span>`:""}${h?`<span class="pill ghost">${ic("horse",12)} ${esc(h.name)}</span>`:""}${intPill(e.intensity)}</div>
    ${m?`<div class="card flat row between" style="margin-top:14px"><span><span class="tiny muted">Gefühl des Tages</span><br><b>${m.l}</b></span>${moodScale(m.id)}</div>`:""}
    ${Q.filter(([k])=>e[k]).map(([k,l])=>`<div class="blk"><h3>${l}</h3><p style="margin:0;color:var(--ink2)">${esc(e[k])}</p></div>`).join("")}
    ${e.photo||(e.photos||[]).length?`<div class="blk"><h3>Fotos</h3><div class="thumbs">${[e.photo].concat(e.photos||[]).filter(Boolean).map((src,i)=>`<div class="th" style="width:140px;height:140px"><img src="${src}" alt="Foto ${i+1}"></div>`).join("")}</div></div>`:""}
    ${g||ps||ms||(e.lessons||[]).length?`<div class="blk"><h3>Verknüpft</h3>
      ${g?`<button class="linkcard" data-a="openGoal" data-id="${g.id}"><span class="k ex">${ic("flag",18)}</span><span style="flex:1"><span class="tiny muted">Trainingsziel</span><br><b>${esc(g.title)}</b></span>${ic("right",16)}</button>`:""}
      ${ps?`<button class="linkcard" data-a="openSession" data-id="${ps.id}"><span class="k ex">${ic("cal",18)}</span><span style="flex:1"><span class="tiny muted">Geplante Einheit</span><br><b>${esc(ps.title)}</b></span>${ic("right",16)}</button>`:""}
      ${ms?`<button class="linkcard" data-a="openMs" data-id="${ms.id}"><span class="k rl">${ic("star",18)}</span><span style="flex:1"><span class="tiny muted">Meilenstein</span><br><b>${esc(ms.title)}</b></span>${ic("right",16)}</button>`:""}
      ${(e.lessons||[]).map(linkCard).join("")}</div>`:""}
    <p class="tiny muted" style="margin-top:16px">${fmtLong(e.date)} · zuletzt geändert ${new Date(e.updatedAt).toLocaleDateString("de-DE")}</p>
    ${s.confirm?`<div class="confirm"><b>Eintrag wirklich löschen?</b><p class="small" style="margin:4px 0 10px">Das lässt sich nicht rückgängig machen.</p><div class="row"><button class="btn sm ghost" data-a="sset" data-k="confirm" data-v="">Abbrechen</button><button class="btn sm danger" data-a="delEntry" data-id="${e.id}">Löschen</button></div></div>`:""}`,
    `<button class="btn ghost" data-a="sset" data-k="confirm" data-v="1" aria-label="Löschen">${ic("trash",18)}</button><button class="btn" data-a="editEntry" data-id="${e.id}">${ic("edit",18)} Bearbeiten</button>`,
    {eyebrow: fmtLong(e.date)});
},

session(s){
  const x = D.plan.find(p=>p.id===s.id); if(!x) return "";
  const info = sessInfo(x), h = horse(x.horseId), ws = weekStart(x.date);
  const exList = x.kind==="lektion" && x.ref ? linkCard(x.ref) : x.kind==="riderlab" ? (x.rl||[]).map(r=>`<button class="exitem" data-a="openLink" data-v="${r}"><span class="n">${ic("body",16)}</span><span style="flex:1"><b>${esc(RL[r])}</b><br><span class="small muted">Rider Lab · Übung ohne Pferd</span></span>${ic("right",16)}</button>`).join("")
    : info.exs.map((e,i)=>`<button class="exitem tap" data-a="openEx" data-id="${e.id}"><span class="n">${i+1}</span><span style="flex:1;min-width:0"><b>${esc(e.name)}</b><br><span class="small muted">${catLabel(e.cat)} · ca. ${e.min} min</span></span>${lvBars(e.level)}${ic("right",16)}</button>`).join("");
  return sheetShell(esc(x.title), `
    <div class="row wrap" style="gap:6px"><span class="pill" style="background:${discColor(x.discipline)};color:#fff">${esc(x.discipline)}</span>${x.minutes?`<span class="pill ghost">${ic("clock",12)} ${x.minutes} min</span>`:""}${h?`<span class="pill ghost">${ic("horse",12)} ${esc(h.name)}</span>`:""}${intPill(x.intensity)}${x.phase?`<span class="pill sand">Phase: ${x.phase}</span>`:""}</div>
    ${x.done?`<div class="note" style="margin-top:12px;background:var(--forest-tint);color:var(--forest)">${ic("check",18)}<span>Erledigt${x.entryId?" · im Tagebuch festgehalten":""}</span></div>`:""}
    ${info.g?`<div class="blk"><h3>${ic("target",18)} Trainingsziel</h3><button class="linkcard" data-a="openGoal" data-id="${info.g.id}"><span class="k ex">${ic("flag",18)}</span><span style="flex:1"><b>${esc(info.g.title)}</b>${x.check?`<br><span class="small muted">Standortbestimmung: Vergleiche mit Woche 1</span>`:""}</span>${ic("right",16)}</button></div>`:""}
    <div class="blk"><h3>${ic("sun",18)} Aufwärmen</h3><ul>${sessWarm(x).map(t=>`<li>${t}</li>`).join("")}</ul></div>
    <div class="blk"><h3>${ic("bolt",18)} Hauptteil</h3>${exList||'<p class="muted small">Keine Übungen hinterlegt.</p>'}</div>
    <div class="blk"><h3>${ic("leaf",18)} Abschluss</h3><ul>${sessCool(x).map(t=>`<li>${t}</li>`).join("")}</ul></div>
    ${info.attention.length?`<div class="blk"><h3>${ic("info",18)} Worauf achten?</h3><ul>${info.attention.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
    ${info.errors.length?`<div class="blk"><h3>${ic("alert",18)} Typische Fehler</h3><ul>${info.errors.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
    ${info.safety.length?`<div class="blk"><h3>${ic("shield",18)} Sicherheit</h3><ul>${info.safety.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
    ${info.lessons.length||info.rl.length?`<div class="blk"><h3>${ic("academy",18)} Passende Lerninhalte</h3>${info.lessons.map(linkCard).join("")}${x.kind!=="riderlab"?info.rl.map(linkCard).join(""):""}</div>`:""}
    ${x.note?`<div class="blk"><h3>Notiz</h3><p style="margin:0;color:var(--ink2)">${esc(x.note)}</p></div>`:""}
    <div class="blk card flat"><h3>${ic("move",18)} Verschieben</h3><div class="chips">${[0,1,2,3,4,5,6].map(i=>{ const d = addDays(ws,i); return `<button class="chip sm ${d===x.date?"on":""}" data-a="moveTo" data-id="${x.id}" data-v="${d}">${WD[i]} ${fromDay(d).getDate()}.</button>`; }).join("")}<button class="chip sm" data-a="moveTo" data-id="${x.id}" data-v="${addDays(x.date,7)}">+1 Woche</button></div>
      <div class="row" style="margin-top:12px;gap:8px"><button class="btn sm ghost" data-a="addSession" data-v="${x.date}" data-edit="${x.id}">${ic("edit",15)} Bearbeiten</button>${s.confirm?`<button class="btn sm danger" data-a="delSession" data-id="${x.id}">Wirklich löschen</button>`:`<button class="btn sm ghost" data-a="sset" data-k="confirm" data-v="1">${ic("trash",15)} Löschen</button>`}</div></div>`,
    x.entryId ? `<button class="btn ghost" data-a="toggleDone" data-id="${x.id}">${x.done?"Als offen markieren":"Erledigt"}</button><button class="btn" data-a="openEntry" data-id="${x.entryId}">${ic("book",18)} Eintrag ansehen</button>`
      : x.kind==="riderlab"||x.kind==="lektion" ? `<button class="btn" data-a="toggleDone" data-id="${x.id}">${ic("check",18)} ${x.done?"Als offen markieren":"Erledigt"}</button>`
      : `<button class="btn ghost" data-a="toggleDone" data-id="${x.id}">${x.done?"Offen":"Nur abhaken"}</button><button class="btn" data-a="entryFromSession" data-id="${x.id}">${ic("book",18)} Training eintragen</button>`,
    {eyebrow: `${fmtLong(x.date)}`});
},

addSession(s){
  const d = s.d, gt = d.goalId ? goalType(goal(d.goalId)?.title) : null, sug = gt ? gt.ex : GT[GT.length-1].ex;
  return sheetShell(s.editId?"Einheit bearbeiten":"Einheit planen", `
    <label class="field"><span>Datum</span><input class="input" type="date" data-f="date" value="${d.date}"></label>
    <div class="field"><span>Art</span><div class="tiles">${[["reiten","Reiten",ic("horse",16)],["boden","Bodenarbeit / Longe",ic("leaf",16)],["riderlab","Rider Lab",ic("body",16)],["eigenes","Eigenes",ic("plus",16)]].map(([k,l,i])=>`<button class="tile ${d.kind===k?"on":""}" data-a="eset" data-k="kind" data-v="${k}"><span class="sw" style="background:var(--forest2)">${i}</span>${l}</button>`).join("")}</div></div>
    ${d.kind!=="riderlab"&&d.kind!=="eigenes"?`<div class="field"><span>Trainingsart</span><div class="chips">${DISC.filter(x=>d.kind==="boden"?["Bodenarbeit","Longieren","Freiarbeit"].includes(x.id):!["Bodenarbeit","Longieren","Freiarbeit"].includes(x.id)).map(x=>`<button class="chip sm ${d.discipline===x.id?"on":""}" data-a="eset" data-k="discipline" data-v="${x.id}">${discDot(x.id)}${x.id}</button>`).join("")}</div></div>
    <div class="field"><span>Pferd</span><div class="chips">${D.horses.map(h=>`<button class="chip sm ${d.horseId===h.id?"on":""}" data-a="eset" data-k="horseId" data-v="${h.id}">${esc(h.name)}</button>`).join("")}</div></div>`:""}
    <label class="field"><span>Titel</span><input class="input" data-f="title" value="${esc(d.title||"")}" placeholder="z. B. Übergänge auf dem Zirkel"></label>
    <div class="field"><span>Dauer</span><div class="chips">${[15,30,45,60].map(v=>`<button class="chip sm ${d.minutes===v?"on":""}" data-a="eset" data-k="minutes" data-v="${v}" data-num="1">${v} min</button>`).join("")}</div></div>
    <div class="field"><span>Intensität</span><div class="seg">${Object.entries(INT).map(([k,v])=>`<button class="${d.intensity===k?"on":""}" data-a="eset" data-k="intensity" data-v="${k}">${v.l}</button>`).join("")}</div></div>
    <div class="field"><span>Zahlt ein auf Ziel</span><div class="chips">${D.goals.filter(g=>g.status!=="geschafft").map(g=>`<button class="chip sm ${d.goalId===g.id?"on":""}" data-a="eset" data-k="goalId" data-v="${g.id}">${esc(g.title)}</button>`).join("")}<button class="chip sm ${!d.goalId?"on":""}" data-a="eset" data-k="goalId" data-v="">Keins</button></div></div>
    ${d.kind==="reiten"||d.kind==="boden"?`<div class="field"><span>Übungen für den Hauptteil (2–4 empfohlen)</span>${uniq(sug.concat(d.ex||[])).map(exById).map(e=>`<button class="chip sm ${(d.ex||[]).includes(e.id)?"on":""}" style="margin:0 6px 6px 0" data-a="etoggle" data-k="ex" data-v="${e.id}">${esc(e.name)}</button>`).join("")}<p class="tiny muted">${gt?`Vorschläge passend zum Ziel (${gt.label}).`:"Wähle ein Ziel für passende Vorschläge."} Aufwärmen und Abschluss werden automatisch ergänzt.</p></div>`:""}
    <label class="field"><span>Notiz</span><textarea class="input" rows="2" data-f="note">${esc(d.note||"")}</textarea></label>
    ${s.err?`<p class="err">${s.err}</p>`:""}`,
    `<button class="btn ghost" data-a="closeSheet">Abbrechen</button><button class="btn" data-a="saveSession">${ic("check",18)} Speichern</button>`);
},

exercise(s){
  const e = exById(s.id); if(!e) return "";
  return sheetShell(esc(e.name), `
    <div class="row wrap" style="gap:6px"><span class="pill">${catLabel(e.cat)}</span><span class="pill ghost">Stufe ${lvBars(e.level)} ${LEVELS[e.level-1]}</span><span class="pill ghost">${ic("clock",12)} ca. ${e.min} min</span></div>
    ${figSVG(e.fig)}
    <div class="blk"><h3>${ic("target",18)} Trainingsziel</h3><p style="margin:0;color:var(--ink2)">${esc(e.goal)}</p></div>
    <div class="blk"><h3>${ic("check",18)} Voraussetzungen</h3><p style="margin:0;color:var(--ink2)">${esc(e.pre)}</p></div>
    <div class="blk"><h3>${ic("list",18)} Schritt für Schritt</h3><ol class="num">${e.steps.map(t=>`<li>${esc(t)}</li>`).join("")}</ol></div>
    <div class="blk"><h3>${ic("alert",18)} Typische Fehler</h3><ul>${e.err.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>
    <div class="blk"><h3>${ic("shield",18)} Sicherheitshinweise</h3><ul>${e.safe.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>
    ${(e.stopWhen||[]).length?`<div class="blk"><h3>${ic("x",18)} Wann abbrechen?</h3><ul>${e.stopWhen.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
    <div class="note" style="margin-top:16px">${ic("info",18)}<span><b>Worauf achten:</b> ${esc(e.tip)}</span></div>
    ${e.lessons.length||e.rl.length?`<div class="blk"><h3>${ic("academy",18)} Passende Lerninhalte</h3>${e.lessons.map(linkCard).join("")}${e.rl.map(linkCard).join("")}</div>`:""}
    <p class="tiny muted" style="margin-top:14px">Fachlich geprüft</p>`,
    `<button class="btn" data-a="exToPlan" data-id="${e.id}">${ic("cal",18)} In Plan übernehmen</button>`, {eyebrow:"Übungsbibliothek"});
},

goal(s){
  const g = goal(s.id); if(!g) return "";
  const gt = goalType(g.title), ents = sortE(D.entries.filter(e=>e.goalId===g.id)), ck = g.checkins||[], last = ck[ck.length-1];
  const sessions = D.plan.filter(p=>p.goalId===g.id), sd = sessions.filter(p=>p.done).length;
  return sheetShell(esc(g.title), `
    <div class="seg" role="group" aria-label="Status">${GOAL_STATUS.map(x=>`<button class="${g.status===x.id?"on":""}" data-a="goalStatus" data-id="${g.id}" data-v="${x.id}">${x.l}</button>`).join("")}</div>
    ${g.status==="geschafft"?`<button class="btn soft block" style="margin-top:10px" data-a="msForm" data-title="${esc(g.title)} – geschafft!" data-horse="${g.horseId||""}">${ic("star",18)} Als Meilenstein festhalten</button>`:""}
    ${g.description?`<p style="color:var(--ink2);margin:14px 0 0">${esc(g.description)}</p>`:""}
    <dl class="facts" style="margin-top:14px"><div><dt>Pferd</dt><dd>${esc(horse(g.horseId)?.name||"Alle")}</dd></div><div><dt>Seit</dt><dd>${fmt(g.startDate,{day:"numeric",month:"short",year:"numeric"})}</dd></div>
      <div><dt>Zieldatum</dt><dd>${g.targetDate?fmt(g.targetDate,{day:"numeric",month:"short",year:"numeric"}):"offen"}</dd></div><div><dt>Übungsgruppe</dt><dd>${gt.label}</dd></div></dl>
    <div class="card flat" style="margin-top:14px"><div class="row between"><h3>Wie sicher fühlst du dich gerade?</h3><span class="badge-subj">Selbsteinschätzung</span></div>
      <input class="range" type="range" min="1" max="5" step="1" value="${s.cv||last?.v||3}" data-live="goalConf" aria-label="Selbsteinschätzung 1 bis 5" style="margin-top:12px">
      <div class="row between"><b id="gcL">${CONF[s.cv||last?.v||3]}</b><button class="btn sm" data-a="goalCheckin" data-id="${g.id}">Festhalten</button></div>
      ${ck.length?`<div class="row between" style="margin-top:12px"><span class="tiny muted">${ck.length} Einschätzungen seit ${fmt(ck[0].date)}</span>${spark(ck,120,36)}</div>`:""}
      <p class="tiny muted" style="margin:8px 0 0">Dein eigenes Gefühl – keine Bewertung durch die App.</p></div>
    <div class="kpis" style="margin-top:10px"><div class="kpi"><div class="v">${ents.length}</div><div class="l">Tagebucheinträge dazu</div></div><div class="kpi"><div class="v">${sd}/${sessions.length}</div><div class="l">Planeinheiten erledigt</div></div></div>
    <div class="blk"><h3>${ic("academy",18)} Passend zu deinem Ziel</h3>
      ${gt.lessons.map(linkCard).join("")}
      ${gt.ex.slice(0,3).map(id=>{ const e = exById(id); return `<button class="linkcard" data-a="openEx" data-id="${e.id}"><span class="k ex">${ic("bolt",18)}</span><span style="flex:1"><span class="tiny muted">Übung · ${catLabel(e.cat)}</span><br><b>${esc(e.name)}</b></span>${lvBars(e.level)}</button>`; }).join("")}
      ${gt.rl.map(linkCard).join("")}</div>
    ${g.notes?`<div class="blk"><h3>Notizen</h3><p style="margin:0;color:var(--ink2)">${esc(g.notes)}</p></div>`:""}
    ${ents.length?`<div class="blk"><h3>Letzte Einträge</h3>${ents.slice(0,3).map(e=>entryCard(e,true)).join("")}</div>`:""}
    ${s.confirm?`<div class="confirm"><b>Ziel löschen?</b><p class="small" style="margin:4px 0 10px">Einträge und Planeinheiten bleiben erhalten, nur die Verknüpfung wird entfernt.</p><div class="row"><button class="btn sm ghost" data-a="sset" data-k="confirm" data-v="">Abbrechen</button><button class="btn sm danger" data-a="delGoal" data-id="${g.id}">Löschen</button></div></div>`:`<div class="row" style="margin-top:16px;gap:8px"><button class="btn sm ghost" data-a="goalForm" data-id="${g.id}">${ic("edit",15)} Bearbeiten</button><button class="btn sm ghost" data-a="sset" data-k="confirm" data-v="1">${ic("trash",15)} Löschen</button></div>`}`,
    `<button class="btn" data-a="openWizard" data-goal="${g.id}">${ic("spark",18)} Trainingsplan dafür erstellen</button>`, {eyebrow:"Trainingsziel"});
},

goalForm(s){
  const d = s.d;
  return sheetShell(s.editId?"Ziel bearbeiten":"Neues Trainingsziel", `
    <div class="field"><span>Vorschläge</span><div class="chips">${GOAL_SUGGEST.map(t=>`<button class="chip sm ${d.title===t?"on":""}" data-a="eset" data-k="title" data-v="${t}">${t}</button>`).join("")}</div></div>
    <label class="field"><span>Zielname *</span><input class="input" data-f="title" value="${esc(d.title||"")}" placeholder="Was möchtest du erreichen?"></label>
    <label class="field"><span>Beschreibung</span><textarea class="input" rows="2" data-f="description">${esc(d.description||"")}</textarea></label>
    <div class="field"><span>Pferd</span><div class="chips">${D.horses.map(h=>`<button class="chip sm ${d.horseId===h.id?"on":""}" data-a="eset" data-k="horseId" data-v="${h.id}">${esc(h.name)}</button>`).join("")}<button class="chip sm ${!d.horseId?"on":""}" data-a="eset" data-k="horseId" data-v="">Alle</button></div></div>
    <div class="row" style="gap:10px"><label class="field" style="flex:1"><span>Startdatum</span><input class="input" type="date" data-f="startDate" value="${d.startDate||TODAY}"></label><label class="field" style="flex:1"><span>Zieldatum (optional)</span><input class="input" type="date" data-f="targetDate" value="${d.targetDate||""}"></label></div>
    <label class="field"><span>Persönliche Notizen</span><textarea class="input" rows="2" data-f="notes">${esc(d.notes||"")}</textarea></label>
    ${d.title?`<div class="note" style="margin-top:14px">${ic("info",18)}<span>Wird der Übungsgruppe <b>${goalType(d.title).label}</b> zugeordnet. Danach siehst du passende Übungen, Lektionen und Rider-Lab-Training.</span></div>`:""}
    ${s.err?`<p class="err">${s.err}</p>`:""}`,
    `<button class="btn ghost" data-a="closeSheet">Abbrechen</button><button class="btn" data-a="saveGoal">${ic("check",18)} Speichern</button>`);
},

msForm(s){
  const d = s.d;
  return sheetShell(s.editId?"Meilenstein bearbeiten":"Meilenstein festhalten", `
    <p class="small muted" style="margin:0">Ein Moment, auf den du stolz bist – egal wie klein.</p>
    <div class="field"><span>Ideen</span><div class="chips">${MS_SUGGEST.map(t=>`<button class="chip sm ${d.title===t?"on":""}" data-a="eset" data-k="title" data-v="${t}">${t}</button>`).join("")}</div></div>
    <label class="field"><span>Was hast du geschafft? *</span><input class="input" data-f="title" value="${esc(d.title||"")}"></label>
    <label class="field"><span>Datum</span><input class="input" type="date" data-f="date" value="${d.date}"></label>
    <div class="field"><span>Pferd</span><div class="chips">${D.horses.map(h=>`<button class="chip sm ${d.horseId===h.id?"on":""}" data-a="eset" data-k="horseId" data-v="${h.id}">${esc(h.name)}</button>`).join("")}<button class="chip sm ${!d.horseId?"on":""}" data-a="eset" data-k="horseId" data-v="">Ohne</button></div></div>
    <label class="field"><span>Notiz</span><textarea class="input" rows="3" data-f="note">${esc(d.note||"")}</textarea></label>
    ${s.err?`<p class="err">${s.err}</p>`:""}`,
    `<button class="btn ghost" data-a="closeSheet">Abbrechen</button><button class="btn" data-a="saveMs">${ic("star",18)} Speichern</button>`);
},
msView(s){
  const m = D.milestones.find(x=>x.id===s.id); if(!m) return "";
  const e = D.entries.find(x=>x.id===m.entryId);
  return sheetShell(esc(m.title), `<div class="ms" style="box-shadow:none;text-align:center;padding:24px"><div class="star" style="margin:0 auto 12px;width:56px;height:56px;border-radius:18px">${ic("star",28)}</div><b style="font-family:var(--display);font-size:22px">${esc(m.title)}</b><div class="d">${fmtLong(m.date)}${horse(m.horseId)?" · "+esc(horse(m.horseId).name):""}</div></div>
    ${m.note?`<p style="color:var(--ink2)">${esc(m.note)}</p>`:""}${e?`<div class="blk"><h3>Aus dem Tagebuch</h3>${entryCard(e,true)}</div>`:""}
    ${s.confirm?`<div class="confirm"><b>Meilenstein löschen?</b><div class="row" style="margin-top:10px"><button class="btn sm ghost" data-a="sset" data-k="confirm" data-v="">Abbrechen</button><button class="btn sm danger" data-a="delMs" data-id="${m.id}">Löschen</button></div></div>`:""}`,
    `<button class="btn ghost" data-a="sset" data-k="confirm" data-v="1" aria-label="Löschen">${ic("trash",18)}</button><button class="btn" data-a="msForm" data-id="${m.id}">${ic("edit",18)} Bearbeiten</button>`, {eyebrow:"Meilenstein"});
},

horseForm(s){
  const d = s.d;
  return sheetShell(s.editId?"Pferdeprofil bearbeiten":"Neues Pferd", `
    <div class="row" style="gap:14px;margin-top:4px"><span class="avatar" style="width:84px;height:84px;border-radius:20px">${horseArt({...d,id:d.id||"new",name:d.name||"Pferd"})}</span>
      <label class="upload" style="flex:1">${ic("cam",18)} Foto wählen<input type="file" accept="image/*" data-file="formPhoto"></label></div>
    <label class="field"><span>Name *</span><input class="input" data-f="name" value="${esc(d.name||"")}"></label>
    <div class="row" style="gap:10px"><label class="field" style="flex:1"><span>Geburtsjahr</span><input class="input" type="number" inputmode="numeric" min="1980" max="${new Date().getFullYear()}" data-f="birthYear" value="${esc(d.birthYear||"")}"></label><label class="field" style="flex:1"><span>Stockmaß</span><input class="input" data-f="height" value="${esc(d.height||"")}" placeholder="z. B. 1,62 m"></label></div>
    <label class="field"><span>Rasse</span><input class="input" data-f="breed" value="${esc(d.breed||"")}"></label>
    <div class="field"><span>Geschlecht</span><div class="chips">${SEXES.map(x=>`<button class="chip sm ${d.sex===x?"on":""}" data-a="eset" data-k="sex" data-v="${x}">${x}</button>`).join("")}</div></div>
    <div class="field"><span>Mein Pferd ist …</span><div class="chips">${RELATIONS.map(x=>`<button class="chip sm ${d.relation===x.id?"on":""}" data-a="eset" data-k="relation" data-v="${x.id}">${x.l}</button>`).join("")}</div></div>
    <label class="field"><span>Ausbildungsstand</span><textarea class="input" rows="2" data-f="training">${esc(d.training||"")}</textarea></label>
    <label class="field"><span>Individuelle Besonderheiten</span><textarea class="input" rows="2" data-f="specials" placeholder="z. B. schreckhaft bei Wind, braucht lange Schrittphase">${esc(d.specials||"")}</textarea></label>
    <label class="field"><span>Persönliche Notizen</span><textarea class="input" rows="2" data-f="notes">${esc(d.notes||"")}</textarea></label>
    ${s.editId?(s.confirm?`<div class="confirm"><b>${esc(d.name)} wirklich löschen?</b><p class="small" style="margin:4px 0 10px">Einträge, Ziele und Meilensteine bleiben erhalten, nur die Zuordnung zum Pferd wird entfernt.</p><div class="row"><button class="btn sm ghost" data-a="sset" data-k="confirm" data-v="">Abbrechen</button><button class="btn sm danger" data-a="delHorse" data-id="${s.editId}">Löschen</button></div></div>`:`<button class="btn sm ghost" style="margin-top:16px" data-a="sset" data-k="confirm" data-v="1">${ic("trash",15)} Pferd löschen</button>`):""}
    ${s.err?`<p class="err">${s.err}</p>`:""}`,
    `<button class="btn ghost" data-a="closeSheet">Abbrechen</button><button class="btn" data-a="saveHorse">${ic("check",18)} Speichern</button>`);
},

target(s){
  return sheetShell("Mein Monatsziel", `<p class="small muted" style="margin:0">Wie viele Einheiten möchtest du dir pro Monat vornehmen? Das ist dein persönliches Ziel – keine Vorgabe.</p>
    <div class="stepper" style="justify-content:center;margin:22px 0"><button data-a="tgt" data-v="-1" aria-label="Weniger">−</button><b>${s.v}</b><button data-a="tgt" data-v="1" aria-label="Mehr">+</button></div><p class="small muted" style="text-align:center">Einheiten pro Monat</p>`,
    `<button class="btn" data-a="saveTarget">Übernehmen</button>`);
},

rules(s){
  const p = D.plans.find(x=>x.id===s.id); if(!p) return "";
  return sheetShell("So ist dein Plan aufgebaut", `<p class="small muted" style="margin:0">${esc(p.goalTitle)} · ${esc(horse(p.horseId)?.name||"")} · ${p.level}</p><div class="card flat" style="margin-top:12px">${p.rules.map(r=>`<div class="ruleli">${ic("check",18)}<span>${esc(r)}</span></div>`).join("")}</div>
    ${s.confirm?`<div class="confirm"><b>Plan entfernen?</b><p class="small" style="margin:4px 0 10px">Offene Einheiten dieses Plans werden gelöscht. Erledigte Einheiten und Tagebucheinträge bleiben.</p><div class="row"><button class="btn sm ghost" data-a="sset" data-k="confirm" data-v="">Abbrechen</button><button class="btn sm danger" data-a="delPlan" data-id="${p.id}">Entfernen</button></div></div>`:""}`,
    `<button class="btn ghost" data-a="sset" data-k="confirm" data-v="1">${ic("trash",18)} Plan entfernen</button><button class="btn" data-a="closeSheet">Fertig</button>`);
},

wizard(s){
  const p = s.p, st = s.step;
  const steps = `<div class="steps">${[1,2,3,4,5,6,7].map(i=>`<button class="${i<=st?"on":""}" data-a="wstep" data-v="${i}" aria-label="Schritt ${i}"></button>`).join("")}</div>`;
  const T = ["","Welches Pferd?","Welches Trainingsziel?","Wie oft pro Woche?","Wie lange soll der Plan laufen?","Welche Trainingsarten?","Welches Ausbildungsniveau?","Dein Plan"];
  let b = "";
  if(st===1 && !D.horses.length) b = `<div class="empty-state">${ic("horse",34)}<p>Leg zuerst dein Pferd an – der Plan richtet sich nach seinem Alter und Ausbildungsstand.</p><button class="btn" data-a="horseForm">Pferd anlegen</button></div>`;
  else if(st===1) b = D.horses.map(h=>`<button class="mtile tap ${p.horseId===h.id?"on":""}" style="${p.horseId===h.id?"border-color:var(--forest);background:var(--forest-tint)":""}" data-a="wset" data-k="horseId" data-v="${h.id}" data-next="1"><span class="avatar" style="width:52px;height:52px;border-radius:15px">${horseArt(h)}</span><span style="flex:1"><b>${esc(h.name)}</b><br><span class="small muted">${ageOf(h)!=null?ageOf(h)+" Jahre · ":""}${esc(h.training||"")}</span></span></button>`).join("");
  if(st===2){ const gs = D.goals.filter(g=>g.status!=="geschafft" && (!g.horseId||g.horseId===p.horseId));
    b = `${gs.map(g=>`<button class="mtile tap" style="${p.goalId===g.id?"border-color:var(--forest);background:var(--forest-tint)":""}" data-a="wgoal" data-v="${g.id}"><span class="sw">${ic("flag",20)}</span><span style="flex:1"><b>${esc(g.title)}</b><br><span class="small muted">Übungsgruppe: ${goalType(g.title).label}</span></span></button>`).join("")}
      <label class="field"><span>Oder ein neues Ziel</span><input class="input" data-f="goalTitleNew" value="${esc(p.goalId?"":p.goalTitle||"")}" placeholder="z. B. Pferd geraderichten" list="gsug"><datalist id="gsug">${GOAL_SUGGEST.map(x=>`<option value="${x}">`).join("")}</datalist></label>
      <div class="chips" style="margin-top:8px">${GOAL_SUGGEST.slice(0,4).map(t=>`<button class="chip sm" data-a="wnewgoal" data-v="${t}">${t}</button>`).join("")}</div>${s.err?`<p class="err">${s.err}</p>`:""}`; }
  if(st===3) b = `<div class="stepper" style="justify-content:center;margin:26px 0 10px"><button data-a="wnum" data-k="perWeek" data-v="-1" aria-label="Weniger">−</button><b>${p.perWeek}</b><button data-a="wnum" data-k="perWeek" data-v="1" aria-label="Mehr">+</button></div><p class="small muted" style="text-align:center">Trainingseinheiten pro Woche (1–5)</p>
    <div class="weekstrip" style="margin-top:18px">${WD.map((w,i)=>`<div><div class="d">${w}</div><div class="c ${PATTERNS[p.perWeek].includes(i)?"plan":""}">${PATTERNS[p.perWeek].includes(i)?ic("horse",14):""}</div></div>`).join("")}</div><p class="tiny muted" style="text-align:center;margin-top:10px">Die Tage verteilt der Planer mit Pausen dazwischen. Du kannst sie später verschieben.</p>`;
  if(st===4) b = `<div class="tiles">${[2,4,6,8].map(w=>`<button class="tile ${p.weeks===w?"on":""}" data-a="wset" data-k="weeks" data-v="${w}" data-num="1"><span class="sw" style="background:var(--forest2)">${w}</span>${w} Wochen</button>`).join("")}</div>
    <div class="field"><span>Start</span><div class="seg">${[["this","Ab morgen"],["next","Nächster Montag"]].map(([k,l])=>`<button class="${p.startMode===k?"on":""}" data-a="wset" data-k="startMode" data-v="${k}">${l}</button>`).join("")}</div></div>`;
  if(st===5) b = `<p class="small muted" style="margin:0">Dressurarbeit ist die Basis. Wähle, was zusätzlich dazukommen darf.</p><div class="chips" style="margin-top:12px">${["Dressur","Stangenarbeit","Gelände","Bodenarbeit","Longieren"].map(t=>`<button class="chip ${p.types.includes(t)?"on":""}" data-a="wtype" data-v="${t}">${discDot(t)}${t}</button>`).join("")}</div>
    <div class="field card flat"><label class="row" style="gap:10px;cursor:pointer"><input type="checkbox" data-f="riderlab" ${p.riderlab?"checked":""} style="width:20px;height:20px;accent-color:var(--forest)"><span><b>Rider Lab einplanen</b><br><span class="small muted">1× pro Woche 15 Min Training ohne Pferd</span></span></label></div>`;
  if(st===6) b = LEVELS.map((l,i)=>`<button class="mtile tap" style="${p.level===l?"border-color:var(--forest);background:var(--forest-tint)":""}" data-a="wset" data-k="level" data-v="${l}"><span class="sw" style="background:var(--forest2)">${lvBars(i+1)}</span><span style="flex:1"><b>${l}</b><br><span class="small muted">${["Grundlagen festigen, kürzere Einheiten (ca. 35 Min)","Sicher in allen Grundgangarten (ca. 45 Min)","Erste Lektionen der Klasse A/L (ca. 50 Min)"][i]}</span></span></button>`).join("") + (ageOf(horse(p.horseId))!=null && (ageOf(horse(p.horseId))<6||ageOf(horse(p.horseId))>=20) ? `<div class="note warn" style="margin-top:6px">${ic("info",18)}<span>${esc(horse(p.horseId).name)} ist ${ageOf(horse(p.horseId))} Jahre alt. Der Plan wird automatisch kürzer und weniger belastend.</span></div>`:"");
  if(st===7){ const r = s.preview; const byW = {};
    r.sessions.forEach(x=>{ const w = Math.floor((fromDay(x.date)-fromDay(r.meta.start))/864e5/7); (byW[w]=byW[w]||[]).push(x); });
    b = `<div class="card" style="background:var(--forest);color:#fff;border:0"><p class="eyebrow" style="color:rgba(255,255,255,.7)">${esc(horse(p.horseId).name)} · ${p.level}</p><h2 style="color:#fff">${esc(p.goalTitle)}</h2><p class="small" style="opacity:.85;margin:6px 0 0">${p.weeks} Wochen · ${p.perWeek}× pro Woche · ${r.sessions.length} Einheiten · ab ${fmtLong(r.meta.start)}</p></div>
      <div class="blk"><h3>${ic("info",18)} Warum dieser Aufbau?</h3><div class="card flat">${r.rules.map(x=>`<div class="ruleli">${ic("check",18)}<span>${esc(x)}</span></div>`).join("")}</div></div>
      ${Object.keys(byW).map(w=>`<div class="wkblk"><h4><span>Woche ${+w+1} · ${byW[w][0].phase}</span><span>${hm(byW[w].reduce((a,x)=>a+x.minutes,0))}</span></h4>${byW[w].map(x=>`<div class="prev-s" style="border-left:4px solid ${discColor(x.discipline)}"><span class="wd">${wdOf(x.date)}</span><span style="flex:1"><b>${esc(x.title)}</b><br><span class="tiny muted">${x.kind==="riderlab"?esc(RL[x.rl[0]]):x.ex.map(id=>exById(id).name).join(" · ")}</span></span><span class="tiny muted">${x.minutes}′</span></div>`).join("")}</div>`).join("")}
      <p class="tiny muted" style="margin-top:12px">Übungen stammen aus der geprüften Bibliothek (fachlich geprüft). Es wird nichts zufällig zusammengestellt: gleiche Eingaben ergeben den gleichen Plan.</p>`; }
  const foot = st===7 ? `<button class="btn ghost" data-a="wstep" data-v="6">Zurück</button><button class="btn" data-a="applyPlan">${ic("check",18)} Plan übernehmen</button>`
    : `${st>1?`<button class="btn ghost" data-a="wstep" data-v="${st-1}">Zurück</button>`:""}<button class="btn" data-a="wstep" data-v="${st+1}">${st===6?"Plan erstellen":"Weiter"}</button>`;
  return sheetShell(T[st], b, foot, {eyebrow:`Plan-Builder · Schritt ${st} von 7`, steps});
},
};
function linkCard(id){
  const isRl = id.startsWith("rl-");
  return `<button class="linkcard" data-a="openLink" data-v="${id}"><span class="k ${isRl?"rl":"aka"}">${ic(isRl?"body":"academy",18)}</span><span style="flex:1;min-width:0"><span class="tiny muted">${isRl?"Rider Lab · ohne Pferd":"Reitakademie · Lektion"}</span><br><b>${esc(isRl?RL[id]:LESSONS[id])}</b></span>${ic("right",16)}</button>`;
}

/* ---------- Rendern ---------- */
function render(keepScroll){
  if(!ROOT) return;
  const $ = id => ROOT.querySelector("#"+id);
  const sb = $("sb"), st = sb ? sb.scrollTop : 0;
  const V = {home:vHome, journal:vJournal, coach:vCoach, planner:vPlanner, progress:vProgress, horse:vHorse}[UI.view] || vHome;
  const tabs = [["home","Übersicht","home"],["journal","Tagebuch","book"],["coach","Coach","target"],["planner","Planer","cal"],["progress","Fortschritt","chart"]];
  $("rs-tabs").innerHTML = tabs.map(n=>{ const on = UI.view===n[0]||(n[0]==="journal"&&UI.view==="horse"); return `<button class="${on?"on":""}" data-a="go" data-v="${n[0]}" aria-current="${on?"page":"false"}">${ic(n[2],20)}${n[1]}</button>`; }).join("");
  ROOT.classList.toggle("cx-focus", UI.view==="coach" && UI.c.screen!=="home");
  $("rs-view").innerHTML = V();
  const had = !!sb;
  $("rs-sheet").innerHTML = renderSheet();
  const nsb = $("sb");
  if(nsb && keepScroll && had) nsb.scrollTop = st;
  if(nsb && !keepScroll){ const t = $("shT"); t && t.focus({preventScroll:true}); }
  requestAnimationFrame(()=>ROOT && ROOT.querySelectorAll("circle.v[data-off]").forEach(c=>c.style.strokeDashoffset = c.dataset.off));
  const p = routePath(); if(p!==LASTPATH){ LASTPATH = p; HOST && HOST.onRoute(BASE()+p); }
  save();
}
function toast(msg){ if(!ROOT) return; const r = ROOT.querySelector("#rs-toast"); r.innerHTML = `<div class="toast">${ic("check",18)} ${esc(msg)}</div>`; clearTimeout(toast.t); toast.t = setTimeout(()=>{ r.innerHTML=""; },2700); }
const cur = () => SHEETS[SHEETS.length-1];
function openSheet(type, props={}){ SHEETS.push({type,...props}); render(); }
function replaceSheet(type, props={}){ SHEETS.pop(); SHEETS.push({type,...props}); render(); }
function closeSheet(){ SHEETS.pop(); render(); }
function go(v){ if(v==="coach" && UI.view==="coach" && UI.c.screen!=="home"){ UI.c = {...UI.c, screen:"home", caseId:null, confirm:false}; } UI.view = v; SHEETS = []; window.scrollTo({top:0}); render(); }

/* ---------- Aktionen ---------- */
function newEntryDraft(extra={}){ const h = activeHorse(); return {date:TODAY, minutes:45, horseId:h?.id||"", intensity:"mittel", lessons:[], photos:[], ...extra}; }
function sessionDraft(date, extra={}){ return {date, kind:"reiten", discipline:"Dressur", horseId:activeHorse()?.id, minutes:45, intensity:"mittel", ex:[], ...extra}; }
const A = {
  go:d=>go(d.v),
  quick:()=>openSheet("quick"),
  closeSheet,
  nav:d=>{ SHEETS=[]; HOST && HOST.navigate(BASE()+d.v); },
  back:()=>go("journal"),
  pickHorse:d=>{ D.profile.activeHorseId = d.id; if(d.stay){ render(); toast(`${horse(d.id).name} ist jetzt aktiv`); } else render(); },
  scope:d=>{ UI.scope = d.id; render(); },
  openHorse:d=>{ UI.view="horse"; UI.horseId=d.id; UI.jtab="horses"; SHEETS=[]; window.scrollTo({top:0}); render(); },
  jtab:d=>{ UI.jtab=d.v; if(UI.view!=="journal") UI.view="journal"; SHEETS=[]; render(); },
  jmode:d=>{ UI.jmode=d.v; render(); },
  jf:d=>{ UI.jf[d.k]=d.v; render(); },
  jcal:d=>{ UI.jday = UI.jday===d.v ? null : d.v; render(); },
  jcalM:d=>{ UI.jmonth = shiftMonth(UI.jmonth,+d.v); render(); },
  ptab:d=>{ UI.ptab=d.v; render(); },
  week:d=>{ UI.week = addDays(UI.week,+d.v); render(); },
  pcal:d=>{ UI.pday=d.v; render(); },
  pcalM:d=>{ UI.pmonth = shiftMonth(UI.pmonth,+d.v); render(); },
  libcat:d=>{ UI.lib.cat=d.v; render(); },
  target:()=>openSheet("target",{v:D.profile.monthlyTarget||12}),
  tgt:d=>{ const s=cur(); s.v=Math.max(1,Math.min(40,s.v+ +d.v)); render(true); },
  saveTarget:()=>{ D.profile.monthlyTarget=cur().v; closeSheet(); toast("Monatsziel gespeichert"); },
  openLink:d=>{ const l = HOST && HOST.links[d.v]; if(l){ SHEETS=[]; HOST.navigate(l.href); } else toast("Dieser Inhalt ist gerade nicht verfügbar"); },
  sset:d=>{ cur()[d.k]=d.v; render(true); },

  /* Einträge */
  newEntry:d=>{ if(cur()?.type==="quick") SHEETS.pop(); openSheet("entry",{step:1,d:newEntryDraft(d.date?{date:d.date}:{})}); },
  editEntry:d=>{ const e = D.entries.find(x=>x.id===d.id); replaceSheet("entry",{step:2,editId:e.id,d:JSON.parse(JSON.stringify({...e,lessons:e.lessons||[],photos:e.photos||[]}))}); },
  openEntry:d=>openSheet("entryView",{id:d.id}),
  entryFromSession:d=>{ const s = D.plan.find(x=>x.id===d.id); const g = goal(s.goalId);
    replaceSheet("entry",{step:3,d:newEntryDraft({date:s.date<=TODAY?s.date:TODAY,discipline:s.discipline,minutes:s.minutes,horseId:s.horseId||"",focus:g?goalType(g.title).label:s.title,intensity:s.intensity,goalId:s.goalId,planId:s.id,lessons:sessInfo(s).lessons.slice(0,1)})}); },
  estep:d=>{ const s = cur(); const v = +d.v; if(v<1) return; if(v>1 && !s.d.discipline){ s.step=1; s.err="Bitte wähle zuerst eine Trainingsart."; return render(); } s.err=""; s.step=Math.min(4,v); render(); },
  eset:(d)=>{ const s = cur(); let v = d.v; if(d.num) v = +v; s.d[d.k] = v; if(d.k==="goalId" && v && !s.d.conf){ const g=goal(v); s.d.conf=(g.checkins||[]).slice(-1)[0]?.v||3; }
    if(s.type==="addSession" && d.k==="kind"){ s.d.discipline = v==="boden" ? "Bodenarbeit" : v==="riderlab" ? "Rider Lab" : v==="eigenes" ? "Sonstiges" : "Dressur"; if(v==="riderlab") s.d.minutes=15; }
    if(d.next){ s.err=""; s.step=2; render(); } else render(true); },
  etoggle:d=>{ const s = cur(); const a = s.d[d.k] = s.d[d.k]||[]; const i = a.indexOf(d.v); i>=0 ? a.splice(i,1) : a.push(d.v); render(true); },
  rmMedia:d=>{ cur().d.photos.splice(+d.v,1); render(true); },
  saveEntry:()=>{
    const s = cur(), x = s.d;
    if(!x.discipline){ s.step=1; s.err="Bitte wähle eine Trainingsart."; return render(); }
    if(!x.date || x.date>TODAY){ s.step=2; s.err=""; render(); return toast("Bitte ein Datum bis heute wählen"); }
    const now = nowIso();
    const orig = D.entries.find(y=>y.id===s.editId) || {};
    const e = {...orig, id:s.editId||uid("e"), date:x.date, horseId:x.horseId||undefined, minutes:x.minutes?Math.max(1,Math.min(600,+x.minutes)):undefined, discipline:x.discipline,
      focus:(x.focus||"").trim()||undefined, intensity:x.intensity, mood:x.mood, wentWell:x.wentWell, difficult:x.difficult, learned:x.learned, nextTime:x.nextTime,
      coachTip:x.coachTip, note:x.note, goalId:x.goalId||undefined, planId:x.planId, lessons:x.lessons||[], photos:x.photos||[],
      createdAt:x.createdAt||now, updatedAt:now};
    const i = D.entries.findIndex(y=>y.id===e.id); i>=0 ? D.entries[i]=e : D.entries.push(e);
    if(x.planId){ const p = D.plan.find(y=>y.id===x.planId); if(p){ p.done=true; p.doneAt=e.date; p.entryId=e.id; } }
    if(x.goalId && x.conf){ const g = goal(x.goalId); g.checkins = (g.checkins||[]).filter(c=>c.date!==e.date).concat([{date:e.date,v:+x.conf}]).sort((a,b)=>a.date.localeCompare(b.date)); if(g.status==="neu") g.status="uebe"; }
    if(x.msOn && (x.msTitle||"").trim()) D.milestones.push({id:uid("m"),date:e.date,horseId:e.horseId,title:x.msTitle.trim(),entryId:e.id,createdAt:now});
    SHEETS = []; if(UI.view==="home"||UI.view==="journal"){ UI.view = UI.view==="home"?"home":"journal"; }
    render(); toast(s.editId ? "Eintrag aktualisiert" : "Eintrag gespeichert");
  },
  delEntry:d=>{ D.entries = D.entries.filter(e=>e.id!==d.id); D.plan.forEach(p=>{ if(p.entryId===d.id) delete p.entryId; }); D.milestones.forEach(m=>{ if(m.entryId===d.id) delete m.entryId; }); SHEETS=[]; render(); toast("Eintrag gelöscht"); },

  /* Planer */
  openSession:d=>openSheet("session",{id:d.id}),
  toggleDone:d=>{ const s = D.plan.find(x=>x.id===d.id); s.done=!s.done; s.doneAt = s.done?TODAY:undefined; render(true); toast(s.done?"Erledigt – stark!":"Wieder offen"); },
  toggleRest:d=>{ const i = D.rest.indexOf(d.v); i>=0 ? D.rest.splice(i,1) : D.rest.push(d.v); render(); },
  moveTo:d=>{ const s = D.plan.find(x=>x.id===d.id); s.date = d.v; UI.week = weekStart(d.v); render(true); toast(`Verschoben auf ${wdOf(d.v)}, ${fmt(d.v)}`); },
  delSession:d=>{ D.plan = D.plan.filter(x=>x.id!==d.id); SHEETS=[]; render(); toast("Einheit gelöscht"); },
  addSession:d=>{ if(cur()?.type==="quick") SHEETS.pop();
    if(d.edit){ const s = D.plan.find(x=>x.id===d.edit); return replaceSheet("addSession",{editId:s.id,d:JSON.parse(JSON.stringify(s))}); }
    openSheet("addSession",{d:sessionDraft(d.v||TODAY)}); },
  saveSession:()=>{ const s = cur(), x = s.d;
    if(!x.date){ s.err="Bitte ein Datum wählen."; return render(true); }
    if(!(x.title||"").trim()){ const g = goal(x.goalId); x.title = x.kind==="riderlab" ? "Rider Lab" : (g ? goalType(g.title).label : x.discipline) + (x.kind==="boden"?" vom Boden":""); }
    if(x.kind==="riderlab" && !(x.rl||[]).length){ const g = goal(x.goalId); x.rl = [(g?goalType(g.title):GT[GT.length-1]).rl[0]]; }
    const item = {...x, id:s.editId||uid("s"), minutes:+x.minutes||30, createdAt:x.createdAt||nowIso()};
    if(x.kind==="riderlab"||x.kind==="eigenes"){ delete item.horseId; }
    const i = D.plan.findIndex(y=>y.id===item.id); i>=0 ? D.plan[i]=item : D.plan.push(item);
    UI.week = weekStart(item.date); UI.pday = item.date; SHEETS=[]; if(UI.view!=="planner"){ UI.view="planner"; UI.ptab="week"; } render(); toast(s.editId?"Einheit aktualisiert":"Einheit geplant"); },
  exToPlan:d=>{ const e = exById(d.id); SHEETS.pop(); openSheet("addSession",{d:sessionDraft(TODAY,{ex:[e.id],title:e.name,kind:e.cat==="boden"?"boden":"reiten",discipline:e.cat==="boden"?"Bodenarbeit":e.cat==="stangen"?"Stangenarbeit":e.cat==="gelaende"?"Gelände":"Dressur",minutes:Math.max(30,e.min+25)})}); },
  openEx:d=>openSheet("exercise",{id:d.id}),
  planRules:d=>openSheet("rules",{id:d.id}),
  delPlan:d=>{ D.plan = D.plan.filter(x=>x.series!==d.id || x.done); D.plans = D.plans.filter(p=>p.id!==d.id); SHEETS=[]; render(); toast("Plan entfernt"); },

  /* Ziele */
  openGoal:d=>openSheet("goal",{id:d.id}),
  goalStatus:d=>{ const g = goal(d.id); g.status = d.v; g.achievedAt = d.v==="geschafft" ? TODAY : undefined; render(true); if(d.v==="geschafft") toast("Glückwunsch – Ziel geschafft!"); },
  goalCheckin:d=>{ const g = goal(d.id), v = cur().cv || (g.checkins||[]).slice(-1)[0]?.v || 3;
    g.checkins = (g.checkins||[]).filter(c=>c.date!==TODAY).concat([{date:TODAY,v}]); if(g.status==="neu") g.status="uebe"; cur().cv=null; render(true); toast("Einschätzung festgehalten"); },
  goalForm:d=>{ if(cur()?.type==="quick") SHEETS.pop(); if(d.id){ const g = goal(d.id); return replaceSheet("goalForm",{editId:g.id,d:{...g}}); } openSheet("goalForm",{d:{horseId:activeHorse()?.id,startDate:TODAY}}); },
  saveGoal:()=>{ const s = cur(), x = s.d; if(!(x.title||"").trim()){ s.err="Bitte gib deinem Ziel einen Namen."; return render(true); }
    if(x.targetDate && x.targetDate < (x.startDate||TODAY)){ s.err="Das Zieldatum liegt vor dem Startdatum."; return render(true); }
    const g = {...x, id:s.editId||uid("g"), title:x.title.trim(), status:x.status||"neu", startDate:x.startDate||TODAY, checkins:x.checkins||[], createdAt:x.createdAt||nowIso()};
    const i = D.goals.findIndex(y=>y.id===g.id); i>=0 ? D.goals[i]=g : D.goals.push(g);
    SHEETS=[]; UI.view="planner"; UI.ptab="goals"; render(); openSheet("goal",{id:g.id}); toast(s.editId?"Ziel aktualisiert":"Ziel angelegt"); },
  delGoal:d=>{ D.goals = D.goals.filter(g=>g.id!==d.id); D.entries.forEach(e=>{ if(e.goalId===d.id) delete e.goalId; }); D.plan.forEach(p=>{ if(p.goalId===d.id) delete p.goalId; }); D.coach.forEach(c=>{ if(c.goalId===d.id) delete c.goalId; }); SHEETS=[]; render(); toast("Ziel gelöscht"); },

  /* Meilensteine */
  openMs:d=>openSheet("msView",{id:d.id}),
  msForm:d=>{ if(cur()?.type==="quick") SHEETS.pop(); if(d.id){ const m = D.milestones.find(x=>x.id===d.id); return replaceSheet("msForm",{editId:m.id,d:{...m}}); }
    openSheet("msForm",{d:{date:TODAY,horseId:d.horse!==undefined?d.horse:activeHorse()?.id,title:d.title||""}}); },
  saveMs:()=>{ const s = cur(), x = s.d; if(!(x.title||"").trim()){ s.err="Bitte beschreibe kurz, was du geschafft hast."; return render(true); }
    const m = {...x, id:s.editId||uid("m"), title:x.title.trim(), horseId:x.horseId||undefined, createdAt:x.createdAt||nowIso()};
    const i = D.milestones.findIndex(y=>y.id===m.id); i>=0 ? D.milestones[i]=m : D.milestones.push(m);
    SHEETS=[]; render(); toast("Meilenstein gespeichert"); },
  delMs:d=>{ D.milestones = D.milestones.filter(m=>m.id!==d.id); SHEETS=[]; render(); toast("Meilenstein gelöscht"); },

  /* Pferde */
  horseForm:d=>{ if(d.id){ const h = horse(d.id); return openSheet("horseForm",{editId:h.id,d:{...h}}); } openSheet("horseForm",{d:{tone:["#7d8a6a","#3e4a35"]}}); },
  saveHorse:()=>{ const s = cur(), x = s.d; if(!(x.name||"").trim()){ s.err="Bitte gib den Namen deines Pferdes ein."; return render(true); }
    const y = +x.birthYear; if(x.birthYear && (y<1980 || y>new Date().getFullYear())){ s.err="Bitte ein gültiges Geburtsjahr eingeben."; return render(true); }
    const h = {...x, id:s.editId||uid("h"), name:x.name.trim(), birthYear:x.birthYear?y:undefined, createdAt:x.createdAt||nowIso()};
    const i = D.horses.findIndex(z=>z.id===h.id); i>=0 ? D.horses[i]=h : D.horses.push(h);
    if(!s.editId) D.profile.activeHorseId = h.id;
    SHEETS=[]; UI.view="horse"; UI.horseId=h.id; render(); toast(s.editId?"Profil gespeichert":`${h.name} ist angelegt`); },

  delHorse:d=>{ const hid = d.id; D.horses = D.horses.filter(h=>h.id!==hid);
    for(const k of ["entries","goals","plan","milestones","plans","coach"]) D[k].forEach(x=>{ if(x.horseId===hid) delete x.horseId; });
    if(D.profile.activeHorseId===hid) D.profile.activeHorseId = D.horses[0]?.id;
    if(UI.scope===hid) UI.scope = "all";
    SHEETS=[]; UI.view="journal"; UI.jtab="horses"; render(); toast("Pferd gelöscht"); },

  /* Plan-Builder */
  openWizard:d=>{ if(cur()?.type==="quick") SHEETS.pop();
    const g = d.goal ? goal(d.goal) : null, h = g?.horseId ? horse(g.horseId) : activeHorse();
    const p = {horseId:h?.id, goalId:g?.id||null, goalTitle:g?.title||"", perWeek:3, weeks:4, types:["Dressur"], level:mapLevel(D.profile.level), startMode:"next", riderlab:true};
    SHEETS = SHEETS.filter(x=>x.type!=="goal"); openSheet("wizard",{step: g ? 3 : 1, p}); },
  wset:d=>{ const s = cur(); let v = d.v; if(d.num) v = +v; s.p[d.k] = v; if(d.k==="horseId"){ const g = goal(s.p.goalId); if(g && g.horseId && g.horseId!==v){ s.p.goalId=null; s.p.goalTitle=""; } }
    if(d.next){ s.step++; render(); } else render(true); },
  wgoal:d=>{ const s = cur(), g = goal(d.v); s.p.goalId=g.id; s.p.goalTitle=g.title; s.err=""; s.step=3; render(); },
  wnewgoal:d=>{ const s = cur(); s.p.goalId=null; s.p.goalTitle=d.v; s.err=""; render(true); },
  wnum:d=>{ const s = cur(); s.p[d.k] = Math.max(1,Math.min(5,s.p[d.k]+ +d.v)); render(true); },
  wtype:d=>{ const s = cur(), t = s.p.types, i = t.indexOf(d.v); if(d.v==="Dressur") return toast("Dressurarbeit ist die Basis jedes Plans"); i>=0 ? t.splice(i,1) : t.push(d.v); render(true); },
  wstep:d=>{ const s = cur(), v = +d.v;
    if(v>1 && !s.p.horseId){ s.step=1; return render(); }
    if(v>2 && !(s.p.goalTitle||"").trim()){ s.step=2; s.err="Bitte wähle ein Ziel oder gib ein neues ein."; return render(); }
    s.err="";
    if(v===7){ const start = s.p.startMode==="this" ? addDays(TODAY,1) : addDays(weekStart(TODAY),7);
      s.preview = buildPlan({...s.p, start: s.p.startMode==="this" ? weekStart(addDays(TODAY,1)) : start});
      if(s.p.startMode==="this") s.preview.sessions = s.preview.sessions.filter(x=>x.date>=start);
      s.preview.meta.start = s.p.startMode==="this" ? weekStart(addDays(TODAY,1)) : start; }
    s.step = Math.max(1,Math.min(7,v)); render(); },
  applyPlan:()=>{ const s = cur(), r = s.preview; let gid = s.p.goalId;
    if(!gid){ gid = uid("g"); D.goals.push({id:gid,title:s.p.goalTitle.trim(),horseId:s.p.horseId,status:"uebe",startDate:TODAY,checkins:[],createdAt:nowIso()}); r.sessions.forEach(x=>x.goalId=gid); }
    D.plan.push(...r.sessions); D.plans.push({id:r.series,...r.meta,goalId:gid,rules:r.rules,createdAt:nowIso()});
    SHEETS=[]; UI.view="planner"; UI.ptab="week"; UI.week = weekStart(r.sessions[0]?.date||TODAY); render(); toast(`${r.sessions.length} Einheiten eingeplant`); },
};

/* ---------- Ereignisse (nur innerhalb des Riding Space) ---------- */
function onClick(e){
  const t = e.target.closest("[data-a]"); if(!t || !ROOT.contains(t)) return;
  if(t.tagName==="INPUT") return;
  const f = A[t.dataset.a]; if(f){ e.preventDefault(); f(t.dataset, t); }
}
function onInput(e){
  const t = e.target, s = cur();
  if(t.dataset.live==="libq"){ UI.lib.q = t.value; const q = t.value.trim().toLowerCase(); ROOT.querySelector("#liblist").innerHTML = libList(EX.filter(x=>(UI.lib.cat==="all"||x.cat===UI.lib.cat)&&(!q||(x.name+" "+x.goal+" "+catLabel(x.cat)).toLowerCase().includes(q)))); return; }
  if(t.dataset.live==="coachq"){ UI.c.q = t.value; ROOT.querySelector("#coachhits").innerHTML = coachHits(); return; }
  if(t.dataset.live==="goalConf" && s){ s.cv = +t.value; const l = ROOT.querySelector("#gcL"); if(l) l.textContent = CONF[s.cv]; return; }
  if(!t.dataset.f || !s) return;
  const obj = s.type==="wizard" ? s.p : s.d; if(!obj) return;
  const k = t.dataset.f;
  if(t.type==="checkbox"){ obj[k] = t.checked; render(true); return; }
  if(k==="goalTitleNew"){ s.p.goalTitle = t.value; s.p.goalId = null; return; }
  obj[k] = t.type==="number" || t.type==="range" ? (t.value===""? "" : +t.value) : t.value;
  if(k==="conf"){ const l = ROOT.querySelector("#confL"); if(l) l.innerHTML = `<b>${CONF[obj.conf]}</b>`; }
}
function onChange(e){
  const t = e.target, s = cur();
  if(t.dataset.f && t.type==="date" && s){ const obj = s.type==="wizard"?s.p:s.d; obj[t.dataset.f]=t.value; render(true); }
  if(t.dataset.f==="title" && s && s.type==="goalForm") render(true);
  if(t.dataset.file) handleFiles(t);
}
function onKey(e){ if(e.key==="Escape" && SHEETS.length) closeSheet(); }
/* Ziehen & Ablegen im Wochenplan (Desktop) */
function onDragStart(e){ const t = e.target.closest?.("[data-drag]"); if(t){ e.dataTransfer.setData("text/plain", t.dataset.drag); e.dataTransfer.effectAllowed="move"; } }
function onDragOver(e){ const d = e.target.closest?.("[data-drop]"); if(d){ e.preventDefault(); ROOT.querySelectorAll(".day.over").forEach(x=>x!==d&&x.classList.remove("over")); d.classList.add("over"); } }
function onDragLeave(e){ const d = e.target.closest?.("[data-drop]"); if(d && !d.contains(e.relatedTarget)) d.classList.remove("over"); }
function onDrop(e){ const d = e.target.closest?.("[data-drop]"); if(!d) return; e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); const s = D.plan.find(x=>x.id===id); if(s && s.date!==d.dataset.drop){ s.date = d.dataset.drop; render(); toast(`Verschoben auf ${wdOf(s.date)}, ${fmt(s.date)}`); } else d.classList.remove("over"); }

/* Bilder verkleinern (wie photo.ts der App), Videos in der Vorschau nur als Verweis */
function shrink(file, max=900){ return new Promise((res,rej)=>{ const r = new FileReader(); r.onload = ()=>{ const img = new Image(); img.onload = ()=>{ const k = Math.min(1, max/Math.max(img.width,img.height)); const c = document.createElement("canvas"); c.width = Math.round(img.width*k); c.height = Math.round(img.height*k); c.getContext("2d").drawImage(img,0,0,c.width,c.height); res(c.toDataURL("image/jpeg",.8)); }; img.onerror = rej; img.src = r.result; }; r.onerror = rej; r.readAsDataURL(file); }); }
async function handleFiles(input){
  const files = [...input.files]; const kind = input.dataset.file;
  try{
    if(kind==="entryMedia"){ const s = cur(); s.d.photos = s.d.photos||[]; for(const f of files){ if(s.d.photos.length>=4) break; if(!f.type.startsWith("image/")) continue; if(f.size>25e6){ toast("Bild ist zu groß"); continue; } s.d.photos.push(await shrink(f,1000)); } render(true); }
    if(kind==="formPhoto"){ const f = files[0]; if(f && f.type.startsWith("image/")){ cur().d.photo = await shrink(f,700); render(true); } }
    if(kind==="horsePhoto"){ const f = files[0]; if(f && f.type.startsWith("image/")){ horse(input.dataset.id).photo = await shrink(f,900); render(); toast("Foto gespeichert"); } }
  }catch(err){ toast("Datei konnte nicht gelesen werden"); }
}

/* ---------- Rider Coach (seit 14.11.2026) ---------- */
const FEEDBACK = [{id:"unveraendert",l:"Problem unverändert"},{id:"leicht",l:"Leichte Verbesserung"},{id:"deutlich",l:"Deutliche Verbesserung"},{id:"geloest",l:"Aktuell nicht mehr vorhanden"}];
const fbLabel = id => (FEEDBACK.find(f=>f.id===id)||{}).l || "";
UI.c = {screen:"home", pid:null, answers:{}, order:[], caseId:null, q:"", cat:null, confirm:false};
const coachCase = id => (D.coach||[]).find(c=>c.id===id);

const CAT_STYLE = {sitz:["body","#4d6552"],hilfen:["bolt","#a07a4a"],"trab-galopp":["spark","#33473a"],biegung:["move","#5d7f86"],dressur:["target","#7d6a8a"],gelaende:["leaf","#7f9a6e"]};
const RINGS = `<svg class="cx-rings" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="#fff" stroke-opacity=".35"><circle cx="100" cy="100" r="96" stroke-dasharray="2 8"/><circle cx="100" cy="100" r="74"/><circle cx="100" cy="100" r="52" stroke-dasharray="14 10"/><circle cx="100" cy="100" r="30"/></g><circle cx="100" cy="4" r="4" fill="#c2964f"/></svg>`;
function coachHits(){
  const q = UI.c.q.trim();
  if(!q){
    const ready = ["cp-22","cp-06","cp-19","cp-29","cp-45"].map(id=>coach.problem(id)).filter(p=>p&&p.ready);
    return `<p class="tiny" style="margin:14px 0 0;color:rgba(255,255,255,.7)">Häufig gesucht</p><div class="chips" style="margin-top:8px">${ready.map(p=>`<button class="cx-glass" data-a="cstart" data-v="${p.id}">${esc(p.title)}</button>`).join("")}</div>`;
  }
  const hits = coach.search(q);
  if(!hits.length) return `<div class="cx-hits"><p class="small muted" style="margin:10px 12px">Nichts gefunden. Versuch es mit anderen Worten oder stöbere in den Kategorien.</p></div>`;
  return `<div class="cx-hits">${hits.map(h=>problemRow(h.problem)).join("")}</div>`;
}
function vCoach(){
  if(UI.c.screen==="run") return vCoachRun();
  if(UI.c.screen==="result") return vCoachResult();
  if(UI.c.screen==="case") return vCoachCase();
  const cats = coach.categories(), all = coach.problems();
  const cases = [...(D.coach||[])].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
  const goals = D.goals.filter(g=>g.status!=="geschafft");
  const FBC = {unveraendert:"#a85a3d",leicht:"#c2964f",deutlich:"#7f9a6e",geloest:"#33473a"};
  return `<div class="rs-page stack-lg">
    <section class="cx-hero">${RINGS}
      <span class="cx-chip">${ic("target",14)} Rider Coach</span>
      <h1>Was möchtest du heute verbessern?</h1>
      <p style="margin:10px 0 0;max-width:30em">Dein persönlicher Rider Coach hilft dir, Reitprobleme besser zu verstehen und passende Übungen zu finden.</p>
      <label class="cx-search">${ic("search",20)}<span class="sr">Problem suchen</span><input type="search" data-live="coachq" placeholder="Beschreib dein Problem …" value="${esc(UI.c.q)}"></label>
      <div id="coachhits">${coachHits()}</div>
      <div class="cx-steps" aria-label="So funktioniert der Coach">${[["search","Entdecken"],["info","Verstehen"],["target","Ursachen"],["bolt","Üben"],["book","Festhalten"]].map(([i,l])=>`<div><i>${ic(i,15)}</i>${l}</div>`).join("")}</div>
    </section>
    <section><div class="sec-head"><h2>Problemkategorien</h2><span class="small muted">${all.length} Probleme</span></div>
      <div class="cx-cats">${cats.map(c=>{ const ps = all.filter(p=>p.category===c.id), r = ps.filter(p=>p.ready).length, [icn,col] = CAT_STYLE[c.id]||["target","#33473a"];
        return `<button class="cx-cat ${UI.c.cat===c.id?"on":""}" data-a="ccat" data-v="${c.id}" aria-expanded="${UI.c.cat===c.id}"><span class="blob" style="background:${col}"></span><div class="ico" style="background:${col};color:${col}"><span style="color:#fff">${ic(icn,20)}</span></div><b>${esc(c.title)}</b><div class="cnt">${ps.length} Probleme${r?` · <span class="ready">${r} bereit</span>`:""}</div></button>`; }).join("")}</div>
      ${UI.c.cat?`<div class="cx-panel">${all.filter(p=>p.category===UI.c.cat).sort((a,b)=>(b.ready?1:0)-(a.ready?1:0)).map(problemRow).join("")}</div>`:""}
    </section>
    <section><div class="sec-head"><h2>Meine Coaching-Fälle</h2>${cases.length?`<span class="small muted">${cases.length}</span>`:""}</div>
      ${cases.length?cases.map(c=>{ const p = coach.problem(c.problemId), fb = (c.feedback||[]).slice(-1)[0], h = horse(c.horseId);
        return `<button class="cx-case" data-a="ccase" data-v="${c.id}"><span class="st" style="background:${fb?FBC[fb.v]:"linear-gradient(160deg,#3b5243,#26342a)"}">${ic(fb&&fb.v==="geloest"?"check":"target",20)}</span><span style="flex:1;min-width:0"><b style="display:block">${esc(p?.title||"Coaching-Fall")}</b><span class="small muted">${fb?esc(fbLabel(fb.v)):"Neu"}${h?" · "+esc(h.name):""} · ${fmt(c.createdAt.slice(0,10))}</span></span>${ic("right",18)}</button>`; }).join("")
        :`<div class="card flat" style="text-align:center;padding:22px"><p class="small muted" style="margin:0">Noch keine Coaching-Fälle. Such oben nach deinem Problem – das Ergebnis kannst du speichern.</p></div>`}
    </section>
    ${goals.length?`<section><div class="sec-head"><h2>Meine Trainingsziele</h2></div><div class="chips">${goals.map(g=>`<button class="chip" data-a="openGoal" data-id="${g.id}">${ic("flag",14)} ${esc(g.title)}</button>`).join("")}</div></section>`:""}
    <div class="note">${ic("shield",18)}<span>Feste, nachvollziehbare Regeln – ohne KI. Der Rider Coach ersetzt weder deine Reitlehrkraft noch den Tierarzt.</span></div>
  </div>`;
}
function vCoachRun(){
  const pid = UI.c.pid, p = coach.problem(pid), c = coach.content(pid);
  if(!p || !c){ UI.c.screen = "home"; return vCoach(); }
  const q = coach.next(pid, UI.c.answers);
  if(!q){ UI.c.screen = "result"; return vCoachResult(); }
  const pr = coach.progress(pid, UI.c.answers), safety = q.id.startsWith("s-");
  return `<div class="rs-page">
    <div class="cx-top"><button class="iconbtn" data-a="cback" aria-label="Zurück">${ic("left")}</button><span class="small" style="font-weight:600;color:var(--ink2)">Schritt ${pr.done+1} von ${pr.total}</span><button class="iconbtn" data-a="cexit" aria-label="Coaching beenden">${ic("x")}</button></div>
    <div class="cx-seg" role="progressbar" aria-valuemin="0" aria-valuemax="${pr.total}" aria-valuenow="${pr.done}">${Array.from({length:pr.total},(_,i)=>`<span class="${i<pr.done?"done":i===pr.done?"now":""}"></span>`).join("")}</div>
    <p class="eyebrow">${esc(p.title)}</p>
    ${pr.done===0?`<p class="muted" style="margin:0 0 16px">${esc(c.intro)}</p>`:""}
    <div class="cx-q">
      ${safety?`<span class="cx-safety">${ic("shield",15)} Sicherheits-Check · ${pr.done+1}/3</span>`:""}
      <h2>${esc(q.text)}</h2>${q.help?`<p class="small muted" style="margin:10px 0 0">${esc(q.help)}</p>`:""}
      <div class="cx-opts">${q.options.map((o,i)=>`<button class="cx-opt" data-a="cans" data-q="${q.id}" data-v="${o.id}"><span class="lt">${"ABCDEF"[i]}</span><span style="flex:1">${esc(o.label)}</span>${ic("right",16)}</button>`).join("")}</div>
      ${safety?`<p class="tiny muted" style="margin-top:16px">Die Gesundheit deines Pferdes geht vor – danach geht es um dein Problem.</p>`:""}
    </div>
  </div>`;
}
function vCoachResult(){
  const p = coach.problem(UI.c.pid), c = coach.content(UI.c.pid), r = coachResultNow();
  if(!r){ UI.c.screen = "run"; return vCoachRun(); }
  const saved = UI.c.caseId && coachCase(UI.c.caseId);
  const lvl = r.health && r.health.level;
  const ST = {ok:"Eingegrenzt",unklar:"Nicht eindeutig",abklaeren:"Abklären",stopp:"Erst abklären"};
  const H = (L,t,extra="") => `<div class="cx-h"><span class="L">${L}</span><h2>${t}</h2>${extra}</div>`;
  return `<div class="rs-page stack-lg cx-res">
    <section class="cx-hero">${RINGS}
      <div class="row between"><button class="cx-glass" data-a="cexit" aria-label="Zurück">${ic("left",16)} Zurück</button><span class="cx-chip">${ic("info",13)} Regelbasiert</span></div>
      <p class="eyebrow" style="color:rgba(255,255,255,.7);margin-top:18px">Dein Rider Coach Ergebnis</p>
      <h1 style="margin-top:4px;font-size:29px">${esc(p.title)}</h1>
      <div class="cx-stats"><div><b>${r.causes.length}</b><span>mögliche Ursachen</span></div><div><b>${r.exercises.length}</b><span>Übungen</span></div><div><b style="font-size:16px;padding-top:6px">${ST[r.status]}</b><span>Einordnung</span></div></div>
    </section>
    ${r.health?`<section class="cx-warn ${lvl==="stopp"?"":"amber"}"><h2 style="font-size:20px;display:flex;gap:8px;align-items:center;color:inherit">${ic("shield",22)} ${lvl==="stopp"?"Bitte zuerst gesundheitlich abklären":"Bitte abklären lassen"}</h2>
      <p class="small" style="margin:8px 0 0">${lvl==="stopp"?"Du hast Hinweise auf Schmerzen oder Unwohlsein angegeben. Training kann das verschlimmern.":"Einige Angaben können auch körperliche Ursachen oder ein Ausrüstungsproblem haben."} Der Rider Coach stellt keine Diagnose.</p>
      ${r.health.reasons.length?`<div class="cx-tags">${r.health.reasons.map(x=>`<span style="background:rgba(255,255,255,.6);color:inherit">${esc(x)}</span>`).join("")}</div>`:""}
      <ul class="small" style="margin:12px 0 0;padding-left:18px">${r.health.checkWhen.slice(0,4).map(t=>`<li>${esc(t)}</li>`).join("")}</ul></section>`:""}
    ${r.summary.length?`<section>${H("A","Deine Situation")}<div class="card flat"><div class="cx-tags" style="margin:0">${r.summary.map(s=>`<span style="background:#f1ebde;color:var(--ink2);font-size:12.5px;padding:6px 11px">${esc(s)}</span>`).join("")}</div></div></section>`:""}
    <section>${H("B","Mögliche Ursachen",`<span class="badge-subj">keine Diagnose</span>`)}
      ${r.causes.length?r.causes.map((x,i)=>`<div class="cx-cause" style="animation:rsfade .4s var(--ease) ${i*60}ms both"><span class="n">${p2(i+1)}</span><h3 style="font-size:16px">${esc(x.title)}</h3><p class="small" style="margin:6px 0 0;color:var(--ink2)">${esc(x.text)}</p><div class="cx-tags">${x.because.map(b=>`<span>${ic("check",11,2.4)} ${esc(b)}</span>`).join("")}</div></div>`).join("")
        :`<div class="note">${ic("info",18)}<span>Aus deinen Antworten lässt sich keine Ursache zuverlässig eingrenzen.</span></div>`}
      ${r.notes.map(n=>`<div class="note" style="margin-top:10px">${ic("info",18)}<span>${esc(n)}</span></div>`).join("")}
    </section>
    <section>${H("C","Was du verstehen solltest")}<div class="cx-learn">${r.understand.map(t=>`<p style="margin:0 0 10px;color:var(--ink2)">${esc(t)}</p>`).join("")}</div>
      <div style="margin-top:10px">${r.lessons.filter(l=>HOST&&HOST.links[l]).map(linkCard).join("")}</div></section>
    ${r.exercises.length?`<section>${H("D","Geeignete Übungen")}
      ${r.exercises.map((id,i)=>{ const e = exById(id); return `<button class="cx-ex" data-a="openEx" data-id="${e.id}"><span class="num">${i+1}</span><span style="flex:1;min-width:0"><b style="font-size:15.5px">${esc(e.name)}</b><br><span class="small muted">${esc(e.goal)}</span><span class="cx-meta"><span>${catLabel(e.cat)}</span><span>ca. ${e.min} min</span><span>${LEVELS[e.level-1]}</span><span>Anleitung & Abbruch</span></span></span>${ic("right",18)}</button>`; }).join("")}
      ${c.mistakes.length?`<div class="blk"><h3>${ic("alert",18)} Typische Fehler beim Üben</h3><ul>${c.mistakes.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>`:""}
      <div class="blk"><h3>${ic("shield",18)} Sicherheit</h3><ul>${c.safety.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div></section>`:""}
    ${r.riderLab.filter(x=>HOST&&HOST.links[x]).length?`<section>${H(ic("body",15),"Ohne Pferd üben")}${r.riderLab.filter(x=>HOST.links[x]).map(linkCard).join("")}</section>`:""}
    <section>${H("E","Dein nächster Schritt")}
      <p class="small muted" style="margin:0">Speichere das Ergebnis als Coaching-Fall, plane die Übungen ein und halte nach dem Training im Tagebuch fest, was funktioniert hat.</p>
      <button class="btn ghost block" style="margin-top:12px" data-a="crestart">${ic("edit",18)} Antworten ändern</button>
      <div class="cx-bar">
        ${saved?`<button class="btn soft" data-a="ccase" data-v="${saved.id}">${ic("check",18)} Fall öffnen</button>`:`<button class="btn ghost" data-a="csave">${ic("star",18)} Speichern</button>`}
        ${r.planAllowed&&r.exercises.length?`<button class="btn" data-a="cplan">${ic("cal",18)} In meinen Plan</button>`:""}
      </div></section>
  </div>`;
}

function problemRow(p){
  return p.ready
    ? `<button class="linkcard tap" data-a="cstart" data-v="${p.id}"><span class="k ex">${ic("target",18)}</span><span style="flex:1"><b>${esc(p.title)}</b></span>${ic("right",16)}</button>`
    : `<div class="linkcard" style="opacity:.6"><span class="k" style="background:#efe8da;color:var(--ink3)">${ic("clock",18)}</span><span style="flex:1">${esc(p.title)}</span><span class="pill ghost">in Vorbereitung</span></div>`;
}
function coachResultNow(){ return coach.evaluate(UI.c.pid, UI.c.answers); }
function vCoachCase(){
  const k = coachCase(UI.c.caseId); if(!k){ UI.c.screen = "home"; return vCoach(); }
  const p = coach.problem(k.problemId), r = coach.evaluate(k.problemId, k.answers), h = horse(k.horseId), g = goal(k.goalId);
  const sess = g ? D.plan.filter(s=>s.goalId===g.id) : [], done = sess.filter(s=>s.done).length, next = sess.filter(s=>!s.done && s.date>=TODAY).sort((a,b)=>a.date.localeCompare(b.date))[0];
  const refl = g ? sortE(D.entries.filter(e=>e.goalId===g.id)) : [];
  const fbs = [...(k.feedback||[])].reverse();
  return `<div class="rs-page stack-lg">
    <div class="row between"><button class="iconbtn" data-a="cexit" aria-label="Zurück">${ic("left")}</button><span class="small muted">${h?esc(h.name)+" · ":""}seit ${fmt(k.createdAt.slice(0,10))}</span></div>
    <div><p class="eyebrow">Mein Coaching-Fall</p><h1>${esc(p?.title||"Coaching-Fall")}</h1></div>
    <section class="card"><div class="row between"><h3>Wie hat sich das Problem entwickelt?</h3><span class="badge-subj">Selbsteinschätzung</span></div>
      <div class="cx-fb">${FEEDBACK.map((f,i)=>{ const last = (k.feedback||[]).slice(-1)[0]; return `<button class="${last&&last.v===f.id?"on":""}" data-a="cfb" data-v="${f.id}"><span class="scale">${[0,1,2,3].map(j=>`<i style="${j<=i?`background:${["#a85a3d","#c2964f","#7f9a6e","#33473a"][i]}`:""}"></i>`).join("")}</span>${esc(f.l)}</button>`; }).join("")}</div>
      <input class="input" id="cfbnote" style="margin-top:10px" placeholder="Notiz (optional), z. B. „links schon ruhiger“" maxlength="300">
      ${fbs.length?`<div style="margin-top:12px">${fbs.slice(0,6).map(f=>`<div class="ruleli">${ic("spark",18)}<span style="flex:1"><b style="color:var(--ink)">${esc(fbLabel(f.v))}</b>${f.note?` – ${esc(f.note)}`:""}<br><span class="tiny">${fmtLong(f.date)}</span></span></div>`).join("")}</div>`:""}
      <p class="tiny muted" style="margin:10px 0 0">Nur für deine persönliche Dokumentation – keine Leistungsbewertung.</p></section>
    ${r?`<section><div class="sec-head"><h2>Ergebnis</h2><button class="link" data-a="cview">Ganz ansehen ${ic("right",14)}</button></div>
      <div class="card flat">${r.health?`<p class="small" style="margin:0 0 8px;color:var(--rust)"><b>${r.health.level==="stopp"?"Gesundheitlich abklären lassen":"Abklärung empfohlen"}</b></p>`:""}
      ${r.causes.length?`<p class="small muted" style="margin:0">Mögliche Ursachen</p><ul style="margin:4px 0 0;padding-left:18px">${r.causes.map(x=>`<li>${esc(x.title)}</li>`).join("")}</ul>`:`<p class="small muted" style="margin:0">Keine zuverlässige Eingrenzung</p>`}</div>
      <div style="margin-top:10px">${r.exercises.map(id=>{ const e = exById(id); return `<button class="linkcard" data-a="openEx" data-id="${e.id}"><span class="k ex">${ic("bolt",18)}</span><span style="flex:1"><b>${esc(e.name)}</b></span>${lvBars(e.level)}</button>`; }).join("")}</div></section>`:""}
    <section><div class="sec-head"><h2>Trainingsziel & Plan</h2></div>
      ${g?`<button class="linkcard" data-a="openGoal" data-id="${g.id}"><span class="k ex">${ic("flag",18)}</span><span style="flex:1"><b>${esc(g.title)}</b><br><span class="small muted">${done}/${sess.length} Einheiten erledigt</span></span>${ic("right",16)}</button>
        ${next?`<button class="linkcard" data-a="openSession" data-id="${next.id}"><span class="k ex">${ic("cal",18)}</span><span style="flex:1"><span class="tiny muted">Nächste Einheit · ${wdOf(next.date)}, ${fmt(next.date)}</span><br><b>${esc(next.title)}</b></span>${ic("right",16)}</button>`:""}`
        : r&&r.planAllowed&&r.exercises.length?`<button class="btn block" data-a="cplan">${ic("cal",18)} In meinen Trainingsplan übernehmen</button>`:`<p class="small muted">Noch kein Trainingsplan.</p>`}</section>
    <section><div class="sec-head"><h2>Frühere Reflexionen</h2></div>${refl.length?refl.slice(0,3).map(e=>entryCard(e,true)).join(""):`<p class="small muted">Noch keine Tagebucheinträge zu diesem Ziel. Nach einer geplanten Einheit tippst du auf „Training eintragen“.</p>`}</section>
    <section class="row wrap" style="gap:8px"><button class="btn sm ghost" data-a="crenew">${ic("edit",15)} Neu einschätzen</button>
      ${UI.c.confirm?`<button class="btn sm danger" data-a="cdel">Fall wirklich löschen</button><button class="btn sm ghost" data-a="cconfirm" data-v="">Abbrechen</button>`:`<button class="btn sm ghost" data-a="cconfirm" data-v="1">${ic("trash",15)} Fall löschen</button>`}</section>
    <p class="tiny muted">Ziel, Plan und Tagebucheinträge bleiben beim Löschen des Falls erhalten.</p>
  </div>`;
}
function saveCoachCase(){
  const now = nowIso();
  let k = UI.c.caseId && coachCase(UI.c.caseId);
  if(k){ k.answers = {...UI.c.answers}; k.updatedAt = now; return k; }
  k = {id:uid("cc"), problemId:UI.c.pid, horseId:activeHorse()?.id, answers:{...UI.c.answers}, feedback:[], createdAt:now, updatedAt:now};
  D.coach.push(k); UI.c.caseId = k.id; return k;
}
const COACH_ACTIONS = {
  cstart:d=>{ const p = coach.problem(d.v); if(!p || !p.ready) return toast("Dieses Problem ist noch in Vorbereitung");
    UI.view="coach"; UI.c = {...UI.c, screen:"run", pid:p.id, answers:{}, order:[], caseId:null, confirm:false}; SHEETS=[]; window.scrollTo({top:0}); render(); },
  ccat:d=>{ UI.c.cat = UI.c.cat===d.v ? null : d.v; render(); },
  cans:(d,t)=>{ if(t && !t.classList.contains("picked")){ t.classList.add("picked"); return setTimeout(()=>A.cans(d,null),170); } UI.c.answers = coach.clean(UI.c.pid, {...UI.c.answers, [d.q]:d.v}); UI.c.order = UI.c.order.filter(x=>x!==d.q).concat([d.q]).filter(x=>UI.c.answers[x]!==undefined);
    if(!coach.next(UI.c.pid, UI.c.answers)){ UI.c.screen = "result"; if(UI.c.caseId){ const k = coachCase(UI.c.caseId); if(k){ k.answers = {...UI.c.answers}; k.updatedAt = nowIso(); } } }
    window.scrollTo({top:0}); render(); },
  cback:()=>{ const last = UI.c.order.pop(); if(!last){ UI.c.screen = UI.c.caseId ? "case" : "home"; return render(); } const a = {...UI.c.answers}; delete a[last]; UI.c.answers = coach.clean(UI.c.pid, a); render(); },
  cexit:()=>{ UI.c.screen = UI.c.screen==="result" && UI.c.caseId ? "case" : "home"; if(UI.c.screen==="home"){ UI.c.caseId = null; } window.scrollTo({top:0}); render(); },
  crestart:()=>{ UI.c.screen = "run"; UI.c.order = []; UI.c.answers = {}; window.scrollTo({top:0}); render(); },
  crenew:()=>{ const k = coachCase(UI.c.caseId); UI.c.pid = k.problemId; UI.c.screen = "run"; UI.c.answers = {}; UI.c.order = []; window.scrollTo({top:0}); render(); },
  csave:()=>{ saveCoachCase(); render(); toast("Coaching-Ergebnis gespeichert"); },
  ccase:d=>{ const k = coachCase(d.v); if(!k) return; UI.view="coach"; UI.c = {...UI.c, screen:"case", caseId:k.id, pid:k.problemId, answers:{...k.answers}, confirm:false}; SHEETS=[]; window.scrollTo({top:0}); render(); },
  cview:()=>{ UI.c.screen = "result"; window.scrollTo({top:0}); render(); },
  cconfirm:d=>{ UI.c.confirm = !!d.v; render(); },
  cdel:()=>{ D.coach = D.coach.filter(c=>c.id!==UI.c.caseId); UI.c = {...UI.c, screen:"home", caseId:null, confirm:false}; render(); toast("Coaching-Fall gelöscht"); },
  cfb:d=>{ const k = coachCase(UI.c.caseId); const n = ROOT.querySelector("#cfbnote"); const note = (n && n.value || "").trim().slice(0,300);
    k.feedback = (k.feedback||[]).filter(f=>f.date!==TODAY).concat([{date:TODAY, v:d.v, ...(note?{note}:{})}]); k.updatedAt = nowIso(); render(); toast("Einschätzung festgehalten"); },
  cplan:()=>{ const r = coachResultNow() || (UI.c.caseId && coach.evaluate(coachCase(UI.c.caseId).problemId, coachCase(UI.c.caseId).answers)); if(!r || !r.planAllowed) return;
    const c = coach.content(UI.c.pid), h = activeHorse();
    const existing = D.goals.find(g=>g.status!=="geschafft" && g.title===c.plan.goal && (!h || g.horseId===h.id));
    openSheet("coachPlan",{d:{horseId:h?.id, goalId: existing?.id || "", goalNew: existing ? "" : c.plan.goal, ex:[...r.exercises], all:[...r.exercises], weeks:4, perWeek:2, startMode:"next"}}); },
  csetNum:d=>{ const s = cur(); s.d[d.k] = Math.max(+d.min, Math.min(+d.max, s.d[d.k] + +d.v)); render(true); },
  capply:()=>{ const s = cur(), x = s.d;
    if(!x.horseId){ s.err = "Bitte wähle ein Pferd."; return render(true); }
    if(!x.ex.length){ s.err = "Bitte wähle mindestens eine Übung."; return render(true); }
    if(!x.goalId && !(x.goalNew||"").trim()){ s.err = "Bitte wähle ein Ziel oder gib eines ein."; return render(true); }
    const k = saveCoachCase(), p = coach.problem(k.problemId), now = nowIso();
    k.horseId = x.horseId;
    let gid = x.goalId;
    if(!gid){ gid = uid("g"); D.goals.push({id:gid, title:x.goalNew.trim().slice(0,80), description:`Aus dem Rider Coach: ${p.title}`, horseId:x.horseId, status:"uebe", startDate:TODAY, checkins:[], createdAt:now}); }
    const weeks = coach.planWeeks(k.problemId, x.ex, x.weeks), pat = PATTERNS[x.perWeek] || PATTERNS[2];
    const start = x.startMode==="this" ? addDays(TODAY,1) : addDays(weekStart(TODAY),7), ws = weekStart(start);
    const hz = horse(x.horseId), a = ageOf(hz), lvlCap = levelCapLocal(k.answers);
    const min = ([0,30,40,45][lvlCap]) - (a!=null && (a<6||a>=20) ? 10 : 0);
    const series = uid("pl"), nb = Math.ceil(weeks.length/3), na = Math.ceil(2*weeks.length/3);
    const items = [];
    weeks.forEach((w,wi)=>pat.forEach(d=>{ const date = addDays(ws, wi*7+d); if(date < start) return;
      const ground = w.exercises.every(id=>exById(id)?.cat==="boden");
      items.push({id:uid("s"), series, date, kind: ground?"boden":"reiten", discipline: ground?"Longieren":"Dressur", title:`Coach: ${w.title}`, minutes: ground?25:min, horseId:x.horseId, goalId:gid,
        intensity: wi===0 ? "leicht" : "mittel", phase: wi<nb?"Basis":wi<na?"Aufbau":"Festigen", ex:[...w.exercises], check: wi===weeks.length-1 && d===pat[pat.length-1] ? true : undefined, createdAt:now}); }));
    D.plan.push(...items);
    D.plans.push({id:series, goalId:gid, goalTitle:(goal(gid)?.title)||x.goalNew, horseId:x.horseId, perWeek:x.perWeek, weeks:weeks.length, types:["Dressur"], level:["","Einsteiger","Fortgeschritten","Erfahren"][lvlCap], start:ws, category:"Rider Coach",
      rules:[`Aus dem Rider Coach: „${p.title}“.`, "Es werden nur Übungen aus deinem Coaching-Ergebnis verwendet, passend zu deinem Stand.", `Ablauf: ${weeks.map((w,i)=>`Woche ${i+1} ${w.title}`).join(" → ")}.`, `${x.perWeek}× pro Woche, ca. ${min} Minuten, die erste Woche bewusst leicht.`, "Die letzte Einheit dient der Überprüfung – vergleiche selbst mit Woche 1.", "Nach jeder Einheit: im Tagebuch festhalten, was funktioniert hat und was schwierig war."], createdAt:now});
    k.goalId = gid; k.planId = series; k.updatedAt = now;
    SHEETS = []; UI.view = "planner"; UI.ptab = "week"; UI.week = weekStart(items[0]?.date || start); render(); toast(`${items.length} Einheiten eingeplant`); },
};
function levelCapLocal(a){ return a && a.stand==="anfaenger" ? 1 : a && a.stand==="fortgeschritten" ? 3 : 2; }
SHEET.coachPlan = function(s){
  const d = s.d, hs = D.horses, gs = D.goals.filter(g=>g.status!=="geschafft" && (!d.horseId || g.horseId===d.horseId || !g.horseId));
  return sheetShell("In meinen Trainingsplan übernehmen", `
    ${!hs.length?`<div class="empty-state">${ic("horse",34)}<p>Leg zuerst dein Pferd an.</p><button class="btn" data-a="horseForm">Pferd anlegen</button></div>`:`
    <div class="field"><span>1 · Pferd</span><div class="chips">${hs.map(h=>`<button class="chip ${d.horseId===h.id?"on":""}" data-a="eset" data-k="horseId" data-v="${h.id}">${esc(h.name)}</button>`).join("")}</div></div>
    <div class="field"><span>2 · Trainingsziel</span><div class="chips">${gs.map(g=>`<button class="chip sm ${d.goalId===g.id?"on":""}" data-a="eset" data-k="goalId" data-v="${g.id}">${esc(g.title)}</button>`).join("")}<button class="chip sm ${!d.goalId?"on":""}" data-a="eset" data-k="goalId" data-v="">Neues Ziel</button></div>
      ${!d.goalId?`<input class="input" style="margin-top:10px" data-f="goalNew" value="${esc(d.goalNew||"")}" maxlength="80" placeholder="Name des Ziels">`:""}</div>
    <div class="field"><span>3 · Übungen übernehmen</span>${d.all.map(id=>{ const e = exById(id); return `<button class="chip sm ${d.ex.includes(id)?"on":""}" style="margin:0 6px 6px 0" data-a="etoggle" data-k="ex" data-v="${id}">${esc(e.name)}</button>`; }).join("")}</div>
    <div class="field"><span>4 · Einplanen</span>
      <div class="row between"><span class="small">Wochen</span><div class="chips">${[2,4,6].map(w=>`<button class="chip sm ${d.weeks===w?"on":""}" data-a="eset" data-k="weeks" data-v="${w}" data-num="1">${w}</button>`).join("")}</div></div>
      <div class="row between" style="margin-top:10px"><span class="small">Einheiten pro Woche</span><div class="stepper"><button data-a="csetNum" data-k="perWeek" data-v="-1" data-min="1" data-max="4" aria-label="Weniger">−</button><b style="font-size:22px">${d.perWeek}</b><button data-a="csetNum" data-k="perWeek" data-v="1" data-min="1" data-max="4" aria-label="Mehr">+</button></div></div>
      <div class="seg" style="margin-top:12px">${[["this","Ab morgen"],["next","Ab nächstem Montag"]].map(([k,l])=>`<button class="${d.startMode===k?"on":""}" data-a="eset" data-k="startMode" data-v="${k}">${l}</button>`).join("")}</div></div>
    <div class="note" style="margin-top:16px">${ic("book",18)}<span><b>5 · Nach dem Training:</b> In jeder Einheit findest du „Training eintragen“. Der Eintrag wird mit dem Ziel verknüpft und erscheint in deinem Coaching-Fall.</span></div>`}
    ${s.err?`<p class="err">${esc(s.err)}</p>`:""}`,
    `<button class="btn ghost" data-a="closeSheet">Abbrechen</button><button class="btn" data-a="capply">${ic("check",18)} Einplanen</button>`, {eyebrow:"Rider Coach"});
};
Object.assign(A, COACH_ACTIONS);

/* ---------- Anbindung an die App ---------- */
const TONES = [["#9a6b45","#4a3424"],["#5b6f58","#2b3a2e"],["#7d6a8a","#3b3145"],["#6f7f86","#2f3a40"],["#a07a4a","#4f3b22"]];
function toneOf(id){ let n = 0; for(const c of String(id||"")) n = (n*31 + c.charCodeAt(0)) >>> 0; return TONES[n % TONES.length]; }
const mapLevel = l => /erfahren/i.test(l||"") ? "Erfahren" : /fortgeschritten/i.test(l||"") ? "Fortgeschritten" : l ? "Einsteiger" : "Fortgeschritten";
const KIND_LABEL = {riderlab:"Rider Lab",lektion:"Lektion",eigenes:"Eigenes",boden:"Bodenarbeit",reiten:"Reiten"};

/** Ergänzt fehlende Listen/Felder älterer Tagebücher – nur für die Anzeige, nichts wird erfunden */
function prep(d){
  const x = JSON.parse(JSON.stringify(d || {}));
  x.profile = x.profile || {};
  for(const k of ["horses","entries","goals","plan","milestones","plans","rest","coach"]) if(!Array.isArray(x[k])) x[k] = [];
  x.goals.forEach(g=>{ if(!g.startDate) g.startDate = (g.createdAt||"").slice(0,10) || TODAY; if(!Array.isArray(g.checkins)) g.checkins = []; });
  x.plan.forEach(s=>{ if(!s.discipline) s.discipline = KIND_LABEL[s.kind] || "Training"; if(!Array.isArray(s.ex)) s.ex = []; if(s.kind==="riderlab" && !s.rl && s.ref) s.rl = [s.ref]; });
  return x;
}
function BASE(){ const p = location.pathname; const i = p.indexOf("/tagebuch"); return (i>=0 ? p.slice(0,i) : "") + "/tagebuch"; }
function routePath(){
  if(UI.view==="horse") return "/pferde/"+UI.horseId;
  if(UI.view==="journal") return UI.jtab==="horses" ? "/pferde" : UI.jtab==="milestones" ? "/meilensteine" : "/eintraege";
  if(UI.view==="planner") return UI.ptab==="goals" ? "/ziele" : UI.ptab==="library" ? "/uebungen" : UI.ptab==="month" ? "/plan/monat" : (UI.week===weekStart(TODAY) ? "/plan" : "/plan/"+UI.week);
  if(UI.view==="progress") return "/fortschritt";
  if(UI.view==="coach"){ const p = UI.c.pid && coach.problem(UI.c.pid);
    if(UI.c.screen==="case" && UI.c.caseId) return "/coach/fall-"+UI.c.caseId;
    if((UI.c.screen==="run"||UI.c.screen==="result") && p) return "/coach/"+p.slug;
    return "/coach"; }
  return "";
}
function applyRoute(view, search){
  const [a,b] = view || [];
  SHEETS = [];
  switch(a){
    case undefined: UI.view = "home"; break;
    case "eintraege": UI.view = "journal"; UI.jtab = "timeline"; break;
    case "meilensteine": UI.view = "journal"; UI.jtab = "milestones"; break;
    case "eintrag": UI.view = "journal"; UI.jtab = "timeline"; if(D.entries.some(e=>e.id===b)) SHEETS = [{type:"entryView",id:b}]; break;
    case "pferde":
      if(b && b!=="neu" && horse(b)){ UI.view = "horse"; UI.horseId = b; }
      else { UI.view = "journal"; UI.jtab = "horses"; if(b==="neu") SHEETS = [{type:"horseForm",d:{}}]; }
      break;
    case "stunde": {
      UI.view = "journal"; UI.jtab = "timeline";
      const e = b && D.entries.find(x=>x.id===b);
      const pid = new URLSearchParams(search||"").get("plan"), ps = pid && D.plan.find(x=>x.id===pid);
      if(e) SHEETS = [{type:"entry",step:2,editId:e.id,d:JSON.parse(JSON.stringify({...e,lessons:e.lessons||[],photos:e.photos||[]}))}];
      else if(ps){ SHEETS = [{type:"session",id:ps.id}]; const g = goal(ps.goalId);
        SHEETS = [{type:"entry",step:3,d:newEntryDraft({date:ps.date<=TODAY?ps.date:TODAY,discipline:DISC.some(x=>x.id===ps.discipline)?ps.discipline:"Dressur",minutes:ps.minutes,horseId:ps.horseId||"",focus:g?goalType(g.title).label:ps.title,intensity:ps.intensity,goalId:ps.goalId,planId:ps.id})}]; }
      else SHEETS = [{type:"entry",step:1,d:newEntryDraft()}];
      break; }
    case "plan": UI.view = "planner"; if(b==="monat") UI.ptab = "month"; else { UI.ptab = "week"; if(b && /^\d{4}-\d{2}-\d{2}$/.test(b)) UI.week = weekStart(b); } break;
    case "ziele": UI.view = "planner"; UI.ptab = "goals"; break;
    case "uebungen": UI.view = "planner"; UI.ptab = "library"; break;
    case "fortschritt": UI.view = "progress"; break;
    case "coach": {
      UI.view = "coach"; UI.c = {...UI.c, screen:"home", pid:null, answers:{}, order:[], caseId:null};
      if(b && b.startsWith("fall-")){ const k = (D.coach||[]).find(x=>x.id===b.slice(5)); if(k) UI.c = {...UI.c, screen:"case", caseId:k.id, pid:k.problemId, answers:{...k.answers}}; }
      else if(b){ const p = coach.problem(b); if(p && p.ready) UI.c = {...UI.c, screen:"run", pid:p.id}; }
      break; }
    default: UI.view = "home";
  }
}
function setDataInternal(d){
  D = prep(d); SNAP = JSON.stringify(D);
  if(UI.scope!=="all" && !horse(UI.scope)) UI.scope = "all";
}
function ensureStyle(){
  if(document.getElementById("hgrs-style")) return;
  const st = document.createElement("style"); st.id = "hgrs-style"; st.textContent = RS_CSS; document.head.appendChild(st);
}

/**
 * Startet den Riding Space in `root`.
 * host: { data, view, links: {id:{title,href}}, save(data) → Promise, navigate(href), onRoute(path) }
 */
export function mountRidingSpace(root, host){
  ROOT = root; HOST = host; TODAY = isoOf(new Date());
  UI.week = weekStart(TODAY); UI.pmonth = monthKey(TODAY); UI.pday = TODAY; UI.jmonth = monthKey(TODAY);
  for(const [id,l] of Object.entries(host.links||{})){ if(id.startsWith("rl-")) RL[id] = l.title; else LESSONS[id] = l.title; }
  ensureStyle();
  root.classList.add("hgrs");
  root.innerHTML = `<nav class="rs-tabs" id="rs-tabs" aria-label="Bereiche des Reitertagebuchs"></nav><main id="rs-view"></main><button class="rs-fab" data-a="quick" aria-label="Neu: Training eintragen, Einheit planen oder Meilenstein">${ic("plus",26,2.2)}</button><div id="rs-sheet"></div><div id="rs-toast" aria-live="polite"></div>`;
  setDataInternal(host.data);
  applyRoute(host.view, location.search);
  LASTPATH = "\u0000";
  const L = [["click",onClick],["input",onInput],["change",onChange],["dragstart",onDragStart],["dragover",onDragOver],["dragleave",onDragLeave],["drop",onDrop]];
  L.forEach(([t,f])=>root.addEventListener(t,f));
  document.addEventListener("keydown", onKey);
  render();
  return {
    setData(d){ const next = prep(d); if(JSON.stringify(next)===JSON.stringify(D)) { SNAP = JSON.stringify(D); return; } setDataInternal(d); render(true); },
    destroy(){ L.forEach(([t,f])=>root.removeEventListener(t,f)); document.removeEventListener("keydown", onKey); clearTimeout(toast.t); root.innerHTML = ""; ROOT = null; HOST = null; SHEETS = []; },
  };
}

/** Für Prüfskripte */
export const __test = { buildPlan: p => buildPlan(p), EX, GT, LESSONS, RL, setData: d => setDataInternal(d) };
