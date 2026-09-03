import type { ReactNode } from "react";
import Link from "next/link";

import Surfacing from "./Surfacing";
import { Anglerfish, FishSchool, Seadragon, SpiderCrabColony } from "./Creatures";
import { BEATS, logDepthFrac, waterAt } from "./zones";

// The `prefers-reduced-motion` version. Same seventeen beats, same script, same
// water colours — just laid out as an ordinary article with no pinning, no
// scrubbing and no canvas. A reader who cannot tolerate the motion still gets
// the whole dive, which is the only version of this worth shipping.

const ART: Record<string, ReactNode> = {
  pile: <FishSchool />,
  seadragon: <Seadragon />,
  crabs: <SpiderCrabColony />,
  midnight: <Anglerfish />,
};

export default function StaticDescent() {
  return (
    <div className="bg-black">
      <header className="relative px-6 pb-16 pt-24 sm:px-10" style={{ background: waterAt(0).top }}>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/projects"
            className="font-mono text-[10px] uppercase tracking-widest text-slate-900/60 hover:text-slate-900"
          >
            ← Exit dive
          </Link>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">The Descent</h1>
          <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-slate-900/75">
            A dive from Rye Pier in Port Phillip Bay — which bottoms out at about seven metres — all the way down to the
            deepest point in the ocean.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-slate-900/50">
            Motion reduced · read-through version
          </p>
        </div>
      </header>

      {BEATS.map((beat) => {
        const { top, bot } = waterAt(beat.d);
        const art = ART[beat.id];

        return (
          <section
            key={beat.id}
            className="relative px-6 py-20 sm:px-10 sm:py-28"
            style={{ background: `linear-gradient(180deg, ${top}, ${bot})` }}
          >
            {/* Keeps the copy legible across the full range from surface cyan to black. */}
            <div className="pointer-events-none absolute inset-0 bg-black/30" aria-hidden="true" />

            <div className="relative mx-auto max-w-3xl">
              <div className="flex items-baseline gap-4">
                <span className="text-[11px] tracking-[0.35em] capitalize text-cyan-200/70">{beat.depth}</span>
                <span className="h-px flex-1 bg-white/15" />
                <span className="font-mono text-[10px] tabular-nums text-white/30">
                  {Math.round(logDepthFrac(beat.d) * 100)}%
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">{beat.title}</h2>
              <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-white/80 sm:text-lg">{beat.body}</p>

              {art && (
                <div className="mt-10 h-40 w-full max-w-md sm:h-52" aria-hidden="true">
                  {art}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <Surfacing />
    </div>
  );
}
