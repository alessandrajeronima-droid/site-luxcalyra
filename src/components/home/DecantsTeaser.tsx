import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data/products";

export async function DecantsTeaser() {
  const products = await getProducts();
  const preview = products.filter((p) => p.category === "perfume").slice(0, 5);

  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-light leading-tight text-lux-deep sm:text-4xl">
            Antes de escolher,
            <br />
            experimente.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-lux-brown">
            Descubra novas fragrâncias em versões de 5ml antes de decidir qual
            perfume vai assinar seus dias.
          </p>
          <Link
            href="/decants"
            className="mt-8 inline-block rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Conhecer Decants
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {preview.map((product, index) => (
            <div
              key={product.id}
              className={`relative aspect-[3/4] overflow-hidden rounded-card ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={product.mainImage}
                alt={product.name}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
