import { animate, createTimeline, stagger } from "animejs";
import MainLayout from "../layouts/MainLayout";

const DotGrid = () => {
  return (
    <MainLayout>
      <div
        className={"relative grid h-screen place-content-center bg-slate-900"}
      >
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

  const handleDotClick = (e) => {
    const index = parseInt(e.currentTarget.dataset.index);
    animate(".dot", {
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
          className={
            "group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
          }
          key={`${i}-${j}`}
        >
          <div
            className={
              "dot size-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
            }
            data-index={index}
          />
        </div>
      );

      index++;
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className={`grid w-fit`}
    >
      {dots}
    </div>
  );
};

export default DotGrid;
