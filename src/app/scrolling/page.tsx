import type { Metadata } from "next";
import Scrolling from "./Scrolling";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "GSAP Scrolling",
  description: "A demonstration of scroll-triggered GSAP animations with pinning and scrubbing.",
};

const howItsBuilt = [
  {
    title: "Scrubbed, not triggered",
    body: "Every animation here uses ScrollTrigger with scrub: true. Instead of playing once when a section comes into view, the animation's progress is tied directly to the scrollbar, so scrolling back up plays it in reverse.",
  },
  {
    title: "Pinned panels",
    body: "The orange and purple panels pin when they reach the top of the screen and stay put for a full viewport of scrolling (end: \"+=100%\"). ScrollTrigger adds matching padding underneath, so the rest of the page catches up when a panel unpins.",
  },
  {
    title: "Timelines on scroll",
    body: "Each pinned panel runs a timeline instead of a single tween. The orange panel draws its line and then spins two boxes in from a negative scale. The purple panel spins its paragraph in, draws its line at a random angle and shifts the background from purple to green, all tied to the same scroll range.",
  },
  {
    title: "Scoped and cleaned up",
    body: "All the tweens are created inside a gsap.context scoped to the component, and it's reverted on unmount. Pins and triggers don't leak onto the next page when you navigate away, which matters in a single-page Next.js app.",
  },
];

export default function ScrollingPage() {
  return (
    <>
      <Scrolling />
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "React", "TypeScript", "GSAP", "ScrollTrigger", "Tailwind CSS"]}
        folder="scrolling"
      />
    </>
  );
}
