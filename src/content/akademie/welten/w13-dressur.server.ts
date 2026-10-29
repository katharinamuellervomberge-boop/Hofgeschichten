import "server-only";
import { card, item, letterSpot, no, ok, tag } from "../build";
import { lessonsOf, reviewed2026_10_29, scene, type AcademyWorld } from "../types";

/** Welt 13 – Dressur (Ausbau 29.10.2026) */
export const welt13: AcademyWorld = {
  id: "w13",
  number: 13,
  slug: "dressur",
  title: "Dressur",
  teaser: "Von der Skala der Ausbildung bis zu Piaffe und Passage.",
  learns: "Dressurviereck und Aufgaben, Skala der Ausbildung, Stellung und Biegung, Tempi, Vorhandwendung, Schenkelweichen, Schulterherein, Travers und Renvers, Traversale, Rückwärtsrichten, einfacher und fliegender Galoppwechsel, Hinterhandwendung und Pirouette, Piaffe und Passage – jeweils mit den Hilfen.",
  tint: "#E4E7DC",
  cover: scene("ak-oben-schulterherein"),
  badge: { id: "ra-abzeichen-w13", title: "Dressur-Kenner", motif: "dressage" },
  lessons: lessonsOf(13, [
    /* ---------- 1. Dressur und Viereck ---------- */
    {
      slug: "dressur-und-viereck",
      title: "Was ist Dressur? Das Viereck",
      speaker: "mila",
      intro: {
        leicht: "Dressur heißt: Pferd und Reiter tanzen zusammen – ganz fein und genau.",
        mittel: "Dressur ist die Gymnastik des Pferdes: Es soll kräftig, geschmeidig und aufmerksam werden. In Prüfungen wird sie im Dressurviereck nach einer festen Aufgabe geritten.",
      },
      explanation: {
        leicht: [
          "Bei der Dressur macht das Pferd viele Übungen: Kreise, Schlangenlinien, Seitwärtsgehen und vieles mehr. Das macht es stark und beweglich – für jedes Pferd wichtig, auch für Springpferde.",
          "Im Turnier gibt es ein großes Viereck mit vielen Buchstaben. Die Richter sitzen bei C. Am Anfang reitest du bei A herein, hältst bei X an und grüßt.",
        ],
        mittel: [
          "Dressur ist keine Zirkusnummer, sondern systematische Gymnastik: Das Pferd lernt, sich im Gleichgewicht unter dem Reiter zu bewegen, seine Hinterhand zu kräftigen und fein auf Hilfen zu reagieren. Sie ist die Grundlage für alle Disziplinen.",
          "Das kleine Dressurviereck misst 20 × 40 m, das große 20 × 60 m. Im großen kommen die Buchstaben V, S, R und P an den langen Seiten hinzu, auf der Mittellinie liegen D, L, X, I und G. Die Richter sitzen an der kurzen Seite bei C, in höheren Prüfungen auch an weiteren Plätzen.",
          "Eine Dressuraufgabe ist eine feste Folge von Lektionen. Man reitet bei A ein, hält bei X, grüßt die Richter und beginnt. Jede Lektion bekommt eine Note von 0 bis 10. Die Klassen steigen auf von E (Einsteiger) über A, L und M bis S. In unteren Klassen darf die Aufgabe oft vorgelesen werden.",
        ],
      },
      illustration: scene("ak-viereck-2060"),
      terms: [
        { term: "Dressuraufgabe", meaning: "Feste Folge von Lektionen in einer Prüfung." },
        { term: "Lektion", meaning: "Eine einzelne Dressurübung, z. B. Schulterherein." },
        { term: "Klassen E bis S", meaning: "Schwierigkeitsstufen im Turniersport: E, A, L, M, S." },
      ],
      exercise: [
        {
          type: "hotspots",
          id: "ra-w13-l1-gruss",
          scene: scene("ak-bahn-buchstaben"),
          prompt: { leicht: "Die Prüfung beginnt! Tippe zuerst, wo du hereinreitest, dann, wo du anhältst.", mittel: "Der Beginn einer Aufgabe: Tippe den Einritt, den Punkt zum Halten und Grüßen und die Seite der Richter." },
          mode: "sequence",
          targets: [
            letterSpot("A", "den Einritt bei A", "Bei A reitest du ein."),
            { ...letterSpot("X", "den Punkt X zum Halten und Grüßen", "Bei X hältst du an und grüßt."), r: 34 },
            letterSpot("C", "die Richter bei C", "Bei C sitzen die Richter.", ["mittel"]),
          ],
          missHint: "A und C stehen an den kurzen Seiten, X in der Mitte.",
        },
      ],
      quiz: [
        {
          id: "was",
          prompt: "Wofür ist Dressur gut?",
          options: [
            ok("gymnastik", "Sie macht das Pferd stark, beweglich und aufmerksam"),
            no("trick", "Damit das Pferd Kunststücke lernt", "Dressur ist Gymnastik, keine Zirkusnummer."),
            no("nur-turnier", "Nur für Turniere", "Dressur hilft jedem Pferd – auch Freizeit- und Springpferden."),
          ],
          explain: "Richtig! Dressur ist die Grundlage für alle Disziplinen.",
        },
        {
          id: "richter",
          prompt: "Wo sitzen die Richter in einer Dressurprüfung?",
          options: [
            ok("c", "An der kurzen Seite bei C"),
            no("a", "Bei A", "Bei A reitest du ein – die Richter sitzen bei C."),
            no("x", "Bei X in der Mitte", "In der Mitte reitet das Pferd."),
          ],
          explain: "Genau – in höheren Klassen sitzen zusätzlich Richter an anderen Seiten.",
        },
        {
          id: "gruss",
          prompt: "Was machst du am Anfang einer Dressuraufgabe bei X?",
          options: [
            ok("gruessen", "Anhalten und die Richter grüßen"),
            no("galopp", "Angaloppieren", "Zuerst wird gehalten und gegrüßt."),
            no("absteigen", "Absteigen", "Du bleibst im Sattel und grüßt."),
          ],
          explain: "Richtig! Das gehört zum festen Ablauf.",
        },
        {
          id: "gross",
          levels: ["mittel"],
          prompt: "Wie groß ist das große Dressurviereck?",
          options: [
            ok("2060", "20 × 60 Meter"),
            no("2040", "20 × 40 Meter", "Das ist das kleine Viereck."),
            no("4080", "40 × 80 Meter", "So groß ist es nicht."),
          ],
          explain: "Genau – mit zusätzlichen Buchstaben V, S, R und P.",
        },
        {
          id: "klassen",
          levels: ["mittel"],
          prompt: "Welche Reihenfolge der Klassen ist richtig – von leicht nach schwer?",
          options: [
            ok("ealms", "E – A – L – M – S"),
            no("salme", "S – A – L – M – E", "S ist die schwerste Klasse."),
            no("abcde", "A – B – C – D – E", "Die Klassen heißen E, A, L, M und S."),
          ],
          explain: "Richtig. E steht für Einsteiger, S für schwer.",
        },
      ],
      merksatz: {
        leicht: "Dressur ist Gymnastik für das Pferd. Im Turnier: bei A rein, bei X halten und grüßen.",
        mittel: "Dressur = Gymnastik nach System. Viereck 20 × 40 oder 20 × 60, Richter bei C, Noten 0–10, Klassen E bis S.",
      },
    },

    /* ---------- 2. Skala der Ausbildung ---------- */
    {
      slug: "skala-der-ausbildung",
      title: "Die Skala der Ausbildung",
      speaker: "lea",
      intro: {
        leicht: "Wie eine Treppe: Ein Pferd lernt Stufe für Stufe. Die unterste Stufe ist der Takt.",
        mittel: "Die Skala der Ausbildung ist der rote Faden der klassischen Reitlehre. Sie beschreibt, worauf es in der Ausbildung jedes Pferdes ankommt – in einer sinnvollen Reihenfolge.",
      },
      explanation: {
        leicht: [
          "Die Skala hat sechs Stufen: Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung und Versammlung.",
          "Unten steht der Takt, oben die Versammlung. Wie bei einer Treppe kann man keine Stufe überspringen. Am Ende steht ein Pferd, das fein auf dich hört.",
        ],
        mittel: [
          "Die sechs Punkte: 1. Takt – gleichmäßige Tritte und Sprünge. 2. Losgelassenheit – arbeiten ohne Verspannung, schwingender Rücken. 3. Anlehnung – stete, weiche Verbindung zwischen Reiterhand und Pferdemaul, das Pferd tritt von hinten an das Gebiss heran. 4. Schwung – energischer Impuls aus der Hinterhand, über den schwingenden Rücken übertragen. 5. Geraderichtung – Hinterbeine spuren in die Richtung der Vorderbeine, das Pferd ist auf beiden Händen gleichmäßig. 6. Versammlung – die Hinterhand nimmt mehr Last auf, die Vorhand wird leichter, die Bewegungen werden erhabener.",
          "Die Punkte bauen aufeinander auf und hängen zusammen: Ohne Takt keine Losgelassenheit, ohne Losgelassenheit keine echte Anlehnung. Man unterscheidet drei Phasen – Gewöhnung, Entwicklung der Schubkraft und Entwicklung der Tragkraft.",
          "Ziel ist die Durchlässigkeit: Das Pferd nimmt die Hilfen willig an und lässt sie durch seinen ganzen Körper wirken. Auch in jeder einzelnen Reitstunde arbeitet man sich von unten nach oben.",
        ],
      },
      illustration: tag("Takt · Losgelassenheit · Anlehnung · Schwung · Geraderichtung · Versammlung"),
      terms: [
        { term: "Anlehnung", meaning: "Weiche, stete Verbindung zwischen Reiterhand und Pferdemaul." },
        { term: "Schwung", meaning: "Energischer Impuls aus der Hinterhand über den schwingenden Rücken." },
        { term: "Durchlässigkeit", meaning: "Das Pferd nimmt die Hilfen willig an – das Ziel der Ausbildung." },
      ],
      exercise: [
        {
          type: "code",
          id: "ra-w13-l2-stufen",
          prompt: { leicht: "Welche Stufe hat welche Nummer? Gib die Zahlen ein.", mittel: "Ordne die Punkte der Skala: Welche Nummer haben sie?" },
          digits: [
            { riddle: "Takt", answer: 1, hint: "Der Takt ist die Grundlage – ganz unten." },
            { riddle: "Losgelassenheit", answer: 2, hint: "Direkt nach dem Takt kommt die Lockerheit." },
            { riddle: "Schwung", answer: 4, hint: "Erst Takt, Losgelassenheit und Anlehnung – dann Schwung." },
            { riddle: "Versammlung", answer: 6, hint: "Die Versammlung ist ganz oben." },
          ],
          success: { leicht: "Super! Takt 1, Losgelassenheit 2, Schwung 4, Versammlung 6.", mittel: "Richtig – Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung." },
        },
      ],
      quiz: [
        {
          id: "unten",
          prompt: "Was steht ganz unten auf der Skala der Ausbildung?",
          options: [
            ok("takt", "Der Takt"),
            no("versammlung", "Die Versammlung", "Die Versammlung steht ganz oben."),
            no("schwung", "Der Schwung", "Der Schwung ist Stufe vier."),
          ],
          explain: "Richtig! Ohne gleichmäßigen Takt funktioniert nichts anderes.",
        },
        {
          id: "wie-viele",
          prompt: "Wie viele Punkte hat die Skala?",
          options: [
            ok("sechs", "Sechs"),
            no("drei", "Drei", "Es sind sechs Punkte – in drei Phasen."),
            no("zehn", "Zehn", "Es sind sechs."),
          ],
          explain: "Genau: Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung.",
        },
        {
          id: "treppe",
          prompt: "Kann man eine Stufe einfach überspringen?",
          options: [
            ok("nein", "Nein, die Stufen bauen aufeinander auf"),
            no("ja", "Ja, wenn man es eilig hat", "Wer Stufen überspringt, bekommt Probleme an anderer Stelle."),
            no("nur-oben", "Nur die oberen", "Alle Stufen sind wichtig."),
          ],
          explain: "Richtig! Wie bei einer Treppe.",
        },
        {
          id: "anlehnung",
          levels: ["mittel"],
          prompt: "Was beschreibt die Anlehnung?",
          options: [
            ok("verbindung", "Eine stete, weiche Verbindung zum Pferdemaul, in die das Pferd von hinten herantritt"),
            no("ziehen", "Der Reiter zieht den Kopf des Pferdes herunter", "Anlehnung entsteht von hinten nach vorn – nicht durch Ziehen."),
            no("lehnen", "Das Pferd lehnt sich an die Bande", "Das ist mit Anlehnung nicht gemeint."),
          ],
          explain: "Genau. Die Anlehnung wird vom Pferd gesucht, nicht von der Hand erzwungen.",
        },
        {
          id: "ziel",
          levels: ["mittel"],
          prompt: "Was ist das Ziel der ganzen Skala?",
          options: [
            ok("durchlaessig", "Durchlässigkeit: Das Pferd nimmt die Hilfen willig an"),
            no("schnell", "Ein möglichst schnelles Pferd", "Es geht um Feinheit, nicht um Geschwindigkeit."),
            no("hoch", "Ein Pferd, das sehr hoch springt", "Das ist kein Ziel der Skala."),
          ],
          explain: "Richtig. Durchlässigkeit macht das Reiten fein und gesund für das Pferd.",
        },
      ],
      merksatz: {
        leicht: "Takt – Losgelassenheit – Anlehnung – Schwung – Geraderichtung – Versammlung.",
        mittel: "Die Skala baut auf: vom Takt bis zur Versammlung – mit dem Ziel Durchlässigkeit, in der Ausbildung und in jeder Reitstunde.",
      },
      readTogether: true,
    },

    /* ---------- 3. Stellung und Biegung ---------- */
    {
      slug: "stellung-und-biegung",
      title: "Stellung und Biegung",
      speaker: "ben",
      intro: {
        leicht: "Auf einem Kreis biegt sich dein Pferd wie eine Banane. Wie macht man das?",
        mittel: "Stellung und Biegung sind die Grundlage aller gebogenen Linien und Seitengänge. Der Unterschied ist wichtig: Stellung ist nur im Genick, Biegung geht durch den ganzen Körper.",
      },
      explanation: {
        leicht: [
          "Stellung heißt: Das Pferd dreht den Kopf ein kleines bisschen nach innen. Du siehst gerade so sein inneres Auge.",
          "Biegung heißt: Das ganze Pferd biegt sich wie eine Banane um dein inneres Bein herum. Das brauchst du auf Kreisen und in Ecken.",
        ],
        mittel: [
          "Stellung ist die seitliche Biegung im Genick: Der Reiter sieht gerade das innere Auge und den inneren Nüsternrand. Der Mähnenkamm kippt leicht zur gestellten Seite. Der Hals bleibt dabei möglichst gerade vor dem Widerrist – ein abgeknickter Hals ist ein Fehler.",
          "Längsbiegung ist die gleichmäßige Biegung des ganzen Pferdes von Genick bis Schweif um den inneren Schenkel, passend zur Linie: Auf dem Zirkel weniger, in der Volte mehr. Das innere Hinterbein tritt vermehrt unter den Schwerpunkt.",
          "Hilfen: Gewicht etwas mehr auf dem inneren Gesäßknochen, innerer Schenkel am Gurt (Biegungsträger und vorwärtstreibend), äußerer Schenkel eine Handbreit hinter dem Gurt verwahrend. Der innere Zügel stellt mit leichten Impulsen, der äußere Zügel gibt so weit nach, wie es die Stellung erfordert, und begrenzt die Biegung im Hals. Gestellt wird nie durch Ziehen am inneren Zügel allein.",
        ],
      },
      illustration: scene("ak-bahn-volte"),
      terms: [
        { term: "Stellung", meaning: "Seitliche Biegung nur im Genick – du siehst das innere Auge." },
        { term: "Längsbiegung", meaning: "Gleichmäßige Biegung des ganzen Pferdes um den inneren Schenkel." },
        { term: "Verwahrender Schenkel", meaning: "Äußerer Schenkel hinter dem Gurt, verhindert das Ausweichen der Hinterhand." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w13-l3-hilfen",
          prompt: { leicht: "Wer macht was beim Biegen? Ordne zu.", mittel: "Ordne die Hilfen für Stellung und Biegung ihrer Aufgabe zu." },
          targets: [
            { id: "innen", label: "Innen" },
            { id: "aussen", label: "Außen" },
          ],
          items: [
            card("schenkel-gurt", "Schenkel am Gurt – Biegungsträger", item("ak-schenkel"), "innen", "Richtig – um diesen Schenkel biegt sich das Pferd.", "Der Biegungsträger ist der innere Schenkel."),
            card("zuegel-stellt", "Zügel stellt mit leichten Impulsen", item("ak-zuegel"), "innen", "Genau, der innere Zügel stellt.", "Gestellt wird mit dem inneren Zügel."),
            card("schenkel-hinter", "Schenkel verwahrt hinter dem Gurt", item("ak-stopp"), "aussen", "Richtig! Er hält die Hinterhand auf der Linie.", "Verwahren tut der äußere Schenkel."),
            card("zuegel-begrenzt", "Zügel gibt nach und begrenzt", item("ak-hand-stopp"), "aussen", "Genau – der äußere Zügel begrenzt die Halsbiegung.", "Begrenzen tut der äußere Zügel."),
          ],
        },
      ],
      quiz: [
        {
          id: "stellung",
          prompt: "Was siehst du, wenn dein Pferd richtig nach innen gestellt ist?",
          options: [
            ok("auge", "Gerade so das innere Auge"),
            no("ganzer-kopf", "Den ganzen Kopf von der Seite", "Das wäre viel zu viel – der Hals wäre abgeknickt."),
            no("nichts", "Gar nichts vom Kopf", "Dann wäre das Pferd nicht gestellt."),
          ],
          explain: "Richtig! Das innere Auge und den Nüsternrand – mehr nicht.",
        },
        {
          id: "banane",
          prompt: "Was bedeutet Biegung?",
          options: [
            ok("ganz", "Das ganze Pferd biegt sich gleichmäßig, wie eine Banane"),
            no("hals", "Nur der Hals biegt sich stark", "Nur den Hals zu biegen ist ein Fehler."),
            no("beine", "Die Beine biegen sich", "Gemeint ist die Biegung des Körpers."),
          ],
          explain: "Genau – um dein inneres Bein herum.",
        },
        {
          id: "wo",
          prompt: "Wo brauchst du Biegung?",
          options: [
            ok("kreis", "Auf Kreisen, in Ecken und Wendungen"),
            no("gerade", "Nur auf geraden Linien", "Auf geraden Linien ist das Pferd gerade."),
            no("nie", "Nie", "Auf jeder gebogenen Linie biegt sich das Pferd."),
          ],
          explain: "Richtig! Je kleiner der Kreis, desto mehr Biegung.",
        },
        {
          id: "ziehen",
          levels: ["mittel"],
          prompt: "Warum stellst du nicht nur durch Ziehen am inneren Zügel?",
          options: [
            ok("hals", "Der Hals knickt ab und das Pferd fällt über die äußere Schulter"),
            no("schneller", "Weil das Pferd sonst schneller wird", "Das Problem ist der abgeknickte Hals."),
            no("egal", "Das ist egal", "Ziehen allein ergibt keine echte Stellung."),
          ],
          explain: "Genau. Stellung entsteht aus dem Zusammenspiel aller Hilfen.",
        },
        {
          id: "zirkel-volte",
          levels: ["mittel"],
          prompt: "Wo braucht das Pferd mehr Längsbiegung?",
          options: [
            ok("volte", "In der Volte"),
            no("zirkel", "Auf dem Zirkel", "Der Zirkel ist größer – dort braucht es weniger Biegung."),
            no("diagonale", "Auf der Diagonale", "Auf geraden Linien ist das Pferd gerade."),
          ],
          explain: "Richtig. Die Biegung passt sich der Krümmung der Linie an.",
        },
      ],
      merksatz: {
        leicht: "Stellung: Ich sehe das innere Auge. Biegung: Das ganze Pferd ist eine Banane.",
        mittel: "Stellung = Genick, Biegung = ganzes Pferd. Innen: Gewicht, Schenkel am Gurt, Zügel stellt. Außen: Schenkel verwahrt, Zügel begrenzt.",
      },
    },

    /* ---------- 4. Tempi ---------- */
    {
      slug: "tempi",
      title: "Tempi: versammelt bis stark",
      speaker: "mila",
      intro: {
        leicht: "Ein Pferd kann kleine oder große Schritte machen – und trotzdem im gleichen Takt bleiben!",
        mittel: "In jeder Gangart gibt es verschiedene Tempi. Sie unterscheiden sich nicht durch schnellere Beine, sondern durch längere oder kürzere, erhabenere Tritte – bei gleichem Takt.",
      },
      explanation: {
        leicht: [
          "Arbeitstempo ist das normale Tempo. Beim Zulegen macht das Pferd größere Schritte und wird länger. Bei der Versammlung macht es kleinere, höhere Schritte.",
          "Wichtig: Das Pferd soll nicht einfach rennen! Die Beine bewegen sich im gleichen Takt, nur die Schritte werden größer oder kleiner.",
        ],
        mittel: [
          "Trab und Galopp: Arbeitstempo (Grundtempo der Ausbildung), versammeltes Tempo (kürzere, erhabenere Tritte, mehr Last auf der Hinterhand), Mitteltempo (deutlich verlängerte Tritte mit erweitertem Rahmen) und starkes Tempo (größtmögliche Raumgriff bei erhaltenem Takt). Im Schritt unterscheidet man Mittelschritt, versammelten und starken Schritt sowie freien Schritt am langen Zügel.",
          "Beim Zulegen treibt der Reiter vermehrt mit Gewicht und Schenkeln, die Hand lässt den Rahmen etwas weiter werden, damit sich das Pferd strecken kann. Beim Zurückführen nimmt man das Pferd mit halben Paraden wieder auf, ohne dass es auf die Vorhand fällt.",
          "Typischer Fehler: Das Pferd wird nur eiliger („rennt“), die Tritte werden schneller statt länger. Dann stimmt der Takt nicht mehr – und Punkte gibt es dafür auch nicht.",
        ],
      },
      illustration: scene("ak-gang-trab"),
      terms: [
        { term: "Arbeitstempo", meaning: "Das Grundtempo zwischen versammelt und Mitteltempo." },
        { term: "Rahmen", meaning: "Die Länge und Haltung des Pferdes von Genick bis Schweif." },
        { term: "Zulegen", meaning: "Die Tritte verlängern, ohne den Takt zu ändern." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w13-l4-tempi",
          prompt: { leicht: "Welches Tempo ist das? Ordne zu.", mittel: "Ordne die Beschreibung dem richtigen Tempo zu." },
          targets: [
            { id: "versammelt", label: "versammelt" },
            { id: "arbeit", label: "Arbeitstempo" },
            { id: "stark", label: "starkes Tempo" },
          ],
          items: [
            card("kurz", "Kurze, hohe Tritte", tag("▲ ▲ ▲"), "versammelt", "Richtig – kurz, erhaben, Hinterhand trägt.", "Kurze, erhabene Tritte = versammelt."),
            card("normal", "Ruhige, normale Tritte", tag("— — —"), "arbeit", "Genau, das Grundtempo.", "Das ist das Arbeitstempo."),
            card("lang", "Ganz lange, raumgreifende Tritte", tag("⟶ ⟶"), "stark", "Richtig! Größter Raumgriff, Takt bleibt gleich.", "Größter Raumgriff = starkes Tempo."),
          ],
        },
      ],
      quiz: [
        {
          id: "zulegen",
          prompt: "Was passiert beim Zulegen?",
          options: [
            ok("laenger", "Die Tritte werden länger, der Takt bleibt gleich"),
            no("rennen", "Das Pferd rennt mit schnellen kleinen Schritten", "Das wäre eilig – nicht zugelegt."),
            no("hoeher", "Das Pferd springt hoch", "Die Tritte werden länger, nicht höher."),
          ],
          explain: "Richtig! Größere Schritte im gleichen Takt.",
        },
        {
          id: "versammelt",
          prompt: "Wie sehen versammelte Tritte aus?",
          options: [
            ok("kurz-hoch", "Kürzer und höher"),
            no("lang", "Ganz lang", "Lang sind die Tritte beim Zulegen."),
            no("muede", "Müde und schleppend", "Versammlung ist kraftvoll und erhaben."),
          ],
          explain: "Genau – dabei trägt die Hinterhand mehr Gewicht.",
        },
        {
          id: "normal",
          prompt: "Wie heißt das normale Grundtempo im Trab?",
          options: [
            ok("arbeit", "Arbeitstempo"),
            no("stark", "Starkes Tempo", "Das ist das größte Tempo."),
            no("schritt", "Schritt", "Schritt ist eine eigene Gangart."),
          ],
          explain: "Richtig! Von dort aus wird zugelegt oder versammelt.",
        },
        {
          id: "rahmen",
          levels: ["mittel"],
          prompt: "Was macht die Hand beim Zulegen?",
          options: [
            ok("weiter", "Sie lässt den Rahmen etwas weiter werden"),
            no("ziehen", "Sie zieht fester", "Dann könnte sich das Pferd nicht strecken."),
            no("loslassen", "Sie lässt die Zügel ganz los", "Die Verbindung bleibt erhalten."),
          ],
          explain: "Genau. Das Pferd darf sich strecken, die Anlehnung bleibt.",
        },
        {
          id: "schritt",
          levels: ["mittel"],
          prompt: "Welches Tempo gibt es nur im Schritt?",
          options: [
            ok("frei", "Freier Schritt am langen Zügel"),
            no("arbeit", "Arbeitstempo", "Arbeitstempo gibt es in Trab und Galopp."),
            no("mittel", "Mitteltempo", "Im Schritt heißt es Mittelschritt."),
          ],
          explain: "Richtig. Im Schritt gibt es kein Arbeitstempo, dafür den freien Schritt.",
        },
      ],
      merksatz: {
        leicht: "Kleine hohe Schritte oder große lange Schritte – aber immer im gleichen Takt!",
        mittel: "Versammelt – Arbeitstempo – Mittel – stark: Die Tritte ändern Länge und Erhabenheit, der Takt bleibt.",
      },
    },

    /* ---------- 5. Vorhandwendung ---------- */
    {
      slug: "vorhandwendung",
      title: "Vorhandwendung",
      speaker: "lea",
      intro: {
        leicht: "Bei der Vorhandwendung bleibt das Pferd vorn fast stehen und dreht sich hinten herum.",
        mittel: "Die Vorhandwendung ist eine lösende Übung aus dem Halten. Sie lehrt Pferd und Reiter den seitwärtstreibenden Schenkel.",
      },
      explanation: {
        leicht: [
          "Das Pferd steht. Dann tritt es mit den Hinterbeinen Schritt für Schritt zur Seite, und die Vorderbeine treten fast auf der Stelle. So dreht es sich halb herum.",
          "Dein Bein liegt etwas hinter dem Gurt und bittet die Hinterbeine zur Seite. Das andere Bein passt auf. Nach jedem Schritt gibst du kurz nach.",
        ],
        mittel: [
          "Ablauf: Aus dem Halt, auf dem zweiten Hufschlag oder der Viertellinie (damit Platz zur Bande ist). Die Hinterhand tritt in einer halben Kreisbahn um die Vorhand, das innere Vorderbein tritt fast auf der Stelle. Nach 180 Grad steht das Pferd in der Gegenrichtung und wird geradeaus angeritten.",
          "Hilfen für eine Vorhandwendung nach links (Hinterhand weicht nach rechts): Das Pferd ist leicht links gestellt. Der linke Schenkel liegt eine Handbreit hinter dem Gurt und treibt Tritt für Tritt seitwärts. Der rechte Schenkel liegt verwahrend hinter dem Gurt und begrenzt. Der rechte Zügel verhindert, dass das Pferd vorwärts tritt. Das Gewicht bleibt mittig bis leicht links.",
          "Fehler: Das Pferd tritt zurück oder läuft vorwärts weg, die Vorhand bewegt sich zu viel, Hilfen kommen dauerhaft statt Tritt für Tritt. Die Vorhandwendung ist eine Lern- und Lösungsübung – in Prüfungen höherer Klassen kommt sie nicht vor.",
        ],
      },
      illustration: scene("ak-oben-vorhandwendung"),
      terms: [
        { term: "Vorhand", meaning: "Der vordere Teil des Pferdes: Kopf, Hals, Schultern, Vorderbeine." },
        { term: "Hinterhand", meaning: "Der hintere Teil: Kruppe und Hinterbeine." },
        { term: "Seitwärtstreibender Schenkel", meaning: "Schenkel hinter dem Gurt, der die Hinterhand zur Seite bittet." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w13-l5-bild",
          prompt: { leicht: "Welches Bild zeigt die Vorhandwendung?", mittel: "Welche Skizze zeigt die Vorhandwendung?" },
          layout: "pictures",
          options: [
            { id: "vorhand", label: "Die Hinterhand dreht um die Vorderbeine", visual: scene("ak-oben-vorhandwendung"), correct: true },
            { id: "hinterhand", label: "Die Vorhand dreht um die Hinterbeine", visual: scene("ak-oben-hinterhandwendung"), feedback: "Das ist die Hinterhandwendung – genau umgekehrt." },
            { id: "rueck", label: "Das Pferd tritt rückwärts", visual: scene("ak-oben-rueckwaerts"), feedback: "Das ist das Rückwärtsrichten." },
          ],
          explain: "Richtig! Die Vorderbeine bleiben fast an Ort und Stelle, die Hinterhand dreht.",
        },
      ],
      quiz: [
        {
          id: "was",
          prompt: "Was dreht sich bei der Vorhandwendung?",
          options: [
            ok("hinterhand", "Die Hinterhand dreht sich um die Vorhand"),
            no("vorhand", "Die Vorhand dreht sich um die Hinterhand", "Das ist die Hinterhandwendung."),
            no("nichts", "Gar nichts – das Pferd steht still", "Das Pferd dreht sich um 180 Grad."),
          ],
          explain: "Genau. Vorn tritt das Pferd fast auf der Stelle.",
        },
        {
          id: "schenkel",
          prompt: "Wo liegt dein seitwärtstreibender Schenkel?",
          options: [
            ok("hinter", "Eine Handbreit hinter dem Gurt"),
            no("vorn", "Ganz vorn am Pferdehals", "Dort liegt kein Schenkel."),
            no("weg", "Weit weg vom Pferd", "Der Schenkel liegt am Pferd und gibt Impulse."),
          ],
          explain: "Richtig! Von dort bittet er die Hinterbeine zur Seite.",
        },
        {
          id: "start",
          prompt: "Woraus beginnt eine Vorhandwendung?",
          options: [
            ok("halt", "Aus dem Halten"),
            no("galopp", "Aus dem Galopp", "Die Vorhandwendung beginnt im Stehen."),
            no("trab", "Aus dem Trab", "Erst wird angehalten."),
          ],
          explain: "Genau – Tritt für Tritt und ganz ruhig.",
        },
        {
          id: "zweiter",
          levels: ["mittel"],
          prompt: "Warum reitest du die Vorhandwendung nicht direkt an der Bande?",
          options: [
            ok("platz", "Damit Kopf und Hals Platz zur Bande haben"),
            no("verboten", "Weil es verboten ist", "Es geht ganz praktisch um Platz."),
            no("richter", "Damit die Richter es besser sehen", "In Prüfungen kommt sie gar nicht vor."),
          ],
          explain: "Richtig – deshalb auf dem zweiten Hufschlag oder der Viertellinie.",
        },
        {
          id: "aussen",
          levels: ["mittel"],
          prompt: "Was macht der äußere (verwahrende) Schenkel bei der Vorhandwendung?",
          options: [
            ok("begrenzen", "Er begrenzt und kontrolliert das Seitwärtstreten"),
            no("treiben", "Er treibt die Hinterhand in dieselbe Richtung", "Treiben tut der andere Schenkel."),
            no("nichts", "Er hat keine Aufgabe", "Ohne ihn würde das Pferd zu schnell oder unkontrolliert herumschwingen."),
          ],
          explain: "Genau. So tritt das Pferd ruhig Tritt für Tritt.",
        },
      ],
      merksatz: {
        leicht: "Vorn fast stehen, hinten herumtreten – mein Bein bittet Schritt für Schritt.",
        mittel: "Vorhandwendung: aus dem Halt, leicht gestellt, Schenkel hinter dem Gurt treibt seitwärts, der andere verwahrt – Tritt für Tritt.",
      },
    },

    /* ---------- 6. Schenkelweichen ---------- */
    {
      slug: "schenkelweichen",
      title: "Schenkelweichen",
      speaker: "ben",
      intro: {
        leicht: "Beim Schenkelweichen geht dein Pferd vorwärts und gleichzeitig zur Seite!",
        mittel: "Schenkelweichen ist der einfachste Seitengang. Das Pferd lernt, dem Schenkel vorwärts-seitwärts zu weichen – Grundlage für alle späteren Seitengänge.",
      },
      explanation: {
        leicht: [
          "Das Pferd läuft schräg. Die Beine auf einer Seite kreuzen vor den anderen Beinen. Dabei schaut das Pferd ein kleines bisschen weg von der Richtung, in die es geht.",
          "Dein Bein auf der einen Seite bittet das Pferd zur Seite. Das andere Bein passt auf, dass es nicht zu schnell wird.",
        ],
        mittel: [
          "Beim Schenkelweichen ist das Pferd bis auf eine leichte Stellung im Genick gerade und tritt vorwärts-seitwärts. Es ist gegen die Bewegungsrichtung gestellt. Die inneren Beine (auf der Seite der Stellung) treten vor und über die äußeren. Der Winkel zur Bande beträgt höchstens etwa 45 Grad. Typisch: an der langen Seite mit dem Kopf zur Bande oder auf der Diagonale.",
          "Hilfen (Stellung links, das Pferd weicht nach rechts): Gewicht leicht auf den linken Gesäßknochen, linker Schenkel etwas hinter dem Gurt treibt vorwärts-seitwärts, rechter Schenkel liegt verwahrend hinter dem Gurt und sorgt für das Vorwärts. Der linke Zügel stellt, der rechte begrenzt die Stellung und verhindert, dass die Schulter ausfällt.",
          "Fehler: zu viel Halsbiegung, die Schulter fällt voraus, das Pferd eilt, verliert den Takt oder tritt nur seitwärts ohne Vorwärts. Schenkelweichen ist eine Lösungsübung und wird nur kurz geritten.",
        ],
      },
      illustration: scene("ak-oben-schenkelweichen"),
      terms: [
        { term: "Seitengang", meaning: "Lektion, bei der das Pferd vorwärts-seitwärts tritt." },
        { term: "Überkreuzen", meaning: "Die inneren Beine treten vor und über die äußeren." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w13-l6-merkmale",
          prompt: { leicht: "Was stimmt beim Schenkelweichen? Tippe alles Richtige an.", mittel: "Welche Merkmale gehören zum Schenkelweichen?" },
          options: [
            { id: "vorwaerts-seit", label: "Vorwärts und seitwärts", visual: tag("↗"), correct: true },
            { id: "kreuzen", label: "Beine kreuzen sich", visual: tag("✕"), correct: true },
            { id: "stellung", label: "Leichte Stellung weg von der Bewegungsrichtung", visual: item("ak-zuegel"), correct: true, levels: ["mittel"] },
            { id: "biegung", label: "Starke Biegung im ganzen Körper", visual: item("ak-schaukel"), feedback: "Das Pferd ist bis auf das Genick gerade." },
            { id: "rennen", label: "Schnell und eilig", visual: item("ak-blitz"), feedback: "Ruhig und im Takt – nicht eilig." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas.", mittel: "Es fehlt noch mindestens ein Merkmal." },
          explain: "Richtig! Vorwärts-seitwärts, überkreuzend, leicht gegen die Bewegungsrichtung gestellt.",
        },
      ],
      quiz: [
        {
          id: "wohin",
          prompt: "In welche Richtung geht das Pferd beim Schenkelweichen?",
          options: [
            ok("vs", "Vorwärts und seitwärts"),
            no("rueck", "Rückwärts", "Rückwärts ist eine andere Lektion."),
            no("hoch", "Nach oben", "Das Pferd bleibt am Boden."),
          ],
          explain: "Genau – schräg nach vorn zur Seite.",
        },
        {
          id: "bein",
          prompt: "Was bittet das Pferd zur Seite?",
          options: [
            ok("schenkel", "Dein Schenkel etwas hinter dem Gurt"),
            no("zuegel", "Der Zügel zieht es hinüber", "Der Schenkel bewirkt das Seitwärts."),
            no("stimme", "Nur deine Stimme", "Die Stimme lobt – den Weg zeigt der Schenkel."),
          ],
          explain: "Richtig! Daher kommt auch der Name: Das Pferd weicht dem Schenkel.",
        },
        {
          id: "kreuzen",
          prompt: "Was machen die Beine beim Schenkelweichen?",
          options: [
            ok("kreuzen", "Sie kreuzen sich"),
            no("huepfen", "Sie hüpfen", "Das Pferd tritt ruhig im Takt."),
            no("still", "Sie stehen still", "Das Pferd bewegt sich vorwärts-seitwärts."),
          ],
          explain: "Genau – die inneren Beine treten über die äußeren.",
        },
        {
          id: "stellung",
          levels: ["mittel"],
          prompt: "Wie ist das Pferd beim Schenkelweichen gestellt?",
          options: [
            ok("gegen", "Leicht gegen die Bewegungsrichtung"),
            no("mit", "In Bewegungsrichtung gebogen", "Das wären Travers oder Traversale."),
            no("stark", "Stark im ganzen Körper gebogen", "Beim Schenkelweichen ist das Pferd bis auf das Genick gerade."),
          ],
          explain: "Richtig. Das unterscheidet es von den gebogenen Seitengängen.",
        },
        {
          id: "winkel",
          levels: ["mittel"],
          prompt: "Wie groß ist der Winkel zur Bande höchstens?",
          options: [
            ok("45", "Etwa 45 Grad"),
            no("90", "90 Grad", "Dann ginge das Pferd nur noch seitwärts."),
            no("10", "Nur 10 Grad", "Das wäre kaum zu sehen."),
          ],
          explain: "Genau. Das Vorwärts muss immer erhalten bleiben.",
        },
      ],
      merksatz: {
        leicht: "Vorwärts und seitwärts, Beine kreuzen – mein Bein bittet, das andere passt auf.",
        mittel: "Schenkelweichen: gerade bis auf leichte Stellung gegen die Bewegungsrichtung, innerer Schenkel treibt vorwärts-seitwärts, höchstens ca. 45°.",
      },
    },

    /* ---------- 7. Schulterherein ---------- */
    {
      slug: "schulterherein",
      title: "Schulterherein",
      speaker: "mila",
      intro: {
        leicht: "Beim Schulterherein kommt die Schulter des Pferdes ein Stück in die Bahn herein.",
        mittel: "Schulterherein gilt als „Mutter aller Seitengänge“. Es macht das Pferd geschmeidig, gerade und fördert das Untertreten des inneren Hinterbeins.",
      },
      explanation: {
        leicht: [
          "Das Pferd geht an der Bande entlang, aber seine Schultern sind ein Stück weiter innen als die Hinterbeine. Es ist ein bisschen gebogen und schaut nach innen.",
          "Von vorn sieht man drei Hufspuren statt zwei. Dein inneres Bein liegt am Gurt und bittet das Pferd vorwärts-seitwärts.",
        ],
        mittel: [
          "Beim Schulterherein wird die Vorhand so weit hereingeführt, dass das Pferd auf drei Hufschlaglinien geht: Das äußere Vorderbein und das innere Hinterbein spuren auf derselben Linie. Das Pferd ist um den inneren Schenkel gebogen, also gegen die Bewegungsrichtung, und bewegt sich an der Bande entlang vorwärts.",
          "Hilfen (auf der linken Hand): Gewicht leicht links, linker Schenkel am Gurt treibt vorwärts-seitwärts und ist Biegungsträger, rechter Schenkel verwahrend hinter dem Gurt. Linker Zügel stellt und führt die Vorhand mit herein, rechter Zügel begrenzt Stellung und Tempo. Die Schultern des Reiters drehen mit den Schultern des Pferdes mit.",
          "Vorstufe ist das Schultervor mit weniger Abstellung (vier Spuren, das innere Hinterbein spurt zwischen die Vorderbeine). Fehler: nur Halsbiegung statt Biegung im ganzen Pferd, zu viel Abstellung, Takt- oder Schwungverlust, herausfallende Hinterhand.",
        ],
      },
      illustration: scene("ak-oben-schulterherein"),
      terms: [
        { term: "Drei Hufspuren", meaning: "Äußeres Vorderbein und inneres Hinterbein treten auf einer Linie." },
        { term: "Abstellung", meaning: "Wie weit die Vorhand oder Hinterhand von der Linie hereingenommen wird." },
        { term: "Schultervor", meaning: "Vorstufe des Schulterhereins mit weniger Abstellung." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w13-l7-spuren",
          prompt: { leicht: "Wie viele Hufspuren siehst du beim Schulterherein?", mittel: "Auf wie vielen Hufschlaglinien geht das Pferd im Schulterherein?" },
          visual: scene("ak-oben-schulterherein"),
          options: [
            { id: "drei", label: "Drei", correct: true },
            { id: "zwei", label: "Zwei", feedback: "Zwei Spuren hat das Pferd beim Geradeausgehen." },
            { id: "vier", label: "Vier", feedback: "Vier Spuren haben Travers und Renvers." },
          ],
          explain: "Richtig! Äußeres Vorderbein und inneres Hinterbein treten auf derselben Linie.",
        },
      ],
      quiz: [
        {
          id: "was",
          prompt: "Was kommt beim Schulterherein in die Bahn herein?",
          options: [
            ok("schulter", "Die Schulter, also die Vorhand"),
            no("kruppe", "Die Kruppe, also die Hinterhand", "Das wäre der Travers."),
            no("nichts", "Nichts, das Pferd geht gerade", "Beim Schulterherein ist die Vorhand innen."),
          ],
          explain: "Richtig – daher der Name: Die Schulter kommt herein.",
        },
        {
          id: "gebogen",
          prompt: "Ist das Pferd im Schulterherein gebogen?",
          options: [
            ok("ja", "Ja, um das innere Bein des Reiters"),
            no("nein", "Nein, es ist ganz gerade", "Gerade ist es beim Schenkelweichen – hier ist es gebogen."),
            no("aussen", "Ja, nach außen zur Bande", "So wäre es beim Renvers."),
          ],
          explain: "Genau. Das macht es zu einer wertvollen Biegeübung.",
        },
        {
          id: "mutter",
          prompt: "Wie nennt man das Schulterherein auch?",
          options: [
            ok("mutter", "Mutter aller Seitengänge"),
            no("koenig", "König der Sprünge", "Das Schulterherein ist eine Dressurlektion."),
            no("trick", "Pferdetrick", "Es ist eine klassische Gymnastikübung."),
          ],
          explain: "Richtig – viele andere Seitengänge bauen darauf auf.",
        },
        {
          id: "spur",
          levels: ["mittel"],
          prompt: "Welche Beine spuren im Schulterherein auf derselben Linie?",
          options: [
            ok("aussen-vorn-innen-hinten", "Äußeres Vorderbein und inneres Hinterbein"),
            no("vorne", "Beide Vorderbeine", "Die Vorderbeine gehen auf zwei verschiedenen Linien."),
            no("innen", "Inneres Vorderbein und inneres Hinterbein", "Das innere Vorderbein ist am weitesten innen."),
          ],
          explain: "Genau – so entstehen drei Spuren.",
        },
        {
          id: "fehler",
          levels: ["mittel"],
          prompt: "Was ist ein typischer Fehler im Schulterherein?",
          options: [
            ok("hals", "Nur der Hals ist gebogen, der Körper nicht"),
            no("drei", "Das Pferd geht auf drei Spuren", "Das ist ja gerade richtig."),
            no("takt", "Der Takt bleibt gleichmäßig", "Ein gleichmäßiger Takt ist erwünscht."),
          ],
          explain: "Richtig. Die Biegung muss durch das ganze Pferd gehen.",
        },
      ],
      merksatz: {
        leicht: "Schulter herein, drei Hufspuren, das Pferd biegt sich um mein inneres Bein.",
        mittel: "Schulterherein: Vorhand herein, drei Spuren, gebogen gegen die Bewegungsrichtung – innen treiben und biegen, außen begrenzen.",
      },
    },

    /* ---------- 8. Travers und Renvers ---------- */
    {
      slug: "travers-und-renvers",
      title: "Travers und Renvers",
      speaker: "lea",
      intro: {
        leicht: "Travers und Renvers sind Zwillinge: Einmal ist die Kruppe innen, einmal die Schulter.",
        mittel: "Travers und Renvers sind gebogene Seitengänge auf vier Hufspuren. Im Unterschied zum Schulterherein ist das Pferd in Bewegungsrichtung gebogen.",
      },
      explanation: {
        leicht: [
          "Beim Travers bleiben die Vorderbeine an der Bande und die Hinterbeine kommen nach innen. Das Pferd schaut in die Richtung, in die es geht.",
          "Beim Renvers ist es umgekehrt: Die Hinterbeine bleiben an der Bande und die Vorderbeine sind innen. Das Pferd biegt sich zur Bande hin.",
        ],
        mittel: [
          "Travers („Kruppe herein“): Die Vorhand bleibt auf dem Hufschlag, die Hinterhand wird etwa 30 Grad hereingeführt. Das Pferd ist in Bewegungsrichtung gestellt und gebogen und geht auf vier Hufspuren; die äußeren Beine treten vor und über die inneren.",
          "Renvers („Kruppe heraus“): das Gegenstück. Die Hinterhand bleibt auf dem Hufschlag, die Vorhand wird hereingeführt, das Pferd ist zur Bande hin, also wieder in Bewegungsrichtung, gebogen. Auch hier: vier Hufspuren.",
          "Hilfen Travers (linke Hand): Gewicht links, linker Schenkel am Gurt als Biegungsträger und für das Vorwärts, rechter Schenkel hinter dem Gurt treibt die Hinterhand seitwärts herein. Linker Zügel stellt, rechter begrenzt. Für den Renvers gelten die Hilfen spiegelbildlich bezogen auf die neue Biegung. Fehler: zu große Abstellung, verlorener Takt, Biegung nur im Hals.",
        ],
      },
      illustration: scene("ak-oben-travers"),
      terms: [
        { term: "Travers", meaning: "Kruppe herein: Vorhand auf dem Hufschlag, Hinterhand innen." },
        { term: "Renvers", meaning: "Kruppe heraus: Hinterhand auf dem Hufschlag, Vorhand innen." },
        { term: "In Bewegungsrichtung gebogen", meaning: "Das Pferd schaut dorthin, wohin es geht." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w13-l8-zuordnen",
          prompt: { leicht: "Welches Bild gehört zu welchem Namen?", mittel: "Ordne die Skizzen den Seitengängen zu." },
          targets: [
            { id: "travers", label: "Travers" },
            { id: "renvers", label: "Renvers" },
            { id: "sh", label: "Schulterherein" },
          ],
          items: [
            card("t", "Hinterhand innen", { kind: "scene", scene: "ak-oben-travers" }, "travers", "Richtig – Kruppe herein ist Travers.", "Hinterhand innen = Travers."),
            card("r", "Vorhand innen, zur Bande gebogen", { kind: "scene", scene: "ak-oben-renvers" }, "renvers", "Genau, Kruppe heraus ist Renvers.", "Zur Bande gebogen = Renvers."),
            card("s", "Vorhand innen, drei Spuren", { kind: "scene", scene: "ak-oben-schulterherein" }, "sh", "Richtig – drei Spuren, gegen die Bewegungsrichtung gebogen.", "Drei Spuren = Schulterherein."),
          ],
        },
      ],
      quiz: [
        {
          id: "travers",
          prompt: "Was kommt beim Travers in die Bahn herein?",
          options: [
            ok("hinterhand", "Die Hinterhand"),
            no("vorhand", "Die Vorhand", "Das wäre Schulterherein oder Renvers."),
            no("reiter", "Nur der Reiter", "Das Pferd verändert seine Position."),
          ],
          explain: "Richtig – deshalb heißt der Travers auch „Kruppe herein“.",
        },
        {
          id: "renvers",
          prompt: "Wohin biegt sich das Pferd im Renvers?",
          options: [
            ok("bande", "Zur Bande hin, in Bewegungsrichtung"),
            no("innen", "Zur Bahnmitte", "Beim Renvers ist es zur Bande gebogen."),
            no("gar-nicht", "Gar nicht", "Der Renvers ist ein gebogener Seitengang."),
          ],
          explain: "Genau – das Gegenstück zum Travers.",
        },
        {
          id: "spuren",
          prompt: "Wie viele Hufspuren gibt es bei Travers und Renvers?",
          options: [
            ok("vier", "Vier"),
            no("drei", "Drei", "Drei Spuren hat das Schulterherein."),
            no("eine", "Eine", "Auf einer Spur kann kein Pferd laufen."),
          ],
          explain: "Richtig! Alle vier Beine gehen auf eigenen Linien.",
        },
        {
          id: "schenkel",
          levels: ["mittel"],
          prompt: "Welcher Schenkel bringt beim Travers die Hinterhand herein?",
          options: [
            ok("aussen", "Der äußere Schenkel hinter dem Gurt"),
            no("innen", "Der innere Schenkel am Gurt", "Der innere ist Biegungsträger und sorgt für das Vorwärts."),
            no("keiner", "Keiner, das macht der Zügel", "Die Hinterhand wird vom Schenkel bewegt."),
          ],
          explain: "Genau. Der innere Schenkel bleibt Biegungsträger.",
        },
        {
          id: "unterschied",
          levels: ["mittel"],
          prompt: "Was unterscheidet Travers grundsätzlich vom Schulterherein?",
          options: [
            ok("biegung", "Im Travers ist das Pferd in Bewegungsrichtung gebogen"),
            no("gangart", "Travers geht nur im Schritt", "Travers wird auch im Trab und Galopp geritten."),
            no("gleich", "Es gibt keinen Unterschied", "Biegung und Spurenzahl sind verschieden."),
          ],
          explain: "Richtig. Beim Schulterherein ist es gegen die Bewegungsrichtung gebogen.",
        },
      ],
      merksatz: {
        leicht: "Travers: hinten herein. Renvers: vorn herein. Beide Male vier Hufspuren.",
        mittel: "Travers = Kruppe herein, Renvers = Kruppe heraus – vier Spuren, in Bewegungsrichtung gebogen, äußerer Schenkel führt die Hinterhand.",
      },
    },

    /* ---------- 9. Traversale ---------- */
    {
      slug: "traversale",
      title: "Die Traversale",
      speaker: "ben",
      intro: {
        leicht: "Die Traversale sieht aus, als würde das Pferd schräg durch die Bahn tanzen.",
        mittel: "Die Traversale ist ein Travers auf der Diagonalen. Sie verlangt viel Biegung, Versammlung und Kraft – in M- und S-Prüfungen auch als Zickzack.",
      },
      explanation: {
        leicht: [
          "Das Pferd geht schräg durch die Bahn, zum Beispiel von einer Ecke zur Mitte. Dabei schaut es in die Richtung, in die es geht, und die Beine kreuzen sich.",
          "Das Pferd bleibt fast parallel zur langen Seite. Die Schulter ist ein kleines bisschen vorn.",
        ],
        mittel: [
          "Bei der Traversale bewegt sich das Pferd auf einer diagonalen Linie vorwärts-seitwärts, nahezu parallel zur langen Seite, die Vorhand etwas voraus. Es ist in Bewegungsrichtung gestellt und gebogen, die äußeren Beine treten vor und über die inneren. Geritten wird sie im versammelten Trab oder Galopp.",
          "Hilfen (Traversale nach links): Gewicht links, linker Schenkel am Gurt als Biegungsträger und für das Vorwärts, rechter Schenkel hinter dem Gurt seitwärtstreibend. Linker Zügel stellt und führt, rechter Zügel begrenzt. Die Schulter wird mit den Hilfen vorausgeführt, damit die Hinterhand nicht vorausläuft.",
          "Häufige Fehler: Hinterhand voraus, Verlust des Taktes und der Biegung, Pferd verwirft sich im Genick. In schweren Klassen werden Zickzack-Traversalen mit mehreren Richtungswechseln verlangt.",
        ],
      },
      illustration: scene("ak-oben-traversale"),
      terms: [
        { term: "Traversale", meaning: "Travers auf der Diagonalen." },
        { term: "Vorausführen", meaning: "Die Vorhand führt in der Bewegung leicht." },
        { term: "Zickzack-Traversale", meaning: "Mehrere Traversalen mit Richtungswechsel, in schweren Klassen." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w13-l9-merkmale",
          prompt: { leicht: "Was stimmt bei der Traversale? Tippe alles Richtige an.", mittel: "Welche Merkmale gehören zur Traversale?" },
          options: [
            { id: "diagonal", label: "Schräg durch die Bahn", visual: tag("↘"), correct: true },
            { id: "biegung", label: "In Bewegungsrichtung gebogen", visual: item("ak-schaukel"), correct: true },
            { id: "parallel", label: "Fast parallel zur langen Seite", visual: tag("∥"), correct: true, levels: ["mittel"] },
            { id: "hinterhand-vor", label: "Hinterhand läuft voraus", visual: item("ak-stopp"), feedback: "Die Vorhand führt – Hinterhand voraus ist ein Fehler." },
            { id: "gerade", label: "Pferd ganz gerade wie beim Schenkelweichen", visual: tag("|"), feedback: "In der Traversale ist das Pferd gebogen." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas.", mittel: "Es fehlt noch mindestens ein Merkmal." },
          explain: "Richtig! Schräg, gebogen, fast parallel – Schulter leicht voraus.",
        },
      ],
      quiz: [
        {
          id: "wo",
          prompt: "Wo wird die Traversale geritten?",
          options: [
            ok("schraeg", "Schräg durch die Bahn"),
            no("bande", "Nur an der Bande entlang", "An der Bande wären es Travers oder Renvers."),
            no("kreis", "Im Kreis", "Die Traversale führt auf einer geraden Diagonalen."),
          ],
          explain: "Richtig! Ein Travers auf der Diagonalen.",
        },
        {
          id: "schaut",
          prompt: "Wohin schaut das Pferd in der Traversale?",
          options: [
            ok("richtung", "In die Richtung, in die es geht"),
            no("weg", "Weg von der Bewegungsrichtung", "So wäre es beim Schenkelweichen."),
            no("hinten", "Nach hinten", "Das Pferd schaut nach vorn in Bewegungsrichtung."),
          ],
          explain: "Genau – es ist in Bewegungsrichtung gebogen.",
        },
        {
          id: "beine",
          prompt: "Was machen die Beine?",
          options: [
            ok("kreuzen", "Die äußeren kreuzen vor die inneren"),
            no("nebeneinander", "Sie laufen ganz normal nebeneinander", "In der Traversale kreuzen die Beine."),
            no("springen", "Sie springen alle gleichzeitig", "Das Pferd bleibt im Takt seiner Gangart."),
          ],
          explain: "Richtig! Daran erkennt man jeden Seitengang.",
        },
        {
          id: "fehler",
          levels: ["mittel"],
          prompt: "Was ist der häufigste Fehler in der Traversale?",
          options: [
            ok("hinterhand", "Die Hinterhand läuft voraus"),
            no("vorhand", "Die Vorhand führt leicht", "Das ist richtig, kein Fehler."),
            no("gebogen", "Das Pferd ist gebogen", "Die Biegung ist erwünscht."),
          ],
          explain: "Genau. Die Vorhand muss leicht führen.",
        },
        {
          id: "gangart",
          levels: ["mittel"],
          prompt: "In welchen Gangarten wird die Traversale in Prüfungen geritten?",
          options: [
            ok("trab-galopp", "Im versammelten Trab und Galopp"),
            no("schritt", "Nur im Schritt", "In Prüfungen wird sie in Trab und Galopp verlangt."),
            no("arbeit", "Im Arbeitstrab am langen Zügel", "Sie braucht Versammlung und Anlehnung."),
          ],
          explain: "Richtig. Dafür braucht das Pferd Kraft und Versammlung.",
        },
      ],
      merksatz: {
        leicht: "Traversale: schräg durch die Bahn, in Bewegungsrichtung gebogen, Beine kreuzen.",
        mittel: "Traversale = Travers auf der Diagonalen: fast parallel zur langen Seite, Vorhand leicht voraus, in Bewegungsrichtung gebogen.",
      },
    },

    /* ---------- 10. Rückwärtsrichten ---------- */
    {
      slug: "rueckwaertsrichten",
      title: "Rückwärtsrichten",
      speaker: "mila",
      intro: {
        leicht: "Pferde können auch rückwärts gehen – ganz ruhig, Schritt für Schritt.",
        mittel: "Beim Rückwärtsrichten tritt das Pferd aus dem Halt in diagonalen Beinpaaren rückwärts. Es zeigt, wie gut das Pferd die Hilfen durchlässt.",
      },
      explanation: {
        leicht: [
          "Erst hält das Pferd an und steht gerade. Dann gibst du Hilfen wie zum Losreiten – aber die Hand lässt nicht nach vorn. Dann tritt das Pferd ein paar Schritte zurück.",
          "Danach reitest du sofort wieder vorwärts. Lehne dich dabei nie nach hinten!",
        ],
        mittel: [
          "Ablauf: Aus einem geschlossenen, geraden Halt tritt das Pferd in diagonalen Beinpaaren (wie im Trab, aber ohne Schwebephase) eine festgelegte Anzahl Tritte gerade zurück, zum Beispiel vier. Danach wird es sofort fließend vorwärts angeritten oder angehalten, wie verlangt.",
          "Hilfen: Beide Schenkel liegen eine Handbreit hinter dem Gurt und treiben wie zum Anreiten. Statt nachzugeben, nehmen die Zügel leicht an und verwandeln so den Impuls nach vorn in einen Tritt zurück. Sobald das Pferd zurücktritt, gibt die Hand jeweils nach. Der Oberkörper bleibt aufrecht oder entlastet minimal – ein Zurücklehnen blockiert den Rücken.",
          "Fehler: Ziehen am Zügel, Pferd tritt schief, eilt zurück, sperrt das Maul oder schleppt die Beine. Rückwärtsrichten ist keine Strafe, sondern eine Lektion, die Vertrauen und feine Hilfen braucht.",
        ],
      },
      illustration: scene("ak-oben-rueckwaerts"),
      terms: [
        { term: "Diagonale Beinpaare", meaning: "Vorderbein und gegenüberliegendes Hinterbein bewegen sich gemeinsam." },
        { term: "Geschlossener Halt", meaning: "Das Pferd steht gerade auf allen vier Beinen gleichmäßig." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w13-l10-hilfen",
          prompt: { leicht: "Was gehört zum Rückwärtsrichten? Tippe alles Richtige an.", mittel: "Welche Hilfen sind beim Rückwärtsrichten richtig?" },
          options: [
            { id: "halt", label: "Erst gerade anhalten", visual: item("ak-stopp"), correct: true },
            { id: "schenkel", label: "Beide Schenkel treiben wie zum Anreiten", visual: item("ak-schenkel"), correct: true },
            { id: "nachgeben", label: "Hand gibt nach jedem Tritt nach", visual: item("ak-herz"), correct: true },
            { id: "ziehen", label: "Fest am Zügel ziehen", visual: item("ak-blitz"), feedback: "Ziehen macht das Pferd fest und schief." },
            { id: "lehnen", label: "Sich weit nach hinten lehnen", visual: item("ak-schaukel"), feedback: "Zurücklehnen blockiert den Pferderücken." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas.", mittel: "Es fehlt noch mindestens eine richtige Hilfe." },
          explain: "Prima! Treiben, verhaltende Hand, nachgeben – und aufrecht bleiben.",
        },
      ],
      quiz: [
        {
          id: "zuerst",
          prompt: "Was passiert vor dem Rückwärtsrichten?",
          options: [
            ok("halt", "Das Pferd hält gerade an"),
            no("trab", "Das Pferd trabt an", "Rückwärts geht es aus dem Halt."),
            no("drehen", "Das Pferd dreht sich um", "Es bleibt gerade und tritt zurück."),
          ],
          explain: "Richtig! Ein gerader Halt ist die Voraussetzung.",
        },
        {
          id: "lehnen",
          prompt: "Lehnst du dich beim Rückwärtsrichten nach hinten?",
          options: [
            ok("nein", "Nein, ich bleibe aufrecht"),
            no("ja", "Ja, ganz weit", "Das drückt auf den Pferderücken und blockiert ihn."),
            no("vorn", "Ich lege mich auf den Hals", "Aufrecht bleiben ist richtig."),
          ],
          explain: "Genau – der Rücken des Pferdes muss frei bleiben.",
        },
        {
          id: "danach",
          prompt: "Was machst du direkt nach dem Rückwärtsrichten?",
          options: [
            ok("vorwaerts", "Wieder vorwärts reiten"),
            no("schimpfen", "Schimpfen", "Das Pferd hat ja gut mitgemacht – loben!"),
            no("absteigen", "Sofort absteigen", "Normalerweise geht es fließend vorwärts weiter."),
          ],
          explain: "Richtig! Das Vorwärts ist immer das Wichtigste.",
        },
        {
          id: "beine",
          levels: ["mittel"],
          prompt: "In welcher Fußfolge tritt das Pferd rückwärts?",
          options: [
            ok("diagonal", "In diagonalen Beinpaaren, ohne Schwebephase"),
            no("viertakt", "Im Viertakt wie im Schritt", "Rückwärts treten die diagonalen Beinpaare gemeinsam."),
            no("galopp", "Im Dreitakt", "Das ist die Fußfolge des Galopps."),
          ],
          explain: "Genau – ähnlich dem Trab, aber ohne Schwebephase.",
        },
        {
          id: "zuegel",
          levels: ["mittel"],
          prompt: "Was machen die Zügel beim Rückwärtsrichten?",
          options: [
            ok("annehmen", "Sie nehmen leicht an statt nachzugeben und geben bei jedem Tritt nach"),
            no("ziehen", "Sie ziehen das Pferd nach hinten", "Ziehen führt zu Widerstand und Schiefe."),
            no("los", "Sie werden ganz losgelassen", "Dann würde das Pferd vorwärts gehen."),
          ],
          explain: "Richtig. Der treibende Impuls wird in einen Tritt zurück umgeleitet.",
        },
      ],
      merksatz: {
        leicht: "Gerade anhalten, treiben, Hand nicht nach vorn lassen, aufrecht bleiben – und wieder vorwärts.",
        mittel: "Rückwärtsrichten: aus geradem Halt, Schenkel treiben, Hand verhält und gibt je Tritt nach, diagonale Paare, dann sofort vorwärts.",
      },
    },

    /* ---------- 11. Galoppwechsel ---------- */
    {
      slug: "galoppwechsel",
      title: "Einfacher und fliegender Galoppwechsel",
      speaker: "lea",
      intro: {
        leicht: "Im Galopp gibt es ein „führendes“ Bein. Beim Galoppwechsel wechselt das Pferd das Bein!",
        mittel: "Galoppwechsel braucht man beim Handwechsel im Galopp. Der einfache Wechsel geht über den Schritt, der fliegende in der Luft.",
      },
      explanation: {
        leicht: [
          "Beim einfachen Galoppwechsel wird das Pferd zuerst langsamer und geht ein paar Schritte. Dann galoppiert es auf dem anderen Bein wieder an.",
          "Beim fliegenden Galoppwechsel wechselt das Pferd das Bein in der Luft – in der Schwebephase. Das sieht aus, als würde es hüpfen.",
        ],
        mittel: [
          "Einfacher Galoppwechsel: Übergang vom Galopp zum Schritt, drei bis fünf klare Schritttritte, dann im neuen Galopp angaloppieren. In Einsteigerprüfungen gibt es auch den Galoppwechsel über den Trab. Der Wechsel geschieht oft auf der Mittellinie oder beim Handwechsel durch die Bahn.",
          "Fliegender Galoppwechsel: Das Pferd wechselt in der Schwebephase von Links- in Rechtsgalopp (oder umgekehrt). Die Hilfen kommen kurz vor der Schwebephase: Stellung umstellen, neuer innerer Schenkel am Gurt, neuer äußerer Schenkel hinter dem Gurt, Gewicht auf die neue innere Seite. Das Pferd soll gerade, gelassen und im Takt bleiben.",
          "In schweren Klassen werden Serienwechsel geritten: Wechsel alle vier, drei oder zwei Sprünge, im Grand Prix sogar bei jedem Sprung („Einerwechsel“). Bewusst auf dem „falschen“ Bein zu galoppieren nennt man Kontergalopp – auch das ist eine wichtige Übung.",
        ],
      },
      illustration: scene("ak-gang-galopp-links"),
      terms: [
        { term: "Rechtsgalopp / Linksgalopp", meaning: "Das rechte bzw. linke Beinpaar greift weiter vor." },
        { term: "Fliegender Wechsel", meaning: "Wechsel des Galopps in der Schwebephase." },
        { term: "Kontergalopp", meaning: "Gewollter Galopp auf der „falschen“ Hand, z. B. Linksgalopp auf der rechten Hand." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w13-l11-wechsel",
          prompt: { leicht: "Welcher Wechsel ist das? Ordne zu.", mittel: "Ordne die Beschreibungen dem richtigen Galoppwechsel zu." },
          targets: [
            { id: "einfach", label: "einfacher Wechsel" },
            { id: "fliegend", label: "fliegender Wechsel" },
          ],
          items: [
            card("schritt", "Ein paar Schritte, dann neu angaloppieren", item("ak-pause"), "einfach", "Richtig – über den Schritt.", "Über den Schritt ist der einfache Wechsel."),
            card("luft", "Wechsel in der Schwebephase", item("ak-blitz"), "fliegend", "Genau, in der Luft.", "In der Luft ist der fliegende Wechsel."),
            card("serie", "Alle zwei Sprünge ein Wechsel", tag("⇄ ⇄ ⇄"), "fliegend", "Richtig – Serienwechsel sind fliegende Wechsel.", "Serienwechsel sind fliegend."),
          ],
        },
      ],
      quiz: [
        {
          id: "einfach",
          prompt: "Wie geht der einfache Galoppwechsel?",
          options: [
            ok("schritt", "Über ein paar Schritte, dann neu angaloppieren"),
            no("luft", "Das Pferd wechselt in der Luft", "Das ist der fliegende Wechsel."),
            no("stopp", "Das Pferd bleibt lange stehen", "Nur ein paar Schritte – kein langes Halten."),
          ],
          explain: "Richtig! Drei bis fünf Schritte, dann neuer Galopp.",
        },
        {
          id: "fliegend",
          prompt: "Wann wechselt das Pferd beim fliegenden Galoppwechsel?",
          options: [
            ok("schwebe", "In der Schwebephase"),
            no("boden", "Wenn alle Beine am Boden sind", "Im Galopp gibt es eine Schwebephase – dann wechselt es."),
            no("schritt", "Im Schritt", "Das wäre der einfache Wechsel."),
          ],
          explain: "Genau – wenn kein Bein den Boden berührt.",
        },
        {
          id: "wozu",
          prompt: "Wozu brauchst du einen Galoppwechsel?",
          options: [
            ok("hand", "Wenn du im Galopp die Hand wechselst"),
            no("halt", "Zum Anhalten", "Zum Anhalten brauchst du Paraden."),
            no("springen", "Damit das Pferd höher springt", "Es geht um das richtige Galoppbein."),
          ],
          explain: "Richtig! Auf jeder Hand galoppiert das Pferd im passenden Galopp.",
        },
        {
          id: "hilfen",
          levels: ["mittel"],
          prompt: "Welche Hilfen gibst du für den fliegenden Wechsel?",
          options: [
            ok("umstellen", "Umstellen: neuer innerer Schenkel am Gurt, neuer äußerer dahinter, Gewicht neu innen"),
            no("ziehen", "Kräftig am neuen inneren Zügel ziehen", "Ziehen macht das Pferd schief und hektisch."),
            no("treten", "Mit beiden Schenkeln kräftig treten", "Die Hilfen werden kurz umgestellt – nicht getreten."),
          ],
          explain: "Genau – kurz vor der Schwebephase, fein und klar.",
        },
        {
          id: "einer",
          levels: ["mittel"],
          prompt: "Was sind Einerwechsel?",
          options: [
            ok("jeder", "Fliegende Wechsel bei jedem Galoppsprung"),
            no("einmal", "Ein einziger Wechsel pro Aufgabe", "Einerwechsel kommen in Serie."),
            no("schritt", "Ein Wechsel über einen Schritt", "Das wäre ein einfacher Wechsel."),
          ],
          explain: "Richtig – eine Lektion der höchsten Klasse.",
        },
      ],
      merksatz: {
        leicht: "Einfach: über den Schritt. Fliegend: in der Luft!",
        mittel: "Einfacher Wechsel über 3–5 Schritte; fliegender Wechsel in der Schwebephase mit Umstellen aller Hilfen – bis zu Serienwechseln.",
      },
    },

    /* ---------- 12. Hinterhandwendung, Pirouette, Piaffe und Passage ---------- */
    {
      slug: "hohe-lektionen",
      title: "Hinterhandwendung, Pirouette, Piaffe und Passage",
      speaker: "ben",
      intro: {
        leicht: "Jetzt wird es ganz schwierig! Diese Lektionen zeigen die besten Dressurpferde der Welt.",
        mittel: "Mit zunehmender Versammlung kommen Lektionen, bei denen die Hinterhand viel Last trägt – von der Hinterhandwendung bis zu Piaffe und Passage im Grand Prix.",
      },
      explanation: {
        leicht: [
          "Bei der Hinterhandwendung bleiben die Hinterbeine fast an Ort und Stelle und die Vorderbeine gehen außen herum. Im Galopp heißt das Pirouette – das Pferd dreht sich wie ein Tänzer.",
          "Die Piaffe ist ein Trab auf der Stelle. Die Passage ist ein ganz langsamer, hoher, schwebender Trab. Dafür braucht ein Pferd viele Jahre Training.",
        ],
        mittel: [
          "Hinterhandwendung und Kurzkehrt: Die Vorhand dreht sich in Schritt-Takt um die Hinterhand, das innere Hinterbein tritt möglichst auf der Stelle. Hilfen (nach links): Pferd links gestellt und gebogen, Gewicht links, linker Zügel führt, rechter begrenzt und führt mit, rechter Schenkel hinter dem Gurt verhindert das Ausweichen der Hinterhand, linker Schenkel am Gurt erhält das Vorwärts. Aus der Bewegung heißt die halbe Wendung Kurzkehrt.",
          "Pirouette: dieselbe Drehung im versammelten Galopp. Eine ganze Pirouette (360°) dauert etwa sechs bis acht Galoppsprünge, eine halbe drei bis vier. Das Pferd bleibt im klaren Dreitakt, die Hinterbeine springen auf einem kleinen Kreis.",
          "Piaffe: höchst versammelte, trabartige Bewegung fast auf der Stelle in diagonalen Beinpaaren, die Hinterhand gesenkt und tragend. Passage: sehr versammelter, erhabener Trab mit ausgeprägter Schwebephase, raumgreifend nur wenig. Beide gehören in die schwerste Klasse und brauchen jahrelange, geduldige Ausbildung – nie mit Zwang.",
        ],
      },
      illustration: scene("ak-oben-pirouette"),
      terms: [
        { term: "Kurzkehrt", meaning: "Halbe Hinterhandwendung aus dem Schritt." },
        { term: "Pirouette", meaning: "Drehung der Vorhand um die Hinterhand im versammelten Galopp." },
        { term: "Piaffe / Passage", meaning: "Trab auf der Stelle / schwebender, erhabener Trab – Grand-Prix-Lektionen." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w13-l12-lektionen",
          prompt: { leicht: "Was ist was? Ordne zu.", mittel: "Ordne die Lektionen ihrer Beschreibung zu." },
          targets: [
            { id: "hh", label: "Hinterhandwendung" },
            { id: "piaffe", label: "Piaffe" },
            { id: "passage", label: "Passage" },
          ],
          items: [
            card("dreh", "Vorhand dreht um die Hinterbeine", { kind: "scene", scene: "ak-oben-hinterhandwendung" }, "hh", "Richtig – die Hinterbeine bleiben fast an Ort und Stelle.", "Das ist die Hinterhandwendung."),
            card("stelle", "Trab auf der Stelle", tag("● ● ●"), "piaffe", "Genau, die Piaffe.", "Trab auf der Stelle = Piaffe."),
            card("schweben", "Langsamer, schwebender Trab", tag("⌒ ⌒ ⌒"), "passage", "Richtig, die Passage.", "Schwebender Trab = Passage."),
          ],
        },
      ],
      quiz: [
        {
          id: "hh",
          prompt: "Was bleibt bei der Hinterhandwendung fast an Ort und Stelle?",
          options: [
            ok("hinterbeine", "Die Hinterbeine"),
            no("vorderbeine", "Die Vorderbeine", "Das wäre die Vorhandwendung."),
            no("kopf", "Nur der Kopf", "Die Hinterbeine bleiben am Platz."),
          ],
          explain: "Richtig – die Vorhand dreht außen herum.",
        },
        {
          id: "pirouette",
          prompt: "In welcher Gangart reitet man eine Pirouette in der Dressurprüfung?",
          options: [
            ok("galopp", "Im versammelten Galopp"),
            no("trab", "Im starken Trab", "Pirouetten werden im Galopp (oder Schritt) geritten, nicht im starken Trab."),
            no("rueck", "Rückwärts", "Die Pirouette ist eine Drehung vorwärts."),
          ],
          explain: "Genau – das Pferd dreht sich dabei um seine Hinterhand.",
        },
        {
          id: "piaffe",
          prompt: "Was ist eine Piaffe?",
          options: [
            ok("stelle", "Ein Trab fast auf der Stelle"),
            no("sprung", "Ein großer Sprung", "Die Piaffe ist eine Dressurlektion."),
            no("pause", "Eine Pause am langen Zügel", "Die Piaffe ist anstrengende Höchstversammlung."),
          ],
          explain: "Richtig – eine der schwierigsten Lektionen.",
        },
        {
          id: "kurzkehrt",
          levels: ["mittel"],
          prompt: "Was ist eine Kurzkehrtwendung?",
          options: [
            ok("halbe", "Eine halbe Hinterhandwendung aus der Bewegung im Schritt"),
            no("vorhand", "Eine schnelle Vorhandwendung", "Beim Kurzkehrt dreht die Vorhand um die Hinterhand."),
            no("galopp", "Eine ganze Pirouette im Galopp", "Das Kurzkehrt wird im Schritt geritten."),
          ],
          explain: "Genau. 180 Grad, ohne vorher anzuhalten.",
        },
        {
          id: "aussen-schenkel",
          levels: ["mittel"],
          prompt: "Welche Aufgabe hat der äußere Schenkel bei der Hinterhandwendung?",
          options: [
            ok("verwahren", "Er verhindert, dass die Hinterhand nach außen ausweicht"),
            no("seitwaerts", "Er treibt die Hinterhand seitwärts", "Das wäre eine Vorhandwendung."),
            no("bremsen", "Er bremst das Pferd", "Bremsen ist keine Schenkelaufgabe."),
          ],
          explain: "Richtig. Die Hinterbeine sollen auf ihrem kleinen Kreis bleiben.",
        },
        {
          id: "pirouette-spruenge",
          levels: ["mittel"],
          prompt: "Wie viele Galoppsprünge dauert eine ganze Pirouette etwa?",
          options: [
            ok("sechs-acht", "Etwa sechs bis acht"),
            no("einer", "Einen", "So schnell geht es nicht – der Takt muss erhalten bleiben."),
            no("zwanzig", "Etwa zwanzig", "Das wäre viel zu groß und langsam."),
          ],
          explain: "Genau – eine halbe Pirouette etwa drei bis vier.",
        },
      ],
      merksatz: {
        leicht: "Hinterhandwendung und Pirouette: Hinterbeine am Platz. Piaffe: Trab auf der Stelle. Passage: schwebender Trab.",
        mittel: "Je mehr Versammlung, desto mehr trägt die Hinterhand: Hinterhandwendung, Pirouette, Piaffe und Passage brauchen Jahre und Geduld.",
      },
      readTogether: true,
    },
  ], reviewed2026_10_29),
};
