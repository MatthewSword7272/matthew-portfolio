"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import "@/assets/dot.css";

const GRID_WIDTH = 25;
const GRID_HEIGHT = 20;

const Grid = () => {
  useEffect(() => {
    animate(".dot", {
      scale: [0, 1],
      opacity: [0, 0.5],
      delay: stagger(2),
      ease: "outBack",
      duration: 700,
    } as any);
  }, []);

  const handleDotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = parseInt(e.currentTarget.dataset.index ?? "0");

    animate(".dot", {
      "--h": (_: any, i: number) => {
        const rel = i - index;
        const frac = rel / (GRID_WIDTH * GRID_HEIGHT);
        const hue = (360 * frac) % 360;
        return hue < 0 ? hue + 360 : hue;
      },
      scale: [
        { to: 1.35, ease: "outSine", duration: 250 },
        { to: 1, ease: "inOutQuad", duration: 500 },
      ],
      translateY: [
        { to: 15, ease: "outSine", duration: 250 },
        { to: 0, ease: "inOutQuad", duration: 500 },
      ],
      opacity: [
        { to: 1, ease: "outSine", duration: 250 },
        { to: 0.5, ease: "inOutQuad", duration: 500 },
      ],
      delay: stagger(100, { grid: [GRID_WIDTH, GRID_HEIGHT], from: index }),
    } as any);

    setTimeout(() => {
      animate(".dot", {
        scale: [
          { to: 0.35, ease: "outSine", duration: 250 },
          { to: 1, ease: "inOutQuad", duration: 500 },
        ],
        opacity: [{ to: 1, ease: "outSine", duration: 750 }],
        delay: stagger(100, { grid: [GRID_WIDTH, GRID_HEIGHT], from: index }),
      } as any);
    }, 1000);
  };

  const dots: React.ReactNode[] = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          onClick={handleDotClick}
          data-index={index}
          className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
          key={`${i}-${j}`}
        >
          <div
            className="dot size-2 rounded-full opacity-50 group-hover:from-indigo-600 group-hover:to-white"
            data-index={index}
          />
        </div>,
      );
      index++;
    }
  }

  return (
    <div style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }} className="grid w-fit">
      {dots}
    </div>
  );
};

const DotGrid = () => {
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!title.current) return;
    animate(title.current, {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 1000,
      ease: "outBack",
    } as any);
  }, []);

  return (
    <div className="relative grid h-screen place-content-center bg-slate-900">
      <div className="text-white text-center space-y-4 mb-5">
        <h2 ref={title} className="rainbow_text_animated font-bold text-3xl">
          Magical Dot Grid
        </h2>
        <p>A Grid that uses Anime.js to create animations</p>
        <p>Click on a dot and see something magical!</p>
        <p>
          Expanded from{" "}
          <a
            className="underline text-blue-500"
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=wo-rf-dzoHo"
          >
            this video
          </a>
        </p>
      </div>
      <Grid />
    </div>
  );
};

export default DotGrid;
