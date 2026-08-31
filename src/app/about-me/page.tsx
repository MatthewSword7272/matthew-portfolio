import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Matthew Catalfamo — a Melbourne-based full-stack developer, Bachelor of Computer Science (Professional) from Swinburne, retro-gaming enthusiast and PADI diver.",
};

export default function AboutMePage() {
  return <AboutContent />;
}
