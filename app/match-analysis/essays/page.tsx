import type { Metadata } from "next";
import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { ESSAYS } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Essays | Jin",
  description: "Original tactical essays — the concepts behind Variation Theory, argued in long form.",
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
      eyebrow="02 / Essays"
      title="The ideas,"
      accent="written out."
      intro="Original tactical writing — the concepts the framework is built on, each argued in full."
      items={items}
    />
  );
}
