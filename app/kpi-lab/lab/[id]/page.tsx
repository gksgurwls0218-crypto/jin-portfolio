import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail from "@/components/kpi/KpiDetail";
import { LAB, STATUS_BADGE, findLab } from "@/lib/kpiMetrics";

export function generateStaticParams() {
  return LAB.map((k) => ({ id: k.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const k = findLab(id);
  return k ? { title: `${k.name} | KPI Lab`, description: k.short } : {};
}

export default async function LabDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const k = findLab(id);
  if (!k) notFound();
  const badge = STATUS_BADGE[k.status];

  return (
    <KpiDetail
      backHref="/kpi-lab/lab"
      backLabel="Data & KPI Lab"
      kicker={`${k.code} · ${k.type}`}
      title={k.name}
      badge={badge}
      blocks={[
        { label: "What it is", text: k.detail },
        { label: "Built from", text: `Grounded in existing KPIs/data: ${k.basedOn.join(", ")}.` },
        { label: "Development status", text: `${badge.label} — ${k.status === "draft" ? "measurement method defined; benchmark and validation still to come." : k.status === "live" ? "validated on real match data and usable in the field." : "an idea with the measurement method still to be established."}` },
      ]}
    />
  );
}
