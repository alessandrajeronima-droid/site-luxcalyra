"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";

export function TheFragrance({ product }: { product: Product }) {
  if (!product.description) return null;

  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs tracking-[0.3em] text-lux-brown uppercase">
            A Fragrância
          </span>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-lux-deep">
            {product.description}
          </p>
          {product.inspiredBy && (
            <p className="mt-6 border-l-2 border-lux-champagne pl-5 text-sm text-lux-brown">
              {product.inspiredBy}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square overflow-hidden rounded-block"
        >
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
