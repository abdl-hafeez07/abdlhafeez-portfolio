"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Desktop hover animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray(".nav-link");
      const nameText = gsap.utils.toArray(".name-text");

      if (isExpanded) {
        gsap.to(nameText, {
          autoAlpha: 1,
          x: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out"
        });

        gsap.fromTo(
          links,
          {
            x: 50,
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
              from: "end"
            },
            ease: "back.out(2)",
            overwrite: true,
          }
        );
      } else {
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

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      const mobileLinks = gsap.utils.toArray(".mobile-nav-link");
      gsap.fromTo(
        mobileLinks,
        { y: -20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.1,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in"
      });
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    e.stopPropagation();
    setIsExpanded(false);
    setIsMobileMenuOpen(false);
    if (id) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navbar - Hidden on mobile */}
      <nav className="hidden md:block fixed top-6 right-6 z-50 mix-blend-normal" ref={containerRef}>
        <div
          className={`
            bg-black 
            rounded-full p-3 flex flex-row-reverse items-center gap-6
            transition-all duration-500 ease-in-out shadow-2xl shadow-black/50 overflow-hidden
            ${isExpanded ? "w-auto pr-8 pl-8 opacity-100" : "w-14 h-14 group cursor-pointer opacity-100"}
          `}
          style={{ maxHeight: "60px" }}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => {
            const hasHover = window.matchMedia("(hover: hover)").matches;
            if (hasHover) {
              setIsExpanded(true);
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-sm z-20">
            AH
          </div>

          <div className="flex flex-row-reverse items-center gap-6">
            <div className="flex flex-row gap-4 items-center">
              <a
                href="/AbdulHafeezRsm.pdf"
                target="_blank"
                rel="noopener noreferrer"
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

            <div className="nav-link w-[1px] h-4 bg-white/20 opacity-0" />

            <div className="name-text flex flex-col items-end opacity-0 transform translate-x-4">
              <span className="font-bold text-xs tracking-wide text-white whitespace-nowrap">ABDUL HAFEEZ</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
              AH
            </div>
            <span className="font-bold text-sm tracking-wide text-white">ABDUL HAFEEZ</span>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className="absolute top-full left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-white/10 opacity-0 invisible"
          style={{ transform: "translateY(-10px)" }}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, 'projects')}
              className="mobile-nav-link text-lg font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors py-3 border-b border-white/5"
            >
              Work
            </a>
            <a
              href="#experience"
              onClick={(e) => handleLinkClick(e, 'experience')}
              className="mobile-nav-link text-lg font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors py-3 border-b border-white/5"
            >
              Experience
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="mobile-nav-link text-lg font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors py-3 border-b border-white/5"
            >
              Contact
            </a>
            <a
              href="/AbdulHafeezRsm.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-link text-lg font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-colors py-4 px-6 rounded-xl text-center mt-2"
              onClick={(e) => handleLinkClick(e)}
            >
              Download Resume
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
