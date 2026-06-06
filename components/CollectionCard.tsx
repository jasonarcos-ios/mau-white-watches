"use client";

import { useState } from "react";

interface Props {
  name: string;
  slug: string;
  brandName: string;
  brandSlug: string;
  image: string;
}

export default function CollectionCard({ name, slug, brandName, brandSlug, image }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const imagePath = image;
  const waMessage = encodeURIComponent(
    `Hola, estoy interesado en la colección ${name} de ${brandName}. ¿Pueden darme más información?`
  );
  const waUrl = `https://wa.me/573246823980?text=${waMessage}`;

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col h-[300px] md:h-[400px]">

      {/* Image area — 65% height */}
      <div className="relative w-full overflow-hidden" style={{ height: "65%" }}>
        {/* Gold gradient placeholder — always present */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(145deg, #faf7f0 0%, #f0e8d0 40%, #f7f2e5 70%, #faf7f0 100%)",
          }}
        >
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.05) 60%, transparent 100%)",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 100%)",
                border: "1px solid rgba(201,168,76,0.4)",
              }}
            />
          </div>
        </div>

        {/* Real image — overlays placeholder when it loads */}
        {!imgFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePath}
            alt={name}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        )}
      </div>

      {/* Gold divider */}
      <div className="w-full h-px bg-[#C9A84C] opacity-40 flex-shrink-0" />

      {/* Text area — 35% height */}
      <div
        className="flex flex-col items-center justify-center gap-2 px-4 py-3 flex-shrink-0"
        style={{ height: "35%" }}
      >
        <h3
          className="text-sm md:text-base font-semibold text-[#1a1a1a] text-center leading-tight tracking-wide"
          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
        >
          {name}
        </h3>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.15em] border border-[#1a1a1a]/30 text-[#1a1a1a]/60 px-4 py-1.5 rounded-full hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all duration-200"
        >
          Consultar
        </a>
      </div>
    </div>
  );
}
