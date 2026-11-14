import type { CoachProblemContent } from "../types";
import { c, koerper, o, q, SAFE_RIDE, seit, stand, veraendert } from "./common";

/** Kategorie A – Reitersitz & Balance (cp-01 … cp-10). Fachlicher Entwurf, vor Veröffentlichung prüfen lassen. */

const reiter = (opts: ReturnType<typeof o>[]) => q("q-reiter", "Was fällt dir an dir selbst auf?", [...opts, o("weiss-nicht", "Das kann ich nicht einschätzen")], { help: "Wenn du unsicher bist: Lass dich einmal filmen oder frag deine Reitlehrkraft." });
const buegel = (lang: number, kurz: number) =>
  q("q-buegel", "Wie lang sind deine Bügel?", [
    o("lang", "Eher lang – ich angle nach ihnen", { "c-buegel": lang }, "deine Bügel sind eher lang"),
    o("kurz", "Eher kurz", { "c-buegel": kurz }, "deine Bügel sind eher kurz"),
    o("passend", "Von der Reitlehrkraft eingestellt"),
    o("weiss", "Weiß ich nicht", { "c-buegel": 1 }),
  ]);
const BUEGEL = c("c-buegel", "Die Bügellänge passt nicht", "Zu lange Bügel lassen dich nach ihnen angeln, zu kurze schieben das Knie hoch. Beides nimmt dir den Halt im Unterschenkel.", ["ex-sitz-6", "ex-sitz-3"]);
const SATTEL = koerper("Ein Sattel, der nicht passt oder dessen tiefster Punkt nicht in der Mitte liegt, kann dich in eine ungünstige Position bringen. Auch Rückenbeschwerden des Pferdes machen ruhiges Sitzen schwer.");

export const cp01: CoachProblemContent = {
  id: "cp-01",
  review: "entwurf",
  intro: "Nach vorne zu kippen ist sehr häufig – meist steckt eine Kette dahinter: Bein, Blick und Balance hängen zusammen.",
  understand: [
    "Ein ausbalancierter Sitz entsteht, wenn Ohr, Schulter, Hüfte und Absatz ungefähr auf einer Linie liegen. Rutscht eine Stelle aus dieser Linie, gleicht der Körper an einer anderen aus.",
    "Liegt der Unterschenkel zu weit hinten oder schaust du nach unten, kippt der Oberkörper fast automatisch nach vorn. Viele Pferde reagieren darauf, indem sie schneller werden – und das verstärkt das Vorkippen.",
    "Deshalb setzt die Korrektur meist unten an: am Bein, am Blick und an der Balance – nicht am bewussten Zurücklehnen.",
  ],
  questions: [
    q("q-wann", "Wann kippst du vor allem nach vorne?", [
      o("trab", "Vor allem im Leichttraben", { "c-rhythmus": 2, "c-bein": 1 }, "vor allem im Leichttraben"),
      o("galopp", "Im Galopp oder beim Angaloppieren", { "c-balance": 2, "c-angst": 1 }, "vor allem im Galopp"),
      o("tempo", "Wenn das Pferd schneller wird oder erschrickt", { "c-angst": 3 }, "wenn das Pferd schneller wird oder erschrickt"),
      o("immer", "Eigentlich die ganze Zeit", { "c-haltung": 2 }, "eigentlich die ganze Zeit"),
    ]),
    q("q-bein", "Wo ist dein Unterschenkel, wenn du nach vorne kippst?", [
      o("hinten", "Er rutscht nach hinten", { "c-bein": 3 }, "dein Unterschenkel rutscht nach hinten"),
      o("vorn", "Er ist eher vorne Richtung Schulter", { "c-haltung": 1, "c-koerper": 1 }, "dein Unterschenkel ist eher vorne"),
      o("weiss", "Weiß ich nicht"),
    ]),
    reiter([
      o("blick", "Ich schaue oft nach unten", { "c-haltung": 3 }, "du schaust oft nach unten"),
      o("hand", "Ich halte mich am Zügel oder Hals fest", { "c-angst": 2, "c-balance": 1 }, "du hältst dich am Zügel oder Hals fest"),
      o("kraft", "Mir fehlt Kraft im Rumpf", { "c-rumpf": 3 }, "dir fehlt Kraft im Rumpf"),
    ]),
    seit({ laenger: { "c-haltung": 1 } }),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-bein", "Der Unterschenkel liegt zu weit hinten", "Rutscht der Unterschenkel nach hinten, fehlt die Stütze unter dem Körper – der Oberkörper fällt nach vorn.", ["ex-sitz-6", "ex-sitz-3", "ex-sitz-7"]),
    c("c-haltung", "Blick und Körperhaltung", "Wer nach unten schaut, rundet den Rücken und zieht den Oberkörper mit. Ein Blick nach vorn richtet den ganzen Sitz auf.", ["ex-sitz-6", "ex-sitz-1"]),
    c("c-angst", "Unsicherheit und Schutzhaltung", "Bei Schreck oder Tempo macht sich der Körper klein und klammert – eine natürliche Schutzhaltung, die das Vorkippen verstärkt.", ["ex-sitz-4", "ex-sitz-1", "ex-ueb-1"]),
    c("c-balance", "Balance in schnelleren Gangarten", "Im Galopp und bei Tempo braucht der Sitz mehr Balance. Fehlt sie, rettet sich der Oberkörper nach vorn.", ["ex-sitz-4", "ex-sitz-7", "ex-sitz-2"]),
    c("c-rumpf", "Rumpfstabilität", "Ohne stabile Körpermitte fällt es schwer, den Oberkörper ruhig aufrecht zu tragen. Das lässt sich gut auch ohne Pferd trainieren.", ["ex-sitz-4", "ex-sitz-6"]),
    c("c-rhythmus", "Aufstehen vor der Bewegung", "Beim Leichttraben kommen viele zu weit nach vorn, weil sie über das Knie aufstehen. Der Oberkörper bleibt dann vorne „hängen“.", ["ex-trab-1", "ex-sitz-7"]),
    SATTEL,
  ],
  fallback: ["ex-sitz-6", "ex-sitz-3", "ex-sitz-1"],
  gentle: ["ex-sitz-6", "ex-sitz-1", "ex-sitz-3"],
  mistakes: ["Sich bewusst nach hinten lehnen – das erzeugt ein Hohlkreuz", "Mit den Händen am Zügel festhalten", "Zu viel auf einmal korrigieren wollen"],
  safety: SAFE_RIDE,
  checkWhen: ["Du kippst seit dem Wechsel des Sattels deutlich mehr.", "Rückenschmerzen machen dir das aufrechte Sitzen schwer."],
  lessons: ["ra-w2-l1", "ra-w2-l4", "ra-w18-l3", "ra-w12-l3"],
  riderLab: ["rl-18", "rl-12", "rl-16"],
  plan: {
    goal: "Aufrecht und ausbalanciert sitzen",
    weeks: [
      { title: "Sitz spüren", focus: "Lot-Check und langes Bein", exercises: ["ex-sitz-6", "ex-sitz-3"] },
      { title: "Balance ohne Zügel", focus: "Longe und Balance-Check", exercises: ["ex-sitz-4", "ex-sitz-1"] },
      { title: "Balance im Trab", focus: "Leichttraben im Rhythmus", exercises: ["ex-sitz-7", "ex-trab-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-6", "ex-sitz-7"] },
    ],
  },
};

