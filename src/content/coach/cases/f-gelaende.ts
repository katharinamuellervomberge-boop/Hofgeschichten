import type { CoachProblemContent } from "../types";
import { c, koerper, o, q, SAFE_GROUND, SAFE_OUT, seit, stand, veraendert } from "./common";

/**
 * Kategorie F – Gelände & Verhalten (cp-45 … cp-50). Fachlich geprüft (14.11.2026).
 * Bei Verhalten gilt besonders: Sicherheit vor Training, Arbeit vom Boden zuerst, Steigen → Fachperson.
 */

const reiter = (text: string, opts: ReturnType<typeof o>[]) => q("q-reiter", text, [...opts, o("weiss-nicht", "Das kann ich nicht einschätzen")]);
const SAFE = [...SAFE_OUT, ...SAFE_GROUND.slice(0, 2)];

export const cp45: CoachProblemContent = {
  id: "cp-45",
  review: "geprueft",
  intro: "Pferde sind Fluchttiere – Erschrecken gehört zu ihrer Natur. Wie oft und wie stark, lässt sich mit Gewöhnung und Ruhe beeinflussen.",
  understand: [
    "Pferde nehmen ihre Umwelt anders wahr als wir: Sie sehen fast rundum, aber Entfernungen und plötzliche Bewegungen schätzen sie anders ein. Neues ist zunächst potenziell gefährlich.",
    "Gewöhnung entsteht in kleinen Schritten: Das Pferd darf schauen, Abstand halten und selbst entscheiden, näher zu kommen. Druck und Strafe verstärken die Angst.",
    "Deine eigene Ruhe – Atmung, lockerer Sitz – überträgt sich auf das Pferd.",
  ],
  questions: [
    q("q-wann", "Wo erschrickt dein Pferd vor allem?", [
      o("draussen", "Draußen im Gelände", { "c-umwelt": 3 }, "vor allem draußen"),
      o("platz", "In der Halle oder auf dem Platz", { "c-spannung": 2, "c-umwelt": 1 }, "in der Halle oder auf dem Platz"),
      o("wind", "Bei Wind oder Wetterwechsel", { "c-energie": 3 }, "bei Wind oder Wetterwechsel"),
      o("immer", "Fast überall", { "c-spannung": 3 }, "fast überall"),
    ]),
    q("q-reaktion", "Wie reagiert es?", [
      o("zucken", "Es zuckt kurz zusammen"),
      o("springt", "Es springt zur Seite", { "c-umwelt": 2 }, "es springt zur Seite"),
      o("flucht", "Es will flüchten", { "c-spannung": 2, "c-vertrauen": 1 }, "es will flüchten"),
      o("steigt", "Es steigt oder buckelt", { "c-koerper": 2 }, "es steigt oder buckelt", "abklaeren"),
    ]),
    reiter("Wie reagierst du selbst?", [
      o("angst", "Ich bin selbst angespannt", { "c-vertrauen": 3 }, "du bist selbst angespannt"),
      o("festhalten", "Ich halte am Zügel fest", { "c-vertrauen": 2 }, "du hältst am Zügel fest"),
      o("ruhig", "Ich bleibe ruhig"),
    ]),
    seit(),
    veraendert({ haltung: { "c-energie": 2 } }),
    stand(),
  ],
  causes: [
    c("c-umwelt", "Fehlende Gewöhnung", "Was ein Pferd nicht kennt, ist für es erst einmal unheimlich. Kleine Schritte mit Abstand bauen Vertrauen auf.", ["ex-bo-4", "ex-ge-1"]),
    c("c-spannung", "Grundanspannung", "Ein angespanntes Pferd erschrickt schneller. Lösende Arbeit, Pausen und Routinen helfen.", ["ex-gy-2", "ex-bo-1"]),
    c("c-energie", "Viel Energie, wenig Bewegung", "Wenig freie Bewegung oder Wetterumschwünge machen manche Pferde „spritzig“. Freilauf oder ruhiges Longieren vor dem Reiten können helfen.", ["ex-bo-3", "ex-gy-2"]),
    c("c-vertrauen", "Unsicherheit überträgt sich", "Spürt das Pferd deine Anspannung, sucht es selbst nach Gefahr. Ruhige Atmung und Bodenarbeit stärken euch beide.", ["ex-bo-4", "ex-ueb-1", "ex-sitz-1"]),
    koerper("Plötzliche Schreckhaftigkeit kann auch mit Schmerzen, schlechtem Sehen oder anderen gesundheitlichen Gründen zusammenhängen."),
  ],
  fallback: ["ex-bo-4", "ex-bo-1", "ex-ge-1"],
  gentle: ["ex-bo-4", "ex-bo-1", "ex-gy-2"],
  mistakes: ["Das Pferd für das Erschrecken bestrafen", "Es zum Gegenstand zwingen", "Selbst die Luft anhalten"],
  safety: SAFE,
  checkWhen: ["Die Schreckhaftigkeit ist plötzlich viel stärker geworden.", "Dein Pferd steigt oder buckelt beim Erschrecken."],
  lessons: ["ra-w19-l7", "ra-w17-l1", "ra-w17-l4", "ra-w9-l3"],
  riderLab: ["rl-19"],
  plan: {
    goal: "Gelassener werden",
    weeks: [
      { title: "Vom Boden", focus: "Neues anschauen lassen", exercises: ["ex-bo-4", "ex-bo-1"] },
      { title: "Ruhe beim Reiten", focus: "Lösen und Pausen", exercises: ["ex-gy-2", "ex-ueb-1"] },
      { title: "Draußen", focus: "Ruhiger Schritt mit Begleitung", exercises: ["ex-ge-1", "ex-bo-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-bo-4", "ex-ge-1"] },
    ],
  },
};

