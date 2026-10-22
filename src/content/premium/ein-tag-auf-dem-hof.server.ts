import "server-only";
import { HT_SPOTS } from "@/components/illustrations/scenes/HofTag";
import type { Activity, Visual } from "@/engine/types";

/**
 * Premium-Hofspiel „Ein Tag auf dem Hof“ (Freitag, 20. November 2026).
 * Sechs Teile, jeder wird einzeln gespeichert (Fortschritt-ID `hoftag-<teil>`).
 *
 * Fachliche Leitplanken:
 *  – keine Futtermengen: Wie viel ein Pferd bekommt, legt der Stall fest
 *  – Pferde führen, rausbringen, festhalten: nur erfahrene Erwachsene
 *  – Ausmisten nur, wenn kein Pferd in der Box steht
 *  – Krümel bleibt außerhalb der Pferdebereiche
 * Fachliche Abnahme durch eine Reitlehrkraft: ausstehend (Status „Entwurf“).
 */

const item = (name: string): Visual => ({ kind: "item", name });
const scene = (name: string): Visual => ({ kind: "scene", scene: name });
const kid = (k: string): Visual => ({ kind: "kid", kid: k });
const S = HT_SPOTS.stallbox;
const W = HT_SPOTS.weide;

export const HOFTAG_PARTS = ["morgen", "versorgen", "stall", "weide", "pflege", "abend"] as const;
export type HoftagPart = (typeof HOFTAG_PARTS)[number];
export const hoftagId = (part: HoftagPart) => `hoftag-${part}`;

const morgen: Activity = {
  id: hoftagId("morgen"),
  title: "Guten Morgen!",
  intro: {
    leicht: "Guten Morgen! Heute hilfst du einen ganzen Tag auf dem Hof.",
    mittel: "Heute übernimmst du einen ganzen Tag Verantwortung auf dem Hof. Lea, Mila und Ben sind dabei.",
  },
  steps: [
    {
      type: "story",
      id: "ht-morgen-1",
      visual: scene("ht-morgen"),
      speaker: "erzaehler",
      text: {
        leicht: "Die Sonne geht auf. Krümel wedelt mit dem Schwanz und begrüßt dich am Hoftor.",
        mittel: "Die Sonne geht gerade auf, im Gras glitzert noch der Tau. Krümel kommt dir schwanzwedelnd entgegen und begrüßt dich am Hoftor. Aus dem Stall hörst du leises Schnauben.",
      },
    },
    {
      type: "story",
      id: "ht-morgen-2",
      visual: kid("lea"),
      speaker: "lea",
      text: {
        leicht: "Hallo! Tivoli, Scrabble und Tonga warten schon auf ihr Frühstück.",
        mittel: "Schön, dass du da bist! Tivoli, Scrabble und Tonga warten schon. Pferde mögen feste Zeiten – darum fängt ein Hoftag immer mit einem Blick in den Stall an.",
      },
    },
    {
      type: "choice",
      id: "ht-morgen-zuerst",
      prompt: { leicht: "Was machst du zuerst?", mittel: "Was ist am Morgen als Erstes dran?" },
      visual: scene("ht-morgen"),
      layout: "list",
      options: [
        { id: "schauen", label: "Nach den Pferden schauen: Geht es allen gut? Haben sie Wasser?", correct: true },
        {
          id: "reiten",
          label: "Gleich auf ein Pferd steigen",
          feedback: "Reiten ist später dran – und nur mit der Reitlehrerin. Zuerst werden die Pferde versorgt.",
        },
        {
          id: "rauslassen",
          label: "Alle Boxen öffnen und die Pferde rauslassen",
          feedback: "Pferde bringen nur erfahrene Erwachsene auf die Weide. Und erst einmal schauen wir, ob es allen gut geht.",
        },
        {
          id: "spielen",
          label: "Erst mal mit Krümel spielen",
          feedback: "Krümel freut sich – aber die Pferde warten. Zuerst kommen die Tiere im Stall dran.",
        },
      ],
      explain: {
        leicht: "Genau! Zuerst schaust du, ob es allen Pferden gut geht und ob sie Wasser haben.",
        mittel: "Richtig! Ein guter Hoftag beginnt mit dem Blick auf die Tiere: Sind alle munter? Haben alle frisches Wasser? Danach geht es ans Füttern.",
      },
    },
    {
      type: "story",
      id: "ht-morgen-3",
      visual: kid("ben"),
      speaker: "ben",
      text: {
        leicht: "Krümel bleibt draußen auf dem Hof. Im Stall ist es für ihn zu eng.",
        mittel: "Krümel wartet draußen auf dem Hof. Zwischen den Pferden ist kein Platz für einen kleinen Hund – ein Huf ist schnell aus Versehen auf einer Pfote.",
      },
    },
  ],
};

