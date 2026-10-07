"use client";
import Link from "@/components/LocaleLink";
import Crest from "@/components/Crest";
import Reveal from "@/components/Reveal";
import { MATCHES, type GalleryMatch, type Side } from "@/lib/matchGallery";
import { UI, type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

const GALLERY_COPY = {
  eyebrow: { en: "02 / Match Analysis & Scouting", ko: "02 / 경기 분석 및 스카웃팅" },
  title1: { en: "Theory applied to", ko: "이론을 경기에" },
  title2: { en: "matches analysed.", ko: "적용해 분석하다" },
  intro: {
    en: "Each analysis states what the framework predicted, then reports what actually happened. Newest first — single matches, team reports, whole-tournament parses and player scouting reports in one list.",
    ko: "각 분석은 프레임워크가 무엇을 예측했는지 밝힌 뒤, 실제로 무슨 일이 일어났는지 보고한다. 최신순이며 단일 경기·팀 리포트·대회 전수 분석, 그리고 선수 스카웃팅 리포트가 한 목록에 놓인다.",
  },
} as const;

// match.date is a display string like "28 Apr 2026" or "14 Oct 2025" — not lexicographically
// sortable (day comes first), so parse it into a real timestamp for ordering.
/* ─────────────────────────────────────────────────────────────────────────
   갤러리 정렬 = 사이트에 올린 날짜(publishedAt) 최신순.
   경기가 열린 날짜(date)가 아니다 — 2025년 경기를 오늘 분석해 올렸다면
   그 카드가 맨 위에 와야 최신 작업이 먼저 보인다.

   새 분석을 추가할 때:
   · MDX 경기 리포트  → lib/matchGallery.ts 의 해당 항목에 publishedAt 추가
   · 단독 HTML 리포트 → 아래 STANDALONE 배열에 한 줄 추가
   둘 다 여기서 하나의 목록으로 합쳐져 날짜순으로 정렬된다.
   ───────────────────────────────────────────────────────────────────────── */
type CardEntry =
  | { kind: "match"; key: string; publishedAt: string; match: GalleryMatch }
  | { kind: "tournament"; key: string; publishedAt: string }
  | { kind: "report"; key: string; publishedAt: string };

const STANDALONE: CardEntry[] = [
  { kind: "tournament", key: "wc2026-report", publishedAt: "2026-07-26" },
  { kind: "report", key: "korea-jordan", publishedAt: "2026-08-11" },
  { kind: "report", key: "suwon-cross-shot", publishedAt: "2026-08-15" },
  { kind: "report", key: "wc2022-2026-champions", publishedAt: "2026-08-19" },
  { kind: "report", key: "suwon-proposal-visuals", publishedAt: "2026-08-23" },
  { kind: "report", key: "suwon-revision", publishedAt: "2026-08-27" },
  { kind: "report", key: "fcseoul-attacking-phases", publishedAt: "2026-09-02" },
  { kind: "report", key: "fcseoul-league-response", publishedAt: "2026-09-04" },
  { kind: "report", key: "daejeon-r28", publishedAt: "2026-09-30" },
  { kind: "report", key: "scouting-han-chanhee", publishedAt: "2026-10-07" },
  { kind: "report", key: "scouting-rebic", publishedAt: "2026-10-07" },
];

const GALLERY_CARDS: CardEntry[] = [
  ...STANDALONE,
  ...MATCHES.map<CardEntry>((m) => ({
    kind: "match",
    key: m.slug,
    // publishedAt이 비어 있으면 목록 맨 뒤로 (빈 문자열이 가장 작게 정렬된다)
    publishedAt: m.publishedAt ?? "",
    match: m,
  })),
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

const MATCH_TAG = { en: "MATCH", ko: "경기 분석" } as const;

/* 득점자 한 줄 — 카드 시절의 두 단 배치 대신 목록 행에 맞춘 압축 표기.
   "Kvaratskhelia 24', 56' · Dembélé 45+5' (p)  —  Kane 17' (p) · Olise 41'" */
function scorerLine(match: GalleryMatch, side: Side) {
  const order: string[] = [];
  const map: Record<string, string[]> = {};
  match.goals.filter((g) => g.team === side).forEach((g) => {
    if (!map[g.scorer]) { map[g.scorer] = []; order.push(g.scorer); }
    map[g.scorer].push(`${g.minute}${g.plus ? `+${g.plus}` : ""}'${g.pen ? " (p)" : ""}`);
  });
  return order.map((n) => `${n} ${map[n].join(", ")}`).join(" · ");
}

function Row({ match }: { match: GalleryMatch }) {
  const locale = useLocale();
  const home = scorerLine(match, "home");
  const away = scorerLine(match, "away");
  const goalless = match.home.score === 0 && match.away.score === 0;
  const scorers = home || away
    ? [home, away].filter(Boolean).join("  —  ")
    : goalless ? (locale === "ko" ? "무득점 무승부" : "Goalless draw") : (locale === "ko" ? "득점자 미입력" : "Scorers to be added");

  return (
    <Link href={`/match-analysis/${match.slug}`} className="list-row">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
          <span className="mono px-1.5 rounded-full shrink-0" style={{ fontSize: 8.5, letterSpacing: ".12em", border: "0.5px solid var(--green-line)", color: "var(--green-bright)" }}>
            {MATCH_TAG[locale]}
          </span>
          {match.featured && (
            <span className="mono px-1.5 rounded-full shrink-0" style={{ fontSize: 8.5, letterSpacing: ".12em", background: "var(--green-soft)", border: "0.5px solid var(--green-line)", color: "var(--green-bright)" }}>
              {UI.common.featured[locale]}
            </span>
          )}
          <span className="mono truncate" style={{ fontSize: 10, letterSpacing: ".07em", color: "var(--ink-4)", maxWidth: "100%" }}>
            {match.competition}
          </span>
        </div>

        <h2 className="lr-title display flex flex-wrap items-center gap-x-2.5 gap-y-1" style={{ fontSize: "clamp(19px,2vw,24px)", lineHeight: 1.22, letterSpacing: "-0.03em" }}>
          <Crest name={match.home.name} size={22} />
          <span>{match.home.name}</span>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{match.home.score}&ndash;{match.away.score}</span>
          <span>{match.away.name}</span>
          <Crest name={match.away.name} size={22} />
        </h2>

        <p className="lr-clamp mt-2" style={{ fontSize: 13.5, lineHeight: 1.62, color: "var(--ink-3)", maxWidth: 620 }}>
          {scorers}
        </p>
      </div>

      <div className="hidden lg:flex flex-col gap-1.5 shrink-0 self-center" style={{ width: 186 }}>
        <span className="mono block" style={{ fontSize: 11, color: "var(--ink-2)" }}>{match.date}</span>
        <span className="mono block" style={{ fontSize: 9, lineHeight: 1.45, letterSpacing: ".08em", color: "var(--ink-4)" }}>{match.venue}</span>
      </div>

      <span className="lr-arrow mono shrink-0 self-center hidden sm:block" style={{ fontSize: 13 }} aria-hidden>
        &rarr;
      </span>
    </Link>
  );
}

/* Tournament-scale report — a whole competition rather than a single fixture, so it
   gets its own card shape instead of the home-vs-away scoreline used above. */
const TOURNAMENT_COPY = {
  tag: { en: "TACTICAL TRENDS REPORT", ko: "전술 트렌드 리포트" },
  competition: { en: "FIFA World Cup 2026 · all 104 matches", ko: "2026 FIFA 월드컵 · 104경기 전수" },
  title: { en: "The underdog does not lose.", ko: "약팀이 지는 게 아니다." },
  sub: {
    en: "The barren game model loses. Every official FIFA post-match report of the tournament, parsed in full — 208 team-matches — and read back against variation theory. Including the three measures of mine that failed.",
    ko: "무력한 게임 모델이 진다. 대회 FIFA 공식 경기 리포트 전수 파싱 — 208 팀-경기 — 을 변이 이론에 되비춰 읽었다. 실패한 내 지표 세 개까지 그대로.",
  },
  blurb: {
    en: "The barren game model loses, not the underdog. All 104 matches and 208 team-matches of official FIFA post-match data, read back against variation theory.",
    ko: "약팀이 지는 게 아니라 무력한 게임 모델이 진다. FIFA 공식 리포트 104경기·208 팀-경기 전수를 변이 이론에 되비춰 읽었다.",
  },
  stats: {
    en: [["0 / 15", "barren reactive, knockouts"], ["88.9%", "productive reactive"], ["86.2%", "xG picks the winner"], ["104", "matches parsed"]],
    ko: [["15전 0승", "무력한 반응형 (녹아웃)"], ["88.9%", "생산적 반응형 승률"], ["86.2%", "xG의 승자 적중률"], ["104", "전 경기 파싱"]],
  },
} as const;

function TournamentRow() {
  const locale = useLocale();
  return (
    <Link href="/match-analysis/wc2026-report" className="list-row">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
          <span className="mono px-1.5 rounded-full shrink-0" style={{ fontSize: 8.5, letterSpacing: ".12em", border: "0.5px solid var(--green-line)", color: "var(--green-bright)" }}>
            {TOURNAMENT_COPY.tag[locale]}
          </span>
          <span className="mono truncate" style={{ fontSize: 10, letterSpacing: ".07em", color: "var(--ink-4)", maxWidth: "100%" }}>
            {TOURNAMENT_COPY.competition[locale]}
          </span>
        </div>

        <h2 className="lr-title display" style={{ fontSize: "clamp(19px,2vw,24px)", lineHeight: 1.22, letterSpacing: "-0.03em" }}>
          {TOURNAMENT_COPY.title[locale]}
        </h2>

        <p className="lr-clamp mt-2" style={{ fontSize: 13.5, lineHeight: 1.62, color: "var(--ink-3)", maxWidth: 620 }}>
          {TOURNAMENT_COPY.blurb[locale]}
        </p>
      </div>

      <div className="hidden lg:flex flex-col gap-3 shrink-0 self-center" style={{ width: 186 }}>
        {TOURNAMENT_COPY.stats[locale].slice(0, 2).map(([big, label]) => (
          <div key={label}>
            <span className="display block" style={{ fontSize: 15, letterSpacing: "-0.02em", color: "var(--ink-2)" }}>{big}</span>
            <span className="mono block" style={{ fontSize: 8.5, lineHeight: 1.45, letterSpacing: ".1em", color: "var(--ink-4)" }}>{label}</span>
          </div>
        ))}
      </div>

      <span className="lr-arrow mono shrink-0 self-center hidden sm:block" style={{ fontSize: 13 }} aria-hidden>
        &rarr;
      </span>
    </Link>
  );
}

/* Standalone long-form reports — each authored as a self-contained HTML document
   and embedded at /match-analysis/[key], so they get a report-shaped card rather
   than the home-vs-away scoreline used above.
   새 단독 리포트를 추가할 때: 아래 REPORTS에 항목 하나 + 위 STANDALONE에 한 줄. */
type ReportStat = readonly [string, string];
type ReportCopy = {
  tag: Record<Locale, string>;
  competition: Record<Locale, string>;
  title: Record<Locale, string>;
  sub: Record<Locale, string>;
  /** 목록에서 보이는 두 줄 요약. sub는 상세용으로 남겨둔다. */
  blurb: Record<Locale, string>;
  stats: Record<Locale, readonly ReportStat[]>;
};

const REPORTS: Record<"korea-jordan" | "suwon-cross-shot" | "wc2022-2026-champions" | "suwon-proposal-visuals" | "suwon-revision" | "fcseoul-attacking-phases" | "fcseoul-league-response" | "daejeon-r28" | "scouting-han-chanhee" | "scouting-rebic", ReportCopy> = {
  "scouting-han-chanhee": {
    tag: { en: "SCOUTING REPORT", ko: "스카웃팅 리포트" },
    competition: { en: "Daejeon Hana Citizen · domestic distributing No. 6 · 116 players screened", ko: "대전하나시티즌 · 국내 배급형 6번 · 116명 검토" },
    title: { en: "Han Chan-hee — the No. 6 for the days without Kim Bong-soo", ko: "한찬희 — 김봉수가 빠진 날의 6번" },
    sub: {
      en: "A player report that grew out of my Round 28 analysis of Daejeon: distribution depends on Kim Bong-soo alone. 116 Korean midfielders in K League 2, K League 1 and abroad were measured on two indices defined exactly as for Kim (distribution and recovery). Only Han Chan-hee and Jeong Ho-yeon have no shortfall, and Han (0.94 · 1.00) is the closer to Kim. The risks — a June knee injury and a shortfall in distribution in his K League 1 seasons — are set out with the same weight.",
      ko: "대전 R28 경기분석의 문제 B — \"배급이 김봉수 한 명에게 걸려 있다\"에서 출발한 선수분석 보고서. K리그2 · K리그1 · 해외파 한국인 미드필더 116명을 김봉수와 같은 정의의 배급 · 회수 지수로 놓았다. 미달이 없는 선수는 한찬희와 정호연 둘, 김봉수에 더 가까운 쪽은 한찬희(0.94 · 1.00). 6월 무릎 부상과 K리그1 시절 배급 미달 같은 위험도 같은 무게로 적었다.",
    },
    blurb: {
      en: "116 Korean midfielders on the same two indices as Kim Bong-soo. Two came through without a shortfall; the closer to Kim is Han Chan-hee — risks included.",
      ko: "한국인 미드필더 116명을 김봉수와 같은 두 지수로. 미달 없는 두 명 중 김봉수에 더 가까운 6번은 한찬희 — 위험까지 함께.",
    },
    stats: {
      en: [["0.94 · 1.00", "distribution · recovery (Kim = 1.00)"], ["116", "players screened"]],
      ko: [["0.94 · 1.00", "배급 · 회수 지수 (김봉수 = 1.00)"], ["116", "같은 기준으로 검토한 선수"]],
    },
  },
  "scouting-rebic": {
    tag: { en: "SCOUTING REPORT", ko: "스카웃팅 리포트" },
    competition: { en: "Daejeon Hana Citizen · foreign multi-role left forward · 130 players screened", ko: "대전하나시티즌 · 외국인 왼쪽 다기능 공격수 · 130명 검토" },
    title: { en: "Ante Rebić — one more Seo Jin-su type", ko: "안테 레비치 — 서진수 유형 한 명 더" },
    sub: {
      en: "A player report that grew out of my Round 28 analysis of Daejeon: the ball was not kept on the left, and the answer was to come inside. 130 players were checked by name across five routes. Four had no shortfall on ball retention, box entries, structural fit and budget; Rebić meets the most (6.11 opponent-box touches per 90, LW · AM · ST) and, as a free agent on a documented €400k salary, can be signed now without a fee. Fifteen injuries since 2021 and two poor seasons are laid out just as plainly, with a 1+1 contract design.",
      ko: "대전 R28 경기분석의 문제 A — \"왼쪽에서 받은 볼을 지키지 못했고, 해법은 안으로 들어가는 것\"에서 출발한 선수분석 보고서. 다섯 경로에서 130명을 이름으로 확인했다. 볼 보존 · 박스 진입 · 구조 적합 · 예산에 미달이 없는 넷 가운데 충족이 가장 많은 선수가 레비치(상대 박스 터치 6.11/90, LW · AM · ST)다. 무소속, 직전 연봉 €400k — 이적료 없이 지금 데려올 수 있다. 2021년 이후 부상 15건과 두 시즌 부진도 1+1 계약 설계와 함께 적었다.",
    },
    blurb: {
      en: "130 players across five routes. Of the four with no shortfall, Rebić meets the most criteria and can be signed now without a fee — injuries and two poor seasons included.",
      ko: "다섯 경로 130명. 미달 없는 넷 중 충족이 가장 많고, 이적료 없이 지금 데려올 수 있는 선수 — 부상 이력과 두 시즌 부진까지 함께.",
    },
    stats: {
      en: [["6.11", "opponent-box touches / 90"], ["130", "players screened"]],
      ko: [["6.11", "상대 박스 터치 / 90"], ["130", "같은 기준으로 검토한 선수"]],
    },
  },
  "daejeon-r28": {
    tag: { en: "MATCH ANALYSIS", ko: "경기 분석" },
    competition: { en: "K League 1 2026 · R28 · Daejeon Hana Citizen 3–2 FC Anyang", ko: "K리그1 2026 · 28라운드 · 대전하나시티즌 3–2 FC안양" },
    title: { en: "Less of the Ball, More Arrivals", ko: "공을 덜 가지고, 더 많이 도착했다" },
    sub: {
      en: "71% possession and no goals before the break, 55% and three goals after it. Twenty-one observations from watching the match were checked one by one against 1,253 raw events; thirteen were adopted, four narrowed, four dropped. Anyang did not press the build-up (first-half PPDA 26.8), Daejeon moved the weight of their attack to the left (final-third entry success 50% to 79%), and Ludwigson drifted into the half-space with right-back Kang Ji-hoon following him — both open-play goals came beside him. After losing the ball Daejeon conceded 0.22 shots per ten losses, the lowest of their 27 matches. The match also points to two squad gaps: only one Seo Jin-su type to finish the left, and only one distributing No. 6 in Kim Bong-soo.",
      ko: "전반 71% 점유에 0골, 후반 55% 점유에 3골. 경기를 보며 적은 관찰 21개를 원시 이벤트 1,253건과 하나씩 맞춰 13개를 채택하고 4개는 범위를 좁히고 4개는 뺐다. 안양은 빌드업을 압박하지 않았고(전반 PPDA 26.8), 대전은 공격의 무게를 왼쪽으로 옮겼으며(파이널서드 진입 성공 50% → 79%), 하프스페이스로 들어간 루빅손을 오른쪽 풀백 강지훈이 따라 들어오자 그 옆에서 필드골 두 개가 나왔다. 볼을 잃은 뒤 10회당 피슈팅 0.22는 시즌 27경기 중 최저. 그리고 두 자리의 선수층 — 왼쪽 끝을 맡을 서진수 유형과 배급형 6번이 각각 한 명뿐이다.",
    },
    blurb: {
      en: "No goals with 71% of the ball, three with 55%. Twenty-one observations checked against the event data — and the comeback explained only with what both agree on.",
      ko: "71% 점유에 0골, 55% 점유에 3골. 경기를 보며 적은 관찰 21개를 이벤트 데이터로 거르고, 둘이 같은 방향을 가리킨 것만으로 역전승을 설명한다.",
    },
    stats: {
      en: [["71% → 55%", "possession, first half → second half"], ["50% → 79%", "left-side final-third entry success"], ["0.22", "shots conceded per 10 losses, season low"], ["13 + 4", "of 21 observations kept"]],
      ko: [["71% → 55%", "점유율, 전반 → 후반"], ["50% → 79%", "왼쪽 파이널서드 진입 성공률"], ["0.22", "상실 10회당 피슈팅, 시즌 최저"], ["13 + 4", "관찰 21개 중 채택"]],
    },
  },
  "fcseoul-league-response": {
    tag: { en: "OPPOSITION RESPONSE", ko: "상대 응수 분석" },
    competition: { en: "K League 1 2026 · FC Seoul · 25 matches, 11 opponents", ko: "K리그1 2026 · FC서울 25경기 · 상대 11개 팀" },
    title: { en: "How the league learned to play FC Seoul", ko: "리그가 서울을 학습한 25경기" },
    sub: {
      en: "This began as an attempt to sort Seoul's opponents into high, mid and low blocks, and it failed — across 17 rematches the within-team correlation of block height is negative. Ulsan set the second-highest block in the league in March and one of the lowest in August. What survives the failure is a direction: 8 of 11 teams dropped their block for the return fixture, the expected goal Seoul get from each ball played into the centre of the box fell 30% over the second half of the season, and their points per game went up anyway.",
      ko: "상대를 하이·미들·로우 블록으로 분류하려다 실패한 기록이다 — 재대결 17쌍의 팀 내 상관이 음수로 나왔다. 울산은 3월에 리그에서 두 번째로 높은 블록을 섰고 8월에 리그 최저에 가까운 블록을 섰다. 실패에서 남은 것은 방향이다. 11팀 중 8팀이 재대결에서 블록을 낮췄고, 서울이 골문 앞 중앙에 공을 한 번 보낼 때 얻는 기대득점은 시즌 후반에 30% 줄었고, 그런데도 경기당 승점은 오히려 올랐다.",
    },
    blurb: {
      en: "An attempt to sort Seoul's opponents into high, mid and low blocks that failed outright. What survives is a direction: 8 of 11 teams dropped their block, and Seoul's points went up anyway.",
      ko: "상대를 하이·미들·로우 블록으로 분류하려다 실패한 기록이다. 남은 것은 방향이다 — 11팀 중 8팀이 재대결에서 블록을 낮췄고, 서울의 승점은 오히려 올랐다.",
    },
    stats: {
      en: [["r = −0.280", "within-team, across rematches"], ["8 of 11", "teams dropped their block"], ["−30%", "xG per delivery, R14-25"], ["2.00 → 2.08", "points per game"]],
      ko: [["r = −0.280", "재대결 팀 내 상관"], ["11팀 중 8팀", "블록을 낮췄다"], ["−30%", "배달당 xG · R14~25"], ["2.00 → 2.08", "경기당 승점"]],
    },
  },
  "fcseoul-attacking-phases": {
    tag: { en: "ATTACKING PHASE", ko: "공격 국면 분석" },
    competition: { en: "K League 1 2026 · FC Seoul · 25 matches, 34,518 events", ko: "K리그1 2026 · FC서울 · 25경기 · 이벤트 34,518건" },
    title: { en: "Everyone gets the ball to the same place", ko: "골문 앞 중앙까지는 똑같이 간다" },
    sub: {
      en: "Seoul deliver into the central cell in front of goal 72% of the time; their opponents 69%. The xG each delivery produces is identical to three decimals. Yet ranking the 25 matches by that value puts ten straight wins at the top and six goals in ten matches at the bottom — and the side that delivered more scored less. I tested every attribute the event data holds and none of them separates the two groups. The piece ends where the data stops, with a way to measure what is missing.",
      ko: "서울이 골문 앞 중앙에 공을 넣는 비율은 72%, 상대 11개 팀은 69%다. 도착 한 번이 만드는 기대득점은 소수점 셋째 자리까지 같다. 그런데 그 값으로 25경기를 줄 세우면 상위 열 경기가 전승, 하위 열 경기가 열 경기에 여섯 골이고 — 배달을 더 많이 한 쪽이 골은 더 적었다. 이벤트 데이터의 모든 속성을 넣어봤지만 그 차이를 설명하는 것은 없었다. 데이터가 멈춘 지점에서 글을 닫고, 무엇을 더 재야 하는지를 적었다.",
    },
    blurb: {
      en: "Seoul and their opponents deliver into the same cell in front of goal at almost the same rate, for the same xG. Rank the 25 matches by it and the top ten are all wins.",
      ko: "서울과 상대는 골문 앞 중앙에 거의 같은 비율로, 같은 기대득점으로 공을 넣는다. 그 값으로 25경기를 줄 세우면 상위 열 경기가 전승이다.",
    },
    stats: {
      en: [["72% / 69%", "Seoul vs opponents into zone 17"], ["10-0-0", "top ten by xG per delivery"], ["4×", "outcome gap, attributes identical"], ["7", "of my own errors corrected"]],
      ko: [["72% / 69%", "서울 대 상대 · zone 17 도착률"], ["10승 0무 0패", "배달당 xG 상위 10경기"], ["4배", "속성은 같고 결과만 다름"], ["7건", "스스로 고친 내 오류"]],
    },
  },
  "suwon-revision": {
    tag: { en: "REVISION", ko: "정정 · 재검증 리포트" },
    competition: { en: "K League 2 2026 · Suwon Samsung · 279 shot coordinates, 23 pass matrices", ko: "K리그2 2026 · 수원 삼성 · 슛 좌표 279개 · 패스 매트릭스 23경기" },
    title: { en: "Cross → shot was half of it", ko: "｢크로스 → 슈팅｣은 절반이었다" },
    sub: {
      en: "A revision of my own report. I pulled 279 shot coordinates off the league’s chalk boards and re-read 23 pass matrices, and three of my conclusions did not survive it — the leak has two cut points rather than one, the route I named as the cause had already corrected itself over the season, and the 554 crosses I built the argument on included set pieces. Every Suwon figure comes from the K League Data Portal alone.",
      ko: "내 리포트를 내가 고친다. 경기 기록판에서 슛 좌표 279개를 직접 뽑고 패스 매트릭스 23경기를 다시 읽었더니, 지난 결론 세 개가 살아남지 못했다 — 결손 구간의 절단면은 하나가 아니라 둘이고, 원인으로 지목한 경로는 이미 스스로 고쳐지고 있었으며, 논거로 삼은 크로스 554회에는 세트피스가 섞여 있었다. 수원에 관한 모든 수치는 K리그 데이터포털 하나에서만 가져왔다.",
    },
    blurb: {
      en: "A revision of my own report. After 279 shot coordinates and 23 pass matrices, three of my earlier conclusions did not survive.",
      ko: "내 리포트를 내가 고친다. 슛 좌표 279개와 패스 매트릭스 23경기를 다시 읽었더니 지난 결론 세 개가 살아남지 못했다.",
    },
    stats: {
      en: [["279", "shot coordinates extracted"], ["2", "cut points, not one"], ["r = −0.78", "back-route share vs round"], ["3", "of my own conclusions corrected"]],
      ko: [["279개", "직접 추출한 슛 좌표"], ["2개", "절단면 — 하나가 아니다"], ["r = −0.78", "후방직결 비율 × 라운드"], ["3건", "내가 고친 내 결론"]],
    },
  },
  "suwon-proposal-visuals": {
    tag: { en: "VISUAL DESIGN BRIEF", ko: "시각자료 설계안" },
    competition: { en: "K League 2 2026 · Suwon Samsung · 21 matches", ko: "K리그2 2026 · 수원 삼성 · 21경기" },
    title: { en: "You do not need more crosses", ko: "크로스를 더 올릴 필요는 없다" },
    sub: {
      en: "The club that crosses more than anyone in K League 2 ranks 6th for goals. Twelve figures locate the leak in one phase and set out what to change in front of it — two tactical boards for the hook, a ribbon narrowing through four multiplying gates, league gaps drawn as circles on a real pitch. Each carries the sample it rests on.",
      ko: "리그에서 크로스를 가장 많이 올리는 팀이 득점 6위다. 그림 12종으로 결손 구간을 한 곳으로 좁히고, 그 앞의 무엇을 바꿔야 하는지까지 간다 — 훅을 여는 전술판 두 장, 네 관문을 곱하며 좁아지는 리본, 실제 경기장 위에 원으로 올린 리그 간 격차. 그림마다 근거가 된 표본을 함께 적었다.",
    },
    blurb: {
      en: "The club that crosses more than anyone in K League 2 ranks sixth for goals. Twelve figures narrow the leak to one phase and set out what to change in front of it.",
      ko: "리그에서 크로스를 가장 많이 올리는 팀이 득점 6위다. 그림 12종으로 결손 구간을 한 곳으로 좁히고, 그 앞의 무엇을 바꿔야 하는지까지 간다.",
    },
    stats: {
      en: [["12", "figures across eight acts"], ["49.1%", "cross → shot (Europe 71.6%)"], ["2.94×", "K1 ÷ K2, midfield centre"], ["13", "hypotheses logged as refuted"]],
      ko: [["12종", "8막에 들어가는 그림"], ["49.1%", "크로스 → 슈팅 (유럽 71.6%)"], ["2.94배", "K1 ÷ K2, 중원 중앙"], ["13건", "반증 기록에 올린 가설"]],
    },
  },
  "korea-jordan": {
    tag: { en: "MATCH REPORT", ko: "경기 분석 리포트" },
    competition: { en: "AFC Asian Cup Qatar 2023 · Korea Republic 2-2 Jordan", ko: "AFC 아시안컵 카타르 2023 · 대한민국 2-2 요르단" },
    title: { en: "Was it the penetration, or the pressing?", ko: "침투가 원인이었나, 압박이 원인이었나" },
    sub: {
      en: "Two claims tested in order. Penetration halved — and shots went up. What changed was not the runs in front but the pressing behind them. Every figure marked for what is measured and what is assumed.",
      ko: "두 개의 가설을 순서대로 검증했다. 침투는 반토막 났는데 슈팅은 늘었다. 바뀐 것은 앞선의 침투가 아니라 상대의 압박이었다. 확정된 수치와 가정을 그림마다 구분해 표시했다.",
    },
    blurb: {
      en: "Two claims tested in order. Penetration halved and shots went up — what changed was not the runs in front but the pressing behind them.",
      ko: "두 개의 가설을 순서대로 검증했다. 침투는 반토막 났는데 슈팅은 늘었다. 바뀐 것은 앞선의 침투가 아니라 상대의 압박이었다.",
    },
    stats: {
      en: [["164 → 81", "runs in behind"], ["14 → 22", "shots"], ["42 → 25", "CB circulation"], ["14 / 6 / 16", "A–B–A shots"]],
      ko: [["164 → 81", "뒷공간 침투"], ["14 → 22", "슈팅"], ["42 → 25", "센터백 순환"], ["14 / 6 / 16", "A–B–A 슈팅"]],
    },
  },
  "suwon-cross-shot": {
    tag: { en: "TEAM REPORT", ko: "팀 분석 리포트" },
    competition: { en: "K League 2 2026 · Suwon Samsung · 20 matches", ko: "K리그2 2026 · 수원 삼성 · 20경기" },
    title: { en: "From cross to shot", ko: "크로스에서 슈팅으로" },
    sub: {
      en: "League leaders with the best defence, yet the fewest goals of the top six. Set against 96 Big 5 clubs, the gap narrows to one phase — crosses that never become shots. The Cross Freedom model (Z×F×A) sets out what decides it, with the context T marked as still in development.",
      ko: "리그 1위이자 최소 실점 팀인데 상위 6팀 중 득점이 가장 적다. 유럽 5대리그 96팀과 대조하면 차이가 나는 구간은 하나로 좁혀진다 — 슈팅이 되지 못하는 크로스. 자유 크로스도(Z×F×A)로 무엇이 그것을 가르는지 정리하고, 맥락 T는 개발 중임을 명시했다.",
    },
    blurb: {
      en: "League leaders with the best defence and the fewest goals of the top six. Against 96 Big 5 clubs the gap narrows to one phase — crosses that never become shots.",
      ko: "리그 1위이자 최소 실점 팀인데 상위 6팀 중 득점이 가장 적다. 유럽 96팀과 대조하면 차이는 한 구간으로 좁혀진다 — 슈팅이 되지 못하는 크로스.",
    },
    stats: {
      en: [["49.1%", "cross → shot (Europe 71.6%)"], ["2.04", "crosses ÷ shots"], ["r = −0.68", "ratio vs goals, 96 clubs"], ["34.9%", "shots on target — hold"]],
      ko: [["49.1%", "크로스 → 슈팅 (유럽 71.6%)"], ["2.04", "크로스 ÷ 슈팅"], ["r = −0.68", "비율과 득점, 96팀"], ["34.9%", "유효슛 비율 — 유지"]],
    },
  },
  "wc2022-2026-champions": {
    tag: { en: "TOURNAMENT COMPARISON", ko: "대회 비교 리포트" },
    competition: { en: "Qatar 2022 × North America 2026 · 168 matches", ko: "카타르 2022 × 북중미 2026 · 168경기" },
    title: { en: "Losing moved from volume to allocation", ko: "패배의 원인은 총량에서 배분으로 옮겨갔다" },
    sub: {
      en: "FIFA changed the ruler between the two tournaments — so the raw numbers are dropped for tournament-relative z-scores. The team that ran more lost in 2022; the team that pressed more lost in 2026. Six robustness checks, and the one conclusion that failed them is corrected in the text.",
      ko: "두 대회 사이에 FIFA가 자를 바꿨다 — 그래서 원값을 버리고 대회 내 z-score로 비교했다. 2022에 진 팀은 많이 뛴 팀이고, 2026에 진 팀은 많이 압박한 팀이다. 검증 6종을 돌렸고, 통과하지 못한 결론 하나는 본문에서 그대로 수정했다.",
    },
    blurb: {
      en: "FIFA changed the ruler between the two tournaments, so the raw numbers go. The team that ran more lost in 2022; the team that pressed more lost in 2026.",
      ko: "두 대회 사이에 FIFA가 자를 바꿨다 — 원값을 버리고 대회 내 z-score로 비교했다. 2022에 진 팀은 많이 뛴 팀이고, 2026에 진 팀은 많이 압박한 팀이다.",
    },
    stats: {
      en: [["81.8%", "2022 knockouts — the team that ran less won"], ["11.5%", "2026 heaviest pressers, win rate"], ["4 / 4", "finalists whose ace walked most"], ["168", "matches parsed"]],
      ko: [["81.8%", "2022 녹아웃 · 덜 뛴 팀 승리"], ["11.5%", "2026 최다 압박 4분위 승률"], ["4 / 4", "결승 진출팀 에이스가 걷기 최상위"], ["168", "전 경기 파싱"]],
    },
  },
};

type ReportId = keyof typeof REPORTS;

function ReportRow({ id }: { id: ReportId }) {
  const locale = useLocale();
  const c = REPORTS[id];
  return (
    <Link href={`/match-analysis/${id}`} className="list-row">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
          <span className="mono px-1.5 rounded-full shrink-0" style={{ fontSize: 8.5, letterSpacing: ".12em", border: "0.5px solid var(--green-line)", color: "var(--green-bright)" }}>
            {c.tag[locale]}
          </span>
          <span className="mono truncate" style={{ fontSize: 10, letterSpacing: ".07em", color: "var(--ink-4)", maxWidth: "100%" }}>
            {c.competition[locale]}
          </span>
        </div>

        <h2 className="lr-title display" style={{ fontSize: "clamp(19px,2vw,24px)", lineHeight: 1.22, letterSpacing: "-0.03em" }}>
          {c.title[locale]}
        </h2>

        <p className="lr-clamp mt-2" style={{ fontSize: 13.5, lineHeight: 1.62, color: "var(--ink-3)", maxWidth: 620 }}>
          {c.blurb[locale]}
        </p>
      </div>

      <div className="hidden lg:flex flex-col gap-3 shrink-0 self-center" style={{ width: 186 }}>
        {c.stats[locale].slice(0, 2).map(([big, label]) => (
          <div key={label}>
            <span className="display block" style={{ fontSize: 15, letterSpacing: "-0.02em", color: "var(--ink-2)" }}>{big}</span>
            <span className="mono block" style={{ fontSize: 8.5, lineHeight: 1.45, letterSpacing: ".1em", color: "var(--ink-4)" }}>{label}</span>
          </div>
        ))}
      </div>

      <span className="lr-arrow mono shrink-0 self-center hidden sm:block" style={{ fontSize: 13 }} aria-hidden>
        &rarr;
      </span>
    </Link>
  );
}

export default function MatchGallery() {
  const locale = useLocale();
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage-2)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">{GALLERY_COPY.eyebrow[locale]}</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            {GALLERY_COPY.title1[locale]}<br />
            <span style={{ color: "var(--green-bright)" }}>{GALLERY_COPY.title2[locale]}</span>
          </h1>
          <p className="mb-14" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 640 }}>
            {GALLERY_COPY.intro[locale]}
          </p>
        </Reveal>

        <div className="flex flex-col" style={{ borderTop: "0.5px solid var(--green-line)" }}>
          {GALLERY_CARDS.map((c, i) => (
            <Reveal key={c.key} delay={i * 40}>
              {c.kind === "tournament" ? <TournamentRow />
                : c.kind === "report" ? <ReportRow id={c.key as ReportId} />
                : <Row match={c.match} />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
