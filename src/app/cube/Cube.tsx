"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FACE_SIZE = 3;
const ITEM_SIZE = 240;
const ITEM_DISTANCE = 40;

const Cube = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const query = e.target.value.trim();

    timeoutRef.current = setTimeout(async () => {
      if (query.length > 0) {
        try {
          const { data } = await axios.get("https://pixabay.com/api/", {
            params: {
              key: process.env.NEXT_PUBLIC_PIXABAY_API,
              q: encodeURIComponent(query),
              per_page: 54,
              orientation: "horizontal",
            },
          });
          setImageData(data.hits.map((hit: { webformatURL: string }) => hit.webformatURL));
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
    if (imageData.length < 54 || !cubeRef.current) return;

    const items = cubeRef.current.children;
    const cellSize = ITEM_SIZE + ITEM_DISTANCE;
    const cubeSize = cellSize * FACE_SIZE;
    const origin = -cubeSize * 0.5 + cellSize * 0.5;

    let count = 0;

    const faceTransforms = [
      "",
      "rotateY(180deg)",
      "rotateY(-90deg)",
      "rotateY(90deg)",
      "rotateX(90deg)",
      "rotateX(-90deg)",
    ];

    for (let faceId = 0; faceId < 6; faceId++) {
      for (let i = 0; i < FACE_SIZE; i++) {
        for (let j = 0; j < FACE_SIZE; j++) {
          const item = items[count++] as HTMLElement;
          const baseTransform = `translateX(${j * cellSize + origin}px) translateY(${
            i * cellSize + origin
          }px) translateZ(${cubeSize * 0.5}px)`;

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
    if (!cube || !container) return;

    const setRotY = gsap.quickSetter(cube, "rotationY", "deg");
    const setRotX = gsap.quickSetter(cube, "rotationX", "deg");
    let isDragging = false;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const point = "touches" in e ? e.touches[0] : e;
      const xRatio = point.clientX / window.innerWidth;
      const yRatio = point.clientY / window.innerHeight;
      const rotY = (xRatio - 0.5) * 200;
      const rotX = -(yRatio - 0.5) * 200;

      // gsap stashes the current values on the element under `_gsap`
      const gs = (cube as unknown as { _gsap?: { rotationY?: string; rotationX?: string } })._gsap;

      gsap.to(
        {},
        {
          duration: 0.5,
          onUpdate(this: gsap.core.Tween) {
            setRotY(gsap.utils.interpolate(parseFloat(gs?.rotationY ?? "0") || 0, rotY, this.progress()));
            setRotX(gsap.utils.interpolate(parseFloat(gs?.rotationX ?? "0") || 0, rotX, this.progress()));
          },
          ease: "power3.out",
        },
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
    container.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  });

  return (
    <div className="py-25">
      <div className="flex flex-col items-center space-y-5">
        <h1 className="text-white!">Cube Gallery</h1>
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
            <div key={index} style={{ backgroundImage: `url(${image})` }} className="cubic-gallery-item" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cube;
