import type { MatchFrontmatter } from "@/lib/mdx";
import { MATCHES } from "@/lib/matchGallery";
import GoalsSummary from "@/components/match/GoalsSummary";
import type { Locale } from "@/lib/i18n";

const MH = {
  eyebrow: { en: "02 / Match Analysis", ko: "02 / 경기 분석" },
  possession: { en: "Possession", ko: "점유율" },
  fieldTilt: { en: "Field Tilt", ko: "필드 틸트" },
  proxyNote: {
    en: "xT (proxy): Opta·Sofascore·Fotmob·FIFA don’t publish match-level xT — it’s an internal analytics-tool metric, not a broadcast stat. This is a modeled index (0–100 share per team) built from this match’s own xG share and field-tilt share, not the official Karun Singh xT model — a directional read, not a real per-possession xT number.",
    ko: "xT (proxy): Opta·Sofascore·Fotmob·FIFA는 경기 단위 xT를 공개하지 않는다 — 방송 지표가 아니라 분석 툴 내부 지표다. 이 값은 이 경기 자체의 xG 점유율과 필드 틸트 점유율로 만든 모델링 지수(팀당 0–100 점유율)이며, 공식 Karun Singh xT 모델이 아니다 — 실제 점유 단위 xT가 아니라 방향성만 읽는 값이다.",
  },
} as const;

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span className="mono ml-1.5 px-1.5 py-0.5 rounded" style={{ fontSize: 10, color, border: `0.5px solid ${color}55` }}>
      {label}
    </span>
  );
}

// short label for the stat-card team rows — first word only, so "Bayern Munich" → "Bayern" etc.
function short(name: string) {
  return name.split(" ")[0];
}

// Two-team stat card: label up top, then one row per team with its own name and value —
// so it's never ambiguous which number belongs to which side.
function Stat({
  label,
  homeName,
  awayName,
  homeValue,
  awayValue,
  extra,
}: {
  label: string;
  homeName: string;
  awayName: string;
  homeValue: string;
  awayValue: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "var(--stage-3)", border: "0.5px solid var(--edge)", minWidth: 148 }}>
      <div className="mono mb-1.5" style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--ink-3)" }}>{label}{extra}</div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{short(homeName)}</span>
        <span className="mono" style={{ fontSize: 16, fontWeight: 500, color: "var(--green-bright)" }}>{homeValue}</span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{short(awayName)}</span>
        <span className="mono" style={{ fontSize: 16, fontWeight: 500, color: "var(--green-bright)" }}>{awayValue}</span>
      </div>
    </div>
  );
}

// Single-value stat (e.g. Field Tilt is one territorial share number, not a per-team pair) —
// still labelled with which team it's measured for.
function SoloStat({ label, teamName, value, extra }: { label: string; teamName: string; value: string; extra?: React.ReactNode }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "var(--stage-3)", border: "0.5px solid var(--edge)", minWidth: 118 }}>
      <div className="mono mb-1" style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--ink-3)" }}>{label}{extra}</div>
      <div className="mono" style={{ fontSize: 17, fontWeight: 500, color: "var(--green-bright)" }}>{value}</div>
      <div className="mono mt-0.5" style={{ fontSize: 11, color: "var(--ink-4)" }}>{short(teamName)}</div>
    </div>
  );
}

export default function MatchHeader({ frontmatter, locale = "en" }: { frontmatter: MatchFrontmatter; locale?: Locale }) {
  const { competition, date, venue, home, away, stats } = frontmatter;
  return (
    <div className="px-6 md:px-10 pt-28 pb-10" style={{ background: "var(--stage)", borderBottom: "0.5px solid var(--edge)" }}>
      <div className="max-w-[1000px] mx-auto">
        <p className="mono t-eyebrow kicker mb-6" style={{ color: "var(--green-mid)" }}>
          {MH.eyebrow[locale]} · {competition}
        </p>
        <div className="flex items-center gap-5 md:gap-7 flex-wrap mb-4">
          <span className="display" style={{ fontSize: "clamp(26px,4vw,44px)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{home.name}</span>
          <span className="display" style={{ fontSize: "clamp(30px,5vw,52px)", color: "var(--green-bright)", letterSpacing: "-0.03em" }}>{home.score}&nbsp;–&nbsp;{away.score}</span>
          <span className="display" style={{ fontSize: "clamp(26px,4vw,44px)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{away.name}</span>
        </div>
        <p className="mono mb-6" style={{ fontSize: 13, color: "var(--ink-3)" }}>
          {date} · {venue}
        </p>

        {(() => {
          const gm = MATCHES.find((m) => m.slug === frontmatter.slug);
          return gm && gm.goals.length > 0 ? (
            <div className="mb-7 pb-6 max-w-[560px]" style={{ borderBottom: "0.5px solid var(--edge)" }}>
              <GoalsSummary match={gm} />
            </div>
          ) : null;
        })()}

        <div className="flex gap-3 flex-wrap mb-5">
          <Stat label={MH.possession[locale]} homeName={home.name} awayName={away.name} homeValue={`${stats.possession[0]}%`} awayValue={`${stats.possession[1]}%`} />
          <Stat
            label="xG"
            homeName={home.name}
            awayName={away.name}
            homeValue={`${stats.xg.value[0]}`}
            awayValue={`${stats.xg.value[1]}`}
            extra={stats.xg.verify ? <Chip label="verify" color="#14181a" /> : null}
          />
          <SoloStat label={MH.fieldTilt[locale]} teamName={home.name} value={`${stats.fieldTilt.value}%`} extra={stats.fieldTilt.est ? <Chip label="est" color="#232321" /> : null} />
          <Stat
            label="PPDA"
            homeName={home.name}
            awayName={away.name}
            homeValue={`${stats.ppda.value[0]}`}
            awayValue={`${stats.ppda.value[1]}`}
            extra={stats.ppda.est ? <Chip label="est" color="#232321" /> : null}
          />
          {stats.xt ? (
            <Stat
              label="xT (proxy)"
              homeName={home.name}
              awayName={away.name}
              homeValue={`${stats.xt.value[0]}`}
              awayValue={`${stats.xt.value[1]}`}
              extra={stats.xt.est ? <Chip label="modeled" color="#232321" /> : null}
            />
          ) : null}
          {stats.vaep ? (
            <Stat
              label="VAEP"
              homeName={home.name}
              awayName={away.name}
              homeValue={`${stats.vaep.value[0]}`}
              awayValue={`${stats.vaep.value[1]}`}
              extra={stats.vaep.est ? <Chip label="est" color="#232321" /> : null}
            />
          ) : null}
          {stats.dlb ? (
            <Stat
              label="DLB"
              homeName={home.name}
              awayName={away.name}
              homeValue={`${stats.dlb.value[0]}`}
              awayValue={`${stats.dlb.value[1]}`}
              extra={stats.dlb.est ? <Chip label="est" color="#232321" /> : null}
            />
          ) : null}
        </div>

        {stats.xt ? (
          <p className="mono" style={{ fontSize: 11, lineHeight: 1.6, color: "var(--ink-4)", maxWidth: 560 }}>
            {MH.proxyNote[locale]}
          </p>
        ) : null}
      </div>
    </div>
  );
}