const versorgen: Activity = {
  id: hoftagId("versorgen"),
  title: "Pferde versorgen",
  intro: {
    leicht: "Jetzt bekommen die Pferde Wasser und Futter.",
    mittel: "Wasser kontrollieren, Futter vorbereiten, die Pferde beobachten – jetzt wird versorgt.",
  },
  steps: [
    {
      type: "hotspots",
      id: "ht-versorgen-traenke",
      scene: scene("ht-stallbox"),
      prompt: { leicht: "Wo trinkt das Pferd? Tippe auf die Tränke.", mittel: "Kontrolliere das Wasser: Wo ist die Tränke in der Box?" },
      mode: "collect",
      targets: [
        {
          id: "traenke",
          label: "Tränke",
          ...S.traenke,
          say: {
            leicht: "Da ist die Tränke. Das Wasser ist sauber. Prima!",
            mittel: "Gefunden! Die Tränke funktioniert und das Wasser ist sauber. Pferde brauchen jeden Tag viel frisches Wasser.",
          },
        },
      ],
      decoys: [{ id: "heu", label: "Heuraufe", ...S.heu, say: "Das ist die Heuraufe. Dort kommt das Heu hinein." }],
      missHint: "Die Tränke hängt an der Wand.",
    },
    {
      type: "choice",
      id: "ht-versorgen-trueb",
      prompt: {
        leicht: "In einem Eimer ist schmutziges Wasser. Was machst du?",
        mittel: "In Tongas Wassereimer schwimmen Heu und Schmutz. Was tust du?",
      },
      visual: item("wasser"),
      layout: "list",
      options: [
        { id: "bescheid", label: "Einem Erwachsenen Bescheid sagen und beim Saubermachen helfen", correct: true },
        { id: "lassen", label: "So lassen – Pferde trinken alles", feedback: "Pferde trinken schmutziges Wasser oft nicht gern. Dann trinken sie zu wenig." },
        { id: "zucker", label: "Etwas Zucker hineingeben", feedback: "Zucker gehört nicht ins Wasser. Pferde brauchen einfach sauberes, frisches Wasser." },
      ],
      explain: {
        leicht: "Richtig! Sauberes Wasser ist ganz wichtig.",
        mittel: "Richtig! Eimer und Tränken werden regelmäßig sauber gemacht. Sauberes Wasser trinken Pferde gern – und genug zu trinken ist für ihre Gesundheit sehr wichtig.",
      },
    },
    {
      type: "multi",
      id: "ht-versorgen-futter",
      prompt: {
        leicht: "Was dürfen Pferde fressen? Tippe alles an, was passt.",
        mittel: "Ben bereitet das Futter vor. Was ist für Pferde geeignet? Tippe alles an, was passt.",
      },
      options: [
        { id: "heu", label: "Heu", visual: item("heu"), correct: true },
        { id: "gras", label: "Gras auf der Weide", visual: item("gras"), correct: true },
        { id: "karotte", label: "Karotte als kleines Leckerli", visual: item("karotte"), correct: true },
        { id: "apfel", label: "Apfelstückchen als Leckerli", visual: item("apfel"), correct: true, levels: ["mittel"] },
        { id: "schokolade", label: "Schokolade", visual: item("schokolade"), feedback: "Schokolade ist für Pferde ungesund. Süßigkeiten sind nur etwas für Menschen." },
        { id: "kuchen", label: "Kuchen", visual: item("kuchen"), feedback: "Kuchen ist kein Pferdefutter – er kann Bauchweh machen." },
        {
          id: "rasenschnitt",
          label: "Rasenschnitt vom Mähen",
          visual: item("rasenschnitt"),
          feedback: "Rasenschnitt ist gefährlich! Er fängt im Bauch an zu gären und kann Pferde schwer krank machen.",
          levels: ["mittel"],
        },
      ],
      missing: { leicht: "Da fehlt noch etwas, das Pferde gern fressen.", mittel: "Es gibt noch mehr geeignetes Futter. Schau genau hin!" },
      explain: {
        leicht: "Super! Heu und Gras sind das wichtigste Futter. Karotten gibt es nur als kleines Leckerli.",
        mittel: "Super! Heu und Gras sind das Wichtigste für Pferde. Karotte oder Apfel gibt es nur in kleinen Stücken als Leckerli – und nur, wenn die Besitzer es erlauben.",
      },
    },
    {
      type: "story",
      id: "ht-versorgen-plan",
      visual: { kind: "doc", doc: { style: "lesson", label: "An der Boxentür", title: "Jedes Pferd hat seinen eigenen Futterplan", lines: ["Wie viel ein Pferd bekommt, legen die Erwachsenen im Stall fest.", "Jedes Pferd braucht etwas anderes."] } },
      speaker: "mila",
      text: {
        leicht: "Wie viel Futter ein Pferd bekommt, entscheiden die Erwachsenen. Jedes Pferd braucht etwas anderes.",
        mittel: "Schau mal: An jeder Box hängt ein Futterplan. Wie viel ein Pferd bekommt, hängt von Größe, Alter, Gesundheit und Arbeit ab – das legen die Erwachsenen im Stall fest. Wir halten uns genau daran.",
      },
    },
    {
      type: "choice",
      id: "ht-versorgen-beobachten",
      prompt: {
        leicht: "Ein Pferd frisst nicht und steht traurig in der Ecke. Was machst du?",
        mittel: "Alle fressen – nur Tonga lässt das Heu liegen und steht mit gesenktem Kopf in der Ecke. Was tust du?",
      },
      visual: { kind: "head", horse: "tonga", mood: "grummelig" },
      layout: "list",
      options: [
        { id: "bescheid", label: "Sofort einem Erwachsenen Bescheid sagen", correct: true },
        { id: "leckerli", label: "Viele Leckerlis geben, damit es frisst", feedback: "Leckerlis helfen nicht. Wenn ein Pferd nicht frisst, muss ein Erwachsener nachsehen." },
        { id: "spaeter", label: "Erst mal nichts tun – vielleicht wird es von allein besser", feedback: "Wenn ein Pferd nicht frisst, kann es krank sein. Dann gibst du sofort Bescheid." },
      ],
      explain: {
        leicht: "Richtig! Wenn ein Pferd anders ist als sonst, sagst du sofort einem Erwachsenen Bescheid.",
        mittel: "Richtig! Wer Pferde versorgt, beobachtet sie genau. Frisst ein Pferd nicht oder verhält sich anders als sonst, sagst du sofort Bescheid – manchmal muss dann die Tierärztin kommen.",
      },
    },
  ],
};

