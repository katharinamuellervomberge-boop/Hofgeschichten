import { card, item, no, ok, spot } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 3 – Die Sprache der Hilfen */
export const welt3: AcademyWorld = {
  id: "w3",
  number: 3,
  slug: "die-sprache-der-hilfen",
  title: "Die Sprache der Hilfen",
  teaser: "Wie Reiter und Pferd sich verständigen.",
  learns: "Was Reiterhilfen sind; Schenkel-, Gewichts-, Zügel- und Stimmhilfen als feine, koordinierte Signale; das Zusammenspiel beim Anreiten, Anhalten und Wenden.",
  tint: "#EADBC8",
  cover: scene("ak-reiter-hilfen"),
  badge: { id: "ra-abzeichen-w3", title: "Hilfen-Versteher", motif: "signals" },
  lessons: lessonsOf(3, [
    /* ---------- 1. Was sind Reiterhilfen? ---------- */
    {
      slug: "was-sind-hilfen",
      title: "Was sind Reiterhilfen?",
      speaker: "lea",
      intro: {
        leicht: "Wie sagt man einem Pferd, was es tun soll? Mit Zeichen! Die heißen Hilfen.",
        mittel: "Pferde verstehen keine Sätze. Trotzdem können Reiter und Pferd sich verständigen – mit den Hilfen.",
      },
      explanation: {
        leicht: [
          "Pferde verstehen unsere Sätze nicht. Deshalb sprechen wir beim Reiten mit Zeichen: den Hilfen.",
          "Es gibt vier Hilfen: Gewicht, Schenkel, Zügel und Stimme. Gute Hilfen sind klein und freundlich.",
        ],
        mittel: [
          "Reiterhilfen sind die Zeichen, mit denen Reiter und Pferd sich verständigen. Die drei wichtigsten sind Gewichtshilfen, Schenkelhilfen und Zügelhilfen. Dazu kommt die Stimme; manche Reiter nutzen außerdem eine Gerte, die den Schenkel nur unterstützt. Pferde lernen die Bedeutung der Hilfen in ihrer Ausbildung – sie müssen sie verstehen lernen, genau wie du.",
          "Gute Hilfen sind so fein wie möglich und so deutlich wie nötig. Pferde spüren sogar eine Fliege auf ihrem Fell – grobes Ziehen oder Treten ist darum nicht nötig. Sobald das Pferd reagiert, hört die Hilfe auf oder wird leichter. Das ist für das Pferd die Bestätigung: Das war richtig.",
        ],
      },
      illustration: scene("ak-reiter-hilfen"),
      terms: [
        { term: "Hilfen", meaning: "Die Zeichen, mit denen sich Reiter und Pferd verständigen." },
        { term: "Gewichtshilfe", meaning: "Ein Zeichen über den Sitz." },
        { term: "Schenkelhilfe", meaning: "Ein Zeichen mit dem Unterschenkel." },
        { term: "Zügelhilfe", meaning: "Ein Zeichen mit der Hand über den Zügel." },
      ],
      exercise: [
        {
          type: "hotspots",
          id: "ra-w3-l1-suchbild",
          scene: scene("ak-reiter-sitz"),
          prompt: "Wo gibt die Reiterin ihre Hilfen?",
          mode: "sequence",
          targets: [
            spot("sitz", "der Sitz (Gewicht)", "gesaess", "Mit dem Sitz gibt sie Gewichtshilfen.", { r: 30 }),
            spot("schenkel", "der Schenkel", "schenkel-gurt", "Mit dem Unterschenkel gibt sie Schenkelhilfen.", { r: 28 }),
            spot("hand", "die Zügelhand", "hand", "Mit der Hand gibt sie Zügelhilfen.", { r: 26 }),
            spot("stimme", "die Stimme (der Mund)", "stimme", "Mit der Stimme beruhigt und lobt sie.", { r: 26, levels: ["mittel"] }),
          ],
          missHint: "Schau, wo die Reiterin das Pferd berührt.",
        },
      ],
      quiz: [
        {
          id: "vier",
          levels: ["leicht"],
          prompt: "Welche vier Hilfen hast du kennengelernt?",
          options: [
            ok("vier", "Gewicht, Schenkel, Zügel, Stimme"),
            no("pfeife", "Pfeife, Klatschen, Rufen, Winken", "Das sind keine Reiterhilfen. Gemeint sind Gewicht, Schenkel, Zügel und Stimme."),
            no("mahne", "Mähne, Schweif, Huf, Ohr", "Das sind Teile vom Pferd. Die Hilfen gibst du mit Gewicht, Schenkel, Zügel und Stimme."),
          ],
          explain: "Richtig! Mit diesen vier Hilfen sprichst du mit dem Pferd.",
        },
        {
          id: "haupthilfen",
          levels: ["mittel"],
          prompt: "Welche drei Hilfen sind die wichtigsten?",
          options: [
            ok("drei", "Gewichts-, Schenkel- und Zügelhilfen"),
            no("stimme", "Stimme, Gerte und Sporen", "Stimme und Gerte unterstützen nur. Die drei wichtigsten sind Gewicht, Schenkel und Zügel."),
            no("zuegel", "Nur die Zügelhilfen", "Mit dem Zügel allein wird Reiten hart. Gewicht und Schenkel gehören dazu."),
          ],
          explain: "Richtig. Die Stimme kommt unterstützend dazu.",
        },
        {
          id: "wie",
          prompt: "Wie sollen Hilfen sein?",
          options: [
            ok("fein", "Fein und freundlich"),
            no("stark", "Laut und stark", "Pferde sind sehr feinfühlig. Starke Hilfen sind unangenehm und nicht nötig."),
            no("viele", "Möglichst viele auf einmal durcheinander", "Durcheinander verwirrt das Pferd. Klar und fein ist besser."),
          ],
          explain: "Genau! So klein wie möglich und so deutlich wie nötig.",
        },
        {
          id: "gelernt",
          prompt: "Woher kennt das Pferd die Hilfen?",
          options: [
            ok("gelernt", "Es hat sie gelernt"),
            no("gedanken", "Es kann Gedanken lesen", "Pferde lesen keine Gedanken – aber sie spüren sehr viel."),
            no("saetze", "Es versteht unsere Sätze", "Pferde verstehen keine Sätze. Sie lernen Zeichen und einzelne Stimmkommandos."),
          ],
          explain: "Richtig! Pferde lernen die Hilfen in ihrer Ausbildung.",
        },
        {
          id: "nachlassen",
          levels: ["mittel"],
          prompt: "Was passiert mit der Hilfe, wenn das Pferd richtig reagiert?",
          options: [
            ok("leichter", "Sie hört auf oder wird leichter"),
            no("staerker", "Sie wird stärker", "Wird die Hilfe trotz richtiger Reaktion stärker, versteht das Pferd nicht, was richtig war."),
            no("dreimal", "Man wiederholt sie dreimal", "Das Pferd hat schon reagiert. Jetzt lässt die Hilfe nach."),
          ],
          explain: "Genau. Das Nachlassen sagt dem Pferd: Das war richtig.",
        },
      ],
      merksatz: {
        leicht: "Mit Gewicht, Schenkel, Zügel und Stimme sprechen wir mit dem Pferd – ganz fein.",
        mittel: "So fein wie möglich, so deutlich wie nötig – und nachlassen, sobald das Pferd reagiert.",
      },
    },

    /* ---------- 2. Schenkelhilfen ---------- */
    {
      slug: "schenkelhilfen",
      title: "Schenkelhilfen",
      speaker: "ben",
      intro: {
        leicht: "Mit meinen Beinen kann ich dem Pferd etwas sagen. Weißt du, was?",
        mittel: "Der Unterschenkel liegt dicht am Pferd. Je nachdem, wo er wirkt, bedeutet er etwas anderes.",
      },
      explanation: {
        leicht: [
          "Deine Unterschenkel liegen am Bauch des Pferdes, gleich beim Gurt. Ein kurzer, leichter Druck sagt: Bitte geh vorwärts!",
          "Danach liegt der Schenkel wieder ruhig. Nicht dauernd drücken! Liegt er ein Stück weiter hinten, passt er auf, dass die Hinterhand nicht zur Seite ausweicht.",
        ],
        mittel: [
          "Schenkelhilfen gibst du mit dem Unterschenkel. Liegt er am Gurt, wirkt er vorwärtstreibend: Ein kurzer Impuls bittet das Pferd, loszugehen oder fleißiger zu laufen. Danach liegt der Schenkel wieder ruhig an – dauerndes Drücken oder Klopfen stumpft das Pferd ab.",
          "Etwa eine Handbreit hinter dem Gurt wirkt der Schenkel vorwärts-seitwärtstreibend oder verwahrend: Er kann die Hinterhand zur Seite bitten oder verhindern, dass sie ausweicht. In Wendungen arbeiten beide Schenkel zusammen. Wie stark ein Impuls sein muss, ist bei jedem Pferd anders – deine Reitlehrerin hilft dir, das richtige Maß zu finden.",
        ],
      },
      illustration: scene("ak-reiter-schenkel"),
      terms: [
        { term: "Vorwärtstreibend", meaning: "Der Schenkel am Gurt bittet das Pferd vorwärts." },
        { term: "Verwahrend", meaning: "Der Schenkel hinter dem Gurt passt auf, dass die Hinterhand nicht ausweicht." },
        { term: "Impuls", meaning: "Ein kurzes, deutliches Zeichen, das gleich wieder aufhört." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w3-l2-wo",
          levels: ["leicht"],
          prompt: "Wo bittet der Schenkel das Pferd vorwärts?",
          visual: scene("ak-reiter-schenkel"),
          layout: "list",
          options: [
            { id: "gurt", label: "Am Gurt (Punkt 1)", correct: true },
            { id: "hinter", label: "Hinter dem Gurt (Punkt 2)", feedback: "Hinter dem Gurt passt der Schenkel auf die Hinterhand auf." },
            { id: "hals", label: "Am Hals", feedback: "Am Hals liegt kein Schenkel. Die Beine sind am Bauch des Pferdes." },
          ],
          explain: "Richtig! Am Gurt sagt der Schenkel: Bitte vorwärts.",
        },
        {
          type: "match",
          id: "ra-w3-l2-zuordnen",
          levels: ["mittel"],
          prompt: "Welche Schenkellage passt zu welcher Aufgabe?",
          targets: [
            { id: "gurt", label: "Schenkel am Gurt" },
            { id: "hinter", label: "Schenkel hinter dem Gurt" },
          ],
          items: [
            card("losgehen", "Das Pferd soll losgehen", item("ak-schenkel"), "gurt", "Richtig. Am Gurt wirkt der Schenkel vorwärtstreibend.", "Losgehen bittet der Schenkel am Gurt."),
            card("fleissig", "Das Pferd soll fleißiger laufen", item("ak-schaukel"), "gurt", "Genau, auch dafür treibt der Schenkel am Gurt.", "Mehr Fleiß kommt vom vorwärtstreibenden Schenkel am Gurt."),
            card("ausweichen", "Die Hinterhand soll nicht ausweichen", item("ak-stopp"), "hinter", "Richtig. Das ist der verwahrende Schenkel.", "Verwahren tut der Schenkel hinter dem Gurt."),
            card("seitwaerts", "Die Hinterhand soll zur Seite treten", item("ak-buegel"), "hinter", "Genau, das ist vorwärts-seitwärtstreibend.", "Zur Seite bittet der Schenkel etwas hinter dem Gurt."),
          ],
        },
      ],
      quiz: [
        {
          id: "womit",
          prompt: "Womit gibst du Schenkelhilfen?",
          options: [
            ok("unterschenkel", "Mit dem Unterschenkel"),
            no("ferse", "Mit kräftigen Tritten der Ferse", "Harte Tritte sind keine feine Hilfe – und unangenehm für das Pferd."),
            no("hand", "Mit der Hand", "Mit der Hand gibst du Zügelhilfen. Schenkelhilfen kommen vom Unterschenkel."),
          ],
          explain: "Richtig! Der Unterschenkel liegt ruhig am Pferd.",
        },
        {
          id: "bedeutung",
          prompt: "Was bedeutet ein kurzer Druck mit dem Schenkel am Gurt?",
          options: [
            ok("vorwaerts", "Bitte vorwärts"),
            no("halt", "Bitte anhalten", "Zum Anhalten nutzt man vor allem Gewicht und Zügel."),
            no("hinlegen", "Bitte hinlegen", "Hinlegen gehört nicht zum Reiten. Der Schenkel am Gurt bittet vorwärts."),
          ],
          explain: "Genau! Ein kurzer Impuls am Gurt heißt: bitte vorwärts. Danach liegt der Schenkel wieder ruhig.",
        },
        {
          id: "danach",
          prompt: "Das Pferd ist losgegangen. Was macht dein Schenkel jetzt?",
          options: [
            ok("ruhig", "Er liegt wieder ruhig an"),
            no("weiter", "Er drückt weiter", "Dauerdrücken stumpft ab. Das Pferd hat ja schon reagiert."),
            no("klopfen", "Er klopft immer weiter", "Dauerndes Klopfen nervt das Pferd und macht es unempfindlich."),
          ],
          explain: "Richtig! So weiß das Pferd: Das war richtig.",
        },
        {
          id: "verwahrend",
          levels: ["mittel"],
          prompt: "Wo liegt der verwahrende Schenkel?",
          options: [
            ok("hinter", "Etwa eine Handbreit hinter dem Gurt"),
            no("vor", "Vor dem Gurt am Ellbogen des Pferdes", "So weit vorne kann der Schenkel nicht verwahren. Er liegt hinter dem Gurt."),
            no("hals", "Auf dem Pferdehals", "Auf dem Hals liegen keine Schenkel."),
          ],
          explain: "Richtig. Von dort passt er auf die Hinterhand auf.",
        },
        {
          id: "abstumpfen",
          levels: ["mittel"],
          prompt: "Warum soll man nicht ständig treiben?",
          options: [
            ok("stumpf", "Das Pferd stumpft ab und reagiert nicht mehr fein"),
            no("schneller", "Das Pferd wird immer schneller", "Meist passiert das Gegenteil: Es reagiert immer weniger."),
            no("sattel", "Weil sonst der Sattel rutscht", "Mit dem Sattel hat das nichts zu tun. Es geht um die Feinheit der Verständigung."),
          ],
          explain: "Genau. Kurze Impulse und ruhiges Anliegen halten das Pferd aufmerksam.",
        },
      ],
      merksatz: {
        leicht: "Kurz und leicht mit dem Schenkel bitten – dann liegt er wieder ruhig.",
        mittel: "Am Gurt treibt der Schenkel vorwärts, hinter dem Gurt verwahrt er. Kurz bitten, dann ruhig anliegen.",
      },
    },

    /* ---------- 3. Gewichtshilfen ---------- */
    {
      slug: "gewichtshilfen",
      title: "Gewichtshilfen",
      speaker: "mila",
      intro: {
        leicht: "Wusstest du, dass das Pferd spürt, wie du sitzt? Das ist auch ein Zeichen!",
        mittel: "Dein Sitz spricht ständig mit dem Pferd – ob du willst oder nicht. Darum lernen wir, ihn bewusst einzusetzen.",
      },
      explanation: {
        leicht: [
          "Das Pferd spürt genau, wie du sitzt. Darum ist auch dein Gewicht ein Zeichen.",
          "In einer Kurve schaust du in die Kurve und sitzt ein klein wenig mehr auf der inneren Seite – ohne zur Seite zu kippen!",
        ],
        mittel: [
          "Gewichtshilfen gibst du über den Sitz. Man unterscheidet drei Arten: Bei der beidseitig belastenden Gewichtshilfe sitzt du gleichmäßig etwas tiefer, zum Beispiel beim Anhalten. Bei der einseitig belastenden belastest du den inneren Gesäßknochen etwas mehr, zum Beispiel in Wendungen. Bei der entlastenden Gewichtshilfe machst du den Pferderücken leichter, zum Beispiel im leichten Sitz.",
          "Gewichtshilfen sind sehr fein. Es geht nicht darum, sich zur Seite zu lehnen oder in die Kurve zu kippen – dann verliert das Pferd sein Gleichgewicht. Die Veränderung ist so klein, dass Zuschauer sie kaum sehen. Wie dein Pferd darauf reagiert, hängt auch von seiner Ausbildung ab.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Beidseitig belastend", meaning: "Gleichmäßig etwas tiefer sitzen." },
        { term: "Einseitig belastend", meaning: "Den inneren Gesäßknochen etwas mehr belasten." },
        { term: "Entlastend", meaning: "Den Pferderücken leichter machen, z. B. im leichten Sitz." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w3-l3-kurve",
          levels: ["leicht"],
          prompt: "Du willst links um die Kurve reiten. Wohin schaust du?",
          visual: scene("ak-bahn-zirkel"),
          layout: "list",
          options: [
            { id: "links", label: "Nach links in die Kurve", correct: true },
            { id: "rechts", label: "Nach rechts", feedback: "Rechts ist die falsche Seite. Schau dorthin, wohin du willst." },
            { id: "unten", label: "Nach unten auf den Hals", feedback: "Nach unten schauen bringt dich aus dem Gleichgewicht." },
          ],
          explain: "Richtig! Und du sitzt ein klein wenig mehr links – ohne zu kippen.",
        },
        {
          type: "match",
          id: "ra-w3-l3-zuordnen",
          levels: ["mittel"],
          prompt: "Welche Gewichtshilfe passt?",
          targets: [
            { id: "beidseitig", label: "beidseitig belastend" },
            { id: "einseitig", label: "einseitig belastend" },
            { id: "entlastend", label: "entlastend" },
          ],
          items: [
            card("halten", "Anhalten", item("ak-stopp"), "beidseitig", "Richtig. Gleichmäßig tiefer sitzen hilft beim Anhalten.", "Beim Anhalten sitzt du gleichmäßig tiefer: beidseitig belastend."),
            card("wendung", "Wendung nach links", item("ak-schaukel"), "einseitig", "Genau. Der innere Gesäßknochen wird etwas mehr belastet.", "In Wendungen belastest du innen etwas mehr: einseitig."),
            card("stangen", "Leichter Sitz über Bodenstangen", item("ak-buegel"), "entlastend", "Richtig. Der Pferderücken wird leichter.", "Im leichten Sitz entlastest du den Rücken."),
          ],
        },
      ],
      quiz: [
        {
          id: "spuert",
          prompt: "Spürt das Pferd, wie du sitzt?",
          options: [
            ok("ja", "Ja, sehr genau"),
            no("nein", "Nein, gar nicht", "Doch! Pferde spüren jede kleine Bewegung im Sattel."),
            no("springen", "Nur beim Springen", "Das Pferd spürt deinen Sitz immer, in jeder Gangart."),
          ],
          explain: "Richtig! Darum ist dein Sitz auch ein Zeichen.",
        },
        {
          id: "wendung",
          prompt: "Was machst du mit deinem Gewicht in einer Wendung?",
          options: [
            ok("innen", "Etwas mehr innen sitzen, ohne zu kippen"),
            no("lehnen", "Mich weit zur Seite lehnen", "Wer sich lehnt, bringt das Pferd aus dem Gleichgewicht."),
            no("aufstehen", "Im Sattel aufstehen", "Aufstehen hilft in der Wendung nicht. Bleib sitzen und belaste innen etwas mehr."),
          ],
          explain: "Genau! Ganz fein und ohne zu kippen.",
        },
        {
          id: "fein",
          prompt: "Wie groß ist eine Gewichtshilfe?",
          options: [
            ok("klein", "So klein, dass man sie kaum sieht"),
            no("rutschen", "Man rutscht hin und her", "Hin- und Herrutschen verwirrt das Pferd."),
            no("huepfen", "Man hüpft im Sattel", "Hüpfen stört den Pferderücken. Gewichtshilfen sind ganz fein."),
          ],
          explain: "Richtig! Das Pferd spürt sie trotzdem.",
        },
        {
          id: "anhalten",
          levels: ["mittel"],
          prompt: "Welche Gewichtshilfe hilft beim Anhalten?",
          options: [
            ok("beidseitig", "Beidseitig belastend"),
            no("entlastend", "Entlastend", "Entlastend macht den Rücken leichter – zum Beispiel im leichten Sitz."),
            no("einseitig", "Einseitig belastend", "Die einseitige brauchst du vor allem in Wendungen."),
          ],
          explain: "Richtig. Gleichmäßig etwas tiefer sitzen.",
        },
        {
          id: "entlastend",
          levels: ["mittel"],
          prompt: "Wann nutzt man die entlastende Gewichtshilfe?",
          options: [
            ok("leicht", "Zum Beispiel im leichten Sitz über Bodenstangen"),
            no("halt", "Beim Anhalten", "Beim Anhalten belastest du beidseitig."),
            no("steht", "Wenn das Pferd steht", "Im Stand gibt es nichts zu entlasten. Gemeint ist zum Beispiel der leichte Sitz."),
          ],
          explain: "Genau. So kann das Pferd den Rücken frei bewegen.",
        },
      ],
      merksatz: {
        leicht: "Mein Gewicht ist auch ein Zeichen – ganz klein und ohne zu kippen.",
        mittel: "Beidseitig belastend, einseitig belastend oder entlastend: Gewichtshilfen sind fein, das Pferd bleibt im Gleichgewicht.",
      },
    },

    /* ---------- 4. Zügel- und Stimmhilfen ---------- */
    {
      slug: "zuegel-und-stimme",
      title: "Zügel- und Stimmhilfen",
      speaker: "lea",
      intro: {
        leicht: "Mit dem Zügel und meiner Stimme kann ich Tonga viel sagen – ganz leise.",
        mittel: "Zügelhilfen wirken auf das empfindliche Pferdemaul. Darum lernen wir sie besonders sorgfältig.",
      },
      explanation: {
        leicht: [
          "Mit dem Zügel bittest du das Pferd, langsamer zu werden oder die Richtung zu ändern. Die Hand bleibt weich – niemals reißen!",
          "Auch deine Stimme hilft: ein ruhiges, langes Wort zum Beruhigen und ein freundliches Lob, wenn etwas geklappt hat.",
        ],
        mittel: [
          "Zügelhilfen wirken über das Gebiss auf das Pferdemaul. Man unterscheidet zum Beispiel: annehmen (die Faust schließt sich etwas fester oder dreht leicht ein), nachgeben (die Faust öffnet sich etwas oder geht ein wenig vor), durchhalten (die Hand bleibt kurz ruhig stehen) und den seitwärtsweisenden Zügel, der dem Pferd in Wendungen den Weg zeigt. Zügelhilfen kommen nie allein, sondern zusammen mit Gewicht und Schenkel.",
          "Annehmen und Nachgeben gehören immer zusammen: Auf jedes Annehmen folgt ein Nachgeben, sobald das Pferd reagiert. Harte, ziehende oder ruckartige Zügelhilfen tun weh und haben mit feinem Reiten nichts zu tun. Die Stimme unterstützt: Ein ruhiges, langes Wort beruhigt, ein kurzes Schnalzen kann zum Vorwärtsgehen auffordern, und ein Lob mit ruhiger Stimme zeigt dem Pferd, dass es alles richtig gemacht hat.",
        ],
      },
      illustration: scene("ak-reiter-sitz-hand"),
      terms: [
        { term: "Annehmen", meaning: "Die Faust schließt sich kurz etwas fester." },
        { term: "Nachgeben", meaning: "Die Faust öffnet sich etwas oder geht ein wenig vor." },
        { term: "Durchhalten", meaning: "Die Hand bleibt kurz ruhig stehen, ohne zu ziehen." },
        { term: "Seitwärtsweisend", meaning: "Der Zügel zeigt dem Pferd die neue Richtung." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w3-l4-fein",
          prompt: { leicht: "Was ist freundlich zum Pferdemaul? Tippe alles Richtige an.", mittel: "Welche Zügel- und Stimmhilfen sind fein und pferdefreundlich? Wähle alle richtigen." },
          options: [
            { id: "annehmen", label: "Die Faust schließt sich kurz etwas fester", visual: item("ak-zuegel"), correct: true },
            { id: "nachgeben", label: "Danach wieder nachgeben", visual: item("ak-herz"), correct: true },
            { id: "loben", label: "Mit ruhiger Stimme loben", visual: item("ak-sprechblase"), correct: true },
            { id: "reissen", label: "Kräftig am Zügel reißen", visual: item("ak-blitz"), feedback: "Reißen tut dem Pferdemaul weh." },
            { id: "dauer", label: "Die ganze Zeit fest ziehen", visual: item("ak-stopp"), feedback: "Dauerziehen tut weh und macht das Maul unempfindlich." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Kurz annehmen, nachgeben und loben – so ist es fein.",
        },
      ],
      quiz: [
        {
          id: "hand",
          prompt: "Wie ist deine Hand am Zügel?",
          options: [
            ok("weich", "Weich und ruhig"),
            no("hart", "Hart und fest", "Eine harte Hand tut dem Pferdemaul weh."),
            no("ruck", "Sie ruckt immer wieder", "Rucken ist unangenehm und verwirrt das Pferd."),
          ],
          explain: "Richtig! Weiche Hände sind freundlich.",
        },
        {
          id: "nachgeben",
          prompt: { leicht: "Das Pferd ist langsamer geworden. Was macht deine Hand jetzt?", mittel: "Was gehört nach jedem Annehmen dazu?" },
          options: [
            ok("leichter", "Sie wird wieder leichter (nachgeben)"),
            no("fester", "Sie zieht noch fester", "Das Pferd hat schon reagiert. Jetzt gibt die Hand nach."),
            no("loslassen", "Sie lässt den Zügel ganz fallen", "Ganz fallen lassen ist nicht gemeint – nur leichter werden."),
          ],
          explain: "Genau! Nachgeben sagt dem Pferd: Das war richtig.",
        },
        {
          id: "lob",
          prompt: "Wie lobst du dein Pferd?",
          options: [
            ok("ruhig", "Mit ruhiger, freundlicher Stimme"),
            no("schreien", "Mit lautem Schreien", "Lautes Schreien kann ein Pferd erschrecken."),
            no("gar-nicht", "Gar nicht", "Lob hilft dem Pferd zu verstehen, was richtig war."),
          ],
          explain: "Richtig! Ein ruhiges Lob oder ein Kraulen am Hals.",
        },
        {
          id: "bedeutung-nachgeben",
          levels: ["mittel"],
          prompt: "Was bedeutet „nachgeben“?",
          options: [
            ok("oeffnen", "Die Faust öffnet sich etwas oder geht ein wenig vor"),
            no("wegwerfen", "Die Zügel ganz wegwerfen", "Beim Nachgeben bleibt die Verbindung – sie wird nur leichter."),
            no("ziehen", "Fester ziehen", "Das wäre das Gegenteil. Nachgeben heißt leichter werden."),
          ],
          explain: "Richtig. Ganz fein und gefühlvoll.",
        },
        {
          id: "allein",
          levels: ["mittel"],
          prompt: "Wirken Zügelhilfen allein?",
          options: [
            ok("zusammen", "Nein, immer zusammen mit Gewicht und Schenkel"),
            no("reicht", "Ja, der Zügel reicht", "Nur mit dem Zügel wird Reiten hart. Gewicht und Schenkel gehören dazu."),
            no("galopp", "Nur im Galopp", "Das Zusammenspiel gilt in allen Gangarten."),
          ],
          explain: "Genau. Die Hilfen sind ein Team.",
        },
      ],
      merksatz: {
        leicht: "Weiche Hände, ruhige Stimme – und loben nicht vergessen!",
        mittel: "Kein Annehmen ohne Nachgeben: Zügelhilfen sind fein und wirken mit Gewicht und Schenkel zusammen.",
      },
    },

    /* ---------- 5. Zusammenspiel der Hilfen ---------- */
    {
      slug: "zusammenspiel",
      title: "Zusammenspiel der Hilfen",
      speaker: "mila",
      readTogether: true,
      intro: {
        leicht: "Die Hilfen sind wie ein Team. Zusammen sind sie am stärksten – und trotzdem ganz leise.",
        mittel: "Eine einzelne Hilfe reicht selten. Erst das Zusammenspiel macht die Verständigung klar.",
      },
      explanation: {
        leicht: [
          "Zum Anreiten sitzt du aufrecht, bittest kurz mit beiden Schenkeln, und die Hand lässt das Pferd vorwärts.",
          "Zum Anhalten sitzt du tief und die Hand nimmt kurz an. Steht das Pferd, gibst du nach und lobst es.",
        ],
        mittel: [
          "Hilfen wirken immer im Zusammenspiel. Beim Anreiten zum Beispiel sitzt du aufrecht und ausbalanciert, gibst mit beiden Schenkeln einen kurzen Impuls und lässt mit der Hand so viel nach, dass das Pferd vorwärtsgehen kann. Beim Anhalten sitzt du tief (beidseitig belastend), die Schenkel liegen an, und die Hand hält kurz durch – sobald das Pferd steht, gibt sie nach.",
          "In einer Wendung zeigt der Blick die Richtung, der innere Gesäßknochen wird etwas mehr belastet, der innere Schenkel liegt am Gurt, der äußere verwahrend dahinter, und der innere Zügel weist den Weg, während der äußere begrenzt. Das ist ein Grundgerüst: Je nach Pferd und Reitweise gibt es Unterschiede, und die genaue Abstimmung lernst du im Reitunterricht.",
        ],
      },
      illustration: scene("ak-reiter-hilfen"),
      terms: [
        { term: "Innen", meaning: "Die Seite, die zur Mitte der Wendung oder der Bahn zeigt." },
        { term: "Außen", meaning: "Die Seite zur Bande hin." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w3-l5-team",
          prompt: { leicht: "Anreiten oder Anhalten? Sortiere die Karten.", mittel: "Welche Hilfe gehört zum Anreiten, welche zum Anhalten?" },
          targets: [
            { id: "anreiten", label: "Anreiten" },
            { id: "anhalten", label: "Anhalten" },
          ],
          items: [
            card("schenkel", "Kurzer Impuls mit beiden Schenkeln", item("ak-schenkel"), "anreiten", "Richtig! Der Schenkel bittet vorwärts.", "Der Schenkelimpuls bittet das Pferd vorwärts – also Anreiten."),
            card("hand-vor", "Die Hand lässt das Pferd vorwärts", item("ak-zuegel"), "anreiten", "Genau. Sonst würde die Hand bremsen.", "Wenn die Hand vorwärts lässt, kann das Pferd losgehen."),
            card("tief", "Tief sitzen", item("ak-gewicht"), "anhalten", "Richtig. Tief sitzen hilft beim Anhalten.", "Tief sitzen gehört zum Anhalten."),
            card("annehmen", "Die Hand nimmt kurz an", item("ak-stopp"), "anhalten", "Genau – und danach gibt sie nach.", "Kurz annehmen gehört zum Anhalten."),
            card("loben", "Loben, wenn das Pferd steht", item("ak-herz"), "anhalten", "Super! Lob zeigt: Das war richtig.", "Das Lob kommt, wenn das Pferd steht – nach dem Anhalten.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "team",
          prompt: "Wie arbeiten die Hilfen?",
          options: [
            ok("zusammen", "Zusammen, wie ein Team"),
            no("einzeln", "Immer nur eine allein", "Eine Hilfe allein ist oft unklar. Zusammen verstehen Pferde besser."),
            no("abwechselnd", "Nur abwechselnd, nie gleichzeitig", "Die Hilfen wirken oft gleichzeitig zusammen."),
          ],
          explain: "Richtig! Gewicht, Schenkel, Zügel und Stimme helfen sich gegenseitig.",
        },
        {
          id: "anhalten",
          prompt: "Was gehört zum Anhalten?",
          options: [
            ok("tief", "Tief sitzen und die Hand kurz annehmen"),
            no("treten", "Mit beiden Schenkeln kräftig treten", "Treten heißt für das Pferd: vorwärts!"),
            no("aufstehen", "Im Sattel aufstehen", "Zum Anhalten sitzt du tief, nicht aufrecht stehend."),
          ],
          explain: "Genau – und nachgeben, sobald das Pferd steht.",
        },
        {
          id: "anreiten",
          prompt: "Was gehört zum Anreiten?",
          options: [
            ok("schenkel", "Ein kurzer Schenkelimpuls"),
            no("ziehen", "Fest am Zügel ziehen", "Ziehen bremst – das Pferd soll ja losgehen."),
            no("zurueck", "Weit nach hinten lehnen", "Nach hinten lehnen bringt dich aus dem Gleichgewicht."),
          ],
          explain: "Richtig! Und die Hand lässt das Pferd vorwärts.",
        },
        {
          id: "innen",
          levels: ["mittel"],
          prompt: "Linkswendung: Wo liegt der innere Schenkel?",
          options: [
            ok("links-gurt", "Links am Gurt"),
            no("rechts", "Rechts hinter dem Gurt", "Das ist der äußere, verwahrende Schenkel."),
            no("hals", "Links am Pferdehals", "Am Hals liegt kein Schenkel. Der innere Schenkel liegt am Gurt."),
          ],
          explain: "Richtig. Bei einer Linkswendung ist links innen.",
        },
        {
          id: "gleich",
          levels: ["mittel"],
          prompt: "Reagieren alle Pferde gleich auf dieselben Hilfen?",
          options: [
            ok("unterschiedlich", "Nein, die Abstimmung ist bei jedem Pferd etwas anders"),
            no("gleich", "Ja, alle genau gleich", "Pferde sind verschieden ausgebildet und unterschiedlich feinfühlig."),
            no("nie", "Pferde reagieren nie auf Hilfen", "Doch – gut ausgebildete Pferde reagieren auf sehr feine Hilfen."),
          ],
          explain: "Genau. Deshalb lernt man jedes Pferd neu kennen.",
        },
      ],
      merksatz: {
        leicht: "Gewicht, Schenkel, Zügel und Stimme sind ein Team.",
        mittel: "Hilfen sind ein Zusammenspiel aus Blick, Gewicht, Schenkel und Zügel – fein abgestimmt auf das Pferd.",
      },
    },
  ]),
};
