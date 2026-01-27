"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "@/components/ui/MagneticButton";
import { usePreloader } from "@/components/ui/PreloaderContext";

export default function Hero() {
  const { isLoading } = usePreloader();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || !titleRef.current || !subtitleRef.current || !imageRef.current) return;

    const split = new SplitType(titleRef.current, {
      types: "lines,chars", // Changed to include lines for better control if needed
      tagName: "span",
    });

    const tl = gsap.timeline();

    // Set initial states to avoid FOUC
    // Explicitly make the parent container visible now that we are ready to animate children
    gsap.set(titleRef.current, { autoAlpha: 1 });
    gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(buttonRef.current, { opacity: 0, y: 20 });

    // 1. Image Reveal (Cinematic Scale Down + Fade)
    tl.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    })

      // 2. Text Reveal (3D Staggered Rise)
      // Characters rise from bottom, rotating into place
      .fromTo(split.chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        transformOrigin: "bottom center",
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)", // Overshoot for "stunning" snap effect
      }, "-=1.0") // Overlap

      // 3. Subtitle & Buttons
      .to([subtitleRef.current, buttonRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

    // 3D Text Tilt Effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".hero-text-3d", {
        rotationX: -y,
        rotationY: x,
        duration: 1,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center center",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      split.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLoading]);

  return (
    <section className="min-h-screen flex items-center px-8 md:px-16">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="relative z-10 mix-blend-difference">
          <h1
            ref={titleRef}
            className="text-[12vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter opacity-0"
            style={{ perspective: "1000px" }}
          >
            <div className="hero-text-3d inline-block">Abdul</div>
            <br />
            <div className="hero-text-3d inline-block">Hafeez</div>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-8 text-xl md:text-2xl text-white/70 max-w-2xl font-light opacity-0"
          >
            MSc Computer Science (Data Analytics) Student | Data & ML Enthusiast
          </p>

          <div
            ref={buttonRef}
            className="mt-12 flex space-x-6 opacity-0"
          >
            <MagneticButton label="View Work" />
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
              <MagneticButton label="Resume" />
            </a>
          </div>
        </div>

        {/* Profile Image with Polished Shape & Size */}
        <div
          ref={imageRef}
          className="relative w-full max-w-sm aspect-[4/5] md:w-[420px] flex justify-center items-center mt-12 md:mt-0 opacity-0"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-[24px] blur-[60px] opacity-20 pointer-events-none" />

          <div
            className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
            style={{
              // Refined Shape (Reduced Radius)
              borderRadius: "24px",
              // Soft gradient mask for all sides (Vignette) - Refined for "no edges"
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 75%)",
            }}
          >
            <img
              src="/profile2.jpeg"
              alt="Abdul Hafeez"
              className="w-full h-full object-cover object-top scale-105 hover:scale-100 transition-transform duration-1000"
            />

            {/* Overlay for cinematic texture */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
