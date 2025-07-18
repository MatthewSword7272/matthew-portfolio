import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import SplitText from "gsap/SplitText";
import { useRef } from "react";

function Home() {
  gsap.registerPlugin(ScrambleTextPlugin, SplitText);

  const imageGlow = useRef();

  const description =
    "I'm a passionate Web Developer based in Melbourne, dedicated to crafting seamless web applications with meticulous attention to detail.";
  const description2 =
    "I recently graduated from Swinburne University with a Bachelor of Computer Science (Professional) and am currently honing my skills as a Web Developer. My technical expertise spans front-end technologies like React, TypeScript, Vue.js, and Tailwind, back-end frameworks including Node.js, PHP, and Laravel, plus DevOps tools like AWS and Docker.";

  useGSAP(() => {
    const imageGlowTL = gsap.timeline({ yoyo: true, repeat: -1 });
    imageGlowTL
      .to(imageGlow.current, {
        boxShadow: "0 10px 15px -3px #bfdbfe",
        duration: 2,
        delay: 2,
      })
      .to(imageGlow.current, {
        boxShadow: "0 10px 15px -3px #fb923c",
        duration: 2,
      });

    let split = SplitText.create("#name", {
      type: "words, chars",
      position: "relative",
    });
    gsap.from(split.chars, {
      y: 200,
      duration: 1,
      stagger: 0.05,
      delay: 1,
    });
    gsap.to("#hello", {
      duration: 2,
      scrambleText: "Welcome!",
      delay: 1.5,
      ease: "none",
    });
    gsap.to("#description", {
      duration: 2,
      scrambleText: description,
      delay: 1.5,
      ease: "none",
    });
    // gsap.to("#description2", {
    //   duration: 2,
    //   scrambleText: description2,
    //   ease: "none",
    //   delay: 1.5,
    // });
  });
  return (
    <MainLayout>
      <div className="fixed inset-0 size-full bg-[url('/images/stars.jpeg')] bg-cover bg-center" />
      <main className="w-full md:h-screen flex max-md:flex-col py-2 px-6 overflow-hidden justify-center md:items-center z-10 relative">
        <div className="bg-black/70 projectView h-3/4">
          <div className="h-full delay-500 projectView grid grid-cols-2 max-md:grid-cols-1 gap-4 p-7 overflow-hidden text-left text-cyan-200 shadow-2xl rounded inset-shadow-sm inset-shadow-white/20 drop-shadow-2xl">
            {/* <h1
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
              className="leading-none overflow-hidden content-center w-fit text-justify revealUp font-[Impact] uppercase text-cyan-200"
              id="name"
            >
              Matthew
              <hr />
              Catalfamo
            </h1> */}
            <div className="aspect-square profile-image w-1/2 min-w-56 m-auto">
              <img ref={imageGlow} className="rounded-lg" src="/images/ME.jpg" alt="" />
            </div>
            <div className="flex flex-col sm:justify-center space-y-5">
              {/* <p className="text-5xl revealUp">Welcome</p> */}
              <div className="">
                <div className="font-bold">
                  <span className="text-3xl min-h-[3rem]" id="hello"></span> <br />
                  <p className="text-3xl min-h-[3rem] my-0.5">
                    I'm <span className="italic font-thin">Matthew Catalfamo</span>
                  </p>
                  <span className="min-h-[5rem] font-normal" id="description"></span>
                </div>
                <br />
                {/* <p className="min-h-[8rem]" id="description2"></p> */}
              </div>
              {/* <p className="text-3xl tracking-widest underline decoration-dotted revealUp">I create web pages</p> */}
              <div className="flex justify-evenly flex-wrap gap-5">
                <button className="revealLeft w-fit xl:text-xl bg-cyan-950 text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
                  <Link to="/about-me">Get to know more about me!</Link>
                </button>
                <button className="revealLeft w-fit xl:text-xl bg-cyan-950 text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
                  <Link to="/projects">Check out my Projects</Link>
                </button>
                <button className="revealLeft w-fit xl:text-xl bg-cyan-950 text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
                  <Link to="./Matthew_Catalfamo_CV.pdf" target="_blank">
                    My Resume
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Home;
