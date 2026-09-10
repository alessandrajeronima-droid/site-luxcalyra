"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getContentGroup } from "@/lib/data/contentSchema";

export async function updateContent(key: string, formData: FormData) {
  const group = getContentGroup(key);
  if (!group) return;

  const data: Record<string, string> = {};
  for (const field of group.fields) {
    data[field.name] = String(formData.get(field.name) ?? "");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("site_content").upsert({ key, data }, { onConflict: "key" });
  if (error) {
    redirect(`/admin/conteudo/${key}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/conteudo");
  revalidatePath("/", "layout");
  redirect("/admin/conteudo");
}
