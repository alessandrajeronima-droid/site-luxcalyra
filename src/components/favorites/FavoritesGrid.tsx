"use client";

import Link from "next/link";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useAllProducts } from "@/components/providers/ProductsProvider";
import { ProductCard } from "@/components/products/ProductCard";

export function FavoritesGrid() {
  const slugs = useFavoritesStore((s) => s.slugs);
  const allProducts = useAllProducts();
  const products = slugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="text-sm leading-relaxed text-lux-brown">
          Você ainda não favoritou nenhum produto. Toque no coração em qualquer perfume,
          body splash ou creme para salvá-lo aqui.
        </p>
        <Link
          href="/perfumes"
          className="mt-8 inline-block rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
        >
          Explorar Perfumes →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
