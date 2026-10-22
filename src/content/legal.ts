/**
 * Rechtstexte (Impressum, AGB). Texte von der Inhaberin geliefert am 22.10.2026.
 * Änderungen nur am Text hier – die Seiten /impressum und /agb lesen alles aus dieser Datei.
 */

export const provider = {
  company: "KMVB UG (haftungsbeschränkt)",
  street: "Rothenburger Straße 29",
  city: "14612 Falkensee",
  country: "Deutschland",
  representative: "K. Müller vom Berge",
  phone: "03322 8372832",
  phoneHref: "tel:+4933228372832",
  email: "infohorseandharmonie@gmail.com",
  registerCourt: "Amtsgericht Potsdam",
  registerNumber: "HRB 35203",
  vatId: "DE341940026",
};

export type LegalSection = {
  heading: string;
  /** Unterüberschrift innerhalb eines Paragraphen (z. B. „4.1 Founders Membership“) */
  blocks: { subheading?: string; paragraphs: string[] }[];
};

export const terms: { title: string; subtitle: string; asOf: string; sections: LegalSection[] } = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  subtitle: "Hof Stories – Digitale Kinderplattform",
  asOf: "Stand: 22. Oktober 2026",
  sections: [
    {
      heading: "§ 1 Anbieter und Geltungsbereich",
      blocks: [
        {
          paragraphs: [
            "(1) Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche kostenpflichtigen Mitgliedschaften und digitalen Angebote der Plattform „Hof Stories“.",
            "(2) Anbieter und Vertragspartner ist die KMVB UG (haftungsbeschränkt), Rothenburger Straße 29, 14612 Falkensee, Deutschland, vertreten durch die Geschäftsführung: K. Müller vom Berge. E-Mail: infohorseandharmonie@gmail.com",
            "(3) Hof Stories richtet sich insbesondere an Kinder im Alter von 5 bis 9 Jahren. Kostenpflichtige Verträge können ausschließlich von volljährigen Personen abgeschlossen werden.",
          ],
        },
      ],
    },
    {
      heading: "§ 2 Leistungsumfang",
      blocks: [
        {
          paragraphs: [
            "(1) Hof Stories ist eine digitale Lern- und Erlebniswelt rund um Pferde, Tiere, Freundschaft und das Leben auf einem Reiterhof.",
            "(2) Die Plattform bietet unter anderem interaktive Geschichten, Detektivabenteuer, Lernspiele, Quizformate, die Reitakademie und weitere altersgerechte Bildungs- und Unterhaltungsangebote.",
            "(3) Kostenpflichtige Mitglieder erhalten Zugang zu den im jeweiligen Mitgliedschaftsmodell enthaltenen Premium-Inhalten.",
            "(4) Jeden Freitag werden neue digitale Inhalte veröffentlicht. Art und Umfang der wöchentlichen Veröffentlichungen können variieren.",
            "(5) Die Inhalte können sich an Jahreszeiten, besonderen Ereignissen und pädagogischen Themen orientieren.",
            "(6) Der konkrete Leistungsumfang ergibt sich aus der jeweiligen Produktbeschreibung zum Zeitpunkt des Vertragsschlusses.",
          ],
        },
      ],
    },
    {
      heading: "§ 3 Vertragsschluss und Zahlung",
      blocks: [
        {
          paragraphs: [
            "(1) Der Erwerb einer kostenpflichtigen Mitgliedschaft erfolgt über den Onlineshop des Anbieters.",
            "(2) Die Darstellung der Mitgliedschaften im Onlineshop stellt noch kein verbindliches Vertragsangebot dar.",
            "(3) Mit dem Absenden einer zahlungspflichtigen Bestellung gibt der Kunde ein verbindliches Vertragsangebot ab. Der Vertrag kommt durch die Annahme des Anbieters zustande, beispielsweise durch eine ausdrückliche Vertragsbestätigung oder die Freischaltung des Zugangs.",
            "(4) Die Zahlung erfolgt über die im Onlineshop angebotenen Zahlungsmethoden.",
            "(5) Die jeweils geltenden Preise, Abrechnungsintervalle und Vertragsbedingungen werden vor Abschluss der Bestellung angezeigt.",
          ],
        },
      ],
    },
    {
      heading: "§ 4 Mitgliedschaftsmodelle und Preise",
      blocks: [
        {
          subheading: "4.1 Founders Membership",
          paragraphs: [
            "(1) Die Founders Membership ist ein zeitlich begrenztes Einführungsangebot.",
            "(2) Der Preis beträgt 39,00 € für die ersten zwölf Monate. Der Betrag wird zu Beginn der Mitgliedschaft vollständig berechnet.",
            "(3) Die anfängliche Mindestvertragslaufzeit beträgt zwölf Monate.",
            "(4) Nach Ablauf der Mindestvertragslaufzeit wird die Mitgliedschaft auf unbestimmte Zeit fortgesetzt. Ab dem 13. Monat beträgt der Mitgliedschaftspreis 9,90 € monatlich. Die Abrechnung erfolgt monatlich.",
            "(5) Eine Kündigung zum Ende der Mindestvertragslaufzeit ist mit einer Frist von einem Monat möglich.",
            "(6) Nach Ablauf der Mindestvertragslaufzeit kann die Mitgliedschaft jederzeit mit einer Frist von höchstens einem Monat gekündigt werden.",
          ],
        },
        {
          subheading: "4.2 Reguläre Jahresmitgliedschaft",
          paragraphs: [
            "(1) Die reguläre Jahresmitgliedschaft kostet 99,00 € für die ersten zwölf Monate.",
            "(2) Die anfängliche Mindestvertragslaufzeit beträgt zwölf Monate.",
            "(3) Die Bedingungen einer anschließenden Fortsetzung, einschließlich des Folgepreises und des Abrechnungsintervalls, werden vor Vertragsschluss ausdrücklich ausgewiesen.",
          ],
        },
        {
          subheading: "4.3 Monatliche Mitgliedschaft",
          paragraphs: [
            "(1) Die monatliche Mitgliedschaft kostet 9,90 € pro Monat.",
            "(2) Die Mitgliedschaft wird monatlich abgerechnet und kann mit einer Frist von höchstens einem Monat gekündigt werden.",
          ],
        },
      ],
    },
    {
      heading: "§ 5 Freischaltung und Zugang",
      blocks: [
        {
          paragraphs: [
            "(1) Nach erfolgreichem Vertragsschluss und nach Maßgabe der vereinbarten Zahlungsbedingungen wird der Zugang zu den gebuchten digitalen Inhalten freigeschaltet.",
            "(2) Die Mitgliedschaft berechtigt zur privaten Nutzung der jeweils enthaltenen Premium-Inhalte während der aktiven Vertragslaufzeit.",
            "(3) Eine Weitergabe von Zugangsdaten an unberechtigte Dritte ist nicht gestattet.",
            "(4) Eltern und Erziehungsberechtigte sind für die Begleitung und altersgerechte Nutzung durch ihre Kinder verantwortlich.",
          ],
        },
      ],
    },
    {
      heading: "§ 6 Neue Inhalte und Verfügbarkeit",
      blocks: [
        {
          paragraphs: [
            "(1) Hof Stories veröffentlicht regelmäßig freitags neue digitale Inhalte für Mitglieder.",
            "(2) Die Plattform wird kontinuierlich weiterentwickelt. Inhalte können ergänzt, aktualisiert oder im gesetzlich zulässigen Umfang verändert werden.",
            "(3) Vorübergehende technische Einschränkungen, insbesondere durch Wartungsarbeiten oder Störungen, können auftreten.",
            "(4) Die gesetzlichen Rechte der Kunden bei Nichtbereitstellung, mangelhafter Bereitstellung oder unzulässigen Änderungen digitaler Produkte bleiben unberührt.",
          ],
        },
      ],
    },
    {
      heading: "§ 7 Urheberrechte und Nutzungsbedingungen",
      blocks: [
        {
          paragraphs: [
            "(1) Sämtliche Geschichten, Illustrationen, Figuren, Spiele, Texte, Audiodateien und sonstigen Inhalte von Hof Stories sind im Rahmen der geltenden gesetzlichen Bestimmungen geschützt.",
            "(2) Mitglieder erhalten ein einfaches, nicht übertragbares Recht zur privaten Nutzung der gebuchten Inhalte während der Vertragslaufzeit.",
            "(3) Die Vervielfältigung, Veröffentlichung, Weitergabe oder kommerzielle Verwertung außerhalb der gesetzlich erlaubten Nutzungen ist ohne entsprechende Berechtigung untersagt.",
          ],
        },
      ],
    },
    {
      heading: "§ 8 Kündigung",
      blocks: [
        {
          paragraphs: [
            "(1) Die Kündigung kann in Textform, insbesondere per E-Mail an infohorseandharmonie@gmail.com, erfolgen.",
            "(2) Zusätzlich stellt der Anbieter auf der Verkaufswebsite eine gesetzeskonforme elektronische Kündigungsfunktion zur Verfügung.",
            "(3) Nach Wirksamwerden der Kündigung endet die kostenpflichtige Mitgliedschaft und der Zugang zu den darin enthaltenen Premium-Inhalten.",
            "(4) Bereits entstandene Zahlungsansprüche und gesetzliche Ansprüche der Vertragsparteien bleiben unberührt.",
            "(5) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt bestehen.",
          ],
        },
      ],
    },
    {
      heading: "§ 9 Widerrufsrecht",
      blocks: [
        {
          paragraphs: [
            "(1) Verbrauchern steht bei Fernabsatzverträgen grundsätzlich ein gesetzliches Widerrufsrecht zu.",
            "(2) Einzelheiten zum Widerrufsrecht, zu dessen Ausübung und zu den gesetzlichen Voraussetzungen eines möglichen vorzeitigen Erlöschens ergeben sich aus der gesonderten Widerrufsbelehrung.",
            "(3) Die Widerrufsbelehrung wird vor Abschluss der Bestellung im Onlineshop bereitgestellt.",
          ],
        },
      ],
    },
    {
      heading: "§ 10 Gewährleistung und Haftung",
      blocks: [
        {
          paragraphs: [
            "(1) Für die Bereitstellung und Vertragsmäßigkeit digitaler Produkte gelten die gesetzlichen Vorschriften, insbesondere die §§ 327 ff. BGB.",
            "(2) Der Anbieter haftet uneingeschränkt nach den gesetzlichen Vorschriften bei Vorsatz und grober Fahrlässigkeit sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.",
            "(3) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung, soweit gesetzlich zulässig, auf den vertragstypischen, vorhersehbaren Schaden begrenzt.",
            "(4) Gesetzlich zwingende Haftungsregelungen und Verbraucherrechte bleiben unberührt.",
          ],
        },
      ],
    },
    {
      heading: "§ 11 Datenschutz",
      blocks: [
        {
          paragraphs: [
            "Die Verarbeitung personenbezogener Daten erfolgt nach Maßgabe der geltenden Datenschutzgesetze.",
            "Weitere Informationen enthält die gesonderte Datenschutzerklärung von Hof Stories.",
          ],
        },
      ],
    },
    {
      heading: "§ 12 Schlussbestimmungen",
      blocks: [
        {
          paragraphs: [
            "(1) Es gilt das Recht der Bundesrepublik Deutschland unter Wahrung zwingender Verbraucherschutzvorschriften des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat.",
            "(2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleiben die übrigen Bestimmungen davon unberührt.",
          ],
        },
      ],
    },
  ],
};
