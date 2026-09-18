// Colour picking for the orb. Hue is the only thing that is truly random —
// saturation and lightness are held in a band that always reads well against
// the near-black stage, so no click ever lands on a muddy or washed-out orb.

export interface Hsl {
  /** 0–360 */
  h: number;
  /** 0–1 */
  s: number;
  /** 0–1 */
  l: number;
}

const MIN_HUE_JUMP = 60;

export function randomColour(prevHue?: number): Hsl {
  let h = Math.random() * 360;
  if (prevHue !== undefined) {
    // Land somewhere in the (360 - 2 * MIN_HUE_JUMP)° arc opposite-ish the old
    // hue so every pulse is a visible change, never a near-repeat.
    h = (prevHue + MIN_HUE_JUMP + Math.random() * (360 - 2 * MIN_HUE_JUMP)) % 360;
  }
  return { h, s: 0.65 + Math.random() * 0.2, l: 0.5 + Math.random() * 0.1 };
}

/** Interpolate two colours, taking the short way round the hue wheel. */
export function mixHsl(a: Hsl, b: Hsl, t: number): Hsl {
  let dh = b.h - a.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  return {
    h: (a.h + dh * t + 360) % 360,
    s: a.s + (b.s - a.s) * t,
    l: a.l + (b.l - a.l) * t,
  };
}

export function toHex({ h, s, l }: Hsl): string {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
