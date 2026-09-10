import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Conteúdo editável do site (textos/imagens que o admin pode trocar sem mexer em código),
 * guardado na tabela `site_content` (key -> data jsonb). Cada chave tem um formato próprio,
 * documentado nos tipos abaixo. Se a chave ainda não existir no banco, cai no `fallback`
 * (o texto/imagem atual do código), então nada quebra antes do admin editar pela primeira vez.
 */

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  ctaLabel2?: string;
  ctaHref2?: string;
}

export interface CampaignContent {
  eyebrow?: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage?: string;
}

export interface BrandStatementContent {
  title: string;
  marquee: string;
}

export interface CategoryHeroContent {
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel: string;
  image: string;
}

export interface PageBodyContent {
  body: string;
}

export interface ChannelsContent {
  whatsappText: string;
  instagramText: string;
}

const getRaw = cache(async (key: string): Promise<Record<string, unknown> | undefined> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("site_content").select("data").eq("key", key).maybeSingle();
  return (data?.data as Record<string, unknown> | undefined) ?? undefined;
});

async function getTyped<T>(key: string, fallback: T): Promise<T> {
  const data = await getRaw(key);
  if (!data) return fallback;
  return { ...fallback, ...data };
}

export const CONTENT_DEFAULTS = {
  home_hero: {
    eyebrow: "Perfumaria Árabe",
    title: "Descubra o perfume\nque fala por você.",
    subtitle: "Uma curadoria de fragrâncias selecionadas para transformar presença em assinatura.",
    ctaLabel: "Explorar Perfumes",
    ctaHref: "/perfumes",
    ctaLabel2: "Encontrar Meu Perfume",
    ctaHref2: "/descubra-seu-perfume",
  } satisfies HeroContent,
  home_brand_statement: {
    title: "Seu perfume é parte da sua presença.",
    marquee: "Arabian Perfumery · Curated in Brazil",
  } satisfies BrandStatementContent,
  home_campaign_1: {
    eyebrow: "Campanha",
    title: "O poder de deixar uma marca.",
    text: "Perfumes árabes selecionados para quem não quer passar despercebida.",
    ctaLabel: "Descobrir",
    ctaHref: "/perfumes",
    backgroundImage: "/brand/icon-3d-material-reference.png",
  } satisfies CampaignContent,
  home_campaign_2: {
    title: "Seu perfume. Sua assinatura.",
    text: "Descubra fragrâncias que fazem parte da sua história.",
    ctaLabel: "Explorar a Lux Calyra",
    ctaHref: "/perfumes",
  } satisfies CampaignContent,
  body_splash_hero: {
    eyebrow: "Body Splash",
    title: "Leve sua fragrância para além do perfume.",
    text: "Fragrâncias leves para acompanhar todos os momentos.",
    ctaLabel: "Explorar Body Splash →",
    image: "/products/body-splash/victorias-secret-bare-vanilla-mist.jpg",
  } satisfies CategoryHeroContent,
  cremes_corporais_hero: {
    eyebrow: "Body Care",
    title: "Seu ritual começa na pele.",
    text: "Texturas, fragrâncias e cuidado para transformar o cotidiano em um momento só seu.",
    ctaLabel: "Explorar Cremes →",
    image: "/products/creme-corporal/bath-body-works-a-thousand-wishes-creme.jpg",
  } satisfies CategoryHeroContent,
  page_sobre: {
    body:
      "A Lux Calyra nasceu de uma convicção simples: perfume é presença, e presença merece curadoria.\n\n" +
      "Selecionamos perfumes árabes de casas como Lattafa, Maison Alhambra, Armaf e Al Wataniah — fragrâncias intensas, autênticas e de excelente relação entre qualidade e preço — ao lado de linhas de body care internacionais como Victoria's Secret e Bath & Body Works. Cada produto no nosso catálogo passa por uma escolha deliberada, nunca por acaso.",
  } satisfies PageBodyContent,
  page_politica_privacidade: {
    body:
      "## Quais dados coletamos\nColetamos os dados que você nos fornece diretamente ao entrar em contato ou finalizar uma compra: nome, telefone, e-mail, endereço de entrega e CPF, quando necessário para emissão de nota fiscal.\n\nTambém podemos coletar dados de navegação básicos (páginas visitadas, produtos favoritados) para melhorar sua experiência no site, armazenados localmente no seu navegador.\n\n" +
      "## Como usamos seus dados\nUsamos seus dados exclusivamente para processar pedidos, calcular frete, emitir nota fiscal, prestar atendimento via WhatsApp e informar sobre o andamento da sua compra.\n\nNão vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing sem o seu consentimento explícito.\n\n" +
      "## Cookies e armazenamento local\nUtilizamos armazenamento local do navegador para lembrar os itens da sua sacola e da sua lista de favoritos. Esses dados ficam salvos apenas no seu dispositivo e não são enviados aos nossos servidores.\n\n" +
      "## Seus direitos (LGPD)\nNos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a solicitar a qualquer momento a confirmação, o acesso, a correção ou a exclusão dos seus dados pessoais mantidos por nós.\n\nPara exercer qualquer um desses direitos, entre em contato pelo WhatsApp da Lux Calyra.\n\n" +
      "## Alterações desta política\nEsta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou na legislação aplicável. Recomendamos revisitar esta página de tempos em tempos.",
  } satisfies PageBodyContent,
  page_termos: {
    body:
      "## Sobre a Lux Calyra\nA Lux Calyra é uma curadoria brasileira de perfumaria árabe e produtos de body care, incluindo revenda autorizada de linhas de terceiros. Ao navegar e comprar neste site, você concorda com os termos descritos abaixo.\n\n" +
      "## Produtos e disponibilidade\nTodos os produtos anunciados refletem o catálogo real disponível para revenda. Cores, tons e detalhes de embalagem podem variar levemente em relação às fotos, conforme lote e fornecedor.\n\nA disponibilidade de estoque é informada no momento da consulta e pode mudar sem aviso prévio, especialmente para produtos de reposição limitada.\n\n" +
      "## Preços e pagamento\nOs preços exibidos estão em reais (R$) e podem ser reajustados sem aviso prévio, respeitando o valor vigente no momento da confirmação do pedido.\n\nO fechamento do pedido é feito por atendimento via WhatsApp, onde a forma de pagamento e o prazo de entrega são confirmados com uma consultora.\n\n" +
      "## Uso do site\nEste site e seu conteúdo (textos, imagens, identidade visual) pertencem à Lux Calyra ou são utilizados com autorização. É vedada a reprodução do conteúdo sem autorização prévia.\n\n" +
      "## Dúvidas\nEm caso de dúvidas sobre estes termos, entre em contato pelo WhatsApp da Lux Calyra antes de finalizar sua compra.",
  } satisfies PageBodyContent,
  page_trocas_devolucoes: {
    body:
      "## Direito de arrependimento\nConforme o Código de Defesa do Consumidor (Art. 49), você tem até 7 dias corridos após o recebimento do produto para desistir da compra, sem necessidade de justificativa, desde que o produto esteja lacrado, sem uso e na embalagem original.\n\n" +
      "## Produto com defeito\nSe você receber um produto com defeito de fabricação ou avaria de transporte, entre em contato o quanto antes pelo WhatsApp, informando o número do pedido e fotos do problema, para que possamos avaliar a troca.\n\n" +
      "## Como solicitar\nTodas as trocas e devoluções são conduzidas por atendimento pessoal via WhatsApp — é lá que confirmamos os dados do pedido e combinamos o envio de volta do produto.\n\n" +
      "## Itens não elegíveis\nPor questão de higiene, produtos abertos ou com o lacre violado não são elegíveis para troca ou devolução, exceto em caso de defeito comprovado.",
  } satisfies PageBodyContent,
  page_entrega: {
    body:
      "## Cálculo de frete\nO valor do frete varia de acordo com o seu CEP e o peso/volume dos produtos escolhidos. Ele é calculado no fechamento do pedido, junto com a consultora, via WhatsApp.\n\n" +
      "## Prazo de entrega\nO prazo de entrega é informado no momento da confirmação do pedido, pois depende da transportadora disponível para a sua região e da disponibilidade de estoque do produto escolhido.\n\n" +
      "## Acompanhamento do pedido\nAssim que o seu pedido for despachado, você recebe o código de rastreio diretamente pelo WhatsApp para acompanhar cada etapa da entrega.\n\n" +
      "## Problemas na entrega\nSe o seu pedido atrasar além do prazo informado ou chegar com avaria, entre em contato pelo WhatsApp o quanto antes para que possamos resolver junto com a transportadora.",
  } satisfies PageBodyContent,
  page_contato: {
    whatsappText: "Atendimento direto para dúvidas, pedidos, trocas e devoluções.",
    instagramText: "Acompanhe novidades, bastidores e lançamentos da curadoria.",
  } satisfies ChannelsContent,
} as const;

export type ContentKey = keyof typeof CONTENT_DEFAULTS;

export async function getContent<K extends ContentKey>(
  key: K
): Promise<(typeof CONTENT_DEFAULTS)[K]> {
  return getTyped(key, CONTENT_DEFAULTS[key]);
}
