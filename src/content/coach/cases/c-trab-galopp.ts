import type { CoachProblemContent } from "../types";
import { c, koerper, o, q, SAFE_RIDE, seit, stand, veraendert } from "./common";

/** Kategorie C – Trab & Galopp (cp-19 … cp-28, ohne cp-22). Fachlicher Entwurf, vor Veröffentlichung prüfen lassen. */

const reiter = (text: string, opts: ReturnType<typeof o>[]) => q("q-reiter", text, [...opts, o("weiss-nicht", "Das kann ich nicht einschätzen")], { help: "Wenn du unsicher bist: Lass dich einmal filmen oder frag deine Reitlehrkraft." });
const GALOPP_SAFE = [...SAFE_RIDE, "Ziehe vor dem Galoppieren den Gurt nach.", "Galoppiere anfangs nur auf dem Zirkel mit genug Platz."];
const SITZ = (exercises: string[]) => c("c-sitz", "Dein Sitz beeinflusst das Pferd", "Kippt der Oberkörper vor oder sitzt du hinter der Bewegung, verändert sich die Balance des Pferdes – und damit sein Tempo und seine Gangart.", exercises);
const HAND = (exercises: string[]) => c("c-hand", "Die Hand bremst oder hält fest", "Eine festhaltende Hand nimmt dem Pferd den Hals, den es für Balance und Schwung braucht.", exercises);

