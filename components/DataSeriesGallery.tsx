"use client";
import Link from "@/components/LocaleLink";
import Reveal from "@/components/Reveal";
import { type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

/* ─────────────────────────────────────────────────────────────────────────
   「데이터가 말하는」 연재.
   한 팀·한 대회를 공개 데이터만으로 끝까지 읽는 시리즈. 최신 편이 위로 온다.

   새 편을 추가할 때:
   1. /public/data-[슬러그].ko.html 과 /public/data-[슬러그].html 을 넣는다
   2. app/[locale]/match-analysis/data-series/[슬러그]/page.tsx 를 만든다
      (hwaseong/page.tsx 를 그대로 복사해 src 경로와 META만 바꾸면 된다)
   3. 아래 EPISODES 배열 맨 앞에 한 항목을 추가한다
   ───────────────────────────────────────────────────────────────────────── */

type Episode = {
  slug: string;
  no: string;
  publishedAt: string;
  /** 국문판만 나온 편이면 true. 영문 HTML을 추가하면 항목에서 지운다. */
  koOnly?: boolean;
  /** 연재 본편이 아닌 동반 문서(스카우팅 리포트 등). 번호 자리에 — 를 두고 배지를 단다. */
  companion?: Record<Locale, string>;
  competition: Record<Locale, string>;
  title: Record<Locale, string>;
  sub: Record<Locale, string>;
  /** 목록에서 보이는 두 줄 요약. sub는 상세용으로 남겨둔다. */
  blurb: Record<Locale, string>;
  stats: Record<Locale, readonly (readonly [string, string])[]>;
};

const EPISODES: Episode[] = [
  {
    slug: "seoule",
    no: "16",
    publishedAt: "2026-09-25",
    competition: {
      en: "K League 2 2026 · Seoul E-Land · 26 matches, 212-match league pool",
      ko: "하나은행 K리그2 2026 · 서울 이랜드 · 26경기 · 리그 212경기 비교",
    },
    title: {
      en: "They Get In, but They Cannot Shoot",
      ko: "닿아도, 쏘지 못한다",
    },
    sub: {
      en: "Seoul E-Land are second in K League 2 on non-penalty expected goal difference (+0.47 per match), and their goals and goals conceded match expectation in every score state. Opponents who reach their final third end the move with a shot 22.3% of the time — the league’s lowest, and the lowest wherever the final third is drawn. At the other end they are the best at getting out of their own third (67.2% of build-ups reach midfield) while ranking 16th for the share of passes that go forward, and they win the ball further up the pitch than anyone. By score state: level, they create the most; behind, a leading opponent reaches the final third less than against anyone and Seoul E-Land score set pieces at the league’s highest rate; ahead, they become ordinary — 12 of 30 goals conceded came while leading, when opponent ten-second counters jump to fourth. The route runs through Changhwan Park, Inpyo Oh and Euller. Minutes with only top scorer Jaeyong Bak up front show an xG difference of +0.18 per 90, against +1.12 with only Hyun Kim — non-overlapping intervals, not causal. Foreign players’ share of chance creation is 16th, but of passes into the final third 3rd. They rotate more than any other club. Five hypotheses were rejected along the way, all mine.",
      ko: "서울 이랜드의 PK 제외 기대 득실차는 경기당 +0.47로 K리그2 2위이고, 득·실점은 모든 스코어 상태에서 기대대로 나왔다. 상대가 서울 이랜드의 파이널서드에 닿았을 때 슛으로 끝내는 비율은 22.3%로 리그 최저이고, 파이널서드를 어디에 그어도 최저다. 반대편에서는 자기 진영을 빠져나가는 비율이 1위(67.2%)인데 앞으로 가는 패스 비중은 16위이고, 리그에서 가장 높은 곳에서 공을 뺏는다. 상태별로는 동점에서 가장 많이 만들고, 뒤지면 앞선 상대가 리그에서 가장 못 들어오며 세트피스 득점은 1위다. 앞서면 평범해진다 — 30실점 중 12골이 리드 중이고, 그때만 상대 10초 역습이 4위로 튄다. 통로는 박창환·오인표·에울레르. 득점 1위 박재용만 뛴 시간의 xG 득실차는 90분당 +0.18, 김현만 뛴 시간은 +1.12다(구간 비중첩, 인과 아님). 외국인은 기회 생산 몫 16위, 파이널서드 진입 패스 몫 3위. 리그에서 가장 많이 로테이션한다. 가설 다섯 개가 기각됐고 전부 내 것이다.",
    },
    blurb: {
      en: "Opponents reach Seoul E-Land’s final third and finish with a shot less often than against anyone. Nobody gets out of their own third better — and they are most ordinary when ahead.",
      ko: "상대는 닿아도 리그에서 가장 못 쏘고, 서울 이랜드는 가장 잘 올라간다. 약한 순간은 앞서 있을 때다.",
    },
    stats: {
      en: [["22.3%", "opponent final-third entries ending in a shot, league lowest"], ["67.2%", "build-ups reaching midfield, league 1st"], ["+0.18 vs +1.12", "xG diff./90, only Bak vs only Kim up front"]],
      ko: [["22.3%", "상대 파이널서드 도달 후 슛 전환, 리그 최저"], ["67.2%", "빌드업 → 중앙 도달, 리그 1위"], ["+0.18 vs +1.12", "박재용만 vs 김현만 뛴 시간의 xG 득실차/90"]],
    },
  },
  {
    slug: "suwonfc",
    no: "15",
    publishedAt: "2026-09-24",
    competition: {
      en: "K League 2 2026 · Suwon FC · 25 matches, 212-match league pool",
      ko: "하나은행 K리그2 2026 · 수원FC · 25경기 · 리그 212경기 비교",
    },
    title: {
      en: "They Reach Less, and Shoot the Most",
      ko: "적게 닿고, 가장 자주 쏜다",
    },
    sub: {
      en: "Suwon FC have scored 50 goals, the most in K League 2, but on non-penalty expected goal difference they are fourth (+0.41 per match) and 5.3 points above simulated expected points. Build-up, progression and final-third entries are all below the league average — entries rank 13th of 17. What happens next is different: 30.6% of their entries end in a shot, first in the league, and first again whether the final third starts at x 60, 66.7 or 75. The defence is a mirror: opponents reach their third more often (31.9 to 28.9 per 90), yet non-penalty xG runs 1.43 to 1.01 in Suwon FC’s favour. Their ten-second transitions are the league’s sharpest (P = 0.012), but goals from regains sit below the league average share. By score state: level is where the formula is clearest; ahead they allow the fewest open-play chances in the league; behind, entries and regains fall to the bottom and penalties and set pieces carry them — set pieces went 8 goals from 3.44 xG at one end and 6 from 2.57 at the other, both the league’s biggest excess. Unbeaten in 13 since R14, with entries unchanged and entry-to-shot up from 24.6% to 36.5%. Five hypotheses were rejected or revised along the way, all mine.",
      ko: "수원FC는 50골로 K리그2 최다 득점이지만 PK 제외 기대 득실차는 경기당 +0.41로 4위, 기대승점보다 5.3점 많다. 빌드업·전진·파이널서드 도달 모두 리그 평균 아래이고 도달은 17팀 중 13위다. 차이는 그다음에 있다. 도달의 30.6%가 슛으로 끝나 리그 1위이고, 파이널서드 기준선을 x 60·66.7·75 어디에 그어도 1위다. 수비는 거울상이다 — 상대 도달은 90분당 31.9 대 28.9로 더 많은데 PK 제외 xG는 1.43 대 1.01로 수원FC가 앞선다. 탈취 후 10초 전환은 리그에서 가장 날카롭지만(P=0.012) 탈취 시작 골 비중은 리그 평균 아래다. 상태별로는 동점에서 공식이 가장 선명하고, 앞서면 리그에서 가장 적게 내준다. 뒤지면 도달과 탈취가 최하위로 떨어지고 PK와 세트피스가 버틴다 — 세트피스는 득점 8골(xG 3.44)·실점 6골(xGA 2.57)로 양쪽 모두 리그 최대 초과다. R14 이후 13경기 무패, 도달은 그대로이고 도달 후 슛이 24.6%에서 36.5%로 올랐다. 가설 다섯 개가 기각·수정됐고 전부 내 것이다.",
    },
    blurb: {
      en: "The most goals in K League 2 from the 13th-most final-third entries. Once in, nobody shoots more often — and ahead, nobody allows less.",
      ko: "파이널서드 도달 13위로 K리그2 최다 득점. 닿으면 가장 자주 쏘고, 앞서면 가장 적게 내준다.",
    },
    stats: {
      en: [["30.6%", "final-third entries ending in a shot, league 1st"], ["13th", "final-third entries per 90, of 17"], ["0.65", "open-play xG allowed per 90 when leading, league lowest"]],
      ko: [["30.6%", "파이널서드 도달 후 슛 전환, 리그 1위"], ["13위", "90분당 파이널서드 도달, 17팀 중"], ["0.65", "리드 중 허용 오픈플레이 xG/90, 리그 최소"]],
    },
  },
  {
    slug: "incheon",
    no: "14",
    publishedAt: "2026-09-23",
    competition: {
      en: "K League 1 2026 · Incheon United · 29 matches, 168-match league pool",
      ko: "하나은행 K리그1 2026 · 인천유나이티드 · 29경기 · 리그 168경기 비교",
    },
    title: {
      en: "They Give Away the Least, and Concede More",
      ko: "가장 적게 내주고, 더 많이 먹었다",
    },
    sub: {
      en: "Put all 168 league matches on one scale and Incheon rate second on expected goal difference (+0.39 per match), behind only Seoul — yet they sit seventh. Being 5.8 points short of simulated expected points is within the range of luck (P = 0.19); Pohang, Gimcheon and Daejeon are in the same place. The defence is the best in the league at suppression: 0.68 open-play xG allowed per 90, the lowest, along with the lowest xG allowed per final-third chain and after losing the ball. Yet a league-adjusted model says they conceded 6.9 goals too many, second only to Gwangju, and 6.4 survive even after adjusting for whether a defender reached the shooter (P = 0.083). The excess sits in one place: 147 unchallenged shots produced 22 goals against an expected 15.2, while 113 challenged shots produced 7 against 7.4. They did not allow more of them — a correction to my own first reading — those shots simply went in more often, clustered in the fifteen seconds after an opponent regain. The attack reaches the final third often and ends there in a shot less often than anyone; without penalties (8 won, a league high) it is ninth. Mugosa matters for finishing, not creation. Five hypotheses were rejected along the way, all mine.",
      ko: "리그 168경기를 한 잣대에 놓으면 인천의 경기당 기대 득실차는 +0.39로 서울 다음 2위다. 순위는 7위다. 기대승점보다 5.8점 모자란 것은 운의 범위다(P=0.19) — 포항·김천·대전도 같은 자리에 있다. 수비 억제는 리그 최고다. 오픈플레이 허용 xG/90 0.68로 최소이고, 파이널서드 체인당 허용 xG와 볼 상실 직후 허용 xG도 최소다. 그런데 리그 보정 모델로는 6.9골을 더 먹었고(광주 다음 2위), 슈터에게 수비가 붙었는지까지 보정해도 6.4골이 남는다(P=0.083). 초과는 한곳에 있다. 붙지 않은 슛 147개에서 22실점(기대 15.2), 붙은 슛 113개에서 7실점(기대 7.4). 더 많이 내준 게 아니라 — 첫 해석을 정정했다 — 그 슛이 더 자주 들어갔고, 상대가 공을 뺏은 직후 15초에 몰려 있다. 공격은 파이널서드까지 자주 가지만 거기서 슛으로 끝나는 비율이 리그 최저이고, PK(8개, 최다)를 빼면 9위다. 무고사 의존은 기회가 아니라 마무리 의존이다. 가설 다섯 개가 기각됐고 전부 내 것이다.",
    },
    blurb: {
      en: "The fewest chances allowed in the league, second on expected goal difference, seventh in the table. The excess goals all came from shots nobody got to — not more of them, just more of them going in.",
      ko: "리그에서 가장 적게 내주고, 기대 득실차 2위, 순위 7위. 초과 실점은 전부 아무도 붙지 않은 슛에서 나왔다 — 더 많이 내준 게 아니라 더 자주 들어갔다.",
    },
    stats: {
      en: [["0.68", "open-play xG allowed per 90, league lowest"], ["+6.9", "goals conceded above league-adjusted expectation"], ["15.2 → 22", "unchallenged shots, expected vs actual goals"]],
      ko: [["0.68", "오픈플레이 허용 xG/90, 리그 최소"], ["+6.9", "리그 보정 기대 대비 초과 실점"], ["15.2 → 22", "붙지 않은 슛의 기대 대 실제 실점"]],
    },
  },
  {
    slug: "bucheon",
    no: "13",
    publishedAt: "2026-09-21",
    competition: {
      en: "K League 1 2026 · Bucheon FC 1995 · 29 matches, 39,033 events",
      ko: "하나은행 K리그1 2026 · 부천FC · 29경기 · 이벤트 39,033건",
    },
    title: {
      en: "Once Caught, Never Ahead Again",
      ko: "한 번 따라잡히면 다시 앞서지 못했다",
    },
    sub: {
      en: "Bucheon took the lead in 14 of their 29 matches, and seven of those leads were wiped out. Not once did they go back in front afterwards — 0 wins, 5 draws, 2 defeats, 16 points gone — and the only comeback win of the season came on the opening day. The table flatters them: expected goal difference is −18.3 against an actual −7, and the 11.5-goal defensive overperformance does not belong to the goalkeepers (save rates 70.1% and 72.2%) or to the structure (Anyang, parsed through the same pipeline, suppress shots as well and finish −3.3). A 200,000-run simulation is narrowly significant on 28 matches, but the portal is missing the 0–5 defeat at Daejeon; restore it and p rises to 0.11. The attack shoots well once it arrives — 13.21 shots per 100 final-third passes, best of four groups — but arrives 22.2 times a match against 33.2, and half the entry gap is one cell: 33.8 mid-range forward passes a match against 63.5. The centre was never closed. A short pass into it succeeds 78.0% of the time against 79.7%, yet only 17.2% of central entries use it; long balls and free kicks, completing 19% and 18%, fill the rest. Leaning left costs nothing — wide conversion is higher than the opposition’s — and the whole xG-per-shot gap sits after recoveries, taken from further out (0.0848 against 0.1182). Level, they are outplayed two to one on xG. Five hypotheses were rejected along the way, all mine, including a baseline error I corrected in the text.",
      ko: "부천은 29경기 중 14경기에서 리드를 잡았고, 그중 7경기에서 리드가 지워졌다. 지워진 뒤 다시 앞선 경기는 한 번도 없다 — 0승 5무 2패, 승점 16점이 사라졌고, 시즌 유일한 역전승은 개막전이다. 순위표는 이 팀을 실제보다 좋게 보여준다. 기대 득실차 −18.3, 실제 −7. 수비 초과 11.5골은 골키퍼(선방률 70.1%·72.2%)의 것도, 구조의 것도 아니다 — 같은 파이프라인으로 파싱한 안양은 비슷한 억제력으로 −3.3이다. 20만 번 시뮬레이션은 28경기에서 아슬아슬하게 유의하지만, 포털에 0-5 대전전이 빠져 있고 이를 되돌리면 p=0.11이다. 공격은 도착하면 잘 쏜다 — 공격진영 패스 100회당 13.21개, 네 집단 최고. 그러나 도착이 경기당 22.2회 대 33.2회이고, 진입 격차의 절반이 중거리 전진 패스 한 칸이다(경기당 33.8 대 63.5). 중앙은 막혀 있지 않았다. 숏패스로 넣으면 78.0%로 상대(79.7%)와 같은데, 중앙 진입의 17.2%만 이 방법이고 나머지를 성공률 19%·18%의 롱패스와 프리킥이 채운다. 왼쪽 편중은 손해가 아니고, 슛당 xG 격차는 전부 회수 뒤 멀리서 쏘는 한 칸이다(0.0848 대 0.1182). 동점 상태에서는 xG가 두 배로 밀린다. 가설 다섯 개가 기각됐고 전부 내 것이다 — 본문에서 정정한 기준선 오류 하나를 포함해.",
    },
    blurb: {
      en: "Fourteen leads, seven wiped out, none regained. The table flatters them by 11 goals, the centre was never closed — short passes into it work as well as anyone’s — and Bucheon simply rarely play them.",
      ko: "리드 14번, 그중 7번이 지워졌고 되찾은 적이 없다. 순위표는 11골만큼 이 팀을 좋게 보여주고, 중앙은 막혀 있지 않았다 — 숏패스로 넣으면 상대만큼 통하는데, 부천은 그 방법을 거의 쓰지 않는다.",
    },
    stats: {
      en: [["14 → 7 → 0", "leads taken, wiped out, regained"], ["−18.3 : −7", "expected and actual goal difference"], ["78.0% : 79.7%", "short passes into the centre, completed"]],
      ko: [["14 → 7 → 0", "잡은 리드 · 지워진 리드 · 되찾은 리드"], ["−18.3 : −7", "기대 득실차와 실제 득실차"], ["78.0% : 79.7%", "중앙 숏패스 진입 성공률"]],
    },
  },
  {
    slug: "anyang",
    no: "12",
    publishedAt: "2026-09-19",
    competition: {
      en: "K League 1 2026 · FC Anyang · 29 matches, 41,111 events",
      ko: "하나은행 K리그1 2026 · 안양FC · 29경기 · 이벤트 41,111건",
    },
    title: {
      en: "Where the Ball Stops",
      ko: "공은 어디서 멈추는가",
    },
    sub: {
      en: "Anyang have scored 36 and conceded 46 in 29 matches, and the −10 is almost exactly what their chances say it should be: −9.8 on expected goals. Neither luck nor finishing explains it, and effectively all of it was created in open play — the set-piece ledger is level, 7 to 6. The shot count is 281 to 391, but change the denominator and it reverses: per 100 passes made in the final third Anyang take 11.27 shots against 10.45, with a marginally higher xG per shot. The deficit is territory, not execution. Split into eight phases, it has a precise address. Build-up is level with the opposition (80.4% against 80.0% completion, 22.6% against 22.8% own-third exits) and losing the ball is close to harmless (30 of 2,421 turnovers led to a shot within 15 seconds). The gap opens in phase 2: 11.0% of middle-third passes reach the final third against 12.6%, and 11.3% return to their own third against 8.5% — a pattern that holds under alternative zone boundaries. It compounds in phase 3, where entries fall to 23.9 per match against 32.5, 74% of the opposition rate. The cause is not the defenders, who match their opponents for wide attacking touches (10.3% against 10.6%), but the central midfielders: only Matheus clears 10%, at 21.6%, against 5.1%, 8.3% and 3.1% for the other three. Up front the fixable point is his distribution — passes played forward convert to a shot 32.4% of the time against 6.6% backward (z = 3.31, p = 0.0009) — yet his most-used outlet is the one returning 7.4%. Downstream, corners run 90 to 147 and only 31% of first contacts at their own corners are won, because no registered forward reaches 185cm; the 189cm striker signed in January specifically for aerial presence played 860 minutes, was on the pitch for 29% of the team’s corners, and did not appear after round 23. Six hypotheses were rejected or downgraded along the way, five of them mine, including a sample-size bias that had made the front line look more patterned than this data can establish. Four matches close it out, picked by number rather than impression.",
      ko: "안양FC는 29경기에서 36골을 넣고 46골을 내줬다. 득실차 −10은 기대 득실차 −9.8과 거의 같다. 운으로도 마무리로도 설명되지 않고, 그 전부가 사실상 오픈플레이에서 생겼다 — 세트피스 득실은 7 대 6으로 균형이다. 슛은 281 대 391로 밀리는데 분모를 바꾸면 뒤집힌다. 공격진영 패스 100회당 슛이 11.27 대 10.45이고, 슛당 xG도 약간 높다. 부족한 것은 마무리가 아니라 영토다. 여덟 국면으로 쪼개면 주소가 분명해진다. 빌드업은 상대와 차이가 없고(패스 성공률 80.4% 대 80.0%, 자기진영 탈출률 22.6% 대 22.8%), 공을 잃어도 위험으로 이어지지 않는다(상실 2,421회 중 15초 내 피슛 30회). 격차는 국면 2에서 열린다 — 중앙3 패스의 11.0%가 공격3에 닿고 상대는 12.6%, 자기 진영으로 되돌리는 비율은 11.3% 대 8.5%다. 경계값을 30/70이나 35/65로 바꿔도 유지되는 수치다. 그리고 국면 3에서 누적된다. 경기당 진입이 23.9 대 32.5로 상대의 74% 수준이다. 원인은 수비수가 아니다 — 공격진영 측면 터치 비중이 10.3% 대 10.6%로 상대와 같다. 중앙 미드필더 쪽이다. 10%를 넘는 선수가 마테우스(21.6%) 하나이고 나머지 셋은 5.1% · 8.3% · 3.1%다. 앞선에서 고칠 수 있는 지점은 그의 출구 배분이다. 전방으로 나간 패스는 32.4%가 슛으로 이어지고 후방은 6.6%인데(z=3.31, p=0.0009), 정작 최다 출구는 7.4%짜리다. 그 아래로는 코너가 90 대 147이고, 자기 코너 첫 접촉을 31%밖에 못 딴다. 185cm 이상 등록 공격수가 한 명도 없기 때문이다. 제공권을 보고 1월에 데려온 189cm 스트라이커는 860분을 뛰었고, 자기 팀 코너의 29%에만 그라운드에 있었으며, 23라운드 이후 나오지 않았다. 그 과정에서 가설 여섯 개를 기각하거나 판정 불가로 내렸다. 그중 다섯 개가 내가 세운 것이고, 앞선이 실제보다 더 정형화돼 보이게 만들었던 표본 크기 편향도 거기 들어 있다. 마지막은 인상이 아니라 수치로 고른 네 경기다.",
    },
    blurb: {
      en: "Expected difference −9.8, actual −10. Once in the final third they shoot more than the opposition — what is missing is how often they arrive, and it starts in one phase.",
      ko: "기대 득실차 −9.8, 실제 −10. 공격진영에 도착하면 오히려 상대보다 더 자주 쏜다 — 부족한 것은 도착 빈도이고, 그것은 한 국면에서 시작된다.",
    },
    stats: {
      en: [["−9.8 : −10", "expected and actual goal difference"], ["11.27 : 10.45", "shots per 100 final-third passes"], ["11.0% : 12.6%", "middle third into the final third"], ["0", "registered forwards at 185cm or above"]],
      ko: [["−9.8 : −10", "기대 득실차와 실제 득실차"], ["11.27 : 10.45", "공격진영 패스 100회당 슛"], ["11.0% : 12.6%", "중앙3 → 공격3 전달률"], ["0", "185cm 이상 등록 공격수"]],
    },
  },
  {
    slug: "gimcheon",
    no: "11",
    publishedAt: "2026-09-17",
    competition: {
      en: "K League 1 2026 · Gimcheon Sangmu · 29 matches, 41,879 events",
      ko: "하나은행 K리그1 2026 · 김천상무 · 29경기 · 이벤트 41,879건",
    },
    title: {
      en: "Lost on Dead Balls",
      ko: "멈춘 공에서 잃었다",
    },
    sub: {
      en: "Eighteen draws in 29 matches, six clear of any other club in the division, and fifteen of them finished 1\u20131 or 0\u20130. The team was not hanging on \u2014 it was ahead: twelve conceded goals erased a lead, and the ten matches that followed cost 21 points. Hold those and the season reads 51 points, second place. Split the \u22128 goal difference by phase and it stops looking like an eleventh-placed side. Open play is 26:23, a positive record. Set pieces are 2:13. The whole of the deficit is the dead ball. Cut by score state and the defence is five goals to the good over the season \u2014 and surrenders all of it in one state: while leading, 7.73 goals were expected and 14 arrived (Poisson p = 0.027), nine of the fourteen aerial, and the conceded shots were worse chances than average rather than better. Four explanations were then removed. The club cannot sign a foreign target man, and the mechanism behind that is real \u2014 42% of the league\u2019s tall forwards are foreign, the domestic pool of 188cm regulars is one player, and the dependence ran 47 to 82 percent in two seasons \u2014 but it does not apply here: Gimcheon is third in the league for minutes given to forwards of 185cm or more, with none of them foreign, and tall-forward inventory does not predict corner goals at all (r = \u22120.19). Squad rotation does not survive either; 42 players measured against themselves at both clubs give +0.60 points and t = 0.89. Nor does sitting deep \u2014 the block moves one metre. Nor did my own right-side cross finding, which dissolved when the phases were separated. What is left is the delivery: 56% of corners into the centre of the six-yard area, first contact lost 53% of the time, and a 192cm forward on the pitch for 31% of his own team\u2019s corners.",
      ko: "29경기에 무승부 18번. 2위 구단보다 여섯 경기 많고, 그중 15번이 1\u20131 또는 0\u20130이었다. 버틴 게 아니라 앞서 있었다 \u2014 리드를 지운 실점이 12건이고, 그중 끝내 못 이긴 10경기에서 승점 21점을 흘렸다. 그 열 경기를 지켰다면 51점, 2위다. 득실차 \u22128을 국면으로 쪼개면 리그 11위 팀의 숫자가 아니다. 오픈플레이는 26:23으로 오히려 플러스이고, 세트피스가 2:13이다. 마이너스 전부가 정지 상황이다. 스코어 상태로 자르면 시즌 전체로는 기대실점 대비 5골을 벌었는데, 그 이득을 한 상태에서 전부 토해낸다. 리드 중 기대 7.73에 실제 14(포아송 p=0.027), 14건 중 9건이 공중볼이고, 들어간 슛은 평균보다 오히려 나쁜 기회였다. 그다음 네 가지 설명을 덜어냈다. 외국인 타겟맨을 못 데려오는 것은 사실이고 그 메커니즘도 실재한다 \u2014 리그 장신 공격수의 42%가 외국인, 188cm 이상 국내 주전은 한 명, 의존도는 두 시즌 만에 47\u219282% \u2014 그런데 김천에는 적용되지 않는다. 185cm 이상 공격수 출전시간 비중이 리그 3위인데 외국인은 0명이고, 장신 공격수 보유 수는 코너 득점을 전혀 예측하지 못한다(r=\u22120.19). 선수단 회전도 기각된다. 양쪽 구단에서 모두 뛴 42명을 자기 자신과 비교하면 +0.60%p, t=0.89다. 내려앉기도 아니다 \u2014 블록은 1미터 움직인다. 내가 낸 오른쪽 크로스 발견도 국면을 갈라내자 사라졌다. 남는 것은 배달이다. 코너의 56%가 골에어리어 중앙으로 가고, 첫 접촉의 53%를 잃으며, 192cm 공격수는 자기 팀 코너의 31%에만 그라운드에 있었다.",
    },
    blurb: {
      en: "Open play 26:23, set pieces 2:13 \u2014 the whole of the \u22128 is the dead ball. Four explanations for it die under testing, including one of my own.",
      ko: "오픈플레이 26:23, 세트피스 2:13 \u2014 \u22128의 전부가 정지 상황이다. 그에 대한 설명 네 가지가 검정에서 죽는다. 내가 낸 것 하나를 포함해서.",
    },
    stats: {
      en: [["2 : 13", "set-piece goals, scored to conceded"], ["p = 0.027", "conceded above expectation while leading"], ["r = \u22120.19", "tall forwards against corner goals, 12 clubs"], ["31%", "of its own corners with the 192cm forward on"]],
      ko: [["2 : 13", "세트피스 득실"], ["p = 0.027", "리드 국면 기대 대비 실점"], ["r = \u22120.19", "장신 공격수 보유와 코너 득점, 12개 구단"], ["31%", "192cm 공격수의 자기 팀 코너 출전율"]],
    },
  },
  {
    slug: "gimcheon-club",
    no: "10",
    publishedAt: "2026-09-17",
    competition: {
      en: "K League 1 2026 · Gimcheon Sangmu · the institution",
      ko: "하나은행 K리그1 2026 · 김천상무 · 제도",
    },
    title: {
      en: "A Football Club That Is Also an Army Unit",
      ko: "축구 구단이면서 군부대인 팀",
    },
    sub: {
      en: "Before the data, the constraints \u2014 because almost none of them are guessable from outside Korea, and all of them change which questions about this team are fair to ask. Gimcheon Sangmu is a unit of the Armed Forces Athletic Corps that plays in the top division. Its players did not sign for the club and the club did not scout them: they applied to the Ministry of National Defense and were selected by a military board, on paper, twice a year, against positional quotas \u2014 so a player in excellent form can be rejected because the unit already has enough in his position. The head coach cannot build a squad. He receives one. When Sangmu selects a player no club can block it; there is no fee, no negotiation and no refusal, and the only party who can say no is the player, whose alternative is eighteen months in a line unit with no football at all. The squad turns over on enlistment and discharge dates the transfer window does not know about: ten days after the summer registration period closed in 2026, three regulars played their last match, including a goalkeeper who had started 25 of the previous 26 rounds. A professional contract is suspended for the duration, not paid out. Pay is the conscript scale \u2014 $545 a month as a private, $1,091 as a sergeant \u2014 against a K League 1 domestic average thirteen times higher, and the league\u2019s own salary disclosure covers eleven of twelve clubs because this one has no salaries to disclose. The club is required to change host city about every decade, which is why the city is a prefix and Sangmu is the club. The piece also sets out why nobody refuses: Korea is under an armistice rather than a peace treaty, conscription is universal, and the two men who tried something else \u2014 Suk Hyun-jun, six seasons gone to a travel permission he let expire, and Jang Hyun-soo, an international career ended by 196 hours of falsified paperwork against a state penalty of five days \u2014 are what the exit looks like.",
      ko: "데이터에 앞서 제약 조건을 정리한다. 이 조건들이 2편의 모든 숫자에 대한 해석을 바꾸기 때문이다. 김천상무는 K리그1에서 뛰는 국군체육부대다. 선수는 구단과 계약하지 않았고 구단이 스카우트하지도 않았다. 국방부에 지원해 군 전형을 통과했고, 그 선발은 서류로, 연 2회, 포지션 정원에 맞춰 이뤄진다 \u2014 컨디션이 좋아도 해당 포지션이 찼으면 떨어진다. 감독은 선수단을 구성하지 않는다. 배정받는다. 상무가 선발하면 어떤 구단도 막을 수 없고 이적료도 협상도 거부권도 없다. 거절할 수 있는 유일한 당사자는 선수 본인인데, 그 대가는 축구 없는 18개월이다. 선수단은 이적시장이 모르는 입대일과 전역일에 교체된다. 2026년 여름 등록기간이 닫힌 지 열흘 뒤, 직전 26라운드 중 25경기를 선발로 뛴 골키퍼를 포함해 주전 3명이 마지막 경기를 뛰었다. 프로 계약은 그 기간 동안 정산되는 것이 아니라 정지된다. 보수는 병 봉급이고 \u2014 이등병 75만 원, 병장 150만 원 \u2014 K리그1 국내 평균의 13분의 1이다. 연맹의 구단별 연봉 공시가 12개 구단 중 11개만 다루는 이유도 같다. 공시할 연봉이 없다. 연고지는 약 10년마다 바뀌어야 하고, 그래서 도시 이름은 접두어이고 상무가 구단이다. 아무도 거절하지 않는 이유도 함께 다룬다. 한국은 종전이 아니라 휴전 상태이고 병역은 보편 의무이며, 다른 길을 시도한 두 사람 \u2014 만료되도록 둔 국외여행허가에 여섯 시즌을 쓴 석현준, 국가 처분은 복무 5일 연장이었는데 196시간의 허위 서류로 대표팀 커리어가 끝난 장현수 \u2014 이 그 출구의 모습이다.",
    },
    blurb: {
      en: "A squad picked by a military board, on a private soldier\u2019s wage, turning over on dates the transfer window does not know about. The constraints, before the data.",
      ko: "군이 선발하고, 병 봉급을 받고, 이적시장이 모르는 날짜에 교체되는 선수단. 데이터에 앞서, 그 제약 조건들.",
    },
    stats: {
      en: [["0", "foreign players, every season since 2022"], ["0", "transfers in or out, ever"], ["$545", "monthly pay as a private, 2026"], ["3", "host cities since 2003, a fourth being decided"]],
      ko: [["0", "외국인 선수, 2022년 이후 매 시즌"], ["0", "영입과 방출, 제도상 불가"], ["75만원", "이등병 월 봉급, 2026년"], ["3", "2003년 이후 연고지, 네 번째는 논의 중"]],
    },
  },
  {
    slug: "gimcheon-scouting",
    no: "—",
    publishedAt: "2026-09-17",
    companion: { en: "COMPANION REPORT", ko: "동반 리포트" },
    competition: {
      en: "K League 1 2026 · Gimcheon Sangmu · written from the opposition's side",
      ko: "하나은행 K리그1 2026 · 김천상무 · 상대팀 관점",
    },
    title: {
      en: "How to Beat Gimcheon Sangmu",
      ko: "김천상무를 어떻게 이기나",
    },
    sub: {
      en: "The same 29 matches, rewritten as the document an opposing analyst hands his head coach. Five ways in, ordered by how strongly the data supports them. First: let them score. Gimcheon concede 2.58 per 90 while leading against 1.42 expected (Poisson p = 0.027) and are below expectation in every other state \u2014 so the shape that favours you is the one where they lead and you chase. Second: manufacture dead balls, because the whole of their \u22128 is stationary play (set pieces 2:13, open play 26:23) and seven of eight set-piece goals were finished within three seconds. Third: make contact in the box \u2014 six penalties conceded, none won, the worst differential in the league, three of the six in added time. Fourth: deliver away from Lee Jung-taek and Byun Jun-soo, the only two outfield players above 50% in the air; every other regular is at 43% or below, including the 186cm forward who plays the most minutes. Fifth: reach the byline, where crosses convert at 4.2% against 1.4% from early positions. Then four plans the data rejects and that would waste a training week: pressing their build-up (their pass-failure rate is lower than their opponents\u2019 in every third), waiting for them to sit deep (the block moves one metre between score states), targeting a left-right bias (my own finding, withdrawn), and countering from their corners (82 deliveries, zero shots against within 25 seconds). Ends with a one-page dressing-room summary.",
      ko: "같은 29경기를, 김천을 상대할 구단의 분석관이 감독에게 올리는 문서로 다시 썼다. 데이터가 지지하는 순서대로 공략 지점 다섯 개. 첫째, 그들이 먼저 넣게 두어도 된다 \u2014 리드 중 90분당 2.58실점(기대 1.42, 포아송 p=0.027)인데 동점과 열세에서는 오히려 기대보다 덜 먹는다. 그들이 앞서고 우리가 쫓는 그림이 우리에게 유리하다는 뜻이다. 둘째, 데드볼을 만들어라. 득실차 \u22128의 전부가 정지 상황이고(세트피스 2:13, 오픈플레이 26:23) 세트피스 실점 8건 중 7건이 데드볼 3초 이내에 끝났다. 셋째, 박스 안에서 접촉을 만들어라 \u2014 피PK 6, 획득 0, 리그 최악의 \u22126이고 그중 3개가 추가시간이다. 넷째, 이정택과 변준수만 피해서 올려라. 공중볼 50%를 넘기는 필드 플레이어가 그 둘뿐이고 나머지는 전원 43% 이하다. 출전 시간이 가장 긴 186cm 공격수도 39.2%다. 다섯째, 골라인까지 파고들어라 \u2014 전환율 4.2% 대 1.4%. 그리고 훈련 한 주를 낭비하게 될 계획 네 가지를 기각 근거와 함께 적었다. 빌드업 압박(그들의 패스 실패율이 전 구역에서 상대보다 낮다), 내려앉을 거라는 가정(블록이 1m만 움직인다), 좌우 편향 공략(내가 냈다가 철회한 발견), 그들 코너에서의 역습 설계(배달 82개 이후 25초 내 우리 슛 0회). 마지막은 라커룸에 붙이는 한 장 요약이다.",
    },
    blurb: {
      en: "The same dataset, written as a pre-match briefing for whoever plays them next. Five ways in \u2014 and four plans the data rejects, including one of my own.",
      ko: "같은 데이터를 김천을 상대할 팀의 경기 전 브리핑으로 다시 썼다. 공략 지점 다섯 개, 그리고 기각된 계획 네 개. 내가 낸 것 하나를 포함해서.",
    },
    stats: {
      en: [["2.58 vs 1.42", "conceded vs expected per 90 while leading"], ["6 / 0", "penalties conceded / won, worst in the league"], ["39.1%", "aerial win rate in the attacking third"], ["45\u201375\u2032", "17 of 36 goals conceded"]],
      ko: [["2.58 vs 1.42", "리드 중 90분당 실점과 기대실점"], ["6 / 0", "피PK와 획득PK, 리그 최악"], ["39.1%", "공격 진영 공중볼 승률"], ["45\u201375\ubd84", "36실점 중 17실점"]],
    },
  },
  {
    slug: "daejeon",
    no: "09",
    publishedAt: "2026-09-11",
    competition: {
      en: "K League 1 2026 · Daejeon Hana Citizen · 27 matches, 40,130 events",
      ko: "하나은행 K리그1 2026 · 대전하나시티즌 · 27경기 · 이벤트 40,130건",
    },
    title: {
      en: "Nine Silences",
      ko: "아홉 번의 침묵",
    },
    sub: {
      en: "Third in the league for entering the final third, sixth for shooting. The problem was never arriving but what followed. Nine of 27 matches ended goalless and all nine fall before R19 — and opponents did not lock the game: the height of their defensive actions was 67.4 in those matches against 68.6 in the rest. Control for the time confound and for the circularity of comparing a 0-0 phase that ends when the goal goes in, and a fixed opening 15-minute window says the same thing. Passes differ by 11%, entries by 11%, and left-side key passes run 0.67 against 6.00. The silences had begun by the fifteenth minute. After R20 there was never another. Restricted to the seven clubs played in both halves, goals went 1.36 to 2.12 and xG per shot 0.114 to 0.144 — while the number of shots barely moved, 11.45 to 11.75. What changed was location: shots inside 12m rose 81%, from 2.69 to 4.87, while shots beyond 25m actually increased. They did not stop shooting from range; they gained shots from close in. Nobody was signed. Every second-half regular was already there in R1. Lee Myung-jae (16) went from 42% to 88% full matches, the left-side key passes gathered from five players into his 42%, and the people standing in the box settled with them. But the obvious explanation — continuity restores sharpness — does not survive testing: across 24,894 player-matches in three seasons, 493 within-player cases give +0.04pp and p = 0.75. Form attached to the connection, not to the players.",
      ko: "파이널서드에 리그 3위로 들어가면서 슛은 6위다. 들어가는 능력이 아니라 도착한 뒤가 문제인 팀이다. 27경기 중 9경기가 무득점이고, 그 아홉 번이 전부 R19 이전에 몰려 있다. 상대가 잠근 것이 아니다 — 상대 수비 액션의 높이는 무득점 67.4, 득점 68.6으로 사실상 같았다. 시기 교란과 순환을 모두 통제하고 경기 시작 15분 고정창으로 다시 재도 결과는 같다. 패스는 11%, 진입도 11%밖에 차이나지 않는데 왼쪽 키패스가 0.67 대 6.00이다. 아홉 번의 침묵은 킥오프 15분부터 이미 시작돼 있었다. R20 이후에는 한 번도 없었다. 전·후반기에 모두 만난 7개 팀으로 좁혀도 득점 1.36→2.12, 슛당 xG 0.114→0.144다. 그런데 슛 개수는 11.45→11.75로 거의 그대로다. 바뀐 것은 자리다 — 12m 안쪽 슛이 2.69→4.87회로 81% 늘고, 25m 밖은 오히려 늘었다. 먼 슛을 참은 게 아니라 가까운 슛이 생겼다. 그 사이 영입은 0명이고 후반기 주전은 전원 R1부터 있던 선수다. 이명재(16)의 풀타임 비율이 42%에서 88%로 오르며 왼쪽 키패스가 다섯 명 분산에서 그 한 명 42%로 모였고, 박스 안에 서는 사람도 같이 고정됐다. 다만 「꾸준히 뛰면 폼이 오른다」는 설명은 2024~2026 세 시즌 12개 구단 24,894행에서 검정하면 사라진다(493건, +0.04%p, p=0.75). 폼은 개인이 아니라 연결에 붙었다.",
    },
    blurb: {
      en: "Third in the league for entering the final third, sixth for shooting. All nine goalless matches fall before R19 — and the silence had already begun by the fifteenth minute.",
      ko: "파이널서드에는 리그 3위로 들어가는데 슛은 6위다. 무득점 9경기는 전부 R19 이전이고, 그 침묵은 킥오프 15분부터 시작돼 있었다.",
    },
    stats: {
      en: [["0.059", "shots per final-third action, 11th of 12"], ["0.67 vs 6.00", "left-side key passes, first 15 minutes"], ["+81%", "shots from inside 12m, second half of the season"], ["p = 0.75", "continuity effect on passing, 493 within-player cases"]],
      ko: [["0.059", "파이널서드 활동 1회당 슛, 12팀 중 11위"], ["0.67 vs 6.00", "경기 시작 15분 왼쪽 키패스"], ["+81%", "후반기 12m 안쪽 슛"], ["p = 0.75", "연속 출전 효과, 선수 고정효과 493건"]],
    },
  },
  {
    slug: "gwangju-end",
    no: "08",
    publishedAt: "2026-09-11",
    competition: {
      en: "K League 1 2026 · Gwangju FC · score state controlled · league pool 110 matches, 158,043 events",
      ko: "하나은행 K리그1 2026 · 광주FC · 스코어 상태 통제 · 리그 풀링 110경기 · 이벤트 158,043건",
    },
    title: {
      en: "No One at the End",
      ko: "통로 끝에 아무도 없다",
    },
    sub: {
      en: "Episode 7 pointed at the defenders. That was a symptom, not an answer. Control for score state and the picture inverts. Split the −4.6pp progression gap while behind by standardisation and the distribution effect is +0.06pp — effectively zero, meaning changing who receives the ball will not move it. The gap sits entirely in execution, and the midfielders are at 20.1% against the league’s 20.3%. That leaves the defenders, and they are not the cause either. League defenders, once behind, play into the final third more often (15.4→17.9%) and more successfully (61.5→72.5%), because the opponent drops off. Gwangju attempt fewer (14.1→11.2%) and complete fewer of those (63.7→59.7%) — yet at level score they complete 63.7% against the league’s 61.5%. If technique were the constraint, completion would move the same way. It is empty ahead of them: 116 final-third events per 90 while behind is last of 12, and the gap to 11th-placed Bucheon on 180 is wider than Bucheon to Seoul in first. Middle-third activity in the same phase is 323 against 348, a 7% difference, so it is not a shortage of the ball. Rebuild the measure from events our own passing cannot create — pressing, duels and fouls won in the final third — and Gwangju are still last, 20.7 against 32.8, correlating with progression at +0.68 across the 12 clubs. They are the only side whose share of play in the final third fails to rise when they fall behind: +1.1pp against a league average of +6.7pp. The passers are already here — five of them progress at 24.6% while behind, above the league midfield average of 20.3%, and most are playing now. At Seoul in R14, over the 48 minutes after conceding in the 48th, the final-to-middle ratio went from 0.205 to 0.636, clearing the league’s behind-state average of 0.607. Same evening, same squad. Where the data stops is headcount: a player who never touches the ball still does not exist in it.",
      ko: "7편은 광주의 통로가 닫힌 이유로 수비수를 지목했다. 그건 답이 아니라 증상이었다. 스코어 상태를 통제하고 다시 들어가면 그림이 뒤집힌다. 열세 국면 전달률 격차 −4.6pp를 표준화로 쪼개면 배분 효과는 +0.06pp, 사실상 0이다 — 공을 누구에게 쥐여줄지 바꿔도 움직이지 않는다는 뜻이다. 격차는 전부 수행 쪽이고, 미드필더는 20.1%로 리그 20.3%와 같다. 남는 건 수비수인데 그들도 원인이 아니다. 리그 수비수는 지고 있을 때 final third로 더 자주 넣고(15.4→17.9%) 더 잘 통한다(61.5→72.5%). 상대가 물러서기 때문이다. 광주는 덜 넣고(14.1→11.2%) 시도한 것마저 덜 통한다(63.7→59.7%). 그런데 동점일 때 광주의 성공률은 63.7%로 리그 61.5%보다 높다. 기술이 문제라면 성공률이 같은 방향으로 움직여야 한다. 앞이 비어 있기 때문이다 — 열세 국면 final third 활동 116회/90분은 리그 최하위이고, 11위 부천 180과의 거리가 부천부터 1위 서울까지의 거리보다 멀다. 같은 국면 middle third는 323 대 348로 7% 차이뿐이니 점유 부족이 아니다. 우리 패스와 무관한 지표(final third에서의 압박·경합·파울획득)로 다시 재도 20.7 대 32.8로 최하위이고, 12팀 횡단면 상관은 +0.68이다. 지고 있을 때 무게를 앞으로 옮기지 않는 팀은 리그에서 광주뿐이다 — final third 비중 변화 +1.1pp, 리그 평균 +6.7pp. 그리고 전달할 선수는 이미 있다. 다섯 명이 열세에서 24.6%로 리그 미드필더 평균 20.3%를 넘고, 대부분 지금 뛴다. R14 서울전 후반 48분에 실점한 뒤 48분 동안 final third : middle third 비율이 0.205에서 0.636으로 올라 리그 열세 평균 0.607을 넘겼다. 같은 저녁, 같은 선수단이다. 데이터가 멈추는 곳은 인원이다 — 볼을 만지지 않은 선수는 여전히 이 데이터에 없다.",
    },
    blurb: {
      en: "Episode 7 pointed at the defenders. Control for score state and they turn out to be a symptom — what is actually missing is anyone at the end of the channel.",
      ko: "7편이 지목한 수비수는 원인이 아니라 증상이었다. 스코어 상태를 통제하면 문제는 통로 끝의 빈 공간으로 옮겨간다.",
    },
    stats: {
      en: [["+0.06pp", "of the \u22124.6pp progression gap that distribution explains"], ["20.1% vs 20.3%", "midfield progression while behind, Gwangju vs league"], ["116 vs 220", "final-third events per 90 while behind, 12th of 12"], ["0.205 \u2192 0.636", "final : middle ratio after conceding, R14 at Seoul"]],
      ko: [["+0.06pp", "\u22124.6pp 전달률 격차 중 배분 효과"], ["20.1% vs 20.3%", "열세 국면 미드필더 전달률, 광주와 리그"], ["116 vs 220", "열세 국면 final third 활동 90분당, 리그 12위"], ["0.205 \u2192 0.636", "R14 서울전 실점 후 final : middle 비율"]],
    },
  },
  {
    slug: "gwangju",
    no: "07",
    publishedAt: "2026-09-10",
    competition: {
      en: "K League 1 2026 · Gwangju FC · 27 matches, 38,899 events",
      ko: "하나은행 K리그1 2026 · 광주FC · 27경기 · 이벤트 38,899건",
    },
    title: {
      en: "Gwangju When Behind",
      ko: "지고 있을 때의 광주",
    },
    sub: {
      en: "The sentence you hear is \u201cthey survived on teenagers, then signed heavily and still can\u2019t win\u201d. The first half checks out \u2014 a FIFA registration ban ran from September 2025 to June 2026, and Gwangju alone used 53.3% of every under-19 minute played in the league. The second half is wrong. Against the ten clubs they met in both halves of the season, shots rose 26%, xG 49% and goals conceded fell 28%; box shots went up 67% and expected points 33%. Actual points went 0.47 to 0.50. Exactly one number never moved: middle-third possession converted into final-third entries, 0.11 both before and after twelve new players debuted. Their progression rate of 10.4% is 12th of 12 \u2014 while their volume of middle-third passing is 7th. Defender share of the middle third is not the cause; Incheon, Seoul and Pohang all give their defenders as much of it. What separates them is that Gwangju\u2019s defenders progress at 8.7% against Gangwon\u2019s 16.4%. And the decisive split is score state: league defenders raise their progression rate by 3.6 points when losing, Gwangju\u2019s drop 2.6, and seven of their nine defenders move the same way. Match the distance and the lane and Gwangju\u2019s defenders equal the league or beat it \u2014 so this is a choice about direction, not a limit of technique. Where it stops is off the ball: a player who never touches it does not exist in this data.",
      ko: "가장 많이 쓰이는 문장은 \u201c어린 선수로 버티다 여름에 보강했는데도 안 된다\u201d이다. 앞의 절반은 맞다 \u2014 FIFA 선수등록 금지가 2025년 9월부터 2026년 6월까지 이어졌고, 리그 전체 U19 출전 지분의 53.3%를 광주 혼자 썼다. 뒤의 절반은 틀렸다. 전·후반기 모두 만난 10개 팀 기준으로 슛 +26%, xG +49%, 실점 −28%였고 박스 안 슛은 +67%, 기대 승점은 +33%였다. 실제 승점은 0.47에서 0.50으로 갔다. 27경기 내내 한 번도 안 움직인 숫자는 하나다 \u2014 중앙 지역 진입당 전달 0.11, 선수 12명이 데뷔한 전후가 소수점 둘째 자리까지 같다. 전달률 10.4%는 리그 12위인데 중앙 지역 패스 총량은 7위다. 수비수가 중앙을 점유해서가 아니다. 인천\u00b7서울\u00b7포항도 똑같이 점유한다. 갈리는 건 그 수비수의 전달률이고, 광주 8.7% 대 강원 16.4%다. 결정적인 건 스코어 상태다 \u2014 리그 수비수는 지고 있을 때 전달률을 3.6%p 올리는데 광주 수비수는 2.6%p 내리고, 아홉 명 중 일곱 명이 같은 방향으로 움직인다. 같은 거리\u00b7같은 레인으로 맞추면 광주 수비수도 리그와 같거나 낫다 \u2014 기술이 아니라 방향의 선택이다. 데이터가 멈추는 곳은 오프더볼이다. 볼을 만지지 않은 선수는 이 데이터에 존재하지 않는다.",
    },
    blurb: {
      en: "Twelve players debuted in the summer and almost every number improved. The points did not — and neither did one number, 0.11, from start to finish.",
      ko: "여름에 12명이 데뷔했고 슛·xG·실점이 모두 좋아졌다. 승점만 그대로였고, 27경기 내내 0.11 하나가 움직이지 않았다.",
    },
    stats: {
      en: [["+33% vs +0.03", "gain in expected points vs actual points"], ["0.11 \u2192 0.11", "middle-third progression per entry, unchanged"], ["8.7%", "defender progression rate, 12th of 12"], ["+3.6 vs \u22122.6", "change when losing, league vs Gwangju defenders"]],
      ko: [["+33% vs +0.03", "기대 승점 상승분과 실제 승점 상승분"], ["0.11 \u2192 0.11", "중앙 지역 진입당 전달, 27경기 불변"], ["8.7%", "수비수 전달률, 리그 12위"], ["+3.6 vs \u22122.6", "지고 있을 때, 리그와 광주 수비수"]],
    },
  },
  {
    slug: "jeju",
    no: "06",
    publishedAt: "2026-09-09",
    competition: {
      en: "K League 1 2026 · Jeju SK · 27 matches, 38,432 events",
      ko: "하나은행 K리그1 2026 · 제주SK · 27경기 · 이벤트 38,432건",
    },
    title: {
      en: "The risk they never bought, the chances they never got",
      ko: "사지 않은 위험, 사지 못한 기회",
    },
    sub: {
      en: "Jeju absorb organised attacks better than anyone in the league — they allowed 140 shots and 15.80 xG from opponents' slow build and conceded seven, 0.44× the expected rate. What beats them is the counter: 42% of goals conceded, at 1.88× expected. The first draft blamed the goalkeeper, and it was wrong twice over. Wrong once because the definition of \u201closing the ball\u201d had included lost duels — 118 of 129 duel losses in their own last third happened while the opponent already had the ball, and stripping them out cut the danger of a deep turnover from 5.1% to 1.5%, level with every other zone. Wrong again because Kim Dong-jun completes 45.1% of his passes over 30m, fourth of 11 keepers in a merged 73-match benchmark, and his 221 losses produced zero goals. The counters begin somewhere specific: a short forward pass in the defensive third, where Jeju fail 30.0% against opponents' 17.9% — and in the two box corners, more than half the time. Adjust for location across 18 cells and one man is cleared while four are not. Going long costs nothing and returns 0.061 shots per phase. That is what nine draws are made of.",
      ko: "제주는 상대가 조립해 들어오는 공격을 리그에서 가장 잘 막는다 — 상대 지공에서 슛 140개와 xG 15.80을 허용하고 7골만 먹었다. 기대의 0.44배다. 뚫리는 건 역습뿐이고, 실점의 42%가 거기서 기대의 1.88배로 나왔다. 1차 초안은 골키퍼를 지목했고 두 번 틀렸다. 한 번은 ‘볼 상실’의 정의에 경합 패배를 넣었기 때문이다 — 최후방 경합 상실 129회 중 118회는 이미 상대 공격 중이었고, 그걸 빼면 깊은 상실의 위험도가 5.1%에서 1.5%로 떨어져 다른 구간과 같아진다. 또 한 번은 김동준의 30m 이상 패스 성공률이 45.1%로 병합 73경기 벤치마크에서 11명 중 4위이고, 그가 잃은 221회에서 나온 실점이 0이기 때문이다. 역습의 기점은 따로 있다 — 디펜시브 서드에서 앞으로 붙이는 짧은 패스다. 제주 30.0%, 상대 17.9%. 박스 양옆 구석에서는 절반 넘게 끊긴다. 18칸으로 자리를 보정하면 한 명은 누명을 벗고 네 명이 남는다. 길게 차는 건 공짜이고, 그리고 국면당 0.061슛을 낳는다. 그게 무승부 아홉 번의 정체다.",
    },
    blurb: {
      en: "Nobody in the league absorbs organised attacks better; only the counter beats them. The first draft blamed the goalkeeper and was wrong twice over.",
      ko: "지공은 리그에서 가장 잘 막고 역습에만 뚫린다. 1차 초안이 지목한 골키퍼는 두 번 틀렸다.",
    },
    stats: {
      en: [["0.44×", "goals conceded vs xG from opponents' slow build"], ["0 of 11", "counter goals originated by the goalkeeper"], ["30.0% vs 17.9%", "short forward pass failure, defensive third"], ["0.061", "shots per fast-break phase"]],
      ko: [["0.44배", "상대 지공 기대 대비 실점"], ["11중 0", "골키퍼가 기점인 역습 실점"], ["30.0% vs 17.9%", "디펜시브 서드 전진 패스 실패율"], ["0.061", "역습형 국면당 슛"]],
    },
  },
  {
    slug: "pohang",
    no: "05",
    publishedAt: "2026-09-07",
    competition: {
      en: "K League 1 2026 \u00b7 Pohang Steelers \u00b7 27 matches, 38,362 events",
      ko: "\ud558\ub098\uc740\ud589 K\ub9ac\uadf81 2026 \u00b7 \ud3ec\ud56d \uc2a4\ud2f8\ub7ec\uc2a4 \u00b7 27\uacbd\uae30 \u00b7 \uc774\ubca4\ud2b8 38,362\uac74",
    },
    title: {
      en: "Pohang get to the final third. Then they stop.",
      ko: "\ud3ec\ud56d\uc740 final third\uae4c\uc9c0 \uac04\ub2e4. \uadf8\ub9ac\uace0 \uac70\uae30\uc11c \uba48\ucd98\ub2e4.",
    },
    sub: {
      en: "Twenty-four goals is 11th in K League 1, and this team is 7th. Two answers came first and both were wrong \u2014 \u201cthe goals vanish at home\u201d is really \u201cthey played no home games during the good spell\u201d, and \u201copponents sit deeper at the Steelyard\u201d disappears the moment you cut to the window before the first goal. On the time axis the season splits in three: blocks 1 and 2 created the same amount (1.44 and 1.41 xG a match) and only the finishing differed, so the early drought was a number waiting to come back. Block 3 is a different kind of thing \u2014 creation itself fell 34%. Lee Ho-jae left for Darmstadt on 29 July, and since then shots (10.3 \u2192 10.6) and final third passes (118 \u2192 131) have both risen while the share of shots taken inside the box collapsed from 71% to 58%. He had 24.2% of the team's box shots and the second name on that list is a centre-back, 32% of whose shots follow a set piece. The crosses went up 15% and the aerial duels fell 30%. 109 corners have produced one goal all season \u2014 with a 191cm target man in the side. The transfer did not create the problem; it published it.",
      ko: "24\ub4dd\uc810\uc740 \ub9ac\uadf8 11\uc704\uc778\ub370 \uc21c\uc704\ub294 7\uc704\ub2e4. \uba3c\uc800 \ub098\uc628 \ub450 \uac1c\uc758 \ub2f5\uc740 \ub458 \ub2e4 \ud2c0\ub838\ub2e4 \u2014 \u201c\ud648\uc5d0\uc11c \uace8\uc774 \uc0ac\ub77c\uc9c4\ub2e4\u201d\ub294 \uc0ac\uc2e4 \u201c\uc798\ud558\ub358 \uc2dc\uae30\uc5d0 \ud648 \uacbd\uae30\uac00 \ud558\ub098\ub3c4 \uc5c6\uc5c8\ub2e4\u201d\uc600\uace0, \u201c\ud648\uc5d0\uc11c \uc0c1\ub300\uac00 \ub0b4\ub824\uc549\ub294\ub2e4\u201d\ub294 \uccab \uace8 \uc774\uc804 \uad6c\uac04\ub9cc \uc790\ub974\uba74 \uc0ac\ub77c\uc84c\ub2e4. \uc2dc\uac04\ucd95\uc73c\ub85c \ubcf4\uba74 \uc2dc\uc98c\uc740 \uc138 \uad6c\uac04\uc774\ub2e4. 1\u00b72\uad6c\uac04\uc740 \uacbd\uae30\ub2f9 xG 1.44\uc640 1.41\ub85c \uac19\uc740 \uc591\uc744 \ub9cc\ub4e4\uc5c8\uace0 \uacb0\uacfc\ub9cc \ub2ec\ub790\ub2e4 \u2014 \ucd08\ubc18\uc758 \ubd80\uc9c4\uc740 \ub418\ub3cc\uc544\uc62c \uac12\uc774\uc5c8\ub2e4. 3\uad6c\uac04\uc740 \uc885\ub958\uac00 \ub2e4\ub974\ub2e4 \u2014 \ub9cc\ub4dc\ub294 \uc591 \uc790\uccb4\uac00 34% \ubb34\ub108\uc84c\ub2e4. 7\uc6d4 29\uc77c \uc774\ud638\uc7ac\uac00 \ub2e4\ub984\uc288\ud0c0\ud2b8\ub85c \ub5a0\ub09c \ub4a4, \uc219(10.3 \u2192 10.6)\ub3c4 final third \ud328\uc2a4(118 \u2192 131)\ub3c4 \ub298\uc5c8\ub294\ub370 box \uc548 \uc219 \ube44\uc911\ub9cc 71%\uc5d0\uc11c 58%\ub85c \ubb34\ub108\uc84c\ub2e4. \uadf8\uac00 \ud300\uc758 box \uc548 \uc219 24.2%\ub97c \uac00\uc84c\uace0, \ub450 \ubc88\uc9f8 \uc774\ub984\uc740 \uc0ac\uc2e4\uc0c1 set piece \uc804\uc6a9\uc778 \uc13c\ud130\ubc31\uc774\ub2e4. \ud06c\ub85c\uc2a4\ub294 15% \ub298\uace0 aerial duel\uc740 30% \uc904\uc5c8\ub2e4. \ucf54\ub108\ud0b9 109\uac1c\uc5d0\uc11c \ub098\uc628 \uace8\uc740 \ud55c \uac1c\ub2e4 \u2014 191cm target man\uc744 \ub370\ub9ac\uace0. \uc774\uc801\uc740 \ubb38\uc81c\ub97c \ub9cc\ub4e0 \uac8c \uc544\ub2c8\ub77c \ub4dc\ub7ec\ub0c8\ub2e4.",
    },
    blurb: {
      en: "After Lee Ho-jae left for Darmstadt, shots and final-third passes both rose while the share of shots taken inside the box fell from 71% to 58%.",
      ko: "final third까지는 간다. 이호재가 떠난 뒤 슛도 패스도 늘었는데 박스 안 슛 비중만 71%에서 58%로 무너졌다.",
    },
    stats: {
      en: [["71% \u2192 58%", "share of shots taken inside the box"], ["1.44 / 1.41 / 0.93", "xG per match, three blocks"], ["24.2%", "one player's share of box shots"], ["109 \u2192 1", "corners to goals, all season"]],
      ko: [["71% \u2192 58%", "box \uc548 \uc219 \ube44\uc911"], ["1.44 / 1.41 / 0.93", "\uacbd\uae30\ub2f9 xG, \uc138 \uad6c\uac04"], ["24.2%", "\ud55c \uba85\uc774 \uac00\uc9c4 box \uc548 \uc219 \uc9c0\ubd84"], ["109 \u2192 1", "\ucf54\ub108\ud0b9\uacfc \uadf8\uc5d0\uc11c \ub098\uc628 \uace8"]],
    },
  },
  {
    slug: "jeonbuk",
    no: "04",
    publishedAt: "2026-09-07",
    competition: {
      en: "K League 1 2026 · Jeonbuk Hyundai · 27 matches, 38,079 events",
      ko: "하나은행 K리그1 2026 · 전북 현대 · 27경기 · 이벤트 38,079건",
    },
    title: {
      en: "Jeonbuk defend with possession. The same possession works against them going forward.",
      ko: "전북은 소유로 수비한다. 그 소유가 공격에서는 반대로 작동한다.",
    },
    sub: {
      en: "Jeonbuk make fewer defensive actions than almost anyone in K League 1 and concede the second fewest goals. That is not bad-team arithmetic — divide by exposure and their defensive volume is third in the league, with a lower PPDA than their opponents. There is simply less to defend. But the same possession inverts at the other end. Split the season into possession phases and Jeonbuk are two teams: fast breaks return 1.90× their expected goals — better than Ulsan's 1.60× — while slow build returns 0.37× against Ulsan's 0.78×. The share of shots reaching the target is identical; only the share that goes in is halved. All 12.2 of the goals they have lost are in slow build, and the loss is attached to the phase, not the player — Mota and Lee Dong-jun have 36 shots and no goals from slow build, and score to expectation on the break. The first answer this piece found, \u201cthey win with less of the ball\u201d, was a scoreboard artefact, and the wrong turn is left in.",
      ko: "수비 행위는 리그 최하위권인데 실점은 두 번째로 적다. 못하는 팀의 산술이 아니다 \u2014 노출로 나누면 수비량은 리그 3위이고 PPDA는 상대보다 낮다. 수비할 일이 적을 뿐이다. 그런데 같은 소유가 반대편에서는 거꾸로 작동한다. 시즌을 소유 국면으로 쪼개면 전북은 두 팀이다. 역습 국면은 기대의 1.90배를 넣어 울산(1.60배)보다도 좋고, 지공 국면은 0.37배다(울산 0.78배). 유효슛을 만드는 비율은 같고 골이 되는 비율만 절반이다. 잃은 골 12.2개가 전부 지공에 있으며, 그 손실은 선수가 아니라 국면에 붙어 있다 \u2014 모따와 이동준은 지공에서 36슛 0골이지만 역습에서는 기대대로 넣는다. 이 글이 처음 찾은 답 \u201c볼을 많이 가지면 못 이긴다\u201d는 스코어보드가 만든 착시였고, 틀린 과정을 지우지 않고 남겼다.",
    },
    blurb: {
      en: "Almost the fewest defensive actions in K League 1 and the second-fewest goals conceded. The same possession inverts at the other end.",
      ko: "수비 행위는 리그 최하위권인데 실점은 두 번째로 적다. 그런데 같은 소유가 공격에서는 거꾸로 작동한다.",
    },
    stats: {
      en: [["11th → 3rd", "defensive volume, per opponent pass"], ["1.90× / 0.37×", "fast break vs slow build, goals ÷ xG"], ["12.1% / 23.7%", "on-target → goal, slow build vs Ulsan"], ["12.2 goals", "all of the shortfall, in slow build"]],
      ko: [["11위 → 3위", "노출로 나눈 수비량"], ["1.90배 / 0.37배", "역습 대 지공, 골 ÷ xG"], ["12.1% / 23.7%", "유효슛→골, 지공 대 울산 지공"], ["12.2골", "잃은 골 전부가 지공에"]],
    },
  },
  {
    slug: "ulsan",
    no: "03",
    publishedAt: "2026-09-05",
    competition: {
      en: "K League 1 2026 · Ulsan HD · 26 matches, 38,593 events",
      ko: "하나은행 K리그1 2026 · 울산 HD · 26경기 · 이벤트 38,593건",
    },
    title: {
      en: "Ulsan create the most in the league, and the latest.",
      ko: "울산은 가장 많이 만들고, 가장 늦게 만든다.",
    },
    sub: {
      en: "A team second on points has a goal difference of +4. That single number started this. Ulsan lead K League 1 for key passes and shots on target, they take half their shots within three passes of winning the ball, and they create 1.7× as much after the break as before it — whatever the half-time score. Yet they have never won from behind at half-time: 0 wins in 7. They score at 0.95 of expected and concede at 1.09, and the leak is at the edge of the box. The first two answers this piece found — “they win with less of the ball”, “fewer entries, more shots” — both turned out to be artefacts of the scoreline, and the wrong turns are left in.",
      ko: "승점 2위 팀의 득실차가 +4다. 그 숫자 하나에서 시작했다. 키패스와 유효슈팅이 리그 1위이고, 슛의 절반이 공을 되찾은 뒤 3패스 안에 나오며, 하프타임 스코어와 무관하게 후반에 전반의 1.7배를 만든다. 그런데 전반에 뒤진 7경기에서 한 번도 이기지 못했다. 골은 기대의 0.95배, 실점은 1.09배 — 새는 곳은 페널티 박스 언저리다. 이 글이 처음 찾은 두 개의 답, “점유율이 낮을 때 이긴다”와 “적게 들어가고 많이 쏜다”는 둘 다 스코어보드가 만든 착시였고, 틀린 과정을 지우지 않고 그대로 남겼다.",
    },
    blurb: {
      en: "First in the league for key passes and shots on target, with a goal difference of +4. Seven matches behind at half-time, zero wins.",
      ko: "키패스와 유효슈팅이 리그 1위인데 득실차는 +4다. 전반에 뒤진 7경기에서 한 번도 이기지 못했다.",
    },
    stats: {
      en: [["1st / 1st", "key passes / shots on target"], ["1.7×", "second-half xG vs first"], ["0 in 7", "wins from behind at half-time"], ["1.45×", "conceded vs xG at the box edge"]],
      ko: [["1위 / 1위", "키패스 / 유효슈팅"], ["1.7배", "전반 대비 후반 xG"], ["7경기 0승", "전반에 뒤진 경기"], ["1.45배", "박스 언저리 실점/피xG"]],
    },
  },
  {
    slug: "fcseoul",
    no: "02",
    publishedAt: "2026-09-05",
    competition: {
      en: "K League 1 2026 · FC Seoul · 25 matches, 34,518 events",
      ko: "하나은행 K리그1 2026 · FC서울 · 25경기 · 이벤트 34,518건",
    },
    title: {
      en: "Seoul do not do more. They score more.",
      ko: "서울은 더 많이 하지 않는다. 더 많이 넣는다.",
    },
    sub: {
      en: "They are a possession side — 56.0%, short out of the back. But the further forward they go the wider they are pushed: 82% of their entries into the final third come down a channel, 66% of their box entries are crosses, and 46.5% of those crosses are cleared or blocked before they become anything. The volume of chances they build is level with the 2nd and 3rd best in the league. The points are 15 clear. The difference is made at the last touch — and whether that is skill or variance is the one question this piece refuses to settle.",
      ko: "공을 갖는 팀이 맞다 — 점유율 56.0%, 뒤에서는 짧게 나간다. 그런데 앞으로 갈수록 옆으로 밀린다. 파이널서드 진입의 82%가 좌우 채널이고, 박스 투입의 66%가 크로스이며, 그 크로스의 46.5%는 슈팅이 되기 전에 잘린다. 만들어낸 기회의 양은 리그 2·3위와 거의 같다. 승점은 15점 앞선다. 차이는 마지막 한 번에서 났다 — 그것이 실력인지 우연인지만은 이 글이 끝까지 결론 내리지 않는다.",
    },
    blurb: {
      en: "They build about as many chances as the second and third best sides in the league, and lead by 15 points. The difference is made at the last touch.",
      ko: "만들어낸 기회의 양은 리그 2·3위와 거의 같은데 승점은 15점 앞선다. 차이는 마지막 한 번에서 났다.",
    },
    stats: {
      en: [["18%", "final-third entries through the middle"], ["46.5%", "crosses cleared or blocked"], ["43.5%", "shots on target → goals (1st)"], ["+0.41", "xG difference per match"]],
      ko: [["18%", "파이널서드 진입 중 중앙"], ["46.5%", "잘려나간 크로스"], ["43.5%", "유효슛당 득점 (리그 1위)"], ["+0.41", "경기당 xG 차이"]],
    },
  },
  {
    slug: "hwaseong",
    no: "01",
    publishedAt: "2026-09-04",
    competition: {
      en: "K League 2 2026 · Hwaseong FC · 23 matches, 33,522 events",
      ko: "하나은행 K리그2 2026 · 화성FC · 23경기 · 이벤트 33,522건",
    },
    title: {
      en: "Hwaseong are not a side that holds the ball",
      ko: "화성은 공을 갖는 팀이 아니라 공을 쓰는 팀이다",
    },
    sub: {
      en: "They attempt the second-fewest passes in the league and get more box shots out of each one than anybody. Their long-pass share is third-highest while their duel count is the lowest and their offside count the highest — the ball goes behind the line, not into a body. And the football only completes itself after the break: 86 shots in first halves become 154 in second halves, with possession unchanged at 45%. Nine figures, and the four matches that show it best.",
      ko: "리그에서 두 번째로 패스를 적게 하면서 패스 한 번당 박스 안 슈팅은 가장 많이 만든다. 긴 패스는 리그 3위인데 몸싸움은 리그에서 가장 적고 오프사이드는 가장 많다 — 사람에게 붙이지 않고 뒷공간으로 보낸다는 뜻이다. 그리고 이 축구는 후반에 완성된다. 점유율은 45%로 그대로인 채 전반 슈팅 86개가 후반 154개가 된다. 그림 9종과, 그것을 가장 잘 보여주는 4경기.",
    },
    blurb: {
      en: "Second-fewest passes in the league, most box shots per pass. And the football only completes itself after the break.",
      ko: "패스는 리그에서 두 번째로 적은데 패스당 박스 안 슛은 가장 많다. 그리고 이 축구는 후반에 완성된다.",
    },
    stats: {
      en: [["16th / 1st", "passes / box shots per pass"], ["last / 1st", "duels / offsides"], ["86 → 154", "shots, 1st half → 2nd"], ["−0.05", "possession vs points"]],
      ko: [["16위 / 1위", "패스량 / 패스당 박스슛"], ["최하위 / 1위", "경합 / 오프사이드"], ["86 → 154", "전반 → 후반 슈팅"], ["−0.05", "점유율과 승점 상관"]],
    },
  },
];

const COPY = {
  eyebrow: { en: "02 / What the data says", ko: "02 / 데이터가 말하는" },
  title1: { en: "One club,", ko: "한 팀을" },
  title2: { en: "read all the way through.", ko: "끝까지 읽어본다" },
  intro: {
    en: "A series that takes one club or one competition and reads it to the end using nothing but public data. Every source, every definition of mine, and every question the data could not answer is written into each piece.",
    ko: "한 팀 또는 한 대회를 공개 데이터만으로 끝까지 읽어보는 연재. 모든 수치의 출처와 내가 만든 정의, 그리고 데이터가 답하지 못한 지점까지 매 편에 함께 적는다.",
  },
  next: {
    en: "Next episodes are being collected. Suggestions welcome.",
    ko: "다음 편은 수집 중입니다. 보고 싶은 팀이 있으면 알려주세요.",
  },
} as const;

function EpisodeRow({ ep }: { ep: Episode }) {
  const locale = useLocale();
  return (
    <Link href={`/match-analysis/data-series/${ep.slug}`} className="list-row">
      <span className="lr-lead display shrink-0 pt-0.5" style={{ fontSize: 15, width: 30, letterSpacing: "-0.02em" }}>
        {ep.no}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
          <span className="mono truncate" style={{ fontSize: 10, letterSpacing: ".07em", color: "var(--ink-4)", maxWidth: "100%" }}>
            {ep.competition[locale]}
          </span>
          {ep.companion && (
            <span className="mono px-1.5 rounded-full" style={{ fontSize: 8.5, letterSpacing: ".12em", border: "0.5px solid var(--edge)", color: "var(--ink-3)" }}>
              {ep.companion[locale]}
            </span>
          )}
          {ep.koOnly && locale === "en" && (
            <span className="mono px-1.5 rounded-full" style={{ fontSize: 8.5, letterSpacing: ".12em", border: "0.5px solid var(--edge)", color: "var(--ink-3)" }}>
              KOREAN EDITION
            </span>
          )}
        </div>

        <h2 className="lr-title display" style={{ fontSize: "clamp(19px,2vw,24px)", lineHeight: 1.22, letterSpacing: "-0.03em" }}>
          {ep.title[locale]}
        </h2>

        <p className="lr-clamp mt-2" style={{ fontSize: 13.5, lineHeight: 1.62, color: "var(--ink-3)", maxWidth: 620 }}>
          {ep.blurb[locale]}
        </p>
      </div>

      <div className="hidden lg:flex flex-col gap-3 shrink-0 self-center" style={{ width: 186 }}>
        {ep.stats[locale].slice(0, 2).map(([big, label]) => (
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

export default function DataSeriesGallery() {
  const locale = useLocale();
  const episodes = [...EPISODES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage-2)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">{COPY.eyebrow[locale]}</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            {COPY.title1[locale]}<br />
            <span style={{ color: "var(--green-bright)" }}>{COPY.title2[locale]}</span>
          </h1>
          <p className="mb-14" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 640 }}>
            {COPY.intro[locale]}
          </p>
        </Reveal>

        <div className="flex flex-col" style={{ borderTop: "0.5px solid var(--green-line)" }}>
          {episodes.map((ep, i) => (
            <Reveal key={ep.slug} delay={i * 40}>
              <EpisodeRow ep={ep} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mono mt-12" style={{ fontSize: 12, letterSpacing: ".08em", color: "var(--ink-4)" }}>
            {COPY.next[locale]}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
