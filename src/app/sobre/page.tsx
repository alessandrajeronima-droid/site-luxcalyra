import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/institutional/PageHero";
import { getContent } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Sobre a Lux Calyra | Lux Calyra",
  description: "Conheça a curadoria da Lux Calyra: perfumaria árabe e body care selecionados.",
};

export default async function SobrePage() {
  const { body } = await getContent("page_sobre");
  const [firstParagraph, ...rest] = body.split("\n\n").filter(Boolean);

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Lux Calyra"
        title="Uma curadoria, não uma prateleira."
        subtitle="Perfumaria árabe e body care selecionados a dedo."
      />

      <main className="flex-1 bg-lux-white">
        <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          {firstParagraph && (
            <p className="font-serif text-xl leading-relaxed text-lux-deep md:text-2xl">
              {firstParagraph}
            </p>
          )}
          {rest.map((paragraph, i) => (
            <p key={i} className="mt-6 text-sm leading-relaxed text-lux-brown md:text-base">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="relative h-[360px] md:h-[480px]">
          <Image
            src="/products/masculino/khamrah.png"
            alt="Curadoria Lux Calyra"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-3 md:py-28">
          <div>
            <span className="text-xs tracking-[0.3em] text-lux-brown uppercase">Curadoria</span>
            <p className="mt-3 text-sm leading-relaxed text-lux-brown">
              Cada fragrância e cada produto de body care do nosso catálogo é escolhido
              com critério — nunca por volume.
            </p>
          </div>
          <div>
            <span className="text-xs tracking-[0.3em] text-lux-brown uppercase">Autenticidade</span>
            <p className="mt-3 text-sm leading-relaxed text-lux-brown">
              Trabalhamos com produtos originais, com informações reais de fragrância,
              volume e composição olfativa.
            </p>
          </div>
          <div>
            <span className="text-xs tracking-[0.3em] text-lux-brown uppercase">Atendimento</span>
            <p className="mt-3 text-sm leading-relaxed text-lux-brown">
              Cada pedido é acompanhado de perto, com atendimento direto por WhatsApp do
              início ao fim da sua compra.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
