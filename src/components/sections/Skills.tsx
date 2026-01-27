"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import gsap from "gsap";

const skills = [
  {
    category: "Programming & Analytics",
    items: ["Python", "R", "SQL", "Java"],
  },
  {
    category: "Data Analytics",
    items: ["Pandas", "NumPy", "Statistical Analysis", "Data Cleaning", "EDA"],
  },
  {
    category: "Machine Learning & AI",
    items: ["TensorFlow", "OpenCV", "Deep Learning", "CNNs"],
  },
  {
    category: "Visualization",
    items: ["Power BI", "Tableau", "MS Excel (Advanced)"],
  },
  {
    category: "Web & Backend",
    items: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP (CRUD)"],
  },
  {
    category: "Tools & Platforms",
    items: ["VS Code", "Figma", "RStudio", "MS Excel", "Power BI", "Tableau", "Orange"],
  },
];

export default function Skills() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on cursor position (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      duration: 0.5,
      rotationX: rotateX,
      rotationY: rotateY,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });

    // Move inner content for parallax depth
    const content = card.querySelector('.card-content');
    if (content) {
      gsap.to(content, {
        x: (x - centerX) / 10,
        y: (y - centerY) / 10,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    const content = e.currentTarget.querySelector('.card-content');
    if (content) {
      gsap.to(content, { x: 0, y: 0, duration: 0.5 });
    }
  };

  return (
    <section className="px-8 py-32 bg-black relative z-10 overflow-visible">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <SectionHeading title="Technical Skills" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[2000px]">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                className="group relative h-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md cursor-pointer transition-colors hover:border-white/30"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 3D Content Container */}
                <div className="card-content" style={{ transform: "translateZ(50px)" }}>
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none -z-10 blur-xl" />

                  <h3 className="text-2xl font-bold uppercase tracking-wide mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {skillGroup.category}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 text-sm font-medium bg-black/40 border border-white/10 hover:border-white/50 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
