/* Automatisch erzeugt mit `npm run akademie:katalog` – nicht von Hand ändern. */
import type { AcademyGameInfo, AcademyWorldInfo } from "./types";

/** Große Akademie: Übersicht ohne Inhalte (die Inhalte liegen in welten/*.server.ts) */
export const grossWorldsInfo: AcademyWorldInfo[] = [
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
