"use client";

import Image from "next/image";
import Link from "next/link";
import { useBrandBySlug } from "@/components/providers/ProductsProvider";
import { formatBRL } from "@/lib/format";
import { getProductCtaLabel } from "@/lib/bodyCare";
import { FavoriteButton } from "@/components/products/FavoriteButton";
import type { Product } from "@/types/product";

const TINTS = ["bg-lux-white", "bg-[#F7F4F0]", "bg-lux-champagne/15"];

function tintForProduct(id: string): string {
  const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return TINTS[sum % TINTS.length];
}

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  size?: "normal" | "large";
}

export function ProductCard({ product, priority = false, size = "normal" }: ProductCardProps) {
  const brand = useBrandBySlug(product.brandSlug);
  const badge = product.isBestseller
    ? "Best Seller"
    : product.isNew
      ? "Novo"
      : product.isSpecialEdit
        ? "Special Edit"
        : null;

  return (
    <Link href={`/perfume/${product.slug}`} className="group block">
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-card ${tintForProduct(product.id)}`}
      >
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          priority={priority}
          sizes={size === "large" ? "(max-width: 768px) 90vw, 45vw" : "(max-width: 768px) 50vw, 25vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-lux-white/90 px-3 py-1 text-[10px] tracking-widest text-lux-deep uppercase">
            {badge}
          </span>
        )}

        <FavoriteButton slug={product.slug} className="absolute right-3 top-3" />

        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-lux-black/55 to-transparent p-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-full bg-lux-white px-4 py-2 text-xs tracking-wide text-lux-deep">
            {getProductCtaLabel(product.category)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {brand && (
          <span className="text-[10px] tracking-widest text-lux-brown uppercase">
            {brand.name}
          </span>
        )}
        <h3 className={`font-serif text-lux-deep ${size === "large" ? "text-2xl" : "text-lg"}`}>
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-lux-deep">
            {formatBRL(product.salePrice ?? product.price)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-lux-brown line-through">
              {formatBRL(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
