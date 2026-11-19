import { createDomTranslator } from "@/i18n/dom-translate";
import type { Dict } from "@/i18n/translate";
import titles from "@/content/riderlab/en-titles.json";
import ui from "./en.json";

/** Oberfläche und Übersicht des Rider Lab auf Englisch (Übungsinhalte übersetzt der Server, content/riderlab/en.ts) */
let t: ReturnType<typeof createDomTranslator> | null = null;
export const riderLabTranslator = () => (t ??= createDomTranslator({ ...(titles as Dict), ...(ui.exact as Dict) }, ui.patterns));
