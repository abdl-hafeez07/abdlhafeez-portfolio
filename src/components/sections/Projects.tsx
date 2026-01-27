"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ChromaticText from "@/components/ui/ChromaticText";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Brain Tumor Detection",
    era: "2025 - AI Research",
    description: "Deep learning model utilizing CNNs to classify brain tumors from MRI scans.",
    tech: ["Python", "TensorFlow", "Deep Learning"],
    image: "/projects/brain.png",
    color: "#2563eb", // Blue
    link: "#",
    imageClass: "object-cover opacity-80",
  },
  {
    title: "Student Performance",
    era: "2025 - Analytics",
    description: "Analytical dashboard uncovering insights from educational datasets.",
    tech: ["R", "EDA", "Data Viz"],
    image: "/projects/student.png",
    color: "#db2777", // Pink
    link: "#",
    imageClass: "object-cover opacity-80",
  },
  {
    title: "Online Movie Ticket Booking",
    era: "2025 - Web Dev",
    description: "A premium platform for cinematic discoveries and real-time seat reservations with a seamless user experience.",
    tech: ["PHP", "MySQL", "JavaScript", "CSS"],
    image: "/projects/movie.png",
    color: "#059669", // Emerald
    link: "#",
    imageClass: "object-cover opacity-80",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !bgRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    cards.forEach((card, index) => {
      const project = projects[index];

      // Dynamic Background Change on Scroll
      ScrollTrigger.create({
        trigger: card,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => {
          gsap.to(bgRef.current, {
            backgroundColor: project.color,
            duration: 0.8,
            opacity: 0.1,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(bgRef.current, {
            backgroundColor: project.color,
            duration: 0.8,
            opacity: 0.1,
            ease: "power2.out",
          });
        },
      });

      // Stacking Parallax Effect
      // The current card scales down and blurs slightly as the next one covers it
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          filter: "blur(4px)",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 95%",
            end: "top 15%",
            scrub: true,
          }
        });
      }
    });

    // Fade out background on exit
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      onEnter: () => gsap.to(bgRef.current, { opacity: 0.1 }),
      onLeaveBack: () => gsap.to(bgRef.current, { opacity: 0 }),
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "bottom bottom",
      onLeave: () => gsap.to(bgRef.current, { opacity: 0 }),
      onEnterBack: () => gsap.to(bgRef.current, { opacity: 0.1 }),
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 bg-black" id="projects">
      {/* Dynamic Background Layer */}
      <div
        ref={bgRef}
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 opacity-0 blur-3xl z-0"
        style={{ backgroundColor: "#000" }}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <Reveal>
          <SectionHeading title="Selected Works" />
        </Reveal>

        <div className="mt-12 md:mt-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card sticky top-[10vh] md:top-[15vh] min-h-[80vh] flex items-center justify-center mb-[15vh] last:mb-0"
              style={{ zIndex: index + 1 }}
            >

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-center p-6 md:p-12 rounded-[2rem] md:rounded-[40px] border border-white/10 bg-zinc-950/90 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* Image Section */}
                <div className="w-full md:w-3/5 aspect-[16/10] relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 order-2 md:order-1">
                  <div className="absolute inset-0 bg-zinc-900 transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`${project.imageClass} transition-all duration-500 group-hover:scale-110`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
                    <span className="px-6 py-3 rounded-full border border-white/30 text-white uppercase tracking-widest text-xs font-bold bg-white/10 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Project
                    </span>
                  </div>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-2/5 flex flex-col items-start px-2 order-1 md:order-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl md:text-5xl font-black text-white/10 select-none">
                      0{index + 1}
                    </span>
                    <div className="h-[1px] w-8 bg-white/20" />
                    <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                      {project.era}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black uppercase leading-[1.1] tracking-tighter text-white mb-6">
                    <ChromaticText text={project.title} />
                  </h3>

                  <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/70 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </a>
            </div>
          ))}
        </div>
      </div >
    </section >
  );
}


