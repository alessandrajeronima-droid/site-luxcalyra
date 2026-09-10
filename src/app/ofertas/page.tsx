import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { SpecialEdit } from "@/components/home/SpecialEdit";
import { getProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Ofertas | Lux Calyra",
  description: "Fragrâncias e produtos selecionados em condições especiais na Lux Calyra.",
};

export default async function OfertasPage() {
  const products = await getProducts();
  const items = products.filter((p) => p.isSpecialEdit);

  return (
    <div className="flex flex-1 flex-col bg-lux-white">
      <div className="relative bg-lux-deep py-24">
        <Header />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="text-xs tracking-[0.3em] text-lux-champagne uppercase">
            Special Edit
          </span>
          <h1 className="mt-3 font-serif text-4xl font-light text-lux-white md:text-5xl">
            Ofertas
          </h1>
          <p className="mt-3 text-sm text-lux-white/70">
            Fragrâncias selecionadas em condições especiais.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-6 py-24 text-center">
          <p className="text-sm text-lux-brown">Nenhuma oferta ativa no momento. Volte em breve.</p>
        </div>
      ) : (
        <SpecialEdit />
      )}

      <div className="pb-20 text-center md:pb-28">
        <Link
          href="/perfumes"
          className="inline-block rounded-full border border-lux-brown/30 px-9 py-3.5 text-sm tracking-wide text-lux-deep transition-colors hover:border-lux-deep"
        >
          Ver Catálogo Completo →
        </Link>
      </div>

      <Footer />
    </div>
  );
}
