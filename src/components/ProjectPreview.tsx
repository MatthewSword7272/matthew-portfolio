"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/types";
import Image from "next/image";

interface ProjectPreviewProps {
  project: Project;
  last?: boolean;
}

const ProjectPreview = ({ project, last }: ProjectPreviewProps) => {
  const [loaded, setLoaded] = useState(false);

  const { title, description, imageUrl, link, slug } = project;

  // Website projects route through their own detail page; interactive demos
  // link straight to their demo route.
  const href = slug ? `/projects/${slug}` : link;
  const isExternal = href.startsWith("http");

  return (
    <>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        className="bg-blue-900 p-5 rounded-lg projectCard group box-shadow"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={loaded ? {} : { visibility: "hidden" }}
            alt={`${title} thumbnail`}
            onLoad={() => setLoaded(true)}
            className="object-cover rounded-lg group-hover:scale-105 duration-300"
          />
        </div>
        <div className="text-center rounded-lg duration-300 gap-2 p-4">
          <h2 className="text-xl text-cyan-100 font-medium mb-2">{title}</h2>
          <p className="text-center text-cyan-300">{description}</p>
        </div>
      </Link>
      {!last && <div className="w-full h-px bg-slate-500 md:hidden"></div>}
    </>
  );
};

export default ProjectPreview;
