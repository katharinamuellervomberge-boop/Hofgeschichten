import "server-only";
import { item, letterSpot, no, ok } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 7 – Reiten in der Bahn */
export const welt7: AcademyWorld = {
  id: "w7",
  number: 7,
  slug: "reiten-in-der-bahn",
  title: "Reiten in der Bahn",
  teaser: "Bahnpunkte, Bahnfiguren und Bahnregeln.",
  learns: "Aufbau der 20 × 40-Meter-Bahn mit Bahnpunkten, ganze Bahn und Handwechsel, Zirkel und Volte, Hufschlagfiguren und Bahnregeln für ein sicheres Miteinander.",
  tint: "#DDE3D6",
  cover: scene("ak-bahn-zirkel"),
  badge: { id: "ra-abzeichen-w7", title: "Bahnfiguren-Kenner", motif: "arena" },
  lessons: lessonsOf(7, [
    /* ---------- 1. Die Reitbahn ---------- */
    {
      slug: "die-reitbahn",
      title: "Die Reitbahn",
      speaker: "ben",
      intro: {
        leicht: "Warum hängen in der Reitbahn eigentlich Buchstaben? Ich weiß es!",
        mittel: "Die Reitbahn hat feste Punkte. Wer sie kennt, kann Aufgaben genau reiten und sich mit anderen verständigen.",
      },
      explanation: {
        leicht: [
          "Die Reitbahn ist ein großes Rechteck. Am Rand stehen Buchstaben. Sie zeigen dir, wo du abbiegen oder anhalten sollst.",
          "An den kurzen Seiten stehen A und C. Genau in der Mitte der Bahn ist der Punkt X.",
        ],
        mittel: [
          "Eine häufige Größe ist 20 mal 40 Meter. An den kurzen Seiten stehen die Bahnpunkte A und C, an den langen Seiten K, E, H und F, B, M. Die Buchstaben bei den Ecken stehen 6 Meter von der kurzen Seite entfernt, E und B genau in der Mitte der langen Seiten. Der Mittelpunkt der Bahn heißt X.",
          "Reitet man von A aus links herum, kommen die Buchstaben in dieser Reihenfolge: A – K – E – H – C – M – B – F. Ein Merksatz dafür: „Alle Kinder erzählen heute coole Märchen beim Feuer.“ Große Bahnen von 20 mal 60 Metern haben noch weitere Buchstaben.",
        ],
      },
      illustration: scene("ak-bahn-buchstaben"),
      terms: [
        { term: "Bahnpunkt", meaning: "Ein Buchstabe am Rand der Bahn, an dem eine Figur beginnt oder endet." },
        { term: "X", meaning: "Der Mittelpunkt der Bahn (nicht markiert)." },
        { term: "Bande", meaning: "Die Begrenzung rund um die Reitbahn." },
      ],
      exercise: [
        {
          type: "hotspots",
          id: "ra-w7-l1-buchstaben",
          scene: scene("ak-bahn-buchstaben"),
          prompt: "Finde die Bahnpunkte.",
          mode: "sequence",
          targets: [
            letterSpot("A", "der Buchstabe A", "A steht an der kurzen Seite."),
            letterSpot("C", "der Buchstabe C", "C ist gegenüber von A, an der anderen kurzen Seite."),
            { ...letterSpot("X", "der Punkt X", "X ist genau in der Mitte."), r: 34 },
            letterSpot("E", "der Buchstabe E", "E steht in der Mitte der langen Seite.", ["mittel"]),
            letterSpot("B", "der Buchstabe B", "B liegt gegenüber von E.", ["mittel"]),
            letterSpot("K", "der Buchstabe K", "K steht nahe der Ecke, 6 Meter von A entfernt.", ["mittel"]),
          ],
          missHint: "Die Buchstaben stehen in kleinen Kreisen am Rand.",
        },
      ],
      quiz: [
        {
          id: "form",
          prompt: "Welche Form hat eine Reitbahn meistens?",
          options: [
            ok("rechteck", "Ein Rechteck"),
            no("dreieck", "Ein Dreieck", "In einem Dreieck könnte man nicht gut herumreiten."),
            no("stern", "Ein Stern", "Eine Reitbahn ist meistens ein Rechteck."),
          ],
          explain: "Richtig! Mit zwei langen und zwei kurzen Seiten.",
        },
        {
          id: "mitte",
          prompt: "Wie heißt der Punkt in der Mitte der Bahn?",
          options: [
            ok("x", "X"),
            no("a", "A", "A steht an einer kurzen Seite."),
            no("z", "Z", "Z gibt es in der Reitbahn nicht. Die Mitte heißt X."),
          ],
          explain: "Genau! X ist der Mittelpunkt.",
        },
        {
          id: "wozu",
          prompt: "Wofür sind die Buchstaben da?",
          options: [
            ok("orientierung", "Damit man weiß, wo man abwenden oder anhalten soll"),
            no("abc", "Zum Buchstabieren lernen", "Die Buchstaben sind Orientierungspunkte für Reitaufgaben."),
            no("deko", "Nur zur Dekoration", "Sie sind sehr nützlich: Daran orientieren sich alle Reiter."),
          ],
          explain: "Richtig! So weiß jeder, wo eine Figur beginnt.",
        },
        {
          id: "groesse",
          levels: ["mittel"],
          prompt: "Welche Größe hat eine häufige kleinere Reitbahn?",
          options: [
            ok("2040", "20 mal 40 Meter"),
            no("510", "5 mal 10 Meter", "So klein ist eine Reitbahn nicht – da passt kaum ein Zirkel hinein."),
            no("100", "100 mal 200 Meter", "So groß ist eine Reitbahn nicht. 20 mal 40 Meter ist häufig."),
          ],
          explain: "Richtig. Große Bahnen sind 20 mal 60 Meter.",
        },
        {
          id: "eb",
          levels: ["mittel"],
          prompt: "Welche Buchstaben stehen in der Mitte der langen Seiten?",
          options: [
            ok("eb", "E und B"),
            no("ac", "A und C", "A und C stehen an den kurzen Seiten."),
            no("km", "K und M", "K und M stehen nahe den Ecken."),
          ],
          explain: "Genau. Sie liegen sich gegenüber.",
        },
      ],
      merksatz: {
        leicht: "A und C an den kurzen Seiten, X in der Mitte – die Buchstaben zeigen mir den Weg.",
        mittel: "20 × 40 Meter: A – K – E – H – C – M – B – F, in der Mitte X.",
      },
    },

    /* ---------- 2. Ganze Bahn und Handwechsel ---------- */
    {
      slug: "ganze-bahn-und-handwechsel",
      title: "Ganze Bahn und Handwechsel",
      speaker: "mila",
      intro: {
        leicht: "Immer nur links herum? Nein – beim Handwechsel geht es in die andere Richtung!",
        mittel: "Ganze Bahn und Handwechsel sind die einfachsten Hufschlagfiguren. Es gibt mehrere Wege, die Richtung zu wechseln.",
      },
      explanation: {
        leicht: [
          "Auf der ganzen Bahn reitest du außen am Rand entlang, einmal rundherum. Den Weg am Rand nennt man Hufschlag.",
          "Beim Handwechsel änderst du die Richtung. Zum Beispiel reitest du schräg durch die Bahn von einer Ecke zur gegenüberliegenden.",
        ],
        mittel: [
          "„Ganze Bahn“ heißt: Du reitest auf dem Hufschlag an allen vier Seiten entlang und reitest die Ecken aus, ohne sie abzukürzen. Auf der linken Hand zeigt deine linke Seite zur Bahnmitte – von oben gesehen reitest du gegen den Uhrzeigersinn. Auf der rechten Hand ist es umgekehrt.",
          "Beim Handwechsel wechselst du die Richtung. „Durch die ganze Bahn wechseln“ geht schräg von einem Eckbuchstaben über X zum gegenüberliegenden, zum Beispiel von F über X nach H. „Durch die halbe Bahn wechseln“ führt von einem Eckbuchstaben zur Mitte der gegenüberliegenden langen Seite, zum Beispiel von F nach E. „Durch die Länge der Bahn wechseln“ führt von A über X nach C.",
        ],
      },
      illustration: scene("ak-bahn-handwechsel"),
      terms: [
        { term: "Hufschlag", meaning: "Der Weg direkt an der Bande." },
        { term: "Hand", meaning: "Die Richtung: linke Hand = links herum, rechte Hand = rechts herum." },
        { term: "Handwechsel", meaning: "Eine Figur, mit der man die Richtung wechselt." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w7-l2-figur",
          prompt: { leicht: "Auf welchem Bild wird die Richtung gewechselt?", mittel: "Welches Bild zeigt „durch die ganze Bahn wechseln“?" },
          layout: "pictures",
          options: [
            { id: "ganze", label: "Bild 1", visual: scene("ak-bahn-ganze-bahn"), feedback: "Hier reitet man ganze Bahn, ohne die Richtung zu wechseln." },
            { id: "wechsel", label: "Bild 2", visual: scene("ak-bahn-handwechsel"), correct: true },
            { id: "halbe", label: "Bild 3", visual: scene("ak-bahn-halbe-bahn"), feedback: "Hier wird durch die halbe Bahn gewechselt – nur bis zur Mitte der langen Seite.", levels: ["mittel"] },
            { id: "zirkel", label: "Bild 3", visual: scene("ak-bahn-zirkel"), feedback: "Das ist ein großer Kreis – der Zirkel. Die Richtung bleibt gleich.", levels: ["leicht"] },
          ],
          explain: { leicht: "Richtig! Schräg durch die Bahn – dann geht es andersherum weiter.", mittel: "Richtig! Von F über X nach H: durch die ganze Bahn wechseln." },
        },
      ],
      quiz: [
        {
          id: "ganze",
          prompt: "Was heißt „ganze Bahn“?",
          options: [
            ok("rand", "Außen am Rand einmal rundherum"),
            no("mitte", "Quer durch die Mitte", "Quer durch die Mitte wäre ein Handwechsel oder die Mittellinie."),
            no("seite", "Nur an einer Seite hin und her", "Ganze Bahn heißt: an allen vier Seiten entlang."),
          ],
          explain: "Genau! Auf dem Hufschlag rundherum.",
        },
        {
          id: "wechsel",
          prompt: "Was passiert beim Handwechsel?",
          options: [
            ok("richtung", "Ich wechsle die Richtung"),
            no("pferd", "Ich wechsle das Pferd", "Das Pferd bleibt gleich. Handwechsel heißt: Richtung wechseln."),
            no("zuegelhand", "Ich nehme die Zügel in die andere Hand", "Die Zügel bleiben in beiden Händen. Gemeint ist die Richtung."),
          ],
          explain: "Richtig! Danach geht es andersherum weiter.",
        },
        {
          id: "innen",
          prompt: "Auf der linken Hand ist … innen.",
          options: [
            ok("links", "… meine linke Seite"),
            no("rechts", "… meine rechte Seite", "Auf der linken Hand zeigt die linke Seite zur Mitte."),
            no("niemand", "… gar nichts", "Innen ist immer die Seite zur Bahnmitte."),
          ],
          explain: "Genau! Auf der linken Hand zeigt deine linke Seite zur Bahnmitte.",
        },
        {
          id: "durch-ganze",
          levels: ["mittel"],
          prompt: "Wie reitet man „durch die ganze Bahn wechseln“?",
          options: [
            ok("fxh", "Von F über X nach H"),
            no("fe", "Von F nach E", "Das ist durch die halbe Bahn wechseln."),
            no("axc", "Von A über X nach C", "Das ist durch die Länge der Bahn wechseln."),
          ],
          explain: "Richtig. Schräg von Ecke zu Ecke über X.",
        },
        {
          id: "ecken",
          levels: ["mittel"],
          prompt: "Warum reitet man die Ecken aus?",
          options: [
            ok("biegen", "Damit man nicht abkürzt und das Pferd sich in der Ecke biegt"),
            no("schoen", "Weil Ecken am schönsten sind", "Es geht um genaues Reiten und darum, dass das Pferd sich biegt."),
            no("stehen", "Damit das Pferd in der Ecke stehen bleibt", "Das Pferd soll in der Ecke weitergehen und sich biegen."),
          ],
          explain: "Genau. Ecken ausreiten ist gute Gymnastik.",
        },
      ],
      merksatz: {
        leicht: "Ganze Bahn: außen rundherum. Handwechsel: die Richtung ändern.",
        mittel: "Ganze Bahn auf dem Hufschlag, Ecken ausreiten – gewechselt wird durch die ganze Bahn, die halbe Bahn oder die Länge der Bahn.",
      },
    },

    /* ---------- 3. Zirkel und Volte ---------- */
    {
      slug: "zirkel-und-volte",
      title: "Zirkel und Volte",
      speaker: "lea",
      intro: {
        leicht: "Ein großer Kreis und ein kleiner Kreis – die haben beim Reiten besondere Namen.",
        mittel: "Zirkel und Volte sind Kreise in verschiedenen Größen. Gut geritten sind sie wichtige Übungen für Pferd und Reiter.",
      },
      explanation: {
        leicht: [
          "Ein Zirkel ist ein großer Kreis. Er ist so breit wie die ganze Reitbahn.",
          "Eine Volte ist ein kleiner Kreis. Weil er so klein ist, ist er schwerer zu reiten. Beide Kreise sollen schön rund sein!",
        ],
        mittel: [
          "Der Zirkel ist ein großer Kreis, der in einer 20 × 40-Meter-Bahn einen Durchmesser von 20 Metern hat. Er wird an einer kurzen Seite geritten und berührt den Hufschlag bei A oder C sowie an beiden langen Seiten jeweils 10 Meter von der kurzen Seite entfernt. Auf dem Zirkel ist das Pferd gleichmäßig gebogen, wie die Kreislinie.",
          "Die Volte ist ein kleiner Kreis, meist mit 6, 8 oder 10 Metern Durchmesser. Sie verlangt mehr Biegung und Balance. Anfänger reiten eher größere Volten. Wichtig ist bei beiden Figuren: rund reiten, nicht eckig, und mit dem Blick die Kreislinie vorausverfolgen.",
        ],
      },
      illustration: scene("ak-bahn-zirkel"),
      terms: [
        { term: "Zirkel", meaning: "Großer Kreis über die ganze Bahnbreite (20 m)." },
        { term: "Volte", meaning: "Kleiner Kreis, meist 6 bis 10 m Durchmesser." },
        { term: "Biegung", meaning: "Das Pferd ist vom Kopf bis zum Schweif leicht gebogen, passend zur Kreislinie." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w7-l3-volte",
          prompt: "Welches Bild zeigt eine Volte?",
          layout: "pictures",
          options: [
            { id: "zirkel", label: "Bild 1", visual: scene("ak-bahn-zirkel"), feedback: "Das ist der große Kreis – der Zirkel." },
            { id: "schlange", label: "Bild 2", visual: scene("ak-bahn-schlange"), feedback: "Das sind Schlangenlinien." },
            { id: "volte", label: "Bild 3", visual: scene("ak-bahn-volte"), correct: true },
          ],
          explain: "Richtig! Die Volte ist der kleine Kreis.",
        },
      ],
      quiz: [
        {
          id: "groesser",
          prompt: "Was ist größer?",
          options: [
            ok("zirkel", "Der Zirkel"),
            no("volte", "Die Volte", "Die Volte ist der kleine Kreis."),
            no("gleich", "Beide sind gleich groß", "Nein: Der Zirkel ist groß, die Volte klein."),
          ],
          explain: "Richtig! Der Zirkel ist so breit wie die Bahn.",
        },
        {
          id: "form",
          prompt: "Welche Form hat eine Volte?",
          options: [
            ok("kreis", "Ein kleiner Kreis"),
            no("viereck", "Ein kleines Viereck", "Eine Volte hat keine Ecken – sie ist rund."),
            no("linie", "Eine gerade Linie", "Eine gerade Linie ist keine Volte. Sie ist ein kleiner Kreis."),
          ],
          explain: "Genau! Eine Volte ist ein kleiner, runder Kreis – meist 6 bis 10 Meter groß.",
        },
        {
          id: "rund",
          prompt: "Wie reitest du einen Kreis gut?",
          options: [
            ok("rund", "Rund, mit dem Blick voraus auf der Kreislinie"),
            no("ecken", "Mit kleinen Ecken", "Ecken machen den Kreis eckig. Rund reiten!"),
            no("unten", "Mit Blick nach unten", "Nach unten schauen bringt dich aus der Balance. Schau voraus."),
          ],
          explain: "Richtig! Der Blick führt dich rund herum.",
        },
        {
          id: "durchmesser",
          levels: ["mittel"],
          prompt: "Welchen Durchmesser hat der Zirkel in einer 20 × 40-Meter-Bahn?",
          options: [
            ok("20", "20 Meter"),
            no("40", "40 Meter", "40 Meter ist die Länge der Bahn – so groß kann der Kreis nicht sein."),
            no("6", "6 Meter", "6 Meter ist eine kleine Volte."),
          ],
          explain: "Richtig. Er reicht über die ganze Bahnbreite.",
        },
        {
          id: "schwer",
          levels: ["mittel"],
          prompt: "Warum ist eine kleine Volte schwerer als ein Zirkel?",
          options: [
            ok("biegung", "Das Pferd muss sich stärker biegen und gut ausbalanciert sein"),
            no("schnell", "Weil man in der Volte schneller reitet", "Schneller wird es nicht – die Kurve ist nur enger."),
            no("buchstabe", "Weil es dort keine Buchstaben gibt", "Die Buchstaben helfen beim Anfang – schwierig ist die enge Kurve."),
          ],
          explain: "Genau. Darum reiten Anfänger eher größere Volten.",
        },
      ],
      merksatz: {
        leicht: "Zirkel: großer Kreis. Volte: kleiner Kreis. Immer schön rund!",
        mittel: "Zirkel 20 Meter, Volte meist 6 bis 10 Meter – rund reiten, Blick voraus, Pferd gleichmäßig gebogen.",
      },
    },

    /* ---------- 4. Hufschlagfiguren und Bahnregeln ---------- */
    {
      slug: "hufschlagfiguren-und-bahnregeln",
      title: "Hufschlagfiguren und Bahnregeln",
      speaker: "ben",
      readTogether: true,
      intro: {
        leicht: "Wenn viele Reiter in der Bahn sind, braucht es Regeln – wie im Straßenverkehr!",
        mittel: "Hufschlagfiguren geben Wege vor, Bahnregeln sorgen dafür, dass alle sicher miteinander reiten können.",
      },
      explanation: {
        leicht: [
          "Wenn mehrere Reiter in der Bahn sind, gibt es Regeln. Bevor du hineingehst, rufst du: „Tür frei?“ und wartest auf die Antwort.",
          "Kommt dir jemand entgegen, reitet ihr linke Hand an linke Hand aneinander vorbei. Halte immer genug Abstand zum Pferd vor dir.",
        ],
        mittel: [
          "Hufschlagfiguren sind festgelegte Wege in der Bahn, zum Beispiel ganze Bahn, Zirkel, Volte, Schlangenlinien und die verschiedenen Handwechsel. Neben dem ersten Hufschlag direkt an der Bande gibt es den zweiten Hufschlag etwas weiter innen.",
          "Damit alle sicher reiten, gelten Bahnregeln. Typisch sind: vor dem Betreten oder Verlassen „Tür frei?“ fragen und auf Antwort warten. Bei Begegnungen reitet man linke Hand an linke Hand vorbei – wer auf der linken Hand reitet, behält meist den Hufschlag. Wer Schritt reitet oder hält, macht den Hufschlag für die schnelleren Gangarten frei. Zum Vorderpferd hält man mindestens eine Pferdelänge Abstand. Jeder Stall kann zusätzliche Regeln haben – frag nach!",
        ],
      },
      illustration: scene("ak-bahn-begegnung"),
      terms: [
        { term: "Hufschlagfigur", meaning: "Ein festgelegter Weg in der Reitbahn." },
        { term: "Zweiter Hufschlag", meaning: "Ein Weg etwas innerhalb des ersten Hufschlags." },
        { term: "„Tür frei?“", meaning: "Die Frage vor dem Betreten oder Verlassen der Bahn." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w7-l4-regeln",
          prompt: { leicht: "Welche Bahnregeln stimmen? Tippe alles Richtige an.", mittel: "Welche Bahnregeln stimmen? Wähle alle richtigen." },
          options: [
            { id: "tuer", label: "Vor dem Hineingehen „Tür frei?“ fragen", visual: item("ak-sprechblase"), correct: true },
            { id: "abstand", label: "Abstand zum Vorderpferd halten", visual: item("ak-pause"), correct: true },
            { id: "links", label: "Linke Hand an linke Hand vorbeireiten", visual: item("ak-zuegel"), correct: true },
            { id: "dicht", label: "Ganz dicht auffahren", visual: item("ak-blitz"), feedback: "Zu dicht kann das vordere Pferd erschrecken oder ausschlagen." },
            { id: "einfach", label: "Ohne Fragen durch die Tür reiten", visual: item("ak-stopp"), feedback: "Ohne zu fragen kann es gefährlich werden, wenn gerade jemand an der Tür vorbeireitet.", levels: ["leicht"] },
            { id: "schritt", label: "Im Schritt auf dem Hufschlag bleiben, während andere traben", visual: item("ak-stopp"), feedback: "Wer Schritt reitet, macht den Hufschlag für die schnelleren Gangarten frei.", levels: ["mittel"] },
          ],
          missing: { leicht: "Fast! Es fehlt noch eine richtige Regel.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Regel." },
          explain: "Prima! So reiten alle sicher miteinander.",
        },
      ],
      quiz: [
        {
          id: "tuer",
          prompt: "Was rufst du, bevor du in die Reitbahn gehst?",
          options: [
            ok("tuer", "„Tür frei?“"),
            no("hallo", "„Hallo, Pferd!“", "Freundlich ist schön, aber die anderen Reiter müssen wissen, dass die Tür aufgeht."),
            no("nichts", "Gar nichts", "Ohne Ruf kann jemand erschrecken, der gerade an der Tür vorbeireitet."),
          ],
          explain: "Richtig! Und du wartest auf ein „Ist frei!“.",
        },
        {
          id: "begegnung",
          prompt: "Wie reitet ihr aneinander vorbei, wenn ihr euch begegnet?",
          options: [
            ok("links", "Linke Hand an linke Hand"),
            no("rechts", "Rechte Hand an rechte Hand", "Die Regel lautet: linke Hand an linke Hand."),
            no("eng", "Ganz eng nebeneinander", "Eng vorbei ist gefährlich. Mit Abstand und links an links."),
          ],
          explain: "Genau! So weiß jeder, wohin er ausweichen muss.",
        },
        {
          id: "abstand",
          prompt: "Wie viel Abstand hältst du zum Pferd vor dir?",
          options: [
            ok("laenge", "Mindestens eine Pferdelänge"),
            no("dicht", "Ganz dicht dran", "Zu nah kann das vordere Pferd ausschlagen."),
            no("keinen", "Gar keinen", "Ohne Abstand ist es gefährlich."),
          ],
          explain: "Richtig! Lieber etwas mehr Abstand.",
        },
        {
          id: "zweiter",
          levels: ["mittel"],
          prompt: "Wer macht den ersten Hufschlag frei?",
          options: [
            ok("schritt", "Wer Schritt reitet oder hält"),
            no("galopp", "Wer galoppiert", "Wer galoppiert, braucht den Hufschlag. Langsamere machen Platz."),
            no("niemand", "Niemand, jeder bleibt, wo er ist", "Dann würde es eng. Wer langsamer ist, macht Platz."),
          ],
          explain: "Genau. Langsamere weichen nach innen aus.",
        },
        {
          id: "hufschlag",
          levels: ["mittel"],
          prompt: "Was ist der erste Hufschlag?",
          options: [
            ok("bande", "Der Weg direkt an der Bande"),
            no("mitte", "Die Mittellinie von A nach C", "Die Mittellinie ist etwas anderes."),
            no("spur", "Ein einzelner Hufabdruck im Sand", "Gemeint ist der Weg, auf dem an der Bande entlanggeritten wird."),
          ],
          explain: "Richtig. Der zweite Hufschlag liegt etwas weiter innen.",
        },
      ],
      merksatz: {
        leicht: "„Tür frei?“, linke Hand an linke Hand, Abstand halten.",
        mittel: "Hufschlagfiguren geben Wege vor, Bahnregeln schützen alle: „Tür frei?“, links an links, Abstand, Schritt macht Platz.",
      },
    },

    /* ---------- 5. Bahnfiguren-Quiz ---------- */
    {
      slug: "bahnfiguren-quiz",
      title: "Bahnfiguren-Quiz",
      speaker: "mila",
      intro: {
        leicht: "Zirkel, Volte, Schlangenlinie – kennst du sie alle?",
        mittel: "Bahnpunkte, Figuren und Regeln: Zeit für das Bahnfiguren-Quiz.",
      },
      explanation: {
        leicht: ["Das weißt du schon: Die Bahn hat Buchstaben, in der Mitte ist X. Der Zirkel ist groß, die Volte klein. Und: „Tür frei?“"],
        mittel: [
          "Kurze Wiederholung: In der 20 × 40-Meter-Bahn liegen A – K – E – H – C – M – B – F. Handwechsel gibt es durch die ganze Bahn, die halbe Bahn und die Länge der Bahn. Der Zirkel misst 20 Meter, die Volte meist 6 bis 10 Meter. Bahnregeln sorgen für Sicherheit.",
        ],
      },
      illustration: scene("ak-bahn-schlange"),
      exercise: [
        {
          type: "choice",
          id: "ra-w7-l5-schlange",
          prompt: "Welches Bild zeigt Schlangenlinien?",
          layout: "pictures",
          options: [
            { id: "laenge", label: "Bild 1", visual: scene("ak-bahn-laenge"), feedback: "Hier wird durch die Länge der Bahn gewechselt." },
            { id: "schlange", label: "Bild 2", visual: scene("ak-bahn-schlange"), correct: true },
            { id: "volte", label: "Bild 3", visual: scene("ak-bahn-volte"), feedback: "Das ist eine Volte – ein kleiner Kreis." },
          ],
          explain: "Richtig! Drei Bögen von einer kurzen Seite zur anderen.",
        },
      ],
      quiz: [
        {
          id: "zirkel",
          prompt: "Welches Bild zeigt den Zirkel?",
          layout: "pictures",
          options: [
            no("volte", "Bild 1", "Das ist die kleine Volte.", { visual: scene("ak-bahn-volte") }),
            ok("zirkel", "Bild 2", { visual: scene("ak-bahn-zirkel") }),
            no("ganze", "Bild 3", "Das ist die ganze Bahn.", { visual: scene("ak-bahn-ganze-bahn") }),
          ],
          explain: "Richtig! Der große Kreis über die ganze Bahnbreite.",
        },
        {
          id: "x",
          prompt: "Wo liegt X?",
          options: [
            ok("mitte", "In der Mitte der Bahn"),
            no("ecke", "In einer Ecke", "In den Ecken stehen K, H, M und F in der Nähe – X ist in der Mitte."),
            no("tuer", "An der Tür", "Die Tür ist meist bei A. X liegt in der Mitte."),
          ],
          explain: "Genau! X ist der Mittelpunkt der Bahn – er ist meist nicht markiert.",
        },
        {
          id: "tuer",
          prompt: "Was rufst du, bevor du die Bahn betrittst?",
          options: [
            ok("tuer", "„Tür frei?“"),
            no("los", "„Los geht's!“", "Wichtiger ist die Frage, ob die Tür frei ist."),
            no("nichts", "Nichts", "Fragen ist wichtig, damit niemand erschrickt."),
          ],
          explain: "Richtig! Und erst wenn jemand „frei“ sagt, geht die Tür auf.",
        },
        {
          id: "volte",
          prompt: "Wie heißt ein kleiner Kreis in der Reitbahn?",
          options: [
            ok("volte", "Volte"),
            no("zirkel", "Zirkel", "Der Zirkel ist der große Kreis."),
            no("schlange", "Schlangenlinie", "Schlangenlinien sind Bögen, kein Kreis."),
          ],
          explain: "Genau! Die Volte ist der kleine Kreis, der Zirkel der große.",
        },
        {
          id: "laenge",
          levels: ["mittel"],
          prompt: "Von A über X nach C – wie heißt diese Figur?",
          options: [
            ok("laenge", "Durch die Länge der Bahn wechseln"),
            no("ganze", "Durch die ganze Bahn wechseln", "Durch die ganze Bahn geht schräg von Ecke zu Ecke."),
            no("zirkel", "Zirkel", "Der Zirkel ist ein Kreis."),
          ],
          explain: "Richtig. Auf der Mittellinie von A über X nach C – danach geht es auf der anderen Hand weiter.",
        },
        {
          id: "hufschlag-behalten",
          levels: ["mittel"],
          prompt: "Wer behält bei einer Begegnung meist den Hufschlag?",
          options: [
            ok("links", "Wer auf der linken Hand reitet"),
            no("rechts", "Wer auf der rechten Hand reitet", "Wer auf der rechten Hand reitet, weicht meist nach innen aus."),
            no("groesser", "Wer das größere Pferd hat", "Die Größe des Pferdes spielt keine Rolle."),
          ],
          explain: "Genau. Das ergibt sich aus „linke Hand an linke Hand“.",
        },
      ],
      merksatz: {
        leicht: "Ich kenne Zirkel, Volte, Schlangenlinie – und die Bahnregeln!",
        mittel: "Bahnfiguren und Bahnregeln: genau reiten, vorausschauen, Rücksicht nehmen.",
      },
    },
  ]),
};
