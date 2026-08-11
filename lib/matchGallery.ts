/* Match gallery data — powers the /match-analysis cards + hover tactical board.
   ── EDIT ME. Line-ups are ordered: [GK, then each formation line back→front].
   Goals are only filled where known (the PSG–Inter final). For hypothetical /
   pending fixtures, `goals: []` and the card shows the score without scorers.  */

export type Side = "home" | "away";

export type Goal = { team: Side; scorer: string; minute: number; plus?: number; pen?: boolean; assist?: string };

export type Lineup = {
  formation: string;   // e.g. "4-3-3"  — sum of lines must be 10 (outfield)
  players: string[];   // 11 names: GK first, then each line back→front
};

export type GalleryTeam = { name: string; score: number };

export type GalleryMatch = {
  slug: string;
  /* 사이트에 올린 날짜(YYYY-MM-DD). 갤러리 정렬 기준 — 경기 날짜가 아니라 게시 순서다.
     새 리포트를 추가할 때는 이 값을 반드시 채운다. 비어 있으면 목록 맨 뒤로 밀린다. */
  publishedAt?: string;
  competition: string;
  date: string;
  venue: string;
  home: GalleryTeam;
  away: GalleryTeam;
  goals: Goal[];
  lineups: { home: Lineup; away: Lineup };
  featured?: boolean;
};

