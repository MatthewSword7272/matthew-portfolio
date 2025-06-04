import { useEffect, useState } from "react";
import Card from "../components/Card";
import MainLayout from "../layouts/MainLayout";
import shuffleCards from "../utils/shuffledCards";

const MemoryGame = () => {
  const [cards, setCards] = useState(() => shuffleCards());
  const [matchedCards, setMatchedCards] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  function addFlippedCard(card) {
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

    setFlippedCards((prev) => [...prev, card]);
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000); // Small delay to let animations complete
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
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, matched: true, flipped: true }
              : card
          )
        );
      } else {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false }
              : card
          )
        );
      }
      setFlippedCards([]);
    }
  }, [cards.length, flippedCards, matchedCards]);

  return (
    <MainLayout>
      {gameWon && (
        <div className={" absolute inset-0 bg-black/50 z-50"}>
          <div
            className={
              "absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-400 w-64 h-24 rounded-xl shadow-xl"
            }
          >
            <p
              className={"text-center text-4xl font-bold h-full content-center"}
            >
              You Win!
            </p>
          </div>
        </div>
      )}
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
