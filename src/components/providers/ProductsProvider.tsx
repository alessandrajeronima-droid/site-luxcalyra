"use client";

import { createContext, useContext } from "react";
import type { Brand, Product } from "@/types/product";

const ProductsContext = createContext<Product[]>([]);
const BrandsContext = createContext<Brand[]>([]);

export function ProductsProvider({
  products,
  brands,
  children,
}: {
  products: Product[];
  brands: Brand[];
  children: React.ReactNode;
}) {
  return (
    <ProductsContext.Provider value={products}>
      <BrandsContext.Provider value={brands}>{children}</BrandsContext.Provider>
    </ProductsContext.Provider>
  );
}

/** Catálogo completo, carregado uma vez no layout raiz a partir do Supabase. */
export function useAllProducts(): Product[] {
  return useContext(ProductsContext);
}

/** Todas as marcas, carregadas uma vez no layout raiz a partir do Supabase. */
export function useAllBrands(): Brand[] {
  return useContext(BrandsContext);
}

export function useBrandBySlug(slug: string | null | undefined): Brand | undefined {
  const brands = useAllBrands();
  return brands.find((b) => b.slug === slug);
}
