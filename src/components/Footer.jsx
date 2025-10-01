import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const underlineRef = useRef(null);
  const linkRef = useRef(null);

  useGSAP(() => {
    const underline = underlineRef.current;
    const link = linkRef.current;
    const tl = gsap.timeline({ paused: true });

    const enterAnimation = () => tl.tweenFromTo(0, "midway");
    const leaveAnimation = () => tl.play();

    tl.fromTo(
      underline,
      {
        width: "0%",
        left: "0%",
      },
      {
        width: "100%",
        left: "0%",
        duration: 1,
      }
    );

    tl.add("midway");

    tl.fromTo(
      underline,
      {
        width: "100%",
        left: "0%",
      },
      {
        width: "0%",
        left: "100%",
        duration: 1,
        immediateRender: false,
      }
    );

    link.addEventListener("mouseenter", () => enterAnimation(tl));

    link.addEventListener("mouseleave", () => leaveAnimation(tl));

    return () => {
      link.removeEventListener("mouseenter", () => enterAnimation);
      link.removeEventListener("mouseleave", () => leaveAnimation);
    };
  }, []);

  return (
    <footer className="bg-white p-4 flex flex-col items-center justify-center gap-5 text-xl z-20">
      <h2 className="">Contact Me</h2>
      <a
        ref={linkRef}
        className={"relative"}
        href="mailto:mcatalfamo5@gmail.com"
      >
        mcatalfamo5@gmail.com
        <span
          ref={underlineRef}
          className={"absolute bottom-0 bg-black h-[0.5px]"}
        />
      </a>
      <div className={"flex gap-3"}>
        <a
          className="size-8"
          href="https://www.linkedin.com/in/matthew-catalfamo-0a353a25a/"
          target="_blank"
        >
          <FaLinkedin className="text-3xl hover:text-blue-500 duration-300" />
        </a>
        <a
          className="size-8"
          href="https://github.com/MatthewSword7272"
          target="_blank"
        >
          <FaGithub className="text-3xl hover:text-blue-500 duration-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
