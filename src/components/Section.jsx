// Shared shell for the homepage's scrolling sections: a translucent panel on
// top of the fixed starfield, with an Impact/uppercase/cyan heading matching
// the hero.

const Section = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-24 scroll-mt-24">
      <div className="bg-black/70 rounded-lg shadow-2xl ring-1 ring-white/10 drop-shadow-2xl p-6 md:p-10 text-cyan-200">
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
