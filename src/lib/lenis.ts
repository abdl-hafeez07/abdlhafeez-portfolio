import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  if (typeof window === "undefined") {
    return { destroy() {} } as any;
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // 🔹 Disable Lenis on mobile BUT keep ScrollTrigger alive
  if (isMobile) {
    ScrollTrigger.refresh();
    return { destroy() {} } as any;
  }

  const lenis = new Lenis({
    smoothWheel: true,
    duration: 1.4,
    easing: (t: number) =>
      Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  // 🔹 Sync Lenis with GSAP
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // 🔹 THIS WAS MISSING (MOST IMPORTANT)
  ScrollTrigger.refresh();

  return lenis;
}
