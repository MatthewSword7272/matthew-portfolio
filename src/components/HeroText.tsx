import React from "react";

const HeroText = () => {
  const words = [
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
    { text: "Ideas", imgPath: "/images/ideas.svg" },
    { text: "Concepts", imgPath: "/images/concepts.svg" },
    { text: "Designs", imgPath: "/images/designs.svg" },
    { text: "Code", imgPath: "/images/code.svg" },
  ];
  return (
    <div className={"hero-text"}>
      <h1>
        Shaping
        <span className={"slide"}>
          <span className={"wrapper"}>
            {words.map((word) => (
              <span key={word.text} className={"flex items-center md:gap-3 gap-1 pb-2"}>
                <img className={"size-1 p-1 rounded-full bg-white50"} src={word.imgPath} alt={word.text} />
                <span>{word.text}</span>
              </span>
            ))}
          </span>
        </span>
      </h1>
      <h1>Into Real Projects</h1>
      <h1>that Deliver Results</h1>
    </div>
  );
};

export default HeroText;
