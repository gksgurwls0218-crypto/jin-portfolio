"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

type Pt = { x: number; y: number };
const le = (a: number, b: number, t: number) => a + (b - a) * t;
const lp = (a: Pt, b: Pt, t: number): Pt => ({ x: le(a.x, b.x, t), y: le(a.y, b.y, t) });
const dr = (p: Pt, amp: number, f: number, s: number): Pt => ({
  x: p.x + Math.sin(f * 0.016 + s * 2.1) * amp,
  y: p.y + Math.cos(f * 0.013 + s * 1.8) * amp,
});
const cl = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));

// ── OUR TEAM 3-1-4-2 ─────────────────────────────────────────────
// idx: 0=GK  1-3=3CB  4=DM  5-8=4MF  9=ST1(mutation)  10=ST2(penetration)
const BASE: Pt[] = [
  { x: 88,  y: 207 }, { x: 172, y: 140 }, { x: 172, y: 207 }, { x: 172, y: 274 },
  { x: 248, y: 207 },
  { x: 328, y: 114 }, { x: 328, y: 170 }, { x: 328, y: 244 }, { x: 328, y: 300 },
  { x: 404, y: 164 }, { x: 404, y: 250 },
];
const ADV: Pt[] = [  // pushed into opponent's mid-block zone
  { x: 88,  y: 207 }, { x: 208, y: 140 }, { x: 208, y: 207 }, { x: 208, y: 274 },
  { x: 284, y: 207 },
  { x: 358, y: 112 }, { x: 358, y: 168 }, { x: 358, y: 246 }, { x: 358, y: 298 },
  { x: 438, y: 161 }, { x: 438, y: 253 },
];
const MUT: Pt[] = [  // ST1 drops into pocket between opp FW and MF lines
  { x: 88,  y: 207 }, { x: 208, y: 140 }, { x: 208, y: 207 }, { x: 208, y: 274 },
  { x: 284, y: 207 },
  { x: 358, y: 112 }, { x: 358, y: 168 }, { x: 358, y: 246 }, { x: 358, y: 298 },
  { x: 390, y: 210 }, // ST1 drops into pocket ←
  { x: 438, y: 253 },
];
const PEN: Pt[] = [  // ST2 runs into gap CB1 vacated
  { x: 88,  y: 207 }, { x: 208, y: 140 }, { x: 208, y: 207 }, { x: 208, y: 274 },
  { x: 284, y: 207 },
  { x: 358, y: 112 }, { x: 358, y: 168 }, { x: 358, y: 246 }, { x: 358, y: 298 },
  { x: 390, y: 210 },
  { x: 514, y: 207 }, // ST2 penetrates into gap ←
];

// ── OPPONENT 4-4-2 MID-BLOCK ─────────────────────────────────────
// High compact block: FWs at x≈402 press our CMs, MF line x≈448, DEF line x≈492
// idx: 0=GK  1=RB  2=CB1  3=CB2  4=LB  5=RM  6=CM1  7=CM2  8=LM  9=FW1  10=FW2
const OPPB: Pt[] = [
  { x: 576, y: 207 },
  { x: 492, y: 112 }, { x: 492, y: 170 }, { x: 492, y: 244 }, { x: 492, y: 290 }, // DEF
  { x: 448, y: 109 }, { x: 448, y: 170 }, { x: 448, y: 244 }, { x: 448, y: 290 }, // MF
  { x: 402, y: 166 }, { x: 402, y: 248 }, // FWs pressing our CMs
];
const OPPM: Pt[] = [  // CB1 steps out big tracking ST1 who dropped → gap opens
  { x: 576, y: 207 },
  { x: 492, y: 112 },
  { x: 462, y: 198 }, // CB1 steps out FAR — tracking ST1 at (390,210)
  { x: 498, y: 252 }, // CB2 slides to compensate — gap opens between them
  { x: 492, y: 290 },
  { x: 448, y: 109 }, { x: 452, y: 182 }, { x: 448, y: 244 }, { x: 448, y: 290 }, // CM1 also steps
  { x: 402, y: 166 }, { x: 402, y: 248 },
];
const OPPP: Pt[] = [  // CB1 fully committed & out of position, gap exposed
  { x: 576, y: 207 },
  { x: 492, y: 112 },
  { x: 462, y: 198 }, // CB1 cannot recover
  { x: 500, y: 244 }, // CB2 overcorrects
  { x: 492, y: 290 },
  { x: 448, y: 109 }, { x: 456, y: 192 }, { x: 450, y: 250 }, { x: 448, y: 290 },
  { x: 402, y: 166 }, { x: 402, y: 248 },
];