const stall: Activity = {
  id: hoftagId("stall"),
  title: "Stallarbeit",
  intro: {
    leicht: "Jetzt wird ausgemistet! Die Pferde sind so lange draußen.",
    mittel: "Zeit fürs Ausmisten. Die Reitlehrerin hat die Pferde vorher auf den Paddock gebracht – ausgemistet wird nur, wenn kein Pferd in der Box steht.",
  },
  steps: [
    {
      type: "story",
      id: "ht-stall-1",
      visual: kid("ben"),
      speaker: "ben",
      text: {
        leicht: "Die Box ist leer. Jetzt machen wir sie schön sauber.",
        mittel: "Die Box ist leer, die Pferde stehen draußen. Wir holen Mistgabel und Schubkarre. Eine saubere, trockene Box ist wichtig für gesunde Hufe und Atemwege.",
      },
    },
    {
      type: "hotspots",
      id: "ht-stall-suchen",
      scene: scene("ht-stallbox"),
      prompt: { leicht: "Wo ist die Box schmutzig? Tippe die Pferdeäpfel an.", mittel: "Wo muss ausgemistet werden? Finde alle schmutzigen und nassen Stellen." },
      mode: "collect",
      targets: [
        { id: "mist1", label: "Pferdeäpfel", ...S.mist1, say: "Pferdeäpfel! Die kommen in die Schubkarre." },
        { id: "mist2", label: "Pferdeäpfel", ...S.mist2, say: "Noch ein Haufen. Weg damit!" },
        { id: "mist3", label: "Pferdeäpfel", ...S.mist3, say: "Gut gesehen!" },
        {
          id: "nass",
          label: "Nasse Stelle",
          ...S.nass,
          say: "Hier ist das Stroh nass. Nasses Stroh wird auch herausgenommen – sonst riecht es scharf und schadet den Hufen.",
          levels: ["mittel"],
        },
      ],
      decoys: [
        { id: "sauber", label: "Sauberes Stroh", ...S.sauber, say: "Hier ist das Stroh sauber und trocken. Das darf liegen bleiben." },
        { id: "heu", label: "Heuraufe", ...S.heu, say: "Das ist die Heuraufe – kein Mist." },
      ],
      missHint: "Such nach dunklen Haufen im Stroh.",
    },
    {
      type: "match",
      id: "ht-stall-werkzeug",
      prompt: { leicht: "Was brauchst du wofür? Sortiere.", mittel: "Ordne das Arbeitsmaterial zu: Was brauchst du zum Ausmisten, was zum Putzen?" },
      targets: [
        { id: "misten", label: "Ausmisten", visual: item("mistgabel") },
        { id: "putzen", label: "Pferd putzen", visual: item("striegel") },
      ],
      items: [
        { id: "mistgabel", label: "Mistgabel", visual: item("mistgabel"), target: "misten", say: "Mit der Mistgabel holst du Mist und nasses Stroh heraus.", wrong: "Die Mistgabel ist zum Ausmisten." },
        { id: "schubkarre", label: "Schubkarre", visual: item("schubkarre"), target: "misten", say: "In der Schubkarre kommt der Mist auf den Misthaufen.", wrong: "Die Schubkarre braucht man beim Ausmisten." },
        { id: "besen", label: "Besen", visual: item("besen"), target: "misten", say: "Zum Schluss wird die Stallgasse gefegt.", wrong: "Mit dem Besen fegst du nach dem Ausmisten." },
        { id: "buerste", label: "Bürste", visual: item("buerste"), target: "putzen", say: "Die Bürste ist zum Putzen des Pferdes.", wrong: "Die Bürste ist zum Putzen des Pferdes." },
        { id: "hufkratzer", label: "Hufkratzer", visual: item("hufkratzer"), target: "putzen", say: "Der Hufkratzer gehört zum Putzzeug.", wrong: "Mit dem Hufkratzer werden Hufe sauber gemacht." },
      ],
    },
    {
      type: "choice",
      id: "ht-stall-einstreu",
      prompt: { leicht: "Was kommt jetzt neu in die Box?", mittel: "Der Mist ist draußen. Was ergänzt du jetzt?" },
      layout: "pictures",
      options: [
        { id: "stroh", label: "Frisches, trockenes Stroh", visual: item("stroh"), correct: true },
        { id: "heu", label: "Heu", visual: item("heu"), feedback: "Heu ist Futter. Als Bett kommt sauberes Stroh in die Box." },
        { id: "rasen", label: "Rasenschnitt", visual: item("rasenschnitt"), feedback: "Rasenschnitt gehört weder ins Futter noch in die Box." },
      ],
      explain: {
        leicht: "Genau! Frisches Stroh ist ein weiches, trockenes Bett.",
        mittel: "Genau! Frische, trockene Einstreu macht die Box gemütlich. Viele Ställe nehmen Stroh, manche auch Späne – wichtig ist, dass sie sauber und trocken ist.",
      },
    },
  ],
};

