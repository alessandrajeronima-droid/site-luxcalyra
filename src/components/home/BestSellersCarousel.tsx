"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAllProducts, useAllBrands } from "@/components/providers/ProductsProvider";
import { formatBRL } from "@/lib/format";

export function BestSellersCarousel() {
  const products = useAllProducts();
  const brands = useAllBrands();
  const items = products.filter((p) => p.isBestseller);
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollerRef.current?.scrollBy({ left: e.deltaY, behavior: "auto" });
    }
  }

  return (
    <section className="bg-lux-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
              Best Sellers
            </h2>
            <p className="mt-2 text-sm text-lux-brown">Os perfumes que mais conquistam.</p>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              onClick={() => scrollBy(-420)}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-lux-champagne/60 text-lux-brown transition-colors hover:border-lux-deep hover:text-lux-deep"
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(420)}
              aria-label="Próximo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-lux-champagne/60 text-lux-brown transition-colors hover:border-lux-deep hover:text-lux-deep"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onWheel={handleWheel}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((product) => {
          const brand = brands.find((b) => b.slug === product.brandSlug);
          return (
            <Link
              key={product.id}
              href={`/perfume/${product.slug}`}
              className="group w-[68vw] flex-shrink-0 snap-start sm:w-[38vw] md:w-[26vw] lg:w-[20vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-lux-champagne/10">
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 68vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4">
                {brand && (
                  <span className="text-[10px] tracking-widest text-lux-brown uppercase">
                    {brand.name}
                  </span>
                )}
                <h3 className="font-serif text-lg text-lux-deep">{product.name}</h3>
                <span className="text-xs text-lux-brown">{formatBRL(product.price)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
