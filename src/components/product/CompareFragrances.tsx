import { computeOlfactiveProfile } from "@/lib/productEditorial";
import type { Product } from "@/types/product";

export function CompareFragrances({
  product,
  compareWith,
}: {
  product: Product;
  compareWith: Product | undefined;
}) {
  if (!compareWith) return null;

  const profileA = computeOlfactiveProfile(product);
  const profileB = computeOlfactiveProfile(compareWith);
  if (profileA.length === 0 || profileB.length === 0) return null;

  const labels = Array.from(
    new Set([...profileA.map((p) => p.label), ...profileB.map((p) => p.label)])
  ).slice(0, 5);

  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Compare as Fragrâncias
        </h2>

        <div className="mt-10 flex justify-between text-sm text-lux-deep">
          <span className="font-serif text-lg">{product.name}</span>
          <span className="font-serif text-lg text-lux-brown">{compareWith.name}</span>
        </div>

        <div className="mt-6 space-y-6">
          {labels.map((label) => {
            const a = profileA.find((p) => p.label === label)?.value ?? 0;
            const b = profileB.find((p) => p.label === label)?.value ?? 0;
            return (
              <div key={label}>
                <p className="text-center text-xs tracking-widest text-lux-brown uppercase">
                  {label}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-1.5 flex-1 justify-end overflow-hidden rounded-full bg-lux-white">
                    <div
                      className="h-1.5 rounded-full bg-lux-deep"
                      style={{ width: `${a * 10}%` }}
                    />
                  </div>
                  <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-lux-white">
                    <div
                      className="h-1.5 rounded-full bg-lux-brown"
                      style={{ width: `${b * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
