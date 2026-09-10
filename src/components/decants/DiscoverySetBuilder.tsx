"use client";

import { useState } from "react";
import Image from "next/image";
import { useAllProducts } from "@/components/providers/ProductsProvider";
import { buildWhatsappLink } from "@/lib/whatsapp";

const SET_SIZES = [3, 5, 8];

export function DiscoverySetBuilder() {
  const products = useAllProducts();
  const PERFUMES = products.filter((p) => p.category === "perfume");
  const [setSize, setSetSize] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= setSize) return prev;
      return [...prev, slug];
    });
  }

  const selectedProducts = PERFUMES.filter((p) => selected.includes(p.slug));

  const whatsappHref = buildWhatsappLink(
    `Olá! Quero montar um Discovery Set com ${setSize} fragrâncias na Lux Calyra:\n` +
      selectedProducts.map((p) => `- ${p.name}`).join("\n")
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-12">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-lux-deep md:text-4xl">
          Monte seu Discovery Set
        </h2>
        <p className="mt-3 text-sm text-lux-brown">
          Escolha quantas fragrâncias quer experimentar e selecione entre o catálogo.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {SET_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSetSize(size);
                setSelected((prev) => prev.slice(0, size));
              }}
              className={`rounded-full border px-6 py-2 text-sm transition-colors ${
                setSize === size
                  ? "border-lux-deep bg-lux-deep text-lux-white"
                  : "border-lux-champagne/60 text-lux-brown"
              }`}
            >
              {size} fragrâncias
            </button>
          ))}
        </div>
      </div>

      {/* Composição visual */}
      <div className="mt-10 flex min-h-[110px] flex-wrap justify-center gap-3 rounded-2xl border border-dashed border-lux-champagne/60 p-4">
        {selectedProducts.length === 0 ? (
          <p className="self-center text-sm text-lux-brown">
            Selecione até {setSize} perfumes abaixo
          </p>
        ) : (
          selectedProducts.map((p) => (
            <div key={p.id} className="relative h-24 w-20 overflow-hidden rounded-lg bg-lux-champagne/20">
              <Image src={p.mainImage} alt={p.name} fill sizes="80px" className="object-cover" />
            </div>
          ))
        )}
      </div>

      <p className="mt-3 text-center text-xs text-lux-brown">
        {selected.length} / {setSize} selecionados
      </p>

      <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-6">
        {PERFUMES.map((p) => {
          const isSelected = selected.includes(p.slug);
          return (
            <button
              key={p.slug}
              onClick={() => toggle(p.slug)}
              className={`group relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-colors ${
                isSelected ? "border-lux-brown" : "border-transparent"
              }`}
            >
              <Image
                src={p.mainImage}
                alt={p.name}
                fill
                sizes="120px"
                className={`object-cover transition-opacity ${
                  isSelected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                }`}
              />
              {isSelected && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-lux-brown text-[10px] text-lux-white">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        {selected.length > 0 ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-lux-deep px-8 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Finalizar Discovery Set no WhatsApp
          </a>
        ) : (
          <button
            disabled
            className="inline-block cursor-not-allowed rounded-full bg-lux-champagne/30 px-8 py-3 text-sm tracking-wide text-lux-brown"
          >
            Selecione ao menos 1 perfume
          </button>
        )}
        <p className="mt-3 text-xs text-lux-brown">
          Valores e disponibilidade de decants são confirmados diretamente com um consultor.
        </p>
      </div>
    </div>
  );
}