const weide: Activity = {
  id: hoftagId("weide"),
  title: "Auf die Weide",
  intro: {
    leicht: "Gleich dürfen die Pferde auf die Weide. Erst prüfen wir den Zaun.",
    mittel: "Bevor die Pferde auf die Weide dürfen, wird alles kontrolliert: Zaun, Tor und Wasser.",
  },
  steps: [
    {
      type: "story",
      id: "ht-weide-1",
      visual: kid("mila"),
      speaker: "mila",
      text: {
        leicht: "Die Pferde bringt nachher die Reitlehrerin. Wir prüfen zuerst den Zaun.",
        mittel: "Die Pferde führt nachher die Reitlehrerin auf die Weide. Ein Pferd führen nur erfahrene Erwachsene – oder Kinder, denen es jemand gezeigt hat und der dabei ist. Wir gehen jetzt am Zaun entlang.",
      },
    },
    {
      type: "hotspots",
      id: "ht-weide-zaun",
      scene: scene("ht-weide"),
      prompt: { leicht: "Was ist am Zaun nicht in Ordnung? Tippe es an.", mittel: "Kontrolliere Zaun und Tor. Was muss in Ordnung gebracht werden, bevor die Pferde kommen?" },
      mode: "collect",
      targets: [
        { id: "latte", label: "Gebrochene Zaunlatte", ...W.latte, say: "Die Latte ist gebrochen! Hier könnte ein Pferd hinaus oder sich verletzen." },
        { id: "tor", label: "Offenes Tor", ...W.tor, say: "Das Tor steht offen. Es muss zu sein, bevor die Pferde kommen." },
        { id: "tuete", label: "Plastiktüte im Zaun", ...W.tuete, say: "Eine Plastiktüte! Die kann Pferde erschrecken – und fressen dürfen sie sie auf keinen Fall.", levels: ["mittel"] },
      ],
      decoys: [
        { id: "wasser", label: "Wasserwanne", ...W.wasser, say: "Die Wasserwanne ist voll. Prima!" },
        { id: "baum", label: "Baum", ...W.baum, say: "Der Baum spendet Schatten. Der darf bleiben." },
      ],
      missHint: "Geh mit den Augen am Zaun entlang.",
    },
    {
      type: "choice",
      id: "ht-weide-reparieren",
      prompt: { leicht: "Die Zaunlatte ist kaputt. Was machst du?", mittel: "Du hast die gebrochene Latte gefunden. Was ist richtig?" },
      layout: "list",
      options: [
        { id: "zeigen", label: "Einem Erwachsenen zeigen, damit der Zaun repariert wird", correct: true },
        { id: "selbst", label: "Selbst mit Hammer und Nägeln reparieren", feedback: "Werkzeug und Zaun reparieren – das machen Erwachsene. Viele Weidezäune führen außerdem Strom." },
        { id: "egal", label: "Nichts – die Pferde merken das schon", feedback: "Pferde merken das leider nicht. Durch Lücken laufen sie weg oder verletzen sich." },
      ],
      explain: {
        leicht: "Richtig! Du zeigst es einem Erwachsenen.",
        mittel: "Richtig! Zaunschäden meldest du sofort. Erst wenn alles heil und das Tor zu ist, dürfen die Pferde auf die Weide.",
      },
    },
    {
      type: "choice",
      id: "ht-weide-fuehren",
      prompt: { leicht: "Wer bringt die Pferde auf die Weide?", mittel: "Wer führt die Pferde zur Weide?" },
      layout: "list",
      options: [
        { id: "erwachsen", label: "Die Reitlehrerin oder ein anderer erfahrener Erwachsener", correct: true },
        { id: "ich", label: "Ich ganz allein", feedback: "Pferde sind groß und stark. Allein führst du kein Pferd – nur mit Anleitung von einem Erwachsenen." },
        { id: "kruemel", label: "Krümel", feedback: "Krümel bleibt draußen auf dem Hof. Er hat bei den Pferden nichts zu suchen." },
      ],
      explain: {
        leicht: "Genau! Das macht ein Erwachsener.",
        mittel: "Genau! Du darfst zuschauen und Tore aufhalten, wenn man dich darum bittet. Führen übernimmt ein erfahrener Erwachsener.",
      },
    },
    {
      type: "choice",
      id: "ht-weide-verhalten",
      prompt: {
        leicht: "Ein Pferd hebt den Kopf hoch und spitzt die Ohren. Was ist los?",
        mittel: "Auf der Weide hebt Scrabble plötzlich den Kopf, die Ohren zeigen nach vorn und er schnaubt. Was bedeutet das?",
      },
      visual: { kind: "head", horse: "scrabble", mood: "aufgeregt" },
      layout: "list",
      options: [
        { id: "aufmerksam", label: "Er hat etwas entdeckt und passt genau auf", correct: true },
        { id: "muede", label: "Er ist müde und will schlafen", feedback: "Ein müdes Pferd lässt Kopf und Ohren hängen. Hoher Kopf und gespitzte Ohren heißen: Aufpassen!" },
        { id: "boese", label: "Er ist böse auf dich", feedback: "Böse wirkt ein Pferd mit angelegten Ohren. Gespitzte Ohren zeigen: Es ist aufmerksam." },
      ],
      explain: {
        leicht: "Richtig! Er passt auf. Du bleibst ruhig außerhalb der Weide.",
        mittel: "Richtig! Hoher Kopf und gespitzte Ohren heißen: Da ist etwas! Pferde sind Fluchttiere und schauen genau hin. Du bleibst ruhig außerhalb des Zauns und gibst ihm Zeit.",
      },
    },
  ],
};