// Gap zone between CB1(462,198) and CB2(498,252)
const GAP = { cx: 478, cy: 222, rx: 46, ry: 30, angle: -0.18 };

const PHASES = [
  { id: "SETUP",    dur: 58,  xt: 0.06, ourP: BASE, oppP: OPPB },
  { id: "ADVANCE",  dur: 88,  xt: 0.10, ourP: ADV,  oppP: OPPB },
  { id: "MUTATION", dur: 165, xt: 0.15, ourP: MUT,  oppP: OPPM },
  { id: "VARIABLE", dur: 178, xt: 0.16, ourP: MUT,  oppP: OPPM },
  { id: "PENETRATE",dur: 108, xt: 0.82, ourP: PEN,  oppP: OPPP },
  { id: "RESET",    dur: 65,  xt: 0.06, ourP: BASE, oppP: OPPB },
];

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r); ctx.closePath();
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudLblRef = useRef<HTMLDivElement>(null);
  const hudFillRef = useRef<HTMLDivElement>(null);
  const hudValRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 680, H = 415;
    let ph = 0, tk = 0, fr = 0;
    const ourN = BASE.map(p => ({ ...p }));
    const oppN = OPPB.map(p => ({ ...p }));
    let gA = 0, cXt = 0.06;
    let ballX = 0, ballY = 0, ballA = 0;
    let raf: number;

    function drawPitch() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = "#060e08"; ctx!.fillRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) { ctx!.fillStyle = "rgba(11,22,9,.36)"; ctx!.fillRect(66 + i * 104, 16, 52, H - 32); }
      ctx!.strokeStyle = "rgba(255,255,255,.042)"; ctx!.lineWidth = 0.5; ctx!.setLineDash([]);
      for (let x = 60; x <= 620; x += 70) { ctx!.beginPath(); ctx!.moveTo(x, 16); ctx!.lineTo(x, H - 16); ctx!.stroke(); }
      for (let y = 18; y <= H - 18; y += 65) { ctx!.beginPath(); ctx!.moveTo(60, y); ctx!.lineTo(620, y); ctx!.stroke(); }
      ctx!.strokeStyle = "rgba(72,132,58,.55)"; ctx!.lineWidth = 1;
      ctx!.strokeRect(60, 16, 560, H - 32);
      ctx!.beginPath(); ctx!.moveTo(340, 16); ctx!.lineTo(340, H - 16); ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(340, H / 2, 50, 0, Math.PI * 2); ctx!.stroke();
      ctx!.beginPath(); ctx!.arc(340, H / 2, 2.5, 0, Math.PI * 2); ctx!.fillStyle = "rgba(72,132,58,.55)"; ctx!.fill();
      ctx!.strokeRect(60, 108, 116, H - 216); ctx!.strokeRect(504, 108, 116, H - 216);
      ctx!.strokeRect(60, 155, 46, H - 310); ctx!.strokeRect(574, 155, 46, H - 310);
      ctx!.lineWidth = 0.8;
      ctx!.beginPath(); ctx!.arc(126, H / 2, 2.5, 0, Math.PI * 2); ctx!.fill();
      ctx!.beginPath(); ctx!.arc(554, H / 2, 2.5, 0, Math.PI * 2); ctx!.fill();
      ctx!.font = "7px monospace"; ctx!.fillStyle = "rgba(255,255,255,.1)";
      ctx!.textAlign = "left"; ctx!.fillText("A1", 64, 26); ctx!.fillText("A8", 64, H - 16);
    }

    function drawNode(x: number, y: number, isOur: boolean, r: number, ringA: number) {
      const c = isOur
        ? { fi: "rgba(34,86,28,.86)", st: "rgba(86,196,70,.7)", gl: "rgba(60,185,50,.2)" }
        : { fi: "rgba(108,30,30,.9)", st: "rgba(218,75,62,.8)", gl: "rgba(205,60,50,.16)" };
      ctx!.beginPath(); ctx!.arc(x, y, r + 6, 0, Math.PI * 2); ctx!.fillStyle = c.gl; ctx!.fill();
      ctx!.beginPath(); ctx!.arc(x, y, r, 0, Math.PI * 2); ctx!.fillStyle = c.fi; ctx!.fill();
      ctx!.beginPath(); ctx!.arc(x - r * 0.24, y - r * 0.26, r * 0.36, 0, Math.PI * 2); ctx!.fillStyle = "rgba(255,255,255,.14)"; ctx!.fill();
      ctx!.beginPath(); ctx!.arc(x, y, r, 0, Math.PI * 2); ctx!.strokeStyle = c.st; ctx!.lineWidth = 0.95; ctx!.stroke();
      if (ringA > 0.01) {
        const p = 0.55 + 0.45 * Math.abs(Math.sin(fr * 0.13));
        ctx!.beginPath(); ctx!.arc(x, y, r + 7 + p * 4, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(127,255,106,${ringA * 0.65 * p})`; ctx!.lineWidth = 1.1; ctx!.stroke();
        ctx!.save(); ctx!.globalAlpha = ringA * 0.35; ctx!.strokeStyle = "rgba(127,255,106,1)"; ctx!.lineWidth = 0.5; ctx!.setLineDash([2, 3]);
        ([[x - r - 10, y, x - r - 2, y], [x + r + 2, y, x + r + 10, y], [x, y - r - 10, x, y - r - 2], [x, y + r + 2, x, y + r + 10]] as [number,number,number,number][])
          .forEach(([x1, y1, x2, y2]) => { ctx!.beginPath(); ctx!.moveTo(x1, y1); ctx!.lineTo(x2, y2); ctx!.stroke(); });
        ctx!.setLineDash([]); ctx!.restore();
      }
    }

    function playerTag(x: number, y: number, txt: string, a: number, col: string) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a;
      ctx!.font = "bold 8px monospace";
      const tw = ctx!.measureText(txt).width, pw = tw + 14, ph2 = 14, px = x - pw / 2, py = y - 26;
      ctx!.fillStyle = "rgba(4,12,6,.92)"; rr(ctx!, px, py, pw, ph2, 4); ctx!.fill();
      ctx!.strokeStyle = col; ctx!.lineWidth = 0.6; rr(ctx!, px, py, pw, ph2, 4); ctx!.stroke();
      ctx!.fillStyle = col; ctx!.textAlign = "center"; ctx!.fillText(txt, x, py + ph2 - 3.5);
      ctx!.textAlign = "left"; ctx!.restore();
    }

    function dashedArr(fx: number, fy: number, tx: number, ty: number, lbl: string, a: number, col: string) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a;
      ctx!.strokeStyle = col; ctx!.lineWidth = 1; ctx!.setLineDash([4, 4]);
      ctx!.beginPath(); ctx!.moveTo(fx, fy); ctx!.lineTo(tx, ty); ctx!.stroke(); ctx!.setLineDash([]);
      const ang = Math.atan2(ty - fy, tx - fx);
      ctx!.fillStyle = col; ctx!.beginPath(); ctx!.moveTo(tx, ty);
      ctx!.lineTo(tx - Math.cos(ang - 0.4) * 10, ty - Math.sin(ang - 0.4) * 10);
      ctx!.lineTo(tx - Math.cos(ang + 0.4) * 10, ty - Math.sin(ang + 0.4) * 10);
      ctx!.closePath(); ctx!.fill();
      ctx!.font = "bold 9px monospace"; ctx!.fillStyle = col; ctx!.fillText(lbl, tx + 6, ty + 4);
      ctx!.restore();
    }

    function solidArr(fx: number, fy: number, tx: number, ty: number, a: number, col: string) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a;
      ctx!.strokeStyle = col; ctx!.lineWidth = 2; ctx!.setLineDash([]);
      ctx!.beginPath(); ctx!.moveTo(fx, fy); ctx!.lineTo(tx, ty); ctx!.stroke();
      const ang = Math.atan2(ty - fy, tx - fx);
      ctx!.fillStyle = col; ctx!.beginPath(); ctx!.moveTo(tx, ty);
      ctx!.lineTo(tx - Math.cos(ang - 0.38) * 13, ty - Math.sin(ang - 0.38) * 13);
      ctx!.lineTo(tx - Math.cos(ang + 0.38) * 13, ty - Math.sin(ang + 0.38) * 13);
      ctx!.closePath(); ctx!.fill(); ctx!.restore();
    }

    function mutTrail(a: number) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a * 0.45;
      ctx!.strokeStyle = "rgba(127,255,106,.8)"; ctx!.lineWidth = 0.9; ctx!.setLineDash([3, 5]);
      ctx!.beginPath(); ctx!.moveTo(438, 161); ctx!.lineTo(390, 210); ctx!.stroke();
      ctx!.setLineDash([]); ctx!.restore();
    }

    function gapZone(a: number) {
      if (a < 0.01) return;
      ctx!.save();
      ctx!.globalAlpha = a * 0.1; ctx!.fillStyle = "#7fff6a";
      ctx!.beginPath(); ctx!.ellipse(GAP.cx, GAP.cy, GAP.rx, GAP.ry, GAP.angle, 0, Math.PI * 2); ctx!.fill();
      ctx!.globalAlpha = a * 0.48; ctx!.strokeStyle = "rgba(127,255,106,.6)"; ctx!.lineWidth = 0.9; ctx!.setLineDash([3, 4]);
      ctx!.beginPath(); ctx!.ellipse(GAP.cx, GAP.cy, GAP.rx, GAP.ry, GAP.angle, 0, Math.PI * 2); ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.globalAlpha = a * 0.75; ctx!.fillStyle = "rgba(127,255,106,.82)";
      ctx!.font = "7px monospace"; ctx!.textAlign = "center"; ctx!.fillText("GAP", GAP.cx, GAP.cy + 3);
      ctx!.textAlign = "left"; ctx!.restore();
    }

    function conceptPill(l1: string, l2: string, a: number) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a;
      const cx = 340, cy = H - 64, pw = 248, ph2 = 38;
      ctx!.fillStyle = "rgba(8,18,10,.82)"; rr(ctx!, cx - pw / 2, cy - ph2 / 2, pw, ph2, 8); ctx!.fill();
      ctx!.strokeStyle = "rgba(90,160,80,.3)"; ctx!.lineWidth = 0.6; rr(ctx!, cx - pw / 2, cy - ph2 / 2, pw, ph2, 8); ctx!.stroke();
      ctx!.textAlign = "center";
      ctx!.font = "10px monospace"; ctx!.fillStyle = "rgba(127,255,106,.92)"; ctx!.fillText(l1, cx, cy - 4);
      ctx!.font = "9px monospace"; ctx!.fillStyle = "rgba(160,210,155,.75)"; ctx!.fillText(l2, cx, cy + 12);
      ctx!.textAlign = "left"; ctx!.restore();
    }

    function formLabel(x: number, y: number, txt: string, a: number, col: string) {
      if (a < 0.01) return;
      ctx!.save(); ctx!.globalAlpha = a;
      ctx!.font = "8px monospace"; ctx!.fillStyle = col; ctx!.textAlign = "center"; ctx!.fillText(txt, x, y);
      ctx!.textAlign = "left"; ctx!.restore();
    }

    function loop() {
      fr++; tk++;
      const p = PHASES[ph];
      if (tk >= p.dur) { tk = 0; ph = (ph + 1) % PHASES.length; }
      const pr = tk / p.dur;
      gA = cl(fr / 32, 0, 1);

      const spd = p.id === "ADVANCE" ? 0.022 : p.id === "MUTATION" && tk < 80 ? 0.038 : 0.055;
      p.ourP.forEach((t, i) => { ourN[i] = lp(ourN[i], dr(t, 1.0, fr, i), spd); });
      p.oppP.forEach((t, i) => { oppN[i] = lp(oppN[i], dr(t, 0.65, fr, i + 20), 0.028); });

      const xtS = p.id === "PENETRATE" && tk > 18 ? 0.075 : 0.03;
      cXt = le(cXt, p.xt, xtS);

      drawPitch();
      ctx!.save(); ctx!.globalAlpha = gA;

      if (p.id === "MUTATION" || p.id === "VARIABLE" || p.id === "PENETRATE") {
        const ta = p.id === "MUTATION" ? cl((tk - 30) / 36, 0, 1) : 1;
        mutTrail(ta);
      }
      if (p.id === "PENETRATE") gapZone(cl(tk / 26, 0, 1));
      if (p.id === "VARIABLE")  gapZone(cl((tk - 95) / 38, 0, 1) * 0.45);

      // Formation labels on SETUP + ADVANCE
      if (p.id === "SETUP" || p.id === "ADVANCE") {
        const la = p.id === "SETUP" ? cl(tk / 22, 0, 1) : cl(1 - (tk / p.dur * 0.85), 0, 1);
        formLabel(280, 34, "3-1-4-2", la, "rgba(86,196,70,.62)");
        formLabel(480, 34, "4-4-2", la, "rgba(218,75,62,.62)");
        formLabel(490, 46, "MID-BLOCK", la, "rgba(218,75,62,.42)");
      }

      oppN.forEach((n, i) => drawNode(n.x, n.y, false, i === 0 ? 11 : 8, 0));

      if (p.id === "PENETRATE") {
        solidArr(438, 253, 514, 207, cl(tk / 20, 0, 1), "rgba(127,255,106,.88)");
      }

      ourN.forEach((n, i) => {
        const hl = (p.id === "VARIABLE" && i === 9) ? cl((tk - 10) / 26, 0, 1)
          : (p.id === "MUTATION" && tk < 100 && i === 9) ? cl(tk / 26, 0, 1) : 0;
        drawNode(n.x, n.y, true, i === 0 ? 11 : 8, hl);
      });

      if (p.id === "MUTATION") playerTag(ourN[9].x, ourN[9].y, "MUTATION", cl((tk - 38) / 24, 0, 1), "rgba(127,255,106,.92)");
      if (p.id === "VARIABLE") playerTag(ourN[9].x, ourN[9].y, "VARIABLE", cl((tk - 6) / 20, 0, 1), "rgba(127,255,106,.92)");

      if (p.id === "VARIABLE") {
        ballX = ourN[9].x + 9; ballY = ourN[9].y - 5; ballA = cl((tk - 16) / 22, 0, 1);
      } else if (p.id === "PENETRATE") {
        const bp = cl(tk / 62, 0, 1);
        ballX = le(390, 514, bp); ballY = le(210, 207, bp);
        ballA = tk < 70 ? 1 : cl(1 - (tk - 70) / 22, 0, 1);
      } else { ballA = 0; }
      if (ballA > 0.01) {
        ctx!.globalAlpha = gA * ballA;
        ctx!.beginPath(); ctx!.arc(ballX, ballY, 4, 0, Math.PI * 2); ctx!.fillStyle = "rgba(255,255,240,.95)"; ctx!.fill();
        ctx!.beginPath(); ctx!.arc(ballX, ballY, 8, 0, Math.PI * 2); ctx!.fillStyle = "rgba(255,255,200,.18)"; ctx!.fill();
      }

      if (p.id === "VARIABLE") {
        const st = ourN[9], dm = ourN[4];
        const aA = cl((tk - 30) / 20, 0, 1), aB = cl((tk - 54) / 20, 0, 1), aC = cl((tk - 78) / 20, 0, 1);
        dashedArr(st.x, st.y, dm.x + 8, dm.y, "A", aA, "rgba(155,178,255,.78)");
        dashedArr(st.x, st.y, st.x + 44, st.y - 24, "B", aB, "rgba(155,178,255,.78)");
        dashedArr(st.x, st.y, ourN[10].x + 4, ourN[10].y - 16, "C", aC, "rgba(127,255,106,.96)");
      }
      ctx!.restore();

      const pA = pr > 0.08 && pr < 0.9 ? cl((tk - 8) / 16, 0, 1) : cl((1 - pr) * 9, 0, 1);
      if (p.id === "MUTATION")  conceptPill("[MUTATION]", "ST drops into pocket · CB steps out of line", pA);
      if (p.id === "VARIABLE")  conceptPill("[VARIABLE]", "three options from the pocket · C targets the gap", pA);
      if (p.id === "PENETRATE") conceptPill("[VARIABLE — C]", "CB dragged · gap opened · run into channel", pA);

      const labels: Record<string, string> = {
        SETUP: "3-1-4-2 vs 4-4-2", ADVANCE: "ADVANCING",
        MUTATION: "MUTATION", VARIABLE: "VARIABLE", PENETRATE: "VARIABLE — C", RESET: "RESET",
      };
      const hi = p.id === "PENETRATE" && cXt > 0.4;
      if (hudLblRef.current) {
        hudLblRef.current.textContent = labels[p.id] ?? "";
        hudLblRef.current.style.color = hi ? "rgba(127,255,106,.92)" : "rgba(140,200,130,.58)";
      }
      if (hudFillRef.current) {
        hudFillRef.current.style.width = (cXt * 100).toFixed(0) + "%";
        hudFillRef.current.style.background = hi ? "#7fff6a" : "#4a9a42";
      }
      if (hudValRef.current) hudValRef.current.textContent = cXt > 0.065 ? "xT " + cXt.toFixed(2) : "xT —";

      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--stage)", minHeight: "100svh" }}>
      {/* pitch stage — the animated canvas sits centred, full-bleed, cinematic */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 62 }}>
        <canvas
          ref={canvasRef}
          width={680}
          height={415}
          className="w-full max-w-[1400px]"
          style={{ display: "block", opacity: 0.92, maskImage: "radial-gradient(130% 120% at 50% 42%, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(130% 120% at 50% 42%, #000 55%, transparent 100%)" }}
        />
      </div>
      <div className="stage-vignette" />

      {/* copy overlay — strong scrim so the headline always reads over the animation */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-between items-end gap-8 px-6 md:px-10 pb-12 md:pb-16 pt-56"
        style={{ background: "linear-gradient(to top, var(--stage) 0%, var(--stage) 26%, rgba(6,9,11,.97) 46%, rgba(6,9,11,.78) 66%, rgba(6,9,11,.32) 84%, transparent 100%)" }}
      >
        <div className="max-w-4xl">
          <div className="mono t-eyebrow kicker mb-5" style={{ color: "var(--green-mid)" }}>Jin&rsquo;s football philosophy</div>
          <h1 className="display mb-5 t-hero" style={{ color: "#ffffff", textShadow: "0 2px 40px rgba(0,0,0,0.7)" }}>
            <span style={{ color: "var(--green-bright)" }}>Variation</span> Theory
          </h1>
          <p className="mb-9" style={{ color: "var(--ink-2)", fontSize: "clamp(17px,2.1vw,26px)", lineHeight: 1.3, fontWeight: 500 }}>
            System adapts. <span style={{ color: "var(--ink)" }}>Variation breaks it.</span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/approach"
              className="group inline-flex items-center gap-2 text-sm px-6 py-3 rounded-full font-medium transition-all duration-300"
              style={{ background: "var(--green-bright)", color: "#06180a", border: "0.5px solid var(--green-bright)" }}
            >
              Explore the approach
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/match-analysis"
              className="inline-flex items-center gap-2 text-sm px-6 py-3 rounded-full transition-all duration-300"
              style={{ background: "rgba(255,255,255,.05)", color: "var(--ink-2)", border: "0.5px solid var(--edge-2)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.09)"; el.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.05)"; el.style.color = "var(--ink-2)"; }}
            >
              Match analysis
            </Link>
          </div>
        </div>

        <div className="glass rounded-2xl px-6 py-4 text-right min-w-[190px]">
          <div ref={hudLblRef} className="mono mb-2.5 transition-colors" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-3)" }}>3-1-4-2 vs 4-4-2</div>
          <div className="w-full mb-2.5" style={{ height: "2px", background: "rgba(255,255,255,.09)", borderRadius: 2, overflow: "hidden" }}>
            <div ref={hudFillRef} style={{ height: "100%", width: "6%", background: "var(--green-mid)", borderRadius: 2, transition: "width .5s var(--ease-out), background .4s" }} />
          </div>
          <span ref={hudValRef} className="mono" style={{ fontSize: 12, color: "var(--green-bright)" }}>xT —</span>
        </div>
      </div>
    </section>
  );
}
