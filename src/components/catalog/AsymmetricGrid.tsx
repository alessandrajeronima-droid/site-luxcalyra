import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

export function AsymmetricGrid({ items }: { items: Product[] }) {
  if (items.length === 0) return null;

  const [first, second, third, ...rest] = items;

  return (
    <div className="flex flex-col gap-10">
      {first && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ProductCard product={first} size="large" priority />
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
            {second && <ProductCard product={second} priority />}
            {third && <ProductCard product={third} />}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {rest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
