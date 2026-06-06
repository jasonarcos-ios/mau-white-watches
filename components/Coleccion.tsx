"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const watches = [
  {
    name: "Chronos Noir",
    ref: "MWW-001-CN",
    description: "Movimiento automático de manufactura. Caja en acero PVD negro. Reserva de marcha de 72 horas.",
    details: ["42mm", "Acero PVD", "Zafiro AR"],
    accent: "from-[#C9A84C] via-[#9A7A2E] to-[#C9A84C]",
    bgGlow: "rgba(201,168,76,0.06)",
  },
  {
    name: "Prestige Blanc",
    ref: "MWW-002-PB",
    description: "Esfera de nácar blanco. Índices de diamantes. Correa en cuero de cocodrilo cosida a mano.",
    details: ["38mm", "Oro Blanco 18k", "Diamantes VVS"],
    accent: "from-[#E2C47A] via-[#C9A84C] to-[#E2C47A]",
    bgGlow: "rgba(226,196,122,0.07)",
  },
  {
    name: "Perpetuel Gold",
    ref: "MWW-003-PG",
    description: "Calendario perpetuo mecánico. Tourbillon central. Solo 8 unidades disponibles en el mundo.",
    details: ["40mm", "Oro Amarillo 18k", "Edición Limitada"],
    accent: "from-[#9A7A2E] via-[#C9A84C] to-[#9A7A2E]",
    bgGlow: "rgba(154,122,46,0.08)",
  },
];

function WatchCard({ watch, index }: { watch: (typeof watches)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="watch-card glass-card rounded-sm overflow-hidden group"
    >
      {/* Visual placeholder */}
      <div
        className="relative h-64 md:h-72 flex items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 50% 40%, ${watch.bgGlow} 0%, #0a0a0a 70%)` }}
      >
        {/* CSS watch face placeholder */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div
            className="absolute w-44 h-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle, ${watch.bgGlow} 0%, transparent 70%)`, filter: "blur(20px)", transform: "scale(1.5)" }}
          />

          {/* Watch face */}
          <div
            className="w-36 h-36 rounded-full relative"
            style={{
              background: "radial-gradient(ellipse at 35% 30%, #2a2a2a 0%, #0d0d0d 70%)",
              boxShadow: `0 0 0 2px #C9A84C, 0 0 0 5px #111, 0 20px 60px rgba(0,0,0,0.8), 0 4px 20px rgba(201,168,76,0.2)`,
            }}
          >
            {/* Inner dial */}
            <div className="absolute inset-[10%] rounded-full flex items-center justify-center"
              style={{ background: "radial-gradient(ellipse at 40% 30%, #181818 0%, #080808 100%)", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              {/* Hour markers */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const r = 38;
                const x = 50 + r * Math.sin(angle);
                const y = 50 - r * Math.cos(angle);
                return (
                  <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                    <div style={{
                      width: i % 3 === 0 ? "2px" : "1px",
                      height: i % 3 === 0 ? "7px" : "4px",
                      background: `linear-gradient(180deg, #E2C47A, #C9A84C)`,
                      transform: `rotate(${i * 30}deg)`,
                      opacity: i % 3 === 0 ? 1 : 0.5,
                    }} />
                  </div>
                );
              })}
              {/* Watch name on dial */}
              <div className="absolute w-full text-center" style={{ top: "28%", fontSize: "5.5px", letterSpacing: "0.18em", color: "#C9A84C", fontFamily: "var(--font-playfair)" }}>
                {watch.name.split(" ")[0].toUpperCase()}
              </div>
              {/* Hands */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute origin-bottom" style={{ width: "1.5px", height: "30%", bottom: "50%", left: "calc(50% - 0.75px)", background: "#C9A84C", transform: `rotate(${-60 + index * 40}deg)`, borderRadius: "1px" }} />
                <div className="absolute origin-bottom" style={{ width: "1px", height: "38%", bottom: "50%", left: "calc(50% - 0.5px)", background: "#fff", transform: `rotate(${80 + index * 30}deg)`, borderRadius: "1px" }} />
                <div className="absolute w-2 h-2 rounded-full" style={{ background: "radial-gradient(circle, #E2C47A, #9A7A2E)", top: "calc(50% - 4px)", left: "calc(50% - 4px)" }} />
              </div>
            </div>
          </div>

          {/* Mini straps */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[90%] w-8 h-12 rounded-t" style={{ background: "linear-gradient(180deg, #1a1a1a, #111)", border: "1px solid rgba(201,168,76,0.1)" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[90%] w-8 h-12 rounded-b" style={{ background: "linear-gradient(180deg, #111, #1a1a1a)", border: "1px solid rgba(201,168,76,0.1)" }} />
        </div>

        {/* Corner accent */}
        <div className={`absolute top-0 left-0 w-16 h-px bg-gradient-to-r ${watch.accent}`} />
        <div className={`absolute top-0 left-0 h-16 w-px bg-gradient-to-b ${watch.accent}`} />
        <div className={`absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l ${watch.accent}`} />
        <div className={`absolute bottom-0 right-0 h-16 w-px bg-gradient-to-t ${watch.accent}`} />

        {/* Ref badge */}
        <div className="absolute top-4 right-4 text-[9px] tracking-[0.2em] text-[#C9A84C]/50">
          {watch.ref}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 md:p-8">
        {/* Gold line */}
        <div className={`h-px w-10 bg-gradient-to-r ${watch.accent} mb-5`} />

        <h3
          className="text-xl md:text-2xl font-semibold text-white mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {watch.name}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5" style={{ fontFamily: "var(--font-cormorant)", fontSize: "15px" }}>
          {watch.description}
        </p>

        {/* Specs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {watch.details.map((d) => (
            <span
              key={d}
              className="text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]/70 border border-[#C9A84C]/15 px-2.5 py-1"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-1">Precio</div>
            <div className="text-base text-[#C9A84C] italic" style={{ fontFamily: "var(--font-cormorant)" }}>
              A consultar
            </div>
          </div>
          <a
            href="https://wa.me/573246823980"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-[#C9A84C] transition-colors duration-300 border-b border-transparent hover:border-[#C9A84C]/30 pb-0.5"
          >
            Consultar →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Coleccion() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="coleccion" className="relative py-24 md:py-36 px-6 bg-[#050505]">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px gold-line" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C]/60 mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Selección Exclusiva
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            La{" "}
            <span className="text-gold-gradient italic">Colección</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="gold-line w-20 mx-auto mb-6 origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/40 max-w-md mx-auto text-lg"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
          >
            Cada pieza, una obra maestra con historia propia.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {watches.map((watch, i) => (
            <WatchCard key={watch.ref} watch={watch} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-xs tracking-[0.25em] mt-14 uppercase"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Disponibilidad sujeta a inventario · Consulte por referencias adicionales
        </motion.p>
      </div>
    </section>
  );
}
