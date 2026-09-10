import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Brand } from "@/types/product";

interface BrandFormProps {
  action: (formData: FormData) => void;
  brand?: Brand;
  error?: string;
}

export function BrandForm({ action, brand, error }: BrandFormProps) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-6">
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {!brand && (
        <div>
          <label className="text-xs tracking-widest text-lux-brown uppercase">Slug (identificador único)</label>
          <input name="slug" required className="input mt-2" placeholder="ex: victorias-secret" />
        </div>
      )}

      <div>
        <label className="text-xs tracking-widest text-lux-brown uppercase">Nome</label>
        <input name="name" defaultValue={brand?.name} required className="input mt-2" />
      </div>

      <div>
        <label className="text-xs tracking-widest text-lux-brown uppercase">Descrição</label>
        <textarea name="description" defaultValue={brand?.description} rows={3} className="input mt-2" />
      </div>

      <ImageUploader bucket="brands" name="logoUrl" defaultValue={brand?.logoUrl} label="Logo oficial" />

      <button
        type="submit"
        className="w-fit rounded-full bg-lux-deep px-8 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
      >
        {brand ? "Salvar Alterações" : "Criar Marca"}
      </button>
    </form>
  );
}
