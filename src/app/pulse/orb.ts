/// <reference types="paper" />
// The whole Pulse scene, in Paper.js, with no React in it — the same split as
// descent/sim.ts: Pulse.tsx owns the DOM and events, this file owns the
// drawing. Everything is recomputed from a handful of numbers each frame
// (pointer, spring, wobble, colour tween), so there is no animation timeline
// to keep in sync; resize just changes `centre` and `radius`.

import { mixHsl, randomColour, toHex, type Hsl } from "./palette";

export interface Orb {
  /** Pointer position in view (CSS pixel) coordinates, or null when it leaves. */
  setPointer(x: number, y: number): void;
  clearPointer(): void;
  /** Start building charge; the next `pulse` releases it. */
  beginCharge(): void;
  /** Drop any charge without pulsing (e.g. a cancelled touch). */
  cancelCharge(): void;
  /** Where the pulse came from, in view coordinates; omit for a direct hit. */
  pulse(x?: number, y?: number): void;
  dispose(): void;
}

interface Options {
  reducedMotion: boolean;
  /** Called with the new colour's hex whenever a pulse picks one. */
  onColour?: (hex: string) => void;
}

const SEGMENTS = 72;
/** Seconds of holding to reach a full charge. */
const CHARGE_TIME = 1.2;
const TAU = Math.PI * 2;

/** Frame-rate-independent exponential approach toward `target`. */
const approach = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

interface Ring {
  path: paper.Path;
  age: number;
  delay: number;
}

