"use client";

import { useState, useTransition } from "react";
import { PiSpiral } from "react-icons/pi";
import { FixedSizeList as VirtualList, type ListChildComponentProps } from "react-window";

const LIST_SIZE = 20000;

const Row = ({ index, style, data }: ListChildComponentProps<string[]>) => (
  <div style={style} className="text-center">
    {data[index]}
  </div>
);

const Transition = () => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);

  function handleChange(value: string) {
    setInput(value);

    startTransition(() => {
      const l: string[] = [];
      for (let index = 0; index < LIST_SIZE; index++) {
        l.push(value);
      }
      setList(l);
    });
  }

  return (
    <div className="block py-32 h-[50vh] bg-linear-to-b from-purple-700 via-pink-600 to-orange-500 text-center space-y-5">
      <input
        className="w-1/2 px-6 py-0.5 text-lg rounded-full border-4 border-yellow-400 bg-purple-100 text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 shadow-lg"
        type="text"
        name="word"
        onChange={(e) => handleChange(e.target.value)}
      />
      {isPending && (
        <div className="text-white">
          <PiSpiral className="text-5xl mr-2 inline-block animate-spin" />
          <span>Loading...</span>
        </div>
      )}
      {input.length !== 0 && list.length !== 0 && (
        <VirtualList
          height={320}
          itemCount={list.length}
          itemSize={35}
          width="50%"
          itemData={list}
          className="revealOut overflow-y-scroll h-80 w-1/2 bg-slate-400 rounded mx-auto"
        >
          {Row}
        </VirtualList>
      )}
    </div>
  );
};

export default Transition;
