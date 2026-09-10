import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function AdminMarcasPage() {
  const supabase = await createClient();
  const { data: brands, error } = await supabase
    .from("brands")
    .select("slug, name, description, logo_url")
    .order("name");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-lux-deep">Marcas</h1>
          <p className="mt-1 text-sm text-lux-brown">{brands?.length ?? 0} marcas.</p>
        </div>
        <Link
          href="/admin/marcas/novo"
          className="rounded-full bg-lux-deep px-6 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
        >
          + Nova Marca
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-red-700">Erro ao carregar: {error.message}</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {(brands ?? []).map((brand) => (
          <Link
            key={brand.slug}
            href={`/admin/marcas/${brand.slug}`}
            className="flex items-center gap-4 rounded-block border border-lux-champagne/40 bg-lux-white p-5 transition-colors hover:border-lux-deep"
          >
            {brand.logo_url ? (
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-lux-champagne/15">
                <Image src={brand.logo_url} alt={brand.name} fill sizes="48px" className="object-contain" />
              </div>
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-lux-champagne/15 text-xs text-lux-brown">
                Sem logo
              </div>
            )}
            <div>
              <p className="font-medium text-lux-deep">{brand.name}</p>
              <p className="text-xs text-lux-brown/70">{brand.slug}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
