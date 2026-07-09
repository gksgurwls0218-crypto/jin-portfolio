import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail from "@/components/kpi/KpiDetail";
import { STANDARD, findStandard } from "@/lib/kpiMetrics";

export function generateStaticParams() {
  return STANDARD.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = findStandard(id);
  return m ? { title: `${m.name} (${m.abbr}) | KPI Lab`, description: m.measures } : {};
}

export default async function AdvancedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = findStandard(id);
  if (!m) notFound();

  return (
    <KpiDetail
      backHref="/kpi-lab/advanced"
      backLabel="Advanced Data & KPIs"
      kicker={m.abbr}
      title={m.name}
      blocks={[
        { label: "What it measures", text: m.measures },
        { label: "The question it answers", text: m.question },
        { label: "In the Variation framework", text: m.detail },
      ]}
    />
  );
}
