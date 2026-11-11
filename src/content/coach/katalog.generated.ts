/* Automatisch erzeugt mit `npm run coach:katalog` – nicht von Hand ändern. */
import type { CoachExerciseInfo } from "./types";

/** Rider Coach: Übungen ohne Inhalte (Titel, Schwierigkeit, Ort, leichtere Variante, Probleme) */
export const coachExerciseCatalog: CoachExerciseInfo[] = [
  {
    "id": "rc-01",
    "title": "Beckenschaukel im Sitzen",
    "difficulty": 1,
    "place": "zuhause",
    "problems": [
      "cp-01"
    ]
  },
  {
    "id": "rc-02",
    "title": "Kurze Aussitzphasen im ruhigen Trab",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-01",
    "problems": [
      "cp-01"
    ]
  },
  {
    "id": "rc-03",
    "title": "Wechsel zwischen Leichttraben und Aussitzen",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-02",
    "problems": [
      "cp-01"
    ]
  },
  {
    "id": "rc-04",
    "title": "Sitzschulung an der Longe",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-01",
    "problems": [
      "cp-01"
    ]
  },
  {
    "id": "rc-05",
    "title": "Ausatmen im Takt",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-01",
      "cp-06",
      "cp-07",
      "cp-08"
    ]
  },
  {
    "id": "rc-06",
    "title": "Waden dehnen an der Treppenstufe",
    "difficulty": 1,
    "place": "zuhause",
    "problems": [
      "cp-02",
      "cp-04"
    ]
  },
  {
    "id": "rc-07",
    "title": "Bein aus der Hüfte fallen lassen",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-02",
      "cp-04",
      "cp-07"
    ]
  },
  {
    "id": "rc-08",
    "title": "Bügellänge und Fußposition prüfen",
    "difficulty": 1,
    "place": "boden",
    "problems": [
      "cp-02",
      "cp-04"
    ]
  },
  {
    "id": "rc-09",
    "title": "Gewicht in den Bügel: Stehen im Schritt",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-02",
      "cp-04",
      "cp-07",
      "cp-08"
    ]
  },
  {
    "id": "rc-10",
    "title": "Bügel blind wiederfinden",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-04"
    ]
  },
  {
    "id": "rc-11",
    "title": "Leichter Sitz im Schritt und Trab",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-09",
    "problems": [
      "cp-02",
      "cp-04"
    ]
  },
  {
    "id": "rc-12",
    "title": "Hüfte öffnen zu Hause",
    "difficulty": 1,
    "place": "zuhause",
    "problems": [
      "cp-02",
      "cp-04",
      "cp-07"
    ]
  },
  {
    "id": "rc-13",
    "title": "Schritt ohne Bügel",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-07",
    "problems": [
      "cp-07"
    ]
  },
  {
    "id": "rc-14",
    "title": "Die Wasserglas-Hand",
    "difficulty": 1,
    "place": "zuhause",
    "problems": [
      "cp-08"
    ]
  },
  {
    "id": "rc-15",
    "title": "Zügel richtig halten, Ellbogen elastisch",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-06",
      "cp-08",
      "cp-09"
    ]
  },
  {
    "id": "rc-16",
    "title": "Halsriemen-Trick im Leichttraben",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-08"
    ]
  },
  {
    "id": "rc-17",
    "title": "Gerte unter den Daumen",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-15",
    "problems": [
      "cp-08"
    ]
  },
  {
    "id": "rc-18",
    "title": "Übergänge Schritt – Trab – Schritt",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-05",
      "cp-06"
    ]
  },
  {
    "id": "rc-19",
    "title": "Galopphilfe im Trockenen üben",
    "difficulty": 1,
    "place": "zuhause",
    "problems": [
      "cp-05"
    ]
  },
  {
    "id": "rc-20",
    "title": "Angaloppieren aus der Ecke auf dem Zirkel",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-21",
    "problems": [
      "cp-05"
    ]
  },
  {
    "id": "rc-21",
    "title": "Angaloppieren an der Longe mit Unterstützung",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-05"
    ]
  },
  {
    "id": "rc-22",
    "title": "Langsam leichttraben – du gibst den Takt",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-06",
      "cp-07"
    ]
  },
  {
    "id": "rc-23",
    "title": "Gebogene Linien statt langer Geraden",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-18",
    "problems": [
      "cp-06"
    ]
  },
  {
    "id": "rc-24",
    "title": "Halbe Parade mit Atem und Bauch",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-18",
    "problems": [
      "cp-05",
      "cp-06"
    ]
  },
  {
    "id": "rc-25",
    "title": "Zirkel mit vier Pylonen",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-09"
    ]
  },
  {
    "id": "rc-26",
    "title": "Zirkel vergrößern",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-25",
    "problems": [
      "cp-09"
    ]
  },
  {
    "id": "rc-27",
    "title": "Sitzcheck in der Wendung",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-09"
    ]
  },
  {
    "id": "rc-28",
    "title": "Stange auf dem Zirkel",
    "difficulty": 2,
    "place": "reiten",
    "easier": "rc-25",
    "problems": [
      "cp-09"
    ]
  },
  {
    "id": "rc-29",
    "title": "Passform-Check der Trense",
    "difficulty": 1,
    "place": "boden",
    "problems": [
      "cp-03"
    ]
  },
  {
    "id": "rc-30",
    "title": "Ruhige Trens-Routine in kleinen Schritten",
    "difficulty": 2,
    "place": "boden",
    "easier": "rc-29",
    "problems": [
      "cp-03"
    ]
  },
  {
    "id": "rc-31",
    "title": "Kopf senken auf feines Signal",
    "difficulty": 2,
    "place": "boden",
    "problems": [
      "cp-03"
    ]
  },
  {
    "id": "rc-32",
    "title": "Stehen bleiben auf Signal",
    "difficulty": 1,
    "place": "boden",
    "problems": [
      "cp-10"
    ]
  },
  {
    "id": "rc-33",
    "title": "Aufstiegshilfe in kleinen Schritten",
    "difficulty": 2,
    "place": "boden",
    "easier": "rc-32",
    "problems": [
      "cp-10"
    ]
  },
  {
    "id": "rc-34",
    "title": "Weich aufsteigen",
    "difficulty": 1,
    "place": "reiten",
    "problems": [
      "cp-10"
    ]
  }
];

