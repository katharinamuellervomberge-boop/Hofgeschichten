import { createDomTranslator } from "@/i18n/dom-translate";
import { translateDeep, translateText, type Dict } from "@/i18n/translate";
import { EXERCISES } from "@/content/training/uebungen";
import { englishCoach } from "@/content/coach/en";
import katalog from "@/content/akademie/en/katalog.json";
import rlTitles from "@/content/riderlab/en-titles.json";
import training from "@/content/training/en.json";
import coachDict from "@/content/coach/en.json";
import ui from "./en.json";
import views from "../en-views.json";

/** Felder der Trainingsübungen ohne Übersetzung (IDs, Kategorien, Skizzen) */
export const EXERCISE_SKIP = new Set(["cat", "fig", "lessons", "rl", "min"]);

/**
 * Englischer Riding Space – wird nur auf /en nachgeladen (eigener Chunk, siehe RidingSpace.tsx).
 * Liefert übersetzte Inhalte (Übungen, Rider Coach) und den Übersetzer für die Oberfläche.
 */
let shared: ReturnType<typeof build> | null = null;
function build() {
  const content: Dict = { ...(training as Dict), ...(coachDict as Dict) };
  const all: Dict = { ...(katalog as Dict), ...(rlTitles as Dict), ...content, ...(views.exact as Dict), ...(ui.exact as Dict) };
  return { content, translator: createDomTranslator(all, { ...views.patterns, ...ui.patterns }) };
}
const get = () => (shared ??= build());

/** Übersetzer für die übrigen Tagebuch-Seiten (Profil, Momente, Rückblick, Sicherung) */
export const diaryTranslator = () => get().translator;

export function ridingSpaceEnglish() {
  const { content, translator } = get();
  return {
    translator,
    // „name“ ist sonst eine Kennung (SKIP_KEYS) – bei Übungen ist es der sichtbare Titel
    exercises: translateDeep(EXERCISES, content, undefined, EXERCISE_SKIP).map((e) => ({ ...e, name: translateText(e.name, content) })),
    coach: englishCoach(content),
  };
}
