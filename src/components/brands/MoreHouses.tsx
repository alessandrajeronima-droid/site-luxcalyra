"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAllBrands, useAllProducts } from "@/components/providers/ProductsProvider";

const HOUSES = [
  { brandSlug: "asdaaf", image: "/products/feminino/raneen.png" },
  { brandSlug: "rayhaan", image: "/products/masculino/pacific-aura.png" },
  { brandSlug: "john-gustav", image: "/products/masculino/scandant.png" },
];

function HouseCard({
  brandSlug,
  image,
  large = false,
}: {
  brandSlug: string;
  image: string;
  large?: boolean;
}) {
  const brands = useAllBrands();
  const products = useAllProducts();
  const brand = brands.find((b) => b.slug === brandSlug);
  if (!brand) return null;
  const count = products.filter((p) => p.brandSlug === brandSlug).length;

  return (
    <Link
      href={`/marcas/${brandSlug}`}
      className="group relative block overflow-hidden rounded-card"
      style={{ aspectRatio: large ? "16 / 10" : "4 / 5" }}
    >
      <Image
        src={image}
        alt={brand.name}
        fill
        sizes={large ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 45vw, 28vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lux-black/75 via-lux-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1">
        <span className="font-serif text-2xl text-lux-white">{brand.name}</span>
        <p className="mt-1 text-xs tracking-widest text-lux-white/70 uppercase">
          {count} {count === 1 ? "fragrância" : "fragrâncias"}
        </p>
        <span className="mt-2 inline-block text-xs text-lux-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          Ver fragrâncias →
        </span>
      </div>
    </Link>
  );
}

export function MoreHouses() {
  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Mais Casas da Curadoria
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <HouseCard brandSlug={HOUSES[0].brandSlug} image={HOUSES[0].image} large />
          <div className="grid grid-cols-2 gap-6">
            <HouseCard brandSlug={HOUSES[1].brandSlug} image={HOUSES[1].image} />
            <HouseCard brandSlug={HOUSES[2].brandSlug} image={HOUSES[2].image} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