export const cp46: CoachProblemContent = {
  id: "cp-46",
  review: "geprueft",
  intro: "Allein ins Gelände zu gehen ist für ein Herdentier eine große Aufgabe. Mit kleinen Schritten wird sie lösbar.",
  understand: [
    "Pferde fühlen sich in der Gruppe sicher. Allein müssen sie sich auf den Menschen verlassen – dieses Vertrauen wächst Schritt für Schritt.",
    "Beginne mit sehr kurzen Strecken und kehre um, solange das Pferd noch gelassen ist. So endet jede Übung mit einem Erfolg.",
    "Steigt ein Pferd, ist das gefährlich. Dann gehört eine erfahrene Fachperson dazu.",
  ],
  questions: [
    q("q-wie", "Wie zeigt sich das?", [
      o("stehen", "Es bleibt stehen", { "c-herde": 2, "c-erfahrung": 1 }, "es bleibt stehen"),
      o("umdrehen", "Es dreht um", { "c-herde": 3 }, "es dreht um"),
      o("steigt", "Es steigt", { "c-gefahr": 3 }, "es steigt", "abklaeren"),
      o("nervoes", "Es geht, ist aber sehr nervös", { "c-erfahrung": 3 }, "es ist sehr nervös"),
    ]),
    q("q-erfahrung", "Ist es schon allein ausgeritten?", [
      o("nie", "Noch nie", { "c-erfahrung": 3 }, "es ist noch nie allein ausgeritten"),
      o("frueher", "Früher ja", { "c-erlebnis": 3 }, "früher ging es allein"),
      o("selten", "Selten", { "c-erfahrung": 2 }, "es reitet selten allein aus"),
    ]),
    reiter("Wie fühlst du dich dabei?", [
      o("angst", "Ich bin selbst unsicher", { "c-reiter": 3 }, "du bist selbst unsicher"),
      o("sicher", "Ich fühle mich sicher"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-herde", "Herdentrieb", "Weg von den anderen bedeutet für ein Pferd Unsicherheit. Kurzes Trennen und Zurückkommen übt das.", ["ex-bo-5", "ex-ge-3"]),
    c("c-erfahrung", "Fehlende Erfahrung", "Was ein Pferd noch nie allein gemacht hat, muss es erst lernen. Kleine Strecken, viel Lob.", ["ex-ge-3", "ex-bo-4"]),
    c("c-erlebnis", "Ein schlechtes Erlebnis", "Ging es früher gut, kann ein Schreckerlebnis dahinterstecken. Dann wieder ganz klein anfangen.", ["ex-bo-4", "ex-ge-3"]),
    c("c-reiter", "Unsicherheit beim Reiter", "Ist der Reiter unsicher, fehlt dem Pferd der Halt. Gemeinsam mit einer ruhigen Begleitung üben.", ["ex-ge-4", "ex-bo-5"]),
    c("c-gefahr", "Steigen ist gefährlich", "Steigt dein Pferd, arbeite zuerst vom Boden und hol dir Unterstützung von einer erfahrenen Fachperson.", ["ex-bo-5", "ex-bo-1"]),
    koerper("Plötzlicher Widerstand gegen das Ausreiten kann auch Schmerzen oder ein Ausrüstungsproblem bedeuten."),
  ],
  fallback: ["ex-bo-5", "ex-bo-4", "ex-ge-4"],
  gentle: ["ex-bo-5", "ex-bo-1", "ex-bo-4"],
  mistakes: ["Zu weit beim ersten Mal", "Nur umkehren, wenn das Pferd sich wehrt", "Allein losreiten, wenn du dich unsicher fühlst"],
  safety: SAFE,
  checkWhen: ["Dein Pferd steigt oder dreht sich gefährlich um.", "Der Widerstand ist ganz neu."],
  lessons: ["ra-w19-l1", "ra-w17-l5", "ra-w19-l12"],
  riderLab: ["rl-19"],
  plan: {
    goal: "Allein entspannt ausreiten",
    weeks: [
      { title: "Trennen üben", focus: "Kurz weg und zurück", exercises: ["ex-bo-5", "ex-bo-4"] },
      { title: "Mit Begleitung", focus: "Ruhig in der Gruppe", exercises: ["ex-ge-4", "ex-bo-5"] },
      { title: "Kurze Strecken allein", focus: "Umkehren, solange es gut ist", exercises: ["ex-ge-3", "ex-bo-5"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ge-3", "ex-bo-5"] },
    ],
  },
};

export const cp47: CoachProblemContent = {
  id: "cp-47",
  review: "geprueft",
  intro: "In der Gruppe steckt Hektik schnell an. Klare Absprachen und genug Abstand machen den Unterschied.",
  understand: [
    "Pferde orientieren sich an der Herde. Wird ein Pferd schneller, wollen die anderen mit – bis hin zum Wettrennen.",
    "Feste Reihenfolge, Abstand, angekündigte Tempowechsel und ruhige Begleitpferde nehmen Druck heraus.",
    "Wer sein Pferd in der Gruppe nicht sicher regulieren kann, bleibt im Schritt – das ist kein Versagen, sondern Verantwortung.",
  ],
  questions: [
    q("q-wann", "Wann wird dein Pferd hektisch?", [
      o("tempo", "Beim Traben oder Galoppieren", { "c-wettlauf": 3 }, "beim Traben oder Galoppieren"),
      o("hinten", "Wenn andere vorne sind", { "c-position": 3 }, "wenn andere vorne sind"),
      o("vorne", "Wenn es vorne gehen muss", { "c-position": 2 }, "wenn es vorne gehen muss"),
      o("immer", "Schon im Schritt", { "c-spannung": 3 }, "schon im Schritt"),
    ]),
    q("q-abstand", "Wie eng reitet ihr?", [
      o("eng", "Dicht aufeinander", { "c-abstand": 3 }, "ihr reitet dicht aufeinander"),
      o("weit", "Mit Abstand"),
      o("weiss", "Unterschiedlich", { "c-abstand": 1 }),
    ]),
    q("q-absprache", "Sprecht ihr Tempowechsel ab?", [
      o("nein", "Nein", { "c-wettlauf": 2 }, "ihr sprecht Tempowechsel nicht ab"),
      o("ja", "Ja"),
      o("teils", "Manchmal", { "c-wettlauf": 1 }),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-wettlauf", "Gruppendynamik", "Wird gemeinsam angetrabt oder angaloppiert, wird schnell ein Wettrennen daraus. Nacheinander und angekündigt ist sicherer.", ["ex-ge-4", "ex-ge-5"]),
    c("c-position", "Platz in der Gruppe", "Manche Pferde wollen vorne sein, andere fühlen sich vorne unsicher. Den passenden Platz suchen und langsam wechseln.", ["ex-ge-4", "ex-bo-5"]),
    c("c-spannung", "Grundanspannung", "Ist das Pferd schon im Schritt hektisch, kommen Lösen und Bodenarbeit vor dem Gruppenausritt.", ["ex-gy-2", "ex-ge-4"]),
    c("c-abstand", "Zu wenig Abstand", "Dicht aufeinander steigt die Aufregung – und die Gefahr, geschlagen zu werden.", ["ex-ge-4", "ex-ueb-1"]),
    koerper("Wird ein sonst ruhiges Pferd plötzlich hektisch, können auch Schmerzen dahinterstecken."),
  ],
  fallback: ["ex-ge-4", "ex-gy-2", "ex-ueb-1"],
  gentle: ["ex-ge-4", "ex-bo-5", "ex-gy-2"],
  mistakes: ["Nebeneinander losgaloppieren", "Dicht auffahren", "Unangekündigte Tempowechsel"],
  safety: [...SAFE, "Kannst du dein Pferd nicht mehr sicher regulieren: Gruppe anhalten lassen und im Schritt weiter."],
  checkWhen: ["Dein Pferd ist in der Gruppe nicht mehr kontrollierbar."],
  lessons: ["ra-w19-l3", "ra-w17-l5", "ra-w19-l9"],
  riderLab: [],
  plan: {
    goal: "Gelassen in der Gruppe",
    weeks: [
      { title: "Ruhe zuhause", focus: "Lösen und Halten", exercises: ["ex-gy-2", "ex-ueb-1"] },
      { title: "Gruppe im Schritt", focus: "Abstand und Reihenfolge", exercises: ["ex-ge-4", "ex-ueb-1"] },
      { title: "Tempo draußen", focus: "Übergänge an festen Punkten", exercises: ["ex-ge-5", "ex-ge-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ge-4", "ex-ge-5"] },
    ],
  },
};

export const cp48: CoachProblemContent = {
  id: "cp-48",
  review: "geprueft",
  intro: "Am liebsten bei den anderen bleiben – das ist für Pferde ganz natürlich. Mit Geduld lernen sie, sich auch kurz zu trennen.",
  understand: [
    "Kleben an anderen Pferden ist Herdenverhalten. Hat ein Pferd gelernt, dass Drängen zum Ziel führt, wird es stärker.",
    "Kurze, erfolgreiche Trennungen mit Rückkehr bauen Sicherheit auf. Der Mensch wird dabei zur Bezugsperson.",
    "Zeigt das Pferd starken Stress (Wiehern, Schwitzen, Zittern), wird der Abstand verringert und langsamer gesteigert.",
  ],
  questions: [
    q("q-wo", "Wo passiert das?", [
      o("platz", "In der Halle oder auf dem Platz", { "c-herde": 2, "c-gewohnheit": 1 }, "in der Halle oder auf dem Platz"),
      o("gelaende", "Im Gelände", { "c-herde": 3 }, "im Gelände"),
      o("stall", "Vom Stall weg", { "c-stall": 2, "c-herde": 1 }, "vom Stall weg"),
    ]),
    q("q-wie", "Wie zeigt sich das?", [
      o("zieht", "Es zieht zu den anderen", { "c-gewohnheit": 2 }, "es zieht zu den anderen"),
      o("ruft", "Es wiehert und wird unruhig", { "c-stress": 3 }, "es wiehert und wird unruhig"),
      o("blockiert", "Es bleibt stehen", { "c-reaktion": 2, "c-gewohnheit": 1 }, "es bleibt stehen"),
    ]),
    q("q-training", "Übt ihr das Trennen?", [
      o("nie", "Nie", { "c-gewohnheit": 2 }, "ihr übt das Trennen nie"),
      o("manchmal", "Manchmal"),
      o("ja", "Regelmäßig"),
    ]),
    seit(),
    veraendert({ haltung: { "c-stress": 1 } }),
    stand(),
  ],
  causes: [
    c("c-herde", "Herdentrieb", "Bei anderen Pferden fühlt sich ein Pferd sicher. Trennung muss es in kleinen Schritten lernen.", ["ex-bo-5", "ex-ge-3"]),
    c("c-gewohnheit", "Gelernter Erfolg", "Hat Drängen schon oft zu den anderen geführt, wird es zur Gewohnheit. Ruhig und konsequent bleiben.", ["ex-bo-5", "ex-ueb-1"]),
    c("c-stall", "Stallnähe", "Der Stall bedeutet Sicherheit und Futter. In Stallnähe sind Übungen besonders schwierig.", ["ex-ueb-1", "ex-bo-5"]),
    c("c-stress", "Trennungsstress", "Starker Stress braucht viel Geduld: Abstand verkleinern, langsam steigern, Rückkehr belohnen.", ["ex-bo-5", "ex-bo-4"]),
    c("c-reaktion", "Treibende Hilfen", "Bleibt das Pferd stehen, braucht es eine klare, kurze Hilfe – und Lob, sobald es geht.", ["ex-hilfe-3", "ex-ueb-1"]),
    koerper("Plötzlich stark klebendes Verhalten kann auch mit Schmerzen oder Unwohlsein zusammenhängen."),
  ],
  fallback: ["ex-bo-5", "ex-ueb-1", "ex-bo-4"],
  gentle: ["ex-bo-5", "ex-bo-4", "ex-ueb-1"],
  mistakes: ["Das Pferd zu weit wegzwingen", "Nachgeben, wenn es drängt", "Nie üben, nur im Notfall trennen"],
  safety: SAFE,
  checkWhen: ["Dein Pferd zeigt starken Stress: Schwitzen, Zittern, Steigen."],
  lessons: ["ra-w17-l5", "ra-w9-l2", "ra-w17-l7"],
  riderLab: [],
  plan: {
    goal: "Sich entspannt trennen",
    weeks: [
      { title: "Vom Boden", focus: "Kurz trennen und zurückkommen", exercises: ["ex-bo-5", "ex-bo-4"] },
      { title: "Auf dem Platz", focus: "Halten an festen Punkten", exercises: ["ex-ueb-1", "ex-bo-5"] },
      { title: "Draußen", focus: "Kurze Strecken allein", exercises: ["ex-ge-3", "ex-bo-5"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-bo-5", "ex-ueb-1"] },
    ],
  },
};

export const cp49: CoachProblemContent = {
  id: "cp-49",
  review: "geprueft",
  intro: "Bleibt ein Pferd vor Gegenständen stehen, ist es meist unsicher. Druck verstärkt die Unsicherheit – Zeit löst sie.",
  understand: [
    "Pferde müssen Neues erst einordnen. Stehenbleiben und Schauen ist ein normales Verhalten – Umdrehen oder Steigen sind Zeichen großer Angst.",
    "Lass dein Pferd schauen, halte Abstand und belohne jede Entspannung. Vom Boden aus ist das am sichersten.",
    "Hat das Umdrehen schon oft „funktioniert“, ist es auch Gewohnheit geworden – dann braucht es eine klare, ruhige Hilfe.",
  ],
  questions: [
    q("q-was", "Wovor bleibt dein Pferd stehen?", [
      o("neu", "Vor neuen Dingen", { "c-gewoehnung": 3 }, "vor neuen Dingen"),
      o("gleich", "Immer vor denselben Dingen", { "c-erlebnis": 2, "c-gewoehnung": 1 }, "immer vor denselben Dingen"),
      o("wasser", "Vor Wasser, Brücken oder anderem Untergrund", { "c-untergrund": 3 }, "vor Wasser oder anderem Untergrund"),
    ]),
    q("q-wie", "Wie reagiert es?", [
      o("schauen", "Es schaut und geht dann weiter", { "c-gewoehnung": 1 }, "es schaut und geht dann weiter"),
      o("dreht", "Es dreht um", { "c-reaktion": 2, "c-erlebnis": 1 }, "es dreht um"),
      o("steigt", "Es steigt", { "c-koerper": 2 }, "es steigt", "abklaeren"),
      o("zittert", "Es zittert oder schwitzt", { "c-erlebnis": 2, "c-gewoehnung": 1 }, "es zittert oder schwitzt"),
    ]),
    reiter("Wie reagierst du?", [
      o("treiben", "Ich treibe stark", { "c-druck": 3 }, "du treibst stark"),
      o("warten", "Ich lasse es schauen"),
      o("unsicher", "Ich bin selbst unsicher", { "c-reiter": 3 }, "du bist selbst unsicher"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-gewoehnung", "Fehlende Gewöhnung", "Neues ist für Pferde verdächtig. Schauen lassen und in kleinen Schritten annähern.", ["ex-bo-4", "ex-ge-1"]),
    c("c-erlebnis", "Schlechte Erfahrung", "Bleibt das Pferd immer an denselben Stellen stehen, kann es dort etwas erschreckt haben.", ["ex-bo-4", "ex-bo-1"]),
    c("c-untergrund", "Untergrund oder Wasser", "Pferde können Tiefe und Untergrund schlecht einschätzen. Vom Boden aus mit Zeit üben.", ["ex-bo-4", "ex-ge-1"]),
    c("c-reaktion", "Umdrehen als Erfolg", "Hat Umdrehen schon zum Ziel geführt, wird es wiederholt. Ruhig, klar, ohne Druck – und mit Lob für jeden Schritt.", ["ex-hilfe-3", "ex-bo-1"]),
    c("c-druck", "Zu viel Druck", "Starkes Treiben vor einem gefürchteten Gegenstand macht die Angst größer.", ["ex-bo-4", "ex-hilfe-4"]),
    c("c-reiter", "Unsicherheit beim Reiter", "Ein unsicherer Reiter bestätigt dem Pferd die Gefahr. Vom Boden aus seid ihr beide sicherer.", ["ex-bo-4", "ex-sitz-1"]),
    koerper("Bleibt ein Pferd plötzlich überall stehen, kann auch schlechtes Sehen oder Schmerz eine Rolle spielen."),
  ],
  fallback: ["ex-bo-4", "ex-bo-1", "ex-ge-1"],
  gentle: ["ex-bo-4", "ex-bo-1", "ex-sitz-1"],
  mistakes: ["Das Pferd vor den Gegenstand prügeln oder ziehen", "Zu nah zu schnell", "Selbst angespannt sein"],
  safety: SAFE,
  checkWhen: ["Dein Pferd steigt oder gerät in Panik.", "Das Verhalten ist plötzlich überall aufgetreten."],
  lessons: ["ra-w19-l6", "ra-w19-l7", "ra-w17-l7"],
  riderLab: [],
  plan: {
    goal: "Mutig an Neuem vorbei",
    weeks: [
      { title: "Vom Boden", focus: "Neues anschauen", exercises: ["ex-bo-4", "ex-bo-1"] },
      { title: "Vertrauen", focus: "Führen und Anhalten", exercises: ["ex-bo-1", "ex-bo-4"] },
      { title: "Draußen", focus: "Ruhiger Schritt mit Begleitung", exercises: ["ex-ge-1", "ex-bo-4"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-bo-4", "ex-ge-1"] },
    ],
  },
};

export const cp50: CoachProblemContent = {
  id: "cp-50",
  review: "geprueft",
  intro: "Draußen sind Pferde oft eiliger als in der Bahn. Gezielte Übergänge und Schritt helfen, ansprechbar zu bleiben.",
  understand: [
    "Im Gelände wirken Herdentrieb, Heimdrang und Gewohnheit stärker. Pferde merken sich schnell, wo immer getrabt oder galoppiert wurde.",
    "Viele Übergänge an wechselnden Stellen, Schritt auf dem Heimweg und kurze Halte halten das Pferd aufmerksam.",
    "Lässt sich ein Pferd draußen nicht mehr durchparieren, ist das gefährlich: absteigen und führen ist dann die sicherste Wahl.",
  ],
  questions: [
    q("q-wann", "Wann wird dein Pferd draußen zu schnell?", [
      o("heim", "Auf dem Heimweg", { "c-heim": 3 }, "auf dem Heimweg"),
      o("wege", "Auf bestimmten Wegen oder Wiesen", { "c-gewohnheit": 3 }, "auf bestimmten Wegen oder Wiesen"),
      o("gruppe", "In der Gruppe", { "c-gruppe": 3 }, "in der Gruppe"),
      o("immer", "Fast immer", { "c-energie": 2, "c-durchlaessig": 1 }, "fast immer"),
    ]),
    q("q-reaktion", "Wie reagiert es auf Paraden?", [
      o("gut", "Gut"),
      o("kaum", "Kaum", { "c-durchlaessig": 3 }, "es reagiert kaum auf Paraden"),
      o("kopf", "Es wirft den Kopf", { "c-hand": 2, "c-durchlaessig": 1 }, "es wirft den Kopf"),
    ]),
    q("q-bewegung", "Wie viel Bewegung hat dein Pferd sonst?", [
      o("wenig", "Wenig, oft in der Box", { "c-energie": 3 }, "es hat sonst wenig Bewegung"),
      o("viel", "Viel Weide und Bewegung"),
      o("weiss", "Weiß ich nicht"),
    ]),
    seit(),
    veraendert({ haltung: { "c-energie": 2 } }),
    stand(),
  ],
  causes: [
    c("c-heim", "Heimdrang", "Zuhause warten Herde und Futter. Auf dem Heimweg viel Schritt und gelegentlich Halten oder Umkehren.", ["ex-ge-5", "ex-ueb-1"]),
    c("c-gewohnheit", "Gelernte Galoppstrecken", "Wird immer an derselben Stelle galoppiert, nimmt das Pferd es vorweg. Stellen und Tempo variieren.", ["ex-ge-5", "ex-ge-1"]),
    c("c-gruppe", "Gruppendynamik", "In der Gruppe wird schnell gerannt. Abstand und Absprachen helfen.", ["ex-ge-4", "ex-ge-5"]),
    c("c-energie", "Viel überschüssige Energie", "Wenig Bewegung macht draußen eilig. Mehr freie Bewegung und ruhiges Lösen vorher helfen.", ["ex-bo-3", "ex-gy-2"]),
    c("c-durchlaessig", "Paraden kommen nicht durch", "Was in der Bahn nicht sicher klappt, klappt draußen erst recht nicht. Halbe Paraden zuhause festigen.", ["ex-hilfe-6", "ex-ge-5", "ex-hilfe-1"]),
    c("c-hand", "Zug am Zügel", "Ziehen erzeugt Gegenzug – draußen besonders. Paraden im Wechsel mit Nachgeben.", ["ex-hilfe-2", "ex-hilfe-5"]),
    koerper("Wird ein Pferd plötzlich draußen kaum noch kontrollierbar, können auch Schmerzen oder ein drückender Sattel dahinterstecken."),
  ],
  fallback: ["ex-hilfe-1", "ex-ueb-1", "ex-ge-1"],
  gentle: ["ex-hilfe-1", "ex-ueb-1", "ex-gy-2"],
  mistakes: ["Draußen nur traben und galoppieren", "Immer an denselben Stellen galoppieren", "Heimwärts die Kontrolle abgeben"],
  safety: [...SAFE, "Galoppiere draußen nur, wenn du dein Pferd sicher durchparieren kannst."],
  checkWhen: ["Dein Pferd lässt sich draußen nicht mehr durchparieren oder geht durch."],
  lessons: ["ra-w19-l8", "ra-w19-l9", "ra-w19-l12"],
  riderLab: [],
  plan: {
    goal: "Draußen gut regulierbar",
    weeks: [
      { title: "Durchlässigkeit zuhause", focus: "Halbe Paraden", exercises: ["ex-hilfe-6", "ex-hilfe-1"] },
      { title: "Schritt draußen", focus: "Ruhiger Schritt", exercises: ["ex-ge-1", "ex-ueb-1"] },
      { title: "Übergänge draußen", focus: "An festen Punkten", exercises: ["ex-ge-5", "ex-ge-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-ge-5", "ex-hilfe-6"] },
    ],
  },
};
