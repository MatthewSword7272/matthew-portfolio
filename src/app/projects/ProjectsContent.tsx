"use client";

import { useRef } from "react";
import ProjectPreview from "@/components/ProjectPreview";
import { projects, groups } from "@/data/projects";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProjectsContent = () => {
  const projectList = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!projectList.current) return;
      gsap.fromTo(
        projectList.current.querySelectorAll(".projectCard"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.1,
        },
      );
    },
    { scope: projectList },
  );

  return (
    <main ref={projectList} className="w-full py-6 px-20 max-md:px-9 pb-16">
      <h2 className="text-3xl font-bold pb-12 pt-16 text-center text-white">My Projects</h2>

      <div className="flex flex-col gap-16">
        {groups.map((group) => {
          const items = projects.filter((p) => p.group === group.key);
          if (!items.length) return null;
          return (
            <section key={group.key}>
              <h3 className="text-sm uppercase tracking-widest text-white/80 mb-8">{group.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-20 gap-10">
                {items.map((project, index) => (
                  <ProjectPreview project={project} last={index === items.length - 1} key={project.id} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default ProjectsContent;
