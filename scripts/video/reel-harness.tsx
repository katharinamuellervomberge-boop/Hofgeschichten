import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { ReactNode } from "react";
import { ZIRKEL_TOTAL, renderZirkel } from "@/video/reels/zirkel-reel";
import { AD_TOTAL_DE, AD_TOTAL_EN, renderAdDe, renderAdEn } from "@/video/reels/ad-reel";
import { FUSS_TOTAL, renderFuss } from "@/video/reels/fuss-reel";
import { HILFEN_EN_TOTAL, renderHilfenEn } from "@/video/reels/hilfen-reel-en";
import { HILFEN_TOTAL, renderHilfen } from "@/video/reels/hilfen-reel";
import { KOERPER_TOTAL, renderKoerper } from "@/video/reels/koerper-reel";
import { SPRUNG_TOTAL, renderSprung } from "@/video/reels/sprung-reel";
import { LINKS_TOTAL, renderLinks } from "@/video/reels/links-reel";
import { SZ_TOTAL, renderSchenkelZuegel } from "@/video/reels/schenkel-zuegel-reel";
import { ERBRECHEN_TOTAL, renderErbrechen } from "@/video/reels/erbrechen-reel";
import { ECKE_TOTAL, renderEcke } from "@/video/reels/ecke-reel";
import { ECKE_EN_TOTAL, renderEckeEn } from "@/video/reels/ecke-reel-en";
import { ERBRECHEN_EN_TOTAL, renderErbrechenEn } from "@/video/reels/erbrechen-reel-en";
import { STELLUNG_TOTAL, renderStellung } from "@/video/reels/stellung-reel";

const REELS: Record<string, { total: () => number; render: (t: number) => ReactNode }> = {
  zirkel: { total: () => ZIRKEL_TOTAL, render: renderZirkel },
  "ad-de": { total: () => AD_TOTAL_DE, render: renderAdDe },
  "ad-en": { total: () => AD_TOTAL_EN, render: renderAdEn },
  fuss: { total: () => FUSS_TOTAL, render: renderFuss },
  "hilfen-en": { total: () => HILFEN_EN_TOTAL, render: renderHilfenEn },
  hilfen: { total: () => HILFEN_TOTAL, render: renderHilfen },
  stellung: { total: () => STELLUNG_TOTAL, render: renderStellung },
  "schenkel-zuegel": { total: () => SZ_TOTAL, render: renderSchenkelZuegel },
  links: { total: () => LINKS_TOTAL, render: renderLinks },
  sprung: { total: () => SPRUNG_TOTAL, render: renderSprung },
  koerper: { total: () => KOERPER_TOTAL, render: renderKoerper },
  ecke: { total: () => ECKE_TOTAL, render: renderEcke },
  "ecke-en": { total: () => ECKE_EN_TOTAL, render: renderEckeEn },
  "erbrechen-en": { total: () => ERBRECHEN_EN_TOTAL, render: renderErbrechenEn },
  erbrechen: { total: () => ERBRECHEN_TOTAL, render: renderErbrechen },
};

const comp = new URLSearchParams(location.search).get("c") ?? "zirkel";
const r = REELS[comp];
const w = window as unknown as Record<string, unknown>;
w.__total = r.total();
const root = createRoot(document.getElementById("root")!);
w.__setT = (t: number) => flushSync(() => root.render(r.render(t)));
(w.__setT as (t: number) => void)(0);
const IMGS = ["/horses/tivoli-960.webp", "/kids/mila-640.webp", "/kids/ben-640.webp", "/people/hanna-640.webp"];
w.__ready = Promise.all([document.fonts.ready, ...IMGS.map((src) => new Promise((res) => { const i = new Image(); i.onload = i.onerror = res; i.src = src; }))]);
