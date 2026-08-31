import Section from "../Section";
import { techStack } from "../../data/techStack";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const TechStack = () => {
  const scope = useScrollReveal(".tech-group");

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
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-gray-200/50 px-3 py-2.5 duration-300"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="size-8 object-contain shrink-0"
                    loading="lazy"
                  />
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
