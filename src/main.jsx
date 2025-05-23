import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Home from "./pages/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutMe from "./pages/AboutMe.jsx";
import Project from "./pages/[slug].jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Projects from "./pages/projects.jsx";
import AmazingButton from "./pages/amazing_button.jsx";
import MarqueeComponent from "./pages/marquee.jsx";
import Scrolling from "./pages/scrolling.jsx";
import Path from "./pages/path.jsx";
import SvgAnimate from "./pages/svg_animate.jsx";
import Transition from "./pages/transition.jsx";
import Cube from "./pages/cube.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter element={<MainLayout />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/:projectId" element={<Project />} />
        <Route path="/amazing-button" element={<AmazingButton />} />
        <Route path="/marquee" element={<MarqueeComponent />} />
        <Route path="/scrolling" element={<Scrolling />} />
        <Route path="/path" element={<Path />} />
        <Route path="/svg-animate" element={<SvgAnimate />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/cube" element={<Cube />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
