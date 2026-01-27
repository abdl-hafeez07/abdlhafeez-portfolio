"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + window.innerWidth * sections.length,
      },
    });
  }, []);

  return (
    <section ref={container} className="h-screen overflow-hidden">
      <div className="flex w-[300vw] h-full">
        {["Design", "Develop", "Deliver"].map((t) => (
          <div
            key={t}
            className="panel w-screen flex items-center justify-center text-7xl font-black"
          >
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
