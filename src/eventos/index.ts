import { consultoria } from "./consultoria";
import { metalica } from "./metalica";
import { projetoAVenda } from "./projeto-a-venda";
import { tendenciasProjetos } from "./tendencias-projetos";

// O workshop de incorporação de 07/2026 saiu daqui: /incorporacao agora é o
// encontro "Do Projeto à Venda". A config antiga ficou em arquivo/.
export const eventos = { consultoria, metalica, projetoAVenda, tendenciasProjetos } as const;
export type { EventoConfig } from "./tipos";
