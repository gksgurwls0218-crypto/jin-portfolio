import type { Metadata } from "next";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Variation — Approach | Jin",
  description: "How systems break — and how to break them on purpose. Variation theory: the full argument.",
};

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

export default function ApproachPage() {
  return (
    <div style={{ background: "var(--stage)" }}>
      {/* ── HERO ───────────────────────────────────────────── */}
      <div className="px-6 md:px-12 pt-16 pb-10" style={{ borderBottom: "0.5px solid var(--edge)" }}>
        <p className="mono mb-3.5" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--green-mid)" }}>
          01 / APPROACH · VARIATION THEORY
        </p>
        <h1 className="font-medium mb-1.5" style={{ fontSize: 40, letterSpacing: "-.01em", color: "var(--ink)" }}>
          Variation
        </h1>
        <p className="mb-6" style={{ fontSize: 15, color: "var(--ink-2)" }}>
          How systems break — and how to break them on purpose.
        </p>
        <div
          className="rounded-xl p-5 max-w-[720px]"
          style={{ background: "var(--stage-2)", border: "0.5px solid var(--edge-2)", borderLeft: "2px solid var(--green-bright)", backdropFilter: "blur(8px)" }}
        >
          <blockquote style={{ fontSize: 15, lineHeight: 1.8, fontStyle: "italic", color: "var(--ink)" }}>
            &ldquo;A moment of variation — a variable or a mutation — induces a few seconds of buffering in the opponent&rsquo;s system.
            Those few seconds change the game. When the system cannot respond to the buffering, the system collapses.&rdquo;
          </blockquote>
          <p className="mono mt-2.5" style={{ fontSize: 9, color: "var(--ink-4)" }}>— Variation theory · Jin</p>
        </div>
        <p className="mono mt-4" style={{ fontSize: 13, color: "var(--green-mid)" }}>
          Home shows this claim in motion. This page is the argument. · 9 min read
        </p>
      </div>

      <EssayNav />

      {/* ── ESSAY BODY ─────────────────────────────────────── */}
      <div className="px-6 md:px-12 py-12 max-w-[860px]">

        <section id="s1" className="scroll-mt-16">
          <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>§1 / PROBLEM</span>
          <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>The standardised game</h2>
          <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
            <p>Modern football has converged on a single operating logic. The positional grid that Guardiola perfected — the pitch divided into zones, occupation rules for every zone, spacing rehearsed until it is reflex — is no longer a style. It is the default operating system of the elite game. A Bundesliga press, a La Liga block and a Premier League build-up now differ far more in tempo and personnel than they differ in logic.</p>
            <p>Convergence has a consequence that is rarely stated plainly: when everyone defends as a system, individual mistakes stop deciding matches. A well-drilled structure absorbs individual errors. It fails collectively, or it does not fail at all.</p>
            <p>So the question that organises all of my work is this: <strong style={{ color: "var(--ink)", fontWeight: 600 }}>what makes a well-drilled system fail?</strong></p>
            <p>Not talent alone — talent is priced into every scouting model in Europe. Not pressing intensity — true intensity is only sustainable in windows. A system breaks when it is forced to process something it has not been trained on. For a few seconds, the structure stops executing and starts computing: defenders check, communicate, re-assign. I call this state <em style={{ color: "var(--green-mid)" }}>buffering</em> — the visible hesitation of a system whose assumptions have just been violated. Those few seconds are where matches are decided.</p>
            <p>Everything below is a method for manufacturing those seconds deliberately, repeatably, and at a cost a squad can afford across a full season.</p>
          </div>
          <div className="mt-6 mb-2">
            <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>VISUAL §1 · GRID → BUFFER</p>
            <GridBufferDiagram />
          </div>
        </section>

        <section id="s2" className="scroll-mt-16 mt-11">
          <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>§2 / INSTRUMENTS</span>
          <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>Two instruments: Variable and Mutation</h2>
          <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
            <p>I work with two distinct instruments — two faces of one word, <em style={{ color: "var(--green-mid)" }}>variation</em>.</p>
            <p>A <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Variable</strong> is held optionality. A team or a player possesses live choices — a, b, c — and reveals the selection as late as possible. The full-back who can pass inside, overlap, or cut back behind; the pivot who can play safe, switch, or break a line. The threat is not any single option. The threat is that the choice has not yet been made.</p>
            <p>A <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Mutation</strong> is becoming the variable. A structure changes its own identity: a formation morphs mid-possession, a centre-back arrives where a striker should be, a player receives the ball in a zone the defensive scheme never assigned to anyone. The defender&rsquo;s question changes from <em style={{ color: "var(--green-mid)" }}>&ldquo;which option will he choose?&rdquo;</em> to <em style={{ color: "var(--green-mid)" }}>&ldquo;who is supposed to be dealing with this at all?&rdquo;</em></p>
            <p>The relationship between the two is the engine of my thinking: <strong style={{ color: "var(--ink)", fontWeight: 600 }}>mutation creates variables.</strong> When a build-up shape shifts from 3-2 to 3-1, passing angles exist that did not exist five seconds earlier — the defence&rsquo;s assignments were designed against a different geometry. Structure moves first; options follow.</p>
          </div>
          <blockquote className="my-5 max-w-[640px]" style={{ fontSize: 15, lineHeight: 1.75, color: "var(--green-mid)", borderLeft: "2px solid var(--green-line)", padding: "4px 0 4px 20px", fontStyle: "italic" }}>
            Mutation creates variables. Structure moves first; options follow.
          </blockquote>
          <div className="mt-6 mb-2">
            <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>VISUAL §2 · DEFINITION TOGGLE</p>
            <DefinitionToggle />
          </div>
        </section>

        <section id="s3" className="scroll-mt-16 mt-11">
          <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>§3 / MECHANISM</span>
          <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>Lure &amp; Shock: conditioning as a weapon</h2>
          <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
            <p>Systems are prediction machines. They defend what they expect. Lure &amp; Shock is the discipline of controlling what the opponent expects.</p>
            <p>The lure is what I call <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Plan A−</strong>: a complete attacking cycle — build-up to shot, not sterile possession — executed repeatedly, as if it were our actual game plan. The completeness matters. Opponents do not learn from harmless circulation; they learn from sequences that end in shots. Executed well, Plan A− teaches the opposition — the players on the pitch and the analysts in the video room — what we are. Their response automates. And automation is the vulnerability: <em style={{ color: "var(--green-mid)" }}>a conditioned reaction is a promise about where they will be.</em></p>
            <p><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Plan A — the shock — is played into the space that promise vacates.</strong></p>
            <p>I describe this as football&rsquo;s version of deep learning: repetition is training data, and the more cycles the opponent absorbs, the more rigid their response becomes. Which is why the mechanism compounds across a season, not just across ninety minutes. A league learns your Plan A− through eight months of scouting footage. That league-wide learning is the strongest lure that exists.</p>
            <p>Two disciplines keep the idea honest. First: <strong style={{ color: "var(--ink)", fontWeight: 600 }}>if Plan A− keeps working, you do not switch.</strong> A lure that scores is simply a good plan; conversion is a choice, never an obligation. Second: the switch is a judgment, not an algorithm. The trigger is a reading — how much are we dominating, how far has the opponent&rsquo;s reaction hardened — made by the coach, in the moment. My framework structures that judgment. It does not pretend to replace it.</p>
            <p>And the mechanism is recursive. Reach the high-value zone and expectation forms again: everyone in the stadium expects the shot. That expectation is a new lure. The pass played under a shot&rsquo;s expectation — Çalhanoğlu at the top of the arc choosing the key pass while every defender is set for the block — creates the cleanest chances in football. Whatever the threat level, the loop restarts: build expectation, break it.</p>
          </div>
          <div className="mt-6 mb-2">
            <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>VISUAL §3 · THE CONDITIONING SEQUENCER</p>
            <ConditioningSequencer />
          </div>
        </section>

        <section id="s4" className="scroll-mt-16 mt-11">
          <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>§4 / PHYSICS</span>
          <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>Why buffering happens: the two engines</h2>
          <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
            <p>Buffering is not magic; it has mechanics. Two engines produce it.</p>
            <p><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Timing — the WHEN.</strong> Act at the precise moment the opponent is in motion. A moving defender carries momentum, and momentum cannot be reversed instantly; acting into that movement guarantees a delay measured in fractions of a second. This is why the lure matters: a conditioned opponent moves early — and early movement is exposure.</p>
            <p><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Diagonality — the WHERE.</strong> A diagonal action asks two questions simultaneously: lateral (left or right?) and vertical (step or drop?). No defensive scheme answers both at once, because horizontal and vertical responsibilities live with different players. A diagonal at the wrong time is absorbed. A vertical ball at the right time is a duel. A diagonal at the moment of movement is a broken structure. The engines multiply; they do not add.</p>
            <p>They ignite most reliably in a zone I call the <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Pre-Half Space</strong>: the corridor in the middle third, one pass or one carry from the final third, just outside the half-space proper. It sits in defensive no-man&rsquo;s land — not clearly the full-back&rsquo;s, not clearly the midfielder&rsquo;s. Turnover risk is low, because the touchline is close. Angles into the half-space are diagonal by geometry.</p>
            <p>And it enables the movement I value most — the <strong style={{ color: "var(--ink)", fontWeight: 600 }}>second movement</strong>: release the ball into the half-space, then attack the arc immediately, while the defence&rsquo;s cover slide is still in motion. The passer attacks the reaction to his own pass. Time and space, attacked inside the same two seconds.</p>
          </div>
          <blockquote className="my-5 max-w-[640px]" style={{ fontSize: 15, lineHeight: 1.75, color: "var(--green-mid)", borderLeft: "2px solid var(--green-line)", padding: "4px 0 4px 20px", fontStyle: "italic" }}>
            A diagonal at the wrong time is absorbed. A vertical ball at the right time is a duel. A diagonal at the moment of movement is a broken structure.
          </blockquote>
          <div className="mt-6 mb-2 space-y-4">
            <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>VISUAL §4 · WHEN × WHERE MATRIX + PRE-HALF SPACE MAP</p>
            <WhenWhereMatrix />
            <PreHalfSpaceMap />
          </div>
        </section>

        <section id="s5" className="scroll-mt-16 mt-11">
          <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>§5 / STRUCTURE</span>
          <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>The structure that pays for it</h2>
          <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
            <p>Improvisation is not a plan. Variation collapses into chaos unless structure underwrites the risk.</p>
            <p>My build-up core is a hybrid. <strong style={{ color: "var(--ink)", fontWeight: 600 }}>3-2 against a high press</strong>: numerical security, double pivot, and a rest-defence already standing behind the ball. <strong style={{ color: "var(--ink)", fontWeight: 600 }}>3-1 against a mid or low block</strong>: the second pivot advances, adding a body ahead of the ball where the game is actually being decided. The switch between them is itself a mutation — same players, different geometry — and it is also a phase decision: 3-2 maximises protection against transition; 3-1 completes the counter-attacking structure, because the advanced pivot becomes the connector the instant the ball is won.</p>
            <p>I design in <strong style={{ color: "var(--ink)", fontWeight: 600 }}>four phases that exist on the pitch simultaneously</strong>: Plan A− (the conditioning attack), Plan A (the conversion), rest-defence (the shape that is already defending while we attack), and rest-attack (the runners already positioned while we defend). Each phase is the structural precondition of its neighbours. There is no Plan A worth playing if losing the ball is fatal — and no counter-attack without a structure that wins the ball back.</p>
            <p>Defensively, the philosophy is deliberately asymmetric to the attack. <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Attack manipulates expectation; defence removes options.</strong> After loss: a gegenpress window of roughly seven seconds — the physiological limit of true intensity — to win the ball back or kill the counter&rsquo;s tempo. After that, no heroics: a structural block that closes the centre and funnels the opponent into side traps. The opponent enters the trap not because they are deceived, but because the structure leaves them nothing else.</p>
            <p>This is also an economics decision. Conditioning an entire league takes eight months, and squads that press full-time are broken by March. <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Sustainability is not a constraint on the philosophy — it is a precondition of it.</strong></p>
          </div>
          <div className="mt-6 mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>VISUAL §5A · SHAPE MORPH</p>
              <ShapeMorph shapes={buildShapes} opponentNodes={opponentBlock} />
            </div>
            <div>
              <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>VISUAL §5B · FOUR-PHASE RING</p>
              <FourPhaseRing />
            </div>
          </div>
        </section>

        <section id="s6" className="scroll-mt-16 mt-11">
          <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>§6 / FALSIFICATION</span>
          <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>Measuring it — and trying to break it</h2>
          <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
            <p>A theory that cannot fail is a brand, not a tool. So the question I put to my own framework is the one I would put to any coach&rsquo;s idea: <strong style={{ color: "var(--ink)", fontWeight: 600 }}>what would the data look like if this were working — and what would it look like if I were fooling myself?</strong></p>
            <p>Possession share and raw threat totals are useless here. Spain arrived at the 2014 World Cup with the tournament&rsquo;s highest possession profile and went out in the group stage: their route to goal — flank, then centre, always in that order — had become so predictable that Van Gaal&rsquo;s 5-3-2 solved it before kick-off. Sarri&rsquo;s Juventus won Serie A while every opponent knew that erasing one node — Pjanić — switched the build-up off. Possession without unpredictability is just a slower way to lose.</p>
            <p>The fingerprint I look for instead: <strong style={{ color: "var(--ink)", fontWeight: 600 }}>pass-network dispersion</strong> — is betweenness centrality spread across the build-up core, or does one node carry the plan? <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Timing variance of high-value actions</strong> — do threat spikes arrive at irregular, unlearnable moments, or on a rhythm? <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Line-break conversion</strong> — do defensive-line breaks become final-third receptions, or die as isolated events? <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Channel and recipient entropy</strong> — can the opponent predict where, and through whom, the threat arrives?</p>
            <p>Read in reverse, even the opponent&rsquo;s pressing tells a story. When their pressure on our build-up relaxes, conditioning is underway — they have stopped treating the lure as a threat. When their pressing intensity spikes immediately after our conversion, we are watching buffering in the data.</p>
            <p>One discipline above all: <strong style={{ color: "var(--ink)", fontWeight: 600 }}>the match is the wrong unit of account.</strong> A single game in which Plan A never fires is not a refutation — it is a training batch. The season is the model. I evaluate variation at season scale, and I treat single-match nulls as data.</p>
          </div>
          <div className="mt-6 mb-2">
            <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>VISUAL §6 · KPI FINGERPRINT COMPARISON</p>
            <KpiFingerprint />
          </div>
        </section>

        <section id="s7" className="scroll-mt-16 mt-11">
          <span className="mono block mb-2" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--green-mid)" }}>§7 / APPLICATION</span>
          <h2 className="mb-4" style={{ fontSize: 19, color: "var(--ink)" }}>What this offers a club</h2>
          <div className="space-y-3.5 max-w-[680px]" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ink-2)" }}>
            <p>This framework is not a demand to rebuild a playing model. It is a lens that makes existing work sharper.</p>
            <p>In <strong style={{ color: "var(--ink)", fontWeight: 600 }}>opposition analysis</strong>: detect the opponent&rsquo;s conditioning loops — and recognise when we are the ones being lured. In <strong style={{ color: "var(--ink)", fontWeight: 600 }}>recruitment</strong>: value players whose abilities contradict their position, and players with a signature move — a deeply automated on-ball habit that survives pressure — because those are the players who turn structure into variables. In <strong style={{ color: "var(--ink)", fontWeight: 600 }}>development</strong>: train multi-positionality in the golden age, while adaptability is still trainable.</p>
            <p>And one honest limit, which I regard as a feature: the framework tells you what to watch, and when the conditions are forming. <em style={{ color: "var(--green-mid)" }}>When to switch remains a human decision.</em> My job as an analyst is to move that decision from pure intuition toward evidence — never to pretend the evidence makes the decision.</p>
            <p>The pages that follow apply this framework to real matches — including the moments where it fails, because those are the moments a theory earns its keep.</p>
          </div>

          <div className="mt-9">
            <p className="mono mb-3" style={{ fontSize: 9, letterSpacing: ".16em", color: "var(--green-mid)" }}>CONCEPT INDEX</p>
            <ConceptIndex />
          </div>
        </section>

      </div>

      {/* ── CTA BAND ───────────────────────────────────────── */}
      <Link
        href="/match-analysis"
        className="flex items-center justify-center py-8 px-6 transition-colors duration-200"
        style={{ background: "var(--green-soft)", borderTop: "0.5px solid var(--green-line)" }}
      >
        <span className="mono" style={{ fontSize: 14, color: "var(--green-mid)" }}>
          Theory is cheap. Watch it applied →
        </span>
      </Link>
    </div>
  );
}
