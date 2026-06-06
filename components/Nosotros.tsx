"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "+200", label: "Relojes Curados" },
  { value: "15+", label: "Marcas de Alta Gama" },
  { value: "100%", label: "Autenticidad Garantizada" },
];

export default function Nosotros() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "#07070A" }}
    >
      {/* Decorative background lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal gold lines */}
        <div className="absolute top-0 left-0 right-0 h-px gold-line" />
        <div className="absolute bottom-0 left-0 right-0 h-px gold-line" />

        {/* Diagonal accent */}
        <motion.div
          style={{ y: bgY, background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.1), transparent)" }}
          className="absolute -left-20 top-0 bottom-0 w-px origin-top"
        />
        <motion.div
          style={{ y: bgY, background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.06), transparent)" }}
          className="absolute right-1/3 top-0 bottom-0 w-px"
        />

        {/* Ambient glow */}
        <div
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — visual element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Large decorative number */}
            <div
              className="text-[160px] md:text-[200px] font-bold leading-none select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-playfair)",
                background: "linear-gradient(180deg, rgba(201,168,76,0.08) 0%, transparent 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MW
            </div>

            {/* Floating card */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card rounded-sm p-8 w-64 text-center"
              style={{ border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <div className="text-[10px] tracking-[0.3em] text-[#C9A84C]/60 uppercase mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                Fundado
              </div>
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                2024
              </div>
              <div className="gold-line w-12 mx-auto mb-3" />
              <div className="text-xs text-white/40 italic" style={{ fontFamily: "var(--font-cormorant)" }}>
                Colombia
              </div>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 left-4 w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-px bg-[#C9A84C]/30" />
              <div className="absolute top-0 left-0 h-full w-px bg-[#C9A84C]/30" />
            </div>
            <div className="absolute bottom-4 right-4 w-12 h-12">
              <div className="absolute bottom-0 right-0 w-full h-px bg-[#C9A84C]/30" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A84C]/30" />
            </div>
          </motion.div>

          {/* Right — text */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]/60 mb-5"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Nuestra Historia
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Quiénes{" "}
              <span className="text-gold-gradient italic">Somos</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="gold-line w-16 mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-white/70 leading-relaxed mb-6 italic"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              &ldquo;Una selección curada para quienes aprecian lo extraordinario.&rdquo;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-white/45 leading-relaxed mb-10 text-base"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px" }}
            >
              En Mau White Watches no vendemos relojes. Facilitamos el acceso a piezas de ingeniería y arte que trascienden el tiempo. Cada referencia en nuestra selección pasa por un riguroso proceso de autenticación y valoración antes de llegar a nuestros clientes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/35 leading-relaxed mb-12 text-base"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px" }}
            >
              Operamos por cita previa, garantizando una experiencia íntima y completamente personalizada. Su privacidad y satisfacción son nuestra prioridad absoluta.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.12 }}
                  className="text-center"
                >
                  <div
                    className="text-2xl md:text-3xl font-bold mb-1 text-gold-gradient"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/30 tracking-[0.15em] uppercase leading-tight" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
