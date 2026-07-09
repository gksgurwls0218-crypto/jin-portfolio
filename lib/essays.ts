/* jin's original tactical essays — English renderings of his own blog posts
   (wiki/articles/*_blog_*). Edit freely. blocks[] render as labelled sections
   on the essay detail page. */

export type EssayBlock = { label: string; text: string };
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
    ko: "프리 하프스페이스",
    category: "Original concept",
    blurb: "A space I named myself — the real starting point of a modern attack.",
    blocks: [
      { label: "The idea", text: "Split the pitch across into thirds — defensive, middle, final — then split the middle third lengthwise. The wide strips of the middle third, right beside the touchline and one pass or dribble away from the final third, are what I call the pre-half space: the pivot point just before the half-space and the final third. It is the 'completed form of the mezzala' — the true starting point of almost every attacking sequence." },
      { label: "Why it exists now", text: "As the value of the half-space became common knowledge, defences evolved to close it: back fours use a double pivot (a Højbjerg–Sissoko type) to screen both half-spaces directly; back fives and sixes let stoppers occupy the half-space so there are always two covering bodies. FC Seoul's six-at-the-back against Ulsan (Aug 2023) took this to the extreme and simply switched off positional play. When the half-space is sealed, you need an entry point one stage earlier — the pre-half space." },
      { label: "Three structural advantages", text: "First, distance: one pass or dribble reaches the half-space or final third, making it the 'last link' of a positional build-up. Second, minimal counter-risk: beside the touchline, a lost ball tends to run out of play and is trivially easy to counter-press — the lowest-risk zone on the pitch, which is exactly why you can be at your most daring here. Third, it frees the key player: instead of stationing your best passer in the half-space where he's useless if he never receives, you place him in the pre-half space to distribute and then make a secondary run, while a different player attacks the half-space." },
      { label: "Who plays here — and secondary movement", text: "The zone wants your best striker of a ball — Lee Kang-in, Bruno Fernandes, Bernardo Silva, Dybala, Ødegaard. But the passer's job isn't only the pass: after releasing it he must make a secondary movement, a diagonal run into the arc or the box, giving the defender a fresh threat and adding an extra attacker. The difference between a player who stops after passing and one who moves immediately is what decides the real quality of the zone." },
      { label: "In the Variation framework", text: "The pre-half space is the segment right before the low-xT → high-xT transition, so a key pass played from here is that transition executed. The secondary movement is the off-ball version of a Signature Move — a defender can learn it but can't easily respond to it — which makes it the on-pitch home of the individual variable." },
    ],
  },
  {
    id: "chained-post-play",
    title: "Chained Post-Play",
    ko: "연쇄적 포스트 플레이",
    category: "Attacking structure",
    blurb: "Two pivots at once, so the defender loses whatever he chooses.",
    blocks: [
      { label: "Thesis", text: "The way to break a compact modern deep block is chained post-play: activate a first and a second pivot simultaneously so that whatever the defence chooses, it loses. The quality of the target player's simple one-touch lateral pass decides the speed and accuracy of the whole attack — three touches can be enough to reach the final third — and a team where any player can fill any role (the Gwangju FC model) builds a sustainable, injury-proof attack. This is multi-positionality proven in the field." },
      { label: "The chained dilemma", text: "With a lone striker, a centre-back and midfielder can double up and it becomes a 5-v-5 physical duel. But activate a first pivot (the striker with his back to goal) and a second pivot at the same time: if the midfielder helps double the striker, the second man is free; if he marks the second man, the striker plays his post-up. Whatever he chooses, space appears. This is a structural dilemma, not a battle of individual superiority — that is why it sits a level above a plain target man." },
      { label: "Simplicity is the quality", text: "The sequence runs centre-back → first/second pivot → a player facing goal → ball into space. An accurate pass to feet is worth 100; a simple one-touch that can be taken on the move is worth 120–150. Leverkusen under Xabi Alonso showed it: Boniface as the first pivot, Grimaldo or Wirtz as the second, Xhaka as the hub reading the whole pitch — three to five one-touch pattern passes into the final third, slicing a deep block into small pieces." },
      { label: "The Gwangju model — and its weakness", text: "At Gwangju (Lee Jung-hyo), Lee Hee-gyun's role can be covered by Eom Ji-sung or Lee Gun-hee, and Jung Ho-yeon's by Lee Hee-gyun, Choi Kyung-rok or Eom Ji-sung. Because every player knows the settled patterns and movements, variation and combination-variation occur constantly. The vulnerability is the attack-to-defence transition: gegenpressing covers it, but a single late approach can turn into a fatal counter." },
    ],
  },
  {
    id: "sustainable-mid-block",
    title: "The Sustainable Mid-Block",
    ko: "지속가능성 미들블록",
    category: "Tactical evolution",
    blurb: "Qatar 2022's lesson: the efficient team won, not the busy one.",
    blocks: [
      { label: "Thesis", text: "Modern tactics evolved total football → low block → high block → mid-block, each stage solving the previous one's weakness. An explosion in fixture congestion and international call-ups broke the sustainability of the high-intensity high block, and the rational alternative — a mid-block with zonal pressing built on sensible energy management — rose in its place. Qatar 2022 proved it: the team that ran efficiently won, not the team that ran the most." },
      { label: "Why the high block broke", text: "Liverpool 2020–21 is the case study: van Dijk, Gomez and Matip all lost to injury, Fabinho and Henderson were pushed into central defence, the midfield was overused, and injuries cascaded. The causes were structural — more matches, international duty (AFCON, qualifiers), long-haul travel for non-European players — layered on top of a system that exposes space behind the centre-backs and expands their roles into build-up and attack. The injury risk grows geometrically." },
      { label: "The Qatar 2022 data", text: "By FIFA's official numbers, the teams that ran the most (USA, Iran, Canada, Germany, Belgium) went out by the last 16. The semi-finalists (Argentina, France, Croatia, Morocco) had below-average team distance; the finalists ran close to the least of all. From the last 16 on, the team that ran less advanced. Their common thread: one ace freed from defensive pressing to conserve energy — Messi, Mbappé, Modrić, Ziyech." },
      { label: "What the mid-block gives", text: "A low block leaves a long way from winning the ball to shooting; a high block demands full-team sprints and exposes space behind. The mid-block presses only when the ball enters the zone (a snare/trap), keeps the space behind within the keeper's cover, and exempts the ace from defending so his energy goes into attack. It pairs naturally with a 3-2 build-up that flips to 3-1 when the press is weak — numerical superiority in the pockets and a stronger counter-press." },
    ],
  },
  {
    id: "lateral-overload",
    title: "Overload to Isolation, via the Lateral Pass",
    ko: "횡패스를 활용한 Overload to Isolation",
    category: "Attacking structure",
    blurb: "No Busquets? Then solve it with structure, not a single player.",
    blocks: [
      { label: "Thesis", text: "Overload to isolation is the base structure of modern attacking football: build a numerical overload on one side to drag the block across, then attack the isolated one-v-one on the far side. In a mid-block world where a direct long switch is hard, the key becomes releasing the snare through lateral passes in midfield first, then switching (into the trap). What decides the quality is the holding midfielder's left-and-right long distribution and the left-footed stopper's ability to accelerate tempo — you don't have a Busquets, so you overcome it with tactics." },
      { label: "The sequence — and the condition", text: "Start the build, form an asymmetric overload on one side, pull the defensive structure toward it, and leave a strong one-v-one player 'stranded' on the opposite side. Feed him by the shortest route, and he must win — because if he loses it there, you are the one isolated. Rodri won a Ballon d'Or partly for exactly this: distributing to the isolated player by the minimum path out of an overload." },
      { label: "The holding midfielder and the left-footed stopper", text: "If the holder can't hit long passes, a central midfielder has to drop, subtracting a runner and weakening the overload; if he can, the midfielder pushes on and the overload is maximised. And the left-footed left centre-back matters: he can rake a pass along the line so an inverted winger receives facing forward without a touch, where a right-footer needs settle-turn-pass and burns a tempo. Two saved tempos are a dramatic difference between winger and defensive line." },
      { label: "Into the trap", text: "To break an impregnable mid-block, walk into the snare on purpose and unpick it from inside: pass forward into the trap, the post player receives back-to-goal and lays a one-touch lateral to a support player, who takes it moving forward — pressure released, attack shifted up a gear — and the overload-to-isolation fires. Quality depends on the post player's one-touch pass and the support runner's timing; without a rehearsed movement, you get caught in the trap." },
    ],
  },
  {
    id: "striker-evolution",
    title: "The Fast + Tall 9",
    ko: "공격수 유형의 진화",
    category: "Player evolution",
    blurb: "Why Haaland's two contradictory skills are variation itself.",
    blocks: [
      { label: "Thesis", text: "The striker evolved Classic 9 (Costa, Crouch, Kim Shin-wook) → False 9 (the Pep era: Firmino, Fàbregas) → Fast + Tall 9 (Haaland, Vlahović, Morata, Lukaku), each a counter to the previous solution. The real value of the Fast + Tall 9 isn't only goals — it's three tactical things: a tactical change without a substitution, more varied set-piece-to-counter routes, and a simple, powerful answer to a deep block." },
      { label: "How we got here", text: "The False 9 pulled a centre-back out and a third man (an inverted winger) attacked the vacated space. The counter was simple — the centre-back just refuses to be dragged out — which is why big, stay-at-home centre-backs (Maguire, Dier, Mings, Keane) were briefly prized. Their limit was that asking for anything beyond defending produced passing errors, so attacking coaches went hunting for their weakness and found the fast, orthodox 9. Mourinho's Spurs, meanwhile, screened both half-spaces with a Højbjerg–Sissoko double pivot, erasing De Bruyne and Gündoğan's space — the context in which City signed Haaland. When it's too complex, simple is the answer." },
      { label: "Three tactical advantages", text: "First, a tactical change with no substitution: the Fast + Tall 9 plays both poacher and target man within one match, saving cards for midfield and defence. Second, richer counters after defending a set piece: with only small forwards, counters funnel centrally and the defender can 'give the wing, block the middle'; with a Fast + Tall 9, giving the middle is a goal and giving the wing is a header — he can't choose. Kim Shin-wook and Haaland both defend set pieces; the difference is running speed, so Haaland's defending and counter are designed at once." },
      { label: "In the Variation framework", text: "Third, a simple answer to a parked bus: when positional play into the half-space is blocked, just look at Haaland's head and cross. Running both at once is an unlimited dilemma — go to close the half-space and you're crossed, pack the box against the cross and the half-space opens. Holding two contradictory options in one player, live in a match, is exactly what variation means." },
    ],
  },
];

export function findEssay(id: string) { return ESSAYS.find((e) => e.id === id); }
