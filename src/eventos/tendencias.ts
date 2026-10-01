import { midia } from "@/lib/midia";
import type { EventoConfig } from "./tipos";

/**
 * Consultoria "Tendências, referências e soluções para o projeto de alto
 * padrão", 22/10/2026 às 20h, só com o Thiago. Copy de 07/09/2026.
 * Fotos de projetos da YouCon em tendencias/ no MinIO, desde 01/10/2026.
 */

export const tendenciasProjetos: EventoConfig = {
  slug: "tendencias",
  layout: "v2",
  webhookEvento: "tendencias",
  tema: "verde",
  meta: {
    titulo: "Tendências e Soluções para o Projeto de Alto Padrão | YouCon",
    descricao:
      "Consultoria gratuita e ao vivo com o arquiteto Thiago Cardim: tendências, referências e soluções em arquitetura, fachadas, plantas, interiores e acabamentos, com projetos reais da YouCon. 22/10 às 20h.",
    ogTitulo: "Tendências e Projetos",
  },
  banner: {
    antes: "Consultoria gratuita e ao vivo em:",
    depois: "A consultoria já começou!",
    dataIso: "2026-10-22T20:00:00-03:00",
    rotuloData: "22/10 às 20h",
  },
  hero: {
    tag: "Convite exclusivo YouCon",
    titulo: { antes: "Descubra tendências, referências e soluções para o ", destaque: "projeto de alto padrão", depois: " da sua casa." },
    subtitulo: [
      { texto: "Participe de uma consultoria gratuita e ao vivo com " },
      { texto: "Thiago Cardim", forte: true },
      { texto: " e conheça novas possibilidades em arquitetura, fachadas, plantas, interiores e acabamentos, com exemplos de " },
      { texto: "projetos reais", destaque: true },
      { texto: " desenvolvidos pela YouCon. Além do conteúdo, você poderá tirar suas dúvidas diretamente com um arquiteto durante o encontro." },
    ],
    imagemDesktop: midia("tendencias/hero.jpg"),
    // A mesma foto: o recorte central segura bem o retrato do celular
    imagemMobile: midia("tendencias/hero.jpg"),
    cta: "Quero participar gratuitamente",
    provaSocial: "+50 pessoas já se inscreveram",
    temas: ["Fachadas", "Plantas", "Interiores", "Acabamentos"],
    rodape: "Vagas limitadas",
  },
  destaques: [
    { valor: "22/10", rotulo: "quinta-feira, às 20h" },
    { valor: "Online", rotulo: "call fechada no Google Meet" },
    { valor: "Gratuito", rotulo: "com dúvidas respondidas ao vivo" },
  ],
  beneficios: {
    titulo: { antes: "Novas referências podem transformar as ", destaque: "decisões do projeto", depois: " da sua casa." },
    subtitulo: [
      "Um projeto de alto padrão vai muito além de uma fachada bonita.",
      "Arquitetura, distribuição dos ambientes, interiores e acabamentos precisam conversar entre si para criar uma casa que faça sentido para a sua rotina, para o seu estilo e para a forma como você deseja viver.",
      "Nesta consultoria, Thiago Cardim vai compartilhar tendências, referências e novas possibilidades que estão ganhando espaço nos projetos residenciais de alto padrão. Tudo de forma prática, visual e aplicada a situações reais.",
    ],
    tituloItens: "Um olhar completo",
    itens: [
      { icone: "House", titulo: "Arquitetura e fachadas", descricao: "Conheça novas referências, estilos e soluções que podem inspirar e orientar as decisões arquitetônicas do seu projeto." },
      { icone: "LayoutGrid", titulo: "Plantas e ambientes", descricao: "Veja novas possibilidades para pensar a distribuição, integração e organização dos espaços da sua casa." },
      { icone: "Sofa", titulo: "Interiores e acabamentos", descricao: "Conheça referências e soluções para ambientes internos, acabamentos e detalhes que complementam a arquitetura da residência." },
    ],
  },
  video: {
    src: midia("tendencias/vsl-tendencias.mp4"),
    poster: midia("tendencias/vsl-tendencias-poster.jpg"),
    legenda: "O que você vai ver nesta consultoria",
  },
  galeria: {
    titulo: { antes: "Veja como essas ideias ganham forma em ", destaque: "projetos reais", depois: "." },
    paragrafos: [
      "Durante a consultoria, Thiago utilizará projetos desenvolvidos pela própria YouCon para apresentar diferentes decisões de arquitetura, fachadas, ambientes e interiores.",
      "Mais do que referências genéricas, você poderá visualizar como diferentes soluções são pensadas e aplicadas em residências de alto padrão.",
    ],
    chamada: "Explore alguns dos projetos desenvolvidos pela YouCon:",
    itens: [
      { nome: "Volumes e vidro", legenda: "Fachada contemporânea ao entardecer", foto: midia("tendencias/g1.jpg"), alt: "Fachada contemporânea iluminada ao entardecer" },
      { nome: "Sobrado em esquina", legenda: "Três pavimentos com varandas e madeira", foto: midia("tendencias/g2.jpg"), alt: "Sobrado de três pavimentos iluminado à noite" },
      { nome: "Casa térrea integrada", legenda: "Garagem aberta e acesso com paisagismo", foto: midia("tendencias/g3.jpg"), alt: "Casa térrea com garagem aberta e jardim no acesso" },
      { nome: "Pedra na fachada", legenda: "Revestimento que dá textura ao volume", foto: midia("tendencias/g4.jpg"), alt: "Fachada com revestimento em pedra e sacada" },
      { nome: "Linhas horizontais", legenda: "Pedra natural e paisagismo tropical", foto: midia("tendencias/g5.jpg"), alt: "Casa de linhas horizontais com paisagismo tropical" },
      { nome: "Arquitetura clássica", legenda: "Simetria e detalhes em fachada clara", foto: midia("tendencias/g6.jpg"), alt: "Fachada clássica clara com acesso central" },
      { nome: "Casa de campo", legenda: "Telhado aparente, madeira e vista aberta", foto: midia("tendencias/g7.jpg"), alt: "Casa de campo com telhado aparente e vista para as montanhas" },
      { nome: "Fachada ripada", legenda: "Madeira vertical e iluminação embutida", foto: midia("tendencias/g8.jpg"), alt: "Fachada ripada em madeira iluminada ao entardecer" },
    ],
    fecho: ["Arquitetura pensada nos detalhes.", "Soluções desenvolvidas para cada projeto."],
  },
  publico: {
    titulo: { antes: "Essa consultoria é para você que está ", destaque: "pensando no projeto da sua casa", depois: "." },
    subtitulo: "Independentemente da fase em que você está, o encontro foi pensado para ampliar seu repertório e apresentar novas possibilidades para o seu projeto.",
    imagemFundo: midia("tendencias/fundo-publico.jpg"),
    cta: "Quero participar gratuitamente",
    itens: [
      { icone: "Landmark", titulo: "Já tem o terreno", descricao: "E quer começar a entender os caminhos possíveis para a arquitetura da sua futura casa." },
      { icone: "ClipboardCheck", titulo: "Está planejando construir", descricao: "E quer conhecer referências e soluções antes de tomar as principais decisões do projeto." },
      { icone: "PencilRuler", titulo: "Já está desenvolvendo seu projeto", descricao: "E quer ampliar suas referências sobre arquitetura, interiores, acabamentos e novas possibilidades." },
      { icone: "Users", titulo: "Já é cliente YouCon", descricao: "E quer conhecer novas referências, acompanhar projetos e estar ainda mais próximo do Thiago e da equipe." },
    ],
  },
  agenda: {
    titulo: { antes: "O que você vai ver ", destaque: "durante a consultoria", depois: "." },
    subtitulo: "Uma conversa prática sobre arquitetura e interiores, utilizando referências e projetos reais para aproximar você das decisões que fazem parte de uma residência de alto padrão.",
    estilo: "timeline",
    itens: [
      { titulo: "Tendências em arquitetura e fachadas", descricao: "Conheça referências, estilos e soluções que estão ganhando espaço nos projetos residenciais de alto padrão." },
      { titulo: "Plantas e novas soluções para os ambientes", descricao: "Veja diferentes formas de pensar distribuição, integração, funcionalidade e organização dos espaços da casa." },
      { titulo: "Interiores e acabamentos", descricao: "Conheça referências para ambientes internos, acabamentos e soluções que ajudam a complementar o conceito arquitetônico da residência." },
      { titulo: "Projetos reais e dúvidas ao vivo", descricao: "Thiago vai apresentar exemplos desenvolvidos pela YouCon e abrir espaço para você enviar suas perguntas e tirar dúvidas diretamente com um arquiteto." },
    ],
    cta: "Quero participar gratuitamente",
  },
  participacao: {
    titulo: { antes: "Mais do que assistir, ", destaque: "você poderá participar", depois: "." },
    paragrafos: [
      "A proposta deste encontro não é apenas apresentar referências de arquitetura.",
      "Será uma consultoria em uma call fechada, onde você poderá acompanhar Thiago de perto, entender como ele analisa diferentes decisões de projeto e enviar suas dúvidas durante o encontro.",
      "Uma oportunidade para ampliar suas referências, entender melhor o universo de um projeto de alto padrão e conversar diretamente com quem participa diariamente do desenvolvimento dessas residências.",
    ],
  },
  hosts: {
    titulo: { antes: "A consultoria será conduzida por ", destaque: "Thiago Cardim", depois: "." },
    itens: [
      {
        nome: "Thiago Cardim",
        cargo: "Arquiteto",
        titulo: "CEO YouCon",
        foto: midia("img/thiago-cardim.png"),
        descricao: "Thiago Cardim participa diretamente do desenvolvimento e das decisões dos projetos realizados pela YouCon. Durante o encontro, ele vai compartilhar sua visão sobre arquitetura e interiores, apresentar novas referências e utilizar projetos reais da empresa para mostrar como diferentes soluções podem ser aplicadas na prática. Tudo em uma conversa aberta, visual e direcionada para quem está planejando o projeto da própria casa.",
      },
    ],
  },
  cta: {
    titulo: { antes: "Amplie suas referências para as ", destaque: "próximas decisões do projeto", depois: " da sua casa." },
    descricao: "Participe gratuitamente da consultoria e acompanhe uma conversa ao vivo sobre arquitetura, fachadas, plantas, interiores, acabamentos e novas soluções para projetos residenciais de alto padrão. Conheça projetos reais desenvolvidos pela YouCon e aproveite a oportunidade para tirar suas dúvidas diretamente com Thiago Cardim.",
    data: "22/10",
    horario: "20h",
    local: "Online e ao vivo · call fechada pelo Google Meet",
  },
  // Redirect: mesmo grupo do WhatsApp da metálica até o Gui passar o link do grupo novo
  formulario: { titulo: "Garantir meu acesso gratuito", redirect: "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7" },
};
