import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/institutional/PageHero";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { getContent } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Contato | Lux Calyra",
  description: "Fale com a Lux Calyra pelo WhatsApp ou Instagram.",
};

const whatsappLink = buildWhatsappLink("Olá! Gostaria de falar com a Lux Calyra.");

export default async function ContatoPage() {
  const { whatsappText, instagramText } = await getContent("page_contato");

  const CHANNELS = [
    {
      label: "WhatsApp",
      description: whatsappText,
      href: whatsappLink,
      cta: "Chamar no WhatsApp →",
    },
    {
      label: "Instagram",
      description: instagramText,
      href: "https://instagram.com",
      cta: "Ver Instagram →",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Lux Calyra"
        title="Fale Conosco"
        subtitle="Atendimento próximo, pessoa a pessoa."
      />

      <main className="flex-1 bg-lux-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          {CHANNELS.map((channel) => (
            <div
              key={channel.label}
              className="rounded-block bg-lux-champagne/10 p-8 text-center"
            >
              <h2 className="font-serif text-2xl text-lux-deep">{channel.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-lux-brown">
                {channel.description}
              </p>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-lux-deep px-7 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
              >
                {channel.cta}
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
