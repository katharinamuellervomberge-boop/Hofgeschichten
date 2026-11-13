import "server-only";
import { item } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 11, Lektionen 15–18 */
export const teil4: DeepInput[] = [
  /* ---------- 15. Infektionen, Impfungen, Parasiten ---------- */
  {
    slug: "impfungen-parasiten",
    title: "Infektionen, Impfungen und Parasitenmanagement",
    speaker: "lea",
    intro:
      "Früher wurden alle Pferde eines Stalls viermal im Jahr „durchentwurmt“. Heute raten Fachleute davon ab. Warum – und was ist mit Impfungen, Quarantäne und Hygiene, wenn neue Pferde in den Stall kommen?",
    illustration: tabelle("Impfungen", "Standardimpfungen für Pferde in Deutschland (StIKo Vet)", [
      ["Impfung gegen", "Warum"],
      ["Tetanus", "Wundstarrkrampf, beim Pferd oft tödlich"],
      ["Influenza", "ansteckende Atemwegsinfektion; für Turniere Pflicht"],
      ["Herpes (EHV-1/-4)", "Atemwege, Aborte, neurologische Form"],
    ]),
    terms: begriffe(
      ["StIKo Vet", "Ständige Impfkommission Veterinärmedizin; gibt Impfempfehlungen für Tiere in Deutschland heraus."],
      ["Grundimmunisierung", "Erste Impfserie aus mehreren Impfungen, die den Schutz aufbaut."],
      ["Selektive Entwurmung", "Entwurmen nach Kotuntersuchung: nur Pferde behandeln, die es brauchen."],
      ["Resistenz", "Wurmmittel wirken nicht mehr, weil die Würmer unempfindlich geworden sind."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Impfungen",
          text: "Die StIKo Vet empfiehlt für alle Pferde in Deutschland Impfungen gegen Tetanus, Influenza und Herpes (EHV-1 und EHV-4). Gegen weitere Erkrankungen wie Druse, West-Nil-Virus oder Tollwut kann je nach Situation geimpft werden – das entscheidet der Tierarzt.\n\nZur Grundimmunisierung gehören mehrere Impfungen in festen Abständen. Danach folgen Wiederholungsimpfungen; bei Influenza und Herpes meist halbjährlich, bei Tetanus in längeren Abständen. Das genaue Schema legt der Tierarzt fest. Für Turnierpferde schreibt die FN bestimmte Impfungen und Fristen vor; maßgeblich sind die aktuellen Bestimmungen der FN.\n\nAlle Impfungen werden im Equidenpass eingetragen. Je mehr Pferde in einem Stall geimpft sind, desto besser ist auch der Schutz für die Gruppe.",
        },
        {
          heading: "Neue Pferde und Hygiene",
          text: "Viele ansteckende Krankheiten kommen mit neuen Pferden oder nach Turnieren und Lehrgängen in einen Stall. Bewährt hat sich:\n\n• Neue Pferde nach Möglichkeit zwei bis drei Wochen getrennt aufstellen und täglich Fieber messen.\n• Vor dem Einzug Impfstatus prüfen und eine Kotprobe untersuchen lassen.\n• Eigenes Zubehör für jedes Pferd: Putzzeug, Eimer, Decken.\n• Gemeinsame Tränken und Futtertröge regelmäßig reinigen.\n• Bei Fieber, Husten oder Nasenausfluss: Pferd trennen und Tierarzt informieren.\n\nManche Krankheiten sind anzeigepflichtig oder meldepflichtig. Das bewertet und meldet der Tierarzt.",
        },
        {
          heading: "Parasiten: warum nicht mehr alle entwurmen?",
          text: "Würmer im Darm sind bei Pferden normal; problematisch werden sie, wenn sehr viele vorhanden sind. Jahrzehntelanges, regelmäßiges Entwurmen aller Pferde hat dazu geführt, dass viele Würmer gegen gängige Wurmmittel resistent sind. Jede unnötige Behandlung beschleunigt das.\n\nDeshalb wird heute meist selektiv entwurmt: Mehrmals im Jahr wird eine Kotprobe untersucht. Die Zahl der Wurmeier pro Gramm Kot zeigt, wie stark ein Pferd Eier ausscheidet. Nur Pferde mit hoher Eizahl werden behandelt; viele erwachsene Pferde scheiden dauerhaft wenige Eier aus. Für bestimmte Würmer wie Bandwürmer oder große Strongyliden gibt es zusätzliche Untersuchungen oder gezielte Behandlungen. Fohlen und Jungpferde brauchen ein eigenes Programm.\n\nDen Plan erstellt der Tierarzt. Nach einer Behandlung kann eine zweite Kotprobe zeigen, ob das Mittel gewirkt hat.",
        },
        {
          heading: "Weidehygiene",
          text: "Die wichtigste Maßnahme gegen Wurmbefall ist nicht das Medikament, sondern die Weide: Regelmäßiges Abäppeln – auf Weiden und Paddocks mindestens ein- bis zweimal pro Woche – entfernt Wurmeier, bevor Larven daraus schlüpfen. Weitere Maßnahmen: Weiden nicht überbesetzen, Flächen abwechselnd nutzen, Mahd oder Beweidung durch andere Tierarten, keine frische Pferdemist-Düngung auf Pferdeweiden.\n\nIm Sommer kommen äußere Parasiten dazu: Zecken, Läuse, Milben. Hier helfen regelmäßige Kontrolle beim Putzen und bei Befall eine tierärztlich abgestimmte Behandlung.",
        },
      ],
      praxis: {
        title: "Kotproben statt Kalender",
        text: "Früher wurden auf dem Hof alle Pferde im März, Juni, September und Dezember entwurmt. Seit zwei Jahren nimmt Hanna im Frühjahr, Sommer und Herbst von jedem Pferd eine Kotprobe. Das Ergebnis überrascht viele Einsteller: Tivoli und Tonga haben fast immer sehr niedrige Eizahlen, Scrabble regelmäßig eine höhere.\n\nNur Scrabble wird nach Absprache mit der Tierärztin behandelt, und eine Kontrollprobe zeigt, dass das Mittel wirkt. Zusätzlich wird auf allen Weiden zweimal pro Woche abgeäppelt. Die Pferde bekommen insgesamt weniger Wurmmittel – und der Stall trägt dazu bei, dass die Mittel auch in Zukunft wirken.",
      },
      fehler: fehler(
        ["Alle Pferde mehrmals im Jahr ohne Kotprobe entwurmen.", "Selektiv nach Kotuntersuchung und tierärztlichem Plan."],
        ["Impfungen verschieben, weil das Pferd „ja nie krank ist“.", "Impfschema einhalten und im Pass dokumentieren."],
        ["Ein neues Pferd sofort in die Gruppe stellen.", "Wenn möglich zwei bis drei Wochen getrennt, Fieber messen."],
        ["Nur auf Wurmmittel setzen und nicht abäppeln.", "Weidehygiene ist die wichtigste Maßnahme."],
      ),
      richtig: [
        "Halte die Standardimpfungen nach dem Schema deines Tierarztes ein.",
        "Prüfe vor dem Einzug neuer Pferde Impfstatus und Kotprobe.",
        "Stelle neue Pferde möglichst einige Wochen getrennt und miss Fieber.",
        "Lass mehrmals im Jahr Kotproben untersuchen und entwurme nur nach Plan.",
        "Äpple Weiden und Paddocks regelmäßig ab.",
        "Nutze eigenes Zubehör für jedes Pferd.",
      ],
      merke: [
        "Standardimpfungen: Tetanus, Influenza, Herpes.",
        "Selektiv entwurmen nach Kotprobe – Resistenzen vermeiden.",
        "Abäppeln ist die wichtigste Maßnahme gegen Würmer.",
        "Neue Pferde erst eine Zeit getrennt aufstellen.",
      ],
      weiter: weiter(["Weidehaltung, Anweiden und Giftpflanzen", "ra-w15-l10"], ["Atemwegserkrankungen und equines Asthma", "ra-w16-l13"], ["Gesundheitsvorsorge und langfristiges Management", "ra-w16-l18"]),
    },
    exercise: [
      wahl(
        "ra-w16-l15-entscheidung",
        "Ein neues Pferd kommt in den Stall. Was ist am sinnvollsten?",
        "Impfpass und Kotprobe prüfen, das Pferd einige Wochen getrennt aufstellen und täglich Fieber messen",
        [
          ["Sofort in die Gruppe, dann gewöhnt es sich am schnellsten ein", "So können Krankheiten und Parasiten ungehindert in den Bestand gelangen."],
          ["Vorsorglich direkt entwurmen und dann in die Gruppe", "Ohne Kotprobe weiß man nicht, ob und womit behandelt werden muss."],
        ],
        "Richtig. So schützt du die Pferde im Stall und das neue Pferd.",
      ),
    ],
    quiz: [
      frage("impfung", "Welche Impfungen empfiehlt die StIKo Vet für alle Pferde?", "Tetanus, Influenza und Herpes", [["Nur Tollwut", "Tollwut gehört nicht zu den Standardimpfungen für Pferde."], ["Keine – Pferde brauchen keine Impfungen", "Impfungen sind ein wichtiger Teil der Vorsorge."]], "Genau. Weitere Impfungen je nach Situation."),
      frage("selektiv", "Warum entwurmt man heute selektiv?", "Weil unnötige Behandlungen Resistenzen fördern", [["Weil Wurmmittel verboten wurden", "Wurmmittel sind erlaubt, sollen aber gezielt eingesetzt werden."], ["Weil Pferde keine Würmer mehr haben", "Würmer gibt es weiterhin."]], "Richtig. So wirken die Mittel auch in Zukunft."),
      frage("abaeppeln", "Was ist die wichtigste Maßnahme gegen Wurmbefall auf der Weide?", "Regelmäßiges Abäppeln", [["Weiden nie mähen", "Mahd ist eher hilfreich."], ["Mehr Pferde auf eine Fläche", "Überbesatz erhöht den Wurmdruck."]], "Genau. Mindestens ein- bis zweimal pro Woche."),
      frage("pass", "Wo werden Impfungen eingetragen?", "Im Equidenpass", [["Nur auf einem Zettel am Spind", "Der Pass ist das offizielle Dokument."], ["Nirgends", "Impfungen müssen nachvollziehbar dokumentiert sein."]], "Richtig. Bei Turnieren wird der Pass kontrolliert."),
    ],
  },

  /* ---------- 16. Erste Hilfe ---------- */
  {
    slug: "erste-hilfe-notfall",
    title: "Erste Hilfe und Verhalten im Notfall",
    speaker: "mila",
    intro:
      "Im Notfall hat niemand Zeit, in Ruhe nachzulesen. Was dann hilft, ist ein klarer Ablauf, den man vorher geübt hat – und das Wissen, was man besser nicht tut.",
    illustration: tabelle("Notfall", "Der Ablauf", [
      ["1", "Eigenschutz und Sicherheit"],
      ["2", "Lage einschätzen"],
      ["3", "Tierarzt / Notruf"],
      ["4", "Sichere Sofortmaßnahmen"],
      ["5", "Beobachten und dokumentieren"],
    ]),
    terms: begriffe(
      ["Eigenschutz", "Die eigene Sicherheit und die anderer Menschen kommt zuerst."],
      ["Festliegen", "Pferd liegt und kann nicht oder nur mit großer Mühe aufstehen."],
      ["Notfallkontakte", "Telefonnummern von Tierarzt, Tierklinik, Besitzer, Hufschmied und Transportmöglichkeit."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Der Ablauf",
          text: "1. Eigenschutz: Ein Pferd in Panik oder mit starken Schmerzen kann treten, steigen, sich werfen. Kein Pferd ist wichtiger als ein Mensch. Abstand halten, Hilfe holen, nie allein in gefährliche Situationen gehen.\n2. Sicherheit schaffen: andere Pferde wegbringen, Strom am Zaun abschalten, Verkehr warnen.\n3. Lage einschätzen: Was ist passiert? Ist das Pferd bei Bewusstsein, steht es, blutet es, atmet es normal?\n4. Hilfe rufen: Tierarzt; bei verletzten Menschen den Notruf 112. Ruhig und konkret beschreiben.\n5. Sichere Sofortmaßnahmen: nur das, was du sicher kannst.\n6. Beobachten und notieren: PAT-Werte, Uhrzeit, Veränderungen.\n\nDiesen Ablauf kannst du mit jedem Notfall durchgehen – bei Kolik, Verletzung, Unfall oder Feuer.",
        },
        {
          heading: "Was du am Telefon sagst",
          text: "Der Tierarzt kann dir am Telefon nur so gut helfen, wie du beschreibst:\n\n• Wer ruft an, welches Pferd, wo genau (Adresse, Zufahrt)?\n• Was ist passiert, seit wann?\n• Was siehst du: Verhalten, Stand, Blutung, Wunde, Schmerzzeichen?\n• Werte: Puls, Atmung, Temperatur, Schleimhäute\n• Was hast du schon getan?\n• Vorerkrankungen, Medikamente, letzte Fütterung, Impfstatus\n\nSchick, wenn möglich, Fotos oder ein kurzes Video. Notiere, was der Tierarzt dir sagt, und frag nach, wenn du etwas nicht verstehst.",
        },
        {
          heading: "Typische Notfälle",
          text: "• Pferd im Zaun verfangen: Strom abschalten, Pferd beruhigen, Zaun mit Zange oder Messer durchtrennen – nicht am Pferd zerren. Danach Beine auf Verletzungen prüfen.\n• Pferd festliegend: Abstand, Tierarzt sofort. Nicht versuchen, ein Pferd mit Gewalt hochzuziehen. Kopf mit Polster vor Verletzungen schützen, wenn das sicher möglich ist.\n• Pferd in der Box festgelegen (zu nah an der Wand): ruhig bleiben, Hilfe holen; erfahrene Personen können es mit Seilen umdrehen – nicht allein versuchen.\n• Stallbrand: 112 rufen, Menschen in Sicherheit bringen, Pferde nur herausholen, wenn es ohne Gefahr möglich ist, und sie auf eine sichere, umzäunte Fläche bringen – nicht frei laufen lassen, denn Pferde laufen oft in den vertrauten Stall zurück.\n• Pferd entlaufen: Ruhe bewahren, nicht hinterherrennen, Verkehr warnen, mit Futtereimer und bekanntem Pferd locken.",
        },
        {
          heading: "Was du besser nicht tust",
          text: "• Keine Medikamente ohne tierärztliche Anweisung – auch keine „bewährten“ aus dem Nachbarstall.\n• Kein Futter und kein Wasser einflößen.\n• Fremdkörper in tiefen Wunden oder in der Sohle nicht herausziehen.\n• Ein verletztes Pferd nicht zu einem Transport zwingen, bevor der Tierarzt es beurteilt hat.\n• Nicht allein in gefährliche Situationen gehen.\n\nVorbereitung ist der beste Notfallschutz: Notfallnummern im Handy und im Stall, Stallapotheke vollständig, Transportmöglichkeit geklärt, Ablauf mit allen im Stall besprochen.",
        },
      ],
      praxis: {
        title: "Im Zaun verfangen",
        text: "Am Abend hört Ben ein lautes Wiehern von der Weide. Tivoli steht mit einem Hinterbein in einer heruntergetretenen Litze, die Litze hat sich um die Fessel gewickelt. Ben läuft nicht direkt hin, sondern ruft Mats und schaltet zuerst das Weidezaungerät ab. Mats beruhigt Tivoli von vorn mit ruhiger Stimme, Ben schneidet die Litze mit der Zange aus dem Stallnotfallkasten durch.\n\nDanach führen sie Tivoli langsam auf den Hof und prüfen das Bein: eine oberflächliche Schürfung, Tivoli geht klar. Sie fotografieren die Stelle und schicken das Bild der Tierärztin, die eine kurze Kontrolle am nächsten Tag empfiehlt.",
      },
      fehler: fehler(
        ["Sofort ohne Nachdenken zum Pferd laufen.", "Erst Eigenschutz und Sicherheit."],
        ["Ein Pferd mit Gewalt aus dem Zaun ziehen.", "Strom aus, Zaun durchschneiden, Pferd beruhigen."],
        ["Am Telefon nur „Es ist was passiert!“ sagen.", "Konkret: wer, wo, was, seit wann, Werte."],
        ["Bei einem Brand befreite Pferde frei laufen lassen.", "Auf eine sichere, umzäunte Fläche bringen."],
      ),
      richtig: [
        "Erst Eigenschutz, dann Sicherheit für andere.",
        "Lage einschätzen und Hilfe rufen.",
        "Am Telefon konkret beschreiben und Werte durchgeben.",
        "Nur sichere Sofortmaßnahmen durchführen.",
        "Beobachten, Werte mit Uhrzeit notieren.",
        "Notfallnummern, Stallapotheke und Transport vorher klären.",
      ],
      merke: [
        "Eigenschutz geht immer vor.",
        "Ruhig bleiben, Hilfe holen, konkret beschreiben.",
        "Keine Medikamente ohne Anweisung, nichts einflößen, Fremdkörper stecken lassen.",
        "Vorbereitung ist der beste Notfallschutz.",
      ],
      weiter: weiter(["Kolik", "ra-w16-l10"], ["Verletzungen und Wundversorgung", "ra-w16-l14"], ["Die vollständige Stallapotheke", "ra-w16-l17"], ["Stallmanagement und tägliche Versorgung", "ra-w15-l13"]),
    },
    exercise: [
      wahl(
        "ra-w16-l16-entscheidung",
        "Ein Pferd hat sich im Stromzaun verfangen und zappelt. Was tust du zuerst?",
        "Strom abschalten, Hilfe rufen und dann ruhig den Zaun durchtrennen",
        [
          ["Am Halfter ziehen, bis das Bein frei ist", "Ziehen kann das Bein schwer verletzen und dich in Gefahr bringen."],
          ["Direkt zum Bein greifen und die Litze abwickeln", "Ohne abgeschalteten Strom und Ruhe ist das gefährlich."],
        ],
        "Richtig. Sicherheit zuerst, dann befreien.",
      ),
    ],
    quiz: [
      frage("erst", "Was kommt im Notfall immer zuerst?", "Eigenschutz", [["Das Pferd sofort festhalten", "Ohne Eigenschutz kannst du schwer verletzt werden."], ["Fotos für die Versicherung", "Fotos sind hilfreich, aber nicht zuerst."]], "Genau. Kein Pferd ist wichtiger als ein Mensch."),
      frage("brand", "Warum lässt man befreite Pferde bei einem Brand nicht frei laufen?", "Weil sie oft in den vertrauten Stall zurücklaufen", [["Weil sie sonst müde werden", "Der Grund ist die Gefahr, dass sie zurücklaufen."], ["Weil es so vorgeschrieben ist", "Es geht um die Sicherheit der Pferde."]], "Richtig. Auf eine sichere, umzäunte Fläche bringen."),
      frage("telefon", "Was gehört in den Anruf beim Tierarzt?", "Wer, wo, was, seit wann und gemessene Werte", [["Nur der Name des Pferdes", "Der Tierarzt braucht konkrete Informationen."], ["Eine eigene Diagnose", "Beschreibe, was du siehst – die Diagnose stellt der Tierarzt."]], "Genau. So kann der Tierarzt richtig einschätzen und dich anleiten."),
      frage("nicht", "Was tust du im Notfall NICHT?", "Medikamente ohne tierärztliche Anweisung geben", [["Werte notieren", "Notieren ist sehr hilfreich."], ["Andere Pferde in Sicherheit bringen", "Das ist richtig, wenn es sicher möglich ist."]], "Richtig. Medikamente nur nach Anweisung."),
    ],
  },

  /* ---------- 17. Stallapotheke ---------- */
  {
    slug: "stallapotheke",
    title: "Die vollständige Stallapotheke",
    speaker: "ben",
    intro:
      "Viele Stallapotheken bestehen aus abgelaufenen Salben, angebrochenen Tuben und einer Rolle Klebeband. Im Notfall fehlt dann genau das, was man braucht. Eine gute Stallapotheke ist vor allem eins: vollständig, ordentlich und auffindbar.",
    illustration: item("eimer"),
    terms: begriffe(
      ["Wundauflage", "Steriles, nicht verklebendes Material, das direkt auf eine Wunde kommt."],
      ["Polsterwatte", "Polster unter einem Verband, verteilt den Druck."],
      ["Elastische Binde", "Dehnbare Binde zum Fixieren eines Verbandes."],
    ),
    deep: {
      minutes: 7,
      sections: [
        {
          heading: "Messen und untersuchen",
          text: "• Digitales Fieberthermometer mit Schnur und Klemme\n• Uhr mit Sekundenanzeige (oder Handy)\n• Stethoskop (praktisch, nicht zwingend)\n• Taschenlampe oder Stirnlampe\n• Einmalhandschuhe\n• Notizblock und Stift für Werte\n• Laminierte Karte mit den Normalwerten deines Pferdes und Notfallnummern",
        },
        {
          heading: "Verbandmaterial",
          text: "• Sterile, nicht verklebende Wundauflagen in mehreren Größen\n• Polsterwatte oder Verbandwatte\n• Mullbinden\n• Elastische, selbsthaftende Binden\n• Klebeband (z. B. breites Gewebeband für Hufverbände)\n• Verbandschere mit abgerundeter Spitze\n• Hufschuh oder Material für einen Hufverband (z. B. eine Windel, Polster, Gewebeband)\n• Kühlpacks oder Material zum Kühlen, Eimer\n\nÜbe das Anlegen von Bein- und Hufverbänden vorher – am besten unter Anleitung von Tierarzt oder erfahrenen Pferdeleuten. Ein zu fester oder falsch angelegter Verband kann Sehnen schädigen.",
        },
        {
          heading: "Reinigen und Wundversorgung",
          text: "• Saubere Tücher, Kompressen\n• Spritzen ohne Kanüle zum Spülen von Wunden\n• Ein geeignetes Wundreinigungs- bzw. Wunddesinfektionsmittel, das du vorher mit deinem Tierarzt abgesprochen hast\n• Zeckenzange, Pinzette\n• Saubere Schüssel\n\nMedikamente – zum Beispiel Schmerzmittel, Entzündungshemmer oder Beruhigungsmittel – gehören nur nach tierärztlicher Verordnung für ein bestimmtes Pferd in die Stallapotheke. Sie werden mit Namen des Pferdes, Dosierung und Verfallsdatum aufbewahrt und nur nach Anweisung gegeben. Behandlungen mit bestimmten Arzneimitteln müssen im Equidenpass oder Bestandsbuch dokumentiert werden; das regelt der Tierarzt.",
        },
        {
          heading: "Aufbewahrung und Kontrolle",
          text: "Die Stallapotheke gehört in einen sauberen, trockenen, gut erreichbaren Behälter, der allen im Stall bekannt ist. Eine Inhaltsliste innen im Deckel hilft, schnell zu sehen, was fehlt.\n\nKontrolliere die Stallapotheke regelmäßig, zum Beispiel jedes Quartal: Verfallsdaten, angebrochene Packungen, fehlendes Material. Nach jedem Einsatz wird sofort aufgefüllt. Für Ausritte und Turniere lohnt sich eine kleine, mobile Notfalltasche.",
        },
      ],
      praxis: {
        title: "Die große Inventur",
        text: "Lea und Ben räumen die Stallapotheke des Hofs aus. Sie finden drei angebrochene Salben ohne Etikett, ein Fieberthermometer ohne Batterie und keine einzige sterile Wundauflage. Gemeinsam mit Hanna erstellen sie eine Liste, sortieren alles in beschriftete Fächer und kleben die Liste in den Deckel.\n\nDie Tierärztin schaut sich beim nächsten Besuch die Box an und empfiehlt ein Mittel zur Wundreinigung. Seitdem prüft Mats jeden ersten Montag im Quartal die Verfallsdaten.",
      },
      fehler: fehler(
        ["Medikamente „auf Vorrat“ ohne Verordnung lagern.", "Medikamente nur nach tierärztlicher Verordnung für ein bestimmtes Pferd."],
        ["Abgelaufene oder unbeschriftete Tuben aufbewahren.", "Regelmäßig kontrollieren und aussortieren."],
        ["Verbände erst im Notfall zum ersten Mal anlegen.", "Vorher unter Anleitung üben."],
        ["Die Stallapotheke im abgeschlossenen Spind einer Person lagern.", "Gut erreichbar und allen bekannt."],
      ),
      richtig: [
        "Stelle Material zum Messen, Verbinden und Reinigen zusammen.",
        "Sprich Wundmittel vorher mit deinem Tierarzt ab.",
        "Lagere Medikamente nur nach Verordnung, beschriftet und mit Verfallsdatum.",
        "Klebe eine Inhaltsliste in den Deckel.",
        "Kontrolliere regelmäßig und fülle nach jedem Einsatz auf.",
        "Übe Bein- und Hufverband vorher unter Anleitung.",
      ],
      merke: [
        "Thermometer, Verbandmaterial, Schere, Handschuhe und Notfallnummern gehören hinein.",
        "Medikamente nur nach tierärztlicher Verordnung.",
        "Regelmäßig kontrollieren, nach jedem Einsatz auffüllen.",
        "Verbände vorher üben.",
      ],
      weiter: weiter(["Erste Hilfe und Verhalten im Notfall", "ra-w16-l16"], ["Verletzungen und Wundversorgung", "ra-w16-l14"]),
    },
    exercise: [
      wahl(
        "ra-w16-l17-entscheidung",
        "Was gehört NICHT ohne tierärztliche Verordnung in die Stallapotheke?",
        "Schmerzmittel für Pferde",
        [
          ["Ein Fieberthermometer", "Ein Thermometer gehört unbedingt hinein."],
          ["Sterile Wundauflagen", "Wundauflagen sind Grundausstattung."],
          ["Eine Verbandschere", "Eine Schere brauchst du für jeden Verband."],
        ],
        "Richtig. Medikamente nur nach Verordnung für ein bestimmtes Pferd.",
      ),
    ],
    quiz: [
      frage("thermometer", "Was ist das wichtigste Messgerät in der Stallapotheke?", "Ein digitales Fieberthermometer", [["Eine Waage", "Eine Waage ist nützlich, aber im Notfall nicht das Wichtigste."], ["Ein Maßband", "Ein Maßband brauchst du im Notfall nicht."]], "Genau. Mit Schnur und Klemme geht es nicht verloren."),
      frage("kontrolle", "Wie oft solltest du die Stallapotheke kontrollieren?", "Regelmäßig, z. B. jedes Quartal, und nach jedem Einsatz", [["Nie, sie hält ewig", "Material läuft ab und wird verbraucht."], ["Nur einmal beim Einrichten", "Regelmäßige Kontrolle ist nötig."]], "Richtig. So ist im Notfall alles da."),
      frage("verband", "Warum übst du Verbände vorher?", "Weil ein falsch angelegter Verband Sehnen schädigen kann", [["Weil es schön aussieht", "Es geht um die Sicherheit des Pferdes."], ["Weil man Verbände nicht braucht", "Verbände sind eine wichtige Sofortmaßnahme."]], "Genau. Unter Anleitung üben."),
    ],
  },

  /* ---------- 18. Vorsorge ---------- */
  {
    slug: "gesundheitsvorsorge",
    title: "Gesundheitsvorsorge und langfristiges Management",
    speaker: "lea",
    intro:
      "Die meisten teuren Tierarztrechnungen entstehen nicht durch Pech, sondern durch Probleme, die sich lange angekündigt haben. Gute Vorsorge ist planbar – mit einem Jahreskalender und einem wachen Blick.",
    illustration: tabelle("Jahresplan", "Vorsorge im Überblick", [
      ["Was", "Wie oft (Orientierung)"],
      ["Hufbearbeitung", "alle 6–8 Wochen"],
      ["Zahnkontrolle", "1× jährlich, jung/alt oft 2×"],
      ["Impfungen", "nach Schema des Tierarztes"],
      ["Kotprobe", "mehrmals im Jahr"],
      ["Gewicht / Figur", "alle 2–4 Wochen"],
      ["Sattelkontrolle", "mindestens 1× jährlich"],
    ]),
    terms: begriffe(
      ["Vorsorgeuntersuchung", "Allgemeine tierärztliche Untersuchung ohne akuten Anlass."],
      ["PPID (Cushing)", "Häufige Hormonerkrankung älterer Pferde, u. a. mit langem, lockigem Fell und Hufrehe-Risiko."],
      ["Senior", "Ältere Pferde, oft ab etwa 15 bis 20 Jahren, mit besonderen Bedürfnissen."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Der Jahresplan",
          text: "Ein Vorsorgekalender macht aus vielen einzelnen Terminen einen Plan: Hufbearbeitung alle sechs bis acht Wochen, Zahnkontrolle mindestens einmal im Jahr, Impfungen nach Schema, Kotproben mehrmals im Jahr, regelmäßige Gewichts- und Figurkontrolle, Sattelkontrolle mindestens einmal im Jahr und bei jeder Veränderung der Bemuskelung.\n\nViele Tierärzte bieten eine jährliche Vorsorgeuntersuchung an, oft gemeinsam mit der Impfung: Herz, Lunge, Augen, Zähne, Bewegungsapparat, bei älteren Pferden auch Blutuntersuchungen. So werden Veränderungen früh entdeckt.",
        },
        {
          heading: "Das Pferd im Lebenslauf",
          text: "• Jungpferde: Wachstum, Zahnwechsel, angepasste Belastung, eigenes Entwurmungsprogramm.\n• Pferde im besten Alter: Training, Kondition, Ausrüstung, regelmäßige Kontrollen.\n• Senioren: Zähne, Gewicht, Muskulatur, Gelenke, Wärmehaushalt. Hormonelle Erkrankungen wie PPID (Cushing) werden häufiger; Hinweise sind zum Beispiel ein verzögerter Fellwechsel, langes oder lockiges Fell, vermehrtes Trinken, Muskelabbau und Hufrehe. Ältere Pferde profitieren von viel ruhiger Bewegung, angepasster Fütterung und häufigeren Kontrollen.",
        },
        {
          heading: "Dokumentieren",
          text: "Ein Gesundheitsheft oder eine App mit allen Terminen, Befunden, Gewichten, Fotos und Auffälligkeiten ist Gold wert – bei Stallwechsel, Verkauf, Versicherungsfragen und vor allem für den Tierarzt. Was du über Jahre notierst, zeigt Entwicklungen, die man im Alltag übersieht.\n\nDazu gehören auch die eigenen Normalwerte des Pferdes (PAT), Fotos der Figur von der Seite zu verschiedenen Jahreszeiten und Notizen zu Futterumstellungen.",
        },
        {
          heading: "Training und Ausrüstung als Gesundheitsfaktor",
          text: "Gesundheit hängt nicht nur von Tierarzt und Fütterung ab. Ein durchdachtes, abwechslungsreiches Training, eine gute Aufwärmphase, passende Ausrüstung und ein gut sitzender Sattel beugen Verletzungen und Rückenproblemen vor. Ein Sattel, der vor zwei Jahren gepasst hat, passt vielleicht heute nicht mehr, weil sich das Pferd verändert hat.\n\nAuch Pausen und Erholung gehören zur Vorsorge. Pferde, die gelegentlich freie Tage haben und viel Zeit mit Artgenossen verbringen, sind meist ausgeglichener und weniger verletzungsanfällig.",
        },
      ],
      praxis: {
        title: "Der Kalender an der Spindtür",
        text: "Tilda hängt einen Jahreskalender für Tonga an die Spindtür: Schmied alle sieben Wochen, Zahnkontrolle im März, Impfungen im April und Oktober, Kotproben im April, Juli und Oktober, Sattelkontrolle im Mai. Daneben eine Spalte für Gewicht und Notizen.\n\nIm Herbst fällt ihr beim Vergleich der Fotos auf, dass Tonga hinter dem Widerrist Muskulatur verloren hat. Bei der Sattelkontrolle zeigt sich: Der Sattel drückt inzwischen. Ohne Fotos und Kalender wäre das vielleicht erst aufgefallen, als Tonga beim Satteln unwillig wird.",
      },
      fehler: fehler(
        ["Nur zum Tierarzt, wenn etwas akut ist.", "Regelmäßige Vorsorge einplanen."],
        ["Sattel einmal anpassen und nie wieder prüfen.", "Mindestens jährlich und bei Veränderungen kontrollieren."],
        ["Alter als Erklärung für alles nehmen.", "Viele Altersveränderungen sind behandelbar – tierärztlich abklären."],
        ["Nichts dokumentieren.", "Termine, Befunde, Gewicht und Fotos festhalten."],
      ),
      richtig: [
        "Lege einen Jahreskalender für Huf, Zähne, Impfungen, Kotproben und Sattel an.",
        "Kontrolliere Gewicht und Figur regelmäßig, mache Fotos.",
        "Plane eine jährliche Vorsorgeuntersuchung.",
        "Passe Fütterung, Training und Kontrollen dem Lebensalter an.",
        "Dokumentiere alles an einem Ort.",
      ],
      merke: [
        "Vorsorge ist planbar – mit einem Jahreskalender.",
        "Senioren brauchen häufigere Kontrollen.",
        "Dokumentation zeigt Entwicklungen, die man im Alltag übersieht.",
        "Training, Ausrüstung und Pausen gehören zur Gesundheit.",
      ],
      weiter: weiter(["Wie erkenne ich ein gesundes Pferd?", "ra-w16-l1"], ["Wie viel Futter braucht mein Pferd wirklich?", "ra-w15-l7"], ["Gute Pferdehaltung erkennen und beurteilen", "ra-w15-l14"]),
    },
    exercise: [
      wahl(
        "ra-w16-l18-entscheidung",
        "Ein 22-jähriges Pferd hat im Frühjahr sein Winterfell noch nicht verloren, trinkt mehr als früher und hat Muskulatur abgebaut. Was ist sinnvoll?",
        "Den Tierarzt untersuchen lassen – das können Hinweise auf PPID (Cushing) sein",
        [
          ["Nichts, das ist eben das Alter", "Diese Zeichen können auf eine behandelbare Erkrankung hindeuten."],
          ["Das Pferd scheren und mehr Kraftfutter geben", "Erst die Ursache klären."],
        ],
        "Richtig. Viele Alterserkrankungen lassen sich gut behandeln, wenn man sie früh erkennt.",
      ),
    ],
    quiz: [
      frage("zahn", "Wie oft sollte ein erwachsenes Pferd mindestens zur Zahnkontrolle?", "Einmal im Jahr", [["Alle fünf Jahre", "Das ist zu selten."], ["Nie, wenn es frisst", "Viele Zahnprobleme zeigen sich erst spät."]], "Genau. Junge und alte Pferde oft zweimal."),
      frage("sattel", "Wann sollte ein Sattel kontrolliert werden?", "Mindestens einmal im Jahr und bei Veränderungen der Bemuskelung", [["Nur beim Kauf", "Pferde verändern sich, der Sattel passt dann womöglich nicht mehr."], ["Nie", "Ein schlecht sitzender Sattel verursacht Schmerzen."]], "Richtig. Auch nach längeren Pausen."),
      frage("ppid", "Welches Zeichen kann auf PPID (Cushing) hinweisen?", "Verzögerter Fellwechsel mit langem, lockigem Fell", [["Glänzendes, kurzes Sommerfell", "Das spricht nicht für PPID."], ["Ein besonders schneller Fellwechsel", "Typisch ist eher ein verzögerter Fellwechsel."]], "Genau. Dazu kommen u. a. Muskelabbau und vermehrtes Trinken."),
      frage("doku", "Warum lohnt sich ein Gesundheitsheft?", "Weil es Entwicklungen über Jahre sichtbar macht", [["Weil der Tierarzt sonst nicht kommt", "Es hilft, ist aber keine Voraussetzung."], ["Es lohnt sich nicht", "Gerade langfristige Veränderungen fallen sonst nicht auf."]], "Richtig. Termine, Befunde, Gewicht und Fotos an einem Ort."),
    ],
  },
];