export const MATCHES: GalleryMatch[] = [
  {
    slug: "psg-bayern-ucl-2026",
    publishedAt: "2026-07-07",
    competition: "UEFA Champions League 2025/26 · Semi-final, 1st leg",
    date: "28 Apr 2026",
    venue: "Parc des Princes",
    home: { name: "PSG", score: 5 },
    away: { name: "Bayern Munich", score: 4 },
    featured: true,
    goals: [
      { team: "away", scorer: "Kane", minute: 17, pen: true },
      { team: "home", scorer: "Kvaratskhelia", minute: 24 },
      { team: "home", scorer: "João Neves", minute: 33 },
      { team: "away", scorer: "Olise", minute: 41 },
      { team: "home", scorer: "Dembélé", minute: 45, plus: 5, pen: true },
      { team: "home", scorer: "Kvaratskhelia", minute: 56 },
      { team: "home", scorer: "Dembélé", minute: 58 },
      { team: "away", scorer: "Upamecano", minute: 65 },
      { team: "away", scorer: "Luis Díaz", minute: 68 },
    ],
    lineups: {
      home: {
        // Confirmed XI (ESPN / fcbayern.com / Confirmed Lineups, 28 Apr 2026): Safonov; Mendes, Marquinhos, Pacho, Hakimi; Zaïre-Emery, Neves, Vitinha; Kvaratskhelia, Dembélé, Doué.
        // Fixes vs previous data: GK was wrongly Donnarumma (actually Safonov); Hakimi/Mendes sides were swapped (Hakimi = RB, Mendes = LB);
        // Fabián Ruiz was not a starter (he subbed on for Zaïre-Emery, 64') — Zaïre-Emery started.
        formation: "4-3-3",
        // jin correction: Marquinhos / Pacho swapped.
        players: ["Safonov", "Nuno Mendes", "Pacho", "Marquinhos", "Hakimi", "Zaïre-Emery", "João Neves", "Vitinha", "Kvaratskhelia", "Dembélé", "Doué"],
      },
      away: {
        // Confirmed XI: Neuer; Stanišić, Upamecano, Tah, Davies; Kimmich, Pavlović; Olise, Musiala, Díaz; Kane.
        // jin correction: Davies / Stanišić swapped, Kimmich / Pavlović swapped, Luis Díaz / Olise swapped.
        formation: "4-2-3-1",
        players: ["Neuer", "Stanišić", "Tah", "Upamecano", "Davies", "Kimmich", "Pavlović", "Olise", "Musiala", "Luis Díaz", "Kane"],
      },
    },
  },
  {
    slug: "korea-paraguay-2026",
    publishedAt: "2026-07-07",
    competition: "International Friendly",
    date: "14 Oct 2025",
    venue: "Seoul World Cup Stadium",
    home: { name: "Korea", score: 2 },
    away: { name: "Paraguay", score: 0 },
    goals: [
      { team: "home", scorer: "Eom Ji-sung", minute: 15 },
      { team: "home", scorer: "Oh Hyun-gyu", minute: 75, assist: "Lee Kang-in" },
    ],
    lineups: {
      home: {
        // Back-3 stoppers and wide forwards corrected: Kim Min-jae = left stopper, Lee Han-beom = right stopper;
        // Eom Ji-sung = left wing, Lee Dong-gyeong = right wing. jin correction: Kim Moon-hwan / Lee Myung-jae swapped.
        formation: "3-4-3",
        players: ["Kim Seung-gyu", "Kim Min-jae", "Park Jin-seob", "Lee Han-beom", "Lee Myung-jae", "Kim Jin-gyu", "Hwang In-beom", "Kim Moon-hwan", "Eom Ji-sung", "Son Heung-min", "Lee Dong-gyeong"],
      },
      away: {
        formation: "4-2-3-1",
        players: ["Gill", "Benítez", "Gustavo Gómez", "Alderete", "Alonso", "Bobadilla", "Ojeda", "Cuenca", "Diego Gómez", "Almirón", "Martínez"],
      },
    },
  },
  // ── The 3 uploaded reports below. Scores/goals and OPPONENT line-ups are best-effort
  //    from the decks — please confirm & correct the numbers/names here.
  {
    slug: "korea-czech",
    publishedAt: "2026-07-09",
    competition: "FIFA World Cup 2026 · Group A",
    date: "11 Jun 2026",
    venue: "Guadalajara Stadium",
    home: { name: "Korea", score: 2 },
    away: { name: "Czech Republic", score: 1 },
    goals: [
      { team: "home", scorer: "Hwang In-beom", minute: 67 },
      { team: "home", scorer: "Oh Hyun-gyu", minute: 80 },
      // Czechia's goal — confirm scorer/minute
    ],
    lineups: {
      home: {
        // Back-3 corrected: Lee Gi-hyuk = left stopper, Kim Min-jae = center, Lee Han-beom = right stopper.
        // Front-3 corrected: Son Heung-min central, Lee Jae-sung left, Lee Kang-in right.
        formation: "3-4-3",
        players: ["Kim Seung-gyu", "Lee Gi-hyuk", "Kim Min-jae", "Lee Han-beom", "Lee Tae-seok", "Paik Seung-ho", "Hwang In-beom", "Seol Young-woo", "Lee Jae-sung", "Son Heung-min", "Lee Kang-in"],
      },
      away: {
        // Corrected per jin's screenshot: Coufal = right side of the back five.
        formation: "5-2-3",
        players: ["Kovář", "Coufal", "Chaloupek", "Hranáč", "Krejčí", "Zelený", "Souček", "Sojka", "Provod", "Schick", "Sulc"],
      },
    },
  },
  {
    slug: "brazil-haiti",
    publishedAt: "2026-07-09",
    competition: "FIFA World Cup 2026 · Group C",
    date: "19 Jun 2026",
    venue: "Philadelphia Stadium",
    home: { name: "Brazil", score: 3 },
    away: { name: "Haiti", score: 0 },
    goals: [
      { team: "home", scorer: "Cunha", minute: 23 },
      { team: "home", scorer: "Cunha", minute: 36 },
      { team: "home", scorer: "Vinícius Jr", minute: 45 },
    ],
    lineups: {
      home: {
        // L/R corrected per official lineup graphic: Douglas Santos (LB) – Gabriel (LCB) – Marquinhos (RCB) – Danilo (RB);
        // Paquetá – Casemiro – Guimarães across midfield; Vinícius Jr (left) – Cunha (center) – Raphinha (right) up top.
        formation: "4-3-3",
        players: ["Alisson", "Douglas Santos", "Gabriel", "Marquinhos", "Danilo", "Paquetá", "Casemiro", "Bruno Guimarães", "Vinícius Jr", "Cunha", "Raphinha"],
      },
      away: {
        // L/R corrected per official lineup graphic (Haiti attacks the opposite direction, so their right side reads first).
        formation: "5-4-1",
        players: ["Placide", "Arcus", "Duverne", "Ade", "Delcroix", "Experience", "Casimir", "Jean Jacques", "Bellegarde", "Providence", "Pierrot"],
      },
    },
  },
  {
    slug: "germany-curacao",
    publishedAt: "2026-07-09",
    competition: "FIFA World Cup 2026 · Group E",
    date: "14 Jun 2026",
    venue: "Houston Stadium",
    home: { name: "Germany", score: 7 },
    away: { name: "Curaçao", score: 1 },
    goals: [
      { team: "home", scorer: "Nmecha", minute: 6 },
      { team: "home", scorer: "Schlotterbeck", minute: 37 },
      { team: "home", scorer: "Musiala", minute: 46 },
      { team: "home", scorer: "Havertz", minute: 49, pen: true },
      { team: "home", scorer: "Brown", minute: 67 },
      { team: "home", scorer: "Undav", minute: 77 },
      { team: "home", scorer: "Havertz", minute: 87 },
      { team: "away", scorer: "Comenencia", minute: 21 },
    ],
    lineups: {
      home: {
        // Corrected per jin's own analysis report (GER_CUW_AnalysisReport.key): formation is 4-2-3-1, not 3-4-3.
        // Back four L→R: Brown, Schlotterbeck, Tah, Kimmich (Kimmich = right, per jin's screenshot). Pivot: Pavlović/Nmecha.
        formation: "4-2-3-1",
        players: ["Neuer", "Brown", "Schlotterbeck", "Tah", "Kimmich", "Pavlović", "Nmecha", "Wirtz", "Musiala", "Sané", "Havertz"],
      },
      away: {
        // Corrected per jin's own analysis report: formation is 4-3-1-2, not 4-1-2-3.
        // Hansen = left side of the front two (per jin's screenshot).
        formation: "4-3-1-2",
        players: ["Room", "Floranus", "Obispo", "Bazoer", "Fonville", "Juninho Bacuna", "Leandro Bacuna", "Chong", "Comenencia", "Locadia", "Hansen"],
      },
    },
  },
];
