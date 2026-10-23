"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/useLocale";
import BilingualNote from "@/components/BilingualNote";

// Home hero — "Index" layout (2026-10-24). The choreography (3-1-4-2 vs a
// 4-4-2 mid-block → mutation → variable → penetration) is unchanged; the
// drawing follows the site's pitch language (light pitch, five lanes,
// charcoal = us, hollow grey = opponent, signal red = the run / the gap).
const HERO_COPY = {
  eyebrow: { en: "Jin’s football philosophy", ko: "Jin의 축구 철학" },
  titleAccent: { en: "Variation", ko: "변이 이론," },
  titleRest: { en: "Theory", ko: "Variation Theory" },
  line1: { en: "System adapts.", ko: "시스템을 깨뜨릴 철학," },
  line2: { en: "Variation breaks it.", ko: "변수와 변이" },
} as const;

type Pt = { x: number; y: number };
const le = (a: number, b: number, t: number) => a + (b - a) * t;
const lp = (a: Pt, b: Pt, t: number): Pt => ({ x: le(a.x, b.x, t), y: le(a.y, b.y, t) });
const dr = (p: Pt, amp: number, f: number, s: number): Pt => ({
  x: p.x + Math.sin(f * 0.016 + s * 2.1) * amp,
  y: p.y + Math.cos(f * 0.013 + s * 1.8) * amp,
});
const cl = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));
const P = (a: [number, number][]): Pt[] => a.map(([x, y]) => ({ x, y }));

// ── OUR TEAM 3-1-4-2 — idx: 0=GK 1-3=3CB 4=DM 5-8=4MF 9=ST1(mutation) 10=ST2(penetration)
const BASE = P([[88,207],[172,140],[172,207],[172,274],[248,207],[328,114],[328,170],[328,244],[328,300],[404,164],[404,250]]);
const ADV  = P([[88,207],[208,140],[208,207],[208,274],[284,207],[358,112],[358,168],[358,246],[358,298],[438,161],[438,253]]);
const MUT  = P([[88,207],[208,140],[208,207],[208,274],[284,207],[358,112],[358,168],[358,246],[358,298],[390,210],[438,253]]);
const PEN  = P([[88,207],[208,140],[208,207],[208,274],[284,207],[358,112],[358,168],[358,246],[358,298],[390,210],[514,207]]);
// ── OPPONENT 4-4-2 MID-BLOCK
const OPPB = P([[576,207],[492,112],[492,170],[492,244],[492,290],[448,109],[448,170],[448,244],[448,290],[402,166],[402,248]]);
const OPPM = P([[576,207],[492,112],[462,198],[498,252],[492,290],[448,109],[452,182],[448,244],[448,290],[402,166],[402,248]]);
const OPPP = P([[576,207],[492,112],[462,198],[500,244],[492,290],[448,109],[456,192],[450,250],[448,290],[402,166],[402,248]]);
const GAP = { cx: 478, cy: 222, rx: 46, ry: 30, angle: -0.18 };

const PHASES = [
  { id: "SETUP",     dur: 58,  xt: 0.06, ourP: BASE, oppP: OPPB },
  { id: "ADVANCE",   dur: 88,  xt: 0.10, ourP: ADV,  oppP: OPPB },
  { id: "MUTATION",  dur: 165, xt: 0.15, ourP: MUT,  oppP: OPPM },
  { id: "VARIABLE",  dur: 178, xt: 0.16, ourP: MUT,  oppP: OPPM },
  { id: "PENETRATE", dur: 108, xt: 0.82, ourP: PEN,  oppP: OPPP },
  { id: "RESET",     dur: 65,  xt: 0.06, ourP: BASE, oppP: OPPB },
] as const;

