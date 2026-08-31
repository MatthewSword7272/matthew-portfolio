import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Client website builds at Metronome and Visual Moda, plus interactive front-end experiments with GSAP, Framer Motion and anime.js.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
