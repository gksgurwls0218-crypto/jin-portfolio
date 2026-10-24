import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdvancedDetail, { chartTitle, ZOOM_LABELS, type AdvBlock } from "@/components/kpi/AdvancedDetail";
import LocaleLink from "@/components/LocaleLink";
import { STANDARD, findStandard } from "@/lib/kpiMetrics";
import { STANDARD_KO } from "@/lib/kpiContent.ko";
import { METRIC_GUIDE, GUIDE_LABELS } from "@/lib/kpiGuideContent";
import { KPI_CHARTS } from "@/lib/kpiCharts";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return STANDARD.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const m = findStandard(id);
  if (!m) return {};
  const ko = locale === "ko" ? STANDARD_KO[id] : undefined;
  return { title: `${ko?.name ?? m.name} (${m.abbr}) | KPI Lab`, description: ko?.measures ?? m.measures };
}

const LABELS: Record<Locale, { back: string; measures: string; question: string; framework: string; example: string; reportLink: string; guide: string }> = {
  en: { back: "Advanced Data & KPIs", measures: "What it measures", question: "The question it answers", framework: "In the Variation framework", example: "2026 World Cup example", reportLink: "Read the full report →", guide: "How to read any metric in context" },
  ko: { back: "Advanced Data & KPI", measures: "무엇을 측정하는가", question: "답하는 질문", framework: "변이 프레임워크 안에서", example: "2026 월드컵 예시", reportLink: "전체 리포트 보기 →", guide: "모든 지표를 맥락 안에서 읽는 법" },
};

const WC_CONFIDENCE_LABEL: Record<Locale, Record<"measured" | "approx", string>> = {
  en: { measured: "Measured", approx: "Approximate" },
  ko: { measured: "직접 측정", approx: "근사치" },
};

export default async function AdvancedDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const m = findStandard(id);
  if (!m) notFound();
  const ko = locale === "ko" ? STANDARD_KO[id] : undefined;
  const L = LABELS[locale];
  const G = METRIC_GUIDE[id]?.[locale];
  const GL = GUIDE_LABELS[locale];

  const idx = STANDARD.findIndex((s) => s.id === id);
  const nameOf = (i: number) => (locale === "ko" ? STANDARD_KO[STANDARD[i].id]?.name : undefined) ?? STANDARD[i].name;
  const prev = idx > 0 ? { href: `/kpi-lab/advanced/${STANDARD[idx - 1].id}`, label: nameOf(idx - 1) } : undefined;
  const next = idx < STANDARD.length - 1 ? { href: `/kpi-lab/advanced/${STANDARD[idx + 1].id}`, label: nameOf(idx + 1) } : undefined;

  const blocks: AdvBlock[] = [
    { label: L.measures, body: <p>{ko?.measures ?? m.measures}</p> },
    { label: L.question, body: <p>{ko?.question ?? m.question}</p> },
    { label: L.framework, body: <p>{ko?.detail ?? m.detail}</p> },
  ];

  if (G) {
    blocks.push(
      {
        label: GL.calc, isNew: true, body: <p>{G.calc}</p>,
        figures: G.visuals.filter(([k]) => KPI_CHARTS[k]).map(([k, cap]) => ({ svg: KPI_CHARTS[k][locale], caption: cap || chartTitle(KPI_CHARTS[k][locale]) })),
      },
      { label: GL.read, isNew: true, body: <p>{G.read}</p> },
      {
        label: GL.pair, isNew: true,
        body: (
          <dl className="adv-pair">
            {G.pair.map(([a, b]) => (
              <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
            ))}
          </dl>
        ),
      },
      {
        label: GL.traps, isNew: true,
        body: <ul className="adv-traps">{G.traps.map((t) => <li key={t}>{t}</li>)}</ul>,
      },
    );
  }

  if (m.wc2026) {
    blocks.push({
      label: L.example,
      body: (
        <>
          <span className={`adv-badge ${m.wc2026.confidence}`}>{WC_CONFIDENCE_LABEL[locale][m.wc2026.confidence]}</span>
          <p>
            {ko?.wc2026 ?? m.wc2026.text}{" "}
            <LocaleLink href="/match-analysis/wc2026-report" className="adv-inline">{L.reportLink}</LocaleLink>
          </p>
        </>
      ),
    });
  }

  return (
    <AdvancedDetail
      backHref="/kpi-lab/advanced" backLabel={L.back}
      kicker={`${String(idx + 1).padStart(2, "0")} · ${m.abbr}`} title={ko?.name ?? m.name}
      blocks={blocks} prev={prev} next={next}
      guideHref="/kpi-lab/advanced/how-to-read" guideLabel={L.guide}
      zoom={ZOOM_LABELS[locale]}
    />
  );
}
