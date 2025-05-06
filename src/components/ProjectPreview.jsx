import React from 'react'
import { Link } from 'react-router-dom'

const ProjectPreview = ({title, description, imageUrl, link}) => {
  return (

    <div className="bg-white shadow-md rounded-lg p-4 h-full">
      <div className='h-fit w-full mb-4'>
        <img src={imageUrl} alt="Project Thumbnail" className=" object-cover rounded-lg border border-black/50" />
      </div>
        <div className='flex flex-col justify-between h-[55%]'>
           <div className='mb-4'>
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <p className="text-gray-700">{description}</p>
           </div>
            <Link target="_blank" to={link} className="text-blue-500 hover:underline">Link</Link>
        </div>
    </div>

  )
}

export default ProjectPreview
