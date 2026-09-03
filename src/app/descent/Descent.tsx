"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import "./descent.css";
import Particles from "./Particles";
import Surfacing from "./Surfacing";
import StaticDescent from "./StaticDescent";
import { createSim } from "./sim";
import { Anglerfish, FishSchool, Seadragon, SpiderCrabColony } from "./Creatures";
import {
  BEATS,
  SCROLL_LENGTH,
  SCUBA_LIMIT,
  airBarAt,
  clamp01,
  depthAt,
  diveMinutesAt,
  formatClock,
  invlerp,
  isDescending,
  lerp,
  logDepthFrac,
  ndlAt,
  storyAt,
  tempAt,
  waterAt,
} from "./zones";
import { ArrowLeft } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Fixed labels down the right-hand rail, placed on the same log scale as the
 *  live marker so the 7 m pier dive gets real estate instead of one pixel. */
const RAIL_MARKS = [
  { d: 7, label: "Pier 7 m" },
  { d: 40, label: "Rec limit 40 m" },
  { d: 200, label: "Twilight 200 m" },
  { d: 1000, label: "Midnight 1 km" },
  { d: 4000, label: "Abyss 4 km" },
  { d: 10935, label: "Trench 10.9 km" },
];

const RING_R = 44;
const RING_CIRC = 2 * Math.PI * RING_R;

/** The safety-stop beat's window, pulled out so the ring stays in sync with it. */
const SAFETY = BEATS.find((b) => b.id === "safety")!.at;

// The stop runs in phases across that window, as fractions of it, so they follow
// automatically if the beat is ever re-timed:
//   0 → APPEAR      the ring fades up, holding a full 3:00
//   APPEAR → END    the three minutes actually run down
//   END → CLEAR     holds at 0:00 so it reads as finished
//   CLEAR → 1       fades out as the surface ascent begins
const STOP_APPEAR = 0.15;
const STOP_TIMER_END = 0.85;
const STOP_CLEAR = 0.9;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const fmtDepth = (d: number) => (d < 10 ? d.toFixed(1) : Math.round(d).toLocaleString("en-AU"));

interface DriftOpts {
  scale?: number;
  bob?: number;
  waves?: number;
  fade?: number;
  flip?: boolean;
  maxO?: number;
}

/** Move an element across the stage through a progress window, fading at both
 *  edges and bobbing gently on the way. Positions are viewport units so the
 *  choreography holds up at any screen size. */
function drift(
  el: HTMLElement | null,
  p: number,
  a: number,
  z: number,
  from: [number, number],
  to: [number, number],
  o: DriftOpts = {},
) {
  if (!el) return;
  const fade = o.fade ?? 0.035;

  if (p < a - fade || p > z + fade) {
    if (el.style.opacity !== "0") el.style.opacity = "0";
    return;
  }

  const t = clamp01(invlerp(a, z, p));
  const x = lerp(from[0], to[0], t);
  const y = lerp(from[1], to[1], t) + Math.sin(t * Math.PI * (o.waves ?? 2)) * (o.bob ?? 0);

  const fadeIn = clamp01((p - (a - fade)) / (fade * 2));
  const fadeOut = clamp01((z + fade - p) / (fade * 2));

  el.style.opacity = String(Math.min(fadeIn, fadeOut) * (o.maxO ?? 1));
  el.style.transform =
    `translate3d(${x}vw, ${y}vh, 0) scale(${o.scale ?? 1})` + (o.flip ? " scaleX(-1)" : "");
}

/* ================================================================= wrapper */

export default function Descent() {
  // Defaults to the full experience so the *static export* contains the real
  // stage markup — all seventeen beats as actual text. That matters for search
  // engines, for anyone without JS, and for screen readers, which read the copy
  // straight through in order regardless of the opacity the scroll loop sets.
  // Reduced motion can only be detected on the client, so it swaps in on mount.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced ? <StaticDescent /> : <DiveStage />;
}

/* =================================================================== stage */

