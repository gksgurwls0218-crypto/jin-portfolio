import fs from "fs";
import path from "path";
import matter from "gray-matter";

const MATCHES_DIR = path.join(process.cwd(), "content/matches");

export type StatValue<T> = { value: T; est?: boolean; verify?: boolean };

export type MatchFrontmatter = {
  slug: string;
  competition: string;
  date: string;
  venue: string;
  home: { name: string; score: number };
  away: { name: string; score: number };
  stats: {
    possession: [number, number];
    xg: StatValue<[number, number]>;
    fieldTilt: StatValue<number>;
    ppda: StatValue<[number, number]>;
  };
  tags: string[];
  verdict3: string[];
  featured?: boolean;
  next?: string;
};

export function getMatchSlugs(): string[] {
  if (!fs.existsSync(MATCHES_DIR)) return [];
  return fs
    .readdirSync(MATCHES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMatchSource(slug: string): { frontmatter: MatchFrontmatter; content: string } {
  const raw = fs.readFileSync(path.join(MATCHES_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as MatchFrontmatter, content };
}

export function getAllMatchesFrontmatter(): MatchFrontmatter[] {
  return getMatchSlugs()
    .map((slug) => getMatchSource(slug).frontmatter)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
