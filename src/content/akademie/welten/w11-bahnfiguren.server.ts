import "server-only";
import { card, item, letterSpot, no, ok, tag } from "../build";
import { lessonsOf, reviewed2026_10_29, scene, type AcademyWorld } from "../types";

/** Welt 11 – Alle Bahnfiguren und Bahnregeln (Ausbau 29.10.2026) */
export const welt11: AcademyWorld = {
  id: "w11",
  number: 11,
  slug: "alle-bahnfiguren",
  title: "Alle Bahnfiguren",
  teaser: "Hufschläge, Handwechsel, Zirkel, Volten, Schlangenlinien und Bahnregeln.",
  learns: "Hufschläge und Ecken, alle Handwechsel (ganze/halbe Bahn, Länge, Zirkel, Kehrtvolte), Zirkelfiguren, Volten und Acht, Schlangenlinien durch die ganze Bahn und an der langen Seite, ausführliche Bahnregeln, Abteilungsreiten und Kommandos.",
  tint: "#DDE3D6",
  cover: scene("ak-bahn-schlange-4"),
  badge: { id: "ra-abzeichen-w11", title: "Bahnfiguren-Meister", motif: "arena" },
  lessons: lessonsOf(11, [
    /* ---------- 1. Hufschläge und Ecken ---------- */
    {
      slug: "hufschlaege-und-ecken",
      title: "Hufschläge und Ecken",
      speaker: "ben",
      intro: {
        leicht: "Wo genau reite ich in der Bahn? Und wie komme ich gut um die Ecke?",
        mittel: "Hufschlaglinien und gut gerittene Ecken sind die Grundlage jeder Bahnfigur – und die Ecken sind eine kleine Übung für sich.",
      },
      explanation: {
        leicht: [
          "Der Weg direkt an der Bande heißt erster Hufschlag. Etwas weiter innen ist der zweite Hufschlag. Den nimmst du zum Beispiel, wenn du jemanden überholst.",
          "In die Ecke reitest du wie in einen kleinen Bogen. Du schaust in die Richtung, in die du reiten willst, und dein Pferd biegt sich ein bisschen.",
        ],
        mittel: [
          "Der erste Hufschlag verläuft direkt an der Bande, der zweite Hufschlag etwas weiter innen. Die Mittellinie führt von A über X nach C, die Viertellinien liegen in der Mitte zwischen Mittellinie und langer Seite.",
          "Eine Ecke wird als Viertelvolte geritten: Du lenkst mit Blick und Gewicht in die Ecke, der innere Schenkel am Gurt sorgt für Biegung und Vorwärts, der äußere Schenkel liegt verwahrend hinter dem Gurt, der innere Zügel stellt, der äußere begrenzt. Je weiter die Ausbildung ist, desto tiefer kann man in die Ecke hineinreiten – Anfänger reiten sie etwas runder.",
          "Gut gerittene Ecken sind mehr als „um die Kurve kommen“: Das Pferd biegt sich, tritt mit dem inneren Hinterbein vermehrt unter und kommt aufmerksam auf die nächste Seite. Kürzt du Ecken ab, verliert das Pferd Biegung und Gleichgewicht.",
        ],
      },
      illustration: scene("ak-bahn-ecken"),
      terms: [
        { term: "Erster Hufschlag", meaning: "Die Linie direkt an der Bande." },
        { term: "Viertelvolte", meaning: "Ein Viertel einer kleinen Volte – so wird eine Ecke geritten." },
        { term: "Mittellinie", meaning: "Gerade Linie von A über X nach C." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w11-l1-ecke",
          prompt: { leicht: "Wie reitest du in die Ecke?", mittel: "Welche Hilfen gehören zum Reiten einer Ecke?" },
          visual: scene("ak-bahn-ecken"),
          options: [
            { id: "bogen", label: "Als kleinen Bogen (Viertelvolte), Blick in die neue Richtung", correct: true },
            { id: "abkuerzen", label: "Schräg abkürzen", feedback: "Abgekürzte Ecken nehmen dem Pferd Biegung und Gleichgewicht." },
            { id: "zuegel", label: "Nur am inneren Zügel ziehen", feedback: "Mit Zügelziehen allein kippt das Pferd über die Schulter." },
          ],
          explain: "Richtig! Die Ecke ist eine kleine Viertelvolte mit Biegung.",
        },
      ],
      quiz: [
        {
          id: "erster",
          prompt: "Wo verläuft der erste Hufschlag?",
          options: [
            ok("bande", "Direkt an der Bande"),
            no("mitte", "In der Mitte der Bahn", "Das ist die Mittellinie."),
            no("ecke", "Nur in den Ecken", "Er verläuft rundherum an der Bande."),
          ],
          explain: "Genau. Der zweite Hufschlag liegt etwas weiter innen.",
        },
        {
          id: "abkuerzen",
          prompt: "Warum kürzt du Ecken nicht ab?",
          options: [
            ok("biegung", "Weil das Pferd sonst Biegung und Gleichgewicht verliert"),
            no("verboten", "Weil die Ecke sonst beleidigt ist", "Es geht um die Gymnastik für das Pferd."),
            no("egal", "Das ist egal", "Gut gerittene Ecken sind wichtig für Biegung und Balance."),
          ],
          explain: "Richtig! Die Ecke ist eine kleine Biegeübung.",
        },
        {
          id: "blick",
          prompt: "Wohin schaust du in der Ecke?",
          options: [
            ok("neu", "In die neue Richtung"),
            no("boden", "Auf den Boden", "Wer nach unten schaut, kippt nach vorn."),
            no("bande", "Geradeaus gegen die Bande", "Schau dorthin, wo du hinreiten willst."),
          ],
          explain: "Genau! Dein Blick lenkt dein Gewicht mit.",
        },
        {
          id: "viertel",
          levels: ["mittel"],
          prompt: "Als welche Figur wird eine Ecke geritten?",
          options: [
            ok("viertelvolte", "Als Viertelvolte"),
            no("zirkel", "Als halber Zirkel", "Ein halber Zirkel ist viel zu groß für eine Ecke."),
            no("gerade", "Als scharfer Winkel", "Pferde können keine scharfen Winkel laufen."),
          ],
          explain: "Richtig. Ein Viertel einer kleinen Volte – je nach Ausbildungsstand tiefer oder runder.",
        },
        {
          id: "aussen",
          levels: ["mittel"],
          prompt: "Was macht der äußere Schenkel in der Ecke?",
          options: [
            ok("verwahren", "Er liegt verwahrend hinter dem Gurt"),
            no("ziehen", "Er zieht das Pferd herum", "Ein Schenkel zieht nicht – er treibt oder verwahrt."),
            no("weg", "Er wird vom Pferd weggenommen", "Ohne äußeren Schenkel fällt die Hinterhand heraus."),
          ],
          explain: "Genau. Er verhindert, dass die Hinterhand nach außen ausweicht.",
        },
      ],
      merksatz: {
        leicht: "Erster Hufschlag an der Bande – und Ecken reite ich als kleinen Bogen.",
        mittel: "Ecke = Viertelvolte: Blick und Gewicht innen, innen treiben, außen verwahren, innen stellen, außen begrenzen.",
      },
    },

    /* ---------- 2. Alle Handwechsel ---------- */
    {
      slug: "alle-handwechsel",
      title: "Alle Handwechsel",
      speaker: "mila",
      intro: {
        leicht: "Es gibt viele Wege, die Richtung zu wechseln. Kennst du sie alle?",
        mittel: "Handwechsel gibt es in vielen Varianten. Jede hat einen festen Anfangs- und Endpunkt – das musst du für Abteilungsreiten und Aufgaben genau kennen.",
      },
      explanation: {
        leicht: [
          "Durch die ganze Bahn wechseln: schräg von Ecke zu Ecke über X. Durch die halbe Bahn wechseln: von der Ecke zur Mitte der anderen langen Seite.",
          "Durch die Länge der Bahn wechseln: von A über X nach C. Und bei der Kehrtvolte reitest du einen halben Kreis und dann schräg zurück an die Bande.",
        ],
        mittel: [
          "Durch die ganze Bahn wechseln: vom ersten Wechselpunkt (Eckbuchstabe) über X zum diagonal gegenüberliegenden Eckbuchstaben, z. B. von M über X nach K. Durch die halbe Bahn wechseln: vom Eckbuchstaben zur Mitte der gegenüberliegenden langen Seite, z. B. von H nach B. Durch die Länge der Bahn wechseln: auf der Mittellinie von A über X nach C.",
          "Kehrtvolte: aus der Bewegung eine halbe Volte (6–10 m) nach innen reiten und in schräger Linie auf den Hufschlag zurückkehren. „Aus der Ecke kehrt“ funktioniert ähnlich, beginnt aber direkt nach der Ecke. Außerdem wechselt man durch den Zirkel und aus dem Zirkel (nächste Lektion) oder mit einer Schlangenlinie mit ungerader Bogenzahl.",
          "Bei jedem Handwechsel ändert sich die Stellung und Biegung des Pferdes. Ein paar Pferdelängen vor dem neuen Hufschlag stellst du das Pferd um: neuer innerer Zügel stellt, neuer innerer Schenkel am Gurt, neuer äußerer Schenkel verwahrend – und dein Gewicht wechselt mit nach innen.",
        ],
      },
      illustration: scene("ak-bahn-kehrtvolte"),
      terms: [
        { term: "Wechselpunkt", meaning: "Eckbuchstabe, an dem ein diagonaler Handwechsel beginnt oder endet." },
        { term: "Kehrtvolte", meaning: "Halbe Volte mit schräger Rückkehr auf den Hufschlag – ein Handwechsel." },
        { term: "Umstellen", meaning: "Stellung und Biegung auf die neue Hand wechseln." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w11-l2-wechsel",
          prompt: { leicht: "Welcher Weg gehört zu welchem Handwechsel?", mittel: "Ordne den Weg dem richtigen Handwechsel zu." },
          targets: [
            { id: "ganze", label: "Durch die ganze Bahn" },
            { id: "halbe", label: "Durch die halbe Bahn" },
            { id: "laenge", label: "Durch die Länge der Bahn" },
          ],
          items: [
            card("mxk", "M – X – K", tag("M → X → K"), "ganze", "Richtig – diagonal von Ecke zu Ecke über X.", "Diagonal über X ist durch die ganze Bahn."),
            card("hb", "H – B", tag("H → B"), "halbe", "Genau, von der Ecke zur Mitte der anderen Seite.", "Von der Ecke zur Mitte ist durch die halbe Bahn."),
            card("axc", "A – X – C", tag("A → X → C"), "laenge", "Richtig, auf der Mittellinie.", "Von A über X nach C ist durch die Länge."),
          ],
        },
        {
          type: "hotspots",
          id: "ra-w11-l2-punkte",
          levels: ["mittel"],
          scene: scene("ak-bahn-buchstaben"),
          prompt: "Durch die ganze Bahn wechseln von M nach K: Tippe die Punkte in der richtigen Reihenfolge.",
          mode: "sequence",
          targets: [
            letterSpot("M", "den Buchstaben M", "Los geht es am Wechselpunkt M."),
            { ...letterSpot("X", "den Punkt X", "Über X geht die Diagonale."), r: 34 },
            letterSpot("K", "den Buchstaben K", "Bei K bist du wieder auf dem Hufschlag – auf der neuen Hand."),
          ],
          missHint: "Die Buchstaben stehen in Kreisen am Rand, X liegt in der Mitte.",
        },
      ],
      quiz: [
        {
          id: "ganze",
          prompt: "Wie reitest du „durch die ganze Bahn wechseln“?",
          options: [
            ok("diagonal", "Schräg von Ecke zu Ecke über X"),
            no("mitte", "Von A über X nach C", "Das ist durch die Länge der Bahn."),
            no("kreis", "Im großen Kreis", "Das ist der Zirkel."),
          ],
          explain: "Richtig! Diagonal über den Mittelpunkt X.",
        },
        {
          id: "laenge",
          prompt: "Was heißt „durch die Länge der Bahn wechseln“?",
          options: [
            ok("axc", "Auf der Mittellinie von A über X nach C"),
            no("bande", "An der langen Bande entlang", "Das wäre ganze Bahn, kein Handwechsel."),
            no("eb", "Von E nach B", "Das ist quer, nicht längs."),
          ],
          explain: "Genau. Danach reitest du auf der anderen Hand.",
        },
        {
          id: "kehrtvolte",
          prompt: "Was ist eine Kehrtvolte?",
          options: [
            ok("halb", "Eine halbe Volte und schräg zurück an die Bande"),
            no("ganz", "Eine ganze Volte", "Eine ganze Volte endet auf derselben Hand."),
            no("halt", "Anhalten und umdrehen", "Bei der Kehrtvolte bleibt das Pferd in Bewegung."),
          ],
          explain: "Richtig – und schon bist du auf der anderen Hand.",
        },
        {
          id: "halbe",
          levels: ["mittel"],
          prompt: "Wohin führt „durch die halbe Bahn wechseln“ ab H?",
          options: [
            ok("b", "Nach B"),
            no("f", "Nach F", "H nach F wäre die ganze Diagonale – über X."),
            no("a", "Nach A", "A liegt an der kurzen Seite."),
          ],
          explain: "Genau: vom Eckbuchstaben zur Mitte der gegenüberliegenden langen Seite.",
        },
        {
          id: "umstellen",
          levels: ["mittel"],
          prompt: "Was ändert sich beim Handwechsel an deinen Hilfen?",
          options: [
            ok("innen-aussen", "Innen und außen tauschen: neue Stellung, neue Schenkellage, Gewicht neu innen"),
            no("nichts", "Gar nichts", "Mit der neuen Hand werden die Hilfen umgestellt."),
            no("zuegel", "Nur die Zügellänge", "Stellung, Schenkel und Gewicht wechseln mit."),
          ],
          explain: "Richtig. Das Umstellen beginnt einige Pferdelängen vor dem neuen Hufschlag.",
        },
      ],
      merksatz: {
        leicht: "Ganze Bahn: über X. Halbe Bahn: zur Mitte. Länge: A–X–C. Kehrtvolte: halber Kreis zurück.",
        mittel: "Jeder Handwechsel hat feste Punkte – und vor dem neuen Hufschlag wird umgestellt: Stellung, Schenkel, Gewicht.",
      },
    },

    /* ---------- 3. Zirkelfiguren ---------- */
    {
      slug: "zirkelfiguren",
      title: "Zirkelfiguren",
      speaker: "lea",
      intro: {
        leicht: "Auf dem Zirkel kann man noch viel mehr machen als im Kreis reiten!",
        mittel: "Der Zirkel ist die Grundfigur der Biegearbeit. Durch den Zirkel wechseln, aus dem Zirkel wechseln und Zirkel verkleinern sind klassische Übungen.",
      },
      explanation: {
        leicht: [
          "Durch den Zirkel wechseln: Du reitest eine S-Kurve durch die Mitte des Zirkels. Danach bist du auf der anderen Hand.",
          "Aus dem Zirkel wechseln: Am Punkt X wechselst du in den anderen Zirkel – wie bei einer großen Acht. Beim Verkleinern wird dein Kreis langsam immer kleiner.",
        ],
        mittel: [
          "Durch den Zirkel wechseln: Am Zirkelpunkt an der kurzen Seite wendest du ab und reitest in einer S-förmigen Linie aus zwei gleich großen halben Kreisen durch den Zirkelmittelpunkt zum gegenüberliegenden Zirkelpunkt. In der Mitte stellst du das Pferd um.",
          "Aus dem Zirkel wechseln: In der 20 × 40-Bahn berühren sich die beiden Zirkel bei X. Dort wechselst du von einem Zirkel in den anderen und stellst das Pferd auf die neue Hand um – es entsteht eine große Acht.",
          "Zirkel verkleinern und vergrößern: Du reitest den Zirkel spiralförmig enger, bis etwa auf Voltengröße, und vergrößerst ihn wieder. Beim Vergrößern treibt der innere Schenkel vorwärts-seitwärts, das Pferd tritt nach außen an den äußeren Zügel heran – eine Vorübung für Seitengänge.",
        ],
      },
      illustration: scene("ak-bahn-zirkel-wechseln"),
      terms: [
        { term: "Zirkelpunkt", meaning: "Punkt, an dem der Zirkel die Bande berührt." },
        { term: "Zirkel verkleinern", meaning: "Den Kreis spiralförmig enger reiten." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w11-l3-bild",
          prompt: { leicht: "Welches Bild zeigt „durch den Zirkel wechseln“?", mittel: "Welche Skizze zeigt „durch den Zirkel wechseln“?" },
          layout: "pictures",
          options: [
            { id: "durch", label: "S-Kurve durch die Zirkelmitte", visual: scene("ak-bahn-zirkel-wechseln"), correct: true },
            { id: "aus", label: "Große Acht über X", visual: scene("ak-bahn-aus-dem-zirkel"), feedback: "Das ist „aus dem Zirkel wechseln“ – der Wechsel passiert bei X." },
            { id: "verkleinern", label: "Spirale nach innen", visual: scene("ak-bahn-zirkel-verkleinern"), feedback: "Das ist „Zirkel verkleinern“ – ohne Handwechsel." },
          ],
          explain: "Richtig! Zwei halbe Kreise bilden ein S durch die Mitte.",
        },
      ],
      quiz: [
        {
          id: "durch",
          prompt: "Wie sieht „durch den Zirkel wechseln“ aus?",
          options: [
            ok("s", "Wie ein S durch die Mitte des Zirkels"),
            no("gerade", "Wie eine gerade Linie", "Es sind zwei halbe Kreise – ein S."),
            no("klein", "Wie ein ganz kleiner Kreis", "Das wäre eine Volte."),
          ],
          explain: "Genau! In der Mitte des S wechselst du die Hand.",
        },
        {
          id: "aus",
          prompt: "Wo wechselst du beim „aus dem Zirkel wechseln“ in den anderen Zirkel?",
          options: [
            ok("x", "Bei X"),
            no("a", "Bei A", "Bei A ist die kurze Seite – der Wechsel ist bei X."),
            no("ecke", "In der Ecke", "Die Zirkel berühren sich bei X."),
          ],
          explain: "Richtig! Dort berühren sich die beiden Zirkel.",
        },
        {
          id: "verkleinern",
          prompt: "Was passiert beim Zirkel verkleinern?",
          options: [
            ok("enger", "Der Kreis wird langsam immer enger"),
            no("schneller", "Das Pferd wird immer schneller", "Das Tempo bleibt gleich – der Kreis wird kleiner."),
            no("gerade", "Du reitest gerade", "Es bleibt eine gebogene Linie."),
          ],
          explain: "Genau – und danach wird er wieder vergrößert.",
        },
        {
          id: "vergroessern",
          levels: ["mittel"],
          prompt: "Welche Hilfe führt das Pferd beim Vergrößern nach außen?",
          options: [
            ok("innen", "Der innere Schenkel treibt vorwärts-seitwärts an den äußeren Zügel"),
            no("aussen-zug", "Der äußere Zügel zieht nach außen", "Zügelziehen allein verbiegt das Pferd nur."),
            no("gewicht-aussen", "Du lehnst dich stark nach außen", "Starkes Lehnen bringt das Pferd aus dem Gleichgewicht."),
          ],
          explain: "Richtig. Das ist eine Vorübung für Schenkelweichen und Seitengänge.",
        },
        {
          id: "zwei",
          levels: ["mittel"],
          prompt: "Woraus besteht die Linie beim „durch den Zirkel wechseln“?",
          options: [
            ok("zwei-halbe", "Aus zwei gleich großen halben Kreisen"),
            no("ganze", "Aus einem ganzen Kreis", "Es sind zwei Hälften – dazwischen wird umgestellt."),
            no("diagonale", "Aus einer Diagonale", "Gerade Linien gibt es hier nicht."),
          ],
          explain: "Genau. In der Mitte, beim Zirkelmittelpunkt, wird umgestellt.",
        },
      ],
      merksatz: {
        leicht: "Durch den Zirkel: S durch die Mitte. Aus dem Zirkel: bei X in den anderen.",
        mittel: "Durch den Zirkel = zwei halbe Kreise durch die Mitte; aus dem Zirkel = Wechsel bei X; verkleinern und vergrößern = Biegung und Seitwärts-Vorübung.",
      },
    },

    /* ---------- 4. Volten und Achten ---------- */
    {
      slug: "volten-und-achten",
      title: "Volten und Achten",
      speaker: "ben",
      intro: {
        leicht: "Eine Volte ist ein kleiner Kreis. Zwei Volten zusammen ergeben eine Acht!",
        mittel: "Volten verlangen viel Biegung und Gleichgewicht. Achten kombinieren zwei Kreise mit einem Handwechsel – eine schöne Übung für Umstellen und Geschmeidigkeit.",
      },
      explanation: {
        leicht: [
          "Eine Volte ist ein kleiner, runder Kreis. Am Ende kommst du genau dort wieder an, wo du angefangen hast.",
          "Bei der Acht reitest du zwei Kreise hintereinander. In der Mitte änderst du die Richtung.",
        ],
        mittel: [
          "Die Volte ist ein Kreis mit 6, 8 oder 10 Metern Durchmesser. Je kleiner sie ist, desto mehr Biegung und Versammlung braucht das Pferd – Anfänger reiten meist 10-Meter-Volten. Die Volte beginnt und endet am selben Punkt, häufig an einem Bahnpunkt.",
          "Hilfen: Blick voraus auf die Linie, Gewicht innen, innerer Schenkel am Gurt als Biegungsträger und für Vorwärts, äußerer Schenkel verwahrend, innerer Zügel stellt, äußerer Zügel begrenzt und regelt das Tempo. Fehler sind eiförmige oder eckige Volten und Pferde, die über die äußere Schulter wegdriften.",
          "Bei der Acht reihst du zwei Volten (oder Zirkel) aneinander. Am Berührungspunkt reitest du das Pferd eine Pferdelänge gerade und stellst um – Stellung, Biegung und Gewicht wechseln auf die neue Seite.",
        ],
      },
      illustration: scene("ak-bahn-acht"),
      terms: [
        { term: "Volte", meaning: "Kleiner Kreis mit 6, 8 oder 10 m Durchmesser." },
        { term: "Biegungsträger", meaning: "Der innere Schenkel, um den sich das Pferd biegt." },
        { term: "Acht", meaning: "Zwei Kreise mit Handwechsel in der Mitte." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w11-l4-volte",
          prompt: { leicht: "Was hilft für eine schöne runde Volte? Tippe alles Richtige an.", mittel: "Welche Hilfen gehören zur Volte?" },
          options: [
            { id: "blick", label: "Voraus auf die Linie schauen", visual: item("ak-auge"), correct: true },
            { id: "gewicht", label: "Gewicht etwas nach innen", visual: item("ak-gewicht"), correct: true },
            { id: "schenkel", label: "Innerer Schenkel am Gurt", visual: item("ak-schenkel"), correct: true },
            { id: "ziehen", label: "Fest am inneren Zügel ziehen", visual: item("ak-blitz"), feedback: "Ziehen allein lässt das Pferd über die Schulter wegdriften." },
            { id: "boden", label: "Auf den Boden schauen", visual: item("ak-stopp"), feedback: "Dann wird die Volte eckig – schau voraus." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Es fehlt noch mindestens eine richtige Hilfe." },
          explain: "Prima! Blick, Gewicht und innerer Schenkel machen die Volte rund.",
        },
      ],
      quiz: [
        {
          id: "groesse",
          prompt: "Wie groß ist eine Volte?",
          options: [
            ok("klein", "Ein kleiner Kreis, zum Beispiel 10 Meter"),
            no("zirkel", "So groß wie der Zirkel", "Der Zirkel ist 20 Meter – die Volte ist kleiner."),
            no("riesig", "So groß wie die ganze Bahn", "Das wäre ganze Bahn."),
          ],
          explain: "Richtig! Volten haben 6, 8 oder 10 Meter Durchmesser.",
        },
        {
          id: "ende",
          prompt: "Wo endet eine Volte?",
          options: [
            ok("start", "Dort, wo sie angefangen hat"),
            no("andere", "Auf der anderen Seite der Bahn", "Eine Volte ist ein geschlossener Kreis."),
            no("mitte", "Immer bei X", "Sie endet am Startpunkt."),
          ],
          explain: "Genau. Eine Volte ist ein ganzer Kreis.",
        },
        {
          id: "acht",
          prompt: "Was passiert in der Mitte einer Acht?",
          options: [
            ok("wechsel", "Du wechselst die Richtung"),
            no("halt", "Du hältst an", "Du reitest weiter und wechselst die Hand."),
            no("galopp", "Du galoppierst an", "In der Mitte wird die Hand gewechselt."),
          ],
          explain: "Richtig – so entstehen zwei Kreise in entgegengesetzter Richtung.",
        },
        {
          id: "klein",
          levels: ["mittel"],
          prompt: "Warum reiten Anfänger eher 10-Meter- statt 6-Meter-Volten?",
          options: [
            ok("biegung", "Kleine Volten verlangen mehr Biegung und Versammlung"),
            no("verboten", "6-Meter-Volten sind verboten", "Sie gehören in höhere Klassen."),
            no("langsam", "Kleine Volten sind langsamer", "Es geht um Biegung und Gleichgewicht."),
          ],
          explain: "Genau. Die Voltengröße passt man dem Ausbildungsstand an.",
        },
        {
          id: "schulter",
          levels: ["mittel"],
          prompt: "Das Pferd driftet in der Volte über die äußere Schulter weg. Was hilft?",
          options: [
            ok("aussen", "Äußerer Zügel und äußerer Schenkel begrenzen besser"),
            no("innen-mehr", "Noch mehr am inneren Zügel ziehen", "Das verstärkt das Wegdriften."),
            no("schneller", "Schneller reiten", "Tempo löst das Problem nicht."),
          ],
          explain: "Richtig. Die äußeren Hilfen halten das Pferd auf der Linie.",
        },
      ],
      merksatz: {
        leicht: "Volte: kleiner runder Kreis. Acht: zwei Kreise mit Richtungswechsel.",
        mittel: "Volte = 6, 8 oder 10 m, innen biegen, außen begrenzen; Acht = gerade werden, umstellen, neu biegen.",
      },
    },

    /* ---------- 5. Schlangenlinien ---------- */
    {
      slug: "schlangenlinien",
      title: "Schlangenlinien",
      speaker: "mila",
      intro: {
        leicht: "Schlangenlinien sind wie Wellen im Sand. Dein Pferd biegt sich mal links und mal rechts.",
        mittel: "Schlangenlinien verbinden Biegung, Umstellen und gerade Strecken. Es gibt sie durch die ganze Bahn und an der langen Seite.",
      },
      explanation: {
        leicht: [
          "Bei der Schlangenlinie durch die ganze Bahn reitest du große Bögen von einer kurzen Seite zur anderen. Jeder Bogen berührt die lange Seite.",
          "An der langen Seite gibt es die einfache Schlangenlinie mit einem flachen Bogen und die doppelte mit zwei kleinen Bögen.",
        ],
        mittel: [
          "Schlangenlinie durch die ganze Bahn: Sie beginnt in der Mitte einer kurzen Seite und endet in der Mitte der anderen. Die Bögen sind gleich groß und berühren abwechselnd die langen Seiten. Bei einer ungeraden Bogenzahl (z. B. drei) endet sie auf der anderen Hand, bei einer geraden (z. B. vier) auf derselben. Die Mittellinie wird jeweils gerade überquert, dabei wird umgestellt.",
          "Einfache Schlangenlinie an der langen Seite: Vom ersten Eckbuchstaben ein flacher Bogen nach innen, am tiefsten Punkt bei E bzw. B etwa 5 Meter von der Bande entfernt, zurück zum zweiten Eckbuchstaben. Doppelte Schlangenlinie: zwei flachere Bögen an derselben langen Seite.",
          "An der langen Seite wird das Pferd zweimal umgestellt: erst vom Hufschlag weg, dann wieder zur Bande hin. Die Bögen sollen gleichmäßig und flüssig sein – das Pferd darf nicht hektisch oder schief werden.",
        ],
      },
      illustration: scene("ak-bahn-schlange-4"),
      terms: [
        { term: "Bogen", meaning: "Ein gebogener Teil der Schlangenlinie." },
        { term: "Umstellen", meaning: "Stellung und Biegung auf die andere Seite wechseln." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w11-l5-bild",
          prompt: { leicht: "Welches Bild zeigt die einfache Schlangenlinie an der langen Seite?", mittel: "Welche Skizze zeigt die einfache Schlangenlinie an der langen Seite?" },
          layout: "pictures",
          options: [
            { id: "einfach", label: "Ein flacher Bogen", visual: scene("ak-bahn-schlange-einfach"), correct: true },
            { id: "doppelt", label: "Zwei kleine Bögen", visual: scene("ak-bahn-schlange-doppelt"), feedback: "Das ist die doppelte Schlangenlinie." },
            { id: "ganze", label: "Bögen durch die ganze Bahn", visual: scene("ak-bahn-schlange-4"), feedback: "Das ist die Schlangenlinie durch die ganze Bahn." },
          ],
          explain: "Richtig! Ein flacher Bogen bis etwa 5 Meter in die Bahn hinein.",
        },
      ],
      quiz: [
        {
          id: "start",
          prompt: "Wo beginnt die Schlangenlinie durch die ganze Bahn?",
          options: [
            ok("kurz", "In der Mitte einer kurzen Seite"),
            no("ecke", "In einer Ecke", "Sie beginnt bei A oder C – in der Mitte der kurzen Seite."),
            no("x", "Bei X", "X liegt in der Mitte der Bahn."),
          ],
          explain: "Genau – und sie endet in der Mitte der anderen kurzen Seite.",
        },
        {
          id: "boegen",
          prompt: "Wie sollen die Bögen sein?",
          options: [
            ok("gleich", "Gleich groß und rund"),
            no("verschieden", "Ganz verschieden groß", "Schön sind gleich große Bögen."),
            no("eckig", "Eckig", "Eine Schlangenlinie ist rund und flüssig."),
          ],
          explain: "Richtig! Gleichmäßige Bögen sehen schön aus und helfen dem Pferd.",
        },
        {
          id: "doppelt",
          prompt: "Was ist die doppelte Schlangenlinie?",
          options: [
            ok("zwei", "Zwei kleine Bögen an einer langen Seite"),
            no("zweimal", "Zweimal die ganze Bahn", "Sie liegt nur an einer langen Seite."),
            no("zwei-pferde", "Zwei Pferde nebeneinander", "Es geht um die Linie, nicht um zwei Pferde."),
          ],
          explain: "Genau – flacher als die einfache Schlangenlinie.",
        },
        {
          id: "ungerade",
          levels: ["mittel"],
          prompt: "Eine Schlangenlinie durch die ganze Bahn hat drei Bögen. Auf welcher Hand endest du?",
          options: [
            ok("andere", "Auf der anderen Hand"),
            no("gleiche", "Auf derselben Hand", "Bei gerader Bogenzahl wäre das so – bei drei Bögen wechselst du."),
            no("x", "Du endest bei X", "Sie endet an der kurzen Seite."),
          ],
          explain: "Richtig. Ungerade Bogenzahl = Handwechsel, gerade = gleiche Hand.",
        },
        {
          id: "tiefe",
          levels: ["mittel"],
          prompt: "Wie weit führt die einfache Schlangenlinie an der langen Seite in der 20 × 40-Bahn in die Bahn hinein?",
          options: [
            ok("fuenf", "Bis etwa 5 Meter von der Bande"),
            no("zehn", "Bis zur Mittellinie", "Das wäre viel zu tief."),
            no("eins", "Nur einen halben Meter", "So flach wäre kaum ein Bogen zu sehen."),
          ],
          explain: "Genau – der tiefste Punkt liegt bei E bzw. B.",
        },
      ],
      merksatz: {
        leicht: "Gleich große, runde Bögen – und dein Pferd biegt sich mal links, mal rechts.",
        mittel: "Durch die ganze Bahn: ungerade Bögen = Handwechsel. An der langen Seite: einfach bis ca. 5 m, doppelt mit zwei flachen Bögen.",
      },
    },

    /* ---------- 6. Bahnregeln ---------- */
    {
      slug: "bahnregeln",
      title: "Die Bahnregeln",
      speaker: "lea",
      intro: {
        leicht: "Wenn viele in einer Bahn reiten, brauchen alle Regeln – wie im Straßenverkehr!",
        mittel: "Die Bahnregeln sorgen dafür, dass mehrere Reiter gleichzeitig sicher in einer Bahn reiten können. Wer sie kennt, reitet entspannter.",
      },
      explanation: {
        leicht: [
          "Bevor du die Bahn betrittst oder verlässt, rufst du „Tür frei?“ und wartest auf die Antwort. Begegnen sich zwei Reiter, reiten sie links aneinander vorbei.",
          "Wer Schritt reitet oder anhält, macht den Hufschlag frei. Halte immer genug Abstand – mindestens eine Pferdelänge.",
        ],
        mittel: [
          "Betreten und Verlassen: „Tür frei?“ fragen und erst nach der Antwort „Ist frei!“ hineingehen oder hinausreiten. Die Tür wird sofort wieder geschlossen. Auf- und Absitzen, Nachgurten oder Bügel einstellen erfolgen nicht auf dem Hufschlag, sondern in der Bahnmitte.",
          "Vorfahrt und Ausweichen: Kommen sich zwei Reiter auf verschiedenen Händen entgegen, wird links an links vorbeigeritten – der Reiter auf der linken Hand behält dabei den ersten Hufschlag. Wer im Schritt reitet oder hält, gibt den ersten Hufschlag frei für Reiter in schnelleren Gangarten. Ganze Bahn hat Vorrang vor Figuren im Inneren der Bahn.",
          "Abstand und Rücksicht: Nach vorn mindestens eine Pferdelänge, seitlich ausreichend Platz. Überholt wird innen. Absprachen gelten für Longieren oder Springen in der Bahn. Andere werden nicht geschnitten, Hunde gehören nicht in die Bahn, und nach dem Reiten werden Pferdeäpfel entfernt.",
        ],
      },
      illustration: scene("ak-bahn-begegnung"),
      terms: [
        { term: "Tür frei?", meaning: "Frage vor dem Betreten oder Verlassen der Bahn." },
        { term: "Links an links", meaning: "Grundregel bei Begegnungen auf verschiedenen Händen." },
        { term: "Pferdelänge", meaning: "Mindestabstand zum vorderen Pferd, etwa 3 Meter." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w11-l6-regeln",
          prompt: { leicht: "Welche Bahnregeln stimmen? Tippe alles Richtige an.", mittel: "Welche Aussagen entsprechen den Bahnregeln?" },
          options: [
            { id: "tuer", label: "Vor dem Hineingehen „Tür frei?“ rufen", visual: item("tor"), correct: true },
            { id: "links", label: "Links an links vorbeireiten", visual: tag("⇄"), correct: true },
            { id: "abstand", label: "Mindestens eine Pferdelänge Abstand", visual: item("pferd"), correct: true },
            { id: "mitte", label: "Nachgurten in der Bahnmitte", visual: item("sattel"), correct: true, levels: ["mittel"] },
            { id: "hufschlag-halten", label: "Auf dem Hufschlag anhalten und quatschen", visual: item("ak-stopp"), feedback: "Wer hält, macht den Hufschlag frei." },
            { id: "schneiden", label: "Andere schneiden, wenn es eilig ist", visual: item("ak-blitz"), feedback: "Schneiden ist gefährlich und unhöflich." },
          ],
          missing: { leicht: "Fast! Es fehlt noch eine richtige Regel.", mittel: "Es fehlt noch mindestens eine richtige Regel." },
          explain: "Prima! So reiten alle sicher und entspannt zusammen.",
        },
      ],
      quiz: [
        {
          id: "tuer",
          prompt: "Was rufst du, bevor du die Bahn betrittst?",
          options: [
            ok("tuer", "„Tür frei?“"),
            no("hallo", "„Hallo zusammen!“", "Freundlich, aber die richtige Frage ist „Tür frei?“."),
            no("nichts", "Gar nichts", "Ohne Ansage kann ein Reiter direkt vor der Tür sein."),
          ],
          explain: "Richtig – und du wartest auf „Ist frei!“.",
        },
        {
          id: "begegnung",
          prompt: "Zwei Reiter kommen sich entgegen. Wie reiten sie aneinander vorbei?",
          options: [
            ok("links", "Links an links"),
            no("rechts", "Rechts an rechts", "In der Reitbahn gilt links an links."),
            no("egal", "Ganz egal", "Eine feste Regel verhindert Zusammenstöße."),
          ],
          explain: "Genau! Wie bei einer Begegnung auf einem Weg mit fester Regel.",
        },
        {
          id: "schritt",
          prompt: "Du reitest Schritt, andere traben. Wo reitest du?",
          options: [
            ok("innen", "Weiter innen, der Hufschlag ist für die Schnelleren frei"),
            no("hufschlag", "Auf dem ersten Hufschlag, die anderen sollen ausweichen", "Schnellere Gangarten haben Vorrang auf dem Hufschlag."),
            no("mitte-halt", "Mitten auf dem Hufschlag anhalten", "Anhalten auf dem Hufschlag behindert andere."),
          ],
          explain: "Richtig! So kommen alle gut aneinander vorbei.",
        },
        {
          id: "aufsitzen",
          levels: ["mittel"],
          prompt: "Wo sitzt du auf oder gurtest nach, wenn andere schon reiten?",
          options: [
            ok("mitte", "In der Bahnmitte, abseits des Hufschlags"),
            no("hufschlag", "Auf dem Hufschlag", "Dort störst du die anderen Reiter."),
            no("tuer", "Direkt in der Tür", "Die Tür muss frei bleiben."),
          ],
          explain: "Genau. So bleibt der Hufschlag für alle frei.",
        },
        {
          id: "vorrang",
          levels: ["mittel"],
          prompt: "Wer hat Vorrang: Reiter auf der ganzen Bahn oder Reiter auf einem Zirkel?",
          options: [
            ok("ganze", "Reiter auf der ganzen Bahn"),
            no("zirkel", "Reiter auf dem Zirkel", "Figuren im Bahninneren weichen der ganzen Bahn."),
            no("lauter", "Wer lauter ruft", "Es gelten feste Regeln, nicht die Lautstärke."),
          ],
          explain: "Richtig. Wer auf dem Zirkel reitet, achtet auf Reiter auf der ganzen Bahn.",
        },
      ],
      merksatz: {
        leicht: "„Tür frei?“ – links an links – eine Pferdelänge Abstand – Schritt macht Platz.",
        mittel: "Tür frei, links an links, ganze Bahn vor Figuren, schnellere Gangarten auf den Hufschlag, Abstand halten, in der Mitte auf- und absitzen.",
      },
    },

    /* ---------- 7. Abteilungsreiten ---------- */
    {
      slug: "abteilungsreiten",
      title: "Abteilungsreiten und Kommandos",
      speaker: "ben",
      intro: {
        leicht: "In der Reitstunde reiten oft alle hintereinander. Das nennt man Abteilung!",
        mittel: "In der Abteilung reiten mehrere Reiter hintereinander nach Kommandos der Reitlehrkraft. Wer die Kommandos versteht, reitet sicher und pünktlich.",
      },
      explanation: {
        leicht: [
          "Das erste Pferd in der Abteilung heißt Tete. Alle anderen reiten hinterher, mit einer Pferdelänge Abstand.",
          "Die Reitlehrerin sagt zuerst, was kommt, und dann das Wort „Marsch“. Erst beim „Marsch“ geht es los!",
        ],
        mittel: [
          "Die Abteilung: Das erste Pferd ist die Tete, das letzte der Schluss. Alle halten eine Pferdelänge Abstand und bleiben auf der Linie der Tete. Wird der Abstand größer, wird nicht abgekürzt, sondern das Tempo vorsichtig angepasst.",
          "Kommandos bestehen aus Ankündigung und Ausführung: „Abteilung – Trab!“ oder „Ganze Abteilung – im Arbeitstempo – Trab – Marsch!“. Bei „Ganze Abteilung“ führen alle gleichzeitig aus, wo sie gerade sind. Ohne diesen Zusatz reiten die Reiter die Figur nacheinander am selben Punkt, an dem die Tete sie begonnen hat. „Einzeln“ bedeutet, dass jeder Reiter die Übung nacheinander allein ausführt.",
          "Typische Kommandos: „Am nächsten Wechselpunkt durch die ganze Bahn wechseln“, „Bei A auf den Zirkel“, „Abteilung – Halt“, „Zügel aus der Hand kauen lassen“. Bis zum Ausführungskommando bereitest du alles vor: Linie anschauen, Pferd aufmerksam machen.",
        ],
      },
      illustration: scene("ak-bahn-abteilung"),
      terms: [
        { term: "Tete", meaning: "Das erste Pferd der Abteilung." },
        { term: "Ganze Abteilung", meaning: "Alle Reiter führen das Kommando gleichzeitig aus." },
        { term: "Ankündigungskommando", meaning: "Sagt, was kommt; erst das Ausführungskommando löst es aus." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w11-l7-kommandos",
          prompt: { leicht: "Was bedeutet das? Ordne zu.", mittel: "Ordne die Begriffe ihrer Bedeutung zu." },
          targets: [
            { id: "erste", label: "Das erste Pferd" },
            { id: "alle", label: "Alle gleichzeitig" },
            { id: "los", label: "Jetzt geht es los" },
          ],
          items: [
            card("tete", "Tete", item("pferd"), "erste", "Richtig – die Tete führt die Abteilung an.", "Die Tete ist das erste Pferd."),
            card("ganze", "Ganze Abteilung", tag("alle"), "alle", "Genau, alle führen es zur gleichen Zeit aus.", "„Ganze Abteilung“ heißt: alle zugleich."),
            card("marsch", "Marsch!", item("ak-sprechblase"), "los", "Richtig! Das ist das Ausführungskommando.", "„Marsch“ löst die Übung aus."),
          ],
        },
      ],
      quiz: [
        {
          id: "tete",
          prompt: "Wie heißt das erste Pferd der Abteilung?",
          options: [
            ok("tete", "Tete"),
            no("chef", "Chef", "Im Reitstall sagt man Tete."),
            no("spitze", "Kopfpferd", "Der richtige Begriff ist Tete."),
          ],
          explain: "Richtig! Das Wort kommt aus dem Französischen und heißt Kopf.",
        },
        {
          id: "abstand",
          prompt: "Wie viel Abstand hältst du in der Abteilung?",
          options: [
            ok("laenge", "Eine Pferdelänge"),
            no("dicht", "Ganz dicht auffahren", "Zu dicht ist gefährlich – Pferde können schlagen."),
            no("bahn", "Eine ganze Bahnlänge", "So weit muss es nicht sein."),
          ],
          explain: "Genau – das sind ungefähr drei Meter.",
        },
        {
          id: "wann",
          prompt: "Wann führst du ein Kommando aus?",
          options: [
            ok("marsch", "Beim Ausführungskommando, zum Beispiel „Marsch“"),
            no("sofort", "Sobald die Reitlehrerin anfängt zu sprechen", "Erst kommt die Ankündigung, dann die Ausführung."),
            no("wenn-lust", "Wenn ich Lust habe", "Dann wäre die Abteilung durcheinander."),
          ],
          explain: "Richtig! Die Ankündigung nutzt du zum Vorbereiten.",
        },
        {
          id: "ganze",
          levels: ["mittel"],
          prompt: "„Ganze Abteilung – Kehrtvolte – Marsch!“ Was passiert?",
          options: [
            ok("gleichzeitig", "Alle reiten gleichzeitig an ihrem Platz eine Kehrtvolte"),
            no("nacheinander", "Alle reiten nacheinander am Punkt der Tete", "Das wäre ohne „Ganze Abteilung“."),
            no("tete", "Nur die Tete reitet", "„Ganze Abteilung“ betrifft alle."),
          ],
          explain: "Genau. Danach ist die Abteilung auf der anderen Hand, mit neuer Tete.",
        },
        {
          id: "luecke",
          levels: ["mittel"],
          prompt: "Der Abstand zum Vorderpferd wird zu groß. Was tust du?",
          options: [
            ok("tempo", "Das Tempo vorsichtig etwas erhöhen und auf der Linie bleiben"),
            no("abkuerzen", "Die Ecke abkürzen", "Abkürzen stört die Linie und die Biegung."),
            no("ueberholen", "Innen überholen", "In der Abteilung bleibt die Reihenfolge."),
          ],
          explain: "Richtig. Die Abteilung bleibt auf einer Linie.",
        },
      ],
      merksatz: {
        leicht: "Tete vorn, eine Pferdelänge Abstand – und erst bei „Marsch“ geht es los.",
        mittel: "Ankündigen, vorbereiten, ausführen: „Ganze Abteilung“ = alle zugleich, sonst nacheinander am Punkt der Tete.",
      },
    },
  ], reviewed2026_10_29),
};
