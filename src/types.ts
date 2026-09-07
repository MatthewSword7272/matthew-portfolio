// Shared domain types.

export type ProjectGroupKey = "metronome" | "visual-moda" | "fun";

export interface ProjectGroup {
  key: ProjectGroupKey;
  label: string;
  /** Client-work groups are the ones surfaced on the homepage "Selected Work" section. */
  client: boolean;
}

export interface Project {
  id: number;
  title: string;
  group: ProjectGroupKey;
  description: string;
  imageUrl: string;
  link: string;
  /** Present on client website projects — gives the project its own detail page. */
  slug?: string;
  summary?: string;
  tech?: string[];
  projectUrl?: string;
  /** Present on personal projects — deep-links to that demo's source folder.
   *  Client work has none: that code isn't ours to publish. */
  repoUrl?: string;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  tech: string[];
}
