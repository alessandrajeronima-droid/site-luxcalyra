import Link from "next/link";
import Image from "next/image";
import { getBrandBySlug } from "@/lib/data/brands";
import { formatBRL } from "@/lib/format";
import type { Product } from "@/types/product";

export async function ExploreHouse({
  brandSlug,
  products,
}: {
  brandSlug: string | null;
  products: Product[];
}) {
  const brand = await getBrandBySlug(brandSlug);
  if (!brand || products.length === 0) return null;

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Explore Mais da {brand.name}
        </h2>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/perfume/${product.slug}`}
              className="group w-40 flex-shrink-0 sm:w-48"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-lux-champagne/10">
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-serif text-base text-lux-deep">{product.name}</p>
              <p className="text-xs text-lux-brown">{formatBRL(product.price)}</p>
            </Link>
          ))}
        </div>

        <Link
          href={`/marcas/${brand.slug}`}
          className="mt-6 inline-block text-xs tracking-widest text-lux-brown underline underline-offset-4 hover:text-lux-deep"
        >
          Ver coleção completa {brand.name}
        </Link>
      </div>
    </section>
  );
}
