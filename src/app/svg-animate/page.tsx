import type { Metadata } from "next";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "Animate SVG",
  description: "Using the SVG <animate> element to move text along a path.",
};

const text = "Welcome to my World of Design! * ";
const longText = text.repeat(4);

const howItsBuilt = [
  {
    title: "No JavaScript at all",
    body: "This page is a server component with no client code. The motion comes from SVG's built-in <animate> element, so the browser runs the animation itself, and it keeps running even with JavaScript turned off.",
  },
  {
    title: "Text on a wave",
    body: "An invisible path is drawn with one quadratic curve (Q) followed by smooth continuations (T), which makes an even wave across the viewBox. A <textPath> then lays the text along it, so each letter follows the curve.",
  },
  {
    title: "Animating startOffset",
    body: "The <animate> element moves the textPath's startOffset from 0% to −100% over 20 seconds, linearly and forever. The line is repeated four times so the path never runs out of text while it slides.",
  },
];

export default function SvgAnimatePage() {
  return (
    <>
      <section>
        <svg
          className="w-full"
          viewBox="0 0 500 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="path"
              d="M0 60 Q 37.5 50, 75 60 T 150 60 T 225 60 T 300 60 T 375 60 T 450 60 T 525 60"
              fill="none"
              stroke="transparent"
              strokeWidth="2"
            />
          </defs>

          <text fontSize="16px" fill="#fff">
            <textPath href="#path" startOffset="0%">
              {longText}
              <animate
                attributeName="startOffset"
                from="0%"
                to="-100%"
                dur="20s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </textPath>
          </text>
        </svg>
      </section>
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "SVG", "SMIL <animate>"]}
        folder="svg-animate"
      />
    </>
  );
}
