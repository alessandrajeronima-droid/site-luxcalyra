"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAllBrands } from "@/components/providers/ProductsProvider";
import { formatBRL } from "@/lib/format";
import { buildWhyItMatches, type FinderAnswers, type FinderMatch } from "@/lib/fragranceFinder";
import { ExperienceFirst } from "@/components/product/ExperienceFirst";

export function FinderResult({
  matches,
  answers,
  onRestart,
}: {
  matches: FinderMatch[];
  answers: FinderAnswers;
  onRestart: () => void;
}) {
  const brands = useAllBrands();
  const [main, ...rest] = matches;
  const alternatives = rest.slice(0, 2);

  if (!main) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="text-sm text-lux-brown">
          Não encontramos um match ideal com essas respostas. Que tal explorar o catálogo?
        </p>
        <Link
          href="/perfumes"
          className="mt-6 inline-block rounded-full bg-lux-deep px-8 py-3 text-sm text-lux-white"
        >
          Explorar Perfumes
        </Link>
      </div>
    );
  }

  const brand = brands.find((b) => b.slug === main.product.brandSlug);
  const why = buildWhyItMatches(answers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-xl px-6 text-center">
        <span className="text-xs tracking-[0.35em] text-lux-brown uppercase">
          Escolhido para Você
        </span>
        <h2 className="mt-3 font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Sua Assinatura Olfativa
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-lux-brown">
          Encontramos uma fragrância que conversa com a maneira como você quer
          ser percebida.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[45%_55%] md:gap-14 md:px-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-block shadow-[0_25px_60px_-25px_rgba(61,45,35,0.4)]">
          <Image
            src={main.product.mainImage}
            alt={main.product.name}
            fill
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          {brand && (
            <span className="text-xs tracking-widest text-lux-brown uppercase">
              {brand.name}
            </span>
          )}
          <h3 className="mt-2 font-serif text-4xl text-lux-deep">{main.product.name}</h3>
          {main.product.volumeMl > 0 && (
            <p className="mt-1 text-sm text-lux-brown">
              Eau de Parfum · {main.product.volumeMl}ml
            </p>
          )}
          <p className="mt-5 text-xl text-lux-deep">{formatBRL(main.product.price)}</p>

          {main.product.description && (
            <p className="mt-5 max-w-md text-sm leading-relaxed text-lux-brown">
              {main.product.description}
            </p>
          )}

          <div className="mt-7 border-l-2 border-lux-champagne pl-5">
            <span className="text-xs tracking-widest text-lux-brown uppercase">
              Por que ele combina com você
            </span>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-lux-deep">{why}</p>
          </div>

          <Link
            href={`/perfume/${main.product.slug}`}
            className="mt-8 inline-block w-fit rounded-full bg-lux-deep px-8 py-3.5 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Ver Perfume →
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <ExperienceFirst product={main.product} />
      </div>

      {alternatives.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl px-6 md:px-12">
          <h4 className="text-center font-serif text-2xl font-light text-lux-deep">
            Mais Duas Possibilidades Para Você
          </h4>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {alternatives.map((alt) => {
              const altBrand = brands.find((b) => b.slug === alt.product.brandSlug);
              return (
                <Link
                  key={alt.product.id}
                  href={`/perfume/${alt.product.slug}`}
                  className="group flex items-center gap-5 rounded-card bg-lux-champagne/10 p-4"
                >
                  <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={alt.product.mainImage}
                      alt={alt.product.name}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    {altBrand && (
                      <span className="text-[10px] tracking-widest text-lux-brown uppercase">
                        {altBrand.name}
                      </span>
                    )}
                    <p className="font-serif text-lg text-lux-deep">{alt.product.name}</p>
                    <p className="text-xs text-lux-brown">{formatBRL(alt.product.price)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="mx-auto mt-16 max-w-lg px-6 text-center">
        <h4 className="font-serif text-2xl font-light text-lux-deep">
          Ainda quer descobrir mais?
        </h4>
        <p className="mt-2 text-sm text-lux-brown">Explore toda a curadoria Lux Calyra.</p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/perfumes"
            className="rounded-full bg-lux-deep px-8 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Ver Todos os Perfumes →
          </Link>
          <button
            onClick={onRestart}
            className="text-xs text-lux-brown underline underline-offset-4"
          >
            Refazer a descoberta
          </button>
        </div>
      </div>
    </motion.div>
  );
}
