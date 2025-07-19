import { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FACE_SIZE = 3;
const ITEM_SIZE = 240;
const ITEM_DISTANCE = 40;

const Cube = () => {
  const timeoutRef = useRef(null);
  const cubeRef = useRef(null);
  const containerRef = useRef(null);
  const [imageData, setImageData] = useState([]);

  const handleSearch = (e) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const query = e.target.value.trim();

      if (query.length > 0) {
        try {
          const { data } = await axios.get("https://pixabay.com/api/", {
            params: {
              key: import.meta.env.VITE_PIXABAY_API,
              q: encodeURIComponent(query),
              per_page: 54,
              orientation: "horizontal",
            },
          });
          setImageData(data.hits.map((hit) => hit.webformatURL));
        } catch (error) {
          console.error("Failed to fetch images:", error);
          setImageData([]);
        }
      } else {
        setImageData([]);
      }
    }, 600);
  };

  useEffect(() => {
    if (imageData.length < 54) return;

    const items = cubeRef.current.children;
    const cellSize = ITEM_SIZE + ITEM_DISTANCE;
    const cubeSize = cellSize * FACE_SIZE;
    const origin = -cubeSize * 0.5 + cellSize * 0.5;

    let count = 0;

    // Face transforms for cube positioning
    const faceTransforms = [
      "", // front
      "rotateY(180deg)", // back
      "rotateY(-90deg)", // left
      "rotateY(90deg)", // right
      "rotateX(90deg)", // top
      "rotateX(-90deg)", // bottom
    ];

    for (let faceId = 0; faceId < 6; faceId++) {
      for (let i = 0; i < FACE_SIZE; i++) {
        for (let j = 0; j < FACE_SIZE; j++) {
          const item = items[count++];
          const baseTransform = `translateX(${
            j * cellSize + origin
          }px) translateY(${i * cellSize + origin}px) translateZ(${
            cubeSize * 0.5
          }px)`;

          item.style.transform = faceTransforms[faceId]
            ? `${faceTransforms[faceId]} ${baseTransform}`
            : baseTransform;
        }
      }
    }
  }, [imageData]);

  useGSAP(() => {
    const container = containerRef.current;
    const cube = cubeRef.current;

    if (!cube) return;

    const setRotY = gsap.quickSetter(cube, "rotationY", "deg");
    const setRotX = gsap.quickSetter(cube, "rotationX", "deg");
    let isDragging = false;

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const xRatio = e.clientX / window.innerWidth;
      const yRatio = e.clientY / window.innerHeight;
      const rotY = (xRatio - 0.5) * 200;
      const rotX = -(yRatio - 0.5) * 200;

      gsap.to(
        {},
        {
          duration: 0.5,
          onUpdate() {
            setRotY(
              gsap.utils.interpolate(
                parseFloat(cube._gsap?.rotationY) || 0,
                rotY,
                this.progress()
              )
            );
            setRotX(
              gsap.utils.interpolate(
                parseFloat(cube._gsap?.rotationX) || 0,
                rotX,
                this.progress()
              )
            );
          },
          ease: "power3.out",
        }
      );
    };

    const handleMouseDown = () => {
      isDragging = true;
      container.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    container.addEventListener("touchend", handleMouseDown);
    window.addEventListener("touchstart", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);

      container.addEventListener("touchend", handleMouseDown);
      window.addEventListener("touchstart", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
    };
  });

  return (
    <MainLayout>
      <div className="flex flex-col items-center space-y-5">
        <h1>Cube Gallery</h1>
        {imageData.length > 0 && imageData.length < 54 && (
          <h4 className="text-red-600">Not enough results found. Try Again</h4>
        )}
        <input
          type="text"
          placeholder="Search for something"
          className="rounded bg-white text-center text-lg w-64 select-none"
          onChange={handleSearch}
        />
      </div>

      <div className="cube-container" ref={containerRef}>
        <div className="cubic-gallery" ref={cubeRef}>
          {imageData.map((image, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${image})` }}
              className="cubic-gallery-item"
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Cube;
