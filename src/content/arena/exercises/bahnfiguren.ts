import { PathBuilder } from "../build";
import { rawSeconds } from "../geometry";
import type { Annotation, ArenaExercise, ArenaSize, Mistake, Phase, QuizQuestion, Segment } from "../types";
import { change, MISTAKES, PURPOSE, Q_INNER_LEG, Q_OUTER_REIN, SAFETY, straight, turnHold, turnIn } from "./common";

/**
 * Welle 1 der Reitbahn (18.11.2026): Bahnfiguren nach den gängigen FN-Varianten.
 * Alle für die linke Hand geschrieben (gegen den Uhrzeigersinn, K–E–H oben, A links).
 * Abgeglichen mit den Lektionen „Ganze Bahn und Handwechsel“, „Alle Handwechsel“,
 * „Volten und Achten“ und „Schlangenlinien“ der Reitakademie.
 * Prüfstatus: freigegeben durch die Inhaberin (18.11.2026).
 */

const Q = (r: number) => (Math.PI * r) / 2; // Viertelkreis
/** Lerntempo: etwas langsamer als in echt */
const SLOW = 1.22;
export const REVIEW = "Nach FN-Lehre geschrieben, fachlich geprüft und freigegeben durch die Inhaberin am 18.11.2026.";

export type Built = { segs: Segment[]; phases: Phase[]; ann?: Annotation[]; len: number };

/** Dieselbe Figur für 20 × 40 und 20 × 60 bauen */
export function sizes(fn: (L: number) => Built) {
  const a = fn(40);
  const b = fn(60);
  const by = (k: "20x40" | "20x60") => (k === "20x40" ? a : b);
  const both = <T,>(f: (x: Built) => T) => ({ "20x40": f(a), "20x60": f(b) }) as Record<ArenaSize, T>;
  return {
    path: both((x) => x.segs),
    annotations: both((x) => x.ann ?? []),
    phases: a.phases,
    phasesBySize: both((x) => x.phases),
    durationSec: Math.round(rawSeconds(a.segs) * SLOW),
    durationBySize: both((x) => Math.round(rawSeconds(x.segs) * SLOW)),
    _by: by,
  };
}

export const LESSON = {
  ganze: { id: "ra-w7-l2", title: "Ganze Bahn und Handwechsel", href: "/akademie/reiten-in-der-bahn/ganze-bahn-und-handwechsel" },
  wechsel: { id: "ra-w11-l2", title: "Alle Handwechsel", href: "/akademie/alle-bahnfiguren/alle-handwechsel" },
  ecken: { id: "ra-w11-l1", title: "Hufschläge und Ecken", href: "/akademie/alle-bahnfiguren/hufschlaege-und-ecken" },
  volten: { id: "ra-w11-l4", title: "Volten und Achten", href: "/akademie/alle-bahnfiguren/volten-und-achten" },
  zirkelVolte: { id: "ra-w7-l3", title: "Zirkel und Volte", href: "/akademie/reiten-in-der-bahn/zirkel-und-volte" },
  schlange: { id: "ra-w11-l5", title: "Schlangenlinien", href: "/akademie/alle-bahnfiguren/schlangenlinien" },
};

export const pick = (...ids: string[]): Mistake[] => ids.map((i) => MISTAKES[i]);

export function base(o: {
  category?: ArenaExercise["category"];
  review?: { status: ArenaExercise["reviewStatus"]; note: string };
  id: string;
  slug: string;
  title: string;
  titleDe: string;
  description: string;
  difficulty: 1 | 2 | 3;
  learnMinutes: number;
  changesRein: boolean;
  objectives: string[];
  prerequisites: string[];
  built: ReturnType<typeof sizes>;
  whyItWorks: ArenaExercise["whyItWorks"];
  mistakes: Mistake[];
  tips: string[];
  quiz: QuizQuestion[];
  relatedLessons: ArenaExercise["relatedLessons"];
  relatedSkillIds: string[];
  group?: string;
  variantLabel?: string;
}): ArenaExercise {
  const { _by, ...built } = o.built;
  void _by;
  // Alle Fehler, auf die eine Phase verweist, gehören auch in die Fehlerliste der Übung
  const used = new Set(Object.values(built.phasesBySize).flatMap((ps) => ps.flatMap((p) => p.commonMistakeIds)));
  const mistakes = [...o.mistakes, ...[...used].filter((id) => !o.mistakes.some((m) => m.id === id)).map((id) => MISTAKES[id])];
  return {
    id: o.id,
    slug: o.slug,
    title: o.title,
    titleDe: o.titleDe,
    description: o.description,
    category: o.category ?? "bahnfigur",
    group: o.group,
    variantLabel: o.variantLabel,
    changesRein: o.changesRein,
    difficulty: o.difficulty,
    learnMinutes: o.learnMinutes,
    arenaSizes: ["20x40", "20x60"],
    defaultSize: "20x40",
    authoredRein: "links",
    hasMirror: true,
    objectives: o.objectives,
    prerequisites: o.prerequisites,
    ...built,
    aidPurpose: PURPOSE,
    whyItWorks: o.whyItWorks,
    mistakes,
    tips: o.tips,
    safetyNotes: SAFETY,
    quiz: o.quiz,
    relatedLessons: o.relatedLessons,
    relatedLibraryIds: [],
    relatedSkillIds: o.relatedSkillIds,
    reviewStatus: o.review?.status ?? "freigegeben",
    reviewNote: o.review?.note ?? REVIEW,
  };
}

const CORNER_WHY = {
  evidence: "lehre" as const,
  text: "Eine Ecke wird als Viertelvolte geritten. Wie tief, hängt von Ausbildungsstand, Gangart und Gleichgewicht ab: zu Beginn großzügig, später enger – nie enger, als das Pferd im Takt und im Gleichgewicht bleiben kann.",
};

const Q_PREPARE: QuizQuestion = {
  id: "q-vorbereiten",
  prompt: "Wann kündigst du eine Wendung an?",
  options: [
    { id: "laenge", text: "Etwa eine Pferdelänge vorher – mit halber Parade und Blick" },
    { id: "drin", text: "Erst in der Wendung" },
    { id: "frueh", text: "Schon auf der Mitte der langen Seite" },
  ],
  answer: "laenge",
  explanation: "Eine Pferdelänge vorher reicht, damit das Pferd sich auf die Wendung einstellen kann – früher stellt es sich zu lange, später kommt es nicht mehr rund durch.",
};

const Q_NEW_LEG: QuizQuestion = {
  id: "q-neuer-schenkel",
  prompt: "Nach dem Handwechsel bist du auf der {neueHand} Hand. Welcher Schenkel liegt in der nächsten Ecke am Gurt?",
  options: [
    { id: "links", text: "Der linke Schenkel" },
    { id: "rechts", text: "Der rechte Schenkel" },
  ],
  answer: { rule: "innenSeiteNeu" },
  explanation: "Auf der {neueHand} Hand ist der {neuInnen} Schenkel innen – er liegt am Gurt.",
};

/* ===================================================================== */
/* 1 Ganze Bahn                                                           */
/* ===================================================================== */

