import type { Product } from "@/types/product";

export function IngredientsShowcase({ product }: { product: Product }) {
  const notes = Array.from(
    new Set([
      ...(product.topNotes ?? []),
      ...(product.heartNotes ?? []),
      ...(product.baseNotes ?? []),
    ])
  ).slice(0, 9);

  if (notes.length === 0) return null;

  return (
    <section className="bg-lux-deep px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-xs tracking-[0.3em] text-lux-champagne uppercase">
          Os Ingredientes
        </span>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-6">
          {notes.map((note) => (
            <span
              key={note}
              className="font-serif text-2xl font-light text-lux-white/90 sm:text-3xl"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
