import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import Home from './pages/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutMe from './pages/AboutMe.jsx'
import Project from './pages/[slug].jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Projects from './pages/projects.jsx'
import AmazingButton from './pages/amazing_button.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter element={<MainLayout />}>

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/:projectId" element={<Project />} />
        <Route path="/amazing-button" element={<AmazingButton />} />
      </Routes>
      

    </BrowserRouter>
  </StrictMode>,
)