const LABELS: Record<string, string> = {
  SETUP: "3-1-4-2 vs 4-4-2", ADVANCE: "ADVANCING", MUTATION: "MUTATION",
  VARIABLE: "VARIABLE", PENETRATE: "VARIABLE — C", RESET: "RESET",
};
// One caption per phase — the same statements the old in-canvas pills made.
const CAPTIONS: Record<string, { en: string; ko: string }> = {
  SETUP:     { en: "3-1-4-2 against a 4-4-2 mid-block — the opponent’s block is set", ko: "3-1-4-2 대 4-4-2 미드블록 — 상대 블록은 짜여 있다" },
  ADVANCE:   { en: "Advance up to the block", ko: "블록 앞까지 전진한다" },
  MUTATION:  { en: "Mutation — the ST drops into the pocket between the lines; the CB follows and steps out of line", ko: "변이 — ST가 라인 사이 포켓으로 내려가고, CB가 따라 나오며 라인을 이탈한다" },
  VARIABLE:  { en: "Variable — three options from the pocket. C targets the gap the CB left", ko: "변수 — 포켓에서 세 가지 선택지. C는 CB가 비운 틈을 노린다" },
  PENETRATE: { en: "The second ST runs into the gap the dragged CB opened · xT spikes", ko: "CB가 끌려 나온 틈으로 두 번째 ST가 침투한다 · xT 급상승" },
  RESET:     { en: "Reset — once the opponent reorganises, start again", ko: "리셋 — 상대가 다시 정비하면 처음부터" },
};

const W = 680, H = 415;
const CHAR = "#171512", INK = "20,24,26", OPP = "#5f6f7e", VOID = "#d2462b", VOIDR = "210,70,43";
const FM = '"JetBrains Mono", ui-monospace, monospace';

function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath();
  c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.arcTo(x + w, y, x + w, y + r, r);
  c.lineTo(x + w, y + h - r); c.arcTo(x + w, y + h, x + w - r, y + h, r);
  c.lineTo(x + r, y + h); c.arcTo(x, y + h, x, y + h - r, r);
  c.lineTo(x, y + r); c.arcTo(x, y, x + r, y, r); c.closePath();
}

