import { COL } from "@/video/kit";
import LINES from "./lines.json";
import { renderLern, timingOf, type LernDef } from "./lern-kit";

/* Fünf neue Lernvideos für die Reitakademie (02.11.2026), Aufnahmen Jessica v4. */

const HO = COL.honey;
const RU = COL.rust;
const FO = COL.forest;
const ALLH: Array<"g" | "s" | "z"> = ["g", "s", "z"];

const DEFS: LernDef[] = [
  {
    slug: "leichttraben-komplett",
    chip: "Reitakademie · Trab reiten",
    beats: {
      frage: { v: "side", gait: "trab", ride: "rise" },
      warum: { v: "side", gait: "trab", ride: "rise", chip: "Pferderücken wird entlastet" },
      zweitakt: { v: "side", gait: "trab", ride: "rise", legs: { HL: COL.pairA, VR: COL.pairA, HR: COL.pairB, VL: COL.pairB } },
      wie: { v: "side", gait: "trab", ride: "rise", marks: ["huefte", "knie"], updown: true },
      aufab: { v: "side", gait: "trab", ride: "rise", updown: true },
      haende: { v: "side", gait: "trab", ride: "rise", marks: ["hand", "knie", "absatz"] },
      treiben: { v: "side", gait: "trab", ride: "rise", wade: "sit" },
      warumtreiben: { v: "side", gait: "trab", ride: "rise", wade: "sit", legs: { HL: HO } },
      fuss: { v: "side", gait: "trab", ride: "rise", legs: { VR: HO } },
      schulter: { v: "side", gait: "trab", ride: "rise", legs: { VR: HO }, updown: true, chip: "äußere Schulter" },
      falsch: { v: "side", gait: "trab", ride: "falsch", legs: { VR: HO }, chip: "einen Takt länger sitzen", chipCol: RU },
      wechsel: { v: "top", mode: "circle", chip: "Handwechsel = Fuß wechseln" },
      merke: { v: "side", gait: "trab", ride: "rise", legs: { VR: HO } },
    },
    sections: [
      { from: "frage", kicker: "Trab reiten", title: "Leichttraben", items: [["entlastet den Pferderücken", "warum"], ["angenehmer für dich", "warum"], ["Trab = Zweitakt, Beine schräg gegenüber", "zweitakt"]] },
      { from: "wie", kicker: "So geht's", title: "Auf und ab im Takt", items: [["aus der Hüfte nach vorn-oben", "wie"], ["weich wieder hinsetzen", "wie"], ["Hände bleiben ruhig", "haende"], ["Knie federt, Absatz tief", "haende"]] },
      { from: "treiben", kicker: "Treiben", title: "Beim Hinsetzen treiben", items: [["sitzen: kurz mit beiden Waden drücken", "treiben", FO], ["aufstehen: Beine locker", "treiben"], ["dann stößt sich das innere Hinterbein ab", "warumtreiben"]] },
      { from: "fuss", kicker: "Der richtige Fuß", title: "Äußere Schulter vor – du bist oben", items: [["aufstehen, wenn die äußere Schulter vorgeht", "schulter"], ["falscher Fuß: einen Takt länger sitzen", "falsch", RU], ["Handwechsel = Fuß wechseln", "wechsel"]] },
    ],
    merke: ["Äußere Schulter vor –", "du bist oben.", "Beim Hinsetzen treiben."],
  },
  {
    slug: "leichter-sitz",
    chip: "Reitakademie · Galopp",
    beats: {
      frage: { v: "side", gait: "galopp-rechts", ride: "sitz" },
      was: { v: "side", gait: "galopp-rechts", ride: "ls-in", marks: ["gesaess"] },
      wann: { v: "side", gait: "galopp-rechts", ride: "ls", chip: "Aufwärmen · Gelände · Springen" },
      p1: { v: "side", gait: "galopp-rechts", ride: "ls", marks: ["gesaess", "buegel"], chip: "1 · Po etwas hoch" },
      p2: { v: "side", gait: "galopp-rechts", ride: "ls", marks: ["schulter"], chip: "2 · Oberkörper leicht vor" },
      p3: { v: "side", gait: "galopp-rechts", ride: "ls", marks: ["absatz", "knie"], chip: "3 · Absatz tief, Knie federn" },
      p4: { v: "side", gait: "galopp-rechts", ride: "ls", marks: ["hand"], chip: "4 · Hände gehen mit" },
      wichtig: { v: "side", gait: "galopp-rechts", ride: "ls", marks: ["knie", "absatz"], chip: "nicht am Zügel festhalten!", chipCol: RU },
      merke: { v: "side", gait: "galopp-rechts", ride: "ls" },
    },
    sections: [
      { from: "frage", kicker: "Galopp", title: "Der leichte Sitz", items: [["Gewicht aus dem Sattel", "was"], ["Pferderücken kann frei schwingen", "was"], ["Aufwärmen · Gelände · Springen", "wann"]] },
      { from: "p1", kicker: "In 4 Schritten", title: "So geht der leichte Sitz", items: [["Po etwas hoch, Gewicht in die Bügel", "p1"], ["Oberkörper leicht vor", "p2"], ["Absatz tief, Knie federn", "p3"], ["Hände gehen mit", "p4"], ["nicht am Zügel festhalten!", "wichtig", RU]] },
    ],
    merke: ["Po hoch,", "Absatz tief,", "Hände gehen mit."],
  },
  {
    slug: "pferd-lenken",
    chip: "Reitakademie · Schritt reiten",
    beats: {
      frage: { v: "top", mode: "circle", h: [] },
      koerper: { v: "top", mode: "circle", glow: { seat: 0.6, innerLeg: 0.6, innerRein: 0.6, gaze: 0.6 } },
      blick: { v: "top", mode: "circle", glow: { gaze: 1 }, h: [] },
      gewicht: { v: "top", mode: "circle", glow: { seat: 1 }, h: ["g"] },
      schenkel: { v: "top", mode: "circle", glow: { innerLeg: 1, outerLeg: 1 }, outBack: 1, h: ["s"] },
      zuegel: { v: "top", mode: "circle", glow: { innerRein: 1, outerRein: 1 }, outBack: 1, h: ["z"] },
      nie: { v: "top", mode: "straight", bend: -38, pull: 1, glow: { innerRein: 1, pull: 1 }, h: ["z"] },
      merke: { v: "top", mode: "circle", glow: { gaze: 1, seat: 1, innerLeg: 1, outerLeg: 1, innerRein: 1, outerRein: 1 }, outBack: 1 },
    },
    sections: [
      { from: "frage", kicker: "Lenken", title: "Mit dem ganzen Körper", hilfen: ALLH, items: [["Blick: dahin, wo du hinwillst", "blick"], ["Gewicht etwas nach innen", "gewicht", COL.brownDeep], ["innerer Schenkel am Gurt, äußerer dahinter", "schenkel", FO], ["innerer Zügel zeigt den Weg, äußerer gibt nach", "zuegel", RU], ["nie nur an einem Zügel ziehen!", "nie", RU]] },
    ],
    merke: ["Erst schauen,", "dann sitzen,", "dann Bein und Hand."],
  },
  {
    slug: "innen-aussen",
    chip: "Reitakademie · Reiterhilfen",
    beats: {
      frage: { v: "top", mode: "circle", sides: true, bend: -12 },
      innen: { v: "top", mode: "circle", sides: true, bend: -14 },
      schenkelin: { v: "top", mode: "circle", bend: -14, glow: { innerLeg: 1 }, h: ["s"] },
      schenkelaus: { v: "top", mode: "circle", bend: -14, glow: { innerLeg: 0.4, outerLeg: 1 }, outBack: 1, h: ["s"] },
      zuegel: { v: "top", mode: "circle", bend: -12, poll: -10, glow: { outerRein: 1, innerRein: 0.6 }, h: ["z"] },
      fehler: { v: "top", mode: "drift", bend: -38, pull: 1, glow: { innerRein: 1, pull: 1 }, shoulder: true, h: ["z"] },
      rahmen: { v: "top", mode: "circle", bend: -12, rails: true, glow: { innerLeg: 1, outerLeg: 1, outerRein: 1, innerRein: 0.5 }, outBack: 1, h: ["s", "z"] },
      merke: { v: "top", mode: "circle", bend: -12, rails: true, glow: { innerLeg: 1, outerRein: 1 } },
    },
    sections: [
      { from: "frage", kicker: "Reiterhilfen", title: "Innen und außen", items: [["innen = Seite der Biegung", "innen"], ["auf dem Zirkel: zur Mitte", "innen"], ["außen = zur Bande", "innen"]] },
      { from: "schenkelin", kicker: "Wer macht was?", title: "Innen treibt, außen hält", hilfen: ["s", "z"], items: [["innerer Schenkel treibt am Gurt", "schenkelin", FO], ["äußerer Schenkel passt auf", "schenkelaus", FO], ["äußerer Zügel hält die Schulter", "zuegel", RU], ["innerer Zügel stellt ein bisschen", "zuegel", RU]] },
      { from: "fehler", kicker: "Typischer Fehler", title: "Über die Schulter weg", hilfen: ["s", "z"], items: [["nur innen ziehen: Schulter rutscht nach außen", "fehler", RU], ["Lösung: einrahmen – wie zwischen zwei Schienen", "rahmen", FO]] },
    ],
    merke: ["Innen treibt, außen hält –", "so bleibt die Schulter,", "wo sie liegt."],
  },
  {
    slug: "anreiten-durchparieren",
    chip: "Reitakademie · Übergänge",
    beats: {
      frage: { v: "side", gait: "trab", ride: "sitz" },
      hilfen: { v: "side", gait: "stand", marks: ["gesaess", "wade", "hand"] },
      hp: { v: "side", gait: "trab", chip: "halbe Parade = Achtung!", chipCol: HO },
      hpwie: { v: "side", gait: "stand", hand: true, marks: ["gesaess", "bauch", "wade"] },
      hpzieh: { v: "side", gait: "stand", hand: true, marks: ["hand"] },
      schritt: { v: "side", gait: "stand", to: ["schritt", "damit dein Pferd"], marks: ["wade", "becken", "hand"] },
      schritt2: { v: "side", gait: "schritt", wade: "on" },
      trab: { v: "side", gait: "schritt", to: ["trab", "und die Hand"], marks: ["wade", "hand"] },
      trab2: { v: "side", gait: "trab", ride: "aussitzen-dann-rise", chip: "erst aussitzen" },
      galopp: { v: "top", mode: "circle", glow: { seat: 0.6 }, chip: "in der Ecke oder auf dem Zirkel", speed: 0.45 },
      galopp2: { v: "top", mode: "circle", glow: { seat: 1, innerLeg: 1, outerLeg: 1 }, outBack: 1, h: ["g", "s"], speed: 0.45 },
      galopp3: { v: "top", mode: "circle", bend: -12, poll: -6, glow: { innerRein: 1, outerRein: 1, innerLeg: 0.5, outerLeg: 0.5 }, outBack: 1, h: ["z"], speed: 0.45 },
      galopp4: { v: "side", gait: "galopp-links", legs: { HR: HO }, chip: "äußeres Hinterbein zuerst" },
      runter: { v: "side", gait: "galopp-links", hand: true },
      gt: { v: "side", gait: "galopp-links", to: ["trab", "Dann wird"], hand: true, marks: ["gesaess", "wade"] },
      ts: { v: "side", gait: "trab", to: ["schritt", "bis dein Pferd"], hand: true, marks: ["gesaess"] },
      warum: { v: "side", gait: "schritt", legs: { HL: HO, HR: HO }, hind: true, wade: "on", h: ["s"] },
      gp: { v: "side", gait: "schritt", to: ["stand", "bis dein Pferd steht"], hand: true },
      gp2: { v: "side", gait: "stand", chip: "Hand leicht – und loben!", chipCol: FO },
      treppe: { v: "treppe", mode: "down" },
      profi: { v: "treppe", mode: "profi" },
      merke: { v: "side", gait: "stand" },
    },
    sections: [
      { from: "frage", kicker: "Übergänge", title: "Anreiten und durchparieren", hilfen: ALLH, treppe: true, items: [["drei Hilfen arbeiten zusammen", "hilfen"]] },
      { from: "hp", kicker: "Die halbe Parade", title: "Achtung, gleich passiert was!", hilfen: ALLH, treppe: true, items: [["kurz tief sitzen, Bauch fest", "hpwie"], ["Schenkel bleiben dran", "hpwie", FO], ["Hand nimmt an – und gibt nach", "hpwie", RU], ["die Hand zieht nicht!", "hpzieh", RU]] },
      { from: "schritt", kicker: "Anreiten", title: "Halt → Schritt → Trab", hilfen: ALLH, treppe: true, items: [["erst eine halbe Parade", "schritt"], ["beide Schenkel treiben am Gurt", "schritt", FO], ["Becken geht mit, Hand gibt nach", "schritt", RU], ["Trab: deutlicher treiben, erst aussitzen", "trab", FO]] },
      { from: "galopp", kicker: "Angaloppieren", title: "Trab → Galopp", treppe: true, items: [["aussitzen + halbe Parade", "galopp"], ["Gewicht innen", "galopp2", COL.brownDeep], ["innerer Schenkel am Gurt", "galopp2", FO], ["äußerer Schenkel dahinter", "galopp2", FO], ["innen stellen, außen halten", "galopp3", RU], ["Anspringen: Hand gibt nach", "galopp3", RU]] },
      { from: "runter", kicker: "Durchparieren", title: "Galopp → Trab → Schritt", treppe: true, items: [["mehrere halbe Paraden", "runter"], ["tief sitzen, Schenkel dran", "gt", FO], ["Hand nimmt an und gibt nach", "gt", RU], ["neue Gangart? Hand leicht!", "gt"], ["Hinterbeine treten unter", "warum", FO]] },
      { from: "gp", kicker: "Die ganze Parade", title: "Schritt → Halt", treppe: true, items: [["halbe Paraden kurz hintereinander", "gp"], ["Pferd steht auf allen vier Beinen", "gp2"], ["Hand leicht – und loben!", "gp2", FO]] },
      { from: "treppe", kicker: "Vom Galopp bis zum Halt", title: "Stufe für Stufe", items: [["Galopp → Trab → Schritt → Halt", "treppe"], ["bei jeder Stufe halbe Paraden", "treppe"], ["Profis: auch direkt Galopp → Schritt", "profi", RU]] },
    ],
    merke: ["Halbe Parade heißt Achtung.", "Ganze Parade heißt Halt.", "Treiben bringt dich vorwärts –", "danach wird die Hand leicht."],
  },
];

const TEXTS = Object.fromEntries(Object.entries(LINES as Record<string, Array<[string, string]>>).map(([k, v]) => [k, Object.fromEntries(v)]));

export const LERN: Record<string, { total: () => number; render: (t: number) => ReturnType<typeof renderLern> }> = Object.fromEntries(
  DEFS.map((d) => [`lern-${d.slug}`, { total: () => timingOf(d.slug).total, render: (t: number) => renderLern(d, TEXTS[d.slug], t) }]),
);
