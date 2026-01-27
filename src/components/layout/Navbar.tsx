"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredCallback = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray(".nav-link");
      const nameText = gsap.utils.toArray(".name-text");

      if (isExpanded) {
        // Expand Animation

        // 1. Text (Name) Fade In
        gsap.to(nameText, {
          autoAlpha: 1,
          x: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out"
        });

        // 2. Links Slide Left from Logo
        gsap.fromTo(
          links,
          {
            x: 50, // Start hidden behind/near logo
            autoAlpha: 0,
            scale: 0.5,
          },
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.2,
            stagger: {
              each: 0.05,
              from: "end" // Closest to logo appears first (or last depending on DOM order, we want right-to-left feel)
            },
            ease: "back.out(2)",
            overwrite: true,
          }
        );
      } else {
        // Collapse Animation
        gsap.to(nameText, {
          autoAlpha: 0,
          x: 20,
          duration: 0.2
        });

        gsap.to(links, {
          x: 20,
          autoAlpha: 0,
          duration: 0.2,
          overwrite: true
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isExpanded]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    e.stopPropagation(); // Prevent container click (toggle)
    setIsExpanded(false); // Close navbar
    if (id) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 right-6 z-50 mix-blend-normal" ref={containerRef}>
      <div
        className={`
                bg-black 
                rounded-full p-3 flex flex-row-reverse items-center gap-6
                transition-all duration-500 ease-in-out shadow-2xl shadow-black/50 overflow-hidden
                ${isExpanded ? "w-auto pr-8 pl-8 opacity-100" : "w-14 h-14 group cursor-pointer opacity-100"}
            `}
        style={{ maxHeight: "60px" }} // Force horizontal strip
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => {
          // Check for hover capability to distinguish touch vs mouse
          const hasHover = window.matchMedia("(hover: hover)").matches;
          if (hasHover) {
            // Desktop: Click ensures it's open (doesn't close)
            setIsExpanded(true);
          } else {
            // Mobile: Click toggles
            setIsExpanded(!isExpanded);
          }
        }}
      >
        {/* Logo Anchor (Always Visible) */}
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-sm z-20">
          AH
        </div>

        {/* Container for Content (Hidden initially, expands left) */}
        <div className="flex flex-row-reverse items-center gap-6">
          {/* Links (Right to Left) */}
          <div className="flex flex-row gap-4 items-center">
            <a
              href="/resume.pdf"
              className="nav-link text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors opacity-0"
              onClick={(e) => handleLinkClick(e)}
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="nav-link text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors opacity-0"
            >
              Contact
            </a>
            <a
              href="#experience"
              onClick={(e) => handleLinkClick(e, 'experience')}
              className="nav-link text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors opacity-0"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, 'projects')}
              className="nav-link text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors opacity-0"
            >
              Work
            </a>
          </div>

          {/* Divider */}
          <div className="nav-link w-[1px] h-4 bg-white/20 opacity-0" />

          {/* Name Label */}
          <div className="name-text flex flex-col items-end opacity-0 transform translate-x-4">
            <span className="font-bold text-xs tracking-wide text-white whitespace-nowrap">ABDUL HAFEEZ</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
