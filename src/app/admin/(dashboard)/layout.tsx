import Link from "next/link";
import type { Metadata } from "next";
import { logout } from "../actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/marcas", label: "Marcas" },
  { href: "/admin/conteudo", label: "Conteúdo do Site" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F7F4F0]">
      <aside className="flex w-56 flex-shrink-0 flex-col justify-between border-r border-lux-champagne/30 bg-lux-white px-5 py-6">
        <div>
          <span className="font-serif text-lg text-lux-deep">Lux Calyra</span>
          <p className="text-[11px] tracking-widest text-lux-brown/60 uppercase">Admin</p>

          <nav className="mt-10 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-lux-brown transition-colors hover:bg-lux-champagne/15 hover:text-lux-deep"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/" target="_blank" className="text-xs text-lux-brown underline underline-offset-4">
            Ver site →
          </Link>
          <form action={logout}>
            <button type="submit" className="text-xs text-lux-brown underline underline-offset-4">
              Sair
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
