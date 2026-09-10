import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductBrandStatement } from "@/components/product/ProductBrandStatement";
import { TheFragrance } from "@/components/product/TheFragrance";
import { PerfumePyramid } from "@/components/product/PerfumePyramid";
import { OlfactiveProfile } from "@/components/product/OlfactiveProfile";
import { WhenToUse } from "@/components/product/WhenToUse";
import { EditorialCampaign } from "@/components/product/EditorialCampaign";
import { MainAccords } from "@/components/product/MainAccords";
import { IngredientsShowcase } from "@/components/product/IngredientsShowcase";
import { ExperienceFirst } from "@/components/product/ExperienceFirst";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { CompareFragrances } from "@/components/product/CompareFragrances";
import { ExploreHouse } from "@/components/product/ExploreHouse";
import { FragranceFinderTeaser } from "@/components/home/FragranceFinderTeaser";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { getProducts, getRelatedProducts } from "@/lib/data/products";
import { findProductBySlug } from "@/services/products";
import { getBrandStatement } from "@/lib/productEditorial";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/perfume/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Lux Calyra`,
    description:
      product.shortDescription ??
      product.description ??
      `${product.name}, perfume árabe selecionado pela Lux Calyra.`,
  };
}

export default async function ProductPage({ params }: PageProps<"/perfume/[slug]">) {
  const { slug } = await params;
  const product = await findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const related = getRelatedProducts(product, allProducts);
  const compareTarget = product.relatedProducts
    ?.filter((r) => r.relation === "similar_vibe")
    .map((r) => allProducts.find((p) => p.slug === r.slug))
    .find((p): p is NonNullable<typeof p> => Boolean(p));

  const houseProducts = allProducts
    .filter(
      (p) =>
        p.brandSlug === product.brandSlug && p.slug !== product.slug && p.category === product.category
    )
    .slice(0, 8);

  return (
    <div className="flex flex-1 flex-col bg-lux-white">
      <Header overLight />
      <ProductHero product={product} />
      {(product.mainAccords?.length ?? 0) > 0 && (
        <ProductBrandStatement text={getBrandStatement(product)} />
      )}
      <TheFragrance product={product} />
      <PerfumePyramid product={product} />
      <OlfactiveProfile product={product} />
      <WhenToUse product={product} />
      <EditorialCampaign product={product} />
      <MainAccords product={product} />
      <IngredientsShowcase product={product} />
      <ExperienceFirst product={product} />
      <RelatedProducts
        title="Talvez Você Também Ame"
        subtitle="Selecionados a partir do perfil desta fragrância."
        products={related}
      />
      <CompareFragrances product={product} compareWith={compareTarget} />
      <ExploreHouse brandSlug={product.brandSlug} products={houseProducts} />
      <FragranceFinderTeaser />
      <CampaignBanner
        title="Seu perfume. Sua assinatura."
        text="Descubra uma fragrância que combina com você."
        ctaLabel="Explorar Perfumes"
        ctaHref="/perfumes"
      />
      <Footer />
    </div>
  );
}
