import { useRef } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MainLayout from "../../layouts/MainLayout";
import { projects } from "../../data/projects.js";

const ProjectView = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!project || !containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 1, ease: "power2.out" },
    );
  }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const { title, summary, description, imageUrl, link, tech } = project;

  return (
    <MainLayout>
      <article
        ref={containerRef}
        className="max-w-4xl mx-auto px-6 max-md:px-5 py-12 pt-28 text-white flex flex-col gap-6"
      >
        <Link to="/projects" className="bg-blue-800 z-[10] p-1.5 fixed left-6 rounded text-blue-300 self-start">
          ← Back to projects
        </Link>
        <img
          src={imageUrl}
          alt={`${title} preview`}
          className="w-full aspect-video object-cover rounded-lg box-shadow"
        />
        <h1 className="text-4xl max-md:text-3xl font-bold text-white">{title}</h1>
        <p className="text-lg leading-relaxed">{summary || description}</p>
        {tech?.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <li key={t} className="text-sm border border-white/60 rounded-full px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
        )}
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-block self-start rounded-3xl bg-white text-black px-6 py-3 text-lg hover:scale-105 hover:bg-blue-900 hover:text-white border duration-300"
        >
          Visit the site →
        </a>
      </article>
    </MainLayout>
  );
};

export default ProjectView;
