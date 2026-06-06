"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  // sparkle state
  sparkleTimer: number;   // ms until next sparkle
  sparkleActive: boolean;
  sparkleProgress: number; // 0 → 1 over sparkle duration
}

const COUNT = 60;
const SPARKLE_DURATION = 900; // ms for one sparkle arc

export default function GoldenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      particles = Array.from({ length: COUNT }, () => {
        const baseRadius = Math.random() * 1.5 + 0.8; // 0.8–2.3 px
        const baseOpacity = Math.random() * 0.3 + 0.1; // 0.1–0.4
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          baseRadius,
          radius: baseRadius,
          baseOpacity,
          opacity: baseOpacity,
          sparkleTimer: Math.random() * 3000 + 3000, // 3–6 s
          sparkleActive: false,
          sparkleProgress: 0,
        };
      });
    };

    resize();
    init();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(now - lastTime, 50); // cap dt to avoid jumps
      lastTime = now;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -4) p.x = w + 4;
        else if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        else if (p.y > h + 4) p.y = -4;

        // Sparkle countdown
        if (!p.sparkleActive) {
          p.sparkleTimer -= dt;
          if (p.sparkleTimer <= 0) {
            p.sparkleActive = true;
            p.sparkleProgress = 0;
            p.sparkleTimer = Math.random() * 3000 + 3000;
          }
        }

        // Sparkle animation — bell curve rise & fall
        if (p.sparkleActive) {
          p.sparkleProgress += dt / SPARKLE_DURATION;
          if (p.sparkleProgress >= 1) {
            p.sparkleActive = false;
            p.sparkleProgress = 0;
            p.radius = p.baseRadius;
            p.opacity = p.baseOpacity;
          } else {
            const bell = Math.sin(p.sparkleProgress * Math.PI);
            p.radius = p.baseRadius + bell * (4 - p.baseRadius);
            p.opacity = p.baseOpacity + bell * (0.9 - p.baseOpacity);
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
