/** Felder der Reitbahn-Übungen, die nie übersetzt werden (Kennungen, Geometrie, Regeln) – für translateDeep */
export const ARENA_SKIP = new Set([
  "kind", "gait", "bend", "nextBend", "hand", "state", "evidence", "category", "group", "highlightedAids", "commonMistakeIds",
  "relatedExerciseId", "relatedLibraryIds", "relatedSkillIds", "reviewStatus", "reviewNote", "arenaSizes", "defaultSize",
  "authoredRein", "answer", "path",
]);
