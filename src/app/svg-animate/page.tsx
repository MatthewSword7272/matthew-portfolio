import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animate SVG",
  description: "Using the SVG <animate> element to move text along a path.",
};

const text = "Welcome to my World of Design! * ";
const longText = text.repeat(4);

export default function SvgAnimatePage() {
  return (
    <section>
      <svg className="w-full" viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg">
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
  );
}
