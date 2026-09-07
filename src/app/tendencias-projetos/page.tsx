import { EventoPage } from "@/components/evento/EventoPage";
import { tendenciasProjetos } from "@/eventos/tendencias-projetos";
import { metadataDoEvento } from "@/lib/metadata";

export const metadata = metadataDoEvento(tendenciasProjetos);

export default function TendenciasProjetos() {
  return <EventoPage evento={tendenciasProjetos} />;
}
