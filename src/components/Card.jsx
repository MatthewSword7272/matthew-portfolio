import { useEffect, useRef } from "react";
import "../assets/card.scss";
import gsap from "gsap";

const Card = ({ card, addFlippedCard }) => {
  // const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(
      cardRef.current,
      {
        y: -10,
        duration: 0.5,
        ease: "power1.out",
      },
      0
    );

    tl.to(
      cardRef.current,
      {
        rotateY: card.flipped ? 180 : 0,
        duration: 0.6,
        ease: "power2.inOut",
      },
      0.2
    );

    tl.to(cardRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power1.in",
    });
  }, [card.flipped]);

  const handleCarFlip = () => {
    if (!card.flipped && !card.matched) {
      addFlippedCard(card);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card ${!card.flipped ? "cursor-pointer" : ""}`}
      onClick={handleCarFlip}
    >
      {/* <p>Front</p> */}
      <div className="card-face bg-blue-950">
        <div className="bg-white rounded-3xl w-fit p-2">
          <img
            src="./images/mc_logo.png"
            className="md:size-14 size-7"
            alt=""
          />
        </div>
      </div>
      {/* <p>Back</p> */}
      <div className="card-face card-back">
        <div className="relative w-full h-full ">
          <img
            className="object-cover h-full rounded-lg"
            src={card.image}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Card;
