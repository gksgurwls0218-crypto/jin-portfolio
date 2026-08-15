import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { LAB, STATUS_BADGE } from "@/lib/kpiMetrics";
import { LAB_KO, LAB_TYPE_KO, STATUS_LABEL_KO } from "@/lib/kpiContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";

const HEAD: Record<Locale, { eyebrow: string; title: string; accent: string; intro: string; backLabel: string }> = {
  en: {
    eyebrow: "03 / Data & KPI Lab",
    title: "A Lab where new metrics",
    accent: "born",
    intro:
      "These are not certified KPIs. These are born to measure Variation Theory and sometimes off the beaten path. Revolutionary thoughts are sometimes originated from unusual creativity. Creativities are still on the way to establish a new thing. Newest first — the date on each card is when it was added, or when its write-up last changed.",
    backLabel: "Advanced Data & KPI Lab",
  },
  ko: {
    eyebrow: "03 / 데이터 & KPI 랩",
    title: "새로운 지표가 태어나는",
    accent: "실험실",
    intro:
      "이것들은 공인된 KPI가 아니라, 변이 이론을 측정하기 위해 때로는 정해진 길에서 벗어나 태어난 지표들이다. 남다른 창의성에서 나온 혁명적인 생각들이며, 아직 새로운 것을 정립해가는 길 위에 있다. 최신순으로 나열했고, 카드의 날짜는 추가된 날 또는 서술이 마지막으로 바뀐 날이다.",
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
