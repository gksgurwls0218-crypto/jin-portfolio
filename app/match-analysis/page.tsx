import type { Metadata } from "next";
import DoorLanding from "@/components/DoorLanding";

export const metadata: Metadata = {
  title: "Match Analysis & Essays | Jin",
  description: "Match analyses where Variation Theory meets the game, and original tactical essays.",
};

export default function MatchAnalysisPage() {
  return (
    <DoorLanding
      eyebrow="02 / Match Analysis & Essays"
      title="Theory applied,"
      accent="and written down."
      intro="Two ways in — the matches where Variation Theory meets the game, and the essays where the ideas are worked out in full."
      doors={[
        {
          href: "/match-analysis/matches",
          n: "01",
          label: "Match Analysis",
          title: "Tested on the pitch.",
          desc: "Interactive match breakdowns — hover a match to see both line-ups, then step inside for the full analysis.",
        },
        {
          href: "/match-analysis/essays",
          n: "02",
          label: "Essays",
          title: "The ideas, written out.",
          desc: "Original tactical essays — the concepts behind the framework, argued in long form.",
        },
      ]}
    />
  );
}
