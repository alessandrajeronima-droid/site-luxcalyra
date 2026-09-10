import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/institutional/PageHero";
import { LegalContent } from "@/components/institutional/LegalContent";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { getContent } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Trocas e Devoluções | Lux Calyra",
  description: "Como funcionam trocas e devoluções na Lux Calyra.",
};

const whatsappLink = buildWhatsappLink(
  "Olá! Gostaria de solicitar uma troca ou devolução de um pedido Lux Calyra."
);

export default async function TrocasDevolucoesPage() {
  const { body } = await getContent("page_trocas_devolucoes");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero eyebrow="Lux Calyra" title="Trocas e Devoluções" />
      <LegalContent body={body} updatedAt="setembro de 2026" />
      <div className="bg-lux-white px-6 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Solicitar Troca ou Devolução →
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
