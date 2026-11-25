"use client";

import { useEffect, useRef } from "react";

/**
 * Hanging fairy-light strands, like the light curtain on the restaurant front.
 * Drawn on a canvas: strands drop in, bulbs twinkle, and they sway with the pointer.
 */
type Strand = { x: number; len: number; phase: number; delay: number; bulbs: { c: number; ph: number; sp: number }[] };

const COLORS = ["#ffd98a", "#ffe7b0", "#ffc864", "#7fb2ff"]; // warm whites + the building's blue

function makeSprite(color: string, size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.12, color);
  grad.addColorStop(0.35, color + "55");
  grad.addColorStop(1, color + "00");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export default function LightCurtain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = COLORS.map((c) => makeSprite(c, 48));
    let w = 0, h = 0, strands: Strand[] = [], raf = 0, visible = true;
    const start = performance.now();
    const pointer = { x: 0.5, sway: 0, target: 0 };
    const GAP = 24;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const spacing = w < 640 ? 40 : 46;
      const n = Math.ceil(w / spacing) + 1;
      strands = Array.from({ length: n }, (_, i) => {
        // longer strands at the edges, shorter in the middle: a curtain "valance"
        const edge = Math.abs(i / (n - 1) - 0.5) * 2;
        const len = h * (0.18 + 0.7 * Math.pow(edge, 1.8) + Math.random() * 0.1);
        const count = Math.floor(len / GAP);
        return {
          x: i * spacing + (Math.random() - 0.5) * 6,
          len,
          phase: Math.random() * Math.PI * 2,
          delay: Math.random() * 0.6 + edge * 0.15,
          bulbs: Array.from({ length: count }, () => ({
            c: Math.random() < 0.16 ? 3 : Math.floor(Math.random() * 3),
            ph: Math.random() * Math.PI * 2,
            sp: 0.8 + Math.random() * 2.2,
          })),
        };
      });
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      pointer.sway += (pointer.target - pointer.sway) * 0.04;
      ctx.clearRect(0, 0, w, h);
      for (const s of strands) {
        const p = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.2 - s.delay) / 1.4));
        const eased = 1 - Math.pow(1 - p, 3);
        const visibleLen = s.len * eased;
        if (visibleLen <= 0) continue;
        const sway = (reduce ? 0 : Math.sin(t * 0.7 + s.phase) * 3) + pointer.sway * 14;
        // wire
        ctx.strokeStyle = "rgba(255,240,210,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, 0);
        ctx.quadraticCurveTo(s.x + sway * 0.4, visibleLen / 2, s.x + sway, visibleLen);
        ctx.stroke();
        // bulbs
        for (let b = 0; b < s.bulbs.length; b++) {
          const y = (b + 1) * GAP;
          if (y > visibleLen) break;
          const bulb = s.bulbs[b];
          const k = y / s.len;
          const x = s.x + sway * k * k + sway * 0.4 * k * (1 - k) * 2;
          const tw = reduce ? 0.8 : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * bulb.sp + bulb.ph));
          ctx.globalAlpha = tw * (0.55 + 0.45 * (1 - k * 0.5));
          const size = 14 + tw * 9;
          ctx.drawImage(sprites[bulb.c], x - size / 2, y - size / 2, size, size);
        }
        ctx.globalAlpha = 1;
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      pointer.target = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    });

    build();
    raf = requestAnimationFrame(draw);
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
