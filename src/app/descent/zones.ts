// Data + math for "The Descent" — a scroll-driven dive from Rye Pier
// (Port Phillip Bay, max ~6 m) down the full ocean water column to the bottom
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
  /** Depth in metres at the middle of the beat's window — where its copy sits
   *  at full opacity. Derived from depthAt(), never hand-written, so it cannot
   *  drift away from the curve the scene is actually drawn from. Drives the
   *  fallback background colour and StaticDescent's progress readout. */
  d: number;
  depth: string;
  title: string;
  body: string;
  kind: "beat" | "transition" | "silence" | "ascent" | "surface";
}

// --- small maths ------------------------------------------------------------

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const invlerp = (a: number, b: number, v: number) => (a === b ? 0 : clamp01((v - a) / (b - a)));

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)] as const;
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

// Every key sits on the *midpoint* of the beat that names it — the part of the
// window where the copy is at full opacity. That is what keeps the rail reading
// 40 m while you are reading "The Limit"; keys placed at a beat's start let the
// curve run 2-3x past its own headline before the beat had finished. Depth still
// moves throughout, so the fall never stops, it is just centred on the number.
//
// `log: true` on a key means "interpolate the segment *ending* here in log
// space rather than linear metres" — see depthAt() for why the ascent needs it.
const DEPTH_KEYS: { p: number; d: number; log?: boolean }[] = [
  { p: 0.0, d: 0 },
  { p: 0.105, d: 3 }, // pile
  { p: 0.1825, d: 4 }, // seadragon
  { p: 0.2575, d: 5 }, // crabs
  { p: 0.3, d: 6 }, // bottom — the pier's real floor
  { p: 0.36, d: 6 }, // hold on the sand for that whole beat
  { p: 0.46, d: 24 }, // the Rip
  { p: 0.5175, d: 40 }, // recreational limit
  { p: 0.585, d: 200 }, // twilight
  { p: 0.6625, d: 1000 }, // midnight
  { p: 0.7425, d: 4000 }, // abyssal plain
  { p: 0.8175, d: 6000 }, // hadal
  { p: 0.8835, d: 10935 }, // Challenger Deep — arrives mid-beat, then settles
  { p: 0.945, d: 10935 }, // on the bottom: the deep + silence beats both read here
  { p: 0.975, d: 5, log: true }, // ascent — even, unhurried, all the way up
  { p: 0.994, d: 5 }, // safety stop hold
  { p: 0.997, d: 0 }, // break the surface as the last beat opens
  { p: 1.0, d: 0 },
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

/** Fixed labels down the right-hand rail, placed on the same log scale as the
 *  live marker so the 7 m pier dive gets real estate instead of one pixel.
 *
 *  Every depth here is one the dive actually holds at in DEPTH_KEYS above, so
 *  the marker settles exactly on a tick at the end of each beat rather than
 *  near it. Add a key up there and it belongs here too. */
export const RAIL_MARKS: { d: number; label: string }[] = [
  { d: 6, label: "Pier 6 m" },
  { d: 24, label: "The Rip 24 m" },
  { d: 40, label: "Rec limit 40 m" },
  { d: 200, label: "Twilight 200 m" },
  { d: 1000, label: "Midnight 1 km" },
  { d: 4000, label: "Abyss 4 km" },
  { d: 6000, label: "Hadal 6 km" },
  { d: 10935, label: "Trench 10.9 km" },
];

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

const SCRIPT: Omit<Beat, "d">[] = [
  {
    id: "surface-in",
    at: [0.0, 0.055],
    kind: "beat",
    depth: "0m",
    title: "Rye Pier",
    body: "Port Phillip Bay, 7:14 am. Fifteen degree water, a light current running under the pier. One giant jump off the end of the pier and the bay closes over your head.",
  },
  {
    id: "pile",
    at: [0.075, 0.135],
    kind: "beat",
    depth: "−3m",
    title: "Down we go",
    body: "Every timber post is furred with sea sponge, barnacles, urchins and mussels. A vertical garden built over eighty years under the jetty. A school of small fishes circles around you.",
  },
  {
    id: "seadragon",
    at: [0.15, 0.215],
    kind: "beat",
    depth: "−4m",
    title: "Weedy seadragon",
    body: "Endemic to southern Australia and almost nowhere else. It doesn't really swim, it drifts. You would mistake it for a torn leaf that grew a spine and a long pipe of a snout.",
  },
  {
    id: "crabs",
    at: [0.225, 0.29],
    kind: "beat",
    depth: "−5m",
    title: "Spider crab winter",
    body: "Once a year tens of thousands of giant spider crabs crawl onto the sand to moult at the same time. Safety in a slow, clattering mountain of legs.",
  },
  {
    id: "bottom",
    at: [0.3, 0.36],
    kind: "beat",
    depth: "−6m",
    title: "The bottom",
    body: "This is as deep as Rye Pier gets. You may find a lost torch and a few bottles going green. The light is still bright enough to read your air gauge. From this point on, you can travel further and deeper.",
  },
  {
    id: "handoff",
    at: [0.375, 0.44],
    kind: "transition",
    depth: "the water keeps going",
    title: "Six metres.",
    body: "Everything you just saw fits in the first six metres of ocean. Heading away from the pier and down towards the abyss, below you is another eleven kilometres.",
  },
  {
    id: "rip",
    at: [0.435, 0.485],
    kind: "beat",
    depth: "−24m",
    title: "Port Phillip Heads",
    body: "Where the bay drains through The Rip into Bass Strait. A kilometre-wide, notoriously dangerous and fast-flowing stretch of water that runs at six knots and has sunk more than forty ships.",
  },
  {
    id: "reclimit",
    at: [0.49, 0.545],
    kind: "beat",
    depth: "−40m",
    title: "The Limit",
    body: "Nitrogen under pressure starts to feel like three or four quick drinks. For a sport diver, this is the edge.",
  },
  {
    id: "twilight",
    at: [0.55, 0.62],
    kind: "beat",
    depth: "−200m",
    title: "The twilight zone",
    body: "The Mesopelagic Zone. The layer of the ocean located between 200 and 1,000 metres below the surface. One percent of the surface light is left; the rest is now dark blue. Photosynthesis cannot happen past here.",
  },
  {
    id: "midnight",
    at: [0.625, 0.7],
    kind: "beat",
    depth: "−1,000m",
    title: "The midnight zone",
    body: "No sunlight has ever reached this deep. Most of what lives here makes its own light. The Anglerfish cast a glowing light, hanging in front of its teeth, to lure its prey.",
  },
  {
    id: "abyss",
    at: [0.705, 0.78],
    kind: "beat",
    depth: "−4,000m",
    title: "The abyssal plain",
    body: "Black, near-freezing, and almost completely still. The chilling Marine Snow is the dead microorganisms falling from the ocean above, constantly drifting down and it is the only food for the creatures that live here.",
  },
  {
    id: "hadal",
    at: [0.785, 0.85],
    kind: "beat",
    depth: "−6,000m",
    title: "The Hadel Zone",
    body: "The Deepest Regions of the Ocean. Named after Hades. Six hundred atmospheres of pressure. The creatures that live here appear quite frightening, but possibly harmless...",
  },
  {
    id: "challenger",
    at: [0.855, 0.912],
    kind: "beat",
    depth: "−10,935m",
    title: "The Challenger Deep",
    body: "Here is the bottom of the Mariana Trench, and the deepest point on Earth. Fewer people have been here than have walked on the Moon.",
  },
  {
    id: "silence",
    at: [0.912, 0.945],
    kind: "silence",
    depth: "−10,935m",
    title: "—",
    body: "You are now four Kilometres deeper than any submarine in any navy can go.",
  },
  {
    id: "ascent",
    at: [0.945, 0.976],
    kind: "ascent",
    depth: "ascending",
    title: "Come up slow",
    body: "The whole climb back has to be slower than your bubbles. Breathe out the entire way. Never hold your breath.",
  },
  {
    id: "safety",
    at: [0.977, 0.996],
    kind: "beat",
    depth: "−5m",
    title: "Safety stop",
    body: "Three minutes hanging at five metres to let the nitrogen ease back out of your blood stream. This is the part you are not allowed to rush.",
  },
  {
    id: "surface-out",
    at: [0.996, 1.0],
    kind: "surface",
    depth: "0m",
    title: "Surface",
    body: "Inflate, roll onto your back, remove the regulator. The pier is right where you left it.",
  },
];

/** The script, with each beat's depth read straight off the curve. */
export const BEATS: Beat[] = SCRIPT.map((b) => ({ ...b, d: depthAt((b.at[0] + b.at[1]) / 2) }));
