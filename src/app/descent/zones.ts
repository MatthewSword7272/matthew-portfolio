// Data + math for "The Descent" — a scroll-driven dive from Blairgowrie Pier
// (Port Phillip Bay, max ~7 m) down the full ocean water column to the bottom
// of the Mariana Trench (10,935 m) and back up through a safety stop.
//
// Everything the scene renders is a pure function of one number: `p`, the
// master timeline progress in [0, 1]. `depthAt(p)` turns scroll into metres on
// a piecewise-linear curve, and the helpers below turn metres into colour,
// temperature, gas and light.

/** Viewport-heights of scroll the descent itself is paced against. Changing
 *  ASCENT_STRETCH below will not affect it. */
const BASE_SCROLL_LENGTH = 18;

/** How much longer the climb back up takes than it was authored to.
 *
 *  1 = as written in DEPTH_KEYS. 3 = three times the scrolling to surface.
 *  This is the only number to turn to re-pace the ascent. */
export const ASCENT_STRETCH = 3;

/** Same, for the safety stop and the final surfacing.
 *
 *  Its slice of the story timeline is tiny — a fraction of a screen — which put
 *  the fade-in, the three minutes, the hold and the fade-out all inside about a
 *  third of one scroll. Since the copy makes a point of this being the part you
 *  are not allowed to rush, it earns more scroll than its slice would give it. */
export const STOP_STRETCH = 4;

export interface Beat {
  id: string;
  /** [enter, exit] window on the master 0..1 timeline. */
  at: [number, number];
  /** Representative depth in metres (drives the fallback background colour). */
  d: number;
  depth: string;
  title: string;
  body: string;
  kind: "beat" | "transition" | "silence" | "ascent" | "surface";
}

// --- small maths ------------------------------------------------------------

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const invlerp = (a: number, b: number, v: number) =>
  a === b ? 0 : clamp01((v - a) / (b - a));

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ] as const;
}

/** Blend two hex colours; returns an `rgb(...)` string. */
export function mixHex(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(lerp(ca[0], cb[0], t));
  const g = Math.round(lerp(ca[1], cb[1], t));
  const bl = Math.round(lerp(ca[2], cb[2], t));
  return `rgb(${r}, ${g}, ${bl})`;
}

// --- pacing ----------------------------------------------------------------
//
// The story timeline is normalised 0..1, so widening the ascent inside it would
// steal scroll from the descent and mean renumbering every key and beat. So the
// story is left exactly as authored and *raw scroll* is warped onto it instead:
// three runs whose relative widths set the pacing. The pinned scroll length then
// grows by the same factor, which is what keeps the descent's scroll-per-metre
// identical no matter how far the ascent is stretched.

/** Story window the ascent occupies — mirrors the DEPTH_KEYS segment below, and
 *  starts exactly where the bottom hold ends, so the depth marker turns around
 *  the moment the last beat at 10,935 m finishes reading. */
const ASCENT_WINDOW: readonly [number, number] = [0.945, 0.975];

const RUN_DOWN = ASCENT_WINDOW[0]; // surface down to the trench floor
const RUN_UP = (ASCENT_WINDOW[1] - ASCENT_WINDOW[0]) * ASCENT_STRETCH; // the climb
const RUN_OUT = (1 - ASCENT_WINDOW[1]) * STOP_STRETCH; // safety stop, then surfacing
const RUN_TOTAL = RUN_DOWN + RUN_UP + RUN_OUT;

/** How many viewport-heights of scroll the pinned stage lasts. */
export const SCROLL_LENGTH = BASE_SCROLL_LENGTH * RUN_TOTAL;

const RAW_UP_START = RUN_DOWN / RUN_TOTAL;
const RAW_UP_END = (RUN_DOWN + RUN_UP) / RUN_TOTAL;

/** Raw ScrollTrigger progress -> story progress.
 *
 *  Piecewise-linear, and the identity when both stretches are 1. Everything else
 *  in the scene keeps working purely in story coordinates. */
export function storyAt(raw: number): number {
  const c = clamp01(raw);
  const [upStart, upEnd] = ASCENT_WINDOW;

  if (c < RAW_UP_START) return (c / RAW_UP_START) * upStart;
  if (c < RAW_UP_END) {
    return upStart + ((c - RAW_UP_START) / (RAW_UP_END - RAW_UP_START)) * (upEnd - upStart);
  }
  return upEnd + ((c - RAW_UP_END) / (1 - RAW_UP_END)) * (1 - upEnd);
}

