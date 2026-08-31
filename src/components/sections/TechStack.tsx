"use client";

import Section from "@/components/Section";
import { techStack } from "@/data/techStack";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;

      // Each category group staggers its own items when that group scrolls in.
      scope.current.querySelectorAll<HTMLUListElement>("ul").forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll("li"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power1.in",
            stagger: 0.15,
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <Section id="tech" title="Tech Stack">
      <div ref={scope} className="flex flex-col gap-10">
        {techStack.map((group) => (
          <div key={group.category} className="tech-group">
            <h3 className="text-sm uppercase tracking-widest text-cyan-200/80 mb-4">
              {group.category}
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-500/70 px-3 py-2.5 duration-300"
                >
                  <div className="bg-white/80 rounded p-1.5">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="size-8 object-contain shrink-0"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-lg text-cyan-100">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default TechStack;
