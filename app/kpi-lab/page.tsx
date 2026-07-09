import type { Metadata } from "next";
import KpiLabLanding from "@/components/kpi/KpiLabLanding";

export const metadata: Metadata = {
  title: "Advanced Data & KPI Lab | Jin",
  description: "Advanced data & KPIs used to prove Variation Theory — and an original lab of new metrics.",
};

export default function KpiLabPage() {
  return <KpiLabLanding />;
}
