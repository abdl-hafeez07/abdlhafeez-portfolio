"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface ChromaticTextProps {
    text: string;
    className?: string;
}

export default function ChromaticText({ text, className = "" }: ChromaticTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Jitter animation on hover
        const handleMouseEnter = () => {
            gsap.to(".chromatic-red", {
                x: -4,
                y: 2,
                duration: 0.1,
                yoyo: true,
                repeat: 3,
            });
            gsap.to(".chromatic-blue", {
                x: 4,
                y: -2,
                duration: 0.1,
                yoyo: true,
                repeat: 3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to([".chromatic-red", ".chromatic-blue"], {
                x: 0,
                y: 0,
                duration: 0.2,
            });
        };

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className={`relative inline-block group cursor-pointer ${className}`}>
            {/* Red Layer */}
            <span
                className="chromatic-red absolute inset-0 text-red-500 opacity-50 mix-blend-screen pointer-events-none select-none translate-x-[0px]"
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Blue/Green Layer */}
            <span
                className="chromatic-blue absolute inset-0 text-cyan-500 opacity-50 mix-blend-screen pointer-events-none select-none translate-x-[0px]"
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Main White Layer */}
            <span className="relative z-10 text-white">
                {text}
            </span>
        </div>
    );
}
