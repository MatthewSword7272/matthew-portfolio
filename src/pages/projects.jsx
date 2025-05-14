import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";

function Projects() {
  const projects = [
    {
      title: "PS Design Studio Revamp",
      description: "Revamping the PS Design Studio website using Nuxt.js and Statamic CMS",
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
      description: "A fun marquee component built with Fast Marquee and Framer Motion",
      imageUrl: "/images/marquee.png",
      link: "/marquee",
    },
    {
      title: "GSAP Scrolling",
      description: "A Demonstration of a GSAP Scrolling Animation",
      imageUrl: "/images/scrolling.png",
      link: "/scrolling",
    },
    {
      title: "Animate Svg",
      description: "Here, we are using GSAP DrawSVG and ScrollTrigger",
      imageUrl: "/images/path.png",
      link: "/svg-animate",
    },
    {
      title: "GSAP Draw Svg",
      description: "Here, we are using GSAP DrawSVG and ScrollTrigger",
      imageUrl: "/images/path.png",
      link: "/path",
    },
    // {
    //   title: "Natalie Catalfamo Designs",
    //   description: "Recrated my sister's online portfolio",
    //   imageUrl: "",
    //   link: "/natalie",
    // },
  ];

  return (
    <MainLayout>
      <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-20 py-6 px-20 max-md:px-9">
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
