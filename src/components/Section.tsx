// Shared shell for the homepage's scrolling sections: a near-opaque `.panel`
// on top of the fixed starfield, with an Impact/uppercase/cyan heading matching
// the hero. Body copy defaults to near-white; cyan is kept for headings,
// labels and buttons so the theme reads without costing legibility.

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, title, children, className = "" }: SectionProps) => {
  return (
    <section id={id} className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 scroll-mt-24">
      <div className="panel p-6 md:p-10 text-slate-100">
        {title && (
          <h2
            className="font-[Impact] uppercase tracking-wide text-cyan-200 leading-none mb-8 md:mb-12"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            {title}
          </h2>
        )}
        <div className={className}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