const pflege: Activity = {
  id: hoftagId("pflege"),
  title: "Pferdepflege",
  intro: {
    leicht: "Tivoli kommt zum Putzen. Welche Bürste nimmst du?",
    mittel: "Tivoli kommt von der Weide und wird geputzt. Die Reitlehrerin hält ihn am Strick – du hilfst beim Putzen.",
  },
  steps: [
    {
      type: "story",
      id: "ht-pflege-1",
      visual: { kind: "horse", horse: "tivoli" },
      speaker: "lea",
      text: {
        leicht: "Tivoli ist schön staubig vom Wälzen. Er freut sich aufs Putzen.",
        mittel: "Tivoli hat sich auf der Weide gewälzt und ist ganz staubig. Er schnuppert neugierig an deiner Jacke. Beim Putzen schaust du, ob er Verletzungen hat – Putzen ist auch Gesundheitskontrolle.",
      },
    },
    {
      type: "choice",
      id: "ht-pflege-anfang",
      prompt: { leicht: "Womit fängst du an?", mittel: "Womit beginnst du, wenn das Fell sehr schmutzig ist?" },
      layout: "pictures",
      options: [
        { id: "striegel", label: "Striegel", visual: item("striegel"), correct: true },
        { id: "buerste", label: "Bürste", visual: item("buerste"), feedback: "Die Bürste kommt danach. Erst lockert der Striegel den Schmutz." },
        { id: "kamm", label: "Kamm", visual: item("kamm"), feedback: "Der Kamm ist für Mähne und Schweif. Fürs Fell nimmst du zuerst den Striegel." },
      ],
      explain: {
        leicht: "Richtig! Der Striegel löst den Schmutz.",
        mittel: "Richtig! Mit dem Gummistriegel lockerst du in kreisenden Bewegungen Schmutz und lose Haare. Danach bürstest du alles in Wuchsrichtung heraus.",
      },
    },
    {
      type: "match",
      id: "ht-pflege-zuordnen",
      prompt: { leicht: "Wofür ist was? Sortiere das Putzzeug.", mittel: "Wofür brauchst du welches Putzzeug? Ordne zu." },
      targets: [
        { id: "fell", label: "Fell", visual: item("fell") },
        { id: "hufe", label: "Hufe", visual: item("huf") },
        { id: "maehne", label: "Mähne & Schweif", visual: item("maehne") },
      ],
      items: [
        { id: "striegel", label: "Striegel", visual: item("striegel"), target: "fell", say: "Der Striegel löst Schmutz aus dem Fell.", wrong: "Der Striegel ist fürs Fell." },
        { id: "buerste", label: "Bürste", visual: item("buerste"), target: "fell", say: "Die Bürste streicht den Staub aus dem Fell.", wrong: "Die Bürste ist fürs Fell." },
        {
          id: "hufkratzer",
          label: "Hufkratzer",
          visual: item("hufkratzer"),
          target: "hufe",
          say: "Mit dem Hufkratzer kommen Steinchen und Mist aus dem Huf – so, wie es dir ein Erwachsener zeigt.",
          wrong: "Der Hufkratzer ist für die Hufe.",
        },
        { id: "kamm", label: "Kamm", visual: item("kamm"), target: "maehne", say: "Mähne und Schweif werden vorsichtig entwirrt.", wrong: "Der Kamm ist für Mähne und Schweif." },
      ],
    },
    {
      type: "choice",
      id: "ht-pflege-stehen",
      prompt: { leicht: "Wo stehst du beim Putzen?", mittel: "Wo stehst du, wenn du Tivoli putzt?" },
      layout: "list",
      options: [
        { id: "seite", label: "Seitlich neben dem Pferd, nah an der Schulter", correct: true },
        { id: "hinten", label: "Direkt hinter dem Pferd", feedback: "Hinter dem Pferd sieht es dich nicht. Erschrickt es, kann es ausschlagen." },
        { id: "unten", label: "Unter dem Bauch des Pferdes", feedback: "Unter dem Pferd ist es gefährlich. Du bleibst immer seitlich neben ihm." },
      ],
      explain: {
        leicht: "Richtig! Neben der Schulter sieht dich das Pferd gut.",
        mittel: "Richtig! Du stehst seitlich nah am Pferd und sprichst ruhig mit ihm. So weiß es immer, wo du bist.",
      },
    },
  ],
};

