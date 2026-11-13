import "server-only";
import { item, no, ok } from "../../build";
import type { deepLessonsOf } from "../../types";

type Input = Parameters<typeof deepLessonsOf>[1][number];

const tabelle = (label: string, title: string, table: string[][]) => ({ kind: "doc" as const, doc: { style: "lesson" as const, label, title, lines: [], table } });

/** Modul 10, Lektionen 6–9 */
export const teil2: Input[] = [
  /* ---------- 6. Raufutterqualität ---------- */
  {
    slug: "raufutter-qualitaet",
    title: "Heu, Heulage, Gras und Raufutterqualität",
    speaker: "lea",
    intro:
      "„Das Heu ist schön grün, das muss gut sein!“ Ein verbreiteter Irrtum: Die Farbe sagt wenig darüber, ob Heu hygienisch einwandfrei ist und wie viel Energie es liefert. Worauf kommt es wirklich an?",
    illustration: tabelle("Trockensubstanz", "Wie viel Wasser steckt im Raufutter?", [
      ["Futter", "Trockensubstanz (TS) ca.", "Wasser ca."],
      ["Gras (frisch)", "15–30 %", "70–85 %"],
      ["Heulage", "50–70 %", "30–50 %"],
      ["Heu", "über 85 %", "unter 15 %"],
      ["Stroh", "über 85 %", "unter 15 %"],
    ]),
    terms: [
      { term: "Trockensubstanz (TS)", meaning: "Alles, was vom Futter übrig bleibt, wenn man das Wasser entfernt. Nährstoffe werden meist je kg TS angegeben." },
      { term: "Heulage", meaning: "Angewelktes Gras, luftdicht in Folie gepresst und milchsauer konserviert." },
      { term: "Schnittzeitpunkt", meaning: "Wachstumsstadium beim Mähen. Früh geschnitten: energie- und eiweißreicher; spät geschnitten: faserreicher." },
      { term: "Botulismus", meaning: "Lebensgefährliche Vergiftung durch Gifte des Bakteriums Clostridium botulinum, z. B. aus verdorbener Heulage." },
    ],
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Die Raufutterarten",
          text: "Gras ist das natürliche Futter des Pferdes. Es enthält viel Wasser, ist im Frühjahr energie- und zuckerreich und wird mit zunehmendem Alter faserreicher.\n\nHeu ist getrocknetes Gras mit über 85 % Trockensubstanz. Es ist lagerfähig, wenn es trocken eingebracht wurde, und sollte nach der Ernte einige Wochen „ausschwitzen“, bevor es verfüttert wird.\n\nHeulage ist angewelktes Gras mit meist 50 bis 70 % Trockensubstanz, das luftdicht in Folie gepresst wird. Milchsäurebakterien konservieren es. Heulage staubt kaum, ist aber empfindlicher: Ist die Folie beschädigt, kommt Luft an das Futter und es kann schimmeln oder verderben. Silage mit noch weniger Trockensubstanz ist für Pferde meist ungeeignet.\n\nStroh ist energiearm und sehr faserreich. Es kann einen Teil des Raufutters ersetzen – nach einem Positionspapier der Universität Leipzig bis zu 30 bis 40 % – und eignet sich besonders für leichtfuttrige Pferde.",
        },
        {
          heading: "Schnittzeitpunkt: der unterschätzte Faktor",
          text: "Wann gemäht wurde, bestimmt den Nährwert stark. Früh geschnittenes, blattreiches Gras liefert mehr Energie, Eiweiß und Zucker. Gras, das erst nach der Blüte gemäht wird, ist stängelreicher, faserreicher und energieärmer.\n\nFür ein Sportpferd oder einen Senior, der schlecht zunimmt, kann ein früher Schnitt passen. Für die vielen leichtfuttrigen Freizeitpferde und Ponys ist ein strukturreiches, später geschnittenes Heu oft die bessere Wahl. Ob das Heu vom ersten oder zweiten Schnitt stammt, sagt allein noch wenig – entscheidend ist das Stadium der Pflanzen beim Mähen.\n\nWer es genau wissen will, lässt eine Futteranalyse in einem Labor machen. Sie zeigt Energie, Eiweiß, Zucker, Mineralstoffe und auf Wunsch die Hygiene. Für Pferde mit Stoffwechselproblemen ist sie besonders wertvoll.",
        },
        {
          heading: "Heu mit allen Sinnen prüfen",
          text: "Auch ohne Labor kannst du viel erkennen:\n\n• Geruch: aromatisch und angenehm. Muffig, modrig, faulig oder säuerlich: nicht verfüttern.\n• Farbe: grünlich bis gelblich-braun ist normal. Grau, weißlich oder schwarz gefleckt deutet auf Schimmel.\n• Griff: trocken und elastisch. Klamm, feucht, warm oder verklebt: Warnzeichen.\n• Staub: Eine Handvoll vor einem hellen Hintergrund oder gegen das Licht ausschütteln. Starke Staubwolken belasten die Atemwege.\n• Fremdbestandteile: Erde, Steine, Giftpflanzen wie Jakobskreuzkraut oder Herbstzeitlose, Tierkadaver.\n\nSchimmel tritt oft nesterweise auf. Ein Ballen kann außen gut aussehen und innen verdorben sein. Verdächtige Stellen großzügig entsorgen – im Zweifel den ganzen Ballen.",
        },
        {
          heading: "Heulage richtig beurteilen und lagern",
          text: "Gute Heulage riecht angenehm säuerlich-aromatisch, ähnlich wie Sauerkraut oder Brot. Stechend, nach Buttersäure (wie ranzige Butter) oder faulig riechende Heulage gehört nicht in den Trog. Schimmelnester, warme Stellen und Erde im Ballen sind ebenfalls Ausschlussgründe.\n\nDie Folie muss unbeschädigt sein; Ballen werden so gelagert, dass Vögel und Nager sie nicht anpicken. Ein geöffneter Ballen sollte rasch verfüttert werden – je wärmer es ist, desto schneller, weil Luft Nachgärung und Schimmel fördert.\n\nEin seltenes, aber ernstes Risiko ist Botulismus. Er kann entstehen, wenn Erde oder Tierkadaver in die Heulage gelangen. Deshalb: verdächtige Ballen nicht „ausnahmsweise“ verfüttern.",
        },
        {
          heading: "Wässern und Bedampfen",
          text: "Bei Pferden mit Atemwegsproblemen wird Heu oft gewässert oder bedampft. Wässern bindet Staub und senkt den Gehalt an wasserlöslichem Zucker – das kann für Pferde mit Stoffwechselproblemen gewollt sein. Gleichzeitig werden Mineralstoffe ausgewaschen, und nasses Heu verdirbt bei Wärme schnell; es sollte zeitnah gefüttert werden.\n\nBedampfen mit heißem Dampf reduziert Staub und Keime deutlich, ist aber aufwendiger. Ob und wie Heu für ein bestimmtes Pferd behandelt werden sollte, besprichst du am besten mit der Tierärztin oder dem Tierarzt.",
        },
      ],
      praxis: {
        title: "Die neue Heulieferung",
        text: "Im Herbst kommt eine neue Heulieferung auf den Hof. Hanna öffnet drei Ballen an verschiedenen Stellen des Stapels. Zwei riechen aromatisch und sind kaum staubig. Im dritten findet sie in der Mitte eine graue, verklebte Stelle mit muffigem Geruch.\n\nSie sortiert den Ballen aus, prüft die benachbarten Ballen besonders sorgfältig und spricht mit dem Lieferanten. Weil zwei Pferde im Stall zu Husten neigen, lässt sie außerdem eine Probe im Labor auf Nährwert und Hygiene untersuchen. Das Ergebnis: energiearm, aber hygienisch einwandfrei – passend für die leichtfuttrigen Ponys, für den älteren Wallach wird zusätzlich ein energiereicheres Raufutter eingeplant.",
      },
      fehler: [
        { fehler: "Heu nur nach der Farbe beurteilen.", besser: "Geruch, Griff, Staub und Fremdbestandteile prüfen; bei Bedarf Laboranalyse." },
        { fehler: "Verschimmelte Stellen herausschütteln und den Rest füttern.", besser: "Verdächtige Ballen großzügig aussortieren." },
        { fehler: "Einen geöffneten Heulageballen im Sommer eine Woche lang verfüttern.", besser: "Ballengröße an den Verbrauch anpassen und zügig verfüttern." },
        { fehler: "Frisch geerntetes Heu sofort füttern.", besser: "Heu einige Wochen ausschwitzen lassen." },
      ],
      richtig: [
        "Öffne neue Ballen an mehreren Stellen und prüfe Geruch, Griff, Farbe und Staub.",
        "Kontrolliere Heulageballen auf Folienschäden, Geruch und warme Stellen.",
        "Lagere Raufutter trocken, gut belüftet und vor Nagern geschützt.",
        "Lass bei neuen Lieferungen oder empfindlichen Pferden eine Futteranalyse machen.",
        "Wähle die Qualität passend zum Pferd: strukturreich für Leichtfuttrige, energiereicher für Pferde mit hohem Bedarf.",
      ],
      merke: [
        "Heu über 85 % TS, Heulage meist 50–70 % TS, Gras deutlich weniger.",
        "Der Schnittzeitpunkt bestimmt den Nährwert stärker als die Farbe.",
        "Muffig, schimmelig, staubig oder faulig: nicht verfüttern.",
        "Heulage nach dem Öffnen zügig verbrauchen.",
      ],
      weiter: [
        { lesson: "ra-w15-l7", label: "Wie viel Futter braucht mein Pferd wirklich?" },
        { lesson: "ra-w15-l10", label: "Weidehaltung, Anweiden und Giftpflanzen" },
      ],
      pruefen: "TS-Bereiche; Strohanteil 30–40 % (Positionspapier Uni Leipzig); Aussagen zu Botulismus, Wässern und Bedampfen.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l6-entscheidung",
        prompt: "Du öffnest einen Heuballen. Außen ist er grün und duftet, innen findest du eine graue, verklebte Stelle mit muffigem Geruch. Was tust du?",
        options: [
          ok("aussortieren", "Den Ballen aussortieren und die benachbarten Ballen besonders gründlich prüfen"),
          no("ausschuetteln", "Die graue Stelle herausnehmen und den Rest füttern", "Schimmel ist oft weiter verteilt, als man sieht. Sporen belasten Atemwege und Verdauung."),
          no("waessern", "Den Ballen wässern, dann ist der Schimmel unschädlich", "Wässern macht verschimmeltes Heu nicht sicher."),
        ],
        explain: "Richtig. Bei Schimmel lieber zu viel als zu wenig aussortieren.",
      },
    ],
    quiz: [
      {
        id: "ts",
        prompt: "Welches Raufutter hat den höchsten Wassergehalt?",
        options: [ok("gras", "Frisches Gras"), no("heu", "Heu", "Heu ist getrocknet und enthält weniger als 15 % Wasser."), no("heulage", "Heulage", "Heulage enthält mehr Wasser als Heu, aber weniger als frisches Gras.")],
        explain: "Genau. Frisches Gras besteht zu etwa 70–85 % aus Wasser.",
      },
      {
        id: "schnitt",
        prompt: "Welches Heu passt meist besser zu einem leichtfuttrigen Freizeitpony?",
        options: [
          ok("spaet", "Strukturreiches, später geschnittenes Heu"),
          no("frueh", "Sehr früh geschnittenes, blattreiches Heu", "Das liefert viel Energie und Zucker – für leichtfuttrige Ponys oft zu viel."),
          no("egal", "Das ist egal, Heu ist Heu", "Der Schnittzeitpunkt verändert den Nährwert erheblich."),
        ],
        explain: "Richtig. Viel Kauzeit, wenig Energie – genau das brauchen Leichtfuttrige.",
      },
      {
        id: "heulage",
        prompt: "Wie riecht gute Heulage?",
        options: [
          ok("saeuerlich", "Angenehm säuerlich-aromatisch"),
          no("butter", "Nach ranziger Butter", "Das deutet auf Buttersäuregärung hin – nicht verfüttern."),
          no("muffig", "Muffig wie ein alter Keller", "Muffiger Geruch ist ein Schimmel-Warnzeichen."),
        ],
        explain: "Genau. Säuerlich-aromatisch ist normal für milchsauer konservierte Heulage.",
      },
      {
        id: "stroh",
        prompt: "Welche Aussage über Stroh stimmt?",
        options: [
          ok("anteil", "Es kann einen Teil des Raufutters ersetzen und verlängert die Kauzeit bei wenig Energie"),
          no("alles", "Stroh kann Heu vollständig ersetzen", "Stroh allein liefert zu wenig Eiweiß und Nährstoffe."),
          no("gefaehrlich", "Stroh ist für Pferde ungeeignet", "Sauberes Stroh ist ein wertvolles Raufutter in Maßen."),
        ],
        explain: "Richtig – in Maßen, etwa bis zu einem Drittel des Raufutters.",
      },
    ],
  },

  /* ---------- 7. Futtermenge ---------- */
  {
    slug: "wie-viel-futter",
    title: "Wie viel Futter braucht mein Pferd wirklich?",
    speaker: "mila",
    intro:
      "„Mein Pony ist zu dick, ich gebe ihm nur noch morgens und abends ein bisschen Heu.“ Klingt logisch – ist aber gefährlich. Wie viel Raufutter braucht ein Pferd mindestens, und wie rechnet man das aus?",
    illustration: tabelle("Faustwerte", "Raufutter je 100 kg Körpermasse und Tag", [
      ["", "Mindestens ca."],
      ["Trockensubstanz", "1,5 kg TS"],
      ["als Heu", "1,7 kg"],
      ["als Heulage", "ca. 2 kg"],
    ]),
    terms: [
      { term: "Frischmasse (FM)", meaning: "Das Futter so, wie es auf der Waage liegt – mit Wasser." },
      { term: "Trockenmasse / Trockensubstanz (TS)", meaning: "Das Futter ohne Wasser. Darin stecken alle Nährstoffe." },
      { term: "Body Condition Score (BCS)", meaning: "Punkteskala zur Beurteilung der Fettreserven, häufig von 1 (sehr mager) bis 9 (fettleibig)." },
      { term: "Leichtfuttrig", meaning: "Pferd, das mit wenig Energie sein Gewicht hält oder schnell zunimmt." },
    ],
    deep: {
      minutes: 12,
      sections: [
        {
          heading: "Erst das Gewicht, dann die Menge",
          text: "Jede Futterberechnung beginnt mit dem Körpergewicht. Am genauesten ist eine Pferdewaage. Ohne Waage helfen ein Gewichtsmaßband (um den Rumpf direkt hinter dem Widerrist) oder eine Schätzformel aus Brustumfang und Rumpflänge:\n\nGewicht (kg) ≈ Brustumfang² (cm) × Rumpflänge (cm) ÷ 11 880\n\nDie Rumpflänge misst man vom Buggelenk bis zum Sitzbeinhöcker. Beispiel: 190 cm Brustumfang und 165 cm Rumpflänge ergeben 190 × 190 × 165 ÷ 11 880 ≈ 501 kg. Solche Formeln können um mehrere Prozent danebenliegen – für den Vergleich über die Zeit sind sie trotzdem sehr nützlich, wenn immer gleich gemessen wird.\n\nGenauso wichtig wie das Gewicht ist die Figur. Mit dem Body Condition Score tastest du Rippen, Mähnenkamm, Widerrist, Bereich hinter der Schulter, Lende und Schweifansatz ab. Rippen sollten fühlbar, aber nicht sichtbar sein.",
        },
        {
          heading: "Frischmasse und Trockenmasse",
          text: "Ein Kilogramm Gras ist nicht dasselbe wie ein Kilogramm Heu. Gras besteht größtenteils aus Wasser, Heu kaum. Die Nährstoffe – Energie, Eiweiß, Faser, Mineralstoffe – stecken in der Trockensubstanz (TS).\n\nDarum rechnet man in der Fütterung mit TS und rechnet am Ende in die Frischmasse (FM) um, die du tatsächlich abwiegst:\n\nFrischmasse = Trockensubstanz ÷ TS-Gehalt\n\nUngefähre TS-Gehalte: Heu 0,86 (86 %), Heulage 0,5 bis 0,7, Gras 0,15 bis 0,3. Den genauen Wert für deine Heulage findest du in einer Futteranalyse oder beim Lieferanten.",
        },
        {
          heading: "Die Mindestmenge",
          text: "Pferde sollten täglich mindestens rund 1,5 kg Raufutter-Trockensubstanz je 100 kg Körpermasse bekommen. Das entspricht etwa 1,7 kg Heu oder rund 2 kg Heulage je 100 kg Körpermasse (Positionspapier Raufutter, Universität Leipzig). Dazu kommt die Regel, dass Fresspausen nicht länger als etwa vier Stunden sein sollen.\n\nDiese Mindestmenge gilt auch für zu dicke Pferde. Wer abnehmen soll, bekommt nicht weniger Raufutter, sondern energieärmeres: später geschnittenes Heu, ein Strohanteil, keine zusätzlichen Zuckerquellen, mehr Bewegung. Zu wenig Raufutter erhöht das Risiko für Magengeschwüre, Verhaltensprobleme und – besonders bei Ponys – Stoffwechselentgleisungen.",
        },
        {
          heading: "Rechenbeispiel 1: Warmblutstute, 600 kg",
          text: "Normale Figur, Freizeitreiten an vier Tagen pro Woche.\n\nMindestmenge TS: 6 × 1,5 kg = 9 kg TS pro Tag.\n\n• Als Heu (86 % TS): 9 ÷ 0,86 ≈ 10,5 kg Heu\n• Als Heulage (60 % TS): 9 ÷ 0,6 = 15 kg Heulage\n• Als Weidegras (20 % TS): 9 ÷ 0,2 = 45 kg Gras\n\nSo wird klar, warum 10 kg Heulage nicht dasselbe sind wie 10 kg Heu: Die Stute bekäme damit nur 6 kg TS – deutlich zu wenig. Viele Freizeitpferde dieser Größe fressen mehr als die Mindestmenge. Ob die Menge passt, zeigt die regelmäßige Kontrolle von Gewicht und Figur.",
        },
        {
          heading: "Rechenbeispiel 2: Pony, 300 kg, zu dick",
          text: "BCS 7 von 9, leichtfuttrig, wird kaum geritten.\n\nMindestmenge TS: 3 × 1,5 kg = 4,5 kg TS pro Tag – auch für dieses Pony.\n\nEine mögliche Aufteilung: etwa ein Drittel Stroh, zwei Drittel energiearmes Heu.\n• Stroh: 1,5 kg TS ÷ 0,88 ≈ 1,7 kg Stroh\n• Heu: 3 kg TS ÷ 0,86 ≈ 3,5 kg Heu\n\nVerteilt wird über viele Portionen oder aus engmaschigen Netzen, damit die Kauzeit lang bleibt. Abnehmen soll das Pony durch weniger Energie im Futter und mehr Bewegung – nicht durch Hungern.\n\nWichtig: Das ist ein Lernbeispiel. Bei Übergewicht, Hufrehe-Vorgeschichte oder Stoffwechselerkrankungen gehört der Futterplan in die Hände von Tierärztin oder Fütterungsberatung.",
        },
        {
          heading: "Was den Bedarf verändert",
          text: "Die Mindestmenge ist eine Untergrenze. Wie viel und welches Futter ein Pferd tatsächlich braucht, hängt ab von:\n\n• Gewicht und Figur – das Ziel ist ein gesunder BCS.\n• Arbeitsleistung – mit mehr Training steigt vor allem der Energiebedarf. Zuerst mehr oder energiereicheres Raufutter, erst dann Kraftfutter.\n• Alter – Jungpferde wachsen, Senioren kauen und verwerten oft schlechter.\n• Typ – Ponys und Robustrassen sind meist leichtfuttrig, manche Vollblüter schwerfuttrig.\n• Gesundheit – Zahnprobleme, Magengeschwüre, Stoffwechselerkrankungen wie EMS oder PPID verändern die Fütterung grundlegend.\n• Futterqualität – zwei Heupartien können sich in Energie und Zucker stark unterscheiden.\n• Klima und Haltung – Kälte, Nässe und Wind erhöhen den Energiebedarf.\n• Trächtigkeit und Laktation erhöhen den Bedarf deutlich.",
        },
      ],
      praxis: {
        title: "Wiegetag am Hof",
        text: "Einmal im Monat ist Wiegetag: Mats misst bei allen Schulpferden Brustumfang und Rumpflänge immer an derselben Stelle, schätzt den Body Condition Score und trägt alles in eine Liste ein. Bei Tivoli fällt auf, dass er seit dem Sommer um etwa 25 kg zugelegt hat und der Mähnenkamm fester geworden ist.\n\nStatt ihm einfach Heu zu streichen, ersetzt Mats einen Teil des Heus durch Stroh, gibt das Abendheu ins engmaschige Netz und plant mehr Schrittarbeit im Gelände ein. Weil Tivoli einen harten Mähnenkamm hat, lässt Hanna außerdem die Tierärztin draufschauen – ein fester Mähnenkamm kann auf eine Stoffwechselstörung hinweisen.",
      },
      fehler: [
        { fehler: "Ein dickes Pferd auf „Diät“ setzen, indem man das Heu stark kürzt.", besser: "Mindestmenge Raufutter halten, Energie über Futterwahl und Bewegung senken." },
        { fehler: "Heulage in denselben Kilogramm füttern wie vorher Heu.", besser: "Über die Trockensubstanz umrechnen – Heulage braucht mehr Frischmasse." },
        { fehler: "Futter mit dem Auge abmessen.", besser: "Heu regelmäßig wiegen, zum Beispiel mit einer Hängewaage." },
        { fehler: "Bei mehr Training sofort Kraftfutter erhöhen.", besser: "Zuerst prüfen, ob mehr oder energiereicheres Raufutter reicht." },
      ],
      richtig: [
        "Bestimme das Gewicht (Waage, Maßband oder Formel) und den Body Condition Score.",
        "Berechne die Mindestmenge: Gewicht in 100 kg × 1,5 kg TS.",
        "Rechne mit dem TS-Gehalt deines Raufutters in Frischmasse um.",
        "Wiege die Rationen einige Tage lang ab, um ein Gefühl für die Menge zu bekommen.",
        "Kontrolliere Gewicht und Figur alle zwei bis vier Wochen und passe die Futterwahl an.",
        "Hol dir bei Erkrankungen oder starkem Über- oder Untergewicht fachliche Beratung.",
      ],
      merke: [
        "Mindestens rund 1,5 kg Raufutter-TS je 100 kg Körpermasse pro Tag – auch für dicke Pferde.",
        "Frischmasse = Trockensubstanz ÷ TS-Gehalt.",
        "Abnehmen über energieärmeres Raufutter und Bewegung, nicht über Hungern.",
        "Gewicht und Figur regelmäßig kontrollieren und dokumentieren.",
      ],
      weiter: [
        { lesson: "ra-w15-l6", label: "Heu, Heulage, Gras und Raufutterqualität" },
        { lesson: "ra-w15-l8", label: "Kraftfutter, Mineralfutter und Ergänzungsfutter" },
        { lesson: "ra-w16-l18", label: "Gesundheitsvorsorge: Gewicht und Figur im Jahresplan" },
      ],
      pruefen: "Mindestmenge 1,5 kg TS / 1,7 kg Heu / ca. 2 kg Heulage je 100 kg KM (Positionspapier Uni Leipzig); Schätzformel (Divisor 11 880, Einheiten cm); Rechenbeispiele; Hinweis fester Mähnenkamm.",
    },
    exercise: [
      { type: "tool", id: "ra-w15-l7-rechner", tool: "fuetterungsrechner", prompt: "Probier es aus: Stell Gewicht und Raufutter ein und sieh, wie sich die Menge in Frischmasse verändert." },
      {
        type: "choice",
        id: "ra-w15-l7-entscheidung",
        prompt: "Ein Pferd wiegt 500 kg. Es bekommt Heulage mit 65 % TS. Wie viel Heulage (Frischmasse) braucht es mindestens, um auf 1,5 kg TS je 100 kg zu kommen?",
        options: [
          ok("11-5", "Etwa 11,5 kg Heulage"),
          no("7-5", "7,5 kg Heulage", "7,5 kg ist die nötige Trockensubstanz. In Heulage steckt aber Wasser: 7,5 ÷ 0,65 ≈ 11,5 kg."),
          no("4-9", "Etwa 4,9 kg Heulage", "Hier wurde multipliziert statt geteilt. Frischmasse = TS ÷ TS-Gehalt."),
          no("20", "20 kg Heulage", "Das wäre deutlich mehr als die Mindestmenge."),
        ],
        explain: "Richtig: 5 × 1,5 kg = 7,5 kg TS. 7,5 ÷ 0,65 ≈ 11,5 kg Heulage.",
      },
    ],
    quiz: [
      {
        id: "mindest",
        prompt: "Wie viel Raufutter-Trockensubstanz sollte ein Pferd mindestens pro Tag bekommen?",
        options: [
          ok("15", "Rund 1,5 kg je 100 kg Körpermasse"),
          no("05", "Rund 0,5 kg je 100 kg Körpermasse", "Das ist viel zu wenig und gefährdet Magen und Darm."),
          no("5", "Rund 5 kg je 100 kg Körpermasse", "So viel kann ein Pferd gar nicht fressen."),
        ],
        explain: "Genau. Das sind etwa 1,7 kg Heu je 100 kg Körpermasse.",
      },
      {
        id: "dick",
        prompt: "Ein Pferd ist zu dick. Was ist der richtige Ansatz?",
        options: [
          ok("energie", "Raufuttermenge halten, aber energieärmeres Raufutter wählen und mehr bewegen"),
          no("heu-weg", "Heu deutlich unter die Mindestmenge kürzen", "Das schadet Magen, Darm und Verhalten."),
          no("hungern", "Einen Tag pro Woche gar nicht füttern", "Fastentage sind für Pferde gefährlich."),
        ],
        explain: "Richtig. Weniger Energie – nicht weniger Kauzeit.",
      },
      {
        id: "fm-ts",
        prompt: "Warum rechnet man in der Fütterung mit Trockensubstanz?",
        options: [
          ok("wasser", "Weil der Wassergehalt der Futtermittel sehr unterschiedlich ist und die Nährstoffe in der TS stecken"),
          no("leichter", "Weil trockenes Futter leichter ist", "Es geht um vergleichbare Nährstoffmengen."),
          no("vorschrift", "Weil es gesetzlich so vorgeschrieben ist", "Es ist eine fachliche Rechenmethode."),
        ],
        explain: "Genau. Nur so lassen sich Heu, Heulage und Gras vergleichen.",
      },
      {
        id: "faktoren",
        prompt: "Welcher Faktor verändert den Futterbedarf NICHT direkt?",
        options: [
          ok("farbe", "Die Fellfarbe"),
          no("arbeit", "Die Arbeitsleistung", "Mehr Arbeit erhöht den Energiebedarf."),
          no("alter", "Das Alter", "Jungpferde und Senioren haben besondere Bedürfnisse."),
          no("qualitaet", "Die Futterqualität", "Energie und Zucker im Heu schwanken stark."),
        ],
        explain: "Richtig. Fellfarbe hat keinen Einfluss auf die Futtermenge.",
      },
      {
        id: "kontrolle",
        prompt: "Wie oft sollten Gewicht und Figur kontrolliert werden?",
        options: [
          ok("wochen", "Regelmäßig, etwa alle zwei bis vier Wochen"),
          no("jahr", "Einmal im Jahr beim Impfen", "Veränderungen fallen so viel zu spät auf."),
          no("nie", "Nur wenn das Pferd krank ist", "Regelmäßige Kontrolle hilft, Probleme früh zu erkennen."),
        ],
        explain: "Genau. Immer gleich messen, aufschreiben und vergleichen.",
      },
    ],
  },

  /* ---------- 8. Kraftfutter, Mineralfutter, Ergänzung ---------- */
  {
    slug: "kraftfutter-mineralfutter",
    title: "Kraftfutter, Mineralfutter und Ergänzungsfuttermittel",
    speaker: "ben",
    intro:
      "Im Futterraum stehen Eimer und Säcke mit Müsli, Mash, Leinsamen, Kräutern, Biotin, Magnesium und Elektrolyten. Braucht ein Freizeitpferd das wirklich alles? Oft lautet die Antwort: nein. Aber fast jedes Pferd braucht ein passendes Mineralfutter.",
    illustration: item("mineral"),
    terms: [
      { term: "Kraftfutter", meaning: "Energiereiches Futter wie Getreide oder Mischfutter, das Raufutter ergänzt." },
      { term: "Mineralfutter", meaning: "Ergänzungsfuttermittel, das Mengen- und Spurenelemente sowie Vitamine liefert, die im Grundfutter fehlen." },
      { term: "Ergänzungsfuttermittel", meaning: "Futtermittel, das die Ration ergänzt. Es ist kein Arzneimittel und darf nicht als Heilmittel beworben werden." },
      { term: "Deklaration", meaning: "Pflichtangaben auf dem Etikett: Art des Futtermittels, Zusammensetzung, Inhaltsstoffe, Zusatzstoffe, Fütterungsempfehlung." },
    ],
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Braucht mein Pferd Kraftfutter?",
          text: "Kraftfutter ist nur dann nötig, wenn Raufutter den Energie- oder Eiweißbedarf nicht deckt. Das betrifft zum Beispiel Sportpferde mit hohem Trainingsumfang, schwerfuttrige Pferde, manche Senioren sowie tragende und säugende Stuten.\n\nViele Freizeitpferde, die einige Stunden pro Woche geritten werden, decken ihren Energiebedarf mit gutem Raufutter. Bekommen sie trotzdem Kraftfutter, werden sie häufig zu dick oder unruhig. Die Reihenfolge lautet deshalb: Erst prüfen, ob mehr oder energiereicheres Raufutter reicht. Erst dann Kraftfutter.",
        },
        {
          heading: "Getreide, Müsli und Alternativen",
          text: "Hafer ist für Pferde gut verdaulich, weil seine Stärke auch roh im Dünndarm abgebaut werden kann. Gerste und Mais sollten aufgeschlossen sein (gequetscht, gepoppt oder flockiert), sonst gelangt viel unverdaute Stärke in den Dickdarm. Müslis und Pellets sind Mischfutter, deren Zusammensetzung stark schwankt – hier lohnt der Blick aufs Etikett.\n\nFür Pferde, die Energie brauchen, aber wenig Stärke vertragen, gibt es Alternativen: Luzerne, Rübenschnitzel (vorher einweichen), faserreiche Mischfutter oder Öl. Was passt, hängt vom Pferd ab.\n\nWenn Kraftfutter nötig ist: auf mehrere kleine Mahlzeiten verteilen, immer nach dem Raufutter füttern und die Stärkemenge je Mahlzeit begrenzen (siehe Lektion 5).",
        },
        {
          heading: "Mineralfutter: fast immer sinnvoll",
          text: "Raufutter deckt oft Energie und Eiweiß, aber nicht alle Mineralstoffe. In vielen Regionen Deutschlands ist der Gehalt an bestimmten Spurenelementen im Grundfutter niedrig, häufig genannt werden Selen, Zink und Kupfer. Im Winter, wenn es nur Heu gibt, kann außerdem Vitamin E knapp werden.\n\nEin Mineralfutter soll diese Lücken schließen – nicht möglichst viel von allem liefern. Wichtig:\n\n• nach Körpergewicht dosieren, wie auf dem Etikett angegeben\n• nicht mehrere Mineralfutter kombinieren\n• passend zum Grundfutter wählen; eine Heuanalyse hilft dabei\n\nMehr ist nicht besser: Einige Spurenelemente, etwa Selen, können bei Überversorgung schaden.",
        },
        {
          heading: "Ergänzungsfutter: was steckt dahinter?",
          text: "Ergänzungsfuttermittel sind rechtlich Futtermittel, keine Arzneimittel. Sie dürfen nicht versprechen, Krankheiten zu heilen oder zu verhindern. Für viele Produkte – etwa Kräutermischungen für „Atemwege“, „Gelenke“ oder „Nerven“ – ist die Wirkung beim Pferd wissenschaftlich kaum belegt. Manche sind sinnvoll, zum Beispiel Elektrolyte nach starkem Schwitzen oder gezielte Ergänzungen nach tierärztlicher Empfehlung.\n\nAchtung bei Turnierpferden: Bestimmte Pflanzen und Inhaltsstoffe, zum Beispiel Teufelskralle oder Weidenrinde, können bei Dopingkontrollen auffallen. Maßgeblich sind die Anti-Doping- und Medikamentenkontrollregeln (ADMR) der FN. Im Zweifel vor dem Turnier mit Tierarzt oder Tierärztin klären.",
        },
        {
          heading: "Das Etikett lesen",
          text: "Auf jedem Sack steht, um welche Art Futtermittel es sich handelt: Einzelfuttermittel (z. B. Hafer), Mischfuttermittel, Ergänzungsfuttermittel oder Mineralfuttermittel. Die Zusammensetzung wird in absteigender Reihenfolge des Gewichtsanteils angegeben – was vorn steht, ist am meisten enthalten.\n\nDarunter stehen Inhaltsstoffe (z. B. Rohprotein, Rohfett, Rohfaser, Rohasche), die Zusatzstoffe (z. B. Spurenelemente und Vitamine je kg) und die Fütterungsempfehlung. Wer einen „getreidefreien“ Mix kauft, findet manchmal trotzdem Melasse oder Zuckerrübe weit vorn. Wer die Deklaration liest, kauft gezielter.",
        },
      ],
      praxis: {
        title: "Die Futtereimer-Inventur",
        text: "Lea macht mit Mila eine Inventur bei Tonga: Müsli, Mineralfutter, ein „Kräutermix für glänzendes Fell“, Biotin und Leinsamen. Tonga ist leicht übergewichtig und wird dreimal pro Woche eine Stunde geritten.\n\nMit der Reitlehrerin gehen sie Etikett für Etikett durch. Ergebnis: Das Müsli liefert vor allem Energie, die Tonga nicht braucht. Der Kräutermix enthält zusätzlich Spurenelemente, die auch im Mineralfutter stecken. Tonga bekommt jetzt nur noch ihr Mineralfutter mit einer kleinen Handvoll Heucobs, damit sie es frisst. Über das Biotin entscheiden sie nach dem nächsten Termin beim Hufschmied.",
      },
      fehler: [
        { fehler: "Jedem Pferd „aus Gewohnheit“ Kraftfutter geben.", besser: "Kraftfutter nur bei echtem Bedarf, wenn Raufutter nicht reicht." },
        { fehler: "Zwei oder drei Mineralfutter gleichzeitig füttern.", besser: "Ein passendes Mineralfutter, nach Gewicht dosiert." },
        { fehler: "Ergänzungsfutter kaufen, weil es Heilung verspricht.", besser: "Bei Beschwerden zuerst die Ursache tierärztlich abklären lassen." },
        { fehler: "Vor dem Turnier ungeprüft Kräuter füttern.", besser: "Inhaltsstoffe mit Tierarzt oder Tierärztin und den Regeln der FN abgleichen." },
      ],
      richtig: [
        "Prüfe Figur und Leistung: Reicht Raufutter für den Energiebedarf?",
        "Wähle ein Mineralfutter, das zum Grundfutter passt, und dosiere es nach Gewicht.",
        "Lies bei jedem Futtermittel die Deklaration: Art, Zusammensetzung, Zusatzstoffe.",
        "Füttere Kraftfutter, falls nötig, in kleinen Portionen nach dem Raufutter.",
        "Hinterfrage jedes Ergänzungsfutter: Welches Problem soll es lösen, und gibt es dafür Belege?",
      ],
      merke: [
        "Viele Freizeitpferde brauchen kein Kraftfutter, aber ein passendes Mineralfutter.",
        "Mineralfutter schließt Lücken – mehr ist nicht besser.",
        "Ergänzungsfutter ist kein Medikament.",
        "Die Zusammensetzung steht in absteigender Reihenfolge auf dem Etikett.",
      ],
      weiter: [
        { lesson: "ra-w15-l5", label: "Das Verdauungssystem verstehen" },
        { lesson: "ra-w15-l9", label: "Wasserbedarf und Salzversorgung" },
        { lesson: "ra-w15-l7", label: "Wie viel Futter braucht mein Pferd wirklich?" },
      ],
      pruefen: "Aussagen zu regionalen Mängeln (Selen, Zink, Kupfer), Vitamin E im Winter; Hafer roh vs. Gerste/Mais aufgeschlossen; ADMR-Beispiele Teufelskralle/Weidenrinde; Futtermittelrecht (Werbeverbot Heilversprechen).",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l8-entscheidung",
        prompt: "Ein 550-kg-Freizeitpferd mit guter Figur wird viermal pro Woche eine Stunde ruhig geritten und bekommt reichlich gutes Heu. Was braucht es zusätzlich am ehesten?",
        options: [
          ok("mineral", "Ein zum Heu passendes Mineralfutter"),
          no("hafer", "Täglich 2 kg Hafer für die Arbeit", "Der Energiebedarf ist mit gutem Heu meist gedeckt. Zusätzlicher Hafer macht eher dick."),
          no("alles", "Müsli, Kräuter und Biotin zur Sicherheit", "„Zur Sicherheit“ ist kein Grund. Jedes Futter braucht einen Zweck."),
        ],
        explain: "Genau. Raufutter deckt hier die Energie – das Mineralfutter schließt die Lücken bei Spurenelementen.",
      },
    ],
    quiz: [
      {
        id: "wann",
        prompt: "Wann ist Kraftfutter sinnvoll?",
        options: [
          ok("bedarf", "Wenn Raufutter den Energie- oder Eiweißbedarf nicht deckt"),
          no("immer", "Bei jedem Pferd, das geritten wird", "Viele Freizeitpferde kommen ohne Kraftfutter gut aus."),
          no("belohnung", "Als tägliche Belohnung", "Belohnung ist kein Fütterungsgrund."),
        ],
        explain: "Richtig. Erst Raufutter optimieren, dann ergänzen.",
      },
      {
        id: "mehrere",
        prompt: "Warum sollte man nicht mehrere Mineralfutter gleichzeitig geben?",
        options: [
          ok("ueber", "Weil einzelne Spurenelemente überdosiert werden können"),
          no("geschmack", "Weil es nicht schmeckt", "Das Problem ist die mögliche Überversorgung."),
          no("teuer", "Nur weil es teuer ist", "Wichtiger ist: Zu viel kann schaden, etwa bei Selen."),
        ],
        explain: "Genau. Mehr ist nicht besser.",
      },
      {
        id: "etikett",
        prompt: "Was bedeutet die Reihenfolge der Zutaten auf dem Etikett?",
        options: [
          ok("anteil", "Was zuerst steht, ist mengenmäßig am meisten enthalten"),
          no("abc", "Die Zutaten stehen alphabetisch", "Die Reihenfolge richtet sich nach dem Gewichtsanteil."),
          no("wichtig", "Was zuerst steht, ist am gesündesten", "Die Reihenfolge sagt nur etwas über die Menge aus."),
        ],
        explain: "Richtig. So erkennst du schnell, woraus ein Futter hauptsächlich besteht.",
      },
      {
        id: "ergaenzung",
        prompt: "Was gilt für Ergänzungsfuttermittel?",
        options: [
          ok("kein-arznei", "Sie sind Futtermittel, keine Arzneimittel, und dürfen nicht als Heilmittel beworben werden"),
          no("arznei", "Sie wirken wie Medikamente", "Sie sind rechtlich keine Arzneimittel."),
          no("pflicht", "Jedes Pferd braucht mindestens drei", "Viele Pferde brauchen außer Mineralfutter keine."),
        ],
        explain: "Genau. Bei Beschwerden zuerst die Ursache klären lassen.",
      },
    ],
  },

  /* ---------- 9. Wasser und Salz ---------- */
  {
    slug: "wasser-und-salz",
    title: "Wasserbedarf und Salzversorgung",
    speaker: "lea",
    intro:
      "Im Winter friert die Tränke im Offenstall nachts ein, und morgens hat niemand Zeit, das Eis aufzuschlagen. „Pferde trinken bei Kälte ohnehin wenig“, sagt jemand. Stimmt das – und warum kann gerade das gefährlich sein?",
    illustration: item("wasser"),
    terms: [
      { term: "Selbsttränke", meaning: "Tränke, die automatisch Wasser nachliefert – z. B. über ein Druckventil oder einen Schwimmer." },
      { term: "Elektrolyte", meaning: "Gelöste Mineralstoffe wie Natrium, Chlorid und Kalium, die der Körper für den Wasserhaushalt braucht." },
      { term: "Dehydratation", meaning: "Flüssigkeitsmangel im Körper." },
    ],
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Wie viel trinkt ein Pferd?",
          text: "Ein ruhendes Pferd braucht bei gemäßigten Temperaturen als Faustwert etwa 5 Liter Wasser je 100 kg Körpermasse am Tag – ein 500-kg-Pferd also rund 25 Liter. Das ist aber nur der untere Bereich. Der Bedarf steigt stark mit:\n\n• trockenem Futter: Wer nur Heu frisst, muss mehr trinken als ein Weidepferd, dessen Gras viel Wasser enthält.\n• Wärme und Schwitzen: Bei Hitze und Arbeit kann der Bedarf auf das Doppelte bis Dreifache steigen.\n• Laktation: Stuten mit Fohlen brauchen deutlich mehr.\n\nDie BMEL-Leitlinien verlangen, dass Pferde mindestens dreimal täglich, besser jederzeit Zugang zu Wasser haben. In der Praxis sollte immer Wasser verfügbar sein.",
        },
        {
          heading: "Tränken: Menge, Sauberkeit, Technik",
          text: "Pferde trinken am liebsten mit großen Zügen aus einer offenen Wasserfläche. Bei Selbsttränken muss genug Wasser nachfließen; liefert eine Tränke nur ein Rinnsal, trinken manche Pferde zu wenig. Du kannst die Durchflussmenge mit Messbecher und Uhr prüfen.\n\nTränken werden täglich auf Funktion und Sauberkeit kontrolliert. Futterreste, Algen und Kot im Wasser schrecken Pferde ab und fördern Keime. Bei Eimertränke siehst du genau, wie viel ein Pferd trinkt – das ist bei kranken Pferden ein Vorteil. In Gruppen sollten mehrere Wasserstellen vorhanden sein, damit rangniedere Pferde nicht vertrieben werden.",
        },
        {
          heading: "Wasser im Winter",
          text: "Bei Kälte trinken Pferde oft weniger, besonders wenn das Wasser eiskalt ist. Gleichzeitig fressen sie im Winter überwiegend trockenes Heu. Diese Kombination erhöht das Risiko für Verstopfungskoliken im Dickdarm.\n\nDeshalb: Tränken frostsicher machen oder beheizen, Eis mehrmals täglich entfernen und kontrollieren, ob alle Pferde trinken. Leicht temperiertes Wasser wird oft lieber angenommen. Schnee ist kein Ersatz für Trinkwasser – ein Pferd müsste riesige Mengen fressen und würde dabei viel Körperwärme verlieren.",
        },
        {
          heading: "Salz: Natrium und Chlorid",
          text: "Gras, Heu und Getreide enthalten wenig Natrium und Chlorid. Pferde brauchen diese Elektrolyte aber für Wasserhaushalt, Nerven und Muskeln. Für ein 500-kg-Pferd im Erhaltungsbedarf werden etwa 20 g Natrium und 25 g Chlorid pro Tag empfohlen.\n\nEin Salzleckstein ist eine gute Grundlage, aber nicht jedes Pferd leckt genug. Deshalb wird Salz häufig zusätzlich abgewogen ins Futter gegeben. Wie viel, hängt vom Mineralfutter, vom Leckverhalten und vom Schwitzen ab.\n\nPferdeschweiß ist salziger als Blutplasma. Ein 500-kg-Pferd kann bei mittlerer Arbeit rund 10 Liter Schweiß verlieren – darin stecken grob 30 g Natrium und über 50 g Chlorid. Nach starkem Schwitzen kann deshalb ein Elektrolytfutter sinnvoll sein. Aber: Elektrolyte nur, wenn das Pferd jederzeit trinken kann, und nicht „vorsorglich“ in großen Mengen. Eine Studie der Universität Halle zeigte, dass hohe Salzgaben die Kalziumausscheidung erhöhen.",
        },
        {
          heading: "Woran erkennst du Wassermangel?",
          text: "Mögliche Hinweise auf Wassermangel sind: wenig, trockener, harter Kot; dunkler, stark riechender Urin; trockene, klebrige Maulschleimhaut; eine verlängerte kapilläre Füllungszeit (die Schleimhaut wird nach Druck langsamer als in etwa zwei Sekunden wieder rosa); Mattigkeit und Leistungsabfall. Der bekannte Hautfaltentest am Hals ist ungenau, besonders bei älteren Pferden.\n\nWenn du Wassermangel vermutest, das Pferd frisst oder trinkt nicht oder zeigt Koliksymptome: Tierarzt oder Tierärztin anrufen. Wie du Schleimhäute und Kreislauf richtig prüfst, lernst du im Modul „Pferdegesundheit“.",
        },
      ],
      praxis: {
        title: "Die eingefrorene Tränke",
        text: "In einer Frostwoche ist die Selbsttränke im Offenstall morgens mehrmals eingefroren. Mats schlägt das Eis auf und füllt zusätzlich zwei große Kübel mit leicht angewärmtem Wasser. Dabei fällt ihm auf, dass ein älteres Einstellerpony kaum trinkt und weniger, aber festere Kotballen absetzt.\n\nMats informiert Hanna, die die Tierärztin um Rat fragt. Das Pony bekommt sein Heu nun teilweise angefeuchtet und eine abgewogene Salzration, die Tränke wird mit einem Heizkabel nachgerüstet. Ab sofort steht „Tränke prüfen“ dreimal täglich auf dem Stallplan.",
      },
      fehler: [
        { fehler: "Davon ausgehen, dass Pferde im Winter kaum Wasser brauchen.", besser: "Gerade bei Heufütterung und Kälte auf ausreichende Wasseraufnahme achten." },
        { fehler: "Nur einen Salzleckstein anbieten und nicht prüfen, ob er genutzt wird.", besser: "Leckverhalten beobachten und Salz bei Bedarf abgewogen füttern." },
        { fehler: "Elektrolyte vorsorglich in großen Mengen geben.", besser: "Gezielt nach starkem Schwitzen und nur mit freiem Wasserzugang." },
        { fehler: "Eine langsam laufende Selbsttränke ignorieren.", besser: "Durchfluss prüfen und Tränke warten oder ersetzen." },
      ],
      richtig: [
        "Kontrolliere Tränken mindestens morgens und abends auf Funktion, Sauberkeit und Eis.",
        "Prüfe die Durchflussmenge von Selbsttränken.",
        "Beobachte, ob jedes Pferd trinkt – besonders in Gruppen und im Winter.",
        "Biete einen Salzleckstein an und ergänze bei Bedarf abgewogenes Salz.",
        "Ergänze nach starkem Schwitzen Elektrolyte nur mit jederzeit verfügbarem Wasser.",
        "Ruf bei Hinweisen auf Wassermangel oder Kolik die Tierärztin oder den Tierarzt an.",
      ],
      merke: [
        "Faustwert in Ruhe: rund 5 l Wasser je 100 kg Körpermasse – bei Hitze und Arbeit deutlich mehr.",
        "Pferde brauchen jederzeit Zugang zu sauberem Wasser, auch im Winter.",
        "Raufutter enthält wenig Salz – Natrium und Chlorid müssen ergänzt werden.",
        "Elektrolyte nur gezielt und immer mit Wasserzugang.",
      ],
      weiter: [
        { lesson: "ra-w15-l11", label: "Winterhaltung, Winterfell, Scheren und Eindecken" },
        { lesson: "ra-w15-l12", label: "Sommerhaltung, Hitze und Insektenschutz" },
        { lesson: "ra-w16-l2", label: "Puls, Atmung und Temperatur richtig messen" },
      ],
      pruefen: "Faustwert 5 l/100 kg KM; Natrium/Chlorid-Bedarf und Schweißverluste (Quelle: Liebegg 2024); Studie Zeyner et al. 2017 (Universität Halle-Wittenberg); Kapilläre Füllungszeit.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l9-entscheidung",
        prompt: "Nach einem langen Ausritt im Sommer ist das Pferd stark verschwitzt. Was ist die beste Reihenfolge?",
        options: [
          ok("wasser", "Abkühlen, Wasser anbieten, bei starkem Schwitzen Elektrolyte nur mit freiem Wasserzugang"),
          no("elektro-ohne", "Elektrolytpaste geben und dann für die Nacht in die Box ohne Tränke", "Elektrolyte ohne Wasser verstärken den Flüssigkeitsmangel."),
          no("nichts", "Nichts tun – das Pferd holt sich das Salz am Leckstein", "Nach starkem Schwitzen reicht der Leckstein oft nicht. Wasser ist das Wichtigste."),
        ],
        explain: "Richtig. Wasser zuerst, Elektrolyte gezielt und nur mit Tränke.",
      },
    ],
    quiz: [
      {
        id: "menge",
        prompt: "Wie viel Wasser braucht ein ruhendes 500-kg-Pferd bei gemäßigten Temperaturen ungefähr mindestens?",
        options: [ok("25", "Rund 25 Liter"), no("5", "Rund 5 Liter", "Das ist der Wert je 100 kg – nicht für das ganze Pferd."), no("100", "Rund 100 Liter", "Das wäre extrem viel; so viel braucht es nur unter sehr hoher Belastung annähernd.")],
        explain: "Genau – bei Wärme, Arbeit und trockenem Futter deutlich mehr.",
      },
      {
        id: "winter",
        prompt: "Warum ist Wassermangel im Winter besonders riskant?",
        options: [
          ok("kolik", "Weil Pferde dann viel trockenes Heu fressen und weniger trinken – das erhöht das Risiko für Verstopfungskoliken"),
          no("fell", "Weil das Winterfell sonst stumpf wird", "Das Hauptproblem ist die Verdauung."),
          no("kalt", "Weil Pferde im Winter mehr schwitzen", "Pferde schwitzen im Winter meist weniger."),
        ],
        explain: "Richtig. Darum Tränken frostfrei halten und kontrollieren.",
      },
      {
        id: "salz",
        prompt: "Warum brauchen Pferde zusätzlich Salz?",
        options: [
          ok("wenig", "Weil Gras, Heu und Getreide wenig Natrium und Chlorid enthalten"),
          no("geschmack", "Damit das Futter besser schmeckt", "Es geht um die Versorgung mit Elektrolyten."),
          no("zaehne", "Für gesunde Zähne", "Salz ist für Wasserhaushalt, Nerven und Muskeln wichtig."),
        ],
        explain: "Genau. Beim Schwitzen gehen zusätzlich große Mengen verloren.",
      },
      {
        id: "zeichen",
        prompt: "Welches Zeichen kann auf Wassermangel hinweisen?",
        options: [
          ok("kot", "Wenig, trockener, harter Kot"),
          no("glanz", "Glänzendes Fell", "Glänzendes Fell ist kein Hinweis auf Wassermangel."),
          no("wiehern", "Häufiges Wiehern", "Das hat mit dem Wasserhaushalt nichts zu tun."),
        ],
        explain: "Richtig. Dazu kommen z. B. trockene Schleimhäute und dunkler Urin.",
      },
    ],
  },
];
