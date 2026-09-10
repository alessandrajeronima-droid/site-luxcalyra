import type { Brand, Product } from "@/types/product";

/** Uma linha da tabela `products` no Supabase (snake_case). */
export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand_slug: string | null;
  gender: Product["gender"];
  category: Product["category"];
  volume_ml: number;
  price: number;
  sale_price: number | null;
  short_description: string | null;
  description: string | null;
  main_image: string;
  gallery: string[] | null;
  olfactive_family: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  main_accords: string[] | null;
  sensations: string[] | null;
  occasions: string[] | null;
  dna: Product["dna"] | null;
  intensity: Product["intensity"] | null;
  longevity: Product["longevity"] | null;
  projection: Product["projection"] | null;
  inspired_by: string | null;
  featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  is_special_edit: boolean;
  is_decant: boolean;
  related_products: Product["relatedProducts"] | null;
  stock_quantity: number;
  in_stock: boolean;
  needs_admin_review: boolean;
}

export interface BrandRow {
  slug: string;
  name: string;
  description: string | null;
  logo_url: string | null;
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brandSlug: row.brand_slug,
    gender: row.gender,
    category: row.category,
    volumeMl: row.volume_ml,
    price: Number(row.price),
    salePrice: row.sale_price != null ? Number(row.sale_price) : undefined,
    shortDescription: row.short_description ?? undefined,
    description: row.description ?? undefined,
    mainImage: row.main_image,
    gallery: row.gallery ?? undefined,
    olfactiveFamily: row.olfactive_family ?? undefined,
    topNotes: row.top_notes ?? undefined,
    heartNotes: row.heart_notes ?? undefined,
    baseNotes: row.base_notes ?? undefined,
    mainAccords: row.main_accords ?? undefined,
    sensations: row.sensations ?? undefined,
    occasions: row.occasions ?? undefined,
    dna: row.dna ?? undefined,
    intensity: row.intensity ?? undefined,
    longevity: row.longevity ?? undefined,
    projection: row.projection ?? undefined,
    inspiredBy: row.inspired_by ?? undefined,
    featured: row.featured,
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
    isSpecialEdit: row.is_special_edit,
    isDecant: row.is_decant,
    relatedProducts: row.related_products ?? undefined,
    stockQuantity: row.stock_quantity,
    inStock: row.stock_quantity > 0,
    needsAdminReview: row.needs_admin_review,
  };
}

export function rowToBrand(row: BrandRow): Brand {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description ?? undefined,
    logoUrl: row.logo_url ?? undefined,
  };
}

/** Converte o formulário do admin (camelCase, parcial) para uma linha pronta para upsert. */
export function productFormToRow(form: Partial<Product> & { id: string }): Record<string, unknown> {
  return {
    id: form.id,
    slug: form.slug,
    name: form.name,
    brand_slug: form.brandSlug ?? null,
    gender: form.gender,
    category: form.category,
    volume_ml: form.volumeMl ?? 0,
    price: form.price,
    sale_price: form.salePrice ?? null,
    short_description: form.shortDescription ?? null,
    description: form.description ?? null,
    main_image: form.mainImage,
    gallery: form.gallery ?? [],
    olfactive_family: form.olfactiveFamily ?? null,
    top_notes: form.topNotes ?? [],
    heart_notes: form.heartNotes ?? [],
    base_notes: form.baseNotes ?? [],
    main_accords: form.mainAccords ?? [],
    sensations: form.sensations ?? [],
    occasions: form.occasions ?? [],
    dna: form.dna ?? null,
    intensity: form.intensity ?? null,
    longevity: form.longevity ?? null,
    projection: form.projection ?? null,
    inspired_by: form.inspiredBy ?? null,
    featured: form.featured ?? false,
    is_new: form.isNew ?? false,
    is_bestseller: form.isBestseller ?? false,
    is_special_edit: form.isSpecialEdit ?? false,
    is_decant: form.isDecant ?? false,
    related_products: form.relatedProducts ?? [],
    stock_quantity: form.stockQuantity ?? 0,
    needs_admin_review: form.needsAdminReview ?? false,
  };
}
