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
import { N01_TOTAL, renderN01 } from "@/video/reels/nov01-erkennen-reel";
import { N02_TOTAL, renderN02 } from "@/video/reels/nov02-ohren-reel";
import { N03_TOTAL, renderN03 } from "@/video/reels/nov03-fuss-gefuehl-reel";
import { N04_TOTAL, renderN04 } from "@/video/reels/nov04-zuhause-reel";
import { N05_TOTAL, renderN05 } from "@/video/reels/nov05-galopp-quiz-reel";
import { N06_TOTAL, renderN06 } from "@/video/reels/nov06-bahnfiguren-reel";
import { N07_TOTAL, renderN07 } from "@/video/reels/nov07-45minuten-reel";
import { STELLUNG_TOTAL, renderStellung } from "@/video/reels/stellung-reel";
import { LERN } from "@/video/lern/lern-videos";
import { RS01_TOTAL, renderRS01 } from "@/video/reels/rs01-hinten-vorne-reel";
import { RS02_TOTAL, renderRS02 } from "@/video/reels/rs02-haende-ruhig-reel";
import { GW_TOTAL, renderGaloppwechsel } from "@/video/reels/galoppwechsel-reel";
import { SCHRITT_TOTAL, renderSchritt } from "@/video/reels/schritt-reel";
import { HAENDE_TOTAL, renderHaende } from "@/video/reels/haende-sitz-reel";
import { SW_TOTAL, renderSchenkelweichen } from "@/video/reels/schenkelweichen-reel";
import { SCHULTER_TOTAL, renderSchulter } from "@/video/reels/schulter-reel";
import { HAENDE_EN_TOTAL, renderHaendeEn } from "@/video/reels/haende-sitz-reel-en";

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
  n01: { total: () => N01_TOTAL, render: renderN01 },
  n02: { total: () => N02_TOTAL, render: renderN02 },
  n03: { total: () => N03_TOTAL, render: renderN03 },
  n04: { total: () => N04_TOTAL, render: renderN04 },
  n05: { total: () => N05_TOTAL, render: renderN05 },
  n06: { total: () => N06_TOTAL, render: renderN06 },
  n07: { total: () => N07_TOTAL, render: renderN07 },
  erbrechen: { total: () => ERBRECHEN_TOTAL, render: renderErbrechen },
  ...LERN,
  rs01: { total: () => RS01_TOTAL, render: renderRS01 },
  rs02: { total: () => RS02_TOTAL, render: renderRS02 },
  galoppwechsel: { total: () => GW_TOTAL, render: renderGaloppwechsel },
  schritt: { total: () => SCHRITT_TOTAL, render: renderSchritt },
  haende: { total: () => HAENDE_TOTAL, render: renderHaende },
  schenkelweichen: { total: () => SW_TOTAL, render: renderSchenkelweichen },
  schulter: { total: () => SCHULTER_TOTAL, render: renderSchulter },
  "haende-en": { total: () => HAENDE_EN_TOTAL, render: renderHaendeEn },
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
