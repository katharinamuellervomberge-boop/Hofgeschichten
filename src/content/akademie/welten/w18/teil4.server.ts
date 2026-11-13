import "server-only";
import { scene } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 13, Lektionen 13–16 */
export const teil4: DeepInput[] = [
  /* ---------- 13. Angaloppieren ---------- */
  {
    slug: "richtig-angaloppieren",
    title: "Richtig angaloppieren und Hilfengebung",
    speaker: "lea",
    intro:
      "Rennt dein Pferd beim Angaloppieren im schnellen Trab los, bevor es endlich anspringt? Oder springt es auf der falschen Hand an? Fast immer liegt das an der Vorbereitung – und daran, wann und wie die Hilfe kommt.",
    illustration: scene("ak-gang-galopp-rechts"),
    terms: begriffe(
      ["Galopphilfe", "Zusammenspiel von innerem Gesäßknochen, innerem Schenkel am Gurt, äußerem Schenkel verwahrend und Stellung nach innen."],
      ["Anspringen", "Der erste Galoppsprung aus Schritt oder Trab."],
      ["Durchlaufen", "Das Pferd trabt schneller, statt anzuspringen."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Warum die Hilfe so aufgebaut ist",
          text: "Der Galopp beginnt mit dem äußeren Hinterbein. Deshalb liegt der äußere Schenkel beim Angaloppieren etwas hinter dem Gurt: Er „verwahrt“ die Hinterhand und gibt dem äußeren Hinterbein das Signal zum ersten Galoppsprung. Der innere Schenkel am Gurt sorgt für den Impuls nach vorn und für die Biegung. Das Gewicht auf dem inneren Gesäßknochen zeigt dem Pferd, auf welcher Seite es führen soll, und die Stellung nach innen macht die innere Schulter frei.\n\nAlle Hilfen zusammen sagen: „Spring jetzt im Rechtsgalopp an“ – oder links.",
        },
        {
          heading: "Die Hilfen Schritt für Schritt",
          text: "1. Vorbereiten: Pferd im ruhigen, fleißigen Trab oder Schritt, gestellt nach innen. Eine oder mehrere halbe Paraden.\n2. Gewicht: etwas mehr auf den inneren Gesäßknochen, innere Hüfte leicht vor.\n3. Äußerer Schenkel: eine Handbreit hinter den Gurt, verwahrend.\n4. Innerer Schenkel: am Gurt, gibt den Impuls.\n5. Innerer Zügel: hält die Stellung; äußerer Zügel begrenzt, gibt aber im Moment des Anspringens etwas nach, damit das Pferd nach vorn springen kann.\n6. Mitgehen: Das Becken geht im ersten Sprung mit.\n\nGute Stellen zum Angaloppieren sind in oder kurz nach einer Ecke oder auf dem Zirkel – die Biegung hilft dem Pferd, auf der richtigen Hand anzuspringen.",
        },
        {
          heading: "Wie es sich anfühlt und woran du es erkennst",
          text: "Ein gutes Angaloppieren fühlt sich an, als würde das Pferd nach vorn-oben „abheben“. Es springt aus dem Trab ohne Eilen an, der erste Sprung ist so gut wie der zweite. Der Kopf bleibt ruhig, die Verbindung bleibt erhalten.\n\nWoran du es erkennst: richtiges Bein führt, kein Durchlaufen, ruhige Kopfhaltung, gleichmäßiger Dreitakt ab dem ersten Sprung, gerade Hinterhand.",
        },
        {
          heading: "Typische Fehler und Ursachen",
          text: "• Durchlaufen (Pferd trabt schneller): Vorbereitung fehlt, Hilfe zu unklar oder zu stark nur mit dem inneren Schenkel. → Mehr halbe Paraden, deutlich verwahrender äußerer Schenkel, im ruhigen Trab angaloppieren.\n• Falsch anspringen: Pferd nicht gestellt, Reiter lehnt sich nach innen oder belastet außen, natürliche Schiefe. → Stellung prüfen, aufrecht bleiben, in der Ecke oder auf dem Zirkel angaloppieren.\n• Kopf hoch beim Anspringen: Hand hält fest. → Äußere Hand im Moment des Anspringens leicht vorgeben.\n• Reiter wirft den Oberkörper vor: Das Pferd fällt auf die Vorhand. → Aufrecht bleiben.\n• Hinterhand fällt nach innen: Äußerer Schenkel zu weit hinten oder zu stark, Pferd schief. → Schultervor vor dem Angaloppieren.",
        },
        {
          heading: "Übungen",
          text: "• Angaloppieren auf dem Zirkel an derselben Stelle, mehrmals auf jeder Hand.\n• Galopp–Trab–Galopp: wenige Galoppsprünge, durchparieren, ruhig traben, wieder angaloppieren.\n• Angaloppieren aus dem Schritt, wenn das Pferd ausbalanciert genug ist – verbessert die Reaktion auf feine Hilfen.\n• Vor dem Angaloppieren einige Tritte Schultervor.\n• Bei Pferden, die oft falsch anspringen: zuerst auf der „guten“ Hand die Hilfen verfeinern, dann die schwierige Hand.",
        },
      ],
      praxis: {
        title: "Tonga rennt los",
        text: "Wenn Tilda Tonga angaloppiert, wird Tonga im Trab immer schneller, bevor sie irgendwann flach anspringt. Die Reitlehrerin lässt Tilda erst ruhig im Trab auf dem Zirkel reiten, Tonga nach innen stellen, zwei halbe Paraden geben und dann mit äußerem Schenkel hinter dem Gurt und kurzem inneren Impuls angaloppieren.\n\nBeim dritten Versuch springt Tonga aus dem ruhigen Trab direkt an. Tilda merkt: Vorher hat sie nur mit dem inneren Schenkel getrieben – für Tonga hieß das „schneller“.",
      },
      fehler: fehler(
        ["Ohne Vorbereitung aus dem eiligen Trab angaloppieren.", "Ruhiger Trab, Stellung, halbe Paraden."],
        ["Nur mit dem inneren Schenkel treiben.", "Äußerer Schenkel verwahrend hinter dem Gurt gibt das Galoppsignal."],
        ["Sich nach innen lehnen.", "Aufrecht bleiben, Gewicht über den inneren Gesäßknochen."],
        ["Im Moment des Anspringens festhalten.", "Äußere Hand gibt leicht nach."],
      ),
      richtig: [
        "Reite einen ruhigen, fleißigen Trab und stelle dein Pferd nach innen.",
        "Bereite mit halben Paraden vor.",
        "Inneres Gewicht, äußerer Schenkel verwahrend, innerer Schenkel am Gurt.",
        "Gib im Moment des Anspringens die äußere Hand leicht vor.",
        "Galoppiere in der Ecke oder auf dem Zirkel an.",
      ],
      merke: [
        "Der äußere Schenkel hinter dem Gurt gibt dem äußeren Hinterbein das Signal.",
        "Vorbereitung ist die halbe Galopphilfe.",
        "Aufrecht bleiben, nicht nach innen lehnen.",
        "Ecke und Zirkel helfen beim richtigen Anspringen.",
      ],
      weiter: weiter(["Grundkurs: Die Galopphilfen", "ra-w6-l3"], ["Galoppsitz, Balance und Mitschwingen", "ra-w18-l14"], ["Falscher Galopp, Kreuzgalopp und häufige Fehler", "ra-w18-l15"]),
    },
    exercise: [
      wahl(
        "ra-w18-l13-entscheidung",
        "Dein Pferd trabt beim Angaloppieren immer schneller, statt anzuspringen. Was änderst du zuerst?",
        "Ruhiger Trab, halbe Paraden zur Vorbereitung, äußerer Schenkel deutlich verwahrend hinter dem Gurt",
        [
          ["Kräftiger mit dem inneren Schenkel treiben", "Mehr innerer Schenkel heißt für viele Pferde: schneller traben."],
          ["Mit der Gerte schlagen, bis es anspringt", "Das macht das Pferd hektisch."],
        ],
        "Richtig. Ein klares Signal für das äußere Hinterbein und eine gute Vorbereitung.",
      ),
    ],
    quiz: [
      frage("aussen", "Wo liegt der äußere Schenkel beim Angaloppieren?", "Eine Handbreit hinter dem Gurt, verwahrend", [["Am Gurt, treibend", "Dort liegt der innere Schenkel."], ["Weg vom Pferd", "Er verwahrt aktiv die Hinterhand."]], "Genau. Er gibt dem äußeren Hinterbein das Signal."),
      frage("gewicht", "Wohin verlagerst du dein Gewicht beim Angaloppieren?", "Etwas mehr auf den inneren Gesäßknochen", [["Auf den äußeren Gesäßknochen", "Das begünstigt falsches Anspringen."], ["Nach vorn auf den Hals", "Dann fällt das Pferd auf die Vorhand."]], "Richtig. Ohne nach innen zu lehnen."),
      frage("ort", "Wo galoppiert man am leichtesten an?", "In oder kurz nach einer Ecke oder auf dem Zirkel", [["Auf der langen Seite in der Mitte", "Dort fehlt die Biegung, die beim richtigen Anspringen hilft."], ["Direkt auf die Bande zu", "Das ist gefährlich und unlogisch."]], "Genau. Die Biegung hilft dem Pferd."),
      frage("hand", "Was macht die äußere Hand im Moment des Anspringens?", "Sie gibt leicht nach, damit das Pferd nach vorn springen kann", [["Sie hält fest", "Dann wirft das Pferd den Kopf hoch."], ["Sie zieht nach außen", "Das bringt die Stellung durcheinander."]], "Richtig. Begrenzen ja, festhalten nein."),
    ],
  },

  /* ---------- 14. Galoppsitz ---------- */
  {
    slug: "galoppsitz-mitschwingen",
    title: "Galoppsitz, Balance und Mitschwingen",
    speaker: "mila",
    intro:
      "Viele Reiter „schrubben“ im Galopp mit dem Oberkörper vor und zurück, um das Pferd voranzutreiben. Das sieht nach viel Einsatz aus, stört aber genau die Bewegung, die es fördern soll.",
    illustration: scene("ak-reiter-sitz"),
    terms: begriffe(
      ["Mitschwingen", "Das Becken folgt der wiegenden Bewegung des Pferderückens."],
      ["Schrubben", "Übertriebene Vor-und-zurück-Bewegung des Oberkörpers – ein Fehler."],
      ["Leichter Sitz", "Gesäß aus dem Sattel oder nur leicht im Sattel, Oberkörper etwas vorgeneigt – entlastet den Rücken."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Die Bewegung, der du folgst",
          text: "Im Galopp schaukelt der Pferderücken in jedem Sprung: Hinterhand tief – Vorhand tief – Schwebe. Dein Becken folgt dieser Bewegung mit einer Art Wischbewegung von hinten nach vorn: In jedem Sprung gleitet es nach vorn-oben mit, ohne aus dem Sattel zu kommen.\n\nDer Oberkörper bleibt dabei aufrecht und ruhig, die Schultern bleiben über der Hüfte. Die Hände folgen der Nickbewegung von Kopf und Hals, sonst gibt es bei jedem Sprung einen kleinen Ruck im Maul.",
        },
        {
          heading: "Innen und außen",
          text: "Im Galopp sitzt du etwas mehr auf dem inneren Gesäßknochen, die innere Hüfte geht minimal vor – genau wie bei der Galopphilfe. Das innere Bein liegt am Gurt, das äußere verwahrend etwas dahinter. Die Schultern bleiben parallel zu den Schultern des Pferdes.\n\nDurch diese Haltung bleibt das Pferd im Galopp „eingerahmt“ und kann sich ausbalancieren. Wer die Position verliert, zum Beispiel weil der äußere Schenkel nach vorn rutscht, sorgt oft unbewusst dafür, dass das Pferd ausfällt oder umspringt.",
        },
        {
          heading: "Wie es sich anfühlt",
          text: "Richtig fühlt sich der Galopp an wie ein ruhiges Schaukeln, bei dem du „in“ der Bewegung sitzt. Du hast nicht das Gefühl, etwas tun zu müssen, damit das Pferd weitergaloppiert – dein Becken geht mit, und ein kurzer Schenkelimpuls genügt, wenn das Pferd langsamer werden will.\n\nWoran du erkennst, dass es funktioniert: Dein Gesäß bleibt im Sattel, ohne zu klopfen. Das Pferd bleibt im gleichmäßigen Tempo, wird nicht schneller und nicht schlapp. Der Kopf des Pferdes nickt frei, ohne gegen die Hand zu schlagen.",
        },
        {
          heading: "Typische Fehler, Ursachen, Übungen",
          text: "• Schrubben mit dem Oberkörper: Der Reiter versucht zu treiben. → Treiben mit Schenkelimpulsen, Oberkörper ruhig.\n• Klopfen im Sattel: Becken fest. → Longenarbeit, Galopp im leichten Sitz und Übergang ins Aussitzen.\n• Feste Hände: Die Nickbewegung wird blockiert. → Ellbogen bewusst mitschwingen lassen.\n• Nach vorn fallen: Angst oder schlechte Balance. → Bügel prüfen, kurze Galoppreprisen.\n\nÜbungen: an der Longe ohne Zügel galoppieren; im Galopp zwischen leichtem Sitz und Aussitzen wechseln; zählen „ba-da-bumm“ und mit „bumm“ das Becken vorschwingen lassen; Video von der Seite.",
        },
      ],
      praxis: {
        title: "Weniger ist mehr",
        text: "Ben schrubbt im Galopp kräftig mit, weil Tivoli sonst „ausgeht“. Die Reitlehrerin lässt ihn zuerst leicht galoppieren: Gesäß leicht im Sattel, Oberkörper etwas vor, Hände ruhig. Tivoli galoppiert gleichmäßig weiter.\n\nDann soll Ben langsam einsitzen, ohne den Oberkörper zu bewegen, nur das Becken mitgehen lassen. Wenn Tivoli langsamer wird, gibt er einen kurzen Impuls mit dem inneren Schenkel. Ben ist überrascht: Je ruhiger er sitzt, desto gleichmäßiger galoppiert Tivoli.",
      },
      fehler: fehler(
        ["Mit dem Oberkörper schrubben.", "Becken schwingt mit, Oberkörper bleibt ruhig."],
        ["Mit festen Händen galoppieren.", "Hände folgen der Nickbewegung."],
        ["Äußeren Schenkel nach vorn rutschen lassen.", "Äußeren Schenkel verwahrend hinter dem Gurt halten."],
        ["Lange Galoppreprisen, obwohl der Sitz noch nicht stabil ist.", "Kurze Reprisen, viele Übergänge."],
      ),
      richtig: [
        "Sitz etwas mehr innen, innere Hüfte leicht vor.",
        "Lass das Becken in jedem Sprung nach vorn mitgleiten.",
        "Halte den Oberkörper aufrecht und ruhig.",
        "Lass die Hände der Nickbewegung folgen.",
        "Treibe mit kurzen Impulsen, nicht mit dem Oberkörper.",
      ],
      merke: [
        "Das Becken schwingt mit, der Oberkörper bleibt ruhig.",
        "Die Hände folgen der Nickbewegung.",
        "Innere Hüfte leicht vor, äußerer Schenkel verwahrend.",
        "Je ruhiger du sitzt, desto gleichmäßiger galoppiert dein Pferd.",
      ],
      weiter: weiter(["Der unabhängige, ausbalancierte Reitersitz", "ra-w18-l3"], ["Der leichte Sitz", "ra-w12-l4"], ["Galopparbeit verbessern", "ra-w18-l16"]),
    },
    exercise: [
      wahl(
        "ra-w18-l14-entscheidung",
        "Dein Pferd wird im Galopp langsamer. Was tust du?",
        "Einen kurzen Impuls mit dem inneren Schenkel geben und ruhig weiter mitschwingen",
        [
          ["Mit dem Oberkörper kräftig vor und zurück schwingen", "Das stört den Rücken und macht das Pferd unruhig."],
          ["Mit beiden Beinen dauerhaft klopfen", "Dauerklopfen stumpft ab."],
        ],
        "Richtig. Kurzer Impuls, dann wieder ruhig.",
      ),
    ],
    quiz: [
      frage("becken", "Wie bewegt sich das Becken im Galopp?", "Es gleitet in jedem Sprung nach vorn-oben mit", [["Es bleibt starr", "Ein starres Becken klopft im Sattel."], ["Es bewegt sich seitlich hin und her", "Die Bewegung ist vor allem von hinten nach vorn."]], "Genau. Wie eine Wischbewegung."),
      frage("haende", "Was machen die Hände im Galopp?", "Sie folgen der Nickbewegung von Kopf und Hals", [["Sie bleiben fest an einer Stelle", "Dann bekommt das Pferd bei jedem Sprung einen Ruck."], ["Sie gehen nach oben", "Die Hände gehen mit nach vorn, nicht hoch."]], "Richtig. Die Ellbogen schwingen mit."),
      frage("schrubben", "Warum ist Schrubben mit dem Oberkörper ein Fehler?", "Weil es die Rückenbewegung stört statt sie zu fördern", [["Weil es nicht gut aussieht", "Es geht um die Wirkung auf das Pferd."], ["Weil es zu leise ist", "Das hat mit der Lautstärke nichts zu tun."]], "Genau. Treiben geht mit kurzen Schenkelimpulsen."),
    ],
  },

  /* ---------- 15. Galoppfehler ---------- */
  {
    slug: "galoppfehler",
    title: "Falscher Galopp, Kreuzgalopp und häufige Fehler",
    speaker: "ben",
    intro:
      "Dein Pferd galoppiert auf der rechten Hand – aber irgendwie fühlt es sich „schief“ und holprig an. Ist es der falsche Galopp? Ein Kreuzgalopp? Oder einfach ein unausbalancierter Galopp? Diese drei zu unterscheiden, hilft dir, richtig zu reagieren.",
    illustration: tabelle("Galoppfehler", "Unterscheiden lernen", [
      ["Fehler", "Was passiert", "Gefühl"],
      ["Falscher Galopp", "Pferd galoppiert auf der falschen Hand", "schief, unausbalanciert in Wendungen"],
      ["Kreuzgalopp", "vorne anderer Galopp als hinten", "holprig, „verdreht“"],
      ["Viertakt", "Diagonale fußt nicht gleichzeitig", "flach, schleppend"],
      ["Kontergalopp", "gewollter Außengalopp", "kontrolliert, gebogen zur Führhand"],
    ]),
    terms: begriffe(
      ["Falscher Galopp", "Ungewollter Galopp auf der äußeren Hand, z. B. Linksgalopp auf der rechten Hand."],
      ["Kontergalopp (Außengalopp)", "Gewollter Galopp auf der äußeren Hand als Übung für Balance und Geraderichtung."],
      ["Kreuzgalopp", "Vorder- und Hinterbeine galoppieren auf verschiedenen Händen."],
      ["Umspringen", "Unerwünschter Wechsel der Galopphand."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Falscher Galopp",
          text: "Beim falschen Galopp springt das Pferd auf der Hand an, die nicht zur Richtung passt – zum Beispiel im Linksgalopp auf der rechten Hand. In Wendungen fühlt es sich dann unausbalanciert an, das Pferd fällt in die Kurve oder wird schneller.\n\nUrsachen: fehlende Stellung, Reiter belastet außen oder lehnt sich nach innen, Pferd ist auf dieser Seite schief, Hilfen kommen zum falschen Zeitpunkt, Schmerzen im Rücken oder in der Hinterhand.\n\nReaktion: ruhig durchparieren zum Trab, neu vorbereiten, an einer günstigen Stelle neu angaloppieren. Nicht schimpfen – das Pferd hat auf deine Hilfen oder seine Balance reagiert.",
        },
        {
          heading: "Kontergalopp: der gewollte Außengalopp",
          text: "Kontergalopp sieht aus wie falscher Galopp, ist aber gewollt: Das Pferd galoppiert bewusst auf der äußeren Hand, bleibt aber gestellt zur Seite des führenden Beins. Er ist eine wertvolle Übung für Balance, Geraderichtung und Gehorsam und Voraussetzung für Galoppwechsel.\n\nDer Unterschied liegt in der Kontrolle: Im Kontergalopp bleibt das Pferd im Takt, gestellt und ausbalanciert, und der Reiter hat die Hilfen bewusst so gegeben.",
        },
        {
          heading: "Kreuzgalopp",
          text: "Im Kreuzgalopp galoppieren Vorder- und Hinterbeine auf verschiedenen Händen, zum Beispiel vorne rechts, hinten links. Der Takt wird holprig, das Pferd fühlt sich an, als wäre es in der Mitte verdreht. Von hinten oder in einer Videoaufnahme ist es gut zu sehen.\n\nUrsachen: Pferd ist unausbalanciert, wechselt nur vorn um, hat Schmerzen in Rücken, Iliosakralbereich oder Hinterhand, oder es gibt Probleme mit dem Sattel. Häufiger oder dauerhafter Kreuzgalopp ist ein Grund für eine tierärztliche Untersuchung.\n\nReaktion: durchparieren, neu angaloppieren. Nicht im Kreuzgalopp weiterreiten.",
        },
        {
          heading: "Weitere Galoppfehler",
          text: "• Viertaktgalopp: Der Galopp wird flach und schleppend, die Schwebephase fehlt. Ursache: zu viel Hand, zu wenig Schwung, Versammlung ohne ausreichende Kraft. → Mehr vorwärts, Hand nachgeben, Schwung entwickeln.\n• Eiliger, flacher Galopp auf der Vorhand: Pferd unausbalanciert. → Galopp–Trab–Galopp-Übergänge, halbe Paraden.\n• Hinterhand nach innen: Pferd schief. → Schultervor im Galopp.\n• Umspringen in Wendungen oder Ecken: Balanceverlust oder Reiterfehler (äußerer Schenkel verrutscht). → Ecke abrunden, äußerer Schenkel bleibt verwahrend.",
        },
      ],
      praxis: {
        title: "Die Videoanalyse",
        text: "Scrabble fühlt sich im Linksgalopp manchmal holprig an. Wilhelm lässt sich filmen. In Zeitlupe sehen sie: In der Ecke springt Scrabble hinten um, vorne bleibt er im Linksgalopp – ein Kreuzgalopp. Es passiert immer in derselben Ecke, wenn Scrabble etwas schneller wird.\n\nWilhelm reitet die Ecke runder und gibt eine halbe Parade vorher. Weil Scrabble den Kreuzgalopp aber auch auf geraden Linien zeigt, lässt Hanna die Tierärztin draufschauen. Sie findet eine Verspannung im Iliosakralbereich, die behandelt wird. Danach galoppiert Scrabble deutlich sicherer.",
      },
      fehler: fehler(
        ["Im falschen Galopp oder Kreuzgalopp weiterreiten.", "Durchparieren und neu angaloppieren."],
        ["Das Pferd für falsches Anspringen bestrafen.", "Hilfen und Balance prüfen, ruhig neu beginnen."],
        ["Kontergalopp und falschen Galopp verwechseln.", "Kontergalopp ist gewollt, kontrolliert und gestellt."],
        ["Häufigen Kreuzgalopp als Erziehungsproblem sehen.", "Schmerz und Sattel tierärztlich abklären lassen."],
      ),
      richtig: [
        "Lerne, falschen Galopp, Kreuzgalopp und Viertakt zu fühlen.",
        "Pariere bei Fehlern ruhig durch und galoppiere neu an.",
        "Prüfe deine Hilfen: Stellung, Gewicht, äußerer Schenkel.",
        "Lass dich filmen, um Kreuzgalopp zu erkennen.",
        "Lass häufige Galoppfehler tierärztlich abklären.",
      ],
      merke: [
        "Falscher Galopp ist ungewollt, Kontergalopp gewollt.",
        "Kreuzgalopp: vorne und hinten verschieden – nicht weiterreiten.",
        "Häufiger Kreuzgalopp kann ein Schmerzzeichen sein.",
        "Viertaktgalopp entsteht oft durch zu viel Hand und zu wenig Schwung.",
      ],
      weiter: weiter(["Richtig angaloppieren", "ra-w18-l13"], ["Galopparbeit verbessern", "ra-w18-l16"], ["Konfliktsignale beim Reiten", "ra-w17-l10"]),
    },
    exercise: [
      wahl(
        "ra-w18-l15-entscheidung",
        "Auf der rechten Hand galoppiert dein Pferd ungewollt im Linksgalopp. Was tust du?",
        "Zum Trab durchparieren, neu vorbereiten und an einer günstigen Stelle neu angaloppieren",
        [
          ["Einfach weitergaloppieren", "Das Pferd lernt dabei nichts und ist in Wendungen unausbalanciert."],
          ["Mit der Gerte strafen", "Das Pferd hat auf Hilfen oder Balance reagiert – Strafe hilft nicht."],
        ],
        "Richtig. Ruhig korrigieren, Hilfen prüfen.",
      ),
    ],
    quiz: [
      frage("konter", "Was ist der Unterschied zwischen falschem Galopp und Kontergalopp?", "Kontergalopp ist gewollt und kontrolliert, falscher Galopp nicht", [["Es gibt keinen Unterschied", "Die Absicht und Kontrolle machen den Unterschied."], ["Kontergalopp ist schneller", "Tempo ist nicht der Unterschied."]], "Genau. Kontergalopp ist eine wertvolle Übung."),
      frage("kreuz", "Was passiert beim Kreuzgalopp?", "Vorder- und Hinterbeine galoppieren auf verschiedenen Händen", [["Das Pferd galoppiert über Kreuz durch die Bahn", "Es geht um die Beine, nicht um die Linie."], ["Das Pferd wechselt sauber die Hand", "Das wäre ein Galoppwechsel."]], "Richtig. Es fühlt sich holprig und verdreht an."),
      frage("ursache", "Was kann häufiger Kreuzgalopp bedeuten?", "Schmerzen in Rücken oder Hinterhand oder ein Sattelproblem", [["Das Pferd ist besonders talentiert", "Kreuzgalopp ist ein Fehler."], ["Gar nichts", "Häufiger Kreuzgalopp sollte abgeklärt werden."]], "Genau. Tierärztlich untersuchen lassen."),
    ],
  },

  /* ---------- 16. Galopparbeit ---------- */
  {
    slug: "galopparbeit-verbessern",
    title: "Galopparbeit verbessern und gezielt trainieren",
    speaker: "lea",
    intro:
      "Viele Pferde galoppieren nur ein paar Runden pro Reitstunde – meist schnell und flach. Dabei ist der Galopp eine der besten Gangarten, um Kraft, Balance und Losgelassenheit zu entwickeln. Mit gezieltem Training wird aus einem eiligen Galopp ein ruhiger, tragender.",
    illustration: scene("ak-bahn-zirkel"),
    terms: begriffe(
      ["Galopp–Trab–Galopp", "Übergangsreihe, die Kraft und Balance im Galopp verbessert."],
      ["Zirkel verkleinern im Galopp", "Übung zur Lastaufnahme des inneren Hinterbeins."],
      ["Arbeitsgalopp", "Natürliches, ausbalanciertes Grundtempo im Galopp."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Was einen guten Galopp ausmacht",
          text: "Ein guter Arbeitsgalopp ist taktklar im Dreitakt, mit deutlicher Schwebephase, im gleichmäßigen Tempo, bergauf und gerade. Das Pferd bleibt an der Hand, ohne sich daraufzulegen, und lässt sich mit feinen Hilfen zulegen und zurückführen.\n\nViele Pferde haben einen von Natur aus guten Galopp, andere brauchen Zeit, um ihn zu entwickeln. Junge oder schwach bemuskelte Pferde galoppieren oft eilig und flach, weil ihnen die Kraft fehlt, sich zu tragen.",
        },
        {
          heading: "Biomechanische Ziele",
          text: "Im Galopptraining willst du vor allem:\n\n• das innere Hinterbein kräftigen, das im Galopp viel Last trägt,\n• die Rumpfmuskulatur stärken, damit sich das Pferd bergauf bewegen kann,\n• das Gleichgewicht verbessern, damit das Pferd nicht auf die Vorhand fällt,\n• die Geradheit erhalten, damit beide Hinterbeine gleichmäßig arbeiten.\n\nDafür eignen sich Übergänge, Linienwechsel, Tempounterschiede und – später – Kontergalopp und Galoppwechsel.",
        },
        {
          heading: "Übungsreihen",
          text: "1. Galopp–Trab–Galopp auf dem Zirkel: drei bis fünf Galoppsprünge, durchparieren, wenige Tritte Trab, wieder angaloppieren. Kräftigt die Hinterhand und verbessert die Reaktion.\n2. Zirkel verkleinern und vergrößern im Galopp: Beim Verkleinern trägt das innere Hinterbein mehr; beim Vergrößern (mit Schultervor) wird das Pferd gerader.\n3. Tempounterschiede: Auf der langen Seite zulegen, vor der Ecke zurückführen.\n4. Galopp im leichten Sitz über Stangen oder im Gelände bergauf: Kraft und Takt.\n5. Kontergalopp auf flachen Bögen, sobald der Galopp ausbalanciert ist.\n\nDosierung: Galopp ist anstrengend. Lieber mehrere kurze Galoppreprisen auf beiden Händen als lange Runden, mit Erholungsphasen im Schritt.",
        },
        {
          heading: "Woran du Fortschritt erkennst",
          text: "• Das Pferd springt auf feine Hilfen an.\n• Es bleibt im Tempo, ohne dass du ständig treiben oder bremsen musst.\n• Die Übergänge Galopp–Trab werden flüssig, ohne Auseinanderfallen.\n• Der Galopp fühlt sich „runder“ und höher an.\n• Auf beiden Händen ähnlich gut.\n• Das Pferd schnaubt ab und bleibt losgelassen.\n\nMach dir regelmäßig Notizen oder Videos, um Fortschritte zu sehen – sie kommen langsam.",
        },
      ],
      praxis: {
        title: "Acht Wochen Galopptraining",
        text: "Tivoli galoppiert eilig und flach, vor allem auf der linken Hand. Lea plant mit ihrer Reitlehrerin acht Wochen: zweimal pro Woche Galopp–Trab–Galopp auf dem Zirkel, kurze Reprisen, beide Hände; einmal pro Woche Galopp im leichten Sitz bergauf im Gelände.\n\nNach vier Wochen springt Tivoli ruhiger an, nach acht Wochen kann Lea den Zirkel im Galopp verkleinern, ohne dass er eilt. Die Videos zeigen den Unterschied deutlich: Der Galopp ist runder, die Hinterhand springt weiter unter.",
      },
      fehler: fehler(
        ["Lange Runden im schnellen Galopp.", "Kurze, gezielte Reprisen mit Übergängen."],
        ["Nur auf der guten Hand galoppieren.", "Beide Hände gleichmäßig trainieren."],
        ["Kontergalopp zu früh verlangen.", "Erst Balance und Takt im Arbeitsgalopp sichern."],
        ["Fortschritt in Tagen erwarten.", "Kraft entsteht in Wochen und Monaten."],
      ),
      richtig: [
        "Prüfe den Galopp: Takt, Schwebe, Bergauf, Geradheit.",
        "Trainiere mit Galopp–Trab–Galopp-Übergängen.",
        "Nutze Zirkel verkleinern und vergrößern.",
        "Baue Bergauf-Galopp im Gelände ein.",
        "Dosiere: kurze Reprisen, Pausen, beide Hände.",
      ],
      merke: [
        "Ein guter Galopp ist taktklar, bergauf, gerade und gleichmäßig.",
        "Übergänge sind das wirksamste Galopptraining.",
        "Kurze Reprisen statt langer Runden.",
        "Kraft entsteht über Wochen.",
      ],
      weiter: weiter(["Einfache und fliegende Galoppwechsel", "ra-w18-l18"], ["Geländetraining sinnvoll aufbauen", "ra-w19-l12"], ["Übergänge und Tempounterschiede", "ra-w18-l11"]),
    },
    exercise: [
      wahl(
        "ra-w18-l16-entscheidung",
        "Dein Pferd galoppiert eilig und flach. Welche Übung hilft am meisten?",
        "Galopp–Trab–Galopp-Übergänge auf dem Zirkel in kurzen Reprisen",
        [
          ["Lange Galopprunden auf der ganzen Bahn", "Das festigt eher den eiligen Galopp."],
          ["Mit kürzeren Zügeln bremsen", "Bremsen mit der Hand führt oft zu Viertakt."],
        ],
        "Richtig. Übergänge kräftigen die Hinterhand und verbessern die Balance.",
      ),
    ],
    quiz: [
      frage("innen", "Welches Bein trägt im Galopp besonders viel Last?", "Das innere Hinterbein", [["Das äußere Vorderbein", "Das trägt weniger als das innere Hinterbein."], ["Alle Beine gleich", "Im Galopp ist die Belastung ungleich verteilt."]], "Genau. Deshalb ist Galopparbeit Krafttraining."),
      frage("dosierung", "Wie dosierst du Galopptraining?", "Mehrere kurze Reprisen auf beiden Händen mit Pausen", [["Eine lange Reprise bis zur Erschöpfung", "Das überfordert und verschlechtert die Qualität."], ["Nur ein Galoppsprung pro Woche", "Zu wenig, um Kraft aufzubauen."]], "Richtig. Qualität vor Menge."),
      frage("kontergalopp", "Wann ist Kontergalopp sinnvoll?", "Wenn der Arbeitsgalopp ausbalanciert und taktklar ist", [["Sofort am Anfang der Ausbildung", "Dafür braucht das Pferd Balance und Kraft."], ["Nie", "Er ist eine wertvolle Übung für Balance und Geraderichtung."]], "Genau. Dann verbessert er Balance und bereitet Wechsel vor."),
    ],
  },
];
