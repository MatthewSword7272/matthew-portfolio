import React from "react";
import { Link } from "react-router-dom";

const ProjectPreview = ({ title, description, imageUrl, link, delay }) => {
  // const delay = Math.floor(Math.random() * 1000) + 500;

  const style = {
    animationDelay: `${delay}ms`,
  };

  return (
    <a
      className={`bg-white rounded-lg h-full relative projectView group box-shadow`}
      style={style}
      href={link}
      target={link.startsWith("http") ? "_blank" : "_self"}
    >
      <div className=" relative overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt="Project Thumbnail"
          className="object-cover rounded-lg group-hover:scale-110 duration-300 w-full"
        />
      </div>
      <div className="absolute text-center inset-0 translate-1/2 bg-gray-50/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
        <div className="">
          <h2 className="text-xl font-medium mb-2">{title}</h2>
          <p className="text-black">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default ProjectPreview;
