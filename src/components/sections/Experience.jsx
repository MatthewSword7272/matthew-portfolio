import Section from "../Section";
import { experience } from "../../data/experience";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const Experience = () => {
  const scope = useScrollReveal(".xp-item", { stagger: 0.15 });

  return (
    <Section id="experience" title="Experience">
      <ol ref={scope} className="relative border-l border-white/15 ml-3">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="xp-item relative pl-8 pb-10 last:pb-0">
            <span className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-cyan-300 ring-4 ring-cyan-300/20" />
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-lg font-semibold text-white">{job.role}</h3>
              <span className="text-cyan-200/70">· {job.company}</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-cyan-200/50 mt-1">{job.period}</p>
            <p className="text-sm text-cyan-100/90 mt-3 leading-relaxed">{job.summary}</p>
            <ul className="flex flex-wrap gap-2 mt-3">
              {job.tech.map((t) => (
                <li key={t} className="text-xs border border-white/20 rounded-full px-2.5 py-0.5 text-cyan-100/80">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Experience;
