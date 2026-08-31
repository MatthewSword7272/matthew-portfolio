import type { Metadata } from "next";
import Transition from "./Transition";

export const metadata: Metadata = {
  title: "useTransition Demo",
  description: "A React useTransition demo rendering a virtualised 20,000-item list without blocking input.",
};

export default function TransitionPage() {
  return <Transition />;
}
