"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Step {
  number: string;
  label: string;
  text: string;
  image: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    label: "Hidratar",
    text: "Comece pela pele. Uma base macia e nutrida é o que faz qualquer fragrância durar mais e se revelar melhor.",
    image: "/products/creme-corporal/bath-body-works-warm-vanilla-sugar-locao.jpg",
  },
  {
    number: "02",
    label: "Perfumar",
    text: "Complete com o body splash da mesma fragrância. A camada final que fixa o aroma e o torna mais presente.",
    image: "/products/body-splash/bath-body-works-warm-vanilla-sugar-mist.jpg",
  },
  {
    number: "03",
    label: "Criar Sua Assinatura",
    text: "Hidratação e fragrância combinadas se tornam parte de você. Repita, e isso vira sua assinatura.",
    image: "/products/body-splash/victorias-secret-bare-vanilla-mist.jpg",
  },
];

export function RitualSteps() {
  return (
    <section className="bg-lux-deep px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs tracking-[0.35em] text-lux-champagne uppercase">
          O Ritual Lux Calyra
        </span>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3 md:gap-6">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-block">
              <Image
                src={step.image}
                alt={step.label}
                fill
                sizes="(max-width: 768px) 90vw, 30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lux-black/70 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 font-serif text-4xl font-light text-lux-white/80">
                {step.number}
              </span>
            </div>
            <h3 className="mt-5 font-serif text-2xl text-lux-white">{step.label}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-lux-white/70">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
