"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BodyCareHeroProps {
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export function BodyCareHero({ eyebrow, title, text, ctaLabel, ctaHref, image }: BodyCareHeroProps) {
  return (
    <section className="relative flex h-[620px] items-center overflow-hidden bg-lux-deep md:h-[720px]">
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lux-black/85 via-lux-black/35 to-lux-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-lux-black/60 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12"
      >
        <div className="max-w-lg">
          <span className="text-xs tracking-[0.4em] text-lux-champagne uppercase">{eyebrow}</span>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.1] text-lux-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-lux-white/80 md:text-base">
            {text}
          </p>
          <Link
            href={ctaHref}
            className="mt-9 inline-block rounded-full bg-lux-champagne px-9 py-3.5 text-sm tracking-wide text-lux-deep transition-colors hover:bg-lux-white"
          >
            {ctaLabel}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
