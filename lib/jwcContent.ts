/* JWC — Jin's Win Contribution.
   Page copy for /kpi-lab/jwc, in both editions. As everywhere on this site the
   two languages are written separately rather than translated from each other.

   Every figure quoted here is measured on StatsBomb open data (men 1,946
   matches / 5,127 goals; women 1,310 matches as an independent reproduction;
   team-match n = 3,881; player-match n = 9,758). The full method, the two
   corrections that flipped a sign, and the open limitations live in
   wiki/synthesis/jwc_architecture.md and
   wiki/theory/measurement_counterpress_final.md. */

import type { Locale } from "@/lib/i18n";

export type JwcBlock = {
  label: string;
  text: string;
  visualComponent?: string;
  visualCaption?: string;
};

export type JwcPage = {
  kicker: string;
  title: string;
  backLabel: string;
  metaTitle: string;
  metaDescription: string;
  blocks: JwcBlock[];
};

const EN: JwcPage = {
  kicker: "JWC · Win Contribution",
  title: "What is a defender's win contribution?",
  backLabel: "Data & KPI Lab",
  metaTitle: "Win Contribution (JWC) | KPI Lab",
  metaDescription:
    "Baseball has WAR. Football does not. An attempt to build one that does not simply reward whoever scores — measured on 1,946 matches of StatsBomb open data.",
  blocks: [
    {
      label: "The problem",
      text:
        "Contribution to winning is what a contract is priced on, and in football we price it almost entirely on goals and key passes. That is not a measurement problem alone — it is why every child wants to be a striker, and why the holding midfielder and the target man who sacrifices himself are the two roles the game is now short of. A centre-back who wins every duel for ninety minutes appears in the model as a zero. I wanted to know whether that zero is real or just unmeasured.",
    },
    {
      label: "What baseball already does",
      text:
        "Baseball's WAR is not one number but a stack: value every event against a 24-state run-expectancy matrix, express it as runs above average, add a positional adjustment (a catcher is credited +12.5 runs per 162 games, a designated hitter −17.5), then convert runs into wins and subtract a replacement-level baseline. Two parts of that stack transfer to football and one does not. The event-value layer transfers — xT and VAEP are already the same idea. The positional adjustment transfers, and nobody has built it. Replacement level does not.",
    },
    {
      label: "Why replacement level does not transfer",
      text:
        "In baseball a substitution is like-for-like into a fixed batting order, so \"what a freely available player would have done in that slot\" is a well-defined question. In football the substitution changes the shape, sometimes the game model, sometimes the plan; the same player at 0-0 and at 1-0 down is being asked for different things. There is no slot to hold constant, so the counterfactual has no referent. I dropped replacement level entirely and kept the two layers that survive contact with football.",
    },
    {
      label: "Two categories, not one",
      text:
        "Everything a player does toward winning falls into one of two boxes. Category A is creation — the shot and key-pass value that the existing metrics already capture well. Category B is role fulfilment — how completely a player discharged the job his position actually asks of him: denying threat, carrying the ball through the first two thirds, counterpressing, winning duels, progressing under pressure. Then the empirical question: are these two things actually different, or is B just a noisy version of A? Put all six components into a goal-difference model and a threat-conceded model at once and they scatter across different quadrants — creation explains goal difference and almost nothing else; counterpress and duels explain threat conceded and nothing else. Measured on one axis, half the contribution is invisible.",
    },
    {
      label: "Phase changes who scores",
      text:
        "Before any of this can be scored, the phase has to be conditioned on. Across 1,946 matches, centre-backs are last of eight positions in open-play scoring rate and second of eight in set pieces — the rank order of who scores is not a property of a position, it is a property of a position within a phase. The independent women's sample reproduces the same structure. So the model scores ten phases separately rather than aggregating a match into one number, and a defender's set-piece goal is credited as what it is rather than as noise in a defensive profile.",
      visualComponent: "jwc-setpiece-slope-en",
      visualCaption:
        "StatsBomb, men's 1,946 matches / 5,127 goals, penalties excluded. Reproduced on an independent women's sample of 1,310 matches.",
    },
    {
      label: "Football's positional adjustment",
      text:
        "Baseball earned its positional adjustment by tracking players who changed position — the same bat, a different chair, and the difference is the chair. There are 372 players in this data who changed position, and a player fixed-effects regression across 9,758 player-matches gives football the same shape: centre-back +65.8 goal-equivalents per 1,000 starts, forward −65.2, monotonically decreasing from the defensive line through midfield to the attacking line. The gap between the two ends is 131.0. This says a defender is not failing to score; he is not standing where goals are scored. As far as I can find, nobody has published this number for football before.",
      visualComponent: "jwc-positional-adjustment-en",
      visualCaption:
        "Player fixed-effects regression, n = 9,758 player-matches, R² = 0.295. Football values centred to sum to zero; error bars are standard errors.",
    },
    {
      label: "Nominal position is not the position played",
      text:
        "A full-back in a 4-4-2 who pushes on is a winger for half the match and a full-back for the other half, and grading him as one or the other throws away whichever half you discard. So the model reads each player's measured activity grid separately in the attacking and the defending phase, assigns an effective role to each, and grades the attacking metrics against the attacking role and the defensive metrics against the defensive one. Marcelo's two centres of activity sit 25.8m apart across 30 La Liga matches: 90% full-back when Madrid have the ball, 57% full-back and 30% wide midfielder when they do not. His creation runs at 2.2× the full-back average and his build-up contribution at 2.7×.",
      visualComponent: "jwc-effective-role-en",
      visualCaption:
        "Real Madrid, 2015/16 La Liga, 30 matches. 12×8 activity grid, measured; cell brightness normalised to the 95th percentile.",
    },
    {
      label: "The two corrections that mattered",
      text:
        "Two defensive components came out of the first build with the wrong sign, and fixing them is the part of this work I would defend hardest. The first: a centre-back's threat-denial score correlated with more danger conceded, because being involved at all means the opponent already reached the box — reverse causality. Subtracting each player's own exposure, computed by weighting his defensive heat map against opponent threat by zone (the logic Statcast uses for outs above average), flipped the sign. The second: counterpressing looked like it made results worse, because the metric was count-proportional and therefore a proxy for how often the team lost the ball, and because \"recovery\" was counting clearances and failed duels — the cleanup after a counterpress fails. Rebuilt on the counterpress flag with a five-second possession check and a conditional baseline, it stops predicting goal difference at all and starts predicting threat conceded.",
      visualComponent: "jwc-sign-reversal-en",
      visualCaption:
        "Team-match n = 3,881, standard errors clustered on match. Both coefficients are from the corrected specification with all six components entered together.",
    },
    {
      label: "What this is not, yet",
      text:
        "Everything above is in-sample. There is no out-of-sample validation, no goalkeeper track, no conversion from goals to points, and no set-piece-specific threat grid. The aerial-duel component is not fixable on this data at all — StatsBomb records only aerials lost, so a won header is invisible by construction. The multi-role bonus, which is the idea I care most about, is not yet stable across specifications. I am publishing it at this stage because the two sign corrections are the useful part: they are a demonstration that a defensive metric which is not exposure-normalised will tell you the opposite of the truth, confidently and with a small p-value.",
    },
  ],
};

