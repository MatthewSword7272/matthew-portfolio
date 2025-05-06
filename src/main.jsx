import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import Home from './pages/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Test from './pages/test.jsx'
import Project from './pages/[slug].jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/:projectId" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
