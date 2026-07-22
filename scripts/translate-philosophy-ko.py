#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
One-shot translator: builds public/variation-philosophy.ko.html from the
English public/variation-philosophy.html by exact-substring replacement.

All animation math, canvas drawing code, timings, coordinates, colors, and
JS logic are left byte-identical. Only human-readable text is swapped:
HTML prose (headings, paragraphs, tables, quotes, tags, buttons, captions)
and JS string literals that render as on-canvas labels or step-info text.

Football position abbreviations (GK, CB, DM, LW, RW, ST, AM, CM, LB, RB,
CDM, etc.) are left in English — these are used in English form in Korean
football media too. Formation labels like "3-2-4-1", "4-4-2" are unchanged.

Run: python3 scripts/translate-philosophy-ko.py
"""
import sys

SRC = "public/variation-philosophy.html"
DST = "public/variation-philosophy.ko.html"

with open(SRC, encoding="utf-8") as f:
    s = f.read()

R = []  # (english, korean, expected_count)

def add(en, ko, n=1):
    R.append((en, ko, n))

# ══════════════════════════════════════════════════════════════════
# HEAD
# ══════════════════════════════════════════════════════════════════
add("<title>Variation Theory — Jin's Football Philosophy</title>",
    "<title>변이 이론 — Jin의 축구 철학</title>")

# ══════════════════════════════════════════════════════════════════
# NAV
# ══════════════════════════════════════════════════════════════════
add('<span class="nav-brand">Variation Theory</span>', '<span class="nav-brand">변이 이론</span>')
add('<a href="#intro">Questions</a>', '<a href="#intro">질문</a>')
add('<a href="#terms">Glossary</a>', '<a href="#terms">용어</a>')
add('<a href="#spike">Spike</a>', '<a href="#spike">스파이크</a>')
add('<a href="#trap">Trap</a>', '<a href="#trap">트랩</a>')
add('<a href="#clutch">Clutch</a>', '<a href="#clutch">클러치</a>')
add('<a href="#pattern">Pattern</a>', '<a href="#pattern">패턴</a>')
add('<a href="#signature">Signature</a>', '<a href="#signature">시그니처</a>')
add('<a href="#formation">Formation</a>', '<a href="#formation">포메이션</a>')
add('<a href="#multi">Multiplicity</a>', '<a href="#multi">멀티성</a>')
add('<a href="#apply">Applications</a>', '<a href="#apply">적용</a>')
add('<a href="#defense">Defense</a>', '<a href="#defense">수비</a>')

# ══════════════════════════════════════════════════════════════════
# HERO
# ══════════════════════════════════════════════════════════════════
add('<div class="tag dark">Jin\'s Football Philosophy</div>', '<div class="tag dark">Jin의 축구 철학</div>')
add('<h1 style="color:#ffffff;font-size:3.8rem;font-weight:900">Variation<br><em style="color:#60A5FA;font-style:normal">Theory</em></h1>',
    '<h1 style="color:#ffffff;font-size:3.8rem;font-weight:900">변이<br><em style="color:#60A5FA;font-style:normal">이론</em></h1>')
add('<p class="sub">A football philosophy that dismantles defensive systems through variables and mutations. Make them learn your game — then weaponize their learning.</p>',
    '<p class="sub">변수와 변이로 수비 시스템을 해체하는 축구 철학. 상대에게 우리의 게임을 학습시킨 뒤 — 그 학습을 무기로 삼는다.</p>')
add('<span class="tag dark">Variable</span>', '<span class="tag dark">변수</span>')
add('<span class="tag dark">Mutation</span>', '<span class="tag dark">변이</span>')
add('<span class="tag dark">Lure & Shock</span>', '<span class="tag dark">루어 & 쇼크</span>')
add('<span class="tag dark">Deep Learning Mechanism</span>', '<span class="tag dark">딥러닝 메커니즘</span>')
add('<span class="tag dark">Buffering</span>', '<span class="tag dark">버퍼링</span>')

# ══════════════════════════════════════════════════════════════════
# 00 — QUESTIONS
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">00 — Origin</div>', '<div class="sec-deco">00 — 기원</div>')
add('<div class="ch-num">Questions</div>', '<div class="ch-num">질문</div>')
add('<h2>Four Questions Behind Variation Theory</h2>', '<h2>변이 이론의 출발점, 네 가지 질문</h2>')
add('<p class="desc">This philosophy starts with questions, not answers. Structural problems that modern football poses.</p>',
    '<p class="desc">이 철학은 답이 아니라 질문에서 시작한다. 현대 축구가 던지는 구조적 문제들.</p>')

add('<h4>Q. How do you break down a structured defensive block?</h4>',
    '<h4>Q. 짜여진 수비 블록을 어떻게 무너뜨리는가?</h4>')
add('<p>Since Pep\'s positional play (the grid system) became a standard game model of modern football, opposing teams started defending in a heavy low block — securing a point and looking for a few counter-attacks. Teams that want to attack proactively have had to reinvent themselves to find a breakthrough against that heavily structured low block. A new approach is needed.</p>',
    '<p>펩의 위치 놀이(그리드 시스템)가 현대 축구의 표준 게임 모델이 된 이후, 상대 팀들은 무거운 로우 블록으로 수비하기 시작했다 — 승점을 확보하고 몇 번의 역습을 노리면서. 능동적으로 공격하고 싶은 팀들은 그 촘촘한 로우 블록을 뚫기 위해 스스로를 재발명해야 했다. 새로운 접근이 필요하다.</p>')

add('<h4>Q. Is it still possible to run one game model for an entire season?</h4>',
    '<h4>Q. 시즌 내내 하나의 게임 모델만으로 버틸 수 있는가?</h4>')
add('<p>Can you go through 38 games — an entire competition — on a single game model? The opposition will analyse, adapt, and respond. A single plan becomes a predictable one.</p>',
    '<p>38경기, 시즌 전체를 단 하나의 게임 모델로 통과할 수 있는가? 상대는 분석하고, 적응하고, 대응한다. 단일 플랜은 예측 가능한 플랜이 된다.</p>')

add('<h4>Q. How do you sustain intensity in the 100-minute game?</h4>',
    '<h4>Q. 100분짜리 경기에서 강도를 어떻게 지속하는가?</h4>')
add('<p>Parking the bus is no longer viable. A sustainable system — physically, tactically, mentally — is essential. Full high-press throughout destroys squads — Klopp\'s Liverpool (2020-21) and Postecoglou\'s Tottenham (2024-25) proved it.</p>',
    '<p>버스를 세우는 것만으로는 더 이상 충분하지 않다. 신체적으로, 전술적으로, 정신적으로 지속 가능한 시스템이 필수다. 경기 내내 풀 하이프레스를 돌리면 선수단이 무너진다 — 클롭의 리버풀(2020-21)과 포스테코글루의 토트넘(2024-25)이 증명했다.</p>')

add('<h4>Q. How do you unlock player creativity and proactive decision-making?</h4>',
    '<h4>Q. 선수의 창의성과 능동적 판단력을 어떻게 끌어내는가?</h4>')
add('<p>Give a player only a role and you get a robot. The ability to read, adapt, and execute creatively within structure — the autonomy that fires at the clutch point — is the core condition of this philosophy.</p>',
    '<p>선수에게 역할만 주면 로봇이 나온다. 구조 안에서 읽고, 적응하고, 창의적으로 실행하는 능력 — 클러치 포인트에서 발화하는 그 자율성 — 이 이 철학의 핵심 조건이다.</p>')

# ══════════════════════════════════════════════════════════════════
# 01 — KEY TERMS
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">01 — Glossary</div>', '<div class="sec-deco">01 — 용어</div>')
add('<div class="ch-num">Key Terms</div>', '<div class="ch-num">핵심 용어</div>')
add('<h2>Key Terms</h2>', '<h2>핵심 용어</h2>')
add('<p class="desc">The concepts you need to understand this philosophy. Each section ahead covers them with animations and detail.</p>',
    '<p class="desc">이 철학을 이해하는 데 필요한 개념들. 뒤이어 각 섹션에서 애니메이션과 함께 자세히 다룬다.</p>')

add('<h3 style="margin-bottom:16px">Variable & Mutation — The Two Pillars</h3>',
    '<h3 style="margin-bottom:16px">변수 & 변이 — 두 개의 기둥</h3>')
add('<div class="tag" style="margin-bottom:14px">Variable</div>', '<div class="tag" style="margin-bottom:14px">변수</div>')
add('<p>The ability to make <strong>a different choice in the same situation</strong>. When the player on the ball can pass, dribble, or shoot — the defence faces a dilemma regardless of which they choose.</p>',
    '<p>같은 상황에서 <strong>다른 선택을 할 수 있는 능력</strong>. 볼을 가진 선수가 패스·드리블·슛 중 무엇을 고를 수 있다면 — 수비는 무엇을 고르든 딜레마에 빠진다.</p>')
add('<p>If Variable is about what choice you make, Mutation is about where you are becoming the variable itself.</p>',
    '<p>변수가 어떤 선택을 하느냐의 문제라면, 변이는 당신 자신이 어디서 그 변수 자체가 되느냐의 문제다.</p>')
add('<div class="cv-label">Variable Dilemma Simulation</div>', '<div class="cv-label">변수 딜레마 시뮬레이션</div>')
add('<button id="btnVarReset" style="font-size:.75rem;padding:5px 14px;border-radius:6px;background:#F1F5F9;border:1px solid var(--border);color:var(--slate);cursor:pointer">↺ Replay</button>',
    '<button id="btnVarReset" style="font-size:.75rem;padding:5px 14px;border-radius:6px;background:#F1F5F9;border:1px solid var(--border);color:var(--slate);cursor:pointer">↺ 다시보기</button>')

add('<div class="tag amber" style="margin-bottom:14px">Mutation</div>', '<div class="tag amber" style="margin-bottom:14px">변이</div>')
add('<p>A player <strong>departing their position to become the variable themselves</strong>. It reshapes the formation structure, dismantling the defence\'s established response system. Not just positional departure — but any unexpected play within their own position — even while staying in their designated position.</p>',
    '<p>선수가 <strong>자기 포지션을 벗어나 스스로 변수가 되는 것</strong>. 포메이션 구조 자체를 재편해, 수비의 기존 대응 체계를 해체한다. 단순히 포지션을 벗어나는 것만이 아니라 — 자기 포지션에 머물면서도 하는 예상 밖의 플레이 전부를 포함한다.</p>')
add('<p>Key condition: a player with <strong>abilities that contradict their position</strong> — an attacking defender, a defensive striker — violates expectations most powerfully.</p>',
    '<p>핵심 조건: <strong>포지션과 모순되는 능력</strong>을 가진 선수 — 공격적인 수비수, 수비적인 스트라이커 — 가 기대를 가장 강력하게 배반한다.</p>')
add('<div class="cv-label">Mutation Simulation</div>', '<div class="cv-label">변이 시뮬레이션</div>')
add('<span>① <span id="mutR1L">AM</span> <span id="mutR1S">Attacking MF</span></span>',
    '<span>① <span id="mutR1L">AM</span> <span id="mutR1S">공격형 미드필더</span></span>')
add('<span>② <span id="mutR2L">LW</span> <span id="mutR2S">Wide Winger</span></span>',
    '<span>② <span id="mutR2L">LW</span> <span id="mutR2S">와이드 윙어</span></span>')
add('<span>③ <span id="mutR3L">CDM</span> <span id="mutR3S">Build-up role</span></span>',
    '<span>③ <span id="mutR3L">CDM</span> <span id="mutR3S">빌드업 역할</span></span>')
add('<span id="mutCaption" style="font-size:.72rem;color:var(--slate);flex:1">Same player, n roles — where do you mark them?</span>',
    '<span id="mutCaption" style="font-size:.72rem;color:var(--slate);flex:1">같은 선수, n개의 역할 — 어디를 마크할 것인가?</span>')
add('<button id="btnMutReset" style="font-size:.75rem;padding:5px 14px;border-radius:6px;background:#F1F5F9;border:1px solid var(--border);color:var(--slate);cursor:pointer">↺ Replay</button>',
    '<button id="btnMutReset" style="font-size:.75rem;padding:5px 14px;border-radius:6px;background:#F1F5F9;border:1px solid var(--border);color:var(--slate);cursor:pointer">↺ 다시보기</button>')

add('<h3 style="margin-bottom:16px">Deep Learning Mechanism</h3>', '<h3 style="margin-bottom:16px">딥러닝 메커니즘</h3>')
add('<p><strong>We make the opposition learn us — then weaponize that learning.</strong> Just as deep learning builds capability through data, the more attack cycles accumulate, the stronger the conditioning effect.</p>',
    '<p><strong>상대에게 우리를 학습시킨 뒤 — 그 학습을 무기로 삼는다.</strong> 딥러닝이 데이터로 능력을 쌓아가듯, 공격 사이클이 쌓일수록 컨디셔닝 효과는 강해진다.</p>')
add('<div class="tag" style="margin-bottom:10px">Data</div>', '<div class="tag" style="margin-bottom:10px">데이터</div>')
add('<h4>Data</h4>', '<h4>데이터</h4>')
add('<p>Plan A- — repeat a <strong>complete attack cycle</strong> from build-up to shot. Not just possession. An act of providing learning data to the opposition.</p>',
    '<p>Plan A- — 빌드업부터 슛까지 <strong>완결된 공격 사이클</strong>을 반복한다. 단순 점유가 아니다. 상대에게 학습 데이터를 제공하는 행위다.</p>')
add('<div class="tag amber" style="margin-bottom:10px">Learning</div>', '<div class="tag amber" style="margin-bottom:10px">학습</div>')
add('<h4>Learning</h4>', '<h4>학습</h4>')
add('<p>The opponent learns "that\'s how they attack" → <strong>their response becomes automated (conditioned)</strong>. The more it accumulates across a season, the deeper the conditioning.</p>',
    '<p>상대는 "저렇게 공격하는구나"를 학습한다 → <strong>그들의 대응이 자동화(조건화)된다</strong>. 시즌에 걸쳐 쌓일수록 컨디셔닝은 깊어진다.</p>')
add('<div class="tag emerald" style="margin-bottom:10px">Application</div>', '<div class="tag emerald" style="margin-bottom:10px">적용</div>')
add('<h4>Application</h4>', '<h4>적용</h4>')
add('<p>The moment the conditioned defence auto-responds → <strong>Plan A executed → buffering maximized</strong>. The better they know us, the harder the Shock lands.</p>',
    '<p>조건화된 수비가 자동으로 반응하는 순간 → <strong>Plan A 실행 → 버퍼링 극대화</strong>. 상대가 우리를 잘 알수록 쇼크는 더 세게 꽂힌다.</p>')

add('<h3 style="margin-bottom:4px">Other Core Concepts</h3>', '<h3 style="margin-bottom:4px">그 외 핵심 개념</h3>')
add('<p class="muted" style="margin-bottom:20px;font-size:.9rem">Each concept is covered in detail with animations in its own section.</p>',
    '<p class="muted" style="margin-bottom:20px;font-size:.9rem">각 개념은 이어지는 섹션에서 애니메이션과 함께 자세히 다룬다.</p>')
add('<h4>Spike Theory — Lure → Shock</h4>', '<h4>스파이크 이론 — 루어 → 쇼크</h4>')
add('<p>Condition the opposition through repetition (Lure), then exploit their conditioned response to strike (Shock). The goal is an xT spike — a moment of sudden, sharp escalation.</p>',
    '<p>반복으로 상대를 조건화(루어)한 뒤, 조건화된 반응을 이용해 타격(쇼크)한다. 목표는 xT 스파이크 — 갑작스럽고 날카로운 급등의 순간.</p>')
add('<h4>Into the Trap</h4>', '<h4>덫 안으로</h4>')
add('<p>Don\'t avoid the defensive trap — step into it deliberately and escape via a pre-agreed pattern. The lateral pass protocol is the core tool.</p>',
    '<p>수비의 덫을 피하지 말고 — 의도적으로 그 안으로 들어가 미리 약속된 패턴으로 탈출한다. 횡패스 프로토콜이 핵심 도구다.</p>')
add('<h4>Clutch Point</h4>', '<h4>클러치 포인트</h4>')
add('<p>The moment a designated player receives the ball in a designated zone. The player-initiated trigger for pattern play. The switch that flips tempo.</p>',
    '<p>지정된 선수가 지정된 구역에서 볼을 받는 순간. 선수가 직접 발동하는 패턴 플레이의 트리거. 템포를 뒤집는 스위치.</p>')
add('<h4>Buffering</h4>', '<h4>버퍼링</h4>')
add('<p>A defender\'s cognitive delay. Triggered when an unexpected choice breaks an established expectation — a fleeting stall in their decision-making. That is the window where scoring chances are born.</p>',
    '<p>수비수의 인지 지연. 예상 밖의 선택이 굳어진 기대를 깰 때 발생한다 — 판단이 잠깐 멈추는 순간. 그 틈에서 득점 기회가 태어난다.</p>')
add('<h4>Pre-Half Space</h4>', '<h4>프리 하프스페이스</h4>')
add('<p>The zone just before the half-space. The transitional hub of Overload → Isolation switches. The team that owns this space controls the attack.</p>',
    '<p>하프스페이스 바로 직전의 구역. 오버로드 → 아이솔레이션 전환의 중계 허브. 이 공간을 소유한 팀이 공격을 지배한다.</p>')
add('<h4>Signature Move</h4>', '<h4>시그니처 무브</h4>')
add('<p>A player\'s unique on-ball habit fingerprint. The core press-escape tool and the individual-level Lure that conditions their marker. A non-negotiable regardless of position.</p>',
    '<p>선수의 고유한 온더볼 습관 지문. 압박 탈출의 핵심 도구이자 마커를 조건화하는 개인 단위 루어. 포지션과 무관하게 타협 불가능한 요소.</p>')

# ══════════════════════════════════════════════════════════════════
# 02 — SPIKE THEORY
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco" style="color:#475569">02 — Spike Theory</div>', '<div class="sec-deco" style="color:#475569">02 — 스파이크 이론</div>')
add('<div class="ch-num">Spike Theory</div>', '<div class="ch-num">스파이크 이론</div>')
add('<h2>Lure → Shock</h2>', '<h2>루어 → 쇼크</h2>')
add('<p class="desc">Condition through repetition (Lure), then exploit the conditioned response to strike (Shock). The core principle of the plan switch.</p>',
    '<p class="desc">반복으로 조건화(루어)한 뒤, 조건화된 반응을 이용해 타격(쇼크)한다. 플랜 전환의 핵심 원리.</p>')
add('<h3 style="color:#60A5FA;margin-bottom:14px">Plan A- (Lure) — Conditioning Repetition</h3>',
    '<h3 style="color:#60A5FA;margin-bottom:14px">Plan A- (루어) — 조건화 반복</h3>')
add('<p>Repeat complete attack cycles multiple times. Build-up to shot. Not just possession. Must be executed convincingly — <strong style="color:#fff">as if this is the real game model</strong> — for the opposition to learn..</p>',
    '<p>완결된 공격 사이클을 여러 번 반복한다. 빌드업부터 슛까지. 단순 점유가 아니다. 상대가 학습하도록 <strong style="color:#fff">이것이 진짜 게임 모델인 것처럼</strong> 설득력 있게 실행해야 한다.</p>')
add('<p>U-shape build-up example: short-pass recycling from the back → structural exploration → shot. Possession without a shot doesn\'t give the opposition learning data.</p>',
    '<p>U자형 빌드업 예시: 후방에서 짧은 패스로 순환 → 구조적 탐색 → 슛. 슛 없는 점유는 상대에게 학습 데이터를 주지 못한다.</p>')
add('<h3 style="color:#FDE68A;margin-bottom:14px">Plan A (Shock) — xT Spike</h3>',
    '<h3 style="color:#FDE68A;margin-bottom:14px">Plan A (쇼크) — xT 스파이크</h3>')
add('<p>The moment the opposition has fully adapted to Plan A- — when their response is automated — strike with an entirely different choice. <strong style="color:#fff">xT spikes sharply</strong>.</p>',
    '<p>상대가 Plan A-에 완전히 적응한 순간 — 대응이 자동화된 순간 — 완전히 다른 선택으로 타격한다. <strong style="color:#fff">xT가 급격히 치솟는다</strong>.</p>')
add('<p>Long ball example: conditioning complete via U-shape build-up (low-xT cycles) → sudden long ball into space behind → a momentary defensive buffering → high-xT situation entered.</p>',
    '<p>롱볼 예시: U자형 빌드업(저xT 사이클)으로 조건화 완료 → 갑작스러운 배후 공간 롱볼 → 순간적인 수비 버퍼링 → 고xT 상황 진입.</p>')
add('<h4>Plan A- Conditioning → Plan A SHOCK</h4>', '<h4>Plan A- 조건화 → Plan A 쇼크</h4>')
add('<span class="bdesc">Left: left flank overload conditioning / Right: right isolation SHOCK</span>',
    '<span class="bdesc">왼쪽: 왼쪽 측면 오버로드 조건화 / 오른쪽: 오른쪽 아이솔레이션 쇼크</span>')
add('<div class="cv-label" style="color:#60A5FA">Plan A- (Lure) — Conditioning Repetition</div>',
    '<div class="cv-label" style="color:#60A5FA">Plan A- (루어) — 조건화 반복</div>')
add('<div class="cv-label" style="color:#FDE68A">Plan A (Shock) — Strike</div>', '<div class="cv-label" style="color:#FDE68A">Plan A (쇼크) — 타격</div>')
add('<button class="btn-play" id="btnShock">SHOCK</button>', '<button class="btn-play" id="btnShock">쇼크</button>')
add('<button class="btn-reset" id="btnPlanReset">↺ Reset</button>', '<button class="btn-reset" id="btnPlanReset">↺ 리셋</button>')
add('<div class="step-info" id="infoPlan">Left flank overload looping — hit SHOCK to trigger right isolation</div>',
    '<div class="step-info" id="infoPlan">왼쪽 측면 오버로드 반복 중 — 쇼크를 눌러 오른쪽 아이솔레이션 발동</div>')
add('<div class="board-top"><h4>Plan A (Shock) — Strike: Overload → Isolation</h4><span class="bdesc">The situation after the switch — one Overload→Isolation move opens a momentary buffering gap</span></div>',
    '<div class="board-top"><h4>Plan A (쇼크) — 타격: 오버로드 → 아이솔레이션</h4><span class="bdesc">전환 이후 상황 — 오버로드→아이솔레이션 한 번의 움직임이 순간적인 버퍼링 틈을 연다</span></div>')
add('<button class="btn-play" id="btnBufPlay">▶ Start</button>', '<button class="btn-play" id="btnBufPlay">▶ 시작</button>')
add('<button class="btn-reset" id="btnBufReset">↺ Reset</button>', '<button class="btn-reset" id="btnBufReset">↺ 리셋</button>')
add('<div class="step-info" id="infoBuf">Plan A- left overload → awaiting SHOCK trigger</div>',
    '<div class="step-info" id="infoBuf">Plan A- 왼쪽 오버로드 → 쇼크 트리거 대기 중</div>')
add('<div class="flow-item hi"><div class="fl">Lure</div><h4>Plan A- Cycle</h4><p>Complete attack cycle. Opposition conditioning in progress.</p></div>',
    '<div class="flow-item hi"><div class="fl">루어</div><h4>Plan A- 사이클</h4><p>완결된 공격 사이클. 상대 조건화 진행 중.</p></div>')
add('<div class="flow-item"><div class="fl">Judgement</div><h4>Manager\'s Read</h4><p>Assessing conditioning progress + game flow + scoreline</p></div>',
    '<div class="flow-item"><div class="fl">판단</div><h4>감독의 판단</h4><p>조건화 진행도 + 경기 흐름 + 스코어 평가</p></div>')
add('<div class="flow-item hi2"><div class="fl">Shock</div><h4>Plan A Strike</h4><p>Breaking expectations → buffering → high-xT transition</p></div>',
    '<div class="flow-item hi2"><div class="fl">쇼크</div><h4>Plan A 타격</h4><p>기대 배반 → 버퍼링 → 고xT 전환</p></div>')
add('<div class="flow-item"><div class="fl">Loop</div><h4>Loop</h4><p>If opposition resets, Plan A- can be recycled as Plan B</p></div>',
    '<div class="flow-item"><div class="fl">루프</div><h4>루프</h4><p>상대가 리셋되면 Plan A-를 Plan B로 재활용 가능</p></div>')
add('<h4>Core Principles</h4>', '<h4>핵심 원칙</h4>')
add('<p>① If Plan A- is working, there\'s no need to pull out Plan A — Plan A- becomes the plan.</p>',
    '<p>① Plan A-가 통하고 있다면 Plan A를 꺼낼 필요 없다 — Plan A- 자체가 플랜이 된다.</p>')
add('<p>② After Plan A fires, if the opposition resets, Plan A- can be recycled as Plan B. There\'s no fixed order.</p>',
    '<p>② Plan A 발동 후 상대가 리셋되면 Plan A-를 Plan B로 재활용할 수 있다. 정해진 순서는 없다.</p>')
add('<p>③ The timing of the switch is not algorithmic — it\'s the <strong style="color:#60A5FA">manager\'s judgement call</strong>.</p>',
    '<p>③ 전환 타이밍은 알고리즘이 아니다 — <strong style="color:#60A5FA">감독의 판단</strong>이다.</p>')

# ══════════════════════════════════════════════════════════════════
# 03 — INTO THE TRAP
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">03 — Core Concept</div>', '<div class="sec-deco">03 — 핵심 개념</div>')
add('<div class="ch-num">Into the Trap</div>', '<div class="ch-num">덫 안으로</div>')
add('<h2>Step Into the Trap</h2>', '<h2>덫 안으로 들어가라</h2>')
add('<p class="desc">Don\'t go around the defensive trap — step inside deliberately and solve it from within. The only reproducible method for breaking structured defences.</p>',
    '<p class="desc">수비의 덫을 돌아가지 말고 — 의도적으로 안으로 들어가 내부에서 풀어낸다. 짜여진 수비를 깨는 유일하게 재현 가능한 방법.</p>')
add('<h3 style="margin-bottom:14px">Defining the Trap</h3>', '<h3 style="margin-bottom:14px">덫의 정의</h3>')
add('<p>Every defensive structure has an intended trap. High block creates numerical superiority up front; mid-block increases central density to channel wide; low block seals off the final third entirely. <strong>The shape varies, but the purpose is singular — draw the attacking team into a chosen position and deal with them there.</strong></p>',
    '<p>모든 수비 구조에는 의도된 덫이 있다. 하이 블록은 전방에서 수적 우위를 만들고, 미드 블록은 중앙 밀도를 높여 측면으로 유도하며, 로우 블록은 파이널 서드를 완전히 봉쇄한다. <strong>형태는 다르지만 목적은 하나다 — 공격팀을 원하는 위치로 끌어들여 그곳에서 처리하는 것.</strong></p>')
add('<div class="bq-amber bq" style="margin-top:16px">\n          <p>Methods that avoid the trap are inconsistent. Individual quality depends on condition; set pieces are limited in frequency; going around it only lasts until the opposition adjusts direction and you\'re back inside.</p>\n        </div>',
    '<div class="bq-amber bq" style="margin-top:16px">\n          <p>덫을 피하는 방법들은 일관성이 없다. 개인 기량은 컨디션에 좌우되고, 세트피스는 빈도가 제한적이며, 돌아가는 방법은 상대가 방향을 조정하면 다시 안으로 밀려 들어갈 뿐이다.</p>\n        </div>')
add('<h3 style="margin-bottom:14px">Why Step In</h3>', '<h3 style="margin-bottom:14px">왜 안으로 들어가는가</h3>')
add('<p>Across a 38-game season, through a full tournament — if you need a <strong>reproducible attacking entry methodology</strong>, going around the trap is not the answer. <strong>Pre-agreeing how to escape from inside</strong> is the only reliably reproducible solution.</p>',
    '<p>38경기 시즌 내내, 대회 전체를 통틀어 — <strong>재현 가능한 공격 진입 방법론</strong>이 필요하다면 덫을 돌아가는 것은 답이 아니다. <strong>안에서 탈출하는 방법을 미리 약속하는 것</strong>이 유일하게 신뢰할 수 있는 재현 가능한 해법이다.</p>')
add('<p>The moment you escape with one pre-agreed pass from inside the trap, the defenders who committed to the press are stranded on the wrong side. <strong>Space opens instantly.</strong></p>',
    '<p>덫 안에서 미리 약속된 패스 한 번으로 탈출하는 순간, 압박에 커밋한 수비수들은 엉뚱한 쪽에 고립된다. <strong>공간이 즉시 열린다.</strong></p>')
add('<thead><tr><th>Block Type</th><th>Trap Shape</th><th>Into the Trap Response</th></tr></thead>',
    '<thead><tr><th>블록 유형</th><th>덫의 형태</th><th>Into the Trap 대응</th></tr></thead>')
add('<tr><td>High Block</td><td>Direct press + numerical advantage</td><td class="hi">Lateral pass protocol → press nullified</td></tr>',
    '<tr><td>하이 블록</td><td>직접 압박 + 수적 우위</td><td class="hi">횡패스 프로토콜 → 압박 무력화</td></tr>')
add('<tr><td>Mid Block</td><td>Midfield density + channelling</td><td class="hi">Lateral pass protocol → escape</td></tr>',
    '<tr><td>미드 블록</td><td>중원 밀도 + 유도</td><td class="hi">횡패스 프로토콜 → 탈출</td></tr>')
add('<tr><td>Low Block</td><td>Final third entry sealed</td><td class="hi">Lateral pass protocol → escape</td></tr>',
    '<tr><td>로우 블록</td><td>파이널 서드 진입 봉쇄</td><td class="hi">횡패스 프로토콜 → 탈출</td></tr>')
add('<h4>Lateral Pass × Pre-Agreed Pattern Play</h4>', '<h4>횡패스 × 사전 합의 패턴 플레이</h4>')
add('<span class="bdesc">Man-marking → lateral pass → space created — 6 stages</span>',
    '<span class="bdesc">맨마킹 → 횡패스 → 공간 창출 — 6단계</span>')
add('<button class="btn-play" id="btnTrapPlay">▶ Play</button>', '<button class="btn-play" id="btnTrapPlay">▶ 재생</button>')
add('<button class="btn-reset" id="btnTrapReset">↺ Reset</button>', '<button class="btn-reset" id="btnTrapReset">↺ 리셋</button>')
add('<div class="step-info" id="infoTrap">▶ Hit Play to simulate the lateral pass protocol</div>',
    '<div class="step-info" id="infoTrap">▶ 재생을 눌러 횡패스 프로토콜을 시뮬레이션</div>')
add('<h4 style="color:#FDE68A">Into the Trap as a Defensive Structure Breaker</h4>',
    '<h4 style="color:#FDE68A">수비 구조를 깨는 방법으로서의 Into the Trap</h4>')
add('<p>Into the Trap is not just a tactical option. It\'s a <strong style="color:#FDE68A">strategic conclusion</strong> reached after accepting the universality of the trap. One protocol that works against high block, mid block,and low block. The universality of the protocol is what makes this philosophy actionable.</p>',
    '<p>Into the Trap은 단순한 전술적 선택지가 아니다. 덫의 보편성을 받아들인 끝에 도달한 <strong style="color:#FDE68A">전략적 결론</strong>이다. 하이 블록, 미드 블록, 로우 블록 모두에 통하는 하나의 프로토콜. 이 보편성이 이 철학을 현장에서 실행 가능하게 만든다.</p>')

# ══════════════════════════════════════════════════════════════════
# 04 — CLUTCH POINT
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">04 — Execution Trigger</div>', '<div class="sec-deco">04 — 실행 트리거</div>')
add('<div class="ch-num">Clutch Point</div>', '<div class="ch-num">클러치 포인트</div>')
add('<h2>Clutch Point</h2>', '<h2>클러치 포인트</h2>')
add('<p class="desc">The moment a designated player receives the ball in a designated zone with the baseline conditions for pattern play met. Player-initiated execution is everything.</p>',
    '<p class="desc">지정된 선수가 지정된 구역에서 패턴 플레이의 기본 조건을 갖춘 채 볼을 받는 순간. 선수 스스로의 실행이 전부다.</p>')
add('<h3 style="margin-bottom:14px">Definition and Trigger Conditions</h3>', '<h3 style="margin-bottom:14px">정의와 발동 조건</h3>')
add('<p>The Clutch Point is the <strong>moment the attack cycle switches into high-speed pattern play execution</strong> within the U-shape build-up. This is the trigger for the tempo switch.</p>',
    '<p>클러치 포인트는 U자형 빌드업 안에서 <strong>공격 사이클이 고속 패턴 플레이 실행으로 전환되는 순간</strong>이다. 템포 전환의 트리거다.</p>')
add('<p>Fires when three conditions are met simultaneously: <strong>① Designated player + ② Designated zone + ③ Baseline defensive structure in place</strong></p>',
    '<p>세 조건이 동시에 충족될 때 발동한다: <strong>① 지정된 선수 + ② 지정된 구역 + ③ 기본 수비 구조 형성</strong></p>')
add('<div class="bq" style="margin-top:16px">\n          <p>A manager can\'t call the Clutch Point for 90 minutes. It must be internalised through training — players need to recognise and fire it proactively themselves.</p>\n        </div>',
    '<div class="bq" style="margin-top:16px">\n          <p>감독이 90분 내내 클러치 포인트를 지시할 수는 없다. 훈련을 통해 체화되어야 한다 — 선수 스스로 인지하고 능동적으로 발동해야 한다.</p>\n        </div>')
add('<h3 style="margin-bottom:14px">Tempo Switch — Speed Multiplication</h3>', '<h3 style="margin-bottom:14px">템포 전환 — 속도의 배가</h3>')
add('<p>The U-shape build-up\'s horizontal, slow tempo switches immediately to <strong>vertical, high-speed pattern play</strong> at the Clutch Point. That speed differential itself triggers defensive buffering.</p>',
    '<p>U자형 빌드업의 수평적이고 느린 템포는 클러치 포인트에서 즉시 <strong>수직적이고 빠른 패턴 플레이</strong>로 전환된다. 이 속도 차이 자체가 수비의 버퍼링을 유발한다.</p>')
add('<p>This is the same core idea introduced earlier as the lateral-pass <strong>pre-agreed pattern play</strong> — one philosophy applied at a different scale. Whether it is the lateral-pass protocol escaping the trap or the Clutch Point firing the tempo switch, everything points in a single direction: a pre-agreed pattern that manufactures buffering.</p>',
    '<p>앞서 소개한 횡패스의 <strong>사전 합의 패턴 플레이</strong>와 같은 핵심 아이디어다 — 하나의 철학이 다른 스케일에 적용된 것. 덫을 탈출하는 횡패스 프로토콜이든, 템포를 전환하는 클러치 포인트든, 모두 하나의 방향을 가리킨다: 버퍼링을 만들어내는 사전 합의 패턴.</p>')
add('<p>One-touch play + pre-agreed passing routes = attack executed faster than defensive cognition. The pattern completes before defenders can respond.</p>',
    '<p>원터치 플레이 + 사전 합의된 패싱 루트 = 수비의 인지 속도보다 빠르게 실행되는 공격. 수비가 반응하기 전에 패턴이 완성된다.</p>')
add('<thead><tr><th>Level</th><th>Decision Maker</th><th>Content</th><th>How</th></tr></thead>',
    '<thead><tr><th>레벨</th><th>결정 주체</th><th>내용</th><th>방법</th></tr></thead>')
add('<tr><td><strong>Macro</strong></td><td>Manager</td><td>Plan tactical structure switch</td><td>Reading the game, decisive call</td></tr>',
    '<tr><td><strong>매크로</strong></td><td>감독</td><td>전술 구조 전환 계획</td><td>경기 읽기, 결단</td></tr>')
add('<tr><td class="hi"><strong>Micro</strong></td><td>Player</td><td>Pattern trigger within possession</td><td>Internalised through training, self-initiated</td></tr>',
    '<tr><td class="hi"><strong>마이크로</strong></td><td>선수</td><td>점유 내 패턴 발동</td><td>훈련으로 체화, 자발적 실행</td></tr>')
add('<h4 style="color:var(--blue);margin-bottom:10px">Conditions for Proactive Football</h4>', '<h4 style="color:var(--blue);margin-bottom:10px">능동적 축구의 조건</h4>')
add('<p>To play proactive rather than reactive football, players must read the situation and act on their own judgement. The Clutch Point is where that autonomy ignites.</p>',
    '<p>반응적이 아닌 능동적 축구를 하려면, 선수가 상황을 읽고 스스로 판단해 행동해야 한다. 클러치 포인트는 그 자율성이 발화하는 지점이다.</p>')
add('<h4 style="color:var(--amber);margin-bottom:10px">Creativity × Structure</h4>', '<h4 style="color:var(--amber);margin-bottom:10px">창의성 × 구조</h4>')
add('<p>Giving players freedom within the pre-agreed pattern (structure). Provide the frame — but how they adapt and execute at the Clutch Point is the player\'s call. Creativity operating inside structure.</p>',
    '<p>사전 합의된 패턴(구조) 안에서 선수에게 자유를 준다. 틀은 제공하되 — 클러치 포인트에서 어떻게 변형하고 실행할지는 선수의 몫이다. 구조 안에서 작동하는 창의성.</p>')
add('<h4>Clutch Point Simulation</h4>', '<h4>클러치 포인트 시뮬레이션</h4>')
add('<span class="bdesc">U-shape build-up → Clutch Point triggered → high-speed pattern play</span>',
    '<span class="bdesc">U자형 빌드업 → 클러치 포인트 발동 → 고속 패턴 플레이</span>')
add('<button class="btn-play" id="btnClutchPlay">▶ Play</button>', '<button class="btn-play" id="btnClutchPlay">▶ 재생</button>')
add('<button class="btn-reset" id="btnClutchReset">↺ Reset</button>', '<button class="btn-reset" id="btnClutchReset">↺ 리셋</button>')
add('<div class="step-info" id="infoClutch">U-shape build-up — slow, deliberate tempo</div>',
    '<div class="step-info" id="infoClutch">U자형 빌드업 — 느리고 신중한 템포</div>')

# ══════════════════════════════════════════════════════════════════
# 05 — PRE-AGREED PATTERN PLAY & BUFFERING
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">05 — Pattern Play</div>', '<div class="sec-deco">05 — 패턴 플레이</div>')
add('<div class="ch-num">Pre-Agreed Pattern Play</div>', '<div class="ch-num">사전 합의 패턴 플레이</div>')
add('<h2>Pre-Agreed Pattern Play & Buffering</h2>', '<h2>사전 합의 패턴 플레이 & 버퍼링</h2>')
add('<p class="desc">The only reliable condition for consistent chance creation in modern football. The lateral pass is the core tool.</p>',
    '<p class="desc">현대 축구에서 일관된 찬스 창출을 위한 유일하게 믿을 수 있는 조건. 횡패스가 핵심 도구다.</p>')
add('<h3 style="margin-bottom:14px">Why Pattern Play Matters in Modern Football</h3>', '<h3 style="margin-bottom:14px">현대 축구에서 패턴 플레이가 중요한 이유</h3>')
add('<p>Modern defence has standardised man-marking-based direct press. Improvised play struggles to replicate consistently against organised pressure. You need a <strong>reproducible attacking entry methodology across a 38-game season</strong>, and the answer is pre-agreed pattern play.</p>',
    '<p>현대 수비는 맨마킹 기반 직접 압박을 표준화했다. 즉흥적인 플레이는 조직된 압박 앞에서 일관되게 재현되기 어렵다. <strong>38경기 시즌 내내 재현 가능한 공격 진입 방법론</strong>이 필요하며, 그 답이 사전 합의 패턴 플레이다.</p>')
add('<h3 style="margin-top:24px;margin-bottom:14px">The Tactical Meaning of the Lateral Pass</h3>', '<h3 style="margin-top:24px;margin-bottom:14px">횡패스의 전술적 의미</h3>')
add('<p>The lateral pass isn\'t just ball movement. It\'s a <strong>tool for redirecting pressure</strong>. When defensive pressure has concentrated in one direction, the lateral pass neutralises that line of pressure and creates new space.</p>',
    '<p>횡패스는 단순한 볼 이동이 아니다. <strong>압박의 방향을 되돌리는 도구</strong>다. 수비 압박이 한 방향으로 집중됐을 때, 횡패스는 그 압박 라인을 무력화하고 새 공간을 만든다.</p>')
add('<p>One-touch lateral pass application → ball speed exceeds defensive reaction speed → <strong>tempo spike = xT spike</strong></p>',
    '<p>원터치 횡패스 적용 → 볼 스피드가 수비 반응 속도를 앞지름 → <strong>템포 스파이크 = xT 스파이크</strong></p>')
add('<h3 style="margin-bottom:14px">Buffering — A Fleeting Window of Opportunity</h3>', '<h3 style="margin-bottom:14px">버퍼링 — 찰나의 기회의 창</h3>')
add('<p>A defender\'s cognitive delay. The momentary decision gap triggered when an unexpected choice breaks their conditioned expectation. That window is where scoring chances are made.</p>',
    '<p>수비수의 인지 지연. 예상 밖의 선택이 조건화된 기대를 깰 때 발생하는 순간적인 판단 공백. 그 틈에서 득점 기회가 만들어진다.</p>')
add('<div class="bq-amber bq" style="margin-top:16px">\n          <p>Buffering goal: condition the defence to predict "what will they choose next" — then violate that expectation with a different choice and create a momentary cognitive gap.</p>\n        </div>',
    '<div class="bq-amber bq" style="margin-top:16px">\n          <p>버퍼링의 목표: 수비가 "다음엔 뭘 선택할까"를 예측하도록 조건화한 뒤 — 다른 선택으로 그 기대를 배반해 순간적인 인지 공백을 만든다.</p>\n        </div>')

# ══════════════════════════════════════════════════════════════════
# 06 — PRE-HALF SPACE
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco" style="color:#475569">06 — Space</div>', '<div class="sec-deco" style="color:#475569">06 — 공간</div>')
add('<div class="ch-num">Pre-Half Space</div>', '<div class="ch-num">프리 하프스페이스</div>')
add('<h2>The Team That Owns the Space<br>Owns the Attack</h2>', '<h2>공간을 소유한 팀이<br>공격을 지배한다</h2>')
add('<p class="desc">The zone just before the half-space. The transitional hub of Overload→Isolation switches, and where the attacking engine fires.</p>',
    '<p class="desc">하프스페이스 바로 직전의 구역. 오버로드→아이솔레이션 전환의 중계 허브이며 공격 엔진이 점화되는 곳.</p>')
add('<h3 style="color:#60A5FA;margin-bottom:14px">Defining the Pre-Half Space</h3>', '<h3 style="color:#60A5FA;margin-bottom:14px">프리 하프스페이스의 정의</h3>')
add('<p>The intermediate zone just before entering the half-space (goal-side diagonal channel). xT jumps to the 0.08–0.20 range here, and any player receiving in this zone simultaneously holds two options.</p>',
    '<p>하프스페이스(골대 쪽 대각선 채널)로 진입하기 직전의 중간 구역. 이 지점에서 xT는 0.08–0.20 범위로 뛰어오르며, 이 구역에서 볼을 받는 선수는 동시에 두 가지 옵션을 쥐게 된다.</p>')
add('<p><strong style="color:#fff">① Direct penetration into the half-space, then move diagonally into the cut-back position</strong><br>\n        <strong style="color:#fff">② Switch the flank of the pitch</strong></p>',
    '<p><strong style="color:#fff">① 하프스페이스로 직접 침투한 뒤 대각선으로 컷백 위치로 이동</strong><br>\n        <strong style="color:#fff">② 반대 측면으로 전환</strong></p>')
add('<p>Holding both options simultaneously is what creates a structural dilemma for the defence.</p>',
    '<p>두 옵션을 동시에 쥐고 있다는 것 자체가 수비에게 구조적 딜레마를 만든다.</p>')
add('<h3 style="color:#60A5FA;margin-bottom:14px">Why This Space Matters</h3>', '<h3 style="color:#60A5FA;margin-bottom:14px">이 공간이 중요한 이유</h3>')
add('<p>The switch from Overload to Isolation is instant. The PHS is where that switch happens most naturally. Without a player occupying PHS, the transition channel is blocked.</p>',
    '<p>오버로드에서 아이솔레이션으로의 전환은 즉각적이다. PHS는 그 전환이 가장 자연스럽게 일어나는 지점이다. PHS를 점유하는 선수가 없으면 전환 통로가 막힌다.</p>')
add('<p>In the hybrid formation, the inverted fullback, attacking midfielder, and winger rotate to control this space — that rotation is the core of the design.</p>',
    '<p>하이브리드 포메이션에서는 인버티드 풀백, 공격형 미드필더, 윙어가 이 공간을 통제하기 위해 로테이션한다 — 그 로테이션이 설계의 핵심이다.</p>')
add('<div class="bq-dark bq" style="margin-top:16px">\n          <p>PHS is not a single fixed zone — it exists on both sides of the pitch and is dynamically redefined based on attack direction.</p>\n        </div>',
    '<div class="bq-dark bq" style="margin-top:16px">\n          <p>PHS는 고정된 하나의 구역이 아니다 — 피치 양쪽에 존재하며 공격 방향에 따라 동적으로 재정의된다.</p>\n        </div>')
add('<div class="board-top"><h4>Pre-Half Space — Two Engines Firing</h4><span class="bdesc">Space occupied → two options held simultaneously → defensive dilemma</span></div>',
    '<div class="board-top"><h4>프리 하프스페이스 — 두 엔진의 점화</h4><span class="bdesc">공간 점유 → 두 옵션 동시 보유 → 수비 딜레마</span></div>')
add('<button class="btn-play" id="btnPHSPlay">▶ Next</button>', '<button class="btn-play" id="btnPHSPlay">▶ 다음</button>')
add('<button class="btn-reset" id="btnPHSReset">↺ Reset</button>', '<button class="btn-reset" id="btnPHSReset">↺ 리셋</button>')
add('<div class="step-info" id="infoPHS">Checking space distribution and PHS position</div>',
    '<div class="step-info" id="infoPHS">공간 분포와 PHS 위치 확인 중</div>')

# ══════════════════════════════════════════════════════════════════
# 07 — SIGNATURE MOVE
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">07 — Individual</div>', '<div class="sec-deco">07 — 개인</div>')
add('<div class="ch-num">Signature Move</div>', '<div class="ch-num">시그니처 무브</div>')
add('<h2>A Player\'s Unique<br>On-Ball Fingerprint</h2>', '<h2>선수 고유의<br>온더볼 지문</h2>')
add('<p class="desc">The execution mechanism for individual-level Lure and Shock. You don\'t have to be elite — one solid Signature Move is enough to beat the press.</p>',
    '<p class="desc">개인 단위 루어 앤 쇼크의 실행 메커니즘. 엘리트일 필요는 없다 — 확실한 시그니처 무브 하나면 압박을 이기기에 충분하다.</p>')
add('<p>"Not every centre-back can be a crack player. But every one of them needs at least one reliable Signature Move they can call on under pressure."</p>',
    '<p>"모든 센터백이 발재간이 뛰어날 필요는 없다. 하지만 모두에게 압박 속에서 꺼내 쓸 수 있는 믿을 만한 시그니처 무브가 최소 하나는 필요하다."</p>')
add('<h3 style="margin-bottom:14px">Why This Concept Exists</h3>', '<h3 style="margin-bottom:14px">이 개념이 존재하는 이유</h3>')
add('<p>As man-marking-based direct press has become standard in modern football, <strong>on-ball quality is now demanded at every position</strong>. When build-up core players like CB or DM buckle under press, the entire team structure shakes.</p>',
    '<p>맨마킹 기반 직접 압박이 현대 축구의 표준이 되면서, <strong>모든 포지션에 온더볼 퀄리티가 요구된다</strong>. CB나 DM 같은 빌드업 핵심 선수가 압박에 무너지면 팀 구조 전체가 흔들린다.</p>')
add('<p>If you can\'t be elite — <strong>deeply internalise one solid on-ball habit.</strong> That\'s the realistic individual-level solution to beating man-marking pressure.</p>',
    '<p>엘리트가 될 수 없다면 — <strong>확실한 온더볼 습관 하나를 깊이 체화하라.</strong> 그것이 맨마킹 압박을 이기는 현실적인 개인 단위 해법이다.</p>')
add('<h3 style="margin-top:24px;margin-bottom:14px">Two Core Functions</h3>', '<h3 style="margin-top:24px;margin-bottom:14px">두 가지 핵심 기능</h3>')
add('<h4 style="font-size:.9rem;color:var(--blue);margin-bottom:6px">① Press Escape</h4>', '<h4 style="font-size:.9rem;color:var(--blue);margin-bottom:6px">① 압박 탈출</h4>')
add('<p style="font-size:.85rem">The on-ball escape pattern that comes naturally under intense press. The most fundamental function of the Signature Move.</p>',
    '<p style="font-size:.85rem">강한 압박 속에서 자연스럽게 나오는 온더볼 탈출 패턴. 시그니처 무브의 가장 근본적인 기능.</p>')
add('<h4 style="font-size:.9rem;color:var(--amber);margin-bottom:6px">② Next Action Setup</h4>', '<h4 style="font-size:.9rem;color:var(--amber);margin-bottom:6px">② 다음 동작 준비</h4>')
add('<p style="font-size:.85rem">The habitual preparation that sets up the next action more comfortably. Operates unconsciously, below awareness.</p>',
    '<p style="font-size:.85rem">다음 동작을 더 편하게 준비시키는 습관적 동작. 의식 아래에서 무의식적으로 작동한다.</p>')
add('<h3 style="margin-bottom:14px">Individual-Level Lure and Shock</h3>', '<h3 style="margin-bottom:14px">개인 단위 루어 앤 쇼크</h3>')
add('<p>The signature move operates as a Lure and Shock mechanism at the individual level too. Once the marker learns the player\'s signature-move pattern — that expectation itself becomes the new Lure. Exploiting the marker\'s expectation is the individual Shock.</p>',
    '<p>시그니처 무브는 개인 단위에서도 루어 앤 쇼크 메커니즘으로 작동한다. 마커가 선수의 시그니처 무브 패턴을 학습하면 — 그 기대 자체가 새로운 루어가 된다. 마커의 기대를 이용하는 것이 개인 단위 쇼크다.</p>')
add('<thead><tr><th>On-Ball Action</th><th>Fingerprint Expression</th></tr></thead>',
    '<thead><tr><th>온더볼 동작</th><th>지문의 표현</th></tr></thead>')
add('<tr><td><strong>Touch Habit</strong></td><td>How close/far, which part of the foot contacts the ball</td></tr>',
    '<tr><td><strong>터치 습관</strong></td><td>공과의 거리감, 발의 어느 부위로 접촉하는가</td></tr>')
add('<tr><td><strong>Turn Direction</strong></td><td>Which way they instinctively turn under press</td></tr>',
    '<tr><td><strong>턴 방향</strong></td><td>압박 속에서 본능적으로 도는 방향</td></tr>')
add('<tr><td><strong>Upper Body Feint</strong></td><td>Repeated upper-body motion that shifts the defender\'s weight</td></tr>',
    '<tr><td><strong>상체 페인트</strong></td><td>수비의 무게중심을 흔드는 반복적인 상체 동작</td></tr>')
add('<tr><td><strong>Pivot Foot</strong></td><td>Preferred foot positioning in the moment of receiving</td></tr>',
    '<tr><td><strong>축발</strong></td><td>볼을 받는 순간 선호하는 발 위치</td></tr>')
add('<p>The La Croqueta carries Iniesta\'s name; the Marseille Turn carries Zidane\'s. Not because of the technique — but because it is their body language.</p>',
    '<p>라 크로케타에는 이니에스타의 이름이 붙고, 마르세유 턴에는 지단의 이름이 붙는다. 기술 자체 때문이 아니라 — 그것이 그들의 몸짓이기 때문이다.</p>')

# ══════════════════════════════════════════════════════════════════
# 08 — HYBRID FORMATION
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">08 — Structure</div>', '<div class="sec-deco">08 — 구조</div>')
add('<div class="ch-num">Hybrid Formation</div>', '<div class="ch-num">하이브리드 포메이션</div>')
add('<h2>3-2 / 3-1 Hybrid Formation</h2>', '<h2>3-2 / 3-1 하이브리드 포메이션</h2>')
add('<p class="desc">An era where roles matter more than positions. A structural design built to realise Mutation — role-based fluid formation.</p>',
    '<p class="desc">포지션보다 역할이 중요한 시대. 변이를 실현하기 위한 구조적 설계 — 역할 기반의 유동적 포메이션.</p>')
add('<p>"Roles are becoming more important than positions. Same role, different player, different strengths — different variable."</p>',
    '<p>"포지션보다 역할이 중요해지고 있다. 같은 역할, 다른 선수, 다른 강점 — 다른 변수."</p>')
add('<h3 style="margin-bottom:16px">Build-up Core: 3-2 vs 3-1</h3>', '<h3 style="margin-bottom:16px">빌드업 코어: 3-2 vs 3-1</h3>')
add('<thead><tr><th>Structure</th><th>Strengths</th><th>When to Use</th></tr></thead>',
    '<thead><tr><th>구조</th><th>강점</th><th>사용 시점</th></tr></thead>')
add('<td><strong class="hi">3-2 Build-up</strong><br><span style="font-size:.8rem;color:var(--slate)">CB×3 + DM×2</span></td>\n                <td style="font-size:.9rem">Numerical parity against press, excellent defensive transition</td>\n                <td style="font-size:.9rem">When opposition high press is intense</td>',
    '<td><strong class="hi">3-2 빌드업</strong><br><span style="font-size:.8rem;color:var(--slate)">CB×3 + DM×2</span></td>\n                <td style="font-size:.9rem">압박 대비 수적 동수, 수비 전환 우수</td>\n                <td style="font-size:.9rem">상대 하이프레스가 강할 때</td>')
add('<td><strong class="amber">3-1 Build-up</strong><br><span style="font-size:.8rem;color:var(--slate)">CB×3 + DM×1</span></td>\n                <td style="font-size:.9rem">Numerical advantage up front, effective against mid-blocks</td>\n                <td style="font-size:.9rem">Against mid- or low-block opposition</td>',
    '<td><strong class="amber">3-1 빌드업</strong><br><span style="font-size:.8rem;color:var(--slate)">CB×3 + DM×1</span></td>\n                <td style="font-size:.9rem">전방 수적 우위, 미드 블록에 효과적</td>\n                <td style="font-size:.9rem">미드 또는 로우 블록 상대</td>')
add('<td><strong class="emerald">Hybrid</strong><br><span style="font-size:.8rem;color:var(--slate)">In-game mix</span></td>\n                <td style="font-size:.9rem">Optimal structure per situation, Mutation maximised</td>\n                <td style="font-size:.9rem">When squad role comprehension is high</td>',
    '<td><strong class="emerald">하이브리드</strong><br><span style="font-size:.8rem;color:var(--slate)">경기 중 혼합</span></td>\n                <td style="font-size:.9rem">상황별 최적 구조, 변이 극대화</td>\n                <td style="font-size:.9rem">선수단의 역할 이해도가 높을 때</td>')
add('<h4 style="color:var(--blue);margin-bottom:8px">Conditions for Formation Mutation</h4>', '<h4 style="color:var(--blue);margin-bottom:8px">포메이션 변이의 조건</h4>')
add('<p style="font-size:.9rem">Tactical fluidity (structure allows it) → player receives ball outside their position (execution) → variable created. Without formation fluidity, Mutation is simply impossible.</p>',
    '<p style="font-size:.9rem">전술적 유동성(구조가 허용) → 선수가 자기 포지션 밖에서 볼을 받음(실행) → 변수 창출. 포메이션 유동성 없이는 변이 자체가 불가능하다.</p>')
add('<h3 style="margin-bottom:16px">Rest-Attack & Rest-Defence</h3>', '<h3 style="margin-bottom:16px">레스트-어택 & 레스트-디펜스</h3>')
add('<p><strong>Rest-Attack</strong>: the attacking shape a team keeps ready even without the ball. Certain forwards stay high in counter-positions rather than tracking back, so the instant possession is won the counter is already launched — the defensive phase and the attack are designed together.</p>',
    '<p><strong>레스트-어택</strong>: 볼이 없을 때도 팀이 유지하는 공격 대형. 특정 공격수는 백트래킹 대신 높은 위치의 역습 포지션을 유지해, 볼을 되찾는 순간 역습이 이미 시작되어 있게 한다 — 수비 국면과 공격이 함께 설계된다.</p>')
add('<p><strong>Rest-Defence</strong>: the defensive shape a team keeps while in possession. A group of players holds balanced, covering positions behind the ball — often two layers with a numerical +1 over the opponent\'s forwards — so the moment the ball is lost, the counter is shut down immediately.</p>',
    '<p><strong>레스트-디펜스</strong>: 점유 중에도 팀이 유지하는 수비 대형. 일부 선수들이 볼 뒤쪽에서 균형 잡힌 커버 위치를 유지하며 — 흔히 상대 공격수 대비 +1의 수적 우위를 가진 두 겹의 라인으로 — 볼을 빼앗기는 순간 즉시 역습을 차단한다.</p>')
add('<p><strong>Transition must always be prepared.</strong> The switch between attack and defence is instant. Always be prepared to defend while attacking, and to attack while defending.</p>',
    '<p><strong>전환은 항상 준비되어 있어야 한다.</strong> 공수 전환은 즉각적이다. 공격하면서도 수비를 준비하고, 수비하면서도 공격을 준비하라.</p>')

# ══════════════════════════════════════════════════════════════════
# 09 — MULTIPLICITY
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">09 — Player Development</div>', '<div class="sec-deco">09 — 선수 육성</div>')
add('<div class="ch-num">Multiplicity</div>', '<div class="ch-num">멀티성</div>')
add('<h2>Multiplicity — Mutation Requires It</h2>', '<h2>멀티성 — 변이가 요구하는 것</h2>')
add('<p class="desc">The ability to apply a player\'s strengths equally across multiple positions and roles. Must be designed from the youth level up.</p>',
    '<p class="desc">선수의 강점을 여러 포지션과 역할에 동등하게 적용할 수 있는 능력. 유소년 단계부터 설계되어야 한다.</p>')
add('<p>"It comes down to whether a player can apply their strengths at entirely different heights and densities of play."</p>',
    '<p>"결국 선수가 완전히 다른 높이와 밀도의 플레이에서도 자신의 강점을 적용할 수 있느냐의 문제다."</p>')
add('<h3 style="margin-bottom:14px">Why Multiplicity</h3>', '<h3 style="margin-bottom:14px">멀티성이 필요한 이유</h3>')
add('<p>For the hybrid formation to work, you need players who can handle those roles. Formation changes without substitutions require players to self-adjust their role.</p>',
    '<p>하이브리드 포메이션이 작동하려면 그 역할들을 소화할 수 있는 선수가 필요하다. 교체 없이 포메이션을 바꾸려면 선수가 스스로 역할을 조정해야 한다.</p>')
add('<h4 style="font-size:.9rem;margin-bottom:6px">The Sub Effect, Without a Sub</h4>', '<h4 style="font-size:.9rem;margin-bottom:6px">교체 없이 얻는 교체 효과</h4>')
add('<p style="font-size:.85rem;color:var(--slate)">Sometimes — early in a game, or before the second half — you need a tactical or shape change but it is too soon to spend a substitution. A player who can fill several roles lets you make that change without one: the squad plays deeper than it is, and your substitutions are saved for when they matter most.</p>',
    '<p style="font-size:.85rem;color:var(--slate)">경기 초반이나 후반 시작 전, 전술적·형태적 변화는 필요한데 교체 카드를 쓰기엔 이른 시점이 있다. 여러 역할을 소화할 수 있는 선수가 있으면 교체 없이 그 변화를 만들 수 있다 — 선수단은 실제보다 두터워지고, 교체 카드는 가장 결정적인 순간을 위해 아껴진다.</p>')
add('<h4 style="font-size:.9rem;margin-bottom:6px">Role Shift</h4>', '<h4 style="font-size:.9rem;margin-bottom:6px">역할 전환</h4>')
add('<p style="font-size:.85rem;color:var(--slate)">Carrying original position strengths into a new role → extended career + new tactical resource</p>',
    '<p style="font-size:.85rem;color:var(--slate)">원래 포지션의 강점을 새 역할로 옮겨가기 → 커리어 연장 + 새로운 전술 자원</p>')
add('<h3 style="margin-bottom:14px">Youth Development Direction</h3>', '<h3 style="margin-bottom:14px">유소년 육성 방향</h3>')
add('<p>Making a senior pro into a multi-position player is difficult. It must be designed from the youth level.</p>',
    '<p>이미 프로가 된 선수를 멀티 포지션 선수로 만드는 것은 어렵다. 유소년 단계부터 설계되어야 한다.</p>')
add('<h4>Core Training Principles</h4>', '<h4>핵심 훈련 원칙</h4>')
add('<p>① Grow each player\'s strength into an identity — develop the individual trait until it becomes their character on the pitch.</p>',
    '<p>① 각 선수의 강점을 정체성으로 키운다 — 개인의 특성이 피치 위 캐릭터가 될 때까지 발전시킨다.</p>')
add('<p>② Fundamentals in every zone — the same core skills (turns, dribbles, bounce passes, 2v1 combinations) practised at different heights and densities across the whole pitch.</p>',
    '<p>② 모든 구역에서의 기본기 — 같은 핵심 기술(턴, 드리블, 원터치 콤비네이션, 2v1)을 피치 전역의 다른 높이와 밀도에서 연습한다.</p>')
add('<p>③ Let the signature emerge everywhere — the goal is that each player\'s own signature move surfaces naturally in every zone of the pitch, not only in one comfort area.</p>',
    '<p>③ 시그니처가 어디서든 드러나게 한다 — 목표는 각 선수의 시그니처 무브가 편한 한 구역이 아니라 피치의 모든 구역에서 자연스럽게 나오는 것이다.</p>')
add('<p style="margin-top:10px;color:#94A3B8;font-size:.88rem">"Messi dribbles and breaks press from anywhere. Creating Messi is near-impossible. But you can develop the youth player who might become him."</p>',
    '<p style="margin-top:10px;color:#94A3B8;font-size:.88rem">"메시는 어디서든 드리블하고 압박을 벗어난다. 메시를 만들어내는 것은 거의 불가능하다. 하지만 그가 될지도 모를 유소년 선수는 키울 수 있다."</p>')
add('<thead><tr><th>Player</th><th>Original Position</th><th>Moved To</th><th>Strengths Carried Over</th></tr></thead>',
    '<thead><tr><th>선수</th><th>원래 포지션</th><th>이동한 포지션</th><th>이어진 강점</th></tr></thead>')
add('<tr><td>Gareth Bale</td><td>Full-back</td><td>Winger</td><td>Speed, crossing</td></tr>',
    '<tr><td>가레스 베일</td><td>풀백</td><td>윙어</td><td>스피드, 크로스</td></tr>')
add('<tr><td>Lucas Vázquez</td><td>Winger</td><td>Full-back</td><td>Attacking runs, crossing</td></tr>',
    '<tr><td>루카스 바스케스</td><td>윙어</td><td>풀백</td><td>공격 지역 침투, 크로스</td></tr>')
add('<tr><td>Mario Mandžukić</td><td>Striker</td><td>Winger</td><td>Target-man play on the touchline → reduced turnover risk</td></tr>',
    '<tr><td>마리오 만주키치</td><td>스트라이커</td><td>윙어</td><td>터치라인에서의 타겟맨 플레이 → 볼 소유 손실 위험 감소</td></tr>')
add('<tr><td>Luka Modrić</td><td>Winger</td><td>Central Midfielder</td><td>Dribbling, vision, rhythm control</td></tr>',
    '<tr><td>루카 모드리치</td><td>윙어</td><td>중앙 미드필더</td><td>드리블, 시야, 리듬 조절</td></tr>')

# ══════════════════════════════════════════════════════════════════
# 10-12 — APPLICATIONS
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco" style="color:#475569">10·11·12 — Applications</div>', '<div class="sec-deco" style="color:#475569">10·11·12 — 적용</div>')
add('<div class="ch-num">Applications</div>', '<div class="ch-num">적용</div>')
add('<h2>In-Game Applications</h2>', '<h2>경기 중 적용</h2>')
add('<p class="desc">Three core patterns through which Variation Theory comes to life on the pitch.</p>',
    '<p class="desc">변이 이론이 피치 위에서 살아 움직이는 세 가지 핵심 패턴.</p>')
add('<h3 style="color:#60A5FA;margin-bottom:6px">App 1. Overload to Isolation</h3>', '<h3 style="color:#60A5FA;margin-bottom:6px">적용 1. 오버로드에서 아이솔레이션으로</h3>')
add('<p style="color:#94A3B8;margin-bottom:20px">Build numerical superiority (Overload) on one side to draw the defence, then create a 1v1 (Isolation) on the opposite side to strike. The team-level realisation of Lure and Shock.</p>',
    '<p style="color:#94A3B8;margin-bottom:20px">한쪽에서 수적 우위(오버로드)를 만들어 수비를 끌어들인 뒤, 반대쪽에서 1v1(아이솔레이션)을 만들어 타격한다. 루어 앤 쇼크의 팀 단위 구현.</p>')
add('<h4 style="color:#60A5FA;margin-bottom:8px">Overload (Lure)</h4>', '<h4 style="color:#60A5FA;margin-bottom:8px">오버로드 (루어)</h4>')
add('<p style="color:#CBD5E1;font-size:.9rem">Create 3v2+ numerical advantage on left or right. Draw the defensive line to shift that way. Condition the defensive response through repetition.</p>',
    '<p style="color:#CBD5E1;font-size:.9rem">좌 또는 우에서 3v2 이상의 수적 우위를 만든다. 수비 라인을 그쪽으로 끌어당긴다. 반복을 통해 수비 반응을 조건화한다.</p>')
add('<h4 style="color:#FDE68A;margin-bottom:8px">Isolation (Shock)</h4>', '<h4 style="color:#FDE68A;margin-bottom:8px">아이솔레이션 (쇼크)</h4>')
add('<p style="color:#CBD5E1;font-size:.9rem">Place your strongest 1v1 player on the opposite side. The moment defence shifts to the Overload side, diagonal switch pass. A 1v1 that must be won.</p>',
    '<p style="color:#CBD5E1;font-size:.9rem">가장 강한 1v1 자원을 반대쪽에 배치한다. 수비가 오버로드 쪽으로 쏠리는 순간, 대각선 전환 패스. 반드시 이겨야 할 1v1.</p>')
add('<div class="board-top"><h4>Overload to Isolation — Buffering Simulation</h4></div>',
    '<div class="board-top"><h4>오버로드에서 아이솔레이션 — 버퍼링 시뮬레이션</h4></div>')
add('<div class="cv-label" style="color:#60A5FA">LURE — Left overload conditioning</div>', '<div class="cv-label" style="color:#60A5FA">루어 — 왼쪽 오버로드 조건화</div>')
add('<div class="cv-label" style="color:#FDE68A">SHOCK → Buffering → 1v1</div>', '<div class="cv-label" style="color:#FDE68A">쇼크 → 버퍼링 → 1v1</div>')
add('<button class="btn-play" id="btnBufPlay2">SHOCK</button>', '<button class="btn-play" id="btnBufPlay2">쇼크</button>')
add('<button class="btn-reset" id="btnBufReset2">↺ Reset</button>', '<button class="btn-reset" id="btnBufReset2">↺ 리셋</button>')
add('<div class="step-info" id="infoBuf2">Left overload looping</div>', '<div class="step-info" id="infoBuf2">왼쪽 오버로드 반복 중</div>')

add('<h3 style="color:#60A5FA;margin-bottom:6px">App 2. Chained Post Play</h3>', '<h3 style="color:#60A5FA;margin-bottom:6px">적용 2. 체인드 포스트 플레이</h3>')
add('<p style="color:#94A3B8;margin-bottom:20px">Using the post player\'s ball receipt as the Clutch Point to fire a chained passing pattern. Dismantles the defensive structure sequentially.</p>',
    '<p style="color:#94A3B8;margin-bottom:20px">포스트 플레이어의 볼 리시브를 클러치 포인트 삼아 연쇄적인 패싱 패턴을 발동한다. 수비 구조를 순차적으로 해체한다.</p>')
add('<div class="board-top"><h4>Chained Post Play — Pattern Simulation</h4></div>', '<div class="board-top"><h4>체인드 포스트 플레이 — 패턴 시뮬레이션</h4></div>')
add('<button class="btn-play" id="btnPostPlay">▶ Next</button>', '<button class="btn-play" id="btnPostPlay">▶ 다음</button>')
add('<button class="btn-reset" id="btnPostReset">↺ Restart</button>', '<button class="btn-reset" id="btnPostReset">↺ 다시시작</button>')
add('<div class="step-info" id="infoPost">Post play pattern start</div>', '<div class="step-info" id="infoPost">포스트 플레이 패턴 시작</div>')
add('<h4 style="color:#60A5FA;margin-bottom:10px">Using the Space Behind the Post Player</h4>', '<h4 style="color:#60A5FA;margin-bottom:10px">포스트 플레이어 뒤 공간 활용</h4>')
add('<p style="color:#CBD5E1;font-size:.88rem;line-height:1.65">The essence of post play lies in the <strong style="color:#93C5FD">space in front of</strong> the player. The tighter the opposition press, the more this space can be used to force open a compact defensive block. The receiving player is already facing forward — continuous action and transition speed doubles.</p>',
    '<p style="color:#CBD5E1;font-size:.88rem;line-height:1.65">포스트 플레이의 본질은 선수 <strong style="color:#93C5FD">앞쪽 공간</strong>에 있다. 상대 압박이 강할수록 이 공간을 이용해 촘촘한 수비 블록을 강제로 벌릴 수 있다. 볼을 받는 선수는 이미 전방을 향하고 있어 — 연속 동작과 전환 속도가 두 배가 된다.</p>')
add('<h4 style="color:#D97706;margin-bottom:10px">Selfless Play → Precision Strike</h4>', '<h4 style="color:#D97706;margin-bottom:10px">헌신적인 플레이 → 정밀한 타격</h4>')
add('<p style="color:#CBD5E1;font-size:.88rem;line-height:1.65">The <strong style="color:#FDE68A">selfless choice</strong> of releasing the ball to the player with a clearer sight of goal makes the attack clean, fast, and precise. When the post player opens the space, the next player is already starting their run from the optimal angle.</p>',
    '<p style="color:#CBD5E1;font-size:.88rem;line-height:1.65">골문이 더 잘 보이는 선수에게 볼을 넘기는 <strong style="color:#FDE68A">헌신적인 선택</strong>이 공격을 깔끔하고 빠르고 정밀하게 만든다. 포스트 플레이어가 공간을 열어주면, 다음 선수는 이미 최적의 각도에서 런을 시작한 상태다.</p>')

add('<h3 style="color:#60A5FA;margin-bottom:6px">App 3. Press Escape via Lateral Pass</h3>', '<h3 style="color:#60A5FA;margin-bottom:6px">적용 3. 횡패스를 통한 압박 탈출</h3>')
add('<p style="color:#94A3B8;margin-bottom:20px">The core execution tool of Into the Trap. Neutralise the direction of the press via a lateral pass under man-marking, and create an exit route.</p>',
    '<p style="color:#94A3B8;margin-bottom:20px">Into the Trap의 핵심 실행 도구. 맨마킹 상황에서 횡패스로 압박의 방향을 무력화하고 탈출로를 만든다.</p>')
add('<h4>Lateral Pass Press Escape Drill — Step-by-Step</h4>', '<h4>횡패스 압박 탈출 드릴 — 단계별</h4>')
add('<span class="bdesc">GK·C1 bounce → C2 receive → one-touch lateral → C1 presses forward</span>',
    '<span class="bdesc">GK·C1 원터치 벽패스 → C2 리시브 → 원터치 횡패스 → C1 전방 압박</span>')
add('<button class="btn-play" id="btnLatPlay">▶ Next</button>', '<button class="btn-play" id="btnLatPlay">▶ 다음</button>')
add('<button class="btn-reset" id="btnLatReset">↺ Restart</button>', '<button class="btn-reset" id="btnLatReset">↺ 다시시작</button>')
add('<div class="step-info" id="infoLat">GK holds ball — step through the drill</div>', '<div class="step-info" id="infoLat">GK 볼 소유 — 드릴을 단계별로 진행</div>')
add('<h4 style="color:#60A5FA;margin-bottom:10px">Why the Lateral Pass</h4>', '<h4 style="color:#60A5FA;margin-bottom:10px">왜 횡패스인가</h4>')
add('<p style="color:#CBD5E1;font-size:.9rem">A forward pass runs in the same direction the press is coming from → easy for the defence to read and cut out. A lateral pass cuts across that direction → it forces the defence to turn and change its angle. Played one-touch, it moves faster than the defence can react — it can\'t be processed in time.</p>',
    '<p style="color:#CBD5E1;font-size:.9rem">전방 패스는 압박이 오는 방향과 같은 방향으로 진행된다 → 수비가 읽고 끊기 쉽다. 횡패스는 그 방향을 가로지른다 → 수비가 몸을 돌려 각도를 바꾸도록 강제한다. 원터치로 이뤄지면 수비의 반응 속도보다 빠르게 움직인다 — 제때 처리할 수 없다.</p>')
add('<h4 style="color:#FDE68A;margin-bottom:10px">Chained Press Escape</h4>', '<h4 style="color:#FDE68A;margin-bottom:10px">연쇄적 압박 탈출</h4>')
add('<p style="color:#CBD5E1;font-size:.9rem">A first player receives under pressure and plays a lateral pass to a team-mate; the defence shifts across to follow, changing direction. That team-mate then plays forward into the space the defence has just left behind. The defence is forced to change direction twice in quick succession — and the buffering happens in the gap between those two turns.</p>',
    '<p style="color:#CBD5E1;font-size:.9rem">압박 속에서 볼을 받은 첫 번째 선수가 동료에게 횡패스를 한다. 수비는 따라가며 방향을 바꾼다. 그 동료는 수비가 방금 비운 공간으로 전진 패스를 넣는다. 수비는 짧은 시간에 두 번 방향을 바꿔야 한다 — 그 두 번의 전환 사이에서 버퍼링이 발생한다.</p>')

# ══════════════════════════════════════════════════════════════════
# 13 — DEFENSE
# ══════════════════════════════════════════════════════════════════
add('<div class="sec-deco">13 — Defense</div>', '<div class="sec-deco">13 — 수비</div>')
add('<div class="ch-num">Defensive System</div>', '<div class="ch-num">수비 시스템</div>')
add('<h2>Defense in Two Phases: Gegenpressing → Mid-Block Trap</h2>', '<h2>두 단계의 수비: 게겐프레싱 → 미드 블록 트랩</h2>')
add('<p class="desc">If the heart of attack is psychology-based buffering,<br>the heart of defence is eliminating options through structure.</p>',
    '<p class="desc">공격의 핵심이 심리 기반 버퍼링이라면,<br>수비의 핵심은 구조를 통한 선택지 제거다.</p>')
add('<p>"Defence is not about psychology. It\'s about eliminating the opponent\'s options through structure."</p>',
    '<p>"수비는 심리의 문제가 아니다. 구조를 통해 상대의 선택지를 제거하는 문제다."</p>')
add('<div class="phase-hdr p1">Phase 1 — Gegenpressing (7 seconds after ball loss)</div>', '<div class="phase-hdr p1">1단계 — 게겐프레싱 (볼 소유권 상실 후 7초)</div>')
add('<p><strong>Scientific basis:</strong> High-intensity pressing can be sustained for roughly 7 seconds. That window is Gegenpressing\'s effective window.</p>',
    '<p><strong>과학적 근거:</strong> 고강도 압박은 대략 7초 동안 지속 가능하다. 그 구간이 게겐프레싱의 유효 구간이다.</p>')
add('<p><strong>Beyond 7 seconds,</strong> press intensity drops sharply — and you become exposed to counter-attacks with your defensive shape disrupted.</p>',
    '<p><strong>7초를 넘어서면</strong> 압박 강도가 급격히 떨어진다 — 그리고 수비 대형이 흐트러진 채 역습에 노출된다.</p>')
add('<p><strong>Priority objectives:</strong><br>\n          ① Ball recovery (best case) → immediate attack transition<br>\n          ② Slow opposition\'s forward momentum<br>\n          ③ Buy time to reset the defensive block</p>',
    '<p><strong>우선 목표:</strong><br>\n          ① 볼 탈환(최선의 경우) → 즉시 공격 전환<br>\n          ② 상대의 전진 흐름 지연<br>\n          ③ 수비 블록 재정비 시간 확보</p>')
add('<strong>Unsustainable:</strong> Klopp\'s Liverpool (2020-21), Postecoglou\'s Tottenham (2024-25) — full-press throughout → late-season injury accumulation + squad breakdown.',
    '<strong>지속 불가능한 사례:</strong> 클롭의 리버풀(2020-21), 포스테코글루의 토트넘(2024-25) — 경기 내내 풀프레스 → 시즌 후반 부상 누적 + 선수단 붕괴.')
add('<div class="phase-hdr p2">Phase 2 — Structural Block + Mid-Block Trap</div>', '<div class="phase-hdr p2">2단계 — 구조적 블록 + 미드 블록 트랩</div>')
add('<p><strong>Transition the instant Gegenpressing fails.</strong> Operates through structure, not psychology. The opposition may know the trap exists — but they have no other choice.</p>',
    '<p><strong>게겐프레싱이 실패하는 즉시 전환한다.</strong> 심리가 아니라 구조로 작동한다. 상대는 덫의 존재를 알고 있을 수도 있다 — 하지만 다른 선택지가 없다.</p>')
add('<p><strong>3-stage structural block:</strong><br>\n          ① Seal the centre → opposition moves wide<br>\n          ② Wide channelling → guide them into our numerical advantage<br>\n          ③ Trap activated → ball recovered or danger zone cleared</p>',
    '<p><strong>3단계 구조적 블록:</strong><br>\n          ① 중앙 봉쇄 → 상대가 측면으로 이동<br>\n          ② 측면 유도 → 우리 수적 우위 지역으로 유인<br>\n          ③ 덫 발동 → 볼 탈환 또는 위험 지역 클리어</p>')
add('<p><strong>Mid-block trap setup:</strong> Increase midfield density to pre-design the spaces the attacking team can enter. When they enter — double pressure.</p>',
    '<p><strong>미드 블록 트랩 설계:</strong> 중원 밀도를 높여 공격팀이 들어올 수 있는 공간을 미리 설계한다. 그들이 들어오면 — 더블 프레셔.</p>')
add('<strong>Key:</strong> Gegenpressing is the most modern defensive method but has physical limits. The 7-second principle creates sustainability.',
    '<strong>핵심:</strong> 게겐프레싱은 가장 현대적인 수비 방법이지만 신체적 한계가 있다. 7초 원칙이 지속 가능성을 만든다.')
add('<h4>Why Gegenpressing Is Modern Football\'s Best Defensive Method</h4>', '<h4>게겐프레싱이 현대 축구 최고의 수비 방법인 이유</h4>')
add('<p>Immediately after losing the ball, the opposition is at their most disorganised. Press in that moment and you force them to respond when passing accuracy and decision speed are at their lowest. Win it back and you can transition before they\'ve reset their defensive shape — this is also the single most effective method of creating attacking chances in modern football.</p>',
    '<p>볼을 빼앗긴 직후, 상대는 가장 조직력이 흐트러진 상태다. 그 순간에 압박하면 패스 정확도와 판단 속도가 가장 낮을 때 대응을 강요할 수 있다. 볼을 되찾으면 상대가 수비 대형을 재정비하기 전에 전환할 수 있다 — 이것은 현대 축구에서 공격 기회를 만드는 가장 효과적인 단일 방법이기도 하다.</p>')
add('<p><strong style="color:#60A5FA">However,</strong> maintaining it without a 7-second limit across a full game is impossible. The principled Phase 1 → Phase 2 transition is the key to sustainable Gegenpressing.</p>',
    '<p><strong style="color:#60A5FA">하지만,</strong> 7초 제한 없이 경기 내내 이를 유지하는 것은 불가능하다. 원칙에 따른 1단계 → 2단계 전환이 지속 가능한 게겐프레싱의 핵심이다.</p>')
add('<h4>Gegenpressing\'s 7 Seconds — Why 7?</h4>', '<h4>게겐프레싱의 7초 — 왜 7초인가</h4>')
add('<p><strong style="color:#93C5FD">Physiological basis (ATP-PC system)</strong><br>\n      Maximum-intensity actions like sprints, jumps, and tackles run on phosphocreatine (ATP-PC system). That fuel store depletes completely in <strong>6–10 seconds</strong>. After that, the system shifts to the lactic system and output drops sharply. The same window applies to a 100m sprinter\'s peak speed — a footballer\'s explosive press duration hits exactly the same physical ceiling.</p>',
    '<p><strong style="color:#93C5FD">생리학적 근거 (ATP-PC 시스템)</strong><br>\n      스프린트, 점프, 태클 같은 최대 강도 동작은 인산크레아틴(ATP-PC 시스템)으로 작동한다. 이 연료는 <strong>6–10초</strong> 만에 완전히 고갈된다. 그 이후 시스템은 젖산 시스템으로 전환되고 출력이 급격히 떨어진다. 100m 스프린터의 최고 속도 유지 구간과 같은 원리다 — 축구 선수의 폭발적인 압박 지속 시간도 정확히 같은 신체적 한계에 부딪힌다.</p>')
add('<p><strong style="color:#93C5FD">Klopp\'s practical basis</strong><br>\n      At Dortmund, Klopp\'s coaching staff confirmed through hundreds of match film analyses that recovery attempt success rates were highest within 6–7 seconds of ball loss, and fell sharply after that. This <strong>"7 seconds"</strong> is not drawn from a single paper — it\'s an empirical benchmark where match data and physiological limits converge. It\'s why Gegenpressing works as a <em>structured pressing rule</em> rather than just willpower.</p>',
    '<p><strong style="color:#93C5FD">클롭의 실전적 근거</strong><br>\n      도르트문트 시절 클롭의 코칭스태프는 수백 건의 경기 필름 분석을 통해, 볼 소유권 상실 후 6–7초 이내 탈환 시도 성공률이 가장 높고 그 이후 급격히 떨어진다는 것을 확인했다. 이 <strong>"7초"</strong>는 단일 논문에서 나온 수치가 아니다 — 경기 데이터와 생리학적 한계가 수렴하는 경험적 기준점이다. 게겐프레싱이 단순한 의지가 아니라 <em>구조화된 압박 규칙</em>으로 작동하는 이유다.</p>')
add('<p><strong style="color:#93C5FD">Tactical basis (Transition Chaos Window)</strong><br>\n      Immediately after losing the ball, the opposition hasn\'t yet set defensive positioning. Only while this chaos window is open can effective pressing succeed even in numerical deficit. After 7 seconds, their transition shape resets — and the same physical cost yields far less in return. Miss this window and Gegenpressing becomes nothing more than energy expenditure without tactical return.</p>',
    '<p><strong style="color:#93C5FD">전술적 근거 (전환 혼란 구간)</strong><br>\n      볼을 빼앗긴 직후, 상대는 아직 수비 위치를 잡지 못한 상태다. 이 혼란 구간이 열려 있는 동안에만 수적 열세에서도 효과적인 압박이 성공할 수 있다. 7초가 지나면 상대의 전환 대형이 재정비되고 — 같은 신체적 비용으로 얻는 대가가 훨씬 줄어든다. 이 구간을 놓치면 게겐프레싱은 전술적 대가 없는 체력 소모에 지나지 않게 된다.</p>')

# ══════════════════════════════════════════════════════════════════
# FOOTER
# ══════════════════════════════════════════════════════════════════
add('<p style="color:#475569;font-size:.85rem;font-family:\'Space Grotesk\',sans-serif;letter-spacing:.08em">VARIATION THEORY — JIN\'S FOOTBALL PHILOSOPHY</p>',
    '<p style="color:#475569;font-size:.85rem;font-family:\'Space Grotesk\',sans-serif;letter-spacing:.08em">변이 이론 — JIN의 축구 철학</p>')
add('<p style="color:#64748B;font-size:.78rem;margin-top:6px">When variable meets mutation, the system breaks.</p>',
    '<p style="color:#64748B;font-size:.78rem;margin-top:6px">변수가 변이를 만나면, 시스템은 무너진다.</p>')

# ══════════════════════════════════════════════════════════════════
# JS — Canvas animation label / step-info strings
# (Football position abbreviations GK/CB/LB/RB/LW/RW/DM/AM/CDM/ST etc.
#  are left in English — standard convention in Korean football media.)
# ══════════════════════════════════════════════════════════════════

# --- Generic control button labels (repeat across multiple boards) ---
add("'▶ Play'", "'▶ 재생'", 6)
add("'▶ Resume'", "'▶ 계속'", 3)
add("'⏸ Pause'", "'⏸ 일시정지'", 3)

# --- Plan A- / Plan A SHOCK board (cvPlanMinus / cvPlanPlus) ---
add("document.getElementById('infoPlan').textContent='Left flank 5v5 overload looping — hit SHOCK to trigger right Isolation';",
    "document.getElementById('infoPlan').textContent='왼쪽 측면 5v5 오버로드 반복 중 — 쇼크를 눌러 오른쪽 아이솔레이션 발동';")
add("document.getElementById('infoPlan').textContent='SHOCK complete — RW Isolation successful. Try again.';",
    "document.getElementById('infoPlan').textContent='쇼크 완료 — RW 아이솔레이션 성공. 다시 시도.';")
add("document.getElementById('infoPlan').textContent='SHOCK — CDM plays diagonal long ball to right RW! All defenders buffering...';",
    "document.getElementById('infoPlan').textContent='쇼크 — CDM이 오른쪽 RW에게 대각선 롱볼! 모든 수비수 버퍼링 중...';")

# --- Buffering board (cvBuffer) ---
add("document.getElementById('infoBuf').textContent='▶ Hit Start to see Shock → Buffering → 1v1 flow';",
    "document.getElementById('infoBuf').textContent='▶ 시작을 눌러 쇼크 → 버퍼링 → 1v1 흐름을 확인';")
add("document.getElementById('infoBuf').textContent='Done — overload created the 1v1, best dribbler finishes';",
    "document.getElementById('infoBuf').textContent='완료 — 오버로드가 1v1을 만들었고, 최고의 드리블러가 마무리';")
add("'① SHOCK — CDM plays diagonal long ball from left overload to right RW'",
    "'① 쇼크 — CDM이 왼쪽 오버로드에서 오른쪽 RW로 대각선 롱볼'")
add("'② Buffering — all defenders cognitively frozen for a moment'",
    "'② 버퍼링 — 모든 수비수가 순간적으로 판단 정지'", 2)
add("'③ Defenders scramble — 5 racing back to the defensive line'",
    "'③ 수비수 스크램블 — 5명 모두 수비 라인으로 전력 복귀'")
add("'④ 1v1 — only D1 arrives, other 4 too late — RW isolated'",
    "'④ 1v1 — D1만 도착, 나머지 4명은 늦음 — RW 고립'")
add("'⑤ RW drives past — best dribbler wins 1v1, late support decisive'",
    "'⑤ RW 돌파 — 최고의 드리블러가 1v1 승리, 늦은 지원이 결정적'")

# --- Chained Post Play board (cvPost) — MSGS ---
add("""    'Stage 0 — High Press Man-Marking. Holder (DM) has ball, everyone marked',
    'Stage 1/6 — Both pivot players offer simultaneously! They are the holder\\'s pass options',
    'Stage 2/6 — Holder → Pivot 2 (ST) pass. Pivot 2 receives',
    'Stage 3/6 — Lateral pass! Pivot 1 moves and receives (1v1 marked)',
    'Stage 4/6 — Pivot 1 post play! Marker goes 1v1, space opens behind',
    'Stage 5/6 — One touch! Ball and player move simultaneously into space → receive and drive',
    'Stage 6/6 — Space dribble advance! High Press structurally broken'""",
    """    'Stage 0 — 하이프레스 맨마킹. 소유자(DM)가 볼을 가짐, 전원 마크됨',
    'Stage 1/6 — 두 기점 선수가 동시에 움직임 제시! 소유자의 패스 옵션',
    'Stage 2/6 — 소유자 → 기점2(ST) 패스. 기점2가 리시브',
    'Stage 3/6 — 횡패스! 기점1이 움직여 리시브(1v1 마크 상태)',
    'Stage 4/6 — 기점1 포스트 플레이! 마커가 1v1로 붙고, 뒷공간이 열림',
    'Stage 5/6 — 원터치! 볼과 선수가 동시에 공간으로 이동 → 리시브 후 전진',
    'Stage 6/6 — 공간 드리블 전진! 하이프레스 구조적으로 붕괴'""")

# --- Pre-Half Space board (cvPHS) — MSGS ---
add("""    'Stage 0 — Holder (DM) has ball. PHS player waiting at mid-final third boundary, wide',
    'Stage 1/5 — Holder → PHS (boundary wide). SB follows',
    'Stage 2/5 — Two options spotted from PHS: HS key pass OR direct box penetration',
    'Stage 3/5 — Pass & Move! Key pass + immediate cutback run simultaneously',
    'Stage 4/5 — Forward along HS channel → cross position. PHS = cutback, Forward = waiting for header',
    'Stage 5/5 — Cross OR cutback — defence cannot cover either'""",
    """    'Stage 0 — 소유자(DM)가 볼을 가짐. PHS 선수는 미들-파이널 서드 경계 와이드 위치에서 대기',
    'Stage 1/5 — 소유자 → PHS(경계 와이드). SB가 따라붙음',
    'Stage 2/5 — PHS에서 두 옵션 포착: HS 키패스 또는 박스 직접 침투',
    'Stage 3/5 — 패스 앤 무브! 키패스 + 즉각적인 컷백 런 동시 실행',
    'Stage 4/5 — HS 채널을 따라 전진 → 크로스 위치. PHS = 컷백, 포워드 = 헤더 대기',
    'Stage 5/5 — 크로스 또는 컷백 — 수비는 둘 다 막을 수 없음'""")

# --- PHS bubbleLabel calls ---
add("bubbleLabel(ctx,'① Key pass→HS',aPHS.x+54,aPHS.y+8,'rgba(240,200,80,.38)','#F0C858',11);",
    "bubbleLabel(ctx,'① 키패스→HS',aPHS.x+54,aPHS.y+8,'rgba(240,200,80,.38)','#F0C858',11);")
add("bubbleLabel(ctx,'② Direct run',aPHS.x+46,aPHS.y+38,'rgba(78,205,196,.38)','#4ECDC4',11);",
    "bubbleLabel(ctx,'② 다이렉트 런',aPHS.x+46,aPHS.y+38,'rgba(78,205,196,.38)','#4ECDC4',11);")
add("bubbleLabel(ctx,'Pass & Move',aPHS.x,aPHS.y-46,'rgba(255,180,50,.50)','#ffb432',12);",
    "bubbleLabel(ctx,'패스 앤 무브',aPHS.x,aPHS.y-46,'rgba(255,180,50,.50)','#ffb432',12);")
add("bubbleLabel(ctx,'Key pass!',W*.70,H*.14,'rgba(240,200,80,.50)','#F0C858',12);",
    "bubbleLabel(ctx,'키패스!',W*.70,H*.14,'rgba(240,200,80,.50)','#F0C858',12);")
add("bubbleLabel(ctx,'Pass & Move!',phsOrigin.x-12,phsOrigin.y+44,'rgba(78,205,196,.46)','#4ECDC4',12);",
    "bubbleLabel(ctx,'패스 앤 무브!',phsOrigin.x-12,phsOrigin.y+44,'rgba(78,205,196,.46)','#4ECDC4',12);")
add("bubbleLabel(ctx,'Cross',aHS.x,aHS.y-36,'rgba(240,200,80,.50)','#F0C858',12);",
    "bubbleLabel(ctx,'크로스',aHS.x,aHS.y-36,'rgba(240,200,80,.50)','#F0C858',12);")
add("bubbleLabel(ctx,'Cutback',aPHS.x,aPHS.y-36,'rgba(78,205,196,.50)','#4ECDC4',12);",
    "bubbleLabel(ctx,'컷백',aPHS.x,aPHS.y-36,'rgba(78,205,196,.50)','#4ECDC4',12);")
add("bubbleLabel(ctx,'Header',a9.x,a9.y-36,'rgba(94,201,122,.50)','#5EC97A',12);",
    "bubbleLabel(ctx,'헤더',a9.x,a9.y-36,'rgba(94,201,122,.50)','#5EC97A',12);")
add("bubbleLabel(ctx,'Cross OR Cutback',W*.84,H*.24,'rgba(240,200,80,.44)','#F0C858',12);",
    "bubbleLabel(ctx,'크로스 또는 컷백',W*.84,H*.24,'rgba(240,200,80,.44)','#F0C858',12);")
add("bubbleLabel(ctx,'Defence can\\'t choose!',W*.84,H*.70,'rgba(224,92,92,.48)','#E05C5C',12);",
    "bubbleLabel(ctx,'수비는 선택할 수 없다!',W*.84,H*.70,'rgba(224,92,92,.48)','#E05C5C',12);")

# --- Chained Post Play bubbleLabel calls ---
add("bubbleLabel(ctx,'Option①',aP1.x+2,aP1.y-22,'rgba(240,200,80,.3)','#F0C858',9);",
    "bubbleLabel(ctx,'옵션①',aP1.x+2,aP1.y-22,'rgba(240,200,80,.3)','#F0C858',9);")
add("bubbleLabel(ctx,'Option②',aST.x+4,aST.y-22,'rgba(240,200,80,.3)','#F0C858',9);",
    "bubbleLabel(ctx,'옵션②',aST.x+4,aST.y-22,'rgba(240,200,80,.3)','#F0C858',9);")
add("bubbleLabel(ctx,'Pivot = Option',aDM1.x,aDM1.y-50,'rgba(255,180,50,.4)','#ffb432',10);",
    "bubbleLabel(ctx,'기점 = 옵션',aDM1.x,aDM1.y-50,'rgba(255,180,50,.4)','#ffb432',10);")
add("bubbleLabel(ctx,'Lateral pass',W*.50,H*.38,'rgba(240,200,80,.38)','#F0C858',10);",
    "bubbleLabel(ctx,'횡패스',W*.50,H*.38,'rgba(240,200,80,.38)','#F0C858',10);")
add("bubbleLabel(ctx,'1v1',aP1.x,aP1.y-62,'rgba(255,180,50,.4)','#ffb432',10);",
    "bubbleLabel(ctx,'1v1',aP1.x,aP1.y-62,'rgba(255,180,50,.4)','#ffb432',10);")
add("bubbleLabel(ctx,'Simultaneously!',W*(PEN_X-.06),H*(PEN_Y+.08),'rgba(94,201,122,.4)','#5EC97A',10);",
    "bubbleLabel(ctx,'동시에!',W*(PEN_X-.06),H*(PEN_Y+.08),'rgba(94,201,122,.4)','#5EC97A',10);")
add("bubbleLabel(ctx,'Dribble!',W*.85,H*.17,'rgba(94,201,122,.52)','#5EC97A',11);",
    "bubbleLabel(ctx,'드리블!',W*.85,H*.17,'rgba(94,201,122,.52)','#5EC97A',11);")

# --- Clutch Point board (cvClutch / cvClutch2 dup) — PH ---
add("{dur:4.5, label:'① U-shape build-up — slow tempo, conditioning the opposition'},",
    "{dur:4.5, label:'① U자형 빌드업 — 느린 템포, 상대 조건화'},", 2)
add("{dur:3.5, label:'② Designated player moves — simultaneously, to their zone'},",
    "{dur:3.5, label:'② 지정 선수 이동 — 동시에, 자신의 구역으로'},", 2)
add("{dur:2.8, label:'③ Clutch pass — slow, but decisive'},",
    "{dur:2.8, label:'③ 클러치 패스 — 느리지만 결정적'},", 2)
add("{dur:0.4, label:'CLUTCH POINT triggered!'},",
    "{dur:0.4, label:'클러치 포인트 발동!'},", 2)
add("{dur:5.0, label:'High-speed play — 1st pass → one-touch → Arc'},",
    "{dur:5.0, label:'고속 플레이 — 1차 패스 → 원터치 → 아크'},", 2)
add("{dur:3.0, label:'3 Variables — Best xT choice'},",
    "{dur:3.0, label:'3가지 변수 — 최고의 xT 선택'},", 2)
add("if(infoEl) infoEl.textContent='U-shape build-up → Clutch Point';",
    "if(infoEl) infoEl.textContent='U자형 빌드업 → 클러치 포인트';")

# --- Trap board (cvTrap) — PH ---
add("{dur:3.0, label:'① Situation — BLUE building from back, all routes sealed'},",
    "{dur:3.0, label:'① 상황 — 블루팀 후방 빌드업, 모든 루트 봉쇄됨'},")
add("{dur:3.2, label:'② Forward pass attempts → all blocked by man-marking and low block'},",
    "{dur:3.2, label:'② 전방 패스 시도 → 맨마킹과 로우 블록에 모두 차단'},")
add("{dur:2.6, label:'③ Trap structure — 5-man cage in front of the box'},",
    "{dur:2.6, label:'③ 덫 구조 — 박스 앞 5명의 우리'},")
add("{dur:2.2, label:'④ Forcing entry → ball lost → short counter'},",
    "{dur:2.2, label:'④ 강행 돌파 → 볼 손실 → 짧은 역습'},")
add("{dur:3.0, label:'⑤ Solution: 3 roles prepared simultaneously — pre-agreed pattern'},",
    "{dur:3.0, label:'⑤ 해법: 3가지 역할을 동시에 준비 — 사전 합의 패턴'},")
add("{dur:2.8, label:'⑥ 1st lateral pass — ball played into the Trap'},",
    "{dur:2.8, label:'⑥ 첫 번째 횡패스 — 덫 안으로 볼 투입'},")
add("{dur:2.8, label:'⑦ One-touch escape → out to Arc Circle'},",
    "{dur:2.8, label:'⑦ 원터치 탈출 → 아크 서클로'},")
add("{dur:3.2, label:'⑧ Free Space — Variables secured · Best xT choice'},",
    "{dur:3.2, label:'⑧ 자유 공간 — 변수 확보 · 최고의 xT 선택'},")
add("if(infoEl) infoEl.textContent='▶ Press Play to start simulation';",
    "if(infoEl) infoEl.textContent='▶ 재생을 눌러 시뮬레이션 시작';")

# --- Trap chip() calls ---
add("if(pt>.3) chip('Slow...',g.U2.x,g.U2.y-26,'rgba(30,41,59,.8)','#94A3B8',eO(n01(pt,.3,.7)),10);",
    "if(pt>.3) chip('느리게...',g.U2.x,g.U2.y-26,'rgba(30,41,59,.8)','#94A3B8',eO(n01(pt,.3,.7)),10);")
add("if(pt>.15) chip('Designated zone',proPos.x+20,proPos.y-20,'rgba(217,119,6,.85)','#fff',eO(n01(pt,.15,.45)),10);",
    "if(pt>.15) chip('지정 구역',proPos.x+20,proPos.y-20,'rgba(217,119,6,.85)','#fff',eO(n01(pt,.15,.45)),10);")
add("chip('Position locked!',g.PRO1.x,g.PRO1.y-28,'rgba(217,119,6,.85)','#fff',ga,11);",
    "chip('포지션 고정!',g.PRO1.x,g.PRO1.y-28,'rgba(217,119,6,.85)','#fff',ga,11);")
add("if(arcFree>.6) chip('Free Space',g.ARC.x,g.ARC.y-28,'rgba(250,204,21,.9)','#1a1a1a',eO(n01(pt,P2E+.05,P2E+.35)),12);",
    "if(arcFree>.6) chip('자유 공간',g.ARC.x,g.ARC.y-28,'rgba(250,204,21,.9)','#1a1a1a',eO(n01(pt,P2E+.05,P2E+.35)),12);")
add("chip('Free Space',g.ARC.x,g.ARC.y-30,'rgba(250,204,21,.92)','#1a1a1a',1,13);",
    "chip('자유 공간',g.ARC.x,g.ARC.y-30,'rgba(250,204,21,.92)','#1a1a1a',1,13);", 2)
add("chip('Man-marked!',mx,my-22,'rgba(239,68,68,.85)','#fff',xa);",
    "chip('맨마크!',mx,my-22,'rgba(239,68,68,.85)','#fff',xa);")
add("chip('Back pass!',mx,my-22,'rgba(239,68,68,.85)','#fff',xa);",
    "chip('백패스!',mx,my-22,'rgba(239,68,68,.85)','#fff',xa);")
add("chip('Turnover risk!',mx,my-22,'rgba(239,68,68,.85)','#fff',xa);",
    "chip('턴오버 위험!',mx,my-22,'rgba(239,68,68,.85)','#fff',xa);")
add("chip('5-man cage',g.pcx,g.pcy+H*.16,'rgba(239,68,68,.85)','#fff',da,11);",
    "chip('5명의 우리',g.pcx,g.pcy+H*.16,'rgba(239,68,68,.85)','#fff',da,11);")
add("chip('Organised block in front of box',g.pcx,g.pcy-H*.17,'rgba(15,23,42,.85)','#FCA5A5',da,10);",
    "chip('박스 앞 조직적인 블록',g.pcx,g.pcy-H*.17,'rgba(15,23,42,.85)','#FCA5A5',da,10);")
add("chip('Ball lost!',g.pcx,g.pcy,'rgba(239,68,68,.92)','#fff',da,12);",
    "chip('볼 손실!',g.pcx,g.pcy,'rgba(239,68,68,.92)','#fff',da,12);")
add("chip('Goal conceded risk',W*.78,H*.17,'rgba(239,68,68,.9)','#fff',ca*.8,10);",
    "chip('실점 위험',W*.78,H*.17,'rgba(239,68,68,.9)','#fff',ca*.8,10);")
add("chip('Passer (back)',g.BC.x,g.BC.y-22,'rgba(37,99,235,.88)','#fff',ap,11);",
    "chip('패서(후방)',g.BC.x,g.BC.y-22,'rgba(37,99,235,.88)','#fff',ap,11);")
add("chip('Entry player',g.TE0.x+30,g.TE0.y-18,'rgba(5,150,105,.88)','#fff',ap,11);",
    "chip('진입 선수',g.TE0.x+30,g.TE0.y-18,'rgba(5,150,105,.88)','#fff',ap,11);")
add("chip('Space player',g.ARC.x+40,g.ARC.y,'rgba(217,119,6,.88)','#fff',ap,11);",
    "chip('공간 선수',g.ARC.x+40,g.ARC.y,'rgba(217,119,6,.88)','#fff',ap,11);")
add("if(pt>.62) chip('All set simultaneously!',g.pcx,H*.67,'rgba(15,23,42,.85)','#FCD34D',eO(n01(pt,.62,1)),11);",
    "if(pt>.62) chip('전원 동시 준비 완료!',g.pcx,H*.67,'rgba(15,23,42,.85)','#FCD34D',eO(n01(pt,.62,1)),11);")
add("chip('Immediate press!',g.TE1.x-36,g.TE1.y-22,'rgba(239,68,68,.88)','#fff',eO(n01(pt,.58,1)),10);",
    "chip('즉각 압박!',g.TE1.x-36,g.TE1.y-22,'rgba(239,68,68,.88)','#fff',eO(n01(pt,.58,1)),10);")
add("chip('one touch!',g.TE1.x,g.TE1.y-24,'rgba(250,204,21,.92)','#1a1a1a',opa,12);",
    "chip('원터치!',g.TE1.x,g.TE1.y-24,'rgba(250,204,21,.92)','#1a1a1a',opa,12);")
add("if(pt>.62) chip('Free Space',g.ARC.x,g.ARC.y-26,'rgba(250,204,21,.9)','#1a1a1a',eO(n01(pt,.62,1)),12);",
    "if(pt>.62) chip('자유 공간',g.ARC.x,g.ARC.y-26,'rgba(250,204,21,.9)','#1a1a1a',eO(n01(pt,.62,1)),12);")
add("chip('Best xT choice',g.ARC.x,H*.89,'rgba(15,23,42,.85)','#FCD34D',xa,11);",
    "chip('최고의 xT 선택',g.ARC.x,H*.89,'rgba(15,23,42,.85)','#FCD34D',xa,11);")

# --- cvClutch2 dead-code duplicate block (element not in DOM but keep text consistent) ---
add("if(arcFree>.6) chip2('Free Space',g.ARC.x,g.ARC.y-24,'rgba(250,204,21,.9)','#1a1a1a',eO(n01(pt,P2E+.05,P2E+.35)),10);",
    "if(arcFree>.6) chip2('자유 공간',g.ARC.x,g.ARC.y-24,'rgba(250,204,21,.9)','#1a1a1a',eO(n01(pt,P2E+.05,P2E+.35)),10);")
add("chip2('Free Space',g.ARC.x,g.ARC.y-26,'rgba(250,204,21,.92)','#1a1a1a',1,11);",
    "chip2('자유 공간',g.ARC.x,g.ARC.y-26,'rgba(250,204,21,.92)','#1a1a1a',1,11);")

# --- App1: Overload → Isolation board (cvIS) — IS_PHASES + bubbleLabel ---
add("{dur:1.2, label:'① SHOCK — CDM plays diagonal long ball to RW!'},",
    "{dur:1.2, label:'① 쇼크 — CDM이 RW에게 대각선 롱볼!'},")
add("{dur:2.0, label:'③ Defenders scramble back — racing to recover'},",
    "{dur:2.0, label:'③ 수비수 백스프린트 — 복귀 경쟁'},")
add("{dur:2.0, label:'④ 1v1 — only D1 arrives, RW isolated'},",
    "{dur:2.0, label:'④ 1v1 — D1만 도착, RW 고립'},")
add("{dur:1.6, label:'⑤ RW drives past — 1v1 won!'},",
    "{dur:1.6, label:'⑤ RW 돌파 — 1v1 승리!'},")
add("if(info) info.textContent='Left overload looping';",
    "if(info) info.textContent='왼쪽 오버로드 반복 중';")
add("bubbleLabel(ctx,'SHOCK!',lerp(cdm.x,rw.x,.45),lerp(cdm.y,rw.y,.45)-20,'rgba(240,200,80,.50)','#F0C858',13);",
    "bubbleLabel(ctx,'쇼크!',lerp(cdm.x,rw.x,.45),lerp(cdm.y,rw.y,.45)-20,'rgba(240,200,80,.50)','#F0C858',13);")
add("bubbleLabel(ctx,'1v1!',rw.x,rw.y-34,'rgba(94,201,122,.55)',IC,13);",
    "bubbleLabel(ctx,'1v1!',rw.x,rw.y-34,'rgba(94,201,122,.55)',IC,13);")
add("bubbleLabel(ctx,'BEAT!',rw.x+36,rw.y-18,'rgba(94,201,122,.65)',IC,13);",
    "bubbleLabel(ctx,'제쳤다!',rw.x+36,rw.y-18,'rgba(94,201,122,.65)',IC,13);")
add("bubbleLabel(ctx,'Defence weight ←',W*.30,H*.62,'rgba(224,92,92,.30)',DC,10);",
    "bubbleLabel(ctx,'수비 무게중심 ←',W*.30,H*.62,'rgba(224,92,92,.30)',DC,10);")
add("bubbleLabel(ctx,'RW isolated, waiting',W*.76,H*.92,'rgba(94,201,122,.30)',IC,10);",
    "bubbleLabel(ctx,'RW 고립, 대기 중',W*.76,H*.92,'rgba(94,201,122,.30)',IC,10);")

# --- App3: Lateral Pass Escape drill (cvLateral) — MSGS + bubbleLabel ---
add("""      'GK holds ball — check C1·C2 positioning',
      '① C1 advances to arc base — bounce pass with GK',
      '② C2 at arc top · C1 at arc base — same depth positioning',
      '③ GK → C2 (arc top) — C1 at arc base, facing forward',
      '④ C2 lateral pass → C1 (top to base, pure lateral)',
      'Press escape complete — C1 drives forward',""",
    """      'GK 볼 소유 — C1·C2 위치 확인',
      '① C1이 아크 하단으로 전진 — GK와 원터치 벽패스',
      '② C2는 아크 상단 · C1은 아크 하단 — 같은 깊이 위치',
      '③ GK → C2(아크 상단) — C1은 아크 하단에서 전방을 향함',
      '④ C2 횡패스 → C1 (상단에서 하단으로, 순수 횡패스)',
      '압박 탈출 완료 — C1 전진',""")
add("bubbleLabel(ctx,'Bounce pass',lerp(pGK.x,pC1.x,.55),lerp(pGK.y,pC1.y,.5)-14,'rgba(240,200,80,.40)','#F0C858',10);",
    "bubbleLabel(ctx,'벽패스',lerp(pGK.x,pC1.x,.55),lerp(pGK.y,pC1.y,.5)-14,'rgba(240,200,80,.40)','#F0C858',10);")
add("bubbleLabel(ctx,'Advance to arc base',W*.33,H*.72,'rgba(78,205,196,.42)','#4ECDC4',10);",
    "bubbleLabel(ctx,'아크 하단으로 전진',W*.33,H*.72,'rgba(78,205,196,.42)','#4ECDC4',10);")
add("bubbleLabel(ctx,'C2 arc top',W*.34,H*.18,'rgba(240,200,80,.38)','#F0C858',10);",
    "bubbleLabel(ctx,'C2 아크 상단',W*.34,H*.18,'rgba(240,200,80,.38)','#F0C858',10);")
add("bubbleLabel(ctx,'C1 arc base',W*.28,H*.72,'rgba(78,205,196,.38)','#4ECDC4',10);",
    "bubbleLabel(ctx,'C1 아크 하단',W*.28,H*.72,'rgba(78,205,196,.38)','#4ECDC4',10);")
add("bubbleLabel(ctx,'Same depth',W*.27,H*.10,'rgba(78,205,196,.40)','#4ECDC4',9);",
    "bubbleLabel(ctx,'같은 깊이',W*.27,H*.10,'rgba(78,205,196,.40)','#4ECDC4',9);")
add("bubbleLabel(ctx,'Same depth',W*.27,H*.10,'rgba(78,205,196,.38)','#4ECDC4',9);",
    "bubbleLabel(ctx,'같은 깊이',W*.27,H*.10,'rgba(78,205,196,.38)','#4ECDC4',9);")
add("bubbleLabel(ctx,'GK → C2',lerp(pGK.x,pC2.x,.5),lerp(pGK.y,pC2.y,.5)-14,'rgba(240,200,80,.40)','#F0C858',10);",
    "bubbleLabel(ctx,'GK → C2',lerp(pGK.x,pC2.x,.5),lerp(pGK.y,pC2.y,.5)-14,'rgba(240,200,80,.40)','#F0C858',10);")
add("bubbleLabel(ctx,'Facing forward',pC1.x+36,pC1.y+4,'rgba(78,205,196,.45)','#4ECDC4',10);",
    "bubbleLabel(ctx,'전방을 향함',pC1.x+36,pC1.y+4,'rgba(78,205,196,.45)','#4ECDC4',10);")
add("bubbleLabel(ctx,'C2 arc top',pC2.x,pC2.y-18,'rgba(240,200,80,.35)','#F0C858',9);",
    "bubbleLabel(ctx,'C2 아크 상단',pC2.x,pC2.y-18,'rgba(240,200,80,.35)','#F0C858',9);")
add("bubbleLabel(ctx,'C1 arc base',pC1.x+4,pC1.y+18,'rgba(78,205,196,.35)','#4ECDC4',9);",
    "bubbleLabel(ctx,'C1 아크 하단',pC1.x+4,pC1.y+18,'rgba(78,205,196,.35)','#4ECDC4',9);")
add("bubbleLabel(ctx,'Lateral pass! (C2→C1, across pitch width)',W*.38,lerp(pC2.y,pC1.y,.5),'rgba(240,200,80,.62)','#F0C858',12);",
    "bubbleLabel(ctx,'횡패스! (C2→C1, 피치 폭 방향)',W*.38,lerp(pC2.y,pC1.y,.5),'rgba(240,200,80,.62)','#F0C858',12);")
add("bubbleLabel(ctx,'Forward drive',W*.80,H*.58,'rgba(94,201,122,.55)',GREEN,11);",
    "bubbleLabel(ctx,'전진 드라이브',W*.80,H*.58,'rgba(94,201,122,.55)',GREEN,11);")
add("bubbleLabel(ctx,'Press escape complete!',pC1.x,pC1.y-26,'rgba(94,201,122,.65)',GREEN,13);",
    "bubbleLabel(ctx,'압박 탈출 완료!',pC1.x,pC1.y-26,'rgba(94,201,122,.65)',GREEN,13);")

# --- Plan A- / Plan A board (cvPlanMinus/cvPlanPlus) — on-canvas zone labels ---
add("ctxM.fillText('LEFT FLANK OVERLOAD',W*.44,H*.05);",
    "ctxM.fillText('왼쪽 측면 오버로드',W*.44,H*.05);")
add("ctxM.fillText('RIGHT FLANK ISO',W*.54,H*.96);",
    "ctxM.fillText('오른쪽 측면 아이솔레이션',W*.54,H*.96);")
add("bubbleLabel(ctxM,'PLAN A- : Left Overload Loop',W/2,H-18,'rgba(91,155,213,.18)','#5B9BD5',10);",
    "bubbleLabel(ctxM,'PLAN A- : 왼쪽 오버로드 루프',W/2,H-18,'rgba(91,155,213,.18)','#5B9BD5',10);")
add("ctxP.fillText('LEFT FLANK OVERLOAD',W*.44,H*.05);",
    "ctxP.fillText('왼쪽 측면 오버로드',W*.44,H*.05);")
add("ctxP.fillText('RIGHT FLANK ISO',W*.54,H*.96);",
    "ctxP.fillText('오른쪽 측면 아이솔레이션',W*.54,H*.96);")
add("bubbleLabel(ctxP,'SHOCK — Left → Right diagonal switch!',W/2,H-18,'rgba(78,205,196,.28)','#4ECDC4',10);",
    "bubbleLabel(ctxP,'쇼크 — 왼쪽 → 오른쪽 대각선 전환!',W/2,H-18,'rgba(78,205,196,.28)','#4ECDC4',10);")
add("bubbleLabel(ctxP,'Defence conditioned leftward → awaiting SHOCK',W/2,H-18,'rgba(224,92,92,.20)','#E05C5C',10);",
    "bubbleLabel(ctxP,'수비 왼쪽으로 조건화됨 → 쇼크 대기 중',W/2,H-18,'rgba(224,92,92,.20)','#E05C5C',10);")

# --- Buffering board (cvBuffer) — on-canvas labels ---
add("ctx.fillText('LEFT OVERLOAD',W*.64,H*.04);", "ctx.fillText('왼쪽 오버로드',W*.64,H*.04);")
add("ctx.fillText('RIGHT ISO',rwPos()[0],H*.96);", "ctx.fillText('오른쪽 아이솔레이션',rwPos()[0],H*.96);")
add("bubbleLabel(ctx,`⏳ Buffering ${(bufT*2.4).toFixed(1)}s / 2.4s`,W/2,by-9,'rgba(255,80,80,.22)','#ff7777',10);",
    "bubbleLabel(ctx,`⏳ 버퍼링 ${(bufT*2.4).toFixed(1)}초 / 2.4초`,W/2,by-9,'rgba(255,80,80,.22)','#ff7777',10);")
add("ctx.fillText('Late↓',defs[i].x,defs[i].y-defs[i].r-8);",
    "ctx.fillText('지각↓',defs[i].x,defs[i].y-defs[i].r-8);")
add("ctx.fillText('BEATEN',defs[0].x,defs[0].y+defs[0].r+14);",
    "ctx.fillText('돌파당함',defs[0].x,defs[0].y+defs[0].r+14);")

# --- Chained Post Play (cvPost) — remaining canvas labels + status ternary ---
add("ctx.fillText('HIGH PRESS',W*.94,H*.07);", "ctx.fillText('하이프레스',W*.94,H*.07);")
add("ctx.fillText('Pivot 1',aP1.x,aP1.y+aP1.r+13);", "ctx.fillText('기점1',aP1.x,aP1.y+aP1.r+13);")
add("ctx.fillText('Pivot 2',aST.x,aST.y+aST.r+13);", "ctx.fillText('기점2',aST.x,aST.y+aST.r+13);")
add("""    const lbl=step>=6?'Space dribble advance! — High Press structurally broken':
              step>=5?'Key Point: ball and player simultaneously into space!':
              step>=4?'1v1 post play — marker engaged, space opens':
              step>=1?'Pivot = option — the holder decides':
              'High Press Man-Marking vs Pivot Strategy';""",
    """    const lbl=step>=6?'공간 드리블 전진! — 하이프레스 구조적으로 붕괴':
              step>=5?'핵심: 볼과 선수가 동시에 공간으로!':
              step>=4?'1v1 포스트 플레이 — 마커가 붙고, 공간이 열림':
              step>=1?'기점 = 옵션 — 소유자가 결정한다':
              '하이프레스 맨마킹 vs 기점 전략';""")

# --- Pre-Half Space (cvPHS) — remaining canvas labels + status ternary ---
add("ctx.fillText('FINAL THIRD',W*.83,H*.96);", "ctx.fillText('파이널 서드',W*.83,H*.96);")
add("ctx.fillText('MID THIRD',W*.50,H*.96);", "ctx.fillText('미들 서드',W*.50,H*.96);")
add("ctx.font='600 9px Noto Sans KR'; ctx.fillText('Pre-Half Space',W*.64,H*.95);",
    "ctx.font='600 9px Noto Sans KR'; ctx.fillText('프리 하프스페이스',W*.64,H*.95);")
add("""    const lbl=step>=5?'Cross OR Cutback — defence cannot cover either':
              step>=4?'HS channel advance → cross position / PHS cutback / forward header':
              step>=3?'Pass & Move: key pass then immediate cutback run':
              step>=2?'Two options from PHS simultaneously — defensive dilemma begins':
              'PHS = mid/final third boundary, wide zone — optimal firing point for both engines';""",
    """    const lbl=step>=5?'크로스 또는 컷백 — 수비는 둘 다 막을 수 없음':
              step>=4?'HS 채널 전진 → 크로스 위치 / PHS 컷백 / 전방 헤더':
              step>=3?'패스 앤 무브: 키패스 후 즉시 컷백 런':
              step>=2?'PHS에서 두 옵션 동시 확보 — 수비 딜레마 시작':
              'PHS = 미들/파이널 서드 경계, 와이드 구역 — 두 엔진 모두에게 최적의 발화 지점';""")

# --- Clutch Point boards (cvClutch / cvClutch2 dup) — CLUTCH POINT overlay ---
add("ctx.fillText('CLUTCH POINT!',W*.50,H*.44);", "ctx.fillText('클러치 포인트!',W*.50,H*.44);", 2)
add("ctx.fillText('Clutch player · position locked · triggered!',W*.50,H*.49);",
    "ctx.fillText('클러치 선수 · 포지션 고정 · 발동!',W*.50,H*.49);")
add("ctx.fillText('Clutch player · triggered!',W*.50,H*.50); ctx.restore();",
    "ctx.fillText('클러치 선수 · 발동!',W*.50,H*.50); ctx.restore();")

# --- Trap board (cvTrap) — remaining canvas labels ---
add("ctx.fillText('man marking',cx,cy+bh/2+11);", "ctx.fillText('맨마킹',cx,cy+bh/2+11);")
add("arrow({x:g.pcx,y:g.pcy},{x:W*.74,y:H*.10},'#EF4444','Short counter!',ca,false,11);",
    "arrow({x:g.pcx,y:g.pcy},{x:W*.74,y:H*.10},'#EF4444','짧은 역습!',ca,false,11);")
add("ctx.fillText('Trap broken!',g.pcx,g.pcy+4); ctx.restore();",
    "ctx.fillText('덫 붕괴!',g.pcx,g.pcy+4); ctx.restore();")
add("partArrow(g.PRO1,g.TE1,eO(n01(pt,0,P1E)),'#FCD34D','1st pass',1);",
    "partArrow(g.PRO1,g.TE1,eO(n01(pt,0,P1E)),'#FCD34D','1차 패스',1);")
add("partArrow(g.TE1,g.ARC,eO(n01(pt,P2S,P2E)),'#FCD34D','one touch!',1);",
    "partArrow(g.TE1,g.ARC,eO(n01(pt,P2S,P2E)),'#FCD34D','원터치!',1);")
add("ctx.fillText('one touch!',g.TE1.x,g.TE1.y-26);",
    "ctx.fillText('원터치!',g.TE1.x,g.TE1.y-26);")
add("partArrow(g.TE1,g.ARC,eO(n01(pt,0,.38)),'#FCD34D','one touch!',1);",
    "partArrow(g.TE1,g.ARC,eO(n01(pt,0,.38)),'#FCD34D','원터치!',1);")

# --- Clutch Point boards — BUFFERING overlay + duplicate arrow labels (cvClutch2 dup) ---
add("ctx.fillText('BUFFERING…',W*.74,H*.12);", "ctx.fillText('버퍼링…',W*.74,H*.12);")
add("if(pt<P1E+.06) partArrow2(g.PRO1,g.TE1,eO(n01(pt,0,P1E)),'#FCD34D','1st',1);",
    "if(pt<P1E+.06) partArrow2(g.PRO1,g.TE1,eO(n01(pt,0,P1E)),'#FCD34D','1차',1);")
add("if(pt>P2S-.02&&pt<P2E+.06) partArrow2(g.TE1,g.ARC,eO(n01(pt,P2S,P2E)),'#FCD34D','one!',1);",
    "if(pt>P2S-.02&&pt<P2E+.06) partArrow2(g.TE1,g.ARC,eO(n01(pt,P2S,P2E)),'#FCD34D','원터치!',1);")
add("ctx.fillText('one touch!',g.TE1.x,g.TE1.y-22);",
    "ctx.fillText('원터치!',g.TE1.x,g.TE1.y-22);")

# --- Lateral pass drill — remaining status label ---
add("ctx.fillText('Defence cannot react',W*.50,lerp(pC2.y,pC1.y,.5)+20); ctx.restore();",
    "ctx.fillText('수비는 반응할 수 없다',W*.50,lerp(pC2.y,pC1.y,.5)+20); ctx.restore();")

# --- Accessibility label + dev-only console error (harmless but complete) ---
add("b.setAttribute('aria-label', side==='right'?'scroll right':'scroll left');",
    "b.setAttribute('aria-label', side==='right'?'오른쪽으로 스크롤':'왼쪽으로 스크롤');")
add("console.error('Animation init error:', globalErr);",
    "console.error('애니메이션 초기화 오류:', globalErr);")

# --- "3 Variables · Best xT choice" closing chip (3 occurrences, distinct coords) ---
add("ctx.fillText('3 Variables · Best xT choice',W*.73,H*.845);",
    "ctx.fillText('3가지 변수 · 최고의 xT 선택',W*.73,H*.845);")
add("ctx.fillText('3 Variables · Best xT choice',W*.74,H*.847);",
    "ctx.fillText('3가지 변수 · 최고의 xT 선택',W*.74,H*.847);")
add("ctx.fillText('3 Variables · Best xT choice',W*.72,H*.845);",
    "ctx.fillText('3가지 변수 · 최고의 xT 선택',W*.72,H*.845);")

# Apply part 1
count_report = []
for en, ko, n in R:
    c = s.count(en)
    s = s.replace(en, ko)
    count_report.append((en[:50], c, n))

mismatches = [(e, c, n) for e, c, n in count_report if c != n]
print(f"Part 1 applied. {len(R)} rules. Mismatches: {len(mismatches)}")
for e, c, n in mismatches[:30]:
    print(f"  expected {n}, found {c}: {e!r}")
print(f"Length after part 1: {len(s)}")

# ══════════════════════════════════════════════════════════════════
# PART 2 — Terminology pass: revert select jin-coined terms back to
# English where the Konglish transliteration reads awkwardly. These
# operate on the already-translated Korean string `s`. Kept in Korean
# (read naturally already): 변수(Variable), 변이(Mutation), 버퍼링
# (Buffering), 게겐프레싱(Gegenpressing), 클러치 포인트(Clutch Point),
# 오버로드(Overload), 아이솔레이션(Isolation) — all common,
# already-idiomatic Korean football-analysis vocabulary.
# Reverted to English: Lure & Shock, Pre-Half Space, Signature Move,
# trap (was 덫), Pre-Agreed Pattern Play, Chained Post Play,
# Rest-Attack / Rest-Defence, Multiplicity (section title only).
# ══════════════════════════════════════════════════════════════════
R2 = []
def add2(old, new, n=1):
    R2.append((old, new, n))

# --- Lure & Shock ---
add2('<span class="tag dark">루어 & 쇼크</span>', '<span class="tag dark">Lure & Shock</span>')
add2('<h4>스파이크 이론 — 루어 → 쇼크</h4>', '<h4>스파이크 이론 — Lure → Shock</h4>')
add2('<p>반복으로 상대를 조건화(루어)한 뒤, 조건화된 반응을 이용해 타격(쇼크)한다. 목표는 xT 스파이크 — 갑작스럽고 날카로운 급등의 순간.</p>',
     '<p>반복으로 상대를 조건화(Lure)한 뒤, 조건화된 반응을 이용해 타격(Shock)한다. 목표는 xT 스파이크 — 갑작스럽고 날카로운 급등의 순간.</p>')
add2('<p>선수의 고유한 온더볼 습관 지문. 압박 탈출의 핵심 도구이자 마커를 조건화하는 개인 단위 루어. 포지션과 무관하게 타협 불가능한 요소.</p>',
     '<p>선수의 고유한 온더볼 습관 지문. 압박 탈출의 핵심 도구이자 마커를 조건화하는 개인 단위 Lure. 포지션과 무관하게 타협 불가능한 요소.</p>')
add2('<h2>루어 → 쇼크</h2>', '<h2>Lure → Shock</h2>')
add2('<p class="desc">반복으로 조건화(루어)한 뒤, 조건화된 반응을 이용해 타격(쇼크)한다. 플랜 전환의 핵심 원리.</p>',
     '<p class="desc">반복으로 조건화(Lure)한 뒤, 조건화된 반응을 이용해 타격(Shock)한다. 플랜 전환의 핵심 원리.</p>')
add2('Plan A- (루어) — 조건화 반복', 'Plan A- (Lure) — 조건화 반복', 2)
add2('Plan A (쇼크) — xT 스파이크', 'Plan A (Shock) — xT 스파이크')
add2('<h4>Plan A- 조건화 → Plan A 쇼크</h4>', '<h4>Plan A- 조건화 → Plan A Shock</h4>')
add2('<span class="bdesc">왼쪽: 왼쪽 측면 오버로드 조건화 / 오른쪽: 오른쪽 아이솔레이션 쇼크</span>',
     '<span class="bdesc">왼쪽: 왼쪽 측면 오버로드 조건화 / 오른쪽: 오른쪽 아이솔레이션 Shock</span>')
add2('<div class="cv-label" style="color:#FDE68A">Plan A (쇼크) — 타격</div>', '<div class="cv-label" style="color:#FDE68A">Plan A (Shock) — 타격</div>')
add2('<button class="btn-play" id="btnShock">쇼크</button>', '<button class="btn-play" id="btnShock">Shock</button>')
add2("<div class=\"step-info\" id=\"infoPlan\">왼쪽 측면 오버로드 반복 중 — 쇼크를 눌러 오른쪽 아이솔레이션 발동</div>",
     "<div class=\"step-info\" id=\"infoPlan\">왼쪽 측면 오버로드 반복 중 — Shock를 눌러 오른쪽 아이솔레이션 발동</div>")
add2('<div class="board-top"><h4>Plan A (쇼크) — 타격: 오버로드 → 아이솔레이션</h4><span class="bdesc">전환 이후 상황 — 오버로드→아이솔레이션 한 번의 움직임이 순간적인 버퍼링 틈을 연다</span></div>',
     '<div class="board-top"><h4>Plan A (Shock) — 타격: 오버로드 → 아이솔레이션</h4><span class="bdesc">전환 이후 상황 — 오버로드→아이솔레이션 한 번의 움직임이 순간적인 버퍼링 틈을 연다</span></div>')
add2("<div class=\"step-info\" id=\"infoBuf\">Plan A- 왼쪽 오버로드 → 쇼크 트리거 대기 중</div>",
     "<div class=\"step-info\" id=\"infoBuf\">Plan A- 왼쪽 오버로드 → Shock 트리거 대기 중</div>")
add2("<div class=\"flow-item hi2\"><div class=\"fl\">쇼크</div><h4>Plan A 타격</h4><p>기대 배반 → 버퍼링 → 고xT 전환</p></div>",
     "<div class=\"flow-item hi2\"><div class=\"fl\">Shock</div><h4>Plan A 타격</h4><p>기대 배반 → 버퍼링 → 고xT 전환</p></div>")
add2("<div class=\"flow-item hi\"><div class=\"fl\">루어</div><h4>Plan A- 사이클</h4><p>완결된 공격 사이클. 상대 조건화 진행 중.</p></div>",
     "<div class=\"flow-item hi\"><div class=\"fl\">Lure</div><h4>Plan A- 사이클</h4><p>완결된 공격 사이클. 상대 조건화 진행 중.</p></div>")
add2('<p class="desc">개인 단위 루어 앤 쇼크의 실행 메커니즘. 엘리트일 필요는 없다 — 확실한 시그니처 무브 하나면 압박을 이기기에 충분하다.</p>',
     '<p class="desc">개인 단위 Lure and Shock의 실행 메커니즘. 엘리트일 필요는 없다 — 확실한 Signature Move 하나면 압박을 이기기에 충분하다.</p>')
add2('<h3 style="margin-bottom:14px">개인 단위 루어 앤 쇼크</h3>', '<h3 style="margin-bottom:14px">개인 단위 Lure and Shock</h3>')
add2('<p>시그니처 무브는 개인 단위에서도 루어 앤 쇼크 메커니즘으로 작동한다. 마커가 선수의 시그니처 무브 패턴을 학습하면 — 그 기대 자체가 새로운 루어가 된다. 마커의 기대를 이용하는 것이 개인 단위 쇼크다.</p>',
     '<p>Signature Move는 개인 단위에서도 Lure and Shock 메커니즘으로 작동한다. 마커가 선수의 Signature Move 패턴을 학습하면 — 그 기대 자체가 새로운 Lure가 된다. 마커의 기대를 이용하는 것이 개인 단위 Shock다.</p>')
add2('<p style="color:#94A3B8;margin-bottom:20px">한쪽에서 수적 우위(오버로드)를 만들어 수비를 끌어들인 뒤, 반대쪽에서 1v1(아이솔레이션)을 만들어 타격한다. 루어 앤 쇼크의 팀 단위 구현.</p>',
     '<p style="color:#94A3B8;margin-bottom:20px">한쪽에서 수적 우위(오버로드)를 만들어 수비를 끌어들인 뒤, 반대쪽에서 1v1(아이솔레이션)을 만들어 타격한다. Lure and Shock의 팀 단위 구현.</p>')
add2('<h4 style="color:#60A5FA;margin-bottom:8px">오버로드 (루어)</h4>', '<h4 style="color:#60A5FA;margin-bottom:8px">오버로드 (Lure)</h4>')
add2('<div class="cv-label" style="color:#60A5FA">루어 — 왼쪽 오버로드 조건화</div>', '<div class="cv-label" style="color:#60A5FA">Lure — 왼쪽 오버로드 조건화</div>')
add2('<h4 style="color:#FDE68A;margin-bottom:8px">아이솔레이션 (쇼크)</h4>', '<h4 style="color:#FDE68A;margin-bottom:8px">아이솔레이션 (Shock)</h4>')
add2('<div class="cv-label" style="color:#FDE68A">쇼크 → 버퍼링 → 1v1</div>', '<div class="cv-label" style="color:#FDE68A">Shock → 버퍼링 → 1v1</div>')
add2('<button class="btn-play" id="btnBufPlay2">쇼크</button>', '<button class="btn-play" id="btnBufPlay2">Shock</button>')
add2("document.getElementById('infoPlan').textContent='왼쪽 측면 5v5 오버로드 반복 중 — 쇼크를 눌러 오른쪽 아이솔레이션 발동';",
     "document.getElementById('infoPlan').textContent='왼쪽 측면 5v5 오버로드 반복 중 — Shock를 눌러 오른쪽 아이솔레이션 발동';")
add2("document.getElementById('infoPlan').textContent='쇼크 완료 — RW 아이솔레이션 성공. 다시 시도.';",
     "document.getElementById('infoPlan').textContent='Shock 완료 — RW 아이솔레이션 성공. 다시 시도.';")
add2("bubbleLabel(ctxP,'쇼크 — 왼쪽 → 오른쪽 대각선 전환!',W/2,H-18,'rgba(78,205,196,.28)','#4ECDC4',10);",
     "bubbleLabel(ctxP,'Shock — 왼쪽 → 오른쪽 대각선 전환!',W/2,H-18,'rgba(78,205,196,.28)','#4ECDC4',10);")
add2("bubbleLabel(ctxP,'수비 왼쪽으로 조건화됨 → 쇼크 대기 중',W/2,H-18,'rgba(224,92,92,.20)','#E05C5C',10);",
     "bubbleLabel(ctxP,'수비 왼쪽으로 조건화됨 → Shock 대기 중',W/2,H-18,'rgba(224,92,92,.20)','#E05C5C',10);")
add2("document.getElementById('infoPlan').textContent='쇼크 — CDM이 오른쪽 RW에게 대각선 롱볼! 모든 수비수 버퍼링 중...';",
     "document.getElementById('infoPlan').textContent='Shock — CDM이 오른쪽 RW에게 대각선 롱볼! 모든 수비수 버퍼링 중...';")
add2("{dur:1.1, label:'① 쇼크 — CDM이 왼쪽 오버로드에서 오른쪽 RW로 대각선 롱볼'},",
     "{dur:1.1, label:'① Shock — CDM이 왼쪽 오버로드에서 오른쪽 RW로 대각선 롱볼'},")
add2("document.getElementById('infoBuf').textContent='▶ 시작을 눌러 쇼크 → 버퍼링 → 1v1 흐름을 확인';",
     "document.getElementById('infoBuf').textContent='▶ 시작을 눌러 Shock → 버퍼링 → 1v1 흐름을 확인';")
add2("{dur:1.2, label:'① 쇼크 — CDM이 RW에게 대각선 롱볼!'},", "{dur:1.2, label:'① Shock — CDM이 RW에게 대각선 롱볼!'},")
add2("bubbleLabel(ctx,'쇼크!',lerp(cdm.x,rw.x,.45),lerp(cdm.y,rw.y,.45)-20,'rgba(240,200,80,.50)','#F0C858',13);",
     "bubbleLabel(ctx,'Shock!',lerp(cdm.x,rw.x,.45),lerp(cdm.y,rw.y,.45)-20,'rgba(240,200,80,.50)','#F0C858',13);")
add2("<p>③ 시그니처가 어디서든 드러나게 한다 — 목표는 각 선수의 시그니처 무브가 편한 한 구역이 아니라 피치의 모든 구역에서 자연스럽게 나오는 것이다.</p>",
     "<p>③ 시그니처가 어디서든 드러나게 한다 — 목표는 각 선수의 Signature Move가 편한 한 구역이 아니라 피치의 모든 구역에서 자연스럽게 나오는 것이다.</p>")

# --- Signature Move ---
add2('<h4>시그니처 무브</h4>', '<h4>Signature Move</h4>')
add2('<div class="ch-num">시그니처 무브</div>', '<div class="ch-num">Signature Move</div>')
add2('<p>"모든 센터백이 발재간이 뛰어날 필요는 없다. 하지만 모두에게 압박 속에서 꺼내 쓸 수 있는 믿을 만한 시그니처 무브가 최소 하나는 필요하다."</p>',
     '<p>"모든 센터백이 발재간이 뛰어날 필요는 없다. 하지만 모두에게 압박 속에서 꺼내 쓸 수 있는 믿을 만한 Signature Move가 최소 하나는 필요하다."</p>')
add2('<p style="font-size:.85rem">강한 압박 속에서 자연스럽게 나오는 온더볼 탈출 패턴. 시그니처 무브의 가장 근본적인 기능.</p>',
     '<p style="font-size:.85rem">강한 압박 속에서 자연스럽게 나오는 온더볼 탈출 패턴. Signature Move의 가장 근본적인 기능.</p>')

# --- Pre-Half Space ---
add2('<h4>프리 하프스페이스</h4>', '<h4>Pre-Half Space</h4>')
add2('<div class="ch-num">프리 하프스페이스</div>', '<div class="ch-num">Pre-Half Space</div>')
add2('<h3 style="color:#60A5FA;margin-bottom:14px">프리 하프스페이스의 정의</h3>', '<h3 style="color:#60A5FA;margin-bottom:14px">Pre-Half Space의 정의</h3>')
add2('<div class="board-top"><h4>프리 하프스페이스 — 두 엔진의 점화</h4><span class="bdesc">공간 점유 → 두 옵션 동시 보유 → 수비 딜레마</span></div>',
     '<div class="board-top"><h4>Pre-Half Space — 두 엔진의 점화</h4><span class="bdesc">공간 점유 → 두 옵션 동시 보유 → 수비 딜레마</span></div>')
add2("const aPHS=new Player(0,0,TEAL,'PHS',14);     // 프리 하프스페이스 선수 (경계 와이드)",
     "const aPHS=new Player(0,0,TEAL,'PHS',14);     // Pre-Half Space 선수 (경계 와이드)")
add2("ctx.font='600 9px Noto Sans KR'; ctx.fillText('프리 하프스페이스',W*.64,H*.95);",
     "ctx.font='600 9px Noto Sans KR'; ctx.fillText('Pre-Half Space',W*.64,H*.95);")

# --- Pre-Agreed Pattern Play ---
add2('<h4>횡패스 × 사전 합의 패턴 플레이</h4>', '<h4>횡패스 × Pre-Agreed Pattern Play</h4>')
add2('<p>앞서 소개한 횡패스의 <strong>사전 합의 패턴 플레이</strong>와 같은 핵심 아이디어다 — 하나의 철학이 다른 스케일에 적용된 것. 덫을 탈출하는 횡패스 프로토콜이든, 템포를 전환하는 클러치 포인트든, 모두 하나의 방향을 가리킨다: 버퍼링을 만들어내는 사전 합의 패턴.</p>',
     '<p>앞서 소개한 횡패스의 <strong>Pre-Agreed Pattern Play</strong>와 같은 핵심 아이디어다 — 하나의 철학이 다른 스케일에 적용된 것. trap을 탈출하는 횡패스 프로토콜이든, 템포를 전환하는 클러치 포인트든, 모두 하나의 방향을 가리킨다: 버퍼링을 만들어내는 사전 합의 패턴.</p>')
add2('<div class="ch-num">사전 합의 패턴 플레이</div>', '<div class="ch-num">Pre-Agreed Pattern Play</div>')
add2('<h2>사전 합의 패턴 플레이 & 버퍼링</h2>', '<h2>Pre-Agreed Pattern Play & 버퍼링</h2>')
add2('<p>현대 수비는 맨마킹 기반 직접 압박을 표준화했다. 즉흥적인 플레이는 조직된 압박 앞에서 일관되게 재현되기 어렵다. <strong>38경기 시즌 내내 재현 가능한 공격 진입 방법론</strong>이 필요하며, 그 답이 사전 합의 패턴 플레이다.</p>',
     '<p>현대 수비는 맨마킹 기반 직접 압박을 표준화했다. 즉흥적인 플레이는 조직된 압박 앞에서 일관되게 재현되기 어렵다. <strong>38경기 시즌 내내 재현 가능한 공격 진입 방법론</strong>이 필요하며, 그 답이 Pre-Agreed Pattern Play다.</p>')

# --- Chained Post Play ---
add2('<h3 style="color:#60A5FA;margin-bottom:6px">적용 2. 체인드 포스트 플레이</h3>', '<h3 style="color:#60A5FA;margin-bottom:6px">적용 2. Chained Post Play</h3>')
add2('<div class="board-top"><h4>체인드 포스트 플레이 — 패턴 시뮬레이션</h4></div>', '<div class="board-top"><h4>Chained Post Play — 패턴 시뮬레이션</h4></div>')

# --- Rest-Attack / Rest-Defence ---
add2('<h3 style="margin-bottom:16px">레스트-어택 & 레스트-디펜스</h3>', '<h3 style="margin-bottom:16px">Rest-Attack & Rest-Defence</h3>')
add2('<p><strong>레스트-어택</strong>: 볼이 없을 때도 팀이 유지하는 공격 대형.',
     '<p><strong>Rest-Attack</strong>: 볼이 없을 때도 팀이 유지하는 공격 대형.')
add2('<p><strong>레스트-디펜스</strong>: 점유 중에도 팀이 유지하는 수비 대형.',
     '<p><strong>Rest-Defence</strong>: 점유 중에도 팀이 유지하는 수비 대형.')

# --- Multiplicity (section title only; body keeps 멀티/멀티성 where it already reads fine) ---
add2('<a href="#multi">멀티성</a>', '<a href="#multi">Multiplicity</a>')
add2('<div class="ch-num">멀티성</div>', '<div class="ch-num">Multiplicity</div>')
add2('<h2>멀티성 — 변이가 요구하는 것</h2>', '<h2>Multiplicity — 변이가 요구하는 것</h2>')
add2('<h3 style="margin-bottom:14px">멀티성이 필요한 이유</h3>', '<h3 style="margin-bottom:14px">Multiplicity가 필요한 이유</h3>')

# --- trap (was 덫) — remaining standalone occurrences not already covered above ---
add2('<h4>덫 안으로</h4>', '<h4>Trap 안으로</h4>')
add2('<p>수비의 덫을 피하지 말고 — 의도적으로 그 안으로 들어가 미리 약속된 패턴으로 탈출한다. 횡패스 프로토콜이 핵심 도구다.</p>',
     '<p>수비의 trap을 피하지 말고 — 의도적으로 그 안으로 들어가 미리 약속된 패턴으로 탈출한다. 횡패스 프로토콜이 핵심 도구다.</p>')
add2('<div class="ch-num">덫 안으로</div>', '<div class="ch-num">Trap 안으로</div>')
add2('<h2>덫 안으로 들어가라</h2>', '<h2>Trap 안으로 들어가라</h2>')
add2('<p class="desc">수비의 덫을 돌아가지 말고 — 의도적으로 안으로 들어가 내부에서 풀어낸다. 짜여진 수비를 깨는 유일하게 재현 가능한 방법.</p>',
     '<p class="desc">수비의 trap을 돌아가지 말고 — 의도적으로 안으로 들어가 내부에서 풀어낸다. 짜여진 수비를 깨는 유일하게 재현 가능한 방법.</p>')
add2('<h3 style="margin-bottom:14px">덫의 정의</h3>', '<h3 style="margin-bottom:14px">Trap의 정의</h3>')
add2('<p>모든 수비 구조에는 의도된 덫이 있다.', '<p>모든 수비 구조에는 의도된 trap이 있다.')
add2('<p>덫을 피하는 방법들은 일관성이 없다.', '<p>trap을 피하는 방법들은 일관성이 없다.')
add2('38경기 시즌 내내, 대회 전체를 통틀어 — <strong>재현 가능한 공격 진입 방법론</strong>이 필요하다면 덫을 돌아가는 것은 답이 아니다.',
     '38경기 시즌 내내, 대회 전체를 통틀어 — <strong>재현 가능한 공격 진입 방법론</strong>이 필요하다면 trap을 돌아가는 것은 답이 아니다.')
add2('<p>덫 안에서 미리 약속된 패스 한 번으로 탈출하는 순간, 압박에 커밋한 수비수들은 엉뚱한 쪽에 고립된다.',
     '<p>trap 안에서 미리 약속된 패스 한 번으로 탈출하는 순간, 압박에 커밋한 수비수들은 엉뚱한 쪽에 고립된다.')
add2('<thead><tr><th>블록 유형</th><th>덫의 형태</th><th>Into the Trap 대응</th></tr></thead>',
     '<thead><tr><th>블록 유형</th><th>Trap의 형태</th><th>Into the Trap 대응</th></tr></thead>')
add2('<p>Into the Trap은 단순한 전술적 선택지가 아니다. 덫의 보편성을 받아들인 끝에 도달한 <strong style="color:#FDE68A">전략적 결론</strong>이다.',
     '<p>Into the Trap은 단순한 전술적 선택지가 아니다. trap의 보편성을 받아들인 끝에 도달한 <strong style="color:#FDE68A">전략적 결론</strong>이다.')
add2('<p><strong>게겐프레싱이 실패하는 즉시 전환한다.</strong> 심리가 아니라 구조로 작동한다. 상대는 덫의 존재를 알고 있을 수도 있다 — 하지만 다른 선택지가 없다.</p>',
     '<p><strong>게겐프레싱이 실패하는 즉시 전환한다.</strong> 심리가 아니라 구조로 작동한다. 상대는 trap의 존재를 알고 있을 수도 있다 — 하지만 다른 선택지가 없다.</p>')
add2('③ 덫 발동 → 볼 탈환 또는 위험 지역 클리어</p>', '③ trap 발동 → 볼 탈환 또는 위험 지역 클리어</p>')
add2("{dur:2.6, label:'③ 덫 구조 — 박스 앞 5명의 우리'},", "{dur:2.6, label:'③ trap 구조 — 박스 앞 5명의 우리'},")
add2("{dur:2.8, label:'⑥ 첫 번째 횡패스 — 덫 안으로 볼 투입'},", "{dur:2.8, label:'⑥ 첫 번째 횡패스 — trap 안으로 볼 투입'},")
add2("ctx.fillText('덫 붕괴!',g.pcx,g.pcy+4); ctx.restore();", "ctx.fillText('trap 붕괴!',g.pcx,g.pcy+4); ctx.restore();")

add2('<p>조건화된 수비가 자동으로 반응하는 순간 → <strong>Plan A 실행 → 버퍼링 극대화</strong>. 상대가 우리를 잘 알수록 쇼크는 더 세게 꽂힌다.</p>',
     '<p>조건화된 수비가 자동으로 반응하는 순간 → <strong>Plan A 실행 → 버퍼링 극대화</strong>. 상대가 우리를 잘 알수록 Shock는 더 세게 꽂힌다.</p>')

# --- cvPlanMinus2 dead-code duplicate block (element not in DOM but keep text consistent) ---
add2("ctx.fillStyle='rgba(91,155,213,.52)';ctx.fillText('LEFT FLANK OVERLOAD',W*.27,H*.05);",
     "ctx.fillStyle='rgba(91,155,213,.52)';ctx.fillText('왼쪽 측면 오버로드',W*.27,H*.05);")
add2("ctx.fillStyle='rgba(94,201,122,.48)';ctx.fillText('RIGHT ISO',W*.72,H*.95);",
     "ctx.fillStyle='rgba(94,201,122,.48)';ctx.fillText('오른쪽 아이솔레이션',W*.72,H*.95);")
add2("const bw2=ctx.measureText('PLAN A- : Left Overload Loop').width+16;",
     "const bw2=ctx.measureText('PLAN A- : 왼쪽 오버로드 루프').width+16;")
add2("ctx.fill();ctx.fillStyle='#5B9BD5';ctx.fillText('PLAN A- : Left Overload Loop',W/2,H-9);ctx.restore();",
     "ctx.fill();ctx.fillStyle='#5B9BD5';ctx.fillText('PLAN A- : 왼쪽 오버로드 루프',W/2,H-9);ctx.restore();")

count_report2 = []
for old, new, n in R2:
    c = s.count(old)
    s = s.replace(old, new)
    count_report2.append((old[:60], c, n))

mismatches2 = [(o, c, n) for o, c, n in count_report2 if c != n]
print(f"Part 2 applied. {len(R2)} rules. Mismatches: {len(mismatches2)}")
for o, c, n in mismatches2[:40]:
    print(f"  expected {n}, found {c}: {o!r}")
print(f"Length after part 2: {len(s)}")

with open(DST, "w", encoding="utf-8") as f:
    f.write(s)
