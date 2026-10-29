import "server-only";
import { card, item, no, ok, spot, tag } from "../build";
import { lessonsOf, reviewed2026_10_29, scene, type AcademyWorld } from "../types";

/** Welt 12 – Besser reiten (Ausbau 29.10.2026) */
export const welt12: AcademyWorld = {
  id: "w12",
  number: 12,
  slug: "besser-reiten",
  title: "Besser reiten",
  teaser: "Takt, Losgelassenheit, typische Fehler und mehr Sicherheit im Sattel.",
  learns: "Takt und Rhythmus in allen Gangarten, Losgelassenheit und Zügel-aus-der-Hand-kauen-lassen, häufige Anfängerfehler und ihre Korrektur, Gleichgewicht und richtiges Verhalten, wenn ein Pferd erschrickt.",
  tint: "#E6E0D2",
  cover: scene("ak-reiter-sitz-linie"),
  badge: { id: "ra-abzeichen-w12", title: "Feine Reiterin", motif: "heart" },
  lessons: lessonsOf(12, [
    /* ---------- 1. Takt und Rhythmus ---------- */
    {
      slug: "takt-und-rhythmus",
      title: "Takt und Rhythmus",
      speaker: "mila",
      intro: {
        leicht: "Jede Gangart hat ihre eigene Musik. Kannst du sie mitzählen?",
        mittel: "Der Takt ist die erste Stufe der Ausbildung. Ohne gleichmäßigen Takt kann ein Pferd weder locker noch schwungvoll gehen.",
      },
      explanation: {
        leicht: [
          "Der Schritt hat vier Schläge: eins, zwei, drei, vier. Der Trab hat zwei: eins, zwei. Der Galopp hat drei: eins, zwei, drei – und dann eine kleine Pause in der Luft.",
          "Ein guter Takt ist gleichmäßig wie ein Metronom. Das Pferd wird nicht mal schnell und mal langsam.",
        ],
        mittel: [
          "Takt bedeutet die räumliche und zeitliche Gleichmäßigkeit der Tritte und Sprünge in jeder Gangart: Schritt im Viertakt, Trab im Zweitakt mit diagonalen Beinpaaren, Galopp im Dreitakt mit Schwebephase. Der Takt muss in allen Tempi und auf allen Linien erhalten bleiben – auch in Wendungen und Übergängen.",
          "Rhythmus beschreibt das gleichmäßige, schwungvolle Fließen der Bewegung: Takt plus Gleichmaß im Tempo und in der Energie. Ein Pferd kann im Takt, aber eilig und hektisch sein – dann fehlt der gute Rhythmus.",
          "Typische Taktfehler sind ein passartiger Schritt (gleichseitige Beine fast gleichzeitig), ein unregelmäßiger, „hinkender“ Trab oder ein vierschlägiger Galopp. Hilft: ruhiges, gleichmäßiges Treiben, ein mitgehender Sitz, keine harte Hand – und Mitzählen. Ein dauerhaft unregelmäßiger Takt kann auch ein Zeichen von Schmerz sein und gehört zum Tierarzt.",
        ],
      },
      illustration: scene("ak-gang-trab"),
      terms: [
        { term: "Takt", meaning: "Gleichmäßige Abfolge der Fußfolge in einer Gangart." },
        { term: "Rhythmus", meaning: "Gleichmäßiges, schwungvolles Fließen der Bewegung." },
        { term: "Passartig", meaning: "Taktfehler im Schritt: die Beine einer Seite fast gleichzeitig." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w12-l1-zaehlen",
          prompt: { leicht: "Wie viele Schläge hat die Gangart?", mittel: "Ordne jeder Gangart ihren Takt zu." },
          targets: [
            { id: "vier", label: "Viertakt" },
            { id: "zwei", label: "Zweitakt" },
            { id: "drei", label: "Dreitakt" },
          ],
          items: [
            card("schritt", "Schritt", { kind: "scene", scene: "ak-gang-schritt" }, "vier", "Richtig – eins, zwei, drei, vier.", "Der Schritt hat vier Schläge."),
            card("trab", "Trab", { kind: "scene", scene: "ak-gang-trab" }, "zwei", "Genau – diagonale Beinpaare, eins, zwei.", "Der Trab ist ein Zweitakt."),
            card("galopp", "Galopp", { kind: "scene", scene: "ak-gang-galopp-rechts" }, "drei", "Richtig – drei Schläge und dann die Schwebephase.", "Der Galopp hat drei Schläge."),
          ],
        },
      ],
      quiz: [
        {
          id: "trab",
          prompt: "Welchen Takt hat der Trab?",
          options: [
            ok("zwei", "Zweitakt"),
            no("vier", "Viertakt", "Viertakt ist der Schritt."),
            no("drei", "Dreitakt", "Dreitakt ist der Galopp."),
          ],
          explain: "Richtig! Die diagonalen Beinpaare fußen gemeinsam auf.",
        },
        {
          id: "gleich",
          prompt: "Was heißt „guter Takt“?",
          options: [
            ok("gleich", "Die Tritte sind gleichmäßig"),
            no("schnell", "Das Pferd ist möglichst schnell", "Takt hat nichts mit schnell zu tun."),
            no("laut", "Die Hufe klappern laut", "Es geht um Gleichmäßigkeit, nicht um Lautstärke."),
          ],
          explain: "Genau – gleichmäßig wie ein Metronom, ohne schneller oder langsamer zu werden.",
        },
        {
          id: "zaehlen",
          prompt: "Was hilft dir, den Takt zu spüren?",
          options: [
            ok("mitzaehlen", "Leise mitzählen"),
            no("augen-zu", "Die Augen zumachen", "Lieber mitzählen und mitschwingen – Augen bleiben offen."),
            no("festhalten", "Fest am Zügel halten", "Festhalten stört den Takt eher."),
          ],
          explain: "Richtig! Zählen hilft, Unregelmäßigkeiten zu bemerken.",
        },
        {
          id: "rhythmus",
          levels: ["mittel"],
          prompt: "Ein Pferd trabt im Takt, wird aber immer eiliger. Was fehlt?",
          options: [
            ok("rhythmus", "Ein guter Rhythmus mit gleichmäßigem Tempo"),
            no("takt", "Der Takt", "Der Takt ist ja noch da – es fehlt das Gleichmaß im Tempo."),
            no("nichts", "Nichts, eilig ist gut", "Eiligkeit ist kein Schwung, sondern Hektik."),
          ],
          explain: "Genau. Rhythmus ist Takt plus gleichmäßiges, schwungvolles Fließen.",
        },
        {
          id: "pass",
          levels: ["mittel"],
          prompt: "Was ist ein passartiger Schritt?",
          options: [
            ok("seite", "Die Beine einer Seite fußen fast gleichzeitig"),
            no("diagonal", "Die diagonalen Beine fußen gleichzeitig", "Das ist der Trab."),
            no("schnell", "Ein besonders schneller Schritt", "Es ist ein Taktfehler, keine Geschwindigkeit."),
          ],
          explain: "Richtig. Oft entsteht er durch Spannung oder eine zu feste Hand.",
        },
      ],
      merksatz: {
        leicht: "Schritt: vier. Trab: zwei. Galopp: drei. Und immer schön gleichmäßig!",
        mittel: "Takt ist die Basis: gleichmäßig in jeder Gangart, jedem Tempo und jeder Wendung. Rhythmus macht ihn schwungvoll.",
      },
    },

    /* ---------- 2. Losgelassenheit ---------- */
    {
      slug: "losgelassenheit",
      title: "Losgelassenheit und Dehnung",
      speaker: "lea",
      intro: {
        leicht: "Ein lockeres Pferd ist ein glückliches Pferd. Woran erkennst du das?",
        mittel: "Losgelassenheit heißt: Das Pferd arbeitet ohne Verspannung, mit schwingendem Rücken. Sie ist Ziel jeder Lösungsphase und Voraussetzung für alles Weitere.",
      },
      explanation: {
        leicht: [
          "Ein lockeres Pferd schnaubt zufrieden ab, kaut leise und lässt den Hals nach vorn-unten gehen. Der Schweif pendelt locker mit.",
          "Wenn du die Zügel etwas länger lässt und das Pferd sie nach vorn-unten mitnimmt, nennt man das „Zügel aus der Hand kauen lassen“. Das ist ein gutes Zeichen!",
        ],
        mittel: [
          "Zeichen der Losgelassenheit: zufriedenes Abschnauben, leichtes Kauen bei geschlossenem Maul, ein schwingender Rücken, ein locker pendelnder Schweif, gleichmäßiger Takt und die Bereitschaft, sich vorwärts-abwärts zu dehnen. Anspannung zeigt sich an festgehaltenem Rücken, hohem Kopf, eiligen Tritten oder einem eingeklemmten Schweif.",
          "Lösungsphase: Zu Beginn jeder Reitstunde wird das Pferd im Schritt am langen Zügel und dann in ruhigem Trab und Galopp auf großen Linien gelöst – mit vielen Handwechseln, Übergängen und Dehnung. Erst danach folgt anspruchsvollere Arbeit.",
          "Zügel aus der Hand kauen lassen: Du verlängerst die Zügel allmählich, das Pferd folgt der Hand und dehnt Hals und Rücken vorwärts-abwärts, ohne Tempo und Takt zu verlieren. Es zeigt, ob die Anlehnung stimmt und das Pferd losgelassen ist. Die Verbindung zum Maul bleibt dabei leicht bestehen.",
        ],
      },
      illustration: scene("ak-reiter-pause"),
      terms: [
        { term: "Losgelassenheit", meaning: "Arbeiten ohne Verspannung, mit schwingendem Rücken." },
        { term: "Dehnungshaltung", meaning: "Hals und Rücken vorwärts-abwärts gedehnt." },
        { term: "Lösungsphase", meaning: "Der lockernde Anfang jeder Reitstunde." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w12-l2-zeichen",
          prompt: { leicht: "Locker oder angespannt? Ordne zu.", mittel: "Losgelassen oder verspannt? Ordne die Zeichen zu." },
          targets: [
            { id: "locker", label: "locker" },
            { id: "fest", label: "angespannt" },
          ],
          items: [
            card("schnauben", "Zufriedenes Abschnauben", item("ak-pause"), "locker", "Richtig, das hören Reiter gern!", "Abschnauben zeigt Entspannung."),
            card("pendeln", "Schweif pendelt locker", item("ak-schaukel"), "locker", "Genau – das gehört zu einem schwingenden Rücken.", "Ein pendelnder Schweif ist ein gutes Zeichen."),
            card("kopf", "Kopf hoch, Rücken fest", item("ak-stopp"), "fest", "Richtig, das Pferd ist noch verspannt.", "Hoher Kopf und fester Rücken zeigen Spannung."),
            card("eilig", "Eilige, hektische Tritte", item("ak-blitz"), "fest", "Genau – Hektik ist kein Schwung.", "Eiligkeit zeigt Spannung."),
          ],
        },
      ],
      quiz: [
        {
          id: "zeichen",
          prompt: "Woran erkennst du ein lockeres Pferd?",
          options: [
            ok("schnaubt", "Es schnaubt zufrieden ab und kaut leise"),
            no("kopf", "Es reißt den Kopf hoch", "Das zeigt Spannung."),
            no("rennt", "Es rennt davon", "Davonrennen ist Spannung oder Angst."),
          ],
          explain: "Richtig! Abschnauben und Kauen zeigen Losgelassenheit.",
        },
        {
          id: "anfang",
          prompt: "Was machst du am Anfang jeder Reitstunde?",
          options: [
            ok("loesen", "Das Pferd ruhig lösen, zuerst Schritt am langen Zügel"),
            no("springen", "Sofort springen", "Erst müssen die Muskeln warm und locker werden."),
            no("galopp", "Gleich schnell galoppieren", "Erst lösen, dann mehr fordern."),
          ],
          explain: "Genau – ein lockeres Pferd lernt besser und bleibt gesund.",
        },
        {
          id: "kauen",
          prompt: "Was bedeutet „Zügel aus der Hand kauen lassen“?",
          options: [
            ok("dehnen", "Das Pferd nimmt die länger werdenden Zügel nach vorn-unten mit"),
            no("fressen", "Das Pferd frisst die Zügel", "Es ist ein Bild: Das Pferd dehnt sich an die Hand heran."),
            no("loslassen", "Du lässt die Zügel einfach fallen", "Die leichte Verbindung bleibt bestehen."),
          ],
          explain: "Richtig! Ein schönes Zeichen, dass das Pferd losgelassen ist.",
        },
        {
          id: "verspannt",
          levels: ["mittel"],
          prompt: "Welches Zeichen spricht gegen Losgelassenheit?",
          options: [
            ok("schweif", "Ein eingeklemmter oder schlagender Schweif"),
            no("schnauben", "Zufriedenes Abschnauben", "Das ist ein Zeichen für Losgelassenheit."),
            no("dehnung", "Dehnungsbereitschaft", "Das spricht für Losgelassenheit."),
          ],
          explain: "Genau. Der Schweif verrät viel über den Rücken.",
        },
        {
          id: "tempo",
          levels: ["mittel"],
          prompt: "Was darf sich beim Zügel-aus-der-Hand-kauen-lassen nicht ändern?",
          options: [
            ok("takt", "Takt und Tempo"),
            no("laenge", "Die Zügellänge", "Die Zügel werden ja bewusst länger."),
            no("hals", "Die Halshaltung", "Der Hals soll vorwärts-abwärts gehen."),
          ],
          explain: "Richtig. Das Pferd dehnt sich, ohne schneller oder langsamer zu werden.",
        },
      ],
      merksatz: {
        leicht: "Locker ist super: Abschnauben, Kauen, Hals nach vorn-unten.",
        mittel: "Erst lösen, dann arbeiten: Losgelassenheit zeigt sich an Abschnauben, schwingendem Rücken und Dehnungsbereitschaft.",
      },
    },

    /* ---------- 3. Anfängerfehler ---------- */
    {
      slug: "anfaengerfehler",
      title: "Häufige Anfängerfehler",
      speaker: "ben",
      intro: {
        leicht: "Jeder macht am Anfang Fehler. Hier lernst du die häufigsten – und wie du sie vermeidest.",
        mittel: "Viele Probleme beim Reiten entstehen durch wenige typische Sitz- und Hilfenfehler. Wer sie kennt, korrigiert sich schneller selbst.",
      },
      explanation: {
        leicht: [
          "Fehler eins: am Zügel festhalten. Halte dich lieber mit deinem Gleichgewicht fest, nicht am Pferdemaul. Fehler zwei: nach unten schauen. Schau immer nach vorn!",
          "Fehler drei: Absätze hochziehen und Knie zusammenkneifen. Lass das Bein lang und den Absatz tief. Und vergiss das Atmen nicht!",
        ],
        mittel: [
          "Hände: Festhalten am Zügel, verdeckte Hände (Handrücken nach oben), unruhige oder zu tiefe Hände und zu lange oder zu kurze Zügel. Richtig: aufrecht getragene Fäuste, Daumen dachförmig oben, gerade Linie Ellbogen – Hand – Pferdemaul.",
          "Sitz: Nach unten schauen, Oberkörper vor oder hinter der Senkrechten, Stuhlsitz mit Beinen zu weit vorn, hochgezogene Absätze, klemmende Knie. Richtig: Blick voraus, Linie Ohr – Schulter – Hüfte – Absatz, Bein lang und locker am Pferd, Absatz tiefster Punkt. Viele Fehler hängen zusammen: Wer klemmt, wird hochgedrückt und hält sich am Zügel fest.",
          "Hilfen: ständiges Klopfen mit dem Schenkel stumpft das Pferd ab, dauerndes Ziehen macht das Maul hart. Richtig: kurze, klare Hilfe – Reaktion abwarten – nachgeben – loben. Auch Luftanhalten und Verspannen übertragen sich auf das Pferd. Atme ruhig und bewusst aus.",
        ],
      },
      illustration: scene("ak-reiter-vor"),
      terms: [
        { term: "Verdeckte Hände", meaning: "Handrücken nach oben – macht die Hand starr." },
        { term: "Stuhlsitz", meaning: "Beine zu weit vorn, Reiter sitzt wie auf einem Stuhl." },
        { term: "Abstumpfen", meaning: "Das Pferd reagiert immer weniger auf ständige Hilfen." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w12-l3-fehler",
          prompt: { leicht: "Welcher Fehler ist hier zu sehen?", mittel: "Welcher Sitzfehler ist hier zu sehen?" },
          visual: scene("ak-reiter-stuhl"),
          options: [
            { id: "stuhl", label: "Stuhlsitz – die Beine sind zu weit vorn", correct: true },
            { id: "vor", label: "Oberkörper zu weit vorn", feedback: "Schau auf die Beine: Sie sind weit nach vorn gerutscht." },
            { id: "richtig", label: "Alles richtig", feedback: "Die Linie Schulter – Hüfte – Absatz stimmt hier nicht." },
          ],
          explain: "Richtig! Die Beine gehören unter den Körper, Absatz unter die Hüfte.",
        },
        {
          type: "hotspots",
          id: "ra-w12-l3-pruefen",
          levels: ["mittel"],
          scene: scene("ak-reiter-sitz"),
          prompt: "Prüfe deinen Sitz: Tippe die Punkte der senkrechten Linie an.",
          mode: "sequence",
          targets: [
            spot("schulter", "die Schulter", "schulter", "Die Schulter liegt über der Hüfte."),
            spot("huefte", "die Hüfte", "huefte", "Die Hüfte ist der Mittelpunkt."),
            spot("absatz", "den Absatz", "absatz", "Der Absatz liegt unter der Hüfte und ist der tiefste Punkt."),
          ],
          missHint: "Schau auf die Reiterin: Schulter, Hüfte und Absatz liegen übereinander.",
        },
      ],
      quiz: [
        {
          id: "festhalten",
          prompt: "Du wackelst im Trab. Woran hältst du dich NICHT fest?",
          options: [
            ok("zuegel", "Am Zügel"),
            no("gleichgewicht", "An deinem Gleichgewicht", "Genau damit sollst du dich halten."),
            no("riemen", "Am Haltegriff oder Riemen am Sattel", "Daran darfst du dich zur Not festhalten – der Zügel ist tabu."),
          ],
          explain: "Richtig! Der Zügel führt zum empfindlichen Pferdemaul.",
        },
        {
          id: "blick",
          prompt: "Wohin schaust du beim Reiten?",
          options: [
            ok("vorn", "Nach vorn, dorthin wo du hinwillst"),
            no("unten", "Auf den Hals des Pferdes", "Dann kippt dein Oberkörper nach vorn."),
            no("hufe", "Auf die Hufe", "Die Hufe siehst du von oben nicht – und du kippst nach vorn."),
          ],
          explain: "Genau – dein Kopf ist schwer und zieht dich sonst nach vorn.",
        },
        {
          id: "absatz",
          prompt: "Was ist mit den Absätzen richtig?",
          options: [
            ok("tief", "Der Absatz ist der tiefste Punkt"),
            no("hoch", "Absätze hochziehen", "Hochgezogene Absätze machen den Sitz unsicher."),
            no("aussen", "Absätze weit nach außen", "Das Bein liegt ruhig am Pferd."),
          ],
          explain: "Richtig! So federt dein Bein und du sitzt sicher.",
        },
        {
          id: "klopfen",
          levels: ["mittel"],
          prompt: "Warum ist ständiges Klopfen mit dem Schenkel schlecht?",
          options: [
            ok("stumpf", "Das Pferd stumpft ab und reagiert immer weniger"),
            no("muede", "Das Pferd schläft ein", "Es wird nicht müde, sondern unempfindlich."),
            no("schneller", "Das Pferd wird immer schneller", "Meist passiert das Gegenteil: Es reagiert weniger."),
          ],
          explain: "Genau. Besser: kurze, klare Hilfe – und dann Ruhe.",
        },
        {
          id: "haende",
          levels: ["mittel"],
          prompt: "Wie trägst du die Hände richtig?",
          options: [
            ok("daumen", "Aufrecht, Daumen dachförmig oben"),
            no("verdeckt", "Handrücken nach oben", "Das sind verdeckte Hände – sie werden starr."),
            no("tief", "Ganz tief neben dem Widerrist", "Zu tiefe Hände wirken rückwärts nach unten."),
          ],
          explain: "Richtig. Mit der Linie Ellbogen – Hand – Pferdemaul.",
        },
      ],
      merksatz: {
        leicht: "Nach vorn schauen, Absatz tief, Bein lang, nicht am Zügel festhalten – und atmen!",
        mittel: "Hände aufrecht, Blick voraus, Bein lang und locker, kurze klare Hilfen mit Nachgeben – viele Fehler lösen sich mit dem Sitz.",
      },
    },

    /* ---------- 4. Sicherer im Sattel ---------- */
    {
      slug: "sicherer-im-sattel",
      title: "Sicherer im Sattel werden",
      speaker: "mila",
      intro: {
        leicht: "Was tust du, wenn dein Pferd erschrickt? Hier lernst du, ruhig zu bleiben.",
        mittel: "Sicherheit im Sattel kommt aus Gleichgewicht, Erfahrung und klaren Abläufen für schwierige Momente. Das kann man üben.",
      },
      explanation: {
        leicht: [
          "Gleichgewicht übst du am besten an der Longe: Arme kreisen, ohne Bügel reiten, Augen auf. So wirst du immer sicherer.",
          "Erschrickt dein Pferd: ruhig bleiben, aufrecht sitzen, nach vorn schauen und die Beine dranlassen. Sprich ruhig mit deinem Pferd und reite auf einen großen Bogen.",
        ],
        mittel: [
          "Gleichgewicht trainieren: Sitzübungen an der Longe (Arme kreisen, Hände in die Hüften, ohne Bügel), viel Leichttraben und Arbeit im leichten Sitz, Voltigieren und Gymnastik außerhalb des Stalls. Ein ausbalancierter Sitz ist sicherer als jede Klammertechnik.",
          "Wenn das Pferd erschrickt: tief und aufrecht sitzen, Blick nach vorn, Bein lang am Pferd, Zügel nicht hochreißen. Mit ruhiger Stimme sprechen und das Pferd auf eine Wendung oder einen kleiner werdenden Bogen lenken – ein Pferd, das sich biegen muss, kann kaum davonstürmen. Danach ruhig weiterreiten und zur Not mit Abstand an der gruseligen Stelle vorbei.",
          "Vorbeugen: Helm immer, passende Ausrüstung, Bügel mit Sicherheitsfunktion, nicht allein ausreiten. Kenne den Notfallplan deines Stalls. Wie man sich im Notfall vom Pferd abrollt, lernt man in einem Falltraining unter Anleitung – nicht allein ausprobieren.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Longe", meaning: "Langes Seil, an dem das Pferd im Kreis um die Reitlehrkraft läuft – ideal für Sitzübungen." },
        { term: "Falltraining", meaning: "Kurs, in dem man sicheres Abrollen bei einem Sturz übt." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w12-l4-schreck",
          prompt: { leicht: "Dein Pferd erschrickt. Was hilft? Tippe alles Richtige an.", mittel: "Welche Reaktionen sind richtig, wenn das Pferd erschrickt?" },
          options: [
            { id: "ruhig", label: "Ruhig bleiben und tief atmen", visual: item("ak-pause"), correct: true },
            { id: "vorn", label: "Aufrecht sitzen, nach vorn schauen", visual: item("ak-auge"), correct: true },
            { id: "bogen", label: "Auf einen Bogen lenken", visual: tag("↺"), correct: true },
            { id: "schreien", label: "Laut schreien", visual: item("ak-blitz"), feedback: "Schreien macht das Pferd noch unruhiger." },
            { id: "reissen", label: "Die Zügel hochreißen", visual: item("ak-stopp"), feedback: "Hochreißen bringt dich und das Pferd aus dem Gleichgewicht." },
            { id: "vorbeugen", label: "Sich nach vorn auf den Hals legen", visual: item("ak-schaukel"), feedback: "Nach vorn verlierst du leicht den Halt – aufrecht ist sicherer." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Es fehlt noch mindestens eine richtige Reaktion." },
          explain: "Super! Ruhig, aufrecht, Blick nach vorn – und auf einen Bogen.",
        },
      ],
      quiz: [
        {
          id: "erschrickt",
          prompt: "Dein Pferd erschrickt vor einer Plane. Was machst du zuerst?",
          options: [
            ok("ruhig", "Ruhig bleiben und aufrecht sitzen"),
            no("absteigen", "Sofort abspringen", "Abspringen in der Bewegung ist gefährlich."),
            no("strafen", "Das Pferd bestrafen", "Angst wird durch Strafe nur größer."),
          ],
          explain: "Richtig! Deine Ruhe überträgt sich auf das Pferd.",
        },
        {
          id: "longe",
          prompt: "Wo übst du am besten dein Gleichgewicht?",
          options: [
            ok("longe", "An der Longe mit Reitlehrerin"),
            no("gelaende", "Allein im Gelände", "Allein ist es zu unsicher zum Üben."),
            no("springen", "Beim Springen", "Erst kommt das Gleichgewicht an der Longe."),
          ],
          explain: "Genau! Dort kannst du dich ganz auf deinen Sitz konzentrieren.",
        },
        {
          id: "helm",
          prompt: "Wann trägst du einen Reithelm?",
          options: [
            ok("immer", "Immer, wenn du reitest"),
            no("springen", "Nur beim Springen", "Auch im Schritt kann man fallen."),
            no("nie", "Nur wenn es regnet", "Der Helm schützt deinen Kopf – bei jedem Ritt."),
          ],
          explain: "Richtig! Ohne Helm wird nicht geritten.",
        },
        {
          id: "bogen",
          levels: ["mittel"],
          prompt: "Warum hilft ein kleiner werdender Bogen, wenn ein Pferd davonstürmen will?",
          options: [
            ok("biegen", "Ein Pferd, das sich biegen muss, kann kaum geradeaus losrennen"),
            no("schwindelig", "Weil ihm schwindelig wird", "Es geht um Biegung und Kontrolle, nicht um Schwindel."),
            no("muede", "Weil es müde wird", "Der Effekt kommt sofort durch die Biegung."),
          ],
          explain: "Genau. Dabei bleibst du ruhig und sitzt tief.",
        },
        {
          id: "falltraining",
          levels: ["mittel"],
          prompt: "Wo lernt man, sich bei einem Sturz richtig abzurollen?",
          options: [
            ok("kurs", "In einem Falltraining unter Anleitung"),
            no("allein", "Allein auf dem Pferd ausprobieren", "Das ist viel zu gefährlich."),
            no("video", "Nur aus einem Video", "Ein Video ersetzt kein Training mit Anleitung."),
          ],
          explain: "Richtig. Viele Vereine und Verbände bieten solche Kurse an.",
        },
      ],
      merksatz: {
        leicht: "Ruhig bleiben, aufrecht sitzen, nach vorn schauen – und Gleichgewicht an der Longe üben.",
        mittel: "Sicherheit = Gleichgewicht + Ruhe + klare Abläufe: tief sitzen, Bein dran, auf einen Bogen lenken, Helm immer.",
      },
      practiceNote: "Sitzübungen ohne Bügel und alle Notfallübungen nur an der Longe bzw. unter Anleitung einer Reitlehrkraft.",
    },
  ], reviewed2026_10_29),
};
