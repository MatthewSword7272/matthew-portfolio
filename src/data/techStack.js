// Drives the Tech Stack section on the homepage.
//
// Each item's `icon` points at a PNG in public/images/tech/. Drop the files in
// with these exact names (all .png); a missing file just renders as a broken
// image until it's added.

export const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "JavaScript", icon: "/images/tech/javascript.png" },
      { name: "TypeScript", icon: "/images/tech/typescript.svg" },
      { name: "React", icon: "/images/tech/react.svg" },
      { name: "Next.js", icon: "/images/tech/nextjs.png" },
      { name: "Vue", icon: "/images/tech/vue.svg" },
      { name: "Nuxt", icon: "/images/tech/nuxt.svg" },
      { name: "Tailwind CSS", icon: "/images/tech/tailwind.svg" },
      { name: "Sass", icon: "/images/tech/sass.png" },
      { name: "GSAP", icon: "/images/tech/gsap.png" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "/images/tech/nodejs.png" },
      { name: "PHP", icon: "/images/tech/php.svg" },
      { name: "Laravel", icon: "/images/tech/laravel.svg" },
      { name: "Python", icon: "/images/tech/python.svg" },
      { name: "Django", icon: "/images/tech/django.png" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", icon: "/images/tech/mysql.svg" },
      { name: "PostgreSQL", icon: "/images/tech/postgresql.svg" },
      { name: "MongoDB", icon: "/images/tech/mongodb.png" },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Git", icon: "/images/tech/git.svg" },
      { name: "WordPress", icon: "/images/tech/wordpress.svg" },
      { name: "AWS", icon: "/images/tech/aws.svg" },
      { name: "Figma", icon: "/images/tech/figma.svg" },
      { name: "Docker", icon: "/images/tech/docker.svg" },
    ],
  },
];

export default techStack;
