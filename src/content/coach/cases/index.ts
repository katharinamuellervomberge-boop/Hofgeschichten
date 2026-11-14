import type { CoachProblemContent } from "../types";
import { cp01, cp02, cp03, cp04, cp05, cp06, cp07, cp08, cp09, cp10 } from "./a-sitz";
import { cp11, cp12, cp13, cp14, cp15, cp16, cp17, cp18 } from "./b-hilfen";
import { cp19, cp20, cp21, cp23, cp24, cp25, cp26, cp27, cp28 } from "./c-trab-galopp";
import { cp22 } from "./cp-22";
import { cp29, cp30, cp31, cp32, cp33, cp34, cp35, cp36 } from "./d-biegung";
import { cp37, cp38, cp39, cp40, cp41, cp42, cp43, cp44 } from "./e-dressur";
import { cp45, cp46, cp47, cp48, cp49, cp50 } from "./f-gelaende";

/** Vollständige Coaching-Fälle nach Problem-ID. Neue Fälle hier eintragen. */
const LIST: CoachProblemContent[] = [cp01, cp02, cp03, cp04, cp05, cp06, cp07, cp08, cp09, cp10, cp11, cp12, cp13, cp14, cp15, cp16, cp17, cp18, cp19, cp20, cp21, cp22, cp23, cp24, cp25, cp26, cp27, cp28, cp29, cp30, cp31, cp32, cp33, cp34, cp35, cp36, cp37, cp38, cp39, cp40, cp41, cp42, cp43, cp44, cp45, cp46, cp47, cp48, cp49, cp50];

export const COACH_CASES: Record<string, CoachProblemContent> = Object.fromEntries(LIST.map((c) => [c.id, c]));
