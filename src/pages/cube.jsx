import { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";

const FACE_SIZE = 3;
const ITEM_SIZE = 240;
const ITEM_DISTANCE = 40;

const Cube = () => {
  const timeOut = useRef(0);
  const cubeRef = useRef(null);
  const imgRef = useRef(null);

  const [imageData, setData] = useState([]);

  const setImageData = (data) => {
    setData(data);
    console.log(data);
  };

  const changeHandler = (e) => {
    clearTimeout(timeOut.current);

    timeOut.current = setTimeout(async () => {
      const el = e.target.value;

      if (el.length > 0) {
        const res = await axios.get("https://pixabay.com/api/", {
          params: {
            key: import.meta.env.VITE_PIXABAY_API,
            q: encodeURIComponent(el),
            image_type: "photo",
            per_page: 54,
            orientation: "horizontal",
          },
        });
        setImageData(res.data.hits.map((it) => it.webformatURL));
      }
    }, 600);
  };

  useEffect(() => {
    if (imageData.length === 0) return;

    const items = cubeRef.current.children;

    let count = 0;
    const cellSize = ITEM_SIZE + ITEM_DISTANCE;
    const cubeSize = cellSize * FACE_SIZE;
    const origin = -cubeSize * 0.5 + cellSize * 0.5;

    const buildFace = (faceId) => {
      for (let i = 0; i < FACE_SIZE; i++) {
        for (let j = 0; j < FACE_SIZE; j++) {
          const item = items[count++];

          switch (faceId) {
            case 0:
              item.style.transform = `translateX(${
                j * cellSize + origin
              }px) translateY(${i * cellSize + origin}px) translateZ(${
                cubeSize * 0.5
              }px)`;
              break;
            case 1:
              item.style.transform = `rotateY(180deg) translateX(${
                j * cellSize + origin
              }px) translateY(${i * cellSize + origin}px) translateZ(${
                cubeSize * 0.5
              }px)`;
              break;
            case 2:
              item.style.transform = `rotateY(-90deg) translateX(${
                j * cellSize + origin
              }px) translateY(${i * cellSize + origin}px) translateZ(${
                cubeSize * 0.5
              }px)`;
              break;
            case 3:
              item.style.transform = `rotateY(90deg) translateX(${
                j * cellSize + origin
              }px) translateY(${i * cellSize + origin}px) translateZ(${
                cubeSize * 0.5
              }px)`;
              break;
            case 4:
              item.style.transform = `rotateX(90deg) translateX(${
                j * cellSize + origin
              }px) translateY(${i * cellSize + origin}px) translateZ(${
                cubeSize * 0.5
              }px)`;
              break;
            case 5:
              item.style.transform = `rotateX(-90deg) translateX(${
                j * cellSize + origin
              }px) translateY(${i * cellSize + origin}px) translateZ(${
                cubeSize * 0.5
              }px)`;
              break;
          }
        }
      }
    };

    for (let i = 0; i < 6; i++) buildFace(i);

    // angleX
  }, [imageData]);

  return (
    <MainLayout>
      <div className={"flex flex-col items-center space-y-5"}>
        <h1>Cube Gallery</h1>
        <input
          type="text"
          className={"rounded block bg-white text-center text-lg w-64"}
          onChange={changeHandler}
        />
      </div>
      <div className={"cube-container"}>
        <div className={"cubic-gallery"} ref={cubeRef}>
          {imageData.map((image, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${image})` }}
              className={"cubic-gallery-item"}
            ></div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Cube;
