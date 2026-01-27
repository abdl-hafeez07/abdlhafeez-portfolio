"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Zodiak Wedding Studio",
    role: "Freelance Web Developer",
    period: "2026 - Present",
    year: "2026",
    description:
      "Architected and deployed high-performance web solutions for a premier wedding fashion studio. Focused on creating a digital presence that mirrors their artisanal craftsmanship through liquid-smooth animations and responsive design.",
    tech: ["Html", "Css", "Javascript"],
    color: "#3b82f6",
    link: "https://zodiakweddingstudio.com", // Assumed link, user can update if needed or provided later, keeping consistent with request "goes to the link of the website"
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>(".exp-scene");
    const years = gsap.utils.toArray<HTMLElement>(".kinetic-year");

    // Background Year Warping Effect
    years.forEach((year) => {
      gsap.to(year, {
        skewX: 20,
        skewY: 5,
        scale: 1.1,
        scrollTrigger: {
          trigger: year,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Scene Transitions
    sections.forEach((section, i) => {
      const content = section.querySelector(".exp-content");

      gsap.fromTo(content,
        {
          y: 100,
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Slow Spin Animation for Decorative Element
    const decoElement = containerRef.current.querySelector(".animate-spin-slow");
    if (decoElement) {
      gsap.to(decoElement, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(".animate-spin-slow");
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black" id="experience">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-32 relative z-10">
        <Reveal>
          <SectionHeading title="Experience" />
        </Reveal>

        <div className="mt-20">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="exp-scene relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden"
            >
              {/* Massive Background Year */}
              <div className="absolute inset-0 flex items-center justify-center z-0 opacity-[0.03] pointer-events-none select-none">
                <span className="kinetic-year text-[30vw] md:text-[40vw] font-black leading-none text-white tracking-tighter">
                  {exp.year}
                </span>
              </div>

              {/* Foreground Content */}
              <div className="exp-content relative z-10 w-full max-w-4xl">
                <a
                  href={exp.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col md:flex-row items-start md:items-end gap-12 group cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[2px] w-12 bg-blue-500" />
                      <span className="text-sm font-bold uppercase tracking-widest text-blue-500">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-5xl md:text-8xl font-black text-white uppercase leading-[0.9] mb-8 tracking-tighter">
                      {exp.company}
                    </h3>

                    <p className="text-2xl md:text-3xl font-medium text-white/40 mb-10 leading-tight">
                      {exp.role}
                    </p>

                    <div className="max-w-xl">
                      <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10">
                        {exp.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {exp.tech.map((tech) => (
                        <div key={tech} className="relative group/badge">
                          <span className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-white/80 border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover/badge:border-blue-500/50 group-hover/badge:text-white">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden lg:block w-px h-64 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-8" />

                  <div className="flex flex-col items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                    <div className="animate-spin-slow w-32 h-32 rounded-full border border-white/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-blue-500/30" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Bottom Divider */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

