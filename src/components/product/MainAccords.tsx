"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";

export function MainAccords({ product }: { product: Product }) {
  const accords = product.mainAccords;
  if (!accords?.length) return null;

  const max = accords.length;

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Principais Acordes
        </h2>

        <div className="mt-12 space-y-5">
          {accords.map((accord, index) => {
            const widthPercent = 100 - (index / max) * 55;
            return (
              <div key={accord}>
                <span className="text-sm tracking-wide text-lux-deep">{accord}</span>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-lux-champagne/25">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-1.5 rounded-full bg-gradient-to-r from-lux-brown to-lux-champagne"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
