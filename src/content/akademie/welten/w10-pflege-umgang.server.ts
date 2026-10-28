import "server-only";
import { card, item, no, ok, spot, tag } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 10 – Pflege und Umgang (Ausbau 29.10.2026) */
export const welt10: AcademyWorld = {
  id: "w10",
  number: 10,
  slug: "pflege-und-umgang",
  title: "Pflege und Umgang",
  teaser: "Putzen, Hufe, Führen, Satteln und nach dem Reiten.",
  learns: "Putzzeug und Putzreihenfolge, Hufe sicher auskratzen und prüfen, Führen und sicheres Anbinden mit Sicherheitsknoten, Satteln und Trensen Schritt für Schritt mit Passform-Kontrolle, Versorgung nach dem Reiten.",
  tint: "#EDE3CF",
  cover: scene("ak-sattelzeug"),
  badge: { id: "ra-abzeichen-w10", title: "Pflegeprofi", motif: "brush" },
  lessons: lessonsOf(10, [
    /* ---------- 1. Putzen ---------- */
    {
      slug: "putzen",
      title: "Putzen Schritt für Schritt",
      speaker: "lea",
      intro: {
        leicht: "Putzen ist wie eine Massage für dein Pferd – und du siehst sofort, ob alles in Ordnung ist.",
        mittel: "Putzen reinigt Fell und Haut, regt die Durchblutung an und ist die tägliche Gesundheitskontrolle. Vor allem Sattel- und Gurtlage müssen sauber sein.",
      },
      explanation: {
        leicht: [
          "Zuerst kommt der Gummistriegel. Mit kleinen Kreisen löst du Staub und Haare. Nicht an Kopf und Beinen – da ist der Knochen direkt unter der Haut.",
          "Dann bürstest du mit der Kardätsche in Richtung der Haare. Danach kommen Kopf, Mähne und Schweif und zum Schluss die Hufe.",
        ],
        mittel: [
          "Ablauf: Mit dem Gummistriegel in kreisenden Bewegungen den Schmutz lösen – an Hals, Rumpf und Kruppe, nicht über Knochen, Kopf und Beine. Danach mit der Kardätsche in langen Strichen in Haarwuchsrichtung bürsten und sie nach einigen Strichen am Metallstriegel ausstreichen. Die Wurzelbürste nimmt groben Matsch von den Beinen, der Kopf wird mit einer weichen Bürste geputzt.",
          "Mähne und Schweif werden vorsichtig mit den Fingern verlesen oder mit einer Bürste von unten nach oben entwirrt, damit keine Haare ausreißen. Augen und Nüstern wischt ein feuchter Schwamm sauber. Zum Schluss werden die Hufe ausgekratzt.",
          "Sicherheit und Kontrolle: Das Pferd steht sicher angebunden, du sprichst es an und bleibst nah am Körper, besonders an der Hinterhand. Beim Putzen achtest du auf Wunden, Schwellungen, Scheuerstellen und Druckstellen in Sattel- und Gurtlage. Jedes Pferd hat ein eigenes Putzzeug, damit keine Hautkrankheiten übertragen werden.",
        ],
      },
      illustration: item("striegel"),
      terms: [
        { term: "Gummistriegel", meaning: "Löst Schmutz und lose Haare mit kreisenden Bewegungen." },
        { term: "Kardätsche", meaning: "Weiche, dichte Bürste, die den gelösten Staub aus dem Fell holt." },
        { term: "Wurzelbürste", meaning: "Harte Bürste für groben Schmutz, vor allem an den Beinen." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w10-l1-putzzeug",
          prompt: { leicht: "Wofür ist das Putzzeug? Ordne zu.", mittel: "Ordne jedes Putzzeug seiner Aufgabe zu." },
          targets: [
            { id: "loesen", label: "Schmutz lösen" },
            { id: "buersten", label: "Staub herausbürsten" },
            { id: "hufe", label: "Hufe sauber machen" },
          ],
          items: [
            card("striegel", "Gummistriegel", item("striegel"), "loesen", "Richtig – in kleinen Kreisen löst er den Schmutz.", "Der Striegel löst Schmutz."),
            card("kardaetsche", "Kardätsche", item("buerste"), "buersten", "Genau, sie bürstet den Staub in Haarwuchsrichtung heraus.", "Die Kardätsche bürstet den Staub heraus."),
            card("hufkratzer", "Hufkratzer", item("hufkratzer"), "hufe", "Richtig! Damit kratzt du die Hufe aus.", "Der Hufkratzer ist für die Hufe."),
          ],
        },
      ],
      quiz: [
        {
          id: "zuerst",
          prompt: "Womit fängst du beim Putzen an?",
          options: [
            ok("striegel", "Mit dem Gummistriegel"),
            no("huf", "Mit dem Hufkratzer", "Die Hufe kommen zum Schluss."),
            no("schwamm", "Mit dem Schwamm", "Der Schwamm ist für Augen und Nüstern am Ende."),
          ],
          explain: "Richtig! Erst lösen, dann bürsten, dann Feinarbeit.",
        },
        {
          id: "nicht",
          prompt: "Wo benutzt du den Gummistriegel NICHT?",
          options: [
            ok("kopf", "Am Kopf und an den Beinen"),
            no("hals", "Am Hals", "Am Hals darfst du striegeln."),
            no("bauch", "Am Rumpf", "Am Rumpf darfst du striegeln."),
          ],
          explain: "Genau. Dort liegen die Knochen direkt unter der Haut – das wäre unangenehm.",
        },
        {
          id: "richtung",
          prompt: "In welche Richtung bürstest du mit der Kardätsche?",
          options: [
            ok("haar", "In Richtung der Haare"),
            no("gegen", "Gegen die Haare", "Gegen den Strich stellt sich das Fell auf."),
            no("egal", "Ganz egal", "Mit dem Haar wird das Fell glatt und sauber."),
          ],
          explain: "Richtig! So liegt das Fell danach glatt und glänzt.",
        },
        {
          id: "sattellage",
          levels: ["mittel"],
          prompt: "Warum muss die Sattellage besonders sauber sein?",
          options: [
            ok("scheuern", "Damit nichts scheuert oder drückt"),
            no("optik", "Damit es schöner aussieht", "Es geht vor allem um die Gesundheit der Haut."),
            no("schneller", "Damit das Pferd schneller läuft", "Sauber heißt hier: kein Scheuern, kein Druck."),
          ],
          explain: "Genau. Schmutz unter Sattel und Gurt kann wunde Stellen verursachen.",
        },
        {
          id: "eigenes",
          levels: ["mittel"],
          prompt: "Warum hat jedes Pferd möglichst sein eigenes Putzzeug?",
          options: [
            ok("haut", "Damit keine Hautkrankheiten übertragen werden"),
            no("farbe", "Wegen der Fellfarbe", "Es geht um Hygiene, nicht um Farbe."),
            no("streit", "Damit die Pferde sich nicht streiten", "Es geht um Ansteckung, nicht um Streit."),
          ],
          explain: "Richtig. Pilze und andere Hautprobleme können über Bürsten weitergegeben werden.",
        },
      ],
      merksatz: {
        leicht: "Striegeln, bürsten, Kopf, Mähne, Schweif – und zum Schluss die Hufe.",
        mittel: "Striegel löst, Kardätsche entfernt, Feinarbeit am Kopf – und dabei jeden Tag Haut, Beine und Sattellage kontrollieren.",
      },
      practiceNote: "Putzen anfangs nur unter Aufsicht einer erfahrenen Person; das Pferd steht dabei sicher angebunden.",
    },

    /* ---------- 2. Hufe auskratzen ---------- */
    {
      slug: "hufe-auskratzen",
      title: "Hufe auskratzen",
      speaker: "ben",
      intro: {
        leicht: "Ohne Huf kein Pferd! Darum machen wir die Hufe vor und nach dem Reiten sauber.",
        mittel: "Steinchen, Matsch und Mist im Huf können Druckstellen und Entzündungen verursachen. Hufe auskratzen gehört vor und nach jedem Reiten dazu – mit der richtigen Technik ist es sicher.",
      },
      explanation: {
        leicht: [
          "Stell dich neben das Bein und schau zum Schweif. Streich mit der Hand am Bein hinunter und sag „Huf“. Dann hebt das Pferd den Huf hoch.",
          "Kratz immer von hinten nach vorn, also von der Ferse zur Spitze. In der Mitte ist der weiche Strahl – da stichst du nie hinein. Stell den Huf zum Schluss vorsichtig ab.",
        ],
        mittel: [
          "Aufheben: Du stehst seitlich neben dem Bein, mit dem Rücken zum Pferdekopf, Füße nicht unter dem Huf. Streich mit der Hand vom Ellbogen bzw. vom Sprunggelenk am Bein hinunter, umfasse die Fessel und gib das Kommando „Huf“. Bei Bedarf lehnst du dich leicht gegen das Pferd, damit es das Gewicht verlagert. Hinterhufe hebst du nicht zu hoch und nicht zur Seite weg.",
          "Auskratzen: Den Hufkratzer führst du immer von den Trachten (hinten) zur Zehe (vorn), also vom Körper weg. Die seitlichen Strahlfurchen gründlich säubern, nicht in den Strahl stechen.",
          "Kontrollieren: Stecken Steine fest? Riecht es faulig (Hinweis auf Strahlfäule)? Ist das Eisen locker oder sind Nägel verbogen? Ist der Huf warm? Auffälligkeiten meldest du einem Erwachsenen. Den Huf setzt du ruhig ab, statt ihn fallen zu lassen. Viele Ställe haben eine feste Reihenfolge, zum Beispiel links vorn, links hinten, rechts vorn, rechts hinten.",
        ],
      },
      illustration: item("hufkratzer"),
      terms: [
        { term: "Strahl", meaning: "Der weiche, keilförmige Teil in der Mitte der Hufsohle." },
        { term: "Trachten", meaning: "Der hintere Teil des Hufs (die „Ferse“)." },
        { term: "Strahlfäule", meaning: "Eine Erkrankung des Strahls, die man oft am fauligen Geruch erkennt." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w10-l2-richtung",
          prompt: { leicht: "In welche Richtung kratzt du den Huf aus?", mittel: "In welche Richtung führst du den Hufkratzer?" },
          visual: item("huf"),
          options: [
            { id: "vor", label: "Von hinten nach vorn (zur Spitze)", correct: true },
            { id: "zu-mir", label: "Zu mir hin", feedback: "Zu dir hin könntest du dich verletzen, wenn das Pferd zuckt." },
            { id: "strahl", label: "Mitten in den Strahl hinein", feedback: "Der Strahl ist empfindlich – dort stichst du nicht hinein." },
          ],
          explain: "Richtig! Von den Trachten zur Zehe, also vom Körper weg.",
        },
      ],
      quiz: [
        {
          id: "stehen",
          prompt: "Wie stehst du beim Hufeauskratzen?",
          options: [
            ok("seitlich", "Neben dem Bein, Blick zum Schweif"),
            no("hinten", "Direkt hinter dem Pferd", "Hinter dem Pferd ist es gefährlich."),
            no("unter", "Mit den Füßen unter dem Huf", "Steht das Pferd ab, tritt es dir auf den Fuß."),
          ],
          explain: "Richtig! So bist du sicher und siehst, was du tust.",
        },
        {
          id: "strahl",
          prompt: "Was ist der Strahl?",
          options: [
            ok("weich", "Der weiche Teil in der Mitte des Hufs"),
            no("eisen", "Das Hufeisen", "Das Eisen ist aus Metall – der Strahl gehört zum Huf."),
            no("haare", "Die Haare über dem Huf", "Das ist der Kronrand mit dem Behang."),
          ],
          explain: "Genau. Er ist empfindlich, deshalb vorsichtig drumherum säubern.",
        },
        {
          id: "absetzen",
          prompt: "Wie stellst du den Huf wieder ab?",
          options: [
            ok("ruhig", "Ruhig und vorsichtig"),
            no("fallen", "Einfach fallen lassen", "Fallen lassen ist unangenehm und das Pferd erschrickt."),
            no("werfen", "Schnell wegschubsen", "Ruhig absetzen ist sicherer."),
          ],
          explain: "Richtig! So bleibt das Pferd entspannt und gibt den nächsten Huf gern.",
        },
        {
          id: "geruch",
          levels: ["mittel"],
          prompt: "Der Huf riecht faulig. Was kann das bedeuten?",
          options: [
            ok("faeule", "Hinweis auf Strahlfäule – einem Erwachsenen melden"),
            no("normal", "Das ist bei Pferden immer so", "Ein gesunder Huf riecht nicht faulig."),
            no("futter", "Das Pferd hat falsches Futter", "Der Geruch kommt meist vom Strahl, nicht vom Futter."),
          ],
          explain: "Genau. Strahlfäule muss behandelt werden – früh entdeckt ist sie gut zu versorgen.",
        },
        {
          id: "eisen",
          levels: ["mittel"],
          prompt: "Was prüfst du bei einem beschlagenen Huf zusätzlich?",
          options: [
            ok("locker", "Ob das Eisen locker ist oder Nägel herausstehen"),
            no("farbe", "Ob das Eisen glänzt", "Wichtig ist, dass es fest sitzt."),
            no("groesse", "Ob das Eisen groß genug ist", "Die Größe passt der Schmied an – du prüfst, ob es fest ist."),
          ],
          explain: "Richtig. Ein lockeres Eisen kann verloren gehen und den Huf verletzen.",
        },
      ],
      merksatz: {
        leicht: "Seitlich stehen, „Huf“ sagen, von hinten nach vorn kratzen, ruhig absetzen.",
        mittel: "Sicher stehen, von den Trachten zur Zehe kratzen, Strahlfurchen säubern – und dabei Huf, Geruch und Eisen prüfen.",
      },
      practiceNote: "Hufeauskratzen bitte gemeinsam mit einer erfahrenen Person üben, besonders an den Hinterhufen.",
    },

    /* ---------- 3. Führen und Anbinden ---------- */
    {
      slug: "fuehren-und-anbinden",
      title: "Führen und sicher anbinden",
      speaker: "mila",
      intro: {
        leicht: "Ein Pferd führen ist wie zusammen spazieren gehen. Du gehst neben der Schulter.",
        mittel: "Beim Führen übernimmst du die Führung – ruhig, klar und sicher. Beim Anbinden schützt der richtige Knoten Pferd und Mensch.",
      },
      explanation: {
        leicht: [
          "Du gehst links neben dem Pferd, auf Höhe der Schulter. Die rechte Hand hält den Strick etwas unter dem Kinn, die linke hält das Ende. Wickle den Strick nie um die Hand!",
          "Zum Anbinden nimmst du einen Knoten, der schnell aufgeht, wenn du am Ende ziehst. So kann man das Pferd im Notfall schnell losmachen.",
        ],
        mittel: [
          "Führen: Du gehst auf der linken Seite neben der Schulter des Pferdes. Die rechte Hand hält den Führstrick etwa eine Handbreit unter dem Halfter, die linke nimmt das Ende in Schlaufen auf – niemals um die Hand wickeln. Handschuhe und feste Schuhe schützen dich. Beim Wenden drehst du das Pferd von dir weg (nach rechts), damit es dir nicht auf die Füße tritt. Willst du anhalten, bleibst du stehen, sagst „Halt“ und gibst bei Bedarf einen kurzen Impuls am Strick.",
          "Mit Trense führst du am Zügel, den du über den Kopf nimmst. Durch enge Türen gehst du gerade und ruhig, das Pferd soll nicht drängeln.",
          "Anbinden: Immer am Halfter, nie am Zügel oder Gebiss. Der Strick wird an einem stabilen Ring etwa in Widerristhöhe befestigt, so lang, dass das Pferd den Kopf bequem halten, aber kein Bein darüber bekommen kann. Der Sicherheitsknoten (Panikknoten) lässt sich durch Ziehen am losen Ende sofort lösen.",
        ],
      },
      illustration: item("fuehren"),
      terms: [
        { term: "Sicherheitsknoten", meaning: "Anbindeknoten, der sich mit einem Zug am losen Ende sofort öffnen lässt." },
        { term: "Führstrick", meaning: "Seil, das am Halfter eingehakt wird." },
        { term: "Halfter", meaning: "Kopfstück ohne Gebiss zum Führen und Anbinden." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w10-l3-sicher",
          prompt: { leicht: "Was ist beim Führen sicher? Tippe alles Richtige an.", mittel: "Welche Regeln für Führen und Anbinden sind richtig?" },
          options: [
            { id: "schulter", label: "Neben der Schulter gehen", visual: item("fuehren"), correct: true },
            { id: "handschuhe", label: "Handschuhe tragen", visual: item("handschuh"), correct: true },
            { id: "knoten", label: "Mit Sicherheitsknoten anbinden", visual: item("strick"), correct: true },
            { id: "wickeln", label: "Den Strick um die Hand wickeln", visual: item("strick"), feedback: "Erschrickt das Pferd, kann dich der Strick mitreißen." },
            { id: "zuegel", label: "Am Zügel anbinden", visual: tag("Zügel"), feedback: "Am Zügel kann sich das Pferd das Maul verletzen – immer am Halfter." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Es fehlt noch mindestens eine richtige Regel." },
          explain: "Super – so führst du sicher und bindest richtig an.",
        },
      ],
      quiz: [
        {
          id: "wo",
          prompt: "Wo gehst du beim Führen?",
          options: [
            ok("schulter", "Neben der Schulter des Pferdes"),
            no("vorn", "Weit vor dem Pferd", "So siehst du das Pferd nicht und es kann dich anrempeln."),
            no("hinten", "Hinter dem Pferd", "Hinter dem Pferd ist es gefährlich."),
          ],
          explain: "Richtig! Dort siehst du das Pferd und bist sicher.",
        },
        {
          id: "wickeln",
          prompt: "Warum wickelst du den Strick nie um die Hand?",
          options: [
            ok("mitreissen", "Weil dich das Pferd sonst mitreißen könnte"),
            no("kalt", "Weil die Hand sonst kalt wird", "Es geht um deine Sicherheit."),
            no("lang", "Weil der Strick dann zu kurz wird", "Gefährlich ist, dass du nicht loslassen kannst."),
          ],
          explain: "Genau. Erschrickt das Pferd, musst du loslassen können.",
        },
        {
          id: "knoten",
          prompt: "Was kann ein Sicherheitsknoten?",
          options: [
            ok("schnell", "Er lässt sich im Notfall schnell öffnen"),
            no("nie", "Er geht nie wieder auf", "Genau das Gegenteil: Er geht schnell auf."),
            no("schoen", "Er sieht besonders schön aus", "Wichtig ist, dass er schnell aufgeht."),
          ],
          explain: "Richtig! Ein Zug am losen Ende, und das Pferd ist frei.",
        },
        {
          id: "wenden",
          levels: ["mittel"],
          prompt: "Wie wendest du ein Pferd beim Führen?",
          options: [
            ok("weg", "Von mir weg, ich gehe außen herum"),
            no("zu-mir", "Zu mir hin", "Dann könnte das Pferd dir auf die Füße treten."),
            no("rueckwaerts", "Rückwärts im Kreis", "So kommt man nicht sicher herum."),
          ],
          explain: "Genau. So bleiben deine Füße sicher und du hast den Überblick.",
        },
        {
          id: "laenge",
          levels: ["mittel"],
          prompt: "Wie lang bindest du den Strick an?",
          options: [
            ok("passend", "So, dass das Pferd bequem steht, aber kein Bein über den Strick bekommt"),
            no("ganz-kurz", "So kurz wie möglich", "Zu kurz ist unbequem und kann Panik auslösen."),
            no("lang", "So lang wie möglich", "Zu lang: Das Pferd kann mit dem Bein hineintreten."),
          ],
          explain: "Richtig – und etwa in Widerristhöhe an einem stabilen Ring.",
        },
      ],
      merksatz: {
        leicht: "Links neben der Schulter gehen, Strick nie um die Hand, mit Sicherheitsknoten anbinden.",
        mittel: "Führen auf Schulterhöhe, Strick in Schlaufen, von dir weg wenden – anbinden nur am Halfter mit Sicherheitsknoten.",
      },
      practiceNote: "Führen und Anbinden zuerst mit einem ruhigen Pferd und einer erfahrenen Person üben.",
    },

    /* ---------- 4. Satteln und Trensen ---------- */
    {
      slug: "satteln-und-trensen",
      title: "Satteln und Trensen Schritt für Schritt",
      speaker: "lea",
      intro: {
        leicht: "Jetzt machen wir das Pferd fertig zum Reiten: Sattel drauf und Trense an!",
        mittel: "Ein gut sitzender Sattel und eine richtig verschnallte Trense sind die Grundlage für ein zufriedenes Pferd. Die Reihenfolge und die Kontrolle danach sind wichtig.",
      },
      explanation: {
        leicht: [
          "Der Sattel kommt von links aufs Pferd. Er liegt hinter dem Schulterblatt. Den Gurt machst du erst locker zu und ziehst ihn später noch einmal nach.",
          "Bei der Trense hältst du das Kopfstück zwischen den Ohren hoch. Das Gebiss legst du vorsichtig ins Maul. Danach kommen die Ohren durch und die Riemen werden geschlossen.",
        ],
        mittel: [
          "Satteln: Schabracke oder Pad etwas zu weit vorn auflegen und mit dem Sattel nach hinten in Haarwuchsrichtung schieben, bis der Sattel hinter dem Schulterblatt liegt. Die Schabracke in die Sattelkammer hochziehen, damit sie den Widerrist nicht drückt. Gurt erst locker schließen und in mehreren Schritten nachgurten – vor dem Aufsteigen noch einmal kontrollieren. Zwischen Gurt und Ellbogen passt etwa eine Handbreit.",
          "Trensen: Halfter abnehmen und um den Hals legen, Zügel über den Kopf. Mit der rechten Hand das Kopfstück vor der Stirn hochhalten, mit der linken das Gebiss an die Lippen führen. Öffnet das Pferd das Maul nicht, hilft ein Daumen in der zahnlosen Lücke (den Laden). Dann die Ohren nacheinander vorsichtig durch das Genickstück führen.",
          "Kontrolle: Stirnriemen und Mähne sitzen ordentlich, der Kehlriemen ist so weit, dass eine Faust hochkant dazwischen passt, der Nasenriemen so, dass zwei Finger darunter passen. Das Gebiss liegt so, dass sich im Maulwinkel eine kleine Falte zeigt. Alle Riemen stecken in ihren Schlaufen.",
        ],
      },
      illustration: scene("ak-sattelzeug"),
      terms: [
        { term: "Schabracke", meaning: "Unterlage unter dem Sattel, die Schweiß aufnimmt und schützt." },
        { term: "Nachgurten", meaning: "Den Gurt nach einigen Minuten fester stellen." },
        { term: "Laden", meaning: "Zahnlose Lücke im Pferdemaul, in der das Gebiss liegt." },
      ],
      exercise: [
        {
          type: "hotspots",
          id: "ra-w10-l4-teile",
          scene: scene("ak-sattelzeug"),
          prompt: { leicht: "Finde die Teile am Pferd.", mittel: "Finde die Ausrüstungsteile, die du kontrollierst." },
          mode: "sequence",
          targets: [
            spot("sattel", "den Sattel", "sattel", "Der Sattel liegt hinter dem Schulterblatt.", { pose: "ohne" }),
            spot("gurt", "den Sattelgurt", "gurt", "Den Gurt ziehst du nach und nach fest.", { pose: "ohne" }),
            spot("trense", "die Trense", "trense", "Die Trense sitzt am Kopf.", { pose: "ohne" }),
            spot("gebiss", "das Gebiss", "gebiss", "Das Gebiss liegt im Maul auf den Laden.", { pose: "ohne", levels: ["mittel"] }),
          ],
          missHint: "Schau auf Rücken, Bauch und Kopf des Pferdes.",
        },
      ],
      quiz: [
        {
          id: "seite",
          prompt: "Von welcher Seite sattelst du normalerweise?",
          options: [
            ok("links", "Von links"),
            no("rechts", "Von rechts", "Üblich ist die linke Seite – wie beim Führen und Aufsteigen."),
            no("hinten", "Von hinten", "Von hinten ist es gefährlich."),
          ],
          explain: "Richtig! Die linke Seite ist die übliche Seite am Pferd.",
        },
        {
          id: "gurt",
          prompt: "Wie machst du den Gurt zu?",
          options: [
            ok("schritt", "Erst locker, dann nach und nach fester"),
            no("sofort", "Sofort ganz fest", "Das ist unangenehm – viele Pferde blähen sich dann auf."),
            no("gar-nicht", "Gar nicht", "Ohne Gurt rutscht der Sattel – sehr gefährlich."),
          ],
          explain: "Genau – und vor dem Aufsteigen kontrollierst du ihn noch einmal.",
        },
        {
          id: "ohren",
          prompt: "Wie kommen die Ohren durch das Kopfstück?",
          options: [
            ok("vorsichtig", "Vorsichtig, eins nach dem anderen"),
            no("ziehen", "Kräftig drüberziehen", "Die Ohren sind empfindlich – vorsichtig sein."),
            no("knicken", "Die Ohren nach unten knicken", "Ruhig und vorsichtig durchführen."),
          ],
          explain: "Richtig! So bleibt das Pferd beim Trensen entspannt.",
        },
        {
          id: "nasenriemen",
          levels: ["mittel"],
          prompt: "Wie eng ist der Nasenriemen richtig verschnallt?",
          options: [
            ok("zwei", "Zwei Finger passen darunter"),
            no("eng", "So eng, dass das Maul ganz zu ist", "Zu eng ist schmerzhaft und behindert das Kauen."),
            no("lose", "So lose, dass er herunterhängt", "Dann erfüllt er seine Aufgabe nicht."),
          ],
          explain: "Genau. Das Pferd muss kauen und schlucken können.",
        },
        {
          id: "schabracke",
          levels: ["mittel"],
          prompt: "Warum ziehst du die Schabracke in die Sattelkammer hoch?",
          options: [
            ok("widerrist", "Damit sie nicht auf den Widerrist drückt"),
            no("optik", "Damit sie gerade aussieht", "Es geht um Druckfreiheit am Widerrist."),
            no("rutschen", "Damit der Sattel schneller rutscht", "Im Gegenteil: Es geht um das Wohl des Pferdes."),
          ],
          explain: "Richtig. Der Widerrist muss frei bleiben, sonst entstehen Druckstellen.",
        },
      ],
      merksatz: {
        leicht: "Sattel hinter die Schulter, Gurt langsam nachziehen, Trense vorsichtig anlegen.",
        mittel: "Sattel hinter dem Schulterblatt, Widerrist frei, schrittweise nachgurten – Kehlriemen eine Faust, Nasenriemen zwei Finger.",
      },
      readTogether: true,
      practiceNote: "Satteln und Trensen anfangs nur mit Anleitung; Sattel- und Gebissanpassung gehört in Fachhände.",
    },

    /* ---------- 5. Nach dem Reiten ---------- */
    {
      slug: "nach-dem-reiten",
      title: "Nach dem Reiten",
      speaker: "ben",
      intro: {
        leicht: "Die Reitstunde ist vorbei – aber dein Pferd braucht dich noch!",
        mittel: "Die Zeit nach dem Reiten entscheidet mit, ob das Pferd gesund bleibt: abkühlen lassen, kontrollieren, versorgen und loben.",
      },
      explanation: {
        leicht: [
          "Am Ende reitest du noch ein paar Minuten Schritt am langen Zügel. So kann dein Pferd sich ausruhen und abkühlen.",
          "Dann sattelst du ab, kratzt die Hufe aus und schaust, ob alles in Ordnung ist. Und natürlich lobst du dein Pferd!",
        ],
        mittel: [
          "Abkühlen: Zum Schluss mindestens etwa zehn Minuten Schritt am langen Zügel reiten, bis die Atmung ruhig ist. Ein verschwitztes Pferd wird nicht nass in die Kälte gestellt – eine Abschwitzdecke hilft, und erst wenn es trocken ist, kommt es auf die Weide oder in die Box.",
          "Versorgen: Absatteln und abtrensen, Sattel- und Gurtlage auf Druckstellen prüfen, Schweißspuren abbürsten, Hufe auskratzen und die Beine anschauen. Im Sommer können Beine mit Wasser abgekühlt werden. Wasser trinken darf das Pferd, wenn es nicht mehr stark erhitzt ist.",
          "Ordnung: Gebiss abspülen, Sattelzeug an seinen Platz hängen und regelmäßig pflegen. Und vor allem: das Pferd loben und ihm Zeit geben.",
        ],
      },
      illustration: scene("ak-reiter-pause"),
      terms: [
        { term: "Trockenreiten", meaning: "Am Ende ruhig Schritt reiten, bis Atmung und Puls sich beruhigt haben." },
        { term: "Abschwitzdecke", meaning: "Decke, die Feuchtigkeit nach außen leitet, damit das Pferd nicht auskühlt." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w10-l5-reihenfolge",
          prompt: { leicht: "Was kommt wann? Ordne zu.", mittel: "Ordne die Aufgaben zu: auf dem Pferd oder am Boden?" },
          targets: [
            { id: "sattel", label: "Noch im Sattel" },
            { id: "boden", label: "Am Boden" },
          ],
          items: [
            card("schritt", "Schritt am langen Zügel", item("ak-pause"), "sattel", "Richtig – so kühlt dein Pferd ab.", "Trockenreiten machst du noch im Sattel."),
            card("hufe", "Hufe auskratzen", item("hufkratzer"), "boden", "Genau, das machst du nach dem Absatteln.", "Hufe kratzt du am Boden aus."),
            card("lage", "Sattellage kontrollieren", item("sattel"), "boden", "Richtig! Nach dem Absatteln siehst du Druckstellen.", "Das geht erst nach dem Absatteln."),
            card("loben", "Das Pferd loben", item("ak-herz"), "sattel", "Genau – loben kannst du schon im Sattel. Und am Boden gleich noch mal!", "Loben geht schon im Sattel."),
          ],
        },
      ],
      quiz: [
        {
          id: "ende",
          prompt: "Was machst du am Ende der Reitstunde noch auf dem Pferd?",
          options: [
            ok("schritt", "Ruhig Schritt am langen Zügel reiten"),
            no("galopp", "Noch einmal schnell galoppieren", "Am Ende soll das Pferd zur Ruhe kommen."),
            no("absteigen", "Sofort abspringen", "Erst trockenreiten, dann absteigen."),
          ],
          explain: "Richtig! So beruhigt sich die Atmung und die Muskeln entspannen.",
        },
        {
          id: "nass",
          prompt: "Dein Pferd ist nass geschwitzt und draußen ist es kalt. Was tust du?",
          options: [
            ok("decke", "Abschwitzdecke auflegen und trocknen lassen"),
            no("raus", "Gleich auf die kalte Weide stellen", "Nass in der Kälte kann es sich erkälten."),
            no("dusche", "Mit kaltem Wasser abspritzen", "Im Kalten macht das alles nur schlimmer."),
          ],
          explain: "Genau. Erst trocken, dann raus.",
        },
        {
          id: "kontrolle",
          prompt: "Was kontrollierst du nach dem Absatteln?",
          options: [
            ok("lage", "Sattel- und Gurtlage auf Druckstellen"),
            no("maehne", "Ob die Mähne schön liegt", "Wichtig sind Druckstellen und Verletzungen."),
            no("nichts", "Gar nichts", "Nach dem Reiten schaust du genau hin."),
          ],
          explain: "Richtig – und auch Hufe und Beine.",
        },
        {
          id: "wie-lange",
          levels: ["mittel"],
          prompt: "Wie lange reitest du am Ende etwa Schritt?",
          options: [
            ok("zehn", "Etwa zehn Minuten oder bis die Atmung ruhig ist"),
            no("eine", "Eine Minute", "Das ist zu kurz, um abzukühlen."),
            no("stunde", "Eine Stunde", "So lange ist normalerweise nicht nötig."),
          ],
          explain: "Genau. Maßstab ist, dass das Pferd ruhig atmet.",
        },
        {
          id: "gebiss",
          levels: ["mittel"],
          prompt: "Warum spülst du das Gebiss nach dem Reiten ab?",
          options: [
            ok("sauber", "Damit kein Futter und Speichel daran eintrocknen"),
            no("glanz", "Damit es glänzt", "Es geht um Hygiene."),
            no("kalt", "Damit es kalt wird", "Wichtig ist, dass es sauber ist."),
          ],
          explain: "Richtig. Ein sauberes Gebiss ist angenehmer und hygienischer.",
        },
      ],
      merksatz: {
        leicht: "Schritt reiten, absatteln, Hufe auskratzen, nachsehen – und loben!",
        mittel: "Trockenreiten, kontrollieren, versorgen, aufräumen: Die Reitstunde endet erst, wenn das Pferd gut versorgt ist.",
      },
    },
  ]),
};
