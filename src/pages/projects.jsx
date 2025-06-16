import { useRef, useState } from "react";
import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";
import ReactPaginate from "react-paginate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Projects() {
  const projects = [
    {
      title: "PS Design Studio Revamp",
      description: "Revamping the PS Design Studio website using Nuxt.js and Statamic CMS",
      imageUrl: "/images/psdesign.png",
      link: "https://psdesign.netlify.app/",
    },
    {
      title: "Movember: Family Man",
      description:
        "One of the projects I worked on when I was at Movember. A Website to teach parenting strategies to new parents",
      imageUrl: "/images/family_man.png",
      link: "https://familyman.movember.com/en-au/",
    },
    {
      title: "Matthew's Game Catalog",
      description: "A personal game catalog built with Vue.js and Tailwind CSS",
      imageUrl: "/images/gameCatalog.png",
      link: "https://matthewvideogamecatalog.netlify.app/",
    },
    {
      title: "Positivus Design",
      description: "A Web Page Design from Figma using React and GSAP Animations",
      imageUrl: "/images/positivus.png",
      link: "https://positivus-matthewc.netlify.app/",
    },
    {
      title: "The Amazing Button",
      description: "A button component that does a thing in GSAP",
      imageUrl: "/images/button.png",
      link: "/amazing-button",
    },
    {
      title: "An Interactive Marquee",
      description: "A fun marquee component built with Fast Marquee and Framer Motion",
      imageUrl: "/images/marquee.png",
      link: "/marquee",
    },
    {
      title: "Memory Game",
      description: "A Memory Game with Animals, test your might",
      imageUrl: "/images/memory.png",
      link: "/memory-game",
    },
    {
      title: "GSAP Scrolling",
      description: "A Demonstration of a GSAP Scrolling Animation",
      imageUrl: "/images/scrolling.png",
      link: "/scrolling",
    },
    {
      title: "Animate Svg",
      description: "Using the animate tag in SVG to animate the text",
      imageUrl: "/images/svg-animate.png",
      link: "/svg-animate",
    },
    {
      title: "GSAP Draw Svg",
      description: "Using GSAP DrawSVG and ScrollTrigger to create a Scroll Animation with this SVG",
      imageUrl: "/images/path.png",
      link: "/path",
    },
    {
      title: "3-D Image Cube",
      description: "A movable 3D Cube with images you can search for",
      imageUrl: "/images/cube.png",
      link: "/cube",
    },
    {
      title: "Magical Dot Grid",
      description: "A Dot Grid that uses Anime.js to create animations",
      imageUrl: "/images/dot_grid.png",
      link: "/dot-grid",
    },
    {
      title: "React useTransition",
      description:
        "Demonstrates useTransition by generating a large list in the background while keeping the UI smooth and interactive.",
      imageUrl: "/images/transition.png",
      link: "/transition",
    },
    // {
    //   title: "Natalie Catalfamo Designs",
    //   description: "Recrated my sister's online portfolio",
    //   imageUrl: "",
    //   link: "/natalie",
    // },
  ];

  const projectList = useRef(null);

  const itemsPerPage = 6; //Projects per page

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = projects.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(projects.length / itemsPerPage);

  const handlePageClick = async (event) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // Fade out current items
    await gsap.to(projectList.current.children, {
      opacity: 0,
      duration: 0.5,
    });

    const newOffset = (event.selected * itemsPerPage) % projects.length;
    setItemOffset(newOffset);
  };

  useGSAP(() => {
    gsap.fromTo(
      projectList.current.children,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [itemOffset]);

  return (
    <MainLayout>
      <main ref={projectList} className="w-full grid grid-cols-1 md:grid-cols-2 gap-20 py-6 px-20 max-md:px-9">
        {currentItems.map((project, index) => (
          <ProjectPreview
            delay={index * 250}
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            link={project.link}
          />
        ))}
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          nextLabel=">"
          className="flex justify-between items-center md:w-1/2 w-full col-span-full mx-auto"
          nextClassName="text-lg"
          previousClassName="text-lg"
          pageLinkClassName="rounded-full size-9 flex items-center justify-center hover:bg-blue-800/50 duration-300"
          activeLinkClassName="bg-blue-800/80"
        />
      </main>
    </MainLayout>
  );
}

export default Projects;
