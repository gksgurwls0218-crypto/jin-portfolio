import type { Lineup, Side } from "@/lib/matchGallery";

export type Spot = { x: number; y: number; name: string; gk: boolean };

/* Turn a formation + 11 names into x/y positions (percent of the pitch).
   Home attacks right (occupies the left half), away mirrors on the right half. */
export function layout(lineup: Lineup, side: Side): Spot[] {
  const lines = lineup.formation.split("-").map((n) => parseInt(n, 10)).filter((n) => n > 0);
  const [gk, ...outfield] = lineup.players;
  const spots: Spot[] = [];

  const home = side === "home";
  // x anchors (percent): GK near own goal, lines march toward halfway
  const gkX = home ? 5 : 95;
  const nearX = home ? 15 : 85;   // first outfield line
  const farX = home ? 47 : 53;    // most advanced line
  const cols = lines.length;

  spots.push({ x: gkX, y: 50, name: gk, gk: true });

  let idx = 0;
  lines.forEach((count, li) => {
    const x = cols === 1 ? (home ? 30 : 70) : nearX + (li * (farX - nearX)) / (cols - 1);
    for (let i = 0; i < count; i++) {
      const y = 12 + ((i + 0.5) * (88 - 12)) / count; // spread within [12,88]
      const name = outfield[idx++] ?? "";
      spots.push({ x, y, name, gk: false });
    }
  });

  return spots;
}
