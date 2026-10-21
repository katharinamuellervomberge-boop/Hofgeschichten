import { card, huf, item, no, ok } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 6 – Galopp verstehen */
export const welt6: AcademyWorld = {
  id: "w6",
  number: 6,
  slug: "galopp-verstehen",
  title: "Galopp verstehen",
  teaser: "Dreitakt, Rechts- und Linksgalopp, Übergänge.",
  learns: "Dreitakt mit Schwebephase, Rechts- und Linksgalopp (Außen- und Kreuzgalopp), Grundgerüst der Galopphilfen, Balance und Übergänge.",
  tint: "#EADBC8",
  cover: scene("ak-gang-galopp-rechts"),
  badge: { id: "ra-abzeichen-w6", title: "Galopp-Experte", motif: "canter" },
  lessons: lessonsOf(6, [
    /* ---------- 1. Der Dreitakt ---------- */
    {
      slug: "der-dreitakt",
      title: "Der Dreitakt",
      speaker: "mila",
      intro: {
        leicht: "Ta-ta-tam, ta-ta-tam! Der Galopp fühlt sich an wie Schaukeln.",
        mittel: "Der Galopp ist die schnellste Grundgangart – und die mit dem besonderen Rhythmus.",
      },
      explanation: {
        leicht: [
          "Galopp ist die schnellste Grundgangart. Er hat drei Takte: ta-ta-tam, ta-ta-tam.",
          "Nach den drei Takten schwebt das Pferd kurz durch die Luft. Es macht viele kleine Sprünge hintereinander – das fühlt sich an wie Schaukeln.",
        ],
        mittel: [
          "Der Galopp ist ein Dreitakt mit Schwebephase. Im Rechtsgalopp fußt zuerst das linke Hinterbein auf, dann gleichzeitig das rechte Hinterbein und das linke Vorderbein und zuletzt das rechte Vorderbein. Danach folgt die Schwebephase, in der kein Huf den Boden berührt.",
          "Weil das Pferd im Galopp eine Folge von Sprüngen macht, spricht man von Galoppsprüngen. Der Rücken schwingt dabei rund und schaukelnd. Man unterscheidet unter anderem Arbeitsgalopp, Mittelgalopp und versammelten Galopp. Galoppieren lernt man erst, wenn Sitz und Balance in Schritt und Trab sicher sind.",
        ],
      },
      illustration: scene("ak-gang-galopp-rechts"),
      terms: [
        { term: "Dreitakt", meaning: "Drei Hufschläge pro Galoppsprung." },
        { term: "Galoppsprung", meaning: "Ein vollständiger Bewegungsablauf im Galopp mit Schwebephase." },
        { term: "Arbeitsgalopp", meaning: "Der ruhige, gleichmäßige Galopp für die tägliche Arbeit." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w6-l1-zaehlen",
          levels: ["leicht"],
          prompt: "Zähle die Takte auf dem Bild. Wie viele sind es?",
          visual: scene("ak-takt-galopp-rechts"),
          layout: "list",
          options: [
            { id: "zwei", label: "Zwei", feedback: "Schau auf die Zahlen: Es gibt 1, 2 und 3." },
            { id: "drei", label: "Drei", correct: true },
            { id: "vier", label: "Vier", feedback: "Vier Hufe, aber zwei landen zusammen – darum sind es nur drei Takte." },
          ],
          explain: "Richtig! Drei Takte und dann kurz schweben.",
        },
        {
          type: "match",
          id: "ra-w6-l1-folge",
          levels: ["mittel"],
          prompt: "Rechtsgalopp: Ordne jedes Bein dem richtigen Takt zu.",
          targets: [
            { id: "1", label: "Takt 1" },
            { id: "2", label: "Takt 2" },
            { id: "3", label: "Takt 3" },
          ],
          items: [
            card("hl", "hinten links", huf(), "1", "Richtig. Im Rechtsgalopp beginnt hinten links.", "Im Rechtsgalopp fußt zuerst hinten links auf."),
            card("hr", "hinten rechts", huf(), "2", "Genau, zusammen mit vorne links.", "Hinten rechts gehört zum zweiten Takt."),
            card("vl", "vorne links", huf(), "2", "Richtig. Das ist das diagonale Paar im zweiten Takt.", "Vorne links fußt im zweiten Takt mit hinten rechts auf."),
            card("vr", "vorne rechts", huf(), "3", "Super! Das führende Bein kommt zuletzt.", "Vorne rechts ist im Rechtsgalopp das letzte Bein – Takt 3."),
          ],
        },
      ],
      quiz: [
        {
          id: "takte",
          prompt: "Wie viele Takte hat der Galopp?",
          options: [
            ok("drei", "Drei"),
            no("zwei", "Zwei", "Zwei Takte hat der Trab."),
            no("vier", "Vier", "Vier Takte hat der Schritt."),
          ],
          explain: "Richtig! Ta-ta-tam – drei Takte.",
        },
        {
          id: "gefuehl",
          prompt: "Wie fühlt sich Galopp im Sattel an?",
          options: [
            ok("schaukeln", "Wie Schaukeln"),
            no("ruckeln", "Wie hartes Ruckeln ohne Pause", "Hartes Ruckeln passt eher zum Aussitzen im Trab."),
            no("still", "Wie Stillstehen", "Im Galopp ist richtig Bewegung – rund und schaukelnd."),
          ],
          explain: "Genau! Rund und schwungvoll.",
        },
        {
          id: "wann",
          prompt: "Wann lernt man galoppieren?",
          options: [
            ok("sicher", "Wenn man im Schritt und Trab sicher sitzt"),
            no("erste", "Gleich in der ersten Reitstunde", "Erst kommen Schritt und Trab – dann der Galopp."),
            no("nie", "Kinder dürfen nie galoppieren", "Doch! Wenn du sicher sitzt, lernst du es mit deiner Reitlehrerin."),
          ],
          explain: "Richtig! Mit deiner Reitlehrerin, wenn Sitz und Balance sicher sind.",
        },
        {
          id: "gleichzeitig",
          levels: ["mittel"],
          prompt: "Welche Beine fußen im Rechtsgalopp gleichzeitig auf?",
          options: [
            ok("hr-vl", "Hinten rechts und vorne links"),
            no("hl-vl", "Hinten links und vorne links", "Das sind Beine derselben Seite. Im zweiten Takt fußt ein diagonales Paar auf."),
            no("vorne", "Beide Vorderbeine", "Die Vorderbeine fußen im Galopp nacheinander auf."),
          ],
          explain: "Richtig. Das ist der zweite Takt.",
        },
        {
          id: "danach",
          levels: ["mittel"],
          prompt: "Was folgt nach dem dritten Takt?",
          options: [
            ok("schwebe", "Die Schwebephase"),
            no("vierter", "Ein vierter Takt", "Ein vierter Takt wäre ein Fehler im Galopp. Normal folgt die Schwebephase."),
            no("halt", "Ein kurzer Halt", "Das Pferd hält nicht an – es schwebt kurz und springt weiter."),
          ],
          explain: "Genau. Dann beginnt der nächste Galoppsprung.",
        },
      ],
      merksatz: {
        leicht: "Galopp ist Dreitakt: ta-ta-tam – und dann kurz schweben.",
        mittel: "Galopp: Dreitakt mit Schwebephase – eine Folge runder Galoppsprünge.",
      },
    },

    /* ---------- 2. Rechts- und Linksgalopp ---------- */
    {
      slug: "rechts-und-linksgalopp",
      title: "Rechts- und Linksgalopp",
      speaker: "lea",
      intro: {
        leicht: "Es gibt Rechtsgalopp und Linksgalopp. Weißt du, woran man sie erkennt?",
        mittel: "Im Galopp ist das Pferd nicht symmetrisch: Eine Seite greift weiter vor. Das hat einen Namen.",
      },
      explanation: {
        leicht: [
          "Im Galopp greifen die Beine einer Seite etwas weiter nach vorne. Sind es die rechten, heißt es Rechtsgalopp. Sind es die linken, heißt es Linksgalopp.",
          "Reitest du rechts herum, galoppiert das Pferd normalerweise im Rechtsgalopp. Links herum im Linksgalopp.",
        ],
        mittel: [
          "Im Galopp greifen die Beine einer Seite weiter nach vorne als die der anderen. Im Rechtsgalopp sind das die rechten Beine, im Linksgalopp die linken. Das zuletzt auffußende Vorderbein nennt man auch das führende Bein.",
          "In der Bahn galoppiert man normalerweise auf der rechten Hand im Rechtsgalopp und auf der linken Hand im Linksgalopp – so bleibt das Pferd gut im Gleichgewicht. Galoppiert es absichtlich auf der rechten Hand im Linksgalopp, heißt das Außengalopp; das ist eine Übung für Fortgeschrittene. Springt das Pferd aus Versehen falsch an, pariert man ruhig durch und galoppiert neu an. Galoppiert es vorne und hinten auf verschiedenen Seiten, nennt man das Kreuzgalopp.",
        ],
      },
      illustration: scene("ak-gang-galopp-links"),
      terms: [
        { term: "Führendes Bein", meaning: "Das Vorderbein, das im Galopp weiter vorgreift und zuletzt auffußt." },
        { term: "Außengalopp", meaning: "Absichtlich auf der rechten Hand im Linksgalopp (oder umgekehrt)." },
        { term: "Kreuzgalopp", meaning: "Vorne und hinten galoppiert das Pferd auf verschiedenen Seiten." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w6-l2-erkennen",
          prompt: "Welches Bild zeigt den Rechtsgalopp?",
          layout: "pictures",
          options: [
            { id: "links", label: "Bild 1", visual: scene("ak-takt-galopp-links"), feedback: "Hier greifen die linken Beine weiter vor – das ist Linksgalopp." },
            { id: "rechts", label: "Bild 2", visual: scene("ak-takt-galopp-rechts"), correct: true },
            { id: "trab", label: "Bild 3", visual: scene("ak-takt-trab"), feedback: "Hier gehen die Beine diagonal zusammen – das ist Trab." },
          ],
          explain: "Richtig! Die rechten Beine greifen weiter nach vorne.",
        },
      ],
      quiz: [
        {
          id: "vorbein",
          prompt: "Im Rechtsgalopp greift welches Vorderbein weiter vor?",
          options: [
            ok("rechts", "Das rechte"),
            no("links", "Das linke", "Das linke greift im Linksgalopp weiter vor."),
            no("beide", "Beide gleich weit", "Im Galopp greift immer eine Seite weiter vor."),
          ],
          explain: "Richtig! Daher kommt der Name.",
        },
        {
          id: "links-herum",
          prompt: "Du reitest links herum. Welcher Galopp passt normalerweise?",
          options: [
            ok("links", "Linksgalopp"),
            no("rechts", "Rechtsgalopp", "Rechtsgalopp passt zu rechts herum."),
            no("egal", "Das ist egal", "Der passende Galopp hilft dem Pferd, in der Kurve im Gleichgewicht zu bleiben."),
          ],
          explain: "Genau! Links herum – Linksgalopp.",
        },
        {
          id: "name",
          prompt: "Rechts herum reiten heißt in der Reitersprache …",
          options: [
            ok("rechte-hand", "… auf der rechten Hand reiten"),
            no("rechts-lenken", "… rechts lenken", "Lenken ist etwas anderes. Die Richtung heißt „Hand“."),
            no("rechts-sitzen", "… rechts sitzen", "Sitzen tust du immer in der Mitte. Die Richtung heißt „auf der rechten Hand“."),
          ],
          explain: "Richtig! Rechts ist dann innen.",
        },
        {
          id: "kreuz",
          levels: ["mittel"],
          prompt: "Was ist Kreuzgalopp?",
          options: [
            ok("verschieden", "Vorne und hinten galoppiert das Pferd auf verschiedenen Seiten"),
            no("diagonal", "Ein Galopp durch die Bahndiagonale", "Gemeint ist die Fußfolge, nicht der Weg in der Bahn."),
            no("absicht", "Absichtlicher Galopp auf der falschen Hand", "Das ist Außengalopp."),
          ],
          explain: "Richtig. Dann ist das Pferd nicht im Gleichgewicht – man pariert durch und galoppiert neu an.",
        },
        {
          id: "falsch",
          levels: ["mittel"],
          prompt: "Das Pferd springt aus Versehen im falschen Galopp an. Was tust du?",
          options: [
            ok("neu", "Ruhig durchparieren und neu angaloppieren"),
            no("schimpfen", "Weitergaloppieren und schimpfen", "Schimpfen hilft dem Pferd nicht. Es braucht eine neue, klare Chance."),
            no("reissen", "Am Zügel reißen", "Reißen tut weh und hilft nicht beim richtigen Anspringen."),
          ],
          explain: "Genau. Oft lag es an der Vorbereitung – beim nächsten Mal klappt es.",
        },
      ],
      merksatz: {
        leicht: "Rechts herum: Rechtsgalopp. Links herum: Linksgalopp.",
        mittel: "Auf der rechten Hand Rechtsgalopp, auf der linken Linksgalopp – passt es nicht, ruhig durchparieren und neu angaloppieren.",
      },
    },

    /* ---------- 3. Die Galopphilfen ---------- */
    {
      slug: "galopphilfen",
      title: "Die Galopphilfen",
      speaker: "ben",
      readTogether: true,
      intro: {
        leicht: "Wie sagt man einem Pferd: Bitte galoppieren? Mit mehreren Zeichen auf einmal!",
        mittel: "Das Angaloppieren ist ein schönes Beispiel dafür, wie Hilfen zusammenwirken.",
      },
      explanation: {
        leicht: [
          "Zum Angaloppieren gibt die Reiterin mehrere kleine Zeichen gleichzeitig: Sie sitzt etwas mehr auf der inneren Seite, der innere Schenkel liegt am Gurt und der äußere etwas weiter hinten.",
          "Jede Reitschule erklärt das ein bisschen anders. Deine Reitlehrerin zeigt dir genau, wie es bei euch geht.",
        ],
        mittel: [
          "Häufig wird das Angaloppieren so gelehrt: Das Pferd wird mit einer halben Parade aufmerksam gemacht und innen leicht gestellt. Der innere Gesäßknochen wird etwas mehr belastet, der innere Schenkel treibt am Gurt, der äußere Schenkel liegt verwahrend eine Handbreit hinter dem Gurt. Der innere Zügel gibt im Moment des Anspringens etwas nach, damit das Pferd frei nach vorne springen kann.",
          "Das ist ein Grundgerüst, kein starres Rezept: Wie deutlich die einzelnen Hilfen sein müssen, hängt vom Pferd, seiner Ausbildung und der Reitweise ab. Wichtig ist, dass die Hilfen ruhig und gut vorbereitet kommen, nicht hektisch. Angaloppieren übst du nur in der Reitstunde mit Anleitung.",
        ],
      },
      illustration: scene("ak-reiter-schenkel"),
      terms: [
        { term: "Halbe Parade", meaning: "Kurzes Zusammenspiel von Gewicht, Schenkel und Zügel, um das Pferd aufmerksam zu machen." },
        { term: "Stellung", meaning: "Das Pferd schaut mit dem Kopf leicht nach innen." },
        { term: "Angaloppieren", meaning: "Aus Schritt oder Trab in den Galopp wechseln." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w6-l3-aussen",
          levels: ["leicht"],
          prompt: "Wo liegt der äußere Schenkel beim Angaloppieren?",
          visual: scene("ak-reiter-schenkel"),
          layout: "list",
          options: [
            { id: "hinter", label: "Etwas hinter dem Gurt (Punkt 2)", correct: true },
            { id: "gurt", label: "Am Gurt (Punkt 1)", feedback: "Am Gurt liegt der innere Schenkel." },
            { id: "hals", label: "Am Pferdehals", feedback: "Am Hals liegt kein Schenkel." },
          ],
          explain: "Richtig! Der äußere Schenkel liegt etwas weiter hinten.",
        },
        {
          type: "match",
          id: "ra-w6-l3-innen-aussen",
          levels: ["mittel"],
          prompt: "Angaloppieren: Was passiert innen, was außen?",
          targets: [
            { id: "innen", label: "innen" },
            { id: "aussen", label: "außen" },
          ],
          items: [
            card("schenkel-i", "Schenkel treibt am Gurt", item("ak-schenkel"), "innen", "Richtig. Der innere Schenkel treibt.", "Der treibende Schenkel am Gurt ist der innere."),
            card("schenkel-a", "Schenkel verwahrt hinter dem Gurt", item("ak-stopp"), "aussen", "Genau. Der äußere Schenkel verwahrt.", "Der verwahrende Schenkel hinter dem Gurt ist der äußere."),
            card("gewicht", "Etwas mehr Gewicht", item("ak-gewicht"), "innen", "Richtig. Der innere Gesäßknochen wird etwas mehr belastet.", "Das Gewicht geht etwas mehr nach innen."),
            card("zuegel-a", "Zügel begrenzt", item("ak-zuegel"), "aussen", "Genau. Der äußere Zügel begrenzt.", "Begrenzen tut der äußere Zügel."),
            card("zuegel-i", "Zügel gibt beim Anspringen nach", item("ak-herz"), "innen", "Super! So kann das Pferd frei springen.", "Der innere Zügel gibt beim Anspringen nach."),
          ],
        },
      ],
      quiz: [
        {
          id: "mehrere",
          prompt: "Wie viele Hilfen kommen beim Angaloppieren zusammen?",
          options: [
            ok("mehrere", "Mehrere gleichzeitig"),
            no("eine", "Nur eine", "Eine Hilfe allein ist für das Angaloppieren zu wenig klar."),
            no("keine", "Gar keine", "Ganz ohne Hilfen weiß das Pferd nicht, was du möchtest."),
          ],
          explain: "Richtig! Gewicht, Schenkel und Zügel arbeiten zusammen.",
        },
        {
          id: "innen",
          prompt: "Wo liegt der innere Schenkel beim Angaloppieren?",
          options: [
            ok("gurt", "Am Gurt"),
            no("hinten", "Weit hinter dem Gurt", "Hinter dem Gurt liegt der äußere Schenkel."),
            no("weg", "Weit weg vom Pferd", "Der Schenkel liegt immer am Pferd."),
          ],
          explain: "Genau! Am Gurt treibt der innere Schenkel das Pferd in den Galopp.",
        },
        {
          id: "wer",
          prompt: "Wer zeigt dir, wie Angaloppieren bei euch geht?",
          options: [
            ok("lehrer", "Meine Reitlehrerin oder mein Reitlehrer"),
            no("allein", "Niemand, ich probiere es allein", "Angaloppieren lernst du nur mit Anleitung."),
            no("kind", "Ein anderes Kind", "Andere Kinder können toll sein – zeigen sollte es aber eine Reitlehrkraft."),
          ],
          explain: "Richtig! Mit Anleitung ist es sicher.",
        },
        {
          id: "parade",
          levels: ["mittel"],
          prompt: "Was ist eine halbe Parade?",
          options: [
            ok("aufmerksam", "Ein kurzes Zusammenspiel der Hilfen, um das Pferd aufmerksam zu machen"),
            no("halber", "Ein halber Galoppsprung", "Gemeint ist kein Sprung, sondern ein kurzes Vorbereiten mit den Hilfen."),
            no("ziehen", "Ein Anhalten durch Ziehen am Zügel", "Eine halbe Parade ist fein und kommt aus Gewicht, Schenkel und Zügel."),
          ],
          explain: "Richtig. Sie bereitet Übergänge vor.",
        },
        {
          id: "nachgeben",
          levels: ["mittel"],
          prompt: "Warum gibt der innere Zügel beim Anspringen etwas nach?",
          options: [
            ok("frei", "Damit das Pferd frei nach vorne springen kann"),
            no("bremsen", "Damit das Pferd bremst", "Nachgeben bremst nicht – es macht den Weg nach vorne frei."),
            no("aussehen", "Weil es schöner aussieht", "Es geht um das Pferd: Es braucht Freiheit zum Springen."),
          ],
          explain: "Genau. Würde der innere Zügel festhalten, könnte das Pferd nicht frei anspringen.",
        },
      ],
      merksatz: {
        leicht: "Angaloppieren: mehrere feine Zeichen zusammen – so, wie es dir deine Reitlehrerin zeigt.",
        mittel: "Galopphilfen sind ein Zusammenspiel: vorbereiten, innen treiben, außen verwahren, innen nachgeben – ruhig und auf das Pferd abgestimmt.",
      },
      practiceNote: "Angaloppieren nur im Reitunterricht unter Anleitung üben, wenn Sitz und Balance im Trab sicher sind.",
    },

    /* ---------- 4. Balance und Übergänge ---------- */
    {
      slug: "balance-und-uebergaenge",
      title: "Balance und Übergänge",
      speaker: "mila",
      intro: {
        leicht: "Im Galopp heißt es: mitschaukeln! Und dann wieder sanft zurück in den Trab.",
        mittel: "Im Galopp gut sitzen und harmonisch wechseln – darum geht es in dieser Lektion.",
      },
      explanation: {
        leicht: [
          "Im Galopp schaukelst du mit. Dein Oberkörper bleibt aufrecht, und deine Hüfte schwingt bei jedem Sprung nach vorne mit.",
          "Ein Übergang ist ein Wechsel der Gangart, zum Beispiel vom Trab in den Galopp oder vom Galopp in den Trab. Gute Übergänge sind ruhig und weich.",
        ],
        mittel: [
          "Im Galopp schwingt das Becken in jedem Galoppsprung weich nach vorne mit, der Oberkörper bleibt aufgerichtet und ruhig, und die Hände folgen der Nickbewegung des Kopfes. Viele beugen sich anfangs vor oder ziehen die Beine hoch – dann geht die Balance verloren.",
          "Übergänge sind Wechsel zwischen Gangarten oder Tempi. Man bereitet sie mit halben Paraden vor, damit das Pferd nicht überrascht wird. Beim Übergang vom Galopp zum Trab sitzt du tief, die Hand hält kurz durch und gibt nach, sobald das Pferd trabt. Im Gelände reitet man den Galopp oft im leichten Sitz, der den Rücken entlastet – auch das lernst du mit Anleitung.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Übergang", meaning: "Wechsel zwischen Gangarten oder Tempi." },
        { term: "Leichter Sitz", meaning: "Gesäß leicht aus dem Sattel, Oberkörper etwas vor – entlastet den Rücken." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w6-l4-balance",
          prompt: { leicht: "Gut für die Balance oder nicht? Sortiere die Karten.", mittel: "Was hilft der Balance im Galopp, was stört sie?" },
          targets: [
            { id: "gut", label: "Hilft der Balance" },
            { id: "stoert", label: "Stört die Balance" },
          ],
          items: [
            card("aufrecht", "Aufrecht sitzen", item("ak-gewicht"), "gut", "Richtig! Aufrecht bleibst du im Gleichgewicht.", "Aufrecht sitzen hilft der Balance."),
            card("schwingen", "Hüfte schwingt mit", item("ak-schaukel"), "gut", "Genau, so schaukelst du mit.", "Mitschwingen hilft der Balance."),
            card("vorbeugen", "Weit nach vorne beugen", item("ak-blitz"), "stoert", "Richtig. Dann kippst du nach vorne.", "Vorbeugen stört die Balance."),
            card("beine", "Beine hochziehen", item("ak-stiefel"), "stoert", "Genau. Dann verlierst du den Halt.", "Hochgezogene Beine stören die Balance."),
            card("haende", "Hände folgen dem Kopf", item("ak-zuegel"), "gut", "Richtig. So bleibt die Verbindung weich.", "Weich folgende Hände helfen.", ["mittel"]),
            card("festhalten", "Am Zügel festhalten", item("ak-stopp"), "stoert", "Genau. Das tut dem Pferd weh und macht dich steif.", "Festhalten am Zügel stört – und tut weh.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "uebergang",
          prompt: "Was ist ein Übergang?",
          options: [
            ok("wechsel", "Ein Wechsel der Gangart"),
            no("bruecke", "Eine Brücke über einen Bach", "Beim Reiten meint man mit Übergang den Wechsel der Gangart."),
            no("tor", "Das Tor zur Reitbahn", "Das Tor ist kein Übergang. Gemeint ist der Wechsel von einer Gangart in eine andere."),
          ],
          explain: "Richtig! Zum Beispiel vom Trab in den Galopp.",
        },
        {
          id: "oberkoerper",
          prompt: "Wie ist dein Oberkörper im Galopp?",
          options: [
            ok("aufrecht", "Aufrecht und ruhig"),
            no("vorne", "Ganz weit vorne", "So kippst du nach vorn und verlierst die Balance."),
            no("hinten", "Weit nach hinten gelehnt", "Weit nach hinten lehnen stört die Balance auch."),
          ],
          explain: "Genau! Die Hüfte schwingt, der Oberkörper bleibt ruhig.",
        },
        {
          id: "wie",
          prompt: "Wie sollen Übergänge sein?",
          options: [
            ok("weich", "Ruhig und weich"),
            no("ruck", "Plötzlich und ruckartig", "Ruckartige Übergänge erschrecken das Pferd und bringen es aus dem Gleichgewicht."),
            no("laut", "Möglichst laut", "Laut sein hilft nicht. Ruhig vorbereitet klappt es besser."),
          ],
          explain: "Richtig! Gut vorbereitet und harmonisch.",
        },
        {
          id: "vorbereiten",
          levels: ["mittel"],
          prompt: "Womit bereitet man Übergänge vor?",
          options: [
            ok("parade", "Mit halben Paraden"),
            no("gerte", "Mit der Gerte", "Die Gerte unterstützt höchstens den Schenkel. Vorbereitet wird mit halben Paraden."),
            no("nichts", "Gar nicht – das Pferd merkt es schon", "Ohne Vorbereitung wird das Pferd überrascht."),
          ],
          explain: "Genau. So ist das Pferd aufmerksam.",
        },
        {
          id: "nachgeben",
          levels: ["mittel"],
          prompt: "Wann gibt die Hand beim Übergang vom Galopp zum Trab nach?",
          options: [
            ok("trab", "Sobald das Pferd trabt"),
            no("nie", "Gar nicht", "Ohne Nachgeben wird die Hand hart. Das Pferd hat ja reagiert."),
            no("schritt", "Erst wenn das Pferd im Schritt ist", "So lange zu halten wäre zu viel. Nachgegeben wird, sobald es trabt."),
          ],
          explain: "Richtig. Das Nachgeben bestätigt das Pferd.",
        },
      ],
      merksatz: {
        leicht: "Im Galopp schaukle ich mit – und Übergänge sind ruhig und weich.",
        mittel: "Balance im Galopp: Becken schwingt mit, Oberkörper ruhig. Übergänge gut vorbereiten und nachgeben.",
      },
    },

    /* ---------- 5. Galopp-Quiz ---------- */
    {
      slug: "galopp-quiz",
      title: "Galopp-Quiz",
      speaker: "lea",
      intro: {
        leicht: "Ta-ta-tam! Zeig, was du über den Galopp weißt.",
        mittel: "Dreitakt, Rechts- und Linksgalopp, Hilfen und Übergänge – jetzt wird es spannend.",
      },
      explanation: {
        leicht: ["Das weißt du schon: Galopp ist Dreitakt mit Schweben. Rechts herum Rechtsgalopp, links herum Linksgalopp. Du schaukelst locker mit."],
        mittel: [
          "Kurze Wiederholung: Der Galopp ist ein Dreitakt mit Schwebephase. Auf der rechten Hand galoppiert man Rechtsgalopp, auf der linken Linksgalopp. Beim Angaloppieren wirken die Hilfen zusammen, und Übergänge werden mit halben Paraden vorbereitet.",
        ],
      },
      illustration: scene("ak-gang-galopp-links"),
      exercise: [
        {
          type: "choice",
          id: "ra-w6-l5-welches",
          prompt: "Welches Bild zeigt den Galopp?",
          layout: "pictures",
          options: [
            { id: "schritt", label: "Bild 1", visual: scene("ak-takt-schritt"), feedback: "Hier sind es vier einzelne Takte – das ist Schritt." },
            { id: "trab", label: "Bild 2", visual: scene("ak-takt-trab"), feedback: "Hier sind es zwei Takte mit diagonalen Paaren – das ist Trab." },
            { id: "galopp", label: "Bild 3", visual: scene("ak-takt-galopp-links"), correct: true },
          ],
          explain: "Richtig! Drei Takte und eine Schwebephase.",
        },
      ],
      quiz: [
        {
          id: "takte",
          prompt: "Wie viele Takte hat der Galopp?",
          options: [
            ok("drei", "Drei"),
            no("zwei", "Zwei", "Zwei Takte hat der Trab."),
            no("vier", "Vier", "Vier Takte hat der Schritt."),
          ],
          explain: "Richtig! Ta-ta-tam: drei Takte und dann die Schwebephase.",
        },
        {
          id: "rechts",
          prompt: "Du reitest rechts herum. Welcher Galopp passt?",
          options: [
            ok("rechts", "Rechtsgalopp"),
            no("links", "Linksgalopp", "Linksgalopp passt zu links herum."),
            no("kreuz", "Kreuzgalopp", "Kreuzgalopp ist ein Fehler, bei dem vorne und hinten nicht zusammenpassen."),
          ],
          explain: "Genau! Auf der rechten Hand bleibt das Pferd im Rechtsgalopp gut im Gleichgewicht.",
        },
        {
          id: "gefuehl",
          prompt: "Was machst du im Galopp mit deiner Hüfte?",
          options: [
            ok("mit", "Ich schwinge locker mit"),
            no("fest", "Ich halte sie ganz fest", "Fest und steif wirst du herumgeschaukelt."),
            no("stehen", "Ich stehe in den Bügeln", "Im Grundsitz bleibst du sitzen und schwingst mit."),
          ],
          explain: "Richtig! Wie auf einer Schaukel.",
        },
        {
          id: "schweben",
          prompt: "Was passiert nach den drei Takten?",
          options: [
            ok("schweben", "Das Pferd schwebt kurz"),
            no("stehen", "Das Pferd bleibt stehen", "Im Galopp bleibt das Pferd nicht stehen – es schwebt und springt weiter."),
            no("vier", "Ein vierter Takt", "Ein vierter Takt gehört nicht zum Galopp."),
          ],
          explain: "Genau! In der Schwebephase berührt kein Huf den Boden – dann folgt der nächste Sprung.",
        },
        {
          id: "aussen-schenkel",
          levels: ["mittel"],
          prompt: "Wo liegt beim Angaloppieren der äußere Schenkel?",
          options: [
            ok("hinter", "Verwahrend etwa eine Handbreit hinter dem Gurt"),
            no("gurt", "Treibend am Gurt", "Am Gurt treibt der innere Schenkel."),
            no("weg", "Er wird vom Pferd weggenommen", "Der äußere Schenkel bleibt am Pferd und verwahrt."),
          ],
          explain: "Richtig. Der äußere Schenkel verwahrt, damit die Hinterhand nicht ausweicht.",
        },
        {
          id: "aussengalopp",
          levels: ["mittel"],
          prompt: "Was ist Außengalopp?",
          options: [
            ok("absicht", "Absichtlich auf der rechten Hand im Linksgalopp (oder umgekehrt)"),
            no("draussen", "Galopp draußen im Gelände", "Gemeint ist nicht der Ort, sondern der Galopp auf der „anderen“ Hand."),
            no("kreuz", "Vorne und hinten verschiedene Seiten", "Das ist Kreuzgalopp."),
          ],
          explain: "Genau. Eine Übung für Fortgeschrittene.",
        },
      ],
      merksatz: {
        leicht: "Galopp: drei Takte, schweben, mitschaukeln.",
        mittel: "Galopp: Dreitakt mit Schwebephase, passend zur Hand – mit ruhigen Hilfen und weichen Übergängen.",
      },
    },
  ]),
};
