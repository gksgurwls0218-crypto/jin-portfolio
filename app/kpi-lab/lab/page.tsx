import type { Metadata } from "next";
import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { LAB, STATUS_BADGE } from "@/lib/kpiMetrics";

export const metadata: Metadata = {
  title: "Data & KPI Lab | Jin",
  description: "Original metrics designed to measure Variation directly — with honest development status.",
};

const items: IndexItem[] = LAB.map((k) => ({
  href: `/kpi-lab/lab/${k.id}`,
  title: k.name,
  sub: `${k.code} · ${k.type}`,
  short: k.short,
  badge: STATUS_BADGE[k.status],
}));

export default function LabIndexPage() {
  return (
    <KpiIndex
      eyebrow="03 / Data & KPI Lab"
      title="Metrics I'm"
      accent="designing."
      intro="Original KPIs built to measure what off-the-shelf data can't — the timing, sequencing and unpredictability that variation lives on. Status is honest: most are still in development."
      items={items}
    />
  );
}
