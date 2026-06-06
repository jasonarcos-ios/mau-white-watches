"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px gold-line" />

        {/* Central glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.5em] uppercase text-[#C9A84C]/50 mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Experiencia Exclusiva
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Agenda una{" "}
          <span className="text-gold-gradient italic block md:inline">Visita Privada</span>
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="gold-line w-24 mx-auto mb-8 origin-center"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/50 italic mb-4 leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Trabajamos con un número selecto de clientes.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="text-base text-white/30 mb-16 leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Cada visita es personalizada, discreta y sin compromiso.
          <br />
          Le asesoramos en la pieza que mejor refleja su identidad.
        </motion.p>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href="https://wa.me/573246823980"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E2C47A 50%, #C9A84C 100%)",
              backgroundSize: "200% auto",
            }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />

            {/* WhatsApp icon */}
            <svg
              className="w-5 h-5 text-black flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>

            <span
              className="text-black font-semibold text-sm tracking-[0.2em] uppercase relative z-10"
              style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.2em" }}
            >
              Escribir por WhatsApp
            </span>

            <svg className="w-4 h-4 text-black/60 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <p className="text-xs text-white/20 tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-cormorant)" }}>
            Respuesta en menos de 24 horas · Confidencialidad garantizada
          </p>
        </motion.div>

        {/* Decorative bottom elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 flex items-center justify-center gap-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/30" />
          <div className="text-[9px] tracking-[0.4em] text-white/20 uppercase" style={{ fontFamily: "var(--font-cormorant)" }}>
            Solo por cita previa
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/30" />
        </motion.div>
      </div>
    </section>
  );
}
