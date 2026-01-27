"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const honors = [
    {
        title: "Best Camper Award",
        event: "Ujjwalam Rural Camp, Idukki",
        date: "Aug 2025",
        description:
            "Recognized for active participation, leadership, teamwork, and community engagement during a 6-day immersive rural development camp. Gained hands-on experience in collaboration, adaptability, and social responsibility.",
        icon: "🏆",
        accent: "from-yellow-400 to-orange-500",
        shadow: "shadow-orange-500/20",
        image: "/camp1.jpeg",
    },
    {
        title: "Team Spirit Champion",
        event: "mPOWER – Persona Enhancement",
        date: "June 2025",
        description:
            "Awarded for exceptional teamwork and collaboration during the Power Communication Workshop organized by Vertical Eye. Enhanced communication skills, confidence, and interpersonal effectiveness.",
        icon: "⭐",
        accent: "from-purple-400 to-pink-500",
        shadow: "shadow-purple-500/20",
        image: "/mpower1.jpg",
    },
];

export default function Honors() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !lineRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".honor-card");

            // Timeline Line Animation
            gsap.fromTo(
                lineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                }
            );

            items.forEach((item, i) => {
                const content = item.querySelector(".honor-content");
                const imageContainer = item.querySelector(".honor-image-container");

                // Entrance Animation
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "top 20%",
                        toggleActions: "play none none reverse",
                    },
                });

                tl.fromTo(
                    item,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                )
                    .fromTo(
                        content,
                        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
                        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
                        "-=0.6"
                    )
                    .fromTo(
                        imageContainer,
                        { scale: 0.8, opacity: 0, rotateY: i % 2 === 0 ? 15 : -15 },
                        { scale: 1, opacity: 1, rotateY: 0, duration: 1, ease: "back.out(1.7)" },
                        "-=0.8"
                    );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to 10 deg
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20; // -10 to 10 deg

        const imageContainer = card.querySelector('.honor-image-inner') as HTMLElement;
        if (imageContainer) {
            gsap.to(imageContainer, {
                rotateY: x,
                rotateX: -y,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000,
            });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const imageContainer = card.querySelector('.honor-image-inner') as HTMLElement;
        if (imageContainer) {
            gsap.to(imageContainer, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }


    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-black overflow-hidden perspective-1000"
            id="honors"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black opacity-50" />

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-24 text-center">
                    <SectionHeading title="Honours & Achievements" />
                </div>

                <div className="relative flex flex-col gap-32 md:gap-40 lg:gap-60">

                    {/* Central Timeline Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 hidden lg:block -translate-x-1/2">
                        <div
                            ref={lineRef}
                            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        />
                    </div>

                    {honors.map((honor, index) => (
                        <div
                            key={index}
                            className={`honor-card flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                }`}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Text Content */}
                            <div className={`honor-content flex-1 flex flex-col gap-6 ${index % 2 === 1 ? "lg:text-right lg:items-end" : "lg:text-left lg:items-start"
                                }`}>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-mono tracking-widest uppercase bg-gradient-to-r ${honor.accent} bg-clip-text text-transparent`}>
                                        {honor.date}
                                    </span>
                                    <div className={`w-12 h-[1px] bg-gradient-to-r ${honor.accent}`} />
                                </div>

                                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                    {honor.title}
                                </h3>

                                <div className={`flex items-center gap-3 text-zinc-300 font-medium ${index % 2 === 1 ? "flex-row-reverse" : ""}`}>
                                    <span className="text-2xl">{honor.icon}</span>
                                    <span className="text-xl">{honor.event}</span>
                                </div>

                                <p className="text-zinc-400 leading-relaxed text-lg max-w-md">
                                    {honor.description}
                                </p>
                            </div>

                            {/* Center Dot (Desktop) */}
                            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full border-2 border-white/20 bg-black z-10">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${honor.accent} shadow-[0_0_10px_currentColor]`} />
                            </div>

                            {/* Image Visual */}
                            <div className="honor-image-container flex-1 w-full max-w-lg aspect-[4/3] perspective-1000 relative group cursor-pointer">
                                <div className="honor-image-inner w-full h-full relative preserve-3d transition-shadow duration-500 ease-out">

                                    {/* Floating Elements */}
                                    <div
                                        className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ transform: "translateZ(-50px)" }}
                                    />

                                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent z-10" />
                                        <img
                                            src={honor.image}
                                            alt={honor.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Overlay Shine */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>

                                    {/* Floating Badge */}
                                    <div
                                        className={`absolute bottom-4 ${index % 2 === 0 ? "right-4" : "left-4"} bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3`}
                                        style={{ transform: "translateZ(30px)" }}
                                    >
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${honor.accent} flex items-center justify-center text-xl`}>
                                            {honor.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-white/50 uppercase tracking-widest">Type</span>
                                            <span className="text-sm font-bold text-white">Achievement</span>
                                        </div>
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
