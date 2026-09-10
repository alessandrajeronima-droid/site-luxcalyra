import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { FragranceFinder } from "@/components/fragrance-finder/FragranceFinder";

export const metadata: Metadata = {
  title: "Encontre sua Assinatura | Lux Calyra",
  description: "Responda 4 perguntas e descubra o perfume árabe ideal para você.",
};

export default function FragranceFinderPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <FragranceFinder />
      </main>
      <Footer />
    </div>
  );
}
