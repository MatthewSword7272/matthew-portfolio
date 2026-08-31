"use client";

import { useEffect, useRef } from "react";
import "@/assets/card.css";
import gsap from "gsap";
import type { MemoryCard } from "@/utils/shuffledCards";
import Image from "next/image";

interface CardProps {
  card: MemoryCard;
  addFlippedCard: (card: MemoryCard) => void;
}

const Card = ({ card, addFlippedCard }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(cardRef.current, { y: -10, duration: 0.5, ease: "power1.out" }, 0);

    tl.to(
      cardRef.current,
      {
        rotateY: card.flipped ? 180 : 0,
        duration: 0.6,
        ease: "power2.inOut",
      },
      0.2,
    );

    tl.to(cardRef.current, { y: 0, duration: 0.5, ease: "power1.in" });
  }, [card.flipped]);

  const handleCardFlip = () => {
    if (!card.flipped && !card.matched) {
      addFlippedCard(card);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card ${!card.flipped ? "cursor-pointer" : ""}`}
      onClick={handleCardFlip}
    >
      <div className="card-face bg-blue-950">
        <div className="bg-white rounded-3xl w-fit p-2">
          <Image
            src="/images/mc_logo.png"
            className="md:size-14 size-7 object-contain"
            alt=""
            width={1711}
            height={1990}
          />
        </div>
      </div>
      <div className="card-face card-back">
        <div className="relative w-full h-full">
          <Image src={card.image} fill sizes="128px" className="object-cover rounded-lg" alt={card.name} />
        </div>
      </div>
    </div>
  );
};

export default Card;
