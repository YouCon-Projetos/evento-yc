import { EventoPageV2 } from "@/components/evento/v2/EventoPageV2";
import { tendenciasProjetos } from "@/eventos/tendencias";
import { metadataDoEvento } from "@/lib/metadata";

export const metadata = metadataDoEvento(tendenciasProjetos);

export default function TendenciasProjetos() {
  return <EventoPageV2 evento={tendenciasProjetos} />;
}
