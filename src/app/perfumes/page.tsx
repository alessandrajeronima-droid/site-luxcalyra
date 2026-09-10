import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { PerfumesHero } from "@/components/catalog/PerfumesHero";
import { UniverseCategories } from "@/components/catalog/UniverseCategories";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { AsymmetricGrid } from "@/components/catalog/AsymmetricGrid";
import { CalyraPick } from "@/components/catalog/CalyraPick";
import { ExploreByScent } from "@/components/catalog/ExploreByScent";
import { ProductCard } from "@/components/products/ProductCard";
import { BrandStatement } from "@/components/home/BrandStatement";
import { BestSellersCarousel } from "@/components/home/BestSellersCarousel";
import { SpecialEdit } from "@/components/home/SpecialEdit";
import { DecantsTeaser } from "@/components/home/DecantsTeaser";
import { FragranceFinderTeaser } from "@/components/home/FragranceFinderTeaser";
import { ExploreBrands } from "@/components/home/ExploreBrands";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { listProducts } from "@/services/products";
import { filterByEssence } from "@/lib/fragranceFinder";
import type { Gender } from "@/types/product";

export const metadata: Metadata = {
  title: "Perfumes | Lux Calyra",
  description: "Catálogo completo de perfumes árabes selecionados pela Lux Calyra.",
};

function isGender(value: string | undefined): value is Gender {
  return value === "masculino" || value === "feminino" || value === "unissex";
}

function normalize(v: string) {
  return v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PerfumesPage({
  searchParams,
}: PageProps<"/perfumes">) {
  const params = await searchParams;
  const genderParam = first(params.gender);
  const brandParam = first(params.brand);
  const essenceParam = first(params.essencia);
  const badgeParam = first(params.badge);
  const notaParam = first(params.nota);
  const ocasiaoParam = first(params.ocasiao);
  const precoMinParam = first(params.precoMin);
  const precoMaxParam = first(params.precoMax);

  let items = await listProducts({
    category: "perfume",
    gender: isGender(genderParam) ? genderParam : undefined,
    brandSlug: brandParam || undefined,
  });

  if (essenceParam) {
    const slugs = new Set(filterByEssence(items, essenceParam).map((p) => p.slug));
    items = items.filter((p) => slugs.has(p.slug));
  }
  if (badgeParam === "novidades") items = items.filter((p) => p.isNew);
  if (badgeParam === "mais-vendidos") items = items.filter((p) => p.isBestseller);
  if (badgeParam === "ofertas") items = items.filter((p) => p.isSpecialEdit);
  if (notaParam) {
    const target = normalize(notaParam);
    items = items.filter((p) => (p.mainAccords ?? []).some((a) => normalize(a).includes(target)));
  }
  if (ocasiaoParam) {
    items = items.filter((p) => (p.occasions ?? []).includes(ocasiaoParam));
  }
  const min = precoMinParam ? Number(precoMinParam) : undefined;
  const max = precoMaxParam ? Number(precoMaxParam) : undefined;
  if (min !== undefined && !Number.isNaN(min)) items = items.filter((p) => p.price >= min);
  if (max !== undefined && !Number.isNaN(max)) items = items.filter((p) => p.price <= max);

  const chunk1 = items.slice(0, 9);
  const chunk2 = items.slice(9, 17);
  const chunk3 = items.slice(17);

  return (
    <div className="flex flex-1 flex-col">
      <Header overLight />
      <PerfumesHero />

      <BrandStatement
        title="Perfumes que falam antes mesmo de você."
        marquee="Arabian Perfumery · Curated by Lux Calyra"
      />

      <UniverseCategories />

      <section id="explorar-perfumes" className="scroll-mt-24 bg-lux-white px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
            Explorar Perfumes
          </h2>

          <div className="mt-8">
            <Suspense fallback={null}>
              <CatalogFilters />
            </Suspense>
          </div>

          {items.length === 0 ? (
            <p className="mt-16 text-center text-sm text-lux-brown">
              Nenhum perfume encontrado com esse filtro.
            </p>
          ) : (
            <div className="mt-10">
              <AsymmetricGrid items={chunk1} />
            </div>
          )}
        </div>
      </section>

      <CalyraPick slug="khamrah" />

      <BestSellersCarousel />

      {chunk2.length > 0 && (
        <section className="bg-lux-white px-6 py-16 md:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {chunk2.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <SpecialEdit />

      {chunk3.length > 0 && (
        <section className="bg-lux-white px-6 py-16 md:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {chunk3.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <DecantsTeaser />
      <FragranceFinderTeaser />
      <ExploreByScent />
      <ExploreBrands />

      <CampaignBanner
        title="Seu perfume. Sua assinatura."
        text="Descubra uma fragrância que combina com você."
        ctaLabel="Encontrar Meu Perfume"
        ctaHref="/descubra-seu-perfume"
      />

      <Footer />
    </div>
  );
}
