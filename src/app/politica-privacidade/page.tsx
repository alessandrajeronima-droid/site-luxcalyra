import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/institutional/PageHero";
import { LegalContent } from "@/components/institutional/LegalContent";
import { getContent } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Política de Privacidade | Lux Calyra",
  description: "Como a Lux Calyra coleta, usa e protege os dados dos seus clientes.",
};

export default async function PoliticaPrivacidadePage() {
  const { body } = await getContent("page_politica_privacidade");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero eyebrow="Lux Calyra" title="Política de Privacidade" />
      <LegalContent body={body} updatedAt="setembro de 2026" />
      <Footer />
    </div>
  );
}
