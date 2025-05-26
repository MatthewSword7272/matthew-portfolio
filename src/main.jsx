import { StrictMode, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
const Home = lazy(() => import("./pages/index.jsx"));
const AboutMe = lazy(() => import("./pages/AboutMe.jsx"));
// const Project = lazy(() => import("./pages/[slug].jsx"));
const MainLayout = lazy(() => import("./layouts/MainLayout.jsx"));
const Projects = lazy(() => import("./pages/projects.jsx"));
const AmazingButton = lazy(() => import("./pages/amazing_button.jsx"));
const MarqueeComponent = lazy(() => import("./pages/marquee.jsx"));
const Scrolling = lazy(() => import("./pages/scrolling.jsx"));
const Path = lazy(() => import("./pages/path.jsx"));
const SvgAnimate = lazy(() => import("./pages/svg_animate.jsx"));
const Transition = lazy(() => import("./pages/transition.jsx"));
const Cube = lazy(() => import("./pages/cube.jsx"));

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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
