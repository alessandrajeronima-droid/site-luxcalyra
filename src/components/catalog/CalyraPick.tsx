import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/data/products";
import { getBrandBySlug } from "@/lib/data/brands";
import { formatBRL } from "@/lib/format";

export async function CalyraPick({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);
  if (!product) return null;
  const brand = await getBrandBySlug(product.brandSlug);

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs tracking-[0.35em] text-lux-brown uppercase">
          The Calyra Pick
        </span>

        <div className="mt-8 grid items-center gap-10 rounded-block bg-lux-champagne/10 p-6 md:grid-cols-2 md:gap-16 md:p-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-block">
            <Image
              src={product.mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div>
            {brand && (
              <span className="text-xs tracking-widest text-lux-brown uppercase">
                {brand.name}
              </span>
            )}
            <h2 className="mt-2 font-serif text-3xl text-lux-deep md:text-4xl">
              {product.name}
            </h2>
            {product.description && (
              <p className="mt-5 max-w-md text-sm leading-relaxed text-lux-brown">
                {product.description}
              </p>
            )}
            {product.mainAccords && product.mainAccords.length > 0 && (
              <p className="mt-4 text-xs tracking-wide text-lux-brown">
                {product.mainAccords.slice(0, 4).join(" · ")}
              </p>
            )}
            <p className="mt-6 text-xl text-lux-deep">{formatBRL(product.price)}</p>
            <Link
              href={`/perfume/${product.slug}`}
              className="mt-6 inline-block rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
            >
              Descobrir Fragrância
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
