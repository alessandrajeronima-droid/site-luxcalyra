import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Product } from "@/types/product";

interface ProductFormProps {
  action: (formData: FormData) => void;
  brands: { slug: string; name: string }[];
  product?: Product;
  error?: string;
}

function join(values?: string[]): string {
  return (values ?? []).join(", ");
}

export function ProductForm({ action, brands, product, error }: ProductFormProps) {
  return (
    <form action={action} className="flex max-w-3xl flex-col gap-8">
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {!product && (
        <Field label="ID (interno, único)">
          <input name="id" required className="input" placeholder="ex: bs10" />
        </Field>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nome">
          <input name="name" defaultValue={product?.name} required className="input" />
        </Field>
        <Field label="Slug (URL)">
          <input name="slug" defaultValue={product?.slug} required className="input" />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Marca">
          <select name="brandSlug" defaultValue={product?.brandSlug ?? ""} className="input">
            <option value="">— Sem marca —</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Gênero">
          <select name="gender" defaultValue={product?.gender ?? "unissex"} className="input">
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="unissex">Unissex</option>
          </select>
        </Field>
        <Field label="Categoria">
          <select name="category" defaultValue={product?.category ?? "perfume"} className="input">
            <option value="perfume">Perfume</option>
            <option value="body-splash">Body Splash</option>
            <option value="creme-corporal">Creme Corporal</option>
            <option value="decant">Decant</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Volume (ml)">
          <input
            type="number"
            name="volumeMl"
            defaultValue={product?.volumeMl ?? 0}
            className="input"
          />
        </Field>
        <Field label="Preço (R$)">
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={product?.price}
            required
            className="input"
          />
        </Field>
        <Field label="Preço promocional (R$)">
          <input
            type="number"
            step="0.01"
            name="salePrice"
            defaultValue={product?.salePrice}
            className="input"
          />
        </Field>
      </div>

      <Field label="Quantidade em estoque">
        <input
          type="number"
          min={0}
          step="1"
          name="stockQuantity"
          defaultValue={product?.stockQuantity ?? 0}
          required
          className="input max-w-xs"
        />
        <p className="mt-1.5 text-xs text-lux-brown/70">
          O produto aparece como &quot;esgotado&quot; no site automaticamente quando chegar a 0.
        </p>
      </Field>

      <ImageUploader bucket="products" name="mainImage" defaultValue={product?.mainImage} label="Imagem principal" />

      <Field label="Descrição curta">
        <input name="shortDescription" defaultValue={product?.shortDescription} className="input" />
      </Field>
      <Field label="Descrição completa">
        <textarea name="description" defaultValue={product?.description} rows={4} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Família olfativa">
          <input name="olfactiveFamily" defaultValue={product?.olfactiveFamily} className="input" />
        </Field>
        <Field label="Intensidade">
          <select name="intensity" defaultValue={product?.intensity ?? ""} className="input">
            <option value="">— Não definida —</option>
            <option value="suave">Suave</option>
            <option value="moderada">Moderada</option>
            <option value="marcante">Marcante</option>
            <option value="muito intensa">Muito intensa</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Notas de topo (separadas por vírgula)">
          <input name="topNotes" defaultValue={join(product?.topNotes)} className="input" />
        </Field>
        <Field label="Notas de coração">
          <input name="heartNotes" defaultValue={join(product?.heartNotes)} className="input" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Notas de fundo">
          <input name="baseNotes" defaultValue={join(product?.baseNotes)} className="input" />
        </Field>
        <Field label="Principais acordes">
          <input name="mainAccords" defaultValue={join(product?.mainAccords)} className="input" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Sensações (para o Fragrance Finder)">
          <input name="sensations" defaultValue={join(product?.sensations)} className="input" />
        </Field>
        <Field label="Ocasiões">
          <input name="occasions" defaultValue={join(product?.occasions)} className="input" />
        </Field>
      </div>

      <Field label="Inspirado em (opcional)">
        <input name="inspiredBy" defaultValue={product?.inspiredBy} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-3 rounded-block border border-lux-champagne/40 p-5 sm:grid-cols-3">
        <Checkbox name="featured" label="Destaque (featured)" defaultChecked={product?.featured} />
        <Checkbox name="isNew" label="Novidade" defaultChecked={product?.isNew} />
        <Checkbox name="isBestseller" label="Best seller" defaultChecked={product?.isBestseller} />
        <Checkbox name="isSpecialEdit" label="Special edit / oferta" defaultChecked={product?.isSpecialEdit} />
        <Checkbox name="isDecant" label="Decant" defaultChecked={product?.isDecant} />
        <Checkbox
          name="needsAdminReview"
          label="Pendente de revisão"
          defaultChecked={product?.needsAdminReview}
        />
      </div>

      <button
        type="submit"
        className="w-fit rounded-full bg-lux-deep px-8 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
      >
        {product ? "Salvar Alterações" : "Criar Produto"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs tracking-widest text-lux-brown uppercase">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-lux-deep">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}
