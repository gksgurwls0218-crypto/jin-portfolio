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
    // Optional. vaep/dlb: only populate when a reliable source (Opta / Sofascore / Fotmob open data) has the
    // number for this specific match — omit the key entirely rather than guess.
    // xt: Opta/Sofascore/Fotmob/FIFA do not publish match-level xT (it's an internal analytics-tool metric,
    // not a broadcast stat — confirmed by search across all 5 matches in this project). Real xT requires a
    // full pass/carry x,y event log, which none of our sources contain. So `xt` here is a documented proxy
    // index, not the official Karun Singh xT model: for each team,
    //   index = round(100 * (0.5 * xG_share + 0.5 * fieldTilt_share))   (away = 100 - home)
    // where xG_share = team's xG / total match xG, fieldTilt_share = team's field-tilt % / 100.
    // Always est: true. Treat as a rough directional read (who created more territorial+shot threat share),
    // not a real per-possession xT value — MatchHeader labels it "xT (proxy)" for this reason.
    xt?: StatValue<[number, number]>;
    vaep?: StatValue<[number, number]>;
    dlb?: StatValue<[number, number]>;
  };
  tags: string[];
  verdict3: string[];
  featured?: boolean;
  next?: string;
  // Absolute URL to the analysis video for this match, hosted on Cloudflare R2 (the files are
  // 50-300MB each, too large to keep in git or redeploy through Vercel on every push). Local
  // "/match-video/*.mp4" paths also work if a file is ever served from /public instead.
  video?: string;
  // Path under /public to an English WebVTT caption track translating the Korean tactical
  // callouts burned into the video (e.g. "/match-video/captions/psg-bayern.en.vtt"). Optional —
  // only the 4 matches whose source clips carry on-screen Korean captions have one; the
  // matching .srt lives alongside it for reference/editing but isn't referenced by the player
  // (browsers require WebVTT for <track>).
  captionsEn?: string;
  // Same idea, Korean track (the original on-screen text, transcribed). Kept on disk for
  // reference but not currently wired into the player — the site only exposes English
  // captions, so nothing Korean is user-facing.
  captionsKo?: string;
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
