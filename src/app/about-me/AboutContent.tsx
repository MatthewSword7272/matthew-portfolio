"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AboutContent = () => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  gsap.registerPlugin(useGSAP);

  useEffect(() => {
    if (!descriptionRef.current) return;
    const paragraphElements = descriptionRef.current.querySelectorAll("p");

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 5000 },
      {
        stagger: 0.2,
        delay: 0.3,
        opacity: 1,
        duration: 1,
        y: 0,
        ease: "power2.out",
      },
    );
    gsap.fromTo(
      paragraphElements,
      { opacity: 0, x: 1000 },
      {
        stagger: 0.2,
        delay: 0.3,
        opacity: 1,
        duration: 1,
        x: 0,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <div className="grid grid-cols-1 md:h-screen md:items-center md:grid-cols-2 pt-20 px-4 pb-10 gap-2 overflow-hidden">
      <div className="flex justify-center profile-image">
        <Image
          className="rounded-full object-cover size-100"
          src="/images/ME2.png"
          alt="Portrait of Matthew Catalfamo"
          width={400}
          height={400}
          priority
        />
      </div>
      <div className="flex flex-col bg-slate-800/80 p-3 rounded-xl text-white gap-4 max-md:items-center">
        <h2 className="text-3xl" ref={titleRef}>
          Hi, my name is Matthew!
        </h2>
        <div className="space-y-3 " ref={descriptionRef}>
          <p>
            I&rsquo;m a quirky and young aspiring Full-Stack Developer with a
            passion for crafting seamless web applications based in Melbourne.
            My main mission in life, is to try my best in any situation. After
            graduating from high school, I wanted to get in to coding. So with
            no doubt in my mind, I went on to complete my Bachelor of Computer
            Science (Professional) at Swinburne University, graduating with
            Distinction.
          </p>
          <p>
            Currently, I&apos;m honing my skills as a Web Developer, where I am
            diving headfirst into the world of software development and soaking
            in new concepts and technologies. I thrive in collaborative
            environments and approach each project with meticulous attention to
            detail.
          </p>
          <p>
            My technical toolkit includes Front-end technologies like HTML,
            React, TypeScript, Vue.js and Tailwind; Back-end frameworks like
            Node.js, PHP and Laravel; and DevOps tools like AWS and Docker.
          </p>
          <p>
            Outside of coding, I&apos;m a passionate enthusiast of both modern
            and retro gaming. Spend my free time playing the best video games
            have to offer and collect retro games. I&apos;m also an Advanced
            Certified PADI Scuba Diver who loves exploring ocean depths and
            exploring the unknown, and a passionate supporter of the Essendon
            Bombers.
          </p>
          <p>
            I can be pretty adventurous. You can catch me travelling to new
            destinations, drinking a Bourbon and Coke and sharing a good laugh
            with my friends and family.
          </p>
          <p>
            Whether building innovative web solutions or exploring new
            frontiers, I&apos;m always ready for the next challenge. Let&apos;s
            connect and create something amazing together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
