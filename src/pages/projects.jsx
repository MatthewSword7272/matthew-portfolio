import { useRef, useState } from "react";
import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";
import ReactPaginate from "react-paginate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Projects({ projects }) {
  // useEffect(() => {
  //   projects.forEach((project) => {
  //     const img = new Image();
  //     img.src = project.imageUrl;
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const projectList = useRef(null);

  const itemsPerPage = 6; //Projects per page

  const [itemOffset, setItemOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = projects.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(projects.length / itemsPerPage);

  const handlePageClick = async (event) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

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
    if (isTransitioning) {
      gsap.fromTo(
        projectList.current.children,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setIsTransitioning(false),
        }
      );
    } else {
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
    }
  }, [itemOffset]);

  return (
    <MainLayout>
      <main
        ref={projectList}
        className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-10 py-6 px-20 max-md:px-9"
      >
        {currentItems.map((project, index) => (
          <ProjectPreview
            delay={index * 250}
            last={index === currentItems.length - 1}
            key={`${itemOffset}-${index}`}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            link={project.link}
          />
        ))}
      </main>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        nextLabel=">"
        className="flex justify-center gap-10 items-center md:w-1/2 w-full mx-auto px-5 my-10"
        nextClassName="text-lg"
        previousClassName="text-lg"
        pageLinkClassName="rounded-full size-9 flex items-center justify-center hover:bg-blue-800/50 duration-300"
        activeLinkClassName="bg-blue-800/80"
      />
    </MainLayout>
  );
}

export default Projects;
