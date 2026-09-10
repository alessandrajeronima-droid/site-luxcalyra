import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { BodyCareHero } from "@/components/bodycare/BodyCareHero";
import { Introduction } from "@/components/bodycare/Introduction";
import { TwoHouses } from "@/components/bodycare/TwoHouses";
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
  title: "Body Splash | Lux Calyra",
  description:
    "Fragrâncias leves para o corpo: body splash Victoria's Secret e Bath & Body Works, selecionados pela Lux Calyra.",
  openGraph: {
    title: "Body Splash | Lux Calyra",
    description:
      "Fragrâncias leves para o corpo: body splash Victoria's Secret e Bath & Body Works, selecionados pela Lux Calyra.",
  },
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BodySplashPage({
  searchParams,
}: PageProps<"/body-splash">) {
  const params = await searchParams;
  const brandParam = first(params.brand);
  const badgeParam = first(params.badge);
  const sensacaoParam = first(params.sensacao);
  const precoMinParam = first(params.precoMin);
  const precoMaxParam = first(params.precoMax);

  const allBodySplash = await listProducts({ category: "body-splash" });

  let items = allBodySplash;
  if (brandParam) items = items.filter((p) => p.brandSlug === brandParam);
  if (badgeParam === "mais-vendidos") items = items.filter((p) => p.isBestseller);
  if (sensacaoParam) items = items.filter((p) => (p.sensations ?? []).includes(sensacaoParam));
  const min = precoMinParam ? Number(precoMinParam) : undefined;
  const max = precoMaxParam ? Number(precoMaxParam) : undefined;
  if (min !== undefined && !Number.isNaN(min)) items = items.filter((p) => p.price >= min);
  if (max !== undefined && !Number.isNaN(max)) items = items.filter((p) => p.price <= max);

  const featured = allBodySplash.filter((p) => p.isBestseller).slice(0, 4);
  const sensations = listSensations(allBodySplash);
  const allProducts = await getProducts();
  const ritualPairs = listRitualPairs(allProducts);
  const heroContent = await getContent("body_splash_hero");

  const chunk1 = items.slice(0, 8);
  const chunk2 = items.slice(8);

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <BodyCareHero {...heroContent} ctaHref="#explorar" />

      <Introduction
        eyebrow="Body Splash"
        title="Uma forma mais leve de perfumar a pele."
        text="Uma névoa fina que veste o corpo em segundos: menos concentrada que um perfume, mas presente o suficiente para acompanhar o dia inteiro. É a camada que se aplica sem pensar, antes de sair, depois do banho, entre um compromisso e outro."
      />

      <TwoHouses
        title="Duas Casas. Um Universo de Fragrâncias."
        subtitle="Selecionadas pela Lux Calyra para compor sua coleção de body splash."
        category="body-splash"
        basePath="/body-splash"
        houses={[
          { brandSlug: "victorias-secret", image: "/products/body-splash/victorias-secret-love-spell-mist.jpg" },
          { brandSlug: "bath-body-works", image: "/products/body-splash/bath-body-works-gingham-gorgeous-mist.jpg" },
        ]}
      />

      {featured.length > 0 && (
        <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
              Os Mais Desejados
            </h2>
            <div className="mt-10">
              <AsymmetricGrid items={featured} />
            </div>
          </div>
        </section>
      )}

      <section id="explorar" className="scroll-mt-24 bg-lux-white px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
            Explorar Body Splash
          </h2>

          <div className="mt-8">
            <Suspense fallback={null}>
              <BodyCareFilters basePath="/body-splash" sensations={sensations} />
            </Suspense>
          </div>

          {items.length === 0 ? (
            <p className="mt-16 text-center text-sm text-lux-brown">
              Nenhum body splash encontrado com esse filtro.
            </p>
          ) : (
            <div className="mt-10">
              <AsymmetricGrid items={chunk1} />
            </div>
          )}
        </div>
      </section>

      <SensationExplorer
        eyebrow="Shop the Category"
        title="Encontre a Sua Fragrância"
        subtitle="Deixe uma sensação guiar sua descoberta."
        basePath="/body-splash"
        sensations={sensations}
      />

      <CampaignBanner
        eyebrow="Campanha"
        title="A Fragrância Que Fica Na Pele."
        text="Descubra aromas leves para acompanhar você muito além de uma ocasião."
        ctaLabel="Ver Coleção"
        ctaHref="#explorar"
        backgroundImage="/products/body-splash/bath-body-works-warm-vanilla-sugar-mist.jpg"
      />

      <RitualBuilder
        title="Crie Seu Ritual"
        subtitle="Combine fragrâncias e crie uma experiência mais completa: body splash + creme corporal."
        pairs={ritualPairs}
      />

      {chunk2.length > 0 && (
        <section className="bg-lux-white px-6 py-16 md:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {chunk2.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <CampaignBanner
        title="Encontre Sua Próxima Fragrância"
        text="Descubra uma nova forma de perfumar o corpo."
        ctaLabel="Explorar Body Splash"
        ctaHref="#explorar"
        backgroundImage="/products/body-splash/victorias-secret-velvet-petals-mist.jpg"
      />

      <Footer />
    </div>
  );
}
