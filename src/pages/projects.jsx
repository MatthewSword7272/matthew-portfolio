import Header from "../components/Header";
import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";

function Projects() {
  const projects = [
    {
      title: "PS Design Studio Revamp",
      description:
        "Revamping the PS Design Studio website using Nuxt.js and Statamic CMS",
      imageUrl: "/images/psdesign.png",
      link: "https://psdesign.netlify.app/",
    },
    {
      title: "Matthew's Game Catalog",
      description: "A personal game catalog built with Vue.js and Tailwind CSS",
      imageUrl: "/images/gameCatalog.png",
      link: "https://matthewvideogamecatalog.netlify.app/",
    },
    {
      title: "The Amazing Button",
      description: "A button component that does a thing in GSAP",
      imageUrl: "/images/button.png",
      link: "/amazing-button",
    },
    {
      title: "An Interactive Marquee",
      description:
        "A fun marquee component built with Fast Marquee and Framer Motion",
      imageUrl: "/images/marquee.png",
      link: "/marquee",
    },
  ];

  return (
    <MainLayout>
      <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20 py-6 px-20">
        {projects.map((project, index) => (
          <ProjectPreview
            delay={index * 250}
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            link={project.link}
          />
        ))}
      </main>
    </MainLayout>
  );
}

export default Projects;
