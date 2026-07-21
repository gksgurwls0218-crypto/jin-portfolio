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
  tags: k.basedOn,
}));

export default function LabIndexPage() {
  return (
    <KpiIndex
      eyebrow="03 / Data & KPI Lab"
      title="A Lab where new metrics"
      accent="born"
      intro="These are not certified KPIs. These are born to measure Variation Theory and sometimes off the beaten path. Revolutionary thoughts are sometimes originated from unusual creativity. Creativities are still on the way to establish a new thing."
      items={items}
    />
  );
}
