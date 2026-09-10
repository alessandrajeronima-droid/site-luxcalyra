"use client";

import { motion } from "framer-motion";
import { computeOlfactiveProfile } from "@/lib/productEditorial";
import type { Product } from "@/types/product";

export function OlfactiveProfile({ product }: { product: Product }) {
  const profile = computeOlfactiveProfile(product);
  if (profile.length === 0) return null;

  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
            A Assinatura Olfativa
          </h2>
          <p className="mt-3 text-sm text-lux-brown">
            O peso de cada característica nesta fragrância.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {profile.map((entry, index) => (
            <div key={entry.label}>
              <div className="flex justify-between text-sm text-lux-deep">
                <span className="tracking-wide">{entry.label}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-lux-white">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${entry.value * 10}%` }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-1.5 rounded-full bg-gradient-to-r from-lux-brown to-lux-champagne"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
