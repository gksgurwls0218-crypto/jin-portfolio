/* Match gallery data — powers the /match-analysis cards + hover tactical board.
   ── EDIT ME. Line-ups are ordered: [GK, then each formation line back→front].
   Goals are only filled where known (the PSG–Inter final). For hypothetical /
   pending fixtures, `goals: []` and the card shows the score without scorers.  */

export type Side = "home" | "away";

export type Goal = { team: Side; scorer: string; minute: number; assist?: string };

export type Lineup = {
  formation: string;   // e.g. "4-3-3"  — sum of lines must be 10 (outfield)
  players: string[];   // 11 names: GK first, then each line back→front
};

export type GalleryTeam = { name: string; score: number };

export type GalleryMatch = {
  slug: string;
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
    competition: "UEFA Champions League 2025/26 · Semi-final, 1st leg",
    date: "28 Apr 2026",
    venue: "Parc des Princes",
    home: { name: "PSG", score: 5 },
    away: { name: "Bayern Munich", score: 4 },
    featured: true,
    goals: [
      { team: "away", scorer: "Kane (pen)", minute: 17 },
      { team: "home", scorer: "Kvaratskhelia", minute: 24 },
      { team: "home", scorer: "João Neves", minute: 33 },
      { team: "away", scorer: "Olise", minute: 41 },
      { team: "home", scorer: "Dembélé (pen)", minute: 45 },
      { team: "home", scorer: "Kvaratskhelia", minute: 56 },
      { team: "home", scorer: "Dembélé", minute: 58 },
      { team: "away", scorer: "Upamecano", minute: 65 },
      { team: "away", scorer: "Luis Díaz", minute: 68 },
    ],
    lineups: {
      home: {
        formation: "4-3-3",
        players: ["Donnarumma", "Hakimi", "Marquinhos", "Pacho", "Nuno Mendes", "João Neves", "Vitinha", "Fabián Ruiz", "Doué", "Dembélé", "Kvaratskhelia"],
      },
      away: {
        formation: "4-2-3-1",
        players: ["Neuer", "Kimmich", "Upamecano", "Tah", "Davies", "Pavlović", "Goretzka", "Olise", "Musiala", "Sané", "Kane"],
      },
    },
  },
  {
    slug: "korea-paraguay-2026",
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
        formation: "3-4-3",
        players: ["Kim Seung-gyu", "Lee Han-beom", "Park Jin-seob", "Kim Min-jae", "Kim Moon-hwan", "Kim Jin-gyu", "Hwang In-beom", "Lee Myung-jae", "Lee Dong-gyeong", "Son Heung-min", "Eom Ji-sung"],
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
        formation: "3-4-3",
        players: ["Kim Seung-gyu", "Lee Han-beom", "Kim Min-jae", "Lee Gi-hyuk", "Lee Tae-seok", "Paik Seung-ho", "Hwang In-beom", "Seol Young-woo", "Son Heung-min", "Lee Kang-in", "Lee Jae-sung"],
      },
      away: {
        formation: "5-2-3",
        players: ["Kovář", "Coufal", "Hranáč", "Chaloupek", "Krejčí", "Zelený", "Souček", "Sojka", "Schick", "Sulc", "Provod"],
      },
    },
  },
  {
    slug: "brazil-haiti",
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
        formation: "4-3-3",
        players: ["Alisson", "Danilo", "Marquinhos", "Gabriel", "Douglas Santos", "Casemiro", "Bruno Guimarães", "Paquetá", "Raphinha", "Cunha", "Vinícius Jr"],
      },
      away: {
        formation: "5-4-1",
        players: ["Placide", "Arcus", "Ade", "Delcroix", "Experience", "Duverne", "Bellegarde", "Providence", "Jean Jacques", "Casimir", "Pierrot"],
      },
    },
  },
  {
    slug: "germany-curacao",
    competition: "FIFA World Cup 2026 · Group E",
    date: "14 Jun 2026",
    venue: "Houston Stadium",
    home: { name: "Germany", score: 7 },
    away: { name: "Curaçao", score: 1 },
    goals: [
      { team: "home", scorer: "Nmecha", minute: 6 },
      { team: "home", scorer: "Schlotterbeck", minute: 38 },
      { team: "home", scorer: "Havertz", minute: 45 },
      { team: "home", scorer: "Musiala", minute: 47 },
      { team: "home", scorer: "Brown", minute: 68 },
      { team: "home", scorer: "Undav", minute: 78 },
      { team: "home", scorer: "Havertz", minute: 88 },
      // Curaçao's goal — confirm scorer/minute
    ],
    lineups: {
      home: {
        formation: "3-4-3",
        players: ["Neuer", "Tah", "Schlotterbeck", "Kimmich", "Brown", "Pavlović", "Nmecha", "Sané", "Musiala", "Havertz", "Wirtz"],
      },
      away: {
        formation: "4-1-2-3",
        players: ["Room", "Floranus", "Obispo", "Bazoer", "Fonville", "Juninho Bacuna", "Comenencia", "Leandro Bacuna", "Locadia", "Hansen", "Chong"],
      },
    },
  },
];
