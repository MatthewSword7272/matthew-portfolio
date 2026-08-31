"use client";

import { useState, useRef } from "react";
import "@/assets/marquee.css";
import Marquee from "react-fast-marquee";
import { motion, useInView } from "motion/react";

const items = ["This", "Is", "Who", "You", "Are", "A", "Marquee", "Component"];

const MotionItem = ({ children }: { children: React.ReactNode }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const inView = useInView(itemRef);

  return (
    <motion.div
      ref={itemRef}
      dragConstraints={{ left: -1000, right: 1000 }}
      dragElastic={0.2}
      drag
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 2 }}
      className="mx-5 z-50 overflow-visible!"
    >
      {children}
    </motion.div>
  );
};

const MarqueeComponent = () => {
  const [reverseDirection, setReverseDirection] = useState(false);
  const [speed, setSpeed] = useState(50);

  const reverse = () => setReverseDirection((v) => !v);
  const increaseSpeed = () => setSpeed((prev) => prev + 10);
  const decreaseSpeed = () => setSpeed((prev) => prev - 10);

  return (
    <div className="grow pt-25 text-white">
      <h1 className="text-center text-3xl font-bold mb-5 text-white!">
        A Interactive Marquee
      </h1>
      <p className="text-center! text-xl pb-5 border-b-2 border-gray-500 border-dotted">
        This was made using React-Fast-Marquee and Framer-motion
      </p>
      <div className="text-4xl flex flex-col items-center justify-center relative">
        <Marquee
          pauseOnHover
          gradient
          gradientColor="rgba(143, 143, 143, 0.45)"
          speed={speed}
          autoFill
          className="cursor-grab active:cursor-grabbing h-32 overflow-visible!"
          direction={reverseDirection ? "right" : "left"}
        >
          {items.map((item, index) => (
            <MotionItem key={index}>{item}</MotionItem>
          ))}
        </Marquee>
        <div className="flex justify-center mt-4 gap-4 text-xl">
          <button
            onClick={increaseSpeed}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Increase Speed
          </button>
          <button
            onClick={decreaseSpeed}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Decrease Speed
          </button>
          <button
            onClick={reverse}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Reverse Direction
          </button>
        </div>
      </div>
      <div className="w-full text-center mt-10 underline">
        Try to grab the words
      </div>
    </div>
  );
};

export default MarqueeComponent;
