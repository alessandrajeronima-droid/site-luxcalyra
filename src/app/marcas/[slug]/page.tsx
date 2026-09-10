import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { getBrands, getBrandBySlug } from "@/lib/data/brands";
import { getProducts } from "@/lib/data/products";

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/marcas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} | Lux Calyra`,
    description: brand.description ?? `Perfumes ${brand.name} na Lux Calyra.`,
  };
}

export default async function BrandPage({ params }: PageProps<"/marcas/[slug]">) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const products = await getProducts();
  const brandProducts = products.filter((p) => p.brandSlug === brand.slug);

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative bg-lux-deep py-24">
        <Header />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-serif text-4xl font-light text-lux-white md:text-5xl">
            {brand.name}
          </h1>
          {brand.description && (
            <p className="mt-3 text-sm text-lux-white/70">{brand.description}</p>
          )}
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
