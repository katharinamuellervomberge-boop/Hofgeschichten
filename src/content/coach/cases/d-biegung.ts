import type { CoachProblemContent } from "../types";
import { c, koerper, o, q, SAFE_RIDE, seit, stand, veraendert } from "./common";

/** Kategorie D – Balance, Stellung & Biegung (cp-29 … cp-36). Fachlicher Entwurf, vor Veröffentlichung prüfen lassen. */

const reiter = (text: string, opts: ReturnType<typeof o>[]) => q("q-reiter", text, [...opts, o("weiss-nicht", "Das kann ich nicht einschätzen")], { help: "Wenn du unsicher bist: Lass dich einmal filmen oder frag deine Reitlehrkraft." });
const SCHIEFE = (ex: string[] = ["ex-ger-2", "ex-dr-4"]) => c("c-schiefe", "Natürliche Schiefe", "Fast jedes Pferd ist auf einer Seite hohl und auf der anderen steif. Auf der schwierigen Seite fallen Stellung, Biegung und Linien schwerer.", ex);
const SITZ = (ex: string[] = ["ex-sitz-6", "ex-sitz-1"]) => c("c-sitz", "Gewicht und Blick", "Wohin du schaust und wie du sitzt, beeinflusst das Pferd stark. Kippst du nach innen oder außen, folgt es oft deinem Gewicht.", ex);
const KOERPER = koerper("Ist eine Seite plötzlich viel schwieriger oder wirkt das Pferd steif und ungleichmäßig, kann eine Lahmheit oder Rückenbeschwerde dahinterstecken.");

