import { PathBuilder } from "../build";
import type { ArenaExercise, Phase, QuizQuestion } from "../types";
import { base, LESSON, pick, sizes } from "./bahnfiguren";
import { canterDepart, canterHold, downward, prepare, standing, straight, turnHold, turnIn, upward, X_HALT_NOTE } from "./common";

/**
 * Welle 2 der Reitbahn (18.11.2026): Übergänge nach FN-Lehre, linke Hand.
 * Halten bei A, C, E, B oder X (Festlegung der Inhaberin); X ist schwieriger, weil keine Bande hilft.
 * Prüfstatus: freigegeben durch die Inhaberin (18.11.2026).
 */

const REVIEW_DRAFT = { status: "freigegeben" as const, note: "Nach FN-Lehre geschrieben, fachlich geprüft und freigegeben durch die Inhaberin am 18.11.2026." };
const HALT_SECONDS = 4;
const Q10 = (Math.PI * 10) / 2;

const Q_DOWN: QuizQuestion = {
  id: "q-parade",
  prompt: "Womit parierst du durch?",
  options: [
    { id: "zusammen", text: "Mit Sitz, Schenkel und Zügel zusammen – die Hand nimmt an und gibt nach" },
    { id: "zuegel", text: "Mit beiden Zügeln, bis das Pferd langsamer wird" },
    { id: "beine", text: "Ich nehme die Schenkel weg, damit das Pferd langsamer wird" },
  ],
  answer: "zusammen",
  explanation: "Eine Parade ist ein Zusammenspiel. Die Schenkel bleiben dran, damit die Hinterbeine weiter untertreten; die Hand gibt nach, sobald das Pferd reagiert.",
};

const Q_PREP: QuizQuestion = {
  id: "q-ankuendigen",
  prompt: "Womit kündigst du einen Übergang an?",
  options: [
    { id: "halbe", text: "Mit einer halben Parade, etwa eine Pferdelänge vorher" },
    { id: "stimme", text: "Nur mit der Stimme, genau am Punkt" },
    { id: "nichts", text: "Gar nicht – das Pferd soll überrascht reagieren" },
  ],
  answer: "halbe",
  explanation: "Die halbe Parade macht das Pferd aufmerksam. So kommt der Übergang pünktlich und weich.",
};

/* ===================================================================== */
/* 1 Übergänge auf dem Zirkel: Schritt – Trab – Schritt                   */
/* ===================================================================== */

