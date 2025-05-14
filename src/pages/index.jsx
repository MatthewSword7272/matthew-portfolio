import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>
      <div className=" absolute w-full inset-0 overflow-hidden">
        <img src="images/stars.jpeg" alt="" className="object-cover h-full w-full" />
      </div>
      <main className="w-full flex max-md:flex-col py-1 px-6 h-[75vh] overflow-hidden justify-center md:items-center z-10 relative">
        <div className="bg-black/80 w-full projectView h-3/4">
          <div className="h-full delay-500 projectView grid grid-cols-2 max-md:grid-cols-1 gap-4 p-7 overflow-hidden text-left text-cyan-200 shadow-2xl rounded inset-shadow-sm inset-shadow-white/20 drop-shadow-2xl">
            <h1
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
              className="leading-none content-center w-fit text-justify revealUp font-[Impact] uppercase text-cyan-200"
            >
              Matthew
              <hr />
              Catalfamo
            </h1>
            <div className="flex flex-col sm:justify-center space-y-5">
              <p className="text-5xl revealUp">Welcome</p>
              <p className="text-3xl tracking-widest underline decoration-dotted revealUp">I create web pages</p>
              <button className="revealLeft w-fit text-2xl bg-cyan-950 text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
                <Link href="/projects">Check out my Work</Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Home;
