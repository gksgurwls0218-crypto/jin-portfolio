import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail from "@/components/kpi/KpiDetail";
import { ESSAYS, findEssay } from "@/lib/essays";

export function generateStaticParams() {
  return ESSAYS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const e = findEssay(id);
  return e ? { title: `${e.title} — Essay | Jin`, description: e.blurb } : {};
}

export default async function EssayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = findEssay(id);
  if (!e) notFound();

  return (
    <KpiDetail
      backHref="/match-analysis/essays"
      backLabel="Essays"
      kicker={`${e.category} · ${e.ko}`}
      title={e.title}
      blocks={e.blocks}
    />
  );
}
