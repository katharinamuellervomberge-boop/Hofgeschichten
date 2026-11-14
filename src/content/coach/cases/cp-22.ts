import type { CoachProblemContent } from "../types";

/**
 * cp-22 „Mein Pferd rennt beim Angaloppieren los.“ – vollständiger Coaching-Fall (14.11.2026).
 * Fachlicher Entwurf nach FN-Reitlehre – vor Veröffentlichung von einer Reitlehrkraft prüfen lassen.
 *
 * Fragen nach der Sicherheitsprüfung: 5–7 je nach Antworten (Verzweigung über showIf).
 * Regeln: jede Antwort vergibt Punkte an mögliche Ursachen. Eine Ursache erscheint nur, wenn
 * mindestens eine Regel mit zusammen ≥ 2 Punkten zutrifft (engine.ts → MATCH_MIN).
 */
export const cp22: CoachProblemContent = {
  id: "cp-22",
  review: "entwurf",
  intro: "Ein Pferd, das beim Angaloppieren losstürmt, hat dafür meist einen Grund – oft sind es mehrere zusammen. Ein paar Fragen helfen, deine Situation einzuordnen.",
  understand: [
    "Der Galopp ist ein Dreitakt. Der erste Galoppsprung beginnt mit dem äußeren Hinterbein – dafür muss das Pferd sein Gewicht kurz etwas nach hinten nehmen.",
    "Fehlt dieses Gleichgewicht, versucht das Pferd, den Galopp über Tempo zu finden: Es trabt schneller, bis es irgendwie anspringt, oder es stürmt im ersten Sprung los.",
    "Deshalb liegt der Schlüssel meist vor der Hilfe: ein ruhiger, gleichmäßiger Trab, eine halbe Parade zur Vorbereitung, ein ruhiger Sitz – und dann eine einzige, klare Galopphilfe: innerer Schenkel am Gurt, äußerer Schenkel eine Handbreit dahinter.",
  ],
  questions: [
    {
      id: "q-wann",
      text: "Wann tritt das Problem auf?",
      options: [
        { id: "immer", label: "Bei fast jedem Angaloppieren", summary: "es passiert bei fast jedem Angaloppieren", causes: { "c-vorbereitung": 1, "c-hilfen": 1 } },
        { id: "hand", label: "Vor allem auf einer Hand", summary: "es passiert vor allem auf einer Hand", causes: { "c-schiefe": 3 } },
        { id: "ende", label: "Vor allem gegen Ende des Trainings", summary: "es passiert vor allem gegen Ende des Trainings", causes: { "c-kraft": 3 } },
        { id: "situation", label: "Nur in bestimmten Situationen", summary: "es passiert nur in bestimmten Situationen" },
      ],
    },
    {
      id: "q-situation",
      text: "In welcher Situation besonders?",
      showIf: { q: "q-wann", anyOf: ["situation"] },
      options: [
        { id: "draussen", label: "Draußen oder auf ungewohnten Plätzen", summary: "vor allem draußen oder an ungewohnten Orten", causes: { "c-umgebung": 3 } },
        { id: "andere", label: "Wenn andere Pferde galoppieren oder vorbeikommen", summary: "vor allem, wenn andere Pferde galoppieren", causes: { "c-umgebung": 3 } },
        { id: "stelle", label: "Immer an derselben Stelle der Bahn", summary: "immer an derselben Stelle der Bahn", causes: { "c-erwartung": 3 } },
        { id: "stehtage", label: "Nach Stehtagen oder wenig Bewegung", summary: "vor allem nach Stehtagen", causes: { "c-energie": 3 } },
      ],
    },
    {
      id: "q-reaktion",
      text: "Wie reagiert dein Pferd auf deine Galopphilfe?",
      options: [
        { id: "trab", label: "Es wird erst im Trab immer schneller", summary: "es wird vor dem Anspringen im Trab schneller", causes: { "c-trabtempo": 2, "c-vorbereitung": 2 } },
        { id: "sofort", label: "Es springt an, wird aber sofort eilig", summary: "es springt an, wird aber sofort eilig", causes: { "c-kraft": 1, "c-vorbereitung": 1, "c-sitz": 1 } },
        { id: "kaum", label: "Erst kaum – dann treibe ich mehr und es schießt los", summary: "es reagiert erst kaum und schießt dann los", causes: { "c-hilfen": 3 } },
        { id: "falsch", label: "Es springt oft im falschen Galopp an", summary: "es springt oft im falschen Galopp an", causes: { "c-vorbereitung": 2, "c-schiefe": 1 } },
      ],
    },
    {
      id: "q-reiter",
      text: "Was passiert bei dir selbst beim Angaloppieren?",
      help: "Wenn du es nicht weißt: Lass dich einmal filmen oder frag deine Reitlehrkraft.",
      options: [
        { id: "vor", label: "Ich beuge mich nach vorne", summary: "du beugst dich beim Angaloppieren nach vorn", causes: { "c-sitz": 3 } },
        { id: "treiben", label: "Ich treibe mehrmals oder sehr kräftig", summary: "du treibst mehrmals oder sehr kräftig", causes: { "c-hilfen": 3 } },
        { id: "zuegel", label: "Ich halte am Zügel fest", summary: "du hältst beim Angaloppieren am Zügel fest", causes: { "c-hand": 3 } },
        { id: "nichts", label: "Mir fällt nichts Besonderes auf" },
        { id: "weiss-nicht", label: "Das kann ich nicht einschätzen" },
      ],
    },
    {
      id: "q-seit",
      text: "Seit wann tritt das Problem auf?",
      options: [
        { id: "laenger", label: "Schon länger", summary: "das Problem besteht schon länger", causes: { "c-erwartung": 1, "c-hilfen": 1 } },
        { id: "kurz", label: "Erst seit Kurzem", summary: "das Problem ist neu" },
        { id: "pause", label: "Seit einer Trainingspause", summary: "es begann nach einer Trainingspause", causes: { "c-kraft": 2, "c-energie": 1 } },
        { id: "weiss-nicht", label: "Weiß ich nicht" },
      ],
    },
    {
      id: "q-veraendert",
      text: "Hat sich in letzter Zeit etwas verändert?",
      showIf: { q: "q-seit", anyOf: ["kurz"] },
      options: [
        { id: "ausruestung", label: "Neuer Sattel oder andere Ausrüstung", summary: "die Ausrüstung hat sich verändert", flag: "abklaeren", causes: { "c-koerper": 3 } },
        { id: "haltung", label: "Haltung, Fütterung oder Weidegang", summary: "Haltung oder Fütterung haben sich verändert", causes: { "c-energie": 2 } },
        { id: "reiter", label: "Neue Reiterin, neuer Reiter oder neuer Reitplatz", summary: "Reiter oder Reitplatz sind neu", causes: { "c-umgebung": 1, "c-hilfen": 1 } },
        { id: "nichts", label: "Nichts, das ich kenne", summary: "es gibt keinen erkennbaren Grund für die Veränderung", flag: "abklaeren", causes: { "c-koerper": 2 } },
      ],
    },
    {
      id: "stand",
      text: "Wie schätzt du deinen eigenen Reitstand ein?",
      help: "Danach richtet sich, welche Übungen vorgeschlagen werden.",
      options: [
        { id: "anfaenger", label: "Ich lerne gerade erst galoppieren" },
        { id: "basis", label: "Ich galoppiere sicher, aber noch nicht lange" },
        { id: "wieder", label: "Ich steige nach einer Pause wieder ein" },
        { id: "fortgeschritten", label: "Ich reite sicher in allen Grundgangarten" },
      ],
    },
  ],
  causes: [
    {
      id: "c-vorbereitung",
      title: "Fehlende Balance vor dem Angaloppieren",
      text: "Für einen ruhigen ersten Galoppsprung braucht das Pferd Gleichgewicht. Fehlt die Vorbereitung, sucht es den Galopp oft über Tempo – es wird schneller oder stürmt los.",
      exercises: ["ex-hilfe-1", "ex-ueb-2", "ex-gal-3"],
    },
    {
      id: "c-trabtempo",
      title: "Zu hohes Trabtempo vor der Hilfe",
      text: "Wird der Trab vor der Galopphilfe immer schneller, kommt das Pferd auf die Vorhand. Aus einem eiligen Trab springt es eher hastig an – oder trabt einfach noch schneller.",
      exercises: ["ex-trab-1", "ex-ueb-2", "ex-gal-3"],
    },
    {
      id: "c-hilfen",
      title: "Unklare oder zu starke Galopphilfe",
      text: "Werden die Hilfen mehrmals wiederholt oder immer stärker, lernt das Pferd leicht: erst schneller werden, dann anspringen. Eine einzige, klare und gut vorbereitete Hilfe ist leichter zu verstehen.",
      exercises: ["ex-hilfe-1", "ex-gal-3", "ex-gal-1"],
    },
    {
      id: "c-sitz",
      title: "Der Sitz beim Angaloppieren",
      text: "Neigt sich der Oberkörper beim Angaloppieren nach vorn, verlagert sich Gewicht Richtung Vorhand. Viele Pferde antworten darauf, indem sie schneller werden.",
      exercises: ["ex-sitz-1", "ex-gal-3", "ex-gal-1"],
    },
    {
      id: "c-hand",
      title: "Eine festhaltende Hand",
      text: "Hält die Hand im Moment des Angaloppierens fest, kann das Pferd den Hals für den Galoppsprung kaum nutzen. Manche Pferde eilen dann gegen die Hand.",
      exercises: ["ex-hilfe-2", "ex-gy-2", "ex-gal-3"],
    },
    {
      id: "c-kraft",
      title: "Kraft, Kondition oder Koordination",
      text: "Galopp ist anstrengend. Fehlt Kraft – etwa nach einer Pause, bei jungen Pferden oder gegen Ende des Trainings – rettet sich ein Pferd oft ins Tempo, statt im Gleichgewicht zu galoppieren.",
      exercises: ["ex-gal-4", "ex-st-1", "ex-bo-3"],
    },
    {
      id: "c-schiefe",
      title: "Natürliche Schiefe – eine Hand fällt schwerer",
      text: "Fast jedes Pferd hat eine Hand, auf der Stellung, Biegung und Galopp leichter fallen. Auf der schwierigeren Seite fehlt oft Balance: Das Pferd eilt oder springt falsch an.",
      exercises: ["ex-dr-1", "ex-trab-1", "ex-gal-3"],
    },
    {
      id: "c-umgebung",
      title: "Aufregung durch Umgebung oder andere Pferde",
      text: "Pferde sind Herden- und Fluchttiere. Galoppierende Artgenossen oder eine ungewohnte Umgebung können so aufregen, dass sie im Galopp losstürmen.",
      exercises: ["ex-ueb-1", "ex-hilfe-1", "ex-trab-1"],
    },
    {
      id: "c-erwartung",
      title: "Gelernte Erwartung",
      text: "Wird oft an derselben Stelle angaloppiert, nimmt das Pferd den Galopp vorweg und stürmt los, bevor die Hilfe kommt.",
      exercises: ["ex-ueb-1", "ex-gal-3", "ex-trab-1"],
    },
    {
      id: "c-energie",
      title: "Viel überschüssige Energie",
      text: "Nach Stehtagen oder bei wenig Bewegung haben manche Pferde viel Energie. Freie Bewegung, ruhiges Lösen oder Longieren vor dem Reiten können helfen. Fragen zur Fütterung gehören zu einer Fachperson.",
      exercises: ["ex-bo-3", "ex-trab-1", "ex-ueb-2"],
    },
    {
      id: "c-koerper",
      title: "Mögliche körperliche Ursache oder Ausrüstung",
      text: "Rückenbeschwerden, ein nicht passender Sattel, Probleme mit den Zähnen oder im Bewegungsapparat können dazu führen, dass ein Pferd beim Angaloppieren eilt oder sich entzieht. Das kann nur eine Fachperson beurteilen.",
      exercises: [],
      health: true,
    },
  ],
  fallback: ["ex-trab-1", "ex-hilfe-1", "ex-ueb-2"],
  gentle: ["ex-trab-1", "ex-hilfe-1", "ex-hilfe-2", "ex-ueb-1"],
  mistakes: [
    "Die Galopphilfe so lange wiederholen, bis das Pferd losstürmt",
    "Nach dem Losstürmen sofort am Zügel ziehen, statt ruhig durchzuparieren und neu vorzubereiten",
    "Zu lange galoppieren – das Pferd ermüdet und wird noch eiliger",
    "Immer an derselben Stelle angaloppieren",
  ],
  safety: [
    "Übe auf einem eingezäunten Platz mit genug Abstand zu anderen Reitern.",
    "Ziehe vor dem Galoppieren den Gurt nach.",
    "Wenn du dich unsicher fühlst: nur mit Reitlehrkraft oder an der Longe üben.",
  ],
  checkWhen: [
    "Dein Pferd buckelt, steigt oder schlägt beim Angaloppieren mit dem Kopf.",
    "Das Problem ist plötzlich aufgetreten oder wird trotz Training stärker.",
    "Dein Pferd reagiert empfindlich beim Satteln, Gurten oder Putzen am Rücken.",
  ],
  lessons: ["ra-w18-l13", "ra-w18-l12", "ra-w6-l3", "ra-w6-l4", "ra-w18-l11"],
  riderLab: ["rl-09", "rl-11", "rl-12"],
  plan: {
    goal: "Ruhig angaloppieren",
    weeks: [
      { title: "Ruhiger Trab als Basis", focus: "Trabtempo und Übergänge", exercises: ["ex-trab-1", "ex-hilfe-1", "ex-ueb-2"] },
      { title: "Angaloppieren vorbereiten", focus: "Vorbereitung und eine klare Hilfe", exercises: ["ex-ueb-2", "ex-gal-3"] },
      { title: "Kurz und ruhig galoppieren", focus: "Kurze Reprisen, viele Pausen", exercises: ["ex-gal-3", "ex-gal-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-trab-1", "ex-gal-3"] },
    ],
  },
};
