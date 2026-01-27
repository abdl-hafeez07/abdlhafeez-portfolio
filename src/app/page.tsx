"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Honors from "@/components/sections/Honors";
import Leadership from "@/components/sections/Leadership";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    const lenis = initLenis();
    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-black text-white overflow-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Honors />
      <Leadership />
      <Certifications />
      <Contact />
    </main>
  );
}
