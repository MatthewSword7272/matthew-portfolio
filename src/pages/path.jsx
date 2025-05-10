import React, { useLayoutEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

import gsap from "gsap";
import MainLayout from "../layouts/MainLayout";
import { FaChevronDown } from "react-icons/fa6";

const Path = () => {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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
        "#circle",
        {
          drawSVG: 0,
        },
        0
      );

      tl.to(
        "#circle",
        {
          opacity: 0,
        },
        0.5
      );

      tl.from(
        "#circleText",
        {
          opacity: 0,
        },
        0.5
      );

      // gsap.to("#circleText", {
      //   attr: { startOffset: "100%" },
      //   duration: 10,
      //   repeat: -1,
      //   rotation: "+=20",
      //   ease: "none",
      // });
    });

    return () => ctx.revert();
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

        <svg
          className="mb-5"
          width="800"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="circle"
            d="M 560 160 A 200 200 0 1 0 560 560 A 200 200 0 1 0 560 160"
            stroke="#000"
            fill="none"
          />

          <text fontSize={"50px"} letterSpacing={"24px"}>
            <textPath
              id="circleText"
              href="#circle"
              method="align"
              spacing="auto"
            >
              abcdefghijklmnopqrstuvwxyz
            </textPath>
          </text>
        </svg>
      </section>
    </MainLayout>
  );
};

export default Path;
