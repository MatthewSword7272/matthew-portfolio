import Header from "../components/Header";
import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>
      <div className=" absolute w-full inset-0 overflow-hidden">
        <img
          src="images/stars.jpeg"
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <main className="w-full flex max-md:flex-col py-1 px-6 h-[70vh] overflow-hidden justify-around md:items-center lg:items-end z-10 relative">
        <div className="projectView bg-black/80 p-7 flex flex-col gap-2 justify-end overflow-hidden text-left text-cyan-200 shadow-2xl rounded inset-shadow-sm inset-shadow-white/20 drop-shadow-2xl">
          <h1 className="text-9xl max-lg:text-7xl max-md:text-6xl !text-justify revealUp font-[Impact] uppercase text-cyan-200">
            Matthew
            <hr />
            Catalfamo
          </h1>
          <p className="text-5xl revealUp">Welcome!</p>
          <p className="text-3xl tracking-widest underline decoration-dotted revealUp">
            I create web pages
          </p>
        </div>
        <div>
          <button className="revealLeft text-2xl bg-cyan-950 text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
            <a target="_blank" href="/Matthew_Catalfamo_CV.pdf">
              Check out my Resume!
            </a>
          </button>
        </div>
      </main>
    </MainLayout>
  );
}

export default Home;
