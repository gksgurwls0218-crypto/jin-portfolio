import type { Metadata } from "next";
import KpiLab from "@/components/KpiLab";

export const metadata: Metadata = {
  title: "Data & KPI Lab | Jin",
  description: "The metrics behind Variation Theory — the established toolbox and the original KPIs built to measure variation directly.",
};

export default function KpiLabPage() {
  return <KpiLab />;
}
