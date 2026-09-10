import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { rowToProduct, type ProductRow } from "@/lib/supabase/mappers";
import type { Product } from "@/types/product";

/**
 * Camada de dados do catálogo, agora lendo do Supabase (fonte de verdade editada pelo painel admin).
 * `cache()` garante que múltiplos componentes na mesma requisição reaproveitam a mesma consulta.
 * Usa o cliente público (sem cookies) porque o catálogo tem leitura pública via RLS e esta camada
 * também é chamada de contextos sem request (ex: generateStaticParams).
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("products").select("*").order("name");
  if (error || !data) return [];
  return (data as ProductRow[]).map(rowToProduct);
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle<ProductRow>();
  return data ? rowToProduct(data) : undefined;
});

export function getRelatedProducts(product: Product, all: Product[]): Product[] {
  if (!product.relatedProducts?.length) return [];
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  return product.relatedProducts
    .map((ref) => bySlug.get(ref.slug))
    .filter((p): p is Product => Boolean(p));
}
