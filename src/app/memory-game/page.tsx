import type { Metadata } from "next";
import MemoryGame from "./MemoryGame";
import HowItsBuilt from "@/components/HowItsBuilt";

export const metadata: Metadata = {
  title: "Memory Game",
  description: "A card-matching memory game with animals — test your might.",
};

const howItsBuilt = [
  {
    title: "A shuffled deck",
    body: "Nine animals are doubled into 18 cards, and each card gets an id plus flipped and matched flags. A Fisher–Yates shuffle orders the deck once, when the game first renders, so each game is a new layout.",
  },
  {
    title: "Two cards at a time",
    body: "Flipped cards go into their own piece of state, capped at two. Once there are two, an effect waits a second so you can see them, then compares the names. A match locks both cards face up, and a miss flips them back over.",
  },
  {
    title: "A 3D flip with GSAP",
    body: "Each card has two faces with backface-visibility: hidden, back to back. When a card's flipped flag changes, a short GSAP timeline lifts it 10px, rotates it 180° on the Y axis and sets it back down, so the flip has some weight.",
  },
  {
    title: "Winning",
    body: "When the matched pairs reach half the deck, a Headless UI dialog fades in with Motion to show the win, and one click starts a fresh shuffle.",
  },
];

export default function MemoryGamePage() {
  return (
    <>
      <MemoryGame />
      <HowItsBuilt
        items={howItsBuilt}
        tech={["Next.js", "React", "TypeScript", "GSAP", "Motion", "Headless UI", "Tailwind CSS"]}
        folder="memory-game"
      />
    </>
  );
}
