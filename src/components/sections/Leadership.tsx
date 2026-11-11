"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leadership = [
    {
        role: "Placement Representative",
        scope: "College Level",
        description: "Acted as the primary strategic liaison between corporate recruiters and the institution.",
        impact: "Student Placement Support",
        year: "2026-27",
        icon: "🎯",
        gradient: "from-blue-600 to-indigo-600"
    },
    {
        role: "Class Representative",
        scope: "MSc Computer Science",
        description: "Spearheaded academic initiatives and event management. Fostered a collaborative environment by bridging the gap between faculty and the student body.",
        impact: "100% Student Engagement",
        year: "2025-26",
        icon: "⚡",
        gradient: "from-emerald-500 to-teal-500"
    }
];

export default function Leadership() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".leadership-card");

            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        y: 100,
                        opacity: 0,
                        rotateX: -15
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 50%",
                            toggleActions: "play none none reverse"
                        },
                        delay: i * 0.2
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <section ref={containerRef} className="py-32 bg-black relative" id="leadership">
            {/* Geometric Background Patterns */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-24 flex flex-col items-center">
                    <SectionHeading title="Leadership Experience" />
                    <p className="mt-6 text-zinc-500 text-center max-w-2xl text-lg">
                        Driving initiatives, fostering collaboration, and creating impact through strategic roles.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {leadership.map((item, index) => (
                        <div
                            key={index}
                            className="leadership-card group relative bg-zinc-900/50 border border-white/5 overflow-hidden rounded-[2rem] hover:border-white/10 transition-colors duration-500"
                            onMouseMove={handleMouseMove}
                        >
                            {/* Spotlight Indicator */}
                            <div
                                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`,
                                }}
                            />

                            <div className="relative p-10 md:p-12 h-full flex flex-col select-none">
                                {/* Top Header */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl shadow-lg shadow-white/5`}>
                                        {item.icon}
                                    </div>
                                    <div className="px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
                                        <span className="text-zinc-400 text-sm font-mono tracking-widest">{item.year}</span>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 flex flex-col">
                                    <h4 className="text-white/40 text-sm font-bold uppercase tracking-widest mb-3">
                                        {item.scope}
                                    </h4>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                                        {item.role}
                                    </h3>
                                    <p className="text-lg text-zinc-400 leading-relaxed mb-8 group-hover:text-zinc-300 transition-colors">
                                        {item.description}
                                    </p>

                                    {/* Footer Metric */}
                                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full animate-pulse bg-gradient-to-r ${item.gradient}`} />
                                        <span className="text-white/80 font-medium tracking-wide">
                                            {item.impact}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
