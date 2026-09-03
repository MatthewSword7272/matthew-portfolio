/** Live dive state, shared by reference between the stage and the canvas.
 *
 *  This object is mutated in place on every animation frame and is deliberately
 *  *not* React state — nothing in the scene re-renders while you scroll. The
 *  stage writes it, `Particles` reads it. */
export interface Sim {
  /** Eased master progress, 0..1 — what the scene is actually drawn from. */
  p: number;
  /** Raw scroll progress, 0..1 — what `p` is chasing. */
  target: number;
  /** Current depth in metres, derived from `p`. */
  depth: number;
  /** False once the ascent begins. */
  descending: boolean;
}

export const createSim = (): Sim => ({ p: 0, target: 0, depth: 0, descending: true });
