"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12;
      trail.current.y += (pos.current.y - trail.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 20}px, ${trail.current.y - 20}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    const handleHover = () => {
      cursorRef.current?.classList.add("scale-[2.5]");
      trailRef.current?.classList.add("opacity-0");
    };
    const handleLeave = () => {
      cursorRef.current?.classList.remove("scale-[2.5]");
      trailRef.current?.classList.remove("opacity-0");
    };

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-3 h-3 bg-[#C9A84C] rounded-full z-[9999] pointer-events-none transition-transform duration-150 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Ring */}
      <div
        ref={trailRef}
        className="custom-cursor fixed top-0 left-0 w-10 h-10 rounded-full z-[9998] pointer-events-none border border-[#C9A84C] opacity-60 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