export const cp19: CoachProblemContent = {
  id: "cp-19",
  review: "entwurf",
  intro: "Ein Pferd, das im Trab immer schneller wird, sucht meist sein Gleichgewicht im Tempo. Der Rhythmus des Reiters spielt dabei eine große Rolle.",
  understand: [
    "Der Trab ist ein Zweitakt. Wird er eilig, verlagert das Pferd sein Gewicht nach vorn auf die Vorhand – und muss noch schneller werden, um nicht „hinzufallen“.",
    "Ziehen am Zügel verstärkt das oft: Das Pferd hält dagegen. Hilfreich ist ein ruhiger, selbst vorgegebener Rhythmus im Leichttraben, halbe Paraden und Übergänge.",
    "Ruhiges Tempo ist keine Frage der Kraft, sondern der Balance.",
  ],
  questions: [
    q("q-wann", "Wann wird dein Pferd schneller?", [
      o("immer", "Von Anfang an", { "c-balance": 2, "c-spannung": 1 }, "von Anfang an"),
      o("laenger", "Je länger es trabt", { "c-balance": 2, "c-kraft": 1 }, "je länger es trabt"),
      o("wendung", "Nach Wendungen oder auf der langen Seite", { "c-wendung": 2, "c-balance": 1 }, "nach Wendungen oder auf der langen Seite"),
      o("draussen", "Draußen oder bei Ablenkung", { "c-spannung": 3 }, "draußen oder bei Ablenkung"),
    ]),
    q("q-leicht", "Wie leichttrabst du, wenn es schneller wird?", [
      o("schnell", "Ich stehe auch schneller auf", { "c-rhythmus": 3 }, "du stehst schneller auf"),
      o("mit", "Ich lasse mich mitreißen", { "c-rhythmus": 2 }, "du lässt dich mitreißen"),
      o("ruhig", "Ruhig in meinem eigenen Rhythmus"),
    ]),
    reiter("Was machst du dann?", [
      o("ziehe", "Ich halte am Zügel dagegen", { "c-hand": 3 }, "du hältst am Zügel dagegen"),
      o("treib", "Ich treibe weiter", { "c-treiben": 3 }, "du treibst weiter"),
      o("vor", "Ich kippe nach vorne", { "c-sitz": 3 }, "du kippst nach vorne"),
    ]),
    seit({ pause: { "c-kraft": 2 } }),
    veraendert({ haltung: { "c-spannung": 1 } }),
    stand(),
  ],
  causes: [
    c("c-balance", "Das Pferd fällt auf die Vorhand", "Ohne Balance sucht das Pferd Halt im Tempo. Übergänge und halbe Paraden helfen ihm, sich mehr mit der Hinterhand zu tragen.", ["ex-trab-1", "ex-ueb-2", "ex-hilfe-6"]),
    c("c-spannung", "Anspannung oder Ablenkung", "Aufregung macht schnell. Ruhige Linien, Pausen und vertraute Umgebung helfen.", ["ex-hilfe-4", "ex-gy-2"]),
    c("c-kraft", "Kraft und Kondition", "Fehlt Kraft, wird das Pferd mit der Zeit schneller und flacher. Kürzere Trabreprisen und Stangen stärken.", ["ex-ueb-2", "ex-st-1"]),
    c("c-wendung", "Wendungen ohne Vorbereitung", "Aus einer unvorbereiteten Wendung kommt das Pferd oft eilig heraus.", ["ex-dr-5", "ex-hilfe-1"]),
    c("c-rhythmus", "Dein Leichttraben bestimmt das Tempo", "Das Pferd passt sich deinem Rhythmus an – oder du dich seinem. Langsamer aufstehen heißt langsamerer Trab.", ["ex-trab-1", "ex-sitz-7"]),
    HAND(["ex-hilfe-6", "ex-hilfe-2"]),
    c("c-treiben", "Dauertreiben", "Wer beim Eilen weitertreibt, verstärkt das Tempo. Das Bein darf ruhig anliegen.", ["ex-hilfe-4", "ex-trab-1"]),
    SITZ(["ex-sitz-6", "ex-sitz-1"]),
    koerper("Eilt ein Pferd plötzlich oder wirkt es unwohl, können Schmerzen oder ein drückender Sattel dahinterstecken."),
  ],
  fallback: ["ex-trab-1", "ex-hilfe-1", "ex-sitz-6"],
  gentle: ["ex-trab-1", "ex-hilfe-1", "ex-sitz-6"],
  mistakes: ["Dagegen ziehen", "Selbst schneller leichttraben", "Zu lange Trabreprisen"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Eilen ist ganz neu oder dein Pferd wirkt dabei verspannt und unwohl."],
  lessons: ["ra-w12-l1", "ra-w5-l2", "ra-w18-l11"],
  riderLab: ["rl-06", "rl-05"],
  plan: {
    goal: "Ein ruhiger, gleichmäßiger Trab",
    weeks: [
      { title: "Dein Rhythmus", focus: "Leichttraben im eigenen Takt", exercises: ["ex-trab-1", "ex-hilfe-1"] },
      { title: "Übergänge", focus: "Trab–Schritt–Trab", exercises: ["ex-ueb-2", "ex-trab-1"] },
      { title: "Halbe Paraden im Trab", focus: "Tempo regulieren", exercises: ["ex-hilfe-6", "ex-st-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-trab-1", "ex-hilfe-6"] },
    ],
  },
};

export const cp20: CoachProblemContent = {
  id: "cp-20",
  review: "entwurf",
  intro: "Fällt ein Pferd immer wieder aus dem Trab, fehlt ihm Fleiß, Kraft oder Balance – oder der Reiter bremst unbewusst.",
  understand: [
    "Ein Pferd hält den Trab, wenn es fleißig vorwärts geht und im Gleichgewicht ist. Fehlt eines davon, fällt es zurück in den Schritt.",
    "Treiben wirkt am besten im Rhythmus: beim Leichttraben im Moment des Einsitzens.",
    "Wichtig: Wird das Pferd taktunrein, stolpert es oder wirkt es erschöpft, geht die Gesundheit vor.",
  ],
  questions: [
    q("q-wann", "Wann fällt dein Pferd aus dem Trab?", [
      o("anfang", "Am Anfang", { "c-aufwaermen": 3 }, "vor allem am Anfang"),
      o("ende", "Gegen Ende", { "c-kondition": 3 }, "vor allem gegen Ende"),
      o("wendung", "In Wendungen", { "c-balance": 3 }, "vor allem in Wendungen"),
      o("immer", "Immer wieder", { "c-reaktion": 2, "c-sitz": 1 }, "immer wieder"),
    ]),
    q("q-pferd", "Wie wirkt dein Pferd dabei?", [
      o("traege", "Träge", { "c-reaktion": 2 }, "dein Pferd wirkt träge"),
      o("muede", "Müde oder lustlos", { "c-kondition": 2 }, "dein Pferd wirkt müde"),
      o("taktunrein", "Es geht ungleichmäßig oder stolpert", { "c-koerper": 3 }, "es geht ungleichmäßig oder stolpert", "stopp"),
      o("normal", "Eigentlich normal"),
    ]),
    reiter("Was machst du dabei?", [
      o("sitz", "Ich sitze schwer oder hinter der Bewegung", { "c-sitz": 3 }, "du sitzt hinter der Bewegung"),
      o("hand", "Ich halte am Zügel", { "c-hand": 3 }, "du hältst am Zügel"),
      o("treiben", "Ich treibe kaum", { "c-reaktion": 2 }, "du treibst kaum"),
    ]),
    seit({ pause: { "c-kondition": 2 } }),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-aufwaermen", "Zu kurze Aufwärmphase", "Am Anfang sind Muskeln und Gelenke noch nicht warm. Eine längere Schrittphase und lösende Arbeit helfen.", ["ex-gy-2", "ex-trab-3"]),
    c("c-kondition", "Kondition", "Fehlt Kondition, kann das Pferd den Trab nicht lange halten. Kurze Reprisen mit Pausen bauen sie auf.", ["ex-trab-3", "ex-ueb-3"]),
    c("c-balance", "Balance in Wendungen", "In Wendungen braucht das Pferd mehr Gleichgewicht. Große Linien zuerst.", ["ex-dr-5", "ex-trab-3"]),
    c("c-reaktion", "Reaktion auf treibende Hilfen", "Treibende Hilfen sollen kurz und klar sein – und im Rhythmus kommen.", ["ex-hilfe-3", "ex-trab-3"]),
    SITZ(["ex-sitz-7", "ex-sitz-6"]),
    HAND(["ex-hilfe-5", "ex-hilfe-2"]),
    koerper("Taktunreinheit, Stolpern oder Unlust können auf Lahmheit, Schmerzen oder eine Erkrankung hindeuten."),
  ],
  fallback: ["ex-trab-3", "ex-gy-2", "ex-hilfe-3"],
  gentle: ["ex-gy-2", "ex-hilfe-5", "ex-sitz-6"],
  mistakes: ["Bei jedem Tritt klopfen", "Lange am Stück traben, obwohl das Pferd müde ist"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd geht taktunrein, stolpert oder ist auffällig müde."],
  lessons: ["ra-w5-l1", "ra-w3-l2", "ra-w16-l12"],
  riderLab: ["rl-06"],
  plan: {
    goal: "Fleißig im Trab bleiben",
    weeks: [
      { title: "Lösen und Aufwärmen", focus: "Vorwärts-abwärts", exercises: ["ex-gy-2", "ex-trab-3"] },
      { title: "Treiben im Rhythmus", focus: "Kurze Impulse beim Einsitzen", exercises: ["ex-trab-3", "ex-hilfe-3"] },
      { title: "Übergänge", focus: "Planbare Übergänge", exercises: ["ex-ueb-3", "ex-trab-3"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-trab-3", "ex-gy-2"] },
    ],
  },
};

export const cp21: CoachProblemContent = {
  id: "cp-21",
  review: "entwurf",
  intro: "Galoppiert ein Pferd nicht an, fehlt oft eine klare, gut vorbereitete Hilfe – manchmal aber auch etwas anderes.",
  understand: [
    "Für den Galopp braucht das Pferd Balance und eine klare Hilfe: innere Stellung, innerer Schenkel am Gurt, äußerer Schenkel eine Handbreit dahinter.",
    "Trabt das Pferd nur schneller, ist es oft nicht genug vorbereitet. Reagiert es kaum, hat es die Hilfe vielleicht nicht verstanden.",
    "Wehrt sich ein Pferd gegen den Galopp, sollten Rücken, Sattel und Hinterhand untersucht werden.",
  ],
  questions: [
    q("q-wie", "Was passiert bei deiner Galopphilfe?", [
      o("schneller", "Es trabt nur schneller", { "c-vorbereitung": 2, "c-hilfen": 1 }, "es trabt nur schneller"),
      o("nichts", "Es reagiert kaum", { "c-reaktion": 3 }, "es reagiert kaum"),
      o("abwehr", "Es buckelt oder schlägt mit dem Kopf", { "c-koerper": 3 }, "es buckelt oder schlägt mit dem Kopf", "abklaeren"),
      o("manchmal", "Manchmal klappt es, manchmal nicht", { "c-ort": 2, "c-vorbereitung": 1 }, "manchmal klappt es, manchmal nicht"),
    ]),
    q("q-hand", "Auf welcher Hand ist es schwieriger?", [
      o("eine", "Vor allem auf einer Hand", { "c-schiefe": 3 }, "vor allem auf einer Hand"),
      o("beide", "Auf beiden gleich"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("hilfe", "Ich bin unsicher mit der Galopphilfe", { "c-hilfen": 3 }, "du bist unsicher mit der Galopphilfe"),
      o("vor", "Ich beuge mich nach vorne", { "c-sitz": 3 }, "du beugst dich nach vorne"),
      o("zuegel", "Ich halte am Zügel fest", { "c-hand": 3 }, "du hältst am Zügel fest"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-vorbereitung", "Fehlende Vorbereitung", "Aus einem eiligen Trab springt kaum ein Pferd ruhig an. Ruhiger Trab und halbe Paraden vorher sind der Schlüssel.", ["ex-hilfe-1", "ex-trab-1", "ex-gal-3"]),
    c("c-hilfen", "Unklare Galopphilfe", "Die Galopphilfe braucht innere Stellung und klar verteilte Schenkel. Ist sie unklar, weiß das Pferd nicht, was gemeint ist.", ["ex-gal-3", "ex-gal-1"]),
    c("c-reaktion", "Reaktion auf treibende Hilfen", "Reagiert das Pferd generell wenig auf den Schenkel, fehlt beim Angaloppieren der Impuls.", ["ex-hilfe-3", "ex-trab-3"]),
    c("c-ort", "Ungünstiger Ort und Moment", "Auf dem Zirkel oder in der Ecke springt ein Pferd leichter an als auf gerader Linie.", ["ex-gal-1", "ex-dr-1"]),
    c("c-schiefe", "Natürliche Schiefe", "Auf der schwierigeren Hand fehlt oft die Biegung, die das Anspringen erleichtert.", ["ex-dr-1", "ex-dr-5", "ex-gal-1"]),
    SITZ(["ex-sitz-1", "ex-gal-3"]),
    HAND(["ex-hilfe-2", "ex-gal-3"]),
    koerper("Verweigert ein Pferd den Galopp oder wehrt es sich, können Rücken, Sattel, Hinterhand oder Zähne die Ursache sein."),
  ],
  fallback: ["ex-hilfe-1", "ex-trab-1", "ex-dr-1"],
  gentle: ["ex-hilfe-1", "ex-trab-1", "ex-gy-2"],
  mistakes: ["Die Hilfe immer stärker wiederholen", "Auf gerader Linie angaloppieren wollen", "Vorneüberkippen"],
  safety: GALOPP_SAFE,
  checkWhen: ["Dein Pferd buckelt, steigt oder schlägt beim Angaloppieren mit dem Kopf."],
  lessons: ["ra-w18-l13", "ra-w6-l3", "ra-w6-l2"],
  riderLab: ["rl-09", "rl-11"],
  plan: {
    goal: "Sicher angaloppieren",
    weeks: [
      { title: "Ruhiger Trab", focus: "Vorbereitung", exercises: ["ex-trab-1", "ex-hilfe-1"] },
      { title: "Stellung und Zirkel", focus: "Biegung als Hilfe", exercises: ["ex-dr-1", "ex-gal-3"] },
      { title: "Angaloppieren", focus: "Eine klare Hilfe", exercises: ["ex-gal-3", "ex-gal-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-gal-3", "ex-trab-1"] },
    ],
  },
};

export const cp23: CoachProblemContent = {
  id: "cp-23",
  review: "entwurf",
  intro: "Springt ein Pferd im falschen Galopp an, fehlt meist Stellung, Vorbereitung oder ein günstiger Ort.",
  understand: [
    "Im Rechtsgalopp greift das rechte Vorderbein weiter vor, im Linksgalopp das linke. Auf dem Zirkel ist der „richtige“ Galopp der zur Innenseite.",
    "Stellung nach innen, der äußere Schenkel hinter dem Gurt und das Gewicht leicht innen machen dem Pferd klar, welcher Galopp gemeint ist.",
    "Auf der schwierigeren Hand hilft eine Ecke oder ein Zirkel, weil die Biegung das Anspringen erleichtert.",
  ],
  questions: [
    q("q-hand", "Auf welcher Hand passiert es?", [
      o("eine", "Immer auf derselben Hand", { "c-schiefe": 3 }, "immer auf derselben Hand"),
      o("beide", "Auf beiden Händen", { "c-hilfen": 2, "c-vorbereitung": 1 }, "auf beiden Händen"),
      o("manchmal", "Nur manchmal", { "c-vorbereitung": 2 }, "nur manchmal"),
    ]),
    q("q-wo", "Wo galoppierst du an?", [
      o("gerade", "Auf gerader Linie", { "c-ort": 3 }, "du galoppierst auf gerader Linie an"),
      o("ecke", "In der Ecke oder auf dem Zirkel"),
      o("egal", "Mal hier, mal dort", { "c-ort": 1 }),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("stellung", "Ich stelle das Pferd kaum", { "c-stellung": 3 }, "du stellst das Pferd kaum"),
      o("schenkel", "Ich bin unsicher, welcher Schenkel wohin", { "c-hilfen": 3 }, "du bist unsicher mit den Schenkeln"),
      o("gewicht", "Ich lehne mich nach innen", { "c-sitz": 3 }, "du lehnst dich nach innen"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-schiefe", "Natürliche Schiefe", "Fast jedes Pferd hat eine Lieblingsseite. Auf der anderen springt es leichter falsch an.", ["ex-dr-1", "ex-dr-4", "ex-gal-1"]),
    c("c-hilfen", "Unklare Galopphilfe", "Sind Schenkel und Stellung nicht eindeutig, wählt das Pferd die Galopphand, die ihm leichter fällt.", ["ex-gal-3", "ex-gal-1"]),
    c("c-vorbereitung", "Fehlende Vorbereitung", "Mit halber Parade und Stellung vorbereitet, springt das Pferd eher richtig an.", ["ex-hilfe-1", "ex-gal-3"]),
    c("c-ort", "Ungünstige Stelle", "Auf gerader Linie fehlt die Biegung, die den richtigen Galopp nahelegt.", ["ex-gal-1", "ex-dr-5"]),
    c("c-stellung", "Fehlende Stellung", "Die innere Stellung zeigt dem Pferd, auf welche Hand es galoppieren soll.", ["ex-dr-1", "ex-dr-5"]),
    c("c-sitz", "Das Gewicht kippt nach innen", "Wer sich nach innen lehnt, schiebt das Pferd aus dem Gleichgewicht – es springt oft falsch an.", ["ex-sitz-6", "ex-sitz-1"]),
    koerper("Springt ein Pferd plötzlich nur noch falsch an, kann auch eine Beschwerde in Rücken oder Hinterhand dahinterstecken."),
  ],
  fallback: ["ex-dr-1", "ex-hilfe-1", "ex-dr-5"],
  gentle: ["ex-dr-1", "ex-hilfe-1", "ex-sitz-6"],
  mistakes: ["Auf gerader Linie angaloppieren", "Nach innen kippen", "Bei falschem Galopp weitergaloppieren"],
  safety: GALOPP_SAFE,
  checkWhen: ["Das Problem ist neu und tritt plötzlich immer auf."],
  lessons: ["ra-w18-l15", "ra-w6-l2", "ra-w18-l10"],
  riderLab: ["rl-02", "rl-12"],
  plan: {
    goal: "Im richtigen Galopp anspringen",
    weeks: [
      { title: "Stellung", focus: "Zirkel und Volten", exercises: ["ex-dr-1", "ex-dr-5"] },
      { title: "Vorbereitung", focus: "Halbe Paraden, dann Hilfe", exercises: ["ex-hilfe-1", "ex-gal-3"] },
      { title: "Angaloppieren auf dem Zirkel", focus: "Schwierige Hand zuerst", exercises: ["ex-gal-1", "ex-gal-3"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-gal-3", "ex-dr-1"] },
    ],
  },
};

export const cp24: CoachProblemContent = {
  id: "cp-24",
  review: "entwurf",
  intro: "Fällt ein Pferd aus dem Galopp, fehlt meist Balance, Kraft oder Fleiß – oder der Sitz geht nicht mit.",
  understand: [
    "Im Galopp trägt sich das Pferd in einer Wellenbewegung. Fehlt ihm Gleichgewicht oder Kraft, fällt es zurück in den Trab.",
    "Ein mitgehender Sitz und ein Schenkel, der im Takt des Galopps leicht treibt, helfen ihm, im Galopp zu bleiben.",
    "Kurze, ruhige Galoppreprisen bauen Kraft auf – lange erschöpfen.",
  ],
  questions: [
    q("q-wann", "Wann fällt dein Pferd aus dem Galopp?", [
      o("sofort", "Nach wenigen Sprüngen", { "c-balance": 2, "c-reaktion": 1 }, "nach wenigen Sprüngen"),
      o("laenger", "Nach einer Weile", { "c-kondition": 3 }, "nach einer Weile"),
      o("wendung", "In Wendungen", { "c-balance": 3 }, "vor allem in Wendungen"),
      o("stelle", "An bestimmten Stellen", { "c-ort": 3 }, "an bestimmten Stellen"),
    ]),
    q("q-pferd", "Wie wirkt dein Pferd dabei?", [
      o("traege", "Es wirkt träge", { "c-reaktion": 2 }, "es wirkt träge"),
      o("muede", "Es atmet schwer oder ist erschöpft", { "c-kondition": 2 }, "es wirkt erschöpft"),
      o("taktunrein", "Es geht ungleichmäßig oder stolpert", { "c-koerper": 3 }, "es geht ungleichmäßig oder stolpert", "stopp"),
      o("normal", "Normal"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("sitz", "Ich sitze nicht im Galopp mit", { "c-sitz": 3 }, "du sitzt nicht mit"),
      o("hand", "Ich halte am Zügel", { "c-hand": 3 }, "du hältst am Zügel"),
      o("treiben", "Ich treibe nicht weiter", { "c-reaktion": 2 }, "du treibst nicht weiter"),
    ]),
    seit({ pause: { "c-kondition": 2 } }),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-balance", "Balance im Galopp", "Fehlt Balance, ist der Trab für das Pferd die bequemere Gangart.", ["ex-gal-4", "ex-dr-1"]),
    c("c-kondition", "Kondition", "Galopp ist anstrengend. Kurze Reprisen mit Pausen bauen Kondition auf.", ["ex-gal-4", "ex-trab-3"]),
    c("c-reaktion", "Fehlender Impuls", "Im Galopp braucht das Pferd im Takt leichte treibende Hilfen – sonst wird es langsamer.", ["ex-hilfe-3", "ex-gal-1"]),
    c("c-ort", "Gewohnheit an bestimmten Stellen", "Fällt das Pferd immer an derselben Stelle aus, hat es das gelernt. Dort bewusst treiben oder vorher ruhig durchparieren.", ["ex-gal-1", "ex-gal-4"]),
    c("c-sitz", "Der Sitz geht nicht mit", "Ein fester Sitz bremst die Galoppbewegung.", ["ex-sitz-8", "ex-sitz-4"]),
    HAND(["ex-hilfe-2", "ex-hilfe-5"]),
    koerper("Taktunreinheit, Stolpern oder Unlust im Galopp können auf Lahmheit, Rückenprobleme oder eine Erkrankung hindeuten."),
  ],
  fallback: ["ex-hilfe-3", "ex-trab-3", "ex-dr-1"],
  gentle: ["ex-gy-2", "ex-hilfe-5", "ex-sitz-6"],
  mistakes: ["Zu lange galoppieren", "Den Galopp mit Zug halten wollen"],
  safety: GALOPP_SAFE,
  checkWhen: ["Dein Pferd geht taktunrein, stolpert oder ist auffällig erschöpft."],
  lessons: ["ra-w18-l16", "ra-w18-l14", "ra-w6-l4"],
  riderLab: ["rl-09", "rl-11"],
  plan: {
    goal: "Im Galopp bleiben",
    weeks: [
      { title: "Fleiß", focus: "Reaktion auf den Schenkel", exercises: ["ex-hilfe-3", "ex-trab-3"] },
      { title: "Kurze Reprisen", focus: "Halbe Runden Galopp", exercises: ["ex-gal-4", "ex-gal-1"] },
      { title: "Mitgehen", focus: "Sitz im Galopp", exercises: ["ex-sitz-8", "ex-gal-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-gal-4", "ex-gal-1"] },
    ],
  },
};

export const cp25: CoachProblemContent = {
  id: "cp-25",
  review: "entwurf",
  intro: "Ein Pferd, das im Galopp zu schnell wird, braucht vor allem Balance – und einen Reiter, der ruhig sitzen bleibt.",
  understand: [
    "Ein eiliger Galopp ist meist ein unausbalancierter Galopp: Das Pferd fällt auf die Vorhand und wird immer schneller.",
    "Halbe Paraden im Rhythmus des Galopps, große gebogene Linien und kurze Reprisen helfen. Ziehen am Zügel löst meist Gegenzug aus.",
    "Im Gelände oder in der Gruppe kommen Herdentrieb und Aufregung dazu – dort gelten besondere Sicherheitsregeln.",
  ],
  questions: [
    q("q-wann", "Wann wird dein Pferd zu schnell?", [
      o("sofort", "Direkt nach dem Angaloppieren", { "c-angalopp": 3 }, "direkt nach dem Angaloppieren"),
      o("laenger", "Je länger es galoppiert", { "c-balance": 2, "c-kraft": 1 }, "je länger es galoppiert"),
      o("draussen", "Draußen oder in der Gruppe", { "c-spannung": 3 }, "draußen oder in der Gruppe"),
      o("gerade", "Auf geraden Strecken", { "c-linie": 2, "c-balance": 1 }, "auf geraden Strecken"),
    ]),
    q("q-reaktion", "Wie reagiert es auf halbe Paraden?", [
      o("kaum", "Kaum", { "c-durchlaessig": 3 }, "es reagiert kaum auf halbe Paraden"),
      o("kopf", "Es nimmt den Kopf hoch", { "c-hand": 2, "c-spannung": 1 }, "es nimmt den Kopf hoch"),
      o("kurz", "Kurz, dann wird es wieder schnell", { "c-balance": 2 }, "es wird nur kurz langsamer"),
    ]),
    reiter("Was machst du, wenn es schneller wird?", [
      o("leicht", "Ich gehe in den leichten Sitz", { "c-sitz": 2 }, "du gehst in den leichten Sitz"),
      o("ziehe", "Ich ziehe am Zügel", { "c-hand": 3 }, "du ziehst am Zügel"),
      o("vor", "Ich kippe nach vorne", { "c-sitz": 3 }, "du kippst nach vorne"),
    ]),
    seit({ pause: { "c-kraft": 2 } }),
    veraendert({ haltung: { "c-spannung": 1 } }),
    stand(),
  ],
  causes: [
    c("c-angalopp", "Hastiges Angaloppieren", "Wer eilig anspringt, galoppiert eilig weiter. Eine ruhige Vorbereitung legt das Tempo fest.", ["ex-gal-3", "ex-gal-4"]),
    c("c-balance", "Balance im Galopp", "Ohne Balance wird der Galopp schneller und flacher. Zirkel und kurze Reprisen helfen.", ["ex-gal-7", "ex-gal-4"]),
    c("c-kraft", "Kraft", "Fehlt Kraft, rettet sich das Pferd ins Tempo.", ["ex-gal-4", "ex-st-1"]),
    c("c-spannung", "Aufregung", "Draußen und in der Gruppe steigt die Aufregung. Erst in ruhiger Umgebung üben.", ["ex-ueb-1", "ex-hilfe-4"]),
    c("c-linie", "Lange Geraden laden zum Eilen ein", "Auf langen Geraden fehlt die begrenzende Biegung. Der Zirkel hilft.", ["ex-gal-7", "ex-dr-5"]),
    c("c-durchlaessig", "Halbe Paraden kommen nicht durch", "Reagiert das Pferd nicht auf halbe Paraden, fehlt Durchlässigkeit – das übt man zuerst im Trab.", ["ex-hilfe-6", "ex-hilfe-1", "ex-gal-7"]),
    HAND(["ex-hilfe-2", "ex-gal-7"]),
    c("c-sitz", "Der Sitz treibt ungewollt", "Wer im eiligen Galopp nach vorn kommt, nimmt dem Pferd den Halt hinten – es wird noch schneller.", ["ex-sitz-8", "ex-sitz-1"]),
    koerper("Rennt ein Pferd plötzlich im Galopp davon, kann auch Schmerz – etwa im Rücken – eine Rolle spielen."),
  ],
  fallback: ["ex-hilfe-1", "ex-trab-1", "ex-ueb-1"],
  gentle: ["ex-hilfe-1", "ex-ueb-1", "ex-trab-1"],
  mistakes: ["Dauerhaft ziehen", "Lange Geraden galoppieren", "Nach vorne kippen"],
  safety: [...GALOPP_SAFE, "Im Gelände nur galoppieren, wenn du dein Pferd sicher regulieren kannst."],
  checkWhen: ["Dein Pferd ist im Galopp nicht mehr zu kontrollieren.", "Das Davonlaufen ist neu."],
  lessons: ["ra-w18-l16", "ra-w18-l14", "ra-w19-l9"],
  riderLab: ["rl-09", "rl-11"],
  plan: {
    goal: "Ein ruhiger Galopp",
    weeks: [
      { title: "Durchlässigkeit im Trab", focus: "Halbe Paraden", exercises: ["ex-hilfe-6", "ex-hilfe-1"] },
      { title: "Ruhig anspringen", focus: "Vorbereitung", exercises: ["ex-gal-3", "ex-gal-4"] },
      { title: "Tempo regulieren", focus: "Auf dem Zirkel", exercises: ["ex-gal-7", "ex-gal-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-gal-7", "ex-hilfe-6"] },
    ],
  },
};

export const cp26: CoachProblemContent = {
  id: "cp-26",
  review: "entwurf",
  intro: "Fast jedes Pferd hat eine bessere und eine schwierigere Galopphand. Das ist normal – und lässt sich verbessern.",
  understand: [
    "Pferde sind von Natur aus schief, ähnlich wie Menschen Rechts- oder Linkshänder sind. Auf der schwierigeren Hand fehlt oft Biegung und Balance.",
    "Geraderichten heißt, beide Seiten gleichmäßig zu gymnastizieren – die schwierige Seite etwas öfter, aber nie bis zur Ermüdung.",
    "Auch der Reiter sitzt oft schief. Wer seine eigene Schokoladenseite kennt, kann sie ausgleichen.",
  ],
  questions: [
    q("q-wie", "Was ist auf der schlechteren Hand anders?", [
      o("anspringen", "Das Anspringen klappt schlechter", { "c-schiefe": 2, "c-hilfen": 1 }, "das Anspringen klappt schlechter"),
      o("falsch", "Es springt oft falsch an", { "c-schiefe": 3 }, "es springt oft falsch an"),
      o("schulter", "Es drängt nach außen oder innen", { "c-schulter": 3 }, "es drängt nach außen oder innen"),
      o("schnell", "Es wird schneller", { "c-balance": 3 }, "es wird schneller"),
    ]),
    q("q-trab", "Ist es auf dieser Hand auch im Trab schwieriger?", [
      o("ja", "Ja", { "c-schiefe": 2 }, "auch im Trab ist es schwieriger"),
      o("nein", "Nein, nur im Galopp", { "c-hilfen": 2 }, "nur im Galopp"),
      o("weiss", "Weiß ich nicht"),
    ]),
    reiter("Wie sitzt du auf dieser Hand?", [
      o("schief", "Ich sitze dort schief", { "c-reiter": 3 }, "du sitzt auf dieser Hand schief"),
      o("gleich", "Ich glaube, ich sitze gleich"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-schiefe", "Natürliche Schiefe", "Die schwierige Hand braucht gezielte Gymnastik: Stellung, Biegung, Schultervor.", ["ex-dr-1", "ex-ger-2", "ex-dr-4"]),
    c("c-hilfen", "Hilfengebung auf der schwierigen Hand", "Ist es nur im Galopp schwer, liegt es oft an der Galopphilfe auf dieser Seite.", ["ex-gal-3", "ex-gal-1"]),
    c("c-schulter", "Die Schulter fällt aus", "Drängt das Pferd über eine Schulter, fehlt die Kontrolle der Schultern.", ["ex-dr-4", "ex-dr-5"]),
    c("c-balance", "Balance", "Auf der schwierigen Hand fehlt Gleichgewicht – das Pferd eilt.", ["ex-gal-4", "ex-gal-7"]),
    c("c-reiter", "Der eigene schiefe Sitz", "Sitzt du auf einer Seite schief, verstärkt das die Schiefe des Pferdes.", ["ex-sitz-6", "ex-sitz-4"]),
    koerper("Ist eine Hand plötzlich viel schlechter, kann das ein Hinweis auf eine Lahmheit oder Schmerzen sein."),
  ],
  fallback: ["ex-dr-1", "ex-dr-5", "ex-sitz-6"],
  gentle: ["ex-dr-1", "ex-dr-5", "ex-sitz-6"],
  mistakes: ["Nur die gute Hand galoppieren", "Die schwierige Hand bis zur Erschöpfung üben"],
  safety: GALOPP_SAFE,
  checkWhen: ["Die Seitenunterschiede sind plötzlich deutlich größer geworden."],
  lessons: ["ra-w18-l10", "ra-w18-l15", "ra-w18-l9"],
  riderLab: ["rl-02", "rl-19"],
  plan: {
    goal: "Beide Hände gleich gut",
    weeks: [
      { title: "Biegung", focus: "Zirkel, Volten", exercises: ["ex-dr-1", "ex-dr-5"] },
      { title: "Geraderichten", focus: "Schultervor", exercises: ["ex-ger-2", "ex-dr-4"] },
      { title: "Galopp auf der schweren Hand", focus: "Kurz und ruhig", exercises: ["ex-gal-3", "ex-gal-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-1", "ex-gal-3"] },
    ],
  },
};

export const cp27: CoachProblemContent = {
  id: "cp-27",
  review: "entwurf",
  intro: "Beim Kreuzgalopp galoppieren Vorder- und Hinterbeine auf unterschiedlichen Händen. Das ist unbequem und ein wichtiges Signal.",
  understand: [
    "Im Kreuzgalopp springt das Pferd vorne auf der einen, hinten auf der anderen Hand. Das fühlt sich holprig an und belastet das Pferd.",
    "Häufige Gründe sind fehlende Balance, unklare Hilfen oder ein zu früh verlangter Galoppwechsel.",
    "Tritt Kreuzgalopp neu oder häufig auf, sollten Rücken und Hinterhand untersucht werden.",
  ],
  questions: [
    q("q-wann", "Wann springt dein Pferd im Kreuzgalopp?", [
      o("anspringen", "Schon beim Angaloppieren", { "c-vorbereitung": 3 }, "schon beim Angaloppieren"),
      o("wendung", "In Wendungen", { "c-balance": 3 }, "vor allem in Wendungen"),
      o("wechsel", "Bei Galoppwechseln", { "c-wechsel": 3 }, "bei Galoppwechseln"),
      o("ende", "Gegen Ende des Trainings", { "c-kraft": 3 }, "gegen Ende des Trainings"),
    ]),
    q("q-pferd", "Wie würdest du dein Pferd beschreiben?", [
      o("jung", "Jung oder wenig trainiert", { "c-kraft": 2 }, "dein Pferd ist jung oder wenig trainiert"),
      o("erfahren", "Erfahren"),
      o("neu", "Das Problem ist ganz neu", { "c-koerper": 3 }, "das Problem ist ganz neu", "abklaeren"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("gewicht", "Ich kippe nach innen", { "c-sitz": 3 }, "du kippst nach innen"),
      o("schenkel", "Meine Schenkel sind unklar", { "c-hilfen": 3 }, "deine Schenkel sind unklar"),
      o("nichts", "Mir fällt nichts auf"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-vorbereitung", "Fehlende Vorbereitung", "Ein gut vorbereitetes Angaloppieren lässt das Pferd sauber anspringen.", ["ex-gal-3", "ex-hilfe-1"]),
    c("c-balance", "Balance in Wendungen", "In engen Wendungen verliert das Pferd die Balance und wechselt hinten oder vorne.", ["ex-dr-5", "ex-gal-4"]),
    c("c-wechsel", "Galoppwechsel zu früh verlangt", "Fliegende Wechsel setzen viel Balance voraus. Einfache Wechsel über den Trab kommen zuerst.", ["ex-gal-8", "ex-gal-1"]),
    c("c-kraft", "Kraft", "Fehlt Kraft in der Hinterhand, fällt das Pferd leichter in den Kreuzgalopp.", ["ex-gal-4", "ex-st-1", "ex-bo-3"]),
    c("c-sitz", "Gewicht nach innen", "Kippt der Reiter nach innen, kommt das Pferd aus dem Gleichgewicht.", ["ex-sitz-6", "ex-sitz-4"]),
    c("c-hilfen", "Unklare Hilfen", "Bewegt sich der äußere Schenkel, kann das Pferd hinten wechseln.", ["ex-gal-3", "ex-gal-1"]),
    koerper("Kreuzgalopp kann auch ein Zeichen für Beschwerden in Rücken oder Hinterhand sein."),
  ],
  fallback: ["ex-hilfe-1", "ex-dr-5", "ex-st-1"],
  gentle: ["ex-hilfe-1", "ex-dr-5", "ex-sitz-6"],
  mistakes: ["Im Kreuzgalopp weitergaloppieren", "Fliegende Wechsel zu früh üben"],
  safety: GALOPP_SAFE,
  checkWhen: ["Kreuzgalopp tritt neu oder sehr häufig auf.", "Dein Pferd wirkt in der Hinterhand steif oder ungleichmäßig."],
  lessons: ["ra-w18-l15", "ra-w18-l12", "ra-w18-l18"],
  riderLab: ["rl-12", "rl-11"],
  plan: {
    goal: "Sauber im Galopp",
    weeks: [
      { title: "Vorbereitung", focus: "Halbe Paraden und Stellung", exercises: ["ex-hilfe-1", "ex-dr-5"] },
      { title: "Kraft", focus: "Stangen und kurze Reprisen", exercises: ["ex-st-1", "ex-gal-4"] },
      { title: "Sauber angaloppieren", focus: "Mit Ansage", exercises: ["ex-gal-3", "ex-gal-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-gal-3", "ex-gal-4"] },
    ],
  },
};

export const cp28: CoachProblemContent = {
  id: "cp-28",
  review: "entwurf",
  intro: "Im Galopp mitzusitzen ist eine Frage von Losgelassenheit, Balance und Wiederholung.",
  understand: [
    "Im Galopp bewegt sich das Becken in jedem Sprung von hinten nach vorn mit – wie beim Schaukeln. Der Oberkörper bleibt ruhig und aufrecht.",
    "Wer fest wird, wird geworfen. Wer nach vorn kippt, verliert den Halt.",
    "An der Longe lernt man das Mitschwingen am besten – ohne sich um Tempo und Richtung kümmern zu müssen.",
  ],
  questions: [
    q("q-wie", "Was passiert, wenn du nicht mitsitzt?", [
      o("hupf", "Ich hüpfe", { "c-becken": 3 }, "du hüpfst"),
      o("fest", "Ich werde steif", { "c-angst": 2, "c-becken": 1 }, "du wirst steif"),
      o("vor", "Ich falle nach vorne", { "c-oberkoerper": 3 }, "du fällst nach vorne"),
      o("bein", "Mein Bein rutscht", { "c-bein": 3 }, "dein Bein rutscht"),
    ]),
    q("q-wann", "Wann ist es am schwierigsten?", [
      o("anfang", "Gleich nach dem Anspringen", { "c-angst": 2 }, "gleich nach dem Anspringen"),
      o("laenger", "Je länger es dauert", { "c-kraft": 3 }, "je länger es dauert"),
      o("schnell", "Wenn das Pferd schneller wird", { "c-tempo": 3 }, "wenn das Pferd schneller wird"),
    ]),
    q("q-erfahrung", "Wie viel Galopperfahrung hast du?", [
      o("selten", "Ich galoppiere noch selten", { "c-erfahrung": 3 }, "du galoppierst noch selten"),
      o("regel", "Ich galoppiere regelmäßig"),
      o("wieder", "Ich steige gerade wieder ein", { "c-kraft": 1, "c-erfahrung": 1 }, "du steigst gerade wieder ein"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-becken", "Das Becken geht nicht mit", "Das Becken muss die Galoppbewegung aufnehmen. Lockerheit in Hüfte und Bauch ist der Schlüssel.", ["ex-sitz-8", "ex-sitz-5"]),
    c("c-angst", "Unsicherheit macht steif", "Wer unsicher ist, macht sich fest. An der Longe kannst du dich auf den Sitz konzentrieren.", ["ex-sitz-4", "ex-sitz-8"]),
    c("c-oberkoerper", "Der Oberkörper kippt vor", "Ein vorgebeugter Oberkörper nimmt dem Sitz die Mitte.", ["ex-sitz-6", "ex-sitz-8"]),
    c("c-bein", "Das Bein findet keinen Halt", "Ein langes, lockeres Bein gibt Halt, ohne zu klemmen.", ["ex-sitz-3", "ex-sitz-6"]),
    c("c-kraft", "Kraft und Ausdauer", "Galopp fordert Rumpf und Beine. Training ohne Pferd hilft dir sehr.", ["ex-sitz-7", "ex-sitz-4"]),
    c("c-tempo", "Ein eiliger Galopp", "Ein schneller Galopp ist schwer zu sitzen. Erst Tempo regulieren.", ["ex-gal-7", "ex-gal-4"]),
    c("c-erfahrung", "Wenig Galopperfahrung", "Mitsitzen braucht Wiederholung – kurz und oft.", ["ex-sitz-8", "ex-sitz-4"]),
    koerper("Ein Sattel, der nicht passt, oder ein Pferd mit Rückenbeschwerden macht das Mitsitzen deutlich schwerer."),
  ],
  fallback: ["ex-sitz-4", "ex-sitz-3", "ex-sitz-6"],
  gentle: ["ex-sitz-4", "ex-sitz-3", "ex-sitz-6"],
  mistakes: ["Mit dem Oberkörper pumpen", "Zu lange galoppieren", "Am Zügel festhalten"],
  safety: [...SAFE_RIDE, "Galopp anfangs nur an der Longe oder unter Aufsicht üben."],
  checkWhen: ["Dein Pferd drückt den Rücken weg oder buckelt im Galopp."],
  lessons: ["ra-w18-l14", "ra-w6-l1", "ra-w18-l4"],
  riderLab: ["rl-09", "rl-11", "rl-10"],
  plan: {
    goal: "Im Galopp mitschwingen",
    weeks: [
      { title: "Lockerheit", focus: "Longe und ohne Bügel", exercises: ["ex-sitz-4", "ex-sitz-3"] },
      { title: "Mitschwingen", focus: "Galopp an der Longe", exercises: ["ex-sitz-8", "ex-sitz-5"] },
      { title: "Kraft", focus: "Leichter Sitz und Ausdauer", exercises: ["ex-sitz-7", "ex-sitz-8"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-8", "ex-sitz-4"] },
    ],
  },
};
