import "server-only";
import type { AdventureContent, DocVisual } from "@/engine/types";

/**
 * PREMIUM-INHALT: „Mystery Files · Die Nacht im Geisterstall“
 * Interaktive Fassung des Print-Falls Case 02 (Horse & Harmonie Mystery Files).
 *
 * Nur Stufe Mittel (7–9 Jahre). Alle Texte sind deshalb einfache Strings.
 *
 * Welt: Lindenhof (frei erfunden) mit Hanna, Wilhelm, Tilda, Mats, Herrn Voss
 * und Oma Greta. Lea, Mila und Ben aus den Hofgeschichten sind zur
 * Halloween-Übernachtung angemeldet und ermitteln.
 * Abweichung vom Heft: Der Hofhund heißt hier Bruno (Krümel ist in der App
 * schon der Hund vom Hofgeschichten-Hof).
 *
 * Auflösung (wie im Heft): Stallmeister Wilhelm hat das alte Schulpony Flocke
 * heimlich in Box C im Alten Stall untergebracht, weil Flocke bis zum
 * 31. Oktober ein neues Zuhause brauchte. Das „Geisterpferd“ ist ein echtes,
 * weißes Pony. Den Zettel an der Stalltür hat Tilda aufgehängt – er hat mit
 * dem Besuch nichts zu tun. Keine Magie, kein echter Spuk.
 *
 * Hotspot-Koordinaten gehören zu den Szenen in
 * src/components/illustrations/scenes/Lindenhof.tsx.
 */

/* ---------- Beweisstücke (werden mehrfach gezeigt) ---------- */

const FALLAKTE: DocVisual = {
  style: "typed",
  label: "Fall Nr. 02 · vertraulich",
  title: "Was wir sicher wissen",
  lines: [
    "1 · Gestern um 20:30 Uhr hat Stallmeister Wilhelm die Stallgasse gefegt. Da war der Boden sauber.",
    "2 · Heute um 6:30 Uhr: Sattelkammer offen, Laterne brennt, Hufspuren am Boden, Zettel an der Stalltür.",
    "3 · Alle fünf Pferde standen am Morgen in ihren Boxen. Alle Riegel waren zu.",
    "4 · Die Stalltüren werden nachts nie abgeschlossen – damit man im Notfall schnell bei den Pferden ist.",
    "5 · Hofhund Bruno schläft neben der Stalltür. Er bellt bei jedem, der nachts kommt. Still bleibt er nur bei Hanna, Oma Greta und Wilhelm – sie füttern ihn jeden Tag.",
  ],
};

const PROTOKOLL: DocVisual = {
  style: "typed",
  label: "Protokoll · Zeugin Oma Greta (79)",
  title: "Ich saß am Fenster und konnte nicht schlafen.",
  lines: [],
  table: [
    ["Uhrzeit", "Was Oma Greta gesehen hat"],
    ["kurz nach halb zehn (21:30)", "Tildas Auto fährt vom Hof."],
    ["zehn Uhr (22:00)", "Die Kirchturmuhr schlägt. Alles dunkel und still. Nebel."],
    ["Viertel nach zehn (22:15)", "In der Sattelkammer geht ein flackerndes Licht an. Bruno bleibt ganz ruhig."],
    ["zwanzig nach zehn (22:20)", "Herr Voss kommt mit der Taschenlampe an den Zaun und ruft seinen Kater. Dort bleibt er."],
    ["zwanzig vor elf (22:40)", "Bruno bellt wie verrückt! Ein Fahrradlicht kommt auf den Hof."],
    ["Viertel vor elf (22:45)", "Das Fahrrad rast wieder davon."],
    ["elf Uhr (23:00)", "Ich gehe schlafen. Das Licht in der Sattelkammer brennt noch."],
  ],
};

const HUFKARTEI: DocVisual = {
  style: "list",
  label: "Hufkartei Lindenhof",
  title: "Hufschmied K. Eisenbarth · alle 5 Pferde",
  lines: [],
  table: [
    ["Pferd", "Breite", "Eisen"],
    ["Donner (Rappe)", "15 cm", "ja"],
    ["Zimt (Fuchsstute)", "13 cm", "ja"],
    ["Luna (Schimmelstute)", "12 cm", "ja"],
    ["Mogli (Brauner)", "12 cm", "nein, barhuf"],
    ["Kastanie (Haflinger)", "11 cm", "nein, barhuf"],
  ],
};

const INVENTAR: DocVisual = {
  style: "list",
  label: "Beweisstück F · Wilhelms Liste",
  title: "Inventar Sattelkammer · geprüft am 1. Oktober",
  lines: [],
  table: [
    ["Soll", "Was"],
    ["5", "Sättel"],
    ["6", "Trensen"],
    ["4", "Halfter"],
    ["1", "Pony-Halfter"],
    ["3", "Decken"],
    ["3", "Eimer"],
    ["2", "Putzkisten"],
    ["1", "alte Laterne"],
    ["1", "Truhe (zu)"],
  ],
};

const BON: DocVisual = {
  style: "receipt",
  label: "Beweisstück G · der Bon",
  title: "Tankstelle am Markt · in der Stadt",
  lines: ["30.10.          22:12 Uhr", "Luftballons orange   2,49", "Kakao, heiß          1,80", "SUMME EUR            4,29", "Danke und gute Fahrt!"],
};

const TRAINERLISTE: DocVisual = {
  style: "list",
  label: "Beweisstück H · Zettel vom Trainer",
  title: "SV Lindenthal · Flutlicht-Training · Freitag, 30.10.",
  lines: ["20:45 bis 22:15 Uhr · Sportplatz", "Mats K. ✓ da – bis zum Schluss", "Trainer: J. Okafor"],
};

const ZEITUNG: DocVisual = {
  style: "newspaper",
  label: "Beweisstück I · aus dem Dorfarchiv",
  title: "Lindenthaler Bote, 2. November 1926: »Geisterpferd« war eine Stute!",
  lines: [
    "In der Nacht vor Allerheiligen versetzte ein schneeweißes Pferd ohne Reiter unser Dorf in Aufregung. Nun ist das Rätsel gelöst:",
    "Die Schimmelstute Nebelkönigin vom Lindenhof hatte sich auf der Weide losgerissen und fand im Nebel allein nach Hause. Der Stallmeister entdeckte sie vor der Sattelkammer – und ließ in der Aufregung seine Laterne brennen.",
    "Seither erzählt man sich im Dorf vom »Geisterpferd«.",
  ],
};

