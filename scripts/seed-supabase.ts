/**
 * Popula o Supabase com os dados reais já existentes em src/data/products.ts e src/data/brands.ts.
 * Rodar UMA VEZ, depois que a migration supabase/migrations/0001_init.sql já tiver sido aplicada.
 *
 * Uso:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-supabase.ts
 */
import { createClient } from "@supabase/supabase-js";
import { brands } from "../src/data/brands";
import { products } from "../src/data/products";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY antes de rodar este script.");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey);

async function main() {
  console.log(`Enviando ${brands.length} marcas...`);
  const brandRows = brands.map((b) => ({
    slug: b.slug,
    name: b.name,
    description: b.description ?? null,
  }));
  const { error: brandsError } = await supabase.from("brands").upsert(brandRows, { onConflict: "slug" });
  if (brandsError) throw brandsError;

  console.log(`Enviando ${products.length} produtos...`);
  const productRows = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand_slug: p.brandSlug,
    gender: p.gender,
    category: p.category,
    volume_ml: p.volumeMl,
    price: p.price,
    sale_price: p.salePrice ?? null,
    short_description: p.shortDescription ?? null,
    description: p.description ?? null,
    main_image: p.mainImage,
    gallery: p.gallery ?? [],
    olfactive_family: p.olfactiveFamily ?? null,
    top_notes: p.topNotes ?? [],
    heart_notes: p.heartNotes ?? [],
    base_notes: p.baseNotes ?? [],
    main_accords: p.mainAccords ?? [],
    sensations: p.sensations ?? [],
    occasions: p.occasions ?? [],
    dna: p.dna ?? null,
    intensity: p.intensity ?? null,
    longevity: p.longevity ?? null,
    projection: p.projection ?? null,
    inspired_by: p.inspiredBy ?? null,
    featured: p.featured ?? false,
    is_new: p.isNew ?? false,
    is_bestseller: p.isBestseller ?? false,
    is_special_edit: p.isSpecialEdit ?? false,
    is_decant: p.isDecant ?? false,
    related_products: p.relatedProducts ?? [],
    in_stock: p.inStock,
    needs_admin_review: p.needsAdminReview,
  }));

  // upsert em lotes de 50 para não estourar o payload
  for (let i = 0; i < productRows.length; i += 50) {
    const batch = productRows.slice(i, i + 50);
    const { error } = await supabase.from("products").upsert(batch, { onConflict: "id" });
    if (error) throw error;
    console.log(`  ...${Math.min(i + 50, productRows.length)}/${productRows.length}`);
  }

  console.log("Seed concluído com sucesso.");
}

main().catch((err) => {
  console.error("Erro ao popular o Supabase:", err);
  process.exit(1);
});
