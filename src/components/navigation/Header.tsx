"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, useCartTotals } from "@/lib/store/cart";
import { useFavoritesStore } from "@/lib/store/favorites";
import { useSearchStore } from "@/lib/store/search";

const NAV_LINKS = [
  { label: "Perfumes", href: "/perfumes" },
  { label: "Body Splash", href: "/body-splash" },
  { label: "Cremes Corporais", href: "/cremes-corporais" },
  { label: "Marcas", href: "/marcas" },
  { label: "Decants", href: "/decants" },
  { label: "Descubra seu Perfume", href: "/descubra-seu-perfume" },
  { label: "Ofertas", href: "/ofertas" },
];

export function Header({ overLight = false }: { overLight?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const openCart = useCartStore((s) => s.open);
  const openSearch = useSearchStore((s) => s.open);
  const { itemCount } = useCartTotals();
  const favoritesCount = useFavoritesStore((s) => s.slugs.length);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = overLight || scrolled;
  const textClass = dark ? "text-lux-deep" : "text-lux-white";
  const textMutedClass = dark ? "text-lux-deep/80" : "text-lux-white/90";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-12 ${
        scrolled ? "bg-lux-white/95 shadow-[0_1px_0_rgba(110,89,73,0.12)] backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Link href="/" aria-label="Lux Calyra">
        <Image
          src={dark ? "/brand/logo-full-color-brown-text.png" : "/brand/logo-full-color-white-text.png"}
          alt="Lux Calyra"
          width={220}
          height={73}
          priority
          className="h-8 w-auto transition-opacity duration-500 md:h-10"
        />
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm tracking-wide transition-colors hover:text-lux-brown ${textMutedClass}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={`flex items-center gap-5 text-sm transition-colors duration-500 ${textClass}`}>
        <button onClick={openSearch} aria-label="Buscar">
          Buscar
        </button>
        <Link href="/conta" aria-label="Minha conta">
          Conta
        </Link>
        <Link href="/favoritos" aria-label="Favoritos" className="relative">
          Favoritos
          {favoritesCount > 0 && (
            <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-lux-brown text-[10px] text-lux-white">
              {favoritesCount}
            </span>
          )}
        </Link>
        <button onClick={openCart} aria-label="Sacola" className="relative">
          Sacola
          {itemCount > 0 && (
            <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-lux-brown text-[10px] text-lux-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
