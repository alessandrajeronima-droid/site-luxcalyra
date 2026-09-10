import Link from "next/link";
import Image from "next/image";
import { getBrands } from "@/lib/data/brands";
import { getProducts } from "@/lib/data/products";

const RETAIL_BRANDS = ["lattafa", "maison-alhambra", "armaf", "al-wataniah"];

export async function ExploreBrands() {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);

  function representativeImage(brandSlug: string): string | undefined {
    return products.find((p) => p.brandSlug === brandSlug)?.mainImage;
  }

  const items = RETAIL_BRANDS.map((slug) => brands.find((b) => b.slug === slug)).filter(
    (b): b is NonNullable<typeof b> => Boolean(b)
  );

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Explore as Casas
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((brand) => {
            const image = representativeImage(brand.slug);
            return (
              <Link
                key={brand.slug}
                href={`/marcas/${brand.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-card bg-lux-deep"
              >
                {image && (
                  <Image
                    src={image}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 45vw, 22vw"
                    className="object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-lux-black/80 via-lux-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-2xl text-lux-white">{brand.name}</h3>
                  <span className="mt-1 block text-xs tracking-widest text-lux-champagne uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Ver Coleção
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
