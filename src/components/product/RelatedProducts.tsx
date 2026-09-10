import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

export function RelatedProducts({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-lux-brown">{subtitle}</p>}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
