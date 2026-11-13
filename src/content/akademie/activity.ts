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
export function lessonActivity(lesson: AcademyLesson, locale: "de" | "en" = "de"): Activity {
  if (lesson.deep) return deepLessonActivity(lesson, locale);
  const id = lesson.id;
  const en = locale === "en";
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
      text: en
        ? "Did you know? You'll hear these terms at the yard and in your riding lessons."
        : "Schon gewusst? Diese Fachbegriffe hörst du im Stall und in der Reitstunde.",
      visual: {
        kind: "doc",
        doc: { style: "lesson", label: en ? "Did you know?" : "Schon gewusst?", title: en ? "Key terms" : "Fachbegriffe", lines: lesson.terms.map((t) => `${t.term}: ${t.meaning}`) },
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
      text: en
        ? level === "leicht"
          ? "Great! Here's something to remember."
          : "Well done! Here's your key takeaway."
        : level === "leicht"
          ? "Super! Diesen Merksatz nimmst du mit."
          : "Gut gemacht! Diesen Merksatz nimmst du mit.",
      visual: { kind: "doc", doc: { style: "lesson", label: en ? "Key takeaway" : "Merksatz", title: merksatz, lines: [] } },
    });
  });

  return { id, title: lesson.title, intro: lesson.intro, steps };
}

const card = (label: string, title: string | undefined, lines: string[], table?: string[][]) => ({
  kind: "doc" as const,
  doc: { style: "lesson" as const, label, title, lines, table },
});

/**
 * Ausführliche Lektion (Module 10–14):
 * Einstieg → Fachwissen (Abschnitte mit Überschrift) → Fachbegriffe → Praxisbeispiel →
 * Entscheidungsübung → Häufige Fehler → So machst du es richtig → Wissenstest → Merke dir das.
 * „Weiterlernen“ erscheint am Ende als Links (LessonScreen).
 */
function deepLessonActivity(lesson: AcademyLesson, locale: "de" | "en"): Activity {
  const d = lesson.deep!;
  const id = lesson.id;
  const en = locale === "en";
  const steps: Step[] = [];

  steps.push({ type: "story", id: `${id}-einstieg`, speaker: lesson.speaker, text: lesson.intro });

  d.sections.forEach((s, i) => {
    steps.push({
      type: "story",
      id: `${id}-wissen-${i + 1}`,
      speaker: "erzaehler",
      title: s.heading,
      text: s.text,
      visual: s.visual ?? (i === 0 ? lesson.illustration : undefined),
    });
  });

  if (lesson.terms?.length) {
    steps.push({
      type: "story",
      id: `${id}-fachbegriffe`,
      speaker: "erzaehler",
      text: en ? "Key terms from this lesson at a glance." : "Die wichtigsten Fachbegriffe dieser Lektion auf einen Blick.",
      visual: card(en ? "Did you know?" : "Schon gewusst?", en ? "Key terms" : "Fachbegriffe", lesson.terms.map((t) => `${t.term}: ${t.meaning}`)),
    });
  }

  steps.push({
    type: "story",
    id: `${id}-praxis`,
    speaker: lesson.speaker,
    title: en ? `In practice: ${d.praxis.title}` : `Aus der Praxis: ${d.praxis.title}`,
    text: d.praxis.text,
  });

  steps.push(...lesson.exercise);

  steps.push({
    type: "story",
    id: `${id}-fehler`,
    speaker: "erzaehler",
    text: en ? "These mistakes happen often – and this is how to do better." : "Diese Fehler passieren häufig – und so machst du es besser.",
    visual: card(en ? "Common mistakes" : "Häufige Fehler", undefined, d.fehler.map((f) => `✗ ${f.fehler} → ✓ ${f.besser}`)),
  });

  steps.push({
    type: "story",
    id: `${id}-richtig`,
    speaker: "erzaehler",
    text: en ? "Step by step – how to do it right." : "Schritt für Schritt: So machst du es richtig.",
    visual: card(en ? "How to do it right" : "So machst du es richtig", undefined, d.richtig.map((r, i) => `${i + 1}. ${r}`)),
  });

  steps.push(...lesson.quiz.map((q) => questionStep(id, q)));

  steps.push({
    type: "story",
    id: `${id}-merke`,
    speaker: lesson.speaker,
    text: en ? "Well done! Remember these points." : "Gut gemacht! Das nimmst du aus dieser Lektion mit.",
    visual: card(en ? "Remember" : "Merke dir das", undefined, d.merke),
  });

  return { id, title: lesson.title, intro: lesson.intro, steps };
}
