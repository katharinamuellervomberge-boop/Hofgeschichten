import { card, item, no, ok, spot } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 2 – Der richtige Reitersitz */
export const welt2: AcademyWorld = {
  id: "w2",
  number: 2,
  slug: "der-richtige-reitersitz",
  title: "Der richtige Reitersitz",
  teaser: "Ausbalanciert sitzen – von Kopf bis Absatz.",
  learns: "Grundsitz (Linie Ohr–Schulter–Hüfte–Absatz), Bein- und Fußhaltung, Fäuste und Zügelhaltung, Blickrichtung und angemessene Körperspannung.",
  tint: "#E8DCC4",
  cover: scene("ak-reiter-sitz-linie"),
  badge: { id: "ra-abzeichen-w2", title: "Sitz-Profi", motif: "seat" },
  lessons: lessonsOf(2, [
    /* ---------- 1. Der ausbalancierte Sitz ---------- */
    {
      slug: "ausbalancierter-sitz",
      title: "Der ausbalancierte Sitz",
      speaker: "mila",
      intro: {
        leicht: "Wie sitzt man eigentlich richtig auf einem Pferd? Komm, wir schauen es uns an!",
        mittel: "Ein guter Sitz ist die Grundlage für alles beim Reiten. Heute lernst du den ausbalancierten Sitz kennen.",
      },
      explanation: {
        leicht: [
          "Im Sattel sitzt du aufrecht und locker – wie ein Turm, der nicht umkippt. Du sitzt in der Mitte des Sattels.",
          "Schau auf die goldene Linie: Ohr, Schulter, Hüfte und Absatz liegen fast genau übereinander.",
        ],
        mittel: [
          "Beim ausbalancierten Sitz sitzt du an der tiefsten Stelle des Sattels, gleichmäßig auf beiden Gesäßknochen. Der Oberkörper ist aufgerichtet, aber nicht steif. So kannst du der Bewegung des Pferdes folgen, ohne dich festhalten zu müssen.",
          "Eine gedachte senkrechte Linie verläuft von Ohr über Schulter und Hüfte bis zum Absatz. Sie ist eine Orientierung, kein starres Gesetz: Je nach Pferd, Sattel und Aufgabe verändert sich der Sitz etwas – zum Beispiel im leichten Sitz. Deine Reitlehrerin hilft dir, deinen Sitz zu finden.",
        ],
      },
      illustration: scene("ak-reiter-sitz-linie"),
      terms: [
        { term: "Gesäßknochen", meaning: "Die zwei Knochen, auf denen du im Sattel sitzt (Sitzbeinhöcker)." },
        { term: "Ausbalanciert", meaning: "Im Gleichgewicht, ohne dich festzuhalten." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w2-l1-wer-sitzt",
          prompt: "Wer sitzt ausbalanciert?",
          layout: "pictures",
          options: [
            { id: "vor", label: "Bild 1", visual: scene("ak-reiter-vor-nah"), feedback: "Hier kippt der Oberkörper nach vorne." },
            { id: "sitz", label: "Bild 2", visual: scene("ak-reiter-sitz-nah"), correct: true },
            { id: "zurueck", label: "Bild 3", visual: scene("ak-reiter-zurueck-nah"), feedback: "Hier lehnt sich die Reiterin nach hinten." },
            { id: "stuhl", label: "Bild 4", visual: scene("ak-reiter-stuhl-nah"), feedback: "Hier sind die Beine zu weit vorne – wie auf einem Stuhl." },
          ],
          explain: "Genau! Ohr, Schulter, Hüfte und Absatz liegen übereinander.",
        },
      ],
      quiz: [
        {
          id: "wo-sitzen",
          prompt: "Wo sitzt du im Sattel?",
          options: [
            ok("mitte", "In der Mitte, an der tiefsten Stelle"),
            no("hinten", "Ganz hinten am Rand", "Hinten am Rand rutschst du aus dem Gleichgewicht."),
            no("vorne", "Ganz vorne am Hals", "Ganz vorne störst du das Pferd und verlierst die Balance."),
          ],
          explain: "Richtig! In der Mitte bist du im Gleichgewicht.",
        },
        {
          id: "linie",
          prompt: "Welche Linie hilft dir beim Sitzen?",
          options: [
            ok("ohr", "Ohr – Schulter – Hüfte – Absatz"),
            no("nase", "Nase – Knie – Zehen", "Diese Punkte liegen nicht übereinander. Merk dir: Ohr, Schulter, Hüfte, Absatz."),
            no("hand", "Hand – Ohr – Schweif", "Der Schweif gehört zum Pferd. Die Linie geht von deinem Ohr bis zum Absatz."),
          ],
          explain: "Genau! Diese Punkte liegen fast übereinander.",
        },
        {
          id: "oberkoerper",
          prompt: "Wie ist dein Oberkörper?",
          options: [
            ok("aufrecht", "Aufrecht und locker"),
            no("steif", "Ganz steif wie ein Brett", "Steif kannst du nicht mitschwingen. Aufrecht, aber locker!"),
            no("gebeugt", "Weit nach vorne gebeugt", "Dann kippst du nach vorne und verlierst die Balance."),
          ],
          explain: "Richtig! Aufrecht und trotzdem beweglich.",
        },
        {
          id: "gesaess",
          levels: ["mittel"],
          prompt: "Worauf verteilst du dein Gewicht im Sattel?",
          options: [
            ok("beide", "Gleichmäßig auf beide Gesäßknochen"),
            no("einer", "Nur auf eine Seite", "Dann sitzt du schief, und das Pferd muss das ausgleichen."),
            no("knie", "Auf die Knie", "Die Knie liegen am Sattel. Sitzen tust du auf den Gesäßknochen."),
          ],
          explain: "Richtig. Gleichmäßig verteiltes Gewicht hilft dem Pferd, gerade zu laufen.",
        },
        {
          id: "regel",
          levels: ["mittel"],
          prompt: "Ist die senkrechte Linie in jeder Situation genau gleich?",
          options: [
            ok("orientierung", "Nein, sie ist eine Orientierung für den Grundsitz"),
            no("immer", "Ja, immer ganz genau", "Die Linie hilft beim Grundsitz. Im leichten Sitz zum Beispiel sitzt man anders."),
            no("galopp", "Sie gilt nur im Galopp", "Die Linie gehört zum Grundsitz in allen Gangarten – als Orientierung."),
          ],
          explain: "Richtig. Je nach Aufgabe und Pferd passt man den Sitz etwas an.",
        },
      ],
      merksatz: {
        leicht: "Aufrecht, locker und in der Mitte – Ohr, Schulter, Hüfte, Absatz übereinander.",
        mittel: "Ausbalanciert sitzen: mittig, aufgerichtet, locker – die Linie Ohr–Schulter–Hüfte–Absatz ist meine Orientierung.",
      },
    },

    /* ---------- 2. Beine und Absätze ---------- */
    {
      slug: "beine-und-absaetze",
      title: "Beine und Absätze",
      speaker: "ben",
      intro: {
        leicht: "Meine Beine waren am Anfang ganz zappelig. Heute weiß ich, wo sie hingehören!",
        mittel: "Ruhige Beine sind wichtig, damit du sicher sitzt und feine Zeichen geben kannst.",
      },
      explanation: {
        leicht: [
          "Deine Beine liegen ruhig am Pferd. Die Fußspitze zeigt nach vorne.",
          "Der Absatz ist der tiefste Punkt am Fuß. Im Steigbügel steht nur der vordere Teil deines Fußes.",
        ],
        mittel: [
          "Das Bein hängt lang und entspannt aus der Hüfte. Das Knie liegt am Sattel an, ohne zu klemmen. Der Unterschenkel liegt ruhig am Pferd, ungefähr am Gurt – so kann er später feine Hilfen geben.",
          "Im Steigbügel liegt der Fußballen, also der breite vordere Teil des Fußes. Die Fußspitze zeigt nach vorne, der Absatz federt leicht nach unten und ist der tiefste Punkt. Zieht man den Absatz hoch, verkrampft oft das ganze Bein. Mit Kraft nach unten drücken ist aber auch nicht gemeint – das Fußgelenk soll weich federn.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Fußballen", meaning: "Der breite vordere Teil der Fußsohle." },
        { term: "Unterschenkel", meaning: "Das Bein zwischen Knie und Fuß." },
        { term: "Federn", meaning: "Weich nachgeben und wieder zurückkommen, wie eine Feder." },
      ],
      exercise: [
        {
          type: "hotspots",
          id: "ra-w2-l2-suchbild",
          scene: scene("ak-reiter-sitz"),
          prompt: "Finde die Körperteile.",
          mode: "sequence",
          targets: [
            spot("absatz", "der Absatz", "absatz", "Der Absatz ist der tiefste Punkt am Fuß.", { r: 30 }),
            spot("knie", "das Knie", "knie", "Das Knie liegt ruhig am Sattel.", { r: 30 }),
            spot("huefte", "die Hüfte", "huefte", "Aus der Hüfte hängt das Bein lang nach unten.", { r: 30 }),
            spot("schulter", "die Schulter", "schulter", "Die Schulter liegt über der Hüfte.", { r: 28, levels: ["mittel"] }),
          ],
          missHint: "Schau dir die Reiterin genau an.",
        },
      ],
      quiz: [
        {
          id: "tiefster",
          prompt: "Was ist der tiefste Punkt an deinem Fuß?",
          options: [
            ok("absatz", "Der Absatz"),
            no("zehen", "Die Zehen", "Zeigen die Zehen nach unten, rutscht der Fuß leicht aus dem Bügel."),
            no("knie", "Das Knie", "Das Knie liegt am Sattel. Der tiefste Punkt am Fuß ist der Absatz."),
          ],
          explain: "Richtig! Der Absatz federt nach unten.",
        },
        {
          id: "buegel",
          prompt: "Welcher Teil des Fußes liegt im Steigbügel?",
          options: [
            ok("ballen", "Der vordere Teil (der Fußballen)"),
            no("ferse", "Die Ferse", "Steckt der Fuß so tief im Bügel, kann er hängen bleiben. Das ist gefährlich."),
            no("spitze", "Nur die Zehenspitze", "Mit der Zehenspitze rutschst du schnell aus dem Bügel."),
          ],
          explain: "Genau! So hat dein Fuß Halt und kann trotzdem schnell heraus.",
        },
        {
          id: "bild",
          prompt: "Bei welcher Reiterin ist der Absatz richtig?",
          layout: "pictures",
          options: [
            no("absatz", "Bild 1", "Hier ist der Absatz hochgezogen.", { visual: scene("ak-reiter-absatz-nah") }),
            ok("sitz", "Bild 2", { visual: scene("ak-reiter-sitz-nah") }),
            no("stuhl", "Bild 3", "Hier sind die Beine zu weit vorne.", { visual: scene("ak-reiter-stuhl-nah") }),
          ],
          explain: "Richtig! Bein ruhig, Absatz tief.",
        },
        {
          id: "knie",
          levels: ["mittel"],
          prompt: "Wie liegt das Knie am Sattel?",
          options: [
            ok("an", "Es liegt an, ohne zu klemmen"),
            no("klemmt", "Es klemmt ganz fest", "Klemmen macht das Bein steif und schiebt dich aus dem Sattel."),
            no("weg", "Es steht weit vom Sattel ab", "Dann hat dein Bein keinen ruhigen Kontakt zum Pferd."),
          ],
          explain: "Richtig. Anliegen ja, klemmen nein.",
        },
        {
          id: "hochgezogen",
          levels: ["mittel"],
          prompt: "Was passiert oft, wenn man den Absatz hochzieht?",
          options: [
            ok("verkrampft", "Das Bein verkrampft und man verliert Halt"),
            no("sicherer", "Man sitzt sicherer", "Eher im Gegenteil: Das Bein wird unruhig und der Sitz unsicher."),
            no("schneller", "Das Pferd wird schneller", "Ein hochgezogener Absatz ist kein klares Zeichen – er macht vor allem das Bein unruhig."),
          ],
          explain: "Genau. Ein weich federnder Absatz hält das Bein ruhig.",
        },
      ],
      merksatz: {
        leicht: "Fußspitze nach vorn, Absatz nach unten, Beine ruhig am Pferd.",
        mittel: "Lang aus der Hüfte, Knie anliegend, Fußballen im Bügel – der Absatz federt als tiefster Punkt.",
      },
    },

    /* ---------- 3. Hände und Zügelhaltung ---------- */
    {
      slug: "haende-und-zuegel",
      title: "Hände und Zügelhaltung",
      speaker: "lea",
      intro: {
        leicht: "Am anderen Ende vom Zügel ist das Pferdemaul. Darum sind meine Hände ganz vorsichtig.",
        mittel: "Deine Hände sind über den Zügel mit dem empfindlichen Pferdemaul verbunden. Deshalb ist ihre Haltung so wichtig.",
      },
      explanation: {
        leicht: [
          "Deine Hände bilden zwei aufrechte Fäuste. Die Daumen liegen oben auf dem Zügel – wie ein kleines Dach.",
          "Die Hände sind ruhig und weich. Sie ziehen nicht, denn am anderen Ende des Zügels ist das Pferdemaul.",
        ],
        mittel: [
          "Die Fäuste stehen aufrecht, etwa eine Handbreit über und vor dem Widerrist und etwa eine Handbreit auseinander. Der Zügel läuft zwischen Ringfinger und kleinem Finger in die Hand und oben zwischen Daumen und Zeigefinger wieder hinaus. Der Daumen liegt dachförmig auf dem Zügel und hält ihn fest.",
          "Von der Seite gesehen bilden Ellbogen, Hand und Pferdemaul eine gerade Linie. Die Ellbogen liegen locker am Körper, Schultern und Handgelenke bleiben weich. So kann die Hand den Bewegungen des Pferdekopfes folgen, statt am Maul zu ziehen. Wie lang du die Zügel fasst, zeigt dir deine Reitlehrerin.",
        ],
      },
      illustration: scene("ak-haende-richtig"),
      terms: [
        { term: "Widerrist", meaning: "Die höchste Stelle am Pferderücken, vor dem Sattel." },
        { term: "Dachförmiger Daumen", meaning: "Der Daumen liegt angewinkelt wie ein Dach oben auf dem Zügel." },
        { term: "Verbindung", meaning: "Der weiche, gleichmäßige Kontakt zwischen Hand und Pferdemaul." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w2-l3-haende",
          prompt: "Welche Hände halten die Zügel richtig?",
          layout: "pictures",
          options: [
            { id: "verdeckt", label: "Bild 1", visual: scene("ak-haende-verdeckt"), feedback: "Hier zeigt der Handrücken nach oben. Die Fäuste sollen aufrecht stehen." },
            { id: "richtig", label: "Bild 2", visual: scene("ak-haende-richtig"), correct: true },
            { id: "breit", label: "Bild 3", visual: scene("ak-haende-breit"), feedback: "Hier sind die Hände viel zu weit auseinander." },
          ],
          explain: "Genau! Aufrechte Fäuste, Daumen oben, etwa eine Handbreit auseinander.",
        },
        {
          type: "choice",
          id: "ra-w2-l3-linie",
          levels: ["mittel"],
          prompt: "Welche Linie ist hier eingezeichnet?",
          visual: scene("ak-reiter-sitz-hand"),
          options: [
            { id: "hand", label: "Ellbogen – Hand – Pferdemaul", correct: true },
            { id: "senkrecht", label: "Ohr – Schulter – Hüfte – Absatz", feedback: "Diese Linie wäre senkrecht. Die gezeichnete Linie führt zum Pferdemaul." },
            { id: "bein", label: "Knie – Absatz – Huf", feedback: "Die Linie beginnt am Ellbogen und führt zum Pferdemaul." },
          ],
          layout: "list",
          explain: "Richtig. Ist diese Linie gerade, kann die Hand weich mit dem Maul in Verbindung bleiben.",
        },
      ],
      quiz: [
        {
          id: "faeuste",
          prompt: "Wie stehen deine Fäuste?",
          options: [
            ok("aufrecht", "Aufrecht, Daumen oben"),
            no("flach", "Flach, Handrücken oben", "So werden Hände und Arme steif. Aufrecht ist besser."),
            no("offen", "Ganz offen", "Mit offenen Händen rutscht der Zügel weg."),
          ],
          explain: "Richtig! Aufrecht und mit dem Daumen wie ein Dach.",
        },
        {
          id: "weich",
          prompt: "Wie sind deine Hände beim Reiten?",
          options: [
            ok("ruhig", "Ruhig und weich"),
            no("ziehen", "Sie ziehen fest", "Ziehen tut dem Pferdemaul weh."),
            no("wackeln", "Sie wackeln wild hin und her", "Wackelnde Hände stören das Pferd im Maul."),
          ],
          explain: "Genau! Ruhige, weiche Hände sind freundlich zum Pferd.",
        },
        {
          id: "ende",
          prompt: "Was ist am anderen Ende des Zügels?",
          options: [
            ok("maul", "Das Pferdemaul"),
            no("sattel", "Der Sattel", "Der Sattel liegt auf dem Rücken. Der Zügel führt zum Gebiss im Maul."),
            no("schweif", "Der Schweif", "Der Schweif ist ganz hinten. Der Zügel geht nach vorne zum Maul."),
          ],
          explain: "Richtig! Darum gehen wir mit dem Zügel so vorsichtig um.",
        },
        {
          id: "finger",
          levels: ["mittel"],
          prompt: "Zwischen welchen Fingern läuft der Zügel in die Hand hinein?",
          options: [
            ok("ring", "Zwischen Ringfinger und kleinem Finger"),
            no("daumen", "Zwischen Daumen und Zeigefinger", "Dort kommt der Zügel oben wieder heraus."),
            no("ueber", "Er liegt über allen Fingern", "So hättest du keinen sicheren Halt. Er läuft zwischen Ringfinger und kleinem Finger."),
          ],
          explain: "Richtig. Oben hält ihn der Daumen fest.",
        },
        {
          id: "linie",
          levels: ["mittel"],
          prompt: "Wie verlaufen Ellbogen, Hand und Pferdemaul, von der Seite gesehen?",
          options: [
            ok("gerade", "In einer geraden Linie"),
            no("knick", "Mit einem Knick nach unten", "Ein Knick macht die Verbindung hart und unruhig."),
            no("kreis", "Im Kreis", "Gemeint ist eine gerade Linie vom Ellbogen bis zum Maul."),
          ],
          explain: "Genau. So kann die Hand gefühlvoll einwirken.",
        },
      ],
      merksatz: {
        leicht: "Aufrechte Fäuste, Daumen wie ein Dach, ruhige weiche Hände.",
        mittel: "Aufrechte Fäuste, dachförmige Daumen, Ellbogen–Hand–Pferdemaul in einer Linie: Die Hand folgt, sie zieht nicht.",
      },
    },

    /* ---------- 4. Blickrichtung und Körperspannung ---------- */
    {
      slug: "blick-und-koerperspannung",
      title: "Blickrichtung und Körperspannung",
      speaker: "mila",
      intro: {
        leicht: "Wohin schaust du beim Reiten? Das ist wichtiger, als du denkst!",
        mittel: "Dein Blick und deine Haltung beeinflussen dein Gleichgewicht – und damit auch das Pferd.",
      },
      explanation: {
        leicht: [
          "Beim Reiten schaust du nach vorne – dorthin, wohin du willst. Nicht nach unten aufs Pferd!",
          "Dein Körper ist aufrecht, aber nicht steif. Wie ein Grashalm im Wind: gerade und beweglich.",
        ],
        mittel: [
          "Der Blick geht in Bewegungsrichtung, etwa zwischen den Pferdeohren hindurch oder dorthin, wohin du reiten möchtest. Schaust du nach unten, kippt oft der Oberkörper nach vorne und das Gewicht verschiebt sich. Vor einer Wendung schaust du schon in die neue Richtung.",
          "Körperspannung heißt: Du hältst dich aufrecht und stabil, ohne zu verkrampfen. Bauch und Rücken tragen dich, Schultern, Arme und Beine bleiben locker. Zu viel Spannung macht steif, zu wenig lässt dich zusammensacken. Ruhiges Atmen hilft dir, die richtige Mitte zu finden.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Bewegungsrichtung", meaning: "Die Richtung, in die du gerade reitest oder reiten willst." },
        { term: "Körperspannung", meaning: "Aufrecht und stabil, aber nicht verkrampft." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w2-l4-balance",
          prompt: { leicht: "Was hilft dir, im Gleichgewicht zu bleiben? Tippe alles Richtige an.", mittel: "Was hilft dir bei Balance und Körperspannung? Wähle alle richtigen Antworten." },
          options: [
            { id: "vorne", label: "Nach vorne schauen", visual: item("ak-auge"), correct: true },
            { id: "atmen", label: "Ruhig atmen", visual: item("ak-schaukel"), correct: true },
            { id: "aufrecht", label: "Aufrecht und locker sitzen", visual: item("ak-gewicht"), correct: true },
            { id: "unten", label: "Auf die Hufe schauen", visual: item("huf"), feedback: "Schaust du nach unten, kippt dein Oberkörper nach vorn." },
            { id: "luft", label: "Die Luft anhalten", visual: item("ak-stopp"), feedback: "Wer die Luft anhält, wird steif." },
            { id: "schultern", label: "Schultern hochziehen", visual: item("ak-blitz"), feedback: "Hochgezogene Schultern machen Arme und Hände steif.", levels: ["mittel"] },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Blick nach vorn, ruhig atmen, aufrecht und locker.",
        },
      ],
      quiz: [
        {
          id: "blick",
          prompt: "Wohin schaust du beim Reiten?",
          options: [
            ok("vorne", "Nach vorne, dorthin, wohin ich will"),
            no("hals", "Auf den Pferdehals", "Dann kippst du nach vorne. Schau lieber geradeaus."),
            no("fuesse", "Auf meine Füße", "Wer nach unten schaut, verliert leicht das Gleichgewicht."),
          ],
          explain: "Richtig! Dein Blick zeigt den Weg.",
        },
        {
          id: "vorbild",
          prompt: "Bei wem ist der Oberkörper zu weit vorne?",
          layout: "pictures",
          options: [
            no("sitz", "Bild 1", "Diese Reiterin sitzt ausbalanciert.", { visual: scene("ak-reiter-sitz-nah") }),
            ok("vor", "Bild 2", { visual: scene("ak-reiter-vor-nah") }),
            no("zurueck", "Bild 3", "Diese Reiterin lehnt sich nach hinten.", { visual: scene("ak-reiter-zurueck-nah") }),
          ],
          explain: "Richtig. Oft kippt der Oberkörper nach vorne, wenn der Blick nach unten geht.",
        },
        {
          id: "spannung",
          prompt: "Wie fühlt sich gute Körperspannung an?",
          options: [
            ok("locker", "Aufrecht, aber locker"),
            no("steif", "Ganz steif", "Steif kannst du die Bewegung nicht mitmachen."),
            no("schlapp", "Ganz schlapp", "Zu schlapp sackst du zusammen und verlierst die Balance."),
          ],
          explain: "Genau! Wie ein Grashalm: gerade und beweglich.",
        },
        {
          id: "wendung",
          levels: ["mittel"],
          prompt: "Wann schaust du in eine neue Richtung?",
          options: [
            ok("vorher", "Schon vor der Wendung"),
            no("nachher", "Erst nach der Wendung", "Dann ist es zu spät – das Pferd spürt deinen Blick schon vorher."),
            no("nie", "Gar nicht, ich schaue immer geradeaus", "In Wendungen hilft dein Blick in die neue Richtung."),
          ],
          explain: "Richtig. Dein Blick dreht den Oberkörper ein wenig mit – das spürt das Pferd.",
        },
        {
          id: "unten",
          levels: ["mittel"],
          prompt: "Was passiert oft, wenn du nach unten schaust?",
          options: [
            ok("kippt", "Der Oberkörper kippt nach vorne"),
            no("stehen", "Das Pferd bleibt sofort stehen", "Nicht unbedingt – aber dein Gleichgewicht verschiebt sich."),
            no("nichts", "Gar nichts", "Der Kopf ist schwer. Wohin er schaut, verändert deine Haltung."),
          ],
          explain: "Genau. Darum: Kopf hoch, Blick nach vorn.",
        },
      ],
      merksatz: {
        leicht: "Kopf hoch, Blick nach vorn, Körper gerade und locker.",
        mittel: "Der Blick führt, der Rumpf trägt, Schultern und Beine bleiben locker – und ich atme ruhig.",
      },
    },

    /* ---------- 5. Sitz-Quiz ---------- */
    {
      slug: "sitz-quiz",
      title: "Sitz-Quiz",
      speaker: "ben",
      intro: {
        leicht: "Jetzt bist du dran: Zeig, was du über den Sitz weißt!",
        mittel: "Zeit für das Sitz-Quiz: Kopf, Hände, Beine – alles kommt noch einmal vor.",
      },
      explanation: {
        leicht: ["Das weißt du schon: aufrecht und locker sitzen, nach vorne schauen, Absatz tief, Fäuste aufrecht."],
        mittel: [
          "Kurze Wiederholung: Im ausbalancierten Sitz liegen Ohr, Schulter, Hüfte und Absatz etwa übereinander. Die Fäuste stehen aufrecht, Ellbogen, Hand und Pferdemaul bilden eine Linie. Der Blick geht nach vorn, und die Körperspannung ist stabil, aber nicht steif.",
        ],
      },
      illustration: scene("ak-reiter-sitz-linie"),
      exercise: [
        {
          type: "match",
          id: "ra-w2-l5-zuordnen",
          prompt: { leicht: "Was gehört wohin? Lege jede Karte zum richtigen Körperteil.", mittel: "Ordne jedem Körperteil die richtige Haltung zu." },
          targets: [
            { id: "absatz", label: "Absatz" },
            { id: "blick", label: "Blick" },
            { id: "faeuste", label: "Fäuste" },
            { id: "oberkoerper", label: "Oberkörper" },
            { id: "knie", label: "Knie", levels: ["mittel"] },
          ],
          items: [
            card("tief", "tief und federnd", item("ak-stiefel"), "absatz", "Richtig! Der Absatz ist der tiefste Punkt.", "„Tief und federnd“ beschreibt den Absatz."),
            card("vorne", "nach vorne", item("ak-auge"), "blick", "Genau, der Blick geht nach vorne.", "„Nach vorne“ passt zum Blick."),
            card("aufrecht-f", "aufrecht, Daumen oben", item("ak-zuegel"), "faeuste", "Richtig! Aufrechte Fäuste.", "„Daumen oben“ gehört zu den Fäusten."),
            card("aufrecht-o", "aufrecht und locker", item("ak-gewicht"), "oberkoerper", "Super, so sitzt der Oberkörper.", "„Aufrecht und locker“ beschreibt den Oberkörper."),
            card("anliegen", "liegt an, ohne zu klemmen", item("ak-schenkel"), "knie", "Richtig. Das Knie klemmt nicht.", "„Liegt an, ohne zu klemmen“ passt zum Knie.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "ausbalanciert",
          prompt: "Wer sitzt ausbalanciert?",
          layout: "pictures",
          options: [
            no("stuhl", "Bild 1", "Hier sind die Beine zu weit vorne.", { visual: scene("ak-reiter-stuhl-nah") }),
            no("zurueck", "Bild 2", "Hier lehnt sich die Reiterin nach hinten.", { visual: scene("ak-reiter-zurueck-nah") }),
            ok("sitz", "Bild 3", { visual: scene("ak-reiter-sitz-nah") }),
          ],
          explain: "Richtig! Bei ihr liegen Ohr, Schulter, Hüfte und Absatz übereinander.",
        },
        {
          id: "absatz",
          prompt: "Wo ist dein Absatz?",
          options: [
            ok("tief", "Er ist der tiefste Punkt am Fuß"),
            no("hoch", "Er ist hochgezogen", "Ein hochgezogener Absatz macht das Bein unruhig."),
            no("hinten", "Er steckt tief im Steigbügel", "Im Bügel liegt nur der vordere Teil des Fußes."),
          ],
          explain: "Genau! Der Absatz federt tief – so liegt das Bein ruhig am Pferd.",
        },
        {
          id: "zuegel",
          prompt: "Wie hältst du die Zügel?",
          options: [
            ok("aufrecht", "Mit aufrechten, ruhigen Fäusten"),
            no("flach", "Mit flachen Händen, Handrücken oben", "Die Fäuste sollen aufrecht stehen."),
            no("eine", "Beide Zügel in einer Hand, ganz locker", "Am Anfang hältst du in jeder Hand einen Zügel – mit aufrechten Fäusten."),
          ],
          explain: "Richtig! Aufrecht, ruhig und weich.",
        },
        {
          id: "blick",
          prompt: "Wohin geht dein Blick?",
          options: [
            ok("vorne", "Nach vorne"),
            no("hufe", "Zu den Hufen", "Wer nach unten schaut, kippt nach vorne."),
            no("himmel", "In den Himmel", "Zu weit nach oben schauen bringt dich auch aus dem Gleichgewicht."),
          ],
          explain: "Genau! Dorthin, wohin du reiten möchtest.",
        },
        {
          id: "linie",
          levels: ["mittel"],
          prompt: "Welche gedachte Linie gehört zum Grundsitz?",
          options: [
            ok("senkrecht", "Ohr – Schulter – Hüfte – Absatz"),
            no("knie", "Knie – Zehe – Huf", "Die Linie geht von oben nach unten durch den ganzen Körper: Ohr, Schulter, Hüfte, Absatz."),
            no("ellbogen", "Ellbogen – Knie – Ohr", "Die Linie zum Pferdemaul beginnt am Ellbogen. Senkrecht ist: Ohr, Schulter, Hüfte, Absatz."),
          ],
          explain: "Richtig. Sie ist eine Orientierung für den Grundsitz.",
        },
        {
          id: "stuhl",
          levels: ["mittel"],
          prompt: "Was ist ein Stuhlsitz?",
          options: [
            ok("beine", "Die Beine sind zu weit vorne, man sitzt wie auf einem Stuhl"),
            no("hoch", "Man sitzt besonders hoch und gerade", "Gerade und hoch wäre schön – beim Stuhlsitz sind die Beine zu weit vorn."),
            no("stuhl", "Man reitet mit einem Stuhl auf dem Rücken", "Das ist nur ein Bild: Beim Stuhlsitz sitzt man so, als säße man auf einem Stuhl."),
          ],
          explain: "Genau. Dann liegt der Absatz vor der Hüfte, und die Balance fehlt.",
        },
      ],
      merksatz: {
        leicht: "Gerade sitzen, nach vorn schauen, Absatz tief, Hände ruhig.",
        mittel: "Ein guter Sitz ist ausbalanciert und locker – erst dann können die Hilfen fein wirken.",
      },
    },
  ]),
};
