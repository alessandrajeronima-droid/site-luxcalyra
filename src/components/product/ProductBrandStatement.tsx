"use client";

import { motion } from "framer-motion";

export function ProductBrandStatement({ text }: { text: string }) {
  return (
    <section className="bg-lux-white px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="font-serif text-3xl font-light leading-tight text-lux-deep sm:text-4xl md:text-5xl">
          {text}
        </h2>
      </motion.div>
    </section>
  );
}
