import type { Metadata } from "next";
import Scrolling from "./Scrolling";

export const metadata: Metadata = {
  title: "GSAP Scrolling",
  description: "A demonstration of scroll-triggered GSAP animations with pinning and scrubbing.",
};

export default function ScrollingPage() {
  return <Scrolling />;
}
