"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { Sim } from "./sim";

// One canvas, one particle pool, one rAF loop. The pool never changes size —
// what changes is how each particle *behaves*, and that is a function of the
// current depth read straight off the shared `sim` ref:
//
//   < 18 m   exhaled bubbles racing up past your mask
//   18-120 m suspended particulate, barely moving (bay water is not clear)
//   > 120 m  marine snow drifting down — the falling dead of the sunlit ocean
//   700-3500 m the odd bioluminescent flash, the only colour left
//
// Reading depth from a ref (rather than props) keeps this component out of
// React's render path entirely: it never re-renders while you scroll.

interface Particle {
  x: number;
  y: number;
  r: number;
  spd: number;
  sway: number;
  swaySpd: number;
  bio: number;
}

export default function Particles({ sim }: { sim: RefObject<Sim> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = window.innerWidth < 700 ? 60 : 140;

    let w = 0;
    let h = 0;
    let raf = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      // Cap DPR at 2 — beyond that we are burning fill rate for nothing.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const parts: Particle[] = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.6, 2.6),
      spd: rand(0.25, 1),
      sway: rand(0, Math.PI * 2),
      swaySpd: rand(0.005, 0.022),
      bio: 0,
    }));

    const draw = () => {
      const d = sim.current.depth;
      ctx.clearRect(0, 0, w, h);

      const bubbles = d < 18;
      const snow = d > 120;
      const bioZone = d > 700 && d < 3500;

      for (const p of parts) {
        p.sway += p.swaySpd;

        if (bubbles) {
          p.y -= p.spd * 1.8;
          p.x += Math.sin(p.sway) * 0.35;
          if (p.y < -6) {
            p.y = h + 6;
            p.x = rand(0, w);
          }
          ctx.globalAlpha = 0.35 * (1 - d / 18);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
        } else if (snow) {
          p.y += p.spd * 0.42;
          p.x += Math.sin(p.sway) * 0.4;
          if (p.y > h + 6) {
            p.y = -6;
            p.x = rand(0, w);
          }

          // Rare, brief bioluminescent flashes in the midnight zone.
          if (bioZone && p.bio <= 0 && Math.random() < 0.0016) p.bio = 1;
          if (p.bio > 0) p.bio -= 0.012;

          if (p.bio > 0) {
            ctx.globalAlpha = Math.max(0, p.bio) * 0.9;
            ctx.fillStyle = "rgba(130, 214, 255, 1)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.globalAlpha = Math.min(0.5, (d - 120) / 500);
            ctx.fillStyle = "rgba(206, 220, 228, 0.6)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 0.7, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // The murky middle: silt hanging in the water, going almost nowhere.
          p.x += Math.sin(p.sway) * 0.22;
          p.y += 0.06;
          if (p.y > h + 6) {
            p.y = -6;
            p.x = rand(0, w);
          }
          ctx.globalAlpha = 0.14;
          ctx.fillStyle = "rgba(220, 232, 238, 0.6)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    // With reduced motion we paint a single static field and stop.
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [sim]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
