import type { Metadata } from "next";
import MarqueeComponent from "./MarqueeComponent";

export const metadata: Metadata = {
  title: "An Interactive Marquee",
  description: "A fun marquee component built with react-fast-marquee and Framer Motion.",
};

export default function MarqueePage() {
  return <MarqueeComponent />;
}