// --- depth -----------------------------------------------------------------

// `log: true` on a key means "interpolate the segment *ending* here in log
// space rather than linear metres" — see depthAt() for why the ascent needs it.
const DEPTH_KEYS: { p: number; d: number; log?: boolean }[] = [
  { p: 0.0, d: 0 },
  { p: 0.05, d: 1.5 },
  { p: 0.14, d: 5 },
  { p: 0.22, d: 6.5 },
  { p: 0.29, d: 7.2 },
  { p: 0.37, d: 7.2 }, // hold on the sand
  { p: 0.44, d: 24 }, // the Rip
  { p: 0.49, d: 40 }, // recreational limit
  { p: 0.56, d: 200 }, // twilight
  { p: 0.65, d: 1000 }, // midnight
  { p: 0.74, d: 4000 }, // abyssal plain
  { p: 0.83, d: 6000 }, // hadal
  { p: 0.885, d: 10935 }, // Challenger Deep — arrives mid-beat, then settles
  { p: 0.945, d: 10935 }, // on the bottom: the deep + silence beats both read here
  { p: 0.975, d: 5, log: true }, // ascent — even, unhurried, all the way up
  { p: 0.994, d: 5 }, // safety stop hold
  { p: 1.0, d: 0 }, // surface
];

/** Master progress (0..1) -> depth in metres.
 *
 *  Segments are linear in metres by default, which is what gives the descent its
 *  accelerating, falling-into-the-trench feel. The ascent is the exception: it
 *  interpolates in log space instead.
 *
 *  The reason is that everything the eye actually reads off the scene — the
 *  water colour, the depth rail, the returning light — is computed on a log
 *  depth scale. A linear climb from 10,935 m therefore spends most of its scroll
 *  still in pitch black, covering thousands of metres that all look identical,
 *  and then flashes through every visible zone in the last fraction. Moving up
 *  log-linearly makes the *perceived* rate of change constant, so the ascent
 *  reads as one steady, even rise. */
export function depthAt(p: number): number {
  const c = clamp01(p);
  for (let i = 0; i < DEPTH_KEYS.length - 1; i++) {
    const a = DEPTH_KEYS[i];
    const b = DEPTH_KEYS[i + 1];
    if (c < a.p || c > b.p) continue;

    const t = invlerp(a.p, b.p, c);
    if (!b.log) return lerp(a.d, b.d, t);

    // +1 keeps the log defined as depth approaches zero.
    return 10 ** lerp(Math.log10(a.d + 1), Math.log10(b.d + 1), t) - 1;
  }
  return 0;
}

/** True while the diver is still heading down (not yet ascending). */
export const isDescending = (p: number) => p < 0.945;

// --- water colour ---------------------------------------------------------

const WATER: { d: number; top: string; bot: string }[] = [
  { d: 0, top: "#93c7d8", bot: "#3f92a6" },
  { d: 3, top: "#5fa9bd", bot: "#2b6d80" },
  { d: 7, top: "#3d8093", bot: "#1c4b59" },
  { d: 24, top: "#255f70", bot: "#123743" },
  { d: 60, top: "#173f52", bot: "#0b2431" },
  { d: 200, top: "#0c2438", bot: "#05121d" },
  { d: 1000, top: "#050f1c", bot: "#01060d" },
  { d: 4000, top: "#02060d", bot: "#000305" },
  { d: 10935, top: "#01040a", bot: "#000000" },
];

const logD = (d: number) => Math.log10(Math.max(0, d) + 1);

/** Depth -> { top, bottom } gradient colours, interpolated on a log scale. */
export function waterAt(d: number): { top: string; bot: string } {
  for (let i = 0; i < WATER.length - 1; i++) {
    const a = WATER[i];
    const b = WATER[i + 1];
    if (d >= a.d && d <= b.d) {
      const t = invlerp(logD(a.d), logD(b.d), logD(d));
      return { top: mixHex(a.top, b.top, t), bot: mixHex(a.bot, b.bot, t) };
    }
  }
  const last = WATER[WATER.length - 1];
  return { top: last.top, bot: last.bot };
}

