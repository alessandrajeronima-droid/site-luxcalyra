"use client";

import Image from "next/image";
import Link from "next/link";
import { useAllBrands } from "@/components/providers/ProductsProvider";
import { formatBRL } from "@/lib/format";
import { useCartStore } from "@/lib/store/cart";
import type { Product } from "@/types/product";

interface RitualBuilderProps {
  title: string;
  subtitle: string;
  pairs: { splash: Product; creme: Product }[];
}

export function RitualBuilder({ title, subtitle, pairs }: RitualBuilderProps) {
  const addItem = useCartStore((s) => s.addItem);
  const brands = useAllBrands();
  if (pairs.length === 0) return null;

  function addPair(splash: Product, creme: Product) {
    addItem(splash);
    addItem(creme);
  }

  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-lux-brown">{subtitle}</p>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-8">
        {pairs.map(({ splash, creme }) => {
          const brand = brands.find((b) => b.slug === splash.brandSlug);
          const total = splash.price + creme.price;
          return (
            <div
              key={splash.id}
              className="flex flex-col items-center gap-6 rounded-block bg-lux-white p-6 sm:flex-row sm:gap-8 md:p-8"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative aspect-[4/5] w-24 flex-shrink-0 overflow-hidden rounded-lg sm:w-32">
                  <Image src={splash.mainImage} alt={splash.name} fill sizes="130px" className="object-cover" />
                </div>
                <span className="font-serif text-2xl text-lux-brown/50">+</span>
                <div className="relative aspect-[4/5] w-24 flex-shrink-0 overflow-hidden rounded-lg sm:w-32">
                  <Image src={creme.mainImage} alt={creme.name} fill sizes="130px" className="object-cover" />
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                {brand && (
                  <span className="text-xs tracking-widest text-lux-brown uppercase">{brand.name}</span>
                )}
                <h3 className="mt-1 font-serif text-2xl text-lux-deep">{splash.name}</h3>
                <p className="mt-1 text-sm text-lux-brown">
                  Body Splash + Creme Corporal
                </p>
                <p className="mt-3 text-lg text-lux-deep">{formatBRL(total)}</p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
                <button
                  onClick={() => addPair(splash, creme)}
                  className="whitespace-nowrap rounded-full bg-lux-deep px-7 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
                >
                  Criar Meu Ritual →
                </button>
                <div className="flex gap-4 text-xs text-lux-brown">
                  <Link href={`/perfume/${splash.slug}`} className="underline underline-offset-4">
                    Ver Body Splash
                  </Link>
                  <Link href={`/perfume/${creme.slug}`} className="underline underline-offset-4">
                    Ver Creme
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
