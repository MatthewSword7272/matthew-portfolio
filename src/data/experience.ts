import type { ExperienceItem } from "@/types";

// Drives the Experience timeline on the homepage. Most-recent-first.

export const experience: ExperienceItem[] = [
  {
    role: "Front-End Developer",
    company: "Metronome",
    period: "Oct 2025 – Aug 2026",
    summary:
      "Rebuilt legacy client sites into modern React, TypeScript & Tailwind builds, and shipped headless WordPress front ends on WP Engine.",
    tech: ["React", "TypeScript", "Tailwind", "Next.js", "WordPress"],
  },
  {
    role: "Front-End Developer (Part-Time)",
    company: "Visual Moda",
    period: "May 2023 – Oct 2025",
    summary:
      "Converted ageing sites to the company's React/TypeScript stack from Figma designs, and built an internal task-management system with Laravel.",
    tech: ["React", "TypeScript", "Tailwind", "Laravel"],
  },
  {
    role: "Full-Stack Developer (Contract)",
    company: "PS Design Studio",
    period: "Feb – Apr 2025",
    summary:
      "Rebuilt the studio website from WordPress into Vue.js and Laravel (Statamic CMS), and actioned bug-fix tickets for Simonds Homes.",
    tech: ["Vue", "Laravel", "Statamic"],
  },
  {
    role: "Junior Developer (University Placement)",
    company: "Movember",
    period: "Jul – Dec 2022",
    summary:
      "Built interactive UI components and integrated backend services for two Agile apps using React, TypeScript & Node.js on AWS.",
    tech: ["React", "TypeScript", "Node.js", "AWS"],
  },
];

export default experience;
