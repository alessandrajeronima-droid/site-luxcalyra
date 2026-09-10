import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data/products";
import { getBrands } from "@/lib/data/brands";
import { formatBRL } from "@/lib/format";

export async function MostWanted() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const items = products.filter((p) => p.featured).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
            Os Mais Desejados
          </h2>
          <Link
            href="/perfumes"
            className="hidden text-xs tracking-widest text-lux-brown underline underline-offset-4 hover:text-lux-deep sm:inline"
          >
            Ver Todos
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => {
            const brand = brands.find((b) => b.slug === product.brandSlug);
            return (
              <Link
                key={product.id}
                href={`/perfume/${product.slug}`}
                className="group block overflow-hidden rounded-card bg-lux-champagne/10"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-card">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 22vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {product.isBestseller && (
                    <span className="absolute left-4 top-4 rounded-full bg-lux-white/90 px-3 py-1 text-[10px] tracking-widest text-lux-deep uppercase">
                      Best Seller
                    </span>
                  )}
                </div>
                <div className="p-5">
                  {brand && (
                    <span className="text-[10px] tracking-widest text-lux-brown uppercase">
                      {brand.name}
                    </span>
                  )}
                  <h3 className="mt-1 font-serif text-lg text-lux-deep">{product.name}</h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-sm text-lux-deep">
                      {formatBRL(product.salePrice ?? product.price)}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-lux-brown line-through">
                        {formatBRL(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
