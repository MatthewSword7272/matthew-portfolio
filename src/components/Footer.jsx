import React from 'react'
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='bg-white p-4 flex flex-col items-center justify-center gap-5 text-xl'>
        <h2 className=''>Contact Me</h2>
        <a href='mailto:mcatalfamo5@gmail.com'>mcatalfamo5@gmail.com</a>
        <a className='size-8' href='https://www.linkedin.com/in/matthew-catalfamo-0a353a25a/' target='_blank'>
            <FaLinkedin className='text-3xl hover:text-blue-500' />
        </a>
    </footer>
  )
}

export default Footer
