import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { ReactNode } from "react";
import { ZIRKEL_TOTAL, renderZirkel } from "@/video/reels/zirkel-reel";
import { STELLUNG_TOTAL, renderStellung } from "@/video/reels/stellung-reel";

const REELS: Record<string, { total: () => number; render: (t: number) => ReactNode }> = {
  zirkel: { total: () => ZIRKEL_TOTAL, render: renderZirkel },
  stellung: { total: () => STELLUNG_TOTAL, render: renderStellung },
};

const comp = new URLSearchParams(location.search).get("c") ?? "zirkel";
const r = REELS[comp];
const w = window as unknown as Record<string, unknown>;
w.__total = r.total();
const root = createRoot(document.getElementById("root")!);
w.__setT = (t: number) => flushSync(() => root.render(r.render(t)));
(w.__setT as (t: number) => void)(0);
w.__ready = document.fonts.ready;
