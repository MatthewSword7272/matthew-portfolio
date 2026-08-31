"use client";

import Link from "next/link";
import Section from "@/components/Section";
import ProjectPreview from "@/components/ProjectPreview";
import { projects, groups } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SelectedWork = () => {
  const scope = useScrollReveal(".work-group", { stagger: 0.15 });
  const clientGroups = groups.filter((g) => g.client);

  return (
    <Section id="work" title="Selected Work">
      <div ref={scope} className="flex flex-col gap-12">
        {clientGroups.map((group) => {
          const items = projects.filter((p) => p.group === group.key);
          return (
            <div key={group.key} className="work-group">
              <h3 className="text-sm uppercase tracking-widest text-cyan-200/80 mb-5">{group.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((project, index) => (
                  <ProjectPreview project={project} last={index === items.length - 1} key={project.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="/projects"
        className="inline-block mt-10 rounded-3xl border border-cyan-200 bg-cyan-950 text-cyan-200 px-5 py-2 hover:bg-white hover:text-black duration-300"
      >
        View all projects, including experiments →
      </Link>
    </Section>
  );
};

export default SelectedWork;
