import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/institutional/PageHero";
import { LegalContent } from "@/components/institutional/LegalContent";
import { getContent } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Termos de Uso | Lux Calyra",
  description: "Condições de uso do site e das compras realizadas na Lux Calyra.",
};

export default async function TermosPage() {
  const { body } = await getContent("page_termos");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero eyebrow="Lux Calyra" title="Termos de Uso" />
      <LegalContent body={body} updatedAt="setembro de 2026" />
      <Footer />
    </div>
  );
}
