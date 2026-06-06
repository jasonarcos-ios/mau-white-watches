"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FRAMES = [
  "/HERO/1.png",
  "/HERO/2.png",
  "/HERO/3.png",
  "/HERO/4.png",
];

// 4 images × 1 000 ms = 4 s total rotation cycle
const FRAME_MS = 1000;

export default function WatchCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((f) => (f + 1) % FRAMES.length),
      FRAME_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    // ── Sizing shell ──────────────────────────────────────────────────────────
    <div
      className="relative w-[280px] h-[280px] md:w-[480px] md:h-[480px]"
      style={{ perspective: "1000px" }}
    >
      {/* Golden radial glow — sits behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 65%)",
          filter: "blur(32px)",
          transform: "scale(1.2)",
          zIndex: 0,
        }}
      />

      {/* ── Float wrapper (translateY −10 px ↔ 10 px, 3 s) ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          animation: "hero-float 3s ease-in-out infinite",
          zIndex: 1,
        }}
      >
        {/* ── Rock wrapper (rotateY −15° ↔ 15°, 4 s alternate = 8 s pendulum) ── */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            animation: "hero-rock 4s ease-in-out infinite alternate",
          }}
        >
          {/* ── Stacked image frames ─────────────────────────────────────────── */}
          {FRAMES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Mau White Watches — ángulo ${i + 1}`}
              fill
              sizes="(max-width: 768px) 280px, 480px"
              priority={i === 0}
              draggable={false}
              className="object-contain select-none"
              style={{
                position: "absolute",
                opacity: i === active ? 1 : 0,
                // 0.8 s crossfade as specified
                transition: "opacity 0.8s ease-in-out",
                willChange: "opacity",
                // Depth shadow reinforces the 3D feel
                filter:
                  "drop-shadow(0 24px 48px rgba(0,0,0,0.75))" +
                  " drop-shadow(0 0 32px rgba(201,168,76,0.12))",
              }}
            />
          ))}
        </div>
      </div>

      {/* Floor reflection */}
      <div
        aria-hidden
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 pointer-events-none"
        style={{
          height: "32px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)",
          filter: "blur(10px)",
          zIndex: 0,
        }}
      />
    </div>
  );
}
