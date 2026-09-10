import Link from "next/link";

export function FragranceFinderTeaser() {
  return (
    <section className="bg-lux-champagne/15 px-6 py-20 text-center md:px-12 md:py-24">
      <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
        Não sabe qual perfume escolher?
      </h2>
      <p className="mt-3 text-sm text-lux-brown">
        Deixe a Lux Calyra encontrar sua assinatura.
      </p>
      <Link
        href="/descubra-seu-perfume"
        className="mt-8 inline-block rounded-full bg-lux-deep px-9 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
      >
        Encontrar Meu Perfume
      </Link>
    </section>
  );
}
