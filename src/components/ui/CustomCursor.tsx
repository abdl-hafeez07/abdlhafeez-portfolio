"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(cursor.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    const hover = () => {
      gsap.to(cursor.current, { scale: 3, mixBlendMode: "difference", duration: 0.3 });
    };

    const unhover = () => {
      gsap.to(cursor.current, { scale: 1, mixBlendMode: "normal", duration: 0.3 });
    };

    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", hover);
      link.addEventListener("mouseleave", unhover);
    });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", hover);
        link.removeEventListener("mouseleave", unhover);
      });
    };
  }, []);

  return (
    <div
      ref={cursor}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[999]"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
