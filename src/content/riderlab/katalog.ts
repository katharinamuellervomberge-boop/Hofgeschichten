/**
 * Rider Lab – Übersicht ohne Übungsinhalte (für den Browser).
 * Die Daten kommen aus katalog.generated.ts (`npm run riderlab:katalog`).
 */
import { riderLabCatalog } from "./katalog.generated";

export type RiderLabExerciseInfo = { id: string; slug: string; number: number; title: string; doseLabel: string };
export type RiderLabAreaInfo = {
  id: string;
  slug: string;
  number: number;
  title: string;
  problem: string;
  intro: string;
  tint: string;
  exercises: RiderLabExerciseInfo[];
};

export { riderLabCatalog };

export const RIDER_LAB_TITLE = "Rider Lab";
export const RIDER_LAB_SUB = "Dein Körper. Dein Sitz. Dein Reiten.";
export const riderLabHref = "/akademie/rider-lab";

type Slugged = { slug: string };
export const areaHref = (a: Slugged) => `${riderLabHref}/${a.slug}`;
export const exerciseHref = (a: Slugged, e: Slugged) => `${riderLabHref}/${a.slug}/${e.slug}`;

/** Probeübung: die erste Übung jedes Bereichs – wie die Probelektion je Modul der Reitakademie */
export const isTrialExercise = (area: { exercises: { id: string }[] }, exId: string) => area.exercises[0]?.id === exId;

export const getAreaInfo = (slug: string) => riderLabCatalog.find((a) => a.slug === slug);
export const allRiderLabExercises = () => riderLabCatalog.flatMap((a) => a.exercises.map((e) => ({ area: a, ex: e })));
