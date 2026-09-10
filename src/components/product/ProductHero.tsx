"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBrandBySlug } from "@/components/providers/ProductsProvider";
import { formatBRL } from "@/lib/format";
import { productWhatsappLink } from "@/lib/whatsapp";
import { useCartStore } from "@/lib/store/cart";
import { getEditorialTagline } from "@/lib/productEditorial";
import { getFormatLabel } from "@/lib/bodyCare";
import { FavoriteButton } from "@/components/products/FavoriteButton";
import type { Product } from "@/types/product";

const BENEFITS = [
  { icon: "◐", label: "PIX com aprovação imediata" },
  { icon: "⋯", label: "Em até 3x sem juros" },
  { icon: "✦", label: "Atendimento por consultora" },
];

export function ProductHero({ product }: { product: Product }) {
  const brand = useBrandBySlug(product.brandSlug);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const tagline = getEditorialTagline(product);

  function handleAddToCart() {
    addItem(product);
  }

  function handleBuyNow() {
    addItem(product);
    router.push("/checkout");
  }

  return (
    <section className="grid gap-10 px-6 pt-28 pb-16 md:grid-cols-2 md:gap-16 md:px-12 md:pb-24 md:pt-32">
      <div className="mx-auto w-full max-w-md md:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-block bg-lux-champagne/15 shadow-[0_20px_50px_-25px_rgba(61,45,35,0.35)]">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
          <FavoriteButton slug={product.slug} className="absolute right-4 top-4" />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        {brand && (
          <span className="text-xs tracking-widest text-lux-brown uppercase">
            {brand.name}
          </span>
        )}
        <h1 className="mt-2 font-serif text-4xl font-light text-lux-deep md:text-5xl">
          {product.name}
        </h1>
        {product.volumeMl > 0 && (
          <p className="mt-2 text-sm text-lux-brown">{getFormatLabel(product)}</p>
        )}

        {tagline && (
          <p className="mt-5 max-w-md font-serif text-lg italic leading-relaxed text-lux-brown">
            {tagline}
          </p>
        )}

        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-2xl text-lux-deep">
            {formatBRL(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-sm text-lux-brown line-through">{formatBRL(product.price)}</span>
          )}
        </div>

        {product.shortDescription && (
          <p className="mt-3 max-w-md text-sm text-lux-brown">{product.shortDescription}</p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="rounded-full bg-lux-deep px-8 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown disabled:cursor-not-allowed disabled:opacity-40"
          >
            Comprar Agora
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="rounded-full border border-lux-brown/40 px-8 py-3 text-sm tracking-wide text-lux-deep transition-colors hover:border-lux-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            Adicionar à Sacola
          </button>
        </div>

        <ul className="mt-7 flex flex-col gap-2">
          {BENEFITS.map((b) => (
            <li key={b.label} className="flex items-center gap-2.5 text-xs text-lux-brown">
              <span className="text-lux-champagne">{b.icon}</span>
              {b.label}
            </li>
          ))}
        </ul>

        <a
          href={productWhatsappLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-xs text-lux-brown underline underline-offset-4 hover:text-lux-deep"
        >
          Dúvidas sobre esta fragrância? Falar com uma especialista
        </a>

        {!product.inStock && (
          <span className="mt-4 w-fit rounded-full bg-lux-black px-4 py-1 text-xs text-lux-white">
            Esgotado
          </span>
        )}
      </div>
    </section>
  );
}
