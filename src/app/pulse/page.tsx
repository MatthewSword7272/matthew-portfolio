import type { Metadata } from "next";
import Pulse from "./Pulse";

export const metadata: Metadata = {
  title: "Pulse",
  description:
    "An interactive orb drawn with Paper.js — a rim light follows your cursor, and every click sends a shockwave and a new colour through it.",
  openGraph: {
    title: "Pulse — Matthew Catalfamo",
    description: "Move to light it, click to pulse.",
    type: "article",
  },
};

const SOURCE_URL =
  "https://github.com/MatthewSword7272/matthew-portfolio/tree/main/src/app/pulse";

const howItsBuilt = [
  {
    title: "Paper.js, kept apart from React",
    body: "The whole scene lives in orb.ts as Paper.js. Pulse.tsx only owns the canvas and the pointer and keyboard events, then hands them to the orb. Paper.js touches window as soon as it loads, so it's imported dynamically in an effect and never runs during the static export.",
  },
  {
    title: "Recomputed every frame",
    body: "There's no animation timeline. Each frame rebuilds the orb from a handful of numbers: the pointer, a spring, a wobble and a colour tween. It squashes under a spring, ripples after a pulse and bulges toward the light. Resizing just changes the centre and the radius.",
  },
  {
    title: "Light and colour",
    body: "The body, halo, rim light and specular glint are all radial gradients that follow a smoothed light direction, blended with screen mode so they add light rather than paint over each other. Each pulse picks a new hue at least 60° away from the last one, and saturation and lightness stay in a band that always reads well on the dark background.",
  },
  {
    title: "Charge, shockwaves and the hex readout",
    body: "Holding the pointer, Space or Enter builds charge that squashes the orb and makes it tremble. Letting go sends out shockwave rings, and a full charge hits more than twice as hard. The new colour's hex code scrambles in with GSAP's ScrambleText plugin. With reduced motion turned on, the orb still changes colour, but without the bounce, ripple or rings.",
  },
];

export default function PulsePage() {
  return (
    <>
      <Pulse />
      <section
        id="about"
        className=" bg-[#050509] px-6 py-20 text-white sm:px-10 sm:py-28"
      >
        <div className="mx-auto max-w-3xl">

          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
            Why I built this
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-white/80">
            <p>

              I wanted to make a interactive, and constantly changing object.
              The goal was one small, polished interaction
              instead of a big feature list, where the lighting, the spring
              and the colour changes are tuned until clicking it feels good.
            </p>
            <p>
              It was also a chance to see how far I could push a small
              creative-coding piece while pairing with Claude Code. I set the
              direction and the feel, and used it to iterate quickly on the
              maths and the details.
            </p>
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight sm:text-4xl">
            How it&apos;s built
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {howItsBuilt.map(({ title, body }) => (
              <div key={title} className="border-t border-white/15 pt-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-base text-white">
            Next.js  ·  TypeScript  ·  Paper.js  ·  GSAP  ·  Tailwind CSS
          </p>

          <div className="mt-8 flex gap-6 text-xs tracking-widest">
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              View source ↗
            </a>
            <a
              href="#"
              className="text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              Back to the Orb ↑
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