export const zirkelUebergaenge = base({
  category: "uebergang",
  review: REVIEW_DRAFT,
  id: "arena_circle_transitions",
  slug: "uebergaenge-auf-dem-zirkel",
  title: "Übergänge auf dem Zirkel",
  titleDe: "Schritt – Trab – Schritt auf dem Zirkel",
  description: "Auf dem 20-m-Zirkel bei A antraben und an der Mittellinie wieder zum Schritt durchparieren. Die gebogene Linie hilft, die Übergänge rund und im Gleichgewicht zu reiten.",
  difficulty: 1,
  learnMinutes: 8,
  changesRein: false,
  objectives: ["Übergänge mit halben Paraden vorbereiten", "Antraben mit treibenden Schenkeln und nachgebender Hand", "Zum Schritt durchparieren, ohne am Zügel zu ziehen", "Dabei die Kreislinie halten"],
  prerequisites: ["Zirkel"],
  built: sizes((L) => {
    const C = { x: 10, y: 10 };
    const pb = new PathBuilder({ x: 26, y: 0 }, "schritt");
    pb.lineTo({ x: 10, y: 0 }).mark("z").arcAround(C, -90).mark("a").setGait("trab").arcAround(C, -180).mark("x").setGait("schritt").arcAround(C, -90).mark("ze").lineTo({ x: 4, y: 0 });
    const e = (k: string) => pb.at(k);
    const mid = L === 40 ? "bei X" : "an der Mittellinie";
    const phases: Phase[] = [
      straight({ id: "g1", gait: "schritt", from: 0, to: e("z") - 4, title: "Im Schritt auf den Zirkel zu", summary: "Fleißiger Schritt auf dem Hufschlag.", look: "Geradeaus – den Zirkelpunkt schon im Blick.", pause: true }),
      turnIn({ id: "t1", gait: "schritt", from: e("z") - 4, to: e("z") + 4, bend: "links", title: "Im Schritt auf den Zirkel", summary: "Wie beim Zirkel im Trab: stellen, Blick auf die Kreislinie.", look: "Ein Viertel des Zirkels voraus schauen – Richtung A.", pause: true }),
      prepare({ id: "v1", gait: "schritt", bend: "links", from: e("z") + 4, to: e("a"), title: "Antraben vorbereiten", summary: "Eine Pferdelänge vor A mit einer halben Parade ankündigen.", look: "Auf A schauen – dort trabst du an.", pause: true }),
      upward({ id: "u1", gait: "trab", bend: "links", from: e("a"), to: e("a") + 5, title: "Bei A antraben", summary: "Beide Schenkel treiben, die Hand gibt etwas nach – das Pferd trabt auf der Kreislinie an.", look: "Weiter auf der Kreislinie schauen.", pause: true }),
      turnHold({ id: "h1", gait: "trab", bend: "links", from: e("a") + 5, to: e("x") - 7, title: "Im Trab auf der Kreislinie", summary: "Takt finden, Hilfen werden leiser.", look: `Zum nächsten Berührpunkt, dann ${mid === "bei X" ? "zu X" : "zur Mittellinie"}.`, pause: true }),
      prepare({ id: "v2", gait: "trab", bend: "links", from: e("x") - 7, to: e("x"), title: "Durchparieren vorbereiten", summary: `Eine Pferdelänge vorher aussitzen und mit halben Paraden ankündigen.`, look: `Auf den Punkt ${mid} schauen.`, pause: true }),
      downward({ id: "d1", gait: "schritt", toGait: "schritt", bend: "links", from: e("x"), to: e("x") + 4, title: `${mid.charAt(0).toUpperCase()}${mid.slice(1)} zum Schritt`, summary: "Sitz, Schenkel und Zügel zusammen. Sobald das Pferd schreitet, gibt die Hand nach.", look: "Weiter auf der Kreislinie schauen.", pause: true }),
      turnHold({ id: "h2", gait: "schritt", bend: "links", from: e("x") + 4, to: e("ze") - 1, title: "Im Schritt auf der Kreislinie", summary: "Fleißig weiterschreiten, die Linie halten.", look: "Zum Zirkelpunkt am Hufschlag." }),
      straight({ id: "g2", gait: "schritt", from: e("ze") - 1, to: 1e4, title: "Zurück auf den Hufschlag", summary: "Stellung aufgeben, gerade weiter.", look: "Geradeaus Richtung [K]." }),
    ];
    return {
      segs: pb.build(),
      len: pb.length,
      phases,
      ann: [
        { at: { x: 0, y: 10 }, label: "antraben", kind: "uebergang", followsPath: true },
        { at: { x: 20, y: 10 }, label: "Schritt", kind: "uebergang", followsPath: true },
      ],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Übergänge gehören zur Grundausbildung: Sie machen das Pferd aufmerksam für die Hilfen und fördern die Durchlässigkeit. Auf der gebogenen Linie fällt es vielen Pferden leichter, im Gleichgewicht zu bleiben." },
    { evidence: "vereinfachung", text: "Ein guter Übergang ist pünktlich und weich – das Pferd wird weder hektisch noch fällt es auseinander." },
  ],
  mistakes: pick("unvorbereitet", "ziehen", "festhalten", "vorlehnen", "innen"),
  tips: ["Zähle laut mit: „und – an“ beim Antraben, „und – Schritt“ beim Durchparieren.", "Wiederhole den Übergang lieber dreimal weich als einmal perfekt."],
  quiz: [Q_PREP, Q_DOWN],
  relatedLessons: [LESSON.zirkelVolte],
  relatedSkillIds: ["skill_transitions", "skill_rhythm"],
});

/* ===================================================================== */
/* 2 Halten und Anreiten aus dem Schritt (E / A / X)                      */
/* 3 Halten aus dem Trab (E / X)                                          */
/* ===================================================================== */

type HaltPlace = "E" | "A" | "X";

function halten(place: HaltPlace, from: "schritt" | "trab"): ArenaExercise {
  const trab = from === "trab";
  const label = place === "E" ? "bei E" : place === "A" ? "bei A" : "bei X";
  const placeTxt = place === "E" ? "[E]" : place;
  return base({
    category: "uebergang",
    review: REVIEW_DRAFT,
    id: `arena_halt_${trab ? "trot" : "walk"}_${place.toLowerCase()}`,
    slug: `${trab ? "halten-aus-dem-trab" : "halten-und-anreiten"}${place === "E" ? "" : "-" + place.toLowerCase()}`,
    group: trab ? "halten-trab" : "halten-schritt",
    variantLabel: label,
    title: trab ? "Halten aus dem Trab" : "Halten und Anreiten",
    titleDe: trab ? "Trab – Halt – Schritt" : "Schritt – Halt – Schritt",
    description: trab
      ? "Aus dem Trab zum Halten durchparieren – direkt oder über wenige Schritte – und im Schritt wieder anreiten. Halten bei X ist schwieriger, weil keine Bande hilft."
      : "Aus dem Schritt zum Halten durchparieren, ruhig stehen und wieder anreiten. Halten bei X ist schwieriger, weil keine Bande hilft.",
    difficulty: trab ? 2 : place === "X" ? 2 : 1,
    learnMinutes: 6,
    changesRein: false,
    objectives: ["Den Halt mit halben Paraden vorbereiten", "Mit Sitz, Schenkel und Zügel zusammen zum Halten kommen", "Gerade und geschlossen stehen", "Weich anreiten"],
    prerequisites: trab ? ["Halten und Anreiten aus dem Schritt"] : ["Ganze Bahn im Schritt"],
    built: sizes((L) => {
      const pb = new PathBuilder({ x: place === "E" ? L / 2 + 16 : 12, y: 0 }, from);
      const pre: Phase[] = [];
      if (place === "E") {
        pb.lineTo({ x: L / 2, y: 0 }).mark("h");
      } else if (place === "A") {
        pb.smooth([{ x: 0, y: 0 }, { x: 0, y: 10 }], 3, { 0: "e" }).mark("h");
      } else {
        pb.smooth([{ x: 0, y: 0 }, { x: 0, y: 10 }, { x: L / 2, y: 10 }], [3, 4], { 0: "e", 1: "a" }).mark("h");
      }
      pb.halt(HALT_SECONDS).setGait("schritt");
      if (place === "E") pb.lineTo({ x: L / 2 - 10, y: 0 });
      else if (place === "A") pb.smooth([{ x: 0, y: 20 }, { x: 8, y: 20 }], 3, { 0: "e2" });
      else pb.smooth([{ x: L, y: 10 }, { x: L, y: 0 }, { x: L - 8, y: 0 }], [4, 3], { 0: "c", 1: "c2" });
      const e = (k: string) => pb.at(k);
      const h = e("h");
      // bei A ist die kurze Seite nach der Ecke kurz: Vorbereiten beginnt gleich nach der Ecke
      const approachEnd = place === "A" ? e("e_e") : h - (trab ? 10 : 8);
      if (place === "E") {
        pre.push(straight({ id: "g1", gait: from, from: 0, to: approachEnd, title: `Im ${trab ? "Trab" : "Schritt"} Richtung ${placeTxt}`, summary: "Gerade auf dem Hufschlag, gleichmäßiges Tempo.", look: `${placeTxt} anpeilen.`, pause: true }));
      } else {
        pre.push(straight({ id: "g1", gait: from, from: 0, to: e("e") - 2, title: "Auf die kurze Seite zu", summary: "Gerade auf dem Hufschlag.", look: "Geradeaus auf die Ecke.", pause: true }));
        if (place === "A") {
          pre.push(turnIn({ id: "t1", gait: from, from: e("e") - 2, to: e("e_e"), bend: "links", title: "Ecke vor A", summary: "Durch die Ecke, dann gerade auf A zu.", look: "Auf A schauen – dort hältst du.", pause: true }));
        } else {
          pre.push(turnIn({ id: "t1", gait: from, from: e("e") - 2, to: e("a_e"), bend: "links", title: "Ecke und bei A auf die Mittellinie", summary: "Durch die Ecke und bei A auf die Mittellinie abwenden.", look: "Auf der Mittellinie geradeaus über X auf C schauen.", pause: true }));
          pre.push(straight({ id: "g2", gait: from, from: e("a_e"), to: approachEnd, title: "Gerade auf der Mittellinie", summary: "Ohne Bande: Beide Schenkel und beide Zügel halten das Pferd gerade.", look: "C fest anpeilen – so bleibt die Linie gerade.", pause: true, extra: [X_HALT_NOTE], mistakes: ["schief"] }));
        }
      }
      const phases: Phase[] = [
        ...pre,
        prepare({ id: "v1", gait: from, from: approachEnd, to: h - 3, title: "Halten vorbereiten", summary: trab ? "Aussitzen und mit halben Paraden ankündigen. Zu Beginn darf das Pferd über wenige Schritte zum Halten kommen." : "Mit halben Paraden ankündigen.", look: `${placeTxt} anpeilen – dort steht dein Pferd.`, pause: true }),
        downward({ id: "d1", gait: from, toGait: "halt", from: h - 3, to: h, title: "Zum Halten durchparieren", summary: "Sitz, Schenkel und Zügel zusammen, bis das Pferd steht. Kein Ruck am Zügel.", look: `Geradeaus über ${placeTxt} hinweg.`, pause: true, mistakes: ["ziehen", "schief-halt"] }),
        standing({ id: "s1", at: h, title: `Stehen ${place === "E" ? "bei [E]" : label}`, summary: "Gerade, geschlossen, ruhig. Die Hand gibt leicht nach.", extra: place === "X" ? [X_HALT_NOTE] : [] }),
        upward({ id: "u1", gait: "schritt", from: h, to: h + 4, title: "Im Schritt anreiten", summary: "Beide Schenkel treiben, die Hand gibt etwas nach – das Pferd geht ruhig vorwärts.", look: "Geradeaus auf den nächsten Punkt.", pause: true }),
      ];
      if (place === "E") phases.push(straight({ id: "g3", gait: "schritt", from: h + 4, to: 1e4, title: "Im Schritt weiter", summary: "Fleißig weiterschreiten.", look: "Geradeaus Richtung [K]." }));
      else if (place === "A") {
        phases.push(straight({ id: "g3", gait: "schritt", from: h + 4, to: e("e2") - 1, title: "Kurze Seite im Schritt", summary: "Fleißig weiterschreiten.", look: "Geradeaus auf die Ecke." }));
        phases.push(turnIn({ id: "t3", gait: "schritt", from: e("e2") - 1, to: 1e4, bend: "links", title: "Ecke zwischen A und [F]", summary: "Durch die Ecke auf die lange Seite.", look: "Durch die Ecke schauen." }));
      } else {
        phases.push(straight({ id: "g3", gait: "schritt", from: h + 4, to: e("c") - 2, title: "Gerade weiter Richtung C", summary: "Auf der Mittellinie bleiben.", look: "C anpeilen." }));
        phases.push(turnIn({ id: "t3", gait: "schritt", from: e("c") - 2, to: 1e4, bend: "links", title: "Bei C auf den Hufschlag abwenden", summary: "Auf den Hufschlag und durch die Ecke.", look: "Auf den Hufschlag Richtung [H] schauen." }));
      }
      return {
        segs: pb.build(),
        len: pb.length,
        phases,
        ann: [{ at: place === "E" ? { x: L / 2, y: 0 } : place === "A" ? { x: 0, y: 10 } : { x: L / 2, y: 10 }, label: "Halt", kind: "halt", followsPath: true }],
      };
    }),
    whyItWorks: [
      { evidence: "lehre", text: "Der Halt ist eine ganze Parade – mehrere halbe Paraden hintereinander, bis das Pferd steht. Gewicht, Schenkel und Zügel wirken zusammen; die Schenkel sorgen dafür, dass das Pferd mit der Hinterhand nachtritt und geschlossen steht." },
      place === "X" ? X_HALT_NOTE : { evidence: "lehre", text: "Halten an einem Buchstaben auf dem Hufschlag ist einfacher als bei X: Die Bande begrenzt auf einer Seite. Bei X müssen deine Hilfen das allein schaffen." },
      ...(trab ? [{ evidence: "vereinfachung" as const, text: "Der direkte Übergang Trab–Halt verlangt ein gut ausbalanciertes Pferd. Zu Beginn ist es richtig, über wenige Schritte zum Halten zu kommen." }] : []),
    ],
    mistakes: pick("schief-halt", "ziehen", "unvorbereitet", "vorlehnen"),
    tips: [
      place === "X" ? "Schau beim Halten bei X auf C, nicht nach unten – der Blick hält die Linie gerade." : `Halte so, dass deine Hüfte genau auf Höhe von ${placeTxt} ist.`,
      "Zähle im Stehen bis drei, bevor du anreitest – so lernt das Pferd, ruhig zu warten.",
    ],
    quiz: [
      Q_DOWN,
      {
        id: "q-x",
        prompt: "Warum ist Halten bei X schwieriger als bei E?",
        options: [
          { id: "bande", text: "Bei X hilft keine Bande – Schenkel und Zügel müssen das Pferd allein gerade halten" },
          { id: "boden", text: "Bei X ist der Boden immer tiefer" },
          { id: "weit", text: "Bei X ist der Weg dorthin länger" },
        ],
        answer: "bande",
        explanation: "Auf dem Hufschlag begrenzt die Bande eine Seite. Bei X weicht die Hinterhand leicht aus, wenn ein Schenkel nicht anliegt.",
      },
    ],
    relatedLessons: [LESSON.ganze],
    relatedSkillIds: ["skill_transitions", "skill_straight"],
  });
}

export const haltenE = halten("E", "schritt");
export const haltenA = halten("A", "schritt");
export const haltenX = halten("X", "schritt");
export const haltenTrabE = halten("E", "trab");
export const haltenTrabX = halten("X", "trab");

/* ===================================================================== */
/* 4 Angaloppieren aus dem Trab (Ecke / Zirkel)                           */
/* ===================================================================== */

function angaloppieren(where: "ecke" | "zirkel"): ArenaExercise {
  return base({
    category: "uebergang",
    review: REVIEW_DRAFT,
    id: where === "ecke" ? "arena_canter_depart_corner" : "arena_canter_depart_circle",
    slug: where === "ecke" ? "angaloppieren" : "angaloppieren-zirkel",
    group: "angaloppieren",
    variantLabel: where === "ecke" ? "in der Ecke" : "auf dem Zirkel",
    title: "Angaloppieren aus dem Trab",
    titleDe: "Trab – Galopp",
    description:
      where === "ecke"
        ? "Durch die Ecke traben, das Pferd innen stellen und beim Übergang auf die lange Seite angaloppieren. Die Ecke hilft, im richtigen Galopp anzuspringen."
        : "Auf dem Zirkel traben, das Pferd innen stellen und bei A angaloppieren. Die gebogene Linie hilft, im richtigen Galopp anzuspringen.",
    difficulty: 2,
    learnMinutes: 8,
    changesRein: false,
    objectives: ["Das Angaloppieren mit halber Parade und Stellung vorbereiten", "Mit innerem Schenkel am Gurt und äußerem verwahrendem Schenkel angaloppieren", "Im Galopp mitgehen, ohne zu schieben"],
    prerequisites: ["Zirkel", "Übergänge auf dem Zirkel"],
    built: sizes((L) => {
      if (where === "ecke") {
        const pb = new PathBuilder({ x: 14, y: 0 }, "trab");
        pb.smooth([{ x: 0, y: 0 }, { x: 0, y: 20 }, { x: 6, y: 20 }], 4, { 0: "e1", 1: "e2" }).mark("g").setGait("galopp").lineTo({ x: L - 8, y: 20 });
        const e = (k: string) => pb.at(k);
        return {
          segs: pb.build(),
          len: pb.length,
          ann: [{ at: { x: 6, y: 20 }, label: "angaloppieren", kind: "uebergang", followsPath: true }],
          phases: [
            straight({ id: "g1", gait: "trab", from: 0, to: e("e1") - 3, title: "Im Trab auf die kurze Seite", summary: "Ruhiger, gleichmäßiger Trab.", look: "Geradeaus auf die Ecke.", pause: true }),
            turnIn({ id: "t1", gait: "trab", from: e("e1") - 3, to: e("e1_e"), bend: "links", title: "Ecke zwischen [K] und A", summary: "Durch die Ecke, das Pferd bleibt gestellt.", look: "Durch die Ecke auf die kurze Seite." }),
            prepare({ id: "v1", gait: "trab", bend: "links", from: e("e1_e"), to: e("e2"), title: "Angaloppieren vorbereiten", summary: "Aussitzen, halbe Parade, Stellung innen. Innerer Schenkel am Gurt, äußerer eine Handbreit zurück.", look: "Auf die Ecke und die lange Seite dahinter schauen.", pause: true }),
            turnHold({ id: "t2", gait: "trab", from: e("e2"), to: e("g"), bend: "links", title: "In der Ecke stellen", summary: "Durch die Ecke traben – gestellt, mit den Hilfen schon in Galoppstellung.", look: "Auf die lange Seite schauen.", pause: true }),
            canterDepart({ id: "c1", from: e("g"), to: e("g") + 6, bend: "links", title: "Aus der Ecke angaloppieren", summary: "Am Ende der Ecke: innerer Schenkel gibt den Impuls, die Hand lässt den ersten Sprung heraus.", look: "Die lange Seite entlang schauen.", pause: true }),
            canterHold({ id: "h1", from: e("g") + 6, to: 1e4, bend: "links", title: "Galopp auf der langen Seite", summary: "In jedem Sprung mitgehen, leicht innen gestellt.", look: "Geradeaus Richtung [M].", pause: true }),
          ],
        };
      }
      const C = { x: 10, y: 10 };
      const pb = new PathBuilder({ x: 26, y: 0 }, "trab");
      pb.lineTo({ x: 10, y: 0 }).mark("z").arcAround(C, -90).mark("a").setGait("galopp").arcAround(C, -270).mark("ze").lineTo({ x: 4, y: 0 });
      const e = (k: string) => pb.at(k);
      return {
        segs: pb.build(),
        len: pb.length,
        ann: [{ at: { x: 0, y: 10 }, label: "angaloppieren", kind: "uebergang", followsPath: true }],
        phases: [
          straight({ id: "g1", gait: "trab", from: 0, to: e("z") - 4, title: "Im Trab auf den Zirkel zu", summary: "Ruhiger, gleichmäßiger Trab.", look: "Den Zirkelpunkt im Blick.", pause: true }),
          turnIn({ id: "t1", gait: "trab", from: e("z") - 4, to: e("z") + 3, bend: "links", title: "Auf den Zirkel", summary: "Stellen, Blick auf die Kreislinie.", look: "Ein Viertel des Zirkels voraus – Richtung A." }),
          prepare({ id: "v1", gait: "trab", bend: "links", from: e("z") + 3, to: e("a"), title: "Angaloppieren vorbereiten", summary: "Aussitzen, halbe Parade, Stellung innen. Innerer Schenkel am Gurt, äußerer eine Handbreit zurück.", look: "Auf A schauen – dort galoppierst du an.", pause: true }),
          canterDepart({ id: "c1", from: e("a"), to: e("a") + 6, bend: "links", title: "Bei A angaloppieren", summary: "Innerer Schenkel gibt den Impuls, die Hand lässt den ersten Sprung heraus.", look: "Weiter auf der Kreislinie schauen.", pause: true }),
          canterHold({ id: "h1", from: e("a") + 6, to: 1e4, bend: "links", title: "Galopp auf dem Zirkel", summary: "Im Galopprhythmus mitgehen, Kreislinie halten.", look: "Von Berührpunkt zu Berührpunkt.", pause: true }),
        ],
      };
    }),
    whyItWorks: [
      { evidence: "lehre", text: where === "ecke" ? "In der Ecke ist das Pferd ohnehin gestellt und gebogen. Angaloppiert man an ihrem Ende, springt es leichter im richtigen Galopp an." : "Auf dem Zirkel ist das Pferd gestellt und gebogen. Das hilft, im richtigen Galopp anzuspringen." },
      { evidence: "biomechanik", text: "Der Galopp ist ein Dreitakt mit Schwebephase. Er beginnt mit dem äußeren Hinterbein; das innere Beinpaar greift weiter vor." },
    ],
    mistakes: pick("falscher-galopp", "vorlehnen", "festhalten", "eilig"),
    tips: ["Galoppiere aus einem ruhigen Trab an – aus einem eiligen Trab rennt das Pferd nur schneller.", "Klappt es nicht: zurück zum Trab, ruhig neu vorbereiten, nicht im Trab treiben."],
    quiz: [
      {
        id: "q-schenkel",
        prompt: "Welcher Schenkel gibt beim Angaloppieren auf der {hand} Hand nach FN-Lehre den Impuls?",
        options: [
          { id: "links", text: "Der linke Schenkel am Gurt" },
          { id: "rechts", text: "Der rechte Schenkel am Gurt" },
        ],
        answer: { rule: "innenSeite" },
        explanation: "Der innere Schenkel – auf der {hand} Hand der {innen} – gibt am Gurt den Impuls. Der {aussen} liegt verwahrend eine Handbreit hinter dem Gurt.",
      },
      {
        id: "q-falsch",
        prompt: "Das Pferd springt im falschen Galopp an. Was tust du?",
        options: [
          { id: "neu", text: "Zurück zum Trab, ruhig neu vorbereiten und erneut angaloppieren" },
          { id: "weiter", text: "Einfach weitergaloppieren" },
          { id: "zug", text: "Am inneren Zügel ziehen, bis es umspringt" },
        ],
        answer: "neu",
        explanation: "Im falschen Galopp fehlt dem Pferd das Gleichgewicht für die Wendung. Neu vorbereiten ist der richtige Weg.",
      },
    ],
    relatedLessons: [LESSON.zirkelVolte],
    relatedSkillIds: ["skill_transitions", "skill_canter"],
  });
}

export const angaloppierenEcke = angaloppieren("ecke");
export const angaloppierenZirkel = angaloppieren("zirkel");

/* ===================================================================== */
/* 5 Vom Galopp zum Trab                                                  */
/* ===================================================================== */

export const galoppTrab = base({
  category: "uebergang",
  review: REVIEW_DRAFT,
  id: "arena_canter_to_trot",
  slug: "galopp-trab",
  title: "Vom Galopp zum Trab",
  titleDe: "Galopp – Trab",
  description: "Im Galopp auf der langen Seite, bei B zum Trab durchparieren – ruhig, ohne dass das Pferd auf die Vorhand fällt oder eilig wird.",
  difficulty: 2,
  learnMinutes: 6,
  changesRein: false,
  objectives: ["Den Übergang mit halben Paraden vorbereiten", "Mit Sitz und Schenkel durchparieren, die Hand nimmt an und gibt nach", "Im Trab sofort wieder fleißig weiterreiten"],
  prerequisites: ["Angaloppieren aus dem Trab"],
  built: sizes((L) => {
    const pb = new PathBuilder({ x: 0, y: 6 }, "galopp");
    pb.smooth([{ x: 0, y: 20 }, { x: L / 2, y: 20 }], 4, { 0: "e" }).mark("b").setGait("trab").lineTo({ x: L - 8, y: 20 });
    const e = (k: string) => pb.at(k);
    return {
      segs: pb.build(),
      len: pb.length,
      ann: [{ at: { x: L / 2, y: 20 }, label: "Trab", kind: "uebergang", followsPath: true }],
      phases: [
        canterHold({ id: "h1", from: 0, to: e("b") - 12, bend: "links", title: "Galopp durch die Ecke", summary: "Im Galopp auf die lange Seite.", look: "Auf die lange Seite und [B] schauen.", pause: true }),
        prepare({ id: "v1", gait: "galopp", bend: "links", from: e("b") - 12, to: e("b"), title: "Durchparieren vorbereiten", summary: "Mit halben Paraden ankündigen – das Pferd soll aufmerksam werden, nicht langsamer im Takt.", look: "[B] anpeilen.", pause: true }),
        downward({ id: "d1", gait: "trab", toGait: "trab", from: e("b"), to: e("b") + 5, title: "Bei [B] zum Trab", summary: "Sitz und Schenkel zuerst, die Hand nimmt an und gibt nach. Sofort fleißig weitertraben.", look: "Geradeaus die lange Seite entlang.", pause: true }),
        straight({ id: "g1", gait: "trab", from: e("b") + 5, to: 1e4, title: "Im Trab weiter", summary: "Fleißig und gerade weitertraben, die Hand gibt nach.", look: "Geradeaus Richtung [M]." }),
      ],
    };
  }),
  whyItWorks: [
    { evidence: "lehre", text: "Auch der Übergang vom Galopp zum Trab ist eine Parade: Gewicht, Schenkel und Zügel zusammen. Danach soll das Pferd sofort in einem fleißigen Trab weitergehen." },
    { evidence: "vereinfachung", text: "Viele Pferde fallen nach dem Galopp in einen eiligen Trab. Ein ruhiger Sitz und eine nachgebende Hand helfen, den Takt wiederzufinden." },
  ],
  mistakes: pick("ziehen", "vorlehnen", "unvorbereitet", "takt"),
  tips: ["Sitz die letzten Galoppsprünge ruhig aus und warte auf den Trab – nicht ihn herausziehen.", "Nach dem Übergang sofort leichttraben, wenn das Pferd den Rücken festmacht."],
  quiz: [Q_PREP, Q_DOWN],
  relatedLessons: [LESSON.ganze],
  relatedSkillIds: ["skill_transitions", "skill_canter"],
});

export const WELLE_2: ArenaExercise[] = [zirkelUebergaenge, haltenE, haltenA, haltenX, haltenTrabE, haltenTrabX, angaloppierenEcke, angaloppierenZirkel, galoppTrab];
