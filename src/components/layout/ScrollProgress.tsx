"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scroll =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);
      setProgress(scroll * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-white z-50"
      style={{ width: `${progress}%` }}
    />
  );
}
