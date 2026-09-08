import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { LAB, STATUS_BADGE } from "@/lib/kpiMetrics";
import { LAB_KO, LAB_TYPE_KO, STATUS_LABEL_KO } from "@/lib/kpiContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";

const HEAD: Record<Locale, { eyebrow: string; title: string; accent: string; intro: string; backLabel: string }> = {
  en: {
    eyebrow: "03 / Data & KPI Lab",
    title: "A lab where new metrics",
    accent: "and tools begin",
    intro:
      "These are not certified KPIs, and not finished products. Some are metrics born to measure Variation Theory; some are tools I want on the touchline, researched and written up before they are built. Revolutionary thoughts sometimes originate from unusual creativity, and creativity is still on its way to establishing a new thing. Each card says how far it has actually got. Newest first — the date is when it was added, or when its write-up last changed.",
    backLabel: "Advanced Data & KPI Lab",
  },
  ko: {
    eyebrow: "03 / 데이터 & KPI 랩",
    title: "새로운 지표와 도구가 태어나는",
    accent: "실험실",
    intro:
      "공인된 KPI도, 완성된 제품도 아니다. 변이 이론을 측정하려고 정해진 길에서 벗어나 태어난 지표가 있고, 현장에서 쓰고 싶어 만들기 전에 먼저 조사해 적어둔 도구가 있다. 남다른 창의성에서 나온 생각들이며 아직 정립해가는 길 위에 있다. 각 카드에 지금 어디까지 왔는지를 적었다. 최신순으로 나열했고, 날짜는 추가된 날 또는 서술이 마지막으로 바뀐 날이다.",
    backLabel: "Advanced Data & KPI 랩",
  },
};

/** The one Lab entry that outgrew a single card and has its own page.
 *  Its copy lives in lib/jwcContent.ts; only the index-card fields are here. */
const JWC = {
  href: "/kpi-lab/jwc",
  code: "JWC",
  type: "Combination" as const,
  status: "draft" as const,
  added: "2026-08-15",
  updated: "2026-08-15",
  basedOn: ["WAR", "xT", "VAEP", "PSxG"],
  // Card title, not the page headline — the grid reads as a list of metric
  // names, so this stays a name here and a question on the page itself.
  name: { en: "Win Contribution (JWC)", ko: "승리 기여도 (JWC)" },
  short: {
    en: "Baseball has WAR. Football does not. Building one that does not simply reward whoever scored.",
    ko: "야구에는 WAR가 있고 축구에는 없다. 득점한 사람만 보상하지 않는 승리 기여도를 만든다.",
  },
};

/** Tool/system entries that live as their own standalone pages, like JWC.
 *  They are not metrics, so they carry a Tool/System type and their own status. */
const TOOLS = [
  {
    href: "/kpi-lab/simulator",
    code: "SIM",
    type: "System",
    status: "concept" as const,
    added: "2026-09-08",
    updated: "2026-09-08",
    basedOn: ["Event data", "Split-half reliability", "LEM", "Plan adherence"],
    name: { en: "A tool that evaluates the plan (Simulator)", ko: "계획을 평가하는 도구 (시뮬레이터)" },
    short: {
      en: "Four measurements on 48 matches fixed the buildable scope: not predicting what a substitution will do, but scoring whether the declared plan was carried out.",
      ko: "48경기 측정 4종이 구현 범위를 확정했다. 교체의 결과를 예측하는 것이 아니라, 선언한 계획이 실행됐는지를 채점하는 것.",
    },
  },
  {
    href: "/kpi-lab/hovi",
    code: "HOVI",
    type: "System",
    status: "concept" as const,
    added: "2026-08-28",
    updated: "2026-08-28",
    basedOn: ["IFAB Law 4.4", "EPTS", "Semantic layer", "LLM routing"],
    name: { en: "The AI sitting next to the manager (HOVI)", ko: "감독 옆에 앉은 AI (HOVI)" },
    short: {
      en: "I wanted the Iron Man scene. The rules turned out to be already open — and most of the judgements I wanted to hand the AI were not the AI's to make.",
      ko: "아이언맨의 그 장면을 원했다. 규정은 이미 열려 있었고, 내가 AI에게 시키려던 판단은 대부분 AI가 할 일이 아니었다.",
    },
  },
  {
    href: "/kpi-lab/dualview",
    code: "Dual-View",
    type: "Tool",
    status: "draft" as const,
    added: "2026-08-27",
    updated: "2026-08-28",
    basedOn: ["Multi-anchor sync", "In-play detection", "STT", "Tactical tagging"],
    name: { en: "The manager speaks during the match (Dual-View)", ko: "감독은 경기 중에 말한다 (Dual-View)" },
    short: {
      en: "Hearing one line from the touchline and cutting the moment that just passed, from two angles. Six stages built, one verified — 8 ms sync error.",
      ko: "사이드라인에서 나온 한 마디를 듣고 방금 지나간 장면을 두 각도로 자른다. 6단계 구현, 1단계 검증 — 동기화 오차 8ms.",
    },
  },
];

