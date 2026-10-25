"use client";
import CardIndex from "@/components/ui/CardIndex";
import { useLocale } from "@/lib/useLocale";

// Index for the essays (new concepts) and the Lab. Since 2026-10-25 it renders
// through the shared CardIndex (same design as /kpi-lab/advanced); the props
// stay as they were so the pages only had to add thumb/status.
export type Badge = { label: string; color: string; bg: string; border: string };
export type IndexItem = {
  href: string; title: string; sub: string; short: string;
  badge?: Badge; tags?: string[];
  /** Short right-aligned note in the card footer — the Lab uses it for the
      added/updated date the index is sorted on. */
  meta?: string;
  /** draft / concept / live — picks the badge style. */
  status?: "draft" | "concept" | "live";
  thumb?: string;
  ghost?: string;
};

export default function KpiIndex({
  eyebrow, title, accent, intro, items, backHref = "/kpi-lab", backLabel = "Data & KPI Lab",
}: { eyebrow: string; title: string; accent: string; intro: string; items: IndexItem[]; backHref?: string; backLabel?: string }) {
  const locale = useLocale();
  return (
    <CardIndex
      back={{ href: backHref, label: backLabel }}
      eyebrow={eyebrow} title={title} accent={accent} intro={intro}
      enterLabel={locale === "ko" ? "들어가기" : "Enter"} previewLabel={locale === "ko" ? "미리보기" : "Preview"}
      items={items.map((it) => ({
        href: it.href, code: it.sub, title: it.title, short: it.short, tags: it.tags, meta: it.meta,
        badge: it.badge ? { label: it.badge.label, tone: it.status ?? "plain" } : undefined,
        thumb: it.thumb, ghost: it.ghost,
      }))}
    />
  );
}
