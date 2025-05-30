import React, { useLayoutEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import "../assets/scolling.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { FaChevronDown } from "react-icons/fa6";

const Scrolling = () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const container = useRef(null);

  useLayoutEffect(() => {
    // create a context so all selectors are scoped to this component
    let ctx = gsap.context(() => {
      // first line
      gsap.from(line1.current, {
        scrollTrigger: {
          trigger: line1.current,
          start: "top bottom",
          end: "80vh 50%",
          scrub: true,
        },
        scaleX: 0,
        transformOrigin: "center",
        ease: "circ.in",
      });

      // second line
      // gsap.from(line2.current, {
      //   scrollTrigger: {
      //     trigger: line2.current.closest("section"),
      //     start: "top top",
      //     end: "+=100%",
      //     scrub: true,
      //     pin: true,
      //   },
      //   scaleX: 0,
      //   transformOrigin: "left center",
      //   ease: "none",
      // });

      var tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: line2.current.closest("section"),
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      tl2
        .from(
          line2.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            ease: "none",
          },
          0
        )
        .from(
          box1.current,
          {
            backgroundColor: "purple",
            rotation: 720,
            opacity: 0,
            scale: -10,
          },
          1
        )
        .from(
          box2.current,
          {
            backgroundColor: "blue",
            rotation: 720,
            opacity: 0,
            scale: -10,
          },
          1
        );

      // third section timeline
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".purple",
          scrub: true,
          pin: true,
          start: "top top",
          end: "+=100%",
        },
      });

      tl.from(".purple p", {
        scale: 0.3,
        rotation: 180,
        autoAlpha: 0,
        ease: "power2",
      })
        .from(
          line3.current,
          {
            scaleX: 0,
            scaleZ: 2,
            z: 200,
            rotate: () => gsap.utils.random(-180, 180),
            transformOrigin: "left center",
            ease: "none",
          },
          0
        )
        .to(".purple", { backgroundColor: "#28a92b", rotate: 0 }, 0);
    }, container);

    // cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <MainLayout>
      <div className="" ref={container}>
        <section className="h-screen bg-blue-400 flex flex-col items-center justify-center space-y-2">
          <h1>Navigation links with smooth scrolling</h1>
          <caption>
            This example is from{" "}
            <a
              className="underline hover:text-blue-100"
              href="https://codepen.io/GreenSock/pen/xxjErmp"
              target="_blank"
            >
              https://codepen.io/GreenSock/pen/xxjErmp
            </a>
          </caption>
          <p>
            ScrollTrigger works great with navigation links within the page! Try clicking one of the links above and see
            how ScrollTrigger stays perfectly synced.
          </p>
          <div className="scroll-down flex flex-col items-center justify-center">
            Scroll down
            <div className="arrow">
              <FaChevronDown size={25} />
            </div>
          </div>
        </section>
        <section className="h-screen bg-gradient-to-b from-pink-400 to-white flex flex-col items-center justify-center">
          <span ref={line1} className="line line-1"></span>
          <p>
            his line's animation will begin when it enters the viewport and finish when its top edge hits the top of the
            viewport, staying perfectly in sync with the scrollbar because it has <code>scrub:&nbsp;true</code>
          </p>
        </section>
        <section className="h-screen !py-20 orange bg-gradient-to-b to-white from-orange-400 flex flex-col items-center justify-center relative">
          <span ref={line2} className="line line-2"></span>
          <p className="text-ellipsis max-lg:h-40">
            This orange panel gets pinned when its top edge hits the top of the viewport, then the line's animation is
            linked with the scroll position until it has traveled 100% of the viewport's height (
            <code>end: "+=100%"</code>), then the orange panel is unpinned and normal scrolling resumes. Padding is
            added automatically to push the rest of the content down so that it catches up with the scroll when it
            unpins. You can set <code>pinSpacing: false</code> to prevent that if you prefer.
          </p>
          <div ref={box1} className="absolute rounded bg-green-600 size-24 top-1/4 left-1/4"></div>
          <div ref={box2} className="absolute rounded bg-red-600 size-24 top-1/4 right-1/4"></div>
        </section>
        <section className="h-screen purple bg-gradient-to-b from-purple-400 to-white flex flex-col items-center justify-center">
          <span ref={line3} className="line line-3"></span>
          <p className="overflow-hidden text-ellipsis max-lg:h-40">
            This panel gets pinned in a similar way, and has a more involved animation that's wrapped in a timeline,
            fading the background color and animating the transforms of the paragraph in addition to the line, all
            synced with the scroll position perfectly.
          </p>
        </section>
        <section className="h-screen bg-green-400 flex flex-col items-center justify-center">
          <p>DONE</p>
        </section>
      </div>
    </MainLayout>
  );
};

export default Scrolling;
