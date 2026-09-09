import { midia } from "@/lib/midia";
import type { EventoConfig } from "./tipos";

/**
 * Encontro "Do Projeto à Venda", 08/10/2026 às 20h, só com o Thiago. Reaproveita
 * o slug /incorporacao do workshop de 07/2026 (config antiga em arquivo/). Copy de
 * 09/09/2026. Mesma estrutura do evento de tendências (layout v2).
 *
 * PENDENTE (Gui): fotos do hero e da galeria e o link do grupo do WhatsApp.
 * Até chegarem, as imagens abaixo são placeholders de outros eventos no MinIO.
 */
const PLACEHOLDER_HERO_DESKTOP = midia("img/inc-hero-desktop.jpg");
const PLACEHOLDER_HERO_MOBILE = midia("img/inc-hero-mobile.jpg");

export const projetoAVenda: EventoConfig = {
  slug: "incorporacao",
  layout: "v2",
  webhookEvento: "incorporacao",
  tema: "verde",
  meta: {
    titulo: "Do Projeto à Venda | YouCon",
    descricao:
      "Encontro online e gratuito com o arquiteto Thiago Cardim: como decisões de implantação, plantas, tipologias e fachada definem o produto imobiliário e o potencial comercial do empreendimento. 8 de outubro às 20h.",
    ogTitulo: "Do Projeto à Venda",
  },
  banner: {
    antes: "Encontro gratuito e ao vivo em:",
    depois: "O encontro já começou!",
    dataIso: "2026-10-08T20:00:00-03:00",
    rotuloData: "08/10/2026 às 20h",
  },
  hero: {
    tag: "Convite exclusivo YouCon",
    titulo: { antes: "Descubra como decisões tomadas no projeto podem aumentar o ", destaque: "potencial comercial", depois: " do seu empreendimento." },
    subtitulo: [
      { texto: "Participe de um encontro online, gratuito e ao vivo com " },
      { texto: "Thiago Cardim", forte: true },
      { texto: " para entender como arquitetura, engenharia, custo, produto e mercado precisam conversar desde o início para criar empreendimentos mais " },
      { texto: "eficientes, valorizados e preparados para vender", destaque: true },
      { texto: "." },
    ],
    imagemDesktop: PLACEHOLDER_HERO_DESKTOP,
    imagemMobile: PLACEHOLDER_HERO_MOBILE,
    cta: "Quero participar gratuitamente",
    rodape: "Vagas limitadas",
  },
  destaques: [
    { valor: "08.10", rotulo: "quinta-feira, às 20h" },
    { valor: "Online", rotulo: "ao vivo, com dúvidas respondidas" },
    { valor: "Gratuito", rotulo: "vagas limitadas" },
  ],
  beneficios: {
    titulo: { antes: "Seu empreendimento começa a vender ", destaque: "antes do lançamento", depois: "." },
    subtitulo: [
      "Antes da campanha. Antes do estande. Antes da tabela de preços.",
      "Grande parte do valor percebido, do posicionamento e do potencial comercial de um empreendimento já foi definida na fase de projeto.",
      "Implantação, plantas, tipologias, fachada, áreas comuns, estrutura e aproveitamento do terreno não são apenas decisões técnicas. Elas definem o produto que chegará ao mercado.",
      "Neste encontro, Thiago Cardim vai mostrar como analisar essas escolhas de forma integrada — conectando arquitetura, engenharia, custo e mercado.",
    ],
    tituloItens: "Decisões que definem o produto",
    itens: [
      { icone: "Landmark", titulo: "Implantação e aproveitamento", descricao: "Como o empreendimento se posiciona no terreno e o quanto isso influencia eficiência, qualidade e resultado." },
      { icone: "LayoutGrid", titulo: "Plantas e tipologias", descricao: "A distribuição das unidades define para quem o produto foi feito e como o mercado vai recebê-lo." },
      { icone: "Building2", titulo: "Fachada e áreas comuns", descricao: "Os elementos que mais pesam na percepção de valor e no posicionamento do empreendimento." },
    ],
  },
  // A VSL ainda não existe: até o arquivo subir ao MinIO, o hero mostra "Vídeo em breve"
  video: {
    src: null,
    poster: null,
    legenda: "O que você vai ver neste encontro",
  },
  galeria: {
    titulo: { antes: "Projetos reais. Decisões reais. ", destaque: "Impactos reais", depois: "." },
    paragrafos: [
      "Durante o encontro, você verá como diferentes decisões de projeto podem transformar o produto imobiliário antes de ele chegar ao mercado.",
      "Mais do que referências genéricas, serão situações reais para mostrar como arquitetura e engenharia podem contribuir para criar empreendimentos mais competitivos, desejáveis e coerentes com seu público.",
    ],
    chamada: "Explore alguns dos empreendimentos desenvolvidos pela YouCon:",
    // Placeholders: trocar pelas fotos dos empreendimentos (ideal 3:4, ~900×1200) no MinIO
    itens: [
      { nome: "Empreendimento YouCon 01", legenda: "Implantação", foto: midia("img/inc-hero-desktop.jpg"), alt: "Implantação de empreendimento no terreno" },
      { nome: "Empreendimento YouCon 02", legenda: "Volumetria", foto: midia("img/metalica-hero-desktop.jpg"), alt: "Volumetria de empreendimento imobiliário" },
      { nome: "Empreendimento YouCon 03", legenda: "Plantas", foto: midia("img/bg-desktop.jpg"), alt: "Estudo de plantas e tipologias" },
      { nome: "Empreendimento YouCon 04", legenda: "Fachadas", foto: midia("img/metalica-hero-mobile.jpg"), alt: "Fachada de empreendimento imobiliário" },
      { nome: "Empreendimento YouCon 05", legenda: "Áreas comuns", foto: midia("img/bg-mobile.jpg"), alt: "Áreas comuns de empreendimento" },
      { nome: "Empreendimento YouCon 06", legenda: "Soluções estruturais", foto: midia("img/inc-hero-mobile.jpg"), alt: "Solução estrutural de empreendimento" },
    ],
    fecho: ["Implantação, volumetria, plantas, fachadas.", "Decisões de projeto que chegam ao mercado como produto."],
  },
  publico: {
    titulo: { antes: "Para quem desenvolve produtos imobiliários e quer tomar ", destaque: "decisões mais estratégicas", depois: " desde o início." },
    subtitulo: "O encontro foi pensado para quem participa das escolhas que definem o empreendimento antes de ele chegar ao mercado.",
    // PENDENTE (Gui): foto de um empreendimento YouCon para o fundo desta seção
    imagemFundo: midia("img/inc-hero-desktop.jpg"),
    cta: "Quero participar gratuitamente",
    itens: [
      { icone: "Building2", titulo: "Incorporadores", descricao: "Que estão avaliando um terreno, iniciando um novo empreendimento ou buscando desenvolver produtos mais competitivos." },
      { icone: "HardHat", titulo: "Construtores", descricao: "Que precisam conectar viabilidade, execução, custo e qualidade do produto desde a fase de projeto." },
      { icone: "Layers", titulo: "Loteadores e desenvolvedores", descricao: "Que querem entender como escolhas de implantação, tipologia e produto influenciam a percepção de valor e o potencial comercial." },
      { icone: "TrendingUp", titulo: "Investidores", descricao: "Que desejam analisar empreendimentos com uma visão mais completa: terreno, projeto, produto e mercado." },
    ],
  },
  agenda: {
    titulo: { antes: "O que você vai ver ", destaque: "no encontro", depois: "." },
    subtitulo: "Uma conversa prática sobre como arquitetura, engenharia, custo e mercado se encontram na fase de projeto — com empreendimentos reais desenvolvidos pela YouCon.",
    estilo: "timeline",
    itens: [
      { titulo: "Projeto pensado como produto imobiliário", descricao: "Por que desenvolver um empreendimento vai muito além de distribuir áreas dentro de um terreno. Você vai entender como projeto, público, posicionamento e estratégia comercial precisam caminhar juntos." },
      { titulo: "Aproveitamento x potencial comercial", descricao: "Mais área construída nem sempre significa mais resultado. Vamos mostrar como identificar oportunidades no terreno sem comprometer qualidade, eficiência ou atratividade do produto." },
      { titulo: "Decisões que aumentam a percepção de valor", descricao: "Fachada, implantação, planta, tipologia e áreas comuns podem mudar a forma como o mercado percebe um empreendimento — e o quanto ele está disposto a pagar por ele." },
      { titulo: "Arquitetura, engenharia e custo desde o início", descricao: "Um bom produto precisa funcionar no projeto, na obra e no mercado. Entenda por que decisões técnicas, financeiras e comerciais não podem acontecer de forma isolada." },
      { titulo: "Estudos de caso reais", descricao: "Thiago vai abrir projetos desenvolvidos pela YouCon para mostrar, na prática: condição inicial, oportunidade identificada, solução de projeto e impacto no produto." },
    ],
    cta: "Quero participar gratuitamente",
  },
  participacao: {
    titulo: { antes: "Mais do que um encontro ", destaque: "sobre arquitetura", depois: "." },
    paragrafos: [
      "Este é um encontro para quem entende que o projeto não é apenas uma etapa técnica.",
      "É nele que são tomadas decisões que impactam diretamente o produto, a percepção de valor, a eficiência da obra e o potencial comercial do empreendimento.",
      "No dia 08/10, às 20h, Thiago Cardim vai conduzir uma conversa prática, com projetos reais e espaço para perguntas ao vivo.",
    ],
  },
  hosts: {
    titulo: { antes: "O encontro será conduzido por ", destaque: "Thiago Cardim", depois: "." },
    itens: [
      {
        nome: "Thiago Cardim",
        cargo: "Arquiteto",
        titulo: "CEO YouCon",
        foto: midia("img/thiago-cardim.png"),
        descricao: "Thiago participa diretamente do desenvolvimento de projetos que precisam funcionar no papel, na obra e no mercado. No encontro, ele vai compartilhar a visão da YouCon sobre como conectar arquitetura, engenharia e estratégia para desenvolver produtos imobiliários mais eficientes, valorizados e preparados para o mercado.",
      },
    ],
  },
  cta: {
    titulo: { antes: "Antes de lançar seu próximo empreendimento, entenda o impacto que o projeto pode ter no ", destaque: "produto que você vai vender", depois: "." },
    descricao: "Participe gratuitamente do encontro online e ao vivo no dia 08/10, às 20h. Thiago Cardim vai mostrar, com projetos reais da YouCon, como decisões de implantação, plantas, tipologias, fachada e áreas comuns definem o produto imobiliário — e o quanto o mercado está disposto a pagar por ele. As dúvidas serão respondidas ao vivo.",
    data: "08/10",
    horario: "20h",
    local: "Online e ao vivo · dúvidas respondidas na hora",
  },
  // PENDENTE (Gui): link do grupo do WhatsApp deste encontro; por ora, o mesmo dos outros
  formulario: { titulo: "Garantir meu acesso gratuito", redirect: "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7" },
};
