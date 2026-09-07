"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/types";
import Image from "next/image";

interface ProjectPreviewProps {
  project: Project;
  last?: boolean;
}

const ProjectPreview = ({ project, last }: ProjectPreviewProps) => {
  const [loaded, setLoaded] = useState(false);

  const { title, description, imageUrl, link, slug, repoUrl } = project;

  // Website projects route through their own detail page; interactive demos
  // link straight to their demo route.
  const href = slug ? `/projects/${slug}` : link;
  const isExternal = href.startsWith("http");

  return (
    <>
      {/* An <article> rather than a <Link>: the source link below is a sibling
          anchor, and anchors can't nest. */}
      <article className="bg-slate-900 p-5 rounded-lg projectCard group box-shadow flex flex-col">
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          className="flex flex-col grow"
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
          <div className="rounded-lg duration-300 gap-2 p-4 grow">
            <h2 className="text-xl text-cyan-100 font-medium mb-2">{title}</h2>
            <p className="text-left text-slate-200">{description}</p>
          </div>
        </Link>

        {/* Personal projects only — client code isn't ours to publish, so the
            absence of this row also reads as "this one shipped for a client". */}
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 self-start mx-4 rounded-3xl border border-cyan-200 bg-cyan-950 text-cyan-200 px-4 py-1.5 text-sm hover:bg-white hover:text-black duration-300"
          >
            <FaGithub className="text-base" />
            View source
          </a>
        )}
      </article>
      {!last && <div className="w-full h-px bg-slate-500 md:hidden"></div>}
    </>
  );
};

export default ProjectPreview;
