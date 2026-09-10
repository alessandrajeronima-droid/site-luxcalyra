import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: brandCount }, { count: reviewCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("brands").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("needs_admin_review", true),
  ]);

  const cards = [
    { label: "Produtos cadastrados", value: productCount ?? 0, href: "/admin/produtos" },
    { label: "Marcas cadastradas", value: brandCount ?? 0, href: "/admin/marcas" },
    {
      label: "Produtos pendentes de revisão",
      value: reviewCount ?? 0,
      href: "/admin/produtos?revisao=1",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl text-lux-deep">Dashboard</h1>
      <p className="mt-1 text-sm text-lux-brown">Visão geral do catálogo Lux Calyra.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-block border border-lux-champagne/40 bg-lux-white p-6 transition-colors hover:border-lux-deep"
          >
            <span className="text-3xl font-light text-lux-deep">{card.value}</span>
            <p className="mt-2 text-sm text-lux-brown">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex gap-3">
        <Link
          href="/admin/produtos/novo"
          className="rounded-full bg-lux-deep px-6 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
        >
          + Novo Produto
        </Link>
        <Link
          href="/admin/marcas/novo"
          className="rounded-full border border-lux-brown/30 px-6 py-3 text-sm tracking-wide text-lux-deep transition-colors hover:border-lux-deep"
        >
          + Nova Marca
        </Link>
      </div>
    </div>
  );
}
