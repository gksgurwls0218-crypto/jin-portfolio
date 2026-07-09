import type { Metadata } from "next";
import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { STANDARD } from "@/lib/kpiMetrics";

export const metadata: Metadata = {
  title: "Advanced Data & KPIs for Variation Theory | Jin",
  description: "The advanced metrics used to put Variation Theory under data.",
};

const items: IndexItem[] = STANDARD.map((m) => ({
  href: `/kpi-lab/advanced/${m.id}`,
  title: m.name,
  sub: m.abbr,
  short: m.short,
}));

export default function AdvancedIndexPage() {
  return (
    <KpiIndex
      eyebrow="03 / Advanced Data & KPIs"
      title="The metrics I read"
      accent="matches with."
      intro="Established, advanced metrics — used not as decoration but to test whether Variation Theory actually shows up in the data."
      items={items}
    />
  );
}
