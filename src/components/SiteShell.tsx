"use client";

import { useRef, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import gsap from "gsap";
import { checkReturningVisitor, setVisitTimestamp } from "@/utils/visitTracker";
import Image from "next/image";

declare global {
  interface Window {
    /** Set once the intro overlay has lifted; the root layout persists across
     *  client navigation so the `introScreenUp` event only ever fires once. */
    __introScreenUp?: boolean;
  }
}

function fireIntroScreenUp() {
  window.__introScreenUp = true;
  window.dispatchEvent(new CustomEvent("introScreenUp"));
}

const SiteShell = ({ children }: { children: React.ReactNode }) => {
  const introScreen = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const isReturningVisitor = checkReturningVisitor();

    setShowIntro(!isReturningVisitor);

    if (!isReturningVisitor) {
      setVisitTimestamp();

      gsap.to(introScreen.current, {
        y: "-100%",
        duration: 1,
        delay: 3,
        ease: "bounce",
        onStart: fireIntroScreenUp,
      });
    } else {
      // For returning visitors, trigger animations immediately
      fireIntroScreenUp();
    }
  }, []);

  return (
    <>
      {showIntro && (
        <div
          ref={introScreen}
          className="size-full fixed top-0 left-0 bg-black z-50"
        >
          <div className="h-full flex items-center justify-center">
            <Image
              className="w-1/3 h-auto dramaFadeIn"
              src="/images/mc_logo.png"
              alt="Matthew Catalfamo"
              width={1711}
              height={1990}
              priority
            />
          </div>
        </div>
      )}
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex bg-blue-900 w-full min-h-screen">
          <div className="fixed inset-0 size-full bg-[url('/images/stars.jpeg')] bg-cover bg-center z-0" />
          <div className="relative z-10 grow overflow-hidden">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SiteShell;