function DiveStage() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // scene layers
  const bg = useRef<HTMLDivElement>(null);
  const sunlight = useRef<HTMLDivElement>(null);
  const vignette = useRef<HTMLDivElement>(null);

  // creatures
  const school = useRef<HTMLDivElement>(null);
  const dragon = useRef<HTMLDivElement>(null);
  const crabs = useRef<HTMLDivElement>(null);
  const angler = useRef<HTMLDivElement>(null);

  // beat copy
  const beatEls = useRef<(HTMLDivElement | null)[]>([]);

  // instruments
  const hudDepth = useRef<HTMLSpanElement>(null);
  const hudTime = useRef<HTMLSpanElement>(null);
  const hudTemp = useRef<HTMLSpanElement>(null);
  const hudNdl = useRef<HTMLSpanElement>(null);
  const hudAir = useRef<HTMLSpanElement>(null);
  const hudHeading = useRef<HTMLSpanElement>(null);
  const tankFill = useRef<HTMLDivElement>(null);
  const beyondTag = useRef<HTMLDivElement>(null);

  // depth rail
  const railMarker = useRef<HTMLDivElement>(null);
  const railLabel = useRef<HTMLSpanElement>(null);

  // safety stop
  const stopWrap = useRef<HTMLDivElement>(null);
  const stopRing = useRef<SVGCircleElement>(null);
  const stopCount = useRef<HTMLSpanElement>(null);
  const stopDone = useRef<HTMLDivElement>(null);

  const hint = useRef<HTMLDivElement>(null);

  const sim = useRef(createSim());

  useGSAP(
    () => {
      const stageEl = stage.current;
      if (!stageEl) return;

      // A reduced-motion visitor renders this stage for a single frame before
      // swapping to the read-through version. Never pin or start a loop for them.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const render = (raw: number) => {
        // `raw` is scroll position; `p` is position in the story. They differ
        // only in how much scroll each phase is given — see storyAt().
        const p = storyAt(raw);
        const d = depthAt(p);
        const descending = isDescending(p);
        sim.current.depth = d;
        sim.current.descending = descending;

        // --- water ---------------------------------------------------------
        // Setting two custom properties is markedly cheaper than re-parsing the
        // whole `background` shorthand every frame.
        const { top, bot } = waterAt(d);
        bg.current?.style.setProperty("--dsc-top", top);
        bg.current?.style.setProperty("--dsc-bot", bot);

        // --- light ---------------------------------------------------------
        // Sunlight is gone by the recreational limit; that is the whole point.
        if (sunlight.current) {
          sunlight.current.style.opacity = String(clamp01(1 - d / SCUBA_LIMIT) ** 1.4);
        }
        // Visibility closes in as the light goes.
        if (vignette.current) {
          vignette.current.style.opacity = String(clamp01(0.15 + d / 150));
        }

        // --- narrative -----------------------------------------------------
        for (let i = 0; i < BEATS.length; i++) {
          const el = beatEls.current[i];
          if (!el) continue;
          const [a, z] = BEATS[i].at;

          let o = 0;
          let y = 34;

          if (p >= a && p <= z) {
            const t = invlerp(a, z, p);
            const fadeIn = clamp01(t / 0.3);
            const fadeOut = clamp01((1 - t) / 0.3);
            o = smoothstep(Math.min(fadeIn, fadeOut));
            y = (1 - fadeIn) * 34 - (1 - fadeOut) * 34;
          }

          el.style.opacity = String(o);
          el.style.transform = `translate(-50%, calc(-50% + ${y}px))`;
        }

        // --- inhabitants ---------------------------------------------------
        drift(school.current, p, 0.07, 0.165, [-34, 4], [112, -6], { bob: 2.5, waves: 3 });
        drift(dragon.current, p, 0.14, 0.235, [104, -3], [-42, 5], { bob: 2, waves: 2, flip: true });
        drift(crabs.current, p, 0.212, 0.302, [0, 14], [0, -10], { fade: 0.03 });
        drift(angler.current, p, 0.62, 0.708, [58, 2], [-45, -4], { bob: 1.6, waves: 1.5 });

        // --- instruments ---------------------------------------------------
        const beyond = d > SCUBA_LIMIT && descending;
        const air = airBarAt(p);

        if (hudDepth.current) hudDepth.current.textContent = fmtDepth(d);
        if (hudTime.current) hudTime.current.textContent = formatClock(diveMinutesAt(p));
        if (hudTemp.current) hudTemp.current.textContent = tempAt(d).toFixed(1);
        if (hudNdl.current) hudNdl.current.textContent = ndlAt(d, descending);
        if (hudAir.current) hudAir.current.textContent = beyond ? "—" : String(Math.round(air));
        if (tankFill.current) {
          tankFill.current.style.transform = `scaleX(${beyond ? 0 : air / 200})`;
        }
        if (beyondTag.current) beyondTag.current.style.opacity = beyond ? "1" : "0";
        if (hudHeading.current) {
          hudHeading.current.textContent =
            String(Math.round((p * 520) % 360)).padStart(3, "0") + "°";
        }

        // --- depth rail ----------------------------------------------------
        if (railMarker.current) railMarker.current.style.top = `${logDepthFrac(d) * 100}%`;
        if (railLabel.current) railLabel.current.textContent = `${fmtDepth(d)} m`;

        // --- safety stop ---------------------------------------------------
        // Strictly sequential: the ring arrives first and sits at a full 3:00,
        // then the clock actually runs, then it holds at zero long enough to
        // read as finished before you are allowed up. Overlapping these was the
        // old behaviour and it made the stop look like it started half-elapsed.
        const inStop = p >= SAFETY[0] && p <= SAFETY[1];

        if (!inStop) {
          if (stopWrap.current && stopWrap.current.style.opacity !== "0") {
            stopWrap.current.style.opacity = "0";
          }
        } else {
          const t = clamp01(invlerp(SAFETY[0], SAFETY[1], p));

          // phase 1 — appear.               phase 4 — clear as you rise.
          const appear = smoothstep(clamp01(t / STOP_APPEAR));
          const clear = smoothstep(clamp01((1 - t) / (1 - STOP_CLEAR)));
          if (stopWrap.current) stopWrap.current.style.opacity = String(Math.min(appear, clear));

          // phase 2 — the three minutes, which only start once it is fully on
          // screen. phase 3 is simply this pinned at 1 until STOP_CLEAR.
          const run = clamp01(invlerp(STOP_APPEAR, STOP_TIMER_END, t));
          const done = run >= 1;

          if (stopRing.current) {
            stopRing.current.style.strokeDashoffset = String(RING_CIRC * (1 - run));
            stopRing.current.style.stroke = done ? "rgba(167,243,208,0.95)" : "rgba(103,232,249,0.9)";
          }
          if (stopCount.current) stopCount.current.textContent = formatClock(3 * (1 - run));
          if (stopDone.current) stopDone.current.style.opacity = done ? String(clear) : "0";
        }

        // --- scroll nudge --------------------------------------------------
        if (hint.current) hint.current.style.opacity = String(clamp01(1 - p / 0.002));
      };

      // No `scrub` here on purpose: ScrollTrigger still fires onUpdate on every
      // scroll event, and doing the easing ourselves in the rAF loop below gives
      // the descent its weight without stacking two smoothing passes.
      const trigger = ScrollTrigger.create({
        trigger: stageEl,
        start: "top top",
        end: () => "+=" + window.innerHeight * SCROLL_LENGTH,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          sim.current.target = self.progress;
        },
      });

      let raf = 0;
      const loop = () => {
        const s = sim.current;
        s.p += (s.target - s.p) * 0.1;
        // Snap once we are close enough that the lerp would just burn frames.
        if (Math.abs(s.target - s.p) < 0.00005) s.p = s.target;
        render(s.p);
        raf = requestAnimationFrame(loop);
      };

      render(0);
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        trigger.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative bg-black">
      <div ref={stage} className="relative h-[100svh] w-full overflow-hidden">
        {/* ---------------------------------------------------- water body */}
        <div
          ref={bg}
          className="absolute inset-0"
          style={
            {
              "--dsc-top": "#93c7d8",
              "--dsc-bot": "#3f92a6",
              background: "linear-gradient(180deg, var(--dsc-top), var(--dsc-bot))",
            } as React.CSSProperties
          }
          aria-hidden="true"
        />

        {/* -------------------------------------------------------- sunlight */}
        <div ref={sunlight} className="absolute inset-0" aria-hidden="true">
          <div className="dsc-caustics absolute inset-x-0 top-0 h-[45vh]" />
          <div className="dsc-ray left-[12%] w-[9vw]" />
          <div className="dsc-ray left-[34%] w-[5vw] [animation-delay:-3s]" />
          <div className="dsc-ray left-[58%] w-[12vw] [animation-delay:-6s]" />
          <div className="dsc-ray left-[81%] w-[6vw] [animation-delay:-1.5s]" />
        </div>

        {/* ------------------------------------------------------- creatures */}
        <div className="absolute inset-0" aria-hidden="true">
          <div
            ref={school}
            className="absolute left-0 top-[38%] h-[22vh] w-[34vw] min-w-[240px] opacity-0 will-change-transform"
          >
            <FishSchool />
          </div>

          <div
            ref={dragon}
            className="absolute left-0 top-[46%] h-[26vh] w-[42vw] min-w-[300px] opacity-0 will-change-transform"
          >
            <Seadragon />
          </div>

          <div
            ref={crabs}
            className="absolute inset-x-0 bottom-[-4vh] h-[42vh] opacity-0 will-change-transform"
          >
            <SpiderCrabColony />
          </div>

          <div
            ref={angler}
            className="absolute left-0 top-[40%] h-[32vh] w-[46vw] min-w-[320px] opacity-0 will-change-transform"
          >
            <Anglerfish />
          </div>
        </div>

        {/* ------------------------------------------------------- particles */}
        <Particles sim={sim} />

        {/* -------------------------------------------------- loss of vis */}
        <div
          ref={vignette}
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 44%, transparent 22%, rgba(0,0,0,0.92) 100%)",
          }}
          aria-hidden="true"
        />

        {/* ------------------------------------------------------------ copy */}
        <div className="absolute inset-0">
          {BEATS.map((b, i) => (
            <div
              key={b.id}
              ref={(el) => {
                beatEls.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 w-[min(700px,86vw)] text-center opacity-0 will-change-[opacity,transform]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-200/60 sm:text-[11px]">
                {b.depth}
              </p>
              <h2
                className={
                  b.kind === "silence"
                    ? "mt-4 text-6xl font-light text-white/70 sm:text-7xl"
                    : b.kind === "transition"
                      ? "mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
                      : "mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl"
                }
              >
                {b.title}
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-white/75 sm:text-base">
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------ safety stop */}
        <div
          ref={stopWrap}
          className="pointer-events-none absolute left-1/2 top-[74%] -translate-x-1/2 opacity-0"
        >
          <div className="relative">
            <svg viewBox="0 0 100 100" className="size-20 -rotate-90 sm:size-24">
              <circle cx="50" cy="50" r={RING_R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
              <circle
                ref={stopRing}
                cx="50"
                cy="50"
                r={RING_R}
                fill="none"
                stroke="rgba(103,232,249,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={RING_CIRC}
                strokeDashoffset={RING_CIRC}
              />
            </svg>
            <div className="absolute inset-0 grid place-content-center">
              <span ref={stopCount} className="font-mono text-sm text-cyan-100 tabular-nums">
                3:00
              </span>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- HUD */}
        <div className="pointer-events-none absolute bottom-4 left-4 select-none sm:bottom-8 sm:left-8">
          <div className="rounded-xl border border-cyan-200/15 bg-black/40 px-4 py-3 font-mono text-cyan-100 backdrop-blur-md">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-end gap-1.5">
                <span ref={hudDepth} className="text-4xl leading-none tabular-nums sm:text-5xl">
                  0.0
                </span>
                <span className="mb-1 text-xs text-cyan-300/60">m</span>
              </div>
              <span ref={hudHeading} className="text-xs tabular-nums text-cyan-300/60">
                000°
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-x-4 text-[9px] uppercase tracking-widest text-cyan-300/45 sm:gap-x-6 sm:text-[10px]">
              <span>Time</span>
              <span>Temp</span>
              <span>No-stop</span>
            </div>
            <div className="grid grid-cols-3 gap-x-4 text-sm tabular-nums sm:gap-x-6">
              <span ref={hudTime}>0:00</span>
              <span>
                <span ref={hudTemp}>15.0</span>
                <span className="text-cyan-300/60">°C</span>
              </span>
              <span ref={hudNdl}>99+</span>
            </div>

            <div className="mt-3 w-full min-w-[190px]">
              <div className="flex justify-between text-[9px] uppercase tracking-widest text-cyan-300/45 sm:text-[10px]">
                <span>Cylinder</span>
                <span>
                  <span ref={hudAir} className="tabular-nums">
                    200
                  </span>{" "}
                  bar
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-white/10">
                <div ref={tankFill} className="h-full w-full origin-left bg-cyan-300/70" />
              </div>
            </div>

            <div
              ref={beyondTag}
              className="mt-2 text-[9px] uppercase tracking-widest text-amber-300/90 opacity-0 sm:text-[10px]"
            >
              ▲ No longer diving
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- depth rail */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden h-[62vh] -translate-y-1/2 md:block">
          <div className="relative h-full w-px bg-gradient-to-b from-cyan-200/5 via-cyan-200/25 to-cyan-200/5">
            {RAIL_MARKS.map((m) => (
              <div
                key={m.d}
                className="absolute right-0 -translate-y-1/2"
                style={{ top: `${logDepthFrac(m.d) * 100}%` }}
              >
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-cyan-200/35">
                    {m.label}
                  </span>
                  <span className="block h-px w-2 bg-cyan-200/30" />
                </div>
              </div>
            ))}

            <div ref={railMarker} className="absolute right-0 -translate-y-1/2" style={{ top: "0%" }}>
              <div className="flex items-center gap-2">
                <span
                  ref={railLabel}
                  className="whitespace-nowrap rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-cyan-100"
                >
                  0.0 m
                </span>
                <span className="-mr-[3px] block size-1.5 rounded-full bg-cyan-200 shadow-[0_0_9px_2px_rgba(103,232,249,0.7)]" />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------ scroll nudge */}
        <div
          ref={hint}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-center"
        >
          <p className="text-lg text-white/80">Scroll to descend</p>
          <div className="dsc-sink mt-2 flex justify-center">
            <svg viewBox="0 0 24 24" className="size-4 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* --------------------------------------------------------- exit */}
        <Link
          href="/projects"
          className="absolute flex items-center gap-2 left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-white/35 hover:text-white sm:left-8 sm:top-8"
        >
          <ArrowLeft size="10" /> Exit Dive
        </Link>
      </div>

      <Surfacing />
    </div>
  );
}
