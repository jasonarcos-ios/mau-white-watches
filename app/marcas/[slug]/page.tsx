import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GoldenParticles from "@/components/GoldenParticles";
import CollectionCard from "@/components/CollectionCard";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Collection = { name: string; slug: string; image: string };
type Brand = { name: string; logo: string; collections: Collection[] };

const BRAND_DATA: Record<string, Brand> = {
  rolex: {
    name: "Rolex",
    logo: "/marcas/logos/Rolex.png",
    collections: [
      { name: "Submariner",    slug: "submariner",    image: "/colecciones/rolex-submariner.png" },
      { name: "Daytona",       slug: "daytona",       image: "/colecciones/rolex-daytona.png" },
      { name: "Day-Date",      slug: "day-date",      image: "/colecciones/rolex-day-date.png" },
      { name: "Datejust",      slug: "datejust",      image: "/colecciones/rolex-datejust.png" },
      { name: "GMT-Master II", slug: "gmt-master-ii", image: "/colecciones/rolex-gmt-master-ii.png" },
      { name: "Sky-Dweller",   slug: "sky-dweller",   image: "/colecciones/rolex-sky-dweller.png" },
    ],
  },
  "audemars-piguet": {
    name: "Audemars Piguet",
    logo: "/marcas/logos/AP.png",
    collections: [
      { name: "Royal Oak",          slug: "royal-oak",         image: "/colecciones/ap-royal-oak.png" },
      { name: "Royal Oak Offshore", slug: "royal-oak-offshore", image: "/colecciones/ap-royal-oak-offshore.png" },
      { name: "Royal Oak Concept",  slug: "royal-oak-concept",  image: "/colecciones/ap-royal-oak-concept.png" },
    ],
  },
  "richard-mille": {
    name: "Richard Mille",
    logo: "/marcas/logos/Richard Mille.png",
    collections: [
      { name: "RM 11", slug: "rm-11", image: "/colecciones/rm-11.png" },
      { name: "RM 35", slug: "rm-35", image: "/colecciones/rm-35.png" },
      { name: "RM 67", slug: "rm-67", image: "/colecciones/rm-67.png" },
    ],
  },
  "vacheron-constantin": {
    name: "Vacheron Constantin",
    logo: "/marcas/logos/Vacheron Constantin.png",
    collections: [
      { name: "Overseas",       slug: "overseas",       image: "/colecciones/vc-overseas.png" },
      { name: "Patrimony",      slug: "patrimony",      image: "/colecciones/vc-patrimony.png" },
      { name: "Traditionnelle", slug: "traditionnelle", image: "/colecciones/vc-traditionnelle.png" },
    ],
  },
  hublot: {
    name: "Hublot",
    logo: "/marcas/logos/Hublot.png",
    collections: [
      { name: "Big Bang",           slug: "big-bang",        image: "/colecciones/hublot-big-bang.png" },
      { name: "Classic Fusion",     slug: "classic-fusion",  image: "/colecciones/hublot-classic-fusion.png" },
      { name: "Spirit of Big Bang", slug: "spirit-of-big-bang", image: "/colecciones/hublot-spirit-big-bang.png" },
    ],
  },
  omega: {
    name: "Omega",
    logo: "/marcas/logos/Omega.png",
    collections: [
      { name: "Seamaster",     slug: "seamaster",     image: "/colecciones/omega-seamaster.png" },
      { name: "Speedmaster",   slug: "speedmaster",   image: "/colecciones/omega-speedmaster.png" },
      { name: "Constellation", slug: "constellation", image: "/colecciones/omega-constellation.png" },
      { name: "De Ville",      slug: "de-ville",      image: "/colecciones/omega-de-ville.png" },
    ],
  },
  iwc: {
    name: "IWC",
    logo: "/marcas/logos/IWC.png",
    collections: [
      { name: "Portugieser", slug: "portugieser", image: "/colecciones/iwc-portugieser.png" },
      { name: "Pilot's",     slug: "pilots",      image: "/colecciones/iwc-pilots.png" },
      { name: "Portofino",   slug: "portofino",   image: "/colecciones/iwc-portofino.png" },
      { name: "Aquatimer",   slug: "aquatimer",   image: "/colecciones/iwc-aquatimer.png" },
    ],
  },
  breitling: {
    name: "Breitling",
    logo: "/marcas/logos/Breitling.png",
    collections: [
      { name: "Navitimer",  slug: "navitimer",  image: "/colecciones/breitling-navitimer.png" },
      { name: "Superocean", slug: "superocean", image: "/colecciones/breitling-superocean.png" },
      { name: "Chronomat",  slug: "chronomat",  image: "/colecciones/breitling-chronomat.png" },
      { name: "Avenger",    slug: "avenger",    image: "/colecciones/breitling-avenger.png" },
    ],
  },
  panerai: {
    name: "Panerai",
    logo: "/marcas/logos/Panerai.png",
    collections: [
      { name: "Luminor",      slug: "luminor",      image: "/colecciones/panerai-luminor.png" },
      { name: "Radiomir",     slug: "radiomir",     image: "/colecciones/panerai-radiomir.png" },
      { name: "Submersible",  slug: "submersible",  image: "/colecciones/panerai-submersible.png" },
    ],
  },
  "tag-heuer": {
    name: "TAG Heuer",
    logo: "/marcas/logos/Tag Heuer.png",
    collections: [
      { name: "Carrera",   slug: "carrera",   image: "/colecciones/tag-carrera.png" },
      { name: "Monaco",    slug: "monaco",    image: "/colecciones/tag-monaco.png" },
      { name: "Aquaracer", slug: "aquaracer", image: "/colecciones/tag-aquaracer.png" },
      { name: "Formula 1", slug: "formula-1", image: "/colecciones/tag-formula-1.png" },
    ],
  },
  cartier: {
    name: "Cartier",
    logo: "/marcas/logos/Cartier.png",
    collections: [
      { name: "Santos",      slug: "santos",      image: "/colecciones/cartier-santos.png" },
      { name: "Tank",        slug: "tank",        image: "/colecciones/cartier-tank.png" },
      { name: "Ballon Bleu", slug: "ballon-bleu", image: "/colecciones/cartier-ballon-bleu.png" },
      { name: "Panthère",    slug: "panthere",    image: "/colecciones/cartier-panthere.png" },
    ],
  },
  tissot: {
    name: "Tissot",
    logo: "/marcas/logos/Tissot.png",
    collections: [
      { name: "PRX",      slug: "prx",      image: "/colecciones/tissot-prx.png" },
      { name: "Le Locle", slug: "le-locle", image: "/colecciones/tissot-le-locle.png" },
      { name: "T-Touch",  slug: "t-touch",  image: "/colecciones/tissot-t-touch.png" },
      { name: "Seastar",  slug: "seastar",  image: "/colecciones/tissot-seastar.png" },
    ],
  },
  longines: {
    name: "Longines",
    logo: "/marcas/logos/Longines.png",
    collections: [
      { name: "Master Collection", slug: "master-collection", image: "/colecciones/longines-master.png" },
      { name: "HydroConquest",     slug: "hydroconquest",     image: "/colecciones/longines-hydroconquest.png" },
      { name: "Spirit",            slug: "spirit",            image: "/colecciones/longines-spirit.png" },
      { name: "Conquest",          slug: "conquest",          image: "/colecciones/longines-conquest.png" },
    ],
  },
  "a-lange": {
    name: "A. Lange & Söhne",
    logo: "/marcas/logos/A. Lange.png",
    collections: [
      { name: "Lange 1",  slug: "lange-1",  image: "/colecciones/lange-lange-1.png" },
      { name: "Saxonia",  slug: "saxonia",  image: "/colecciones/lange-saxonia.png" },
      { name: "Zeitwerk", slug: "zeitwerk", image: "/colecciones/lange-zeitwerk.png" },
      { name: "Odysseus", slug: "odysseus", image: "/colecciones/lange-odysseus.png" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(BRAND_DATA).map((slug) => ({ slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = BRAND_DATA[slug];
  if (!brand) notFound();

  return (
    <main className="relative min-h-screen bg-[#FAFAFA]">
      {/* Particle field — behind everything */}
      <GoldenParticles />

      <div className="relative" style={{ zIndex: 1 }}>

        {/* Back button */}
        <Link
          href="/"
          className="fixed top-6 left-6 z-50 text-[10px] tracking-[0.25em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-1.5"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          ← Volver
        </Link>

        {/* MW logo — top right */}
        <div className="fixed top-6 right-6 z-50">
          <Image src="/mw-logo.png" alt="Mau White Watches" height={120} width={360} className="h-[120px] w-auto" />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center pt-20 pb-10 px-6">
          {/* Brand logo */}
          <div className="relative h-16 md:h-20 w-48 md:w-64 mb-6">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Gold divider */}
          <div className="w-10 h-px bg-[#C9A84C] mb-5" />

          {/* Brand name */}
          <h1
            className="text-2xl md:text-3xl font-bold text-[#1a1a1a] text-center tracking-tight"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            {brand.name}
          </h1>
          <p
            className="mt-2 text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/35"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Colección Disponible
          </p>
        </div>

        {/* Collection grid */}
        <div className="max-w-5xl mx-auto px-6 md:px-10 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {brand.collections.map((col) => (
              <CollectionCard
                key={col.slug}
                name={col.name}
                slug={col.slug}
                brandName={brand.name}
                brandSlug={slug}
                image={col.image}
              />
            ))}
          </div>
        </div>

        {/* Footer strip */}
        <div className="text-center pb-10">
          <p
            className="text-[10px] tracking-[0.25em] uppercase text-[#1a1a1a]/20"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Mau White Watches · Solo por cita previa
          </p>
        </div>
      </div>
    </main>
  );
}
