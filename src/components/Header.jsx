import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  gsap.registerPlugin(useGSAP);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const mobileNavRef = useRef();
  const titleRef = useRef();
  const navRef = useRef();
  const iconRef = useRef();

  const toggleMenu = () => {
    if (isMenuOpen && !isAnimating) {
      setIsAnimating(true);

      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "circ.inOut",
      });

      gsap.fromTo(
        navRef.current,
        {
          backgroundPosition: "center 100%",
        },
        {
          backgroundPosition: "center 0%",
          duration: 0.5,
          ease: "linear",
        }
      );

      gsap.to("li", {
        opacity: 0,
        y: -10,
        stagger: 0.15,
        ease: "power2.out",
        duration: 0.03,
      });

      gsap.to(mobileNavRef.current, {
        scale: 0,
        transformOrigin: "top right",
        duration: 0.3,
        delay: 0.7,
        ease: "power2.out",
        onComplete: () => {
          setIsMenuOpen(false);
          setIsAnimating(false);
        },
      });
    } else if (!isMenuOpen && !isAnimating) {
      setIsMenuOpen(true);

      gsap.fromTo(
        navRef.current,
        {
          backgroundPosition: "center 0%",
        },
        {
          backgroundPosition: "center 100%",
          duration: 0.5,
          ease: "linear",
        }
      );

      gsap.to(iconRef.current, {
        rotation: 360,
        duration: 0.3,
        ease: "circ.inOut",
      });
    }
  };

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.fromTo(mobileNavRef.current, { scale: 0, transformOrigin: "top right" }, { scale: 1, ease: "power2.out" });
      gsap.fromTo("li", { opacity: 0 }, { opacity: 1, stagger: 0.15, ease: "power2.out", delay: 0.4 });
    }
  }, [isMenuOpen]);

  useGSAP(() => {
    // Listen for intro screen event
    const handleIntroScreenUp = () => {
      gsap.fromTo(titleRef.current, { x: -1000 }, { duration: 1, x: 0, ease: "power2.out" });
      gsap.fromTo(navRef.current, { x: 1000 }, { duration: 1, x: 0, ease: "power2.out" });
    };

    window.addEventListener('introScreenUp', handleIntroScreenUp);

    return () => {
      window.removeEventListener('introScreenUp', handleIntroScreenUp);
    };
  }, []);

  return (
    <header className="p-6 flex items-center justify-between fixed top-0 w-full z-20">
      <Link to="/" className="" ref={titleRef}>
        <div className="p-2 rounded-xl bg-gray-300 hover:scale-110 duration-200 group hover:bg-gray-400">
          <img src="images/mc_logo.png" className="size-10 group-hover:scale-95 duration-200" alt="" />
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
      <button
        ref={navRef}
        className="nav-gradient bg-[length:200%_100%] rounded-xl p-2 group hover:!scale-110 hover:bg-gray-400 duration-200"
      >
        <div ref={iconRef}>
          {isMenuOpen ? (
            <IoClose className="text-2xl text-blue-900 group-hover:!scale-95 duration-200" onClick={toggleMenu} />
          ) : (
            <IoMenu className="text-2xl text-blue-900 group-hover:!scale-95 duration-200" onClick={toggleMenu} />
          )}
        </div>
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
