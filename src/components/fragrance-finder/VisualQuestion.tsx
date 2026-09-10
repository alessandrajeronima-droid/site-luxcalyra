import Image from "next/image";
import type { FinderOption } from "@/lib/fragranceFinder";

const INTENSITY_LEVEL: Record<string, number> = {
  Suave: 1,
  Moderada: 2,
  Marcante: 3,
  "Muito intensa": 4,
};

export function VisualQuestion({
  options,
  onSelect,
}: {
  options: FinderOption[];
  onSelect: (label: string) => void;
}) {
  const hasImages = options.some((o) => o.image);

  return (
    <div
      className={`grid gap-4 ${
        hasImages ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"
      }`}
    >
      {options.map((option) => {
        const level = INTENSITY_LEVEL[option.label];
        return (
          <button
            key={option.label}
            onClick={() => onSelect(option.label)}
            aria-label={option.label}
            className="group relative overflow-hidden rounded-card text-left"
            style={{ aspectRatio: hasImages ? "3 / 4" : "4 / 5" }}
          >
            {option.image ? (
              <>
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  sizes="(max-width: 640px) 45vw, 22vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lux-black/75 via-lux-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="font-serif text-lg text-lux-white">{option.label}</span>
                  {option.subtext && (
                    <p className="mt-0.5 text-[11px] leading-snug text-lux-white/70">
                      {option.subtext}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col justify-between bg-lux-champagne/15 p-5 transition-colors duration-500 group-hover:bg-lux-champagne/30">
                <span className="font-serif text-xl text-lux-deep">{option.label}</span>
                {level && (
                  <div className="flex gap-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          i < level ? "bg-lux-brown" : "bg-lux-brown/20"
                        }`}
                      />
                    ))}
                  </div>
                )}
                {option.subtext && (
                  <p className="text-[11px] leading-snug text-lux-brown">{option.subtext}</p>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