export const geisterstall: AdventureContent = {
  slug: "geisterstall",
  clues: {
    laterne: { label: "Die Laterne brennt mit echter Flamme", visual: { kind: "item", name: "laterne" } },
    hufspuren: { label: "Hufspuren von der Hintertür", visual: { kind: "track", track: "barhuf" } },
    geheimzettel: { label: "Zettel mit Geheimzeichen", visual: { kind: "item", name: "geheimzettel" } },
    "tuer-offen": { label: "Spinnennetz am Alten Stall zerrissen", visual: { kind: "item", name: "spinnennetz" } },
    "schluessel-fehlt": { label: "5 Haken, aber nur 4 Schlüssel", visual: { kind: "item", name: "haken" } },
    abreissstreifen: { label: "„Zuhause gesucht“: ein Streifen fehlt", visual: { kind: "item", name: "zettel" } },
    hintertuer: { label: "Die Hintertür sieht Oma Greta nicht", visual: { kind: "item", name: "tuer" } },
    "mats-flunkert": { label: "Um 22:40 kam ein Fahrrad – Mats?", visual: { kind: "item", name: "fahrrad" } },
    "wilhelm-weiss": { label: "Wilhelm „schlief“ – und kennt die Uhrzeit", visual: { kind: "item", name: "uhr" } },
    "huf-klein": { label: "Huf 9 cm, barhuf: zu klein für alle 5 Pferde", visual: { kind: "item", name: "huf" } },
    kerbe: { label: "Am Hufrand fehlt ein Stück", visual: { kind: "item", name: "hufeisen" } },
    "flocke-box-c": { label: "„Flocke in Box C. Nur Heu und Karotten.“", visual: { kind: "item", name: "karotte" } },
    "pony-sachen": { label: "Pony-Halfter, Decke und Eimer fehlen", visual: { kind: "item", name: "ponyhalfter" } },
    foto: { label: "Altes Foto vor der Truhe", visual: { kind: "item", name: "foto" } },
    "schluessel-alter-stall": { label: "Der Schlüssel zum Alten Stall fehlt", visual: { kind: "item", name: "schluessel" } },
    "alibi-tilda": { label: "Tilda: um 22:12 an der Kasse in der Stadt", visual: { kind: "item", name: "bon" } },
    "alibi-mats": { label: "Mats: Training bis 22:15 Uhr", visual: { kind: "item", name: "kopfhoerer" } },
    "zettel-tilda": { label: "Der Zettel an der Stalltür ist von Tilda", visual: { kind: "item", name: "block-kuerbis" } },
    nebelkoenigin: { label: "1926: Das „Geisterpferd“ war eine echte Stute", visual: { kind: "item", name: "zeitung" } },
    "foto-16": { label: "Foto: Flocke mit bestem Freund, vor 16 Jahren", visual: { kind: "item", name: "foto" } },
    "foto-wilhelm": { label: "Auf dem Foto: Mütze und Bleistift", visual: { kind: "item", name: "muetze" } },
  },
  missions: [
    /* ===================== Mission 1 ===================== */
    {
      id: "morgen",
      title: "Der geheimnisvolle Morgen",
      intro: "Mission 1: Der geheimnisvolle Morgen",
      steps: [
        {
          type: "story",
          id: "m1-start",
          visual: { kind: "scene", scene: "lh-cover" },
          speaker: "erzaehler",
          text: "Es ist der Abend vor Halloween. Über dem Lindenhof liegt Nebel, dicht wie Watte. Lea, Mila und Ben freuen sich schon: Morgen sind sie bei der großen Halloween-Übernachtung im Heu dabei. Doch am nächsten Morgen um halb sieben klingelt das Telefon.",
        },
        {
          type: "story",
          id: "m1-hanna",
          visual: { kind: "scene", scene: "lh-stallgasse" },
          speaker: "hanna",
          text: "„Hier ist Hanna vom Lindenhof. Ich brauche euch! Die alte Sattelkammer steht offen, drinnen brennt die Laterne – und auf dem frisch gefegten Boden sind Hufspuren. Sie enden vor einer Tür, die seit zwölf Jahren verschlossen ist. Und an der Stalltür hängt ein Zettel: ‚Um Mitternacht wird das Geheimnis gelüftet.‘ Soll ich die Übernachtung absagen?“",
        },
        {
          type: "story",
          id: "m1-legende",
          speaker: "greta",
          text: "„Jedes Kind im Dorf kennt die Geschichte“, erzählt Oma Greta. „In der Halloween-Nacht kommt ein schneeweißes Pferd ohne Reiter auf den Lindenhof. Es geht bis zur alten Sattelkammer. Und wenn dort am Morgen die Laterne brennt – dann war das Geisterpferd da.“",
        },
        {
          type: "story",
          id: "m1-akte",
          visual: { kind: "doc", doc: FALLAKTE },
          speaker: "mila",
          text: "„Eine Legende ist kein Beweis“, sagt Mila. „Wir schreiben auf, was wir sicher wissen. Lies die Fallakte genau – vor allem Punkt 5 über Hofhund Bruno.“",
        },
        {
          type: "hotspots",
          id: "m1-tatort",
          mode: "collect",
          scene: { kind: "scene", scene: "lh-stallgasse" },
          prompt: "Der Tatort: Nichts wurde verändert. Finde fünf Spuren in der Stallgasse!",
          missHint: "Hier ist keine Spur. Schau auf den Boden, an die Türen und an die Wand.",
          targets: [
            { id: "laterne", label: "Laterne", x: 290, y: 345, r: 48, clue: "laterne", say: "Die Laterne brennt – mit einer echten Flamme, keiner Glühbirne." },
            { id: "brett", label: "Schlüsselbrett", x: 402, y: 240, r: 46, clue: "schluessel-fehlt", say: "Ich zähle fünf Haken, aber nur vier Schlüssel!" },
            { id: "netz", label: "Spinnennetz", x: 494, y: 210, r: 34, clue: "tuer-offen", say: "Das Spinnennetz an der Tür zum Alten Stall ist zerrissen. Die Tür wurde vor Kurzem geöffnet!" },
            { id: "spuren", label: "Hufspuren", x: 590, y: 515, r: 50, clue: "hufspuren", say: "Hufspuren! Sie kommen von rechts hinten herein." },
            { id: "zettel", label: "zerknüllter Zettel", x: 432, y: 542, r: 38, clue: "geheimzettel", say: "Ein zerknüllter Zettel. Der gehört nicht in einen frisch gefegten Stall." },
          ],
          decoys: [
            { id: "boxen", label: "Pferdeboxen", x: 95, y: 330, r: 70, say: "Die Riegel der Boxen sind alle zu. Kein Pferd ist ausgebrochen." },
            { id: "besen", label: "Besen", x: 370, y: 390, r: 30, say: "Mit dem Besen hat Wilhelm gestern Abend gefegt." },
            { id: "kuerbis", label: "Kürbisse", x: 462, y: 414, r: 28, say: "Das ist die Halloween-Deko für heute Abend." },
            { id: "moritz", label: "schwarzer Kater", x: 742, y: 545, r: 38, say: "Miau! Ein schwarzer Kater sitzt auf dem Heu. Merk ihn dir!" },
          ],
        },
        {
          type: "choice",
          id: "m1-flamme",
          prompt: "In der Laterne brennt eine echte Flamme. Geht so etwas von allein an?",
          layout: "list",
          options: [
            { id: "ja", label: "Ja, Laternen gehen nachts von allein an.", feedback: "Eine Flamme braucht jemanden, der sie anzündet – zum Beispiel mit Streichhölzern." },
            { id: "geist", label: "Ein Geist hat sie angezündet.", feedback: "Detektive suchen echte Erklärungen. Wer braucht Streichhölzer, um eine Flamme zu machen?" },
            { id: "mensch", label: "Nein – ein Mensch hat sie angezündet.", correct: true },
          ],
          explain: "Genau! In der Nacht war also ein Mensch in der Sattelkammer. Und die Hufspuren zeigen: Ein Tier war auch da.",
        },
        {
          type: "choice",
          id: "m1-tuer",
          prompt: "Die Hufspuren kommen von rechts hinten. Durch welche Tür kamen sie herein?",
          visual: { kind: "scene", scene: "lh-stallgasse" },
          layout: "list",
          options: [
            { id: "vorne", label: "durch die Stalltür vorne", feedback: "Vorne bei der Stalltür sind keine Spuren. Schau, wo die Spuren anfangen." },
            { id: "hinten", label: "durch die Hintertür", correct: true },
            { id: "alter-stall", label: "durch die Tür zum Alten Stall", feedback: "Dort hören die Spuren auf. Wo fangen sie an?" },
          ],
          explain: "Richtig! Die Spuren kommen durch die Hintertür, gehen zur Sattelkammer und enden an der Tür zum Alten Stall.",
        },
        {
          type: "hotspots",
          id: "m1-brett",
          mode: "collect",
          scene: { kind: "scene", scene: "lh-brett" },
          prompt: "Beweisstück A: das Schwarze Brett. Hier hängt alles, was gerade wichtig ist. An einem Zettel fehlt etwas. Tippe darauf!",
          missHint: "Lies jeden Zettel genau und schau auch unten an die Ränder.",
          targets: [
            { id: "streifen", label: "fehlender Abreißstreifen", x: 650, y: 425, r: 22, clue: "abreissstreifen", say: "Bei „Zuhause gesucht“ fehlt ein Abreißstreifen. Jemand hat sich für die Ponystute Flocke interessiert!" },
          ],
          decoys: [
            { id: "halloween", label: "Halloween-Plakat", x: 155, y: 200, r: 80, say: "Die Halloween-Übernachtung ist heute. Anmeldung bei Tilda." },
            { id: "hufschmied", label: "Hufschmied", x: 395, y: 155, r: 70, say: "Der Hufschmied kommt erst am 3. November." },
            { id: "sattelkammer", label: "Sattelkammer-Zettel", x: 420, y: 325, r: 50, say: "Hanna möchte, dass die Sattelkammer immer zu ist. Heute stand sie offen!" },
            { id: "vermisst", label: "Kater vermisst", x: 190, y: 435, r: 70, say: "Herr Voss vom Nachbarhof sucht seinen schwarzen Kater Moritz." },
            { id: "streifen-da", label: "Abreißstreifen", x: 588, y: 425, r: 24, say: "Diese Streifen hängen noch. Schau dir die ganze Reihe an." },
          ],
        },
        {
          type: "story",
          id: "m1-ende",
          speaker: "ben",
          visual: { kind: "notebook" },
          text: "Ben schreibt alles ins Detektivbuch. „Ein Mensch mit Streichhölzern. Ein Tier mit Hufen. Ein Schlüssel fehlt, und die alte Tür war offen. Hier waren mehr als einer!“",
        },
      ],
    },

    /* ===================== Mission 2 ===================== */
    {
      id: "verdaechtige",
      title: "Wer war in der Nacht da?",
      intro: "Mission 2: Wer war in der Nacht da?",
      steps: [
        {
          type: "story",
          id: "m2-plan",
          visual: { kind: "scene", scene: "lh-plan" },
          speaker: "hanna",
          text: "„Hier ist unser Hofplan. Oma Greta saß in der Nacht an ihrem Fenster im Wohnhaus. Was sie von dort sehen kann, ist im Plan hell.“",
        },
        {
          type: "hotspots",
          id: "m2-blickfeld",
          mode: "collect",
          scene: { kind: "scene", scene: "lh-plan" },
          prompt: "Was konnte Oma Greta von ihrem Fenster aus sehen? Tippe auf die drei Dinge im hellen Feld.",
          missHint: "Schau nur in das helle Feld zwischen Wohnhaus und Stall.",
          targets: [
            { id: "stalltuer", label: "Stalltür", x: 227, y: 355, r: 30, say: "Die Stalltür kann Oma Greta sehen." },
            { id: "fenster", label: "Fenster der Sattelkammer", x: 620, y: 278, r: 28, say: "Das Fenster der Sattelkammer liegt im hellen Feld. Dort hat sie das Licht gesehen." },
            { id: "zaun", label: "Zaun zu Herrn Voss", x: 600, y: 150, r: 40, say: "Den Zaun zu Herrn Voss sieht sie auch." },
          ],
          decoys: [
            { id: "hintertuer", label: "Hintertür", x: 490, y: 381, r: 28, say: "Die Hintertür liegt hinter dem Stall. Die kann Oma Greta nicht sehen!" },
            { id: "anhaenger", label: "Anhänger", x: 370, y: 522, r: 30, say: "Der Anhänger steht hinter der Scheune. Den sieht Oma Greta nicht." },
          ],
        },
        {
          type: "choice",
          id: "m2-heimlich",
          prompt: "Profi-Frage: Jemand will nachts heimlich in den Stall, ohne vom Wohnhaus aus gesehen zu werden. Welche Tür nimmt er?",
          visual: { kind: "scene", scene: "lh-plan" },
          layout: "list",
          options: [
            { id: "stalltuer", label: "die Stalltür", feedback: "Die Stalltür liegt im hellen Feld – dort würde Oma Greta ihn sehen. Und Bruno schläft direkt daneben." },
            { id: "hintertuer", label: "die Hintertür", correct: true },
            { id: "alter-stall", label: "die Tür zum Alten Stall", feedback: "Die führt nur von der Stallgasse in den Alten Stall – nicht von draußen herein." },
          ],
          explain: "Genau! Die Hintertür kann man vom Wohnhaus aus nicht sehen – und durch sie kamen die Hufspuren.",
          clue: "hintertuer",
        },
        {
          type: "story",
          id: "m2-verdaechtige",
          speaker: "lea",
          visual: {
            kind: "doc",
            doc: {
              style: "list",
              label: "Die Verdächtigen",
              title: "Vier Menschen kennen den Weg in die Sattelkammer",
              lines: [],
              table: [
                ["Wer", "Auf dem Hof seit", "Möglicher Grund"],
                ["Wilhelm Brandt, Stallmeister, 62", "37 Jahren", "Findet Halloween überflüssig: „Ponys machen nur Arbeit.“"],
                ["Tilda Sommer, Reitlehrerin, 29", "3 Jahren", "Organisiert die Party: „Je gruseliger, desto besser!“"],
                ["Mats Keller, Stallhelfer, 14", "1 Jahr", "Hat gewettet, dass er an Halloween alle zum Gruseln bringt."],
                ["Albert Voss, Nachbar, 58", "7 Jahren nebenan", "Letztes Jahr hat ihn der Party-Lärm gestört."],
              ],
            },
          },
          text: "„Vier Menschen kennen den Hof gut genug“, sagt Lea. „Jeder hätte einen Grund für einen Spuk. Aber Vorsicht: Ein Grund ist noch kein Beweis!“",
        },
        {
          type: "match",
          id: "m2-kennzeichen",
          prompt: "Schau dir die Gesichter genau an. Wer trägt welches Kennzeichen? Ziehe es zur richtigen Person – oder tippe erst das Kennzeichen, dann die Person.",
          targets: [
            { id: "wilhelm", label: "Wilhelm", visual: { kind: "person", person: "wilhelm" } },
            { id: "tilda", label: "Tilda", visual: { kind: "person", person: "tilda" } },
            { id: "mats", label: "Mats", visual: { kind: "person", person: "mats" } },
            { id: "voss", label: "Herr Voss", visual: { kind: "person", person: "voss" } },
          ],
          items: [
            { id: "muetze", label: "Schiebermütze und Bleistift hinter dem Ohr", visual: { kind: "item", name: "muetze" }, target: "wilhelm", say: "Wilhelm trägt eine Schiebermütze – und hinter dem Ohr steckt immer ein dicker Bleistift.", wrong: "Schau, wer eine Mütze trägt und einen Bleistift hinter dem Ohr hat." },
            { id: "schal", label: "Pferdeschwanz und oranger Schal", visual: { kind: "item", name: "schal" }, target: "tilda", say: "Tilda: Pferdeschwanz, oranger Schal – und ihr Notizblock ist immer dabei.", wrong: "Wer hat einen Pferdeschwanz und einen orangen Schal?" },
            { id: "kopfhoerer", label: "Kopfhörer um den Hals", visual: { kind: "item", name: "kopfhoerer" }, target: "mats", say: "Mats hat immer Kopfhörer um den Hals – und kommt mit dem Fahrrad.", wrong: "Wer trägt Kopfhörer um den Hals?" },
            { id: "lampe", label: "Hut, Brille und Taschenlampe", visual: { kind: "item", name: "taschenlampe" }, target: "voss", say: "Herr Voss trägt Hut und Brille und hat immer eine Taschenlampe dabei.", wrong: "Wer trägt einen Hut und eine Brille?" },
          ],
        },
        {
          type: "story",
          id: "m2-wilhelm",
          speaker: "wilhelm",
          text: "„Um halb neun habe ich die Stallgasse gefegt, um neun lag ich im Bett – ich wohne ja über der Futterkammer. Geschlafen wie ein Stein! Gehört und gesehen habe ich nichts. Geisterpferd, pah. Und sagt dem Mats: Wer nachts um zwanzig vor elf mit dem Rad auf den Hof kommt, soll gefälligst leise sein.“",
        },
        {
          type: "story",
          id: "m2-voss",
          speaker: "voss",
          text: "„Ab zehn habe ich meinen Kater gesucht – erst im Garten, dann am Zaun. Ihren Hof habe ich nicht betreten! Als ich an den Zaun kam, flackerte in der Sattelkammer schon ein Licht. Und Ihr Hund hat mich angeknurrt. Wie immer.“",
        },
        {
          type: "story",
          id: "m2-mats",
          speaker: "mats",
          text: "„Ich? Ich bin gestern um sieben nach Hause geradelt und war den ganzen Abend daheim. Ehrenwort! Kann ich jetzt gehen? Ich muss noch … äh … mein Zimmer aufräumen.“",
        },
        {
          type: "story",
          id: "m2-tilda",
          speaker: "tilda",
          visual: {
            kind: "doc",
            doc: {
              style: "phone",
              title: "Nachricht von Tilda · 7:05 Uhr",
              lines: [
                "Bin gleich da! Gestern: bis halb zehn die Stallgasse geschmückt, dann mit dem Auto in die Stadt, Luftballons kaufen. Kassenzettel hab ich noch. Wilhelm kam übrigens erst gegen acht mit dem Anhänger zurück – Heu holen, sagt er. Was ist los??",
              ],
            },
          },
          text: "Tilda ist noch unterwegs. Sie schickt Hanna eine Nachricht.",
        },
        {
          type: "choice",
          id: "m2-flunkert",
          prompt: "Einer flunkert! Vergleiche die Aussagen mit Oma Gretas Protokoll. Wessen Geschichte passt nicht dazu?",
          visual: { kind: "doc", doc: PROTOKOLL },
          layout: "pictures",
          options: [
            { id: "wilhelm", label: "Wilhelm", visual: { kind: "person", person: "wilhelm" }, feedback: "Wilhelms Zeiten passen zum Protokoll. Aber merk dir, was er über das Fahrrad gesagt hat!" },
            { id: "tilda", label: "Tilda", visual: { kind: "person", person: "tilda" }, feedback: "Oma Greta sah Tildas Auto kurz nach halb zehn wegfahren. Das passt." },
            { id: "mats", label: "Mats", visual: { kind: "person", person: "mats" }, correct: true },
            { id: "voss", label: "Herr Voss", visual: { kind: "person", person: "voss" }, feedback: "Oma Greta sah Herrn Voss um 22:20 am Zaun – so wie er es erzählt." },
          ],
          explain: "Richtig! Mats sagt, er war den ganzen Abend zu Hause. Aber um zwanzig vor elf kam ein Fahrrad auf den Hof – und Mats kommt immer mit dem Rad.",
          clue: "mats-flunkert",
        },
        {
          type: "choice",
          id: "m2-profi",
          prompt: "Profi-Frage: Wilhelm sagt, er hat geschlafen wie ein Stein und nichts gehört. Trotzdem weiß er etwas ganz genau. Was?",
          layout: "list",
          options: [
            { id: "fahrrad", label: "dass um zwanzig vor elf jemand mit dem Rad auf den Hof kam", correct: true },
            { id: "ballons", label: "dass Tilda Luftballons gekauft hat", feedback: "Das hat Tilda selbst geschrieben, nicht Wilhelm." },
            { id: "kater", label: "dass Herr Voss seinen Kater gesucht hat", feedback: "Davon hat Wilhelm nichts gesagt. Lies seine Aussage noch einmal." },
          ],
          explain: "Genau! Wer fest schläft, kennt die Uhrzeit des Fahrrads nicht auf die Minute. Wilhelm war in der Nacht wohl wach …",
          clue: "wilhelm-weiss",
        },
        {
          type: "story",
          id: "m2-ende",
          speaker: "mila",
          visual: { kind: "notebook" },
          text: "„Mats flunkert – und Wilhelm weiß mehr, als er sagt“, flüstert Mila. „Aber ein Gefühl ist kein Beweis. Wir brauchen mehr Spuren.“",
        },
      ],
    },

    /* ===================== Mission 3 ===================== */
    {
      id: "spuren",
      title: "Spuren und Geheimschrift",
      intro: "Mission 3: Spuren und Geheimschrift",
      steps: [
        {
          type: "story",
          id: "m3-start",
          visual: { kind: "scene", scene: "lh-hufabdruck" },
          speaker: "hanna",
          text: "„Luna ist unser einziger Schimmel“, flüstert Hanna. „Ob sie das Geisterpferd ist?“ Ben schüttelt den Kopf: „Vermutungen helfen nicht – Spuren schon.“ Er legt ein Messgitter über den deutlichsten Abdruck.",
        },
        {
          type: "choice",
          id: "m3-breite",
          prompt: "Miss nach! Zähle die Kästchen an der breitesten Stelle. Ein Kästchen ist in echt 1 cm. Wie breit ist der Abdruck?",
          visual: { kind: "scene", scene: "lh-hufabdruck" },
          layout: "list",
          options: [
            { id: "7", label: "7 cm", feedback: "Zähle noch einmal von der linken bis zur rechten Kante des Abdrucks." },
            { id: "9", label: "9 cm", correct: true },
            { id: "11", label: "11 cm", feedback: "Fast! Zähle nur die Kästchen, die der Abdruck berührt – von Spalte 3 bis 11." },
            { id: "13", label: "13 cm", feedback: "So breit ist das ganze Gitter. Wie breit ist nur der Abdruck?" },
          ],
          explain: "Richtig: 9 Kästchen, also 9 cm.",
        },
        {
          type: "choice",
          id: "m3-eisen",
          prompt: "Mit Hufeisen sieht ein Abdruck aus wie ein U. Ohne Eisen sieht man die ganze Sohle mit einem V in der Mitte. Was siehst du?",
          visual: { kind: "scene", scene: "lh-hufabdruck" },
          layout: "pictures",
          options: [
            { id: "eisen", label: "mit Hufeisen", visual: { kind: "track", track: "hufeisen" }, feedback: "Ein Hufeisen-Abdruck ist innen leer wie ein U. Unser Abdruck ist ganz ausgefüllt." },
            { id: "barhuf", label: "barhuf", visual: { kind: "track", track: "barhuf" }, correct: true },
          ],
          explain: "Genau! Die ganze Sohle mit einem V: Das Tier ist barhuf, also ohne Hufeisen.",
        },
        {
          type: "choice",
          id: "m3-kartei",
          prompt: "Vergleiche mit der Hufkartei: 9 cm, barhuf. Zu welchem Lindenhof-Pferd passt der Abdruck?",
          visual: { kind: "doc", doc: HUFKARTEI },
          layout: "list",
          options: [
            { id: "luna", label: "Luna", feedback: "Luna ist zwar ein Schimmel, aber ihr Huf ist 12 cm breit und sie trägt Hufeisen." },
            { id: "mogli", label: "Mogli", feedback: "Mogli ist barhuf – aber sein Huf ist 12 cm breit." },
            { id: "kastanie", label: "Kastanie", feedback: "Kastanie ist barhuf, aber 11 cm breit. Unser Abdruck ist noch kleiner." },
            { id: "keins", label: "zu keinem!", correct: true },
          ],
          explain: "Richtig! Das kleinste Lindenhof-Pferd hat 11 cm. Das Tier ist kleiner als alle Pferde vom Hof – es gehört gar nicht hierher!",
          clue: "huf-klein",
        },
        {
          type: "hotspots",
          id: "m3-rand",
          mode: "collect",
          scene: { kind: "scene", scene: "lh-hufabdruck" },
          prompt: "Schau auf den Rand des Abdrucks. Was ist an diesem Huf besonders? Tippe darauf!",
          missHint: "Fahre mit dem Finger langsam den Rand des Abdrucks entlang.",
          targets: [
            { id: "kerbe", label: "Kerbe am Rand", x: 268, y: 168, r: 46, clue: "kerbe", say: "Links oben fehlt ein kleines Stück vom Huf. Daran kann man dieses Tier wiedererkennen!" },
          ],
        },
        {
          type: "choice",
          id: "m3-richtung",
          prompt: "Lies die Spur von oben: Die runde Seite eines Abdrucks zeigt immer nach vorn. Wohin lief das Tier?",
          visual: { kind: "scene", scene: "lh-hufspur" },
          layout: "list",
          options: [
            { id: "hin", label: "Von der Hintertür zum Alten Stall – und keine Spur führt hinaus.", correct: true },
            { id: "her", label: "Vom Alten Stall zur Hintertür – und dann weg.", feedback: "Schau, wohin die runden Seiten zeigen: zur Hintertür oder zum Alten Stall?" },
            { id: "zurueck", label: "Einmal hin und wieder zurück.", feedback: "Siehst du eine Spur, die zurückführt? Alle Abdrücke zeigen in eine Richtung." },
          ],
          explain: "Genau! Das Tier lief zum Alten Stall, mit einem kleinen Abstecher zur Sattelkammer. Und weil keine Spur hinausführt, ist es noch im Stall!",
        },
        {
          type: "story",
          id: "m3-zettel",
          visual: { kind: "scene", scene: "lh-geheimzettel" },
          speaker: "hanna",
          text: "Ihr streicht den zerknüllten Zettel glatt: keine Buchstaben, nur seltsame Zeichen! „Die kenne ich“, sagt Hanna. „So schrieben früher die Stallmeister. Das Alphabet steht in unserem alten Stallbuch – es liegt offen in der Sattelkammer. Jeder vom Hof könnte es benutzt haben.“",
        },
        {
          type: "cipher",
          id: "m3-code",
          cipher: "stallmeister",
          prompt: "Knacke den Code! Jeder Buchstabe wohnt in einem Fach. Sein Zeichen zeigt die Wände des Fachs – im zweiten Gitter und im zweiten Kreuz kommt ein Punkt dazu. Tippe ein Zeichen an und dann den passenden Buchstaben.",
          message: "FLOCKE IN BOX C NUR HEU UND KAROTTEN",
          hint: "Vergleiche die Wände des Zeichens genau – und schau, ob ein Punkt darin ist.",
          success: "Geknackt! Da steht: „Flocke in Box C. Nur Heu und Karotten.“",
          clue: "flocke-box-c",
        },
        {
          type: "choice",
          id: "m3-wer",
          prompt: "Wer frisst Heu und Karotten? Flocke ist also …",
          layout: "list",
          options: [
            { id: "pony", label: "ein Pferd oder Pony", correct: true },
            { id: "hund", label: "ein Hund", feedback: "Hunde fressen kein Heu. Wer frisst Heu und mag Karotten?" },
            { id: "mensch", label: "ein Mensch", feedback: "Menschen essen zwar Karotten – aber Heu?" },
          ],
          explain: "Richtig! Flocke ist ein Pferd – und nach dem Hufabdruck ein ziemlich kleines. Also ein Pony!",
        },
        {
          type: "choice",
          id: "m3-box",
          prompt: "Schau auf den Hofplan: In welchem Teil des Hofs gibt es eine Box C?",
          visual: { kind: "scene", scene: "lh-plan" },
          layout: "list",
          options: [
            { id: "haupt", label: "im Hauptstall", feedback: "Im Hauptstall haben die Boxen Nummern: Box 1 bis 5." },
            { id: "alt", label: "im Alten Stall", correct: true },
            { id: "scheune", label: "in der Scheune", feedback: "In der Scheune lagern Heu und Stroh, dort gibt es keine Boxen." },
          ],
          explain: "Genau! Im Alten Stall heißen die Boxen A, B und C – hinter der Tür, die seit zwölf Jahren verschlossen ist.",
        },
        {
          type: "choice",
          id: "m3-name",
          prompt: "Keines der fünf Lindenhof-Pferde heißt Flocke. Trotzdem hast du den Namen schon gelesen. Wo?",
          visual: { kind: "scene", scene: "lh-brett" },
          layout: "list",
          options: [
            { id: "kartei", label: "in der Hufkartei", feedback: "In der Hufkartei stehen Donner, Zimt, Luna, Mogli und Kastanie." },
            { id: "brett", label: "am Schwarzen Brett", correct: true },
            { id: "plakat", label: "auf dem Halloween-Plakat", feedback: "Auf dem Plakat steht das Programm für heute Abend. Lies die anderen Zettel!" },
          ],
          explain: "Richtig! „Zuhause gesucht: Ponystute Flocke, 24 Jahre, Schimmel.“ Und an genau diesem Zettel fehlt ein Abreißstreifen!",
        },
        {
          type: "story",
          id: "m3-ende",
          speaker: "lea",
          visual: { kind: "notebook" },
          text: "„Ein kleines, fremdes, weißes Pony“, sagt Lea langsam. „Es heißt Flocke und steht in Box C im Alten Stall. Das ist unser Geisterpferd! Aber wer hat es hergebracht?“",
        },
      ],
    },

    /* ===================== Mission 4 ===================== */
    {
      id: "sattelkammer",
      title: "Die alte Sattelkammer",
      intro: "Mission 4: Die alte Sattelkammer",
      steps: [
        {
          type: "story",
          id: "m4-start",
          visual: { kind: "scene", scene: "lh-sattelkammer" },
          speaker: "erzaehler",
          text: "Die Tür knarrt. Es riecht nach Leder, Staub und Petroleum, auf dem Tisch flackert die Laterne. Wilhelm führt Buch über alles, was hier hängt. Seine Liste verrät, ob in der Nacht etwas weggekommen ist.",
        },
        {
          type: "story",
          id: "m4-liste",
          visual: { kind: "doc", doc: INVENTAR },
          speaker: "ben",
          text: "„Wir machen Inventur“, sagt Ben. „Merk dir vor allem: 1 Pony-Halfter, 3 Decken und 3 Eimer.“",
        },
        {
          type: "hotspots",
          id: "m4-inventur",
          mode: "collect",
          scene: { kind: "scene", scene: "lh-sattelkammer" },
          prompt: "Inventur! Vergleiche das Bild mit Wilhelms Liste. An drei Stellen fehlt etwas. Tippe darauf!",
          missHint: "Zähle Reihe für Reihe: Decken, Halfter, Eimer.",
          targets: [
            { id: "pony", label: "leerer Pony-Haken", x: 318, y: 222, r: 36, say: "Am Haken mit dem Schild PONY hängt nichts. Das Pony-Halfter fehlt!" },
            { id: "decke", label: "fehlende Decke", x: 261, y: 113, r: 40, say: "Nur zwei Decken – auf der Liste stehen drei." },
            { id: "eimer", label: "fehlender Eimer", x: 472, y: 506, r: 36, say: "Nur zwei Eimer. Einer fehlt!" },
          ],
          decoys: [
            { id: "saettel", label: "Sättel", x: 520, y: 105, r: 50, say: "Fünf Sättel – alle da." },
            { id: "trensen", label: "Trensen", x: 520, y: 240, r: 50, say: "Sechs Trensen – alle da." },
            { id: "halfter", label: "Halfter", x: 160, y: 232, r: 60, say: "Vier große Halfter – alle da." },
            { id: "putzkisten", label: "Putzkisten", x: 143, y: 390, r: 50, say: "Zwei Putzkisten – alle da." },
          ],
        },
        {
          type: "choice",
          id: "m4-wozu",
          prompt: "Pony-Halfter, Decke und Eimer: Wozu braucht man genau diese drei Dinge?",
          layout: "list",
          options: [
            { id: "reiten", label: "zum Reiten", feedback: "Zum Reiten braucht man Sattel und Trense – und die sind alle noch da." },
            { id: "pony", label: "um ein kleines Pferd zu führen, zu tränken und warm zu halten", correct: true },
            { id: "misten", label: "zum Stallausmisten", feedback: "Zum Ausmisten nimmt man Mistgabel und Schubkarre." },
          ],
          explain: "Genau! Und Hanna staunt: „Das Pony-Halfter stammt aus der Zeit, als es hier noch Schulponys gab. Heute ist kein Pferd auf dem Hof klein genug dafür.“",
          clue: "pony-sachen",
        },
        {
          type: "hotspots",
          id: "m4-suchbild",
          mode: "collect",
          scene: { kind: "scene", scene: "lh-sattelkammer" },
          prompt: "Suchbild: Finde die Streichhölzer, eine Karotte und ein altes Foto!",
          missHint: "Schau auf den Tisch und auf den Boden.",
          targets: [
            { id: "streichholz", label: "Streichhölzer", x: 632, y: 436, r: 26, say: "Die Streichhölzer liegen neben der Laterne. Damit wurde sie angezündet." },
            { id: "karotte", label: "Karotte", x: 518, y: 543, r: 30, say: "Eine Karotte auf dem Boden – Futter für ein Pony?" },
            { id: "foto", label: "altes Foto", x: 690, y: 568, r: 32, clue: "foto", say: "Ein altes Foto lag vor der offenen Truhe. Das steckst du ein!" },
          ],
          decoys: [
            { id: "maus", label: "Maus", x: 234, y: 468, r: 30, say: "Eine Maus! Die wohnt hier und war bestimmt nicht der Besucher." },
            { id: "moritz", label: "schwarzer Kater", x: 706, y: 488, r: 24, say: "Da ist ja wieder der schwarze Kater – diesmal in der Truhe!" },
            { id: "hufeisen", label: "Hufeisen", x: 740, y: 44, r: 26, say: "Ein Glücks-Hufeisen über dem Fenster." },
            { id: "stallbuch", label: "Stallbuch", x: 721, y: 428, r: 20, say: "Das alte Stallbuch mit der Geheimschrift. Es liegt aufgeschlagen da." },
          ],
        },
        {
          type: "story",
          id: "m4-brett",
          visual: { kind: "scene", scene: "lh-schluesselbrett" },
          speaker: "hanna",
          text: "Zurück zum Schlüsselbrett: fünf Haken, vier Schlüssel. „Die Schildchen sind seit Jahren verblasst“, seufzt Hanna. „Aber ein paar Dinge weiß ich noch auswendig.“",
        },
        {
          type: "match",
          id: "m4-schluessel",
          prompt: "Hanna weiß: 1 · Der Futterkammer-Schlüssel hängt ganz links. 2 · Der Scheunen-Schlüssel hat einen Griff wie ein Kleeblatt. 3 · Der Anhänger-Schlüssel hängt direkt neben dem Futterkammer-Schlüssel. 4 · Der Sattelkammer-Schlüssel hängt links vom Schlüssel zum Alten Stall. Welche Tür gehört zu welchem Haken?",
          targets: [
            { id: "h1", label: "Haken 1", visual: { kind: "item", name: "schluessel-rund" } },
            { id: "h2", label: "Haken 2", visual: { kind: "item", name: "schluessel-eckig" } },
            { id: "h3", label: "Haken 3", visual: { kind: "item", name: "schluessel-herz" } },
            { id: "h4", label: "Haken 4 (leer)", visual: { kind: "item", name: "haken" } },
            { id: "h5", label: "Haken 5", visual: { kind: "item", name: "schluessel-klee" } },
          ],
          items: [
            { id: "futter", label: "Futterkammer", visual: { kind: "tag", text: "F" }, target: "h1", say: "Futterkammer: ganz links, Haken 1.", wrong: "Hinweis 1: Der Futterkammer-Schlüssel hängt ganz links." },
            { id: "anhaenger", label: "Pferdeanhänger", visual: { kind: "tag", text: "P" }, target: "h2", say: "Pferdeanhänger: direkt neben der Futterkammer, Haken 2.", wrong: "Hinweis 3: Der Anhänger-Schlüssel hängt direkt neben dem Futterkammer-Schlüssel." },
            { id: "sattel", label: "Sattelkammer", visual: { kind: "tag", text: "S" }, target: "h3", say: "Sattelkammer: Haken 3, links vom Alten Stall.", wrong: "Hinweis 4: Der Sattelkammer-Schlüssel hängt links vom Schlüssel zum Alten Stall. Welche Haken sind noch frei?" },
            { id: "alt", label: "Alter Stall", visual: { kind: "tag", text: "A" }, target: "h4", say: "Alter Stall: Haken 4 – und genau dieser Haken ist leer!", wrong: "Hinweis 4: Der Schlüssel zum Alten Stall hängt rechts vom Sattelkammer-Schlüssel." },
            { id: "scheune", label: "Scheune", visual: { kind: "tag", text: "Sch" }, target: "h5", say: "Scheune: der Kleeblatt-Griff, Haken 5.", wrong: "Hinweis 2: Der Scheunen-Schlüssel hat einen Griff wie ein Kleeblatt." },
          ],
        },
        {
          type: "choice",
          id: "m4-fehlt",
          prompt: "Ein Haken ist leer. Welcher Schlüssel fehlt?",
          visual: { kind: "scene", scene: "lh-schluesselbrett" },
          layout: "list",
          options: [
            { id: "scheune", label: "der Scheunen-Schlüssel", feedback: "Der Kleeblatt-Schlüssel hängt noch an Haken 5." },
            { id: "alt", label: "der Schlüssel zum Alten Stall", correct: true },
            { id: "futter", label: "der Futterkammer-Schlüssel", feedback: "Der hängt ganz links an Haken 1." },
          ],
          explain: "Richtig! Jemand hat den Schlüssel zum Alten Stall – und die Tür war in der Nacht offen.",
          clue: "schluessel-alter-stall",
        },
        {
          type: "story",
          id: "m4-lauschen",
          speaker: "erzaehler",
          text: "Ihr legt ein Ohr an die Tür zum Alten Stall. Erst ist alles still. Dann: Raschel. Schnaub. Mampf, mampf. „Da drin ist jemand!“, flüstert Hanna. „Wenn dort ein Tier ist, wollen wir es nicht erschrecken. Und ich will wissen, wer den Schlüssel hat. Findet es heraus – dann gehen wir gemeinsam hinein.“",
        },
        {
          type: "story",
          id: "m4-ende",
          speaker: "ben",
          visual: { kind: "notebook" },
          text: "„Zwischenstand“, sagt Ben. „Flocke steht in Box C. Jemand hat für sie ein Pony-Halfter, eine Decke und einen Eimer geholt – und den Schlüssel zum Alten Stall. Offen bleibt: Wer war es? Und warum?“",
        },
      ],
    },

    /* ===================== Mission 5 ===================== */
    {
      id: "zeitleiste",
      title: "Die Halloween-Zeitleiste",
      intro: "Mission 5: Die Halloween-Zeitleiste",
      steps: [
        {
          type: "story",
          id: "m5-tilda",
          visual: { kind: "doc", doc: BON },
          speaker: "tilda",
          text: "Da biegt Tilda auf den Hof und drückt euch ihren Kassenzettel in die Hand: „Hier – mein Beweis!“",
        },
        {
          type: "match",
          id: "m5-zeitleiste",
          prompt: "Sortiere die Nacht! Lege jede Karte zur richtigen Uhrzeit. Die Zeiten stehen in Oma Gretas Protokoll, in der Fallakte und auf dem Bon.",
          targets: [
            { id: "t2030", label: "20:30" },
            { id: "t2130", label: "21:30" },
            { id: "t2200", label: "22:00" },
            { id: "t2212", label: "22:12" },
            { id: "t2215", label: "22:15" },
            { id: "t2220", label: "22:20" },
            { id: "t2240", label: "22:40" },
            { id: "t2245", label: "22:45" },
            { id: "t2300", label: "23:00" },
          ],
          items: [
            { id: "m", label: "Wilhelm fegt die Stallgasse.", visual: { kind: "tag", text: "M" }, target: "t2030", say: "20:30: Wilhelm fegt. Da war der Boden noch sauber.", wrong: "Wann hat Wilhelm gefegt? Das steht in der Fallakte, Punkt 1." },
            { id: "o", label: "Tilda fährt mit dem Auto vom Hof.", visual: { kind: "tag", text: "O" }, target: "t2130", say: "21:30: Tildas Auto fährt vom Hof.", wrong: "Oma Greta sah Tildas Auto „kurz nach halb zehn“." },
            { id: "n", label: "Die Kirchturmuhr schlägt. Alles still.", visual: { kind: "tag", text: "N" }, target: "t2200", say: "22:00: Die Kirchturmuhr schlägt zehn.", wrong: "Wann schlägt die Kirchturmuhr? Um „zehn Uhr“." },
            { id: "d", label: "Tilda bezahlt an der Tankstelle.", visual: { kind: "tag", text: "D" }, target: "t2212", say: "22:12: Tilda steht an der Kasse in der Stadt.", wrong: "Die Uhrzeit steht auf dem Kassenbon." },
            { id: "l", label: "In der Sattelkammer geht ein Licht an.", visual: { kind: "tag", text: "L" }, target: "t2215", say: "22:15: Das Licht in der Sattelkammer geht an.", wrong: "Oma Greta sah das Licht um „Viertel nach zehn“." },
            { id: "i", label: "Herr Voss kommt mit der Taschenlampe an den Zaun.", visual: { kind: "tag", text: "I" }, target: "t2220", say: "22:20: Herr Voss ist am Zaun.", wrong: "Herr Voss kam „zwanzig nach zehn“ an den Zaun." },
            { id: "c", label: "Bruno bellt! Ein Fahrradlicht kommt.", visual: { kind: "tag", text: "C" }, target: "t2240", say: "22:40: Bruno bellt, ein Fahrrad kommt.", wrong: "Das Fahrrad kam „zwanzig vor elf“." },
            { id: "h", label: "Das Fahrrad rast wieder davon.", visual: { kind: "tag", text: "H" }, target: "t2245", say: "22:45: Das Fahrrad rast davon.", wrong: "Das Fahrrad raste „Viertel vor elf“ davon." },
            { id: "t", label: "Oma Greta geht schlafen. Das Licht brennt noch.", visual: { kind: "tag", text: "T" }, target: "t2300", say: "23:00: Oma Greta geht schlafen.", wrong: "Oma Greta ging um „elf Uhr“ schlafen." },
          ],
        },
        {
          type: "choice",
          id: "m5-wort",
          prompt: "Lies die Buchstaben von 20:30 bis 23:00 der Reihe nach. Wie heißt das Lösungswort?",
          layout: "list",
          options: [
            { id: "mondnacht", label: "MONDNACHT", feedback: "Lies Buchstabe für Buchstabe: M, O, N, D – und dann?" },
            { id: "mondlicht", label: "MONDLICHT", correct: true },
            { id: "lichtmond", label: "LICHTMOND", feedback: "Fang bei 20:30 an – bei Wilhelm, der fegt." },
          ],
          explain: "MONDLICHT! Super, die Nacht ist sortiert.",
        },
        {
          type: "choice",
          id: "m5-alibi-tilda",
          prompt: "Tildas Alibi: Um 22:12 stand sie an der Kasse in der Stadt. Mit dem Auto braucht man 20 Minuten zum Lindenhof (Hofplan). Kann sie um 22:15 die Laterne angezündet haben?",
          visual: { kind: "doc", doc: BON },
          layout: "list",
          options: [
            { id: "ja", label: "Ja, das schafft sie.", feedback: "Rechne: 22:12 Uhr plus 20 Minuten. Wann wäre sie frühestens zurück?" },
            { id: "nein", label: "Nein – frühestens um 22:32 wäre sie zurück.", correct: true },
          ],
          explain: "Richtig! Tilda hat ein bewiesenes Alibi.",
          clue: "alibi-tilda",
        },
        {
          type: "story",
          id: "m5-spind",
          visual: { kind: "item", name: "kostuem" },
          speaker: "hanna",
          text: "Hanna schließt Spind Nummer 3 auf. „Ein Gespenster-Kostüm!“, ruft sie. „Mats, hast du das Geisterpferd gespielt?“",
        },
        {
          type: "story",
          id: "m5-mats",
          speaker: "mats",
          text: "„Nein! Das Kostüm ist für heute Abend. Okay, okay – ich sage die Wahrheit: Ich war gestern beim Flutlicht-Training, bis Viertel nach zehn. Danach bin ich zum Hof geradelt, weil mein Handy noch im Spind lag. Im Dunkeln darf ich eigentlich nicht allein Rad fahren, darum habe ich geflunkert. Aber in der Stallgasse stand ganz hinten etwas Weißes. Auf vier Beinen! Es hat geschnaubt. Dann fiel eine Tür zu – und ich bin gerannt wie noch nie.“",
        },
        {
          type: "choice",
          id: "m5-kostuem",
          prompt: "Prüfe das Kostüm: Wurde es schon getragen?",
          visual: { kind: "item", name: "kostuem" },
          layout: "list",
          options: [
            { id: "ja", label: "Ja, es sieht benutzt aus.", feedback: "Schau genau: Ist es noch verpackt?" },
            { id: "nein", label: "Nein – es ist noch eingeschweißt.", correct: true },
          ],
          explain: "Genau! Das Kostüm ist noch originalverpackt. Mats hat es nicht getragen.",
        },
        {
          type: "choice",
          id: "m5-alibi-mats",
          prompt: "Das Training endete um 22:15. Vom Sportplatz zum Lindenhof braucht man mit dem Rad 25 Minuten. Wann kam Mats also an?",
          visual: { kind: "doc", doc: TRAINERLISTE },
          layout: "list",
          options: [
            { id: "2215", label: "um 22:15 – als das Licht anging", feedback: "Um 22:15 war Mats noch auf dem Sportplatz. Rechne 25 Minuten dazu." },
            { id: "2240", label: "um 22:40 – genau als Bruno bellte", correct: true },
            { id: "2300", label: "um 23:00", feedback: "Rechne noch einmal: 22:15 Uhr plus 25 Minuten." },
          ],
          explain: "Richtig! Das passt zu Oma Gretas Protokoll. Um 22:15 war Mats noch beim Training – er kann die Laterne nicht angezündet haben.",
          clue: "alibi-mats",
        },
        {
          type: "choice",
          id: "m5-weiss",
          prompt: "Weiß. Vier Beine. Schnauben. Was hat Mats am ehesten gesehen?",
          layout: "list",
          options: [
            { id: "geist", label: "ein Gespenst", feedback: "Gespenster schnauben nicht und hinterlassen keine Hufspuren." },
            { id: "tier", label: "ein echtes Tier", correct: true },
          ],
          explain: "Genau – ein echtes, weißes Tier. Und das Bellen und Mats’ Fahrrad haben den nächtlichen Besucher um 22:40 gestört!",
        },
        {
          type: "story",
          id: "m5-ende",
          speaker: "mila",
          visual: { kind: "notebook" },
          text: "„Falsche Fährte!“, sagt Mila. „Mats ist kein Täter – er ist ein Zeuge. Und Tilda war in der Stadt. Bleiben noch Wilhelm und Herr Voss.“",
        },
      ],
    },

    /* ===================== Mission 6 ===================== */
    {
      id: "foto",
      title: "Der Zettel und das alte Foto",
      intro: "Mission 6: Der Zettel und das alte Foto",
      steps: [
        {
          type: "choice",
          id: "m6-block",
          prompt: "Der Zettel von der Stalltür ist oben abgerissen und hat unten in der Ecke einen kleinen Kürbis. Hanna sammelt drei Notizblöcke ein. Von welchem stammt der Zettel?",
          layout: "pictures",
          options: [
            { id: "a", label: "Block A · Mats (kariert)", visual: { kind: "item", name: "block-kariert" }, feedback: "Block A ist kariert. Der Zettel ist glatt und hat einen Kürbis." },
            { id: "b", label: "Block B · Tilda (Kürbis)", visual: { kind: "item", name: "block-kuerbis" }, correct: true },
            { id: "c", label: "Block C · Wilhelm (Lieferschein)", visual: { kind: "item", name: "block-lieferschein" }, feedback: "Block C hat Linien und den Aufdruck „Lieferschein“. Passt das zum Zettel?" },
          ],
          explain: "Richtig! Gleiche Risskante, gleicher Kürbis-Aufdruck: Der Zettel ist von Tildas Block.",
        },
        {
          type: "story",
          id: "m6-tilda",
          visual: { kind: "doc", doc: ZEITUNG },
          speaker: "tilda",
          text: "Tilda lacht. „Na klar ist der von mir! Den habe ich um halb zehn an die Stalltür gepinnt, bevor ich losgefahren bin. Um Mitternacht verrate ich allen Kindern, woher die Legende vom Geisterpferd wirklich kommt. Schaut mal, was ich im Dorfarchiv gefunden habe!“",
        },
        {
          type: "choice",
          id: "m6-zwei",
          prompt: "Der Zettel hing schon um 21:30 an der Tür. Das Licht in der Sattelkammer ging erst um 22:15 an – da war Tilda in der Stadt. Zettel und Laterne stammen also …",
          layout: "list",
          options: [
            { id: "eine", label: "von derselben Person", feedback: "Tilda war um 22:15 in der Stadt. Konnte sie das Licht anzünden?" },
            { id: "zwei", label: "von zwei verschiedenen Personen", correct: true },
          ],
          explain: "Genau! Der Zettel hat mit dem nächtlichen Besucher nichts zu tun. Noch eine falsche Fährte!",
          clue: "zettel-tilda",
        },
        {
          type: "choice",
          id: "m6-legende",
          prompt: "Lies den Zeitungsausschnitt von 1926: Was war das Geisterpferd vor 100 Jahren wirklich?",
          visual: { kind: "doc", doc: ZEITUNG },
          layout: "list",
          options: [
            { id: "geist", label: "ein echter Geist", feedback: "Lies noch einmal: Wie hieß das weiße Pferd?" },
            { id: "stute", label: "eine echte Schimmelstute im Nebel", correct: true },
            { id: "decke", label: "ein Bettlaken auf der Weide", feedback: "In der Zeitung steht etwas anderes. Wer war Nebelkönigin?" },
          ],
          explain: "Richtig! Die Stute Nebelkönigin fand im Nebel allein nach Hause. Vor 100 Jahren war das Geisterpferd ein echtes Pferd. Und gestern Nacht hat Mats etwas Weißes auf vier Beinen gesehen …",
          clue: "nebelkoenigin",
        },
        {
          type: "story",
          id: "m6-foto",
          visual: { kind: "scene", scene: "lh-foto" },
          speaker: "erzaehler",
          text: "Zeit für das alte Foto aus der Sattelkammer. Früher klebte es in einem Album – die Tinte der Bildunterschrift hat spiegelverkehrt auf die Rückseite abgefärbt.",
        },
        {
          type: "choice",
          id: "m6-spiegel",
          prompt: "Lies die Rückseite! Die Schrift steht spiegelverkehrt. Tipp: Halte einen kleinen Spiegel neben das Bild – oder lies jedes Wort von rechts nach links. Was steht da?",
          visual: { kind: "scene", scene: "lh-foto" },
          layout: "list",
          options: [
            { id: "falsch1", label: "Flocke wird 6! Mit ihrer besten Freundin. Weihnachten auf dem Lindenhof.", feedback: "Schau noch einmal genau auf die Zahl und auf das letzte Wort der zweiten Zeile." },
            { id: "richtig", label: "Flocke wird 8! Mit ihrem besten Freund. Sommerfest auf dem Lindenhof.", correct: true },
            { id: "falsch2", label: "Flocke wird 8! Mit Luna. Sommerfest auf Hof Erlenbruch.", feedback: "Fast! Aber steht da wirklich „Luna“ und „Erlenbruch“?" },
          ],
          explain: "Richtig! „Flocke wird 8! Mit ihrem besten Freund. Sommerfest auf dem Lindenhof.“",
        },
        {
          type: "story",
          id: "m6-greta",
          speaker: "greta",
          text: "Oma Greta setzt die Brille auf. „Ach du liebe Zeit – das ist ja Flocke! Unser liebstes Schulpony, damals, als der Hof noch mir gehörte. Als wir die Reitschule verkleinern mussten, kam sie zum Hof Erlenbruch. Und der Mann neben ihr, das ist doch der …“ – „Stopp, Oma Greta!“, ruft Ben. „Nicht verraten. Das finden wir selbst heraus!“",
        },
        {
          type: "choice",
          id: "m6-alter",
          prompt: "Rechne! Am Schwarzen Brett steht: Flocke ist heute 24 Jahre alt. Auf dem Foto wird sie 8. Wie viele Jahre ist das Foto alt?",
          layout: "list",
          options: [
            { id: "8", label: "8 Jahre", feedback: "8 ist Flockes Alter auf dem Foto. Wie viele Jahre liegen zwischen 8 und 24?" },
            { id: "16", label: "16 Jahre", correct: true },
            { id: "32", label: "32 Jahre", feedback: "Nicht zusammenzählen – rechne 24 minus 8." },
          ],
          explain: "Genau: 24 minus 8 sind 16. Flockes bester Freund war also schon vor 16 Jahren auf dem Lindenhof.",
          clue: "foto-16",
        },
        {
          type: "choice",
          id: "m6-kennzeichen",
          prompt: "Sieh dir den Mann auf dem Foto genau an. Welche zwei Kennzeichen erkennst du wieder?",
          visual: { kind: "scene", scene: "lh-foto" },
          layout: "list",
          options: [
            { id: "hut", label: "Hut und Brille", feedback: "Der Mann trägt keine Brille. Was hat er auf dem Kopf – und hinter dem Ohr?" },
            { id: "muetze", label: "Schiebermütze und Bleistift hinter dem Ohr", correct: true },
            { id: "schal", label: "Pferdeschwanz und oranger Schal", feedback: "Schau auf den Kopf des Mannes: eine Mütze – und daneben?" },
          ],
          explain: "Richtig! Schiebermütze und dicker Bleistift hinter dem Ohr. Erinnert dich das an jemanden?",
          clue: "foto-wilhelm",
        },
        {
          type: "choice",
          id: "m6-frist",
          prompt: "Noch einmal das Schwarze Brett: Bis wann braucht Flocke ein neues Zuhause?",
          visual: { kind: "scene", scene: "lh-brett" },
          layout: "list",
          options: [
            { id: "woche", label: "bis nächste Woche", feedback: "Lies den Zettel „Zuhause gesucht“: Welches Datum steht da?" },
            { id: "heute", label: "bis 31. Oktober – also heute!", correct: true },
          ],
          explain: "Heute ist der 31. Oktober. Flocke braucht heute ein neues Zuhause!",
        },
      ],
    },

    /* ===================== Mission 7 ===================== */
    {
      id: "mitternacht",
      title: "Mitternacht",
      intro: "Mission 7: Mitternacht",
      steps: [
        {
          type: "story",
          id: "m7-start",
          visual: {
            kind: "doc",
            doc: {
              style: "typed",
              label: "Das letzte Rätsel",
              title: "Der nächtliche Besucher muss drei Prüfungen bestehen",
              lines: [
                "1 · Die Zeit: Er hat kein bewiesenes Alibi für 22:15 Uhr. Eine bloße Behauptung zählt nicht!",
                "2 · Der Hund: Als das Licht anging, blieb Bruno ganz ruhig.",
                "3 · Das Foto: Er war schon vor 16 Jahren auf dem Lindenhof.",
              ],
            },
          },
          speaker: "erzaehler",
          text: "Es ist kurz vor Mitternacht. Im Heu flüstern zwanzig Kinder, Kürbislichter flackern. Hanna sieht euch an: „Und? Was sage ich den Kindern?“ Jetzt wird kombiniert!",
        },
        {
          type: "choice",
          id: "m7-zeit",
          prompt: "Prüfung 1 – die Zeit: Wer hat für 22:15 Uhr KEIN bewiesenes Alibi?",
          layout: "list",
          options: [
            { id: "tm", label: "Tilda und Mats", feedback: "Tilda hat den Kassenbon, Mats die Trainerliste. Beide haben Beweise!" },
            { id: "wv", label: "Wilhelm und Herr Voss", correct: true },
            { id: "v", label: "nur Herr Voss", feedback: "Wilhelm sagt, er lag im Bett. Kann das jemand bezeugen?" },
          ],
          explain: "Richtig! Wilhelm lag angeblich im Bett, und Herrn Voss hat Oma Greta erst ab 22:20 gesehen. Beide haben nur eine Behauptung.",
        },
        {
          type: "choice",
          id: "m7-hund",
          prompt: "Prüfung 2 – der Hund: Als das Licht anging, blieb Bruno ganz ruhig. Bei wem von den beiden bleibt Bruno ruhig?",
          layout: "pictures",
          options: [
            { id: "wilhelm", label: "Wilhelm", visual: { kind: "person", person: "wilhelm" }, correct: true },
            { id: "voss", label: "Herr Voss", visual: { kind: "person", person: "voss" }, feedback: "Herr Voss hat selbst gesagt: „Ihr Hund hat mich angeknurrt. Wie immer.“" },
          ],
          explain: "Genau! Bruno bleibt nur bei Hanna, Oma Greta und Wilhelm still. Und Oma Greta hörte Hanna die ganze Nacht schnarchen.",
        },
        {
          type: "choice",
          id: "m7-foto",
          prompt: "Prüfung 3 – das Foto: Wer war vor 16 Jahren schon auf dem Lindenhof?",
          layout: "pictures",
          options: [
            { id: "wilhelm", label: "Wilhelm (seit 37 Jahren)", visual: { kind: "person", person: "wilhelm" }, correct: true },
            { id: "tilda", label: "Tilda (seit 3 Jahren)", visual: { kind: "person", person: "tilda" }, feedback: "Tilda ist erst seit 3 Jahren da." },
            { id: "mats", label: "Mats (seit 1 Jahr)", visual: { kind: "person", person: "mats" }, feedback: "Mats ist erst seit einem Jahr Stallhelfer." },
            { id: "voss", label: "Herr Voss (seit 7 Jahren)", visual: { kind: "person", person: "voss" }, feedback: "Herr Voss wohnt erst seit 7 Jahren nebenan." },
          ],
          explain: "Richtig! Nur Wilhelm besteht alle drei Prüfungen.",
        },
        {
          type: "choice",
          id: "m7-uhrzeit",
          prompt: "Der letzte Beweis: Wilhelm will geschlafen und nichts gehört haben. Welche Uhrzeit kennt er trotzdem auf die Minute genau?",
          layout: "list",
          options: [
            { id: "2215", label: "22:15 Uhr", feedback: "Lies seine Aussage noch einmal: Wann kam das Fahrrad?" },
            { id: "2240", label: "22:40 Uhr – zwanzig vor elf", correct: true },
            { id: "2300", label: "23:00 Uhr", feedback: "Wilhelm hat über das Fahrrad gesprochen. Wann kam es?" },
          ],
          explain: "Genau! Er war wach – und er war dabei.",
        },
        {
          type: "choice",
          id: "m7-geisterpferd",
          prompt: "Dein Ermittlungsbericht – leg dich fest, bevor du die Wahrheit erfährst: Was ist das Geisterpferd in Wirklichkeit?",
          layout: "list",
          options: [
            { id: "luna", label: "Luna, die Schimmelstute vom Lindenhof", feedback: "Lunas Huf ist 12 cm breit und hat Eisen. Der Abdruck war 9 cm, barhuf." },
            { id: "flocke", label: "Flocke, ein echtes weißes Pony – in Box C im Alten Stall", correct: true },
            { id: "kostuem", label: "Mats im Gespenster-Kostüm", feedback: "Das Kostüm ist noch eingeschweißt, und Mats war um 22:15 beim Training." },
          ],
          explain: "Das ist dein Ergebnis. Gleich wissen wir, ob es stimmt …",
        },
        {
          type: "choice",
          id: "m7-warum",
          prompt: "Und warum hat Wilhelm das heimlich getan? Was ist deine Vermutung?",
          layout: "list",
          options: [
            { id: "party", label: "Er wollte die Party verderben.", feedback: "Hat er etwas kaputt gemacht? Denk an das Datum auf dem Schwarzen Brett und an das alte Foto." },
            { id: "flocke", label: "Flocke brauchte bis heute ein neues Zuhause – und er kennt sie seit 16 Jahren.", correct: true },
            { id: "spass", label: "Er wollte alle erschrecken.", feedback: "Dann hätte er sich nicht versteckt. Was steht auf dem Zettel „Zuhause gesucht“?" },
          ],
          explain: "Eine gute Vermutung, die zu allen Beweisen passt. Zeit für die Auflösung!",
        },
        {
          type: "story",
          id: "m7-tuer",
          visual: { kind: "scene", scene: "lh-alter-stall" },
          speaker: "erzaehler",
          text: "Kurz vor Mitternacht steht ihr vor der Tür zum Alten Stall. Hinter euch drängeln sich zwanzig Kinder mit Kürbislaternen. Lea holt tief Luft: „Der nächtliche Besucher war Wilhelm.“ Alle drehen sich um. Der alte Stallmeister steht ganz hinten, die Mütze tief im Gesicht. Dann greift er in seine Westentasche – und zieht einen alten Schlüssel heraus.",
        },
        {
          type: "story",
          id: "m7-wilhelm",
          visual: { kind: "scene", scene: "lh-alter-stall" },
          speaker: "wilhelm",
          text: "Die Tür knarrt. In Box C steht ein kleines, schneeweißes Pony mit grünem Halfter und warmer Decke und kaut an einer Karotte. „Darf ich vorstellen“, brummt Wilhelm mit kratziger Stimme. „Das ist Flocke. Vor sechzehn Jahren war sie das beste Schulpony, das der Lindenhof je hatte. Bis heute brauchte sie ein neues Zuhause – sonst wäre sie zu fremden Leuten gekommen, weit weg. Ich wollte dich heute Abend fragen, Hanna. Ich habe mich nur … nicht getraut.“",
        },
        {
          type: "story",
          id: "m7-hanna",
          speaker: "hanna",
          text: "Hanna schaut das Pony an. Dann Wilhelm. Dann die zwanzig Kinder. „Wilhelm Brandt, du alter Brummbär. Ponys machen nur Arbeit – ja? Nächstes Mal fragst du einfach.“ Sie krault Flocke hinter den Ohren. „Ein Pony, das zwanzig Kinder so zum Strahlen bringt, schickt man nicht weg. Flocke bleibt!“",
        },
        {
          type: "story",
          id: "m7-moritz",
          speaker: "voss",
          visual: { kind: "item", name: "kater" },
          text: "Der Jubel ist so laut, dass draußen Bruno zu bellen anfängt. Herr Voss will schon schimpfen – da entdeckt er im Stroh seinen Kater. „Moritz! Hier steckst du also.“ Und zum ersten Mal an diesem Tag lächelt er.",
        },
        {
          type: "story",
          id: "m7-ende",
          speaker: "tilda",
          visual: { kind: "notebook" },
          text: "Die Kirchturmuhr schlägt zwölf. Tilda hebt ihre Laterne: „Um Mitternacht wird das Geheimnis gelüftet! Vor hundert Jahren war das Geisterpferd ein echtes weißes Pferd im Nebel. Und heute Nacht?“ Sie zwinkert euch zu. „Schon wieder. Ein guter Detektiv urteilt nach Beweisen – nicht nach dem ersten Eindruck.“",
        },
      ],
    },
  ],
};
