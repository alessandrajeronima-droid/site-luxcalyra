import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data/products";
import { getBrandBySlug, getBrands } from "@/lib/data/brands";
import { formatBRL } from "@/lib/format";

export async function SpecialEdit() {
  const products = await getProducts();
  const items = products.filter((p) => p.isSpecialEdit);
  if (items.length === 0) return null;
  const [protagonist, ...rest] = items;
  const protagonistBrand = await getBrandBySlug(protagonist.brandSlug);
  const allBrands = await getBrands();

  return (
    <section className="bg-lux-deep px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs tracking-[0.35em] text-lux-champagne uppercase">
            Special Edit
          </span>
          <p className="mx-auto mt-3 max-w-md text-sm text-lux-white/70">
            Fragrâncias selecionadas em condições especiais.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href={`/perfume/${protagonist.slug}`}
            className="group relative overflow-hidden rounded-block bg-lux-black/30"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={protagonist.mainImage}
                alt={protagonist.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lux-black/85 to-transparent p-8">
              {protagonistBrand && (
                <span className="text-[10px] tracking-widest text-lux-champagne uppercase">
                  {protagonistBrand.name}
                </span>
              )}
              <h3 className="mt-1 font-serif text-2xl text-lux-white">{protagonist.name}</h3>
              <span className="mt-1 block text-sm text-lux-white/80">
                {formatBRL(protagonist.price)} · em até 3x sem juros
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1">
            {rest.map((product) => {
              const brand = allBrands.find((b) => b.slug === product.brandSlug);
              return (
                <Link
                  key={product.id}
                  href={`/perfume/${product.slug}`}
                  className="group flex items-center gap-4 rounded-card bg-lux-white/5 p-3 transition-colors hover:bg-lux-white/10"
                >
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    {brand && (
                      <span className="text-[10px] tracking-widest text-lux-champagne uppercase">
                        {brand.name}
                      </span>
                    )}
                    <h4 className="font-serif text-base text-lux-white">{product.name}</h4>
                    <span className="text-xs text-lux-white/70">{formatBRL(product.price)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/ofertas"
            className="inline-block rounded-full border border-lux-champagne/50 px-9 py-3.5 text-sm tracking-wide text-lux-champagne transition-colors hover:bg-lux-champagne hover:text-lux-deep"
          >
            Ver Ofertas
          </Link>
        </div>
      </div>
    </section>
  );
}