/** 0 at the surface, 1 in permanent darkness — used for the right-rail scale. */
export const logDepthFrac = (d: number) => clamp01(logD(d) / logD(11001));

// --- instruments ---------------------------------------------------------

/** Water temperature in °C at a given depth (Port Phillip Bay -> deep ocean). */
export function tempAt(d: number): number {
  if (d <= 7) return lerp(15, 13, invlerp(0, 7, d));
  if (d <= 24) return lerp(13, 10, invlerp(7, 24, d));
  if (d <= 200) return lerp(10, 6, invlerp(24, 200, d));
  if (d <= 1000) return lerp(6, 4, invlerp(200, 1000, d));
  if (d <= 4000) return lerp(4, 2.4, invlerp(1000, 4000, d));
  return lerp(2.4, 1.6, invlerp(4000, 10935, d));
}

const TIME_KEYS: { p: number; m: number }[] = [
  { p: 0, m: 0 },
  { p: 0.29, m: 12 },
  { p: 0.37, m: 16 },
  { p: 0.49, m: 22 },
  { p: 0.65, m: 31 },
  { p: 0.83, m: 39 },
  { p: 0.93, m: 43 },
  { p: 0.965, m: 44 },
  { p: 0.992, m: 47 },
  { p: 1, m: 48 },
];

/** Elapsed dive time in minutes since entry. */
export function diveMinutesAt(p: number): number {
  const c = clamp01(p);
  for (let i = 0; i < TIME_KEYS.length - 1; i++) {
    const a = TIME_KEYS[i];
    const b = TIME_KEYS[i + 1];
    if (c >= a.p && c <= b.p) return lerp(a.m, b.m, invlerp(a.p, b.p, c));
  }
  return 48;
}

