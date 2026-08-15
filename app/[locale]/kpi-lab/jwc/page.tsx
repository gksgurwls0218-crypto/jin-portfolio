import type { Metadata } from "next";
import KpiDetail from "@/components/kpi/KpiDetail";
import { STATUS_BADGE } from "@/lib/kpiMetrics";
import { JWC_CONTENT } from "@/lib/jwcContent";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const c = JWC_CONTENT[isLocale(raw) ? raw : "en"];
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function JwcPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = JWC_CONTENT[locale];
  const badge = STATUS_BADGE.draft;
  return (
    <KpiDetail
      backHref="/kpi-lab/lab"
      backLabel={c.backLabel}
      kicker={c.kicker}
      title={c.title}
      badge={{ ...badge, label: locale === "ko" ? "초안" : badge.label }}
      blocks={c.blocks.map((b) => ({
        label: b.label,
        text: b.text,
        visualComponent: b.visualComponent,
        visualCaption: b.visualCaption,
      }))}
    />
  );
}
