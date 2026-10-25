import "server-only";
import { card, huf, item, no, ok } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 5 – Trab reiten */
export const welt5: AcademyWorld = {
  id: "w5",
  number: 5,
  slug: "trab-reiten",
  title: "Trab reiten",
  teaser: "Zweitakt, Leichttraben und Aussitzen.",
  learns: "Zweitakt mit diagonalen Beinpaaren und Schwebephase, Leichttraben und Aussitzen, Leichttraben auf dem richtigen Fuß und Fußwechsel beim Handwechsel.",
  tint: "#E8DCC4",
  cover: scene("ak-gang-trab"),
  badge: { id: "ra-abzeichen-w5", title: "Trab-Talent", motif: "trot" },
  lessons: lessonsOf(5, [
    /* ---------- 1. Der Zweitakt ---------- */
    {
      slug: "der-zweitakt",
      title: "Der Zweitakt",
      speaker: "lea",
      intro: {
        leicht: "Ta-tam, ta-tam! Hörst du das? Das ist der Trab.",
        mittel: "Der Trab ist schwungvoller als der Schritt. Sein Geheimnis sind die diagonalen Beinpaare.",
      },
      explanation: {
        leicht: [
          "Im Trab ist das Pferd schneller als im Schritt. Immer zwei Beine bewegen sich zusammen: eins vorne und eins hinten, über Kreuz.",
          "Der Trab hat zwei Takte: ta-tam, ta-tam. Dazwischen schwebt das Pferd ganz kurz – darum hüpft es im Sattel.",
        ],
        mittel: [
          "Der Trab ist ein Zweitakt. Das Pferd bewegt jeweils zwei diagonale Beine gleichzeitig: hinten links mit vorne rechts, dann hinten rechts mit vorne links. Diese Paare heißen diagonale Beinpaare.",
          "Zwischen den beiden Takten gibt es eine kurze Schwebephase, in der kein Huf den Boden berührt. Dadurch schwingt der Pferderücken stärker als im Schritt – das spürst du als Auf und Ab im Sattel. Man unterscheidet zum Beispiel Arbeitstrab, Mitteltrab und versammelten Trab.",
        ],
      },
      illustration: scene("ak-gang-trab"),
      terms: [
        { term: "Zweitakt", meaning: "Zwei Hufschläge pro Bewegungsablauf." },
        { term: "Diagonales Beinpaar", meaning: "Ein Vorderbein und das gegenüberliegende Hinterbein, die sich zusammen bewegen." },
        { term: "Arbeitstrab", meaning: "Der ruhige, gleichmäßige Trab, in dem man meistens reitet." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w5-l1-zaehlen",
          levels: ["leicht"],
          prompt: "Zähle die Takte auf dem Bild. Wie viele sind es?",
          visual: scene("ak-takt-trab"),
          layout: "list",
          options: [
            { id: "zwei", label: "Zwei", correct: true },
            { id: "drei", label: "Drei", feedback: "Schau auf die Zahlen: Es gibt nur die 1 und die 2." },
            { id: "vier", label: "Vier", feedback: "Vier Hufe, aber nur zwei Takte – immer zwei Hufe zusammen." },
          ],
          explain: "Richtig! Zwei Takte, immer zwei Hufe zusammen.",
        },
        {
          type: "match",
          id: "ra-w5-l1-paare",
          levels: ["mittel"],
          prompt: "Welche Beine fußen im Trab zusammen auf? Ordne sie den Takten zu.",
          targets: [
            { id: "1", label: "Takt 1" },
            { id: "2", label: "Takt 2" },
          ],
          items: [
            card("hl", "hinten links", huf(), "1", "Richtig. Hinten links gehört zu Takt 1.", "Hinten links fußt mit vorne rechts im ersten Takt auf."),
            card("vr", "vorne rechts", huf(), "1", "Genau, über Kreuz mit hinten links.", "Vorne rechts ist der diagonale Partner von hinten links."),
            card("hr", "hinten rechts", huf(), "2", "Richtig. Takt 2 beginnt hinten rechts.", "Hinten rechts gehört zum zweiten Takt."),
            card("vl", "vorne links", huf(), "2", "Super! Vorne links und hinten rechts sind ein Paar.", "Vorne links ist der Partner von hinten rechts."),
          ],
        },
      ],
      quiz: [
        {
          id: "takte",
          prompt: "Wie viele Takte hat der Trab?",
          options: [
            ok("zwei", "Zwei"),
            no("vier", "Vier", "Vier Takte hat der Schritt."),
            no("drei", "Drei", "Drei Takte hat der Galopp."),
          ],
          explain: "Richtig! Ta-tam, ta-tam – zwei Takte.",
        },
        {
          id: "zusammen",
          prompt: "Welche Beine bewegen sich im Trab zusammen?",
          options: [
            ok("kreuz", "Ein Vorderbein und ein Hinterbein über Kreuz"),
            no("vorne", "Beide Vorderbeine", "Dann würde das Pferd hüpfen wie ein Hase."),
            no("alle", "Alle vier", "Alle vier zusammen – das gibt es in keiner Gangart beim Aufsetzen."),
          ],
          explain: "Genau! Über Kreuz, also diagonal.",
        },
        {
          id: "auf-ab",
          prompt: "Warum spürst du im Trab ein Auf und Ab?",
          options: [
            ok("schweben", "Weil das Pferd kurz schwebt"),
            no("stolpern", "Weil das Pferd stolpert", "Das Auf und Ab ist ganz normal. Es kommt vom Schweben."),
            no("sattel", "Weil der Sattel locker ist", "Ein guter Sattel ist fest. Das Auf und Ab kommt vom Pferd."),
          ],
          explain: "Richtig! Zwischen den Takten ist kurz kein Huf am Boden.",
        },
        {
          id: "partner",
          levels: ["mittel"],
          prompt: "Welches Bein bewegt sich zusammen mit hinten links?",
          options: [
            ok("vr", "Vorne rechts"),
            no("vl", "Vorne links", "Das wäre dieselbe Seite. Im Trab gehen die Beine diagonal."),
            no("hr", "Hinten rechts", "Beide Hinterbeine zusammen gibt es im Trab nicht."),
          ],
          explain: "Richtig. Hinten links und vorne rechts sind ein diagonales Paar.",
        },
        {
          id: "schwebe",
          levels: ["mittel"],
          prompt: "Was ist eine Schwebephase?",
          options: [
            ok("luft", "Ein Moment, in dem kein Huf den Boden berührt"),
            no("pause", "Eine Pause, in der das Pferd steht", "Stehen ist keine Schwebephase."),
            no("sprung", "Ein Sprung über ein Hindernis", "Gemeint ist der kurze Moment im Trab und Galopp ohne Bodenkontakt."),
          ],
          explain: "Genau. Im Schritt gibt es sie nicht, im Trab und Galopp schon.",
        },
      ],
      merksatz: {
        leicht: "Trab ist Zweitakt: ta-tam, ta-tam – die Beine gehen über Kreuz.",
        mittel: "Trab: Zweitakt mit diagonalen Beinpaaren und kurzer Schwebephase.",
      },
    },

    /* ---------- 2. Leichttraben verstehen ---------- */
    {
      slug: "leichttraben",
      title: "Leichttraben verstehen",
      speaker: "ben",
      intro: {
        leicht: "Auf – ab, auf – ab! Beim Leichttraben stehe ich ein bisschen auf.",
        mittel: "Leichttraben ist bequem für dich und gut für den Pferderücken. So funktioniert es.",
      },
      explanation: {
        leicht: [
          "Beim Leichttraben stehst du bei einem Takt ein bisschen auf und setzt dich beim nächsten Takt sanft wieder hin: auf – ab, auf – ab.",
          "Das ist bequem für dich und angenehm für den Pferderücken. Die Hände bleiben dabei ganz ruhig.",
        ],
        mittel: [
          "Beim Leichttraben lässt du dich im Rhythmus des Trabs aus dem Sattel heben und setzt dich beim nächsten Takt weich wieder hinein. Die Bewegung kommt aus der Hüfte nach vorn-oben, nicht durch Hochdrücken aus den Steigbügeln. Das Knie federt, der Absatz bleibt tief.",
          "Leichttraben entlastet den Pferderücken. Es ist zum Beispiel beim Aufwärmen, bei jungen Pferden und auf längeren Strecken angenehm. Die Hände bleiben ruhig an derselben Stelle, auch wenn dein Körper sich hebt – sonst würdest du bei jedem Takt am Maul ziehen. Am Anfang hilft es, leise „auf – ab“ mitzuzählen.",
        ],
      },
      illustration: scene("ak-reiter-leicht-nah"),
      terms: [
        { term: "Leichttraben", meaning: "Im Rhythmus des Trabs aufstehen und wieder einsitzen." },
        { term: "Einsitzen", meaning: "Sich weich wieder in den Sattel setzen." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w5-l2-bild",
          prompt: "Auf welchem Bild steht die Reiterin beim Leichttraben auf?",
          layout: "pictures",
          options: [
            { id: "sitz", label: "Bild 1", visual: scene("ak-reiter-sitz-nah"), feedback: "Hier sitzt die Reiterin im Sattel – das ist das „ab“." },
            { id: "leicht", label: "Bild 2", visual: scene("ak-reiter-leicht-nah"), correct: true },
            { id: "vor", label: "Bild 3", visual: scene("ak-reiter-vor-nah"), feedback: "Hier kippt nur der Oberkörper nach vorn. Beim Aufstehen hebt sich das Becken etwas aus dem Sattel." },
          ],
          explain: "Richtig! Das Becken hebt sich etwas aus dem Sattel, die Hände bleiben ruhig.",
        },
      ],
      quiz: [
        {
          id: "was",
          prompt: "Was machst du beim Leichttraben?",
          options: [
            ok("aufab", "Auf – ab im Takt"),
            no("stehen", "Die ganze Zeit stehen", "Stehen bleiben ist nicht gemeint. Es geht im Wechsel auf und ab."),
            no("huepfen", "So hoch hüpfen, wie es geht", "Nur ein kleines bisschen auf – dann sanft wieder ab."),
          ],
          explain: "Genau! Im Rhythmus des Trabs.",
        },
        {
          id: "haende",
          prompt: "Was machen deine Hände beim Leichttraben?",
          options: [
            ok("ruhig", "Sie bleiben ruhig"),
            no("mit", "Sie gehen mit nach oben und unten", "Dann würdest du bei jedem Takt am Pferdemaul ziehen."),
            no("hals", "Sie stützen sich auf den Hals", "Abstützen bringt dich nach vorne. Die Hände bleiben ruhig in der Luft."),
          ],
          explain: "Richtig! Nur der Körper bewegt sich, die Hände nicht.",
        },
        {
          id: "warum",
          prompt: "Warum ist Leichttraben gut für das Pferd?",
          options: [
            ok("ruecken", "Es entlastet den Pferderücken"),
            no("schneller", "Es macht das Pferd schneller", "Leichttraben macht nicht schneller, sondern leichter für den Rücken."),
            no("schlaf", "Das Pferd schläft dabei ein", "Das Pferd bleibt wach und aufmerksam – aber sein Rücken hat es leichter."),
          ],
          explain: "Genau! Beim Aufstehen hat der Pferderücken jeden zweiten Takt Pause von deinem Gewicht.",
        },
        {
          id: "hueft",
          levels: ["mittel"],
          prompt: "Woher kommt die Bewegung beim Aufstehen?",
          options: [
            ok("huefte", "Aus der Hüfte, nach vorn-oben"),
            no("buegel", "Durch kräftiges Drücken in die Steigbügel", "Wer sich hochdrückt, verliert die Balance, und der Absatz rutscht hoch."),
            no("zuegel", "Durch Ziehen am Zügel", "Am Zügel ziehen tut dem Pferd weh. Die Hand bleibt ruhig."),
          ],
          explain: "Richtig. Das Pferd hebt dich mit, du lässt dich nach vorn-oben bringen.",
        },
        {
          id: "einsitzen",
          levels: ["mittel"],
          prompt: "Wie setzt du dich wieder hin?",
          options: [
            ok("weich", "Weich und kontrolliert"),
            no("plumps", "Mit einem Plumps", "Plumpsen ist unangenehm für den Pferderücken."),
            no("garnicht", "Gar nicht – ich bleibe oben", "Beim Leichttraben wechselt Aufstehen und Einsitzen."),
          ],
          explain: "Genau. Weich einsitzen schont den Rücken.",
        },
      ],
      merksatz: {
        leicht: "Auf – ab im Takt, sanft hinsetzen, Hände ruhig.",
        mittel: "Leichttraben: aus der Hüfte aufstehen, weich einsitzen, ruhige Hände – das entlastet den Pferderücken.",
      },
      practiceNote: "Leichttraben im Reitunterricht unter Anleitung, am Anfang gern an der Longe, üben.",
    },

    /* ---------- 3. Aussitzen und Balance ---------- */
    {
      slug: "aussitzen",
      title: "Aussitzen und Balance",
      speaker: "mila",
      intro: {
        leicht: "Im Trab sitzen bleiben – das ist gar nicht so leicht! Ich zeige dir den Trick.",
        mittel: "Aussitzen braucht Balance und Lockerheit. Hier erfährst du, worauf es ankommt.",
      },
      explanation: {
        leicht: [
          "Beim Aussitzen bleibst du im Trab im Sattel sitzen. Das ist schwerer, weil es ruckelt.",
          "Der Trick: locker bleiben! Dein Rücken und deine Hüfte federn die Bewegung ab wie ein weiches Kissen. Festhalten darfst du dich am Sattel oder Halsriemen – nie am Zügel.",
        ],
        mittel: [
          "Beim Aussitzen bleibst du im Trab im Sattel. Damit du nicht hüpfst, federt dein Becken die Auf- und Abbewegung des Pferderückens weich ab. Dafür brauchst du Balance und lockere Hüft-, Knie- und Fußgelenke. Wer sich verkrampft oder am Zügel festhält, wird herumgeworfen.",
          "Aussitzen lernt man am besten Schritt für Schritt: in einem ruhigen Trab, zuerst nur für ein paar Tritte, oft an der Longe. Wenn du dich festhalten musst, nimm den Sattel oder einen Halsriemen – nie den Zügel. Für den Pferderücken ist ein steifer, hüpfender Reiter unangenehm: lieber kurz und gut aussitzen als lange und verkrampft.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Aussitzen", meaning: "Im Trab im Sattel sitzen bleiben." },
        { term: "Longe", meaning: "Lange Leine: Das Pferd läuft im Kreis, die Reitlehrerin führt es." },
        { term: "Halsriemen", meaning: "Ein Riemen um den Pferdehals zum Festhalten." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w5-l3-hilft",
          prompt: { leicht: "Was hilft beim Aussitzen? Tippe alles Richtige an.", mittel: "Was hilft beim Aussitzen? Wähle alle richtigen Antworten." },
          options: [
            { id: "locker", label: "Lockere Hüfte", visual: item("ak-schaukel"), correct: true },
            { id: "balance", label: "Ausbalanciert sitzen", visual: item("ak-gewicht"), correct: true },
            { id: "kurz", label: "Erst nur kurze Strecken üben", visual: item("uhr"), correct: true, levels: ["mittel"] },
            { id: "zuegel", label: "Am Zügel festhalten", visual: item("ak-zuegel"), feedback: "Festhalten am Zügel tut dem Pferd weh. Nimm den Sattel oder den Halsriemen." },
            { id: "steif", label: "Ganz steif machen", visual: item("ak-stopp"), feedback: "Steif wirst du erst recht herumgeworfen." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Locker, ausbalanciert und Schritt für Schritt.",
        },
      ],
      quiz: [
        {
          id: "heisst",
          prompt: "Was heißt Aussitzen?",
          options: [
            ok("sitzen", "Im Trab im Sattel sitzen bleiben"),
            no("absteigen", "Absteigen und warten", "Aussitzen hat nichts mit Absteigen zu tun."),
            no("schritt", "Im Schritt stehen bleiben", "Aussitzen meint den Trab: sitzen bleiben, statt leichtzutraben."),
          ],
          explain: "Richtig! Beim Aussitzen bleibst du im Trab im Sattel und federst die Bewegung weich ab.",
        },
        {
          id: "trick",
          prompt: "Was hilft dir beim Aussitzen am meisten?",
          options: [
            ok("locker", "Locker bleiben"),
            no("festklammern", "Mich mit den Beinen festklammern", "Klammern macht steif – dann hüpfst du mehr."),
            no("luft", "Die Luft anhalten", "Luft anhalten macht steif. Ruhig weiteratmen!"),
          ],
          explain: "Genau! Locker federst du die Bewegung ab.",
        },
        {
          id: "festhalten",
          prompt: "Es wackelt sehr. Woran darfst du dich festhalten?",
          options: [
            ok("sattel", "Am Sattel oder am Halsriemen"),
            no("zuegel", "Am Zügel", "Der Zügel führt zum Pferdemaul. Festhalten daran tut dem Pferd weh."),
            no("nichts", "An nichts – ich lasse alles los", "Wenn du unsicher bist, darfst du dich am Sattel oder Halsriemen festhalten."),
          ],
          explain: "Richtig! Sattel oder Halsriemen geben dir Halt – der Zügel gehört dem Pferdemaul.",
        },
        {
          id: "schwer",
          levels: ["mittel"],
          prompt: "Warum ist Aussitzen am Anfang schwer?",
          options: [
            ok("federn", "Der Pferderücken schwingt stärker, und man muss locker mitfedern"),
            no("sattel", "Weil der Sattel zu klein ist", "Mit der Sattelgröße hat das meist nichts zu tun – es geht um Lockerheit."),
            no("pferd", "Weil das Pferd nicht will", "Die Bewegung im Trab ist einfach kräftiger als im Schritt."),
          ],
          explain: "Genau. Mit Übung wird es leichter.",
        },
        {
          id: "ueben",
          levels: ["mittel"],
          prompt: "Wie übt man Aussitzen gut?",
          options: [
            ok("kurz", "In ruhigem Trab, zuerst nur kurze Strecken"),
            no("lang", "Gleich eine halbe Stunde am Stück", "So lange wird man steif – und der Pferderücken leidet."),
            no("schnell", "Im schnellsten Trab", "Im schnellen Trab schwingt es noch stärker. Ruhig anfangen!"),
          ],
          explain: "Richtig. Kurz und gut statt lang und verkrampft.",
        },
      ],
      merksatz: {
        leicht: "Aussitzen: locker bleiben – und nie am Zügel festhalten.",
        mittel: "Aussitzen heißt weich abfedern: Balance statt Festhalten, kurz und locker statt lang und steif.",
      },
    },

    /* ---------- 4. Auf dem richtigen Fuß leichttraben ---------- */
    {
      slug: "richtiger-fuss",
      title: "Auf dem richtigen Fuß leichttraben",
      speaker: "lea",
      readTogether: true,
      intro: {
        leicht: "Beim Leichttraben gibt es einen Trick, wann man aufsteht. Ich verrate ihn dir!",
        mittel: "„Auf dem richtigen Fuß“ leichttraben – was heißt das, und warum macht man das?",
      },
      explanation: {
        leicht: [
          "In der Reitbahn ist eine Seite innen und eine außen. Beim Leichttraben stehst du auf, wenn die äußere Schulter des Pferdes nach vorne geht.",
          "Wechselst du die Richtung, bleibst du einmal extra sitzen: ab – ab – auf. Dann passt es wieder.",
        ],
        mittel: [
          "Auf dem richtigen Fuß leichttraben heißt: Du sitzt ein, wenn das innere Hinterbein und das äußere Vorderbein auffußen, und stehst auf, wenn diese beiden nach vorne schwingen. Zur Kontrolle schaust du kurz – nur mit den Augen – auf die äußere Schulter: Geht sie nach vorne, bist du oben. So unterstützt du das innere Hinterbein, das in Wendungen besonders viel arbeitet.",
          "Beim Handwechsel ändert sich, was innen und was außen ist. Darum bleibst du beim Richtungswechsel für einen Takt länger sitzen (zweimal einsitzen) und trabst danach auf dem neuen Fuß weiter. Auch auf geraden Strecken, etwa im Gelände, wechselt man ab und zu den Fuß, damit beide Seiten des Pferdes gleich arbeiten.",
        ],
      },
      illustration: scene("ak-bahn-handwechsel"),
      terms: [
        { term: "Innen", meaning: "Die Seite zur Mitte der Bahn." },
        { term: "Außen", meaning: "Die Seite zur Bande." },
        { term: "Fuß wechseln", meaning: "Einmal doppelt einsitzen, damit du mit dem anderen diagonalen Beinpaar aufstehst." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w5-l4-wann",
          levels: ["leicht"],
          prompt: "Du trabst links herum. Wann stehst du auf?",
          layout: "list",
          options: [
            { id: "aussen", label: "Wenn die äußere (rechte) Schulter nach vorne geht", correct: true },
            { id: "innen", label: "Wenn die innere (linke) Schulter nach vorne geht", feedback: "Fast! Schau auf die äußere Schulter – das ist die zur Bande." },
            { id: "egal", label: "Ganz egal", feedback: "Es gibt einen richtigen Fuß – er hilft dem Pferd in den Kurven." },
          ],
          explain: "Richtig! Links herum ist rechts außen.",
        },
        {
          type: "match",
          id: "ra-w5-l4-auf-ein",
          levels: ["mittel"],
          prompt: "Aufstehen oder einsitzen? Ordne zu.",
          targets: [
            { id: "auf", label: "Aufstehen" },
            { id: "ein", label: "Einsitzen" },
          ],
          items: [
            card("av-vor", "Äußeres Vorderbein schwingt vor", huf(), "auf", "Richtig. Die äußere Schulter geht vor – du bist oben.", "Schwingt das äußere Vorderbein vor, stehst du auf."),
            card("ih-vor", "Inneres Hinterbein schwingt vor", huf(), "auf", "Genau, es gehört zum selben Beinpaar.", "Das innere Hinterbein schwingt zusammen mit dem äußeren Vorderbein vor: aufstehen."),
            card("ih-auf", "Inneres Hinterbein fußt auf", huf(), "ein", "Richtig. Jetzt sitzt du ein.", "Fußt das innere Hinterbein auf, sitzt du ein."),
            card("av-auf", "Äußeres Vorderbein fußt auf", huf(), "ein", "Super! Gleichzeitig mit dem inneren Hinterbein.", "Fußt das äußere Vorderbein auf, sitzt du ein."),
          ],
        },
      ],
      quiz: [
        {
          id: "kontrolle",
          prompt: "Wohin schaust du kurz zur Kontrolle?",
          options: [
            ok("schulter", "Auf die äußere Schulter des Pferdes"),
            no("schweif", "Auf den Schweif", "Den Schweif kannst du vom Sattel aus nicht gut sehen."),
            no("fuesse", "Auf meine Füße", "An deinen Füßen siehst du den Takt nicht. Schau kurz auf die äußere Schulter."),
          ],
          explain: "Richtig! Nur kurz mit den Augen, der Kopf bleibt oben.",
        },
        {
          id: "wechsel",
          prompt: "Was machst du beim Richtungswechsel?",
          options: [
            ok("sitzen", "Einmal extra sitzen bleiben"),
            no("stehen", "Zweimal hintereinander aufstehen", "Zweimal aufstehen ist schwierig und wackelig. Man bleibt einmal länger sitzen."),
            no("anhalten", "Anhalten", "Anhalten ist nicht nötig. Einmal extra sitzen reicht."),
          ],
          explain: "Genau! Einmal extra sitzen (ab – ab – auf), dann trabst du auf dem neuen Fuß.",
        },
        {
          id: "linke-hand",
          prompt: "Was heißt „auf der linken Hand reiten“?",
          options: [
            ok("links", "Links herum reiten, links ist innen"),
            no("zuegel", "Die Zügel nur links halten", "Die Zügel hältst du mit beiden Händen. Gemeint ist die Richtung."),
            no("rechts", "Rechts herum reiten", "Rechts herum heißt „auf der rechten Hand“."),
          ],
          explain: "Richtig! Deine linke Seite zeigt zur Mitte der Bahn.",
        },
        {
          id: "einsitzen",
          levels: ["mittel"],
          prompt: "Wann sitzt du beim Leichttraben auf dem richtigen Fuß ein?",
          options: [
            ok("ih", "Wenn das innere Hinterbein auffußt"),
            no("ah", "Wenn das äußere Hinterbein auffußt", "Dann wärst du auf dem falschen Fuß."),
            no("luft", "Wenn alle Beine in der Luft sind", "In der Schwebephase sitzt du nicht ein – du sitzt beim Auffußen ein."),
          ],
          explain: "Richtig. So unterstützt du das innere Hinterbein.",
        },
        {
          id: "gelaende",
          levels: ["mittel"],
          prompt: "Warum wechselt man auch auf geraden Strecken ab und zu den Fuß?",
          options: [
            ok("beide", "Damit beide Seiten des Pferdes gleich arbeiten"),
            no("pflicht", "Weil es sonst verboten ist", "Es geht nicht um Verbote, sondern um eine gleichmäßige Belastung."),
            no("schneller", "Damit man schneller ist", "Der Fußwechsel macht nicht schneller – er verteilt die Arbeit."),
          ],
          explain: "Genau. Das Pferd wird gleichmäßig gymnastiziert.",
        },
      ],
      merksatz: {
        leicht: "Äußere Schulter geht vor – ich bin oben. Richtung gewechselt? Einmal extra sitzen.",
        mittel: "Einsitzen, wenn das innere Hinterbein auffußt; beim Handwechsel einmal doppelt einsitzen.",
      },
    },

    /* ---------- 5. Trab-Quiz ---------- */
    {
      slug: "trab-quiz",
      title: "Trab-Quiz",
      speaker: "ben",
      intro: {
        leicht: "Ta-tam, ta-tam – auf zum Trab-Quiz!",
        mittel: "Zweitakt, Leichttraben, Aussitzen und der richtige Fuß – jetzt kommt alles zusammen.",
      },
      explanation: {
        leicht: ["Das weißt du schon: Trab ist Zweitakt. Beim Leichttraben geht es auf – ab. Beim Aussitzen bleibst du locker."],
        mittel: [
          "Kurze Wiederholung: Der Trab ist ein Zweitakt mit diagonalen Beinpaaren und Schwebephase. Beim Leichttraben stehst du auf, wenn das äußere Vorderbein vorschwingt, und wechselst beim Handwechsel den Fuß. Beim Aussitzen federt das Becken weich ab.",
        ],
      },
      illustration: scene("ak-gang-trab"),
      exercise: [
        {
          type: "choice",
          id: "ra-w5-l5-gangart",
          prompt: "Welche Gangart zeigt dieses Bild?",
          visual: scene("ak-takt-trab"),
          layout: "list",
          options: [
            { id: "schritt", label: "Schritt", feedback: "Im Schritt sind es vier einzelne Takte. Hier gehen immer zwei Hufe zusammen." },
            { id: "trab", label: "Trab", correct: true },
            { id: "galopp", label: "Galopp", feedback: "Im Galopp gibt es drei Takte. Hier sind es zwei." },
          ],
          explain: "Richtig! Zwei Takte mit diagonalen Paaren: Trab.",
        },
      ],
      quiz: [
        {
          id: "takte",
          prompt: "Wie viele Takte hat der Trab?",
          options: [
            ok("zwei", "Zwei"),
            no("eins", "Einen", "Einen Takt gibt es bei keiner Gangart."),
            no("vier", "Vier", "Vier Takte hat der Schritt."),
          ],
          explain: "Richtig! Ta-tam, ta-tam – zwei Takte mit diagonalen Beinpaaren.",
        },
        {
          id: "leicht",
          prompt: "Was machst du beim Leichttraben?",
          options: [
            ok("aufab", "Im Takt aufstehen und weich einsitzen"),
            no("stehen", "Die ganze Zeit in den Bügeln stehen", "Das ist kein Leichttraben. Es geht im Wechsel auf und ab."),
            no("zuegel", "Mich am Zügel hochziehen", "Am Zügel ziehen tut dem Pferd weh."),
          ],
          explain: "Genau! Im Takt aufstehen und weich einsitzen – die Hände bleiben ruhig.",
        },
        {
          id: "festhalten",
          prompt: "Woran hältst du dich niemals fest?",
          options: [
            ok("zuegel", "Am Zügel"),
            no("halsriemen", "Am Halsriemen", "Am Halsriemen darfst du dich festhalten – dafür ist er da."),
            no("sattel", "Am Sattel", "Am Sattel darfst du dich festhalten, wenn es wackelt."),
          ],
          explain: "Richtig! Der Zügel führt zum empfindlichen Pferdemaul.",
        },
        {
          id: "extra",
          prompt: "Wann bleibst du beim Leichttraben einmal extra sitzen?",
          options: [
            ok("wechsel", "Beim Richtungswechsel"),
            no("ecke", "In jeder Ecke", "In den Ecken wechselt die Richtung nicht. Nur beim Handwechsel."),
            no("nie", "Nie", "Beim Handwechsel brauchst du es, um auf den neuen Fuß zu kommen."),
          ],
          explain: "Genau! So kommst du auf den richtigen Fuß.",
        },
        {
          id: "paar",
          levels: ["mittel"],
          prompt: "Welche Beine bilden ein diagonales Beinpaar?",
          options: [
            ok("vr-hl", "Vorne rechts und hinten links"),
            no("vl-hl", "Vorne links und hinten links", "Das sind Beine derselben Seite – nicht diagonal."),
            no("vl-vr", "Vorne links und vorne rechts", "Das sind beide Vorderbeine."),
          ],
          explain: "Richtig. Vorne rechts und hinten links bewegen sich im Trab gleichzeitig.",
        },
        {
          id: "aussitzen",
          levels: ["mittel"],
          prompt: "Was ist beim Aussitzen am wichtigsten?",
          options: [
            ok("federn", "Weiches Abfedern im Becken"),
            no("klammern", "Mit den Knien klammern", "Klammern macht steif und schiebt dich aus dem Sattel."),
            no("vorbeugen", "Weit nach vorne beugen", "Vorbeugen bringt dich aus dem Gleichgewicht."),
          ],
          explain: "Genau. Ein weich federndes Becken nimmt die Bewegung des Pferderückens auf.",
        },
      ],
      merksatz: {
        leicht: "Trab: Zweitakt. Leichttraben: auf – ab. Aussitzen: locker!",
        mittel: "Trab ist Zweitakt mit Schwebephase – leichttraben auf dem richtigen Fuß, aussitzen mit weichem Becken.",
      },
    },
  ]),
};
