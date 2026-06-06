"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParticleBackground from "./ParticleBackground";
import WatchCarousel from "./WatchCarousel";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <ParticleBackground />

      {/* Wide ambient orb — always behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 md:px-16 py-8 z-20"
      >
        <div
          className="text-xs tracking-[0.3em] text-[#C9A84C] font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          EST. MMXXIV
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] text-white/50 uppercase">
          {["Colección", "Nosotros", "Contacto"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}`}
              className="hover:text-[#C9A84C] transition-colors duration-300"
              data-hover
            >
              {item}
            </a>
          ))}
        </div>
        <div className="text-xs tracking-[0.2em] text-white/30">MWW</div>
      </motion.nav>

      {/* ── Hero content: stacked vertically, centered ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 gap-0"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-[10px] uppercase text-[#C9A84C]/70 mb-5 tracking-[0.4em]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Haute Horlogerie
        </motion.p>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span className="gold-shimmer">Mau White Watches</span>
        </motion.h1>

        {/* ── Watch carousel ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="my-4"
        >
          <WatchCarousel />
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="gold-line w-20 mb-7 mt-8 origin-center"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-xl md:text-2xl lg:text-3xl italic text-white/65 leading-snug mb-10"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          &ldquo;Relojes que definen quién eres.&rdquo;
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#coleccion"
            data-hover
            className="px-9 py-3.5 text-sm tracking-[0.2em] uppercase border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.2em" }}
          >
            Ver Colección
          </a>
          <a
            href="https://wa.me/573246823980"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="px-9 py-3.5 text-sm tracking-[0.2em] uppercase text-white/45 hover:text-white/80 transition-colors duration-300"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.2em" }}
          >
            Consulta Privada →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span
          className="text-[10px] tracking-[0.35em] text-white/30 uppercase"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Descubrir
        </span>
        <div className="scroll-bounce w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-[#C9A84C] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
