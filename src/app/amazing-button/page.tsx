import type { Metadata } from "next";
import AmazingButton from "./AmazingButton";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "The Amazing Button",
  description: "A button component that does a thing in GSAP.",
};

const howItsBuilt = [
  {
    title: "One timeline, queued up",
    body: "The button's own animations go onto a single GSAP timeline kept in a ref. Every tween is appended to the end, so clicking again doesn't fight the animation that's already running. It just joins the queue.",
  },
  {
    title: "Rainbow keyframes",
    body: "The first tween scales the button up six times while GSAP keyframes step it through red, orange, yellow, green, blue and purple, turning it 60° each time. With yoyo and a single repeat, it plays the whole thing backwards to shrink back down.",
  },
  {
    title: "A ring of clones",
    body: "Each click clones the button ten times, stacks the clones on top of the original, then sends each one outward along its own angle (cos and sin of i / 10 × 2π) to a 200px circle while fading it out. Each clone removes itself when its tween finishes, so nothing is left in the DOM.",
  },
  {
    title: "The finish",
    body: "Then comes a quick side-to-side shake (a tiny x tween repeated with yoyo), a lime glow from textShadow and boxShadow, and a hue-rotate plus contrast filter that pushes the colours somewhere strange.",
  },
];

export default function AmazingButtonPage() {
  return (
    <>
      <AmazingButton />
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"]}
        folder="amazing-button"
      />
    </>
  );
}
