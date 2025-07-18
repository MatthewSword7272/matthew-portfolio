import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const ProjectPreview = ({ project, delay, last }) => {
  //TODO: Preload images
  const delayIndex = (delay / 2) % 2;

  const [loaded, setLoaded] = useState(false);

  const { title, description, imageUrl, link } = project;

  const style = {
    animationDelay: `${delayIndex}ms`,
  };

  const ref = useRef(null);
  console.log(link);
  // const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <>
      <a
        ref={ref}
        className={`border border-white bg-white p-5 rounded-lg projectView group box-shadow`}
        href={link}
        style={style}
        target={link.startsWith("http") ? "_blank" : "_self"}
      >
        <div className="rounded-lg">
          <img
            src={imageUrl}
            style={loaded ? {} : { display: "none" }}
            alt="Project Thumbnail"
            onLoad={() => setLoaded(true)}
            className="aspect-video object-cover rounded-lg group-hover:scale-105 duration-300 size-full"
          />
        </div>
        {/* <div className="max-md:hidden absolute text-center inset-0 bg-gray-50/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
          <h2 className="text-xl font-medium mb-2">{title}</h2>
          <p className="text-center text-black">{description}</p>
        </div> */}
        <div className="text-center rounded-lg duration-300 gap-2 p-4">
          <h2 className="text-xl font-medium mb-2">{title}</h2>
          <p className="text-center text-black">{description}</p>
        </div>
      </a>
      {/* <p className="text-center md:hidden">{description}</p> */}
      {!last && <div className="w-full h-px bg-slate-500 md:hidden"></div>}
    </>
  );
};

export default ProjectPreview;
