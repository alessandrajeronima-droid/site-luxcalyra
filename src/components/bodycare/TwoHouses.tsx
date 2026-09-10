"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAllBrands, useAllProducts } from "@/components/providers/ProductsProvider";
import type { Category } from "@/types/product";
import { brandProductCount } from "@/lib/bodyCare";

interface HouseEntry {
  brandSlug: string;
  image: string;
}

interface TwoHousesProps {
  title: string;
  subtitle: string;
  category: Category;
  basePath: string;
  houses: HouseEntry[];
}

export function TwoHouses({ title, subtitle, category, basePath, houses }: TwoHousesProps) {
  const brands = useAllBrands();
  const products = useAllProducts();

  return (
    <section className="bg-lux-champagne/10 py-20 md:py-28">
      <div className="mx-auto mb-14 max-w-2xl px-6 text-center">
        <h2 className="font-serif text-3xl font-light leading-tight text-lux-deep sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-sm text-lux-brown">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-20 md:gap-28">
        {houses.map((house, index) => {
          const brand = brands.find((b) => b.slug === house.brandSlug);
          if (!brand) return null;
          const count = brandProductCount(products, house.brandSlug, category);
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
                {count > 0 ? (
                  <>
                    <p className="mt-4 text-xs tracking-widest text-lux-brown/70 uppercase">
                      {count} {count === 1 ? "fragrância" : "fragrâncias"}
                    </p>
                    <Link
                      href={`${basePath}?brand=${brand.slug}#explorar`}
                      className="mt-6 inline-block text-sm tracking-wide text-lux-deep underline underline-offset-4 transition-colors hover:text-lux-brown"
                    >
                      Explorar {brand.name} →
                    </Link>
                  </>
                ) : (
                  <p className="mt-4 text-xs tracking-widest text-lux-brown/50 uppercase">
                    Em breve nesta categoria
                  </p>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
