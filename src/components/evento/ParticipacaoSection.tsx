import type { EventoConfig } from "@/eventos/tipos";
import { Reveal } from "./Reveal";
import { Titulo } from "./Titulo";

/** Bloco de texto: a consultoria é participativa, não só uma apresentação. */
export function ParticipacaoSection({ participacao }: { participacao: NonNullable<EventoConfig["participacao"]> }) {
  return (
    <section className="relative bg-section-alt py-10 md:py-16 lg:py-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl rounded-xl border border-border bg-card/60 p-5 text-center md:rounded-2xl md:p-8 lg:p-10">
          <h2 className="mb-4 text-base font-bold text-foreground sm:text-lg md:mb-6 md:text-2xl lg:text-[1.75rem]"><Titulo t={participacao.titulo} /></h2>
          <div className="space-y-3 text-[13px] leading-relaxed text-muted-foreground md:space-y-4 md:text-[15px] lg:text-base">
            {participacao.paragrafos.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
