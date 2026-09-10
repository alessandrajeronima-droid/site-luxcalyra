import { BrandForm } from "@/components/admin/BrandForm";
import { createBrand } from "../actions";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NovaMarcaPage({
  searchParams,
}: PageProps<"/admin/marcas/novo">) {
  const params = await searchParams;
  const error = first(params.error);

  return (
    <div>
      <h1 className="font-serif text-2xl text-lux-deep">Nova Marca</h1>
      <div className="mt-8">
        <BrandForm action={createBrand} error={error} />
      </div>
    </div>
  );
}
