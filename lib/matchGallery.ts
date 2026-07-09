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
    competition: "UEFA Champions League · Semi Final",
    date: "Apr–May 2026",
    venue: "TBD",
    home: { name: "PSG", score: 5 },
    away: { name: "Bayern Munich", score: 4 },
    featured: true,
    goals: [], // hypothetical fixture — add scorers when confirmed
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
    date: "20 Apr 2026",
    venue: "TBD",
    home: { name: "Korea", score: 0 },
    away: { name: "Paraguay", score: 0 },
    goals: [],
    lineups: {
      home: {
        formation: "4-3-3",
        players: ["Kim S-G", "Kim M-H", "Kim M-J", "Kim Y-G", "Kim J-S", "Hwang I-B", "Lee J-S", "Won D-J", "Lee K-I", "Son", "Hwang H-C"],
      },
      away: {
        formation: "4-4-2",
        players: ["Coronel", "Espínola", "Gómez", "Alderete", "Giménez", "Almirón", "Cubas", "Villasanti", "Enciso", "Sanabria", "Sosa"],
      },
    },
  },
  // ── The 3 uploaded reports below. Scores/goals and OPPONENT line-ups are best-effort
  //    from the decks — please confirm & correct the numbers/names here.
  {
    slug: "korea-czech",
    competition: "International Friendly",
    date: "2025",
    venue: "TBD",
    home: { name: "Korea", score: 2 },
    away: { name: "Czech Republic", score: 0 },
    goals: [
      { team: "home", scorer: "Hwang In-beom", minute: 66 },
      { team: "home", scorer: "Oh Hyun-gyu", minute: 79 },
    ],
    lineups: {
      home: {
        formation: "3-4-3",
        players: ["Kim Seung-gyu", "Lee Han-beom", "Kim Min-jae", "Lee Gi-hyeok", "Lee Tae-seok", "Baek Seung-ho", "Hwang In-beom", "Seol Young-woo", "Son Heung-min", "Lee Kang-in", "Lee Jae-sung"],
      },
      away: {
        formation: "5-2-3",
        players: ["Staněk", "Coufal", "Hranáč", "Krejčí", "Holeš", "Zelený", "Souček", "Sojka", "Sadílek", "Hložek", "Chorý"],
      },
    },
  },
  {
    slug: "brazil-haiti",
    competition: "International Friendly",
    date: "2025",
    venue: "TBD",
    home: { name: "Brazil", score: 3 },
    away: { name: "Haiti", score: 0 },
    goals: [],
    lineups: {
      home: {
        formation: "4-3-3",
        players: ["Alisson", "Danilo", "Marquinhos", "Gabriel", "Wendell", "Casemiro", "Bruno Guimarães", "Paquetá", "Raphinha", "Cunha", "Vinícius"],
      },
      away: {
        formation: "5-4-1",
        players: ["Placide", "Bruny", "Numa", "Bazile", "Camejo", "Alcénat", "Saint-Juste", "Cétoute", "Vincent", "Baptiste", "Pierrot"],
      },
    },
  },
  {
    slug: "germany-curacao",
    competition: "International Friendly",
    date: "2025",
    venue: "TBD",
    home: { name: "Germany", score: 4 },
    away: { name: "Curaçao", score: 0 },
    goals: [
      { team: "home", scorer: "Havertz", minute: 49 },
      { team: "home", scorer: "Brown", minute: 67 },
      { team: "home", scorer: "Undav", minute: 77 },
    ],
    lineups: {
      home: {
        formation: "4-2-3-1",
        players: ["Baumann", "Kimmich", "Tah", "Rüdiger", "Mittelstädt", "Pavlović", "Groß", "Sané", "Wirtz", "Musiala", "Havertz"],
      },
      away: {
        formation: "5-3-2",
        players: ["Room", "Martina", "Gaari", "Bonevacia", "Sambo", "L. Bacuna", "J. Bacuna", "Janga", "Kastaneer", "Antonia", "Bito"],
      },
    },
  },
];