const KO: JwcPage = {
  kicker: "JWC · 승리 기여도",
  title: "수비수의 승리 기여도는 얼마인가",
  backLabel: "데이터 & KPI 랩",
  metaTitle: "승리 기여도 (JWC) | KPI 랩",
  metaDescription:
    "야구에는 WAR가 있고 축구에는 없다. 득점한 사람만 보상하지 않는 승리 기여도를 만들어보려는 시도 — StatsBomb 1,946경기 실측.",
  blocks: [
    {
      label: "문제",
      text:
        "승리 기여도는 결국 연봉과 계약으로 직결되는데, 축구는 그것을 거의 득점과 키패스로만 매긴다. 이건 측정의 문제로만 끝나지 않는다. 아이들이 전부 스트라이커만 하고 싶어 하는 이유이고, 수비형 미드필더와 희생하는 타겟맨이 지금 품귀 현상을 빚는 이유다. 90분 내내 모든 경합을 이긴 센터백은 모델 안에서 0으로 남는다. 나는 그 0이 진짜인지, 아니면 그냥 아직 재지 않은 것인지 알고 싶었다.",
    },
    {
      label: "야구는 이미 하고 있다",
      text:
        "야구의 WAR는 하나의 숫자가 아니라 층으로 쌓은 구조다. 24개 베이스-아웃 상태의 득점 기댓값 행렬로 모든 이벤트에 값을 매기고, 평균 대비 런으로 환산하고, 포지션 보정을 더하고(포수 +12.5런 / 162경기, 지명타자 −17.5런), 런을 승수로 바꾼 뒤 대체 수준을 뺀다. 이 중 두 층은 축구로 넘어오고 한 층은 넘어오지 못한다. 이벤트 가치 층은 넘어온다 — xT와 VAEP가 이미 같은 발상이다. 포지션 보정도 넘어오는데, 아무도 만들어놓지 않았다. 대체 선수는 넘어오지 않는다.",
    },
    {
      label: "대체 선수를 버린 이유",
      text:
        "야구의 교체는 고정된 타순 안에서 같은 자리를 바꾸는 것이라, \"그 자리에 흔한 선수가 있었다면\"이 잘 정의된 질문이 된다. 축구는 교체로 구조가 바뀌고, 때로는 게임 모델이 바뀌고, 때로는 플랜이 바뀐다. 0-0에서의 그 선수와 0-1에서의 그 선수는 애초에 요구받는 것이 다르다. 고정할 자리가 없으니 반사실에 기준점이 없다. 그래서 대체 수준은 통째로 버리고, 축구와 부딪혀도 살아남는 두 층만 남겼다.",
    },
    {
      label: "카테고리는 하나가 아니라 둘",
      text:
        "선수가 승리를 향해 하는 모든 일은 두 상자 중 하나에 들어간다. 카테고리 A는 창출 — 기존 지표가 이미 잘 잡고 있는 슛과 키패스의 가치다. 카테고리 B는 역할 이행 — 자기 포지션이 실제로 요구하는 일을 얼마나 온전히 해냈는가다. 위협 차단, 전방 2/3까지의 운반, 카운터프레스, 경합 승리, 압박 하 전진. 그다음이 진짜 질문이다. 이 둘은 정말 다른 것인가, 아니면 B는 A의 잡음 섞인 판본일 뿐인가. 6개 성분을 골득실 모형과 실점 위협 모형에 동시에 넣으면 서로 다른 사분면으로 흩어진다. 창출은 골득실만 설명하고 그 외엔 거의 아무것도 설명하지 못한다. 카운터프레스와 경합은 실점 위협만 설명한다. 하나의 잣대로 재면 기여의 절반이 보이지 않는다.",
    },
    {
      label: "국면이 바뀌면 득점자가 바뀐다",
      text:
        "무엇을 매기기 전에 국면부터 조건화해야 한다. 1,946경기에서 센터백은 오픈플레이 득점률로는 8개 포지션 중 꼴찌지만, 세트피스만 떼어놓으면 2위다. 누가 골을 넣는가의 순위는 포지션의 속성이 아니라 국면 안에 놓인 포지션의 속성이다. 여자 축구 독립 표본에서도 같은 구조가 재현된다. 그래서 이 모델은 경기를 하나의 숫자로 뭉치지 않고 10개 국면을 따로 매긴다. 수비수의 세트피스 득점은 수비 프로필의 잡음이 아니라 있는 그대로의 기여로 적립된다.",
      visualComponent: "jwc-setpiece-slope-ko",
      visualCaption:
        "StatsBomb 남자 1,946경기 / 득점 5,127, 페널티킥 제외. 여자 축구 독립 표본 1,310경기에서 동일 구조 재현.",
    },
    {
      label: "축구의 포지션 보정",
      text:
        "야구는 포지션을 바꾼 선수를 추적해서 포지션 보정을 얻어냈다. 같은 방망이, 다른 자리 — 그 차이가 자리의 값이다. 이 데이터에는 포지션을 옮긴 선수가 372명 있고, 9,758 선수-경기에 대한 선수 고정효과 회귀는 축구에서도 같은 모양을 준다. 센터백 +65.8 골-등가 / 1,000선발, 최전방 −65.2, 수비 라인에서 중원을 거쳐 공격 라인까지 단조 감소. 양 끝의 격차는 131.0이다. 이건 수비수가 골을 못 넣는 게 아니라 골이 나는 자리에 서 있지 않다는 뜻이다. 내가 찾아본 한, 축구에서 이 수치를 공표한 선례는 없다.",
      visualComponent: "jwc-positional-adjustment-ko",
      visualCaption:
        "선수 고정효과 회귀, n = 9,758 선수-경기, R² = 0.295. 축구 값은 합이 0이 되도록 중심화, 오차막대는 표준오차.",
    },
    {
      label: "명목 포지션은 실제로 뛴 포지션이 아니다",
      text:
        "4-4-2의 풀백이 전진을 많이 하면 그는 경기의 절반은 윙어이고 절반은 풀백이다. 둘 중 하나로만 채점하면 버린 쪽 절반이 통째로 사라진다. 그래서 이 모델은 공격 국면과 수비 국면의 활동 격자를 따로 읽어 각각에 실효 역할을 부여하고, 공격 지표는 공격 역할 기준으로, 수비 지표는 수비 역할 기준으로 채점한다. 마르셀루는 라리가 30경기에서 두 활동 중심이 25.8m 떨어져 있다. 마드리드가 볼을 가졌을 때는 90% 풀백, 갖지 않았을 때는 57% 풀백에 30% 측면 미드필더다. 그의 창출은 풀백 평균의 2.2배, 빌드업 기여는 2.7배다.",
      visualComponent: "jwc-effective-role-ko",
      visualCaption:
        "레알 마드리드, 2015/16 라리가 30경기. 12×8 활동 격자 실측, 칸 밝기는 95퍼센타일 기준 정규화.",
    },
    {
      label: "부호가 뒤집힌 두 번의 수정",
      text:
        "첫 빌드에서 수비 성분 두 개가 반대 부호로 나왔고, 그걸 고친 과정이 이 작업에서 내가 가장 자신 있게 내놓는 부분이다. 첫째, 센터백의 위협 차단 점수가 실점 위협 증가와 상관을 보였다. 개입했다는 것 자체가 이미 상대가 박스까지 왔다는 뜻이기 때문이다 — 역인과다. 각 선수의 수비 히트맵에 존별 상대 위협을 가중해 개인 노출을 계산하고 그것을 빼주자(야구 Statcast가 OAA를 만드는 논리다) 부호가 뒤집혔다. 둘째, 카운터프레스는 많이 할수록 결과가 나빠지는 것처럼 보였다. 지표가 횟수 비례라서 사실상 볼을 얼마나 자주 잃었는지의 대리변수였고, '회수'의 정의에 클리어런스와 실패한 경합 — 즉 카운터프레스가 실패한 뒤의 뒤처리 — 가 섞여 있었기 때문이다. 카운터프레스 플래그와 5초 점유 확인, 조건부 기준선으로 다시 만들자 골득실은 아예 예측하지 않게 되고 실점 위협을 예측하기 시작했다.",
      visualComponent: "jwc-sign-reversal-ko",
      visualCaption:
        "팀-경기 n = 3,881, match 클러스터 표준오차. 두 계수 모두 6개 성분을 함께 넣은 수정 후 모형의 값.",
    },
    {
      label: "아직 아닌 것",
      text:
        "위의 모든 것은 표본 내(in-sample)다. 표본 외 검증이 없고, 골키퍼 트랙이 없고, 골에서 승점으로의 환산이 없고, 세트피스 전용 위협 격자가 없다. 공중 경합 성분은 이 데이터로는 고칠 수가 없다 — StatsBomb은 공중볼 실패만 기록하므로 이긴 헤딩은 구조적으로 보이지 않는다. 내가 가장 아끼는 아이디어인 다중 역할 보너스는 아직 설정을 바꾸면 흔들린다. 그럼에도 이 단계에서 공개하는 이유는 두 번의 부호 수정이 쓸모 있는 부분이기 때문이다. 노출 정규화를 하지 않은 수비 지표는 진실의 반대를 말해준다 — 그것도 아주 자신 있게, 작은 p값과 함께.",
    },
  ],
};

export const JWC_CONTENT: Record<Locale, JwcPage> = { en: EN, ko: KO };
