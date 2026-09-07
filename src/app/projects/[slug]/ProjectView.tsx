"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/types";

const ProjectView = ({ project }: { project: Project }) => {

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.to(containerRef.current.children, { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" });
    },
    { scope: containerRef },
  );

  const { title, summary, description, imageUrl, link, tech } = project;

  return (
    <article className="max-w-4xl mx-auto px-6 max-md:px-5 py-12 pt-28">
      <div
        ref={containerRef}
        className="panel p-8 max-md:p-5 text-slate-100 flex flex-col gap-6 *:opacity-0 *:-translate-x-25"
      >
        <Link
          href="/projects"
          className="self-start rounded-3xl border border-cyan-200 bg-cyan-950 text-cyan-200 px-4 py-1.5 text-sm hover:bg-white hover:text-black duration-300"
        >
          ← Back to projects
        </Link>
        <div className="relative w-full aspect-video overflow-hidden rounded-lg box-shadow">
          <Image
            src={imageUrl}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl max-md:text-3xl font-bold text-white">{title}</h1>
        <p className="text-lg leading-relaxed">{summary || description}</p>
        {tech && tech.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <li key={t} className="text-sm border border-white/35 rounded-full px-3 py-1 text-cyan-100">
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
      </div>
    </article>
  );
};

export default ProjectView;
