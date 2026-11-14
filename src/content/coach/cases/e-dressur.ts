import type { CoachProblemContent } from "../types";
import { c, koerper, o, q, SAFE_RIDE, seit, stand, veraendert } from "./common";

/** Kategorie E – Dressur & weiterführende Übungen (cp-37 … cp-44). Fachlicher Entwurf, vor Veröffentlichung prüfen lassen. */

const reiter = (text: string, opts: ReturnType<typeof o>[]) => q("q-reiter", text, [...opts, o("weiss-nicht", "Das kann ich nicht einschätzen")], { help: "Wenn du unsicher bist: Lass dich einmal filmen oder frag deine Reitlehrkraft." });
const RUECKEN = koerper("Werden Lektionen plötzlich schwierig oder wehrt sich das Pferd, können Beschwerden in Rücken, Hinterhand oder ein drückender Sattel eine Rolle spielen.");
const SCHIEFE = (ex: string[]) => c("c-schiefe", "Natürliche Schiefe", "Die Schiefe des Pferdes zeigt sich bei Lektionen besonders deutlich. Geraderichten ist eine Daueraufgabe.", ex);

export const cp37: CoachProblemContent = {
  id: "cp-37",
  review: "entwurf",
  intro: "Schenkelweichen ist die erste Seitwärtslektion. Damit sie klappt, muss das Pferd den seitwärtstreibenden Schenkel verstehen.",
  understand: [
    "Beim Schenkelweichen tritt das Pferd vorwärts-seitwärts, leicht gegen die Bewegungsrichtung gestellt. Die inneren Beine treten vor und über die äußeren.",
    "Der innere Schenkel treibt eine Handbreit hinter dem Gurt seitwärts, der äußere Zügel verhindert, dass die Schulter vorausläuft.",
    "Vorhandwendung und Weichen vom Boden sind gute Vorstufen.",
  ],
  questions: [
    q("q-wie", "Was passiert beim Schenkelweichen?", [
      o("vorwaerts", "Es läuft nur vorwärts", { "c-reaktion": 3 }, "es läuft nur vorwärts"),
      o("schulter", "Die Schulter läuft voraus", { "c-aussen": 3 }, "die Schulter läuft voraus"),
      o("huefte", "Die Hinterhand läuft voraus", { "c-zu-viel": 3 }, "die Hinterhand läuft voraus"),
      o("hektisch", "Es wird hektisch", { "c-tempo": 3 }, "es wird hektisch"),
    ]),
    q("q-stellung", "Wie stark stellst du dabei?", [
      o("viel", "Stark", { "c-hals": 3 }, "du stellst stark"),
      o("leicht", "Leicht gegen die Bewegungsrichtung"),
      o("weiss", "Weiß ich nicht", { "c-wissen": 2 }, "du bist unsicher mit der Stellung"),
    ]),
    q("q-vorstufe", "Kennt dein Pferd die Vorhandwendung?", [
      o("ja", "Ja"),
      o("nein", "Nein", { "c-wissen": 2, "c-reaktion": 1 }, "dein Pferd kennt die Vorhandwendung nicht"),
      o("weiss", "Weiß ich nicht", { "c-wissen": 1 }),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-reaktion", "Der seitwärtstreibende Schenkel wird nicht verstanden", "Kennt das Pferd den Schenkel nur als „vorwärts“, muss es „seitwärts“ erst lernen – zuerst im Schritt und mit Geduld.", ["ex-hilfe-3", "ex-dr-2"]),
    c("c-aussen", "Der äußere Zügel begrenzt nicht", "Läuft die Schulter voraus, fehlt die Begrenzung durch den äußeren Zügel.", ["ex-dr-2", "ex-dr-1"]),
    c("c-zu-viel", "Zu viel Schenkel", "Läuft die Hinterhand voraus, war der Schenkel zu weit hinten oder zu stark.", ["ex-dr-2", "ex-hilfe-4"]),
    c("c-tempo", "Zu schnell, zu viel", "Wird das Pferd hektisch, verlangt man zu viele Tritte am Stück. Wenige ruhige Tritte, dann vorwärts.", ["ex-dr-9", "ex-ueb-1"]),
    c("c-hals", "Zu viel Stellung", "Starke Stellung biegt nur den Hals – das Pferd verliert die Balance.", ["ex-dr-1", "ex-dr-2"]),
    c("c-wissen", "Grundlagen fehlen noch", "Vorhandwendung und Weichen vom Boden machen den Schenkel verständlich.", ["ex-hilfe-3", "ex-bo-2", "ex-dr-2"]),
    RUECKEN,
  ],
  fallback: ["ex-hilfe-3", "ex-dr-1", "ex-dr-5"],
  gentle: ["ex-dr-1", "ex-dr-5", "ex-bo-2"],
  mistakes: ["Seitwärts ohne vorwärts", "Zu viel Hals", "Zu viele Tritte auf einmal"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd wehrt sich deutlich gegen den Schenkel."],
  lessons: ["ra-w13-l6", "ra-w13-l5", "ra-w18-l17"],
  riderLab: ["rl-19", "rl-02"],
  plan: {
    goal: "Ruhiges Schenkelweichen",
    weeks: [
      { title: "Schenkel verstehen", focus: "Reaktion und Weichen vom Boden", exercises: ["ex-hilfe-3", "ex-bo-2"] },
      { title: "Erste Tritte", focus: "Viertellinie im Schritt", exercises: ["ex-dr-2", "ex-dr-1"] },
      { title: "Wenige, gute Tritte", focus: "Seitwärts, dann vorwärts", exercises: ["ex-dr-9", "ex-dr-2"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-2", "ex-dr-1"] },
    ],
  },
};

export const cp38: CoachProblemContent = {
  id: "cp-38",
  review: "entwurf",
  intro: "Schulterherein soll das Pferd versammeln – nicht aus dem Takt bringen. Meist ist es zu viel Abstellung oder zu wenig Vorstufe.",
  understand: [
    "Im Schulterherein wird die Vorhand so weit hereingeführt, dass das Pferd auf drei Hufschlaglinien geht. Es ist gleichmäßig gebogen und bleibt im Takt.",
    "Zu viel Abstellung, zu lange Strecken oder fehlender Schwung lassen den Takt verloren gehen.",
    "Schultervor ist die Vorstufe – damit beginnt man.",
  ],
  questions: [
    q("q-wie", "Was fällt dir beim Schulterherein auf?", [
      o("viel", "Ich stelle es stark ab", { "c-abstellung": 3 }, "du stellst stark ab"),
      o("lang", "Ich reite es lange am Stück", { "c-dauer": 3 }, "du reitest es lange am Stück"),
      o("trab", "Vor allem im Trab", { "c-schwung": 2, "c-vorbereitung": 1 }, "vor allem im Trab"),
      o("hals", "Nur der Hals kommt herein", { "c-hals": 3 }, "nur der Hals kommt herein"),
    ]),
    q("q-grund", "Wie gut klappt das Schultervor?", [
      o("gut", "Gut"),
      o("mittel", "Mittelmäßig", { "c-vorbereitung": 2 }, "das Schultervor klappt mittelmäßig"),
      o("nie", "Haben wir nie geübt", { "c-vorbereitung": 3 }, "ihr habt das Schultervor nie geübt"),
    ]),
    q("q-tempo", "Wie ist das Tempo vorher?", [
      o("eilig", "Eilig", { "c-tempo": 2, "c-schwung": 1 }, "das Tempo ist vorher eilig"),
      o("traege", "Eher träge", { "c-schwung": 3 }, "das Tempo ist vorher träge"),
      o("gut", "Gleichmäßig"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-abstellung", "Zu viel Abstellung", "Zu viel Abstellung macht aus dem Schulterherein eine Seitwärtsbewegung – der Takt geht verloren.", ["ex-ger-2", "ex-dr-3"]),
    c("c-dauer", "Zu lange Strecken", "Schulterherein ist anstrengend. Wenige gute Tritte sind besser als eine ganze lange Seite.", ["ex-dr-9", "ex-dr-3"]),
    c("c-schwung", "Zu wenig Schwung", "Ohne Fleiß kann das Pferd die Lektion nicht im Takt tragen.", ["ex-trab-3", "ex-ueb-2"]),
    c("c-vorbereitung", "Die Vorstufe fehlt", "Schultervor bereitet Schulterherein vor – Schritt für Schritt.", ["ex-ger-2", "ex-dr-1"]),
    c("c-hals", "Nur der Hals kommt herein", "Mit dem inneren Zügel kommt nur der Hals herein. Die Schultern führt man mit beiden Zügeln.", ["ex-dr-1", "ex-ger-2"]),
    c("c-tempo", "Eiliges Tempo", "Ein eiliges Pferd kann sich im Schulterherein nicht tragen.", ["ex-trab-1", "ex-hilfe-6"]),
    RUECKEN,
  ],
  fallback: ["ex-dr-1", "ex-trab-1", "ex-dr-5"],
  gentle: ["ex-dr-1", "ex-trab-1", "ex-dr-5"],
  mistakes: ["Zu viel Abstellung", "Nur den Hals hereinziehen", "Die ganze lange Seite verlangen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd wird in Seitengängen auffällig steif oder taktunrein."],
  lessons: ["ra-w13-l7", "ra-w18-l17", "ra-w12-l1"],
  riderLab: ["rl-02"],
  plan: {
    goal: "Schulterherein im Takt",
    weeks: [
      { title: "Fleiß und Takt", focus: "Gleichmäßiges Tempo", exercises: ["ex-trab-1", "ex-trab-3"] },
      { title: "Schultervor", focus: "Die Vorstufe", exercises: ["ex-ger-2", "ex-dr-1"] },
      { title: "Wenige Tritte", focus: "Schulterherein im Schritt", exercises: ["ex-dr-9", "ex-dr-3"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ger-2", "ex-dr-9"] },
    ],
  },
};

export const cp39: CoachProblemContent = {
  id: "cp-39",
  review: "entwurf",
  intro: "Hektik in Seitengängen ist meist ein Zeichen von Überforderung oder zu viel Druck.",
  understand: [
    "Seitengänge sind für das Pferd koordinativ anspruchsvoll. Wird zu viel auf einmal verlangt oder zu viel getrieben, wird es hektisch.",
    "Kurze Reprisen, viel Lob, das Vorwärts nicht vergessen und immer wieder Pausen helfen, Ruhe hineinzubringen.",
    "Bleibt das Pferd trotz Ruhe hektisch, sollten Rücken und Hinterhand untersucht werden.",
  ],
  questions: [
    q("q-welche", "Bei welchen Seitengängen?", [
      o("sw", "Beim Schenkelweichen", { "c-druck": 2, "c-dauer": 1 }, "beim Schenkelweichen"),
      o("sh", "Beim Schulterherein", { "c-dauer": 2, "c-anforderung": 1 }, "beim Schulterherein"),
      o("tr", "Bei Travers oder Traversale", { "c-anforderung": 3 }, "bei Travers oder Traversale"),
      o("alle", "Bei allen", { "c-druck": 2, "c-dauer": 1 }, "bei allen Seitengängen"),
    ]),
    q("q-wie", "Wie zeigt sich die Hektik?", [
      o("eilig", "Es wird eilig", { "c-druck": 2 }, "es wird eilig"),
      o("kopf", "Es wirft den Kopf", { "c-hand": 3 }, "es wirft den Kopf"),
      o("flucht", "Es läuft seitwärts davon", { "c-druck": 3 }, "es läuft seitwärts davon"),
    ]),
    q("q-dauer", "Wie viele Tritte verlangst du?", [
      o("lang", "Viele Tritte am Stück", { "c-dauer": 3 }, "du verlangst viele Tritte am Stück"),
      o("kurz", "Nur wenige Tritte"),
      o("weiss", "Weiß ich nicht"),
    ]),
    seit(),
    veraendert({ haltung: { "c-druck": 1 } }),
    stand(),
  ],
  causes: [
    c("c-druck", "Zu viel Druck", "Starkes Treiben macht feine Pferde hektisch. Feinere Hilfen und mehr Pausen beruhigen.", ["ex-hilfe-4", "ex-dr-9"]),
    c("c-dauer", "Zu viele Tritte am Stück", "Seitengänge sind anstrengend. Kurz und gut ist besser als lang und hektisch.", ["ex-dr-9", "ex-ueb-1"]),
    c("c-anforderung", "Die Anforderung ist zu hoch", "Travers und Traversale setzen sichere Grundlagen voraus. Zurück zu einfacheren Seitengängen hilft.", ["ex-dr-9", "ex-dr-2"]),
    c("c-hand", "Die Hand hält fest", "Hält die Hand fest, wirft das Pferd den Kopf. Die Hand begleitet nur.", ["ex-hilfe-2", "ex-hilfe-5"]),
    koerper("Hektik bei Seitengängen kann auch an Beschwerden in Rücken oder Hinterhand liegen."),
  ],
  fallback: ["ex-ueb-1", "ex-gy-2", "ex-hilfe-5"],
  gentle: ["ex-gy-2", "ex-ueb-1", "ex-hilfe-2"],
  mistakes: ["Lange Seitengänge reiten", "Mehr treiben, wenn es hektisch wird", "Seitengänge ohne Pausen"],
  safety: SAFE_RIDE,
  checkWhen: ["Die Hektik bleibt auch bei ganz wenigen Tritten.", "Dein Pferd wirkt in der Hinterhand steif."],
  lessons: ["ra-w18-l17", "ra-w17-l4", "ra-w8-l2"],
  riderLab: ["rl-12"],
  plan: {
    goal: "Ruhige Seitengänge",
    weeks: [
      { title: "Ruhe", focus: "Pausen und feine Hilfen", exercises: ["ex-hilfe-4", "ex-gy-2"] },
      { title: "Wenige Tritte", focus: "Seitwärts, dann vorwärts", exercises: ["ex-dr-9", "ex-ueb-1"] },
      { title: "Schenkelweichen", focus: "Einfach und ruhig", exercises: ["ex-dr-2", "ex-dr-9"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-9", "ex-hilfe-4"] },
    ],
  },
};

export const cp40: CoachProblemContent = {
  id: "cp-40",
  review: "entwurf",
  intro: "Geraderichten ist ein Ausbildungsziel für das ganze Pferdeleben. Es beginnt mit Vorwärts und einem gerade sitzenden Reiter.",
  understand: [
    "Gerade gerichtet ist ein Pferd, wenn die Hinterhufe in die Spur der Vorderhufe treten – auf geraden und gebogenen Linien.",
    "Die natürliche Schiefe wird über gleichmäßige Gymnastik beider Seiten verbessert. Schultervor bringt die Vorhand vor die Hinterhand.",
    "Ohne fleißiges Vorwärts gelingt kein Geraderichten.",
  ],
  questions: [
    q("q-wie", "Was beobachtest du?", [
      o("huefte", "Die Hinterhand läuft seitlich versetzt", { "c-schiefe": 3 }, "die Hinterhand läuft seitlich versetzt"),
      o("schulter", "Die Schulter drängt zur Seite", { "c-schulter": 3 }, "die Schulter drängt zur Seite"),
      o("linie", "Es läuft Schlangenlinien", { "c-vorwaerts": 2, "c-reiter": 1 }, "es läuft Schlangenlinien"),
      o("hand", "Vor allem auf einer Hand", { "c-schiefe": 2 }, "vor allem auf einer Hand"),
    ]),
    q("q-reiter-seite", "Hast du selbst eine schwächere Seite?", [
      o("ja", "Ja", { "c-reiter": 3 }, "du hast selbst eine schwächere Seite"),
      o("nein", "Nein"),
      o("weiss", "Weiß ich nicht", { "c-reiter": 1 }),
    ]),
    q("q-vorwaerts", "Wie fleißig geht dein Pferd?", [
      o("traege", "Eher träge", { "c-vorwaerts": 3 }, "dein Pferd geht eher träge"),
      o("eilig", "Eher eilig", { "c-balance": 2, "c-vorwaerts": 1 }, "dein Pferd geht eher eilig"),
      o("gut", "Gleichmäßig fleißig"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    SCHIEFE(["ex-ger-2", "ex-dr-1"]),
    c("c-schulter", "Die Schulter drängt", "Drängt die Schulter, hilft Schulterkontrolle mit äußerem Zügel und Schenkel.", ["ex-ger-2", "ex-dr-4"]),
    c("c-vorwaerts", "Ohne Vorwärts kein Geradeaus", "Ein träges Pferd schwankt. Fleiß macht gerade.", ["ex-trab-3", "ex-ger-1"]),
    c("c-reiter", "Die Schiefe des Reiters", "Ein schief sitzender Reiter macht das Pferd schief. Training ohne Pferd hilft auch dir.", ["ex-sitz-6", "ex-sitz-4"]),
    c("c-balance", "Balance", "Ein eiliges Pferd kann sich nicht gerade tragen.", ["ex-trab-1", "ex-hilfe-6"]),
    RUECKEN,
  ],
  fallback: ["ex-trab-1", "ex-dr-1", "ex-sitz-6"],
  gentle: ["ex-dr-1", "ex-trab-1", "ex-sitz-6"],
  mistakes: ["Mit dem Zügel geradeziehen", "Nur auf der guten Hand reiten"],
  safety: SAFE_RIDE,
  checkWhen: ["Die Schiefe ist plötzlich stärker geworden."],
  lessons: ["ra-w18-l10", "ra-w13-l2", "ra-w18-l1"],
  riderLab: ["rl-19", "rl-02"],
  plan: {
    goal: "Ein gerade gerichtetes Pferd",
    weeks: [
      { title: "Vorwärts", focus: "Fleiß und Takt", exercises: ["ex-trab-3", "ex-trab-1"] },
      { title: "Geradeaus ohne Bande", focus: "Viertellinie", exercises: ["ex-ger-1", "ex-dr-1"] },
      { title: "Schultervor", focus: "Vorhand vor die Hinterhand", exercises: ["ex-ger-2", "ex-dr-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ger-1", "ex-ger-2"] },
    ],
  },
};

export const cp41: CoachProblemContent = {
  id: "cp-41",
  review: "entwurf",
  intro: "Fließende Übergänge entstehen aus Vorbereitung, Durchlässigkeit und einem ruhigen Sitz.",
  understand: [
    "Ein fließender Übergang ist vorbereitet, im Takt und ohne Widerstand. Das Pferd bleibt dabei in Anlehnung und Balance.",
    "Abrupte oder holprige Übergänge zeigen fast immer: zu spät vorbereitet, zu viel Hand oder fehlende Balance.",
    "Übergänge innerhalb einer Gangart (Tempounterschiede) sind eine gute Übung für fließende Übergänge zwischen den Gangarten.",
  ],
  questions: [
    q("q-wie", "Wie sind deine Übergänge?", [
      o("abrupt", "Abrupt", { "c-vorbereitung": 2, "c-hand": 1 }, "deine Übergänge sind abrupt"),
      o("spaet", "Das Pferd reagiert zu spät", { "c-durchlaessig": 3 }, "dein Pferd reagiert zu spät"),
      o("kopf", "Mit Kopfschlagen", { "c-hand": 3 }, "dein Pferd schlägt mit dem Kopf"),
      o("holper", "Das Pferd fällt auseinander", { "c-balance": 3 }, "dein Pferd fällt auseinander"),
    ]),
    q("q-welche", "Welche Richtung ist schwieriger?", [
      o("hoch", "Aufwärts", { "c-durchlaessig": 2 }, "vor allem aufwärts"),
      o("runter", "Abwärts", { "c-balance": 1, "c-hand": 1 }, "vor allem abwärts"),
      o("beide", "Beide gleich"),
    ]),
    reiter("Was fällt dir an dir selbst auf?", [
      o("sitz", "Ich verliere den Sitz", { "c-sitz": 3 }, "du verlierst den Sitz"),
      o("vorbereit", "Ich bereite kaum vor", { "c-vorbereitung": 3 }, "du bereitest kaum vor"),
      o("nichts", "Mir fällt nichts auf"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-vorbereitung", "Fehlende Vorbereitung", "Ohne halbe Paraden vorher wird der Übergang abrupt.", ["ex-hilfe-1", "ex-ueb-3", "ex-ueb-1"]),
    c("c-hand", "Zu viel Hand", "Wird der Übergang über die Hand erzwungen, wehrt sich das Pferd mit dem Kopf.", ["ex-hilfe-2", "ex-hilfe-5"]),
    c("c-durchlaessig", "Fehlende Durchlässigkeit", "Reagiert das Pferd spät, kommen die Hilfen nicht durch. Übergänge nach Zählen schulen die Aufmerksamkeit.", ["ex-ueb-3", "ex-hilfe-6"]),
    c("c-balance", "Balance", "Fällt das Pferd auseinander, fehlt Balance. Tempounterschiede helfen.", ["ex-ueb-2", "ex-dr-10"]),
    c("c-sitz", "Sitz im Übergang", "Wer im Übergang den Sitz verliert, stört das Pferd.", ["ex-sitz-4", "ex-sitz-1"]),
    RUECKEN,
  ],
  fallback: ["ex-hilfe-1", "ex-ueb-1", "ex-sitz-1"],
  gentle: ["ex-hilfe-1", "ex-ueb-1", "ex-sitz-1"],
  mistakes: ["Übergänge ohne Ankündigung", "Mit der Hand bremsen", "Zu viele Übergänge hintereinander"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd wehrt sich bei Übergängen deutlich."],
  lessons: ["ra-w18-l11", "ra-w18-l7", "ra-w6-l4"],
  riderLab: ["rl-12", "rl-09"],
  plan: {
    goal: "Fließende Übergänge",
    weeks: [
      { title: "Vorbereiten", focus: "Halbe Paraden", exercises: ["ex-hilfe-1", "ex-ueb-1"] },
      { title: "Aufmerksamkeit", focus: "Übergänge nach Zählen", exercises: ["ex-ueb-3", "ex-ueb-2"] },
      { title: "Tempounterschiede", focus: "Verlängern und verkürzen", exercises: ["ex-dr-10", "ex-hilfe-6"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ueb-2", "ex-ueb-3"] },
    ],
  },
};

export const cp42: CoachProblemContent = {
  id: "cp-42",
  review: "entwurf",
  intro: "Tempounterschiede zeigen, ob ein Pferd sich selbst tragen kann. Weiter heißt nicht schneller.",
  understand: [
    "Beim Zulegen soll das Pferd die Tritte verlängern, nicht die Frequenz erhöhen. Beim Zurückführen nimmt es mehr Gewicht mit der Hinterhand auf.",
    "Fehlt die Balance, wird das Pferd beim Zulegen schneller und fällt auf die Vorhand – und beim Zurückführen auseinander.",
    "Kleine Unterschiede über kurze Strecken sind am Anfang genau richtig.",
  ],
  questions: [
    q("q-wann", "Wann verliert dein Pferd die Balance?", [
      o("zulegen", "Beim Zulegen", { "c-eilig": 3 }, "beim Zulegen"),
      o("zurueck", "Beim Zurückführen", { "c-zurueck": 3 }, "beim Zurückführen"),
      o("beide", "Bei beidem", { "c-balance": 2, "c-kraft": 1 }, "bei beidem"),
    ]),
    q("q-wie", "Was passiert?", [
      o("schnell", "Es wird nur schneller", { "c-eilig": 2, "c-balance": 1 }, "es wird nur schneller"),
      o("vorhand", "Es fällt auf die Vorhand", { "c-balance": 3 }, "es fällt auf die Vorhand"),
      o("schief", "Es wird schief", { "c-schiefe": 3 }, "es wird schief"),
    ]),
    q("q-dauer", "Wie lange verlangst du das?", [
      o("lang", "Über die ganze lange Seite", { "c-kraft": 3 }, "über die ganze lange Seite"),
      o("kurz", "Nur kurz"),
      o("weiss", "Weiß ich nicht"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-eilig", "Schneller statt weiter", "Ein Pferd ohne Schub von hinten wird beim Zulegen eilig statt raumgreifend.", ["ex-dr-10", "ex-trab-1"]),
    c("c-zurueck", "Zurückführen nur mit der Hand", "Beim Zurückführen braucht es halbe Paraden aus Sitz und Schenkel – sonst fällt das Pferd auseinander.", ["ex-hilfe-6", "ex-hilfe-1"]),
    c("c-balance", "Balance", "Ohne Balance kippt das Pferd nach vorn.", ["ex-ueb-2", "ex-dr-10"]),
    c("c-kraft", "Kraft", "Tempounterschiede verlangen Kraft in der Hinterhand. Kurze Strecken bauen sie auf.", ["ex-dr-10", "ex-st-1"]),
    SCHIEFE(["ex-ger-2", "ex-dr-1"]),
    RUECKEN,
  ],
  fallback: ["ex-trab-1", "ex-hilfe-1", "ex-st-1"],
  gentle: ["ex-trab-1", "ex-hilfe-1", "ex-dr-1"],
  mistakes: ["Schneller treiben statt weiter", "Zu lange Strecken", "Abrupt zurückführen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd wirkt beim Zulegen taktunrein."],
  lessons: ["ra-w18-l11", "ra-w13-l4", "ra-w18-l2"],
  riderLab: ["rl-06"],
  plan: {
    goal: "Ausbalancierte Tempounterschiede",
    weeks: [
      { title: "Takt", focus: "Ruhiger Trab", exercises: ["ex-trab-1", "ex-st-1"] },
      { title: "Übergänge", focus: "Trab–Schritt–Trab", exercises: ["ex-ueb-2", "ex-hilfe-6"] },
      { title: "Kleine Unterschiede", focus: "Verlängern und verkürzen", exercises: ["ex-dr-10", "ex-hilfe-6"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-dr-10", "ex-ueb-2"] },
    ],
  },
};

export const cp43: CoachProblemContent = {
  id: "cp-43",
  review: "entwurf",
  intro: "Versammlung ist das Ergebnis guter Grundlagen. Fällt das Pferd auseinander, fehlt meist eine Stufe davor.",
  understand: [
    "In der Versammlung nimmt die Hinterhand mehr Last auf, die Vorhand wird leichter. Das gelingt nur, wenn Takt, Losgelassenheit, Anlehnung, Schwung und Geraderichtung bereits sicher sind.",
    "Versammlung entsteht von hinten nach vorn – nicht durch Zurückhalten mit der Hand.",
    "Kurze Reprisen und viele Übergänge sind der Weg dahin.",
  ],
  questions: [
    q("q-wie", "Was passiert, wenn du versammeln möchtest?", [
      o("eng", "Es wird eng, statt sich zu tragen", { "c-hand": 3 }, "es wird eng"),
      o("langsam", "Es wird nur langsam", { "c-schub": 3 }, "es wird nur langsam"),
      o("takt", "Der Takt geht verloren", { "c-ueberfordert": 2, "c-schub": 1 }, "der Takt geht verloren"),
      o("schief", "Es wird schief", { "c-schiefe": 3 }, "es wird schief"),
    ]),
    q("q-basis", "Wie sicher sind Losgelassenheit und Anlehnung?", [
      o("sicher", "Sicher"),
      o("teils", "Teilweise", { "c-basis": 2 }, "die Grundlagen sind teilweise sicher"),
      o("unsicher", "Eher unsicher", { "c-basis": 3 }, "die Grundlagen sind eher unsicher"),
    ]),
    q("q-dauer", "Wie lange verlangst du Versammlung am Stück?", [
      o("lang", "Lange Reprisen", { "c-ueberfordert": 3 }, "du verlangst lange Reprisen"),
      o("kurz", "Kurze Reprisen"),
      o("weiss", "Weiß ich nicht"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-hand", "Versammeln mit der Hand", "Wer mit der Hand versammeln will, macht das Pferd eng statt tragend.", ["ex-hilfe-2", "ex-hilfe-6"]),
    c("c-schub", "Fehlender Schub", "Ohne Schwung von hinten wird Versammlung zum Langsamwerden.", ["ex-ueb-2", "ex-dr-10"]),
    c("c-ueberfordert", "Zu viel, zu lange", "Versammlung ist Kraftarbeit. Kurze Reprisen schützen das Pferd.", ["ex-dr-10", "ex-ueb-3"]),
    SCHIEFE(["ex-ger-2", "ex-dr-1"]),
    c("c-basis", "Grundlagen der Ausbildungsskala", "Ohne sichere Losgelassenheit und Anlehnung kann ein Pferd sich nicht versammeln.", ["ex-gy-2", "ex-hilfe-5", "ex-trab-1"]),
    RUECKEN,
  ],
  fallback: ["ex-gy-2", "ex-hilfe-5", "ex-trab-1"],
  gentle: ["ex-gy-2", "ex-hilfe-5", "ex-trab-1"],
  mistakes: ["Mit der Hand versammeln", "Zu lange Reprisen", "Grundlagen überspringen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd wirkt bei Versammlung schmerzhaft steif oder taktunrein."],
  lessons: ["ra-w18-l19", "ra-w18-l1", "ra-w13-l2"],
  riderLab: ["rl-12"],
  plan: {
    goal: "Ein Pferd, das sich trägt",
    weeks: [
      { title: "Grundlagen", focus: "Losgelassenheit und Anlehnung", exercises: ["ex-gy-2", "ex-hilfe-5"] },
      { title: "Schwung", focus: "Übergänge", exercises: ["ex-ueb-2", "ex-ueb-3"] },
      { title: "Tempounterschiede", focus: "Verkürzen und verlängern", exercises: ["ex-dr-10", "ex-hilfe-6"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ueb-2", "ex-dr-10"] },
    ],
  },
};

export const cp44: CoachProblemContent = {
  id: "cp-44",
  review: "entwurf",
  intro: "Galoppwechsel bauen auf sicheren Galopp-Übergängen auf. Fehlen diese, kann das Pferd den Wechsel kaum verstehen.",
  understand: [
    "Beim einfachen Galoppwechsel wechselt das Pferd über wenige Trab- oder Schritttritte die Galopphand. Beim fliegenden Wechsel geschieht das in der Schwebephase des Galopps.",
    "Voraussetzung sind sicheres Angaloppieren auf beiden Händen, ruhige Übergänge und ein ausbalancierter Galopp.",
    "Fliegende Wechsel gehören in die Hände erfahrener Reiter – am besten mit Reitlehrkraft.",
  ],
  questions: [
    q("q-welche", "Um welche Wechsel geht es?", [
      o("einfach", "Einfache Wechsel über den Trab", { "c-uebergang": 3 }, "einfache Wechsel"),
      o("fliegend", "Fliegende Wechsel", { "c-zu-frueh": 2, "c-galopp": 1 }, "fliegende Wechsel"),
      o("beide", "Beide", { "c-galopp": 2 }, "einfache und fliegende Wechsel"),
    ]),
    q("q-wie", "Was passiert?", [
      o("falsch", "Es springt falsch an", { "c-umstellen": 3 }, "es springt falsch an"),
      o("hektisch", "Es wird hektisch", { "c-spannung": 2, "c-zu-frueh": 1 }, "es wird hektisch"),
      o("vorne", "Es wechselt nur vorne", { "c-galopp": 3 }, "es wechselt nur vorne"),
      o("nichts", "Es reagiert gar nicht", { "c-hilfen": 3 }, "es reagiert gar nicht"),
    ]),
    q("q-basis", "Wie sicher springt es auf beiden Händen an?", [
      o("sicher", "Sicher"),
      o("teils", "Nicht immer", { "c-uebergang": 2 }, "es springt nicht immer sicher an"),
      o("unsicher", "Eher unsicher", { "c-uebergang": 3 }, "es springt eher unsicher an"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-uebergang", "Übergänge sind noch nicht sicher", "Ohne sicheres Angaloppieren und ruhiges Durchparieren gelingt kein Wechsel.", ["ex-gal-3", "ex-ueb-2"]),
    c("c-zu-frueh", "Zu früh verlangt", "Fliegende Wechsel verlangen viel Balance. Erst einfache Wechsel festigen.", ["ex-gal-8", "ex-gal-4"]),
    c("c-galopp", "Galoppqualität fehlt", "Für den Wechsel braucht das Pferd einen gesprungenen, ausbalancierten Galopp.", ["ex-gal-4", "ex-gal-7"]),
    c("c-umstellen", "Umstellen fehlt", "Vor dem Wechsel muss das Pferd neu gestellt werden.", ["ex-gal-8", "ex-dr-1"]),
    c("c-spannung", "Anspannung", "Wechsel machen manche Pferde aufgeregt. Ruhe und kleine Schritte helfen.", ["ex-ueb-1", "ex-hilfe-4"]),
    c("c-hilfen", "Wechselhilfe unklar", "Die Hilfen für den neuen Galopp müssen eindeutig und gut getimt sein.", ["ex-gal-8", "ex-gal-3"]),
    RUECKEN,
  ],
  fallback: ["ex-dr-1", "ex-ueb-1", "ex-hilfe-1"],
  gentle: ["ex-dr-1", "ex-ueb-1", "ex-hilfe-1"],
  mistakes: ["Fliegende Wechsel zu früh üben", "Viele Wechsel hintereinander", "Wechsel ohne Umstellen"],
  safety: [...SAFE_RIDE, "Fliegende Wechsel nur mit Erfahrung und am besten mit Reitlehrkraft üben."],
  checkWhen: ["Dein Pferd buckelt oder wird bei Wechseln immer hektischer."],
  lessons: ["ra-w18-l18", "ra-w13-l11", "ra-w18-l15"],
  riderLab: ["rl-12", "rl-11"],
  plan: {
    goal: "Saubere Galoppwechsel",
    weeks: [
      { title: "Sicher angaloppieren", focus: "Beide Hände", exercises: ["ex-gal-3", "ex-ueb-2"] },
      { title: "Galoppqualität", focus: "Kurze Reprisen", exercises: ["ex-gal-4", "ex-gal-7"] },
      { title: "Einfache Wechsel", focus: "Über den Trab", exercises: ["ex-gal-8", "ex-dr-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-gal-8", "ex-gal-3"] },
    ],
  },
};
