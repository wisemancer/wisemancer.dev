"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[9999] text-arcane text-4xl"
      style={{ willChange: "transform" }}
    >
      ✦
    </div>
  );
}
