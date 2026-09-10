import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";
import { rowToProduct, type ProductRow } from "@/lib/supabase/mappers";
import { updateProduct, deleteProduct, listBrandOptions } from "../actions";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditarProdutoPage({
  params,
  searchParams,
}: PageProps<"/admin/produtos/[id]">) {
  const { id } = await params;
  const sp = await searchParams;
  const error = first(sp.error);

  const supabase = await createClient();
  const [{ data: row }, brands] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single<ProductRow>(),
    listBrandOptions(),
  ]);

  if (!row) notFound();

  const product = rowToProduct(row);
  const updateWithId = updateProduct.bind(null, id);
  const deleteWithId = deleteProduct.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-lux-deep">Editar: {product.name}</h1>
        <form action={deleteWithId}>
          <button type="submit" className="text-xs tracking-wide text-red-700 underline underline-offset-4">
            Excluir produto
          </button>
        </form>
      </div>
      <div className="mt-8">
        <ProductForm action={updateWithId} brands={brands} product={product} error={error} />
      </div>
    </div>
  );
}
