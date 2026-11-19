import "server-only";
import { translateDeep, translateText, type Dict } from "@/i18n/translate";
import type { Animation, Exercise } from "@/features/riderlab/types";
import full from "./en.json";
import { RIDER_LAB_SKIP } from "./en-skip";

/**
 * Rider Lab auf Englisch – nur auf dem Server, damit gesperrte Übungsinhalte nicht mit dem Wörterbuch
 * in den Browser gelangen. Schlüssel = textKey des deutschen Textes (src/content/riderlab/en.json).
 */
const DICT = full as Dict;
export const translateRiderLabExercise = (ex: Exercise): Exercise => translateDeep(ex, DICT, undefined, RIDER_LAB_SKIP);
export const translateRiderLabAnim = (a: Animation): Animation => translateDeep(a, DICT, undefined, RIDER_LAB_SKIP);
export const riderLabText = (s: string) => translateText(s, DICT);
