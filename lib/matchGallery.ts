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
    slug: "psg-inter-ucl-2025",
    competition: "UEFA Champions League · Final",
    date: "31 May 2025",
    venue: "Allianz Arena, Munich",
    home: { name: "PSG", score: 5 },
    away: { name: "Inter Milan", score: 0 },
    featured: true,
    goals: [
      { team: "home", scorer: "Hakimi", minute: 12, assist: "Doué" },
      { team: "home", scorer: "Doué", minute: 20, assist: "Dembélé" },
      { team: "home", scorer: "Doué", minute: 63, assist: "Kvaratskhelia" },
      { team: "home", scorer: "Kvaratskhelia", minute: 73 },
      { team: "home", scorer: "Mayulu", minute: 86, assist: "Barcola" },
    ],
    lineups: {
      home: {
        formation: "4-3-3",
        players: ["Donnarumma", "Hakimi", "Marquinhos", "Pacho", "Nuno Mendes", "João Neves", "Vitinha", "Fabián Ruiz", "Doué", "Dembélé", "Kvaratskhelia"],
      },
      away: {
        formation: "3-5-2",
        players: ["Sommer", "Pavard", "Acerbi", "Bastoni", "Dumfries", "Barella", "Çalhanoğlu", "Mkhitaryan", "Dimarco", "Thuram", "Lautaro"],
      },
    },
  },
  {
    slug: "psg-bayern-ucl-2026",
    competition: "UEFA Champions League · Semi Final",
    date: "Apr–May 2026",
    venue: "TBD",
    home: { name: "PSG", score: 5 },
    away: { name: "Bayern Munich", score: 4 },
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
];
