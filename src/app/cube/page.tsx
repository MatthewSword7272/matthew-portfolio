import type { Metadata } from "next";
import Cube from "./Cube";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "3-D Image Cube",
  description: "A draggable 3D image cube built with GSAP — search a term and it fills with photos.",
};

const howItsBuilt = [
  {
    title: "Photos from Pixabay",
    body: "The search box is debounced by 600ms, then Axios asks the Pixabay API for 54 landscape images, which is six faces of a 3 × 3 grid. If a search comes back empty or short, a toast or inline message tells you to try another term.",
  },
  {
    title: "A cube made of divs",
    body: "There's no WebGL. Each photo is a div with a CSS transform: it's rotated to its face (rotateY or rotateX), moved to its cell in the 3 × 3 grid, then pushed out by half the cube's size with translateZ. The parent uses perspective and preserve-3d to turn 54 flat tiles into a solid shape.",
  },
  {
    title: "Drag to rotate",
    body: "While you hold the mouse or a finger down, the pointer's position on the screen maps to up to ±100° of rotation on each axis. gsap.quickSetter writes the rotation, and a short power3 tween eases from the current angle to the new one, so the cube trails your cursor smoothly instead of snapping.",
  },
];

export default function CubePage() {
  return (
    <>
      <Cube />
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "React", "TypeScript", "GSAP", "Axios", "Pixabay API", "Tailwind CSS"]}
        folder="cube"
      />
    </>
  );
}
