import "server-only";
import { card, huf, item, no, ok } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 4 – Schritt reiten */
export const welt4: AcademyWorld = {
  id: "w4",
  number: 4,
  slug: "schritt-reiten",
  title: "Schritt reiten",
  teaser: "Die ruhigste Gangart im Viertakt.",
  learns: "Merkmale des Schritts (keine Schwebephase), Viertakt und Fußfolge, Mitschwingen in der Bewegung, Grundlagen von Anreiten, Lenken und Anhalten.",
  tint: "#DDE3D6",
  cover: scene("ak-gang-schritt"),
  badge: { id: "ra-abzeichen-w4", title: "Schritt-Kenner", motif: "walk" },
  lessons: lessonsOf(4, [
    /* ---------- 1. Was ist der Schritt? ---------- */
    {
      slug: "was-ist-der-schritt",
      title: "Was ist der Schritt?",
      speaker: "ben",
      intro: {
        leicht: "Im Schritt fängt jede Reitstunde an. Was ist das Besondere daran?",
        mittel: "Der Schritt sieht einfach aus – und ist trotzdem die Grundlage für alles Weitere.",
      },
      explanation: {
        leicht: [
          "Der Schritt ist die langsamste Gangart. Das Pferd geht ruhig, und es sind immer zwei oder drei Hufe auf dem Boden.",
          "Im Schritt kannst du gut lernen und dich ausruhen. Jede Reitstunde fängt im Schritt an und hört im Schritt auf.",
        ],
        mittel: [
          "Der Schritt ist die ruhigste der drei Grundgangarten Schritt, Trab und Galopp. Er hat keine Schwebephase: Es sind immer zwei oder drei Hufe gleichzeitig am Boden. Ein Pferd im Schritt ist ungefähr so schnell wie ein Mensch, der zügig geht.",
          "Zu Beginn der Reitstunde wird im Schritt aufgewärmt, oft am langen Zügel. Am Ende wird im Schritt abgekühlt, damit Atmung und Muskeln zur Ruhe kommen. Man unterscheidet verschiedene Schrittarten, zum Beispiel den Mittelschritt und den freien Schritt am langen Zügel.",
        ],
      },
      illustration: scene("ak-reiter-pause"),
      terms: [
        { term: "Grundgangarten", meaning: "Schritt, Trab und Galopp." },
        { term: "Schwebephase", meaning: "Ein Moment, in dem kein Huf den Boden berührt. Im Schritt gibt es keine." },
        { term: "Freier Schritt", meaning: "Schritt am langen Zügel, das Pferd darf den Hals strecken." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w4-l1-stimmt",
          prompt: { leicht: "Was stimmt über den Schritt? Tippe alles Richtige an.", mittel: "Welche Aussagen über den Schritt stimmen? Wähle alle richtigen." },
          options: [
            { id: "langsam", label: "Er ist die langsamste Gangart", visual: item("ak-pause"), correct: true },
            { id: "boden", label: "Immer sind Hufe auf dem Boden", visual: huf(), correct: true },
            { id: "anfang", label: "Die Reitstunde beginnt im Schritt", visual: item("uhr"), correct: true, levels: ["mittel"] },
            { id: "springen", label: "Das Pferd springt durch die Luft", visual: item("ak-blitz"), feedback: "Im Schritt gibt es keine Schwebephase – kein Huf hebt gleichzeitig mit allen anderen ab." },
            { id: "profis", label: "Schritt ist nur für Profis", visual: item("ak-stopp"), feedback: "Im Schritt fangen alle an – Anfänger und Profis." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Der Schritt ist ruhig, langsam und ohne Schweben.",
        },
      ],
      quiz: [
        {
          id: "langsamste",
          prompt: "Welche Gangart ist die langsamste?",
          options: [
            ok("schritt", "Der Schritt"),
            no("trab", "Der Trab", "Der Trab ist schneller als der Schritt."),
            no("galopp", "Der Galopp", "Der Galopp ist die schnellste Grundgangart."),
          ],
          explain: "Richtig! Der Schritt ist die ruhigste Gangart.",
        },
        {
          id: "beginn",
          prompt: "Womit beginnt eine Reitstunde?",
          options: [
            ok("schritt", "Mit Schritt zum Aufwärmen"),
            no("galopp", "Mit Galopp", "Erst müssen sich die Muskeln aufwärmen – im Schritt."),
            no("springen", "Mit Springen", "Springen kommt, wenn überhaupt, viel später – erst wird im Schritt aufgewärmt."),
          ],
          explain: "Genau! Im Schritt werden die Muskeln warm.",
        },
        {
          id: "schweben",
          prompt: "Sind im Schritt manchmal alle Hufe gleichzeitig in der Luft?",
          options: [
            ok("nein", "Nein, nie"),
            no("oft", "Ja, ganz oft", "Im Schritt sind immer zwei oder drei Hufe auf dem Boden."),
            no("einmal", "Ja, einmal pro Runde", "Auch nicht einmal: Der Schritt hat keine Schwebephase."),
          ],
          explain: "Richtig! Der Schritt hat keine Schwebephase.",
        },
        {
          id: "grundgangarten",
          levels: ["mittel"],
          prompt: "Wie heißen die drei Grundgangarten?",
          options: [
            ok("sgt", "Schritt, Trab, Galopp"),
            no("toelt", "Schritt, Tölt, Pass", "Tölt und Pass sind besondere Gangarten mancher Rassen, zum Beispiel bei Islandpferden."),
            no("laufen", "Gehen, Rennen, Springen", "Beim Pferd heißen die Grundgangarten Schritt, Trab und Galopp."),
          ],
          explain: "Richtig. Schritt, Trab und Galopp sind die drei Grundgangarten aller Pferde.",
        },
        {
          id: "abkuehlen",
          levels: ["mittel"],
          prompt: "Warum reitet man am Ende im Schritt?",
          options: [
            ok("ruhe", "Damit Atmung und Muskeln zur Ruhe kommen"),
            no("einschlafen", "Damit das Pferd einschläft", "Es geht ums Abkühlen, nicht ums Einschlafen."),
            no("heim", "Damit es schneller nach Hause will", "Das Abkühlen im Schritt tut dem Körper des Pferdes gut."),
          ],
          explain: "Genau. Das Pferd kühlt ab und entspannt sich.",
        },
      ],
      merksatz: {
        leicht: "Schritt ist ruhig und langsam – immer sind Hufe auf dem Boden.",
        mittel: "Der Schritt hat keine Schwebephase: Aufwärmen, Lernen und Abkühlen passieren im Schritt.",
      },
    },

    /* ---------- 2. Der Viertakt ---------- */
    {
      slug: "der-viertakt",
      title: "Der Viertakt",
      speaker: "mila",
      intro: {
        leicht: "Hör mal: klopf, klopf, klopf, klopf. So klingt der Schritt!",
        mittel: "Jede Gangart hat ihren eigenen Takt. Der Schritt hat vier gleichmäßige Takte.",
      },
      explanation: {
        leicht: [
          "Im Schritt setzt das Pferd seine Beine nacheinander auf: eins, zwei, drei, vier. Darum heißt es Viertakt.",
          "Auf hartem Boden klingt der Schritt wie ein gleichmäßiges „klopf, klopf, klopf, klopf“.",
        ],
        mittel: [
          "Der Schritt ist ein gleichmäßiger Viertakt. Jedes Bein fußt einzeln auf, mit gleichen Abständen. Die Fußfolge ist: hinten links, vorne links, hinten rechts, vorne rechts – und dann von vorn.",
          "Auf ein Hinterbein folgt also immer das Vorderbein derselben Seite. Ein reiner, gleichmäßiger Takt ist ein Zeichen für ein entspanntes Pferd. Fußen die Beine einer Seite fast gleichzeitig auf, spricht man von einem passartigen Schritt – oft ist das Pferd dann angespannt.",
        ],
      },
      illustration: scene("ak-gang-schritt"),
      terms: [
        { term: "Viertakt", meaning: "Vier einzelne, gleichmäßige Hufschläge." },
        { term: "Fußfolge", meaning: "Die Reihenfolge, in der die Hufe aufsetzen." },
        { term: "Takt", meaning: "Die gleichmäßige Wiederholung der Hufschläge." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w4-l2-zaehlen",
          levels: ["leicht"],
          prompt: "Zähle die Hufschläge auf dem Bild. Wie viele sind es?",
          visual: scene("ak-takt-schritt"),
          layout: "list",
          options: [
            { id: "zwei", label: "Zwei", feedback: "Schau auf die Zahlen an den Hufen. Es sind mehr als zwei." },
            { id: "drei", label: "Drei", feedback: "Fast! Zähl noch einmal alle Zahlen." },
            { id: "vier", label: "Vier", correct: true },
          ],
          explain: "Richtig! Vier Hufschläge – der Viertakt.",
        },
        {
          type: "match",
          id: "ra-w4-l2-fussfolge",
          levels: ["mittel"],
          prompt: "Lege die Hufe in die richtige Reihenfolge – beginne mit hinten links.",
          targets: [
            { id: "1", label: "1." },
            { id: "2", label: "2." },
            { id: "3", label: "3." },
            { id: "4", label: "4." },
          ],
          items: [
            card("hl", "hinten links", huf(), "1", "Richtig, hinten links beginnt.", "Wir beginnen mit hinten links."),
            card("vl", "vorne links", huf(), "2", "Genau, dann das Vorderbein derselben Seite.", "Nach hinten links folgt vorne links."),
            card("hr", "hinten rechts", huf(), "3", "Richtig, jetzt die andere Seite hinten.", "Nach vorne links kommt hinten rechts."),
            card("vr", "vorne rechts", huf(), "4", "Super! Und dann beginnt es von vorn.", "Vorne rechts ist das letzte Bein im Takt."),
          ],
        },
      ],
      quiz: [
        {
          id: "takte",
          prompt: "Wie viele Takte hat der Schritt?",
          options: [
            ok("vier", "Vier"),
            no("zwei", "Zwei", "Zwei Takte hat der Trab."),
            no("drei", "Drei", "Drei Takte hat der Galopp."),
          ],
          explain: "Richtig! Der Schritt ist ein Viertakt.",
        },
        {
          id: "nacheinander",
          prompt: "Wie setzt das Pferd im Schritt die Beine auf?",
          options: [
            ok("nacheinander", "Eins nach dem anderen"),
            no("alle", "Alle auf einmal", "Dann würde das Pferd hüpfen. Im Schritt geht es eins nach dem anderen."),
            no("vorne", "Nur die Vorderbeine bewegen sich", "Alle vier Beine bewegen sich – nacheinander."),
          ],
          explain: "Genau! Darum hörst du vier Hufschläge.",
        },
        {
          id: "klang",
          prompt: "Wie klingt der Schritt auf hartem Boden?",
          options: [
            ok("vier", "Klopf, klopf, klopf, klopf"),
            no("trab", "Ta-tam, ta-tam", "Das klingt eher nach Trab."),
            no("galopp", "Ta-ta-tam, ta-ta-tam", "Das klingt eher nach Galopp."),
          ],
          explain: "Richtig! Vier gleichmäßige Schläge.",
        },
        {
          id: "folge",
          levels: ["mittel"],
          prompt: "Welches Bein folgt im Schritt auf hinten links?",
          options: [
            ok("vl", "Vorne links"),
            no("vr", "Vorne rechts", "Im Schritt folgt auf ein Hinterbein das Vorderbein derselben Seite."),
            no("hr", "Hinten rechts", "Hinten rechts kommt erst nach vorne links."),
          ],
          explain: "Richtig. Die Fußfolge lautet: hinten links, vorne links, hinten rechts, vorne rechts.",
        },
        {
          id: "passartig",
          levels: ["mittel"],
          prompt: "Was ist ein passartiger Schritt?",
          options: [
            ok("seite", "Die Beine einer Seite fußen fast gleichzeitig auf"),
            no("schnell", "Ein besonders schneller Schritt", "Mit der Geschwindigkeit hat das nichts zu tun – der Takt ist gestört."),
            no("rueckwaerts", "Schritt rückwärts", "Rückwärtsrichten ist etwas anderes."),
          ],
          explain: "Genau. Der Takt ist dann nicht mehr gleichmäßig – oft ein Zeichen von Anspannung.",
        },
      ],
      merksatz: {
        leicht: "Schritt ist Viertakt: eins, zwei, drei, vier.",
        mittel: "Viertakt mit gleichen Abständen: hinten links, vorne links, hinten rechts, vorne rechts.",
      },
    },

    /* ---------- 3. Mitschwingen im Schritt ---------- */
    {
      slug: "mitschwingen",
      title: "Mitschwingen im Schritt",
      speaker: "lea",
      intro: {
        leicht: "Im Schritt schaukelt es ganz sanft. Wenn du mitschwingst, fühlt es sich toll an!",
        mittel: "Gut sitzen heißt nicht stillhalten. Im Schritt lernst du, die Bewegung des Pferdes weich mitzumachen.",
      },
      explanation: {
        leicht: [
          "Im Schritt nickt das Pferd mit dem Kopf, und sein Rücken schwingt sanft. Deine Hüfte schwingt locker mit.",
          "Deine Hände gehen das Nicken ein wenig mit. So störst du das Pferd nicht im Maul.",
        ],
        mittel: [
          "Im Schritt bewegt sich der Pferderücken abwechselnd rechts und links auf und ab, und das Pferd nickt mit Kopf und Hals. Du sitzt locker im Sattel und lässt dein Becken weich mitschwingen – ohne aktiv zu schieben oder zu wackeln. Der Oberkörper bleibt ruhig und aufrecht.",
          "Weil das Pferd im Schritt nickt, gehen die Hände diese Bewegung elastisch mit. So bleibt die Verbindung zum Maul gleichmäßig. Wer die Hände steif festhält, ruckt bei jedem Schritt im Maul. Eine gute Übung mit der Reitlehrerin: im Schritt ruhig atmen und spüren, wie sich die Hüften des Pferdes abwechselnd heben.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Mitschwingen", meaning: "Die Bewegung des Pferdes weich und locker mitmachen." },
        { term: "Elastisch", meaning: "Weich nachgebend, nicht starr." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w4-l3-schwingen",
          prompt: { leicht: "Was machst du beim Mitschwingen? Tippe alles Richtige an.", mittel: "Was gehört zum Mitschwingen im Schritt? Wähle alle richtigen." },
          options: [
            { id: "huefte", label: "Hüfte locker mitschwingen lassen", visual: item("ak-schaukel"), correct: true },
            { id: "haende", label: "Hände gehen das Nicken mit", visual: item("ak-zuegel"), correct: true },
            { id: "atmen", label: "Ruhig atmen", visual: item("ak-herz"), correct: true, levels: ["mittel"] },
            { id: "schieben", label: "Mit dem Po kräftig schieben", visual: item("ak-blitz"), feedback: "Kräftiges Schieben stört das Pferd. Lass dich locker mitnehmen." },
            { id: "fest", label: "Hände ganz fest halten", visual: item("ak-stopp"), feedback: "Feste Hände rucken im Maul, weil das Pferd nickt." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Locker mitschwingen und weich mitgehen.",
        },
      ],
      quiz: [
        {
          id: "kopf",
          prompt: "Was macht das Pferd im Schritt mit dem Kopf?",
          options: [
            ok("nicken", "Es nickt"),
            no("still", "Es hält ihn ganz still", "Im Schritt nickt das Pferd mit Kopf und Hals."),
            no("schuetteln", "Es schüttelt ihn", "Schütteln ist etwas anderes. Im Schritt nickt das Pferd gleichmäßig."),
          ],
          explain: "Richtig! Das Nicken gehört zum Schritt.",
        },
        {
          id: "haende",
          prompt: "Was machen deine Hände dabei?",
          options: [
            ok("mit", "Sie gehen das Nicken weich mit"),
            no("ziehen", "Sie ziehen dagegen", "Dagegen ziehen tut dem Pferdemaul weh."),
            no("wild", "Sie wackeln wild", "Wildes Wackeln stört. Weich mitgehen ist gemeint."),
          ],
          explain: "Genau! So bleibt die Verbindung gleichmäßig.",
        },
        {
          id: "huefte",
          prompt: "Wie ist deine Hüfte im Schritt?",
          options: [
            ok("locker", "Locker"),
            no("steif", "Steif", "Steif kannst du nicht mitschwingen."),
            no("geschoben", "Weit nach vorne geschoben", "Schieben stört das Pferd. Locker sein reicht."),
          ],
          explain: "Richtig! Eine lockere Hüfte kann die sanfte Bewegung des Pferderückens mitmachen.",
        },
        {
          id: "schieben",
          levels: ["mittel"],
          prompt: "Warum soll man nicht aktiv mit dem Becken schieben?",
          options: [
            ok("stoert", "Es stört das Pferd und macht den Sitz unruhig"),
            no("stehen", "Weil das Pferd sonst stehen bleibt", "Das Pferd bleibt nicht unbedingt stehen – aber Schieben stört seinen Rücken."),
            no("verboten", "Weil es verboten ist", "Es geht nicht um Verbote, sondern um Gefühl: Schieben stört die Bewegung."),
          ],
          explain: "Genau. Mitschwingen heißt mitgehen, nicht antreiben.",
        },
        {
          id: "spueren",
          levels: ["mittel"],
          prompt: "Was spürst du im Schritt unter dir?",
          options: [
            ok("hueften", "Die Hüften des Pferdes heben sich abwechselnd"),
            no("nichts", "Gar keine Bewegung", "Doch – der Pferderücken bewegt sich ständig."),
            no("spruenge", "Einen Sprung bei jedem Schritt", "Sprünge gibt es erst im Galopp."),
          ],
          explain: "Richtig. Diese Bewegung nimmt dein Becken weich auf.",
        },
      ],
      merksatz: {
        leicht: "Locker sitzen und mitschwingen – die Hände gehen weich mit.",
        mittel: "Im Schritt schwingt das Becken weich mit, und die Hände folgen dem Nicken – ohne Schieben, ohne Ziehen.",
      },
    },

    /* ---------- 4. Anreiten, Lenken und Anhalten ---------- */
    {
      slug: "anreiten-lenken-anhalten",
      title: "Anreiten, Lenken und Anhalten",
      speaker: "ben",
      readTogether: true,
      intro: {
        leicht: "Los geht's, um die Kurve und wieder stehen bleiben. So machst du das!",
        mittel: "Anreiten, Lenken und Anhalten sind die ersten Aufgaben, bei denen alle Hilfen zusammenarbeiten.",
      },
      explanation: {
        leicht: [
          "Anreiten: aufrecht sitzen und kurz mit beiden Schenkeln bitten. Lenken: in die neue Richtung schauen, der innere Zügel zeigt den Weg.",
          "Anhalten: tief sitzen und die Hand kurz annehmen. Steht das Pferd, gibst du nach und lobst es.",
        ],
        mittel: [
          "Anreiten: Du sitzt ausbalanciert, hast die Zügel so aufgenommen, dass du Verbindung hast, und gibst mit beiden Schenkeln einen kurzen Impuls am Gurt. Die Hand lässt so viel nach, dass das Pferd vorwärtsgehen kann. Reagiert es nicht, wiederholst du den Impuls etwas deutlicher – du drückst nicht dauerhaft stärker.",
          "Lenken: Der Blick zeigt die neue Richtung, das Gewicht geht etwas mehr auf den inneren Gesäßknochen, der innere Zügel weist den Weg, der äußere begrenzt, und der äußere Schenkel liegt verwahrend hinter dem Gurt. Anhalten: tief sitzen, Schenkel anlegen, die Hand hält kurz durch und gibt nach, sobald das Pferd steht. Das übst du anfangs mit Hilfe deiner Reitlehrerin.",
        ],
      },
      illustration: scene("ak-bahn-ganze-bahn"),
      terms: [
        { term: "Durchparieren", meaning: "In eine langsamere Gangart wechseln oder anhalten." },
        { term: "Übergang", meaning: "Der Wechsel von einer Gangart in eine andere." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w4-l4-sortieren",
          prompt: { leicht: "Anreiten, Lenken oder Anhalten? Sortiere die Karten.", mittel: "Welche Hilfe gehört zum Anreiten, Lenken oder Anhalten?" },
          targets: [
            { id: "anreiten", label: "Anreiten" },
            { id: "lenken", label: "Lenken" },
            { id: "anhalten", label: "Anhalten" },
          ],
          items: [
            card("impuls", "Kurzer Impuls mit beiden Schenkeln", item("ak-schenkel"), "anreiten", "Richtig! So bittest du um Vorwärts.", "Ein Schenkelimpuls bittet vorwärts: Anreiten."),
            card("blick", "In die neue Richtung schauen", item("ak-auge"), "lenken", "Genau. Der Blick zeigt den Weg.", "Der Blick in die neue Richtung gehört zum Lenken."),
            card("innen", "Der innere Zügel zeigt den Weg", item("ak-zuegel"), "lenken", "Richtig. So weiß das Pferd, wohin.", "Der innere Zügel weist beim Lenken den Weg."),
            card("tief", "Tief sitzen, die Hand hält kurz durch", item("ak-gewicht"), "anhalten", "Genau – so bittest du um Halt.", "Tief sitzen und durchhalten gehört zum Anhalten."),
            card("aussen", "Der äußere Schenkel verwahrt", item("ak-stopp"), "lenken", "Richtig. Er hält die Hinterhand auf dem Weg.", "Der verwahrende äußere Schenkel hilft beim Lenken.", ["mittel"]),
            card("loben", "Nachgeben und loben, wenn es steht", item("ak-herz"), "anhalten", "Super!", "Nachgeben und Lob kommen, wenn das Pferd steht.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "lenken",
          prompt: "Wohin schaust du, wenn du lenken willst?",
          options: [
            ok("neu", "In die neue Richtung"),
            no("hals", "Auf den Pferdehals", "Wer nach unten schaut, hilft dem Pferd nicht beim Lenken."),
            no("hinten", "Nach hinten", "Nach hinten schauen verdreht deinen Körper in die falsche Richtung."),
          ],
          explain: "Richtig! Dein Blick zeigt den Weg.",
        },
        {
          id: "anhalten",
          prompt: "Wie hältst du an?",
          options: [
            ok("tief", "Tief sitzen und die Hand kurz annehmen"),
            no("schreien", "Laut „Stopp!“ schreien", "Lautes Schreien erschreckt. Ein ruhiges Wort kann helfen, aber zuerst sitzt du tief."),
            no("treten", "Mit den Schenkeln treten", "Treten heißt für das Pferd: vorwärts!"),
          ],
          explain: "Genau! Tief sitzen und kurz annehmen – sobald das Pferd steht, gibt die Hand nach.",
        },
        {
          id: "steht",
          prompt: "Das Pferd steht. Was machst du jetzt?",
          options: [
            ok("loben", "Nachgeben und loben"),
            no("ziehen", "Weiter am Zügel ziehen", "Das Pferd hat schon angehalten – jetzt gibt die Hand nach."),
            no("galopp", "Sofort losgaloppieren", "Erst kommt das Lob. Danach geht es ruhig weiter."),
          ],
          explain: "Richtig! So weiß das Pferd: Das war gut.",
        },
        {
          id: "reagiert-nicht",
          levels: ["mittel"],
          prompt: "Das Pferd reagiert nicht auf den ersten Schenkelimpuls. Was tust du?",
          options: [
            ok("deutlicher", "Den Impuls einmal etwas deutlicher wiederholen"),
            no("dauer", "Dauerhaft immer fester drücken", "Dauerhaftes Drücken stumpft ab und ist unfair."),
            no("reissen", "Am Zügel reißen", "Reißen tut weh und hilft beim Anreiten gar nicht."),
          ],
          explain: "Genau – und danach wieder leicht werden. Klappt es nicht, fragst du deine Reitlehrerin.",
        },
        {
          id: "aussen",
          levels: ["mittel"],
          prompt: "Was macht der äußere Zügel in einer Wendung?",
          options: [
            ok("begrenzt", "Er begrenzt, damit das Pferd nicht über die Schulter ausweicht"),
            no("nach-aussen", "Er zieht den Kopf nach außen", "Der Kopf soll leicht nach innen schauen. Der äußere Zügel begrenzt nur."),
            no("lose", "Er hängt ganz lose durch", "Ganz lose kann er nicht begrenzen."),
          ],
          explain: "Richtig. Innen weist den Weg, außen begrenzt.",
        },
      ],
      merksatz: {
        leicht: "Anreiten: Schenkel. Lenken: Blick und innerer Zügel. Anhalten: tief sitzen – und loben!",
        mittel: "Anreiten, Lenken und Anhalten sind Zusammenspiel: Blick, Gewicht, Schenkel und Zügel – immer mit Nachgeben.",
      },
      practiceNote: "Anreiten, Lenken und Anhalten nur im Reitunterricht mit einer Reitlehrkraft üben.",
    },

    /* ---------- 5. Schritt-Quiz ---------- */
    {
      slug: "schritt-quiz",
      title: "Schritt-Quiz",
      speaker: "mila",
      intro: {
        leicht: "Kannst du den Schritt? Zeig es im Quiz!",
        mittel: "Viertakt, Mitschwingen, Anreiten und Anhalten – jetzt kommt alles noch einmal.",
      },
      explanation: {
        leicht: ["Das weißt du schon: Schritt ist Viertakt, ruhig und ohne Schweben. Du schwingst locker mit und gehst mit den Händen weich mit."],
        mittel: [
          "Kurze Wiederholung: Der Schritt ist ein Viertakt ohne Schwebephase mit der Fußfolge hinten links, vorne links, hinten rechts, vorne rechts. Das Becken schwingt mit, die Hände folgen dem Nicken. Anreiten, Lenken und Anhalten entstehen aus dem Zusammenspiel der Hilfen.",
        ],
      },
      illustration: scene("ak-gang-schritt"),
      exercise: [
        {
          type: "choice",
          id: "ra-w4-l5-gangart",
          prompt: "Welche Gangart zeigt dieses Bild?",
          visual: scene("ak-takt-schritt"),
          layout: "list",
          options: [
            { id: "schritt", label: "Schritt", correct: true },
            { id: "trab", label: "Trab", feedback: "Im Trab sind es zwei Takte mit diagonalen Paaren. Hier sind es vier einzelne." },
            { id: "galopp", label: "Galopp", feedback: "Im Galopp sind es drei Takte. Hier sind es vier." },
          ],
          explain: "Richtig! Vier einzelne Hufschläge: Schritt.",
        },
      ],
      quiz: [
        {
          id: "viertakt",
          prompt: "Welche Gangart ist ein Viertakt?",
          options: [
            ok("schritt", "Der Schritt"),
            no("trab", "Der Trab", "Der Trab ist ein Zweitakt."),
            no("galopp", "Der Galopp", "Der Galopp ist ein Dreitakt."),
          ],
          explain: "Richtig! Der Schritt hat vier einzelne, gleichmäßige Takte.",
        },
        {
          id: "boden",
          prompt: "Wie viele Hufe sind im Schritt mindestens auf dem Boden?",
          options: [
            ok("zwei", "Mindestens zwei"),
            no("keiner", "Manchmal keiner", "Im Schritt schwebt das Pferd nie."),
            no("einer", "Nur einer", "Es sind immer zwei oder drei Hufe auf dem Boden."),
          ],
          explain: "Genau! Im Schritt sind immer zwei oder drei Hufe am Boden – es gibt keine Schwebephase.",
        },
        {
          id: "blick",
          prompt: "Wohin schaust du beim Lenken?",
          options: [
            ok("neu", "In die neue Richtung"),
            no("ohren", "Nur auf die Ohren", "Die Ohren sind ein guter Anhaltspunkt geradeaus. Beim Lenken schaust du in die neue Richtung."),
            no("unten", "Nach unten", "Nach unten schauen bringt dich aus der Balance."),
          ],
          explain: "Richtig! Dein Blick in die neue Richtung dreht deinen Oberkörper ein wenig mit.",
        },
        {
          id: "haende",
          prompt: "Was machen die Hände im Schritt?",
          options: [
            ok("mit", "Sie gehen das Nicken weich mit"),
            no("fest", "Sie halten ganz fest", "Feste Hände rucken im Maul."),
            no("hoch", "Sie gehen hoch über den Kopf", "Die Hände bleiben vor dem Widerrist und gehen nur weich mit."),
          ],
          explain: "Genau! Weich mitgehende Hände halten die Verbindung zum Maul gleichmäßig.",
        },
        {
          id: "folge",
          levels: ["mittel"],
          prompt: "Welche Fußfolge hat der Schritt?",
          options: [
            ok("lateral", "Hinten links – vorne links – hinten rechts – vorne rechts"),
            no("diagonal", "Hinten links und vorne rechts gleichzeitig, dann die anderen beiden", "Diagonale Paare gehören zum Trab."),
            no("vorne", "Vorne links – vorne rechts – hinten links – hinten rechts", "Im Schritt folgt auf ein Hinterbein das Vorderbein derselben Seite."),
          ],
          explain: "Richtig. Auf jedes Hinterbein folgt das Vorderbein derselben Seite.",
        },
        {
          id: "nachgeben",
          levels: ["mittel"],
          prompt: "Was folgt beim Anhalten auf das Durchhalten der Hand?",
          options: [
            ok("nachgeben", "Nachgeben, sobald das Pferd steht"),
            no("ziehen", "Noch stärker ziehen", "Das Pferd steht schon. Jetzt gibt die Hand nach."),
            no("treiben", "Kräftig treiben", "Treiben bittet das Pferd vorwärts – das Gegenteil von Anhalten."),
          ],
          explain: "Genau. Das Nachgeben sagt dem Pferd: Anhalten war richtig.",
        },
      ],
      merksatz: {
        leicht: "Im Schritt: Viertakt, locker mitschwingen, loben.",
        mittel: "Schritt: Viertakt ohne Schwebephase – zum Aufwärmen, Lernen und Abkühlen.",
      },
    },
  ]),
};
