import "server-only";
import { WH_SPOTS } from "@/components/illustrations/advent/AdventScenes";
import { decisionGame, findGame, matchGame, multiQuiz, quizGame, storyStep } from "./games";
import type { AdventDoor } from "./types";

/**
 * Türchen 1–12 – „Das Geheimnis des Winterhofs“.
 * Nur serverseitig laden (Premium-Inhalt, Datumssperre in app/adventskalender/[tag]).
 */

const brief = WH_SPOTS.brief;
const muetze = WH_SPOTS.muetze;

export const doors1: AdventDoor[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    day: 1,
    title: "Der geheimnisvolle Brief",
    game: "find",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["lea", "mila", "ben", "kruemel", "wilhelm"],
      paragraphs: [
        "Am ersten Dezembermorgen riecht der Hof nach Heu, nach kalter Luft und ein kleines bisschen nach Tannenzweigen. Lea, Mila und Ben sind schon früh auf dem Hof, denn heute dürfen sie Wilhelm, dem Stallmeister, helfen, die Stallgasse für die Adventszeit fertig zu machen.",
        "Ben fegt, Mila füllt Heunetze, und Lea bürstet Tivoli die Stirn, bis er zufrieden die Augen schließt. Nur Krümel, der junge Hofhund, hat etwas ganz anderes vor. Er schnüffelt am alten Sattelschrank, kratzt am untersten Brett und fiept leise.",
        "„Krümel, da wohnen höchstens Mäuse“, lacht Ben. Doch dann sieht Mila es auch: Unter dem losen Brett blinkt etwas. Etwas Goldenes.",
        "Gleichzeitig entdeckt Lea hinter dem alten Holzbrett an der Wand, das voller Nägel steckt, eine zusammengerollte Papierrolle mit einem roten Band. Das Papier ist vergilbt, die Schrift geschwungen und ein bisschen verblasst.",
        "Wilhelm kommt mit der Schubkarre um die Ecke. Als er sieht, was die Kinder in den Händen halten, bleibt er stehen. Er nimmt seine grüne Schiebermütze ab und dreht sie langsam in den Händen. „Das ist lange her“, murmelt er. Mehr sagt er nicht.",
        "Was steht in dem Brief? Und warum lächelt Wilhelm plötzlich so seltsam?",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "find",
        title: "Was glitzert in der Stallgasse?",
        steps: [
          findGame(
            "d1-suche",
            "wh-brief",
            "Finde das goldene Hufeisen und die Papierrolle mit dem roten Band. Tippe sie an!",
            [
              { id: "hufeisen", label: "Goldenes Hufeisen", spot: brief.hufeisen, say: "Da ist es! Ein Hufeisen, so golden wie eine Weihnachtskugel – unter dem losen Brett versteckt." },
              { id: "brief", label: "Papierrolle", spot: brief.brief, say: "Eine alte Papierrolle mit rotem Band, hinter das Brett geklemmt. Ein Brief!" },
            ],
            [
              { id: "glueck", label: "Glückshufeisen", spot: brief.glueck, say: "Das ist Tivolis Glückshufeisen aus Eisen. Es hängt schon immer da. Wir suchen ein goldenes!" },
              { id: "tonne", label: "Futtertonne", spot: brief.tonne, say: "In der Futtertonne ist nur Müsli für die Pferde. Schau woanders!" },
            ],
          ),
          storyStep(
            "d1-brief",
            "Mila liest den Brief laut vor. Ihre Stimme wird dabei ganz leise.",
            {
              kind: "doc",
              doc: {
                style: "note",
                title: "Für die, die es finden",
                lines: [
                  "Wer dieses Hufeisen findet, hat ein Herz für Pferde.",
                  "Ein Hufeisen allein ist nur ein Stück Eisen.",
                  "Vierundzwanzig zusammen sind ein Fest.",
                  "Jeden Tag eins – bis zum Heiligen Abend.",
                  "– M.",
                ],
              },
            },
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Der Brief von M.",
        doc: {
          style: "note",
          label: "Fundstück 1",
          title: "Für die, die es finden",
          lines: ["Ein Hufeisen allein ist nur ein Stück Eisen.", "Vierundzwanzig zusammen sind ein Fest.", "Jeden Tag eins – bis zum Heiligen Abend. – M."],
        },
      },
      message: "Das erste goldene Hufeisen gehört dir. Wer ist M.? Das Geheimnis hat begonnen.",
    },
    teaser: "Morgen ist Tivoli ganz flauschig – und Ben zählt etwas an der Wand.",
  },

  /* ------------------------------------------------------------------ 2 */
  {
    day: 2,
    title: "Tivolis Kuschelfell",
    game: "quiz",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["mila", "ben", "tivoli", "wilhelm"],
      paragraphs: [
        "„Tivoli sieht aus wie ein Teddybär“, kichert Mila. Seit ein paar Wochen wächst dem Schecken ein dickes, weiches Winterfell. Wenn Mila ihre Finger hineinschiebt, verschwinden sie fast bis zum Knöchel. Tivoli dreht den Kopf und schnuppert neugierig an ihrer Jacke – so sagt er Hallo.",
        "Beim Putzen merken die Kinder, wie viele Haare aus der Bürste fliegen. Wilhelm erklärt ihnen, warum ein Pferd im Winter kein Mantel aus dem Schrank braucht, sondern einen eigenen wachsen lässt.",
        "Ben hört nur halb zu. Er steht vor dem alten Holzbrett an der Wand, hinter dem gestern der Brief steckte. „Das sind ganz schön viele Nägel“, sagt er und fängt an zu zählen. Drei Reihen. Acht Nägel in jeder Reihe. „Vierundzwanzig!“, ruft er. „Genau wie im Brief!“",
        "Lea holt das goldene Hufeisen aus ihrer Jackentasche. Sie schaut Wilhelm fragend an. Der Stallmeister zuckt mit den Schultern, aber seine Augen funkeln. „Hängt es ruhig auf“, sagt er. „Da gehört es hin.“",
        "Vorsichtig hängt Lea das Hufeisen an den allerersten Nagel. Es glänzt im Licht der Stalllampe. Dreiundzwanzig Nägel sind noch leer.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "quiz",
        title: "Winterfell-Wissen",
        intro: "Hilf Wilhelm, den Kindern das Winterfell zu erklären.",
        steps: quizGame("d2", [
          {
            q: "Warum hält Tivolis dickes Winterfell so schön warm?",
            visual: { kind: "horse", horse: "tivoli" },
            options: [
              { label: "Weil es innen geheizt wird", feedback: "Ein Fell hat keine Heizung. Das Geheimnis ist die Luft zwischen den Haaren." },
              { label: "Weil zwischen den vielen Haaren warme Luft gefangen ist", correct: true },
              { label: "Weil es nass ist", feedback: "Nasses Fell wärmt sogar schlechter. Trocken und flauschig wärmt es am besten." },
            ],
            explain: "Richtig! Zwischen den Haaren bleibt warme Luft hängen – wie bei einer dicken Daunenjacke. Pferde können die Haare sogar aufstellen, dann wird die Luftschicht noch dicker.",
          },
          {
            q: "Wann beginnt das Winterfell zu wachsen?",
            options: [
              { label: "Im Herbst, wenn die Tage kürzer werden", correct: true },
              { label: "Erst, wenn Schnee liegt", feedback: "Das wäre zu spät! Das Fell braucht Wochen zum Wachsen. Und Schnee gibt es ja nicht jeden Winter." },
              { label: "Am Geburtstag des Pferdes", feedback: "Schöne Idee – aber der Körper merkt am Tageslicht, dass der Winter kommt." },
            ],
            explain: "Genau! Der Pferdekörper merkt, dass die Tage kürzer werden. Dann wächst das Winterfell – ganz egal, ob es draußen schon kalt ist.",
          },
          {
            q: "Braucht jedes Pferd im Winter eine Decke?",
            options: [
              { label: "Ja, immer, sonst friert es", feedback: "Gesunde Pferde mit dickem Winterfell frieren meist nicht. Zu viel Decke kann sie sogar schwitzen lassen." },
              { label: "Nein – nur manche, zum Beispiel geschorene, alte oder kranke Pferde", correct: true },
              { label: "Nur Pferde mit weißem Fell", feedback: "Die Fellfarbe ist egal. Wichtig ist, wie dick das Fell ist und wie es dem Pferd geht." },
            ],
            explain: "Richtig! Ein gesundes Pferd mit Winterfell kommt gut ohne Decke aus. Geschorene, sehr alte oder kranke Pferde bekommen eine – das entscheiden Erwachsene, die sich auskennen.",
          },
          {
            q: "Tivoli ist nach dem Reiten unter dem dicken Fell verschwitzt. Was tun?",
            options: [
              { label: "Sofort auf die kalte Weide schicken", feedback: "Mit nassem Fell könnte Tivoli auskühlen. Erst muss er trocken werden." },
              { label: "Trockenführen und mit Stroh oder Handtuch trocken reiben", correct: true },
              { label: "Mit kaltem Wasser abspritzen", feedback: "Im Winter bloß nicht! Das Fell würde noch nasser und Tivoli würde frieren." },
            ],
            explain: "Super! Im Schritt trockenführen, mit Stroh oder einem Handtuch abreiben – und erst wenn das Fell trocken ist, darf Tivoli wieder raus.",
          },
        ]),
      },
    ],
    reward: {
      found: {
        title: "Das Brett mit 24 Nägeln",
        doc: {
          style: "list",
          label: "Fundstück 2",
          title: "Bens Notiz",
          lines: ["Altes Brett in der Stallgasse", "3 Reihen × 8 Nägel = 24", "Nagel 1: unser goldenes Hufeisen", "Wilhelm: „Da gehört es hin.“"],
        },
      },
      message: "Du weißt jetzt, wie Winterfell wärmt – und das erste Hufeisen hängt am Brett.",
    },
    teaser: "Morgen früh hängt am Brett etwas, das gestern Abend noch nicht da war.",
  },

  /* ------------------------------------------------------------------ 3 */
  {
    day: 3,
    title: "Krümels verschwundene Mütze",
    game: "find",
    chapter: {
      scene: "wh-hof",
      cast: ["ben", "lea", "kruemel"],
      paragraphs: [
        "Als die Kinder am Morgen in die Stallgasse kommen, bleibt Lea wie angewurzelt stehen. Am alten Brett hängen jetzt zwei goldene Hufeisen. Eins am ersten Nagel – und eins am zweiten.",
        "„Wer war das?“, flüstert Mila. Niemand weiß es. Gestern Abend war das zweite Hufeisen noch nicht da.",
        "Bevor sie darüber nachdenken können, ruft Ben: „Meine Mütze! Wo ist meine Mütze?“ Er hatte sie nur kurz auf den Heuballen gelegt, um Scrabble die Mähne zu kämmen. Jetzt ist sie weg.",
        "Lea muss nicht lange überlegen. Draußen auf dem Hof flitzt ein heller Fellball hin und her, die Ohren fliegen, der Schwanz wedelt wie verrückt. Krümel! Wenn Krümel etwas klaut, versteckt er es immer irgendwo auf dem Hof – und zwar so, dass er es selbst nicht mehr findet.",
        "Die Kinder gehen hinaus. Die Luft ist frisch, auf dem Boden glitzert der Raureif. Krümel bellt fröhlich und buddelt in der Ecke beim Zaun. Seine Pfoten sind voller Erde. „Was hast du denn da ausgegraben?“, fragt Ben.",
        "Hilf den Kindern: Wo hat Krümel die Mütze versteckt – und was hat er beim Buddeln gefunden?",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "find",
        title: "Suchspiel auf dem Hof",
        steps: [
          findGame(
            "d3-suche",
            "wh-muetze",
            "Finde Bens Mütze und das, was Krümel ausgegraben hat.",
            [
              { id: "muetze", label: "Bens Mütze", spot: muetze.muetze, say: "Da ist Bens Mütze – mitten im Heuballen! Krümel, du kleiner Dieb." },
              { id: "dose", label: "Alte Blechdose", spot: muetze.dose, say: "Eine alte rote Blechdose! Krümel hat sie in der Ecke ausgebuddelt." },
            ],
            [
              { id: "handschuh", label: "Handschuh", spot: muetze.handschuh, say: "Das ist Tildas Arbeitshandschuh. Den hat Krümel zum Glück liegen lassen." },
              { id: "schal", label: "Schal", spot: muetze.schal, say: "Ein Schal – aber der gehört Mila. Wir suchen eine Mütze!" },
            ],
          ),
          storyStep(
            "d3-foto",
            "In der Dose liegt ein altes Foto. Es zeigt den Stall an einem Winterabend. Viele Menschen halten Laternen. Und das Brett in der Stallgasse ist voller goldener Hufeisen! Auf der Rückseite steht: „Heiligabend – alle zusammen.“",
            { kind: "item", name: "foto" },
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Das alte Foto",
        doc: {
          style: "note",
          label: "Fundstück 3",
          title: "Rückseite des Fotos",
          lines: ["Heiligabend – alle zusammen.", "(Vorne: der Stall mit Laternen. Das Brett ist voller goldener Hufeisen.)"],
        },
      },
      message: "Mütze gerettet! Und das Foto beweist: Früher war das Brett voller goldener Hufeisen.",
    },
    teaser: "Morgen wird geputzt – und in der Putzkiste wartet ein kleiner Zettel.",
  },

  /* ------------------------------------------------------------------ 4 */
  {
    day: 4,
    title: "Die große Putz-Challenge",
    game: "match",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["lea", "mila", "ben", "scrabble", "tilda"],
      paragraphs: [
        "Drei goldene Hufeisen hängen jetzt am Brett. Jeden Morgen eins mehr. Die Kinder haben beschlossen, Detektive zu sein – aber gute Detektive sind auch gute Stallhelfer.",
        "„Heute ist große Putz-Challenge“, verkündet Tilda, die Reitlehrerin, und zieht ihr orangefarbenes Halstuch zurecht. „Alle Pferde sollen glänzen. Und die alte Putzkiste muss endlich aufgeräumt werden.“",
        "Scrabble, der große Hannoveraner, steht geduldig in der Stallgasse und lässt sich striegeln. Er ist so groß, dass Ben auf einen Tritt steigen muss, um an seinen Rücken zu kommen. Trotzdem ist Scrabble der Verschmusteste auf dem Hof: Er legt Ben ganz sanft den Kopf auf die Schulter.",
        "Mila räumt die Putzkiste aus. Bürsten, Striegel, Kämme, Hufkratzer – alles durcheinander. Ganz unten liegt eine alte Pappe als Boden. Als Mila sie anhebt, rutscht ein kleiner, vergilbter Zettel heraus.",
        "„Mein Wunsch: Dass Fanny wieder gesund wird“, liest sie vor. Darunter steht nur ein einzelner Buchstabe: W.",
        "„Wer ist Fanny?“, fragt Lea. „Und wer ist W.?“ Tilda zuckt mit den Schultern. „Ein Pferd namens Fanny gibt es hier nicht.“",
        "Aber zuerst: Welches Putzzeug ist wofür da?",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "match",
        title: "Putzzeug zuordnen",
        steps: [
          matchGame(
            "d4-putzen",
            "Ordne jedes Putzzeug seiner Aufgabe zu. Ziehe es hin oder tippe erst das Putzzeug, dann die Aufgabe an.",
            [
              { id: "dreck", label: "Lockert Schmutz und Haare – in kreisenden Bewegungen" },
              { id: "staub", label: "Bürstet den Staub aus dem Fell – mit dem Strich" },
              { id: "hufe", label: "Holt Steine und Matsch aus den Hufen" },
              { id: "maehne", label: "Entwirrt Mähne und Schweif" },
            ],
            [
              { id: "striegel", label: "Striegel", visual: { kind: "item", name: "striegel" }, target: "dreck", say: "Genau! Mit dem Striegel kreist man über das Fell. Das lockert Schmutz – und Scrabble findet es wie eine Massage." },
              { id: "buerste", label: "Kardätsche", visual: { kind: "item", name: "buerste" }, target: "staub", say: "Richtig! Die weiche Kardätsche bürstet den gelockerten Staub heraus – immer in Haarrichtung." },
              { id: "hufkratzer", label: "Hufkratzer", visual: { kind: "item", name: "hufkratzer" }, target: "hufe", say: "Super! Hufe auskratzen ist im Winter besonders wichtig, weil sich Matsch darin sammelt." },
              { id: "kamm", label: "Mähnenkamm", visual: { kind: "item", name: "kamm" }, target: "maehne", say: "Richtig! Am besten unten anfangen und Strähne für Strähne vorsichtig entwirren." },
            ],
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Der Wunschzettel von W.",
        doc: {
          style: "note",
          label: "Fundstück 4",
          title: "Zettel aus der Putzkiste",
          lines: ["Mein Wunsch:", "Dass Fanny wieder gesund wird.", "– W."],
        },
      },
      message: "Alle Pferde glänzen! Und es gibt eine neue Spur: Wer ist Fanny – und wer ist W.?",
    },
    teaser: "Morgen geht es auf die Winterweide – Tonga steht dort an einem alten Holzbalken.",
  },

  /* ------------------------------------------------------------------ 5 */
  {
    day: 5,
    title: "Tonga und die Winterweide",
    game: "decision",
    chapter: {
      scene: "ht-weide",
      cast: ["lea", "tonga", "tilda"],
      paragraphs: [
        "Auf der Winterweide ist es still. Das Gras ist kurz und grau vom Frost, nur unter den alten Eichen ist der Boden weich und matschig. Tonga steht am Unterstand und kaut gemütlich Heu.",
        "Tonga ist das ruhigste Pferd auf dem ganzen Hof. Wer neben Tonga steht, wird selbst ganz ruhig. Lea legt ihre Hand auf Tongas warmen Hals und atmet tief ein und aus. Tonga spielt mit einem Ohr in ihre Richtung, als würde es zuhören.",
        "Tilda hat den Kindern eine Aufgabe gegeben: „Ihr seid heute die Weide-Wächter. Schaut, ob es den Pferden draußen an nichts fehlt.“",
        "Während Ben das Wasser kontrolliert, entdeckt Lea etwas am Holzbalken des Unterstands. Jemand hat dort vor langer Zeit etwas eingeschnitzt: ein kleines Hufeisen – und daneben die Buchstaben M + F.",
        "„M wie in dem Brief!“, ruft Lea. „Und F wie Fanny?“",
        "Tilda kommt näher und betrachtet die Schnitzerei. „Hanna hat mir mal erzählt, dass der Hof früher ihrer Oma gehört hat“, sagt sie nachdenklich. „Die hieß Martha. Martha Lindner.“",
        "M wie Martha? Die Kinder sehen sich an. Doch erst einmal sind sie Weide-Wächter.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "decision",
        title: "Weide-Wächter im Winter",
        intro: "Was ist die beste Entscheidung für die Pferde?",
        steps: decisionGame("d5", [
          {
            situation: "Auf der Wassertränke liegt eine Eisschicht. Was tust du?",
            choices: [
              { label: "Das Eis entfernen und frisches Wasser auffüllen – mit Tilda zusammen", best: true, feedback: "Genau so!" },
              { label: "Nichts – die Pferde können ja Schnee oder Raureif lecken", feedback: "Davon bekommt kein Pferd genug zu trinken. Pferde brauchen auch im Winter viele Liter frisches Wasser am Tag." },
              { label: "Warten, bis die Sonne das Eis schmilzt", feedback: "Das kann den ganzen Tag dauern – so lange dürfen die Pferde nicht ohne Wasser sein." },
            ],
            why: "Pferde müssen immer an Wasser kommen, auch wenn es friert. Viele trinken lieber, wenn das Wasser nicht eiskalt ist.",
          },
          {
            situation: "Auf der Winterweide wächst kaum noch Gras. Was brauchen die Pferde?",
            choices: [
              { label: "Nichts, sie fressen dann einfach weniger", feedback: "Pferde müssen fast den ganzen Tag kauen – ohne Futter wird ihr Bauch krank." },
              { label: "Heu auf der Weide oder im Unterstand", best: true, feedback: "Richtig!" },
              { label: "Viele Äpfel und Brot", feedback: "Zu viel Obst und Brot ist ungesund für Pferde. Ein paar Apfelstücke sind ein Leckerli, kein Futter." },
            ],
            why: "Heu ist im Winter das wichtigste Futter. Beim Verdauen entsteht sogar Wärme – Heu ist also die Heizung von innen.",
          },
          {
            situation: "Es weht ein kalter Wind und fängt an zu nieseln. Tonga hat dickes Winterfell. Was ist jetzt wichtig?",
            choices: [
              { label: "Tonga sofort eine dicke Decke anziehen", feedback: "Mit dickem Winterfell braucht Tonga meist keine Decke. Darunter könnte es sogar schwitzen." },
              { label: "Dass Tonga in den Unterstand gehen kann, wenn es möchte", best: true, feedback: "Ganz genau!" },
              { label: "Tonga in die Stallgasse holen und dort anbinden", feedback: "Pferde stehen lieber draußen in Bewegung, wenn sie Schutz suchen können. Den Unterstand finden sie selbst." },
            ],
            why: "Ein Unterstand schützt vor Wind und Regen. Pferde entscheiden selbst, wann sie hineingehen – und das Fell bleibt trocken und warm.",
          },
        ]),
      },
    ],
    reward: {
      found: {
        title: "Die Schnitzerei am Unterstand",
        doc: {
          style: "note",
          label: "Fundstück 5",
          title: "Am Holzbalken eingeschnitzt",
          lines: ["Ein kleines Hufeisen und: M + F", "Tilda: „Der Hof gehörte früher Hannas Oma – Martha Lindner.“"],
        },
      },
      message: "Die Pferde haben alles, was sie brauchen. Und M. hat jetzt vielleicht einen Namen: Martha.",
    },
    teaser: "Morgen ist Nikolaus! Stellt eure Stiefel in die Stallgasse …",
  },

  /* ------------------------------------------------------------------ 6 */
  {
    day: 6,
    title: "Nikolaus im Stall",
    game: "quiz",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["mila", "ben", "lea", "kruemel", "hanna"],
      paragraphs: [
        "Am Abend vorher haben die Kinder ihre Stiefel in die Stallgasse gestellt – blank geputzt, natürlich. Hanna, der der Hof gehört, hat gelächelt und gesagt: „Mal sehen, ob der Nikolaus auch in Ställe kommt.“",
        "Und wie er kommt! Am Morgen sind die Stiefel gefüllt: Mandarinen, Nüsse, ein Schokoladen-Nikolaus für jeden. Vor jeder Box steht ein kleiner Eimer mit Möhrenstückchen, und an Krümels Körbchen liegt ein Hundekeks in Sternform.",
        "Am Brett hängen jetzt fünf goldene Hufeisen. Und darunter steht ein Stiefel, den die Kinder noch nie gesehen haben: ein alter, roter Gummistiefel, viel zu groß für sie. In ihm steckt eine Papierrolle.",
        "Ben zieht sie heraus. Es ist ein altes Blatt, an einer Seite abgerissen. Oben steht in derselben geschwungenen Schrift wie im ersten Brief: „Die Regeln der Hufeisenweihnacht.“",
        "„Hufeisenweihnacht!“, flüstert Mila. „So heißt das Geheimnis!“",
        "Die Kinder lesen die ersten beiden Regeln. Die dritte ist mitten im Satz abgerissen. Ausgerechnet die wichtigste, findet Lea.",
        "Doch jetzt wollen erst einmal die Pferde ihre Nikolaus-Überraschung. Aber Vorsicht: Nicht alles, was Kindern schmeckt, ist gut für Pferde.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "quiz",
        title: "Was darf in den Pferde-Stiefel?",
        steps: [
          multiQuiz(
            "d6-stiefel",
            "Tippe alles an, was Pferde als kleines Nikolaus-Leckerli bekommen dürfen. Dann prüfen.",
            [
              { label: "Möhrenstückchen", correct: true, visual: { kind: "item", name: "karotte" } },
              { label: "Schokolade", feedback: "Schokolade ist für Pferde (und Hunde!) ungesund. Die bleibt bei den Kindern.", visual: { kind: "item", name: "schokolade" } },
              { label: "Apfelstückchen", correct: true, visual: { kind: "item", name: "apfel" } },
              { label: "Bonbons", feedback: "Zucker und Bonbons gehören nicht ins Pferdemaul – sie kleben und schaden dem Bauch.", visual: { kind: "item", name: "bonbon" } },
              { label: "Lebkuchen", feedback: "Lebkuchen ist viel zu süß und gewürzt für Pferde.", visual: { kind: "item", name: "kuchen" } },
            ],
            "Da fehlt noch etwas Gesundes für die Pferde!",
            "Richtig! Ein paar Möhren- und Apfelstücke sind ein tolles Leckerli – klein geschnitten, damit sich niemand verschluckt, und nur in kleinen Mengen.",
          ),
        ],
      },
      {
        kind: "surprise",
        title: "Nikolaus-Überraschung",
        intro: "Drei Stiefel stehen noch in der Stallgasse. Tippe sie an!",
        boxes: [
          { owner: "tivoli", label: "Tivolis Eimer", reveal: "Drei Möhrenstückchen – und ein Zettel: „Für den besten Schnüffler des Hofs.“" },
          { owner: "kruemel", label: "Krümels Körbchen", reveal: "Ein Hundekeks in Sternform. Krümel wedelt so doll, dass sein ganzer Po wackelt." },
          { owner: "du", label: "Dein Stiefel", reveal: "Ein silberner Nikolausstern für dein Fundbuch – und die halbe Seite mit den Regeln der Hufeisenweihnacht." },
        ],
      },
    ],
    reward: {
      found: {
        title: "Die Regeln der Hufeisenweihnacht",
        doc: {
          style: "note",
          label: "Fundstück 6",
          title: "Die Regeln der Hufeisenweihnacht",
          lines: [
            "1. Jeden Tag eine gute Tat – für ein Pferd oder einen Menschen.",
            "2. Für jede gute Tat ein goldenes Hufeisen.",
            "3. Am Heiligen Abend …",
            "(Hier ist das Blatt abgerissen.)",
          ],
        },
      },
      message: "Frohen Nikolaus! Das Geheimnis hat einen Namen: die Hufeisenweihnacht.",
    },
    teaser: "Morgen räumt ihr die Sattelkammer auf – und hinter Scrabbles Sattel glänzt ein Schild.",
  },

  /* ------------------------------------------------------------------ 7 */
  {
    day: 7,
    title: "Das richtige Sattelzeug",
    game: "match",
    chapter: {
      scene: "sattelkammer",
      cast: ["ben", "mila", "tilda", "wilhelm"],
      paragraphs: [
        "„Für Weihnachten habe ich einen Plan“, sagt Tilda und zwinkert. „Aber dafür muss die Sattelkammer tipptopp sein.“ Was für ein Plan, verrät sie nicht.",
        "In der Sattelkammer riecht es nach Leder und Sattelseife. Jedes Pferd hat seinen eigenen Sattelhalter, seinen eigenen Haken für die Trense und einen für das Halfter. Ben und Mila putzen das Leder, bis es glänzt, und hängen alles an den richtigen Platz.",
        "Als Ben Scrabbles schweren Sattel herunterhebt, entdeckt er dahinter an der Wand ein kleines Schild aus Messing. Es ist dunkel angelaufen. Mila reibt mit dem Ärmel darüber, bis die Buchstaben zu sehen sind: FANNY.",
        "„Fanny!“, rufen beide gleichzeitig.",
        "Tilda schaut sich das Schild an. „Das muss das Pferd von früher sein. Hier stand also einmal Fannys Sattel.“",
        "In diesem Moment kommt Wilhelm herein. Sein Blick fällt auf das Messingschild, und er wird ganz still. Eine Weile sagt niemand etwas. Dann greift Wilhelm in seine Jackentasche und holt ein zusammengefaltetes, abgegriffenes Papier heraus.",
        "„Wenn ihr schon sucht“, brummt er, „dann wenigstens richtig.“ Er legt das Papier auf die Sattelkiste – und geht wieder hinaus.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "match",
        title: "Ausrüstung zuordnen",
        steps: [
          matchGame(
            "d7-sattelzeug",
            "Wohin gehört welches Teil? Ordne jedes Stück der Ausrüstung zu.",
            [
              { id: "ruecken", label: "Liegt auf dem Pferderücken" },
              { id: "kopf-reiten", label: "Am Kopf – zum Reiten, mit Gebiss und Zügeln" },
              { id: "kopf-fuehren", label: "Am Kopf – zum Führen und Anbinden" },
              { id: "bauch", label: "Läuft unter dem Bauch und hält den Sattel fest" },
              { id: "fuesse", label: "Hier stehen die Füße der Reiterin" },
            ],
            [
              { id: "sattel", label: "Sattel", visual: { kind: "item", name: "sattel" }, target: "ruecken", say: "Genau! Der Sattel liegt auf dem Rücken – er muss gut passen, damit nichts drückt." },
              { id: "trense", label: "Trense", visual: { kind: "item", name: "ak-trense" }, target: "kopf-reiten", say: "Richtig! An der Trense sind die Zügel befestigt. Mit ihr reitet man." },
              { id: "halfter", label: "Halfter", visual: { kind: "item", name: "halfter" }, target: "kopf-fuehren", say: "Super! Mit dem Halfter und einem Strick führt man ein Pferd oder bindet es an." },
              { id: "gurt", label: "Sattelgurt", visual: { kind: "item", name: "ak-gurt" }, target: "bauch", say: "Richtig! Den Gurt zieht man langsam und vorsichtig an – Stück für Stück." },
              { id: "buegel", label: "Steigbügel", visual: { kind: "item", name: "ak-buegel" }, target: "fuesse", say: "Genau! In den Steigbügeln stehen die Füße – nur mit der Fußspitze, nie mit dem ganzen Fuß hinein." },
            ],
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Das Messingschild",
        doc: {
          style: "note",
          label: "Fundstück 7",
          title: "Hinter Scrabbles Sattel",
          lines: ["Ein altes Messingschild: FANNY", "Hier hing einmal Fannys Sattel.", "Wilhelm hat uns ein Papier dagelassen."],
        },
      },
      message: "Die Sattelkammer glänzt. Fanny war also wirklich ein Pferd dieses Hofs.",
    },
    teaser: "Morgen faltet ihr Wilhelms Papier auf – am Rand steht eine Geheimschrift.",
  },

  /* ------------------------------------------------------------------ 8 */
  {
    day: 8,
    title: "Wilhelms alte Stallkarte",
    game: "cipher",
    chapter: {
      scene: "wh-stallgasse",
      cast: ["lea", "mila", "ben", "wilhelm"],
      paragraphs: [
        "Wilhelms Papier ist eine Karte. Eine alte, mit Bleistift gezeichnete Karte des ganzen Hofs: der Stall mit den Boxen, die Sattelkammer, die Weiden, der Reitplatz und das Heulager hinter der Scheune. In der Ecke steht in krakeliger Jugendschrift: „Gezeichnet von Willi, 16 Jahre“.",
        "„Willi?“, fragt Ben. „Ist das … Wilhelm?“",
        "Am Rand der Karte stehen seltsame Zeichen: kleine Winkel, Kästchen, Pfeilspitzen, manche mit einem Punkt darin. Keine Buchstaben, keine Zahlen.",
        "Die Kinder laufen zu Wilhelm, der gerade die Heunetze füllt. „Was bedeuten die Zeichen?“, fragt Lea.",
        "Wilhelm schiebt sich den Bleistift hinters Ohr und lacht leise. „Das ist die Geheimschrift der Stallmeister. Die hat mir jemand beigebracht, als ich so alt war wie ihr.“ Er zeichnet mit dem Finger ein Gitter in die Luft. „Jeder Buchstabe wohnt in einem Kästchen. Das Zeichen zeigt dir die Wände seines Kästchens.“",
        "Mehr hilft er nicht. „Detektive müssen selbst knobeln“, sagt er nur.",
        "Die Kinder setzen sich auf eine Futterkiste, legen die Karte auf ihre Knie und beginnen zu entschlüsseln.",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "cipher",
        title: "Die Geheimschrift der Stallmeister",
        steps: [
          {
            type: "cipher",
            id: "d8-karte",
            cipher: "stallmeister",
            prompt: "Tippe ein Zeichen an und wähle den passenden Buchstaben aus dem Schlüssel. Gleiche Zeichen füllen sich von selbst aus.",
            message: "SUCHT IM HEULAGER",
            given: "SHE",
            hint: "Schau genau: Wie sieht das Kästchen aus? Hat das Zeichen einen Punkt?",
            success: "Geschafft! Am Rand der Karte steht: „Sucht im Heulager.“",
          },
          storyStep(
            "d8-wilhelm",
            "Als die Kinder Wilhelm die Lösung zeigen, nickt er langsam. „Ins Heulager geht ihr aber nicht allein“, sagt er. „Die Ballen sind schwer. Bald – versprochen.“",
            { kind: "person", person: "wilhelm" },
            "wilhelm",
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Wilhelms Stallkarte",
        doc: {
          style: "note",
          label: "Fundstück 8",
          title: "Gezeichnet von Willi, 16 Jahre",
          lines: ["Alte Karte des Hofs mit Bleistift", "Am Rand in Geheimschrift:", "SUCHT IM HEULAGER"],
        },
      },
      message: "Geheimschrift geknackt! Das nächste Ziel ist das Heulager.",
    },
    teaser: "Morgen bindet ihr einen Adventskranz – und Wilhelm verplappert sich.",
  },

  /* ------------------------------------------------------------------ 9 */
  {
    day: 9,
    title: "Der Weihnachtskranz",
    game: "decorate",
    chapter: {
      scene: "wh-hof",
      cast: ["mila", "lea", "tilda", "wilhelm"],
      paragraphs: [
        "Im Wohnhaus hängt schon seit dem ersten Advent ein Kranz. Nur der Stall sieht noch aus wie an jedem anderen Tag. „Das ändern wir heute“, sagt Tilda und schleppt einen Korb voller Tannenzweige herbei. Die Zweige sind beim Auslichten der Hecke übrig geblieben.",
        "Zusammen binden die Kinder einen großen Kranz. Mila wickelt den Draht, Lea steckt rote Beeren aus Holz dazwischen, und Tilda bringt vier Kerzen mit. Keine echten Kerzen, sondern welche mit kleinen LED-Lichtern. „Echtes Feuer hat im Stall nichts zu suchen“, erklärt sie. „Heu und Stroh brennen viel zu schnell.“",
        "Wilhelm steht an der Tür und schaut zu. Als der Kranz fertig ist und die vier kleinen Lichter leuchten, sagt er leise: „Martha hat immer gesagt: Licht im Stall machen nicht die Kerzen. Sondern die Menschen, die zusammenhalten.“",
        "Die Kinder fahren herum. „Martha?“, ruft Lea. „Martha Lindner? Hannas Oma?“",
        "Wilhelm wird ein bisschen rot unter seiner Mütze. Dann nickt er. „Ja. Martha. Sie hat mir alles beigebracht, was ich über Pferde weiß.“ Er räuspert sich. „Den Rest erzähle ich, wenn die Zeit reif ist.“",
        "Jetzt muss der Kranz aufgehängt werden. Aber wo ist der beste Platz?",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "decision",
        title: "Wohin mit dem Kranz?",
        steps: decisionGame("d9", [
          {
            situation: "Wo hängt der Adventskranz am besten?",
            choices: [
              { label: "Direkt an Tivolis Boxentür", feedback: "Tivoli würde sofort daran knabbern! Tannennadeln und Draht gehören nicht ins Pferdemaul." },
              { label: "Hoch oben am Giebel, wo kein Pferd hinkommt", best: true, feedback: "Perfekt!" },
              { label: "Über dem Heuballen", feedback: "Am Heu hat Schmuck mit Licht nichts zu suchen – und die Pferde fressen dort." },
            ],
            why: "Im Stall gilt: Deko immer außerhalb der Reichweite der Pferdemäuler. Pferde sind neugierig und probieren alles mit den Lippen.",
          },
          {
            situation: "Welche Lichter dürfen auf den Kranz?",
            choices: [
              { label: "LED-Kerzen", best: true, feedback: "Genau richtig!" },
              { label: "Echte Wachskerzen – die sind gemütlicher", feedback: "Im Stall nie! Eine Flamme kann Heu und Stroh in Sekunden entzünden." },
              { label: "Wunderkerzen", feedback: "Funken im Stall sind gefährlich – für Pferde und Menschen." },
            ],
            why: "Offenes Feuer ist in Ställen verboten. LED-Lichter werden nicht heiß und können nichts anzünden.",
          },
        ]),
      },
      {
        kind: "decorate",
        title: "Deine erste Stall-Dekoration",
        intro: "Dein eigener Weihnachtsstall bekommt seinen ersten Schmuck.",
        goal: { required: ["adventskranz"], task: "Hänge den Adventskranz an den Giebel." },
      },
    ],
    reward: {
      found: {
        title: "Marthas Spruch",
        doc: {
          style: "note",
          label: "Fundstück 9",
          title: "Wilhelm hat sich verplappert",
          lines: ["„Licht im Stall machen nicht die Kerzen.", "Sondern die Menschen, die zusammenhalten.“", "M. ist Martha Lindner – Hannas Oma."],
        },
      },
      message: "Dein Stall hat seinen ersten Schmuck. Und M. hat jetzt einen ganzen Namen.",
    },
    teaser: "Morgen verbringt ihr den Tag mit Scrabble – und zählt noch einmal die Hufeisen.",
  },

  /* ------------------------------------------------------------------ 10 */
  {
    day: 10,
    title: "Scrabbles Wintertag",
    game: "quiz",
    chapter: {
      scene: "ht-stallbox",
      cast: ["ben", "scrabble", "wilhelm"],
      paragraphs: [
        "Scrabble ist das größte Pferd auf dem Hof. Wenn er den Kopf hebt, reicht er fast bis an die Stalllampe. Trotzdem ist er so sanft, dass er beim Fressen vorsichtig um Krümel herum schnuppert, wenn der wieder einmal durch die Stallgasse tappt.",
        "Heute hilft Ben dem Stallmeister bei Scrabbles Winter-Check. Wilhelm schaut sich die Hufe an, tastet die Beine ab und guckt, ob Scrabble genug trinkt. „Im Winter trinken manche Pferde zu wenig“, erklärt er. „Das merkt man nicht sofort. Darum schauen wir jeden Tag hin.“",
        "Als Scrabble fertig ist, legt er seinen riesigen Kopf auf Bens Schulter und pustet ihm warme Luft ins Ohr. Ben lacht so laut, dass Tonga in der Nachbarbox die Ohren spitzt.",
        "Später stehen die Kinder vor dem Brett. Neun goldene Hufeisen. „Ist euch was aufgefallen?“, fragt Mila. „Es ist jeden Morgen genau eins mehr. Immer nach einem Tag, an dem wir geholfen haben.“",
        "„Jemand beobachtet uns“, flüstert Ben.",
        "Lea holt ihr Notizbuch heraus. Wer hat einen Schlüssel für die Stallgasse und ist ganz früh am Morgen schon da? Sie schreibt drei Namen auf.",
        "Aber zuerst: Was gehört zu einem guten Winter-Check?",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "quiz",
        title: "Scrabbles Winter-Check",
        steps: quizGame("d10", [
          {
            q: "Wie viel Wasser trinkt ein großes Pferd wie Scrabble ungefähr an einem Tag?",
            visual: { kind: "item", name: "eimer" },
            options: [
              { label: "Ein Glas", feedback: "Viel zu wenig! Pferde sind groß und brauchen viel Wasser." },
              { label: "Ungefähr 30 bis 50 Liter – mehrere Eimer voll", correct: true },
              { label: "Im Winter gar nichts", feedback: "Auch im Winter brauchen Pferde jeden Tag viel Wasser – sonst bekommen sie Bauchweh." },
            ],
            explain: "Richtig! Ein großes Pferd trinkt mehrere Eimer am Tag. Darum muss die Tränke jeden Tag kontrolliert werden.",
          },
          {
            q: "Warum ist Heu im Winter so wichtig?",
            visual: { kind: "item", name: "heu" },
            options: [
              { label: "Weil beim Verdauen von Heu Wärme entsteht", correct: true },
              { label: "Weil Heu nach Weihnachten duftet", feedback: "Es duftet gut – aber der wichtige Grund ist ein anderer." },
              { label: "Weil Pferde sich darauf schlafen legen", feedback: "Zum Liegen ist die Einstreu da. Heu ist zum Fressen." },
            ],
            explain: "Genau! Wenn Pferde Heu verdauen, entsteht Wärme im Bauch. Heu ist sozusagen ihre Heizung von innen.",
          },
          {
            q: "Wie oft sollte man die Hufe im Winter auskratzen?",
            visual: { kind: "item", name: "hufkratzer" },
            options: [
              { label: "Einmal im Monat", feedback: "Zu selten! In nassem Matsch können die Hufe krank werden." },
              { label: "Jeden Tag – und nach dem Reiten", correct: true },
              { label: "Nur, wenn Schnee liegt", feedback: "Matsch und Nässe gibt es im Winter fast immer, auch ohne Schnee." },
            ],
            explain: "Richtig! Jeden Tag auskratzen und schauen, ob alles gesund aussieht. Riecht ein Huf schlecht, sagt man einem Erwachsenen Bescheid.",
          },
          {
            q: "Muss Scrabble sich auch im Winter bewegen?",
            visual: { kind: "horse", horse: "scrabble" },
            options: [
              { label: "Nein, im Winter halten Pferde Winterschlaf", feedback: "Pferde halten keinen Winterschlaf – das machen Igel und Siebenschläfer." },
              { label: "Ja, jeden Tag – auf der Weide, dem Paddock oder beim Reiten", correct: true },
              { label: "Nur an Weihnachten", feedback: "Pferde sind Lauftiere. Sie brauchen jeden Tag Bewegung, damit Beine und Bauch gesund bleiben." },
            ],
            explain: "Genau! Pferde sind Lauftiere und brauchen jeden Tag Bewegung – auch wenn es kalt und matschig ist.",
          },
        ]),
      },
    ],
    reward: {
      found: {
        title: "Leas Verdächtigen-Liste",
        doc: {
          style: "list",
          label: "Fundstück 10",
          title: "Wer hängt die Hufeisen auf?",
          lines: ["Jeden Morgen eins mehr – nach jeder guten Tat.", "Wer hat einen Schlüssel?", "☐ Hanna   ☐ Tilda   ☐ Wilhelm"],
        },
      },
      message: "Scrabble ist fit für den Winter. Und die Detektive haben drei Verdächtige.",
    },
    teaser: "Morgen findet ihr Spuren im Sand – und sie führen zu etwas Großem.",
  },

  /* ------------------------------------------------------------------ 11 */
  {
    day: 11,
    title: "Die geheimnisvollen Hufspuren",
    game: "match",
    chapter: {
      scene: "wh-hof",
      cast: ["lea", "ben", "kruemel"],
      paragraphs: [
        "In der Nacht hat es geregnet. Der Weg zwischen Stall und Scheune ist weich wie Kuchenteig, und überall sind Abdrücke zu sehen. „Perfekt für Detektive“, sagt Ben und hockt sich hin.",
        "Da sind große runde Abdrücke mit einem Rand – die stammen von einem Pferd mit Hufeisen. Daneben kleinere, ohne Rand. Kleine Pfotenabdrücke, die im Zickzack laufen, das kann nur Krümel sein. Und dann sind da noch Schuhabdrücke: schmale Reitstiefel und große, grobe Gummistiefel.",
        "Lea folgt den Gummistiefel-Spuren. Sie führen nicht zum Stall und nicht zur Weide, sondern geradewegs zum Heulager hinter der Scheune. Dort hören sie hinter den Ballen auf.",
        "Diesmal holen die Kinder Wilhelm, wie versprochen. Er seufzt, nimmt seine Mütze ab und hilft ihnen, zwei Heuballen zur Seite zu rollen.",
        "Dahinter steht eine Kiste. Eine alte Holzkiste mit Eisenbeschlägen. Auf dem Deckel ist ein Hufeisen eingebrannt und darunter ein Datum: 24.12. Vorne hängt ein Zahlenschloss mit drei kleinen Rädchen.",
        "„Die Spuren waren von dir, Wilhelm“, stellt Ben fest. Wilhelm brummt nur: „Ich wollte nachsehen, ob sie noch da ist.“ Er trägt die Kiste in die trockene Sattelkammer. Den Code kennt er angeblich nicht.",
        "Aber welche Spur gehört zu wem?",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "match",
        title: "Spuren erkennen",
        steps: [
          matchGame(
            "d11-spuren",
            "Wer hat welche Spur hinterlassen? Ordne die Abdrücke zu.",
            [
              { id: "eisen", label: "Pferd mit Hufeisen – Scrabble" },
              { id: "barhuf", label: "Pferd ohne Hufeisen – Tonga" },
              { id: "hund", label: "Krümel, der Hofhund" },
              { id: "tilda", label: "Tilda in Reitstiefeln" },
              { id: "wilhelm", label: "Wilhelm in Gummistiefeln" },
            ],
            [
              { id: "t-eisen", label: "Runder Abdruck mit Rand", visual: { kind: "track", track: "hufeisen" }, target: "eisen", say: "Richtig! Das Hufeisen hinterlässt einen deutlichen Rand im Matsch." },
              { id: "t-barhuf", label: "Runder Abdruck ohne Rand", visual: { kind: "track", track: "barhuf" }, target: "barhuf", say: "Genau! Tonga läuft barhuf – ohne Eisen. Viele Pferde brauchen keine Hufeisen." },
              { id: "t-hund", label: "Kleine Pfote mit Krallen", visual: { kind: "track", track: "hund" }, target: "hund", say: "Klar – Krümel! Hunde hinterlassen Abdrücke mit kleinen Krallenspitzen." },
              { id: "t-reit", label: "Schmaler Stiefel mit Absatz", visual: { kind: "track", track: "reitstiefel" }, target: "tilda", say: "Richtig! Reitstiefel haben einen Absatz, damit der Fuß nicht durch den Steigbügel rutscht." },
              { id: "t-gummi", label: "Großer Stiefel mit grobem Profil", visual: { kind: "track", track: "gummistiefel" }, target: "wilhelm", say: "Genau! Wilhelms Gummistiefel – und diese Spur führte zum Heulager." },
            ],
          ),
        ],
      },
    ],
    reward: {
      found: {
        title: "Die verschlossene Kiste",
        doc: {
          style: "note",
          label: "Fundstück 11",
          title: "Hinter den Heuballen",
          lines: ["Alte Holzkiste mit Eisenbeschlägen", "Auf dem Deckel: ein Hufeisen und „24.12.“", "Zahlenschloss mit 3 Rädchen", "Jetzt in der Sattelkammer."],
        },
      },
      message: "Spuren gelesen, Kiste gefunden! Jetzt fehlt nur noch der Code.",
    },
    teaser: "Morgen verbringt ihr einen ganzen Tag mit Tilda – und hört von einem besonderen Ritt.",
  },

  /* ------------------------------------------------------------------ 12 */
  {
    day: 12,
    title: "Ein Tag mit Tilda",
    game: "decision",
    chapter: {
      scene: "ht-morgen",
      cast: ["mila", "tilda", "tivoli"],
      paragraphs: [
        "Um halb acht ist es noch fast dunkel, als Mila mit Tilda in den Stall kommt. Die Pferde wiehern leise zur Begrüßung – sie wissen genau, was jetzt kommt: Frühstück.",
        "„Heute bist du meine Stall-Assistentin“, sagt Tilda. „Ein Tag im Stall hat eine feste Reihenfolge. Pferde lieben Routine. Wenn alles jeden Tag ähnlich abläuft, fühlen sie sich sicher.“",
        "Während sie zusammen misten, Wasser kontrollieren und Tivoli auf den Paddock führen, erzählt Tilda von ihrem Plan, den sie letzte Woche nicht verraten wollte. „Hanna hat mir erzählt, dass man hier früher an Heiligabend einen Lichterritt gemacht hat. Eine kleine, ruhige Runde im Schritt über den Reitplatz – mit Laternen und Lichtern.“",
        "Milas Augen leuchten. „Machen wir das auch?“",
        "„Vielleicht“, lächelt Tilda. „Aber nur, wenn die Pferde sich vorher in Ruhe an die Lichter gewöhnen dürfen. Ein Pferd soll sich nie erschrecken müssen.“",
        "Dann fällt ihr noch etwas ein. „Habt ihr gemerkt, dass Wilhelm neuerdings beim Ausmisten pfeift? Das hat er in den ganzen Jahren, die ich hier bin, noch nie gemacht.“",
        "Jetzt zeig, dass du eine gute Stall-Assistentin bist!",
      ],
    },
    parts: [
      {
        kind: "steps",
        game: "decision",
        title: "Stall-Simulation: ein Morgen mit Tilda",
        intro: "Entscheide bei jedem Schritt, was jetzt richtig ist.",
        steps: decisionGame("d12", [
          {
            situation: "7:30 Uhr – die Pferde haben Hunger. Was bekommen sie zuerst?",
            visual: { kind: "item", name: "heu" },
            choices: [
              { label: "Eine große Schüssel Kraftfutter", feedback: "Kraftfutter auf leeren Magen ist nicht gut. Erst muss der Bauch mit Heu arbeiten." },
              { label: "Heu", best: true, feedback: "Richtig, zuerst Heu!" },
              { label: "Gar nichts, erst wird geritten", feedback: "Mit knurrendem Magen reitet es sich nicht gut – Pferde brauchen regelmäßig Futter." },
            ],
            why: "Erst Raufutter wie Heu, dann – wenn ein Pferd es braucht – etwas Kraftfutter. So bleibt der Bauch gesund.",
          },
          {
            situation: "Tivoli steht draußen auf dem Paddock. Du mistest seine Box. Was muss raus?",
            visual: { kind: "item", name: "mistgabel" },
            choices: [
              { label: "Pferdeäpfel und nasse Stellen", best: true, feedback: "Genau!" },
              { label: "Nur die Pferdeäpfel, nasses Stroh ist egal", feedback: "Nasses Stroh riecht scharf und ist schlecht für Lunge und Hufe. Es muss auch raus." },
              { label: "Die ganze Einstreu, jeden Tag", feedback: "So viel muss nicht sein. Saubere, trockene Einstreu darf bleiben – frisches Stroh kommt dazu." },
            ],
            why: "Täglich Äpfel und nasse Stellen herausnehmen, frische Einstreu nachstreuen – so bleibt die Box trocken und gesund.",
          },
          {
            situation: "Das Wasser in Tivolis Selbsttränke kommt nur noch tröpfchenweise. Was tust du?",
            visual: { kind: "item", name: "wasser" },
            choices: [
              { label: "Tilda Bescheid sagen und einen Eimer frisches Wasser hinstellen", best: true, feedback: "Super gemacht!" },
              { label: "Nichts – ein paar Tropfen reichen", feedback: "Bei weitem nicht! Tivoli braucht viele Liter am Tag." },
              { label: "Selbst die Wasserleitung aufschrauben", feedback: "Reparaturen machen Erwachsene. Du hilfst am besten, indem du Bescheid sagst." },
            ],
            why: "Wasser ist lebenswichtig. Wenn etwas nicht stimmt, sofort einem Erwachsenen sagen.",
          },
          {
            situation: "Du sollst Tivoli vom Paddock holen. Wie führst du ihn richtig?",
            visual: { kind: "item", name: "strick" },
            choices: [
              { label: "Den Strick fest um die Hand wickeln, damit er nicht wegläuft", feedback: "Bloß nicht! Erschrickt Tivoli, kann er dich mitziehen. Den Strick nie um die Hand wickeln." },
              { label: "Links neben seiner Schulter gehen, Strick locker in der Hand", best: true, feedback: "Genau richtig!" },
              { label: "Vor ihm hergehen und rückwärts schauen", feedback: "So siehst du nicht, wohin du gehst – und Tivoli kann dir auf die Fersen treten." },
            ],
            why: "Man geht neben der Schulter des Pferdes, meistens links. Der Strick liegt locker in der Hand, das lose Ende ist zusammengelegt – nie um die Hand gewickelt.",
          },
          {
            situation: "Bevor Tilda Tivoli reitet: Was kommt zuerst?",
            visual: { kind: "item", name: "buerste" },
            choices: [
              { label: "Gleich den Sattel drauf, das spart Zeit", feedback: "Unter dem Sattel könnte Schmutz drücken. Erst wird geputzt." },
              { label: "Putzen und die Hufe auskratzen", best: true, feedback: "Richtig!" },
              { label: "Eine Decke auflegen", feedback: "Zum Reiten braucht Tivoli keine Decke – aber ein sauberes Fell." },
            ],
            why: "Vor jedem Reiten wird das Pferd geputzt und die Hufe werden ausgekratzt. So drückt nichts, und man merkt sofort, ob alles in Ordnung ist.",
          },
        ]),
      },
    ],
    reward: {
      found: {
        title: "Tildas Lichterritt-Idee",
        doc: {
          style: "list",
          label: "Fundstück 12",
          title: "Tildas Notizzettel",
          lines: ["Lichterritt an Heiligabend – wie früher!", "Nur im Schritt, kleine Runde", "Pferde vorher an Lichter gewöhnen", "PS: Wilhelm pfeift neuerdings …"],
        },
      },
      message: "Du warst eine großartige Stall-Assistentin. Und es gab früher einen Lichterritt!",
    },
    teaser: "Morgen ist Tivolis neues Halfter verschwunden. Ein Fall für Detektive!",
  },
];
