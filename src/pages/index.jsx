import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

function Home() {
  gsap.registerPlugin(ScrambleTextPlugin);

  const description =
    "I'm a passionate Web Developer based in Melbourne, dedicated to crafting seamless web applications with meticulous attention to detail.";
  const description2 =
    "I recently graduated from Swinburne University with a Bachelor of Computer Science (Professional) and am currently honing my skills as a Web Developer. My technical expertise spans front-end technologies like React, TypeScript, Vue.js, and Tailwind, back-end frameworks including Node.js, PHP, and Laravel, plus DevOps tools like AWS and Docker.";

  useGSAP(() => {
    gsap.to("#hello", {
      duration: 2,
      scrambleText: "Welcome!",
      delay: 0.5,
    });
    gsap.to("#description", {
      duration: 2,
      scrambleText: description,
      delay: 0.5,
    });
    gsap.to("#description2", {
      duration: 2,
      scrambleText: description2,
      delay: 0.5,
    });
  });
  return (
    <MainLayout>
      <div className="fixed inset-0 size-full bg-[url('/images/stars.jpeg')] bg-cover bg-center" />
      <main className="w-full flex max-md:flex-col py-2 px-6 overflow-hidden justify-center md:items-center z-10 relative">
        <div className="bg-black/70 w-full projectView lg:h-4/5">
          <div className="h-full delay-500 projectView grid grid-cols-2 max-md:grid-cols-1 gap-4 p-7 overflow-hidden text-left text-cyan-200 shadow-2xl rounded inset-shadow-sm inset-shadow-white/20 drop-shadow-2xl">
            <h1
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
              className="leading-none content-center w-fit text-justify revealUp font-[Impact] uppercase text-cyan-200"
            >
              Matthew
              <hr />
              Catalfamo
            </h1>
            <div className="flex flex-col sm:justify-center space-y-5">
              {/* <p className="text-5xl revealUp">Welcome</p> */}
              <div className="">
                <p className="font-bold">
                  <span className="text-3xl" id="hello"></span> <br />
                  <span id="description"></span>
                </p>
                <br />
                <p id="description2"></p>
              </div>
              {/* <p className="text-3xl tracking-widest underline decoration-dotted revealUp">I create web pages</p> */}
              <div className="flex justify-evenly flex-wrap gap-5">
                <button className="revealLeft w-fit xl:text-xl bg-cyan-950 text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
                  <Link to="/about-me">Get to know more about me!</Link>
                </button>
                <button className="revealLeft w-fit xl:text-xl bg-cyan-950 text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
                  <Link to="/projects">Check out my Work</Link>
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
