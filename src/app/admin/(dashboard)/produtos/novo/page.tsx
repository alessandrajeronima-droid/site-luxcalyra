import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct, listBrandOptions } from "../actions";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NovoProdutoPage({
  searchParams,
}: PageProps<"/admin/produtos/novo">) {
  const params = await searchParams;
  const error = first(params.error);
  const brands = await listBrandOptions();

  return (
    <div>
      <h1 className="font-serif text-2xl text-lux-deep">Novo Produto</h1>
      <div className="mt-8">
        <ProductForm action={createProduct} brands={brands} error={error} />
      </div>
    </div>
  );
}