export const cp02: CoachProblemContent = {
  id: "cp-02",
  review: "entwurf",
  intro: "Ein Bein, das nach hinten rutscht, hat fast immer mit Hüfte, Knie oder Bügel zu tun – selten mit „zu wenig Kraft“.",
  understand: [
    "Der Unterschenkel liegt idealerweise am Gurt, der Absatz etwa unter der Hüfte. Von dort kann er treiben und dich gleichzeitig stützen.",
    "Rutscht er nach hinten, liegt das oft an einem festen Hüftgelenk, klemmenden Knien oder an Bügeln, die nicht passen. Auch Treiben mit hochgezogener Ferse zieht das Bein zurück.",
    "Ein langes, lockeres Bein entsteht durch Loslassen in der Hüfte – nicht durch Drücken der Ferse nach unten.",
  ],
  questions: [
    q("q-wann", "Wann rutscht dein Bein nach hinten?", [
      o("trab", "Vor allem im Leichttraben", { "c-leichttrab": 3 }, "vor allem im Leichttraben"),
      o("galopp", "Im Galopp", { "c-balance": 2 }, "vor allem im Galopp"),
      o("treiben", "Wenn ich treibe", { "c-treiben": 3 }, "vor allem, wenn du treibst"),
      o("immer", "Fast immer", { "c-buegel": 1, "c-huefte": 1 }, "fast immer"),
    ]),
    q("q-knie", "Was machen deine Knie?", [
      o("klemmen", "Sie klemmen am Sattel", { "c-knie": 3, "c-huefte": 1 }, "deine Knie klemmen"),
      o("locker", "Sie liegen locker an"),
      o("weiss", "Weiß ich nicht"),
    ]),
    buegel(3, 2),
    seit({ laenger: { "c-huefte": 1 } }),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-leichttrab", "Aufstehen über das Knie", "Wer beim Leichttraben über das Knie aufsteht, kippt den Unterschenkel nach hinten. Besser: das Gewicht in den Unterschenkel und die Hüfte nach vorn öffnen.", ["ex-sitz-7", "ex-trab-1", "ex-sitz-6"]),
    c("c-treiben", "Treiben mit hochgezogener Ferse", "Wird beim Treiben die Ferse hochgezogen, wandert das Bein nach hinten. Ein kurzer Impuls aus der Wade genügt.", ["ex-hilfe-3", "ex-sitz-6"]),
    c("c-knie", "Klemmende Knie", "Klemmt das Knie, wird es zum Drehpunkt – der Unterschenkel schwingt nach hinten weg.", ["ex-sitz-3", "ex-sitz-6"]),
    BUEGEL,
    c("c-huefte", "Feste Hüfte und kurzer Oberschenkel", "Ist das Hüftgelenk fest, kann das Bein nicht lang werden. Mobilisationsübungen ohne Pferd helfen hier sehr.", ["ex-sitz-3", "ex-sitz-4"]),
    c("c-balance", "Balance in schnelleren Gangarten", "Im Galopp sucht der Körper Halt – oft über ein Bein, das nach hinten klemmt.", ["ex-sitz-4", "ex-sitz-7"]),
    SATTEL,
  ],
  fallback: ["ex-sitz-6", "ex-sitz-3", "ex-sitz-1"],
  gentle: ["ex-sitz-6", "ex-sitz-3", "ex-sitz-1"],
  mistakes: ["Die Ferse mit Gewalt nach unten drücken", "Mit Zehenspitzen im Bügel stehen", "Bügel verstellen, ohne den Sitz zu prüfen"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Bein rutscht erst seit einem neuen Sattel nach hinten.", "Du hast Schmerzen in Hüfte oder Knie."],
  lessons: ["ra-w2-l2", "ra-w18-l3", "ra-w5-l2"],
  riderLab: ["rl-04", "rl-01", "rl-03"],
  plan: {
    goal: "Ein ruhiges, langes Bein",
    weeks: [
      { title: "Bein lang lassen", focus: "Ohne Bügel und Lot-Check", exercises: ["ex-sitz-3", "ex-sitz-6"] },
      { title: "Bein im Trab", focus: "Leichttraben über den Unterschenkel", exercises: ["ex-sitz-7", "ex-trab-1"] },
      { title: "Treiben ohne Ferse", focus: "Kurze Impulse aus der Wade", exercises: ["ex-hilfe-3", "ex-sitz-6"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-6", "ex-sitz-7"] },
    ],
  },
};

export const cp03: CoachProblemContent = {
  id: "cp-03",
  review: "entwurf",
  intro: "Unruhige Unterschenkel stören das Pferd und machen feine Hilfen schwer. Meist steckt Balance oder Dauertreiben dahinter.",
  understand: [
    "Ein ruhiger Unterschenkel liegt weich am Pferd und bewegt sich nur, wenn er etwas sagen will. Jede andere Bewegung ist für das Pferd „Rauschen“.",
    "Häufige Gründe sind ein Becken, das die Bewegung nicht mitgeht, zu lange Bügel oder die Gewohnheit, ständig zu treiben.",
    "Ruhe im Bein entsteht von oben: aus einem losgelassenen Sitz und einer stabilen Mitte.",
  ],
  questions: [
    q("q-wann", "Wann werden deine Unterschenkel unruhig?", [
      o("trab", "Im Leichttraben", { "c-leichttrab": 3 }, "vor allem im Leichttraben"),
      o("aussitzen", "Beim Aussitzen", { "c-mitgehen": 3 }, "vor allem beim Aussitzen"),
      o("treiben", "Weil ich ständig treibe", { "c-dauertreiben": 3 }, "weil du ständig treibst"),
      o("galopp", "Im Galopp", { "c-balance": 2, "c-mitgehen": 1 }, "vor allem im Galopp"),
    ]),
    q("q-pferd", "Wie reagiert dein Pferd auf dein Bein?", [
      o("faul", "Es braucht viel Schenkel", { "c-dauertreiben": 2 }, "dein Pferd braucht viel Schenkel"),
      o("empfindlich", "Es wird schnell oder unruhig", { "c-empfindlich": 3 }, "dein Pferd reagiert empfindlich"),
      o("normal", "Ganz normal"),
    ]),
    buegel(3, 2),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-leichttrab", "Leichttraben mit Schwung aus dem Bein", "Wer sich beim Aufstehen mit dem Bein abdrückt, bringt es bei jedem Tritt in Bewegung.", ["ex-sitz-7", "ex-trab-1"]),
    c("c-mitgehen", "Das Becken geht nicht mit", "Kann das Becken der Bewegung nicht folgen, wird die Bewegung an die Beine weitergegeben – sie schlackern.", ["ex-sitz-5", "ex-sitz-4", "ex-sitz-3"]),
    c("c-dauertreiben", "Dauertreiben", "Ständiges Treiben stumpft das Pferd ab – und macht das Bein unruhig. Besser: kurz, klar, dann Ruhe.", ["ex-hilfe-3", "ex-trab-3"]),
    c("c-balance", "Balance in schnelleren Gangarten", "Im Galopp suchen unruhige Beine oft Halt am Pferd.", ["ex-sitz-4", "ex-sitz-7"]),
    c("c-empfindlich", "Ein empfindliches Pferd reagiert auf jede Bewegung", "Feine Pferde reagieren auf jedes Klopfen. Ein ruhig anliegendes Bein gibt ihnen Sicherheit.", ["ex-hilfe-4", "ex-sitz-3"]),
    BUEGEL,
    SATTEL,
  ],
  fallback: ["ex-sitz-3", "ex-sitz-6", "ex-sitz-1"],
  gentle: ["ex-sitz-3", "ex-sitz-6", "ex-sitz-1"],
  mistakes: ["Das Bein ganz vom Pferd wegnehmen", "Mit Kraft festhalten, um es ruhig zu bekommen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd schlägt nach dem Schenkel oder reagiert mit Abwehr."],
  lessons: ["ra-w2-l2", "ra-w3-l2", "ra-w18-l5"],
  riderLab: ["rl-04", "rl-12", "rl-19"],
  plan: {
    goal: "Ruhige, feine Unterschenkel",
    weeks: [
      { title: "Ruhe im Bein", focus: "Ohne Bügel, Lot-Check", exercises: ["ex-sitz-3", "ex-sitz-6"] },
      { title: "Mitgehen im Sitz", focus: "Becken und Aussitzen", exercises: ["ex-sitz-5", "ex-sitz-4"] },
      { title: "Fein treiben", focus: "Kurz und klar", exercises: ["ex-hilfe-3", "ex-sitz-7"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-3", "ex-sitz-7"] },
    ],
  },
};

export const cp04: CoachProblemContent = {
  id: "cp-04",
  review: "entwurf",
  intro: "Im Trab die Balance zu verlieren ist anstrengend und verunsichert. Oft liegt es am Rhythmus, am Bein oder an einem eiligen Trab.",
  understand: [
    "Der Trab ist ein Zweitakt mit einer Schwebephase – er bewegt dich mehr als der Schritt. Balance entsteht, wenn du dich im Rhythmus des Pferdes bewegst, statt dagegen.",
    "Beim Leichttraben trägt dich der Unterschenkel, beim Aussitzen schwingt das Becken mit. In Wendungen verlagert sich dein Gewicht leicht nach innen.",
    "Ein ruhiger, gleichmäßiger Trab macht vieles leichter – deshalb ist das Tempo oft der erste Ansatzpunkt.",
  ],
  questions: [
    q("q-wann", "Wann verlierst du die Balance?", [
      o("leicht", "Beim Leichttraben", { "c-leichttrab": 3 }, "vor allem beim Leichttraben"),
      o("aussitzen", "Beim Aussitzen", { "c-aussitzen": 3 }, "vor allem beim Aussitzen"),
      o("wendung", "In Wendungen und Ecken", { "c-wendung": 3 }, "vor allem in Wendungen"),
      o("tempo", "Wenn das Pferd das Tempo wechselt", { "c-tempo": 3 }, "wenn das Pferd das Tempo wechselt"),
    ]),
    q("q-richtung", "In welche Richtung verlierst du die Balance?", [
      o("vor", "Nach vorne", { "c-bein": 2 }, "du kippst nach vorne"),
      o("hinten", "Nach hinten", { "c-bein": 1, "c-leichttrab": 1 }, "du fällst nach hinten"),
      o("seite", "Zur Seite", { "c-rumpf": 2, "c-wendung": 1 }, "du rutschst zur Seite"),
      o("weiss", "Weiß ich nicht"),
    ]),
    q("q-pferd", "Wie läuft dein Pferd im Trab?", [
      o("eilig", "Eilig oder ungleichmäßig", { "c-tempo": 2 }, "dein Pferd trabt eilig"),
      o("schwung", "Sehr schwungvoll", { "c-aussitzen": 1, "c-rumpf": 1 }, "dein Pferd trabt sehr schwungvoll"),
      o("ruhig", "Ruhig und gleichmäßig"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-leichttrab", "Leichttraben nicht im Rhythmus", "Stehst du zu schnell oder zu hoch auf, kommst du aus dem Gleichgewicht. Der Rhythmus des Pferdes gibt das Tempo vor.", ["ex-sitz-7", "ex-trab-1", "ex-sitz-6"]),
    c("c-aussitzen", "Das Becken schwingt nicht mit", "Beim Aussitzen muss das Becken die Bewegung weich aufnehmen. Wer fest wird, wird geworfen.", ["ex-sitz-5", "ex-sitz-4"]),
    c("c-wendung", "Gewicht in Wendungen", "In Wendungen wirkt die Fliehkraft. Ein leicht nach innen gerichtetes Gewicht und der Blick in die Wendung geben Halt.", ["ex-dr-5", "ex-sitz-1"]),
    c("c-tempo", "Wechselndes Tempo", "Ein Pferd, das eilt oder bummelt, bringt dich ständig aus dem Takt. Ein ruhiges, gleichmäßiges Tempo ist die Basis.", ["ex-trab-1", "ex-hilfe-6", "ex-hilfe-1"]),
    c("c-bein", "Der Unterschenkel trägt nicht", "Liegt der Unterschenkel nicht unter dir, fehlt die Stütze – du kippst nach vorn oder fällst zurück.", ["ex-sitz-6", "ex-sitz-3"]),
    c("c-rumpf", "Rumpfstabilität", "Eine stabile Mitte hält dich im Sattel, auch wenn das Pferd schwungvoll trabt.", ["ex-sitz-4", "ex-sitz-6"]),
    SATTEL,
  ],
  fallback: ["ex-trab-1", "ex-sitz-6", "ex-sitz-1"],
  gentle: ["ex-sitz-6", "ex-sitz-1", "ex-trab-1"],
  mistakes: ["Sich am Zügel festhalten", "Zu lange am Stück aussitzen", "Im eiligen Trab weiterreiten, statt das Tempo zu beruhigen"],
  safety: SAFE_RIDE,
  checkWhen: ["Das Pferd geht im Trab taktunrein."],
  lessons: ["ra-w5-l2", "ra-w5-l3", "ra-w18-l3", "ra-w12-l4"],
  riderLab: ["rl-12", "rl-19", "rl-05"],
  plan: {
    goal: "Sicher und ausbalanciert traben",
    weeks: [
      { title: "Ruhiger Trab", focus: "Tempo und Rhythmus", exercises: ["ex-trab-1", "ex-sitz-6"] },
      { title: "Balance über den Unterschenkel", focus: "Wechsel Leichttraben – leichter Sitz", exercises: ["ex-sitz-7", "ex-sitz-4"] },
      { title: "Wendungen", focus: "Volten im ruhigen Trab", exercises: ["ex-dr-5", "ex-trab-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-trab-1", "ex-sitz-7"] },
    ],
  },
};

export const cp05: CoachProblemContent = {
  id: "cp-05",
  review: "entwurf",
  intro: "Aussitzen ist eine der schwierigsten Sitzaufgaben. Meist hilft weniger Kraft – nicht mehr.",
  understand: [
    "Beim Aussitzen bewegt sich der Pferderücken bei jedem Tritt auf und ab. Das Becken nimmt diese Bewegung auf, der Oberkörper bleibt ruhig darüber.",
    "Wer Bauch, Hüfte oder Beine festmacht, wird geworfen. Wer sich zurücklehnt, verliert den Kontakt zur Bewegung.",
    "Ein ruhiger, nicht zu schwungvoller Trab und kurze Etappen sind der beste Einstieg.",
  ],
  questions: [
    q("q-wie", "Was passiert beim Aussitzen?", [
      o("hupf", "Ich hüpfe im Sattel", { "c-fest": 2, "c-tempo": 1 }, "du hüpfst im Sattel"),
      o("hinten", "Ich lehne mich nach hinten", { "c-hinten": 3 }, "du lehnst dich nach hinten"),
      o("klemm", "Ich klemme mit den Beinen", { "c-fest": 3 }, "du klemmst mit den Beinen"),
      o("seite", "Ich rutsche zur Seite", { "c-rumpf": 3 }, "du rutschst zur Seite"),
    ]),
    q("q-trab", "Wie ist der Trab, den du aussitzt?", [
      o("schnell", "Eher schnell", { "c-tempo": 3 }, "der Trab ist eher schnell"),
      o("schwung", "Sehr schwungvoll", { "c-tempo": 1, "c-rumpf": 1 }, "der Trab ist sehr schwungvoll"),
      o("ruhig", "Ruhig"),
    ]),
    q("q-dauer", "Wie lange sitzt du am Stück aus?", [
      o("lang", "Gleich mehrere Runden", { "c-dauer": 3 }, "du sitzt mehrere Runden am Stück aus"),
      o("kurz", "Nur kurze Strecken"),
      o("weiss", "Weiß ich nicht"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-fest", "Fester Bauch und feste Hüfte", "Fester Bauch und klemmende Beine machen das Becken unbeweglich – die Bewegung des Pferdes wirft dich dann hoch.", ["ex-sitz-5", "ex-sitz-3", "ex-sitz-4"]),
    c("c-hinten", "Rückenlage als Schutz", "Viele lehnen sich zurück, um nicht geworfen zu werden. Das Becken kippt dann und kann nicht mehr mitschwingen.", ["ex-sitz-6", "ex-sitz-4"]),
    c("c-tempo", "Zu schneller Trab", "Ein eiliger oder sehr schwungvoller Trab ist schwer auszusitzen. Erst beruhigen, dann aussitzen.", ["ex-trab-1", "ex-hilfe-6"]),
    c("c-rumpf", "Rumpfstabilität", "Eine stabile, aber bewegliche Mitte hält dich mittig im Sattel.", ["ex-sitz-4", "ex-sitz-6"]),
    c("c-dauer", "Zu lange Strecken auf einmal", "Wer zu lange aussitzt, wird müde und fest. Kurze Etappen mit Pausen bringen mehr.", ["ex-sitz-5", "ex-sitz-7"]),
    koerper("Drückt das Pferd beim Aussitzen den Rücken weg oder wird es unwillig, können ein unpassender Sattel oder ein empfindlicher Rücken dahinterstecken."),
  ],
  fallback: ["ex-sitz-3", "ex-sitz-4", "ex-trab-1"],
  gentle: ["ex-sitz-3", "ex-sitz-6", "ex-trab-1"],
  mistakes: ["Den Oberkörper zurücklehnen", "Gleich lange Strecken aussitzen", "Den Bauch festmachen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd drückt beim Aussitzen den Rücken weg oder reagiert unwillig."],
  lessons: ["ra-w5-l3", "ra-w18-l4", "ra-w18-l3"],
  riderLab: ["rl-09", "rl-10", "rl-12"],
  plan: {
    goal: "Ruhig aussitzen",
    weeks: [
      { title: "Locker werden", focus: "Ohne Bügel und an der Longe", exercises: ["ex-sitz-3", "ex-sitz-4"] },
      { title: "Ruhiger Trab", focus: "Tempo zuerst", exercises: ["ex-trab-1", "ex-sitz-5"] },
      { title: "Etappen verlängern", focus: "Kurz aussitzen, oft wiederholen", exercises: ["ex-sitz-5", "ex-sitz-7"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-5", "ex-trab-1"] },
    ],
  },
};

export const cp06: CoachProblemContent = {
  id: "cp-06",
  review: "entwurf",
  intro: "Unruhige Hände kommen selten aus den Händen selbst – meist gleichen sie einen Sitz aus, der noch nicht ruhig ist.",
  understand: [
    "Die Hände sind das Ende einer Kette aus Becken, Rumpf, Schultern und Ellbogen. Bewegt sich der Sitz, bewegen sich die Hände mit.",
    "Ruhige Hände sind nicht starr: Sie bleiben relativ zum Pferdemaul ruhig, weil die Ellbogen elastisch mitgehen.",
    "Deshalb verbessert man ruhige Hände oft über Sitz und Rumpf – und erst dann über die Zügelhaltung.",
  ],
  questions: [
    q("q-wann", "Wann sind deine Hände besonders unruhig?", [
      o("leicht", "Beim Leichttraben", { "c-mitgehen": 2, "c-sitz": 1 }, "vor allem beim Leichttraben"),
      o("galopp", "Im Galopp", { "c-sitz": 2 }, "vor allem im Galopp"),
      o("immer", "Fast immer", { "c-haltung": 2 }, "fast immer"),
      o("pferd", "Wenn das Pferd am Zügel zieht", { "c-pferd": 3 }, "wenn das Pferd am Zügel zieht"),
    ]),
    q("q-hand", "Wie sehen deine Hände aus?", [
      o("offen", "Offen, die Zügel rutschen durch", { "c-haltung": 3 }, "deine Hände sind offen"),
      o("tief", "Tief oder auf dem Hals", { "c-haltung": 2 }, "deine Hände sind tief"),
      o("arme", "Meine Arme sind steif", { "c-ellbogen": 3 }, "deine Arme sind steif"),
      o("weiss", "Weiß ich nicht"),
    ]),
    q("q-sitz", "Wie sicher fühlst du dich im Sattel?", [
      o("sicher", "Sicher"),
      o("teils", "In schnellen Gangarten unsicher", { "c-sitz": 2 }, "du fühlst dich in schnellen Gangarten unsicher"),
      o("unsicher", "Oft unsicher", { "c-sitz": 3 }, "du fühlst dich oft unsicher"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-sitz", "Die Hände gleichen den Sitz aus", "Wenn der Sitz noch nicht ruhig ist, suchen die Hände Halt. Das Pferd spürt jede dieser Bewegungen im Maul.", ["ex-sitz-4", "ex-sitz-7", "ex-hand-1"]),
    c("c-mitgehen", "Die Hände gehen mit dem Leichttraben mit", "Gehen die Hände beim Aufstehen mit nach oben, ruckt der Zügel bei jedem Tritt.", ["ex-hand-1", "ex-sitz-7"]),
    c("c-haltung", "Zügelhaltung", "Offene Fäuste und unterschiedlich lange Zügel lassen die Hände ständig nachfassen.", ["ex-hilfe-5", "ex-hand-1"]),
    c("c-ellbogen", "Feste Ellbogen", "Starre Arme übertragen jede Bewegung des Oberkörpers auf das Maul. Elastische Ellbogen fangen sie ab.", ["ex-hilfe-5", "ex-hilfe-2"]),
    c("c-pferd", "Das Pferd sucht noch keine ruhige Anlehnung", "Zieht das Pferd am Zügel, wird die Hand unruhig. Losgelassenheit und Dehnung helfen beiden.", ["ex-hilfe-2", "ex-gy-2", "ex-hilfe-5"]),
    koerper("Schlägt das Pferd mit dem Kopf oder geht es gegen die Hand, können Zähne, Gebiss oder Zäumung drücken."),
  ],
  fallback: ["ex-hand-1", "ex-hilfe-5", "ex-sitz-1"],
  gentle: ["ex-hand-1", "ex-hilfe-5", "ex-sitz-1"],
  mistakes: ["Die Hände krampfhaft stillhalten", "Die Hände auf dem Hals abstützen", "Nur an der Hand arbeiten und den Sitz vergessen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd schlägt mit dem Kopf oder sperrt das Maul auf."],
  lessons: ["ra-w2-l3", "ra-w18-l6", "ra-w18-l8"],
  riderLab: ["rl-13", "rl-14", "rl-16"],
  plan: {
    goal: "Ruhige, weiche Hände",
    weeks: [
      { title: "Hände tragen", focus: "Gerte quer und Zügelhaltung", exercises: ["ex-hand-1", "ex-hilfe-5"] },
      { title: "Sitz als Basis", focus: "Balance ohne Zügel", exercises: ["ex-sitz-4", "ex-sitz-1"] },
      { title: "Hände im Trab", focus: "Leichttraben mit ruhiger Hand", exercises: ["ex-sitz-7", "ex-hand-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-hand-1", "ex-hilfe-2"] },
    ],
  },
};

export const cp07: CoachProblemContent = {
  id: "cp-07",
  review: "entwurf",
  intro: "Unbewusstes Ziehen am Zügel ist ein Reflex – oft zum Bremsen oder Festhalten. Er lässt sich umlernen.",
  understand: [
    "Zügelhilfen wirken immer im Wechsel von Annehmen und Nachgeben. Dauerhafter Zug wird für das Pferd unangenehm – es geht dagegen, wird eng oder schneller.",
    "Wer zieht, versucht meist zu bremsen oder sich festzuhalten. Ein sicherer Sitz und Paraden, die aus Gewicht und Schenkel kommen, machen die Hand frei.",
    "Achte auf den Moment des Nachgebens: Er ist die eigentliche Belohnung für das Pferd.",
  ],
  questions: [
    q("q-wann", "Wann ziehst du am Zügel?", [
      o("tempo", "Wenn das Pferd schneller wird", { "c-bremsen": 3 }, "wenn das Pferd schneller wird"),
      o("balance", "Wenn ich die Balance verliere", { "c-sitz": 3 }, "wenn du die Balance verlierst"),
      o("immer", "Eigentlich fast immer", { "c-gewohnheit": 2, "c-haltung": 1 }, "eigentlich fast immer"),
      o("parade", "Bei Übergängen und Paraden", { "c-parade": 3 }, "bei Übergängen und Paraden"),
    ]),
    q("q-pferd", "Wie reagiert dein Pferd?", [
      o("kopf", "Es nimmt den Kopf hoch oder schlägt", { "c-gewohnheit": 1, "c-bremsen": 1 }, "dein Pferd nimmt den Kopf hoch"),
      o("eng", "Es wird eng im Hals", { "c-gewohnheit": 2 }, "dein Pferd wird eng"),
      o("schnell", "Es wird eher schneller", { "c-bremsen": 2, "c-parade": 1 }, "dein Pferd wird schneller"),
      o("normal", "Ich merke keine Reaktion"),
    ]),
    reiter([
      o("steif", "Meine Arme sind fest", { "c-haltung": 3 }, "deine Arme sind fest"),
      o("hinten", "Meine Hände sind weit hinten am Bauch", { "c-haltung": 2 }, "deine Hände sind weit hinten"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-bremsen", "Bremsen nur mit dem Zügel", "Wird nur mit dem Zügel gebremst, zieht das Pferd dagegen – und du ziehst mehr. Gewicht und halbe Paraden brechen diesen Kreislauf.", ["ex-hilfe-1", "ex-hilfe-6", "ex-trab-1"]),
    c("c-sitz", "Festhalten aus Unsicherheit", "Fehlt die Balance, wird der Zügel zum Haltegriff.", ["ex-sitz-4", "ex-sitz-1"]),
    c("c-gewohnheit", "Gewohnheit: dauerhafter Zug", "Dauerhafter Zug fühlt sich irgendwann normal an. Bewusstes Nachgeben macht ihn wieder spürbar.", ["ex-hilfe-2", "ex-gy-2", "ex-hilfe-5"]),
    c("c-haltung", "Arm- und Handhaltung", "Steife Arme und zu weit hinten getragene Hände wirken rückwärts.", ["ex-hilfe-5", "ex-hand-1"]),
    c("c-parade", "Paraden ohne Nachgeben", "Eine Parade ohne Nachgeben wird zum Ziehen.", ["ex-hilfe-1", "ex-ueb-1"]),
    koerper("Reagiert das Pferd mit Kopfschlagen oder Maulaufsperren, sollten auch Zähne, Gebiss und Zäumung geprüft werden."),
  ],
  fallback: ["ex-hilfe-1", "ex-hilfe-2", "ex-hilfe-5"],
  gentle: ["ex-hilfe-2", "ex-hilfe-5", "ex-sitz-1"],
  mistakes: ["Die Zügel einfach lang lassen und die Verbindung aufgeben", "Nachgeben vergessen"],
  safety: SAFE_RIDE,
  checkWhen: ["Dein Pferd zeigt Abwehr im Maul oder schlägt mit dem Kopf."],
  lessons: ["ra-w18-l6", "ra-w18-l7", "ra-w8-l1"],
  riderLab: ["rl-14", "rl-13"],
  plan: {
    goal: "Weiche, nachgebende Hand",
    weeks: [
      { title: "Nachgeben spüren", focus: "Kauen lassen und Verbindung", exercises: ["ex-hilfe-2", "ex-hilfe-5"] },
      { title: "Paraden aus dem Sitz", focus: "Halbe Paraden im Schritt", exercises: ["ex-hilfe-1", "ex-ueb-1"] },
      { title: "Tempo ohne Zug", focus: "Ruhiger Trab", exercises: ["ex-trab-1", "ex-hilfe-6"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-hilfe-2", "ex-hilfe-1"] },
    ],
  },
};

export const cp08: CoachProblemContent = {
  id: "cp-08",
  review: "entwurf",
  intro: "Im Galopp den Sitz zu verlieren ist ganz normal, solange man ihn noch lernt. Wichtig ist, woran es liegt.",
  understand: [
    "Im Galopp schwingt der Pferderücken in einer Wellenbewegung. Das Becken geht diese Bewegung von hinten nach vorn mit, der Oberkörper bleibt ruhig.",
    "Viele verlieren den Sitz beim Angaloppieren, in Wendungen oder wenn das Pferd schneller wird. Kraft und Ausdauer spielen ebenfalls eine Rolle.",
    "An der Longe lässt sich Mitschwingen am sichersten lernen – ohne lenken oder treiben zu müssen.",
  ],
  questions: [
    q("q-wann", "Wann verlierst du im Galopp den Sitz?", [
      o("anspringen", "Beim Angaloppieren", { "c-angalopp": 3 }, "vor allem beim Angaloppieren"),
      o("laenger", "Je länger ich galoppiere", { "c-kraft": 3 }, "je länger du galoppierst"),
      o("wendung", "In Wendungen", { "c-wendung": 3 }, "vor allem in Wendungen"),
      o("schnell", "Wenn das Pferd schneller wird", { "c-tempo": 3 }, "wenn das Pferd schneller wird"),
    ]),
    q("q-wie", "Was passiert genau?", [
      o("hupf", "Ich hüpfe im Sattel", { "c-mitgehen": 3 }, "du hüpfst im Sattel"),
      o("vor", "Ich kippe nach vorne", { "c-angalopp": 1, "c-tempo": 1 }, "du kippst nach vorne"),
      o("rutsch", "Ich rutsche zur Seite", { "c-wendung": 2 }, "du rutschst zur Seite"),
      o("bein", "Ich verliere die Bügel", { "c-bein": 3 }, "du verlierst die Bügel"),
    ]),
    q("q-erfahrung", "Wie oft galoppierst du?", [
      o("selten", "Noch selten", { "c-erfahrung": 3 }, "du galoppierst noch selten"),
      o("regel", "Regelmäßig"),
    ]),
    seit({ pause: { "c-kraft": 1, "c-erfahrung": 1 } }),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-mitgehen", "Das Becken geht den Galoppsprung nicht mit", "Bleibt das Becken fest, wirft dich jeder Sprung hoch. Mitschwingen heißt: das Becken wischt von hinten nach vorn.", ["ex-sitz-8", "ex-sitz-5"]),
    c("c-angalopp", "Sitz beim Angaloppieren", "Beim Angaloppieren kippen viele nach vorn und verlieren die Mitte. Ruhige Vorbereitung hilft dir und dem Pferd.", ["ex-gal-3", "ex-sitz-1"]),
    c("c-kraft", "Kraft und Ausdauer im Sitz", "Galopp fordert Rumpf und Beine. Wer müde wird, wird unruhig im Sitz.", ["ex-sitz-7", "ex-sitz-4"]),
    c("c-wendung", "Balance in Wendungen", "In Wendungen rutschen viele nach außen. Der Blick in die Wendung und ein leicht inneres Gewicht helfen.", ["ex-dr-5", "ex-sitz-4"]),
    c("c-tempo", "Zu schneller Galopp", "Ein eiliger Galopp ist schwer zu sitzen. Erst das Tempo, dann der Sitz.", ["ex-gal-7", "ex-gal-4"]),
    c("c-bein", "Das Bein findet keinen Halt", "Verlierst du die Bügel, fehlt der Halt im Unterschenkel. Ein langes, lockeres Bein findet sie leichter.", ["ex-sitz-3", "ex-sitz-6"]),
    c("c-erfahrung", "Wenig Galopperfahrung", "Mitsitzen im Galopp braucht Wiederholung – am besten an der Longe, kurz und oft.", ["ex-sitz-8", "ex-sitz-4"]),
    SATTEL,
  ],
  fallback: ["ex-sitz-4", "ex-sitz-3", "ex-sitz-6"],
  gentle: ["ex-sitz-4", "ex-sitz-3", "ex-sitz-6"],
  mistakes: ["Mit dem Oberkörper pumpen", "Zu lange galoppieren", "Sich am Zügel festhalten"],
  safety: [...SAFE_RIDE, "Galopp anfangs nur an der Longe oder unter Aufsicht üben."],
  checkWhen: ["Dein Pferd buckelt oder wird im Galopp immer schneller."],
  lessons: ["ra-w18-l14", "ra-w6-l1", "ra-w18-l12"],
  riderLab: ["rl-09", "rl-11", "rl-20"],
  plan: {
    goal: "Im Galopp sicher mitsitzen",
    weeks: [
      { title: "Sitz-Grundlagen", focus: "Longe und langes Bein", exercises: ["ex-sitz-4", "ex-sitz-3"] },
      { title: "Mitschwingen", focus: "Galopp an der Longe", exercises: ["ex-sitz-8", "ex-sitz-5"] },
      { title: "Kurze Reprisen", focus: "Kurz und oft", exercises: ["ex-gal-4", "ex-sitz-8"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-8", "ex-sitz-4"] },
    ],
  },
};

export const cp09: CoachProblemContent = {
  id: "cp-09",
  review: "entwurf",
  intro: "Mit den Knien zu klemmen ist ein Schutzreflex. Er gibt scheinbar Halt – und nimmt dir gleichzeitig die Balance.",
  understand: [
    "Klemmende Knie machen das Knie zum Drehpunkt: Unterschenkel und Oberkörper werden beweglich, der Sitz unruhig.",
    "Der Halt im Sattel kommt aus Balance und einem langen, anliegenden Bein – nicht aus Druck.",
    "Hüftmobilität und Vertrauen sind die zwei wichtigsten Stellschrauben.",
  ],
  questions: [
    q("q-wann", "Wann klemmst du mit den Knien?", [
      o("angst", "Wenn ich unsicher bin oder das Pferd schneller wird", { "c-angst": 3 }, "wenn du unsicher bist"),
      o("leicht", "Beim Leichttraben", { "c-leichttrab": 3 }, "vor allem beim Leichttraben"),
      o("immer", "Fast immer", { "c-huefte": 2, "c-buegel": 1 }, "fast immer"),
      o("galopp", "Im Galopp", { "c-balance": 2, "c-angst": 1 }, "vor allem im Galopp"),
    ]),
    buegel(2, 3),
    q("q-folge", "Was passiert, wenn du klemmst?", [
      o("bein", "Mein Unterschenkel rutscht weg", { "c-huefte": 1, "c-balance": 1 }, "dein Unterschenkel rutscht weg"),
      o("hupf", "Ich hüpfe", { "c-balance": 2 }, "du hüpfst"),
      o("pferd", "Das Pferd wird schneller", { "c-angst": 1, "c-huefte": 1 }, "dein Pferd wird schneller"),
      o("weiss", "Weiß ich nicht"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-angst", "Klemmen als Schutzreflex", "Bei Unsicherheit macht sich der Körper fest. Vertrauen und Balance lösen den Reflex.", ["ex-sitz-4", "ex-sitz-3", "ex-sitz-1"]),
    c("c-leichttrab", "Aufstehen über das Knie", "Wer über das Knie aufsteht, drückt es automatisch an den Sattel.", ["ex-sitz-7", "ex-trab-1"]),
    c("c-huefte", "Feste Hüfte", "Ein festes Hüftgelenk zieht das Knie an den Sattel. Mobilisation ohne Pferd hilft.", ["ex-sitz-3", "ex-sitz-4"]),
    BUEGEL,
    c("c-balance", "Balance in schnelleren Gangarten", "Fehlt Balance, klemmen die Knie. Erst Balance, dann Lockerheit.", ["ex-sitz-4", "ex-sitz-7"]),
    SATTEL,
  ],
  fallback: ["ex-sitz-3", "ex-sitz-6", "ex-sitz-1"],
  gentle: ["ex-sitz-3", "ex-sitz-6", "ex-sitz-1"],
  mistakes: ["Das Knie bewusst vom Sattel wegdrücken", "Zu schnell zu viel ohne Bügel reiten"],
  safety: SAFE_RIDE,
  checkWhen: ["Du hast Schmerzen in Knie oder Hüfte."],
  lessons: ["ra-w2-l2", "ra-w18-l3", "ra-w12-l4"],
  riderLab: ["rl-03", "rl-01", "rl-04"],
  plan: {
    goal: "Lockere Knie, sicherer Halt",
    weeks: [
      { title: "Loslassen", focus: "Ohne Bügel im Schritt", exercises: ["ex-sitz-3", "ex-sitz-6"] },
      { title: "Balance statt Druck", focus: "An der Longe", exercises: ["ex-sitz-4", "ex-sitz-1"] },
      { title: "Lockere Knie im Trab", focus: "Leichttraben über den Unterschenkel", exercises: ["ex-sitz-7", "ex-trab-1"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-3", "ex-sitz-7"] },
    ],
  },
};

export const cp10: CoachProblemContent = {
  id: "cp-10",
  review: "entwurf",
  intro: "Der leichte Sitz verlangt Balance über dem Unterschenkel. Mit passender Bügellänge und etwas Kraft wird er schnell sicherer.",
  understand: [
    "Im leichten Sitz entlastest du den Pferderücken: Gesäß aus dem Sattel, Oberkörper leicht vor, das Gewicht federt in den Unterschenkel und die Absätze.",
    "Der Unterschenkel bleibt am Gurt – liegt er zu weit vorn, fällst du zurück; liegt er hinten, kippst du nach vorn.",
    "Für den leichten Sitz werden die Bügel meist zwei bis drei Loch kürzer geschnallt.",
  ],
  questions: [
    q("q-was", "Was fällt dir im leichten Sitz schwer?", [
      o("halten", "Die Position lange zu halten", { "c-kraft": 3 }, "die Position lange zu halten"),
      o("balance", "Die Balance – ich falle nach vorne oder hinten", { "c-balance": 2, "c-bein": 1 }, "die Balance zu halten"),
      o("hand", "Ich stütze mich mit den Händen ab", { "c-hand": 2, "c-balance": 1 }, "du stützt dich mit den Händen ab"),
      o("galopp", "Vor allem im Galopp", { "c-galopp": 3 }, "vor allem im Galopp"),
    ]),
    q("q-buegel", "Wie lang sind deine Bügel im leichten Sitz?", [
      o("lang", "So lang wie beim Dressurreiten", { "c-buegel": 3 }, "deine Bügel sind so lang wie beim Dressurreiten"),
      o("kuerzer", "Zwei bis drei Loch kürzer"),
      o("weiss", "Weiß ich nicht", { "c-buegel": 1 }),
    ]),
    q("q-bein", "Wo ist dein Unterschenkel?", [
      o("hinten", "Eher hinten", { "c-bein": 3 }, "dein Unterschenkel ist eher hinten"),
      o("vorn", "Eher vorne", { "c-bein": 2 }, "dein Unterschenkel ist eher vorne"),
      o("ruhig", "Ruhig am Gurt"),
    ]),
    seit(),
    veraendert(),
    stand(),
  ],
  causes: [
    c("c-kraft", "Kraft in Beinen und Rumpf", "Der leichte Sitz ist Muskelarbeit. Kraft und Ausdauer lassen sich gut auch ohne Pferd aufbauen.", ["ex-sitz-7", "ex-sitz-2"]),
    c("c-bein", "Der Unterschenkel trägt nicht", "Nur ein Unterschenkel am Gurt kann dich tragen. Vorne fällst du zurück, hinten kippst du vor.", ["ex-sitz-7", "ex-sitz-6"]),
    c("c-balance", "Balance über dem Bein", "Balance entsteht, wenn dein Schwerpunkt über dem Unterschenkel liegt.", ["ex-sitz-7", "ex-sitz-2", "ex-st-1"]),
    c("c-hand", "Abstützen auf dem Hals", "Stützt du dich ab, fehlt die Balance – und das Pferd spürt jedes Abstützen.", ["ex-hand-1", "ex-sitz-7"]),
    c("c-galopp", "Galopp im leichten Sitz", "Im Galopp ist der leichte Sitz bewegter. Kurze Reprisen helfen dir, ihn zu festigen.", ["ex-sitz-2", "ex-gal-4"]),
    c("c-buegel", "Bügel zu lang", "Mit zu langen Bügeln fehlt der Winkel im Knie – du kannst nicht federn.", ["ex-sitz-6", "ex-sitz-7"]),
    SATTEL,
  ],
  fallback: ["ex-sitz-6", "ex-sitz-3", "ex-st-1"],
  gentle: ["ex-sitz-6", "ex-sitz-3", "ex-sitz-1"],
  mistakes: ["Den Oberkörper zu weit nach vorn legen", "Mit Dressurbügellänge reiten", "Die Hände auf den Hals drücken"],
  safety: SAFE_RIDE,
  checkWhen: ["Knie- oder Rückenschmerzen machen den leichten Sitz schwer."],
  lessons: ["ra-w14-l1", "ra-w18-l3", "ra-w2-l2"],
  riderLab: ["rl-17", "rl-20", "rl-07"],
  plan: {
    goal: "Sicher im leichten Sitz",
    weeks: [
      { title: "Position finden", focus: "Bügel und Lot", exercises: ["ex-sitz-6", "ex-sitz-7"] },
      { title: "Halten lernen", focus: "Lange Seite im leichten Sitz", exercises: ["ex-sitz-2", "ex-sitz-7"] },
      { title: "Mit Stangen", focus: "Balance über Stangen", exercises: ["ex-st-1", "ex-sitz-2"] },
      { title: "Überprüfen", focus: "Vergleich mit Woche 1", exercises: ["ex-sitz-2", "ex-sitz-7"] },
    ],
  },
};
