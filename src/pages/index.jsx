import { Link, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { SplitText } from "gsap/all";
import { useEffect, useRef } from "react";
import TechStack from "../components/sections/TechStack";
import Experience from "../components/sections/Experience";
import SelectedWork from "../components/sections/SelectedWork";
import Contact from "../components/sections/Contact";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "4+", label: "Companies" },
];

function Home() {
  gsap.registerPlugin(ScrambleTextPlugin, SplitText);

  const imageGlow = useRef();
  const location = useLocation();

  // Scroll to a section when arriving via a "/#section" nav link from another route.
  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) {
      const id = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      return () => clearTimeout(id);
    }
  }, [location]);

  const description =
    "I'm a passionate Web Developer based in Melbourne, dedicated to crafting seamless web applications with meticulous attention to detail.";

  useGSAP(() => {
    const runAnimations = () => {
      const imageGlowTL = gsap.timeline({ delay: 3, yoyo: true, repeat: -1 });
      imageGlowTL
        .to(imageGlow.current, {
          boxShadow: "10px 15px 10px #bfdbfe",
          duration: 2,
        })
        .to(imageGlow.current, {
          boxShadow: "-10px 15px 10px #fb923c",
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
      gsap.fromTo(
        "#name",
        {
          x: "150%",
        },
        {
          x: 0,
          duration: 2,
          delay: 1,
        }
      );
      gsap.to("#description", {
        duration: 2,
        scrambleText: description,
        delay: 1.5,
        ease: "none",
      });
    };

    window.addEventListener("introScreenUp", runAnimations);

    return () => {
      window.removeEventListener("introScreenUp", runAnimations);
    };
  });

  return (
    <MainLayout>
      <div className="fixed inset-0 size-full bg-[url('/images/stars.jpeg')] bg-cover bg-center" />

      <main className="w-full flex flex-col items-center overflow-hidden pb-10">
        {/* Hero */}
        <section className="w-full min-h-screen flex flex-col justify-center md:items-center px-6 pt-32 pb-16">
          <div className=" projectView w-full max-w-5xl">
            <div className="projectView bg-black/70 grid grid-cols-2 max-md:grid-cols-1 gap-4 p-7 overflow-hidden text-left text-cyan-200 shadow-2xl rounded ring-1 ring-white/10 drop-shadow-2xl">
              <div className="aspect-square profile-image w-1/2 min-w-56 m-auto">
                <img ref={imageGlow} className="rounded-lg" src="/images/Matthew.jpg" alt="Matthew Catalfamo" />
              </div>
              <div className="flex flex-col sm:justify-center space-y-5">
                <div>
                  <div className="font-bold">
                    <p id={"name"} className="text-3xl min-h-[3rem] my-0.5">
                      I'm <span className="italic font-thin">Matthew Catalfamo</span>
                    </p>
                    <span className="min-h-[5rem] font-normal" id="description"></span>
                  </div>
                  <br />
                </div>

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

                <div className="flex flex-wrap gap-8 pt-2">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-[Impact] text-cyan-200 leading-none">{stat.value}</p>
                      <p className="text-xs uppercase tracking-widest text-cyan-200/60 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <TechStack />
        <Experience />
        <SelectedWork />
        <Contact />
      </main>
    </MainLayout>
  );
}

export default Home;
