// "How it's built" write-up that sits under a fun-project demo, in the same
// `.panel` style as the rest of the site. Full-bleed demos (Descent, Pulse)
// carry their own bespoke versions instead.

const REPO =
  "https://github.com/MatthewSword7272/matthew-portfolio/tree/main/src/app";

interface HowItsBuiltProps {
  /** Short cards explaining the technique, one idea each. */
  items: { title: string; body: string }[];
  tech: string[];
  /** The demo's folder under src/app/, for the "View source" link. */
  folder: string;
}

const HowItsBuilt = ({ items, tech, folder }: HowItsBuiltProps) => {
  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-6 max-md:px-5 py-16">
      <div className="panel p-8 max-md:p-5 text-slate-100">
        <h2
          className="font-[Impact] uppercase tracking-wide text-cyan-200 leading-none"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          How it&apos;s built
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {items.map(({ title, body }) => (
            <div key={title} className="border-t border-white/15 pt-4">
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
            </div>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {tech.map((t) => (
            <li key={t} className="text-sm border border-white/35 rounded-full px-3 py-1 text-cyan-100">
              {t}
            </li>
          ))}
        </ul>

        <a
          href={`${REPO}/${folder}`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block text-sm text-cyan-200 underline-offset-4 hover:text-white hover:underline"
        >
          View source ↗
        </a>
      </div>
    </section>
  );
};

export default HowItsBuilt;
