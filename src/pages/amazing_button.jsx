import React from "react";
import MainLayout from "../layouts/MainLayout";
import { gsap } from "gsap";

const AmazingButton = () => {
  let tl = gsap.timeline();

  const handleClick = () => {
    tl.to('.button', {
        duration: 1,
        scale: 6,
        repeat: 1,
        yoyo: true,
        keyframes: [
            { backgroundColor: "red",    rotation:  60 },
            { backgroundColor: "orange", rotation: 120 },
            { backgroundColor: "yellow", rotation: 180 },
            { backgroundColor: "green",  rotation: 240 },
            { backgroundColor: "blue",   rotation: 300 },
            { backgroundColor: "purple", rotation: 360 }
          ]
    })
}

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-96">
        <button
          onClick={handleClick}
          className={`button rounded-3xl bg-black text-white text-2xl px-6 py-2 hover:shadow-2xl`}
        >
          Click Me!
        </button>
      </div>
    </MainLayout>
  );
};

export default AmazingButton;
