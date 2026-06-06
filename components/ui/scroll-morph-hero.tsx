"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import GoldenParticles from "@/components/GoldenParticles";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

const BRANDS = [
  { name: "Rolex",               logo: "/marcas/logos/Rolex.png",               slug: "rolex" },
  { name: "Audemars Piguet",     logo: "/marcas/logos/AP.png",                  slug: "audemars-piguet" },
  { name: "Richard Mille",       logo: "/marcas/logos/Richard Mille.png",       slug: "richard-mille" },
  { name: "Vacheron Constantin", logo: "/marcas/logos/Vacheron Constantin.png", slug: "vacheron-constantin" },
  { name: "A. Lange & Söhne",    logo: "/marcas/logos/A. Lange.png",            slug: "a-lange" },
  { name: "Hublot",              logo: "/marcas/logos/Hublot.png",              slug: "hublot" },
  { name: "Omega",               logo: "/marcas/logos/Omega.png",               slug: "omega" },
  { name: "IWC",                 logo: "/marcas/logos/IWC.png",                 slug: "iwc" },
  { name: "Breitling",           logo: "/marcas/logos/Breitling.png",           slug: "breitling" },
  { name: "Panerai",             logo: "/marcas/logos/Panerai.png",             slug: "panerai" },
  { name: "TAG Heuer",           logo: "/marcas/logos/Tag Heuer.png",           slug: "tag-heuer" },
  { name: "Cartier",             logo: "/marcas/logos/Cartier.png",             slug: "cartier" },
  { name: "Tissot",              logo: "/marcas/logos/Tissot.png",              slug: "tissot" },
  { name: "Longines",            logo: "/marcas/logos/Longines.png",            slug: "longines" },
] as const;

// 20 cards, cycling through 13 brands
const CARD_DATA = [...Array(20)].map((_, i) => BRANDS[i % BRANDS.length]);

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

interface FlipCardProps {
  logo: string;
  brandName: string;
  slug: string;
  index: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

function FlipCard({ logo, brandName, slug, index, target }: FlipCardProps) {
  const router = useRouter();

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
      onClick={() => router.push(`/marcas/${slug}`)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front face — white card, logo centered */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center p-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={logo}
            alt={brandName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Back face — brand name, no WA button */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-white border border-[#1a1a1a] shadow-sm flex flex-col items-center justify-center p-2"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[7px] font-bold text-[#1a1a1a] uppercase tracking-widest text-center leading-tight">
            {brandName}
          </p>
          <div className="mt-1 w-4 h-px bg-[#C9A84C]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const next = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = next;
      virtualScroll.set(next);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set((((e.clientX - rect.left) / rect.width) * 2 - 1) * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"), 500);
    const t2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const scatterPositions = useMemo(
    () =>
      CARD_DATA.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    []
  );

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#FAFAFA] overflow-hidden"
    >
      {/* Golden particle field — behind everything */}
      <GoldenParticles />

      <div className="relative flex h-full w-full flex-col items-center justify-center" style={{ zIndex: 1 }}>

        {/* Phase 1 — Brand name */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold tracking-widest text-[#1a1a1a] text-center"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Mau White<br />Watches
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.5 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-xs font-bold tracking-[0.2em]"
          >
            <span className="scroll-explore-pulse">SCROLL TO EXPLORE</span>
          </motion.p>
        </div>

        {/* Phase 2 — CTA */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2
            className="text-2xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight mb-2"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Descubre tu próximo reloj
          </h2>
          <p className="text-xs text-[#1a1a1a]/50 tracking-[0.2em] uppercase mb-4">
            Selecciona una marca para explorar
          </p>
          <a
            href="https://wa.me/573246823980"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto border border-[#1a1a1a] text-[#1a1a1a] text-xs px-6 py-2 uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
          >
            Contactar por WhatsApp
          </a>
        </motion.div>

        {/* Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {CARD_DATA.map((brand, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineX = i * 70 - (TOTAL_IMAGES * 70) / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDimension * 0.35, 350);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);
              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const boundedRotation = -scrollProgress * spreadAngle * 0.8;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                logo={brand.logo}
                brandName={brand.name}
                slug={brand.slug}
                index={i}
                phase={introPhase}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
