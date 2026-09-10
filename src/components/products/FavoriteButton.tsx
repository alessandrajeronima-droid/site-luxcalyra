"use client";

import { useFavoritesStore } from "@/lib/store/favorites";

export function FavoriteButton({ slug, className = "" }: { slug: string; className?: string }) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(slug));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-lux-white/90 text-lux-deep transition-transform active:scale-90 ${className}`}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path d="M12 21s-7.5-4.6-10.1-9.2C.3 8.6 1.6 5 5.1 4.2c2-.5 4 .4 5 2.1 1-1.7 3-2.6 5-2.1 3.5.8 4.8 4.4 3.2 7.6C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}
