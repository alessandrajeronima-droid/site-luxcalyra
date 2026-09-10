"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function PerfumesHero() {
  return (
    <section className="relative overflow-hidden bg-lux-white pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 md:grid-cols-2 md:gap-16 md:px-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs tracking-[0.35em] text-lux-brown uppercase">
            Lux Calyra · Perfumaria Árabe
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.1] text-lux-deep sm:text-5xl md:text-6xl">
            Descubra a fragrância
            <br />
            que se torna sua assinatura.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-lux-brown">
            Uma curadoria de perfumes árabes selecionados para diferentes
            momentos, personalidades e formas de sentir.
          </p>
          <Link
            href="#explorar-perfumes"
            className="mt-9 inline-block rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Explorar Coleção
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative h-[420px] sm:h-[480px] md:h-[560px]"
        >
          <div className="absolute left-0 top-6 h-[78%] w-[62%] overflow-hidden rounded-block shadow-[0_30px_60px_-20px_rgba(61,45,35,0.35)]">
            <Image
              src="/products/masculino/khamrah.png"
              alt="Khamrah, Lattafa"
              fill
              sizes="40vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[62%] w-[52%] overflow-hidden rounded-block shadow-[0_30px_60px_-20px_rgba(61,45,35,0.35)]">
            <Image
              src="/products/feminino/yara.png"
              alt="Yara, Lattafa"
              fill
              sizes="35vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
