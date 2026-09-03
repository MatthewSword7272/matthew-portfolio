import type { Metadata } from "next";
import Descent from "./Descent";

export const metadata: Metadata = {
  title: "The Descent",
  description:
    "A scroll-driven dive from Rye Pier in Port Phillip Bay to the bottom of the Mariana Trench. Procedural water, light and life — no photographs.",
  openGraph: {
    title: "The Descent — Matthew Catalfamo",
    description: "Scroll to descend: 7 metres of pier dive, then another 11 kilometres to Challenger Deep.",
    type: "article",
  },
};

export default function DescentPage() {
  return <Descent />;
}
