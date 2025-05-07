import Header from "../components/Header";
import ProjectPreview from "../components/ProjectPreview";
import MainLayout from "../layouts/MainLayout";

function Home() {
  return (
    <MainLayout>
      <div className=" absolute w-full inset-0 overflow-hidden">
        <img src="images/stars.jpeg" alt="" className="object-cover h-full w-full" />
      </div>
      <main className="w-full flex max-md:flex-col py-1 px-6 h-[30rem] overflow-hidden md:justify-between justify-around md:items-end z-10 relative">
        <div className="flex flex-col gap-2 justify-end overflow-hidden text-left text-cyan-200">
          <p className="text-5xl revealUp">Welcome!</p>
          <h1 className="text-8xl !text-justify revealUp font-[Impact] uppercase text-cyan-200">
            Matthew
            <hr />
            Catalfamo
          </h1>
          <p className="text-3xl underline decoration-dotted revealUp">
            I create web pages
          </p>
        </div>
        <div>
          <button className="revealLeft text-cyan-200 border border-cyan-200 px-5 py-2 hover:bg-white hover:text-black hover:rounded-3xl duration-300">
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
