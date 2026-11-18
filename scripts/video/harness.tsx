/* Seite zum Bild-für-Bild-Rendern eines Lernvideos (wird von render.mjs gebündelt) */
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { videos } from "@/video";
import { timeline } from "@/video/kit";
import EN_LINES from "./en/lines.json";
import EN_DUR from "./en/durations.json";
import EN_UI from "./en/ui.json";

const q = new URLSearchParams(location.search);
const slug = q.get("v")!;
const lang = q.get("lang") === "en" ? "en" : "de";
const v = videos.find((x) => x.slug === slug)!;

// Englische Fassung: Sprechertexte/Untertitel und gemessene Längen der englischen Aufnahme
if (lang === "en") {
  const tx = (EN_LINES as Record<string, Record<string, string | { text: string; caption?: string }>>)[slug] ?? {};
  for (const l of v.lines) {
    const e = tx[l.id];
    if (!e) continue;
    if (typeof e === "string") {
      l.text = e;
      l.caption = undefined;
    } else {
      l.text = e.text;
      l.caption = e.caption;
    }
  }
  const d = (EN_DUR as Record<string, Record<string, number>>)[slug];
  if (d) v.durations = d;
}
const tl = timeline(v);
const w = window as unknown as Record<string, unknown>;
w.__total = tl.total;
w.__lines = v.lines.map((l) => ({ id: l.id, text: l.text, start: tl.start(l.id), end: tl.end(l.id) }));
const root = createRoot(document.getElementById("root")!);

const UI = EN_UI as Record<string, string>;
const seen = new Set<string>();
w.__texts = seen;

/** Beschriftungen im Bild übersetzen (Textknoten, exakter Vergleich ohne Rand-Leerzeichen) */
function localize() {
  const walker = document.createTreeWalker(document.getElementById("root")!, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const raw = n.nodeValue ?? "";
    const key = raw.trim();
    if (!key) continue;
    seen.add(key);
    if (lang === "en" && UI[key] !== undefined) n.nodeValue = raw.replace(key, UI[key]);
  }
  if (lang !== "en") return;
  // Kopfzeilen-Chip an die neue Textlänge anpassen
  for (const g of Array.from(document.querySelectorAll('g[transform="translate(32 28)"]'))) {
    const rect = g.querySelector("rect");
    const text = g.querySelector("text") as SVGTextElement | null;
    if (rect && text) rect.setAttribute("width", String(Math.round(text.getComputedTextLength() + 58)));
  }
}

w.__setT = (t: number) => {
  flushSync(() => root.render(v.render(t, tl)));
  localize();
};
(w.__setT as (t: number) => void)(0);
