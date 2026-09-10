import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { rowToBrand, type BrandRow } from "@/lib/supabase/mappers";
import type { Brand } from "@/types/product";

export const getBrands = cache(async (): Promise<Brand[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("brands").select("*").order("name");
  if (error || !data) return [];
  return (data as BrandRow[]).map(rowToBrand);
});

export const getBrandBySlug = cache(async (slug: string | null): Promise<Brand | undefined> => {
  if (!slug) return undefined;
  const brands = await getBrands();
  return brands.find((b) => b.slug === slug);
});
