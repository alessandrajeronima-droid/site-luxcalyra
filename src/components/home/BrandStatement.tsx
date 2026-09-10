interface BrandStatementProps {
  title?: string;
  marquee?: string;
}

export function BrandStatement({
  title = "Seu perfume é parte da sua presença.",
  marquee = "Arabian Perfumery · Curated in Brazil",
}: BrandStatementProps) {
  return (
    <section className="bg-lux-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-3xl font-light leading-tight text-lux-deep sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>

      <div className="relative mt-10 overflow-hidden py-3">
        <div className="animate-[marquee_28s_linear_infinite] flex w-max gap-16 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-16 text-xs tracking-[0.4em] text-lux-brown/70 uppercase"
            >
              {Array.from({ length: 6 }).map((_, j) => (
                <span key={j}>{marquee}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
