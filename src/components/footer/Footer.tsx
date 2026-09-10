import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Perfumes", href: "/perfumes" },
      { label: "Decants", href: "/decants" },
      { label: "Marcas", href: "/marcas" },
      { label: "Ofertas", href: "/ofertas" },
    ],
  },
  {
    title: "Lux Calyra",
    links: [
      { label: "Sobre a Lux Calyra", href: "/sobre" },
      { label: "Contato", href: "/contato" },
      { label: "WhatsApp", href: "https://wa.me/5541998732484" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Política de Privacidade", href: "/politica-privacidade" },
      { label: "Termos de Uso", href: "/termos" },
      { label: "Trocas e Devoluções", href: "/trocas-devolucoes" },
      { label: "Entrega", href: "/entrega" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-lux-deep px-6 py-16 text-lux-white/80 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <Image
            src="/brand/wordmark-white.png"
            alt="Lux Calyra"
            width={180}
            height={60}
            className="h-8 w-auto"
          />
          <p className="mt-4 max-w-xs text-xs text-lux-white/60">
            Perfumes árabes selecionados.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs tracking-widest text-lux-champagne uppercase">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-lux-white/70 hover:text-lux-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-[10px] text-lux-white/40">
        © {new Date().getFullYear()} Lux Calyra. Todos os direitos reservados.
      </p>
    </footer>
  );
}
