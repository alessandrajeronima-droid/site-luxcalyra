import type { Gender, Product } from "@/types/product";

export interface FinderOption {
  label: string;
  /** acordes/família (minúsculo, sem acento normalizado) associados a essa escolha */
  accordKeywords?: string[];
  /** ocasiões (Quando Usar) associadas a essa escolha, quando aplicável */
  occasionKeywords?: string[];
  /** valor de gênero real do catálogo, usado só na pergunta 1 */
  genderValue?: Gender;
  image?: string;
  subtext?: string;
}

export interface FinderQuestion {
  id: string;
  step: string;
  title: string;
  options: FinderOption[];
}

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * As 4 perguntas oficiais do Fragrance Finder, nesta ordem exata.
 * Gênero é filtro rígido (bate com product.gender real); as demais são
 * pontuação por sobreposição de palavra-chave com os acordes/ocasiões reais.
 */
export const FINDER_QUESTIONS: FinderQuestion[] = [
  {
    id: "genero",
    step: "01 / 04",
    title: "Você está procurando um perfume feminino ou masculino?",
    options: [
      {
        label: "Feminino",
        genderValue: "feminino",
        image: "/products/feminino/tharwah-gold.png",
        subtext: "Fragrâncias para ela",
      },
      {
        label: "Masculino",
        genderValue: "masculino",
        image: "/products/masculino/khamrah.png",
        subtext: "Fragrâncias para ele",
      },
    ],
  },
  {
    id: "sensacao",
    step: "02 / 04",
    title: "Qual sensação você procura?",
    options: [
      {
        label: "Doce",
        accordKeywords: ["doce", "baunilha", "caramelo", "amêndoa"],
        image: "/products/feminino/yara.png",
        subtext: "Quente, envolvente e gourmand",
      },
      {
        label: "Fresca",
        accordKeywords: ["cítrico", "fresco", "aquático", "verde"],
        image: "/products/masculino/pacific-aura.png",
        subtext: "Leve, luminosa e refrescante",
      },
      {
        label: "Floral",
        accordKeywords: ["floral", "floral branco", "rosa", "tuberosa"],
        image: "/products/feminino/emaan.png",
        subtext: "Delicada, feminina e elegante",
      },
      {
        label: "Amadeirada",
        accordKeywords: ["amadeirado", "oud", "cedro", "patchouli"],
        image: "/products/masculino/al-noble-wazeer.png",
        subtext: "Profunda, sofisticada e estruturada",
      },
      {
        label: "Cremosa",
        accordKeywords: ["baunilha", "amêndoa", "lactônico", "empoado"],
        image: "/products/feminino/badee-al-oud-pink.png",
        subtext: "Macia, confortável e envolvente",
      },
      {
        label: "Intensa",
        accordKeywords: ["oud", "âmbar", "quente especiado", "defumado"],
        image: "/products/masculino/asad-elixir.png",
        subtext: "Poderosa e marcante",
      },
      {
        label: "Limpa",
        accordKeywords: ["almiscarado", "aquático", "cítrico", "fresco"],
        image: "/products/feminino/ameerati.png",
        subtext: "Fresca, confortável e sofisticada",
      },
      {
        label: "Envolvente",
        accordKeywords: ["âmbar", "baunilha", "quente especiado"],
        image: "/products/feminino/tharwah-gold.png",
        subtext: "Sensual, quente e magnética",
      },
    ],
  },
  {
    id: "quando",
    step: "03 / 04",
    title: "Quando você vai usar?",
    options: [
      { label: "Dia", occasionKeywords: ["Dia", "Todos os dias"], subtext: "Luminoso · leve · cotidiano" },
      {
        label: "Trabalho",
        occasionKeywords: ["Trabalho", "Todos os dias"],
        subtext: "Elegante · refinado · discreto",
      },
      { label: "Encontro", occasionKeywords: ["Encontro"], subtext: "Sensual · envolvente · memorável" },
      { label: "Noite", occasionKeywords: ["Noite"], subtext: "Intenso · sofisticado · marcante" },
      { label: "Eventos", occasionKeywords: ["Eventos"], subtext: "Presença · personalidade · impacto" },
      {
        label: "Todos os dias",
        occasionKeywords: ["Todos os dias", "Dia"],
        subtext: "Versátil · confortável · assinatura",
      },
    ],
  },
  {
    id: "intensidade",
    step: "04 / 04",
    title: "Qual intensidade?",
    options: [
      {
        label: "Suave",
        accordKeywords: ["cítrico", "fresco", "aquático", "floral branco", "verde"],
      },
      { label: "Moderada", accordKeywords: ["floral", "doce", "frutado"] },
      { label: "Marcante", accordKeywords: ["amadeirado", "especiado", "âmbar"] },
      {
        label: "Muito intensa",
        accordKeywords: ["oud", "defumado", "couro", "quente especiado"],
      },
    ],
  },
];

