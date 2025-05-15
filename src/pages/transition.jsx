import React, { useState, useTransition } from "react";
import MainLayout from "../layouts/MainLayout";
import { PiSpiral } from "react-icons/pi";
import { FixedSizeList as VirtualList } from "react-window";

const Transition = () => {
  const [isPending, startTransition] = useTransition();

  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const LIST_SIZE = 20000;

  function handleChange(value) {
    setInput(value);
    const l = [];

    startTransition(() => {
      for (let index = 0; index < LIST_SIZE; index++) {
        l.push(value);
      }

      setList(l);
    });
  }

  return (
    <MainLayout>
      <div
        className={
          "block py-32 h-[50vh] bg-gradient-to-b from-purple-700 via-pink-600 to-orange-500 text-center space-y-5"
        }
      >
        <input
          className="w-1/2 px-6 py-0.5 text-lg rounded-full border-4 border-yellow-400 bg-purple-100 text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 shadow-lg"
          type="text"
          name="word"
          onChange={(e) => handleChange(e.target.value)}
        />
        {isPending && (
          <div className={"text-white"}>
            <PiSpiral className={"text-5xl mr-2  inline-block animate-spin"} />
            <span>Loading...</span>
          </div>
        )}
        {input.length !== 0 && list.length !== 0 && (
          <VirtualList
            height={320}
            itemCount={list.length}
            itemSize={35}
            width="50%"
            className={
              "revealOut overflow-y-scroll h-80 w-1/2 bg-slate-400 rounded mx-auto"
            }
          >
            {({ index, style }) => (
              <div style={style} className="text-center">
                {list[index]}
              </div>
            )}
          </VirtualList>
        )}
      </div>
    </MainLayout>
  );
};

export default Transition;