export const cp29: CoachProblemContent = {
  id: "cp-29",
  review: "entwurf",
  intro: "Fällt ein Pferd über die äußere Schulter, fehlt meist die Begrenzung durch die äußeren Hilfen – oft wird innen zu viel gezogen.",
  understand: [
    "In Wendungen braucht das Pferd eine innere Stellung und eine gleichmäßige Biegung. Der äußere Zügel und der äußere Schenkel begrenzen – sie sind die „Wand“, an der das Pferd sich orientiert.",
    "Wird viel mit dem inneren Zügel gestellt, knickt der Hals ab und die äußere Schulter fällt heraus. Das Pferd läuft dann über die Schulter statt auf der Linie.",
    "Die Lösung ist fast immer: weniger innen, mehr außen – und die Schultern statt der Nase lenken.",
  ],
  questions: [
    q("q-wann", "Wann fällt dein Pferd über die äußere Schulter?", [
      o("wendung", "In Wendungen und Volten", { "c-aussen": 2, "c-biegung": 1 }, "vor allem in Wendungen und Volten"),
      o("zirkel", "Auf dem Zirkel", { "c-aussen": 2, "c-schiefe": 1 }, "vor allem auf dem Zirkel"),
      o("tor", "In Richtung Ausgang oder anderer Pferde", { "c-ablenkung": 3 }, "in Richtung Ausgang oder anderer Pferde"),
      o("hand", "Vor allem auf einer Hand", { "c-schiefe": 3 }, "vor allem auf einer Hand"),
    ]),
    q("q-stellung", "Wie stellst du dein Pferd in der Wendung?", [
      o("viel", "Mit viel innerem Zügel", { "c-innen": 3 }, "du stellst mit viel innerem Zügel"),
      o("kaum", "Kaum", { "c-biegung": 2 }, "du stellst kaum"),
      o("normal", "Leicht nach innen"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("aussen", "Mein äußerer Schenkel liegt kaum an", { "c-aussen": 3 }, "dein äußerer Schenkel liegt kaum an"),
      o("gewicht", "Ich sitze nach außen", { "c-sitz": 3 }, "du sitzt nach außen"),
      o("nichts", "Mir fällt nichts auf"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-aussen", "Fehlende äußere Begrenzung", "Äußerer Zügel und äußerer Schenkel halten die Schulter auf der Linie. Fehlen sie, weicht das Pferd nach außen aus.", ["ex-dr-4", "ex-dr-5", "ex-dr-1"]),
    c("c-innen", "Zu viel innerer Zügel", "Viel innerer Zügel biegt nur den Hals – die Schulter fällt dabei heraus.", ["ex-dr-1", "ex-hilfe-5"]),
    c("c-biegung", "Fehlende Biegung", "Ohne Biegung bleibt das Pferd steif wie ein Brett und schiebt in der Wendung nach außen.", ["ex-dr-1", "ex-dr-5"]),
    SCHIEFE(),
    c("c-ablenkung", "Ablenkung durch Ausgang oder Herde", "Pferde zieht es zu Artgenossen und zum Ausgang. Dort sind die äußeren Hilfen besonders gefragt.", ["ex-ueb-1", "ex-dr-5"]),
    SITZ(),
    KOERPER,
  ],
  fallback: ["ex-dr-1", "ex-dr-5", "ex-sitz-6"],
  gentle: ["ex-dr-1", "ex-dr-5", "ex-sitz-6"],
  mistakes: ["Mit dem inneren Zügel herumziehen", "Den äußeren Zügel ganz aufgeben", "Zu kleine Volten reiten"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Pferd fällt plötzlich auf einer Seite deutlich mehr aus als sonst."],
  lessons: ["ra-w18-l9", "ra-w18-l10", "ra-w13-l3", "ra-w3-l5"],
  riderLab: ["rl-02", "rl-19"],
  plan: {
    goal: "Die Schulter bleibt auf der Linie",
    weeks: [
      { title: "Stellung und äußerer Zügel", focus: "Zirkel mit leichter Stellung", exercises: ["ex-dr-1", "ex-dr-5"] },
      { title: "Schultern lenken", focus: "Zirkel verkleinern und vergrößern", exercises: ["ex-dr-4", "ex-dr-1"] },
      { title: "Geraderichten", focus: "Schultervor", exercises: ["ex-ger-2", "ex-dr-5"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-5", "ex-dr-4"] },
    ],
  },
};

export const cp30: CoachProblemContent = {
  id: "cp-30",
  review: "entwurf",
  intro: "Fällt ein Pferd auf die innere Schulter, wird der Zirkel kleiner und das Pferd „kippt“ nach innen – wie ein Motorrad in der Kurve.",
  understand: [
    "Das Pferd soll in Wendungen aufrecht bleiben und sich biegen, nicht nach innen lehnen. Der innere Schenkel am Gurt gibt ihm dafür Halt.",
    "Kippt der Reiter selbst nach innen oder schaut nach unten, folgt das Pferd diesem Gewicht.",
    "Zirkel vergrößern und Schenkelweichen helfen, das Pferd an den inneren Schenkel zu stellen.",
  ],
  questions: [
    q("q-wann", "Wann fällt dein Pferd nach innen?", [
      o("wendung", "In Wendungen", { "c-innen": 2, "c-balance": 1 }, "vor allem in Wendungen"),
      o("zirkel", "Der Zirkel wird immer kleiner", { "c-innen": 3 }, "der Zirkel wird immer kleiner"),
      o("tempo", "Wenn es schneller wird", { "c-balance": 3 }, "wenn es schneller wird"),
      o("hand", "Vor allem auf einer Hand", { "c-schiefe": 3 }, "vor allem auf einer Hand"),
    ]),
    q("q-blick", "Wohin schaust du in Wendungen?", [
      o("innen", "Weit nach innen", { "c-sitz": 2 }, "du schaust weit nach innen"),
      o("boden", "Eher nach unten", { "c-sitz": 2 }, "du schaust eher nach unten"),
      o("voraus", "Auf die Linie voraus"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("schenkel", "Mein innerer Schenkel ist kaum aktiv", { "c-innen": 3 }, "dein innerer Schenkel ist kaum aktiv"),
      o("gewicht", "Ich kippe nach innen", { "c-sitz": 3 }, "du kippst nach innen"),
      o("zuegel", "Ich ziehe innen am Zügel", { "c-zuegel": 3 }, "du ziehst innen am Zügel"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-innen", "Der innere Schenkel stützt nicht", "Der innere Schenkel am Gurt ist der Pfosten, um den sich das Pferd biegt. Fehlt er, fällt es nach innen.", ["ex-dr-4", "ex-dr-2", "ex-dr-1"]),
    c("c-balance", "Balance bei Tempo", "Wird das Pferd schneller, lehnt es sich in die Kurve. Ein ruhiges Tempo gibt ihm Gleichgewicht.", ["ex-trab-1", "ex-dr-5"]),
    SCHIEFE(),
    SITZ(),
    c("c-zuegel", "Zug am inneren Zügel", "Zieht der innere Zügel, kippt das Pferd mit der Schulter nach innen.", ["ex-hilfe-5", "ex-dr-1"]),
    KOERPER,
  ],
  fallback: ["ex-dr-1", "ex-dr-5", "ex-trab-1"],
  gentle: ["ex-dr-1", "ex-dr-5", "ex-sitz-6"],
  mistakes: ["Mit dem äußeren Zügel herumziehen", "Nach innen lehnen", "Auf kleinen Linien bleiben"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Pferd wirkt auf einer Seite steif oder geht ungleichmäßig."],
  lessons: ["ra-w18-l9", "ra-w18-l10", "ra-w11-l3"],
  riderLab: ["rl-19", "rl-02"],
  plan: {
    goal: "Aufrecht durch die Wendung",
    weeks: [
      { title: "Linie und Blick", focus: "Zirkel und Volten", exercises: ["ex-dr-1", "ex-dr-5"] },
      { title: "Innerer Schenkel", focus: "Zirkel vergrößern", exercises: ["ex-dr-4", "ex-dr-1"] },
      { title: "An den Schenkel stellen", focus: "Schenkelweichen", exercises: ["ex-dr-2", "ex-dr-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-4", "ex-dr-5"] },
    ],
  },
};

export const cp31: CoachProblemContent = {
  id: "cp-31",
  review: "entwurf",
  intro: "Stellung heißt: Das Pferd wendet den Kopf im Genick leicht nach innen. Klappt das nicht, fehlt meist Lockerheit – oder es wird zu viel gezogen.",
  understand: [
    "Bei korrekter Stellung siehst du das innere Auge und den Nüsternrand des Pferdes. Der Hals bleibt dabei gerade vor der Schulter.",
    "Stellung entsteht durch leichtes Annehmen des inneren Zügels und Nachgeben des äußeren – nicht durch Ziehen.",
    "Ein verspanntes Pferd lässt sich schwer stellen. Lösende Arbeit kommt deshalb zuerst.",
  ],
  questions: [
    q("q-wann", "Wann lässt sich dein Pferd schlecht stellen?", [
      o("hand", "Vor allem auf einer Hand", { "c-schiefe": 3 }, "vor allem auf einer Hand"),
      o("beide", "Auf beiden Händen", { "c-losgelassen": 2, "c-hand": 1 }, "auf beiden Händen"),
      o("anfang", "Vor allem am Anfang", { "c-losgelassen": 3 }, "vor allem am Anfang"),
    ]),
    q("q-wie", "Was passiert, wenn du stellst?", [
      o("kopf", "Es verwirft sich im Genick (Ohren nicht auf einer Höhe)", { "c-hand": 3 }, "es verwirft sich im Genick"),
      o("fest", "Es macht sich fest", { "c-losgelassen": 2, "c-hand": 1 }, "es macht sich fest"),
      o("gegen", "Es stellt sich nach außen", { "c-schiefe": 2 }, "es stellt sich nach außen"),
      o("weiss", "Schwer zu beschreiben"),
    ]),
    reiter("Wie stellst du?", [
      o("zieh", "Ich ziehe am inneren Zügel", { "c-hand": 3 }, "du ziehst am inneren Zügel"),
      o("aussen", "Ich gebe außen nicht nach", { "c-aussen": 3 }, "du gibst außen nicht nach"),
      o("nichts", "Mir fällt nichts auf"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    SCHIEFE(["ex-dr-1", "ex-ger-2"]),
    c("c-losgelassen", "Fehlende Losgelassenheit", "Ein verspanntes Pferd macht sich im Hals fest. Dehnung und lösende Arbeit machen es weich.", ["ex-gy-2", "ex-hilfe-2"]),
    c("c-hand", "Stellung nur mit Zug", "Wird gezogen, verwirft sich das Pferd oder macht sich fest. Annehmen und Nachgeben im Wechsel wirkt besser.", ["ex-dr-1", "ex-hilfe-5"]),
    c("c-aussen", "Der äußere Zügel gibt nicht nach", "Damit das Pferd sich stellen kann, muss der äußere Zügel so viel nachgeben, wie der innere annimmt.", ["ex-dr-1", "ex-dr-5"]),
    koerper("Lässt sich ein Pferd plötzlich nicht mehr stellen, können Zähne, Genick oder Hals verspannt oder schmerzhaft sein."),
  ],
  fallback: ["ex-gy-2", "ex-dr-1", "ex-hilfe-2"],
  gentle: ["ex-gy-2", "ex-hilfe-2", "ex-dr-1"],
  mistakes: ["Mit dem inneren Zügel ziehen", "Zu viel Stellung verlangen", "Den äußeren Zügel festhalten"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd zeigt Abwehr, wenn du es stellst, oder hält den Kopf schief."],
  lessons: ["ra-w13-l3", "ra-w18-l9", "ra-w12-l2"],
  riderLab: ["rl-02"],
  plan: {
    goal: "Mein Pferd lässt sich weich stellen",
    weeks: [
      { title: "Lösen", focus: "Dehnung", exercises: ["ex-gy-2", "ex-hilfe-2"] },
      { title: "Stellung", focus: "Zirkel und Volten", exercises: ["ex-dr-1", "ex-dr-5"] },
      { title: "Schwierige Seite", focus: "Schultervor", exercises: ["ex-ger-2", "ex-dr-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-1", "ex-gy-2"] },
    ],
  },
};

export const cp32: CoachProblemContent = {
  id: "cp-32",
  review: "entwurf",
  intro: "Biegung ist mehr als ein gestellter Hals: Das ganze Pferd soll sich gleichmäßig um den inneren Schenkel biegen.",
  understand: [
    "Bei korrekter Biegung folgt der Pferdekörper vom Genick bis zum Schweif der gebogenen Linie. Die Hinterbeine treten in die Spur der Vorderbeine.",
    "Der innere Schenkel am Gurt ist der Biegepunkt, der äußere Schenkel verhindert, dass die Hinterhand ausfällt, der äußere Zügel begrenzt die Schulter.",
    "Zu enge Linien überfordern ein Pferd, das noch steif ist. Große Bögen kommen zuerst.",
  ],
  questions: [
    q("q-wann", "Wann biegt sich dein Pferd schlecht?", [
      o("hand", "Vor allem auf einer Hand", { "c-schiefe": 3 }, "vor allem auf einer Hand"),
      o("eng", "In engen Wendungen", { "c-eng": 3 }, "in engen Wendungen"),
      o("beide", "Auf beiden Händen", { "c-losgelassen": 2, "c-schenkel": 1 }, "auf beiden Händen"),
    ]),
    q("q-wie", "Was passiert genau?", [
      o("hals", "Es biegt nur den Hals", { "c-zuegel": 3 }, "es biegt nur den Hals"),
      o("steif", "Es bleibt steif wie ein Brett", { "c-losgelassen": 2, "c-schenkel": 1 }, "es bleibt steif"),
      o("hinten", "Die Hinterhand fällt aus", { "c-aussen": 3 }, "die Hinterhand fällt aus"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("schenkel", "Mein innerer Schenkel ist kaum am Gurt", { "c-schenkel": 3 }, "dein innerer Schenkel ist kaum am Gurt"),
      o("zuegel", "Ich biege vor allem mit dem Zügel", { "c-zuegel": 2 }, "du biegst vor allem mit dem Zügel"),
      o("nichts", "Mir fällt nichts auf"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    SCHIEFE(["ex-dr-1", "ex-gy-1"]),
    c("c-eng", "Zu enge Linien", "Enge Wendungen verlangen viel Biegung. Ist das Pferd noch steif, kommen erst große Bögen.", ["ex-dr-5", "ex-dr-1"]),
    c("c-losgelassen", "Fehlende Losgelassenheit", "Ein verspanntes Pferd kann sich nicht biegen. Lösende Arbeit und Schlangenlinien helfen.", ["ex-gy-2", "ex-gy-1"]),
    c("c-schenkel", "Der innere Schenkel fehlt", "Ohne inneren Schenkel am Gurt hat das Pferd keinen Punkt, um den es sich biegen kann.", ["ex-dr-1", "ex-dr-4"]),
    c("c-zuegel", "Biegen nur mit dem Zügel", "Mit dem Zügel biegt man nur den Hals – der Körper bleibt gerade.", ["ex-hilfe-5", "ex-dr-1"]),
    c("c-aussen", "Äußere Hilfen fehlen", "Fällt die Hinterhand aus, fehlt der äußere Schenkel hinter dem Gurt.", ["ex-dr-4", "ex-dr-5"]),
    KOERPER,
  ],
  fallback: ["ex-dr-1", "ex-gy-2", "ex-dr-5"],
  gentle: ["ex-dr-1", "ex-gy-2", "ex-dr-5"],
  mistakes: ["Den Hals herumziehen", "Zu kleine Volten", "Nur auf der guten Hand üben"],
  safety: SAFE_RIDE,
  checkWhen: ["Die Steifheit ist neu oder dein Pferd wirkt dabei unwohl."],
  lessons: ["ra-w18-l9", "ra-w13-l3", "ra-w11-l5"],
  riderLab: ["rl-02", "rl-01"],
  plan: {
    goal: "Gleichmäßige Biegung",
    weeks: [
      { title: "Lösen", focus: "Dehnung und große Bögen", exercises: ["ex-gy-2", "ex-dr-1"] },
      { title: "Innerer Schenkel", focus: "Zirkel und Volten", exercises: ["ex-dr-5", "ex-dr-1"] },
      { title: "Umstellen", focus: "Schlangenlinien", exercises: ["ex-gy-1", "ex-dr-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-1", "ex-gy-1"] },
    ],
  },
};

export const cp33: CoachProblemContent = {
  id: "cp-33",
  review: "entwurf",
  intro: "Eine „gute“ und eine „schlechte“ Hand sind normal. Wichtig ist, sie gleichmäßig zu trainieren – und Lahmheiten auszuschließen.",
  understand: [
    "Pferde sind von Natur aus schief. Auf der hohlen Seite biegen sie sich leicht, auf der steifen Seite fällt es ihnen schwer.",
    "Auch Reiter sitzen oft schief und verstärken damit die Schiefe des Pferdes.",
    "Wichtig: Ist der Unterschied plötzlich da oder geht das Pferd auf einer Hand ungleichmäßig, kann eine Lahmheit dahinterstecken.",
  ],
  questions: [
    q("q-wie", "Was ist auf der schlechteren Hand anders?", [
      o("stellung", "Es lässt sich schlechter stellen", { "c-schiefe": 3 }, "es lässt sich schlechter stellen"),
      o("schulter", "Es fällt über eine Schulter", { "c-schulter": 3 }, "es fällt über eine Schulter"),
      o("takt", "Es geht ungleichmäßiger", { "c-koerper": 3 }, "es geht ungleichmäßiger", "abklaeren"),
      o("tempo", "Es eilt mehr", { "c-balance": 3 }, "es eilt mehr"),
    ]),
    q("q-reiter-seite", "Hast du selbst eine schwächere Seite?", [
      o("ja", "Ja", { "c-reiter": 3 }, "du hast selbst eine schwächere Seite"),
      o("nein", "Nein"),
      o("weiss", "Weiß ich nicht", { "c-reiter": 1 }),
    ]),
    q("q-training", "Reitest du beide Hände gleich oft?", [
      o("mehr", "Die gute Hand öfter", { "c-training": 3 }, "du reitest die gute Hand öfter"),
      o("gleich", "Gleich oft"),
      o("weiss", "Weiß ich nicht", { "c-training": 1 }),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    SCHIEFE(["ex-dr-1", "ex-ger-2", "ex-gy-1"]),
    c("c-schulter", "Die Schulter fällt aus", "Auf der schwierigen Seite drängt das Pferd oft über eine Schulter.", ["ex-dr-4", "ex-dr-5"]),
    c("c-balance", "Balance auf der schwierigen Seite", "Fehlt Gleichgewicht, eilt das Pferd.", ["ex-trab-1", "ex-dr-5"]),
    c("c-reiter", "Die Schiefe des Reiters", "Sitzt du selbst schief, gibst du einseitige Hilfen. Training ohne Pferd hilft dir dabei.", ["ex-sitz-6", "ex-sitz-4"]),
    c("c-training", "Einseitiges Training", "Wer die gute Hand bevorzugt, vergrößert den Unterschied. Beide Seiten gleich oft – die schwierige etwas häufiger, aber kürzer.", ["ex-gy-1", "ex-dr-1"]),
    koerper("Geht ein Pferd auf einer Hand ungleichmäßig, kann das eine beginnende Lahmheit sein."),
  ],
  fallback: ["ex-dr-1", "ex-dr-5", "ex-trab-1"],
  gentle: ["ex-dr-1", "ex-dr-5", "ex-sitz-6"],
  mistakes: ["Nur auf der guten Hand reiten", "Die schwierige Seite mit Kraft erzwingen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd geht auf einer Hand taktunrein oder ungleichmäßig."],
  lessons: ["ra-w18-l10", "ra-w16-l12", "ra-w18-l9"],
  riderLab: ["rl-02", "rl-19"],
  plan: {
    goal: "Beide Hände gleich gut",
    weeks: [
      { title: "Biegung", focus: "Beide Hände gleich oft", exercises: ["ex-dr-1", "ex-gy-1"] },
      { title: "Schultern", focus: "Zirkel verkleinern und vergrößern", exercises: ["ex-dr-4", "ex-dr-5"] },
      { title: "Geraderichten", focus: "Schultervor", exercises: ["ex-ger-2", "ex-dr-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-1", "ex-dr-4"] },
    ],
  },
};

export const cp34: CoachProblemContent = {
  id: "cp-34",
  review: "entwurf",
  intro: "Ein Pferd, das zur Bande drängt, sucht Halt oder will dorthin, wo es hin möchte. Beide Schenkel und der Blick sind gefragt.",
  understand: [
    "Viele Pferde orientieren sich an der Bande. Ohne sie fehlt ihnen die Begrenzung – deshalb ist das Geradeausreiten auf der Viertellinie so lehrreich.",
    "Drängt das Pferd mit der Schulter, braucht es Schulterkontrolle. Drängt es mit dem ganzen Körper, braucht es mehr Respekt vor dem Schenkel.",
    "Zügel allein helfen hier wenig – das Pferd folgt den Schultern, nicht der Nase.",
  ],
  questions: [
    q("q-wann", "Wann drängt dein Pferd zur Bande?", [
      o("immer", "Fast immer", { "c-schiefe": 2, "c-ablenkung": 1 }, "fast immer"),
      o("tor", "Am Ausgang", { "c-ablenkung": 3 }, "vor allem am Ausgang"),
      o("weg", "Wenn ich vom Hufschlag weg möchte", { "c-reaktion": 3 }, "wenn du vom Hufschlag weg möchtest"),
      o("hand", "Auf einer Hand", { "c-schiefe": 3 }, "auf einer Hand"),
    ]),
    q("q-wie", "Womit drängt es?", [
      o("schulter", "Mit der Schulter", { "c-schulter": 3 }, "mit der Schulter"),
      o("huefte", "Mit der Hinterhand", { "c-schiefe": 2 }, "mit der Hinterhand"),
      o("ganz", "Mit dem ganzen Körper", { "c-reaktion": 2 }, "mit dem ganzen Körper"),
    ]),
    reiter("Was machst du dann?", [
      o("zuegel", "Ich ziehe am Zügel weg", { "c-zuegel": 3 }, "du ziehst am Zügel weg"),
      o("schenkel", "Ich komme mit dem Schenkel nicht durch", { "c-reaktion": 2 }, "du kommst mit dem Schenkel nicht durch"),
      o("nichts", "Mir fällt nichts auf"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    SCHIEFE(["ex-ger-1", "ex-ger-2"]),
    c("c-ablenkung", "Zug zu Ausgang und Herde", "Am Ausgang zieht es Pferde nach draußen. Dort helfen klare Linien und Übergänge.", ["ex-ueb-1", "ex-dr-5"]),
    c("c-reaktion", "Weichen auf den Schenkel", "Weicht das Pferd dem Schenkel nicht, kann es nicht vom Hufschlag weggelenkt werden. Schenkelweichen hilft.", ["ex-dr-2", "ex-hilfe-3"]),
    c("c-schulter", "Die Schulter drängt", "Drängt die Schulter, braucht es Schulterkontrolle mit äußerem Zügel und Schenkel.", ["ex-dr-4", "ex-ger-1"]),
    c("c-zuegel", "Lenken nur mit dem Zügel", "Ziehst du den Kopf weg, läuft die Schulter weiter zur Bande.", ["ex-ger-1", "ex-hilfe-5"]),
    koerper("Drängt ein Pferd plötzlich stark zu einer Seite, kann auch ein Problem mit dem Sehen oder Schmerzen dahinterstecken."),
  ],
  fallback: ["ex-hilfe-3", "ex-ueb-1", "ex-dr-5"],
  gentle: ["ex-ueb-1", "ex-dr-5", "ex-sitz-6"],
  mistakes: ["Den Kopf von der Bande wegziehen", "Immer auf dem Hufschlag reiten"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Drängen ist plötzlich aufgetreten oder sehr stark."],
  lessons: ["ra-w18-l10", "ra-w13-l6", "ra-w11-l1"],
  riderLab: ["rl-19"],
  plan: {
    goal: "Selbstständig auf der Linie",
    weeks: [
      { title: "Geradeaus ohne Bande", focus: "Viertellinie", exercises: ["ex-ger-1", "ex-ueb-1"] },
      { title: "Weichen", focus: "Schenkelweichen", exercises: ["ex-dr-2", "ex-hilfe-3"] },
      { title: "Schultern", focus: "Zirkel verkleinern und vergrößern", exercises: ["ex-dr-4", "ex-ger-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ger-1", "ex-dr-2"] },
    ],
  },
};

export const cp35: CoachProblemContent = {
  id: "cp-35",
  review: "entwurf",
  intro: "Ein runder Zirkel ist schwieriger, als er aussieht. Er zeigt genau, wie gut Linie, Biegung und Tempo zusammenpassen.",
  understand: [
    "Ein Zirkel berührt die Bande nur an vier Punkten und hat keine Geraden. Wer die Zirkelpunkte kennt und anreitet, wird automatisch runder.",
    "Eckig wird der Zirkel, wenn das Pferd nicht gebogen ist. Klein wird er, wenn es nach innen fällt. An der offenen Seite drängt es oft nach außen.",
    "Ein gleichmäßiges Tempo und der Blick voraus machen den Zirkel rund.",
  ],
  questions: [
    q("q-wie", "Wie sieht dein Zirkel aus?", [
      o("eckig", "Er wird eckig", { "c-linie": 3 }, "der Zirkel wird eckig"),
      o("offen", "An der offenen Seite drängt das Pferd weg", { "c-ablenkung": 2, "c-aussen": 1 }, "an der offenen Seite drängt das Pferd weg"),
      o("klein", "Er wird immer kleiner", { "c-innen": 3 }, "der Zirkel wird kleiner"),
      o("tempo", "Das Tempo schwankt", { "c-tempo": 3 }, "das Tempo schwankt"),
    ]),
    q("q-punkte", "Kennst du die Zirkelpunkte?", [
      o("ja", "Ja, ich reite sie an"),
      o("ungefaehr", "Ungefähr", { "c-linie": 2 }, "du kennst die Zirkelpunkte nur ungefähr"),
      o("nein", "Nicht genau", { "c-linie": 2 }, "du kennst die Zirkelpunkte nicht genau"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("blick", "Ich schaue oft nach unten", { "c-sitz": 3 }, "du schaust oft nach unten"),
      o("aussen", "Mein äußerer Schenkel ist passiv", { "c-aussen": 2 }, "dein äußerer Schenkel ist passiv"),
      o("nichts", "Mir fällt nichts auf"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-linie", "Linienführung", "Wer die Zirkelpunkte anreitet und vorausschaut, reitet automatisch runder.", ["ex-dr-1", "ex-dr-5"]),
    c("c-aussen", "Äußere Begrenzung fehlt", "Ohne äußeren Zügel und Schenkel wird der Zirkel an der offenen Seite größer.", ["ex-dr-4", "ex-dr-1"]),
    c("c-ablenkung", "Ablenkung an der offenen Seite", "An der offenen Seite fehlt die Bande – manche Pferde zieht es dort weg.", ["ex-ueb-1", "ex-dr-1"]),
    c("c-innen", "Das Pferd fällt nach innen", "Ohne inneren Schenkel wird der Zirkel immer kleiner.", ["ex-dr-4", "ex-dr-2"]),
    c("c-tempo", "Schwankendes Tempo", "Mit wechselndem Tempo wird auch die Linie unruhig.", ["ex-trab-1", "ex-hilfe-6"]),
    SITZ(),
    KOERPER,
  ],
  fallback: ["ex-dr-1", "ex-dr-5", "ex-trab-1"],
  gentle: ["ex-dr-1", "ex-dr-5", "ex-trab-1"],
  mistakes: ["Auf den Hals schauen", "Gerade Stücke in den Zirkel einbauen"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Pferd wirkt auf dem Zirkel auf einer Hand ungleichmäßig."],
  lessons: ["ra-w11-l3", "ra-w18-l9", "ra-w12-l1"],
  riderLab: ["rl-19"],
  plan: {
    goal: "Ein runder Zirkel",
    weeks: [
      { title: "Zirkelpunkte", focus: "Linie und Blick", exercises: ["ex-dr-1", "ex-trab-1"] },
      { title: "Äußere Hilfen", focus: "Zirkel verkleinern und vergrößern", exercises: ["ex-dr-4", "ex-dr-1"] },
      { title: "Gleichmäßiges Tempo", focus: "Halbe Paraden", exercises: ["ex-hilfe-6", "ex-dr-5"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-1", "ex-dr-4"] },
    ],
  },
};

export const cp36: CoachProblemContent = {
  id: "cp-36",
  review: "entwurf",
  intro: "Wird ein Pferd in Wendungen schneller, fehlt ihm dort die Balance – und oft die Vorbereitung.",
  understand: [
    "In jeder Wendung muss das Pferd sein Gewicht neu verteilen. Fehlt ihm das Gleichgewicht, rettet es sich ins Tempo.",
    "Eine halbe Parade vor der Wendung, eine passende Größe der Wendung und korrekte Biegung helfen ihm, ruhig zu bleiben.",
    "Nach der Wendung wieder ruhig geradeaus – nicht davonstürmen lassen.",
  ],
  questions: [
    q("q-wann", "Wann wird dein Pferd schneller?", [
      o("volte", "In Volten", { "c-balance": 2, "c-vorbereitung": 1 }, "vor allem in Volten"),
      o("ecke", "In Ecken", { "c-vorbereitung": 2 }, "vor allem in Ecken"),
      o("nach", "Nach der Wendung", { "c-weg": 2, "c-balance": 1 }, "nach der Wendung"),
      o("hand", "Auf einer Hand", { "c-schiefe": 3 }, "auf einer Hand"),
    ]),
    q("q-vorbereitung", "Wie bereitest du die Wendung vor?", [
      o("parade", "Mit halber Parade"),
      o("spaet", "Eher spät", { "c-vorbereitung": 3 }, "du bereitest eher spät vor"),
      o("zuegel", "Nur mit dem Zügel", { "c-zuegel": 3 }, "du lenkst nur mit dem Zügel"),
    ]),
    q("q-groesse", "Wie groß sind deine Wendungen?", [
      o("eng", "Eher eng", { "c-eng": 3 }, "deine Wendungen sind eher eng"),
      o("gross", "Groß"),
      o("weiss", "Weiß ich nicht"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-balance", "Balance in der Wendung", "Fehlt Gleichgewicht, eilt das Pferd durch die Wendung.", ["ex-dr-5", "ex-ueb-2"]),
    c("c-vorbereitung", "Fehlende Vorbereitung", "Eine halbe Parade vor der Wendung macht das Pferd aufmerksam und setzt es etwas mehr auf die Hinterhand.", ["ex-hilfe-1", "ex-dr-5"]),
    c("c-weg", "Eilen aus der Wendung heraus", "Nach der Wendung stürmen manche Pferde los. Eine halbe Parade direkt danach hilft.", ["ex-hilfe-6", "ex-ueb-1"]),
    SCHIEFE(["ex-dr-1", "ex-ger-2"]),
    c("c-zuegel", "Lenken nur mit dem Zügel", "Mit dem Zügel allein kommt das Pferd aus dem Gleichgewicht.", ["ex-hilfe-5", "ex-dr-1"]),
    c("c-eng", "Zu enge Wendungen", "Enge Wendungen verlangen viel Balance. Große Linien zuerst.", ["ex-dr-1", "ex-dr-5"]),
    KOERPER,
  ],
  fallback: ["ex-hilfe-1", "ex-dr-1", "ex-dr-5"],
  gentle: ["ex-hilfe-1", "ex-dr-1", "ex-dr-5"],
  mistakes: ["Zu enge Wendungen", "Ohne halbe Parade in die Wendung reiten"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Pferd wirkt in Wendungen steif oder unwillig."],
  lessons: ["ra-w11-l4", "ra-w18-l9", "ra-w18-l7"],
  riderLab: ["rl-02"],
  plan: {
    goal: "Ruhig durch jede Wendung",
    weeks: [
      { title: "Vorbereitung", focus: "Halbe Parade vor der Wendung", exercises: ["ex-hilfe-1", "ex-dr-1"] },
      { title: "Volten", focus: "An festen Punkten", exercises: ["ex-dr-5", "ex-hilfe-1"] },
      { title: "Tempo halten", focus: "Halbe Paraden im Trab", exercises: ["ex-hilfe-6", "ex-dr-5"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-5", "ex-hilfe-6"] },
    ],
  },
};
