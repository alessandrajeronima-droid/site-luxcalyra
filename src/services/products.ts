import { getProducts, getProductBySlug } from "@/lib/data/products";
import type { Category, Gender, Product } from "@/types/product";

/**
 * Camada de acesso a dados de produto. Lê do Supabase (fonte de verdade editada pelo painel admin
 * em /admin), via src/lib/data/products.ts.
 */

export interface ProductFilters {
  gender?: Gender;
  category?: Category;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function listProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => {
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.brandSlug && p.brandSlug !== filters.brandSlug) return false;
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    return true;
  });
}

export async function findProductBySlug(slug: string): Promise<Product | undefined> {
  return getProductBySlug(slug);
}

export async function listFeatured(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function listBestsellers(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isBestseller);
}

export async function listNew(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isNew);
}
