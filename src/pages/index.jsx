import Header from "../components/Header"
import ProjectPreview from "../components/ProjectPreview"

function Home() {

  const projects = [
    {
      title: "PS Design Studio Revamp",
      description: "Revamping the PS Design Studio website using Nuxt.js and Statamic CMS",
      imageUrl: "/images/psdesign.png",
      link: "https://psdesign.netlify.app/"
    },
    {
      title: "Matthew's Game Catalog",
      description: "A personal game catalog built with Vue.js and Tailwind CSS",
      imageUrl: "/images/gameCatalog.png",
      link: "https://matthewvideogamecatalog.netlify.app/"
    },
  ]

  return (
    <div className="h-screen bg-blue-500">
      <main className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {projects.map((project, index) => (
          <ProjectPreview
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            link={project.link}
          />
        ))}
      </main>
    </div>
  )
}

export default Home