/**
 * Mapeamento usado só pela seção "Encontre Sua Essência" da home/marcas
 * (Marcante, Elegante, Sensual, Delicada...), independente do Fragrance Finder.
 */
const ESSENCE_OPTIONS: FinderOption[] = [
  { label: "Elegante", accordKeywords: ["floral", "floral branco", "cítrico", "chypre"] },
  { label: "Sensual", accordKeywords: ["oud", "âmbar", "amêndoa", "baunilha", "almiscarado"] },
  { label: "Poderosa", accordKeywords: ["amadeirado", "oud", "couro", "quente especiado"] },
  { label: "Misteriosa", accordKeywords: ["oud", "defumado", "âmbar", "condimentado quente"] },
  { label: "Delicada", accordKeywords: ["floral branco", "empoado", "cítrico", "fresco"] },
  { label: "Marcante", accordKeywords: ["quente especiado", "oud", "doce", "âmbar"] },
];

export type FinderAnswers = Record<string, string>;

export interface FinderMatch {
  product: Product;
  score: number;
  compatibility: number;
}

function getProductAccordPool(product: Product): string[] {
  return [
    ...(product.sensations ?? []),
    ...(product.mainAccords ?? []),
    ...(product.olfactiveFamily ? [product.olfactiveFamily] : []),
  ]
    .map(normalize)
    .filter(Boolean);
}

export function computeMatches(products: Product[], answers: FinderAnswers): FinderMatch[] {
  const genderAnswer = FINDER_QUESTIONS[0].options.find(
    (o) => o.label === answers.genero
  )?.genderValue;

  const scoringQuestions = FINDER_QUESTIONS.slice(1); // sensacao, quando, intensidade
  const selectedOptions: FinderOption[] = scoringQuestions
    .map((q) => q.options.find((o) => o.label === answers[q.id]))
    .filter((o): o is FinderOption => Boolean(o));

  const accordTargets = new Set(
    selectedOptions.flatMap((o) => o.accordKeywords ?? []).map(normalize)
  );
  const occasionTargets = new Set(
    selectedOptions.flatMap((o) => o.occasionKeywords ?? []).map(normalize)
  );

  const maxPossible = accordTargets.size + occasionTargets.size * 2 || 1;

  const eligible = products.filter((p) => {
    if (p.category !== "perfume") return false;
    if (!genderAnswer) return true;
    return p.gender === genderAnswer || p.gender === "unissex";
  });

  const matches: FinderMatch[] = eligible.map((product) => {
    const productAccords = new Set(getProductAccordPool(product));
    const productOccasions = new Set((product.occasions ?? []).map(normalize));

    let score = 0;
    for (const keyword of accordTargets) {
      if (!keyword) continue;
      for (const accord of productAccords) {
        if (accord.includes(keyword) || keyword.includes(accord)) {
          score += 1;
          break;
        }
      }
    }
    for (const keyword of occasionTargets) {
      if (productOccasions.has(keyword)) {
        score += 2;
      }
    }

    const compatibility = Math.min(99, Math.round((score / maxPossible) * 100));
    return { product, score, compatibility };
  });

  return matches.sort((a, b) => b.score - a.score);
}

/** Frase "Por que ele combina com você", só com o que foi respondido de verdade. */
export function buildWhyItMatches(answers: FinderAnswers): string {
  const genero = answers.genero ? normalize(answers.genero) : "";
  const sensacao = answers.sensacao?.toLowerCase();
  const quando = answers.quando?.toLowerCase();
  const intensidade = answers.intensidade?.toLowerCase();

  const parts: string[] = [];
  if (genero) parts.push(`uma fragrância ${genero}`);
  if (sensacao) parts.push(sensacao);
  if (quando) parts.push(`para ${quando}`);
  if (intensidade) parts.push(`com intensidade ${intensidade}`);

  if (parts.length === 0) {
    return "Selecionamos uma fragrância a partir do seu perfil de descoberta.";
  }

  return `Você procura ${parts.join(", ")}. Por isso, selecionamos uma fragrância que se aproxima desse perfil.`;
}

/**
 * Filtra produtos por "essência" (Marcante, Elegante, Sensual, Delicada...),
 * usado na seção "Encontre Sua Essência" da home/marcas — independente do
 * Fragrance Finder.
 */
export function filterByEssence(products: Product[], essenceLabel: string): Product[] {
  const option = ESSENCE_OPTIONS.find((o) => normalize(o.label) === normalize(essenceLabel));
  if (!option?.accordKeywords?.length) return [];

  const keywords = option.accordKeywords.map(normalize);

  return products.filter((p) => {
    if (p.category !== "perfume") return false;
    const productAccords = getProductAccordPool(p);
    return keywords.some((keyword) =>
      productAccords.some((accord) => accord.includes(keyword) || keyword.includes(accord))
    );
  });
}
