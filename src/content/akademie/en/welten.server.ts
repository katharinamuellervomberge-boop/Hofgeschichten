import "server-only";
import type { Dict } from "@/i18n/translate";
import w1 from "./w1.json";
import w2 from "./w2.json";
import w3 from "./w3.json";
import w4 from "./w4.json";
import w5 from "./w5.json";
import w6 from "./w6.json";
import w7 from "./w7.json";
import w8 from "./w8.json";
import w9 from "./w9.json";
import w10 from "./w10.json";
import w11 from "./w11.json";
import w12 from "./w12.json";
import w13 from "./w13.json";
import w14 from "./w14.json";

/** Englische Lektionstexte je Lernwelt (Schlüssel = Prüfsumme des deutschen Textes) – nur auf dem Server */
export const EN_WORLD_DICTS: Record<string, Dict> = { w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14 };
