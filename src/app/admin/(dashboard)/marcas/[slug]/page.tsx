import { notFound } from "next/navigation";
import { BrandForm } from "@/components/admin/BrandForm";
import { createClient } from "@/lib/supabase/server";
import { rowToBrand, type BrandRow } from "@/lib/supabase/mappers";
import { updateBrand, deleteBrand } from "../actions";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditarMarcaPage({
  params,
  searchParams,
}: PageProps<"/admin/marcas/[slug]">) {
  const { slug } = await params;
  const sp = await searchParams;
  const error = first(sp.error);

  const supabase = await createClient();
  const { data: row } = await supabase.from("brands").select("*").eq("slug", slug).single<BrandRow>();

  if (!row) notFound();

  const brand = rowToBrand(row);
  const updateWithSlug = updateBrand.bind(null, slug);
  const deleteWithSlug = deleteBrand.bind(null, slug);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-lux-deep">Editar: {brand.name}</h1>
        <form action={deleteWithSlug}>
          <button type="submit" className="text-xs tracking-wide text-red-700 underline underline-offset-4">
            Excluir marca
          </button>
        </form>
      </div>
      <div className="mt-8">
        <BrandForm action={updateWithSlug} brand={brand} error={error} />
      </div>
    </div>
  );
}
