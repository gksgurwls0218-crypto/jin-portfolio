import type { MatchFrontmatter } from "@/lib/mdx";
import { MATCHES } from "@/lib/matchGallery";
import GoalsSummary from "@/components/match/GoalsSummary";
import Link from "@/components/LocaleLink";
import type { Locale } from "@/lib/i18n";

/* Match page header (2026-10-25 redesign, same system as /kpi-lab/advanced):
   back link, mono kicker, score as the title over a hairline rule, then the
   match numbers as paired bars — home on the left, away on the right — so the
   balance of the match reads at a glance. Values are exactly the frontmatter's;
   bars only scale them within each row. */

const MH = {
  back: { en: "Match analysis & scouting", ko: "경기 분석 및 스카웃팅" },
  eyebrow: { en: "Match analysis", ko: "경기 분석" },
  numbers: { en: "Match numbers", ko: "경기 수치" },
  possession: { en: "Possession", ko: "점유율" },
  fieldTilt: { en: "Field tilt", ko: "필드 틸트" },
  lowerBetter: { en: "lower = more aggressive press", ko: "낮을수록 강한 압박" },
  proxyNote: {
    en: "xT (proxy): Opta·Sofascore·Fotmob·FIFA don’t publish match-level xT — it’s an internal analytics-tool metric, not a broadcast stat. This is a modeled index (0–100 share per team) built from this match’s own xG share and field-tilt share, not the official Karun Singh xT model — a directional read, not a real per-possession xT number.",
    ko: "xT (proxy): Opta·Sofascore·Fotmob·FIFA는 경기 단위 xT를 공개하지 않는다 — 방송 지표가 아니라 분석 툴 내부 지표다. 이 값은 이 경기 자체의 xG 점유율과 필드 틸트 점유율로 만든 모델링 지수(팀당 0–100 점유율)이며, 공식 Karun Singh xT 모델이 아니다 — 실제 점유 단위 xT가 아니라 방향성만 읽는 값이다.",
  },
} as const;

type Row = { label: string; home: number; away: number; fmt: (v: number) => string; flag?: string; note?: string };

function Bars({ rows, homeName, awayName }: { rows: Row[]; homeName: string; awayName: string }) {
  return (
    <div className="mh-bars">
      <div className="mh-teams"><span>{homeName}</span><span>{awayName}</span></div>
      {rows.map((r) => {
        const tot = r.home + r.away || 1;
        const hw = (r.home / tot) * 100;
        return (
          <div key={r.label} className="mh-row">
            <div className="mh-lab">{r.label}{r.flag ? <em>{r.flag}</em> : null}{r.note ? <small>{r.note}</small> : null}</div>
            <div className="mh-v h">{r.fmt(r.home)}</div>
            <div className="mh-track"><i className="h" style={{ width: `${hw}%` }} /><i className="a" style={{ width: `${100 - hw}%` }} /></div>
            <div className="mh-v a">{r.fmt(r.away)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function MatchHeader({ frontmatter, locale = "en" }: { frontmatter: MatchFrontmatter; locale?: Locale }) {
  const { competition, date, venue, home, away, stats } = frontmatter;
  const gm = MATCHES.find((m) => m.slug === frontmatter.slug);
  const n2 = (v: number) => v.toFixed(2);
  const pct = (v: number) => `${v}%`;
  const int = (v: number) => String(v);
  const rows: Row[] = [
    { label: MH.possession[locale], home: stats.possession[0], away: stats.possession[1], fmt: pct },
    { label: "xG", home: stats.xg.value[0], away: stats.xg.value[1], fmt: n2, flag: stats.xg.verify ? "verify" : undefined },
    { label: MH.fieldTilt[locale], home: stats.fieldTilt.value, away: 100 - stats.fieldTilt.value, fmt: pct, flag: stats.fieldTilt.est ? "est" : undefined },
    { label: "PPDA", home: stats.ppda.value[0], away: stats.ppda.value[1], fmt: n2, flag: stats.ppda.est ? "est" : undefined, note: MH.lowerBetter[locale] },
  ];
  if (stats.xt) rows.push({ label: "xT (proxy)", home: stats.xt.value[0], away: stats.xt.value[1], fmt: int, flag: stats.xt.est ? "modeled" : undefined });
  if (stats.vaep) rows.push({ label: "VAEP", home: stats.vaep.value[0], away: stats.vaep.value[1], fmt: n2, flag: stats.vaep.est ? "est" : undefined });
  if (stats.dlb) rows.push({ label: "DLB", home: stats.dlb.value[0], away: stats.dlb.value[1], fmt: int, flag: stats.dlb.est ? "est" : undefined });

  return (
    <section className="adv-wrap mh-wrap">
      <div className="adv-in adv-narrow">
        <Link href="/match-analysis/matches" className="adv-back">← {MH.back[locale]}</Link>
        <div className="adv-kicker">{MH.eyebrow[locale]} · {competition}</div>
        <h1 className="adv-h1 adv-h1-detail mh-title">
          <span>{home.name}</span> <b>{home.score}–{away.score}</b> <span>{away.name}</span>
        </h1>
        <p className="mh-meta">{date} · {venue}</p>
        {gm && gm.goals.length > 0 ? <div className="mh-goals"><GoalsSummary match={gm} /></div> : null}

        <figure className="adv-fig mh-fig">
          <figcaption className="mh-cap">{MH.numbers[locale]}</figcaption>
          <Bars rows={rows} homeName={home.name} awayName={away.name} />
        </figure>
        {stats.xt ? <p className="mh-note">{MH.proxyNote[locale]}</p> : null}
      </div>
    </section>
  );
}
