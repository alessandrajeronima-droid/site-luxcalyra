"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BodyCareFilterDrawer } from "@/components/bodycare/BodyCareFilterDrawer";
import type { SensationOption } from "@/lib/bodyCare";

interface BodyCareFiltersProps {
  basePath: string;
  sensations: SensationOption[];
}

export function BodyCareFilters({ basePath, sensations }: BodyCareFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeBrand = searchParams.get("brand") ?? "";
  const activeBadge = searchParams.get("badge") ?? "";

  const quickFilters: { label: string; key: "brand" | "badge"; value: string }[] = [
    { label: "Todas as Marcas", key: "brand", value: "" },
    { label: "Victoria's Secret", key: "brand", value: "victorias-secret" },
    { label: "Bath & Body Works", key: "brand", value: "bath-body-works" },
    { label: "Mais Vendidos", key: "badge", value: "mais-vendidos" },
  ];

  function isActive(filter: (typeof quickFilters)[number]) {
    if (filter.key === "brand") return activeBrand === filter.value;
    if (filter.key === "badge") return activeBadge === filter.value;
    return false;
  }

  function applyQuickFilter(filter: (typeof quickFilters)[number]) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("brand");
    params.delete("badge");
    if (filter.value) params.set(filter.key, filter.value);
    router.push(`${basePath}?${params.toString()}#explorar`);
  }

  const activeFilterCount = ["sensacao", "precoMin", "precoMax"].filter((k) => searchParams.get(k)).length;

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-lux-champagne/40 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
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

      <BodyCareFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        basePath={basePath}
        sensations={sensations}
      />
    </>
  );
}
