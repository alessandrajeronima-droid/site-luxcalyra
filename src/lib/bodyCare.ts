import type { Category, Product } from "@/types/product";

/** Rótulo de formato/volume exibido no herói e nos cards de produto, de acordo com a categoria real. */
export function getFormatLabel(product: Product): string {
  if (product.category === "body-splash") return `Body Splash / Fragrance Mist · ${product.volumeMl}ml`;
  if (product.category === "creme-corporal") {
    const unit = product.description?.includes(`${product.volumeMl}g`) ? "g" : "ml";
    return `Creme Corporal · ${product.volumeMl}${unit}`;
  }
  return `Eau de Parfum · ${product.volumeMl}ml`;
}

/** Rótulo curto para CTAs (hover de card, etc.), de acordo com a categoria real. */
export function getProductCtaLabel(category: Category): string {
  if (category === "body-splash") return "Ver Body Splash";
  if (category === "creme-corporal") return "Ver Creme";
  return "Ver Perfume";
}

/**
 * Encontra o par "ritual" real de um produto de linha corpo: mesma marca e mesma fragrância
 * (nome idêntico), na categoria complementar (body-splash <-> creme-corporal).
 * Nunca inventa combinações — só retorna quando o par existe de fato no catálogo.
 */
export function getRitualPair(product: Product, allProducts: Product[]): Product | undefined {
  const otherCategory: Category | null =
    product.category === "body-splash"
      ? "creme-corporal"
      : product.category === "creme-corporal"
        ? "body-splash"
        : null;
  if (!otherCategory) return undefined;

  return allProducts.find(
    (p) =>
      p.category === otherCategory &&
      p.brandSlug === product.brandSlug &&
      p.name.toLowerCase() === product.name.toLowerCase()
  );
}

/** Todos os pares de ritual (splash + creme da mesma fragrância) disponíveis no catálogo. */
export function listRitualPairs(allProducts: Product[]): { splash: Product; creme: Product }[] {
  const splashes = allProducts.filter((p) => p.category === "body-splash");
  const pairs: { splash: Product; creme: Product }[] = [];
  for (const splash of splashes) {
    const creme = getRitualPair(splash, allProducts);
    if (creme) pairs.push({ splash, creme });
  }
  return pairs;
}

export interface SensationOption {
  label: string;
  image: string;
  count: number;
}

/**
 * Deriva as sensações/famílias exploráveis a partir dos atributos reais já cadastrados
 * (sensations/mainAccords) dos produtos da categoria informada. Nunca cria rótulos que não
 * existam de fato em algum produto.
 */
export function listSensations(products: Product[]): SensationOption[] {
  const map = new Map<string, { image: string; count: number }>();
  for (const product of products) {
    const labels = product.sensations ?? [];
    for (const label of labels) {
      const existing = map.get(label);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(label, { image: product.mainImage, count: 1 });
      }
    }
  }
  return Array.from(map.entries())
    .map(([label, v]) => ({ label, image: v.image, count: v.count }))
    .sort((a, b) => b.count - a.count);
}

export function brandProductCount(products: Product[], brandSlug: string, category: Category): number {
  return products.filter((p) => p.brandSlug === brandSlug && p.category === category).length;
}
