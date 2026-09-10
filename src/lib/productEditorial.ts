import type { Product } from "@/types/product";

function normalize(v: string): string {
  return v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Acorde real → adjetivo editorial. Só usado quando o produto já tem o acorde cadastrado. */
const ACCORD_ADJECTIVES: [string, string][] = [
  ["oud", "Magnético"],
  ["tabaco", "Intenso"],
  ["couro", "Intenso"],
  ["defumado", "Misterioso"],
  ["quente especiado", "Quente"],
  ["condimentado quente", "Quente"],
  ["picante quente", "Marcante"],
  ["ambar", "Quente"],
  ["baunilha", "Envolvente"],
  ["doce", "Doce"],
  ["caramelo", "Envolvente"],
  ["amendoa", "Envolvente"],
  ["amadeirado", "Profundo"],
  ["cedro", "Profundo"],
  ["patchouli", "Profundo"],
  ["citrico", "Fresco"],
  ["fresco", "Fresco"],
  ["aquatico", "Leve"],
  ["verde", "Natural"],
  ["floral branco", "Delicado"],
  ["floral", "Elegante"],
  ["rosa", "Elegante"],
  ["tuberosa", "Sedutor"],
  ["almiscarado", "Sutil"],
  ["empoado", "Sutil"],
  ["frutado", "Vibrante"],
  ["aromatico", "Sofisticado"],
  ["lavanda", "Sofisticado"],
];

export function getEditorialAdjectives(product: Product, max = 3): string[] {
  const accords = product.mainAccords ?? [];
  const adjectives: string[] = [];
  for (const accord of accords) {
    const key = normalize(accord);
    const match = ACCORD_ADJECTIVES.find(([k]) => key.includes(k) || k.includes(key));
    if (match && !adjectives.includes(match[1])) {
      adjectives.push(match[1]);
    }
    if (adjectives.length >= max) break;
  }
  return adjectives;
}

export function getEditorialTagline(product: Product): string | null {
  const adjectives = getEditorialAdjectives(product, 3).map((a) => a.toLowerCase());
  if (adjectives.length < 2) return null;

  const closing =
    product.gender === "masculino"
      ? "não passa despercebido"
      : product.gender === "feminino"
        ? "não passa despercebida"
        : "gosta de ter presença";

  const list =
    adjectives.length === 2
      ? adjectives.join(" e ")
      : `${adjectives.slice(0, -1).join(", ")} e ${adjectives[adjectives.length - 1]}`;

  return `Uma fragrância ${list} para quem ${closing}.`;
}

export function getBrandStatement(product: Product): string {
  const adjectives = getEditorialAdjectives(product, 3);
  if (adjectives.includes("Magnético") || adjectives.includes("Intenso")) {
    return "Uma fragrância que marca presença.";
  }
  if (adjectives.includes("Doce") || adjectives.includes("Envolvente")) {
    return "Uma fragrância que envolve.";
  }
  if (adjectives.includes("Elegante") || adjectives.includes("Delicado")) {
    return "Uma fragrância que sussurra elegância.";
  }
  return "Uma fragrância que deixa presença.";
}

export interface OlfactiveProfileEntry {
  label: string;
  value: number;
}

const PROFILE_BUCKETS: { label: string; keywords: string[] }[] = [
  { label: "Doçura", keywords: ["doce", "baunilha", "caramelo", "amendoa", "cacau"] },
  { label: "Frescor", keywords: ["citrico", "fresco", "aquatico", "verde", "marinho"] },
  { label: "Amadeirado", keywords: ["amadeirado", "cedro", "oud", "patchouli", "vetiver"] },
  { label: "Âmbar", keywords: ["ambar", "quente especiado", "condimentado quente", "defumado"] },
  { label: "Floral", keywords: ["floral", "rosa", "tuberosa", "jasmim", "iris"] },
  { label: "Almíscar", keywords: ["almiscarado", "empoado", "animalico"] },
];

export function computeOlfactiveProfile(product: Product): OlfactiveProfileEntry[] {
  const accords = (product.mainAccords ?? []).map(normalize);
  if (accords.length === 0) return [];

  const entries = PROFILE_BUCKETS.map((bucket) => {
    let score = 0;
    accords.forEach((accord, index) => {
      const weight = accords.length - index;
      if (bucket.keywords.some((k) => accord.includes(k) || k.includes(accord))) {
        score += weight;
      }
    });
    return { label: bucket.label, value: score };
  }).filter((e) => e.value > 0);

  if (entries.length === 0) return [];

  const max = Math.max(...entries.map((e) => e.value));
  return entries
    .map((e) => ({ label: e.label, value: Math.max(1, Math.round((e.value / max) * 10)) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}
