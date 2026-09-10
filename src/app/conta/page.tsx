import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/institutional/PageHero";
import { buildWhatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Minha Conta | Lux Calyra",
  description: "Acompanhe seus pedidos Lux Calyra pelo WhatsApp.",
};

const whatsappLink = buildWhatsappLink("Olá! Gostaria de acompanhar o status do meu pedido.");

export default function ContaPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHero eyebrow="Lux Calyra" title="Minha Conta" />

      <main className="flex-1 bg-lux-white px-6 py-20 text-center md:px-12 md:py-28">
        <div className="mx-auto max-w-md">
          <p className="text-sm leading-relaxed text-lux-brown">
            Ainda não temos login de conta no site. Todo o acompanhamento de pedidos,
            trocas e histórico de compra é feito diretamente com uma consultora, pelo
            WhatsApp.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Acompanhar Meu Pedido →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
