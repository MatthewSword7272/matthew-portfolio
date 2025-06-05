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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter element={<MainLayout />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
