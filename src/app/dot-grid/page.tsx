import type { Metadata } from "next";
import DotGrid from "./DotGrid";

export const metadata: Metadata = {
  title: "Magical Dot Grid",
  description: "An interactive dot grid built with anime.js — click a dot and watch the ripple.",
};

export default function DotGridPage() {
  return <DotGrid />;
}
