import { EventoPageV2 } from "@/components/evento/v2/EventoPageV2";
import { projetoAVenda } from "@/eventos/projeto-a-venda";
import { metadataDoEvento } from "@/lib/metadata";

export const metadata = metadataDoEvento(projetoAVenda);

export default function Incorporacao() {
  return <EventoPageV2 evento={projetoAVenda} />;
}
