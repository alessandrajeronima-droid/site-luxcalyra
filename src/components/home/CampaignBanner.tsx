import Image from "next/image";
import Link from "next/link";

interface CampaignBannerProps {
  eyebrow?: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage?: string;
}

export function CampaignBanner({
  eyebrow,
  title,
  text,
  ctaLabel,
  ctaHref,
  backgroundImage,
}: CampaignBannerProps) {
  return (
    <section className="px-6 py-10 md:px-12 md:py-16">
      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl items-center overflow-hidden rounded-banner bg-lux-deep">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-lux-black/80 via-lux-deep/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-xl px-8 text-center md:px-12">
          {eyebrow && (
            <span className="text-xs tracking-[0.35em] text-lux-champagne uppercase">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-lux-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-lux-white/80 md:text-base">{text}</p>
          <Link
            href={ctaHref}
            className="mt-8 inline-block rounded-full bg-lux-champagne px-9 py-3.5 text-sm tracking-wide text-lux-deep transition-colors hover:bg-lux-white"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
