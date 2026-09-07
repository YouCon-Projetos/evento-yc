import { consultoria } from "./consultoria";
import { incorporacao } from "./incorporacao";
import { metalica } from "./metalica";
import { tendenciasProjetos } from "./tendencias-projetos";

export const eventos = { consultoria, incorporacao, metalica, tendenciasProjetos } as const;
export type { EventoConfig } from "./tipos";
