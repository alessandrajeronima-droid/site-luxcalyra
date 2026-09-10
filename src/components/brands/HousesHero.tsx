"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HousesHero() {
  return (
    <section className="relative flex h-[500px] items-center justify-center overflow-hidden bg-lux-deep md:h-[620px]">
      <Image
        src="/brand/icon-3d-material-reference.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lux-black/80 via-lux-black/30 to-lux-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 text-center"
      >
        <span className="text-xs tracking-[0.4em] text-lux-champagne uppercase">
          Lux Calyra
        </span>
        <h1 className="mt-4 font-serif text-4xl font-light text-lux-white sm:text-5xl md:text-6xl">
          Um Universo de Casas
        </h1>
        <p className="mt-5 text-sm text-lux-white/75 md:text-base">
          Descubra as casas por trás da curadoria Lux Calyra.
        </p>
      </motion.div>
    </section>
  );
}
