import type { CoachProblemContent } from "../types";
import { cp22 } from "./cp-22";

/** Vollständige Coaching-Fälle nach Problem-ID. Neue Fälle hier eintragen. */
export const COACH_CASES: Record<string, CoachProblemContent> = {
  "cp-22": cp22,
};