const abend: Activity = {
  id: hoftagId("abend"),
  title: "Der Abend",
  intro: {
    leicht: "Der Tag ist fast vorbei. Wir schauen, ob alle gut versorgt sind.",
    mittel: "Die Sonne geht unter. Zeit für den Abendrundgang: Sind alle Tiere gut versorgt?",
  },
  steps: [
    {
      type: "story",
      id: "ht-abend-1",
      visual: scene("ht-abend"),
      speaker: "ben",
      text: {
        leicht: "Die Pferde sind zurück im Stall. Krümel ist schon ganz müde.",
        mittel: "Die Pferde sind zurück in ihren Boxen, die Stalllaterne brennt. Krümel gähnt. Jetzt kommt der letzte, wichtige Rundgang.",
      },
    },
    {
      type: "multi",
      id: "ht-abend-rundgang",
      prompt: { leicht: "Was prüfst du am Abend? Tippe alles an, was stimmt.", mittel: "Was gehört zum Abendrundgang? Tippe alles an, was du prüfst." },
      options: [
        { id: "wasser", label: "Alle Pferde haben Wasser", visual: item("wasser"), correct: true },
        { id: "heu", label: "Alle Pferde haben ihr Heu", visual: item("heu"), correct: true },
        { id: "tueren", label: "Alle Boxentüren sind zu", visual: item("tuer"), correct: true },
        { id: "munter", label: "Alle Pferde wirken munter", visual: { kind: "head", horse: "tivoli", mood: "entspannt" }, correct: true, levels: ["mittel"] },
        { id: "kuchen", label: "Allen schnell noch Kuchen geben", visual: item("kuchen"), feedback: "Kuchen ist kein Pferdefutter. Die Pferde haben ihr Abendheu." },
        { id: "tor", label: "Das Weidetor offen lassen", visual: item("tor"), feedback: "Das Weidetor muss immer zu sein." },
      ],
      missing: { leicht: "Da fehlt noch etwas Wichtiges.", mittel: "Beim Rundgang prüfst du noch mehr. Schau noch einmal!" },
      explain: {
        leicht: "Super! Alle Pferde haben Wasser und Heu, und alle Türen sind zu.",
        mittel: "Super! Wasser, Heu, geschlossene Türen und ein letzter Blick auf jedes Pferd – so gehen alle gut versorgt in die Nacht.",
      },
    },
    {
      type: "story",
      id: "ht-abend-ende",
      visual: { kind: "puppy", pose: "sleep" },
      speaker: "lea",
      text: {
        leicht: "Gute Nacht, Tivoli! Gute Nacht, Scrabble! Gute Nacht, Tonga! Du hast toll geholfen.",
        mittel: "Gute Nacht, Tivoli, Scrabble und Tonga! Du hast heute an alles gedacht: Wasser, Futter, Stall, Weide und Pflege. Genau so sieht Verantwortung auf einem Hof aus.",
      },
    },
  ],
};

export const hoftagParts: Record<HoftagPart, Activity> = { morgen, versorgen, stall, weide, pflege, abend };
