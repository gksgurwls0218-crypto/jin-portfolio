import type { Metadata } from "next";
import type { ReactNode } from "react";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  Figure, BarList, Staircase, FormationRuns, BlockShapes, MiniTable, ConceptCards,
  TrapMatrix, BandLadder, QuadRun, WithinTeam, BlockOverlay, MatchCards,
  AxisExplain, PossXgScatterFull, TrajectoriesFull, TrapPanel, ConnectionStrip, ConnectionLadder,
} from "@/components/wc2026/Charts";
import {
  META as D, PREDICTORS, PRESS_EFFICIENCY, STEP_INS, SHOT_SPREAD, DEF_RANGE, BLOCK_SHAPE,
  FORMATION_RUNS, SPAIN, TOP4_VS_REST,
  QUADRANTS, REACTIVE_BANDS, POSSESSION_BANDS, KO_BARREN,
  REPERTOIRE, ARGENTINA_RUN, SPAIN_RUN, PARAGUAY_RUN, EXTRA_TIME, DEBUTANTS, DEBUT_TOTAL, MARGINS,
  ENGLAND_MATCHES, BLOCK_GEOMETRY_BY_RESULT, BLOCK_OVERLAY,
  WITHIN_TEAM_FULL, WITHIN_EXCLUDED, WITHIN_STATS, SCATTER_FULL, TRAJECTORIES_FULL,
  PRODUCTIVE_REACTIVE_FULL, BARREN_POSSESSION_FULL, PROD_REACTIVE_RECORD, BARREN_POSS_RECORD,
  E10_QUARTILE, E10_PRED, E5_PRED, FINAL_NET_STRIP, FINAL_NET_LADDER, FINAL_NET_TOTALS,
} from "@/lib/wc2026";

const METADATA: Record<Locale, Metadata> = {
  en: {
    title: "World Cup 2026 — Tactical Trends Report | Jin",
    description: "All 104 official FIFA post-match reports, parsed in full. What loses is not the reactive model — it is the barren one.",
  },
  ko: {
    title: "2026 월드컵 전술 트렌드 리포트 | Jin",
    description: "FIFA 공식 경기 리포트 104경기 전수 파싱. 지는 것은 반응형 모델이 아니라 무력한 모델이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return METADATA[isLocale(locale) ? locale : "en"];
}

/* ── prose helpers ───────────────────────────────────────────────── */
function P({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: 16.5, lineHeight: 1.78, color: "var(--ink-2)", marginBottom: 16 }}>{children}</p>;
}
function S({ children }: { children: ReactNode }) {
  return <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{children}</strong>;
}
function Section({ n, title, sub, children }: { n: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section className="mt-16 first:mt-0 scroll-mt-20">
      <span className="mono block mb-2.5" style={{ fontSize: 11.5, letterSpacing: ".18em", color: "var(--green-bright)" }}>{n}</span>
      <h2 className="display mb-2" style={{ fontSize: "clamp(23px,3vw,32px)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--ink)" }}>{title}</h2>
      {sub && <p className="mb-6" style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-3)", maxWidth: 720 }}>{sub}</p>}
      <div className="max-w-[760px]">{children}</div>
    </section>
  );
}
function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-7 rounded-2xl p-5 md:p-6" style={{ background: "var(--green)", color: "var(--signal-ink)" }}>
      <div style={{ fontSize: 16, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
function Caveat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-6 rounded-xl p-5" style={{ background: "var(--stage-2)", borderLeft: "2px solid var(--green-line)" }}>
      <span className="mono block mb-1.5" style={{ fontSize: 10, letterSpacing: ".16em", color: "var(--green-bright)" }}>{label}</span>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)" }}>{children}</div>
    </div>
  );
}

const STAGES_8 = ["G1", "G2", "G3", "R32", "R16", "QF", "SF", "F"];
const runs = FORMATION_RUNS.filter((r) => r[1].length >= 5)
  .sort((a, b) => b[1].length - a[1].length || new Set(b[1]).size - new Set(a[1]).size)
  .slice(0, 12);

const QUAD_KO = {
  ko: {
    "productive-possession": "생산적 점유", "productive-reactive": "생산적 반응형",
    other: "중간", "barren-possession": "무력한 점유", "barren-reactive": "무력한 반응형",
  },
  en: {
    "productive-possession": "productive possession", "productive-reactive": "productive reactive",
    other: "middle", "barren-possession": "barren possession", "barren-reactive": "barren reactive",
  },
} as const;

