import type { Metadata } from "next";
import MatchGallery from "@/components/MatchGallery";

export const metadata: Metadata = {
  title: "Match Analysis | Jin",
  description: "Variation theory applied to real matches — including the moments where it fails.",
};

export default function MatchesPage() {
  return <MatchGallery />;
}
