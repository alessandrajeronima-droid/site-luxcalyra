import { Header } from "@/components/navigation/Header";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <div className="relative bg-lux-deep py-24">
      <Header />
      <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="text-xs tracking-[0.3em] text-lux-champagne uppercase">{eyebrow}</span>
        <h1 className="mt-3 font-serif text-4xl font-light text-lux-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 text-sm text-lux-white/70">{subtitle}</p>}
      </div>
    </div>
  );
}
