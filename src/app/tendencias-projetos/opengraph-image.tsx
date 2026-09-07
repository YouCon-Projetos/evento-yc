import { tendenciasProjetos } from "@/eventos/tendencias-projetos";
import { imagemOg, OG_TAMANHO, OG_TIPO } from "@/lib/og";

export const alt = tendenciasProjetos.meta.titulo;
export const size = OG_TAMANHO;
export const contentType = OG_TIPO;

export default function Image() {
  return imagemOg(tendenciasProjetos);
}
