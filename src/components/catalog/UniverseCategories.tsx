import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    label: "Femininos",
    description: "Fragrâncias que celebram presença.",
    href: "/perfumes?gender=feminino",
    image: "/products/feminino/tharwah-gold.png",
  },
  {
    label: "Masculinos",
    description: "Assinaturas de caráter.",
    href: "/perfumes?gender=masculino",
    image: "/products/masculino/khamrah.png",
  },
  {
    label: "Unissex",
    description: "Versáteis, sem fronteiras.",
    href: "/perfumes?gender=unissex",
    image: "/products/masculino/qaed-al-fursan.png",
  },
  {
    label: "Decants",
    description: "Experimente antes de escolher.",
    href: "/decants",
    image: "/products/feminino/raneen.png",
  },
  {
    label: "Ofertas",
    description: "Condições especiais da casa.",
    href: "/ofertas",
    image: "/products/masculino/salvo.png",
  },
];

export function UniverseCategories() {
  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
          Encontre o Seu Universo
        </h2>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="group relative aspect-[3/4] w-[62vw] flex-shrink-0 overflow-hidden rounded-card md:w-auto"
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                sizes="(max-width: 768px) 60vw, 20vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lux-black/80 via-lux-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <h3 className="font-serif text-xl text-lux-white">{category.label}</h3>
                <p className="mt-1 text-xs text-lux-white/70">{category.description}</p>
                <span className="mt-2 inline-block text-lux-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
