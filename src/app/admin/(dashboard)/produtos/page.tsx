import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { formatBRL } from "@/lib/format";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminProdutosPage({
  searchParams,
}: PageProps<"/admin/produtos">) {
  const params = await searchParams;
  const categoria = first(params.categoria);
  const revisao = first(params.revisao) === "1";
  const q = first(params.q)?.trim();

  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("id, slug, name, brand_slug, category, price, main_image, stock_quantity, needs_admin_review")
    .order("name");

  if (categoria) query = query.eq("category", categoria);
  if (revisao) query = query.eq("needs_admin_review", true);
  if (q) query = query.ilike("name", `%${q}%`);

  const { data: items, error } = await query;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-lux-deep">Produtos</h1>
          <p className="mt-1 text-sm text-lux-brown">{items?.length ?? 0} produtos.</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="rounded-full bg-lux-deep px-6 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
        >
          + Novo Produto
        </Link>
      </div>

      <form className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nome…"
          className="rounded-lg border border-lux-champagne/60 bg-lux-white px-3 py-2 text-sm text-lux-deep"
        />
        <select
          name="categoria"
          defaultValue={categoria ?? ""}
          className="rounded-lg border border-lux-champagne/60 bg-lux-white px-3 py-2 text-sm text-lux-deep"
        >
          <option value="">Todas as categorias</option>
          <option value="perfume">Perfume</option>
          <option value="body-splash">Body Splash</option>
          <option value="creme-corporal">Creme Corporal</option>
          <option value="decant">Decant</option>
        </select>
        <label className="flex items-center gap-2 rounded-lg border border-lux-champagne/60 bg-lux-white px-3 py-2 text-sm text-lux-deep">
          <input type="checkbox" name="revisao" value="1" defaultChecked={revisao} />
          Pendente de revisão
        </label>
        <button type="submit" className="rounded-lg bg-lux-deep px-4 py-2 text-sm text-lux-white">
          Filtrar
        </button>
      </form>

      {error && <p className="mt-6 text-sm text-red-700">Erro ao carregar: {error.message}</p>}

      <div className="mt-6 overflow-x-auto rounded-block border border-lux-champagne/30 bg-lux-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-lux-champagne/30 text-xs tracking-widest text-lux-brown/70 uppercase">
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Estoque</th>
              <th className="px-4 py-3">Revisão</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(items ?? []).map((p) => (
              <tr key={p.id} className="border-b border-lux-champagne/15 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-10 flex-shrink-0 overflow-hidden rounded bg-lux-champagne/15">
                      {p.main_image && (
                        <Image src={p.main_image} alt={p.name} fill sizes="40px" className="object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-lux-deep">{p.name}</p>
                      <p className="text-xs text-lux-brown/70">{p.brand_slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-lux-brown">{p.category}</td>
                <td className="px-4 py-3 text-lux-brown">{formatBRL(p.price)}</td>
                <td className="px-4 py-3">
                  {p.stock_quantity > 0 ? (
                    <span className="text-xs text-green-700">{p.stock_quantity} em estoque</span>
                  ) : (
                    <span className="text-xs text-red-700">Esgotado</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {p.needs_admin_review && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                      Pendente
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/produtos/${p.id}`}
                    className="text-xs tracking-wide text-lux-deep underline underline-offset-4"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {(items ?? []).length === 0 && !error && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-lux-brown">
                  Nenhum produto encontrado. Se o banco ainda não foi populado, rode o script de seed.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
