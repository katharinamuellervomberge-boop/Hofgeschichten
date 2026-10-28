import type { Activity, ChoiceStep, Step, StoryStep } from "@/engine/types";
import type { AcademyLesson, AcademyQuestion } from "./types";

function questionStep(lessonId: string, q: AcademyQuestion): ChoiceStep {
  const pictures = q.layout === "pictures" || q.options.some((o) => o.visual);
  return {
    type: "choice",
    id: `${lessonId}-q-${q.id}`,
    levels: q.levels,
    prompt: q.prompt,
    visual: q.visual,
    layout: pictures ? "pictures" : "list",
    options: q.options.map((o) => ({ id: o.id, label: o.label, visual: o.visual, correct: o.correct, feedback: o.feedback, levels: o.levels })),
    explain: q.explain,
  };
}

/**
 * Macht aus einer Lektion einen spielbaren Ablauf für den vorhandenen Spielkern:
 * Einstieg → Erklärung mit Bild → („Schon gewusst?“ mit Fachbegriffen) → Übung → Quiz → Merksatz.
 */
export function lessonActivity(lesson: AcademyLesson): Activity {
  const id = lesson.id;
  const steps: Step[] = [];

  steps.push({ type: "story", id: `${id}-einstieg`, speaker: lesson.speaker, text: lesson.intro });

  (["leicht", "mittel"] as const).forEach((level) => {
    lesson.explanation[level].forEach((text, i) => {
      const s: StoryStep = {
        type: "story",
        id: `${id}-erklaerung-${level}-${i + 1}`,
        levels: [level],
        speaker: "erzaehler",
        text,
        visual: i === 0 ? lesson.illustration : undefined,
      };
      steps.push(s);
    });
  });

  if (lesson.terms?.length) {
    steps.push({
      type: "story",
      id: `${id}-fachbegriffe`,
      levels: ["mittel"],
      speaker: "erzaehler",
      text: "Schon gewusst? Diese Fachbegriffe hörst du im Stall und in der Reitstunde.",
      visual: {
        kind: "doc",
        doc: { style: "lesson", label: "Schon gewusst?", title: "Fachbegriffe", lines: lesson.terms.map((t) => `${t.term}: ${t.meaning}`) },
      },
    });
  }

  steps.push(...lesson.exercise);
  steps.push(...lesson.quiz.map((q) => questionStep(id, q)));

  (["leicht", "mittel"] as const).forEach((level) => {
    const merksatz = typeof lesson.merksatz === "string" ? lesson.merksatz : lesson.merksatz[level];
    steps.push({
      type: "story",
      id: `${id}-merksatz-${level}`,
      levels: [level],
      speaker: lesson.speaker,
      text: level === "leicht" ? "Super! Diesen Merksatz nimmst du mit." : "Gut gemacht! Diesen Merksatz nimmst du mit.",
      visual: { kind: "doc", doc: { style: "lesson", label: "Merksatz", title: merksatz, lines: [] } },
    });
  });

  return { id, title: lesson.title, intro: lesson.intro, steps };
}
