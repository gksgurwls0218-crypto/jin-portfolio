import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/LocaleLink";
import EssayNav from "@/components/approach/EssayNav";
import GridBufferDiagram from "@/components/approach/GridBufferDiagram";
import DefinitionToggle from "@/components/approach/DefinitionToggle";
import ConditioningSequencer from "@/components/approach/ConditioningSequencer";
import WhenWhereMatrix from "@/components/approach/WhenWhereMatrix";
import PreHalfSpaceMap from "@/components/approach/PreHalfSpaceMap";
import ShapeMorph from "@/components/approach/ShapeMorph";
import FourPhaseRing from "@/components/approach/FourPhaseRing";
import KpiFingerprint from "@/components/approach/KpiFingerprint";
import ConceptIndex from "@/components/approach/ConceptIndex";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: { title: "Variation — Approach | Jin", description: "How systems break — and how to break them on purpose. Variation theory: the full argument." },
  ko: { title: "변이 — 접근법 | Jin", description: "시스템은 어떻게 무너지는가 — 그리고 그것을 의도적으로 깨뜨리는 법. 변이 이론의 전체 논증." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Small accent helpers so the prose dict stays readable.
function S({ children }: { children: ReactNode }) {
  return <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{children}</strong>;
}
function Em({ children }: { children: ReactNode }) {
  return <em style={{ color: "var(--green-mid)" }}>{children}</em>;
}

const buildShapes = [
  {
    label: "vs HIGH PRESS",
    caption: "3-2 — numerical security, double pivot, rest-defence already standing behind the ball.",
    nodes: [
      { x: 60, y: 150 }, { x: 140, y: 90 }, { x: 140, y: 150 }, { x: 140, y: 210 },
      { x: 210, y: 115 }, { x: 210, y: 185 },
      { x: 320, y: 60 }, { x: 320, y: 150 }, { x: 320, y: 240 },
    ],
    lanes: [{ from: 4, to: 6 }, { from: 5, to: 8 }],
  },
  {
    label: "vs MID BLOCK",
    caption: "3-1 — the second pivot advances, adding a body ahead of the ball where the game is decided.",
    nodes: [
      { x: 60, y: 150 }, { x: 140, y: 90 }, { x: 140, y: 150 }, { x: 140, y: 210 },
      { x: 210, y: 150 }, { x: 280, y: 110 },
      { x: 320, y: 60 }, { x: 320, y: 150 }, { x: 320, y: 240 },
    ],
    lanes: [{ from: 5, to: 6 }, { from: 5, to: 7 }, { from: 4, to: 8 }],
  },
];

const opponentBlock = [
  { x: 470, y: 60 }, { x: 470, y: 150 }, { x: 470, y: 240 },
  { x: 400, y: 100 }, { x: 400, y: 200 },
];

type SectionCopy = { tag: string; heading: string; paras: ReactNode[]; quote?: ReactNode };
type Copy = {
  heroTag: string;
  heroTitle: string;
  heroSub: string;
  quote: ReactNode;
  quoteAttr: string;
  heroNote: string;
  visLabels: { v1: string; v2: string; v3: string; v4: string; v5a: string; v5b: string; v6: string; conceptIndex: string };
  s1: SectionCopy; s2: SectionCopy; s3: SectionCopy; s4: SectionCopy; s5: SectionCopy; s6: SectionCopy; s7: SectionCopy;
  cta: string;
};

const CONTENT: Record<Locale, Copy> = {
  en: {
    heroTag: "01 / APPROACH · VARIATION THEORY",
    heroTitle: "Variation",
    heroSub: "How systems break — and how to break them on purpose.",
    quote: <>&ldquo;A moment of variation — a variable or a mutation — induces a few seconds of buffering in the opponent&rsquo;s system. Those few seconds change the game. When the system cannot respond to the buffering, the system collapses.&rdquo;</>,
    quoteAttr: "— Variation theory · Jin",
    heroNote: "Home shows this claim in motion. This page is the argument. · 9 min read",
    visLabels: {
      v1: "VISUAL §1 · GRID → BUFFER",
      v2: "VISUAL §2 · DEFINITION TOGGLE",
      v3: "VISUAL §3 · THE CONDITIONING SEQUENCER",
      v4: "VISUAL §4 · WHEN × WHERE MATRIX + PRE-HALF SPACE MAP",
      v5a: "VISUAL §5A · SHAPE MORPH",
      v5b: "VISUAL §5B · FOUR-PHASE RING",
      v6: "VISUAL §6 · KPI FINGERPRINT COMPARISON",
      conceptIndex: "CONCEPT INDEX",
    },
    s1: {
      tag: "§1 / PROBLEM",
      heading: "The standardised game",
      paras: [
        <>Modern football has converged on a single operating logic. The positional grid that Guardiola perfected — the pitch divided into zones, occupation rules for every zone, spacing rehearsed until it is reflex — is no longer a style. It is the default operating system of the elite game. A Bundesliga press, a La Liga block and a Premier League build-up now differ far more in tempo and personnel than they differ in logic.</>,
        <>Convergence has a consequence that is rarely stated plainly: when everyone defends as a system, individual mistakes stop deciding matches. A well-drilled structure absorbs individual errors. It fails collectively, or it does not fail at all.</>,
        <>So the question that organises all of my work is this: <S>what makes a well-drilled system fail?</S></>,
        <>Not talent alone — talent is priced into every scouting model in Europe. Not pressing intensity — true intensity is only sustainable in windows. A system breaks when it is forced to process something it has not been trained on. For a few seconds, the structure stops executing and starts computing: defenders check, communicate, re-assign. I call this state <Em>buffering</Em> — the visible hesitation of a system whose assumptions have just been violated. Those few seconds are where matches are decided.</>,
        <>Everything below is a method for manufacturing those seconds deliberately, repeatably, and at a cost a squad can afford across a full season.</>,
      ],
    },
    s2: {
      tag: "§2 / INSTRUMENTS",
      heading: "Two instruments: Variable and Mutation",
      paras: [
        <>I work with two distinct instruments — two faces of one word, <Em>variation</Em>.</>,
        <>A <S>Variable</S> is held optionality. A team or a player possesses live choices — a, b, c — and reveals the selection as late as possible. The full-back who can pass inside, overlap, or cut back behind; the pivot who can play safe, switch, or break a line. The threat is not any single option. The threat is that the choice has not yet been made.</>,
        <>A <S>Mutation</S> is becoming the variable. A structure changes its own identity: a formation morphs mid-possession, a centre-back arrives where a striker should be, a player receives the ball in a zone the defensive scheme never assigned to anyone. The defender&rsquo;s question changes from <Em>&ldquo;which option will he choose?&rdquo;</Em> to <Em>&ldquo;who is supposed to be dealing with this at all?&rdquo;</Em></>,
        <>The relationship between the two is the engine of my thinking: <S>mutation creates variables.</S> When a build-up shape shifts from 3-2 to 3-1, passing angles exist that did not exist five seconds earlier — the defence&rsquo;s assignments were designed against a different geometry. Structure moves first; options follow.</>,
      ],
      quote: <>Mutation creates variables. Structure moves first; options follow.</>,
    },
    s3: {
      tag: "§3 / MECHANISM",
      heading: "Lure & Shock: conditioning as a weapon",
      paras: [
        <>Systems are prediction machines. They defend what they expect. Lure &amp; Shock is the discipline of controlling what the opponent expects.</>,
        <>The lure is what I call <S>Plan A−</S>: a complete attacking cycle — build-up to shot, not sterile possession — executed repeatedly, as if it were our actual game plan. The completeness matters. Opponents do not learn from harmless circulation; they learn from sequences that end in shots. Executed well, Plan A− teaches the opposition — the players on the pitch and the analysts in the video room — what we are. Their response automates. And automation is the vulnerability: <Em>a conditioned reaction is a promise about where they will be.</Em></>,
        <><S>Plan A — the shock — is played into the space that promise vacates.</S></>,
        <>I describe this as football&rsquo;s version of deep learning: repetition is training data, and the more cycles the opponent absorbs, the more rigid their response becomes. Which is why the mechanism compounds across a season, not just across ninety minutes. A league learns your Plan A− through eight months of scouting footage. That league-wide learning is the strongest lure that exists.</>,
        <>Two disciplines keep the idea honest. First: <S>if Plan A− keeps working, you do not switch.</S> A lure that scores is simply a good plan; conversion is a choice, never an obligation. Second: the switch is a judgment, not an algorithm. The trigger is a reading — how much are we dominating, how far has the opponent&rsquo;s reaction hardened — made by the coach, in the moment. My framework structures that judgment. It does not pretend to replace it.</>,
        <>And the mechanism is recursive. Reach the high-value zone and expectation forms again: everyone in the stadium expects the shot. That expectation is a new lure. The pass played under a shot&rsquo;s expectation — Çalhanoğlu at the top of the arc choosing the key pass while every defender is set for the block — creates the cleanest chances in football. Whatever the threat level, the loop restarts: build expectation, break it.</>,
      ],
    },
    s4: {
      tag: "§4 / PHYSICS",
      heading: "Why buffering happens: the two engines",
      paras: [
        <>Buffering is not magic; it has mechanics. Two engines produce it.</>,
        <><S>Timing — the WHEN.</S> Act at the precise moment the opponent is in motion. A moving defender carries momentum, and momentum cannot be reversed instantly; acting into that movement guarantees a delay measured in fractions of a second. This is why the lure matters: a conditioned opponent moves early — and early movement is exposure.</>,
        <><S>Diagonality — the WHERE.</S> A diagonal action asks two questions simultaneously: lateral (left or right?) and vertical (step or drop?). No defensive scheme answers both at once, because horizontal and vertical responsibilities live with different players. A diagonal at the wrong time is absorbed. A vertical ball at the right time is a duel. A diagonal at the moment of movement is a broken structure. The engines multiply; they do not add.</>,
        <>They ignite most reliably in a zone I call the <S>Pre-Half Space</S>: the corridor in the middle third, one pass or one carry from the final third, just outside the half-space proper. It sits in defensive no-man&rsquo;s land — not clearly the full-back&rsquo;s, not clearly the midfielder&rsquo;s. Turnover risk is low, because the touchline is close. Angles into the half-space are diagonal by geometry.</>,
        <>And it enables the movement I value most — the <S>second movement</S>: release the ball into the half-space, then attack the arc immediately, while the defence&rsquo;s cover slide is still in motion. The passer attacks the reaction to his own pass. Time and space, attacked inside the same two seconds.</>,
      ],
      quote: <>A diagonal at the wrong time is absorbed. A vertical ball at the right time is a duel. A diagonal at the moment of movement is a broken structure.</>,
    },
    s5: {
      tag: "§5 / STRUCTURE",
      heading: "The structure that pays for it",
      paras: [
        <>Improvisation is not a plan. Variation collapses into chaos unless structure underwrites the risk.</>,
        <>My build-up core is a hybrid. <S>3-2 against a high press</S>: numerical security, double pivot, and a rest-defence already standing behind the ball. <S>3-1 against a mid or low block</S>: the second pivot advances, adding a body ahead of the ball where the game is actually being decided. The switch between them is itself a mutation — same players, different geometry — and it is also a phase decision: 3-2 maximises protection against transition; 3-1 completes the counter-attacking structure, because the advanced pivot becomes the connector the instant the ball is won.</>,
        <>I design in <S>four phases that exist on the pitch simultaneously</S>: Plan A− (the conditioning attack), Plan A (the conversion), rest-defence (the shape that is already defending while we attack), and rest-attack (the runners already positioned while we defend). Each phase is the structural precondition of its neighbours. There is no Plan A worth playing if losing the ball is fatal — and no counter-attack without a structure that wins the ball back.</>,
        <>Defensively, the philosophy is deliberately asymmetric to the attack. <S>Attack manipulates expectation; defence removes options.</S> After loss: a gegenpress window of roughly seven seconds — the physiological limit of true intensity — to win the ball back or kill the counter&rsquo;s tempo. After that, no heroics: a structural block that closes the centre and funnels the opponent into side traps. The opponent enters the trap not because they are deceived, but because the structure leaves them nothing else.</>,
        <>This is also an economics decision. Conditioning an entire league takes eight months, and squads that press full-time are broken by March. <S>Sustainability is not a constraint on the philosophy — it is a precondition of it.</S></>,
      ],
    },
    s6: {
      tag: "§6 / FALSIFICATION",
      heading: "Measuring it — and trying to break it",
      paras: [
        <>A theory that cannot fail is a brand, not a tool. So the question I put to my own framework is the one I would put to any coach&rsquo;s idea: <S>what would the data look like if this were working — and what would it look like if I were fooling myself?</S></>,
        <>Possession share and raw threat totals are useless here. Spain arrived at the 2014 World Cup with the tournament&rsquo;s highest possession profile and went out in the group stage: their route to goal — flank, then centre, always in that order — had become so predictable that Van Gaal&rsquo;s 5-3-2 solved it before kick-off. Sarri&rsquo;s Juventus won Serie A while every opponent knew that erasing one node — Pjanić — switched the build-up off. Possession without unpredictability is just a slower way to lose.</>,
        <>The fingerprint I look for instead: <S>pass-network dispersion</S> — is betweenness centrality spread across the build-up core, or does one node carry the plan? <S>Timing variance of high-value actions</S> — do threat spikes arrive at irregular, unlearnable moments, or on a rhythm? <S>Line-break conversion</S> — do defensive-line breaks become final-third receptions, or die as isolated events? <S>Channel and recipient entropy</S> — can the opponent predict where, and through whom, the threat arrives?</>,
        <>Read in reverse, even the opponent&rsquo;s pressing tells a story. When their pressure on our build-up relaxes, conditioning is underway — they have stopped treating the lure as a threat. When their pressing intensity spikes immediately after our conversion, we are watching buffering in the data.</>,
        <>One discipline above all: <S>the match is the wrong unit of account.</S> A single game in which Plan A never fires is not a refutation — it is a training batch. The season is the model. I evaluate variation at season scale, and I treat single-match nulls as data.</>,
      ],
    },
    s7: {
      tag: "§7 / APPLICATION",
      heading: "What this offers a club",
      paras: [
        <>This framework is not a demand to rebuild a playing model. It is a lens that makes existing work sharper.</>,
        <>In <S>opposition analysis</S>: detect the opponent&rsquo;s conditioning loops — and recognise when we are the ones being lured. In <S>recruitment</S>: value players whose abilities contradict their position, and players with a signature move — a deeply automated on-ball habit that survives pressure — because those are the players who turn structure into variables. In <S>development</S>: train multi-positionality in the golden age, while adaptability is still trainable.</>,
        <>And one honest limit, which I regard as a feature: the framework tells you what to watch, and when the conditions are forming. <Em>When to switch remains a human decision.</Em> My job as an analyst is to move that decision from pure intuition toward evidence — never to pretend the evidence makes the decision.</>,
        <>The pages that follow apply this framework to real matches — including the moments where it fails, because those are the moments a theory earns its keep.</>,
      ],
    },
    cta: "Theory is cheap. Watch it applied →",
  },
  ko: {
    heroTag: "01 / 접근법 · 변이 이론",
    heroTitle: "변이",
    heroSub: "시스템은 어떻게 무너지는가 — 그리고 그것을 의도적으로 깨뜨리는 법.",
    quote: <>&ldquo;변이의 한순간 — 변수 혹은 변이 — 은 상대 시스템에 몇 초의 버퍼링을 유발한다. 그 몇 초가 경기를 바꾼다. 시스템이 그 버퍼링에 응답하지 못할 때, 시스템은 붕괴한다.&rdquo;</>,
    quoteAttr: "— 변이 이론 · Jin",
    heroNote: "홈은 이 주장을 움직임으로 보여준다. 이 페이지는 그 논증이다. · 9분 분량",
    visLabels: {
      v1: "비주얼 §1 · 그리드 → 버퍼",
      v2: "비주얼 §2 · 정의 토글",
      v3: "비주얼 §3 · 컨디셔닝 시퀀서",
      v4: "비주얼 §4 · WHEN × WHERE 매트릭스 + 프리 하프스페이스 맵",
      v5a: "비주얼 §5A · 형태 변이",
      v5b: "비주얼 §5B · 4페이즈 링",
      v6: "비주얼 §6 · KPI 지문 비교",
      conceptIndex: "개념 색인",
    },
    s1: {
      tag: "§1 / 문제",
      heading: "표준화된 게임",
      paras: [
        <>현대 축구는 하나의 작동 논리로 수렴했다. 과르디올라가 완성한 위치 그리드 — 구역으로 나뉜 피치, 구역마다의 점유 규칙, 반사가 될 때까지 반복된 간격 — 는 더 이상 스타일이 아니다. 엘리트 게임의 기본 운영체제다. 분데스리가의 압박, 라리가의 블록, 프리미어리그의 빌드업은 이제 논리보다 템포와 선수 구성에서 훨씬 더 크게 다를 뿐이다.</>,
        <>이 수렴에는 좀처럼 명확히 언급되지 않는 결과가 있다. 모두가 시스템으로 수비할 때, 개인의 실수는 더 이상 경기를 결정하지 못한다. 잘 훈련된 구조는 개인의 오류를 흡수한다. 집단적으로 실패하거나, 아예 실패하지 않는다.</>,
        <>그래서 내 모든 작업을 조직하는 질문은 이것이다: <S>잘 훈련된 시스템은 무엇 때문에 무너지는가?</S></>,
        <>재능만으로는 아니다 — 재능은 유럽의 모든 스카우팅 모델에 이미 가격이 매겨져 있다. 압박 강도만으로도 아니다 — 진짜 강도는 짧은 구간에서만 지속 가능하다. 시스템은 훈련받지 않은 무언가를 처리하도록 강요당할 때 깨진다. 몇 초 동안 구조는 실행을 멈추고 연산을 시작한다. 수비수들이 확인하고, 소통하고, 재배치한다. 나는 이 상태를 <Em>버퍼링</Em>이라 부른다 — 방금 전제가 위반된 시스템의 눈에 보이는 망설임. 그 몇 초가 경기가 결정되는 곳이다.</>,
        <>아래의 모든 것은 그 몇 초를 의도적으로, 반복적으로, 그리고 한 시즌 내내 선수단이 감당할 수 있는 비용으로 만들어내는 방법이다.</>,
      ],
    },
    s2: {
      tag: "§2 / 도구",
      heading: "두 개의 도구: 변수와 변이",
      paras: [
        <>나는 두 개의 뚜렷한 도구로 작업한다 — 하나의 단어, <Em>변이(variation)</Em>의 두 얼굴이다.</>,
        <><S>변수(Variable)</S>는 보류된 선택지다. 팀이나 선수가 살아 있는 선택 — a, b, c — 을 쥐고, 그 선택을 최대한 늦게 드러낸다. 안쪽으로 패스하거나, 오버래핑하거나, 뒤로 컷백할 수 있는 풀백. 안전하게 두거나, 전환하거나, 라인을 깰 수 있는 피벗. 위협은 어느 한 선택지가 아니다. 위협은 그 선택이 아직 내려지지 않았다는 것이다.</>,
        <><S>변이(Mutation)</S>는 스스로 변수가 되는 것이다. 구조가 자기 정체성을 바꾼다. 점유 도중 포메이션이 변형되고, 스트라이커가 있어야 할 곳에 센터백이 도착하고, 수비 체계가 누구에게도 배정하지 않은 구역에서 선수가 볼을 받는다. 수비수의 질문이 <Em>&ldquo;그가 어떤 선택지를 고를까?&rdquo;</Em>에서 <Em>&ldquo;도대체 이걸 누가 맡아야 하는 거지?&rdquo;</Em>로 바뀐다.</>,
        <>둘의 관계가 내 사고의 엔진이다: <S>변이가 변수를 만든다.</S> 빌드업 형태가 3-2에서 3-1로 바뀌면, 5초 전에는 없던 패스 각이 생긴다 — 수비의 배정은 다른 기하학을 상대로 설계되어 있었기 때문이다. 구조가 먼저 움직이고, 선택지가 뒤따른다.</>,
      ],
      quote: <>변이가 변수를 만든다. 구조가 먼저 움직이고, 선택지가 뒤따른다.</>,
    },
    s3: {
      tag: "§3 / 메커니즘",
      heading: "루어 앤 쇼크: 무기로서의 컨디셔닝",
      paras: [
        <>시스템은 예측 기계다. 예상하는 것을 수비한다. 루어 앤 쇼크는 상대가 무엇을 예상하는지를 통제하는 규율이다.</>,
        <>유인은 내가 <S>Plan A−</S>라 부르는 것이다: 완결된 공격 순환 — 무의미한 점유가 아니라 빌드업에서 슛까지 — 을, 마치 그것이 우리의 실제 게임 플랜인 양 반복 실행한다. 완결성이 핵심이다. 상대는 무해한 순환에서 배우지 않는다. 슛으로 끝나는 시퀀스에서 배운다. 잘 실행된 Plan A−는 상대에게 — 피치 위 선수들과 비디오룸의 분석관들에게 — 우리가 무엇인지 가르친다. 그들의 반응이 자동화된다. 그리고 자동화가 곧 취약점이다: <Em>조건화된 반응은 그들이 어디에 있을지에 대한 약속이다.</Em></>,
        <><S>Plan A — 쇼크 — 는 그 약속이 비워둔 공간으로 실행된다.</S></>,
        <>나는 이것을 축구판 딥러닝이라 설명한다. 반복은 학습 데이터이고, 상대가 흡수하는 순환이 많을수록 그들의 반응은 더 경직된다. 그래서 이 메커니즘은 90분이 아니라 한 시즌에 걸쳐 복리로 쌓인다. 리그는 8개월의 스카우팅 영상을 통해 당신의 Plan A−를 학습한다. 그 리그 전체의 학습이 존재하는 가장 강력한 유인이다.</>,
        <>두 가지 규율이 이 발상을 정직하게 유지한다. 첫째: <S>Plan A−가 계속 통한다면, 전환하지 않는다.</S> 득점하는 유인은 그냥 좋은 계획일 뿐이다. 전환은 선택이지 의무가 아니다. 둘째: 전환은 판단이지 알고리즘이 아니다. 방아쇠는 하나의 읽기다 — 우리가 얼마나 지배하고 있는가, 상대의 반응이 얼마나 굳었는가 — 그 순간 감독이 내린다. 내 프레임워크는 그 판단을 구조화한다. 그것을 대체하는 척하지 않는다.</>,
        <>그리고 이 메커니즘은 재귀적이다. 고가치 구역에 도달하면 기대가 다시 형성된다: 경기장의 모두가 슛을 예상한다. 그 기대가 새로운 유인이다. 슛의 기대 아래에서 나오는 패스 — 모든 수비수가 블록을 준비한 사이 아크 꼭대기에서 키 패스를 고르는 찰하노글루 — 는 축구에서 가장 깨끗한 기회를 만든다. 위협 수준이 어떻든 루프는 다시 시작된다: 기대를 쌓고, 그것을 깨라.</>,
      ],
    },
    s4: {
      tag: "§4 / 물리학",
      heading: "버퍼링은 왜 일어나는가: 두 개의 엔진",
      paras: [
        <>버퍼링은 마법이 아니다. 역학이 있다. 두 개의 엔진이 그것을 만든다.</>,
        <><S>타이밍 — WHEN.</S> 상대가 움직이는 바로 그 순간에 행동하라. 움직이는 수비수는 관성을 지니고, 관성은 즉시 되돌릴 수 없다. 그 움직임 속으로 파고드는 행동은 찰나 단위로 측정되는 지연을 보장한다. 유인이 중요한 이유가 이것이다: 조건화된 상대는 일찍 움직이고 — 이른 움직임은 곧 노출이다.</>,
        <><S>대각선성 — WHERE.</S> 대각선 행동은 두 질문을 동시에 던진다: 횡(왼쪽인가 오른쪽인가?)과 종(전진인가 후퇴인가?). 어떤 수비 체계도 둘을 한 번에 답하지 못한다. 수평과 수직 책임이 서로 다른 선수에게 있기 때문이다. 잘못된 타이밍의 대각선은 흡수된다. 올바른 타이밍의 수직 볼은 듀얼이다. 움직임의 순간에 나오는 대각선은 무너진 구조다. 엔진들은 더해지지 않는다. 곱해진다.</>,
        <>이것들은 내가 <S>프리 하프스페이스</S>라 부르는 구역에서 가장 확실하게 점화된다: 중앙 3분의 1의 통로, 최종 3분의 1에서 패스나 드리블 한 번 거리, 하프스페이스 본체 바로 바깥. 수비의 무인지대에 놓여 있다 — 명확히 풀백의 것도, 명확히 미드필더의 것도 아니다. 터치라인이 가까워 턴오버 위험이 낮다. 하프스페이스로 들어가는 각은 기하학적으로 대각선이다.</>,
        <>그리고 이곳은 내가 가장 중시하는 움직임 — <S>2차 움직임</S> — 을 가능하게 한다: 볼을 하프스페이스로 내주고, 수비의 커버 슬라이드가 아직 진행 중일 때 곧바로 아크를 공략한다. 패서가 자기 패스에 대한 반응을 공격한다. 같은 2초 안에서 시간과 공간을 동시에 공략한다.</>,
      ],
      quote: <>잘못된 타이밍의 대각선은 흡수된다. 올바른 타이밍의 수직 볼은 듀얼이다. 움직임의 순간에 나오는 대각선은 무너진 구조다.</>,
    },
    s5: {
      tag: "§5 / 구조",
      heading: "그 대가를 치르는 구조",
      paras: [
        <>즉흥은 계획이 아니다. 구조가 위험을 뒷받침하지 않으면 변이는 혼돈으로 무너진다.</>,
        <>내 빌드업 코어는 하이브리드다. <S>하이 프레스에 맞선 3-2</S>: 수적 안정, 더블 피벗, 그리고 이미 볼 뒤에 서 있는 레스트 디펜스. <S>미들 혹은 로우 블록에 맞선 3-1</S>: 두 번째 피벗이 전진해, 실제로 경기가 결정되는 볼 앞쪽에 한 명을 더한다. 둘 사이의 전환 자체가 변이다 — 같은 선수, 다른 기하학 — 그리고 이는 페이즈 결정이기도 하다: 3-2는 전환에 대한 보호를 극대화하고, 3-1은 역습 구조를 완성한다. 전진한 피벗이 볼을 따내는 순간 곧바로 연결고리가 되기 때문이다.</>,
        <>나는 <S>피치 위에 동시에 존재하는 네 페이즈</S>로 설계한다: Plan A−(컨디셔닝 공격), Plan A(전환), 레스트 디펜스(우리가 공격하는 동안 이미 수비하고 있는 형태), 레스트 어택(우리가 수비하는 동안 이미 배치된 침투 요원). 각 페이즈는 이웃 페이즈의 구조적 전제 조건이다. 볼을 잃는 것이 치명적이라면 실행할 가치가 있는 Plan A는 없고 — 볼을 되찾는 구조 없이는 역습도 없다.</>,
        <>수비적으로 이 철학은 공격과 의도적으로 비대칭이다. <S>공격은 기대를 조작하고, 수비는 선택지를 제거한다.</S> 상실 이후: 약 7초의 게겐프레스 창 — 진짜 강도의 생리학적 한계 — 안에 볼을 되찾거나 역습의 템포를 죽인다. 그 이후엔 영웅주의 없이, 중앙을 닫고 상대를 측면 덫으로 몰아넣는 구조적 블록. 상대는 속아서가 아니라 구조가 다른 선택지를 남기지 않기에 덫으로 들어온다.</>,
        <>이것은 경제학적 결정이기도 하다. 리그 전체를 컨디셔닝하는 데 8개월이 걸리고, 풀타임으로 압박하는 선수단은 3월이면 부서진다. <S>지속가능성은 이 철학의 제약이 아니라 — 전제 조건이다.</S></>,
      ],
    },
    s6: {
      tag: "§6 / 반증",
      heading: "측정하기 — 그리고 그것을 깨뜨려 보기",
      paras: [
        <>실패할 수 없는 이론은 도구가 아니라 브랜드다. 그래서 내 프레임워크에 던지는 질문은 어떤 감독의 발상에도 던질 질문과 같다: <S>이것이 작동한다면 데이터는 어떻게 보일까 — 그리고 내가 나 자신을 속이고 있다면 어떻게 보일까?</S></>,
        <>점유율 점유율과 원시 위협 총량은 여기서 쓸모없다. 스페인은 2014 월드컵에 대회 최고의 점유율 프로필을 들고 와 조별리그에서 탈락했다: 골로 가는 경로 — 측면, 그다음 중앙, 언제나 그 순서 — 가 너무 예측 가능해져 판할의 5-3-2가 킥오프 전에 이미 풀어버렸다. 사리의 유벤투스는 세리에A를 우승했지만, 모든 상대가 한 노드 — 피아니치 — 를 지우면 빌드업이 꺼진다는 걸 알았다. 예측 불가능성 없는 점유는 그저 더 느리게 지는 방법일 뿐이다.</>,
        <>대신 내가 찾는 지문은 이렇다: <S>패스 네트워크 분산</S> — 매개 중심성이 빌드업 코어 전반에 퍼져 있는가, 아니면 한 노드가 계획을 짊어지는가? <S>고가치 행동의 타이밍 분산</S> — 위협 급등이 불규칙하고 학습 불가능한 순간에 오는가, 아니면 리듬을 타는가? <S>라인 브레이크 전환</S> — 수비 라인 브레이크가 최종 3분의 1 리셉션이 되는가, 아니면 고립된 사건으로 소멸하는가? <S>채널과 리시버 엔트로피</S> — 상대가 위협이 어디로, 누구를 통해 오는지 예측할 수 있는가?</>,
        <>거꾸로 읽으면 상대의 압박조차 이야기를 들려준다. 우리 빌드업에 대한 그들의 압박이 느슨해지면 컨디셔닝이 진행 중이다 — 그들은 유인을 위협으로 취급하기를 그만둔 것이다. 우리 전환 직후 그들의 압박 강도가 치솟으면, 우리는 데이터 속 버퍼링을 보고 있는 것이다.</>,
        <>무엇보다 하나의 규율: <S>경기는 잘못된 회계 단위다.</S> Plan A가 한 번도 발화하지 않은 한 경기는 반박이 아니라 — 학습 배치(batch)다. 시즌이 모델이다. 나는 변이를 시즌 규모로 평가하고, 단일 경기의 무득점(null)을 데이터로 다룬다.</>,
      ],
    },
    s7: {
      tag: "§7 / 적용",
      heading: "이것이 구단에 제공하는 것",
      paras: [
        <>이 프레임워크는 플레이 모델을 다시 세우라는 요구가 아니다. 기존의 작업을 더 날카롭게 만드는 렌즈다.</>,
        <><S>상대 분석</S>에서: 상대의 컨디셔닝 루프를 감지하고 — 우리가 유인당하고 있는 쪽일 때를 알아챈다. <S>영입</S>에서: 능력이 포지션과 모순되는 선수, 그리고 시그니처 무브 — 압박을 견디는, 깊이 자동화된 온더볼 습관 — 를 가진 선수를 높이 평가한다. 그들이 구조를 변수로 바꾸는 선수들이기 때문이다. <S>육성</S>에서: 적응성이 아직 훈련 가능한 골든 에이지에 멀티성을 훈련한다.</>,
        <>그리고 내가 하나의 정직한 한계로 — 오히려 특징으로 — 여기는 것: 프레임워크는 무엇을 지켜봐야 하는지, 그리고 조건이 언제 형성되는지를 알려준다. <Em>언제 전환할지는 여전히 인간의 결정이다.</Em> 분석관으로서 내 일은 그 결정을 순수한 직관에서 증거 쪽으로 옮기는 것이지 — 증거가 결정을 대신한다고 우기는 것이 결코 아니다.</>,
        <>이어지는 페이지들은 이 프레임워크를 실제 경기에 적용한다 — 그것이 실패하는 순간들을 포함해서. 바로 그 순간들이 이론이 값어치를 증명하는 지점이기 때문이다.</>,
      ],
    },
    cta: "이론은 값싸다. 적용되는 것을 보라 →",
  },
};

export default async function ApproachEssayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = CONTENT[locale];

  const Section = ({ id, s, children }: { id: string; s: SectionCopy; children?: ReactNode }) => (
    <section id={id} className="scroll-mt-16 mt-11 first:mt-0">
      <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>{s.tag}</span>
      <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>{s.heading}</h2>
      <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
        {s.paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {s.quote ? (
        <blockquote className="my-5 max-w-[640px]" style={{ fontSize: 15, lineHeight: 1.75, color: "var(--green-mid)", borderLeft: "2px solid var(--green-line)", padding: "4px 0 4px 20px", fontStyle: "italic" }}>
          {s.quote}
        </blockquote>
      ) : null}
      {children}
    </section>
  );

  const VisLabel = ({ children }: { children: ReactNode }) => (
    <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>{children}</p>
  );

  return (
    <div style={{ background: "var(--stage)" }}>
      {/* ── HERO ── */}
      <div className="px-6 md:px-12 pt-16 pb-10" style={{ borderBottom: "0.5px solid var(--edge)" }}>
        <p className="mono mb-3.5" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--green-mid)" }}>{t.heroTag}</p>
        <h1 className="font-medium mb-1.5" style={{ fontSize: "clamp(29px, 7vw, 40px)", letterSpacing: "-.01em", color: "var(--ink)" }}>{t.heroTitle}</h1>
        <p className="mb-6" style={{ fontSize: 15, color: "var(--ink-2)" }}>{t.heroSub}</p>
        <div className="rounded-xl p-5 max-w-[720px]" style={{ background: "var(--stage-2)", border: "0.5px solid var(--edge-2)", borderLeft: "2px solid var(--green-bright)", backdropFilter: "blur(8px)" }}>
          <blockquote style={{ fontSize: 15, lineHeight: 1.8, fontStyle: "italic", color: "var(--ink)" }}>{t.quote}</blockquote>
          <p className="mono mt-2.5" style={{ fontSize: 9, color: "var(--ink-4)" }}>{t.quoteAttr}</p>
        </div>
        <p className="mono mt-4" style={{ fontSize: 13, color: "var(--green-mid)" }}>{t.heroNote}</p>
      </div>

      <EssayNav locale={locale} />

      {/* ── ESSAY BODY ── */}
      <div className="px-6 md:px-12 py-12 max-w-[860px]">
        <Section id="s1" s={t.s1}>
          <div className="mt-6 mb-2">
            <VisLabel>{t.visLabels.v1}</VisLabel>
            <GridBufferDiagram />
          </div>
        </Section>

        <Section id="s2" s={t.s2}>
          <div className="mt-6 mb-2">
            <VisLabel>{t.visLabels.v2}</VisLabel>
            <DefinitionToggle />
          </div>
        </Section>

        <Section id="s3" s={t.s3}>
          <div className="mt-6 mb-2">
            <VisLabel>{t.visLabels.v3}</VisLabel>
            <ConditioningSequencer />
          </div>
        </Section>

        <Section id="s4" s={t.s4}>
          <div className="mt-6 mb-2 space-y-4">
            <VisLabel>{t.visLabels.v4}</VisLabel>
            <WhenWhereMatrix />
            <PreHalfSpaceMap />
          </div>
        </Section>

        <Section id="s5" s={t.s5}>
          <div className="mt-6 mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <VisLabel>{t.visLabels.v5a}</VisLabel>
              <ShapeMorph shapes={buildShapes} opponentNodes={opponentBlock} />
            </div>
            <div>
              <VisLabel>{t.visLabels.v5b}</VisLabel>
              <FourPhaseRing />
            </div>
          </div>
        </Section>

        <Section id="s6" s={t.s6}>
          <div className="mt-6 mb-2">
            <VisLabel>{t.visLabels.v6}</VisLabel>
            <KpiFingerprint />
          </div>
        </Section>

        <Section id="s7" s={t.s7}>
          <div className="mt-9">
            <p className="mono mb-3" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>{t.visLabels.conceptIndex}</p>
            <ConceptIndex locale={locale} />
          </div>
        </Section>
      </div>

      {/* ── CTA BAND ── */}
      <Link href="/match-analysis" className="flex items-center justify-center py-8 px-6 transition-colors duration-200" style={{ background: "var(--green-soft)", borderTop: "0.5px solid var(--green-line)" }}>
        <span className="mono" style={{ fontSize: 14, color: "var(--green-mid)" }}>{t.cta}</span>
      </Link>
    </div>
  );
}
