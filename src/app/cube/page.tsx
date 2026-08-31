import type { Metadata } from "next";
import Cube from "./Cube";

export const metadata: Metadata = {
  title: "3-D Image Cube",
  description: "A draggable 3D image cube built with GSAP — search a term and it fills with photos.",
};

export default function CubePage() {
  return <Cube />;
}
