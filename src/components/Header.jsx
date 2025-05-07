import React, { useState, useRef, useEffect } from "react";
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


  useEffect(() => {
    if (mobileNavRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(mobileNavRef.current, { opacity: 0, y: -20 }, { opacity: 1, duration: 0.5, y: 0, ease: "power2.out" });
      } else {
        gsap.fromTo(mobileNavRef.current, { opacity: 1, y: 0, }, { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const hasAnimated = localStorage.getItem('headerAnimationPlayed');

    if (!hasAnimated) {
      gsap.fromTo(titleRef.current, { x: -1000 }, { duration: 1, x: 0, ease: "power2.out" });
      gsap.fromTo(navRef.current, { x: 1000 }, { duration: 1, x: 0, ease: "power2.out" });
      // Mark animation as played
      localStorage.setItem('headerAnimationPlayed', 'true');
    } else {
      // Skip animation if it has already played
      gsap.set(titleRef.current, { x: 0 });
      gsap.set(navRef.current, { x: 0 });
    }
  }, [])

  return (
    <header className="p-6 flex items-center justify-between bg-gray-100 fixed top-0 w-full z-20">
      <Link to="/" className="flex items-center gap-10" ref={titleRef}>
        <img src="images/mc_logo.png" className="size-10" alt=""/>
      </Link>

      <nav ref={navRef} className="md:flex hidden gap-5 justify-between">
        <Link to="/">Home</Link>
        <Link to="/about-me">About Me</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/Matthew_Catalfamo_CV.pdf" target="_blank">
          Resume
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden flex">
        {isMenuOpen ? (
          <IoClose className="text-2xl" onClick={toggleMenu} />
        ) : (
          <IoMenu className="text-2xl" onClick={toggleMenu} />
        )}
      </button>

      {isMenuOpen && (
        <nav ref={mobileNavRef} className="absolute top-16 right-0 bg-gray-100 w-full p-6">
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/about-me" onClick={toggleMenu}>
                About Me
              </Link>
            </li>
            <li>
              <Link
                to="/Matthew_Catalfamo_CV.pdf"
                target="_blank"
                onClick={toggleMenu}
              >
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
