import Link from "next/link";
import Image from "next/image";
import type { SensationOption } from "@/lib/bodyCare";

interface SensationExplorerProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  basePath: string;
  sensations: SensationOption[];
}

export function SensationExplorer({ eyebrow, title, subtitle, basePath, sensations }: SensationExplorerProps) {
  if (sensations.length === 0) return null;

  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs tracking-[0.35em] text-lux-brown uppercase">{eyebrow}</span>
        <h2 className="mt-4 font-serif text-3xl font-light text-lux-deep sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-lux-brown">{subtitle}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
        {sensations.map((sensation) => (
          <Link
            key={sensation.label}
            href={`${basePath}?sensacao=${encodeURIComponent(sensation.label)}#explorar`}
            className="group relative aspect-[3/4] overflow-hidden rounded-card"
          >
            <Image
              src={sensation.image}
              alt={sensation.label}
              fill
              sizes="(max-width: 640px) 45vw, 22vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lux-black/75 via-lux-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="font-serif text-xl text-lux-white">{sensation.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
