import type { Metadata } from "next";
import DotGrid from "./DotGrid";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "Magical Dot Grid",
  description: "An interactive dot grid built with anime.js — click a dot and watch the ripple.",
};

const howItsBuilt = [
  {
    title: "500 dots, one CSS variable",
    body: "The grid is 25 × 20 plain divs. Each dot's gradient is built from hsl(var(--h), …), so colouring a dot only means changing its --h custom property, and Anime.js can animate a CSS variable like any other value.",
  },
  {
    title: "A ripple from the click",
    body: "Anime.js's grid stagger, stagger(100, { grid: [25, 20], from: index }), delays each dot by its distance from the one you clicked. One animate() call over every dot turns into a wave that spreads out from your cursor.",
  },
  {
    title: "Hue by distance",
    body: "Each dot's new hue is a function of its index relative to the clicked dot, spread over 360°. Wherever you click becomes the start of the rainbow, and the colours wrap around the grid from there.",
  },
  {
    title: "Two waves",
    body: "The first wave pops each dot up, drops it 15px and brightens it. A second later a follow-up wave shrinks the dots and springs them back, which gives it a double pulse. On load the dots scale in with a 2ms stagger, so the grid fills in instead of just appearing.",
  },
];

export default function DotGridPage() {
  return (
    <>
      <DotGrid />
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "React", "TypeScript", "Anime.js", "Tailwind CSS"]}
        folder="dot-grid"
      />
    </>
  );
}
