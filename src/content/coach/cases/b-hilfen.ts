import type { CoachProblemContent } from "../types";
import { c, koerper, o, q, SAFE_RIDE, seit, stand, veraendert } from "./common";

/** Kategorie B – Hilfengebung (cp-11 … cp-18). Fachlich geprüft (14.11.2026). */

const reiter = (text: string, opts: ReturnType<typeof o>[]) => q("q-reiter", text, [...opts, o("weiss-nicht", "Das kann ich nicht einschätzen")], { help: "Wenn du unsicher bist: Lass dich einmal filmen oder frag deine Reitlehrkraft." });
const GEBISS = koerper("Kopfschlagen, Maulaufsperren oder Abwehr gegen das Gebiss können auch auf Zähne, Gebiss oder Zäumung hindeuten.");

export const cp11: CoachProblemContent = {
  id: "cp-11",
  review: "geprueft",
  intro: "Ein Pferd, das kaum auf den Schenkel reagiert, ist selten „faul“. Meist hat es gelernt, dass leise Hilfen nichts bedeuten – oder es hat einen Grund.",
  understand: [
    "Die Schenkelhilfe ist eine Frage an das Pferd. Reagiert es, hört der Schenkel sofort auf – das ist die Belohnung. Treibt der Schenkel ständig, verliert die Frage ihre Bedeutung.",
    "Deshalb gilt: erst fein fragen, bei Bedarf einmal deutlich nachfragen, dann sofort Ruhe geben. So lernt das Pferd, wieder auf feine Hilfen zu achten.",
    "Wirkt ein Pferd plötzlich träge, müde oder unwillig, sollte zuerst die Gesundheit geprüft werden.",
  ],
  questions: [
    q("q-wann", "Wann reagiert dein Pferd kaum auf den Schenkel?", [
      o("immer", "Fast immer", { "c-abgestumpft": 2, "c-motivation": 1 }, "es reagiert fast immer kaum"),
      o("anfang", "Vor allem am Anfang", { "c-aufwaermen": 3 }, "vor allem am Anfang des Trainings"),
      o("ende", "Gegen Ende des Trainings", { "c-kondition": 3 }, "vor allem gegen Ende des Trainings"),
      o("gangart", "Nur in bestimmten Gangarten", { "c-balance": 2 }, "nur in bestimmten Gangarten"),
    ]),
    q("q-reaktion", "Was passiert, wenn du deutlicher treibst?", [
      o("kurz", "Es reagiert kurz, dann wird es wieder langsam", { "c-abgestumpft": 3 }, "es reagiert nur kurz"),
      o("ohren", "Es legt die Ohren an oder schlägt mit dem Schweif", { "c-koerper": 2 }, "es legt die Ohren an oder schlägt mit dem Schweif", "abklaeren"),
      o("nichts", "Kaum eine Reaktion", { "c-abgestumpft": 2, "c-motivation": 1 }, "es reagiert kaum"),
      o("schneller", "Es wird schneller, aber nicht fleißiger", { "c-balance": 2 }, "es wird schneller, aber nicht fleißiger"),
    ]),
    reiter("Wie treibst du?", [
      o("dauer", "Ich treibe fast dauernd", { "c-abgestumpft": 3 }, "du treibst fast dauernd"),
      o("ferse", "Mit hochgezogener Ferse", { "c-hilfengebung": 3 }, "du treibst mit hochgezogener Ferse"),
      o("hand", "Ich halte gleichzeitig am Zügel", { "c-widerspruch": 3 }, "du hältst gleichzeitig am Zügel"),
    ]),
    seit({ pause: { "c-kondition": 2 } }),
    veraendert({ haltung: { "c-motivation": 1 } }),
    stand(),
  ],
  causes: [
    c("c-abgestumpft", "Das Pferd hat gelernt, den Schenkel zu überhören", "Ständiges Treiben macht den Schenkel zum Hintergrundgeräusch. Feine Frage, klare Nachfrage, sofortige Ruhe – so bekommt er wieder Bedeutung.", ["ex-hilfe-3", "ex-trab-3", "ex-ueb-3"]),
    c("c-aufwaermen", "Zu kurze Aufwärmphase", "Viele Pferde brauchen Zeit, bis Muskeln und Gelenke warm sind. Eine längere Schrittphase und lösendes Traben helfen.", ["ex-gy-2", "ex-hilfe-3"]),
    c("c-kondition", "Müdigkeit und Kondition", "Fehlt Kondition, lässt der Fleiß gegen Ende nach. Kürzere, häufigere Einheiten bauen sie auf.", ["ex-trab-3", "ex-ueb-3"]),
    c("c-balance", "Balance statt Fleiß", "Wird das Pferd schneller statt fleißiger, fehlt ihm Balance. Übergänge helfen, die Hinterhand zu aktivieren.", ["ex-trab-1", "ex-ueb-2"]),
    c("c-hilfengebung", "Unklare Schenkelhilfe", "Mit hochgezogener Ferse wird die Hilfe unklar und das Bein unruhig. Ein kurzer Impuls aus der Wade ist deutlicher.", ["ex-hilfe-3", "ex-sitz-6"]),
    c("c-widerspruch", "Gas und Bremse gleichzeitig", "Treibt der Schenkel, während die Hand festhält, bekommt das Pferd zwei widersprüchliche Signale – und wählt oft das Langsamere.", ["ex-hilfe-2", "ex-hilfe-3", "ex-hilfe-5"]),
    c("c-motivation", "Motivation und Abwechslung", "Immer dieselben Runden machen Pferde stumpf. Stangen, Übergänge und neue Linien wecken Interesse.", ["ex-st-1", "ex-ueb-3", "ex-trab-3"]),
    koerper("Träge Pferde haben manchmal körperliche Gründe – zum Beispiel Schmerzen, eine Erkrankung, fehlende Kondition oder einen drückenden Sattel."),
  ],
  fallback: ["ex-hilfe-3", "ex-trab-3", "ex-gy-2"],
  gentle: ["ex-gy-2", "ex-hilfe-5", "ex-sitz-6"],
  mistakes: ["Mit jedem Tritt klopfen", "Nach der Reaktion weitertreiben, statt Ruhe zu geben", "Gleichzeitig treiben und am Zügel halten"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd ist plötzlich deutlich träger als sonst.", "Es reagiert auf den Schenkel mit Ohrenanlegen, Schweifschlagen oder Ausschlagen."],
  lessons: ["ra-w3-l2", "ra-w18-l5", "ra-w8-l4", "ra-w18-l7"],
  riderLab: ["rl-04", "rl-19"],
  plan: {
    goal: "Mein Pferd reagiert auf feine Hilfen",
    weeks: [
      { title: "Fein fragen, klar nachfragen", focus: "Reaktion auf leise Hilfen", exercises: ["ex-hilfe-3", "ex-gy-2"] },
      { title: "Fleißiger Trab", focus: "Treiben im Rhythmus", exercises: ["ex-trab-3", "ex-hilfe-3"] },
      { title: "Abwechslung", focus: "Übergänge und Stangen", exercises: ["ex-ueb-3", "ex-st-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-hilfe-3", "ex-trab-3"] },
    ],
  },
};

export const cp12: CoachProblemContent = {
  id: "cp-12",
  review: "geprueft",
  intro: "Ein Pferd, das sehr stark auf Hilfen reagiert, ist oft sensibel oder angespannt – und braucht vor allem feinere, ruhigere Hilfen.",
  understand: [
    "Feine Pferde reagieren schon auf kleinste Bewegungen. Was für ein anderes Pferd eine leise Hilfe ist, ist für sie laut.",
    "Hilfen wirken am besten, wenn sie so klein wie möglich und so klar wie nötig sind – und wenn der Reiter dazwischen ruhig sitzt.",
    "Starke Abwehrreaktionen wie Buckeln oder Ausschlagen gehören zuerst gesundheitlich abgeklärt.",
  ],
  questions: [
    q("q-wann", "Worauf reagiert dein Pferd besonders stark?", [
      o("schenkel", "Auf den Schenkel", { "c-zu-stark": 2, "c-bein": 1 }, "es reagiert stark auf den Schenkel"),
      o("hand", "Auf die Zügel", { "c-hand": 3 }, "es reagiert stark auf die Zügel"),
      o("gewicht", "Auf Gewichtsverlagerung", { "c-sitz": 3 }, "es reagiert stark auf dein Gewicht"),
      o("alle", "Auf fast alles", { "c-anspannung": 3 }, "es reagiert auf fast alles stark"),
    ]),
    q("q-wie", "Wie zeigt sich das?", [
      o("schnell", "Es wird schneller oder springt los", { "c-anspannung": 2 }, "es wird schneller oder springt los"),
      o("eng", "Es wird eng oder wirft den Kopf", { "c-hand": 2 }, "es wird eng oder wirft den Kopf"),
      o("seitlich", "Es weicht seitlich aus", { "c-bein": 2 }, "es weicht seitlich aus"),
      o("abwehr", "Es buckelt oder schlägt aus", { "c-koerper": 2 }, "es buckelt oder schlägt aus", "abklaeren"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("unruhig", "Mein Bein ist unruhig", { "c-bein": 3 }, "dein Bein ist unruhig"),
      o("stark", "Ich gebe eher starke Hilfen", { "c-zu-stark": 3 }, "du gibst eher starke Hilfen"),
      o("fest", "Ich bin angespannt", { "c-anspannung": 2, "c-sitz": 1 }, "du bist angespannt"),
    ]),
    seit(),
    veraendert({ haltung: { "c-anspannung": 1 } }),
    stand(),
  ],
  causes: [
    c("c-zu-stark", "Hilfen zu stark dosiert", "Für ein feines Pferd sind kräftige Hilfen zu viel. Weniger ist hier deutlich mehr.", ["ex-hilfe-4", "ex-hilfe-1"]),
    c("c-bein", "Unruhiges Bein", "Ein unruhiges Bein sendet ständig Signale – das empfindliche Pferd beantwortet jedes davon.", ["ex-sitz-3", "ex-sitz-6"]),
    c("c-hand", "Harte oder unruhige Hand", "Jede Bewegung der Hand kommt im Maul an. Ruhige, weiche Hände geben Sicherheit.", ["ex-hilfe-5", "ex-hand-1", "ex-hilfe-2"]),
    c("c-sitz", "Unruhiger Sitz", "Gewicht ist eine starke Hilfe. Ein unruhiger Sitz sendet ungewollte Signale.", ["ex-sitz-4", "ex-sitz-1"]),
    c("c-anspannung", "Anspannung bei Pferd und Reiter", "Anspannung überträgt sich. Ruhige Atmung, Pausen und Dehnung helfen beiden.", ["ex-hilfe-4", "ex-gy-2", "ex-ueb-1"]),
    koerper("Sehr starke Reaktionen auf Schenkel oder Gewicht können auch Schmerz im Rücken oder ein drückender Sattel sein."),
  ],
  fallback: ["ex-sitz-1", "ex-gy-2", "ex-hilfe-5"],
  gentle: ["ex-gy-2", "ex-sitz-1", "ex-sitz-6"],
  mistakes: ["Das Bein ganz vom Pferd wegnehmen", "Bei jeder Reaktion stärker werden", "Mehrere Hilfen gleichzeitig geben"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd buckelt, schlägt aus oder reagiert schmerzhaft auf Berührung."],
  lessons: ["ra-w8-l1", "ra-w18-l7", "ra-w17-l10"],
  riderLab: ["rl-12", "rl-09"],
  plan: {
    goal: "Feine Hilfen, entspanntes Pferd",
    weeks: [
      { title: "Ruhe im Sitz", focus: "Balance und Atmung", exercises: ["ex-sitz-1", "ex-gy-2"] },
      { title: "Kleinste Hilfen", focus: "Übergänge mit minimaler Hilfe", exercises: ["ex-hilfe-4", "ex-hilfe-1"] },
      { title: "Weiche Verbindung", focus: "Ruhige Hand", exercises: ["ex-hilfe-5", "ex-hilfe-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-hilfe-4", "ex-gy-2"] },
    ],
  },
};

export const cp13: CoachProblemContent = {
  id: "cp-13",
  review: "geprueft",
  intro: "Übergänge zeigen, wie gut Reiter und Pferd zusammenarbeiten. Fast immer liegt der Schlüssel in der Vorbereitung.",
  understand: [
    "Jeder Übergang wird mit halben Paraden angekündigt: Das Pferd wird aufmerksam und verlagert sein Gewicht etwas nach hinten.",
    "Aufwärts kommt der Impuls aus Schenkel und Sitz, abwärts aus Gewicht und Schenkel – die Hand begleitet nur.",
    "Ein Übergang ist gelungen, wenn Takt und Anlehnung erhalten bleiben.",
  ],
  questions: [
    q("q-welche", "Welche Übergänge fallen schwer?", [
      o("hoch", "Aufwärts – in den Trab oder Galopp", { "c-reaktion": 3 }, "vor allem Übergänge aufwärts"),
      o("runter", "Abwärts – zum Trab oder Schritt", { "c-parade": 3 }, "vor allem Übergänge abwärts"),
      o("beide", "Beide Richtungen", { "c-vorbereitung": 2, "c-balance": 1 }, "Übergänge in beide Richtungen"),
      o("halt", "Zum Halten", { "c-parade": 2, "c-vorbereitung": 1 }, "vor allem zum Halten"),
    ]),
    q("q-wie", "Was passiert dabei?", [
      o("spaet", "Das Pferd reagiert spät", { "c-vorbereitung": 2, "c-reaktion": 1 }, "dein Pferd reagiert spät"),
      o("abrupt", "Der Übergang kommt abrupt", { "c-balance": 2, "c-parade": 1 }, "der Übergang kommt abrupt"),
      o("schnell", "Das Pferd wird erst schneller", { "c-balance": 3 }, "dein Pferd wird erst schneller"),
      o("kopf", "Es nimmt den Kopf hoch", { "c-hand": 3 }, "dein Pferd nimmt den Kopf hoch"),
    ]),
    reiter("Was machst du selbst beim Übergang?", [
      o("vorbereit", "Ich bereite kaum vor", { "c-vorbereitung": 3 }, "du bereitest kaum vor"),
      o("zuegel", "Ich nutze vor allem den Zügel", { "c-hand": 2, "c-parade": 1 }, "du nutzt vor allem den Zügel"),
      o("sitz", "Ich verliere dabei den Sitz", { "c-sitz": 3 }, "du verlierst beim Übergang den Sitz"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-vorbereitung", "Fehlende Vorbereitung", "Ohne Ankündigung kommt die Hilfe für das Pferd überraschend. Zwei, drei halbe Paraden vorher machen es aufmerksam.", ["ex-ueb-1", "ex-hilfe-1", "ex-ueb-3"]),
    c("c-reaktion", "Fehlende Reaktion auf treibende Hilfen", "Reagiert das Pferd zu spät auf den Schenkel, kommen Übergänge aufwärts schleppend.", ["ex-hilfe-3", "ex-trab-3"]),
    c("c-parade", "Paraden ohne Sitz", "Übergänge abwärts entstehen aus Gewicht und Schenkel, nicht nur aus der Hand.", ["ex-hilfe-1", "ex-ueb-2", "ex-hilfe-6"]),
    c("c-balance", "Balance des Pferdes", "Fehlt die Balance, fällt das Pferd in den Übergang hinein oder eilt davor.", ["ex-ueb-2", "ex-trab-1"]),
    c("c-hand", "Der Zügel ist zu dominant", "Arbeitet vor allem die Hand, wehrt sich das Pferd mit dem Kopf.", ["ex-hilfe-2", "ex-hilfe-5"]),
    c("c-sitz", "Sitz im Übergang", "Wer beim Übergang die Balance verliert, gibt ungewollte Signale.", ["ex-sitz-1", "ex-sitz-4"]),
    koerper("Werden Übergänge plötzlich schwierig oder wehrt sich das Pferd, kann auch Schmerz in Rücken oder Hinterhand dahinterstecken."),
  ],
  fallback: ["ex-ueb-1", "ex-hilfe-1", "ex-trab-1"],
  gentle: ["ex-ueb-1", "ex-hilfe-1", "ex-sitz-1"],
  mistakes: ["Übergänge ohne Ankündigung reiten", "Nur mit dem Zügel durchparieren", "Zu viele Übergänge hintereinander"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd wehrt sich bei Übergängen deutlich."],
  lessons: ["ra-w18-l11", "ra-w6-l4", "ra-w4-l4", "ra-w18-l7"],
  riderLab: ["rl-12", "rl-09"],
  plan: {
    goal: "Weiche, vorbereitete Übergänge",
    weeks: [
      { title: "Ankündigen", focus: "Halbe Paraden und Halten", exercises: ["ex-hilfe-1", "ex-ueb-1"] },
      { title: "Übergänge im Trab", focus: "Trab–Schritt–Trab", exercises: ["ex-ueb-2", "ex-trab-1"] },
      { title: "Planbar machen", focus: "Übergänge nach Zählen", exercises: ["ex-ueb-3", "ex-hilfe-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ueb-1", "ex-ueb-2"] },
    ],
  },
};

export const cp14: CoachProblemContent = {
  id: "cp-14",
  review: "geprueft",
  intro: "Ruhiges Stehenbleiben ist eine Vertrauens- und Gehorsamsfrage – und eine Frage gut vorbereiteter Paraden.",
  understand: [
    "Das Halten ist eine ganze Parade: mehrere halbe Paraden hintereinander, bis das Pferd steht. Gewicht und Schenkel bleiben dabei aktiv.",
    "Steht das Pferd, wird es durch Nachgeben belohnt. Wer weiter festhält, lädt zum Weiterlaufen oder Rückwärtsgehen ein.",
    "Stillstehen lässt sich auch vom Boden aus gut üben.",
  ],
  questions: [
    q("q-wie", "Was passiert, wenn du anhalten willst?", [
      o("weiter", "Es läuft einfach weiter", { "c-parade": 3 }, "es läuft einfach weiter"),
      o("trippeln", "Es hält kurz, dann tritt es los", { "c-ungeduld": 3 }, "es hält nur kurz"),
      o("seitlich", "Es weicht zur Seite aus", { "c-gerade": 3 }, "es weicht zur Seite aus"),
      o("rueck", "Es geht rückwärts", { "c-hand": 3 }, "es geht rückwärts"),
    ]),
    q("q-wo", "Wo passiert das vor allem?", [
      o("ueberall", "Überall", { "c-parade": 1, "c-ungeduld": 1 }, "überall"),
      o("tor", "Nahe am Ausgang oder bei anderen Pferden", { "c-umgebung": 3 }, "vor allem nahe am Ausgang oder bei anderen Pferden"),
      o("aufsteigen", "Beim Aufsteigen", { "c-aufsteigen": 3 }, "vor allem beim Aufsteigen"),
    ]),
    reiter("Wie hältst du an?", [
      o("zuegel", "Ich halte vor allem mit dem Zügel", { "c-hand": 2, "c-parade": 1 }, "du hältst vor allem mit dem Zügel"),
      o("spaet", "Ich bereite eher spät vor", { "c-parade": 2 }, "du bereitest eher spät vor"),
      o("nachgeben", "Ich gebe nach, sobald es steht"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-parade", "Die ganze Parade kommt nicht durch", "Ohne Vorbereitung und ohne Gewicht wird das Halten zum Zerren am Zügel.", ["ex-ueb-1", "ex-hilfe-1"]),
    c("c-ungeduld", "Ungeduld", "Manche Pferde haben nicht gelernt, dass Stehen etwas Angenehmes ist. Kurz stehen, loben, wieder anreiten – und langsam steigern.", ["ex-ueb-1", "ex-bo-1"]),
    c("c-gerade", "Das Pferd ist nicht gerade", "Weicht das Pferd seitlich aus, fehlt die Begrenzung durch beide Schenkel.", ["ex-ger-1", "ex-ueb-1"]),
    c("c-hand", "Zu starke Zügelhilfe", "Zu viel Zug lässt das Pferd rückwärts ausweichen.", ["ex-hilfe-1", "ex-hilfe-5"]),
    c("c-umgebung", "Ablenkung", "Ausgang und andere Pferde ziehen. Dort zu halten ist schwieriger – erst an ruhigen Stellen üben.", ["ex-ueb-1", "ex-bo-1"]),
    c("c-aufsteigen", "Unruhe beim Aufsteigen", "Stillstehen beim Aufsteigen lässt sich vom Boden aus üben. Eine Aufstiegshilfe schont dabei den Pferderücken.", ["ex-bo-1", "ex-ueb-1"]),
    koerper("Kann ein Pferd nicht ruhig stehen, kann auch ein drückender Sattel oder Gurt dahinterstecken."),
  ],
  fallback: ["ex-ueb-1", "ex-hilfe-1", "ex-bo-1"],
  gentle: ["ex-ueb-1", "ex-hilfe-1", "ex-bo-1"],
  mistakes: ["Weiter am Zügel halten, wenn das Pferd steht", "Zu lange Stehen verlangen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd wird beim Gurten oder Aufsteigen unruhig, schnappt oder tritt."],
  lessons: ["ra-w4-l4", "ra-w18-l7", "ra-w1-l4"],
  riderLab: ["rl-12"],
  plan: {
    goal: "Ruhig stehen bleiben",
    weeks: [
      { title: "Halten vorbereiten", focus: "Halbe Paraden", exercises: ["ex-hilfe-1", "ex-ueb-1"] },
      { title: "Stehen vom Boden", focus: "Anhalten und Antreten", exercises: ["ex-bo-1", "ex-ueb-1"] },
      { title: "Gerade halten", focus: "Viertellinie", exercises: ["ex-ger-1", "ex-ueb-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ueb-1", "ex-hilfe-1"] },
    ],
  },
};

export const cp15: CoachProblemContent = {
  id: "cp-15",
  review: "geprueft",
  intro: "Eine konstante Anlehnung entsteht von hinten nach vorn – aus Takt, Losgelassenheit und einer ruhigen Hand.",
  understand: [
    "Anlehnung ist die weiche, stete Verbindung zwischen Reiterhand und Pferdemaul. Sie ist das Ergebnis, nicht der Anfang: Das Pferd sucht sie, wenn es losgelassen und im Takt vorwärts geht.",
    "Wechselt die Verbindung ständig, liegt es oft an einer unruhigen Hand oder an fehlendem Schub aus der Hinterhand.",
    "Ein Pferd, das sich auf die Hand legt, braucht mehr Balance – keinen stärkeren Zügel.",
  ],
  questions: [
    q("q-wie", "Wie fühlt sich die Anlehnung an?", [
      o("wechsel", "Mal fest, mal weg", { "c-hand": 2, "c-takt": 1 }, "die Anlehnung ist mal fest, mal weg"),
      o("weg", "Das Pferd geht hinter den Zügel", { "c-schub": 2, "c-hand": 1 }, "dein Pferd geht hinter den Zügel"),
      o("fest", "Sehr schwer in der Hand", { "c-balance": 3 }, "dein Pferd ist schwer in der Hand"),
      o("kopf", "Das Pferd trägt den Kopf hoch", { "c-losgelassen": 3 }, "dein Pferd trägt den Kopf hoch"),
    ]),
    q("q-wann", "Wann ist es am schwierigsten?", [
      o("anfang", "Am Anfang", { "c-losgelassen": 2 }, "vor allem am Anfang"),
      o("trab", "Im Trab", { "c-takt": 2, "c-hand": 1 }, "vor allem im Trab"),
      o("wendung", "In Wendungen", { "c-biegung": 3 }, "vor allem in Wendungen"),
      o("immer", "Immer gleich"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("offen", "Meine Hände sind unruhig oder offen", { "c-hand": 3 }, "deine Hände sind unruhig"),
      o("steif", "Meine Arme sind steif", { "c-hand": 2 }, "deine Arme sind steif"),
      o("treiben", "Ich treibe wenig", { "c-schub": 3 }, "du treibst wenig"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-hand", "Unruhige oder steife Hand", "Eine Anlehnung kann nur so gleichmäßig sein wie die Hand, die sie anbietet.", ["ex-hilfe-5", "ex-hand-1"]),
    c("c-schub", "Zu wenig Schub von hinten", "Ohne fleißige Hinterhand sucht das Pferd keine Verbindung nach vorn.", ["ex-trab-3", "ex-ueb-2"]),
    c("c-balance", "Das Pferd stützt sich auf die Hand", "Liegt das Pferd schwer in der Hand, fehlt ihm Balance. Übergänge und halbe Paraden helfen ihm, sich selbst zu tragen.", ["ex-hilfe-6", "ex-ueb-2", "ex-hilfe-2"]),
    c("c-losgelassen", "Fehlende Losgelassenheit", "Ein angespanntes Pferd trägt den Kopf hoch. Erst lösen, dann Anlehnung.", ["ex-gy-2", "ex-hilfe-2", "ex-dr-1"]),
    c("c-takt", "Ungleichmäßiger Takt", "Schwankt der Takt, schwankt die Verbindung. Ein gleichmäßiges Tempo ist die Grundlage.", ["ex-trab-1", "ex-st-1"]),
    c("c-biegung", "Stellung in Wendungen", "In Wendungen geht die Verbindung oft verloren, wenn Stellung und äußerer Zügel nicht zusammenpassen.", ["ex-dr-1", "ex-dr-5"]),
    GEBISS,
  ],
  fallback: ["ex-hilfe-5", "ex-gy-2", "ex-trab-1"],
  gentle: ["ex-gy-2", "ex-hilfe-5", "ex-hilfe-2"],
  mistakes: ["Anlehnung mit der Hand „herstellen“ wollen", "Die Zügel ständig nachfassen", "Zu kurze Zügel"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd zeigt Abwehr gegen das Gebiss oder schiefe Kopfhaltung."],
  lessons: ["ra-w18-l8", "ra-w12-l2", "ra-w13-l2"],
  riderLab: ["rl-14", "rl-13"],
  plan: {
    goal: "Eine gleichmäßige, weiche Anlehnung",
    weeks: [
      { title: "Lösen", focus: "Vorwärts-abwärts und Kauen lassen", exercises: ["ex-gy-2", "ex-hilfe-2"] },
      { title: "Ruhige Hand", focus: "Gleichmäßige Verbindung", exercises: ["ex-hilfe-5", "ex-trab-1"] },
      { title: "Von hinten nach vorn", focus: "Fleiß und Übergänge", exercises: ["ex-trab-3", "ex-ueb-2"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-hilfe-5", "ex-gy-2"] },
    ],
  },
};

export const cp16: CoachProblemContent = {
  id: "cp-16",
  review: "geprueft",
  intro: "Ein Pferd, das hinter den Zügel kriecht, weicht der Verbindung aus. Meist braucht es mehr Vorwärts und eine nachgiebigere Hand.",
  understand: [
    "„Hinter dem Zügel“ heißt: Das Pferd rollt sich ein und weicht dem Gebiss aus, statt es zu suchen. Die Stirn-Nasen-Linie kommt hinter die Senkrechte.",
    "Häufige Gründe sind eine zu feste oder rückwärts wirkende Hand, zu wenig Schub aus der Hinterhand oder eine gelernte Haltung.",
    "Der Weg heraus führt fast immer über Vorwärts und Dehnung – nicht über mehr Zügel.",
  ],
  questions: [
    q("q-wann", "Wann wird dein Pferd eng?", [
      o("kontakt", "Sobald ich die Zügel aufnehme", { "c-hand": 3 }, "sobald du die Zügel aufnimmst"),
      o("tempo", "Wenn es schneller wird", { "c-balance": 2, "c-schub": 1 }, "wenn es schneller wird"),
      o("immer", "Fast immer", { "c-gewohnheit": 2, "c-schub": 1 }, "fast immer"),
      o("spannung", "Wenn es aufgeregt ist", { "c-spannung": 3 }, "wenn es aufgeregt ist"),
    ]),
    q("q-hand", "Wie arbeitet deine Hand?", [
      o("fest", "Ich halte die Zügel eher fest", { "c-hand": 3 }, "du hältst die Zügel eher fest"),
      o("rueck", "Ich nehme oft rückwärts an", { "c-hand": 2, "c-gewohnheit": 1 }, "du nimmst oft rückwärts an"),
      o("wenig", "Weich in der Hand, aber ich treibe wenig", { "c-schub": 3 }, "du treibst wenig"),
      o("weich", "Ich bin eher weich in der Hand"),
    ]),
    q("q-hilfszuegel", "Reitest du mit Hilfszügeln?", [
      o("oft", "Ja, häufig", { "c-gewohnheit": 3 }, "du reitest häufig mit Hilfszügeln"),
      o("manchmal", "Manchmal", { "c-gewohnheit": 1 }),
      o("nein", "Nein"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-hand", "Zu viel oder rückwärts wirkende Hand", "Eine feste oder rückwärts ziehende Hand drängt das Pferd hinter den Zügel. Nachgeben lädt es wieder nach vorn ein.", ["ex-hilfe-2", "ex-gy-2", "ex-hilfe-5"]),
    c("c-schub", "Zu wenig Vorwärts", "Ohne Schub aus der Hinterhand sucht das Pferd die Hand nicht. Fleiß ist die Grundlage.", ["ex-trab-3", "ex-gy-2"]),
    c("c-balance", "Eilen statt tragen", "Ein eiliges Pferd verkriecht sich oft. Ein ruhiges Tempo hilft ihm, sich zu tragen.", ["ex-trab-1", "ex-ueb-2"]),
    c("c-gewohnheit", "Gelernte Haltung", "Häufige Hilfszügel oder lange enge Phasen können die Haltung zur Gewohnheit machen. Dehnungsphasen geben Freiheit zurück.", ["ex-gy-2", "ex-hilfe-2"]),
    c("c-spannung", "Anspannung", "Aufgeregte Pferde machen sich oft eng. Ruhe und Lösen kommen zuerst.", ["ex-gy-2", "ex-hilfe-4"]),
    koerper("Auch Zähne, ein unpassendes Gebiss oder Beschwerden im Genick können dazu führen, dass ein Pferd dem Gebiss ausweicht."),
  ],
  fallback: ["ex-gy-2", "ex-hilfe-2", "ex-trab-3"],
  gentle: ["ex-gy-2", "ex-hilfe-2", "ex-sitz-1"],
  mistakes: ["Das Pferd mit dem Zügel hochziehen wollen", "Langsamer reiten, statt fleißiger"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd zeigt Abwehr im Maul oder schlägt mit dem Kopf."],
  lessons: ["ra-w18-l8", "ra-w12-l2", "ra-w8-l1"],
  riderLab: ["rl-14"],
  plan: {
    goal: "Mein Pferd sucht die Hand nach vorn",
    weeks: [
      { title: "Dehnung", focus: "Vorwärts-abwärts", exercises: ["ex-gy-2", "ex-hilfe-2"] },
      { title: "Fleiß", focus: "Treiben im Rhythmus", exercises: ["ex-trab-3", "ex-gy-2"] },
      { title: "Weiche Verbindung", focus: "Ruhige Hand", exercises: ["ex-hilfe-5", "ex-hilfe-2"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-gy-2", "ex-hilfe-5"] },
    ],
  },
};

export const cp17: CoachProblemContent = {
  id: "cp-17",
  review: "geprueft",
  intro: "Ein Pferd, das gegen die Hand läuft, drückt oder zieht. Zug erzeugt dabei fast immer Gegenzug.",
  understand: [
    "Pferde reagieren auf dauerhaften Druck oft mit Gegendruck. Wer zieht, bekommt ein Pferd, das dagegenhält.",
    "Viele Pferde, die gegen die Hand gehen, sind nicht ausbalanciert oder angespannt. Halbe Paraden im Wechsel mit Nachgeben helfen ihnen, sich zu tragen.",
    "Auch Wendungen mit korrekter Stellung machen das Pferd weicher.",
  ],
  questions: [
    q("q-wann", "Wann läuft dein Pferd gegen die Hand?", [
      o("tempo", "Wenn ich das Tempo reguliere", { "c-parade": 3 }, "wenn du das Tempo regulierst"),
      o("aufregung", "Wenn es aufgeregt ist", { "c-spannung": 3 }, "wenn es aufgeregt ist"),
      o("wendung", "In Wendungen", { "c-biegung": 3 }, "vor allem in Wendungen"),
      o("immer", "Fast immer", { "c-balance": 2, "c-hand": 1 }, "fast immer"),
    ]),
    q("q-wie", "Wie zeigt sich das?", [
      o("kopf", "Es reißt den Kopf hoch", { "c-spannung": 1, "c-hand": 1 }, "es reißt den Kopf hoch"),
      o("zieht", "Es zieht nach vorne-unten", { "c-balance": 3 }, "es zieht nach vorne-unten"),
      o("maul", "Es öffnet das Maul", { "c-hand": 2 }, "es öffnet das Maul"),
      o("weiss", "Schwer zu beschreiben"),
    ]),
    reiter("Was machst du dann?", [
      o("ziehe", "Ich halte dagegen", { "c-hand": 3 }, "du hältst dagegen"),
      o("treiben", "Ich treibe kaum", { "c-balance": 2 }, "du treibst kaum"),
      o("sitz", "Ich sitze unruhig", { "c-sitz": 3 }, "du sitzt unruhig"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-parade", "Paraden ohne Durchlässigkeit", "Kommen Paraden nicht durch, wird gezogen – und das Pferd zieht zurück.", ["ex-hilfe-1", "ex-hilfe-6"]),
    c("c-spannung", "Anspannung", "Ein angespanntes Pferd macht sich fest. Lösen, Pausen und ruhige Hilfen kommen zuerst.", ["ex-gy-2", "ex-hilfe-4", "ex-ueb-1"]),
    c("c-biegung", "Stellung in Wendungen", "Ohne Stellung in Wendungen wird das Pferd steif und drückt gegen die Hand.", ["ex-dr-1", "ex-dr-5"]),
    c("c-balance", "Das Pferd ist auf der Vorhand", "Zieht das Pferd nach vorne-unten, sucht es Halt an der Hand. Übergänge verbessern die Balance.", ["ex-ueb-2", "ex-hilfe-6", "ex-trab-1"]),
    c("c-hand", "Zug erzeugt Gegenzug", "Eine ziehende Hand lässt das Pferd dagegenhalten. Nachgeben unterbricht den Kreislauf.", ["ex-hilfe-2", "ex-hilfe-5"]),
    c("c-sitz", "Unruhiger Sitz", "Ein unruhiger Sitz macht ruhige Hände unmöglich.", ["ex-sitz-4", "ex-sitz-1"]),
    GEBISS,
  ],
  fallback: ["ex-hilfe-1", "ex-hilfe-2", "ex-trab-1"],
  gentle: ["ex-gy-2", "ex-hilfe-2", "ex-sitz-1"],
  mistakes: ["Dagegenhalten", "Schärfere Zäumung als Lösung sehen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd sperrt das Maul auf oder schlägt mit dem Kopf."],
  lessons: ["ra-w18-l8", "ra-w18-l7", "ra-w18-l6"],
  riderLab: ["rl-14", "rl-13"],
  plan: {
    goal: "Weich an der Hand",
    weeks: [
      { title: "Nachgeben lernen", focus: "Kauen lassen", exercises: ["ex-hilfe-2", "ex-gy-2"] },
      { title: "Durchlässige Paraden", focus: "Halbe Paraden", exercises: ["ex-hilfe-1", "ex-hilfe-6"] },
      { title: "Balance", focus: "Übergänge und Volten", exercises: ["ex-ueb-2", "ex-dr-5"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-hilfe-2", "ex-hilfe-6"] },
    ],
  },
};

export const cp18: CoachProblemContent = {
  id: "cp-18",
  review: "geprueft",
  intro: "Die halbe Parade ist die wichtigste Hilfe überhaupt – und eine der schwierigsten. Meist fehlt ein Baustein im Zusammenspiel.",
  understand: [
    "Eine halbe Parade ist ein kurzes Zusammenwirken von Gewicht, Schenkel und Hand: Du sitzt etwas tiefer, der Schenkel treibt, die Hand nimmt kurz an – und gibt sofort nach.",
    "Sie macht das Pferd aufmerksam, bereitet Übergänge vor und reguliert das Tempo. Ohne Schenkel wird sie zum Bremsen, ohne Nachgeben zum Ziehen.",
    "Timing ist alles: Das Nachgeben kommt im selben Moment, in dem das Pferd reagiert.",
  ],
  questions: [
    q("q-wie", "Was passiert bei deiner halben Parade?", [
      o("nichts", "Das Pferd reagiert gar nicht", { "c-sitz": 2, "c-reaktion": 1 }, "dein Pferd reagiert gar nicht"),
      o("langsam", "Es wird nur langsamer, nicht aufmerksamer", { "c-schenkel": 3 }, "es wird nur langsamer"),
      o("kopf", "Es nimmt den Kopf hoch", { "c-hand": 3 }, "es nimmt den Kopf hoch"),
      o("spaet", "Es reagiert sehr spät", { "c-reaktion": 2, "c-timing": 1 }, "es reagiert sehr spät"),
    ]),
    q("q-was", "Was machst du bei einer halben Parade?", [
      o("zuegel", "Vor allem mit dem Zügel", { "c-hand": 2, "c-sitz": 1 }, "du gibst sie vor allem mit dem Zügel"),
      o("alles", "Gewicht, Schenkel und Zügel"),
      o("unsicher", "Ich weiß nicht genau, wie es geht", { "c-wissen": 3 }, "du bist unsicher, wie sie geht"),
    ]),
    q("q-nachgeben", "Gibst du danach nach?", [
      o("ja", "Ja, sofort"),
      o("spaet", "Eher spät", { "c-timing": 3 }, "du gibst eher spät nach"),
      o("nein", "Ich halte eher fest", { "c-hand": 2, "c-timing": 1 }, "du hältst eher fest"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-sitz", "Die Gewichtshilfe fehlt", "Ohne tieferen Sitz bleibt die halbe Parade eine reine Zügelhilfe – und kommt nicht durch.", ["ex-hilfe-1", "ex-sitz-1"]),
    c("c-schenkel", "Ohne treibenden Schenkel", "Fehlt der Schenkel, wird aus der halben Parade ein Bremsen. Das Pferd soll aufmerksamer werden, nicht nur langsamer.", ["ex-hilfe-1", "ex-hilfe-3"]),
    c("c-hand", "Die Hand wirkt zu stark", "Zu viel Hand lässt das Pferd den Kopf hochnehmen.", ["ex-hilfe-2", "ex-hilfe-5"]),
    c("c-reaktion", "Fehlende Aufmerksamkeit", "Reagiert das Pferd spät, hilft es, Hilfen klar und einmalig zu geben – und auf die Reaktion zu warten.", ["ex-hilfe-3", "ex-ueb-1"]),
    c("c-timing", "Das Nachgeben kommt zu spät", "Das Nachgeben ist die Belohnung. Kommt es zu spät, lernt das Pferd nichts daraus.", ["ex-hilfe-1", "ex-hilfe-6"]),
    c("c-wissen", "Der Ablauf ist noch nicht klar", "Die halbe Parade ist komplex. Eine Lektion und Übungen im Schritt helfen, den Ablauf zu verstehen.", ["ex-hilfe-1", "ex-ueb-1"]),
    koerper("Reagiert das Pferd auf Paraden mit Abwehr, können Rücken, Zähne oder Gebiss eine Rolle spielen."),
  ],
  fallback: ["ex-hilfe-1", "ex-ueb-1", "ex-sitz-1"],
  gentle: ["ex-hilfe-1", "ex-ueb-1", "ex-sitz-1"],
  mistakes: ["Nur am Zügel ziehen", "Nachgeben vergessen", "Mehrere Paraden hektisch hintereinander"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd reagiert auf Paraden mit deutlicher Abwehr."],
  lessons: ["ra-w18-l7", "ra-w3-l5", "ra-w3-l3"],
  riderLab: ["rl-12", "rl-09"],
  plan: {
    goal: "Halbe Paraden, die durchkommen",
    weeks: [
      { title: "Im Schritt verstehen", focus: "Halbe Paraden im Schritt", exercises: ["ex-hilfe-1", "ex-sitz-1"] },
      { title: "Halten an Punkten", focus: "Ganze Paraden", exercises: ["ex-ueb-1", "ex-hilfe-1"] },
      { title: "Im Trab", focus: "Halbe Paraden mit Zählen", exercises: ["ex-hilfe-6", "ex-ueb-2"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-hilfe-1", "ex-hilfe-6"] },
    ],
  },
};
