import type { Metadata } from "next";
import ApproachConcepts from "@/components/ApproachConcepts";

export const metadata: Metadata = {
  title: "Approach — The Variation vocabulary | Jin",
  description: "Every concept in the Variation framework — from the core idea to how it is measured.",
};

export default function ApproachPage() {
  return <ApproachConcepts />;
}
