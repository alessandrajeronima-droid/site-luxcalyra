import type { Product } from "@/types/product";

export function WhenToUse({ product }: { product: Product }) {
  const occasions = product.occasions;
  if (!occasions?.length) return null;

  return (
    <section className="bg-lux-white px-6 py-20 text-center md:px-12 md:py-24">
      <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
        Quando Ele Brilha?
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {occasions.map((occasion) => (
          <span
            key={occasion}
            className="rounded-full border border-lux-brown/30 px-5 py-2 text-sm tracking-wide text-lux-brown"
          >
            {occasion}
          </span>
        ))}
      </div>
    </section>
  );
}
