import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='p-6 flex items-center justify-between bg-gray-100'>
    <Link to='/'>
    <h1>
        Matthew Catalfamo
    </h1>
    </Link>
      <nav className='flex gap-5 justify-between'>
        <Link to='/test'>Projects</Link>
        <Link to='/Matthew_Catalfamo_CV.pdf' target='_blank'>Resume</Link>
      </nav>
    </header>
  )
}

export default Header
