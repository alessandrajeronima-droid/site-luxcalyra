export type Gender = "masculino" | "feminino" | "unissex";

export type Category = "perfume" | "body-splash" | "creme-corporal" | "decant";

export type OlfactiveNoteType = "topo" | "coracao" | "base";

export interface OlfactiveDna {
  floral?: number;
  doce?: number;
  amadeirado?: number;
  ambarado?: number;
  fresco?: number;
  especiado?: number;
}

export interface RelatedProductRef {
  slug: string;
  relation: "similar_vibe" | "you_may_also_like";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandSlug: string | null;
  gender: Gender;
  category: Category;
  volumeMl: number;
  price: number;
  salePrice?: number;
  shortDescription?: string;
  description?: string;
  mainImage: string;
  gallery?: string[];
  olfactiveFamily?: string;
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  mainAccords?: string[];
  /** Curadoria manual (admin) para o Fragrance Finder: Doce, Fresca, Floral, Amadeirada,
   * Cremosa, Intensa, Limpa, Envolvente. Quando ausente, o finder deriva dos acordes reais. */
  sensations?: string[];
  occasions?: string[];
  dna?: OlfactiveDna;
  intensity?: "suave" | "moderada" | "marcante" | "muito intensa";
  longevity?: "curta" | "moderada" | "longa" | "muito longa";
  projection?: "intima" | "moderada" | "forte" | "muito forte";
  inspiredBy?: string;
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isSpecialEdit?: boolean;
  isDecant?: boolean;
  relatedProducts?: RelatedProductRef[];
  /** Quantidade real em estoque. `inStock` é derivado disto (> 0). Ausente apenas no seed legado. */
  stockQuantity?: number;
  inStock: boolean;
  needsAdminReview: boolean;
}

export interface Brand {
  slug: string;
  name: string;
  description?: string;
  logoUrl?: string;
}
