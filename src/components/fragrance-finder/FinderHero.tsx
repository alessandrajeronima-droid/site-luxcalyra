"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function FinderHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex h-[560px] items-center justify-center overflow-hidden bg-lux-deep md:h-[640px]">
      <Image
        src="/products/feminino/queen-of-arabia.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lux-black/85 via-lux-black/40 to-lux-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 text-center"
      >
        <span className="text-xs tracking-[0.4em] text-lux-champagne uppercase">
          Find Your Signature Scent
        </span>
        <h1 className="mt-4 font-serif text-4xl font-light text-lux-white sm:text-5xl md:text-6xl">
          Encontre sua Assinatura
        </h1>
        <p className="mt-5 max-w-md text-sm text-lux-white/75 md:text-base">
          Quatro perguntas para descobrir o perfume árabe que combina com
          você.
        </p>
        <button
          onClick={onStart}
          className="mt-9 rounded-full bg-lux-champagne px-9 py-3.5 text-sm tracking-wide text-lux-deep transition-colors hover:bg-lux-white"
        >
          Começar a Descoberta →
        </button>
      </motion.div>
    </section>
  );
}
