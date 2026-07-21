import type { Metadata } from "next";
import DoorLanding from "@/components/DoorLanding";

export const metadata: Metadata = {
  title: "Advanced Data & KPI Lab | Jin",
  description: "Advanced data & KPIs used to prove Variation Theory — and an original lab of new metrics.",
};

export default function KpiLabPage() {
  return (
    <DoorLanding
      eyebrow="03 / Advanced Data & KPI Lab"
      title="Could be reckless,"
      accent="or innovative."
      intro="A room for advanced data & KPIs to prove Variation Theory — and a room to think of something new by stepping off the beaten track."
      doors={[
        {
          href: "/kpi-lab/advanced",
          n: "01",
          label: "Advanced Data & KPIs for Variation Theory",
          title: "The evidence layer.",
          desc: "The metrics to measure how the Variation Theory works.",
        },
        {
          href: "/kpi-lab/lab",
          n: "02",
          label: "Data & KPI Lab",
          title: "Stepping off the beaten path",
          desc: "Very new metrics to develop myself. A lab to create new metrics and show it to the world.",
        },
      ]}
    />
  );
}
