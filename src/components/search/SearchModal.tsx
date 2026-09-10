"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchStore } from "@/lib/store/search";
import { useAllProducts, useAllBrands } from "@/components/providers/ProductsProvider";
import { formatBRL } from "@/lib/format";
import type { Category } from "@/types/product";

const CATEGORY_LABELS: Record<Category, string> = {
  perfume: "Perfume",
  "body-splash": "Body Splash",
  "creme-corporal": "Creme Corporal",
  decant: "Decant",
};

const QUICK_LINKS = [
  { label: "Perfumes", href: "/perfumes" },
  { label: "Body Splash", href: "/body-splash" },
  { label: "Cremes Corporais", href: "/cremes-corporais" },
  { label: "Ofertas", href: "/ofertas" },
];

function normalize(v: string): string {
  return v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function SearchModal() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const close = useSearchStore((s) => s.close);
  const products = useAllProducts();
  const brands = useAllBrands();
  const findBrand = (slug: string | null) => brands.find((b) => b.slug === slug);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  const results = useMemo(() => {
    const term = normalize(query.trim());
    if (!term) return [];
    return products
      .filter((p) => {
        const brand = findBrand(p.brandSlug);
        const haystack = normalize(`${p.name} ${brand?.name ?? ""}`);
        return haystack.includes(term);
      })
      .slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, products, brands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-lux-black/50"
          />
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-0 z-[70] w-full max-w-2xl -translate-x-1/2 px-4 pt-24 sm:px-0"
          >
            <div className="rounded-block bg-lux-white shadow-2xl">
              <div className="flex items-center gap-4 border-b border-lux-champagne/40 px-6 py-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="flex-shrink-0 text-lux-brown">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar perfumes, marcas, body splash…"
                  className="w-full bg-transparent text-base text-lux-deep placeholder:text-lux-brown/50 focus:outline-none"
                />
                <button onClick={close} className="flex-shrink-0 text-xs tracking-wide text-lux-brown hover:text-lux-deep">
                  Fechar
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-3">
                {query.trim() === "" ? (
                  <div className="flex flex-wrap gap-2 p-3">
                    {QUICK_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        className="rounded-full bg-lux-champagne/20 px-4 py-1.5 text-xs tracking-wide text-lux-brown transition-colors hover:bg-lux-champagne/40"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : results.length === 0 ? (
                  <p className="p-6 text-center text-sm text-lux-brown">
                    Nenhum produto encontrado para &quot;{query}&quot;.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {results.map((product) => {
                      const brand = findBrand(product.brandSlug);
                      return (
                        <li key={product.id}>
                          <Link
                            href={`/perfume/${product.slug}`}
                            onClick={close}
                            className="flex items-center gap-4 rounded-card p-3 transition-colors hover:bg-lux-champagne/10"
                          >
                            <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-lux-champagne/15">
                              <Image src={product.mainImage} alt={product.name} fill sizes="56px" className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                {brand && (
                                  <span className="text-[10px] tracking-widest text-lux-brown uppercase">
                                    {brand.name}
                                  </span>
                                )}
                                <span className="text-[10px] text-lux-brown/50">
                                  {CATEGORY_LABELS[product.category]}
                                </span>
                              </div>
                              <p className="truncate font-serif text-base text-lux-deep">{product.name}</p>
                            </div>
                            <span className="flex-shrink-0 text-sm text-lux-deep">
                              {formatBRL(product.salePrice ?? product.price)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
