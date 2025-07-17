import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  gsap.registerPlugin(useGSAP);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileNavRef = useRef();
  const titleRef = useRef();
  const navRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.fromTo(mobileNavRef.current, { scale: 0, transformOrigin: "top right" }, { scale: 1, ease: "power2.out" });
      gsap.fromTo("li", { opacity: 0 }, { opacity: 1, stagger: 0.15, ease: "power2.out", delay: 0.4 });
    } else {
      gsap.fromTo(
        mobileNavRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  useGSAP(() => {
    gsap.fromTo(titleRef.current, { x: -1000 }, { duration: 1, x: 0, ease: "power2.out" });
    gsap.fromTo(navRef.current, { x: 1000 }, { duration: 1, x: 0, ease: "power2.out" });
  }, []);

  return (
    <header className="p-6 flex items-center justify-between fixed top-0 w-full z-20">
      <Link to="/" className="flex items-center gap-10" ref={titleRef}>
        <div className="p-2 rounded-xl bg-gray-500">
          <img src="images/mc_logo.png" className="size-10 hover:scale-110 duration-300" alt="" />
        </div>
      </Link>

      {/* <nav ref={navRef} className="md:flex hidden gap-5 justify-between">
        <Link to="/">Home</Link>
        <Link to="/about-me">About Me</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/Matthew_Catalfamo_CV.pdf" target="_blank">
          Resume
        </Link>
      </nav> */}

      {/* Mobile Menu Button */}
      <button ref={navRef} className="bg-gray-500 flex rounded-xl p-2">
        {isMenuOpen ? (
          <IoClose className="text-2xl text-blue-900" onClick={toggleMenu} />
        ) : (
          <IoMenu className="text-2xl text-blue-900" onClick={toggleMenu} />
        )}
      </button>

      {isMenuOpen && (
        <nav ref={mobileNavRef} className="absolute w-1/2 top-[5rem] right-2 rounded-xl bg-gray-100 p-6">
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-me" onClick={toggleMenu}>
                About Me
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={toggleMenu}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/Matthew_Catalfamo_CV.pdf" target="_blank" onClick={toggleMenu}>
                Resume
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
