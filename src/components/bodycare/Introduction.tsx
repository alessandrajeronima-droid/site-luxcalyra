interface IntroductionProps {
  eyebrow: string;
  title: string;
  text: string;
}

export function Introduction({ eyebrow, title, text }: IntroductionProps) {
  return (
    <section className="bg-lux-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs tracking-[0.35em] text-lux-brown uppercase">{eyebrow}</span>
        <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-lux-deep sm:text-4xl">
          {title}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-lux-brown md:text-base">{text}</p>
      </div>
    </section>
  );
}
