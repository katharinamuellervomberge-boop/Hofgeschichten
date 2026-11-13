import "server-only";
import { item, no, ok } from "../../build";
import type { deepLessonsOf } from "../../types";

type Input = Parameters<typeof deepLessonsOf>[1][number];

const tabelle = (label: string, title: string, table: string[][]) => ({ kind: "doc" as const, doc: { style: "lesson" as const, label, title, lines: [], table } });

/** Modul 10, Lektionen 1–5 */
export const teil1: Input[] = [
  /* ---------- 1. Grundbedürfnisse ---------- */
  {
    slug: "grundbeduerfnisse",
    title: "Die natürlichen Grundbedürfnisse des Pferdes",
    speaker: "mila",
    intro:
      "Ein Pferd steht in einer großen, sauberen Box, bekommt bestes Futter und wird jeden Tag geritten. Trotzdem webt es am Boxenfenster hin und her und ist beim Reiten angespannt. Wie kann das sein, wenn es ihm doch „an nichts fehlt“?",
    illustration: item("pferd"),
    terms: [
      { term: "Stereotypie", meaning: "Gleichförmig wiederholtes Verhalten ohne erkennbaren Zweck, z. B. Koppen, Weben, Boxenlaufen – ein Hinweis auf aktuelle oder frühere Haltungsprobleme." },
      { term: "Stehapparat", meaning: "System aus Sehnen und Bändern, mit dem Pferde im Stehen dösen können, ohne Muskelkraft aufzuwenden." },
      { term: "REM-Schlaf", meaning: "Tiefschlafphase, in der die Muskeln ganz erschlaffen. Pferde erreichen sie nur im Liegen." },
      { term: "Five Domains", meaning: "Modernes Tierwohl-Modell: Ernährung, Umwelt, Gesundheit und Verhaltensmöglichkeiten bestimmen gemeinsam, wie es einem Tier geht." },
    ],
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Ein Steppentier im Stall",
          text: "Pferde haben sich über Millionen Jahre in offenen Graslandschaften entwickelt. Sie sind Fluchttiere, leben in Gruppen und ernähren sich von faserreichem, energiearmem Futter, das sie in vielen kleinen Portionen über den ganzen Tag aufnehmen.\n\nDie Domestikation liegt erst wenige tausend Jahre zurück. Am Körperbau, an der Verdauung und am Verhalten hat sich in dieser Zeit wenig geändert. Ein Freizeitpferd im Pensionsstall hat deshalb im Kern dieselben Bedürfnisse wie seine Vorfahren in der Steppe: Bewegung, Artgenossen, Raufutter, Licht und Luft sowie Ruhe und Sicherheit.",
        },
        {
          heading: "Bewegung: viel, langsam und frei",
          text: "Frei lebende Pferde sind einen großen Teil des Tages in Bewegung – meist im ruhigen Schritt, während sie grasen. Diese gleichmäßige Bewegung ist kein Luxus: Sie unterstützt die Darmtätigkeit, die Durchblutung der Hufe, den Stoffwechsel von Sehnen und Gelenken und die Atmung.\n\nEine Stunde Reiten ersetzt das nicht. Training ist kurze, gezielte Belastung; das Grundbedürfnis ist stundenlange, ruhige Eigenbewegung. Die Leitlinien des Bundeslandwirtschaftsministeriums (BMEL) zur Pferdehaltung fordern deshalb täglich ausreichend Bewegung – nach Möglichkeit freie Bewegung, am besten zusammen mit Artgenossen.",
        },
        {
          heading: "Sozialkontakt: Sicherheit durch die Gruppe",
          text: "Für ein Fluchttier bedeutet die Herde Sicherheit. In der Gruppe kann ein Pferd sich hinlegen und tief schlafen, während andere aufpassen. Gegenseitige Fellpflege, gemeinsames Grasen und Spielen gehören zum normalen Verhalten.\n\nEinzelhaltung ohne Kontakt zu Artgenossen ist für Pferde eine erhebliche Belastung. Die Mindestanforderung ist Sicht-, Hör- und Geruchskontakt zu anderen Pferden. Besser ist direkter Körperkontakt – also Gruppenhaltung oder zumindest täglich gemeinsamer Auslauf mit verträglichen Partnern.",
        },
        {
          heading: "Fressen: zwölf Stunden und mehr",
          text: "Pferde verbringen unter natürlichen Bedingungen etwa 12 bis 16 Stunden am Tag mit Fressen. Ihr Magen ist klein und bildet ständig Säure – auch dann, wenn er leer ist. Kauen erzeugt Speichel, der die Säure abpuffert.\n\nDaraus folgen zwei Regeln, die in der Fachwelt weitgehend unstrittig sind: Raufutter (Heu, Heulage, Gras, Stroh) ist die Grundlage jeder Fütterung, und Fresspausen sollten nicht länger als etwa vier Stunden dauern. Wie Verdauung und Futtermengen genau zusammenhängen, lernst du in den Lektionen 5 und 7.",
        },
        {
          heading: "Licht, Luft, Ruhe und Schlaf",
          text: "Pferde brauchen Tageslicht für ihren Tag-Nacht-Rhythmus und frische Luft für ihre empfindlichen Atemwege. Staub aus Heu und Einstreu sowie Ammoniak aus Urin gehören zu den häufigsten Auslösern von Atemwegsproblemen im Stall.\n\nPferde dösen viel im Stehen – der Stehapparat macht das möglich. Den REM-Schlaf, die tiefste Schlafphase, erreichen sie aber nur im Liegen, und dafür brauchen sie einen trockenen, ausreichend großen Liegeplatz und das Gefühl, sicher zu sein. Pferde, die sich nicht hinlegen, etwa weil die Box zu klein, die Gruppe zu unruhig oder der Boden nass ist, können chronischen Schlafmangel entwickeln. Ein Warnzeichen sind Pferde, die im Stehen einschlafen und dabei plötzlich einknicken oder stolpern – das gehört tierärztlich abgeklärt.",
        },
        {
          heading: "Wenn Bedürfnisse zu kurz kommen",
          text: "Fehlen Bewegung, Kontakt oder Raufutter über längere Zeit, zeigt sich das oft im Verhalten: Unruhe, Aggression an der Box, Nervosität beim Reiten, Apathie oder Stereotypien wie Koppen, Weben und Boxenlaufen. Körperlich steigen unter anderem das Risiko für Magengeschwüre, Koliken und Atemwegserkrankungen.\n\nWichtig: Stereotypien sind keine Unarten. Sie sind ein Anzeichen dafür, dass ein Pferd mit seiner Situation nicht zurechtkommt oder früher nicht zurechtkam. Ein Gitter gegen Weben oder ein Riemen gegen Koppen unterdrückt das Symptom, löst aber die Ursache nicht – und kann zusätzlichen Stress erzeugen. Moderne Tierwohl-Modelle wie die „Five Domains“ fragen deshalb nicht nur, ob ein Pferd gesund ist, sondern auch, ob es sein normales Verhalten ausleben kann.",
        },
      ],
      praxis: {
        title: "Fino zieht um",
        text: "Wallach Fino, 12 Jahre, steht in einer Innenbox und kommt täglich eine Stunde allein auf einen Sandpaddock. Er bekommt dreimal am Tag Heu, nachts ist die Raufe ab etwa 22 Uhr leer. Fino webt am Fenster, schlägt beim Putzen nach der Bürste und ist in der Reitstunde schreckhaft.\n\nSeine Besitzerin lässt zuerst den Tierarzt Magen und Rücken untersuchen. Danach wechselt Fino in eine Paddockbox mit direktem Kontakt zum Nachbarpferd, kommt täglich mehrere Stunden mit zwei ruhigen Wallachen auf die Weide und bekommt nachts Heu aus einem engmaschigen Netz. Nach einigen Wochen webt er deutlich seltener, und im Unterricht ist er gelassener. Nicht jedes Pferd reagiert so schnell – aber die Richtung stimmt fast immer.",
      },
      fehler: [
        { fehler: "„Eine große Box und tägliches Reiten reichen.“", besser: "Training ersetzt keine stundenlange freie Bewegung mit Artgenossen." },
        { fehler: "Stereotypien mit Gittern oder Riemen „abstellen“.", besser: "Ursachen suchen: Bewegung, Kontakt, Raufutter, Schmerzen – und die Haltung verbessern." },
        { fehler: "Ein Pferd allein halten, weil es „sich nicht verträgt“.", besser: "Passende Partner suchen und behutsam eingewöhnen; mindestens Sicht-, Hör- und Geruchskontakt sichern." },
        { fehler: "Lange Nachtpausen ohne Heu in Kauf nehmen.", besser: "Raufutter so verteilen, dass Fresspausen nicht länger als etwa vier Stunden dauern." },
      ],
      richtig: [
        "Prüfe für dein Pferd die fünf Grundbedürfnisse: Bewegung, Sozialkontakt, Raufutter, Licht und Luft, Ruhe.",
        "Schreibe einen typischen Tag auf: Wie viele Stunden steht es, wie viele bewegt es sich frei, wann frisst es, mit wem hat es Kontakt?",
        "Beobachte das Verhalten über mehrere Tage, auch zu Zeiten, in denen du sonst nicht im Stall bist.",
        "Lass bei Verhaltensauffälligkeiten zuerst Schmerzen tierärztlich ausschließen.",
        "Verändere die Haltung schrittweise und beobachte, wie dein Pferd reagiert.",
      ],
      merke: [
        "Pferde sind Lauf-, Herden- und Dauerfresser – daran hat die Domestikation wenig geändert.",
        "Reiten ersetzt keine freie Bewegung mit Artgenossen.",
        "Raufutter ist die Basis; Fresspausen sollten höchstens etwa vier Stunden dauern.",
        "Tiefschlaf gibt es nur im Liegen – dafür braucht ein Pferd Platz und Sicherheit.",
        "Stereotypien sind ein Warnsignal, keine Unart.",
      ],
      weiter: [
        { lesson: "ra-w9-l4", label: "Grundkurs: Was Pferde zum Glücklichsein brauchen" },
        { lesson: "ra-w15-l2", label: "Haltungsformen im Vergleich" },
        { lesson: "ra-w15-l4", label: "Der natürliche Tagesrhythmus" },
        { lesson: "ra-w9-l2", label: "Leben in der Herde" },
      ],
      pruefen: "Aussagen zu Fresszeit (12–16 h), REM-Schlaf und Stereotypien; Formulierung zu Kopperriemen/Webegitter.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l1-entscheidung",
        prompt: "Ein Pferd in deinem Stall webt seit Wochen am Boxenfenster. Was ist der sinnvollste erste Schritt?",
        options: [
          ok("ursache", "Haltung prüfen (Bewegung, Kontakt, Raufutter) und Schmerzen tierärztlich abklären lassen"),
          no("gitter", "Ein Webegitter anbringen, damit es aufhört", "Das Gitter unterdrückt nur das Symptom. Die Ursache bleibt – und das Pferd steht weiter unter Stress."),
          no("kraftfutter", "Mehr Kraftfutter geben, damit es zufrieden ist", "Mehr Kraftfutter macht eher unruhiger. Fehlende Bewegung und Kauzeit ersetzt es nicht."),
          no("strafen", "Das Weben jedes Mal mit einem scharfen Wort unterbrechen", "Strafe erhöht den Stress und ändert nichts an der Ursache."),
        ],
        explain: "Genau. Weben ist ein Warnsignal. Erst Ursachen finden, dann die Haltung gezielt verbessern.",
      },
    ],
    quiz: [
      {
        id: "fressdauer",
        prompt: "Wie viele Stunden am Tag fressen Pferde unter natürlichen Bedingungen ungefähr?",
        options: [ok("12-16", "Etwa 12 bis 16 Stunden"), no("3-4", "Etwa 3 bis 4 Stunden", "Das wäre viel zu wenig – Pferde sind Dauerfresser."), no("6-8", "Etwa 6 bis 8 Stunden", "Pferde fressen deutlich länger, verteilt über Tag und Nacht.")],
        explain: "Richtig. Der kleine Magen und die Verdauung sind auf fast ununterbrochenes Fressen ausgelegt.",
      },
      {
        id: "rem",
        prompt: "Warum ist ein trockener, ausreichend großer Liegeplatz so wichtig?",
        options: [
          ok("rem", "Pferde erreichen den Tiefschlaf (REM-Schlaf) nur im Liegen"),
          no("verdauung", "Weil Pferde nur im Liegen verdauen können", "Verdauen funktioniert auch im Stehen – es geht um den Tiefschlaf."),
          no("fell", "Damit das Fell nicht schmutzig wird", "Sauberkeit ist schön, aber der eigentliche Grund ist der Schlaf."),
        ],
        explain: "Genau. Ohne sicheren Liegeplatz droht chronischer Schlafmangel.",
      },
      {
        id: "kontakt",
        prompt: "Was ist die Mindestanforderung an den Sozialkontakt bei Einzelhaltung?",
        options: [
          ok("sicht", "Sicht-, Hör- und Geruchskontakt zu anderen Pferden"),
          no("mensch", "Täglicher Kontakt zum Menschen reicht", "Der Mensch ersetzt keine Artgenossen."),
          no("spiegel", "Ein Spiegel in der Box", "Ein Spiegel kann manchmal etwas helfen, ist aber kein Ersatz für echte Pferde."),
        ],
        explain: "Richtig – und besser ist direkter Körperkontakt, etwa in der Gruppe.",
      },
      {
        id: "stereotypie",
        prompt: "Was sagt eine Stereotypie wie Koppen oder Weben aus?",
        options: [
          ok("warnsignal", "Sie ist ein Hinweis darauf, dass das Pferd mit seiner Situation nicht gut zurechtkommt oder kam"),
          no("unart", "Das Pferd ist ungezogen", "Stereotypien sind keine Erziehungsfrage."),
          no("langeweile", "Sie ist harmlos und nur ein Zeitvertreib", "Sie entsteht meist aus länger anhaltendem Stress oder Mangel – das sollte man ernst nehmen."),
        ],
        explain: "Genau. Gesucht werden Ursachen in Haltung, Fütterung und Gesundheit.",
      },
    ],
  },

  /* ---------- 2. Haltungsformen ---------- */
  {
    slug: "haltungsformen",
    title: "Haltungsformen: Box, Paddockbox, Offenstall, Aktivstall und Weide",
    speaker: "ben",
    intro:
      "„Offenstall ist immer besser als Box!“ – „Im Offenstall wird mein Pferd doch nur gejagt!“ Solche Sätze hörst du in jedem Reitstall. Wer hat recht? Die ehrliche Antwort: Die Haltungsform allein entscheidet nicht. Es kommt darauf an, wie gut sie umgesetzt ist.",
    illustration: tabelle("Überblick", "Haltungsformen im Vergleich", [
      ["", "Freie Bewegung", "Kontakt", "Einzelfütterung"],
      ["Box", "gering", "eingeschränkt", "einfach"],
      ["Paddockbox", "etwas mehr", "über Zaun", "einfach"],
      ["Offenstall", "viel", "direkt", "schwieriger"],
      ["Aktivstall", "viel", "direkt", "per Station"],
      ["Weide", "viel", "direkt", "schwierig"],
    ]),
    terms: [
      { term: "Widerristhöhe (Wh)", meaning: "Stockmaß des Pferdes. Viele Mindestmaße im Stall werden daraus berechnet." },
      { term: "Gruppenauslaufhaltung", meaning: "Offenstall: Gruppe mit Liegehalle und dauerhaft zugänglichem Auslauf." },
      { term: "Aktivstall", meaning: "Gruppenhaltung mit getrennten Bereichen zum Fressen, Trinken und Liegen, oft mit computergesteuerter Fütterung." },
    ],
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Woran man jede Haltung misst",
          text: "Jede Haltungsform lässt sich an denselben Fragen messen: Wie viel freie Bewegung hat das Pferd? Hat es direkten Kontakt zu Artgenossen? Bekommt es genug Raufutter ohne lange Pausen? Gibt es Licht, frische Luft und einen trockenen Liegeplatz? Und: Wie gut ist das Management – also wer kontrolliert, füttert, mistet und reagiert, wenn etwas nicht stimmt?\n\nDie BMEL-„Leitlinien zur Beurteilung von Pferdehaltungen unter Tierschutzgesichtspunkten“ (2009) gelten als Maßstab, den Behörden und Gerichte heranziehen. Sie sind keine Gesetze, beschreiben aber Mindestanforderungen. Die Leitlinien werden seit Jahren überarbeitet; einzelne Maße können sich daher künftig ändern.",
        },
        {
          heading: "Die Einzelbox",
          text: "In der Box lässt sich ein Pferd gut kontrollieren und individuell füttern; sie schützt vor Witterung und erleichtert die Pflege kranker Pferde. Der große Nachteil: Ein Pferd in der Box bewegt sich kaum und hat meist nur eingeschränkten Kontakt zu anderen.\n\nNach den Leitlinien soll eine Einzelbox mindestens (2 × Widerristhöhe)² groß sein, die schmale Seite mindestens 1,75 × Widerristhöhe. Für ein Pferd mit 1,65 m Stockmaß sind das (2 × 1,65)² ≈ 10,9 m². Wichtig: Auch eine große Box deckt das Bewegungsbedürfnis nicht. Boxenpferde brauchen täglich freie Bewegung auf Weide oder Paddock, möglichst mit Artgenossen. Außenboxen mit Fenster oder offenem Oberteil bieten mehr Licht, Luft und Umweltreize als reine Innenboxen.",
        },
        {
          heading: "Die Paddockbox",
          text: "Eine Paddockbox ist eine Box mit direkt angeschlossenem Auslauf, den das Pferd jederzeit betreten kann. Es kann rein und raus, hat mehr frische Luft, mehr Umweltreize und oft Kontakt zum Nachbarn über den Zaun.\n\nDer kleine Paddock ersetzt aber keine Bewegungsfläche: Viele Pferde stehen darin vor allem herum. Auch hier gehört täglicher Auslauf oder Weidegang dazu. Achte auf einen befestigten, trittsicheren Boden im Paddock – ein Matschloch ist schlecht für Hufe und Haut.",
        },
        {
          heading: "Offenstall: Gruppenauslaufhaltung",
          text: "Im Offenstall lebt eine Gruppe mit dauerhaftem Zugang zu einer Liegehalle und einem Auslauf. Bewegung und Sozialkontakt sind hier am besten erfüllt – wenn der Stall gut geplant ist.\n\nEntscheidend sind: genug Platz, damit rangniedere Pferde ausweichen können; keine Sackgassen; mehrere Fressplätze und Wasserstellen, damit niemand vertrieben wird; eine Liegefläche, auf der alle gleichzeitig liegen können; ein befestigter Boden an stark genutzten Stellen; und eine möglichst stabile Gruppe. Schwierig ist oft die Fütterung: Ein leichtfuttriges Pony und ein älterer, schwerfuttriger Warmblüter in derselben Gruppe brauchen sehr unterschiedliche Mengen.",
        },
        {
          heading: "Aktivstall",
          text: "„Aktivstall“ meint eine Gruppenhaltung, in der die Bereiche zum Fressen, Trinken und Liegen räumlich getrennt sind. Häufig erkennen Futterstationen jedes Pferd über einen Chip im Halsband und geben Raufutter oder Kraftfutter in kleinen, festgelegten Portionen. So laufen die Pferde zwischen den Bereichen hin und her und können trotzdem individuell gefüttert werden.\n\nDie Vorteile sind viel Bewegung, Sozialkontakt und genau steuerbare Rationen. Die Schwachstellen: Rangniedere Pferde werden an Stationen manchmal verdrängt, die Technik muss zuverlässig funktionieren, und neue Pferde brauchen eine sorgfältige Eingewöhnung. Ein guter Betrieb kontrolliert täglich, ob jedes Pferd seine Rationen tatsächlich abruft.",
        },
        {
          heading: "Weidehaltung – und was gar nicht geht",
          text: "Ganzjährige oder saisonale Weidehaltung kommt dem natürlichen Leben am nächsten. Auch Weidepferde brauchen aber einen Witterungsschutz (Bäume, Hecken oder einen Unterstand), jederzeit Wasser, im Winter zusätzliches Raufutter, befestigte Bereiche gegen Matsch und eine tägliche Kontrolle. Wo Gras sehr energiereich ist, kann reine Weidehaltung für leichtfuttrige Pferde zum Gesundheitsrisiko werden.\n\nDie Anbindehaltung, bei der ein Pferd dauerhaft im Ständer angebunden ist, gilt nach den Leitlinien als nicht tiergerecht und ist in Deutschland praktisch nicht mehr zulässig.\n\nFazit: Eine gut geführte Box mit viel Weidegang kann für ein Pferd besser sein als ein schlecht geplanter, überfüllter Offenstall. Beurteile immer die Umsetzung, nicht das Etikett.",
        },
      ],
      praxis: {
        title: "Lotte und der neue Offenstall",
        text: "Stute Lotte, 8 Jahre, kommt aus einer Boxenhaltung in einen Offenstall mit sieben Pferden. In den ersten Tagen steht sie meist allein am Rand des Auslaufs und kommt kaum an die Heuraufe. Der Stallbetreiber reagiert: Lotte lernt die Gruppe zuerst über den Zaun kennen, dann mit einem ruhigen Wallach allein, und erst danach geht sie in die Gruppe. Zusätzlich wird eine zweite Raufe am anderen Ende des Auslaufs aufgestellt.\n\nNach drei Wochen frisst Lotte entspannt, liegt in der Halle und hat einen festen Kumpel. Ohne die durchdachte Eingewöhnung und die zweite Futterstelle wäre der „bessere“ Offenstall für sie eine Stressquelle geblieben.",
      },
      fehler: [
        { fehler: "Die Haltungsform nur nach dem Namen beurteilen.", besser: "Bewegung, Kontakt, Raufutter, Liegeplatz und Management im Einzelnen prüfen." },
        { fehler: "Ein neues Pferd direkt in die Gruppe stellen.", besser: "Schrittweise eingewöhnen: erst über den Zaun, dann mit einem ruhigen Partner." },
        { fehler: "Nur eine Raufe und eine Tränke für eine große Gruppe.", besser: "Mehrere, weit auseinanderliegende Fress- und Wasserstellen einplanen." },
        { fehler: "Glauben, eine Paddockbox ersetze den Auslauf.", besser: "Auch Paddockbox-Pferde brauchen täglich Weide oder großen Auslauf mit Artgenossen." },
      ],
      richtig: [
        "Notiere für die aktuelle Haltung: Stunden freier Bewegung, Art des Sozialkontakts, Raufutterzugang, Liegeplatz.",
        "Miss bei Boxenhaltung nach: Ist die Box mindestens (2 × Widerristhöhe)² groß?",
        "Beobachte in Gruppen, ob rangniedere Pferde fressen, trinken und liegen können.",
        "Frage nach dem Management: Wer kontrolliert die Pferde täglich, wer füttert, was passiert im Notfall?",
        "Wähle die Haltung passend zum einzelnen Pferd – Alter, Gesundheit, Futtertyp und Charakter zählen mit.",
      ],
      merke: [
        "Keine Haltungsform ist automatisch gut oder schlecht – die Umsetzung entscheidet.",
        "Mindestgröße einer Einzelbox nach den Leitlinien: (2 × Widerristhöhe)².",
        "Boxenpferde brauchen täglich freie Bewegung mit Artgenossen.",
        "Gruppenhaltung braucht Platz, Ausweichmöglichkeiten und mehrere Futter- und Wasserstellen.",
        "Neue Pferde werden schrittweise in eine Gruppe eingewöhnt.",
      ],
      weiter: [
        { lesson: "ra-w15-l3", label: "Der optimale Pferdestall" },
        { lesson: "ra-w15-l14", label: "Gute Pferdehaltung erkennen und beurteilen" },
        { lesson: "ra-w9-l2", label: "Leben in der Herde" },
        { label: "Lernvideo „Stallhaltung vergleichen“ (in Produktion)" },
      ],
      pruefen: "Maße aus den BMEL-Leitlinien 2009 (Box, Schmalseite); Aussage zur Anbindehaltung; Stand der Leitlinien-Überarbeitung.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l2-entscheidung",
        prompt: "Ein Pferd hat 1,60 m Stockmaß. Wie groß muss seine Einzelbox nach den Leitlinien mindestens sein?",
        options: [
          ok("10", "Etwa 10,2 m² – also (2 × 1,60)²"),
          no("6", "Etwa 6,4 m²", "Das wäre 4 × 1,60. Gerechnet wird (2 × Widerristhöhe)² = 3,20 × 3,20."),
          no("16", "Etwa 16 m²", "Das wäre mehr als die Mindestgröße – schön, aber nicht die Mindestanforderung."),
        ],
        explain: "Richtig: 2 × 1,60 m = 3,20 m, und 3,20 × 3,20 ≈ 10,2 m². Die schmale Seite muss mindestens 1,75 × 1,60 = 2,80 m lang sein.",
      },
    ],
    quiz: [
      {
        id: "beste",
        prompt: "Welche Aussage über Haltungsformen stimmt?",
        options: [
          ok("umsetzung", "Wie gut eine Haltung ist, hängt vor allem von ihrer Umsetzung ab"),
          no("offen", "Offenstall ist immer die beste Lösung", "Ein überfüllter, schlecht geplanter Offenstall kann für einzelne Pferde viel Stress bedeuten."),
          no("box", "Boxenhaltung ist grundsätzlich tierschutzwidrig", "Eine ausreichend große Box mit täglichem freiem Auslauf und Kontakt kann tiergerecht sein."),
        ],
        explain: "Genau. Bewegung, Kontakt, Raufutter, Liegeplatz und Management zählen.",
      },
      {
        id: "aktiv",
        prompt: "Was ist typisch für einen Aktivstall?",
        options: [
          ok("bereiche", "Getrennte Bereiche für Fressen, Trinken und Liegen, oft mit Futterstationen"),
          no("einzel", "Jedes Pferd hat eine eigene Box mit Laufband", "Ein Aktivstall ist eine Gruppenhaltung."),
          no("training", "Die Pferde werden dort täglich trainiert", "„Aktiv“ bezieht sich auf die Eigenbewegung zwischen den Bereichen."),
        ],
        explain: "Richtig. Die Pferde laufen zwischen den Bereichen hin und her.",
      },
      {
        id: "gruppe",
        prompt: "Was braucht ein Offenstall, damit auch rangniedere Pferde zurechtkommen?",
        options: [
          ok("ausweichen", "Genug Platz zum Ausweichen und mehrere Futter- und Wasserstellen"),
          no("eine-raufe", "Eine große Raufe in der Mitte", "An einer einzigen Raufe werden rangniedere Pferde leicht vertrieben."),
          no("klein", "Möglichst wenig Fläche, damit sich die Pferde nahe sind", "Enge erhöht Konflikte. Pferde brauchen Abstand und Fluchtwege."),
        ],
        explain: "Genau. Platz und verteilte Ressourcen verringern Konflikte.",
      },
      {
        id: "weide",
        prompt: "Was brauchen auch Pferde in ganzjähriger Weidehaltung?",
        options: [
          ok("schutz", "Witterungsschutz, ständig Wasser, im Winter zusätzliches Raufutter und tägliche Kontrolle"),
          no("nichts", "Nichts weiter – die Natur sorgt für alles", "Auch Weidepferde brauchen Schutz, Wasser, Zufütterung und Kontrolle."),
          no("decke", "Vor allem eine Decke", "Ob eine Decke nötig ist, hängt vom einzelnen Pferd ab. Schutz, Wasser und Futter brauchen alle."),
        ],
        explain: "Richtig. Naturnah heißt nicht ohne Betreuung.",
      },
    ],
  },

  /* ---------- 3. Der optimale Stall ---------- */
  {
    slug: "der-optimale-stall",
    title: "Der optimale Pferdestall: Platz, Klima, Hygiene und Sicherheit",
    speaker: "lea",
    intro:
      "Viele Menschen finden einen warmen, windstillen Stall gemütlich – und schließen im Winter Fenster und Türen. Für Pferde ist genau das oft die schlechtere Wahl. Warum ist ein „kuscheliger“ Stall für Pferde nicht ideal?",
    illustration: item("stroh"),
    terms: [
      { term: "Außenklimastall", meaning: "Stall, dessen Klima dem Außenklima folgt – mit viel Frischluft, aber ohne Zugluft." },
      { term: "Schadgase", meaning: "Gase wie Ammoniak aus Urin und Mist, die die Atemwege reizen." },
      { term: "Zugluft", meaning: "Kalter, gerichteter Luftstrom, der ein ruhendes Pferd an einer Stelle trifft – nicht zu verwechseln mit allgemeinem Luftaustausch." },
    ],
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Platz und Maße",
          text: "Die BMEL-Leitlinien geben Mindestmaße vor, die sich an der Widerristhöhe (Wh) orientieren: Einzelbox mindestens (2 × Wh)², schmale Seite mindestens 1,75 × Wh, lichte Deckenhöhe mindestens 1,5 × Wh. Bei einem Pferd mit 1,70 m Stockmaß sind das rund 11,6 m² Boxenfläche und mindestens etwa 2,55 m Deckenhöhe.\n\nStallgassen sollten so breit sein, dass man ein Pferd sicher wenden und an einem anderen vorbeiführen kann. Merkblätter von Veterinärämtern nennen dafür mindestens 2,50 m, besser 3 m. Türen müssen breit und hoch genug sein, damit sich kein Pferd beim Durchgehen an Hüfte oder Kopf stößt.",
        },
        {
          heading: "Stallklima: frische Luft statt Wärme",
          text: "Ein gesundes Pferd mit Winterfell kommt mit Kälte gut zurecht. Problematisch sind dagegen stickige, feuchte Luft, Staub und Schadgase. Deshalb gilt in der Pferdehaltung das Prinzip des Außenklimastalls: Die Temperatur im Stall folgt ungefähr der Außentemperatur, die Luft wird ständig ausgetauscht.\n\nDer Unterschied zwischen Luftaustausch und Zugluft ist wichtig. Frische Luft, die über Dachfirst, Fenster oder offene Oberteile einströmt, ist erwünscht. Ein kalter, gerichteter Luftstrom, der ein ruhendes, nasses Pferd dauerhaft an einer Stelle trifft, ist es nicht. Kondenswasser an Wänden und Decke, ein muffiger Geruch und beschlagene Fenster sind Zeichen für zu wenig Lüftung.",
        },
        {
          heading: "Staub, Ammoniak und Licht",
          text: "Pferde atmen über viele Stunden Stallluft – oft direkt über der Einstreu, wenn sie liegen. Ammoniak aus Urin reizt die Schleimhäute; als Richtwert für Pferdeställe gelten 10 ppm. Wenn es dir beim Betreten der Box in den Augen brennt oder stechend riecht, ist der Wert deutlich überschritten. Staub entsteht vor allem beim Ausschütteln von Heu und Stroh und beim Misten.\n\nTageslicht ist für den Tagesrhythmus wichtig. Merkblätter von Veterinärämtern nennen als Richtwert eine Fensterfläche von mindestens einem Zwanzigstel der Stallgrundfläche, besser mehr. Ein Pferd sollte aus seiner Box nach draußen schauen können.",
        },
        {
          heading: "Hygiene",
          text: "Saubere, trockene Liegeflächen schützen Hufe und Haut und senken die Ammoniakbelastung. Nasse Stellen werden täglich entfernt, die Box regelmäßig gründlich gereinigt. Futtertröge und Tränken werden täglich kontrolliert und regelmäßig gesäubert, denn Futterreste und Algen sind ein Nährboden für Keime.\n\nFutter wird trocken, gut belüftet und für Nager unzugänglich gelagert. Mist lagert man mit Abstand zu Stall und Futterlager. Neue Pferde sollten nach Möglichkeit erst einige Zeit getrennt stehen, bevor sie in den Bestand kommen – Details zu Infektionen und Quarantäne folgen in Modul 11.",
        },
        {
          heading: "Sicherheit und Brandschutz",
          text: "In einem sicheren Stall gibt es keine vorstehenden Nägel, scharfen Kanten, losen Bretter oder Lücken, in denen sich ein Huf verfangen kann. Elektrische Leitungen und Lampen liegen außer Reichweite der Pferde und sind gegen Nagetiere geschützt. Die Stallgasse wird freigehalten – keine Schubkarren, Gabeln oder Sättel im Weg.\n\nBrände in Pferdeställen entstehen oft durch Elektrik, Rauchen oder feucht eingelagertes Heu, das sich selbst erhitzen kann. Deshalb: Rauchverbot, Feuerlöscher an bekannten Stellen, freie Fluchtwege, Heu und Stroh möglichst getrennt vom Stall lagern und frisch eingelagertes Heu in den ersten Wochen auf Erwärmung kontrollieren. In vielen Ställen hängt an jeder Boxentür ein Halfter mit Strick, damit Pferde im Notfall schnell hinausgeführt werden können.",
        },
      ],
      praxis: {
        title: "Der Riechtest am Morgen",
        text: "Hanna geht morgens als Erste in den Stall, bevor die Tore geöffnet werden. Sie bleibt kurz in der Stallgasse stehen und achtet auf ihre Nase und ihre Augen: Riecht es stechend? Brennt es? Sind die Fenster beschlagen? Im November fällt ihr auf, dass es in der hinteren Ecke deutlich stickiger ist. Die Ursache: Ein Fenster wurde wegen der Kälte geschlossen, und in zwei Boxen ist die Einstreu an den nassen Stellen zu lange liegen geblieben.\n\nNach dem Lüften, Ausmisten der nassen Stellen und einer Absprache mit dem Stallteam bleibt das Fenster nun dauerhaft gekippt. Den Pferden schadet die kühlere Luft nicht – im Gegenteil.",
      },
      fehler: [
        { fehler: "Im Winter alle Fenster und Türen schließen, damit es warm bleibt.", besser: "Frischluft sicherstellen; vor direkter Zugluft auf ruhende Pferde schützen." },
        { fehler: "Heu in der Stallgasse oder über den Boxen ausschütteln.", besser: "Heu staubarm lagern und vorlegen, beim Ausschütteln Pferde nicht direkt daneben." },
        { fehler: "Werkzeug und Schubkarre in der Stallgasse stehen lassen.", besser: "Stallgasse immer frei halten; Werkzeug sicher abstellen." },
        { fehler: "Nasse Stellen erst beim Wochenputz entfernen.", besser: "Nasse Einstreu täglich herausnehmen." },
      ],
      richtig: [
        "Prüfe beim Betreten des Stalls Geruch, Augenbrennen und Kondenswasser.",
        "Kontrolliere, ob jede Box nach außen gelüftet wird und Tageslicht bekommt.",
        "Miss eine Box nach und vergleiche mit (2 × Widerristhöhe)².",
        "Gehe einmal bewusst durch den Stall und suche Verletzungsquellen: Nägel, Kanten, Lücken, Kabel.",
        "Kenne Fluchtwege, Feuerlöscher und die Notfallnummern deines Stalls.",
      ],
      merke: [
        "Pferde brauchen frische Luft mehr als Wärme.",
        "Luftaustausch ist erwünscht, Zugluft auf ruhende Pferde nicht.",
        "Stechender Geruch bedeutet zu viel Ammoniak – nasse Einstreu raus und mehr lüften.",
        "Stallgasse frei, Fluchtwege frei, Rauchverbot im Stall.",
      ],
      weiter: [
        { lesson: "ra-w15-l13", label: "Stallmanagement und tägliche Versorgung" },
        { lesson: "ra-w15-l11", label: "Winterhaltung und Eindecken" },
        { label: "Modul 11: Atemwegserkrankungen und equines Asthma (in Vorbereitung)" },
      ],
      pruefen: "Maße (Deckenhöhe, Stallgasse, Fensterfläche) und Ammoniak-Richtwert 10 ppm; Hinweis Heu-Selbstentzündung.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l3-entscheidung",
        prompt: "Es ist Januar, minus 5 Grad. Im Stall riecht es stechend und die Fenster sind beschlagen. Was tust du?",
        options: [
          ok("lueften", "Lüften und nasse Einstreu entfernen – gesunde Pferde mit Winterfell vertragen die Kälte"),
          no("zu", "Alles geschlossen lassen, sonst erkälten sich die Pferde", "Stickige, ammoniakhaltige Luft schadet den Atemwegen mehr als kühle Frischluft."),
          no("heizung", "Eine Heizung aufstellen", "Wärme löst das Problem nicht – die Luft muss ausgetauscht werden."),
          no("decken", "Alle Pferde eindecken und dann lüften", "Ob ein Pferd eine Decke braucht, ist eine eigene Entscheidung. Die schlechte Luft ist das Problem."),
        ],
        explain: "Richtig. Beschlagene Fenster und stechender Geruch zeigen: zu wenig Luftaustausch.",
      },
    ],
    quiz: [
      {
        id: "klima",
        prompt: "Welches Stallklima ist für gesunde Pferde günstig?",
        options: [
          ok("aussen", "Ein Klima, das der Außentemperatur folgt, mit viel Frischluft"),
          no("warm", "Möglichst warm, etwa wie in einer Wohnung", "Warme, feuchte Luft belastet Atemwege und Fell."),
          no("dicht", "Dicht verschlossen, damit kein Luftzug entsteht", "Ohne Luftaustausch sammeln sich Staub und Ammoniak."),
        ],
        explain: "Genau. Frische Luft ist wichtiger als Wärme.",
      },
      {
        id: "ammoniak",
        prompt: "Woher kommt der stechende Geruch in schlecht gelüfteten Ställen?",
        options: [
          ok("urin", "Vor allem aus Ammoniak, das aus Urin in der Einstreu entsteht"),
          no("heu", "Aus frischem Heu", "Gutes Heu riecht aromatisch, nicht stechend."),
          no("pferd", "Vom Fell der Pferde", "Der stechende Geruch kommt aus Urin und Mist."),
        ],
        explain: "Richtig. Nasse Einstreu raus und lüften senkt die Belastung.",
      },
      {
        id: "decke",
        prompt: "Wie hoch soll die lichte Deckenhöhe im Pferdestall nach den Leitlinien mindestens sein?",
        options: [
          ok("15", "Mindestens 1,5 × Widerristhöhe"),
          no("1", "Genau so hoch wie das Pferd", "Das wäre gefährlich – ein Pferd hebt den Kopf deutlich über die Widerristhöhe."),
          no("3", "Mindestens 3 × Widerristhöhe", "So hoch muss sie nicht sein; Mindestwert ist 1,5 × Wh."),
        ],
        explain: "Genau. Bei 1,70 m Stockmaß also mindestens etwa 2,55 m.",
      },
      {
        id: "brand",
        prompt: "Welche Maßnahme gehört zum Brandschutz im Stall?",
        options: [
          ok("heu", "Frisch eingelagertes Heu auf Erwärmung kontrollieren"),
          no("kerzen", "Kerzen nur in der Stallgasse aufstellen", "Offenes Feuer hat im Stall nichts zu suchen."),
          no("tore", "Tore nachts abschließen und Schlüssel mitnehmen", "Im Notfall müssen Fluchtwege schnell zu öffnen sein."),
        ],
        explain: "Richtig. Feucht eingelagertes Heu kann sich selbst erhitzen und entzünden.",
      },
    ],
  },

  /* ---------- 4. Tagesrhythmus ---------- */
  {
    slug: "tagesrhythmus",
    title: "Der natürliche Tagesrhythmus und Pferdealltag",
    speaker: "mila",
    intro:
      "Kurz vor der Fütterung klopfen in vielen Ställen die Hufe gegen die Boxentüren, Pferde scharren, wiehern und drehen sich im Kreis. Sind das einfach verfressene Pferde – oder sagt uns dieses Verhalten etwas über ihren Tagesablauf?",
    illustration: item("uhr"),
    terms: [
      { term: "Polyphasisch", meaning: "Über den ganzen Tag in viele Abschnitte verteilt – so fressen, ruhen und bewegen sich Pferde." },
      { term: "Erwartungsstress", meaning: "Anspannung vor einem festen, wichtigen Ereignis wie der Fütterung." },
      { term: "Fressbremse", meaning: "Engmaschiges Heunetz oder eine Raufe mit Gitter, die das Fressen verlangsamt." },
    ],
    deep: {
      minutes: 7,
      sections: [
        {
          heading: "Ein Tag in der Herde",
          text: "Frei lebende Pferde teilen ihren Tag nicht in Mahlzeiten und Pausen, sondern in viele kurze Abschnitte: grasen, ein Stück weitergehen, dösen, wieder grasen, trinken, sich wälzen, gegenseitig putzen. Fressen nimmt dabei den größten Teil ein – etwa 12 bis 16 Stunden. Ruhen und Dösen folgen, Liegen macht nur einen kleinen Teil aus, meist in der Nacht und in den frühen Morgenstunden.\n\nEin solcher Rhythmus heißt polyphasisch: Pferde haben keine lange Schlafphase wie wir, sondern schlafen und fressen in vielen kurzen Abschnitten verteilt über 24 Stunden.",
        },
        {
          heading: "Was der Stallalltag daraus macht",
          text: "Im Stall bestimmt meist der Mensch den Takt: Fütterung um 7, 12 und 18 Uhr, Weidegang am Vormittag, Reiten am Abend. Für die Organisation ist das sinnvoll – für das Pferd entstehen aber Lücken. Wenn das letzte Heu um 18 Uhr gefüttert wird und um 22 Uhr aufgefressen ist, hat das Pferd bis zur Morgenfütterung neun Stunden Pause. Der Magen bildet in dieser Zeit weiter Säure.\n\nAuch das Hufeklopfen vor der Fütterung hat eine Ursache: Wenn wichtige Ereignisse selten und vorhersehbar sind, entsteht Erwartungsstress. Je länger die Pause vorher, desto stärker.",
        },
        {
          heading: "Raufutter über den Tag verteilen",
          text: "Die beste Lösung ist Raufutter zur freien Verfügung, wenn Futterqualität und Figur des Pferdes das zulassen. Bei leichtfuttrigen Pferden ist das oft nicht möglich. Dann helfen:\n\n• mehrere, gleichmäßig verteilte Heu-Portionen, auch spät abends und früh morgens\n• engmaschige Heunetze oder Raufen als Fressbremse, die die Fresszeit verlängern\n• zeitgesteuerte Heuraufen, die sich zu festen Zeiten öffnen\n• ein Anteil Stroh, das lange gekaut wird und wenig Energie liefert\n\nZiel ist, dass keine Fresspause länger als etwa vier Stunden dauert.",
        },
        {
          heading: "Ruhe, Routine und Training",
          text: "Pferde profitieren von Verlässlichkeit: Ähnliche Abläufe geben Sicherheit. Gleichzeitig sollten Ruhezeiten respektiert werden. Ein Stall, in dem bis spät abends Licht brennt, Musik läuft und ständig Pferde geholt werden, lässt wenig Zeit zum Dösen und Liegen.\n\nFür das Training gilt: Nach einer größeren Kraftfuttermahlzeit wird eine Pause empfohlen, bevor intensiv gearbeitet wird – oft genannt wird etwa eine Stunde oder mehr. Eine kleine Portion Heu vor dem Reiten ist dagegen sinnvoll, weil gekautes Heu und Speichel die Magensäure abpuffern und den Magen vor Säurespritzern schützen. Ein Pferd ganz nüchtern zu reiten, ist keine gute Idee.",
        },
      ],
      praxis: {
        title: "Neun Stunden Nachtpause",
        text: "Auf dem Hof gibt es im Winter Heu um 7, 12 und 18 Uhr. Tilda beobachtet, dass Tonga morgens gierig frisst, häufig gähnt und beim Satteln mit den Ohren nach hinten geht. Die Tierärztin vermutet unter anderem Magenprobleme und rät, die Nachtpause zu verkürzen.\n\nDer Stall richtet daraufhin eine Spätfütterung um 22 Uhr ein und gibt das Abendheu in ein engmaschiges Netz. Tonga hat jetzt nachts fast durchgehend etwas zu kauen. Nach einigen Wochen ist sie morgens ruhiger. Die Tierärztin kontrolliert den Verlauf – denn Verhalten allein ist kein Beweis für eine Diagnose.",
      },
      fehler: [
        { fehler: "Abends eine große Heuportion geben und dann bis morgens nichts.", besser: "Portionen verteilen, Spätfütterung oder Fressbremse nutzen." },
        { fehler: "Ein Pferd mit leerem Magen intensiv reiten.", besser: "Vor dem Reiten eine kleine Portion Heu anbieten." },
        { fehler: "Hufeklopfen vor der Fütterung als Ungezogenheit bestrafen.", besser: "Erwartungsstress verringern: kürzere Pausen, ruhigere Abläufe." },
        { fehler: "Pferde direkt nach einer großen Kraftfuttermahlzeit hart arbeiten.", besser: "Nach Kraftfutter eine Pause einplanen." },
      ],
      richtig: [
        "Schreibe auf, wann dein Pferd Heu bekommt und wie lange es dafür braucht.",
        "Finde die längste Fresspause des Tages – meist liegt sie in der Nacht.",
        "Besprich mit dem Stall, wie sich diese Pause auf höchstens etwa vier Stunden verkürzen lässt.",
        "Gib vor dem Reiten eine kleine Portion Heu und plane Kraftfutter so, dass danach Zeit zum Verdauen bleibt.",
        "Achte auf Ruhezeiten im Stall, vor allem abends und nachts.",
      ],
      merke: [
        "Pferde leben polyphasisch: Fressen, Dösen und Bewegung wechseln sich über 24 Stunden ab.",
        "Die längste Fresspause liegt im Stall oft in der Nacht.",
        "Fressbremsen und verteilte Portionen verlängern die Kauzeit.",
        "Vor dem Reiten etwas Heu – nach viel Kraftfutter erst eine Pause.",
      ],
      weiter: [
        { lesson: "ra-w15-l5", label: "Das Verdauungssystem verstehen" },
        { lesson: "ra-w15-l13", label: "Stallmanagement und tägliche Versorgung" },
        { lesson: "ra-w8-l2", label: "Warum Pausen wichtig sind" },
      ],
      pruefen: "Empfehlung Wartezeit nach Kraftfutter; Aussage Heu vor dem Reiten (Magenschutz).",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l4-entscheidung",
        prompt: "Heu gibt es um 7, 12 und 18 Uhr. Um 21 Uhr ist alles aufgefressen. Welche Änderung hilft am meisten?",
        options: [
          ok("spaet", "Eine Spätfütterung gegen 22–23 Uhr und das Abendheu in ein engmaschiges Netz"),
          no("morgen", "Morgens mehr Heu geben", "Die lange Pause liegt in der Nacht. Mehr Heu am Morgen ändert daran nichts."),
          no("kraftfutter", "Abends zusätzlich Kraftfutter geben", "Kraftfutter ist schnell gefressen und verkürzt die Kaupause kaum."),
        ],
        explain: "Genau. So wird die Nachtpause kürzer und die Kauzeit länger.",
      },
    ],
    quiz: [
      {
        id: "poly",
        prompt: "Was bedeutet „polyphasisch“ beim Pferd?",
        options: [
          ok("viele", "Fressen, Ruhen und Bewegung wechseln sich in vielen Abschnitten über 24 Stunden ab"),
          no("nacht", "Das Pferd schläft acht Stunden am Stück", "Pferde schlafen in vielen kurzen Abschnitten."),
          no("zwei", "Das Pferd frisst zweimal am Tag", "Pferde fressen in vielen kleinen Portionen."),
        ],
        explain: "Richtig. Darum passen lange Pausen nicht zum Pferd.",
      },
      {
        id: "klopfen",
        prompt: "Warum klopfen viele Pferde vor der Fütterung gegen die Tür?",
        options: [
          ok("erwartung", "Erwartungsstress nach einer langen Pause vor einem wichtigen Ereignis"),
          no("frech", "Weil sie frech sind", "Das Verhalten hat eine nachvollziehbare Ursache."),
          no("langeweile", "Aus reiner Freude", "Meist steckt Anspannung dahinter, nicht Freude."),
        ],
        explain: "Genau. Kürzere Pausen und ruhige Abläufe verringern diesen Stress.",
      },
      {
        id: "vor-reiten",
        prompt: "Was ist vor dem Reiten sinnvoll?",
        options: [
          ok("heu", "Eine kleine Portion Heu, damit der Magen nicht leer ist"),
          no("nuechtern", "Das Pferd nüchtern reiten", "Ein leerer Magen ist Säure stärker ausgesetzt."),
          no("hafer", "Direkt vorher eine große Portion Hafer", "Nach viel Kraftfutter braucht das Pferd eine Pause."),
        ],
        explain: "Richtig. Gekautes Heu und Speichel schützen den Magen.",
      },
    ],
  },

  /* ---------- 5. Verdauung ---------- */
  {
    slug: "verdauungssystem",
    title: "Das Verdauungssystem des Pferdes verstehen",
    speaker: "ben",
    intro:
      "Ein Pferd frisst etwa 10 Kilogramm Heu am Tag, aber sein Magen fasst nur ungefähr so viel wie ein großer Wassereimer. Wie passt das zusammen – und warum können Pferde nicht einmal erbrechen?",
    illustration: tabelle("Überblick", "Der Weg des Futters", [
      ["Abschnitt", "Ungefähre Größe", "Aufgabe"],
      ["Maul", "Zähne, Speichel", "zerkleinern, einspeicheln"],
      ["Magen", "ca. 10–15 l", "Vorverdauung, Säure"],
      ["Dünndarm", "ca. 20 m", "Stärke, Zucker, Eiweiß, Fett"],
      ["Blinddarm", "ca. 30 l", "Faser vergären"],
      ["Grimmdarm", "großes Volumen", "Faser vergären, Wasser"],
    ]),
    terms: [
      { term: "Dickdarmverdauer", meaning: "Pflanzenfresser, bei dem Mikroorganismen im Dickdarm die Faser abbauen – wie beim Pferd." },
      { term: "Flüchtige Fettsäuren", meaning: "Produkte der Faservergärung im Dickdarm; die wichtigste Energiequelle bei Raufutter." },
      { term: "Kardia", meaning: "Mageneingang mit starkem Schließmuskel; er verhindert, dass Pferde erbrechen." },
      { term: "Beckenflexur", meaning: "Enge Biegung des Grimmdarms – eine typische Stelle für Verstopfungen." },
    ],
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Ein Dickdarmverdauer",
          text: "Pferde sind Pflanzenfresser, die ihre Hauptnahrung – faserreiche Gräser – nicht selbst verdauen können. Diese Arbeit übernehmen Milliarden Mikroorganismen im Dickdarm. Anders als Kühe, die die Faser vor dem Magen vergären, tun Pferde das hinter dem Dünndarm. Man nennt sie deshalb Dickdarmverdauer.\n\nDer Weg des Futters: Maul → Speiseröhre → Magen → Dünndarm → Blinddarm → Grimmdarm → kleines Kolon → Mastdarm. Insgesamt ist der Verdauungstrakt eines Großpferdes rund 30 Meter lang. Jeder Abschnitt hat eine eigene Aufgabe – und eigene Schwachstellen.",
        },
        {
          heading: "Maul, Zähne und Speichel",
          text: "Die Verdauung beginnt mit dem Kauen. Pferde zermahlen das Futter mit seitlichen Kaubewegungen. Speichel bildet sich nur, während das Pferd kaut – und er enthält Bikarbonat, das Magensäure abpuffert.\n\nHeu muss viel länger gekaut werden als Kraftfutter. Pro Kilogramm Heu macht ein Pferd ein Vielfaches an Kauschlägen im Vergleich zu einem Kilogramm Hafer und bildet entsprechend mehr Speichel. Raufutter schützt also schon im Maul den Magen. Scharfe Zahnkanten oder Zahnschmerzen führen dazu, dass ein Pferd schlechter kaut – das hat Folgen für den gesamten Verdauungsweg (mehr in Modul 11).",
        },
        {
          heading: "Der Magen: klein und empfindlich",
          text: "Der Magen eines Großpferdes fasst etwa 10 bis 15 Liter – im Verhältnis zur Körpergröße sehr wenig. Er ist darauf ausgelegt, ständig kleine Mengen zu bekommen. Magensäure wird ununterbrochen gebildet, auch wenn der Magen leer ist.\n\nDer obere Teil der Magenschleimhaut hat keine Drüsen und ist kaum gegen Säure geschützt. Lange Fresspausen, viel Stärke und Stress begünstigen deshalb Magengeschwüre, die bei Pferden häufig vorkommen.\n\nAm Mageneingang sitzt ein kräftiger Schließmuskel, die Kardia. Er verhindert, dass Pferde erbrechen. Was im Magen ist, muss also weiter durch den Darm – ein Grund, warum Überfressen, verdorbenes Futter oder eine Schlundverstopfung für Pferde besonders gefährlich sind.",
        },
        {
          heading: "Der Dünndarm: schnelle Verdauung mit Grenzen",
          text: "Im etwa 20 Meter langen Dünndarm werden Stärke, Zucker, Eiweiß und Fett mithilfe von Enzymen zerlegt und aufgenommen. Pferde haben keine Gallenblase; die Galle fließt ständig in kleinen Mengen in den Darm – auch das passt zum Dauerfressen.\n\nDie Fähigkeit, Stärke im Dünndarm abzubauen, ist begrenzt. Bekommt ein Pferd auf einmal zu viel Getreide, gelangt unverdaute Stärke in den Dickdarm. Dort wird sie von anderen Bakterien schnell vergoren, es entsteht Milchsäure, die Darmflora gerät aus dem Gleichgewicht. Mögliche Folgen sind Kolik, Durchfall und Hufrehe. Eine verbreitete Empfehlung lautet deshalb, pro Mahlzeit nicht mehr als etwa 1 Gramm Stärke je Kilogramm Körpermasse zu füttern – bei empfindlichen Pferden weniger.",
        },
        {
          heading: "Der Dickdarm: die Gärkammer",
          text: "Blinddarm (rund 30 Liter) und Grimmdarm (deutlich größer) sind die eigentlichen Gärkammern. Hier bauen Mikroorganismen die Faser aus Heu und Gras ab. Dabei entstehen flüchtige Fettsäuren, die das Pferd als Hauptenergiequelle nutzt – und Wärme, die im Winter beim Warmhalten hilft. Das Futter bleibt hier oft ein bis zwei Tage.\n\nDie Mikroorganismen sind auf ihr gewohntes Futter spezialisiert. Wird das Futter plötzlich gewechselt, sterben manche ab, andere vermehren sich zu stark. Futterumstellungen sollten deshalb über etwa ein bis zwei Wochen erfolgen. Der Grimmdarm verläuft in Schleifen mit engen Biegungen wie der Beckenflexur; dort kann sich Futter stauen, besonders wenn ein Pferd zu wenig trinkt, schlecht kaut oder sich zu wenig bewegt.",
        },
        {
          heading: "Was das für die Fütterung bedeutet",
          text: "Aus dem Bau des Verdauungssystems ergeben sich fast alle Fütterungsregeln:\n\n• Raufutter ist die Basis – mengenmäßig und zeitlich.\n• Fresspausen kurz halten, höchstens etwa vier Stunden.\n• Kraftfutter nur bei Bedarf, in kleinen Portionen und nach dem Raufutter.\n• Futter langsam umstellen.\n• Immer Zugang zu sauberem Wasser.\n• Bewegung unterstützt die Darmtätigkeit.\n• Zähne regelmäßig kontrollieren lassen.\n\nWer diese Regeln versteht, braucht sie nicht auswendig zu lernen – sie folgen direkt aus dem, wie das Pferd gebaut ist.",
        },
      ],
      praxis: {
        title: "Die offene Futterkammer",
        text: "Am Sonntagmorgen steht Scrabble in der Stallgasse und frisst aus einem umgekippten Futtersack. Niemand weiß genau, wie viel er erwischt hat – vielleicht zwei, vielleicht vier Kilogramm Müsli. Wilhelm führt ihn sofort zurück in die Box, nimmt das restliche Futter weg und ruft die Tierärztin an, obwohl Scrabble noch ganz normal wirkt.\n\nDie Tierärztin erklärt: Eine große Menge Stärke auf einmal kann erst Stunden später zu Kolik oder Hufrehe führen. Sie kommt vorbei, untersucht ihn und gibt genaue Anweisungen. Scrabble wird in den folgenden Tagen engmaschig beobachtet. Seitdem hat die Futterkammer ein Schloss, das sich nicht von allein öffnet.",
      },
      fehler: [
        { fehler: "Viel Kraftfutter auf einmal füttern.", besser: "Bei Bedarf auf mehrere kleine Portionen verteilen, Stärke begrenzen." },
        { fehler: "Futter von einem Tag auf den anderen wechseln.", besser: "Neue Futtermittel über etwa ein bis zwei Wochen einschleichen." },
        { fehler: "Kraftfutter vor dem Heu geben.", besser: "Erst Raufutter, dann Kraftfutter – das bremst das Schlingen." },
        { fehler: "Nach einem Futtereinbruch abwarten, ob etwas passiert.", besser: "Sofort Tierarzt anrufen – Folgen zeigen sich oft erst nach Stunden." },
      ],
      richtig: [
        "Stelle sicher, dass Raufutter den größten Teil der Ration ausmacht.",
        "Teile Kraftfutter, falls nötig, auf mindestens zwei bis drei kleine Mahlzeiten auf.",
        "Plane jeden Futterwechsel über etwa ein bis zwei Wochen.",
        "Sorge für ständigen Zugang zu Wasser und tägliche Bewegung.",
        "Lass die Zähne regelmäßig kontrollieren.",
        "Sichere Futterlager so, dass kein Pferd hineinkommt.",
      ],
      merke: [
        "Pferde sind Dickdarmverdauer: Mikroorganismen bauen die Faser ab.",
        "Der Magen ist klein und bildet ständig Säure – Kauen und Speichel schützen ihn.",
        "Pferde können nicht erbrechen.",
        "Zu viel Stärke auf einmal bringt den Dickdarm aus dem Gleichgewicht.",
        "Futterwechsel immer langsam.",
      ],
      weiter: [
        { lesson: "ra-w15-l6", label: "Heu, Heulage, Gras und Raufutterqualität" },
        { lesson: "ra-w15-l8", label: "Kraftfutter, Mineralfutter und Ergänzungsfutter" },
        { label: "Lernvideo „So funktioniert die Pferdeverdauung“ (in Produktion)" },
        { label: "Modul 11: Kolik erkennen und richtig reagieren (in Vorbereitung)" },
      ],
      pruefen: "Größenangaben (Magen 10–15 l, Dünndarm ca. 20 m, Blinddarm ca. 30 l, Gesamtlänge ca. 30 m); Stärke-Richtwert 1 g/kg KM je Mahlzeit; Futterwechsel 1–2 Wochen.",
    },
    exercise: [
      {
        type: "choice",
        id: "ra-w15-l5-entscheidung",
        prompt: "Ein Pferd hat sich nachts an einem offenen Futtersack satt gefressen und wirkt morgens normal. Was ist richtig?",
        options: [
          ok("tierarzt", "Sofort den Tierarzt anrufen, auch wenn das Pferd noch normal wirkt"),
          no("abwarten", "Abwarten – es geht ihm ja gut", "Kolik oder Hufrehe können sich erst Stunden später zeigen. Früh handeln ist entscheidend."),
          no("wasser-weg", "Wasser wegnehmen, damit das Futter nicht aufquillt", "Wasser eigenmächtig zu entziehen ist keine sichere Maßnahme. Was zu tun ist, entscheidet die Tierärztin."),
          no("bewegen", "Eine Stunde kräftig longieren, damit es verdaut", "Belastung ist keine Behandlung. Erst tierärztlich klären lassen."),
        ],
        explain: "Richtig. Ein Futtereinbruch ist ein Fall für den Tierarzt – bevor Symptome auftreten.",
      },
    ],
    quiz: [
      {
        id: "erbrechen",
        prompt: "Warum ist Überfressen für Pferde besonders gefährlich?",
        options: [
          ok("kardia", "Pferde können wegen des starken Schließmuskels am Mageneingang nicht erbrechen"),
          no("zaehne", "Weil Pferde keine Backenzähne haben", "Pferde haben kräftige Backenzähne."),
          no("magen-gross", "Weil ihr Magen sehr groß ist", "Der Magen ist im Gegenteil sehr klein."),
        ],
        explain: "Genau. Was im Magen ist, muss den ganzen Darm passieren.",
      },
      {
        id: "faser",
        prompt: "Wo wird die Faser aus Heu und Gras hauptsächlich abgebaut?",
        options: [
          ok("dickdarm", "Im Dickdarm (Blinddarm und Grimmdarm) durch Mikroorganismen"),
          no("magen", "Im Magen durch Magensäure", "Magensäure kann Faser nicht abbauen."),
          no("duenndarm", "Im Dünndarm durch Enzyme", "Dort werden vor allem Stärke, Zucker, Eiweiß und Fett verdaut."),
        ],
        explain: "Richtig. Darum heißt das Pferd Dickdarmverdauer.",
      },
      {
        id: "saeure",
        prompt: "Warum sind lange Fresspausen schlecht für den Magen?",
        options: [
          ok("saeure", "Weil der Magen ständig Säure bildet – auch wenn er leer ist"),
          no("hunger", "Weil das Pferd dann zu dick wird", "Es geht um die Magensäure, nicht ums Gewicht."),
          no("zaehne", "Weil die Zähne sonst zu lang werden", "Zahnabrieb ist ein anderes Thema."),
        ],
        explain: "Genau. Ohne Kauen fehlt der schützende Speichel.",
      },
      {
        id: "wechsel",
        prompt: "Wie lange sollte eine Futterumstellung ungefähr dauern?",
        options: [
          ok("woche", "Etwa ein bis zwei Wochen"),
          no("tag", "Einen Tag", "Die Darmflora braucht viel länger, um sich anzupassen."),
          no("monate", "Mindestens drei Monate", "So lange ist meist nicht nötig."),
        ],
        explain: "Richtig. So können sich die Mikroorganismen anpassen.",
      },
    ],
  },
];
