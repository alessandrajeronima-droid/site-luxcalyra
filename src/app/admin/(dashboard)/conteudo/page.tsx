import Link from "next/link";
import { CONTENT_GROUPS } from "@/lib/data/contentSchema";

export default function AdminConteudoPage() {
  const groups = Array.from(new Set(CONTENT_GROUPS.map((g) => g.group)));

  return (
    <div>
      <h1 className="font-serif text-2xl text-lux-deep">Conteúdo do Site</h1>
      <p className="mt-1 text-sm text-lux-brown">
        Textos e imagens de páginas fixas do site (não é o catálogo de produtos).
      </p>

      <div className="mt-8 flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group}>
            <h2 className="text-xs tracking-widest text-lux-brown/70 uppercase">{group}</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CONTENT_GROUPS.filter((g) => g.group === group).map((item) => (
                <Link
                  key={item.key}
                  href={`/admin/conteudo/${item.key}`}
                  className="rounded-block border border-lux-champagne/40 bg-lux-white p-5 transition-colors hover:border-lux-deep"
                >
                  <span className="font-medium text-lux-deep">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
