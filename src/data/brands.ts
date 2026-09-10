import type { Brand } from "@/types/product";

// Marcas confirmadas visualmente nos frascos do catálogo Lux Calyra.
// Descrições são factuais (o que está confirmado no catálogo), não histórico
// ou posicionamento oficial da marca — não inventar além disso.
export const brands: Brand[] = [
  {
    slug: "lattafa",
    name: "Lattafa",
    description:
      "A casa que assina a maior parte da nossa curadoria árabe, do oriental especiado ao floral gourmand.",
  },
  {
    slug: "maison-alhambra",
    name: "Maison Alhambra",
    description: "Perfumaria árabe de inspiração francesa, entre o fresco e o oriental.",
  },
  {
    slug: "armaf",
    name: "Armaf",
    description: "Casa dos Emirados Árabes por trás da linha Club de Nuit.",
  },
  {
    slug: "al-wataniah",
    name: "Al Wataniah",
    description: "Casa árabe conhecida pela linha floral Sabah Al Ward.",
  },
  {
    slug: "asdaaf",
    name: "Asdaaf",
    description: "Casa de perfumaria árabe.",
  },
  {
    slug: "rayhaan",
    name: "Rayhaan",
    description: "Linha aromática aquática da Lattafa.",
  },
  {
    slug: "john-gustav",
    name: "John Gustav",
    description: "Perfumaria de nicho.",
  },
  {
    slug: "bath-body-works",
    name: "Bath & Body Works",
    description: "Marca americana de body care, revendida pela Lux Calyra.",
  },
  {
    slug: "victorias-secret",
    name: "Victoria's Secret",
    description: "Marca americana de body care, revendida pela Lux Calyra.",
  },
];

export function getBrandBySlug(slug: string | null): Brand | undefined {
  if (!slug) return undefined;
  return brands.find((b) => b.slug === slug);
}
