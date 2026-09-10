"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function formToRow(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    logo_url: String(formData.get("logoUrl") ?? "").trim() || null,
  };
}

export async function createBrand(formData: FormData) {
  const supabase = await createClient();
  const slug = String(formData.get("slug") ?? "").trim();
  const row = formToRow(formData);

  const { error } = await supabase.from("brands").insert({ slug, ...row });
  if (error) {
    redirect(`/admin/marcas/novo?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/marcas");
  revalidatePath("/", "layout");
  redirect("/admin/marcas");
}

export async function updateBrand(slug: string, formData: FormData) {
  const supabase = await createClient();
  const row = formToRow(formData);

  const { error } = await supabase.from("brands").update(row).eq("slug", slug);
  if (error) {
    redirect(`/admin/marcas/${slug}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/marcas");
  revalidatePath("/", "layout");
  redirect("/admin/marcas");
}

export async function deleteBrand(slug: string) {
  const supabase = await createClient();
  await supabase.from("brands").delete().eq("slug", slug);
  revalidatePath("/admin/marcas");
  revalidatePath("/", "layout");
  redirect("/admin/marcas");
}
