import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { DiscoverySetBuilder } from "@/components/decants/DiscoverySetBuilder";

export const metadata: Metadata = {
  title: "Decants | Lux Calyra",
  description: "Experimente novas fragrâncias antes de escolher seu próximo perfume.",
};

export default function DecantsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative bg-lux-deep py-24">
        <Header />
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="text-xs tracking-[0.3em] text-lux-champagne uppercase">
            Discover Before You Commit
          </span>
          <h1 className="mt-3 font-serif text-4xl font-light text-lux-white md:text-5xl">
            Decants
          </h1>
          <p className="mt-3 text-sm text-lux-white/70">
            Experimente novas fragrâncias antes de escolher seu próximo perfume.
          </p>
        </div>
      </div>

      <main className="flex-1 bg-lux-white">
        <DiscoverySetBuilder />
      </main>

      <Footer />
    </div>
  );
}
