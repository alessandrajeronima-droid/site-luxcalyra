"use client";

import { motion } from "framer-motion";

export function HousesIntro() {
  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          As Casas Que Escolhemos
        </h2>
        <p className="mt-6 text-base leading-relaxed text-lux-brown">
          Na Lux Calyra, cada fragrância é escolhida por aquilo que desperta.
          Reunimos casas que traduzem diferentes interpretações da perfumaria
          árabe — do clássico ao contemporâneo, do delicado ao marcante.
        </p>
        <p className="mt-4 text-sm text-lux-brown/80">
          Conheça as casas por trás das fragrâncias que fazem parte da nossa
          curadoria.
        </p>
      </motion.div>
    </section>
  );
}
