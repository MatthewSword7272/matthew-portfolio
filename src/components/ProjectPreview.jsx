import React from 'react'
import { Link } from 'react-router-dom'

const ProjectPreview = ({title, description, imageUrl, link, delay}) => {
  // const delay = Math.floor(Math.random() * 1000) + 500;

  const style = {
    animationDelay: `${delay}ms`,
  }

  return (
    <a className={`bg-white shadow-md rounded-lg h-full relative projectView`} style={style} href={link} target="_blank">
        <img src={imageUrl} alt="Project Thumbnail" className="object-cover rounded-lg" />
        <div className='absolute text-center inset-0 translate-1/2 bg-gray-50/70 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4'>
           <div className=''>
              <h2 className="text-xl font-medium mb-2">{title}</h2>
              <p className="text-black">{description}</p>
           </div>
        </div>
    </a>

  )
}

export default ProjectPreview
