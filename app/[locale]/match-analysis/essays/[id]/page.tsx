import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail, { type Block } from "@/components/kpi/KpiDetail";
import { ESSAYS, findEssay } from "@/lib/essays";
import { ESSAYS_KO } from "@/lib/essaysContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";
import { ESSAY_FIGS } from "@/lib/essayFigures";

export function generateStaticParams() {
  return ESSAYS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const e = findEssay(id);
  if (!e) return {};
  const ko = locale === "ko" ? ESSAYS_KO[id] : undefined;
  const title = locale === "ko" ? e.ko : e.title;
  const suffix = locale === "ko" ? "전술 용어 | Jin" : "Tactical Term | Jin";
  return { title: `${title} — ${suffix}`, description: ko?.blurb ?? e.blurb };
}

export default async function EssayDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const e = findEssay(id);
  if (!e) notFound();

  const ko = locale === "ko" ? ESSAYS_KO[id] : undefined;
  const backLabel = locale === "ko" ? "전술 용어" : "Tactical terms";

  // Keep the English essay's visuals/structure; overlay Korean label+text by block order.
  const blocks: Block[] = e.blocks.map((b, i) => {
    const kob = ko?.blocks[i];
    return { ...b, label: kob?.label ?? b.label, text: kob?.text ?? b.text };
  });
  // Essays written without a figure get one under their first block (lib/essayFigures.ts).
  const fig = ESSAY_FIGS[id]?.[locale];
  if (fig && blocks[0] && !blocks.some((b) => b.visualSrc || b.visualComponent)) {
    blocks[0] = { ...blocks[0], svg: fig.svg, visualCaption: fig.caption };
  }

  const title = locale === "ko" ? e.ko : e.title;
  const category = locale === "ko" ? ko?.category ?? e.category : e.category;
  const kicker = locale === "ko" ? `${category} · ${e.title}` : `${category} · ${e.ko}`;

  const idx = ESSAYS.findIndex((x) => x.id === id);
  const nameOf = (x: (typeof ESSAYS)[number]) => (locale === "ko" ? x.ko : x.title);
  const prev = idx > 0 ? { href: `/match-analysis/essays/${ESSAYS[idx - 1].id}`, label: nameOf(ESSAYS[idx - 1]) } : undefined;
  const next = idx < ESSAYS.length - 1 ? { href: `/match-analysis/essays/${ESSAYS[idx + 1].id}`, label: nameOf(ESSAYS[idx + 1]) } : undefined;

  return <KpiDetail backHref="/match-analysis/essays" backLabel={backLabel} kicker={kicker} title={title} blocks={blocks} prev={prev} next={next} locale={locale} />;
}
