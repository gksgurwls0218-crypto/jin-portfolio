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
      intro="Two ways in - the match analysis under Variation Theory, new tactical terms defined myself to explain Variation Theory"
      doors={[
        {
          href: "/match-analysis/matches",
          n: "01",
          label: "Match Analysis",
          title: "Match analysis reports.",
        },
        {
          href: "/match-analysis/essays",
          n: "02",
          label: "New concepts",
          title: "Tactical terms I made",
        },
      ]}
    />
  );
}
