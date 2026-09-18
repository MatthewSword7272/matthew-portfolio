"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Orb } from "./orb";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

export default function Pulse() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const orb = useRef<Orb | null>(null);
  const hexCode = useRef<HTMLSpanElement>(null);
  const [hex, setHex] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Paper.js touches `window` the moment it is evaluated, so it is loaded here
  // rather than imported at the top — the static export never runs it. The
  // scene is rebuilt if the reduced-motion preference flips mid-visit.
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let cancelled = false;
    let instance: Orb | null = null;

    Promise.all([import("paper/dist/paper-core"), import("./orb")]).then(
      ([paperMod, { createOrb }]) => {
        if (cancelled) return;
        const paper = paperMod.default;
        const scope = new paper.PaperScope();
        scope.setup(el);
        instance = createOrb(scope, {
          reducedMotion: reduced,
          onColour: setHex,
        });
        orb.current = instance;
      },
    );

    const toView = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top] as const;
    };

    const onMove = (e: PointerEvent) => orb.current?.setPointer(...toView(e));

    // Press charges, release pulses. Capturing the pointer means letting go
    // off the canvas still releases the charge rather than leaving it stuck.
    const onDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId);
      orb.current?.setPointer(...toView(e));
      orb.current?.beginCharge();
    };

    const onLeave = () => orb.current?.clearPointer();

    const onUp = (e: PointerEvent) => {
      orb.current?.pulse(...toView(e));
      // A lifted finger shouldn't leave the light parked where it was.
      if (e.pointerType !== "mouse") orb.current?.clearPointer();
    };

    const onCancel = () => {
      orb.current?.cancelCharge();
      orb.current?.clearPointer();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onCancel);

    return () => {
      cancelled = true;
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onCancel);
      instance?.dispose();
      orb.current = null;
    };
  }, [reduced]);

  useGSAP(() => {
    gsap.registerPlugin(ScrambleTextPlugin);

    const el = hexCode.current;
    if (!el || !hex) return;

    gsap.to(el, {
      duration: 1,
      overwrite: true,
      scrambleText: {
        text: hex,
        chars: "1234FDGDSH677QWEMNB",
      },
    });
  }, [hex, reduced]);

  // Holding Space or Enter charges just like holding the pointer; key repeat
  // is ignored so the charge isn't restarted while the key is held.
  const isPulseKey = (e: React.KeyboardEvent) =>
    e.key === " " || e.key === "Enter";

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!isPulseKey(e)) return;
    e.preventDefault();
    if (!e.repeat) orb.current?.beginCharge();
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (!isPulseKey(e)) return;
    e.preventDefault();
    orb.current?.pulse();
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050509] text-white">
      <canvas
        ref={canvas}
        data-paper-resize="true"
        role="button"
        tabIndex={0}
        aria-label="Pulse the orb and change its colour"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={() => orb.current?.cancelCharge()}
        className="block h-full w-full cursor-pointer touch-none outline-none"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-10">
        <div>
          <Link
            href="/projects"
            className="pointer-events-auto font-mono text-xs tracking-widest ring-1 rounded p-1 text-white/80 hover:text-white"
          >
            ← Exit
          </Link>
          <div className={"flex mt-4 gap-5 items-center"}>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Pulse
            </h1>
            {hex && (
              <div
                className="font-mono text-xl uppercase tracking-wide"
                aria-live="polite"
              >
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full align-middle transition-colors duration-500"
                  style={{ backgroundColor: hex }}
                />
                <span ref={hexCode} />
              </div>
            )}
          </div>
        </div>
      </div>

      <p
        className={`pointer-events-none absolute inset-x-0 bottom-10 text-center font-mono text-xs uppercase text-gray-100/90`}
      >
        Move to light it · click to pulse · hold to charge
      </p>

      <a
        href="#about"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase text-gray-100/90"
      >
        How it&apos;s built ↓
      </a>
    </main>
  );
}