export const ganzeBahn = base({
  id: "arena_whole_arena",
  slug: "ganze-bahn",
  title: "Ganze Bahn",
  titleDe: "Ganze Bahn",
  description: "Einmal rundherum auf dem Hufschlag – mit vier sauber gerittenen Ecken. Die Grundlage aller Bahnfiguren: gerade auf den Seiten, gebogen in den Ecken.",
  difficulty: 1,
  learnMinutes: 6,
  changesRein: false,
  objectives: ["Gerade auf den langen und kurzen Seiten reiten", "Jede Ecke vorbereiten und als Viertelvolte ausreiten", "Den Takt durch die ganze Runde halten"],
  prerequisites: ["Sicher im Leichttraben"],
  built: sizes((L) => {
    const r = 4;
    const pb = new PathBuilder({ x: L - 6, y: 0 });
    pb.smooth([{ x: 0, y: 0 }, { x: 0, y: 20 }, { x: L, y: 20 }, { x: L, y: 0 }, { x: L - 6, y: 0 }], r, { 0: "e1", 1: "e2", 2: "e3", 3: "e4" });
    const e = (k: string) => pb.at(k);
    const q = Q(r);
    return {
      segs: pb.build(),
      len: pb.length,
      phases: [
        straight({ id: "g1", from: 0, to: e("e1") - 3, title: "Lange Seite Richtung [K]", summary: "Gerade auf dem Hufschlag, gleichmäßiger Takt.", look: "Geradeaus den Hufschlag entlang – die Ecke bei [K] schon im Blick.", pause: true, mistakes: ["schief"] }),
        turnIn({ id: "c1", from: e("e1") - 3, to: e("e1") + q, bend: "links", title: "Ecke zwischen [K] und A", summary: "Eine Pferdelänge vorher ankündigen, dann mit Blick und innerem Schenkel durch die Ecke.", look: "Durch die Ecke schauen – auf den Weg zu A.", pause: true, extra: [CORNER_WHY], mistakes: ["ecke", "zug"] }),
        straight({ id: "g2", from: e("e1") + q, to: e("e2") - 3, title: "Kurze Seite bei A", summary: "Zwischen den Ecken wird das Pferd wieder gerade.", look: "Geradeaus auf die nächste Ecke.", pause: true }),
        turnIn({ id: "c2", from: e("e2") - 3, to: e("e2") + q, bend: "links", title: "Ecke zwischen A und [F]", summary: "Gleiche Hilfen wie in der ersten Ecke.", look: "Durch die Ecke auf die lange Seite schauen.", mistakes: ["ecke"] }),
        straight({ id: "g3", from: e("e2") + q, to: e("e3") - 3, title: "Lange Seite Richtung [M]", summary: "Gerade, fleißig, im Takt.", look: "Geradeaus Richtung [M]." }),
        turnIn({ id: "c3", from: e("e3") - 3, to: e("e3") + q, bend: "links", title: "Ecke zwischen [M] und C", summary: "Ankündigen, stellen, durchreiten.", look: "Durch die Ecke schauen – auf den Weg zu C.", mistakes: ["ecke"] }),
        straight({ id: "g4", from: e("e3") + q, to: e("e4") - 3, title: "Kurze Seite bei C", summary: "Wieder gerade richten.", look: "Geradeaus auf die letzte Ecke." }),
        turnIn({ id: "c4", from: e("e4") - 3, to: e("e4") + q, bend: "links", title: "Ecke zwischen C und [H]", summary: "Die vierte Ecke – genauso sorgfältig wie die erste.", look: "Durch die Ecke auf die lange Seite schauen.", mistakes: ["ecke"] }),
        straight({ id: "g5", from: e("e4") + q, to: 1e4, title: "Lange Seite – eine Runde geschafft", summary: "Gerade auf dem Hufschlag weiter.", look: "Geradeaus Richtung [E]." }),
      ],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Ganze Bahn heißt: auf dem Hufschlag an allen vier Seiten entlang, die Ecken ausgeritten statt abgekürzt. Gerade Linien und Ecken wechseln sich ab – so übst du Geraderichten und Biegen im Wechsel." },
    { evidence: "vereinfachung", text: "Jede Ecke ist eine kleine Wendung mit Anfang, Mitte und Ende. Wer die Ecken ernst nimmt, hat später bei Volten und Zirkeln die Hilfen schon im Gefühl." },
  ],
  mistakes: pick("ecke", "schief", "zug", "takt"),
  tips: ["Zähle die Tritte von der Ecke bis zum nächsten Buchstaben – so merkst du, ob der Takt gleich bleibt.", "Reite jede Ecke so tief, wie es dein Pferd im Gleichgewicht schafft – nicht tiefer."],
  quiz: [Q_PREPARE, Q_INNER_LEG, Q_OUTER_REIN],
  relatedLessons: [LESSON.ganze, LESSON.ecken],
  relatedSkillIds: ["skill_line", "skill_bend"],
});

/* ===================================================================== */
/* 2 Halbe Bahn                                                           */
/* ===================================================================== */

export const halbeBahn = base({
  id: "arena_half_arena",
  slug: "halbe-bahn",
  title: "Halbe Bahn",
  titleDe: "Halbe Bahn",
  description: "Bei E abwenden, gerade über X nach B und auf derselben Hand weiter – du reitest nur die halbe Bahn.",
  difficulty: 1,
  learnMinutes: 6,
  changesRein: false,
  objectives: ["Bei E abwenden wie in einer Viertelvolte", "Gerade über X auf B zureiten", "Bei B wieder auf den Hufschlag wenden"],
  prerequisites: ["Ganze Bahn"],
  built: sizes((L) => {
    const r = 4;
    const pb = new PathBuilder({ x: L / 2 + 10, y: 0 });
    pb.smooth([{ x: L / 2, y: 0 }, { x: L / 2, y: 20 }, { x: L, y: 20 }, { x: L, y: 0 }, { x: L / 2 + 10, y: 0 }], r, { 0: "e", 1: "b", 2: "c1", 3: "c2" });
    const e = (k: string) => pb.at(k);
    const q = Q(r);
    return {
      segs: pb.build(),
      len: pb.length,
      phases: [
        straight({ id: "g1", from: 0, to: e("e") - 3, title: "Auf dem Hufschlag Richtung [E]", summary: "Gerade auf dem Hufschlag, die Wendung bei [E] vorbereiten.", look: "Geradeaus – und schon quer durch die Bahn auf [B] schauen.", pause: true }),
        turnIn({ id: "t1", from: e("e") - 3, to: e("e") + q, bend: "links", title: "Bei [E] abwenden", summary: "Mit Blick, Gewicht und innerem Schenkel abwenden – wie in einer Viertelvolte.", look: "Über X auf [B] schauen.", pause: true }),
        straight({ id: "g2", from: e("e") + q, to: e("b") - 3, title: "Gerade über X", summary: "Zwischen [E] und [B] ist das Pferd gerade – X liegt auf dem Weg.", look: "Den Punkt [B] fest anpeilen.", pause: true, mistakes: ["schief"] }),
        turnIn({ id: "t2", from: e("b") - 3, to: e("b") + q, bend: "links", title: "Bei [B] auf den Hufschlag", summary: "Wieder nach innen wenden – du bleibst auf derselben Hand.", look: "Auf der langen Seite Richtung [M] schauen." }),
        straight({ id: "g3", from: e("b") + q, to: e("c1") - 3, title: "Lange Seite Richtung [M]", summary: "Gerade auf dem Hufschlag.", look: "Geradeaus Richtung [M]." }),
        turnIn({ id: "c1", from: e("c1") - 3, to: e("c1") + q, bend: "links", title: "Ecke zwischen [M] und C", summary: "Ecke ankündigen und ausreiten.", look: "Durch die Ecke schauen.", extra: [CORNER_WHY], mistakes: ["ecke"] }),
        straight({ id: "g4", from: e("c1") + q, to: e("c2") - 3, title: "Kurze Seite bei C", summary: "Gerade richten.", look: "Geradeaus auf die Ecke." }),
        turnIn({ id: "c2", from: e("c2") - 3, to: e("c2") + q, bend: "links", title: "Ecke zwischen C und [H]", summary: "Ecke ankündigen und ausreiten.", look: "Durch die Ecke auf die lange Seite schauen.", mistakes: ["ecke"] }),
        straight({ id: "g5", from: e("c2") + q, to: 1e4, title: "Wieder auf [E] zu", summary: "Die halbe Bahn beginnt von vorn.", look: "Geradeaus Richtung [E]." }),
      ],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Auf der halben Bahn wendest du bei E (oder B) ab und reitest gerade zum gegenüberliegenden Mittelbuchstaben. Die Hand bleibt gleich – es ist keine Handwechsel-Figur." },
    { evidence: "vereinfachung", text: "Die Linie quer durch die Bahn ist ein guter Test für Geradeaus: Ohne Bande musst du das Pferd zwischen beiden Schenkeln und Zügeln führen." },
  ],
  mistakes: pick("schief", "ecke", "zug", "innen"),
  tips: ["Peile [B] schon vor dem Abwenden an – dann wird die Linie gerade.", "Zähle die Tritte quer durch die Bahn. Auf beiden Händen sollten es gleich viele sein."],
  quiz: [
    {
      id: "q-x",
      prompt: "Über welchen Punkt führt die Linie der halben Bahn?",
      options: [
        { id: "X", text: "Über X" },
        { id: "D", text: "Über D" },
        { id: "G", text: "Über G" },
      ],
      answer: "X",
      explanation: "E und B liegen sich in der Mitte der langen Seiten gegenüber – dazwischen liegt X.",
    },
    {
      id: "q-hand",
      prompt: "Wechselst du auf der halben Bahn die Hand?",
      options: [
        { id: "nein", text: "Nein, du bleibst auf derselben Hand" },
        { id: "ja", text: "Ja, bei B wechselst du" },
      ],
      answer: "nein",
      explanation: "Du wendest bei E und bei B jeweils nach innen – die Hand bleibt gleich.",
    },
    Q_INNER_LEG,
  ],
  relatedLessons: [LESSON.ganze],
  relatedSkillIds: ["skill_line", "skill_straight"],
});

/* ===================================================================== */
/* 3 Durch die ganze Bahn wechseln                                        */
/* ===================================================================== */

export const wechselGanze = base({
  id: "arena_change_long_diagonal",
  slug: "durch-die-ganze-bahn-wechseln",
  title: "Durch die ganze Bahn wechseln",
  titleDe: "Handwechsel durch die ganze Bahn",
  description: "Vom Eckbuchstaben schräg über X zum gegenüberliegenden Eckbuchstaben. Auf der Diagonale gerade, kurz vor dem Hufschlag umstellen – dann geht es auf der neuen Hand weiter.",
  difficulty: 1,
  learnMinutes: 7,
  changesRein: true,
  objectives: ["Bei [H] abwenden und die Diagonale vorbereiten", "Gerade über X reiten und den Takt halten", "Vor [F] umstellen und auf der neuen Hand weiterreiten"],
  prerequisites: ["Ganze Bahn"],
  built: sizes((L) => {
    const pb = new PathBuilder({ x: L, y: 14 });
    pb.smooth([{ x: L, y: 0 }, { x: L - 6, y: 0 }, { x: 6, y: 20 }, { x: 0, y: 20 }, { x: 0, y: 8 }], 4, { 0: "c1", 1: "h", 2: "f", 3: "c2" });
    const e = (k: string) => pb.at(k);
    return {
      segs: pb.build(),
      len: pb.length,
      phases: [
        straight({ id: "g1", from: 0, to: e("c1") - 3, title: "Kurze Seite bei C", summary: "Gerade auf dem Hufschlag, die Ecke vorbereiten.", look: "Geradeaus auf die Ecke.", pause: true }),
        turnIn({ id: "t1", from: e("c1") - 3, to: e("h_e"), bend: "links", title: "Ecke und bei [H] abwenden", summary: "Durch die Ecke und direkt bei [H] auf die Diagonale wenden.", look: "Schon in der Ecke über X auf [F] schauen.", pause: true, extra: [CORNER_WHY] }),
        straight({ id: "g2", from: e("h_e"), to: e("f") - 5, title: "Gerade über X auf [F] zu", summary: "Auf der Diagonale ist das Pferd gerade – du reitest genau über X.", look: "Den Punkt [F] fest anpeilen.", pause: true, mistakes: ["schief", "takt"] }),
        change({ id: "w", from: e("f") - 5, to: e("f_e"), nextBend: "rechts", hand: "rechts", title: "Vor [F] umstellen", summary: "Etwa eine Pferdelänge vor dem Hufschlag auf die neue Hand umstellen: Stellung, Schenkel und Gewicht wechseln gemeinsam.", look: "Auf den Hufschlag in die neue Richtung schauen.", pause: true }),
        turnIn({ id: "t2", from: e("f_e"), to: e("c2_e"), bend: "rechts", hand: "rechts", title: "Gleich die erste Ecke auf der neuen Hand", summary: "Nach [F] kommt sofort die Ecke. Die Hilfen haben die Seite gewechselt – innen ist jetzt die andere Seite.", look: "Durch die Ecke auf die kurze Seite schauen.", pause: true, mistakes: ["ecke"] }),
        straight({ id: "g4", from: e("c2_e"), to: 1e4, hand: "rechts", title: "Kurze Seite bei A", summary: "Gerade richten und auf der neuen Hand weiter.", look: "Geradeaus Richtung A." }),
      ],
      ann: [{ at: { x: L / 2, y: 10 }, label: "über X" }],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Durch die ganze Bahn wechselt man vom ersten Eckbuchstaben nach der Ecke über X zum diagonal gegenüberliegenden Eckbuchstaben. Vor dem neuen Hufschlag wird umgestellt: Stellung, Schenkel und Gewicht." },
    { evidence: "vereinfachung", text: "Die Diagonale ist ein Lineal: Wenn du zu früh oder zu spät abwendest, triffst du X nicht. Ein fester Blickpunkt hilft mehr als jede Zügelhilfe." },
  ],
  mistakes: pick("schief", "umstellen", "ecke", "takt"),
  tips: ["Schau beim Abwenden schon auf [F] – dein Pferd folgt deinem Blick.", "Stell erst um, wenn du fast am Hufschlag bist. Wer auf der Diagonale schon umstellt, kommt schief an."],
  quiz: [
    {
      id: "q-x",
      prompt: "Über welchen Punkt führt die Diagonale?",
      options: [
        { id: "X", text: "Über X" },
        { id: "E", text: "Über E" },
        { id: "D", text: "Über D" },
      ],
      answer: "X",
      explanation: "Beide Eckbuchstaben liegen gleich weit von der Bahnmitte entfernt – die Diagonale führt genau über X.",
    },
    {
      id: "q-wann",
      prompt: "Wann stellst du auf die neue Hand um?",
      options: [
        { id: "vor", text: "Etwa eine Pferdelänge vor dem neuen Hufschlag" },
        { id: "sofort", text: "Gleich nach dem Abwenden" },
        { id: "spaet", text: "Erst in der nächsten Ecke" },
      ],
      answer: "vor",
      explanation: "Auf der Diagonale ist das Pferd gerade. Kurz vor dem Hufschlag wird umgestellt, damit es auf der neuen Hand gebogen ankommt.",
    },
    Q_NEW_LEG,
  ],
  relatedLessons: [LESSON.ganze, LESSON.wechsel],
  relatedSkillIds: ["skill_line", "skill_straight", "skill_change"],
});

/* ===================================================================== */
/* 4 Durch die halbe Bahn wechseln                                        */
/* ===================================================================== */

export const wechselHalbe = base({
  id: "arena_change_half_diagonal",
  slug: "durch-die-halbe-bahn-wechseln",
  title: "Durch die halbe Bahn wechseln",
  titleDe: "Handwechsel durch die halbe Bahn",
  description: "Vom Eckbuchstaben schräg zur Mitte der anderen langen Seite – zum Beispiel von H nach B. Kürzer und steiler als die ganze Diagonale.",
  difficulty: 1,
  learnMinutes: 6,
  changesRein: true,
  objectives: ["Bei [H] abwenden und [B] anpeilen", "Die kürzere Diagonale gerade reiten", "Vor [B] umstellen und auf der neuen Hand weiterreiten"],
  prerequisites: ["Durch die ganze Bahn wechseln"],
  built: sizes((L) => {
    const pb = new PathBuilder({ x: L, y: 14 });
    pb.smooth([{ x: L, y: 0 }, { x: L - 6, y: 0 }, { x: L / 2, y: 20 }, { x: 0, y: 20 }, { x: 0, y: 8 }], [4, 3, 4, 4], { 0: "c1", 1: "h", 2: "b", 3: "c2" });
    const e = (k: string) => pb.at(k);
    return {
      segs: pb.build(),
      len: pb.length,
      phases: [
        straight({ id: "g1", from: 0, to: e("c1") - 3, title: "Kurze Seite bei C", summary: "Gerade auf dem Hufschlag.", look: "Geradeaus auf die Ecke.", pause: true }),
        turnIn({ id: "t1", from: e("c1") - 3, to: e("h_e"), bend: "links", title: "Ecke und bei [H] abwenden", summary: "Durch die Ecke, dann bei [H] auf die Linie zu [B] wenden.", look: "Schon in der Ecke auf [B] schauen.", pause: true }),
        straight({ id: "g2", from: e("h_e"), to: e("b") - 4, title: "Gerade auf [B] zu", summary: "Die Linie ist kürzer als die ganze Diagonale – Takt und Geradeaus trotzdem halten.", look: "[B] fest anpeilen.", pause: true, mistakes: ["schief"] }),
        change({ id: "w", from: e("b") - 4, to: e("b_e"), nextBend: "rechts", hand: "rechts", title: "Vor [B] umstellen", summary: "Kurz vor dem Hufschlag umstellen. Die Wendung auf den Hufschlag ist hier etwas enger als bei der ganzen Diagonale.", look: "Auf den Hufschlag Richtung [F] schauen.", pause: true }),
        straight({ id: "g3", from: e("b_e"), to: e("c2") - 3, hand: "rechts", title: "Neue Hand: Richtung [F]", summary: "Gerade auf dem Hufschlag, jetzt auf der neuen Hand.", look: "Geradeaus Richtung [F]." }),
        turnIn({ id: "t2", from: e("c2") - 3, to: e("c2_e"), bend: "rechts", hand: "rechts", title: "Ecke zwischen [F] und A", summary: "Erste Ecke auf der neuen Hand.", look: "Durch die Ecke schauen.", mistakes: ["ecke"] }),
        straight({ id: "g4", from: e("c2_e"), to: 1e4, hand: "rechts", title: "Kurze Seite bei A", summary: "Gerade richten.", look: "Geradeaus Richtung A." }),
      ],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Durch die halbe Bahn wechselt man vom Eckbuchstaben zur Mitte der gegenüberliegenden langen Seite (zum Beispiel von H nach B). Vor dem neuen Hufschlag wird umgestellt." },
    { evidence: "vereinfachung", text: "Weil die Linie steiler ist, ist das Ankommen am Hufschlag eine echte Wendung. Rechtzeitig umstellen macht sie rund." },
  ],
  mistakes: pick("schief", "umstellen", "ecke"),
  tips: ["Schau beim Abwenden auf [B], nicht auf die Bahnmitte.", "Lass dir für die Wendung auf den Hufschlag Platz – lieber etwas runder ankommen."],
  quiz: [
    {
      id: "q-ende",
      prompt: "Wo endet die Linie beim Wechsel durch die halbe Bahn?",
      options: [
        { id: "mitte", text: "In der Mitte der anderen langen Seite ([B])" },
        { id: "ecke", text: "Am gegenüberliegenden Eckbuchstaben" },
        { id: "x", text: "Bei X" },
      ],
      answer: "mitte",
      explanation: "Die halbe Bahn endet am Mittelbuchstaben der anderen langen Seite – die ganze Bahn erst am Eckbuchstaben.",
    },
    Q_NEW_LEG,
  ],
  relatedLessons: [LESSON.wechsel],
  relatedSkillIds: ["skill_line", "skill_change"],
});

/* ===================================================================== */
/* 5 Ecken (Viertelvolte 10 m / 6 m)                                      */
/* ===================================================================== */

function ecken(d: 10 | 6): ArenaExercise {
  const r = d / 2;
  return base({
    id: d === 10 ? "arena_corner" : "arena_corner_6m",
    slug: d === 10 ? "ecken" : "ecken-6m",
    group: "ecken",
    variantLabel: `Viertelvolte ${d} m`,
    title: "Ecken richtig ausreiten",
    titleDe: "Ecken",
    description: "Eine Ecke ist eine kleine Wendung: ankündigen, stellen, durchreiten, gerade richten. Wie tief, hängt vom Ausbildungsstand ab.",
    difficulty: 1,
    learnMinutes: 6,
    changesRein: false,
    objectives: ["Die Ecke eine Pferdelänge vorher ankündigen", "Mit Blick und innerem Schenkel durch die Ecke reiten", "Nach der Ecke gerade richten"],
    prerequisites: ["Ganze Bahn"],
    built: sizes(() => {
      const pb = new PathBuilder({ x: 14, y: 0 });
      pb.smooth([{ x: 0, y: 0 }, { x: 0, y: 20 }, { x: 14, y: 20 }], r, { 0: "e1", 1: "e2" });
      const e = (k: string) => pb.at(k);
      const q = Q(r);
      return {
        segs: pb.build(),
        len: pb.length,
        phases: [
          straight({ id: "g1", from: 0, to: e("e1") - 4, title: "Auf die Ecke zu", summary: "Gerade auf dem Hufschlag – die Ecke kommt.", look: "Geradeaus, die Ecke im Blick.", pause: true }),
          turnIn({ id: "t1", from: e("e1") - 4, to: e("e1") + q / 2, bend: "links", title: "Ecke einleiten", summary: "Eine Pferdelänge vorher: halbe Parade, Stellung, Blick in die Ecke.", look: "In die Ecke schauen – und schon weiter auf die kurze Seite.", pause: true, extra: [CORNER_WHY] }),
          turnHold({ id: "h1", from: e("e1") + q / 2, to: e("e1") + q, bend: "links", title: "Durch die Ecke", summary: "Innerer Schenkel hält das Pferd in der Ecke, äußerer Zügel führt die Schulter herum.", look: "Auf die kurze Seite schauen.", pause: true, mistakes: ["ecke", "innen"] }),
          straight({ id: "g2", from: e("e1") + q, to: e("e2") - 4, title: "Kurze Seite: gerade richten", summary: "Nach der Ecke Stellung aufgeben und gerade weiterreiten.", look: "Geradeaus auf die nächste Ecke.", pause: true }),
          turnIn({ id: "t2", from: e("e2") - 4, to: e("e2") + q, bend: "links", title: "Zweite Ecke", summary: "Gleicher Ablauf: ankündigen, stellen, durchreiten.", look: "Durch die Ecke auf die lange Seite.", mistakes: ["ecke"] }),
          straight({ id: "g3", from: e("e2") + q, to: 1e4, title: "Gerade auf die lange Seite", summary: "Nach der Ecke gerade und fleißig weiter.", look: "Geradeaus Richtung [F]." }),
        ],
      };
    }),
    whyItWorks: [
      CORNER_WHY,
      { evidence: "biomechanik", text: "In einer engen Wendung muss das Pferd mehr Last auf die Hinterbeine nehmen und das Gleichgewicht halten. Ist die Ecke für seinen Ausbildungsstand zu eng, weicht es aus oder verliert den Takt." },
    ],
    mistakes: pick("ecke", "zug", "innen", "takt"),
    tips: ["Zu Beginn lieber großzügig – eine runde Ecke im Takt ist besser als eine tiefe mit verlorenem Takt.", "Vergleiche beide Hände: Auf welcher Seite gelingt die Ecke leichter?"],
    quiz: [
      Q_PREPARE,
      {
        id: "q-tiefe",
        prompt: "Wovon hängt ab, wie tief du eine Ecke reitest?",
        options: [
          { id: "stand", text: "Vom Ausbildungsstand, der Gangart und dem Gleichgewicht des Pferdes" },
          { id: "immer", text: "Eine Ecke wird immer so tief wie möglich geritten" },
          { id: "reiter", text: "Nur von der Erfahrung des Reiters" },
        ],
        answer: "stand",
        explanation: "Die Ecke ist eine Viertelvolte – so groß oder klein, wie das Pferd sie im Takt und Gleichgewicht schafft.",
      },
      Q_INNER_LEG,
    ],
    relatedLessons: [LESSON.ecken],
    relatedSkillIds: ["skill_bend", "skill_line"],
  });
}
export const ecken10 = ecken(10);
export const ecken6 = ecken(6);

/* ===================================================================== */
/* 6 Volte (10 m / 8 m)                                                   */
/* ===================================================================== */

function volte(d: 10 | 8): ArenaExercise {
  const r = d / 2;
  const C = 2 * Math.PI * r;
  return base({
    id: d === 10 ? "arena_volte_10m" : "arena_volte_8m",
    slug: d === 10 ? "volte" : "volte-8m",
    group: "volte",
    variantLabel: `${d} m`,
    title: "Volte",
    titleDe: "Volte",
    description: "Ein kleiner, runder Kreis, der am selben Punkt beginnt und endet – hier bei E. Je kleiner die Volte, desto mehr Biegung und Gleichgewicht braucht das Pferd.",
    difficulty: d === 10 ? 1 : 2,
    learnMinutes: 6,
    changesRein: false,
    objectives: ["Die Volte bei [E] vorbereiten und rund beginnen", "Gleichmäßig gebogen auf der Kreislinie bleiben", "Am Ausgangspunkt gerade auf den Hufschlag zurückkehren"],
    prerequisites: ["Zirkel", "Ecken"],
    built: sizes((L) => {
      const pb = new PathBuilder({ x: L / 2 + 12, y: 0 });
      pb.lineTo({ x: L / 2, y: 0 }).mark("v").arcAround({ x: L / 2, y: r }, -360).mark("ve").lineTo({ x: L / 2 - 8, y: 0 });
      const e = (k: string) => pb.at(k);
      return {
        segs: pb.build(),
        len: pb.length,
        phases: [
          straight({ id: "g1", from: 0, to: e("v") - 4, title: "Auf dem Hufschlag Richtung [E]", summary: "Gerade, im Takt – die Volte vorbereiten.", look: "Geradeaus, [E] im Blick.", pause: true }),
          turnIn({ id: "t1", from: e("v") - 4, to: e("v") + C / 4, bend: "links", title: "Bei [E] in die Volte", summary: "Halbe Parade, Stellung, Blick auf die Volte – das Pferd wendet von [E] aus nach innen.", look: "Ein Viertel der Volte voraus schauen.", pause: true, extra: [{ evidence: "lehre", text: "Die Volte ist ein Kreis von 6, 8 oder 10 m Durchmesser. Je kleiner, desto mehr Biegung und Versammlung braucht das Pferd – zu Beginn reitet man 10 m." }] }),
          turnHold({ id: "h1", from: e("v") + C / 4, to: e("ve") - 1, bend: "links", title: "Rund bleiben", summary: "Die Hilfen werden leiser, das Pferd bleibt gleichmäßig gebogen.", look: "Zum gegenüberliegenden Punkt der Volte, dann zurück zu [E].", pause: true, mistakes: ["innen", "aussen", "takt"] }),
          straight({ id: "g2", from: e("ve") - 1, to: 1e4, title: "Zurück auf den Hufschlag", summary: "Bei [E] Stellung aufgeben und gerade auf dem Hufschlag weiter.", look: "Geradeaus Richtung [K].", pause: true }),
        ],
      };
    }),
    whyItWorks: [
      { evidence: "lehre", text: "Die Volte beginnt und endet am selben Punkt. Ihre Hilfen sind dieselben wie auf dem Zirkel – nur enger beieinander und genauer abgestimmt." },
      { evidence: "biomechanik", text: "Auf einem kleinen Kreis muss das Pferd mehr Last mit dem inneren Hinterbein aufnehmen. Ist die Volte zu klein für seinen Ausbildungsstand, wird sie eckig oder das Pferd verliert den Takt." },
    ],
    mistakes: pick("innen", "aussen", "zug", "takt"),
    tips: ["Stell dir die Volte als Uhr vor: 12, 3, 6, 9 Uhr – reite von Punkt zu Punkt.", "Wird die Volte eiförmig, ist sie meist zu groß angelegt oder der äußere Zügel lässt los."],
    quiz: [
      {
        id: "q-groesse",
        prompt: "Wie groß ist eine Volte?",
        options: [
          { id: "klein", text: "6 bis 10 m Durchmesser" },
          { id: "zirkel", text: "20 m, so groß wie der Zirkel" },
          { id: "mittel", text: "15 m" },
        ],
        answer: "klein",
        explanation: "Volten haben 6, 8 oder 10 m Durchmesser. Der Zirkel ist mit 20 m doppelt so groß wie die größte Volte.",
      },
      Q_INNER_LEG,
      Q_OUTER_REIN,
    ],
    relatedLessons: [LESSON.zirkelVolte, LESSON.volten],
    relatedSkillIds: ["skill_bend", "skill_line", "skill_rhythm"],
  });
}
export const volte10 = volte(10);
export const volte8 = volte(8);

/* ===================================================================== */
/* 7 Kehrtvolte (10 m / 8 m)                                              */
/* ===================================================================== */

function kehrtvolte(d: 10 | 8): ArenaExercise {
  const r = d / 2;
  return base({
    id: d === 10 ? "arena_half_volte_10m" : "arena_half_volte_8m",
    slug: d === 10 ? "kehrtvolte" : "kehrtvolte-8m",
    group: "kehrtvolte",
    variantLabel: `${d} m`,
    title: "Kehrtvolte",
    titleDe: "Kehrtvolte",
    description: "Eine halbe Volte nach innen, dann schräg zurück auf den Hufschlag – und du bist auf der anderen Hand.",
    difficulty: d === 10 ? 1 : 2,
    learnMinutes: 6,
    changesRein: true,
    objectives: ["Die halbe Volte rund reiten", "Auf der schrägen Linie umstellen", "Auf der neuen Hand gerade auf den Hufschlag zurückkehren"],
    prerequisites: ["Volte"],
    built: sizes((L) => {
      const pb = new PathBuilder({ x: L / 2 + 8, y: 0 });
      pb.lineTo({ x: L / 2, y: 0 }).mark("k").arcAround({ x: L / 2, y: r }, -180).mark("kh");
      const a = (40 * Math.PI) / 180;
      const x1 = L / 2 + 1.5;
      const x2 = x1 + (2 * r) / Math.tan(a);
      pb.smooth([{ x: x1, y: 2 * r }, { x: x2, y: 0 }, { x: Math.min(x2 + 4, L - 0.5), y: 0 }], 3, { 0: "s1", 1: "s2" });
      const e = (k: string) => pb.at(k);
      return {
        segs: pb.build(),
        len: pb.length,
        phases: [
          straight({ id: "g1", from: 0, to: e("k") - 4, title: "Auf dem Hufschlag Richtung [E]", summary: "Gerade, im Takt – die Kehrtvolte vorbereiten.", look: "Geradeaus, [E] im Blick.", pause: true }),
          turnIn({ id: "t1", from: e("k") - 4, to: e("k") + Q(r), bend: "links", title: "Bei [E] in die halbe Volte", summary: "Wie bei der Volte: halbe Parade, Stellung, Blick nach innen.", look: "Auf die halbe Volte schauen.", pause: true }),
          turnHold({ id: "h1", from: e("k") + Q(r), to: e("kh"), bend: "links", title: "Halbe Volte rund beenden", summary: "Die halbe Volte wird ganz rund geritten, erst dann geht es schräg zurück.", look: "Auf den Hufschlag schauen, wo du ankommen willst.", pause: true }),
          change({ id: "w", from: e("kh"), to: e("s2_e"), nextBend: "rechts", hand: "rechts", title: "Schräg zurück und umstellen", summary: "Auf der schrägen Linie gerade richten und vor dem Hufschlag auf die neue Hand umstellen.", look: "Auf den Hufschlag in die neue Richtung schauen.", pause: true }),
          straight({ id: "g2", from: e("s2_e"), to: 1e4, hand: "rechts", title: "Neue Hand", summary: "Gerade auf dem Hufschlag – jetzt auf der neuen Hand.", look: "Geradeaus Richtung [H]." }),
        ],
      };
    }),
    whyItWorks: [
      { evidence: "lehre", text: "Kehrtvolte: aus der Bewegung eine halbe Volte (6–10 m) nach innen reiten und in schräger Linie auf den Hufschlag zurückkehren. „Aus der Ecke kehrt“ funktioniert genauso, beginnt aber direkt nach der Ecke." },
      { evidence: "vereinfachung", text: "Die Kehrtvolte ist ein kleiner Handwechsel: erst rund, dann gerade, dann neu." },
    ],
    mistakes: pick("umstellen", "innen", "zug", "takt"),
    tips: ["Reite die halbe Volte zu Ende, bevor du schräg zurückgehst – sonst wird sie eckig.", "Die schräge Linie ist kurz: Umstellen beginnt schon in ihrer Mitte."],
    quiz: [
      {
        id: "q-wechsel",
        prompt: "Wechselst du mit der Kehrtvolte die Hand?",
        options: [
          { id: "ja", text: "Ja, du kommst auf der anderen Hand zurück" },
          { id: "nein", text: "Nein, die Hand bleibt gleich" },
        ],
        answer: "ja",
        explanation: "Nach der halben Volte reitest du in die Gegenrichtung zurück – also auf der anderen Hand.",
      },
      Q_NEW_LEG,
    ],
    relatedLessons: [LESSON.wechsel, LESSON.volten],
    relatedSkillIds: ["skill_bend", "skill_change"],
  });
}
export const kehrtvolte10 = kehrtvolte(10);
export const kehrtvolte8 = kehrtvolte(8);

/* ===================================================================== */
/* 8 Schlangenlinien durch die ganze Bahn (3 / 4 Bögen)                   */
/* ===================================================================== */

function schlange(n: 3 | 4): ArenaExercise {
  return base({
    id: n === 3 ? "arena_serpentine_3" : "arena_serpentine_4",
    slug: n === 3 ? "schlangenlinien" : "schlangenlinien-4-boegen",
    group: "schlangenlinien",
    variantLabel: `${n} Bögen`,
    title: "Schlangenlinien durch die ganze Bahn",
    titleDe: "Schlangenlinien",
    description:
      n === 3
        ? "Drei gleich große Bögen von A nach C. Jeder Bogen berührt die lange Seite, dazwischen überquerst du die Mittellinie gerade und stellst um. Mit drei Bögen bleibst du auf derselben Hand."
        : "Vier gleich große Bögen von A nach C. Jeder Bogen berührt die lange Seite, dazwischen überquerst du die Mittellinie gerade und stellst um. Mit vier Bögen wechselst du die Hand.",
    difficulty: n === 3 ? 2 : 2,
    learnMinutes: 8,
    changesRein: n === 4,
    objectives: ["Gleich große Bögen reiten, die die lange Seite berühren", "Die Mittellinie gerade überqueren und dabei umstellen", "Die Hilfen bei jedem Bogen gemeinsam auf die neue Seite nehmen"],
    prerequisites: ["Zirkel", "Durch die ganze Bahn wechseln"],
    built: sizes((L) => {
      const w = L / n;
      const rb = w / 2;
      const pb = new PathBuilder({ x: 12, y: 0 });
      pb.smooth([{ x: 0, y: 0 }, { x: 0, y: 10 }], 4, { 0: "e" });
      pb.mark("a").lineTo({ x: 0, y: 20 - rb });
      for (let i = 0; i < n; i++) {
        pb.mark(`b${i}`);
        if (i % 2 === 0) pb.arcAround({ x: i * w + rb, y: 20 - rb }, -180);
        else pb.arcAround({ x: i * w + rb, y: rb }, 180);
        pb.mark(`b${i}e`);
        if (i < n - 1) pb.lineTo({ x: (i + 1) * w, y: i % 2 === 0 ? rb : 20 - rb });
      }
      pb.lineTo({ x: L, y: 10 }).mark("c").lineTo({ x: L, y: n % 2 === 1 ? 7 : 13 });
      const e = (k: string) => pb.at(k);
      const phases: Phase[] = [
        straight({ id: "g1", from: 0, to: e("e") - 3, title: "Auf die kurze Seite zu", summary: "Gerade auf dem Hufschlag – die Schlangenlinie beginnt bei A.", look: "Geradeaus auf die Ecke.", pause: true }),
        turnIn({ id: "t0", from: e("e") - 3, to: e("b0") + (Math.PI * rb) / 4, bend: "links", title: "Ecke und bei A in den ersten Bogen", summary: "Durch die Ecke und bei A in den ersten Bogen – er berührt die gegenüberliegende lange Seite.", look: "Auf den Berührpunkt des ersten Bogens schauen.", pause: true }),
      ];
      for (let i = 0; i < n; i++) {
        const bend = i % 2 === 0 ? "links" : "rechts";
        phases.push(
          turnHold({
            id: `h${i}`,
            from: i === 0 ? e("b0") + (Math.PI * rb) / 4 : e(`b${i}`) + 2,
            to: e(`b${i}e`) - 2,
            bend,
            title: `${i + 1}. Bogen`,
            summary: "Gleichmäßig gebogen bis zum Berührpunkt an der langen Seite, dann zurück zur Mittellinie.",
            look: "Zum Berührpunkt an der langen Seite, dann zur Mittellinie.",
            pause: i < 2,
          }),
        );
        if (i < n - 1)
          phases.push(
            change({
              id: `w${i}`,
              from: e(`b${i}e`) - 2,
              to: e(`b${i + 1}`) + 2,
              nextBend: i % 2 === 0 ? "rechts" : "links",
              title: "Über die Mittellinie: umstellen",
              summary: "Die Mittellinie gerade überqueren – parallel zur kurzen Seite – und dabei umstellen.",
              look: "Gerade über die Mittellinie, dann in den neuen Bogen schauen.",
              pause: i === 0,
            }),
          );
      }
      phases.push(
        straight({
          id: "g2",
          from: e(`b${n - 1}e`) - 2,
          to: 1e4,
          hand: n % 2 === 1 ? "links" : "rechts",
          title: n % 2 === 1 ? "Bei C ankommen – gleiche Hand" : "Bei C ankommen – neue Hand",
          summary: n % 2 === 1 ? "Mit drei Bögen kommst du auf derselben Hand bei C an." : "Mit vier Bögen kommst du auf der anderen Hand bei C an.",
          look: "Bei C auf dem Hufschlag weiter, die nächste Ecke im Blick.",
          pause: true,
        }),
      );
      return { segs: pb.build(), len: pb.length, phases };
    }),
    whyItWorks: [
      { evidence: "lehre", text: "Schlangenlinien durch die ganze Bahn beginnen in der Mitte einer kurzen Seite und enden in der Mitte der anderen. Die Bögen sind gleich groß und berühren abwechselnd die langen Seiten; die Mittellinie wird gerade überquert, dabei wird umgestellt." },
      { evidence: "lehre", text: "Bei einer geraden Bogenzahl (zum Beispiel vier) endest du auf der anderen Hand, bei einer ungeraden (zum Beispiel drei) auf derselben." },
      { evidence: "vereinfachung", text: "Je mehr Bögen, desto kleiner werden sie – und desto schneller müssen die Hilfen die Seite wechseln." },
    ],
    mistakes: pick("umstellen", "takt", "innen", "zug"),
    tips: ["Merk dir die Berührpunkte an den langen Seiten, bevor du losreitest.", "Beim Leichttraben sitzt du beim Überqueren der Mittellinie um."],
    quiz: [
      {
        id: "q-hand",
        prompt: `Du reitest ${n} Bögen. Auf welcher Hand kommst du bei C an?`,
        options: [
          { id: "gleich", text: "Auf derselben Hand" },
          { id: "andere", text: "Auf der anderen Hand" },
        ],
        answer: n % 2 === 1 ? "gleich" : "andere",
        explanation: "Ungerade Bogenzahl = gleiche Hand, gerade Bogenzahl = Handwechsel.",
      },
      {
        id: "q-mitte",
        prompt: "Wie überquerst du die Mittellinie?",
        options: [
          { id: "gerade", text: "Gerade, parallel zur kurzen Seite – dabei wird umgestellt" },
          { id: "schraeg", text: "Schräg, damit der nächste Bogen früher beginnt" },
          { id: "bogen", text: "Im Bogen, ohne umzustellen" },
        ],
        answer: "gerade",
        explanation: "Zwischen den Bögen ist das Pferd kurz gerade – genau dort wechseln die Hilfen die Seite.",
      },
    ],
    relatedLessons: [LESSON.schlange],
    relatedSkillIds: ["skill_bend", "skill_change", "skill_rhythm"],
  });
}
export const schlange3 = schlange(3);
export const schlange4 = schlange(4);

/* ===================================================================== */
/* 9 Einfache Schlangenlinie an der langen Seite (5 m)                    */
/* ===================================================================== */

export const schlangeEinfach = base({
  id: "arena_shallow_loop",
  slug: "einfache-schlangenlinie",
  title: "Einfache Schlangenlinie",
  titleDe: "Einfache Schlangenlinie an der langen Seite",
  description: "Vom ersten Eckbuchstaben ein flacher Bogen nach innen, am tiefsten Punkt auf Höhe von B etwa 5 m vom Hufschlag entfernt, zurück zum zweiten Eckbuchstaben. Das Pferd wird zweimal umgestellt.",
  difficulty: 2,
  learnMinutes: 7,
  changesRein: false,
  objectives: ["Bei [F] flach vom Hufschlag weg reiten", "Am tiefsten Punkt kurz zur Bande hin stellen", "Bei [M] wieder auf dem Hufschlag ankommen"],
  prerequisites: ["Ganze Bahn", "Durch die ganze Bahn wechseln"],
  built: sizes((L) => {
    const rF = 8;
    const rA = 12;
    // Scheitelpunkt so wählen, dass die Abrundung genau 5 m vom Hufschlag entfernt ist
    let yv = 15;
    for (let k = 0; k < 30; k++) {
      const beta = Math.atan((20 - yv) / (L / 2 - 6));
      yv = 15 - rA * (1 / Math.cos(beta) - 1);
    }
    const pb = new PathBuilder({ x: 0, y: 8 });
    pb.smooth(
      [
        { x: 0, y: 20 },
        { x: 6, y: 20 },
        { x: L / 2, y: yv },
        { x: L - 6, y: 20 },
        { x: L, y: 20 },
        { x: L, y: 8 },
      ],
      [4, rF, rA, rF, 4],
      { 0: "c1", 1: "f", 2: "ap", 3: "m", 4: "c2" },
    );
    const e = (k: string) => pb.at(k);
    return {
      segs: pb.build(),
      len: pb.length,
      ann: [{ at: { x: L / 2, y: 15 }, label: "5 m vom Hufschlag", followsPath: true }],
      phases: [
        straight({ id: "g1", from: 0, to: e("c1") - 3, title: "Kurze Seite bei A", summary: "Gerade auf dem Hufschlag.", look: "Geradeaus auf die Ecke.", pause: true }),
        turnIn({ id: "t1", from: e("c1") - 3, to: e("f"), bend: "links", title: "Ecke zwischen A und [F]", summary: "Durch die Ecke – die Schlangenlinie beginnt gleich danach.", look: "Durch die Ecke auf die lange Seite.", mistakes: ["ecke"] }),
        turnIn({ id: "t2", from: e("f"), to: e("f_e") + 1, bend: "links", title: "Bei [F] den Hufschlag verlassen", summary: "Flach nach innen abwenden – mit Blick auf den tiefsten Punkt.", look: "Auf den tiefsten Punkt auf Höhe von [B] schauen.", pause: true }),
        change({ id: "w1", from: e("f_e") + 1, to: e("ap"), nextBend: "rechts", title: "Umstellen vor dem tiefsten Punkt", summary: "Vor dem tiefsten Punkt zur Bande hin umstellen. Du bleibst auf derselben Hand.", look: "Auf den tiefsten Punkt, dann schon zu [M].", pause: true }),
        turnHold({ id: "h1", from: e("ap"), to: e("ap_e"), bend: "rechts", title: "Tiefster Punkt auf Höhe von [B]", summary: "Etwa 5 m vom Hufschlag: Das Pferd ist kurz zur Bande hin gestellt.", look: "Auf den Hufschlag bei [M] schauen.", pause: true, extra: [{ evidence: "lehre", text: "An der langen Seite wird das Pferd zweimal umgestellt: erst vom Hufschlag weg, dann wieder zur Bande hin. Die Hand bleibt dabei gleich." }] }),
        change({ id: "w2", from: e("ap_e"), to: e("m"), nextBend: "links", title: "Zurück umstellen", summary: "Wieder auf die alte Seite umstellen, bevor der Bogen zum Hufschlag beginnt.", look: "Auf [M] schauen." }),
        turnIn({ id: "t3", from: e("m"), to: e("m_e"), bend: "links", title: "Bei [M] zurück auf den Hufschlag", summary: "Flach auf den Hufschlag zurück.", look: "Auf die Ecke schauen." }),
        turnIn({ id: "t4", from: e("m_e"), to: e("c2_e"), bend: "links", title: "Ecke zwischen [M] und C", summary: "Nach [M] kommt gleich die Ecke – Stellung behalten und ausreiten.", look: "Durch die Ecke schauen.", mistakes: ["ecke"] }),
        straight({ id: "g3", from: e("c2_e"), to: 1e4, title: "Kurze Seite bei C", summary: "Gerade richten.", look: "Geradeaus." }),
      ],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Einfache Schlangenlinie an der langen Seite: vom ersten Eckbuchstaben ein flacher Bogen nach innen, am tiefsten Punkt bei E bzw. B etwa 5 m vom Hufschlag entfernt, zurück zum zweiten Eckbuchstaben." },
    { evidence: "vereinfachung", text: "Die Linie ist flach – die Kunst liegt nicht in der Wendung, sondern im zweimaligen Umstellen ohne Takt- und Tempoverlust." },
  ],
  mistakes: pick("umstellen", "takt", "schief"),
  tips: ["Bleib flach: 5 m sind weniger, als es sich anfühlt.", "Stell rechtzeitig um – der Bogen ist schneller vorbei, als man denkt."],
  quiz: [
    {
      id: "q-um",
      prompt: "Wie oft stellst du das Pferd bei der einfachen Schlangenlinie um?",
      options: [
        { id: "zwei", text: "Zweimal – zum tiefsten Punkt hin und zurück" },
        { id: "ein", text: "Einmal, am tiefsten Punkt" },
        { id: "kein", text: "Gar nicht" },
      ],
      answer: "zwei",
      explanation: "Erst wird zur Bande hin umgestellt, dann wieder zurück – die Hand bleibt gleich.",
    },
    {
      id: "q-tiefe",
      prompt: "Wie weit führt die einfache Schlangenlinie in die Bahn hinein?",
      options: [
        { id: "fuenf", text: "Bis etwa 5 m vom Hufschlag" },
        { id: "mitte", text: "Bis zur Mittellinie" },
        { id: "eins", text: "Nur einen Meter" },
      ],
      answer: "fuenf",
      explanation: "Der tiefste Punkt liegt auf Höhe von E bzw. B, etwa 5 m vom Hufschlag.",
    },
  ],
  relatedLessons: [LESSON.schlange],
  relatedSkillIds: ["skill_change", "skill_line"],
});

/* ===================================================================== */
/* 10 Acht aus zwei Volten (E – X – B)                                    */
/* ===================================================================== */

export const acht = base({
  id: "arena_figure_eight",
  slug: "acht",
  title: "Acht",
  titleDe: "Acht aus zwei Volten",
  description: "Zwei 10-m-Volten bei E und B, die sich bei X berühren. Bei X wird umgestellt – eine schöne Übung für Biegung in beide Richtungen.",
  difficulty: 2,
  learnMinutes: 8,
  changesRein: false,
  objectives: ["Zwei gleich runde Volten aneinanderreihen", "Bei X umstellen", "Nach der Acht auf derselben Hand weiterreiten"],
  prerequisites: ["Volte"],
  built: sizes((L) => {
    const r = 5;
    const pb = new PathBuilder({ x: L / 2 + 12, y: 0 });
    pb.lineTo({ x: L / 2, y: 0 }).mark("e");
    pb.arcAround({ x: L / 2, y: 5 }, -180).mark("x1");
    pb.arcAround({ x: L / 2, y: 15 }, 360).mark("x2");
    pb.arcAround({ x: L / 2, y: 5 }, -180).mark("e2");
    pb.lineTo({ x: L / 2 - 8, y: 0 });
    const e = (k: string) => pb.at(k);
    return {
      segs: pb.build(),
      len: pb.length,
      phases: [
        straight({ id: "g1", from: 0, to: e("e") - 4, title: "Auf dem Hufschlag Richtung [E]", summary: "Gerade, im Takt – die Acht vorbereiten.", look: "Geradeaus, [E] im Blick.", pause: true }),
        turnIn({ id: "t1", from: e("e") - 4, to: e("e") + Q(r), bend: "links", title: "Bei [E] in die erste Volte", summary: "Volte nach innen beginnen – sie berührt X.", look: "Auf die Volte schauen, Richtung X.", pause: true }),
        turnHold({ id: "h1", from: e("e") + Q(r), to: e("x1") - 3, bend: "links", title: "Erste Volte bis X", summary: "Gleichmäßig gebogen auf X zu.", look: "X anpeilen.", pause: true }),
        change({ id: "w1", from: e("x1") - 3, to: e("x1") + 3, nextBend: "rechts", title: "Bei X umstellen", summary: "Am Berührungspunkt einen Moment gerade, dann Stellung, Biegung und Gewicht auf die neue Seite.", look: "Über X in die zweite Volte schauen.", pause: true }),
        turnHold({ id: "h2", from: e("x1") + 3, to: e("x2") - 3, bend: "rechts", title: "Zweite Volte bei [B]", summary: "Die zweite Volte genauso rund wie die erste – sie berührt den Hufschlag bei [B].", look: "Zu [B], dann zurück zu X.", pause: true }),
        change({ id: "w2", from: e("x2") - 3, to: e("x2") + 3, nextBend: "links", title: "Bei X zurück umstellen", summary: "Wieder einen Moment gerade, dann auf die alte Seite umstellen.", look: "Über X zurück Richtung [E] schauen." }),
        turnHold({ id: "h3", from: e("x2") + 3, to: e("e2") - 1, bend: "links", title: "Zurück zu [E]", summary: "Die erste Volte zu Ende reiten.", look: "Auf [E] schauen." }),
        straight({ id: "g2", from: e("e2") - 1, to: 1e4, title: "Auf dem Hufschlag weiter", summary: "Bei [E] Stellung aufgeben, gerade weiter auf derselben Hand.", look: "Geradeaus Richtung [K]." }),
      ],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Bei der Acht reihst du zwei Volten aneinander. Am Berührungspunkt wird das Pferd kurz gerade gerichtet und umgestellt – Stellung, Biegung und Gewicht wechseln auf die neue Seite." },
    { evidence: "vereinfachung", text: "Eine Acht zeigt dir sofort, auf welcher Seite dein Pferd sich leichter biegt – die beiden Volten fühlen sich selten gleich an." },
  ],
  mistakes: pick("umstellen", "innen", "aussen", "takt"),
  tips: ["Beide Volten gleich groß: Die erste gibt das Maß vor.", "X ist dein Umstellpunkt – schau ihn schon in der ersten Volte an."],
  quiz: [
    {
      id: "q-wo",
      prompt: "Wo stellst du bei der Acht um?",
      options: [
        { id: "X", text: "Bei X, wo sich die Volten berühren" },
        { id: "E", text: "Bei E" },
        { id: "B", text: "Bei B" },
      ],
      answer: "X",
      explanation: "Die Volten bei E und B berühren sich bei X – dort wechselt die Biegung.",
    },
    Q_INNER_LEG,
  ],
  relatedLessons: [LESSON.volten],
  relatedSkillIds: ["skill_bend", "skill_change"],
});

export const WELLE_1: ArenaExercise[] = [
  ganzeBahn,
  ecken10,
  ecken6,
  halbeBahn,
  wechselGanze,
  wechselHalbe,
  volte10,
  volte8,
  kehrtvolte10,
  kehrtvolte8,
  schlange3,
  schlange4,
  schlangeEinfach,
  acht,
];
