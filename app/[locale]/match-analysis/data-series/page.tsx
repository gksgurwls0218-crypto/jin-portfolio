import type { Metadata } from "next";
import DataSeriesGallery from "@/components/DataSeriesGallery";

export const metadata: Metadata = {
  title: "What the data says | Jin",
  description: "One club, one competition, read all the way through using nothing but public data.",
};

export default function DataSeriesPage() {
  return <DataSeriesGallery />;
}
