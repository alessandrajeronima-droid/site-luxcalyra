"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HeroContent } from "@/lib/data/content";

const Hero3D = dynamic(() => import("@/components/3d/Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-24 w-24 animate-pulse rounded-full bg-lux-champagne/30" />
    </div>
  ),
});

export function HeroEditorial({ content }: { content: HeroContent }) {
  return (
    <section className="relative overflow-hidden bg-lux-white pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 md:grid-cols-2 md:gap-16 md:px-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <span className="text-xs tracking-[0.35em] text-lux-brown uppercase">
            {content.eyebrow}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.1] text-lux-deep sm:text-5xl md:text-6xl">
            {content.title.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-lux-brown">
            &ldquo;{content.subtitle}&rdquo;
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href={content.ctaHref}
              className="rounded-full bg-lux-deep px-8 py-3.5 text-center text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
            >
              {content.ctaLabel}
            </Link>
            {content.ctaLabel2 && content.ctaHref2 && (
              <Link
                href={content.ctaHref2}
                className="rounded-full border border-lux-brown/30 px-8 py-3.5 text-center text-sm tracking-wide text-lux-deep transition-colors hover:border-lux-deep"
              >
                {content.ctaLabel2}
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="order-1 md:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-block bg-gradient-to-b from-lux-champagne/25 via-lux-champagne/10 to-transparent">
            <Hero3D />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
