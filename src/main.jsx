import { StrictMode, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Home from "./pages/index.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import Projects from "./pages/projects.jsx";
// const Project = lazy(() => import("./pages/[slug].jsx"));
const AmazingButton = lazy(() => import("./pages/amazing_button.jsx"));
const MarqueeComponent = lazy(() => import("./pages/marquee.jsx"));
const Scrolling = lazy(() => import("./pages/scrolling.jsx"));
const Transition = lazy(() => import("./pages/transition.jsx"));
const Cube = lazy(() => import("./pages/cube.jsx"));
import Path from "./pages/path.jsx";
// const Path = lazy(() => import("./pages/path.jsx"));
import SvgAnimate from "./pages/svg_animate.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
const MemoryGame = lazy(() => import("./pages/memory_game.jsx"));
const DotGrid = lazy(() => import("./pages/dot_grid.jsx"));

const projects = [
  {
    title: "One Two Boxing",
    description: "Revamped the One Two Boxing website using React and Tailwind CSS",
    imageUrl: "/images/one_two_boxing.png",
    link: "https://onetwoboxing.com.au/",
  },
  {
    title: "The Amazing Button",
    description: "A button component that does a thing in GSAP",
    imageUrl: "/images/button.png",
    link: "/amazing-button",
  },
  {
    title: "An Interactive Marquee",
    description: "A fun marquee component built with Fast Marquee and Framer Motion",
    imageUrl: "/images/marquee.png",
    link: "/marquee",
  },
  {
    title: "Memory Game",
    description: "A Memory Game with Animals, test your might",
    imageUrl: "/images/memory.png",
    link: "/memory-game",
  },
  {
    title: "GSAP Scrolling",
    description: "A Demonstration of a GSAP Scrolling Animation",
    imageUrl: "/images/scrolling.png",
    link: "/scrolling",
  },
  {
    title: "Animate Svg",
    description: "Using the animate tag in SVG to animate the text",
    imageUrl: "/images/svg-animate.png",
    link: "/svg-animate",
  },
  {
    title: "GSAP Draw Svg",
    description: "Using GSAP DrawSVG and ScrollTrigger to create a Scroll Animation with this SVG",
    imageUrl: "/images/path.png",
    link: "/path",
  },
  {
    title: "3-D Image Cube",
    description: "A movable 3D Cube with images you can search for",
    imageUrl: "/images/cube.png",
    link: "/cube",
  },
  {
    title: "Magical Dot Grid",
    description: "A Dot Grid that uses Anime.js to create animations",
    imageUrl: "/images/dot_grid.png",
    link: "/dot-grid",
  },
  {
    title: "React useTransition",
    description:
      "Demonstrates useTransition by generating a large list in the background while keeping the UI smooth and interactive.",
    imageUrl: "/images/transition.png",
    link: "/transition",
  },
  // {
  //   title: "Natalie Catalfamo Designs",
  //   description: "Recrated my sister's online portfolio",
  //   imageUrl: "",
  //   link: "/natalie",
  // },
];

projects.forEach((project) => {
  const img = new Image();
  img.src = project.imageUrl;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter element={<MainLayout />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects projects={projects} />} />
        <Route path="/about-me" element={<AboutMe />} />
        {/* <Route path="/:projectId" element={<Project />} /> */}
        <Route path="/amazing-button" element={<AmazingButton />} />
        <Route path="/marquee" element={<MarqueeComponent />} />
        <Route path="/scrolling" element={<Scrolling />} />
        <Route path="/path" element={<Path />} />
        <Route path="/svg-animate" element={<SvgAnimate />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/cube" element={<Cube />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/dot-grid" element={<DotGrid />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
