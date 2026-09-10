"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Category, Gender, Product } from "@/types/product";

function listField(formData: FormData, key: string): string[] {
  const raw = String(formData.get(key) ?? "").trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function formToRow(formData: FormData) {
  const price = Number(formData.get("price"));
  const salePriceRaw = String(formData.get("salePrice") ?? "").trim();

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    brand_slug: String(formData.get("brandSlug") ?? "").trim() || null,
    gender: String(formData.get("gender")) as Gender,
    category: String(formData.get("category")) as Category,
    volume_ml: Number(formData.get("volumeMl")) || 0,
    price,
    sale_price: salePriceRaw ? Number(salePriceRaw) : null,
    short_description: String(formData.get("shortDescription") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    main_image: String(formData.get("mainImage") ?? "").trim(),
    olfactive_family: String(formData.get("olfactiveFamily") ?? "").trim() || null,
    top_notes: listField(formData, "topNotes"),
    heart_notes: listField(formData, "heartNotes"),
    base_notes: listField(formData, "baseNotes"),
    main_accords: listField(formData, "mainAccords"),
    sensations: listField(formData, "sensations"),
    occasions: listField(formData, "occasions"),
    intensity: String(formData.get("intensity") ?? "").trim() || null,
    inspired_by: String(formData.get("inspiredBy") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    is_new: formData.get("isNew") === "on",
    is_bestseller: formData.get("isBestseller") === "on",
    is_special_edit: formData.get("isSpecialEdit") === "on",
    is_decant: formData.get("isDecant") === "on",
    stock_quantity: Math.max(0, Number(formData.get("stockQuantity")) || 0),
    needs_admin_review: formData.get("needsAdminReview") === "on",
  };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const row = formToRow(formData);
  const id = String(formData.get("id") ?? "").trim() || row.slug;

  const { error } = await supabase.from("products").insert({ id, ...row });
  if (error) {
    redirect(`/admin/produtos/novo?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/produtos");
  revalidatePath("/", "layout");
  redirect("/admin/produtos");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const row = formToRow(formData);

  const { error } = await supabase.from("products").update(row).eq("id", id);
  if (error) {
    redirect(`/admin/produtos/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/produtos");
  revalidatePath(`/admin/produtos/${id}`);
  revalidatePath("/", "layout");
  redirect("/admin/produtos");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/produtos");
  revalidatePath("/", "layout");
  redirect("/admin/produtos");
}

export async function listBrandOptions(): Promise<{ slug: string; name: string }[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("brands").select("slug, name").order("name");
  return data ?? [];
}

export type { Product };