function dateNote(locale: Locale, added: string, updated: string): string {
  if (locale === "ko") return updated === added ? `${added} 추가` : `${updated} 갱신`;
  return updated === added ? `Added ${added}` : `Updated ${updated}`;
}

export default async function LabIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = HEAD[locale];

  const jwcBadge = STATUS_BADGE[JWC.status];
  const rows: (IndexItem & { added: string; updated: string })[] = [
    {
      href: JWC.href,
      title: JWC.name[locale],
      sub: locale === "ko" ? `${JWC.code} · ${LAB_TYPE_KO[JWC.type] ?? JWC.type}` : `${JWC.code} · ${JWC.type}`,
      short: JWC.short[locale],
      badge: locale === "ko" ? { ...jwcBadge, label: STATUS_LABEL_KO[JWC.status] ?? jwcBadge.label } : jwcBadge,
      tags: JWC.basedOn,
      meta: dateNote(locale, JWC.added, JWC.updated),
      added: JWC.added,
      updated: JWC.updated,
    },
    ...TOOLS.map((t) => {
      const badge = STATUS_BADGE[t.status];
      return {
        href: t.href,
        title: t.name[locale],
        sub: locale === "ko" ? `${t.code} · ${LAB_TYPE_KO[t.type] ?? t.type}` : `${t.code} · ${t.type}`,
        short: t.short[locale],
        badge: locale === "ko" ? { ...badge, label: STATUS_LABEL_KO[t.status] ?? badge.label } : badge,
        tags: t.basedOn,
        meta: dateNote(locale, t.added, t.updated),
        added: t.added,
        updated: t.updated,
      };
    }),
    ...LAB.map((k) => {
      const badge = STATUS_BADGE[k.status];
      return {
        href: `/kpi-lab/lab/${k.id}`,
        title: locale === "ko" ? LAB_KO[k.id]?.name ?? k.name : k.name,
        sub: locale === "ko" ? `${k.code} · ${LAB_TYPE_KO[k.type] ?? k.type}` : `${k.code} · ${k.type}`,
        short: locale === "ko" ? LAB_KO[k.id]?.short ?? k.short : k.short,
        badge: locale === "ko" ? { ...badge, label: STATUS_LABEL_KO[k.status] ?? badge.label } : badge,
        tags: k.basedOn,
        meta: dateNote(locale, k.added, k.updated),
        added: k.added,
        updated: k.updated,
      };
    }),
  ];

  // Newest first. Ties fall back to the date added, then to the order in
  // kpiMetrics.ts — which is the order the ideas were written down.
  const items: IndexItem[] = rows
    .map((r, i) => ({ r, i }))
    .sort((a, b) =>
      b.r.updated.localeCompare(a.r.updated) ||
      b.r.added.localeCompare(a.r.added) ||
      a.i - b.i
    )
    .map(({ r }) => r);

  return <KpiIndex eyebrow={h.eyebrow} title={h.title} accent={h.accent} intro={h.intro} items={items} backHref="/kpi-lab" backLabel={h.backLabel} />;
}
