import type { EventoConfig } from "@/eventos/tipos";
import { AmbientGlow } from "../AmbientGlow";
import { CountdownBanner } from "../CountdownBanner";
import { GaleriaSection } from "../GaleriaSection";
import { FaixaFecho } from "./FaixaFecho";
import { Footer } from "../Footer";
import { HeroSection } from "./HeroSection";
import { DestaquesStrip } from "./DestaquesStrip";
import { BenefitsSection } from "./BenefitsSection";
import { AudienceSection } from "./AudienceSection";
import { AgendaSection } from "./AgendaSection";
import { HostsSection } from "./HostsSection";
import { CTASection } from "./CTASection";

/**
 * Layout editorial (v2): hero assimétrico com a VSL ao lado, dados do evento em
 * numerais, blocos separados por fios e a galeria 3D no meio da página. Fora o
 * banner, a galeria e o formulário, nada é compartilhado com o template v1.
 */
export function EventoPageV2({ evento }: { evento: EventoConfig }) {
  return (
    <main className="relative min-h-screen bg-background pt-16 md:pt-14">
      <AmbientGlow />
      <CountdownBanner {...evento.banner} />
      <HeroSection hero={evento.hero} tema={evento.tema} video={evento.video} quando={evento.banner.rotuloData} />
      {evento.destaques && <DestaquesStrip destaques={evento.destaques} />}
      <BenefitsSection beneficios={evento.beneficios} />
      {evento.galeria && <GaleriaSection galeria={evento.galeria} />}
      {evento.galeria && <FaixaFecho linhas={evento.galeria.fecho} />}
      {evento.publico && <AudienceSection publico={evento.publico} />}
      <AgendaSection agenda={evento.agenda} />
      <HostsSection hosts={evento.hosts} participacao={evento.participacao} />
      <CTASection cta={evento.cta} formulario={evento.formulario} webhookEvento={evento.webhookEvento} tema={evento.tema} destaques={evento.destaques} />
      <Footer />
    </main>
  );
}
