import { notFound } from "next/navigation";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient } from "@/lib/supabase/server";
import { getContentGroup } from "@/lib/data/contentSchema";
import { CONTENT_DEFAULTS, type ContentKey } from "@/lib/data/content";
import { updateContent } from "../actions";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditarConteudoPage({
  params,
  searchParams,
}: PageProps<"/admin/conteudo/[key]">) {
  const { key } = await params;
  const sp = await searchParams;
  const error = first(sp.error);

  const group = getContentGroup(key);
  if (!group) notFound();

  const supabase = await createClient();
  const { data: row } = await supabase.from("site_content").select("data").eq("key", key).maybeSingle();
  const current = {
    ...CONTENT_DEFAULTS[key as ContentKey],
    ...(row?.data as Record<string, string> | undefined),
  } as Record<string, string>;

  const updateWithKey = updateContent.bind(null, key);

  return (
    <div>
      <h1 className="font-serif text-2xl text-lux-deep">{group.label}</h1>

      <form action={updateWithKey} className="mt-8 flex max-w-2xl flex-col gap-6">
        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {group.fields.map((field) => (
          <div key={field.name}>
            <label className="text-xs tracking-widest text-lux-brown uppercase">{field.label}</label>
            {field.hint && <p className="mt-1 text-xs text-lux-brown/60">{field.hint}</p>}
            <div className="mt-2">
              {field.type === "image" ? (
                <ImageUploader
                  bucket="products"
                  name={field.name}
                  defaultValue={current[field.name]}
                  label=""
                />
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  defaultValue={current[field.name] ?? ""}
                  rows={field.name === "body" ? 16 : 4}
                  className="input"
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  defaultValue={current[field.name] ?? ""}
                  className="input"
                />
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-fit rounded-full bg-lux-deep px-8 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
