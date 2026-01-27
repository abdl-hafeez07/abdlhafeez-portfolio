"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloader } from "@/components/ui/PreloaderContext";

const languages = [
    { text: "Abdul Hafeez", lang: "en" },
    { text: "عبد الحفيظ", lang: "ar" },
    { text: "अब्दुल हफीज", lang: "hi" },
    { text: "Abdul Hafeez", lang: "es" },
];

export default function Preloader() {
    const { setIsLoading } = usePreloader();
    const [complete, setComplete] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const textHidden1 = useRef<HTMLSpanElement>(null); // bdul
    const textHidden2 = useRef<HTMLSpanElement>(null); // afeez

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setComplete(true);
                setIsLoading(false);
            },
        });

        // 1. Initial Cinematic Reveal & Expansion
        tl.fromTo(nameRef.current,
            { opacity: 0, y: 40, filter: "blur(20px)", scale: 0.95 },
            { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1, ease: "power4.out" }
        )
            .to([textHidden1.current, textHidden2.current], {
                width: "auto",
                opacity: 1,
                duration: 1.2,
                ease: "expo.inOut",
            }, "-=0.2");

        // 2. Multilingual Cinematic Cycle
        languages.slice(1).forEach((item, i) => {
            tl.to(nameRef.current, {
                opacity: 0,
                filter: "blur(10px)",
                scale: 1.05,
                duration: 0.4,
                delay: 0.7,
            })
                .add(() => {
                    if (nameRef.current) {
                        nameRef.current.textContent = item.text;
                        nameRef.current.style.display = "flex";
                        nameRef.current.style.justifyContent = "center";
                        nameRef.current.style.alignItems = "center";
                    }
                })
                .to(nameRef.current, {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 0.4,
                });
        });

        // 3. Cinematic Exit
        tl.to(nameRef.current, {
            scale: 1.4,
            opacity: 0,
            filter: "blur(30px)",
            duration: 1.2,
            ease: "power3.inOut",
            delay: 0.8
        })
            .to(container.current, {
                yPercent: -100,
                duration: 1,
                ease: "expo.inOut",
            }, "-=0.2");

    }, []);

    if (complete) return null;

    return (
        <div
            ref={container}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
            <div className="relative z-10 w-full flex justify-center items-center px-4">
                <h1
                    ref={nameRef}
                    className="text-5xl md:text-8xl font-black text-white uppercase tracking-[-0.04em] flex justify-center items-center leading-none opacity-0"
                    style={{ transformOrigin: "center center" }}
                >
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                        <span>A</span>
                        <span ref={textHidden1} className="overflow-hidden w-0 opacity-0 inline-block align-bottom whitespace-nowrap">bdul</span>
                        <span className="w-[0.3em] md:w-[0.4em]"></span>
                        <span>H</span>
                        <span ref={textHidden2} className="overflow-hidden w-0 opacity-0 inline-block align-bottom whitespace-nowrap">afeez</span>
                    </div>
                </h1>
            </div>
        </div>
    );
}
