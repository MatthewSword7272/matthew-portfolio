import { animate, stagger } from "animejs";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef } from "react";
import "../assets/dot.scss";

const DotGrid = () => {
  const title = useRef(null);
  useEffect(() => {
    animate(title.current, {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 1000,
      easing: "easeOutBack",
    });
  }, []);

  return (
    <MainLayout className="">
      <div className={"relative grid h-screen place-content-center bg-slate-900"}>
        <div className="text-white text-center space-y-5 mb-5">
          <h2 ref={title} className="rainbow_text_animated font-bold text-3xl">
            Magical Grid
          </h2>
          <p>A Grid that uses Anime.js to create animations</p>
          <p>Click on a dot and see something magical</p>
        </div>
        <Grid />
      </div>
    </MainLayout>
  );
};

const GRID_WIDTH = 25;
const GRID_HEIGHT = 20;

const Grid = () => {
  const dots = [];
  let index = 0;

  useEffect(() => {
    animate(".dot", {
      scale: [0, 1],
      opacity: [0, 0.5],
      delay: stagger(2),
      easing: "easeOutBack",
      duration: 700,
    });
  }, []);

  const handleDotClick = (e) => {
    const index = parseInt(e.currentTarget.dataset.index);
    animate(".dot", {
      "--h": (_, i) => {
        // get the relative position in [0, totalDots)
        const rel = i - index;
        // turn that into a fraction of the full set
        const frac = rel / (GRID_WIDTH * GRID_HEIGHT);
        // multiply by 360° and wrap into [0,360)
        const hue = (360 * frac) % 360;
        // ensure positive
        return hue < 0 ? hue + 360 : hue;
      },
      scale: [
        { to: 1.35, easing: "easeOutSine", duration: 250 },
        { to: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { to: 15, easing: "easeOutSine", duration: 250 },
        { to: 0, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { to: 1, easing: "easeOutSine", duration: 250 },
        { to: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: index,
      }),
    });

    setTimeout(() => {
      animate(".dot", {
        scale: [
          { to: 0.35, easing: "easeOutSine", duration: 250 },
          { to: 1, easing: "easeInOutQuad", duration: 500 },
        ],
        opacity: [{ to: 1, easing: "easeOutSine", duration: 750 }],
        delay: stagger(100, {
          grid: [GRID_WIDTH, GRID_HEIGHT],
          from: index,
        }),
      });
    }, 1000);
  };

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          onClick={handleDotClick}
          data-index={index}
          className={"group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"}
          key={`${i}-${j}`}
        >
          <div
            className={"dot size-2 rounded-full opacity-50 group-hover:from-indigo-600 group-hover:to-white"}
            data-index={index}
          />
        </div>
      );

      index++;
    }
  }

  return (
    <div style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }} className={`grid w-fit`}>
      {dots}
    </div>
  );
};

export default DotGrid;
