import type { Metadata } from "next";
import Path from "./Path";

export const metadata: Metadata = {
  title: "GSAP Draw SVG",
  description: "Using GSAP DrawSVGPlugin and ScrollTrigger to draw an SVG along the scroll.",
};

export default function PathPage() {
  return <Path />;
}
