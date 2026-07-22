/* jin's original tactical essays — English renderings of his own blog posts
   (wiki/articles/*_blog_*). Edit freely. blocks[] render as labelled sections
   on the essay detail page. */

export type EssayBlock = {
  label: string;
  text: string;
  /** Optional embedded Variation Theory animation — path under /public */
  visualSrc?: string;
  /** Optional key into components/kpi/EssayVisuals.tsx's ESSAY_VISUALS registry */
  visualComponent?: string;
  visualCaption?: string;
  visualHeight?: number;
};
export type Essay = {
  id: string;
  title: string;
  ko: string;
  category: string;
  blurb: string;      // card hook
  blocks: EssayBlock[];
};

export const ESSAYS: Essay[] = [
  {
    id: "pre-half-space",
    title: "Pre-Half Space",
    ko: "Pre-Half Space",
    category: "Original concept",
    blurb: "A space I named myself — the real starting point of a modern attack.",
    blocks: [
      {
        label: "The idea",
        text: "Split the pitch across into thirds — defensive, middle, final — then split the middle third lengthwise. The wide strips of the middle third, right beside the touchline and one pass or dribble away from the final third, are what I call the pre-half space: the pivot point just before the half-space and the final third. It is the 'completed form of the mezzala' — the true starting point of almost every attacking sequence.",
        visualSrc: "/anim/pre-half-space.html",
        visualCaption: "Variation Theory diagram — step through the sequence with Next. Source: /approach (Variation Theory).",
        visualHeight: 450,
      },
      { label: "Why it exists now", text: "As the value of the half-space became common knowledge, defences evolved to close it: back fours use a double pivot (a Højbjerg–Sissoko type) to screen both half-spaces directly; back fives and sixes let stoppers occupy the half-space so there are always two covering bodies. FC Seoul's six-at-the-back against Ulsan (Aug 2023) took this to the extreme and simply switched off positional play. When the half-space is sealed, you need an entry point one stage earlier — the pre-half space." },
      {
        label: "Three structural advantages",
        text: "First, distance: one pass or dribble reaches the half-space or final third, making it the 'last link' of a positional build-up. Second, minimal counter-risk: beside the touchline, a lost ball tends to run out of play and is trivially easy to counter-press — the lowest-risk zone on the pitch, which is exactly why you can be at your most daring here. Third, it frees the key player: instead of stationing your best passer in the half-space where he's useless if he never receives, you place him in the pre-half space to distribute and then make a secondary run, while a different player attacks the half-space.",
        visualComponent: "phs-zone-diagram",
        visualCaption: "Schematic — the pre-half space as jin defines it, plus his working xT estimate for the zone.",
      },
      {
        label: "Who plays here — and secondary movement",
        text: "The zone wants your best striker of a ball — Lee Kang-in, Bruno Fernandes, Bernardo Silva, Dybala, Ødegaard. But the passer's job isn't only the pass: after releasing it he must make a secondary movement, a diagonal run into the arc or the box, giving the defender a fresh threat and adding an extra attacker. The difference between a player who stops after passing and one who moves immediately is what decides the real quality of the zone.",
        visualComponent: "phs-player-fit",
        visualCaption: "Illustrative — jin's read of the pre-half-space passer role, not a ranked list.",
      },
      {
        label: "In the Variation framework",
        text: "The pre-half space is the segment right before the low-xT → high-xT transition, so a key pass played from here is that transition executed. The secondary movement is the off-ball version of a Signature Move — a defender can learn it but can't easily respond to it — which makes it the on-pitch home of the individual variable.",
        visualComponent: "phs-stat-card",
        visualCaption: "One match, one player — a case example, not a league-wide norm.",
      },
    ],
  },
  {
    id: "chained-post-play",
    title: "Chained Post-Play",
    ko: "Chained Post Play",
    category: "Attacking structure",
    blurb: "Two pivots at once, so the defender loses whatever he chooses.",
    blocks: [
      {
        label: "Thesis",
        text: "The way to break a compact modern deep block is chained post-play: activate a first and a second pivot simultaneously so that whatever the defence chooses, it loses. The quality of the target player's simple one-touch lateral pass decides the speed and accuracy of the whole attack — three touches can be enough to reach the final third — and a team where any player can fill any role (the Gwangju FC model) builds a sustainable, injury-proof attack. This is multi-positionality proven in the field.",
        visualSrc: "/anim/chained-post-play.html",
        visualCaption: "Variation Theory diagram — step through the sequence with Next. Source: /approach (Variation Theory).",
        visualHeight: 420,
      },
      {
        label: "The chained dilemma",
        text: "With a lone striker, a centre-back and midfielder can double up and it becomes a 5-v-5 physical duel. But activate a first pivot (the striker with his back to goal) and a second pivot at the same time: if the midfielder helps double the striker, the second man is free; if he marks the second man, the striker plays his post-up. Whatever he chooses, space appears. This is a structural dilemma, not a battle of individual superiority — that is why it sits a level above a plain target man.",
        visualComponent: "post-leverkusen-flow",
        visualCaption: "Leverkusen under Xabi Alonso, jin's blog reading of the activation pattern — illustrative, not a tracked sequence.",
      },
      {
        label: "Simplicity is the quality",
        text: "The sequence runs centre-back → first/second pivot → a player facing goal → ball into space. An accurate pass to feet is worth 100; a simple one-touch that can be taken on the move is worth 120–150. Leverkusen under Xabi Alonso showed it: Boniface as the first pivot, Grimaldo or Wirtz as the second, Xhaka as the hub reading the whole pitch — three to five one-touch pattern passes into the final third, slicing a deep block into small pieces.",
        visualComponent: "post-pass-quality",
        visualCaption: "jin's own conceptual scale for pass quality in chained post-play — not a measured statistic.",
      },
      {
        label: "The Gwangju model — and its weakness",
        text: "At Gwangju (Lee Jung-hyo), Lee Hee-gyun's role can be covered by Eom Ji-sung or Lee Gun-hee, and Jung Ho-yeon's by Lee Hee-gyun, Choi Kyung-rok or Eom Ji-sung. Because every player knows the settled patterns and movements, variation and combination-variation occur constantly. The vulnerability is the attack-to-defence transition: gegenpressing covers it, but a single late approach can turn into a fatal counter.",
        visualComponent: "post-gwangju-roles",
        visualCaption: "Gwangju FC (Lee Jung-hyo) — jin's blog notes on role substitution across the squad.",
      },
    ],
  },
  {
    id: "sustainable-mid-block",
    title: "The Sustainable Mid-Block",
    ko: "Sustainable Mid-Block",
    category: "Tactical evolution",
    blurb: "Qatar 2022's lesson: the efficient team won, not the busy one.",
    blocks: [
      {
        label: "Thesis",
        text: "Modern tactics evolved total football → low block → high block → mid-block, each stage solving the previous one's weakness. An explosion in fixture congestion and international call-ups broke the sustainability of the high-intensity high block, and the rational alternative — a mid-block with zonal pressing built on sensible energy management — rose in its place. Qatar 2022 proved it: the team that ran efficiently won, not the team that ran the most.",
        visualComponent: "midblock-evolution",
        visualCaption: "Illustrative periodization — jin's own framing of the trend, not a sourced academic timeline.",
      },
      { label: "Why the high block broke", text: "Liverpool 2020–21 is the case study: van Dijk, Gomez and Matip all lost to injury, Fabinho and Henderson were pushed into central defence, the midfield was overused, and injuries cascaded. The causes were structural — more matches, international duty (AFCON, qualifiers), long-haul travel for non-European players — layered on top of a system that exposes space behind the centre-backs and expands their roles into build-up and attack. The injury risk grows geometrically." },
      {
        label: "The Qatar 2022 data",
        text: "By FIFA's official numbers, the teams that ran the most (USA, Iran, Canada, Germany, Belgium) went out by the last 16. The semi-finalists (Argentina, France, Croatia, Morocco) had below-average team distance; the finalists ran close to the least of all. From the last 16 on, the team that ran less advanced. Their common thread: one ace freed from defensive pressing to conserve energy — Messi, Mbappé, Modrić, Ziyech.",
        visualComponent: "midblock-qatar-distance",
        visualCaption: "Hand-aggregated from all 64 FIFA official post-match summary reports, Qatar 2022 — see block text below for the honest caveat on Croatia.",
      },
      {
        label: "What the mid-block gives",
        text: "A low block leaves a long way from winning the ball to shooting; a high block demands full-team sprints and exposes space behind. The mid-block presses only when the ball enters the zone (a snare/trap), keeps the space behind within the keeper's cover, and exempts the ace from defending so his energy goes into attack. It pairs naturally with a 3-2 build-up that flips to 3-1 when the press is weak — numerical superiority in the pockets and a stronger counter-press.",
        visualComponent: "midblock-fsqca",
        visualCaption: "Source: Yan et al. (2024), Frontiers in Psychology 14:1307346 — no single KPI decided Qatar 2022; managed combinations, like a mid-block's, can also win.",
      },
    ],
  },
  {
    id: "lateral-overload",
    title: "Overload to Isolation, via the Lateral Pass",
    ko: "횡패스를 활용한 Overload to Isolation",
    category: "Attacking structure",
    blurb: "No Busquets? Then solve it with structure, not a single player.",
    blocks: [
      {
        label: "Thesis",
        text: "Overload to isolation is the base structure of modern attacking football: build a numerical overload on one side to drag the block across, then attack the isolated one-v-one on the far side. In a mid-block world where a direct long switch is hard, the key becomes releasing the snare through lateral passes in midfield first, then switching (into the trap). What decides the quality is the holding midfielder's left-and-right long distribution and the left-footed stopper's ability to accelerate tempo — you don't have a Busquets, so you overcome it with tactics.",
        visualSrc: "/anim/overload-to-isolation.html",
        visualCaption: "Variation Theory diagram — left board loops the overload; press SHOCK to fire the switch. Source: /approach (Variation Theory).",
        visualHeight: 370,
      },
      {
        label: "The sequence — and the condition",
        text: "Start the build, form an asymmetric overload on one side, pull the defensive structure toward it, and leave a strong one-v-one player 'stranded' on the opposite side. Feed him by the shortest route, and he must win — because if he loses it there, you are the one isolated. Rodri won a Ballon d'Or partly for exactly this: distributing to the isolated player by the minimum path out of an overload.",
        visualComponent: "overload-dm-recovery-combo",
        visualCaption: "Left: illustrative framework for the DM role's evolution. Right: source — Korea v Czech Republic match analysis (this site).",
      },
      {
        label: "The holding midfielder and the left-footed stopper",
        text: "If the holder can't hit long passes, a central midfielder has to drop, subtracting a runner and weakening the overload; if he can, the midfielder pushes on and the overload is maximised. And the left-footed left centre-back matters: he can rake a pass along the line so an inverted winger receives facing forward without a touch, where a right-footer needs settle-turn-pass and burns a tempo. Two saved tempos are a dramatic difference between winger and defensive line.",
        visualComponent: "overload-cb-tempo",
        visualCaption: "\"Two tempos saved\" is jin's own framing of the touch-count gap, not a measured average.",
      },
      {
        label: "Into the trap",
        text: "To break an impregnable mid-block, walk into the snare on purpose and unpick it from inside: pass forward into the trap, the post player receives back-to-goal and lays a one-touch lateral to a support player, who takes it moving forward — pressure released, attack shifted up a gear — and the overload-to-isolation fires. Quality depends on the post player's one-touch pass and the support runner's timing; without a rehearsed movement, you get caught in the trap.",
        visualSrc: "/anim/lateral-pass-escape.html",
        visualCaption: "Variation Theory diagram — step through the drill with Next. Source: /approach (Variation Theory).",
        visualHeight: 450,
      },
    ],
  },
  {
    id: "striker-evolution",
    title: "The Fast + Tall 9",
    ko: "공격수 유형의 진화",
    category: "Player evolution",
    blurb: "Why Haaland's two contradictory skills are variation itself.",
    blocks: [
      {
        label: "Thesis",
        text: "The striker evolved Classic 9 (Costa, Crouch, Kim Shin-wook) → False 9 (the Pep era: Firmino, Fàbregas) → Fast + Tall 9 (Haaland, Vlahović, Morata, Lukaku), each a counter to the previous solution. The real value of the Fast + Tall 9 isn't only goals — it's three tactical things: a tactical change without a substitution, more varied set-piece-to-counter routes, and a simple, powerful answer to a deep block.",
        visualSrc: "/anim/phase1-classic-9.html",
        visualCaption: "Phase 1 — step through with Next. Classic 9's original strength: a fullback steps out to the winger, the box goes short, cross, header.",
        visualHeight: 450,
      },
      {
        label: "How we got here",
        text: "The False 9 pulled a centre-back out and a third man (an inverted winger) attacked the vacated space. The counter was simple — the centre-back just refuses to be dragged out — which is why big, stay-at-home centre-backs (Maguire, Dier, Mings, Keane) were briefly prized. Their limit was that asking for anything beyond defending produced passing errors, so attacking coaches went hunting for their weakness and found the fast, orthodox 9. Mourinho's Spurs, meanwhile, screened both half-spaces with a Højbjerg–Sissoko double pivot, erasing De Bruyne and Gündoğan's space — the context in which City signed Haaland. When it's too complex, simple is the answer.",
        visualSrc: "/anim/phase2-false-9-counter.html",
        visualCaption: "Phase 2 — step through with Next. Two ways defences answered Classic 9, then False 9's reply: drop into the pocket, drag a centre-back out, release the winger into the gap.",
        visualHeight: 450,
      },
      { label: "Three tactical advantages", text: "First, a tactical change with no substitution: the Fast + Tall 9 plays both poacher and target man within one match, saving cards for midfield and defence. Second, richer counters after defending a set piece: with only small forwards, counters funnel centrally and the defender can 'give the wing, block the middle'; with a Fast + Tall 9, giving the middle is a goal and giving the wing is a header — he can't choose. Kim Shin-wook and Haaland both defend set pieces; the difference is running speed, so Haaland's defending and counter are designed at once." },
      {
        label: "In the Variation framework",
        text: "Third, and this is the deeper point: the extreme answer to False 9 is an ultra-low block, and an ultra-low block forces you back toward a target man — crosses, long balls, winning the box and the second ball. But a title race is mostly fought against other proactive teams, not low blocks, and those games turn on transitions, where pace decides the moment, not aerial presence. A target man alone can't punish a turnover; a fast forward alone can't dominate a parked bus. One player who is both is a genuine variable — the same body reads as a set-piece and crossing threat when the game is stuck, and as a sprint threat the instant it turns into a transition. A defender can prepare for one or the other, never both, in the same 90 minutes.",
        visualSrc: "/anim/phase3-fast-tall-9.html",
        visualCaption: "Phase 3 — step through with Next. Low block needs a target man; open, proactive games need pace — Fast + Tall 9 is one player who answers both.",
        visualHeight: 450,
      },
    ],
  },
  {
    id: "signature-move",
    title: "Signature Move",
    ko: "Signature Move",
    category: "Individual variable",
    blurb: "Not every player can be a crack — but every player can own one on-ball habit no defender can fully copy.",
    blocks: [
      {
        label: "Thesis",
        text: "Modern football's default press is man-marking, which forces on-ball quality onto every position — including centre-backs and defensive midfielders who were never coached to carry it. Not every player can be a crack. A Signature Move is the realistic answer to that gap: instead of demanding open-play brilliance from everyone, embed one on-ball habit deep enough that it survives pressure on its own. It isn't a named dribble move — it's the sum of a player's touch texture, turn direction, ball rhythm and pressure response, built up over years until it becomes involuntary. It isn't a precondition of my framework; it's a multiplier. A team is stronger with it and more exposed without it, which is why I treat it as something to cultivate deliberately from the youth level, not something to simply demand.",
      },
      {
        label: "Two functions, neither secondary",
        text: "A Signature Move works in two directions at once, and neither is the 'real' purpose. First, pressure escape: under genuine pressure, the body's habitual way out of trouble is its clearest expression — it isn't performed in order to create a buffering effect, it's simply how the player survives, and the pattern is what's left over after years of that survival. Second, continuity setup: the small, mostly unconscious habits that make the next action easier — the pre-touches that set up a strong-foot strike, the upper-body feint that shifts a marker's weight, the dribbling stride width that keeps a burst forward and a change of direction both live, the preferred pivot foot on first touch. These sharpen the more matches a player accumulates, which is why I call the concept a 'Move' rather than a 'dribble' — it describes a body language, not a skill move.",
      },
      {
        label: "Why it can't be copied",
        text: "A Signature Move grows out of a player's actual physical profile, which is exactly why it resists duplication. A player whose edge is acceleration builds one around explosive change-of-direction; a player whose edge is balance and ball-carrying builds one around unbalancing a marker and holding the ball under contact. Two players can drill the identical feint and still express it completely differently once it's theirs — it's why the Cruyff Turn still carries Johan Cruyff's name more than fifty years later, taught the same way in academies worldwide, and still no guarantee that the next player who drills it will ever make it look the way he did. The name attaches to the body that made it, not the technique itself. Like a fingerprint, it's personal by construction, not by branding.",
      },
      {
        label: "Youth — the Golden Age to learn and expand Signature Move development",
        text: "Ball skill and on-ball habit are acquired fastest early, not late. You can't turn an adult professional into Messi — that window has mostly closed by the time a player debuts. But you can build a player with a real chance of becoming something close to that, and the earlier the on-ball layer goes in, the steeper the growth curve tends to be afterward. That has to be the direction youth development points in, in a game where ball-handling and press-resistance now matter regardless of position. Not reactive development, which waits to see what a player turns into and coaches around it after the fact — active development, which deliberately builds the on-ball layer while the Golden Age window for skill acquisition is still open. A player who owns one genuine Signature Move, wherever they line up on the pitch, has a way to beat pressure, or at minimum survive it, and that survival is a real tactical and winning contribution, not decoration. The teaching answer sits in the youth system, and it isn't the same repetition-based, identical dribbling drills used to teach basic technique to everyone the same way. Fundamentals can be standardized and coached identically. A Signature Move can't — it has to be built from what actually fits a given player's physical traits, the habit that comes out most naturally and comfortably from their own body, not a move handed down the same way to every kid in the academy. In practice that means exposing young players to many different dribbling styles and ways of playing the ball, and giving them time in the middle ground between success and failure to find out what actually works for their own body — not correcting them toward 'the right technique' the moment they fail. A Signature Move has to be grown from the youth level up, by the player who will eventually own it.",
      },
      {
        label: "In the Variation framework",
        text: "A Signature Move is the on-ball execution layer of what I call the individual variable: where the individual variable asks what a player repeats to condition an opponent, the Signature Move is the body language that repetition actually takes. A well-drilled defender processes a familiar pattern almost automatically — Kahneman's (2011) fast, associative System 1. Once an opponent has learned a player's pattern, breaking from it forces a jolt back into slower System 2 processing: a real, if brief, cognitive delay. That buffering isn't the point of a Signature Move — it's a byproduct of the opponent having learned it in the first place. And it doesn't stay local: winning a duel this way usually pulls at least one more defender out of position, lifting the value of space elsewhere on the pitch (Fernandez & Bornn, 2018). Stack a Signature Move on top of a positional mutation in the same sequence and a defence has to solve two unscripted problems at once — who marks this player, and which way is he even going — the clearest case of double-buffering the framework produces.",
      },
    ],
  },
];

export function findEssay(id: string) { return ESSAYS.find((e) => e.id === id); }
