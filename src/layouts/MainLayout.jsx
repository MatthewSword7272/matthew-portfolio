import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import gsap from "gsap";
import { checkReturningVisitor, setVisitTimestamp } from "../utils/visitTracker";

const MainLayout = ({ children, className = "" }) => {
  const introScreen = useRef();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const isReturningVisitor = checkReturningVisitor();

    setShowIntro(!isReturningVisitor);

    if (!isReturningVisitor) {
      setVisitTimestamp();
    }

    if (!isReturningVisitor) {
      gsap.to(introScreen.current, {
        y: "-100%",
        duration: 1,
        delay: 3,
        ease: "bounce",
        onStart: () => {
          const event = new CustomEvent("introScreenUp");
          window.dispatchEvent(event);
        },
      });
    } else {
      // For returning visitors, trigger animations immediately
      const event = new CustomEvent("introScreenUp");
      window.dispatchEvent(event);
    }
  }, []);

  return (
    <>
      {showIntro && (
        <div ref={introScreen} className="size-full fixed top-0 left-0 bg-black z-50">
          <div className=" h-full flex items-center justify-center">
            <img className="w-1/3 dramaFadeIn" src="\images\mc_logo.png"></img>
          </div>
        </div>
      )}
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex bg-blue-950 w-full min-h-screen">
          <div className={`flex-grow overflow-hidden ${className}`}>{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
