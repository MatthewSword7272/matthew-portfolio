import type { Metadata } from "next";
import AmazingButton from "./AmazingButton";

export const metadata: Metadata = {
  title: "The Amazing Button",
  description: "A button component that does a thing in GSAP.",
};

export default function AmazingButtonPage() {
  return <AmazingButton />;
}