export default function Hero() {
  const locale = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudLblRef = useRef<HTMLSpanElement>(null);
  const hudFillRef = useRef<HTMLElement>(null);
  const hudValRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ph = 0, tk = 0, fr = 0, gA = 0, cXt = 0.06, raf = 0, lastPh = -1;
    const ourN = BASE.map(p => ({ ...p }));
    const oppN = OPPB.map(p => ({ ...p }));

    // Backing store = on-screen size × DPR; draw code keeps the 680×415 space.
    function configure() {
      const r = canvas!.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const d = window.devicePixelRatio || 1;
      canvas!.width = Math.round(r.width * d);
      canvas!.height = Math.round(r.height * d);
      ctx!.setTransform((r.width * d) / W, 0, 0, (r.height * d) / H, 0, 0);
    }

    function pitch() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = "#f2f5f3"; ctx!.fillRect(0, 0, W, H);
      const m = 12;
      ctx!.strokeStyle = `rgba(${INK},.20)`; ctx!.lineWidth = 1;
      ctx!.strokeRect(m, m, W - m * 2, H - m * 2);
      // five lanes — wide · half-space · centre
      ctx!.save(); ctx!.setLineDash([2, 4]); ctx!.strokeStyle = `rgba(${INK},.18)`; ctx!.lineWidth = 0.8;
      [108, 155, 260, 307].forEach(y => { ctx!.beginPath(); ctx!.moveTo(m, y); ctx!.lineTo(W - m, y); ctx!.stroke(); });
      ctx!.restore();
      ctx!.font = `500 7px ${FM}`; ctx!.fillStyle = `rgba(${INK},.32)`; ctx!.textAlign = "left";
      ([["W", 60], ["HS", 133], ["C", 209], ["HS", 285], ["W", 360]] as [string, number][]).forEach(([s, y]) => ctx!.fillText(s, m + 6, y));
      ctx!.strokeStyle = `rgba(${INK},.22)`; ctx!.lineWidth = 1;
      ctx!.beginPath(); ctx!.moveTo(340, m); ctx!.lineTo(340, H - m); ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(340, H / 2, 50, 0, Math.PI * 2); ctx!.stroke();
      ctx!.fillStyle = `rgba(${INK},.25)`;
      ctx!.beginPath(); ctx!.arc(340, H / 2, 2.2, 0, Math.PI * 2); ctx!.fill();
      ctx!.strokeRect(60, 108, 116, H - 216); ctx!.strokeRect(504, 108, 116, H - 216);
      ctx!.strokeRect(60, 155, 46, H - 310); ctx!.strokeRect(574, 155, 46, H - 310);
      ctx!.beginPath(); ctx!.arc(126, H / 2, 2.2, 0, Math.PI * 2); ctx!.fill();
      ctx!.beginPath(); ctx!.arc(554, H / 2, 2.2, 0, Math.PI * 2); ctx!.fill();
    }

    function node(x: number, y: number, us: boolean, r: number, ring: number) {
      ctx!.beginPath(); ctx!.arc(x, y, r, 0, Math.PI * 2);
      if (us) { ctx!.fillStyle = CHAR; ctx!.fill(); }
      else { ctx!.fillStyle = "#fff"; ctx!.fill(); ctx!.strokeStyle = OPP; ctx!.lineWidth = 1.7; ctx!.stroke(); }
      if (ring > 0.01) {
        const p = 0.55 + 0.45 * Math.abs(Math.sin(fr * 0.13));
        ctx!.beginPath(); ctx!.arc(x, y, r + 7 + p * 4, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${INK},${ring * 0.7 * p})`; ctx!.lineWidth = 1.1; ctx!.stroke();
        ctx!.save(); ctx!.globalAlpha = ring * 0.4; ctx!.strokeStyle = CHAR; ctx!.lineWidth = 0.6; ctx!.setLineDash([2, 3]);
        ([[x - r - 10, y, x - r - 2, y], [x + r + 2, y, x + r + 10, y], [x, y - r - 10, x, y - r - 2], [x, y + r + 2, x, y + r + 10]] as [number, number, number, number][])
          .forEach(([a, b, c, d]) => { ctx!.beginPath(); ctx!.moveTo(a, b); ctx!.lineTo(c, d); ctx!.stroke(); });
        ctx!.restore();
      }
    }

    function tag(x: number, y: number, t: string, a: number) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a; ctx!.font = `600 8px ${FM}`;
      const pw = ctx!.measureText(t).width + 14, h = 15, px = x - pw / 2, py = y - 28;
      ctx!.fillStyle = CHAR; rr(ctx!, px, py, pw, h, 3); ctx!.fill();
      ctx!.fillStyle = "#fff"; ctx!.textAlign = "center"; ctx!.fillText(t, x, py + h - 4.5); ctx!.restore();
    }

    function dashed(fx: number, fy: number, tx: number, ty: number, l: string, a: number, col: string) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a; ctx!.strokeStyle = col; ctx!.lineWidth = 1.1; ctx!.setLineDash([4, 4]);
      ctx!.beginPath(); ctx!.moveTo(fx, fy); ctx!.lineTo(tx, ty); ctx!.stroke(); ctx!.setLineDash([]);
      const g = Math.atan2(ty - fy, tx - fx);
      ctx!.fillStyle = col; ctx!.beginPath(); ctx!.moveTo(tx, ty);
      ctx!.lineTo(tx - Math.cos(g - 0.4) * 9, ty - Math.sin(g - 0.4) * 9);
      ctx!.lineTo(tx - Math.cos(g + 0.4) * 9, ty - Math.sin(g + 0.4) * 9); ctx!.closePath(); ctx!.fill();
      ctx!.font = `600 9px ${FM}`; ctx!.fillText(l, tx + 6, ty + 4); ctx!.restore();
    }

    function solid(fx: number, fy: number, tx: number, ty: number, a: number) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a; ctx!.strokeStyle = VOID; ctx!.lineWidth = 2;
      ctx!.beginPath(); ctx!.moveTo(fx, fy); ctx!.lineTo(tx, ty); ctx!.stroke();
      const g = Math.atan2(ty - fy, tx - fx); ctx!.fillStyle = VOID;
      ctx!.beginPath(); ctx!.moveTo(tx, ty);
      ctx!.lineTo(tx - Math.cos(g - 0.38) * 12, ty - Math.sin(g - 0.38) * 12);
      ctx!.lineTo(tx - Math.cos(g + 0.38) * 12, ty - Math.sin(g + 0.38) * 12); ctx!.closePath(); ctx!.fill(); ctx!.restore();
    }

    function trail(a: number) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a * 0.5; ctx!.strokeStyle = CHAR; ctx!.lineWidth = 0.9; ctx!.setLineDash([3, 5]);
      ctx!.beginPath(); ctx!.moveTo(438, 161); ctx!.lineTo(390, 210); ctx!.stroke(); ctx!.restore();
    }

    function gap(a: number) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a; ctx!.fillStyle = `rgba(${VOIDR},.10)`;
      ctx!.beginPath(); ctx!.ellipse(GAP.cx, GAP.cy, GAP.rx, GAP.ry, GAP.angle, 0, Math.PI * 2); ctx!.fill();
      ctx!.strokeStyle = VOID; ctx!.lineWidth = 1; ctx!.setLineDash([3, 3]); ctx!.stroke(); ctx!.setLineDash([]);
      ctx!.fillStyle = VOID; ctx!.font = `600 7.5px ${FM}`; ctx!.textAlign = "center";
      ctx!.fillText("GAP", GAP.cx, GAP.cy + 3); ctx!.restore();
    }

    function flab(x: number, y: number, t: string, a: number, col: string) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a; ctx!.font = `500 8px ${FM}`; ctx!.fillStyle = col; ctx!.textAlign = "center";
      ctx!.fillText(t, x, y); ctx!.restore();
    }

    function frame() {
      fr++; tk++;
      let p = PHASES[ph];
      if (tk >= p.dur) { tk = 0; ph = (ph + 1) % PHASES.length; p = PHASES[ph]; }
      gA = cl(fr / 32, 0, 1);
      const spd = p.id === "ADVANCE" ? 0.022 : p.id === "MUTATION" && tk < 80 ? 0.038 : 0.055;
      p.ourP.forEach((t, i) => { ourN[i] = lp(ourN[i], dr(t, 1.0, fr, i), spd); });
      p.oppP.forEach((t, i) => { oppN[i] = lp(oppN[i], dr(t, 0.65, fr, i + 20), 0.028); });
      cXt = le(cXt, p.xt, p.id === "PENETRATE" && tk > 18 ? 0.075 : 0.03);

      pitch();
      ctx!.save(); ctx!.globalAlpha = gA;
      if (p.id === "MUTATION" || p.id === "VARIABLE" || p.id === "PENETRATE") trail(p.id === "MUTATION" ? cl((tk - 30) / 36, 0, 1) : 1);
      if (p.id === "PENETRATE") gap(cl(tk / 26, 0, 1));
      if (p.id === "VARIABLE") gap(cl((tk - 95) / 38, 0, 1) * 0.45);
      if (p.id === "SETUP" || p.id === "ADVANCE") {
        const la = p.id === "SETUP" ? cl(tk / 22, 0, 1) : cl(1 - (tk / p.dur) * 0.85, 0, 1);
        flab(280, 34, "3-1-4-2", la, `rgba(${INK},.62)`);
        flab(480, 34, "4-4-2", la, OPP);
        flab(490, 46, "MID-BLOCK", la, "rgba(95,111,126,.7)");
      }
      oppN.forEach((n, i) => node(n.x, n.y, false, i === 0 ? 10 : 7.5, 0));
      if (p.id === "PENETRATE") solid(438, 253, 514, 207, cl(tk / 20, 0, 1));
      ourN.forEach((n, i) => {
        const hl = (p.id === "VARIABLE" && i === 9) ? cl((tk - 10) / 26, 0, 1)
          : (p.id === "MUTATION" && tk < 100 && i === 9) ? cl(tk / 26, 0, 1) : 0;
        node(n.x, n.y, true, i === 0 ? 10 : 7.5, hl);
      });
      if (p.id === "MUTATION") tag(ourN[9].x, ourN[9].y, "MUTATION", cl((tk - 38) / 24, 0, 1));
      if (p.id === "VARIABLE") tag(ourN[9].x, ourN[9].y, "VARIABLE", cl((tk - 6) / 20, 0, 1));

      let bx = 0, by = 0, ba = 0;
      if (p.id === "VARIABLE") { bx = ourN[9].x + 9; by = ourN[9].y - 5; ba = cl((tk - 16) / 22, 0, 1); }
      else if (p.id === "PENETRATE") { const bp = cl(tk / 62, 0, 1); bx = le(390, 514, bp); by = le(210, 207, bp); ba = tk < 70 ? 1 : cl(1 - (tk - 70) / 22, 0, 1); }
      if (ba > 0.01) {
        ctx!.globalAlpha = gA * ba;
        ctx!.beginPath(); ctx!.arc(bx, by, 3.6, 0, Math.PI * 2); ctx!.fillStyle = "#fff"; ctx!.fill();
        ctx!.strokeStyle = CHAR; ctx!.lineWidth = 1.3; ctx!.stroke(); ctx!.globalAlpha = gA;
      }
      if (p.id === "VARIABLE") {
        const st = ourN[9], dm = ourN[4];
        dashed(st.x, st.y, dm.x + 8, dm.y, "A", cl((tk - 30) / 20, 0, 1), `rgba(${INK},.42)`);
        dashed(st.x, st.y, st.x + 44, st.y - 24, "B", cl((tk - 54) / 20, 0, 1), `rgba(${INK},.42)`);
        dashed(st.x, st.y, ourN[10].x + 4, ourN[10].y - 16, "C", cl((tk - 78) / 20, 0, 1), VOID);
      }
      ctx!.restore();

      const hi = p.id === "PENETRATE" && cXt > 0.4;
      if (hudLblRef.current) { hudLblRef.current.textContent = LABELS[p.id]; hudLblRef.current.style.color = hi ? VOID : ""; }
      if (hudFillRef.current) { hudFillRef.current.style.width = (cXt * 100).toFixed(0) + "%"; hudFillRef.current.style.background = hi ? VOID : ""; }
      if (hudValRef.current) { hudValRef.current.textContent = cXt > 0.065 ? "xT " + cXt.toFixed(2) : "xT —"; hudValRef.current.style.color = hi ? VOID : ""; }
      if (ph !== lastPh) { lastPh = ph; setPhase(ph); }
    }

    function loop() { frame(); raf = requestAnimationFrame(loop); }
    configure();
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(() => configure()); ro.observe(canvas); }
    if (reduce) {
      // reduced motion: show the decisive moment (the gap and the run) as a still
      ph = 4; tk = 60; fr = 200;
      for (let i = 0; i < 120; i++) { PHASES[4].ourP.forEach((t, k) => { ourN[k] = lp(ourN[k], t, 0.2); }); PHASES[4].oppP.forEach((t, k) => { oppN[k] = lp(oppN[k], t, 0.2); }); }
      frame();
    } else {
      loop();
    }
    return () => { cancelAnimationFrame(raf); ro?.disconnect(); };
  }, []);

  const pid = PHASES[phase].id;
  return (
    <section className="hc-hero">
      <div className="hc-in">
        <div className="hc-head">
          <div style={{ minWidth: 0 }}>
            <div className="hc-kicker">{HERO_COPY.eyebrow[locale]}</div>
            <h1 className="hc-title">
              {HERO_COPY.titleAccent[locale]}<br />
              <span>{HERO_COPY.titleRest[locale]}</span>
            </h1>
          </div>
          <div className="hc-side">
            <p className="hc-thesis">{HERO_COPY.line1[locale]} <b>{HERO_COPY.line2[locale]}</b></p>
            <BilingualNote />
          </div>
        </div>

        <div className="hc-board">
          <div className="hc-steps" aria-hidden="true">
            {PHASES.map((p) => <span key={p.id} className={p.id === pid ? "on" : ""}>{p.id}</span>)}
          </div>
          <div className="hc-stage">
            <canvas ref={canvasRef} width={680} height={415} role="img"
              aria-label={locale === "ko" ? "변이 이론 애니메이션: 3-1-4-2 대 4-4-2 미드블록, ST의 변이와 침투" : "Variation Theory animation: 3-1-4-2 vs a 4-4-2 mid-block, the striker’s mutation and the run into the gap"} />
          </div>
          <div className="hc-hud">
            <span ref={hudLblRef} className="ph">3-1-4-2 vs 4-4-2</span>
            <span className="bar"><i ref={hudFillRef} /></span>
            <span ref={hudValRef} className="xt">xT —</span>
          </div>
          <div className="hc-cap" aria-live="polite">
            <span className="n">{String(phase + 1).padStart(2, "0")}/06</span>{CAPTIONS[pid][locale]}
          </div>
        </div>
      </div>
    </section>
  );
}
