import type { Metadata } from "next";
import Path from "./Path";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "GSAP Draw SVG",
  description: "Using GSAP DrawSVGPlugin and ScrollTrigger to draw an SVG along the scroll.",
};

const howItsBuilt = [
  {
    title: "One pinned timeline",
    body: "The whole piece is one GSAP timeline on a pinned section with scrub: true and end: \"+=450%\". The timeline is stretched across four and a half screens of scrolling, so how far you've scrolled decides how far the drawing has got.",
  },
  {
    title: "Drawing with DrawSVG",
    body: "The three circles are plain SVG paths. DrawSVGPlugin animates each stroke from nothing to complete, all starting together. Halfway through, they fill in navy, yellow and orange, then fade out.",
  },
  {
    title: "Letters on a loop",
    body: "The alphabet runs around the outer circle using two <textPath>s. Native SVG <animate> moves one from 0% to 100% and the other from −100% to 0%, so there's no gap as the text wraps around. GSAP only fades them in at the end of the scroll.",
  },
  {
    title: "Cleanup with useGSAP",
    body: "The timeline is created inside the useGSAP hook, which reverts it and kills the ScrollTrigger when the component unmounts. The pin doesn't carry over onto other pages.",
  },
];

export default function PathPage() {
  return (
    <>
      <Path />
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "React", "TypeScript", "GSAP", "DrawSVG", "ScrollTrigger", "Tailwind CSS"]}
        folder="path"
      />
    </>
  );
}