export default async function WC2026ReportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const ko = locale === "ko";
  const qn: Record<string, string> = QUAD_KO[locale];

  const trapCells = QUADRANTS.map((q) => ({
    key: q[0], label: qn[q[0]], n: q[1], w: q[2], d: q[3], l: q[4], win: q[5], xg: q[6], xga: q[7],
    trap: q[0].startsWith("barren"),
  })).filter((c) => c.key !== "other");

  const predictorRows = PREDICTORS.map((p) => {
    const kolabels: Record<string, string> = {
      "xG": "xG (기대 득점)", "Shots on target": "유효 슈팅", "Possession": "점유율", "Shots": "슈팅",
      "Defensive line breaks": "수비 라인 브레이크", "Completed line breaks": "성공 라인 브레이크",
      "Receptions in final third": "파이널 서드 수신", "Forced turnovers": "강제 턴오버", "Distance covered": "활동거리",
    };
    return [ko ? kolabels[p[0]] ?? p[0] : p[0], p[1], p[2], p[3]] as [string, number, number, number];
  });
  const hi = ko ? ["xG (기대 득점)", "점유율"] : ["xG", "Possession"];

  const concepts = ko
    ? [
        { name: "변수 (Variable)", score: "🟢 강한 지지", verdict: "선택지를 늘리는 행동이 실제로 위협으로 환산됐다.",
          quant: "정량 — 스텝인 최상위 4분위 승률 46.2% · xG 1.71 vs 최하위 29.4% · 1.00. 슈팅 분산도 최상위 50.0% · 1.95 vs 최하위 31.5% · 0.78.",
          qual: "정성 — 아르헨티나가 메시 주변에 만든 미드필더 로테이션 → 와이드 오버로드 → 스위치 → 전방 침투 4단 구조(FIFA TSG)." },
        { name: "팀 변수 · Lure and Shock", score: "🟢 정성 확인 / 🟡 정량 미검증", verdict: "설계된 유인의 존재는 확인됐지만, 경기 총계 데이터로는 타이밍을 볼 수 없다.",
          quant: "정량 — 한계. 유인은 시퀀스 내부의 시간 구조인데 총계 지표에는 시간축이 없다. 이벤트 로그가 필요하다.",
          qual: "정성 — 멕시코는 “첫 패스를 의도적으로 허용”하는 트리거로 트랩을 설계했다(TSG, 아론 빈터). 일본은 좌측으로 끌어들이고 우측으로 다시 끌어들인 뒤 그 두 번째 스위칭 도중 열린 중앙에서 득점했다." },
        { name: "개인 변수 (Individual)", score: "🟢 강한 지지", verdict: "개인의 반복된 위협이 팀 단위 구조 변경을 강제했다.",
          quant: "정량 — 4강 4팀은 경기당 테이크온 19.8회 vs 나머지 17.9회, 스텝인 10.2 vs 7.3.",
          qual: "정성 — 이토 히로키의 반복 전진이 스웨덴의 1-5-2-3→1-5-3-2 하프타임 전환을 끌어냈다. 벨링엄의 ‘자석 효과’(TSG)." },
        { name: "변이 (Mutation)", score: "🟢 지지 — 이번 대회의 핵심", verdict: "경기 중 모델을 바꿀 수 있는 팀이 더 멀리 갔다. 이 리포트에서 가장 직접적인 지지.",
          quant: "정량 — 모델 3종을 쓴 13개 팀의 평균 도달 라운드 2.31 · 경기당 승점 1.78 vs 2종 19개 팀 1.68 · 1.41. 아르헨티나는 8경기 4형태 5회 변경으로 결승.",
          qual: "정성 — 멕시코는 비보유 1-4-4-2 다이아몬드 ↔ 보유 1-4-2-3-1을 매 국면 전환마다(TSG). 이 코퍼스에서 가장 즉각적인 변이." },
        { name: "멀티성 (Multi-positional)", score: "🟢 정성 확인 / 🔴 프록시 실패", verdict: "현상은 뚜렷했지만 내가 설계한 측정 방법이 틀렸다.",
          quant: "정량 — 실패. ‘수비수의 볼 프로그레션 지분’을 멀티성 지표로 썼더니 정반대로 나왔다(최상위 4분위 승률 23.1%). 역할 유동성이 아니라 ‘전진이 막혀 센터백이 공을 돌리는 상태’를 측정하고 있었다.",
          qual: "정성 — 골킥을 골키퍼가 직접 처리한 비율이 2022년 91%에서 2026년 52%로 급락(TSG)." },
        { name: "수비 2페이즈", score: "🟢 강한 지지", verdict: "압박은 양이 아니라 구조였다.",
          quant: "정량 — 턴오버당 압박 4분위 승률 60.4 → 45.1 → 38.5 → 9.6%. 가장 효율적인 집단이 가장 적게 압박했다.",
          qual: "정성 — 조별리그를 관통한 첫 트렌드가 카운터프레싱이었고 그 발판이 “3+2 Rest-Defence”였다(TSG). 내 3-2 표기와 사실상 동일하다." },
      ]
    : [
        { name: "Variable", score: "🟢 well supported", verdict: "Actions that multiply the defender's options converted into real threat.",
          quant: "Quant — top quartile for step-ins won 46.2% at 1.71 xG against 29.4% at 1.00 for the bottom. Shot-load spread: 50.0% and 1.95 xG at the top, 31.5% and 0.78 at the bottom.",
          qual: "Qual — Argentina's four-step frame around Messi: midfield rotation → wide overload → switch → forward penetration (FIFA TSG)." },
        { name: "Team variable · Lure and Shock", score: "🟢 qualitative / 🟡 untested", verdict: "Designed lures clearly existed. Aggregate data simply cannot see their timing.",
          quant: "Quant — a limit, not a result. A lure is a time structure inside a sequence; match totals have no time axis.",
          qual: "Qual — Mexico built the trap on deliberately conceding the first pass (TSG, Aron Winter). Japan pulled Sweden left, switched right, and scored through the centre that opened during the second switch." },
        { name: "Individual variable", score: "🟢 well supported", verdict: "Repeated individual threat forced structural change from the opponent.",
          quant: "Quant — the four semi-finalists averaged 19.8 take-ons and 10.2 step-ins per match against 17.9 and 7.3 for the rest of the field.",
          qual: "Qual — Itō Hiroki's repeated advances forced Sweden's half-time switch from 1-5-2-3 to 1-5-3-2. Bellingham's 'magnet effect' (TSG)." },
        { name: "Mutation", score: "🟢 supported — the central finding", verdict: "Sides able to change model mid-tournament went further. The most direct support in this report.",
          quant: "Quant — the 13 teams that used three distinct models averaged round 2.31 and 1.78 points per game, against 1.68 and 1.41 for the 19 that used two. Argentina reached the final having started in four shapes.",
          qual: "Qual — Mexico alternated 1-4-4-2 diamond out of possession and 1-4-2-3-1 in possession on every transition (TSG)." },
        { name: "Multi-positionality", score: "🟢 qualitative / 🔴 proxy failed", verdict: "The phenomenon was obvious. My way of measuring it was wrong.",
          quant: "Quant — failed. I used defenders' share of ball progressions as the proxy and it ran backwards (top quartile won 23.1%). It was measuring blocked progression, not role fluidity.",
          qual: "Qual — goal kicks taken directly by the keeper fell from 91% in 2022 to 52% in 2026 (TSG)." },
        { name: "Two-phase defence", score: "🟢 well supported", verdict: "Pressing was structure, not volume.",
          quant: "Quant — win rate by pressures-per-turnover quartile: 60.4 → 45.1 → 38.5 → 9.6%. The most efficient group pressed the least.",
          qual: "Qual — counter-pressing was the defining group-stage trend and its platform was the '3+2 rest-defence' (TSG) — effectively my own 3-2 notation." },
      ];

  const failures = ko
    ? [
        ["수비수의 볼 프로그레션 지분 → 멀티성", "최상위 4분위 승률 23.1% (최하위 53.8%)", "역할 유동성이 아니라 ‘전진이 막힌 상태’를 측정했다. 밀리는 팀일수록 센터백이 공을 돌린다."],
        ["오퍼 유형 분산 → 변수(선택지)", "최상위 4분위 승률 30.8% (최하위 35.2%)", "지배하는 팀은 오퍼가 특정 유형에 집중된다. 고른 분산은 다양성이 아니라 무목적성에 가까웠다."],
        ["패스량 엔트로피 → 네트워크 분산도", "승자 적중률 38.0% — 오히려 역방향", "패스 ‘양’의 분산은 내가 지정한 매개 중심성(betweenness) 분산도가 아니다. 지배하는 팀일수록 후방 노드에 패스가 쌓인다."],
      ]
    : [
        ["Defenders' share of ball progressions → multi-positionality", "top quartile won 23.1% (bottom 53.8%)", "It measured blocked progression, not role fluidity. The more a side is pushed back, the more its centre-backs recycle."],
        ["Offer-type spread → variable (options)", "top quartile won 30.8% (bottom 35.2%)", "Dominant sides concentrate their off-ball offers. An even spread read closer to aimlessness than to variety."],
        ["Pass-volume entropy → network dispersion", "picked the winner 38.0% of the time — it ran backwards", "Spread of pass volume is not the betweenness dispersion I specified. Dominant teams pile passes onto deep nodes."],
      ];

  const conclusions = ko
    ? [
        ["지는 것은 반응형이 아니라 무력한 반응형이다", "로우블록 30% 이상으로 내려앉은 62 팀-경기를 xG로 쪼개면 승률이 4.8 → 12.0 → 14.3 → 88.9%로 갈라진다. 깊이 내려앉으면서 xG 1.5 이상을 만든 9경기는 8승 1무 무패로, 이 대회 어떤 집단보다 성적이 좋았다. 반대로 무력한 반응형은 녹아웃에서 15전 0승. 문제는 블록의 높이가 아니라 그 블록이 위협을 만드느냐다."],
        ["무력한 점유도 똑같이 진다", "공을 과반 쥐고 xG 1.0 미만이었던 16 팀-경기의 승률은 31.2%에 그쳤고, 더 좁혀 xG 0.8 미만으로 자른 12 팀-경기는 1승 2무 9패였다. 함정은 대칭이다 — 공을 안 쥐고 위협이 없거나, 공을 쥐고 위협이 없거나. 두 경우 모두 조기 탈락으로 간다."],
        ["앞으로의 모델은 ‘조절할 수 있는 팀’이다", "경기 중 모델을 세 가지 이상 오간 13개 팀의 평균 도달 라운드는 2.31, 두 가지에 머문 19개 팀은 1.68이었다. 잉글랜드는 같은 4-2-3-1로 조별리그에선 생산적 점유, 멕시코전에선 점유 31.5%의 생산적 반응형을 썼다. 상대에 따라 경로를 고르는 능력이 결승 진출팀의 공통점이었다."],
        ["압박은 노력이 아니라 구조다", "가장 많이 압박한 4분위가 가장 적게 이겼다(9.6%). 턴오버 하나를 얻는 데 쓴 압박 횟수가 이 데이터셋에서 가장 가파른 승률 기울기를 만든다."],
        ["블록의 모양은 승패를 설명하지 못한다", "깊은 블록 62 팀-경기를 승패로 갈라 블록 크기를 재면 라인 높이·팀 길이·팀 폭 모두 1.3m 이내로 같다. 같은 경기에서 생성 xG는 1.54 대 0.57. 우승팀 스페인과 대회 최저 xG 팀 파라과이의 로우블록이 거의 같은 크기였다는 사실이 이 논지를 미터 단위로 확인해 준다."],
        ["단, 길어진 경기가 반응형을 깨뜨리지는 않았다", "연장까지 간 녹아웃 9경기에서 더 깊이 내려앉은 팀의 진출률은 33.3%로, 정규시간 종료 경기의 39.1%보다 오히려 낮았다. 다만 연장 경기는 애초에 교착된 경기라 선택 편향이 강하다 — 이 데이터로는 ‘시간이 반응형을 깬다’를 검증할 수 없다는 것이 정확한 결론이다."],
      ]
    : [
        ["What loses is not the reactive model — it is the barren one", "Split the 62 team-matches that sat in a 30%+ low block by the xG they created and the win rate separates 4.8 → 12.0 → 14.3 → 88.9%. The nine that combined a deep block with 1.5+ xG went 8-1-0 — a better record than any other group in the tournament. Barren reactive, meanwhile, won none of its 15 knockout matches. The problem was never the height of the block; it was whether the block produced threat."],
        ["Barren possession loses just as surely", "The sixteen team-matches with a majority of the ball and under 1.0 xG won just 31.2%; tighten the cut to 0.8 xG and the twelve that remain went 1W-2D-9L. The trap is symmetrical: no ball and no threat, or the ball and no threat. Both routes lead to an early exit."],
        ["The model to build is the switchable one", "The 13 sides that moved between three or more in-match models averaged round 2.31; the 19 that stayed inside two averaged 1.68. England used the same 4-2-3-1 all tournament, playing productive possession in the group and then a 31.5%-possession productive reactive game against Mexico. Choosing the route by opponent was the common trait of the sides that went deepest."],
        ["Pressing is structure, not effort", "The quartile that pressed hardest won least (9.6%). Pressures spent per turnover won produces the steepest win-rate gradient in the entire dataset."],
        ["The shape of the block explains nothing", "Split the 62 deep-block team-matches by result and measure the block: line height, team length and team width all land within 1.3 metres of each other. xG created in those same matches was 1.54 against 0.57. Spain, the champions, and Paraguay, the lowest-xG side of the tournament, sat in almost identical low blocks — the argument restated in metres."],
        ["But the longer match did not break the deep block", "In the nine knockout ties that went to extra time, the deeper-sitting side advanced 33.3% of the time — slightly worse than the 39.1% in ties settled inside 90 minutes. Extra-time matches are deadlocked matches by definition, so the selection bias is severe. The honest conclusion is that this dataset cannot test the claim that added time breaks reactive sides."],
      ];

  return (
    <div style={{ background: "var(--stage)" }}>
      {/* ── hero ── */}
      <header className="px-6 md:px-10 pt-16 pb-10" style={{ background: "var(--green)", color: "var(--signal-ink)" }}>
        <div className="max-w-[1000px] mx-auto">
          <span className="mono block mb-5" style={{ fontSize: 11.5, letterSpacing: ".2em", color: "var(--signal-ink-3)" }}>
            {ko ? "전술 트렌드 리포트" : "Tactical trends report"} · FIFA WORLD CUP 2026
          </span>
          <h1 className="display" style={{ fontSize: "clamp(30px,5.2vw,58px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
            {ko ? "약팀이 지는 게 아니다." : "The underdog does not lose."}
            <br />
            <span style={{ color: "var(--signal-ink-3)" }}>
              {ko ? "무력한 게임 모델이 진다." : "The barren game model loses."}
            </span>
          </h1>
          <p className="mt-7 max-w-[720px]" style={{ fontSize: 16.5, lineHeight: 1.72, color: "var(--signal-ink-2)" }}>
            {ko
              ? "2026 월드컵 FIFA 공식 경기 리포트 104경기를 전수 파싱했다 — 208 팀-경기, 3,289 선수-경기. 내가 들고 들어간 가설은 “능동적으로 상황을 조절하는 팀이 이긴다”였다. 데이터는 지지했고, 결정적인 곳 한 군데를 고쳐 줬다. 지는 것은 내려앉는 팀이 아니라 위협을 만들지 못하는 팀이다 — 그리고 그건 공을 쥔 팀에도 똑같이 적용된다."
              : "All 104 official FIFA Post-Match Summary Reports of the 2026 World Cup, parsed in full — 208 team-matches, 3,289 player-matches. The hypothesis I brought in was that the side which actively controls the game wins. The data supports it, and corrects it in one decisive place: what loses is not the side that sits deep but the side that creates nothing — and that applies just as much to the side holding the ball."}
          </p>
          <div className="grid gap-4 mt-11 md:grid-cols-4">
            {(ko
              ? [
                  ["15전 0승", "무력한 반응형 (녹아웃)", "깊은 블록 + 위협 없음. 녹아웃 15경기에서 단 1승도 없었다."],
                  ["88.9%", "생산적 반응형 승률", "같은 깊은 블록인데 xG 1.5 이상. 9경기 8승 1무 — 대회 최고 성적 집단."],
                  ["2.31 vs 1.68", "모델 3종 vs 2종", "경기 중 모델을 더 많이 오간 팀이 더 멀리 갔다 (평균 도달 라운드)."],
                  ["86.2 vs 76.2%", "xG vs 점유율", "승자를 맞히는 적중률. 능동성의 실체는 점유가 아니라 기회의 질이다."],
                ]
              : [
                  ["0 wins in 15", "barren reactive, knockouts", "Deep block, no threat. Not one win in fifteen knockout matches."],
                  ["88.9%", "productive reactive win rate", "The same deep block, but 1.5+ xG. Nine matches, 8W-1D — the best record of any group."],
                  ["2.31 vs 1.68", "three models vs two", "Sides that moved between more in-match models went further (mean round reached)."],
                  ["86.2 vs 76.2%", "xG vs possession", "How often each picks the winner. Proactivity is chance quality, not the ball."],
                ]
            ).map(([big, label, note]) => (
              <div key={label} className="pt-4" style={{ borderTop: "0.5px solid var(--signal-edge)" }}>
                <span className="display block" style={{ fontSize: "clamp(20px,2.4vw,27px)", letterSpacing: "-0.03em" }}>{big}</span>
                <span className="mono block mt-1.5" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--signal-ink-3)" }}>{label}</span>
                <span className="block mt-2" style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--signal-ink-2)" }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="px-6 md:px-10 py-14">
        <div className="max-w-[1000px] mx-auto">
          {/* ── 01 method ── */}
          <Section n={ko ? "01 / 방법" : "01 / Method"} title={ko ? "이 데이터가 무엇이고, 무엇을 말해 줄 수 없는가" : "What the data is, and what it can't tell you"}>
            <P>
              {ko ? (
                <>
                  모든 숫자는 FIFA가 각 경기 후 배포하는 공식 Post-Match Summary Report에서 직접 뽑았다. 104개 PDF를 처음부터 끝까지
                  파싱했다 — 핵심 지표 블록(xG, 라인 브레이크, 파이널 서드 수신, 강제 턴오버, 압박, 활동거리), 국면 비중,
                  보유·비보유 상태의 라인 높이·팀 길이·팀 폭 다이어그램, 양 팀 선발 포메이션, 선수별 배급·오퍼 움직임 표까지.
                  마지막 층만 3,289개 선수-경기 행이다. <S>추정값이나 2차 제공업체 수치는 하나도 없다.</S>
                </>
              ) : (
                <>
                  Every number comes from FIFA&apos;s own Post-Match Summary Report for that fixture. I parsed all 104 PDFs end to end —
                  the key-statistics block (xG, line breaks, receptions in the final third, forced turnovers, pressures, distance), the
                  phases-of-play shares, the in-possession and defensive line-height, team-length and team-width diagrams, both starting
                  formations, and the per-player distribution and offer-movement tables. That last layer alone is 3,289 player-match rows.{" "}
                  <S>Nothing here is estimated or taken from a secondary provider.</S>
                </>
              )}
            </P>
            <P>
              {ko
                ? "분류는 명성이 아니라 경기 중 행동으로 한다. 깊은 블록 = 로우블록 비중 30% 이상. 볼 지배 = 점유 50% 이상. 그리고 이 두 축을 xG 1.0으로 자른다. 이 단순한 2×2가 이 리포트의 뼈대다."
                : "Classification comes from in-match behaviour, not reputation. Deep block = a low-block share of 30% or more. Ball-heavy = 50%+ possession. Both are then cut at 1.0 xG created. That simple 2×2 is the spine of this report."}
            </P>
            <Caveat label={ko ? "상관관계는 인과관계가 아니다" : "Correlation is not causation"}>
              <p style={{ marginBottom: 10 }}>
                {ko
                  ? "로우블록 비중은 원인이자 동시에 증상이다. 약한 팀은 밀리기 때문에 내려앉고, 약하기 때문에 진다. 이 리포트가 “무력한 반응형이 진다”고 말할 때, 그것이 “내려앉았기 때문에 졌다”는 뜻은 아니다. 인과에 가장 가까운 근거는 네덜란드·벨기에처럼 스스로 수동을 택한 강팀의 사례이고, 그것도 몇 경기에 불과하다."
                  : "Low-block share is both a cause and a symptom. Weaker sides sit deep because they are being pushed back, and lose because they are weaker. When this report says barren reactive loses, it does not mean sitting deep caused the defeat. The closest thing to causal evidence is strong sides — the Netherlands, Belgium — choosing passivity themselves, and that is only a handful of matches."}
              </p>
              <p>
                {ko
                  ? "한 가지 더: FIFA의 국면 비중은 합이 100%가 되지 않는다. 국면이 서로 중첩되기 때문이다. 그래서 팀 간 동일 조건 비교에만 쓰고 시간 배분표로는 쓰지 않았다. 연장 여부도 PMSR에 직접 표기되지 않아 활동거리(팀 평균 132km 이상)로 추정했다."
                  : "One more: FIFA's phase shares do not sum to 100 because the phases overlap, so I use them only for like-for-like comparison between teams, never as a time budget. Extra time is not flagged in the PMSR either, so I infer it from distance covered (132 km+ per team)."}
              </p>
            </Caveat>
          </Section>

          {/* ── 02 the two traps ── */}
          <Section
            n={ko ? "02 / 핵심 수정" : "02 / The correction that matters"}
            title={ko ? "함정은 반응형이 아니라 ‘무력함’이다" : "The trap is not being reactive. It is being barren."}
            sub={ko
              ? "내 원래 가설은 “약팀의 게임 모델(극단적 로우블록 + 선수비 후역습)이 진다”였다. 104경기는 이 문장에서 한 단어를 바꾸라고 말한다."
              : "My original hypothesis was that the underdog's game model — extreme low block, defend-then-counter — is what loses. The 104 matches ask me to change one word in that sentence."}
          >
            <P>
              {ko
                ? "깊이 내려앉은 62 팀-경기를, 그들이 만들어낸 xG로 다시 쪼갰다. 결과는 하나의 집단이 아니라 완전히 다른 두 집단이었다."
                : "I split the 62 team-matches that sat in a deep block by the xG they created. What came back was not one group but two completely different ones."}
            </P>
          </Section>

          <Figure
            n={ko ? "그림 1" : "Figure 1"}
            title={ko ? "깊은 블록 안에서 xG가 만든 균열" : "The fracture inside the deep block"}
            note={ko
              ? "로우블록 비중 30% 이상인 62 팀-경기를 생성 xG로 4개 구간으로 나눴다. 같은 ‘반응형’ 안에서 승률이 4.8%부터 88.9%까지 벌어진다."
              : "The 62 team-matches with a 30%+ low-block share, split into four bands by xG created. Inside the same “reactive” label, the win rate runs from 4.8% to 88.9%."}
          >
            <BandLadder
              rows={REACTIVE_BANDS}
              bandLabel="xG"
              winLabel={ko ? "승률" : "win"}
              ppgLabel={ko ? "경기당 승점" : "pts/g"}
            />
            <div className="mt-6 pt-5" style={{ borderTop: "0.5px solid var(--edge-2)" }}>
              <span className="mono block mb-3" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--green-bright)" }}>
                {ko ? "대칭 확인 — 점유 50% 이상인 79 팀-경기" : "THE SYMMETRIC CUT — 79 team-matches with 50%+ possession"}
              </span>
              <BandLadder
                rows={POSSESSION_BANDS}
                bandLabel="xG"
                winLabel={ko ? "승률" : "win"}
                ppgLabel={ko ? "경기당 승점" : "pts/g"}
              />
            </div>
          </Figure>

          <div className="max-w-[760px]">
            <P>
              {ko
                ? "두 사다리가 같은 방향을 가리킨다. 깊은 블록이든 볼 지배든, 결과를 결정한 것은 자세가 아니라 그 자세에서 위협이 나왔는가다. 그리고 최상단을 비교하면 순서가 뒤집힌다 — 생산적 반응형 88.9%가 생산적 점유 75.5%보다 높다. 깊게 내려앉으면서도 위협을 만드는 것은 이 대회에서 가장 강력한 프로필이었다."
                : "Both ladders point the same way. Deep block or ball dominance, what decided the result was not the posture but whether threat came out of it. And at the top the order flips: productive reactive at 88.9% beats productive possession at 75.5%. Sitting deep while still creating was the single strongest profile of the tournament."}
            </P>
          </div>

          <Figure
            n={ko ? "그림 2" : "Figure 2"}
            title={ko ? "두 함정 — 무력한 반응형과 무력한 점유" : "The two traps — barren reactive and barren possession"}
            note={ko
              ? "가로축은 xG 1.0 기준, 세로축은 자세(깊은 블록 / 볼 지배). 짙은 칸이 함정이다. 두 축 어느 쪽에 서 있든, 위협이 없으면 성적은 무너진다."
              : "Horizontal: 1.0 xG. Vertical: posture — deep block or ball-heavy. The dark cells are the traps. Whichever side of the axis you stand on, without threat the record collapses."}
          >
            <TrapMatrix
              cells={trapCells}
              axes={ko
                ? { x: "생성 xG →", y: "자세", xLow: "1.0 미만 (무력)", xHigh: "1.0 이상 (생산적)", yLow: "깊은 블록", yHigh: "볼 지배" }
                : { x: "xG created →", y: "posture", xLow: "under 1.0 (barren)", xHigh: "1.0+ (productive)", yLow: "deep block", yHigh: "ball-heavy" }}
            />
          </Figure>

          <div className="max-w-[760px]">
            <Callout>
              {ko
                ? `무력한 반응형은 녹아웃 15경기에서 ${KO_BARREN[1]}승 ${KO_BARREN[2]}무 ${KO_BARREN[3]}패다. 단 한 번도 이기지 못했다. 반면 같은 깊이의 블록에서 xG 1.5 이상을 만든 9경기는 8승 1무 무패다. 내려앉은 것이 문제였던 적은 없다.`
                : `In the knockout stage the barren reactive model went ${KO_BARREN[1]}W ${KO_BARREN[2]}D ${KO_BARREN[3]}L across fifteen matches. Not a single win. The nine matches that combined the same depth of block with 1.5+ xG went eight wins and a draw. Sitting deep was never the problem.`}
            </Callout>
          </div>

          <Figure
            n={ko ? "그림 3" : "Figure 3"}
            title={ko ? "두 함정의 실제 명단" : "Who was actually in each trap"}
            note={ko
              ? "왼쪽은 깊은 블록에서 진짜 위협을 만든 9경기, 오른쪽은 공만 쥐고 위협이 없었던 16경기. 왼쪽에 아르헨티나가 세 번, 잉글랜드가 두 번 있다. 두 표 위 큰 숫자가 그 그룹 전체의 승률이다."
              : "Left: nine matches that produced real threat from a deep block. Right: sixteen that held the ball and produced nothing. Argentina appear three times on the left, England twice. The large number above each table is that group's overall win rate."}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TrapPanel
                label={ko ? "생산적 반응형 — 로우블록 30%+ & xG 1.5+" : "PRODUCTIVE REACTIVE — 30%+ low block & 1.5+ xG"}
                winPct={Math.round((PROD_REACTIVE_RECORD[0] / PROD_REACTIVE_RECORD.reduce((a, b) => a + b, 0)) * 1000) / 10}
                record={PROD_REACTIVE_RECORD}
                head={ko ? ["팀", "상대", "R", "점유", "블록", "xG", "결과"] : ["Team", "v", "R", "Poss", "Blk", "xG", "Res"]}
                rows={PRODUCTIVE_REACTIVE_FULL.map((r) => [`${r[0]} ${r[1]}`, `${r[2]} ${r[3]}`, r[4], `${r[5]}%`, `${r[6]}%`, r[7], `${r[8]} ${r[9]}`])}
                highlightCol={5}
                note={ko
                  ? "점유율은 낮아도(평균 45%대) 승률은 88.9%다. 내려앉는 것 자체는 문제가 아니었다는 뜻이다."
                  : "Possession averages barely 45% here, yet the win rate is 88.9% — sitting deep was never the problem."}
              />
              <TrapPanel
                label={ko ? "무력한 점유 — 점유 50%+ & xG 1.0 미만" : "BARREN POSSESSION — 50%+ possession & under 1.0 xG"}
                winPct={Math.round((BARREN_POSS_RECORD[0] / BARREN_POSS_RECORD.reduce((a, b) => a + b, 0)) * 1000) / 10}
                record={BARREN_POSS_RECORD}
                head={ko ? ["팀", "상대", "R", "점유", "xG", "결과"] : ["Team", "v", "R", "Poss", "xG", "Res"]}
                rows={BARREN_POSSESSION_FULL.map((r) => [`${r[0]} ${r[1]}`, `${r[2]} ${r[3]}`, r[4], `${r[5]}%`, r[6], `${r[7]} ${r[8]}`])}
                highlightCol={4}
                note={ko
                  ? "점유율은 훨씬 높은데(평균 55%대) 승률은 31.2%에 그친다. 공을 쥐고 있다는 사실 자체는 아무것도 보장하지 않는다."
                  : "Possession averages over 55% here, yet the win rate is only 31.2%. Holding the ball guarantees nothing on its own."}
              />
            </div>
          </Figure>

          <Figure
            n={ko ? "그림 4" : "Figure 4"}
            title={ko ? "같은 팀이 두 얼굴을 보일 때 — 팀 강도를 상수로 묶은 비교" : "The same team, both ways — holding quality constant"}
            note={ko
              ? `월드컵 전체 48개 참가국 기준. 4경기 이상 치르고 생산적 경기와 무력한 경기를 모두 가진 ${WITHIN_STATS[0]}개 팀, ${WITHIN_STATS[1]} 팀-경기. 같은 팀 안에서만 비교하므로 “약팀이라 졌다”는 설명이 성립하지 않는다. 오른쪽 숫자는 무력/생산적 경기 수.`
              : `All 48 World Cup entrants. The ${WITHIN_STATS[0]} teams that played 4+ matches and produced both kinds — ${WITHIN_STATS[1]} team-matches. Comparing a side only against itself means "they were the weaker team" cannot explain the gap. The right-hand figures are barren/productive match counts.`}
          >
            <AxisExplain
              items={ko
                ? [
                    { label: "이 그림이 보여주는 것", body: "한 팀을 자기 자신과만 비교한다. 상대 팀 강도, 재능 차이는 아예 등장하지 않는다." },
                    { label: "가로축", body: "경기당 승점 (승=3, 무=1, 패=0의 평균). 왼쪽 회색 점 = 그 팀이 xG 1.0 미만이었던 경기들의 평균. 오른쪽 초록 점 = xG 1.0 이상이었던 경기들의 평균." },
                    { label: "막대(선)", body: "회색 점에서 초록 점까지 이어지는 선의 길이가 그 팀의 '무력함의 대가'다. 길수록 위협을 못 만들 때 승점을 더 크게 잃는 팀." },
                    { label: "오른쪽 숫자", body: "무력한 경기 수 / 생산적 경기 수. 표본이 작은 팀(예: 3~4경기)은 우연의 영향을 더 크게 받는다는 뜻이니 참고만 할 것." },
                  ]
                : [
                    { label: "What this shows", body: "Each team compared only against itself. Opponent quality and talent gaps never enter the picture." },
                    { label: "Horizontal axis", body: "Points per game (W=3, D=1, L=0, averaged). The grey dot is the mean across that team's own matches under 1.0 xG; the green dot is the mean across its matches at 1.0 xG or above." },
                    { label: "The connecting line", body: "Its length is the 'cost of being barren' for that team — the longer it is, the more points that side loses specifically when it fails to create." },
                    { label: "Right-hand numbers", body: "Barren matches / productive matches. Teams with a small sample (3–4 matches) are more exposed to noise — read them as indicative, not definitive." },
                  ]}
            />
            <WithinTeam
              rows={WITHIN_TEAM_FULL}
              ko={ko}
              labels={ko
                ? { barren: "그 팀의 무력한 경기 (xG <1.0)", productive: "그 팀의 생산적 경기 (xG ≥1.0)", axis: "경기당 승점" }
                : { barren: "that team's barren matches (xG <1.0)", productive: "that team's productive matches (xG ≥1.0)", axis: "points per game" }}
            />
          </Figure>

          <div className="max-w-[760px]">
            <P>
              {ko
                ? `팀 내 경기당 승점차는 평균 +${WITHIN_STATS[2]}다. ${WITHIN_STATS[0]}팀 중 ${WITHIN_STATS[3]}팀이 자기 자신의 생산적 경기에서 더 많은 승점을 얻었고, ${WITHIN_STATS[4]}팀이 동일, ${WITHIN_STATS[5]}팀이 반대였다. 반대로 간 다섯 팀(모로코·멕시코·크로아티아·코트디부아르 등)도 그대로 그렸다 — 이 지표가 만능이 아니라는 뜻이고, 그래서 감출 이유도 없다.`
                : `The mean within-team gap is +${WITHIN_STATS[2]} points per game. ${WITHIN_STATS[3]} of ${WITHIN_STATS[0]} sides took more points in their own productive matches, ${WITHIN_STATS[4]} were level, ${WITHIN_STATS[5]} went the other way. The five that inverted — Morocco, Mexico, Croatia, Côte d'Ivoire and others — are drawn in as well. The measure is not infallible, which is precisely why there is no reason to hide them.`}
            </P>
            <Caveat label={ko ? "비교가 불가능했던 12개 팀" : "The 12 sides that cannot be compared"}>
              <p style={{ marginBottom: 10 }}>
                {ko
                  ? "이 팀들은 한쪽 유형의 경기만 치렀다. 비교 자체가 성립하지 않는다는 사실도 하나의 결과다 — 특히 양 극단의 두 팀이 그렇다."
                  : "These sides played only one type of match. The absence of a comparison is itself a result — especially the two extremes below."}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {WITHIN_EXCLUDED.map((r) => {
                  const [eng, koName, n, w, dd, l, nProd] = r;
                  const extreme = eng === "Spain" || eng === "Paraguay";
                  return (
                    <div
                      key={eng}
                      className="rounded-lg px-3 py-2 flex items-center justify-between"
                      style={{
                        background: extreme ? "var(--green)" : "var(--stage-3)",
                        color: extreme ? "var(--signal-ink)" : "var(--ink)",
                        border: extreme ? "none" : "0.5px solid var(--edge-2)",
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{ko ? koName : eng}</span>
                      <span className="mono" style={{ fontSize: 11, opacity: 0.85 }}>
                        {w}W {dd}D {l}L · {nProd > 0 ? (ko ? "전부 생산적" : "all productive") : (ko ? "전부 무력" : "all barren")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Caveat>
          </div>

          <Figure
            n={ko ? "그림 5" : "Figure 5"}
            title={ko ? "그래서 승자를 맞히는 것은 점유율이 아니다" : "Which is why possession does not pick the winner"}
            note={ko
              ? "104경기 중 승부가 난 80경기. 각 경기마다 “이 지표에서 앞선 팀이 이겼는가”를 물었다. 지표 동률 경기는 제외해 분모가 다르다."
              : "80 of 104 matches were decided. For each, did the team leading this metric go on to win? Ties on the metric are excluded, so denominators differ."}
          >
            <BarList rows={predictorRows} highlight={hi} max={100} />
          </Figure>

          <Figure
            n={ko ? "그림 6" : "Figure 6"}
            title={ko ? "경계선은 수직이 아니라 수평이다" : "The dividing line is horizontal, not vertical"}
            note={ko
              ? "208 팀-경기 전부. 승자는 좌우 어디에 있든 위쪽에 있다. 점유 31.5%로 이긴 잉글랜드도, 68.9%로 못 이긴 포르투갈도 여기 있다. 점 위에 마우스를 올리면 상세 카드가 뜬다."
              : "All 208 team-matches. Winners sit high regardless of where they sit left to right. England winning on 31.5% of the ball and Portugal failing to win on 68.9% are both on this chart. Hover any point for a detail card."}
          >
            <AxisExplain
              items={ko
                ? [
                    { label: "동그라미 하나", body: "팀 하나의 경기 하나 (208개 전부). 같은 경기의 두 팀이 각각 한 점씩 — 늘 쌍으로 존재한다." },
                    { label: "가로축 = 점유율 %", body: "왼쪽일수록 공을 적게 가짐, 오른쪽일수록 많이 가짐. 세로 점선은 50% 지점." },
                    { label: "세로축 = 생성 xG", body: "그 경기에서 만들어낸 기대 득점. 가로 점선은 1.0 xG — 이 리포트가 '위협의 유무'로 쓰는 기준선." },
                    { label: "색", body: "초록 = 승, 회색(진함) = 무, 회색(연함) = 패. 경계선이 좌우(점유율)가 아니라 위아래(xG)로 그어진다는 것이 이 그림의 핵심." },
                  ]
                : [
                    { label: "One circle", body: "One team's one match — all 208. Both sides of the same fixture each get a point; they always come in pairs." },
                    { label: "Horizontal = possession %", body: "Left means less of the ball, right means more. The vertical dashed line marks 50%." },
                    { label: "Vertical = xG created", body: "Expected goals generated in that match. The horizontal dashed line marks 1.0 xG — the threshold this report uses for “threat”." },
                    { label: "Colour", body: "Green = won, dark grey = drew, light grey = lost. The dividing line runs top-to-bottom on xG, not left-to-right on possession — that is the whole point of this chart." },
                  ]}
            />
            <PossXgScatterFull
              data={SCATTER_FULL}
              labels={ko
                ? { x: "점유율 %", y: "생성 xG", won: "승", drew: "무", lost: "패", hint: "점 위에 올려보세요", poss: "점유", xg: "xG", block: "로우블록" }
                : { x: "Possession %", y: "xG created", won: "Won", drew: "Drew", lost: "Lost", hint: "hover a point", poss: "poss", xg: "xG", block: "low blk" }}
            />
          </Figure>

          {/* ── 03 the switchable team ── */}
          <Section
            n={ko ? "03 / 미래 모델" : "03 / The model to build"}
            title={ko ? "닥공도 침대축구도 아닌, 조절할 수 있는 팀" : "Neither all-out attack nor time-wasting — the switchable team"}
            sub={ko
              ? "두 함정을 모두 피하는 방법은 하나다. 상대에 따라 경로를 고를 수 있어야 한다. 이것이 내가 말하는 변이(mutation)의 실전 형태이고, 이번 대회에서 가장 직접적으로 확인된 개념이다."
              : "There is one way to avoid both traps: be able to choose the route by opponent. That is what mutation looks like in practice, and it is the concept this tournament supported most directly."}
          >
            <P>
              {ko
                ? "내가 말하는 조절은 능동과 수동 중 하나를 고르는 게 아니다. 상황에 따라 공격과 수비를 선택적으로 오갈 수 있는 능력이다. 그러려면 게임 모델 하나로는 부족하다 — 상대는 대회가 진행되며 내 팀에 적응하고, 그 적응에 선제로 대응하려면 처음부터 여러 개의 게임 모델을 준비해 두어야 한다. 그리고 그 복수성은 양방향이어야 한다. 수비의 방법도 하나가 아니라 여럿이어야 하고, 공격의 방식도 하나가 아니라 여럿이어야 다양한 상대를, 그리고 같은 상대의 달라지는 대응을 계속 상대할 수 있다."
                : "What I mean by being switchable is not choosing between active and passive. It is being able to move selectively between attacking and defending as the situation demands. One game model is not enough for that — opponents adapt to your team as the tournament goes on, and pre-empting that adaptation means arriving with several models already prepared. That plurality has to run in both directions: not one defensive method but several, and not one attacking method but several, because that is what it takes to face a range of opponents, and the same opponent's shifting response to you."}
            </P>
            <P>
              {ko
                ? "각 팀의 경기를 능동형·균형형·반응형으로 자동 분류한 뒤, 한 대회 안에서 몇 가지 모델을 사용했는지 셌다. 4경기 이상 치른 32개 팀 기준이다."
                : "I classified every match as proactive, balanced or reactive from its own metrics, then counted how many distinct models each side used across the tournament. Thirty-two teams played four or more matches."}
            </P>
            <div className="my-6">
              <MiniTable
                head={ko ? ["사용한 모델 수", "팀", "평균 도달 라운드", "경기당 승점"] : ["Distinct models used", "Teams", "Mean round reached", "Points per game"]}
                rows={REPERTOIRE.map((r) => [ko ? `${r[0]}종` : `${r[0]}`, r[1], r[2], r[3]])}
                highlightCol={2}
              />
              <p className="mt-3" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
                {ko
                  ? "도달 라운드는 0 = 조별 탈락, 1 = 32강, 2 = 16강, 3 = 8강, 4 = 4강, 5 = 결승."
                  : "Round is coded 0 = group exit, 1 = R32, 2 = R16, 3 = QF, 4 = semi-final, 5 = final."}
              </p>
            </div>
            <P>
              {ko
                ? "차이는 크지 않지만 방향은 일관된다. 더 흥미로운 것은 개별 팀의 경로다. 잉글랜드는 여덟 경기 내내 4-2-3-1 하나를 썼는데, 그 안에서 완전히 다른 세 가지 경기를 했다."
                : "The gap is modest but the direction is consistent. What is more interesting is the shape of individual runs. England used one formation — 4-2-3-1 — in all eight matches, and played three completely different games inside it."}
            </P>
          </Section>

          <Figure
            n={ko ? "그림 7" : "Figure 7"}
            title={ko ? "8강 진출 8팀의 대회 궤적" : "The eight quarter-finalists, match by match"}
            note={ko
              ? "각 팀의 경기를 순서대로 잇고, 라운드를 점 안에 표시했다. 테두리가 굵은 점이 그 팀이 우승 경쟁에서 탈락한 경기. 배지는 최종 순위. 스페인은 한 구석에 뭉쳐 있고, 아르헨티나·잉글랜드는 평면을 가로지른다."
              : "Each side's matches joined in order, with the round marked inside the point. The point with a bold outline is the match that ended the side's run at the title. The badge is final placement. Spain stay in one corner; Argentina and England cross the plane."}
          >
            <TrajectoriesFull
              rows={TRAJECTORIES_FULL}
              ko={ko}
              labels={ko
                ? {
                    barren: "무력·반응", productive: "생산·점유", won: "승", drew: "무", lost: "패",
                    x: "가로 = 점유율 %", y: "세로 = 생성 xG", matches: "경기 순서대로 — 상대 · 스코어",
                    q1: "생산적 점유 — 공도 쥐고 위협도 만든다.",
                    q2: "생산적 반응형 — 내려앉아도 위협을 만든다. 대회 최고 승률(88.9%) 구간이 바로 여기.",
                    q3: "무력한 점유 — 공은 쥐지만 위협이 없다. 승률 31.2%.",
                    q4: "무력한 반응형 — 내려앉고 위협도 없다. 녹아웃 15전 전패.",
                  }
                : {
                    barren: "barren", productive: "productive", won: "won", drew: "drew", lost: "lost",
                    x: "horizontal = possession %", y: "vertical = xG created", matches: "in order — opponent · score",
                    q1: "Productive possession — the ball and the threat.",
                    q2: "Productive reactive — threat without the ball. The best win rate in the tournament (88.9%) lives here.",
                    q3: "Barren possession — the ball, no threat. 31.2% win rate.",
                    q4: "Barren reactive — neither. Winless in 15 knockout matches.",
                  }}
            />
          </Figure>

          <div className="max-w-[760px]">
            <P>
              {ko
                ? "스페인의 여덟 점은 오른쪽 위 한 덩어리다. 프랑스도 비슷하게 좁다. 반면 아르헨티나는 왼쪽 아래(생산적 반응형)에서 출발해 오른쪽 위로 이동했다가 결승에서 왼쪽 아래로 떨어지고, 잉글랜드는 오른쪽 위에 있다가 멕시코전에 왼쪽으로 급이동한 뒤 다시 돌아온다. 8강에서 탈락한 네 팀(모로코·벨기에·노르웨이·스위스)은 마지막 점이 전부 1.0 xG 선 아래에 찍힌다."
                : "Spain's eight points sit in one cluster, upper right; France are similarly tight. Argentina start lower left in productive reactive, move up and right, then fall back to the lower left in the final. England sit upper right, jump hard to the left against Mexico, and come back. The four sides eliminated in the quarter-finals — Morocco, Belgium, Norway, Switzerland — all have their final point below the 1.0 xG line."}
            </P>
          </div>

          <Figure
            n={ko ? "그림 8" : "Figure 8"}
            title={ko ? "잉글랜드 — 하나의 포메이션, 여덟 개의 다른 경기" : "England — one formation, eight different games"}
            note={ko
              ? "여덟 경기 중 일곱 경기가 4-2-3-1이다. 그런데 점유율은 31.5%에서 72.4%까지, 로우블록 비중은 6%에서 49%까지 움직인다. 짙게 칠한 준결승 한 경기만 xG가 1.0을 밑돌았고, 그것이 대회 유일한 패배다."
              : "Seven of the eight were 4-2-3-1. Possession still ranges from 31.5% to 72.4% and low-block share from 6% to 49%. The one filled card — the semi-final — is the only match under 1.0 xG, and the only defeat."}
          >
            <MatchCards
              rows={ENGLAND_MATCHES}
              ko={ko}
              labels={ko ? { poss: "점유", block: "로우블록", xg: "생성 xG" } : { poss: "poss", block: "low block", xg: "xG" }}
            />
          </Figure>

          <Figure
            n={ko ? "그림 9" : "Figure 9"}
            title={ko ? "아르헨티나 — 반응형으로 시작해 점유형으로 끝내다" : "Argentina — starting reactive, finishing with the ball"}
            note={ko
              ? "조별리그 두 경기는 로우블록 30%대의 생산적 반응형이었다. 이후 점유형으로 옮겨 결승까지 갔고, 결승에서 다시 반응형이 됐지만 xG 0.07 — 무력한 반응형이었고, 그것이 대회 유일한 패배다."
              : "Their first two group matches were productive reactive, sitting in a 30%+ low block. They then moved to a possession game all the way to the final — where they were forced back into a reactive shape at 0.07 xG. Barren reactive, and their only defeat of the tournament."}
          >
            <QuadRun
              rows={ARGENTINA_RUN}
              labels={ko ? { poss: "점유", block: "로우", xg: "xG" } : { poss: "poss", block: "low", xg: "xG" }}
              quadNames={qn}
            />
          </Figure>

          <div className="max-w-[760px]">
            <Callout>
              {ko
                ? "결승에 오른 두 팀은 각각 딱 한 경기에서 무력한 반응형에 빠졌고, 그 한 경기가 각자의 유일한 패배였다. 아르헨티나는 결승 스페인전, 잉글랜드는 준결승 아르헨티나전. 스페인은 여덟 경기 내내 무력한 구간이 한 번도 없었고, 한 번도 지지 않았다."
                : "Each of the two sides that reached the final fell into barren reactive exactly once, and that one match was their only defeat — Argentina against Spain in the final, England against Argentina in the semi. Spain never had a barren match in eight, and never lost."}
            </Callout>
            <P>
              {ko
                ? "다만 스페인 자신이 이 절의 반례다. 그들은 모델을 두 가지밖에 쓰지 않았고 경기 간 점유율 편차도 가장 작은 편이었다(표준편차 6.65). 조절 능력 없이도, 하나의 모델을 압도적 수준으로 실행하면 우승한다. 전환은 필요조건이 아니라 대안이다 — 스페인만큼 잘하지 못하는 팀을 위한."
                : "Spain themselves are the counter-example to this section. They used only two models and had one of the smallest match-to-match possession swings in the field (a standard deviation of 6.65). Execute one model at a high enough level and you win without switching at all. Switching is not a requirement; it is the alternative available to teams that are not Spain."}
            </P>
          </div>

          <Figure
            n={ko ? "그림 10" : "Figure 10"}
            title={ko ? "선발 형태는 어떻게 움직였나" : "How starting shapes moved"}
          >
            <FormationRuns
              runs={runs}
              stageLabels={STAGES_8}
              caption={ko
                ? "짙은 칸은 직전 경기 대비 형태가 바뀐 경기. 오른쪽 숫자는 사용한 서로 다른 선발 형태의 수. 아르헨티나는 네 가지로 결승에 갔고, 프랑스는 한 가지로 4강에 갔다."
                : "Dark cells mark a change from the previous match; the right-hand number is how many distinct shapes the side started in. Argentina reached the final in four, France the semi-final in one."}
            />
          </Figure>

          {/* ── 04 defence ── */}
          <Section
            n={ko ? "04 / 수비" : "04 / Defence"}
            title={ko ? "수비는 노력이 아니라 구조다" : "Defence is structure, not effort"}
            sub={ko
              ? "‘생산적 반응형’이 되려면 블록이 볼을 되찾아 줘야 한다. 그러면 무엇이 좋은 블록인가 — 많이 뛰는 블록인가, 선택지를 지우는 블록인가."
              : "To be productive reactive, the block has to win the ball back. So what makes a good block — one that runs a lot, or one that deletes options?"}
          >
            <P>
              {ko
                ? "각 팀이 강제 턴오버 하나를 얻기 위해 쓴 압박 횟수로 4분위를 나눴다. 이 데이터셋 전체에서 가장 가파른 기울기가 나온다."
                : "Splitting every team-match by how many pressures it spent to win one forced turnover produces the steepest gradient in the entire dataset."}
            </P>
          </Section>

          <Figure
            n={ko ? "그림 11" : "Figure 11"}
            title={ko ? "턴오버당 압박 횟수" : "Pressures per forced turnover"}
            note={ko
              ? "가장 효율적인 집단은 경기당 192회만 압박하고 60.4%를 이겼다. 가장 비효율적인 집단은 332회를 압박하고 9.6%를 이겼다. 팀 수준이 섞여 있지만 방향은 분명하다."
              : "The most efficient quartile pressed just 192 times a match and won 60.4%. The least efficient pressed 332 times and won 9.6%. Team quality is folded in, but the direction is unambiguous."}
          >
            <Staircase
              rows={PRESS_EFFICIENCY}
              quartileLabels={ko ? ["가장 효율적", "효율적", "비효율적", "가장 비효율적"] : ["Most efficient", "Efficient", "Inefficient", "Least efficient"]}
              valueLabel={ko ? "턴오버당 압박" : "pressures / turnover"}
              winLabel={ko ? "승률" : "win rate"}
              xgLabel={ko ? "평균 xG" : "avg xG"}
            />
          </Figure>

          <Figure
            n={ko ? "그림 12" : "Figure 12"}
            title={ko ? "세 블록이 실제로 몇 미터였는가" : "What the three blocks actually measured, in metres"}
            note={ko
              ? "FIFA 수비 라인 높이·팀 길이 다이어그램의 대회 전체 평균. 라인 높이 = 최후방 수비 라인이 자기 골라인에서 떨어진 거리. 팀 길이 = 최후방부터 최전방 선수까지."
              : "Tournament-wide averages from FIFA's defensive line-height and team-length diagrams. Line height = the deepest defensive line's distance from the team's own goal-line. Team length = deepest to highest player."}
          >
            <BlockShapes
              rows={BLOCK_SHAPE}
              labels={ko ? { height: "라인 높이", length: "팀 길이", width: "팀 폭" } : { height: "line height", length: "length", width: "width" }}
            />
          </Figure>

          <div className="max-w-[760px]">
            <P>
              {ko
                ? "하이블록에서 로우블록으로 갈수록 라인 높이는 48.5 → 37.6 → 18.2m로 떨어지고 팀 길이는 36.3 → 26.0 → 22.5m로 압축된다. 팀은 내려앉으면서 동시에 짧아진다. 그리고 이 두 극단 사이의 진폭이 클수록 성적이 좋았다 — 같은 팀이 한 경기 안에서 더 넓은 수비 자세 범위를 오갔다는 뜻이고, 이것이 3절의 ‘조절할 수 있는 팀’과 구조적으로 같은 이야기다."
                : "From high block to low block, line height falls 48.5 → 37.6 → 18.2 m and team length compresses 36.3 → 26.0 → 22.5 m: sides drop and shorten at the same time. The wider a side's span between those two extremes, the better it did — the same team occupying a broader range of defensive postures within one match, which is structurally the same story as section 03."}
            </P>
            <P>
              {ko
                ? "그런데 이 실측값에는 더 중요한 것이 하나 숨어 있었다. 블록을 깊게 내린 62 팀-경기를 승리한 쪽과 패배한 쪽으로 갈라 블록의 크기를 재보면, 두 집단이 사실상 구분되지 않는다."
                : "But the measurements hid something more important. Split the 62 deep-block team-matches into the sides that won and the sides that lost, then measure the block itself, and the two groups are essentially indistinguishable."}
            </P>
          </div>

          <Figure
            n={ko ? "그림 13" : "Figure 13"}
            title={ko ? "블록의 모양은 승패를 설명하지 못한다" : "The shape of the block does not explain the result"}
            note={ko
              ? "왼쪽은 스페인(우승)과 파라과이(대회 최저 xG 팀)의 로우블록을 같은 축척으로 겹친 것. 오른쪽은 깊은 블록 62 팀-경기를 승패로 나눠 잰 값."
              : "Left: Spain's low block (champions) and Paraguay's (lowest xG side of the tournament) overlaid at the same scale. Right: the 62 deep-block team-matches split by result."}
          >
            <BlockOverlay
              overlay={BLOCK_OVERLAY}
              geometry={BLOCK_GEOMETRY_BY_RESULT}
              labels={ko
                ? { height: "라인 높이", length: "팀 길이", width: "팀 폭", xg: "평균 xG", winners: "승리한 쪽", losers: "패배한 쪽", goal: "자기 골문 →" }
                : { height: "line height", length: "length", width: "width", xg: "mean xG", winners: "Won", losers: "Lost", goal: "own goal →" }}
            />
          </Figure>

          <div className="max-w-[760px]">
            <P>
              {ko
                ? "라인 높이는 17.3m 대 18.6m, 팀 길이는 20.5m 대 19.8m, 팀 폭은 34.5m 대 35.0m. 셋 다 1.3m 이내다. 같은 62경기에서 생성 xG는 1.54 대 0.57 — 2.7배 차이다. 대회 전체 상관계수로 봐도 로우블록 기하 세 지표와 승리의 상관은 −0.13에서 +0.17 사이인데, xG와 승리의 상관은 +0.57이다."
                : "Line height 17.3 m against 18.6 m, team length 20.5 against 19.8, team width 34.5 against 35.0 — all three within 1.3 metres. In those same 62 matches xG created was 1.54 against 0.57, a 2.7-fold gap. Across the full tournament the three geometry measures correlate with winning between −0.13 and +0.17; xG correlates at +0.57."}
            </P>
            <Callout>
              {ko
                ? "우승팀과 대회 최저 xG 팀이 거의 같은 모양으로 내려앉았다. 블록을 어디에, 얼마나 촘촘하게 세우느냐는 승패를 가르지 않았다 — 그 블록에서 무엇이 나왔느냐만 갈랐다. 이 리포트의 논지를 미터 단위로 다시 쓴 문장이다."
                : "The champions and the lowest-scoring side of the tournament sat in almost exactly the same shape. Where the block was set, and how tightly, did not separate winners from losers — only what came out of it did. This is the argument of the whole report restated in metres."}
            </Callout>
          </div>

          <Figure n={ko ? "그림 14" : "Figure 14"} title={ko ? "수비 자세의 진폭과 성적" : "Span of defensive posture, and results"}>
            <Staircase
              rows={DEF_RANGE}
              quartileLabels={ko ? ["진폭 최소", "작음", "큼", "진폭 최대"] : ["Narrowest", "Narrow", "Wide", "Widest"]}
              valueLabel={ko ? "하이–로우 높이차" : "high–low span"}
              winLabel={ko ? "승률" : "win rate"}
              xgLabel={ko ? "평균 xG" : "avg xG"}
              unit=" m"
            />
          </Figure>

          {/* ── 05 the long-match premise ── */}
          <Section
            n={ko ? "05 / 반증" : "05 / Where I was wrong"}
            title={ko ? "길어진 경기가 반응형을 깨뜨렸는가 — 아니다" : "Did the longer match break the deep block? No."}
            sub={ko
              ? "내 가설의 전제 중 하나는 “경기가 100분 넘게 길어져 반응형 모델을 타개할 시간이 늘었다”였다. 이건 데이터가 지지하지 않는다."
              : "One premise of my hypothesis was that matches now run past 100 minutes, giving sides more time to break a reactive model down. The data does not support it."}
          >
            <div className="my-6">
              <MiniTable
                head={ko
                  ? ["구분", "경기", "깊은 팀 진출", "진출률", "경기당 득점", "팀당 활동거리", "90분 환산 득점"]
                  : ["", "Matches", "Deeper side advanced", "Rate", "Goals/match", "km per team", "Goals per 90"]}
                rows={EXTRA_TIME.map((r) => [
                  ko ? (r[0] === "regulation" ? "정규시간 종료" : "연장 진행") : r[0],
                  r[1], r[2], `${r[3]}%`, r[4], r[5], r[6],
                ])}
                highlightCol={3}
              />
            </div>
            <P>
              {ko
                ? "연장까지 간 녹아웃 9경기에서 더 깊이 내려앉은 팀의 진출률은 33.3%로, 90분에 끝난 23경기의 39.1%보다 오히려 낮았다. 그리고 연장 경기는 90분 환산 득점이 2.00으로 정규 경기의 3.00보다 훨씬 적었다. 30분이 더 주어져도 경기가 열리지 않았다."
                : "In the nine knockout ties that went to extra time, the deeper-sitting side advanced 33.3% of the time — lower than the 39.1% in the 23 ties settled inside 90 minutes. And extra-time matches produced 2.00 goals per 90 against 3.00 in regulation. The extra half hour did not open the game up."}
            </P>
            <Caveat label={ko ? "다만 이 반증도 결정적이지 않다" : "This refutation is not decisive either"}>
              {ko
                ? "연장에 가는 경기는 애초에 교착된 경기다. 득점이 적어서 연장에 간 것이지 연장이라서 득점이 적은 게 아니다. 정직한 결론은 “길어진 시간이 반응형을 깬다”를 이 데이터로는 검증할 수 없다는 것이다. 승부차기 4경기 중 2경기에서 더 깊이 내려앉은 팀이 살아남았다는 사실(파라과이·스위스)은, 오히려 연장과 승부차기가 반응형의 탈출구일 수 있음을 시사한다."
                : "Matches go to extra time because they are deadlocked. They are low-scoring first and long second, not the other way round. The honest conclusion is that this dataset cannot test the claim. And the fact that the deeper side survived two of the four shootouts — Paraguay, Switzerland — suggests that extra time and penalties may be the reactive model's escape hatch rather than its undoing."}
            </Caveat>
            <div className="my-6">
              <span className="mono block mb-2.5" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--green-bright)" }}>
                {ko ? "파라과이 — 순수 반응형의 전 경기" : "PARAGUAY — the purest reactive run in the tournament"}
              </span>
              <QuadRun
                rows={PARAGUAY_RUN}
                labels={ko ? { poss: "점유", block: "로우", xg: "xG" } : { poss: "poss", block: "low", xg: "xG" }}
                quadNames={qn}
              />
            </div>
            <P>
              {ko
                ? "파라과이는 다섯 경기 평균 xG 0.40, 평균 점유 27.3%로 32강에서 독일을 승부차기로 떨어뜨렸다. 이 대회 무력한 반응형의 유일한 성공 사례다. 그리고 다음 라운드에서 같은 모델로 프랑스에 0-1로 졌다 — xG 0.13. 탈출구는 존재하지만 한 번뿐이다."
                : "Paraguay averaged 0.40 xG and 27.3% possession across five matches and knocked Germany out on penalties in the round of 32 — the only success the barren reactive model had all tournament. In the next round the same model lost 0-1 to France at 0.13 xG. The escape hatch exists, but it opens once."}
            </P>
          </Section>

          {/* ── 06 levelling up ── */}
          <Section
            n={ko ? "06 / 두 번째 반증" : "06 / A second correction"}
            title={ko ? "상향 평준화는 있었는가 — 절반만" : "Was the field really levelling up? Only half of it."}
            sub={ko
              ? "48개국 확대 대회에서 “재능 격차는 좁혀졌고, 그걸 승점으로 못 바꾸는 건 모델 탓”이라고 읽었다. 데이터는 앞 절반만 지지한다."
              : "In a 48-team tournament I read the talent gap as having closed, with the failure to convert it down to game model. The data supports only the first half of that."}
          >
            <div className="my-6">
              <MiniTable
                head={ko ? ["팀", "경기", "승", "무", "패", "득", "실", "xG", "피xG", "로우블록"] : ["Team", "P", "W", "D", "L", "GF", "GA", "xG", "xGA", "Low blk"]}
                rows={DEBUTANTS.map((r) => [r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], `${r[9]}%`])}
                highlightCol={7}
              />
              <p className="mt-3 mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
                {ko
                  ? `합계 ${DEBUT_TOTAL[0]} 팀-경기 — ${DEBUT_TOTAL[1]}승 ${DEBUT_TOTAL[2]}무 ${DEBUT_TOTAL[3]}패 · 평균 생성 xG ${DEBUT_TOTAL[4]} · 평균 피 xG ${DEBUT_TOTAL[5]}`
                  : `Total ${DEBUT_TOTAL[0]} team-matches — ${DEBUT_TOTAL[1]}W ${DEBUT_TOTAL[2]}D ${DEBUT_TOTAL[3]}L · ${DEBUT_TOTAL[4]} xG created · ${DEBUT_TOTAL[5]} conceded`}
              </p>
            </div>
            <P>
              {ko
                ? "첫 출전·최소 연맹 7개 팀은 22경기에서 단 1승도 하지 못했다(0승 5무 17패). 카보베르데의 조별리그 3무와 아르헨티나전 연장 승부는 인상적이었지만, 그 네 경기의 평균 생성 xG는 0.64, 피 xG는 1.89였다. 아르헨티나전에서도 xG는 0.52 대 2.73으로 밀렸다. 이건 실력이 좁혀진 그림이 아니라, 무력한 반응형이 조별리그에서는 무승부를 만들어 낸다는 그림이다."
                : "The seven debutant and smallest-federation sides did not win once in 22 matches (0W-5D-17L). Cabo Verde's three group-stage draws and their extra-time tie with Argentina were striking, but across those four matches they created 0.64 xG and conceded 1.89. Even against Argentina the xG ran 0.52 to 2.73. This is not a picture of the gap closing; it is a picture of barren reactive football being good enough to draw group-stage matches."}
            </P>
            <div className="my-6">
              <span className="mono block mb-2.5" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--green-bright)" }}>
                {ko ? "조별리그 72경기 득실차 분포" : "GROUP-STAGE WINNING MARGINS, 72 MATCHES"}
              </span>
              <BarList
                rows={MARGINS.map((m) => [ko ? (m[0] === 0 ? "무승부" : `${m[0]}골차`) : m[0] === 0 ? "draw" : `${m[0]} goal`, m[1]] as [string, number])}
                suffix={ko ? "경기" : ""}
                highlight={[ko ? "무승부" : "draw", ko ? "1골차" : "1 goal"]}
              />
            </div>
            <P>
              {ko
                ? "그럼에도 경기 자체는 팽팽했다 — 조별 72경기 중 38경기(53%)가 1골차 이내였고 20경기가 무승부였다. 두 사실이 함께 있다. 경기는 접전이 됐지만, 접전을 승점으로 바꾼 것은 여전히 위협을 만들 줄 아는 팀들이었다."
                : "The matches themselves were still tight: 38 of 72 group games (53%) finished within a goal, and 20 were drawn. Both facts hold at once. Games got closer; converting closeness into points still belonged to the sides that could create."}
            </P>
          </Section>

          {/* ── 07 variation scored ── */}
          <Section
            n={ko ? "07 / 변이 이론 채점" : "07 / Variation theory, scored"}
            title={ko ? "내 프레임워크는 실제로 얼마나 나타났는가" : "How much of my framework actually showed up"}
            sub={ko
              ? "다섯 개 개념 각각에 대해 104경기에서 뽑은 정량 프록시와 FIFA 기술연구그룹(TSG)의 정성 사례를 나란히 놓고 채점했다."
              : "Five concepts, each with a quantitative proxy from the 104 reports and a qualitative case from FIFA's own Technical Study Group."}
          >
            <div className="mb-8">
              <ConceptCards items={concepts} />
            </div>
          </Section>

          <Figure n={ko ? "그림 15" : "Figure 15"} title={ko ? "변수의 두 정량 근거" : "Two quantitative traces of the variable"}>
            <div className="flex flex-col gap-6">
              <div>
                <span className="mono block mb-2.5" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--green-bright)" }}>
                  {ko ? "스텝인 — 상대 라인 안으로 밟아 들어간 횟수" : "STEP-INS — stepping inside the opposition line"}
                </span>
                <Staircase
                  rows={[...STEP_INS].reverse()}
                  quartileLabels={ko ? ["최다", "많음", "적음", "최소"] : ["Most", "More", "Fewer", "Fewest"]}
                  valueLabel={ko ? "경기당" : "per match"} winLabel={ko ? "승률" : "win rate"} xgLabel={ko ? "평균 xG" : "avg xG"}
                />
              </div>
              <div>
                <span className="mono block mb-2.5" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--green-bright)" }}>
                  {ko ? "슈팅 분산도 — 슈팅이 몇 명에게 고르게 퍼졌는가" : "SHOT SPREAD — how evenly the shooting load was shared"}
                </span>
                <Staircase
                  rows={[...SHOT_SPREAD].reverse()}
                  quartileLabels={ko ? ["가장 분산", "분산", "집중", "가장 집중"] : ["Most spread", "Spread", "Concentrated", "Most concentrated"]}
                  valueLabel={ko ? "정규 엔트로피" : "norm. entropy"} winLabel={ko ? "승률" : "win rate"} xgLabel={ko ? "평균 xG" : "avg xG"}
                />
              </div>
            </div>
          </Figure>

          {/* ── 08 failures ── */}
          <Section
            n={ko ? "08 / 정직한 회계" : "08 / Honest accounting"}
            title={ko ? "내 프록시 셋은 실패했다" : "Three of my proxies failed"}
            sub={ko
              ? "작동한 지표만 골라 보고하는 것은 이 프레임워크를 실제보다 좋아 보이게 만드는 가장 손쉬운 방법이다."
              : "Reporting only the measures that worked would be the easiest way to make this framework look better than it is."}
          >
            <div className="flex flex-col gap-3.5">
              {failures.map(([name, result, why]) => (
                <div key={name} className="rounded-xl p-5" style={{ background: "var(--stage-2)", border: "0.5px solid var(--edge-2)" }}>
                  <span className="display block mb-1.5" style={{ fontSize: 14.5, color: "var(--ink)" }}>{name}</span>
                  <span className="mono block mb-2" style={{ fontSize: 11.5, color: "var(--green-bright)" }}>{result}</span>
                  <span className="block" style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-2)" }}>{why}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <P>
                {ko
                  ? "셋 다 “다양성이 높으면 좋다” 형태였고, 셋 다 지배력과 엉켜 역방향으로 나왔다. 다양성은 그 자체로 미덕이 아니다 — 위협이 실린 다양성만 미덕이다. 이 리포트 전체를 관통하는 문장이 여기서 한 번 더 나온다. 무력한 반응형이 지는 이유와 정확히 같은 이유로, 무력한 다양성도 아무것도 만들지 못한다."
                  : "All three were “more variety is better” measures, and all three inverted once dominance entered the mix. Variety is not a virtue on its own — only variety carrying threat is. The sentence that runs through this whole report shows up once more here: barren variety produces nothing, for exactly the reason barren reactive football loses."}
              </P>
            </div>
          </Section>

          {/* ── 09 the recovered proxy ── */}
          <Section
            n={ko ? "09 / 실패의 회수" : "09 / Recovering a failure"}
            title={ko ? "패스 네트워크 분산도는 틀렸다. 그런데 원본을 다시 파보니 다른 신호가 있었다" : "Pass-network dispersion was wrong. The raw data underneath it was not."}
            sub={ko
              ? "08절에서 “패스량 엔트로피”가 승자를 거꾸로 골랐다고 적었다. 그건 총계 집계에서 만든 근사치였다. 17×17 원본 패스 행렬로 돌아가 다시 재봤더니, 버린 지표 옆에 훨씬 강한 지표가 있었다."
              : "Section 08 reported that pass-volume entropy picked the winner backwards. That measure was an approximation built from aggregate totals. Going back to the raw 17x17 pass matrices turned up a much stronger signal sitting right next to the one that failed."}
          >
            <P>
              {ko
                ? "결승전 두 팀의 모든 선수 쌍 연결을 패스 횟수로 재구성해 강한 순서로 나열했다. 스페인의 곡선은 아르헨티나의 곡선 위에 통째로 있다 — 특정 두 선수만 유독 많이 주고받은 게 아니라, 팀 전체의 연결이 고르게 더 강했다는 뜻이다."
                : "Every player-pair connection in the final, for both sides, rebuilt from pass counts and ranked strongest to weakest. Spain's curve sits entirely above Argentina's — not because two players passed unusually often, but because the whole team's web of connections ran stronger, top to bottom."}
            </P>
          </Section>

          <Figure
            n={ko ? "그림 16" : "Figure 16"}
            title={ko ? "결승 — 연결을 강한 순서로 나열하면" : "The final — every connection, ranked strongest to weakest"}
            note={ko
              ? `스페인(총 ${FINAL_NET_TOTALS.spain}패스, 10패스 이상 연결 ${FINAL_NET_TOTALS.spainE10}개)과 아르헨티나(총 ${FINAL_NET_TOTALS.argentina}패스, ${FINAL_NET_TOTALS.argE10}개)의 모든 선수 쌍 연결. 점선은 10패스 기준선.`
              : `Every player-pair connection for Spain (${FINAL_NET_TOTALS.spain} passes total, ${FINAL_NET_TOTALS.spainE10} connections at 10+) and Argentina (${FINAL_NET_TOTALS.argentina} total, ${FINAL_NET_TOTALS.argE10} at 10+). The dashed line marks the 10-pass threshold.`}
          >
            <ConnectionStrip
              teams={FINAL_NET_STRIP}
              threshold={10}
              labels={ko
                ? { threshold: "10패스 — 강한 연결의 기준선", rank: "강한 순서대로 나열한 연결", passes: "패스", total: "총", above: "기준선 위" }
                : { threshold: "10 passes — the strong-connection line", rank: "connections, ranked", passes: "passes", total: "total", above: "above threshold" }}
            />
          </Figure>

          <Figure
            n={ko ? "그림 17" : "Figure 17"}
            title={ko ? "같은 데이터를 이름으로 보면" : "The same data, by name"}
            note={ko
              ? "각 팀 상위 10개 연결. 검은 막대 = 10패스 이상. 스페인 최강 연결(쿠바르시–포로 60패스)은 아르헨티나 최강 연결(13패스)의 4.6배다."
              : "Each side's top 10 connections. Black bars mark 10+ passes. Spain's strongest link (Cubarsí–Fermín, 60 passes) is 4.6 times Argentina's strongest (13)."}
          >
            <ConnectionLadder
              teams={FINAL_NET_LADDER}
              threshold={10}
              labels={ko ? { top10: "상위 10개 연결" } : { top10: "top 10 connections" }}
            />
          </Figure>

          <div className="max-w-[760px]">
            <Callout>
              {ko
                ? `이걸 104경기 전체로 확대하면: 한 팀의 10패스 이상 연결 개수(e10)만으로 승자를 맞히는 적중률이 ${E10_PRED[0]}%다(${E10_PRED[1]}/${E10_PRED[2]}). 5패스 기준(e5)은 ${E5_PRED[0]}%. 08절에서 버린 분산도 지표(엔트로피·매개 중심성)의 적중률은 50%대로, 사실상 동전 던지기였다.`
                : `Extended to all 104 matches: the number of 10+-pass connections a team has (e10) alone picks the winner ${E10_PRED[0]}% of the time (${E10_PRED[1]}/${E10_PRED[2]}). The 5-pass version (e5) gets ${E5_PRED[0]}%. The dispersion measures dropped in section 08 — entropy, betweenness — sat in the low 50s, effectively a coin flip.`}
            </Callout>
          </div>

          <Figure
            n={ko ? "그림 18" : "Figure 18"}
            title={ko ? "강한 연결이 많을수록 이긴다" : "More strong connections, more wins"}
            note={ko
              ? "104경기 208 팀-경기를 10패스 이상 연결 개수(e10)로 4분위했다. 분산이 아니라 밀도가 신호였다."
              : "All 208 team-matches, split into quartiles by e10 (count of 10+-pass connections). Density was the signal, not dispersion."}
          >
            <Staircase
              rows={E10_QUARTILE}
              quartileLabels={ko ? ["최소", "적음", "많음", "최다"] : ["Fewest", "Fewer", "More", "Most"]}
              valueLabel={ko ? "평균 e10" : "mean e10"}
              winLabel={ko ? "승률" : "win rate"}
              xgLabel={ko ? "평균 xG" : "avg xG"}
            />
          </Figure>

          <div className="max-w-[760px]">
            <P>
              {ko
                ? "실패 자체를 숨기지 않고 08절에 그대로 남겨둔 이유가 여기 있다. 잘못 설계된 지표를 버리는 것과, 그 지표가 가리키던 현상 자체를 버리는 것은 다르다. 패스 네트워크는 신호가 없었던 게 아니라 잘못된 방식으로 측정되고 있었을 뿐이다."
                : "This is why the failure in section 08 was left in, not quietly dropped. Discarding a badly designed measure is not the same as discarding the phenomenon it was pointing at. The pass network was never signal-free — it was just being measured the wrong way."}
            </P>
          </div>

          {/* ── 10 champion ── */}
          <Section
            n={ko ? "10 / 챔피언" : "10 / The champion"}
            title={ko ? "스페인 — 함정에 한 번도 빠지지 않은 팀" : "Spain — the side that never fell into either trap"}
            sub={ko ? "8경기 7승 1무, 실점 1, 무력한 구간 0회." : "Eight matches, seven wins and a draw, one goal conceded, zero barren matches."}
          >
            <div className="my-6">
              <QuadRun
                rows={SPAIN_RUN}
                labels={ko ? { poss: "점유", block: "로우", xg: "xG" } : { poss: "poss", block: "low", xg: "xG" }}
                quadNames={qn}
              />
            </div>
            <P>
              {ko
                ? "이 표에서 가장 중요한 줄은 결승이 아니라 준결승이다. 프랑스전에서 스페인의 점유율은 45.8%로 대회 최저였고, xG는 2.21 대 0.48로 이겼으며, 경기는 2-0이었다. 우승팀이 공을 가장 적게 가진 경기가 가장 확실하게 압도한 경기 중 하나였다."
                : "The most important line here is not the final but the semi. Against France, Spain had 45.8% of the ball — their lowest of the tournament — won the xG 2.21 to 0.48, and won the match 2-0. The champions' least possession-heavy match was one of their most complete performances."}
            </P>
            <P>
              {ko
                ? "결승에서 아르헨티나의 xG는 0.07이었다. 녹아웃 32경기 최저값이고, 208 팀-경기 전체로도 두 번째로 낮다. 스페인은 수비 라인 브레이크 22회·파이널 서드 수신 251회, 아르헨티나는 5회·52회. 1-0이 감춘 격차다. 그리고 대회 최저 xG 6개 기록 중 셋이 스페인을 상대한 팀의 것이다 — 사우디아라비아 0.11, 카보베르데 0.13, 그리고 결승의 아르헨티나."
                : "In the final Argentina created 0.07 xG — the lowest figure of the entire knockout stage and the second lowest of all 208 team-matches. Spain recorded 22 defensive line breaks and 251 receptions in the final third; Argentina managed 5 and 52. That is the gap a 1-0 concealed. Three of the six lowest xG performances of the tournament belong to sides that were playing Spain: Saudi Arabia at 0.11, Cabo Verde at 0.13, and Argentina in the final."}
            </P>
            <div className="my-7">
              <span className="mono block mb-2.5" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "var(--green-bright)" }}>
                {ko ? "4강 4팀 vs 나머지 (팀-경기 평균)" : "THE FOUR SEMI-FINALISTS vs THE REST (per team-match)"}
              </span>
              <MiniTable
                head={ko ? ["지표", "4강 4팀", "나머지"] : ["Metric", "Semi-finalists", "Rest"]}
                rows={TOP4_VS_REST.map(([k, a, b]) => {
                  const names: Record<string, [string, string]> = {
                    poss: ["Possession %", "점유율 %"], xg: ["xG created", "생성 xG"], xg_opp: ["xG conceded", "피 xG"],
                    dlb: ["Defensive line breaks", "수비 라인 브레이크"], rft: ["Receptions in final third", "파이널 서드 수신"],
                    press_per_ft: ["Pressures per turnover", "턴오버당 압박"], ph_high_press: ["High press share %", "하이프레스 비중 %"],
                    ph_low_block: ["Low block share %", "로우블록 비중 %"], stepins_total: ["Step-ins", "스텝인"],
                    def_height_range: ["High–low span (m)", "수비 높이 진폭 (m)"],
                  };
                  return [ko ? names[k][1] : names[k][0], a, b];
                })}
                highlightCol={1}
              />
              <p className="mt-3" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
                {ko
                  ? `스페인 8경기 상세: ${SPAIN.map((r) => `${r[1]} ${r[2]}-${r[3]}`).join(" · ")}`
                  : `Spain's eight matches: ${SPAIN.map((r) => `${r[1]} ${r[2]}-${r[3]}`).join(" · ")}`}
              </p>
            </div>
          </Section>

          {/* ── 11 conclusions ── */}
          <Section n={ko ? "11 / 결론" : "11 / Conclusions"} title={ko ? "2026이 말해준 다섯 가지" : "Five readings I take forward"}>
            <div className="flex flex-col gap-6">
              {conclusions.map(([h, body], i) => (
                <div key={h} className="flex gap-4">
                  <span className="mono shrink-0" style={{ fontSize: 12, color: "var(--ink-4)", paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="display mb-1.5" style={{ fontSize: 17, lineHeight: 1.3, color: "var(--ink)" }}>{h}</h3>
                    <p style={{ fontSize: 15.5, lineHeight: 1.72, color: "var(--ink-2)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout>
              {ko
                ? "실무적으로는 한 문장이다. 피해야 할 것은 로우블록도 점유도 아니라 무력함이고, 목표는 볼 지배로도 역습으로도 양질의 기회를 만들 수 있으면서 상대에 따라 그 경로를 고를 수 있는 팀이다."
                : "In practical terms it reduces to one sentence. What has to be avoided is not the low block or the ball but barrenness, and the target is a side that can produce quality chances through dominance or through the counter — and choose between them by opponent."}
            </Callout>
            <Caveat label={ko ? "남은 질문" : "Open questions"}>
              <p style={{ marginBottom: 8 }}>
                {ko
                  ? "가장 중요한 미해결 문제는 타이밍이다. 유인과 폭발(Lure and Shock)은 시퀀스 안의 시간 구조인데, 경기 총계 데이터에는 시간축이 없다. 멕시코의 “첫 패스 허용”이 설계였다는 것은 TSG 서술로 알지만, 몇 번의 반복 뒤에 작동했는지는 이 데이터로 알 수 없다. 같은 이유로 ‘경기 중 모델 전환’도 경기 단위로만 볼 수 있고 쿼터 단위로는 볼 수 없다."
                  : "The most important thing still open is timing. Lure and shock is a time structure inside a sequence, and match totals have no time axis. I know from the TSG's account that Mexico's conceded first pass was designed, but nothing here tells me how many repetitions it took to pay. For the same reason, model switching is visible match to match but not quarter to quarter."}
              </p>
              <p>
                {ko
                  ? "다음 단계는 명확하다 — 이벤트 단위 로그로 라인 브레이크의 발생 간격과 브레이크에서 파이널 서드 진입까지의 시간을 측정하는 것. 그때 ‘변수의 깊이’가 비유에서 숫자가 된다."
                  : "The next step is clear: event-level logs, measuring the interval between line breaks and the time from break to final-third entry. At that point “depth of variables” stops being a metaphor and becomes a number."}
              </p>
            </Caveat>
          </Section>

          {/* ── source note ── */}
          <div className="mt-16 pt-7" style={{ borderTop: "0.5px solid var(--edge-2)" }}>
            <p className="mono" style={{ fontSize: 11.5, lineHeight: 1.8, color: "var(--ink-4)" }}>
              {ko
                ? `자료 — FIFA 공식 Post-Match Summary Report ${D.matches}경기 전수(2026 FIFA 월드컵, 조별 M1 ~ 결승 M104). 정성 근거 — FIFA Training Centre 기술연구그룹(TSG) 라운드 리뷰 및 팀 분석. 대회 총 득점 ${D.goals}골, 팀-경기 평균 xG ${D.avgXg}, 평균 점유율 ${D.avgPoss}%, 평균 수비 라인 브레이크 ${D.avgDlb}회, 평균 파이널 서드 수신 ${D.avgRft}회.`
                : `Source — all ${D.matches} official FIFA Post-Match Summary Reports of the 2026 FIFA World Cup (group stage M1 through the final, M104). Qualitative evidence — FIFA Training Centre Technical Study Group round reviews and team analyses. Tournament totals: ${D.goals} goals, ${D.avgXg} average xG per team-match, ${D.avgPoss}% average possession, ${D.avgDlb} defensive line breaks, ${D.avgRft} receptions in the final third.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
