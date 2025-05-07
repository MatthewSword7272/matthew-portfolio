import React, { useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import { gsap } from "gsap";

const AmazingButton = () => {
  let tl = gsap.timeline();
  const buttonRef = useRef(null);

  const handleClick = () => {
    const button = buttonRef.current;

    tl.to(button, {
      duration: 1,
      scale: 6,
      repeat: 1,
      yoyo: true,
      keyframes: [
        { backgroundColor: "red", rotation: 60 },
        { backgroundColor: "orange", rotation: 120 },
        { backgroundColor: "yellow", rotation: 180 },
        { backgroundColor: "green", rotation: 240 },
        { backgroundColor: "blue", rotation: 300 },
        { backgroundColor: "purple", rotation: 360 },
      ],
    });

    const clones = [];

    for (let i = 0; i < 10; i++) {
      const clone = button.cloneNode(true);
      clone.classList.add("clone");
      document.body.appendChild(clone);
      gsap.set(clone, {
        position: "absolute",
        top: button.getBoundingClientRect().top + "px",
        left: button.getBoundingClientRect().left + "px",
      });
      clones.push(clone);
    }

    clones.forEach((clone, i) => {
      gsap.to(clone, {
        x: Math.cos((i / clones.length) * Math.PI * 2) * 200,
        y: Math.sin((i / clones.length) * Math.PI * 2) * 200,
        opacity: 0,
        duration: 2,
        onComplete: () => {
          clone.remove();
        },
      });
    });

    tl.to(button, {
      duration: 0.1,
      x: 10,
      repeat: 5,
      yoyo: true,
    })
      .to(button, {
        textShadow: "0 0 10px lime",
        boxShadow: "0 0 30px lime",
        duration: 0.3,
      })
      .to(button, {
        filter: "hue-rotate(360deg) contrast(200%)",
        duration: 0.5,
      });
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-96 ">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className={`button z-[9999] rounded-3xl bg-black text-white text-2xl px-6 py-2`}
        >
          Click Me!
        </button>
      </div>
    </MainLayout>
  );
};

export default AmazingButton;
