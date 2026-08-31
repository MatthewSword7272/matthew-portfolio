import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Reveals direct children matching `selector` as they scroll into view.
// Returns a ref to attach to the container element.
export function useScrollReveal(selector = ".reveal", { y = 30, stagger = 0.12 } = {}) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const targets = scope.current.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope }
  );

  return scope;
}

export default useScrollReveal;
