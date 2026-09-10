import Link from "next/link";
import Image from "next/image";

const ESSENCES = [
  { label: "Marcante", image: "/products/masculino/khamrah.png" },
  { label: "Elegante", image: "/products/feminino/tharwah-gold.png" },
  { label: "Sensual", image: "/products/feminino/musamam.png" },
  { label: "Delicada", image: "/products/feminino/duha.png" },
];

export function FindYourEssence() {
  return (
    <section className="bg-lux-champagne/10 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-light text-lux-deep sm:text-4xl">
            Encontre a Sua Essência
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {ESSENCES.map((essence) => (
            <Link
              key={essence.label}
              href={`/perfumes?essencia=${encodeURIComponent(essence.label)}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-card"
            >
              <Image
                src={essence.image}
                alt={essence.label}
                fill
                sizes="(max-width: 768px) 45vw, 22vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lux-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-0 right-0 text-center font-serif text-xl text-lux-white">
                {essence.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
