"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAllBrands, useAllProducts } from "@/components/providers/ProductsProvider";

interface FeaturedHouse {
  brandSlug: string;
  image: string;
}

const FEATURED: FeaturedHouse[] = [
  { brandSlug: "lattafa", image: "/products/masculino/khamrah.png" },
  { brandSlug: "al-wataniah", image: "/products/feminino/sabah-al-ward-garden.png" },
  { brandSlug: "maison-alhambra", image: "/products/masculino/victorioso.png" },
  { brandSlug: "armaf", image: "/products/feminino/club-de-nuit-woman.png" },
];

export function DesiredHouses() {
  const brands = useAllBrands();
  const products = useAllProducts();

  return (
    <section className="bg-lux-champagne/10 py-20 md:py-28">
      <div className="mx-auto mb-14 max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          As Casas Mais Desejadas
        </h2>
      </div>

      <div className="flex flex-col gap-20 md:gap-28">
        {FEATURED.map((house, index) => {
          const brand = brands.find((b) => b.slug === house.brandSlug);
          if (!brand) return null;
          const count = products.filter((p) => p.brandSlug === house.brandSlug).length;
          const reversed = index % 2 === 1;

          return (
            <div
              key={house.brandSlug}
              className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-5 md:gap-4 md:px-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`relative aspect-[16/10] overflow-hidden rounded-block md:col-span-3 ${
                  reversed ? "md:order-2" : "md:order-1"
                }`}
              >
                <Image
                  src={house.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`md:col-span-2 ${reversed ? "md:order-1" : "md:order-2"}`}
              >
                <span className="font-serif text-3xl text-lux-deep">{brand.name}</span>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-lux-brown">
                  {brand.description}
                </p>
                <p className="mt-4 text-xs tracking-widest text-lux-brown/70 uppercase">
                  {count} {count === 1 ? "fragrância" : "fragrâncias"}
                </p>
                <Link
                  href={`/marcas/${brand.slug}`}
                  className="mt-6 inline-block text-sm tracking-wide text-lux-deep underline underline-offset-4 transition-colors hover:text-lux-brown"
                >
                  Explorar {brand.name} →
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
