import { useInView } from "framer-motion";
import { useState } from "react";
import { useRef } from "react";

const ProjectPreview = ({ title, description, imageUrl, link, delay, last }) => {
  //TODO: Preload images
  const delayIndex = (delay / 2) % 2;

  const [loaded, setLoaded] = useState(false);

  const style = {
    animationDelay: `${delayIndex}ms`,
  };

  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <>
      <a
        ref={ref}
        className={`bg-white  rounded-lg h-full relative group box-shadow ${inView ? "projectView" : "opacity-0"}`}
        href={link}
        style={style}
        target={link.startsWith("http") ? "_blank" : "_self"}
      >
        <div className=" relative overflow-hidden rounded-lg size-full">
          <img
            src={imageUrl}
            style={loaded ? {} : { display: "none" }}
            alt="Project Thumbnail"
            onLoad={() => setLoaded(true)}
            className="object-cover rounded-lg group-hover:scale-110 duration-300 size-full"
          />
        </div>
        <div className="max-md:hidden absolute text-center inset-0 bg-gray-50/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
          <h2 className="text-xl font-medium mb-2">{title}</h2>
          <p className="text-center text-black">{description}</p>
        </div>
      </a>
      <p className="text-center md:hidden">{description}</p>
      {!last && <div className="w-full h-px bg-slate-500 md:hidden"></div>}
    </>
  );
};

export default ProjectPreview;
