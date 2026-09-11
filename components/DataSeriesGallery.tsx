"use client";
import Link from "@/components/LocaleLink";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { UI, type Locale } from "@/lib/i18n";
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
  competition: Record<Locale, string>;
  title: Record<Locale, string>;
  sub: Record<Locale, string>;
  stats: Record<Locale, readonly (readonly [string, string])[]>;
};

const EPISODES: Episode[] = [
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
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={`/match-analysis/data-series/${ep.slug}`}
      className="relative flex flex-col lg:flex-row gap-8 rounded-[26px] p-8 md:p-10"
      style={{
        background: "var(--green-soft)",
        border: `0.5px solid ${hover ? "var(--green-bright)" : "var(--green-line)"}`,
        boxShadow: hover ? "var(--lift)" : "none",
        transition: "box-shadow .5s var(--ease-out), border-color .5s var(--ease-out)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="mono px-2 py-0.5 rounded-full" style={{ fontSize: 9, letterSpacing: ".14em", border: "0.5px solid var(--green-line)", color: "var(--green-bright)" }}>
            {locale === "ko" ? `데이터가 말하는 · ${ep.no}` : `WHAT THE DATA SAYS · ${ep.no}`}
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            {ep.competition[locale]}
          </span>
          {ep.koOnly && locale === "en" && (
            <span className="mono px-2 py-0.5 rounded-full" style={{ fontSize: 9, letterSpacing: ".12em", border: "0.5px solid var(--edge)", color: "var(--ink-3)" }}>
              KOREAN EDITION
            </span>
          )}
        </div>
        <h2 className="display mb-4" style={{ fontSize: "clamp(26px,3.4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.035em", color: "var(--ink)" }}>
          {ep.title[locale]}
        </h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.68, color: "var(--ink-2)", maxWidth: 560 }}>
          {ep.sub[locale]}
        </p>
        <span className="mono inline-block mt-7" style={{ fontSize: 11.5, letterSpacing: ".14em", color: "var(--green-bright)", borderBottom: "1px solid var(--green-line)", paddingBottom: 3 }}>
          {UI.common.viewAnalysis[locale].toUpperCase()} →
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 shrink-0 self-center" style={{ minWidth: 240 }}>
        {ep.stats[locale].map(([big, label]) => (
          <div key={label} className="pt-3" style={{ borderTop: "0.5px solid var(--green-line)" }}>
            <span className="display block" style={{ fontSize: 22, letterSpacing: "-0.03em", color: "var(--ink)" }}>{big}</span>
            <span className="mono block mt-1" style={{ fontSize: 9.5, letterSpacing: ".12em", color: "var(--ink-3)" }}>{label}</span>
          </div>
        ))}
      </div>
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
          <p className="mb-20" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 640 }}>
            {COPY.intro[locale]}
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          {episodes.map((ep, i) => (
            <Reveal key={ep.slug} delay={i * 80}>
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
