import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

import gsap from "gsap";
import MainLayout from "../layouts/MainLayout";
import { FaChevronDown } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";

const Path = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

  useGSAP(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section",
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
      },
    });

    tl.from(
      "#circle1",
      {
        drawSVG: 0,
      },
      0
    );

    tl.from(
      "#circle2",
      {
        drawSVG: 0,
      },
      0
    );
    tl.from(
      "#circle3",
      {
        drawSVG: 0,
      },
      0
    );

    tl.to(
      "#circle1",
      {
        fill: "#002347",
      },
      1
    );
    tl.to(
      "#circle2",
      {
        fill: "#FFB703",
      },
      1
    );
    tl.to(
      "#circle3",
      {
        fill: "#FB8500",
      },
      1
    );

    tl.from(
      "#circleText",
      {
        opacity: 0,
      },
      2
    );

    tl.to(
      "#circle1",
      {
        opacity: 0,
      },
      2
    );

    tl.to(
      "#circle2",
      {
        opacity: 0,
      },
      2
    );

    tl.to(
      "#circle3",
      {
        opacity: 0,
      },
      2
    );
  }, []);

  return (
    <MainLayout>
      <section className="section">
        <p className="text-center">
          Scroll down
          <div className="flex justify-center">
            <FaChevronDown size={25} />
          </div>
        </p>

        <svg className="mb-5" viewBox="50 100 1000 700" xmlns="http://www.w3.org/2000/svg">
          <path id="circle1" d="M 560 160 A 200 200 0 1 0 560 560 A 200 200 0 1 0 560 160" stroke="#000" fill="none" />
          <path
            id="circle2"
            d="M 560 360 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0"
            stroke="#000"
            fill="none"
          />
          <path id="circle3" d="M 540 360 m-40,0 a40,40 0 1,1 120,0 a40,40 0 1,1 -120,0" stroke="#000" fill="none" />
          <text fontSize={"50px"} letterSpacing={"23px"}>
            <textPath id="circleText" href="#circle1" method="align" spacing="auto" startOffset="0%">
              abcdefghijklmnopqrstuvwxyz
              <animate attributeName="startOffset" from="0%" to="100%" dur="20s" repeatCount="indefinite" />
            </textPath>
          </text>
          <text fontSize={"50px"} letterSpacing={"23px"}>
            <textPath id="circleText" href="#circle1" method="align" spacing="auto" startOffset="-100%">
              abcdefghijklmnopqrstuvwxyz
              <animate attributeName="startOffset" from="-100%" to="0%" dur="20s" repeatCount="indefinite" />
            </textPath>
          </text>
        </svg>
      </section>
    </MainLayout>
  );
};

export default Path;
