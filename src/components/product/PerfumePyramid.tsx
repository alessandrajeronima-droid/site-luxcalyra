"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";

const TIERS: { key: keyof Product; label: string; sub: string }[] = [
  { key: "topNotes", label: "Saída", sub: "Primeira impressão" },
  { key: "heartNotes", label: "Coração", sub: "A personalidade" },
  { key: "baseNotes", label: "Fundo", sub: "O que fica na pele" },
];

export function PerfumePyramid({ product }: { product: Product }) {
  const hasAny = TIERS.some((t) => (product[t.key] as string[] | undefined)?.length);
  if (!hasAny) return null;

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          A Pirâmide Olfativa
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TIERS.map(({ key, label, sub }, index) => {
            const notes = product[key] as string[] | undefined;
            if (!notes?.length) return null;

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-card bg-lux-champagne/10 p-8 text-left"
              >
                <span className="text-xs tracking-[0.25em] text-lux-brown uppercase">
                  {label}
                </span>
                <p className="mt-1 text-xs text-lux-brown/70">{sub}</p>
                <p className="mt-5 font-serif text-xl leading-snug text-lux-deep">
                  {notes.join(" · ")}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
