/* Seite zum Bild-für-Bild-Rendern eines Lernvideos (wird von render.mjs gebündelt) */
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { videos } from "@/video";
import { timeline } from "@/video/kit";

const slug = new URLSearchParams(location.search).get("v")!;
const v = videos.find((x) => x.slug === slug)!;
const tl = timeline(v);
const w = window as unknown as Record<string, unknown>;
w.__total = tl.total;
w.__lines = v.lines.map((l) => ({ id: l.id, text: l.text, start: tl.start(l.id), end: tl.end(l.id) }));
const root = createRoot(document.getElementById("root")!);
w.__setT = (t: number) => flushSync(() => root.render(v.render(t, tl)));
(w.__setT as (t: number) => void)(0);
