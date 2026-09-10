import type { ContentKey } from "@/lib/data/content";

export interface ContentFieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "image";
  hint?: string;
}

export interface ContentGroupDef {
  key: ContentKey;
  label: string;
  group: string;
  fields: ContentFieldDef[];
}

export const CONTENT_GROUPS: ContentGroupDef[] = [
  {
    key: "home_hero",
    label: "Home — Hero Principal",
    group: "Home",
    fields: [
      { name: "eyebrow", label: "Selo (acima do título)", type: "text" },
      {
        name: "title",
        label: "Título",
        type: "textarea",
        hint: "Use uma quebra de linha para separar a 1ª e a 2ª linha do título.",
      },
      { name: "subtitle", label: "Frase de apoio", type: "textarea" },
      { name: "ctaLabel", label: "Botão 1 — texto", type: "text" },
      { name: "ctaHref", label: "Botão 1 — link", type: "text" },
      { name: "ctaLabel2", label: "Botão 2 — texto", type: "text" },
      { name: "ctaHref2", label: "Botão 2 — link", type: "text" },
    ],
  },
  {
    key: "home_brand_statement",
    label: "Home — Frase de Marca",
    group: "Home",
    fields: [
      { name: "title", label: "Frase", type: "text" },
      { name: "marquee", label: "Texto da faixa animada", type: "text" },
    ],
  },
  {
    key: "home_campaign_1",
    label: "Home — Banner de Campanha 1",
    group: "Home",
    fields: [
      { name: "eyebrow", label: "Selo", type: "text" },
      { name: "title", label: "Título", type: "text" },
      { name: "text", label: "Texto", type: "textarea" },
      { name: "ctaLabel", label: "Botão — texto", type: "text" },
      { name: "ctaHref", label: "Botão — link", type: "text" },
      { name: "backgroundImage", label: "Imagem de fundo", type: "image" },
    ],
  },
  {
    key: "home_campaign_2",
    label: "Home — Banner de Campanha 2 (final)",
    group: "Home",
    fields: [
      { name: "eyebrow", label: "Selo", type: "text" },
      { name: "title", label: "Título", type: "text" },
      { name: "text", label: "Texto", type: "textarea" },
      { name: "ctaLabel", label: "Botão — texto", type: "text" },
      { name: "ctaHref", label: "Botão — link", type: "text" },
      { name: "backgroundImage", label: "Imagem de fundo", type: "image" },
    ],
  },
  {
    key: "body_splash_hero",
    label: "Body Splash — Hero",
    group: "Categorias",
    fields: [
      { name: "eyebrow", label: "Selo", type: "text" },
      { name: "title", label: "Título", type: "text" },
      { name: "text", label: "Texto de apoio", type: "textarea" },
      { name: "ctaLabel", label: "Botão — texto", type: "text" },
      { name: "image", label: "Imagem de fundo", type: "image" },
    ],
  },
  {
    key: "cremes_corporais_hero",
    label: "Cremes Corporais — Hero",
    group: "Categorias",
    fields: [
      { name: "eyebrow", label: "Selo", type: "text" },
      { name: "title", label: "Título", type: "text" },
      { name: "text", label: "Texto de apoio", type: "textarea" },
      { name: "ctaLabel", label: "Botão — texto", type: "text" },
      { name: "image", label: "Imagem de fundo", type: "image" },
    ],
  },
  {
    key: "page_sobre",
    label: "Sobre a Lux Calyra",
    group: "Páginas Institucionais",
    fields: [
      {
        name: "body",
        label: "Texto",
        type: "textarea",
        hint: "Separe parágrafos com uma linha em branco.",
      },
    ],
  },
  {
    key: "page_contato",
    label: "Contato",
    group: "Páginas Institucionais",
    fields: [
      { name: "whatsappText", label: "Descrição do card WhatsApp", type: "textarea" },
      { name: "instagramText", label: "Descrição do card Instagram", type: "textarea" },
    ],
  },
  {
    key: "page_politica_privacidade",
    label: "Política de Privacidade",
    group: "Páginas Institucionais",
    fields: [
      {
        name: "body",
        label: "Texto",
        type: "textarea",
        hint: "Use \"## Título da seção\" para criar um novo título. Separe parágrafos com uma linha em branco.",
      },
    ],
  },
  {
    key: "page_termos",
    label: "Termos de Uso",
    group: "Páginas Institucionais",
    fields: [
      {
        name: "body",
        label: "Texto",
        type: "textarea",
        hint: "Use \"## Título da seção\" para criar um novo título. Separe parágrafos com uma linha em branco.",
      },
    ],
  },
  {
    key: "page_trocas_devolucoes",
    label: "Trocas e Devoluções",
    group: "Páginas Institucionais",
    fields: [
      {
        name: "body",
        label: "Texto",
        type: "textarea",
        hint: "Use \"## Título da seção\" para criar um novo título. Separe parágrafos com uma linha em branco.",
      },
    ],
  },
  {
    key: "page_entrega",
    label: "Entrega",
    group: "Páginas Institucionais",
    fields: [
      {
        name: "body",
        label: "Texto",
        type: "textarea",
        hint: "Use \"## Título da seção\" para criar um novo título. Separe parágrafos com uma linha em branco.",
      },
    ],
  },
];

export function getContentGroup(key: string): ContentGroupDef | undefined {
  return CONTENT_GROUPS.find((g) => g.key === key);
}
