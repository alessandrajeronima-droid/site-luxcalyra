"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterDrawer } from "@/components/catalog/FilterDrawer";
import type { Gender } from "@/types/product";

const QUICK_FILTERS: { label: string; key: string; value: string }[] = [
  { label: "Todos", key: "gender", value: "" },
  { label: "Femininos", key: "gender", value: "feminino" },
  { label: "Masculinos", key: "gender", value: "masculino" },
  { label: "Unissex", key: "gender", value: "unissex" },
  { label: "Novidades", key: "badge", value: "novidades" },
  { label: "Mais Vendidos", key: "badge", value: "mais-vendidos" },
  { label: "Ofertas", key: "badge", value: "ofertas" },
];

export function CatalogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeGender = searchParams.get("gender") ?? "";
  const activeBadge = searchParams.get("badge") ?? "";

  function isActive(filter: (typeof QUICK_FILTERS)[number]) {
    if (filter.key === "gender") return activeGender === filter.value;
    if (filter.key === "badge") return activeBadge === filter.value;
    return false;
  }

  function applyQuickFilter(filter: (typeof QUICK_FILTERS)[number]) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("gender");
    params.delete("badge");
    if (filter.value) params.set(filter.key, filter.value);
    router.push(`/perfumes?${params.toString()}#explorar-perfumes`);
  }

  const activeFilterCount = ["brand", "nota", "ocasiao", "precoMin", "precoMax"].filter((k) =>
    searchParams.get(k)
  ).length;

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-lux-champagne/40 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {QUICK_FILTERS.map((filter) => (
            <button
              key={filter.label}
              onClick={() => applyQuickFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-xs tracking-wide transition-colors ${
                isActive(filter)
                  ? "bg-lux-deep text-lux-white"
                  : "bg-lux-champagne/20 text-lux-brown hover:bg-lux-champagne/40"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 self-start rounded-full border border-lux-brown/30 px-5 py-1.5 text-xs tracking-wide text-lux-deep transition-colors hover:border-lux-deep md:self-auto"
        >
          Filtrar
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-lux-deep text-[10px] text-lux-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

export type { Gender };
