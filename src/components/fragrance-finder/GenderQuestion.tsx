import Image from "next/image";
import type { FinderOption } from "@/lib/fragranceFinder";

export function GenderQuestion({
  options,
  onSelect,
}: {
  options: FinderOption[];
  onSelect: (label: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => onSelect(option.label)}
          aria-label={option.label}
          className="group relative aspect-[4/5] overflow-hidden rounded-block"
        >
          {option.image && (
            <Image
              src={option.image}
              alt={option.label}
              fill
              sizes="(max-width: 640px) 90vw, 40vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-lux-black/75 via-lux-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-left">
            <span className="font-serif text-3xl text-lux-white">{option.label}</span>
            {option.subtext && (
              <p className="mt-1 text-sm text-lux-white/75">{option.subtext}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