/** Akademie-Lektion → passende Rider-Coach-Probleme */
export const coachLessonLinks: Record<string, string[]> = {
  "ra-w1-l3": [
    "cp-03",
    "cp-10"
  ],
  "ra-w1-l4": [
    "cp-10"
  ],
  "ra-w2-l1": [
    "cp-01",
    "cp-02",
    "cp-04",
    "cp-07"
  ],
  "ra-w2-l2": [
    "cp-02",
    "cp-04",
    "cp-07"
  ],
  "ra-w2-l3": [
    "cp-08"
  ],
  "ra-w3-l3": [
    "cp-06",
    "cp-09"
  ],
  "ra-w3-l4": [
    "cp-08"
  ],
  "ra-w3-l5": [
    "cp-05"
  ],
  "ra-w5-l2": [
    "cp-04",
    "cp-06"
  ],
  "ra-w5-l3": [
    "cp-01"
  ],
  "ra-w6-l2": [
    "cp-05"
  ],
  "ra-w6-l3": [
    "cp-05"
  ],
  "ra-w6-l4": [
    "cp-05",
    "cp-06"
  ],
  "ra-w7-l3": [
    "cp-09"
  ],
  "ra-w8-l1": [
    "cp-08"
  ],
  "ra-w8-l4": [
    "cp-03"
  ],
  "ra-w9-l1": [
    "cp-03",
    "cp-10"
  ],
  "ra-w10-l3": [
    "cp-10"
  ],
  "ra-w10-l4": [
    "cp-03"
  ],
  "ra-w11-l3": [
    "cp-09"
  ],
  "ra-w12-l1": [
    "cp-01",
    "cp-06"
  ],
  "ra-w12-l3": [
    "cp-07"
  ],
  "ra-w12-l4": [
    "cp-07"
  ],
  "ra-w13-l3": [
    "cp-09"
  ]
};
