"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAllProducts } from "@/components/providers/ProductsProvider";

export function DiscoverySetTeaser() {
  const products = useAllProducts();
  const preview = products.filter((p) => p.category === "perfume").slice(5, 8);

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Discovery Set
        </h2>
        <p className="mt-3 text-sm text-lux-brown">Monte sua seleção de fragrâncias.</p>

        <div className="mt-12 flex items-center justify-center gap-4">
          {preview.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative h-28 w-20 overflow-hidden rounded-card shadow-sm sm:h-36 sm:w-28"
            >
              <Image src={product.mainImage} alt={product.name} fill sizes="120px" className="object-cover" />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex h-28 w-20 flex-shrink-0 items-center justify-center rounded-card border border-dashed border-lux-brown/40 text-2xl text-lux-brown sm:h-36 sm:w-28"
          >
            +
          </motion.div>
        </div>

        <Link
          href="/decants"
          className="mt-10 inline-block rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
        >
          Montar Meu Set
        </Link>
      </div>
    </section>
  );
}
