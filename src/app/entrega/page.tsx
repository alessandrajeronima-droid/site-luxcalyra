import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/institutional/PageHero";
import { LegalContent } from "@/components/institutional/LegalContent";
import { getContent } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Entrega | Lux Calyra",
  description: "Como funciona o frete e o prazo de entrega na Lux Calyra.",
};

export default async function EntregaPage() {
  const { body } = await getContent("page_entrega");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero eyebrow="Lux Calyra" title="Entrega" />
      <LegalContent body={body} updatedAt="setembro de 2026" />
      <Footer />
    </div>
  );
}
