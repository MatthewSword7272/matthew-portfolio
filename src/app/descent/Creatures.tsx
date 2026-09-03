// Procedural inline SVG for everything alive (or structural) in the dive.
// No photographs and no image files anywhere in this piece — every creature is
// drawn as stylised line art so it reads as a silhouette through the water and
// costs nothing to load.
//
// Nothing here uses Math.random() at render time: the page is statically
// exported and pre-rendered, so any non-deterministic layout would produce a
// hydration mismatch. `seeded()` gives stable pseudo-randomness from an index.

/** Deterministic 0..1 pseudo-random from an index (stable across SSR/CSR). */
function seeded(i: number, salt = 1): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const INK = "rgba(214, 242, 248, 0.85)";
const INK_SOFT = "rgba(214, 242, 248, 0.45)";

/* ------------------------------------------------------------------ school */

/** A school of old wives — the fish that always meets you at the pier. */
export function FishSchool() {
  const fish = Array.from({ length: 22 }, (_, i) => ({
    x: seeded(i, 31) * 320,
    y: seeded(i, 37) * 150,
    s: 0.65 + seeded(i, 41) * 0.6,
  }));

  return (
    <svg viewBox="0 0 360 170" className="h-full w-full overflow-visible" aria-hidden="true">
      {fish.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`} opacity={0.35 + seeded(i, 43) * 0.45}>
          <path d="M0 6 Q 11 0 24 6 Q 11 12 0 6 Z" fill="rgba(226, 244, 248, 0.75)" />
          <path d="M0 6 l -7 -5 l 0 10 Z" fill="rgba(226, 244, 248, 0.55)" />
          <path d="M9 2.2 l 0 7.6 M14 2 l 0 8" stroke="rgba(20, 55, 70, 0.55)" strokeWidth="1.4" />
        </g>
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------- seadragon */

/** Weedy seadragon. Endemic to southern Australia; the reason people dive here. */
export function Seadragon() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full overflow-visible" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* body — a long lazy S ending in a curled tail */}
        <path d="M14 118 C 34 128, 58 120, 74 100 C 92 78, 116 66, 144 68 C 172 70, 196 62, 216 46 L 246 30" />
        {/* snout + head */}
        <path d="M246 30 L 276 24" strokeWidth="2.2" />
        <path d="M246 30 q 6 8 -2 12" />
        {/* curled tail */}
        <path d="M14 118 q -10 8 -4 16 q 7 6 11 -2" strokeWidth="2.2" />
        {/* dorsal fin */}
        <path d="M104 82 q 26 -12 52 -10" stroke={INK_SOFT} strokeWidth="1.4" />
      </g>

      {/* leafy appendages — the camouflage that makes it a seadragon */}
      <g fill="rgba(148, 218, 200, 0.42)" stroke="rgba(200, 240, 235, 0.6)" strokeWidth="1.2">
        <path d="M62 104 q -16 -16 0 -28 q 14 12 0 28 Z" />
        <path d="M92 84 q -8 -24 8 -30 q 10 14 -8 30 Z" />
        <path d="M132 68 q 2 -26 20 -26 q 2 18 -20 26 Z" />
        <path d="M118 74 q 8 22 -8 28 q -12 -14 8 -28 Z" />
        <path d="M176 62 q 14 -20 30 -12 q -8 16 -30 12 Z" />
        <path d="M46 116 q -18 6 -18 22 q 18 -2 18 -22 Z" />
      </g>

      {/* eye */}
      <circle cx="240" cy="32" r="3" fill="rgba(235, 250, 252, 0.95)" />
      <circle cx="240.8" cy="32" r="1.4" fill="rgba(8, 30, 40, 0.9)" />
    </svg>
  );
}

/* ------------------------------------------------------------- spider crabs */

function Crab({ o = 1 }: { o?: number }) {
  return (
    <svg viewBox="0 0 80 60" className="h-full w-full overflow-visible" aria-hidden="true" opacity={o}>
      <g stroke="rgba(228, 200, 190, 0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* eight spindly legs */}
        <path d="M32 34 L 12 20 L 2 26" />
        <path d="M33 37 L 11 32 L 1 38" />
        <path d="M33 40 L 13 44 L 4 52" />
        <path d="M35 42 L 24 52 L 18 59" />
        <path d="M48 34 L 68 20 L 78 26" />
        <path d="M47 37 L 69 32 L 79 38" />
        <path d="M47 40 L 67 44 L 76 52" />
        <path d="M45 42 L 56 52 L 62 59" />
        {/* claws */}
        <path d="M34 30 L 24 18 M24 18 l -5 -4 M24 18 l 1 -6" />
        <path d="M46 30 L 56 18 M56 18 l 5 -4 M56 18 l -1 -6" />
      </g>
      {/* carapace */}
      <path d="M40 24 q 12 4 10 16 q -10 8 -20 0 q -2 -12 10 -16 Z" fill="rgba(214, 158, 140, 0.68)" />
      <path d="M40 24 l 0 -7" stroke="rgba(228, 200, 190, 0.7)" strokeWidth="1.5" />
    </svg>
  );
}

/** The winter aggregation: thousands pile up to moult together. */
export function SpiderCrabColony() {
  const crabs = Array.from({ length: 30 }, (_, i) => ({
    left: seeded(i, 53) * 100,
    top: seeded(i, 59) * 62,
    size: 5 + seeded(i, 61) * 7,
    rot: (seeded(i, 67) - 0.5) * 50,
    o: 0.35 + seeded(i, 71) * 0.6,
  }));

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {crabs.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.size}vw`,
            transform: `rotate(${c.rot}deg)`,
          }}
        >
          <Crab o={c.o} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- anglerfish */

/** Midnight zone. Her lure is the only light source in the whole scene. */
export function Anglerfish() {
  return (
    <svg viewBox="0 0 340 220" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="dsc-esca" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(190, 245, 255, 1)" />
          <stop offset="35%" stopColor="rgba(120, 220, 255, 0.55)" />
          <stop offset="100%" stopColor="rgba(80, 190, 255, 0)" />
        </radialGradient>
        <filter id="dsc-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* the lure's glow, cast before anything else so the fish sits inside it */}
      <circle cx="86" cy="60" r="86" fill="url(#dsc-esca)" opacity="0.75" />

      <g
        fill="rgba(9, 20, 30, 0.9)"
        stroke="rgba(150, 205, 225, 0.55)"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        {/* body */}
        <path d="M120 132 q -6 -52 46 -60 q 62 -10 104 22 q 22 18 14 40 q -10 26 -56 30 q -60 6 -94 -12 q -14 -8 -14 -20 Z" />
        {/* tail */}
        <path d="M284 134 q 30 -22 44 -18 q -10 22 -2 44 q -18 4 -42 -18 Z" />
        {/* pectoral fin */}
        <path d="M196 158 q 16 22 4 32 q -22 -6 -28 -28 Z" fill="rgba(9, 20, 30, 0.75)" />
      </g>

      {/* gaping jaw + teeth */}
      <path
        d="M122 130 q -4 22 16 34 q 30 16 66 12 q -46 -6 -60 -20 q -16 -14 -22 -26 Z"
        fill="rgba(4, 12, 18, 0.95)"
        stroke="rgba(150, 205, 225, 0.4)"
        strokeWidth="1.5"
      />
      <path
        d="M126 134 l 6 12 l 6 -9 l 7 13 l 6 -9 l 8 13 l 7 -8 l 9 13"
        fill="none"
        stroke="rgba(232, 248, 252, 0.85)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* illicium — the fishing rod — and the esca on the end */}
      <path
        d="M170 76 q -30 -34 -58 -22 q -16 7 -22 6"
        fill="none"
        stroke="rgba(180, 225, 240, 0.7)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="86" cy="60" r="9" fill="rgba(200, 248, 255, 0.95)" filter="url(#dsc-glow)" />
      <circle cx="86" cy="60" r="5.5" fill="rgba(226, 252, 255, 1)" />

      {/* eye */}
      <circle cx="176" cy="106" r="6" fill="rgba(226, 248, 252, 0.9)" />
      <circle cx="177" cy="106" r="2.6" fill="rgba(4, 12, 18, 1)" />
    </svg>
  );
}
