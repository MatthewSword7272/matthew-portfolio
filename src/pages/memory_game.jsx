import { useEffect, useState } from "react";
import Card from "../components/Card";
import MainLayout from "../layouts/MainLayout";
import shuffleCards from "../utils/shuffledCards";
import { Dialog, DialogPanel } from "@headlessui/react";
import { motion } from "framer-motion";

const MemoryGame = () => {
  const [cards, setCards] = useState(() => shuffleCards());
  const [matchedCards, setMatchedCards] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  function addFlippedCard(card) {
    setCards((prev) => prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)));

    setFlippedCards((prev) => [...prev, card]);
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 500);
    }

    if (matchedCards === cards.length / 2) {
      setTimeout(() => {
        setGameWon(true);
      }, 500);
    }

    function checkForMatch() {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.name === secondCard.name) {
        setMatchedCards((prev) => prev + 1);

        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id ? { ...card, matched: true, flipped: true } : card
          )
        );
      } else {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id ? { ...card, flipped: false } : card
          )
        );
      }
      setFlippedCards([]);
    }
  }, [flippedCards, matchedCards]);

  return (
    <MainLayout>
      <Dialog
        open={gameWon}
        as={motion.div}
        onClose={() => {}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        className={"inset-0 bg-black/50 z-50 fixed overflow-hidden"}
      >
        <DialogPanel
          className={
            "absolute p-9 inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-400 w-64 h-fit rounded-xl shadow-xl"
          }
        >
          <p className={"text-center text-4xl font-bold h-full content-center"}>You Win!</p>

          <button onClick={() => window.location.reload()} className={"hover:underline text-center block mx-auto mt-3"}>
            Click here to refresh
          </button>
        </DialogPanel>
      </Dialog>
      <div className="flex items-center flex-col justify-center mx-auto space-y-5 pb-10">
        <h2 className="font-bold">Memory Game</h2>
        <p>Click on the Cards and try to match them up!</p>
        <p>
          Cards Matched: <span>{matchedCards}</span>
        </p>
        <div className="grid md:grid-cols-4 grid-cols-3 gap-10">
          {cards.map((card) => (
            <Card addFlippedCard={addFlippedCard} card={card} key={card.id} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MemoryGame;
