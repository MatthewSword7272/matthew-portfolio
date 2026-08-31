import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// `hash` items scroll to a homepage section; `to` items are plain routes;
// `external` opens in a new tab.
const navItems = [
  { label: "Tech Stack", hash: "tech" },
  { label: "Experience", hash: "experience" },
  { label: "Projects", to: "/projects" },
  { label: "About Me", to: "/about-me" },
  { label: "Resume", to: "/Matthew_Catalfamo_CV.pdf", external: true },
];

const Header = () => {
  gsap.registerPlugin(useGSAP);

  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const mobileNavRef = useRef();
  const titleRef = useRef();
  const navRef = useRef();
  const iconRef = useRef();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNav = (item) => {
    if (item.external) {
      window.open(item.to, "_blank");
      return;
    }
    if (item.hash) {
      if (location.pathname === "/") {
        scrollToId(item.hash);
      } else {
        navigate(`/#${item.hash}`);
      }
      return;
    }
    navigate(item.to);
  };

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

  const handleMobileNav = (item) => {
    handleNav(item);
    toggleMenu();
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
          <img src="/images/mc_logo.png" className="size-10 group-hover:scale-95 duration-200" alt="" />
        </div>
      </Link>

      <nav className="md:flex hidden gap-6 items-center bg-black/70 ring-1 ring-white/10 rounded-xl px-5 py-2.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item)}
            className="text-cyan-200 hover:text-white uppercase text-sm tracking-wide duration-200"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        ref={navRef}
        className="nav-gradient bg-[length:200%_100%] rounded-xl p-2 group hover:!scale-110 hover:bg-gray-400 duration-200 md:hidden"
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
        <nav ref={mobileNavRef} className="absolute w-1/2 top-[5rem] right-2 rounded-xl bg-gray-100 p-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <button onClick={() => handleMobileNav(item)} className="uppercase text-sm tracking-wide">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
