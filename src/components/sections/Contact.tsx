"use client";

import { useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { gsap } from "gsap";

const socials = [
  {
    name: "Email",
    url: "mailto:abdulhafeez0906@gmail.com",
    handle: "abdulhafeez0906@gmail.com",
    color: "from-blue-500 to-cyan-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/abdul-hafeez-523389365",
    handle: "@abdul-hafeez",
    color: "from-blue-600 to-blue-800",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/abdl-hafeez07",
    handle: "@abdl-hafeez07",
    color: "from-zinc-700 to-zinc-900",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/haffeeeez?igsh=NXF2cnRycDJmZzE%3D&utm_source=qr",
    handle: "@haffeeeez",
    color: "from-pink-500 to-orange-400",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

function ContactCard({ social }: { social: (typeof socials)[0] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    setPosition({ x, y });

    gsap.to(ref.current, {
      x: x * 2,
      y: y * 2,
      rotationX: -y * 2,
      rotationY: x * 2,
      scale: 1.05,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    if (!ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <a
      ref={ref}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden transform-style-3d transition-colors`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${social.color}`}
      />

      <div className="relative z-10 transform-gpu" style={{ transform: "translateZ(30px)" }}>
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${social.color} text-white mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
          {social.icon}
        </div>
      </div>

      <div className="relative z-10 text-center transform-gpu" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-xl font-bold text-white mb-1">{social.name}</h3>
        <p className="text-sm text-white/50 group-hover:text-white/80 transition-colors">
          {social.handle}
        </p>
      </div>

      {/* Decorative Corner Lights */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 blur-xl rounded-full group-hover:bg-white/20 transition-colors duration-500" />
      <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/10 blur-xl rounded-full group-hover:bg-white/20 transition-colors duration-500" />
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="px-8 py-32 bg-black overflow-hidden perspective-1000">
      <Reveal>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <SectionHeading title="Get In Touch" />
            <p className="mt-8 text-white/60 text-lg max-w-2xl mx-auto">
              Feel free to reach out for collaborations, opportunities, or just to say hello.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socials.map((social, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <ContactCard social={social} />
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
