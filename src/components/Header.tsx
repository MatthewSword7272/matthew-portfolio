"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface NavItem {
  label: string;
  hash?: string;
  to?: string;
  external?: boolean;
}

// `hash` items scroll to a homepage section; `to` items are plain routes;
// `external` opens in a new tab.
const navItems: NavItem[] = [
  { label: "Tech Stack", hash: "tech" },
  { label: "Experience", hash: "experience" },
  { label: "Projects", to: "/projects" },
  { label: "About Me", to: "/about-me" },
  { label: "Resume", to: "/Matthew_Catalfamo_CV.pdf", external: true },
];

const Header = () => {
  gsap.registerPlugin(useGSAP);

  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const mobileNavRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNav = (item: NavItem) => {
    if (item.external && item.to) {
      window.open(item.to, "_blank");
      return;
    }
    if (item.hash) {
      if (pathname === "/") {
        scrollToId(item.hash);
      } else {
        router.push(`/#${item.hash}`);
      }
      return;
    }
    if (item.to) router.push(item.to);
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
        { backgroundPosition: "center 100%" },
        { backgroundPosition: "center 0%", duration: 0.5, ease: "linear" },
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
        { backgroundPosition: "center 0%" },
        { backgroundPosition: "center 100%", duration: 0.5, ease: "linear" },
      );

      gsap.to(iconRef.current, {
        rotation: 360,
        duration: 0.3,
        ease: "circ.inOut",
      });
    }
  };

  const handleMobileNav = (item: NavItem) => {
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

    window.addEventListener("introScreenUp", handleIntroScreenUp);

    return () => {
      window.removeEventListener("introScreenUp", handleIntroScreenUp);
    };
  }, []);

  return (
    <header className="p-6 flex items-center justify-between fixed top-0 w-full z-20">
      <Link href="/" ref={titleRef}>
        <div className="p-2 rounded-xl bg-gray-300 hover:scale-110 duration-200 group hover:bg-gray-400">
          <Image
            src="/images/mc_logo.png"
            className="size-10 object-contain group-hover:scale-95 duration-200"
            alt=""
            width={1711}
            height={1990}
            priority
          />
        </div>
      </Link>

      <nav className="md:flex hidden gap-6 items-center bg-black/70 ring-1 ring-white/10 rounded-xl px-5 py-2.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item)}
            className="text-cyan-200 hover:text-white uppercase text-sm tracking-wide duration-200 cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        ref={navRef}
        className="nav-gradient bg-size-[200%_100%] rounded-xl p-2 group hover:scale-110! hover:bg-gray-400 duration-200 md:hidden"
      >
        <div ref={iconRef}>
          {isMenuOpen ? (
            <IoClose className="text-2xl text-blue-900 group-hover:scale-95! duration-200" onClick={toggleMenu} />
          ) : (
            <IoMenu className="text-2xl text-blue-900 group-hover:scale-95! duration-200" onClick={toggleMenu} />
          )}
        </div>
      </button>

      {isMenuOpen && (
        <nav ref={mobileNavRef} className="absolute w-1/2 top-20 right-2 rounded-xl bg-gray-100 p-6 md:hidden">
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
