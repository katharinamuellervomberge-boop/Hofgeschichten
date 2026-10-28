/* Automatisch erzeugt mit `npm run akademie:katalog` – nicht von Hand ändern. */
import type { AcademyGameInfo, AcademyWorldInfo } from "./types";

/** Alle Lernwelten: Übersicht ohne Inhalte (die Inhalte liegen in welten/*.server.ts) */
export const worldsInfo: AcademyWorldInfo[] = [
  {
    "id": "w1",
    "number": 1,
    "slug": "bevor-du-aufsteigst",
    "title": "Bevor du aufsteigst",
    "teaser": "Sicher am Pferd, Helm, Ausrüstung und Aufsteigen.",
    "learns": "Sicheres Verhalten am Pferd (tote Winkel, Abstand), Sinn und Sitz des Reithelms, Teile von Sattel und Trense, Ablauf beim Auf- und Absteigen.",
    "tint": "#DDE3D6",
    "cover": {
      "kind": "scene",
      "scene": "ak-zonen"
    },
    "badge": {
      "id": "ra-abzeichen-w1",
      "title": "Sicherheits-Profi",
      "motif": "helmet"
    },
    "tier": "klein",
    "lessons": [
      {
        "id": "ra-w1-l1",
        "slug": "sicher-am-pferd",
        "number": 1,
        "title": "Sicher am Pferd"
      },
      {
        "id": "ra-w1-l2",
        "slug": "reithelm",
        "number": 2,
        "title": "Warum wir einen Reithelm tragen"
      },
      {
        "id": "ra-w1-l3",
        "slug": "sattel-und-trense",
        "number": 3,
        "title": "Sattel, Trense und Ausrüstung"
      },
      {
        "id": "ra-w1-l4",
        "slug": "aufsteigen-absteigen",
        "number": 4,
        "title": "Sicheres Aufsteigen und Absteigen"
      },
      {
        "id": "ra-w1-l5",
        "slug": "sicherheitsquiz",
        "number": 5,
        "title": "Sicherheitsquiz"
      }
    ]
  },
  {
    "id": "w2",
    "number": 2,
    "slug": "der-richtige-reitersitz",
    "title": "Der richtige Reitersitz",
    "teaser": "Ausbalanciert sitzen – von Kopf bis Absatz.",
    "learns": "Grundsitz (Linie Ohr–Schulter–Hüfte–Absatz), Bein- und Fußhaltung, Fäuste und Zügelhaltung, Blickrichtung und angemessene Körperspannung.",
    "tint": "#E8DCC4",
    "cover": {
      "kind": "scene",
      "scene": "ak-reiter-sitz-linie"
    },
    "badge": {
      "id": "ra-abzeichen-w2",
      "title": "Sitz-Profi",
      "motif": "seat"
    },
    "tier": "klein",
    "lessons": [
      {
        "id": "ra-w2-l1",
        "slug": "ausbalancierter-sitz",
        "number": 1,
        "title": "Der ausbalancierte Sitz"
      },
      {
        "id": "ra-w2-l2",
        "slug": "beine-und-absaetze",
        "number": 2,
        "title": "Beine und Absätze"
      },
      {
        "id": "ra-w2-l3",
        "slug": "haende-und-zuegel",
        "number": 3,
        "title": "Hände und Zügelhaltung"
      },
      {
        "id": "ra-w2-l4",
        "slug": "blick-und-koerperspannung",
        "number": 4,
        "title": "Blickrichtung und Körperspannung"
      },
      {
        "id": "ra-w2-l5",
        "slug": "sitz-quiz",
        "number": 5,
        "title": "Sitz-Quiz"
      }
    ]
  },
  {
    "id": "w3",
    "number": 3,
    "slug": "die-sprache-der-hilfen",
    "title": "Die Sprache der Hilfen",
    "teaser": "Wie Reiter und Pferd sich verständigen.",
    "learns": "Was Reiterhilfen sind; Schenkel-, Gewichts-, Zügel- und Stimmhilfen als feine, koordinierte Signale; das Zusammenspiel beim Anreiten, Anhalten und Wenden.",
    "tint": "#EADBC8",
    "cover": {
      "kind": "scene",
      "scene": "ak-reiter-hilfen"
    },
    "badge": {
      "id": "ra-abzeichen-w3",
      "title": "Hilfen-Versteher",
      "motif": "signals"
    },
    "tier": "klein",
    "lessons": [
      {
        "id": "ra-w3-l1",
        "slug": "was-sind-hilfen",
        "number": 1,
        "title": "Was sind Reiterhilfen?"
      },
      {
        "id": "ra-w3-l2",
        "slug": "schenkelhilfen",
        "number": 2,
        "title": "Schenkelhilfen"
      },
      {
        "id": "ra-w3-l3",
        "slug": "gewichtshilfen",
        "number": 3,
        "title": "Gewichtshilfen"
      },
      {
        "id": "ra-w3-l4",
        "slug": "zuegel-und-stimme",
        "number": 4,
        "title": "Zügel- und Stimmhilfen"
      },
      {
        "id": "ra-w3-l5",
        "slug": "zusammenspiel",
        "number": 5,
        "title": "Zusammenspiel der Hilfen"
      }
    ]
  },
  {
    "id": "w4",
    "number": 4,
    "slug": "schritt-reiten",
    "title": "Schritt reiten",
    "teaser": "Die ruhigste Gangart im Viertakt.",
    "learns": "Merkmale des Schritts (keine Schwebephase), Viertakt und Fußfolge, Mitschwingen in der Bewegung, Grundlagen von Anreiten, Lenken und Anhalten.",
    "tint": "#DDE3D6",
    "cover": {
      "kind": "scene",
      "scene": "ak-gang-schritt"
    },
    "badge": {
      "id": "ra-abzeichen-w4",
      "title": "Schritt-Kenner",
      "motif": "walk"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w4-l1",
        "slug": "was-ist-der-schritt",
        "number": 1,
        "title": "Was ist der Schritt?"
      },
      {
        "id": "ra-w4-l2",
        "slug": "der-viertakt",
        "number": 2,
        "title": "Der Viertakt"
      },
      {
        "id": "ra-w4-l3",
        "slug": "mitschwingen",
        "number": 3,
        "title": "Mitschwingen im Schritt"
      },
      {
        "id": "ra-w4-l4",
        "slug": "anreiten-lenken-anhalten",
        "number": 4,
        "title": "Anreiten, Lenken und Anhalten"
      },
      {
        "id": "ra-w4-l5",
        "slug": "schritt-quiz",
        "number": 5,
        "title": "Schritt-Quiz"
      }
    ]
  },
  {
    "id": "w5",
    "number": 5,
    "slug": "trab-reiten",
    "title": "Trab reiten",
    "teaser": "Zweitakt, Leichttraben und Aussitzen.",
    "learns": "Zweitakt mit diagonalen Beinpaaren und Schwebephase, Leichttraben und Aussitzen, Leichttraben auf dem richtigen Fuß und Fußwechsel beim Handwechsel.",
    "tint": "#E8DCC4",
    "cover": {
      "kind": "scene",
      "scene": "ak-gang-trab"
    },
    "badge": {
      "id": "ra-abzeichen-w5",
      "title": "Trab-Talent",
      "motif": "trot"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w5-l1",
        "slug": "der-zweitakt",
        "number": 1,
        "title": "Der Zweitakt"
      },
      {
        "id": "ra-w5-l2",
        "slug": "leichttraben",
        "number": 2,
        "title": "Leichttraben verstehen"
      },
      {
        "id": "ra-w5-l3",
        "slug": "aussitzen",
        "number": 3,
        "title": "Aussitzen und Balance"
      },
      {
        "id": "ra-w5-l4",
        "slug": "richtiger-fuss",
        "number": 4,
        "title": "Auf dem richtigen Fuß leichttraben"
      },
      {
        "id": "ra-w5-l5",
        "slug": "trab-quiz",
        "number": 5,
        "title": "Trab-Quiz"
      }
    ]
  },
  {
    "id": "w6",
    "number": 6,
    "slug": "galopp-verstehen",
    "title": "Galopp verstehen",
    "teaser": "Dreitakt, Rechts- und Linksgalopp, Übergänge.",
    "learns": "Dreitakt mit Schwebephase, Rechts- und Linksgalopp (Außen- und Kreuzgalopp), Grundgerüst der Galopphilfen, Balance und Übergänge.",
    "tint": "#EADBC8",
    "cover": {
      "kind": "scene",
      "scene": "ak-gang-galopp-rechts"
    },
    "badge": {
      "id": "ra-abzeichen-w6",
      "title": "Galopp-Experte",
      "motif": "canter"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w6-l1",
        "slug": "der-dreitakt",
        "number": 1,
        "title": "Der Dreitakt"
      },
      {
        "id": "ra-w6-l2",
        "slug": "rechts-und-linksgalopp",
        "number": 2,
        "title": "Rechts- und Linksgalopp"
      },
      {
        "id": "ra-w6-l3",
        "slug": "galopphilfen",
        "number": 3,
        "title": "Die Galopphilfen"
      },
      {
        "id": "ra-w6-l4",
        "slug": "balance-und-uebergaenge",
        "number": 4,
        "title": "Balance und Übergänge"
      },
      {
        "id": "ra-w6-l5",
        "slug": "galopp-quiz",
        "number": 5,
        "title": "Galopp-Quiz"
      }
    ]
  },
  {
    "id": "w7",
    "number": 7,
    "slug": "reiten-in-der-bahn",
    "title": "Reiten in der Bahn",
    "teaser": "Bahnpunkte, Bahnfiguren und Bahnregeln.",
    "learns": "Aufbau der 20 × 40-Meter-Bahn mit Bahnpunkten, ganze Bahn und Handwechsel, Zirkel und Volte, Hufschlagfiguren und Bahnregeln für ein sicheres Miteinander.",
    "tint": "#DDE3D6",
    "cover": {
      "kind": "scene",
      "scene": "ak-bahn-zirkel"
    },
    "badge": {
      "id": "ra-abzeichen-w7",
      "title": "Bahnfiguren-Kenner",
      "motif": "arena"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w7-l1",
        "slug": "die-reitbahn",
        "number": 1,
        "title": "Die Reitbahn"
      },
      {
        "id": "ra-w7-l2",
        "slug": "ganze-bahn-und-handwechsel",
        "number": 2,
        "title": "Ganze Bahn und Handwechsel"
      },
      {
        "id": "ra-w7-l3",
        "slug": "zirkel-und-volte",
        "number": 3,
        "title": "Zirkel und Volte"
      },
      {
        "id": "ra-w7-l4",
        "slug": "hufschlagfiguren-und-bahnregeln",
        "number": 4,
        "title": "Hufschlagfiguren und Bahnregeln"
      },
      {
        "id": "ra-w7-l5",
        "slug": "bahnfiguren-quiz",
        "number": 5,
        "title": "Bahnfiguren-Quiz"
      }
    ]
  },
  {
    "id": "w8",
    "number": 8,
    "slug": "fair-zum-pferd",
    "title": "Fair zum Pferd",
    "teaser": "Feines Reiten, Pausen und Pferde verstehen.",
    "learns": "Was feines, pferdefreundliches Reiten bedeutet, Sinn von Pausen und Abkühlen, Körpersprache und Stresszeichen beim Reiten, Umgang mit Pferden, die nicht mitmachen – plus große Abschlussprüfung.",
    "tint": "#EADBC8",
    "cover": {
      "kind": "head",
      "horse": "tivoli",
      "mood": "entspannt"
    },
    "badge": {
      "id": "ra-abzeichen-w8",
      "title": "Pferdefreund",
      "motif": "heart"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w8-l1",
        "slug": "feines-reiten",
        "number": 1,
        "title": "Was bedeutet feines Reiten?"
      },
      {
        "id": "ra-w8-l2",
        "slug": "pausen",
        "number": 2,
        "title": "Warum Pausen wichtig sind"
      },
      {
        "id": "ra-w8-l3",
        "slug": "pferdeverhalten",
        "number": 3,
        "title": "Pferdeverhalten beim Reiten"
      },
      {
        "id": "ra-w8-l4",
        "slug": "wenn-ein-pferd-nicht-mitmacht",
        "number": 4,
        "title": "Wenn ein Pferd nicht mitmacht"
      },
      {
        "id": "ra-w8-l5",
        "slug": "abschlusspruefung",
        "number": 5,
        "title": "Die große Abschlussprüfung"
      }
    ]
  },
  {
    "id": "w9",
    "number": 9,
    "slug": "pferde-verstehen",
    "title": "Pferde verstehen",
    "teaser": "Körpersprache, Herde, Sinne und Bedürfnisse.",
    "learns": "Körpersprache lesen (Ohren, Augen, Maul, Schweif, Haltung), Leben in der Herde und Rangordnung, Sinne und Laute des Pferdes, Grundbedürfnisse: Raufutter, Wasser, Bewegung, Sozialkontakt, Licht und Luft.",
    "tint": "#E3E7DA",
    "cover": {
      "kind": "scene",
      "scene": "ak-zonen"
    },
    "badge": {
      "id": "ra-abzeichen-w9",
      "title": "Pferdeversteher",
      "motif": "ear"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w9-l1",
        "slug": "koerpersprache",
        "number": 1,
        "title": "Körpersprache: Was sagt mein Pferd?"
      },
      {
        "id": "ra-w9-l2",
        "slug": "herdenleben",
        "number": 2,
        "title": "Leben in der Herde"
      },
      {
        "id": "ra-w9-l3",
        "slug": "sinne-und-laute",
        "number": 3,
        "title": "Wie Pferde die Welt wahrnehmen"
      },
      {
        "id": "ra-w9-l4",
        "slug": "beduerfnisse",
        "number": 4,
        "title": "Was Pferde zum Glücklichsein brauchen"
      }
    ]
  },
  {
    "id": "w10",
    "number": 10,
    "slug": "pflege-und-umgang",
    "title": "Pflege und Umgang",
    "teaser": "Putzen, Hufe, Führen, Satteln und nach dem Reiten.",
    "learns": "Putzzeug und Putzreihenfolge, Hufe sicher auskratzen und prüfen, Führen und sicheres Anbinden mit Sicherheitsknoten, Satteln und Trensen Schritt für Schritt mit Passform-Kontrolle, Versorgung nach dem Reiten.",
    "tint": "#EDE3CF",
    "cover": {
      "kind": "scene",
      "scene": "ak-sattelzeug"
    },
    "badge": {
      "id": "ra-abzeichen-w10",
      "title": "Pflegeprofi",
      "motif": "brush"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w10-l1",
        "slug": "putzen",
        "number": 1,
        "title": "Putzen Schritt für Schritt"
      },
      {
        "id": "ra-w10-l2",
        "slug": "hufe-auskratzen",
        "number": 2,
        "title": "Hufe auskratzen"
      },
      {
        "id": "ra-w10-l3",
        "slug": "fuehren-und-anbinden",
        "number": 3,
        "title": "Führen und sicher anbinden"
      },
      {
        "id": "ra-w10-l4",
        "slug": "satteln-und-trensen",
        "number": 4,
        "title": "Satteln und Trensen Schritt für Schritt"
      },
      {
        "id": "ra-w10-l5",
        "slug": "nach-dem-reiten",
        "number": 5,
        "title": "Nach dem Reiten"
      }
    ]
  },
  {
    "id": "w11",
    "number": 11,
    "slug": "alle-bahnfiguren",
    "title": "Alle Bahnfiguren",
    "teaser": "Hufschläge, Handwechsel, Zirkel, Volten, Schlangenlinien und Bahnregeln.",
    "learns": "Hufschläge und Ecken, alle Handwechsel (ganze/halbe Bahn, Länge, Zirkel, Kehrtvolte), Zirkelfiguren, Volten und Acht, Schlangenlinien durch die ganze Bahn und an der langen Seite, ausführliche Bahnregeln, Abteilungsreiten und Kommandos.",
    "tint": "#DDE3D6",
    "cover": {
      "kind": "scene",
      "scene": "ak-bahn-schlange-4"
    },
    "badge": {
      "id": "ra-abzeichen-w11",
      "title": "Bahnfiguren-Meister",
      "motif": "arena"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w11-l1",
        "slug": "hufschlaege-und-ecken",
        "number": 1,
        "title": "Hufschläge und Ecken"
      },
      {
        "id": "ra-w11-l2",
        "slug": "alle-handwechsel",
        "number": 2,
        "title": "Alle Handwechsel"
      },
      {
        "id": "ra-w11-l3",
        "slug": "zirkelfiguren",
        "number": 3,
        "title": "Zirkelfiguren"
      },
      {
        "id": "ra-w11-l4",
        "slug": "volten-und-achten",
        "number": 4,
        "title": "Volten und Achten"
      },
      {
        "id": "ra-w11-l5",
        "slug": "schlangenlinien",
        "number": 5,
        "title": "Schlangenlinien"
      },
      {
        "id": "ra-w11-l6",
        "slug": "bahnregeln",
        "number": 6,
        "title": "Die Bahnregeln"
      },
      {
        "id": "ra-w11-l7",
        "slug": "abteilungsreiten",
        "number": 7,
        "title": "Abteilungsreiten und Kommandos"
      }
    ]
  },
  {
    "id": "w12",
    "number": 12,
    "slug": "besser-reiten",
    "title": "Besser reiten",
    "teaser": "Takt, Losgelassenheit, typische Fehler und mehr Sicherheit im Sattel.",
    "learns": "Takt und Rhythmus in allen Gangarten, Losgelassenheit und Zügel-aus-der-Hand-kauen-lassen, häufige Anfängerfehler und ihre Korrektur, Gleichgewicht und richtiges Verhalten, wenn ein Pferd erschrickt.",
    "tint": "#E6E0D2",
    "cover": {
      "kind": "scene",
      "scene": "ak-reiter-sitz-linie"
    },
    "badge": {
      "id": "ra-abzeichen-w12",
      "title": "Feine Reiterin",
      "motif": "heart"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w12-l1",
        "slug": "takt-und-rhythmus",
        "number": 1,
        "title": "Takt und Rhythmus"
      },
      {
        "id": "ra-w12-l2",
        "slug": "losgelassenheit",
        "number": 2,
        "title": "Losgelassenheit und Dehnung"
      },
      {
        "id": "ra-w12-l3",
        "slug": "anfaengerfehler",
        "number": 3,
        "title": "Häufige Anfängerfehler"
      },
      {
        "id": "ra-w12-l4",
        "slug": "sicherer-im-sattel",
        "number": 4,
        "title": "Sicherer im Sattel werden"
      }
    ]
  },
  {
    "id": "w13",
    "number": 13,
    "slug": "dressur",
    "title": "Dressur",
    "teaser": "Von der Skala der Ausbildung bis zu Piaffe und Passage.",
    "learns": "Dressurviereck und Aufgaben, Skala der Ausbildung, Stellung und Biegung, Tempi, Vorhandwendung, Schenkelweichen, Schulterherein, Travers und Renvers, Traversale, Rückwärtsrichten, einfacher und fliegender Galoppwechsel, Hinterhandwendung und Pirouette, Piaffe und Passage – jeweils mit den Hilfen.",
    "tint": "#E4E7DC",
    "cover": {
      "kind": "scene",
      "scene": "ak-oben-schulterherein"
    },
    "badge": {
      "id": "ra-abzeichen-w13",
      "title": "Dressur-Kenner",
      "motif": "dressage"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w13-l1",
        "slug": "dressur-und-viereck",
        "number": 1,
        "title": "Was ist Dressur? Das Viereck"
      },
      {
        "id": "ra-w13-l2",
        "slug": "skala-der-ausbildung",
        "number": 2,
        "title": "Die Skala der Ausbildung"
      },
      {
        "id": "ra-w13-l3",
        "slug": "stellung-und-biegung",
        "number": 3,
        "title": "Stellung und Biegung"
      },
      {
        "id": "ra-w13-l4",
        "slug": "tempi",
        "number": 4,
        "title": "Tempi: versammelt bis stark"
      },
      {
        "id": "ra-w13-l5",
        "slug": "vorhandwendung",
        "number": 5,
        "title": "Vorhandwendung"
      },
      {
        "id": "ra-w13-l6",
        "slug": "schenkelweichen",
        "number": 6,
        "title": "Schenkelweichen"
      },
      {
        "id": "ra-w13-l7",
        "slug": "schulterherein",
        "number": 7,
        "title": "Schulterherein"
      },
      {
        "id": "ra-w13-l8",
        "slug": "travers-und-renvers",
        "number": 8,
        "title": "Travers und Renvers"
      },
      {
        "id": "ra-w13-l9",
        "slug": "traversale",
        "number": 9,
        "title": "Die Traversale"
      },
      {
        "id": "ra-w13-l10",
        "slug": "rueckwaertsrichten",
        "number": 10,
        "title": "Rückwärtsrichten"
      },
      {
        "id": "ra-w13-l11",
        "slug": "galoppwechsel",
        "number": 11,
        "title": "Einfacher und fliegender Galoppwechsel"
      },
      {
        "id": "ra-w13-l12",
        "slug": "hohe-lektionen",
        "number": 12,
        "title": "Hinterhandwendung, Pirouette, Piaffe und Passage"
      }
    ]
  },
  {
    "id": "w14",
    "number": 14,
    "slug": "springen",
    "title": "Springen",
    "teaser": "Springsitz, Sprungphasen, Hindernisse, Distanzen und Parcours.",
    "learns": "Springsitz und Bügellänge, die fünf Phasen eines Sprungs (was Pferd und Reiter tun), Hindernisarten (Steilsprung, Oxer, Triplebarre, Mauer, Wassergraben, Kreuz, Cavaletti), Galoppsprung und Distanzen, Kombinationen, unterschiedliche Sprünge richtig anreiten, Wendungen und Parcours, Regeln und Strafpunkte, Sicherheit und Pferdewohl.",
    "tint": "#E9E2D0",
    "cover": {
      "kind": "scene",
      "scene": "ak-sprung-flug"
    },
    "badge": {
      "id": "ra-abzeichen-w14",
      "title": "Springreiter",
      "motif": "jump"
    },
    "tier": "gross",
    "lessons": [
      {
        "id": "ra-w14-l1",
        "slug": "springsitz",
        "number": 1,
        "title": "Der Springsitz"
      },
      {
        "id": "ra-w14-l2",
        "slug": "phasen-eines-sprungs",
        "number": 2,
        "title": "Die fünf Phasen eines Sprungs"
      },
      {
        "id": "ra-w14-l3",
        "slug": "hindernisarten",
        "number": 3,
        "title": "Hindernisarten"
      },
      {
        "id": "ra-w14-l4",
        "slug": "galoppsprung-und-distanzen",
        "number": 4,
        "title": "Galoppsprung und Distanzen"
      },
      {
        "id": "ra-w14-l5",
        "slug": "kombinationen",
        "number": 5,
        "title": "Kombinationen"
      },
      {
        "id": "ra-w14-l6",
        "slug": "spruenge-anreiten",
        "number": 6,
        "title": "Steil, Oxer und Co. richtig anreiten"
      },
      {
        "id": "ra-w14-l7",
        "slug": "parcours-und-wendungen",
        "number": 7,
        "title": "Der Parcours: Wendungen und Linien"
      },
      {
        "id": "ra-w14-l8",
        "slug": "regeln-und-fehler",
        "number": 8,
        "title": "Regeln und Strafpunkte"
      },
      {
        "id": "ra-w14-l9",
        "slug": "sicherheit-beim-springen",
        "number": 9,
        "title": "Sicherheit und Pferdewohl beim Springen"
      }
    ]
  }
];

export const grossGamesInfo: AcademyGameInfo[] = [
  {
    "id": "ra-spiel-gangarten",
    "slug": "gangarten-quiz",
    "title": "Gangarten-Quiz",
    "teaser": "Schritt, Trab oder Galopp? Erkenne den Takt.",
    "learns": "Schritt (Viertakt), Trab (Zweitakt) und Galopp (Dreitakt) an Fußfolge und Klang unterscheiden; in Stufe Mittel auch Rechts- und Linksgalopp.",
    "tint": "#DDE3D6",
    "cover": {
      "kind": "scene",
      "scene": "ak-gang-trab"
    },
    "tier": "gross"
  },
  {
    "id": "ra-spiel-bahnfiguren",
    "slug": "bahnfiguren-meister",
    "title": "Bahnfiguren-Meister",
    "teaser": "Zirkel, Volte, Schlangenlinie – erkennst du sie alle?",
    "learns": "Bahnfiguren (ganze Bahn, Zirkel, Volte, Schlangenlinien, Handwechsel) erkennen und Bahnpunkte finden.",
    "tint": "#DDE3D6",
    "cover": {
      "kind": "scene",
      "scene": "ak-bahn-schlange"
    },
    "tier": "gross"
  }
];
