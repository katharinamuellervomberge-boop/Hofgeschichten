import "server-only";
import { card, item, no, ok, tag } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 14 – Springen (Ausbau 29.10.2026) */
export const welt14: AcademyWorld = {
  id: "w14",
  number: 14,
  slug: "springen",
  title: "Springen",
  teaser: "Springsitz, Sprungphasen, Hindernisse, Distanzen und Parcours.",
  learns: "Springsitz und Bügellänge, die fünf Phasen eines Sprungs (was Pferd und Reiter tun), Hindernisarten (Steilsprung, Oxer, Triplebarre, Mauer, Wassergraben, Kreuz, Cavaletti), Galoppsprung und Distanzen, Kombinationen, unterschiedliche Sprünge richtig anreiten, Wendungen und Parcours, Regeln und Strafpunkte, Sicherheit und Pferdewohl.",
  tint: "#E9E2D0",
  cover: scene("ak-sprung-flug"),
  badge: { id: "ra-abzeichen-w14", title: "Springreiter", motif: "jump" },
  lessons: lessonsOf(14, [
    /* ---------- 1. Springsitz ---------- */
    {
      slug: "springsitz",
      title: "Der Springsitz",
      speaker: "ben",
      intro: {
        leicht: "Zum Springen sitzt du anders als in der Dressur: Bügel kürzer, Po etwas aus dem Sattel!",
        mittel: "Im Springsitz entlastet der Reiter den Pferderücken und kann der Bewegung über dem Sprung folgen. Grundlage ist ein sicherer leichter Sitz.",
      },
      explanation: {
        leicht: [
          "Für das Springen schnallst du die Bügel ein paar Löcher kürzer. Dann sitzt du im leichten Sitz: Po leicht über dem Sattel, Oberkörper etwas nach vorn, Absatz tief.",
          "Deine Hände liegen neben dem Hals. Dein Blick geht nach vorn – über den Sprung hinweg zum nächsten Ziel.",
        ],
        mittel: [
          "Bügellänge: Zum Springen werden die Bügel meist zwei bis vier Löcher kürzer geschnallt als zum Dressurreiten. So werden Hüft-, Knie- und Fußgelenk stärker gewinkelt und können federn.",
          "Leichter Sitz / Springsitz: Das Gesäß ist entlastet und bleibt dicht über dem Sattel, der Oberkörper neigt sich aus der Hüfte nach vorn, der Rücken bleibt gerade. Knie und Oberschenkel liegen ruhig am Sattel, ohne zu klemmen. Der Absatz ist der tiefste Punkt, der Unterschenkel liegt am Gurt. Die Hände stehen neben dem Mähnenkamm mit gerader Linie Ellbogen – Hand – Pferdemaul.",
          "Gleichgewicht: Der Schwerpunkt des Reiters liegt über den Bügeln, nicht hinter der Bewegung. Gute Übungen sind leicht sitzen im Trab und Galopp, Stangen- und Cavaletti-Arbeit sowie kleine Gymnastikreihen. Anfänger dürfen sich in der Mähne festhalten („Mähnengriff“), damit sie dem Pferd nicht im Maul ziehen.",
        ],
      },
      illustration: scene("ak-sprung-anreiten"),
      terms: [
        { term: "Leichter Sitz", meaning: "Entlastender Sitz mit kürzeren Bügeln und vorgeneigtem Oberkörper." },
        { term: "Mähnengriff", meaning: "Anfänger halten sich beim Sprung in der Mähne fest statt am Zügel." },
        { term: "Federn", meaning: "Hüfte, Knie und Fußgelenk fangen die Bewegung elastisch ab." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w14-l1-sitz",
          prompt: { leicht: "Was gehört zum Springsitz? Tippe alles Richtige an.", mittel: "Welche Merkmale beschreiben einen guten Springsitz?" },
          options: [
            { id: "buegel", label: "Bügel ein paar Löcher kürzer", visual: item("ak-buegel"), correct: true },
            { id: "absatz", label: "Absatz ist der tiefste Punkt", visual: item("ak-stiefel"), correct: true },
            { id: "blick", label: "Blick nach vorn über den Sprung", visual: item("ak-auge"), correct: true },
            { id: "klemmen", label: "Knie fest zusammenkneifen", visual: item("ak-stopp"), feedback: "Klemmende Knie drücken dich hoch – Bein ruhig anlegen." },
            { id: "zuegel", label: "Am Zügel festhalten", visual: item("ak-blitz"), feedback: "Halt dich lieber an der Mähne fest als am Pferdemaul." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas.", mittel: "Es fehlt noch mindestens ein Merkmal." },
          explain: "Super! Kurze Bügel, tiefer Absatz, Blick voraus.",
        },
      ],
      quiz: [
        {
          id: "buegel",
          prompt: "Wie lang sind die Bügel zum Springen?",
          options: [
            ok("kuerzer", "Ein paar Löcher kürzer als beim Dressurreiten"),
            no("laenger", "Länger als sonst", "Zum Springen schnallt man kürzer."),
            no("gleich", "Genau gleich", "Kürzere Bügel helfen beim Federn."),
          ],
          explain: "Richtig! So können deine Gelenke federn.",
        },
        {
          id: "po",
          prompt: "Wo ist dein Po im leichten Sitz?",
          options: [
            ok("ueber", "Leicht über dem Sattel"),
            no("drin", "Ganz tief im Sattel", "Im leichten Sitz wird der Rücken entlastet."),
            no("hoch", "Ganz hoch, Beine gestreckt", "Dann verlierst du das Gleichgewicht."),
          ],
          explain: "Genau – dicht über dem Sattel, nicht hoch in der Luft.",
        },
        {
          id: "blick",
          prompt: "Wohin schaust du beim Springen?",
          options: [
            ok("ueber", "Über den Sprung hinweg zum nächsten Ziel"),
            no("stange", "Auf die Stange", "Wer auf die Stange schaut, landet oft davor."),
            no("unten", "Nach unten", "Dann kippst du nach vorn."),
          ],
          explain: "Richtig! Dein Blick zieht dich und dein Pferd über den Sprung.",
        },
        {
          id: "mähne",
          levels: ["mittel"],
          prompt: "Warum dürfen Anfänger in die Mähne greifen?",
          options: [
            ok("maul", "Damit sie dem Pferd nicht im Maul ziehen, wenn sie das Gleichgewicht verlieren"),
            no("schneller", "Damit das Pferd schneller wird", "Es geht um das Maul des Pferdes."),
            no("schoen", "Weil es schöner aussieht", "Es ist eine Sicherheitshilfe für das Pferdemaul."),
          ],
          explain: "Genau. Mit mehr Erfahrung geht die Hand frei mit.",
        },
        {
          id: "schwerpunkt",
          levels: ["mittel"],
          prompt: "Wo liegt dein Schwerpunkt im Springsitz?",
          options: [
            ok("buegel", "Über den Bügeln"),
            no("hinten", "Hinter dem Sattel", "Dann bist du hinter der Bewegung."),
            no("hals", "Weit vorn auf dem Hals", "Dann fällst du bei einem Stopp nach vorn."),
          ],
          explain: "Richtig. So bleibst du im Gleichgewicht mit dem Pferd.",
        },
      ],
      merksatz: {
        leicht: "Bügel kürzer, Po leicht aus dem Sattel, Absatz tief, Blick über den Sprung.",
        mittel: "Springsitz: kürzere Bügel, federnde Gelenke, Schwerpunkt über den Bügeln, Hand neben dem Mähnenkamm, Blick voraus.",
      },
    },

    /* ---------- 2. Die Phasen eines Sprungs ---------- */
    {
      slug: "phasen-eines-sprungs",
      title: "Die fünf Phasen eines Sprungs",
      speaker: "lea",
      intro: {
        leicht: "Ein Sprung dauert nur eine Sekunde – aber es passiert ganz viel! Wir schauen ihn uns in Zeitlupe an.",
        mittel: "Jeder Sprung besteht aus fünf Phasen. Für jede Phase gilt: Was macht das Pferd – und was macht der Reiter, damit er es nicht stört?",
      },
      explanation: {
        leicht: [
          "1. Anreiten: ruhiger, gleichmäßiger Galopp. 2. Absprung: Das Pferd hebt die Vorderbeine, die Hinterbeine drücken ab. Du gehst mit dem Oberkörper mit nach vorn.",
          "3. Flug: Das Pferd macht einen runden Rücken, deine Hände gehen mit. 4. Landung: Die Vorderbeine landen, du federst in Knie und Fußgelenk. 5. Weiterreiten: Blick zum nächsten Ziel!",
        ],
        mittel: [
          "1. Anreiten: Das Pferd galoppiert im gleichmäßigen Takt und mit genug Schwung auf einer geraden Linie zur Mitte des Hindernisses. In den letzten Galoppsprüngen senkt es Kopf und Hals etwas, um den Sprung abzumessen. Der Reiter sitzt im leichten Sitz, hält Takt und Linie und schaut über den Sprung.",
          "2. Absprung: Das Pferd setzt die Vorderbeine auf, hebt die Vorhand, die Hinterbeine fußen dicht nebeneinander unter den Körper und stoßen kraftvoll ab. Der Reiter schließt den Hüftwinkel und geht mit dem Oberkörper nach vorn, die Hand folgt nach vorn. 3. Flugphase: Das Pferd streckt Kopf und Hals nach vorn-unten und rundet den Rücken (Bascule), die Vorderbeine werden angewinkelt. Der Reiter bleibt mit dem Oberkörper über dem Pferd, das Bein stabil am Gurt, die Hand geht entlang des Halses mit.",
          "4. Landung: Die Vorderbeine landen nacheinander, Hals und Kopf heben sich zum Ausbalancieren. Der Reiter fängt sein Gewicht in Knie- und Fußgelenk ab, richtet den Oberkörper etwas auf, die Hand bleibt nachgiebig. 5. Weiterreiten: Das Pferd galoppiert ruhig weiter, der Reiter nimmt die Zügel auf und reitet mit Blick und Gewicht zum nächsten Ziel – idealerweise landet das Pferd schon im passenden Galopp.",
        ],
      },
      illustration: scene("ak-sprung-flug"),
      terms: [
        { term: "Bascule", meaning: "Die runde Bogenform des Pferdes über dem Sprung." },
        { term: "Hüftwinkel schließen", meaning: "Oberkörper aus der Hüfte nach vorn neigen." },
        { term: "Taxieren", meaning: "Das Pferd misst vor dem Sprung den Absprungpunkt ab." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w14-l2-phasen",
          prompt: { leicht: "Welches Bild zeigt welche Phase?", mittel: "Ordne die Bilder den Sprungphasen zu." },
          targets: [
            { id: "absprung", label: "Absprung" },
            { id: "flug", label: "Flugphase" },
            { id: "landung", label: "Landung" },
          ],
          items: [
            card("a", "Vorderbeine hoch, Hinterbeine drücken ab", { kind: "scene", scene: "ak-sprung-absprung" }, "absprung", "Richtig – die Hinterhand gibt die Kraft.", "Das ist der Absprung."),
            card("f", "Runder Rücken über der Stange", { kind: "scene", scene: "ak-sprung-flug" }, "flug", "Genau, die Bascule in der Flugphase.", "Das ist die Flugphase."),
            card("l", "Vorderbein landet", { kind: "scene", scene: "ak-sprung-landung" }, "landung", "Richtig! Jetzt federt der Reiter ab.", "Das ist die Landung."),
          ],
        },
        {
          type: "match",
          id: "ra-w14-l2-reiter",
          levels: ["mittel"],
          prompt: "Was tut der Reiter in welcher Phase?",
          targets: [
            { id: "anreiten", label: "Anreiten" },
            { id: "flug", label: "Flug" },
            { id: "landung", label: "Landung" },
          ],
          items: [
            card("takt", "Takt und Linie halten, Blick über den Sprung", item("ak-auge"), "anreiten", "Richtig – Vorbereitung ist alles.", "Das gehört zum Anreiten."),
            card("hand", "Hand geht am Hals entlang mit", item("ak-zuegel"), "flug", "Genau, damit das Pferd sich strecken kann.", "Die Hand geht in der Flugphase mit."),
            card("federn", "Gewicht in Knie und Fußgelenk abfangen", item("ak-stiefel"), "landung", "Richtig! Das schont den Pferderücken.", "Abfedern gehört zur Landung."),
          ],
        },
      ],
      quiz: [
        {
          id: "wie-viele",
          prompt: "Wie viele Phasen hat ein Sprung?",
          options: [
            ok("fuenf", "Fünf"),
            no("zwei", "Zwei", "Anreiten, Absprung, Flug, Landung, Weiterreiten – das sind fünf."),
            no("eine", "Eine", "Ein Sprung hat mehrere Phasen."),
          ],
          explain: "Richtig! Anreiten, Absprung, Flug, Landung, Weiterreiten.",
        },
        {
          id: "kraft",
          prompt: "Woher kommt die Kraft beim Absprung?",
          options: [
            ok("hinten", "Aus den Hinterbeinen"),
            no("vorne", "Aus den Vorderbeinen", "Die Vorderbeine heben ab – die Kraft kommt von hinten."),
            no("reiter", "Vom Reiter", "Der Reiter springt nicht – er geht mit."),
          ],
          explain: "Genau – die Hinterhand ist der Motor.",
        },
        {
          id: "hand",
          prompt: "Was machen deine Hände über dem Sprung?",
          options: [
            ok("mit", "Sie gehen am Hals entlang nach vorn mit"),
            no("ziehen", "Sie ziehen die Zügel an", "Dann kann das Pferd Kopf und Hals nicht strecken."),
            no("hoch", "Sie gehen hoch in die Luft", "Die Hände bleiben dicht am Hals."),
          ],
          explain: "Richtig! Das Pferd braucht Kopf und Hals zum Springen.",
        },
        {
          id: "landung",
          levels: ["mittel"],
          prompt: "Was tut das Pferd bei der Landung mit Kopf und Hals?",
          options: [
            ok("heben", "Es hebt sie an, um sich auszubalancieren"),
            no("senken", "Es senkt sie ganz tief", "Gesenkt werden sie vor dem Absprung und im Flug."),
            no("dreht", "Es dreht den Kopf zur Seite", "Das Pferd gleicht mit dem Hals das Gleichgewicht aus."),
          ],
          explain: "Genau – deshalb bleibt die Reiterhand auch bei der Landung nachgiebig.",
        },
        {
          id: "bascule",
          levels: ["mittel"],
          prompt: "Was ist die Bascule?",
          options: [
            ok("bogen", "Die runde Bogenform des Pferdes über dem Sprung"),
            no("sattel", "Ein besonderer Springsattel", "Bascule beschreibt die Bewegung des Pferdes."),
            no("fehler", "Ein Springfehler", "Eine gute Bascule ist erwünscht."),
          ],
          explain: "Richtig. Ein Pferd mit guter Bascule springt rund und effizient.",
        },
        {
          id: "absprung-reiter",
          levels: ["mittel"],
          prompt: "Was tut der Reiter im Absprung?",
          options: [
            ok("hueftwinkel", "Er schließt den Hüftwinkel und geht mit dem Oberkörper nach vorn mit"),
            no("zuruecklehnen", "Er lehnt sich weit zurück", "Dann wäre er hinter der Bewegung und würde dem Pferd im Rücken sitzen."),
            no("aufstehen", "Er stellt sich gerade in die Bügel", "Dann verliert er das Gleichgewicht."),
          ],
          explain: "Genau – er geht mit, statt vorauszuspringen.",
        },
      ],
      merksatz: {
        leicht: "Anreiten – Absprung – Flug – Landung – Weiterreiten. Und die Hände gehen mit!",
        mittel: "Takt und Linie im Anreiten, mitgehen im Absprung, Hand vor im Flug, abfedern bei der Landung, Blick zum nächsten Ziel.",
      },
      readTogether: true,
    },

    /* ---------- 3. Hindernisarten ---------- */
    {
      slug: "hindernisarten",
      title: "Hindernisarten",
      speaker: "mila",
      intro: {
        leicht: "Steil, Oxer, Mauer, Wasser – es gibt ganz verschiedene Sprünge!",
        mittel: "Hindernisse unterscheiden sich in Höhe, Weite und Optik. Jede Art stellt das Pferd vor andere Aufgaben – deshalb muss man sie kennen.",
      },
      explanation: {
        leicht: [
          "Ein Steilsprung hat Stangen genau übereinander. Ein Oxer hat zwei Stangenreihen hintereinander – er ist hoch und weit. Bei der Triplebarre gibt es drei Stangen wie eine Treppe.",
          "Es gibt auch Mauern, Wassergräben und für Anfänger Kreuzsprünge und Cavaletti.",
        ],
        mittel: [
          "Steilsprung: Stangen oder Planken senkrecht übereinander, ohne Tiefe – ein reiner Hochsprung. Das Pferd muss genau abspringen, eine Bodenstange davor hilft beim Taxieren. Mauer: ein Steilsprung aus leichten Holzblöcken, die herunterfallen, wenn das Pferd sie berührt.",
          "Oxer: zwei Elemente hintereinander, ein Hochweitsprung. Beim ansteigenden Oxer ist die hintere Stange höher, beim Karree-Oxer sind beide gleich hoch. Triplebarre: drei ansteigende Stangen, ein ausgeprägter Weitsprung. Wassergraben: ein Weitsprung über eine Wasserfläche, oft mit kleiner Hecke als Absprunghilfe.",
          "Für Anfänger und Gymnastik: Kreuzsprung (zwei gekreuzte Stangen, lenkt das Pferd zur Mitte), Cavaletti (niedrige Stangen auf Kreuzen) und Stangen am Boden. Im Parcours kommen Kombinationen aus zwei oder drei Sprüngen hinzu.",
        ],
      },
      illustration: scene("ak-hindernis-oxer"),
      terms: [
        { term: "Steilsprung", meaning: "Hochsprung: Stangen senkrecht übereinander." },
        { term: "Oxer", meaning: "Hochweitsprung aus zwei Stangenreihen hintereinander." },
        { term: "Triplebarre", meaning: "Weitsprung mit drei ansteigenden Stangen." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w14-l3-arten",
          prompt: { leicht: "Wie heißt das Hindernis? Ordne zu.", mittel: "Ordne die Hindernisse ihrem Namen zu." },
          targets: [
            { id: "steil", label: "Steilsprung" },
            { id: "oxer", label: "Oxer" },
            { id: "triple", label: "Triplebarre" },
            { id: "wasser", label: "Wassergraben", levels: ["mittel"] },
          ],
          items: [
            card("s", "Stangen übereinander", { kind: "scene", scene: "ak-hindernis-steil" }, "steil", "Richtig – ein reiner Hochsprung.", "Stangen übereinander = Steilsprung."),
            card("o", "Zwei Stangenreihen hintereinander", { kind: "scene", scene: "ak-hindernis-oxer" }, "oxer", "Genau – hoch und weit.", "Zwei Reihen = Oxer."),
            card("t", "Drei Stangen wie eine Treppe", { kind: "scene", scene: "ak-hindernis-triplebarre" }, "triple", "Richtig! Ein Weitsprung.", "Drei ansteigende Stangen = Triplebarre."),
            card("w", "Wasserfläche", { kind: "scene", scene: "ak-hindernis-wasser" }, "wasser", "Genau – ein reiner Weitsprung.", "Das ist der Wassergraben.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "steil",
          prompt: "Wie sieht ein Steilsprung aus?",
          options: [
            ok("ueber", "Stangen genau übereinander"),
            no("hinter", "Zwei Stangenreihen hintereinander", "Das ist ein Oxer."),
            no("wasser", "Eine Wasserfläche", "Das ist ein Wassergraben."),
          ],
          explain: "Richtig! Er ist hoch, aber nicht weit.",
        },
        {
          id: "oxer",
          prompt: "Was ist besonders am Oxer?",
          options: [
            ok("hoch-weit", "Er ist hoch und weit"),
            no("nur-hoch", "Er ist nur hoch", "Ein Oxer hat auch Weite."),
            no("boden", "Er liegt flach am Boden", "Das wäre eine Bodenstange."),
          ],
          explain: "Genau – ein Hochweitsprung aus zwei Stangenreihen.",
        },
        {
          id: "anfaenger",
          prompt: "Welches Hindernis ist gut für Anfänger?",
          options: [
            ok("kreuz", "Ein kleiner Kreuzsprung oder Cavaletti"),
            no("mauer", "Eine hohe Mauer", "Erst kommen kleine, einladende Sprünge."),
            no("triple", "Eine große Triplebarre", "Die ist für Fortgeschrittene."),
          ],
          explain: "Richtig! Das Kreuz lenkt das Pferd zur Mitte.",
        },
        {
          id: "mauer",
          levels: ["mittel"],
          prompt: "Warum ist eine Mauer im Springparcours ungefährlich, wenn das Pferd sie berührt?",
          options: [
            ok("bloecke", "Sie besteht aus leichten Blöcken, die herunterfallen"),
            no("stein", "Sie ist aus echten Steinen gemauert", "Echte Mauern wären gefährlich – im Parcours sind es leichte Blöcke."),
            no("gummi", "Sie ist aus Gummi und federt", "Die Blöcke fallen herunter."),
          ],
          explain: "Genau. Wie bei einer Stange gibt es dann Strafpunkte.",
        },
        {
          id: "ansteigend",
          levels: ["mittel"],
          prompt: "Was ist ein ansteigender Oxer?",
          options: [
            ok("hinten-hoeher", "Ein Oxer, dessen hintere Stange höher ist"),
            no("vorne-hoeher", "Ein Oxer, dessen vordere Stange höher ist", "Das wäre für das Pferd schwer zu sehen."),
            no("bergauf", "Ein Oxer am Hang", "Ansteigend bezieht sich auf die Stangenhöhe."),
          ],
          explain: "Richtig – beim Karree-Oxer sind beide Stangen gleich hoch.",
        },
      ],
      merksatz: {
        leicht: "Steil: übereinander. Oxer: hintereinander. Triplebarre: wie eine Treppe.",
        mittel: "Steil und Mauer = Hochsprung, Oxer = Hochweitsprung, Triplebarre und Wasser = Weitsprung, Kreuz und Cavaletti für den Einstieg.",
      },
    },

    /* ---------- 4. Galoppsprung und Distanzen ---------- */
    {
      slug: "galoppsprung-und-distanzen",
      title: "Galoppsprung und Distanzen",
      speaker: "ben",
      intro: {
        leicht: "Wie viele Galoppsprünge passen zwischen zwei Hindernisse? Das kann man zählen!",
        mittel: "Springreiter planen die Galoppsprünge zwischen den Hindernissen. Wer Distanzen kennt, kann sein Pferd passend zum Absprung bringen.",
      },
      explanation: {
        leicht: [
          "Ein Galoppsprung eines Großpferdes ist ungefähr dreieinhalb Meter lang. Beim Parcours-Abgehen zählt man mit großen Schritten, wie viele Galoppsprünge zwischen zwei Sprüngen liegen.",
          "Beim Reiten zählst du dann mit: eins, zwei, drei, vier – Sprung! So kommst du gut zum Absprung.",
        ],
        mittel: [
          "Ein Galoppsprung eines Großpferdes misst im Arbeitsgalopp etwa 3,5 bis 3,7 Meter, Ponys springen kürzer. Zwischen zwei Hindernissen kommen die Landung nach dem ersten und der Absprung vor dem zweiten Sprung hinzu. Als Faustregel gilt: Abstand ≈ (Anzahl der Galoppsprünge + 1) × etwa 3,6 m. Vier Galoppsprünge liegen also bei rund 18 Metern.",
          "Distanzen misst man beim Abgehen mit Schritten von etwa einem Meter. Passt die Distanz nicht genau zum eigenen Pferd, entscheidet der Reiter: Bei einer weiten Distanz mehr Vorwärts, bei einer kurzen etwas aufnehmen – oder einen Galoppsprung mehr oder weniger einplanen.",
          "Wichtig: Die Distanz wird früh, mit gleichmäßigem Galopp und klarer Linie geritten. In den letzten Galoppsprüngen vor dem Sprung sollen keine großen Änderungen mehr gemacht werden – das stört das Pferd beim Abmessen.",
        ],
      },
      illustration: scene("ak-distanz"),
      terms: [
        { term: "Distanz", meaning: "Abstand zwischen zwei Hindernissen, gemessen in Metern bzw. Galoppsprüngen." },
        { term: "Abgehen", meaning: "Den Parcours vor dem Ritt zu Fuß ablaufen und Distanzen messen." },
        { term: "Galoppsprung", meaning: "Eine vollständige Galoppbewegung, beim Großpferd ca. 3,5–3,7 m." },
      ],
      exercise: [
        {
          type: "code",
          id: "ra-w14-l4-rechnen",
          prompt: { leicht: "Zählen wie die Profis! Wie viele Galoppsprünge sind es?", mittel: "Faustregel: Abstand ≈ (Galoppsprünge + 1) × 3,6 m. Wie viele Galoppsprünge sind es?" },
          digits: [
            { riddle: { leicht: "Auf dem Bild zwischen den Sprüngen: Wie viele Galoppsprünge siehst du?", mittel: "Ca. 18 Meter zwischen zwei Sprüngen" }, visual: { leicht: scene("ak-distanz"), mittel: scene("ak-distanz") }, answer: 4, hint: { leicht: "Zähl die Bögen zwischen den Sprüngen ohne den letzten Absprung.", mittel: "18 : 3,6 = 5, minus 1." } },
            { riddle: { leicht: "Eine Kombination mit ca. 7,5 m: Wie viele Galoppsprünge?", mittel: "Ca. 7,5 Meter in einer Kombination" }, answer: 1, hint: { leicht: "Das ist eine kurze Distanz – nur ein einziger Sprung dazwischen.", mittel: "7,5 : 3,6 ≈ 2, minus 1." } },
            { riddle: { leicht: "Und bei ca. 11 m?", mittel: "Ca. 11 Meter in einer Kombination" }, answer: 2, hint: { leicht: "Etwas länger – zwei Galoppsprünge.", mittel: "11 : 3,6 ≈ 3, minus 1." } },
          ],
          success: { leicht: "Super gezählt! 4, 1 und 2 Galoppsprünge.", mittel: "Richtig: 4, 1 und 2 Galoppsprünge – so planen Springreiter ihren Ritt." },
        },
      ],
      quiz: [
        {
          id: "laenge",
          prompt: "Wie lang ist ungefähr ein Galoppsprung eines großen Pferdes?",
          options: [
            ok("35", "Etwa dreieinhalb Meter"),
            no("1", "Etwa ein Meter", "Das ist ein menschlicher Schritt."),
            no("10", "Etwa zehn Meter", "So weit springt ein Pferd im Galopp nicht."),
          ],
          explain: "Richtig! Ponys springen etwas kürzer.",
        },
        {
          id: "abgehen",
          prompt: "Wie misst man Distanzen vor dem Springen?",
          options: [
            ok("abgehen", "Man geht den Parcours ab und zählt große Schritte"),
            no("raten", "Man rät einfach", "Profis messen genau beim Abgehen."),
            no("pferd", "Das Pferd misst allein", "Der Reiter plant die Distanzen."),
          ],
          explain: "Genau – das nennt man Parcours abgehen.",
        },
        {
          id: "zaehlen",
          prompt: "Was hilft dir beim Reiten einer Distanz?",
          options: [
            ok("zaehlen", "Die Galoppsprünge mitzählen"),
            no("augen", "Die Augen zumachen", "Augen auf und zählen!"),
            no("schneller", "Immer schneller werden", "Gleichmäßiger Galopp ist wichtig."),
          ],
          explain: "Richtig! So bleibt dein Galopp gleichmäßig.",
        },
        {
          id: "faustregel",
          levels: ["mittel"],
          prompt: "Nach der Faustregel: Wie viele Galoppsprünge passen in etwa 14,5 Meter?",
          options: [
            ok("drei", "Drei"),
            no("vier", "Vier", "Vier Galoppsprünge wären rund 18 Meter."),
            no("zwei", "Zwei", "Zwei Galoppsprünge wären rund 11 Meter."),
          ],
          explain: "Genau: 14,5 : 3,6 ≈ 4, minus 1 = 3.",
        },
        {
          id: "letzte",
          levels: ["mittel"],
          prompt: "Warum ändert man in den letzten Galoppsprüngen vor dem Sprung nicht mehr viel?",
          options: [
            ok("abmessen", "Weil das Pferd dann den Absprung abmisst und nicht gestört werden soll"),
            no("verboten", "Weil es verboten ist", "Es geht um das Pferd, nicht um eine Regel."),
            no("muede", "Weil der Reiter müde ist", "Das Pferd braucht Ruhe zum Taxieren."),
          ],
          explain: "Richtig. Die Vorbereitung passiert früher.",
        },
      ],
      merksatz: {
        leicht: "Ein Galoppsprung ist etwa 3,5 Meter. Ich zähle mit bis zum Sprung!",
        mittel: "Abstand ≈ (Galoppsprünge + 1) × 3,6 m – früh planen, gleichmäßig galoppieren, kurz vor dem Sprung nicht mehr eingreifen.",
      },
    },

    /* ---------- 5. Kombinationen ---------- */
    {
      slug: "kombinationen",
      title: "Kombinationen",
      speaker: "lea",
      intro: {
        leicht: "Bei einer Kombination kommen zwei oder drei Sprünge ganz schnell hintereinander.",
        mittel: "Kombinationen bestehen aus zwei oder drei Hindernissen mit kurzen, festen Distanzen. Sie verlangen Gleichgewicht, Geradeausreiten und ein Pferd, das mitdenkt.",
      },
      explanation: {
        leicht: [
          "Die Sprünge einer Kombination heißen A, B und C. Dazwischen liegen nur ein oder zwei Galoppsprünge.",
          "Du reitest gerade auf die Mitte zu und schaust bis zum letzten Sprung. Die Hände bleiben ruhig – dein Pferd braucht jetzt Gleichgewicht.",
        ],
        mittel: [
          "Zweifache und dreifache Kombinationen bestehen aus Elementen A, B (und C). Typische Distanzen beim Großpferd: etwa 7,5–8 m für einen Galoppsprung, etwa 10,5–11 m für zwei Galoppsprünge – je nach Art der Sprünge (zwischen Steil und Oxer etwas anders). Sehr kurze Abstände ohne Galoppsprung nennt man „In-Out“; das ist etwas für Fortgeschrittene.",
          "Reiten: Die Kombination wird mit gleichmäßigem, energischem Galopp und genau auf die Mitte angeritten. Der Einsprung bestimmt alles Weitere – kommt das Pferd zu flach oder zu weit weg, wird es im Inneren eng. Zwischen den Elementen bleibt der Reiter im Gleichgewicht, hält das Bein am Pferd für den Vorwärtsimpuls und lässt das Pferd mit ruhiger Hand arbeiten.",
          "Regel: Verweigert das Pferd an einem Element, muss die ganze Kombination noch einmal von vorn gesprungen werden. Jeder Abwurf in einer Kombination zählt einzeln.",
        ],
      },
      illustration: scene("ak-kombination"),
      terms: [
        { term: "Zweifache / dreifache Kombination", meaning: "Zwei bzw. drei Hindernisse mit kurzer, fester Distanz." },
        { term: "Einsprung", meaning: "Das erste Element einer Kombination." },
        { term: "In-Out", meaning: "Zwei Sprünge ohne Galoppsprung dazwischen." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w14-l5-distanz",
          prompt: { leicht: "Zwischen A und B ist ein Galoppsprung. Wie weit ist das ungefähr?", mittel: "Wie groß ist beim Großpferd ungefähr die Distanz für einen Galoppsprung in einer Kombination?" },
          visual: scene("ak-kombination"),
          options: [
            { id: "75", label: "Etwa 7,5 bis 8 Meter", correct: true },
            { id: "3", label: "Etwa 3 Meter", feedback: "Das wäre fast ein In-Out ohne Galoppsprung." },
            { id: "15", label: "Etwa 15 Meter", feedback: "Das wären drei Galoppsprünge." },
          ],
          explain: "Richtig! Landung, ein Galoppsprung, Absprung – zusammen etwa 7,5 bis 8 Meter.",
        },
      ],
      quiz: [
        {
          id: "namen",
          prompt: "Wie heißen die Sprünge einer Kombination?",
          options: [
            ok("abc", "A, B und C"),
            no("123", "Eins, zwei, drei", "Die Elemente einer Kombination heißen A, B, C."),
            no("xyz", "X, Y und Z", "Die Elemente heißen A, B, C."),
          ],
          explain: "Richtig! Im Parcours stehen sie z. B. als 5a, 5b und 5c.",
        },
        {
          id: "linie",
          prompt: "Wie reitest du eine Kombination an?",
          options: [
            ok("gerade", "Gerade auf die Mitte, Blick bis zum letzten Sprung"),
            no("schraeg", "Schräg von der Seite", "Schräg wird es in der Kombination sehr schwer."),
            no("langsam", "Ganz langsam im Trab", "Kombinationen braucht einen energischen Galopp."),
          ],
          explain: "Genau – gerade und mit Schwung.",
        },
        {
          id: "verweigern",
          prompt: "Was passiert, wenn das Pferd am Sprung B verweigert?",
          options: [
            ok("neu", "Die ganze Kombination wird noch einmal von vorn gesprungen"),
            no("nur-b", "Man springt nur B noch einmal", "Es geht immer wieder bei A los."),
            no("weiter", "Man reitet einfach zum nächsten Sprung", "Dann würde man ein Hindernis auslassen."),
          ],
          explain: "Richtig. Die Kombination gilt als ein Hindernis.",
        },
        {
          id: "zwei",
          levels: ["mittel"],
          prompt: "Welche Distanz passt ungefähr zu zwei Galoppsprüngen in einer Kombination?",
          options: [
            ok("11", "Etwa 10,5 bis 11 Meter"),
            no("7", "Etwa 7,5 Meter", "Das passt zu einem Galoppsprung."),
            no("20", "Etwa 20 Meter", "Das wären rund fünf Galoppsprünge."),
          ],
          explain: "Genau – je nach Sprungart kann die Distanz leicht abweichen.",
        },
        {
          id: "einsprung",
          levels: ["mittel"],
          prompt: "Warum ist der Einsprung so wichtig?",
          options: [
            ok("alles", "Er bestimmt, wie das Pferd in die folgenden Elemente kommt"),
            no("leicht", "Weil er der leichteste Sprung ist", "Es geht um den weiteren Verlauf."),
            no("egal", "Er ist nicht wichtig", "Ein schlechter Einsprung macht die Distanzen schwierig."),
          ],
          explain: "Richtig. Kommt das Pferd falsch hinein, wird es innen eng oder weit.",
        },
      ],
      merksatz: {
        leicht: "A, B, C ganz schnell hintereinander: gerade reiten, Blick bis zum Ende, ruhige Hände.",
        mittel: "Kombination = feste kurze Distanzen (ca. 7,5–8 m / 10,5–11 m): guter Einsprung, gerade Linie, Bein dran – bei Verweigerung von vorn.",
      },
    },

    /* ---------- 6. Sprünge richtig anreiten ---------- */
    {
      slug: "spruenge-anreiten",
      title: "Steil, Oxer und Co. richtig anreiten",
      speaker: "mila",
      intro: {
        leicht: "Jeder Sprung will ein bisschen anders geritten werden. Hier lernst du, wie.",
        mittel: "Hoch oder weit – die Art des Hindernisses bestimmt Tempo, Galopp und Absprungpunkt. Gute Springreiter passen ihren Galopp jedem Sprung an.",
      },
      explanation: {
        leicht: [
          "Steilsprung: ruhiger, kräftiger Galopp und nicht zu schnell. Das Pferd muss hochspringen.",
          "Oxer und Triplebarre: mit etwas mehr Schwung, denn das Pferd muss auch weit springen. Immer gerade auf die Mitte reiten und über den Sprung schauen.",
        ],
        mittel: [
          "Für alle Sprünge gilt: gerade Linie auf die Mitte, gleichmäßiger Takt, Blick über das Hindernis, Bein am Pferd, ruhige Hand. Je höher der Sprung, desto wichtiger ist ein ausbalancierter, „aufgenommener“ Galopp mit Energie aus der Hinterhand.",
          "Steilsprung und Mauer: aus einem aufgenommenen, kraftvollen Galopp, nicht zu schnell. Das Pferd darf ruhig etwas näher an den Sprung kommen, um sich hochzudrücken. Oxer: mit mehr Vorwärts und etwas längerem Galoppsprung, damit das Pferd genug Weite hat; der Absprung liegt nicht zu weit weg, sonst reicht die Weite nicht. Triplebarre: flüssig vorwärts, der Absprung dicht an der ersten, niedrigen Stange.",
          "Wassergraben: mit deutlichem Vorwärts und Blick weit über das Wasser, nicht ins Wasser schauen. Kombinationen: auf den Einsprung passend reiten und Tempo halten. Bei Unsicherheit gilt: lieber gleichmäßig weiter galoppieren als in den letzten Sprüngen hektisch zu ziehen oder zu treiben.",
        ],
      },
      illustration: scene("ak-hindernis-steil"),
      terms: [
        { term: "Aufgenommener Galopp", meaning: "Kraftvoller, ausbalancierter Galopp mit kürzeren Sprüngen." },
        { term: "Absprungpunkt", meaning: "Stelle, an der das Pferd vor dem Hindernis abspringt." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w14-l6-anreiten",
          prompt: { leicht: "Wie reitest du welchen Sprung an?", mittel: "Ordne jedem Hindernis die passende Anreitweise zu." },
          targets: [
            { id: "ruhig", label: "Ruhig und kraftvoll, nicht zu schnell" },
            { id: "vorwaerts", label: "Mit mehr Vorwärts und Weite" },
          ],
          items: [
            card("steil", "Steilsprung", { kind: "scene", scene: "ak-hindernis-steil" }, "ruhig", "Richtig – das Pferd muss hoch, nicht weit.", "Der Steilsprung braucht einen aufgenommenen Galopp."),
            card("mauer", "Mauer", { kind: "scene", scene: "ak-hindernis-mauer" }, "ruhig", "Genau, die Mauer wird wie ein Steilsprung geritten.", "Die Mauer ist ein Steilsprung."),
            card("oxer", "Oxer", { kind: "scene", scene: "ak-hindernis-oxer" }, "vorwaerts", "Richtig – der Oxer braucht Weite.", "Der Oxer braucht mehr Vorwärts."),
            card("wasser", "Wassergraben", { kind: "scene", scene: "ak-hindernis-wasser" }, "vorwaerts", "Genau – ein reiner Weitsprung.", "Wasser braucht Vorwärts.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "steil",
          prompt: "Wie reitest du einen Steilsprung an?",
          options: [
            ok("ruhig", "Ruhig und kraftvoll, nicht zu schnell"),
            no("rasen", "So schnell wie möglich", "Zu schnell wird das Pferd flach und reißt die Stange."),
            no("trab", "Im ganz langsamen Trab", "Für einen Steilsprung brauchst du einen kraftvollen Galopp."),
          ],
          explain: "Richtig! Das Pferd soll sich hochdrücken können.",
        },
        {
          id: "oxer",
          prompt: "Was braucht ein Oxer?",
          options: [
            ok("weite", "Mehr Vorwärts, damit das Pferd weit genug springt"),
            no("langsam", "Besonders wenig Schwung", "Ohne Schwung reicht die Weite nicht."),
            no("seite", "Schräges Anreiten", "Geradeaus auf die Mitte ist immer richtig."),
          ],
          explain: "Genau – ein Oxer ist hoch und weit.",
        },
        {
          id: "mitte",
          prompt: "Wohin reitest du jeden Sprung an?",
          options: [
            ok("mitte", "Gerade auf die Mitte"),
            no("rand", "An den Rand neben den Ständer", "Dort ist die Gefahr eines Vorbeilaufens groß."),
            no("ecke", "Schräg über eine Ecke", "Gerade ist sicherer und leichter für das Pferd."),
          ],
          explain: "Richtig! So hat das Pferd die besten Chancen.",
        },
        {
          id: "wasser",
          levels: ["mittel"],
          prompt: "Wohin schaust du beim Wassergraben?",
          options: [
            ok("weit", "Weit über das Wasser hinaus"),
            no("wasser", "Ins Wasser", "Wer ins Wasser schaut, landet oft darin."),
            no("boden", "Auf den Boden vor der Hecke", "Dein Blick zieht euch nach vorn."),
          ],
          explain: "Genau. Mit Vorwärts und Blick weit voraus.",
        },
        {
          id: "triple",
          levels: ["mittel"],
          prompt: "Wo liegt der Absprung bei einer Triplebarre?",
          options: [
            ok("nah", "Dicht an der ersten, niedrigen Stange"),
            no("weit", "Möglichst weit davor", "Dann reicht die Weite bis zur hohen hinteren Stange nicht."),
            no("unter", "Unter der höchsten Stange", "Das Pferd springt vor dem Hindernis ab."),
          ],
          explain: "Richtig – mit flüssigem Vorwärts in den Sprung hinein.",
        },
      ],
      merksatz: {
        leicht: "Steil: ruhig und kräftig. Oxer: mit mehr Schwung. Immer gerade auf die Mitte!",
        mittel: "Hochsprung aus aufgenommenem Galopp, Weitsprung mit mehr Vorwärts – gerade, im Takt, Blick über das Hindernis.",
      },
    },

    /* ---------- 7. Parcours und Wendungen ---------- */
    {
      slug: "parcours-und-wendungen",
      title: "Der Parcours: Wendungen und Linien",
      speaker: "ben",
      intro: {
        leicht: "Ein Parcours ist wie ein Weg mit Sprüngen. Du musst dir merken, wo es langgeht!",
        mittel: "Ein guter Parcoursritt beginnt mit dem Abgehen. Linien, Wendungen und der richtige Galopp entscheiden über einen flüssigen Ritt.",
      },
      explanation: {
        leicht: [
          "Die Sprünge haben Nummern. Vorher gehst du den Parcours zu Fuß ab und merkst dir den Weg. Die rote Fahne ist rechts, die weiße links.",
          "Nach der Glocke reitest du durch die Startlinie. In den Kurven schaust du schon zum nächsten Sprung.",
        ],
        mittel: [
          "Ablauf: Den Parcours vorher abgehen, die Reihenfolge einprägen, Distanzen messen und Wendungen planen. Nach dem Startsignal (Glocke) hat der Reiter in der Regel 45 Sekunden Zeit, die Startlinie zu durchreiten. Die Hindernisse sind nummeriert und müssen in der richtigen Reihenfolge und Richtung gesprungen werden: rote Fahne rechts, weiße Fahne links.",
          "Linien und Wendungen: Wendungen früh einleiten und gleichmäßig reiten, damit das Pferd gerade auf den nächsten Sprung zukommt. Ein früher Blick zum nächsten Hindernis hilft, die Linie zu finden. Engere Wendungen sparen Zeit, verlangen aber ein gut ausbalanciertes Pferd.",
          "Galopp: In Wendungen soll das Pferd im passenden Galopp gehen. Durch Blick und Gewicht über dem Sprung kann man den Galopp für die nächste Wendung vorbereiten, sonst wird ein einfacher oder fliegender Galoppwechsel geritten. Nach dem letzten Sprung durchreitet man die Ziellinie.",
        ],
      },
      illustration: scene("ak-bahn-zirkel"),
      terms: [
        { term: "Parcours", meaning: "Die Strecke mit nummerierten Hindernissen in einer Springprüfung." },
        { term: "Startlinie / Ziellinie", meaning: "Markierte Linien, durch die man den Ritt beginnt und beendet." },
        { term: "Rot rechts, weiß links", meaning: "So stehen die Fahnen an jedem Hindernis in Sprungrichtung." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w14-l7-parcours",
          prompt: { leicht: "Was gehört zum Parcoursreiten? Tippe alles Richtige an.", mittel: "Welche Aussagen zum Parcours stimmen?" },
          options: [
            { id: "abgehen", label: "Den Parcours vorher abgehen", visual: item("ak-auge"), correct: true },
            { id: "fahne", label: "Rote Fahne rechts, weiße links", visual: tag("● ○"), correct: true },
            { id: "glocke", label: "Nach der Glocke durch die Startlinie", visual: tag("🔔"), correct: true },
            { id: "egal", label: "Die Reihenfolge ist egal", visual: item("ak-blitz"), feedback: "Die Sprünge müssen in der richtigen Reihenfolge gesprungen werden." },
            { id: "spaet", label: "Erst kurz vor dem Sprung abwenden", visual: item("ak-stopp"), feedback: "Wendungen früh einleiten, damit das Pferd gerade ankommt." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas.", mittel: "Es fehlt noch mindestens eine richtige Aussage." },
          explain: "Super! So kommst du gut durch den Parcours.",
        },
      ],
      quiz: [
        {
          id: "fahne",
          prompt: "Wo steht beim Sprung die rote Fahne?",
          options: [
            ok("rechts", "Rechts"),
            no("links", "Links", "Links steht die weiße Fahne."),
            no("oben", "Oben auf der Stange", "Die Fahnen stehen an den Seiten."),
          ],
          explain: "Richtig! Rot rechts, weiß links – so springst du in die richtige Richtung.",
        },
        {
          id: "abgehen",
          prompt: "Was machst du vor dem Parcoursritt?",
          options: [
            ok("abgehen", "Den Parcours zu Fuß abgehen"),
            no("schlafen", "Ein Nickerchen machen", "Du musst dir den Weg einprägen."),
            no("nichts", "Gar nichts", "Ohne Abgehen verreitet man sich leicht."),
          ],
          explain: "Genau! So merkst du dir Reihenfolge und Wege.",
        },
        {
          id: "wendung",
          prompt: "Wann schaust du in einer Wendung zum nächsten Sprung?",
          options: [
            ok("frueh", "Schon früh in der Wendung"),
            no("spaet", "Erst ganz kurz vorher", "Dann findest du die Linie zu spät."),
            no("nie", "Gar nicht", "Dein Blick führt das Pferd zum Sprung."),
          ],
          explain: "Richtig! Dein Blick zeigt den Weg.",
        },
        {
          id: "45",
          levels: ["mittel"],
          prompt: "Wie viel Zeit hat man in der Regel nach dem Startsignal bis zur Startlinie?",
          options: [
            ok("45", "45 Sekunden"),
            no("5", "5 Sekunden", "Es sind in der Regel 45 Sekunden."),
            no("5min", "5 Minuten", "So lange darf man nicht warten."),
          ],
          explain: "Genau – danach läuft die Zeit trotzdem.",
        },
        {
          id: "galopp",
          levels: ["mittel"],
          prompt: "Wie kannst du schon über dem Sprung den Galopp für die nächste Wendung vorbereiten?",
          options: [
            ok("blick", "Mit Blick und leichter Gewichtsverlagerung in die neue Richtung"),
            no("reissen", "Mit einem Ruck am Zügel", "Das stört das Pferd beim Springen."),
            no("gar-nicht", "Gar nicht", "Blick und Gewicht helfen dem Pferd, passend zu landen."),
          ],
          explain: "Richtig. Sonst reitet man nach der Landung einen Galoppwechsel.",
        },
      ],
      merksatz: {
        leicht: "Abgehen, merken, rot rechts – weiß links, und in den Kurven früh zum nächsten Sprung schauen.",
        mittel: "Abgehen, Linien planen, früh wenden, im passenden Galopp ankommen – und Start- wie Ziellinie nicht vergessen.",
      },
    },

    /* ---------- 8. Regeln und Fehler ---------- */
    {
      slug: "regeln-und-fehler",
      title: "Regeln und Strafpunkte",
      speaker: "lea",
      intro: {
        leicht: "Wie viele Fehler gibt es für eine heruntergefallene Stange? Das lernst du hier.",
        mittel: "In den meisten Springprüfungen werden Fehler nach einer festen Tabelle gezählt. Wer die Regeln kennt, versteht die Ergebnisse – und reitet taktisch klüger.",
      },
      explanation: {
        leicht: [
          "Fällt eine Stange herunter, gibt es vier Fehlerpunkte. Bleibt das Pferd vor dem Sprung stehen oder läuft vorbei, gibt es auch vier Fehlerpunkte.",
          "Wer ohne Fehler und in der Zeit durchkommt, hat einen „Nullfehlerritt“. Wer stürzt oder sich verreitet, ist ausgeschieden.",
        ],
        mittel: [
          "Fehler nach der üblichen Tabelle: Abwurf = 4 Strafpunkte, Fuß im Wasser bzw. auf der Begrenzungslatte des Wassergrabens = 4 Strafpunkte, erster Ungehorsam (Verweigern oder Vorbeilaufen) = 4 Strafpunkte. In den meisten Prüfungen führt der zweite Ungehorsam im selben Umlauf zum Ausschluss. Für das Überschreiten der erlaubten Zeit gibt es Zeitfehler.",
          "Ausschluss droht außerdem bei einem Sturz von Pferd oder Reiter, bei einem Parcoursfehler (falsche Reihenfolge, ausgelassenes Hindernis) oder wenn ein Hindernis in falscher Richtung gesprungen wird. Nach einem Ungehorsam an einer Kombination wird sie komplett neu gesprungen.",
          "Es gibt verschiedene Prüfungsformen: Stilspringen (bewertet wird auch der Sitz und die Einwirkung des Reiters mit einer Note), Springen nach Fehlern und Zeit, Springen mit Stechen (bei Gleichstand ein verkürzter Parcours auf Zeit) und Punktespringen. In Einsteigerprüfungen werden oft Stil und Harmonie bewertet.",
        ],
      },
      illustration: scene("ak-hindernis-steil"),
      terms: [
        { term: "Abwurf", meaning: "Eine Stange oder ein Teil des Hindernisses fällt herunter." },
        { term: "Ungehorsam", meaning: "Verweigern oder Vorbeilaufen an einem Hindernis." },
        { term: "Stechen", meaning: "Entscheidungsrunde bei Gleichstand, meist auf Zeit." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w14-l8-fehler",
          prompt: { leicht: "Was passiert dann? Ordne zu.", mittel: "Ordne die Situationen der Bewertung zu." },
          targets: [
            { id: "vier", label: "4 Strafpunkte" },
            { id: "aus", label: "Ausschluss" },
          ],
          items: [
            card("stange", "Eine Stange fällt", { kind: "scene", scene: "ak-hindernis-steil" }, "vier", "Richtig – ein Abwurf kostet vier Punkte.", "Ein Abwurf gibt 4 Strafpunkte."),
            card("verweigern", "Das Pferd verweigert zum ersten Mal", item("ak-stopp"), "vier", "Genau, der erste Ungehorsam kostet vier Punkte.", "Der erste Ungehorsam gibt 4 Strafpunkte."),
            card("sturz", "Der Reiter stürzt", item("ak-blitz"), "aus", "Richtig – nach einem Sturz ist der Ritt vorbei.", "Ein Sturz führt zum Ausschluss."),
            card("verreiten", "Ein Sprung wird ausgelassen", tag("5 → 7"), "aus", "Genau, das ist ein Parcoursfehler.", "Ein ausgelassenes Hindernis führt zum Ausschluss."),
          ],
        },
      ],
      quiz: [
        {
          id: "stange",
          prompt: "Wie viele Strafpunkte gibt es für einen Abwurf?",
          options: [
            ok("vier", "Vier"),
            no("eins", "Einen", "Ein Abwurf kostet vier Strafpunkte."),
            no("zehn", "Zehn", "Es sind vier Strafpunkte."),
          ],
          explain: "Richtig! Vier Strafpunkte pro Abwurf.",
        },
        {
          id: "null",
          prompt: "Was ist ein Nullfehlerritt?",
          options: [
            ok("null", "Ein Ritt ohne Strafpunkte in der erlaubten Zeit"),
            no("nicht-start", "Wenn man gar nicht startet", "Dann gibt es gar kein Ergebnis."),
            no("langsam", "Ein besonders langsamer Ritt", "Zu langsam bringt Zeitfehler."),
          ],
          explain: "Genau – das Ziel jedes Springreiters!",
        },
        {
          id: "verweigern",
          prompt: "Was ist ein Ungehorsam?",
          options: [
            ok("stopp", "Das Pferd verweigert oder läuft am Sprung vorbei"),
            no("abwurf", "Eine Stange fällt herunter", "Das ist ein Abwurf."),
            no("gruss", "Der Reiter grüßt nicht", "Ungehorsam meint das Verhalten des Pferdes am Sprung."),
          ],
          explain: "Richtig. Der erste kostet vier Punkte.",
        },
        {
          id: "zweiter",
          levels: ["mittel"],
          prompt: "Was passiert in den meisten Springprüfungen beim zweiten Ungehorsam im selben Umlauf?",
          options: [
            ok("aus", "Ausschluss"),
            no("acht", "Weitere vier Punkte, sonst nichts", "In den meisten Prüfungen ist dann Schluss."),
            no("nichts", "Nichts", "Ein zweiter Ungehorsam hat Folgen."),
          ],
          explain: "Genau. Die genauen Regeln stehen in der jeweiligen Ausschreibung.",
        },
        {
          id: "stil",
          levels: ["mittel"],
          prompt: "Was wird beim Stilspringen zusätzlich bewertet?",
          options: [
            ok("reiter", "Sitz und Einwirkung des Reiters"),
            no("pferdefarbe", "Die Farbe des Pferdes", "Bewertet wird das Reiten, nicht die Farbe."),
            no("nur-zeit", "Nur die Zeit", "Beim Stilspringen zählt vor allem der Stil."),
          ],
          explain: "Richtig. Deshalb ist Stilspringen ideal für den Einstieg.",
        },
      ],
      merksatz: {
        leicht: "Stange runter: 4. Verweigern: 4. Sturz oder verreiten: raus.",
        mittel: "Abwurf, Wasserfehler, 1. Ungehorsam = je 4 Strafpunkte; 2. Ungehorsam, Sturz oder Parcoursfehler meist Ausschluss; dazu Zeitfehler.",
      },
    },

    /* ---------- 9. Sicherheit beim Springen ---------- */
    {
      slug: "sicherheit-beim-springen",
      title: "Sicherheit und Pferdewohl beim Springen",
      speaker: "mila",
      intro: {
        leicht: "Springen macht Spaß – aber nur, wenn alle sicher sind und das Pferd gesund bleibt.",
        mittel: "Springen belastet Pferd und Reiter. Gute Vorbereitung, die richtige Ausrüstung und Rücksicht auf das Pferd sind deshalb Pflicht.",
      },
      explanation: {
        leicht: [
          "Zum Springen trägst du einen Helm und eine Sicherheitsweste. Springe nie allein – ein Erwachsener ist immer dabei.",
          "Dein Pferd muss sich erst aufwärmen. Fang mit kleinen Sprüngen an und hör auf, wenn es noch Spaß macht.",
        ],
        mittel: [
          "Ausrüstung: Reithelm nach aktueller Norm, Sicherheitsweste (beim Springen und im Gelände sehr empfehlenswert), feste Reitstiefel, Handschuhe. Für das Pferd passen Sattel und Zaumzeug, Gamaschen schützen die Beine.",
          "Organisation: Nie allein springen – eine zweite Person baut um und hilft im Notfall. Hindernisse mit Sicherheitsauflagen verwenden, Boden prüfen, unbenutzte Stangen wegräumen. Erst nach ausreichendem Aufwärmen (Schritt, Trab, Galopp, Stangen) wird gesprungen. Die Höhe wird langsam gesteigert, nach einem gelungenen Sprung wird gelobt.",
          "Pferdewohl: Springen nur mit gesundem, ausreichend trainiertem Pferd und nicht zu oft oder zu lange. Bei Verweigerungen erst nach der Ursache suchen (Angst, Schmerz, falsches Anreiten, zu hoch), statt zu strafen. Nach dem Springen gründlich trockenreiten, Beine kontrollieren und kühlen, wenn nötig.",
        ],
      },
      illustration: scene("ak-hindernis-kreuz"),
      terms: [
        { term: "Sicherheitsweste", meaning: "Weste, die den Oberkörper bei einem Sturz schützt." },
        { term: "Sicherheitsauflage", meaning: "Halterung, aus der eine Stange bei Druck leicht herausfällt." },
        { term: "Gamaschen", meaning: "Schutz für die Pferdebeine." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w14-l9-sicher",
          prompt: { leicht: "Was macht das Springen sicher? Tippe alles Richtige an.", mittel: "Welche Maßnahmen gehören zu sicherem Springen?" },
          options: [
            { id: "helm", label: "Helm und Sicherheitsweste", visual: { kind: "scene", scene: "ak-helm-richtig" }, correct: true },
            { id: "zwei", label: "Nie allein springen", visual: item("ak-herz"), correct: true },
            { id: "aufwaermen", label: "Pferd vorher gut aufwärmen", visual: item("ak-pause"), correct: true },
            { id: "klein", label: "Klein anfangen", visual: { kind: "scene", scene: "ak-hindernis-kreuz" }, correct: true },
            { id: "strafen", label: "Bei Verweigerung bestrafen", visual: item("ak-stopp"), feedback: "Erst die Ursache suchen – Strafe macht Angst größer." },
            { id: "lang", label: "Stundenlang ohne Pause springen", visual: item("ak-schaukel"), feedback: "Zu viel Springen belastet die Pferdebeine." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Wichtiges.", mittel: "Es fehlt noch mindestens eine wichtige Maßnahme." },
          explain: "Super! Ausrüstung, zweite Person, Aufwärmen und kleine Schritte machen das Springen sicher.",
        },
      ],
      quiz: [
        {
          id: "allein",
          prompt: "Darfst du allein springen üben?",
          options: [
            ok("nein", "Nein, immer mit einer zweiten Person"),
            no("ja", "Ja, klar", "Allein kann im Notfall niemand helfen."),
            no("wenn-klein", "Ja, wenn die Sprünge klein sind", "Auch bei kleinen Sprüngen ist jemand dabei."),
          ],
          explain: "Richtig! Jemand baut um und hilft im Notfall.",
        },
        {
          id: "weste",
          prompt: "Was trägst du zusätzlich zum Helm beim Springen?",
          options: [
            ok("weste", "Eine Sicherheitsweste"),
            no("muetze", "Eine Wollmütze", "Eine Mütze schützt nicht – Helm und Weste schon."),
            no("schal", "Einen langen Schal", "Ein langer Schal kann hängen bleiben."),
          ],
          explain: "Genau – sie schützt deinen Oberkörper.",
        },
        {
          id: "verweigert",
          prompt: "Dein Pferd verweigert. Was tust du zuerst?",
          options: [
            ok("ursache", "Die Ursache suchen"),
            no("strafen", "Das Pferd bestrafen", "Strafe macht Angst oder Schmerz nur schlimmer."),
            no("hoeher", "Den Sprung höher machen", "Dann wird es noch schwieriger."),
          ],
          explain: "Richtig! Vielleicht hat es Angst, Schmerzen – oder wir sind falsch angeritten.",
        },
        {
          id: "auflage",
          levels: ["mittel"],
          prompt: "Wozu dienen Sicherheitsauflagen?",
          options: [
            ok("fallen", "Die Stange fällt bei Druck leicht heraus"),
            no("halten", "Sie halten die Stange besonders fest", "Genau das Gegenteil – sie geben nach."),
            no("deko", "Sie sind nur Dekoration", "Sie schützen Pferd und Reiter."),
          ],
          explain: "Genau – besonders wichtig an der hinteren Stange von Oxern.",
        },
        {
          id: "pferdewohl",
          levels: ["mittel"],
          prompt: "Was gehört zum Pferdewohl beim Springen?",
          options: [
            ok("dosiert", "Dosiert springen, gut aufwärmen und danach trockenreiten"),
            no("taeglich", "Jeden Tag möglichst hoch springen", "Das überlastet Sehnen und Gelenke."),
            no("kalt", "Ohne Aufwärmen sofort springen", "Kalte Muskeln verletzen sich leichter."),
          ],
          explain: "Richtig. Ein gesundes Pferd springt lange gern.",
        },
      ],
      merksatz: {
        leicht: "Helm, Weste, nie allein, aufwärmen und klein anfangen.",
        mittel: "Sicher springen: Schutzausrüstung, zweite Person, Sicherheitsauflagen, Aufwärmen, dosiert steigern – und Ursachen suchen statt strafen.",
      },
      practiceNote: "Springen nur unter Anleitung einer qualifizierten Reitlehrkraft, mit Helm und Sicherheitsweste.",
    },
  ]),
};
