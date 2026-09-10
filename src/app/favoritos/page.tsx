import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { FavoritesGrid } from "@/components/favorites/FavoritesGrid";

export const metadata: Metadata = {
  title: "Favoritos | Lux Calyra",
  description: "Os perfumes e produtos que você salvou na Lux Calyra.",
};

export default function FavoritosPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative bg-lux-deep py-24">
        <Header />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="text-xs tracking-[0.3em] text-lux-champagne uppercase">
            Sua Seleção
          </span>
          <h1 className="mt-3 font-serif text-4xl font-light text-lux-white md:text-5xl">
            Favoritos
          </h1>
        </div>
      </div>

      <main className="flex-1 bg-lux-white">
        <FavoritesGrid />
      </main>

      <Footer />
    </div>
  );
}
