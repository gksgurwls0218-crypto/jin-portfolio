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
        text: "A Signature Move is the on-ball execution layer of what I call the individual variable: where the individual variable asks what a player repeats to condition an opponent, the Signature Move is the body language that repetition actually takes. A well-drilled defender processes a familiar pattern almost automatically — Kahneman's (2011) fast, associative System 1. Once an opponent has learned a player's pattern, breaking from it forces a jolt back into slower System 2 processing: a real, if brief, cognitive delay. That buffering isn't the point of a Signature Move — it's a byproduct of the opponent having learned it in the first place. And it doesn't stay local: winning a duel this way usually pulls at least one more defender out of position, lifting the value of space elsewhere on the pitch (Fernandez & Bornn, 2018). Stack a Signature Move on top of a positional mutation in the same sequence and a defence has to solve two unscripted problems at once — who marks this player, and which way is he even going — the clearest case of double-buffering the framework produces. One caveat I have since had to revise: that buffering does not vanish once an opponent studies the move. Part of it survives being read, for reasons that are mechanical rather than perceptual \u2014 see Mechanical Residue.",
      },
    ],
  },
  {
    id: "mechanical-residue",
    title: "Mechanical Residue",
    ko: "Mechanical Residue",
    category: "Individual variable",
    blurb: "Scout the move all you like \u2014 the defender still has to stop his own momentum.",
    blocks: [
      {
        label: "The objection this answers",
        text: "The standard objection to a Signature Move is that it has an expiry date. If a habit is repeatable enough to become a fingerprint, it is repeatable enough to end up in an opposition analyst's clip reel, and once it does the surprise is gone. I used to concede that point, and my own writing on Signature Move said as much \u2014 that it gets suppressed once an opponent has studied it properly. Working through the movement science, I think that concession was wrong, or at least far too generous. The advantage does not go to zero when the move is read. Part of it does. The other part is mechanical, and mechanics do not care what the defender knows.",
      },
      {
        label: "The body sends two signals at once",
        text: "Brault and colleagues (2012) put rugby side-steps through motion capture and virtual reality and separated what the body broadcasts into two kinds of signal. Exaggerated movements \u2014 upper trunk yaw, the placement of the outside foot \u2014 carry deceptive information, because they are not tightly bound to where the player is actually going. Minimised movements \u2014 the displacement of the centre of mass, lower trunk yaw \u2014 carry honest information, because they cannot be faked without also changing the outcome. This is the same split Deghaies and colleagues (2025) found inside a single tennis serve, where the loading phase varies between players by around 42 percent while the acceleration phase varies by only 15 percent. Put the two together and you get the sharpest statement I know of what a Signature Move actually is: a Signature Move lives in the degrees of freedom that mechanics leaves free. The centre of mass is not one of them. Which also means a player's budget for having a signature at all is set by their body \u2014 trunk range, foot placement width, deceleration capacity \u2014 not by how creative they are.",
      },
      {
        label: "One half decays. The other does not.",
        text: "That split hands you two different components of the delay a Signature Move imposes, and they behave completely differently against better opponents. The perceptual component is the defender reading the wrong signal. Brault's experts picked up centre-of-mass information 183 milliseconds before the attacker reoriented; novices got it 16 milliseconds before \u2014 a 167 millisecond gap, and the experts won precisely by moving later rather than earlier. Jackson and colleagues (2018) found the same thing for stepovers in football: high-skilled players discriminated genuine from deceptive actions at d-prime 1.46 against 0.63 for low-skilled. So the perceptual component shrinks as the opponent gets better, and against a truly elite defender it tends toward nothing. The mechanical component is different. Once a defender has committed his centre of mass, reversing it has a price in physics. Van den Tillaar and colleagues (2020) measured it: the plant-step ground contact for a 45-degree cut is about 0.15 seconds and for a 180-degree cut about 0.30 seconds, with deceleration steps rising from roughly 0.4 to 3.3. That number does not fall because the defender watched video. I call what is left the mechanical residue \u2014 the part of a Signature Move that survives being read \u2014 and its size is set by the speed, angle and footing of the moment, not by the opposition's analysis department.",
      },
      {
        label: "Why that changes how you coach it",
        text: "Three things follow. First, a Signature Move should be judged less on how convincing the feint looks and more on what angle it forces the defender to commit to \u2014 the convincing part depreciates against better opponents, the angle does not. Second, the value of a Signature Move changes composition as a player moves up levels: in youth and lower divisions the perceptual half dominates, higher up only the mechanical half is reliably left. A move that stops working after a promotion may never have had a mechanical half at all. Third, and this is the part that surprised me, physical conditioning raises the ceiling on a Signature Move directly. Better deceleration and better centre-of-mass control mean you commit less and the defender commits more. The habit and the body are not two separate development tracks; the body sets how large the residue can be.",
      },
      {
        label: "How much is it actually worth",
        text: "Brink and colleagues (2023) fitted 623 MLS dribbles to a pair of coupled equations of motion and recovered a parameter for how hesitant the defender is \u2014 how much he protects the goal versus how much he commits to the attacker. Defenders facing an elite dribbler were 27 percent more hesitant, at the median, than against a non-elite one. In the same study, raising a player's top speed by 25 percent improved their dribble score by only 2 to 8 percent. Those two numbers are not in the same units \u2014 one is the opponent's parameter and one is the player's own score, and I am not dividing them \u2014 but the shape is hard to miss. A 25 percent gain in top speed is close to unobtainable for a professional and buys single digits. The behavioural layer moves the opponent by double digits. That is the honest case for why a Signature Move is worth building: not everyone can get faster, and getting faster does not pay very much.",
      },
      {
        label: "What I still cannot prove",
        text: "One thing is missing and I would rather say so than paper over it. Nothing in this literature shows that a player with a sharper fingerprint performs better. Brink's elite label was assigned before the analysis, not measured from the movement, so it is not evidence that distinctiveness itself is what moves the defender. What the research did give me is a definition I can actually compute: combine Marineau and colleagues' 2024 review, where 48 of 59 studies found experts vary less within themselves, with Burdack and colleagues' 2020 result identifying individuals from their kinematics with 100 percent accuracy, and a signature becomes a separability ratio \u2014 small variation within a player, large distance between players. That is a number, and it can be regressed against output. Until someone runs it, the claim that every player needs a Signature Move stays an argument rather than a finding, and I would rather hold it that way than overstate it. A second gap I have since closed off elsewhere: this entry only counts what the defender pays \u2014 the attacker pays too, and at the top level that is what decides the duel. See Execution Cost.",
      },
    ],
  },
  {
    id: "execution-cost",
    title: "Execution Cost",
    ko: "Execution Cost",
    category: "Youth development",
    blurb: "Everyone counts what the defender pays. Nobody counts what the attacker pays.",
    blocks: [
      {
        label: "The term that was missing",
        text: "When a player beats a press with a turn, the coaching conversation is always about the defender \u2014 he bit, he was wrong-footed, he lost a step. All of that is real, and I have written about how much of it survives being scouted. But the attacker turned too. He also had to kill his own momentum, plant a foot and rebuild speed in a new direction. Nobody counts that. I call it the execution cost: the time the escape move costs the player performing it. Once you put that term into the equation, a coaching argument falls out of it that I did not expect to find.",
      },
      {
        label: "The escape window, written out",
        text: "Narizuka and colleagues (2026) analysed all 306 matches of the 2023 J1 League with synchronised event and tracking data and defined pressure as the minimum arrival time: how long the fastest opponent needs to reach the player on the ball. Ball loss probability rose as that time fell. So pressing is a budget problem, and a Signature Move is an attempt to buy more budget. It buys in two currencies. The perceptual one is the defender reading the wrong signal \u2014 Brault and colleagues (2012) measured a 167 millisecond gap between how early an expert and a novice pick up the honest centre-of-mass cue. The mechanical one is the defender reversing committed momentum \u2014 van den Tillaar and colleagues (2020) put the plant-step ground contact at roughly 0.15 seconds for a 45-degree cut and 0.30 seconds for a 180-degree one, with deceleration steps rising from about 0.4 to 3.3. Subtract what the attacker himself spends and you get the net escape window: perceptual gain plus mechanical gain, minus execution cost.",
      },
      {
        label: "Why this decides things at the top and not at the bottom",
        text: "The two gains behave completely differently as opponents improve. The perceptual one shrinks toward nothing, because a better defender reads the centre of mass instead of the shoulders. The mechanical one does not shrink, because physics is not persuaded by video analysis. So against a weak defender the net window is roughly the perceptual gain plus the mechanical gain minus whatever the move costs you, and it stays positive even if your technique is expensive. Against an elite defender the perceptual term is gone and you are left with the mechanical gain minus the execution cost \u2014 two quantities in the same order of magnitude. At that point the execution cost decides the sign. I want to be careful here: these are magnitude bands from different studies, not measurements of one duel, and the mechanical figures come from a change-of-direction task with no ball. The claim is not a specific number. The claim is structural: as the level rises, beating a press stops being about how well you deceive and starts being about how cheap the movement is for you.",
      },
      {
        label: "What makes a movement cheap",
        text: "This is where my argument about the body comes in, and it turns out to have a proper name. Nigg and colleagues (2017) filmed 35 runners at 240 Hz across three shoe types and barefoot and found that each runner holds a preferred movement path \u2014 defined as the joint trajectory demanding the least energy. Change their shoes and 80 to 100 per cent of them keep that path within three degrees; only barefoot running pushed them meaningfully off it. Selinger and colleagues (2015) went further: using an exoskeleton to move where the energetic optimum sits, they showed people converge on a new optimum within minutes, re-converge within seconds after a disturbance, and will chase savings of under five per cent. So when I say a player has a movement that feels comfortable to his body, that is not a figure of speech. It is an energetic minimum, the nervous system hunts for it without being asked, and it defends it against interference.",
      },
      {
        label: "The move you were given fails twice, and the second time is the one that matters",
        text: "A movement imposed from outside is not a player's own minimum, so its execution cost starts higher. That is the first loss. The second is worse. Masters (1992) showed that skills acquired through explicit instruction collapse under pressure as the performer reinvests conscious control into them, and Mullen, Hardy and Oldham (2007) replicated it after two earlier studies had muddied the finding. So the coached-in move gets more expensive exactly when the player is rushed \u2014 which is precisely the situation where the arrival time is short and the escape is needed. The technique fails hardest at the moment it is required. That, I think, is the real content of the coaching cliche that under pressure you fall back on habit. What surfaces is not merely what was drilled most. It is what the body found cheapest.",
      },
      {
        label: "So where does standardisation stop",
        text: "Not at zero, and I want to be clear about that because the opposite reading is the easy one. Four layers sit between a coaching instruction and a movement. What the player looks at and when. Which way he opens his body to receive. Where the ball has to end up. And the joint path that produces all of it. The first three are information and constraint, and they are common language \u2014 they should be taught the same way to everyone, and a coach who does that well is doing the job. Only the fourth is the player's own, and that is the one the biomechanics says you cannot install from outside. This also settles a disagreement I had with myself. Coaching literature is right that receiving shape can be trained and becomes more natural the earlier it is learned. That is layer two. What I have argued cannot be taught is layer four. They were never the same claim. The practical version is a single diagnostic question: am I correcting where the ball has to go, or how the player gets it there? If it is the second, the correction is making the movement more expensive for him, and it will cost him at the exact moment a press arrives.",
      },
      {
        label: "The weakest link, stated plainly",
        text: "There is a hole in this and I would rather name it than let someone else find it. Comfortable is not the same as effective. What the research establishes is an energetic minimum, and what beating a defender requires is an advantage over another person. Nothing guarantees those coincide, and it is easy to imagine the opposite \u2014 that a player's most comfortable turn is also his most predictable one. The partial answer is that at the top level the perceptual term has gone to zero anyway, so predictability has already been paid for and lowering the execution cost is the only improvement left on the table. But that is my inference, not a finding. And the execution cost itself has never been measured: of the three terms in the equation, it is the only one for which I cannot even quote a range. I would rather publish the equation with an unmeasured term in it than quietly drop the term.",
      },
    ],
  },
];

export function findEssay(id: string) { return ESSAYS.find((e) => e.id === id); }
