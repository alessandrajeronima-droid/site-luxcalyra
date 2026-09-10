import { buildWhatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

export function ExperienceFirst({ product }: { product: Product }) {
  if (product.category !== "perfume") return null;

  const href = buildWhatsappLink(
    `Olá! Quero experimentar o perfume ${product.name} em decant (5ml) antes de decidir. Vocês têm disponível?`
  );

  return (
    <section className="bg-lux-champagne/10 px-6 py-16 text-center md:px-12 md:py-20">
      <h2 className="font-serif text-2xl font-light text-lux-deep sm:text-3xl">
        Antes de escolher, experimente.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-lux-brown">
        Descubra {product.name} em uma versão de 5ml antes de decidir pelo
        frasco completo.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-block rounded-full bg-lux-deep px-8 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
      >
        Experimentar
      </a>
    </section>
  );
}
