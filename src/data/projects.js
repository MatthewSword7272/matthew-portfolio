// Single source of truth for the projects shown on /projects.
//
// Website projects have a `slug` and a `summary` and get their own detail page
// at /projects/:slug. Interactive demo projects have no `slug` and link straight
// to their demo route.
//
// TODO: replace the placehold.co `imageUrl`s below with real screenshots dropped
// into public/images/ (metronome.png, the_ungasan.png, waatu.png), captured
// ~16:9 (e.g. 1200x675) since the card and detail image use `aspect-video`.
// TODO: review/replace the draft `summary` copy on the website projects.

export const projects = [
  {
    id: 1,
    slug: "metronome",
    title: "Metronome",
    description:
      "The website for Metronome, the growth agency I run — design, web development, performance marketing and managed services.",
    summary:
      "Metronome is the growth agency I run, helping mid-market businesses achieve long-term, measurable growth through design and UX, web development, performance marketing and managed services. I designed and built the agency's own website with React and Tailwind CSS: a fast, fully responsive marketing site with service pages, a continuous-improvement narrative and client case studies (Wilson Storage, JG King Homes, Sundays Beach Club, Smarter Bathrooms). It's treated as an evolving product rather than a one-off launch, and I keep iterating on the content, structure and performance over time.",
    tech: ["React", "Tailwind CSS", "Next.js", "WordPress", "TypeScript", 'WPEngine Atlas'],
    imageUrl: "/images/metronome.png",
    link: "https://metronome.com.au/",
    projectUrl: "https://metronome.com.au/",
  },
  {
    id: 2,
    slug: "the-ungasan",
    title: "The Ungasan",
    description:
      "A headless website for The Ungasan Clifftop Resort in Bali, built at Metronome.",
    summary:
      "The Ungasan Clifftop Resort is an ultra-premium collection of private villas and ocean-view suites perched above the Indian Ocean on Bali's Bukit Peninsula. Built through Metronome, the site runs a headless WordPress back end with a Next.js and TypeScript front end on WP Engine Atlas, so the resort's team can manage cinematic photography and content while guests get a fast, fluid experience across devices. It spans eight individually named villas plus garden- and ocean-view suites, along with weddings and elopements, fine dining, wellness retreats and Sundays Beach Club — each with its own detail pages and a clear path to enquire.",
    tech: ["React", "Tailwind CSS", "Next.js", "WordPress", "TypeScript", 'WPEngine Atlas'],
    imageUrl: "/images/ungasan.png",
    link: "https://theungasan.com/",
    projectUrl: "https://theungasan.com/",
  },
  {
    id: 3,
    slug: "waatu",
    title: "Waatu",
    description:
      "A headless website for Waatu, a yakitori and open-flame restaurant in Uluwatu, built at Metronome.",
    summary:
      "Waatu is a yakitori and open-flame grill restaurant on the clifftops of Uluwatu, Bali, where every dish is cooked over coals — no gas, no electricity — blending Indigenous fire-cooking methods with a rugged but refined dining room. Built through Metronome on a headless WordPress and Next.js stack with TypeScript, running on WP Engine Atlas, the site carries the brand's ingredient-driven, artisanal tone across its breakfast, lunch and dinner menus, plant-based and kids' options, a natural-wine list and the weekend Otsumami brunch, with reservations and location details always within reach.",
    tech: ["React", "Tailwind CSS", "Next.js", "WordPress", "TypeScript", 'WPEngine Atlas'],
    imageUrl: "/images/waatu.png",
    link: "https://waatu.com/",
    projectUrl: "https://waatu.com/",
  },
    {
    id: 4,
    slug: "one-two-boxing",
    title: "One Two Boxing",
    description:
      "Revamped the One Two Boxing website using React and Tailwind CSS",
    summary:
      "A full front-end rebuild of the One Two Boxing website in React and Tailwind CSS. The focus was a fast, responsive layout with clear class information and a sign-up flow that works cleanly on mobile.",
    tech: ["React", "Tailwind CSS"],
    imageUrl: "/images/one_two_boxing.png",
    link: "https://onetwoboxing.com.au/",
    projectUrl: "https://onetwoboxing.com.au/",
  },
  {
    id: 5,
    slug: "nostra-homes",
    title: "Nostra Homes",
    description:
      "Revamped the Nostra Homes website using React and Tailwind CSS",
    summary:
      "A marketing-site rebuild for home builder Nostra Homes, built in React and Tailwind CSS with image-heavy galleries, home and land listings and enquiry forms, tuned for performance and SEO.",
    tech: ["React", "Tailwind CSS"],
    imageUrl: "/images/nostra.png",
    link: "https://nostrahomes.com.au/",
    projectUrl: "https://nostrahomes.com.au/",
  },
  {
    id: 6,
    title: "The Amazing Button",
    description: "A button component that does a thing in GSAP",
    imageUrl: "/images/button.png",
    link: "/amazing-button",
  },
  {
    id: 7,
    title: "An Interactive Marquee",
    description:
      "A fun marquee component built with Fast Marquee and Framer Motion",
    imageUrl: "/images/marquee.png",
    link: "/marquee",
  },
  {
    id: 8,
    title: "Memory Game",
    description: "A Memory Game with Animals, test your might",
    imageUrl: "/images/memory.png",
    link: "/memory-game",
  },
  {
    id: 9,
    title: "GSAP Scrolling",
    description: "A Demonstration of a GSAP Scrolling Animation",
    imageUrl: "/images/scrolling.png",
    link: "/scrolling",
  },
  {
    id: 10,
    title: "Animate Svg",
    description: "Using the animate tag in SVG to animate the text",
    imageUrl: "/images/svg-animate.png",
    link: "/svg-animate",
  },
  {
    id: 11,
    title: "GSAP Draw Svg",
    description:
      "Using GSAP DrawSVG and ScrollTrigger to create a Scroll Animation with this SVG",
    imageUrl: "/images/path.png",
    link: "/path",
  },
  {
    id: 12,
    title: "3-D Image Cube",
    description: "A movable 3D Cube with images you can search for",
    imageUrl: "/images/cube.png",
    link: "/cube",
  },
  {
    id: 13,
    title: "Magical Dot Grid",
    description: "A Dot Grid that uses Anime.js to create animations",
    imageUrl: "/images/dot_grid.png",
    link: "/dot-grid",
  },
];

export default projects;
