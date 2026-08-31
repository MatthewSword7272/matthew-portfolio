import type { Metadata } from "next";
import MemoryGame from "./MemoryGame";

export const metadata: Metadata = {
  title: "Memory Game",
  description: "A card-matching memory game with animals — test your might.",
};

export default function MemoryGamePage() {
  return <MemoryGame />;
}