export function formatClock(minutes: number): string {
  const m = Math.floor(minutes);
  const s = Math.floor((minutes - m) * 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const AIR_KEYS: { p: number; bar: number }[] = [
  { p: 0, bar: 200 },
  { p: 0.29, bar: 170 },
  { p: 0.37, bar: 160 },
  { p: 0.49, bar: 138 },
  { p: 0.65, bar: 104 },
  { p: 0.83, bar: 78 },
  { p: 0.93, bar: 68 },
  { p: 0.992, bar: 60 },
  { p: 1, bar: 58 },
];

/** Tank pressure in bar (0..200). */
export function airBarAt(p: number): number {
  const c = clamp01(p);
  for (let i = 0; i < AIR_KEYS.length - 1; i++) {
    const a = AIR_KEYS[i];
    const b = AIR_KEYS[i + 1];
    if (c >= a.p && c <= b.p) return lerp(a.bar, b.bar, invlerp(a.p, b.p, c));
  }
  return 58;
}

/** Past this depth the dive stops being physically possible on air. */
export const SCUBA_LIMIT = 45;

/** No-decompression limit readout for the current depth. */
export function ndlAt(d: number, descending: boolean): string {
  if (!descending) return "—";
  if (d < 9) return "99+";
  if (d < 18) return String(Math.round(60 - d * 1.4));
  if (d < 30) return String(Math.max(9, Math.round(620 / d)));
  if (d <= 40) return String(Math.max(4, Math.round(10 - (d - 30) * 0.6)));
  return "DECO";
}

// --- the script ---------------------------------------------------------

export const BEATS: Beat[] = [
  {
    id: "surface-in",
    at: [0.0, 0.055],
    d: 0,
    kind: "beat",
    depth: "0 m",
    title: "Blairgowrie Pier",
    body: "Port Phillip Bay, 7:14 am. Fourteen degrees, a light current running under the pier. One giant stride off the end and the bay closes over your head.",
  },
  {
    id: "pile",
    at: [0.075, 0.135],
    d: 3,
    kind: "beat",
    depth: "−3 m",
    title: "Down the pile",
    body: "Every timber post is furred with sponge, ascidian and hydroid — a vertical garden built on eighty years of jetty. A school of old wives folds around you and re-forms.",
  },
  {
    id: "seadragon",
    at: [0.15, 0.215],
    d: 5,
    kind: "beat",
    depth: "−5 m",
    title: "Weedy seadragon",
    body: "Endemic to southern Australia and almost nowhere else. It doesn't really swim — it drifts, a torn leaf that grew a spine and a long pipe of a snout.",
  },
  {
    id: "crabs",
    at: [0.225, 0.29],
    d: 6.5,
    kind: "beat",
    depth: "−6.5 m",
    title: "Spider crab winter",
    body: "Once a year tens of thousands of giant spider crabs heap onto the sand to moult at the same time. Safety in a slow, clattering mountain of legs.",
  },
  {
    id: "bottom",
    at: [0.3, 0.36],
    d: 7.2,
    kind: "beat",
    depth: "−7.2 m",
    title: "The bottom",
    body: "This is as deep as Blairgowrie gets. Ribbed sand, a lost torch, a few bottles going green. The light is still bright enough to read a gauge without a lamp.",
  },
  {
    id: "handoff",
    at: [0.375, 0.44],
    d: 12,
    kind: "transition",
    depth: "the water keeps going",
    title: "Seven metres.",
    body: "Everything you just saw fits in the first seven metres of ocean. Below the sand it keeps going down for another eleven kilometres. Keep scrolling.",
  },
  {
    id: "rip",
    at: [0.435, 0.485],
    d: 24,
    kind: "beat",
    depth: "−24 m",
    title: "Port Phillip Heads",
    body: "Where the whole bay drains into Bass Strait through 'The Rip' — a kilometre-wide gap that runs at six knots and has sunk more than forty ships.",
  },
  {
    id: "reclimit",
    at: [0.49, 0.545],
    d: 40,
    kind: "beat",
    depth: "−40 m",
    title: "Recreational limit",
    body: "Nitrogen under pressure starts to feel like three or four quick drinks. Your no-stop clock is nearly spent. For a sport diver this is the edge of the map.",
  },
  {
    id: "twilight",
    at: [0.55, 0.62],
    d: 200,
    kind: "beat",
    depth: "−200 m",
    title: "The twilight zone",
    body: "The mesopelagic. Roughly one percent of the surface light is left, all of it blue. Nothing photosynthesises past here. The largest migration on Earth rises out of this layer every night.",
  },
  {
    id: "midnight",
    at: [0.625, 0.7],
    d: 1000,
    kind: "beat",
    depth: "−1,000 m",
    title: "The midnight zone",
    body: "No sunlight has ever reached this deep. Most of what lives here makes its own light — and the anglerfish fishes with hers, a lure of glowing bacteria hung in front of her teeth.",
  },
  {
    id: "abyss",
    at: [0.705, 0.78],
    d: 4000,
    kind: "beat",
    depth: "−4,000 m",
    title: "The abyssal plain",
    body: "Black, near-freezing, and almost completely still. 'Marine snow' — the falling dead of the sunlit ocean — drifts down for weeks and is the only food most of the year.",
  },
  {
    id: "hadal",
    at: [0.785, 0.85],
    d: 6000,
    kind: "beat",
    depth: "−6,000 m",
    title: "The hadal zone",
    body: "Named for Hades. Only the deep trenches reach it. Six hundred atmospheres of pressure — about a tonne pressing on every thumbnail.",
  },
  {
    id: "challenger",
    at: [0.855, 0.912],
    d: 10935,
    kind: "beat",
    depth: "−10,935 m",
    title: "Challenger Deep",
    body: "The bottom of the Mariana Trench, and the deepest point on Earth. Fewer people have been here than have walked on the Moon.",
  },
  {
    id: "silence",
    at: [0.912, 0.945],
    d: 10935,
    kind: "silence",
    depth: "−10,935 m",
    title: "—",
    body: "You are now four kilometres deeper than any submarine in any navy can go.",
  },
  {
    id: "ascent",
    at: [0.945, 0.976],
    d: 60,
    kind: "ascent",
    depth: "ascending",
    title: "Come up slow",
    body: "The whole climb back has to be slower than your smallest bubbles. Breathe out the entire way. Never hold it.",
  },
  {
    id: "safety",
    at: [0.977, 0.996],
    d: 5,
    kind: "beat",
    depth: "−5 m",
    title: "Safety stop",
    body: "Three minutes hanging at five metres to let the nitrogen ease back out of your blood. This is the part you are not allowed to rush.",
  },
  {
    id: "surface-out",
    at: [0.996, 1.0],
    d: 0,
    kind: "surface",
    depth: "0 m",
    title: "Surface",
    body: "Inflate, roll onto your back, spit out the reg. The pier is right where you left it.",
  },
];
