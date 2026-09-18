import type { Metadata } from "next";
import MarqueeComponent from "./MarqueeComponent";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "An Interactive Marquee",
  description: "A fun marquee component built with react-fast-marquee and Framer Motion.",
};

const howItsBuilt = [
  {
    title: "react-fast-marquee does the scrolling",
    body: "The loop itself comes from react-fast-marquee. autoFill repeats the words until the row is full, pauseOnHover stops it when you reach for a word, and a gradient fades out the edges. Speed and direction are plain React state passed in as props, so the buttons change them live.",
  },
  {
    title: "Every word is draggable",
    body: "Each word is wrapped in a Motion motion.div with drag turned on. dragConstraints and dragElastic let you pull a word well off the track, and it springs back into the marquee when you let go.",
  },
  {
    title: "Fading in on view",
    body: "Each word tracks its own visibility with Motion's useInView and fades in over two seconds the first time it scrolls onto the screen, so new copies ease in instead of just appearing.",
  },
];

export default function MarqueePage() {
  return (
    <>
      <MarqueeComponent />
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "React", "TypeScript", "react-fast-marquee", "Motion", "Tailwind CSS"]}
        folder="marquee"
      />
    </>
  );
}
