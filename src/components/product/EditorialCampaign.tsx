import Image from "next/image";
import { getEditorialAdjectives } from "@/lib/productEditorial";
import type { Product } from "@/types/product";

export function EditorialCampaign({ product }: { product: Product }) {
  const adjectives = getEditorialAdjectives(product, 3);
  if (adjectives.length < 2) return null;

  return (
    <section className="px-6 py-10 md:px-12 md:py-16">
      <div className="relative mx-auto flex min-h-[55vh] max-w-7xl items-end overflow-hidden rounded-block bg-lux-deep">
        <Image
          src={product.mainImage}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lux-black/90 via-lux-black/20 to-transparent" />

        <div className="relative z-10 p-8 md:p-16">
          <span className="text-xs tracking-[0.35em] text-lux-champagne uppercase">
            {product.name}
          </span>
          <h2 className="mt-3 font-serif text-4xl font-light leading-none text-lux-white sm:text-5xl md:text-6xl">
            {adjectives.map((adj) => (
              <span key={adj} className="block">
                {adj}.
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
