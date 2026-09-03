"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import gsap from "gsap";
import { checkReturningVisitor, setVisitTimestamp } from "@/utils/visitTracker";
import Image from "next/image";

// Routes that take over the whole viewport and supply their own navigation.
// `trailingSlash: true` in next.config.mjs means the pathname can arrive as
// "/descent/", so these are matched by prefix rather than equality.
const FULL_BLEED_ROUTES = ["/descent"];

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
  const pathname = usePathname();
  const fullBleed = FULL_BLEED_ROUTES.some((route) => pathname?.startsWith(route));

  // The intro is a once-per-page-load event, and this effect must reflect that.
  // This layout persists across client navigation, so re-running it on a route
  // change could flip `showIntro` back to true — remounting the fixed z-50 black
  // overlay on a tick where `introScreen.current` is still null. gsap.to(null)
  // tweens nothing, so the overlay would never lift and the site would be stuck
  // behind it until a reload. Leaving /descent after more than five minutes hit
  // exactly that: `fullBleed` flips false, the visitor no longer counts as
  // returning, and the intro tries to play a second time with no element.
  const introHandled = useRef(false);

  useEffect(() => {
    if (introHandled.current) return;
    introHandled.current = true;

    // Full-bleed routes never render the intro overlay, so there is nothing to
    // animate away — just mark the intro as done and let the route take over.
    const playIntro = !checkReturningVisitor() && !fullBleed;
    setShowIntro(playIntro);

    if (!playIntro) {
      // Returning visitor, or a route that owns the viewport: start immediately.
      fireIntroScreenUp();
      return;
    }

    setVisitTimestamp();
    gsap.to(introScreen.current, {
      y: "-100%",
      duration: 1,
      delay: 3,
      ease: "bounce",
      onStart: fireIntroScreenUp,
    });
  }, [fullBleed]);

  if (fullBleed) return <>{children}</>;

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
