import type { Metadata } from "next";
import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { ESSAYS } from "@/lib/essays";

export const metadata: Metadata = {
  title: "New concepts | Jin",
  description: "New concepts to prove Variation Theory is applicable and reliable — a lab to make new things, name the spaces, and evolve football.",
};

const items: IndexItem[] = ESSAYS.map((e) => ({
  href: `/match-analysis/essays/${e.id}`,
  title: e.title,
  sub: e.category,
  short: e.blurb,
}));

export default function EssaysIndexPage() {
  return (
    <KpiIndex
      backHref="/match-analysis"
      backLabel="Match Analysis & Essays"
      eyebrow="02 / New concepts"
      title="Tactical terms"
      accent="I made"
      intro="New concepts to prove Variation Theory is applicable and reliable. A lab to make new things, theories, name the spaces, and evolve football."
      items={items}
    />
  );
}
