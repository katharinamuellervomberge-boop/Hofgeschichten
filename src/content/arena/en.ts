import { translateDeep, translateText, type Dict } from "@/i18n/translate";
import katalog from "@/content/akademie/en/katalog.json";
import training from "@/content/training/en.json";
import ridingUi from "@/features/tagebuch/riding/en.json";
import arena from "./en.json";
import { ARENA_SKIP } from "./en-skip";
import type { ArenaExercise } from "./types";

/**
 * Reitbahn auf Englisch: Übungstexte aus src/content/arena/en.json (Schlüssel = textKey des deutschen Textes).
 * Platzhalter wie {hand} und Buchstaben wie [H] bleiben erhalten – fillText(…, "en") setzt left/right ein.
 */
const DICT: Dict = { ...(katalog as Dict), ...(training as Dict), ...(ridingUi.exact as Dict), ...(arena as Dict) };

export const translateArena = (ex: ArenaExercise): ArenaExercise => translateDeep(ex, DICT, undefined, ARENA_SKIP);

/** Einzelner Text (z. B. Name einer Trainingsübung) */
export const arenaText = (s: string) => translateText(s, DICT);
