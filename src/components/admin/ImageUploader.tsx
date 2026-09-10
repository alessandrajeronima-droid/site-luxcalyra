"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  bucket: "products" | "brands";
  name: string;
  defaultValue?: string;
  label?: string;
}

export function ImageUploader({ bucket, name, defaultValue, label = "Imagem" }: ImageUploaderProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setValue(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="text-xs tracking-widest text-lux-brown uppercase">{label}</label>
      <div className="mt-2 flex items-center gap-4">
        {value && (
          <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded bg-lux-champagne/15">
            <Image src={value} alt="" fill sizes="64px" className="object-cover" />
          </div>
        )}
        <div className="flex-1">
          <input
            type="text"
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="/products/... ou cole uma URL"
            className="w-full rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2 text-sm text-lux-deep"
          />
          <label className="mt-2 inline-block cursor-pointer text-xs tracking-wide text-lux-deep underline underline-offset-4">
            {uploading ? "Enviando…" : "Enviar arquivo"}
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
          </label>
          {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
