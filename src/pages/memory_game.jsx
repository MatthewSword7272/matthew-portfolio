import { useState } from "react";
import Card from "../components/Card";
import MainLayout from "../layouts/MainLayout";

const MemoryGame = () => {
  const cards = [
    {
      name: "dog",
      image: "./images/memory/dog.jpg",
    },
    {
      name: "cat",
      image: "./images/memory/cat.jpg",
    },
    {
      name: "fish",
      image: "./images/memory/fish.jpg",
    },
  ];

  const [matchedCards, setMatchedCards] = useState(0);

  const doubleCards = [...cards, ...cards].map((card, id) => ({
    ...card,
    id: id,
    flipped: false,
    matched: false,
  }));

  const shuffledCards = shuffle(doubleCards);

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <MainLayout>
      <div className="flex items-center flex-col justify-center mx-auto space-y-5 pb-10">
        <h2 className="font-bold">Memory Game</h2>
        <p>Click on the Cards and try to match them up!</p>
        <p>
          Cards Matched: <span>{matchedCards}</span>
        </p>
        <div className="grid md:grid-cols-4 grid-cols-3 gap-10">
          {shuffledCards.map((card) => (
            <Card key={card.id} image={card.image} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MemoryGame;
