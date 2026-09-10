import Link from "next/link";
import Image from "next/image";

const FAMILIES = [
  { label: "Âmbar", image: "/products/masculino/asad-elixir.png" },
  { label: "Floral", image: "/products/feminino/emaan.png" },
  { label: "Amadeirado", image: "/products/masculino/al-noble-wazeer.png" },
  { label: "Cítrico", image: "/products/masculino/pacific-aura.png" },
  { label: "Doce", image: "/products/feminino/yara.png" },
  { label: "Oud", image: "/products/masculino/badee-al-oud-amethyst.png" },
];

export function ExploreByFamily() {
  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
            Encontre o Seu Universo
          </h2>
          <p className="mt-3 text-sm text-lux-brown">
            Explore a curadoria por família olfativa.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {FAMILIES.map((family) => (
            <Link
              key={family.label}
              href={`/perfumes?nota=${encodeURIComponent(family.label)}#explorar-perfumes`}
              className="group relative aspect-[4/5] overflow-hidden rounded-card"
            >
              <Image
                src={family.image}
                alt={family.label}
                fill
                sizes="(max-width: 768px) 45vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lux-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-0 right-0 text-center font-serif text-xl text-lux-white">
                {family.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
