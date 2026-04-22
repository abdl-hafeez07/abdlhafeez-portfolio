"use client";

import { useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  label,
  href,
  onClick,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power3.out",
    });
  }

  function onMouseLeave() {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  }

  const sharedProps = {
    ref,
    onMouseMove,
    onMouseLeave,
    className:
      "group relative px-8 sm:px-10 py-4 sm:py-5 border border-white uppercase tracking-wide font-semibold overflow-hidden text-white hover:text-black transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto text-center",
  };

  const inner = (
    <>
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={sharedProps.className}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={sharedProps.className}
    >
      {inner}
    </button>
  );
}
