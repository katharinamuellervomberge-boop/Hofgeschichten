import "server-only";
import { scene } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 13, Lektionen 17–20 */
export const teil5: DeepInput[] = [
  /* ---------- 17. Seitengänge ---------- */
  {
    slug: "seitengaenge-verstehen",
    title: "Seitengänge: Schenkelweichen, Schulterherein, Travers und Renvers",
    speaker: "mila",
    intro:
      "Seitengänge sehen elegant aus, sind aber vor allem eins: Gymnastik. Jeder Seitengang hat einen anderen Zweck. Wer nur „seitwärts“ reitet, ohne zu wissen warum, verschenkt ihre Wirkung – oder macht das Pferd schief.",
    illustration: tabelle("Seitengänge", "Im Vergleich", [
      ["Lektion", "Stellung/Biegung", "Wirkung"],
      ["Schenkelweichen", "Stellung gegen Bewegungsrichtung, keine Biegung", "Lösen, Reaktion auf seitwärtstreibenden Schenkel"],
      ["Schulterherein", "Biegung weg von der Bewegungsrichtung", "Geraderichtung, Lastaufnahme inneres Hinterbein"],
      ["Travers", "Biegung in Bewegungsrichtung, Kruppe herein", "Biegung, Lastaufnahme äußeres Hinterbein"],
      ["Renvers", "Biegung in Bewegungsrichtung, Kruppe an der Bande", "wie Travers, schwieriger"],
    ]),
    terms: begriffe(
      ["Hufschlaglinien", "Spuren der Hufe; Schulterherein meist auf drei, Travers und Renvers auf vier Hufschlägen."],
      ["Abstellung", "Winkel, um den das Pferd zur Bande abgestellt ist – im Schulterherein etwa 30 Grad."],
      ["Lösende Lektion", "Übung, die vor allem lockert, z. B. Schenkelweichen."],
      ["Versammelnde Lektion", "Übung, die Lastaufnahme fördert, z. B. Schulterherein, Travers."],
    ),
    deep: {
      minutes: 13,
      sections: [
        {
          heading: "Schenkelweichen",
          text: "Das Pferd geht vorwärts-seitwärts, leicht gestellt gegen die Bewegungsrichtung, ohne Längsbiegung. Die inneren Beine kreuzen vor den äußeren.\nWarum: Das Pferd lernt, auf den vorwärts-seitwärtstreibenden Schenkel zu reagieren; die Übung lockert und verbessert die Durchlässigkeit. Sie ist eine Lösungsübung, keine versammelnde Lektion.\nHilfen (Schenkelweichen weg vom linken Schenkel): Pferd links gestellt, Gewicht etwas links, linker Schenkel eine Handbreit hinter dem Gurt treibt vorwärts-seitwärts, rechter Schenkel nimmt die Bewegung auf und verwahrt, linker Zügel stellt, rechter Zügel begrenzt die Stellung und verhindert, dass die Schulter ausfällt.\nGefühl: Das Pferd tritt gleichmäßig über, ohne zu eilen; Vorhand ist der Hinterhand minimal voraus.",
        },
        {
          heading: "Schulterherein",
          text: "Die Vorhand wird so weit nach innen geführt, dass das innere Hinterbein in die Spur des äußeren Vorderbeins tritt – das Pferd geht auf drei Hufschlägen, etwa 30 Grad abgestellt, gleichmäßig um den inneren Schenkel gebogen, Blick weg von der Bewegungsrichtung.\nWarum: Das innere Hinterbein tritt vermehrt unter den Schwerpunkt und nimmt Last auf. Die Schultern werden vor die Hinterhand gerichtet – die wichtigste Übung für Geraderichtung und eine Grundlage der Versammlung.\nHilfen: Aus einer Ecke oder Volte die Vorhand mit beiden Zügeln nach innen führen; Gewicht innen, innerer Schenkel am Gurt treibt vorwärts-seitwärts, äußerer verwahrt; innerer Zügel stellt, äußerer begrenzt Biegung und Abstellung.\nGefühl: Du spürst das innere Hinterbein deutlicher unter dir arbeiten, die Verbindung am äußeren Zügel wird gleichmäßig, das Pferd wird vorn leichter.",
        },
        {
          heading: "Travers und Renvers",
          text: "Travers (Kruppe herein): Die Vorhand bleibt auf dem Hufschlag, die Hinterhand wird nach innen geführt. Das Pferd ist in Bewegungsrichtung gebogen und gestellt und geht auf vier Hufschlägen. Hilfen: Gewicht innen, innerer Schenkel am Gurt für die Biegung, äußerer Schenkel hinter dem Gurt führt die Hinterhand herein, innerer Zügel stellt, äußerer begrenzt.\n\nRenvers (Kruppe heraus): das spiegelbildliche Bild – Hinterhand auf dem Hufschlag, Vorhand innen, Biegung in Bewegungsrichtung. Schwieriger, weil die Bande dem Pferd weniger Halt gibt.\n\nWarum: Travers und Renvers verbessern Biegung und Lastaufnahme, besonders des äußeren Hinterbeins, und bereiten Traversale und Pirouette vor.",
        },
        {
          heading: "Woran du gute Seitengänge erkennst",
          text: "• Gleichmäßiger Takt und gleichbleibendes Tempo – der Takt ist wichtiger als der Winkel.\n• Gleichmäßige Abstellung und Biegung über die ganze Strecke.\n• Das Pferd bleibt an der Hand und losgelassen.\n• Danach gehen Trab und Galopp oft schwungvoller und gerader.\n\nSo viel Winkel wie das Pferd mit Takt und Losgelassenheit gehen kann – nicht mehr.",
        },
        {
          heading: "Typische Fehler, Ursachen, Übungen",
          text: "• Zu viel Winkel: Takt geht verloren. → Weniger Abstellung.\n• Nur Hals gebogen, Körper gerade: zu viel innerer Zügel. → Äußerer Zügel begrenzt, Schultern führen.\n• Hinterhand eilt voraus (im Schenkelweichen): seitwärtstreibender Schenkel zu weit hinten oder zu stark.\n• Pferd wird langsamer und klemmt: zu wenig vorwärts. → Abwechseln mit geraden Linien und frischem Vorwärts.\n• Reiter knickt in der Hüfte ein oder lehnt sich.\n\nÜbungsfolge: Schenkelweichen an der Bande → Schultervor → Schulterherein wenige Tritte, dann geradeaus → Travers aus der Ecke wenige Tritte → Wechsel Schulterherein–Volte–Travers.",
        },
      ],
      praxis: {
        title: "Weniger Winkel, mehr Wirkung",
        text: "Tilda reitet mit Tonga Schulterherein – mit viel Winkel, Tongas Kopf zeigt stark nach innen. Die Reitlehrerin steht in der Ecke und sieht: Der Hals ist gebogen, aber die Hinterbeine laufen auf zwei Hufschlägen geradeaus mit, der Takt wird unregelmäßig.\n\nTilda soll mit dem äußeren Zügel begrenzen und die Schultern nur so weit hereinführen, bis Tongas inneres Hinterbein in die Spur des äußeren Vorderbeins tritt. Es fühlt sich weniger nach Seitengang an – aber Tonga wird vorn leichter und tritt gleichmäßig. Danach ist ihr Trab auf der Geraden deutlich schwungvoller.",
      },
      fehler: fehler(
        ["Möglichst viel Winkel reiten.", "Nur so viel, wie Takt und Losgelassenheit erlauben."],
        ["Schulterherein nur mit dem inneren Zügel reiten.", "Schultern mit beiden Zügeln führen, außen begrenzen."],
        ["Schenkelweichen für eine versammelnde Lektion halten.", "Es ist eine Lösungsübung."],
        ["Seitengänge ewig lang reiten.", "Wenige gute Tritte, dann geradeaus."],
      ),
      richtig: [
        "Kenne Zweck, Stellung und Biegung jedes Seitengangs.",
        "Beginne mit Schenkelweichen und Schultervor.",
        "Reite Schulterherein auf drei Hufschlägen mit etwa 30 Grad.",
        "Achte auf Takt vor Winkel.",
        "Wechsle Seitengänge mit geraden Linien und frischem Vorwärts ab.",
      ],
      merke: [
        "Schenkelweichen löst – Schulterherein, Travers und Renvers versammeln.",
        "Schulterherein: Biegung weg von der Bewegungsrichtung, drei Hufschläge.",
        "Travers und Renvers: Biegung in Bewegungsrichtung, vier Hufschläge.",
        "Takt vor Winkel.",
      ],
      weiter: weiter(["Dressur: Schenkelweichen", "ra-w13-l6"], ["Dressur: Schulterherein", "ra-w13-l7"], ["Dressur: Travers und Renvers", "ra-w13-l8"], ["Reitlehre-Visualizer (interaktive Übung)"]),
    },
    exercise: [
      wahl(
        "ra-w18-l17-entscheidung",
        "Im Schulterherein wird dein Pferd unregelmäßig im Takt und der Hals knickt stark nach innen. Was änderst du?",
        "Weniger Winkel, äußeren Zügel begrenzen, Schultern führen statt Kopf ziehen",
        [
          ["Mehr innerer Zügel, damit es sich stärker biegt", "Das verstärkt das Abknicken."],
          ["Mehr Winkel, damit die Übung schwieriger wird", "Takt geht vor Winkel."],
        ],
        "Richtig. Takt und gleichmäßige Biegung sind wichtiger als der Winkel.",
      ),
    ],
    quiz: [
      frage("schenkelweichen", "Wie ist das Pferd im Schenkelweichen gestellt?", "Gegen die Bewegungsrichtung, ohne Längsbiegung", [["In Bewegungsrichtung gebogen", "Das ist Travers oder Traversale."], ["Gar nicht gestellt", "Eine leichte Stellung gehört dazu."]], "Genau. Es ist eine Lösungsübung."),
      frage("schulterherein", "Auf wie vielen Hufschlägen geht das Pferd im Schulterherein meist?", "Auf drei", [["Auf einem", "Dann wäre es gerade."], ["Auf sechs", "So viele Hufschläge gibt es nicht."]], "Richtig. Das innere Hinterbein tritt in die Spur des äußeren Vorderbeins."),
      frage("travers", "Was ist beim Travers nach innen geführt?", "Die Hinterhand (Kruppe herein)", [["Die Vorhand", "Das wäre Schulterherein oder Renvers."], ["Nur der Kopf", "Der ganze Körper ist abgestellt."]], "Genau. Das Pferd ist in Bewegungsrichtung gebogen."),
      frage("takt", "Was ist bei Seitengängen am wichtigsten?", "Gleichmäßiger Takt und Losgelassenheit", [["Möglichst großer Winkel", "Winkel ohne Takt schadet mehr, als er nützt."], ["Möglichst schnelles Tempo", "Tempo ist nicht das Ziel."]], "Richtig. Takt vor Winkel."),
    ],
  },

  /* ---------- 18. Galoppwechsel ---------- */
  {
    slug: "galoppwechsel-verstehen",
    title: "Einfache und fliegende Galoppwechsel",
    speaker: "ben",
    intro:
      "Ein fliegender Galoppwechsel sieht leicht aus – ein kleiner Hüpfer, schon galoppiert das Pferd auf der anderen Hand. Dahinter steckt aber viel Vorarbeit. Wer zu früh wechseln will, bekommt Hektik, Kreuzgalopp und ein verunsichertes Pferd.",
    illustration: scene("ak-bahn-zirkel-wechseln"),
    terms: begriffe(
      ["Einfacher Galoppwechsel", "Wechsel über einige Schritte (oder in unteren Klassen über einige Trabtritte)."],
      ["Fliegender Galoppwechsel", "Wechsel in der Schwebephase von einem Galoppsprung zum nächsten."],
      ["Serienwechsel", "Fliegende Wechsel in festen Abständen, z. B. alle vier Sprünge."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Der einfache Galoppwechsel",
          text: "Beim einfachen Galoppwechsel wird aus dem Galopp in den Schritt pariert, das Pferd geht drei bis fünf klare Schritte, wird umgestellt und springt auf der anderen Hand wieder an. In unteren Klassen ist auch der Wechsel durch einige Trabtritte erlaubt.\n\nVoraussetzungen: Das Pferd kann aus dem Galopp in den Schritt durchparieren, ohne in den Trab zu fallen, und aus dem Schritt angaloppieren. Das verlangt Durchlässigkeit und Kraft.\n\nGefühl und Erfolgskontrolle: Der Übergang in den Schritt ist direkt, ohne Trabtritte; die Schritte sind klar im Viertakt; das Anspringen erfolgt ruhig auf feine Hilfen.",
        },
        {
          heading: "Biomechanik des fliegenden Wechsels",
          text: "Beim fliegenden Wechsel wechselt das Pferd in der Schwebephase die Fußfolge. Im Moment, in dem alle vier Beine in der Luft sind, „sortiert“ es die Beine neu: Das bisher äußere Hinterbein wird zum inneren und umgekehrt. Hinten und vorn müssen gleichzeitig wechseln – sonst entsteht ein Kreuzgalopp.\n\nDas gelingt nur, wenn der Galopp genug Schwebephase hat, das Pferd ausbalanciert und gerade ist und die Hilfe genau im richtigen Moment kommt: kurz vor der Schwebephase, also wenn das führende Vorderbein auffußt.",
        },
        {
          heading: "Voraussetzungen",
          text: "Bevor fliegende Wechsel erarbeitet werden, sollte das Pferd:\n\n• im Arbeitsgalopp ausbalanciert, taktklar und gerade sein,\n• einfache Wechsel sicher können,\n• aus dem Schritt sicher auf beiden Händen angaloppieren,\n• sicher im Kontergalopp gehen,\n• halbe Paraden im Galopp durchlassen.\n\nAuch der Reiter braucht einen sicheren, unabhängigen Galoppsitz und muss die Galopphand fühlen können.",
        },
        {
          heading: "Die Hilfen für den fliegenden Wechsel",
          text: "Beispiel: Wechsel von Rechts- in Linksgalopp.\n1. Halbe Parade zur Vorbereitung.\n2. Pferd minimal nach links umstellen.\n3. Gewicht auf den neuen inneren (linken) Gesäßknochen.\n4. Neuer äußerer (rechter) Schenkel geht nach hinten und verwahrt, neuer innerer (linker) Schenkel am Gurt gibt den Impuls.\n5. Alles in einem Moment, kurz vor der Schwebephase – ohne den Oberkörper zu werfen.\n\nWichtig: Die Hilfen werden leise und klar gegeben. Ein Wechsel, der durch Werfen des Oberkörpers erzwungen wird, wird schief und hektisch.",
        },
        {
          heading: "Typische Fehler und Übungen",
          text: "• Wechsel nur vorn oder nur hinten (Kreuzgalopp): Hilfe zu spät oder Pferd nicht gerade.\n• Wechsel zu spät oder gar nicht: Galopp hat zu wenig Schwebe, Hilfe unklar.\n• Hektisches Wechseln, Hinterhand schwingt zur Seite: Reiter wirft sich, Pferd unausbalanciert.\n• Pferd wechselt von allein in Erwartung: zu oft an derselben Stelle geübt.\n\nÜbungen: einfache Wechsel auf der Diagonalen, Kontergalopp auf großen Bögen, Galoppwechsel auf einer Volte zurück zur Bande (Schlangenlinien), später fliegende Wechsel aus dem Kontergalopp auf gerader Linie oder beim Handwechsel. Nach einem gelungenen Wechsel: loben und Pause.",
        },
      ],
      praxis: {
        title: "Der erste fliegende Wechsel",
        text: "Scrabble kann sicher einfache Wechsel und Kontergalopp. Wilhelm will nun den ersten fliegenden Wechsel versuchen. Die Reitlehrerin lässt ihn auf der linken Hand im Kontergalopp (Rechtsgalopp) auf die kurze Seite zureiten. Kurz vor der Ecke: halbe Parade, umstellen, neue Hilfen. Scrabble springt um – vorne und hinten gleichzeitig.\n\nWilhelm lobt, steigt ab und beendet die Einheit. Beim nächsten Mal übt er wieder einfache Wechsel und erst danach einen fliegenden. So bleibt Scrabble ruhig und lernt, dass der Wechsel keine Aufregung bedeutet.",
      },
      fehler: fehler(
        ["Fliegende Wechsel üben, bevor einfache Wechsel sicher sind.", "Voraussetzungen Schritt für Schritt erarbeiten."],
        ["Den Oberkörper werfen, um den Wechsel zu erzwingen.", "Leise, klare Hilfe im richtigen Moment."],
        ["Immer an derselben Stelle üben.", "Variieren, damit das Pferd nicht vorwegnimmt."],
        ["Nach einem gelungenen Wechsel weiterüben.", "Loben, Pause oder Einheit beenden."],
      ),
      richtig: [
        "Sichere Arbeitsgalopp, einfache Wechsel, Angaloppieren aus dem Schritt und Kontergalopp.",
        "Bereite jeden Wechsel mit einer halben Parade vor.",
        "Gib die Hilfe kurz vor der Schwebephase: umstellen, Gewicht, Schenkel tauschen.",
        "Bleibe mit dem Oberkörper ruhig.",
        "Belohne gelungene Wechsel mit Pause.",
      ],
      merke: [
        "Einfacher Wechsel: über einige Schritte.",
        "Fliegender Wechsel: in der Schwebephase, vorn und hinten gleichzeitig.",
        "Voraussetzungen: Balance, Geradheit, Kontergalopp, sicheres Angaloppieren.",
        "Leise Hilfen im richtigen Moment statt Werfen.",
      ],
      weiter: weiter(["Dressur: Einfacher und fliegender Galoppwechsel", "ra-w13-l11"], ["Falscher Galopp, Kreuzgalopp", "ra-w18-l15"], ["Galopparbeit verbessern", "ra-w18-l16"]),
    },
    exercise: [
      wahl(
        "ra-w18-l18-entscheidung",
        "Beim fliegenden Wechsel wechselt dein Pferd nur vorn um. Was ist die wahrscheinlichste Ursache?",
        "Die Hilfe kam zu spät oder das Pferd war nicht gerade und ausbalanciert",
        [
          ["Das Pferd ist zu jung für Galopp", "Das Alter allein ist nicht die Ursache."],
          ["Die Hilfe war zu leise", "Lauter macht es meist hektischer – Timing und Geradheit sind entscheidend."],
        ],
        "Richtig. Kreuzgalopp beim Wechsel zeigt meist ein Timing- oder Geradheitsproblem.",
      ),
    ],
    quiz: [
      frage("einfach", "Was ist ein einfacher Galoppwechsel?", "Ein Wechsel über einige Schritte", [["Ein Wechsel in der Schwebephase", "Das ist der fliegende Wechsel."], ["Ein Wechsel ohne Hilfen", "Jeder Wechsel braucht Hilfen."]], "Genau. In unteren Klassen auch über Trabtritte."),
      frage("fliegend", "Wann wechselt das Pferd beim fliegenden Wechsel?", "In der Schwebephase", [["Wenn alle vier Hufe am Boden sind", "Dann ist kein Wechsel möglich."], ["Im Trab", "Der fliegende Wechsel geschieht im Galopp."]], "Richtig. Vorn und hinten gleichzeitig."),
      frage("voraussetzung", "Welche Voraussetzung gehört zum fliegenden Wechsel?", "Sicherer Kontergalopp", [["Möglichst schnelles Galoppieren", "Tempo hilft nicht."], ["Viele Sprünge über Hindernisse", "Das ist kein direkter Vorbereitungsschritt."]], "Genau. Dazu Balance und Geradheit."),
    ],
  },

  /* ---------- 19. Versammlung ---------- */
  {
    slug: "versammlung-tragkraft",
    title: "Versammlung, Tragkraft und weiterführende Lektionen",
    speaker: "lea",
    intro:
      "Versammlung ist das oberste Ziel der Ausbildungsskala – und das am meisten missverstandene. Ein Pferd ist nicht versammelt, weil es langsam geht und den Hals hoch trägt. Versammlung ist ein Kraftzustand: Die Hinterhand trägt mehr, die Vorhand wird frei.",
    illustration: scene("ak-oben-pirouette"),
    terms: begriffe(
      ["Versammlung", "Vermehrte Lastaufnahme der Hinterhand durch stärkere Beugung der Hanken; die Vorhand wird leichter und freier."],
      ["Relative Aufrichtung", "Aufrichtung, die durch Lastaufnahme der Hinterhand entsteht."],
      ["Hanken", "Hüft-, Knie- und Sprunggelenke der Hinterhand."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Was Versammlung ist",
          text: "In der Versammlung treten die Hinterbeine weiter unter den Schwerpunkt, die Hanken beugen sich stärker, und die Hinterhand nimmt mehr Gewicht auf. Dadurch senkt sich die Kruppe minimal, die Vorhand wird leichter, und Hals und Kopf richten sich relativ auf. Die Tritte werden kürzer, aber erhabener und energischer – nicht langsamer im Takt.\n\nVersammlung macht ein Pferd wendiger, leichter zu reiten und schont die Vorderbeine. Sie ist auch für Freizeitpferde wertvoll – im passenden Maß.",
        },
        {
          heading: "Wie Versammlung entsteht",
          text: "Versammlung kann man nicht mit der Hand herstellen. Sie entsteht über Jahre durch:\n\n• Übergänge, besonders abwärts und zwischen Tempi,\n• halbe Paraden, die durchkommen,\n• Seitengänge wie Schulterherein und Travers,\n• Volten und Wendungen,\n• Rückwärtsrichten in korrekter Ausführung,\n• Galopp-Übungen wie Zirkel verkleinern.\n\nGrundlage sind Takt, Losgelassenheit, Anlehnung, Schwung und Geraderichtung. Ohne sie wird aus „Versammlung“ ein Festhalten: kurz, gespannt, Rücken weg, Hinterbeine schieben hinten heraus.",
        },
        {
          heading: "Wie es sich anfühlt und woran du es erkennst",
          text: "Ein versammeltes Pferd fühlt sich an, als würde es „vor dir wachsen“: Die Schultern kommen hoch, du sitzt mehr „bergauf“. Die Verbindung wird leichter, nicht schwerer. Das Pferd reagiert auf kleinste Hilfen und kann jederzeit nach vorn zulegen – Versammlung ist gespeicherte Energie.\n\nErfolgskontrolle: Takt bleibt rein, Hinterhand tritt sichtbar unter, Kruppe senkt sich leicht, Pferd bleibt losgelassen, Überstreichen gelingt ohne Haltungsverlust, Zulegen aus der Versammlung ist sofort möglich.",
        },
        {
          heading: "Weiterführende Lektionen",
          text: "Auf der Grundlage von Versammlung bauen höhere Lektionen auf:\n• Traversale: Travers auf der Diagonalen.\n• Kurzkehrt, Hinterhandwendung und Galopppirouette: Wendungen um die Hinterhand.\n• Serienwechsel im Galopp.\n• Piaffe und Passage: höchste Versammlung im Trab.\n\nDiese Lektionen verlangen viel Kraft und eine lange, systematische Ausbildung. Sie werden nur unter fachkundiger Anleitung erarbeitet. Eine erzwungene Lektion ohne ausreichende Kraft schadet Rücken, Gelenken und Vertrauen.",
        },
        {
          heading: "Typische Fehler und Ursachen",
          text: "• Langsam statt versammelt: Das Pferd wird träge, die Energie fehlt. → Mehr Schwung, frisches Vorwärts zwischendurch.\n• Absolute Aufrichtung durch die Hand: Hals hoch, Rücken weg. → Hand ruhig, Hinterhand aktivieren.\n• Zu lange versammelte Reprisen: Muskeln ermüden, Takt geht verloren. → Kurz versammeln, dann zulegen und dehnen.\n• Versammlung vor Geraderichtung: Das Pferd belastet ein Hinterbein mehr.\n\nÜbungen: Trab–Schritt–Trab mit wenigen Tritten dazwischen, Schulterherein–Volte–Schulterherein, Zurückführen im Trab auf der langen Seite und wieder Zulegen, Galopp Zirkel verkleinern.",
        },
      ],
      praxis: {
        title: "Kurz versammeln, dann vorwärts",
        text: "Tilda möchte Tonga versammeln und reitet eine ganze lange Seite kurz und langsam. Tonga wird schwer in der Hand, der Takt unregelmäßig. Die Reitlehrerin rät: nur fünf Tritte zurückführen, dann wieder zulegen, dann wieder fünf Tritte.\n\nNach einigen Wiederholungen spürt Tilda, wie Tonga in den versammelten Tritten tiefer und kraftvoller wird und beim Zulegen sofort mitgeht. Versammlung ist kein Dauerzustand, sondern eine Bewegung zwischen Sammeln und Loslassen.",
      },
      fehler: fehler(
        ["Versammlung mit Langsamkeit verwechseln.", "Kürzere, aber energischere und erhabenere Tritte."],
        ["Den Kopf mit der Hand hochnehmen.", "Aufrichtung aus der Hinterhand entstehen lassen."],
        ["Lange versammelte Reprisen reiten.", "Kurz versammeln, dann zulegen und dehnen."],
        ["Hohe Lektionen ohne ausreichende Kraft erzwingen.", "Systematisch, mit fachkundiger Anleitung aufbauen."],
      ),
      richtig: [
        "Sichere zuerst die unteren Stufen der Skala.",
        "Nutze Übergänge, halbe Paraden, Seitengänge und Wendungen.",
        "Versammle kurz, dann vorwärts.",
        "Prüfe mit Überstreichen und Zulegen, ob die Versammlung echt ist.",
        "Erarbeite hohe Lektionen nur mit fachkundiger Begleitung.",
      ],
      merke: [
        "Versammlung = mehr Lastaufnahme der Hinterhand.",
        "Kürzer, erhabener, energischer – nicht langsamer im Takt.",
        "Aufrichtung kommt aus der Hinterhand.",
        "Versammlung ist ein Wechsel zwischen Sammeln und Loslassen.",
      ],
      weiter: weiter(["Dressur: Hinterhandwendung, Pirouette, Piaffe und Passage", "ra-w13-l12"], ["Biomechanik", "ra-w18-l2"], ["Trainingsprobleme erkennen und systematisch verbessern", "ra-w18-l20"]),
    },
    exercise: [
      wahl(
        "ra-w18-l19-entscheidung",
        "Beim Versammeln wird dein Pferd langsam und schwer in der Hand. Was tust du?",
        "Kürzere Versammlungsphasen und dazwischen frisch zulegen",
        [
          ["Die Zügel kürzer nehmen und länger versammeln", "Mehr Hand macht das Pferd noch schwerer."],
          ["Aufgeben – das Pferd kann keine Versammlung", "Versammlung wird in kleinen Schritten entwickelt."],
        ],
        "Richtig. Versammlung braucht Energie – die kommt aus dem Wechsel mit Vorwärts.",
      ),
    ],
    quiz: [
      frage("was", "Was passiert in der Versammlung?", "Die Hinterhand nimmt durch stärkere Beugung mehr Last auf", [["Das Pferd wird langsamer im Takt", "Der Takt bleibt gleich."], ["Der Kopf wird mit der Hand hochgenommen", "Das ist absolute Aufrichtung – ein Fehler."]], "Genau. Die Vorhand wird leichter."),
      frage("pruefen", "Wie prüfst du, ob Versammlung echt ist?", "Überstreichen und Zulegen gelingen ohne Haltungsverlust", [["Das Pferd geht besonders langsam", "Langsamkeit ist kein Beweis."], ["Der Kopf ist besonders hoch", "Die Kopfhöhe allein sagt nichts."]], "Richtig. Echte Versammlung ist gespeicherte Energie."),
      frage("hohe", "Wann werden hohe Lektionen wie Piaffe erarbeitet?", "Nach systematischer Ausbildung mit ausreichender Kraft und fachkundiger Anleitung", [["So früh wie möglich", "Ohne Kraft schadet das dem Pferd."], ["Nie, sie sind verboten", "Sie gehören zur klassischen Reitlehre."]], "Genau. Erzwingen schadet Rücken, Gelenken und Vertrauen."),
    ],
  },

  /* ---------- 20. Trainingsprobleme ---------- */
  {
    slug: "trainingsprobleme",
    title: "Trainingsprobleme erkennen und systematisch verbessern",
    speaker: "mila",
    intro:
      "Jedes Pferd hat Baustellen. Der Unterschied zwischen frustrierenden und erfolgreichen Reitern liegt oft nicht im Talent, sondern in der Methode: Statt an Symptomen herumzudoktern, suchen gute Reiter systematisch nach der Ursache.",
    illustration: tabelle("Fehlersuche", "Systematisch vorgehen", [
      ["Schritt", "Frage"],
      ["1. Pferd", "Schmerz? Ausrüstung? Kondition?"],
      ["2. Skala", "Welche Stufe fehlt? Einen Schritt zurück."],
      ["3. Reiter", "Sitz, Hilfen, Timing, Widersprüche?"],
      ["4. Training", "Aufbau, Dosierung, Abwechslung?"],
      ["5. Plan", "Kleine Ziele, Übungen, Kontrolle"],
    ]),
    terms: begriffe(
      ["Symptom", "Was man sieht oder spürt, z. B. Kopfschlagen."],
      ["Ursache", "Warum es passiert, z. B. Schmerz, Reiterhand, fehlende Losgelassenheit."],
      ["Trainingsplan", "Geplanter Aufbau mit Zielen, Übungen und Kontrollen über Wochen."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Schritt 1: Das Pferd",
          text: "Bevor du an Reiten und Training arbeitest, schließe körperliche Ursachen aus: Schmerzen (Rücken, Zähne, Hufe, Magen, Gelenke), unpassende Ausrüstung (Sattel, Gebiss, Nasenriemen), mangelnde Kondition oder Kraft. Viele „Ausbildungsprobleme“ sind in Wahrheit Schmerz- oder Ausrüstungsprobleme.\n\nHinweise auf körperliche Ursachen: Das Problem tritt plötzlich auf, verschlechtert sich, betrifft eine Seite deutlich mehr, wird durch Aufwärmen nicht besser oder geht mit Konfliktsignalen einher (siehe Modul 12, Lektion 10).",
        },
        {
          heading: "Schritt 2: Die Ausbildungsskala",
          text: "Ordne das Problem in die Skala ein. Ein paar Beispiele:\n\n• Pferd geht gegen die Hand → Anlehnung. Ist es wirklich losgelassen? Ist der Takt sicher?\n• Pferd fällt in Wendungen über die Schulter → Geraderichtung. Ist die Biegung korrekt? Reiter sitzt gerade?\n• Pferd eilt → Takt und Losgelassenheit. Ist das Pferd angespannt? Ist es ausbalanciert?\n• Pferd wird in Versammlung schwer → Schwung und Geraderichtung fehlen.\n\nRegel: Ein Schritt zurück auf der Skala löst oft das Problem eine Stufe weiter oben.",
        },
        {
          heading: "Schritt 3: Der Reiter",
          text: "Ehrliche Selbstanalyse ist schwer, aber entscheidend:\n• Sitzt du ausbalanciert und gerade?\n• Sind deine Hilfen klar, oder gibst du widersprüchliche Signale (treiben und festhalten)?\n• Stimmt dein Timing – gibst du sofort nach?\n• Bist du angespannt oder ängstlich?\n• Reitest du beide Hände gleichmäßig?\n\nVideoaufnahmen und eine gute Reitlehrerin sind unverzichtbar. Was du im Sattel fühlst, und was von außen zu sehen ist, unterscheidet sich oft deutlich.",
        },
        {
          heading: "Schritt 4 und 5: Training und Plan",
          text: "Prüfe dein Training: Gibt es eine ausreichende Schrittphase und Lösungsphase? Ist die Arbeitsphase zu lang oder zu kurz? Gibt es Abwechslung (Gelände, Stangen, Longe, Pausen)? Wird das Pferd überfordert?\n\nDann erstelle einen Plan:\n1. Ein konkretes Ziel (z. B. „ruhiges Angaloppieren auf der linken Hand“).\n2. Zwei bis drei passende Übungen.\n3. Zeitraum (z. B. vier Wochen) und Häufigkeit.\n4. Erfolgskontrolle (Video, Notizen, Reitlehrerin).\n5. Anpassen, wenn es nicht besser wird – vielleicht stimmt die vermutete Ursache nicht.\n\nGeduld ist Teil der Methode: Muskeln und Gewohnheiten verändern sich in Wochen und Monaten, nicht in Tagen.",
        },
      ],
      praxis: {
        title: "Das Kopfschlagen im Trab",
        text: "Ben merkt, dass Tivoli im Trab auf der rechten Hand mit dem Kopf schlägt. Er geht die Methode durch. Pferd: Zähne wurden vor drei Monaten gemacht, Sattel passt – aber er lässt die Tierärztin einen Blick werfen, die nichts findet. Skala: Auf der rechten Hand ist Tivoli fester, der Takt ist nicht ganz gleichmäßig – Losgelassenheit fehlt. Reiter: Im Video sieht Ben, dass seine rechte Hand höher steht und fest ist.\n\nPlan für vier Wochen: rechte Hand bewusst tiefer und nachgebend, auf der rechten Hand mehr Zirkel mit Zügel-aus-der-Hand-kauen-lassen, Schultervor. Nach vier Wochen ist das Kopfschlagen fast verschwunden.",
      },
      fehler: fehler(
        ["Am Symptom herumdoktern (z. B. Nasenriemen enger).", "Ursache suchen: Pferd, Skala, Reiter, Training."],
        ["Körperliche Ursachen überspringen.", "Schmerz und Ausrüstung immer zuerst prüfen."],
        ["Nur sich selbst oder nur das Pferd für schuldig halten.", "Alle Faktoren ehrlich betrachten."],
        ["Nach drei Tagen aufgeben.", "Plan über Wochen, mit Kontrolle und Anpassung."],
      ),
      richtig: [
        "Prüfe das Pferd: Schmerz, Ausrüstung, Kondition.",
        "Ordne das Problem in die Ausbildungsskala ein.",
        "Analysiere deinen Sitz und deine Hilfen mit Video und Reitlehrer.",
        "Prüfe Aufbau und Abwechslung deines Trainings.",
        "Erstelle einen Plan mit Ziel, Übungen, Zeitraum und Kontrolle.",
        "Passe an, wenn es nicht besser wird.",
      ],
      merke: [
        "Symptom ist nicht Ursache.",
        "Erst Pferd, dann Skala, dann Reiter, dann Training.",
        "Ein Schritt zurück auf der Skala löst oft das Problem.",
        "Plan, Geduld, Kontrolle.",
      ],
      weiter: weiter(["Die Ausbildungsskala im Detail", "ra-w18-l1"], ["Konfliktsignale beim Reiten", "ra-w17-l10"], ["Pferdeverhalten anhand praktischer Situationen analysieren", "ra-w17-l12"]),
    },
    exercise: [
      wahl(
        "ra-w18-l20-entscheidung",
        "Dein Pferd geht seit zwei Wochen plötzlich gegen die Hand, vorher war alles gut. Was prüfst du zuerst?",
        "Körperliche Ursachen und Ausrüstung: Zähne, Rücken, Sattel, Gebiss",
        [
          ["Ein schärferes Gebiss kaufen", "Das behandelt nur das Symptom und kann Schmerzen verstärken."],
          ["Den Nasenriemen enger schnallen", "Damit wird ein Signal unterdrückt, nicht die Ursache gelöst."],
        ],
        "Richtig. Plötzliche Veränderungen haben oft körperliche Ursachen.",
      ),
    ],
    quiz: [
      frage("reihenfolge", "Was steht bei der Fehlersuche an erster Stelle?", "Das Pferd: Schmerz, Ausrüstung, Kondition", [["Der Trainingsplan", "Zuerst muss das Pferd körperlich in Ordnung sein."], ["Eine neue Lektion", "Neue Lektionen lösen kein bestehendes Problem."]], "Genau. Dann Skala, Reiter, Training."),
      frage("skala", "Was bedeutet „einen Schritt zurück auf der Skala“?", "An der Stufe unter dem Problem arbeiten, z. B. Losgelassenheit bei Anlehnungsproblemen", [["Das Training ganz abbrechen", "Es geht um gezieltes Arbeiten an der Grundlage."], ["Nur noch Schritt reiten", "Gemeint ist die Ausbildungsskala, nicht die Gangart."]], "Richtig. Oft löst sich das Problem dann von selbst."),
      frage("plan", "Was gehört zu einem guten Trainingsplan?", "Ziel, Übungen, Zeitraum und Erfolgskontrolle", [["Nur das Ziel", "Ohne Weg und Kontrolle bleibt das Ziel ein Wunsch."], ["Nur viele Übungen", "Ohne Ziel und Kontrolle fehlt die Richtung."]], "Genau. Und anpassen, wenn es nicht besser wird."),
    ],
  },
];