export function createOrb(scope: paper.PaperScope, { reducedMotion, onColour }: Options): Orb {
  scope.activate();
  const { view, Path, Point, Color } = scope;

  let centre = view.center.clone();
  let radius = Math.min(view.size.width, view.size.height) * 0.3;

  // ---- state -------------------------------------------------------------
  let colourFrom: Hsl = randomColour();
  let colourTo: Hsl = colourFrom;
  let colourT = 1;
  onColour?.(toHex(colourTo));

  let pointer: paper.Point | null = null;
  // Glint direction is smoothed as a unit vector rather than an angle so it
  // never spins the long way round when the cursor crosses ±180°.
  let glintDir = new Point(-0.7, -0.7).normalize();
  let glintStrength = 0;
  let idleAngle = -Math.PI * 0.75;
  let lean = 0;

  let scale = 0; // spring position; rest = 1
  let velocity = 0;
  let wobble = 0; // amplitude of the jelly ripple after a pulse
  let wobblePhase = 0;
  let flash = 0; // brief brightness boost on pulse
  let charging = false;
  let charge = 0; // 0–1, builds while held and is spent by the next pulse

  const rings: Ring[] = [];

  // ---- items (bottom to top) ---------------------------------------------
  const backdrop = new Path.Rectangle(view.bounds);
  // Halo and glint are unit circles moved and scaled each frame. With
  // `applyMatrix = false` their gradients live in that unit space too, so each
  // gradient always runs centre (0,0) → edge (1,0) whatever the drawn size.
  const unitCircle = () => {
    const c = new Path.Circle(new Point(0, 0), 1);
    c.applyMatrix = false;
    return c;
  };
  const halo = unitCircle();
  const body = new Path({ closed: true });
  const rim = new Path({ closed: true, strokeCap: "round" });
  const glint = unitCircle();
  const unitOrigin = new Point(0, 0);
  const unitEdge = new Point(1, 0);

  for (let i = 0; i < SEGMENTS; i++) {
    body.add(centre);
    rim.add(centre);
  }
  rim.fillColor = null;
  rim.blendMode = "screen";
  glint.blendMode = "screen";
  halo.blendMode = "screen";

  const hsl = (c: Hsl, alpha = 1, dl = 0) =>
    new Color({ hue: c.h, saturation: c.s, lightness: clamp01(c.l + dl), alpha });

  // ---- frame -------------------------------------------------------------
  function frame(dt: number) {
    const colour = mixHsl(colourFrom, colourTo, colourT);
    colourT = reducedMotion ? 1 : Math.min(1, colourT + dt / 0.6);

    if (charging) charge = Math.min(1, charge + dt / CHARGE_TIME);

    // Spring back to rest after a pulse (under-damped → a couple of bounces).
    // Holding a charge pulls the rest point in, so the orb squashes down, and
    // it starts to tremble as it nears full.
    if (!reducedMotion) {
      const rest = 1 - 0.12 * charge;
      const force = -220 * (scale - rest) - 11 * velocity;
      velocity += force * dt;
      scale += velocity * dt;
      const tremble = charging ? 0.012 * charge * charge : 0;
      wobble = approach(wobble, tremble, charging ? 6 : 3.2, dt);
      wobblePhase += dt * (9 + 14 * charge);
    }
    flash = approach(flash, charging ? 0.5 * charge : 0, 5, dt);

    // Where should the light sit, and how bright?
    let target: paper.Point;
    let strength: number;
    if (pointer) {
      const offset = pointer.subtract(centre);
      const dist = offset.length;
      target = dist > 1 ? offset.normalize() : glintDir;
      // Brightest with the cursor right on the rim, fading as it moves away in
      // either direction; kills the glint at the dead centre where the
      // direction is meaningless.
      const nearRim = clamp01(1 - Math.abs(dist - radius) / (radius * 1.4));
      const offCentre = clamp01(dist / (radius * 0.35));
      strength = (0.25 + 0.75 * nearRim) * offCentre;
      lean = approach(lean, reducedMotion ? 0 : nearRim, 8, dt);
    } else {
      // Nobody's pointing: let the light drift slowly round on its own so the
      // orb is alive on first paint and on touch screens.
      if (!reducedMotion) idleAngle += dt * 0.35;
      target = new Point(Math.cos(idleAngle), Math.sin(idleAngle));
      strength = 0.35;
      lean = approach(lean, 0, 4, dt);
    }
    glintDir = glintDir.add(target.subtract(glintDir).multiply(1 - Math.exp(-14 * dt))).normalize();
    glintStrength = approach(glintStrength, strength, 10, dt);
    const glintAngle = Math.atan2(glintDir.y, glintDir.x);

    // Shape: base radius × spring, plus a post-pulse ripple, plus a bulge
    // leaning toward the light.
    const r0 = radius * scale;
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i / SEGMENTS) * TAU;
      let d = Math.abs(a - glintAngle) % TAU;
      if (d > Math.PI) d = TAU - d;
      const bulge = lean * 0.07 * Math.exp(-(d * d) / 0.5);
      const ripple = wobble * Math.sin(a * 5 + wobblePhase) + wobble * 0.5 * Math.sin(a * 3 - wobblePhase * 0.7);
      const r = r0 * (1 + bulge + ripple);
      const p = new Point(centre.x + Math.cos(a) * r, centre.y + Math.sin(a) * r);
      body.segments[i].point = p;
      rim.segments[i].point = p;
    }
    body.smooth({ type: "catmull-rom" });
    rim.smooth({ type: "catmull-rom" });

    const rimPoint = centre.add(glintDir.multiply(r0 * (1 + lean * 0.07)));

    // Backdrop: a faint wash of the orb's colour so the whole stage tints.
    backdrop.fillColor = new Color({
      gradient: { stops: [[hsl(colour, 1, -0.38), 0], [new Color(0.02, 0.02, 0.04), 1]], radial: true },
      origin: centre,
      destination: centre.add(new Point(Math.max(view.size.width, view.size.height) * 0.75, 0)),
    });

    // Halo: soft bloom around the orb, a touch brighter on the lit side.
    halo.position = centre.add(glintDir.multiply(radius * 0.08 * glintStrength));
    halo.scaling = new Point(r0 * 1.8, r0 * 1.8);
    halo.fillColor = new Color({
      gradient: {
        stops: [
          [hsl(colour, 0.5 + flash * 0.3), 0],
          [hsl(colour, 0.3 + flash * 0.3), 0.56],
          [hsl(colour, 0), 1],
        ],
        radial: true,
      },
      origin: unitOrigin,
      destination: unitEdge,
    });

    // Body: a lit sphere — the hot spot slides toward the light.
    const spot = centre.add(glintDir.multiply(r0 * 0.45 * (0.4 + glintStrength * 0.6)));
    body.fillColor = new Color({
      gradient: {
        stops: [
          [hsl(colour, 1, 0.22 + flash * 0.2), 0],
          [hsl(colour, 1, 0), 0.45],
          [hsl(colour, 1, -0.28), 1],
        ],
        radial: true,
      },
      origin: spot,
      destination: spot.add(new Point(r0 * 1.55, 0)),
    });

    // Rim light: a stroke that is only visible near the glint point.
    const reach = r0 * (1.1 - 0.45 * glintStrength);
    rim.strokeWidth = Math.max(2, r0 * 0.035);
    rim.strokeColor = new Color({
      gradient: {
        stops: [
          [new Color(1, 1, 1, glintStrength), 0],
          [hsl(colour, glintStrength * 0.6, 0.3), 0.45],
          [hsl(colour, 0, 0.3), 1],
        ],
        radial: true,
      },
      origin: rimPoint,
      destination: rimPoint.add(new Point(reach, 0)),
    });
    rim.shadowColor = new Color(1, 1, 1, glintStrength * 0.8);
    rim.shadowBlur = r0 * 0.12;

    // Glint: the specular flare sitting right on the rim.
    const flareR = r0 * (0.18 + 0.22 * glintStrength);
    glint.position = rimPoint;
    glint.scaling = new Point(flareR, flareR);
    glint.fillColor = new Color({
      gradient: {
        stops: [
          [new Color(1, 1, 1, glintStrength), 0],
          [hsl(colour, glintStrength * 0.35, 0.35), 0.35],
          [hsl(colour, 0, 0.35), 1],
        ],
        radial: true,
      },
      origin: unitOrigin,
      destination: unitEdge,
    });

    // Shockwave rings.
    for (let i = rings.length - 1; i >= 0; i--) {
      const ring = rings[i];
      ring.age += dt;
      const t = (ring.age - ring.delay) / 1.4;
      if (t < 0) continue;
      if (t >= 1) {
        ring.path.remove();
        rings.splice(i, 1);
        continue;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      ring.path.visible = true;
      ring.path.position = centre;
      ring.path.scaling = new Point(1 + eased * 1.6, 1 + eased * 1.6);
      ring.path.strokeColor = hsl(colourTo, (1 - t) * 0.9, 0.12);
      ring.path.strokeWidth = Math.max(0.5, radius * 0.03 * (1 - t));
    }
  }

  view.onFrame = (e: { delta: number }) => frame(Math.min(e.delta, 1 / 30));

  view.onResize = () => {
    centre = view.center.clone();
    radius = Math.min(view.size.width, view.size.height) * 0.3;
    backdrop.bounds = view.bounds.clone();
  };

  // Paint one frame immediately so the first render is not an empty canvas.
  frame(0);

  return {
    setPointer(x, y) {
      pointer = new Point(x, y);
    },
    clearPointer() {
      pointer = null;
    },
    beginCharge() {
      charging = true;
      charge = 0;
    },
    cancelCharge() {
      charging = false;
      charge = 0;
    },
    pulse(x, y) {
      charging = false;
      charge = 0;

      const current = mixHsl(colourFrom, colourTo, colourT);
      colourFrom = current;
      colourTo = randomColour(current.h);
      colourT = 0;
      onColour?.(toHex(colourTo));
      if (reducedMotion) return;

      // Full force anywhere on the orb, easing off to a third of it two radii
      // beyond the rim. No position (keyboard) counts as a direct hit.
      let force = 1;
      if (x !== undefined && y !== undefined) {
        const outside = new Point(x, y).subtract(centre).length - radius;
        force = 0.95 + 0.65 * clamp01(1 - outside / (radius * 2));
      }

      velocity += 5.5 * force;
      wobble = Math.min(0.09, wobble + 0.05 * force);
      flash = 1;
      for (let i = 0; i < 3; i++) {
        const path = new Path.Circle(centre, radius);
        path.applyMatrix = false;
        path.strokeScaling = false;
        path.fillColor = null;
        path.visible = false;
        path.insertBelow(body);
        rings.push({ path, age: 0, delay: i * 0.12 });
      }
    },
    dispose() {
      view.onFrame = null;
      view.onResize = null;
      scope.project.remove();
      scope.view.remove();
    },
  };
}
