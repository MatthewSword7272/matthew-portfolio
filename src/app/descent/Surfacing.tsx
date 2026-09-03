import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

// Everything after the pinned stage unpins. Breaking the surface returns you to
// an ordinary scrolling document, which is the point: the piece lets go of you
// at exactly the moment the diver lets go of the water.

const LOG: { label: string; value: string }[] = [
  { label: "Site", value: "Rye Pier" },
  { label: "Deepest, actually", value: "6 m" },
  { label: "Deepest, in your head", value: "10,935 m" },
  { label: "Runtime", value: "48 min" },
  { label: "Water", value: "15 → 13 °C" },
  { label: "Gas used", value: "142 bar" },
  { label: "Visibility", value: "~6 m" },
  { label: "Buddy", value: "You" },
];

const BUILD: { title: string; body: string }[] = [
  {
    title: "One number drives everything",
    body: "Scroll progress is reduced to a single value, p. Depth, water colour, light, fog, the depth rail and every creature's position are pure functions of it — no per-element timelines and no easing state, so all of it can be recomputed exactly from one float. The only things that keep state of their own are the particle pool and the ambient caustics, which run on their own clock because the water should not freeze the moment you stop scrolling.",
  },
  {
    title: "Zero React renders while scrolling",
    body: "ScrollTrigger pins the stage and reports raw progress into a mutable ref. A single requestAnimationFrame loop eases toward it and writes straight to the DOM — transforms, opacities and textContent. React renders the markup once and then gets out of the way.",
  },
  {
    title: "Depth is logarithmic, scroll is not",
    body: "Mapped linearly, the six-metre pier dive would be an invisible sliver above eleven kilometres of nothing. Colour and the depth rail run on a log scale so the shallows keep the space they deserve, while the descent stays linear in metres and accelerates into the trench — which is what makes the fall feel like falling. The ascent is the one exception: it interpolates in log space, so the climb reads as one even rise instead of thousands of identical black metres and then a flash through every visible zone.",
  },
  {
    title: "No photographs in the dive",
    body: "Every fish and crab in the descent is inline SVG written by hand — the seadragon is a handful of bezier curves. The marine snow, bubbles and bioluminescence are one canvas particle pool whose behaviour re-interpolates with depth, and the shafts of sunlight are blurred CSS gradients left on the compositor. Nothing to license, and the only photograph on the page is the one of me at the end.",
  },
  {
    title: "The safety stop runs in phases",
    body: "The three-minute stop is a single beat's scroll window split into four: the ring fades up holding a full 3:00, then the clock actually runs down, then it sits at 0:00 long enough to read as finished, and only then does it clear as you rise. The phases are fractions of the window, so they follow if the beat is ever re-timed. Overlapping them was the first version, and it made the stop look like it started half-elapsed.",
  },
  {
    title: "Reduced motion is a real version",
    body: "With prefers-reduced-motion set, the whole thing swaps to a static article carrying all seventeen beats and the same water colours, with no pinning, scrubbing or canvas. It is the same story, not a stub.",
  },
];

export default function Surfacing() {
  return (
    <section className="relative bg-linear-to-b from-[#3f92a6] via-[#8fc6d6] to-[#e8f2f5] px-6 pb-24 pt-24 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <h3 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">You break the surface.</h3>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-slate-800/85">
          Inflate, roll onto your back, spit out the regulator. The pier is exactly where you left it and the whole bay
          is about as deep as a suburban swimming pool is long.
        </p>

        {/* --------------------------------------------------------- dive log */}
        <div className="mt-14 rounded-2xl border border-slate-900/10 bg-white/45 p-6 backdrop-blur-sm sm:p-8">
          <h3 className="text-slate-800 text-lg">Dive Log</h3>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {LOG.map((row) => (
              <div key={row.label}>
                <dt className="text-[10px] uppercase text-[12px] text-slate-600/70">{row.label}</dt>
                <dd className="mt-1 text-lg font-medium tabular-nums text-slate-900">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 border-l-2 border-slate-900/25 pl-6">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-slate-900 sm:text-3xl">
            "My deepest dive is 30 metres. I think about the other eleven kilometres a lot."
          </blockquote>
          <span className="mt-4 block text-[15px] italic text-slate-900">
            Matthew Catalfamo, PADI Advanced Open Water Diver
          </span>
        </div>

        <div className="mt-10 w-3/5">
          {/* 1050x1400 WebP, 120 KB. `images.unoptimized` is on for the static
              export, so whatever is committed here is exactly what ships — the
              source PNG was 3024x4032 and 8.5 MB for a ~460 px slot. */}
          <Image
            width={1050}
            height={1400}
            alt="Matthew Catalfamo in dive gear at the surface"
            className="object-contain rounded-lg"
            src="/images/scuba_diver.webp"
          />
        </div>

        {/* ------------------------------------------------ how I built this */}
        <div className="mt-16 rounded-2xl border border-slate-900/10 bg-white/45 p-6 backdrop-blur-sm sm:p-8">
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">How I built this</h3>

          <Accordion className="mt-6">
            {BUILD.map((item) => (
              <AccordionItem key={item.title} value={item.title} className="border-slate-900/10">
                <AccordionTrigger className="py-4 text-base font-semibold tracking-tight text-slate-900">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pr-8 text-sm leading-relaxed text-slate-800/80">
                  {item.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-3 border-t border-slate-900/10 pt-6">
            <p className="font-mono text-[10px] tracking-widest text-slate-600/70">Built with</p>
            <p className="mt-2 font-mono text-sm text-slate-800">
              React · TypeScript · GSAP ScrollTrigger · Tailwind CSS · Canvas 2D · hand-written SVG
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------ notes */}
        <p className="mt-12 text-sm leading-relaxed text-slate-700/80">
          Depths, temperatures and zone boundaries are real. Rye Pier bottoms out around 6 m; Port Phillip Heads runs to
          about 24 m; Challenger Deep, in the Mariana Trench, sits at roughly 10,935 m. The weedy seadragon and the
          winter spider crab aggregation are both genuinely why people dive this site.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            More projects
          </Link>
          <a
            href="#top"
            className="rounded-full border border-slate-900/20 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900/50"
          >
            Dive again
          </a>
        </div>
      </div>
    </section>
  );
}
