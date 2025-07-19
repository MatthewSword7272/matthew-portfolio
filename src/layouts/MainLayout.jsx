import React, { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MainLayout = ({ children, className = "" }) => {
  const introScreen = useRef();

  useGSAP(() => {
    gsap.to(introScreen.current, {
      y: "-100%",
      duration: 1,
      delay: 3,
      ease: 'bounce',
      onStart: () => {
        // Trigger all animations when intro screen starts going up
        const event = new CustomEvent('introScreenUp');
        window.dispatchEvent(event);
      }
    });
  });
  return (
    <>
      <div ref={introScreen} className=" size-full absolute top-0 left-0 bg-black z-50">
        <div className=" h-full flex items-center justify-center">
          <img className="w-1/3 dramaFadeIn" src="\images\mc_logo.png"></img>
        </div>
      </div>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex bg-gray-200 w-full">
          <div className="mt-32" />
          <div className={`flex-grow overflow-hidden ${className}`}>{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
