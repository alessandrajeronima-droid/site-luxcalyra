import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { BodyCareHero } from "@/components/bodycare/BodyCareHero";
import { Introduction } from "@/components/bodycare/Introduction";
import { TwoHouses } from "@/components/bodycare/TwoHouses";
import { RitualSteps } from "@/components/bodycare/RitualSteps";
import { AsymmetricGrid } from "@/components/catalog/AsymmetricGrid";
import { BodyCareFilters } from "@/components/bodycare/BodyCareFilters";
import { SensationExplorer } from "@/components/bodycare/SensationExplorer";
import { RitualBuilder } from "@/components/bodycare/RitualBuilder";
import { ProductCard } from "@/components/products/ProductCard";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { listProducts } from "@/services/products";
import { getProducts } from "@/lib/data/products";
import { getContent } from "@/lib/data/content";
import { listSensations, listRitualPairs } from "@/lib/bodyCare";

export const metadata: Metadata = {
  title: "Cremes Corporais | Lux Calyra",
  description:
    "Cremes e loções corporais Victoria's Secret e Bath & Body Works, selecionados pela Lux Calyra para um ritual de cuidado e fragrância.",
  openGraph: {
    title: "Cremes Corporais | Lux Calyra",
    description:
      "Cremes e loções corporais Victoria's Secret e Bath & Body Works, selecionados pela Lux Calyra para um ritual de cuidado e fragrância.",
  },
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CremesCorporaisPage({
  searchParams,
}: PageProps<"/cremes-corporais">) {
  const params = await searchParams;
  const brandParam = first(params.brand);
  const badgeParam = first(params.badge);
  const sensacaoParam = first(params.sensacao);
  const precoMinParam = first(params.precoMin);
  const precoMaxParam = first(params.precoMax);

  const allCremes = await listProducts({ category: "creme-corporal" });

  let items = allCremes;
  if (brandParam) items = items.filter((p) => p.brandSlug === brandParam);
  if (badgeParam === "mais-vendidos") items = items.filter((p) => p.isBestseller);
  if (sensacaoParam) items = items.filter((p) => (p.sensations ?? []).includes(sensacaoParam));
  const min = precoMinParam ? Number(precoMinParam) : undefined;
  const max = precoMaxParam ? Number(precoMaxParam) : undefined;
  if (min !== undefined && !Number.isNaN(min)) items = items.filter((p) => p.price >= min);
  if (max !== undefined && !Number.isNaN(max)) items = items.filter((p) => p.price <= max);

  const featured = allCremes.slice(0, 4);
  const sensations = listSensations(allCremes);
  const allProducts = await getProducts();
  const ritualPairs = listRitualPairs(allProducts);
  const heroContent = await getContent("cremes_corporais_hero");

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <BodyCareHero {...heroContent} ctaHref="#explorar" />

      <Introduction
        eyebrow="Body Care"
        title="Um ritual para a pele."
        text="Antes da fragrância, vem o cuidado. Uma textura que hidrata, acalma e prepara a pele para reter o aroma por mais tempo — transformando um hábito simples em um momento só seu."
      />

      <TwoHouses
        title="Duas Casas. Um Universo de Cuidado."
        subtitle="Selecionadas pela Lux Calyra para compor sua coleção de cuidado corporal."
        category="creme-corporal"
        basePath="/cremes-corporais"
        houses={[
          { brandSlug: "victorias-secret", image: "/products/creme-corporal/victorias-secret-velvet-petals-lotion.jpg" },
          { brandSlug: "bath-body-works", image: "/products/creme-corporal/bath-body-works-warm-vanilla-sugar-locao.jpg" },
        ]}
      />

      <RitualSteps />

      {featured.length > 0 && (
        <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
              Os Favoritos da Curadoria
            </h2>
            <div className="mt-10">
              <AsymmetricGrid items={featured} />
            </div>
          </div>
        </section>
      )}

      <RitualBuilder
        title="Combine Seu Ritual"
        subtitle="Comece pela hidratação. Termine com a fragrância."
        pairs={ritualPairs}
      />

      <SensationExplorer
        eyebrow="Explore por Sensação"
        title="Escolha Como Quer Se Sentir"
        subtitle="Cada textura carrega uma sensação diferente."
        basePath="/cremes-corporais"
        sensations={sensations}
      />

      <CampaignBanner
        eyebrow="Campanha"
        title="A Pele Também Pode Ter Uma Assinatura."
        text="Descubra o prazer de combinar cuidado e fragrância."
        ctaLabel="Explorar Body Care"
        ctaHref="#explorar"
        backgroundImage="/products/creme-corporal/bath-body-works-gingham-gorgeous-locao.jpg"
      />

      <section id="explorar" className="scroll-mt-24 bg-lux-white px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
            Todos os Cremes Corporais
          </h2>

          <div className="mt-8">
            <Suspense fallback={null}>
              <BodyCareFilters basePath="/cremes-corporais" sensations={sensations} />
            </Suspense>
          </div>

          {items.length === 0 ? (
            <p className="mt-16 text-center text-sm text-lux-brown">
              Nenhum creme corporal encontrado com esse filtro.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
