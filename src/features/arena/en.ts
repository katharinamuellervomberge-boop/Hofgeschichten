import { createDomTranslator } from "@/i18n/dom-translate";
import type { Dict } from "@/i18n/translate";
import ui from "./en.json";

/** Oberfläche der Reitbahn auf Englisch (Inhalte der Übungen übersetzt schon der Server, content/arena/en.ts) */
let t: ReturnType<typeof createDomTranslator> | null = null;
export const arenaTranslator = () => (t ??= createDomTranslator(ui.exact as Dict, ui.patterns));
