import "server-only";
import { WH_SPOTS } from "@/components/illustrations/advent/AdventScenes";
import { decisionGame, findGame, multiQuiz, quizGame, storyStep } from "./games";
import type { AdventDoor } from "./types";

/**
 * Türchen 13–24 – „Das Geheimnis des Winterhofs“.
 * Nur serverseitig laden (Premium-Inhalt, Datumssperre in app/adventskalender/[tag]).
 */

const mission = WH_SPOTS.mission;
const shoes = WH_SPOTS.hufeisen;

export const doors2: AdventDoor[] = [
  /* ------------------------------------------------------------------ 13 */
  {
    day: 13,
    title: "Das verschwundene Halfter",
    game: "quiz",
    chapter: {
      scene: "sattelkammer",
      cast: ["lea", "mila", "ben", "kruemel", "tivoli"],
      paragraphs: [
        "Hanna hat Tivoli für den Lichterritt ein neues Halfter geschenkt: weinrot, mit einem kleinen goldenen Stern an der Seite. Gestern Abend hing es noch an Tivolis Haken in der Sattelkammer. Heute Morgen ist der Haken leer.",
        "„Ein neuer Fall!“, ruft Lea und zückt ihr Notizbuch. Die Kinder sammeln Hinweise, wie richtige Detektive.",
        "Erstens: Auf dem Boden der Sattelkammer sind kleine, erdige Pfotenabdrücke. Zweitens: Die Tür der Sattelkammer stand heute früh einen Spalt offen. Drittens: Tilda hat erzählt, dass sie das neue Halfter gestern mit einem Möhrenstück eingerieben hat, damit es nicht so neu riecht.",
        "Mila grinst. „Ich glaube, ich weiß, wer Halfter liebt, die nach Möhren riechen.“",
        "Ben ist nicht so sicher. „Vielleicht war es ja Tivoli selbst? Oder der Hufeisen-Unbekannte?“",
        "Die Kinder legen ihre Hinweise nebeneinander. Am Ende passt alles zusammen. Und als sie das Halfter endlich finden, liegt direkt daneben noch etwas: ein alter Briefumschlag, ganz zerknittert und ein bisschen angeknabbert. Auf dem Umschlag steht: „Für Willi.“",
        "Löse den Fall!",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "quiz",
        title: "Detektivrätsel",
        steps: [
          ...quizGame("d13", [
            {
              q: "Wer hat das Halfter mitgenommen? Schau dir die Hinweise an.",
              visual: {
                kind: "doc",
                doc: {
                  style: "list",
                  title: "Leas Hinweise",
                  lines: ["Kleine erdige Pfotenabdrücke", "Tür einen Spalt offen", "Halfter riecht nach Möhren"],
                },
              },
              options: [
                { label: "Tivoli", feedback: "Tivoli war die ganze Nacht in seiner Box – und Pferde hinterlassen Hufabdrücke, keine Pfoten." },
                { label: "Krümel", correct: true },
                { label: "Wilhelm", feedback: "Wilhelm hat große Gummistiefel. Die Abdrücke sind aber klein und haben Pfoten." },
              ],
              explain: "Richtig! Kleine Pfoten, eine offene Tür und ein Halfter, das nach Möhren riecht – das war Krümel!",
            },
            {
              q: "Wohin bringt Krümel seine allerliebsten Schätze?",
              visual: { kind: "puppy" },
              options: [
                { label: "In seinem Körbchen", correct: true },
                { label: "Auf dem Heuboden", feedback: "Da kommt Krümel gar nicht hinauf – die Leiter ist nichts für Hundepfoten." },
                { label: "In Tivolis Box", feedback: "Krümel darf nicht in die Pferdeboxen. Das weiß er (meistens)." },
              ],
              explain: "Genau! In Krümels Körbchen liegen schon ein alter Handschuh, ein Tennisball – und das neue Halfter.",
            },
          ]),
          storyStep(
            "d13-brief",
            "Neben dem Halfter liegt der Umschlag „Für Willi“. Krümel muss ihn hinter den Halfterhaken hervorgezogen haben. Wilhelm erlaubt den Kindern, ihn zu öffnen.",
            {
              kind: "doc",
              doc: {
                style: "note",
                title: "Lieber Willi,",
                lines: [
                  "falls die Kiste je wieder geöffnet werden soll:",
                  "Der Code steht nicht auf Papier. Er steht im Stall.",
                  "Die Kerzen am Kranz. Die Gangarten meiner Fanny.",
                  "Die Ohren, die immer zuhören.",
                  "Deine Martha",
                ],
              },
            },
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Marthas Brief an Willi",
        doc: {
          style: "note",
          label: "Fundstück 13",
          title: "Lieber Willi,",
          lines: ["Der Code steht nicht auf Papier. Er steht im Stall.", "Die Kerzen am Kranz. Die Gangarten meiner Fanny.", "Die Ohren, die immer zuhören. – Deine Martha"],
        },
      },
      message: "Fall gelöst: Krümel war's! Und Martha hat einen Hinweis auf den Code versteckt.",
    },
    teaser: "Morgen lernt ihr, Pferde zu lesen – und Wilhelm erzählt endlich von Fanny.",
  },

  /* ------------------------------------------------------------------ 14 */
  {
    day: 14,
    title: "Die Pferdesprache",
    game: "quiz",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["lea", "tonga", "wilhelm"],
      paragraphs: [
        "Pferde sprechen nicht mit Worten. Sie sprechen mit den Ohren, den Augen, dem Maul, dem Schweif und dem ganzen Körper. Wer genau hinschaut, kann sie verstehen.",
        "Lea sitzt auf einem umgedrehten Eimer vor Tongas Box und beobachtet. Tonga döst. Die Ohren hängen locker zur Seite, die Unterlippe ist ganz weich. Ein Hinterbein ist angewinkelt. Dann klappert Ben mit der Futterschüssel, und sofort drehen sich beide Ohren nach vorne.",
        "Wilhelm setzt sich zu ihr. Eine Weile schauen sie Tonga gemeinsam zu. Dann fängt Wilhelm an zu erzählen, ohne dass Lea gefragt hat.",
        "„Fanny war Marthas Haflinger-Stute. Die klügste Stute, die ich je gekannt habe. Als ich hier mit sechzehn angefangen habe, hatte ich furchtbar Angst vor Pferden. Fanny hat mir beigebracht, keine Angst mehr zu haben.“ Er lächelt. „Einmal, im Winter, war sie sehr krank. Ich habe die ganze Nacht neben ihr im Stroh gesessen. Und ich habe einen Wunsch aufgeschrieben.“",
        "Lea denkt an den Zettel aus der Putzkiste. „Dass Fanny wieder gesund wird“, flüstert sie. „W. – das warst du!“",
        "Wilhelm nickt. „Sie ist wieder gesund geworden. Und sehr, sehr alt.“",
        "Leas Hals wird ein bisschen eng. Dann schaut sie wieder zu Tonga. Was sagen Pferdeohren?",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "quiz",
        title: "Körpersprache-Quiz",
        steps: quizGame("d14", [
          {
            q: "Beide Ohren zeigen nach vorne, der Kopf ist aufmerksam. Was fühlt das Pferd?",
            visual: { kind: "head", horse: "tonga", mood: "neugierig" },
            options: [
              { label: "Es ist neugierig und aufmerksam", correct: true },
              { label: "Es ist wütend", feedback: "Wütende Pferde legen die Ohren flach nach hinten. Diese hier zeigen nach vorne." },
              { label: "Es schläft tief", feedback: "Beim Dösen hängen die Ohren locker zur Seite." },
            ],
            explain: "Richtig! Nach vorne gerichtete Ohren heißen: „Was ist das? Das interessiert mich!“",
          },
          {
            q: "Die Ohren hängen locker zur Seite, die Unterlippe ist weich. Was bedeutet das?",
            visual: { kind: "head", horse: "tivoli", mood: "entspannt" },
            options: [
              { label: "Das Pferd hat Angst", feedback: "Ein ängstliches Pferd ist angespannt, mit großen Augen und hohem Kopf." },
              { label: "Das Pferd ist entspannt oder döst", correct: true },
              { label: "Das Pferd will spielen", feedback: "Zum Spielen wäre es wacher. Hier ruht es sich aus." },
            ],
            explain: "Genau! Lockere Ohren und eine weiche Lippe heißen: „Mir geht es gut, ich ruhe mich aus.“ Dann lässt man das Pferd in Ruhe dösen.",
          },
          {
            q: "Die Ohren sind flach nach hinten an den Hals gelegt. Was tust du?",
            visual: { kind: "head", horse: "scrabble", mood: "grummelig" },
            options: [
              { label: "Schnell hingehen und streicheln", feedback: "Lieber nicht! Flach angelegte Ohren sagen: „Komm mir nicht zu nah.“" },
              { label: "Abstand halten und einem Erwachsenen Bescheid sagen", correct: true },
              { label: "Laut rufen, damit es aufhört", feedback: "Lautes Rufen macht es nur unruhiger. Ruhig bleiben und Abstand halten." },
            ],
            explain: "Richtig! Angelegte Ohren sind eine Warnung. Selbst der verschmuste Scrabble hat mal schlechte Laune – zum Beispiel, wenn er beim Fressen gestört wird.",
          },
          {
            q: "Kopf hoch, Augen weit offen, Ohren gespitzt, der ganze Körper angespannt. Was ist los?",
            visual: { kind: "head", horse: "tonga", mood: "aufgeregt" },
            options: [
              { label: "Das Pferd ist aufgeregt oder erschrocken", correct: true },
              { label: "Das Pferd ist müde", feedback: "Müde Pferde lassen den Kopf eher hängen." },
              { label: "Das Pferd freut sich auf Heu", feedback: "Beim Heu sind die Ohren vorne – aber der Körper ist nicht so angespannt." },
            ],
            explain: "Genau! Darum gewöhnt Tilda die Pferde ganz langsam an die Lichter für Heiligabend. Ein aufgeregtes Pferd braucht Ruhe und einen ruhigen Menschen.",
          },
        ]),
      },
    ],
    reward: {
      found: {
        title: "Wilhelms Erinnerung",
        doc: {
          style: "note",
          label: "Fundstück 14",
          title: "Was Wilhelm erzählt hat",
          lines: ["Fanny war Marthas Haflinger-Stute.", "Wilhelm kam mit 16 auf den Hof.", "Der Wunschzettel „W.“ war von ihm.", "Fanny wurde wieder gesund – und sehr alt."],
        },
      },
      message: "Du kannst Pferdeohren lesen! Und das Rätsel um W. ist gelöst: W. ist Wilhelm.",
    },
    teaser: "Morgen wird der Stall richtig geschmückt – und Hanna erzählt von ihrer Oma.",
  },

  /* ------------------------------------------------------------------ 15 */
  {
    day: 15,
    title: "Der Weihnachtsstall",
    game: "decorate",
    chapter: {
      scene: "wh-hof",
      cast: ["mila", "ben", "hanna"],
      paragraphs: [
        "Hanna hat Kisten vom Dachboden geholt. Darin liegen Sterne aus Stroh und Goldpapier, Schleifen, Tannengirlanden und drei Holzschilder mit den Namen der Pferde. „Heute wird der Stall richtig geschmückt“, sagt sie. „Aber pferdesicher!“",
        "Sie erklärt die Regeln: Alles hängt so hoch, dass kein Pferdemaul drankommt. Kein Lametta, kein Glitzer, keine Eibenzweige – Eibe ist für Pferde sehr giftig. Lichter nur mit LED, Kabel immer außer Reichweite.",
        "Beim Schmücken fragt Mila vorsichtig: „Hanna, deine Oma … war die Martha?“",
        "Hanna hält inne. Dann setzt sie sich auf eine Kiste. „Ja. Oma Martha. Ihr gehörte der Hof, als ich so alt war wie ihr. Jedes Weihnachten haben wir hier im Stall gefeiert, mit allen, die auf dem Hof gelebt und gearbeitet haben.“ Sie lächelt traurig. „Dann wurde Oma älter, ihre Knie wollten nicht mehr, und sie ist zu meiner Mutter in die Stadt gezogen. Seitdem war sie nie wieder an Weihnachten hier.“",
        "„Wie alt ist sie jetzt?“, fragt Ben.",
        "„Achtundachtzig. Sie ruft jeden Sonntag an und fragt nach den Pferden. Nach jedem einzelnen.“",
        "Die Kinder schauen sich an. Keiner sagt etwas. Aber alle drei denken dasselbe.",
      ],
    },
    parts: [
      {
        kind: "decorate",
        title: "Schmücke deinen Weihnachtsstall",
        intro: "Neue Dekorationen sind freigeschaltet: die Pferdeschilder und goldene Sterne. Alles hängt pferdesicher hoch oben.",
        goal: {
          required: ["pferdeschilder"],
          minPlaced: 5,
          task: "Hänge die festlichen Pferdeschilder auf und schmücke mindestens fünf Plätze.",
        },
      },
    ],
    reward: {
      found: {
        title: "Hannas Erzählung",
        doc: {
          style: "note",
          label: "Fundstück 15",
          title: "Oma Martha",
          lines: ["Martha ist Hannas Oma, 88 Jahre alt.", "Früher: Weihnachten im Stall mit allen vom Hof.", "Seit sie in der Stadt wohnt, war sie nie mehr an Weihnachten hier.", "Sie fragt jeden Sonntag nach den Pferden."],
        },
      },
      message: "Dein Stall wird immer festlicher. Und die Kinder haben eine Idee …",
    },
    teaser: "Morgen fordert Lea Wilhelm zum großen Pferdequiz heraus. Der Preis: ein Geheimnis.",
  },

  /* ------------------------------------------------------------------ 16 */
  {
    day: 16,
    title: "Leas großes Pferdequiz",
    game: "quiz",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["lea", "wilhelm", "mila", "ben"],
      paragraphs: [
        "In der Stallpause sitzen alle im kleinen Stübchen neben der Sattelkammer. Draußen nieselt es, drinnen gibt es heißen Kakao. Lea stellt ihre Tasse ab und schaut Wilhelm herausfordernd an.",
        "„Ich mache dir einen Vorschlag“, sagt sie. „Du stellst mir deine schwersten Pferdefragen. Wenn ich alle richtig beantworte, erzählst du uns, wie die Hufeisenweihnacht angefangen hat.“",
        "Wilhelm streicht sich über den grauen Schnurrbart. „Alle?“, fragt er. „Auch die schweren?“",
        "„Alle“, sagt Lea. Mila und Ben nicken und rücken näher. Wenn Lea nicht weiterweiß, dürfen sie helfen – das hat Wilhelm erlaubt. „Im Stall macht man nichts allein“, sagt er.",
        "Wilhelm zieht den Bleistift hinter dem Ohr hervor, nimmt einen alten Futterzettel und schreibt Fragen darauf. Eine nach der anderen. Manche sind leicht, manche richtig knifflig.",
        "Krümel liegt unter dem Tisch und schnarcht. Draußen in der Stallgasse kaut Scrabble geräuschvoll sein Heu. Das Licht ist warm, und zum ersten Mal fühlt sich Lea wie eine echte Pferdeexpertin.",
        "Hilf ihr, das große Pferdequiz zu gewinnen!",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "quiz",
        title: "Die Wissens-Challenge",
        steps: [
          ...quizGame("d16", [
            {
              q: "Wie heißen die drei Grundgangarten des Pferdes?",
              options: [
                { label: "Schritt, Trab, Galopp", correct: true },
                { label: "Gehen, Rennen, Springen", feedback: "Fast! Beim Pferd heißen sie anders – und Springen ist keine Gangart." },
                { label: "Langsam, mittel, schnell", feedback: "Das stimmt ungefähr, aber die richtigen Namen sind gefragt." },
              ],
              explain: "Richtig! Schritt, Trab und Galopp. Manche Pferderassen können sogar noch weitere Gangarten, zum Beispiel Islandpferde den Tölt.",
            },
            {
              q: "Womit begrüßen sich Pferde?",
              options: [
                { label: "Sie wiehern laut", feedback: "Manchmal wiehern sie, aber zur Begrüßung machen sie etwas anderes, ganz Leises." },
                { label: "Sie pusten sich gegenseitig in die Nüstern", correct: true },
                { label: "Sie stampfen mit dem Huf", feedback: "Stampfen kann Ungeduld oder Fliegenabwehr sein – keine Begrüßung." },
              ],
              explain: "Genau! Pferde beschnuppern sich an den Nüstern. Darum schnuppert auch Tivoli so gern an Menschen – er sagt Hallo.",
            },
            {
              q: "Schlafen Pferde auch im Stehen?",
              options: [
                { label: "Nein, nie", feedback: "Doch! Pferde haben einen besonderen Trick in den Beinen." },
                { label: "Ja, sie können im Stehen dösen", correct: true },
                { label: "Nur Fohlen", feedback: "Fohlen liegen sogar besonders viel. Erwachsene Pferde können im Stehen dösen." },
              ],
              explain: "Richtig! Ein Halte-Mechanismus in den Beinen hält sie aufrecht. Für den Tiefschlaf legen sich Pferde aber kurz hin – nur wenn sie sich sicher fühlen.",
            },
            {
              q: "Wie nennt man ein Pferd, das große weiße und farbige Flächen im Fell hat – wie Tivoli?",
              visual: { kind: "horse", horse: "tivoli" },
              options: [
                { label: "Schimmel", feedback: "Ein Schimmel ist weiß oder grau – überall." },
                { label: "Rappe", feedback: "Ein Rappe ist ganz schwarz." },
                { label: "Schecke", correct: true },
              ],
              explain: "Genau! Tivoli ist ein Schecke. Kein Schecke sieht aus wie der andere – jedes Fleckenmuster gibt es nur einmal.",
            },
            {
              q: "Von welcher Seite führt man ein Pferd normalerweise?",
              options: [
                { label: "Von links", correct: true },
                { label: "Von hinten", feedback: "Hinter einem Pferd zu gehen ist gefährlich – es könnte erschrecken und auskeilen." },
                { label: "Von vorne, rückwärts gehend", feedback: "So sieht man nicht, wohin man läuft." },
              ],
              explain: "Richtig! Meist führt man von links, neben der Schulter. Gut ausgebildete Pferde lassen sich aber auch von rechts führen.",
            },
            {
              q: "Was frisst ein Pferd am meisten?",
              options: [
                { label: "Äpfel und Möhren", feedback: "Das sind Leckerli – für kleine Mengen." },
                { label: "Gras und Heu", correct: true },
                { label: "Hafer und Müsli", feedback: "Manche Pferde bekommen etwas Kraftfutter, aber der größte Teil ist etwas anderes." },
              ],
              explain: "Genau! Pferde sind Dauerfresser und brauchen viel Raufutter: Gras im Sommer, Heu im Winter.",
            },
            {
              q: "Warum stehen die Augen beim Pferd seitlich am Kopf?",
              options: [
                { label: "Damit es fast rundherum sehen kann", correct: true },
                { label: "Damit die Mähne nicht stört", feedback: "Netter Gedanke – der Grund hat mit Sicherheit zu tun." },
                { label: "Damit es besser schlafen kann", feedback: "Mit dem Schlafen hat das nichts zu tun." },
              ],
              explain: "Richtig! Pferde sind Fluchttiere. Mit seitlichen Augen sehen sie fast rundherum – nur direkt hinter sich und direkt vor der Nase nicht.",
            },
            {
              q: "Wie alt können Pferde werden?",
              options: [
                { label: "Ungefähr 5 Jahre", feedback: "Viel älter! Mit 5 Jahren ist ein Pferd noch jung." },
                { label: "Oft 25 bis 30 Jahre, manche sogar älter", correct: true },
                { label: "100 Jahre", feedback: "So alt werden Pferde nicht – aber erstaunlich alt trotzdem." },
              ],
              explain: "Genau! Gut versorgte Pferde werden oft 25 bis 30 Jahre alt. Fanny wurde sogar 31.",
            },
          ]),
          storyStep(
            "d16-geschichte",
            "Alle Fragen richtig! Wilhelm hält Wort: „Es war ein harter Winter. Ein Sturm hat das Scheunendach abgedeckt, und alle Nachbarn kamen zum Helfen. Martha wollte keine einzige Hilfe vergessen. Für jede gute Tat hängte sie ein Hufeisen ans Brett – vergoldet, damit man es nie übersieht. So fing es an.“",
            { kind: "person", person: "wilhelm" },
            "wilhelm",
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Wie alles begann",
        doc: {
          style: "note",
          label: "Fundstück 16",
          title: "Wilhelms Geschichte",
          lines: ["Ein Sturm deckte das Scheunendach ab.", "Alle Nachbarn halfen.", "Für jede gute Tat: ein goldenes Hufeisen am Brett.", "So begann die Hufeisenweihnacht."],
        },
      },
      message: "Quiz gewonnen! Jetzt weißt du, wie die Hufeisenweihnacht angefangen hat.",
    },
    teaser: "Morgen probiert ihr Marthas Code am Schloss der Kiste aus.",
  },

  /* ------------------------------------------------------------------ 17 */
  {
    day: 17,
    title: "Das Rätsel der alten Sattelkammer",
    game: "code",
    chapter: {
      scene: "sattelkammer",
      cast: ["ben", "mila", "lea", "wilhelm"],
      paragraphs: [
        "Die alte Kiste steht seit Tagen in der Sattelkammer, zwischen den Sätteln und den Putzkisten. Jeden Tag streichen die Kinder einmal über das eingebrannte Hufeisen auf dem Deckel. Heute haben sie Marthas Brief dabei.",
        "„Der Code steht nicht auf Papier. Er steht im Stall“, liest Mila vor. „Die Kerzen am Kranz. Die Gangarten meiner Fanny. Die Ohren, die immer zuhören.“",
        "„Drei Hinweise, drei Rädchen“, sagt Ben. „Jeder Hinweis ist eine Zahl!“ Lea nickt. „Martha wollte, dass nur jemand die Kiste öffnet, der den Stall und die Pferde wirklich kennt. Jemand, der hinschaut.“",
        "Wilhelm lehnt im Türrahmen. Er tut so, als würde er Trensen sortieren, aber er lässt die Kinder keine Sekunde aus den Augen.",
        "Die Kinder überlegen. Sie schauen hinaus zum Adventskranz am Giebel. Sie denken an das Pferdequiz. Und sie schauen Tonga an, die gerade beide Ohren in ihre Richtung dreht.",
        "Mit klopfendem Herzen dreht Ben das erste Rädchen.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "code",
        title: "Der Zahlencode",
        steps: [
          {
            type: "code",
            id: "d17-schloss",
            prompt: "Löse Marthas drei Rätsel. Jede Antwort ist eine Zahl für das Schloss.",
            digits: [
              {
                riddle: "Die Kerzen am Kranz: Wie viele Kerzen hat ein Adventskranz?",
                visual: { kind: "tag", text: "Advent" },
                answer: 4,
                hint: "Für jeden Adventssonntag wird eine Kerze angezündet. Wie viele Adventssonntage gibt es?",
              },
              {
                riddle: "Die Gangarten meiner Fanny: Wie viele Grundgangarten hat ein Pferd?",
                visual: { kind: "horse", horse: "tivoli" },
                answer: 3,
                hint: "Denk an das Pferdequiz: Schritt, …",
              },
              {
                riddle: "Die Ohren, die immer zuhören: Wie viele Ohren hat ein Pferd?",
                visual: { kind: "head", horse: "tonga", mood: "neugierig" },
                answer: 2,
                hint: "Schau dir Tonga an – zähl einfach nach!",
              },
            ],
            success: "4 – 3 – 2. Klick! Das alte Schloss springt auf.",
          },
          storyStep(
            "d17-kiste",
            "In der Kiste liegen zwei alte Messinglaternen und eine Liste. Und ein großes Bündel, eingewickelt in eine alte Wolldecke und mit rotem Band verschnürt. Am Band hängt ein Schild: „Erst am Heiligen Abend öffnen.“ Die Kinder sehen sich an – und legen das Bündel vorsichtig zurück. Ein Versprechen ist ein Versprechen.",
            {
              kind: "doc",
              doc: {
                style: "list",
                title: "Was wir an Heiligabend brauchen",
                lines: ["Lichter für den Stall", "Tannengrün und Sterne", "ein Geschenk für jedes Pferd", "warme Decken für die Menschen", "alle zusammen"],
              },
            },
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Die Liste aus der Kiste",
        doc: {
          style: "list",
          label: "Fundstück 17",
          title: "Was wir an Heiligabend brauchen",
          lines: ["Lichter für den Stall", "Tannengrün und Sterne", "ein Geschenk für jedes Pferd", "warme Decken für die Menschen", "alle zusammen"],
        },
      },
      message: "Die Kiste ist offen! Das Bündel bleibt bis Heiligabend verschnürt.",
    },
    teaser: "Morgen geht ihr mit Krümel auf Weihnachtsmission. Er findet mehr, als ihr denkt.",
  },

  /* ------------------------------------------------------------------ 18 */
  {
    day: 18,
    title: "Krümels Weihnachtsmission",
    game: "find",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["ben", "mila", "kruemel"],
      paragraphs: [
        "Die Liste aus der Kiste hängt jetzt am Brett, gleich neben den goldenen Hufeisen. „Lichter für den Stall. Tannengrün und Sterne. Ein Geschenk für jedes Pferd“, liest Ben. „Das schaffen wir!“",
        "Die Kinder haben eine Mission: Alles zusammensuchen, was für Heiligabend gebraucht wird. Krümel hat beschlossen, dass er der Missionsleiter ist. Er rennt vorneweg, schnüffelt in jede Ecke und bringt den Kindern Dinge – manchmal sogar die richtigen.",
        "Mila hat eine Lichterkette entdeckt, Ben einen Tannenzweig, und Krümel schleppt stolz eine Rolle rotes Schleifenband an, das schon ziemlich angesabbert ist.",
        "Dann verschwindet Krümel in Richtung Werkstatt. Wilhelms Werkstatt, in die die Kinder eigentlich nicht dürfen. Kurz darauf kommt er zurück, schwanzwedelnd, und legt den Kindern etwas vor die Füße: einen Pinsel. Seine Borsten sind golden. Goldfarbe! Und sie ist noch ganz frisch.",
        "Mila hebt den Pinsel hoch und schaut zum Brett mit den goldenen Hufeisen. Dann schaut sie Ben an. Ben schaut Mila an.",
        "„Das“, sagt Ben langsam, „ist ein Beweisstück.“",
        "Hilf den Kindern, alle Dinge für die Mission zu finden!",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "find",
        title: "Weihnachtsmission",
        steps: [
          findGame(
            "d18-mission",
            "wh-mission",
            "Finde alles für das Weihnachtsfest: Tannenzweig, Lichterkette, Laterne, Schleifenband, Möhren – und das Beweisstück von Krümel.",
            [
              { id: "zweig", label: "Tannenzweig", spot: mission.zweig, say: "Ein Tannenzweig für den Stallschmuck – aus der Hecke, nicht von der giftigen Eibe!" },
              { id: "lichter", label: "Lichterkette", spot: mission.lichter, say: "Die LED-Lichterkette steckt im Eimer. Die wird nicht heiß – perfekt für den Stall." },
              { id: "laterne", label: "Laterne", spot: mission.laterne, say: "Eine Laterne auf dem Fensterbrett. Die bekommt ein LED-Licht." },
              { id: "band", label: "Schleifenband", spot: mission.band, say: "Das rote Schleifenband – ein bisschen angesabbert, aber noch gut." },
              { id: "moehren", label: "Möhren", spot: mission.moehren, say: "Ein Korb Möhren. Daraus werden kleine Weihnachtsgeschenke für die Pferde." },
              { id: "pinsel", label: "Goldener Pinsel", spot: mission.pinsel, say: "Ein Pinsel mit frischer Goldfarbe – aus Wilhelms Werkstatt!" },
            ],
            [],
            "Da ist nichts für die Mission. Schau dich in der Stallgasse um!",
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Der goldene Pinsel",
        doc: {
          style: "note",
          label: "Fundstück 18",
          title: "Beweisstück",
          lines: ["Ein Pinsel mit frischer Goldfarbe.", "Krümel hat ihn aus Wilhelms Werkstatt geholt.", "Wer vergoldet hier heimlich Hufeisen?"],
        },
      },
      message: "Mission erfüllt! Und der Pinsel ist eine heiße Spur.",
    },
    teaser: "Morgen bereitet ihr die Pferde vor – und schmiedet einen geheimen Plan.",
  },

  /* ------------------------------------------------------------------ 19 */
  {
    day: 19,
    title: "Die richtige Winterpflege",
    game: "decision",
    chapter: {
      scene: "ht-stallbox",
      cast: ["lea", "mila", "ben", "hanna", "scrabble"],
      paragraphs: [
        "Heute hat Tilda die Pferde zum ersten Mal an den Lichtern auf dem Reitplatz vorbeigeführt. Ganz langsam, Schritt für Schritt. Tonga hat nur kurz geschaut, Tivoli hat an einer Laterne geschnuppert, und Scrabble ist so lange stehen geblieben, bis er alles genau angesehen hatte. Danach durften die Kinder bei der Pflege helfen.",
        "Während Ben Scrabble trockenreibt, flüstert Lea den anderen zu: „Ich habe nachgedacht. Auf der Liste steht ‚alle zusammen‘. Und auf dem Foto waren alle vom Hof dabei. Aber jemand fehlt.“",
        "„Martha“, sagt Mila leise.",
        "Am Nachmittag gehen die drei zu Hanna ins Büro. Sie erzählen ihr alles: vom ersten Hufeisen, vom Brett, von der Kiste und von ihrer Idee. Hanna hört zu, und ihre Augen werden ganz feucht.",
        "„Ihr wollt Oma Martha zu Heiligabend in den Stall einladen?“ Hanna holt tief Luft. „Ich hole sie ab. Mit dem Auto, ganz bequem. Und ich bringe einen warmen Sessel in den Stall.“ Sie legt einen Finger auf die Lippen. „Aber kein Wort zu Wilhelm. Das wird eine Überraschung.“",
        "Die Kinder schreiben die Einladung gemeinsam, in ihrer schönsten Schrift. Und dann ist da noch die Arbeit mit den Pferden.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "decision",
        title: "Winterpflege-Entscheidungen",
        steps: decisionGame("d19", [
          {
            situation: "Scrabble ist nach dem Lichter-Training am Hals verschwitzt. Draußen sind es 2 Grad. Was ist richtig?",
            visual: { kind: "horse", horse: "scrabble" },
            choices: [
              { label: "Abschwitzdecke auflegen und im Schritt trockenführen", best: true, feedback: "Genau so!" },
              { label: "Sofort auf die Weide, dort trocknet er schon", feedback: "Mit nassem Fell im kalten Wind kann Scrabble sich erkälten." },
              { label: "Eine dicke Winterdecke über das nasse Fell", feedback: "Unter einer dichten Decke bleibt das Fell nass. Erst trocknen, dann – wenn überhaupt nötig – eine Decke." },
            ],
            why: "Eine Abschwitzdecke lässt die Feuchtigkeit nach außen. Erst wenn das Fell trocken ist, geht Scrabble zurück auf den Paddock.",
          },
          {
            situation: "Tonga ist nicht geschoren, hat dickes Winterfell und steht trocken im Unterstand. Braucht Tonga heute eine Decke?",
            visual: { kind: "horse", horse: "tonga" },
            choices: [
              { label: "Ja, weil Winter ist", feedback: "Winter allein ist kein Grund. Tongas eigenes Fell wärmt gut." },
              { label: "Nein – das dicke Winterfell reicht, aber wir schauen regelmäßig nach", best: true, feedback: "Richtig!" },
              { label: "Ja, zwei Decken übereinander", feedback: "Viel zu warm! Tonga würde darunter schwitzen und dann frieren." },
            ],
            why: "Gesunde, ungeschorene Pferde mit dichtem Winterfell brauchen meist keine Decke. Ob ein Pferd friert, entscheiden Erwachsene, die sich auskennen.",
          },
          {
            situation: "In Tivolis Wassereimer schwimmt eine dünne Eisschicht. Was tust du?",
            visual: { kind: "item", name: "eimer" },
            choices: [
              { label: "Eis herausnehmen und frisches Wasser einfüllen", best: true, feedback: "Super!" },
              { label: "Ein Leckerli ins Wasser werfen, dann trinkt er schon", feedback: "Durch Eis kommt auch Tivoli nicht gut ans Wasser – und Leckerli gehören nicht in den Eimer." },
              { label: "Den Eimer wegräumen, bis es wärmer ist", feedback: "Pferde müssen immer trinken können – Tag und Nacht." },
            ],
            why: "Wasser muss immer erreichbar sein. Im Winter schaut man mehrmals am Tag nach, ob es gefroren ist.",
          },
          {
            situation: "Nach der Runde auf dem matschigen Reitplatz sind alle Hufe voller Matsch. Was jetzt?",
            visual: { kind: "item", name: "hufkratzer" },
            choices: [
              { label: "Nichts, der Matsch fällt von allein ab", feedback: "Matsch in den Hufen kann zu Huferkrankungen führen. Er muss raus." },
              { label: "Hufe auskratzen und anschauen, ob alles gesund ist", best: true, feedback: "Genau!" },
              { label: "Hufe mit heißem Wasser waschen", feedback: "Heißes Wasser braucht kein Huf. Auskratzen reicht – und Hinschauen." },
            ],
            why: "Hufe täglich auskratzen und kontrollieren. Riecht ein Huf schlecht oder ist er heiß, sagt man es einem Erwachsenen.",
          },
        ]),
      },
    ],
    reward: {
      found: {
        title: "Die Einladung an Oma Martha",
        doc: {
          style: "note",
          label: "Fundstück 19",
          title: "Liebe Martha,",
          lines: [
            "wir haben dein erstes Hufeisen gefunden.",
            "Bitte komm an Heiligabend in den Stall.",
            "Wir machen die Hufeisenweihnacht – alle zusammen.",
            "Deine Lea, Mila und Ben (und Krümel)",
          ],
        },
      },
      message: "Die Pferde sind bestens versorgt. Und die Einladung ist unterwegs – psst, nichts zu Wilhelm!",
    },
    teaser: "Morgen gestaltest du eine Weihnachtskarte für Tivoli – und es kommt Post zurück.",
  },

  /* ------------------------------------------------------------------ 20 */
  {
    day: 20,
    title: "Ein Geschenk für Tivoli",
    game: "card",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["mila", "tivoli", "hanna"],
      paragraphs: [
        "Heute ist der vierte Advent. Auf der Liste steht: „Ein Geschenk für jedes Pferd.“ Die Kinder haben beschlossen, dass jedes Pferd zwei Geschenke bekommt: etwas zum Knabbern und eine Weihnachtskarte.",
        "„Pferde können doch gar nicht lesen“, sagt Ben.",
        "„Na und?“, sagt Mila. „Tivoli kann schnuppern.“",
        "Für Scrabble backen sie mit Hanna ganz einfache Kekse aus Haferflocken, Möhren und Apfel – ohne Zucker. Für Tonga flechten sie aus Heu einen kleinen Kranz. Und für Tivoli gestalten sie die schönste Karte von allen.",
        "Als Mila die fertige Karte an Tivolis Box hängt, streckt er sofort den Kopf heraus. Er schnuppert an der Karte, dann an Milas Mütze, dann an ihrer Nase. Mila kichert. „Er findet sie schön.“",
        "Am Nachmittag kommt Hanna mit einer Postkarte über den Hof. Sie zwinkert den Kindern zu und reicht ihnen die Karte, ohne ein Wort zu sagen. Die Schrift ist geschwungen und ein bisschen zittrig. Genau die gleiche Schrift wie im allerersten Brief.",
        "Doch zuerst die Karte für Tivoli – jetzt bist du dran!",
      ],
    },
    parts: [
      {
        kind: "card",
        title: "Gestalte Tivolis Weihnachtskarte",
        intro: "Wähle Papier, Bild, Rahmen und einen Gruß. Deine Karte hängt danach an Tivolis Box in deinem Weihnachtsstall.",
      },
    ],
    reward: {
      found: {
        title: "Post von Martha",
        doc: {
          style: "note",
          label: "Fundstück 20",
          title: "Postkarte",
          lines: ["Ihr Lieben,", "ich komme.", "Ich bringe etwas mit.", "– M."],
        },
      },
      message: "Tivoli liebt deine Karte. Und Martha kommt!",
    },
    teaser: "Morgen weht ein Sturm – und das Brett mit den Hufeisen fällt herunter.",
  },

  /* ------------------------------------------------------------------ 21 */
  {
    day: 21,
    title: "Die verlorenen Hufeisen",
    game: "find",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["lea", "ben", "kruemel", "wilhelm"],
      paragraphs: [
        "In der Nacht hat der Wind um den Stall geheult. Den Pferden ging es gut – sie standen ruhig in ihren Boxen und kauten Heu. Aber das Stallgassentor ist aufgesprungen und hat gegen die Wand geschlagen. Genau gegen die Wand, an der das alte Brett hängt.",
        "Am Morgen hängen nur noch vierzehn goldene Hufeisen am Brett. Sechs sind heruntergefallen und durch die ganze Stallgasse gekullert. Krümel hat die Sache nicht besser gemacht: Er hat versucht, eins zu apportieren.",
        "„Keine Panik“, sagt Lea. „Wir finden sie alle.“",
        "Die Kinder suchen überall: unter dem Heu, in der Putzkiste, auf dem Fensterbrett, im Eimer und hinter der Futtertonne. Eins nach dem anderen hängen sie die Hufeisen zurück an ihre Nägel.",
        "Das letzte Hufeisen liegt unter dem alten Sattelschrank, genau da, wo am ersten Dezember alles angefangen hat. Ben dreht es um. Auf der Rückseite ist etwas eingeritzt: ein kleines W.",
        "In diesem Moment kommt Wilhelm in die Stallgasse. Er sieht Ben mit dem Hufeisen, sieht das W, sieht den goldenen Pinsel, der noch neben dem Brett liegt. Und er sagt – nichts. Er lächelt nur und hilft, das Brett wieder ganz fest anzuschrauben.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "find",
        title: "Suchbild: sechs Hufeisen",
        steps: [
          findGame(
            "d21-suchbild",
            "wh-hufeisen",
            "Sechs goldene Hufeisen sind heruntergefallen. Findest du sie alle?",
            [
              { id: "h1", label: "Hufeisen beim Heu", spot: shoes.h1, say: "Eins lag am Heuballen!" },
              { id: "h2", label: "Hufeisen in der Putzkiste", spot: shoes.h2, say: "Zwischen den Bürsten in der Putzkiste!" },
              { id: "h3", label: "Hufeisen auf dem Fensterbrett", spot: shoes.h3, say: "Auf dem Fensterbrett – hoch gesprungen!" },
              { id: "h4", label: "Hufeisen an der Futtertonne", spot: shoes.h4, say: "Hinter der Futtertonne versteckt!" },
              { id: "h5", label: "Hufeisen im Eimer", spot: shoes.h5, say: "Mitten im Eimer beim Besen!" },
              { id: "h6", label: "Hufeisen unter dem Schrank", spot: shoes.h6, say: "Unter dem alten Sattelschrank – und hinten ist ein W eingeritzt!" },
            ],
            [{ id: "glueck", label: "Glückshufeisen", spot: shoes.glueck, say: "Das ist Tivolis Glückshufeisen aus Eisen. Das ist nicht heruntergefallen." }],
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Das Hufeisen mit dem W",
        doc: {
          style: "note",
          label: "Fundstück 21",
          title: "Rückseite eines Hufeisens",
          lines: ["Eingeritzt: W", "Dazu der goldene Pinsel aus der Werkstatt.", "Wilhelm hat nur gelächelt."],
        },
      },
      message: "Alle Hufeisen hängen wieder. Und die Spuren zeigen alle in eine Richtung …",
    },
    teaser: "Morgen gehen am Hof die Lichter an.",
  },

  /* ------------------------------------------------------------------ 22 */
  {
    day: 22,
    title: "Die Lichter am Hof",
    game: "decorate",
    chapter: {
      scene: "wh-hof",
      cast: ["mila", "tilda", "tivoli", "tonga"],
      paragraphs: [
        "Zwei Tage vor Heiligabend wird der Hof zum Leuchten gebracht. Tilda steht auf der Leiter und hängt Lichterketten an die Dachkante – hoch oben, wo kein Pferd hinkommt. Ben reicht ihr die Kabelbinder, Mila hält die Leiter fest.",
        "Marthas alte Messinglaternen aus der Kiste haben neue LED-Lichter bekommen. Sie leuchten fast so warm wie echte Kerzen. Die kleine Tanne neben dem Stall bekommt Kugeln aus Holz und eine eigene Lichterkette.",
        "Dann kommt der wichtigste Teil: Tilda führt die Pferde nacheinander am Licht vorbei. Ganz ruhig, ohne Eile. Wenn ein Pferd stehen bleiben und schauen möchte, darf es das. Tonga geht gelassen vorbei, als hätte es nie etwas anderes gemacht. Tivoli streckt die Nase zur Laterne und schnuppert. Scrabble bleibt eine ganze Minute stehen, dann seufzt er tief und geht weiter.",
        "„Seht ihr?“, sagt Tilda. „Pferde brauchen Zeit. Wer ihnen Zeit gibt, bekommt Vertrauen geschenkt.“",
        "Als es dunkel wird, stehen alle auf dem Hof und schauen. Der Stall leuchtet. Die Pferde kauen ihr Heu. Und Wilhelm steht ganz hinten und wischt sich verstohlen etwas aus dem Auge. „Fast wie früher“, sagt er.",
        "Jetzt ist dein Stall dran!",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "decision",
        title: "Lichter und Pferde",
        steps: decisionGame("d22", [
          {
            situation: "Wie gewöhnt man ein Pferd an neue Lichter?",
            choices: [
              { label: "Ganz langsam vorbeiführen und schauen lassen", best: true, feedback: "Genau!" },
              { label: "Schnell daran vorbeireiten, dann merkt es nichts", feedback: "Pferde merken alles. Wenn sie erschrecken, brauchen sie Zeit – nicht Tempo." },
              { label: "Die Lichter blinken lassen, damit es lustiger ist", feedback: "Blinken kann Pferde erschrecken. Ruhiges, warmes Licht ist viel besser." },
            ],
            why: "Pferde sind Fluchttiere. Neue Dinge lernen sie in Ruhe kennen – mit einem ruhigen Menschen an ihrer Seite.",
          },
          {
            situation: "Wo gehört das Kabel der Lichterkette hin?",
            choices: [
              { label: "Quer über die Stallgasse am Boden", feedback: "Darüber kann man stolpern – und Pferde könnten darauf treten oder daran knabbern." },
              { label: "Hoch und gut befestigt, außer Reichweite der Pferde", best: true, feedback: "Richtig!" },
              { label: "In die Box, damit es dort auch hell ist", feedback: "In der Box würden die Pferde am Kabel knabbern. Das ist gefährlich." },
            ],
            why: "Kabel und Lichter immer hoch und fest anbringen – kein Pferdemaul und kein Huf darf drankommen.",
          },
        ]),
      },
      {
        kind: "decorate",
        title: "Mach Licht in deinem Stall",
        intro: "Neu: die festliche Beleuchtung und der Weihnachtsbaum mit Lichtern.",
        goal: { required: ["lichterkette", "baum-lichter"], task: "Hänge die festliche Beleuchtung auf und stelle den leuchtenden Weihnachtsbaum neben den Stall." },
      },
    ],
    reward: {
      found: {
        title: "Der Lichterritt-Plan",
        doc: {
          style: "list",
          label: "Fundstück 22",
          title: "Heiligabend, 16 Uhr",
          lines: ["Lichterritt: eine Runde im Schritt", "Tilda führt, alle laufen mit", "Danach: Bescherung im Stall", "Das Bündel öffnen – gemeinsam"],
        },
      },
      message: "Der Hof leuchtet – und dein Stall auch!",
    },
    teaser: "Morgen ganz früh legt ihr euch auf die Lauer. Wer hängt die Hufeisen auf?",
  },

  /* ------------------------------------------------------------------ 23 */
  {
    day: 23,
    title: "Der letzte Hinweis",
    game: "cipher",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["lea", "mila", "ben", "wilhelm"],
      paragraphs: [
        "Es ist sechs Uhr morgens und stockdunkel. Lea, Mila und Ben sitzen in der Futterkammer, eingekuschelt in Pferdedecken, und spähen durch einen Spalt in der Tür. Hanna hat es erlaubt, unter einer Bedingung: Sie bringt heißen Tee.",
        "Um Viertel nach sechs geht das Licht in der Stallgasse an. Schritte. Gummistiefel. Eine grüne Schiebermütze. Wilhelm geht zum Brett, holt ein goldenes Hufeisen aus der Jackentasche und hängt es an den zweiundzwanzigsten Nagel. Dann streicht er einmal über alle Hufeisen, wie über eine Mähne.",
        "Die Kinder kommen aus ihrem Versteck. Wilhelm erschrickt nicht einmal. „Ich dachte mir schon, dass ihr heute kommt“, sagt er.",
        "Dann erzählt er. Wie Martha in die Stadt gezogen ist. Wie er allein nicht weitermachen wollte. Wie er das erste Hufeisen und Marthas alten Brief zweiundzwanzig Jahre lang in seiner Schublade aufbewahrt hat. „Und dann kamt ihr. Drei Kinder, die Pferde so lieben wie Martha. Da habe ich das Brett unter dem Schrank gelockert und gehofft, dass ihr sucht.“",
        "„Jede Nacht hast du ein Hufeisen vergoldet“, flüstert Mila.",
        "Wilhelm nickt. Dann holt er das Bündel aus der Kiste und dreht das Schild am roten Band um. Auf der Rückseite stehen Zeichen. Die Geheimschrift der Stallmeister. „Das hat Martha geschrieben“, sagt er. „Ich konnte es nie allein lesen. Es ist für euch.“",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "cipher",
        title: "Das finale Rätsel",
        steps: [
          {
            type: "cipher",
            id: "d23-schild",
            cipher: "stallmeister",
            prompt: "Entschlüssle Marthas letzte Nachricht auf dem Schild am Bündel.",
            message: "NUR ALLE ZUSAMMEN",
            given: "AE",
            hint: "Schau auf die Wände des Kästchens – und ob ein Punkt darin ist.",
            success: "„Nur alle zusammen.“ Das Bündel darf erst geöffnet werden, wenn wirklich alle da sind.",
          },
          storyStep(
            "d23-alle",
            "Die Kinder sehen sich an. Alle zusammen – das heißt: Hanna, Tilda, Wilhelm, die Pferde, Krümel, die Kinder. Und Martha. Wilhelm weiß noch nicht, dass Martha kommt. Morgen ist Heiligabend.",
            { kind: "scene", scene: "wh-hof" },
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Das Schild am Bündel",
        doc: {
          style: "note",
          label: "Fundstück 23",
          title: "Rückseite des Schilds",
          lines: ["In Stallmeister-Schrift:", "NUR ALLE ZUSAMMEN", "Gelöst: Wilhelm hat die Hufeisen aufgehängt – jede Nacht eins."],
        },
      },
      message: "Das Geheimnis ist fast gelüftet. Morgen ist Heiligabend!",
    },
    teaser: "Morgen ist Heiligabend auf dem Winterhof.",
  },

  /* ------------------------------------------------------------------ 24 */
  {
    day: 24,
    title: "Weihnachten bei Hofgeschichten",
    game: "finale",
    chapter: {
      scene: "wh-hof",
      cast: ["lea", "mila", "ben", "kruemel", "wilhelm", "hanna", "tilda", "tivoli", "scrabble", "tonga"],
      paragraphs: [
        "Heiligabend. Um vier Uhr wird es dunkel, und der Hof leuchtet. Die Lichterketten glitzern an der Dachkante, Marthas Laternen schimmern warm, und an Tivolis Box hängt die Weihnachtskarte.",
        "Tilda führt die Pferde zum Lichterritt auf den Reitplatz. Eine ruhige Runde im Schritt, die Kinder laufen nebenher, Krümel trägt seine rote Festtagsschleife. Tonga geht vorneweg, gelassen wie immer.",
        "Als sie zurückkommen, steht ein Auto auf dem Hof. Hanna öffnet die Tür, und eine kleine Frau mit weißem Haar und einem dicken Schal steigt aus. Sie stützt sich auf einen Stock und schaut zum leuchtenden Stall.",
        "Wilhelm bleibt mitten in der Stallgasse stehen. „Martha“, sagt er. Mehr nicht. Martha lächelt. „Hallo, Willi. Du hast das Brett aufgehängt gelassen.“",
        "Dann sitzen alle im Stall zusammen, auf Strohballen und in Hannas warmem Sessel, mit Decken und heißem Kinderpunsch. Martha nickt den Kindern zu, und Lea löst das rote Band.",
        "Im Bündel liegt ein dickes Buch. Auf dem Umschlag steht: „Das Hufeisenbuch“. Auf jeder Seite stehen Wünsche, Erinnerungen und gute Taten – Jahr für Jahr. „Hans hat das Dach repariert.“ „Willi hat die ganze Nacht bei Fanny gewacht.“ „Wunsch: Dass alle gesund bleiben.“",
        "Auf der letzten Seite steht in Marthas Schrift: „Für die Kinder, die eines Tages das erste Hufeisen finden: Jetzt seid ihr dran.“",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "quiz",
        title: "Das letzte Rätsel",
        intro: "Bevor das 24. Hufeisen ans Brett kommt, stellt Martha den Kindern eine letzte Frage.",
        steps: [
          multiQuiz(
            "d24-buch",
            "Was gehört in das Hufeisenbuch? Tippe alles Richtige an und prüfe.",
            [
              { label: "Wünsche", correct: true },
              { label: "Hausaufgaben", feedback: "Die gehören ins Schulheft, nicht ins Hufeisenbuch." },
              { label: "Erinnerungen", correct: true },
              { label: "Gute Taten", correct: true },
              { label: "Einkaufslisten", feedback: "Die braucht man im Laden – nicht im Hufeisenbuch." },
            ],
            "Da fehlt noch etwas! Denk an die Regeln der Hufeisenweihnacht.",
            "Genau! Wünsche, Erinnerungen und gute Taten. Ein Hufeisen bringt kein Glück durch Zauberei, sagt Martha – sondern weil jemand etwas Gutes getan hat.",
          ),
          ...quizGame("d24", [
            {
              q: "Wer hat jede Nacht ein goldenes Hufeisen ans Brett gehängt?",
              visual: { kind: "person", person: "wilhelm" },
              options: [
                { label: "Hanna", feedback: "Hanna hat bei der Überraschung für Martha geholfen – aber die Hufeisen waren nicht von ihr." },
                { label: "Wilhelm", correct: true },
                { label: "Krümel", feedback: "Krümel hat nur den Pinsel gebracht. Aufhängen kann er nichts." },
              ],
              explain: "Richtig! Wilhelm hat jede Nacht ein Hufeisen vergoldet und für jede gute Tat der Kinder eins aufgehängt.",
            },
            {
              q: "Und wer ist M.?",
              options: [
                { label: "Mila", feedback: "Mila ist eine der Detektivinnen – aber M. hat den Brief vor langer Zeit geschrieben." },
                { label: "Martha, Hannas Oma", correct: true },
                { label: "Mats", feedback: "Mats ist Stallhelfer – der Brief ist aber viel älter." },
              ],
              explain: "Genau! Martha Lindner hat die Hufeisenweihnacht erfunden – und heute ist sie wieder im Stall.",
            },
          ]),
          storyStep(
            "d24-brett",
            "Martha reicht Lea das vierundzwanzigste goldene Hufeisen. Lea hängt es an den letzten Nagel. Das Brett ist voll. Die Kinder schreiben ihre eigene erste Seite ins Hufeisenbuch – vierundzwanzig gute Taten aus diesem Dezember. Und Wilhelm bekommt ein Hufeisen mit einem W, das ihm ganz allein gehört.",
            { kind: "scene", scene: "wh-stallgasse" },
          ),
        ],
      },
      {
        kind: "stall",
        title: "Dein Weihnachtsstall",
        intro: "So leuchtet dein Weihnachtsstall an Heiligabend – mit allem, was du im Advent geschmückt hast. Hier feiern alle zusammen.",
      },
      {
        kind: "message",
        title: "Frohe Weihnachten vom Winterhof",
        paragraphs: [
          "Später am Abend, als die Pferde zufrieden ihr Heu kauen und Krümel in Marthas Schoß eingeschlafen ist, sagt Martha leise: „Ich habe die Tradition nie vergessen. Ich wusste nur nicht, ob jemand sie weiterträgt.“",
          "Wilhelm lächelt. „Jetzt sind es drei“, sagt er und schaut Lea, Mila und Ben an. „Und alle, die mit ihnen gesucht haben.“",
          "Das bist du. Du hast 24 Tage lang geholfen, gerätselt, geschmückt und Pferde besser verstanden. Jede gute Tat ist ein goldenes Hufeisen – auch die kleinen. Auch die, die niemand sieht.",
          "Frohe Weihnachten von Lea, Mila, Ben, Krümel, Tivoli, Tonga, Scrabble, Wilhelm, Tilda, Hanna – und Martha.",
        ],
      },
      { kind: "certificate", title: "Deine Weihnachtsurkunde" },
    ],
    reward: {
      found: {
        title: "Das Hufeisenbuch",
        doc: {
          style: "note",
          label: "Fundstück 24",
          title: "Letzte Seite, in Marthas Schrift",
          lines: ["Für die Kinder, die eines Tages", "das erste Hufeisen finden:", "Jetzt seid ihr dran."],
        },
      },
      message: "Das Geheimnis des Winterhofs ist gelüftet. Frohe Weihnachten!",
    },
    teaser: "",
  },
];
