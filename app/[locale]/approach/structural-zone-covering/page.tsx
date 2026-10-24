import { permanentRedirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

// Moved to the Data & KPI Lab on 2026-10-25. Kept so links already shared
// (LinkedIn, the /approach essay) keep working.
export default async function StructuralZoneCoveringMoved({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  permanentRedirect(`/${isLocale(locale) ? locale : "en"}/kpi-lab/lab/structural-zone-covering`);
}
