import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 pt-32 text-center text-cyan-200">
      <div className="bg-black/70 rounded-lg ring-1 ring-white/10 p-10 max-w-md">
        <p className="font-[Impact] uppercase leading-none" style={{ fontSize: "clamp(3rem, 12vw, 6rem)" }}>
          404
        </p>
        <p className="mt-4 text-cyan-100/90">That page drifted off into space. Let&apos;s get you back.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-3xl border border-cyan-200 bg-cyan-950 px-5 py-2 hover:bg-white hover:text-black duration-300"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="rounded-3xl border border-cyan-200 bg-cyan-950 px-5 py-2 hover:bg-white hover:text-black duration-300"
          >
            Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
