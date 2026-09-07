/**
 * Um evento = um arquivo de dados. As páginas montam a mesma estrutura
 * (banner, hero, benefícios, vídeo, público, agenda, hosts, CTA com
 * formulário) a partir daqui, então criar um evento novo é preencher isto.
 */

/** Título com uma parte destacada em laranja. */
export type Titulo = { antes?: string; destaque?: string; depois?: string };

export type Icone =
  | "Landmark" | "LayoutGrid" | "TrendingUp" | "Building2" | "FileSearch" | "HardHat"
  | "ClipboardCheck" | "CircleDollarSign" | "Layers" | "Maximize" | "Rocket" | "Scale"
  | "Timer" | "Wallet" | "Thermometer" | "House" | "Sofa" | "PencilRuler" | "Users"
  | "MessageCircleQuestion" | "Sparkles";

export type Item = { icone: Icone; titulo: string; descricao: string };

export type Host = {
  nome: string;
  cargo: string;
  /** Linha extra abaixo do cargo, ex.: "CEO YouCon" */
  titulo?: string;
  foto: string;
  descricao: string;
};

export type EventoConfig = {
  slug: string;
  /**
   * "v1" (padrão) é o template original de eventos; "v2" é o layout editorial
   * com hero assimétrico, VSL ao lado e blocos separados por fios.
   */
  layout?: "v1" | "v2";
  /** Identificador enviado ao webhook junto com a inscrição */
  webhookEvento: string;
  /** "laranja" = consultorias (CTA hero); "verde" = workshops (CTA verde) */
  tema: "laranja" | "verde";

  /**
   * ogImage: imagem pronta (1200×630). Sem ela, a página gera a sua a partir de
   * ogTitulo (o nome curto do evento, em caixa alta na arte) via opengraph-image.
   */
  meta: { titulo: string; descricao: string; ogImage?: string; ogTitulo?: string };

  banner: { antes: string; depois: string; dataIso: string; rotuloData: string };

  hero: {
    tag: string;
    titulo: Titulo;
    subtitulo: Array<{ texto: string; forte?: boolean; destaque?: boolean }>;
    imagemDesktop: string;
    imagemMobile: string;
    cta: string;
    rodape: string;
    provaSocial?: string;
  };

  /**
   * subtitulo aceita vários parágrafos; tituloItens é um segundo título, logo
   * acima dos cards, quando a copy separa a introdução da lista.
   */
  beneficios: { titulo: Titulo; subtitulo?: string | string[]; tituloItens?: string; itens: Item[] };

  /** Vídeo vertical 9:16; null mostra "Vídeo em breve". No v2 fica no hero. */
  video?: { src: string | null; poster: string | null; legenda: string };

  /** Faixa de dados logo abaixo do hero (v2): data, formato, preço. */
  destaques?: Array<{ valor: string; rotulo: string }>;
  /** Gráfico comparativo do workshop de incorporação */
  grafico?: boolean;

  publico?: { titulo: Titulo; subtitulo: string; itens: Item[] };

  /**
   * Animação guiada pelo scroll: locação dos pilares deita em perspectiva e a
   * estrutura metálica sobe sobre ela (dados em components/evento/estrutura).
   */
  estrutura?: { titulo: Titulo; subtitulo: string; fonte: string };

  /**
   * Galeria 3D em anel com projetos da YouCon: gira sozinha, acompanha a
   * rolagem e pode ser arrastada. As fotos moram no MinIO.
   */
  galeria?: {
    titulo: Titulo;
    paragrafos: string[];
    chamada: string;
    itens: Array<{ nome: string; legenda: string; foto: string; alt: string; posicao?: string }>;
    fecho: string[];
  };

  /** Bloco só de texto, entre a agenda e os hosts: "mais do que assistir". */
  participacao?: { titulo: Titulo; paragrafos: string[] };

  agenda: {
    titulo: Titulo;
    subtitulo: string;
    estilo: "timeline" | "lista";
    itens: Array<{ titulo: string; descricao?: string }>;
    cta: string;
  };

  hosts: { titulo: Titulo; subtitulo?: string; itens: Host[] };

  cta: { titulo: Titulo; descricao: string; data: string; horario: string; local: string };

  formulario: { titulo: string; redirect: string };
};
